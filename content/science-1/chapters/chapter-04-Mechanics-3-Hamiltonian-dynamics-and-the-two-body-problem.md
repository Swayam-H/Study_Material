# Learn: Hamiltonian dynamics and the two-body problem

The Hamiltonian rewrites Lagrangian mechanics in terms of positions and momenta, giving two first-order equations per coordinate. The two-body problem is the great application: it reduces to one body in a central potential, and gravity then gives Kepler's laws. Sources: slides `Lagrangian.tex:335` to `:443` and `STR.tex:14` to `:107`, MT 7.10–7.11 and 8.1–8.7, HW lectures 6–8 (MT E7.11, E8.2). Questions follow the 2025 midsem Q7, the 2026 midsem Q3, Q10 and Q11, and the practice set.

> **Endsem scope.** MT 7.12 (phase space and Liouville's theorem) and 7.13 (virial theorem) are excluded, so the phase-space section below is marked ❌ and can be skipped. MT 8.8–8.10 (orbital dynamics, apsidal angles and precession, stability of circular orbits) are also excluded. The three-body remarks are background only.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## From the Lagrangian to the Hamiltonian

Lagrange's equations describe a system with $n$ degrees of freedom by $n$ second-order equations for the generalised coordinates $q_k$. Hamilton showed that the same motion can be described by $2n$ first-order equations, in which the coordinates and their conjugate momenta appear on an equal footing.

**Step 1: conjugate momenta.**

$$\boxed{p_k = \frac{\partial L}{\partial\dot q_k}}$$

For a particle in Cartesian coordinates it is the ordinary momentum $m\mathbf v$, and for an angle it is an angular momentum, but in general it need not be either. For a charged particle in a magnetic field, $\mathbf p = m\mathbf v + q\mathbf A$, which is not the mechanical momentum.

**Step 2: the Hamiltonian** (a Legendre transformation that swaps $\dot q$ for $p$):

$$\begin{gathered}\boxed{H(q, p, t) = \sum_k p_k\dot q_k - L(q, \dot q, t)} \\[4pt] (\text{every }\dot q_k\text{ re-expressed through the }p\text{'s})\end{gathered}$$

This is the same operation that turns $U(S, V)$ into $H(S, p)$ in thermodynamics. When the coordinates do not depend explicitly on time and the potential depends only on position, $T$ is quadratic in the velocities and $H = T + U$, the total energy. If in addition $\partial H/\partial t = 0$, $H$ is conserved.

**Step 3: Hamilton's canonical equations.** Taking the differential of $H$ and comparing with Lagrange's equations:

$$\boxed{\dot q_k = \frac{\partial H}{\partial p_k},\qquad \dot p_k = -\frac{\partial H}{\partial q_k}}$$

The first returns the relation between velocity and momentum; the second plays the role of Newton's second law. If a coordinate does not appear in $H$, its momentum is constant, just as for a cyclic coordinate in the Lagrangian.

**Worked example (MT E7.11).** A particle on a cylinder of radius $R$, pulled towards the origin by $\mathbf F = -k\mathbf r$. In cylindrical coordinates:

$$L = \tfrac12 m\left(R^2\dot\theta^2 + \dot z^2\right) - \tfrac12 k\left(R^2 + z^2\right),\qquad p_\theta = mR^2\dot\theta,\quad p_z = m\dot z$$

$$H = \frac{p_\theta^2}{2mR^2} + \frac{p_z^2}{2m} + \tfrac12 kz^2\ (+\ \text{const})$$

$$\dot p_\theta = -\frac{\partial H}{\partial\theta} = 0,\quad \dot\theta = \frac{p_\theta}{mR^2};\qquad \dot p_z = -kz,\quad \dot z = \frac{p_z}{m}$$

So $p_\theta$ is constant and the particle turns about the axis at a steady rate, while $z$ oscillates harmonically with $\omega = \sqrt{k/m}$.

## Phase space and Liouville's theorem

> ❌ **Not in the endsem** (MT 7.12 is excluded). Read for background only.

Because Hamilton's equations are first order, the state at any instant is fixed by the $q$'s and $p$'s together: a point in a $2n$-dimensional phase space, moving along a trajectory. For a one-dimensional harmonic oscillator the trajectories are ellipses of constant energy in the $(x, p)$ plane, of area $2\pi E/\omega$; a damped oscillator spirals inwards to the origin.

Liouville's theorem states that under Hamiltonian motion the volume of any region of phase space never changes: it may stretch and squeeze, but its volume is conserved. The proof is that the flow has zero divergence, $\dfrac{\partial\dot q}{\partial q} + \dfrac{\partial\dot p}{\partial p} = \dfrac{\partial^2 H}{\partial q\,\partial p} - \dfrac{\partial^2 H}{\partial p\,\partial q} = 0$. Consequences: a frictionless system cannot settle to rest, and uncertainty in the initial state is never removed, only reshaped.

![Phase-space trajectories of a harmonic oscillator](fig/phase-space.svg)

*Figure. Phase space $(x,p)$. An undamped oscillator traces an ellipse of area $2\pi E/\omega$; with damping the trajectory spirals inward and the area shrinks, which a Hamiltonian system never does.*

## Reducing two bodies to one

Two bodies interacting through a force that depends only on their separation, such as the sun and a planet, need six coordinates. Use the centre of mass and the relative position:

$$\mathbf R = \frac{m_1\mathbf r_1 + m_2\mathbf r_2}{M},\qquad \mathbf r = \mathbf r_1 - \mathbf r_2$$

The Lagrangian then separates:

$$\boxed{L = \tfrac12 M\dot{\mathbf R}^2 + \tfrac12\mu\dot{\mathbf r}^2 - U(r),\qquad \mu = \frac{m_1m_2}{m_1 + m_2}}$$

$\mathbf R$ is cyclic, so the centre of mass moves uniformly and we can work in the frame where $\dot{\mathbf R} = 0$. What remains is a single particle of reduced mass $\mu$ in the central potential $U(r)$. For a central force the angular momentum is conserved, so the motion stays in a plane and polar coordinates $(r, \theta)$ suffice:

$$L = \tfrac12\mu\left(\dot r^2 + r^2\dot\theta^2\right) - U(r)$$

$\theta$ is cyclic, so its conjugate momentum is constant, and in time $dt$ the radius sweeps an area $dA = \tfrac12 r^2d\theta$:

$$\begin{gathered}\boxed{\ell = \mu r^2\dot\theta = \text{const}\quad\Longrightarrow\quad \frac{dA}{dt} = \tfrac12 r^2\dot\theta = \frac{\ell}{2\mu} = \text{const}} \\[4pt] (\text{Kepler II, any central force})\end{gathered}$$

The radial Euler–Lagrange equation is

$$\mu\ddot r = \frac{\ell^2}{\mu r^3} - U'(r)$$

![Two bodies orbiting their centre of mass](fig/two-body.svg)

*Figure. Both bodies orbit the centre of mass; the heavier one moves on the smaller circle.*

## The effective potential and the orbits

The energy is

$$\boxed{E = \tfrac12\mu\dot r^2 + U_\text{eff}(r),\qquad U_\text{eff}(r) = \frac{\ell^2}{2\mu r^2} - \frac kr,\quad k = Gm_1m_2}$$

The centrifugal term $\ell^2/2\mu r^2$ is the kinetic energy of the angular motion, but since $\ell$ is fixed it depends on $r$ alone and acts as a repulsive barrier. (The slides write $\ell^2/\mu r^2$; the factor $\tfrac12$ belongs.) The radial motion is that of a particle in one dimension in $U_\text{eff}$, which rises steeply at small $r$, has a minimum at $r_0 = \ell^2/\mu k$, and approaches zero from below:

| Energy | Radial motion | Orbit |
|---|---|---|
| $E = U_\text{eff,min} = -\mu k^2/2\ell^2$ | $r$ fixed | circle |
| $U_\text{eff,min} < E < 0$ | $r$ oscillates between two turning points | ellipse (bound) |
| $E = 0$ | comes from infinity, turns, escapes | parabola |
| $E > 0$ | same, with speed left over | hyperbola |

Solving with the substitution $u = 1/r$ gives the orbit explicitly:

$$\boxed{\frac{\alpha}{r} = 1 + \varepsilon\cos\theta,\qquad \alpha = \frac{\ell^2}{\mu k},\qquad \varepsilon = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}}$$

This is a conic with the centre of force at a focus: $\varepsilon = 0$ circle, $\varepsilon < 1$ ellipse (Kepler I), $\varepsilon = 1$ parabola, $\varepsilon > 1$ hyperbola. For an ellipse the period obeys Kepler III:

$$\boxed{T^2 = \frac{4\pi^2}{G(m_1 + m_2)}\,a^3}$$

⚠ Background only: bound orbits close on themselves for every initial condition only for $U \propto -1/r$ and $U \propto r^2$ (Bertrand).

![Effective potential and the conic-section orbits](fig/effective-potential-orbits.svg)

*Figure. Left: $U_\mathrm{eff}=\ell^2/2\mu r^2-k/r$ with the energy levels that give each orbit. Right: the orbits $r=p/(1+e\cos\theta)$ for eccentricity $e=0,\ 0.5,\ 1,\ 1.6$.*

## Beyond two bodies

⚠ Background only. Newton showed that his law of gravitation implies Kepler's three laws for any two-body system. The planets disturb one another slightly, and the departures from Kepler's ellipses led to the discovery of Neptune at the position predicted from the irregularities of Uranus's orbit. With three or more bodies no general closed-form solution exists; special configurations have exact solutions, and in general the motion can be chaotic, as Poincaré first found.

# Reference: Hamiltonian dynamics and the two-body problem

The course material section by section, in the order of the textbook, with the key formulas.

## Hamiltonian (MT 7.10, `Lagrangian.tex:335`)

$$
p_k = \frac{\partial L}{\partial \dot q_k},\qquad H(q, p, t) = \sum_k p_k \dot q_k - L,\qquad \dot q_k = \frac{\partial H}{\partial p_k},\quad \dot p_k = -\frac{\partial H}{\partial q_k}
$$

- Legendre transform: replace q̇ by p. Express every q̇ through p before writing H.
- n degrees of freedom: 2n first-order equations (Lagrange: n second-order).
- H = T + U when the coordinates have no explicit t and U = U(q). dH/dt = ∂H/∂t, so H is conserved if it has no explicit t.
- Cyclic coordinate (missing from H): its p is conserved.
- Conjugate momentum need not be mv: charged particle p = mv + qA; relativistic p = γmv.
- MT E7.11 (particle on a cylinder, F = −kr): H = p\_θ²/2mR² + p\_z²/2m + ½k(R² + z²). p\_θ constant; z is SHM with ω = √(k/m). (The slide drops the square on p\_z and the constant ½kR².)

## Phase space and Liouville (`STR.tex:50`)

- State = point (q₁…qₙ, p₁…pₙ) in 2n-dimensional phase space; motion = trajectory.
- 1-D SHO: ellipses of constant E, area 2πE/ω. Damped oscillator: spiral into the origin.
- Liouville: a region of phase space keeps its volume under Hamiltonian flow (stretches, never compresses).
- Proof sketch: ∂q̇/∂q + ∂ṗ/∂p = ∂²H/∂q∂p − ∂²H/∂p∂q = 0 (incompressible flow).
- Consequences: no settling to rest without friction; initial uncertainty persists; basis of statistical mechanics.

## Two-body problem (MT ch 8, `Lagrangian.tex:352`)

- R = (m₁r₁ + m₂r₂)/M, r = r₁ − r₂; L = ½MṘ² + ½μṙ² − U(r), μ = m₁m₂/(m₁ + m₂).
- R cyclic: centre of mass moves uniformly, set Ṙ = 0. L conserved: motion in a plane, use (r, θ).
- L = ½μ(ṙ² + r²θ̇²) − U(r). θ cyclic: ℓ = μr²θ̇ constant.
- Kepler II: dA/dt = ½r²θ̇ = ℓ/2μ, constant (any central force).
- Radial equation: μr̈ = ℓ²/(μr³) − U′(r).

$$
E = \tfrac12\mu\dot r^2 + U_{\text{eff}}(r),\qquad U_{\text{eff}} = \frac{\ell^2}{2\mu r^2} - \frac{k}{r},\quad k = Gm_1m_2
$$

- (The slides write ℓ²/μr²; the factor ½ belongs.) Circular orbit at the minimum, r₀ = ℓ²/μk.
- E = U\_eff,min: circle. U\_eff,min < E < 0: bound, between two turning points. E ≥ 0: unbound.

$$
\frac{\alpha}{r} = 1 + \varepsilon\cos\theta,\qquad \alpha = \frac{\ell^2}{\mu k},\qquad \varepsilon = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}
$$

- ε = 0 circle, ε < 1 (E < 0) ellipse (Kepler I), ε = 1 (E = 0) parabola, ε > 1 hyperbola.
- Kepler III: T² = 4π²a³/G(m₁ + m₂).
- Orbit equation (u = 1/r): d²u/dθ² + u = −(μ/ℓ²u²)F(1/u).
- Closed bound orbits for all initial conditions only for U ∝ r⁻¹ and U ∝ r² (Bertrand).
- Perturbations: Neptune predicted from Uranus. Three-body problem: no general closed solution, can be chaotic.

## What to be able to do without notes

- Find pₖ and H from a Lagrangian, written in q and p, and write Hamilton's equations.
- Explain phase space, sketch trajectories, state Liouville's theorem and sketch its proof.
- Reduce two bodies to one, derive Kepler II, derive U\_eff, classify orbits by E.
- Quote the conic orbit and Kepler's laws.

# Formulas: Hamiltonian dynamics and the two-body problem

## Hamilton's equations

$$\boxed{p_k = \frac{\partial L}{\partial\dot q_k},\qquad H(q, p, t) = \sum_k p_k\dot q_k - L,\qquad \dot q_k = \frac{\partial H}{\partial p_k},\quad \dot p_k = -\frac{\partial H}{\partial q_k}}$$

Express every $\dot q$ through $p$ before writing $H$. With $n$ degrees of freedom you get $2n$ first-order equations (Lagrange gives $n$ second-order ones).

$$\frac{dH}{dt} = \frac{\partial H}{\partial t},\qquad H = T + U\ \text{ if the coordinates have no explicit } t \text{ and } U = U(q)$$

A coordinate missing from $H$ has a conserved $p$.

The conjugate momentum need not be $mv$: for a charged particle $p = mv + qA$; relativistically $p = \gamma mv$.

**Example (particle on a cylinder, $F = -kr$, MT E7.11):**

$$H = \frac{p_\theta^2}{2mR^2} + \frac{p_z^2}{2m} + \tfrac12 k(R^2 + z^2)$$

$p_\theta$ is constant and $z$ is simple harmonic with $\omega = \sqrt{k/m}$.

## Phase space and Liouville

A state is one point $(q_1,\dots,q_n,p_1,\dots,p_n)$ in $2n$-dimensional phase space.

| System | Trajectory |
|---|---|
| 1-D SHO | ellipses $\dfrac{p^2}{2m} + \tfrac12 kx^2 = E$, enclosing area $\dfrac{2\pi E}{\omega}$ |
| damped oscillator | spiral into the origin |

$$\boxed{\frac{\partial\dot q}{\partial q} + \frac{\partial\dot p}{\partial p} = \frac{\partial^2H}{\partial q\,\partial p} - \frac{\partial^2H}{\partial p\,\partial q} = 0}\quad\Rightarrow\quad\text{phase-space volume is conserved (Liouville)}$$

## Two-body problem

Centre of mass and relative coordinates:

$$\vec R = \frac{m_1\vec r_1 + m_2\vec r_2}{M},\quad \vec r = \vec r_1 - \vec r_2,\quad \mu = \frac{m_1 m_2}{m_1 + m_2},\qquad L = \tfrac12 M\dot R^2 + \tfrac12\mu\dot r^2 - U(r)$$

$\vec R$ is cyclic, so the centre of mass moves uniformly. $\vec L$ is conserved, so motion is planar:

$$L = \tfrac12\mu(\dot r^2 + r^2\dot\theta^2) - U(r),\qquad \boxed{\ell = \mu r^2\dot\theta = \text{const}},\qquad \frac{dA}{dt} = \frac{\ell}{2\mu}\ \ \text{(Kepler II)}$$

**Radial motion:**

$$\mu\ddot r = \frac{\ell^2}{\mu r^3} - U'(r),\qquad \boxed{E = \tfrac12\mu\dot r^2 + U_\text{eff}(r),\quad U_\text{eff} = \frac{\ell^2}{2\mu r^2} - \frac kr,\quad k = Gm_1m_2}$$

Circular orbit at the minimum of $U_\text{eff}$:

$$r_0 = \frac{\ell^2}{\mu k},\qquad U_\text{eff,min} = -\frac{\mu k^2}{2\ell^2}$$

| Energy | Orbit |
|---|---|
| $E = U_\text{eff,min}$ | circle |
| $U_\text{eff,min} < E < 0$ | bound, between two turning points |
| $E \ge 0$ | unbound |

**Shape of the orbit:**

$$\boxed{\frac{\alpha}{r} = 1 + \varepsilon\cos\theta,\qquad \alpha = \frac{\ell^2}{\mu k},\qquad \varepsilon = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}}$$

