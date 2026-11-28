# Learn: Wave properties of particles

Moving particles behave as waves of wavelength $\lambda = h/p$. The wave says where the particle is likely to be found, and confining or localising that wave forces quantised energies and the uncertainty principle. This doc covers Beiser ch 3 (all of 3.1–3.9) and the slides `QM.tex:137` to `:223`.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## De Broglie waves

If light, long thought to be a wave, has particle properties, it is natural to ask whether particles have wave properties. De Broglie proposed in 1924 that they do. A photon of momentum $p$ has wavelength $\lambda = h/p$, and he suggested the same relation for any moving particle:

$$\boxed{\lambda = \frac{h}{p} = \frac{h}{\gamma mv}\ \approx\ \frac{h}{mv}\quad(v \ll c)},\qquad \lambda = \frac{h}{\sqrt{2m\,KE}}\ \ (\text{non-relativistic})$$

For everyday objects this wavelength is far too small to notice: $1\ \mu\text{g}$ at $1\ \mu\text{m/s}$ has $\lambda \sim 10^{-34}/(10^{-9}\cdot10^{-6}) = 10^{-20}\ \text{m}$, which is why we never see a cricket ball diffract. For an electron accelerated through a few tens of volts, however, it is about an ångström, the same size as the spacing of atoms in a crystal.

## The wave function

What kind of wave is this? It is not a disturbance of any medium, and it carries no energy of its own. The quantity that varies is the wave function $\Psi$, and its meaning is statistical:

$$\boxed{|\Psi(x, t)|^2\,dx = \text{probability of finding the particle in } [x, x + dx] \text{ at time } t}$$

A large $|\Psi|^2$ means the particle is likely to be found there, a small one that it is unlikely, but in any single measurement the particle is found at one definite point. A one-dimensional wave is written $A\cos(kx - \omega t)$ with $k = 2\pi/\lambda$ and $\omega = 2\pi\nu$.

## Phase and group velocity

A difficulty appears as soon as we try to calculate the speed of these waves. A single wave travels at the phase velocity $v_p = \nu\lambda = \omega/k$. Using $E = h\nu = \gamma mc^2$ and $\lambda = h/\gamma mv$:

$$\omega = \frac{2\pi\gamma mc^2}{h},\qquad k = \frac{2\pi\gamma mv}{h}\quad\Longrightarrow\quad \boxed{v_p = \frac{\omega}{k} = \frac{c^2}{v} > c}$$

The answer is that a particle is not one wave of one wavelength, which would fill all space, but a **wave group** formed by adding waves of slightly different wavelengths. Adding just two:

$$A\cos(\omega t - kx) + A\cos\big((\omega + \Delta\omega)t - (k + \Delta k)x\big) \approx 2A\cos(\omega t - kx)\cos\left(\frac{\Delta\omega}{2}t - \frac{\Delta k}{2}x\right)$$

The second factor is the envelope, and it moves at the group velocity. For de Broglie waves:

$$\boxed{v_g = \frac{d\omega}{dk} = \frac{d\omega/dv}{dk/dv} = v}$$

The group moves at the particle's speed. The individual crests move faster than the group, but nothing physical travels with them. (Note $v_pv_g = c^2$.)

## Electron diffraction

The wave nature of electrons was confirmed by Davisson and Germer in 1927. They directed $54\ \text{eV}$ electrons at a nickel crystal and found a strong reflected beam at $50^\circ$ to the incident beam, where Bragg's law predicts a maximum. With the slides' numbers:

$$\begin{gathered}\text{Bragg: } d = 0.091\ \text{nm},\ \theta = 65^\circ\ \Rightarrow\ \lambda = 2d\sin\theta = 0.165\ \text{nm} \\[4pt] \text{de Broglie: } \lambda = \frac{h}{\sqrt{2m\,KE}} = 0.166\ \text{nm}\end{gathered}$$

Electrons, neutrons and even whole atoms have since been diffracted (and show double-slit interference), and electron microscopes rely on the short wavelength of fast electrons to resolve detail far finer than visible light allows.

## Particle in a box

The wave picture also explains why a confined particle can have only certain energies. In a box of width $L$ with impenetrable walls, the wave function must vanish at the walls, like a string fixed at both ends. Only whole numbers of half-wavelengths fit:

$$\lambda_n = \frac{2L}{n}\ \Rightarrow\ p_n = \frac{nh}{2L}\ \Rightarrow\ \boxed{E_n = \frac{n^2h^2}{8mL^2}},\quad n = 1, 2, 3, \dots$$

The energy is quantised, and the lowest value $E_1 = h^2/8mL^2$ is not zero. A trapped particle can never be completely at rest.

![Particle in a box wave functions and tunnelling](fig/box-tunnelling.svg)

*Figure. Left and middle: the first three standing waves and their probability densities. Right: a wave function tunnelling through a barrier.*

## The uncertainty principle

The wave nature of matter leads directly to the uncertainty principle. A wave group confined to a small region $\Delta x$ must be built from waves with a wide range of wave numbers $\Delta k$; waves always obey $\Delta x\,\Delta k \ge \tfrac12$. With $k = 2\pi p/h = p/\hbar$:

$$\boxed{\Delta x\,\Delta p \ge \frac{\hbar}{2}}\qquad(\text{Heisenberg, 1927})$$

It is impossible to know both the position and the momentum of a particle precisely at the same time. This is not a limitation of our instruments: it is a property of waves, and so of matter itself. Heisenberg illustrated it with a thought experiment. To locate an electron with a microscope we must bounce at least one photon off it, and to locate it precisely we need short wavelengths. But a short-wavelength photon carries a large momentum, part of which it transfers to the electron in an amount we cannot know. The better we fix the position, the more we disturb the momentum.

## Energy and time

A similar relation connects energy and time. To measure an energy to within $\Delta E$ we need a wave group whose frequency is defined to within $\Delta\nu = \Delta E/h$, and that requires the group to last at least about $1/\Delta\nu$:

$$\boxed{\Delta E\,\Delta t \ge \frac{\hbar}{2}}$$

An excited state that lives only a short time therefore has an energy that is not sharply defined, and its spectral lines have a natural width. The uncertainty principle also gives quick estimates. An electron confined within a nucleus of size $10^{-14}\ \text{m}$ would need $\Delta p \gtrsim \hbar/2\Delta x$ and hence a kinetic energy of many MeV, far more than nuclear electrons are ever observed to have, so electrons cannot be constituents of nuclei.

# Reference: Wave properties of particles

Beiser ch 3 section by section, with each derivation written out, the numbers worth knowing, and what the slides (`QM.tex:137` to `:223`) add. Beiser's in-chapter examples are summarised with their answers; full worked versions are in *HW practice: Beiser chapters 2 and 3*.

## 3.1 De Broglie waves

**Idea.** A photon of momentum p has wavelength λ = h/p (2.4). De Broglie (1924) proposed that the same relation holds for every moving body:

$$
\lambda = \frac{h}{p} = \frac{h}{\gamma m v}, \qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \qquad (\gamma \approx 1 \text{ for } v \ll c)
$$

