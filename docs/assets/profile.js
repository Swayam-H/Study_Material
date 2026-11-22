// Profile page: details, stats, recovery word, password change. Needs auth.js (window.SM).
document.addEventListener('DOMContentLoaded', function () {
  var SM = window.SM, box = document.getElementById('profile');
  if (!box || !SM) return;
  var user = JSON.parse(SM.LS.get('sm:user') || 'null');
  if (!user) return;
  var esc = SM.esc, $ = function (id) { return document.getElementById(id); };
  var prof = {}; try { prof = JSON.parse(SM.LS.get('sm:profile') || '{}'); } catch (e) {}
  var det = prof.details || {};

  var snap = SM.snapshot(), probs = snap.probs || {}, done = snap.done || {};
  var cnt = function (f) { var n = 0; for (var k in probs) if (f(k, probs[k])) n++; return n; };
  var stats = [
    ['Problems solved', cnt(function (k, v) { return v === 'done'; })],
    ['DnA solved', cnt(function (k, v) { return v === 'done' && k.indexOf('dna/') === 0; })],
    ['Marked for review', cnt(function (k, v) { return v === 'review'; })],
    ['Pages read', Object.keys(done).filter(function (k) { return done[k]; }).length]
  ];
  var joined = prof.created_at ? new Date(prof.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  box.innerHTML =
    '<div class="pf-head"><div class="pf-avatar">' + esc((prof.name || user.roll).trim().charAt(0).toUpperCase()) + '</div>' +
      '<div><h2>' + esc(prof.name || user.roll) + '</h2><p class="hint">Roll number ' + esc(user.roll) + (joined ? ' · joined ' + esc(joined) : '') + '</p></div></div>' +
    '<div class="pf-stats">' + stats.map(function (s) { return '<div><b>' + s[1] + '</b><span>' + s[0] + '</span></div>'; }).join('') + '</div>' +
    '<section class="pf-card"><h3>Your details</h3>' +
      '<label>Roll number<input value="' + esc(user.roll) + '" disabled></label>' +
      '<label>Name<input id="pf-name" maxlength="60" value="' + esc(prof.name || '') + '" placeholder="Shown next to your roll in Friends\' progress"></label>' +
      '<label>Section or batch<input id="pf-batch" maxlength="40" value="' + esc(det.batch || '') + '" placeholder="e.g. CSE, Team 10"></label>' +
      '<label>Email or phone (optional)<input id="pf-contact" maxlength="80" value="' + esc(det.contact || '') + '"></label>' +
      '<label>About you (optional)<textarea id="pf-about" maxlength="300" rows="3" placeholder="Exam date, weak topics, anything">' + esc(det.about || '') + '</textarea></label>' +
      '<button class="btn" id="pf-save" type="button">Save details</button><p class="pf-msg" id="pf-m1"></p>' +
    '</section>' +
    '<section class="pf-card"><h3>Change password</h3>' +
      '<label>Current password<input id="pf-old" type="password" autocomplete="current-password"></label>' +
      '<label>New password<input id="pf-new" type="password" autocomplete="new-password" minlength="4" placeholder="at least 4 characters"></label>' +
      '<button class="btn" id="pf-pw" type="button">Change password</button><p class="pf-msg" id="pf-m2"></p>' +
    '</section>' +
    '<section class="pf-card"><h3>Recovery word</h3>' +
      '<p class="hint">' + (prof.has_recovery ? 'A recovery word is set. ' : 'No recovery word yet. ') +
        'If you forget your password, "Forgot password?" on the sign-in screen resets it with this word. Pick something only you know (4+ characters). Setting a new one replaces the old.</p>' +
      '<label>Recovery word<input id="pf-rw" autocomplete="off" placeholder="e.g. a pet or street name"></label>' +
      '<label>Current password (to confirm)<input id="pf-rwp" type="password" autocomplete="current-password"></label>' +
      '<button class="btn" id="pf-rec" type="button">' + (prof.has_recovery ? 'Replace recovery word' : 'Set recovery word') + '</button><p class="pf-msg" id="pf-m3"></p>' +
    '</section>' +
    '<section class="pf-card"><h3>Sign out</h3><p class="hint">Uploads your latest progress, then clears it from this device.</p>' +
      '<button class="btn" id="pf-out" type="button">Sign out</button></section>';

  var say = function (id, ok, t) { var e = $(id); e.className = 'pf-msg ' + (ok ? 'ok' : 'bad'); e.textContent = t; };
  var run = function (btn, id, fn, okText) {
    btn.disabled = true; say(id, true, 'Working…');
    fn().then(function () { say(id, true, okText); }).catch(function (e) { say(id, false, e.message); }).then(function () { btn.disabled = false; });
  };
  $('pf-save').onclick = function () {
    var name = $('pf-name').value.trim(), d = { batch: $('pf-batch').value.trim(), contact: $('pf-contact').value.trim(), about: $('pf-about').value.trim() };
    run(this, 'pf-m1', function () {
      return SM.rpc('sm_update_profile', { p_roll: user.roll, p_pass: user.pass, p_name: name, p_details: d }).then(function () {
        prof.name = name; prof.details = d; SM.LS.set('sm:profile', JSON.stringify(prof));
        document.querySelector('.pf-head h2').textContent = name || user.roll;
        document.querySelector('.pf-avatar').textContent = (name || user.roll).charAt(0).toUpperCase();
      });
    }, 'Saved.');
  };
  $('pf-pw').onclick = function () {
    var o = $('pf-old').value, n = $('pf-new').value;
    run(this, 'pf-m2', function () {
      return SM.rpc('sm_change_password', { p_roll: user.roll, p_old: o, p_new: n }).then(function () {
        user.pass = n; SM.LS.set('sm:user', JSON.stringify(user)); $('pf-old').value = ''; $('pf-new').value = '';
      });
    }, 'Password changed. Use the new one on your other devices.');
  };
  $('pf-rec').onclick = function () {
    var w = $('pf-rw').value, p = $('pf-rwp').value;
    run(this, 'pf-m3', function () {
      return SM.rpc('sm_set_recovery', { p_roll: user.roll, p_pass: p, p_word: w }).then(function () {
        prof.has_recovery = true; SM.LS.set('sm:profile', JSON.stringify(prof)); $('pf-rw').value = ''; $('pf-rwp').value = '';
      });
    }, 'Recovery word saved.');
  };
  $('pf-out').onclick = function () { SM.logout(); };
});
