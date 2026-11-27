# Learn: Atomic structure

An atom is a tiny nucleus with electrons in allowed orbits that fit a whole number of de Broglie wavelengths. That gives hydrogen's levels $E_n = -13.6\ \text{eV}/n^2$, and jumps between levels produce the line spectra. This doc covers Beiser ch 4 (4.1–4.9; the Rutherford-scattering appendix is excluded) and the slides `QM.tex:224` to `:257`, plus the laser frame in `StatMech.tex`.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## The nuclear atom

An atom is electrically neutral, yet it contains negatively charged electrons, so it must also contain positive charge. Rutherford's scattering of alpha particles from thin gold foil showed where that charge is. Most alpha particles passed straight through, but a few were deflected through large angles, some almost straight back. Such violent deflections can only come from a very strong force acting at close range, which Thomson's "plum pudding" of spread-out charge cannot supply. Rutherford concluded that all the positive charge and nearly all the mass are concentrated in a tiny nucleus, about $10^{-14}\ \text{m}$ across, with the electrons spread over a region about $10^{-10}\ \text{m}$ across, ten thousand times larger. (The scattering formula itself, Beiser's appendix, is not on the syllabus.)

## Why the planetary model fails

What keeps the electrons from falling into the nucleus? It seems natural to imagine the electron circling the nucleus as a planet circles the sun, with the electric attraction supplying the centripetal force:

$$\frac{mv^2}{r} = \frac{e^2}{4\pi\varepsilon_0r^2}\quad\Longrightarrow\quad \boxed{E = \tfrac12mv^2 - \frac{e^2}{4\pi\varepsilon_0r} = -\frac{e^2}{8\pi\varepsilon_0r}}$$

The energy is negative because the electron is bound. The planetary model, however, fails at once. An electron moving in a circle is accelerating, and classical electromagnetism says an accelerated charge radiates. The electron should lose energy continuously and spiral into the nucleus in about $10^{-11}\ \text{s}$. Atoms would not exist.

## Atomic spectra

The spectra of atoms gave a second clue. A heated gas emits not a continuous range of wavelengths but sharp lines characteristic of the element. The lines of hydrogen fall into series that all fit one formula:

$$\boxed{\frac1\lambda = R\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right),\qquad R = 1.097\times10^7\ \text{m}^{-1}}$$

| $n_f$ | Series | Region |
|---|---|---|
| 1 | Lyman | ultraviolet |
| 2 | Balmer | visible |
| 3 | Paschen | infrared |
| 4, 5 | Brackett, Pfund | infrared |

Any successful theory of the atom must explain this formula and the value of the Rydberg constant $R$.

## The Bohr atom

Bohr's theory combined the nuclear atom with the wave nature of the electron. An orbit is stable only if the electron wave joins up with itself after one circuit:

$$\begin{gathered}\boxed{2\pi r_n = n\lambda = \frac{nh}{mv}\quad\Longleftrightarrow\quad mvr_n = n\hbar} \\[4pt] (\text{quantised angular momentum})\end{gathered}$$

Combined with the force balance $mv^2 = e^2/4\pi\varepsilon_0r$ (the slides write $K = 1/4\pi\varepsilon_0$, so $mv^2 = Ke^2/r$):

$$\begin{gathered}v_n = \frac{Ke^2}{n\hbar} \\[4pt] \boxed{r_n = n^2a_0,\quad a_0 = \frac{4\pi\varepsilon_0\hbar^2}{me^2} = 0.0529\ \text{nm}} \\[4pt] \boxed{E_n = -\frac{me^4}{8\varepsilon_0^2h^2}\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}}\end{gathered}$$

The integer $n$ is a quantum number. An electron in one of these stationary states does not radiate. Light is emitted only when the electron drops from a higher level to a lower one, and the photon carries away the difference:

$$\boxed{h\nu = E_i - E_f}$$

Putting $E_n$ into this condition reproduces the observed series and gives $R = me^4/8\varepsilon_0^2h^3c$, in excellent agreement with experiment.

![Hydrogen energy levels and spectral series](fig/hydrogen-levels.svg)

*Figure. Hydrogen energy levels $E_n=-13.6/n^2$ eV. Lyman lines end on $n=1$ (ultraviolet), Balmer on $n=2$ (visible), Paschen on $n=3$ (infrared).*

**Old quantum theory and its limits** (slides "Old Quantum Theory"). Planck (1900) quantised oscillator energy, $E = nh\nu$; Bohr (1913) quantised angular momentum, $mvr = n\hbar$; Sommerfeld's group added further rules for many-electron atoms. Each rule was ad hoc, with no underlying theory, which is why wave mechanics (Schrödinger, 1926) was needed.

## Correspondence principle and nuclear motion

Bohr was guided by the **correspondence principle**: a quantum theory must agree with classical physics in the limit where classical physics is known to work. For very large $n$ the levels are almost continuous, and the frequency of the photon emitted in a jump from $n$ to $n - 1$ equals the frequency with which the electron goes round its orbit, as classical theory predicts.

The small difference between observed and predicted spectra is removed by noting that the nucleus is not infinitely heavy. Electron and nucleus both move about their common centre of mass, and the electron mass in the formulas is replaced by the reduced mass:

$$\boxed{m' = \frac{mM}{m + M}},\qquad E_n' = \frac{m'}{m}E_n$$

This explains, among other things, the slight difference between the spectra of hydrogen and deuterium.

## Atomic excitation and Franck–Hertz

The energy levels of an atom can be raised in two ways: by absorbing a photon of exactly the right energy, or by a collision that transfers part of another particle's kinetic energy. Franck and Hertz (1913) demonstrated the second directly. They accelerated electrons through mercury vapour and measured the current reaching a collector. The current fell sharply each time the voltage passed a multiple of $4.9\ \text{V}$: at those energies the electrons excite mercury atoms in inelastic collisions, lose $4.9\ \text{eV}$, and no longer reach the collector. The excited atoms then emit ultraviolet light of exactly the matching wavelength:

$$\lambda = \frac{hc}{E} = \frac{1240\ \text{eV nm}}{4.9\ \text{eV}} \approx 253.6\ \text{nm}$$

The experiment showed that atomic energy levels are real and discrete, independently of any spectrum.

## The laser

The laser is a practical application of these ideas. An atom in an excited state can drop to a lower state **spontaneously**, or it can be **stimulated** to do so by a passing photon of the same energy. In stimulated emission the new photon has the same frequency, direction and phase as the one that triggered it, so the light is amplified. Normally most atoms are in the lower state and absorption outweighs emission. A laser works by producing a **population inversion**, in which more atoms occupy a metastable upper level than the level below it (pumped via a third level in a three-level laser, or a fourth in a four-level laser). Placed between two mirrors, the medium amplifies light travelling back and forth along the axis, and the result is an intense, monochromatic and coherent beam.

# Reference: Atomic structure

Beiser ch 4 section by section, with each derivation written out, the numbers worth knowing, and what the slides (`QM.tex:224` to `:257`) add. Rutherford scattering (the formula and the appendix) and the laser (4.9) are not in the course; they are marked below and kept short. Beiser's in-chapter examples are summarised with their answers; full worked versions are in *HW practice: Beiser chapters 4 to 6*.

## 4.1 The nuclear atom

**The question.** All atoms contain electrons, and atoms are neutral, so they must also contain positive matter. What kind, arranged how?

- **Thomson's model (1898).** A lump of positive charge with electrons embedded in it, like raisins in a fruitcake ("plum pudding"). With the charge spread over the whole atom, the electric forces on a passing alpha particle are weak, so alphas should be deflected by 1° or less.
- **Geiger and Marsden (1911),** at Rutherford's suggestion, fired alpha particles (helium nuclei, charge +2e, about 8000 electron masses, typically 2 × 10⁷ m/s) from a radioactive source through a lead collimator at a thin gold foil, and counted flashes on a zinc sulfide screen through a microscope (Fig. 4.2).
- **Result.** Most alphas went nearly straight through, but a few were scattered through large angles, some even backward. Rutherford: "as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you."
- **Conclusion (Rutherford).** Only a very strong force at close range can turn back such heavy, fast particles. All the positive charge and nearly all the mass are concentrated in a tiny **nucleus**, with the electrons far away. Most alphas miss every nucleus and pass through; the light electrons barely affect them.
- **Atomic number.** How strongly a foil scatters depends on its nuclear charge. Every atom of an element turned out to have the same nuclear charge Ze, a whole multiple of e that rises step by step through the periodic table. Z is the atomic number, the number of protons.
- **Sizes.** Nucleus about 10⁻¹⁴ m or less, atom about 10⁻¹⁰ m. **An atom is largely empty space**; packed solid, our bodies would shrink to specks just visible under a microscope.

**Not in the course: Rutherford scattering.** The scattering formula $N(\theta) \propto 1/\sin^4(\theta/2)$ (Eq. 4.1), its derivation (the chapter appendix), and the closest-approach estimate $R = 2Ze^2/4\pi\varepsilon_0 KE$ (Eq. 4.2, which gives R ≈ 3.0 × 10⁻¹⁴ m for 7.7 MeV alphas on gold) are excluded. You need only the experiment and its conclusion above. (The slides' frame `QM.tex:224` likewise gives only the models.)

## 4.2 Electron orbits

**The planetary model.** Electrons can't sit still in Rutherford's atom: nothing would hold them against the pull of the nucleus. So imagine them orbiting, like planets. Take hydrogen (one electron) and a circular orbit of radius r.

**Force balance.** The Coulomb attraction supplies the centripetal force:

$$
\frac{mv^2}{r} = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} \quad\Rightarrow\quad v = \frac{e}{\sqrt{4\pi\varepsilon_0\,m\,r}} \tag{4.4}
$$

**Energy.** Kinetic and potential energies (PE = 0 at infinite separation, hence the minus sign):

$$
KE = \tfrac12 mv^2, \qquad PE = -\frac{e^2}{4\pi\varepsilon_0 r}
$$

From the force balance $mv^2 = e^2/4\pi\varepsilon_0 r$, so $KE = e^2/8\pi\varepsilon_0 r$, and

$$
E = KE + PE = \frac{e^2}{8\pi\varepsilon_0 r} - \frac{e^2}{4\pi\varepsilon_0 r} = -\frac{e^2}{8\pi\varepsilon_0 r} \tag{4.5}
$$

- **E is negative because the electron is bound.** E > 0 would mean it is not on a closed orbit.
- Note KE = −E and PE = 2E (the virial theorem for 1/r forces): for the ground state, KE = 13.6 eV and PE = −27.2 eV.
- E belongs to the electron–nucleus system, not to the electron alone (4.7).

**Example 4.1 (Beiser).** 13.6 eV separates hydrogen into a proton and an electron, so E = −13.6 eV = −2.2 × 10⁻¹⁸ J. From (4.5), $r = -e^2/8\pi\varepsilon_0E = 5.3\times10^{-11}$ m; from (4.4), v = 2.2 × 10⁶ m/s. Since v ≪ c, special relativity can be ignored.

**Why it fails.** Newton and Coulomb say the orbit is stable. Electromagnetism, the third pillar, says an accelerated charge radiates. The orbiting electron accelerates, so it should lose energy continuously and spiral into the nucleus in a tiny fraction of a second (about 10⁻¹¹ s by the classical radiation formula), giving a continuous spectrum on the way. Atoms are stable and give sharp lines. The laws of the macroworld don't all hold inside the atom.

**Why classical physics fails here (Beiser's summary).** It treats nature as pure particles or pure waves. Particles and waves share properties; the smallness of h hides this in everyday life but not inside atoms. The Bohr model mixes classical and quantum ideas and gets part of the way (4.4); quantum mechanics finishes the job (ch 5, 6).

## 4.3 Atomic spectra

**Continuous against line spectra.** Hot solids and liquids emit all wavelengths (Planck, 2.2): the collective behaviour of many interacting atoms, independent of the material. In a rarefied gas the atoms are far apart and interact only in occasional collisions, so the light is characteristic of the atoms themselves.

- **Emission spectrum.** A gas or vapour at less than atmospheric pressure, excited by an electric discharge, emits only certain wavelengths: bright lines on a dark background. Every element has its own pattern (hydrogen, helium, mercury in Fig. 4.8), so spectra identify substances.
- **Absorption spectrum.** White light passed through a gas loses some of the same wavelengths: dark lines on a bright background. Sunlight has dark lines because the hot surface (radiating nearly like a 5800 K blackbody) is surrounded by cooler gas.
- The number, intensity and exact wavelengths of the lines depend on temperature, pressure, electric and magnetic fields, and motion of the source. From a star's spectrum astronomers read its elements, their ionisation, and whether it is approaching or receding.

**Spectral series of hydrogen.** Balmer (1885) found the visible lines fit one formula. Hα = 656.3 nm (red), Hβ = 486.3 nm (blue), Hγ and Hδ violet; the lines crowd together and weaken toward the **series limit** at 364.6 nm. All series fit

$$
\frac{1}{\lambda} = R\left(\frac{1}{n_f^2} - \frac{1}{n^2}\right), \qquad R = 1.097\times10^7\ \text{m}^{-1} = 0.01097\ \text{nm}^{-1}
$$

| Series | n\_f | n | Region | Series limit (n → ∞) |
| --- | --- | --- | --- | --- |
| Lyman | 1 | 2, 3, 4, … | Ultraviolet | 1/R = 91.2 nm |
| Balmer | 2 | 3, 4, 5, … | Visible and near UV | 4/R = 364.6 nm |
| Paschen | 3 | 4, 5, 6, … | Infrared | 9/R = 820 nm |
| Brackett | 4 | 5, 6, 7, … | Infrared | 16/R = 1.46 μm |
| Pfund | 5 | 6, 7, 8, … | Infrared | 25/R = 2.28 μm |

The same R appears in every series; the Brackett series overlaps Paschen and Pfund. Any theory of the atom must explain this formula and the value of R.

## 4.4 The Bohr atom

**Old quantum theory (slides `QM.tex:224`).** Planck (1900) quantised oscillator energy, E = nhν. Bohr (1913) quantised the electron's angular momentum in hydrogen, mvr = nh/2π. Sommerfeld and others added more quantisation conditions to handle other atoms. The conditions were pulled out of a hat and unsatisfying; de Broglie's waves (1924) and then Schrödinger's equation (1926) explained them.

**The orbiting electron's wavelength.** With v from (4.4) and γ ≈ 1:

$$
\lambda = \frac{h}{mv} = \frac{h}{e}\sqrt{\frac{4\pi\varepsilon_0 r}{m}} \tag{4.11}
$$

At r = 5.3 × 10⁻¹¹ m this gives λ = 33 × 10⁻¹¹ m, **exactly the circumference** 2πr = 33 × 10⁻¹¹ m. The ground-state orbit is one electron wave joined smoothly on itself.

**The stability condition.** A wire loop vibrates freely only if a whole number of wavelengths fits around it; a fractional number interferes destructively and dies out. By analogy:

> An electron can circle a nucleus only if its orbit contains a whole number of de Broglie wavelengths.

$$
n\lambda = 2\pi r_n, \qquad n = 1, 2, 3, \dots \tag{4.12}
$$

n is the **quantum number** of the orbit.

**Orbit radii.** Substitute (4.11):

$$
\frac{nh}{e}\sqrt{\frac{4\pi\varepsilon_0 r_n}{m}} = 2\pi r_n
$$

Square both sides: $n^2h^2\cdot 4\pi\varepsilon_0 r_n/(e^2m) = 4\pi^2r_n^2$. Divide by $4\pi^2 r_n$:

$$
r_n = \frac{n^2h^2\varepsilon_0}{\pi me^2}, \qquad a_0 = r_1 = \frac{h^2\varepsilon_0}{\pi me^2} = \frac{4\pi\varepsilon_0\hbar^2}{me^2} = 5.292\times10^{-11}\ \text{m}, \qquad r_n = n^2a_0 \tag{4.13, 4.14}
$$

a₀ is the **Bohr radius**.

**Same thing as Bohr's postulate.** $n\lambda = 2\pi r$ with λ = h/mv is $mvr = nh/2\pi = n\hbar$: angular momentum comes in units of ħ.

**The slides' route (`QM.tex:234`), with K = 1/4πε₀.** Start from the two conditions

$$
mvr = n\hbar, \qquad mv^2 = \frac{Ke^2}{r}
$$

Divide the second by the first: $v = Ke^2/n\hbar$. Then $r = n\hbar/mv = (n\hbar)^2/mKe^2$. The energy is $E = \tfrac12 mv^2 - Ke^2/r = -\tfrac12 Ke^2/r$, so

$$
E_n = -\frac12\,Ke^2\cdot\frac{mKe^2}{n^2\hbar^2} = -\frac{mK^2e^4}{2\hbar^2}\,\frac{1}{n^2}
$$

The slide calls the constant $R = K^2me^4/2\hbar^2$; it equals 13.6 eV (an energy, the Rydberg energy, not the R in m⁻¹ above).

**Orbital speed.** $v_n = Ke^2/n\hbar = \alpha c/n$, where $\alpha = Ke^2/\hbar c \approx 1/137$ is the fine-structure constant. v₁ = 2.19 × 10⁶ m/s ≈ c/137, so the non-relativistic treatment is consistent.

## 4.5 Energy levels and spectra

**Energy levels.** Put $r_n$ into $E = -e^2/8\pi\varepsilon_0 r$:

$$
E_n = -\frac{me^4}{8\varepsilon_0^2h^2}\,\frac{1}{n^2} = \frac{E_1}{n^2}, \qquad E_1 = -2.18\times10^{-18}\ \text{J} = -13.6\ \text{eV} \tag{4.15}
$$

| n | 1 | 2 | 3 | 4 | 5 | ∞ |
| --- | --- | --- | --- | --- | --- | --- |
| E\_n (eV) | −13.6 | −3.40 | −1.51 | −0.85 | −0.54 | 0 |

- All levels are negative: the electron can't escape. It can have only these energies, like a person who can stand only on the rungs of a ladder.
- n = 1 is the **ground state**; n = 2, 3, … are **excited states**. As n → ∞, E → 0 and the electron is free. E > 0 means a free electron with no quantum condition, not an atom.
- **Ionisation energy** is the work to remove the electron from the ground state, −E₁ = 13.6 eV for hydrogen.

**Example 4.2 (Beiser).** A collision raises hydrogen from n = 1 to n = 3: $\Delta E = E_1(1/3^2 - 1/1^2) = -13.6(1/9 - 1) = 12.1$ eV.

**Example 4.3 (Beiser): Rydberg atoms.** An orbit of radius 0.0100 mm: $n = \sqrt{r_n/a_0} = \sqrt{1.00\times10^{-5}/5.29\times10^{-11}} = 435$, and $E = -13.6/435^2 = -7.19\times10^{-5}$ eV. So fragile that they exist naturally only in the near-vacuum of space; their spectra reach radio frequencies.

**Origin of line spectra.** When the electron drops from a higher level n\_i to a lower level n\_f, the energy difference leaves as one photon:

$$
E_i - E_f = h\nu \tag{4.16}
$$

$$
E_i - E_f = E_1\left(\frac{1}{n_i^2} - \frac{1}{n_f^2}\right) = -E_1\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right)
$$

Since E₁ < 0, −E₁ > 0 and

$$
\nu = -\frac{E_1}{h}\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right), \qquad \frac1\lambda = \frac{\nu}{c} = -\frac{E_1}{ch}\left(\frac{1}{n_f^2} - \frac{1}{n_i^2}\right) \tag{4.17, 4.18}
$$

n\_f = 1, 2, 3, 4, 5 give the Lyman, Balmer, Paschen, Brackett and Pfund series, with n\_i > n\_f. The constant is

$$
-\frac{E_1}{ch} = \frac{me^4}{8\varepsilon_0^2ch^3} = \frac{(9.109\times10^{-31})(1.602\times10^{-19})^4}{8(8.854\times10^{-12})^2(2.998\times10^8)(6.626\times10^{-34})^3} = 1.097\times10^7\ \text{m}^{-1}
$$

which is **exactly the Rydberg constant**. Bohr derived R from m, e, h and ε₀, his great success. The slides (`QM.tex:234`): the model fits the Lyman, Balmer, Paschen and Pfund series.

**Example 4.4 (Beiser).** The longest Balmer wavelength (Hα) is the smallest jump onto n = 2, from n = 3: $1/\lambda = R(1/4 - 1/9) = 0.139R$, so λ = 656 nm, near the red end.

**Quantisation in the atomic world (box).** Energy levels are characteristic of all atoms, not just hydrogen: confinement restricts the wave function, which restricts the energy, as in the box (3.6). Matter, charge, light energy and the energies of bound systems all come in discrete amounts at the atomic scale.

**Hydrogen-like ions** (one electron, nuclear charge Ze: He⁺, Li²⁺; replace e² by Ze² in the force): $r_n = n^2a_0/Z$ and $E_n = -13.6Z^2/n^2$ eV.

**Limits of the Bohr model.** It works only for one-electron atoms; it can't give line intensities or fine structure; it puts the electron on a definite orbit, which ch 6 replaces with a probability cloud.

## 4.6 Correspondence principle

**The principle.** Quantum physics must give the same results as classical physics where classical physics is known to work, that is, for large quantum numbers.

**Classical prediction.** An electron on a circular orbit radiates at its frequency of revolution and at its harmonics (whole multiples). With v from (4.4):

$$
f = \frac{v}{2\pi r} = \frac{e}{2\pi r\sqrt{4\pi\varepsilon_0 m r}} = \frac{e}{2\pi\sqrt{4\pi\varepsilon_0 m r^3}}
$$

Put in $r_n = n^2h^2\varepsilon_0/\pi me^2$:

$$
f_n = \frac{me^4}{8\varepsilon_0^2h^3}\,\frac{2}{n^3} = -\frac{E_1}{h}\,\frac{2}{n^3} \tag{4.19}
$$

**Example 4.5 (Beiser).** f₁ = (2.18 × 10⁻¹⁸/6.63 × 10⁻³⁴)(2) = 6.58 × 10¹⁵ rev/s and f₂ = f₁/8 = 0.823 × 10¹⁵ rev/s. The 2 → 1 photon has $\nu = (-E_1/h)(1 - 1/4) = 2.47\times10^{15}$ Hz, between f₁ and f₂ but equal to neither. In 1.00 × 10⁻⁸ s (a typical excited-state lifetime) an n = 2 electron makes 8.23 × 10⁶ revolutions; the Earth takes 8.23 million years to orbit the Sun that many times.

**Quantum prediction at large n.** Let the jump be from n to n − p (p = 1, 2, 3, …):

$$
\nu = -\frac{E_1}{h}\left[\frac{1}{(n-p)^2} - \frac{1}{n^2}\right] = -\frac{E_1}{h}\,\frac{2np - p^2}{n^2(n-p)^2}
$$

When n ≫ p, $2np - p^2 \approx 2np$ and $(n-p)^2 \approx n^2$:

$$
\nu \approx -\frac{E_1}{h}\,\frac{2p}{n^3} \tag{4.20}
$$

For p = 1 this is exactly the orbital frequency (4.19); p = 2, 3, … give the harmonics. Quantum and classical agree at large n. The discrepancy is almost 300% at n = 2 and only about 0.01% at n = 10,000. For an orbit 0.01 mm across (n = 435, Example 4.3) the atom should already behave classically.

**Bohr used it in reverse.** Starting from (4.19) and demanding agreement at large n, he showed that stable orbits must have $mvr = nh/2\pi$ (4.21), which is the same as $n\lambda = 2\pi r$.

## 4.7 Nuclear motion

**Idea.** The nucleus is not fixed. Electron and nucleus both circle their common centre of mass, which is very close to the nucleus. The system is equivalent to a single particle of **reduced mass** m′ circling a fixed centre (the two-body reduction of chapter 4, Hamiltonian dynamics):

$$
m' = \frac{mM}{m + M} \tag{4.22}
$$

**Corrected levels.** Replace m by m′ everywhere:

$$
E_n' = -\frac{m'e^4}{8\varepsilon_0^2h^2}\,\frac{1}{n^2} = \frac{m'}{m}\,\frac{E_1}{n^2}, \qquad \frac{m'}{m} = \frac{M}{M + m} = 0.99945 \text{ for hydrogen} \tag{4.23}
$$

