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
  var due = store.get('notes:due', {});
  // problem ratings: 'done' = Got it, 'shaky' = Shaky, 'review' = Wrong. Shaky and wrong ones form the retry list.
  var isRetry = function (v) { return v === 'review' || v === 'shaky'; };
  var saved = store.get('notes:saved', []);

  function showToast(msg) {
    var t = $('study-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'study-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.hidden = true; }, 2200);
  }

  function copyText(txt, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { showToast(msg || 'Copied to clipboard'); }).catch(function () { fallbackCopy(txt, msg); });
    } else fallbackCopy(txt, msg);
  }
  function fallbackCopy(txt, msg) {
    var ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showToast(msg || 'Copied to clipboard'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // ---------- Reading Settings (Size, Paper Theme, Line Width, Solutions) ----------
  var pop = $('settings-pop'), sbtn = $('settings-btn');
  function mark(seg, attr, val) {
    var el = $(seg); if (!el) return;
    $$('button', el).forEach(function (b) { b.classList.toggle('on', b.getAttribute(attr) === val); });
  }
  function applyTheme(t) {
    store.setRaw('notes:theme', t);
    if (t) docEl.dataset.theme = t; else delete docEl.dataset.theme;
    paintSettings();
  }
  function paintSettings() {
    var curTheme = store.raw('notes:theme') || 'paper';
    mark('size-seg', 'data-size', store.raw('notes:size') || '18.5');
    mark('theme-seg', 'data-theme-set', curTheme);
    mark('width-seg', 'data-width', store.raw('notes:width') || '43rem');
    mark('sol-seg', 'data-sol', store.raw('notes:sol') || 'hide');
    $$('.zh-swatch').forEach(function (sw) { sw.classList.toggle('on', sw.dataset.t === curTheme); });
  }
  var initWidth = store.raw('notes:width');
  if (initWidth) docEl.style.setProperty('--read-width', initWidth);

  if (sbtn && pop) {
    sbtn.addEventListener('click', function (e) { e.stopPropagation(); pop.hidden = !pop.hidden; sbtn.setAttribute('aria-expanded', !pop.hidden); });
    pop.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.size) { store.setRaw('notes:size', b.dataset.size); docEl.style.setProperty('--read-size', b.dataset.size + 'px'); }
      if (b.hasAttribute('data-theme-set')) applyTheme(b.getAttribute('data-theme-set'));
      if (b.dataset.width) { store.setRaw('notes:width', b.dataset.width); docEl.style.setProperty('--read-width', b.dataset.width); }
      if (b.dataset.sol) { store.setRaw('notes:sol', b.dataset.sol); applySolutions(b.dataset.sol === 'show'); }
      paintSettings();
    });
  }
  paintSettings();

  // ---------- Export / Import Progress JSON ----------
  var expBtn = $('export-json-btn'), impBtn = $('import-json-btn'), impInput = $('import-json-input');
  if (expBtn) expBtn.addEventListener('click', function () {
    var payload = JSON.stringify({ done: done, probs: probs, due: due, saved: saved, notes: store.get('notes:scratch', {}) }, null, 2);
    var blob = new Blob([payload], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ma6101-study-backup.json';
    a.click();
    showToast('Exported study progress JSON');
  });
  if (impBtn && impInput) {
    impBtn.addEventListener('click', function () { impInput.click(); });
    impInput.addEventListener('change', function (ev) {
      var f = ev.target.files && ev.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (d.done) { done = d.done; store.set('notes:done', done); }
          if (d.probs) { probs = d.probs; store.set('notes:probs', probs); }
          if (d.due) { due = d.due; store.set('notes:due', due); }
          if (d.saved) { saved = d.saved; store.set('notes:saved', saved); }
          if (d.notes) { store.set('notes:scratch', d.notes); }
          paint(); showToast('Restored study progress');
        } catch (e) { showToast('Invalid backup JSON file'); }
      };
      r.readAsText(f);
    });
  }

  // ---------- Pomodoro Study Session Timer (25m / 5m) ----------
  var pomoEl = $('pomo'), pomoBtn = $('pomo-toggle'), pomoTxt = $('pomo-time'), pomoReset = $('pomo-reset');
  var zhPomoBtn = null, zhPomoTxt = null;
  var pState = store.get('notes:pomo', { rem: 1500, run: false, target: 0 });
  var fmtTime = function (sec) {
    var s = Math.max(0, Math.round(sec));
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  };
  var syncPomo = function () {
    if (pState.run) {
      var left = Math.round((pState.target - Date.now()) / 1000);
      if (left <= 0) {
        pState.run = false; pState.rem = 1500;
        store.set('notes:pomo', pState);
        showToast('25:00 study block complete — take a 5 min rest');
      } else pState.rem = left;
    }
    var txt = fmtTime(pState.rem);
    if (pomoEl) pomoEl.classList.toggle('running', !!pState.run);
    if (pomoTxt) pomoTxt.textContent = txt;
    if (zhPomoBtn) zhPomoBtn.classList.toggle('on', !!pState.run);
    if (zhPomoTxt) zhPomoTxt.textContent = txt;
  };
  var togglePomo = function () {
    if (pState.run) {
      pState.rem = Math.max(0, Math.round((pState.target - Date.now()) / 1000));
      pState.run = false;
    } else {
      if (pState.rem <= 0) pState.rem = 1500;
      pState.target = Date.now() + pState.rem * 1000;
      pState.run = true;
    }
    store.set('notes:pomo', pState);
    syncPomo();
  };
  if (pomoBtn) pomoBtn.addEventListener('click', togglePomo);
  if (pomoReset) pomoReset.addEventListener('click', function () {
    pState = { rem: 1500, run: false, target: 0 };
    store.set('notes:pomo', pState);
    syncPomo();
  });
  syncPomo();
  setInterval(syncPomo, 1000);

  // ---------- Margin Scratchpad & External Connectors Drawer ----------
  var scratchBtn = $('scratch-btn'), scratchDrawer = $('scratch-drawer'), scratchClose = $('scratch-close'), scratchArea = $('scratch-area');
  var allScratch = store.get('notes:scratch', {});
  var skey = pageId || 'global';
  function toggleScratch(open) {
    if (!scratchDrawer) return;
    var next = typeof open === 'boolean' ? open : !scratchDrawer.classList.contains('open');
    scratchDrawer.classList.toggle('open', next);
    if (scratchBtn) scratchBtn.classList.toggle('on', next);
    var zhSc = $('zh-scratch');
    if (zhSc) zhSc.classList.toggle('on', next);
    if (next && scratchArea) scratchArea.focus();
  }
  if (scratchDrawer && scratchArea) {
    scratchArea.value = allScratch[skey] || '';
    scratchArea.addEventListener('input', function () {
      allScratch[skey] = scratchArea.value;
      store.set('notes:scratch', allScratch);
      var zta = $('zoom-scratch-area');
      if (zta && zta !== document.activeElement) zta.value = scratchArea.value;
    });
    if (scratchBtn) scratchBtn.addEventListener('click', function () { toggleScratch(); });
    if (scratchClose) scratchClose.addEventListener('click', function () { toggleScratch(false); });
  }

  // ==========================================================================
  // 10x ZEN FOCUS MODE (Zero-Chrome Immersion, Native Fullscreen `f`,
  // Paragraph Spotlight `s` + `j`/`k` Typewriter Stepping, Auto-Hiding HUD,
  // and Equation/Proof Zoom Lightbox)
  // ==========================================================================
  var focusBtn = $('focus-btn'), zenHud = null, hudTimer = null;
  var spotBlocks = [], spotIdx = 0, spotHeads = [], spotProgUntil = 0, spotScrollTimer = null;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Spotlight units: each paragraph, equation, table, callout or solution is one
  // stop, and lists are split so every bullet is its own stop. Headings are not
  // stops (stepping onto a bare heading is a wasted keypress); the heading of
  // the current section stays half-lit instead, so you keep your bearings.
  function collectSpotBlocks() {
    var prose = document.querySelector('.note .prose');
    if (!prose) return [];
    var out = [];
    spotHeads = [];
    $$(':scope > *', prose).forEach(function (el) {
      if (el.offsetHeight === 0 || el.tagName === 'HR') return;
      if (/^H[1-6]$/.test(el.tagName)) { spotHeads.push(el); return; }
      if (el.tagName === 'UL' || el.tagName === 'OL') {
        $$(':scope > li', el).forEach(function (li) {
          if (li.offsetHeight > 0) { li.classList.add('spot-u'); out.push(li); }
        });
        return;
      }
      el.classList.add('spot-u');
      out.push(el);
    });
    return out;
  }

  function spotScrollTo(top) {
    spotProgUntil = Date.now() + (reduceMotion ? 150 : 900);
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function paintSpotCounter() {
    var zhSp = $('zh-spot');
    if (!zhSp) return;
    var on = document.body.classList.contains('is-spotlight') && spotBlocks.length;
    zhSp.innerHTML = 'Spotlight' + (on ? ' <span class="zh-count">' + (spotIdx + 1) + '/' + spotBlocks.length + '</span>' : '') + ' <kbd>s</kbd>';
  }

  function setSpotActive(idx, scrollLock) {
    if (!spotBlocks.length) spotBlocks = collectSpotBlocks();
    if (!spotBlocks.length) return;
    spotIdx = Math.max(0, Math.min(spotBlocks.length - 1, idx));
    var target = spotBlocks[spotIdx];
    $$('.spot-active, .spot-ctx').forEach(function (el) { el.classList.remove('spot-active', 'spot-ctx'); });
    target.classList.add('spot-active');
    // Half-light the heading this block sits under
    var head = null;
    for (var h = 0; h < spotHeads.length; h++) {
      if (spotHeads[h].compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) head = spotHeads[h];
      else break;
    }
    if (head) head.classList.add('spot-ctx');
    if (scrollLock !== false) {
      var rect = target.getBoundingClientRect();
      var vh = window.innerHeight;
      // Short blocks sit on the reading line; tall ones start near the top so
      // as much of them as possible is visible.
      var desiredTop = rect.height > vh * 0.55 ? vh * 0.12 : vh * 0.36;
      spotScrollTo(window.scrollY + rect.top - desiredTop);
    }
    paintSpotCounter();
  }

  // j / k: move one block, but read through a tall block (a long proof, an
  // open solution, a big table) a screen at a time before leaving it.
  function spotStep(dir) {
    if (!spotBlocks.length) spotBlocks = collectSpotBlocks();
    var cur = spotBlocks[spotIdx];
    if (cur) {
      var r = cur.getBoundingClientRect(), vh = window.innerHeight, pad = vh * 0.1;
      if (dir > 0 && r.height > vh * 0.55 && r.bottom > vh - pad + 12) {
        spotScrollTo(window.scrollY + Math.min(vh * 0.6, r.bottom - (vh - pad)));
        return;
      }
      if (dir < 0 && r.height > vh * 0.55 && r.top < pad - 12) {
        spotScrollTo(window.scrollY - Math.min(vh * 0.6, pad - r.top));
        return;
      }
    }
    setSpotActive(spotIdx + dir, true);
  }

  // The block under the reading line (36% down the screen), or the nearest one
  // if the line falls in a gap between blocks.
  function spotNearestLine() {
    var anchorY = window.innerHeight * 0.36, best = 0, bestDist = 1e9;
    for (var k = 0; k < spotBlocks.length; k++) {
      var r = spotBlocks[k].getBoundingClientRect();
      var d = r.top > anchorY ? r.top - anchorY : r.bottom < anchorY ? anchorY - r.bottom : 0;
      if (d < bestDist) { bestDist = d; best = k; }
      if (r.top > anchorY + bestDist) break;
    }
    return best;
  }

  function setSpotlight(on) {
    var isOn = !!on;
    document.body.classList.toggle('is-spotlight', isOn);
    store.setRaw('notes:spotlight', isOn ? '1' : '');
    var zhSp = $('zh-spot');
    if (zhSp) zhSp.classList.toggle('on', isOn);
    if (isOn) {
      spotBlocks = collectSpotBlocks();
      setSpotActive(spotNearestLine(), false);
    } else {
      $$('.spot-active, .spot-ctx').forEach(function (el) { el.classList.remove('spot-active', 'spot-ctx'); });
    }
    paintSpotCounter();
  }

  // When you scroll yourself (wheel, trackpad, scrollbar, touch), the spotlight
  // follows the reading line instead of leaving the whole page dimmed.
  addEventListener('scroll', function () {
    if (!document.body.classList.contains('is-spotlight') || Date.now() < spotProgUntil) return;
    clearTimeout(spotScrollTimer);
    spotScrollTimer = setTimeout(function () {
      if (Date.now() < spotProgUntil || !document.body.classList.contains('is-spotlight')) return;
      var cur = spotBlocks[spotIdx];
      if (cur) {
        var r = cur.getBoundingClientRect(), y = window.innerHeight * 0.36;
        if (r.top <= y && r.bottom >= y) return; // still on the reading line
      }
      setSpotActive(spotNearestLine(), false);
    }, 90);
  }, { passive: true });

  // Opening or closing a solution changes which blocks exist and their sizes
  document.addEventListener('toggle', function (ev) {
    if (!document.body.classList.contains('is-spotlight')) return;
    if (!ev.target.closest || !ev.target.closest('.note .prose')) return;
    var keep = spotBlocks[spotIdx];
    spotBlocks = collectSpotBlocks();
    var i = spotBlocks.indexOf(keep);
    if (i >= 0) { spotIdx = i; paintSpotCounter(); }
  }, true);

  function toggleNativeFullscreen() {
    if (!document.fullscreenElement) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(function () {
          showToast('Fullscreen blocked by browser environment');
        });
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(function () {});
    }
  }

  function syncFullscreenBtn() {
    var zhFs = $('zh-fs');
    if (!zhFs) return;
    var isFs = !!document.fullscreenElement;
    zhFs.classList.toggle('on', isFs);
    zhFs.innerHTML = (isFs ? 'Exit Fullscreen' : 'Fullscreen') + ' <kbd>f</kbd>';
  }
  document.addEventListener('fullscreenchange', syncFullscreenBtn);

  function pokeHud() {
    if (!zenHud || !document.body.classList.contains('is-focus')) return;
    zenHud.classList.add('visible');
    clearTimeout(hudTimer);
    hudTimer = setTimeout(function () {
      if (zenHud && !zenHud.matches(':hover')) zenHud.classList.remove('visible');
    }, 2800);
  }

  function buildZenHud() {
    if (zenHud) return zenHud;
    zenHud = document.createElement('div');
    zenHud.className = 'zen-hud visible';
    zenHud.id = 'zen-hud';
    zenHud.setAttribute('role', 'toolbar');
    zenHud.setAttribute('aria-label', 'Zen Focus Controls');
    var curTheme = store.raw('notes:theme') || 'paper';
    zenHud.innerHTML =
      '<div class="zh-sec"><span class="zh-pct" id="zh-pct">0%</span><span>·</span><span id="zh-sec-title">Reading</span></div>' +
      '<div class="zh-sep"></div>' +
      '<button type="button" class="zh-btn" id="zh-spot" title="Toggle Paragraph Spotlight &amp; Typewriter Stepping (s, then j/k)">Spotlight <kbd>s</kbd></button>' +
      '<button type="button" class="zh-btn" id="zh-fs" title="Toggle Native Browser Fullscreen (f)">Fullscreen <kbd>f</kbd></button>' +
      '<div class="zh-sep"></div>' +
      '<button type="button" class="zh-btn" id="zh-pomo" title="Start / Pause 25m Pomodoro Timer"><span class="pomo-dot"></span><span id="zh-pomo-time">25:00</span></button>' +
      '<button type="button" class="zh-btn" id="zh-scratch" title="Toggle Margin Scratchpad (m)">✎ Notes <kbd>m</kbd></button>' +
      '<div class="zh-sep"></div>' +
      '<div class="zh-themes" title="Switch Paper Surface">' +
        '<button type="button" class="zh-swatch" data-t="paper" title="Cream Paper"></button>' +
        '<button type="button" class="zh-swatch" data-t="light" title="Crisp White"></button>' +
        '<button type="button" class="zh-swatch" data-t="sepia" title="Warm Sepia"></button>' +
        '<button type="button" class="zh-swatch" data-t="dark" title="Night Charcoal"></button>' +
      '</div>' +
      '<div class="zh-sep"></div>' +
      '<button type="button" class="zh-btn" id="zh-exit" title="Exit Zen Mode (z or Esc)">Exit <kbd>z</kbd></button>';
    document.body.appendChild(zenHud);

    zhPomoBtn = $('zh-pomo');
    zhPomoTxt = $('zh-pomo-time');
    syncPomo();
    paintSettings();

    $('zh-spot').addEventListener('click', function () {
      setSpotlight(!document.body.classList.contains('is-spotlight'));
      pokeHud();
    });
    $('zh-fs').addEventListener('click', function () {
      toggleNativeFullscreen();
      pokeHud();
    });
    $('zh-pomo').addEventListener('click', function () {
      togglePomo();
      pokeHud();
    });
    $('zh-scratch').addEventListener('click', function () {
      toggleScratch();
      pokeHud();
    });
    $('zh-exit').addEventListener('click', function () {
      setFocus(false);
    });
    $$('.zh-swatch', zenHud).forEach(function (sw) {
      sw.addEventListener('click', function () {
        applyTheme(sw.dataset.t);
        pokeHud();
      });
    });
    return zenHud;
  }

  function setFocus(on) {
    var isOn = !!on;
    if (isOn) buildZenHud();
    document.body.classList.toggle('is-focus', isOn);
    store.setRaw('notes:focus', isOn ? '1' : '');
    if (focusBtn) {
      focusBtn.classList.toggle('on', isOn);
      focusBtn.textContent = isOn ? 'Exit Zen (z)' : 'Zen mode (z)';
    }
    if (isOn) {
      if (store.raw('notes:spotlight') === '1') setSpotlight(true);
      onScroll();
      pokeHud();
    } else {
      document.body.classList.remove('is-spotlight');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
    }
  }

  // Click any paragraph in Spotlight mode to focus it directly
  var mainProse = document.querySelector('.note .prose');
  if (mainProse) {
    mainProse.addEventListener('click', function (ev) {
      if (!document.body.classList.contains('is-spotlight')) return;
      if (ev.target.closest('a, button, summary, input, textarea')) return;
      if (!spotBlocks.length) spotBlocks = collectSpotBlocks();
      var block = ev.target.closest('.spot-u');
      if (!block) return;
      var idx = spotBlocks.indexOf(block);
      if (idx >= 0) setSpotActive(idx, true);
    });
  }

  // Show HUD when mouse moves near top/bottom edge or on mouse activity in Zen Mode
  addEventListener('mousemove', function (ev) {
    if (!document.body.classList.contains('is-focus')) return;
    if (ev.clientY > window.innerHeight - 90 || ev.clientY < 60) {
      if (zenHud) zenHud.classList.add('visible');
      clearTimeout(hudTimer);
    } else {
      pokeHud();
    }
  }, { passive: true });

  // ---------- Equation & Proof Lightbox ("Chalkboard Zoom") ----------
  var zoomModal = null;
  function openZoomLightbox(targetEl) {
    if (!zoomModal) {
      zoomModal = document.createElement('div');
      zoomModal.className = 'zoom-modal';
      zoomModal.id = 'zoom-modal';
      zoomModal.hidden = true;
      zoomModal.innerHTML =
        '<div class="zoom-dialog" role="dialog" aria-modal="true" aria-label="Equation &amp; Proof Inspector">' +
          '<div class="zoom-head">' +
            '<b id="zoom-title">Equation &amp; Derivation Inspector</b>' +
            '<div class="zoom-actions">' +
              '<button type="button" class="btn small" id="zoom-copy-tex">Copy LaTeX</button>' +
              '<button type="button" class="btn small" id="zoom-close">Close (Esc)</button>' +
            '</div>' +
          '</div>' +
          '<div class="zoom-stage" id="zoom-stage"></div>' +
          '<div class="zoom-scratch">' +
            '<label for="zoom-scratch-area"><span>Step-by-step algebra &amp; proof scratchpad</span><span>Synced with page notes</span></label>' +
            '<textarea id="zoom-scratch-area" placeholder="Work through the steps, check dimensions, or write intermediate algebra here…"></textarea>' +
          '</div>' +
        '</div>';
      document.body.appendChild(zoomModal);

      zoomModal.addEventListener('click', function (ev) {
        if (ev.target === zoomModal) zoomModal.hidden = true;
      });
      $('zoom-close').addEventListener('click', function () { zoomModal.hidden = true; });
      $('zoom-scratch-area').addEventListener('input', function (ev) {
        allScratch[skey] = ev.target.value;
        store.set('notes:scratch', allScratch);
        if (scratchArea) scratchArea.value = ev.target.value;
      });
    }
    var stage = $('zoom-stage');
    stage.innerHTML = '';
    var clone = targetEl.cloneNode(true);
    if (clone.tagName === 'DETAILS') clone.open = true;
    stage.appendChild(clone);

    var tex = targetEl.dataset.tex || (targetEl.querySelector('[data-tex]') ? targetEl.querySelector('[data-tex]').dataset.tex : '') || targetEl.textContent.trim();
    var copyBtn = $('zoom-copy-tex');
    copyBtn.onclick = function () { copyText(tex, 'Copied expression to clipboard'); };

    var zta = $('zoom-scratch-area');
    zta.value = allScratch[skey] || '';
    zoomModal.hidden = false;
  }

  // Double-click any display math, slide/theorem blockquote, or solution block to open Zoom Lightbox
  if (mainProse) {
    mainProse.addEventListener('dblclick', function (ev) {
      var target = ev.target.closest('div.math-d, blockquote, details.sol');
      if (!target) return;
      ev.preventDefault();
      openZoomLightbox(target);
    });
  }

  // ---------- Solutions & Copy LaTeX / Zoom Buttons ----------
  var solToggle = $('sol-toggle');
  function applySolutions(open) {
    $$('.prose details.sol').forEach(function (d) { d.open = open; });
    if (solToggle) solToggle.textContent = open ? 'Hide all solutions' : 'Show all solutions';
  }
  if (store.raw('notes:sol') === 'show') applySolutions(true);
  if (solToggle) solToggle.addEventListener('click', function () {
    applySolutions(!$$('.prose details.sol').every(function (d) { return d.open; }));
  });

  $$('.prose div.math-d, .f-card').forEach(function (el) {
    var tex = el.dataset.tex || (el.querySelector('.katex') ? el.querySelector('.katex').textContent.trim() : '');
    if (!tex) return;
    if (el.closest('.prose')) {
      var zbtn = document.createElement('button');
      zbtn.type = 'button';
      zbtn.className = 'zoom-trigger-btn';
      zbtn.textContent = 'Zoom';
      zbtn.title = 'Inspect in full-viewport chalkboard modal (or double-click)';
      zbtn.addEventListener('click', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        openZoomLightbox(el);
      });
      el.appendChild(zbtn);
    }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-tex-btn';
    btn.textContent = el.dataset.tex ? 'Copy TeX' : 'Copy';
    btn.addEventListener('click', function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      copyText(tex, el.dataset.tex ? 'Copied LaTeX formula' : 'Copied formula expression');
    });
    el.appendChild(btn);
  });

  function revealHash() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var d = el && el.closest('details.sol');
    if (d) { d.open = true; el.scrollIntoView(); }
  }
  addEventListener('hashchange', revealHash); revealHash();
  // web fonts and math load after the browser's first jump to #anchor and push it off screen; jump again once they are in
  if (location.hash) {
    var rejump = function () {
      var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el && Math.abs(el.getBoundingClientRect().top - 90) > 60) el.scrollIntoView();
    };
    var userMoved = false;
    addEventListener('wheel', function () { userMoved = true; }, { once: true, passive: true });
    addEventListener('touchmove', function () { userMoved = true; }, { once: true, passive: true });
    var later = function () { if (!userMoved) rejump(); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
    addEventListener('load', later);
  }

  // ---------- Mobile Navigation ----------
  var side = $('side'), scrim = $('scrim'), menu = $('menu-btn');
  function setNav(open) { side.classList.toggle('open', open); scrim.hidden = !open; menu.setAttribute('aria-expanded', open); }
  if (menu) menu.addEventListener('click', function () { setNav(!side.classList.contains('open')); });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  var cur = side && side.querySelector('.current');
  if (cur) side.scrollTop = Math.max(0, cur.offsetTop - side.clientHeight / 3);

  // ---------- Progress Tracking ----------
  function countDone(prefix) { var n = 0; for (var k in done) if (done[k] && k.indexOf(prefix) === 0) n++; return n; }
  function paint() {
    $$('[data-id]').forEach(function (a) { a.classList.toggle('done', !!done[a.dataset.id]); });
    $$('[data-bar-for]').forEach(function (el) { el.style.width = Math.round(100 * countDone(el.dataset.barFor) / (+el.dataset.total || 1)) + '%'; });
    $$('[data-count-text]').forEach(function (el) {
      var n = countDone(el.dataset.countText), t = +el.dataset.total;
      el.textContent = el.dataset.short ? (n ? n + ' / ' + t + ' done' : '') : n + ' of ' + t + ' chapters read';
    });
    $$('[data-count-for]').forEach(function (el) { var n = countDone(el.dataset.countFor); el.textContent = n ? n + '/' + el.dataset.total : ''; });
    var b = $('done-btn');
    if (b) { var on = !!done[pageId]; b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ Completed chapter' : 'Mark chapter as read'; }
  }
  var doneBtn = $('done-btn');
  if (doneBtn) doneBtn.addEventListener('click', function () {
    if (done[pageId]) delete done[pageId]; else done[pageId] = 1;
    store.set('notes:done', done); paint();
  });
  paint();
  if (pageId) store.set('notes:last', { id: pageId, y: 0 });

  // ---------- Reading Bar, Back to Top, Outline Scroll Spy & Zen HUD Readout ----------
  var bar = $('read-bar'), toTop = $('to-top'), tick = false;
  var links = $$('.outline a');
  var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });
  function spy() {
    if (!links.length) return;
    var i = 0;
    for (var j = 0; j < heads.length; j++) if (heads[j] && heads[j].getBoundingClientRect().top < 125) i = j;
    links.forEach(function (a, k) { a.classList.toggle('on', k === i); });
    var on = links[i], box = on.closest('.outline');
    if (box && (on.offsetTop < box.scrollTop || on.offsetTop > box.scrollTop + box.clientHeight - 60)) box.scrollTop = on.offsetTop - box.clientHeight / 2;
    var zhSec = $('zh-sec-title');
    if (zhSec && on) zhSec.textContent = on.textContent;
  }
  function onScroll() {
    tick = false;
    var h = docEl.scrollHeight - innerHeight, y = scrollY;
    var ratio = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0;
    if (pageId && bar) bar.style.transform = 'scaleX(' + ratio + ')';
    var zhPct = $('zh-pct');
    if (zhPct) zhPct.textContent = Math.round(ratio * 100) + '%';
    if (toTop) toTop.hidden = y < 700;
    spy();
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if (toTop) toTop.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });

  if (store.raw('notes:focus') === '1') setFocus(true);
  if (focusBtn) focusBtn.addEventListener('click', function () {
    setFocus(!document.body.classList.contains('is-focus'));
  });
  onScroll();

  // ---------- Saved Sections ----------
  function isSaved(u) { return saved.some(function (s) { return s.u === u; }); }
  if (pageId) {
    var chTitle = (document.querySelector('.note-head h1') || {}).textContent || '';
    $$('.prose h2[id], .prose h3[id]').forEach(function (h) {
      var u = pageId + '.html#' + h.id, b = document.createElement('button');
      var title = h.textContent;
      b.className = 'save-btn'; b.type = 'button';
      var set = function () { var on = isSaved(u); b.textContent = on ? '★' : '☆'; b.classList.toggle('on', on); b.setAttribute('aria-label', on ? 'Remove from saved' : 'Bookmark section'); b.title = on ? 'Bookmarked' : 'Bookmark section'; };
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (isSaved(u)) saved = saved.filter(function (s) { return s.u !== u; });
        else saved.unshift({ u: u, t: title, c: chTitle });
        store.set('notes:saved', saved); set();
      });
      set(); h.appendChild(b);
    });
  }

  // ---------- Mastery bars and weak-spots box (course pages) ----------
  (function () {
    var ms = $$('[data-mastery]'); if (!ms.length) return;
    var weak = [];
    ms.forEach(function (el) {
      var pre = el.dataset.mastery, n = +el.dataset.n || 1, s = 0, r = 0;
      for (var k in probs) if (k.indexOf(pre) === 0) { if (probs[k] === 'done') s++; else if (isRetry(probs[k])) r++; }
      el.querySelector('.m-solved').style.width = (100 * s / n) + '%';
      el.querySelector('.m-review').style.width = (100 * r / n) + '%';
      el.querySelector('.m-label').textContent = s + ' / ' + n + ' got it' + (r ? ' · ' + r + ' to retry' : '');
      var lk = el.querySelector('.m-link');
      if (r) { lk.hidden = false; lk.textContent = 'Retry ' + r + ' →'; weak.push({ r: r, s: s, n: n, doc: el.dataset.doc, title: (el.closest('.doc-block').querySelector('h2') || {}).textContent || '' }); }
    });
    var box = $('weak-box'); if (!box) return;
    if (!weak.length) { box.hidden = true; return; }
    weak.sort(function (x, y) { return y.r - x.r; });
    var tot = weak.reduce(function (t, w) { return t + w.r; }, 0);
    box.innerHTML = '<h2>Weak spots</h2><p>' + tot + ' problems rated shaky or wrong. Most in:</p><ul>' + weak.slice(0, 5).map(function (w) {
      return '<li><a href="practice.html#review&doc=' + esc(w.doc) + '"><b>' + esc(w.title) + '</b><span>' + w.r + ' to retry · ' + w.s + ' / ' + w.n + ' got it</span></a></li>';
    }).join('') + '</ul><a class="btn small" href="practice.html#review">Retry all ' + tot + ' →</a>';
    box.hidden = false;
  })();

  // ---------- Home Dashboard & Interactive Normal Tail Calculator ----------
  if (document.body.classList.contains('is-home')) {
    loadScript('meta.js').then(function () {
      var m = window.NOTES_META; if (!m) return;
      var total = 0, nd = 0;
      m.courses.forEach(function (c) { total += c.nChapters; nd += countDone(c.slug + '/'); });
      var np = 0, nr = 0; for (var k in probs) { if (probs[k] === 'done') np++; else if (isRetry(probs[k])) nr++; }
      if ($('st-ch')) $('st-ch').textContent = nd + ' / ' + total;
      if ($('st-pr')) $('st-pr').textContent = np + ' / ' + ($('st-pr').dataset.total || '');
      if ($('st-rv')) $('st-rv').textContent = nr;
      if ($('st-sv')) $('st-sv').textContent = saved.length;
      var last = store.get('notes:last', null), id = last && (last.id || last);
      if (id && m.titles[id] && $('resume-btn')) {
        var rb = $('resume-btn'); rb.href = id + '.html';
        rb.innerHTML = 'Continue: ' + esc(m.titles[id].length > 42 ? m.titles[id].slice(0, 40) + '…' : m.titles[id]);
      }
      if (saved.length && $('saved-box')) $('saved-box').innerHTML = '<h2 class="sec-title">Bookmarked Sections</h2><div class="saved-list">' + saved.slice(0, 30).map(function (s) {
        return '<a href="' + esc(s.u) + '"><b>★ ' + esc(s.t.replace(/[★☆]/g, '')) + '</b><span>' + esc(s.c) + '</span></a>';
      }).join('') + '</div>';
    }).catch(function () {});
  }

  // ---------- Interactive normal tail table (on course pages that include it) ----------
  {
    var zSlider = $('z-slider'), zVal = $('z-val'), zReadout = $('z-readout'), tailPoly = $('bell-tail-poly'), cutLine = $('bell-cut-line');
    if (zSlider && tailPoly && cutLine) {
      var normCdf = function (x) {
        var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        var sign = x < 0 ? -1 : 1;
        var ax = Math.abs(x) / Math.sqrt(2);
        var t = 1.0 / (1.0 + p * ax);
        var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
        return 0.5 * (1.0 + sign * y);
      };
      var W = 320, H = 96;
      var f = function (x) { return Math.exp(-x * x / 2); };
      var X = function (x) { return ((x + 3.4) / 6.8) * W; };
      var Y = function (y) { return H - 10 - y * (H - 22); };
      var updateZ = function (z) {
        z = Math.max(-3.0, Math.min(3.0, parseFloat(z) || 0));
        zSlider.value = z;
        if (zVal) zVal.textContent = (z >= 0 ? '+' : '') + z.toFixed(2);
        var phi = normCdf(z), q = 1 - phi;
        if (zReadout) zReadout.textContent = 'Φ(' + z.toFixed(2) + ') = ' + phi.toFixed(4) + '  ·  P(Z ≥ ' + z.toFixed(2) + ') = ' + q.toFixed(4);
        var pts = [X(z).toFixed(1) + ',' + Y(0)];
        for (var x = z; x <= 3.401; x += 0.08) pts.push(X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1));
        pts.push(X(3.4).toFixed(1) + ',' + Y(0));
        tailPoly.setAttribute('points', pts.join(' '));
        cutLine.setAttribute('x1', X(z).toFixed(1));
        cutLine.setAttribute('x2', X(z).toFixed(1));
        cutLine.setAttribute('y1', Y(f(z)).toFixed(1));
        cutLine.setAttribute('y2', Y(0));
      };
      zSlider.addEventListener('input', function () { updateZ(zSlider.value); });
      $$('[data-z-set]').forEach(function (b) {
        b.addEventListener('click', function () { updateZ(b.dataset.zSet); });
      });
      updateZ(1.20);
    }
  }

  // ---------- Formula Filter & Anki TSV Export ----------
  var ff = $('formula-filter'), ankiFormBtn = $('export-anki-formulas');
  if (ff) ff.addEventListener('input', function () {
    var q = ff.value.trim().toLowerCase();
    $$('.f-group').forEach(function (g) {
      var any = false;
      $$('.f-card', g).forEach(function (c) { var ok = !q || c.dataset.text.indexOf(q) >= 0; c.hidden = !ok; any = any || ok; });
      g.hidden = !any;
    });
  });
  if (ankiFormBtn) ankiFormBtn.addEventListener('click', function () {
    var rows = [];
    $$('.f-card').forEach(function (c) {
      var prompt = (c.querySelector('span') || {}).textContent || 'Formula';
      var tex = c.dataset.tex || (c.querySelector('.math-d') || {}).textContent || '';
      rows.push(prompt.replace(/\t|\n/g, ' ').trim() + '\t$$' + tex.replace(/\t|\n/g, ' ').trim() + '$$\tMA6101::Formulas');
    });
    var blob = new Blob([rows.join('\n')], { type: 'text/tab-separated-values;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'MA6101_Formulas_Anki.tsv';
    a.click();
    showToast('Exported 123 formulas as Anki TSV deck');
  });

  // ---------- Practice Bank (attempt, reveal, rate, retry; list and deck modes; Anki export) ----------
  var plist = $('p-list');
  if (plist) {
    var DAY = 864e5;
    var pBox = document.querySelector('.practice');
    var topics = pBox && pBox.dataset.topics ? JSON.parse(pBox.dataset.topics) : [];
    var focus = pBox && pBox.dataset.focus ? JSON.parse(pBox.dataset.focus) : [];
    var state = { q: '', doc: '', status: '', topic: '', lec: '', diff: '', pri: '', tags: {}, shown: 15, only: null, mode: 'list', deckIdx: 0 };
    var statusOf = function (p) { return probs[p.id] || 'todo'; };
    var isDue = function (p) { return isRetry(probs[p.id]) && (due[p.id] || 0) <= Date.now(); };
    var RATE = { done: '✓ Got it', shaky: '~ Shaky', review: '✗ Wrong' };
    var DIFF = { E: 'Easy', M: 'Medium', H: 'Hard' };
    var stars = function (n) { return n === 3 ? '★★★' : n === 2 ? '★★' : '★'; };
    var whenText = function (id) {
      var t = due[id] || 0, d = Math.ceil((t - Date.now()) / DAY);
      return d <= 0 ? 'due now' : d === 1 ? 'back tomorrow' : 'back in ' + d + ' days';
    };
    var footer = function (p) {
      var st = statusOf(p), rated = st !== 'todo';
      var h = '<div class="rate-row"><span class="rate-hint">' + (rated ? 'Your rating' : 'How did it go?') + '</span>' +
        ['done', 'shaky', 'review'].map(function (v, i) {
          return '<button type="button" data-set="' + v + '" class="' + (st === v ? 'on' : '') + '">' + RATE[v] + ' <kbd>' + (i + 1) + '</kbd></button>';
        }).join('') + '</div>';
      if (isRetry(st)) {
        var t = due[p.id] || 0, d = Math.max(0, Math.round((t - Date.now()) / DAY));
        h += '<div class="retry-row"><span class="rate-hint">Retry list: ' + whenText(p.id) + '</span>' +
          [[0, 'Now'], [2, 'In 2 days'], [7, 'In a week']].map(function (o) {
            var on = o[0] === 0 ? t <= Date.now() : d === o[0];
            return '<button type="button" data-when="' + o[0] + '" class="' + (on ? 'on' : '') + '">' + o[1] + '</button>';
          }).join('') + '</div>';
      }
      return h;
    };
    var card = function (p) {
      var st = statusOf(p), rated = st !== 'todo';
      var meta = (p.tp || []).map(function (t) { return '<i class="topic' + (focus.indexOf(t) >= 0 ? ' focus' : '') + '">' + esc(t) + '</i>'; }).join('') +
        (p.lec ? '<i>' + esc(p.lec) + '</i>' : '') +
        (p.df ? '<i class="diff d-' + p.df + '">' + DIFF[p.df] + '</i>' : (p.hard ? '<i class="hard">Hard</i>' : '')) +
        (p.pr ? '<i class="pri" title="Exam priority">' + stars(p.pr) + '</i>' : '') +
        p.tags.filter(function (t) { return t !== 'Other'; }).map(function (t) { return '<i class="src">' + esc(t) + '</i>'; }).join('');
      return '<article class="p-card st-' + st + (rated ? ' revealed' : '') + '" data-pid="' + esc(p.id) + '">' +
        '<header><span class="p-tags">' + meta + '</span><a href="' + root + esc(p.u) + '">' + esc(p.c) + ' →</a></header>' +
        '<div class="prose p-q">' + p.q + '</div>' +
        '<details class="sol"><summary><span>Solution</span></summary><div class="prose">' + p.a + '</div></details>' +
        '<footer>' + footer(p) + '</footer></article>';
    };
    var match = function (p, skip) {
      var tags = Object.keys(state.tags).filter(function (t) { return state.tags[t]; });
      if (state.doc && p.d !== state.doc) return false;
      if (skip !== 'topic' && state.topic && (p.tp || []).indexOf(state.topic) < 0) return false;
      if (state.lec && p.lec !== state.lec) return false;
      if (state.diff && p.df !== state.diff) return false;
      if (state.pri && (p.pr || 0) < +state.pri) return false;
      if (skip !== 'status' && state.status) {
        var st = statusOf(p);
        if (state.status === 'due' ? !isDue(p) : state.status === 'retry' ? !isRetry(st) : st !== state.status) return false;
      }
      if (tags.length && !p.tags.some(function (t) { return state.tags[t]; })) return false;
      var q = state.q.trim().toLowerCase();
      if (q) {
        var hay = ((p.l || '') + ' ' + (p.s || '') + ' ' + (p.c || '') + ' ' + (p.tp || []).join(' ') + ' ' + (p.q || '')).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    };
    var getFiltered = function () {
      var all = window.NOTES_PROBLEMS || [];
      if (state.only) return all.filter(function (p) { return p.id === state.only; });
      var list = all.filter(function (p) { return match(p); });
      if (state.status === 'due') list.sort(function (a, b) { return (statusOf(b) === 'review') - (statusOf(a) === 'review') || (due[a.id] || 0) - (due[b.id] || 0); });
      return list;
    };

    var paintRetryBar = function () {
      var bar = $('retry-bar'); if (!bar) return;
      var all = window.NOTES_PROBLEMS || [];
      var nDue = all.filter(isDue).length, nAll = all.filter(function (p) { return isRetry(statusOf(p)); }).length;
      if (!nAll) { bar.hidden = true; return; }
      bar.hidden = false;
      bar.innerHTML = '<div><b>Retry list</b><span>' + nDue + ' due now' + (nAll > nDue ? ' · ' + (nAll - nDue) + ' scheduled later' : '') + '</span></div>' +
        (nDue ? '<button type="button" class="btn primary small" id="retry-go">Retry ' + nDue + ' now →</button>' : '<span class="rate-hint">Nothing due. Come back later.</span>');
      var go = $('retry-go');
      if (go) go.addEventListener('click', function () { setFilter('status', 'due'); scrollTo({ top: $('p-count').offsetTop - 90, behavior: 'smooth' }); });
    };
    var paintTopics = function () {
      var box = $('topic-rows'); if (!box) return;
      var all = window.NOTES_PROBLEMS || [];
      var rows = topics.map(function (t) {
        var ps = all.filter(function (p) { return (p.tp || []).indexOf(t) >= 0; });
        var n = ps.length, g = 0, s = 0, w = 0;
        ps.forEach(function (p) { var v = statusOf(p); if (v === 'done') g++; else if (v === 'shaky') s++; else if (v === 'review') w++; });
        return { t: t, n: n, g: g, s: s, w: w, f: focus.indexOf(t) >= 0 };
      }).filter(function (r) { return r.n; });
      rows.sort(function (a, b) { return (b.f - a.f) || (topics.indexOf(a.t) - topics.indexOf(b.t)); });
      var nAllRows = rows.length;
      if (!state.allTopics) rows = rows.filter(function (r) { return r.f || r.g + r.s + r.w || r.t === state.topic; });
      box.innerHTML = rows.map(function (r) {
        var pc = function (x) { return (100 * x / r.n).toFixed(1) + '%'; };
        return '<button type="button" class="t-row' + (state.topic === r.t ? ' on' : '') + (r.f ? ' focus' : '') + '" data-topic="' + esc(r.t) + '">' +
          '<span class="t-name">' + (r.f ? '★ ' : '') + esc(r.t) + '</span>' +
          '<span class="t-bar"><i class="g" style="width:' + pc(r.g) + '"></i><i class="s" style="width:' + pc(r.s) + '"></i><i class="w" style="width:' + pc(r.w) + '"></i></span>' +
          '<span class="t-num">' + r.g + '/' + r.n + ' got it' + (r.s + r.w ? ' · <b>' + (r.s + r.w) + ' to retry</b>' : '') + '</span></button>';
      }).join('') + (nAllRows > rows.length || state.allTopics ? '<button type="button" class="linkish t-more" id="t-more">' + (state.allTopics ? 'Show fewer topics' : 'Show all ' + nAllRows + ' topics') + '</button>' : '') + '<p class="t-legend"><i class="g"></i> Got it <i class="s"></i> Shaky <i class="w"></i> Wrong · ★ = your endsem focus topics. Click a topic to practise it.</p>';
    };

    var render = function () {
      var all = window.NOTES_PROBLEMS || [], list = getFiltered();
      var got = all.filter(function (p) { return statusOf(p) === 'done'; }).length;
      $('p-count').innerHTML = state.only
        ? 'Random pick · <button type="button" class="linkish" id="p-all">Back to all ' + all.length + ' problems</button>'
        : list.length + ' matching problems · ' + got + ' of ' + all.length + ' got it';
      paintRetryBar(); paintTopics();
      if (!list.length) {
        plist.innerHTML = '<p class="search-empty">' + (state.status === 'due' ? 'Nothing is due for retry right now.' : 'No problems match these filters.') + '</p>';
        $('p-more').hidden = true;
        return list;
      }
      if (state.mode === 'deck') {
        if (state.deckIdx >= list.length) state.deckIdx = 0;
        if (state.deckIdx < 0) state.deckIdx = list.length - 1;
        plist.innerHTML =
          '<div class="deck-nav">' +
            '<span>Card <b>' + (state.deckIdx + 1) + '</b> of <b>' + list.length + '</b> · <kbd>Space</kbd> reveal, <kbd>1</kbd> got it, <kbd>2</kbd> shaky, <kbd>3</kbd> wrong, <kbd>←/→</kbd> move</span>' +
            '<div class="deck-nav-btns"><button type="button" class="btn small" id="deck-prev">← Prev</button><button type="button" class="btn small" id="deck-next">Next →</button></div>' +
          '</div>' + card(list[state.deckIdx]);
        $('p-more').hidden = true;
        $('deck-prev').addEventListener('click', function () { state.deckIdx--; render(); });
        $('deck-next').addEventListener('click', function () { state.deckIdx++; render(); });
      } else {
        plist.innerHTML = list.slice(0, state.shown).map(card).join('');
        $('p-more').hidden = list.length <= state.shown;
        $('p-more').textContent = 'Show more (' + Math.max(0, list.length - state.shown) + ' left)';
      }
      var back = $('p-all'); if (back) back.addEventListener('click', function () { state.only = null; render(); });
      return list;
    };
    var reset = function () { state.shown = 15; state.only = null; state.deckIdx = 0; };
    var setFilter = function (k, v) {
      state[k] = v; reset();
      var el = $({ status: 'f-status', topic: 'f-topic', lec: 'f-lec', diff: 'f-diff', pri: 'f-pri', doc: 'f-doc' }[k]);
      if (el) el.value = v;
      render();
    };

    var random = function () {
      var all = window.NOTES_PROBLEMS || [];
      var pool = all.filter(function (p) { return match(p) && statusOf(p) !== 'done'; });
      if (!pool.length) pool = all.filter(function (p) { return match(p); });
      if (!pool.length) pool = all;
      if (!pool.length) return;
      state.only = pool[Math.floor(Math.random() * pool.length)].id; render(); scrollTo({ top: 0 });
    };

    var refreshCard = function (c) {
      var p = (window.NOTES_PROBLEMS || []).filter(function (x) { return x.id === c.dataset.pid; })[0]; if (!p) return;
      var st = statusOf(p);
      c.className = 'p-card st-' + st + ' revealed';
      c.querySelector('footer').innerHTML = footer(p);
      paintRetryBar(); paintTopics();
    };
    var rate = function (c, v) {
      var id = c.dataset.pid;
      if (probs[id] === v) { delete probs[id]; delete due[id]; }
      else {
        probs[id] = v;
        if (v === 'done') delete due[id];
        else due[id] = Date.now() + (v === 'shaky' ? 2 * DAY : 0);
      }
      store.set('notes:probs', probs); store.set('notes:due', due);
      refreshCard(c);
      if (v === 'done' && state.status === 'due') showToast('Nice. Off the retry list.');
    };
    plist.addEventListener('click', function (e) {
      var c = e.target.closest('.p-card'); if (!c) return;
      var b = e.target.closest('button[data-set]');
      if (b) return rate(c, b.dataset.set);
      var w = e.target.closest('button[data-when]');
      if (w) { due[c.dataset.pid] = Date.now() + (+w.dataset.when) * DAY; store.set('notes:due', due); refreshCard(c); }
    });
    plist.addEventListener('toggle', function (e) {
      if (e.target.matches && e.target.matches('details.sol') && e.target.open) e.target.closest('.p-card').classList.add('revealed');
    }, true);

    var bindSel = function (id, k) { var el = $(id); if (el) el.addEventListener('change', function (e) { setFilter(k, e.target.value); }); };
    bindSel('f-doc', 'doc'); bindSel('f-status', 'status'); bindSel('f-topic', 'topic'); bindSel('f-lec', 'lec'); bindSel('f-diff', 'diff'); bindSel('f-pri', 'pri');
    if ($('f-q')) $('f-q').addEventListener('input', function (e) { state.q = e.target.value; reset(); render(); });
    $('f-tags').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      state.tags[b.dataset.tag] = !state.tags[b.dataset.tag]; b.classList.toggle('on', state.tags[b.dataset.tag]);
      reset(); render();
    });
    var tr = $('topic-rows');
    if (tr) tr.addEventListener('click', function (e) {
      if (e.target.closest('#t-more')) { state.allTopics = !state.allTopics; paintTopics(); return; }
      var b = e.target.closest('.t-row'); if (!b) return;
      setFilter('topic', state.topic === b.dataset.topic ? '' : b.dataset.topic);
    });
    $('p-more').addEventListener('click', function () { state.shown += 15; render(); });
    $('f-random').addEventListener('click', random);

    var modeBox = $('mode-switch');
    if (modeBox) modeBox.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-mode]'); if (!b) return;
      state.mode = b.dataset.mode;
      $$('button', modeBox).forEach(function (x) { x.classList.toggle('on', x.dataset.mode === state.mode); });
      render();
    });

    var ankiProbBtn = $('export-anki-probs');
    if (ankiProbBtn) ankiProbBtn.addEventListener('click', function () {
      var list = getFiltered();
      var rows = list.map(function (p) {
        var qTxt = p.q.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        var aTxt = p.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        var tag = ((p.tp && p.tp[0]) || p.tags[0] || 'Practice').replace(/[^\w-]+/g, '_');
        return '[' + p.c + '] ' + qTxt + '\t' + aTxt + '\tMA6101::' + tag;
      });
      var blob = new Blob([rows.join('\n')], { type: 'text/tab-separated-values;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'MA6101_Practice_Anki.tsv';
      a.click();
      showToast('Exported ' + list.length + ' problems as Anki TSV deck');
    });

    document.addEventListener('keydown', function (ev) {
      if (state.mode !== 'deck') return;
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      var cardEl = plist.querySelector('.p-card'); if (!cardEl) return;
      if (ev.key === ' ') {
        ev.preventDefault();
        var det = cardEl.querySelector('details.sol');
        if (det) det.open = !det.open;
      } else if (ev.key === 'ArrowRight') { state.deckIdx++; render(); }
      else if (ev.key === 'ArrowLeft') { state.deckIdx--; render(); }
      else if (ev.key === '1' || ev.key === '2' || ev.key === '3') {
        if (!cardEl.classList.contains('revealed')) { showToast('Reveal the solution first (Space)'); return; }
        rate(cardEl, ['done', 'shaky', 'review'][+ev.key - 1]);
      }
    });

    var applyHash = function () {
      var h = location.hash.slice(1).split('&'), got = false;
      h.forEach(function (x) {
        if (x === 'review' || x === 'retry') { state.status = 'retry'; got = true; }
        else if (x === 'due') { state.status = 'due'; got = true; }
        else if (x.indexOf('doc=') === 0) { state.doc = x.slice(4); got = true; }
        else if (x.indexOf('topic=') === 0) { state.topic = decodeURIComponent(x.slice(6)); got = true; }
      });
      ['f-status', 'f-doc', 'f-topic'].forEach(function (id, i) { var el = $(id); if (el) el.value = state[['status', 'doc', 'topic'][i]]; });
      if (got) reset();
      return got;
    };
    var start = function () { if (location.hash === '#random') random(); else { applyHash(); render(); } };
    if (window.NOTES_PROBLEMS) start(); else addEventListener('load', start);
    addEventListener('hashchange', function () { if (!window.NOTES_PROBLEMS) return; if (location.hash === '#random') random(); else { applyHash(); render(); } });
  }

  // ---------- Search ----------
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

  // Global Keyboard Shortcuts (Zen `z`, Native Fullscreen `f`, Spotlight `s`, Step `j`/`k`, Scratchpad `m`)
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      if (zoomModal && !zoomModal.hidden) { zoomModal.hidden = true; return; }
      if (scratchDrawer && scratchDrawer.classList.contains('open')) { toggleScratch(false); return; }
      if (document.body.classList.contains('is-focus')) { setFocus(false); return; }
    }
    var typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((ev.key === '/' && !typing) || (ev.key === 'k' && (ev.ctrlKey || ev.metaKey))) {
      if (document.body.classList.contains('is-focus')) setFocus(false);
      ev.preventDefault(); if (input) { input.focus(); input.select(); } return;
    }
    if (typing || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (ev.key === 'z' && focusBtn) { ev.preventDefault(); setFocus(!document.body.classList.contains('is-focus')); return; }
    if (ev.key === 'f' && (document.body.classList.contains('is-focus') || focusBtn)) {
      ev.preventDefault();
      if (!document.body.classList.contains('is-focus')) setFocus(true);
      toggleNativeFullscreen();
      return;
    }
    if (ev.key === 's' && (document.body.classList.contains('is-focus') || (focusBtn && mainProse))) {
      ev.preventDefault();
      // Outside Zen, `s` goes straight into Zen with the spotlight on
      if (!document.body.classList.contains('is-focus')) {
        setFocus(true);
        if (!document.body.classList.contains('is-spotlight')) setSpotlight(true);
        return;
      }
      setSpotlight(!document.body.classList.contains('is-spotlight'));
      return;
    }
    if ((ev.key === 'j' || ev.key === 'k') && document.body.classList.contains('is-focus')) {
      ev.preventDefault();
      if (!document.body.classList.contains('is-spotlight')) setSpotlight(true);
      else spotStep(ev.key === 'j' ? 1 : -1);
      return;
    }
    if (ev.key === 'Enter' && document.body.classList.contains('is-spotlight')) {
      var activeEl = spotBlocks[spotIdx];
      if (activeEl) {
        if (activeEl.tagName === 'DETAILS') activeEl.open = !activeEl.open;
        else if (activeEl.classList.contains('math-d') || activeEl.tagName === 'BLOCKQUOTE') openZoomLightbox(activeEl);
      }
      return;
    }
    if (ev.key === 'm') { ev.preventDefault(); toggleScratch(); return; }
    var go = ev.key === 'n' ? $('next-link') : ev.key === 'p' ? $('prev-link') : null;
    if (go) location.href = go.href;
  });

  // ---------- Offline Service Worker ----------
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