| $\varepsilon$ | Conic |
|---|---|
| $0$ | circle |
| $0 < \varepsilon < 1$ ($E < 0$) | ellipse (Kepler I) |
| $1$ ($E = 0$) | parabola |
| $> 1$ ($E > 0$) | hyperbola |

$$\text{Kepler III:}\quad T^2 = \frac{4\pi^2a^3}{G(m_1 + m_2)}$$

**Orbit equation** with $u = 1/r$:

$$\frac{d^2u}{d\theta^2} + u = -\frac{\mu}{\ell^2u^2}F\!\left(\frac1u\right)$$

Closed bound orbits for every initial condition occur only for $U\propto r^{-1}$ and $U\propto r^2$ (Bertrand).
# Practice: Hamiltonian dynamics and the two-body problem

28 questions with worked answers (tap a solution to open it). Points in brackets, midsem style.

## A. State and explain

### Problem 1 [Mechanics 3 · Recall · 2 pts]

Define the conjugate momentum and the Hamiltonian. When is H the total energy, and when is it conserved?

*Solution.* **Conjugate momentum and Hamiltonian.**

$$p_k = \frac{\partial L}{\partial\dot q_k},\qquad H(q,p,t) = \sum_kp_k\dot q_k - L$$

with $H$ written as a function of $q$ and $p$ (not $\dot q$).

