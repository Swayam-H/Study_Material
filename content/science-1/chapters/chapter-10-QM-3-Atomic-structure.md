# Learn: Atomic structure

An atom is a tiny nucleus with electrons in allowed orbits that fit a whole number of de Broglie wavelengths. That gives hydrogen's levels Eₙ = −13.6 eV/n², and jumps between levels produce the line spectra. This doc covers Beiser ch 4 (4.1–4.9; the Rutherford-scattering appendix is excluded) and the slides `QM.tex:224` to `:257`, plus the laser frame in `StatMech.tex`.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## The nuclear atom

An atom is electrically neutral, yet it contains negatively charged electrons, so it must also contain positive charge. Rutherford's scattering of alpha particles from thin gold foil showed where that charge is. Most alpha particles passed straight through, but a few were deflected through large angles, some almost straight back. Such violent deflections can only come from a very strong force acting at close range, and Rutherford concluded that all the positive charge and nearly all the mass of an atom are concentrated in a tiny nucleus, about 10⁻¹⁴ m across, with the electrons spread over a region ten thousand times larger.

## Why the planetary model fails

This nuclear atom raises an immediate question: what keeps the electrons from falling into the nucleus? A stationary electron would be pulled in, so it seems natural to imagine it circling the nucleus as a planet circles the sun, with the electric attraction supplying the centripetal force. For hydrogen this gives a total energy E = −e²/(8πε₀r), negative because the electron is bound. The planetary model, however, fails at once. An electron moving in a circle is accelerating, and classical electromagnetism says an accelerated charge radiates. The electron should lose energy continuously and spiral into the nucleus in about 10⁻⁸ s. Atoms would not exist.

## Atomic spectra

The spectra of atoms gave a second clue. A heated gas does not emit a continuous range of wavelengths but a set of sharp lines that are characteristic of the element. The lines of hydrogen fall into series, and the wavelengths of each series fit the simple formula 1/λ = R(1/n\_f² − 1/n\_i²), with n\_f = 1 for the Lyman series in the ultraviolet, 2 for the Balmer series in the visible, 3 for the Paschen series in the infrared, and so on. Any successful theory of the atom must explain this formula and the value of the Rydberg constant R.

## The Bohr atom

Bohr's theory combined the nuclear atom with the wave nature of the electron. If the electron is a wave, an orbit can only be stable if the wave joins up smoothly with itself after one circuit, which means the circumference must contain a whole number of de Broglie wavelengths: 2πrₙ = nλ. Combined with the force balance, this gives orbit radii rₙ = n²a₀, where a₀ = 0.0529 nm is the Bohr radius, and energies Eₙ = −13.6 eV/n². The integer n is a quantum number, and the allowed orbits correspond to the allowed energy levels of the atom. An electron in one of these stationary states does not radiate. Light is emitted only when the electron drops from a higher level to a lower one, and the photon carries away the difference in energy, hν = Eᵢ − E\_f. Putting the formula for Eₙ into this condition reproduces the observed spectral series and gives the Rydberg constant in terms of e, m, h and ε₀, in excellent agreement with experiment.

## Correspondence principle and nuclear motion

Bohr was guided by the correspondence principle, which says that a quantum theory must agree with classical physics in the limit where classical physics is known to work. For very large n the energy levels are so close together that they are almost continuous, and the frequency of the photon emitted in a jump from n to n − 1 becomes equal to the frequency with which the electron goes round its orbit, which is just what classical theory predicts. The small difference between the observed and predicted spectra is removed by noting that the nucleus is not infinitely heavy. Electron and nucleus both move about their common centre of mass, and the electron mass in the formulas should be replaced by the reduced mass m′ = mM/(m + M). This correction explains, among other things, the slight difference between the spectra of hydrogen and deuterium.

## Atomic excitation and Franck–Hertz

The energy levels of an atom can be raised in several ways. The atom can absorb a photon of exactly the right energy, or it can be struck by another particle and take up part of its kinetic energy. Franck and Hertz demonstrated the second process directly. They accelerated electrons through mercury vapour and measured the current that reached a collector. As the accelerating voltage was raised the current increased, but it fell sharply each time the voltage passed a multiple of 4.9 V. At those energies the electrons could excite mercury atoms in inelastic collisions, losing 4.9 eV and no longer reaching the collector. The excited atoms then emitted ultraviolet light of exactly the wavelength corresponding to 4.9 eV. The experiment showed that atomic energy levels are real and discrete, independently of any spectrum.

