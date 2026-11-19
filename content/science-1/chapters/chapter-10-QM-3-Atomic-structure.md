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

![Hydrogen energy levels and spectral series](fig/hydrogen-levels.svg)

*Figure. Hydrogen energy levels $E_n=-13.6/n^2$ eV. Lyman lines end on $n=1$ (ultraviolet), Balmer on $n=2$ (visible), Paschen on $n=3$ (infrared).*

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

# Formulas: Atomic structure

## Classical orbit

Coulomb force as centripetal force:

$$\frac{mv^2}{r} = \frac{e^2}{4\pi\varepsilon_0r^2}\ \Rightarrow\ v = \frac{e}{\sqrt{4\pi\varepsilon_0mr}},\qquad E = KE + PE = -\frac{e^2}{8\pi\varepsilon_0r}$$

$E < 0$ because the electron is bound.

## Hydrogen spectrum

$$\boxed{\frac1\lambda = R\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right),\qquad R = 1.097\times10^7\ \text{m}^{-1}}$$

Series limit ($n_i \to \infty$): Lyman 91.2 nm, Balmer 365 nm.

## Bohr atom

Quantisation: standing electron waves, $2\pi r_n = n\lambda = nh/mv$, equivalently

$$\boxed{L = mvr_n = n\hbar}$$

$$\boxed{r_n = n^2a_0,\qquad a_0 = \frac{4\pi\varepsilon_0\hbar^2}{me^2} = 0.0529\ \text{nm}},\qquad v_n = \frac{\alpha c}{n},\ \ \alpha \approx \frac1{137}$$

$$\boxed{E_n = -\frac{me^4}{8\varepsilon_0^2h^2}\frac{1}{n^2} = \frac{E_1}{n^2},\qquad E_1 = -13.6\ \text{eV}}$$

Ionisation from the ground state needs 13.6 eV. A transition emits

$$h\nu = E_i - E_f = -E_1\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right),\qquad R = \frac{-E_1}{hc} = \frac{me^4}{8\varepsilon_0^2ch^3}$$

## Hydrogen-like ions (nuclear charge $Ze$)

$$E_n = -\frac{13.6\,Z^2}{n^2}\ \text{eV},\qquad r_n = \frac{n^2a_0}{Z}$$

## Reduced mass

$$m' = \frac{mM}{m + M}$$

Hydrogen: $m' = 0.99946\,m$ (energies shift by 0.05%). Positronium: $m' = m/2$, so all energies are halved.

## Correspondence principle

At large $n$ the frequency of the photon from $n \to n - 1$ approaches the classical orbital frequency $f = v/2\pi r$.

## Excitation (Franck–Hertz)

Mercury: the first excitation energy is $4.9$ eV, and the emitted light has $\lambda = hc/4.9\ \text{eV} = 253$ nm. This shows directly that atoms have discrete levels.

## Constants

| Quantity | Value |
|---|---|
| $hc$ | $1240\ \text{eV nm}$ |
| $a_0$ | $0.0529\ \text{nm}$ |
| hydrogen ground state | $-13.6\ \text{eV}$ |
| $e$ | $1.602\times10^{-19}\ \text{C}$ |

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

*Solution.* **Two conditions.**

- **Force balance** (Coulomb provides the centripetal force):

$$\frac{mv^2}r = \frac{e^2}{4\pi\varepsilon_0r^2}\ \Rightarrow\ v^2 = \frac{e^2}{4\pi\varepsilon_0mr}$$

- **de Broglie** (a whole number of wavelengths fit around the orbit):

$$2\pi r = n\lambda = \frac{nh}{mv}\ \Rightarrow\ v = \frac{nh}{2\pi mr}$$

**Equate the two expressions for $v^2$:**

$$\frac{n^2h^2}{4\pi^2m^2r^2} = \frac{e^2}{4\pi\varepsilon_0mr}\ \Rightarrow\ \boxed{r_n = n^2\frac{\varepsilon_0h^2}{\pi me^2} = n^2a_0},\qquad a_0 = 0.0529\ \text{nm}$$

**Energy.** $E = \tfrac12mv^2 - \dfrac{e^2}{4\pi\varepsilon_0r}$, and $\tfrac12mv^2 = \dfrac{e^2}{8\pi\varepsilon_0r}$ from the force balance:

$$E = -\frac{e^2}{8\pi\varepsilon_0r_n}\ \Rightarrow\ \boxed{E_n = -\frac{me^4}{8\varepsilon_0^2h^2n^2} = -\frac{13.6\ \text{eV}}{n^2}}$$

### Problem 14 [QM 3 · Derivation · 3 pts]

From Eₙ, derive the Rydberg formula and an expression for R.

*Solution.* **Photon energy.** A transition $n_i \to n_f$ emits

$$\frac{hc}\lambda = E_i - E_f = -E_1\left(\frac1{n_f^2} - \frac1{n_i^2}\right)$$

with $E_n = E_1/n^2$ and $E_1 = -13.6$ eV.

**Rydberg formula.**

$$\boxed{\frac1\lambda = R\left(\frac1{n_f^2} - \frac1{n_i^2}\right)}$$