**$H$ is the total energy** $T + U$ when the relation between generalised and Cartesian coordinates does not depend explicitly on time (so $T$ is quadratic in $\dot q$) and $U$ depends only on $q$.

**$H$ is conserved** when it has no explicit time dependence, because

$$\frac{dH}{dt} = \frac{\partial H}{\partial t}$$

**Common mistake.** $H$ can be conserved without being the energy (a bead on a rotating hoop), and can be the energy without being conserved (a driven system).

### Problem 2 [Mechanics 3 · Recall · 2 pts]

Write Hamilton's equations. How do they compare in number and order with Lagrange's?

*Solution.* **Hamilton's equations.**

$$\dot q_k = \frac{\partial H}{\partial p_k},\qquad \dot p_k = -\frac{\partial H}{\partial q_k}$$

**Comparison with Lagrange.**

| | Lagrange | Hamilton |
|---|---|---|
| number of equations | $n$ | $2n$ |
| order | second | first |
| variables | $q,\dot q$ | $q,p$ (treated symmetrically) |

Hamilton's form is the natural starting point for phase space, Liouville's theorem and quantum mechanics.

### Problem 3 [Mechanics 3 · Recall · 2 pts]

What is phase space? Sketch phase trajectories for a harmonic oscillator and for a damped one.

