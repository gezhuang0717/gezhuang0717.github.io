/* Shared calibrant-frequency panel (CAL1) — layouts/_partials/zg/calibration-panel.html.
   Each [data-cal-panel] element gets el.zgCal = { get(), resolve(text, q), state() } and fires a bubbling
   "zg-cal-change" event whenever the calibration changes. get() returns null when the box is unchecked or invalid,
   so every host keeps its ideal-trap behaviour unchanged in that case.
   Physics: ZGPhysics.trapCalibration / calibratedPenning / tofScale (static/js/physics.js). */
(function () {
  "use strict";
  const PRESETS = {   /* PyMassScanner defaults (examples, not current measurements) */
    cs133: [{ ion: "133Cs", q: 1, nc: 808542.788, snc: 0.002, nm: 1653.063, snm: 0.01, tof: "" }],
    mo97: [{ ion: "97Mo", q: 1, nc: 1108887.227, snc: 0.002, nm: 1653.063, snm: 0.01, tof: "" }]
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (x, d = 3) => x == null || !Number.isFinite(x) ? "—" : x.toFixed(d);
  const sig = (x, n = 3) => x == null || !Number.isFinite(x) ? "—" : x.toPrecision(n);

  function init(el) {
    if (el.zgCal) return;
    const P = window.ZGPhysics, L = JSON.parse(el.dataset.labels || "{}"), full = el.hasAttribute("data-full");
    const $ = s => el.querySelector(s), tbody = $(".zg-cal-cals tbody"), out = $(".zg-cal-out"), badge = $(".zg-cal-badge");
    let catalog = null, cal = null, error = "";
    const loading = P.load(el.dataset.catalogue, el.dataset.ame).then(c => (catalog = c)).catch(e => { error = e.message; paint(); });

    function row(c) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td data-label="${esc(L.calibrant)}"><input type="text" name="c-ion" value="${esc(c.ion)}" spellcheck="false" aria-label="${esc(L.calibrant)}"></td>` +
        `<td data-label="q"><input type="number" name="c-q" min="1" max="100" step="1" value="${c.q}" aria-label="q"></td>` +
        `<td data-label="${esc(L.nc)}"><input type="number" name="c-nc" min="0" step="0.001" value="${c.nc}" aria-label="${esc(L.nc)}"></td>` +
        `<td data-label="${esc(L.snc)}"><input type="number" name="c-snc" min="0" step="0.001" value="${c.snc}" aria-label="${esc(L.snc)}"></td>` +
        `<td data-label="${esc(L.nm)}"><input type="number" name="c-nm" min="0" step="0.001" value="${c.nm}" aria-label="${esc(L.nm)}"></td>` +
        `<td data-label="${esc(L.snm)}"><input type="number" name="c-snm" min="0" step="0.001" value="${c.snm}" aria-label="${esc(L.snm)}"></td>` +
        (full ? `<td data-label="${esc(L.tof)}"><input type="number" name="c-tof" min="0" step="0.001" value="${c.tof ?? ""}" aria-label="${esc(L.tof)}"></td>` : "") +
        `<td><button type="button" class="zg-btn zg-btn-ghost" data-cal="del" title="${esc(L.remove)}">×</button></td>`;
      tbody.appendChild(tr);
    }
    function preset(name) { if (!PRESETS[name]) return; tbody.innerHTML = ""; PRESETS[name].forEach(row); }
    preset($("[name=cal-preset]").value);

    const opts = () => ({ massSource: $("[name=cal-source]").value });
    function resolve(text, q) { return catalog.resolve(text, { ...opts(), q }); }
    function rows() {
      return [...tbody.querySelectorAll("tr")].map(tr => {
        const v = n => tr.querySelector(`[name=${n}]`)?.value ?? "";
        return { text: v("c-ion").trim(), q: +v("c-q") || 1, nc: +v("c-nc"), snc: +v("c-snc") || 0, nm: +v("c-nm"), snm: +v("c-snm") || 0, tof: v("c-tof") === "" ? null : +v("c-tof") };
      });
    }
    function update() {
      cal = null; error = "";
      if (!catalog) { paint(); return; }
      try {
        const list = rows(); if (!list.length) throw new Error(L.invalid);
        const cals = list.map(r => { let ion; try { ion = resolve(r.text, r.q); } catch (e) { throw new Error(`${L.bad_ion}: ${r.text}`); } return { ion, nc: r.nc, snc: r.snc, nm: r.nm, snm: r.snm, tof: r.tof }; });
        cal = P.trapCalibration(cals, $("[name=cal-mode]").value);
        cal.source = opts().massSource === "ame" ? "AME2020" : "NUBASE2020";
        cal.tofRef = cals.find(c => c.tof > 0) || null;
      } catch (e) { error = e.message; cal = null; }
      paint();
      el.dispatchEvent(new CustomEvent("zg-cal-change", { bubbles: true, detail: { scope: el.dataset.scope } }));
      if (full) results();
    }
    function active() { return $("[name=cal-on]").checked && cal ? cal : null; }
    function paint() {
      const on = $("[name=cal-on]").checked;
      badge.textContent = on ? (cal ? L.on : "⚠") : L.off; badge.classList.toggle("on", !!(on && cal));
      if (!on) { out.textContent = ""; return; }
      if (!cal) { out.innerHTML = `<span class="g-warn">${esc(error || L.invalid)}</span>`; return; }
      const cons = cal.list.length > 1 ? ` · ${esc(L.consistency)}: ${cal.list.map((c, i) => `${esc(c.label)} ${cal.ppb[i] >= 0 ? "+" : ""}${fmt(cal.ppb[i], 2)} ppb`).join(", ")}${cal.birge != null ? ` · ${esc(L.birge)} ${fmt(cal.birge, 2)}` : ""}` : "";
      out.innerHTML = `${esc(L.beff)} = <b>${cal.B.toFixed(9)} T</b>${cal.sB != null ? ` ± ${sig(cal.sB, 2)} T` : ""} (${esc(cal.source)})${cons}`;
    }
    let computed = [];
    function results() {
      const host = $(".zg-cal-results"); if (!host) return;
      const c = active(); computed = [];
      if (!c) { host.innerHTML = ""; return; }
      const items = $("[name=cal-ions]").value.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean), bad = [];
      for (const t of items) {
        let ion; try { ion = catalog.resolve(t, opts()); } catch (e) { bad.push(t); continue; }
        const f = P.calibratedPenning(ion, c), ref = c.list[0];
        computed.push({ ion, f, ratio: ref.nc / f.nc, tof: c.tofRef ? P.tofScale(c.tofRef.tof, c.tofRef.ion, ion) : null });
      }
      host.innerHTML = (bad.length ? `<p class="g-warn">${esc(L.bad_ion)}: ${bad.map(esc).join(", ")}</p>` : "") +
        `<div class="zg-cal-tablewrap"><table class="zg-table"><thead><tr><th>${esc(L.ion)}</th><th>q</th><th>${esc(L.mion)}</th><th>νc (Hz)</th><th>σνc (Hz)</th><th>ν+ (Hz)</th><th>ν− (Hz)</th><th>νz (Hz)</th><th>${esc(L.ratio)}</th><th>${esc(L.kevhz)}</th><th>${esc(L.tofp)}</th><th>${esc(L.src)}</th></tr></thead><tbody>` +
        computed.map(r => `<tr><td>${esc(r.ion.label)}</td><td>${r.ion.q}</td><td>${r.ion.ionMassU.toFixed(9)}${r.ion.est ? "#" : ""}</td><td>${fmt(r.f.nc, 4)}</td><td>${sig(r.f.snc, 3)}</td><td>${fmt(r.f.np, 4)}</td><td>${fmt(r.f.nm, 4)}</td><td>${fmt(r.f.nz, 4)}</td><td>${r.ratio.toFixed(12)}</td><td>${sig(r.f.keVperHz, 6)}</td><td>${r.tof == null ? "—" : fmt(r.tof, 4)}</td><td class="zg-muted">${esc(r.ion.source)}</td></tr>`).join("") +
        `</tbody></table></div><p class="zg-muted zg-small">${esc(c.convention)} · ${esc(L.using)} ${c.list.map(x => esc(x.label)).join(", ")} (${esc(c.mode === "ideal" ? L.ideal : L.fixed)})</p>`;
    }
    function record() {
      const c = active(); if (!c) return null;
      return { model: "calibrant-based Penning-trap frequencies (PyMassScanner-style)", mode: c.mode, mass_source: c.source, convention: c.convention,
        calibrants: c.list.map((x, i) => ({ ion: x.label, q: x.q, nu_c_Hz: x.nc, sigma_nu_c_Hz: x.snc, nu_minus_Hz: x.nm, sigma_nu_minus_Hz: x.snm, B_T: x.B, sigma_B_T: x.sB, weight: c.weights[i], deviation_ppb: c.ppb[i] })),
        B_T: c.B, sigma_B_T: c.sB, birge: c.birge,
        ions: computed.map(r => ({ ion: r.ion.label, q: r.ion.q, ion_mass_u: r.ion.ionMassU, extrapolated: !!r.ion.est, nu_c_Hz: r.f.nc, sigma_nu_c_Hz: r.f.snc, nu_plus_Hz: r.f.np, nu_minus_Hz: r.f.nm, nu_z_Hz: r.f.nz, ratio_cal_over_ion: r.ratio, keV_per_Hz: r.f.keVperHz, tof_us: r.tof, mass_source: r.ion.source })) };
    }

    el.addEventListener("input", e => { if (e.target.closest(".zg-cal-cals")) $("[name=cal-preset]").value = "custom"; if (e.target.name !== "cal-ions") update(); });
    el.addEventListener("change", e => { const n = e.target.name; if (n === "cal-preset") { preset(e.target.value); update(); } else if (n === "cal-on" || n === "cal-source" || n === "cal-mode") update(); });
    el.addEventListener("click", e => {
      const a = e.target.closest("[data-cal]")?.dataset.cal; if (!a) return;
      if (a === "add") { row({ ion: "", q: 1, nc: "", snc: 0, nm: "", snm: 0, tof: "" }); $("[name=cal-preset]").value = "custom"; }
      else if (a === "del") { e.target.closest("tr").remove(); $("[name=cal-preset]").value = "custom"; update(); }
      else if (a === "compute") results();
      else if (a === "csv" && window.zgExport && computed.length) window.zgExport.csv(["ion", "q", "ion_mass_u", "nu_c_Hz", "sigma_nu_c_Hz", "nu_plus_Hz", "nu_minus_Hz", "nu_z_Hz", "ratio_cal_over_ion", "keV_per_Hz", "tof_us", "mass_source", "mode", "B_T"],
        computed.map(r => [r.ion.label, r.ion.q, r.ion.ionMassU, r.f.nc, r.f.snc, r.f.np, r.f.nm, r.f.nz, r.ratio, r.f.keVperHz, r.tof, r.ion.source, cal.mode, cal.B]), "calibrated-frequencies");
      else if (a === "json") { const d = record(); if (!d) return; const b = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" }), u = URL.createObjectURL(b), x = document.createElement("a"); x.href = u; x.download = "calibrated-frequencies.json"; x.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }
    });
    el.zgCal = { get: active, resolve, state: () => ({ cal, error }), ready: loading, record };
    loading.then(update);
  }
  function boot() { document.querySelectorAll("[data-cal-panel]").forEach(init); }
  window.ZGCal = { init, boot, active: el => el && el.zgCal ? el.zgCal.get() : null };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
