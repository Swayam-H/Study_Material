# Practice: Endsem long-answer bank (5 marks each)

These follow the style of 2024 Part II, which had 10 questions of 5 marks each. Questions that used to say "derive" are recast as numbers and reasoning. Solutions are collapsed under each question. A sensible mix for a timed run is L1, L2, L4, L7, L8, L10, L11, L12, L14, L15 (about 100 min).


### Problem 1 [L1: Damped oscillator (Mechanics, Ch 2 / 3)]
A 0.50 kg mass on a spring (k = 50 N/m) has a damping force −bv with b = 2.0 kg/s. (a) Is the motion underdamped? (b) Find the damped angular frequency. (c) How long until the amplitude falls to 1/e? (d) What value of b would make it critically damped?

*Solution.* $\omega_0 = \sqrt{k/m} = 10$ rad/s and $\beta = b/2m = 2.0$ s⁻¹. (a) β < ω₀, so it is **underdamped**. (b) $\omega_1 = \sqrt{\omega_0^2 - \beta^2} = \sqrt{96} = \mathbf{9.80}$ rad/s. (c) The amplitude goes as $e^{-\beta t}$, so it reaches 1/e at $t = 1/\beta = \mathbf{0.50}$ s. (d) Critical damping needs β = ω₀, so $b = 2\sqrt{mk} = \mathbf{10}$ kg/s.

### Problem 2 [L2: Atwood machine by Lagrange (Ch 7)]
Masses m₁ = 3.0 kg and m₂ = 1.0 kg hang over a massless, frictionless pulley. Use the drop x of m₁ as the generalized coordinate. (a) Write $\mathcal L$. (b) Get the acceleration from the Euler–Lagrange equation. (c) Find the string tension from Newton's law for one mass. (d) Why didn't the tension appear in (b)?

*Solution.* (a) $T = \tfrac12(m_1+m_2)\dot x^2$ and $V = -m_1gx + m_2gx$, so $\mathcal L = \tfrac12(m_1+m_2)\dot x^2 + (m_1 - m_2)gx$. (b) $(m_1+m_2)\ddot x = (m_1-m_2)g$, so $\ddot x = g/2 = \mathbf{4.9}$ m/s². (c) For m₂: $T - m_2g = m_2\ddot x$, so $T = 1.0(9.8 + 4.9) = \mathbf{14.7}$ N, which matches $2m_1m_2g/(m_1+m_2)$. (d) It is a constraint force that does no net work. Lagrange's method uses a coordinate that already satisfies the constraint, so such forces drop out.

### Problem 3 [L3: Pendulum Hamiltonian (Ch 7)]
A simple pendulum has length 1.0 m and $\mathcal L = \tfrac12 ml^2\dot\theta^2 + mgl\cos\theta$. (a) Find $p_\theta$ and H. (b) Write Hamilton's equations. (c) Find the small-oscillation period. (d) Is H conserved, and what is it physically?

*Solution.* (a) $p_\theta = ml^2\dot\theta$ and $H = \dfrac{p_\theta^2}{2ml^2} - mgl\cos\theta$. (b) $\dot\theta = \partial H/\partial p_\theta = p_\theta/ml^2$ and $\dot p_\theta = -\partial H/\partial\theta = -mgl\sin\theta$. Combined, $\ddot\theta = -(g/l)\sin\theta$. (c) For small θ, $\sin\theta \approx \theta$, so $T = 2\pi\sqrt{l/g} = \mathbf{2.01}$ s. (d) Yes, because there is no explicit t. It is the total mechanical energy T + V.

### Problem 4 [L4: Comet orbit (Ch 8)]
A comet has perihelion 0.50 AU and aphelion 35 AU. Find (a) its semi-major axis and eccentricity, (b) its period, and (c) the ratio of its speeds at perihelion and aphelion. (d) Explain in one line why it moves fastest at perihelion.

*Solution.* (a) a = 17.75 AU and e = (35 − 0.5)/35.5 = **0.972**. (b) Kepler III in solar units gives $T = a^{3/2} = \mathbf{74.8}$ yr (Halley-like). (c) Angular momentum $l = mrv$ is the same at both ends, so $v_p/v_a = r_a/r_p = \mathbf{70}$. (d) Equal areas in equal times (l conserved) means a short radius needs a high speed. Equivalently, it has fallen deepest into the potential well.

