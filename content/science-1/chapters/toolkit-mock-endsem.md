# Practice: Mock endsem

**Time: 120 minutes. Total: 50 points.** A simple calculator is allowed. No formula sheet. Sit it in one go, on paper, before you open the solutions page.

**Layout.** Modelled on the 2025 endsem (120 minutes, 50 points, calculator allowed, no formula sheet, short questions then longer ones). Part I is 16 short questions of 2 points each (32 points). Part II is 3 longer questions of 6 points each (18 points). The questions run through the 12 chapters in order, so you can see which chapters you lose marks in.

## Constants

$$m_e = 9.11\times10^{-31}\ \text{kg},\quad h = 6.626\times10^{-34}\ \text{J s},\quad k_B = 1.381\times10^{-23}\ \text{J/K},\quad c = 3\times10^8\ \text{m/s}$$

$$R = 8.314\ \text{J K}^{-1}\text{mol}^{-1},\quad hc = 1240\ \text{eV nm},\quad \hbar c = 197\ \text{eV nm},\quad m_ec^2 = 0.511\ \text{MeV},\quad E_n^{\text{H}} = -13.6/n^2\ \text{eV}$$

## Part I: short questions (2 points each)

**Q1 (Chapter 1).** The logistic map $x_{n+1} = rx_n(1 - x_n)$ has $r = 2.5$. Find the non-zero fixed point and decide whether it is stable.

**Q2 (Chapter 2).** A rocket in free space burns fuel with exhaust speed $2$ km/s relative to the rocket. What mass ratio $m_0/m$ is needed to reach $5$ km/s from rest?

**Q3 (Chapter 3).** An Atwood machine has masses $m_1 = 3m$ and $m_2 = m$ on a light string over a light pulley. Write the Lagrangian in one coordinate and find the acceleration.

**Q4 (Chapter 4).** Two stars of equal mass $M$ orbit each other in circles about their centre of mass, a distance $d$ apart. Find the orbital period.

**Q5 (Chapter 5).** A rod of proper length $1$ m flies lengthwise past you at $0.6c$. How long does it appear to you, and how long does it take to pass a fixed point?

**Q6 (Chapter 5).** An electron has kinetic energy $0.511$ MeV. Find its $\gamma$, its speed and its momentum in MeV/$c$.

**Q7 (Chapter 6).** Two moles of a perfect gas expand reversibly and isothermally at $300$ K from $10$ L to $40$ L. Find $q$, $w$ and $\Delta U$.

**Q8 (Chapter 6).** A monatomic perfect gas at $300$ K is compressed reversibly and adiabatically to half its volume. Find the final temperature.

**Q9 (Chapter 7).** One mole of ice melts at $273$ K and $1$ atm, with $\Delta_\text{fus}H = 6.01$ kJ/mol. Find $\Delta S$ of the system, of the surroundings, and in total.

**Q10 (Chapter 7).** For $\text{N}_2 + 3\text{H}_2 \to 2\text{NH}_3$, $\Delta H^\circ = -92.2$ kJ and $\Delta S^\circ = -198.7$ J/K. Find $\Delta G^\circ$ at $298$ K and the temperature above which the reaction stops being spontaneous.

**Q11 (Chapter 8).** Light of wavelength $400$ nm falls on a metal with work function $2.3$ eV. Find the maximum kinetic energy of the photoelectrons and the stopping potential.

**Q12 (Chapter 9).** Find the de Broglie wavelength of an electron accelerated from rest through $150$ V.

**Q13 (Chapter 10).** Find the wavelength of the photon emitted when a He$^+$ ion drops from $n = 3$ to $n = 2$.

**Q14 (Chapter 11).** An electron is confined to a one-dimensional box $0.5$ nm wide. Find $E_1$ and the wavelength of the photon emitted in the $n = 2 \to 1$ transition.

**Q15 (Chapter 11).** An electron with energy $2$ eV meets a barrier $5$ eV high and $0.4$ nm wide. Estimate the transmission probability.

**Q16 (Chapter 12).** For the $3d$ state of hydrogen, give $n$, $l$, the possible $m_l$, the magnitude of $\mathbf L$, the number of radial nodes, and the only allowed single-photon decay.

## Part II: longer questions (6 points each)

**Q17 (Chapter 6, 7).** One mole of a monatomic perfect gas ($C_{V,m} = \tfrac32R$) is taken through two reversible steps: (i) heated at constant volume from $300$ K to $600$ K; (ii) expanded isothermally at $600$ K until its volume doubles.

(a) For each step find $q$, $w$, $\Delta U$ and $\Delta S$ of the system. (4 points)

(b) Give the totals for the two steps and explain why $\Delta S$ and $\Delta U$ would be the same along any other path between the same end states, but $q$ and $w$ would not. (2 points)

