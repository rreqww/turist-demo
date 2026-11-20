const sections = {
  rooms: [
    {id:'standard',title:'Стандарт',meta:'Номер',image:'assets/rooms/standard/02.jpg',count:2,description:'Однокомнатный номер площадью 16–20 м². Подходит для одного или двух гостей.'},
    {id:'standard-plus',title:'Улучшенный стандарт',meta:'Номер',image:'assets/rooms/standard-plus/01.jpg',count:8,description:'Обновлённый номер площадью около 18 м² для одного или двух гостей.'},
    {id:'business',title:'Бизнес',meta:'Номер',image:'assets/rooms/business/01.jpg',count:1,description:'Номер площадью около 17 м² для одного или двух гостей.'},
    {id:'superior',title:'Супериор',meta:'Номер',image:'assets/rooms/superior/02.jpg',count:7,description:'Просторный двухкомнатный номер площадью около 35 м².'},
    {id:'deluxe-twin',title:'Делюкс · две кровати',meta:'Номер',image:'assets/rooms/deluxe-twin/01.jpg',count:8,description:'Номер площадью около 30 м² с двумя кроватями. Размещение до трёх гостей.'},
    {id:'deluxe-sofa',title:'Делюкс · кровать и диван',meta:'Номер',image:'assets/rooms/deluxe-sofa/03.jpg',count:6,description:'Номер категории «Делюкс» с кроватью и диваном. Размещение до трёх гостей.'}
  ],
  restaurant: [
    {id:'restaurant',title:'Ресторан «Турист»',meta:'Ресторан',image:'assets/legacy/restaurant/04.jpg',photos:[4,5,2,3,6,7,8,9,10,11],description:'Ресторан на втором этаже комплекса: завтраки, бизнес-ланчи, ужины и события.'},
    {id:'palekh',title:'Зал «Палех»',meta:'Банкетный зал',image:'assets/legacy/palekh/02.jpg',photos:[2,3,4,5,6],description:'Камерный зал с картинами палехских мастеров для семейных и деловых встреч.'},
    {id:'transformer',title:'Зал-трансформер',meta:'Банкетный зал',image:'assets/halls/banquet/01.jpg',count:6,description:'Многофункциональное пространство для банкетов, встреч и событий разного формата.'}
  ],
  conference: [
    {id:'large',title:'Большой зал',meta:'Конференц-зал',image:'assets/halls/conference-large/01.jpg',count:8,description:'Площадка для конференций, презентаций и деловых мероприятий.'},
    {id:'small',title:'Малый зал',meta:'Конференц-зал',image:'assets/halls/conference-small/01.jpg',count:5,description:'Зал для встреч, семинаров и камерных деловых мероприятий.'}
  ],
  offers: [
    {id:'groups',title:'Для туристических групп',meta:'Спецпредложение',image:'assets/legacy/restaurant/04.jpg',description:'Условия размещения и питания для туристических групп.'},
    {id:'long-stay',title:'Длительное проживание',meta:'Спецпредложение',image:'assets/rooms/deluxe-sofa/03.jpg',description:'Специальные условия при длительном размещении.'},
    {id:'wedding',title:'Свадебное предложение',meta:'Спецпредложение',image:'assets/halls/banquet/01.jpg',description:'Праздник в гостиничном комплексе «Турист».'},
    {id:'group-rates',title:'Цены для групп от 10 человек',meta:'Спецпредложение',image:'assets/halls/conference-large/01.jpg',description:'Индивидуальные условия для групповых бронирований.'},
    {id:'guides',title:'Питание для гидов и водителей',meta:'Спецпредложение',image:'assets/legacy/restaurant/06.jpg',description:'Предложение для сопровождающих туристические группы.'}
  ]
};
window.TOURIST_CONTENT = sections;
const roots = {rooms:'room-cards',restaurant:'restaurant-cards',conference:'conference-cards',offers:'offer-cards'};
for (const [kind,list] of Object.entries(sections)) {
  const root = document.getElementById(roots[kind]);
  if (!root) continue;
  root.innerHTML = list.map(item => `<a class="new-card ${item.image?'':'no-photo'}" href="detail.html?kind=${kind}&id=${item.id}">${item.image?`<img loading="lazy" src="${item.image}" alt="${item.title}">`:''}<span class="card-label"><span class="card-meta">${item.meta}</span>${item.title}</span></a>`).join('');
}
document.addEventListener('click', event => {
  const trigger=event.target.closest('[data-book]');
  if (!trigger) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if(document.body.classList.contains('menu-open'))document.querySelector('.burger')?.click();
  const panel=document.getElementById('booking-panel');
  if(panel){const hero=document.getElementById('top'),stage=document.getElementById('stage');const range=hero.offsetHeight-stage.clientHeight;window.scrollTo({top:hero.offsetTop+range*.9,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});panel.classList.add('booking-attention');}
  else window.location.href='index.html#top';
},true);
document.querySelectorAll('a[href="#rooms"]').forEach(link=>link.href='#rooms-new');
