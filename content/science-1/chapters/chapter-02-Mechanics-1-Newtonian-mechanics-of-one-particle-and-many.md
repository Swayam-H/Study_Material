# Learn: Newtonian mechanics of one particle and many

Newton's three laws, the work–energy theorem, conservative forces and the conservation of momentum, angular momentum and energy, first for one particle and then for systems of particles, including variable mass. Sources: slides `CM-1particle.tex` and `CM-SystemOfParticles.tex`, MT ch 1–2 and 9, HW lectures 5 and 8 (MT E2.2, E2.4, E2.10, P2.27–P2.53, E9.1, E9.3, E9.10, 9.15, 9.11 rocket). Questions follow the 2025 midsem Q1, Q5 and Q8–Q10, the 2026 midsem Q1, and Quiz-1 Q2.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Newton's laws

The state of a particle at any instant is given by its position and its velocity, both vectors in a three-dimensional Cartesian frame. Newton's first law says that in the absence of forces a body continues at rest or in uniform motion in a straight line. This serves to define an inertial frame, one in which the law holds. The second law says that the rate of change of a body's momentum p = mv equals the net force acting on it, F = dp/dt. The third law says that when two bodies interact the forces they exert on each other are equal in magnitude and opposite in direction; in its strong form, which holds for central forces such as gravity, the forces also act along the line joining the bodies. Together the laws turn the problem of motion into the solution of a second-order differential equation: given the forces and the initial position and velocity, the whole future motion is determined.

## Work, energy and conservative forces

The work done by a force on a particle moving from one point to another is W = ∫F·dr. Using the second law, F·dr = m(dv/dt)·v dt = d(½mv²), so the work done equals the change in kinetic energy, W = K₂ − K₁. In general the work depends on the path taken. For some forces it does not, and these are called conservative. A conservative force can always be written as the negative gradient of a potential energy function, F = −∇U, and the work is then −(U₂ − U₁). Combining this with the work–energy theorem gives K₁ + U₁ = K₂ + U₂: the total mechanical energy is conserved. A practical test of whether a force is conservative is that its curl vanishes, ∇ × F = 0, which is equivalent to the work around every closed loop being zero. Gravity and the force of a spring pass this test; friction does not.

## Conservation of momentum and angular momentum

The second law also contains conservation laws for momentum. If the force has no component along some fixed direction s, then d(p·s)/dt = F·s = 0, so the momentum in that direction is constant. For a projectile, for example, gravity acts vertically, so the horizontal momentum is conserved. Rotational motion is handled in the same way. The angular momentum about an origin is L = r × p, and differentiating gives dL/dt = v × mv + r × F = r × F, the torque N. Where the torque has no component along some direction, the angular momentum in that direction is conserved. A central force, which always points towards or away from the origin, exerts no torque about it, so the angular momentum is conserved for planetary motion.

The energy can be examined in the same spirit. Differentiating E = T + U along the motion gives dE/dt = v·(F + ∇U) + ∂U/∂t. For a conservative force the first term vanishes, so energy is conserved provided the potential does not change with time.

## Galilean relativity

Two inertial frames moving relative to each other at constant velocity v are related by the Galilean transformation, in which positions shift by vt, times are the same, and velocities simply add, u′ = u − v. Since v is constant, accelerations are the same in both frames, and so are the forces. Newton's laws therefore take the same form in every inertial frame, and no mechanical experiment can reveal absolute motion. This principle of Galilean relativity is exactly what electromagnetism later appeared to violate, and its replacement is the subject of special relativity.

## Solving problems with constraints

The Newtonian method of solving a problem is to identify all the forces, draw a free-body diagram, add whatever constraint forces are needed to keep the body on its allowed path, and then solve the equations of motion with the initial conditions. A block on a smooth incline, for instance, is held on the surface by a normal force that exactly balances the component of gravity perpendicular to the incline, leaving the parallel component g sinθ to accelerate it; with friction the acceleration becomes g(sinθ − μ cosθ). For the incline the constraint force is constant, but for a pendulum the tension changes continuously as the bob swings. Constraint forces of this kind are a nuisance in the Newtonian method, which is one motivation for the Lagrangian approach.

## The harmonic oscillator and small oscillations

One system appears everywhere in physics: the simple harmonic oscillator. A mass on a spring obeys Hooke's law F = −kx, so mẍ = −kx, or ẍ + ω₀²x = 0 with ω₀ = √(k/m). The solution is a sinusoidal oscillation at the angular frequency ω₀, whatever the amplitude. Writing the equation as two first-order equations for x and p, its trajectories in the (x, p) phase plane are ellipses of constant energy. Measuring time in units of 1/ω₀ and distance in units of the amplitude reduces the equation to ξ″ + ξ = 0, which contains no parameters at all, so every harmonic oscillator is the same oscillator on a different scale. The reason the oscillator matters so much is that any system disturbed slightly from a stable equilibrium behaves like one. Near a minimum x₀ of a potential, U(x) ≈ U(x₀) + ½U″(x₀)(x − x₀)², which is a spring with effective constant k = U″(x₀). The frequency of small oscillations is therefore √(U″(x₀)/m).

