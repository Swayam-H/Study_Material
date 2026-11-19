# Science-1 QM 2: Wave properties of particles

Moving particles behave as waves of wavelength λ = h/p. The wave says where the particle is likely to be found, and confining or localising that wave forces quantised energies and the uncertainty principle. This doc covers Beiser ch 3 (all of 3.1–3.9) and the slides `QM.tex:137` to `:223`.

## Explainer

### De Broglie waves

If light, long thought to be a wave, has particle properties, it is natural to ask whether particles have wave properties. De Broglie proposed in 1924 that they do. A photon of momentum p has wavelength λ = h/p, and he suggested that the same relation holds for any moving particle, so that a body of mass m and speed v has the wavelength λ = h/mv. For everyday objects this wavelength is far too small ever to be noticed, which is why we never see a cricket ball diffract. For an electron accelerated through a few tens of volts, however, it is about an angstrom, the same size as the spacing of atoms in a crystal.

### The wave function

What kind of wave is this? It is not a disturbance of any medium, and it carries no energy of its own. The quantity that varies is the wave function Ψ, and its meaning is statistical: the value of |Ψ|² at a given place and time is proportional to the probability of finding the particle there at that time. A large |Ψ|² means the particle is likely to be found there, and a small one means it is unlikely, but in any single measurement the particle is found at one definite point.

### Phase and group velocity

A difficulty appears as soon as we try to calculate the speed of these waves. A wave of frequency ν and wavelength λ travels at the phase velocity νλ. Using E = hν = γmc² and λ = h/γmv gives a phase velocity of c²/v, which is greater than c for any real particle. The answer is that a particle is not represented by a single wave of one wavelength, which would extend uniformly through all space, but by a wave group formed by adding waves of slightly different wavelengths. The waves reinforce one another in a small region and cancel elsewhere, and it is this region of large amplitude that we identify with the particle. The group moves with the group velocity dω/dk, and when this is worked out for de Broglie waves it is found to equal v, the speed of the particle. The individual wave crests move faster than the group, but nothing physical travels with them.

### Electron diffraction

The wave nature of electrons was confirmed by Davisson and Germer in 1927. They directed a beam of 54 eV electrons at a nickel crystal and found a strong reflected beam at an angle of 50°, exactly where Bragg's law predicts a diffraction maximum for waves of the de Broglie wavelength. Electrons, neutrons and even whole atoms have since been diffracted, and electron microscopes rely on the short wavelength of fast electrons to resolve detail far finer than visible light allows.

### Particle in a box

The wave picture also explains why a confined particle can have only certain energies. If a particle is trapped in a box of width L with impenetrable walls, its wave function must vanish at the walls, just as a string fixed at both ends must have nodes there. Only waves that fit a whole number of half-wavelengths into the box are possible, so λₙ = 2L/n. With p = h/λ this gives Eₙ = n²h²/(8mL²). The energy is quantised, and the lowest value is not zero. A trapped particle can never be completely at rest.

### The uncertainty principle

The wave nature of matter leads directly to the uncertainty principle. A wave group that is confined to a small region Δx must be built from waves with a wide range of wavelengths, and hence a wide range of momenta Δp. A group with a narrow spread of momenta must be long. The product of the two spreads cannot be made smaller than about ħ/2, so that Δx Δp ≥ ħ/2. This is not a limitation of our instruments. It is a property of waves, and so of matter itself. Heisenberg illustrated the same principle with a thought experiment. To locate an electron with a microscope we must bounce at least one photon off it, and to locate it precisely we need short wavelengths. But a short-wavelength photon carries a large momentum, part of which it transfers to the electron in an amount we cannot know. The better we fix the position, the more we disturb the momentum.

### Energy and time

A similar relation connects energy and time. To measure an energy to within ΔE we need a wave group whose frequency is defined to within Δν = ΔE/h, and that requires the group to last for a time Δt of at least about 1/Δν. The result is ΔE Δt ≥ ħ/2. An excited state that lives only a short time therefore has an energy that is not sharply defined, and the spectral lines it emits have a natural width. The uncertainty principle also gives quick estimates. An electron confined within a nucleus of size 10⁻¹⁴ m would need a kinetic energy of many MeV, far more than nuclear electrons are ever observed to have, which shows that electrons cannot be constituents of nuclei.