- The greater the momentum, the shorter the wavelength.
- As with light, the wave and particle aspects are never seen at the same time. Which one shows depends on how λ compares with the size of the body and of whatever it meets.
- De Broglie had no direct evidence, but he showed his waves explain Bohr's quantisation of hydrogen orbits (4.4). Electron diffraction confirmed the idea in 1927 (3.5).
- **Slides (`QM.tex:137`).** Inspired by light's duality; Einstein strongly supported it; electrons diffract from crystals like x-rays and show double-slit fringes; Schrödinger then found the wave equation for these waves (1926), the quantum counterpart of F = ma.

**Electron accelerated through V volts** (non-relativistic, KE = eV ≪ mc²):

$$
p = \sqrt{2m\,KE} = \sqrt{2meV}, \qquad \lambda = \frac{h}{\sqrt{2meV}} = \frac{6.626\times10^{-34}}{\sqrt{2(9.109\times10^{-31})(1.602\times10^{-19})}}\frac{1}{\sqrt V} \approx \frac{1.226}{\sqrt V}\ \text{nm}
$$

At 100 V, λ ≈ 0.12 nm, the size of atomic spacings. When KE is not small compared with mc², use $pc = \sqrt{KE^2 + 2KE\,mc^2}$ and λ = hc/pc.

**Example 3.1 (Beiser).** A 46 g golf ball at 30 m/s: λ = 4.8 × 10⁻³⁴ m, far too small for any wave effect. An electron at 10⁷ m/s: λ = 7.3 × 10⁻¹¹ m, comparable to the hydrogen atom's radius of 5.3 × 10⁻¹¹ m. That is why the electron's wave nature is the key to atomic structure.

**Example 3.2 (Beiser).** A proton with λ = 1.000 fm (about its own diameter). pc = hc/λ = 1.240 GeV, larger than its rest energy 0.938 GeV, so the calculation must be relativistic: $E = \sqrt{0.938^2 + 1.240^2}$ GeV = 1.555 GeV and KE = E − E₀ = 617 MeV.

**Matter waves on the slides (`QM.tex:163`).** A 1 μg mass at 1 μm/s has p = 10⁻¹⁵ kg m/s and λ = 6.6 × 10⁻³⁴/10⁻¹⁵ ≈ 7 × 10⁻¹⁹ m (the slide rounds h to 10⁻³⁴ and prints 10⁻²⁰ m; either way it is absurdly small). Wave effects belong to the regime of small mass and momentum, though the slide notes that some macroscopic systems show them too.

## 3.2 Waves of what?

- In water waves the height varies, in sound the pressure, in light the fields. In matter waves the quantity that varies is the **wave function Ψ**. Its value at x, y, z, t is related to the likelihood of finding the body there then.
- **Ψ itself has no direct physical meaning.** A probability must lie between 0 and 1, but a wave amplitude can be negative (or complex), and a negative probability means nothing.
- **Born (1926):** the probability of finding the body at x, y, z at time t is proportional to |Ψ|² there. |Ψ|² is the **probability density**. For complex Ψ, $|\Psi|^2 = \Psi^*\Psi$.
- Large |Ψ|² means the body is likely to be found; small means unlikely; as long as |Ψ|² is not exactly 0 somewhere, there is some chance of finding it there.
- **The probability is spread out, the particle is not.** A detector finds a whole electron or none; there is no "20 percent of an electron", only a 20 percent chance.
- For a large number of identical bodies with the same Ψ, the actual number per unit volume is proportional to |Ψ|², just as photon density is proportional to $\overline{E^2}$ for light (2.4).
- W. L. Bragg's picture: "Everything in the future is a wave, everything in the past is a particle", with "now" being the moment of measurement.
- How to calculate Ψ is the subject of ch 5.

## 3.3 Describing a wave

**De Broglie phase velocity.** Use $v_p = \nu\lambda$. The wavelength is $\lambda = h/\gamma mv$. For the frequency, set the quantum energy equal to the relativistic total energy, $h\nu = \gamma mc^2$, so $\nu = \gamma mc^2/h$. Then

$$
v_p = \nu\lambda = \frac{\gamma mc^2}{h}\cdot\frac{h}{\gamma mv} = \frac{c^2}{v}
$$

Since v < c, **de Broglie waves always travel faster than light**. Section 3.4 resolves this.

**Building the wave formula.** Take a string along x, vibrating in y with simple harmonic motion. Choose t = 0 when the point x = 0 is at maximum displacement:

$$
y = A\cos 2\pi\nu t \qquad (x = 0)
$$

A wave moving in +x at speed v\_p reaches x after a delay x/v\_p, so y at (x, t) equals y at x = 0 at the earlier time t − x/v\_p:

$$
y = A\cos 2\pi\nu\left(t - \frac{x}{v_p}\right) = A\cos 2\pi\left(\nu t - \frac{x}{\lambda}\right) \qquad (v_p = \nu\lambda)
$$

**Angular frequency and wave number.**

$$
\omega = 2\pi\nu \ \text{(rad/s)}, \qquad k = \frac{2\pi}{\lambda} = \frac{\omega}{v_p} \ \text{(rad/m)}, \qquad y = A\cos(\omega t - kx)
$$

- k is the number of radians in a wave train 1 m long.
- In 3-D, k becomes a vector normal to the wave fronts and kx becomes **k**·**r**.
- A wave moving in −x is $A\cos(\omega t + kx)$. The slides write $A\cos(kx + \omega t)$, which is this −x wave; for +x use kx − ωt.
- For a de Broglie wave, $k = 2\pi/\lambda = 2\pi p/h = p/\hbar$ and $\omega = 2\pi E/h = E/\hbar$.

## 3.4 Phase and group velocities

**Idea.** A single wave $A\cos(\omega t - kx)$ has the same amplitude everywhere, so it can't describe a particle that is more likely in one place than another. A particle is a **wave group** (wave packet): many waves of slightly different wavelength that reinforce in one region and cancel elsewhere.

**Beats.** Two sound waves of 440 Hz and 442 Hz together sound like 441 Hz whose loudness rises and falls twice a second. That is a series of wave groups.

**Dispersion.** If all component waves travel at the same phase velocity, the group moves with them. If the phase velocity depends on wavelength (**dispersion**), the group moves at a different speed. De Broglie waves are dispersive.

### Group velocity of two waves

Take two waves of equal amplitude A whose angular frequencies differ by Δω and wave numbers by Δk:

$$
y_1 = A\cos(\omega t - kx), \qquad y_2 = A\cos[(\omega + \Delta\omega)t - (k + \Delta k)x]
$$

Use $\cos\alpha + \cos\beta = 2\cos\tfrac12(\alpha+\beta)\cos\tfrac12(\alpha-\beta)$ and $\cos(-\theta) = \cos\theta$:

$$
y = y_1 + y_2 = 2A\cos\tfrac12[(2\omega + \Delta\omega)t - (2k + \Delta k)x]\,\cos\tfrac12(\Delta\omega\,t - \Delta k\,x)
$$

Since Δω ≪ ω and Δk ≪ k, replace 2ω + Δω by 2ω and 2k + Δk by 2k:

$$
y = 2A\cos(\omega t - kx)\,\cos\left(\frac{\Delta\omega}{2}t - \frac{\Delta k}{2}x\right) \tag{3.10}
$$

