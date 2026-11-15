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

const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
md.inline.ruler.before('escape', 'math_inline', mathInline);
md.block.ruler.before('fence', 'math_block', mathBlock, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
md.renderer.rules.math_inline = (t, i) => renderMath(t[i].content, false);
md.renderer.rules.math_display = (t, i) => `<span class="math-d">${renderMath(t[i].content, true)}</span>`;
md.renderer.rules.math_block = (t, i) => `<div class="math-d">${renderMath(t[i].content, true)}</div>\n`;
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
md.renderer.rules.table_close = () => '</table></div>\n';
const defaultLink = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (t, i, o, e, s) => {
  const href = t[i].attrGet('href') || '';
  if (/^https?:/.test(href)) { t[i].attrSet('target', '_blank'); t[i].attrSet('rel', 'noopener'); }
  return defaultLink(t, i, o, e, s);
};

// ---------- helpers ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
    // split into chapters at H1 (outside fences)
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
      // wrap solutions in <details>
      const TokenC = tokens.length ? tokens[0].constructor : null;
      const out = [];
      tokens.forEach((tk, i) => {
        if (study.before[i]) { const h = new TokenC('html_block', '', 0); h.content = study.before[i]; out.push(h); }
        out.push(tk);
        if (study.after[i]) { const h = new TokenC('html_block', '', 0); h.content = study.after[i]; out.push(h); }
      });
      let html = fix(md.renderer.render(out, md.options, {}));
      // search entries: one per H2 section
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
const fontsLink = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap">';
const BUILD = Date.now().toString(36);

function bellSvg() {
  const W = 360, H = 104, pts = [];
  const f = x => Math.exp(-x * x / 2);
  const X = x => ((x + 3.4) / 6.8) * W, Y = y => H - 14 - y * (H - 28);
  for (let x = -3.4; x <= 3.401; x += 0.08) pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  const tail = [];
  for (let x = 1.15; x <= 3.401; x += 0.08) tail.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  const area = [`0.0,${Y(0)}`, ...pts, `${W.toFixed(1)},${Y(0)}`].join(' ');
  return `<svg class="bell" viewBox="0 0 ${W} ${H}" role="img" aria-label="Normal density with the right tail shaded">
    <defs>
      <linearGradient id="bell-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="tail-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.42"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <line class="bell-grid" x1="0" y1="${Y(0.5).toFixed(1)}" x2="${W}" y2="${Y(0.5).toFixed(1)}" stroke-dasharray="3 4"/>
    <line class="bell-grid" x1="${X(0).toFixed(1)}" y1="12" x2="${X(0).toFixed(1)}" y2="${Y(0)}" stroke-dasharray="3 4"/>
    <polygon class="bell-area" points="${area}" fill="url(#bell-grad)"/>
    <polygon class="bell-tail" points="${X(1.15).toFixed(1)},${Y(0)} ${tail.join(' ')} ${X(3.4).toFixed(1)},${Y(0)}" fill="url(#tail-grad)"/>
    <line class="bell-cut" x1="${X(1.15).toFixed(1)}" y1="${Y(f(1.15)).toFixed(1)}" x2="${X(1.15).toFixed(1)}" y2="${Y(0)}"/>
    <polyline class="bell-curve" fill="none" points="${pts.join(' ')}"/>
    <circle class="bell-dot" cx="${X(0).toFixed(1)}" cy="${Y(1).toFixed(1)}" r="3.5"/>
    <circle class="bell-dot tail-dot" cx="${X(1.15).toFixed(1)}" cy="${Y(f(1.15)).toFixed(1)}" r="3.5"/>
    <line class="bell-axis" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/>
  </svg>`;
}

function sidebar(root, active) {
  let h = '';
  for (const c of courses) {
    h += `<div class="nav-course">
      <div class="nav-course-head">
        <span class="nav-course-kicker">${esc([c.code, c.term].filter(Boolean).join(' · ') || 'Course')}</span>
        <a class="nav-course-title" href="${root}${c.slug}/index.html">${esc(c.title)}</a>
      </div>`;
    h += `<div class="nav-tools">
      <a class="${active && active.tool === 'practice' && active.course === c ? 'current' : ''}" href="${root}${c.slug}/practice.html">
        <span class="nt-label"><svg class="nt-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2.5 8.5l3.2 3.2 7.8-7.8"/></svg>Practice</span>
        <b>${c.problems.length}</b>
      </a>
      <a class="${active && active.tool === 'formulas' && active.course === c ? 'current' : ''}" href="${root}${c.slug}/formulas.html">
        <span class="nt-label"><svg class="nt-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2.5H4l4.5 5.5L4 13.5h8"/></svg>Formulas</span>
        <b>${c.formulas.length}</b>
      </a>
    </div>`;
    h += `<div class="nav-groups">`;
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
<meta name="theme-color" content="#3730a3">
<title>${esc(title)}</title>
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="icon" href="${root}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/icon-192.png">
<script>try{var d=document.documentElement,t=localStorage.getItem('notes:theme'),z=localStorage.getItem('notes:size');if(t)d.dataset.theme=t;if(z)d.style.setProperty('--read-size',z+'px')}catch(e){}</script>
${fontsLink}
<link rel="stylesheet" href="${root}assets/katex/katex.min.css">
<link rel="stylesheet" href="${root}assets/style.css?v=${BUILD}">
</head>
<body data-root="${root}" data-page="${pageId}" class="${cls}">
<div class="read-bar" id="read-bar"></div>
<header class="top">
  <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open navigation" aria-expanded="false">
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
  </button>
  <a class="brand" href="${root}index.html">
    <span class="brand-mark" aria-hidden="true">∑</span>
    <span class="brand-text">
      <span class="brand-title">${esc(site.title)}</span>
      <span class="brand-sub">MA6.101 · Study Desk</span>
    </span>
  </a>
  <div class="search">
    <svg class="search-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
    <input id="search-input" type="search" placeholder="Search lectures, theorems, problems, formulas…" autocomplete="off" aria-label="Search">
    <kbd>/</kbd>
    <div class="search-results" id="search-results" hidden></div>
  </div>
  <div class="top-actions">
    <button class="icon-btn theme-quick" id="theme-quick" type="button" aria-label="Toggle color theme" title="Toggle Light / Dark theme">
      <svg class="ico-sun" width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10" cy="10" r="3.6"/><path d="M10 2.2v2M10 15.8v2M2.2 10h2M15.8 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4"/></svg>
      <svg class="ico-moon" width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16.2 12.4A6.8 6.8 0 0 1 7.6 3.8a6.8 6.8 0 1 0 8.6 8.6Z"/></svg>
    </button>
    <div class="settings">
      <button class="icon-btn" id="settings-btn" aria-label="Reading settings" aria-expanded="false" title="Reading preferences">Aa</button>
      <div class="settings-pop" id="settings-pop" hidden>
        <div class="settings-head">Reading Preferences</div>
        <p>Text size</p>
        <div class="seg" id="size-seg"><button data-size="16">S</button><button data-size="18">M</button><button data-size="20">L</button><button data-size="22">XL</button></div>
        <p>Appearance</p>
        <div class="seg" id="theme-seg"><button data-theme-set="">Auto</button><button data-theme-set="light">Light</button><button data-theme-set="dark">Dark</button></div>
        <p>Default solutions</p>
        <div class="seg" id="sol-seg"><button data-sol="hide">Collapsed</button><button data-sol="show">Expanded</button></div>
        <p>Offline library</p>
        <button class="btn wide" id="offline-btn" type="button">Save everything for offline</button>
        <p class="hint" id="offline-hint">Shortcuts: <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>f</kbd> focus</p>
      </div>
    </div>
  </div>
</header>
<div class="shell${outline ? ' has-outline' : ''}">
  <nav class="side" id="side" aria-label="Notes">${sidebar(root, active)}</nav>
  <main class="main">${body}</main>
  ${outline}
</div>
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
  background_color: '#f8f7f4', theme_color: '#3730a3',
  icons: [{ src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }]
}));
fs.writeFileSync(path.join(OUT, 'assets', 'search.js'), 'window.NOTES_SEARCH=' + JSON.stringify(searchIndex) + ';');