*Solution.* **Phase space.** The $2n$-dimensional space of all $(q_1,\dots,q_n,p_1,\dots,p_n)$. Each state of the system is one **point**, and the motion is a **curve**.

**Harmonic oscillator** ($H = p^2/2m + \tfrac12m\omega^2x^2$): the trajectories are closed **ellipses** about the origin, one for each energy. Larger $E$ gives a larger ellipse, with area $2\pi E/\omega$.

**Damped oscillator.** Energy is lost, so the trajectory **spirals inward** to the origin and the enclosed area shrinks.

**Key property.** Trajectories of an autonomous system never cross, because the state determines the future uniquely.

### Problem 4 [Mechanics 3 · Recall · 3 pts]

State Liouville's theorem and give two consequences.

*Solution.* **Liouville's theorem.** For Hamiltonian (frictionless) motion, the **volume of any region of phase space is constant** as it flows. The flow is **incompressible**:

$$\sum_k\left(\frac{\partial\dot q_k}{\partial q_k} + \frac{\partial\dot p_k}{\partial p_k}\right) = 0$$

**Consequences.**

1. A conservative system **cannot settle into an equilibrium point or attractor**, since that would shrink a region of phase space to a point. Only dissipation does that.
2. **Uncertainty in the initial state** is never removed by the motion, only reshaped (stretched and folded).
3. It is the starting point for **statistical mechanics**: a uniform distribution over an energy surface stays uniform.

### Problem 5 [Mechanics 3 · Recall · 3 pts · 2026 midsem Q3]

For the two-body problem, derive Kepler's second law.

*Solution.* **Reduce to relative motion.** In the centre-of-mass frame

$$L = \tfrac12\mu\left(\dot r^2 + r^2\dot\theta^2\right) - U(r)$$

**$\theta$ is cyclic**, so Lagrange's equation gives a constant:

$$\ell = \mu r^2\dot\theta = \text{constant}$$