### Problem 5 [L5: Vertical rocket launch (Ch 9.11)]
A 2.0 × 10⁴ kg rocket carries 1.5 × 10⁴ kg of fuel, burned at a constant rate over 60 s with exhaust speed 2500 m/s. Take g as constant and ignore drag. Find (a) the thrust, (b) the initial acceleration, and (c) the speed at burnout.

*Solution.* The burn rate is $|\dot m| = 1.5\times10^4/60 = 250$ kg/s. (a) Thrust $= u|\dot m| = \mathbf{6.25\times10^5}$ N. (b) $a_0 = F/m_0 - g = 31.25 - 9.8 = \mathbf{21.5}$ m/s². (c) $v = u\ln(m_0/m_f) - gt = 2500\ln4 - 9.8(60) = 3466 - 588 = \mathbf{2.88}$ km/s.

### Problem 6 [L6: Binary star (Ch 8, two-body problem)]
Two stars of 2M☉ and 1M☉ orbit each other in a circle with separation 1.0 AU. (a) Find the period. (b) Find each star's orbital radius about the centre of mass. (c) Find the reduced mass, and say what the two-body problem reduces to.

*Solution.* (a) Kepler III with the total mass: $T^2 = a^3/(M_1+M_2)$ in yr, AU, M☉, so $T = 1/\sqrt3 = \mathbf{0.577}$ yr. (b) $r_1 = aM_2/(M_1+M_2) = \mathbf{1/3}$ AU for the heavy star and $r_2 = \mathbf{2/3}$ AU. (c) $\mu = M_1M_2/(M_1+M_2) = \tfrac23M_☉$. The problem becomes one body of mass μ in the potential $-GM_1M_2/r$ of the relative coordinate, while the centre of mass moves freely.

### Problem 7 [L7: Relativistic Doppler (STR)]
(a) The Hα line (656.3 nm in the lab) from a galaxy is seen at 700.0 nm. Find the galaxy's speed. Is it approaching or receding? (b) A source emitting ν₀ moves at 0.60c perpendicular to the line of sight (2024 Part II Q3). What frequency is received, and why is there any shift at all?

*Solution.* (a) $\lambda/\lambda_0 = \sqrt{(1+\beta)/(1-\beta)} = 1.0666$, so $\beta = (r^2 - 1)/(r^2 + 1) = \mathbf{0.064}$ ($1.9\times10^4$ km/s), **receding** (redshift). (b) $\nu = \nu_0\sqrt{1-\beta^2} = \mathbf{0.80\,\nu_0}$. This is the transverse Doppler effect, which is pure time dilation: the moving source's clock ticks slowly. Classical physics predicts no shift here.

### Problem 8 [L8: Pion decay at rest (STR energy–momentum)]
π⁺ → μ⁺ + ν, with $m_\pi c^2 = 139.6$ MeV, $m_\mu c^2 = 105.7$ MeV and a massless neutrino. The pion is at rest. Find (a) the momenta, (b) the muon's kinetic energy and speed, and (c) the neutrino's energy.

*Solution.* The momenta are equal and opposite, and energy is conserved: $m_\pi c^2 = \sqrt{p^2c^2 + m_\mu^2c^4} + pc$. (a) $pc = \dfrac{m_\pi^2 - m_\mu^2}{2m_\pi}c^2 = \dfrac{19488 - 11172}{279.2} = \mathbf{29.8}$ MeV. (b) $E_\mu = \sqrt{105.7^2 + 29.8^2} = 109.8$ MeV, so $K = \mathbf{4.1}$ MeV and $\beta = pc/E = \mathbf{0.27}$. (c) $E_\nu = pc = \mathbf{29.8}$ MeV. Check: 109.8 + 29.8 = 139.6 ✓.

### Problem 9 [L9: Spacetime interval and simultaneity (STR)]
In frame S, event A is at (x = 0, t = 0) and event B is at (x = 600 m, t = 1.0 μs). (a) Classify the interval. (b) Can A cause B? (c) Find the speed of a frame in which A and B are simultaneous. (d) Is there a frame in which B happens before A?

