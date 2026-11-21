(() => {
  const lang=window.TOURIST_LANG||'ru';
  const T=window.TOURIST_T||((x)=>x);
  const sections=window.TOURIST_CONTENT||{};
  const roots={rooms:'room-cards',restaurant:'restaurant-cards',conference:'conference-cards',offers:'offer-cards'};
  const anchors={rooms:'rooms-new',restaurant:'restaurant',conference:'conference',offers:'offers'};
  const localized=(ru,en)=>lang==='en'?en:ru;
  const set=(selector,ru,en)=>{const node=document.querySelector(selector);if(node)node.textContent=localized(ru,en)};
  const url=(path,section)=>window.TOURIST_URL(path,section);

  for(const [kind,list] of Object.entries(sections)){
    const root=document.getElementById(roots[kind]);
    if(!root)continue;
    root.innerHTML=list.map(item=>{
      const title=T(item.title),meta=T(item.meta);
      const href=url(`detail.html?kind=${kind}&id=${item.id}`,anchors[kind]);
      return `<a class="new-card" href="${href}"><img loading="lazy" src="${item.image}" alt="${title}"><span class="card-label"><span class="card-meta">${meta}</span>${title}</span></a>`;
    }).join('');
  }

  document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{
    const rail=document.getElementById(button.dataset.slide==='offers'?'offer-cards':'room-cards');
    const card=rail?.querySelector('.new-card');
    if(card)rail.scrollBy({left:parseInt(button.dataset.dir,10)*(card.getBoundingClientRect().width+18),behavior:'smooth'});
  }));
  for(const kind of ['rooms','offers']){
    const rail=document.getElementById(kind==='rooms'?'room-cards':'offer-cards');
    const previous=document.querySelector(`[data-slide="${kind}"][data-dir="-1"]`);
    const next=document.querySelector(`[data-slide="${kind}"][data-dir="1"]`);
    const progress=rail?.closest('.carousel-shell')?.querySelector('.carousel-progress-fill');
    if(!rail||!previous||!next)continue;
    const update=()=>{
      previous.disabled=rail.scrollLeft<=2;
      const maxScroll=Math.max(0,rail.scrollWidth-rail.clientWidth);
      next.disabled=rail.scrollLeft>=maxScroll-2;
      if(progress)progress.style.width=`${18+82*(maxScroll?Math.min(1,Math.max(0,rail.scrollLeft/maxScroll)):1)}%`;
    };
    rail.addEventListener('scroll',update,{passive:true});
    addEventListener('resize',update);
    requestAnimationFrame(update);
  }
  document.querySelectorAll('a[href="#rooms"]').forEach(link=>link.href='#rooms-new');
  document.querySelectorAll('[data-lang]').forEach(link=>{
    link.classList.toggle('active',link.dataset.lang===lang);
    link.setAttribute('aria-current',link.dataset.lang===lang?'page':'false');
    if(link.dataset.lang==='en')link.href='?lang=en'+location.hash;
    else link.href='?lang=ru'+location.hash;
  });
  document.querySelectorAll('a[href="legal.html"]').forEach(a=>a.href=url('legal.html'));

  set('.skip','К содержанию','Skip to content');
  set('.nav a:nth-child(1)','Номера','Rooms');
  set('.nav a:nth-child(2)','Ресторан и банкеты','Restaurant & Events');
  set('.nav a:nth-child(3)','Конференц-залы','Conference Halls');
  set('.nav a:nth-child(4)','Спецпредложения','Special Offers');
  set('.hdr-r [data-book]','Забронировать','Book Now');
  const menuLabels=[
    ['Бронирование','Booking'],['Номера и цены','Rooms & Rates'],
    ['Ресторан','Restaurant'],['Конференц-залы','Conference Halls'],
    ['Спецпредложения','Special Offers'],['Контакты','Contacts'],
    ['Правовая информация','Legal Information']
  ];
  document.querySelectorAll('.menu li a').forEach((a,i)=>{if(menuLabels[i])a.textContent=localized(...menuLabels[i])});
  set('.menu-side div:nth-child(1) b','Адрес','Address');
  const menuAddress=document.querySelector('.menu-side div:nth-child(1)');
  if(menuAddress)menuAddress.lastChild.textContent=localized('Иваново, Набережная улица, 9','Ivanovo, 9 Naberezhnaya Street');
  set('.menu-side div:nth-child(2) b','Отдел бронирования','Reservations');
  set('.menu-side div:nth-child(3) b','Почта','Email');
  set('.menu-side div:nth-child(4) b','Язык','Language');
  set('.h-meta .addr','Иваново, Набережная улица, 9','Ivanovo, Naberezhnaya Street, 9');
  set('.h-meta .cue','Листайте','Scroll');
  const cue=document.querySelector('.h-meta .cue');
  if(cue)cue.innerHTML=localized('Листайте','Scroll')+' <i></i>';
  set('#hsub','гостиничный комплекс','hotel complex');
  const heroTitle=document.getElementById('htitle');
  if(heroTitle){
    const title=localized('В самом сердце города','At the Heart of the City');
    heroTitle.setAttribute('aria-label',title);
    heroTitle.innerHTML=title.split(/\s+/).map((word,i)=>`<span class="w" aria-hidden="true" style="--th:${(i*.1).toFixed(2)}">${word}</span>`).join(' ');
  }
  set('.h-lead','Рядом драматический и кукольный театры, а также Ивановский историко-краеведческий музей имени Д. Г. Бурылина.','Close to the drama and puppet theatres and the Ivanovo Museum of Local History.');
  set('#booking-panel span','Онлайн-бронирование подключается','Online booking is coming soon');
  set('#booking-panel a','Пока можно забронировать по телефону: +7 (4932) 48-27-27','For now, book by phone: +7 (4932) 48-27-27');

  set('#rooms-new .new-eyebrow','Гостиничный комплекс «Турист»','Tourist Hotel Complex');
  set('#rooms-new h2','Номера','Rooms');
  set('#rooms-new .new-heading p','Пространства для отдыха и работы в центре Иванова. Выберите категорию и посмотрите фотографии.','Room to rest and work in central Ivanovo. Explore the categories and photos.');
  set('.carousel-hint','← Свайпайте номера →','← Swipe through rooms →');
  set('.offers-hint','← Свайпайте предложения →','← Swipe through offers →');
  document.querySelectorAll('.carousel-arrow[data-dir="-1"] .carousel-arrow-text').forEach(node=>node.textContent=localized('Назад','Previous'));
  document.querySelectorAll('.carousel-arrow[data-dir="1"] .carousel-arrow-text').forEach(node=>node.textContent=localized('Далее','Next'));
  document.querySelectorAll('[data-slide="offers"]').forEach(button=>button.setAttribute('aria-label',localized(button.dataset.dir==='1'?'Следующее предложение':'Предыдущее предложение',button.dataset.dir==='1'?'Next offer':'Previous offer')));
  document.querySelectorAll('[data-slide="rooms"]').forEach(button=>button.setAttribute('aria-label',localized(button.dataset.dir==='1'?'Следующий номер':'Предыдущий номер',button.dataset.dir==='1'?'Next room':'Previous room')));
  set('#restaurant .mobile-scroll-hint','← Листайте карточки →','← Swipe through the cards →');
  set('#conference .mobile-scroll-hint','← Листайте залы →','← Swipe through the halls →');
  set('#restaurant .new-eyebrow','Вкус и атмосфера','Taste & Atmosphere');
  set('#restaurant .restaurant-intro p','Завтраки, встречи и события в самом центре Иванова. Выберите ресторан или зал под ваш формат.','Breakfast, meetings and celebrations in the heart of Ivanovo. Find a space for your occasion.');
  set('#conference .new-eyebrow','Деловые события','Business Events');
  set('#conference h2','Конференц-залы','Conference Halls');
  set('#conference .new-heading p','Два пространства для встреч, презентаций и мероприятий: большой зал до 120 гостей и малый зал до 50 гостей.','Two spaces for meetings and events: the large hall seats up to 120 guests and the small hall up to 50.');
  set('#offers .new-eyebrow','Для особых планов','For Every Plan');
  set('#offers h2','Спецпредложения','Special Offers');
  set('#offers .new-heading p','Условия для групп, длительного проживания и свадебных событий.','Offers for groups, extended stays and weddings.');
  set('.ft-grid>div:nth-child(1)>b','Адрес','Address');
  set('.ft-grid>div:nth-child(1)>p','Иваново, Набережная улица, 9','Ivanovo, Naberezhnaya Street, 9');
  set('.ft-grid>div:nth-child(2)>b','Бронирование и конференции','Reservations & Conferences');
  set('.ft-grid>div:nth-child(3)>b:first-child','Ресторан','Restaurant');
  set('.ft-grid>div:nth-child(3)>b:nth-of-type(2)','Сотрудничество и реклама','Partnerships & Advertising');
  set('.ft-grid>div:nth-child(4)>b:first-child','Мы в сети','Follow Us');
  set('.ft-grid>div:nth-child(4)>b:nth-of-type(2)','Разделы','Explore');
  set('.ft-grid .social[href*="vk.ru"]','ВКонтакте','VK');
  // Restore icon after changing the social text.
  const vk=document.querySelector('.ft-grid .social[href*="vk.ru"]');
  if(vk)vk.innerHTML='<span class="social-icon vk"><img src="assets/social/vk.svg" alt=""></span> '+localized('ВКонтакте','VK');
  document.querySelectorAll('.ft-nav a').forEach((a,i)=>a.textContent=localized(...[['Номера','Rooms'],['Спецпредложения','Special Offers'],['Правовая информация','Legal Information']][i]));
  set('.ft-bot span:first-child','Гостиничный комплекс «Турист» · Иваново','Tourist Hotel Complex · Ivanovo');
  set('.ft-bot span:last-child','Набережная улица, 9','9 Naberezhnaya Street');
  document.title=localized('Гостиничный комплекс «Турист» · Иваново','Tourist Hotel Complex · Ivanovo');

  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-book]');
    if(!trigger)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if(document.body.classList.contains('menu-open'))document.querySelector('.burger')?.click();
    const panel=document.getElementById('booking-panel');
    if(!panel)return;
    const hero=document.getElementById('top'),stage=document.getElementById('stage');
    const range=hero.offsetHeight-stage.clientHeight;
    window.scrollTo({top:hero.offsetTop+range*.9,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    panel.classList.add('booking-attention');
  },true);

  const heroPanel=document.getElementById('hfinal');
  const syncHeroText=()=>{
    const hero=document.getElementById('top'),stage=document.getElementById('stage');
    const range=hero.offsetHeight-stage.clientHeight;
    const progress=range>0?Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/range)):0;
    heroPanel.style.visibility=progress<.59?'hidden':'visible';
  };
  addEventListener('scroll',syncHeroText,{passive:true});
  syncHeroText();

  // Hide the opening screen until a direct return lands at its section.
  const section=location.hash.slice(1);
  if(['rooms-new','restaurant','conference','offers','contacts'].includes(section)){
    const goToSection=()=>{
      const target=document.getElementById(section);
      if(target)window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-92,behavior:'instant'});
    };
    Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,500))]).then(()=>{
      goToSection();
      requestAnimationFrame(()=>{
        goToSection();
        document.documentElement.classList.remove('section-return');
      });
      setTimeout(goToSection,600);
    });
  }
})();
