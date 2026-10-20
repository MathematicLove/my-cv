"""Build local shields-style flat-square badges (logo + name) into content/logo/badges/.

Single-colour logos come from content/logo/mono/ (white or black on the brand colour); logos that
only exist in colour come from content/logo/ and sit on a small white tile. Everything is embedded,
so a badge is one self-contained SVG with no requests to external sites.

Usage:  python tools/make_badges.py            (from the repository root)
"""
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "content" / "logo"
OUT = LOGO / "badges"
SVG = "http://www.w3.org/2000/svg"
XLINK = "http://www.w3.org/1999/xlink"
ET.register_namespace("", SVG)
ET.register_namespace("xlink", XLINK)

# slug: (label, brand colour, text/logo colour, mono logo file or None, colour logo file, crop viewBox)
BADGES = {
    "python": ("Python", "3776AB", "fff", "python", None, None),
    "haskell": ("Haskell", "5D4F85", "fff", "haskell", None, None),
    "pytorch": ("PyTorch", "EE4C2C", "fff", "pytorch", None, None),
    "scikit-learn": ("Scikit-learn", "F7931E", "fff", "scikitlearn", None, None),
    "tensorflow": ("TensorFlow", "FF6F00", "fff", "tensorflow", None, None),
    "pandas": ("Pandas", "150458", "fff", "pandas", None, None),
    "numpy": ("NumPy", "013243", "fff", "numpy", None, None),
    "yolo": ("YOLO", "111F68", "fff", None, "yolo", "0 0 300 293"),
    "opencv": ("OpenCV", "5C3EE8", "fff", "opencv", None, None),
    "pillow": ("PIL", "306998", "fff", "python", None, None),
    "mlflow": ("MLflow", "0194E2", "fff", "mlflow", None, None),
    "huggingface": ("Hugging Face", "FFD21E", "000", "huggingface", None, None),
    "pyspark": ("PySpark", "E25A1C", "fff", "apachespark", None, None),
    "zenml": ("ZenML", "431D93", "fff", None, "zenml", None),
    "matplotlib": ("Matplotlib", "11557C", "fff", None, "matplotlib", None),
    "plotly": ("Plotly", "3F4F75", "fff", "plotly", None, None),
    "seaborn": ("Seaborn", "4C72B0", "fff", None, "seaborn", None),
    "tableau": ("Tableau", "E97627", "fff", "tableau", None, None),
    "excel": ("Excel", "217346", "fff", None, "excel", None),
    "scipy": ("SciPy", "8CAAE6", "fff", "scipy", None, None),
    "statsmodels": ("Statsmodels", "593786", "fff", None, "statsmodels", None),
    "cirq": ("Cirq", "4285F4", "fff", None, "cirq", None),
    "postgresql": ("PostgreSQL", "4169E1", "fff", "postgresql", None, None),
    "mongodb": ("MongoDB", "47A248", "fff", "mongodb", None, None),
    "rabbitmq": ("RabbitMQ", "FF6600", "fff", "rabbitmq", None, None),
    "docker": ("Docker", "2496ED", "fff", "docker", None, None),
    "kubernetes": ("Kubernetes", "326CE5", "fff", "kubernetes", None, None),
    "jenkins": ("Jenkins", "D24939", "fff", "jenkins", None, None),
    "terraform": ("Terraform", "7B42BC", "fff", "terraform", None, None),
    "ansible": ("Ansible", "EE0000", "fff", "ansible", None, None),
    "openstack": ("OpenStack Heat", "ED1944", "fff", "openstack", None, None),
    "yandexcloud": ("Yandex Cloud", "5282FF", "fff", "yandexcloud", None, None),
    "firebase": ("Firebase", "FFCA28", "000", "firebase", None, None),
    "render": ("Render", "46E3B7", "000", "render", None, None),
}

