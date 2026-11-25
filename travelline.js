// TravelLine integration profile supplied by the hotel on 25 November 2026.
// The configured booking page must be /booking/ on the final domain.
(function (w) {
  const requested = new URLSearchParams(w.location.search).get('lang');
  const saved = w.sessionStorage.getItem('tourist-lang');
  const lang = requested === 'en' || requested === 'ru' ? requested : (saved === 'en' ? 'en' : 'ru');
  const q = [
    ['setContext', 'TL-INT-tourist37_2026-11-25', lang],
    ['embed', 'booking-form', { container: 'tl-booking-form' }],
    ['embed', 'search-form', { container: 'tl-search-form' }]
  ];
  const hosts = ['ru-ibe.tlintegration.ru', 'ibe.tlintegration.ru', 'ibe.tlintegration.com'];
  const t = w.travelline = w.travelline || {};
  const ti = t.integration = t.integration || {};
  ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;
  if (ti.__loader) return;
  ti.__loader = true;
  const parent = w.document.head || w.document.body;
  function load(remaining) {
    if (!remaining.length) return;
    const script = w.document.createElement('script');
    script.async = true;
    script.src = 'https://' + remaining[0] + '/integration/loader.js';
    const retry = function () {
      if (!w.TL) { script.remove(); load(remaining.slice(1)); }
    };
    script.onerror = retry;
    script.onload = retry;
    parent.appendChild(script);
  }
  load(hosts);
})(window);
