// Roll-number login and per-person progress sync (simple, not high security).
// Progress (pages read, problem status, saved items, scratch notes) lives in localStorage as before;
// this script copies it to a small Supabase table keyed by roll number so it follows the person
// across devices, and keeps different people on the same device apart.
(function () {
  var API = 'https://upffzdedgxlafffraayf.supabase.co/rest/v1/rpc/';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZmZ6ZGVkZ3hsYWZmZnJhYXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NTg2NjgsImV4cCI6MjExMDEzNDY2OH0.Ef2BNAL4FzsVk2t2o7IqPMa4VL9ZxRmT6fVbel0TvJc';
  var FIELDS = { done: 'notes:done', probs: 'notes:probs', saved: 'notes:saved', notes: 'notes:scratch' };
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function rpc(name, args, keepalive) {
    return fetch(API + name, {
      method: 'POST', keepalive: !!keepalive,
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(args || {})
    }).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (j) {
        if (!r.ok) { var e = new Error((j && j.message) || ('Server error ' + r.status)); e.auth = r.status === 400; throw e; }
        return j;
      });
    });
  }
  function stable(o) {
    if (Array.isArray(o)) return '[' + o.map(stable).join(',') + ']';
    if (o && typeof o === 'object') return '{' + Object.keys(o).sort().map(function (k) { return JSON.stringify(k) + ':' + stable(o[k]); }).join(',') + '}';
    return JSON.stringify(o === undefined ? null : o);
  }
  function snapshot() {
    var o = {};
    for (var f in FIELDS) { var v = LS.get(FIELDS[f]); if (v) { try { o[f] = JSON.parse(v); } catch (e) {} } }
    return o;
  }
  function writeLocal(data) {
    for (var f in FIELDS) LS.set(FIELDS[f], data && data[f] != null ? JSON.stringify(data[f]) : null);
  }
  function merge(server, local) {
    var out = {};
    ['done', 'probs', 'notes'].forEach(function (f) {
      var s = server[f] || {}, l = local[f] || {}, m = {}, k;
      for (k in s) m[k] = s[k];
      for (k in l) m[k] = l[k];
      if (Object.keys(m).length) out[f] = m;
    });
    var saved = (server.saved || []).slice();
    (local.saved || []).forEach(function (x) { if (saved.indexOf(x) < 0) saved.push(x); });
    if (saved.length) out.saved = saved;
    return out;
  }
  var user = null;
  try { user = JSON.parse(LS.get('sm:user') || 'null'); } catch (e) {}

  // ---------- login gate ----------
  function gate(msg) {
    document.documentElement.classList.add('sm-locked');
    var g = document.getElementById('sm-gate');
    if (!g) {
      g = document.createElement('div');
      g.id = 'sm-gate';
      g.innerHTML =
        '<form class="sm-card" id="sm-form" autocomplete="on">' +
          '<div class="sm-mark">∑</div>' +
          '<h1>Study desk</h1>' +
          '<p class="sm-sub">Sign in with your roll number. Your pages read, problems solved and notes are saved to your roll number and follow you to any device.</p>' +
          '<label>Roll number<input id="sm-roll" name="username" autocomplete="username" inputmode="text" autocapitalize="characters" required placeholder="e.g. 2024101001"></label>' +
          '<label>Password<input id="sm-pass" name="password" type="password" autocomplete="current-password" required minlength="4" placeholder="at least 4 characters"></label>' +
          '<button class="btn" id="sm-go" type="submit">Enter</button>' +
          '<p class="sm-err" id="sm-err" role="alert"></p>' +
          '<p class="sm-hint">First time? Type any password: it creates your account. Use the same one on your other devices. This is a simple lock for friends, so do not reuse an important password.</p>' +
        '</form>';
      document.body.appendChild(g);
      document.getElementById('sm-form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var roll = document.getElementById('sm-roll').value.trim().toUpperCase();
        var pass = document.getElementById('sm-pass').value;
        var btn = document.getElementById('sm-go'), err = document.getElementById('sm-err');
        btn.disabled = true; btn.textContent = 'Checking…'; err.textContent = '';
        rpc('sm_login', { p_roll: roll, p_pass: pass }).then(function (res) {
          var local = snapshot();
          var lastOwner = LS.get('sm:owner');
          // progress already on this device counts for the new account only if nobody else owned it
          var keepLocal = !lastOwner || lastOwner === res.roll;
          var data = res.created ? (keepLocal ? local : {}) : (keepLocal ? merge(res.data || {}, local) : (res.data || {}));
          writeLocal(data);
          LS.set('sm:user', JSON.stringify({ roll: res.roll, pass: pass }));
          LS.set('sm:owner', res.roll);
          LS.set('sm:rev', res.updated_at);
          var snap = stable(snapshot());
          var finish = function () { LS.set('sm:last', snap); location.reload(); };
          if (res.created || keepLocal) rpc('sm_save', { p_roll: res.roll, p_pass: pass, p_data: JSON.parse(snap) }).then(function (t) { LS.set('sm:rev', t); finish(); }, finish);
          else finish();
        }).catch(function (e) {
          btn.disabled = false; btn.textContent = 'Enter';
          err.textContent = /fetch|network|Failed/i.test(e.message) ? 'Cannot reach the server. Check your connection and try again.' : e.message;
        });
      });
    }
    if (msg) document.getElementById('sm-err').textContent = msg;
    setTimeout(function () { var r = document.getElementById('sm-roll'); if (r) r.focus(); }, 50);
  }

  if (!user) {
    if (document.body) gate(); else document.addEventListener('DOMContentLoaded', function () { gate(); });
    return;
  }

  // ---------- sync for a signed-in person ----------
  var pushing = false;
  function push(keepalive) {
    var snap = stable(snapshot());
    if (snap === LS.get('sm:last') || pushing) return;
    pushing = true;
    rpc('sm_save', { p_roll: user.roll, p_pass: user.pass, p_data: JSON.parse(snap) }, keepalive).then(function (t) {
      LS.set('sm:last', snap); LS.set('sm:rev', t); setStatus('Saved');
    }).catch(function (e) { setStatus(e.auth ? 'Sign in again' : 'Offline: will retry'); if (e.auth) logout(true); })
      .then(function () { pushing = false; });
  }
  function pull() {
    rpc('sm_login', { p_roll: user.roll, p_pass: user.pass }).then(function (res) {
      var rev = LS.get('sm:rev');
      if (rev && new Date(res.updated_at) <= new Date(rev)) { push(); return; }
      var local = snapshot(), unsynced = stable(local) !== LS.get('sm:last');
      var data = unsynced ? merge(res.data || {}, local) : (res.data || {});
      writeLocal(data);
      LS.set('sm:rev', res.updated_at);
      LS.set('sm:last', stable(res.data || {}));
      if (stable(data) !== stable(local)) { sessionStorage.setItem('sm:pulled', '1'); location.reload(); }
      else push();
    }).catch(function (e) { if (e.auth) logout(true); else setStatus('Offline: will sync later'); });
  }
  function logout(expired) {
    var finish = function () {
      writeLocal({});
      ['sm:user', 'sm:rev', 'sm:last'].forEach(function (k) { LS.set(k, null); });
      if (expired) LS.set('sm:owner', null);
      location.reload();
    };
    if (expired) return finish();
    var snap = stable(snapshot());
    if (snap === LS.get('sm:last')) return finish();
    rpc('sm_save', { p_roll: user.roll, p_pass: user.pass, p_data: JSON.parse(snap) }).then(finish, function () {
      if (confirm('Could not upload your latest progress. Sign out anyway and lose it on this device?')) finish();
    });
  }

  var statusEl = null;
  function setStatus(s) { if (statusEl) statusEl.textContent = s; }

  function boardHtml(rows) {
    if (!rows.length) return '<p>No one has signed in yet.</p>';
    var ago = function (t) {
      var m = Math.round((Date.now() - new Date(t)) / 60000);
      return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago';
    };
    return '<table class="sm-board"><thead><tr><th>Roll</th><th>DnA solved</th><th>All solved</th><th>Pages read</th><th>Active</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr' + (r.roll === user.roll ? ' class="me"' : '') + '><td>' + esc(r.roll) + '</td><td>' + r.dna_solved + '</td><td>' + r.solved +
          '</td><td>' + r.pages_read + '</td><td>' + ago(r.last_active) + '</td></tr>';
      }).join('') + '</tbody></table>';
  }

  function mountAccount() {
    var actions = document.querySelector('.top-actions');
    if (!actions) return;
    var wrap = document.createElement('div');
    wrap.className = 'settings sm-acct';
    wrap.innerHTML =
      '<button class="icon-btn" id="sm-btn" type="button" aria-expanded="false" title="Account and friends\' progress">' + esc(user.roll) + '</button>' +
      '<div class="settings-pop sm-pop" id="sm-pop" hidden>' +
        '<div class="settings-head">Signed in as ' + esc(user.roll) + '</div>' +
        '<p class="hint">Progress sync: <span id="sm-status">Connecting…</span></p>' +
        '<button class="btn small wide" id="sm-board-btn" type="button">Friends\' progress</button>' +
        '<div id="sm-board"></div>' +
        '<button class="btn small wide" id="sm-out" type="button">Sign out</button>' +
      '</div>';
    actions.insertBefore(wrap, actions.firstChild);
    statusEl = document.getElementById('sm-status');
    var btn = document.getElementById('sm-btn'), pop = document.getElementById('sm-pop');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      pop.hidden = !pop.hidden; btn.setAttribute('aria-expanded', String(!pop.hidden));
    });
    document.addEventListener('click', function (e) { if (!pop.hidden && !wrap.contains(e.target)) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    document.getElementById('sm-out').addEventListener('click', function () { logout(false); });
    document.getElementById('sm-board-btn').addEventListener('click', function () {
      var box = document.getElementById('sm-board');
      box.innerHTML = '<p class="hint">Loading…</p>';
      push();
      rpc('sm_board', {}).then(function (rows) { box.innerHTML = boardHtml(rows || []); })
        .catch(function () { box.innerHTML = '<p class="hint">Cannot reach the server right now.</p>'; });
    });
    if (sessionStorage.getItem('sm:pulled')) { sessionStorage.removeItem('sm:pulled'); setStatus('Updated from your other device'); }
  }

  function start() {
    mountAccount();
    pull();
    setInterval(function () { push(); }, 5000);
    addEventListener('pagehide', function () { push(true); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') push(true); else pull(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
