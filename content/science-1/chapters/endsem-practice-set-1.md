# Practice: Endsem set 1, variants of repeated PYQs

A full 50-mark paper in the 2025 format. Every question is a variant of one that appeared in both the 2024 and 2025 endsems, which reused 19 of 20 questions.

**120 min, 50 marks, calculator allowed.** Solutions are collapsed under each question, so you can sit it as a paper.

Constants: $m_e = 9.1\times10^{-31}$ kg, $m_p = 1836\,m_e = 1.673\times10^{-27}$ kg, $h = 6.626\times10^{-34}$ J s, $k_B = 1.381\times10^{-23}$ J/K, $\sigma = 5.670\times10^{-8}$ W m⁻² K⁻⁴, $c = 3\times10^8$ m/s, $e = 1.602\times10^{-19}$ C, $R = 8.314$ J/(mol K), $\mu_B = 9.274\times10^{-24}$ J/T, $E_n = -13.6/n^2$ eV, $\int_{-\infty}^{\infty}e^{-\alpha x^2}dx = \sqrt{\pi/\alpha}$.

## Part I (17 × 2 marks)

### Problem 1 [Set 1 Q1 (2)]

A 0.20 kg ball is dropped from rest in still air. The drag force is $-bv$ with $b = 0.05$ kg/s. Find its terminal speed and the time it takes to reach 90% of it.

*Solution.* $m\dot v = mg - bv$, so $v(t) = v_t(1 - e^{-bt/m})$ with $v_t = mg/b = 0.2(9.8)/0.05 = \mathbf{39.2}$ m/s. 90% is reached when $e^{-bt/m} = 0.1$, so $t = (m/b)\ln10 = 4\times2.303 = \mathbf{9.2}$ s.

### Problem 2 [Set 1 Q2 (2)]

An electron moves at $2.0\times10^6$ m/s at 60° to a uniform field $B = 0.010$ T. Find the radius and the pitch of its helical path.

*Solution.* $v_\perp = v\sin60° = 1.73\times10^6$ m/s and $v_\parallel = v\cos60° = 1.0\times10^6$ m/s. $r = m v_\perp/(eB) = \mathbf{0.98}$ mm. $T = 2\pi m/(eB) = 3.57$ ns, so pitch $= v_\parallel T = \mathbf{3.6}$ mm.

### Problem 3 [Set 1 Q3 (2)]

A force speeds a particle up from 0.3c to 0.9c. Find the ratio of the change in kinetic energy in STR to the change predicted by classical mechanics.

*Solution.* $\gamma(0.9) = 2.294$ and $\gamma(0.3) = 1.048$, so $\Delta K_{rel} = 1.246\,mc^2$. $\Delta K_{cl} = \tfrac12(0.81 - 0.09)mc^2 = 0.36\,mc^2$. Ratio $= \mathbf{3.46}$. It is bigger than for 0.6c→0.8c (2.98) because γ grows steeply near c.

### Problem 4 [Set 1 Q4 (2)]

An electron's position is fixed to within $\Delta x = 1.0\times10^{-10}$ m (an atom's size). Estimate the minimum uncertainty in its velocity, and in its position 1 μs later.

*Solution.* $\Delta v \ge \hbar/(2m\Delta x) = 1.055\times10^{-34}/(2\cdot9.1\times10^{-31}\cdot10^{-10}) = \mathbf{5.8\times10^5}$ m/s. After 1 μs, $\Delta x \approx \Delta v\,t \approx \mathbf{0.58}$ m. An electron cannot be "localised" for long.

### Problem 5 [Set 1 Q5 (2)]

A negative pion ($m_\pi = 273\,m_e$) is captured by a proton to form a "pionic atom". Find its ionisation energy and its Bohr radius in units of $a_0$.

*Solution.* $\mu = \dfrac{273\cdot1836}{273+1836}m_e = 237.7\,m_e$. $E_I = 13.6\times237.7$ eV $= \mathbf{3.23}$ keV. Since $a \propto 1/\mu$, $a = a_0/237.7 = \mathbf{4.2\times10^{-3}\,a_0}$ (about 0.22 pm).

### Problem 6 [Set 1 Q6 (2)]

An electron of energy 2.0 eV meets a 6.0 eV potential barrier 0.30 nm wide. Estimate the transmission probability.