// home (filled in by app.js from saved progress)
{
  let cards = '';
  for (const c of courses) {
    const n = c.docs.reduce((a, d) => a + d.chapters.length, 0);
    let mods = '<div class="course-modules">';
    for (const d of c.docs) {
      const firstCh = d.chapters[0];
      mods += `<a class="mod-pill" href="${firstCh.id}.html">
        <span class="mod-title">${esc(d.title)}</span>
        <span class="mod-count">${d.chapters.length} ${d.chapters.length === 1 ? 'part' : 'parts'}</span>
      </a>`;
    }
    mods += '</div>';
    cards += `<article class="course-card" data-course="${c.slug}">
      <div class="course-main">
        <div class="course-card-top">
          <div class="course-card-info">
            <div class="course-meta"><span class="badge-code">${esc(c.code || 'COURSE')}</span><span>${esc(c.term || '')}</span></div>
            <h2><a href="${c.slug}/index.html">${esc(c.title)}</a></h2>
            <p>${esc(c.blurb || '')}</p>
          </div>
          <a class="course-art" href="${c.slug}/index.html" aria-label="${esc(c.title)} overview">
            ${bellSvg()}
          </a>
        </div>
        ${mods}
        <div class="course-prog">
          <div class="bar"><i data-bar-for="${c.slug}/" data-total="${n}"></i></div>
          <div class="course-foot">
            <span data-count-text="${c.slug}/" data-total="${n}">0 of ${n} chapters done</span>
            <span class="course-metrics">${c.docs.length} modules · ${c.problems.length} problems · ${c.formulas.length} formulas</span>
          </div>
        </div>
      </div>
      <div class="course-actions">
        <a href="${c.slug}/index.html"><span>Syllabus &amp; Notes</span><small>${n} chapters →</small></a>
        <a href="${c.slug}/practice.html"><span>Problem Bank</span><small>${c.problems.length} worked →</small></a>
        <a href="${c.slug}/formulas.html"><span>Formula Bank</span><small>${c.formulas.length} boxed →</small></a>
      </div>
    </article>`;
  }
  const c0 = courses[0];
  const body = `<div class="home">
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow-row">
          <span class="eyebrow-pill"><span class="pulse-dot"></span>Interactive Study Sanctuary</span>
          ${c0 ? `<span class="eyebrow-meta">${esc(c0.code)} · ${esc(c0.term)}</span>` : ''}
        </div>
        <h1>${esc(site.title)}</h1>
        <p class="lede">${esc(site.tagline)}</p>
        <div class="hero-actions">
          <a class="btn primary" id="resume-btn" href="${c0 ? c0.docs[0].chapters[0].id + '.html' : '#'}">Start reading</a>
          <a class="btn" id="random-btn" href="${c0 ? c0.slug + '/practice.html#random' : '#'}">Random problem</a>
          ${c0 ? `<a class="btn ghost" href="${c0.slug}/formulas.html">Formula sheet</a>` : ''}
        </div>
      </div>
      <div class="ring-card">
        <div class="ring-wrap">
          <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="52"/>
            <circle class="ring-fg" id="ring-fg" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="326.7" transform="rotate(-90 60 60)"/>
          </svg>
          <div class="ring-text"><b id="ring-pct">0%</b><span>completed</span></div>
        </div>
        <div class="ring-caption">Overall Mastery</div>
      </div>
    </section>
    <section class="stats" id="stats">
      <div class="stat-card">
        <div class="stat-top"><span class="stat-label">Reading Progress</span><span class="stat-ico stat-ico-ch">📖</span></div>
        <b id="st-ch">0</b>
        <span>chapters completed</span>
      </div>
      <div class="stat-card">
        <div class="stat-top"><span class="stat-label">Practice Mastery</span><span class="stat-ico stat-ico-pr">✓</span></div>
        <b id="st-pr">0</b>
        <span>problems solved</span>
      </div>
      <div class="stat-card">
        <div class="stat-top"><span class="stat-label">Revision Queue</span><span class="stat-ico stat-ico-rv">↻</span></div>
        <b id="st-rv">0</b>
        <span>marked for review</span>
      </div>
      <div class="stat-card">
        <div class="stat-top"><span class="stat-label">Pinned Bookmarks</span><span class="stat-ico stat-ico-sv">★</span></div>
        <b id="st-sv">0</b>
        <span>saved sections</span>
      </div>
    </section>
    <div class="sec-head">
      <h2 class="sec-title">Active Courses</h2>
      <span class="sec-sub">Structured lecture notes, collapsible solutions &amp; derivations</span>
    </div>
    <div class="course-grid">${cards}</div>
    <div id="saved-box"></div>
  </div>`;
  write('index.html', page({ root: '', title: site.title, body, cls: 'is-home' }));
}

