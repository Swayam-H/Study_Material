// Builds the static site into ./docs from ./content.
// Usage: npm install && node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import katex from 'katex';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'docs');
const site = JSON.parse(fs.readFileSync(path.join(CONTENT, 'site.json'), 'utf8'));

// ---------- markdown + math ----------
const mathErrors = [];
let currentFile = '';
function renderMath(tex, display) {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: false, output: 'html' });
  } catch (e) {
    mathErrors.push(`${currentFile}: ${e.message.slice(0, 120)} :: ${tex.slice(0, 80)}`);
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, output: 'html' });
  }
}

function mathInline(state, silent) {
  const src = state.src, pos = state.pos;
  if (src.charCodeAt(pos) !== 0x24) return false;
  const dbl = src.charCodeAt(pos + 1) === 0x24;
  const open = dbl ? 2 : 1;
  const start = pos + open;
  if (!dbl && /\s/.test(src[start] || ' ')) return false;
  let i = start;
  for (;;) {
    i = src.indexOf(dbl ? '$$' : '$', i);
    if (i < 0) return false;
    let b = 0;
    while (src[i - 1 - b] === '\\') b++;
    if (b % 2) { i++; continue; }
    break;
  }
  if (i === start) return false;
  if (!dbl && (/\s/.test(src[i - 1]) || /\d/.test(src[i + 1] || ''))) return false;
  if (!silent) {
    const t = state.push(dbl ? 'math_display' : 'math_inline', '', 0);
    t.content = src.slice(start, i);
  }
  state.pos = i + open;
  return true;
}

