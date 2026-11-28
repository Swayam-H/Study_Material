# Learn: Calculus of variations and Lagrangian mechanics

Lagrangian mechanics replaces forces by a single scalar function $L = T - U$ and a single principle, that the true motion makes the action stationary. The mathematics behind it is the calculus of variations. Sources: slides `Lagrangian.tex:1` to `:334`, MT ch 6–7, HW lectures 6–7 (MT E6.1–E6.5, E7.3–E7.17). Questions follow the 2025 midsem Q6 and Q12, the 2026 midsem Q2 and Q4–Q7, and Section C of the practice set.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## Describing a whole path at once

Newton's laws are local in time. They tell us how the state of a system changes from one instant to the next, $\frac{d}{dt}(x, v) = (v, F/m)$, and the path is found by adding up these small steps. There is another way of looking at motion, in which the whole path is described at once by some property it has. Examples from the slides:

- The oscillator's whole path is the ellipse $(x/A)^2 + (p/B)^2 = 1$ in the $(x, p)$ plane.
- Energy $E = T + U$ is the same at every point of the path.
- A free particle moves in a straight line, which is also the path of minimum **average kinetic energy** $T_\text{avg} = \frac{1}{t_2 - t_1}\int_{t_1}^{t_2} T\,dt$ between fixed end points.
- **Fermat's principle:** light travelling between two points follows the path of least time. Applied to light crossing into a medium where its speed changes, it gives Snell's law directly.

A mechanical example is the **brachistochrone**: along which curve does a bead slide, from rest under gravity, from one point to a lower one in the shortest time? With $x$ measured downwards, $v = \sqrt{2gx}$ and $ds = \sqrt{dx^2 + dy^2}$, so the time is

