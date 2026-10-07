/* Ideal-trap teaching envelopes, not a gas collision or electrode-field solver.
   Both classic views share this rotating-wave coupling and weak viscous-drag model.
   Frequencies are angular frequencies per model time; playback seconds are separate.
   q>0, B along +z: both radial modes rotate clockwise in physical x,y coordinates. */
(function (host) {
  const mul = (a, b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];
  const add = (a,b) => [a[0]+b[0],a[1]+b[1]];
  const phase = x => [Math.cos(x),Math.sin(x)];
  const radius = a => Math.hypot(...a);
  function modes(ratio, mass=1) {
    const wc=.3*(ratio+1)/mass, wz2=.18*ratio/mass;
    const D=wc*wc-2*wz2;
    if (!(D>0)) return null;
    const wp=(wc+Math.sqrt(D))/2, wm=wz2/(2*wp);
    return {wc,wp,wm,wz:Math.sqrt(wz2)};
  }
  function coupling(o, dt, g, delta=0, elapsed=0) {
    if (!g || !dt) return;
    const h=delta/2, O=Math.hypot(g,h), c=Math.cos(O*dt), s=Math.sin(O*dt)/O;
    const p=mul(o.plus,phase(-h*elapsed)), m=mul(o.minus,phase(h*elapsed));
    o.plus=mul(add(mul([c,-h*s],p),mul([0,-g*s],m)),phase(h*(elapsed+dt)));
    o.minus=mul(add(mul([0,-g*s],p),mul([c,h*s],m)),phase(-h*(elapsed+dt)));
  }
  function drag(o, dt, gamma, f) {
    const D=f.wp-f.wm;
    o.plus=o.plus.map(x=>x*Math.exp(-gamma*f.wp/D*dt));
    o.minus=o.minus.map(x=>x*Math.exp(gamma*f.wm/D*dt));
    o.axial*=Math.exp(-gamma*dt/2);
  }
  function kick(o, dt, amplitude, angle, delta=0, elapsed=0) {
    const x=delta*dt/2, sinc=Math.abs(x)<1e-8?1:Math.sin(x)/x;
    o.minus=add(o.minus,mul(phase(angle+delta*(elapsed+dt/2)),[amplitude*dt*sinc,0]));
  }
  function point(o,f,time) {
    const p=mul(o.plus,phase(-f.wp*time)), m=mul(o.minus,phase(-f.wm*time));
    return [p[0]+m[0],p[1]+m[1],o.axial*Math.cos(f.wz*time+o.phz)];
  }
  const API={modes,coupling,drag,kick,point,radius};
  host.ZGTrapMotion=API; if(typeof module!=="undefined") module.exports=API;
})(typeof window!=="undefined"?window:globalThis);