## The laser

The laser is a practical application of these ideas. An atom in an excited state can drop to a lower state spontaneously, or it can be stimulated to do so by a passing photon of the same energy. In stimulated emission the new photon has the same frequency, direction and phase as the one that triggered it, so the light is amplified. Normally most atoms are in the lower state and absorption outweighs emission. A laser works by producing a population inversion, in which more atoms occupy a metastable upper level than the level below it. Placed between two mirrors, the medium then amplifies light travelling back and forth along the axis, and the result is an intense, monochromatic and coherent beam.

# Reference: Atomic structure

The course material section by section, in the order of the textbook, with the key formulas.

## 4.1 The nuclear atom

- **Thomson's "plum pudding" model:** positive charge spread through the atom with electrons embedded in it. It predicts only small deflections of alpha particles.
- **Geiger–Marsden experiment:** alpha particles fired at thin gold foil. Most went straight through, but a few bounced back at large angles.
- **Rutherford (1911):** large-angle scattering needs a concentrated charge. Nearly all the mass and all the positive charge sit in a nucleus of radius about 10⁻¹⁴ m, while the atom is about 10⁻¹⁰ m. **An atom is largely empty space.**
- You need only the conclusions. The scattering formula derivation (the appendix) is not in your syllabus.

## 4.2 Electron orbits

**Planetary model.** For a circular orbit, the Coulomb force provides the centripetal force:

$$
\frac{mv^2}{r} = \frac{e^2}{4\pi\varepsilon_0 r^2} \;\Rightarrow\; v = \frac{e}{\sqrt{4\pi\varepsilon_0 m r}}, \qquad E = KE + PE = -\frac{e^2}{8\pi\varepsilon_0 r}
$$

- E is negative because the electron is bound. The ionisation energy of hydrogen is 13.6 eV, which gives r = 5.3 × 10⁻¹¹ m.
- **Why it fails:** an accelerating charge radiates (classical electromagnetism). The electron should spiral into the nucleus in about 10⁻⁸ s, giving off a continuous spectrum. Real atoms are stable and give sharp lines.

## 4.3 Atomic spectra

- A hot gas emits light only at certain wavelengths (an **emission** line spectrum). Cool gas in front of white light absorbs the same wavelengths (an **absorption** spectrum). Each element has its own pattern.
- **Hydrogen series:** all fit one formula, with R = 1.097 × 10⁷ m⁻¹:

$$
\frac{1}{\lambda} = R\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right)
$$

| Series | n\_f | Region |
| --- | --- | --- |
| Lyman | 1 | Ultraviolet |
| Balmer | 2 | Visible (Hα 656 nm, Hβ 486 nm, …) |
| Paschen | 3 | Infrared |
| Brackett, Pfund | 4, 5 | Infrared |

- The **series limit** (n\_i → ∞) is the shortest wavelength in each series: 91.2 nm for Lyman, 365 nm for Balmer.

## 4.4 The Bohr atom

**Key idea.** An electron orbit is stable only if its circumference holds a whole number of de Broglie wavelengths. The electron wave then reinforces itself instead of cancelling.

$$
2\pi r_n = n\lambda = \frac{nh}{mv} \;\Leftrightarrow\; L = mvr_n = n\hbar
$$

- So **angular momentum is quantised** in units of ħ. That was Bohr's original postulate; the de Broglie picture explains it.
- Combine with the force balance from 4.2:

$$
r_n = n^2 a_0, \qquad a_0 = \frac{4\pi\varepsilon_0\hbar^2}{me^2} = 0.0529\ \text{nm}
$$