function mathBlock(state, startLine, endLine, silent) {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (state.src.slice(pos, pos + 2) !== '$$') return false;
  const first = state.src.slice(pos + 2, max);
  let content, next = startLine, found = false;
  if (first.trim().endsWith('$$') && first.trim().length >= 2) {
    content = first.trim().slice(0, -2);
    if (content.includes('$$')) return false;
    found = true;
  } else {
    if (first.includes('$$')) return false;
    const lines = [first];
    for (next = startLine + 1; next < endLine; next++) {
      const p = state.bMarks[next] + state.tShift[next];
      const line = state.src.slice(p, state.eMarks[next]);
      if (line.trim().endsWith('$$')) { lines.push(line.trim().slice(0, -2)); found = true; break; }
      lines.push(line);
    }
    content = lines.join('\n');
  }
  if (!found) return false;
  if (silent) return true;
  const t = state.push('math_block', '', 0);
  t.block = true;
  t.content = content;
  t.map = [startLine, next + 1];
  state.line = next + 1;
  return true;
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
md.inline.ruler.before('escape', 'math_inline', mathInline);
md.block.ruler.before('fence', 'math_block', mathBlock, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
md.renderer.rules.math_inline = (t, i) => renderMath(t[i].content, false);
md.renderer.rules.math_display = (t, i) => `<span class="math-d" data-tex="${esc(t[i].content.trim())}">${renderMath(t[i].content, true)}</span>`;
md.renderer.rules.math_block = (t, i) => `<div class="math-d" data-tex="${esc(t[i].content.trim())}">${renderMath(t[i].content, true)}</div>\n`;
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
md.renderer.rules.table_close = () => '</table></div>\n';
const defaultLink = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (t, i, o, e, s) => {
  const href = t[i].attrGet('href') || '';
  if (/^https?:/.test(href)) { t[i].attrSet('target', '_blank'); t[i].attrSet('rel', 'noopener'); }
  return defaultLink(t, i, o, e, s);
};

// ---------- helpers ----------
const plain = s => s.replace(/\$([^$]+)\$/g, '$1').replace(/\\[a-zA-Z]+\s?/g, '').replace(/[*_`{}]/g, '').replace(/\s+/g, ' ').trim();
const slugify = s => plain(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
const inline = s => md.renderInline(s);
function uniq(slug, seen) {
  let s = slug, n = 2;
  while (seen.has(s)) s = `${slug}-${n++}`;
  seen.add(s);
  return s;
}
function searchText(src) {
  return src
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*\|?[-:| ]+\|[-:| ]*$/gm, ' ')
    .replace(/[#>*_`|$]/g, ' ')
    .replace(/\\(?:[,;!]|qquad|quad|Big|big|left|right|tfrac|frac|dfrac|boxed|text|mathbb|mathcal|mid)\b/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function splitTitle(raw) {
  let title = raw.trim(), meta = '';
  const m = title.match(/\s*\((Deck[^)]*)\)(.*)$/);
  if (m) { meta = (m[1] + m[2]).trim(); title = title.slice(0, m.index).trim(); }
  let kicker = '';
  const c = title.indexOf(': ');
  if (c > 0 && c < 40 && /^(Lectures?|Part|Midsem)\b/.test(title)) { kicker = title.slice(0, c); title = title.slice(c + 2); }
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return { kicker, title, meta };
}

function tagsOf(src, selfTest) {
  const t = [];
  if (selfTest) t.push('Self-test');
  if (/\bHW/i.test(src)) t.push('Homework');
  if (/Tutorial/i.test(src)) t.push('Tutorial');
  if (/Quiz/i.test(src)) t.push('Quiz');
  if (/midsem/i.test(src)) t.push('Midsem');
  if (/endsem/i.test(src)) t.push('Endsem');
  if (/Bertsekas/i.test(src)) t.push('Bertsekas');
  if (/probabilitycourse/i.test(src)) t.push('probabilitycourse');
  if (!t.length) t.push('Other');
  return t;
}

// Finds practice problems (statement + solution), solution ranges to collapse, and boxed formulas.
function extractStudy(tokens, seenIds) {
  const blocks = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    let end = i;
    if (t.nesting === 1) { end = i + 1; while (!(tokens[end].level === t.level && tokens[end].nesting === -1)) end++; }
    const b = { start: i, end, kind: 'other' };
    const text = t.type === 'heading_open' || t.type === 'paragraph_open' ? tokens[i + 1].content : '';
    if (t.type === 'heading_open') {
      b.kind = 'heading';
      const m = text.match(/^Problem (\d+)\s*(?:\[([^\]]*)\])?\s*(\(hard\))?/i);
      if (m) { b.problem = { label: 'Problem ' + m[1], src: m[2] || '', hard: !!m[3], anchor: t.attrGet('id') }; }
      if (/^Answers$/i.test(text.trim())) b.answers = true;
    } else if (t.type === 'hr') b.kind = 'hr';
    else if (t.type === 'paragraph_open') {
      if (/^\*{1,2}Solution\.\*{1,2}/.test(text)) b.kind = 'sol';
      else {
        const m = text.match(/^\*\*([A-Z]{1,3}\d+[a-z]?)(?:\s*\(([^)]*)\))?\.?[^*]*\*\*/);
        if (m) { b.kind = 'pstart'; b.label = m[1]; b.src = m[2] || ''; }
      }
    }
    blocks.push(b);
    i = end;
  }
  const problems = [], before = {}, after = {}, excluded = [];
  const pending = {};
  let cur = null, mode = null, ansLabel = null, ansBlocks = null, ansFirst = null, ansLast = null, nWrapped = 0;
  const wrap = (first, last, cls, label) => {
    before[first.start] = `<details class="sol${cls}"><summary><span>${label}</span></summary>\n`;
    after[last.end] = (after[last.end] || '') + '</details>\n';
    excluded.push([first.start, last.end]);
    nWrapped++;
  };
  const closeAns = () => {
    if (ansLabel && pending[ansLabel] && ansBlocks.length) {
      const p = pending[ansLabel];
      p.sol = ansBlocks.map(b => [b.start, b.end]);
      problems.push(p);
      delete pending[ansLabel];
    }
    ansLabel = null; ansBlocks = null;
  };
  const close = () => {
    if (cur) {
      if (mode === 'sol') {
        wrap(cur.solBlocks[0], cur.solBlocks[cur.solBlocks.length - 1], '', 'Solution');
        cur.sol = cur.solBlocks.map(b => [b.start, b.end]);
        problems.push(cur);
      } else if (mode === 'stmt' && cur.stmtBlocks.length) pending[cur.label] = cur;
      if (cur.stmtBlocks.length) excluded.push([cur.stmtBlocks[0].start, cur.stmtBlocks[cur.stmtBlocks.length - 1].end]);
      cur.stmt = cur.stmtBlocks.map(b => [b.start, b.end]);
    }
    if (mode === 'answers') { closeAns(); if (ansFirst) wrap(ansFirst, ansLast, ' answers', 'Answers'); ansFirst = ansLast = null; }
    cur = null; mode = null;
  };
  for (const b of blocks) {
    if (b.kind === 'heading' || b.kind === 'hr') {
      close();
      if (b.problem) { cur = { ...b.problem, stmtBlocks: [], solBlocks: [] }; mode = 'stmt'; }
      else if (b.answers) mode = 'answers';
    } else if (mode === 'answers') {
      if (!ansFirst) ansFirst = b;
      ansLast = b;
      if (b.kind === 'pstart') { closeAns(); ansLabel = b.label; ansBlocks = [b]; }
      else if (ansBlocks) ansBlocks.push(b);
    } else if (b.kind === 'pstart') {
      close();
      const anchor = uniq('p-' + b.label.toLowerCase(), seenIds);
      tokens[b.start].attrSet('id', anchor);
      cur = { label: b.label, src: b.src, hard: false, anchor, selfTest: /^T\d/.test(b.label), stmtBlocks: [b], solBlocks: [] };
      mode = 'stmt';
    } else if (b.kind === 'sol' && cur && mode === 'stmt') { mode = 'sol'; cur.solBlocks.push(b); }
    else if (cur && mode === 'stmt') cur.stmtBlocks.push(b);
    else if (cur && mode === 'sol') cur.solBlocks.push(b);
  }
  close();
  for (const p of problems) if (!p.stmt) p.stmt = p.stmtBlocks.map(b => [b.start, b.end]);
  // boxed display formulas outside problems and solutions
  const formulas = [];
  let head = { id: '', text: '' };
  const isEx = i => excluded.some(([a, b]) => i >= a && i <= b);
  tokens.forEach((t, i) => {
    if (t.type === 'heading_open') head = { id: t.attrGet('id') || head.id, text: tokens[i + 1].content };
    if (isEx(i)) return;
    const take = tex => { if (/\\boxed/.test(tex)) formulas.push({ tex, hid: head.id, htext: head.text }); };
    if (t.type === 'math_block') take(t.content);
    if (t.type === 'inline' && t.children) for (const c of t.children) if (c.type === 'math_display') take(c.content);
  });
  return { problems, before, after, formulas, nWrapped };
}