- Every level is raised by 0.055% (less negative). This removes a small, definite discrepancy with measured wavelengths.
- The Rydberg constant for an infinitely heavy nucleus is R∞ = 1.0973731 × 10⁷ m⁻¹; for hydrogen the correction lowers it to R\_H = 1.0967758 × 10⁷ m⁻¹.
- **Deuterium.** Its nucleus (a proton and a neutron) is about twice as heavy, so m′ is slightly larger and all its lines are shifted to slightly *shorter* wavelengths. Deuterium Hα is at 656.1 nm against hydrogen's 656.3 nm. About one hydrogen atom in 6000 is deuterium; Urey identified it in 1932 from this shift.

**Example 4.6 (Beiser): positronium.** An electron and a positron orbiting each other: m′ = m·m/2m = m/2. Energies are halved, the Rydberg constant is halved, and every wavelength is **twice** the corresponding hydrogen one.

**Example 4.7 (Beiser): muonic hydrogen.** A negative muon (207 m\_e) captured by a proton (1836 m\_e): m′ = (207)(1836)/(2043) m\_e = 186 m\_e. Radius r₁ = a₀(m\_e/m′) = a₀/186 = 2.85 × 10⁻¹³ m, 186 times closer than an electron. Ionisation energy 186 × 13.6 eV = 2.53 keV.

