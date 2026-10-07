/* Shared export helpers for the site's canvases and data tables.
   window.zgExport.png(render, name)   render(scale) → canvas drawn at `scale`× resolution (high-quality PNG)
   window.zgExport.csv(header, rows, name)
   window.zgExport.record(canvas, seconds, name, onState)   WebM video of a live canvas (MediaRecorder)
   window.zgExport.button(label, onClick) → <button>                                                   */
(() => {
  if (window.zgExport) return;
  const save = (blob, name) => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  };
  const stamp = () => new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  window.zgExport = {
    save, stamp,
    png(render, name, scale = 4) {
      const c = typeof render === "function" ? render(scale) : render;
      c.toBlob(b => save(b, `${name}-${stamp()}.png`), "image/png");
    },
    csv(header, rows, name) {
      const q = v => v == null ? "" : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
      const text = "﻿" + [header, ...rows].map(r => r.map(q).join(",")).join("\r\n");
      save(new Blob([text], { type: "text/csv;charset=utf-8" }), `${name}-${stamp()}.csv`);
    },
    record(canvas, seconds, name, onState) {
      if (!canvas.captureStream || !window.MediaRecorder) { const lang=(document.documentElement.lang||'en').split('-')[0];alert(({en:'Video recording is not supported in this browser.',zh:'此浏览器不支持视频录制。',fi:'Selain ei tue videon tallennusta.',de:'Dieser Browser unterstützt keine Videoaufnahme.',ja:'このブラウザーは動画の録画に対応していません。'})[lang]||'Video recording is not supported in this browser.');onState&&onState(false);return; }
      const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
      const type = types.find(t => MediaRecorder.isTypeSupported(t)) || "";
      const stream=canvas.captureStream(60);
      const rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 25e6 }), parts = [];
      rec.ondataavailable = e => e.data.size && parts.push(e.data);
      rec.onstop = () => {
        const container=canvas.closest('[data-trap3d],[data-trap2d],[data-workbench]');
        if(!container){save(new Blob(parts,{type:type||'video/webm'}),`${name}-${stamp()}.${type.includes('mp4')?'mp4':'webm'}`);stream.getTracks().forEach(t=>t.stop());onState&&onState(false);return;}
        const previous=container.querySelector('[data-recording-result]');
        if(previous){URL.revokeObjectURL(previous.dataset.url);previous.remove();}
        const url=URL.createObjectURL(new Blob(parts,{type:type||'video/webm'})), box=document.createElement('div'),video=document.createElement('video'),link=document.createElement('a');
        const lang=(document.documentElement.lang||'en').split('-')[0],label=({en:'Save recorded video',zh:'保存录制视频',fi:'Tallenna kuvattu video',de:'Aufgenommenes Video speichern',ja:'録画した動画を保存'})[lang]||'Save recorded video';
        box.dataset.recordingResult='';box.dataset.url=url;video.src=url;video.controls=true;video.style.width='100%';video.style.maxHeight='360px';link.href=url;link.download=`${name}-${stamp()}.${type.includes('mp4')?'mp4':'webm'}`;link.textContent=label;link.className='zg-btn zg-btn-ghost';box.append(video,link);container.append(box);
        stream.getTracks().forEach(t=>t.stop());onState && onState(false);
      };
      rec.start(); onState && onState(true);
      setTimeout(() => rec.state !== "inactive" && rec.stop(), seconds * 1000);
      return rec;
    },
  };
})();