**Q18 (Chapters 3, 4).** A particle of mass $m$ moves in a plane with the Lagrangian

$$L = \tfrac12m\left(\dot r^2 + r^2\dot\theta^2\right) - \tfrac12kr^2$$

(a) Which quantities are conserved, and why? (2 points)

(b) Find the conjugate momenta and the Hamiltonian, and write Hamilton's equations. (2 points)

(c) For a circular orbit with angular momentum $\ell$, find the radius and the angular frequency. Does the frequency depend on the radius? (2 points)

**Q19 (Chapters 11, 12).**

(a) A particle in a box $0 < x < L$ is in the state $\psi = A\sin(2\pi x/L)$. Normalise it. (1 point)

(b) Find the probability of finding it in the left third of the box, $0 < x < L/3$. (2 points)

(c) If the particle is an electron and $L = 1$ nm, find the wavelength of the photon emitted when it drops from this state to the ground state. (1 point)

(d) A hydrogen wave function is $\psi \propto r\,e^{-r/2a_0}\sin\theta\,e^{-i\varphi}$. Find $n$, $l$ and $m_l$. (2 points)

# Practice: Mock endsem, marking scheme and solutions

Mark yourself honestly: **full marks only if the method and the answer are both right**. A correct number with no working earns half. Then write your marks per chapter in the table at the end.

## Part I

**Q1 (2).** $x^* = 1 - 1/r = 1 - 0.4 = \boxed{0.6}$. The slope is $f'(x^*) = 2 - r = -0.5$, and $|f'| < 1$, so it is **stable**.

- 1 for $x^*$, 1 for the slope test.

**Q2 (2).** $v = u\ln(m_0/m)$, so $\ln(m_0/m) = 5/2 = 2.5$ and

$$\frac{m_0}m = e^{2.5} \approx \boxed{12.2}$$

About $92\%$ of the launch mass must be fuel.

- 1 for the rocket equation, 1 for the number.

**Q3 (2).** One coordinate $x$ (length of string on the $m_1$ side). $T = \tfrac12(4m)\dot x^2$, $U = -3mgx - mg(\ell - x)$:

$$L = 2m\dot x^2 + 2mgx + \text{const}$$

$$4m\ddot x = 2mg\ \Rightarrow\ \boxed{a = g/2}$$

Check with the formula $a = g(m_1 - m_2)/(m_1 + m_2) = g(2m)/(4m) = g/2$ ✓.

- 1 for $L$, 1 for the equation and result.

**Q4 (2).** Each star moves on a circle of radius $d/2$ with angular speed $\omega$. The force on one star is $GM^2/d^2$:

$$M\omega^2\frac d2 = \frac{GM^2}{d^2}\ \Rightarrow\ \omega^2 = \frac{2GM}{d^3}$$

$$\boxed{T = \frac{2\pi}\omega = 2\pi\sqrt{\frac{d^3}{2GM}}}$$

- 1 for the force balance with radius $d/2$ (not $d$), 1 for $T$. (Equivalent: reduced mass $M/2$ orbiting at separation $d$.)

**Q5 (2).** $\gamma = 1/\sqrt{1 - 0.36} = 1.25$.

$$L = \frac{1\ \text{m}}{1.25} = \boxed{0.8\ \text{m}},\qquad t = \frac{0.8}{0.6c} = \frac{0.8}{1.8\times10^8} = \boxed{4.4\ \text{ns}}$$

- 1 each.

**Q6 (2).** $K = (\gamma - 1)mc^2 = mc^2 \Rightarrow \gamma = 2$.

$$\beta = \sqrt{1 - \frac14} = \frac{\sqrt3}2 \approx \boxed{0.866},\qquad pc = \gamma\beta\,mc^2 = \sqrt3(0.511) = \boxed{0.885\ \text{MeV}}$$

so $p = 0.885$ MeV/$c$.

- $\tfrac12$ each for $\gamma$, $\beta$; 1 for $p$.

**Q7 (2).**

$$w = -nRT\ln\frac{V_2}{V_1} = -2(8.314)(300)\ln4 = -4988\times1.386 \approx \boxed{-6.9\ \text{kJ}}$$

$$\Delta U = 0\ (\text{isothermal, perfect gas}),\qquad q = -w = \boxed{+6.9\ \text{kJ}}$$

- 1 for $w$, $\tfrac12$ each for $\Delta U$ and $q$.

**Q8 (2).** $\gamma = 5/3$, so $TV^{\gamma - 1} = TV^{2/3}$ is constant:

$$T_2 = T_1\left(\frac{V_1}{V_2}\right)^{2/3} = 300\times2^{2/3} = 300\times1.587 \approx \boxed{476\ \text{K}}$$

- 1 for the relation, 1 for the number. (Using $\gamma = 7/5$ loses both marks: the gas is monatomic.)

