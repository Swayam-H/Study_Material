"""Tiny Chen-notation ER/EER and relational-schema SVG drawer (Elmasri-Navathe style).

Usage (ER):
    d = ER()
    d.entity('EMPLOYEE', 200, 100)                 # strong entity
    d.entity('DEPENDENT', 200, 300, weak=True)     # weak entity: double rectangle
    d.rel('WORKS_FOR', 400, 100)                   # relationship diamond
    d.rel('DEPENDENTS_OF', 200, 200, ident=True)   # identifying: double diamond
    d.attr('EMPLOYEE', 'Ssn', -80, -60, key=True)  # offsets from owner centre
    d.attr('EMPLOYEE', 'Name', 0, -70, parts=[('Fname', -60, -50), ('Lname', 60, -50)])
    d.attr('EMPLOYEE', 'Phone', 90, -50, multi=True)
    d.attr('EMPLOYEE', 'Age', 90, 50, derived=True)
    d.attr('DEPENDENT', 'Name', 90, 0, partial=True)
    d.link('EMPLOYEE', 'WORKS_FOR', '(1,1)', total=True)   # label sits by the first (entity) end
    d.spec('s1', 300, 300, 'd')                    # circle with d / o / U
    d.sup('PERSON', 's1', total=True)              # superclass line
    d.sub('s1', 'STUDENT')                         # subclass line with subset mark
    d.note('text', x, y)
    open('x.svg','w').write(d.svg())
"""
import math
from html import escape

W_UP, W_LO, W_DIG, W_OTHER = 8.2, 6.6, 6.9, 5.2
FONT = "font-family:Helvetica,Arial,sans-serif"
INK = '#1f2d4d'
ENT_FILL, REL_FILL, ATT_FILL, SPEC_FILL = '#e8f0ff', '#fff1dc', '#ffffff', '#f3e8ff'


def tw(s, size=12):
    w = 0
    for ch in s:
        if ch.isupper(): w += W_UP
        elif ch.islower(): w += W_LO
        elif ch.isdigit(): w += W_DIG
        elif ch in '_-': w += 6.4
        elif ch == ' ': w += 3.6
        else: w += W_OTHER
    return w * size / 12.0


class Node:
    def __init__(self, kind, name, x, y, w, h, **kw):
        self.kind, self.name, self.x, self.y, self.w, self.h = kind, name, x, y, w, h
        self.__dict__.update(kw)

    def boundary(self, tx, ty):
        """Point where the segment centre->(tx,ty) leaves the shape."""
        dx, dy = tx - self.x, ty - self.y
        if dx == 0 and dy == 0: return self.x, self.y
        hw, hh = self.w / 2, self.h / 2
        if self.kind == 'ent':
            s = min(hw / abs(dx) if dx else 1e9, hh / abs(dy) if dy else 1e9)
        elif self.kind == 'rel':
            s = 1.0 / (abs(dx) / hw + abs(dy) / hh)
        else:  # ellipse / circle
            s = 1.0 / math.sqrt((dx / hw) ** 2 + (dy / hh) ** 2)
        return self.x + dx * s, self.y + dy * s


