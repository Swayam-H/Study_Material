# Science-1 Mechanics 3: Hamiltonian dynamics and the two-body problem

The Hamiltonian rewrites Lagrangian mechanics in terms of positions and momenta, giving two first-order equations per coordinate and the picture of motion as flow in phase space. The two-body problem is the great application: it reduces to one body in a central potential, and gravity then gives Kepler's laws. Sources: slides `Lagrangian.tex:335` to `:443` and `STR.tex:14` to `:107`, MT 7.10–7.12 and ch 8, HW lectures 6–8 (MT E7.11, E8.2). Questions follow the 2025 midsem Q7, the 2026 midsem Q3, Q10 and Q11, and the practice set.

## Explainer

### From the Lagrangian to the Hamiltonian

Lagrange's equations describe a system with n degrees of freedom by n second-order differential equations for the generalised coordinates qₖ. Hamilton showed that the same motion can be described by 2n first-order equations, in which the coordinates and their conjugate momenta appear on an equal footing. The conjugate momentum of a coordinate is defined from the Lagrangian as pₖ = ∂L/∂q̇ₖ. For a particle in Cartesian coordinates it is the ordinary momentum mv, and for an angle it is an angular momentum, but in general it need not be either. For a charged particle in a magnetic field, for example, p = mv + qA, which is not the mechanical momentum.

The Hamiltonian is defined as H = Σpₖq̇ₖ − L, with every velocity re-expressed in terms of the momenta, so that H is a function of the qₖ, the pₖ and possibly t. This change of variables from q̇ to p is a Legendre transformation, the same operation that turns U(S, V) into H(S, p) in thermodynamics. When the coordinates do not depend explicitly on time and the potential depends only on position, the kinetic energy is quadratic in the velocities and H turns out to be T + U, the total energy. If in addition H does not depend explicitly on time, it is conserved.

Taking the differential of H and comparing it with the Lagrange equations gives Hamilton's canonical equations, q̇ₖ = ∂H/∂pₖ and ṗₖ = −∂H/∂qₖ. The first returns the relation between velocity and momentum, and the second plays the role of Newton's second law. If a coordinate does not appear in H, its momentum is constant, just as for a cyclic coordinate in the Lagrangian. A good illustration is a particle constrained to a cylinder of radius R and pulled towards the origin by a force −kr (MT E7.11). In cylindrical coordinates H = p\_θ²/2mR² + p\_z²/2m + ½kz². Since θ does not appear, p\_θ is constant and the particle turns about the axis at a steady rate, while the z-equations describe simple harmonic motion along the axis.

### Phase space and Liouville's theorem

Because Hamilton's equations are first order, the state of a system at any instant is fixed by its q's and p's together. These can be treated as the coordinates of a single point in a 2n-dimensional phase space, and as time passes the point moves along a trajectory determined by the equations. For a one-dimensional harmonic oscillator the trajectories are ellipses of constant energy in the (x, p) plane, and a damped oscillator spirals inwards to the origin.

Suppose now that we do not know the initial state exactly, but only that it lies in some small region of phase space. Each point of the region moves according to Hamilton's equations, and the region is carried along and deformed. Liouville's theorem states that for Hamiltonian motion its volume never changes. The region may be stretched in one direction and squeezed in another, but its volume is conserved. The proof uses the fact that the flow velocity (q̇, ṗ) has zero divergence, since ∂q̇/∂q + ∂ṗ/∂p = ∂²H/∂q∂p − ∂²H/∂p∂q = 0, so phase-space points behave like an incompressible fluid. The theorem has two important consequences. A frictionless system cannot settle into a resting state, since that would shrink a region of phase space to a point, and it is only dissipation that does this. And uncertainty about the initial state is never removed by the motion itself, only reshaped. Liouville's theorem is also the starting point of statistical mechanics.

### Reducing two bodies to one