## Systems of particles

For a collection of particles we define the total mass M, the centre of mass R = Σmₖrₖ/M, and the total momentum P = Σpₖ, which equals MV, the total mass times the velocity of the centre of mass. The forces on each particle are of two kinds, external forces from outside the system and internal forces between its members. By the third law the internal forces cancel in pairs when summed over the whole system, so that dP/dt = MŘ = F\_ext. The centre of mass moves as though the whole mass were concentrated there and acted on by the total external force, and when there is no external force the total momentum is conserved. For central internal forces the internal torques also cancel in pairs, so the rate of change of total angular momentum equals the total external torque. Both the angular momentum and the kinetic energy split neatly into a part due to the motion of the centre of mass and a part due to motion relative to it: L = R × MV + Σr′ₖ × p′ₖ and T = ½MV² + Σ½mₖv′ₖ².

## Variable mass

The second law in the form F = dp/dt must be applied carefully when the mass of a body changes. A rocket is the standard example. In a time dt it ejects a mass |dm| of exhaust at speed u backwards relative to itself, and conservation of momentum for the rocket and the ejected gas together gives m dv/dt = −u dm/dt + F\_ext. The first term on the right is the thrust. With no external force this integrates to v = u ln(m₀/m): the final speed depends on the exhaust speed and, only logarithmically, on the ratio of initial to final mass. In a uniform gravitational field the rocket lifts off only if the thrust exceeds its weight. Falling ropes and chains raise the same issue. When a hanging rope falls onto a table, the table must support not only the weight of the rope already on it but also stop the falling rope, and the rate at which momentum arrives adds a force equal to twice that weight, giving three times the weight of the rope already piled up.

## Limits of Newtonian mechanics

Newtonian mechanics is extraordinarily general, but it has limits. Constrained systems are awkward to handle with forces, which the Lagrangian formulation resolves. Electromagnetism is not consistent with Galilean relativity, and this leads to special relativity. And the stability of atoms cannot be understood classically at all, which requires quantum mechanics.

# Reference: Newtonian mechanics of one particle and many

The course material section by section, in the order of the textbook, with the key formulas.

## One particle (MT ch 2, `CM-1particle.tex`)

- Laws: I inertia (defines inertial frames); II F = dp/dt; III equal and opposite (along the line joining, for central forces).
- Work–energy: W = ∫F·dr = K₂ − K₁, K = ½mv².
- Conservative: F = −∇U ⇔ ∇ × F = 0 ⇔ W path-independent. Then K + U = constant.
- 2-D test: F = (Fₓ, F\_y) is conservative iff ∂F\_y/∂x = ∂Fₓ/∂y.
- Momentum along s conserved if F·s = 0.
- L = r × p, N = dL/dt = r × F. L along s conserved if N·s = 0. Central force: L conserved.
- dE/dt = ∂U/∂t, so E conserved when U = U(r).
- Galilean: u′ = u − v, t′ = t, F′ = F.

## Constrained motion and standard cases

| Case | Result |
| --- | --- |
| Incline, no friction | a = g sinθ, N = mg cosθ |
| Incline, kinetic friction μ | a = g(sinθ − μ cosθ) |
| Linear drag, falling | mṿ = mg − kv, v\_t = mg/k, v = v\_t(1 − e^(−kt/m)) |
| Projectile | x = v₀cosα t, y = v₀sinα t − ½gt²; range v₀² sin2α/g |

## Harmonic oscillator

- mẍ = −kx, ẍ + ω₀²x = 0, ω₀ = √(k/m); x = A cos(ω₀t + φ).
- First-order form: ẋ = p/m, ṗ = −kx. E = p²/2m + ½kx²; phase-plane ellipses.
- Non-dimensional: τ = ω₀t, ξ = x/x₀ gives ξ″ + ξ = 0 (no parameters left; ω₀ only sets the time scale).
- Small oscillations about a minimum x₀: k\_eff = U″(x₀), ω = √(U″(x₀)/m).

## Systems of particles (MT 9.1–9.5, `CM-SystemOfParticles.tex`)

- R = Σmₖrₖ/M; P = Σpₖ = MV.
- Internal forces cancel (third law): dP/dt = MŘ = F\_ext. No external force: P conserved.
- L = R × MV + Σr′ₖ × p′ₖ; dL/dt = Σ external torques (internal central torques cancel).
- T = ½MV² + Σ½mₖv′ₖ² (cross term vanishes since Σmₖv′ₖ = 0).
- Conservative internal and external forces: total energy constant.

## Variable mass (MT 9.11)

- Rocket, exhaust speed u relative to rocket: m dv/dt = −u dm/dt + F\_ext.
- Free space: v = v₀ + u ln(m₀/m).
- Vertical, constant burn rate α = −dm/dt, gravity: m dv/dt = uα − mg, v = u ln(m₀/m) − g(m₀ − m)/α. Lift-off needs uα > m₀g.
- Falling rope onto table: force = 3ρgx after length x has landed.

## Limitations

