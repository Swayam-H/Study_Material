# Science-1 QM 1: Particle properties of waves

Light behaves as a wave when it travels (interference, diffraction) and as a stream of photons, each with E = hν and p = h/λ, when it gives or takes energy (blackbody, photoelectric, Compton, pair production). This doc covers Beiser ch 2 (all of 2.1–2.9) and the matching slides `QM.tex:1` to `:136`. No formula sheet is allowed, so the boxed results are the ones to know by heart.

## Explainer

### Light as a wave

By the end of the nineteenth century the nature of light seemed settled. Maxwell had shown that a changing electric field produces a magnetic field and a changing magnetic field produces an electric one, and that together they can travel through empty space as a wave moving at c = 1/√(ε₀μ₀). Hertz produced such waves in the laboratory, and interference and diffraction, which only waves can show, had long been observed for light. A handful of experiments, however, refused to fit this picture, and each of them pointed the same way: in its interaction with matter, light behaves as if its energy came in separate lumps.

### Blackbody radiation

The first difficulty concerned blackbody radiation, the light given off by an ideal absorber held at a temperature T. Its spectrum depends only on T, rising to a peak whose wavelength falls as T increases (Wien's law) and carrying a total power proportional to T⁴ (the Stefan–Boltzmann law). Rayleigh and Jeans calculated the spectrum by treating the radiation inside a cavity as a set of standing waves, each with average energy kT. Since the number of possible standing waves grows without limit at short wavelengths, their result predicted infinite energy in the ultraviolet, which is plainly wrong. Planck removed the trouble by assuming that an oscillator of frequency ν can have only the energies 0, hν, 2hν, and so on. At high frequency hν is much larger than kT, such oscillators are seldom excited, and the spectrum falls back to zero as observed. The constant h was chosen to fit the data and turned out to be one of the fundamental constants of nature.

### The photoelectric effect

The photoelectric effect made the idea of quanta unavoidable. When light falls on a metal surface, electrons are emitted, and the experiments showed three things that the wave theory could not explain. The electrons come out at once, with no delay even in very weak light. Their maximum kinetic energy depends on the frequency of the light and not on its intensity. And below a certain threshold frequency no electrons are emitted however bright the light. Einstein explained all three by supposing that light itself consists of quanta, now called photons, each of energy hν. A single photon gives all its energy to a single electron, which uses part of it, the work function φ, to escape the surface. The rest appears as kinetic energy, so that hν = KE\_max + φ. Brighter light means more photons and therefore more electrons, but not faster ones.

### Wave–particle duality

It does not follow that the wave theory of light is wrong. Light still shows interference and diffraction, and these can only be understood with waves. The two descriptions are complementary. The wave picture tells us how light travels and where it is likely to be found, while the photon picture describes how it gives up or takes on energy when it meets matter. Neither alone is complete.

### X-rays and X-ray diffraction

X-rays provide the photoelectric effect in reverse. When fast electrons strike a target they are decelerated and emit radiation, and the shortest wavelength in the resulting spectrum corresponds to an electron that gives all its kinetic energy eV to a single photon, so that λ\_min = hc/eV. Because X-ray wavelengths are comparable to the spacing of atoms in a crystal, the regular planes of atoms act as a diffraction grating. Waves reflected from successive planes reinforce one another when the extra path 2d sinθ is a whole number of wavelengths, which is Bragg's law. X-ray diffraction is at once a proof that X-rays are waves and a tool for measuring crystal structures.

### The Compton effect

The Compton effect shows that a photon carries momentum as well as energy. When X-rays are scattered by the loosely bound electrons in a target, the scattered rays have a longer wavelength than the incident ones, and the shift depends on the scattering angle. Treating the event as a collision between a photon of momentum p = h/λ and an electron at rest, and applying conservation of energy and of momentum, gives λ′ − λ = (h/mc)(1 − cosφ). The quantity h/mc = 2.43 pm is the Compton wavelength of the electron. The agreement of this formula with experiment is the most direct evidence that photons behave like particles in collisions.

### Pair production and photons in gravity

At still higher energies a photon can disappear entirely and create matter. In pair production a photon passing near a nucleus turns into an electron and a positron. Its energy must be at least 2mc² = 1.02 MeV, and the presence of the nucleus is needed so that momentum can be conserved. The reverse process, annihilation, turns an electron and positron into two photons. These processes show that the photon is a particle in the full sense of relativity, with energy E = hν, momentum p = hν/c and zero rest mass. Since a photon has energy it also behaves as if it had a mass hν/c² in a gravitational field, and light rising out of a gravitational field loses energy and so shifts to lower frequency.

## Summary

### Constants to memorise

| Constant | Value | Handy form |
| --- | --- | --- |
| Planck's constant h | 6.626 × 10⁻³⁴ J s | 4.136 × 10⁻¹⁵ eV s |
| hc | 1.986 × 10⁻²⁵ J m | **1240 eV nm** |
| Speed of light c | 3.00 × 10⁸ m/s |  |
| Electron rest energy mₑc² | 0.511 MeV |  |
| Electron charge e | 1.602 × 10⁻¹⁹ C | 1 eV = 1.602 × 10⁻¹⁹ J |
| Boltzmann k | 1.381 × 10⁻²³ J/K | 8.617 × 10⁻⁵ eV/K |
| Compton wavelength of electron h/mₑc | 2.426 pm |  |
| Wien constant b | 2.898 × 10⁻³ m K |  |
| Stefan–Boltzmann σ | 5.67 × 10⁻⁸ W m⁻² K⁻⁴ |  |

### 2.1 Electromagnetic waves

**Idea.** Maxwell's equations in vacuum give wave equations for E and B. The solutions are transverse waves moving at c = 1/√(μ₀ε₀), with E ⊥ B ⊥ direction of travel.

```latex
\frac{\partial^2 \vec E}{\partial t^2} = \frac{1}{\mu_0\varepsilon_0}\nabla^2 \vec E, \qquad \vec E = \vec E_0\, e^{i(kz-\omega t)}, \qquad c = \nu\lambda
```

- **Evidence for waves:** Young's double slit (1801), diffraction gratings, polarisation. Superposition explains interference: amplitudes add, so intensity is not the sum of intensities.
- **History on the slides:** Huygens (wave) vs Newton (corpuscles), Young, Fresnel, Maxwell. Be able to name what each contributed.
- **Why it matters:** each later section shows a fact that waves *can't* explain.

### 2.2 Blackbody radiation

**Idea.** A blackbody absorbs everything that falls on it. Its emitted spectrum depends only on temperature, not on the material (Kirchhoff). A small hole in a cavity is the model.

- **Empirical laws:** Stefan–Boltzmann P/A = σT⁴ (total power) and Wien's displacement λ\_max T = 2.898 × 10⁻³ m K (peak moves to shorter λ as T rises).
- **Rayleigh–Jeans (classical):** count standing-wave modes in the cavity, give each mode kT by equipartition. The mode density grows as ν², so the energy density u(ν) ∝ ν²T. It fits at low ν but goes to infinity at high ν: the **ultraviolet catastrophe**.
- **Wien's formula** fits at high ν but fails at low ν.
- **Planck (1900):** an oscillator of frequency ν can only have energies E = nhν. The average energy per mode is then not kT but

```latex
\bar\varepsilon = \frac{h\nu}{e^{h\nu/kT}-1}, \qquad u(\nu)\,d\nu = \frac{8\pi h}{c^3}\,\frac{\nu^3\,d\nu}{e^{h\nu/kT}-1}
```

- **Limits:** for hν ≪ kT the average becomes kT (Rayleigh–Jeans comes back). For hν ≫ kT it is ≈ hν e^(−hν/kT), so high-frequency modes are frozen out and the catastrophe disappears.
- **Physical picture:** a high-frequency mode needs a large quantum hν. At temperature T there is rarely enough thermal energy to excite it.
- The slides write the same law as intensity: I(ν) = (2hν³/c²)/(e^(hν/kT) − 1). Both forms are fine; they differ by a factor c/4π and the solid angle.

### 2.3 Photoelectric effect

**Idea.** Light shining on a metal ejects electrons. The wave theory predicts the wrong things.

| Observation | Wave theory expects | What happens |
| --- | --- | --- |
| Delay before emission | Time to soak up energy at low intensity | Electrons come out at once |
| Effect of intensity | Brighter light → faster electrons | Brighter light → *more* electrons, same KE\_max |
| Effect of frequency | No threshold | Below a cutoff ν₀ there is no emission at all |
| KE\_max vs ν | No link | KE\_max rises linearly with ν |

**Einstein (1905):** light arrives as photons of energy hν. One photon gives all its energy to one electron. The electron spends at least the work function φ to escape.

```latex
h\nu = KE_{max} + \phi, \qquad \phi = h\nu_0, \qquad eV_0 = KE_{max}
```

- **Stopping potential V₀:** the reverse voltage that stops even the fastest electrons. A plot of V₀ against ν is a straight line with slope h/e and intercept ν₀. Millikan used this to measure h.
- **Intensity** sets the number of photons per second, so it sets the current, not KE\_max.
- **Typical φ:** 2–5 eV (e.g. Na about 2.3 eV, Cu about 4.7 eV).

### 2.4 What is light?

Light is both. The wave picture tells you *where* photons are likely to arrive (intensity ∝ |E|² ∝ photon density). The particle picture tells you *how* energy is exchanged, one quantum hν at a time. In a single experiment light shows one face or the other, never both at once. This is wave–particle duality.

### 2.5 X-rays

**Idea.** X-ray production is the inverse photoelectric effect. Electrons accelerated through a voltage V hit a metal target and lose kinetic energy, emitting photons.

- **Bremsstrahlung** ("braking radiation") gives a continuous spectrum.
- **Cutoff wavelength:** the shortest λ comes from an electron that loses all its energy eV in one photon. It depends only on V, not on the target (Duane–Hunt law).

```latex
\lambda_{min} = \frac{hc}{eV} = \frac{1.24\times10^{-6}\ \text{V m}}{V}
```

- **Characteristic lines** (Kα, Kβ) sit on top of the continuum. They depend on the target metal and come from inner-shell transitions (more in ch 4 and 7).
- X-ray wavelengths are about 0.01–10 nm, similar to atomic spacings, which is why crystals diffract them.

### 2.6 X-ray diffraction

**Idea.** The atoms in a crystal form parallel planes a distance d apart. X-rays reflected from successive planes interfere. They reinforce when the extra path 2d sinθ is a whole number of wavelengths.

```latex
2d\sin\theta = n\lambda \qquad (n = 1, 2, 3, \dots)
```

- θ is measured from the **plane**, not from the normal. A common slip.
- Uses: measure λ if d is known, or measure crystal structure (d) if λ is known. The NaCl pattern on the slides is an example.
- This is clear wave behaviour from the same radiation that shows particle behaviour in 2.7.

### 2.7 Compton effect

**Idea.** X-rays scattered by (nearly free) electrons come out with a **longer** wavelength, and the shift depends only on the scattering angle. A wave would scatter at the same wavelength. A photon–electron billiard-ball collision explains it.

**Derivation outline** (know the steps):

1. Photon momentum p = E/c = h/λ, because E = pc for a massless particle (from E² = p²c² + m²c⁴ with m = 0).
2. Conserve momentum along and across the incident direction.
3. Conserve total energy, using relativistic electron energy E² = p²c² + m²c⁴.
4. Eliminate the electron's recoil angle by squaring and adding the momentum equations, then substitute into the energy equation.

```latex
\lambda' - \lambda = \frac{h}{m_e c}\,(1-\cos\phi) = \lambda_C\,(1-\cos\phi), \qquad \lambda_C = 2.426\ \text{pm}
```

- The maximum shift is 2λ\_C at φ = 180°. There is no shift at φ = 0.
- The shift is fixed in absolute size (picometres), so it is noticeable only for short λ: X-rays and gamma rays, not visible light.
- An unshifted peak also appears, from photons scattered by the whole atom (huge mass, tiny λ\_C).

### 2.8 Pair production

**Idea.** A high-energy photon can turn into an electron–positron pair. This is energy converted into rest mass.

- **Threshold:** hν ≥ 2mₑc² = 1.02 MeV. Any extra energy becomes the pair's kinetic energy.
- **A nucleus must be nearby.** In empty space you can't conserve energy and momentum together: a photon with energy E has momentum E/c, but a pair with total energy E always has momentum less than E/c. The nucleus absorbs the extra momentum while taking almost no energy.
- **Annihilation:** e⁺ + e⁻ → two photons of 0.511 MeV each, going in opposite directions (two photons are needed to conserve momentum when the pair is at rest).
- **Photon absorption in matter:** the photoelectric effect dominates at low energy, Compton scattering at medium energy, and pair production above a few MeV. Intensity falls as I = I₀e^(−μx), where μ is the linear attenuation coefficient.

### 2.9 Photons and gravity

- A photon has no rest mass, but it has energy hν, so it behaves as if it has gravitational mass m = hν/c².
- **Gravitational red shift:** a photon climbing out of a star's gravity loses energy, so its frequency drops. The fractional shift is Δν/ν ≈ GM/(Rc²). It has been measured on Earth (Pound–Rebka, 1960, a 22.5 m tower) and in white-dwarf spectra.
- **Black hole:** if R ≤ 2GM/c² (the Schwarzschild radius), even light can't escape.

### What to be able to do without notes

- State which experiments show light as a wave (double slit, X-ray diffraction) and which show it as a particle (blackbody, photoelectric, Compton, pair production), each with one line of why.
- Explain the ultraviolet catastrophe and how quantisation removes it, without the full mode-counting derivation.
- Write and use hν = KE\_max + φ, λ\_min = hc/eV, 2d sinθ = nλ, the Compton formula and the 1.02 MeV threshold.
- Derive the Compton shift in about 10 lines.
- Explain why pair production needs a nucleus.

## Questions

These follow the style of your past papers (2025 and 2026 midsems, Quiz-1, the `sci_midsem.pdf` thermo answers) and the homework list. Expect short "state / explain / show" items for 2–3 points, derivations for 4–6 points, and estimates with round numbers, because no calculator is allowed. Points are shown in brackets. Answers are in the next section; try each question first.

### A. State and explain (2–3 points each)

1. (2) State the Stefan–Boltzmann law and Wien's displacement law. What does each tell you about a hotter blackbody?
2. (3) What is the ultraviolet catastrophe? How did Planck's hypothesis remove it?
3. (3) List three observations of the photoelectric effect that the wave theory of light cannot explain.
4. (2) State Einstein's photoelectric equation and define every symbol.
5. (2) Why does doubling the intensity of light double the photocurrent but leave the stopping potential unchanged?
6. (2) What is meant by wave–particle duality of light? Name one experiment for each side.
7. (2) Why is X-ray production called the inverse photoelectric effect?
8. (2) State Bragg's law. Why can a crystal diffract X-rays but not visible light?
9. (3) In Compton scattering, why does the scattered radiation have a longer wavelength? Why is the effect not seen with visible light?
10. (2) Why can pair production not happen in empty space?
11. (2) What is gravitational red shift? Why does it suggest a photon has gravitational mass?
12. (2) Show that a photon of wavelength λ has momentum h/λ.

### B. Derive or show (4–6 points)

13. (4) Starting from u(ν) = (8πhν³/c³)/(e^(hν/kT) − 1), show that it reduces to the Rayleigh–Jeans law for hν ≪ kT. What happens for hν ≫ kT?
14. (5) Derive the Compton shift formula λ′ − λ = (h/mₑc)(1 − cosφ). State every conservation law you use.
15. (4) Using conservation of energy and momentum, show that a free electron cannot absorb a photon completely.
16. (4) Show that the minimum photon energy for pair production is 2mₑc² when a heavy nucleus is present, and explain why the nucleus takes almost no energy.
17. (4) Derive Bragg's condition 2d sinθ = nλ from the path difference between rays reflected from two adjacent planes.
18. (3) Show that the stopping potential is a linear function of frequency. What are its slope and intercept?

### C. Numericals without a calculator (3–4 points)

Use hc = 1240 eV nm and mₑc² = 0.511 MeV.

19. (3) Light of wavelength 310 nm falls on a metal with work function 2.0 eV. Find KE\_max of the photoelectrons and the stopping potential.
20. (3) The threshold wavelength for a metal is 620 nm. Find its work function in eV.
21. (3) An X-ray tube runs at 40 kV. Find the cutoff wavelength.
22. (3) X-rays of wavelength 0.1 nm reflect from a crystal at a first-order Bragg angle of 30°. Find the plane spacing d.
23. (4) X-rays of wavelength 10.0 pm are Compton-scattered at 90°. Find the scattered wavelength and the kinetic energy given to the electron (in keV).
24. (3) What is the maximum Compton shift for scattering off an electron? Off a proton (m\_p ≈ 1836 mₑ)?
25. (3) The Sun's surface is at about 5800 K. Estimate the wavelength of peak emission. What colour is that?
26. (3) A 1.5 MeV gamma ray makes an electron–positron pair. What is their total kinetic energy?
27. (3) Estimate how many photons per second a 1 mW red laser pointer (650 nm) emits.

### D. Estimate and discuss (homework and Quiz-1 style)

28. (3) Estimate the number of visible photons per second reaching your eye from a 100 W bulb 10 m away. State your assumptions.
29. (3) A detector shows electrons leaving a metal within 10⁻⁹ s of the light being switched on. Estimate how long the wave theory says it would take at an intensity of 10⁻⁶ W/m², assuming an electron absorbs over an area of one atom (about 10⁻²⁰ m²) and needs 2 eV.
30. (4) Rank the photoelectric effect, Compton scattering and pair production by the photon energy at which each dominates in lead. Explain the ranking in one line each.
31. (3) Explain, in your own words, why Planck himself thought quantisation was a mathematical trick, and what convinced physicists that it was real.

## Answer key

The answers are short, the way an exam answer should be. The rubrics penalise over-long answers.

### A. State and explain

1. Total power per area P/A = σT⁴, so doubling T gives 16× the power. λ\_max T = 2.898 × 10⁻³ m K, so a hotter body peaks at a shorter wavelength.
2. Classically, every cavity mode gets kT, and the number of modes grows as ν², so the predicted energy density diverges at high ν (UV). Planck allowed only energies nhν. High-ν modes then need quanta much bigger than kT and are rarely excited, so u(ν) falls back to zero.
3. Any three of: no time delay; KE\_max does not depend on intensity; there is a threshold frequency; KE\_max rises linearly with ν.
4. hν = KE\_max + φ. Here hν is the photon energy, KE\_max the largest electron kinetic energy, and φ the work function, the minimum energy to free an electron from the surface.
5. Intensity is the number of photons per second. More photons free more electrons, so the current rises. Each photon still carries hν, so KE\_max = eV₀ is unchanged.
6. Light shows wave behaviour in propagation (Young's double slit, X-ray diffraction) and particle behaviour in energy exchange (photoelectric effect, Compton effect). It never shows both in the same measurement.
7. In the photoelectric effect a photon's energy becomes electron KE. In an X-ray tube, electron KE (from eV) becomes photon energy.
8. 2d sinθ = nλ. Diffraction needs λ comparable to the spacing d (about 0.1 nm). Visible light (400–700 nm) is thousands of times too long.
9. The photon gives part of its energy and momentum to the recoiling electron, so it leaves with less energy and a longer λ. The shift is at most 4.85 pm, which is negligible next to 500 nm but large next to a 10 pm X-ray.
10. A photon of energy E has momentum E/c. A pair with total energy E has momentum less than E/c, because the particles have rest mass. Energy and momentum can't both balance unless a third body (a nucleus) takes up momentum.
11. A photon climbing out of a gravitational field loses energy, so its frequency drops. Losing energy to gravity is what a mass does, so the photon acts as if it has mass hν/c².
12. For a massless particle E² = p²c² + m²c⁴ gives E = pc. With E = hν = hc/λ, p = h/λ.

### B. Derive or show

13. For x = hν/kT ≪ 1, eˣ − 1 ≈ x, so u(ν) ≈ (8πhν³/c³)(kT/hν) = 8πν²kT/c³, the Rayleigh–Jeans law. For x ≫ 1, u ≈ (8πhν³/c³)e^(−hν/kT), Wien's form, which goes to zero at high ν.
14. Let the photon (λ) hit an electron at rest. It scatters at angle φ with λ′, and the electron recoils at θ with momentum p.
    - x-momentum: h/λ = (h/λ′)cosφ + p cosθ
    - y-momentum: 0 = (h/λ′)sinφ − p sinθ
    - Square and add to remove θ: p² = (h/λ)² + (h/λ′)² − 2(h/λ)(h/λ′)cosφ
    - Energy: hc/λ + mc² = hc/λ′ + √(p²c² + m²c⁴)
    - Move hc/λ′ across, square, and substitute p². The p² and m²c⁴ terms cancel and you get 2mc²(hc/λ − hc/λ′) = 2(hc)²(1 − cosφ)/(λλ′).
    - Multiply by λλ′/(2mc²hc): λ′ − λ = (h/mc)(1 − cosφ).
15. Take the electron at rest. Energy: hν + mc² = Eₑ. Momentum: pₑ = hν/c. Then Eₑ² = pₑ²c² + m²c⁴ gives (hν + mc²)² = (hν)² + m²c⁴, so 2hν mc² = 0 and ν = 0. So a free electron can only scatter a photon (Compton), never absorb it. In the photoelectric effect the lattice takes up the momentum.
16. Energy: hν = 2mc² + KE₊ + KE₋ + KE\_nucleus. The nucleus takes momentum p ≤ hν/c, and its kinetic energy is p²/2M. For M ≫ m this is tiny, so the threshold is hν = 2mc² = 1.02 MeV.
17. Two rays reflect from adjacent planes at glancing angle θ. The lower ray travels an extra d sinθ going in and d sinθ coming out, 2d sinθ in all. Constructive interference needs this to equal nλ.
18. eV₀ = hν − φ, so V₀ = (h/e)ν − φ/e. The slope is h/e, the same for every metal. The ν-intercept is the threshold ν₀ = φ/h, and the V-intercept is −φ/e.

### C. Numericals

19. E = 1240/310 = 4.0 eV. KE\_max = 4.0 − 2.0 = 2.0 eV. V₀ = 2.0 V.
20. φ = 1240/620 = 2.0 eV.
21. λ\_min = 1240 eV nm / 40 000 eV = 0.031 nm = 31 pm.
22. d = nλ/(2 sinθ) = 0.1/(2 × 0.5) = 0.1 nm.
23. Δλ = 2.43(1 − cos 90°) = 2.43 pm, so λ′ = 12.43 pm. E = 1240/0.0100 nm = 124 keV and E′ = 1240/0.01243 ≈ 100 keV. The electron gets about 24 keV.
24. Maximum at φ = 180°: 2λ\_C = 4.85 pm for an electron. For a proton λ\_C = 2.43 pm / 1836 ≈ 1.3 fm, so the maximum is about 2.6 fm, far too small to see.
25. λ\_max = 2.9 × 10⁻³ / 5800 ≈ 5 × 10⁻⁷ m = 500 nm, blue-green. The Sun looks white because it emits strongly across the whole visible band.
26. KE = 1.5 − 1.02 = 0.48 MeV, shared between the two particles.
27. E = 1240/650 ≈ 1.9 eV ≈ 3 × 10⁻¹⁹ J. N = 10⁻³ / 3 × 10⁻¹⁹ ≈ 3 × 10¹⁵ photons per second.

### D. Estimate and discuss

28. Assume about 5% of 100 W is visible light, or 5 W, with photons of about 2.5 eV (4 × 10⁻¹⁹ J). That is about 10¹⁹ photons/s. At 10 m they spread over 4πr² ≈ 1.3 × 10³ m². A pupil 4 mm across has area about 1.3 × 10⁻⁵ m², so it catches a fraction of about 10⁻⁸, or roughly 10¹¹ photons per second.
29. Power on one atom = 10⁻⁶ × 10⁻²⁰ = 10⁻²⁶ W. 2 eV ≈ 3 × 10⁻¹⁹ J, so t ≈ 3 × 10⁷ s, about a year. Electrons actually come out in nanoseconds, so energy must arrive in lumps (photons).
30. In lead, the photoelectric effect dominates below about 0.5 MeV, because the photon is absorbed whole by a bound electron. Compton scattering dominates from about 0.5 to 5 MeV, because the photon energy is far above the binding energy, so electrons act free. Pair production dominates above about 5 MeV; it is only possible above 1.02 MeV and grows with energy and with Z².
31. Planck introduced E = nhν only to fit the data and hoped a better theory would remove it (his slide note says the same). Einstein's photoelectric explanation (1905) and Compton's experiment (1923) showed that light itself comes in quanta with energy hν and momentum h/λ. After that, quantisation was accepted as real.