- The orbital speed is vₙ = αc/n, with α ≈ 1/137, so v₁ ≈ 2.2 × 10⁶ m/s (non-relativistic, so Bohr's treatment is consistent).

## 4.5 Energy levels and spectra

$$
E_n = -\frac{me^4}{8\varepsilon_0^2 h^2}\,\frac{1}{n^2} = \frac{E_1}{n^2}, \qquad E_1 = -13.6\ \text{eV}
$$

- **Ground state** n = 1. **Excited states** n = 2, 3, … Ionisation means taking the electron to n = ∞ (E = 0), which needs 13.6 eV from the ground state.
- **Photon emitted** when the electron drops from n\_i to n\_f:

$$
h\nu = E_i - E_f = -E_1\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right) \quad\Rightarrow\quad R = \frac{-E_1}{hc} = \frac{me^4}{8\varepsilon_0^2 ch^3}
$$

- This derives the Rydberg constant from h, m, e and ε₀, Bohr's great success.
- **Hydrogen-like ions** (He⁺, Li²⁺) with nuclear charge Ze: Eₙ = −13.6 Z²/n² eV and rₙ = n²a₀/Z.
- **Limits:** it works only for one-electron atoms. It can't give line intensities or fine structure, and it treats the electron as a particle on a definite orbit, which ch 6 replaces.

## 4.6 Correspondence principle

At large n the levels get close together. The frequency of a photon from n → n − 1 approaches the classical orbital frequency f = v/2πr of the electron, which is the frequency classical radiation theory predicts. **Quantum physics must give classical results in the limit of large quantum numbers.** Bohr used this as a check on the model.

## 4.7 Nuclear motion

The nucleus is not infinitely heavy. Electron and nucleus both orbit their centre of mass, which you handle (as in the two-body problem in chunk 4) by replacing m with the reduced mass:

$$
m' = \frac{mM}{m+M}
$$

- For hydrogen m′ = 0.99946 m, so energies change by about 0.05%. This shifts spectral lines slightly.
- That small shift led to the discovery of **deuterium** (Urey, 1932): its lines sit slightly apart from hydrogen's because its nucleus is twice as heavy.
- In **positronium** (e⁺ e⁻) m′ = m/2, so all energies are halved.

## 4.8 Atomic excitation

An atom can be raised to an excited state in two ways:

1. **Collisions** with electrons or other atoms (as in a gas discharge or a flame).
2. **Absorbing a photon** of exactly the right energy, which is why absorption lines match emission lines.

The excited atom returns to lower levels in about 10⁻⁸ s, emitting photons.

**Franck–Hertz experiment (1914).** Electrons are accelerated through mercury vapour toward a grid, with a small retarding voltage before the collector.

- As the voltage rises, the current rises, then drops sharply at 4.9 V, then rises again and drops again at 9.8 V, 14.7 V, and so on.
- **Reason:** an electron with 4.9 eV can give exactly that energy to a mercury atom (exciting its first level), and then lacks the energy to pass the retarding voltage. Below 4.9 eV the collisions are elastic.
- The mercury glows with ultraviolet light at 253.6 nm, and hc/4.9 eV = 253 nm. **This shows directly that atoms have discrete energy levels**, independent of spectra.

## 4.9 The laser

**LASER** = Light Amplification by Stimulated Emission of Radiation.

| Process | What happens |
| --- | --- |
| Induced absorption | A photon hν raises an atom from E₁ to E₂ |
| Spontaneous emission | An excited atom drops by itself at a random time and in a random direction |
| Stimulated emission | A passing photon hν makes an excited atom emit a second photon with the same frequency, phase, direction and polarisation |

- Einstein (1917) showed the stimulated emission rate equals the absorption rate per atom. Normally most atoms are in lower states, so absorption wins.
- **Population inversion:** more atoms in the upper state than the lower. Then stimulated emission wins and light is amplified.
- **Metastable state:** a level that lives much longer than usual (about 10⁻³ s instead of 10⁻⁸ s), so atoms can pile up in it.
- **Three-level laser** (e.g. ruby): pump atoms to a high level, they drop quickly to a metastable level, and the laser transition is from there to the ground state. More than half the atoms must leave the ground state, which is hard.
- **Four-level laser** (e.g. helium–neon): the laser transition ends on a level above the ground state that empties quickly, so inversion is easy and the laser can run continuously.
- **The cavity:** mirrors at both ends bounce photons back and forth so stimulated emission builds up. One mirror lets a little light out as the beam.
- **Properties:** monochromatic, coherent, highly directional, intense.

