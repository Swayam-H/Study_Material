(function () {
  var root = document.body.dataset.root || '';
  var pageId = document.body.dataset.page || '';
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  // data files are plain scripts so the site also works when opened straight from disk
  function loadScript(name) {
    return new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = root + 'assets/' + name; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }
  var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // theme: system -> light -> dark
  $('theme-btn').addEventListener('click', function () {
    var el = document.documentElement, cur = el.dataset.theme;
    var sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    var next = cur ? (cur === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark');
    el.dataset.theme = next;
    try { localStorage.setItem('notes:theme', next); } catch (e) {}
  });

  // mobile nav
  var side = $('side'), scrim = $('scrim'), menu = $('menu-btn');
  function setNav(open) { side.classList.toggle('open', open); scrim.hidden = !open; menu.setAttribute('aria-expanded', open); }
  menu.addEventListener('click', function () { setNav(!side.classList.contains('open')); });
  scrim.addEventListener('click', function () { setNav(false); });
  var cur = side.querySelector('.current');
  if (cur) side.scrollTop = Math.max(0, cur.offsetTop - side.clientHeight / 3);

  // progress
  var done = store.get('notes:done', {});
  function paint() {
    document.querySelectorAll('[data-id]').forEach(function (a) { a.classList.toggle('done', !!done[a.dataset.id]); });
    document.querySelectorAll('[data-progress-for]').forEach(function (el) {
      var p = el.dataset.progressFor, n = 0;
      for (var k in done) if (done[k] && k.indexOf(p) === 0) n++;
      el.textContent = n ? n + ' done' : '';
    });
    var b = $('done-btn');
    if (b) { var on = !!done[pageId]; b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ Done' : 'Mark as done'; }
  }
  var doneBtn = $('done-btn');
  if (doneBtn) doneBtn.addEventListener('click', function () {
    if (done[pageId]) delete done[pageId]; else done[pageId] = 1;
    store.set('notes:done', done); paint();
  });
  paint();

  // remember the last chapter, offer it on the home page
  if (pageId) store.set('notes:last', pageId);
  var resume = $('resume');
  if (resume) {
    var last = store.get('notes:last', '');
    if (last) loadScript('titles.js').then(function () {
      var t = window.NOTES_TITLES || {};
      if (!t[last]) return;
      resume.innerHTML = '<a class="resume" href="' + root + last + '.html"><span><small>Continue reading</small><b>' + esc(t[last].t) + '</b></span><em>Open →</em></a>';
    }).catch(function () {});
  }

  // outline scroll spy
  var links = [].slice.call(document.querySelectorAll('.outline a'));
  if (links.length) {
    var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });
    var spy = function () {
      var i = 0;
      for (var j = 0; j < heads.length; j++) if (heads[j] && heads[j].getBoundingClientRect().top < 120) i = j;
      links.forEach(function (a, k) { a.classList.toggle('on', k === i); });
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }

  // search
  var input = $('search-input'), box = $('search-results'), index = null, sel = -1, loading = null;
  function load() {
    if (!loading) loading = loadScript('search.js').then(function () {
      var d = window.NOTES_SEARCH || [];
      d.forEach(function (e) { e.lt = e.t.toLowerCase(); e.lx = e.x.toLowerCase(); });
      index = d;
    });
    return loading;
  }
  function run() {
    var q = input.value.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    if (!index) { load().then(run).catch(function () { box.hidden = false; box.innerHTML = '<div class="search-empty">Search could not load.</div>'; }); return; }
    var terms = q.split(/\s+/), hits = [];
    for (var i = 0; i < index.length; i++) {
      var e = index[i], score = 0, ok = true;
      for (var j = 0; j < terms.length; j++) {
        var t = terms[j], inT = e.lt.indexOf(t) >= 0, at = e.lx.indexOf(t);
        if (!inT && at < 0) { ok = false; break; }
        score += inT ? 10 : 1;
      }
      if (ok) hits.push({ e: e, s: score });
    }
    hits.sort(function (a, b) { return b.s - a.s; });
    var re = new RegExp('(' + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'ig');
    var hl = function (s) { return esc(s).replace(re, '<mark>$1</mark>'); };
    sel = -1;
    box.hidden = false;
    box.innerHTML = hits.length ? hits.slice(0, 30).map(function (h) {
      var e = h.e, at = e.lx.indexOf(terms[0]), snip = '';
      if (at >= 0) { var s = Math.max(0, at - 50); snip = (s ? '…' : '') + e.x.slice(s, at + 110) + '…'; }
      return '<a href="' + root + e.u + '"><small>' + esc(e.c) + '</small><b>' + hl(e.t) + '</b>' + (snip ? '<span>' + hl(snip) + '</span>' : '') + '</a>';
    }).join('') : '<div class="search-empty">Nothing matches “' + esc(input.value.trim()) + '”.</div>';
  }
  input.addEventListener('focus', function () { load().catch(function () {}); if (input.value) run(); });
  input.addEventListener('input', run);
  input.addEventListener('keydown', function (ev) {
    var items = box.querySelectorAll('a');
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (!items.length) return;
      sel = (sel + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach(function (a, k) { a.classList.toggle('sel', k === sel); });
      items[sel].scrollIntoView({ block: 'nearest' });
    } else if (ev.key === 'Enter' && items.length) {
      location.href = items[Math.max(sel, 0)].href; box.hidden = true; input.blur();
    } else if (ev.key === 'Escape') { box.hidden = true; input.blur(); }
  });
  document.addEventListener('click', function (ev) { if (!ev.target.closest('.search')) box.hidden = true; });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { ev.preventDefault(); input.focus(); }
  });
})();