*Solution.* $U - E = 4.0$ eV, so $\kappa = \sqrt{2m(U-E)}/\hbar = 1.02\times10^{10}$ m⁻¹. $2\kappa L = 6.14$, so $T \approx e^{-2\kappa L} = \mathbf{2.1\times10^{-3}}$.

### Problem 7 [Set 1 Q7 (2)]

For the n = 0 harmonic-oscillator state $\psi_0 = (\alpha/\pi)^{1/4}e^{-\alpha x^2/2}$, with $\alpha = m\omega/\hbar$, find $\langle V\rangle = \tfrac12 m\omega^2\langle x^2\rangle$. What fraction of $E_0$ is it? (Hint: differentiate the Gaussian integral with respect to $\alpha$.)

*Solution.* $\int x^2e^{-\alpha x^2}dx = -\dfrac{d}{d\alpha}\sqrt{\pi/\alpha} = \dfrac{\sqrt\pi}{2}\alpha^{-3/2}$, so $\langle x^2\rangle = \sqrt{\alpha/\pi}\cdot\dfrac{\sqrt\pi}{2}\alpha^{-3/2} = \dfrac{1}{2\alpha} = \dfrac{\hbar}{2m\omega}$. Then $\langle V\rangle = \tfrac12 m\omega^2\cdot\dfrac{\hbar}{2m\omega} = \dfrac{\hbar\omega}{4} = \mathbf{\tfrac12 E_0}$. The other half is kinetic (virial theorem for the SHO).

### Problem 8 [Set 1 Q8 (2)]

An electron (spin magnetic moment $\mu_B$) sits in a field $B = 0.50$ T. Find the frequency and wavelength of the photon emitted when its spin flips from anti-parallel to parallel to $\vec B$ (the reverse of the 21 cm problem). ⚠ Spin is Beiser 7.1, but this question appeared in both past papers.

*Solution.* $\Delta E = 2\mu_BB = 9.27\times10^{-24}$ J $= 5.8\times10^{-5}$ eV. $f = \Delta E/h = \mathbf{14}$ GHz and $\lambda = c/f = \mathbf{2.1}$ cm (microwave).

### Problem 9 [Set 1 Q9 (2)]

For n = 3 in hydrogen, list every allowed $(l, m_l)$. How many states are there, including spin? Which quantity does each of $n$, $l$, $m_l$ fix?

*Solution.* $l = 0$: $m_l = 0$. $l = 1$: $m_l = -1, 0, 1$. $l = 2$: $m_l = -2 \dots 2$. That makes $n^2 = 9$ orbital states, or $2n^2 = \mathbf{18}$ with spin. $n$ fixes the energy, $l$ fixes $|\vec L| = \sqrt{l(l+1)}\hbar$, and $m_l$ fixes $L_z = m_l\hbar$.

### Problem 10 [Set 1 Q10 (2)]

State the selection rules for hydrogen. Which of these are allowed: 3d→2p, 3d→2s, 4p→1s, 3s→2s, 4f→3d?

*Solution.* $\Delta l = \pm1$, $\Delta m_l = 0, \pm1$, and $\Delta n$ can be anything. Allowed: 3d→2p, 4p→1s, 4f→3d. Forbidden: 3d→2s ($\Delta l = 2$) and 3s→2s ($\Delta l = 0$). The photon carries one unit of angular momentum.

### Problem 11 [Set 1 Q11 (2)]

For l = 3, find every allowed angle between $\vec L$ and the z-axis.

*Solution.* $\cos\theta = m_l/\sqrt{l(l+1)} = m_l/\sqrt{12}$, giving $\theta = $ **30°, 54.7°, 73.2°, 90°, 106.8°, 125.3°, 150°** for $m_l = 3 \dots -3$. L never lies along z, because $|m_l| < \sqrt{l(l+1)}$.

### Problem 12 [Set 1 Q12 (2)]

A particle is in the ground state of a box of width L. Find the probability that it is between x = 0 and x = L/4.

*Solution.* $P = \dfrac2L\displaystyle\int_0^{L/4}\sin^2\dfrac{\pi x}{L}dx = \dfrac14 - \dfrac{1}{2\pi}\sin\dfrac{\pi}{2} = 0.25 - 0.159 = \mathbf{0.091}$. This is less than 1/4 because ψ is small near the wall.

