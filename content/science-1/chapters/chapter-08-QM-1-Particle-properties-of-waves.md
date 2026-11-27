# Learn: Particle properties of waves

Light behaves as a wave when it travels (interference, diffraction) and as a stream of photons, each with $E = h\nu$ and $p = h/\lambda$, when it gives or takes energy (blackbody, photoelectric, Compton, pair production). This doc covers Beiser ch 2 (all of 2.1–2.9) and the matching slides `QM.tex:1` to `:136`. No formula sheet is allowed, so the boxed results are the ones to know by heart.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Light as a wave

By the end of the nineteenth century the nature of light seemed settled. Young's double slit (1801) and Fresnel's theory (1818) had established it as a wave, and Maxwell showed that a changing electric field produces a magnetic field and vice versa. In vacuum his equations give a wave equation:

$$\frac{\partial^2\mathbf E}{\partial t^2} = \frac{1}{\mu_0\varepsilon_0}\nabla^2\mathbf E\quad(\text{same for }\mathbf B),\qquad \boxed{c = \frac{1}{\sqrt{\mu_0\varepsilon_0}},\qquad c = \nu\lambda}$$

A plane wave along $z$ is $\mathbf E = \mathbf E_0\,e^{i(kz - \omega t)}$ with $\mathbf B = \frac{k}{\omega}\,\hat{\mathbf z}\times\mathbf E_0$: the waves are **transverse** ($\mathbf E \perp \mathbf B \perp$ direction of travel, $|\mathbf B_0| = |\mathbf E_0|/c$), and superposing plane waves gives polarisation. Hertz produced such waves in the laboratory. A handful of experiments, however, refused to fit this picture, and each pointed the same way: in its interaction with matter, light behaves as if its energy came in separate lumps.

## Blackbody radiation

The first difficulty concerned blackbody radiation, the light given off by an ideal absorber held at a temperature $T$. Its spectrum depends only on $T$ (not on the material):

$$\begin{gathered}\boxed{\lambda_\text{max}T = \text{const} = 2.898\times10^{-3}\ \text{m K}}\ \ (\text{Wien}) \\[4pt] \boxed{P = \sigma T^4}\ \ (\text{Stefan–Boltzmann, per unit area})\end{gathered}$$

Two early formulas each fitted half the spectrum: Wien's distribution $I(\nu) \propto \nu^3e^{-b\nu/T}$ at high $\nu$, and Rayleigh–Jeans $I(\nu) \propto \nu^2T$ at low $\nu$. Rayleigh and Jeans treated the cavity radiation as standing waves, each with average energy $kT$. Since the number of standing waves grows without limit at short wavelengths, their result predicted infinite energy in the ultraviolet (the **ultraviolet catastrophe**).

Planck removed the trouble by assuming that an oscillator of frequency $\nu$ can have only the energies $E = nh\nu$, $n = 0, 1, 2, \dots$ The average energy per mode is then $h\nu/(e^{h\nu/kT} - 1)$ instead of $kT$, and

$$\boxed{u(\nu)\,d\nu = \frac{8\pi h\nu^3}{c^3}\,\frac{d\nu}{e^{h\nu/kT} - 1}}\qquad\left(\text{slides: } I(\nu) = \frac{2h\nu^3}{c^2}\frac{1}{e^{h\nu/kT} - 1}\right)$$

At high frequency $h\nu \gg kT$, such oscillators are seldom excited, and the spectrum falls back to zero; for $h\nu \ll kT$ it reduces to Rayleigh–Jeans. This was the first instance of quantised energy, and $h = 6.63\times10^{-34}\ \text{J s}$ turned out to be one of the fundamental constants of nature.

![Blackbody spectra and the ultraviolet catastrophe](fig/blackbody.svg)

*Figure. Left: hotter bodies emit more and peak at shorter wavelength (Wien). Right: classical Rayleigh–Jeans grows without limit; Planck turns over.*

## The photoelectric effect

The photoelectric effect made the idea of quanta unavoidable. When light falls on a metal surface, electrons are emitted, and the experiments showed three things that the wave theory could not explain:

1. The electrons come out at once, with no delay even in very weak light.
2. Their maximum kinetic energy depends on the **frequency** of the light, not its intensity.
3. Below a threshold frequency $\nu_0$ no electrons are emitted, however bright the light.

Einstein (1905) explained all three by supposing that light consists of quanta, now called photons, each of energy $h\nu$. A single photon gives all its energy to a single electron, which uses part of it, the work function $\phi$, to escape the surface:

$$\boxed{h\nu = KE_\text{max} + \phi,\qquad KE_\text{max} = eV_0,\qquad \phi = h\nu_0}$$

Brighter light means more photons and therefore more electrons, but not faster ones.

![Stopping potential against frequency](fig/photoelectric.svg)

*Figure. Stopping potential against frequency: a straight line of slope $h/e$ with threshold $\nu_0=\phi/h$.*

## Wave–particle duality