- Constraints awkward (Lagrange). EM breaks Galilean invariance (STR). Atomic stability unexplained (QM).

## What to be able to do without notes

- State Newton's laws and the conservation laws with their conditions.
- Test a force for being conservative and find its potential.
- Derive the work–energy theorem, dL/dt = N, dE/dt = ∂U/∂t.
- Set up and solve the SHO; non-dimensionalise; find small-oscillation frequencies.
- Derive the system results for P, L, T.
- Solve rocket and falling-rope problems.

# Formulas: Newtonian mechanics

## One particle

$$\boxed{\vec F = \frac{d\vec p}{dt} = m\vec a}\qquad\text{(law I defines inertial frames; law III: equal and opposite, along the line joining for central forces)}$$

**Work and energy**

$$W = \int_1^2 \vec F\cdot d\vec r = K_2 - K_1,\qquad K = \tfrac12 mv^2$$

**Conservative force** (equivalent statements; then $K + U$ is constant):

$$\boxed{\vec F = -\nabla U \iff \nabla\times\vec F = 0 \iff W\ \text{path-independent}}$$

In two dimensions the test is $\dfrac{\partial F_y}{\partial x} = \dfrac{\partial F_x}{\partial y}$.

**Angular momentum and torque**

$$\vec L = \vec r\times\vec p,\qquad \vec N = \frac{d\vec L}{dt} = \vec r\times\vec F,\qquad \frac{dE}{dt} = \frac{\partial U}{\partial t}$$

| Conserved when | Quantity |
|---|---|
| $\vec F\cdot\hat s = 0$ | momentum component along $\hat s$ |
| $\vec N\cdot\hat s = 0$ (e.g. central force) | angular momentum component along $\hat s$ |
| $U = U(\vec r)$, no explicit $t$ | energy $E$ |

**Galilean transformation:** $\vec u' = \vec u - \vec v$, $t' = t$, $\vec F' = \vec F$.

## Standard cases

| Case | Result |
|---|---|
| Frictionless incline | $a = g\sin\theta,\quad N = mg\cos\theta$ |
| Incline with kinetic friction $\mu$ | $a = g(\sin\theta - \mu\cos\theta)$ |
| Falling with linear drag | $m\dot v = mg - kv,\quad v_t = \dfrac{mg}{k},\quad v = v_t\left(1 - e^{-kt/m}\right)$ |
| Projectile | $x = v_0\cos\alpha\,t,\ \ y = v_0\sin\alpha\,t - \tfrac12 gt^2,\ \ R = \dfrac{v_0^2\sin 2\alpha}{g}$ |

## Harmonic oscillator

$$\boxed{\ddot x + \omega_0^2 x = 0,\quad \omega_0 = \sqrt{\frac km},\quad x = A\cos(\omega_0 t + \varphi)}$$

First-order form and energy (phase-plane ellipses):

$$\dot x = \frac pm,\quad \dot p = -kx,\qquad E = \frac{p^2}{2m} + \tfrac12 kx^2$$

Non-dimensional form with $\tau = \omega_0 t$, $\xi = x/x_0$: $\ \xi'' + \xi = 0$ (no parameters left).

**Small oscillations about a minimum $x_0$ of $U$:**

$$\boxed{k_\text{eff} = U''(x_0),\qquad \omega = \sqrt{\frac{U''(x_0)}{m}}}$$

## Systems of particles

$$\boxed{\vec R = \frac{\sum_k m_k\vec r_k}{M},\qquad \vec P = \sum_k\vec p_k = M\dot{\vec R},\qquad \frac{d\vec P}{dt} = \vec F_\text{ext}}$$

Internal forces cancel in pairs by the third law. Splitting about the centre of mass ($\vec r_k = \vec R + \vec r_k'$):

$$\vec L = \vec R\times M\dot{\vec R} + \sum_k\vec r_k'\times\vec p_k',\qquad \frac{d\vec L}{dt} = \sum\vec N_\text{ext}$$

$$T = \tfrac12 M\dot R^2 + \sum_k\tfrac12 m_k v_k'^2\qquad\text{(the cross term vanishes because } \textstyle\sum m_k\vec v_k' = 0)$$

## Variable mass (rocket)

With exhaust speed $u$ relative to the rocket:

$$\boxed{m\frac{dv}{dt} = -u\frac{dm}{dt} + F_\text{ext}}$$

| Situation | Result |
|---|---|
| Free space | $v = v_0 + u\ln\dfrac{m_0}{m}$ |
| Vertical, burn rate $\alpha = -dm/dt$, gravity $g$ | $v = u\ln\dfrac{m_0}{m} - \dfrac{g(m_0 - m)}{\alpha}$; lift-off needs $u\alpha > m_0 g$ |
| Rope falling onto a table | force on the table $= 3\rho g x$ once length $x$ has landed |
# Practice: Newtonian mechanics of one particle and many

28 questions with worked answers (tap a solution to open it). Points in brackets, midsem style.

## A. State and explain

### Problem 1 [Mechanics 1 · Recall · 3 pts · 2025 midsem Q1]

State Newton's three laws of mechanics.