**Area swept.** In time $dt$ the radius vector sweeps a thin triangle of area $dA = \tfrac12r\cdot r\,d\theta$:

$$\frac{dA}{dt} = \tfrac12r^2\dot\theta = \boxed{\frac\ell{2\mu}} = \text{constant}$$

Equal areas in equal times: this holds for **any** central force, not only gravity.

### Problem 6 [Mechanics 3 · Recall · 2 pts]

What is the reduced mass? Why can we set Ṙ = 0 and treat the relative motion as two-dimensional?

*Solution.* **Reduced mass.** For two bodies, with $\mathbf r = \mathbf r_1 - \mathbf r_2$ and $M = m_1 + m_2$:

$$\mu = \frac{m_1m_2}{m_1 + m_2}$$

**Why $\dot{\mathbf R} = 0$.** The centre-of-mass coordinate $\mathbf R$ is cyclic (no external force), so $M\dot{\mathbf R}$ is constant. We are free to choose the inertial frame where $\dot{\mathbf R} = 0$.

**Why the motion is planar.** For a central force $\mathbf L = \mathbf r\times\mathbf p$ is constant, and $\mathbf r\perp\mathbf L$ always, so $\mathbf r$ stays in a fixed plane. Two coordinates $(r,\theta)$ suffice.

### Problem 7 [Mechanics 3 · Recall · 3 pts]

Explain the effective potential and the kinds of orbit for different total energies.

*Solution.* **Radial energy.** Using $\dot\theta = \ell/\mu r^2$:

$$E = \tfrac12\mu\dot r^2 + U_\text{eff}(r),\qquad U_\text{eff} = \frac{\ell^2}{2\mu r^2} + U(r)$$

The $\ell^2/2\mu r^2$ term is the "centrifugal barrier": it keeps the particle from reaching $r = 0$ when $\ell\ne0$.

**Orbits for gravity** ($U = -k/r$):

| energy | orbit |
|---|---|
| $E = U_\text{eff,min}$ | circle |
| $U_\text{eff,min} < E < 0$ | ellipse, between $r_\text{min}$ and $r_\text{max}$ |
| $E = 0$ | parabola |
| $E > 0$ | hyperbola (unbound) |

**Common mistake.** $\dot r = 0$ at the turning points, not at $r = 0$.

### Problem 8 [Mechanics 3 · Recall · 2 pts]

For which power-law potentials are bound orbits closed? Why is there no general solution of the three-body problem?

*Solution.* **Closed bound orbits.** Bertrand's theorem: only two central potentials give closed orbits for all bound motion:

$$U \propto -\frac1r\ \ (\text{gravity, Coulomb}),\qquad U \propto r^2\ \ (\text{harmonic oscillator})$$

For other power laws the orbit precesses (the apsides rotate).

