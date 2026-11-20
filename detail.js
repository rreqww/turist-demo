(() => {
  const params=new URLSearchParams(location.search);
  const kind=params.get('kind'),id=params.get('id');
  const entry=window.TOURIST_CONTENT?.[kind]?.find(x=>x.id===id);
  const T=window.TOURIST_T;
  const lang=window.TOURIST_LANG;
  const en=lang==='en';
  const say=(ru,english)=>en?english:ru;
  const section={rooms:'rooms-new',restaurant:'restaurant',conference:'conference',offers:'offers'}[kind];
  const url=(path,hash)=>window.TOURIST_URL(path,hash);
  if(!entry){location.replace(url('index.html'));return}
  const set=(id,value)=>document.getElementById(id).textContent=value;
  document.title=`${T(entry.title)} · ${say('Гостиничный комплекс «Турист»','Tourist Hotel Complex')}`;
  document.querySelector('.detail-brand').href=url('index.html');
  const navLabels=[['Номера','Rooms'],['Ресторан','Restaurant'],['Конференц-залы','Conference Halls'],['Спецпредложения','Special Offers']];
  document.querySelectorAll('.detail-header nav a').forEach((a,i)=>{a.href=url('index.html',['rooms-new','restaurant','conference','offers'][i]);a.textContent=say(...navLabels[i])});
  const menuLabels=[['Бронирование','Booking'],['Номера и цены','Rooms & Rates'],['Ресторан','Restaurant'],['Конференц-залы','Conference Halls'],['Спецпредложения','Special Offers'],['Контакты','Contacts'],['Правовая информация','Legal Information']];
  document.querySelectorAll('.detail-menu nav a').forEach((a,i)=>{
    if(i>0&&i<6)a.href=url('index.html',['','rooms-new','restaurant','conference','offers','contacts'][i]);
    if(i===6)a.href=url('legal.html');
    a.textContent=say(...menuLabels[i]);
  });
  document.querySelectorAll('[data-detail-book]').forEach(a=>{a.href='#detail-cta';a.textContent=say('Забронировать','Book Now')});
  document.querySelector('.detail-menu-side strong').textContent=say('Отдел бронирования','Reservations');
  document.querySelectorAll('.detail-menu-side strong')[1].textContent=say('Язык','Language');
  document.querySelectorAll('[data-lang]').forEach(a=>{
    a.href=`detail.html?kind=${kind}&id=${id}&lang=${a.dataset.lang}`;
    a.classList.toggle('active',a.dataset.lang===lang);
    a.setAttribute('aria-current',a.dataset.lang===lang?'page':'false');
  });

  const back=url('index.html',section);
  for(const linkId of ['detail-back','detail-back-bottom']){
    const link=document.getElementById(linkId);
    link.href=back;
    link.textContent=say('← Назад к разделу','← Back to section');
  }
  const cover=document.getElementById('detail-cover');
  cover.src=entry.image;cover.alt=T(entry.title);
  set('detail-meta',T(entry.meta));
  set('detail-title',T(entry.title));
  set('detail-intro',T(entry.intro));
  document.getElementById('detail-facts').innerHTML=entry.facts.map(f=>`<div><span>${T(f.label)}</span><strong>${T(f.value)}</strong></div>`).join('');
  document.getElementById('detail-copy').innerHTML=entry.blocks.map(b=>`<section><h2>${T(b.heading)}</h2><div><p>${T(b.text)}</p>${b.items.length?'<ul>'+b.items.map(item=>`<li>${T(item)}</li>`).join('')+'</ul>':''}</div></section>`).join('');
  const gallery=document.getElementById('detail-gallery');
  if(entry.photos||entry.count){
    const prefix=entry.image.slice(0,entry.image.lastIndexOf('/')+1);
    const selected=Number(entry.image.match(/(\d+)\.jpg$/)?.[1]);
    const photos=entry.photos||[selected,...Array.from({length:entry.count},(_,i)=>i+1).filter(n=>n!==selected)];
    gallery.innerHTML=photos.map((n,i)=>`<img loading="lazy" src="${prefix}${String(n).padStart(2,'0')}.jpg" alt="${T(entry.title)}, ${say('фотография','photo')} ${i+1}">`).join('');
  }else document.getElementById('detail-gallery-wrap').hidden=true;
  set('gallery-label',say('Галерея','Gallery'));
  set('detail-cta-label',say('Планируете поездку или событие?','Planning a stay or event?'));
  set('detail-cta-title',say('Поможем всё организовать','Let us help you plan'));
  set('detail-cta-text',say('Уточните свободные даты, условия и детали у команды гостиницы. Онлайн-бронирование появится после подключения модуля.','Ask the hotel team about availability, terms and details. Online booking will be available after the booking module is connected.'));
  const restaurant=kind==='restaurant'||id==='wedding'||id==='groups'||id==='guides';
  if(restaurant){
    const phone=document.getElementById('detail-phone'),email=document.getElementById('detail-email');
    phone.href='tel:+79016969272';phone.textContent='+7 (901) 696-92-72';
    email.href='mailto:restoran@tourist37.ru';email.textContent='restoran@tourist37.ru';
  }
  document.querySelector('.detail-cta').id='detail-cta';
  const burger=document.getElementById('detail-burger'),menu=document.getElementById('detail-menu');
  const toggle=(open)=>{
    document.body.classList.toggle('detail-menu-open',open);
    burger.setAttribute('aria-expanded',String(open));
    burger.setAttribute('aria-label',say(open?'Закрыть меню':'Открыть меню',open?'Close menu':'Open menu'));
    menu.inert=!open;
  };
  burger.addEventListener('click',()=>toggle(!document.body.classList.contains('detail-menu-open')));
  addEventListener('keydown',event=>{if(event.key==='Escape')toggle(false)});
  menu.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>toggle(false)));
})();
