const {test}=require('node:test'),assert=require('node:assert/strict'),P=require('../static/js/physics.js');
const near=(a,b,t=1e-12)=>assert.ok(Math.abs(a-b)<=t,`${a} versus ${b}`);
test('reference overlap uses the cyclotron sum and compensates projected offsets',()=>{
 for(const f of [1000,812345.678901,1e6])for(const requested of [.01,.050001,9.99])for(const [minus,plus]of [[0,0],[45,90],[-90,30],[360,-360]]){
  const t=P.phaseTiming(requested,f,minus,plus,true,0),shift=(plus-minus)/360;
  assert.ok(t.actualSeconds>=requested-1e-13);assert.ok(t.actualSeconds-requested<=1/f+1e-13);
  near(f*t.actualSeconds+shift,Math.round(f*t.actualSeconds+shift),2e-9);
  const same=P.phaseTiming(requested,f,minus+20,plus+20,true,0);near(same.actualSeconds,t.actualSeconds);
 }
 const t=P.phaseTiming(.0103,1000,0,90,true,0);near(t.actualSeconds,.01075);near(t.residualDeg,0,1e-10);
 assert.equal(P.phaseTiming(.05,1e6,30,60,false,4).actualSeconds,.05);
});
test('4 ns clock shows its bounded residual and preserves requested versus actual time',()=>{
 for(const f of [1234.567,812345.678901,1e6]){
  const t=P.phaseTiming(.05000123,f,12.25,-76.5,true,4);
  near(t.actualSeconds/(4e-9),Math.round(t.actualSeconds/(4e-9)),1e-6);
  assert.ok(Math.abs(t.actualSeconds-t.idealSeconds)<=2e-9+1e-14);
  assert.ok(Math.abs(t.residualDeg)<=360*f*2e-9+1e-6);
  assert.equal(t.requestedSeconds,.05000123);
 }
 assert.throws(()=>P.phaseTiming(.1,0));assert.throws(()=>P.phaseTiming(-1,1));assert.throws(()=>P.phaseTiming(.1,1,NaN));
});
test('shortest-time search tests the actual aligned time without changing legacy mode',()=>{
 near(P.shortestPhaseTime([1000,1001],.02,3),9.55);
 const adjust=ms=>P.phaseTiming(ms/1000,1000,0,0,true,0).actualSeconds*1000;
 const requested=P.shortestPhaseTime([1000,1001],.02,3,5000,.01,adjust);
 assert.ok(requested<=9.55);assert.ok(2*Math.PI*.001*adjust(requested)>=.06-1e-12);
});
