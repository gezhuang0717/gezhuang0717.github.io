(() => {
  'use strict';
  const dayNumber=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Europe/Helsinki',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),get=t=>+parts.find(p=>p.type===t).value;return Math.floor(Date.UTC(get('year'),get('month')-1,get('day'))/864e5);};
  document.querySelectorAll('[data-country-card]').forEach(async root=>{
    const lang=root.dataset.countryLang,T=JSON.parse(root.dataset.countryLabels),next=root.querySelector('[data-country-next]'),storyNext=root.querySelector('[data-story-next]'),select=root.querySelector('[data-country-select]');
    const format=(s,values)=>s.replace(/\{(\w+)\}/g,(_,k)=>values[k]??'');
    try {
      const response=await fetch(root.dataset.countrySrc);if(!response.ok)throw Error('country data');const data=await response.json(),day=dayNumber(),eligible=data.countries.filter(c=>c.places.length);let country=eligible[day%eligible.length],storyIndex=day;
      for(const c of [...data.countries].sort((a,b)=>a.names[lang].localeCompare(b.names[lang],lang))){const opt=document.createElement('option');opt.value=c.iso2;opt.textContent=c.flag+' '+c.names[lang];select.append(opt);}
      function show(){
        select.value=country.iso2;root.dataset.country=country.iso2;root.querySelector('.zg-country-name').textContent=country.names[lang];root.querySelector('.zg-country-flag').textContent=country.flag;
        root.querySelector('.zg-country-location').textContent=format(T.location,{location:country.location[lang].join(' · ')});
        const p=country.places.length?data.places[country.places[storyIndex%country.places.length]]:null,heading=root.querySelector('.zg-country-place'),story=root.querySelector('.zg-country-story'),joke=root.querySelector('.zg-country-joke'),links=root.querySelector('.zg-country-links');links.replaceChildren();
        const add=(label,url)=>{const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener';links.append(a);};
        heading.hidden=!p;storyNext.disabled=!p||country.places.length<2;
        if(p){root.dataset.place=p.id;heading.textContent=p.names[lang];heading.lang=p.name_languages[lang];story.textContent=p.story?.[lang]||data.kind_labels[p.kind][lang]+'. '+format(T.coordinates,{lat:p.lat.toFixed(4),lon:p.lon.toFixed(4)});joke.textContent=T.joke+': '+format(data.captions[p.caption][lang],{place:p.names[lang]});add(T.reading,p.reading||p.source);}
        else{delete root.dataset.place;story.textContent=T.no_story;joke.textContent='';}
        add(T.wiki,'https://'+lang+'.wikipedia.org/w/index.php?title=Special%3ASearch&search='+encodeURIComponent(p?p.names[lang]:country.names[lang])+'&go=Go');
        const query=p?p.lat+','+p.lon:country.names[lang];add(T.maps,'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query)+'&hl='+lang);if(lang==='zh')add(T.baidu,'https://map.baidu.com/search/'+encodeURIComponent(p?p.names.zh:country.names.zh));
        root.querySelector('.zg-country-count').textContent=format(T.collection,{count:new Intl.NumberFormat(lang).format(data.distinct_places)});
      }
      show();next.disabled=false;select.disabled=false;next.addEventListener('click',()=>{const i=eligible.findIndex(c=>c.iso2===country.iso2);country=eligible[(i+1)%eligible.length];storyIndex=day;show();});storyNext.addEventListener('click',()=>{storyIndex++;show();});select.addEventListener('change',()=>{country=data.countries.find(c=>c.iso2===select.value);storyIndex=0;show();});
    } catch(_){root.querySelector('.zg-country-location').textContent=T.error;next.disabled=true;storyNext.disabled=true;}
  });
})();
