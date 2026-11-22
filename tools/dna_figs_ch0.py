import os
from html import escape
OUT = os.path.join(os.path.dirname(__file__), '..', 'content', 'figures')
INK = '#1f2d4d'; FONT = "font-family:Inter,Helvetica,Arial,sans-serif"

def box(x, y, w, h, text, fill, sub=None):
    t = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{INK}" stroke-width="1.4"/>'
    cy = y + h / 2 - (7 if sub else 0)
    t += f'<text x="{x+w/2}" y="{cy}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700" fill="{INK}" style="{FONT}">{escape(text)}</text>'
    if sub:
        t += f'<text x="{x+w/2}" y="{cy+17}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="{INK}" style="{FONT}">{escape(sub)}</text>'
    return t

def arrow(x1, y1, x2, y2, both=True):
    t = f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="1.4"/>'
    import math
    for (ax, ay, bx, by) in ([(x1, y1, x2, y2), (x2, y2, x1, y1)] if both else [(x1, y1, x2, y2)]):
        a = math.atan2(by - ay, bx - ax)
        p = [(bx, by), (bx - 9*math.cos(a-0.4), by - 9*math.sin(a-0.4)), (bx - 9*math.cos(a+0.4), by - 9*math.sin(a+0.4))]
        t += '<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s"/>' % (p[0][0], p[0][1], p[1][0], p[1][1], p[2][0], p[2][1], INK)
    return t

def label(x, y, s, size=11, anchor='start', bold=False, color='#6b3fa0'):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" font-style="italic" font-weight="{700 if bold else 400}" fill="{color}" style="{FONT}">{escape(s)}</text>'

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
            f'<rect width="{w}" height="{h}" fill="#fff"/>'
            f'<text x="10" y="20" font-size="13" font-weight="700" fill="{INK}" style="{FONT}">{escape(title)}</text>' + body + '</svg>')

# three-schema architecture
b = ''
b += label(20, 62, 'End users', 12, bold=True, color=INK)
xs = [120, 300, 480]
for i, x in enumerate(xs):
    b += box(x, 45, 150, 46, f'External view {i+1}' if i < 2 else 'External view n', '#e8f0ff', 'external schema')
b += label(20, 82, 'EXTERNAL LEVEL', 10, color='#555')
b += box(150, 165, 450, 50, 'Conceptual schema', '#fff1dc', 'whole database: entities, relationships, constraints')
b += label(20, 194, 'CONCEPTUAL LEVEL', 10, color='#555')
for x in xs:
    b += arrow(x + 75, 91, x + 75 if x != 300 else 375, 165)
b += label(390, 135, 'external/conceptual mappings', 11)
b += box(150, 280, 450, 50, 'Internal schema', '#f3e8ff', 'files, record placement, indexes, access paths')
b += label(20, 309, 'INTERNAL LEVEL', 10, color='#555')
b += arrow(375, 215, 375, 280)
b += label(385, 252, 'conceptual/internal mapping', 11)
b += f'<path d="M 270 370 L 270 410 A 105 14 0 0 0 480 410 L 480 370" fill="#eef6ee" stroke="{INK}" stroke-width="1.4"/>'
b += f'<ellipse cx="375" cy="370" rx="105" ry="14" fill="#eef6ee" stroke="{INK}" stroke-width="1.4"/>'
b += f'<text x="375" y="400" text-anchor="middle" font-size="13" font-weight="700" fill="{INK}" style="{FONT}">Stored database</text>'
b += arrow(375, 330, 375, 356)
b += label(20, 445, 'Logical data independence: change the conceptual schema, keep external schemas (only the upper mappings change).', 11, color=INK)
b += label(20, 463, 'Physical data independence: change the internal schema, keep the conceptual schema (only the lower mapping changes).', 11, color=INK)
open(os.path.join(OUT, 'dna-24-three-schema.svg'), 'w').write(svg(760, 478, b, 'Three-schema architecture (Elmasri Fig 2.2)'))

# three-tier for airline
b = ''
b += box(40, 50, 210, 64, 'Client tier', '#e8f0ff', "customer's browser or app")
b += box(40, 160, 210, 74, 'Application server tier', '#fff1dc', 'fares, seat rules, payments')
b += box(40, 280, 210, 64, 'Database server tier', '#f3e8ff', 'flights, seats, bookings')
b += arrow(145, 114, 145, 160); b += arrow(145, 234, 145, 280)
b += label(155, 142, 'HTTPS: forms in, web pages out', 11)
b += label(155, 262, 'SQL via JDBC/ODBC (only this tier)', 11)
b += label(290, 80, 'Thin client: nothing to install', 11, color=INK)
b += label(290, 190, 'Business rules in one place;', 11, color=INK)
b += label(290, 206, 'many servers share the load', 11, color=INK)
b += label(290, 305, 'Concurrency control: no double-booked seat', 11, color=INK)
b += label(290, 321, 'Recovery: no half-made booking', 11, color=INK)
open(os.path.join(OUT, 'dna-214-three-tier.svg'), 'w').write(svg(560, 360, b, 'Three-tier architecture for web airline booking'))
print('ok')
