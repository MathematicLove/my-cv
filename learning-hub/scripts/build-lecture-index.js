#!/usr/bin/env node

/**
 * Rebuilds every index page of the learning hub:
 *
 *   learning-hub/_hub.md                 -> list of categories
 *   learning-hub/<cat>/_index.md         -> list of topics (+ lectures lying in the category)
 *   learning-hub/<cat>/<topic>/_<topic>.md -> list of lectures (+ nested subdirectories)
 *   ... same rule for any deeper subdirectory
 *
 * Directory links get a trailing slash so index.html can resolve them without a
 * probe request. Existing labels and their order are preserved, so manual
 * wording (e.g. "SQL (Postgres)") survives a rebuild; new files are appended.
 */

const fs = require('fs');
const path = require('path');

const HUB_ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['scripts', 'img', 'assets', 'node_modules']);
const ROOT_TITLE = 'Learning Hub';

function isMarkdown(f) {
  return f.endsWith('.md');
}

function firstHeading(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const line = fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .find((l) => /^#+\s+.+/.test(l.trim()));
  return line ? line.replace(/^#+\s*/, '').trim() : null;
}

function prettify(slug) {
  const s = slug.replace(/^\d+[_-]/, '').replace(/[_-]/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Name of the index file that represents `dir` (relative depth from the hub root). */
function indexFileName(dirName, depth) {
  if (depth === 0) return '_hub.md';
  if (depth === 1) return '_index.md';
  return '_' + dirName + '.md';
}

/** Parses an existing index page: its title, free-form lines and label overrides. */
function readExisting(indexPath) {
  const result = { title: null, extra: [], labels: new Map() };
  if (!fs.existsSync(indexPath)) return result;

  const lines = fs.readFileSync(indexPath, 'utf8').split('\n');
  let titleTaken = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (!titleTaken && /^#\s+.+/.test(line)) {
      result.title = line.replace(/^#\s*/, '').trim();
      titleTaken = true;
      continue;
    }
    const link = line.match(/^[-*]\s+\[\[([^\]|]+)(?:\|([^\]]+))?\]\]\s*$/);
    if (link) {
      const target = link[1].trim().replace(/\/$/, '');
      result.labels.set(target, (link[2] || link[1]).trim());
      continue;
    }
    if (line) result.extra.push(raw.replace(/\s+$/, ''));
  }
  return result;
}

function buildDir(absDir, depth) {
  const dirName = path.basename(absDir);
  const indexPath = path.join(absDir, indexFileName(dirName, depth));
  const existing = readExisting(indexPath);

  const names = fs.readdirSync(absDir).filter((f) => !f.startsWith('.'));

  const subDirs = names
    .filter((f) => !SKIP_DIRS.has(f) && fs.statSync(path.join(absDir, f)).isDirectory())
    .sort();

  const lectures = names
    .filter((f) => isMarkdown(f) && !f.startsWith('_') && fs.statSync(path.join(absDir, f)).isFile())
    .sort();

  // Children first, so their titles are available for this page's links.
  const childTitles = new Map();
  for (const sub of subDirs) {
    childTitles.set(sub, buildDir(path.join(absDir, sub), depth + 1));
  }

  const entries = new Map(); // target(no slash) -> markdown list item
  for (const sub of subDirs) {
    const label = existing.labels.get(sub) || childTitles.get(sub) || prettify(sub);
    entries.set(sub, `- [[${sub}/|${label}]]`);
  }
  for (const f of lectures) {
    const slug = f.replace(/\.md$/, '');
    const label = existing.labels.get(slug) || firstHeading(path.join(absDir, f)) || prettify(slug);
    entries.set(slug, `- [[${slug}|${label}]]`);
  }

  // Keep the previous ordering for entries that still exist, append the new ones.
  const ordered = [];
  for (const target of existing.labels.keys()) {
    if (entries.has(target)) {
      ordered.push(entries.get(target));
      entries.delete(target);
    }
  }
  ordered.push(...entries.values());

  const title = existing.title || (depth === 0 ? ROOT_TITLE : prettify(dirName));
  const blocks = [`# ${title}`];
  if (existing.extra.length) blocks.push(existing.extra.join('\n'));
  if (ordered.length) blocks.push(ordered.join('\n'));

  const md = blocks.join('\n\n') + '\n';
  const prev = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : null;
  if (prev !== md) {
    fs.writeFileSync(indexPath, md);
    console.log((prev === null ? 'Created' : 'Updated') + ' ' + path.relative(HUB_ROOT, indexPath));
  }

  return title;
}

buildDir(HUB_ROOT, 0);
