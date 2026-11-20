const params=new URLSearchParams(location.search);
const kind=params.get('kind'),id=params.get('id');
const entry=window.TOURIST_CONTENT?.[kind]?.find(x=>x.id===id);
if(!entry){location.replace('index.html');}
else{
  document.title=`${entry.title} · Гостиничный комплекс «Турист»`;
  document.getElementById('detail-meta').textContent=entry.meta;
  document.getElementById('detail-title').textContent=entry.title;
  document.getElementById('detail-description').textContent=entry.description||'Фотографии и подробная информация о пространстве.';
  const cover=document.getElementById('detail-cover');
  if(entry.image){cover.src=entry.image;cover.alt=entry.title;}else cover.remove();
  const gallery=document.getElementById('detail-gallery');
  if(entry.count||entry.photos){const prefix=entry.image.slice(0,entry.image.lastIndexOf('/')+1);const selected=Number(entry.image.match(/(\d+)\.jpg$/)?.[1]);const photos=entry.photos||[selected,...Array.from({length:entry.count},(_,i)=>i+1).filter(x=>x!==selected)];gallery.innerHTML=photos.map((n,i)=>`<img loading="lazy" src="${prefix}${String(n).padStart(2,'0')}.jpg" alt="${entry.title}, фотография ${i+1}">`).join('');}
  if(kind==='offers')document.getElementById('detail-note').textContent='Подробные условия предложения уточняйте в отделе бронирования. Актуальные материалы для этой страницы будут согласованы с гостиницей.';
  if(kind==='restaurant'){document.getElementById('detail-phone').href='tel:+79016969272';document.getElementById('detail-phone').textContent='+7 (901) 696-92-72';}
}