### Problem 13 [Set 1 Q13 (2)]

For a particle in a cube of side L in contact with a reservoir at temperature T, find T (in terms of the ground-state energy $E_g$) at which the particle is equally likely to be in the first excited level as in the ground level.

*Solution.* $E = E_0(n_x^2+n_y^2+n_z^2)$ with $E_0 = h^2/8mL^2$. Ground (111) is $3E_0 = E_g$ with $g = 1$. First excited (211, 121, 112) is $6E_0 = 2E_g$ with $g = 3$. Setting $3e^{-(2E_g - E_g)/kT} = 1$ gives $\mathbf{T = E_g/(k\ln3)}$.

### Problem 14 [Set 1 Q14 (2)]

Find the most probable speed of H₂ at 300 K. Explain in one line why Earth's atmosphere has almost no H₂, even though this speed is far below the 11.2 km/s escape speed.

*Solution.* $v_{mp} = \sqrt{2RT/M} = \sqrt{2(8.314)(300)/0.002016} = \mathbf{1.57}$ km/s. The Maxwell distribution has a long high-speed tail. Light H₂ has a large fraction of molecules above escape speed (especially in the hot upper atmosphere), and collisions keep refilling that tail, so H₂ leaks away over geological time.

### Problem 15 [Set 1 Q15 (2)]

A tungsten filament has a radiating area of 0.50 cm² and is at 3000 K. Treating it as a blackbody, find the power it radiates.

*Solution.* $P = \sigma AT^4 = 5.67\times10^{-8}\times0.5\times10^{-4}\times(3000)^4 = \mathbf{230}$ W.

### Problem 16 [Set 1 Q16 (2)]

Planck's law in wavelength is $u(\lambda) \propto \lambda^{-5}/(e^{hc/\lambda kT}-1)$. Give the equation for the peak wavelength in terms of $x = hc/\lambda kT$. With the root $x = 4.965$, find the Wien constant $\lambda_{max}T$.

