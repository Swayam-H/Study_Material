# Practice: 2024 endsem, in-syllabus questions with solutions

The Monsoon 2024 Science-1 endsem was 180 min and 100 marks: Part I had 25 short questions worth 2 each, and Part II had 10 long questions worth 5 each. Calculator allowed. This page reproduces the questions that fall within **this year's syllabus**, numbered as in the original paper. The solutions are worked fresh, and where the handwritten key that circulated gets something wrong, the solution says so.

> ❌ **Left out (not in this year's syllabus):** Part I Q15 (21 cm line, electron spin, Beiser 7.1), Q17 (electron configuration of P, Beiser ch 7), and Part II Q10 (electrons as fermions in a 3-D box, Fermi energy).

Constants given on the paper: $m_e = 9.1\times10^{-31}$ kg, $h = 6.626\times10^{-34}$ J s, $k_B = 1.381\times10^{-23}$ J/K, $\sigma = 5.670\times10^{-8}$ W m⁻² K⁻⁴, $N_A = 6.022\times10^{23}$, $c = 3\times10^8$ m/s, $\int_{-\infty}^{\infty}e^{-ax^2}dx = \sqrt{\pi/a}$.

## Part I (2 marks each)

### Problem 1 [2024 Part I Q1]

A particle has an external force given by $\vec F(x,y,z) = (ze^{-x},\ \ln z,\ y/z)$ and moves from $\vec r_0$ at $t = t_0$ to $\vec r_1$ at $t = t_1$. Is the change in kinetic energy independent of the path taken? If yes, find the potential. If no, why?

*Solution.* ΔKE equals the work done, which is path-independent only if $\nabla\times\vec F = 0$. The x-component is $\partial_yF_z - \partial_zF_y = 1/z - 1/z = 0$, but the y-component is $\partial_zF_x - \partial_xF_z = e^{-x} - 0 \ne 0$. So **F is not conservative, no potential exists, and ΔKE depends on the path.**

### Problem 2 [2024 Part I Q2]

A block is on an incline plane. If the coefficient of friction is 0.3, find the angle of the incline that will have the block start sliding if it was initially at rest.

*Solution.* The block slides when $mg\sin\theta > \mu mg\cos\theta$, that is when $\tan\theta > \mu$. So $\theta = \tan^{-1}0.3 = \mathbf{16.7°}$ (the key's "15°" is a rounding slip).

### Problem 3 [2024 Part I Q3]

Find the terminal velocity of a vertically falling rain drop (mass m) falling from rest and experiencing air resistance; the retarding force is proportional to velocity. Assume that evaporation is negligible and air is still (no turbulence).

*Solution.* $m\dot v = mg - kv$. Terminal velocity is reached when $\dot v = 0$, so $\mathbf{v_t = mg/k}$. The full solution is $v(t) = v_t(1 - e^{-kt/m})$.

### Problem 4 [2024 Part I Q4]

A pulley with two masses suspended from light string at each end ($m_1$ and $m_2$) is hung in an elevator. If the elevator is moving vertically up with acceleration α, find the tension in the string (on which the masses are suspended).

*Solution.* In the elevator frame, the effective gravity is $g_{eff} = g + \alpha$. The Atwood result with $g \to g + \alpha$ gives $\mathbf{T = \dfrac{2m_1m_2(g+\alpha)}{m_1+m_2}}$.

### Problem 5 [2024 Part I Q5]

A charged particle (charge q) has velocity $\vec v_0$ at $t = t_0$. It is known (question in Quiz-2) that when magnetic field $\vec B = 1\hat z$ is present, the particle undergoes helical motion. What is the pitch of the helical path of this particle?

*Solution.* $\vec F = q\vec v\times\vec B$ has no z-component, so $v_z = v_{0z}$ stays constant, while $(v_x, v_y)$ go round a circle with period $T = 2\pi m/(qB)$. With B = 1, the pitch is $v_{0z}T = \mathbf{2\pi m v_{0z}/q}$.

### Problem 6 [2024 Part I Q6]

Write the inverse Lorentz transforms.

*Solution.* With S′ moving at +v along x relative to S, and $\gamma = 1/\sqrt{1 - v^2/c^2}$: $x = \gamma(x' + vt')$, $y = y'$, $z = z'$, $t = \gamma(t' + vx'/c^2)$.

### Problem 7 [2024 Part I Q7]

A muon detector located on top of a 2 km (above sea level) mountain counts the number of muons travelling at a speed of 0.98c to be 1000 in one hour. This detector is moved to sea level and the number of muons at that speed measured over a one-hour interval is found to be 542. What is the half-life of the muon (in its rest frame)?

*Solution.* Earth-frame flight time: $t = 2000/(0.98\times3\times10^8) = 6.80$ μs. Muon proper time: $\tau = t\sqrt{1 - 0.98^2} = 6.80\times0.199 = 1.35$ μs. The survival fraction 0.542 equals $2^{-\tau/T_{1/2}}$, so $T_{1/2} = 1.35/\log_2(1/0.542) = \mathbf{1.53}$ μs. The key takes 542 ≈ 500 (exactly one half-life) and gets 1.35 μs. The exact log is better.

### Problem 8 [2024 Part I Q8]

A rod makes an angle θ with the x-axis in the rest frame of the rod. What will be the angle the rod makes in a frame that moves with velocity v along the x-axis?

*Solution.* Only the x-projection contracts: $L_x' = L\cos\theta\sqrt{1 - v^2/c^2}$ and $L_y' = L\sin\theta$. So $\mathbf{\tan\theta' = \gamma\tan\theta}$. The rod looks steeper.

### Problem 9 [2024 Part I Q9]

A force acting on a gold atom causes its velocity to change from 0.6c to 0.8c. Consider the change in its kinetic energy, in classical mechanics and special theory of relativity. Calculate the ratio of changes in KE (relativistic divided by classical).

*Solution.* $\gamma(0.8) = 5/3$ and $\gamma(0.6) = 5/4$, so $\Delta K_{rel} = (5/3 - 5/4)mc^2 = 0.4167\,mc^2$. $\Delta K_{cl} = \tfrac12(0.64 - 0.36)mc^2 = 0.14\,mc^2$. Ratio $= \mathbf{2.98}$.

### Problem 10 [2024 Part I Q10]

Find the de Broglie wavelength of an electron in the ground state of the hydrogen atom.

*Solution.* Bohr's condition $n\lambda = 2\pi r_n$ with n = 1 gives $\lambda = 2\pi a_0$, where $a_0 = 4\pi\epsilon_0\hbar^2/(me^2)$. Numerically, $\lambda = 2\pi\times0.0529$ nm $= \mathbf{0.332}$ nm.

### Problem 11 [2024 Part I Q11]

A scientific instrument company claims that its newly released microscope can position the proton with an accuracy of $\pm10^{-11}$ m. Find the uncertainty of the proton's position 1 second later.

*Solution.* $\Delta v \ge \hbar/(2m_p\Delta x) = 1.055\times10^{-34}/(2\times1.67\times10^{-27}\times10^{-11}) = 3.2\times10^3$ m/s. After 1 s, $\Delta x \approx \Delta v\cdot t \approx \mathbf{3.2}$ km. Taking $\Delta x = 2\times10^{-11}$ m (the full ± width) halves this.

### Problem 12 [2024 Part I Q12]

The muon is an unstable elementary particle with a mass of $207m_e$. When this muon, with a negative charge of −e, is "captured" by a proton, it forms a "muonic" atom. Find the ionization energy of this muonic atom in eV.

*Solution.* $E_n \propto \mu$, the reduced mass: $\mu = \dfrac{207\times1836}{207 + 1836}m_e = 186\,m_e$. So $E_I = 13.6\times186$ eV $= \mathbf{2.53}$ keV.

### Problem 13 [2024 Part I Q13]

When an electron with an energy of 1.0 eV is incident on a barrier of 10.0 eV energy and 0.50 nm width, find the transmission probability of this electron.

*Solution.* $\kappa = \sqrt{2m(U - E)}/\hbar = \sqrt{2(9.1\times10^{-31})(9\times1.6\times10^{-19})}/1.055\times10^{-34} = 1.54\times10^{10}$ m⁻¹. $2\kappa L = 15.4$, so $T \approx e^{-2\kappa L} = \mathbf{2\times10^{-7}}$. The key used U instead of U − E.

### Problem 14 [2024 Part I Q14]

For a harmonic oscillator, find the expectation value of $x^2$ in the n = 0 state.

*Solution.* $\psi_0 = (\alpha/\pi)^{1/4}e^{-\alpha x^2/2}$ with $\alpha = m\omega/\hbar$. Differentiating the given integral: $\int x^2e^{-\alpha x^2}dx = -\dfrac{d}{d\alpha}\sqrt{\pi/\alpha} = \dfrac{\sqrt\pi}{2}\alpha^{-3/2}$. So $\langle x^2\rangle = \sqrt{\alpha/\pi}\cdot\dfrac{\sqrt\pi}{2}\alpha^{-3/2} = \dfrac1{2\alpha} = \mathbf{\dfrac{\hbar}{2m\omega}}$.

### Problem 16 [2024 Part I Q16]

What is the physical significance of each quantum number associated with the electron in the hydrogen atom?

*Solution.* **n** (principal) fixes the energy, $E_n = -13.6/n^2$ eV. **l** (orbital) fixes the magnitude of the orbital angular momentum, $L = \sqrt{l(l+1)}\hbar$, with $l = 0 \dots n-1$. **$m_l$** (magnetic) fixes its z-component, $L_z = m_l\hbar$, with $|m_l| \le l$ (space quantisation). **$m_s$** fixes the spin z-component, $\pm\hbar/2$.

### Problem 18 [2024 Part I Q18]

For an electron in the hydrogen atom, find the value(s) of the angle between L and the z-axis for l = 2.

*Solution.* $\cos\theta = m_l/\sqrt{l(l+1)} = m_l/\sqrt6$. For $m_l = 2, 1, 0, -1, -2$: $\theta = $ **35.3°, 65.9°, 90°, 114.1°, 144.7°**.

### Problem 19 [2024 Part I Q19]

For an electron in the hydrogen atom, what are the allowed transitions?

*Solution.* Electric-dipole selection rules: $\mathbf{\Delta l = \pm1}$ and $\mathbf{\Delta m_l = 0, \pm1}$, with any Δn. The photon carries one unit of angular momentum.

### Problem 20 [2024 Part I Q20]

What is the probability that a particle in a box L wide can be found between x = 0 and x = L/n when it is in the n-th state?

*Solution.* $P = \dfrac2L\displaystyle\int_0^{L/n}\sin^2\dfrac{n\pi x}{L}dx = \dfrac1n - \dfrac{\sin2\pi}{2n\pi} = \mathbf{\dfrac1n}$. The interval covers exactly one of the n identical lobes.

### Problem 21 [2024 Part I Q21]

For a particle in a square of side L, at what temperature is the probability of finding the particle in its *second* excited state equal to one half of its probability in the ground state?

*Solution.* $E = E_0(n_x^2 + n_y^2)$ with $E_0 = h^2/8mL^2$. The levels are (1,1) at $2E_0$, then (1,2),(2,1) at $5E_0$ (2-fold), then **(2,2) at $8E_0$ (non-degenerate)**. Setting $e^{-(8-2)E_0/kT} = \tfrac12$ gives $\mathbf{T = \dfrac{6E_0}{k\ln2} = \dfrac{3h^2}{4mL^2k\ln2}}$. The key treats the second excited level as 2-fold and gets $\ln4$ instead of $\ln2$.

### Problem 22 [2024 Part I Q22]

What is the most probable speed of an oxygen molecule in air at 25 °C (assume ideal gas)? Is it faster or slower than an aeroplane (500 km/h)?

*Solution.* $v_{mp} = \sqrt{2k_BT/m} = \sqrt{2RT/M} = \sqrt{2(8.314)(298)/0.032} = \mathbf{394}$ m/s. That is **faster**, about 2.8 times the aeroplane's 139 m/s.

### Problem 23 [2024 Part I Q23]

Microprocessors in a computer produce heat at a rate of 10 W per square centimetre of surface area. At what temperature would a blackbody be at this radiance?

*Solution.* $\sigma T^4 = 10\text{ W/cm}^2 = 10^5$ W/m², so $T = (10^5/5.67\times10^{-8})^{1/4} = \mathbf{1.15\times10^3}$ K. (The key's 1328 K is an arithmetic slip.)

### Problem 24 [2024 Part I Q24]

From Planck's radiation law for $u(\lambda)$, find the equation satisfied by the peak wavelength $\lambda_p$.

*Solution.* $u(\lambda) \propto \dfrac{\lambda^{-5}}{e^{hc/\lambda kT} - 1}$. Setting $du/d\lambda = 0$ with $x = hc/\lambda_pkT$ gives $\mathbf{5(1 - e^{-x}) = x}$, whose root is $x = 4.965$. That gives Wien's law, $\lambda_pT = 2.90\times10^{-3}$ m K.

### Problem 25 [2024 Part I Q25]

The smallest angle of Bragg scattering in potassium chloride (KCl) is 28.4° for 0.30 nm X-rays. Find the distance between the atomic planes in KCl.

*Solution.* The smallest angle is first order: $d = \lambda/(2\sin\theta) = 0.30/(2\sin28.4°) = \mathbf{0.315}$ nm.

## Part II (5 marks each)

### Problem 26 [2024 Part II Q1]

A damped oscillator is defined as a modified simple harmonic oscillator; the modification is an additional damping force that is proportional to velocity but opposite to the direction of motion (the proportionality constant is b > 0). Find the relation between b, m and k for which the oscillator still has oscillatory motion about the equilibrium position, and find the frequency of the particle hitting the equilibrium position x = 0.

> ⚠ Damped oscillations are Marion ch 3. They are in your lecture notes, so this is kept.

*Solution.* $m\ddot x + b\dot x + kx = 0$. Trying $x = e^{\lambda t}$ gives $\lambda = -\beta \pm \sqrt{\beta^2 - \omega_0^2}$, with $\beta = b/2m$ and $\omega_0^2 = k/m$. The motion oscillates when $\beta < \omega_0$, that is when $\mathbf{b^2 < 4mk}$. Then $x = Ae^{-\beta t}\cos(\omega_1t - \delta)$ with $\mathbf{\omega_1 = \sqrt{k/m - b^2/4m^2}}$. It crosses x = 0 twice per period, so it hits the equilibrium position $2\cdot\omega_1/2\pi = \omega_1/\pi$ times per second.

### Problem 27 [2024 Part II Q2]

Consider a single-particle Lagrangian given by $\mathcal L = -mc\sqrt{c^2 - \vec u\cdot\vec u} - V(\vec r)$, where $\vec r$ is the position vector of the particle and $\vec u = d\vec r/dt$ is its velocity. (a) Find the conjugate momentum $\vec p$, and hence calculate $\vec p\cdot\vec p$ in terms of $\vec u\cdot\vec u$. (b) For this Lagrangian, find the Hamiltonian. (c) Simplify to get a formula for H that looks like Einstein's energy–mass relation.

(The printed paper has $-m\sqrt{c^2 - u^2}$. The key notes that the intended form has the extra factor c, as here.)

*Solution.* (a) $\vec p = \partial\mathcal L/\partial\vec u = \dfrac{mc\,\vec u}{\sqrt{c^2 - u^2}} = \gamma m\vec u$, so $p^2 = \dfrac{m^2c^2u^2}{c^2 - u^2}$. (b) $H = \vec p\cdot\vec u - \mathcal L = \dfrac{mcu^2}{\sqrt{c^2 - u^2}} + mc\sqrt{c^2 - u^2} + V = \dfrac{mc^3}{\sqrt{c^2 - u^2}} + V = \gamma mc^2 + V$. (c) $p^2c^2 + m^2c^4 = m^2c^4\left(\dfrac{u^2}{c^2 - u^2} + 1\right) = \dfrac{m^2c^6}{c^2 - u^2} = (\gamma mc^2)^2$, so $\mathbf{H = \sqrt{p^2c^2 + m^2c^4} + V}$. If you use the printed $\mathcal L$ (no factor c), you get the same algebra with $m \to m/c$.

### Problem 28 [2024 Part II Q3]

Light of frequency $\nu_0$ (in the rest frame of the source) is received on a spaceship located a very large distance away, which notes that the source is moving perpendicular to the line of sight with a speed of 0.6c. What is the apparent frequency of light on the spaceship?

*Solution.* With no radial motion, only time dilation of the source's clock remains (transverse Doppler, as in Beiser): $\nu = \nu_0\sqrt{1 - v^2/c^2} = \mathbf{0.8\,\nu_0}$. Classical physics predicts no shift here.

### Problem 29 [2024 Part II Q4]

A uniform rope of total length 2a hangs in equilibrium over a smooth nail. A very small impulse causes the rope to slowly roll off the nail. Assume the rope does not lift off the nail and is in free fall. Find the velocity of the rope as it just clears the nail using (a) the principle of conservation of energy and (b) forces and Newton's second law.

*Solution.* Let the mass be M, so λ = M/2a. Let the sides have lengths a + x and a − x, measured downward from the nail.

(a) PE $= -\lambda g\left[\tfrac{(a+x)^2}{2} + \tfrac{(a-x)^2}{2}\right] = -\lambda g(a^2 + x^2)$. Every point moves at the same speed v, so $\tfrac12Mv^2 = \lambda gx^2$, which gives $v^2 = gx^2/a$. The rope clears the nail at x = a, so $\mathbf{v = \sqrt{ga}}$.

(b) The net force is the weight of the extra length 2x: $M\ddot x = 2\lambda gx = (Mg/a)x$, so $\ddot x = (g/a)x$. Using $\ddot x = v\,dv/dx$: $v^2 = (g/a)(x^2 - x_0^2)$, and with $x_0 \to 0$ this gives $v = \sqrt{ga}$ at x = a ✓.

### Problem 30 [2024 Part II Q5]

A hollow cylinder of radius R is lying on its curved edge on a horizontal plane; assume that it is fixed. Another small cylinder of radius r rolls without slipping inside it. Find the frequency of oscillation.

*Solution.* Take the small cylinder to be solid ($I = \tfrac12mr^2$), and let θ be the angle of its centre from the bottom. Its centre moves at $(R - r)\dot\theta$, and rolling without slipping gives a spin rate $\omega = (R - r)\dot\theta/r$. Then $T = \tfrac12m(R - r)^2\dot\theta^2 + \tfrac12\cdot\tfrac12mr^2\omega^2 = \tfrac34m(R - r)^2\dot\theta^2$ and $V = -mg(R - r)\cos\theta$. The Euler–Lagrange equation is $\tfrac32(R - r)\ddot\theta = -g\sin\theta$, so for small θ, $\mathbf{\omega_{osc} = \sqrt{\dfrac{2g}{3(R - r)}}}$ and $f = \omega_{osc}/2\pi$. For a thin-walled small cylinder ($I = mr^2$), $\omega_{osc} = \sqrt{g/2(R - r)}$.

### Problem 31 [2024 Part II Q6]

Light of wavelength λ scatters off an electron. When the scattering angle is θ, the scattered light has wavelength λ + Δλ. Find the relation between Δλ, λ, the scattering angle θ (and any other universal constants) in this experiment. (Asked as a derivation in 2024. Learn the result and the four steps.)

*Solution.* **$\Delta\lambda = \dfrac{h}{m_ec}(1 - \cos\theta)$**, independent of λ, with $h/m_ec = 2.43$ pm. The steps: (1) the photon has $E = hc/\lambda$ and $p = h/\lambda$, and the electron starts at rest; (2) conserve momentum along and across the incident direction; (3) conserve energy using the relativistic $E_e^2 = p_e^2c^2 + m^2c^4$; (4) eliminate the electron's recoil angle and momentum.

### Problem 32 [2024 Part II Q7]

A gas of hydrogen atoms is at temperature T. The (n = 2) → (n = 1) line photon will be seen to have different frequencies due to the Doppler shift by a fixed observer (detector). Find the distribution of frequencies (this broadening of a spectral line is called thermal broadening). (You may simplify by assuming that only the radial Doppler shift exists, neglecting the transverse Doppler shift.)

*Solution.* $\nu_0 = \tfrac34(13.6\text{ eV})/h = 2.47\times10^{15}$ Hz (Lyman α, 121.6 nm). Since v ≪ c, the radial Doppler shift is $\nu = \nu_0(1 + v_x/c)$, where $v_x$ is the velocity component along the line of sight. The Maxwell–Boltzmann distribution of one component is $f(v_x) \propto e^{-mv_x^2/2kT}$. Substituting $v_x = c(\nu - \nu_0)/\nu_0$:

$$P(\nu) \propto \exp\left[-\frac{mc^2(\nu - \nu_0)^2}{2kT\nu_0^2}\right]$$

This is a **Gaussian** centred on $\nu_0$, with $\sigma_\nu = \nu_0\sqrt{kT/mc^2}$ and FWHM $= 2\nu_0\sqrt{2\ln2\,kT/mc^2}$. At 300 K, $\sigma_\nu/\nu_0 \approx 5\times10^{-6}$. Hotter or lighter atoms give broader lines.

### Problem 33 [2024 Part II Q8]

If $\psi(r,\theta,\phi)$ given below is a solution of the hydrogen atom, find the quantum numbers for this wavefunction using the hydrogen-atom Hamiltonian: $\psi = C\,re^{-r/(2a)}\sin\theta\,e^{-i\phi}$, where C and a are constants and $i = \sqrt{-1}$.

*Solution.* **Azimuthal part:** $L_z = -i\hbar\,\partial_\phi$ acting on $e^{-i\phi}$ gives $-\hbar$, so $\mathbf{m_l = -1}$. **Angular part:** $\sin\theta\,e^{-i\phi} \propto Y_1^{-1}$, and $L^2\psi = 2\hbar^2\psi$, so $\mathbf{l = 1}$. **Radial part:** substituting $R = re^{-r/2a}$ into the radial equation with l = 1 works only if $a = a_0$, and it gives $E = -13.6/4$ eV, so $\mathbf{n = 2}$. Quick check: $e^{-r/na_0}$ gives n = 2, and $r^l$ with no radial node gives n − l − 1 = 0. This is the 2p state with $m_l = -1$.

### Problem 34 [2024 Part II Q9]

For the particle in a 1-D box, write the wavefunction that is a 50/50 superposition of n = 1 and n = 2. For the wavefunction you have written down, calculate the expectation values of (a) position, (b) momentum, (c) energy.

*Solution.* $\Psi = \tfrac1{\sqrt2}\left(\psi_1e^{-iE_1t/\hbar} + \psi_2e^{-iE_2t/\hbar}\right)$, where $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$ and $\omega = (E_2 - E_1)/\hbar = 3\pi^2\hbar/2mL^2$.

(a) $\langle x\rangle = \tfrac12(\tfrac L2 + \tfrac L2) + \langle1|x|2\rangle\cos\omega t$, where $\langle1|x|2\rangle = -\dfrac{16L}{9\pi^2}$. So $\mathbf{\langle x\rangle = \dfrac L2 - \dfrac{16L}{9\pi^2}\cos\omega t}$, which sloshes between about 0.32L and 0.68L.

(b) $\langle p\rangle = m\,d\langle x\rangle/dt = \mathbf{\dfrac{8\hbar}{3L}\sin\omega t}$, which is zero on average.

(c) $\langle E\rangle = \tfrac12(E_1 + E_2) = \mathbf{\dfrac{5\pi^2\hbar^2}{4mL^2}} = \dfrac52E_1$. This is constant in time, and a single measurement gives $E_1$ or $E_2$, each with probability ½.