**Three bodies.** Three bodies in 3-D have $9$ degrees of freedom. The known conserved quantities (energy, momentum, angular momentum, centre-of-mass motion) are too few to reduce the problem to integrals, and Poincaré showed there are no further analytic ones. The problem is non-integrable and generally chaotic; only special configurations (e.g. Lagrange's points) have exact solutions.

## B. Show or derive

### Problem 9 [Mechanics 3 · Derivation · 4 pts · 2025 midsem Q7]

For projectile motion write the Lagrangian and Hamiltonian, and the equations of motion in both formulations.

*Solution.* **Lagrangian.**

$$L = \tfrac12m(\dot x^2 + \dot y^2) - mgy$$

**Lagrange's equations.**

$$m\ddot x = 0,\qquad m\ddot y = -mg$$

**Hamiltonian.** $p_x = m\dot x$, $p_y = m\dot y$:

$$H = \sum p\dot q - L = \frac{p_x^2 + p_y^2}{2m} + mgy$$

**Hamilton's equations.**

$$\dot x = \frac{p_x}m,\quad \dot p_x = 0;\qquad \dot y = \frac{p_y}m,\quad \dot p_y = -mg$$

Four first-order equations replace two second-order ones. $x$ is cyclic, so $p_x$ is conserved; $\partial H/\partial t = 0$, so $H = E$ is conserved.

### Problem 10 [Mechanics 3 · Derivation · 8 pts · 2026 midsem Q10] (hard)

A charge q of mass m moves in a uniform field B = Bẑ, with A = ½B × r and L = ½mṙ² + qA·ṙ. Write L in Cartesian coordinates. Find the conjugate momenta; are they equal to mv? Construct the Hamiltonian. Comment.

*Solution.* **Lagrangian.** $\mathbf A = \tfrac12\mathbf B\times\mathbf r = \tfrac12B(-y, x, 0)$, so

$$L = \tfrac12m(\dot x^2 + \dot y^2 + \dot z^2) + \tfrac12qB(x\dot y - y\dot x)$$

**Conjugate momenta.**

$$p_x = m\dot x - \tfrac12qBy,\qquad p_y = m\dot y + \tfrac12qBx,\qquad p_z = m\dot z$$

These are **not** $m\mathbf v$: in general $\mathbf p = m\mathbf v + q\mathbf A$.

**Hamiltonian.** $H = \mathbf p\cdot\mathbf v - L$. The magnetic term is linear in velocity and drops out:

$$H = \tfrac12mv^2 = \boxed{\frac{(p_x + \tfrac12qBy)^2 + (p_y - \tfrac12qBx)^2 + p_z^2}{2m}}$$

**Comment.** $H$ is just the kinetic energy and is conserved, because the magnetic force does no work. The motion is a circle in the $xy$-plane at the cyclotron frequency $\omega_c = qB/m$, drifting uniformly along $z$.

**Common mistake.** Writing $H$ with $mv$ in place of $\mathbf p - q\mathbf A$: $H$ must be a function of $(\mathbf r,\mathbf p)$.

### Problem 11 [Mechanics 3 · Derivation · 4 pts · MT E7.11]

A particle is confined to a cylinder of radius R and acted on by F = −kr. Find H and Hamilton's equations in cylindrical coordinates, and solve for θ(t) and z(t).

*Solution.* **Coordinates.** On the cylinder $\mathbf r = (R\cos\theta, R\sin\theta, z)$, so

$$T = \tfrac12m\left(R^2\dot\theta^2 + \dot z^2\right),\qquad U = \tfrac12kr^2 = \tfrac12k(R^2 + z^2)$$

**Momenta.** $p_\theta = mR^2\dot\theta$, $p_z = m\dot z$.

$$H = \frac{p_\theta^2}{2mR^2} + \frac{p_z^2}{2m} + \tfrac12k(R^2 + z^2)$$

**Hamilton's equations.**

$$\dot\theta = \frac{p_\theta}{mR^2},\quad \dot p_\theta = 0;\qquad \dot z = \frac{p_z}m,\quad \dot p_z = -kz$$

**Solve.** $p_\theta$ is constant, so $\theta(t) = \omega t + \theta_0$ with $\omega = p_\theta/mR^2$. And $\ddot z = -(k/m)z$:

$$\boxed{z(t) = A\cos\left(\sqrt{k/m}\,t + \varphi\right)}$$

Uniform rotation around the cylinder, simple harmonic motion along it.

### Problem 12 [Mechanics 3 · Derivation · 3 pts]

For a 1-D harmonic oscillator, write H and Hamilton's equations. Show that phase trajectories are ellipses and find their area.

*Solution.* **Hamiltonian and equations.**

$$H = \frac{p^2}{2m} + \tfrac12m\omega^2x^2,\qquad \dot x = \frac pm,\quad \dot p = -m\omega^2x$$

**Constant energy.** On $H = E$:

$$\frac{x^2}{2E/m\omega^2} + \frac{p^2}{2mE} = 1$$

an **ellipse** with semi-axes $a = \sqrt{2E/m\omega^2}$ (in $x$) and $b = \sqrt{2mE}$ (in $p$).

**Area.**

$$A = \pi ab = \pi\sqrt{\frac{2E}{m\omega^2}\cdot2mE} = \boxed{\frac{2\pi E}\omega}$$

**Check.** $A = E\,T$ with period $T = 2\pi/\omega$; in quantum mechanics this area is $2\pi\hbar(n + \tfrac12)$.

### Problem 13 [Mechanics 3 · Derivation · 3 pts]

Sketch the proof of Liouville's theorem.

*Solution.* **Idea.** Let the points of a region of phase space flow with velocity $(\dot q_k, \dot p_k)$. The volume $V$ of the region changes at a rate given by the divergence of this flow:

$$\frac{dV}{dt} = \int\nabla\cdot(\dot{\mathbf q},\dot{\mathbf p})\,dV$$

**Compute the divergence** using Hamilton's equations $\dot q_k = \partial H/\partial p_k$, $\dot p_k = -\partial H/\partial q_k$:

$$\sum_k\left(\frac{\partial\dot q_k}{\partial q_k} + \frac{\partial\dot p_k}{\partial p_k}\right) = \sum_k\left(\frac{\partial^2H}{\partial q_k\partial p_k} - \frac{\partial^2H}{\partial p_k\partial q_k}\right) = 0$$

The flow is **incompressible**: phase-space volumes (and the density along a trajectory) are constant.

**Consequences.** Dissipative systems must lose phase-space volume (so they are not Hamiltonian), and attractors are impossible in Hamiltonian flow.

### Problem 14 [Mechanics 3 · Derivation · 4 pts]

Show that the two-body Lagrangian separates into centre-of-mass and relative parts, and find μ.

*Solution.* **Coordinates.** Let $\mathbf R = (m_1\mathbf r_1 + m_2\mathbf r_2)/M$ and $\mathbf r = \mathbf r_1 - \mathbf r_2$. Then

$$\mathbf r_1 = \mathbf R + \frac{m_2}M\mathbf r,\qquad \mathbf r_2 = \mathbf R - \frac{m_1}M\mathbf r$$

**Kinetic energy.**

$$T = \tfrac12m_1\left(\dot{\mathbf R} + \tfrac{m_2}M\dot{\mathbf r}\right)^2 + \tfrac12m_2\left(\dot{\mathbf R} - \tfrac{m_1}M\dot{\mathbf r}\right)^2$$

The cross terms $\pm\dfrac{m_1m_2}M\dot{\mathbf R}\cdot\dot{\mathbf r}$ cancel, leaving

$$T = \tfrac12M\dot{\mathbf R}^2 + \tfrac12\frac{m_1m_2^2 + m_2m_1^2}{M^2}\dot{\mathbf r}^2 = \tfrac12M\dot{\mathbf R}^2 + \tfrac12\mu\dot{\mathbf r}^2$$

$$\boxed{\mu = \frac{m_1m_2}{m_1 + m_2}}$$

With $U = U(|\mathbf r|)$, $L = \tfrac12M\dot{\mathbf R}^2 + \left[\tfrac12\mu\dot{\mathbf r}^2 - U(r)\right]$: two **independent** problems.

### Problem 15 [Mechanics 3 · Derivation · 4 pts]

Derive the radial equation of motion and U\_eff for gravity. Find the radius of the circular orbit for a given ℓ.

*Solution.* **Radial equation.** From $L = \tfrac12\mu(\dot r^2 + r^2\dot\theta^2) - U(r)$:

$$\mu\ddot r = \mu r\dot\theta^2 - U'(r) = \frac{\ell^2}{\mu r^3} - U'(r)$$

using $\dot\theta = \ell/\mu r^2$. This is 1-D motion $\mu\ddot r = -dU_\text{eff}/dr$ with

$$U_\text{eff} = \frac{\ell^2}{2\mu r^2} - \frac kr\quad(\text{gravity: } U = -k/r)$$

**Circular orbit.** $\ddot r = 0$, that is $U_\text{eff}'(r_0) = 0$:

$$-\frac{\ell^2}{\mu r_0^3} + \frac k{r_0^2} = 0\ \Rightarrow\ \boxed{r_0 = \frac{\ell^2}{\mu k}}$$

**Check.** $U_\text{eff}'' > 0$ there, so it is a stable minimum.

### Problem 16 [Mechanics 3 · Derivation · 4 pts · MT ch 8 style]

A particle moves in a central force along the spiral r = ke^(αθ). Find the force law.

*Solution.* **Use the orbit equation** for a central force $F(r)$, with $u = 1/r$:

$$\frac{d^2u}{d\theta^2} + u = -\frac\mu{\ell^2u^2}F(1/u)$$

**Spiral.** $r = ke^{\alpha\theta}$ gives $u = \dfrac1ke^{-\alpha\theta}$, so $\dfrac{d^2u}{d\theta^2} = \alpha^2u$.

Substitute:

$$(1 + \alpha^2)u = -\frac\mu{\ell^2u^2}F \Rightarrow F = -\frac{\ell^2}\mu(1 + \alpha^2)u^3$$

$$\boxed{F(r) = -\frac{\ell^2(1 + \alpha^2)}{\mu\,r^3}}$$

an **attractive inverse-cube** force.

### Problem 17 [Mechanics 3 · Derivation · 3 pts]

Write the Hamiltonian and Hamilton's equations for a simple pendulum.

*Solution.* **Lagrangian.** With $\theta$ from the downward vertical:

$$L = \tfrac12ml^2\dot\theta^2 + mgl\cos\theta$$

**Momentum.** $p_\theta = \dfrac{\partial L}{\partial\dot\theta} = ml^2\dot\theta$.

**Hamiltonian.**

$$H = p_\theta\dot\theta - L = \boxed{\frac{p_\theta^2}{2ml^2} - mgl\cos\theta}$$

**Hamilton's equations.**

$$\dot\theta = \frac{p_\theta}{ml^2},\qquad \dot p_\theta = -\frac{\partial H}{\partial\theta} = -mgl\sin\theta$$

Combining them gives $\ddot\theta = -(g/l)\sin\theta$ ✓.

## C. Numericals

### Problem 18 [Mechanics 3 · Numerical · 2 pts]

The earth is 81 times as massive as the moon. Express the reduced mass of the earth–moon system in terms of the moon's mass.

*Solution.* **Idea.** Reduced mass $\mu = \dfrac{m_1m_2}{m_1 + m_2}$.

$$\mu = \frac{(81m)(m)}{81m + m} = \frac{81}{82}\,m \approx \boxed{0.988\,m_\text{moon}}$$

Because the earth is so much heavier, the moon behaves almost as if it orbits a fixed centre.

### Problem 19 [Mechanics 3 · Numerical · 2 pts]

Mars orbits at 1.52 AU. Find its period (1.52^(3/2) ≈ 1.87).

*Solution.* **Idea.** Kepler III: $T^2 \propto a^3$. In years and AU, Earth has $T = 1$ at $a = 1$, so $T = a^{3/2}$.

$$T = (1.52)^{3/2} \approx \boxed{1.87\ \text{yr}}$$

### Problem 20 [Mechanics 3 · Numerical · 2 pts]

Show that the escape speed from a planet's surface is √2 times the speed of a circular orbit skimming the surface.

*Solution.* **Escape:** the total energy is zero at the escape speed:

$$\tfrac12mv_\text{esc}^2 - \frac{GMm}{R} = 0\ \Rightarrow\ v_\text{esc} = \sqrt{\frac{2GM}{R}}$$

**Circular orbit** at the surface: gravity supplies the centripetal force:

$$\frac{mv_c^2}{R} = \frac{GMm}{R^2}\ \Rightarrow\ v_c = \sqrt{\frac{GM}{R}}$$

$$\boxed{\frac{v_\text{esc}}{v_c} = \sqrt2}$$

### Problem 21 [Mechanics 3 · Numerical · 2 pts]

Show that an orbit with E = −μk²/2ℓ² is a circle.

*Solution.* **Idea.** The orbit's shape is set by $\varepsilon = \sqrt{1 + \dfrac{2E\ell^2}{\mu k^2}}$.

With $E = -\dfrac{\mu k^2}{2\ell^2}$:

$$\varepsilon = \sqrt{1 + \frac{2\ell^2}{\mu k^2}\left(-\frac{\mu k^2}{2\ell^2}\right)} = \sqrt{1 - 1} = 0\ \Rightarrow\ \text{a circle}$$

**Check.** This value is exactly the minimum of $U_\text{eff}$ (at $r_0 = \ell^2/\mu k$), where $\dot r = 0$ for all time.

## D. Estimate

### Problem 22 [Mechanics 3 · Numerical · 2 pts]

Estimate the earth's orbital speed (1 AU = 1.5 × 10¹¹ m, 1 yr ≈ 3.15 × 10⁷ s).

*Solution.* **Idea.** Circular orbit: speed $=$ circumference $\div$ period.

$$v = \frac{2\pi r}{T} = \frac{2\pi(1.5\times10^{11}\ \text{m})}{3.15\times10^7\ \text{s}} = \frac{9.4\times10^{11}}{3.15\times10^7} \approx \boxed{3\times10^4\ \text{m/s}}$$

That is about $30$ km/s.


## D. More practice: orbits and Hamilton's equations

### Problem 23 [Mechanics 3 · Numerical · 3 pts]

Find the speed and period of a satellite in a circular orbit at altitude $400$ km. ($GM_E = 3.986\times10^{14}$ m$^3$/s$^2$, $R_E = 6.371\times10^6$ m.)

*Solution.* **Idea.** Gravity provides the centripetal force: $\dfrac{mv^2}r = \dfrac{GMm}{r^2}$.

$$r = 6.371\times10^6 + 0.4\times10^6 = 6.77\times10^6\ \text{m}$$

$$v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{3.986\times10^{14}}{6.77\times10^6}} = \boxed{7.67\ \text{km/s}}$$

