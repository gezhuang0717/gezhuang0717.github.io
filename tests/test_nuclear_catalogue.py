"""Independent source-column parity; no downloaded sources or private audit in Git."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def test_every_nubase_property_and_flag():
    data=json.loads((ROOT/'static/data/nuclear-states.json').read_text())
    source=(ROOT/'tools/data/nubase_4.mas20.txt').read_text().splitlines()
    lines=[(i+1,l.ljust(209)) for i,l in enumerate(source) if l.strip() and not l.startswith('#')]
    assert len(lines)==len(data['states'])==5843
    assert len({s['id'] for s in data['states']})==5843
    assert sum(s['source_state_index']==0 for s in data['states'])==3558
    for (i,l),s in zip(lines,data['states']):
        assert s['source_line']==i
        assert s['id']==f'{int(l[4:7])}-{int(l[:3])-int(l[4:7])}-{int(l[7])}'
        for name,v,e in [('mass_excess',l[18:31],l[31:42]),('excitation',l[42:54],l[54:65]),('half_life',l[69:78],l[81:88])]:
            q=s[name]
            assert q['raw']==v.strip() and q['raw_uncertainty']==e.strip()
            assert q['value_extrapolated']==('#' in v)
            assert q['uncertainty_extrapolated']==('#' in e)
            if not e.strip(): assert q['uncertainty'] is None
        assert s['spin_parity']==l[88:102].strip()
        assert s['reference']==l[104:114].strip()
        assert s['ordering_uncertain']==(l[67]=='*')
        assert s['ordering_inverted']==(l[68]=='&')
        assert s['excitation_origin']==l[65:67].strip()
        assert s['decay']==l[119:209].strip()
    assert sum(s['excitation']['value_extrapolated'] for s in data['states'])==310
    assert sum(s['excitation']['value_extrapolated'] for s in data['states'] if s['label'] in 'mnpqrx')==302

def test_state_edge_cases_remain_visible():
    d=json.loads((ROOT/'static/data/nuclear-states.json').read_text());s={s['id']:s for s in d['states']}
    assert s['39-59-6']['kind']=='isomer' # 98Y sixth isomer
    assert s['71-103-5']['kind']=='isomer' # 174Lu 97 ns: no rigid lifetime cutoff
    assert s['14-14-5']['kind']=='resonance'
    assert any(x['existence']=='withdrawn' for x in s.values())
    assert any(x['ordering_uncertain'] for x in s.values())
    assert any(x['excitation']['status']=='symbolic' for x in s.values())
    assert any(x['kind']=='unclassified' for x in s.values())

def test_ame_small_uncertainty_is_not_rounded_to_zero():
    d=json.loads((ROOT/'static/data/ame2020.json').read_text())
    h=next(r for r in d['rows'] if r[2]=='H' and r[1]==1)
    assert 0<h[4]<.0001

def test_frdm2012_coverage_and_precision():
    d=json.loads((ROOT/'static/data/massmodels.json').read_text())['models'];model=d['frdm2012']
    assert len(model['rows'])==9318
    assert len({(r[0],r[1]) for r in model['rows']})==9318
    assert model['uncertainty'] is None
    for line,row in zip((l for l in (ROOT/'tools/data/massmodels/frdm2012.txt').read_text().splitlines() if not l.startswith('#')),model['rows']):
        z,a,me,b=line.split();assert [int(z),int(a)-int(z)]==row[:2]
        assert abs(float(me)*1000-row[2])<1e-8
        assert abs(float(b)*1000-row[3])<1e-8
    assert all(m in d for m in ['frdm1995','hfb17','hfbd1m'])