*Solution.* (a) cΔt = 300 m < Δx = 600 m, so $s^2 = (c\Delta t)^2 - \Delta x^2 = -2.7\times10^5$ m² < 0: **spacelike**. (b) No. Light would need 2 μs. (c) $\Delta t' = \gamma(\Delta t - v\Delta x/c^2) = 0$ gives $v = c^2\Delta t/\Delta x = \mathbf{0.50c}$. (d) Yes, any frame with v > 0.5c. Time order is frame-dependent only for spacelike pairs, which is why causality is safe.

### Problem 10 [L10: Real gas: CO₂ (Thermo 1C)]
For CO₂, a = 3.640 L² bar mol⁻² and b = 0.04267 L mol⁻¹. One mole is in 0.500 L at 300 K. (a) Find p from the ideal and the vdW equations. (b) Find Z and interpret it. (c) Find the critical constants $T_c = 8a/27Rb$, $p_c = a/27b^2$, $V_c = 3b$. Can CO₂ be liquefied by compression at 300 K?

*Solution.* RT = 24.94 L bar/mol. (a) $p_{ideal} = 24.94/0.5 = \mathbf{49.9}$ bar. $p_{vdW} = \dfrac{24.94}{0.4573} - \dfrac{3.640}{0.25} = 54.5 - 14.6 = \mathbf{40.0}$ bar. (b) Z = pV_m/RT = 40.0/49.9 = **0.80** < 1, so attractions dominate. (c) $T_c = \mathbf{304}$ K, $p_c = \mathbf{74}$ bar, $V_c = 0.128$ L/mol. Since 300 K < $T_c$, yes, it can be liquefied by pressure alone (just barely).

### Problem 11 [L11: Gibbs energy and the third law (Thermo 3A–3E)]
(a) For CaCO₃(s) → CaO(s) + CO₂(g), $\Delta_rH° = +178.3$ kJ/mol, and the S° values (J K⁻¹ mol⁻¹) are CaCO₃ 92.9, CaO 39.8, CO₂ 213.7. Find $\Delta_rS°$, $\Delta_rG°$ at 298 K, and the temperature above which decomposition is spontaneous. (b) 1.0 kg of water at 80 °C is mixed with 1.0 kg at 20 °C in an insulated vessel (c = 4180 J kg⁻¹ K⁻¹). Find ΔS_total. (c) Near 0 K, a solid has $C_p = aT^3$ (Debye), and at 10 K, $C_p = 0.40$ J K⁻¹ mol⁻¹. Find $S_m(10\text{ K})$, and say which law fixes the reference.

*Solution.* (a) $\Delta S = 39.8 + 213.7 - 92.9 = \mathbf{+160.6}$ J/K. $\Delta G = 178.3 - 298(0.1606) = \mathbf{+130}$ kJ/mol, so it is not spontaneous at 298 K. It becomes spontaneous for $T > \Delta H/\Delta S = \mathbf{1110}$ K (about 840 °C, which is why lime kilns run hot). (b) $T_f = 50$ °C. $\Delta S = mc[\ln(323.15/353.15) + \ln(323.15/293.15)] = \mathbf{+36}$ J/K > 0 (irreversible). (c) $S = \int_0^T (aT^3/T)\,dT = aT^3/3 = C_p/3 = \mathbf{0.13}$ J K⁻¹ mol⁻¹. The **third law** sets S(0) = 0 for a perfect crystal.

### Problem 12 [L12: Superposition in a box (QM Ch 5)]
An electron in a box of width L = 0.50 nm has $\psi = \frac{1}{\sqrt2}(\psi_1 + \psi_2)$ at t = 0. (a) What energies can a measurement give, and with what probabilities? (b) Find ⟨E⟩ in eV. (c) Find ⟨p⟩, with a reason. (d) Find the probability of finding it in the left half at t = 0. (e) With what period does |ψ|² slosh back and forth?