**Q9 (2).**

$$\Delta S_\text{sys} = \frac{\Delta_\text{fus}H}T = \frac{6010}{273} = \boxed{+22.0\ \text{J/K}}$$

The surroundings supply the heat reversibly: $\Delta S_\text{surr} = -22.0$ J/K, so $\Delta S_\text{total} = \boxed{0}$ (reversible, at equilibrium).

- 1 for the system, 1 for the surroundings and total.

**Q10 (2).**

$$\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ = -92.2 - (298)(-0.1987) = -92.2 + 59.2 = \boxed{-33.0\ \text{kJ}}$$

$\Delta H < 0$ and $\Delta S < 0$, so the reaction is spontaneous only at low $T$: $\Delta G < 0$ for

$$T < \frac{\Delta H}{\Delta S} = \frac{92\,200}{198.7} \approx \boxed{464\ \text{K}}$$

- 1 for $\Delta G$, 1 for the temperature.

**Q11 (2).** $E_\gamma = 1240/400 = 3.10$ eV, so

$$K_\text{max} = 3.10 - 2.3 = \boxed{0.80\ \text{eV}},\qquad V_0 = \boxed{0.80\ \text{V}}$$

- 1 each.

**Q12 (2).**

$$\lambda = \frac{1.226}{\sqrt{150}}\ \text{nm} = \frac{1.226}{12.25} = \boxed{0.100\ \text{nm}}$$

(from $\lambda = h/\sqrt{2meV}$.)

- 1 for the formula, 1 for the number.

**Q13 (2).** $E_n = -13.6Z^2/n^2$ with $Z = 2$:

$$\Delta E = 13.6(4)\left(\frac14 - \frac19\right) = 54.4\times0.1389 = 7.56\ \text{eV}$$

$$\lambda = \frac{1240}{7.56} \approx \boxed{164\ \text{nm}}\ (\text{ultraviolet})$$

- 1 for $\Delta E$ (with $Z^2$), 1 for $\lambda$.

**Q14 (2).**

$$E_1 = \frac{(hc)^2}{8m_ec^2L^2} = \frac{(1240)^2}{8(0.511\times10^6)(0.5)^2} = \frac{1.5376\times10^6}{1.022\times10^6} = \boxed{1.50\ \text{eV}}$$

$$\Delta E = E_2 - E_1 = 3E_1 = 4.5\ \text{eV}\ \Rightarrow\ \lambda = \frac{1240}{4.5} \approx \boxed{275\ \text{nm}}$$

- 1 each.

**Q15 (2).** $k_2 = \sqrt{2m(U - E)}/\hbar$:

$$k_2 = \frac{\sqrt{2(0.511\times10^6)(3)}}{197} = \frac{1751}{197} = 8.89\ \text{nm}^{-1}$$

$$T \approx e^{-2k_2L} = e^{-2(8.89)(0.4)} = e^{-7.1} \approx \boxed{8\times10^{-4}}$$

- 1 for $k_2$, 1 for $T$.

**Q16 (2).**

- $n = 3$, $l = 2$, $m_l = -2, -1, 0, 1, 2$.
- $L = \sqrt{l(l+1)}\hbar = \sqrt6\hbar$.
- Radial nodes $= n - l - 1 = 0$.
- Selection rule $\Delta l = \pm1$: $3d \to 2p$ is the only allowed decay ($3d \to 2s$ and $3d \to 1s$ have $\Delta l = -2$).

- $\tfrac12$ each for quantum numbers, $L$, nodes, and the decay.

## Part II

**Q17 (6).** $C_V = \tfrac32R = 12.47$ J/(K mol).

**Step (i), constant volume, $300 \to 600$ K:**

$$w = 0,\qquad q = \Delta U = C_V\Delta T = 12.47\times300 = \boxed{3.74\ \text{kJ}}$$

$$\Delta S = C_V\ln\frac{600}{300} = 12.47\times0.693 = \boxed{8.64\ \text{J/K}}$$

**Step (ii), isothermal at $600$ K, $V \to 2V$:**

$$\Delta U = 0,\quad q = -w = RT\ln2 = 8.314\times600\times0.693 = \boxed{3.46\ \text{kJ}},\quad w = -3.46\ \text{kJ}$$

$$\Delta S = R\ln2 = \boxed{5.76\ \text{J/K}}$$

**(b) Totals.**

$$q = 7.20\ \text{kJ},\quad w = -3.46\ \text{kJ},\quad \Delta U = 3.74\ \text{kJ},\quad \Delta S = 14.4\ \text{J/K}$$

Check: $q + w = 7.20 - 3.46 = 3.74$ kJ $= \Delta U$ ✓.

