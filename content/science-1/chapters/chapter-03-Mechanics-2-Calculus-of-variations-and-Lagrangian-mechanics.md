# Learn: Calculus of variations and Lagrangian mechanics

Lagrangian mechanics replaces forces by a single scalar function L = T − U and a single principle, that the true motion makes the action stationary. The mathematics behind it is the calculus of variations. Sources: slides `Lagrangian.tex:1` to `:334`, MT ch 6–7, HW lectures 6–7 (MT E6.1–E6.5, E7.3–E7.17). Questions follow the 2025 midsem Q6 and Q12, the 2026 midsem Q2 and Q4–Q7, and Section C of the practice set.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Describing a whole path at once

Newton's laws are local in time. They tell us how the state of a system changes from one instant to the next, and the path is found by adding up these small steps. There is another way of looking at motion, in which the whole path is described at once by some property it has. Light gives the oldest example. Fermat proposed that light travelling from one point to another follows the path that takes the least time. Applied to light crossing from one medium into another, where its speed changes, this principle gives Snell's law of refraction directly. A mechanical example is the brachistochrone problem: along which curve does a bead slide, from rest under gravity, from one point to a lower one in the shortest time? The answer is not the straight line but a cycloid, which drops steeply at first to gain speed early.

## The calculus of variations

Such problems ask for the function y(x) that makes an integral J = ∫f(y, y′, x) dx stationary, with the end points held fixed. This is a different kind of optimisation from finding the minimum of a function, because the unknown is an entire curve. The method is to compare the true curve with nearby ones, y(x) + αη(x), where η is any smooth function that vanishes at the end points. For the true curve J must be stationary as α passes through zero. Differentiating under the integral and integrating the η′ term by parts, the boundary terms vanish and we are left with ∫\[∂f/∂y − d/dx(∂f/∂y′)\]η dx = 0. Since this must hold for every η, the bracket itself must vanish, giving the Euler equation ∂f/∂y − d/dx(∂f/∂y′) = 0. When f does not depend explicitly on x, a first integral follows at once: f − y′∂f/∂y′ is constant. This second form is often the quicker route, and it is the one used for the brachistochrone.

## Hamilton's principle

Mechanics can be put in the same form. Hamilton's principle states that of all the paths a system could take between two configurations in a given time, the actual path is the one for which the action S = ∫L dt is stationary, where the Lagrangian L = T − U is the kinetic energy minus the potential energy. Applying the Euler equation with t in place of x gives the Euler–Lagrange equations, d/dt(∂L/∂q̇) = ∂L/∂q. For a single particle in Cartesian coordinates these are exactly Newton's equations mẍ = −∂U/∂x, so nothing new has been added to the physics. What has been gained is a far more convenient formulation.

## Generalised coordinates and constraints

The great advantage of the Lagrangian method is that the action is a scalar, and its stationary value does not depend on which coordinates are used to describe the path. Any set of independent quantities that fixes the configuration, called generalised coordinates, will do, and the Euler–Lagrange equations take the same form in all of them. The number of such coordinates is the number of degrees of freedom. A simple pendulum, for example, needs only the angle θ. Writing T = ½ml²θ̇² and U = −mgl cosθ gives the equation ml²θ̈ = −mgl sinθ at once, without ever mentioning the tension in the string. This is typical. Constraints that are built into the choice of coordinates never appear in the equations, and the forces that maintain them, which do no work, need not be found.

The same method handles more complicated systems with little extra effort. For a particle moving on the inside of a cone, the "wall of death", two coordinates r and θ suffice, and since θ does not appear in the Lagrangian the angular momentum about the axis is conserved. For a block on an incline whose angle increases at a steady rate, the Lagrangian depends explicitly on time, and the energy is then not conserved. For a double pendulum, two angles describe the system, and the Lagrangian leads directly to two coupled equations of motion, which would be laborious to obtain from free-body diagrams.

Sometimes we want the constraint forces, or the constraint cannot conveniently be built into the coordinates. Then the constraint, written as an equation g(q) = 0, is added with a Lagrange multiplier λ, and the equations become ∂L/∂qⱼ − d/dt(∂L/∂q̇ⱼ) + λ∂g/∂qⱼ = 0. For a disk rolling without slipping down an incline, with the constraint y = Rθ, this gives the acceleration g sinα/(1 + I/MR²), and the size of λ is the friction force that enforces rolling.

## Symmetries and conservation laws

