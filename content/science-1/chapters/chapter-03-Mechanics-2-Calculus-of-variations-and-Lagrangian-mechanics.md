# Learn: Calculus of variations and Lagrangian mechanics

Lagrangian mechanics replaces forces by a single scalar function L = T − U and a single principle, that the true motion makes the action stationary. The mathematics behind it is the calculus of variations. Sources: slides `Lagrangian.tex:1` to `:334`, MT ch 6–7, HW lectures 6–7 (MT E6.1–E6.5, E7.3–E7.17). Questions follow the 2025 midsem Q6 and Q12, the 2026 midsem Q2 and Q4–Q7, and Section C of the practice set.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Describing a whole path at once

Newton's laws are local in time. They tell us how the state of a system changes from one instant to the next, and the path is found by adding up these small steps. There is another way of looking at motion, in which the whole path is described at once by some property it has. Light gives the oldest example. Fermat proposed that light travelling from one point to another follows the path that takes the least time. Applied to light crossing from one medium into another, where its speed changes, this principle gives Snell's law of refraction directly. A mechanical example is the brachistochrone problem: along which curve does a bead slide, from rest under gravity, from one point to a lower one in the shortest time? The answer is not the straight line but a cycloid, which drops steeply at first to gain speed early.

## The calculus of variations

Such problems ask for the function y(x) that makes an integral J = ∫f(y, y′, x) dx stationary, with the end points held fixed. This is a different kind of optimisation from finding the minimum of a function, because the unknown is an entire curve. The method is to compare the true curve with nearby ones, y(x) + αη(x), where η is any smooth function that vanishes at the end points. For the true curve J must be stationary as α passes through zero. Differentiating under the integral and integrating the η′ term by parts, the boundary terms vanish and we are left with ∫\[∂f/∂y − d/dx(∂f/∂y′)\]η dx = 0. Since this must hold for every η, the bracket itself must vanish, giving the Euler equation ∂f/∂y − d/dx(∂f/∂y′) = 0. When f does not depend explicitly on x, a first integral follows at once: f − y′∂f/∂y′ is constant. This second form is often the quicker route, and it is the one used for the brachistochrone.

## Hamilton's principle

Mechanics can be put in the same form. Hamilton's principle states that of all the paths a system could take between two configurations in a given time, the actual path is the one for which the action S = ∫L dt is stationary, where the Lagrangian L = T − U is the kinetic energy minus the potential energy. Applying the Euler equation with t in place of x gives the Euler–Lagrange equations, d/dt(∂L/∂q̇) = ∂L/∂q. For a single particle in Cartesian coordinates these are exactly Newton's equations mẍ = −∂U/∂x, so nothing new has been added to the physics. What has been gained is a far more convenient formulation.

![Brachistochrone: cycloid, straight line and parabola](fig/brachistochrone.svg)

*Figure. The fastest path from A to B is the cycloid, not the straight line: it dives steeply first to pick up speed.*

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

# Formulas: Calculus of variations and Lagrangian mechanics

## Euler equation

