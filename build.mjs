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

// ---------- load content ----------
const courses = [];
const searchIndex = [];
for (const dir of fs.readdirSync(CONTENT, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()) {
  const cfgPath = path.join(CONTENT, dir, 'course.json');
  if (!fs.existsSync(cfgPath)) continue;
  const course = { slug: dir, ...JSON.parse(fs.readFileSync(cfgPath, 'utf8')) };
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
      let html = md.renderer.render(tokens, md.options, {});
      html = html.replace(/<blockquote>\n<p><strong>On the slide/g, '<blockquote class="slide">\n<p><strong>On the slide');
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
      const chTitle = plain((t.kicker ? t.kicker + ': ' : '') + t.title);
      for (const s of secs) {
        const x = searchText(s.buf.join('\n'));
        if (!x && !s.text) continue;
        searchIndex.push({ u: `${id}.html${s.id ? '#' + s.id : ''}`, c: `${course.title} · ${chTitle}`, t: s.text ? plain(s.text) : chTitle, x });
      }
      const words = body.split(/\s+/).length;
      return { ...t, slug, id, html, outline, minutes: Math.max(1, Math.round(words / 160)) };
    });
  }
  courses.push(course);
}

// ---------- templates ----------
const fontsLink = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap">';

function bellSvg() {
  const W = 320, H = 110, pts = [];
  const f = x => Math.exp(-x * x / 2);
  const X = x => ((x + 3.4) / 6.8) * W, Y = y => H - 12 - y * (H - 26);
  for (let x = -3.4; x <= 3.401; x += 0.1) pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  const tail = [];
  for (let x = 1.2; x <= 3.401; x += 0.1) tail.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  return `<svg class="bell" viewBox="0 0 ${W} ${H}" role="img" aria-label="Normal density with the right tail shaded"><polygon class="bell-tail" points="${X(1.2).toFixed(1)},${Y(0)} ${tail.join(' ')} ${X(3.4)},${Y(0)}"/><polyline class="bell-curve" fill="none" points="${pts.join(' ')}"/><line class="bell-axis" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="bell-axis" x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(0) + 5}"/><line class="bell-axis" x1="${X(1.2).toFixed(1)}" y1="${Y(0)}" x2="${X(1.2).toFixed(1)}" y2="${Y(0) + 5}"/></svg>`;
}

function sidebar(root, active) {
  let h = '';
  for (const c of courses) {
    h += `<div class="nav-course"><a class="nav-course-title" href="${root}${c.slug}/index.html">${esc(c.title)}</a>`;
    for (const d of c.docs) {
      const open = active && active.doc === d ? ' open' : '';
      if (d.chapters.length === 1) {
        const ch = d.chapters[0];
        h += `<a class="nav-link nav-single${active && active.ch === ch ? ' current' : ''}" data-id="${ch.id}" href="${root}${ch.id}.html"><span>${esc(d.title)}</span></a>`;
        continue;
      }
      h += `<details class="nav-doc"${open}><summary>${esc(d.title)}</summary>`;
      for (const ch of d.chapters) {
        h += `<a class="nav-link${active && active.ch === ch ? ' current' : ''}" data-id="${ch.id}" href="${root}${ch.id}.html">${ch.kicker ? `<small>${esc(ch.kicker)}</small>` : ''}<span>${inline(ch.title)}</span></a>`;
      }
      h += '</details>';
    }
    h += '</div>';
  }
  return h;
}