$$T = \int \frac{ds}{v} = \int_{x_1}^{x_2} \frac{\sqrt{1 + y'^2}}{\sqrt{2gx}}\,dx$$

The answer is not the straight line but a cycloid, which drops steeply at first to gain speed early. Other problems of the same kind: the shortest path between two points, the shape of a hanging chain (minimum potential energy), and the isoperimetric problem (the largest area for a fixed perimeter).

## The calculus of variations

Such problems ask for the function $y(x)$ that makes an integral

$$J = \int_{x_1}^{x_2} f\big(y(x), y'(x); x\big)\,dx$$

stationary, with the end points held fixed. This is a different kind of optimisation from finding the minimum of a function, because the unknown is an entire curve. The method is to compare the true curve with nearby ones, $y(\alpha, x) = y(0, x) + \alpha\,\eta(x)$, where $\eta$ is any smooth function with $\eta(x_1) = \eta(x_2) = 0$. For the true curve $\partial J/\partial\alpha = 0$ at $\alpha = 0$. Differentiating under the integral and integrating the $\eta'$ term by parts (the boundary terms vanish):

$$\frac{\partial J}{\partial\alpha} = \int_{x_1}^{x_2}\left(\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'}\right)\eta(x)\,dx = 0$$

Since this must hold for every $\eta$, the bracket itself must vanish:

$$\boxed{\frac{\partial f}{\partial y} - \frac{d}{dx}\left(\frac{\partial f}{\partial y'}\right) = 0}\qquad(\text{Euler equation})$$

When $f$ does not depend explicitly on $x$, a first integral follows at once:

$$\boxed{f - y'\frac{\partial f}{\partial y'} = \text{constant}}\qquad\left(\text{second form, valid when } \frac{\partial f}{\partial x} = 0\right)$$

This second form is often the quicker route. For the brachistochrone it is even simpler to swap the roles: $f$ has no $y$, so $\partial f/\partial y' = \text{const}$, which gives $\dfrac{y'^2}{x(1 + y'^2)} = \dfrac{1}{2a}$, i.e. $y = \int \dfrac{x\,dx}{\sqrt{2ax - x^2}}$, a cycloid.

## Hamilton's principle

Mechanics can be put in the same form. Hamilton's principle states that of all the paths a system could take between two configurations in a given time, the actual path makes the action stationary:

$$\boxed{S = \int_{t_1}^{t_2} L(q, \dot q, t)\,dt,\qquad \delta S = 0,\qquad L = T - U}$$

Applying the Euler equation with $t$ in place of $x$ gives the Euler–Lagrange equations:

$$\boxed{\frac{d}{dt}\left(\frac{\partial L}{\partial\dot q_k}\right) = \frac{\partial L}{\partial q_k},\qquad k = 1, \dots, n}$$

For a single particle in Cartesian coordinates these are exactly Newton's equations $m\ddot x = -\partial U/\partial x$, so nothing new has been added to the physics. What has been gained is a far more convenient formulation.

### The slides' derivation from Newton (`Lagrangian.tex`, "Hand-wavy derivation")

This is worth knowing as a 4–5 mark derivation.

1. On the true path $\mathbf F - \dot{\mathbf p} = 0$, so for any variation $\boldsymbol\eta(t)$: $J = \int_{t_1}^{t_2}(\mathbf F - \dot{\mathbf p})\cdot\boldsymbol\eta\,dt = 0$.
2. For a conservative force, $J = \int(-\nabla U\cdot\boldsymbol\eta - m\dot{\mathbf v}\cdot\boldsymbol\eta)\,dt$.
3. Use $\frac{d}{dt}(\mathbf v\cdot\boldsymbol\eta) = \dot{\mathbf v}\cdot\boldsymbol\eta + \mathbf v\cdot\dot{\boldsymbol\eta}$. The total-derivative term integrates to zero when $\boldsymbol\eta(t_1) = \boldsymbol\eta(t_2) = 0$, leaving $J = \int(-\nabla U\cdot\boldsymbol\eta + m\mathbf v\cdot\dot{\boldsymbol\eta})\,dt$.
4. Let $\boldsymbol\eta = \delta\mathbf x$, a small change from the true path, so $\dot{\boldsymbol\eta} = \delta\mathbf v$. Then $-\nabla U\cdot\delta\mathbf x = \delta(-U)$ and $m\mathbf v\cdot\delta\mathbf v = \delta(\tfrac12 mv^2)$:

$$J = \int_{t_1}^{t_2}\delta\left(\tfrac12 mv^2 - U\right)dt = \delta\int_{t_1}^{t_2} L\,dt = \delta S = 0$$

**Caveats on the slides.** (i) A constraint force $\mathbf F_c$ was left out; that is fine because it does no work along the true path, $\mathbf F_c\cdot d\mathbf x = 0$. (ii) Awkward constraints such as the pendulum need generalised coordinates; MT 7.6 gives the rigorous derivation from $F = ma$ in generalised coordinates. The principle survives any change of coordinates, which is its power.

![Brachistochrone: cycloid, straight line and parabola](fig/brachistochrone.svg)

*Figure. The fastest path from A to B is the cycloid, not the straight line: it dives steeply first to pick up speed.*

## Generalised coordinates and constraints

The great advantage of the Lagrangian method is that the action is a scalar, and its stationary value does not depend on which coordinates describe the path. Any set of independent quantities that fixes the configuration, the **generalised coordinates**, will do, and the Euler–Lagrange equations take the same form in all of them. The number of such coordinates is the number of degrees of freedom.

**Simple pendulum (MT E7.2).** One coordinate, $\theta$:

$$L = \tfrac12 ml^2\dot\theta^2 + mgl\cos\theta\quad\Longrightarrow\quad \boxed{ml^2\ddot\theta = -mgl\sin\theta}\quad\xrightarrow{\text{small }\theta}\quad \ddot\theta = -\frac gl\,\theta$$

The tension in the string never appears. This is typical: constraints built into the choice of coordinates never appear in the equations, and the forces that maintain them, which do no work, need not be found.

**Wall of death (MT E7.4).** A particle on a cone of half-angle $\alpha$, with $z = r\cot\alpha$. Two coordinates $r, \theta$:

$$L = \tfrac12 m\left(\dot r^2\csc^2\alpha + r^2\dot\theta^2\right) - mgr\cot\alpha$$

$\theta$ is cyclic, so $mr^2\dot\theta$ (angular momentum about the axis) is conserved, and the $r$-equation is $\ddot r - r\dot\theta^2\sin^2\alpha + g\sin\alpha\cos\alpha = 0$.

**Block on a rising incline (MT P7.12).** The angle grows as $\theta = \alpha t$; with $q$ the distance along the incline,

$$L = \tfrac12 m\dot q^2 + \tfrac12 mq^2\alpha^2 - mgq\sin\alpha t\quad\Longrightarrow\quad \ddot q = \alpha^2 q - g\sin\alpha t$$

$L$ depends explicitly on time, and the energy is then not conserved. For a double pendulum, two angles describe the system, and the Lagrangian leads directly to two coupled equations of motion that would be laborious to get from free-body diagrams.

**Constraints with multipliers.** Sometimes we want the constraint forces, or the constraint cannot conveniently be built into the coordinates. Then each constraint $g(q) = 0$ is added with a Lagrange multiplier $\lambda$:

$$\boxed{\frac{\partial L}{\partial q_j} - \frac{d}{dt}\frac{\partial L}{\partial\dot q_j} + \sum_k\lambda_k\frac{\partial g_k}{\partial q_j} = 0}$$

For a disk rolling without slipping down an incline (MT E7.9), with the constraint $y - R\theta = 0$, this gives

$$\ddot y = \frac{g\sin\alpha}{1 + I/MR^2}$$

and $\lambda$ is the friction force that enforces rolling.

## Symmetries and conservation laws

The Lagrangian method shows clearly where conservation laws come from. If $L$ does not contain a coordinate $q_k$, that coordinate is called **cyclic**, and

$$\boxed{\frac{\partial L}{\partial q_k} = 0\quad\Longrightarrow\quad p_k = \frac{\partial L}{\partial\dot q_k} = \text{constant}}$$

Each such conservation law reflects a symmetry:

| Symmetry of $L$ | Conserved quantity |
|---|---|
| translation in space ($\delta\mathbf r$ uniform, $\delta\dot{\mathbf r} = 0$) | linear momentum |
| rotation ($\delta\mathbf r = \delta\boldsymbol\theta\times\mathbf r$) | angular momentum $\mathbf r\times\mathbf p$ |
| translation in time ($\partial L/\partial t = 0$) | $H = \sum_k \dot q_k p_k - L$, the energy for ordinary systems |

The time case follows from $\dfrac{d}{dt}\left(L - \sum_k\dot q_k\dfrac{\partial L}{\partial\dot q_k}\right) = \dfrac{\partial L}{\partial t}$. Homogeneity of space, isotropy of space and homogeneity of time thus underlie the three great conservation laws of mechanics.

## Newton and Lagrange compared

| | Newtonian | Lagrangian |
|---|---|---|
| Equation of motion | $m_k\ddot x_k = F_k$ | $\frac{d}{dt}\frac{\partial L}{\partial\dot q_k} = \frac{\partial L}{\partial q_k}$ |
| Order | second | second |
| Coordinates | Cartesian | any generalised coordinates |
| Interactions via | forces (vectors) | energies (scalars) |
| Constraints | balancing forces | built into coordinates, or multipliers |

Both describe exactly the same physics. The Lagrangian approach is usually simpler for constrained systems and is the natural starting point for the Hamiltonian formulation, for quantum mechanics and for field theory, while Newton's method remains the natural one for dissipative forces such as friction, which have no potential. The variational idea also reaches beyond physics: training a machine-learning model is the problem of choosing a function to minimise an integral of the error, $J = \int[y - f_\theta(x)]^2dx$.

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

$${\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'} = 0}$$

Two shortcuts:

$$\frac{\partial f}{\partial y} = 0\ \Rightarrow\ \frac{\partial f}{\partial y'} = \text{const},\qquad\qquad \frac{\partial f}{\partial x} = 0\ \Rightarrow\ f - y'\frac{\partial f}{\partial y'} = \text{const}$$

| Problem | Integrand $f$ | Result |
|---|---|---|
| Shortest path in a plane | $\sqrt{1 + y'^2}$ | straight line |
| Fermat's principle | $n(x, y)\sqrt{1 + y'^2}$ | Snell's law $n_1\sin\theta_1 = n_2\sin\theta_2$ |
| Brachistochrone (MT E6.2) | $\dfrac{\sqrt{1 + y'^2}}{\sqrt{2gx}}$ | $\dfrac{y'^2}{x(1 + y'^2)} = \dfrac1{2a}$, cycloid $x = a(1 - \cos\phi),\ y = a(\phi - \sin\phi)$ |

## Hamilton's principle and Lagrange's equations

$${S = \int_{t_1}^{t_2} L\,dt,\quad L = T - U,\qquad \delta S = 0 \iff \frac{d}{dt}\frac{\partial L}{\partial\dot q_k} = \frac{\partial L}{\partial q_k}}$$

Degrees of freedom $= 3N - (\text{number of constraints})$. Recipe: choose $q$'s, write $T$ and $U$ in them, form $L$, apply the equation to each $q_k$. Constraint forces that do no work never appear.

| System | Result |
|---|---|
| Simple pendulum (MT E7.2) | $L = \tfrac12 ml^2\dot\theta^2 + mgl\cos\theta$, giving $ml^2\ddot\theta = -mgl\sin\theta$; small $\theta$: $\omega^2 = g/l$ |
| Wall of death, cone half-angle $\alpha$ (MT E7.4) | $mr^2\dot\theta$ constant; $\ddot r = r\dot\theta^2\sin^2\alpha - g\sin\alpha\cos\alpha$ |
| Block on an incline rising at $\theta = \alpha t$ (MT P7.12) | $\ddot q = \alpha^2 q - g\sin\alpha t$; $L$ depends on $t$, so energy is not conserved |
| Disk rolling down an incline (MT E7.9) | $\ddot y = \dfrac{g\sin\alpha}{1 + I/MR^2} = \tfrac23 g\sin\alpha$ for a uniform disk |

## Constraints with multipliers

For constraints $f_k(q, t) = 0$:

$${\frac{\partial L}{\partial q_j} - \frac{d}{dt}\frac{\partial L}{\partial\dot q_j} + \sum_k\lambda_k\frac{\partial f_k}{\partial q_j} = 0}$$

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

*Solution.* **Hamilton's principle.** Of all the paths a system could take between two configurations in a fixed time interval, the actual one makes the **action** stationary:

$$\delta S = \delta\int_{t_1}^{t_2}L(q,\dot q,t)\,dt = 0,\qquad L = T - U$$

**Why it matters.** Setting $\delta S = 0$ gives the Euler–Lagrange equations

$$\frac d{dt}\frac{\partial L}{\partial\dot q_i} - \frac{\partial L}{\partial q_i} = 0$$

which are Newton's laws in any coordinates.

**Common mistake.** The action is *stationary*, not always a minimum, and the end points (and the time interval) are held fixed.

### Problem 2 [Mechanics 2 · Recall · 3 pts · 2026 midsem Q2]

What is the Lagrangian? For L({qᵢ}, {q̇ᵢ}, t), what happens when q₁ does not appear explicitly?

*Solution.* **The Lagrangian** is the kinetic minus the potential energy, expressed in generalised coordinates and velocities:

$$L(q_i,\dot q_i,t) = T - U$$

**If $q_1$ does not appear** in $L$ (a **cyclic** or ignorable coordinate), then $\partial L/\partial q_1 = 0$ and Lagrange's equation reduces to

$$\frac d{dt}\frac{\partial L}{\partial\dot q_1} = 0\ \Rightarrow\ p_1 = \frac{\partial L}{\partial\dot q_1} = \text{constant}$$

The conjugate momentum is **conserved**. This is the link between symmetry and conservation laws (Noether): translation symmetry gives linear momentum, rotation symmetry gives angular momentum.

### Problem 3 [Mechanics 2 · Recall · 4 pts · 2025 Q6, 2026 Q5]

State the differences between Newtonian and Lagrangian mechanics.

*Solution.* | | **Newtonian** | **Lagrangian** |
|---|---|---|
| Basic quantities | vectors: force $\mathbf F$, acceleration | scalars: kinetic and potential energy |
| Coordinates | Cartesian (or chosen by hand) | any generalised coordinates $q_i$ |
| Constraints | find and balance every constraint force | built into the coordinates (or one multiplier) |
| Conservation laws | proved case by case | read off from symmetries (cyclic coordinates) |
| Starting principle | three laws | Hamilton's principle |
| Friction | handled directly | needs extra generalised forces |

**What they share.** Both give second-order equations of motion and the **same physics**. Lagrange is more powerful when there are constraints or non-Cartesian geometry; Newton is simpler for problems with non-conservative forces.

### Problem 4 [Mechanics 2 · Recall · 2 pts]

What are generalised coordinates and degrees of freedom? Give the number for a double pendulum in a plane.

*Solution.* **Generalised coordinates** $q_1,\dots,q_n$ are independent quantities that completely fix the configuration of the system (lengths, angles, ...). The **number of degrees of freedom** is the number of independent coordinates needed.

$$\text{DOF} = (\text{number of Cartesian coordinates}) - (\text{number of independent constraints})$$

**Double pendulum in a plane.** Two particles, so $4$ Cartesian coordinates $(x_1,y_1,x_2,y_2)$, minus $2$ rod-length constraints:

$$\boxed{2\ \text{degrees of freedom}}\quad(\theta_1,\theta_2)$$

**Common mistake.** In 3-D the double pendulum has 4 degrees of freedom, not 2.

### Problem 5 [Mechanics 2 · Recall · 2 pts]

Why do constraint forces not appear in Lagrange's equations? When would you use a Lagrange multiplier?

*Solution.* **Why constraint forces drop out.** An ideal constraint force (normal force, tension in a rigid rod) is perpendicular to every displacement the constraint **allows**, so it does no work in such a displacement:

$$\mathbf F_\text{constraint}\cdot\delta\mathbf r = 0$$

Hamilton's principle varies the path only through allowed displacements, so these forces never appear.

**When to use a Lagrange multiplier.**

- You want the **constraint force** itself (the normal force on a sphere, friction in rolling).
- The constraint is awkward to build into the coordinates, for example rolling $y - R\theta = 0$ or staying on a sphere $r - R = 0$.

Then $L$ gets an extra term and the equations become $\dfrac d{dt}\dfrac{\partial L}{\partial\dot q} - \dfrac{\partial L}{\partial q} = \lambda\dfrac{\partial f}{\partial q}$, where $\lambda\,\partial f/\partial q$ is the generalised constraint force.

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

*Solution.* **Ordinary optimisation.** Find a number $x$ (or finitely many) that makes a function $f(x)$ stationary, by solving the algebraic equation $f'(x) = 0$.

**Calculus of variations.** Find a whole **function** $y(x)$ that makes a functional

$$J[y] = \int f(y,y';x)\,dx$$

stationary. The unknown lives in an infinite-dimensional space, and the stationarity condition is a **differential equation** (the Euler equation), not an algebraic one:

$$\frac{\partial f}{\partial y} - \frac d{dx}\frac{\partial f}{\partial y'} = 0$$

**Examples.** Shortest path (straight line), fastest path (brachistochrone), Fermat's principle (Snell's law), and all of Lagrangian mechanics.

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

