"""Schema checks for data/databases.yaml (Databases page)."""
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
D = yaml.safe_load((ROOT / "data" / "databases.yaml").read_text(encoding="utf-8"))
LANGS = ("en", "zh", "fi", "de", "ja")


def test_labels_complete_in_five_languages():
    keys = set(D["labels"]["en"])
    for lang in LANGS:
        assert set(D["labels"][lang]) == keys, lang
        assert all(isinstance(v, str) for v in D["labels"][lang].values())


def test_categories_have_five_language_names():
    for c in D["categories"]:
        assert set(LANGS) <= set(c["name"]), c["key"]


def test_items_valid():
    cats = {c["key"] for c in D["categories"]}
    ids = [i["id"] for i in D["items"]]
    assert len(ids) == len(set(ids))
    for i in D["items"]:
        assert i["cat"] in cats, i["id"]
        assert i["url"].startswith(("https://", "http://")), i["id"]
        assert "k_" + i["kind"] in D["labels"]["en"], i["id"]
        for f in ("short", "what"):
            assert i[f]["en"].strip(), (i["id"], f)
        if "use" in i:
            assert isinstance(i["use"]["en"], list) and i["use"]["en"], i["id"]


def test_nndc_networks_listed():
    urls = {i["url"] for i in D["items"]}
    assert "https://www.nndc.bnl.gov/networks/" in urls
