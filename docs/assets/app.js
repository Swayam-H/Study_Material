(function () {
  var root = document.body.dataset.root || '';
  var pageId = document.body.dataset.page || '';
  var docEl = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel, el) { return [].slice.call((el || document).querySelectorAll(sel)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    raw: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    setRaw: function (k, v) { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} }
  };
  // data files are plain scripts so the site also works when opened straight from disk
  var loaded = {};
  function loadScript(name) {
    if (!loaded[name]) loaded[name] = new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = root + 'assets/' + name; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
    return loaded[name];
  }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var done = store.get('notes:done', {});
  var probs = store.get('notes:probs', {});
  var saved = store.get('notes:saved', []);

  // ---------- settings & quick theme toggle ----------
  var pop = $('settings-pop'), sbtn = $('settings-btn'), tquick = $('theme-quick');
  function mark(seg, attr, val) {
    var el = $(seg); if (!el) return;
    $$('button', el).forEach(function (b) { b.classList.toggle('on', b.getAttribute(attr) === val); });
  }
  function paintSettings() {
    mark('size-seg', 'data-size', store.raw('notes:size') || '18');
    mark('theme-seg', 'data-theme-set', store.raw('notes:theme') || '');
    mark('sol-seg', 'data-sol', store.raw('notes:sol') || 'hide');
  }
  function setTheme(t) {
    store.setRaw('notes:theme', t);
    if (t) docEl.dataset.theme = t; else delete docEl.dataset.theme;
    paintSettings();
  }
  if (tquick) tquick.addEventListener('click', function () {
    var cur = docEl.dataset.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
  if (sbtn && pop) {
    sbtn.addEventListener('click', function (e) { e.stopPropagation(); pop.hidden = !pop.hidden; sbtn.setAttribute('aria-expanded', !pop.hidden); });
    pop.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.size) { store.setRaw('notes:size', b.dataset.size); docEl.style.setProperty('--read-size', b.dataset.size + 'px'); }
      if (b.hasAttribute('data-theme-set')) setTheme(b.getAttribute('data-theme-set'));
      if (b.dataset.sol) { store.setRaw('notes:sol', b.dataset.sol); applySolutions(b.dataset.sol === 'show'); }
      paintSettings();
    });
  }
  paintSettings();

  // ---------- focus mode ----------
  var focusBtn = $('focus-btn');
  function setFocus(on) {
    document.body.classList.toggle('is-focus', !!on);
    if (focusBtn) {
      focusBtn.classList.toggle('primary', !!on);
      focusBtn.classList.toggle('ghost', !on);
      focusBtn.textContent = on ? 'Exit focus' : 'Focus mode';
    }
  }
  if (store.raw('notes:focus') === '1') setFocus(true);
  if (focusBtn) focusBtn.addEventListener('click', function () {
    var next = !document.body.classList.contains('is-focus');
    store.setRaw('notes:focus', next ? '1' : '');
    setFocus(next);
  });

  // ---------- solutions ----------
  var solToggle = $('sol-toggle');
  function applySolutions(open) {
    $$('.prose details.sol').forEach(function (d) { d.open = open; });
    if (solToggle) solToggle.textContent = open ? 'Hide all solutions' : 'Show all solutions';
  }
  if (store.raw('notes:sol') === 'show') applySolutions(true);
  if (solToggle) solToggle.addEventListener('click', function () {
    applySolutions(!$$('.prose details.sol').every(function (d) { return d.open; }));
  });
  // a link straight to a problem should not open its solution, but a hash inside one should reveal it
  function revealHash() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var d = el && el.closest('details.sol');
    if (d) { d.open = true; el.scrollIntoView(); }
  }
  addEventListener('hashchange', revealHash); revealHash();

  // ---------- mobile nav ----------
  var side = $('side'), scrim = $('scrim'), menu = $('menu-btn');
  function setNav(open) { side.classList.toggle('open', open); scrim.hidden = !open; menu.setAttribute('aria-expanded', open); }
  if (menu) menu.addEventListener('click', function () { setNav(!side.classList.contains('open')); });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  var cur = side && side.querySelector('.current');
  if (cur) side.scrollTop = Math.max(0, cur.offsetTop - side.clientHeight / 3);

  // ---------- progress ----------
  function countDone(prefix) { var n = 0; for (var k in done) if (done[k] && k.indexOf(prefix) === 0) n++; return n; }
  function paint() {
    $$('[data-id]').forEach(function (a) { a.classList.toggle('done', !!done[a.dataset.id]); });
    $$('[data-bar-for]').forEach(function (el) { el.style.width = Math.round(100 * countDone(el.dataset.barFor) / (+el.dataset.total || 1)) + '%'; });
    $$('[data-count-text]').forEach(function (el) {
      var n = countDone(el.dataset.countText), t = +el.dataset.total;
      el.textContent = el.dataset.short ? (n ? n + ' / ' + t + ' done' : '') : n + ' of ' + t + ' chapters done';
    });
    $$('[data-count-for]').forEach(function (el) { var n = countDone(el.dataset.countFor); el.textContent = n ? n + '/' + el.dataset.total : ''; });
    var b = $('done-btn');
    if (b) { var on = !!done[pageId]; b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ Completed' : 'Mark as done'; }
  }
  var doneBtn = $('done-btn');
  if (doneBtn) doneBtn.addEventListener('click', function () {
    if (done[pageId]) delete done[pageId]; else done[pageId] = 1;
    store.set('notes:done', done); paint();
  });
  paint();
  if (pageId) store.set('notes:last', { id: pageId, y: 0 });

  // ---------- reading bar, back to top, scroll memory ----------
  var bar = $('read-bar'), toTop = $('to-top'), tick = false;
  function onScroll() {
    tick = false;
    var h = docEl.scrollHeight - innerHeight, y = scrollY;
    if (pageId && bar) bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    if (toTop) toTop.hidden = y < 700;
    spy();
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if (toTop) toTop.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });

  // ---------- outline scroll spy ----------
  var links = $$('.outline a');
  var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });
  function spy() {
    if (!links.length) return;
    var i = 0;
    for (var j = 0; j < heads.length; j++) if (heads[j] && heads[j].getBoundingClientRect().top < 130) i = j;
    links.forEach(function (a, k) { a.classList.toggle('on', k === i); });
    var on = links[i], box = on.closest('.outline');
    if (box && (on.offsetTop < box.scrollTop || on.offsetTop > box.scrollTop + box.clientHeight - 60)) box.scrollTop = on.offsetTop - box.clientHeight / 2;
  }
  onScroll();

  // ---------- saved sections ----------
  function isSaved(u) { return saved.some(function (s) { return s.u === u; }); }
  if (pageId) {
    var chTitle = (document.querySelector('.note-head h1') || {}).textContent || '';
    $$('.prose h2[id], .prose h3[id]').forEach(function (h) {
      var u = pageId + '.html#' + h.id, b = document.createElement('button');
      var title = h.textContent;
      b.className = 'save-btn'; b.type = 'button';
      var set = function () { var on = isSaved(u); b.textContent = on ? '★' : '☆'; b.classList.toggle('on', on); b.setAttribute('aria-label', on ? 'Remove from saved' : 'Save this section'); b.title = on ? 'Saved' : 'Save this section'; };
      b.addEventListener('click', function () {
        if (isSaved(u)) saved = saved.filter(function (s) { return s.u !== u; });
        else saved.unshift({ u: u, t: title, c: chTitle });
        store.set('notes:saved', saved); set();
      });
      set(); h.appendChild(b);
    });
  }

  // ---------- home dashboard ----------
  if (document.body.classList.contains('is-home')) loadScript('meta.js').then(function () {
    var m = window.NOTES_META; if (!m) return;
    var total = 0, nd = 0;
    m.courses.forEach(function (c) { total += c.nChapters; nd += countDone(c.slug + '/'); });
    var pct = total ? Math.round(100 * nd / total) : 0;
    if ($('ring-fg')) $('ring-fg').style.strokeDashoffset = 326.7 * (1 - (total ? nd / total : 0));
    if ($('ring-pct')) $('ring-pct').textContent = pct + '%';
    var np = 0, nr = 0; for (var k in probs) { if (probs[k] === 'done') np++; else if (probs[k] === 'review') nr++; }
    if ($('st-ch')) $('st-ch').textContent = nd + ' / ' + total;
    if ($('st-pr')) $('st-pr').textContent = np;
    if ($('st-rv')) $('st-rv').textContent = nr;
    if ($('st-sv')) $('st-sv').textContent = saved.length;
    var last = store.get('notes:last', null), id = last && (last.id || last);
    if (id && m.titles[id] && $('resume-btn')) {
      var rb = $('resume-btn'); rb.href = id + '.html';
      rb.innerHTML = 'Continue: ' + esc(m.titles[id].length > 42 ? m.titles[id].slice(0, 40) + '…' : m.titles[id]);
    }
    if (saved.length && $('saved-box')) $('saved-box').innerHTML = '<div class="sec-head"><h2 class="sec-title">Pinned Bookmarks</h2><span class="sec-sub">Your saved theorems &amp; sections</span></div><div class="saved-list">' + saved.slice(0, 30).map(function (s) {
      return '<a href="' + esc(s.u) + '"><b>★ ' + esc(s.t.replace(/[★☆]/g, '')) + '</b><span>' + esc(s.c) + '</span></a>';
    }).join('') + '</div>';
  }).catch(function () {});

  // ---------- formula filter ----------
  var ff = $('formula-filter');
  if (ff) ff.addEventListener('input', function () {
    var q = ff.value.trim().toLowerCase();
    $$('.f-group').forEach(function (g) {
      var any = false;
      $$('.f-card', g).forEach(function (c) { var ok = !q || c.dataset.text.indexOf(q) >= 0; c.hidden = !ok; any = any || ok; });
      g.hidden = !any;
    });
  });

  // ---------- practice ----------
  var plist = $('p-list');
  if (plist) {
    var state = { q: '', doc: '', status: '', tags: {}, shown: 15, only: null };
    var statusOf = function (p) { return probs[p.id] || 'todo'; };
    var card = function (p) {
      var st = statusOf(p);
      return '<article class="p-card st-' + st + '" data-pid="' + esc(p.id) + '">' +
        '<header><span class="p-tags">' + p.tags.map(function (t) { return '<i>' + esc(t) + '</i>'; }).join('') + (p.hard ? '<i class="hard">Hard</i>' : '') + '</span><a href="' + root + esc(p.u) + '">' + esc(p.c) + ' →</a></header>' +
        '<div class="prose p-q">' + p.q + '</div>' +
        '<details class="sol"><summary><span>Solution</span></summary><div class="prose">' + p.a + '</div></details>' +
        '<footer><button type="button" data-set="done" class="' + (st === 'done' ? 'on' : '') + '">✓ Solved it</button><button type="button" data-set="review" class="' + (st === 'review' ? 'on' : '') + '">↻ Review later</button></footer></article>';
    };
    var render = function () {
      var all = window.NOTES_PROBLEMS || [], tags = Object.keys(state.tags).filter(function (t) { return state.tags[t]; });
      var q = state.q.trim().toLowerCase();
      var list = all.filter(function (p) {
        if (state.only) return p.id === state.only;
        if (state.doc && p.d !== state.doc) return false;
        if (state.status && statusOf(p) !== state.status) return false;
        if (tags.length && !p.tags.some(function (t) { return state.tags[t]; })) return false;
        if (q) {
          var hay = ((p.l || '') + ' ' + (p.s || '') + ' ' + (p.c || '') + ' ' + (p.q || '')).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      var solved = all.filter(function (p) { return statusOf(p) === 'done'; }).length;
      var rev = all.filter(function (p) { return statusOf(p) === 'review'; }).length;
      $('p-count').innerHTML = state.only
        ? '🎲 Random challenge pick · <button type="button" class="linkish" id="p-all">Return to all ' + all.length + ' problems</button>'
        : 'Showing ' + list.length + ' problems · ' + solved + ' of ' + all.length + ' solved' + (rev ? ' · ' + rev + ' in review' : '');
      plist.innerHTML = list.length ? list.slice(0, state.shown).map(card).join('') : '<p class="search-empty">No problems match these filters.</p>';
      $('p-more').hidden = list.length <= state.shown;
      $('p-more').textContent = 'Show more (' + Math.max(0, list.length - state.shown) + ' remaining)';
      var back = $('p-all'); if (back) back.addEventListener('click', function () { state.only = null; render(); });
      return list;
    };
    var random = function () {
      var all = window.NOTES_PROBLEMS || [];
      var pool = all.filter(function (p) { return statusOf(p) !== 'done' && (!state.doc || p.d === state.doc); });
      if (!pool.length) pool = all;
      if (!pool.length) return;
      state.only = pool[Math.floor(Math.random() * pool.length)].id; render(); scrollTo({ top: 0, behavior: 'smooth' });
    };
    plist.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-set]'); if (!b) return;
      var c = b.closest('.p-card'), id = c.dataset.pid, v = b.dataset.set;
      if (probs[id] === v) delete probs[id]; else probs[id] = v;
      store.set('notes:probs', probs);
      var st = probs[id] || 'todo';
      c.className = 'p-card st-' + st;
      $$('button[data-set]', c).forEach(function (x) { x.classList.toggle('on', x.dataset.set === st); });
    });
    if ($('f-q')) $('f-q').addEventListener('input', function (e) { state.q = e.target.value; state.shown = 15; state.only = null; render(); });
    $('f-doc').addEventListener('change', function (e) { state.doc = e.target.value; state.shown = 15; state.only = null; render(); });
    $('f-status').addEventListener('change', function (e) { state.status = e.target.value; state.shown = 15; state.only = null; render(); });
    $('f-tags').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      state.tags[b.dataset.tag] = !state.tags[b.dataset.tag]; b.classList.toggle('on', state.tags[b.dataset.tag]);
      state.shown = 15; state.only = null; render();
    });
    $('p-more').addEventListener('click', function () { state.shown += 15; render(); });
    $('f-random').addEventListener('click', random);
    var start = function () { if (location.hash === '#random') random(); else render(); };
    if (window.NOTES_PROBLEMS) start(); else addEventListener('load', start);
  }

  // ---------- search ----------
  var input = $('search-input'), box = $('search-results'), index = null, sel = -1;
  function load() {
    return loadScript('search.js').then(function () {
      if (index) return;
      index = window.NOTES_SEARCH || [];
      index.forEach(function (e) { e.lt = e.t.toLowerCase(); e.lx = e.x.toLowerCase(); });
    });
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
      if (ok) hits.push({ e: e, s: score - (e.k ? 0.5 : 0) });
    }
    hits.sort(function (a, b) { return b.s - a.s; });
    var re = new RegExp('(' + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'ig');
    var hl = function (s) { return esc(s).replace(re, '<mark>$1</mark>'); };
    sel = -1;
    box.hidden = false;
    box.innerHTML = hits.length ? '<div class="search-head">' + hits.length + ' result' + (hits.length > 1 ? 's' : '') + '</div>' + hits.slice(0, 40).map(function (h) {
      var e = h.e, at = e.lx.indexOf(terms[0]), snip = '';
      if (at >= 0) { var s = Math.max(0, at - 50); snip = (s ? '…' : '') + e.x.slice(s, at + 110) + '…'; }
      else if (e.k) snip = e.x.slice(0, 140) + '…';
      return '<a href="' + root + e.u + '"><small>' + esc(e.c) + '</small><b>' + hl(e.t) + '</b>' + (snip ? '<span>' + hl(snip) + '</span>' : '') + '</a>';
    }).join('') : '<div class="search-empty">Nothing matches “' + esc(input.value.trim()) + '”.</div>';
  }
  if (input) {
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
  }
  document.addEventListener('click', function (ev) {
    if (box && !ev.target.closest('.search')) box.hidden = true;
    if (pop && !pop.hidden) { pop.hidden = true; sbtn.setAttribute('aria-expanded', false); }
  });
  document.addEventListener('keydown', function (ev) {
    var typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((ev.key === '/' && !typing) || (ev.key === 'k' && (ev.ctrlKey || ev.metaKey))) { ev.preventDefault(); if (input) { input.focus(); input.select(); } return; }
    if (typing || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (ev.key === 'f' && focusBtn) { focusBtn.click(); return; }
    var go = ev.key === 'n' ? $('next-link') : ev.key === 'p' ? $('prev-link') : null;
    if (go) location.href = go.href;
  });

  // ---------- offline ----------
  var canSW = 'serviceWorker' in navigator && /^https?:$/.test(location.protocol);
  var obtn = $('offline-btn'), ohint = $('offline-hint');
  if (canSW) navigator.serviceWorker.register(root + 'sw.js').catch(function () {});
  if (obtn) {
    if (!canSW || !window.caches) {
      obtn.disabled = true;
      obtn.textContent = location.protocol === 'file:' ? 'Already offline (opened from disk)' : 'Offline saving is not available here';
    } else obtn.addEventListener('click', function () {
      obtn.disabled = true;
      loadScript('pages.js').then(function () {
        var list = window.NOTES_PAGES || [], i = 0, fail = 0;
        return caches.open('notes-offline').then(function (cache) {
          var next = function () {
            if (i >= list.length) return;
            var u = root + list[i++];
            obtn.textContent = 'Saving ' + i + ' of ' + list.length + '…';
            return fetch(u).then(function (r) { if (r.ok) return cache.put(u, r); fail++; }).catch(function () { fail++; }).then(next);
          };
          return Promise.all([next(), next(), next(), next()]).then(function () {
            obtn.textContent = fail ? 'Saved, but ' + fail + ' files failed. Try again' : '✓ Saved for offline';
            obtn.disabled = !fail;
            if (!fail && ohint) ohint.textContent = 'Every page now opens without internet. Save again after the notes change.';
          });
        });
      }).catch(function () { obtn.disabled = false; obtn.textContent = 'Could not save. Try again'; });
    });
  }
})();
