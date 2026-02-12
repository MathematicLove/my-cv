#!/usr/bin/env node
/**
 * Scans topic directories (computer-science/*, mathematics/*), reads each
 * lecture .md file's first heading (# or ##), and rewrites _topic.md with
 * automatic links. Run after adding new lecture files.
 *
 * Usage: node scripts/build-lecture-index.js
 * (from learning-hub directory: node scripts/build-lecture-index.js)
 */

const fs = require('fs');
const path = require('path');

const HUB_ROOT = path.resolve(__dirname, '..');
const CATEGORIES = ['computer-science', 'mathematics'];

function getFirstHeading(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const line = content.split('\n').find((l) => /^#+\s+.+/.test(l.trim()));
  if (line) return line.replace(/^#+\s*/, '').trim();
  return path.basename(filePath, '.md');
}

function getTopicTitle(topicPath, topicSlug, indexFilePath) {
  if (fs.existsSync(indexFilePath)) {
    const firstLine = fs.readFileSync(indexFilePath, 'utf8').split('\n')[0];
    const m = firstLine.match(/^#\s+(.+)$/);
    if (m) return m[1].trim();
  }
  return topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1).replace(/_/g, ' ');
}

function main() {
  for (const cat of CATEGORIES) {
    const catPath = path.join(HUB_ROOT, cat);
    if (!fs.existsSync(catPath) || !fs.statSync(catPath).isDirectory()) continue;

    const topics = fs.readdirSync(catPath).filter((f) => {
      const p = path.join(catPath, f);
      return fs.statSync(p).isDirectory();
    });

    for (const topic of topics) {
      const topicPath = path.join(catPath, topic);
      const indexFile = '_' + topic + '.md';
      const indexPath = path.join(topicPath, indexFile);

      const lectureFiles = fs
        .readdirSync(topicPath)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
        .sort();

      const topicTitle = getTopicTitle(topicPath, topic, indexPath);
      const entries = [];

      for (const f of lectureFiles) {
        const slug = f.replace(/\.md$/, '');
        const title = getFirstHeading(path.join(topicPath, f));
        entries.push(`- [[${slug}|${title}]]`);
      }

      const md = `# ${topicTitle}\n\n${entries.join('\n')}\n`;
      fs.writeFileSync(indexPath, md);
      console.log('Updated', path.relative(HUB_ROOT, indexPath));
    }
  }
}

main();
