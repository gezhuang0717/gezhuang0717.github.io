(() => {
  'use strict';
  document.querySelectorAll('[data-daily-reading]').forEach(async root => {
    const T=JSON.parse(root.dataset.labels),lang=root.dataset.lang,select=root.querySelector('select'),next=root.querySelector('button'),content=root.querySelector('.zg-reading-content');
    try {
      const response=await fetch(root.dataset.src);if(!response.ok)throw Error('readings');const data=await response.json(),entries=data.entries;
      const text=(selector,value)=>root.querySelector(selector).textContent=value;
      let current=null,bag=[];
      const pool=()=>entries.filter(e=>select.value==='all'||e.original_language===select.value);
      function refill(){bag=pool().filter(e=>e.id!==current?.id);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}}
      function show(entry){
        current=entry;root.dataset.readingId=entry.id;root.dataset.kind=entry.kind;
        text('.zg-reading-title',entry.title);text('.zg-reading-text',entry.reading);text('.zg-reading-explanation',entry.explanation);
        const native=entry.original_language===lang;
        text('.zg-reading-kind',entry.kind==='original'?T.original:native?T.excerpt:T.rendering);
        text('.zg-reading-author',entry.author||'');root.querySelector('.zg-reading-author').hidden=!entry.author;
        const detail=root.querySelector('details');detail.hidden=entry.kind==='original'||native;detail.open=false;
        text('.zg-reading-original',entry.original||'');root.querySelector('.zg-reading-original').lang=entry.original_language==='original'?lang:entry.original_language;
        text('summary',T.show_original+' · '+(T.languages[entry.original_language]||''));
        const source=root.querySelector('.zg-reading-source');source.hidden=!entry.source;entry.source?source.href=entry.source:source.removeAttribute('href');
        const items=pool();text('.zg-reading-count',T.count.replace('{count}',new Intl.NumberFormat(lang).format(items.length)));next.disabled=items.length<2;
        content.hidden=false;
      }
      const parts=new Intl.DateTimeFormat('en',{timeZone:'Europe/Helsinki',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),v=t=>+parts.find(p=>p.type===t).value,day=Math.floor(Date.UTC(v('year'),v('month')-1,v('day'))/864e5);
      show(entries[day%entries.length]);refill();select.disabled=false;
      next.addEventListener('click',()=>{if(!bag.length)refill();if(bag.length)show(bag.pop());});
      select.addEventListener('change',()=>{current=null;refill();if(bag.length)show(bag.pop());});
    }catch(_){root.querySelector('.zg-reading-explanation').textContent=T.error;content.hidden=false;next.disabled=true;}
  });
})();