$U$ and $S$ are **state functions**: they depend only on the end states, so every path between them gives the same $\Delta U$ and $\Delta S$. Heat and work are **path functions**: a different path (for example expand first, then heat) gives different $q$ and $w$ with the same sum $q + w$.

- (a) 1 for each of: step (i) $q,w,\Delta U$; step (i) $\Delta S$; step (ii) $q,w,\Delta U$; step (ii) $\Delta S$. (b) 1 for the totals and check, 1 for the state-function explanation.

**Q18 (6).**

**(a)** $\theta$ is cyclic ($L$ does not contain $\theta$), so the angular momentum

$$\ell = mr^2\dot\theta$$

is conserved (rotational symmetry). $L$ has no explicit time dependence, so the energy $E = \tfrac12m(\dot r^2 + r^2\dot\theta^2) + \tfrac12kr^2$ is conserved.

**(b)** $p_r = m\dot r$, $p_\theta = mr^2\dot\theta$:

$$H = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2mr^2} + \tfrac12kr^2$$

$$\dot r = \frac{p_r}m,\quad \dot p_r = \frac{p_\theta^2}{mr^3} - kr;\qquad \dot\theta = \frac{p_\theta}{mr^2},\quad \dot p_\theta = 0$$

**(c)** A circular orbit has $\dot p_r = 0$, that is $p_\theta^2/mr^3 = kr$ with $p_\theta = \ell$:

$$r_0^4 = \frac{\ell^2}{mk}\ \Rightarrow\ \boxed{r_0 = \left(\frac{\ell^2}{mk}\right)^{1/4}}$$

$$\omega = \dot\theta = \frac\ell{mr_0^2} = \boxed{\sqrt{\frac km}}$$

The frequency does **not** depend on the radius: all circular orbits in a harmonic potential have the same period (which is why the orbits are closed).

- (a) 1 for $\ell$ with the reason, 1 for energy with the reason. (b) 1 for $p_r, p_\theta$ and $H$, 1 for the four equations. (c) 1 for $r_0$, 1 for $\omega$ and the comment.

**Q19 (6).**

**(a)** $\int_0^LA^2\sin^2\dfrac{2\pi x}L\,dx = A^2\dfrac L2 = 1\ \Rightarrow\ \boxed{A = \sqrt{2/L}}$.

**(b)**

$$P = \frac2L\int_0^{L/3}\sin^2\frac{2\pi x}L\,dx = \left[\frac xL - \frac1{4\pi}\sin\frac{4\pi x}L\right]_0^{L/3} = \frac13 - \frac1{4\pi}\sin\frac{4\pi}3$$

$$= \frac13 + \frac{\sqrt3/2}{4\pi} = 0.333 + 0.069 = \boxed{0.40}$$

(compare $1/3$ classically.)

**(c)** $E_n = n^2E_1$ with $E_1 = 0.376/1^2 = 0.376$ eV for $L = 1$ nm. $\Delta E = E_2 - E_1 = 3E_1 = 1.13$ eV:

$$\lambda = \frac{1240}{1.13} \approx \boxed{1100\ \text{nm}}\ (\text{infrared})$$

**(d)** $R(r) \propto re^{-r/2a_0}$ is the $n = 2$, $l = 1$ radial function; $\sin\theta\,e^{-i\varphi}$ is $Y_1^{-1}$:

$$\boxed{n = 2,\quad l = 1,\quad m_l = -1}\quad(\text{a } 2p\text{ state})$$

- (a) 1. (b) 1 for setting up the integral, 1 for the number. (c) 1. (d) $\tfrac12$ for each recognised function, 1 for the three quantum numbers.

## Score sheet

| Chapter | Questions | Marks available | Your marks |
|---|---|---|---|
| 1 Scales, modelling, nonlinear dynamics | Q1 | 2 | |
| 2 Newtonian mechanics | Q2 | 2 | |
| 3 Lagrangian mechanics | Q3, Q18(a) | 4 | |
| 4 Hamiltonian, two-body | Q4, Q18(b,c) | 6 | |
| 5 Special relativity | Q5, Q6 | 4 | |
| 6 Thermodynamics I | Q7, Q8, Q17 | 8 | |
| 7 Thermodynamics II | Q9, Q10, Q17(b) | 6 | |
| 8 Particle properties of waves | Q11 | 2 | |
| 9 Wave properties of particles | Q12 | 2 | |
| 10 Atomic structure | Q13 | 2 | |
| 11 Quantum mechanics | Q14, Q15, Q19(a–c) | 8 | |
| 12 Hydrogen atom | Q16, Q19(d) | 4 | |
| **Total** | | **50** | |

**How to read the result.** Under $30$: go back to the chapters where you lost the most marks (the table shows them) and redo their practice problems. $30$ to $40$: you have the method but are dropping marks on slips; check signs, units and the "common mistake" notes. Above $40$: sit a past paper under the same conditions.