**Rydberg constant.**

$$R = \frac{-E_1}{hc} = \frac{me^4}{8\varepsilon_0^2ch^3} = \boxed{1.097\times10^7\ \text{m}^{-1}}$$

**Series.** $n_f = 1$ Lyman (UV), $n_f = 2$ Balmer (visible), $n_f = 3$ Paschen (IR).

### Problem 15 [QM 3 · Derivation · 4 pts]

Show that for large n the frequency of the photon emitted in n → n − 1 approaches the classical orbital frequency of the electron.

*Solution.* **Quantum frequency** of the $n \to n-1$ photon (with $E_1 = -13.6$ eV):

$$\nu = \frac{-E_1}h\left[\frac1{(n-1)^2} - \frac1{n^2}\right] = \frac{-E_1}h\,\frac{2n - 1}{n^2(n-1)^2}\ \xrightarrow{\ n\to\infty\ }\ \frac{-E_1}h\,\frac2{n^3}$$

**Classical orbital frequency.** $f = \dfrac v{2\pi r}$ with $v_n = \dfrac{nh}{2\pi mr_n}$ and $r_n = n^2a_0$:

$$f = \frac{v_n}{2\pi r_n} = \frac{nh}{4\pi^2mr_n^2} = \frac{h}{4\pi^2ma_0^2}\,\frac1{n^3}$$

Using $-E_1 = \dfrac{\hbar^2}{2ma_0^2}$, i.e. $\dfrac{h}{4\pi^2ma_0^2} = \dfrac{2(-E_1)}h$:

$$f = \frac{-E_1}h\,\frac2{n^3}$$

The two agree: the **correspondence principle**.

### Problem 16 [QM 3 · Derivation · 3 pts]

Show that the electron's speed in the n-th Bohr orbit is vₙ = αc/n. Comment on whether relativity is needed.

*Solution.* **Angular momentum quantisation** $mv_nr_n = n\hbar$, with $r_n = n^2a_0$:

$$v_n = \frac{n\hbar}{mr_n} = \frac{\hbar}{ma_0n}$$

**Substitute** $a_0 = \dfrac{4\pi\varepsilon_0\hbar^2}{me^2}$:

$$v_n = \frac{e^2}{4\pi\varepsilon_0\hbar}\,\frac1n = \boxed{\frac{\alpha c}n},\qquad \alpha = \frac{e^2}{4\pi\varepsilon_0\hbar c} \approx \frac1{137}$$

**Relativity?** For $n = 1$, $v = c/137 \approx 2.2\times10^6$ m/s, less than $1\%$ of $c$ ($\gamma - 1 \sim 10^{-5}$). Non-relativistic mechanics is an excellent approximation; relativity enters only as a small correction (fine structure, of order $\alpha^2$).

### Problem 17 [QM 3 · Derivation · 3 pts]

Show that for a hydrogen-like ion of nuclear charge Ze, Eₙ = −13.6 Z²/n² eV.

*Solution.* **Force.** With a nucleus of charge $Ze$ and an electron of charge $e$, the Coulomb force is $\dfrac{Ze^2}{4\pi\varepsilon_0r^2}$: replace $e^2 \to Ze^2$ in Problem 13.

**Radii.** $r_n = \dfrac{n^2}Z\dfrac{\varepsilon_0h^2}{\pi me^2}$, that is

$$r_n = \frac{n^2a_0}Z$$

**Energies.** $E_n \propto (Ze^2)^2$, so

$$\boxed{E_n = -\frac{13.6\ Z^2}{n^2}\ \text{eV}}$$

**Example.** He$^+$ ($Z = 2$): $E_1 = -54.4$ eV.

### Problem 18 [QM 3 · Derivation · 3 pts]

Explain the reduced-mass correction and estimate how much it changes hydrogen's energy levels.

*Solution.* **Idea.** The electron does not orbit a fixed nucleus; both orbit their common centre of mass. The problem is equivalent to one body of the **reduced mass**

$$m' = \frac{mM}{m + M} = \frac m{1 + m/M}$$

orbiting a fixed centre.

**Effect on energy.** In $E_n = -me^4/(8\varepsilon_0^2h^2n^2)$ replace $m \to m'$:

$$E_n' = E_n\cdot\frac{m'}m = E_n\left(1 + \frac mM\right)^{-1} \approx E_n\left(1 - \frac1{1836}\right)$$

for hydrogen ($M = m_p$). The change is about $0.05\%$.

**Consequence.** Heavier isotopes (deuterium) have slightly larger $m'$, so their lines are shifted to shorter wavelengths: that is how deuterium was discovered.

## C. Numericals without a calculator

### Problem 19 [QM 3 · Numerical]

Find the wavelength of the Hα line (n = 3 → 2).

*Solution.* **Idea.** A transition $n_i \to n_f$ emits $\Delta E = 13.6\left(\dfrac1{n_f^2} - \dfrac1{n_i^2}\right)$ eV, and $\lambda = 1240/\Delta E$ nm.