$$T = \frac{2\pi r}{v} = \frac{2\pi(6.77\times10^6)}{7.67\times10^3} = 5.55\times10^3\ \text{s} \approx \boxed{92.5\ \text{min}}$$

**Check.** About $16$ orbits per day, which matches the International Space Station.

### Problem 24 [Mechanics 3 · Numerical · 2 pts]

Mars orbits at a mean distance of $1.524$ AU. Use Kepler's third law to find its year in Earth years.

*Solution.* **Idea.** $T^2\propto a^3$, and for the Earth $T = 1$ yr at $a = 1$ AU, so $T^2 = a^3$ in these units.

$$T = a^{3/2} = (1.524)^{1.5} = 1.524\times1.2345 = \boxed{1.88\ \text{yr}}$$

**Check.** That is about $687$ days, the known length of a Martian year.

### Problem 25 [Mechanics 3 · Numerical · 2 pts]

Find the escape speed from the surface of the Earth, and explain why it is $\sqrt2$ times the circular-orbit speed at the surface.

*Solution.* **Idea.** Escape means total energy $\ge 0$: $\tfrac12mv^2 - \dfrac{GMm}R = 0$.

$$v_\text{esc} = \sqrt{\frac{2GM}R} = \sqrt{\frac{2(3.986\times10^{14})}{6.371\times10^6}} = \boxed{11.2\ \text{km/s}}$$

