const assert=require('node:assert/strict');
const M=require('../static/js/trap-motion.js');
const state=(p=0,m=1)=>({plus:[p,0],minus:[m,0],axial:1,phz:0});
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
let o=state(); M.coupling(o,8,Math.PI/16);near(M.radius(o.plus),1);near(M.radius(o.minus),0);
M.coupling(o,8,Math.PI/16);near(M.radius(o.plus),0);near(M.radius(o.minus),1);
for(const d of [0,.03,1,10]) {o=state(.25,.7);let a=state(.25,.7);M.coupling(o,8,Math.PI/16,d);for(let i=0;i<800;i++) M.coupling(a,.01,Math.PI/16,d,i*.01);near(M.radius(o.plus)**2+M.radius(o.minus)**2,.25**2+.7**2);for(const k of ['plus','minus'])for(let j=0;j<2;j++)near(o[k][j],a[k][j]);}
o=state(0,1);M.kick(o,1,1,Math.PI);near(M.radius(o.minus),0);
let f=M.modes(21);near(f.wp+f.wm,f.wc);near(2*f.wp*f.wm,f.wz*f.wz);near(f.wp,.3*21);near(f.wm,.3);
o=state(.3,.7);let a=state(.3,.7);M.drag(o,8,.08,f);for(let i=0;i<800;i++)M.drag(a,.01,.08,f);near(o.plus[0],a.plus[0]);near(o.minus[0],a.minus[0]);near(o.axial,a.axial);assert.ok(o.plus[0]<.3&&o.minus[0]>.7&&o.axial<1);
assert.ok(M.point(state(1,0),f,.001)[1]<0);
assert.equal(M.modes(2,2),null);
console.log(JSON.stringify({status:'PASS',checks:['bidirectional pi swap','unitary conservation','detuned subdivision equivalence','phase-opposed dipole cancellation','ideal frequency identities','drag subdivision equivalence','magnetron growth under drag','clockwise positive-ion motion','unconfined mass rejected']}));
