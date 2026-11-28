# Sheet: Ch 1, Scales, modelling and the scientific method

**Read this in the last 5 minutes.** Each sheet gives the core results, the traps, and how the endsem has asked about the topic.

## Scientific method, in one breath
- Observe, then form a **hypothesis**, then make a **testable prediction**, then experiment, then revise. A **law** summarises a regularity (what happens). A **theory** explains it (why) and predicts new things.
- **Falsifiability (Popper):** no number of confirmations proves a universal claim, but one counter-example refutes it. Theories are kept provisionally.
- **Occam's razor:** prefer the model with fewer assumptions when both fit the data.
- Mathematics is the language because it makes predictions *quantitative*, and so falsifiable.

## Modelling toolkit
- **Dimensional analysis:** write $Q = Ca^\alpha b^\beta\dots$ and match M, L, T. Example: pendulum $T = C\sqrt{l/g}$. The constant C needs experiment or the full solution.
- **Non-dimensionalise:** scale the variables so the equation has the fewest parameters. The groups that are left (such as the Reynolds number) decide the behaviour.
- **Orders of magnitude:** an atom is about $10^{-10}$ m, a nucleus about $10^{-15}$ m, and Avogadro's number $\sim 10^{23}$. Check every answer against these.

## Fixed points and stability
- For a flow $\dot x = f(x)$: fixed points satisfy $f(x^*) = 0$. The point is **stable if $f'(x^*) < 0$**, unstable if $f'(x^*) > 0$.
- For a map $x_{n+1} = g(x_n)$: fixed points satisfy $g(x^*) = x^*$. The point is **stable if $|g'(x^*)| < 1$**.
- **Logistic growth** $\dot N = rN(1 - N/K)$: N = 0 is unstable and N = K (carrying capacity) is stable. The solution is an S-curve.
- **Logistic map** $x_{n+1} = rx_n(1 - x_n)$: $x^* = 1 - 1/r$ with $g'(x^*) = 2 - r$. It is stable for 1 < r < 3, period-doubling begins at r = 3, and it becomes chaotic near r ≈ 3.57.
- **Exponential decay or cooling:** $\dot T = -k(T - T_{env})$ gives $T - T_{env} = (T_0 - T_{env})e^{-kt}$. Get k from one data point.

## Traps
- Linear stability says nothing when $f'(x^*) = 0$.
- The map test uses $|g'| < 1$; the flow test uses the sign of $f'$. Don't mix them up.

# Sheet: Ch 2, Newtonian mechanics

## Core
- $\vec F = m\vec a$. Work–energy: $W = \Delta T$. **Conservative** means $\nabla\times\vec F = 0$, so that $\vec F = -\nabla U$ and the work is path-independent. To find U, integrate one component and match the others.
- **Incline:** the block starts to slide when $\tan\theta > \mu_s$. Once sliding, $a = g(\sin\theta - \mu_k\cos\theta)$.
- **Linear drag** $-kv$: $v_t = mg/k$ and $v = v_t(1 - e^{-kt/m})$, with time constant m/k. Quadratic drag: $v_t = \sqrt{mg/c}$.
- **Charge in $\vec B$:** $\omega_c = qB/m$, $r = mv_\perp/(qB)$, period $2\pi m/(qB)$, and **pitch $= v_\parallel\cdot2\pi m/(qB)$**. B does no work, so the speed is constant.
- **Atwood:** $a = \dfrac{m_1 - m_2}{m_1 + m_2}g$ and $T = \dfrac{2m_1m_2g}{m_1 + m_2}$. In an elevator accelerating up at α, replace g with g + α.
- **Damped oscillator** $m\ddot x + b\dot x + kx = 0$: it oscillates if $b^2 < 4mk$, with $\omega_1 = \sqrt{k/m - b^2/4m^2}$. Amplitude goes as $e^{-bt/2m}$. Critical damping is $b = 2\sqrt{mk}$.

## Systems of particles (9.1–9.5, 9.11)
- With no external force, the centre of mass doesn't move. Boat problem: $m\,d_{\text{person}} = M\,d_{\text{boat}}$ relative to the ground.
- $\vec P = M\vec v_{cm}$, and $\vec F_{ext} = d\vec P/dt$. The internal forces cancel.
- **Rocket in free space:** $v = v_0 + u\ln(m_0/m)$. **Thrust** $= u|\dot m|$. In gravity, $v = u\ln(m_0/m) - gt$.
- **Rope over a nail** (2024): energy gives $v = \sqrt{ga}$ for total length 2a.