*Solution.* $E_1 = h^2/8mL^2 = 1.51$ eV and $E_2 = 4E_1 = 6.02$ eV. (a) $E_1$ or $E_2$, each with **probability ½**. (b) $\langle E\rangle = (E_1 + E_2)/2 = 2.5E_1 = \mathbf{3.76}$ eV. (c) **⟨p⟩ = 0** at t = 0, because ψ is real and vanishes at the walls, so $\langle p\rangle = -i\hbar\int\psi\psi'dx = -\tfrac{i\hbar}{2}[\psi^2]_0^L = 0$. (d) $P = \tfrac12 + \int_0^{L/2}\psi_1\psi_2\,dx = \tfrac12 + \dfrac{4}{3\pi} = \mathbf{0.92}$. Here ψ₁ and ψ₂ have the same sign on the left and cancel on the right. (e) The cross term goes as $\cos[(E_2 - E_1)t/\hbar]$, so $T = h/(E_2 - E_1) = h/3E_1 = \mathbf{0.92}$ fs.

### Problem 13 [L13: Compton scattering with numbers (QM Ch 2)]
0.100 nm X-rays scatter from free electrons at 60°. Find (a) Δλ, (b) the scattered photon's energy, and (c) the recoil electron's kinetic energy. (d) Why is the effect negligible for visible light? (Use $h/m_ec = 2.43$ pm.)

*Solution.* (a) $\Delta\lambda = (h/m_ec)(1 - \cos60°) = \mathbf{1.21}$ pm. (b) $E = 1240/0.100$ eV = 12.40 keV, so $E' = 1240/0.10121 = \mathbf{12.25}$ keV. (c) $K = E - E' = \mathbf{\approx 149}$ eV. (d) Δλ is at most 4.9 pm, which is a fraction of about $10^{-5}$ of 500 nm and unmeasurable. It shows up only when λ is comparable to pm.

### Problem 14 [L14: Hydrogen 3d state (QM Ch 6.1–6.9)]
An electron in hydrogen is in a state with n = 3, l = 2. (a) List the possible $m_l$ and $L_z$ values, and give |L|. (b) Find the energy, and the largest and smallest angles between L and z. (c) To which lower states can it decay by a single photon? Give that photon's wavelength. (d) What is the shape (angular dependence) of the $m_l = 0$ state, roughly?

*Solution.* (a) $m_l = -2 \dots 2$, $L_z = m_l\hbar$, and $|L| = \sqrt6\hbar = 2.45\hbar$. (b) $E_3 = -1.51$ eV. $\cos\theta = m_l/\sqrt6$ gives a smallest angle of 35.3° and a largest of 144.7°. (c) Δl = ±1, so it can go only to l = 1. Below n = 3, that means **2p only** (3d→3p has ΔE ≈ 0 in pure Bohr theory). The photon has $1/\lambda = R(1/4 - 1/9)$, so $\lambda = \mathbf{656}$ nm (Hα, red). (d) $|Y_2^0|^2 \propto (3\cos^2\theta - 1)^2$: two lobes along ±z and a ring (torus) in the xy-plane, with nodal cones at θ = 54.7°.

### Problem 15 [L15: Tunnelling: electron vs proton (QM Ch 5)]
A 3.0 eV particle meets a 5.0 eV barrier 0.50 nm wide. Estimate T for (a) an electron and (b) a proton. (c) What does this say about why tunnelling matters for electrons (STM) and for alpha decay, but not for everyday objects?

*Solution.* $T \approx e^{-2\kappa L}$ with $\kappa = \sqrt{2m(U-E)}/\hbar$ and U − E = 2.0 eV. (a) Electron: κ = 7.24 × 10⁹ m⁻¹, 2κL = 7.24, so **T ≈ 7 × 10⁻⁴**. (b) Proton: κ is larger by $\sqrt{1836} = 42.9$, so 2κL = 310 and **T ≈ 10⁻¹³⁵**, which is zero in practice. (c) T falls exponentially with $\sqrt m\cdot L$. Light particles over sub-nm barriers tunnel readily: STM currents are sensitive to 0.01 nm changes in the gap. An alpha particle tunnels out because it hits the barrier about 10²¹ times per second, so even a tiny T gives a measurable rate. For macroscopic m and L, the exponent is astronomically large.