A fast wave of angular frequency ω and wave number k, modulated by a slow envelope of angular frequency Δω/2 and wave number Δk/2 (the slides' frame `QM.tex:177` shows this). The crests move at the phase velocity, the envelope at the group velocity:

$$
v_p = \frac{\omega}{k}, \qquad v_g = \frac{\Delta\omega}{\Delta k} \;\to\; v_g = \frac{d\omega}{dk} \ \text{(continuous spread of } \omega, k\text{)}
$$

v\_g can be larger or smaller than v\_p depending on how v\_p varies with k. With no dispersion (light in vacuum) v\_g = v\_p.

**A quick uncertainty preview.** The envelope in (3.10) goes from one zero to the next over $\Delta x = 2\pi/\Delta k$, so $\Delta x\,\Delta k \approx 2\pi$. A narrower group needs a wider spread of k. This is the seed of 3.7.

### Group velocity of de Broglie waves

For a body of mass m and speed v (slides `QM.tex:193`):

$$
\omega = 2\pi\nu = \frac{2\pi\gamma mc^2}{h} = \frac{2\pi mc^2}{h\sqrt{1 - v^2/c^2}}, \qquad k = \frac{2\pi}{\lambda} = \frac{2\pi\gamma mv}{h} = \frac{2\pi mv}{h\sqrt{1 - v^2/c^2}}
$$

Both depend on v, so $v_g = \dfrac{d\omega}{dk} = \dfrac{d\omega/dv}{dk/dv}$. Using $\dfrac{d}{dv}(1 - v^2/c^2)^{-1/2} = \dfrac{v}{c^2}(1 - v^2/c^2)^{-3/2}$:

$$
\frac{d\omega}{dv} = \frac{2\pi mv}{h(1 - v^2/c^2)^{3/2}}
$$

and, by the product rule,

$$
\frac{d}{dv}\left[\frac{v}{(1 - v^2/c^2)^{1/2}}\right] = \frac{1}{(1 - v^2/c^2)^{1/2}} + \frac{v^2/c^2}{(1 - v^2/c^2)^{3/2}} = \frac{1}{(1 - v^2/c^2)^{3/2}} \quad\Rightarrow\quad \frac{dk}{dv} = \frac{2\pi m}{h(1 - v^2/c^2)^{3/2}}
$$

Divide:

$$
v_g = v, \qquad v_p = \frac{\omega}{k} = \frac{c^2}{v}, \qquad v_pv_g = c^2
$$

- **The group moves with the body.** The group, not the individual crests, corresponds to the particle, and v\_g < c. v\_p > c has no physical meaning (no energy or information travels with a crest), so relativity is not violated.
- A check without relativity (beyond Beiser): with $E = p^2/2m$, $\omega = \hbar k^2/2m$, so $v_g = d\omega/dk = \hbar k/m = v$ again, while $v_p = v/2$. The phase velocity changes with what you count as the energy (with or without rest energy); the group velocity does not. That is another sign v\_p is not physical.

**Example 3.3 (Beiser).** An electron with λ = 2.00 pm. pc = hc/λ = 620 keV; $E = \sqrt{511^2 + 620^2}$ keV = 803 keV, so KE = 292 keV. From $E = E_0/\sqrt{1 - v^2/c^2}$, $v = c\sqrt{1 - (511/803)^2} = 0.771c$. Then v\_p = c²/v = 1.30c and v\_g = 0.771c.

**Electron microscope (box).** Diffraction limits any microscope to detail about the size of the wavelength used. Visible light gives a useful magnification of about 500 and a resolution of about 200 nm. Fast electrons have much shorter wavelengths and are focused by magnetic "lenses" (current-carrying coils) in an evacuated column, with a thin specimen. 100 keV electrons have λ = 0.0037 nm; lens imperfections limit the real resolution to about 0.1 nm, still allowing magnifications above 1,000,000.

## 3.5 Particle diffraction

**Who.** Davisson and Germer (US) and G. P. Thomson (England), independently in 1927. (J. J. Thomson, G. P.'s father, had won a Nobel Prize for showing the electron is a particle.)

**The experiment (Fig. 3.6, slides `QM.tex:147`).** An electron gun sends a beam of known energy onto a nickel target; a movable detector measures the scattered intensity against angle. Classically the intensity should vary only gently with angle and hardly at all with energy, and at first that is what they found.

**The accident.** Air leaked in and oxidised the nickel. To remove the oxide they baked the target in a hot oven. Afterward the scattered intensity showed sharp maxima and minima whose positions depended on the electron energy (polar plots at 40 to 68 V, Fig. 3.7). Heating had fused the many small crystals of the block into one large crystal, a regular lattice that diffracts the electron waves like x-rays.

**The numbers.** 54 eV electrons at normal incidence gave a sharp peak at 50° from the incoming beam. The Bragg planes responsible are tilted to the surface, so relative to them the angles of incidence and scattering are both 65° (and 180° − 2 × 65° = 50°). Their spacing, measured by x-ray diffraction, is d = 0.091 nm. Bragg's law with n = 1:

$$
\lambda = 2d\sin\theta = 2(0.091\ \text{nm})\sin 65^\circ = 0.165\ \text{nm}
$$

De Broglie's prediction (KE = 54 eV ≪ mc², so γ ≈ 1):

$$
p = \sqrt{2m\,KE} = \sqrt{2(9.1\times10^{-31})(54)(1.6\times10^{-19})} = 4.0\times10^{-24}\ \text{kg m/s}, \qquad \lambda = \frac{h}{p} = 0.166\ \text{nm}
$$

Agreement to better than 1%: direct proof of de Broglie waves.

- **Equivalent surface-grating view.** The surface rows of atoms are D = 0.215 nm apart and act as a reflection grating: $D\sin 50^\circ = 0.215 \times 0.766 = 0.165$ nm. Same answer, since d = D sin 25°.
- **Complications.** Electrons gain energy equal to the work function on entering the crystal, so the wavelength inside is a little shorter; and diffraction from different families of planes interferes, so maxima appear only for certain combinations of energy and angle.
- Neutrons and whole atoms have since been diffracted too; neutron diffraction, like x-ray and electron diffraction, is used to study crystal structures.

## 3.6 Particle in a box

**Model.** A particle moves back and forth along a line between two infinitely hard walls a distance L apart. It loses no energy at the walls, and its speed is non-relativistic. Ch 5 solves this properly; the wave picture already gives the energies.

**Standing waves.** Like a string tied at both ends, the wave function must be zero at each wall. Only a whole number of half-wavelengths fit:

$$
\lambda_n = \frac{2L}{n}, \qquad n = 1, 2, 3, \dots \qquad (\lambda = 2L,\ L,\ 2L/3, \dots)
$$

**Energies.** The particle has no potential energy inside, so its energy is kinetic:

$$
KE = \tfrac12 mv^2 = \frac{(mv)^2}{2m} = \frac{h^2}{2m\lambda^2} \quad\Rightarrow\quad E_n = \frac{h^2}{2m}\cdot\frac{n^2}{4L^2} = \frac{n^2h^2}{8mL^2}, \qquad n = 1, 2, 3, \dots
$$

Each allowed energy is an **energy level**, and n is its **quantum number**.

**Three conclusions** (true for any confined particle, such as an electron held by a nucleus):

1. **A trapped particle can't have any energy it likes.** Confinement restricts the wave function, which restricts the energy to certain values that depend on the mass and on how it is trapped.
2. **A trapped particle can't have zero energy.** v = 0 would mean infinite λ, which can't fit in the box. Zero is excluded; the lowest energy is $E_1 = h^2/8mL^2$. No classical counterpart.
3. **Quantisation is noticeable only when m and L are small**, because h is so small.

**Example 3.4 (Beiser).** An electron in a box 0.10 nm wide: $E_n = 6.0\times10^{-18}n^2$ J = 38n² eV. So E₁ = 38 eV, E₂ = 152 eV, E₃ = 342 eV, E₄ = 608 eV. Quantisation is prominent.

**Example 3.5 (Beiser).** A 10 g marble in a box 10 cm wide: $E_n = 5.5\times10^{-64}n^2$ J. At n = 1 the speed is 3.3 × 10⁻³¹ m/s, indistinguishable from rest. A realistic 1/3 m/s needs n ≈ 10³⁰, and the levels are far too close to tell apart. Newtonian mechanics works in everyday life.

## 3.7 Uncertainty principle I (wave view)

**Idea.** A narrow wave group (Fig. 3.12a) fixes the position well, but has too few waves to define λ, so the momentum h/λ is spread over a wide range. A wide group (Fig. 3.12b) has a well-defined λ and momentum, but the position is spread out.

> It is impossible to know both the exact position and exact momentum of an object at the same time. (Heisenberg, 1927)

**Fourier picture.** A single isolated group of any shape is a superposition of infinitely many harmonic waves with different k and amplitudes:

$$
\psi(x) = \int_0^\infty g(k)\cos kx\,dk
$$

g(k) is the **Fourier transform** of ψ(x); it describes the group just as completely. A short pulse needs a broad g(k); a long wave train a narrow one; an infinite train a single k (Fig. 3.14). For a group of finite length Δx, the appreciable amplitudes lie within a finite spread Δk, and the narrower the group the wider Δk.

**The bound.** The product ΔxΔk depends on the shape of the group. It is smallest for a **Gaussian** envelope, whose Fourier transform is also Gaussian; with Δx and Δk as standard deviations, the minimum is ½. In general

$$
\Delta x\,\Delta k \ge \tfrac12
$$

(The slides, `QM.tex:206`, state this as the "fundamental property" of waves.)

**From waves to momentum.** $k = 2\pi/\lambda = 2\pi p/h$, so $p = hk/2\pi$ and $\Delta p = h\,\Delta k/2\pi$. With $\Delta k \ge 1/2\Delta x$:

$$
\Delta x\,\Delta p \ge \frac{h}{4\pi} = \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi} = 1.054\times10^{-34}\ \text{J s}
$$

- Δx and Δp refer to the same instant, with Δp the uncertainty in the x-component of momentum.
- **It is not a limit of instruments.** The quantities themselves are imprecise in nature; instrumental errors only make the product larger. Since we can't know exactly where a particle is and how it moves now, we can't predict its future exactly, only probabilities.
- ħ is the natural unit of angular momentum (4.4, 6.5).
- **Gaussian facts (box).** Standard deviation σ; full width at half maximum 2.35σ; 68.3% of values lie within ±σ, 95.4% within ±2σ; $f(x) = e^{-(x-x_0)^2/2\sigma^2}/(\sigma\sqrt{2\pi})$.

**Example 3.6 (Beiser): the packet spreads.** A proton's position is measured to $\Delta x_0 = 1.00\times10^{-11}$ m. Then $\Delta p \ge \hbar/2\Delta x_0$ and $\Delta v = \Delta p/m \ge \hbar/2m\Delta x_0$. After a time t its position is uncertain by

$$
\Delta x \ge \Delta v\,t = \frac{\hbar t}{2m\,\Delta x_0} = \frac{(1.054\times10^{-34})(1.00)}{2(1.672\times10^{-27})(1.00\times10^{-11})} = 3.15\times10^3\ \text{m}
$$

after 1.00 s: 3.15 km. The narrow group needed many wave numbers, their phase velocities differ, and the group spreads (Fig. 3.16). The better we know the position now, the worse later.

**The slides' example: particle in a box** (beyond Beiser's text). Confinement gives Δx of order L. In state n the momentum is ±nh/2L with equal chances, so Δp = nh/2L = nπħ/L. With ch 5's wave functions, Δx = L√(1/12 − 1/2n²π²); for n = 1 this is 0.18L, and ΔxΔp = 0.57ħ, comfortably above ħ/2. The zero-point energy of the box is the uncertainty principle at work.