The Lagrangian method shows clearly where conservation laws come from. If L does not contain a coordinate qₖ, that coordinate is called cyclic, and the Euler–Lagrange equation gives d/dt(∂L/∂q̇ₖ) = 0, so the conjugate momentum pₖ = ∂L/∂q̇ₖ is constant. Each such conservation law reflects a symmetry. If the Lagrangian is unchanged when the whole system is displaced in space, the total linear momentum is conserved. If it is unchanged when the system is rotated, the angular momentum is conserved. And if L does not depend explicitly on time, so that the laws are the same today as tomorrow, the quantity Σq̇ₖpₖ − L is conserved, which for ordinary systems is the total energy. Homogeneity of space, isotropy of space and homogeneity of time thus underlie the three great conservation laws of mechanics.

## Newton and Lagrange compared

Both formulations lead to second-order differential equations and describe exactly the same physics. Newton's method works with vector forces in Cartesian coordinates and handles constraints by finding and balancing the constraint forces. Lagrange's method works with two scalar energies in any convenient coordinates and handles constraints either by choosing coordinates that satisfy them automatically or by multipliers. The Lagrangian approach is usually simpler for constrained systems and is the natural starting point for the Hamiltonian formulation, for quantum mechanics and for field theory, while Newton's method remains the natural one for dissipative forces such as friction, which have no potential. The variational idea also reaches beyond physics: training a machine-learning model is itself the problem of choosing a function to minimise an integral of the error.

# Reference: Calculus of variations and Lagrangian mechanics

The course material section by section, in the order of the textbook, with the key formulas.

## Calculus of variations (MT ch 6, `Lagrangian.tex:40`)

- Find y(x) making J = ∫f(y, y′; x) dx stationary, end points fixed.
- Vary y → y + αη with η(x₁) = η(x₂) = 0; set ∂J/∂α = 0 at α = 0; integrate by parts.

