"""Create reduced-size WebP copies of the images used on the page and point the markdown at them.

Originals are never modified or deleted. A thumbnail is used only when it is clearly
smaller than the original; otherwise the markdown keeps the original file.

Usage:  python tools/make_thumbs.py            (from the repository root)
Needs:  pip install pillow
"""
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MARKDOWN = [ROOT / "content" / "en.md", ROOT / "content" / "ru.md"]
# Longest allowed width of the copy: roughly 2x the widest place the image is shown.
MAX_WIDTH = {"content/projects": 1200, "certificates": 600}
QUALITY = 95
KEEP_IF_SMALLER_THAN = 0.85
IMG_RE = re.compile(r'(<img [^>]*?src=")((?:content/projects|certificates)/[^"?]+\.(?:png|jpe?g))((?:\?[^"]*)?")', re.I)


def thumb_path(src: str) -> str:
    folder, name = src.rsplit("/", 1)
    # The original extension stays in the name: EXAMPLE.png and EXAMPLE.jpg can sit side by side.
    return f"{folder}/thumb/{name.lower()}.webp"


def make(src: str) -> str | None:
    original = ROOT / src
    prefix = "content/projects" if src.startswith("content/projects") else "certificates"
    with Image.open(original) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "transparency" in im.info or im.mode in ("LA", "PA") else "RGB")
        if im.width > MAX_WIDTH[prefix]:
            height = round(im.height * MAX_WIDTH[prefix] / im.width)
            im = im.resize((MAX_WIDTH[prefix], height), Image.LANCZOS)
        target = ROOT / thumb_path(src)
        target.parent.mkdir(exist_ok=True)
        im.save(target, "WEBP", quality=QUALITY, method=6)
    if target.stat().st_size >= KEEP_IF_SMALLER_THAN * original.stat().st_size:
        target.unlink()
        return None
    return thumb_path(src)


def main() -> None:
    texts = {p: p.read_text(encoding="utf-8") for p in MARKDOWN}
    sources = sorted({m.group(2) for t in texts.values() for m in IMG_RE.finditer(t)})
    mapping, before, after = {}, 0, 0
    for src in sources:
        out = make(src)
        if out:
            mapping[src] = out
            before += (ROOT / src).stat().st_size
            after += (ROOT / out).stat().st_size
    for path, text in texts.items():
        text = IMG_RE.sub(lambda m: m.group(1) + mapping.get(m.group(2), m.group(2)) + (m.group(3) if m.group(2) not in mapping else '"'), text)
        path.write_text(text, encoding="utf-8")
    print(f"{len(mapping)} of {len(sources)} images replaced: {before // 1024} KB -> {after // 1024} KB")


if __name__ == "__main__":
    main()