## Summary

### 3.1 De Broglie waves

**Idea.** If light (a wave) has momentum p = h/λ, de Broglie (1924) proposed the reverse: a particle with momentum p has a wavelength

```latex
\lambda = \frac{h}{p} = \frac{h}{\gamma m v} \;\approx\; \frac{h}{mv} \quad (v \ll c)
```

- **Electron accelerated through V volts** (non-relativistic): p = √(2meV), so λ = h/√(2meV) ≈ 1.226/√V nm. At 100 V, λ ≈ 0.12 nm, the size of atomic spacings.
- **Everyday objects:** a 0.1 kg ball at 10 m/s has λ ≈ 7 × 10⁻³⁴ m. That is far smaller than anything it could diffract from, so no wave effects show.
- Wave nature shows only when λ is comparable to the size of the obstacle or region.

### 3.2 Waves of what?

- The wave function Ψ(x, t) is not a physical displacement. It is a probability amplitude and can be complex.
- **Born interpretation:** |Ψ|² dx is the probability of finding the particle between x and x + dx. Large |Ψ|² means the particle is likely there; Ψ = 0 means it is never found there.
- Because the particle must be somewhere, ∫|Ψ|² dx = 1 (normalisation).

### 3.3 Describing a wave

A wave moving in +x with speed v\_p:

```latex
y = A\cos(\omega t - kx), \qquad \omega = 2\pi\nu, \quad k = \frac{2\pi}{\lambda}, \quad v_p = \nu\lambda = \frac{\omega}{k}
```

k is the wave number (radians per metre) and ω the angular frequency (radians per second).

### 3.4 Phase and group velocities

**Problem.** A single de Broglie wave has phase velocity v\_p = νλ = (E/h)(h/p) = E/p = γmc²/γmv = c²/v. That is *faster than light* for v < c, so a single wave can't be the particle.

**Fix.** A particle is a **wave group** (wave packet): a superposition of waves with slightly different k. They add up in one region and cancel elsewhere, like beats.

```latex
v_g = \frac{d\omega}{dk}, \qquad v_p\, v_g = c^2 \;\text{(de Broglie waves)}, \qquad v_g = v
```

- Using ω = 2πγmc²/h and k = 2πγmv/h, the derivatives give dω/dk = v. The **group velocity equals the particle's velocity**, as it must.
- The group carries the energy and information, so nothing travels faster than c.
- **Dispersion:** when v\_p depends on k (as here), the group velocity differs from the phase velocity. With no dispersion (light in vacuum), v\_p = v\_g.

### 3.5 Particle diffraction

**Davisson–Germer (1927):** 54 eV electrons hit a nickel crystal. The scattered intensity showed a sharp peak at 50°, which only wave interference explains.

- Treat the surface atoms as a grating (spacing d = 0.215 nm). The peak satisfies d sinφ = nλ, giving λ = 0.165 nm.
- De Broglie predicts λ = h/√(2meV) = 0.166 nm at 54 V. The match confirms matter waves.
- G.P. Thomson's transmission rings through thin foils (1927) and later neutron diffraction confirm it too.

### 3.6 Particle in a box (wave picture)

**Idea.** A particle trapped between rigid walls a distance L apart. Its wave must vanish at the walls, so only standing waves fit: a whole number of half-wavelengths.

```latex
\lambda_n = \frac{2L}{n}, \quad p_n = \frac{h}{\lambda_n} = \frac{nh}{2L}, \quad E_n = \frac{p_n^2}{2m} = \frac{n^2 h^2}{8 m L^2}, \quad n = 1, 2, 3, \dots
```

- **Energy is quantised** purely because the wave must fit. This is the key idea behind every bound-state result.
- **No zero energy:** n = 0 would mean no wave at all, so the lowest energy is E₁ = h²/8mL². A confined particle is never at rest.
- Levels spread out as 1, 4, 9, … × E₁, and E₁ grows as L shrinks and as m shrinks. That is why quantisation matters for electrons in atoms and not for marbles in boxes.
- Ch 5.8 gets the same answer from the Schrödinger equation.

### 3.7 Uncertainty principle I (wave view)