function page({ root, title, body, active, pageId = '', outline = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<script>try{var t=localStorage.getItem('notes:theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${fontsLink}
<link rel="stylesheet" href="${root}assets/katex/katex.min.css">
<link rel="stylesheet" href="${root}assets/style.css">
</head>
<body data-root="${root}" data-page="${pageId}">
<header class="top">
  <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
  <a class="brand" href="${root}index.html"><span class="brand-mark" aria-hidden="true">∑</span>${esc(site.title)}</a>
  <div class="search">
    <input id="search-input" type="search" placeholder="Search the notes" autocomplete="off" aria-label="Search the notes">
    <kbd>/</kbd>
    <div class="search-results" id="search-results" hidden></div>
  </div>
  <button class="icon-btn" id="theme-btn" aria-label="Switch theme" title="Switch theme">◐</button>
</header>
<div class="shell${outline ? ' has-outline' : ''}">
  <nav class="side" id="side" aria-label="Notes">${sidebar(root, active)}</nav>
  <main class="main">${body}</main>
  ${outline}
</div>
<div class="scrim" id="scrim" hidden></div>
<script src="${root}assets/app.js" defer></script>
</body>
</html>`;
}

function write(rel, html) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
}

// ---------- emit ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets', 'katex', 'fonts'), { recursive: true });
const kd = path.join(ROOT, 'node_modules', 'katex', 'dist');
fs.copyFileSync(path.join(kd, 'katex.min.css'), path.join(OUT, 'assets', 'katex', 'katex.min.css'));
for (const f of fs.readdirSync(path.join(kd, 'fonts')).filter(f => /\.woff2?$/.test(f)))
  fs.copyFileSync(path.join(kd, 'fonts', f), path.join(OUT, 'assets', 'katex', 'fonts', f));
for (const f of ['style.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(OUT, 'assets', f));
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
fs.writeFileSync(path.join(OUT, 'assets', 'search.js'), 'window.NOTES_SEARCH=' + JSON.stringify(searchIndex) + ';');

// home
{
  let cards = '';
  for (const c of courses) {
    const n = c.docs.reduce((a, d) => a + d.chapters.length, 0);
    cards += `<a class="course-card" href="${c.slug}/index.html" data-course="${c.slug}">
      ${bellSvg()}
      <div class="course-meta">${esc([c.code, c.term].filter(Boolean).join(' · '))}</div>
      <h2>${esc(c.title)}</h2>
      <p>${esc(c.blurb || '')}</p>
      <div class="course-foot"><span>${c.docs.length} note sets · ${n} chapters</span><span class="progress-text" data-progress-for="${c.slug}/"></span></div>
    </a>`;
  }
  const body = `<div class="home">
    <p class="eyebrow">Your courses</p>
    <h1>${esc(site.title)}</h1>
    <p class="lede">${esc(site.tagline)}</p>
    <div id="resume"></div>
    <div class="course-grid">${cards}</div>
  </div>`;
  write('index.html', page({ root: '', title: site.title, body }));
}

const titles = {};
for (const c of courses) {
  const root1 = '../';
  let h = `<div class="course-page"><p class="eyebrow">${esc([c.code, c.term].filter(Boolean).join(' · '))}</p><h1>${esc(c.title)}</h1><p class="lede">${esc(c.blurb || '')}</p>`;
  for (const d of c.docs) {
    h += `<section class="doc-block"><div class="doc-head"><div><h2>${esc(d.title)}</h2>${d.about ? `<p>${inline(d.about)}</p>` : ''}</div><div class="doc-side"><span class="progress-text" data-progress-for="${c.slug}/${d.slug}/"></span>${d.pdf ? `<a class="pdf-link" href="pdf/${encodeURI(d.pdf)}">PDF</a>` : ''}</div></div><ol class="chapter-list">`;
    for (const ch of d.chapters) {
      h += `<li><a data-id="${ch.id}" href="${root1}${ch.id}.html"><span class="tick" aria-hidden="true"></span><span class="ch-text">${ch.kicker ? `<small>${esc(ch.kicker)}</small>` : ''}<span>${inline(ch.title)}</span></span><span class="ch-min">${ch.minutes} min</span></a></li>`;
    }
    h += '</ol></section>';
    if (d.pdf) {
      fs.mkdirSync(path.join(OUT, c.slug, 'pdf'), { recursive: true });
      fs.copyFileSync(path.join(CONTENT, c.slug, 'pdf', d.pdf), path.join(OUT, c.slug, 'pdf', d.pdf));
    }
  }
  h += '</div>';
  write(`${c.slug}/index.html`, page({ root: root1, title: `${c.title} · ${site.title}`, body: h }));

  const flat = c.docs.flatMap(d => d.chapters.map(ch => ({ d, ch })));
  flat.forEach(({ d, ch }, i) => {
    const root = '../../';
    const prev = flat[i - 1], next = flat[i + 1];
    const full = plain((ch.kicker ? ch.kicker + ': ' : '') + ch.title);
    titles[ch.id] = { t: full, c: c.title };
    const nav = x => x ? `<a class="pn pn-${x === prev ? 'prev' : 'next'}" href="${root}${x.ch.id}.html"><small>${x === prev ? 'Previous' : 'Next'}</small><span>${x.ch.kicker ? esc(x.ch.kicker) + ': ' : ''}${inline(x.ch.title)}</span></a>` : '<span></span>';
    const body = `<article class="note">
      <nav class="crumbs"><a href="${root}${c.slug}/index.html">${esc(c.title)}</a><span>›</span><span>${esc(d.title)}</span></nav>
      <header class="note-head">
        ${ch.kicker ? `<p class="eyebrow">${esc(ch.kicker)}</p>` : ''}
        <h1>${inline(ch.title)}</h1>
        <p class="note-meta">${[ch.meta ? esc(ch.meta) : '', `${ch.minutes} min read`].filter(Boolean).join(' · ')}</p>
      </header>
      <div class="prose">${ch.html}</div>
      <div class="done-row"><button class="done-btn" id="done-btn" type="button" aria-pressed="false">Mark as done</button></div>
      <nav class="prevnext">${nav(prev)}${nav(next)}</nav>
    </article>`;
    const ol = ch.outline.length > 1 ? `<aside class="outline" aria-label="On this page"><p>On this page</p>${ch.outline.map(o => `<a class="l${o.level}" href="#${o.id}">${inline(o.text)}</a>`).join('')}</aside>` : '';
    write(`${ch.id}.html`, page({ root, title: `${full} · ${c.title}`, body, active: { doc: d, ch }, pageId: ch.id, outline: ol }));
  });
}
fs.writeFileSync(path.join(OUT, 'assets', 'titles.js'), 'window.NOTES_TITLES=' + JSON.stringify(titles) + ';');

const nCh = courses.reduce((a, c) => a + c.docs.reduce((b, d) => b + d.chapters.length, 0), 0);
console.log(`Built ${courses.length} course(s), ${nCh} chapters, ${searchIndex.length} search entries.`);
if (mathErrors.length) { console.log(`${mathErrors.length} math warnings:`); for (const e of mathErrors.slice(0, 40)) console.log('  ' + e); }