## What to be able to do without notes

- Explain why the planetary atom fails and how the de Broglie condition fixes it.
- Derive rₙ = n²a₀ and Eₙ = −13.6/n² eV, and the Rydberg formula from Eₙ.
- Name the series and their regions; compute a transition wavelength.
- State the correspondence principle with an example.
- Explain the reduced-mass correction and how it found deuterium.
- Describe Franck–Hertz and what the 4.9 V dips mean.
- Explain stimulated emission, population inversion, metastable states, and 3- vs 4-level lasers.

# Practice: Atomic structure

31 questions with worked answers (tap a solution to open it). The style follows your midsem papers and Quiz-1. Points are in brackets. Use hc = 1240 eV nm, E₁ = −13.6 eV, a₀ = 0.053 nm, α ≈ 1/137.

## A. State and explain

### Problem 1 [QM 3 · Recall · 3 pts]

What did Rutherford's alpha-scattering experiment show, and why did it rule out Thomson's model?

*Solution.* Most alpha particles passed straight through gold foil, but about 1 in 8000 bounced back at large angles. Thomson's spread-out charge can only deflect alphas slightly. A large deflection needs a strong field from a tiny, heavy, positive nucleus about 10⁻¹⁴ m across, so the atom is mostly empty space.

### Problem 2 [QM 3 · Recall · 2 pts]

Why does classical physics predict that a planetary atom is unstable?

*Solution.* An orbiting electron accelerates, and an accelerating charge radiates energy. It would lose energy continuously and spiral into the nucleus in about 10⁻⁸ s, giving a continuous spectrum. Real atoms are stable and have sharp lines.

### Problem 3 [QM 3 · Recall · 2 pts]

State Bohr's postulates.

*Solution.* (i) Electrons move in certain stationary orbits without radiating. (ii) These orbits have L = nħ. (iii) A photon hν = Eᵢ − E\_f is emitted or absorbed only when the electron jumps between orbits.

### Problem 4 [QM 3 · Recall · 2 pts]

How does the de Broglie hypothesis explain Bohr's quantisation of angular momentum?

*Solution.* A stable orbit holds a whole number of wavelengths: 2πr = nλ = nh/mv. Rearranged, mvr = nh/2π = nħ.

### Problem 5 [QM 3 · Recall · 2 pts]

Name the hydrogen spectral series and the region of the spectrum each lies in.

*Solution.* Lyman (to n = 1): ultraviolet. Balmer (to n = 2): visible. Paschen (to n = 3), Brackett (n = 4) and Pfund (n = 5): infrared.

### Problem 6 [QM 3 · Recall · 2 pts]

State the correspondence principle.

*Solution.* Quantum physics must give the same results as classical physics in the limit of large quantum numbers.

### Problem 7 [QM 3 · Recall · 2 pts]

Why do the spectral lines of deuterium differ slightly from those of hydrogen?

*Solution.* The energy depends on the reduced mass mM/(m + M). Deuterium's nucleus is twice as heavy, so its reduced mass is slightly larger. Its levels are slightly deeper and its lines slightly shorter in wavelength.

### Problem 8 [QM 3 · Recall · 3 pts]

Describe the Franck–Hertz experiment. What do the current dips at 4.9 V intervals show?

*Solution.* Electrons accelerated through mercury vapour reach a collector past a small retarding voltage. The current drops each time the accelerating voltage passes a multiple of 4.9 V, because electrons with 4.9 eV can lose exactly that energy exciting a mercury atom and then can't reach the collector. So atoms absorb energy only in discrete amounts: they have discrete energy levels.

### Problem 9 [QM 3 · Recall · 2 pts]

Distinguish spontaneous and stimulated emission.

*Solution.* Spontaneous: an excited atom drops by itself, at a random time, emitting a photon in a random direction and phase. Stimulated: a passing photon of the right energy triggers the emission of a second photon identical to it in frequency, phase, direction and polarisation.

### Problem 10 [QM 3 · Recall · 3 pts]

What is population inversion? Why is a metastable state needed to achieve it?

