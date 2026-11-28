# Reference: Endsem past-paper pattern and repeated PYQs

Sources: the uploaded **2024 endsem with handwritten key** (both uploads are the same file, the Monsoon 2024 paper) and the **2025 endsem** already in `05-past-papers/2025-endsem.pdf`.

## 1. Format

| | 2024 endsem | 2025 endsem |
|---|---|---|
| Time, marks | 180 min, 100 | 120 min, 50 |
| Part I | 25 short questions × 2 = 50, answer in 1–2 lines in the box | 17 short questions × 2 = 34 |
| Part II | 10 long questions × 5 = 50 | Q18 thermo cycle (7), Q19 Lagrangian→Hamiltonian (5), Q20 hydrogen wavefunction (4) |
| Calculator | allowed | allowed |
| Given on paper | $m_e$, $h$, $k_B$, $\sigma$, $N_A$, $c$, $\nabla^2$ in spherical coordinates, $\int e^{-\alpha x^2}dx=\sqrt{\pi/\alpha}$ | same, plus $E_n=-13.6/n^2$ eV |

**Expect the 2025 format** (most recent): 2 hours, 50 marks, about 17 two-mark questions plus 3 multi-part questions worth 4–7 marks.

## 2. Topic mix

| Topic | 2024 (Part I / Part II) | 2025 |
|---|---|---|
| Newtonian mechanics (drag, friction, B-field helix, pulley) | 5 / 2 | 2 |
| Lagrangian / Hamiltonian | 0 / 1 | 1 (5 marks) |
| STR | 4 / 1 | 1 |
| QM (Beiser 2–6) | 15 / 5 | 13 (incl. 4-mark hydrogen) |
| Thermo / kinetic theory | 1 / 0 | 1 + Otto cycle (7 marks) |
| Modelling / scientific method | 0 | 0 |

**Key observation: 19 of the 2025 paper's 20 questions came from the 2024 paper**, most word-for-word and a few lightly changed (the square box became a cube, the λ peak became a ν peak, the hydrogen ψ changed). Only the Otto cycle was new. So the repeated questions below are the highest-probability items. This year's syllabus adds Atkins thermochemistry/entropy/Gibbs, central force, rocket motion and calculus of variations, so expect a few new questions there too.

**Style:** mostly "plug the right formula and get a number" or "state the result in one line". Even questions that say "derive" (Otto efficiency, Compton) only need the 3–4 key steps. Since derivations are not coming this year, these practice sets ask for numbers and reasoning instead.

## 3. Repeated questions with correct answers

Some answers in the 2024 handwritten key are off. Corrected values are marked **(key differs)**.

