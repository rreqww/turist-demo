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
  const facts=[...entry.facts];
  if(kind==='rooms'&&entry.price){
    const rate=new Intl.NumberFormat(en?'en-US':'ru-RU').format(entry.price);
    facts.push({label:{ru:'Цена от',en:'Rate from'},value:{ru:`${rate} ₽ / ночь`,en:`₽${rate} / night`}});
    document.getElementById('detail-facts').classList.add('four');
  }
  document.getElementById('detail-facts').innerHTML=facts.map(f=>`<div><span>${T(f.label)}</span><strong>${T(f.value)}</strong></div>`).join('');
  document.getElementById('detail-copy').innerHTML=entry.blocks.map(b=>`<section><h2>${T(b.heading)}</h2><div><p>${T(b.text)}</p>${b.items.length?'<ul>'+b.items.map(item=>`<li>${T(item)}</li>`).join('')+'</ul>':''}</div></section>`).join('');
  const gallery=document.getElementById('detail-gallery');
  if(entry.photos||entry.count){
    const prefix=entry.image.slice(0,entry.image.lastIndexOf('/')+1);
    const selected=Number(entry.image.match(/(\d+)\.jpg$/)?.[1]);
    const photos=entry.photos||[selected,...Array.from({length:entry.count},(_,i)=>i+1).filter(n=>n!==selected)];
    gallery.classList.add(`count-${photos.length}`);
    document.getElementById('detail-gallery-wrap').classList.add(`gallery-${photos.length}`);
    gallery.innerHTML=photos.map((n,i)=>`<img loading="lazy" src="${prefix}${String(n).padStart(2,'0')}.jpg" alt="${T(entry.title)}, ${say('фотография','photo')} ${i+1}">`).join('');
  }else document.getElementById('detail-gallery-wrap').hidden=true;
  set('gallery-label',say('Галерея','Gallery'));
  set('gallery-hint',say('Листайте фотографии','Explore the gallery'));
  document.querySelectorAll('[data-gallery-dir]').forEach(button=>button.setAttribute('aria-label',say(button.dataset.galleryDir==='1'?'Следующая фотография':'Предыдущая фотография',button.dataset.galleryDir==='1'?'Next photo':'Previous photo')));
  document.querySelectorAll('[data-gallery-dir]').forEach(button=>button.addEventListener('click',()=>{
    const photo=gallery.querySelector('img');
    if(photo)gallery.scrollBy({left:Number(button.dataset.galleryDir)*(photo.getBoundingClientRect().width+16),behavior:'smooth'});
  }));
  set('detail-cta-label',say('Планируете поездку или событие?','Planning a stay or event?'));
  set('detail-cta-title',say('Поможем всё организовать','Let us help you plan'));
  set('detail-cta-text',say('Уточните свободные даты, условия и детали у команды гостиницы. Онлайн-бронирование появится после подключения модуля.','Ask the hotel team about availability, terms and details. Online booking will be available after the booking module is connected.'));
  const restaurant=kind==='restaurant'||id==='wedding'||id==='groups'||id==='guides';
  if(restaurant){
    const phone=document.getElementById('detail-phone'),email=document.getElementById('detail-email');
    phone.href='tel:+79016969272';phone.textContent='+7 (901) 696-92-72';
    email.href='mailto:restoran@tourist37.ru';email.textContent='restoran@tourist37.ru';
  }
  const call=document.querySelector('.detail-cta-book');
  call.removeAttribute('data-detail-book');
  call.href=restaurant?'tel:+79016969272':'tel:+74932482727';
  call.textContent=say('Позвонить','Call Us');
  const cta=document.querySelector('.detail-cta');
  cta.id='detail-cta';
  cta.style.setProperty('--cta-photo',`url("${entry.image}")`);
  if(kind==='rooms'){
    const online=document.getElementById('detail-online-book');
    online.hidden=false;
    online.firstChild.textContent=say('Онлайн-бронирование ','Online Booking ');
    const modal=document.getElementById('booking-modal');
    set('booking-modal-label',say('Бронирование','Booking'));
    set('booking-modal-title',say('Онлайн-бронирование подключается','Online booking is coming soon'));
    set('booking-modal-text',say('Пока номер можно забронировать через отдел бронирования.','For now, book this room through the reservations team.'));
    document.getElementById('booking-modal-close').setAttribute('aria-label',say('Закрыть','Close'));
    const close=()=>{modal.hidden=true;document.body.classList.remove('booking-modal-open');online.focus()};
    const open=()=>{modal.hidden=false;document.body.classList.add('booking-modal-open');document.body.classList.remove('detail-menu-open');document.getElementById('detail-menu').inert=true;document.getElementById('detail-burger').setAttribute('aria-expanded','false');document.getElementById('booking-modal-close').focus()};
    document.querySelectorAll('[data-online-book],.detail-header [data-detail-book],.detail-menu [data-detail-book]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();open()}));
    document.getElementById('booking-modal-close').addEventListener('click',close);
    modal.addEventListener('click',event=>{if(event.target===modal)close()});
    addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)close()});
  }
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