*Solution.* **Newton's laws.**

- **I (inertia).** A body stays at rest or in uniform straight-line motion unless a net force acts on it. This defines **inertial frames**.
- **II.** The net force equals the rate of change of momentum:

$$\mathbf F = \frac{d\mathbf p}{dt}\qquad(= m\mathbf a\ \text{for constant mass})$$

- **III.** Forces come in equal and opposite pairs: $\mathbf F_{12} = -\mathbf F_{21}$, acting on different bodies. For central forces they also lie along the line joining the bodies.

**Common mistake.** The two forces of the third law act on **different** bodies, so they never cancel each other in a free-body diagram of one body.

### Problem 2 [Mechanics 1 · Recall · 3 pts · 2025 midsem Q5]

Classical mechanical systems have several conservation laws. State them, and for projectile motion write the formula for each conserved quantity.

*Solution.* **The three conservation laws.**

| quantity | conserved when | because |
|---|---|---|
| linear momentum $\mathbf p$ | net external force $= 0$ (or one component of it) | translation symmetry |
| angular momentum $\mathbf L$ | net external torque $= 0$ (or one component) | rotation symmetry |
| energy $E$ | forces are conservative and time-independent | time-translation symmetry |

**Projectile motion** (gravity along $-y$):

$$p_x = mv_x = \text{constant (no horizontal force)}$$

$$E = \tfrac12m(v_x^2 + v_y^2) + mgy = \text{constant}$$

**Angular momentum** about the launch point is **not** conserved: the torque of gravity is $\boldsymbol\tau = \mathbf r\times m\mathbf g = -mgx\,\hat{\mathbf z}\ne 0$. Conservation depends on the point you choose.

### Problem 3 [Mechanics 1 · Recall · 2 pts]

What is a conservative force? Give two equivalent tests.

*Solution.* **Definition.** A force is conservative if the work it does between two points does **not depend on the path**.

**Equivalent tests.**

$$\oint\mathbf F\cdot d\mathbf r = 0\ \text{for every closed loop}$$

$$\nabla\times\mathbf F = 0\ \text{everywhere (in a simply connected region)}$$

$$\mathbf F = -\nabla U\ \text{for some potential } U(\mathbf r)$$

In 2-D the curl test is $\partial F_y/\partial x - \partial F_x/\partial y = 0$.

**Consequence.** For a conservative force, $K + U$ is constant. Gravity, springs and the Coulomb force are conservative; friction and drag are not.

### Problem 4 [Mechanics 1 · Recall · 2 pts]

What is Galilean relativity? Show that F is the same in two inertial frames.

*Solution.* **Galilean transformation.** Frame $S'$ moves at constant velocity $\mathbf V$ relative to $S$:

$$\mathbf r' = \mathbf r - \mathbf Vt,\qquad t' = t$$

**Differentiate twice.**

$$\mathbf v' = \mathbf v - \mathbf V,\qquad \mathbf a' = \mathbf a \quad(\text{since } \dot{\mathbf V} = 0)$$

**Force is unchanged.** With $m$ the same in both frames,

$$\mathbf F' = m\mathbf a' = m\mathbf a = \mathbf F$$

So Newton's laws hold in the same form in every inertial frame: no experiment in mechanics distinguishes rest from uniform motion.

**Common mistake.** The velocity and the kinetic energy are **not** invariant, only the acceleration (and force) is.

### Problem 5 [Mechanics 1 · Recall · 2 pts]

Why is the total internal force on a system zero? When is the total internal torque zero?

*Solution.* **Total internal force.** Internal forces come in third-law pairs $\mathbf F_{jk} = -\mathbf F_{kj}$, so

$$\sum_{j\ne k}\mathbf F_{jk} = 0$$

**Total internal torque.** For one pair,

$$\mathbf r_j\times\mathbf F_{jk} + \mathbf r_k\times\mathbf F_{kj} = (\mathbf r_j - \mathbf r_k)\times\mathbf F_{jk}$$

This vanishes if $\mathbf F_{jk}$ is **central**, that is, along the line joining the particles (so it is parallel to $\mathbf r_j - \mathbf r_k$). Gravity and the Coulomb force are central; the strong form of the third law is then needed.

**Result.** For a system with central internal forces, only external forces and torques change $\mathbf P$ and $\mathbf L$.

### Problem 6 [Mechanics 1 · Recall · 2 pts]

What are the limitations of Newtonian mechanics?

*Solution.* **Limitations of Newtonian mechanics.**

1. **Awkward with constraints.** You must find all the constraint forces (tensions, normal forces) before you can solve. Lagrangian mechanics avoids this.
2. **Fails near the speed of light.** It disagrees with electromagnetism and experiment at high speed; special relativity replaces it.
3. **Fails for atoms.** It cannot explain stable atoms, discrete spectra or the photoelectric effect; quantum mechanics is needed.
4. **Needs inertial frames**, and says nothing about the origin of gravity (general relativity).

**Still valid** for everyday speeds, sizes and energies, and recovered as the low-speed, large-size limit of both relativity and quantum mechanics.