**The factor $\sqrt2$.** At the surface the circular-orbit speed is $v_c = \sqrt{GM/R} = 7.9$ km/s, and $v_\text{esc} = \sqrt2\,v_c$ since a circular orbit has $E = -\tfrac12|U|$ while escape needs $E = 0$, which means twice the kinetic energy.

### Problem 26 [Mechanics 3 · Numerical · 3 pts]

A $1000$ kg satellite is in a circular orbit of radius $7.0\times10^6$ m. Find its kinetic energy, potential energy and total energy.

*Solution.* **Idea.** For a circular orbit $K = \dfrac{GMm}{2r}$, $U = -\dfrac{GMm}r$ and $E = -\dfrac{GMm}{2r}$.

$$\frac{GMm}{r} = \frac{(3.986\times10^{14})(1000)}{7.0\times10^6} = 5.69\times10^{10}\ \text{J}$$

$$K = \boxed{+2.85\times10^{10}\ \text{J}},\qquad U = \boxed{-5.69\times10^{10}\ \text{J}},\qquad E = \boxed{-2.85\times10^{10}\ \text{J}}$$

**Check.** $E = K = -\tfrac12U$ (the virial theorem for a $1/r$ potential). Losing energy through drag lowers $r$ and **raises** the speed: the satellite speeds up as it spirals in.

### Problem 27 [Mechanics 3 · Derivation · 3 pts]

For the harmonic oscillator $H = \dfrac{p^2}{2m} + \dfrac12kx^2$, write Hamilton's equations and show that they reproduce Newton's second law.

*Solution.* **Hamilton's equations:**

$$\dot x = \frac{\partial H}{\partial p} = \frac pm,\qquad \dot p = -\frac{\partial H}{\partial x} = -kx$$

**Eliminate $p$.** Differentiate the first: $\ddot x = \dot p/m = -kx/m$, so

$$\boxed{m\ddot x = -kx}$$

which is Newton's law with the spring force $-kx$.

**Bonus.** $H$ does not depend on time explicitly, so $H = E$ is conserved, and the phase-space trajectories are the ellipses $\dfrac{p^2}{2mE} + \dfrac{x^2}{2E/k} = 1$.

### Problem 28 [Mechanics 3 · Numerical · 3 pts]

Halley's comet has perihelion $0.586$ AU, aphelion $35.1$ AU and a perihelion speed of $54.5$ km/s. Find its speed at aphelion.

*Solution.* **Idea.** The gravitational force is central, so angular momentum $L = mvr$ is conserved; at perihelion and aphelion the velocity is perpendicular to the radius.

$$v_ar_a = v_pr_p\ \Rightarrow\ v_a = v_p\frac{r_p}{r_a} = 54.5\times\frac{0.586}{35.1} = \boxed{0.91\ \text{km/s}}$$

**Check.** The comet is slowest where it is farthest from the Sun, as it must be; the speed ratio equals the inverse distance ratio, about $60$.