// ---------- load content ----------
const courses = [];
const searchIndex = [];
for (const dir of fs.readdirSync(CONTENT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  const cfgPath = path.join(CONTENT, dir, 'course.json');
  if (!fs.existsSync(cfgPath)) continue;
  const course = { slug: dir, ...JSON.parse(fs.readFileSync(cfgPath, 'utf8')), problems: [], formulas: [], formulaSeen: new Set() };
  for (const doc of course.docs) {
    currentFile = `${dir}/${doc.file}`;
    let src = fs.readFileSync(path.join(CONTENT, dir, doc.file), 'utf8').replace(/\r\n/g, '\n');
    const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
    if (fm) {
      src = src.slice(fm[0].length);
      const sub = fm[1].match(/^subtitle:\s*"?(.*?)"?\s*$/m);
      if (sub && !doc.about) doc.about = sub[1];
    }
    const lines = src.split('\n');
    const parts = [];
    let cur = { title: null, lines: [] }, fence = false;
    for (const line of lines) {
      if (/^(```|~~~)/.test(line)) fence = !fence;
      if (!fence && /^# (?!#)/.test(line)) {
        if (cur.title !== null || cur.lines.join('').trim()) parts.push(cur);
        cur = { title: line.slice(2).trim(), lines: [] };
      } else cur.lines.push(line);
    }
    parts.push(cur);
    const seenCh = new Set();
    doc.chapters = parts.map(p => {
      const raw = p.title ?? doc.title;
      const t = splitTitle(raw);
      const slug = uniq(slugify(t.kicker || t.title), seenCh);
      const id = `${course.slug}/${doc.slug}/${slug}`;
      const body = p.lines.join('\n').replace(/\n---\s*$/, '\n');
      const tokens = md.parse(body, {});
      const seen = new Set(), outline = [];
      for (let i = 0; i < tokens.length; i++) {
        const tk = tokens[i];
        if (tk.type === 'heading_open' && (tk.tag === 'h2' || tk.tag === 'h3')) {
          const text = tokens[i + 1].content;
          const hid = uniq(slugify(text), seen);
          tk.attrSet('id', hid);
          outline.push({ level: +tk.tag[1], id: hid, text });
        }
      }
      const chTitle = plain((t.kicker ? t.kicker + ': ' : '') + t.title);
      const study = extractStudy(tokens, seen);
      const fix = h => h.replace(/<blockquote>\n<p><strong>On the slide/g, '<blockquote class="slide">\n<p><strong>On the slide');
      const rend = ranges => fix(ranges.map(([a, b]) => md.renderer.render(tokens.slice(a, b + 1), md.options, {})).join(''));
      const chProblems = study.problems.map(pr => {
        const rec = { id: `${id}#${pr.anchor}`, u: `${id}.html#${pr.anchor}`, l: pr.label, s: pr.src, tags: tagsOf(pr.src, pr.selfTest), hard: pr.hard, d: doc.slug, c: chTitle, q: rend(pr.stmt), a: rend(pr.sol) };
        const tx = searchText(pr.stmt.map(([a, b]) => tokens.slice(a, b + 1).filter(x => x.type === 'inline').map(x => x.content).join(' ')).join(' '));
        searchIndex.push({ u: rec.u, c: `Problem · ${chTitle}`, t: `${pr.label}${pr.src ? ' (' + pr.src + ')' : ''}`, x: tx, k: 1 });
        return rec;
      });
      course.problems.push(...chProblems);
      for (const f of study.formulas) {
        if (course.formulaSeen.has(f.tex.trim())) continue;
        course.formulaSeen.add(f.tex.trim());
        course.formulas.push({ ...f, ch: id, chTitle, doc });
      }
      const TokenC = tokens.length ? tokens[0].constructor : null;
      const out = [];
      tokens.forEach((tk, i) => {
        if (study.before[i]) { const h = new TokenC('html_block', '', 0); h.content = study.before[i]; out.push(h); }
        out.push(tk);
        if (study.after[i]) { const h = new TokenC('html_block', '', 0); h.content = study.after[i]; out.push(h); }
      });
      let html = fix(md.renderer.render(out, md.options, {}));
      const secs = [];
      let sec = { id: '', text: '', buf: [] }, f2 = false;
      const ids = outline;
      let k = 0;
      for (const line of p.lines) {
        if (/^(```|~~~)/.test(line)) f2 = !f2;
        if (!f2 && /^#{2,3} (?!#)/.test(line)) {
          secs.push(sec);
          sec = { id: ids[k] ? ids[k].id : '', text: line.replace(/^#+\s*/, '').trim(), buf: [] };
          k++;
        } else sec.buf.push(line);
      }
      secs.push(sec);
      for (const s of secs) {
        const x = searchText(s.buf.join('\n'));
        if (!x && !s.text) continue;
        searchIndex.push({ u: `${id}.html${s.id ? '#' + s.id : ''}`, c: `${course.title} · ${chTitle}`, t: s.text ? plain(s.text) : chTitle, x });
      }
      const words = body.split(/\s+/).length;
      return { ...t, slug, id, html, outline, full: chTitle, nProblems: chProblems.length, hasSol: study.nWrapped > 0, minutes: Math.max(1, Math.round(words / 160)) };
    });
  }
  courses.push(course);
}

// ---------- templates ----------
const fontsLink = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap">';
const BUILD = Date.now().toString(36);

function bellSvgInteractive() {
  const W = 320, H = 96, pts = [];
  const f = x => Math.exp(-x * x / 2);
  const X = x => ((x + 3.4) / 6.8) * W, Y = y => H - 10 - y * (H - 22);
  for (let x = -3.4; x <= 3.401; x += 0.08) pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  const tail = [];
  for (let x = 1.2; x <= 3.401; x += 0.08) tail.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  return `<svg class="bell" viewBox="0 0 ${W} ${H}" role="img" aria-label="Interactive standard normal density">
    <line class="bell-grid" x1="0" y1="${Y(0.5).toFixed(1)}" x2="${W}" y2="${Y(0.5).toFixed(1)}" stroke-dasharray="2 3"/>
    <line class="bell-grid" x1="${X(0).toFixed(1)}" y1="10" x2="${X(0).toFixed(1)}" y2="${Y(0)}" stroke-dasharray="2 3"/>
    <polygon class="bell-tail" id="bell-tail-poly" points="${X(1.2).toFixed(1)},${Y(0)} ${tail.join(' ')} ${X(3.4).toFixed(1)},${Y(0)}"/>
    <line class="bell-cut" id="bell-cut-line" x1="${X(1.2).toFixed(1)}" y1="${Y(f(1.2)).toFixed(1)}" x2="${X(1.2).toFixed(1)}" y2="${Y(0)}"/>
    <polyline class="bell-curve" fill="none" points="${pts.join(' ')}"/>
    <line class="bell-axis" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/>
    <line class="bell-axis" x1="${X(0).toFixed(1)}" y1="${Y(0)}" x2="${X(0).toFixed(1)}" y2="${Y(0) + 4}"/>
  </svg>`;
}

function sidebar(root, active) {
  let h = '';
  for (const c of courses) {
    h += `<div class="nav-course">
      <div class="nav-course-head">
        <span class="nav-course-kicker">${esc([c.code, c.term].filter(Boolean).join(' · '))}</span>
        <a class="nav-course-title" href="${root}${c.slug}/index.html">${esc(c.title)}</a>
      </div>`;
    h += `<div class="nav-tools"><a class="${active && active.tool === 'practice' && active.course === c ? 'current' : ''}" href="${root}${c.slug}/practice.html">Practice <b>${c.problems.length}</b></a><a class="${active && active.tool === 'formulas' && active.course === c ? 'current' : ''}" href="${root}${c.slug}/formulas.html">Formulas <b>${c.formulas.length}</b></a></div><div class="nav-groups">`;
    for (const d of c.docs) {
      const open = active && active.doc === d ? ' open' : '';
      if (d.chapters.length === 1) {
        const ch = d.chapters[0];
        h += `<a class="nav-link nav-single${active && active.ch === ch ? ' current' : ''}" data-id="${ch.id}" href="${root}${ch.id}.html"><span>${esc(d.title)}</span></a>`;
        continue;
      }
      h += `<details class="nav-doc"${open}><summary><span>${esc(d.title)}</span><i data-count-for="${c.slug}/${d.slug}/" data-total="${d.chapters.length}"></i></summary><div class="nav-doc-items">`;
      for (const ch of d.chapters) {
        h += `<a class="nav-link${active && active.ch === ch ? ' current' : ''}" data-id="${ch.id}" href="${root}${ch.id}.html">${ch.kicker ? `<small>${esc(ch.kicker)}</small>` : ''}<span>${inline(ch.title)}</span></a>`;
      }
      h += '</div></details>';
    }
    h += '</div></div>';
  }
  return h;
}

function page({ root, title, body, active, pageId = '', outline = '', cls = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#9a3412">
<title>${esc(title)}</title>
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="icon" href="${root}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/icon-192.png">
<script>try{var d=document.documentElement,t=localStorage.getItem('notes:theme'),z=localStorage.getItem('notes:size'),w=localStorage.getItem('notes:width');if(t)d.dataset.theme=t;if(z)d.style.setProperty('--read-size',z+'px');if(w)d.style.setProperty('--read-width',w)}catch(e){}</script>
${fontsLink}
<link rel="stylesheet" href="${root}assets/katex/katex.min.css">
<link rel="stylesheet" href="${root}assets/style.css?v=${BUILD}">
</head>
<body data-root="${root}" data-page="${pageId}" class="${cls}">
<div class="read-bar" id="read-bar"></div>
<header class="top">
  <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
  <a class="brand" href="${root}index.html">
    <span class="brand-mark" aria-hidden="true">∑</span>
    <span class="brand-title">${esc(site.title)}</span>
    <span class="brand-sep">·</span>
    <span class="brand-sub">MA6.101 Monograph</span>
  </a>
  <div class="search">
    <svg class="search-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
    <input id="search-input" type="search" placeholder="Search notes, theorems, problems, formulas…" autocomplete="off" aria-label="Search">
    <kbd>/</kbd>
    <div class="search-results" id="search-results" hidden></div>
  </div>
  <div class="top-actions">
    <div class="pomo" id="pomo" title="25-minute Pomodoro study session timer">
      <button class="pomo-toggle" id="pomo-toggle" type="button"><span class="pomo-dot"></span><span id="pomo-time">25:00</span></button>
      <button class="pomo-reset" id="pomo-reset" type="button" aria-label="Reset timer" title="Reset 25m timer">↺</button>
    </div>
    <button class="icon-btn" id="scratch-btn" type="button" title="Open Margin Scratchpad &amp; External Connectors (Shortcut: m)">✎ Notes</button>
    <div class="settings">
      <button class="icon-btn" id="settings-btn" aria-label="Reading settings" aria-expanded="false" title="Typography &amp; Paper Theme">Aa</button>
      <div class="settings-pop" id="settings-pop" hidden>
        <div class="settings-head">Reading &amp; Paper Settings</div>
        <p>Paper surface</p>
        <div class="seg" id="theme-seg">
          <button data-theme-set="paper">Cream</button>
          <button data-theme-set="light">White</button>
          <button data-theme-set="sepia">Sepia</button>
          <button data-theme-set="dark">Night</button>
        </div>
        <p>Type size</p>
        <div class="seg" id="size-seg"><button data-size="16.5">S</button><button data-size="18.5">M</button><button data-size="20">L</button><button data-size="22">XL</button></div>
        <p>Measure (column width)</p>
        <div class="seg" id="width-seg"><button data-width="38rem">Narrow</button><button data-width="43rem">Book</button><button data-width="52rem">Wide</button></div>
        <p>Default solutions</p>
        <div class="seg" id="sol-seg"><button data-sol="hide">Collapsed</button><button data-sol="show">Expanded</button></div>
        <p>Study data &amp; offline</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px">
          <button class="btn small" id="export-json-btn" type="button">Export JSON</button>
          <button class="btn small" id="import-json-btn" type="button">Import JSON</button>
          <input type="file" id="import-json-input" accept=".json" hidden>
        </div>
        <button class="btn small wide" id="offline-btn" type="button">Save all pages for offline</button>
        <p class="hint" id="offline-hint">Shortcuts: <kbd>/</kbd> search · <kbd>z</kbd> zen mode · <kbd>m</kbd> scratchpad · <kbd>n</kbd>/<kbd>p</kbd> next/prev</p>
      </div>
    </div>
  </div>
</header>
<div class="shell${outline ? ' has-outline' : ''}">
  <nav class="side" id="side" aria-label="Notes">${sidebar(root, active)}</nav>
  <main class="main">${body}</main>
  ${outline}
</div>
<aside class="scratch-drawer" id="scratch-drawer" aria-label="Margin scratchpad and external connectors">
  <div class="scratch-head">
    <b>Margin Scratchpad &amp; Connectors</b>
    <button class="btn small" id="scratch-close" type="button">Close</button>
  </div>
  <div class="scratch-body">
    <span class="hint">Jot derivations, exam reminders, or proof sketches for this page (saved automatically in browser storage):</span>
    <textarea class="scratch-area" id="scratch-area" placeholder="Write personal notes, theorem reminders, or scratch calculations…"></textarea>
    <div class="connectors-box">
      <p>External Math &amp; Study Connectors</p>
      <div class="conn-grid">
        <a class="conn-link" href="https://www.desmos.com/calculator" target="_blank" rel="noopener"><span>Desmos Graphing</span><span>↗</span></a>
        <a class="conn-link" href="https://www.wolframalpha.com/" target="_blank" rel="noopener"><span>WolframAlpha</span><span>↗</span></a>
        <a class="conn-link" href="https://seeing-theory.brown.edu/" target="_blank" rel="noopener"><span>Seeing Theory</span><span>↗</span></a>
        <a class="conn-link" href="https://www.probabilitycourse.com/" target="_blank" rel="noopener"><span>Pishro-Nik Text</span><span>↗</span></a>
        <a class="conn-link" href="https://statlect.com/" target="_blank" rel="noopener"><span>StatLect Proofs</span><span>↗</span></a>
        <a class="conn-link" href="https://www.randomservices.org/random/" target="_blank" rel="noopener"><span>Virtual Labs</span><span>↗</span></a>
      </div>
    </div>
  </div>
</aside>
<button class="to-top" id="to-top" aria-label="Back to top" hidden title="Back to top">↑</button>
<div class="scrim" id="scrim" hidden></div>
<script src="${root}assets/app.js?v=${BUILD}" defer></script>
</body>
</html>`;
}

const written = [];
function write(rel, html) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  written.push(rel);
}

// ---------- emit ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets', 'katex', 'fonts'), { recursive: true });
const kd = path.join(ROOT, 'node_modules', 'katex', 'dist');
let kcss = fs.readFileSync(path.join(kd, 'katex.min.css'), 'utf8').replace(/,url\(fonts\/[^)]+\.woff\) format\("woff"\),url\(fonts\/[^)]+\.ttf\) format\("truetype"\)/g, '');
fs.writeFileSync(path.join(OUT, 'assets', 'katex', 'katex.min.css'), kcss);
for (const f of fs.readdirSync(path.join(kd, 'fonts')).filter(f => /\.woff2$/.test(f))) {
  fs.copyFileSync(path.join(kd, 'fonts', f), path.join(OUT, 'assets', 'katex', 'fonts', f));
  written.push(`assets/katex/fonts/${f}`);
}
for (const f of fs.readdirSync(path.join(ROOT, 'src')).filter(f => f !== 'sw.js')) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(OUT, 'assets', f));
fs.writeFileSync(path.join(OUT, 'sw.js'), fs.readFileSync(path.join(ROOT, 'src', 'sw.js'), 'utf8').replace('__BUILD__', BUILD));
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), JSON.stringify({
  name: site.title, short_name: 'Notes', start_url: './index.html', scope: './', display: 'standalone',
  background_color: '#f6f3ec', theme_color: '#9a3412',
  icons: [{ src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }]
}));
fs.writeFileSync(path.join(OUT, 'assets', 'search.js'), 'window.NOTES_SEARCH=' + JSON.stringify(searchIndex) + ';');