1. **Terminal velocity, drag $-kv$:** $m\dot v = mg - kv$ gives $v_t = mg/k$.
2. **Helix pitch in $\vec B = B\hat z$:** $v_\perp$ makes a circle with $T = 2\pi m/(qB)$ while $v_\parallel$ is unchanged, so pitch $= v_\parallel\,2\pi m/(qB)$, with $v_\parallel = v_z$.
3. **Gold atom 0.6c → 0.8c, ratio of ΔKE (rel/classical):** $\dfrac{(\gamma_2-\gamma_1)mc^2}{\tfrac12 m(0.64-0.36)c^2} = \dfrac{1.6667-1.25}{0.14} = 2.98$.
4. **Proton positioned to ±1e-11 m, uncertainty 1 s later:** $\Delta v \ge \hbar/(2m_p\Delta x) = 3.15\times10^3$ m/s, so $\Delta x(1\,\text{s}) \approx 3.2$ km. Using $\Delta x = 2\times10^{-11}$ m (full width) halves this, so state your convention.
5. **Muonic atom (207 $m_e$) ionisation energy:** reduced mass $\mu = \frac{207\cdot1836}{2043}m_e = 186\,m_e$, so $E_I = 13.6\times186 \approx 2.53$ keV.
6. **Tunnelling, 1 eV electron, 10 eV barrier, 0.5 nm:** $\kappa = \sqrt{2m(U-E)}/\hbar = 1.54\times10^{10}$ m⁻¹, $T\approx e^{-2\kappa L} = e^{-15.4} \approx 2\times10^{-7}$ **(key differs: it used $U$ instead of $U-E$)**.
7. **SHO $\langle x^2\rangle$, n = 0:** $\psi_0 \propto e^{-m\omega x^2/2\hbar}$. Feynman trick: $\int x^2e^{-\alpha x^2}dx = -\frac{d}{d\alpha}\sqrt{\pi/\alpha} = \frac{\sqrt\pi}{2}\alpha^{-3/2}$, so $\langle x^2\rangle = \frac{1}{2\alpha}$ with $\alpha = m\omega/\hbar$, giving $\langle x^2\rangle = \hbar/(2m\omega)$.
8. **21 cm line → B on electron:** $\Delta E = hc/\lambda = 5.9\times10^{-6}$ eV. With $\Delta E = 2\mu_B B$, $B \approx 0.05$ T (the key takes $\Delta E = \mu_B B$ and gets 0.1 T). ⚠ Spin is Beiser 7.1, just outside this year's QM list, but this question appeared twice.
9. **Meaning of the quantum numbers:** $n$ gives the energy $E_n = -13.6/n^2$ eV; $l$ gives the size of the angular momentum $L = \sqrt{l(l+1)}\hbar$; $m_l$ gives its z-component $L_z = m_l\hbar$ (space quantisation); $m_s$ gives the spin z-component $\pm\hbar/2$.
10. **Electron configuration of P:** $1s^2 2s^2 2p^6 3s^2 3p^3$. ❌ This is Beiser ch 7 (periodic table), not in this year's syllabus.
11. **Angle between L and z for l = 2:** $\cos\theta = m_l/\sqrt6$, so $\theta = 35.3°, 65.9°, 90°, 114.1°, 144.7°$.
12. **Box, P(0 ≤ x ≤ L/n) in state n:** each lobe holds equal probability, so it is exactly $1/n$.
13. **Cube: T where P(2nd excited) = ½ P(ground):** levels are $E_0(n_x^2+n_y^2+n_z^2)$, $E_0 = h^2/8mL^2$. Ground (111) is $3E_0 = E_g$, non-degenerate. 2nd excited is (221) at $9E_0 = 3E_g$, 3-fold. $3e^{-2E_g/kT} = \tfrac12$, so $T = \dfrac{2E_g}{k\ln6}$ **(key differs: it used a 2-D square)**.
14. **O₂ most probable speed at 25 °C:** $\sqrt{2RT/M} = 394$ m/s, about 2.8× an aeroplane at 500 km/h (139 m/s).
15. **Chip at 10 W/cm²:** $T = (10^5/5.67\times10^{-8})^{1/4} = 1.15\times10^3$ K **(key differs: 1328 K)**.
16. **Planck peak:** in $\lambda$: $5(1-e^{-x}) = x$, $x = hc/\lambda kT = 4.965$. In $\nu$ (2025 version): $3(1-e^{-x}) = x$, $x = h\nu/kT = 2.821$.
17. **Bragg, KCl, 28.4°, 0.30 nm, first order:** $d = \lambda/(2\sin\theta) = 0.315$ nm.
18. **Relativistic Lagrangian $L = -m\sqrt{c^2-u^2} - V$** (2024 and 2025; the intended form is $-mc\sqrt{c^2-u^2}$): $\vec p = \partial L/\partial\vec u = m\vec u/\sqrt{c^2-u^2}$, $p^2 = m^2u^2/(c^2-u^2)$. $H = \vec p\cdot\vec u - L = mc^2/\sqrt{c^2-u^2} + V$. With the $mc$ prefactor, $H = \gamma mc^2 + V = \sqrt{p^2c^2+m^2c^4}+V$.
19. **Hydrogen ψ ∝ r e^{-r/2a₀} sinθ e^{-iφ} (2024):** $n=2$, $l=1$, $m_l=-1$. **ψ ∝ r² e^{-r/3a₀} sinθ cosθ e^{2iφ} (2025):** $n=3$, $l=2$, $m_l=+2$. Quick rule: $e^{-r/na_0}$ gives $n$; the power of $r$ (with no radial node) is $l$; $e^{im\phi}$ gives $m_l$.
20. **Otto cycle (2025, 7 marks):** $\eta = 1 - (V_B/V_A)^{\gamma-1} = 1 - r^{1-\gamma}$, with $r = V_A/V_B$. Adiabats have ΔS = 0. B→C: $\Delta S_{sys} = C_{V,m}\ln(T_C/T_B)$, D→A: $C_{V,m}\ln(T_A/T_D)$, and these cancel because $T_C/T_B = T_D/T_A$. In a reversible cycle, $\Delta S_{surr} = -\Delta S_{sys}$ for each step.

## 4. Practice pages

- **Practice: 2025 endsem** and **Practice: 2024 endsem**: the original papers (in-syllabus questions only) with worked solutions.
- **Practice: Endsem set 1**: a full 50-mark paper in the 2025 format, built as variants of the repeated questions.
- **Practice: Endsem set 2**: a full 50-mark paper on this year's new syllabus areas (modelling, Atkins thermo, central force, rocket, calculus of variations).
- **Practice: Endsem long-answer bank**: 15 five-mark questions in the 2024 Part II style.

No question asks for a derivation, and everything stays inside this year's syllabus. Anything borderline is flagged ⚠.