## 4.8 Atomic excitation

**Two ways to excite an atom.**

1. **Collision** with another particle, which gives up part of the pair's kinetic energy (Fig. 4.18). In a gas discharge an electric field accelerates electrons and ions until they excite the atoms they hit. Energy transfer is greatest between equal masses, so the light electrons are more effective than ions at transferring energy to atomic electrons. Neon signs glow red, mercury lamps blue; auroras are atoms excited by fast particles from the Sun (oxygen green, oxygen and nitrogen red).
2. **Absorbing a photon** of exactly the right energy. Hydrogen dropping from n = 2 to n = 1 emits 121.7 nm (10.2 eV), so a ground-state atom absorbing 121.7 nm rises to n = 2 (Fig. 4.19). This is the origin of absorption spectra.

An excited atom returns to the ground state in about 10⁻⁸ s on average, emitting one or more photons.

**Why absorption lines aren't totally black (Fig. 4.20).** The excited atoms re-radiate almost at once, but in random directions, so few of those photons continue along the beam. The lines look dark only against the bright background. Absorption lines should match the emission lines of transitions that end on the ground state, and they do.

**Franck–Hertz experiment (1914; the slides `QM.tex:246` say 1913).** A second, independent way to see energy levels, by collisions.

- **Apparatus (Fig. 4.21).** Electrons from a hot filament are accelerated by a voltage V toward a grid through mercury vapour. A small retarding voltage V₀ between the grid and the collecting plate stops electrons with too little energy from reaching it.
- **Elastic collisions.** If kinetic energy is conserved, the electron just bounces off. The atom is far heavier, so the electron loses almost nothing. As V rises, more electrons reach the plate and the current rises.
- **Critical potential.** At 4.9 V the current drops sharply (Fig. 4.22). An electron with 4.9 eV can now give up its energy in an **inelastic** collision, raising a mercury atom to its first excited state, and then can't pass the retarding voltage.
- **More dips.** Raising V further, the current rises again (electrons have energy to spare after one inelastic collision), then drops again near 9.8 V, 14.7 V, …, multiples of 4.9 V, from two, three, … inelastic collisions.
- **Check with light.** The bombarded vapour emits the 253.6 nm mercury line, and hc/253.6 nm = 4.9 eV. Collision energies and spectral lines give the same levels.
- **Meaning.** Atomic energy levels really exist and are discrete, independent of spectra. Done right after Bohr's theory, it confirmed his basic ideas.

