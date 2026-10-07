#!/usr/bin/env python3
"""Extract FRDM2012 from the primary paper; require two independent PDF readers.

The PDF and extraction audit remain outside the public checkout. Only normalized
Z A mass-excess(MeV) beta2 and public lineage metadata are emitted.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

def parse_pages(pages):
    Z, rows = None, {}
    for page in pages:
        for raw in page.splitlines():
            line = raw.replace("−", "-")
            line = re.sub(r"(?<=\d)\s+\.(?=\d)", ".", line)
            match = re.search(r"^\s*Z\s*=\s*(\d+)\b", line)
            if match:
                Z = int(match[1]); continue
            fields = line.split()
            if Z is None or len(fields) not in (16, 18) or not re.fullmatch(r"\d+", fields[0]) or not re.fullmatch(r"\d+", fields[1]):
                continue
            N, A = int(fields[0]), int(fields[1])
            if A != Z + N:
                raise ValueError(f"Invalid N/A identity: {line}")
            numbers = [float(v) for v in fields[2:]]
            key = (Z, A)
            if key in rows:
                raise ValueError(f"Duplicate row {key}")
            rows[key] = (numbers[11], numbers[4])  # Mth (FRDM), beta2; not the final FRLDM mass
    if len(rows) != 9318:
        raise ValueError(f"FRDM2012 expected 9318, found {len(rows)}")
    return rows

def main():
    p = argparse.ArgumentParser(); p.add_argument("pdf", type=Path); p.add_argument("--audit", type=Path, required=True)
    p.add_argument("--output", type=Path, default=Path(__file__).resolve().parent / "data/massmodels/frdm2012.txt")
    a = p.parse_args()
    from pypdf import PdfReader
    import pdfplumber
    rows = parse_pages(page.extract_text() for page in PdfReader(a.pdf).pages[67:])
    with pdfplumber.open(a.pdf) as pdf:
        independent = parse_pages(page.extract_text(x_tolerance=1) for page in pdf.pages[67:])
    if rows != independent:
        raise ValueError("Independent PDF extraction differs")
    a.output.write_text("# FRDM2012: Z A Mth(MeV) beta2; primary paper table, 0.01 MeV / 0.001 precision\n" +
                       "".join(f"{z} {mass} {me:.2f} {b:.3f}\n" for (z, mass), (me, b) in sorted(rows.items())))
    source = dict(url="https://arxiv.org/pdf/1508.06294", doi="10.1016/j.adt.2015.10.002",
                  sha256=hashlib.sha256(a.pdf.read_bytes()).hexdigest(), rows=len(rows),
                  extraction="pypdf and pdfplumber: every exported mass/beta2/identity identical",
                  mass_precision_keV=10, beta2_precision=0.001, uncertainty=None,
                  columns="Z,N,A,epsilon2/3/4/6,beta2/3/4/6,Es+p,Emic,Ebind,Mth,Mexp,sigmaexp,EFLmic,MFLth; export Mth,beta2",
                  reuse="attributed numerical facts from the published table; paper not redistributed")
    a.audit.write_text(json.dumps(source, indent=2))
    meta = a.output.parent / "frdm2012-source.json"; meta.write_text(json.dumps(source, indent=2))
    print(json.dumps(source))

if __name__ == "__main__": main()
