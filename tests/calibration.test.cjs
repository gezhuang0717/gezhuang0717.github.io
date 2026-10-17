// Calibrant-based trap frequencies (CAL1): independent checks against the ratio law and the ideal-trap invariants.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const P=require('../static/js/physics.js'),read=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'../static/data',n)));
const cat=P.catalogue(read('nuclear-states.json'),read('ame2020.json'));
const near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b} (tol ${t})`),ion=(s,q=1)=>cat.resolve(s,{q});
const CS={ion:ion('133Cs'),nc:808542.788,snc:0.002,nm:1653.063,snm:0.01};      // PyMassScanner trap-2 example values

test('calibrant reproduces its own frequency and uncertainty in both modes',()=>{
  for(const mode of ['fixed-minus','ideal']){const cal=P.trapCalibration([CS],mode),f=P.calibratedPenning(CS.ion,cal);
    near(f.nc,CS.nc,1e-6);near(f.snc,CS.snc,1e-9);near(f.nm,CS.nm,1e-6);near(f.np+f.nm,f.nc,1e-6);near((f.np**2+f.nm**2+f.nz**2)/f.nc**2,1,1e-12);}
});

test('ratio law: 85Rb from 133Cs equals the AME ion-mass ratio',()=>{
  const cal=P.trapCalibration([CS]),rb=ion('85Rb'),f=P.calibratedPenning(rb,cal);
  near(f.nc/CS.nc,CS.ion.ionMassU/rb.ionMassU,1e-12);
  // uncertainty: relative σ ≥ σ of the calibrant frequency; masses well known → close to it
  assert.ok(f.snc/f.nc>=CS.snc/CS.nc-1e-18);
});

test('charge scaling and electron masses',()=>{
  const cal=P.trapCalibration([CS]),x1=ion('170Yb',1),x2=ion('170Yb',2),f1=P.calibratedPenning(x1,cal),f2=P.calibratedPenning(x2,cal);
  near(f2.nc/f1.nc,2*x1.ionMassU/x2.ionMassU,1e-12);
});

test('both modes give the same cyclotron frequency; ν− differs only by its mass dependence',()=>{
  const a=P.trapCalibration([CS],'fixed-minus'),b=P.trapCalibration([CS],'ideal'),u=ion('238U');
  const fa=P.calibratedPenning(u,a),fb=P.calibratedPenning(u,b);near(fa.nc,fb.nc,1e-9);
  assert.equal(fa.nm,CS.nm);
  // ideal quadrupole: ν− ≈ νz²/(2ν+) is nearly mass independent, so the difference is small but nonzero
  assert.ok(Math.abs(fb.nm-CS.nm)>0&&Math.abs(fb.nm-CS.nm)<5);
  near((fb.np**2+fb.nm**2+fb.nz**2)/fb.nc**2,1,1e-12);
});

test('isomer shift equals νc·Ex/(m c²) to first order',()=>{
  const cal=P.trapCalibration([CS]),g=ion('133Xe'),m=ion('133mXe'),fg=P.calibratedPenning(g,cal),fm=P.calibratedPenning(m,cal);
  const ex=(m.M-g.M)*P.C.uKeV;near(ex,233.221,1e-3);
  near((fg.nc-fm.nc)/fg.nc,ex/(g.ionMassU*P.C.uKeV),1e-9);
});

test('two consistent calibrants: 0 ppb and the same B; inconsistent ones flagged by ppb and Birge',()=>{
  const mo=ion('97Mo'),ncMo=CS.nc*CS.ion.ionMassU/mo.ionMassU;
  const two=P.trapCalibration([CS,{ion:mo,nc:ncMo,snc:.002,nm:CS.nm,snm:.01}]);
  near(two.ppb[0],0,1e-6);near(two.ppb[1],0,1e-6);
  const bad=P.trapCalibration([CS,{ion:mo,nc:ncMo*(1+1e-8),snc:.002,nm:CS.nm,snm:.01}]);
  assert.ok(Math.abs(bad.ppb[1]-bad.ppb[0])>9&&bad.birge>1);
});

test('rejects invalid calibrants and unknown modes',()=>{
  assert.throws(()=>P.trapCalibration([]));
  assert.throws(()=>P.trapCalibration([{...CS,nm:CS.nc}]));
  assert.throws(()=>P.trapCalibration([CS],'other'));
});

test('TOF scales with √(m/q)',()=>{
  const a=ion('133Cs'),b=ion('85Rb');near(P.tofScale(100,a,b),100*Math.sqrt(b.ionMassU/a.ionMassU),1e-12);
  near(P.tofScale(100,a,ion('170Yb',2)),100*Math.sqrt(ion('170Yb',2).ionMassU/2/a.ionMassU),1e-12);
});

test('unchecked calibration leaves the ideal-trap result untouched (regression)',()=>{
  const a=ion('133Cs'),f=P.penning(a,7,100,.02605);near(f.nc,P.frequency(a,7),0);
});

// JYFLTRAP double trap: PyMassScanner default.ini (R31, 2026-07-22) stores trap-1 97Mo 1108887.227 Hz, trap-2 133Cs 808542.788 Hz,
// ν− = 1653.063 Hz in both traps, TOF calibrants RFQ→T1 82Se 177 µs and T1→T2 133Cs 47.3 µs, and its own outputs for 39K⁺:
// fc_T1 2757919.066, fc_T2 2757972.066, ν+ 2756319.003, νz 95460.662 Hz, TOF RFQ→T1 122.072 µs, T1→T2 25.610 µs,
// periods 10.476 / 0.363 / 604.938 µs, 13 keV per Hz. The website must reproduce them.
test('double trap reproduces the PyMassScanner reference outputs for 39K',()=>{
  const dt=P.doubleTrapCalibration({traps:{'1':[{ion:ion('97Mo'),nc:1108887.227,nm:1653.063}],'2':[{ion:ion('133Cs'),nc:808542.788,nm:1653.063}]},
    tof:{rfqT1:{ion:ion('82Se'),t:177},t1T2:{ion:ion('133Cs'),t:47.3}}});
  const f=P.doubleTrapFrequencies(ion('39K'),dt);
  near(f.trap1.nc,2757919.066,6e-4);near(f.trap2.nc,2757972.066,6e-4);near(f.trap2.np,2756319.003,6e-4);near(f.trap2.nz,95460.662,6e-4);
  near(f.tofRfqT1,122.072,6e-4);near(f.tofT1T2,25.610,6e-4);
  near(f.periodsUs.axial,10.476,6e-4);near(f.periodsUs.cyclotron,0.363,6e-4);near(f.periodsUs.magnetron,604.938,6e-4);
  assert.equal(Math.round(f.keVperHz),13);
  assert.ok(dt.fieldRatio>1&&dt.fieldRatio-1<1e-4);   // the two traps sit at slightly different fields of the same magnet
});
test('double trap needs at least one trap calibrant; TOF includes the isomer energy',()=>{
  assert.throws(()=>P.doubleTrapCalibration({traps:{}}));
  const dt=P.doubleTrapCalibration({traps:{'2':[{ion:ion('133Cs'),nc:808542.788,nm:1653.063}]},tof:{t1T2:{ion:ion('133Cs'),t:47.3}}});
  const g=P.doubleTrapFrequencies(ion('133Xe'),dt),m=P.doubleTrapFrequencies(ion('133mXe'),dt);
  assert.equal(g.trap1,null);assert.ok(m.tofT1T2>g.tofT1T2);
  near(m.tofT1T2/g.tofT1T2,Math.sqrt(ion('133mXe').ionMassU/ion('133Xe').ionMassU),1e-12);
});
