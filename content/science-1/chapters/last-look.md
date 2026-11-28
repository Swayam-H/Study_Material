# Sheet: Ch 1, Scales, modelling and the scientific method

**Last-look sheet.** It gives each core result with the reason it holds, then the traps and the past-paper favourites.

## Scientific method
- **The cycle:** observe, hypothesise, predict, test, revise. The prediction is the key step: a hypothesis that forbids nothing can't be tested.
- **Law or theory?** A law summarises *what* happens (Kepler's laws). A theory explains *why* and predicts new things (Newtonian gravity explains Kepler and also predicts tides). A theory doesn't grow up into a law. They do different jobs.
- **Falsifiability (Popper):** "All swans are white" can never be proven by more white swans, because the next one might be black. One black swan disproves it. Science keeps theories provisionally, for as long as they survive tests.
- **Occam's razor:** when two models fit the data equally well, prefer the one with fewer assumptions, because each extra assumption is another way to be wrong.
- **Why mathematics is the language:** a quantitative prediction ("2.43 pm shift") can fail in many more ways than a qualitative one ("some shift"). That makes it more falsifiable, so passing the test means more.

## Modelling toolkit
- **Dimensional analysis:** a physical law must hold in any units, so both sides must have the same dimensions. For a pendulum, the period T can depend only on l, g and m. Only $\sqrt{l/g}$ has the dimension of time, so $T = C\sqrt{l/g}$, and m cannot appear because nothing else could cancel its kg. The method cannot give the number C (here 2π).
- **Non-dimensionalising:** rescale x, t and so on by natural scales of the problem. What's left are dimensionless groups, such as the Reynolds number. Two systems with the same groups behave identically, which is why wind-tunnel models work.
- **Orders of magnitude:** an atom is about $10^{-10}$ m, a nucleus about $10^{-15}$ m, and a mole about $10^{23}$ particles. Checking an answer against these catches unit slips immediately.

## Fixed points and stability
- **Flow** $\dot x = f(x)$: at a fixed point $f(x^*) = 0$, so nothing changes. Nudge it by δ, and to first order $\dot\delta = f'(x^*)\delta$, so $\delta \propto e^{f'(x^*)t}$. It **dies out if $f'(x^*) < 0$** (stable) and grows if $f'(x^*) > 0$ (unstable).
- **Map** $x_{n+1} = g(x_n)$: a nudge becomes $\delta_{n+1} = g'(x^*)\delta_n$, so each step multiplies it by $g'$. It shrinks only if $|g'(x^*)| < 1$. That is why maps use the absolute value and flows use the sign.
- **Logistic growth** $\dot N = rN(1 - N/K)$: growth is about rN when N is small (unchecked), and it slows to zero as N → K because resources run out. Here $f'(0) = r > 0$, so extinction is unstable, and $f'(K) = -r < 0$, so the carrying capacity K is stable.
- **Logistic map** $x_{n+1} = rx_n(1 - x_n)$: $x^* = 1 - 1/r$ and $g'(x^*) = 2 - r$. It is stable while $|2 - r| < 1$, that is for 1 < r < 3. At r = 3 the slope passes −1, and the orbit flips between two values (period doubling). Repeated doublings lead to chaos near r ≈ 3.57.
- **Newton cooling** $\dot T = -k(T - T_{env})$: the heat flow is proportional to the temperature difference, so the difference decays exponentially, $T - T_{env} = (T_0 - T_{env})e^{-kt}$. One data point fixes k.

## Traps
- If $f'(x^*) = 0$, the linear test is silent, and you must look at higher-order terms.
- Dimensional analysis fails when two independent dimensionless groups exist, because the answer can then be any function of their ratio.

# Sheet: Ch 2, Newtonian mechanics