> ❌ Collisions (9.6–9.10) are not in the endsem.

## Traps
- The KE change is path-dependent if curl F ≠ 0. That was the 2024 Q1 answer.
- $\tan^{-1}0.3 = 16.7°$, not 15°.

# Sheet: Ch 3, Calculus of variations and Lagrangian mechanics

## Euler–Lagrange
For $J = \int f(y, y', x)\,dx$, the extremum satisfies

$$\frac{\partial f}{\partial y} - \frac{d}{dx}\frac{\partial f}{\partial y'} = 0$$

- If f has **no y**, then $\partial f/\partial y'$ is constant. Example: $\sqrt{1 + y'^2}$ gives a **straight line**.
- If f has **no x**, the Beltrami identity applies: $f - y'\,\partial f/\partial y' = $ const. Used for the brachistochrone (a cycloid) and the catenary.

## Lagrangian mechanics
- $\mathcal L = T - V$ in generalised coordinates, and $\dfrac{d}{dt}\dfrac{\partial\mathcal L}{\partial\dot q} - \dfrac{\partial\mathcal L}{\partial q} = 0$.
- **Hamilton's principle:** the actual path makes $S = \int\mathcal L\,dt$ stationary.
- Constraint forces drop out when the coordinates already satisfy the constraints (Atwood: one coordinate x).
- **Cyclic coordinate** (q absent from $\mathcal L$) means $p_q = \partial\mathcal L/\partial\dot q$ is conserved. θ cyclic means angular momentum is conserved.
- **Symmetry gives conservation (Noether):** time translation gives energy, space translation gives momentum, and rotation gives angular momentum.

## Standard set-ups
- **Pendulum:** $\mathcal L = \tfrac12ml^2\dot\theta^2 + mgl\cos\theta$, so $\ddot\theta = -(g/l)\sin\theta$ and $T = 2\pi\sqrt{l/g}$.
- **Bead on a rotating hoop:** $\ddot\theta = \sin\theta(\omega^2\cos\theta - g/R)$. Off-axis equilibrium at $\cos\theta = g/\omega^2R$ exists only if $\omega^2 > g/R$, and then the bottom becomes unstable.
- **Cylinder rolling inside a cylinder** (2024): $T = \tfrac34m(R - r)^2\dot\theta^2$, giving $\omega = \sqrt{2g/3(R - r)}$.

> ❌ 7.12 and 7.13 are not in the endsem.

# Sheet: Ch 4, Hamiltonian dynamics and central force

## Hamiltonian
- $p_i = \partial\mathcal L/\partial\dot q_i$ and $H = \sum p_i\dot q_i - \mathcal L$, written in terms of (q, p).
- Hamilton's equations: $\dot q = \partial H/\partial p$ and $\dot p = -\partial H/\partial q$.
- If $\mathcal L$ has no explicit t, H is conserved. **H = T + V** only when the coordinates are time-independent and V doesn't depend on velocity. Counter-example: a bead on a rotating wire, where H is conserved but is not the energy.
- **Relativistic free particle** (asked in both 2024 and 2025): $\mathcal L = -mc^2\sqrt{1 - u^2/c^2} - V$ gives $\vec p = \gamma m\vec u$ and $H = \gamma mc^2 + V = \sqrt{p^2c^2 + m^2c^4} + V$.

## Central force and two-body
- Reduced mass $\mu = m_1m_2/(m_1 + m_2)$, so two bodies become one body of mass μ in V(r).
- $l = \mu r^2\dot\theta$ is conserved, so the motion is planar and sweeps equal areas in equal times (Kepler II).
- $V_{eff} = V(r) + \dfrac{l^2}{2\mu r^2}$. A circular orbit sits at the minimum of $V_{eff}$. The centrifugal barrier keeps r > 0 when l ≠ 0.
- **Kepler orbit** for $V = -k/r$: E < 0 gives an ellipse, E = 0 a parabola, E > 0 a hyperbola. $a = (r_p + r_a)/2$ and $e = (r_a - r_p)/(r_a + r_p)$.
- **Kepler III:** $T^2 = \dfrac{4\pi^2a^3}{G(m_1 + m_2)}$. In years, AU and solar masses, $T^2 = a^3/M_{tot}$.
- **Vis-viva:** $v^2 = GM(2/r - 1/a)$, and $v_pr_p = v_ar_a$.
- Geostationary orbit is 42,200 km from Earth's centre. Escape speed is $\sqrt2\,v_{circ}$.

> ❌ Phase space, Liouville's theorem, and 8.8–8.10 are not in the endsem.

# Sheet: Ch 5, Special relativity

## Postulates and transformations
- The laws of physics are the same in every inertial frame, and c is the same for all observers.
- $\gamma = 1/\sqrt{1 - v^2/c^2}$. Lorentz: $x' = \gamma(x - vt)$, $t' = \gamma(t - vx/c^2)$. **Inverse: swap the primes and flip the sign of v.**
- **Time dilation:** $\Delta t = \gamma\Delta\tau$, where τ is proper time, measured in the frame where the clock is at rest.
- **Length contraction:** $L = L_0/\gamma$, along the motion only. A tilted rod has $\tan\theta' = \gamma\tan\theta$.
- **Simultaneity is relative:** $\Delta t' = \gamma(\Delta t - v\Delta x/c^2)$.
- **Interval** $s^2 = c^2\Delta t^2 - \Delta x^2$ is invariant. If $s^2 > 0$ (timelike), the events can be causally linked. If $s^2 < 0$ (spacelike), some frame sees them simultaneous, and the order can flip.
- **Velocity addition:** $u = \dfrac{u' + v}{1 + u'v/c^2}$.

## Muons, Doppler, twins
- **Muon problem:** time in Earth's frame is d/v, and the muon's proper time is that divided by γ. Survival is $N/N_0 = 2^{-\tau/T_{1/2}}$.
- **Doppler (radial):** $\nu = \nu_0\sqrt{\dfrac{1 + \beta}{1 - \beta}}$ for approach and the inverse for recession. **Transverse:** $\nu = \nu_0/\gamma$, which is pure time dilation.
- **Twins:** the traveller's time is the Earth time divided by γ. The asymmetry comes from the traveller changing frames.

## Energy and momentum
- $E = \gamma mc^2$, $\vec p = \gamma m\vec v$, $K = (\gamma - 1)mc^2$, $E^2 = p^2c^2 + m^2c^4$, and $v/c = pc/E$.
- Ratio of relativistic to classical ΔK for 0.6c → 0.8c is **2.98**.
- **Decay at rest** (A → B + massless): $pc = \dfrac{m_A^2 - m_B^2}{2m_A}c^2$.
- $m_ec^2 = 0.511$ MeV and $m_pc^2 = 938$ MeV.

# Sheet: Ch 6, Thermodynamics I: gases and the first law

## Gases (Focus 1)
- Perfect gas: pV = nRT. Dalton: $p_i = x_ip$.
- **Kinetic model:** $pV = \tfrac13Nm\langle v^2\rangle$, and $\langle E_k\rangle = \tfrac32kT$ depends only on T.
- **Speeds:** $v_{mp} = \sqrt{2RT/M}$ < $\bar v = \sqrt{8RT/\pi M}$ < $v_{rms} = \sqrt{3RT/M}$. N₂ at 300 K: $v_{rms} \approx 517$ m/s. O₂ at 25 °C: $v_{mp} = 394$ m/s. Speed goes as $1/\sqrt M$.
- **Mean free path** $\lambda = kT/(\sigma p)$, about 0.1 μm at 1 atm.
- **Real gases:** compression factor $Z = pV_m/RT$. Z < 1 means attractions dominate; Z > 1 means repulsions do. vdW: $p = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$.
- vdW constants: $T_c = 8a/27Rb$, $p_c = a/27b^2$, $V_c = 3b$, Boyle temperature $T_B = a/Rb$, inversion temperature $T_I = 2a/Rb$.

## First law (Focus 2)
- **ΔU = q + w**, with w the work done *on* the system, $w = -\int p_{ex}dV$.
- **Reversible isothermal** (perfect gas): $w = -nRT\ln(V_f/V_i)$, ΔU = 0, q = −w.
- U of a perfect gas depends only on T: $\Delta U = nC_V\Delta T$ for **any** path. Also $C_p - C_V = nR$. Monatomic: $C_V = \tfrac32R$, γ = 5/3. Diatomic: $C_V = \tfrac52R$, γ = 7/5.
- **H = U + pV**, so $\Delta H = q_p$. For reactions, $\Delta H = \Delta U + \Delta n_gRT$.
- **Reversible adiabatic:** q = 0, $pV^\gamma$ and $TV^{\gamma-1}$ are constant, and $w = \Delta U = C_V\Delta T$. The adiabat is steeper than the isotherm.
- **Free expansion** (perfect gas): q = w = ΔU = 0 and ΔT = 0.
- **Thermochemistry:** Hess's law. $\Delta_rH = \sum\Delta_fH(\text{products}) - \sum\Delta_fH(\text{reactants})$, or the reverse order with combustion enthalpies. Kirchhoff: $\Delta_rH(T_2) = \Delta_rH(T_1) + \Delta C_p\Delta T$.
- **Exact differentials:** dz = M dx + N dy is exact if $\partial M/\partial y = \partial N/\partial x$. dU and dH are exact; dq and dw are not.
- **Joule–Thomson:** enthalpy is constant, $\mu_{JT} = (\partial T/\partial p)_H$. μ > 0 means the gas cools on expansion (below $T_I$).

# Sheet: Ch 7, Thermodynamics II: entropy and free energy

## Second law and engines (3A)
- **Kelvin–Planck:** no engine converts heat entirely to work. **Clausius:** heat doesn't flow from cold to hot on its own. The two statements are equivalent.
- $dS = dq_{rev}/T$. Clausius inequality: $dS \ge dq/T$. For an isolated system, $\Delta S \ge 0$.
- **Carnot:** $\eta = 1 - T_C/T_H$. Fridge COP = $T_C/(T_H - T_C)$. Heat pump COP = $T_H/(T_H - T_C)$.
- **Otto:** $\eta = 1 - (V_B/V_A)^{\gamma-1}$. Ratio 8 with γ = 1.4 gives 0.56. It is below Carnot because heat enters across a range of temperatures.
- **Statistical:** $S = k\ln W$. Doubling the volume gives ΔS = nR ln 2.

## Entropy changes (3B)
- Perfect gas: $\Delta S = nR\ln(V_f/V_i) + nC_V\ln(T_f/T_i)$. Heating at constant p: $\Delta S = C_p\ln(T_f/T_i)$.
- Phase transition: $\Delta S = \Delta H_{trs}/T_{trs}$. **Trouton's rule** gives about 85 J/(K mol). Water is about 109 because of hydrogen bonding.
- **Free expansion:** $\Delta S_{gas} = nR\ln(V_f/V_i)$ and $\Delta S_{surr} = 0$, so ΔS_univ > 0. S is a state function, so use a reversible path to compute it.
- **Mixing hot and cold water:** add $mc\ln(T_f/T_i)$ for each part. The total is always > 0.

## Third law and free energies (3C–3F)
- **Third law:** S → 0 for a perfect crystal at T = 0. Debye: $C_p = aT^3$, so $S(T) = C_p(T)/3$ near 0 K.
- **A = U − TS** (constant T, V): $dA \le 0$, and $-\Delta A = w_{max}$. **G = H − TS** (constant T, p): $dG \le 0$, and $-\Delta G$ is the maximum non-expansion work.
- **Sign table:** ΔH < 0 and ΔS > 0 means always spontaneous. ΔH > 0 and ΔS < 0 means never. Otherwise the crossover is at $T^* = \Delta H/\Delta S$. Example: CaCO₃ decomposes above about 1110 K.
- $\Delta_rG° = \sum\Delta_fG°(\text{products}) - \sum\Delta_fG°(\text{reactants})$.
- **Fundamental equation:** dU = T dS − p dV and dG = V dp − S dT. Maxwell relation: $(\partial S/\partial V)_T = (\partial p/\partial T)_V$. Internal pressure: $\pi_T = T(\partial p/\partial T)_V - p$, which is $a/V_m^2$ for a vdW gas.

> ❌ Phase diagrams and Focus 4 are not in the endsem.

# Sheet: Ch 8, Particle properties of waves (Beiser 2)

- **Photon:** $E = h\nu = hc/\lambda$ and $p = h/\lambda$. Use hc = 1240 eV nm.
- **Photoelectric effect:** $K_{max} = h\nu - \phi = eV_0$. The threshold is $\nu_0 = \phi/h$. Intensity changes the number of electrons, not their energy. There is no time delay.
- **Blackbody radiation:**
  - **Stefan–Boltzmann:** $P/A = \sigma T^4$. A chip at 10 W/cm² is at 1150 K.
  - **Wien:** $\lambda_{max}T = 2.898\times10^{-3}$ m K, from $5(1 - e^{-x}) = x$ with x = 4.965. The frequency peak comes from $3(1 - e^{-x}) = x$ with x = 2.821.
  - **Planck:** $u(\nu) \propto \dfrac{\nu^3}{e^{h\nu/kT} - 1}$. Rayleigh–Jeans, which goes as $\nu^2T$, fails at high ν (the ultraviolet catastrophe).
- **X-rays:** the cutoff is $\lambda_{min} = hc/eV$, so a 50 kV tube gives 0.0248 nm. **Bragg:** $2d\sin\theta = n\lambda$, and the smallest angle is n = 1. KCl: d = 0.315 nm.
- **Compton:** $\Delta\lambda = \dfrac h{m_ec}(1 - \cos\theta)$ with $h/m_ec = 2.43$ pm. The maximum is 4.86 pm at 180°. It is negligible for visible light.
- **Pair production:** the threshold is 1.022 MeV, and it needs a nucleus to conserve momentum.
- **Gravitational redshift:** $\Delta\nu/\nu = gH/c^2$.

# Sheet: Ch 9, Wave properties of particles (Beiser 3)

- **de Broglie:** $\lambda = h/p = h/\gamma mv$. For an electron accelerated through V volts, $\lambda = 1.226/\sqrt V$ nm, so 100 V gives 0.123 nm. A thermal neutron is about 0.15 nm.
- In hydrogen's ground state, $\lambda = 2\pi a_0 = 0.33$ nm, because the orbit fits exactly one wavelength.
- **Phase and group velocity:** $v_p = \omega/k = c^2/v$ (> c, which is fine because it carries no information), and $v_g = d\omega/dk = v$, the particle's speed.
- **Davisson–Germer:** electron diffraction from nickel, $n\lambda = d\sin\phi$.
- **Particle in a box:** $E_n = \dfrac{n^2h^2}{8mL^2}$, and $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$ has n − 1 nodes. An electron in a 1 nm box has $E_1 = 0.376$ eV. **P(0 to L/n) in state n is exactly 1/n.** The ground-state energy is never zero.
- **Uncertainty:** $\Delta x\Delta p \ge \hbar/2$ and $\Delta E\Delta t \ge \hbar/2$.
  - Proton positioned to $10^{-11}$ m: Δv = 3.2 km/s, so its position after 1 s is uncertain by about 3.2 km.
  - Electron confined to 0.1 nm: Δv is about $6\times10^5$ m/s.
  - A level with a 10 ns lifetime has a width ΔE of about $3\times10^{-8}$ eV (natural linewidth).
- A 3-D box or cube has $E = E_0(n_x^2 + n_y^2 + n_z^2)$. Count the degeneracy before applying a Boltzmann factor.

# Sheet: Ch 10, Atomic structure (Beiser 4)

- **Bohr model:** $mvr = n\hbar$, $r_n = n^2a_0$ with $a_0 = 0.0529$ nm, and $E_n = -13.6/n^2$ eV.
- For a hydrogen-like ion of charge Z: $E_n = -13.6Z^2/n^2$ eV. He⁺ needs 54.4 eV to ionise.
- **Reduced mass:** $E \propto \mu$ and $r \propto 1/\mu$. Muonic atom (207 m_e): μ = 186 m_e, so ionisation takes 2.53 keV. Positronium has μ = m_e/2, so it takes 6.8 eV.
- **Spectral lines:** $\dfrac1\lambda = R\left(\dfrac1{n_f^2} - \dfrac1{n_i^2}\right)$ with $R = 1.097\times10^7$ m⁻¹.
  - Lyman ends on n = 1 (UV); Lyman α is 121.6 nm.
  - Balmer ends on n = 2 (visible); Hα, 3 → 2, is 656 nm.
  - Paschen ends on n = 3 (IR).
  - The ionisation limit is $1/\lambda = R/n_f^2$.
- **Correspondence principle:** at large n, the frequency of the n → n − 1 photon matches the classical orbital frequency.
- **Franck–Hertz:** current dips every 4.9 V in mercury vapour, which is direct proof of discrete energy levels.
- **Thermal Doppler broadening** (2024): a Maxwell distribution of $v_x$ gives a Gaussian line profile with $\sigma_\nu = \nu_0\sqrt{kT/mc^2}$.

> ❌ Rutherford scattering (appendix) is not in the endsem. ❌ Lasers are not in the endsem.

# Sheet: Ch 11, Quantum mechanics (Beiser 5)

- The Schrödinger equation is $i\hbar\,\partial_t\Psi = \hat H\Psi$. For stationary states, $\Psi = \psi e^{-iEt/\hbar}$ and $\hat H\psi = E\psi$.
- **A valid ψ** is single-valued, continuous, has a continuous ψ′ (where V is finite), and is normalisable. $|\psi|^2dx$ is a probability.
- **Operators:** $\hat p = -i\hbar\,\partial_x$ and $\hat E = i\hbar\,\partial_t$. The expectation value is $\langle A\rangle = \int\psi^*\hat A\psi\,dx$. For a real ψ that vanishes at the boundaries, ⟨p⟩ = 0.
- **Superposition of ψ₁ and ψ₂ in a box:** a measurement gives E₁ or E₂, each with probability ½, so ⟨E⟩ = (E₁ + E₂)/2 = 2.5E₁. The position oscillates as $\langle x\rangle = L/2 - \dfrac{16L}{9\pi^2}\cos\omega t$, with ω = (E₂ − E₁)/ħ.
- **Finite well:** ψ leaks into the walls as $e^{-\kappa x}$, so the energy levels sit lower than in an infinite well.
- **Tunnelling:** $T \approx e^{-2\kappa L}$ with $\kappa = \sqrt{2m(U - E)}/\hbar$. **Use U − E, not U.**
  - A 1 eV electron through a 10 eV barrier 0.5 nm wide: T is about $2\times10^{-7}$.
  - A proton under the same conditions: effectively zero.
  - Applications: STM, alpha decay.
- **Harmonic oscillator:** $E_n = (n + \tfrac12)\hbar\omega$, evenly spaced, with zero-point energy ħω/2. $\psi_0 \propto e^{-\alpha x^2/2}$ with α = mω/ħ.
  - $\langle x^2\rangle_0 = \hbar/2m\omega$, and ⟨V⟩ = ⟨T⟩ = E₀/2.
  - **Feynman trick:** $\int x^2e^{-\alpha x^2}dx = \tfrac{\sqrt\pi}2\alpha^{-3/2}$.
- **Postulates:** observables are Hermitian operators, a measurement gives an eigenvalue, and ψ collapses onto that eigenstate.

# Sheet: Ch 12, The hydrogen atom (Beiser 6.1–6.9)

- Separating variables gives $\psi = R_{nl}(r)\,\Theta_{lm}(\theta)\,\Phi_m(\phi)$ with $\Phi = e^{im_l\phi}$.
- **Quantum numbers:**
  - n = 1, 2, … fixes the energy $-13.6/n^2$ eV.
  - l = 0 … n − 1 fixes $L = \sqrt{l(l+1)}\hbar$.
  - $m_l = -l … l$ fixes $L_z = m_l\hbar$.
  - Each n has n² orbital states, or 2n² with spin.
- **Space quantisation:** $\cos\theta = m_l/\sqrt{l(l+1)}$. For l = 2: 35.3°, 65.9°, 90°, 114.1°, 144.7°. L can never point exactly along z.
- **Reading a ψ (asked every year):**
  - $e^{-r/na_0}$ gives n.
  - The angular factor gives l: $\cos\theta$ means l = 1, m = 0. $\sin\theta e^{\pm i\phi}$ means l = 1, m = ±1. $3\cos^2\theta - 1$ means l = 2, m = 0. $\sin\theta\cos\theta e^{\pm i\phi}$ means l = 2, m = ±1. $\sin^2\theta e^{\pm2i\phi}$ means l = 2, m = ±2.
  - $e^{im\phi}$ gives $m_l$, since $L_z = -i\hbar\,\partial_\phi$.
  - There are n − l − 1 radial nodes, so $r^le^{-r/na_0}$ with no polynomial means l = n − 1.
- **Probability density:** $P(r) = r^2|R|^2$. 1s peaks at $a_0$. 2p, with $R \propto re^{-r/2a_0}$, peaks at $4a_0$. Generally the l = n − 1 state peaks at $n^2a_0$, matching Bohr.
- **Selection rules:** Δl = ±1 and $\Delta m_l = 0, \pm1$, with any Δn, because the photon carries ħ. So 3d → 2p is allowed, but 3d → 2s and 3s → 2s are not.
- **2024 2-D box temperature:** the (2,2) level is non-degenerate, so $T = 6E_0/(k\ln2)$. **2025 cube:** $T = 2E_g/(k\ln6)$.

> ❌ The Zeeman effect (6.10), spin (7.1) and the periodic table (ch 7) are not in the endsem.