## 3.8 Uncertainty principle II (particle view)

**Heisenberg's microscope (Fig. 3.17).** To measure an electron's position we must hit it with something, say light of wavelength λ. At least one photon must bounce off it.

- The photon has momentum h/λ, and it changes the electron's momentum by an unpredictable amount of about that size: $\Delta p \approx h/\lambda$.
- Light is a wave, so the position can't be fixed better than about one wavelength: $\Delta x \approx \lambda$.
- Short λ improves the position but kicks harder; long λ disturbs less but blurs the position. Multiplying:

$$
\Delta x\,\Delta p \approx h
$$

consistent with $\Delta x\,\Delta p \ge \hbar/2$.

**Caution.** This argument suggests the electron *has* an exact position and momentum that the measurement disturbs. In fact the indeterminacy is built into a moving body. Such arguments are useful because they show there is no way to dodge the principle, and they make it feel familiar.

## 3.9 Applying the uncertainty principle

**A working tool.** Because h is so small, the limits matter only on the atomic scale. The bound ħ/2 is rarely reached; often ΔxΔp ≥ ħ, or even about h, is the realistic estimate. Shortcut: ħc = 197 eV nm.

**Example 3.7 (Beiser): no electrons in nuclei.** A nucleus has radius about 5.0 × 10⁻¹⁵ m. Taking Δx equal to that, $\Delta p \ge \hbar/2\Delta x = 1.1\times10^{-20}$ kg m/s, and the momentum itself must be at least that big. This pc (about 20 MeV) is far above mc² = 0.511 MeV, so KE ≈ pc = 3.3 × 10⁻¹² J ≈ 20 MeV. Electrons emitted by unstable nuclei (beta decay) have only a small fraction of this, so nuclei can't contain electrons; the emitted electron is created when the nucleus decays.

**Example 3.8 (Beiser): size and energy of hydrogen.** Radius 5.3 × 10⁻¹¹ m gives $\Delta p \ge \hbar/2\Delta x = 9.9\times10^{-25}$ kg m/s. Non-relativistic, KE = p²/2m = 5.4 × 10⁻¹⁹ J = 3.4 eV. The actual ground-state kinetic energy is 13.6 eV: the right order of magnitude from one line.

**Minimum energy of a trapped particle.** Take p ≈ Δp ≈ ħ/2Δx and E ≈ p²/2m. This estimates zero-point energies (box, oscillator, atom) to the right order.

### Energy and time

Measure the energy E of an em wave group that lasts a time Δt by counting its waves. Assume the count is uncertain by one wave. The frequency is the count divided by the time, so

$$
\Delta\nu \ge \frac{1}{\Delta t}, \qquad \Delta E = h\,\Delta\nu \ge \frac{h}{\Delta t} \quad\Rightarrow\quad \Delta E\,\Delta t \ge h
$$

A more careful treatment of wave groups sharpens this to

