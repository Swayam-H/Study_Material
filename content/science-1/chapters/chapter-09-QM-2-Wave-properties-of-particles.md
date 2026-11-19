# Learn: Wave properties of particles

Moving particles behave as waves of wavelength λ = h/p. The wave says where the particle is likely to be found, and confining or localising that wave forces quantised energies and the uncertainty principle. This doc covers Beiser ch 3 (all of 3.1–3.9) and the slides `QM.tex:137` to `:223`.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## De Broglie waves

If light, long thought to be a wave, has particle properties, it is natural to ask whether particles have wave properties. De Broglie proposed in 1924 that they do. A photon of momentum p has wavelength λ = h/p, and he suggested that the same relation holds for any moving particle, so that a body of mass m and speed v has the wavelength λ = h/mv. For everyday objects this wavelength is far too small ever to be noticed, which is why we never see a cricket ball diffract. For an electron accelerated through a few tens of volts, however, it is about an angstrom, the same size as the spacing of atoms in a crystal.

## The wave function

What kind of wave is this? It is not a disturbance of any medium, and it carries no energy of its own. The quantity that varies is the wave function Ψ, and its meaning is statistical: the value of |Ψ|² at a given place and time is proportional to the probability of finding the particle there at that time. A large |Ψ|² means the particle is likely to be found there, and a small one means it is unlikely, but in any single measurement the particle is found at one definite point.

## Phase and group velocity

A difficulty appears as soon as we try to calculate the speed of these waves. A wave of frequency ν and wavelength λ travels at the phase velocity νλ. Using E = hν = γmc² and λ = h/γmv gives a phase velocity of c²/v, which is greater than c for any real particle. The answer is that a particle is not represented by a single wave of one wavelength, which would extend uniformly through all space, but by a wave group formed by adding waves of slightly different wavelengths. The waves reinforce one another in a small region and cancel elsewhere, and it is this region of large amplitude that we identify with the particle. The group moves with the group velocity dω/dk, and when this is worked out for de Broglie waves it is found to equal v, the speed of the particle. The individual wave crests move faster than the group, but nothing physical travels with them.

## Electron diffraction

The wave nature of electrons was confirmed by Davisson and Germer in 1927. They directed a beam of 54 eV electrons at a nickel crystal and found a strong reflected beam at an angle of 50°, exactly where Bragg's law predicts a diffraction maximum for waves of the de Broglie wavelength. Electrons, neutrons and even whole atoms have since been diffracted, and electron microscopes rely on the short wavelength of fast electrons to resolve detail far finer than visible light allows.

## Particle in a box

The wave picture also explains why a confined particle can have only certain energies. If a particle is trapped in a box of width L with impenetrable walls, its wave function must vanish at the walls, just as a string fixed at both ends must have nodes there. Only waves that fit a whole number of half-wavelengths into the box are possible, so λₙ = 2L/n. With p = h/λ this gives Eₙ = n²h²/(8mL²). The energy is quantised, and the lowest value is not zero. A trapped particle can never be completely at rest.

## The uncertainty principle

The wave nature of matter leads directly to the uncertainty principle. A wave group that is confined to a small region Δx must be built from waves with a wide range of wavelengths, and hence a wide range of momenta Δp. A group with a narrow spread of momenta must be long. The product of the two spreads cannot be made smaller than about ħ/2, so that Δx Δp ≥ ħ/2. This is not a limitation of our instruments. It is a property of waves, and so of matter itself. Heisenberg illustrated the same principle with a thought experiment. To locate an electron with a microscope we must bounce at least one photon off it, and to locate it precisely we need short wavelengths. But a short-wavelength photon carries a large momentum, part of which it transfers to the electron in an amount we cannot know. The better we fix the position, the more we disturb the momentum.

## Energy and time

A similar relation connects energy and time. To measure an energy to within ΔE we need a wave group whose frequency is defined to within Δν = ΔE/h, and that requires the group to last for a time Δt of at least about 1/Δν. The result is ΔE Δt ≥ ħ/2. An excited state that lives only a short time therefore has an energy that is not sharply defined, and the spectral lines it emits have a natural width. The uncertainty principle also gives quick estimates. An electron confined within a nucleus of size 10⁻¹⁴ m would need a kinetic energy of many MeV, far more than nuclear electrons are ever observed to have, which shows that electrons cannot be constituents of nuclei.

# Reference: Wave properties of particles

The course material section by section, in the order of the textbook, with the key formulas.

## 3.1 De Broglie waves