## Forces and energy
- **Work–energy:** $W = \int\vec F\cdot d\vec r = \Delta T$, because $\vec F\cdot\vec v = m\dot{\vec v}\cdot\vec v = \frac{d}{dt}(\tfrac12mv^2)$.
- **Conservative forces:** the work done is path-independent exactly when $\nabla\times\vec F = 0$ (Stokes' theorem: the loop integral equals the flux of the curl). Only then does $U$ with $\vec F = -\nabla U$ exist and energy is conserved. 2024 Q1 failed this test (the y-component of the curl was $e^{-x}$), so its ΔKE depended on the path.
- **Incline:** static friction can supply up to $\mu_sN = \mu_smg\cos\theta$. The pull down the slope is $mg\sin\theta$. The block slips when the pull exceeds the maximum friction, $\tan\theta > \mu_s$, and m cancels. While sliding, kinetic friction acts, so $a = g(\sin\theta - \mu_k\cos\theta)$.
- **Linear drag** $-kv$: as v grows, drag grows until it balances gravity. Then $\dot v = 0$, which gives $v_t = mg/k$. The approach is exponential, $v = v_t(1 - e^{-kt/m})$, because $\dot v$ is proportional to $(v_t - v)$.
- **Charge in $\vec B$:** $q\vec v\times\vec B$ is always perpendicular to $\vec v$, so it does no work and the speed stays constant. It has no component along $\vec B$, so $v_\parallel$ is constant. The perpendicular motion is uniform circular, with the magnetic force supplying the centripetal force: $qv_\perp B = mv_\perp^2/r$, so $r = mv_\perp/qB$ and $T = 2\pi m/qB$ (independent of speed). Circle plus drift makes a helix, and **pitch $= v_\parallel T$**.
- **Atwood machine:** the net driving force is $(m_1 - m_2)g$ and it accelerates the total mass $m_1 + m_2$, so $a = \frac{m_1 - m_2}{m_1 + m_2}g$. Then $T = m_2(g + a) = \frac{2m_1m_2g}{m_1 + m_2}$. In an elevator accelerating upward at α, the masses feel an extra inertial force downward, as if gravity were g + α.
- **Damped oscillator** $m\ddot x + b\dot x + kx = 0$: try $e^{\lambda t}$ to get $\lambda = -\beta \pm \sqrt{\beta^2 - \omega_0^2}$, with $\beta = b/2m$. If $\beta < \omega_0$ ($b^2 < 4mk$), the square root is imaginary, so the motion oscillates at $\omega_1 = \sqrt{\omega_0^2 - \beta^2}$ inside a decaying envelope $e^{-\beta t}$. Damping lowers the frequency. At $\beta = \omega_0$ (critical), the motion returns fastest without overshooting.

## Systems of particles (9.1–9.5, 9.11)
- **Centre of mass:** internal forces come in Newton's-third-law pairs and cancel in the sum, so $\vec F_{ext} = M\ddot{\vec R}_{cm}$. With no external force, the CM stays put. When a person walks on a boat, the boat moves back so that $m\,d_{\text{person}} = M\,d_{\text{boat}}$, measured relative to the ground.
- **Rocket:** in time dt, the rocket ejects mass |dm| backward at speed u relative to itself. Momentum conservation gives $m\,dv = -u\,dm$. Integrating gives $v = u\ln(m_0/m)$, so the speed gain grows only logarithmically, which is why rockets are mostly fuel. **Thrust** $= u|\dot m|$ is the momentum carried away per second. With gravity, subtract gt.

> ❌ Collisions (9.6–9.10) are not in the endsem.

# Sheet: Ch 3, Calculus of variations and Lagrangian mechanics

## Euler–Lagrange
- **The idea:** we want the curve y(x) that makes $J = \int f(y, y', x)\,dx$ stationary, like the minimum of an ordinary function. Perturb $y \to y + \epsilon\eta$, with η = 0 at the fixed ends, and require $dJ/d\epsilon = 0$. Integrating by parts moves the derivative off η, and since η is arbitrary, its coefficient must vanish:

$$\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'} = 0$$

- **No y in f:** then $\frac{d}{dx}\frac{\partial f}{\partial y'} = 0$, so $\partial f/\partial y'$ is constant. For arc length $\sqrt{1 + y'^2}$, that forces y′ to be constant: a straight line, the shortest path.
- **No x in f:** the Beltrami identity $f - y'\,\partial f/\partial y' = $ const applies. It is the "energy" of the variational problem. It is how the brachistochrone (a cycloid) and the hanging chain (a catenary) are solved.

## Lagrangian mechanics
- **Hamilton's principle:** the actual motion makes the action $S = \int(T - V)\,dt$ stationary. Applying Euler–Lagrange with t in place of x gives $\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q} = \frac{\partial\mathcal L}{\partial q}$. For $\mathcal L = \tfrac12m\dot x^2 - V$, this is exactly $m\ddot x = -V'$, so it is Newton's law in disguise, but it works in *any* coordinates.
- **Why constraints disappear:** if you choose coordinates that already satisfy the constraint (the angle for a pendulum, a single x for an Atwood machine), the constraint forces do no work along allowed motions, so they never enter T − V. You avoid solving for tension and normal forces.
- **Cyclic coordinates:** if q is absent from $\mathcal L$, the equation reads $\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q} = 0$, so $p_q$ is conserved. For a central force, θ is absent, so $mr^2\dot\theta$ (angular momentum) is conserved.
- **Noether's theorem:** each symmetry gives a conservation law. If physics doesn't change under time shifts, energy is conserved. Under space shifts, momentum is conserved. Under rotations, angular momentum is conserved. A cyclic coordinate is just a symmetry made visible.

## Standard set-ups
- **Pendulum:** $T = \tfrac12ml^2\dot\theta^2$ and $V = -mgl\cos\theta$ give $\ddot\theta = -(g/l)\sin\theta$. For small angles, $\sin\theta \approx \theta$, which is simple harmonic motion with $T = 2\pi\sqrt{l/g}$.
- **Bead on a rotating hoop:** in the rotating frame, the centrifugal push $\omega^2R\sin\theta$ competes with gravity. The equation is $\ddot\theta = \sin\theta(\omega^2\cos\theta - g/R)$. An off-axis equilibrium at $\cos\theta = g/\omega^2R$ exists only if $\omega^2 > g/R$. Once it appears, the bottom becomes unstable, because the centrifugal effect wins near θ = 0.
- **Cylinder rolling inside a cylinder:** rolling without slipping ties the spin to the orbital motion, $\omega_{spin} = (R - r)\dot\theta/r$. So the kinetic energy has an extra rotational part: $T = \tfrac34m(R - r)^2\dot\theta^2$ for a solid cylinder. The extra inertia slows the oscillation to $\omega = \sqrt{2g/3(R - r)}$.

> ❌ 7.12 and 7.13 are not in the endsem.

# Sheet: Ch 4, Hamiltonian dynamics and central force

## Hamiltonian
- **Definition:** $p = \partial\mathcal L/\partial\dot q$ and $H = \sum p\dot q - \mathcal L$, written in terms of (q, p). This swaps the velocity variable for the momentum (a Legendre transform), turning one second-order equation into two first-order ones: $\dot q = \partial H/\partial p$ and $\dot p = -\partial H/\partial q$.
- **When H is conserved:** $dH/dt = -\partial\mathcal L/\partial t$, so H is conserved whenever $\mathcal L$ has no explicit t.
- **When H equals the energy:** if T is quadratic in the velocities, then $\sum p\dot q = 2T$, so H = 2T − (T − V) = T + V. This fails when the coordinates depend on time. For a bead on a wire forced to rotate, H is conserved but is not the energy, because the motor keeps doing work on the bead.
- **Relativistic free particle** (asked in 2024 and 2025): $\mathcal L = -mc^2\sqrt{1 - u^2/c^2} - V$ is chosen so that $\partial\mathcal L/\partial\vec u = \gamma m\vec u$ is the relativistic momentum. Then $H = \gamma mc^2 + V$, and the algebra $p^2c^2 + m^2c^4 = \gamma^2m^2c^4$ turns it into $\sqrt{p^2c^2 + m^2c^4} + V$.

## Central force and two-body
- **Reduced mass:** the CM of an isolated pair moves uniformly, so only the separation $\vec r = \vec r_1 - \vec r_2$ matters. Its equation is that of a single body of mass $\mu = m_1m_2/(m_1 + m_2)$ in V(r). When one mass is much larger, μ is about the smaller mass.
- **Angular momentum:** a central force has no torque, so $\vec l$ is conserved. That has two consequences: the motion stays in a plane, and $\tfrac12r^2\dot\theta = l/2\mu$ is constant (Kepler II, equal areas in equal times). This is why a comet speeds up at perihelion: a smaller r needs a larger $\dot\theta$.
- **Effective potential:** put $\dot\theta = l/\mu r^2$ into the energy, and the radial motion behaves like 1-D motion in $V_{eff} = V + l^2/2\mu r^2$. The $l^2/2\mu r^2$ term is a centrifugal barrier that rises as r → 0, which is why an orbiting body with l ≠ 0 can't fall into the centre. A circular orbit sits at the minimum of $V_{eff}$.
- **Orbit shapes for −k/r:** the sign of E decides whether $V_{eff}$ traps the body. E < 0 is bound (ellipse), E = 0 is just free (parabola) and E > 0 is unbound (hyperbola). For an ellipse, $a = (r_p + r_a)/2$ and $e = (r_a - r_p)/(r_a + r_p)$.
- **Kepler III:** $T^2 = 4\pi^2a^3/G(m_1 + m_2)$. For a circular orbit, gravity supplies the centripetal force, which gives the same scaling. The *total* mass appears because both bodies orbit the CM.
- **Vis-viva:** energy conservation with $E = -GMm/2a$ gives $v^2 = GM(2/r - 1/a)$. Escape needs E = 0, which gives $v_{esc} = \sqrt2\,v_{circ}$.

> ❌ Phase space, Liouville's theorem, and 8.8–8.10 are not in the endsem.

# Sheet: Ch 5, Special relativity

## Postulates and transformations
- **Postulates:** physics is the same in all inertial frames, and light has speed c in every one of them. The second contradicts adding speeds the Galilean way, so space and time themselves must transform.
- **Lorentz transformation:** the unique linear transformation that keeps c fixed: $x' = \gamma(x - vt)$ and $t' = \gamma(t - vx/c^2)$. **The inverse** just swaps the primes and flips v, because S moves at −v as seen from S′. That is the whole of 2024 Q6.
- **Time dilation:** a light clock bouncing vertically in a moving frame traces a longer diagonal path, but light still moves at c, so each tick takes longer: $\Delta t = \gamma\Delta\tau$. τ is the proper time, read by the clock in its own rest frame. This is why muons reach sea level: Earth sees their clocks run slow.
- **Length contraction:** $L = L_0/\gamma$, only along the motion. It follows from relativity of simultaneity: measuring length means marking both ends at the *same* time, and observers disagree about what "same time" means. Perpendicular lengths don't change, so a tilted rod looks steeper, with $\tan\theta' = \gamma\tan\theta$.
- **Simultaneity:** $\Delta t' = \gamma(\Delta t - v\Delta x/c^2)$. Events that are simultaneous ($\Delta t = 0$) but separated ($\Delta x \ne 0$) are *not* simultaneous in another frame.
- **Interval:** $s^2 = c^2\Delta t^2 - \Delta x^2$ is the same in all frames, and it plays the role distance plays in geometry. If $s^2 > 0$ (timelike), a signal slower than light can connect the events, and every frame agrees on their order. If $s^2 < 0$ (spacelike), no signal can connect them, so the order can differ between frames without breaking causality.
- **Velocity addition:** $u = (u' + v)/(1 + u'v/c^2)$. The denominator comes from the time transformation. If u′ = c, then u = c, as the postulate requires.

## Doppler and twins
- **Radial Doppler:** $\nu = \nu_0\sqrt{(1 + \beta)/(1 - \beta)}$ for an approaching source. It combines the classical wave-crest bunching with time dilation of the source's clock.
- **Transverse Doppler:** with no radial motion, there is no bunching, but the clock still runs slow, so $\nu = \nu_0/\gamma$. This is a purely relativistic effect, and classical physics predicts no shift (2024 Part II Q3).
- **Twins:** time dilation looks symmetric, but only the traveller switches inertial frames at the turnaround, and that breaks the symmetry. The traveller ages less, by a factor of 1/γ.

## Energy and momentum
- **Momentum:** $\vec p = \gamma m\vec v$ is the definition that keeps momentum conserved in all frames. The matching energy is $E = \gamma mc^2$. With $K = E - mc^2 = (\gamma - 1)mc^2$, this reduces to $\tfrac12mv^2$ when v ≪ c.
- **Invariant:** $E^2 - p^2c^2 = m^2c^4$ is the same in all frames, just like $s^2$. Use it for decays: a particle at rest has total momentum zero, so its products share momentum equally and oppositely, which gives $pc = (m_A^2 - m_B^2)c^2/2m_A$ when the second product is massless.
- **Why the KE ratio exceeds 1:** γ grows steeply as v → c, so the same speed change costs much more energy at high speed. For 0.6c → 0.8c, the ratio is 2.98.

# Sheet: Ch 6, Thermodynamics I: gases and the first law

## Gases (Focus 1)
- **Pressure from collisions:** a molecule hitting a wall transfers 2mvₓ per hit and hits $v_x/2L$ times per second. Summing over N molecules gives $pV = \tfrac13Nm\langle v^2\rangle$. Comparing with pV = NkT gives $\langle\tfrac12mv^2\rangle = \tfrac32kT$, so **temperature is average kinetic energy**, the same for every gas at the same T.
- **Speeds:** with equal KE, lighter molecules move faster, as $v \propto 1/\sqrt M$. The Maxwell distribution is $v^2e^{-mv^2/2kT}$, where v² counts the number of velocity directions and the exponential is the Boltzmann factor. It is skewed, which gives $v_{mp} = \sqrt{2RT/M}$ < $\bar v$ < $v_{rms} = \sqrt{3RT/M}$. Its long high-speed tail is why light H₂ and He escape Earth even though their average speed is well below escape speed.
- **Real gases:** the compression factor $Z = pV_m/RT$ measures departure from ideal. In the vdW equation $p = RT/(V_m - b) - a/V_m^2$, b is the volume the molecules themselves occupy (repulsion), which raises p. The term $a/V_m^2$ is attraction pulling molecules back from the wall, which lowers p. It goes as $1/V_m^2$ because it needs pairs of molecules. Z < 1 means attraction wins; Z > 1 means repulsion wins.
- **Boyle temperature** $T_B = a/Rb$: the temperature at which the a and b effects cancel at low pressure, so the gas behaves ideally over a range of p. The critical point ($T_c = 8a/27Rb$) is where liquid and gas stop being distinct. Above $T_c$, no pressure can liquefy the gas.

## First law (Focus 2)
- **ΔU = q + w** is energy conservation, with w the work done *on* the gas, $w = -\int p_{ex}dV$. The minus sign is there because expansion means the gas is doing work, so the work done on it is negative.
- **Isothermal reversible** (perfect gas): U of a perfect gas depends only on T, since there are no forces between the molecules. So ΔU = 0, and all the heat in becomes work out: $w = -nRT\ln(V_f/V_i)$.
- **Heat capacities:** $C_p > C_V$ because at constant p, part of the heat also pushes back the atmosphere. For a perfect gas, $C_p - C_V = nR$. By **equipartition** each quadratic energy term holds ½kT, so a monatomic gas (3 translational terms) has $C_V = \tfrac32R$ and γ = 5/3. A diatomic gas adds 2 rotational terms: $C_V = \tfrac52R$, γ = 7/5. Its vibration is frozen out at room temperature.
- **Enthalpy H = U + pV:** at constant p, $\Delta H = q_p$, because the pΔV work is folded in. That is why reaction tables list ΔH. For gas-phase reactions, $\Delta H - \Delta U = \Delta(pV) = \Delta n_gRT$.
- **Reversible adiabatic:** with q = 0, the gas pays for its expansion work from U, so it cools: $C_VdT = -p\,dV$, which integrates to $TV^{\gamma-1} = $ const and $pV^\gamma = $ const. The adiabat is steeper than the isotherm because p falls from both the volume increase and the cooling.
- **Free expansion:** expanding into vacuum pushes against nothing, so w = 0. The container is insulated, so q = 0. Then ΔU = 0, and for a perfect gas ΔT = 0.
- **State functions and exact differentials:** U and H depend only on the state, so dU is exact ($\partial M/\partial y = \partial N/\partial x$), and its integral around a cycle is zero. q and w depend on the path, so a cycle can turn net heat into net work. That is how engines work at all.
- **Hess's law:** since H is a state function, the ΔH of a reaction doesn't depend on the route, so you can add and subtract tabulated reactions. **Kirchhoff:** $\Delta_rH$ changes with T by $\Delta C_p\Delta T$, because products and reactants heat up differently.
- **Joule–Thomson:** throttling conserves H. A real gas cools below the inversion temperature, because the molecules do work against their mutual attraction as they separate. Above it, repulsions dominate and the gas warms. That is why helium warms when throttled at room temperature.

# Sheet: Ch 7, Thermodynamics II: entropy and free energy

## Second law and engines (3A)
- **Kelvin–Planck and Clausius:** no cycle can turn heat from one reservoir fully into work, and heat never flows cold → hot by itself. They are equivalent: violate one, combine it with a normal engine or fridge, and you violate the other.
- **Entropy:** $dS = dq_{rev}/T$. Dividing by T makes this exact, even though dq isn't. That is what makes S a state function. The Clausius inequality $dS \ge dq/T$ says irreversibility always creates extra entropy. So for an isolated system, ΔS ≥ 0.
- **Carnot efficiency:** a reversible engine creates no entropy, so $Q_H/T_H = Q_C/T_C$, which gives $\eta = 1 - T_C/T_H$. Any real engine generates entropy and must dump more heat, so it does worse. For a fridge, COP = $T_C/(T_H - T_C)$, and it gets worse as the temperature gap widens.
- **Otto cycle:** $\eta = 1 - (V_B/V_A)^{\gamma-1}$. It is lower than a Carnot engine between the same extreme temperatures because heat enters while T climbs from $T_B$ to $T_C$, not all at $T_{max}$.
- **Statistical view:** $S = k\ln W$, where W counts microstates. Doubling the volume gives each molecule twice the positions, so W is multiplied by $2^N$ and ΔS = Nk ln 2 = nR ln 2. That matches the thermodynamic result and explains why entropy rises: more ways to arrange is overwhelmingly more likely.

## Entropy changes (3B)
- **Perfect gas:** $\Delta S = nR\ln(V_f/V_i) + nC_V\ln(T_f/T_i)$. More volume and more temperature both open up more microstates.
- **Phase transition:** heat flows in at constant T, so $\Delta S = \Delta H_{trs}/T_{trs}$. **Trouton's rule** says most liquids have about 85 J/(K mol) on boiling, since going to a gas frees the molecules by a similar amount. Water is higher, about 109, because hydrogen bonding makes its liquid unusually ordered.
- **Irreversible processes:** S is a state function, so calculate ΔS along an imagined reversible path between the same end states. For free expansion, $\Delta S_{gas} = nR\ln(V_f/V_i)$ even though q = 0. The surroundings don't change, so the universe gains entropy.

## Third law and free energies (3C–3F)
- **Third law:** a perfect crystal at 0 K has exactly one arrangement, W = 1, so S = k ln 1 = 0. That gives entropy an absolute zero point. Near 0 K, the Debye law $C_p = aT^3$ gives $S = \int C_p/T\,dT = C_p/3$.
- **Why G:** the second law speaks about the universe, but we want a condition on the system alone. At constant T and p, $\Delta S_{surr} = -\Delta H/T$, so $\Delta S_{univ} \ge 0$ becomes $\Delta G = \Delta H - T\Delta S \le 0$. G is the system's own spontaneity test. Similarly, A = U − TS works at constant T and V.
- **Meaning of −ΔG:** the maximum non-expansion work, such as electrical work from a cell. For A, $-\Delta A$ is the maximum total work.
- **Sign logic:** ΔG = ΔH − TΔS. If ΔH and ΔS favour opposite directions, temperature decides, and the crossover is at $T^* = \Delta H/\Delta S$. CaCO₃ → CaO + CO₂ needs heat (ΔH > 0) but releases a gas (ΔS > 0), so it goes only above about 1110 K. That is why lime kilns run hot.
- **Fundamental equation:** dU = T dS − p dV combines both laws for reversible changes, and from it dG = V dp − S dT. Equality of mixed partial derivatives gives the Maxwell relations, such as $(\partial S/\partial V)_T = (\partial p/\partial T)_V$. These let you compute hard-to-measure entropy changes from p–V–T data. For example, the internal pressure $\pi_T = T(\partial p/\partial T)_V - p$ is $a/V_m^2$ for a vdW gas: only attraction makes U depend on V.

> ❌ Phase diagrams and Focus 4 are not in the endsem.

# Sheet: Ch 8, Particle properties of waves (Beiser 2)

- **Photons:** light comes in lumps of $E = h\nu$, and the relation E = pc for massless light gives $p = h/\lambda$. Use hc = 1240 eV nm for quick numbers.
- **Photoelectric effect:** one photon is absorbed by one electron. It must pay the work function φ to leave the metal, and the rest is kinetic energy: $K_{max} = h\nu - \phi$. This explains everything the wave picture couldn't:
  - Below $\nu_0 = \phi/h$, no single photon has enough energy, however bright the light, so no electrons come out.
  - Brighter light means more photons, so more electrons but not faster ones.
  - There is no time delay, because no energy needs to build up.
- **Blackbody spectrum:**
  - Classical equipartition gives each cavity mode kT, and the number of modes grows as ν², so the energy diverges at high ν (the ultraviolet catastrophe).
  - Planck's fix: a mode of frequency ν can hold only whole multiples of hν. When hν ≫ kT, even one quantum is too costly, so high modes stay empty, and the factor $1/(e^{h\nu/kT} - 1)$ cuts the spectrum off.
  - **Stefan–Boltzmann** $\sigma T^4$ comes from integrating over ν.
  - **Wien** $\lambda_{max}T = 2.898$ mm K comes from setting the derivative to zero: $5(1 - e^{-x}) = x$ in λ, or $3(1 - e^{-x}) = x$ in ν. The two peaks differ because $d\lambda$ and $d\nu$ stretch the spectrum differently.
- **X-ray production** (inverse photoelectric): an electron accelerated through V volts can give at most all of its eV to one photon. That sets the sharp cutoff $\lambda_{min} = hc/eV$.
- **Bragg diffraction:** waves reflected from planes spaced d apart add in step when the extra path, 2d sin θ, is a whole number of wavelengths. The smallest angle is n = 1.
- **Compton scattering:** a photon bounces off a free electron like a billiard ball, conserving energy and momentum relativistically. It gives up energy, so its wavelength grows: $\Delta\lambda = (h/m_ec)(1 - \cos\theta)$. The shift doesn't depend on λ, so it shows up only for X-rays, where 2.43 pm is a noticeable fraction of the wavelength. This was the decisive evidence that photons carry momentum.
- **Pair production:** a photon becomes an electron and a positron, so it needs at least $2m_ec^2 = 1.022$ MeV. It can't happen in empty space, because energy and momentum can't both be conserved. A nearby nucleus takes up the recoil.

# Sheet: Ch 9, Wave properties of particles (Beiser 3)

- **de Broglie:** if light (a wave) has $p = h/\lambda$, de Broglie proposed that matter (particles) has $\lambda = h/p$ too. An electron accelerated through V volts has $p = \sqrt{2meV}$, so $\lambda = 1.226/\sqrt V$ nm. At 100 V that is about atomic spacing, which is why crystals diffract electrons (Davisson–Germer).
- **Why everyday objects don't diffract:** h is tiny, so for a macroscopic p, λ is far smaller than any slit.
- **Phase and group velocity:** a single matter wave has phase velocity $v_p = \omega/k = c^2/v > c$. That's harmless, because a pure wave carries no signal. A localised particle is a wave packet, and its envelope moves at the **group velocity** $d\omega/dk = v$, the particle's actual speed.
- **Particle in a box:** the wave must vanish at both walls, so only standing waves with a whole number of half-wavelengths fit: $L = n\lambda/2$. Then p = h/λ gives $E_n = n^2h^2/8mL^2$, which is quantisation from boundary conditions alone.
  - E₁ ≠ 0: a particle that's confined can't be at rest, or Δp = 0 would violate the uncertainty principle.
  - Since $\sin^2$ has n identical lobes, the probability of finding it in the first L/n is exactly 1/n.
- **Uncertainty principle:** a packet with a well-defined position needs many wavelengths superposed, so a wide spread in p: $\Delta x\Delta p \ge \hbar/2$. This is not measurement clumsiness but a property of waves.
  - For a confined particle, Δp ≥ ħ/2Δx sets a minimum kinetic energy, which is why atoms don't collapse.
  - Similarly, $\Delta E\Delta t \ge \hbar/2$: a state that lasts only Δt has an energy spread, which is the natural width of spectral lines.
  - A position fixed today spreads tomorrow, $\Delta x(t) \approx \Delta v\,t$. That is why the proton "positioned to $10^{-11}$ m" is uncertain by kilometres after one second.
- **3-D box:** $E = E_0(n_x^2 + n_y^2 + n_z^2)$, and different combinations can share an energy (degeneracy, by symmetry). For thermal probabilities, multiply the Boltzmann factor by the number of states at that energy.

# Sheet: Ch 10, Atomic structure (Beiser 4)

- **Bohr's quantisation condition, $mvr = n\hbar$:** an electron's de Broglie wave must close on itself around the orbit, or it interferes destructively with itself and cancels. So the circumference holds a whole number of wavelengths, $2\pi r = n\lambda = nh/mv$, which rearranges to $mvr = nh/2\pi = n\hbar$. Angular momentum comes quantised because only standing waves survive. That is also why the ground-state λ equals $2\pi a_0$ (2024 Q10).
- **Radii and energies:** combine $mvr = n\hbar$ with the Coulomb force supplying the centripetal force, $mv^2/r = ke^2/r^2$. Then $r_n = n^2a_0$ with $a_0 = 0.0529$ nm. The total energy is $E = -ke^2/2r$ (the KE is half the magnitude of the PE), so $E_n = -13.6/n^2$ eV. It is negative because the electron is bound.
- **Hydrogen-like ions:** charge Ze scales the force by Z, so $E_n \propto Z^2$ and $r_n \propto 1/Z$. He⁺ binds four times more strongly.
- **Reduced mass:** the nucleus isn't infinitely heavy, and both bodies orbit the CM. Replacing m with μ handles it exactly. E ∝ μ, so a muon (207 m_e, μ = 186 m_e) binds 186 times more strongly and sits 186 times closer.
- **Spectra:** a photon carries off exactly the energy difference between levels, $h\nu = E_i - E_f$, which gives the Rydberg formula $1/\lambda = R(1/n_f^2 - 1/n_i^2)$. Series are grouped by final level: Lyman (to n = 1, UV), Balmer (to n = 2, visible, Hα = 656 nm), Paschen (to n = 3, IR). Lines crowd together toward the ionisation limit because the levels do.
- **Correspondence principle:** for large n, the levels are so close that the n → n − 1 photon frequency equals the classical orbital frequency. Quantum theory must reproduce classical physics where classical physics works.
- **Franck–Hertz:** electrons crossing mercury vapour lose energy only in lumps of 4.9 eV, so the current dips at multiples of it. This shows atomic levels are discrete even without light.
- **Thermal Doppler broadening:** each atom's line is shifted by its velocity along the line of sight. That velocity follows a Gaussian (Maxwell), so the line becomes a Gaussian of width $\nu_0\sqrt{kT/mc^2}$, broader for hotter or lighter atoms.

> ❌ Rutherford scattering (appendix) and lasers are not in the endsem.

# Sheet: Ch 11, Quantum mechanics (Beiser 5)

- **Schrödinger equation:** built so that a plane wave $e^{i(kx - \omega t)}$ obeys E = p²/2m + V with E = ħω and p = ħk. That is why $\hat p = -i\hbar\,\partial_x$ and $\hat E = i\hbar\,\partial_t$. If V doesn't depend on t, separate variables, $\Psi = \psi(x)e^{-iEt/\hbar}$. Then $|\Psi|^2$ doesn't change in time, which is why these are called *stationary* states.
- **What a valid ψ must satisfy:** $|\psi|^2$ is a probability density, so ψ must be normalisable and single-valued. It must also be continuous, and ψ′ must be continuous wherever V is finite, otherwise the kinetic term ψ″ would be infinite. These conditions are what quantise the energy.
- **Expectation values:** $\langle A\rangle = \int\psi^*\hat A\psi\,dx$ is the average over many measurements on identically prepared systems. For a real ψ that vanishes at the walls, ⟨p⟩ = 0, because the integrand is a total derivative of ψ²/2.
- **Superpositions:** in $\tfrac1{\sqrt2}(\psi_1 + \psi_2)$, each measurement gives E₁ or E₂, never their average, each with probability $|c|^2 = \tfrac12$. The two parts evolve at different frequencies, so their interference term beats at $\omega = (E_2 - E_1)/\hbar$, and the probability sloshes from side to side. Only superpositions move; single stationary states don't.
- **Finite well:** where E < V, the solution decays as $e^{-\kappa x}$ but isn't zero. The particle leaks into the walls, which effectively widens the box, so the levels are lower than for the infinite well.
- **Tunnelling:** inside a barrier, ψ decays as $e^{-\kappa x}$ with $\kappa = \sqrt{2m(U - E)}/\hbar$. **κ depends on the energy deficit U − E, not on U.** Over a width L, the amplitude falls by $e^{-\kappa L}$, so the probability falls by $T \approx e^{-2\kappa L}$. Because $\kappa \propto \sqrt m$ sits in an exponent, electrons tunnel easily, protons hardly at all, and everyday objects never. Alpha decay works because the particle hits the barrier about $10^{21}$ times a second.
- **Harmonic oscillator:**
  - The levels are $E_n = (n + \tfrac12)\hbar\omega$, evenly spaced. The zero-point energy ħω/2 is the uncertainty principle again: the oscillator can't sit still at the bottom.
  - The ground state is a Gaussian, $e^{-\alpha x^2/2}$ with α = mω/ħ. The **Feynman trick**: differentiate $\int e^{-\alpha x^2}dx = \sqrt{\pi/\alpha}$ with respect to α to bring down x², which gives $\langle x^2\rangle = 1/2\alpha = \hbar/2m\omega$.
  - Then ⟨V⟩ = ħω/4, exactly half of E₀. The other half is kinetic, as the virial theorem says for any quadratic potential.

# Sheet: Ch 12, The hydrogen atom (Beiser 6.1–6.9)

- **Separation:** the potential −ke²/r depends only on r, so the equation splits in spherical coordinates into $R(r)\Theta(\theta)\Phi(\phi)$. Each part has its own boundary condition, and each condition produces one quantum number.
- **$m_l$ from Φ:** $\Phi = e^{im_l\phi}$ must return to itself after a full turn ($\phi \to \phi + 2\pi$), so $m_l$ is an integer. $L_z = -i\hbar\,\partial_\phi$ gives $L_z = m_l\hbar$.
- **l from Θ:** Θ must stay finite at the poles (θ = 0 and π). That works only for integer l ≥ |m_l|, and it gives $L^2 = l(l+1)\hbar^2$. The z-component can't exceed the total, which is why |m_l| ≤ l.
- **n from R:** R must vanish at infinity. That works only for certain energies, $E_n = -13.6/n^2$ eV, which is the same as Bohr, with l ≤ n − 1. The energy depends on n alone, so all the l and $m_l$ values share it. That gives n² orbital states, or 2n² with spin.
- **Space quantisation:** $\cos\theta = m_l/\sqrt{l(l+1)}$. Since $|m_l| \le l < \sqrt{l(l+1)}$, L can never point exactly along z. If it did, $L_x$ and $L_y$ would both be exactly zero, which the uncertainty principle forbids.
- **Reading a ψ (asked every year):**
  - **n** from $e^{-r/na_0}$, since the decay length grows with n.
  - **l** from the angular factor: $\cos\theta$ means l = 1, m = 0. $\sin\theta e^{\pm i\phi}$ means l = 1, m = ±1. $3\cos^2\theta - 1$ means l = 2, m = 0. $\sin\theta\cos\theta e^{\pm i\phi}$ means l = 2, m = ±1. $\sin^2\theta e^{\pm2i\phi}$ means l = 2, m = ±2.
  - **$m_l$** from $e^{im\phi}$.
  - **Check:** there are n − l − 1 radial nodes, so a bare $r^le^{-r/na_0}$ means l = n − 1.
- **Probability density:** the chance of finding the electron at radius r counts the whole shell of area $4\pi r^2$, so $P(r) = r^2|R|^2$. That is why the 1s density is largest at the nucleus, but the *most probable radius* is $a_0$. In general the l = n − 1 states peak at $n^2a_0$, which is where Bohr's orbits come from.
- **Selection rules:** a photon carries one unit of angular momentum, ħ, so it can change l by exactly ±1 and $m_l$ by 0 or ±1. Δn is unrestricted, because energy is not what's conserved here. That is why 3d → 2p is allowed but 3d → 2s and 3s → 2s are forbidden.
- **Radiation only during transitions:** a stationary state has a time-independent $|\psi|^2$, so no charge oscillates and nothing radiates. During a transition, ψ is a superposition, and the charge oscillates at $(E_i - E_f)/h$, exactly the photon's frequency. This is why the Bohr atom doesn't spiral in.

> ❌ The Zeeman effect (6.10), spin (7.1) and the periodic table (ch 7) are not in the endsem.