Two bodies interacting through a force that depends only on their separation, such as the sun and a planet, are described by six coordinates. A good choice of coordinates simplifies the problem greatly. Using the position of the centre of mass R and the relative position r = r₁ − r₂, the Lagrangian separates into L = ½MṘ² + ½μṙ² − U(r), where M is the total mass and μ = m₁m₂/(m₁ + m₂) is the reduced mass. R does not appear, so the centre of mass moves uniformly and we can work in the frame where it is at rest. What remains is the motion of a single particle of mass μ in the central potential U(r).

For a central force the angular momentum is conserved, so the motion stays in the plane perpendicular to it, and plane polar coordinates (r, θ) suffice. The Lagrangian becomes L = ½μ(ṙ² + r²θ̇²) − U(r). Since θ is cyclic, its conjugate momentum ℓ = μr²θ̇ is constant. In a short time dt the line joining the bodies sweeps out an area dA = ½r²dθ, so the areal velocity dA/dt = ℓ/2μ is constant. This is Kepler's second law, and it holds for any central force, not only gravity.

### The effective potential and the orbits

The energy is E = ½μṙ² + ℓ²/(2μr²) + U(r). The middle term is the kinetic energy of the angular motion, but since ℓ is fixed it depends on r alone and acts like an extra repulsive potential, the centrifugal barrier. The radial motion is therefore that of a particle in one dimension moving in the effective potential U\_eff = ℓ²/(2μr²) − k/r for gravity, with k = Gm₁m₂. This function rises steeply at small r, falls to a minimum, and approaches zero from below at large r. If E equals the minimum, r cannot change and the orbit is a circle. If E lies between the minimum and zero, r oscillates between two turning points and the orbit is bound. If E is zero or positive, the body comes in from infinity, turns at a closest approach and escapes again.

Solving the equations with the substitution u = 1/r gives the orbit explicitly: α/r = 1 + ε cosθ, with α = ℓ²/μk and eccentricity ε = √(1 + 2Eℓ²/μk²). This is a conic section with the centre of force at a focus. For E < 0, ε < 1 and the orbit is an ellipse, which is Kepler's first law; the special case ε = 0 is a circle. For E = 0 it is a parabola, and for E > 0 a hyperbola. For an ellipse the period satisfies T² ∝ a³, Kepler's third law. Bound orbits close on themselves only for two power laws, the inverse-square force and the linear force of the harmonic oscillator; for any other force law the orbit precesses.

### Beyond two bodies

Newton's achievement was to show that his law of gravitation implies Kepler's three laws for any two-body system. The planets disturb one another slightly, and the small departures from Kepler's ellipses led to the discovery of Neptune at the position predicted from the irregularities of Uranus's orbit. With three or more bodies, however, no general closed-form solution exists. The three-body problem has exact solutions only in special configurations, and in general its motion can be chaotic, a fact that Poincaré's study of it first revealed.

## Summary

### Hamiltonian (MT 7.10, `Lagrangian.tex:335`)

```latex
p_k = \frac{\partial L}{\partial \dot q_k},\qquad H(q, p, t) = \sum_k p_k \dot q_k - L,\qquad \dot q_k = \frac{\partial H}{\partial p_k},\quad \dot p_k = -\frac{\partial H}{\partial q_k}
```

- Legendre transform: replace q̇ by p. Express every q̇ through p before writing H.
- n degrees of freedom: 2n first-order equations (Lagrange: n second-order).
- H = T + U when the coordinates have no explicit t and U = U(q). dH/dt = ∂H/∂t, so H is conserved if it has no explicit t.
- Cyclic coordinate (missing from H): its p is conserved.
- Conjugate momentum need not be mv: charged particle p = mv + qA; relativistic p = γmv.
- MT E7.11 (particle on a cylinder, F = −kr): H = p\_θ²/2mR² + p\_z²/2m + ½k(R² + z²). p\_θ constant; z is SHM with ω = √(k/m). (The slide drops the square on p\_z and the constant ½kR².)