**Idea.** A narrow wave group (small Δx) needs many wavelengths (a wide spread Δk). A single exact wavelength (Δk = 0) extends forever (Δx = ∞). This is a property of all waves (Fourier analysis); with p = ħk it becomes a limit on knowledge of x and p.

```latex
\Delta x\,\Delta p \;\ge\; \frac{\hbar}{2}, \qquad \hbar = \frac{h}{2\pi} = 1.055\times10^{-34}\ \text{J s}
```

- Δx and Δp are standard deviations. A Gaussian wave packet gives exactly ħ/2, the minimum.
- It is not a flaw in instruments. The particle doesn't *have* an exact x and p at the same time.

### 3.8 Uncertainty principle II (particle view)

**Heisenberg's microscope.** To see an electron you hit it with at least one photon of wavelength λ. The position is fuzzy by Δx ≈ λ, and the photon kicks the electron by up to Δp ≈ h/λ. So ΔxΔp ≈ h. A shorter λ gives a better position but a bigger kick. This rougher argument gives the same order of magnitude.

### 3.9 Applying the uncertainty principle

**Energy–time form.** A wave group of duration Δt has a frequency spread Δν ≈ 1/Δt, so with E = hν:

```latex
\Delta E\,\Delta t \;\ge\; \frac{\hbar}{2}
```

- **Electron in the nucleus?** Confine it to Δx ≈ 10⁻¹⁴ m. Then Δp ≥ ħ/2Δx ≈ 5 × 10⁻²¹ kg m/s and the KE is about pc ≈ 10 MeV or more. Beta-decay electrons have only a few MeV, so electrons can't be held inside nuclei.
- **Minimum energy of a trapped particle:** take p ≈ Δp ≈ ħ/2Δx and E ≈ p²/2m. This estimates zero-point energies (box, oscillator, hydrogen atom size) to the right order.
- **Natural line width:** an excited state that lives Δt ≈ 10⁻⁸ s has an energy spread ΔE ≥ ħ/2Δt ≈ 3 × 10⁻⁸ eV, so spectral lines have a small natural width.

### What to be able to do without notes

- Write λ = h/p and the shortcut λ ≈ 1.226/√V nm for electrons.
- Explain |Ψ|² as probability density and why normalisation is needed.
- Show v\_p = c²/v and v\_g = v, and explain why a wave packet is needed.
- Describe Davisson–Germer and the numbers that confirmed de Broglie.
- Get E\_n = n²h²/8mL² from standing waves and explain why E = 0 is not allowed.
- Use ΔxΔp ≥ ħ/2 and ΔEΔt ≥ ħ/2 for estimates.

## Questions

The style follows your midsem papers and Quiz-1: short state/explain items, derivations, and no-calculator numericals and estimates. Points are in brackets. Use hc = 1240 eV nm, ħc = 197 eV nm, mₑc² = 0.511 MeV, m\_pc² ≈ m\_nc² ≈ 938 MeV.

### A. State and explain (2–3 points)

1. (2) State de Broglie's hypothesis. Why don't we see wave effects for a cricket ball?
2. (2) What is the physical meaning of |Ψ|²? What does normalisation mean?
3. (3) Why can't a single sinusoidal wave represent a moving particle? What is used instead?
4. (2) Distinguish phase velocity and group velocity. Which one equals the particle's speed?
5. (3) Describe the Davisson–Germer experiment and explain how it confirmed matter waves.
6. (2) Why must the lowest energy of a particle in a box be greater than zero?
7. (2) State the Heisenberg uncertainty principle for position–momentum and for energy–time.
8. (3) "The uncertainty principle is due to the clumsiness of our measuring instruments." Is this correct? Explain.
9. (2) Explain Heisenberg's microscope argument in three lines.
10. (2) Why are spectral lines not perfectly sharp?

### B. Derive or show (3–5 points)

11. (4) Show that the phase velocity of a de Broglie wave is c²/v and that the group velocity equals v.
12. (3) Show that the de Broglie wavelength of an electron accelerated from rest through V volts is λ = h/√(2meV), assuming v ≪ c.
13. (4) Using the standing-wave condition, derive the energy levels of a particle in a 1-D box of width L. Sketch the first three wave functions.
14. (3) Using ΔxΔp ≥ ħ/2, show that an electron can't exist inside a nucleus of size 10⁻¹⁴ m.
15. (4) Using the uncertainty principle, estimate the minimum energy of a particle of mass m in a box of width L. Compare with the exact E₁ = h²/8mL².
16. (3) Using the relativistic relations E = γmc² and p = γmv, write the de Broglie wavelength of an electron with kinetic energy K, valid at all speeds.