## 4.9 The laser (not in the course)

The course drops lasers, so this is a reminder only, not exam material. **LASER** = light amplification by stimulated emission of radiation. Three processes: induced absorption, spontaneous emission (random time and direction), and stimulated emission (a passing photon of energy hν makes an excited atom emit an identical photon: same frequency, phase, direction, polarisation). Amplification needs a **population inversion** (more atoms in the upper level than the lower), made possible by a **metastable** level that lives about 10⁻³ s instead of 10⁻⁸ s. Three-level lasers (ruby) must empty more than half the ground state; four-level lasers (helium–neon) end on a quickly emptied level, so inversion is easy. Mirrors at the ends make a resonant cavity; the beam is monochromatic, coherent, directional and intense.

## What to be able to do without notes

- Describe Thomson's model, the Geiger–Marsden experiment and Rutherford's conclusion (no scattering formula).
- Derive v(r) and E = −e²/8πε₀r for a classical orbit, and explain why the planetary model fails.
- Name the hydrogen series, their n\_f and regions, and compute a line or a series limit.
- Show the ground-state orbit is one de Broglie wavelength, derive $r_n = n^2a_0$ by both routes (standing waves, or mvr = nħ), and derive $E_n = -13.6/n^2$ eV.
- Derive the Rydberg formula and show the constant equals R.
- Derive the orbital frequency $f_n$ and show $\nu \to f_n$ for n → n − 1 at large n (correspondence principle).
- Use the reduced mass for hydrogen, deuterium, positronium and muonic atoms.
- Explain the two ways to excite an atom and describe Franck–Hertz and what the 4.9 V dips and the 253.6 nm line mean.