*Solution.* Population inversion means more atoms in an upper state than a lower one, so stimulated emission beats absorption and light is amplified. A metastable state lives about 10⁻³ s, long enough for atoms to pile up in it; ordinary states empty in about 10⁻⁸ s.

### Problem 11 [QM 3 · Recall · 2 pts]

Why is a four-level laser easier to run continuously than a three-level laser?

*Solution.* In a four-level laser the lower laser level is above the ground state and empties quickly, so it is almost always empty and inversion needs only a few atoms. A three-level laser must move more than half the atoms out of the ground state.

### Problem 12 [QM 3 · Recall · 2 pts]

List two failures of the Bohr model.

*Solution.* Any two: works only for one-electron atoms; can't predict line intensities; can't explain fine structure or the Zeeman effect; uses definite orbits, which the uncertainty principle forbids.

## B. Derive or show

### Problem 13 [QM 3 · Derivation · 5 pts]

Using the de Broglie condition and the Coulomb force, derive the radii rₙ and energies Eₙ of the hydrogen atom.

*Solution.* Force balance: mv²/r = e²/(4πε₀r²), so v² = e²/(4πε₀mr). De Broglie: 2πr = nh/mv, so v = nh/(2πmr). Equate the two expressions for v²: rₙ = n²h²ε₀/(πme²) = n²a₀ with a₀ = 0.053 nm. The energy is E = −e²/(8πε₀r), so Eₙ = −me⁴/(8ε₀²h²n²) = −13.6/n² eV.

### Problem 14 [QM 3 · Derivation · 3 pts]

From Eₙ, derive the Rydberg formula and an expression for R.

*Solution.* hc/λ = Eᵢ − E\_f = −E₁(1/n\_f² − 1/nᵢ²). So 1/λ = R(1/n\_f² − 1/nᵢ²) with R = −E₁/hc = me⁴/(8ε₀²ch³) = 1.097 × 10⁷ m⁻¹.

### Problem 15 [QM 3 · Derivation · 4 pts]

Show that for large n the frequency of the photon emitted in n → n − 1 approaches the classical orbital frequency of the electron.

*Solution.* ν = (−E₁/h)\[1/(n − 1)² − 1/n²\] = (−E₁/h)(2n − 1)/\[n²(n − 1)²\]. For large n this is about (−E₁/h)(2/n³). The classical orbital frequency is f = v/(2πr) = (−E₁/h)(2/n³) using vₙ and rₙ. They agree.

### Problem 16 [QM 3 · Derivation · 3 pts]

Show that the electron's speed in the n-th Bohr orbit is vₙ = αc/n. Comment on whether relativity is needed.

*Solution.* From mvr = nħ and r = n²a₀: v = nħ/(m n² a₀) = ħ/(m a₀ n) = e²/(4πε₀ħn) = αc/n. For n = 1, v ≈ c/137 ≈ 2.2 × 10⁶ m/s, under 1% of c. Relativity matters only as a small correction (fine structure).

### Problem 17 [QM 3 · Derivation · 3 pts]

Show that for a hydrogen-like ion of nuclear charge Ze, Eₙ = −13.6 Z²/n² eV.

*Solution.* Replace e² by Ze² in the force (one factor of e is the nucleus). Then rₙ = n²a₀/Z and Eₙ = −Z²(13.6 eV)/n².

### Problem 18 [QM 3 · Derivation · 3 pts]

Explain the reduced-mass correction and estimate how much it changes hydrogen's energy levels.

*Solution.* Both particles orbit the centre of mass. This is the same as an electron of mass m′ = mM/(m + M) around a fixed nucleus. Energies scale with mass, so Eₙ is multiplied by m′/m = 1/(1 + m/M) ≈ 1 − 1/1836, a change of about 0.05%.

## C. Numericals without a calculator

### Problem 19 [QM 3 · Numerical]

Find the wavelength of the Hα line (n = 3 → 2).

*Solution.* ΔE = 13.6(1/4 − 1/9) = 13.6 × 5/36 ≈ 1.89 eV, so λ = 1240/1.89 ≈ 656 nm (red).

### Problem 20 [QM 3 · Numerical]

