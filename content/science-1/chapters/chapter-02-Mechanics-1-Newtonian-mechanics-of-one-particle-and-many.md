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

22 questions with worked answers (tap a solution to open it). Points in brackets, midsem style.

## A. State and explain

### Problem 1 [Mechanics 1 · Recall · 3 pts · 2025 midsem Q1]

State Newton's three laws of mechanics.

*Solution.* I: a body remains at rest or in uniform straight-line motion unless acted on by a net force (this defines inertial frames). II: the rate of change of momentum equals the net force, F = dp/dt. III: when two bodies interact they exert equal and opposite forces on each other (along the line joining them, for central forces).

### Problem 2 [Mechanics 1 · Recall · 3 pts · 2025 midsem Q5]

Classical mechanical systems have several conservation laws. State them, and for projectile motion write the formula for each conserved quantity.

*Solution.* Linear momentum (when F\_ext = 0, or its component along a force-free direction), angular momentum (when the torque, or its component, is zero), and energy (for conservative, time-independent forces). Projectile: pₓ = mvₓ = constant (no horizontal force); E = ½m(vₓ² + v\_y²) + mgy = constant. Angular momentum about the launch point is not conserved: the torque is −mgx ẑ.

### Problem 3 [Mechanics 1 · Recall · 2 pts]

What is a conservative force? Give two equivalent tests.

*Solution.* A force whose work between two points is independent of the path. Tests: ∇ × F = 0 everywhere (in a simply connected region); ∮F·dr = 0 for every loop; equivalently F = −∇U.

### Problem 4 [Mechanics 1 · Recall · 2 pts]

What is Galilean relativity? Show that F is the same in two inertial frames.

*Solution.* The laws of mechanics have the same form in all inertial frames. With u′ = u − v and v constant, du′/dt = du/dt, so F′ = m du′/dt = F.

### Problem 5 [Mechanics 1 · Recall · 2 pts]

Why is the total internal force on a system zero? When is the total internal torque zero?

*Solution.* By the third law, internal forces come in equal and opposite pairs, so they sum to zero. Their torques also cancel in pairs when the forces are central (along the line joining the particles), since then rⱼ × F + rₖ × (−F) = (rⱼ − rₖ) × F = 0.

### Problem 6 [Mechanics 1 · Recall · 2 pts]

What are the limitations of Newtonian mechanics?

*Solution.* Constraints must be handled by finding constraint forces (awkward); it is not consistent with electromagnetism and fails near the speed of light (STR); it cannot explain the stability of atoms or atomic spectra (QM).

### Problem 7 [Mechanics 1 · Recall · 2 pts]

Why is the harmonic oscillator a good model for so many systems?

*Solution.* Any smooth potential near a stable minimum is approximately quadratic, U ≈ U₀ + ½U″(x₀)(x − x₀)², so small oscillations about any equilibrium are harmonic.

## B. Show or derive

### Problem 8 [Mechanics 1 · Derivation · 3 pts · 2026 midsem Q1]

Which of these 2-D forces are conservative: F₁ = (−y, x), F₂ = (2xy, x² + 3y²), F₃ = (x², xy)? Why? Find the potential of any that are.

*Solution.* Test ∂F\_y/∂x − ∂Fₓ/∂y. F₁: 1 − (−1) = 2 ≠ 0, not conservative (it circulates). F₂: 2x − 2x = 0, conservative, with U = −(x²y + y³) + constant. F₃: y − 0 = y ≠ 0, not conservative.

### Problem 9 [Mechanics 1 · Derivation · 3 pts]

Show that W = K₂ − K₁, and that for a conservative force K + U is constant.

*Solution.* W = ∫F·dr = ∫m(dv/dt)·v dt = ∫d(½mv²) = K₂ − K₁. If F = −∇U, W = −∫∇U·dr = U₁ − U₂. Equating: K₁ + U₁ = K₂ + U₂.

### Problem 10 [Mechanics 1 · Derivation · 2 pts]

Show that dL/dt = r × F, and hence that L is conserved for a central force.

*Solution.* dL/dt = ṙ × p + r × ṗ = v × mv + r × F = r × F. For a central force F ∥ r, so r × F = 0 and L is constant.

### Problem 11 [Mechanics 1 · Derivation · 3 pts]

Show that dE/dt = ∂U/∂t for a particle in a conservative field.

*Solution.* dT/dt = mv·a = v·F. dU/dt = v·∇U + ∂U/∂t. With F = −∇U: dE/dt = v·(F + ∇U) + ∂U/∂t = ∂U/∂t.

### Problem 12 [Mechanics 1 · Derivation · 3 pts · Quiz-1 Q2]

For the 1-D SHO, write the equation of motion and non-dimensionalise it. Comment on the parameters that are found.

*Solution.* mẍ = −kx. Let ξ = x/x₀ and τ = t/t₀: (mx₀/t₀²)ξ″ = −kx₀ξ. Choosing t₀ = √(m/k) gives ξ″ + ξ = 0. The only parameter found is the time scale √(m/k) = 1/ω₀; the length scale x₀ is arbitrary (set by initial conditions, e.g. amplitude). So all SHOs behave identically once time is measured in units of 1/ω₀.