class ER:
    def __init__(self, title=None):
        self.nodes, self.edges, self.notes, self.order = {}, [], [], []
        self.title = title
        self._n = 0

    def _add(self, key, node):
        self.nodes[key] = node; self.order.append(key); return node

    def entity(self, name, x, y, weak=False, label=None):
        lab = label or name
        w = max(tw(lab) + 26, 84); h = 36
        return self._add(name, Node('ent', lab, x, y, w, h, weak=weak))

    def rel(self, name, x, y, ident=False, label=None):
        lab = label or name
        w = max(tw(lab, 11) + (62 if ident else 44), 80); h = 46 if not ident else 50
        return self._add(name, Node('rel', lab, x, y, w, h, ident=ident))

    def attr(self, owner, name, dx, dy, key=False, partial=False, multi=False, derived=False,
             parts=None, ident=None):
        o = self.nodes[owner]
        self._n += 1
        k = ident or f'{owner}.{name}.{self._n}'
        w = tw(name, 11) + 22; h = 26
        nd = self._add(k, Node('att', name, o.x + dx, o.y + dy, w, h, key=key, partial=partial,
                               multi=multi, derived=derived))
        self.edges.append(('plain', owner, k, None, False, None))
        for p in parts or []:
            pname, pdx, pdy = p[0], p[1], p[2]
            opts = p[3] if len(p) > 3 else {}
            self.attr(k, pname, pdx, pdy, **opts)
        return k

    def link(self, a, b, label=None, total=False, role=None, lpos=None, shift=0):
        self.edges.append(('link', a, b, label, total, role, lpos, shift))

    def spec(self, key, x, y, sym='d'):
        self._add(key, Node('spec', sym, x, y, 30, 30))

    def sup(self, superclass, spec, total=False):
        self.edges.append(('link', superclass, spec, None, total, None, None, 0))

    def sub(self, spec, subclass, mark=True):
        self.edges.append(('sub', spec, subclass, None, False, None, mark))

    def subdirect(self, superclass, subclass):
        """Single subclass without a circle (Elmasri style): line with subset mark."""
        self.edges.append(('sub', superclass, subclass, None, False, None, True))

    def note(self, text, x, y, size=11, anchor='start'):
        self.notes.append((text, x, y, size, anchor))

    # ---------- rendering ----------
    def _line(self, x1, y1, x2, y2, double=False, dash=False):
        st = f'stroke="{INK}" stroke-width="1.3"' + (' stroke-dasharray="4 3"' if dash else '')
        if not double:
            return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" {st}/>'
        L = math.hypot(x2 - x1, y2 - y1) or 1
        nx, ny = -(y2 - y1) / L * 2.2, (x2 - x1) / L * 2.2
        return (f'<line x1="{x1+nx:.1f}" y1="{y1+ny:.1f}" x2="{x2+nx:.1f}" y2="{y2+ny:.1f}" {st}/>'
                f'<line x1="{x1-nx:.1f}" y1="{y1-ny:.1f}" x2="{x2-nx:.1f}" y2="{y2-ny:.1f}" {st}/>')

    def _text(self, s, x, y, size=12, bold=False, anchor='middle', under=None, italic=False, color=INK):
        wt = ' font-weight="700"' if bold else ''
        it = ' font-style="italic"' if italic else ''
        out = (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" text-anchor="{anchor}" '
               f'dominant-baseline="central" fill="{color}" style="{FONT}"{wt}{it}>{escape(s)}</text>')
        if under:
            w = tw(s, size)
            x0 = x - w / 2 if anchor == 'middle' else x
            dash = ' stroke-dasharray="3 2"' if under == 'dash' else ''
            out += (f'<line x1="{x0:.1f}" y1="{y+size*0.62:.1f}" x2="{x0+w:.1f}" y2="{y+size*0.62:.1f}" '
                    f'stroke="{color}" stroke-width="1"{dash}/>')
        return out

    def _shape(self, n):
        x, y, w, h = n.x, n.y, n.w, n.h
        s = []
        if n.kind == 'ent':
            s.append(f'<rect x="{x-w/2:.1f}" y="{y-h/2:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{ENT_FILL}" stroke="{INK}" stroke-width="1.5"/>')
            if n.weak:
                s.append(f'<rect x="{x-w/2+4:.1f}" y="{y-h/2+4:.1f}" width="{w-8:.1f}" height="{h-8:.1f}" fill="none" stroke="{INK}" stroke-width="1.2"/>')
            s.append(self._text(n.name, x, y, 12, bold=True))
        elif n.kind == 'rel':
            pts = f'{x},{y-h/2} {x+w/2},{y} {x},{y+h/2} {x-w/2},{y}'
            s.append(f'<polygon points="{pts}" fill="{REL_FILL}" stroke="{INK}" stroke-width="1.5"/>')
            if n.ident:
                pts2 = f'{x},{y-h/2+6} {x+w/2-10},{y} {x},{y+h/2-6} {x-w/2+10},{y}'
                s.append(f'<polygon points="{pts2}" fill="none" stroke="{INK}" stroke-width="1.2"/>')
            s.append(self._text(n.name, x, y, 11, bold=True))
        elif n.kind == 'att':
            dash = ' stroke-dasharray="4 3"' if n.derived else ''
            s.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{w/2:.1f}" ry="{h/2:.1f}" fill="{ATT_FILL}" stroke="{INK}" stroke-width="1.2"{dash}/>')
            if n.multi:
                s.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{w/2-4:.1f}" ry="{h/2-4:.1f}" fill="none" stroke="{INK}" stroke-width="1"/>')
            under = 'solid' if n.key else ('dash' if n.partial else None)
            s.append(self._text(n.name, x, y, 11, under=under))
        elif n.kind == 'spec':
            s.append(f'<circle cx="{x}" cy="{y}" r="15" fill="{SPEC_FILL}" stroke="{INK}" stroke-width="1.5"/>')
            sym = '∪' if n.name in ('U', 'u') else n.name
            s.append(self._text(sym, x, y + (1 if sym != '∪' else 0), 14, bold=True))
        return ''.join(s)

    def _edge(self, e):
        kind, a, b = e[0], e[1], e[2]
        A, B = self.nodes[a], self.nodes[b]
        x1, y1 = A.boundary(B.x, B.y)
        x2, y2 = B.boundary(A.x, A.y)
        out = []
        if kind == 'plain':
            out.append(self._line(x1, y1, x2, y2))
        elif kind == 'link':
            label, total, role, lpos = e[3], e[4], e[5], e[6]
            sh = e[7] if len(e) > 7 else 0
            if sh:
                L0 = math.hypot(B.x - A.x, B.y - A.y) or 1
                px, py = -(B.y - A.y) / L0 * sh, (B.x - A.x) / L0 * sh
                x1, y1 = A.boundary(B.x + px, B.y + py); x1 += px; y1 += py
                x2, y2 = B.boundary(A.x + px, A.y + py); x2 += px; y2 += py
            out.append(self._line(x1, y1, x2, y2, double=total))
            L = math.hypot(x2 - x1, y2 - y1) or 1
            ux, uy = (x2 - x1) / L, (y2 - y1) / L
            nx, ny = -uy, ux
            if label:
                d = lpos if lpos is not None else min(22 + tw(label, 11) / 2, L * 0.45)
                side = 11 if not total else 13
                # put label on the side that points "up/left" for readability
                if ny > 0 or (abs(ny) < 1e-6 and nx > 0): nx, ny = -nx, -ny
                lx, ly = x1 + ux * d + nx * side, y1 + uy * d + ny * side
                out.append(f'<rect x="{lx-tw(label,11)/2-2:.1f}" y="{ly-7:.1f}" width="{tw(label,11)+4:.1f}" height="14" fill="#fff" opacity="0.85"/>')
                out.append(self._text(label, lx, ly, 11, bold=True, color='#b4232a'))
            if role:
                d = L * 0.55
                lx, ly = x1 + ux * d - nx * 12, y1 + uy * d - ny * 12
                out.append(self._text(role, lx, ly, 10, italic=True, color='#3c5a99'))
        elif kind == 'sub':
            mark = e[6]
            out.append(self._line(x1, y1, x2, y2))
            if mark:
                L = math.hypot(x2 - x1, y2 - y1) or 1
                ux, uy = (x2 - x1) / L, (y2 - y1) / L
                mx, my = (x1 + x2) / 2, (y1 + y2) / 2
                ang = math.degrees(math.atan2(uy, ux))
                # subset symbol opening towards the superclass (i.e. away from the subclass)
                out.append(f'<path d="M 6 -8 A 8 8 0 0 0 6 8" transform="translate({mx:.1f},{my:.1f}) rotate({ang+180:.1f})" fill="none" stroke="{INK}" stroke-width="1.6"/>')
        return ''.join(out)

    def bbox(self):
        xs0, ys0, xs1, ys1 = [], [], [], []
        for n in self.nodes.values():
            xs0.append(n.x - n.w / 2); xs1.append(n.x + n.w / 2)
            ys0.append(n.y - n.h / 2); ys1.append(n.y + n.h / 2)
        for t, x, y, size, anc in self.notes:
            w = tw(t, size)
            x0 = x if anc == 'start' else x - w / 2
            xs0.append(x0); xs1.append(x0 + w); ys0.append(y - 8); ys1.append(y + 8)
        return min(xs0), min(ys0), max(xs1), max(ys1)

    def svg(self, pad=16):
        x0, y0, x1, y1 = self.bbox()
        x0 -= pad; y0 -= pad; x1 += pad; y1 += pad
        top = 0
        parts = []
        if self.title:
            top = 26
            parts.append(self._text(self.title, x0 + 8, y0 - top + 14, 13, bold=True, anchor='start'))
        W, H = x1 - x0, y1 - y0 + top
        body = []
        for e in self.edges: body.append(self._edge(e))
        for k in self.order: body.append(self._shape(self.nodes[k]))
        for t, x, y, size, anc in self.notes:
            body.append(self._text(t, x, y, size, anchor=anc, color='#444'))
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.0f} {y0-top:.0f} {W:.0f} {H:.0f}" '
                f'width="{W:.0f}" height="{H:.0f}" role="img">'
                f'<rect x="{x0:.0f}" y="{y0-top:.0f}" width="{W:.0f}" height="{H:.0f}" fill="#fff"/>'
                + ''.join(parts) + ''.join(body) + '</svg>')