Find the wavelengths of the Lyman α line (2 → 1) and the Lyman series limit.

*Solution.* Lyman α: ΔE = 13.6 × 3/4 = 10.2 eV, so λ = 1240/10.2 ≈ 122 nm. Limit: 13.6 eV, so λ = 91.2 nm.

### Problem 21 [QM 3 · Numerical]

Find the shortest wavelength in the Balmer series.

*Solution.* The Balmer limit is ∞ → 2: ΔE = 13.6/4 = 3.4 eV, so λ = 1240/3.4 ≈ 365 nm.

### Problem 22 [QM 3 · Numerical]

Find the radius of the n = 3 orbit and the energy needed to ionise hydrogen from n = 3.

*Solution.* r₃ = 9a₀ ≈ 0.48 nm. E₃ = −13.6/9 ≈ −1.51 eV, so 1.51 eV ionises it.

### Problem 23 [QM 3 · Numerical]

Find the ground-state energies of He⁺ and Li²⁺.

*Solution.* He⁺ (Z = 2): −54.4 eV. Li²⁺ (Z = 3): −122.4 eV.

### Problem 24 [QM 3 · Numerical]

A ground-state hydrogen atom absorbs a 12.1 eV photon. To which level does it go? How many different lines can it emit on the way back down?

*Solution.* Final energy = −13.6 + 12.1 = −1.5 eV = E₃, so it goes to n = 3. It can emit 3 → 1, or 3 → 2 then 2 → 1: three different lines.

### Problem 25 [QM 3 · Numerical]

How many spectral lines can a gas of hydrogen atoms in the n = 4 state emit?

*Solution.* From n = 4 you can have 4→3, 4→2, 4→1, 3→2, 3→1 and 2→1: six lines. In general n(n − 1)/2.

### Problem 26 [QM 3 · Numerical]

In the Franck–Hertz experiment with mercury, the dips are 4.9 V apart. What wavelength of light does the mercury vapour emit?

*Solution.* λ = 1240/4.9 ≈ 253 nm, in the ultraviolet. The measured line is 253.6 nm.

### Problem 27 [QM 3 · Numerical]

Find the ground-state energy of positronium.

*Solution.* m′ = m/2, so E₁ = −13.6/2 = −6.8 eV.

### Problem 28 [QM 3 · Numerical]

Estimate the separation of the Hα lines of hydrogen and deuterium.

*Solution.* λ ∝ 1/m′ and m′ = m(1 − m/M) roughly. The fractional difference is about m/M\_p − m/(2M\_p) = 1/(2 × 1836) ≈ 2.7 × 10⁻⁴. Times 656 nm, that is about 0.18 nm, with deuterium's line at the shorter wavelength.

## D. Estimate and discuss

### Problem 29 [QM 3 · Discussion · 3 pts]

Estimate how long a classical electron in a Bohr orbit would take to spiral into the nucleus, and why that is a problem. (Order of magnitude only: Beiser quotes about 10⁻⁸ s.)

*Solution.* The electron radiates its 13.6 eV (and more as it falls inward) within about 10⁻⁸ s. Atoms clearly last for billions of years, so classical physics can't describe them, and quantised stationary orbits are needed.

### Problem 30 [QM 3 · Discussion · 3 pts]

A He–Ne laser gives 1 mW at 632.8 nm. Estimate the number of photons per second and explain why laser light is coherent but a bulb's light isn't.

*Solution.* E = 1240/632.8 ≈ 1.96 eV ≈ 3.1 × 10⁻¹⁹ J, so N ≈ 10⁻³/3.1 × 10⁻¹⁹ ≈ 3 × 10¹⁵ photons per second. Stimulated photons copy the phase of the photon that triggered them, so the beam is in step (coherent). A bulb's atoms emit spontaneously, each at a random time and phase.

### Problem 31 [QM 3 · Discussion · 2 pts]

The Sun's spectrum shows dark absorption lines. Explain how they tell us which elements are in the Sun's outer layers.

*Solution.* Cooler gas in the Sun's outer layers absorbs the wavelengths that match its own energy-level differences. Each element has a unique set of levels, so the pattern of dark lines identifies the element. Helium was first found this way.