# Coverage: Atomic structure

Every section and example of Beiser ch 4 and the slide frames on the old quantum theory (`QM.tex:224` to `:257`). "HW practice" means *HW practice: Beiser chapters 4 to 6*.

## Beiser ch 4

| Beiser | Topic | Where on the site |
| --- | --- | --- |
| 4.1 | The nuclear atom, Geiger–Marsden | Reference 4.1 |
| Appendix to ch 4 | Rutherford scattering formula | Not in the course (named only, in Reference 4.1) |
| 4.2 | Electron orbits, r and E of a classical orbit, why it fails | Reference 4.2 (collapse time about 10⁻¹¹ s) |
| Ex 4.1 | Orbital radius and speed from E = −13.6 eV | Reference 4.2; HW practice |
| 4.3 | Atomic spectra, the series | Reference 4.3 (series table with limits) |
| 4.4 | The Bohr atom, nλ = 2πr, r\_n, a₀ | Reference 4.4 (both Beiser's and the slides' derivations) |
| 4.5 | Energy levels and spectra, Rydberg constant | Reference 4.5 |
| Ex 4.2, 4.3, 4.4 | Collision exciting to n = 3; orbit of radius 0.0100 mm; Hα wavelength | Reference 4.5; HW practice |
| 4.6 | Correspondence principle | Reference 4.6 (derivation of f\_n) |
| Ex 4.5 | Orbital frequency against photon frequency | Reference 4.6; HW practice |
| 4.7 | Nuclear motion, reduced mass | Reference 4.7 |
| Ex 4.6, 4.7 | Positronium; muonic atom | Reference 4.7; HW practice |
| 4.8 | Atomic excitation, Franck–Hertz | Reference 4.8 |
| 4.9 | The laser | Not in the course (short reminder only) |