### C. Numericals without a calculator (3 points each)

17. Find the de Broglie wavelength of an electron accelerated through 100 V.
18. Find the de Broglie wavelength of a 0.1 kg ball moving at 10 m/s, and compare it with the size of a proton (about 10⁻¹⁵ m).
19. In the Davisson–Germer experiment the electrons were accelerated through 54 V. Find their de Broglie wavelength.
20. An electron is confined to a box 0.1 nm wide. Find E₁ and the energy of the photon emitted in the n = 2 → 1 transition.
21. An electron is located within 0.1 nm. Estimate the minimum spread in its momentum and its minimum kinetic energy.
22. A proton is confined to a nucleus of size 10⁻¹⁴ m. Estimate its minimum kinetic energy. Is this a reasonable nuclear energy scale?
23. An excited atomic state lives 10⁻⁸ s. Find the minimum uncertainty in its energy, in eV.
24. Find the de Broglie wavelength of a thermal neutron with KE = 0.025 eV. Why are such neutrons used to study crystals?

### D. Estimate and discuss

25. (3) Estimate the size of a hydrogen atom using the uncertainty principle: minimise E(r) = ħ²/(2mr²) − ke²/r.
26. (3) Electron microscopes use electrons of about 100 keV. Estimate their wavelength and explain why they resolve much finer detail than light microscopes.
27. (2) A dust grain of 1 μg sits in a 1 μm box. Using E₁ = h²/8mL², explain without exact arithmetic why we never notice its quantised energy.

## Answer key

### A. State and explain

1. A particle of momentum p has wavelength λ = h/p. A 0.1 kg ball at 10 m/s has λ ≈ 7 × 10⁻³⁴ m, far smaller than any slit or obstacle, so it can't show diffraction or interference.
2. |Ψ|² dx is the probability of finding the particle between x and x + dx. Normalisation, ∫|Ψ|² dx = 1, says the particle is certainly somewhere.
3. A single wave has one exact λ and spreads over all space, so it doesn't locate the particle. Its phase velocity c²/v is also faster than light. A wave packet (a superposition of nearby wavelengths) is localised and moves at v.
4. v\_p = ω/k is the speed of the crests of one wave. v\_g = dω/dk is the speed of the envelope of the group. The group velocity equals the particle's speed.
5. A 54 eV electron beam hit a nickel crystal and the scattered intensity showed a peak at 50°. Treating the surface atoms as a grating (d = 0.215 nm), d sinφ = λ gives 0.165 nm, matching h/p = 0.166 nm. Only interference of waves gives such a peak.
6. The wave must vanish at both walls, so at least half a wavelength must fit. That gives a non-zero momentum h/2L and energy h²/8mL². Also, E = 0 would mean exact zero momentum, which the uncertainty principle forbids in a finite box.
7. ΔxΔp ≥ ħ/2 and ΔEΔt ≥ ħ/2.
8. No. It comes from the wave nature of matter: a localised wave packet must contain a spread of wavelengths, so a spread of momenta. A particle simply doesn't have exact x and p together. Better instruments can't beat it.
9. To see an electron you must bounce at least one photon of wavelength λ off it. The position is fixed only to Δx ≈ λ, and the photon's momentum h/λ gives an unknown kick Δp ≈ h/λ. So ΔxΔp ≈ h, however you choose λ.
10. An excited state lives only a finite time Δt, so its energy is uncertain by ΔE ≥ ħ/2Δt. The emitted photons have a spread of energies, which is the natural line width.

### B. Derive or show