$$
\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'} = 0,\qquad \text{if } \frac{\partial f}{\partial x} = 0:\quad f - y'\frac{\partial f}{\partial y'} = \text{const}
$$

- If f has no y: ∂f/∂y′ = constant.
- Shortest path in a plane: f = √(1 + y′²), straight line.
- Brachistochrone (MT E6.2): T = ∫√(1 + y′²)/√(2gx) dx, gives y′²/\[x(1 + y′²)\] = 1/2a, a cycloid x = a(1 − cosφ), y = a(φ − sinφ).
- Fermat's least time gives Snell's law n₁ sinθ₁ = n₂ sinθ₂.
- Other examples: hanging chain (catenary), isoperimetric problem, ML training (minimise ∫\[y − f\_θ(x)\]² dx).

## Hamilton's principle and Lagrange's equations (MT 7.1–7.6)

$$
S = \int_{t_1}^{t_2} L\,dt,\quad L = T - U,\qquad \delta S = 0 \iff \frac{d}{dt}\frac{\partial L}{\partial \dot q_k} = \frac{\partial L}{\partial q_k}
$$

- Generalised coordinates: any independent set fixing the configuration; number = degrees of freedom (3N minus number of constraints).
- Recipe: choose q's, write T and U in them, form L, apply E–L to each q.
- Constraint forces that do no work never appear.

## Worked examples from the slides

| System | Coordinates | Result |
| --- | --- | --- |
| Simple pendulum (MT E7.2) | θ | ml²θ̈ = −mgl sinθ; small θ: ω² = g/l |
| Wall of death, cone half-angle α (MT E7.4) | r, θ | mr²θ̇ constant; r̈ = rθ̇² sin²α − g sinα cosα (the slide drops g) |
| Block on incline rising at θ = αt (MT P7.12) | q along incline | q̈ = α²q − g sinαt; L has explicit t, energy not conserved |
| Disk rolling down incline (MT E7.9) | y, θ with y = Rθ | ÿ = g sinα/(1 + I/MR²) = ⅔g sinα for a uniform disk |

## Constraints with multipliers (`Lagrangian.tex:259`)

$$
\frac{\partial L}{\partial q_j} - \frac{d}{dt}\frac{\partial L}{\partial \dot q_j} + \sum_k \lambda_k \frac{\partial f_k}{\partial q_j} = 0,\qquad f_k(q, t) = 0
$$

- λₖ∂fₖ/∂qⱼ is the generalised constraint force.

## Symmetries and conservation (MT 7.9)

- Cyclic qₖ (∂L/∂qₖ = 0): pₖ = ∂L/∂q̇ₖ conserved.
- Time symmetry (∂L/∂t = 0): H = Σq̇ₖpₖ − L conserved; equals E for L = ½mv² − U(x).
- Translation symmetry: linear momentum conserved.
- Rotation symmetry (δr = δθ × r): angular momentum r × p conserved.

## Newton vs Lagrange (`Lagrangian.tex:290`)

|  | Newtonian | Lagrangian |
| --- | --- | --- |
| Equation | mẍₖ = Fₖ | d/dt(∂L/∂q̇ₖ) = ∂L/∂qₖ |
| Order | second | second |
| Coordinates | Cartesian (vectors) | any generalised |
| Interactions via | forces | energies (scalars) |
| Constraints | balance constraint forces | built into coordinates, or multipliers |
| Same physics | yes | yes; friction is awkward |

## What to be able to do without notes

- Derive the Euler equation and its second form; solve the shortest path, Snell's law, brachistochrone.
- State Hamilton's principle and write the action.
- Set up L for pendulum, double pendulum, cone, rising incline, rolling disk, accelerated support.
- Use a multiplier for a rolling or surface constraint.
- Explain cyclic coordinates and the symmetry–conservation link.
- Compare Newton and Lagrange.

# Practice: Calculus of variations and Lagrangian mechanics

24 questions with worked answers (tap a solution to open it). Points in brackets, midsem style.

## A. State and explain

### Problem 1 [Mechanics 2 · Recall · 3 pts · 2026 midsem Q6]

What is Hamilton's principle? Write the mathematical expression for it.

*Solution.* Of all paths a system could follow between two configurations in a fixed time interval, the actual path makes the action stationary: δ∫\_{t₁}^{t₂} L(q, q̇, t) dt = 0, with L = T − U.

### Problem 2 [Mechanics 2 · Recall · 3 pts · 2026 midsem Q2]

What is the Lagrangian? For L({qᵢ}, {q̇ᵢ}, t), what happens when q₁ does not appear explicitly?

*Solution.* L = T − U as a function of generalised coordinates, velocities and time. If q₁ is absent (cyclic), ∂L/∂q₁ = 0, so d/dt(∂L/∂q̇₁) = 0 and the conjugate momentum p₁ is conserved.

### Problem 3 [Mechanics 2 · Recall · 4 pts · 2025 Q6, 2026 Q5]

State the differences between Newtonian and Lagrangian mechanics.

*Solution.* Newton: vector forces, Cartesian coordinates, constraint forces must be found and balanced. Lagrange: scalar energies, any generalised coordinates, constraints built in or handled by multipliers; conservation laws appear through cyclic coordinates. Both give second-order equations and the same physics; Newton handles friction more naturally.

### Problem 4 [Mechanics 2 · Recall · 2 pts]

What are generalised coordinates and degrees of freedom? Give the number for a double pendulum in a plane.

*Solution.* Independent quantities that fix the configuration; their number is the number of degrees of freedom. Planar double pendulum: 2 (θ₁, θ₂), from 4 Cartesian coordinates minus 2 rod constraints.

### Problem 5 [Mechanics 2 · Recall · 2 pts]

Why do constraint forces not appear in Lagrange's equations? When would you use a Lagrange multiplier?

*Solution.* Ideal constraint forces do no work in displacements allowed by the constraint, so they drop out of the variation. Use a multiplier when you want the constraint force, or when the constraint is awkward to build into the coordinates (e.g. rolling y = Rθ, or r = R on a sphere).

### Problem 6 [Mechanics 2 · Recall · 3 pts]

Explain how time, translation and rotation symmetry lead to conservation of energy, momentum and angular momentum.

*Solution.* Time symmetry (∂L/∂t = 0) gives d/dt(Σq̇p − L) = 0: energy. Translation: L unchanged by δr with δv = 0 gives ∂L/∂x = 0, so pₓ is constant. Rotation: δL = 0 for δr = δθ × r gives d/dt(r × p) = 0.

### Problem 7 [Mechanics 2 · Recall · 2 pts]

How is calculus-of-variations optimisation different from ordinary function optimisation?

*Solution.* The unknown is a whole function y(x), a point in an infinite-dimensional space, and J depends on all its values; the stationarity condition is a differential equation rather than an algebraic one.

## B. Show or derive

### Problem 8 [Mechanics 2 · Derivation · 4 pts]

Derive the Euler equation for J = ∫f(y, y′; x) dx, and its second form when f has no explicit x.

*Solution.* J(α) = ∫f(y + αη, y′ + αη′, x) dx. ∂J/∂α = ∫(f\_yη + f\_y′η′) dx. Integrate the second term by parts; boundary terms vanish since η = 0 at the ends: ∫(f\_y − d/dx f\_y′)η dx = 0 for all η, so f\_y = d/dx f\_y′. Second form: df/dx = y′f\_y + y″f\_y′ + f\_x = d/dx(y′f\_y′) + f\_x, so if f\_x = 0, f − y′f\_y′ = constant.

### Problem 9 [Mechanics 2 · Derivation · 3 pts · 2026 midsem Q4]

Show that Fermat's principle of least time leads to Snell's law.

*Solution.* A at height a above the interface, B at depth b below, horizontal separation d, crossing at x. t = √(a² + x²)/v₁ + √(b² + (d − x)²)/v₂. dt/dx = x/(v₁√(a² + x²)) − (d − x)/(v₂√(b² + (d − x)²)) = sinθ₁/v₁ − sinθ₂/v₂ = 0. With v = c/n: n₁ sinθ₁ = n₂ sinθ₂.

### Problem 10 [Mechanics 2 · Derivation · 2 pts]

Show that the shortest path between two points in a plane is a straight line.

*Solution.* f = √(1 + y′²) has no y, so ∂f/∂y′ = y′/√(1 + y′²) = constant, so y′ = constant: a straight line.

### Problem 11 [Mechanics 2 · Derivation · 4 pts · MT E6.2]

Set up the brachistochrone integral and show the curve satisfies y′²/\[x(1 + y′²)\] = constant.

*Solution.* Speed after falling x from rest: v = √(2gx). Time = ∫ds/v = ∫√(1 + y′²)/√(2gx) dx. f has no y, so ∂f/∂y′ = y′/√(2gx(1 + y′²)) = constant. Squaring: y′²/\[x(1 + y′²)\] = 1/2a, whose solution is a cycloid.

### Problem 12 [Mechanics 2 · Derivation · 8 pts · 2026 midsem Q7] (hard)

A double pendulum has point masses m₁, m₂ on massless rods l₁, l₂. Identify the generalised coordinates and degrees of freedom, construct L, and obtain the equations of motion.

*Solution.* Coordinates θ₁, θ₂ from the vertical; 2 degrees of freedom. T = ½(m₁ + m₂)l₁²θ̇₁² + ½m₂l₂²θ̇₂² + m₂l₁l₂θ̇₁θ̇₂cos(θ₁ − θ₂). U = −(m₁ + m₂)gl₁cosθ₁ − m₂gl₂cosθ₂. E–L for θ₁: (m₁ + m₂)l₁²θ̈₁ + m₂l₁l₂θ̈₂cos(θ₁ − θ₂) + m₂l₁l₂θ̇₂²sin(θ₁ − θ₂) + (m₁ + m₂)gl₁sinθ₁ = 0. For θ₂: m₂l₂²θ̈₂ + m₂l₁l₂θ̈₁cos(θ₁ − θ₂) − m₂l₁l₂θ̇₁²sin(θ₁ − θ₂) + m₂gl₂sinθ₂ = 0.

### Problem 13 [Mechanics 2 · Derivation · 5 pts · 2025 midsem Q12]

Repeat Q12 for two uniform rods of masses m₁, m₂ hinged together (no point masses). Only write L.

*Solution.* Rod 1 rotates about the pivot: T₁ = (1/6)m₁l₁²θ̇₁². Rod 2: its centre moves with velocity from l₁θ̇₁ and (l₂/2)θ̇₂, plus rotation about its centre: T₂ = ½m₂\[l₁²θ̇₁² + (l₂²/4)θ̇₂² + l₁l₂θ̇₁θ̇₂cos(θ₁ − θ₂)\] + (1/24)m₂l₂²θ̇₂². U = −m₁g(l₁/2)cosθ₁ − m₂g(l₁cosθ₁ + (l₂/2)cosθ₂). L = T₁ + T₂ − U; the E–L equations follow as in Q12.

### Problem 14 [Mechanics 2 · Derivation · 4 pts · MT E7.4]

A particle moves on the inside of a cone of half-angle α under gravity. Find L and the equations of motion. What is conserved?

*Solution.* z = r cotα, v² = ṙ²csc²α + r²θ̇², U = mgr cotα. L = ½m(ṙ²csc²α + r²θ̇²) − mgr cotα. θ cyclic: mr²θ̇ = constant (angular momentum about the axis). r: mr̈ csc²α = mrθ̇² − mg cotα, i.e. r̈ = rθ̇²sin²α − g sinα cosα. Energy is also conserved.

### Problem 15 [Mechanics 2 · Derivation · 3 pts · MT P7.12, practice P19]

A block slides on a smooth incline whose angle grows as θ = αt. Find the equation of motion. Is energy conserved?

*Solution.* L = ½m(q̇² + q²α²) − mgq sinαt. E–L: q̈ = α²q − g sinαt. L depends explicitly on t (the plane is driven), so energy is not conserved.

### Problem 16 [Mechanics 2 · Derivation · 4 pts · MT E7.9]

A disk rolls without slipping down an incline of angle α. Using a Lagrange multiplier, find its acceleration and the friction force.

*Solution.* L = ½Mẏ² + ½Iθ̇² + Mgy sinα, constraint y − Rθ = 0. Equations: Mg sinα − Mÿ + λ = 0, −Iθ̈ − λR = 0. With θ̈ = ÿ/R: λ = −Iÿ/R² and ÿ = g sinα/(1 + I/MR²). Uniform disk (I = ½MR²): ÿ = ⅔g sinα, friction |λ| = ⅓Mg sinα, acting up the slope.

### Problem 17 [Mechanics 2 · Derivation · 3 pts · practice P20]

A pendulum of length b hangs from a support accelerating horizontally at a. Find the equation of motion and the period of small oscillations.

*Solution.* In the support's frame there is a pseudo-force −ma, so the effective gravity is √(g² + a²) at angle tan⁻¹(a/g) from the vertical. With φ measured from that direction: bφ̈ = −√(g² + a²) sinφ, period 2π√(b/√(g² + a²)). (Vertical acceleration upwards: g → g + a.)

### Problem 18 [Mechanics 2 · Derivation · 3 pts · practice P22]

A rope of mass m and length b lies on a smooth table with length z hanging over the edge. Find Lagrange's equation.

*Solution.* T = ½mż² (the whole rope moves at ż); hanging part mass mz/b with centre at z/2 below the edge, so U = −mgz²/2b. E–L: mż̈ = mgz/b, so z̈ = (g/b)z: exponential run-away.

### Problem 19 [Mechanics 2 · Derivation · 3 pts · practice P17]

A particle moves in a plane under an attractive central force f = −Ar^(α−1). Find the Lagrange equations. Are angular momentum and energy conserved?

*Solution.* U = (A/α)r^α (zero at the origin). L = ½m(ṙ² + r²θ̇²) − (A/α)r^α. θ: d/dt(mr²θ̇) = 0, angular momentum conserved. r: mr̈ − mrθ̇² + Ar^(α−1) = 0. L has no explicit t, so energy is conserved.

### Problem 20 [Mechanics 2 · Derivation · 4 pts · slides HW]

Show that if L is unchanged by any rotation δr = δθ × r, then r × p is conserved.

*Solution.* δL = (∂L/∂r)·δr + (∂L/∂v)·δv = ṗ·(δθ × r) + p·(δθ × v), using E–L for ∂L/∂r. Cyclic permutation: δθ·(r × ṗ + v × p) = δθ·d/dt(r × p). δL = 0 for every δθ, so r × p is constant.

### Problem 21 [Mechanics 2 · Derivation · 3 pts]

Show that when ∂L/∂t = 0, H = Σq̇p − L is conserved, and that it equals T + U for L = ½mv² − U(x).

*Solution.* dL/dt = Σ(∂L/∂q)q̇ + Σ(∂L/∂q̇)q̈ + ∂L/∂t. Using E–L, the first two terms are d/dt(Σq̇∂L/∂q̇). So d/dt(Σq̇p − L) = −∂L/∂t = 0. For L = ½mv² − U: Σq̇p = mv², so H = mv² − ½mv² + U = T + U.

### Problem 22 [Mechanics 2 · Derivation · 5 pts · practice P30]

A particle slides from rest at the top of a smooth sphere of radius R. Using a multiplier for r = R, find the normal force and the angle at which it leaves.

*Solution.* L = ½m(ṙ² + r²θ̇²) − mgr cosθ, constraint r − R = 0. r-equation: mŕ − mrθ̇² + mg cosθ = λ, so with r = R: λ = mg cosθ − mRθ̇². Energy: Rθ̇² = 2g(1 − cosθ). So N = λ = mg(3cosθ − 2). It leaves when N = 0: cosθ = 2/3, θ ≈ 48°.

## C. Short numericals

### Problem 23 [Mechanics 2 · Numerical · 2 pts]

Find the acceleration of a uniform hoop (I = MR²) and a uniform disk rolling down a 30° incline.

*Solution.* a = g sinα/(1 + I/MR²), with sin 30° = ½. Hoop: g/4. Disk: g/3.

### Problem 24 [Mechanics 2 · Numerical · 2 pts · practice P18a]

Two blocks of mass M are joined by a light string; one is on a smooth table, the other hangs over a pulley. Find the acceleration.

*Solution.* L = ½(2M)ẋ² + Mgx, so 2Mẍ = Mg and a = g/2.