## Slides

| Frame (`QM.tex`) | Where on the site |
| --- | --- |
| `:224` Old quantum theory | Reference 4.3, 4.4 |
| `:234` Bohr | Reference 4.4, 4.5 (the slides' kinetic-energy route is written out) |
| `:246` Franck–Hertz | Reference 4.8 (slides date it 1913, Beiser 1914) |

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

*Solution.* **Experiment.** Geiger and Marsden fired $\alpha$-particles at a thin gold foil.

- Most passed almost undeflected.
- About $1$ in $8000$ bounced back at large angles.

**Why Thomson's model fails.** A positive charge smeared over the whole atom produces only a weak field, so it can deflect an $\alpha$-particle by a tiny angle at most. Large deflections need a **strong, concentrated** field.

**Rutherford's conclusion.** The positive charge and nearly all the mass are in a tiny **nucleus** about $10^{-14}$ m across (the atom is about $10^{-10}$ m), so the atom is mostly empty space.

### Problem 2 [QM 3 · Recall · 2 pts]

Why does classical physics predict that a planetary atom is unstable?

*Solution.* **Classical argument.** In the planetary model the electron orbits the nucleus, so it is **accelerating**. An accelerating charge radiates electromagnetic waves, so the electron continuously loses energy.

**Consequences.**

1. The orbit shrinks and the electron **spirals into the nucleus** in about $10^{-8}$ s.
2. During the fall its orbital frequency changes continuously, so the emitted light would have a **continuous spectrum**.

**Observation.** Atoms are stable for billions of years and emit **sharp lines**. Classical physics fails, which is why Bohr introduced stationary states.

### Problem 3 [QM 3 · Recall · 2 pts]

State Bohr's postulates.

*Solution.* **Bohr's postulates (1913).**

1. An electron moves in certain **stationary orbits** without radiating, even though it accelerates.
2. The allowed orbits have quantised angular momentum:

$$L = mvr = n\hbar,\qquad n = 1, 2, 3,\dots$$

3. A photon is emitted or absorbed only when the electron **jumps** between orbits:

$$h\nu = E_i - E_f$$

**Status.** Postulate 1 contradicts classical physics (that is the point). They give $E_n = -13.6/n^2$ eV for hydrogen.

### Problem 4 [QM 3 · Recall · 2 pts]

How does the de Broglie hypothesis explain Bohr's quantisation of angular momentum?

*Solution.* **de Broglie's idea.** An electron in a stable orbit is a standing wave: a whole number of wavelengths must fit around the circumference, otherwise the wave interferes destructively with itself.

$$2\pi r = n\lambda = n\frac h{mv}\ \Rightarrow\ mvr = \frac{nh}{2\pi} = n\hbar$$

This is exactly Bohr's second postulate, now **derived** rather than assumed.

**Picture.** An orbit of circumference $n\lambda$ carries $n$ complete waves. Non-integer $n$ means the wave does not close on itself.

### Problem 5 [QM 3 · Recall · 2 pts]

Name the hydrogen spectral series and the region of the spectrum each lies in.

*Solution.* **Rydberg formula.**

$$\frac1\lambda = R\left(\frac1{n_f^2} - \frac1{n_i^2}\right)$$

| series | ends on $n_f$ | region |
|---|---|---|
| **Lyman** | 1 | ultraviolet |
| **Balmer** | 2 | **visible** (and near UV) |
| **Paschen** | 3 | infrared |
| **Brackett** | 4 | infrared |
| **Pfund** | 5 | infrared |

**Rule.** The larger the energy drop, the shorter the wavelength: $n_f = 1$ gives the most energetic photons.

### Problem 6 [QM 3 · Recall · 2 pts]

State the correspondence principle.

*Solution.* **Correspondence principle (Bohr).** Quantum physics must give the **same results as classical physics** in the limit of large quantum numbers (or $h\to0$).

**Example.** For hydrogen the frequency of the photon emitted in $n\to n-1$ approaches the classical orbital frequency as $n\to\infty$ (Problem 15 in the derivations).

**Use.** It is a consistency test for any quantum theory: a quantised energy spectrum looks continuous when the spacing is tiny compared with the energy.

### Problem 7 [QM 3 · Recall · 2 pts]

Why do the spectral lines of deuterium differ slightly from those of hydrogen?

*Solution.* **Reason.** The nucleus is not fixed: both nucleus and electron orbit their common centre of mass. The energy levels depend on the **reduced mass**

$$m' = \frac{mM}{m + M}$$

**Isotope shift.** Deuterium's nucleus has twice the mass of hydrogen's, so its reduced mass is slightly larger. Its energy levels are slightly deeper and its lines slightly shifted to **shorter wavelength**.

**Size.** The relative shift is about $\dfrac m{2M_p}\approx 3\times10^{-4}$; for $H_\alpha$ (656 nm) this is about $0.18$ nm.

**History.** This is how Urey discovered deuterium in 1931.

### Problem 8 [QM 3 · Recall · 3 pts]

Describe the Franck–Hertz experiment. What do the current dips at 4.9 V intervals show?

*Solution.* **Setup.** Electrons from a hot cathode are accelerated through mercury vapour toward a grid, then must overcome a small retarding voltage to reach the collector.

**Observation.** The collector current rises with accelerating voltage, then **drops sharply** every $4.9$ V.

**Explanation.** An electron with $4.9$ eV can lose **exactly** that energy exciting a mercury atom (first excitation level), and then lacks the energy to reach the collector. At $9.8$ V it can do so twice, and so on.

**Conclusion.** Atoms absorb energy only in **discrete amounts**: they have discrete energy levels. The atom then emits a $253$ nm photon ($1240/4.9$).

### Problem 9 [QM 3 · Recall · 2 pts]

Distinguish spontaneous and stimulated emission.

*Solution.* | | **Spontaneous** | **Stimulated** |
|---|---|---|
| Trigger | none | a passing photon of energy $h\nu = E_2 - E_1$ |
| Timing | random, within the lifetime | caused by the photon |
| Photon produced | random direction, phase and polarisation | identical to the triggering photon in **frequency, phase, direction and polarisation** |
| Light | incoherent (a bulb) | coherent (a laser) |

**Result.** Stimulated emission **amplifies** light: one photon in, two identical photons out.

### Problem 10 [QM 3 · Recall · 3 pts]

What is population inversion? Why is a metastable state needed to achieve it?

*Solution.* **Population inversion.** More atoms in an upper state than in a lower state, $N_2 > N_1$.

- Normally $N_1 > N_2$, so a beam of light is **absorbed** more than it is amplified.
- With inversion, stimulated emission wins and the beam is **amplified** (a laser).

**Why a metastable state is needed.** An ordinary excited state empties by spontaneous emission in about $10^{-8}$ s, so atoms cannot accumulate. A **metastable** state lives about $10^{-3}$ s (the transition is forbidden by a selection rule), long enough for atoms to pile up there and form an inversion.

**Pumping** (by light or collisions) supplies the energy to keep atoms in the upper state.

### Problem 11 [QM 3 · Recall · 2 pts]

Why is a four-level laser easier to run continuously than a three-level laser?

*Solution.* **Three-level laser.** The lower laser level is the **ground state**. Since almost all atoms start there, more than **half** of them must be pumped out of it before $N_2 > N_1$: a lot of power, and usually only pulsed operation.

**Four-level laser.** The lower laser level is a **higher** level, which empties rapidly to the ground state. It is therefore almost always empty, so even a small number of atoms in the upper level gives $N_2 > N_1$.

**Result.** Four-level lasers need much less pumping power and can run continuously (He–Ne, Nd:YAG).

### Problem 12 [QM 3 · Recall · 2 pts]

List two failures of the Bohr model.

*Solution.* **Two failures of the Bohr model** (any two):

1. It works only for **one-electron** atoms (H, He$^+$, Li$^{2+}$); it fails for helium.
2. It cannot predict **line intensities** or selection rules.
3. It cannot explain **fine structure** or the **Zeeman effect**.
4. It uses **definite orbits**, which the uncertainty principle forbids.

**Replaced by** the Schrödinger equation (chapters 11 and 12), which gives the same energy levels for hydrogen but with correct probability distributions.

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

Estimate how long a classical electron in a Bohr orbit would take to spiral into the nucleus, and why that is a problem. (Order of magnitude only: Beiser just says "a fraction of a second"; the classical radiation formula gives about 10⁻¹¹ s.)

*Solution.* **The problem.** The orbiting electron accelerates, so it radiates. The classical radiation (Larmor) formula says it would lose its energy and spiral into the nucleus in

$$t \sim 10^{-11}\ \text{s}$$

(Beiser only says "a fraction of a second"; don't confuse this with the 10⁻⁸ s lifetime of an excited state.)

**Why that matters.** Real atoms last for billions of years and emit **sharp lines**, not a continuous spectrum. So classical electromagnetism plus Rutherford's atom is inconsistent with observation.

**Resolution.** Quantised **stationary states** (Bohr), and later a wave function with a lowest allowed energy (1s), below which the electron cannot fall.

### Problem 30 [QM 3 · Discussion · 3 pts]

A He–Ne laser gives 1 mW at 632.8 nm. Estimate the number of photons per second and explain why laser light is coherent but a bulb's light isn't.

*Solution.* **Photons per second.**

$$E_\gamma = \frac{1240}{632.8} = 1.96\ \text{eV} = 3.1\times10^{-19}\ \text{J}$$

$$N = \frac P{E_\gamma} = \frac{10^{-3}}{3.1\times10^{-19}} \approx \boxed{3\times10^{15}\ \text{photons/s}}$$

**Coherence.** In a laser, each stimulated photon copies the **phase** (and direction, polarisation) of the photon that triggered it, so the whole beam is in step: **coherent**. In a bulb every atom emits spontaneously at a random time with a random phase, so the light is a jumble of unrelated waves.

### Problem 31 [QM 3 · Discussion · 2 pts]

The Sun's spectrum shows dark absorption lines. Explain how they tell us which elements are in the Sun's outer layers.

*Solution.* **Idea.** The Sun's bright interior emits a continuous spectrum. The cooler gas in its outer layers **absorbs** photons whose energy equals an energy-level difference of its atoms.

**Result.** Those wavelengths are missing, leaving **dark lines**:

$$h\nu = E_f - E_i$$

**Identification.** Every element has a unique set of energy levels, so its pattern of dark lines is a fingerprint. Matching the lines to laboratory spectra identifies the elements present.

**History.** Helium (Greek *helios*, "sun") was found in the Sun's spectrum in 1868, before it was found on Earth.

