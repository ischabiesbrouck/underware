/* underware: kleine scripts, geen bibliotheken nodig */
(function () {
  // Header: effen na scrollen; mobiel menu
  var header = document.querySelector('[data-header]');
  var menu = document.querySelector('[data-menu]');
  var toggle = document.querySelector('[data-menu-toggle]');
  function onScroll() { if (header) header.toggleAttribute('data-scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.toggleAttribute('data-open');
      header.toggleAttribute('data-menu', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle.click(); }); });
  }

  // Fade-in bij scrollen
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Shop: filter en teller
  var filters = document.querySelectorAll('[data-filter]');
  var count = document.querySelector('[data-count]');
  function applyFilter(cat) {
    filters.forEach(function (b) { b.toggleAttribute('data-active', b.getAttribute('data-filter') === cat); });
    var n = 0;
    document.querySelectorAll('.card[data-category]').forEach(function (card) {
      var show = cat === 'alles' || card.getAttribute('data-category') === cat;
      card.classList.toggle('is-hidden', !show);
      if (show) n++;
    });
    if (count) count.textContent = n + (n === 1 ? ' product' : ' producten');
  }
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.getAttribute('data-filter')); });
  });
  function fromHash() {
    var h = location.hash.replace('#', '');
    if (filters.length && document.querySelector('[data-filter="' + h + '"]')) applyFilter(h);
  }
  fromHash();
  window.addEventListener('hashchange', fromHash);

  // Productpagina: kleur kiezen wisselt de grote afbeelding
  var main = document.querySelector('[data-main]');
  if (main) {
    var img = main.querySelector('img');
    var nameEl = document.querySelector('[data-color-name]');
    var pickers = document.querySelectorAll('[data-src]');
    pickers.forEach(function (el) {
      el.addEventListener('click', function () {
        var src = el.getAttribute('data-src');
        img.style.opacity = 0;
        setTimeout(function () {
          img.src = src;
          img.style.opacity = 1;
        }, 180);
        if (nameEl) nameEl.textContent = el.getAttribute('data-color');
        pickers.forEach(function (p) { p.toggleAttribute('data-active', p.getAttribute('data-src') === src); });
      });
    });
  }

  // Formulieren zonder koppeling: toon een bedankje (zie README om te koppelen)
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      if (f.getAttribute('action')) return;
      e.preventDefault();
      var note = f.querySelector('[data-note]');
      if (note) note.textContent = f.getAttribute('data-demo');
      f.reset();
    });
  });

  // Maathulp: taille (cm) -> maat. Tussen twee maten? Dan de grotere.
  document.querySelectorAll('[data-size-finder]').forEach(function (f) {
    var ranges = JSON.parse(f.getAttribute('data-size-finder'));
    var input = f.querySelector('input');
    var out = f.querySelector('[data-size-result]');
    input.addEventListener('input', function () {
      var w = parseFloat(input.value);
      if (!w || w < 60) { out.textContent = 'Vul je taille in; je maat verschijnt hier.'; return; }
      var last = ranges[ranges.length - 1];
      if (w > last[2]) { out.innerHTML = 'Groter dan ' + last[0] + '? <a class="underline" href="contact.html">Stuur ons een bericht</a>, we denken mee.'; return; }
      var pick = ranges[0];
      for (var i = 0; i < ranges.length; i++) { if (w >= ranges[i][1]) pick = ranges[i]; }
      if (w > pick[2] && ranges.indexOf(pick) < ranges.length - 1) pick = ranges[ranges.indexOf(pick) + 1];
      out.innerHTML = 'Jouw maat: <strong class="font-display text-2xl text-ink">' + pick[0] + '</strong> <span class="ml-1">(' + pick[1] + '–' + pick[2] + ' cm). Je eerste maatwissel is gratis.</span>';
    });
  });

  // Mobiele koopbalk: verschijnt zodra de koopknop uit beeld is
  var bar = document.querySelector('[data-buy-bar]');
  var buy = document.querySelector('[data-shopify-product]');
  if (bar && buy && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      var past = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
      bar.toggleAttribute('data-show', past);
    }).observe(buy);
  }

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
