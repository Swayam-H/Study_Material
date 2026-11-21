# HW practice: Beiser Chapter 2, Particle properties of waves

Worked solutions for every in-chapter example of Beiser, *Concepts of Modern Physics* (6th ed.), Chapter 2, and for the end-of-chapter problems 1, 4, 8, 13, 19, 21, 23, 28, 36, 39 and 48. Constants: $h = 6.626\times10^{-34}$ J s, $hc = 1240$ eV nm, $m_ec^2 = 0.511$ MeV, Compton wavelength $\lambda_C = h/m_ec = 2.426$ pm.

### Problem 1 [HW practice · Beiser Ex 2.1]

A 660 Hz tuning fork is a harmonic oscillator with vibrational energy 0.04 J. Compare its energy quantum with that of an atomic oscillator emitting orange light of frequency $5.00\times10^{14}$ Hz.

*Solution.* The quantum of an oscillator of frequency $\nu$ is $h\nu$.

Tuning fork: $h\nu = (6.63\times10^{-34})(660) = 4.4\times10^{-31}$ J. The fork's energy is $0.04/4.4\times10^{-31} \approx 10^{29}$ quanta, so one quantum is a negligible fraction and the energy looks continuous: classical physics is fine.

Atomic oscillator: $h\nu = (6.63\times10^{-34})(5.00\times10^{14}) = 3.3\times10^{-19}$ J $= 2.1$ eV. This is comparable to the oscillator's whole energy, so quantization is conspicuous.

Quantization shows up when $h\nu$ is not small compared with the energies involved.

### Problem 2 [HW practice · Beiser Ex 2.2]

Ultraviolet light of wavelength 350 nm and intensity 1.00 W m⁻² falls on potassium (work function 2.2 eV). (a) Find the maximum kinetic energy of the photoelectrons. (b) If 0.50 % of photons produce a photoelectron, how many per second are emitted from 1.00 cm²?

*Solution.* **(a)** Photon energy $E = hc/\lambda = 1240/350 = 3.54$ eV, so

$$KE_{\max} = h\nu - \phi = 3.54 - 2.2 = \boxed{1.3\ \text{eV}}$$

**(b)** $E = 3.54\ \text{eV} = 5.68\times10^{-19}$ J. Power on the surface is $(1.00\ \text{W/m}^2)(1.00\times10^{-4}\ \text{m}^2) = 1.00\times10^{-4}$ W, so photons arrive at

$$n_p = \frac{1.00\times10^{-4}}{5.68\times10^{-19}} = 1.76\times10^{14}\ \text{s}^{-1}$$

Photoelectrons: $0.0050\times1.76\times10^{14} = \boxed{8.8\times10^{11}\ \text{s}^{-1}}$.

### Problem 3 [HW practice · Beiser Ex 2.3]

Find the shortest wavelength in the radiation from an x-ray machine whose accelerating potential is 50 000 V.

*Solution.* The most energetic photon takes all the kinetic energy of one electron, $eV = h\nu_{\max} = hc/\lambda_{\min}$ (inverse photoelectric effect):

$$\lambda_{\min} = \frac{hc}{eV} = \frac{1240\ \text{eV nm}}{5.0\times10^{4}\ \text{eV}} = 0.0248\ \text{nm} = \boxed{24.8\ \text{pm}}$$

### Problem 4 [HW practice · Beiser Ex 2.4]

X-rays of wavelength 10.0 pm are scattered from a target. (a) Find the wavelength scattered through 45°. (b) Find the maximum wavelength in the scattered x-rays. (c) Find the maximum kinetic energy of the recoil electrons.

*Solution.* Compton formula: $\lambda' - \lambda = \lambda_C(1-\cos\theta)$ with $\lambda_C = 2.426$ pm.

**(a)** $\Delta\lambda = 2.426(1-\cos45^\circ) = 0.71$ pm, so $\lambda' = \boxed{10.71\ \text{pm}}$.

**(b)** The shift is largest at $\theta = 180^\circ$, where $\Delta\lambda = 2\lambda_C = 4.85$ pm: $\lambda'_{\max} = \boxed{14.85\ \text{pm}}$.

**(c)** The recoil energy is largest for the largest $\Delta\lambda$, and equals the photon energy lost:

$$KE_{\max} = hc\left(\frac1\lambda - \frac1{\lambda'_{\max}}\right) = 124.0\ \text{keV} - 83.5\ \text{keV} = \boxed{40.5\ \text{keV}}$$

(using $hc = 1.240$ MeV pm: $E = 124.0$ keV at 10.0 pm and $83.5$ keV at 14.85 pm).

### Problem 5 [HW practice · Beiser Ex 2.5]

Show that pair production cannot occur in empty space.

*Solution.* Suppose a photon of energy $h\nu$ and momentum $h\nu/c$ turns into an electron and positron. Conservation of energy and momentum require

$$h\nu = E_- + E_+,\qquad \frac{h\nu}c\,\hat n = \mathbf p_- + \mathbf p_+$$

Take the total as a single system with energy $E = E_- + E_+$ and momentum $\mathbf P = \mathbf p_- + \mathbf p_+$. For a photon, $E^2 - P^2c^2 = 0$. For the pair, $E_\pm^2 = p_\pm^2c^2 + m^2c^4$ and

$$E^2 - P^2c^2 = 2m^2c^4 + 2\left(E_-E_+ - \mathbf p_-\cdot\mathbf p_+c^2\right)\ \ge\ 2m^2c^4 + 2\left(E_-E_+ - p_-p_+c^2\right)\ \ge\ 4m^2c^4 > 0$$

since $E_-E_+\ge p_-p_+c^2 + m^2c^4$ (Cauchy–Schwarz on $E_\pm^2 = p_\pm^2c^2+m^2c^4$). The two sides differ, so energy and momentum cannot both be conserved. A third body (a nucleus) is needed to take up momentum.

### Problem 6 [HW practice · Beiser Ex 2.6]

An electron and a positron move side by side along $x$ at $0.500c$ when they annihilate into two photons moving along the $x$ axis. (a) Do both photons move in the $+x$ direction? (b) What is the energy of each photon?

*Solution.* $\gamma = 1/\sqrt{1-0.25} = 1.155$. Total energy $E = 2\gamma mc^2 = 1.180$ MeV and total momentum $P = 2\gamma mv = 0.590$ MeV$/c$.

**(a)** No. Two photons both moving in $+x$ would have $P = E/c$, but here $P c = 0.590 \ne 1.180$ MeV. One photon moves in $+x$ and the other in $-x$.

**(b)** $E_1 + E_2 = 1.180$ MeV and $E_1 - E_2 = Pc = 0.590$ MeV:

$$\boxed{E_1 = 0.885\ \text{MeV (forward)},\qquad E_2 = 0.295\ \text{MeV (backward)}}$$

### Problem 7 [HW practice · Beiser Ex 2.7]

The linear attenuation coefficient for 2.0 MeV gamma rays in water is 4.9 m⁻¹. (a) Find the relative intensity after 10 cm of water. (b) How far must the beam travel before its intensity is reduced to 1 % of the original?

*Solution.* $I = I_0e^{-\mu x}$.

**(a)** $I/I_0 = e^{-(4.9)(0.10)} = e^{-0.49} = \boxed{0.61}$.

**(b)** $0.01 = e^{-\mu x}\Rightarrow x = \dfrac{\ln100}{4.9} = \boxed{0.94\ \text{m}}$.

### Problem 8 [HW practice · Beiser Ex 2.8]

Pound and Rebka found that a photon falling through $H = 22.5$ m gains energy. Find the change in frequency of red light of frequency $7.3\times10^{14}$ Hz after falling that distance.

*Solution.* A photon has effective mass $h\nu/c^2$, so falling through $H$ it gains $\Delta E = (h\nu/c^2)\,gH$:

$$\frac{\Delta\nu}{\nu} = \frac{gH}{c^2} = \frac{(9.8)(22.5)}{(3.00\times10^{8})^2} = 2.45\times10^{-15}$$

$$\Delta\nu = (7.3\times10^{14})(2.45\times10^{-15}) = \boxed{1.8\ \text{Hz}}$$

This tiny shift was measured with the Mössbauer effect.

### Problem 9 [HW practice · Beiser Ch 2 Problem 1]

If Planck's constant were smaller than it is, would quantum phenomena be more or less conspicuous?

*Solution.* **Less conspicuous.** Quantum effects scale with $h$: energy quanta $h\nu$ shrink, de Broglie wavelengths $h/p$ shrink and the uncertainty bound $\hbar/2$ shrinks. In the limit $h\to0$ all of them vanish and classical physics is exact. The smaller $h$, the larger the objects (and the lower the frequencies) that behave classically.

### Problem 10 [HW practice · Beiser Ch 2 Problem 4]

Compare the properties of particles with those of waves. Why do you think the wave aspect of light was discovered earlier than its particle aspect?

*Solution.* **Particle:** localized, carries energy and momentum in a lump, countable, follows a trajectory; two particles cannot add to cancel. **Wave:** spread out, has wavelength and frequency, shows interference and diffraction, energy shared over the wavefront, amplitudes can cancel.

The wave aspect was found first because wave effects need only that apertures and path differences be comparable to $\lambda\sim500$ nm, which simple slits and gratings achieve. The photon energy ($\sim2$ eV $\sim 3\times10^{-19}$ J) is so small that ordinary beams contain $10^{18}$ or more photons per second, so the energy looks continuous and the lumpiness is invisible. Particle behaviour only appears with very faint light or with sensitive detectors at the single-photon level (photoelectric effect, Compton scattering).

### Problem 11 [HW practice · Beiser Ch 2 Problem 8]

Under favourable circumstances the human eye can detect $1.0\times10^{-18}$ J of electromagnetic energy. How many 600 nm photons does this represent?

*Solution.* One photon has $E = hc/\lambda = 1240/600 = 2.07$ eV $= 3.31\times10^{-19}$ J.

$$N = \frac{1.0\times10^{-18}}{3.31\times10^{-19}} = \boxed{\approx 3\ \text{photons}}$$

### Problem 12 [HW practice · Beiser Ch 2 Problem 13]

What is the maximum wavelength of light that causes photoelectrons from sodium? What is the maximum kinetic energy of the photoelectrons if 200 nm light falls on sodium?

*Solution.* The work function of sodium is $\phi = 2.28$ eV (Table 2.1). Threshold: $h\nu_0 = \phi$,

$$\lambda_{\max} = \frac{hc}{\phi} = \frac{1240}{2.28} = \boxed{544\ \text{nm}}$$

For 200 nm, $E = 1240/200 = 6.20$ eV and

$$KE_{\max} = 6.20 - 2.28 = \boxed{3.9\ \text{eV}}$$

### Problem 13 [HW practice · Beiser Ch 2 Problem 19]

Show that it is impossible for a photon to give up all its energy and momentum to a free electron.

*Solution.* Suppose a photon $(h\nu, h\nu/c)$ is absorbed by a free electron initially at rest, which then moves with energy $E_e$ and momentum $p$:

$$h\nu + mc^2 = E_e,\qquad \frac{h\nu}c = p$$

Squaring the first and using $E_e^2 = p^2c^2 + m^2c^4$:

$$(h\nu)^2 + 2h\nu\,mc^2 + m^2c^4 = p^2c^2 + m^2c^4 = (h\nu)^2 + m^2c^4$$

so $2h\nu\,mc^2 = 0$, which needs $h\nu = 0$. A photon with energy cannot be fully absorbed by a free electron. (In a frame where the electron moves, the same conclusion holds, since it is frame independent.) Photoelectric absorption therefore needs a bound electron: the atom or lattice can take up the momentum.

### Problem 14 [HW practice · Beiser Ch 2 Problem 21]

Electrons are accelerated in television tubes through about 10 kV. Find the highest frequency of the electromagnetic waves emitted when they strike the screen. What kind of waves are these?

*Solution.* The highest frequency comes from an electron giving all its energy to one photon:

$$\nu_{\max} = \frac{eV}{h} = \frac{(1.602\times10^{-19})(1.0\times10^{4})}{6.626\times10^{-34}} = \boxed{2.4\times10^{18}\ \text{Hz}}$$

The wavelength is $c/\nu = 0.124$ nm: **x-rays** (a weak by-product of the tube, which is why the screens are shielded).

### Problem 15 [HW practice · Beiser Ch 2 Problem 23]

The distance between adjacent atomic planes in calcite is 0.300 nm. Find the smallest angle of Bragg scattering for 0.030 nm x-rays.

*Solution.* Bragg: $2d\sin\theta = n\lambda$, smallest for $n = 1$:

$$\sin\theta = \frac{\lambda}{2d} = \frac{0.030}{2(0.300)} = 0.050\ \Rightarrow\ \theta = \boxed{2.9^\circ}$$

### Problem 16 [HW practice · Beiser Ch 2 Problem 28]

A monochromatic x-ray beam of wavelength 55.8 pm is scattered through 46°. Find the wavelength of the scattered beam.

*Solution.*

$$\lambda' = \lambda + \lambda_C(1-\cos46^\circ) = 55.8 + 2.426(1 - 0.6947) = 55.8 + 0.74 = \boxed{56.5\ \text{pm}}$$

### Problem 17 [HW practice · Beiser Ch 2 Problem 36]

In a Compton experiment the incident x-rays have wavelength 10.0 pm and the x-rays scattered at a certain angle have wavelength 10.5 pm. Find the momentum (magnitude and direction) of the recoil electrons.

*Solution.* **Angle.** $\Delta\lambda = 0.5 = 2.426(1-\cos\theta)\Rightarrow\cos\theta = 0.794,\ \theta = 37.4^\circ$.

**Photon momenta** ($p = h/\lambda$, in units of keV/$c$, using $hc = 1.240$ MeV pm): incident $p = 124.0$ along $+x$; scattered $p' = 118.1$ at $37.4^\circ$.

Conservation of momentum, $\mathbf p_e = \mathbf p - \mathbf p'$:

$$p_{e,x} = 124.0 - 118.1\cos37.4^\circ = 30.2,\qquad p_{e,y} = -118.1\sin37.4^\circ = -71.8$$

$$|p_e| = \sqrt{30.2^2 + 71.8^2} = 77.9\ \text{keV}/c = \boxed{4.2\times10^{-23}\ \text{kg m s}^{-1}}$$

$$\varphi = \tan^{-1}\frac{71.8}{30.2} = \boxed{67^\circ}$$

on the opposite side of the incident direction from the scattered photon.

### Problem 18 [HW practice · Beiser Ch 2 Problem 39]

A positron collides head on with an electron and both are annihilated. Each had kinetic energy 1.00 MeV. Find the wavelength of the resulting photons.

*Solution.* The net momentum is zero, so the two photons are emitted in opposite directions with equal energies. Total energy $= 2(1.00 + 0.511) = 3.022$ MeV, so each photon has $E = 1.511$ MeV:

$$\lambda = \frac{hc}{E} = \frac{1.240\ \text{MeV pm}}{1.511\ \text{MeV}} \;\Rightarrow\; \boxed{\lambda = 0.82\ \text{pm}}$$

### Problem 19 [HW practice · Beiser Ch 2 Problem 48]

The linear absorption coefficient of copper for 80 keV x-rays is $4.7\times10^{4}$ m⁻¹. Find the relative intensity after passing through a 0.10 mm copper foil.

*Solution.* $\mu x = (4.7\times10^{4})(1.0\times10^{-4}) = 4.7$:

$$\frac I{I_0} = e^{-4.7} = \boxed{0.0091\ (0.9\%)}$$

# HW practice: Beiser Chapter 3, Wave properties of particles

In-chapter examples 3.1 to 3.9 and end-of-chapter problems 1, 7, 14, 20, 23, 29, 33. Constants: $\hbar = 1.055\times10^{-34}$ J s, $m_e = 9.11\times10^{-31}$ kg, $m_p = 1.673\times10^{-27}$ kg, $m_pc^2 = 938.3$ MeV. Uncertainty relation used: $\Delta x\,\Delta p \ge \hbar/2$.

### Problem 1 [HW practice · Beiser Ex 3.1]

Find the de Broglie wavelengths of (a) a 46 g golf ball at 30 m/s, and (b) an electron at $10^7$ m/s.

*Solution.* $\lambda = h/mv$.

**(a)** $\lambda = \dfrac{6.63\times10^{-34}}{(0.046)(30)} = \boxed{4.8\times10^{-34}\ \text{m}}$, absurdly small compared with the ball or any aperture, so no wave behaviour is observable.

**(b)** $\lambda = \dfrac{6.63\times10^{-34}}{(9.11\times10^{-31})(10^{7})} = \boxed{7.3\times10^{-11}\ \text{m}}$, comparable to atomic dimensions, so diffraction is observable ($v\ll c$, so the non-relativistic formula is fine).

### Problem 2 [HW practice · Beiser Ex 3.2]

Find the kinetic energy of a proton whose de Broglie wavelength is 1.000 fm.

*Solution.* $pc = hc/\lambda = 1240\ \text{MeV fm}/1.000\ \text{fm} = 1240$ MeV, far greater than $m_pc^2 = 938$ MeV, so use relativistic energy:

$$KE = \sqrt{(pc)^2 + (m_pc^2)^2} - m_pc^2 = \sqrt{1240^2 + 938.3^2} - 938.3 = 1555 - 938 = \boxed{617\ \text{MeV}}$$

A non-relativistic $p^2/2m$ would give 820 MeV, which is clearly wrong.

### Problem 3 [HW practice · Beiser Ex 3.3]

An electron has de Broglie wavelength 2.00 pm. Find its kinetic energy and the phase and group velocities of its de Broglie waves.

*Solution.* $pc = hc/\lambda = 1.240\ \text{MeV pm}/2.00\ \text{pm} = 0.620$ MeV, comparable to $m_ec^2 = 0.511$ MeV, so relativistic:

$$E = \sqrt{0.620^2 + 0.511^2} = 0.803\ \text{MeV},\qquad KE = E - mc^2 = \boxed{0.292\ \text{MeV}}$$

Particle speed: $v/c = pc/E = 0.620/0.803 = 0.772$, so $v = 2.31\times10^{8}$ m/s.

The **group velocity** equals the particle speed, $v_g = v = \boxed{2.31\times10^{8}\ \text{m/s}}$. The **phase velocity** is

$$v_p = \frac{E}{p} = \frac{c^2}{v} = \boxed{3.89\times10^{8}\ \text{m/s}}$$

which exceeds $c$; this is allowed because no energy or information travels at $v_p$.

### Problem 4 [HW practice · Beiser Ex 3.4]

An electron is in a box 0.10 nm across. Find its permitted energies.

*Solution.* For a particle confined to $0<x<L$ with infinite walls, $\lambda_n = 2L/n$ and

$$E_n = \frac{n^2h^2}{8mL^2} = \frac{n^2(6.63\times10^{-34})^2}{8(9.11\times10^{-31})(10^{-10})^2} = 6.0\times10^{-18}n^2\ \text{J} = \boxed{37.6\,n^2\ \text{eV}}$$

so $E_1 = 38$ eV, $E_2 = 150$ eV, $E_3 = 338$ eV. The level spacing is of order tens of eV, so atoms have well-separated levels.

### Problem 5 [HW practice · Beiser Ex 3.5]

A 10 g marble is in a box 10 cm across. Find its permitted energies.

*Solution.* With $m = 1.0\times10^{-2}$ kg and $L = 0.10$ m,

$$E_n = \frac{n^2h^2}{8mL^2} = \boxed{5.5\times10^{-64}\,n^2\ \text{J}}$$

The minimum energy ($n=1$) corresponds to a speed of $\sqrt{2E/m}\approx10^{-31}$ m/s, far too slow to detect, and the levels are so close together that energy appears continuous. Quantization is unobservable for macroscopic objects.

### Problem 6 [HW practice · Beiser Ex 3.6]

The position of a proton is established with accuracy $1.00\times10^{-11}$ m. Find the uncertainty in its position 1.00 s later. Assume $v\ll c$.

*Solution.* Initially $\Delta x_0 = 1.00\times10^{-11}$ m, so

$$\Delta p \ge \frac{\hbar}{2\Delta x_0} = 5.27\times10^{-24}\ \text{kg m s}^{-1},\qquad \Delta v = \frac{\Delta p}{m_p} = 3.15\times10^{3}\ \text{m/s}$$

After $t = 1.00$ s the position spread is

$$\Delta x = \Delta x_0 + \Delta v\,t \approx \boxed{3.2\times10^{3}\ \text{m}}$$

Pinning a proton down to atomic size makes its velocity so uncertain that after one second it could be several kilometres away.

### Problem 7 [HW practice · Beiser Ex 3.7]

A typical atomic nucleus has radius $5.0\times10^{-15}$ m. Use the uncertainty principle to put a lower limit on the energy an electron must have to be in a nucleus.

*Solution.* Take $\Delta x = 5.0\times10^{-15}$ m:

$$\Delta p \ge \frac{\hbar}{2\Delta x} = 1.05\times10^{-20}\ \text{kg m/s}$$

so $p c \ge (1.05\times10^{-20})(3.00\times10^{8})/(1.60\times10^{-19}) = 19.7$ MeV, much greater than $m_ec^2 = 0.511$ MeV. The electron is ultra-relativistic, $E\approx pc$:

$$\boxed{E \gtrsim 20\ \text{MeV}}$$

Electrons emitted in beta decay have energies of only a few MeV, so electrons cannot be confined inside nuclei. Protons and neutrons, being 2000 times heavier, need far less kinetic energy to be confined.

### Problem 8 [HW practice · Beiser Ex 3.8]

A hydrogen atom has radius $5.3\times10^{-11}$ m. Use the uncertainty principle to estimate the minimum energy of the electron.

*Solution.* Take $\Delta x = r = 5.3\times10^{-11}$ m, so $\Delta p\ge\hbar/2\Delta x = 9.95\times10^{-25}$ kg m/s. The momentum is at least about this large:

$$KE_{\min}\approx\frac{(\Delta p)^2}{2m} = \frac{(9.95\times10^{-25})^2}{2(9.11\times10^{-31})} = 5.4\times10^{-19}\ \text{J} = \boxed{3.4\ \text{eV}}$$

The electron's potential energy is $-e^2/4\pi\epsilon_0r = -27$ eV, so total $E\approx -24$ eV: the right order of magnitude (actual $-13.6$ eV). The atom does not collapse because squeezing $\Delta x$ raises $KE\propto1/\Delta x^2$ faster than the Coulomb term lowers $PE\propto -1/\Delta x$.

### Problem 9 [HW practice · Beiser Ex 3.9]

An excited atom radiates after an average of $1.0\times10^{-8}$ s. Find the inherent uncertainty in the frequency of the photon.

*Solution.* $\Delta E\,\Delta t\ge\hbar/2$ with $\Delta t = 1.0\times10^{-8}$ s:

$$\Delta E \ge \frac{\hbar}{2\Delta t} = 5.3\times10^{-27}\ \text{J},\qquad \Delta\nu = \frac{\Delta E}{h} = \frac1{4\pi\Delta t} = \boxed{8\times10^{6}\ \text{Hz}}$$

For a $\sim5\times10^{14}$ Hz line this is a width of about $1.6\times10^{-8}$ of the frequency: the **natural linewidth**.

### Problem 10 [HW practice · Beiser Ch 3 Problem 1]

A photon and a particle have the same wavelength. Can anything be said about their momenta? Their energies?

*Solution.* $\lambda = h/p$ for both, so **their momenta are equal**: $p_\gamma = p$.

For energies: the photon has $E_\gamma = pc$. The particle has total energy $E = \sqrt{p^2c^2 + m^2c^4} > pc$, so **the photon's energy is less than the particle's total energy**. The particle's kinetic energy is $KE = \sqrt{p^2c^2+m^2c^4} - mc^2 < pc$ (since $\sqrt{a^2+b^2}<a+b$), so **the photon's energy is greater than the particle's kinetic energy**.

$$KE_{\text{particle}} < E_\gamma < E_{\text{particle}}$$

### Problem 11 [HW practice · Beiser Ch 3 Problem 7]

The atomic spacing in rock salt is 0.282 nm. Find the kinetic energy of a neutron with de Broglie wavelength 0.282 nm. Is a relativistic calculation needed?

*Solution.* $KE = \dfrac{p^2}{2m} = \dfrac{(hc/\lambda)^2}{2m_nc^2} = \dfrac{(1240\ \text{eV nm}/0.282\ \text{nm})^2}{2(939.6\times10^{6}\ \text{eV})} = \dfrac{(4397)^2}{1.879\times10^{9}}$

$$\boxed{KE = 1.03\times10^{-2}\ \text{eV}}$$

This is far smaller than $m_nc^2 = 940$ MeV, so no relativistic calculation is needed. It is of order $k_BT$ at room temperature (0.025 eV): thermal neutrons from a reactor are suited to crystal diffraction.

### Problem 12 [HW practice · Beiser Ch 3 Problem 14]

An electron and a proton have the same kinetic energy. Compare the wavelengths and the phase and group velocities of their de Broglie waves.

*Solution.* With equal non-relativistic $KE$, $p = \sqrt{2m\,KE}$, so

$$\frac{\lambda_e}{\lambda_p} = \frac{p_p}{p_e} = \sqrt{\frac{m_p}{m_e}} = \sqrt{1836} = \boxed{42.8}$$

the electron's wavelength is 43 times longer.

**Group velocity** is the particle speed, $v_g = v = \sqrt{2KE/m}$, so $v_{g,e}/v_{g,p} = \sqrt{m_p/m_e} = 42.8$.

**Phase velocity**: $v_p = \omega/k = E/p = c^2/v$ (with $E$ the total energy). So $v_{p,e}/v_{p,p} = v_p/v_e = 1/42.8$: the proton's de Broglie waves travel faster. Both exceed $c$.

### Problem 13 [HW practice · Beiser Ch 3 Problem 20]

Show that the group velocity of a wave is $v_g = d\nu/d(1/\lambda)$.

*Solution.* The group velocity is $v_g = d\omega/dk$. With $\omega = 2\pi\nu$ and $k = 2\pi/\lambda$, we have $d\omega = 2\pi\,d\nu$ and $dk = 2\pi\,d(1/\lambda)$, so

$$v_g = \frac{d\omega}{dk} = \frac{2\pi\,d\nu}{2\pi\,d(1/\lambda)} = \boxed{\frac{d\nu}{d(1/\lambda)}}$$

### Problem 14 [HW practice · Beiser Ch 3 Problem 23]

What effect on the scattering angle in the Davisson–Germer experiment does increasing the electron energy have?

*Solution.* Increasing the energy increases $p$, so $\lambda = h/p$ shrinks. The diffraction maximum for a given order satisfies $d\sin\phi = n\lambda$ (with $d$ the surface-row spacing), so a smaller $\lambda$ gives a smaller $\phi$: **the diffracted peak moves to smaller scattering angles**, closer to the incident direction (reaching the forward direction for very energetic electrons). Experimentally the peak was strongest at 54 V and $\phi = 50^\circ$, consistent with $\lambda = 0.165$ nm.

### Problem 15 [HW practice · Beiser Ch 3 Problem 29]

A proton in a one-dimensional box has energy 400 keV in its first excited state. How wide is the box?

*Solution.* First excited state: $n = 2$, $E_2 = 4h^2/8mL^2 = h^2/2mL^2$, so

$$L = \frac{h}{\sqrt{2mE}} = \frac{hc}{\sqrt{2(m_pc^2)E}} = \frac{1240\ \text{MeV fm}}{\sqrt{2(938.3)(0.400)}\ \text{MeV}} = \frac{1240}{27.4}\ \text{fm}$$

$$\boxed{L = 45\ \text{fm} = 4.5\times10^{-14}\ \text{m}}$$

This is the size of a large nucleus, and $E\ll m_pc^2$, so the non-relativistic formula is valid.

### Problem 16 [HW practice · Beiser Ch 3 Problem 33]

The position and momentum of a 1.00 keV electron are determined simultaneously. If its position is located to within 0.100 nm, what is the percentage uncertainty in its momentum?

*Solution.* $p = \sqrt{2mE} = \sqrt{2(9.11\times10^{-31})(1.60\times10^{-16})} = 1.71\times10^{-23}$ kg m/s. The minimum uncertainty:

$$\Delta p \ge \frac{\hbar}{2\Delta x} = \frac{1.055\times10^{-34}}{2(10^{-10})} = 5.3\times10^{-25}\ \text{kg m/s}$$

$$\frac{\Delta p}{p} = \frac{5.3\times10^{-25}}{1.71\times10^{-23}} = \boxed{3.1\%}$$

(This is the minimum; with $\Delta x\Delta p\sim h$ the figure would be larger.)