// home (filled in by app.js from saved progress)
{
  let cards = '';
  for (const c of courses) {
    const n = c.docs.reduce((a, d) => a + d.chapters.length, 0);
    cards += `<article class="course-card" data-course="${c.slug}">
      <a class="course-main" href="${c.slug}/index.html">
        <div class="course-meta">${esc([c.code, c.term].filter(Boolean).join(' · '))}</div>
        <h2>${esc(c.title)}</h2>
        <p>${esc(c.blurb || '')}</p>
        <div class="bar"><i data-bar-for="${c.slug}/" data-total="${n}"></i></div>
        <div class="course-foot">
          <span data-count-text="${c.slug}/" data-total="${n}">0 of ${n} chapters read</span>
          <span>${c.docs.length} note sets · ${c.problems.length} problems · ${c.formulas.length} boxed formulas</span>
        </div>
      </a>
      <div class="course-actions">
        <a href="${c.slug}/index.html">Syllabus &amp; Notes (${n})</a>
        <a href="${c.slug}/practice.html">Problem Bank (${c.problems.length})</a>
        <a href="${c.slug}/formulas.html">Formula Compendium (${c.formulas.length})</a>
      </div>
    </article>`;
  }
  const c0 = courses[0];
  const body = `<div class="home">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Monograph &amp; Problem Compendium · ${c0 ? esc(c0.code + ' ' + c0.term) : ''}</p>
        <h1>${esc(site.title)}</h1>
        <p class="lede">${esc(site.tagline)}</p>
        <div class="hero-actions">
          <a class="btn primary" id="resume-btn" href="${c0 ? c0.docs[0].chapters[0].id + '.html' : '#'}">Start reading</a>
          <a class="btn" id="random-btn" href="${c0 ? c0.slug + '/practice.html#random' : '#'}">Random problem</a>
          ${c0 ? `<a class="btn" href="${c0.slug}/formulas.html">Formula sheet</a>` : ''}
        </div>
      </div>
    </section>
    <section class="stats" id="stats">
      <div class="stat-item"><b id="st-ch">0 / 41</b><span>Chapters read</span></div>
      <div class="stat-item"><b id="st-pr">0 / 252</b><span>Problems solved</span></div>
      <div class="stat-item"><b id="st-rv">0</b><span>Marked for review</span></div>
      <div class="stat-item"><b id="st-sv">0</b><span>Bookmarked sections</span></div>
    </section>
    <section class="dist-lab" aria-label="Interactive standard normal tail explorer">
      <div class="dist-lab-head">
        <span class="dist-lab-title">Interactive Standard Normal Tail Table — Z ~ N(0, 1)</span>
        <span class="dist-lab-readout" id="z-readout">Φ(1.20) = 0.8849 · P(Z ≥ 1.20) = 0.1151</span>
      </div>
      <div class="dist-lab-grid">
        <div>${bellSvgInteractive()}</div>
        <div class="dist-controls">
          <div class="dist-ctrl">
            <label for="z-slider"><span>Threshold z</span><b id="z-val">+1.20</b></label>
            <input type="range" id="z-slider" min="-3.0" max="3.0" step="0.01" value="1.20">
          </div>
          <div class="dist-presets">
            <button type="button" data-z-set="0">z = 0</button>
            <button type="button" data-z-set="1.0">1σ (1.00)</button>
            <button type="button" data-z-set="1.645">90% (1.645)</button>
            <button type="button" data-z-set="1.96">95% (1.96)</button>
            <button type="button" data-z-set="2.576">99% (2.58)</button>
          </div>
        </div>
      </div>
    </section>
    <h2 class="sec-title">Course Volumes</h2>
    <div class="course-grid">${cards}</div>
    <div id="saved-box"></div>
  </div>`;
  write('index.html', page({ root: '', title: site.title, body, cls: 'is-home' }));
}