# Verdana advance widths (per 1000 em) for the label width estimate
W = {**dict(zip("abcdefghijklmnopqrstuvwxyz",
               [600, 623, 521, 623, 596, 352, 623, 633, 274, 344, 592, 274, 973, 633, 607, 623, 623, 427, 521, 394, 633, 592, 818, 592, 592, 525])),
     **dict(zip("ABCDEFGHIJKLMNOPQRSTUVWXYZ",
               [684, 686, 698, 770, 632, 575, 775, 752, 421, 455, 693, 557, 846, 748, 787, 603, 787, 695, 684, 616, 732, 684, 989, 685, 614, 685])),
     " ": 352, "-": 408, ".": 364, "&": 780}
H, FS, PAD, LOGO_SZ, GAP = 22, 11, 7, 12, 5


def text_width(s):
    return sum(W.get(c, 636) for c in s) * FS / 1000


def clean(el, rnd):
    """Drop editor metadata (inkscape, sodipodi, rdf...); optionally round long numbers."""
    for child in list(el):
        tag = child.tag
        if not isinstance(tag, str) or not tag.startswith("{" + SVG + "}") or child.tag.endswith("}metadata"):
            el.remove(child)
        else:
            clean(child, rnd)
    for k in list(el.attrib):
        if k.startswith("{") and not k.startswith("{" + XLINK + "}"):
            del el.attrib[k]
        elif rnd and k in ("d", "points", "transform"):
            # only plain decimals: compact path data like "1.234.567" is left alone
            el.attrib[k] = re.sub(r"(?<![\d.])-?\d+\.\d{3,}(?![\d.])", lambda m: f"{float(m.group()):.2f}", el.attrib[k])


def load_logo(path, crop=None, rnd=False):
    root = ET.parse(path).getroot()
    vb = crop or root.get("viewBox")
    if not vb:
        vb = f"0 0 {float(re.sub('[^0-9.]', '', root.get('width')))} {float(re.sub('[^0-9.]', '', root.get('height')))}"
    clean(root, rnd)
    return vb, root


def build(slug, label, bg, fg, mono, colour, crop):
    tw = text_width(label)
    width = round(PAD + LOGO_SZ + GAP + tw + PAD, 1)
    x_text = PAD + LOGO_SZ + GAP
    y0 = (H - LOGO_SZ) / 2
    svg = ET.Element(f"{{{SVG}}}svg", {"width": str(width), "height": str(H), "viewBox": f"0 0 {width} {H}", "role": "img", "aria-label": label})
    ET.SubElement(svg, f"{{{SVG}}}title").text = label
    ET.SubElement(svg, f"{{{SVG}}}rect", {"width": str(width), "height": str(H), "fill": f"#{bg}"})
    if mono:
        vb, src = load_logo(LOGO / "mono" / f"{mono}.svg")
        inner = ET.SubElement(svg, f"{{{SVG}}}svg", {"x": str(PAD), "y": str(y0), "width": str(LOGO_SZ), "height": str(LOGO_SZ), "viewBox": vb, "fill": f"#{fg}"})
    else:
        ET.SubElement(svg, f"{{{SVG}}}rect", {"x": str(PAD - 2), "y": str(y0 - 2), "width": str(LOGO_SZ + 4), "height": str(LOGO_SZ + 4), "rx": "3", "fill": "#fff"})
        vb, src = load_logo(LOGO / f"{colour}.svg", crop, rnd=True)
        inner = ET.SubElement(svg, f"{{{SVG}}}svg", {"x": str(PAD), "y": str(y0), "width": str(LOGO_SZ), "height": str(LOGO_SZ), "viewBox": vb})
    for child in list(src):
        if not child.tag.endswith("}title"):
            inner.append(child)
    ET.SubElement(svg, f"{{{SVG}}}text", {
        "x": f"{x_text}", "y": "14.8", "fill": f"#{fg}", "font-family": "Verdana,Geneva,DejaVu Sans,sans-serif",
        "font-size": str(FS), "textLength": f"{tw:.1f}", "lengthAdjust": "spacingAndGlyphs"}).text = label
    ET.ElementTree(svg).write(OUT / f"{slug}.svg", encoding="utf-8", xml_declaration=False)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, args in BADGES.items():
        build(slug, *args)
        print(slug, (OUT / f"{slug}.svg").stat().st_size)