### Phase space and Liouville (`STR.tex:50`)

- State = point (q₁…qₙ, p₁…pₙ) in 2n-dimensional phase space; motion = trajectory.
- 1-D SHO: ellipses of constant E, area 2πE/ω. Damped oscillator: spiral into the origin.
- Liouville: a region of phase space keeps its volume under Hamiltonian flow (stretches, never compresses).
- Proof sketch: ∂q̇/∂q + ∂ṗ/∂p = ∂²H/∂q∂p − ∂²H/∂p∂q = 0 (incompressible flow).
- Consequences: no settling to rest without friction; initial uncertainty persists; basis of statistical mechanics.

### Two-body problem (MT ch 8, `Lagrangian.tex:352`)

- R = (m₁r₁ + m₂r₂)/M, r = r₁ − r₂; L = ½MṘ² + ½μṙ² − U(r), μ = m₁m₂/(m₁ + m₂).
- R cyclic: centre of mass moves uniformly, set Ṙ = 0. L conserved: motion in a plane, use (r, θ).
- L = ½μ(ṙ² + r²θ̇²) − U(r). θ cyclic: ℓ = μr²θ̇ constant.
- Kepler II: dA/dt = ½r²θ̇ = ℓ/2μ, constant (any central force).
- Radial equation: μr̈ = ℓ²/(μr³) − U′(r).

```latex
E = \tfrac12\mu\dot r^2 + U_{\text{eff}}(r),\qquad U_{\text{eff}} = \frac{\ell^2}{2\mu r^2} - \frac{k}{r},\quad k = Gm_1m_2
```

- (The slides write ℓ²/μr²; the factor ½ belongs.) Circular orbit at the minimum, r₀ = ℓ²/μk.
- E = U\_eff,min: circle. U\_eff,min < E < 0: bound, between two turning points. E ≥ 0: unbound.

```latex
\frac{\alpha}{r} = 1 + \varepsilon\cos\theta,\qquad \alpha = \frac{\ell^2}{\mu k},\qquad \varepsilon = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}
```

- ε = 0 circle, ε < 1 (E < 0) ellipse (Kepler I), ε = 1 (E = 0) parabola, ε > 1 hyperbola.
- Kepler III: T² = 4π²a³/G(m₁ + m₂).
- Orbit equation (u = 1/r): d²u/dθ² + u = −(μ/ℓ²u²)F(1/u).
- Closed bound orbits for all initial conditions only for U ∝ r⁻¹ and U ∝ r² (Bertrand).
- Perturbations: Neptune predicted from Uranus. Three-body problem: no general closed solution, can be chaotic.

### What to be able to do without notes

- Find pₖ and H from a Lagrangian, written in q and p, and write Hamilton's equations.
- Explain phase space, sketch trajectories, state Liouville's theorem and sketch its proof.
- Reduce two bodies to one, derive Kepler II, derive U\_eff, classify orbits by E.
- Quote the conic orbit and Kepler's laws.

## Questions

Points in brackets, midsem style.

### A. State and explain (2–3 points)

1. (2) Define the conjugate momentum and the Hamiltonian. When is H the total energy, and when is it conserved?
2. (2) Write Hamilton's equations. How do they compare in number and order with Lagrange's?
3. (2) What is phase space? Sketch phase trajectories for a harmonic oscillator and for a damped one.
4. (3) State Liouville's theorem and give two consequences.
5. (3) For the two-body problem, derive Kepler's second law. *(2026 midsem Q3)*
6. (2) What is the reduced mass? Why can we set Ṙ = 0 and treat the relative motion as two-dimensional?
7. (3) Explain the effective potential and the kinds of orbit for different total energies.
8. (2) For which power-law potentials are bound orbits closed? Why is there no general solution of the three-body problem?

### B. Show or derive (3–8 points)

