(() => {
  const lang=window.TOURIST_LANG;
  const en=lang==='en';
  const say=(ru,english)=>en?english:ru;
  const home=(anchor)=>`../index.html${en?'?lang=en':''}${anchor?'#'+anchor:''}`;
  document.getElementById('booking-eyebrow').textContent=say('Гостиничный комплекс «Турист» · Иваново','Tourist Hotel Complex · Ivanovo');
  document.getElementById('booking-title').textContent=say('Бронирование номеров','Book a room');
  document.getElementById('booking-description').textContent=say('Выберите даты и подходящий номер. Наличие и итоговую стоимость покажет система TravelLine.','Choose your dates and room. TravelLine will show availability and the final price.');
  document.getElementById('booking-provider').textContent=say('Модуль бронирования TravelLine','TravelLine booking module');
  document.getElementById('booking-assistance-label').textContent=say('Нужна помощь с бронированием?','Need help with your booking?');
  document.getElementById('booking-rooms-link').textContent=say('Номера','Rooms');
  document.getElementById('booking-rooms-link').href=home('rooms-new');
  document.getElementById('booking-contacts-link').textContent=say('Контакты','Contacts');
  document.getElementById('booking-contacts-link').href=home('contacts');
  document.getElementById('booking-back-link').textContent=say('← На сайт','← Back to site');
  document.getElementById('booking-back-link').href=home();
  document.querySelector('.booking-brand').href=home();
  document.title=say('Бронирование номеров · Гостиничный комплекс «Турист»','Room booking · Tourist Hotel Complex');
})();
