#!/usr/bin/env python3
"""Lossless property export of NUBASE2020, with explicit state identity.

Use --source for a private local AMDC source, --audit for a private report.
Legacy chart rows remain available through make_chart_nubase.py.
"""
import argparse
import hashlib
import json
import math
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UNITS = dict(ys=1e-24, zs=1e-21, **{"as": 1e-18}, fs=1e-15, ps=1e-12,
             ns=1e-9, us=1e-6, ms=1e-3, s=1, m=60, h=3600, d=86400,
             y=31556926.08, ky=31556926.08e3, My=31556926.08e6, Gy=31556926.08e9,
             Ty=31556926.08e12, Py=31556926.08e15, Ey=31556926.08e18, Zy=31556926.08e21, Yy=31556926.08e24)

def number(raw):
    t = raw.strip().replace("#", "")
    qualifier = next((c for c in ("<", ">", "~", "≈") if c in t), "")
    clean = t.lstrip("<>~≈ ")
    value = float(clean) if re.fullmatch(r"[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?", clean) else None
    return value, qualifier

def quantity(value, error=""):
    v, q = number(value)
    e, eq = number(error)
    return dict(value=v, uncertainty=e, qualifier=q, uncertainty_qualifier=eq,
                value_extrapolated="#" in value, uncertainty_extrapolated="#" in error,
                raw=value.strip(), raw_uncertainty=error.strip(),
                status="missing" if not value.strip() else "symbolic" if v is None else
                "limited" if q else "extrapolated" if "#" in value else "evaluated")

def half_life(raw, unit, error):
    out = quantity(raw, error)
    out["unit"] = unit.strip()
    out["seconds"] = out["value"] * UNITS[unit.strip()] if out["value"] is not None and unit.strip() in UNITS else None
    out["status"] = "stable" if raw.strip() == "stbl" else "particle_unstable" if raw.strip() == "p-unst" else out["status"]
    return out

def classify(A, Z, index, label, life, ex, spin):
    if index == 0:
        return "ground", "source index 0"
    if label in "ij":
        return "analogue", "source IAS label"
    if "spmix" in spin or "fsmix" in spin:
        return "mixture", "source spin field identifies a mixture of levels"
    if (A, Z, label) == (28, 14, "r"):
        return "resonance", "proton-resonance example in NUBASE2020 Table I explanation"
    if label in "mn":
        return "isomer", "source isomer label"
    if (label == "x" and (A,Z) in {(98,39),(174,71),(179,73),(214,88)}) or (A, Z, label) == (174, 71, "r"):
        return "isomer", "NUBASE2020 section 2 higher-isomer assignment"
    seconds = life["seconds"]
    # Limits or symbolic lifetimes cannot establish a lifetime classification.
    if seconds is not None and not life["qualifier"]:
        if seconds >= 1e-7:
            return "isomer", "NUBASE2020 long-lived-state convention with record lifetime"
        return "unclassified", "short-lived p/q/r record: lifetime alone does not establish level versus isomer"
    return "unclassified", "excited state; classification not established by available fields"

def parse(source):
    states = []
    for line_number, line in enumerate(source.read_text().splitlines(), 1):
        if line.startswith("#") or not line.strip():
            continue
        if len(line) < 42 or not line[:3].strip().isdigit():
            raise ValueError(f"Malformed source line {line_number}")
        line = line.ljust(209)
        A, Z, index = int(line[:3]), int(line[4:7]), int(line[7])
        label = line[16].strip() or "g"
        mass = quantity(line[18:31], line[31:42])
        ex = quantity(line[42:54], line[54:65])
        life = half_life(line[69:78], line[78:80], line[81:88])
        kind, reason = classify(A, Z, index, label, life, ex, line[88:102])
        states.append(dict(id=f"{Z}-{A-Z}-{index}", Z=Z, N=A-Z, A=A,
                           element=re.sub(r"^\d+", "", line[11:16].strip()),
                           source_state_index=index, label=label, kind=kind,
                           classification_basis=reason, mass_excess=mass, excitation=ex,
                           half_life=life, spin_parity=line[88:102].strip(),
                           spin_extrapolated="#" in line[88:102],
                           spin_directly_measured="*" in line[88:102],
                           excitation_origin=line[65:67].strip(), ordering_uncertain=line[67] == "*",
                           ordering_inverted=line[68] == "&", ensdf_year=line[102:104].strip(),
                           reference=line[104:114].strip(),
                           discovery_year=line[114:118].strip(), decay=line[119:209].strip(),
                           existence="withdrawn" if "non-exist" in ex["raw"] or "non-exist" in mass["raw"] else "questioned" if line[65:67].strip() in {"EU","RN"} else "source_assignment",
                           source_line=line_number))
    ids = [s["id"] for s in states]
    if len(set(ids)) != len(ids):
        raise ValueError("Duplicate state IDs")
    return states

def generate(source):
    states = parse(source)
    counts = Counter(s["kind"] for s in states)
    counts.update(total=len(states), excited=sum(s["source_state_index"] != 0 for s in states),
                  excitation_value_hash=sum(s["excitation"]["value_extrapolated"] for s in states),
                  excitation_uncertainty_hash=sum(s["excitation"]["uncertainty_extrapolated"] for s in states),
                  withdrawn=sum(s["existence"] == "withdrawn" for s in states))
    if counts["ground"] != 3558 or counts["excited"] != 2285:
        raise ValueError(f"Unexpected NUBASE2020 inventory: {counts}")
    return dict(schema_version=2, source=dict(name="NUBASE2020", doi="10.1088/1674-1137/abddae",
                 url="https://www-nds.iaea.org/amdc/ame2020/nubase_4.mas20.txt",
                 sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
                 uncertainty="published one-sigma where numeric; limits and symbolic fields retained",
                 transformation="Fixed-width catalogue v2; stable Z-N-source-index identity; raw quantities, independent flags, source labels and ordering retained; classification follows source conventions with documented exceptions and unresolved records",
                 half_life_year_seconds=31556926.08),
                counts=dict(counts), states=states)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", type=Path, default=ROOT / "tools/data/nubase_4.mas20.txt")
    ap.add_argument("--output", type=Path, default=ROOT / "static/data/nuclear-states.json")
    ap.add_argument("--audit", type=Path)
    args = ap.parse_args()
    data = generate(args.source)
    args.output.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
    if args.audit:
        args.audit.write_text(json.dumps(dict(source=data["source"], counts=data["counts"],
            unresolved=[s["id"] for s in data["states"] if s["kind"] == "unclassified"],
            withdrawn=[s["id"] for s in data["states"] if s["existence"] == "withdrawn"]), indent=2))
    print(json.dumps(data["counts"]))

if __name__ == "__main__":
    main()