### Problem 7 [Mechanics 1 · Recall · 2 pts]

Why is the harmonic oscillator a good model for so many systems?

*Solution.* **Reason.** Any smooth potential near a stable minimum looks like a parabola.

Taylor expand about the equilibrium $x_0$, where $U'(x_0) = 0$:

$$U(x) \approx U(x_0) + \tfrac12U''(x_0)(x - x_0)^2$$

This is a spring with $k = U''(x_0) > 0$, so small oscillations obey

$$m\ddot\epsilon = -k\epsilon,\qquad \omega = \sqrt{\frac{U''(x_0)}m}$$

**Hence** molecular vibrations, a pendulum at small angle, atoms in a crystal and a circuit's LC oscillations are all harmonic oscillators.

**Limit.** The approximation fails for large amplitudes (anharmonic terms).

## B. Show or derive

### Problem 8 [Mechanics 1 · Derivation · 3 pts · 2026 midsem Q1]

Which of these 2-D forces are conservative: F₁ = (−y, x), F₂ = (2xy, x² + 3y²), F₃ = (x², xy)? Why? Find the potential of any that are.

*Solution.* **Test.** In 2-D, $\mathbf F = -\nabla U$ requires a zero curl:

$$\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y} = 0$$

| force | $\partial_xF_y - \partial_yF_x$ | verdict |
|---|---|---|
| $\mathbf F_1 = (-y, x)$ | $1 - (-1) = 2$ | not conservative (it circulates) |
| $\mathbf F_2 = (2xy,\ x^2 + 3y^2)$ | $2x - 2x = 0$ | **conservative** |
| $\mathbf F_3 = (x^2, xy)$ | $y - 0 = y$ | not conservative |

**Potential for $\mathbf F_2$.** $F_x = -\partial U/\partial x = 2xy \Rightarrow U = -x^2y + g(y)$. Then

$$F_y = -\frac{\partial U}{\partial y} = x^2 - g'(y) = x^2 + 3y^2 \Rightarrow g' = -3y^2 \Rightarrow g = -y^3$$

$$\boxed{U = -(x^2y + y^3) + \text{const}}$$

**Check.** $-\partial_yU = x^2 + 3y^2$ ✓.

### Problem 9 [Mechanics 1 · Derivation · 3 pts]

Show that W = K₂ − K₁, and that for a conservative force K + U is constant.

*Solution.* **Work-energy.** Use $\mathbf F = m\,d\mathbf v/dt$ and $d\mathbf r = \mathbf v\,dt$:

$$W = \int_1^2\mathbf F\cdot d\mathbf r = \int m\frac{d\mathbf v}{dt}\cdot\mathbf v\,dt = \int d\left(\tfrac12mv^2\right) = K_2 - K_1$$

**Conservative case.** If $\mathbf F = -\nabla U$, then $\nabla U\cdot d\mathbf r = dU$, so

$$W = -\int_1^2 dU = U_1 - U_2$$

Equate the two expressions for $W$:

$$K_2 - K_1 = U_1 - U_2 \Rightarrow \boxed{K_1 + U_1 = K_2 + U_2}$$

### Problem 10 [Mechanics 1 · Derivation · 2 pts]

Show that dL/dt = r × F, and hence that L is conserved for a central force.

*Solution.* **Differentiate $\mathbf L = \mathbf r\times\mathbf p$.**

$$\frac{d\mathbf L}{dt} = \underbrace{\dot{\mathbf r}\times\mathbf p}_{\mathbf v\times m\mathbf v\,=\,0} + \mathbf r\times\dot{\mathbf p} = \boxed{\mathbf r\times\mathbf F}$$

**Central force.** $\mathbf F\parallel\mathbf r$, so $\mathbf r\times\mathbf F = 0$ and $d\mathbf L/dt = 0$: $\mathbf L$ is **conserved**. The motion stays in the plane perpendicular to $\mathbf L$.

### Problem 11 [Mechanics 1 · Derivation · 3 pts]

Show that dE/dt = ∂U/∂t for a particle in a conservative field.

*Solution.* **Kinetic energy.** $\dfrac{dT}{dt} = m\mathbf v\cdot\mathbf a = \mathbf v\cdot\mathbf F$.

**Potential.** $U = U(\mathbf r, t)$, so by the chain rule

$$\frac{dU}{dt} = \mathbf v\cdot\nabla U + \frac{\partial U}{\partial t}$$

**Add** and use $\mathbf F = -\nabla U$:

$$\frac{dE}{dt} = \mathbf v\cdot(\mathbf F + \nabla U) + \frac{\partial U}{\partial t} = \boxed{\frac{\partial U}{\partial t}}$$

If $U$ has no explicit time dependence, $E$ is conserved.

### Problem 12 [Mechanics 1 · Derivation · 3 pts · Quiz-1 Q2]

For the 1-D SHO, write the equation of motion and non-dimensionalise it. Comment on the parameters that are found.

*Solution.* **Equation of motion.** $m\ddot x = -kx$.

**Scale.** Let $\xi = x/x_0$ and $\tau = t/t_0$:

$$\frac{mx_0}{t_0^2}\,\xi'' = -kx_0\,\xi$$

Choose $t_0 = \sqrt{m/k} = 1/\omega_0$:

$$\boxed{\xi'' + \xi = 0}$$

**Parameters found.** The only one is the time scale $1/\omega_0$. The length scale $x_0$ is arbitrary (fixed only by initial conditions), because the equation is linear. So all simple harmonic oscillators behave identically once time is measured in units of $1/\omega_0$.

### Problem 13 [Mechanics 1 · Derivation · 3 pts]

A particle moves in U(x) = −a/x + b/x² (a, b > 0). Find the equilibrium and the frequency of small oscillations.

*Solution.* **Equilibrium.** $U(x) = -a/x + b/x^2$:

$$U'(x) = \frac a{x^2} - \frac{2b}{x^3} = 0 \Rightarrow \boxed{x_0 = \frac{2b}a}$$

**Stability.**

$$U''(x) = -\frac{2a}{x^3} + \frac{6b}{x^4} = \frac1{x^3}\left(-2a + \frac{6b}x\right)$$

At $x_0$, $6b/x_0 = 3a$, so $U''(x_0) = \dfrac a{x_0^3} > 0$: a minimum, so **stable**.

**Frequency.** Small oscillations obey $m\ddot\epsilon = -U''\epsilon$:

$$\omega = \sqrt{\frac{U''(x_0)}m} = \sqrt{\frac a{mx_0^3}} = \boxed{\sqrt{\frac{a^4}{8mb^3}}}$$

### Problem 14 [Mechanics 1 · Derivation · 3 pts]

Show that for a system of particles MŘ = F\_ext.

*Solution.* **Sum Newton's law over all particles.** For particle $k$: $m_k\ddot{\mathbf r}_k = \mathbf F_k^\text{ext} + \sum_{j\ne k}\mathbf F_{kj}$.

$$M\ddot{\mathbf R} = \sum_km_k\ddot{\mathbf r}_k = \sum_k\mathbf F_k^\text{ext} + \sum_k\sum_{j\ne k}\mathbf F_{kj}$$

The double sum pairs $\mathbf F_{kj} + \mathbf F_{jk} = 0$ (third law), so it vanishes:

$$\boxed{M\ddot{\mathbf R} = \mathbf F^\text{ext}}$$

The centre of mass moves as if all the mass sat there and only the external force acted.

### Problem 15 [Mechanics 1 · Derivation · 3 pts]

Show that T = ½MV² + Σ½mₖv′ₖ², and the analogous split of L.

*Solution.* **Split the velocity.** $\mathbf v_k = \mathbf V + \mathbf v_k'$, with $\mathbf v_k'$ measured relative to the centre of mass.

**Kinetic energy.**