9. (4) For projectile motion write the Lagrangian and Hamiltonian, and the equations of motion in both formulations. *(2025 midsem Q7)*
10. (8) A charge q of mass m moves in a uniform field B = Bẑ, with A = ½B × r and L = ½mṙ² + qA·ṙ. Write L in Cartesian coordinates. Find the conjugate momenta; are they equal to mv? Construct the Hamiltonian. Comment. *(2026 midsem Q10)*
11. (4) A particle is confined to a cylinder of radius R and acted on by F = −kr. Find H and Hamilton's equations in cylindrical coordinates, and solve for θ(t) and z(t). *(MT E7.11)*
12. (3) For a 1-D harmonic oscillator, write H and Hamilton's equations. Show that phase trajectories are ellipses and find their area.
13. (3) Sketch the proof of Liouville's theorem.
14. (4) Show that the two-body Lagrangian separates into centre-of-mass and relative parts, and find μ.
15. (4) Derive the radial equation of motion and U\_eff for gravity. Find the radius of the circular orbit for a given ℓ.
16. (4) A particle moves in a central force along the spiral r = ke^(αθ). Find the force law. *(MT ch 8 style)*
17. (3) Write the Hamiltonian and Hamilton's equations for a simple pendulum.

### C. Numericals

18. (2) The earth is 81 times as massive as the moon. Express the reduced mass of the earth–moon system in terms of the moon's mass.
19. (2) Mars orbits at 1.52 AU. Find its period (1.52^(3/2) ≈ 1.87).
20. (2) Show that the escape speed from a planet's surface is √2 times the speed of a circular orbit skimming the surface.
21. (2) Show that an orbit with E = −μk²/2ℓ² is a circle.

### D. Estimate

22. (2) Estimate the earth's orbital speed (1 AU = 1.5 × 10¹¹ m, 1 yr ≈ 3.15 × 10⁷ s).

## Answer key

### A. State and explain

1. pₖ = ∂L/∂q̇ₖ; H = Σpₖq̇ₖ − L written in q, p, t. H = T + U when the coordinate transformation has no explicit time and U depends only on q. H is conserved when it has no explicit t (dH/dt = ∂H/∂t).
2. q̇ₖ = ∂H/∂pₖ, ṗₖ = −∂H/∂qₖ: 2n first-order equations, against n second-order Lagrange equations. q and p are treated symmetrically.
3. The 2n-dimensional space of all (q, p); each state is a point and the motion a curve. SHO: closed ellipses about the origin (larger E, larger ellipse). Damped SHO: a spiral into the origin.
4. Under Hamiltonian (frictionless) motion, the volume of any region of phase space stays constant. Consequences: a conservative system can't come to rest at an equilibrium point (that would shrink volume); uncertainty in the initial state is preserved, only reshaped; it underpins statistical mechanics.
5. With θ cyclic in L = ½μ(ṙ² + r²θ̇²) − U(r), ℓ = μr²θ̇ is constant. The area swept in dt is dA = ½r·r dθ, so dA/dt = ½r²θ̇ = ℓ/2μ = constant.
6. μ = m₁m₂/(m₁ + m₂). R is cyclic, so total momentum MṘ is constant and we can choose the frame where Ṙ = 0. The angular momentum r × p is constant in direction, so r stays in the fixed plane perpendicular to it.
7. E = ½μṙ² + U\_eff with U\_eff = ℓ²/2μr² + U(r): the angular kinetic energy acts as a repulsive barrier. E at the minimum: circle. Between the minimum and 0: bound orbit oscillating between r\_min and r\_max. E ≥ 0: unbound, comes in and escapes.
8. Only U ∝ −1/r (gravity) and U ∝ r² (harmonic). Three bodies have too few conserved quantities to reduce the problem to integrals (it is non-integrable), and the motion is generally chaotic; only special configurations have exact solutions.

### B. Show or derive