It does not follow that the wave theory of light is wrong. Light still shows interference and diffraction (Young's slits, X-ray diffraction), and these can only be understood with waves; the photoelectric and Compton effects need particles. The two descriptions are complementary: the wave picture tells us how light travels and where it is likely to be found, the photon picture how it gives up or takes on energy when it meets matter. For a photon,

$$\boxed{E = h\nu,\qquad m = 0,\qquad E = pc\quad\Longrightarrow\quad p = \frac{h\nu}{c} = \frac{h}{\lambda}}$$

## X-rays and X-ray diffraction

X-rays provide the photoelectric effect in reverse. When fast electrons strike a target they are decelerated and emit radiation. The shortest wavelength corresponds to an electron that gives all its kinetic energy $eV$ to a single photon:

$$\boxed{\lambda_\text{min} = \frac{hc}{eV}}$$

Because X-ray wavelengths ($\sim 0.1\ \text{nm}$) are comparable to the spacing of atoms in a crystal, the regular planes of atoms act as a diffraction grating. Waves reflected from successive planes a distance $d$ apart reinforce when the extra path is a whole number of wavelengths:

$$\boxed{2d\sin\theta = n\lambda}\qquad(\text{Bragg; } \theta \text{ measured from the plane})$$

X-ray diffraction is at once a proof that X-rays are waves and a tool for measuring crystal structures.

## The Compton effect

The Compton effect shows that a photon carries momentum as well as energy. X-rays scattered by loosely bound electrons come out with a longer wavelength, and the shift depends on the scattering angle $\phi$. Treating the event as a collision between a photon of momentum $h/\lambda$ and an electron at rest, and conserving energy and momentum (relativistically), gives

$$\boxed{\lambda' - \lambda = \frac{h}{mc}\,(1 - \cos\phi)},\qquad \lambda_C = \frac{h}{mc} = 2.43\ \text{pm}$$

The maximum shift, $2\lambda_C$, is at $\phi = 180^\circ$. The agreement of this formula with experiment is the most direct evidence that photons behave like particles in collisions.

![Compton scattering and Bragg reflection geometry](fig/compton-bragg.svg)

*Figure. Left: Compton scattering. Right: Bragg reflection, where the extra path of the lower ray is $2d\sin\theta$.*

## Pair production and photons in gravity

At still higher energies a photon can disappear entirely and create matter. In pair production a photon passing near a nucleus turns into an electron and a positron:

$$\boxed{h\nu_\text{min} = 2mc^2 = 1.02\ \text{MeV}}$$

The nucleus is needed so that momentum can be conserved (a photon alone cannot make a pair in empty space). The reverse process, annihilation, turns an electron and positron into two photons. These processes show that the photon is a particle in the full sense of relativity, with $E = h\nu$, $p = h\nu/c$ and zero rest mass. Since a photon has energy it behaves as if it had a mass $h\nu/c^2$ in a gravitational field, and light rising out of a gravitational field loses energy and so shifts to lower frequency (gravitational red shift).

# Reference: Particle properties of waves

Beiser ch 2 section by section, with every derivation written out step by step, the numbers worth knowing, and what the slides (`QM.tex:1` to `:136`) add. The in-chapter Beiser examples are summarised here with their answers; full worked versions are in *HW practice: Beiser chapters 2 and 3*.

## Constants to memorise

| Constant | Value | Handy form |
| --- | --- | --- |
| Planck's constant h | 6.626 × 10⁻³⁴ J s | 4.136 × 10⁻¹⁵ eV s |
| hc | 1.986 × 10⁻²⁵ J m | **1240 eV nm** (= 1.240 × 10⁻⁶ eV m) |
| Speed of light c | 2.998 × 10⁸ m/s |  |
| Electron rest energy mₑc² | 0.511 MeV |  |
| Electron charge e | 1.602 × 10⁻¹⁹ C | 1 eV = 1.602 × 10⁻¹⁹ J |
| Boltzmann k | 1.381 × 10⁻²³ J/K | 8.617 × 10⁻⁵ eV/K |
| Compton wavelength of electron h/mₑc | 2.426 pm |  |
| Wien constant b | 2.898 × 10⁻³ m K |  |
| Stefan–Boltzmann σ | 5.67 × 10⁻⁸ W m⁻² K⁻⁴ |  |

## 2.1 Electromagnetic waves

**Idea.** Accelerated charges produce linked electric and magnetic disturbances that travel through empty space at c. Light is one such wave.

**Where the wave comes from.** Faraday: a changing magnetic field produces an electric field (induction). Maxwell (1864) proposed the converse on symmetry grounds: a changing electric field produces a magnetic field. Each field then keeps regenerating the other, and the disturbance travels. Maxwell's equations in vacuum give

$$
\frac{\partial^2 \vec E}{\partial t^2} = \frac{1}{\mu_0\varepsilon_0}\nabla^2 \vec E \qquad\text{(and the same for } \vec B\text{)}
$$

**Plane-wave solution (slides `QM.tex:13`).** Try $\vec E = \vec E_0\,e^{i(kz-\omega t)}$. Then $\partial^2\vec E/\partial t^2 = -\omega^2\vec E$ and $\nabla^2\vec E = -k^2\vec E$, so the equation holds if

$$
\omega^2 = \frac{k^2}{\mu_0\varepsilon_0} \quad\Rightarrow\quad \frac{\omega}{k} = c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} = 2.998\times10^8\ \text{m/s}, \qquad \nu\lambda = c
$$

- The magnetic field is $\vec B = \frac{k}{\omega}\,\hat z\times\vec E$, so $B = E/c$ (the slide writes $B_0 = E_0$, which is the same statement in units with c = 1). E, B and the direction of travel are mutually perpendicular: the wave is **transverse**.
- Maxwell noticed that $1/\sqrt{\mu_0\varepsilon_0}$ equals the measured speed of light, too close to be chance, and concluded light is an em wave. Hertz (1888) made the waves with a spark gap, measured their wavelength and speed, and showed reflection, refraction and diffraction.
- **Superposition of plane waves** is also a solution. Adding waves with E along x and along y with a phase difference gives **polarisation** (linear, circular, elliptical).
- The instantaneous amplitude can be taken as E or B (they are tied by E = cB). E is used because the electric field does nearly all the work on matter.

**Spectrum.** Visible light spans only about 4.3 × 10¹⁴ Hz (red, about 700 nm) to 7.5 × 10¹⁴ Hz (violet, about 400 nm). The slides round this to red 800 nm, blue 400 nm. A prism splits sunlight and shows invisible infrared beyond red and ultraviolet beyond violet.

**Principle of superposition.** When two or more waves of the same kind pass a point at the same time, the instantaneous amplitude there is the sum of their instantaneous amplitudes. Waves in phase reinforce (constructive interference); out of phase they cancel (destructive).

**Young's double slit (1801).** Light from one source passes two slits. Each slit diffracts, acting as a new source, and the two waves interfere on the screen:

- bright line where the path difference is $0, \lambda, 2\lambda, \dots$
- dark line where it is $\lambda/2, 3\lambda/2, 5\lambda/2, \dots$

Classical particles would give no dark lines. Interference and diffraction are found only in waves, so Young's experiment proves light is a wave (and lets you measure λ). By 1900 the matter seemed settled.

**History on the slides (`QM.tex:1`).** Huygens' wave theory (1690), Newton's corpuscles in *Opticks* (1705), Young's double slit (1801), Fresnel's mathematical Huygens–Fresnel theory (1818), Maxwell's equations (1860s). Know one line on what each contributed.

## 2.2 Blackbody radiation

**Idea.** Every body radiates em energy at every temperature; which frequencies dominate depends on T (room temperature: mostly infrared). A good absorber is a good emitter, because a body in equilibrium must absorb energy from its surroundings at the rate it emits. An ideal body that absorbs everything is a **blackbody**, and all blackbodies at the same T radiate the same spectrum, whatever they are made of (Kirchhoff's problem on the slides, `QM.tex:30`). The model is a small hole in a hollow cavity: radiation that enters is trapped and absorbed, so the hole is black, and what comes out is the cavity radiation.

**Experimental facts (slides `QM.tex:42`).**

- Spectrum depends only on T. Hotter bodies emit more at every frequency and peak at higher frequency (red, then orange, then "white hot").
- Stefan–Boltzmann law: total power per area $P/A = \sigma T^4$.
- Wien's displacement law: $\lambda_{max}T$ = constant = 2.898 × 10⁻³ m K.
- Wien's distribution law (1896): $I(\nu) \propto \nu^3 e^{-b\nu/T}$. It fits at high ν and fails at low ν.
- Rayleigh–Jeans law (1899): $I(\nu) \propto \nu^2 T$. It fits at low ν and fails at high ν.

### The Rayleigh–Jeans calculation, step by step

**Step 1. Count the standing waves.** Treat the radiation in a cavity with perfectly reflecting walls as standing em waves with a node at each wall, the 3-D version of waves on a string fixed at both ends. Beiser quotes the result (Eq. 2.1) and derives it in ch 9; the short version is below.

In a cube of side L the allowed waves have $k_x = \pi n_x/L$, $k_y = \pi n_y/L$, $k_z = \pi n_z/L$ with positive integers $n_x, n_y, n_z$. Write $n^2 = n_x^2+n_y^2+n_z^2$, so $k = \pi n/L$ and, with $k = 2\pi\nu/c$, $n = 2L\nu/c$. The number of integer points with radius less than n is the volume of one octant of a sphere, $\tfrac18\cdot\tfrac43\pi n^3$. Each point carries two independent polarisations, so the number of modes below ν is

$$
N(\nu) = 2\cdot\frac18\cdot\frac43\pi\left(\frac{2L\nu}{c}\right)^3 = \frac{8\pi L^3\nu^3}{3c^3}
$$

Differentiate and divide by the volume L³:

$$
G(\nu)\,d\nu = \frac{8\pi\nu^2\,d\nu}{c^3} \qquad\text{(standing waves per unit volume between } \nu \text{ and } \nu + d\nu\text{)}
$$

It does not depend on the shape of the cavity, and it grows as ν²: short wavelengths fit in many more ways.

**Step 2. Give each standing wave its classical average energy.** Equipartition: each degree of freedom of a system in equilibrium at T has average energy ½kT. Each standing wave is fed by an oscillating charge in the wall, a 1-D harmonic oscillator with two degrees of freedom (kinetic and potential), so

$$
\bar\varepsilon_{classical} = 2\cdot\tfrac12 kT = kT
$$

**Step 3. Multiply.**

$$
u(\nu)\,d\nu = \bar\varepsilon\,G(\nu)\,d\nu = \frac{8\pi kT}{c^3}\,\nu^2\,d\nu \qquad\text{(Rayleigh–Jeans)}
$$

**Why it fails.** u grows as ν² without limit, so the total energy $\int_0^\infty u\,d\nu$ is infinite. Real spectra fall to zero at high ν. This is the **ultraviolet catastrophe**: everything classical physics can say about the spectrum, and it is wrong.

### Planck's formula and its limits

Planck (1900) first found by "lucky guesswork" a formula that fits all frequencies:

$$
u(\nu)\,d\nu = \frac{8\pi h}{c^3}\,\frac{\nu^3\,d\nu}{e^{h\nu/kT}-1}, \qquad h = 6.626\times10^{-34}\ \text{J s}
$$

**High-frequency limit** ($h\nu \gg kT$): $e^{h\nu/kT}$ is huge, the 1 is negligible, and

$$
u(\nu) \approx \frac{8\pi h\nu^3}{c^3}\,e^{-h\nu/kT} \;\to\; 0
$$

No catastrophe. This is Wien's distribution law, with $b = h/k$.

**Low-frequency limit** ($h\nu \ll kT$): use $e^x = 1 + x + x^2/2! + \dots \approx 1 + x$ for small x:

$$
\frac{1}{e^{h\nu/kT}-1} \approx \frac{1}{1 + h\nu/kT - 1} = \frac{kT}{h\nu} \quad\Rightarrow\quad u(\nu) \approx \frac{8\pi h\nu^3}{c^3}\cdot\frac{kT}{h\nu} = \frac{8\pi kT\nu^2}{c^3}
$$

which is Rayleigh–Jeans. Planck's formula contains both old laws as limits.

**The physical principle.** After weeks of "the most strenuous work of my life", Planck found what the formula needs: an oscillator in the cavity wall cannot have any energy, only

$$
\varepsilon_n = nh\nu, \qquad n = 0, 1, 2, \dots
$$

It emits radiation of frequency ν when it drops one step and absorbs when it rises one step. Each bundle hν is a **quantum**. The average energy per standing wave is then not kT but

$$
\bar\varepsilon = \frac{h\nu}{e^{h\nu/kT}-1}
$$

and $u = \bar\varepsilon\,G(\nu)$ gives Planck's formula.

**Where $\bar\varepsilon$ comes from** (Beiser derives it in ch 9; know the idea). The probability of energy nhν at temperature T is proportional to the Boltzmann factor $e^{-nh\nu/kT}$. Put $x = e^{-h\nu/kT}$:

$$
\bar\varepsilon = \frac{\sum_n nh\nu\,x^n}{\sum_n x^n} = h\nu\,\frac{x/(1-x)^2}{1/(1-x)} = \frac{h\nu\,x}{1-x} = \frac{h\nu}{e^{h\nu/kT}-1}
$$

using $\sum x^n = 1/(1-x)$ and $\sum n x^n = x/(1-x)^2$. A high-frequency oscillator needs a large quantum hν; when hν ≫ kT it is almost never excited, so its average energy is far below kT. Quantisation "freezes out" the ultraviolet.

**Stefan–Boltzmann and Wien from Planck** (Beiser 9.6; the slides list both laws, so it helps to see where they come from).

- Total energy density: substitute $x = h\nu/kT$, so $\int_0^\infty u\,d\nu = \frac{8\pi k^4T^4}{h^3c^3}\int_0^\infty\frac{x^3\,dx}{e^x-1} = \frac{8\pi^5k^4}{15h^3c^3}\,T^4$, using $\int_0^\infty x^3/(e^x-1)\,dx = \pi^4/15$. The power leaving a hole is c/4 times the energy density, so $P/A = \sigma T^4$ with $\sigma = 2\pi^5k^4/15h^3c^2 = 5.67\times10^{-8}$ W m⁻² K⁻⁴.
- Peak: written per unit wavelength, Planck's law peaks where $hc/\lambda kT = 4.965$, so $\lambda_{max}T = hc/4.965k = 2.898\times10^{-3}$ m K. Wien's law follows.

**The slides' form (`QM.tex:56`).** $I(\nu) = \dfrac{2h\nu^3}{c^2}\,\dfrac{1}{e^{h\nu/kT}-1}$ is the spectral radiance (power per area per solid angle per frequency). It is the same law: $u(\nu) = (4\pi/c)\,I(\nu)$.

**What Planck himself believed.** He called quantisation an "act of desperation" and for years held that only the energy exchange between wall oscillators and the waves was quantised, while the waves stayed classical. The slide's line "Planck: a better model will remove quantization" says the same. Einstein took the next step (2.3).

**Example 2.1 (Beiser).** A 660 Hz tuning fork with 0.04 J of vibrational energy has quanta $h\nu = 4.38\times10^{-31}$ J, about 10²⁹ times smaller than its energy, so quantisation is invisible and the fork is classical. An atomic oscillator emitting orange light at 5.00 × 10¹⁴ Hz has $h\nu = 3.32\times10^{-19}$ J = 2.08 eV, a large amount on the atomic scale. That is why classical physics fails for atoms.

## 2.3 Photoelectric effect

**Discovery.** Hertz (1887) noticed his spark gap fired more easily when ultraviolet light hit one of the metal balls (slides: charged metal in vacuum discharges under UV light). The cause turned out to be electrons emitted by the light, now called **photoelectrons**.

**Apparatus (Fig. 2.9).** An evacuated quartz tube with two electrodes and a variable voltage. Light falls on one metal plate; electrons that reach the other plate make a current. A **retarding** voltage V turns back the slower electrons. At the **stopping potential** V₀ (a few volts) even the fastest ones are stopped and the current drops to zero, so

$$
eV_0 = KE_{max}
$$

- Current is proportional to intensity at every retarding voltage, but V₀ is the same for all intensities of a given frequency (Fig. 2.10).
- V₀ depends on frequency (Fig. 2.11). At V = 0 the current depends on intensity, not on frequency.

**Three findings the wave theory can't explain.**

1. **No time delay** (within about 10⁻⁹ s), even in dim light. Wave estimate for sodium: a detectable current flows when 10⁻⁶ W/m² is absorbed. One atomic layer of 1 m² holds about 10¹⁹ atoms, so each atom receives about 10⁻²⁵ W. Collecting a few eV (about 5 × 10⁻¹⁹ J) at that rate takes about 5 × 10⁶ s, more than a month.
2. **Intensity changes the number, not the energy.** Brighter light of the same frequency gives more electrons with the same KE\_max. Waves predict brighter means more energetic.
3. **Frequency sets the energy, with a threshold.** Higher frequency gives faster electrons (blue beats red). Below a critical frequency ν₀, characteristic of each metal, no electrons come out at all, however bright the light. Above ν₀, KE\_max rises linearly with ν (Fig. 2.12).

**Einstein (1905).** Planck had energy given to the waves in quanta; Einstein said it is also *carried* by the waves in quanta. Light of frequency ν is a stream of **photons** (Lewis's 1926 word), each of energy hν, and one photon gives all its energy to one electron. Each finding follows: (1) the energy is concentrated, so there is no wait; (2) all photons of one frequency have the same energy, so intensity changes only their number; (3) higher ν means more energy per photon.

**Work function.** An electron needs a minimum energy φ to leave the surface (otherwise electrons would pour out all the time):

$$
\phi = h\nu_0, \qquad h\nu = KE_{max} + \phi, \qquad KE_{max} = h\nu - h\nu_0 = h(\nu - \nu_0)
$$

- The fastest electrons are the ones that lose nothing on the way out; others lose some energy inside the metal, so the electron energies range from 0 to KE\_max.
- KE\_max against ν is a straight line of slope **h for every metal**, with intercept ν₀ (Fig. 2.12). The same statement as $V_0 = (h/e)\nu - \phi/e$: slope h/e. Millikan's measurement of this slope gave h.
- **Table 2.1** (eV): Cs 1.9, K 2.2, Na 2.3, Li 2.5, Ca 3.2, Cu 4.7, Ag 4.7, Pt 6.4.
- Pulling an electron from the metal takes about half the energy needed to ionise a free atom of the metal (Cs: work function 1.9 eV, ionisation energy 3.9 eV).
- Visible photons carry 1.7 to 3.3 eV, so the photoelectric effect is a visible and ultraviolet phenomenon.

**Photon energy in handy units.**

$$
E = h\nu = (4.136\times10^{-15}\ \text{eV s})\,\nu, \qquad E = \frac{hc}{\lambda} = \frac{1.240\times10^{-6}\ \text{eV m}}{\lambda} = \frac{1240\ \text{eV nm}}{\lambda}
$$

**Example 2.2 (Beiser).** 350 nm UV at 1.00 W/m² on potassium. Photon energy 1240/350 = 3.5 eV, so KE\_max = 3.5 − 2.2 = 1.3 eV. On 1.00 cm² the power is 10⁻⁴ W; with 5.68 × 10⁻¹⁹ J per photon that is 1.76 × 10¹⁴ photons/s, and if 0.50% eject electrons, 8.8 × 10¹¹ photoelectrons/s.

**Thermionic emission (box).** A very hot metal emits electrons. The minimum energy needed is always close to the photoelectric work function: heat supplies the energy instead of a photon. This is how the cathode of an x-ray tube works (2.5).

## 2.4 What is light?

The photon picture and the wave picture both have strong experimental support, and for the first time two different theories are needed for one phenomenon. This is not like Newton versus relativity, where one is a limit of the other.

**The bridge (double slit).** In the wave model the intensity at a point on the screen depends on $\overline{E^2}$, the cycle average of the squared field. In the photon model it is $N h\nu$, with N photons per second per unit area arriving there. Both must give the same intensity, so

$$
N \propto \overline{E^2}
$$

- With many photons you see the usual fringes. With so few that one photon arrives at a time, you see random flashes, but after a long time the flashes build up the same fringe pattern.
- So the **probability** of finding a photon at a place is set by $\overline{E^2}$ there. Light travels as a wave and gives up or takes on energy as a particle.
- The two theories complement each other; each alone explains only some effects. Einstein, near the end of his life: fifty years of brooding had not told him what light quanta are.

**Slides summary (`QM.tex:119`).** Light as a wave: Young's double slit, x-ray diffraction. Light as a particle: photoelectric and Compton effects. A photon has m = 0, so $E^2 = p^2c^2 + m^2c^4$ gives E = pc, and with E = hν:

$$
p = \frac{E}{c} = \frac{h\nu}{c} = \frac{h}{\lambda}
$$

## 2.5 X-rays

**Idea.** If a photon can give its energy to an electron (2.3), the reverse should happen too: an electron's kinetic energy can become a photon. X-ray production is this **inverse photoelectric effect**.

**Discovery and properties.** Roentgen (1895) found that fast electrons hitting matter produce a penetrating radiation that travels in straight lines, is not deflected by electric or magnetic fields, passes through opaque materials, makes phosphors glow and exposes photographic plates. Faster electrons give more penetrating x-rays; more electrons give a more intense beam.

**Why they are em waves.** An accelerated charge radiates, and an electron stopped suddenly is strongly accelerated. This radiation is **bremsstrahlung** ("braking radiation"). It matters more for electrons than for heavier particles (electrons are accelerated more violently near nuclei) and grows with electron energy and with the atomic number of the target.

**Measuring the wavelength.** No ruled grating is fine enough. Von Laue (1912) realised atomic spacings in crystals match the expected x-ray wavelengths, so a crystal is a 3-D grating. Wavelengths of 0.013 to 0.048 nm were found, about 10⁻⁴ of visible light, so the quanta are about 10⁴ times more energetic. X-rays are roughly 0.01 to 10 nm (slides: about 0.1 nm), overlapping gamma rays at one end and ultraviolet at the other.

**The tube (Fig. 2.15, slides `QM.tex:82`).** A heated cathode supplies electrons by thermionic emission; a potential difference V of tens of kilovolts accelerates them onto a metal target set at an angle; the tube is evacuated so the electrons arrive unimpeded.

**Two features classical theory can't explain** (Figs. 2.16, 2.17):

1. **Characteristic lines.** Molybdenum shows sharp intensity peaks at wavelengths fixed by the target material. They come from rearrangements of inner electrons after the bombardment (Beiser 7.9).
2. **A sharp cutoff.** At a given V no x-ray is shorter than λ\_min. λ\_min falls as V rises and is the **same for tungsten and molybdenum** at the same V. Duane and Hunt found experimentally $\lambda_{min} = 1.24\times10^{-6}/V$ m, with V in volts.

**Deriving the cutoff.** Most electrons make many glancing collisions and their energy becomes heat (hence tungsten targets and cooling). A few lose all their energy in one collision, and that energy becomes one photon. The work function is a few eV against tens of keV, so ignore it. The shortest wavelength comes from an electron that gives its whole kinetic energy eV to one photon:

$$
eV = h\nu_{max} = \frac{hc}{\lambda_{min}} \quad\Rightarrow\quad \lambda_{min} = \frac{hc}{eV} = \frac{1.240\times10^{-6}\ \text{V m}}{V}
$$

This is the Duane–Hunt law, the same formula as $E = hc/\lambda$ read backwards. It depends only on V, not on the target.

**Example 2.3 (Beiser).** At 50 kV: λ\_min = 1.24 × 10⁻⁶/5.00 × 10⁴ = 2.48 × 10⁻¹¹ m = 0.0248 nm, so ν\_max = c/λ\_min = 1.21 × 10¹⁹ Hz.

**Medical use (box).** Bone absorbs x-rays more than muscle, and muscle more than fat; barium "meals" and injected compounds raise contrast. CT scanners combine exposures from many directions into cross-sectional slices.

## 2.6 X-ray diffraction

**How an atom scatters an em wave.** In an electric field an atom polarises: electrons and nucleus are pushed opposite ways, making a small electric dipole. In the alternating field of a wave of frequency ν the dipole oscillates at ν and re-radiates waves of the same ν in all directions (except along its own axis, a restriction that averages out for unpolarised light). So atoms absorb incoming plane waves and re-emit spherical waves of the same frequency.

**Bragg planes.** A crystal's atoms lie on families of parallel planes, each family with its own spacing d (W. L. Bragg, 1913). The slides show two sets of Bragg planes in NaCl, with spacings d₁ and d₂ (`QM.tex:82`).

**Conditions for a strong scattered beam** (Fig. 2.20). A beam of wavelength λ meets a family of planes at glancing angle θ, measured **from the planes**, not from the normal.

1. The scattering angle must equal the angle of incidence θ, just as in ordinary reflection. Then all atoms in one plane scatter in phase.
2. Rays from successive planes must differ in path by a whole number of wavelengths. The ray from the lower plane travels an extra $d\sin\theta$ on the way in and $d\sin\theta$ on the way out:

$$
2d\sin\theta = n\lambda \qquad (n = 1, 2, 3, \dots \text{ is the order})
$$

**X-ray spectrometer (Fig. 2.21).** A narrow beam hits a crystal at θ, and the detector is set to catch rays scattered at θ (so it sits at 2θ from the beam). Turning the crystal, the detector records peaks at the angles Bragg's law predicts. Known d gives λ; known λ gives d and the crystal structure.

**Laue photograph of NaCl** (slides). Bright spots where rays from many planes interfere constructively; the fourfold symmetry reflects the cubic lattice; the big central spot is the unscattered beam.

## 2.7 Compton effect

**Idea.** Photons have momentum as well as energy, so a photon–electron collision should behave like a billiard-ball collision. X-rays scattered by loosely bound electrons come out with a longer wavelength, and the shift depends only on the angle. A classical wave would scatter at the same wavelength.

### The derivation

Photon of frequency ν hits an electron at rest. Afterward: photon of frequency ν′ at angle φ, electron with momentum p at angle θ on the other side (Fig. 2.22).

**Energy.** Loss in photon energy equals gain in electron kinetic energy:

$$
h\nu - h\nu' = KE \tag{2.14}
$$

**Photon momentum.** A massless particle has E = pc, so $p = h\nu/c$ before and $h\nu'/c$ after.

**Momentum along the original direction:**

$$
\frac{h\nu}{c} + 0 = \frac{h\nu'}{c}\cos\phi + p\cos\theta \tag{2.16}
$$

**Momentum perpendicular to it:**

$$
0 = \frac{h\nu'}{c}\sin\phi - p\sin\theta \tag{2.17}
$$

**Eliminate θ.** Multiply both by c and rearrange:

$$
pc\cos\theta = h\nu - h\nu'\cos\phi, \qquad pc\sin\theta = h\nu'\sin\phi
$$

Square and add ($\cos^2\theta + \sin^2\theta = 1$):

$$
p^2c^2 = (h\nu)^2 - 2(h\nu)(h\nu')\cos\phi + (h\nu')^2 \tag{2.18}
$$

**Electron energy, relativistically.** Equate $E = KE + mc^2$ and $E = \sqrt{m^2c^4 + p^2c^2}$:

$$
(KE + mc^2)^2 = m^2c^4 + p^2c^2 \quad\Rightarrow\quad p^2c^2 = KE^2 + 2mc^2\,KE
$$

With $KE = h\nu - h\nu'$:

$$
p^2c^2 = (h\nu)^2 - 2(h\nu)(h\nu') + (h\nu')^2 + 2mc^2(h\nu - h\nu') \tag{2.19}
$$

**Set (2.18) equal to (2.19).** The squared terms cancel:

$$
2mc^2(h\nu - h\nu') = 2(h\nu)(h\nu')(1 - \cos\phi) \tag{2.20}
$$

**Change to wavelengths.** Divide by $2h^2c^2$ and use $\nu/c = 1/\lambda$:

$$
\frac{mc}{h}\left(\frac{1}{\lambda} - \frac{1}{\lambda'}\right) = \frac{1-\cos\phi}{\lambda\lambda'} \quad\Rightarrow\quad \frac{mc}{h}(\lambda' - \lambda) = 1 - \cos\phi
$$

$$
\lambda' - \lambda = \frac{h}{mc}(1-\cos\phi) = \lambda_C(1-\cos\phi), \qquad \lambda_C = \frac{h}{mc} = 2.426\ \text{pm (electron)}
$$

### What it says

- The shift does not depend on the incident λ. It is zero at φ = 0, λ\_C at 90°, and largest, 2λ\_C = 4.852 pm, at φ = 180°.
- Because the shift is a few picometres, it is noticeable only for short λ: under 0.01% for visible light, several percent for 0.1 nm x-rays.
- Compton scattering is the chief way x-rays lose energy in matter.
- Electron recoil energy (from 2.14): $KE = hc\left(\dfrac1\lambda - \dfrac1{\lambda'}\right)$, largest at φ = 180°.

**Experiment (Figs. 2.23, 2.24).** Monochromatic x-rays hit a target; a spectrometer measures the scattered wavelengths at φ = 0°, 45°, 90°, 135°. The shifted peak moves out as φ grows, exactly as the formula says. An **unshifted** peak is also present at every angle: tightly bound electrons make the whole atom recoil, so m is the atom's mass, tens of thousands of times the electron's, and the shift is too small to see. Compton (early 1920s) observed and explained this; it convinced the remaining doubters that photons are real. The slides' "Compton calculation" figure (`QM.tex:107`) is this derivation.

**Example 2.4 (Beiser).** 10.0 pm x-rays. At 45°: λ′ = 10.0 + 2.426(1 − 0.707) = 10.7 pm. Largest λ′ = 10.0 + 4.9 = 14.9 pm. Largest recoil energy $hc(1/10.0 - 1/14.9)$ per pm = 6.54 × 10⁻¹⁵ J = 40.8 keV.

## 2.8 Pair production

**Idea.** A photon can give an electron all its energy (photoelectric) or part of it (Compton), or it can turn into matter: an electron and a **positron** (a positively charged electron). Energy becomes rest mass.

**Conservation near a nucleus.** Charge: −e + e = 0, the same as the photon's. Energy: the photon's energy becomes the pair's rest energy plus kinetic energy. Momentum: the nucleus takes up the extra; it is so heavy that it takes almost no energy.

**Threshold.**

$$
h\nu \ge 2m_ec^2 = 1.02\ \text{MeV}, \qquad \lambda_{max} = \frac{1240\ \text{eV nm}}{1.02\times10^6\ \text{eV}} = 1.2\ \text{pm}
$$

Any extra energy becomes kinetic energy of the pair. Such photons are **gamma rays**, emitted by radioactive nuclei and found in cosmic rays.

**Why it can't happen in empty space (Example 2.5, Beiser).** Suppose it did, with the pair leaving at equal angles θ to the photon's line (equal angles so transverse momentum cancels), each with total energy γmc² and momentum p = γmv.

- Energy: $h\nu = 2\gamma mc^2$.
- Momentum along the line: $h\nu/c = 2p\cos\theta$, so $h\nu = 2\gamma mc^2\,(v/c)\cos\theta$.
- Since v/c < 1 and cos θ ≤ 1, momentum demands $h\nu < 2\gamma mc^2$, but energy demands $h\nu = 2\gamma mc^2$. Contradiction. A nucleus (or another body) must carry off part of the photon's momentum.

**Annihilation.** $e^+ + e^- \to \gamma + \gamma$. The 1.02 MeV of rest energy becomes two photons, each with 0.51 MeV plus half the pair's kinetic energy relative to their centre of mass. Two photons are needed to conserve momentum; no nucleus is needed.

**Example 2.6 (Beiser).** e⁺ and e⁻ move side by side along +x at 0.500c and annihilate into two photons along the x axis. The photons go in opposite directions (they do in the CM frame, and the CM moves slower than light). Momentum: $p_1 - p_2 = 2\gamma mv = 0.590$ MeV/c. Energy: $p_1c + p_2c = 2\gamma mc^2 = 1.180$ MeV. So p₁ = 0.885 MeV/c and p₂ = 0.295 MeV/c: photon energies 0.885 MeV (forward) and 0.295 MeV (backward).

**Photon absorption in matter (Figs. 2.27 to 2.29).** X- and gamma-rays lose energy by three processes, each passing energy to electrons.

| Energy range | Dominant process |
| --- | --- |
| Low | Photoelectric effect (lasts to higher energy in high-Z absorbers) |
| Middle | Compton scattering: from a few tens of keV in light elements, from nearly 1 MeV in heavy ones |
| High | Pair production (only above 1.02 MeV): takes over above about 4 MeV in the heaviest elements, above 10 MeV in light ones |

Gamma rays from radioactive decay therefore interact mostly by Compton scattering.

**Attenuation.** The fractional intensity lost in a thin layer dx is proportional to dx:

$$
\frac{dI}{I} = -\mu\,dx \;\Rightarrow\; \ln\frac{I}{I_0} = -\mu x \;\Rightarrow\; I = I_0e^{-\mu x}, \qquad x = \frac{\ln(I_0/I)}{\mu}
$$

μ is the linear attenuation coefficient; it depends on the photon energy and the material. The half-value thickness is ln 2/μ.

**Example 2.7 (Beiser).** 2.0 MeV gammas in water, μ = 4.9 m⁻¹. After 10 cm: $I/I_0 = e^{-0.49} = 0.61$. To cut to 1%: $x = \ln 100/4.9 = 0.94$ m.

## 2.9 Photons and gravity

**Photon "mass".** A photon has no rest mass but has momentum $p = h\nu/c$ and speed c, so it behaves as if it had inertial mass

$$
m = \frac{p}{v} = \frac{h\nu}{c^2}
$$

By the equivalence principle gravitational mass equals inertial mass, so a photon is pulled by gravity like a mass hν/c². (Beiser 1.10 gives the general-relativity view: light follows curved spacetime.)

**A falling photon.** A stone falling a height H gains energy mgH. A photon can't go faster than c, so it gains the energy as frequency. The change is tiny, so ignore the change in its "mass":

$$
h\nu' = h\nu + \frac{h\nu}{c^2}gH \quad\Rightarrow\quad \nu' = \nu\left(1 + \frac{gH}{c^2}\right)
$$

**Example 2.8 (Beiser).** Pound and Rebka (Harvard, 1960) used H = 22.5 m. For red light of 7.3 × 10¹⁴ Hz: $\Delta\nu = (gH/c^2)\nu = 1.8$ Hz. They actually used gamma rays.

**Gravitational red shift.** A photon leaving a star of mass M and radius R loses energy. On the surface its potential energy is $-GM(h\nu/c^2)/R$, so its total energy is

$$
E = h\nu - \frac{GMh\nu}{c^2R} = h\nu\left(1 - \frac{GM}{c^2R}\right)
$$

Far away the potential energy is zero and all of E is $h\nu'$. Energy is conserved, so

$$
\nu' = \nu\left(1 - \frac{GM}{c^2R}\right), \qquad \frac{\Delta\nu}{\nu} = \frac{\nu - \nu'}{\nu} = \frac{GM}{c^2R}
$$

- Visible light shifts toward red. This is not the Doppler red shift of receding galaxies.
- For the Sun GM/c²R is too small to see. For **white dwarfs** (about Earth's size with the Sun's mass) the shift is just measurable, and it has been seen.

**Black holes.** If GM/c²R reached 1, no photon could leave at all. When gravitational energy is comparable to total energy, general relativity is needed, and the correct condition is GM/c²R = ½. The **Schwarzschild radius**

$$
R_S = \frac{2GM}{c^2}
$$

- A body whose mass is all inside R\_S is a black hole; its boundary is the **event horizon**, where the escape speed equals c. For the Sun's mass R\_S = 3 km.
- Detection: a black hole in a double-star system pulls on its partner, and matter falling in is heated until it emits x-rays (Cygnus X-1: about 8 solar masses, radius perhaps 10 km). Galactic centres hold black holes of up to about 10⁹ solar masses.
- **Quasars (box)**: point-like, intense radio and light sources, believed to be powered by black holes of 10⁸ solar masses or more swallowing stars.

## What to be able to do without notes

- State which experiments show light as a wave (Young's slits, x-ray diffraction) and which as a particle (blackbody, photoelectric, Compton, pair production), with one line on why for each.
- Run the Rayleigh–Jeans argument (mode count 8πν²/c³ times kT), say why it diverges, and show both limits of Planck's formula.
- Quote Planck's oscillator energies nhν and the average energy hν/(e^(hν/kT) − 1), and explain in words why it removes the catastrophe.
- List the three photoelectric findings, why waves fail, and how photons explain each. Use hν = KE\_max + φ and eV₀ = KE\_max.
- Derive λ\_min = hc/eV and Bragg's law 2d sin θ = nλ.
- Derive the Compton shift in about 12 lines.
- Show pair production needs a nucleus; give the 1.02 MeV threshold and the annihilation photon energies.
- Use I = I₀e^(−μx), hν′ = hν(1 + gH/c²), Δν/ν = GM/c²R and R\_S = 2GM/c².

# Coverage: Particle properties of waves

Every section and example of Beiser ch 2 and every slide frame on light (`QM.tex:1` to `:136`), with where it is on this site. "Reference" means the *Reference* page of this chapter; "HW practice" means *HW practice: Beiser chapters 2 and 3*.

## Beiser ch 2

| Beiser | Topic | Where on the site |
| --- | --- | --- |
| 2.1 | Electromagnetic waves, Maxwell, Young, polarisation | Reference 2.1; Learn "Light as a wave" |
| 2.2 | Blackbody radiation: mode counting, Rayleigh–Jeans, Planck, Wien, Stefan–Boltzmann | Reference 2.2 (full derivation of ε̄ and both laws) |
| Ex 2.1 | Energy quantum of a 660 Hz tuning fork | Reference 2.2; HW practice |
| 2.3 | Photoelectric effect: three findings, Einstein, work functions | Reference 2.3 |
| Ex 2.2 | 350 nm light on potassium: electrons per second, KE | Reference 2.3; HW practice |
| 2.4 | What is light? (wave–particle duality) | Reference 2.4; Learn "Wave–particle duality" |
| 2.5 | X-rays: production, λ\_min | Reference 2.5 |
| Ex 2.3 | Shortest wavelength from a 50 kV X-ray tube | Reference 2.5; HW practice |
| 2.6 | X-ray diffraction, Bragg's law | Reference 2.6 (derivation) |
| 2.7 | Compton effect | Reference 2.7 (full derivation, eqs 2.14 to 2.21) |
| Ex 2.4 | 10.0 pm X-rays scattered through 45° | Reference 2.7; HW practice |
| 2.8 | Pair production and annihilation, absorption | Reference 2.8 |
| Ex 2.5, 2.6, 2.7 | No pair production in empty space; annihilation of a moving pair; attenuation in water | Reference 2.8; HW practice |
| 2.9 | Photons and gravity, gravitational red shift, black holes | Reference 2.9 |
| Ex 2.8 | Pound–Rebka: frequency gain of a falling photon | Reference 2.9; HW practice |

## Slides

| Frame (`QM.tex`) | Where on the site |
| --- | --- |
| `:1` Light, `:13` Light in vacuum, `:30` colour and wavelength | Reference 2.1 |
| `:42` Blackbody, `:56` Planck | Reference 2.2 (includes the slides' I(ν) = (c/4π)u relation) |
| `:67` Photoelectric | Reference 2.3 |
| `:82` X-ray | Reference 2.5 and 2.6 |
| `:107` Compton | Reference 2.7 |
| `:119` Summary on light | Reference 2.4 and "What to be able to do without notes" |

Nothing in Beiser ch 2 is dropped by the course.

# Formulas: Particle properties of waves

## Light as a wave

$$c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} = \nu\lambda,\qquad \vec E = \vec E_0\,e^{i(kz - \omega t)}$$

## Blackbody radiation

$$\boxed{\frac{P}{A} = \sigma T^4,\qquad \lambda_\text{max}T = 2.898\times10^{-3}\ \text{m K}}\qquad(\sigma = 5.67\times10^{-8}\ \text{W m}^{-2}\text{K}^{-4})$$

Planck: an oscillator of frequency $\nu$ has energies $E = nh\nu$, so

$$\boxed{u(\nu)\,d\nu = \frac{8\pi h}{c^3}\,\frac{\nu^3\,d\nu}{e^{h\nu/kT} - 1}},\qquad \bar\varepsilon = \frac{h\nu}{e^{h\nu/kT} - 1}$$

Limits: $h\nu \ll kT$ gives $\bar\varepsilon \to kT$ (Rayleigh–Jeans); $h\nu \gg kT$ gives $\bar\varepsilon \approx h\nu\,e^{-h\nu/kT}$.

## Photoelectric effect

$$\boxed{h\nu = KE_\text{max} + \phi,\qquad \phi = h\nu_0,\qquad eV_0 = KE_\text{max}}$$

Photon: $E = h\nu = pc$, $p = h/\lambda$.

## X-rays

$$\boxed{\lambda_\text{min} = \frac{hc}{eV} = \frac{1.24\times10^{-6}\ \text{V m}}{V}},\qquad \boxed{2d\sin\theta = n\lambda}\quad(n = 1, 2, \dots)$$

## Compton scattering

Conserve $x$- and $y$-momentum and total energy (relativistic electron):

$$\boxed{\lambda' - \lambda = \frac{h}{m_ec}(1 - \cos\phi) = \lambda_C(1 - \cos\phi),\qquad \lambda_C = 2.426\ \text{pm}}$$

Maximum shift $2\lambda_C$ at $\phi = 180^\circ$; no shift at $\phi = 0$.

## Pair production and absorption

$$h\nu \ge 2m_ec^2 = 1.02\ \text{MeV},\qquad I = I_0\,e^{-\mu x}$$

Photoelectric effect dominates at low energy, Compton at medium, pair production above a few MeV.

## Photons and gravity

$$m_\text{grav} = \frac{h\nu}{c^2},\qquad \frac{\Delta\nu}{\nu} \approx \frac{GM}{Rc^2}\ \text{(gravitational red shift)}$$

## Constants

| Quantity | Value |
|---|---|
| $hc$ | $1240\ \text{eV nm}$ |
| $h$ | $4.14\times10^{-15}\ \text{eV s} = 6.63\times10^{-34}\ \text{J s}$ |
| $m_ec^2$ | $0.511\ \text{MeV}$ |
| $e$ | $1.602\times10^{-19}\ \text{C}$, so $1\ \text{eV} = 1.602\times10^{-19}\ \text{J}$ |
| $k_B$ | $8.62\times10^{-5}\ \text{eV K}^{-1}$ |

# Practice: Particle properties of waves

31 questions with worked answers (tap a solution to open it). These follow the style of your past papers (2025 and 2026 midsems, Quiz-1, the `sci_midsem.pdf` thermo answers) and the homework list. Expect short "state / explain / show" items for 2–3 points, derivations for 4–6 points, and estimates with round numbers, because no calculator is allowed. Points are shown in brackets. Answers are in the next section; try each question first.

## A. State and explain

### Problem 1 [QM 1 · Recall · 2 pts]

State the Stefan–Boltzmann law and Wien's displacement law. What does each tell you about a hotter blackbody?

*Solution.* **Stefan–Boltzmann law.** Total power radiated per unit area by a blackbody:

$$\frac PA = \sigma T^4,\qquad \sigma = 5.67\times10^{-8}\ \text{W m}^{-2}\text{K}^{-4}$$

Doubling $T$ gives $16$ times the power.

**Wien's displacement law.** The wavelength of peak emission:

$$\lambda_\text{max}T = 2.898\times10^{-3}\ \text{m K}$$

**A hotter blackbody** radiates **much more** power (as $T^4$) and its spectrum peaks at a **shorter wavelength** (so it glows from red to white to blue).

### Problem 2 [QM 1 · Recall · 3 pts]

What is the ultraviolet catastrophe? How did Planck's hypothesis remove it?

*Solution.* **The catastrophe.** Classically every cavity mode gets energy $kT$ (equipartition), and the number of modes per unit frequency grows as $\nu^2$:

$$u(\nu) = \frac{8\pi\nu^2}{c^3}kT\ \to\ \infty\quad\text{as }\nu\to\infty$$

The predicted energy density (and total power) diverges in the ultraviolet, in contradiction with experiment.

**Planck's fix.** Allow a mode of frequency $\nu$ to have only energies $E = nh\nu$.

- At high $\nu$, one quantum $h\nu \gg kT$ is rarely supplied by thermal motion, so these modes are almost **never excited**.
- $u(\nu)$ therefore turns over and falls to zero:

$$u(\nu) = \frac{8\pi h\nu^3}{c^3}\frac1{e^{h\nu/kT} - 1}$$

### Problem 3 [QM 1 · Recall · 3 pts]

List three observations of the photoelectric effect that the wave theory of light cannot explain.

*Solution.* **Three observations wave theory cannot explain** (any three):

1. **No time delay.** Electrons are emitted almost instantly (within $10^{-9}$ s), even for very dim light. A wave would need time to build up the energy.
2. **$K_\text{max}$ is independent of intensity.** Brighter light gives more electrons, not faster ones. A wave's energy grows with intensity.
3. **Threshold frequency.** Below $\nu_0$ there is no emission at any intensity.
4. **$K_\text{max}$ rises linearly with $\nu$**, independent of intensity.

**Explanation.** Light arrives in quanta of energy $h\nu$, and one photon ejects one electron.

### Problem 4 [QM 1 · Recall · 2 pts]

State Einstein's photoelectric equation and define every symbol.

*Solution.* **Einstein's photoelectric equation.**

$$h\nu = K_\text{max} + \phi$$

- $h\nu$: energy of one photon (frequency $\nu$).
- $K_\text{max}$: largest kinetic energy of an emitted electron ($= eV_0$, with $V_0$ the stopping potential).
- $\phi$: **work function**, the minimum energy needed to free an electron from the surface.

**Consequence.** Emission needs $h\nu \ge \phi$, so the threshold is $\nu_0 = \phi/h$.

### Problem 5 [QM 1 · Recall · 2 pts]

Why does doubling the intensity of light double the photocurrent but leave the stopping potential unchanged?

*Solution.* **Intensity** is the number of photons arriving per second (each of energy $h\nu$).

- **Doubling the intensity** doubles the number of photons, so twice as many electrons are freed: the **photocurrent doubles**.
- Each photon still carries the same $h\nu$, so each electron gets the same $K_\text{max} = h\nu - \phi$. The stopping potential $V_0 = K_\text{max}/e$ is **unchanged**.

**To change $V_0$** you must change the frequency, not the brightness.

### Problem 6 [QM 1 · Recall · 2 pts]

What is meant by wave–particle duality of light? Name one experiment for each side.

*Solution.* **Wave–particle duality.** Light shows **wave** behaviour when it propagates and **particle** behaviour when it exchanges energy with matter.

| aspect | evidence | experiment |
|---|---|---|
| wave | interference, diffraction | Young's double slit; X-ray diffraction |
| particle | quanta of energy $h\nu$ and momentum $h/\lambda$ | photoelectric effect; Compton scattering |

**Complementarity.** An experiment shows one aspect or the other, **never both at once**. The wave describes where photons are likely to be; the particle describes how they are absorbed.

### Problem 7 [QM 1 · Recall · 2 pts]

Why is X-ray production called the inverse photoelectric effect?

*Solution.* **Photoelectric effect.** A photon is absorbed and its energy becomes the kinetic energy of an electron:

$$h\nu \to \phi + K$$

**X-ray tube.** An electron accelerated through $V$ arrives with energy $eV$ and, on striking the target, produces a photon:

$$eV \to h\nu_\text{max}$$

So the process is the photoelectric effect **in reverse**: electron kinetic energy becomes photon energy.

**Consequence.** The short-wavelength cutoff of the continuous spectrum is

$$\lambda_\text{min} = \frac{hc}{eV}$$

independent of the target material.

### Problem 8 [QM 1 · Recall · 2 pts]

State Bragg's law. Why can a crystal diffract X-rays but not visible light?

*Solution.* **Bragg's law.**

$$2d\sin\theta = n\lambda$$

**Why a crystal diffracts X-rays but not visible light.** Diffraction by a lattice is strong only when $\lambda$ is comparable to or smaller than the plane spacing $d$ (about $0.1$ nm). Condition: $\sin\theta = n\lambda/2d \le 1$ requires $\lambda \le 2d$.

- X-rays have $\lambda\approx0.1$ nm: **works**.
- Visible light has $\lambda = 400$ to $700$ nm, thousands of times larger than $d$: $\sin\theta > 1$, so there is **no** Bragg reflection.

### Problem 9 [QM 1 · Recall · 3 pts]

In Compton scattering, why does the scattered radiation have a longer wavelength? Why is the effect not seen with visible light?

*Solution.* **Why the wavelength increases.** The photon gives part of its energy and momentum to the electron it hits, which recoils. The scattered photon has **less energy**, therefore a **longer wavelength**:

$$\lambda' - \lambda = \frac h{m_ec}(1 - \cos\varphi) \ge 0$$

**Why visible light shows nothing.** The shift is at most $2h/m_ec = 4.85$ pm.

- For visible light ($\lambda\approx500$ nm) this is a fractional change of about $10^{-5}$: unmeasurable.
- For X-rays ($\lambda\approx10$ pm) it is about $50\%$: obvious.

**Also** the photon energy of visible light ($\sim2$ eV) is comparable to atomic binding energies, so the electrons are not free, unlike for X-rays.

### Problem 10 [QM 1 · Recall · 2 pts]

Why can pair production not happen in empty space?

*Solution.* **Why not in empty space.** A photon of energy $E$ has momentum $p = E/c$ (massless).

Suppose it turned into an electron–positron pair with the same total energy $E$. The pair has rest mass, so its total momentum is **less than** $E/c$:

$$p_\text{pair}c = \sqrt{E^2 - (2m_ec^2)^2} < E$$

Energy and momentum cannot both be conserved.

**With a nucleus.** A heavy nearby nucleus absorbs the extra momentum while taking almost no kinetic energy ($p^2/2M$ is tiny), so the process is allowed above the threshold $h\nu = 2m_ec^2 = 1.02$ MeV.

### Problem 11 [QM 1 · Recall · 2 pts]

What is gravitational red shift? Why does it suggest a photon has gravitational mass?

*Solution.* **Gravitational red shift.** Light climbing out of a gravitational field has its frequency **lowered** (it is shifted toward the red), even though its speed stays $c$.

**Why this suggests the photon has gravitational mass.** To climb a height $H$, a mass $m$ loses energy $mgH$. If the photon behaves the same way, with an effective mass $m = h\nu/c^2$ (from $E = mc^2$):

$$\Delta(h\nu) = -\frac{h\nu}{c^2}gH\ \Rightarrow\ \frac{\Delta\nu}\nu = -\frac{gH}{c^2}$$

**Experiment.** Pound and Rebka (1960) measured this shift over a $22.5$ m tower, about $2.5\times10^{-15}$, in agreement.

### Problem 12 [QM 1 · Recall · 2 pts]

Show that a photon of wavelength λ has momentum h/λ.

*Solution.* **Starting point.** For a massless particle the relativistic relation reduces to

$$E^2 = p^2c^2 + m^2c^4\ \xrightarrow{\ m=0\ }\ E = pc$$

**Photon.** $E = h\nu = hc/\lambda$. Then

$$pc = \frac{hc}\lambda\ \Rightarrow\ \boxed{p = \frac h\lambda}$$

**Check.** Same as de Broglie's $\lambda = h/p$, which therefore applies to both light and matter.

## B. Derive or show

### Problem 13 [QM 1 · Derivation · 4 pts]

Starting from u(ν) = (8πhν³/c³)/(e^(hν/kT) − 1), show that it reduces to the Rayleigh–Jeans law for hν ≪ kT. What happens for hν ≫ kT?

*Solution.* **Planck's law:**

$$u(\nu) = \frac{8\pi h\nu^3}{c^3}\,\frac1{e^{h\nu/kT} - 1}$$

**Low frequency** ($x = h\nu/kT \ll 1$). Expand $e^x - 1 \approx x$:

$$u(\nu) \approx \frac{8\pi h\nu^3}{c^3}\cdot\frac{kT}{h\nu} = \boxed{\frac{8\pi\nu^2kT}{c^3}}$$

the **Rayleigh–Jeans** law (classical equipartition).

**High frequency** ($x \gg 1$). $e^x - 1 \approx e^x$:

$$u(\nu) \approx \frac{8\pi h\nu^3}{c^3}\,e^{-h\nu/kT}$$

**Wien's** form: the exponential kills the growth, so $u \to 0$ as $\nu \to \infty$. This avoids the "ultraviolet catastrophe" of Rayleigh–Jeans, which grows as $\nu^2$ without limit.

### Problem 14 [QM 1 · Derivation · 5 pts]

Derive the Compton shift formula λ′ − λ = (h/mₑc)(1 − cosφ). State every conservation law you use.

*Solution.* **Setup.** A photon (wavelength $\lambda$) hits an electron at rest. The photon scatters at angle $\varphi$ with $\lambda'$; the electron recoils with momentum $p$ and energy $E_e$.

**Conservation laws used:** energy, and momentum (both components).

**Energy:** $\dfrac{hc}\lambda + mc^2 = \dfrac{hc}{\lambda'} + E_e$

**Momentum** (vector): $\mathbf p_\gamma = \mathbf p_\gamma' + \mathbf p_e$, so squaring,

$$p_e^2c^2 = (h\nu)^2 + (h\nu')^2 - 2h^2\nu\nu'\cos\varphi$$

**Eliminate the electron.** $E_e = h\nu - h\nu' + mc^2$, and $E_e^2 = p_e^2c^2 + m^2c^4$:

$$(h\nu - h\nu')^2 + 2mc^2h(\nu - \nu') + m^2c^4 = (h\nu)^2 + (h\nu')^2 - 2h^2\nu\nu'\cos\varphi + m^2c^4$$

The $\nu^2$ and $\nu'^2$ terms cancel:

$$2mc^2h(\nu - \nu') = 2h^2\nu\nu'(1 - \cos\varphi)\ \Rightarrow\ \frac{\nu - \nu'}{\nu\nu'} = \frac h{mc^2}(1 - \cos\varphi)$$

Multiply by $c$ and use $\lambda = c/\nu$:

$$\boxed{\lambda' - \lambda = \frac h{mc}(1 - \cos\varphi)}$$

**Check.** $\varphi = 0$ gives no shift; the maximum shift $2h/mc = 4.85$ pm is at $\varphi = 180^\circ$.

### Problem 15 [QM 1 · Derivation · 4 pts]

Using conservation of energy and momentum, show that a free electron cannot absorb a photon completely.

*Solution.* **Assume** a free electron at rest absorbs a photon completely, becoming a single electron of energy $E_e$ and momentum $p_e$.

**Conservation.**

- Energy: $h\nu + mc^2 = E_e$
- Momentum: $p_e = h\nu/c$

**Insert into** $E_e^2 = p_e^2c^2 + m^2c^4$:

$$(h\nu + mc^2)^2 = (h\nu)^2 + m^2c^4\ \Rightarrow\ 2h\nu\,mc^2 = 0$$

so $\nu = 0$: no photon. A free electron can only **scatter** a photon (Compton), never absorb it.

**Photoelectric effect.** The electron is bound: the lattice (a heavy partner) absorbs the extra momentum, so both conservation laws can be met.

### Problem 16 [QM 1 · Derivation · 4 pts]

Show that the minimum photon energy for pair production is 2mₑc² when a heavy nucleus is present, and explain why the nucleus takes almost no energy.

*Solution.* **Energy balance.**

$$h\nu = 2mc^2 + K_{e^+} + K_{e^-} + K_\text{nucleus}$$

**Momentum.** The nucleus (mass $M$) takes up the momentum $p \le h\nu/c$, with kinetic energy

$$K_\text{nucleus} = \frac{p^2}{2M} \le \frac{(h\nu)^2}{2Mc^2}$$

For $h\nu \approx 1$ MeV and a nucleus with $Mc^2 \sim 10^5$ MeV this is about $5$ eV, utterly negligible. Hence the threshold is

$$\boxed{h\nu_\text{min} = 2m_ec^2 = 1.02\ \text{MeV}}$$

**Why a nucleus is needed.** In free space the photon has $E = pc$, but a pair at rest has $E = 2mc^2$ and $p = 0$; no pair state has $E = pc$, so momentum and energy cannot both be conserved. The nucleus provides the missing momentum.

### Problem 17 [QM 1 · Derivation · 4 pts]

Derive Bragg's condition 2d sinθ = nλ from the path difference between rays reflected from two adjacent planes.

*Solution.* **Setup.** Two adjacent planes are a distance $d$ apart. A ray strikes at glancing angle $\theta$ (to the plane).

**Path difference.** The lower ray travels extra distance $d\sin\theta$ on the way in and $d\sin\theta$ on the way out:

$$\Delta = 2d\sin\theta$$

**Constructive interference** needs $\Delta$ to be a whole number of wavelengths:

$$\boxed{2d\sin\theta = n\lambda,\quad n = 1, 2, 3, \dots}$$

**Common mistake.** $\theta$ is measured from the **plane**, not from the normal.

### Problem 18 [QM 1 · Derivation · 3 pts]

Show that the stopping potential is a linear function of frequency. What are its slope and intercept?

*Solution.* **Einstein's photoelectric equation:**

$$h\nu = \phi + K_\text{max},\qquad K_\text{max} = eV_0$$

$$V_0 = \frac he\,\nu - \frac\phi e$$

A straight line in $V_0$ against $\nu$:

- **Slope** $= h/e$: the same for every metal (that is how Millikan measured $h$).
- **$\nu$-intercept** $= \nu_0 = \phi/h$ (threshold frequency).
- **$V$-intercept** $= -\phi/e$.

**Common mistake.** The slope does not depend on the metal; only the intercepts do.

## C. Numericals without a calculator

### Problem 19 [QM 1 · Numerical · 3 pts]

Light of wavelength 310 nm falls on a metal with work function 2.0 eV. Find KE\_max of the photoelectrons and the stopping potential.

*Solution.* **Idea.** Photoelectric equation: $h\nu = KE_\text{max} + \phi$, and $eV_0 = KE_\text{max}$. Use $hc = 1240$ eV nm.

$$E_\text{photon} = \frac{hc}{\lambda} = \frac{1240}{310} = 4.0\ \text{eV}$$

$$KE_\text{max} = 4.0 - 2.0 = \boxed{2.0\ \text{eV}},\qquad V_0 = \frac{KE_\text{max}}{e} = \boxed{2.0\ \text{V}}$$

### Problem 20 [QM 1 · Numerical · 3 pts]

The threshold wavelength for a metal is 620 nm. Find its work function in eV.

*Solution.* **Idea.** At threshold the photon energy just equals the work function: $\phi = h\nu_0 = hc/\lambda_0$.

$$\phi = \frac{1240\ \text{eV nm}}{620\ \text{nm}} = \boxed{2.0\ \text{eV}}$$

### Problem 21 [QM 1 · Numerical · 3 pts]

An X-ray tube runs at 40 kV. Find the cutoff wavelength.

*Solution.* **Idea.** The most energetic photon carries all the electron's energy $eV$, so $\lambda_\text{min} = hc/eV$.

$$\lambda_\text{min} = \frac{1240\ \text{eV nm}}{40\,000\ \text{eV}} = 0.031\ \text{nm} = \boxed{31\ \text{pm}}$$

### Problem 22 [QM 1 · Numerical · 3 pts]

X-rays of wavelength 0.1 nm reflect from a crystal at a first-order Bragg angle of 30°. Find the plane spacing d.

*Solution.* **Idea.** Bragg: $2d\sin\theta = n\lambda$ with $n = 1$.

$$d = \frac{n\lambda}{2\sin\theta} = \frac{0.1\ \text{nm}}{2(0.5)} = \boxed{0.1\ \text{nm}}$$

### Problem 23 [QM 1 · Numerical · 4 pts]

X-rays of wavelength 10.0 pm are Compton-scattered at 90°. Find the scattered wavelength and the kinetic energy given to the electron (in keV).

*Solution.* **Idea.** Compton shift $\Delta\lambda = \lambda_C(1 - \cos\phi)$ with $\lambda_C = 2.43$ pm. The electron's kinetic energy is the energy the photon loses.

$$\Delta\lambda = 2.43(1 - \cos90^\circ) = 2.43\ \text{pm}\ \Rightarrow\ \lambda' = 10.0 + 2.43 = \boxed{12.43\ \text{pm}}$$

$$E = \frac{1240}{0.0100} = 124\ \text{keV},\qquad E' = \frac{1240}{0.01243} \approx 100\ \text{keV}$$

$$KE_e = E - E' \approx \boxed{24\ \text{keV}}$$

### Problem 24 [QM 1 · Numerical · 3 pts]

What is the maximum Compton shift for scattering off an electron? Off a proton (m\_p ≈ 1836 mₑ)?

*Solution.* **Idea.** The maximum shift is at $\phi = 180^\circ$: $\Delta\lambda_\text{max} = 2\lambda_C = 2h/mc$, which is inversely proportional to the target mass.

**Electron:** $2\lambda_C = \boxed{4.85\ \text{pm}}$.

**Proton:** $\lambda_C = 2.43\ \text{pm}/1836 = 1.3\ \text{fm}$, so $\Delta\lambda_\text{max} \approx \boxed{2.6\ \text{fm}}$, far too small to measure. That is why Compton scattering is seen from electrons, not nuclei.

### Problem 25 [QM 1 · Numerical · 3 pts]

The Sun's surface is at about 5800 K. Estimate the wavelength of peak emission. What colour is that?

*Solution.* **Idea.** Wien's law: $\lambda_\text{max}T = 2.898\times10^{-3}$ m K.

$$\lambda_\text{max} = \frac{2.9\times10^{-3}}{5800} \approx 5\times10^{-7}\ \text{m} = \boxed{500\ \text{nm}}$$

That is blue-green (the peak of the visible band). The Sun looks white because it emits strongly across all visible wavelengths.

### Problem 26 [QM 1 · Numerical · 3 pts]

A 1.5 MeV gamma ray makes an electron–positron pair. What is their total kinetic energy?

*Solution.* **Idea.** Pair production needs the rest energy of two electron masses, $2m_ec^2 = 1.02$ MeV. The rest is kinetic energy.

$$KE_\text{total} = 1.5 - 1.02 = \boxed{0.48\ \text{MeV}}$$

shared between the electron and the positron.

### Problem 27 [QM 1 · Numerical · 3 pts]

Estimate how many photons per second a 1 mW red laser pointer (650 nm) emits.

*Solution.* **Idea.** Power = (energy per photon) × (photons per second).

$$E_\gamma = \frac{1240}{650} = 1.9\ \text{eV} = 1.9 \times 1.6\times10^{-19} \approx 3\times10^{-19}\ \text{J}$$

$$N = \frac{P}{E_\gamma} = \frac{10^{-3}}{3\times10^{-19}} \approx \boxed{3\times10^{15}\ \text{photons per second}}$$

## D. Estimate and discuss

### Problem 28 [QM 1 · Discussion · 3 pts]

Estimate the number of visible photons per second reaching your eye from a 100 W bulb 10 m away. State your assumptions.

*Solution.* **Assumptions.** $5\%$ of the $100$ W is emitted as visible light, so $P_\text{vis} = 5$ W; average photon energy about $2.5$ eV $= 4\times10^{-19}$ J; pupil diameter $4$ mm.

**Photons emitted.**

$$\dot N = \frac{5}{4\times10^{-19}} \approx 10^{19}\ \text{s}^{-1}$$

**Fraction reaching the eye.** Spread over a sphere of radius $10$ m, area $4\pi r^2 = 1.3\times10^3$ m$^2$. The pupil area is $\pi(2\times10^{-3})^2 = 1.3\times10^{-5}$ m$^2$:

$$\text{fraction} \approx \frac{1.3\times10^{-5}}{1.3\times10^{3}} = 10^{-8}$$

$$\boxed{\dot N_\text{eye} \approx 10^{19}\times10^{-8} = 10^{11}\ \text{photons/s}}$$

**Comment.** Light is "continuous" to the eye because so many photons arrive.

### Problem 29 [QM 1 · Discussion · 3 pts]

A detector shows electrons leaving a metal within 10⁻⁹ s of the light being switched on. Estimate how long the wave theory says it would take at an intensity of 10⁻⁶ W/m², assuming an electron absorbs over an area of one atom (about 10⁻²⁰ m²) and needs 2 eV.

*Solution.* **Wave-theory estimate.** On a classical wave, the energy absorbed by one atom is the intensity times the area it presents:

$$P = IA = (10^{-6}\ \text{W/m}^2)(10^{-20}\ \text{m}^2) = 10^{-26}\ \text{W}$$

**Time to collect $2$ eV** $= 3.2\times10^{-19}$ J:

$$t = \frac{3.2\times10^{-19}}{10^{-26}} \approx 3\times10^7\ \text{s} \approx 1\ \text{year}$$

**Observation.** Electrons emerge within $10^{-9}$ s.

**Conclusion.** Energy cannot arrive smoothly spread out; it must arrive in **lumps** (photons) that deliver $h\nu$ to a single electron at once.

### Problem 30 [QM 1 · Discussion · 4 pts]

Rank the photoelectric effect, Compton scattering and pair production by the photon energy at which each dominates in lead. Explain the ranking in one line each.

*Solution.* **Ranking by photon energy in lead.**

| process | dominates | reason |
|---|---|---|
| **Photoelectric** | below about $0.5$ MeV | the photon is absorbed whole by a bound electron; the cross-section falls steeply with energy |
| **Compton** | about $0.5$ to $5$ MeV | $h\nu$ far exceeds binding energies, so electrons act as free, and the photon is scattered |
| **Pair production** | above about $5$ MeV | needs $h\nu > 2m_ec^2 = 1.02$ MeV, and grows with energy and with $Z^2$ |

**Order of increasing energy:** photoelectric $<$ Compton $<$ pair production.

### Problem 31 [QM 1 · Discussion · 3 pts]

Explain, in your own words, why Planck himself thought quantisation was a mathematical trick, and what convinced physicists that it was real.

*Solution.* **Planck's view (1900).** He introduced $E = nh\nu$ only as a mathematical device to fit the blackbody curve, and hoped that a better classical theory would later remove it.

**What made it real.**

1. **Einstein (1905)** used light quanta of energy $h\nu$ to explain the photoelectric effect, including the threshold and the linear $K_\text{max}(\nu)$.
2. **Compton (1923)** showed that X-rays scatter from electrons as particles with energy $h\nu$ **and momentum** $h/\lambda$, which no wave theory can reproduce.

After that, quantisation was accepted as a real property of light, not a trick of the calculation.