const meta = { courses: [], titles: {} };
for (const c of courses) {
  const root1 = '../';
  const nCh = c.docs.reduce((a, d) => a + d.chapters.length, 0);
  const totalMin = c.docs.reduce((a, d) => a + d.chapters.reduce((b, ch) => b + ch.minutes, 0), 0);
  meta.courses.push({ slug: c.slug, title: c.title, nProblems: c.problems.length, nFormulas: c.formulas.length, nChapters: nCh, first: c.docs[0].chapters[0].id });
  let h = `<div class="course-page">
    <header class="course-hero">
      <div class="eyebrow-row">
        <span class="eyebrow-pill">${esc([c.code, c.term].filter(Boolean).join(' · '))}</span>
        <span class="eyebrow-meta">${nCh} chapters · ~${Math.round(totalMin / 60)} hrs reading</span>
      </div>
      <h1>${esc(c.title)}</h1>
      <p class="lede">${esc(c.blurb || '')}</p>
      <div class="tool-row">
        <a class="tool" href="practice.html">
          <div class="tool-icon tool-icon-prac">✓</div>
          <div class="tool-body">
            <b>Practice Problem Bank <span>${c.problems.length} problems →</span></b>
            <span>Worked problems from lectures, homework, tutorials &amp; exams with hidden solutions and status tracking</span>
          </div>
        </a>
        <a class="tool" href="formulas.html">
          <div class="tool-icon tool-icon-form">∑</div>
          <div class="tool-body">
            <b>Master Formula Sheet <span>${c.formulas.length} results →</span></b>
            <span>Every boxed theorem, identity, and distribution result indexed in lecture order with instant filtering</span>
          </div>
        </a>
      </div>
    </header>`;
  let modIdx = 0;
  for (const d of c.docs) {
    modIdx++;
    const modMin = d.chapters.reduce((a, ch) => a + ch.minutes, 0);
    const modProbs = d.chapters.reduce((a, ch) => a + ch.nProblems, 0);
    h += `<section class="doc-block">
      <div class="doc-head">
        <div class="doc-title-wrap">
          <span class="doc-num">Module 0${modIdx}</span>
          <h2>${esc(d.title)}</h2>
          ${d.about ? `<p>${inline(d.about)}</p>` : ''}
        </div>
        <div class="doc-side">
          <span class="doc-stat-meta">${d.chapters.length} ${d.chapters.length === 1 ? 'chapter' : 'chapters'} · ${modMin} min${modProbs ? ` · ${modProbs} problems` : ''}</span>
          <span class="progress-text" data-count-text="${c.slug}/${d.slug}/" data-total="${d.chapters.length}" data-short="1"></span>
          ${d.pdf ? `<a class="pdf-link" href="pdf/${encodeURI(d.pdf)}" target="_blank" rel="noopener">PDF ↗</a>` : ''}
        </div>
      </div>
      <div class="bar thin"><i data-bar-for="${c.slug}/${d.slug}/" data-total="${d.chapters.length}"></i></div>
      <ol class="chapter-list">`;
    for (const ch of d.chapters) {
      h += `<li><a data-id="${ch.id}" href="${root1}${ch.id}.html"><span class="tick" aria-hidden="true"></span><span class="ch-text">${ch.kicker ? `<small>${esc(ch.kicker)}</small>` : ''}<span>${inline(ch.title)}</span></span><span class="ch-badges">${ch.nProblems ? `<span class="ch-prob">${ch.nProblems} ${ch.nProblems === 1 ? 'problem' : 'problems'}</span>` : ''}<span class="ch-min">${ch.minutes} min</span></span></a></li>`;
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
    <header class="page-hero">
      <div class="eyebrow-row"><span class="eyebrow-pill">Active Recall &amp; Problem Solving</span><span class="eyebrow-meta">${c.problems.length} Worked Problems</span></div>
      <h1>Problem Bank</h1>
      <p class="lede">${c.problems.length} worked problems pulled from the lecture notes, homework sets, tutorials, and past exams. Try each problem first, then reveal the step-by-step solution and log your mastery.</p>
    </header>
    <div class="practice-controls">
      <div class="filters">
        <label class="field"><span>Search problems</span><input id="f-q" type="search" placeholder="Filter by keyword, topic, or label (e.g. Bayes, B3, CLT)…" autocomplete="off"></label>
        <label class="field"><span>Note set</span><select id="f-doc"><option value="">All note sets</option>${c.docs.filter(d => c.problems.some(p => p.d === d.slug)).map(d => `<option value="${d.slug}">${esc(d.title)}</option>`).join('')}</select></label>
        <label class="field"><span>Status</span><select id="f-status"><option value="">Any status</option><option value="todo">Not attempted</option><option value="review">Review later</option><option value="done">Solved</option></select></label>
        <button class="btn primary" id="f-random" type="button">🎲 Random problem</button>
      </div>
      <div class="chips" id="f-tags">${tagList.map(t => `<button type="button" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <div class="practice-bar-wrap">
        <p class="result-count" id="p-count"></p>
      </div>
    </div>
    <div id="p-list" class="p-list"><p class="search-empty">Loading problems…</p></div>
    <div class="more-row"><button class="btn" id="p-more" type="button" hidden>Show more</button></div>
  </div>
  <script src="problems.js?v=${BUILD}" defer></script>`;
  write(`${c.slug}/practice.html`, page({ root: root1, title: `Practice · ${c.title}`, body: pbody, active: { tool: 'practice', course: c } }));

  // formulas
  let fb = `<div class="formulas">
    <nav class="crumbs"><a href="index.html">${esc(c.title)}</a><span>›</span><span>Formulas</span></nav>
    <header class="page-hero">
      <div class="eyebrow-row"><span class="eyebrow-pill">Quick Reference &amp; Derivations</span><span class="eyebrow-meta">${c.formulas.length} Boxed Results</span></div>
      <h1>Master Formula Sheet</h1>
      <p class="lede">${c.formulas.length} key theorems, identities, and boxed formulas collected across all lectures. Click any formula card to jump straight to its derivation and context in the notes.</p>
    </header>
    <div class="f-search-wrap">
      <input class="f-filter" id="formula-filter" type="search" placeholder="Filter 123 formulas by lecture, theorem, or topic (e.g. Bayes, MGF, Gaussian, Markov, MLE)…" aria-label="Filter formulas">
    </div>`;
  let lastCh = '';
  for (const f of c.formulas) {
    if (f.ch !== lastCh) { if (lastCh) fb += '</div></section>'; fb += `<section class="f-group"><h2><a href="${root1}${f.ch}.html">${esc(f.chTitle)}</a></h2><div class="f-grid">`; lastCh = f.ch; }
    fb += `<a class="f-card" href="${root1}${f.ch}.html${f.hid ? '#' + f.hid : ''}" data-text="${esc(plain(f.chTitle + ' ' + f.htext).toLowerCase())}"><div class="math-d">${renderMath(f.tex.replace(/\\boxed\s*/g, ''), true)}</div><span>${inline(f.htext || f.chTitle)}</span></a>`;
  }
  if (lastCh) fb += '</div></section>';
  fb += '</div>';
  write(`${c.slug}/formulas.html`, page({ root: root1, title: `Formulas · ${c.title}`, body: fb, active: { tool: 'formulas', course: c } }));

  const flat = c.docs.flatMap(d => d.chapters.map(ch => ({ d, ch })));
  flat.forEach(({ d, ch }, i) => {
    const root = '../../';
    const prev = flat[i - 1], next = flat[i + 1];
    meta.titles[ch.id] = ch.full;
    const nav = x => x ? `<a class="pn pn-${x === prev ? 'prev' : 'next'}" id="${x === prev ? 'prev-link' : 'next-link'}" href="${root}${x.ch.id}.html"><small>${x === prev ? '← Previous chapter' : 'Next chapter →'}</small><span>${x.ch.kicker ? esc(x.ch.kicker) + ': ' : ''}${inline(x.ch.title)}</span></a>` : '<span></span>';
    const metaChips = [
      ch.meta ? `<span class="meta-chip">${esc(ch.meta)}</span>` : '',
      `<span class="meta-chip">⏱ ${ch.minutes} min read</span>`,
      ch.nProblems ? `<span class="meta-chip accent">✓ ${ch.nProblems} practice ${ch.nProblems === 1 ? 'problem' : 'problems'}</span>` : ''
    ].filter(Boolean).join('');
    const body = `<article class="note">
      <nav class="crumbs"><a href="${root}${c.slug}/index.html">${esc(c.title)}</a><span>›</span><span>${esc(d.title)}</span></nav>
      <header class="note-head">
        ${ch.kicker ? `<p class="eyebrow">${esc(ch.kicker)}</p>` : ''}
        <h1>${inline(ch.title)}</h1>
        <div class="note-meta">${metaChips}</div>
        <div class="note-tools">
          ${ch.hasSol ? '<button class="btn small" id="sol-toggle" type="button">Show all solutions</button>' : ''}
          <button class="btn small ghost" id="focus-btn" type="button" title="Toggle distraction-free reading mode (Shortcut: f)">Focus mode</button>
          ${ch.hasSol ? '<span class="hint">Solutions stay hidden until you click them.</span>' : ''}
        </div>
      </header>
      <div class="prose">${ch.html}</div>
      <div class="done-row">
        <div class="done-card">
          <div class="done-copy">
            <b>Finished reading this chapter?</b>
            <span>Mark it complete to track your progress across ${esc(c.title)}.</span>
          </div>
          <button class="done-btn" id="done-btn" type="button" aria-pressed="false">Mark as done</button>
        </div>
      </div>
      <nav class="prevnext">${nav(prev)}${nav(next)}</nav>
    </article>`;
    const ol = ch.outline.length > 1 ? `<aside class="outline" aria-label="On this page"><div class="outline-inner"><p>On this page</p>${ch.outline.map(o => `<a class="l${o.level}" href="#${o.id}">${inline(o.text)}</a>`).join('')}</div></aside>` : '';
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
