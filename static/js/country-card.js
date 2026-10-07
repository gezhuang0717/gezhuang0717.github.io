(() => {
  'use strict';
  const dayNumber=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Europe/Helsinki',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),get=t=>+parts.find(p=>p.type===t).value;return Math.floor(Date.UTC(get('year'),get('month')-1,get('day'))/864e5);};
  document.querySelectorAll('[data-country-card]').forEach(async root=>{
    const lang=root.dataset.countryLang,T=JSON.parse(root.dataset.countryLabels),button=root.querySelector('[data-country-next]'),loc=root.querySelector('.zg-country-location');
    try {
      const response=await fetch(root.dataset.countrySrc);if(!response.ok)throw Error('country data');const data=await response.json(),total=data.countries.length*data.jokes.length;let index=dayNumber()*53%total;
      const format=(s,values)=>s.replace(/\{(\w+)\}/g,(_,k)=>values[k]);
      function show(){
        const country=data.countries[index%data.countries.length],joke=data.jokes[Math.floor(index/data.countries.length)],name=country.names[lang];
        root.dataset.country=country.iso2;root.dataset.combination=index;
        root.querySelector('.zg-country-name').textContent=name;root.querySelector('.zg-country-flag').textContent=country.flag;
        loc.textContent=format(T.location,{location:country.location[lang].join(' · ')});
        root.querySelector('.zg-country-joke').textContent=T.joke+': '+format(joke[lang],{country:name});
        const links=root.querySelector('.zg-country-links');links.replaceChildren();
        const add=(label,url)=>{const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener';links.append(a);};
        add(T.wiki,'https://'+lang+'.wikipedia.org/w/index.php?title=Special%3ASearch&search='+encodeURIComponent(name)+'&go=Go');
        add(T.maps,'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name)+'&hl='+lang);
        if(lang==='zh')add(T.baidu,'https://map.baidu.com/search/'+encodeURIComponent(name));
        root.querySelector('.zg-country-count').textContent=format(T.collection,{count:new Intl.NumberFormat(lang).format(total)});
      }
      show();button.disabled=false;button.addEventListener('click',()=>{index=(index+1)%total;show();});
    } catch(_){loc.textContent=T.error;button.disabled=true;}
  });
})();
