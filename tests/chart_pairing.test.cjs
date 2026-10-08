const {test}=require('node:test'),assert=require('node:assert/strict'),P=require('../static/js/physics.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('positive pairing energy from a known alternating mass pattern, both parities and axes',()=>{
 for(const axis of ['N','Z'])for(const centre of [20,21])for(const order of [3,5]){
  const get=(z,n)=>{const k=axis==='N'?n:z;return P.primitive(`${z}-${n}`,300+17*k-.6*(-1)**k,1);};
  const p=P.pairingIndicator(get,axis==='Z'?centre:50,axis==='N'?centre:50,axis,order);
  near(p.v,1.2);near(p.e,order===3?Math.sqrt(1.5):Math.sqrt(70)/8);
 }
});
test('five-point pairing rejects a smooth cubic trend and preserves missing data',()=>{
 const get=(z,n)=>P.primitive(`${z}-${n}`,300+17*n+.003*n**3-.6*(-1)**n,.1);
 for(const n of [20,21])near(P.pairingIndicator(get,50,n,'N',5).v,1.2);
 assert.equal(P.pairingIndicator((z,n)=>n===22?null:get(z,n),50,20,'N',5),null);
 assert.throws(()=>P.pairingIndicator(get,50,20,'A',5));
});