const meta = { courses: [], titles: {} };
for (const c of courses) {
  const root1 = '../';
  const nCh = c.docs.reduce((a, d) => a + d.chapters.length, 0);
  meta.courses.push({ slug: c.slug, title: c.title, nProblems: c.problems.length, nFormulas: c.formulas.length, nChapters: nCh, first: c.docs[0].chapters[0].id });
  let h = `<div class="course-page"><p class="eyebrow">${esc([c.code, c.term].filter(Boolean).join(' · '))}</p><h1>${esc(c.title)}</h1><p class="lede">${esc(c.blurb || '')}</p>
    <div class="tool-row"><a class="tool" href="practice.html"><b>Practice problem bank (${c.problems.length})</b><span>Worked problems from lectures, homework, tutorials, and past exams with List and Flashcard Deck modes</span></a><a class="tool" href="formulas.html"><b>Formula compendium (${c.formulas.length})</b><span>Every boxed theorem, identity, and distribution result indexed in lecture order with 1-click LaTeX copy</span></a></div>`;
  for (const d of c.docs) {
    h += `<section class="doc-block"><div class="doc-head"><div><h2>${esc(d.title)}</h2>${d.about ? `<p>${inline(d.about)}</p>` : ''}</div><div class="doc-side"><span class="progress-text" data-count-text="${c.slug}/${d.slug}/" data-total="${d.chapters.length}" data-short="1"></span>${d.pdf ? `<a class="pdf-link" href="pdf/${encodeURI(d.pdf)}" target="_blank" rel="noopener">PDF ↗</a>` : ''}</div></div><div class="bar thin"><i data-bar-for="${c.slug}/${d.slug}/" data-total="${d.chapters.length}"></i></div><ol class="chapter-list">`;
    for (const ch of d.chapters) {
      h += `<li><a data-id="${ch.id}" href="${root1}${ch.id}.html"><span class="tick" aria-hidden="true"></span><span class="ch-text">${ch.kicker ? `<small>${esc(ch.kicker)}</small>` : ''}<span>${inline(ch.title)}</span></span>${ch.nProblems ? `<span class="ch-prob">${ch.nProblems} problems</span>` : ''}<span class="ch-min">${ch.minutes} min</span></a></li>`;
    }
    h += '</ol></section>';
    if (d.pdf) {
      fs.mkdirSync(path.join(OUT, c.slug, 'pdf'), { recursive: true });
      fs.copyFileSync(path.join(CONTENT, c.slug, 'pdf', d.pdf), path.join(OUT, c.slug, 'pdf', d.pdf));
    }
  }
  h += '</div>';
  write(`${c.slug}/index.html`, page({ root: root1, title: `${c.title} · ${site.title}`, body: h }));

  // practice
  const tagList = [...new Set(c.problems.flatMap(p => p.tags))];
  fs.writeFileSync(path.join(OUT, c.slug, 'problems.js'), 'window.NOTES_PROBLEMS=' + JSON.stringify(c.problems) + ';');
  written.push(`${c.slug}/problems.js`);
  const pbody = `<div class="practice" data-course="${c.slug}">
    <nav class="crumbs"><a href="index.html">${esc(c.title)}</a><span>›</span><span>Practice</span></nav>
    <div class="practice-head-bar">
      <div>
        <p class="eyebrow">Practice &amp; Active Recall</p>
        <h1>Problem bank</h1>
        <p class="lede">${c.problems.length} worked problems pulled from the notes. Switch between List view and Anki-style Flashcard Deck mode.</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <div class="mode-switch" id="mode-switch">
          <button type="button" data-mode="list" class="on">List View</button>
          <button type="button" data-mode="deck">Flashcard Deck</button>
        </div>
        <button class="btn small" id="export-anki-probs" type="button" title="Download filtered problems as an Anki-importable TSV file">Export Anki TSV</button>
      </div>
    </div>
    <div class="filters">
      <label class="field"><span>Keyword or label</span><input id="f-q" type="search" placeholder="Search problem text, topic, or label (e.g. Bayes, B3, CLT)…" autocomplete="off"></label>
      <label class="field"><span>Note set</span><select id="f-doc"><option value="">All note sets</option>${c.docs.filter(d => c.problems.some(p => p.d === d.slug)).map(d => `<option value="${d.slug}">${esc(d.title)}</option>`).join('')}</select></label>
      <label class="field"><span>Status</span><select id="f-status"><option value="">Any status</option><option value="todo">Not attempted</option><option value="review">Review later</option><option value="done">Solved</option></select></label>
      <button class="btn primary" id="f-random" type="button">Random pick</button>
    </div>
    <div class="chips" id="f-tags">${tagList.map(t => `<button type="button" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div>
    <p class="result-count" id="p-count"></p>
    <div id="p-list" class="p-list"><p class="search-empty">Loading problems…</p></div>
    <div class="more-row"><button class="btn" id="p-more" type="button" hidden>Show more</button></div>
  </div>
  <script src="problems.js?v=${BUILD}" defer></script>`;
  write(`${c.slug}/practice.html`, page({ root: root1, title: `Practice · ${c.title}`, body: pbody, active: { tool: 'practice', course: c } }));

  // formulas
  let fb = `<div class="formulas"><nav class="crumbs"><a href="index.html">${esc(c.title)}</a><span>›</span><span>Formulas</span></nav>
    <div class="practice-head-bar">
      <div>
        <p class="eyebrow">Formula Compendium</p>
        <h1>Every boxed result</h1>
        <p class="lede">${c.formulas.length} key formulas collected from the notes, in lecture order. Hover any formula to copy its LaTeX source, or click to jump to its derivation.</p>
      </div>
      <button class="btn small" id="export-anki-formulas" type="button" title="Export all 123 boxed formulas as an Anki flashcard TSV deck">Export Anki TSV</button>
    </div>
    <input class="f-filter" id="formula-filter" type="search" placeholder="Filter 123 formulas by lecture, theorem, or symbol (e.g. Bayes, MGF, Gaussian, Markov, MLE)…" aria-label="Filter formulas">`;
  let lastCh = '';
  for (const f of c.formulas) {
    if (f.ch !== lastCh) { if (lastCh) fb += '</div></section>'; fb += `<section class="f-group"><h2><a href="${root1}${f.ch}.html">${esc(f.chTitle)}</a></h2><div class="f-grid">`; lastCh = f.ch; }
    const cleanTex = f.tex.replace(/\\boxed\s*/g, '').trim();
    fb += `<a class="f-card" href="${root1}${f.ch}.html${f.hid ? '#' + f.hid : ''}" data-text="${esc(plain(f.chTitle + ' ' + f.htext).toLowerCase())}" data-tex="${esc(cleanTex)}"><div class="math-d">${renderMath(cleanTex, true)}</div><span>${inline(f.htext || f.chTitle)}</span></a>`;
  }
  if (lastCh) fb += '</div></section>';
  fb += '</div>';
  write(`${c.slug}/formulas.html`, page({ root: root1, title: `Formulas · ${c.title}`, body: fb, active: { tool: 'formulas', course: c } }));

  const flat = c.docs.flatMap(d => d.chapters.map(ch => ({ d, ch })));
  flat.forEach(({ d, ch }, i) => {
    const root = '../../';
    const prev = flat[i - 1], next = flat[i + 1];
    meta.titles[ch.id] = ch.full;
    const nav = x => x ? `<a class="pn pn-${x === prev ? 'prev' : 'next'}" id="${x === prev ? 'prev-link' : 'next-link'}" href="${root}${x.ch.id}.html"><small>${x === prev ? '← Previous' : 'Next →'}</small><span>${x.ch.kicker ? esc(x.ch.kicker) + ': ' : ''}${inline(x.ch.title)}</span></a>` : '<span></span>';
    const body = `<article class="note">
      <nav class="crumbs"><a href="${root}${c.slug}/index.html">${esc(c.title)}</a><span>›</span><span>${esc(d.title)}</span></nav>
      <header class="note-head">
        ${ch.kicker ? `<p class="eyebrow">${esc(ch.kicker)}</p>` : ''}
        <h1>${inline(ch.title)}</h1>
        <p class="note-meta">${[ch.meta ? esc(ch.meta) : '', `${ch.minutes} min read`, ch.nProblems ? `${ch.nProblems} practice problems` : ''].filter(Boolean).join(' · ')}</p>
        <div class="note-tools">
          ${ch.hasSol ? '<button class="btn small" id="sol-toggle" type="button">Show all solutions</button>' : ''}
          <button class="btn small" id="focus-btn" type="button" title="Toggle distraction-free Zen reading mode (Shortcut: z)">Zen mode (z)</button>
          ${ch.hasSol ? '<span class="hint">Solutions stay collapsed until you click them.</span>' : ''}
        </div>
      </header>
      <div class="prose">${ch.html}</div>
      <div class="done-row">
        <span class="done-label">End of ${esc(ch.kicker || ch.full)}</span>
        <button class="done-btn" id="done-btn" type="button" aria-pressed="false">Mark chapter as read</button>
      </div>
      <nav class="prevnext">${nav(prev)}${nav(next)}</nav>
    </article>`;
    const ol = ch.outline.length > 1 ? `<aside class="outline" aria-label="On this page"><p>Contents</p>${ch.outline.map(o => `<a class="l${o.level}" href="#${o.id}">${inline(o.text)}</a>`).join('')}</aside>` : '';
    write(`${ch.id}.html`, page({ root, title: `${ch.full} · ${c.title}`, body, active: { doc: d, ch }, pageId: ch.id, outline: ol }));
  });
}
fs.writeFileSync(path.join(OUT, 'assets', 'meta.js'), 'window.NOTES_META=' + JSON.stringify(meta) + ';');
const assetList = ['assets/style.css?v=' + BUILD, 'assets/app.js?v=' + BUILD, 'assets/meta.js', 'assets/search.js', 'assets/katex/katex.min.css', 'assets/icon.svg', 'manifest.webmanifest'];
fs.writeFileSync(path.join(OUT, 'assets', 'pages.js'), 'window.NOTES_PAGES=' + JSON.stringify([...written, ...assetList]) + ';');

const nCh = courses.reduce((a, c) => a + c.docs.reduce((b, d) => b + d.chapters.length, 0), 0);
console.log(`Built ${courses.length} course(s), ${nCh} chapters, ${searchIndex.length} search entries.`);
for (const c of courses) console.log(`  ${c.slug}: ${c.problems.length} problems, ${c.formulas.length} formulas`);
if (mathErrors.length) { console.log(`${mathErrors.length} math warnings:`); for (const e of mathErrors.slice(0, 40)) console.log('  ' + e); }