$$\Delta E = 13.6\left(\frac14 - \frac19\right) = 13.6\cdot\frac5{36} = 1.89\ \text{eV}$$

$$\lambda = \frac{1240}{1.89} \approx \boxed{656\ \text{nm}}\quad(\text{red})$$

### Problem 20 [QM 3 · Numerical]

Find the wavelengths of the Lyman α line (2 → 1) and the Lyman series limit.

*Solution.* **Lyman $\alpha$** ($2 \to 1$):

$$\Delta E = 13.6\left(1 - \frac14\right) = 10.2\ \text{eV},\qquad \lambda = \frac{1240}{10.2} \approx \boxed{122\ \text{nm}}$$

**Series limit** ($\infty \to 1$): $\Delta E = 13.6$ eV, so $\lambda = 1240/13.6 = \boxed{91.2\ \text{nm}}$.

### Problem 21 [QM 3 · Numerical]

Find the shortest wavelength in the Balmer series.

*Solution.* **Idea.** The shortest wavelength in a series is its limit, $n_i \to \infty$, which has the largest energy. For Balmer, $n_f = 2$:

$$\Delta E = \frac{13.6}{2^2} = 3.4\ \text{eV},\qquad \lambda = \frac{1240}{3.4} \approx \boxed{365\ \text{nm}}$$

### Problem 22 [QM 3 · Numerical]

Find the radius of the n = 3 orbit and the energy needed to ionise hydrogen from n = 3.

*Solution.* **Radius:** $r_n = n^2a_0$, so

$$r_3 = 9(0.0529\ \text{nm}) \approx \boxed{0.48\ \text{nm}}$$

**Ionisation from $n = 3$:** $E_3 = -13.6/9 = -1.51$ eV, so $\boxed{1.51\ \text{eV}}$ lifts the electron to $E = 0$.

### Problem 23 [QM 3 · Numerical]

Find the ground-state energies of He⁺ and Li²⁺.

*Solution.* **Idea.** Hydrogen-like ion: $E_1 = -13.6\,Z^2$ eV.

$$\text{He}^+\ (Z = 2):\quad -13.6\times4 = \boxed{-54.4\ \text{eV}}$$

$$\text{Li}^{2+}\ (Z = 3):\quad -13.6\times9 = \boxed{-122.4\ \text{eV}}$$

### Problem 24 [QM 3 · Numerical]

A ground-state hydrogen atom absorbs a 12.1 eV photon. To which level does it go? How many different lines can it emit on the way back down?

*Solution.* **Final energy:**

$$E_f = -13.6 + 12.1 = -1.5\ \text{eV} \approx E_3 = -\frac{13.6}{9}\ \Rightarrow\ \boxed{n = 3}$$

**Lines on the way down:** $3 \to 1$, or $3 \to 2$ followed by $2 \to 1$. That is $\boxed{3\ \text{different lines}}$.

### Problem 25 [QM 3 · Numerical]

How many spectral lines can a gas of hydrogen atoms in the n = 4 state emit?

*Solution.* **Idea.** Every pair of levels $(n_i > n_f)$ can give a line: choose 2 of the 4 levels.

$$4\to3,\ 4\to2,\ 4\to1,\ 3\to2,\ 3\to1,\ 2\to1\ \Rightarrow\ \boxed{6\ \text{lines}}$$

In general $\dfrac{n(n - 1)}{2}$ lines from level $n$.

### Problem 26 [QM 3 · Numerical]

In the Franck–Hertz experiment with mercury, the dips are 4.9 V apart. What wavelength of light does the mercury vapour emit?

*Solution.* **Idea.** The dips are 4.9 V apart because 4.9 eV is the first excitation energy of mercury. The atom returns by emitting a photon of that energy.

$$\lambda = \frac{1240}{4.9} \approx \boxed{253\ \text{nm}}\quad(\text{ultraviolet; measured } 253.6\ \text{nm})$$

This shows directly that atomic energy levels are discrete.

### Problem 27 [QM 3 · Numerical]

Find the ground-state energy of positronium.

*Solution.* **Idea.** Replace the electron mass by the reduced mass. In positronium (e$^+$e$^-$), $m' = \dfrac{m\cdot m}{m + m} = \dfrac m2$, and all energies scale with $m'$.

$$E_1 = \frac{-13.6}{2} = \boxed{-6.8\ \text{eV}}$$

### Problem 28 [QM 3 · Numerical]

Estimate the separation of the Hα lines of hydrogen and deuterium.

*Solution.* **Idea.** $\lambda \propto 1/m'$ and $m' = \dfrac{m}{1 + m/M}$, so $\lambda \propto 1 + \dfrac mM$.

$$\frac{\Delta\lambda}{\lambda} \approx \frac{m}{M_p} - \frac{m}{2M_p} = \frac{1}{2(1836)} \approx 2.7\times10^{-4}$$

$$\Delta\lambda \approx (2.7\times10^{-4})(656\ \text{nm}) \approx \boxed{0.18\ \text{nm}}$$

Deuterium (heavier nucleus, larger $m'$) has the **shorter** wavelength. This is how deuterium was discovered.

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