class Schema:
    """Relational schema diagram, Elmasri Fig 5.7 style.
    s = Schema(); s.rel('EMPLOYEE', ['Ssn*', 'Fname', 'Dno']); s.fk('EMPLOYEE.Dno', 'DEPARTMENT.Dnumber')
    A trailing * marks a primary-key attribute (underlined)."""
    CH, ROWGAP, LEFT = 26, 58, 46

    def __init__(self, title=None):
        self.rels, self.fks, self.title = [], [], title

    def rel(self, name, attrs):
        self.rels.append((name, attrs))

    def fk(self, src, dst):
        self.fks.append((src, dst))

    def svg(self):
        cells, y = {}, 0
        nf = len(self.fks)
        lane_w = 9
        left = self.LEFT + nf * lane_w
        out_shapes = []
        rows = []
        maxx = 0
        for name, attrs in self.rels:
            y += 22
            out_shapes.append(f'<text x="{left}" y="{y-6}" font-size="12" font-weight="700" fill="{INK}" style="{FONT}">{escape(name)}</text>')
            x = left
            for a in attrs:
                pk = a.endswith('*'); a2 = a.rstrip('*')
                w = max(tw(a2, 11) + 18, 44)
                cells[f'{name}.{a2}'] = (x, y, w)
                out_shapes.append(f'<rect x="{x:.1f}" y="{y}" width="{w:.1f}" height="{self.CH}" fill="#fff" stroke="{INK}" stroke-width="1.2"/>')
                tx = x + w / 2
                out_shapes.append(f'<text x="{tx:.1f}" y="{y+self.CH/2}" font-size="11" text-anchor="middle" dominant-baseline="central" fill="{INK}" style="{FONT}">{escape(a2)}</text>')
                if pk:
                    uw = tw(a2, 11)
                    out_shapes.append(f'<line x1="{tx-uw/2:.1f}" y1="{y+self.CH/2+7}" x2="{tx+uw/2:.1f}" y2="{y+self.CH/2+7}" stroke="{INK}" stroke-width="1"/>')
                x += w
            maxx = max(maxx, x)
            rows.append((name, y))
            y += self.CH + self.ROWGAP + 0
        rowy = dict(rows)
        # arrows
        arrows = []
        colors = ['#b4232a', '#1d6fb8', '#2f8a3a', '#9a4fb3', '#c06a00', '#00838f', '#6d4c41', '#ad1457']
        below_count, above_count = {}, {}
        for i, (src, dst) in enumerate(self.fks):
            if src not in cells or dst not in cells:
                raise KeyError(f'{src} or {dst}')
            sx, sy, sw = cells[src]; dx, dy, dw = cells[dst]
            sname, dname = src.split('.')[0], dst.split('.')[0]
            col = colors[i % len(colors)]
            lx = self.LEFT - 10 + (nf - i) * lane_w
            bi = below_count.get(sname, 0); below_count[sname] = bi + 1
            ai = above_count.get(dname, 0); above_count[dname] = ai + 1
            y_src_lane = sy + self.CH + 8 + bi * 6
            y_dst_lane = dy - 26 - ai * 5
            p0x = sx + sw / 2 + (bi % 3 - 1) * 4
            p1x = dx + dw / 2 + (ai % 3 - 1) * 5
            d = (f'M {p0x:.1f} {sy+self.CH} L {p0x:.1f} {y_src_lane:.1f} L {lx:.1f} {y_src_lane:.1f} '
                 f'L {lx:.1f} {y_dst_lane:.1f} L {p1x:.1f} {y_dst_lane:.1f} L {p1x:.1f} {dy-2}')
            arrows.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="1.4"/>')
            arrows.append(f'<path d="M {p1x-4:.1f} {dy-9} L {p1x:.1f} {dy-1} L {p1x+4:.1f} {dy-9} Z" fill="{col}"/>')
        W = maxx + 16; H = y - self.ROWGAP + 16
        top = 0; title = ''
        if self.title:
            top = 22
            title = f'<text x="8" y="{-top+14}" font-size="13" font-weight="700" fill="{INK}" style="{FONT}">{escape(self.title)}</text>'
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-top} {W:.0f} {H+top:.0f}" width="{W:.0f}" height="{H+top:.0f}" role="img">'
                f'<rect x="0" y="{-top}" width="{W:.0f}" height="{H+top:.0f}" fill="#fff"/>' + title
                + ''.join(arrows) + ''.join(out_shapes) + '</svg>')