$$T = \sum\tfrac12m_k(\mathbf V + \mathbf v_k')^2 = \tfrac12MV^2 + \mathbf V\cdot\sum m_k\mathbf v_k' + \sum\tfrac12m_kv_k'^2$$

The middle term vanishes, because $\sum m_k\mathbf v_k' = M\dot{\mathbf R}'$ and the centre of mass is at rest in its own frame:

$$\boxed{T = \tfrac12MV^2 + \sum\tfrac12m_kv_k'^2}$$

**Angular momentum.** With $\mathbf r_k = \mathbf R + \mathbf r_k'$:

$$\mathbf L = \sum m_k(\mathbf R + \mathbf r_k')\times(\mathbf V + \mathbf v_k') = \mathbf R\times M\mathbf V + \sum\mathbf r_k'\times m_k\mathbf v_k'$$

(the cross terms vanish for the same reason): orbital part $+$ spin part.

### Problem 16 [Mechanics 1 · Derivation · 4 pts · 2025 midsem Q8]

A rocket exhausts gas at constant speed u relative to itself. Assuming vertical motion, constant burn rate and constant gravity, find the equation of motion and v as a function of the current mass. When is lift-off achieved?

*Solution.* **Momentum balance.** In time $dt$ the rocket (mass $m$, speed $v$) ejects gas of mass $|dm|$ at speed $v - u$ (upward is positive). Only gravity acts externally:

$$(m + dm)(v + dv) + (-dm)(v - u) - mv = -mg\,dt$$

Drop the second-order term $dm\,dv$:

$$m\,dv + u\,dm = -mg\,dt\ \Rightarrow\ m\frac{dv}{dt} = -u\frac{dm}{dt} - mg$$

**Constant burn rate** $\alpha = -dm/dt$:

$$\boxed{m\frac{dv}{dt} = u\alpha - mg}$$

**Speed versus mass.** Use $dt = -dm/\alpha$:

$$dv = -u\frac{dm}m + \frac g\alpha\,dm\ \Rightarrow\ \boxed{v = u\ln\frac{m_0}m - \frac g\alpha(m_0 - m)}$$

**Lift-off** needs $u\alpha > m_0g$ at the start. Otherwise the rocket stays on the pad until enough fuel has burned that $u\alpha > mg$.

### Problem 17 [Mechanics 1 · Derivation · 4 pts · 2025 midsem Q9]

A rope of mass per unit length ρ and length a hangs just above a table and is released. Find the force on the table when a length x has fallen onto it.

*Solution.* **Setup.** After a length $x$ has landed, the free part is still in free fall, so its speed is $v = \sqrt{2gx}$ (every point of the rope has fallen the same distance $x$).

**Force from the arrival.** In $dt$ a length $v\,dt$ of rope, with mass $\rho v\,dt$ and speed $v$, is brought to rest:

$$F_\text{stop} = \frac{dp}{dt} = \rho v^2 = 2\rho gx$$

**Weight already on the table:** $\rho gx$.

$$\boxed{F = 2\rho gx + \rho gx = 3\rho gx}$$

**Check.** At the end ($x = a$) the table carries $3\rho ga$: three times the final weight of the rope.

**Common mistake.** Using only the weight of the pile, or only the impact term.

### Problem 18 [Mechanics 1 · Derivation · 3 pts · 2025 midsem Q10]

A rope hangs over a small smooth loop with equal lengths on each side. After a small tug it slides off. Find its speed when it leaves the loop.

*Solution.* **Energy conservation** (smooth loop, no losses).

Let the total length be $L$ and mass $M = \rho L$.

- **Initially:** two halves, each of mass $M/2$ with its centre $L/4$ below the loop:

$$U_i = 2\cdot\frac M2g\left(-\frac L4\right) = -\frac{MgL}4$$

- **Finally:** the whole rope hangs on one side, centre $L/2$ below:

$$U_f = -\frac{MgL}2$$

$$\tfrac12Mv^2 = U_i - U_f = \frac{MgL}4\ \Rightarrow\ \boxed{v = \sqrt{\frac{gL}2}}$$

### Problem 19 [Mechanics 1 · Derivation · 3 pts]

A body falls from rest with linear drag −kv. Find v(t) and the terminal velocity.

*Solution.* **Equation of motion.** Taking down as positive:

$$m\frac{dv}{dt} = mg - kv$$

**Separate.**

$$\int_0^v\frac{dv'}{g - kv'/m} = \int_0^tdt' \Rightarrow -\frac mk\ln\left(1 - \frac{kv}{mg}\right) = t$$

$$\boxed{v(t) = \frac{mg}k\left(1 - e^{-kt/m}\right)}$$

**Terminal velocity.** As $t\to\infty$, $v_t = \dfrac{mg}k$ (set $dv/dt = 0$), approached on a time scale $m/k$.

**Check.** For $t \ll m/k$, $v \approx gt$: free fall, as expected.

## C. Short numericals and estimates

### Problem 20 [Mechanics 1 · Numerical · 2 pts]

A block slides down a 30° incline with μ = 0.2 (cos 30° ≈ 0.87). Find its acceleration (g = 10 m/s²).

*Solution.* **Idea.** Along the incline: gravity pulls down the slope with $mg\sin\theta$ and kinetic friction opposes with $\mu N = \mu mg\cos\theta$.

$$a = g(\sin\theta - \mu\cos\theta) = 10(0.5 - 0.2\times0.87) = 10(0.5 - 0.174) \approx \boxed{3.3\ \text{m/s}^2}$$

### Problem 21 [Mechanics 1 · Numerical · 2 pts]

A rocket in free space has u = 3 km/s. What mass ratio m₀/m gives 9 km/s? (e³ ≈ 20)

*Solution.* **Idea.** Free-space rocket: $v = v_0 + u\ln(m_0/m)$, starting from rest.

$$\ln\frac{m_0}{m} = \frac{\Delta v}{u} = \frac{9}{3} = 3\ \Rightarrow\ \frac{m_0}{m} = e^3 \approx \boxed{20}$$

So $1 - 1/20 = 95\%$ of the launch mass must be fuel. That is why rockets use stages.

### Problem 22 [Mechanics 1 · Numerical · 2 pts]

Estimate the thrust needed to lift a 500 t rocket off the pad, and the burn rate if u = 3 km/s.

*Solution.* **Weight:**

$$W = mg = (5\times10^5\ \text{kg})(10\ \text{m/s}^2) = 5\times10^6\ \text{N}$$

Lift-off needs thrust $u\alpha > W$, so the thrust must exceed about $\boxed{5\ \text{MN}}$.

**Burn rate** with $u = 3$ km/s:

$$\alpha > \frac{W}{u} = \frac{5\times10^6}{3000} \approx 1.7\times10^3\ \text{kg/s} = \boxed{1.7\ \text{t/s}}$$


## D. More practice: collisions, centre of mass and rockets

### Problem 23 [Mechanics 1 · Numerical · 3 pts]

A $2$ kg mass moving at $6$ m/s hits a stationary $1$ kg mass in a head-on elastic collision on a frictionless line. Find both final velocities and verify that kinetic energy is conserved.

*Solution.* **Idea.** Elastic: conserve momentum and kinetic energy. For a target at rest the standard results are

$$v_1' = \frac{m_1 - m_2}{m_1 + m_2}v,\qquad v_2' = \frac{2m_1}{m_1 + m_2}v$$

$$v_1' = \frac{2 - 1}{3}(6) = \boxed{2\ \text{m/s}},\qquad v_2' = \frac{2(2)}{3}(6) = \boxed{8\ \text{m/s}}$$

**Check.**

- Momentum: before $2(6) = 12$; after $2(2) + 1(8) = 12$ ✓
- Energy: before $\tfrac12(2)(36) = 36$ J; after $\tfrac12(2)(4) + \tfrac12(1)(64) = 4 + 32 = 36$ J ✓

**Common mistake.** The light target flies off faster than the incoming speed ($8 > 6$), which is allowed; the heavy projectile keeps going forward.

### Problem 24 [Mechanics 1 · Numerical · 3 pts]

A $10$ g bullet moving at $400$ m/s embeds itself in a free $2.0$ kg block at rest. Find the common velocity and the fraction of kinetic energy lost.

*Solution.* **Idea.** Perfectly inelastic: momentum is conserved and kinetic energy is not.

$$v = \frac{mv_0}{m + M} = \frac{(0.010)(400)}{2.010} = \boxed{1.99\ \text{m/s}}$$

**Energy.**

$$K_i = \tfrac12(0.010)(400)^2 = 800\ \text{J},\qquad K_f = \tfrac12(2.010)(1.99)^2 = 3.98\ \text{J}$$

$$\frac{K_i - K_f}{K_i} = 1 - \frac{m}{m + M} = \boxed{99.5\%}$$

**Why.** The lost fraction is $M/(m + M)$, so a heavy target absorbs almost no kinetic energy but almost all of the bullet's energy goes into heat, sound and deformation.

### Problem 25 [Mechanics 1 · Numerical · 3 pts]

Find the centre of mass of the Earth–Moon system and say whether it lies inside the Earth. ($M_E = 5.97\times10^{24}$ kg, $M_M = 7.35\times10^{22}$ kg, separation $3.84\times10^8$ m, $R_E = 6.37\times10^6$ m.)

*Solution.* **Idea.** Measure from the Earth's centre: $x_\text{cm} = \dfrac{M_Md}{M_E + M_M}$.

$$x_\text{cm} = \frac{(7.35\times10^{22})(3.84\times10^8)}{6.04\times10^{24}} = \boxed{4.67\times10^6\ \text{m}}$$

**Answer.** $4.67\times10^6 < 6.37\times10^6$ m, so the centre of mass lies about $4700$ km from the Earth's centre, **inside** the Earth, at roughly $0.73R_E$.

**Meaning.** Both bodies orbit this point, so the Earth "wobbles" with a radius of about $4700$ km once a month.

### Problem 26 [Mechanics 1 · Numerical · 2 pts]

A rocket with exhaust speed $u = 3$ km/s starts from rest in free space and burns until its mass has fallen to $1/10$ of its initial mass. Find its final speed.

*Solution.* **Idea.** The rocket equation (no gravity, no drag):

$$\Delta v = u\ln\frac{m_0}{m_1}$$

$$\Delta v = (3\ \text{km/s})\ln10 = (3)(2.303) = \boxed{6.9\ \text{km/s}}$$

**Check.** This is below the $7.8$ km/s needed for low Earth orbit, which is why real launchers use several stages: the logarithm punishes a single big tank.

### Problem 27 [Mechanics 1 · Numerical · 2 pts]

A $2$ kg block slides at $10$ m/s onto a rough horizontal floor with $\mu_k = 0.25$. How far does it travel before stopping, and how much heat is generated?

*Solution.* **Idea.** Work–energy: friction removes all the kinetic energy.

$$\mu mg\,d = \tfrac12mv^2\ \Rightarrow\ d = \frac{v^2}{2\mu g} = \frac{100}{2(0.25)(9.8)} = \boxed{20.4\ \text{m}}$$

**Heat.** All of the initial kinetic energy ends up as heat:

$$Q = \tfrac12(2)(10)^2 = \boxed{100\ \text{J}}$$

**Note.** The mass cancels in $d$: a heavier block stops in the same distance.

### Problem 28 [Mechanics 1 · Numerical · 3 pts]

A $0.50$ kg ball on a frictionless table moves in a circle of radius $2.0$ m at $3.0$ m/s, attached to a string that passes through a hole. The string is pulled slowly until the radius is $1.0$ m. Find the new speed and the work done by the pull.

*Solution.* **Idea.** The string force is central, so angular momentum $L = mvr$ is conserved.

$$v_2 = v_1\frac{r_1}{r_2} = 3.0\times\frac{2.0}{1.0} = \boxed{6.0\ \text{m/s}}$$

**Work.** By the work–energy theorem the work done equals the change in kinetic energy:

$$W = \tfrac12(0.50)(6.0^2 - 3.0^2) = \tfrac12(0.50)(27) = \boxed{6.75\ \text{J}}$$

**Check.** Kinetic energy rises from $2.25$ J to $9.0$ J, a gain of $6.75$ J, which the person pulling the string supplies. Angular momentum is conserved, but energy is not.
