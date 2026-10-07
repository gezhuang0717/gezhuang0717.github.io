/* Games page: physics games (the trap zoo animation lives in static/js/trap-zoo.js).
   Data: static/data/nubase2020.json (NUBASE2020). Labels: data-labels JSON on [data-games]. */
(() => {
  const root = document.querySelector("[data-games]");
  if (!root) return;
  const T = JSON.parse(root.dataset.labels), $ = s => root.querySelector(s);
  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", sup = n => String(n).replace(/\d/g, d => SUP[d]);
  const rnd = a => a[Math.floor(Math.random() * a.length)];
  const best = (k, v) => { try { const o = +localStorage.getItem("zg-game-" + k) || 0; if (v > o) localStorage.setItem("zg-game-" + k, v); return Math.max(o, v); } catch (e) { return v; } };
  let rows = [], catalog = null;
  const P = window.ZGPhysics;

  /* ── 1. Half-life: higher or lower ─────────────────────────────────── */
  function hlGame() {
    const box = $("#g-hl"); let a, b, score = 0;
    const pool = () => rows.filter(r => r[6] > -9 && r[6] < 20 && r[6] !== 99);
    const card = r => `<div class="g-nuc"><b>${sup(r[0] + r[1])}${r[2]}</b><small>Z ${r[0]} · N ${r[1]}</small></div>`;
    function round() {
      const p = pool(); a = a || rnd(p); do { b = rnd(p); } while (b === a || Math.abs(b[6] - a[6]) < 0.15);
      box.querySelector(".g-pair").innerHTML = card(a) + `<span class="g-vs">${T.hl_q}</span>` + card(b);
      box.querySelector(".g-msg").textContent = `${T.score}: ${score} · ${T.best}: ${best("hl", score)}`;
    }
    box.addEventListener("click", e => {
      const pick = e.target.closest("[data-pick]")?.dataset.pick; if (!pick) return;
      const longer = b[6] > a[6] ? "b" : "a", ok = pick === longer;
      score = ok ? score + 1 : 0;
      box.querySelector(".g-msg").textContent = `${ok ? "✔ " + T.right : "✘ " + T.wrong} ${sup(a[0] + a[1])}${a[2]}: ${a[7]} · ${sup(b[0] + b[1])}${b[2]}: ${b[7]} — ${T.score}: ${score} · ${T.best}: ${best("hl", score)}`;
      a = b; setTimeout(round, 1400);
    });
    round();
  }

  /* ── shared plotting helpers: crisp HiDPI canvases, axes with ticks, exports ── */
  const K = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
  function crisp(cv) {
    if (!cv._ratio) cv._ratio=(+cv.getAttribute("height"))/(+cv.getAttribute("width"));
    const w=Math.max(180,cv.clientWidth || cv._W || +cv.getAttribute("width")),h=Math.max(220,w*cv._ratio);
    cv._W=w;cv._H=h;cv.width=Math.round(w*K);cv.height=Math.round(h*K);cv.style.height=h+"px";
    const g = cv.getContext("2d"); g.setTransform(K, 0, 0, K, 0, 0); g.clearRect(0, 0,w,h);return [g,w,h];
  }
  /* render paint(g, W, H, ink) at 4× on white for a publication-quality PNG */
  function savePNG(cv, paint, name) {
    if (!window.zgExport) return;
    window.zgExport.png(sc => { const c = document.createElement("canvas"); c.width = cv._W * sc; c.height = cv._H * sc;
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.scale(sc, sc); paint(g, cv._W, cv._H, "#1d2433", true); return c; }, name, 6);
  }
  const inkOf = () => getComputedStyle(root).color || "#888";
  const fmtN = v => Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(1) : String(+v.toPrecision(6));
  function ticks(a, b, n = 6) {
    const span = b - a, raw = span / n, mag = 10 ** Math.floor(Math.log10(raw)), r = raw / mag;
    const step = (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag, out = [];
    for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + 1e-9 * span; v += step) out.push(+v.toFixed(12));
    return out;
  }
  /* frame with grid, ticks and labels; returns data→pixel maps */
  function axes(g, P, xr, yr, xl, yl, ink, ny = 5) {
    const X = v => P.l + (v - xr[0]) / (xr[1] - xr[0]) * (P.r - P.l), Y = v => P.b - (v - yr[0]) / (yr[1] - yr[0]) * (P.b - P.t);
    g.save(); g.lineWidth = 1; g.font = "11px system-ui,sans-serif"; g.fillStyle = ink;
    g.strokeStyle = "rgba(127,127,160,.18)"; g.textAlign = "center"; g.textBaseline = "top";
    ticks(xr[0], xr[1],P.r-P.l<300?3:6).forEach(v => { const x = X(v); g.beginPath(); g.moveTo(x, P.t); g.lineTo(x, P.b); g.stroke(); g.fillText(fmtN(v), x, P.b + 4); });
    g.textAlign = "right"; g.textBaseline = "middle";
    ticks(yr[0], yr[1], ny).forEach(v => { const y = Y(v); g.beginPath(); g.moveTo(P.l, y); g.lineTo(P.r, y); g.stroke(); g.fillText(fmtN(v), P.l - 5, y); });
    g.strokeStyle = "rgba(127,127,160,.75)"; g.strokeRect(P.l, P.t, P.r - P.l, P.b - P.t);
    g.font = "600 12px system-ui,sans-serif"; g.textAlign = "center"; g.textBaseline = "alphabetic";
    g.fillText(xl, (P.l + P.r) / 2, P.b + 32);
    g.translate(13, (P.t + P.b) / 2); g.rotate(-Math.PI / 2); g.fillText(yl, 0, 0);
    g.restore();
    return [X, Y];
  }
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const poisson = l => { let k = 0, p = 1; const L = Math.exp(-l); do { k++; p *= Math.random(); } while (p > L); return k - 1; };
  const viridis = t => { t = Math.max(0, Math.min(1, t)); const c = [[68, 1, 84], [59, 82, 139], [33, 145, 140], [94, 201, 98], [253, 231, 37]];
    const i = Math.min(3, Math.floor(t * 4)), f = t * 4 - i, a = c[i], b = c[i + 1]; return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * f)).join(",")})`; };
  /* value ± uncertainty with the uncertainty rounded to 2 significant digits and the value to the same decimal */
  const fmtU = (v, e, h = "") => { if (!(e > 0)) return v.toFixed(3) + h; const d = Math.max(0, 1 - Math.floor(Math.log10(e))); return `${v.toFixed(d)}${h} ± ${e.toFixed(d)}${h}`; };
  const msg = (box, html) => (box.querySelector(".g-msg").innerHTML = html);

  /* ── 2. TOF-ICR resonance hunt ─────────────────────────────────────────
     ¹³³Cs⁺ in B = 7 T: ν_c = qB/(2πm) = 808 795.0 Hz (reference). The true ν_c is hidden near it.
     Quadrupole excitation converts magnetron → reduced-cyclotron motion; the conversion profile F(δ)
     (rectangular or Ramsey two-pulse, as in König et al. 1995 / Kretzschmar 2007, same formulas as the
     owner's toficr.py). Radial energy E_r ∝ F is turned into axial energy in the B-field gradient, so the
     time of flight to the MCP is SHORTEST at resonance: the resonance is a TOF minimum (dip).          */
  function tofGame() {
    const TL = T;
    const box = $("#g-tof-hunt"), cv = box.querySelector("canvas"), sl = box.querySelector("input[type=range]");
    const sel = n => box.querySelector(`[name=${n}]`);
    const U = 1.66053906660e-27, ME = 9.1093837e-31, QE = 1.602176634e-19;
    /* ion and field are selectable; ν_c = zeB/(2π m_ion), m_ion = M_atom − z·m_e (AME2020 mass) */
    let NU_REF = 808795.0115, M_CS = 132.905451933, B = 7.0, ZQ = 1, ION = "¹³³Cs⁺", A_ION = 133;
    function setIon() {
      try { B=+sel("bfield").value; const ion=catalog.resolve(sel("ion").value,{q:+sel("zq").value}); ZQ=ion.q;sel("zq").value=ZQ;M_CS=ion.M;A_ION=ion.A;ION=ion.label;NU_REF=P.frequency(ion,B);box.querySelector(".tof-bad").textContent="";return true; }
      catch(e) {box.querySelector(".tof-bad").textContent=e.message;return false;}
    }
    let nuTrue, Trf, scheme, Wd, ions = [], shots = 0, fit = null, reveal = false, step;
    const tofOf = F => 62 + 193 / Math.sqrt(1 + 1.876 * F);          /* µs: 255 µs off resonance, ≈ 175 µs at full conversion */
    function conv(dnu) {
      const d = 2 * Math.PI * dnu;
      if (scheme === "rect") { const g0 = Math.PI / (2 * Trf), wB = Math.hypot(2 * g0, d); return (2 * g0 / wB) ** 2 * Math.sin(wB * Trf / 2) ** 2; }
      const tau = 0.1 * Trf, tw = Trf - 2 * tau, g0 = Math.PI / (4 * tau), wR = Math.hypot(2 * g0, d);
      return (2 * g0 / wR * Math.sin(wR * tau / 2)) ** 2 * (2 * Math.cos(d * tw / 2) * Math.cos(wR * tau / 2) - 2 * d / wR * Math.sin(d * tw / 2) * Math.sin(wR * tau / 2)) ** 2;
    }
    const U6 = [0.835, 0.865, 0.895, 0.925, 0.955, 0.985];
    const expect = dnu => { const F = conv(dnu); return 0.92 * U6.reduce((s, u) => s + tofOf(F * u), 0) / 6 + 0.08 * tofOf(0); };
    function fwhm() { /* numerical FWHM of the central conversion peak */
      let h = 0; while (h < Wd && conv(h) > 0.5) h += Wd / 4000; return 2 * h;
    }
    function shoot(dnu) {
      const n = poisson(+sel("ions").value), F = conv(dnu - (nuTrue - NU_REF)); shots++;
      for (let i = 0; i < n; i++) {
        const t = Math.random() < 0.08 ? tofOf(0) + 9 * gauss() : tofOf(F * (0.82 + 0.18 * Math.random())) + 7 * gauss();
        ions.push([dnu, t]);
      }
      return n;
    }
    function bins() { /* mean TOF ± standard error per frequency */
      const m = new Map(); ions.forEach(([f, t]) => { const k = f.toFixed(4); (m.get(k) || m.set(k, []).get(k)).push(t); });
      return [...m].map(([k, ts]) => { const n = ts.length, mu = ts.reduce((a, b) => a + b, 0) / n,
        sd = n > 1 ? Math.sqrt(ts.reduce((a, b) => a + (b - mu) ** 2, 0) / (n - 1)) : 14; return [+k, mu, Math.max(sd, 5) / Math.sqrt(n), n]; }).sort((a, b) => a[0] - b[0]);
    }
    function doFit() { /* least squares in the centre only (shape known): grid + parabola, σ from Δχ² = 1 */
      const bs = bins(); if (bs.length < 3) return null;
      const chi = c => bs.reduce((s, [f, mu, e]) => s + ((mu - expect(f - c)) / e) ** 2, 0);
      let best = [Infinity, 0]; for (let c = -Wd; c <= Wd; c += Wd / 600) { const v = chi(c); if (v < best[0]) best = [v, c]; }
      let lo = best[1], hi = best[1], h = Wd / 6000;
      while (chi(lo) - best[0] < 1 && lo > -2 * Wd) lo -= h; while (chi(hi) - best[0] < 1 && hi < 2 * Wd) hi += h;
      return { c: best[1], s: (hi - lo) / 2, chi2: best[0] / Math.max(1, bs.length - 1) };
    }
    function paint(g, W, H, ink, print) {
      const P = { l: 58, t: 14, r: W - 12, b: H - 44 }, yr = [140, 290];
      const [X, Y] = axes(g, P, [-Wd, Wd], yr, `ν_rf − ${NU_REF.toLocaleString("en")} Hz  (Hz)`, "mean TOF (µs)", ink);
      g.save(); g.beginPath(); g.rect(P.l, P.t, P.r - P.l, P.b - P.t); g.clip();
      if (sel("view").value === "pix") {          /* 2D histogram: crisp pixels, viridis */
        const nx = 64, ny = 42, h = new Array(nx * ny).fill(0); let mx = 0;
        ions.forEach(([f, t]) => { const i = Math.floor((f + Wd) / (2 * Wd) * nx), j = Math.floor((t - yr[0]) / (yr[1] - yr[0]) * ny);
          if (i >= 0 && i < nx && j >= 0 && j < ny) mx = Math.max(mx, ++h[j * nx + i]); });
        const cw = (P.r - P.l) / nx, ch = (P.b - P.t) / ny;
        for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const v = h[j * nx + i]; if (!v) continue;
          g.fillStyle = viridis(0.15 + 0.85 * Math.sqrt(v / mx)); g.fillRect(Math.floor(P.l + i * cw), Math.floor(P.b - (j + 1) * ch), Math.ceil(cw), Math.ceil(ch)); }
      } else {
        g.fillStyle = "rgba(139,108,255,.28)";
        ions.forEach(([f, t]) => { g.beginPath(); g.arc(X(f) + (Math.random() - 0.5) * 2, Y(t), 1.8, 0, 6.283); g.fill(); });
      }
      if (reveal || sel("theory").checked) {        /* expected line shape */
        g.strokeStyle = reveal ? "#e5484d" : "rgba(229,72,77,.55)"; g.lineWidth = 1.6; g.setLineDash(reveal ? [] : [5, 4]); g.beginPath();
        for (let i = 0; i <= 600; i++) { const f = -Wd + 2 * Wd * i / 600, y = Y(expect(f - (nuTrue - NU_REF))); i ? g.lineTo(X(f), y) : g.moveTo(X(f), y); } g.stroke(); g.setLineDash([]);
      }
      if (fit) {
        g.strokeStyle = "#30a46c"; g.lineWidth = 2; g.beginPath();
        for (let i = 0; i <= 600; i++) { const f = -Wd + 2 * Wd * i / 600, y = Y(expect(f - fit.c)); i ? g.lineTo(X(f), y) : g.moveTo(X(f), y); } g.stroke();
        g.fillStyle = "rgba(48,164,108,.15)"; g.fillRect(X(fit.c - fit.s), P.t, Math.max(1, X(fit.c + fit.s) - X(fit.c - fit.s)), P.b - P.t);
      }
      bins().forEach(([f, mu, e]) => { const x = X(f);   /* means with error bars */
        g.strokeStyle = ink; g.lineWidth = 1.2; g.beginPath(); g.moveTo(x, Y(mu - e)); g.lineTo(x, Y(mu + e)); g.moveTo(x - 3, Y(mu - e)); g.lineTo(x + 3, Y(mu - e)); g.moveTo(x - 3, Y(mu + e)); g.lineTo(x + 3, Y(mu + e)); g.stroke();
        g.fillStyle = "#3e63dd"; g.beginPath(); g.arc(x, Y(mu), 3.4, 0, 6.283); g.fill(); });
      if (!print) { const x = X(+sl.value); g.strokeStyle = "rgba(247,107,21,.85)"; g.setLineDash([3, 3]); g.beginPath(); g.moveTo(x, P.t); g.lineTo(x, P.b); g.stroke(); g.setLineDash([]); }
      if (reveal) { const x = X(nuTrue - NU_REF); g.strokeStyle = "#e5484d"; g.lineWidth = 1; g.beginPath(); g.moveTo(x, P.t); g.lineTo(x, P.b); g.stroke(); }
      g.restore();
      g.fillStyle = ink; g.font = "11px system-ui,sans-serif"; g.textAlign = "right";
      g.fillText(`${ION} · B = ${B} T · ν_c ≈ ${NU_REF.toFixed(1)} Hz · T_rf = ${Trf * 1000} ms (${scheme === "rect" ? "rectangular" : "Ramsey 10–80–10 %"}) · ${ions.length} ions / ${shots} shots`, P.r - 4, P.t + 13);
    }
    const draw = () => { const [g, W, H] = crisp(cv); paint(g, W, H, inkOf(), false); };
    function info() {
      const fw = fwhm(), R = NU_REF / fw;
      box.querySelector(".g-info").innerHTML = `FWHM ≈ ${fw.toFixed(2)} Hz (≈ ${(fw * Trf).toFixed(2)}/T_rf) · R = ν_c/FWHM ≈ ${Math.round(R).toLocaleString()} · ` +
        `δν = 0.1 Hz ↔ δm/m = ${(0.1 / NU_REF).toExponential(2)} ≈ ${(0.1 / NU_REF * M_CS * 931494.10242).toFixed(2)} keV`;
    }
    function reset() {
      if (!setIon()) return; Trf = +sel("trf").value; scheme = sel("scheme").value; Wd = (scheme === "rect" ? 3.6 : 4.0) / Trf;   /* rectangular: central dip + 3 side minima each side; Ramsey (fringe spacing 1/T_wait = 1.25/T_rf): central + 3 fringes each side */ step = +(Wd / 160).toPrecision(2);
      sl.min = -Wd; sl.max = Wd; sl.step = step; sl.value = 0;
      nuTrue = NU_REF + (Math.random() - 0.5) * 0.9 * Wd; ions = []; shots = 0; fit = null; reveal = false;
      upd(); info(); draw(); msg(box, TL.tof_start);
    }
    const upd = () => (box.querySelector("output").textContent = `${(NU_REF + +sl.value).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Hz (Δ = ${(+sl.value).toFixed(2)} Hz)`);
    box.addEventListener("click", e => {
      const a = e.target.closest("[data-act]")?.dataset.act; if (!a) return;
      if (a === "shot") { const n = shoot(+sl.value); draw(); msg(box, `${TL.shots}: ${shots} · ${TL.ions_got}: ${n}`); }
      if (a === "scan") { const n0 = 15; for (let i = 0; i < n0; i++) shoot(+(-Wd + 2 * Wd * i / (n0 - 1)).toFixed(4)); draw(); msg(box, `${TL.shots}: ${shots} · ${TL.scan_done}`); }
      if (a === "fit") { fit = doFit(); draw(); msg(box, fit ? `${TL.fit_res}: ν_c = ${fmtU(NU_REF + fit.c, fit.s)} Hz (δν/ν = ${(fit.s / NU_REF).toExponential(1)}) · χ²/ν = ${fit.chi2.toFixed(2)}` : TL.fit_need); }
      if (a === "guess") {
        const err = Math.abs(+sl.value - (nuTrue - NU_REF)), fw = fwhm(), sc = Math.max(0, Math.round(100 - 60 * err / fw - shots));
        const mG = ZQ * QE * B / (2 * Math.PI * (NU_REF + +sl.value)) / U + ZQ * ME / U, dm = (mG - M_CS) * 931494.10242;
        reveal = true; draw();
        msg(box, `ν_c = ${nuTrue.toLocaleString("en", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Hz · ${TL.yours}: ${(NU_REF + +sl.value).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Hz (Δ = ${err.toFixed(3)} Hz = ${(err / fw).toFixed(2)} FWHM)<br>` +
          `m = qB/(2πν_c) → ${mG.toFixed(7)} u (${dm >= 0 ? "+" : ""}${dm.toFixed(1)} keV vs AME2020) · ${TL.score}: <b>${sc}</b> · ${TL.best}: ${best("tof", sc)}`);
      }
      if (a === "new") reset();
      if (a === "png") savePNG(cv, paint, "tof-icr-resonance");
      if (a === "csv" && window.zgExport) window.zgExport.csv(["nu_rf_Hz", "detuning_Hz", "tof_us"], ions.map(([f, t]) => [(NU_REF + f).toFixed(4), f.toFixed(4), t.toFixed(2)]), "tof-icr-ions");
    });
    sl.addEventListener("input", () => { upd(); draw(); });
    ["trf", "scheme", "bfield", "zq"].forEach(n => sel(n).addEventListener("change", reset));
    sel("ion").addEventListener("change", reset);
    const waitRows = () => rows.length ? reset() : setTimeout(waitRows, 250); waitRows();
    ["view", "theory"].forEach(n => sel(n).addEventListener("change", draw));
    addEventListener("resize", draw);
    reset();
  }

  /* ── 3b. Keep the ions: linear Paul trap / RFQ mass filter ──────────────
     Mathieu equations (ξ = Ωt/2):  x'' + (a − 2q cos 2ξ) x = 0,  y'' − (a − 2q cos 2ξ) y = 0
     a = 8zeU/(m r₀²Ω²), q = 4zeV/(m r₀²Ω²). Rods: radius 1.145 r₀. An ion is lost only when it touches a rod.
     Stability boundaries from the exact characteristic values a₀(q) (ce₀) and b₁(q) (se₁), computed as the
     lowest eigenvalue of the Hill matrices (Sturm bisection) — the first region ends at q = 0.908046 (a = 0)
     and has its tip at q = 0.705996, a = 0.236994.                                                          */
  const MA0=P.mathieuA0, MB1=P.mathieuB1, mathieuStable=P.mathieuStable, Q_EDGE=.908046, Q_TIP=.705996, A_TIP=.236994;
  function rfqGame() {
    const box = $("#g-rfq"); if (!box) return;
    const TL = T;
    const [cv, cvd] = box.querySelectorAll("canvas"), sel = n => box.querySelector(`[name=${n}]`), V = n => +sel(n).value;
    const U_KG = 1.66053906660e-27, QE = 1.602176634e-19, ME_U = 5.48579909065e-4, rho = 1.145, Rc = 1 + rho;
    const cols = ["#3e63dd", "#30a46c", "#e5484d", "#f5b800", "#8e4ec6", "#0894b3", "#d6409f", "#f76b15"];
    let random=P.rng(20261007); const gaussian=()=>P.gaussian(random);
    let species = [], ions = [], sparks = [], xi = 0, running = !matchMedia("(prefers-reduced-motion: reduce)").matches, target = 1;
    const kfac = () => QE / (U_KG * (V("r0") / 1000) ** 2 * (2 * Math.PI * V("f") * 1e6) ** 2);
    const aq = sp => { const k = kfac() * sp.z / sp.m; return [8 * k * V("U"), 4 * k * V("V")]; };
    /* boundary polygon (cached; depends on nothing but q) */
    const BND = [...Array(181)].map((_, i) => { const q = Q_EDGE * i / 180; return [q, Math.max(0, Math.min(MB1(q), -MA0(q)))]; });
    function massOf(lbl) { try {const x=catalog.resolve(lbl);return {label:x.label,m:x.ionMassU,z:x.q,source:x.source,state_ids:x.atoms.map(a=>a.state.id)};} catch(e){return null;} }
    function reset() {
      if(!sel("rfq-seed").checkValidity()){bad.textContent="Invalid RFQ seed / RFQ 随机种子无效";ions=[];running=false;return;}
      random=P.rng(V("rfq-seed"));xi=0; const A0 = V("A");
      species = (sel("set").value === "near" ? [A0 - 2, A0, A0 + 2] : sel("set").value === "far" ? [Math.max(1, Math.round(A0 / 2)), A0, A0 * 2] : [A0])
        .map(A => ({ label: "A = " + A, m: A, z: 1 }));
      if (sel("custom").checked) { const input=(sel("ions").value||"").split(/[,;]/).filter(x=>x.trim()), custom=input.map(massOf); if(!custom.length || custom.some(x=>!x)){ bad.textContent=TL.rfq_bad; ions=[]; running=false;[cv,cvd].forEach(c=>{const [g,W,H]=crisp(c);g.clearRect(0,0,W,H);});box.querySelector(".rfq-out").textContent="";msg(box,TL.rfq_bad);return; } species=custom; bad.textContent="";running=!matchMedia("(prefers-reduced-motion: reduce)").matches; }
      species = species.slice(0, 8); species.forEach((s, i) => (s.c = cols[i], s.t = 0, s.l = 0));
      const tsel = sel("target"), keep = tsel.value; tsel.innerHTML = species.map((s, i) => `<option value="${i}">${s.label}</option>`).join("");
      target = keep !== "" && species[+keep] ? +keep : Math.min(1, species.length - 1); tsel.value = target;
      ions = Array.from({ length: 30 }, (_, i) => spawn(i)); ions.forEach(o => (o.age = random() * 40)); sparks = [];
      box.querySelector(".rfq-leg").innerHTML = species.map((s, i) => `<span><i style="background:${s.c}"></i>${s.label}${i === target ? " ★" : ""}</span>`).join("");
      bad.textContent = sel("custom").checked && (sel("ions").value || "").split(/[,;]/).filter(x => x.trim() && !massOf(x)).length ? TL.rfq_bad : "";
      refresh();
    }
    function refresh() {if(box.hidden || !ions.length)return;{const [g,W,H]=crisp(cv);paint(g,W,H,inkOf());}{const [g,W,H]=crisp(cvd);paintD(g,W,H,inkOf());}report();}
    addEventListener("resize",refresh);
    function spawn(i) { const sp = species[i % species.length], r = V("emit") / 100 * Math.sqrt(random()), f = 6.283 * random();
      return { sp, x: r * Math.cos(f), y: r * Math.sin(f), vx: V("emit") / 1000 * gaussian(), vy: V("emit") / 1000 * gaussian(), age: 0, tr: [] }; }
    function step(o, h) {               /* RK4 in ξ */
      const [a, q] = aq(o.sp), s = xi, p = [o.x, o.y, o.vx, o.vy];
      const F = (s1, [x, y, vx, vy]) => { const f = a - 2 * q * Math.cos(2 * s1); return [vx, vy, -f * x, f * y]; };
      const k1 = F(s, p), k2 = F(s + h / 2, p.map((v, i) => v + h / 2 * k1[i])), k3 = F(s + h / 2, p.map((v, i) => v + h / 2 * k2[i])), k4 = F(s + h, p.map((v, i) => v + h * k3[i]));
      [o.x, o.y, o.vx, o.vy] = p.map((v, i) => v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }
    const hit = o => [[Rc, 0], [-Rc, 0], [0, Rc], [0, -Rc]].some(([cx, cy]) => Math.hypot(o.x - cx, o.y - cy) < rho) || Math.hypot(o.x, o.y) > 3;
    function tick() {
      const h = 0.05, n = V("speed"), life = V("cycles") * Math.PI;
      for (let s = 0; s < n; s++) {
        ions.forEach((o, i) => {
          step(o, h); o.age += h;
          if (hit(o)) { o.sp.l++; sparks.push([o.x, o.y, 1, o.sp.c]); ions[i] = spawn(i); }
          else if (o.age > life) { o.sp.t++; ions[i] = spawn(i); }
        });
        xi += h;
      }
      ions.forEach(o => { o.tr.push([o.x, o.y]); if (o.tr.length > 70) o.tr.shift(); });
    }
    function paint(g, W, H, ink) {      /* cross-section */
      const S = Math.min(W, H) / 2 / 2.05, cx = W / 2, cy = H / 2, pol = Math.cos(2 * xi) > 0;
      [[Rc, 0, 1], [-Rc, 0, 1], [0, Rc, -1], [0, -Rc, -1]].forEach(([x, y, sgn]) => {
        const pos = (sgn > 0) === pol; g.fillStyle = pos ? "rgba(229,72,77,.82)" : "rgba(62,99,221,.82)";
        g.beginPath(); g.arc(cx + x * S, cy + y * S, rho * S, 0, 6.283); g.fill();
        g.fillStyle = "#fff"; g.font = "700 14px system-ui"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(pos ? "+" : "−", cx + x * S * 0.78, cy + y * S * 0.78);
      });
      g.strokeStyle = "rgba(127,127,160,.55)"; g.setLineDash([3, 4]); g.beginPath(); g.arc(cx, cy, S, 0, 6.283); g.stroke(); g.setLineDash([]);
      g.fillStyle = ink; g.font = "11px system-ui"; g.textAlign = "left"; g.textBaseline = "alphabetic"; g.fillText(`r₀ = ${V("r0")} mm · Ω/2π = ${V("f")} MHz`, 8, 16);
      ions.forEach(o => { g.strokeStyle = o.sp.c + "66"; g.lineWidth = 1; g.beginPath(); o.tr.forEach(([x, y], i) => i ? g.lineTo(cx + x * S, cy + y * S) : g.moveTo(cx + x * S, cy + y * S)); g.stroke();
        g.fillStyle = o.sp.c; g.beginPath(); g.arc(cx + o.x * S, cy + o.y * S, 3, 0, 6.283); g.fill(); });
      sparks = sparks.filter(s => (s[2] -= 0.03) > 0);
      sparks.forEach(([x, y, l, c]) => { g.strokeStyle = c; g.globalAlpha = l; g.lineWidth = 2; for (let i = 0; i < 6; i++) { const a = i * 1.047; g.beginPath(); g.moveTo(cx + x * S, cy + y * S); g.lineTo(cx + x * S + 9 * l * Math.cos(a), cy + y * S + 9 * l * Math.sin(a)); g.stroke(); } g.globalAlpha = 1; });
    }
    function paintD(g, W, H, ink) {     /* a–q stability diagram (exact boundaries), scan line and working points */
      const P = { l: 54, t: 10, r: W - 10, b: H - 40 }, [X, Y] = axes(g, P, [0, 1], [-0.3, 0.3], W<400?"q":"q = 4zeV / (m r₀² Ω²)", W<400?"a":"a = 8zeU / (m r₀² Ω²)", ink, 6);
      g.fillStyle = "rgba(48,164,108,.22)"; g.strokeStyle = "rgba(48,164,108,.85)"; g.lineWidth = 1.3; g.beginPath();
      BND.forEach(([q, a], i) => i ? g.lineTo(X(q), Y(a)) : g.moveTo(X(q), Y(a)));
      [...BND].reverse().forEach(([q, a]) => g.lineTo(X(q), Y(-a))); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = ink; g.font = "10px system-ui"; g.textAlign = "center";
      g.fillText("0.908", X(Q_EDGE), Y(0) - 6); g.fillText(`tip (${Q_TIP.toFixed(3)}, ${A_TIP.toFixed(3)})`, X(Q_TIP), Y(A_TIP) - 7);
      g.beginPath(); g.arc(X(Q_TIP), Y(A_TIP), 2.5, 0, 6.283); g.arc(X(Q_EDGE), Y(0), 2.5, 0, 6.283); g.fill();
      const r = V("V") > 0 ? 2 * V("U") / V("V") : 0; g.strokeStyle = ink; g.setLineDash([4, 4]); g.beginPath(); g.moveTo(X(0), Y(0)); g.lineTo(X(1), Y(Math.min(0.3, r))); g.stroke(); g.setLineDash([]);
      species.forEach((sp, i) => { const [a, q] = aq(sp); if (q > 1.02 || Math.abs(a) > 0.32) return; g.fillStyle = sp.c; g.beginPath(); g.arc(X(q), Y(a), i === target ? 6 : 4.5, 0, 6.283); g.fill();
        if (i === target) { g.strokeStyle = ink; g.lineWidth = 1.5; g.stroke(); } });
      g.fillStyle = ink; g.font = "11px system-ui"; g.textAlign = "left"; g.fillText(TL.rfq_stable, X(0.04), Y(0.02));
    }
    function report() {
      box.querySelector(".rfq-out").innerHTML = species.map((sp, i) => { const n = sp.t + sp.l, [a, q] = aq(sp);
        return `<span style="color:${sp.c}">${sp.label} (m = ${sp.m.toFixed(sp.m % 1 ? 4 : 0)} u${sp.z > 1 ? ", z = " + sp.z : ""}): q = ${q.toFixed(4)}, a = ${a.toFixed(4)} → ${mathieuStable(a, q) ? "✔" : "✘"} ${n ? (100 * sp.t / n).toFixed(0) + " %" : "–"}</span>`; }).join("");
      const tg = species[target], tr = s => s.t / Math.max(1, s.t + s.l), T0 = tr(tg), others = species.filter((_, i) => i !== target), Tx = others.length ? Math.max(...others.map(tr)) : 0;
      const n = species.reduce((s, sp) => s + sp.t + sp.l, 0), sc = Math.round(100 * T0 * (1 - Tx));
      msg(box, n > 60 ? `${TL.rfq_score}: <b>${sc}</b> (${TL.rfq_t}: ${(100 * T0).toFixed(0)} %, ${TL.rfq_o}: ${(100 * Tx).toFixed(0)} %) · ${TL.best}: ${best("rfq", sc)}` : TL.rfq_start);
    }
    const bad = box.querySelector(".rfq-bad") || document.createElement("span");
    const resetStats = () => species.forEach(s => (s.t = s.l = 0));
    let last = 0;
    function loop(ts) {
      const r = box.getBoundingClientRect();
      if (running && r.bottom > 0 && r.top < innerHeight) {
        tick(); { const [g, W, H] = crisp(cv); paint(g, W, H, inkOf()); }
        if (ts - last > 300) { last = ts; const [g, W, H] = crisp(cvd); paintD(g, W, H, inkOf()); report(); }
      }
      requestAnimationFrame(loop);
    }
    const tgt = () => species[target] || { m: V("A"), z: 1 };
    box.addEventListener("input", e => { const n = e.target.name; if (["A", "set", "ions", "rfq-seed"].includes(n)) reset(); else if (["U", "V", "r0", "f", "emit", "cycles"].includes(n)) resetStats();refresh(); last = 0; });
    box.addEventListener("change", e => { const n = e.target.name; if (n === "set" || n === "custom") reset(); if (n === "target") { target = +e.target.value; reset(); } });
    box.addEventListener("click", e => {
      const a = e.target.closest("[data-act]")?.dataset.act; if (!a) return;
      if(bad.textContent){msg(box,bad.textContent);return;}
      const t = tgt(), k = kfac() * t.z / t.m, setv = (n, v) => { sel(n).value = v; sel(n).dispatchEvent(new Event("input", { bubbles: true })); };
      if (a === "cool") { setv("U", 0); setv("V", (0.4 / (4 * k)).toFixed(2)); }
      if (a === "tip") { setv("V", (0.7035 / (4 * k)).toFixed(2)); setv("U", (0.2335 / (8 * k)).toFixed(3)); }
      if (a === "edge") { setv("U", 0); setv("V", (0.90 / (4 * k)).toFixed(2)); }
      if (a === "pause") running = !running;
      if (a === "png") savePNG(cv, paint, "rfq-cross-section");
      if (a === "png2") savePNG(cvd, paintD, "rfq-stability-diagram");
      if (a === "video" && window.zgExport) { const b = e.target.closest("[data-act]"); zgExport.record(cv, 8, "rfq-ions", r => { b.disabled = r; b.classList.toggle("is-rec", r); }); }
      if (a === "json") { const record={model:"ideal linear RFQ / Mathieu dynamics",source:catalog.metadata,seed:V("rfq-seed"),parameters:Object.fromEntries(["U","V","r0","f","emit","cycles"].map(n=>[n,V(n)])),units:{U:"V DC",V:"V zero-to-peak RF",r0:"mm",f:"MHz",emit:"percent r0",cycles:"RF cycles"},species,ions,xi,assumptions:["Collisionless transverse RK4 trajectories; circular rods radius=1.145 r0", "Finite-time illustrated transmission is not calibrated efficiency; axial transport, space charge, gas and fringe fields omitted", "Generic A presets use illustrative masses; custom ions use the shared evaluated state catalogue"]};window.zgExport?.save(new Blob([JSON.stringify(record,null,2)],{type:"application/json"}),"rfq-inputs-results.json"); }
      resetStats();refresh(); last = 0;
    });
    const waitRows = () => rows.length ? reset() : setTimeout(waitRows, 200);
    reset(); waitRows(); requestAnimationFrame(loop);
  }

  /* ── 3c. Phase-imaging (PI-ICR): resolve an isomer from its ground state ─────────────────────
     After an accumulation time t_acc the reduced-cyclotron phase φ = 2π ν t_acc (mod 2π) is projected onto a
     position-sensitive MCP. Ground state and isomer (heavier by E_x/c²) differ by Δν_c = ν_c · E_x/(m c²),
     so their spots are Δφ = 2π Δν_c t_acc apart (mod 2π). Spot width σ_φ ≈ σ_r / R_spot. Resolving power
     R = ν_c/Δν_FWHM = 2π ν_c t_acc / (2.355 σ_φ) (Eliseev et al., PRL 110, 082501 (2013); Nesterenko et al., EPJA 54, 154 (2018)). */
  function piicrGame() {
    const box = $("#g-pi"); if (!box) return;
    const TL = T, [cv, cvh] = box.querySelectorAll("canvas"), sel = n => box.querySelector(`[name=${n}]`), V = n => +sel(n).value;
    /* CODATA 2018 / AME2020 constants */
    const UKEV = 931494.10242, QE = 1.602176634e-19, U = 1.66053906660e-27, MEU = 5.48579909065e-4, UNIT = { ys: 1e-24, zs: 1e-21, as: 1e-18, fs: 1e-15, ps: 1e-12, ns: 1e-9, us: 1e-6, "μs": 1e-6, ms: 1e-3, s: 1, m: 60, h: 3600, d: 86400, y: 3.156e7, ky: 3.156e10, My: 3.156e13, Gy: 3.156e16 };
    const COL = ["#3e63dd", "#e5484d", "#30a46c", "#f76b15", "#8e4ec6", "#0090ff", "#d6409f", "#978365", "#12a594", "#ffb224"];
    const hl = t => { const m = String(t || "").replace("#", "").match(/^([\d.]+)\s*([a-zA-Zμ]+)/); return m && UNIT[m[2]] ? +m[1] * UNIT[m[2]] : t === "stable" ? Infinity : null; };
    let list = [], S = null, hits = [], ame = null, multi = [], bad = [];
    fetch(root.dataset.ame).then(r => r.json()).then(d => { ame = new Map(d.rows.map(r => [r[2].toLowerCase() + r[1], r])); if (sel("multi").checked) parse(); }).catch(() => {});
    function build() {
      list = [];
      for (const state of catalog.states.values()) {
        if ((!sel("other-states").checked && state.kind !== "isomer") || state.source_state_index === 0 || state.existence === "withdrawn" || !(state.excitation.value > 0) || state.excitation.qualifier) continue;
        try {
          const ground = catalog.resolve(`${state.A}${state.element}`, { massSource: sel("mtab").value });
          const isomer = catalog.resolve(`${state.A}${state.element}[${state.source_state_index}]`, { massSource: sel("mtab").value });
          list.push({ id: state.id, label: `${state.A}${state.element} / ${state.A}${state.element}[${state.label}]`, A: state.A, me: (ground.M-state.A)*P.C.uKeV, ex: state.excitation.value, exError: state.excitation.uncertainty, exFlag: state.excitation.value_extrapolated, exErrorFlag: state.excitation.uncertainty_extrapolated, gt: ground.atoms[0].state.half_life.raw, it: state.half_life.raw+' '+state.half_life.unit, sym: state.element, ground, isomer });
        } catch (_) { /* Data-only records remain visible in the chart. */ }
      }
      list.sort((a,b)=>a.A-b.A);
      filterList("54-79-1");
    }
    function filterList(preferred) {
      const query = sel("iso-search").value.trim().toLowerCase(), prior = preferred || sel("iso").value;
      const matches = list.filter(s=>s.label.toLowerCase().includes(query));
      sel("iso").innerHTML = matches.map(x=>`<option value="${x.id}">${x.label} (Eₓ = ${x.ex}${x.exFlag ? "#" : ""} ± ${x.exError == null ? "?" : x.exError}${x.exErrorFlag ? "#" : ""} keV, T½ = ${x.it})</option>`).join("");
      if (matches.some(x=>x.id === prior)) sel("iso").value=prior;
      pick();
    }
    function pick() { S = list.find(x=>x.id === sel("iso").value); hits = []; piRandom=P.rng(V("pi-seed"));phaseOffsets=[]; if (!S) { msg(box,"No matching calculable isomer / 无匹配的可计算同核异能态"); return; } draw(); }
    function ion(text) { try { const x=catalog.resolve(text,{massSource:sel("mtab").value}); return {...x,src:x.source,ex:x.atoms.reduce((v,a)=>v+(a.state.excitation.value||0)*a.count,0)}; } catch (error) { return null; } }
    let piRandom = P.rng(20261007), phaseOffsets = [];
    function parse() {
      multi = []; bad = [];
      sel("ions").value.split(/[,;\n]+/).forEach(t => { if (!t.trim()) return; const x = ion(t); x ? multi.push(x) : bad.push(t.trim()); });
      multi = multi.slice(0, COL.length);
      box.querySelector(".pi-bad").textContent = bad.length ? `${TL.pi_bad}: ${bad.join(", ")}` : "";
      hits = []; phaseOffsets=[]; piRandom=P.rng(V("pi-seed")); draw();
    }
    const isMulti = () => sel("multi").checked;
    /* species list → each with ion mass (u), charge, weight, colour */
    function species() {
      if (isMulti() && (!multi.length || bad.length)) throw new Error("Select valid ion states; unavailable states cannot fall back to the ground state. / 请指定有效核态，不可自动替换为基态。");
      if (isMulti()) return multi.map((x,i)=>({...x,col:COL[i]}));
      const options={massSource:sel("mtab").value}, st=catalog.states.get(S.id), r=V("ratio")/100;
      const ground=catalog.resolve(`${st.A}${st.element}`,options), excited=catalog.resolve(`${st.A}${st.element}[${st.source_state_index}]`,options);
      return [{...ground,w:1-r,col:COL[0],src:ground.source},{...excited,w:r,col:COL[1],src:excited.source}];
    }
    function freqs(sp) { return P.penning({...sp,ionMassU:sp.M-sp.q*P.C.electronU},V("B"),V("u0"),V("dch")/1000); }
    const ph = P.wrapPhase;
    const adist = (a, b) => { let d = Math.abs(a - b) % (2 * Math.PI); return Math.min(d, 2 * Math.PI - d); };
    function phys() {
      if (["tacc","B","spot","ratio","cfrac","u0","dch","radius","floor","centroid-count","pi-seed"].some(n=>!sel(n).checkValidity())) throw new Error("Invalid physical input / 物理输入无效");
      const t = V("tacc") / 1000, sp = species().map(s => { const f = freqs(s); return { ...s, ...f, phi: ph(2 * Math.PI * f.nc * t), n: Math.floor(f.nc * t) }; });
      const nu = sp[0].nc, resolution=P.phaseResolution(nu,t,V("radius"),V("spot")/10,V("centroid-count"),V("floor")/1000), sig=resolution.defined ? resolution.eventSigma : Infinity;
      let minsep = Infinity, pair = null;
      for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) { const d = adist(sp[i].phi, sp[j].phi); if (d < minsep) { minsep = d; pair = [i, j]; } }
      return { B: V("B"), t, sp, nu, sig, d: minsep, pair, sep: sp.length > 1 ? minsep / sig : Infinity, R: resolution.resolvingPower || 0, resolution };
    }
    /* hit types: 2 centre spot (no radial motion), 3 magnetron reference, 10+i species i */
    function shoot(n) {
      const p=phys(); if(p.sp.some(s=>!s.stable)) throw new Error("Unconfined ideal-trap parameters / 理想阱参数不能囚禁离子"); if (!p.resolution.defined) { msg(box,"Phase undefined at zero radius / 半径为零时相位未定义"); return; }
      const W=p.sp.reduce((a,s)=>a+s.w,0); if (!(W>0)) { msg(box,"Use a positive population / 至少一个占比需大于零"); return; }
      const normal=()=>P.gaussian(piRandom), sigma=0.62*V("spot")/10/V("radius"), floor=V("floor")/1000;
      if(phaseOffsets.length!==p.sp.length) phaseOffsets=p.sp.map(()=>floor*normal()); const offsets=phaseOffsets;
      for(let k=0;k<n;k++) {
        const u=piRandom();
        if(u<V("cfrac")/100) { hits.push([.035*normal(),.035*normal(),2]); continue; }
        if(sel("ref").checked && u<V("cfrac")/100+.15) { hits.push([sigma*normal(),.62+sigma*normal(),3]); continue; }
        let x=piRandom()*W,i=0;while(i<p.sp.length-1 && (x-=p.sp[i].w)>0)i++;
        const angle=p.sp[i].phi+offsets[i];hits.push([.62*Math.cos(angle)+sigma*normal(),.62*Math.sin(angle)+sigma*normal(),10+i]);
      }
    }
    const hitCol = (k, sp) => k === 2 ? "rgba(30,30,40,.55)" : k === 3 ? "rgba(127,127,160,.6)" : ((sp[k - 10] || {}).col || "#888") + "8c";
    function paint(g, W, H, ink) {      /* detector view */
      const p = phys(), R = Math.min(W, H) / 2 - 18, cx = W / 2, cy = H / 2;
      g.fillStyle = "rgba(127,127,160,.08)"; g.beginPath(); g.arc(cx, cy, R, 0, 6.283); g.fill(); g.strokeStyle = "rgba(127,127,160,.6)"; g.lineWidth = 1.2; g.stroke();
      g.setLineDash([3, 4]); g.beginPath(); g.moveTo(cx - R, cy); g.lineTo(cx + R, cy); g.moveTo(cx, cy - R); g.lineTo(cx, cy + R); g.stroke(); g.setLineDash([]);
      if (sel("pix").checked) {           /* 2D histogram (pixels) */
        const n = 72, hgrid = new Array(n * n).fill(0); let mx = 0;
        hits.forEach(([x, y]) => { const i = Math.floor((x + 1) / 2 * n), j = Math.floor((1 - y) / 2 * n); if (i >= 0 && i < n && j >= 0 && j < n) mx = Math.max(mx, ++hgrid[j * n + i]); });
        const c = 2 * R / n; for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) { const v = hgrid[j * n + i]; if (v) { g.fillStyle = viridis(0.15 + 0.85 * Math.sqrt(v / mx)); g.fillRect(cx - R + i * c, cy - R + j * c, Math.ceil(c), Math.ceil(c)); } }
      } else hits.forEach(([x, y, k]) => { g.fillStyle = hitCol(k, p.sp); g.beginPath(); g.arc(cx + x * R, cy - y * R, 1.8, 0, 6.283); g.fill(); });
      g.strokeStyle = "rgba(30,30,40,.6)"; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, 6, 0, 6.283); g.stroke();    /* centre spot */
      g.fillStyle = ink; g.font = "11px system-ui"; g.textAlign = "left"; g.fillText(TL.pi_center, cx + 9, cy + 14);
      g.fillStyle = "rgba(127,127,160,.9)"; g.beginPath(); g.arc(cx, cy - 0.62 * R, 5, 0, 6.283); g.fill();   /* magnetron reference spot */
      g.font = "11px system-ui"; g.textAlign = "center"; g.fillStyle = ink; g.fillText(TL.pi_ref, cx, cy - 0.62 * R - 10);
      const rr = Math.max(6, 0.62 * R * p.sig * 2);
      p.sp.forEach((s, i) => { const x = cx + 0.62 * R * Math.cos(s.phi), y = cy - 0.62 * R * Math.sin(s.phi);
        g.strokeStyle = s.col; g.lineWidth = 1.5; g.beginPath(); g.arc(x, y, rr, 0, 6.283); g.stroke();
        const lx = cx + (0.62 * R + rr + 14) * Math.cos(s.phi), ly = cy - (0.62 * R + rr + 14) * Math.sin(s.phi) + 4 + (i % 2 ? 11 : 0) * (p.sp.length > 3 ? 1 : 0);
        g.fillStyle = s.col; g.font = "bold 11px system-ui"; g.fillText(s.label, Math.max(g.measureText(s.label).width/2+3, Math.min(W-g.measureText(s.label).width/2-3, lx)), Math.max(12, Math.min(H - 4, ly))); });
      g.textAlign = "left"; g.font = "11px system-ui"; g.fillStyle = ink; if(W<450){g.fillText(`t = ${V("tacc")} ms · B = ${p.B} T`,8,14);g.fillText(`νc = ${p.nu.toFixed(3)} Hz`,8,28);}else g.fillText(`t_acc = ${V("tacc")} ms · B = ${p.B} T · ν_c(${p.sp[0].label}) = ${p.nu.toFixed(3)} Hz · n = ${p.sp[0].n.toLocaleString()} turns`, 8, 14);
    }
    function paintH(g, W, H, ink) {     /* angle histogram */
      const p = phys(), P = { l: 48, t: 10, r: W - 10, b: H - 36 }, nb = 120, h = new Array(nb).fill(0);
      hits.forEach(([x, y, k]) => { if (k === 2) return; const a = (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI); h[Math.min(nb - 1, Math.floor(a / (2 * Math.PI) * nb))]++; });
      const mx = Math.max(4, ...h) * 1.1, [X, Y] = axes(g, P, [0, 360], [0, mx], TL.pi_angle, "counts", ink, 4), bw = (P.r - P.l) / nb;
      h.forEach((v, i) => { if (v) { g.fillStyle = "rgba(142,78,198,.75)"; g.fillRect(X(i * 360 / nb), Y(v), Math.max(1, bw - 0.4), P.b - Y(v)); } });
      p.sp.forEach((s, i) => { g.strokeStyle = s.col; g.setLineDash([4, 3]); g.beginPath(); g.moveTo(X(s.phi * 180 / Math.PI), P.t); g.lineTo(X(s.phi * 180 / Math.PI), P.b); g.stroke(); g.setLineDash([]);
        g.fillStyle = s.col; g.font = "10px system-ui"; g.textAlign = "center"; g.fillText(s.label, X(s.phi * 180 / Math.PI), P.t + 10 + 11 * (i % 3)); });
    }
    const f3 = v => isFinite(v) ? v.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "—";
    function table(p) {      /* eigenfrequencies of every species (ideal trap, masses from AME2020 / NUBASE2020) */
      const ref = p.sp[0];
      const rowsH = p.sp.map(s => `<tr><td><span class="pi-dot" style="background:${s.col}"></span>${s.label}</td><td>${s.q}</td><td>${(s.M - s.q * MEU).toFixed(8)}<br>σ = ${s.e == null ? "?" : s.e.toPrecision(4)} keV</td>` +
        `<td>${f3(s.nc)}</td><td>${f3(s.np)}</td><td>${f3(s.nm)}</td><td>${f3(s.nz)}</td><td>${(s.phi * 180 / Math.PI).toFixed(1)}°</td>` +
        `<td>${s === ref ? "—" : ((s.nc - ref.nc) >= 0 ? "+" : "") + (s.nc - ref.nc).toFixed(4) + " Hz / " + (adist(s.phi, ref.phi) * 180 / Math.PI).toFixed(1) + "°"}</td>` +
        `<td class="zg-muted">${s.src || "NUBASE2020"}${s.est ? " (#)" : ""}</td></tr>`).join("");
      box.querySelector(".pi-freq").innerHTML = `<table class="zg-table pi-tab"><thead><tr><th>${TL.ion}</th><th>q</th><th>m_ion (u)</th><th>ν_c (Hz)</th><th>ν₊ (Hz)</th><th>ν₋ (Hz)</th><th>ν_z (Hz)</th><th>φ_c</th><th>Δν_c / Δφ</th><th>${TL.pi_mtab}</th></tr></thead><tbody>${rowsH}</tbody></table>` +
        `<p class="zg-muted pi-inv">ν₊ + ν₋ = ν_c · ν₊² + ν₋² + ν_z² = ν_c² · ν₋ ≈ U₀/(4πB d²) (${TL.pi_mindep}) ${p.sp.some(s => !s.stable) ? " · ⚠ " + TL.pi_unstable : ""}</p>`;
    }
    function timeComparison(p) {
      const host=box.querySelector(".pi-times");host.hidden=!sel("compare-times").checked;
      if(host.hidden) return;
      for(const n of ["compare-t2","compare-t3"]) if(!sel(n).checkValidity()) throw new Error("Invalid comparison time / 比较时间无效");
      const times=[p.t,V("compare-t2")/1000,V("compare-t3")/1000];
      const rows=times.map(t=>{const phases=p.sp.map(s=>ph(2*Math.PI*s.nc*t));return p.sp.map((s,i)=>`<tr><td>${(t*1000).toFixed(2)}</td><td>${s.label}</td><td>${Math.floor(s.nc*t)}</td><td>${(phases[i]*180/Math.PI).toFixed(3)}</td><td>${i ? (adist(phases[i],phases[0])*180/Math.PI).toFixed(3) : "—"}</td></tr>`).join("");}).join("");
      host.querySelector(".pi-comparison").innerHTML=`<table class="zg-table"><thead><tr><th>t (ms)</th><th>${TL.ion}</th><th>Turns / 整圈</th><th>φ (°)</th><th>Δφ to 1 / 对第1种 (°)</th></tr></thead><tbody>${rows}</tbody></table>`;
      const [g,W,H]=crisp(host.querySelector("canvas")),ink=inkOf(),max=Math.max(...times)*1000,limit=Math.min(180,3*p.sig*180/Math.PI),bounds={l:48,t:20,r:W-12,b:H-36};
      const [X,Y]=axes(g,bounds,[0,max],[0,180],"t_acc (ms)","min Δφ (°)",ink,4);
      g.strokeStyle="#8e4ec6";g.lineWidth=1.8;g.beginPath();
      for(let k=0;k<=500;k++){const ms=max*k/500,phases=p.sp.map(s=>ph(2*Math.PI*s.nc*ms/1000));let d=180;
        for(let i=0;i<phases.length;i++)for(let j=i+1;j<phases.length;j++)d=Math.min(d,adist(phases[i],phases[j])*180/Math.PI);
        k?g.lineTo(X(ms),Y(d)):g.moveTo(X(ms),Y(d));}g.stroke();
      g.strokeStyle="#dc505b";g.setLineDash([4,3]);g.beginPath();g.moveTo(X(0),Y(limit));g.lineTo(X(max),Y(limit));g.stroke();g.setLineDash([]);g.fillStyle=ink;g.font="11px system-ui";g.fillText("3 event σφ / 3倍事件角宽",bounds.l+6,bounds.t+12);
      times.forEach(t=>{g.strokeStyle="rgba(127,127,160,.5)";g.beginPath();g.moveTo(X(t*1000),bounds.t);g.lineTo(X(t*1000),bounds.b);g.stroke();});
    }
    addEventListener("resize",()=>{if(!box.hidden)draw();});
    const mq = s => (s.M - s.q * MEU) / s.q;
    function draw() {
      let p; try { if (!S && !isMulti()) return; p=phys(); } catch(e) { msg(box,e.message); [cv,cvh].forEach(c=>{const [g,W,H]=crisp(c);g.clearRect(0,0,W,H)}); box.querySelector(".pi-freq").textContent="";box.querySelector(".pi-times").hidden=true;return; }
      if (!p.resolution.defined) { msg(box,"Phase resolution undefined at zero detector radius / 探测器半径为零时相位分辨率未定义"); [cv,cvh].forEach(c=>{ const [g,W,H]=crisp(c); g.clearRect(0,0,W,H); }); box.querySelector(".pi-freq").textContent="";box.querySelector(".pi-times").hidden=true;return; }
      if (p.sp.some(s=>!s.stable)) { msg(box,"Unconfined ideal-trap parameters / 理想阱参数不能囚禁离子");[cv,cvh].forEach(c=>{const [g,W,H]=crisp(c);g.clearRect(0,0,W,H);});box.querySelector(".pi-freq").textContent="";box.querySelector(".pi-times").hidden=true;return; }
      { const [g, W, H] = crisp(cv); paint(g, W, H, inkOf()); }
      { const [g, W, H] = crisp(cvh); paintH(g, W, H, inkOf()); }
      table(p); try {timeComparison(p);}catch(e){box.querySelector(".pi-times").hidden=true;msg(box,e.message);return;}
      const ok = p.sep >= 3;
      const info=`Event σφ = ${(p.resolution.eventSigma*180/Math.PI).toFixed(3)}°; centroid σφ = ${(p.resolution.centroidSigma*180/Math.PI).toFixed(3)}°; σν = ${p.resolution.frequencySigma.toPrecision(4)} Hz. ${p.resolution.smallAngle ? "Small-angle approximation / 小角度近似" : "Large angular width: small-angle resolution estimate outside domain / 大角度展宽：小角度分辨率估计超出适用范围"}`;
      box.querySelector(".pi-freq").insertAdjacentHTML("beforeend",`<p>${info}</p>`);
      if (isMulti()) {
        const [i, j] = p.pair || [0, 0], a = p.sp[i], b = p.sp[j];
        msg(box, p.sp.length < 2 ? `${a.label}: ν_c = ${f3(a.nc)} Hz` :
          `${p.sp.length} ${TL.pi_species} · ${TL.pi_closest}: ${a.label} / ${b.label} · Δφ = ${(p.d * 180 / Math.PI).toFixed(1)}° · σ_φ = ${(p.sig * 180 / Math.PI).toFixed(1)}° · Δφ/σ_φ = ${p.sep.toFixed(1)} · R ≈ ${p.R.toExponential(2)} (${TL.need} m/Δm = ${mq(a) === mq(b) ? "∞" : (mq(a) / Math.abs(mq(a) - mq(b))).toExponential(2)}) · ${ok ? "✔ " + TL.separated : "… " + TL.overlap}`);
        return;
      }
      const g = p.sp[0], m = p.sp[1], dnu = g.nc - m.nc;
      msg(box, `${S.label}: Eₓ = ${S.ex}${S.exFlag ? "#" : ""} ± ${S.exError == null ? "?" : S.exError}${S.exErrorFlag ? "#" : ""} keV → Δν_c = ${dnu.toExponential(3)} Hz · Δφ = ${(p.d * 180 / Math.PI).toFixed(1)}° · σ_φ = ${(p.sig * 180 / Math.PI).toFixed(1)}° · ` +
        `Δφ/σ_φ = ${p.sep.toFixed(1)} · R ≈ ${p.R.toExponential(2)} (${TL.need} m/Δm = ${((S.A + S.me / UKEV) * UKEV / S.ex).toExponential(2)}) · ${ok ? "✔ " + TL.separated : "… " + TL.overlap}`);
    }
    box.addEventListener("input",e=>{if(["compare-times","compare-t2","compare-t3"].includes(e.target.name))draw();});
    box.addEventListener("input", e => { const n = e.target.name; if (["tacc", "B", "spot", "ratio", "cfrac", "u0", "dch", "radius", "floor", "centroid-count", "pi-seed"].includes(n)) { hits = []; phaseOffsets=[];piRandom=P.rng(V("pi-seed"));phaseOffsets=[];draw(); } });
    let tId = 0;
    box.addEventListener("input", e => { if (e.target.name === "ions") { clearTimeout(tId); tId = setTimeout(parse, 350); } });
    box.addEventListener("change", e => { const n = e.target.name;
      if (n === "other-states") build(); if (n === "iso") pick(); if (n === "iso-search") filterList(); if (n === "pix" || n === "ref") draw();
      if (n === "multi") { box.querySelector(".pi-man").hidden = !e.target.checked; box.querySelector(".pi-single").hidden = e.target.checked; e.target.checked ? parse() : (hits = [], draw()); }
      if (n === "mtab") { sel("multi").checked ? parse() : draw(); } });
    box.addEventListener("click", e => {
      const a = e.target.closest("[data-act]")?.dataset.act; if (!a || (!S && !isMulti())) return;
      try {
      if (a === "shot") { shoot(V("nshot")); draw(); }
      if (a === "clear") { hits = []; piRandom=P.rng(V("pi-seed"));phaseOffsets=[]; draw(); }
      if (a === "rand") { const pool=list.filter(x=>!sel("practice-filter").checked || (catalog.states.get(x.id).half_life.seconds>=.05)); if(pool.length){ sel("iso-search").value="";filterList(pool[Math.floor(Math.random()*pool.length)].id); } }
      if (a === "preset") { sel("ions").value = e.target.closest("[data-ions]").dataset.ions; parse(); }
      if (a === "auto") { /* shortest t_acc with every pair of spots ≥ 3σ_φ apart (angles wrap every 2π) */
        const el = sel("tacc"); let best = null; for (let ms = 1; ms <= 5000; ms++) { el.value = ms; if (phys().sep >= 3) { best = ms; break; } }
        el.max = Math.max(+el.max, best || 5000); el.value = best || el.value; el.dispatchEvent(new Event("input", { bubbles: true })); shoot(V("nshot")); draw(); }
      if (a === "png") { savePNG(cv, paint, "pi-icr-detector"); }
      if (a === "png2") savePNG(cvh, paintH, "pi-icr-angle");
      if (a === "csv" && window.zgExport) { const sp = phys().sp; window.zgExport.csv(["x_rel", "y_rel", "angle_deg", "state"], hits.map(([x, y, k]) => [x.toFixed(4), y.toFixed(4), k === 2 ? "" : ((Math.atan2(y, x) * 180 / Math.PI + 360) % 360).toFixed(2), k === 2 ? "centre" : k === 3 ? "magnetron-reference" : (sp[k - 10] || {}).txt || "?"]), "pi-icr-hits"); }
      if (a === "fcsv" && window.zgExport) { const p = phys(); window.zgExport.csv(["ion", "q", "m_ion_u", "mass_sigma_keV", "nu_c_Hz", "nu_plus_Hz", "nu_minus_Hz", "nu_z_Hz", "phi_c_deg", "mass_table", "B_T", "U0_V", "d_mm", "t_acc_ms"], p.sp.map(s => [s.txt, s.q, (s.M - s.q * MEU).toPrecision(14), s.e ?? "", s.nc.toFixed(4), s.np.toFixed(4), s.nm.toFixed(4), s.nz.toFixed(4), (s.phi * 180 / Math.PI).toFixed(2), s.src || "NUBASE2020", p.B, V("u0"), V("dch"), V("tacc")]), "pi-icr-frequencies"); }
      } catch(e) { msg(box,e.message); }
    });
    sel("iso-search").addEventListener("input",()=>filterList());
    box.addEventListener("click",e=>{if(e.target.closest("[data-act=json]")){try {const data={model:"PI-ICR ideal phase",source:catalog.metadata,constants:P.C,parameters:{B:V("B"),U0:V("u0"),d_mm:V("dch"),tacc_ms:V("tacc"),radius_mm:V("radius"),event_sigma_mm:V("spot")/10,angular_floor_mrad:V("floor"),counts:V("centroid-count"),seed:V("pi-seed")},units:{B:"T",U0:"V",d_mm:"mm",tacc_ms:"ms",radius_mm:"mm",event_sigma_mm:"mm",angular_floor_mrad:"mrad",hits:"normalized Cartesian coordinates"},comparison:{enabled:sel("compare-times").checked,times_ms:[V("tacc"),V("compare-t2"),V("compare-t3")]},assumptions:["Ideal Penning frequencies; known frequencies set the complete turn count", "Independent detector events; angular floor is shared per species and dataset", "Atomic mass minus q electron masses; ionization and molecular binding energies omitted"],species:species(),hits};const link=document.createElement("a"),url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));link.href=url;link.download="pi-icr-inputs-results.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){msg(box,e.message);}}});
    const init = () => rows.length ? build() : setTimeout(init, 200); init();
  }

  /* ── 4. Magic-number & element quiz ────────────────────────────────── */
  function quiz(els) {
    const box = $("#g-quiz"); let score = 0, ans;
    const Q = [
      () => { const e = rnd(els.filter(e => e[0] <= 100)); ans = e[1]; return [T.q_sym.replace("{z}", e[0]), [e[1], ...pick3(els.filter(x => x !== e).map(x => x[1]))]]; },
      () => { const m = rnd([2, 8, 20, 28, 50, 82, 126]); ans = String(m); const fake = [4, 6, 10, 14, 16, 30, 40, 64, 70, 90, 100, 114].filter(x => x !== m); return [T.q_magic, [String(m), ...pick3(fake.map(String))]]; },
      () => { const d = rnd([["¹⁰⁰Sn", 50, 50], ["¹³²Sn", 50, 82], ["²⁰⁸Pb", 82, 126], ["⁴⁸Ca", 20, 28], ["⁵⁶Ni", 28, 28], ["¹⁶O", 8, 8]]); ans = d[0]; return [T.q_dmagic, [d[0], ...pick3(["¹²⁰Sn", "⁴⁴Ca", "²⁰⁴Pb", "⁶⁰Ni", "¹⁴C", "⁹⁰Zr", "¹⁴⁰Ce"])]]; },
    ];
    function pick3(a) { const o = []; while (o.length < 3) { const x = rnd(a); if (!o.includes(x) && x !== ans) o.push(x); } return o; }
    function next() {
      const [q, opts] = rnd(Q)(); opts.sort(() => Math.random() - 0.5);
      box.querySelector(".g-q").textContent = q;
      box.querySelector(".g-opts").innerHTML = opts.map(o => `<button type="button" class="zg-btn zg-btn-ghost" data-o="${o}">${o}</button>`).join("");
    }
    box.addEventListener("click", e => {
      const o = e.target.closest("[data-o]")?.dataset.o; if (o == null) return;
      const ok = o === ans; score = ok ? score + 1 : 0;
      box.querySelector(".g-msg").textContent = `${ok ? "✔ " + T.right : "✘ " + T.wrong + " → " + ans} · ${T.score}: ${score} · ${T.best}: ${best("quiz", score)}`;
      setTimeout(next, 900);
    });
    next();
  }

  Promise.all([fetch(root.dataset.src).then(r => {if(!r.ok)throw new Error("Nuclear data unavailable");return r.json();}), P.load(root.dataset.catalogue,root.dataset.ame)]).then(([d,c])=>{rows=d.rows;catalog=c;hlGame();quiz(d.elements);tofGame();rfqGame();piicrGame();}).catch(e=>{root.insertAdjacentHTML("afterbegin",`<p role="alert">${e.message}</p>`);});
  /* number boxes next to sliders: typing a value moves the slider (and widens its range if needed) */
  root.querySelectorAll(".g-num[data-for]").forEach(n => {
    const box = n.closest(".g-box"), r = box && box.querySelector(`input[type=range][name="${n.dataset.for}"]`); if (!r) return;
    const show = () => { n.value = r.value; };
    r.addEventListener("input", show); show();
    n.addEventListener("change", () => { const v = +n.value; if (!isFinite(n.value === "" ? NaN : v)) return show();
      if (v > +r.max || v < +r.min) { n.setCustomValidity(`Use ${r.min}–${r.max}`);n.reportValidity();return; } n.setCustomValidity("");r.value = v; r.dispatchEvent(new Event("input", { bubbles: true })); });
  });
})();