$$
\Delta E\,\Delta t \ge \frac{\hbar}{2}
$$

It holds generally, not just for em waves. (Slides: such an uncertainty exists for every pair of complementary variables, E and t being one.)

**Example 3.9 (Beiser): natural line width.** An excited atom radiates after an average 1.0 × 10⁻⁸ s. Then $\Delta E \ge \hbar/2\Delta t = 5.3\times10^{-27}$ J (3.3 × 10⁻⁸ eV), and $\Delta\nu = \Delta E/h \ge 8\times10^6$ Hz. For a 5.0 × 10¹⁴ Hz line, Δν/ν = 1.6 × 10⁻⁸. This is the irreducible width of a spectral line; in practice Doppler broadening is larger.

## What to be able to do without notes

- Write λ = h/p, the shortcut λ ≈ 1.226/√V nm for electrons, and know when to switch to the relativistic pc.
- Explain why Ψ is not observable but |Ψ|² is, and what "probability density" means for one particle and for many.
- Build $y = A\cos(\omega t - kx)$ from a vibration at x = 0.
- Derive the beat formula (3.10), define v\_p and v\_g, and show v\_p = c²/v and v\_g = v for de Broglie waves.
- Describe Davisson–Germer and reproduce 0.165 nm (Bragg) against 0.166 nm (de Broglie).
- Get E\_n = n²h²/8mL² from standing waves and state the three conclusions.
- Derive ΔxΔp ≥ ħ/2 from ΔxΔk ≥ ½, give the microscope argument, and use ΔxΔp ≥ ħ/2 and ΔEΔt ≥ ħ/2 for estimates (electron in nucleus, hydrogen size, line width, spreading packet).

# Coverage: Wave properties of particles

Every section and example of Beiser ch 3 and every slide frame from de Broglie to the uncertainty principle (`QM.tex:137` to `:223`). "HW practice" means *HW practice: Beiser chapters 2 and 3*.

## Beiser ch 3

| Beiser | Topic | Where on the site |
| --- | --- | --- |
| 3.1 | De Broglie waves, λ = h/γmv, 1.226/√V nm | Reference 3.1 |
| Ex 3.1, 3.2 | λ of a golf ball and an electron; KE of a proton with λ = 1 fm | Reference 3.1; HW practice |
| 3.2 | Waves of what? Born interpretation | Reference 3.2; Learn "The wave function" |
| 3.3 | Describing a wave, v\_p = c²/v | Reference 3.3 (derivation) |
| 3.4 | Phase and group velocities, v\_g = v | Reference 3.4 (beats and full v\_g derivation) |
| Ex 3.3 | KE, phase and group velocity of a 2.00 pm electron | Reference 3.4; HW practice |
| 3.5 | Particle diffraction, Davisson–Germer | Reference 3.5 (Bragg and surface-grating routes) |
| 3.6 | Particle in a box from standing waves | Reference 3.6 |
| Ex 3.4, 3.5 | Electron in a 0.10 nm box; marble in a 10 cm box | Reference 3.6; HW practice |
| 3.7 | Uncertainty principle from wave packets | Reference 3.7 (Gaussian packet, ΔxΔp ≥ ħ/2) |
| Ex 3.6 | Proton position known to 10⁻¹¹ m | Reference 3.7; HW practice |
| 3.8 | Uncertainty from the gamma-ray microscope | Reference 3.8 |
| 3.9 | Applying the principle; energy and time | Reference 3.9 |
| Ex 3.7, 3.8, 3.9 | Minimum proton energy in a nucleus; minimum electron energy in hydrogen; frequency spread of an excited atom | Reference 3.9; HW practice |

## Slides