*Solution.* Setting $du/d\lambda = 0$ gives $\mathbf{5(1 - e^{-x}) = x}$. $\lambda_{max}T = hc/(4.965k) = \mathbf{2.90\times10^{-3}}$ m K (Wien's law).

### Problem 17 [Set 1 Q17 (2)]

NaCl has plane spacing d = 0.282 nm. For 0.154 nm X-rays, find the first-order Bragg angle and the highest order that can be observed.

*Solution.* $2d\sin\theta = n\lambda$. For n = 1: $\sin\theta = 0.154/0.564 = 0.273$, so $\theta = \mathbf{15.8°}$. We need $\sin\theta \le 1$, so $n \le 2d/\lambda = 3.66$ and the highest order is $\mathbf{n = 3}$.

## Part II

### Problem 18 [Set 1 Q18]

**Otto cycle with numbers.** (7 marks) One mole of a diatomic ideal gas ($C_{V,m} = \tfrac52R$, $\gamma = 1.4$) runs an Otto cycle: A→B reversible adiabatic compression with $V_A/V_B = 8$, starting at $T_A = 300$ K; B→C constant-volume heating to $T_C = 1800$ K; C→D reversible adiabatic expansion back to $V_A$; D→A constant-volume cooling.

- (a) Sketch the p–V diagram and label the strokes. (1)
- (b) Find $T_B$ and $T_D$. (1)
- (c) Find the heat absorbed, the heat rejected, the net work, and the efficiency. Check the efficiency against $1 - r^{1-\gamma}$. (2)
- (d) Find $\Delta S_{sys}$ for each of the four steps and show that the total over the cycle is zero. (2)
- (e) Compare the efficiency with that of a Carnot engine between the same extreme temperatures, and explain in one line why it is lower. (1)

*Solution.*

- (a) On the p–V diagram: A (large V, low p) rises along an adiabat to B (small V). B→C is a vertical line up (ignition). C→D falls along an adiabat to large V. D→A is a vertical line down (exhaust). Work is the enclosed area, traced clockwise.
- (b) $TV^{\gamma-1} = $ const, so $T_B = 300\times8^{0.4} = \mathbf{689}$ K and $T_D = 1800/8^{0.4} = \mathbf{783}$ K.
- (c) $Q_{in} = C_V(T_C - T_B) = 20.79\times1111 = \mathbf{23.1}$ kJ. $Q_{out} = C_V(T_D - T_A) = \mathbf{10.0}$ kJ. $W = \mathbf{13.0}$ kJ. $\eta = 13.0/23.1 = \mathbf{0.565}$, which matches $1 - 8^{-0.4} = 0.565$ ✓.
- (d) A→B and C→D: $\Delta S = 0$ (reversible adiabatic). B→C: $C_V\ln(1800/689) = \mathbf{+19.95}$ J/K. D→A: $C_V\ln(300/783) = \mathbf{-19.95}$ J/K. The total is 0, as it must be for the state function S over a cycle. This works because $T_C/T_B = T_D/T_A = 2.61$.
- (e) $\eta_{Carnot} = 1 - 300/1800 = 0.833$. Otto heat goes in over a range of temperatures (689→1800 K) rather than all at $T_{max}$, and comes out over 783→300 K, so the average temperature gap is smaller.

### Problem 19 [Set 1 Q19]

**Lagrangian and Hamiltonian in polar coordinates.** (5 marks) A particle of mass m moves in a plane under an attractive central potential $V(r) = -k/r$. Its Lagrangian is $\mathcal L = \tfrac12 m(\dot r^2 + r^2\dot\theta^2) + k/r$.

- (a) Find $p_r$ and $p_\theta$. Which coordinate is cyclic, and what is conserved? (2)
- (b) Write the Hamiltonian H in terms of $r, p_r, p_\theta$. Is H the total energy? Is it conserved? (2)
- (c) Write the radial equation of motion and the effective potential $V_{eff}(r)$. (1)

*Solution.*

- (a) $p_r = m\dot r$ and $p_\theta = mr^2\dot\theta$. θ does not appear in $\mathcal L$ (cyclic), so $\dot p_\theta = 0$: **angular momentum $l = mr^2\dot\theta$ is conserved**.
- (b) $H = p_r\dot r + p_\theta\dot\theta - \mathcal L = \dfrac{p_r^2}{2m} + \dfrac{p_\theta^2}{2mr^2} - \dfrac kr$. Yes, it is T + V, because the coordinates are time-independent and V does not depend on velocity. It is conserved because $\partial H/\partial t = 0$.
- (c) $m\ddot r = \dfrac{l^2}{mr^3} - \dfrac{k}{r^2}$, so $V_{eff} = \dfrac{l^2}{2mr^2} - \dfrac kr$ (centrifugal barrier plus attraction).

### Problem 20 [Set 1 Q20]

**Reading a hydrogen wavefunction.** (4 marks) A hydrogen-atom wavefunction is $\psi(r,\theta,\phi) = C\,\dfrac{r}{a_0}\,e^{-r/2a_0}\cos\theta$.

- (a) Identify $n$, $l$, $m_l$, giving a reason for each. (2)
- (b) Give the energy, $|\vec L|$ and $L_z$. (1)
- (c) In which directions is the electron most likely and least likely to be found? (1)

*Solution.*

- (a) $e^{-r/2a_0}$ means $e^{-r/na_0}$ with $\mathbf{n = 2}$. $\cos\theta \propto Y_1^0$ gives $\mathbf{l = 1}$ (consistent with the factor $r^l$ and no radial node, $n - l - 1 = 0$). There is no $e^{im\phi}$ factor, so $\mathbf{m_l = 0}$. This is the $2p_z$ state.
- (b) $E = -13.6/4 = \mathbf{-3.4}$ eV, $|\vec L| = \sqrt2\hbar$, $L_z = 0$.
- (c) $|\psi|^2 \propto \cos^2\theta$, so it is largest along ±z (θ = 0, π) and zero in the xy-plane (θ = 90°, a nodal plane).

## If you missed

| If you missed | Revisit |
|---|---|
| 1–3 | study-docs 08 (Newtonian), 06 (STR) |
| 4–8 | 02–04 (QM 2–4) |
| 9–11, 20 | 05 (QM 5, hydrogen) |
| 12–13 | 04 (box, 3-D box) |
| 14–17 | 01 (blackbody, X-rays), kinetic theory notes |
| 18 | thermo notes 2E, 3A–3B |
| 19 | 09–10 (Lagrangian, central force) |