To make $J = \int_{x_1}^{x_2} f(y, y'; x)\,dx$ stationary with fixed end points, vary $y \to y + \alpha\eta$ with $\eta(x_1) = \eta(x_2) = 0$, set $\partial J/\partial\alpha = 0$ at $\alpha = 0$, and integrate by parts:

$$\boxed{\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'} = 0}$$

Two shortcuts:

$$\frac{\partial f}{\partial y} = 0\ \Rightarrow\ \frac{\partial f}{\partial y'} = \text{const},\qquad\qquad \frac{\partial f}{\partial x} = 0\ \Rightarrow\ f - y'\frac{\partial f}{\partial y'} = \text{const}$$

| Problem | Integrand $f$ | Result |
|---|---|---|
| Shortest path in a plane | $\sqrt{1 + y'^2}$ | straight line |
| Fermat's principle | $n(x, y)\sqrt{1 + y'^2}$ | Snell's law $n_1\sin\theta_1 = n_2\sin\theta_2$ |
| Brachistochrone (MT E6.2) | $\dfrac{\sqrt{1 + y'^2}}{\sqrt{2gx}}$ | $\dfrac{y'^2}{x(1 + y'^2)} = \dfrac1{2a}$, cycloid $x = a(1 - \cos\phi),\ y = a(\phi - \sin\phi)$ |

## Hamilton's principle and Lagrange's equations

$$\boxed{S = \int_{t_1}^{t_2} L\,dt,\quad L = T - U,\qquad \delta S = 0 \iff \frac{d}{dt}\frac{\partial L}{\partial\dot q_k} = \frac{\partial L}{\partial q_k}}$$

Degrees of freedom $= 3N - (\text{number of constraints})$. Recipe: choose $q$'s, write $T$ and $U$ in them, form $L$, apply the equation to each $q_k$. Constraint forces that do no work never appear.

| System | Result |
|---|---|
| Simple pendulum (MT E7.2) | $L = \tfrac12 ml^2\dot\theta^2 + mgl\cos\theta$, giving $ml^2\ddot\theta = -mgl\sin\theta$; small $\theta$: $\omega^2 = g/l$ |
| Wall of death, cone half-angle $\alpha$ (MT E7.4) | $mr^2\dot\theta$ constant; $\ddot r = r\dot\theta^2\sin^2\alpha - g\sin\alpha\cos\alpha$ |
| Block on an incline rising at $\theta = \alpha t$ (MT P7.12) | $\ddot q = \alpha^2 q - g\sin\alpha t$; $L$ depends on $t$, so energy is not conserved |
| Disk rolling down an incline (MT E7.9) | $\ddot y = \dfrac{g\sin\alpha}{1 + I/MR^2} = \tfrac23 g\sin\alpha$ for a uniform disk |

## Constraints with multipliers

For constraints $f_k(q, t) = 0$:

$$\boxed{\frac{\partial L}{\partial q_j} - \frac{d}{dt}\frac{\partial L}{\partial\dot q_j} + \sum_k\lambda_k\frac{\partial f_k}{\partial q_j} = 0}$$

The term $\lambda_k\,\partial f_k/\partial q_j$ is the generalised constraint force.

## Symmetry and conservation

| Symmetry | Conserved quantity |
|---|---|
| $q_k$ cyclic ($\partial L/\partial q_k = 0$) | $p_k = \dfrac{\partial L}{\partial\dot q_k}$ |
| Time translation ($\partial L/\partial t = 0$) | $H = \sum_k\dot q_k p_k - L$ (equals $E$ for $L = \tfrac12 mv^2 - U(x)$) |
| Space translation | linear momentum |
| Rotation ($\delta\vec r = \delta\vec\theta\times\vec r$) | angular momentum $\vec r\times\vec p$ |

## Newton against Lagrange

| | Newton | Lagrange |
|---|---|---|
| Equation | $m\ddot x_k = F_k$ | $\dfrac{d}{dt}\dfrac{\partial L}{\partial\dot q_k} = \dfrac{\partial L}{\partial q_k}$ |
| Coordinates | Cartesian | any generalised |
| Works with | forces (vectors) | energies (scalars) |
| Constraints | balance the constraint forces | built into the coordinates, or multipliers |
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

*Solution.* **Noether's idea.** A symmetry of $L$ gives a conserved quantity.

| symmetry | $L$ unchanged under | conserved |
|---|---|---|
| time translation | $t \to t + \epsilon$ ($\partial L/\partial t = 0$) | energy, $H = \sum\dot q\,p - L$ |
| space translation | $q \to q + \epsilon$ ($q$ cyclic) | momentum, $p = \partial L/\partial\dot q$ |
| rotation | $\theta \to \theta + \epsilon$ ($\theta$ cyclic) | angular momentum, $\mathbf r\times\mathbf p$ |

**Why a cyclic coordinate works.** If $\partial L/\partial q = 0$, Lagrange's equation gives $\dfrac{d}{dt}\dfrac{\partial L}{\partial\dot q} = 0$, so $p_q$ is constant.

### Problem 7 [Mechanics 2 · Recall · 2 pts]

How is calculus-of-variations optimisation different from ordinary function optimisation?

*Solution.* The unknown is a whole function y(x), a point in an infinite-dimensional space, and J depends on all its values; the stationarity condition is a differential equation rather than an algebraic one.

## B. Show or derive

### Problem 8 [Mechanics 2 · Derivation · 4 pts]

Derive the Euler equation for J = ∫f(y, y′; x) dx, and its second form when f has no explicit x.

*Solution.* **Setup.** Find $y(x)$ that makes $J = \int_{x_1}^{x_2}f(y, y';x)\,dx$ stationary, with the end points fixed.

**Vary the path.** $y \to y + \alpha\eta(x)$ with $\eta(x_1) = \eta(x_2) = 0$:

$$\frac{dJ}{d\alpha}\bigg|_{\alpha=0} = \int\left(\frac{\partial f}{\partial y}\eta + \frac{\partial f}{\partial y'}\eta'\right)dx = 0$$

**Integrate the second term by parts.** The boundary term $\left[\dfrac{\partial f}{\partial y'}\eta\right]$ vanishes since $\eta = 0$ at the ends:

$$\int\left(\frac{\partial f}{\partial y} - \frac d{dx}\frac{\partial f}{\partial y'}\right)\eta\,dx = 0$$

This holds for every $\eta$, so

$$\boxed{\frac{\partial f}{\partial y} - \frac d{dx}\frac{\partial f}{\partial y'} = 0}$$

**Second form** (no explicit $x$). Expand

$$\frac{df}{dx} = y'f_y + y''f_{y'} + f_x = \frac d{dx}\left(y'f_{y'}\right) + y'\left(f_y - \frac d{dx}f_{y'}\right) + f_x$$

The bracket is zero by Euler's equation. If $f_x = 0$:

$$\boxed{f - y'\frac{\partial f}{\partial y'} = \text{constant}}$$

### Problem 9 [Mechanics 2 · Derivation · 3 pts · 2026 midsem Q4]

Show that Fermat's principle of least time leads to Snell's law.

*Solution.* **Setup.** $A$ is a height $a$ above the interface, $B$ a depth $b$ below, horizontal separation $d$. Light crosses at $x$ (measured from below $A$), with speeds $v_1, v_2$.

$$t(x) = \frac{\sqrt{a^2 + x^2}}{v_1} + \frac{\sqrt{b^2 + (d-x)^2}}{v_2}$$

**Minimise.**

$$\frac{dt}{dx} = \frac{x}{v_1\sqrt{a^2 + x^2}} - \frac{d - x}{v_2\sqrt{b^2 + (d-x)^2}} = \frac{\sin\theta_1}{v_1} - \frac{\sin\theta_2}{v_2} = 0$$

where $\theta_1,\theta_2$ are the angles to the normal. With $v = c/n$:

$$\boxed{n_1\sin\theta_1 = n_2\sin\theta_2}$$

**Check.** Going into a slower medium ($n_2 > n_1$), $\theta_2 < \theta_1$: the ray bends toward the normal.

### Problem 10 [Mechanics 2 · Derivation · 2 pts]

Show that the shortest path between two points in a plane is a straight line.

*Solution.* **Path length.** $J = \int ds = \int\sqrt{1 + y'^2}\,dx$, so $f = \sqrt{1 + y'^2}$.

**Euler's equation.** $f$ has no explicit $y$, so $\partial f/\partial y = 0$ and

$$\frac{\partial f}{\partial y'} = \frac{y'}{\sqrt{1 + y'^2}} = \text{constant}$$

This forces $y' = $ constant, so $y = mx + c$: a **straight line**.

### Problem 11 [Mechanics 2 · Derivation · 4 pts · MT E6.2]

Set up the brachistochrone integral and show the curve satisfies y′²/\[x(1 + y′²)\] = constant.

*Solution.* **Setup.** Take $x$ measured downward from the start, released from rest. Energy conservation gives the speed after falling $x$:

$$v = \sqrt{2gx}$$

**Time of descent.**

$$T = \int\frac{ds}v = \int\frac{\sqrt{1 + y'^2}}{\sqrt{2gx}}\,dx,\qquad f = \sqrt{\frac{1 + y'^2}{2gx}}$$

**Euler.** $f$ has no explicit $y$, so $\partial f/\partial y' = $ const:

$$\frac{y'}{\sqrt{2gx(1 + y'^2)}} = \text{const} \Rightarrow \boxed{\frac{y'^2}{x(1 + y'^2)} = \frac1{2a}}$$

(the constant is written $1/2a$ by convention). Solving this gives the **cycloid** $x = a(1 - \cos\theta)$, $y = a(\theta - \sin\theta)$.

### Problem 12 [Mechanics 2 · Derivation · 8 pts · 2026 midsem Q7] (hard)

A double pendulum has point masses m₁, m₂ on massless rods l₁, l₂. Identify the generalised coordinates and degrees of freedom, construct L, and obtain the equations of motion.

*Solution.* **Coordinates.** Two angles $\theta_1,\theta_2$ from the vertical: **2 degrees of freedom**.

**Positions.**

$$x_1 = l_1\sin\theta_1,\quad y_1 = -l_1\cos\theta_1;\qquad x_2 = x_1 + l_2\sin\theta_2,\quad y_2 = y_1 - l_2\cos\theta_2$$

**Kinetic energy.** $v_2^2 = l_1^2\dot\theta_1^2 + l_2^2\dot\theta_2^2 + 2l_1l_2\dot\theta_1\dot\theta_2\cos(\theta_1 - \theta_2)$, so

$$T = \tfrac12(m_1 + m_2)l_1^2\dot\theta_1^2 + \tfrac12m_2l_2^2\dot\theta_2^2 + m_2l_1l_2\dot\theta_1\dot\theta_2\cos(\theta_1 - \theta_2)$$

$$U = -(m_1 + m_2)gl_1\cos\theta_1 - m_2gl_2\cos\theta_2,\qquad L = T - U$$

**Lagrange's equations.**

$$\theta_1:\ (m_1 + m_2)l_1^2\ddot\theta_1 + m_2l_1l_2\ddot\theta_2\cos(\theta_1 - \theta_2) + m_2l_1l_2\dot\theta_2^2\sin(\theta_1 - \theta_2) + (m_1 + m_2)gl_1\sin\theta_1 = 0$$

$$\theta_2:\ m_2l_2^2\ddot\theta_2 + m_2l_1l_2\ddot\theta_1\cos(\theta_1 - \theta_2) - m_2l_1l_2\dot\theta_1^2\sin(\theta_1 - \theta_2) + m_2gl_2\sin\theta_2 = 0$$

**Check.** For small angles with $m_2 \to 0$ the first equation reduces to a simple pendulum, $\ddot\theta_1 = -(g/l_1)\theta_1$ ✓.

### Problem 13 [Mechanics 2 · Derivation · 5 pts · 2025 midsem Q12]

Repeat Q12 for two uniform rods of masses m₁, m₂ hinged together (no point masses). Only write L.

*Solution.* **Rod 1** (pivot at its end): $I = \tfrac13m_1l_1^2$, so

$$T_1 = \tfrac12\cdot\tfrac13m_1l_1^2\dot\theta_1^2 = \tfrac16m_1l_1^2\dot\theta_1^2$$

**Rod 2.** Centre-of-mass velocity is the sum of $l_1\dot\theta_1$ (the hinge) and $\tfrac12l_2\dot\theta_2$ (about the hinge); the spin is about the rod's own centre with $I_\text{cm} = \tfrac1{12}m_2l_2^2$:

$$T_2 = \tfrac12m_2\left[l_1^2\dot\theta_1^2 + \tfrac14l_2^2\dot\theta_2^2 + l_1l_2\dot\theta_1\dot\theta_2\cos(\theta_1 - \theta_2)\right] + \tfrac1{24}m_2l_2^2\dot\theta_2^2$$

**Potential.** Heights of the two centres of mass:

$$U = -m_1g\frac{l_1}2\cos\theta_1 - m_2g\left(l_1\cos\theta_1 + \frac{l_2}2\cos\theta_2\right)$$

$$\boxed{L = T_1 + T_2 - U}$$

**Common mistake.** Forgetting the extra rotational term $\tfrac1{24}m_2l_2^2\dot\theta_2^2$ for rod 2.

### Problem 14 [Mechanics 2 · Derivation · 4 pts · MT E7.4]

A particle moves on the inside of a cone of half-angle α under gravity. Find L and the equations of motion. What is conserved?

*Solution.* **Constraint.** On the cone, $z = r\cot\alpha$, so $\dot z = \dot r\cot\alpha$ and

$$v^2 = \dot r^2 + r^2\dot\theta^2 + \dot z^2 = \dot r^2\csc^2\alpha + r^2\dot\theta^2$$

$$L = \tfrac12m\left(\dot r^2\csc^2\alpha + r^2\dot\theta^2\right) - mgr\cot\alpha$$

**Equations.**

- $\theta$ is cyclic: $\dfrac d{dt}\left(mr^2\dot\theta\right) = 0 \Rightarrow \boxed{mr^2\dot\theta = \ell}$ (angular momentum about the axis).
- $r$: $m\ddot r\csc^2\alpha = mr\dot\theta^2 - mg\cot\alpha$, so

$$\boxed{\ddot r = r\dot\theta^2\sin^2\alpha - g\sin\alpha\cos\alpha}$$

**Conserved.** $\ell$ (axial symmetry) and the energy $T + U$ (no explicit time).

### Problem 15 [Mechanics 2 · Derivation · 3 pts · MT P7.12, practice P19]

A block slides on a smooth incline whose angle grows as θ = αt. Find the equation of motion. Is energy conserved?

*Solution.* **Coordinate.** $q$ = distance down the incline, whose angle is $\theta = \alpha t$ (driven). The block sits at $(q\cos\alpha t,\ q\sin\alpha t)$, so its height is $q\sin\alpha t$ and the incline's rotation adds a transverse speed $q\alpha$:

$$v^2 = \dot q^2 + q^2\alpha^2$$

$$L = \tfrac12m\left(\dot q^2 + \alpha^2q^2\right) - mgq\sin\alpha t$$

**Equation.** $m\ddot q = m\alpha^2q - mg\sin\alpha t$:

$$\boxed{\ddot q = \alpha^2q - g\sin\alpha t}$$

**Energy.** $L$ depends explicitly on $t$ (the incline is driven from outside), so $\partial L/\partial t \ne 0$ and $H$ is **not conserved**.

### Problem 16 [Mechanics 2 · Derivation · 4 pts · MT E7.9]

A disk rolls without slipping down an incline of angle α. Using a Lagrange multiplier, find its acceleration and the friction force.

*Solution.* **Coordinates.** $y$ is the distance down the slope and $\theta$ the rotation angle; rolling without slipping means

$$f = y - R\theta = 0$$

$$L = \tfrac12M\dot y^2 + \tfrac12I\dot\theta^2 + Mgy\sin\alpha$$

**Lagrange with a multiplier $\lambda$:** $\dfrac d{dt}\dfrac{\partial L}{\partial\dot q} - \dfrac{\partial L}{\partial q} = \lambda\dfrac{\partial f}{\partial q}$:

$$y:\ M\ddot y - Mg\sin\alpha = \lambda,\qquad \theta:\ I\ddot\theta = -\lambda R$$

**Eliminate.** With $\ddot\theta = \ddot y/R$: $\lambda = -I\ddot y/R^2$, so

$$M\ddot y + \frac{I}{R^2}\ddot y = Mg\sin\alpha \Rightarrow \boxed{\ddot y = \frac{g\sin\alpha}{1 + I/MR^2}}$$

**Uniform disk** ($I = \tfrac12MR^2$): $\ddot y = \tfrac23g\sin\alpha$, and the friction force is

$$|\lambda| = \frac I{R^2}\ddot y = \boxed{\tfrac13Mg\sin\alpha}\quad(\text{up the slope})$$

**Check.** Frictionless sliding would give $g\sin\alpha$; rolling is slower because energy also goes into rotation.

### Problem 17 [Mechanics 2 · Derivation · 3 pts · practice P20]

A pendulum of length b hangs from a support accelerating horizontally at a. Find the equation of motion and the period of small oscillations.

*Solution.* **Coordinates.** Let the support move with acceleration $a$, and $\theta$ the angle of the string from the vertical. Position of the bob:

$$x = \tfrac12at^2 + b\sin\theta,\qquad y = -b\cos\theta$$

$$L = \tfrac12mb^2\dot\theta^2 + mb\,at\,\dot\theta\cos\theta + \tfrac12ma^2t^2 + mgb\cos\theta$$

**Lagrange's equation** (dropping terms that do not involve $\theta$):

$$b\ddot\theta = -g\sin\theta - a\cos\theta$$

**Equilibrium.** $\tan\theta_0 = -a/g$: the bob hangs back from the acceleration, at an angle $\tan^{-1}(a/g)$.

**Small oscillations** about it behave like a pendulum in an effective gravity $g_\text{eff} = \sqrt{g^2 + a^2}$:

$$\boxed{T = 2\pi\sqrt{\frac b{\sqrt{g^2 + a^2}}}}$$

**Check.** $a = 0$ gives $2\pi\sqrt{b/g}$ ✓.

### Problem 18 [Mechanics 2 · Derivation · 3 pts · practice P22]

A rope of mass m and length b lies on a smooth table with length z hanging over the edge. Find Lagrange's equation.

*Solution.* **Coordinate.** $z$ = length hanging. The whole rope moves with speed $\dot z$.

$$T = \tfrac12m\dot z^2$$

**Potential.** The hanging part has mass $mz/b$ and its centre is $z/2$ below the table:

$$U = -\frac{mz}b\,g\,\frac z2 = -\frac{mgz^2}{2b}$$

$$L = \tfrac12m\dot z^2 + \frac{mgz^2}{2b}$$

**Lagrange.** $m\ddot z = mgz/b$:

$$\boxed{\ddot z = \frac gb\,z}$$

The solution grows exponentially, $z \propto e^{\sqrt{g/b}\,t}$ (a runaway: more hanging means more pull).

### Problem 19 [Mechanics 2 · Derivation · 3 pts · practice P17]

A particle moves in a plane under an attractive central force f = −Ar^(α−1). Find the Lagrange equations. Are angular momentum and energy conserved?

*Solution.* **Potential.** From $f = -Ar^{\alpha-1} = -dU/dr$, with $U(0) = 0$:

$$U = \frac A\alpha\,r^\alpha$$

$$L = \tfrac12m\left(\dot r^2 + r^2\dot\theta^2\right) - \frac A\alpha r^\alpha$$

**Equations.**

- $\theta$: $\dfrac d{dt}\left(mr^2\dot\theta\right) = 0$, so **angular momentum is conserved**.
- $r$: $m\ddot r - mr\dot\theta^2 + Ar^{\alpha-1} = 0$.

**Energy.** $L$ has no explicit time dependence, so $T + U$ is **conserved** too.

### Problem 20 [Mechanics 2 · Derivation · 4 pts · slides HW]

Show that if L is unchanged by any rotation δr = δθ × r, then r × p is conserved.

*Solution.* **Infinitesimal rotation.** $\delta\mathbf r = \delta\boldsymbol\theta\times\mathbf r$ and $\delta\mathbf v = \delta\boldsymbol\theta\times\mathbf v$.

$$\delta L = \frac{\partial L}{\partial\mathbf r}\cdot\delta\mathbf r + \frac{\partial L}{\partial\mathbf v}\cdot\delta\mathbf v = \dot{\mathbf p}\cdot(\delta\boldsymbol\theta\times\mathbf r) + \mathbf p\cdot(\delta\boldsymbol\theta\times\mathbf v)$$

using Lagrange's equation $\partial L/\partial\mathbf r = \dot{\mathbf p}$.

**Cyclic permutation of the triple product** ($\mathbf a\cdot(\mathbf b\times\mathbf c) = \mathbf b\cdot(\mathbf c\times\mathbf a)$):

$$\delta L = \delta\boldsymbol\theta\cdot\left(\mathbf r\times\dot{\mathbf p} + \mathbf v\times\mathbf p\right) = \delta\boldsymbol\theta\cdot\frac d{dt}(\mathbf r\times\mathbf p)$$

(the term $\mathbf v\times\mathbf p$ is zero). If $L$ is rotation-invariant, $\delta L = 0$ for every $\delta\boldsymbol\theta$, so $\mathbf r\times\mathbf p$ is **constant**.

### Problem 21 [Mechanics 2 · Derivation · 3 pts]

Show that when ∂L/∂t = 0, H = Σq̇p − L is conserved, and that it equals T + U for L = ½mv² − U(x).

*Solution.* **Time derivative of $L$.**

$$\frac{dL}{dt} = \sum\frac{\partial L}{\partial q}\dot q + \sum\frac{\partial L}{\partial\dot q}\ddot q + \frac{\partial L}{\partial t}$$

**Use Lagrange's equation** $\partial L/\partial q = \dot p$. The first two sums combine into $\dfrac d{dt}\sum p\dot q$:

$$\frac d{dt}\left(\sum p\dot q - L\right) = -\frac{\partial L}{\partial t}$$

So $H = \sum p\dot q - L$ is **conserved** when $\partial L/\partial t = 0$.

**For $L = \tfrac12mv^2 - U(x)$.** $p = mv$, so $\sum p\dot q = mv^2$:

$$H = mv^2 - \tfrac12mv^2 + U = \tfrac12mv^2 + U = T + U$$

### Problem 22 [Mechanics 2 · Derivation · 5 pts · practice P30]

A particle slides from rest at the top of a smooth sphere of radius R. Using a multiplier for r = R, find the normal force and the angle at which it leaves.

*Solution.* **Coordinates.** $r,\theta$ with $\theta$ from the vertical; constraint $f = r - R = 0$.

$$L = \tfrac12m\left(\dot r^2 + r^2\dot\theta^2\right) - mgr\cos\theta$$

**$r$-equation with multiplier** ($\lambda$ is the outward constraint force): $m\ddot r - mr\dot\theta^2 + mg\cos\theta = \lambda$.

On the surface ($r = R$, $\ddot r = 0$) the normal force is

$$N = \lambda = mg\cos\theta - mR\dot\theta^2$$

**Energy** (from rest at the top): $\tfrac12mR^2\dot\theta^2 = mgR(1 - \cos\theta) \Rightarrow R\dot\theta^2 = 2g(1 - \cos\theta)$.

$$\boxed{N = mg(3\cos\theta - 2)}$$

**Leaves the surface** when $N = 0$:

$$\boxed{\cos\theta = \tfrac23,\quad \theta \approx 48^\circ}$$

## C. Short numericals

### Problem 23 [Mechanics 2 · Numerical · 2 pts]

Find the acceleration of a uniform hoop (I = MR²) and a uniform disk rolling down a 30° incline.

*Solution.* **Idea.** For a body rolling without slipping, $a = \dfrac{g\sin\alpha}{1 + I/MR^2}$. With $\sin30^\circ = \tfrac12$:

$$\text{Hoop } (I = MR^2):\quad a = \frac{g/2}{1 + 1} = \boxed{\frac g4}$$

$$\text{Uniform disk } (I = \tfrac12MR^2):\quad a = \frac{g/2}{1 + \tfrac12} = \boxed{\frac g3}$$

The disk, with less of its mass at the rim, accelerates faster.

### Problem 24 [Mechanics 2 · Numerical · 2 pts · practice P18a]

Two blocks of mass M are joined by a light string; one is on a smooth table, the other hangs over a pulley. Find the acceleration.

*Solution.* **Idea.** One coordinate $x$ (the string is inextensible): both blocks move with speed $\dot x$.

$$T = \tfrac12M\dot x^2 + \tfrac12M\dot x^2 = \tfrac12(2M)\dot x^2,\qquad U = -Mgx\ \ (\text{only the hanging block})$$

$$L = \tfrac12(2M)\dot x^2 + Mgx$$

Lagrange's equation $\dfrac{d}{dt}\dfrac{\partial L}{\partial\dot x} = \dfrac{\partial L}{\partial x}$:

$$2M\ddot x = Mg\ \Rightarrow\ \boxed{a = \frac g2}$$

