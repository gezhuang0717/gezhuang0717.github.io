(() => {
  'use strict';
  const dayNumber=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Europe/Helsinki',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),get=t=>+parts.find(p=>p.type===t).value;return Math.floor(Date.UTC(get('year'),get('month')-1,get('day'))/864e5);};
  document.querySelectorAll('[data-country-card]').forEach(async root=>{
    const lang=root.dataset.countryLang,T=JSON.parse(root.dataset.countryLabels),next=root.querySelector('[data-country-next]'),storyNext=root.querySelector('[data-story-next]'),select=root.querySelector('[data-country-select]'),all=root.querySelector('[data-country-all]');
    const format=(s,values)=>s.replace(/\{(\w+)\}/g,(_,k)=>values[k]??'');
    try {
      const response=await fetch(root.dataset.countrySrc);if(!response.ok)throw Error('country data');const data=await response.json(),day=dayNumber(),eligible=data.countries.filter(c=>c.places.length);let country=eligible[day%eligible.length],storyIndex=day,highlights={};
      try{const r=await fetch(root.dataset.highlightsSrc);if(r.ok)highlights=(await r.json()).highlights;}catch(_){/* The original linked-place collection remains available offline. */}
      for(const c of [...data.countries].sort((a,b)=>a.names[lang].localeCompare(b.names[lang],lang))){const opt=document.createElement('option');opt.value=c.iso2;opt.textContent=c.flag+' '+c.names[lang];select.append(opt);}
      function show(){
        select.value=country.iso2;root.dataset.country=country.iso2;root.querySelector('.zg-country-name').textContent=country.names[lang];root.querySelector('.zg-country-flag').textContent=country.flag;
        root.querySelector('.zg-country-location').textContent=format(T.location,{location:country.location[lang].join(' · ')});
        const curated=highlights[country.iso2]||[];root.querySelector('.zg-country-all').hidden=!curated.length;
        const pool=curated.length&&!all.checked?curated:country.places.map(place=>({place})),h=pool.length?pool[storyIndex%pool.length]:null,p=h?data.places[h.place]:null;
        const heading=root.querySelector('.zg-country-place'),story=root.querySelector('.zg-country-story'),joke=root.querySelector('.zg-country-joke'),links=root.querySelector('.zg-country-links');links.replaceChildren();
        const add=(label,url)=>{const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener';links.append(a);};
        heading.hidden=!p;story.hidden=!p;joke.hidden=!p;storyNext.disabled=!p||pool.length<2;
        if(p){root.dataset.place=p.id;root.dataset.story=h.id||p.id;heading.textContent=h.title?.[lang]||p.names[lang];heading.lang=h.title?lang:p.name_languages[lang];story.textContent=h.story?.[lang]||p.story?.[lang]||data.kind_labels[p.kind][lang]+'. '+format(T.coordinates,{lat:p.lat.toFixed(4),lon:p.lon.toFixed(4)});joke.textContent=h.joke?.[lang]||format(data.captions[p.caption][lang],{place:p.names[lang]});add(T.reading,h.source||p.reading||p.source);}
        else{delete root.dataset.place;delete root.dataset.story;story.textContent='';joke.textContent='';}
        add(T.wiki,'https://'+lang+'.wikipedia.org/w/index.php?title=Special%3ASearch&search='+encodeURIComponent(country.names[lang])+'&go=Go');
        const query=p?(p.map_query||p.lat+','+p.lon):country.names[lang];add(T.maps,'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query)+'&hl='+lang);if(lang==='zh')add(T.baidu,'https://map.baidu.com/search/'+encodeURIComponent(p?p.names.zh:country.names.zh));
        root.querySelector('.zg-country-count').textContent=format(T.collection,{count:new Intl.NumberFormat(lang).format(data.distinct_places)});
      }
      show();next.disabled=false;select.disabled=false;next.addEventListener('click',()=>{const i=eligible.findIndex(c=>c.iso2===country.iso2);country=eligible[(i+1)%eligible.length];storyIndex=day;all.checked=false;show();});storyNext.addEventListener('click',()=>{storyIndex++;show();});select.addEventListener('change',()=>{country=data.countries.find(c=>c.iso2===select.value);storyIndex=0;all.checked=false;show();});all.addEventListener('change',()=>{storyIndex=0;show();});
    } catch(_){root.querySelector('.zg-country-location').textContent=T.error;next.disabled=true;storyNext.disabled=true;}
  });
})();
