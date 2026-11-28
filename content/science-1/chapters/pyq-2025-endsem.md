# Practice: 2025 endsem, in-syllabus questions with solutions

The Monsoon 2025 Science-1 endsem was 120 min and 50 marks: 17 short questions worth 2 each, then three longer questions worth 7, 5 and 4. Calculator allowed. **This is the format to expect this year.** Every question except the Otto cycle (Q18) was taken from the 2024 paper, so the solutions below match the 2024 page. They are repeated here so you can sit this paper on its own. Numbering is as in the original.

> ❌ **Left out (not in this year's syllabus):** Q8 (21 cm line, electron spin, Beiser 7.1) and Q10 (electron configuration of P, Beiser ch 7). Without them, the paper is worth 46 marks.

Constants given on the paper: $m_e = 9.1\times10^{-31}$ kg, $h = 6.626\times10^{-34}$ J s, $k_B = 1.381\times10^{-23}$ J/K, $\sigma = 5.670\times10^{-8}$ W m⁻² K⁻⁴, $N_A = 6.022\times10^{23}$, $c = 3\times10^8$ m/s, $\int_{-\infty}^{\infty}e^{-\alpha x^2}dx = \sqrt{\pi/\alpha}$, $E_n = -13.6/n^2$ eV.

## Part I (2 marks each)

### Problem 1 [2025 Q1]

Find the terminal velocity of a vertically falling rain drop (mass m) falling from rest and experiencing air resistance; the retarding force is proportional to velocity. Assume that evaporation is negligible and air is still (no turbulence).

*Solution.* $m\dot v = mg - kv$. When $\dot v = 0$, $\mathbf{v_t = mg/k}$. The full solution is $v(t) = v_t(1 - e^{-kt/m})$.

### Problem 2 [2025 Q2]

A charged particle (charge q) has velocity $\vec v_0$ at $t = t_0$. Show that when the magnetic field $\vec B = 1\hat z$ is present, the particle undergoes helical motion. What is the pitch of the helical path of this particle?

*Solution.* $m\dot{\vec v} = q\vec v\times\hat z$ gives $\dot v_z = 0$, $\dot v_x = (q/m)v_y$ and $\dot v_y = -(q/m)v_x$. So $v_z$ is constant, and $(v_x, v_y)$ rotate at $\omega = q/m$ with constant speed $v_\perp$: a circle of radius $mv_\perp/q$ in the xy-plane plus uniform drift along z, which is a **helix**. Pitch $= v_{0z}\cdot2\pi/\omega = \mathbf{2\pi mv_{0z}/q}$.

### Problem 3 [2025 Q3]

A force acting on a gold atom causes its velocity to change from 0.6c to 0.8c. Consider the change in its kinetic energy, in classical mechanics and in the special theory of relativity. Calculate the ratio of changes in KE (relativistic divided by classical).

*Solution.* $\Delta K_{rel} = (5/3 - 5/4)mc^2 = 0.4167\,mc^2$ and $\Delta K_{cl} = \tfrac12(0.64 - 0.36)mc^2 = 0.14\,mc^2$. Ratio $= \mathbf{2.98}$.

### Problem 4 [2025 Q4]

A scientific instrument company claims that its newly released microscope can position the proton with an accuracy of $\pm10^{-11}$ m. Find the uncertainty of the proton's position 1 second later.

*Solution.* $\Delta v \ge \hbar/(2m_p\Delta x) = 3.2\times10^3$ m/s, so $\Delta x(1\text{ s}) \approx \mathbf{3.2}$ km. Using the full width $2\times10^{-11}$ m halves this. State your convention.

### Problem 5 [2025 Q5]

The muon is an unstable elementary particle with a mass of $207m_e$. When this muon, with a negative charge of −e, is "captured" by a proton, it forms a "muonic" atom. Find the ionization energy of this muonic atom in eV.

*Solution.* $\mu = \dfrac{207\times1836}{2043}m_e = 186\,m_e$, so $E_I = 13.6\times186$ eV $= \mathbf{2.53}$ keV.

### Problem 6 [2025 Q6]

When an electron with an energy of 1.0 eV is incident on a barrier of 10.0 eV energy and 0.50 nm width, find (approximately) the transmission probability of this electron.

*Solution.* $\kappa = \sqrt{2m(9\text{ eV})}/\hbar = 1.54\times10^{10}$ m⁻¹, so $2\kappa L = 15.4$ and $T \approx e^{-2\kappa L} = \mathbf{2\times10^{-7}}$.

### Problem 7 [2025 Q7]

For a harmonic oscillator, find the expectation value of $x^2$ in the n = 0 state. (Hint: use Feynman's trick on the integral of a Gaussian function.)

*Solution.* $\psi_0 = (\alpha/\pi)^{1/4}e^{-\alpha x^2/2}$ with $\alpha = m\omega/\hbar$. Feynman's trick: $\int x^2e^{-\alpha x^2}dx = -\dfrac{d}{d\alpha}\sqrt{\pi/\alpha} = \dfrac{\sqrt\pi}2\alpha^{-3/2}$. So $\langle x^2\rangle = \dfrac1{2\alpha} = \mathbf{\dfrac\hbar{2m\omega}}$.

### Problem 9 [2025 Q9]

What is the physical significance of each quantum number associated with the electron in the hydrogen atom?

*Solution.* **n** fixes the energy, $E_n = -13.6/n^2$ eV. **l** fixes $|\vec L| = \sqrt{l(l+1)}\hbar$, with $l < n$. **$m_l$** fixes $L_z = m_l\hbar$, with $|m_l| \le l$ (space quantisation). **$m_s$** fixes the spin z-component, $\pm\hbar/2$.

### Problem 11 [2025 Q11]

For an electron in the hydrogen atom (excited state), find the value(s) of the angle between L and the z-axis for l = 2.

*Solution.* $\cos\theta = m_l/\sqrt6$, giving $\theta = $ **35.3°, 65.9°, 90°, 114.1°, 144.7°**.

### Problem 12 [2025 Q12]

Calculate the probability that a particle in a box L wide can be found between x = 0 and x = L/n when it is in the n-th state.

*Solution.* $P = \dfrac1n - \dfrac{\sin2\pi}{2n\pi} = \mathbf{\dfrac1n}$: exactly one of the n equal lobes.

### Problem 13 [2025 Q13]

For a particle in a cube of side L, at what temperature is the probability of finding the particle with energy equal to that of the second excited state equal to one half of its probability in the ground state? (Note: find T in terms of the ground-state energy $E_g$.)

*Solution.* $E = E_0(n_x^2 + n_y^2 + n_z^2)$. Ground (111) is $3E_0 = E_g$, with g = 1. First excited is $6E_0$ (g = 3). **Second excited is (221),(212),(122) at $9E_0 = 3E_g$, with g = 3.** Setting $3e^{-(3E_g - E_g)/kT} = \tfrac12$ gives $\mathbf{T = \dfrac{2E_g}{k\ln6}}$.

### Problem 14 [2025 Q14]

What is the most probable speed of an oxygen molecule in air at 25 °C (assume ideal gas)? Is it faster or slower than an aeroplane (500 km/h)?

*Solution.* $v_{mp} = \sqrt{2RT/M} = \mathbf{394}$ m/s, which is **faster** than the aeroplane's 139 m/s, by about 2.8 times.

### Problem 15 [2025 Q15]

Microprocessors in a computer produce heat at a rate of 10 W per square centimetre of surface area. At what temperature would a blackbody be at this radiance?

*Solution.* $T = (10^5/5.67\times10^{-8})^{1/4} = \mathbf{1.15\times10^3}$ K.

### Problem 16 [2025 Q16]

From Planck's radiation law for light intensity $u(\nu)$, find the equation satisfied by the peak $\nu_p$ (find the simplest algebraic expression that it satisfies).

*Solution.* $u(\nu) \propto \dfrac{\nu^3}{e^{h\nu/kT} - 1}$. Setting $du/d\nu = 0$ with $x = h\nu_p/kT$ gives $\mathbf{3(1 - e^{-x}) = x}$, whose root is $x = 2.821$, so $\nu_p = 2.821\,kT/h$. Note that $\nu_p \ne c/\lambda_p$, because the λ version gives $5(1 - e^{-x}) = x$.

### Problem 17 [2025 Q17]

The smallest angle of Bragg scattering in potassium chloride (KCl) is 28.4° for 0.30 nm X-rays. Find the distance between the atomic planes in KCl.

*Solution.* $d = \lambda/(2\sin\theta) = \mathbf{0.315}$ nm.

## Part II

### Problem 18 [2025 Q18 (7 marks)]

The Otto cycle is involved in the operation of an internal combustion engine. The cycle consists of (a) reversible adiabatic compression from A to B, (b) reversible constant-volume pressure increase from B to C caused by the combustion of a very small amount of fuel, (c) reversible adiabatic expansion from C to D, and (d) reversible constant-volume pressure decrease back to state A. Denote the pressure, volume and temperature at A by $p_A$, $V_A$, $T_A$, and likewise for B–D. Assume a perfect gas as the working substance, and use the perfect gas law and the p, V, T relations for adiabats.

- (a) Draw the p–V diagram for the Otto cycle. (1)
- (b) What is the efficiency of this cycle? (1)
- (c) Find an expression for the efficiency in terms of $V_A$ and $V_B$. (2)
- (d) Find expressions, in terms of $C_{V,m}$ and the temperatures, for the change in entropy (of the system and surroundings) for each step of the cycle. (2)

*Solution.*

- (a) Two adiabats joined by two verticals. A (large V, low p) rises along an adiabat to B (small V). B→C is a vertical rise. C→D falls along an adiabat back to $V_A$. D→A is a vertical drop. The work is the enclosed area, traced clockwise.
- (b) Heat enters only on B→C, $q_{in} = C_V(T_C - T_B)$, and leaves only on D→A, $q_{out} = C_V(T_D - T_A)$. So $\eta = 1 - \dfrac{T_D - T_A}{T_C - T_B}$.
- (c) The adiabats give $T_AV_A^{\gamma-1} = T_BV_B^{\gamma-1}$ and $T_DV_A^{\gamma-1} = T_CV_B^{\gamma-1}$ (since $V_D = V_A$ and $V_C = V_B$). Then $T_D - T_A = (T_C - T_B)(V_B/V_A)^{\gamma-1}$, so $\mathbf{\eta = 1 - (V_B/V_A)^{\gamma-1}}$. For example, $V_A/V_B = 8$ and γ = 1.4 give η = 0.56.
- (d) Per mole, A→B: $\Delta S_{sys} = 0$. B→C: $\Delta S_{sys} = C_{V,m}\ln(T_C/T_B)$. C→D: 0. D→A: $C_{V,m}\ln(T_A/T_D)$. Every step is reversible, so $\Delta S_{surr} = -\Delta S_{sys}$ for each. Since $T_C/T_B = T_D/T_A$, the two non-zero terms cancel and $\oint dS = 0$.

### Problem 19 [2025 Q19 (5 marks)]

Consider a single-particle Lagrangian given by $\mathcal L = -m\sqrt{c^2 - \vec u\cdot\vec u} - V(\vec r)$, where $\vec r$ is the position vector of the particle and $\vec u = d\vec r/dt$ is its velocity, and c is a constant. (a) Find the conjugate momentum $\vec p$, and hence calculate $\vec p\cdot\vec p$ in terms of $\vec u\cdot\vec u$. (2) (b) For this Lagrangian, find the Hamiltonian. (1) (c) Simplify to get a formula for H that looks like Einstein's energy–mass relation. (2)

*Solution.* This is done with the printed $\mathcal L$. The 2024 page does it with the intended $-mc\sqrt{\cdots}$, which gives literally $\gamma mc^2$.

(a) $\vec p = \dfrac{m\vec u}{\sqrt{c^2 - u^2}}$, so $p^2 = \dfrac{m^2u^2}{c^2 - u^2}$.

(b) $H = \vec p\cdot\vec u - \mathcal L = \dfrac{mu^2}{\sqrt{c^2 - u^2}} + m\sqrt{c^2 - u^2} + V = \dfrac{mc^2}{\sqrt{c^2 - u^2}} + V$.

(c) $p^2c^2 + m^2c^2 = \dfrac{m^2c^4}{c^2 - u^2}$, so $\mathbf{H = \sqrt{p^2c^2 + m^2c^2} + V}$. Writing $m = Mc$ (the intended normalisation), this becomes $H = \sqrt{p^2c^2 + M^2c^4} + V = \gamma Mc^2 + V$.

### Problem 20 [2025 Q20 (4 marks)]

For the hydrogen atom, it is given that the wavefunction is $\psi(r,\theta,\phi) \propto r^2e^{-r/3a_0}\sin\theta\cos\theta\,e^{+2i\phi}$. Find the quantum numbers associated with this wavefunction.

*Solution.* $L_z = -i\hbar\,\partial_\phi$ gives $+2\hbar$, so $\mathbf{m_l = 2}$. The power $r^2 = r^l$ with no radial node gives $\mathbf{l = 2}$. $e^{-r/3a_0} = e^{-r/na_0}$ gives $\mathbf{n = 3}$, consistent with n − l − 1 = 0 nodes. So $E = -13.6/9 = -1.51$ eV, $|\vec L| = \sqrt6\hbar$, $L_z = 2\hbar$.

**A catch worth spotting:** the true $Y_2^{\pm2} \propto \sin^2\theta\,e^{\pm2i\phi}$, while $\sin\theta\cos\theta$ belongs with $e^{\pm i\phi}$ ($Y_2^{\pm1}$). As printed, the angular part is not an exact eigenfunction. The intended answer is still n = 3, l = 2, and $m_l = 2$ read from $e^{2i\phi}$. Mention the inconsistency in one line if you get this question.
