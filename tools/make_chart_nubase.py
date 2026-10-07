#!/usr/bin/env python3
"""Build static/data/nubase2020.json for the Lab chart of nuclides.

Input: tools/data/nubase_4.mas20.txt — NUBASE2020 (F.G. Kondev et al., Chin. Phys. C 45, 030001 (2021)),
the official AMDC file (https://www-nds.iaea.org/amdc/). Its ground-state mass excesses are the
AME2020 values (M. Wang et al., Chin. Phys. C 45, 030003 (2021)).
Output rows (ground states): [Z, N, El, ME_keV, dME_keV, est(0/1), log10 T½[s] (99 stable, -99 unknown, -98 p-unstable),
T½ text, Jπ, discovery year, decay modes, isomers[[s, Ex_keV, T½ text, Jπ], ...]]
Run: python3 tools/make_chart_nubase.py
"""
import json, math, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "tools/data/nubase_4.mas20.txt"
OUT = ROOT / "static/data/nubase2020.json"
UNIT = {"ys": 1e-24, "zs": 1e-21, "as": 1e-18, "fs": 1e-15, "ps": 1e-12, "ns": 1e-9, "us": 1e-6, "ms": 1e-3, "s": 1,
        "m": 60, "h": 3600, "d": 86400, "y": 3.15576e7, "ky": 3.15576e10, "My": 3.15576e13, "Gy": 3.15576e16,
        "Ty": 3.15576e19, "Py": 3.15576e22, "Ey": 3.15576e25, "Zy": 3.15576e28, "Yy": 3.15576e31}


def num(s):
    s = s.strip().replace("#", "")
    try:
        return float(s)
    except ValueError:
        return None


def main():
    from make_state_catalogue import generate
    data=generate(SRC);gs={};iso={}
    ame={r[2].lower()+str(r[1]):r for r in json.loads((ROOT/"static/data/ame2020.json").read_text())["rows"]}
    for state in data["states"]:
        Z,N=state["Z"],state["N"];life=state["half_life"];sec=life["seconds"]
        lg=99 if life["status"]=="stable" else -98 if life["status"]=="particle_unstable" else round(math.log10(sec),3) if sec and sec>0 else -99
        text="stable" if lg==99 else "particle unstable" if lg==-98 else (life["raw"]+" "+life["unit"]).strip()
        mass=state["mass_excess"];ex=state["excitation"]
        if state["source_state_index"]==0:
            am=ame.get(state["element"].lower()+str(state["A"]))
            if am:mass={**mass,"value":am[3],"uncertainty":am[4],"value_extrapolated":bool(am[5]),"uncertainty_extrapolated":bool(am[6])}
            gs[(Z,N)]=[Z,N,state["element"],mass["value"],mass["uncertainty"],int(mass["value_extrapolated"]),lg,text,state["spin_parity"],int(state["discovery_year"]) if state["discovery_year"].isdigit() else None,state["decay"],[],state["id"],int(mass["uncertainty_extrapolated"])]
        elif state["kind"]=="isomer" and state["existence"]!="withdrawn":
            iso.setdefault((Z,N),[]).append([state["label"],ex["value"],text,state["spin_parity"],ex["uncertainty"],int(ex["value_extrapolated"]),int(ex["uncertainty_extrapolated"]),state["id"]])
    for k,v in iso.items():
        if k in gs:gs[k][11]=v
    rows = sorted(gs.values())
    elements = json.loads(OUT.read_text())["elements"]
    OUT.write_text(json.dumps({"source": "NUBASE2020 (Kondev et al., Chin. Phys. C 45, 030001, 2021) / AME2020 (Wang et al., Chin. Phys. C 45, 030003, 2021)",
                               "elements": elements, "rows": rows}, separators=(",", ":"), ensure_ascii=False))
    print(len(rows), "ground states,", sum(len(v) for v in iso.values()), "isomers,", OUT.stat().st_size // 1024, "kB")


if __name__ == "__main__":
    main()