### Problem 13 [Mechanics 1 · Derivation · 3 pts]

A particle moves in U(x) = −a/x + b/x² (a, b > 0). Find the equilibrium and the frequency of small oscillations.

*Solution.* U′ = a/x² − 2b/x³ = 0 gives x₀ = 2b/a. U″ = −2a/x³ + 6b/x⁴; at x₀, 6b/x₀ = 3a, so U″ = a/x₀³ > 0 (stable). ω = √(a/mx₀³) = √(a⁴/8mb³).

### Problem 14 [Mechanics 1 · Derivation · 3 pts]

Show that for a system of particles MŘ = F\_ext.

*Solution.* MŘ = Σmₖr̈ₖ = ΣFₖ = ΣFₖ^ext + Σⱼ≠ₖFₖ←ⱼ. The double sum pairs Fₖ←ⱼ + Fⱼ←ₖ = 0, so MŘ = F\_ext.

### Problem 15 [Mechanics 1 · Derivation · 3 pts]

Show that T = ½MV² + Σ½mₖv′ₖ², and the analogous split of L.

*Solution.* Write vₖ = V + v′ₖ. T = Σ½mₖ(V² + 2V·v′ₖ + v′ₖ²) = ½MV² + V·Σmₖv′ₖ + Σ½mₖv′ₖ², and Σmₖv′ₖ = 0 (it is M times the centre-of-mass velocity in its own frame). Similarly L = R × MV + Σr′ₖ × mₖv′ₖ.

### Problem 16 [Mechanics 1 · Derivation · 4 pts · 2025 midsem Q8]

A rocket exhausts gas at constant speed u relative to itself. Assuming vertical motion, constant burn rate and constant gravity, find the equation of motion and v as a function of the current mass. When is lift-off achieved?

*Solution.* In dt the rocket (mass m) ejects −dm at speed v − u. Momentum: (m + dm)(v + dv) + (−dm)(v − u) − mv = −mg dt, giving m dv/dt = −u dm/dt − mg. With −dm/dt = α: m dv/dt = uα − mg. Using dt = −dm/α: dv = −u dm/m + (g/α)dm, so v = u ln(m₀/m) − g(m₀ − m)/α. Lift-off requires the thrust to exceed the weight at the start: uα > m₀g; otherwise it waits on the pad until enough fuel has burned.

### Problem 17 [Mechanics 1 · Derivation · 4 pts · 2025 midsem Q9]

A rope of mass per unit length ρ and length a hangs just above a table and is released. Find the force on the table when a length x has fallen onto it.

*Solution.* The falling part is in free fall, so when x has landed its speed is v = √(2gx). In dt a length v dt with momentum ρv²dt is stopped, a force ρv² = 2ρgx. Adding the weight of the pile, ρgx: total 3ρgx, three times the weight on the table.

### Problem 18 [Mechanics 1 · Derivation · 3 pts · 2025 midsem Q10]

A rope hangs over a small smooth loop with equal lengths on each side. After a small tug it slides off. Find its speed when it leaves the loop.

*Solution.* Let the total length be L and mass M = ρL. Initially each half has its centre L/4 below the loop: Uᵢ = −MgL/4. As it leaves, the whole rope hangs on one side with centre L/2 below: U\_f = −MgL/2. ½Mv² = MgL/4, so v = √(gL/2).

### Problem 19 [Mechanics 1 · Derivation · 3 pts]

A body falls from rest with linear drag −kv. Find v(t) and the terminal velocity.

*Solution.* m dv/dt = mg − kv. Separating: v = (mg/k)(1 − e^(−kt/m)). Terminal velocity v\_t = mg/k, reached on a time scale m/k.

## C. Short numericals and estimates

### Problem 20 [Mechanics 1 · Numerical · 2 pts]

A block slides down a 30° incline with μ = 0.2 (cos 30° ≈ 0.87). Find its acceleration (g = 10 m/s²).

*Solution.* a = g(sin30° − 0.2cos30°) = 10(0.5 − 0.174) ≈ 3.3 m/s².

### Problem 21 [Mechanics 1 · Numerical · 2 pts]

A rocket in free space has u = 3 km/s. What mass ratio m₀/m gives 9 km/s? (e³ ≈ 20)

*Solution.* ln(m₀/m) = 9/3 = 3, so m₀/m = e³ ≈ 20: 95% of the launch mass must be fuel, which is why rockets have stages.

### Problem 22 [Mechanics 1 · Numerical · 2 pts]

Estimate the thrust needed to lift a 500 t rocket off the pad, and the burn rate if u = 3 km/s.

*Solution.* Weight ≈ 5 × 10⁵ kg × 10 m/s² = 5 × 10⁶ N, so the thrust must exceed about 5 MN. Burn rate α > 5 × 10⁶/3000 ≈ 1.7 t/s.