| Frame (`QM.tex`) | Where on the site |
| --- | --- |
| `:137` de Broglie | Reference 3.1 |
| `:147` Davisson–Germer (d = 0.091 nm, θ = 65°) | Reference 3.5 |
| `:163` Matter waves | Reference 3.2, 3.3 (notes the slide's sign convention and its 1 μg example) |
| `:177`, `:193` Group wave | Reference 3.4 |
| `:206` Uncertainty | Reference 3.7 to 3.9 |

Nothing in Beiser ch 3 is dropped by the course.

# Formulas: Wave properties of particles

## de Broglie waves

$${\lambda = \frac hp = \frac{h}{\gamma mv} \approx \frac{h}{mv}\ (v \ll c)}$$

An electron accelerated through $V$ volts (non-relativistic):

$$p = \sqrt{2meV},\qquad \lambda = \frac{h}{\sqrt{2meV}} \approx \frac{1.226}{\sqrt V}\ \text{nm}$$

## Describing a wave

$$y = A\cos(\omega t - kx),\qquad \omega = 2\pi\nu,\quad k = \frac{2\pi}{\lambda},\quad v_p = \nu\lambda = \frac\omega k$$

## Phase and group velocity

$${v_g = \frac{d\omega}{dk},\qquad v_p = \frac{c^2}{v},\qquad v_pv_g = c^2,\qquad v_g = v}$$

A single de Broglie wave travels faster than light ($v_p = c^2/v$), so a particle must be a wave packet, which moves at $v_g = v$. With dispersion $v_p$ depends on $k$ and $v_g \ne v_p$.

## Born interpretation

$$|\Psi|^2dx = \text{probability of finding the particle in } dx,\qquad \int|\Psi|^2dx = 1$$

## Diffraction

Davisson–Germer (nickel, $d = 0.215$ nm, 54 V): $d\sin\varphi = n\lambda$ gives $\lambda = 0.165$ nm, against de Broglie $0.166$ nm.

## Particle in a box (wave picture)

$${\lambda_n = \frac{2L}{n},\qquad p_n = \frac{nh}{2L},\qquad E_n = \frac{n^2h^2}{8mL^2},\qquad n = 1, 2, 3, \dots}$$

$n = 0$ is not allowed, so the lowest energy is $E_1 = h^2/8mL^2$: a confined particle is never at rest.

## Uncertainty principle

$${\Delta x\,\Delta p \ge \frac\hbar2,\qquad \Delta E\,\Delta t \ge \frac\hbar2,\qquad \hbar = \frac{h}{2\pi} = 1.055\times10^{-34}\ \text{J s}}$$

Estimates: $p \approx \Delta p \approx \hbar/2\Delta x$ and $E \approx p^2/2m$ give the order of magnitude of zero-point energies. A state of lifetime $\Delta t$ has natural line width $\Delta E \ge \hbar/2\Delta t$ (for $\Delta t \approx 10^{-8}$ s, about $3\times10^{-8}$ eV).

## Constants

| Quantity | Value |
|---|---|
| $hc$ | $1240\ \text{eV nm}$ |
| $\hbar c$ | $197\ \text{eV nm}$ |
| $m_ec^2$ | $0.511\ \text{MeV}$ |
| $h$ | $4.14\times10^{-15}\ \text{eV s}$ |

# Practice: Wave properties of particles

27 questions with worked answers (tap a solution to open it). The style follows your midsem papers and Quiz-1: short state/explain items, derivations, and no-calculator numericals and estimates. Points are in brackets. Use hc = 1240 eV nm, ħc = 197 eV nm, mₑc² = 0.511 MeV, m\_pc² ≈ m\_nc² ≈ 938 MeV.

## A. State and explain

### Problem 1 [QM 2 · Recall · 2 pts]

State de Broglie's hypothesis. Why don't we see wave effects for a cricket ball?

*Solution.* **De Broglie's hypothesis.** Every particle of momentum $p$ has a wavelength

$$\lambda = \frac hp = \frac h{mv}$$

**Cricket ball.** $m = 0.1$ kg, $v = 10$ m/s:

$$\lambda = \frac{6.6\times10^{-34}}{(0.1)(10)} \approx 7\times10^{-34}\ \text{m}$$

This is $10^{19}$ times smaller than a proton. Wave effects (diffraction, interference) appear only when the wavelength is comparable to the size of the obstacle or slit, and no such slit exists, so the ball never shows them.

### Problem 2 [QM 2 · Recall · 2 pts]

What is the physical meaning of |Ψ|²? What does normalisation mean?

*Solution.* **Meaning of $|\Psi|^2$.** It is the **probability density**: $|\Psi(x,t)|^2\,dx$ is the probability of finding the particle between $x$ and $x + dx$ at time $t$. ($\Psi$ itself is complex and not directly measurable.)

**Normalisation.**

$$\int_{-\infty}^{\infty}|\Psi|^2\,dx = 1$$

The particle is certainly **somewhere**. A wave function that cannot be normalised (for example $e^{ikx}$ over all space) cannot describe a single localised particle.

### Problem 3 [QM 2 · Recall · 3 pts]

Why can't a single sinusoidal wave represent a moving particle? What is used instead?

*Solution.* **Why one wave fails.** A single sinusoid $e^{i(kx - \omega t)}$ has:

- one exact wavelength, so its amplitude is the same everywhere: it is spread over **all space** and cannot locate the particle;
- a phase velocity $v_p = c^2/v > c$, which cannot be the speed of a particle.

**What is used instead.** A **wave packet**: a superposition of waves with a range of wavelengths. Their interference makes the amplitude large only in a small region, and that region (the envelope) moves at the **group velocity**, which equals the particle's speed $v$.

**Price.** Localising the packet needs a spread of wavelengths, which is the uncertainty principle.

### Problem 4 [QM 2 · Recall · 2 pts]

Distinguish phase velocity and group velocity. Which one equals the particle's speed?

*Solution.* **Phase velocity** $v_p = \omega/k$: the speed of the crests of a single wave.

**Group velocity** $v_g = d\omega/dk$: the speed of the envelope of a wave packet.

For a de Broglie wave:

$$v_p = \frac{c^2}v > c,\qquad v_g = v$$

**The particle's speed is the group velocity.** The phase velocity can exceed $c$, but it carries no energy or information. They are related by $v_pv_g = c^2$.

### Problem 5 [QM 2 · Recall · 3 pts]

Describe the Davisson–Germer experiment and explain how it confirmed matter waves.

*Solution.* **Experiment (1927).** A beam of $54$ eV electrons hit a nickel crystal. The scattered intensity at the detector showed a **sharp peak at $\varphi = 50^\circ$**.

**Analysis.** Treat the surface atoms as a diffraction grating of spacing $d = 0.215$ nm:

$$d\sin\varphi = n\lambda\ \Rightarrow\ \lambda = (0.215\ \text{nm})\sin50^\circ = 0.165\ \text{nm}$$

**de Broglie prediction.** $\lambda = 1.226/\sqrt{54}\ \text{nm} = 0.167$ nm.

The two agree to within $1\%$.

**Why it confirms matter waves.** A peak at a definite angle that moves as the voltage changes is **interference**, which only waves produce. It was the first direct proof that electrons behave as waves.

### Problem 6 [QM 2 · Recall · 2 pts]

Why must the lowest energy of a particle in a box be greater than zero?

*Solution.* **Wave argument.** The wave function must vanish at both walls, so at least half a wavelength fits in the box: $\lambda_\text{max} = 2L$. That means a non-zero momentum

$$p = \frac h{2L}\ \Rightarrow\ E_1 = \frac{p^2}{2m} = \frac{h^2}{8mL^2} > 0$$

**Uncertainty argument.** The particle is confined, so $\Delta x \le L$ and $\Delta p \ge \hbar/2L$; an exactly zero momentum would have $\Delta p = 0$, which is impossible.

**Name.** This is the **zero-point energy**: a confined quantum particle can never be at rest.

### Problem 7 [QM 2 · Recall · 2 pts]

State the Heisenberg uncertainty principle for position–momentum and for energy–time.

*Solution.* **Position–momentum.**

$$\Delta x\,\Delta p \ge \frac\hbar2$$

**Energy–time.**

$$\Delta E\,\Delta t \ge \frac\hbar2$$

where $\hbar = h/2\pi = 1.055\times10^{-34}$ J s ($\hbar c = 197$ eV nm).

**Meaning.** $\Delta x$ and $\Delta p$ are the spreads (standard deviations) in a state. It is a property of the state, not of the measuring apparatus.

### Problem 8 [QM 2 · Recall · 3 pts]

"The uncertainty principle is due to the clumsiness of our measuring instruments." Is this correct? Explain.

*Solution.* **No.** The principle is not about clumsy instruments.

**Reason.** A particle has wave properties. A localised wave packet is built from a **range of wavelengths**, and the narrower the packet (small $\Delta x$) the wider the range needed (large $\Delta p$). This is a property of waves, true even for perfect measurement.

**Consequence.** A particle simply does not have exact $x$ and $p$ at the same time. Better instruments cannot beat $\Delta x\,\Delta p \ge \hbar/2$.

**Common mistake.** Heisenberg's microscope is an illustration of the idea, not the cause.

### Problem 9 [QM 2 · Recall · 2 pts]

Explain Heisenberg's microscope argument in three lines.

*Solution.* **Heisenberg's microscope.**

1. To "see" an electron you must scatter at least one photon of wavelength $\lambda$ off it. Resolution is limited to $\Delta x \approx \lambda$.
2. The photon carries momentum $h/\lambda$, and gives the electron an unknown kick $\Delta p \approx h/\lambda$.
3. Then

$$\Delta x\,\Delta p \approx \lambda\cdot\frac h\lambda = h$$

whatever wavelength you choose: a shorter $\lambda$ improves $\Delta x$ but worsens $\Delta p$.

### Problem 10 [QM 2 · Recall · 2 pts]

Why are spectral lines not perfectly sharp?

*Solution.* **Reason.** An excited state lives only a finite time $\Delta t$ (its lifetime) before decaying. By the energy–time uncertainty principle its energy is uncertain by

$$\Delta E \ge \frac\hbar{2\Delta t}$$

So the emitted photons have a spread of energies, giving the line a **natural width**.

**Example.** For $\Delta t = 10^{-8}$ s, $\Delta E \approx 3\times10^{-8}$ eV, tiny but non-zero. (Doppler and collision broadening add to it in practice.)

**Corollary.** The ground state has $\Delta t = \infty$, so it is perfectly sharp.

## B. Derive or show

### Problem 11 [QM 2 · Derivation · 4 pts]

Show that the phase velocity of a de Broglie wave is c²/v and that the group velocity equals v.

*Solution.* **de Broglie relations.** $E = h\nu$ and $p = h/\lambda$, so $\omega = 2\pi E/h$ and $k = 2\pi p/h$.

**Phase velocity.**

$$v_p = \frac\omega k = \frac Ep = \frac{\gamma mc^2}{\gamma mv} = \boxed{\frac{c^2}v}$$

This exceeds $c$, but no energy or signal travels at $v_p$.

**Group velocity.** $v_g = d\omega/dk = dE/dp$. From $E^2 = p^2c^2 + m^2c^4$:

$$2E\,dE = 2pc^2\,dp\ \Rightarrow\ \frac{dE}{dp} = \frac{pc^2}E = \frac{\gamma mv\,c^2}{\gamma mc^2} = \boxed{v}$$

The wave packet moves with the particle.

**Check.** $v_pv_g = c^2$ ✓.

### Problem 12 [QM 2 · Derivation · 3 pts]

Show that the de Broglie wavelength of an electron accelerated from rest through V volts is λ = h/√(2meV), assuming v ≪ c.

*Solution.* **Energy.** With $v \ll c$, the work done by the field becomes kinetic energy:

$$eV = \tfrac12mv^2 = \frac{p^2}{2m}\ \Rightarrow\ p = \sqrt{2meV}$$

$$\boxed{\lambda = \frac hp = \frac h{\sqrt{2meV}}}$$

**Numerically** $\lambda \approx \dfrac{1.226}{\sqrt V}$ nm, with $V$ in volts: for $V = 100$ V, $\lambda = 0.123$ nm, comparable to atomic spacings.

### Problem 13 [QM 2 · Derivation · 4 pts]

Using the standing-wave condition, derive the energy levels of a particle in a 1-D box of width L. Sketch the first three wave functions.

*Solution.* **Standing wave.** The wave function must vanish at the walls, $\psi(0) = \psi(L) = 0$, so a whole number of half-wavelengths fit in the box:

$$L = n\frac{\lambda_n}2\ \Rightarrow\ \lambda_n = \frac{2L}n$$

**Momentum and energy.**

$$p_n = \frac h{\lambda_n} = \frac{nh}{2L},\qquad E_n = \frac{p_n^2}{2m} = \boxed{\frac{n^2h^2}{8mL^2}}$$

**Wave functions** $\psi_n \propto \sin(n\pi x/L)$:

| $n$ | shape | nodes inside |
|---|---|---|
| 1 | half a sine wave | 0 |
| 2 | full sine wave | 1 (at $L/2$) |
| 3 | one and a half waves | 2 |

**Check.** $n = 0$ is not allowed ($\psi \equiv 0$), so the lowest energy is $E_1 > 0$: zero-point energy.

### Problem 14 [QM 2 · Derivation · 3 pts]

Using ΔxΔp ≥ ħ/2, show that an electron can't exist inside a nucleus of size 10⁻¹⁴ m.

*Solution.* **Uncertainty principle.** Confined to $\Delta x \approx 10^{-14}$ m $= 10^{-5}$ nm:

$$\Delta p \ge \frac\hbar{2\Delta x}\ \Rightarrow\ \Delta p\,c \ge \frac{197\ \text{eV nm}}{2(10^{-5}\ \text{nm})} \approx 10\ \text{MeV}$$

**Relativistic regime.** $\Delta pc \approx 10\ \text{MeV} \gg m_ec^2 = 0.51$ MeV, so $K \approx pc \approx 10$ MeV.

**Conclusion.** An electron confined to the nucleus would carry about $10$ MeV of kinetic energy, but nuclear beta-decay electrons have only a few MeV, and no nuclear potential could bind it that strongly. So electrons cannot be nuclear constituents. (A proton, being much heavier, gets only about $0.1$ MeV from confinement, consistent with nuclear binding.)

### Problem 15 [QM 2 · Derivation · 4 pts]

Using the uncertainty principle, estimate the minimum energy of a particle of mass m in a box of width L. Compare with the exact E₁ = h²/8mL².

*Solution.* **Estimate.** Confining the particle to the box gives $\Delta x \approx L$, so

$$p \approx \Delta p \approx \frac\hbar{2L}\ \Rightarrow\ E \approx \frac{p^2}{2m} = \frac{\hbar^2}{8mL^2}$$

**Compare with the exact** $E_1 = \dfrac{h^2}{8mL^2} = \dfrac{4\pi^2\hbar^2}{8mL^2}$:

$$\frac{E_1}{E_\text{est}} = 4\pi^2 \approx 40$$

The estimate is off by a numerical factor (the uncertainty relation only gives a lower bound on $\Delta p$, and the true ground state has more momentum spread than the minimum), but it gets the **scaling** $E \propto 1/mL^2$ right, which is its purpose.

### Problem 16 [QM 2 · Derivation · 3 pts]

Using the relativistic relations E = γmc² and p = γmv, write the de Broglie wavelength of an electron with kinetic energy K, valid at all speeds.

*Solution.* **Relativistic relations.** Total energy $E = K + mc^2$ and $E^2 = p^2c^2 + m^2c^4$:

$$p^2c^2 = (K + mc^2)^2 - m^2c^4 = K^2 + 2Kmc^2$$

$$\boxed{\lambda = \frac hp = \frac{hc}{\sqrt{K^2 + 2Kmc^2}}}$$

**Non-relativistic limit** $K \ll mc^2$: drop $K^2$, giving

$$\lambda \approx \frac{hc}{\sqrt{2Kmc^2}} = \frac h{\sqrt{2mK}}$$

✓ (agrees with Problem 12).

**Check.** For a 1 MeV electron, $pc = \sqrt{1 + 1.02} = 1.42$ MeV, $\lambda = 1240/1.42\times10^6$ nm $= 8.7\times10^{-4}$ nm; the non-relativistic formula would give $1.2\times10^{-3}$ nm (about 40% too long).

## C. Numericals without a calculator

### Problem 17 [QM 2 · Numerical]

Find the de Broglie wavelength of an electron accelerated through 100 V.

*Solution.* **Idea.** For an electron accelerated through $V$ volts, $\lambda = h/\sqrt{2meV} \approx 1.226/\sqrt V$ nm.

$$\lambda = \frac{1.226}{\sqrt{100}}\ \text{nm} = \boxed{0.123\ \text{nm}}$$

### Problem 18 [QM 2 · Numerical]

Find the de Broglie wavelength of a 0.1 kg ball moving at 10 m/s, and compare it with the size of a proton (about 10⁻¹⁵ m).

*Solution.* **Idea.** $\lambda = h/p = h/mv$.

$$\lambda = \frac{6.6\times10^{-34}\ \text{J s}}{(0.1\ \text{kg})(10\ \text{m/s})} = \boxed{6.6\times10^{-34}\ \text{m}}$$

Compared with a proton ($\sim10^{-15}$ m) it is about $10^{19}$ times smaller, so no wave effect could ever be seen for such a ball.

### Problem 19 [QM 2 · Numerical]

In the Davisson–Germer experiment the electrons were accelerated through 54 V. Find their de Broglie wavelength.

*Solution.* **Idea.** Same formula as above, with $V = 54$ V.

$$\lambda = \frac{1.226}{\sqrt{54}} = \frac{1.226}{7.35}\ \text{nm} = \boxed{0.167\ \text{nm}}$$

This matches the diffraction result (0.165 nm), which confirmed matter waves.

### Problem 20 [QM 2 · Numerical]

An electron is confined to a box 0.1 nm wide. Find E₁ and the energy of the photon emitted in the n = 2 → 1 transition.

*Solution.* **Idea.** $E_n = n^2h^2/8mL^2$. Write it as $E_1 = (hc)^2/(8\,m_ec^2L^2)$ so that all numbers are in eV and nm.

$$E_1 = \frac{(1240\ \text{eV nm})^2}{8(0.511\times10^6\ \text{eV})(0.1\ \text{nm})^2} = \frac{1.54\times10^6}{4.09\times10^4} \approx \boxed{38\ \text{eV}}$$

$$E_2 - E_1 = 4E_1 - E_1 = 3E_1 \approx \boxed{113\ \text{eV}}$$

which is a far-ultraviolet photon ($\lambda = 1240/113 \approx 11$ nm).

### Problem 21 [QM 2 · Numerical]

An electron is located within 0.1 nm. Estimate the minimum spread in its momentum and its minimum kinetic energy.

*Solution.* **Idea.** Uncertainty principle $\Delta x\,\Delta p \ge \hbar/2$, then $KE \approx (\Delta p)^2/2m$.

$$\Delta p\,c \ge \frac{\hbar c}{2\Delta x} = \frac{197\ \text{eV nm}}{2(0.1\ \text{nm})} \approx 985\ \text{eV}\ \Rightarrow\ \Delta p \approx 5\times10^{-25}\ \text{kg m/s}$$

$$KE \approx \frac{(\Delta p\,c)^2}{2m_ec^2} = \frac{(985)^2}{1.02\times10^6} \approx \boxed{1\ \text{eV}}$$

**Check.** Atomic energies are of order eV, as they should be for an electron confined to atomic size.

### Problem 22 [QM 2 · Numerical]

A proton is confined to a nucleus of size 10⁻¹⁴ m. Estimate its minimum kinetic energy. Is this a reasonable nuclear energy scale?

*Solution.* **Idea.** Same method, for a proton ($m_pc^2 = 938$ MeV) with $\Delta x = 10^{-14}$ m $= 10^{-5}$ nm.

$$\Delta p\,c \ge \frac{197\ \text{eV nm}}{2\times10^{-5}\ \text{nm}} \approx 10\ \text{MeV}$$

$$KE \approx \frac{(\Delta p\,c)^2}{2m_pc^2} = \frac{10^2}{2(938)} \approx \boxed{0.05\ \text{MeV}}$$

Using $\Delta p \approx \hbar/\Delta x$ (a factor 2 larger) gives about $0.2$ MeV. Either way it is $\sim 0.1$ MeV, within an order of magnitude or two of nuclear binding energies per nucleon (MeV), so confinement alone gives the right nuclear scale. (An electron in the same space would need $\sim10$ MeV, far more than beta-decay energies, which rules out electrons living in the nucleus.)

### Problem 23 [QM 2 · Numerical]

An excited atomic state lives 10⁻⁸ s. Find the minimum uncertainty in its energy, in eV.

*Solution.* **Idea.** Energy–time uncertainty: $\Delta E\,\Delta t \ge \hbar/2$.

$$\Delta E \ge \frac{\hbar}{2\Delta t} = \frac{6.6\times10^{-16}\ \text{eV s}}{2(10^{-8}\ \text{s})} \approx \boxed{3\times10^{-8}\ \text{eV}}$$

This is the natural line width of the spectral line.

### Problem 24 [QM 2 · Numerical]

Find the de Broglie wavelength of a thermal neutron with KE = 0.025 eV. Why are such neutrons used to study crystals?

*Solution.* **Idea.** Non-relativistic neutron: $p = \sqrt{2mK}$, so $pc = \sqrt{2(m_nc^2)K}$ and $\lambda = hc/pc$.

$$pc = \sqrt{2(939\times10^6\ \text{eV})(0.025\ \text{eV})} \approx 6.9\ \text{keV}$$

$$\lambda = \frac{1240\ \text{eV nm}}{6900\ \text{eV}} \approx \boxed{0.18\ \text{nm}}$$

**Why used on crystals.** 0.18 nm is the size of atomic spacings, so the neutrons diffract strongly. Being neutral they also penetrate deep into the material.

## D. Estimate and discuss

### Problem 25 [QM 2 · Discussion · 3 pts]

Estimate the size of a hydrogen atom using the uncertainty principle: minimise E(r) = ħ²/(2mr²) − ke²/r.

*Solution.* **Idea.** Confining the electron to a radius $r$ gives $\Delta p \approx \hbar/r$, so its kinetic energy is at least $\hbar^2/2mr^2$.

$$E(r) = \frac{\hbar^2}{2mr^2} - \frac{ke^2}r$$

**Minimise.**

$$\frac{dE}{dr} = -\frac{\hbar^2}{mr^3} + \frac{ke^2}{r^2} = 0\ \Rightarrow\ \boxed{r = \frac{\hbar^2}{mke^2} = a_0 = 0.053\ \text{nm}}$$

$$E_{\min} = -\frac{ke^2}{2a_0} = \boxed{-13.6\ \text{eV}}$$

**Comment.** The uncertainty principle alone gives the right size and energy of hydrogen: kinetic energy ($\propto 1/r^2$) resists confinement while Coulomb attraction ($\propto -1/r$) pulls in, and the balance fixes the atom's size.

### Problem 26 [QM 2 · Discussion · 3 pts]

Electron microscopes use electrons of about 100 keV. Estimate their wavelength and explain why they resolve much finer detail than light microscopes.

*Solution.* **Wavelength of a 100 keV electron.** Relativistic momentum:

$$pc = \sqrt{K^2 + 2Kmc^2} = \sqrt{0.1^2 + 2(0.1)(0.511)}\ \text{MeV} = 0.335\ \text{MeV}$$

$$\lambda = \frac{hc}{pc} = \frac{1240\ \text{eV nm}}{3.35\times10^5\ \text{eV}} = \boxed{3.7\ \text{pm}}$$

**Comparison.** Visible light has $\lambda\approx500$ nm, about $10^5$ times longer.

**Why finer detail.** A microscope cannot resolve features much smaller than the wavelength used, so electrons can in principle resolve about $10^5$ times finer detail. In practice lens defects limit electron microscopes to about $0.1$ nm.

### Problem 27 [QM 2 · Discussion · 2 pts]

A dust grain of 1 μg sits in a 1 μm box. Using E₁ = h²/8mL², explain without exact arithmetic why we never notice its quantised energy.

*Solution.* **Numbers.** $m = 10^{-9}$ kg, $L = 10^{-6}$ m:

$$E_1 = \frac{h^2}{8mL^2} = \frac{(6.6\times10^{-34})^2}{8(10^{-9})(10^{-12})} \approx 5\times10^{-47}\ \text{J}\ (\sim10^{-46}\ \text{J})$$

**Compare** with thermal energy at room temperature, $k_BT \approx 4\times10^{-21}$ J:

$$\frac{k_BT}{E_1} \sim 10^{25}$$

**Why it is invisible.** The level spacing, $E_n - E_{n-1}\propto n$, is far smaller than anything measurable, and the grain has about $10^{25}$ quanta thermally. The energy looks continuous: this is the **correspondence principle** (large quantum numbers give classical behaviour).