11. With E = hν and p = h/λ: ω = 2πE/h and k = 2πp/h. Then v\_p = ω/k = E/p = γmc²/γmv = c²/v. For the group, v\_g = dω/dk = dE/dp. From E² = p²c² + m²c⁴, dE/dp = pc²/E = (γmv)c²/(γmc²) = v. As a check, v\_p v\_g = c².
12. Energy: eV = ½mv² = p²/2m, so p = √(2meV) and λ = h/p = h/√(2meV).
13. ψ = 0 at x = 0 and x = L, so L = nλ/2 and λₙ = 2L/n. Then pₙ = h/λₙ = nh/2L and Eₙ = pₙ²/2m = n²h²/8mL². Sketch: n = 1 is half a sine wave with no nodes inside, n = 2 a full wave with one node in the middle, n = 3 one and a half waves with two nodes.
14. Δp ≥ ħ/2Δx, so Δp c ≥ 197 eV nm / (2 × 10⁻⁵ nm) ≈ 10 MeV. This is far above mₑc² = 0.5 MeV, so KE ≈ pc ≈ 10 MeV. Electrons from beta decay carry only a few MeV, and nothing in the nucleus can bind an electron that strongly. So electrons aren't nuclear constituents.
15. Take Δx ≈ L, so p ≈ Δp ≈ ħ/2L and E ≈ p²/2m = ħ²/8mL². The exact value h²/8mL² is 4π² (about 40) times larger. The estimate gets the scaling right (∝ 1/mL²), which is what it is for.
16. E = K + mc² and E² = p²c² + m²c⁴, so pc = √(K² + 2Kmc²) and λ = hc/√(K² + 2Kmc²). For K ≪ mc² this becomes h/√(2mK).

### C. Numericals

17. λ ≈ 1.226/√100 nm = 0.123 nm.
18. λ = 6.6 × 10⁻³⁴ / (0.1 × 10) = 6.6 × 10⁻³⁴ m, about 10¹⁹ times smaller than a proton.
19. λ ≈ 1.226/√54 ≈ 1.226/7.35 ≈ 0.167 nm.
20. E₁ = (hc)²/(8mₑc²L²) = (1240)² / (8 × 0.511 × 10⁶ × 0.01) eV ≈ 38 eV. The 2 → 1 photon has 4E₁ − E₁ = 3E₁ ≈ 113 eV, in the far ultraviolet.
21. Δp c ≥ ħc/2Δx = 197/0.2 ≈ 1 keV, so Δp ≈ 5 × 10⁻²⁵ kg m/s. KE ≈ (Δp c)²/2mₑc² = (985)²/(1.02 × 10⁶) ≈ 1 eV.
22. Δp c ≥ 197/(2 × 10⁻⁵) ≈ 10 MeV. KE ≈ (10)²/(2 × 938) ≈ 0.05 MeV. Using Δp ≈ ħ/Δx instead gives about 0.2 MeV. Either way it is in the 0.1–1 MeV range, consistent with nuclear energies of a few MeV.
23. ΔE ≥ ħ/2Δt = 6.6 × 10⁻¹⁶ eV s / (2 × 10⁻⁸ s) ≈ 3 × 10⁻⁸ eV.
24. pc = √(2 × 939 × 10⁶ × 0.025) eV ≈ 6.9 keV, so λ = 1240/6900 nm ≈ 0.18 nm. That matches atomic spacings, so the neutrons diffract from crystals. Being neutral, they also go deep into the material.

### D. Estimate and discuss

25. dE/dr = −ħ²/(mr³) + ke²/r² = 0 gives r = ħ²/(mke²) = a₀ ≈ 0.053 nm. Then E = −ke²/2a₀ ≈ −13.6 eV. The uncertainty principle alone gets the size and energy of hydrogen right.
26. At 100 keV, pc = √(0.1² + 2 × 0.1 × 0.511) MeV ≈ 0.335 MeV, so λ ≈ 1240/335 000 nm ≈ 3.7 pm. Visible light is about 500 nm, about 10⁵ times longer. Resolution is limited to about one wavelength, so electrons can see far finer detail (in practice lens defects limit it to about 0.1 nm).
27. m = 10⁻⁹ kg and L = 10⁻⁶ m, so E₁ ≈ (7 × 10⁻³⁴)²/(8 × 10⁻⁹ × 10⁻¹²) ≈ 10⁻⁴⁶ J. Thermal energy kT at room temperature is about 4 × 10⁻²¹ J, about 10²⁵ times bigger. The levels are so close together that the energy looks continuous.