**Idea.** If light (a wave) has momentum p = h/λ, de Broglie (1924) proposed the reverse: a particle with momentum p has a wavelength

$$
\lambda = \frac{h}{p} = \frac{h}{\gamma m v} \;\approx\; \frac{h}{mv} \quad (v \ll c)
$$

- **Electron accelerated through V volts** (non-relativistic): p = √(2meV), so λ = h/√(2meV) ≈ 1.226/√V nm. At 100 V, λ ≈ 0.12 nm, the size of atomic spacings.
- **Everyday objects:** a 0.1 kg ball at 10 m/s has λ ≈ 7 × 10⁻³⁴ m. That is far smaller than anything it could diffract from, so no wave effects show.
- Wave nature shows only when λ is comparable to the size of the obstacle or region.

## 3.2 Waves of what?

- The wave function Ψ(x, t) is not a physical displacement. It is a probability amplitude and can be complex.
- **Born interpretation:** |Ψ|² dx is the probability of finding the particle between x and x + dx. Large |Ψ|² means the particle is likely there; Ψ = 0 means it is never found there.
- Because the particle must be somewhere, ∫|Ψ|² dx = 1 (normalisation).

## 3.3 Describing a wave

A wave moving in +x with speed v\_p:

$$
y = A\cos(\omega t - kx), \qquad \omega = 2\pi\nu, \quad k = \frac{2\pi}{\lambda}, \quad v_p = \nu\lambda = \frac{\omega}{k}
$$

k is the wave number (radians per metre) and ω the angular frequency (radians per second).

## 3.4 Phase and group velocities

**Problem.** A single de Broglie wave has phase velocity v\_p = νλ = (E/h)(h/p) = E/p = γmc²/γmv = c²/v. That is *faster than light* for v < c, so a single wave can't be the particle.

**Fix.** A particle is a **wave group** (wave packet): a superposition of waves with slightly different k. They add up in one region and cancel elsewhere, like beats.

$$
v_g = \frac{d\omega}{dk}, \qquad v_p\, v_g = c^2 \;\text{(de Broglie waves)}, \qquad v_g = v
$$

- Using ω = 2πγmc²/h and k = 2πγmv/h, the derivatives give dω/dk = v. The **group velocity equals the particle's velocity**, as it must.
- The group carries the energy and information, so nothing travels faster than c.
- **Dispersion:** when v\_p depends on k (as here), the group velocity differs from the phase velocity. With no dispersion (light in vacuum), v\_p = v\_g.

## 3.5 Particle diffraction

**Davisson–Germer (1927):** 54 eV electrons hit a nickel crystal. The scattered intensity showed a sharp peak at 50°, which only wave interference explains.

- Treat the surface atoms as a grating (spacing d = 0.215 nm). The peak satisfies d sinφ = nλ, giving λ = 0.165 nm.
- De Broglie predicts λ = h/√(2meV) = 0.166 nm at 54 V. The match confirms matter waves.
- G.P. Thomson's transmission rings through thin foils (1927) and later neutron diffraction confirm it too.

## 3.6 Particle in a box (wave picture)

**Idea.** A particle trapped between rigid walls a distance L apart. Its wave must vanish at the walls, so only standing waves fit: a whole number of half-wavelengths.

$$
\lambda_n = \frac{2L}{n}, \quad p_n = \frac{h}{\lambda_n} = \frac{nh}{2L}, \quad E_n = \frac{p_n^2}{2m} = \frac{n^2 h^2}{8 m L^2}, \quad n = 1, 2, 3, \dots
$$

- **Energy is quantised** purely because the wave must fit. This is the key idea behind every bound-state result.
- **No zero energy:** n = 0 would mean no wave at all, so the lowest energy is E₁ = h²/8mL². A confined particle is never at rest.
- Levels spread out as 1, 4, 9, … × E₁, and E₁ grows as L shrinks and as m shrinks. That is why quantisation matters for electrons in atoms and not for marbles in boxes.
- Ch 5.8 gets the same answer from the Schrödinger equation.

## 3.7 Uncertainty principle I (wave view)

**Idea.** A narrow wave group (small Δx) needs many wavelengths (a wide spread Δk). A single exact wavelength (Δk = 0) extends forever (Δx = ∞). This is a property of all waves (Fourier analysis); with p = ħk it becomes a limit on knowledge of x and p.

$$
\Delta x\,\Delta p \;\ge\; \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi} = 1.055\times10^{-34}\ \text{J s}
$$