9. L = ½m(ẋ² + ẏ²) − mgy. Lagrange: mẍ = 0, mÿ = −mg. pₓ = mẋ, p\_y = mẏ, H = (pₓ² + p\_y²)/2m + mgy. Hamilton: ẋ = pₓ/m, ṗₓ = 0; ẏ = p\_y/m, ṗ\_y = −mg. x is cyclic, so pₓ is conserved; H = E is conserved.
10. A = ½B(−y, x, 0), so L = ½m(ẋ² + ẏ² + ż²) + ½qB(xẏ − yẋ). pₓ = mẋ − ½qBy, p\_y = mẏ + ½qBx, p\_z = mż. Not equal to mv: the canonical momentum is mv + qA. H = p·v − L = ½mv² = \[(pₓ + ½qBy)² + (p\_y − ½qBx)² + p\_z²\]/2m. Comment: H is just the kinetic energy and is conserved, since the magnetic force does no work. The motion is a circle in the xy-plane at the cyclotron frequency qB/m, with uniform motion along z.
11. T = ½m(R²θ̇² + ż²), U = ½k(R² + z²). p\_θ = mR²θ̇, p\_z = mż. H = p\_θ²/2mR² + p\_z²/2m + ½k(R² + z²). ṗ\_θ = 0, θ̇ = p\_θ/mR², so θ = ωt + θ₀ with ω constant. ṗ\_z = −kz, ż = p\_z/m, so z̈ = −(k/m)z and z = A cos(√(k/m) t + φ).
12. H = p²/2m + ½mω²x²; ẋ = p/m, ṗ = −mω²x. On H = E: x²/(2E/mω²) + p²/(2mE) = 1, an ellipse with semi-axes √(2E/mω²) and √(2mE). Area = π × product = 2πE/ω.
13. Treat the phase points as a fluid with velocity (q̇, ṗ). The rate of change of a volume is the integral of the divergence, Σ(∂q̇ₖ/∂qₖ + ∂ṗₖ/∂pₖ) = Σ(∂²H/∂qₖ∂pₖ − ∂²H/∂pₖ∂qₖ) = 0. So the flow is incompressible and volumes are constant.
14. r₁ = R + (m₂/M)r, r₂ = R − (m₁/M)r. T = ½m₁ṙ₁² + ½m₂ṙ₂² = ½MṘ² + ½(m₁m₂² + m₂m₁²)/M² ṙ² (the cross terms cancel) = ½MṘ² + ½μṙ², with μ = m₁m₂/M.
15. Lagrange for r: μr̈ = μrθ̇² − U′(r) = ℓ²/μr³ − U′(r). This is 1-D motion in U\_eff = ℓ²/2μr² − k/r. Circular orbit at dU\_eff/dr = 0: −ℓ²/μr³ + k/r² = 0, so r₀ = ℓ²/μk.
16. u = 1/r = e^(−αθ)/k, so d²u/dθ² = α²u. The orbit equation gives (1 + α²)u = −μF/(ℓ²u²), so F = −(ℓ²/μ)(1 + α²)/r³: an attractive inverse-cube force.
17. L = ½ml²θ̇² + mgl cosθ; p\_θ = ml²θ̇; H = p\_θ²/2ml² − mgl cosθ. θ̇ = p\_θ/ml², ṗ\_θ = −mgl sinθ.

### C. Numericals

18. μ = (81m)(m)/(82m) = (81/82)m ≈ 0.988 m\_moon.
19. T ∝ a^(3/2): T = 1.52^(3/2) ≈ 1.87 yr.
20. Escape: ½mv² − GMm/R = 0, so v\_esc = √(2GM/R). Circular: mv²/R = GMm/R², so v\_c = √(GM/R). Ratio √2.
21. ε = √(1 + 2Eℓ²/μk²) = √(1 − 1) = 0, a circle. (This E is the minimum of U\_eff.)

### D. Estimate

22. v = 2π × 1.5 × 10¹¹/3.15 × 10⁷ ≈ 9.4 × 10¹¹/3.15 × 10⁷ ≈ 3 × 10⁴ m/s, about 30 km/s.