- Δx and Δp are standard deviations. A Gaussian wave packet gives exactly ħ/2, the minimum.
- It is not a flaw in instruments. The particle doesn't *have* an exact x and p at the same time.

## 3.8 Uncertainty principle II (particle view)

**Heisenberg's microscope.** To see an electron you hit it with at least one photon of wavelength λ. The position is fuzzy by Δx ≈ λ, and the photon kicks the electron by up to Δp ≈ h/λ. So ΔxΔp ≈ h. A shorter λ gives a better position but a bigger kick. This rougher argument gives the same order of magnitude.

## 3.9 Applying the uncertainty principle

**Energy–time form.** A wave group of duration Δt has a frequency spread Δν ≈ 1/Δt, so with E = hν:

$$
\Delta E\,\Delta t \;\ge\; \frac{\hbar}{2}
$$

- **Electron in the nucleus?** Confine it to Δx ≈ 10⁻¹⁴ m. Then Δp ≥ ħ/2Δx ≈ 5 × 10⁻²¹ kg m/s and the KE is about pc ≈ 10 MeV or more. Beta-decay electrons have only a few MeV, so electrons can't be held inside nuclei.
- **Minimum energy of a trapped particle:** take p ≈ Δp ≈ ħ/2Δx and E ≈ p²/2m. This estimates zero-point energies (box, oscillator, hydrogen atom size) to the right order.
- **Natural line width:** an excited state that lives Δt ≈ 10⁻⁸ s has an energy spread ΔE ≥ ħ/2Δt ≈ 3 × 10⁻⁸ eV, so spectral lines have a small natural width.

## What to be able to do without notes

- Write λ = h/p and the shortcut λ ≈ 1.226/√V nm for electrons.
- Explain |Ψ|² as probability density and why normalisation is needed.
- Show v\_p = c²/v and v\_g = v, and explain why a wave packet is needed.
- Describe Davisson–Germer and the numbers that confirmed de Broglie.
- Get E\_n = n²h²/8mL² from standing waves and explain why E = 0 is not allowed.
- Use ΔxΔp ≥ ħ/2 and ΔEΔt ≥ ħ/2 for estimates.

# Formulas: Wave properties of particles

## de Broglie waves

$$\boxed{\lambda = \frac hp = \frac{h}{\gamma mv} \approx \frac{h}{mv}\ (v \ll c)}$$

An electron accelerated through $V$ volts (non-relativistic):

$$p = \sqrt{2meV},\qquad \lambda = \frac{h}{\sqrt{2meV}} \approx \frac{1.226}{\sqrt V}\ \text{nm}$$

## Describing a wave

$$y = A\cos(\omega t - kx),\qquad \omega = 2\pi\nu,\quad k = \frac{2\pi}{\lambda},\quad v_p = \nu\lambda = \frac\omega k$$

## Phase and group velocity

$$\boxed{v_g = \frac{d\omega}{dk},\qquad v_p = \frac{c^2}{v},\qquad v_pv_g = c^2,\qquad v_g = v}$$

A single de Broglie wave travels faster than light ($v_p = c^2/v$), so a particle must be a wave packet, which moves at $v_g = v$. With dispersion $v_p$ depends on $k$ and $v_g \ne v_p$.

## Born interpretation

$$|\Psi|^2dx = \text{probability of finding the particle in } dx,\qquad \int|\Psi|^2dx = 1$$

## Diffraction

Davisson–Germer (nickel, $d = 0.215$ nm, 54 V): $d\sin\varphi = n\lambda$ gives $\lambda = 0.165$ nm, against de Broglie $0.166$ nm.

## Particle in a box (wave picture)

$$\boxed{\lambda_n = \frac{2L}{n},\qquad p_n = \frac{nh}{2L},\qquad E_n = \frac{n^2h^2}{8mL^2},\qquad n = 1, 2, 3, \dots}$$

$n = 0$ is not allowed, so the lowest energy is $E_1 = h^2/8mL^2$: a confined particle is never at rest.

## Uncertainty principle

$$\boxed{\Delta x\,\Delta p \ge \frac\hbar2,\qquad \Delta E\,\Delta t \ge \frac\hbar2,\qquad \hbar = \frac{h}{2\pi} = 1.055\times10^{-34}\ \text{J s}}$$

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

*Solution.* A particle of momentum p has wavelength λ = h/p. A 0.1 kg ball at 10 m/s has λ ≈ 7 × 10⁻³⁴ m, far smaller than any slit or obstacle, so it can't show diffraction or interference.

### Problem 2 [QM 2 · Recall · 2 pts]

What is the physical meaning of |Ψ|²? What does normalisation mean?

*Solution.* |Ψ|² dx is the probability of finding the particle between x and x + dx. Normalisation, ∫|Ψ|² dx = 1, says the particle is certainly somewhere.

### Problem 3 [QM 2 · Recall · 3 pts]

Why can't a single sinusoidal wave represent a moving particle? What is used instead?

*Solution.* A single wave has one exact λ and spreads over all space, so it doesn't locate the particle. Its phase velocity c²/v is also faster than light. A wave packet (a superposition of nearby wavelengths) is localised and moves at v.

### Problem 4 [QM 2 · Recall · 2 pts]

Distinguish phase velocity and group velocity. Which one equals the particle's speed?

*Solution.* v\_p = ω/k is the speed of the crests of one wave. v\_g = dω/dk is the speed of the envelope of the group. The group velocity equals the particle's speed.

### Problem 5 [QM 2 · Recall · 3 pts]

Describe the Davisson–Germer experiment and explain how it confirmed matter waves.

*Solution.* A 54 eV electron beam hit a nickel crystal and the scattered intensity showed a peak at 50°. Treating the surface atoms as a grating (d = 0.215 nm), d sinφ = λ gives 0.165 nm, matching h/p = 0.166 nm. Only interference of waves gives such a peak.

### Problem 6 [QM 2 · Recall · 2 pts]

Why must the lowest energy of a particle in a box be greater than zero?

*Solution.* The wave must vanish at both walls, so at least half a wavelength must fit. That gives a non-zero momentum h/2L and energy h²/8mL². Also, E = 0 would mean exact zero momentum, which the uncertainty principle forbids in a finite box.

### Problem 7 [QM 2 · Recall · 2 pts]

State the Heisenberg uncertainty principle for position–momentum and for energy–time.

*Solution.* ΔxΔp ≥ ħ/2 and ΔEΔt ≥ ħ/2.

### Problem 8 [QM 2 · Recall · 3 pts]

"The uncertainty principle is due to the clumsiness of our measuring instruments." Is this correct? Explain.

*Solution.* No. It comes from the wave nature of matter: a localised wave packet must contain a spread of wavelengths, so a spread of momenta. A particle simply doesn't have exact x and p together. Better instruments can't beat it.

### Problem 9 [QM 2 · Recall · 2 pts]

Explain Heisenberg's microscope argument in three lines.

*Solution.* To see an electron you must bounce at least one photon of wavelength λ off it. The position is fixed only to Δx ≈ λ, and the photon's momentum h/λ gives an unknown kick Δp ≈ h/λ. So ΔxΔp ≈ h, however you choose λ.

### Problem 10 [QM 2 · Recall · 2 pts]

Why are spectral lines not perfectly sharp?

*Solution.* An excited state lives only a finite time Δt, so its energy is uncertain by ΔE ≥ ħ/2Δt. The emitted photons have a spread of energies, which is the natural line width.

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

*Solution.* dE/dr = −ħ²/(mr³) + ke²/r² = 0 gives r = ħ²/(mke²) = a₀ ≈ 0.053 nm. Then E = −ke²/2a₀ ≈ −13.6 eV. The uncertainty principle alone gets the size and energy of hydrogen right.

### Problem 26 [QM 2 · Discussion · 3 pts]

Electron microscopes use electrons of about 100 keV. Estimate their wavelength and explain why they resolve much finer detail than light microscopes.

*Solution.* At 100 keV, pc = √(0.1² + 2 × 0.1 × 0.511) MeV ≈ 0.335 MeV, so λ ≈ 1240/335 000 nm ≈ 3.7 pm. Visible light is about 500 nm, about 10⁵ times longer. Resolution is limited to about one wavelength, so electrons can see far finer detail (in practice lens defects limit it to about 0.1 nm).

### Problem 27 [QM 2 · Discussion · 2 pts]

A dust grain of 1 μg sits in a 1 μm box. Using E₁ = h²/8mL², explain without exact arithmetic why we never notice its quantised energy.

*Solution.* m = 10⁻⁹ kg and L = 10⁻⁶ m, so E₁ ≈ (7 × 10⁻³⁴)²/(8 × 10⁻⁹ × 10⁻¹²) ≈ 10⁻⁴⁶ J. Thermal energy kT at room temperature is about 4 × 10⁻²¹ J, about 10²⁵ times bigger. The levels are so close together that the energy looks continuous.

