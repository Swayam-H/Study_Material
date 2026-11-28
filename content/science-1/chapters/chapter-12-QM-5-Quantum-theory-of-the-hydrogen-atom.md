# Learn: Quantum theory of the hydrogen atom

Solving the Schrödinger equation for the Coulomb potential gives three quantum numbers $n, l, m_l$. $n$ fixes the energy (the same $-13.6/n^2$ eV as Bohr), $l$ fixes the size of the angular momentum, and $m_l$ its direction. The electron has no orbit, only a probability cloud. This doc covers Beiser 6.1–6.9 and the slides `QM.tex:444` to `:533`. Your professor said the focus is understanding, not derivations, so the theory stresses what each result means.

> **Endsem scope.** Beiser 6.10 (the Zeeman effect) is excluded.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## Why go beyond Bohr

The Bohr model gave the right energy levels for hydrogen, but it did so by assuming circular orbits and angular momentum in whole multiples of $\hbar$. Neither assumption had any deeper justification, and the model could say nothing about atoms with more than one electron or about why some spectral lines are brighter than others. The proper treatment is to solve Schrödinger's equation for an electron bound to a proton.

## Separating the Schrödinger equation

The electron feels the Coulomb potential

$$U(r) = -\frac{e^2}{4\pi\varepsilon_0r}$$

which depends only on $r$. Because of this spherical symmetry, use spherical polar coordinates $(r, \theta, \phi)$ and look for

$$\boxed{\psi(r, \theta, \phi) = R(r)\,\Theta(\theta)\,\Phi(\phi)}$$

The one partial differential equation then splits into three ordinary ones. Each has acceptable solutions only for particular values of a separation constant, and these constants are the quantum numbers:

| Equation | Condition for a well-behaved solution | Quantum number |
|---|---|---|
| $\Phi(\phi)$: $\Phi = e^{im_l\phi}$ | $\Phi(\phi + 2\pi) = \Phi(\phi)$ (single-valued) | $m_l = 0, \pm1, \pm2, \dots$ |
| $\Theta(\theta)$ | finite at $\theta = 0$ and $\pi$; constant must be $l(l + 1)$ | $l = 0, 1, 2, \dots$ with $l \ge \lvert m_l\rvert$ |
| $R(r)$ | $R \to 0$ as $r \to \infty$ (bound) | $n = 1, 2, 3, \dots$ with $n > l$ |

In each case the quantum number appears for the same reason as in the particle in a box: a wave function that must be well behaved can be so only for certain values of its parameters. Three dimensions simply give three such conditions.

$$\boxed{n = 1, 2, 3, \dots;\qquad l = 0, 1, \dots, n - 1;\qquad m_l = -l, \dots, 0, \dots, +l}$$

## Energy: the principal quantum number

$$\boxed{E_n = -\frac{me^4}{32\pi^2\varepsilon_0^2\hbar^2}\,\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}}$$

The formula is exactly Bohr's. What is new is that the energy depends on $n$ alone, so states with the same $n$ but different $l$ and $m_l$ have the same energy:

$$\text{degeneracy of level } n = \sum_{l=0}^{n-1}(2l + 1) = n^2\qquad(2n^2 \text{ with spin})$$

This degeneracy is special to the $1/r$ potential; in atoms with more electrons the inner electrons screen the nucleus and states of different $l$ separate in energy.

## Angular momentum: the orbital quantum number

$$\boxed{L = \sqrt{l(l + 1)}\,\hbar}$$

This is not Bohr's $L = n\hbar$. An electron in an s state ($l = 0$) has **no** orbital angular momentum at all, something no classical orbit can manage. States are labelled by $n$ and a letter for $l$:

| $l$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| letter | s | p | d | f | g |

so a $3d$ electron has $n = 3$, $l = 2$.

## Direction: the magnetic quantum number

$$\boxed{L_z = m_l\hbar,\qquad m_l = -l, \dots, +l\ \ (2l + 1 \text{ values}),\qquad \cos\theta = \frac{m_l}{\sqrt{l(l + 1)}}}$$

Since $L_z$ takes only $2l + 1$ values, $\mathbf L$ can point only in certain directions relative to the axis: **space quantisation**. The largest $L_z = l\hbar$ is always smaller than $\sqrt{l(l + 1)}\,\hbar$, so $\mathbf L$ can never lie exactly along the axis. If it could, $L_x$ and $L_y$ would both be exactly zero, and all three components would be known at once, which the uncertainty principle forbids. Only $|\mathbf L|$ and one component can be definite at the same time.

## Probability density

The wave function does not describe a path. It gives the probability $|\psi|^2dV$ of finding the electron in a small volume. The probability of finding it between $r$ and $r + dr$ is

$$\begin{gathered}\boxed{P(r)\,dr = r^2|R(r)|^2\,dr} \\[4pt] (\text{the } r^2 \text{ is from the volume } 4\pi r^2dr \text{ of a thin shell})\end{gathered}$$

For the ground state $R \propto e^{-r/a_0}$, so $P(r) \propto r^2e^{-2r/a_0}$, whose maximum is at $r = a_0$, the Bohr radius. The Bohr orbit survives, but only as the **most probable distance**, not as a track. The angular parts give the familiar shapes: s states are spherical, and p and d states have lobes in definite directions, which is why chemical bonds have definite directions.

![Radial probability and the angular momentum vector model](fig/orbitals-angular-momentum.svg)

*Figure. Left: radial probability densities of 1s, 2s and 2p. Right: for $l=2$, $\mathbf L$ has length $\sqrt6\hbar$ and $L_z=m_l\hbar$, so it can point only along five cones.*

## Radiative transitions

In a stationary state $|\Psi|^2$ does not change with time, so the charge distribution is static and, unlike Bohr's orbiting electron, it does not radiate. During a transition the electron is in a mixture of the two states,

$$\Psi = a\,\psi_ie^{-iE_it/\hbar} + b\,\psi_fe^{-iE_ft/\hbar}\quad\Longrightarrow\quad |\Psi|^2 \text{ oscillates at } \nu = \frac{E_i - E_f}{h}$$

An oscillating charge distribution radiates at its oscillation frequency, so the emitted photon has exactly $h\nu = E_i - E_f$. What Bohr had to postulate now follows from the theory.

## Selection rules

The transition rate depends on the dipole integral $\int\psi_f^*\,x\,\psi_i\,dV$ between the states, and this vanishes unless

$$\boxed{\Delta l = \pm1,\qquad \Delta m_l = 0, \pm1}$$

The rule on $l$ has a simple meaning: the photon carries away one unit of angular momentum. A striking consequence: an electron in $2s$ cannot fall to $1s$ by emitting a photon ($\Delta l = 0$), so the $2s$ state is unusually long-lived (metastable).

# Reference: Quantum theory of the hydrogen atom

Beiser 6.1 to 6.9 section by section, with the slides (`QM.tex:444` to `:533`) mapped in, then short notes on the slides that go beyond hydrogen (`QM.tex:534` to `:579`). Your professor wants understanding rather than derivations for this chapter: the steps are written out so each result makes sense, not because you must reproduce them. Beiser's in-chapter examples are summarised with their answers; full worked versions are in *HW practice: Beiser chapters 4 to 6*.

## 6.1 Schrödinger's equation for the hydrogen atom

**Why a full treatment.** Bohr's model got hydrogen's energy levels right by postulating circular orbits and L = nħ. It could not explain multi-electron atoms, line intensities, or why the postulates hold. Schrödinger's equation gives all of it with no extra assumptions, and its results differ from Bohr's in important ways (angular momentum, no orbits).

**Setup.** A proton of charge +e and an electron of charge −e. The proton is 1836 times heavier, so take it as fixed and let the electron move; the small correction is made by using the reduced mass m′ in place of m (4.7). The 3-D steady-state equation (5.33) is

$$
\frac{\partial^2\psi}{\partial x^2} + \frac{\partial^2\psi}{\partial y^2} + \frac{\partial^2\psi}{\partial z^2} + \frac{2m}{\hbar^2}(E - U)\psi = 0 \tag{6.1}
$$

with the Coulomb potential energy

$$
U = -\frac{e^2}{4\pi\varepsilon_0 r} \tag{6.2}
$$

**Why spherical coordinates.** U depends on r alone, not on x, y, z separately. Writing $r = \sqrt{x^2 + y^2 + z^2}$ into (6.1) gives a mess; instead rewrite the equation in spherical polar coordinates (Fig. 6.1):

$$
x = r\sin\theta\cos\phi, \qquad y = r\sin\theta\sin\phi, \qquad z = r\cos\theta
$$

- r: length of the radius vector from the nucleus to the electron.
- θ (zenith or polar angle): angle between the radius vector and the +z axis, 0 to π.
- φ (azimuth): angle between the projection of the radius vector on the xy plane and the +x axis, 0 to 2π.

In these coordinates (Beiser 6.3, 6.4; slides `QM.tex:444`):

$$
\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial\psi}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial\psi}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2\psi}{\partial\phi^2} + \frac{2m}{\hbar^2}\left(E + \frac{e^2}{4\pi\varepsilon_0r}\right)\psi = 0
$$

Multiplying by r² sin²θ gives Beiser's form (6.4), ready for separation. You don't need to derive the spherical Laplacian.

**Why three quantum numbers.** As in the 3-D box (5.8), a problem in three dimensions has three boundary conditions, one per coordinate, and each one produces a quantum number. In hydrogen they are n, l and mₗ.

## 6.2 Separation of variables

**The idea (slides `QM.tex:461`).** Look for a solution that is a product of three one-variable functions:

$$
\psi(r, \theta, \phi) = R(r)\,\Theta(\theta)\,\Phi(\phi) \tag{6.5}
$$

R says how ψ changes along a radius at fixed θ, φ; Θ how it changes with zenith angle along a meridian; Φ how it changes with azimuth along a parallel of latitude.

**The steps.**

1. Since $\partial\psi/\partial r = \Theta\Phi\,dR/dr$, $\partial\psi/\partial\theta = R\Phi\,d\Theta/d\theta$ and $\partial^2\psi/\partial\phi^2 = R\Theta\,d^2\Phi/d\phi^2$, the partial derivatives become ordinary ones. Substitute into (6.4) and divide by RΘΦ (6.6).
2. The φ term, $(1/\Phi)\,d^2\Phi/d\phi^2$, is a function of φ only, while everything else depends only on r and θ. Move it to one side (6.7). A function of φ can equal a function of r and θ for all values only if both are the same constant. Call it $-m_l^2$ (6.8).
3. Substitute $m_l^2$, divide by sin²θ and regroup: now one side depends only on r, the other only on θ (6.9). Again both must equal a constant. Call it $l(l+1)$ (6.10, 6.11).

**The three equations** (Beiser 6.12 to 6.14):

$$
\frac{d^2\Phi}{d\phi^2} + m_l^2\Phi = 0 \qquad \text{(equation for Φ)}
$$

$$
\frac{1}{\sin\theta}\frac{d}{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right) + \left[l(l+1) - \frac{m_l^2}{\sin^2\theta}\right]\Theta = 0 \qquad \text{(equation for Θ)}
$$

$$
\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right) + \left[\frac{2m}{\hbar^2}\left(E + \frac{e^2}{4\pi\varepsilon_0r}\right) - \frac{l(l+1)}{r^2}\right]R = 0 \qquad \text{(equation for R)}
$$

Each is an ordinary differential equation in one variable. The fact that the split works at all shows the product assumption (6.5) is valid.

## 6.3 Quantum numbers

**Φ: the magnetic quantum number.** The Φ equation is solved by

$$
\Phi(\phi) = Ae^{im_l\phi} \tag{6.15}
$$

φ and φ + 2π are the same meridian, so ψ must be single-valued: $\Phi(\phi) = \Phi(\phi + 2\pi)$, that is $e^{im_l\phi} = e^{im_l(\phi + 2\pi)}$, so $e^{2\pi im_l} = 1$. Since $e^{2\pi im_l} = \cos 2\pi m_l + i\sin 2\pi m_l$, this holds only when mₗ = 0 or a positive or negative whole number. mₗ is the **magnetic quantum number**.

**Θ: the orbital quantum number.** The Θ equation has finite solutions at θ = 0 and π only when l is a whole number with $l \ge \lvert m_l\rvert$. Equivalently, mₗ can only be 0, ±1, …, ±l. l is the **orbital quantum number**.

**R: the principal quantum number.** The R equation has solutions that vanish as r → ∞ (needed for normalisation, so a bound electron) only for

$$
E_n = -\frac{me^4}{32\pi^2\varepsilon_0^2\hbar^2}\left(\frac{1}{n^2}\right) = \frac{E_1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}, \qquad n = 1, 2, 3, \dots \tag{6.16}
$$

exactly Bohr's levels (4.15). The equation also requires $n \ge l + 1$. n is the **principal quantum number**. (Positive energies, unbound electrons, are not quantised, as in Bohr's theory.)

**Summary of the three** (slides `QM.tex:468`):

$$
n = 1, 2, 3, \dots; \qquad l = 0, 1, 2, \dots, (n - 1); \qquad m_l = 0, \pm1, \pm2, \dots, \pm l \tag{6.17}
$$

**Counting states.** For each l there are 2l + 1 values of mₗ, so for each n there are $\sum_{l=0}^{n-1}(2l + 1) = n^2$ states, all with the same energy (degenerate). n = 1: 1 state; n = 2: 4; n = 3: 9 (doubled when spin is counted, ch 7).

**The wave function.** With the three quantum numbers,

$$
\psi = R_{nl}\,\Theta_{lm_l}\,\Phi_{m_l} \tag{6.18}
$$

R depends on n and l, Θ on l and mₗ, Φ on mₗ.

**Table 6.1 (part): normalised hydrogen wave functions** (a₀ = 4πε₀ħ²/me² = 5.29 × 10⁻¹¹ m)

| n | l | mₗ | Φ(φ) | Θ(θ) | R(r) |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | $1/\sqrt{2\pi}$ | $1/\sqrt2$ | $\dfrac{2}{a_0^{3/2}}e^{-r/a_0}$ |
| 2 | 0 | 0 | $1/\sqrt{2\pi}$ | $1/\sqrt2$ | $\dfrac{1}{2\sqrt2\,a_0^{3/2}}\left(2 - \dfrac r{a_0}\right)e^{-r/2a_0}$ |
| 2 | 1 | 0 | $1/\sqrt{2\pi}$ | $\dfrac{\sqrt6}{2}\cos\theta$ | $\dfrac{1}{2\sqrt6\,a_0^{3/2}}\dfrac r{a_0}e^{-r/2a_0}$ |
| 2 | 1 | ±1 | $\dfrac{1}{\sqrt{2\pi}}e^{\pm i\phi}$ | $\dfrac{\sqrt3}{2}\sin\theta$ | $\dfrac{1}{2\sqrt6\,a_0^{3/2}}\dfrac r{a_0}e^{-r/2a_0}$ |

(Beiser's table continues to n = 3. R has n − l − 1 radial nodes: 2s has one, at r = 2a₀.)

**Example 6.1 (Beiser): check R₁₀ against the R equation.** With $R = (2/a_0^{3/2})e^{-r/a_0}$, $dR/dr = -(2/a_0^{5/2})e^{-r/a_0}$ and $\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right) = \frac{2}{a_0^{5/2}}\left(\frac{1}{a_0} - \frac2r\right)e^{-r/a_0}$. Substitute with l = 0 and E = E₁: the equation splits into a constant part and a 1/r part, each of which must vanish separately. The 1/r part gives $a_0 = 4\pi\varepsilon_0\hbar^2/me^2$ (Bohr's radius) and the constant part gives $E_1 = -\hbar^2/2ma_0^2 = -me^4/32\pi^2\varepsilon_0^2\hbar^2$, agreeing with (6.16).

## 6.4 Principal quantum number

**Where it comes from.** Quantisation of energy comes from the R equation, and so from the boundary condition on the electron's radial motion: a bound electron's R must vanish far away. The same thing happens to a particle trapped in a box.

**Meaning.** The negative energy shows the electron is bound: it needs at least |Eₙ| to be freed. E depends on n alone (the degeneracy above is special to the 1/r potential). Planetary motion is also quantised, but n is so large (about 10⁷⁴ for the Earth) that the levels form a continuum.

## 6.5 Orbital quantum number

**The puzzle.** The R equation is about radial motion (toward or away from the nucleus), yet it contains the total energy E, which includes the kinetic energy of motion *around* the nucleus.

**The resolution.** Split the kinetic energy: $E = KE_\text{radial} + KE_\text{orbital} - e^2/4\pi\varepsilon_0r$. Put this into the R equation:

$$
\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right) + \frac{2m}{\hbar^2}\left[KE_\text{radial} + KE_\text{orbital} - \frac{\hbar^2l(l+1)}{2mr^2}\right]R = 0 \tag{6.19}
$$

For this to be an equation in the radial motion alone, the last two terms in the bracket must cancel:

$$
KE_\text{orbital} = \frac{\hbar^2l(l+1)}{2mr^2} \tag{6.20}
$$

Classically $KE_\text{orbital} = \tfrac12mv_\text{orbital}^2$ and $L = mv_\text{orbital}r$, so $KE_\text{orbital} = L^2/2mr^2$. Comparing,

$$
L = \sqrt{l(l+1)}\,\hbar, \qquad l = 0, 1, 2, \dots, (n - 1) \tag{6.21}
$$

Angular momentum, like energy, is conserved and quantised, with natural unit ħ = h/2π = 1.054 × 10⁻³⁴ J·s. (Slides `QM.tex:499`: $\hat L^2Y = \hbar^2l(l+1)Y$, the eigenvalue form.)

**Not Bohr's L = nħ.** The lowest state has l = 0, so L = 0, which no circular orbit allows. For any n, L is less than nħ.

**Too small to notice for big objects.** For l = 2, $L = \sqrt6\,\hbar = 2.6 \times 10^{-34}$ J·s; the Earth's orbital angular momentum is 2.7 × 10⁴⁰ J·s.

**Letters for l.** From the old names of spectral series (sharp, principal, diffuse, fundamental), then alphabetical:

| l | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Letter | s | p | d | f | g | h | i |

A state is named by n then the letter: n = 2, l = 0 is 2s; n = 4, l = 2 is 4d.

**Table 6.2: atomic electron states**

| | l = 0 | l = 1 | l = 2 | l = 3 | l = 4 | l = 5 |
| --- | --- | --- | --- | --- | --- | --- |
| n = 1 | 1s | | | | | |
| n = 2 | 2s | 2p | | | | |
| n = 3 | 3s | 3p | 3d | | | |
| n = 4 | 4s | 4p | 4d | 4f | | |
| n = 5 | 5s | 5p | 5d | 5f | 5g | |
| n = 6 | 6s | 6p | 6d | 6f | 6g | 6h |

## 6.6 Magnetic quantum number

**Direction is quantised too.** l fixes the magnitude of **L**; mₗ fixes its direction. An orbiting electron is a current loop with a magnetic moment, so its energy in a magnetic field **B** depends on the angle between **L** and **B**, which is where the name comes from. Take B along z. Then

$$
L_z = m_l\hbar, \qquad m_l = 0, \pm1, \pm2, \dots, \pm l \tag{6.22}
$$

so **L** can have only 2l + 1 orientations: **space quantisation** (Fig. 6.4). For l = 2, $L = \sqrt6\,\hbar$ and $L_z$ = 2ħ, ħ, 0, −ħ, −2ħ, five orientations at angles given by $\cos\theta = m_l/\sqrt{l(l+1)}$.

- **L** can never point exactly along B, because the largest Lz, lħ, is less than $\sqrt{l(l+1)}\,\hbar$.
- With no field the z axis is arbitrary: the component of **L** along *any* chosen direction is mₗħ. A field (or something like the axis of an H₂ molecule) just makes one direction experimentally meaningful.

**Why only one component (uncertainty).** If **L** had a fixed direction, all of Lx, Ly, Lz would be definite and the electron would stay in one plane. For example, **L** along z means the electron is always in the xy plane, so its z coordinate is exactly known (Δz = 0), and then Δpz would have to be infinite, impossible for a bound electron. In reality only L and Lz are definite and L > |Lz|, so the electron is not confined to a plane (Fig. 6.5).

**Precession.** **L** lies somewhere on a cone about the z axis with fixed projection mₗħ; you can picture it as precessing (Fig. 6.6). So ⟨Lx⟩ = ⟨Ly⟩ = 0 while Lz = mₗħ exactly.

**Slides (`QM.tex:499`).** $\hat L_zY = m\hbar Y$, with L² and Lz simultaneously definite; the vector-model figure shows the cones.

## 6.7 Electron probability density

**Two changes to Bohr's picture.** Bohr has the electron always at r = n²a₀ in the equatorial plane (θ = 90°), going round in φ. Quantum mechanics says: (1) no definite r, θ or φ can be given, only probabilities, a consequence of the electron's wave nature; (2) the electron does not move around the nucleus in any conventional sense, since |ψ|² is independent of time.

**The density.**

$$
|\psi|^2 = |R|^2|\Theta|^2|\Phi|^2 \tag{6.23}
$$

- **Φ part.** $|\Phi|^2 = \Phi^*\Phi = A^2e^{-im_l\phi}e^{im_l\phi} = A^2$, a constant. The density is the same at every azimuth: **symmetric about the z axis** in every state.
- **R part (Fig. 6.10).** R is largest at r = 0 for s states, and zero at the nucleus for l > 0.
- **Θ part.** For s states (l = mₗ = 0), |Θ|² = ½, a constant, so with |Φ|² constant the density is **spherically symmetric**. Other states have angular lobes (Fig. 6.12), which matter in chemistry because they decide how neighbouring atoms bond. Since |ψ|² doesn't depend on φ, rotating a 2-D section about the z axis gives the 3-D picture.

**Probability at a distance r.** The volume element in spherical coordinates (Fig. 6.9) is

$$
dV = r^2\sin\theta\,dr\,d\theta\,d\phi \tag{6.24}
$$

Θ and Φ are normalised, so integrating over all angles leaves the probability of finding the electron between r and r + dr:

$$
P(r)\,dr = r^2|R|^2\,dr \tag{6.25}
$$

The r² is the area factor of a thin spherical shell (4πr² dr, with the 4π absorbed by the normalised angular parts). P(r) is plotted in Fig. 6.11; slides `QM.tex:480`.

- **1s.** $P(r) \propto r^2e^{-2r/a_0}$. Setting dP/dr = 0: $2r - 2r^2/a_0 = 0$, so the **most probable r is a₀**, the Bohr radius. But the electron can be found anywhere from 0 to ∞, and **⟨r⟩ = 1.5a₀**.
- **Why the energy still matches Bohr.** The energy depends on ⟨1/r⟩, not ⟨r⟩, and ⟨1/r⟩ = 1/a₀ exactly.
- **Each level's most probable r grows with n**, in line with Bohr's r = n²a₀ for the states of largest l.
- Radial nodes: n − l − 1 of them (2s has one; 2p none).

**Example 6.2 (Beiser): ⟨1/r⟩ for 1s.** With $\psi = e^{-r/a_0}/\sqrt{\pi a_0^3}$ and dV from (6.24),

$$
\left\langle\frac1r\right\rangle = \frac{1}{\pi a_0^3}\int_0^\infty re^{-2r/a_0}dr\int_0^\pi\sin\theta\,d\theta\int_0^{2\pi}d\phi = \frac{1}{\pi a_0^3}\cdot\frac{a_0^2}{4}\cdot2\cdot2\pi = \frac1{a_0}
$$

**Example 6.3 (Beiser): a₀ against a₀/2.** $\dfrac{P_1}{P_2} = \dfrac{r_1^2e^{-2r_1/a_0}}{r_2^2e^{-2r_2/a_0}} = \dfrac{a_0^2e^{-2}}{(a_0/2)^2e^{-1}} = 4e^{-1} = 1.47$. The 1s electron is 47% more likely at a₀ than at a₀/2.

**Where Bohr survives (slides `QM.tex:491`).** The 2p state with mₗ = ±1 looks like a doughnut in the equatorial plane, with its most probable distance **4a₀**, exactly Bohr's n = 2 radius. Likewise 3d with mₗ = ±2, 4f with mₗ = ±3, and so on: the states with the largest l for their n and **L** as close to the z axis as possible, so the density hugs the equatorial plane. Bohr's model gives the most probable location in one of the several states of each level.

## 6.8 Radiative transitions

**What Bohr had to postulate.** A drop from Em to En gives a photon of frequency $\nu = (E_m - E_n)/h$. Quantum mechanics produces this. For simplicity take motion in x only.

**One stationary state doesn't radiate.** From 5.7, $\Psi_n = \psi_ne^{-(iE_n/\hbar)t}$ and $\Psi_n^* = \psi_n^*e^{+(iE_n/\hbar)t}$ (6.26). The expectation value of position is

$$
\langle x\rangle = \int_{-\infty}^{\infty}x\Psi_n^*\Psi_n\,dx = \int_{-\infty}^{\infty}x\psi_n^*\psi_n\,dx \tag{6.27}
$$

independent of time: the charge distribution stays still, so it does not radiate. (Bohr's orbiting electron should have radiated; this is the real explanation of why it doesn't.)

**A mixture does.** During a transition the electron is in a superposition (slides `QM.tex:523`):

$$
\Psi = a\Psi_n + b\Psi_m \tag{6.28}
$$

where a*a is the probability of state n and b*b of state m, with a*a + b*b = 1. Initially a = 0, b = 1; finally a = 1, b = 0. In between,

$$
\langle x\rangle = \int x(a^*\Psi_n^* + b^*\Psi_m^*)(a\Psi_n + b\Psi_m)\,dx = a^2\int x\psi_n^*\psi_n\,dx + b^2\int x\psi_m^*\psi_m\,dx + (\text{cross terms}) \tag{6.29, 6.30}
$$

The first and last terms are constant. The cross terms carry the time dependence:

$$
b^*a\int x\psi_m^*\psi_n\,e^{(i/\hbar)(E_m - E_n)t}dx + a^*b\int x\psi_n^*\psi_m\,e^{-(i/\hbar)(E_m - E_n)t}dx
$$

Using $e^{\pm i\theta} = \cos\theta \pm i\sin\theta$ with $\theta = (E_m - E_n)t/\hbar$, these become a real combination of $\cos\left(\frac{E_m - E_n}{\hbar}t\right)$ and $\sin\left(\frac{E_m - E_n}{\hbar}t\right)$ (6.31). Since $\cos\left(\frac{E_m - E_n}{\hbar}t\right) = \cos 2\pi\nu t$ (6.32),

$$
\nu = \frac{E_m - E_n}{h} \tag{6.33}
$$

The electron's position oscillates at exactly this frequency, and an oscillating charge radiates at its own frequency: the result Bohr had to assume, with no special assumption. It is the interference term of 5.4 again.

**Quantum electrodynamics (box).** The argument above mixes classical and quantum ideas. QED shows the radiation is a single photon, and explains *why* an excited atom decays "spontaneously": electric and magnetic fields fluctuate constantly even in empty space (vacuum fluctuations, analogous to an oscillator's zero-point motion), and these trigger emission. The fluctuations can be pictured as short-lived virtual photons allowed by ΔEΔt ≥ ħ/2. They cause the **Casimir effect** (1948): two parallel metal plates in vacuum are pushed together, because only certain wavelengths fit between them while all fit outside. The energy available is tiny, about 0.5 nJ per square metre of plate.

## 6.9 Selection rules

**When is a transition allowed?** It needs ⟨x⟩ (in 3-D, ⟨u⟩ with u = x, y, z) to oscillate, which needs the cross integral to be nonzero:

$$
\int_{-\infty}^{\infty}x\psi_n^*\psi_m\,dx \ne 0 \tag{6.34}
$$

$$
\text{Allowed transitions:}\quad \int u\,\psi_{n,l,m_l}^*\psi_{n',l',m_l'}\,dV \ne 0 \tag{6.35}
$$

If the integral is 0 for every u, the transition is **forbidden** (really just very unlikely). Working the integrals out for hydrogen's wave functions gives

$$
\Delta l = \pm1 \tag{6.36}
$$

$$
\Delta m_l = 0, \pm1 \tag{6.37}
$$

and **no restriction on Δn** (slides `QM.tex:523`: the dipole integral ⟨Ψn|x|Ψm⟩ decides).

- **Fig. 6.13**: the allowed transitions only join neighbouring columns (s ↔ p, p ↔ d, d ↔ f).
- **Meaning of Δl = ±1.** The photon carries away angular momentum ħ, the difference between the atom's initial and final angular momenta. Classically, a circularly polarised em wave carries angular momentum too, so this isn't purely a quantum idea.
- **2s is metastable.** 2s → 1s would need Δl = 0, so it is forbidden. A 2s atom in isolation lives a long time (it decays by a much slower two-photon process, or loses its energy in a collision).
- **Line intensities.** How likely each allowed transition is (the size of the integral) sets how bright its spectral line is, which Bohr's theory couldn't predict.

## 6.10 Zeeman effect (excluded by your professor, on the slides)

Your professor's list stops at 6.9, but the slides have a frame on it (`QM.tex:511`), so here is the short version.

- A circulating electron with angular momentum **L** has magnetic moment $\boldsymbol\mu = -(e/2m)\mathbf L$. In a field B along z, its energy is $U_m = -\mu_zB = m_l\left(\dfrac{e\hbar}{2m}\right)B = m_l\mu_BB$.
- **Bohr magneton:** $\mu_B = e\hbar/2m = 9.274 \times 10^{-24}$ J/T $= 5.788 \times 10^{-5}$ eV/T.
- So a field splits each level of given l into 2l + 1 sublevels spaced μ\_B B apart. With Δmₗ = 0, ±1, each line splits into three (the **normal Zeeman effect**), separated in frequency by $\Delta\nu = \pm eB/4\pi m$.
- Most lines actually show the more complicated *anomalous* Zeeman effect, which needs electron spin (Beiser ch 7).

## Beyond hydrogen: the slides' last frames

These frames (`QM.tex:534` to `:579`) go past Beiser ch 6 into ch 7 and 8 material. They aren't on your professor's chapter list, so know the ideas, not details.

- **Multi-electron atoms (`QM.tex:534`).** The Schrödinger equation can no longer be solved exactly because of electron–electron repulsion; it is solved numerically or approximately, each electron moving in the average field of the others.
- **Exchange symmetry.** Identical particles can't be told apart, so |ψ|² must be unchanged when two are swapped. The wave function itself is either symmetric (+) or antisymmetric (−) under the swap. Electrons are antisymmetric (fermions).
- **Spin.** The electron has an intrinsic angular momentum with quantum number s = ½ and $m_s = \pm\tfrac12$, so each state is fixed by four quantum numbers n, l, mₗ, mₛ.
- **Pauli exclusion principle.** No two electrons in an atom can have the same set of four quantum numbers (it follows from antisymmetry: swapping two identical states would give ψ = −ψ = 0).
- **Periodic table (`QM.tex:552`).** Fill states in order of energy, two electrons (mₛ = ±½) per orbital: shells (n) hold 2n² electrons and subshells (l) hold 2(2l + 1). Elements with the same outer configuration behave alike chemically.
- **Spin–orbit coupling (`QM.tex:561`).** The electron's spin magnetic moment interacts with the magnetic field it sees from its orbital motion, splitting levels of l > 0 into two (fine structure; for example the sodium D lines).
- **Energy ordering (`QM.tex:571`).** In many-electron atoms, inner electrons screen the nucleus, and the screening is weaker for low-l electrons that penetrate close to the nucleus. So states of the same n split by l, and the filling order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, … (4s before 3d).
- **Covalent bond (`QM.tex:579`).** In H₂ the electrons' wave functions from the two atoms overlap. The symmetric spatial combination (spins opposite) piles up charge between the nuclei, attracting both and lowering the energy: a bound molecule. The antisymmetric one doesn't bond.

## What to be able to do without notes

- Explain why spherical coordinates are used and why three quantum numbers appear.
- Describe the separation ψ = RΘΦ in words: which constant appears where (mₗ², l(l + 1), E).
- Derive "mₗ is an integer" from single-valuedness of Φ, and state the ranges of n, l, mₗ; count n² states per level.
- Explain L = √(l(l + 1))ħ from splitting the kinetic energy, and contrast with Bohr's L = nħ; name states (3d, 4f).
- Explain space quantisation, Lz = mₗħ, why **L** can't lie along z (uncertainty), and the cone/precession picture.
- Use P(r) = r²|R|² to find the most probable radius for 1s (a₀), compare probabilities at two radii, and say why 2p (mₗ = ±1) peaks at 4a₀.
- Show why a stationary state doesn't radiate and a superposition radiates at (Em − En)/h.
- State the selection rules Δl = ±1, Δmₗ = 0, ±1, explain them via the photon's angular momentum, and say why 2s is metastable.

# Coverage: Quantum theory of the hydrogen atom

Every section and example of Beiser 6.1 to 6.9, and every slide frame from the hydrogen atom to the end of the deck (`QM.tex:444` to `:579`). "HW practice" means *HW practice: Beiser chapters 4 to 6*.

## Beiser ch 6

| Beiser | Topic | Where on the site |
| --- | --- | --- |
| 6.1 | Schrödinger's equation in spherical coordinates | Reference 6.1 |
| 6.2 | Separation of variables | Reference 6.2 (the three equations) |
| 6.3 | Quantum numbers, Table 6.1 | Reference 6.3 |
| Ex 6.1 | Check R₁₀ against the radial equation | Reference 6.3; HW practice |
| 6.4 | Principal quantum number | Reference 6.4 |
| 6.5 | Orbital quantum number, L = √(l(l + 1))ħ, Table 6.2 | Reference 6.5 |
| 6.6 | Magnetic quantum number, space quantisation | Reference 6.6 |
| 6.7 | Electron probability density | Reference 6.7 |
| Ex 6.2, 6.3 | ⟨1/r⟩ for 1s; P(a₀)/P(a₀/2) | Reference 6.7; HW practice |
| 6.8 | Radiative transitions, QED box | Reference 6.8 |
| 6.9 | Selection rules | Reference 6.9 |
| 6.10 | Zeeman effect | Excluded by your professor; short version in Reference 6.10 because the slides have it |
| Ex 6.4 | Zeeman components of a 450 nm line in 0.300 T | HW practice (excluded topic) |

## Slides

| Frame (`QM.tex`) | Where on the site |
| --- | --- |
| `:444` H atom equation, `:461` separation | Reference 6.1, 6.2 |
| `:468` quantum numbers | Reference 6.3 |
| `:480`, `:491` radial and orbital figures | Reference 6.7; Learn "Probability density" figure |
| `:499` orbital quantum numbers, L² and Lz | Reference 6.5, 6.6 |
| `:511` Zeeman | Reference 6.10 |
| `:523` transitions | Reference 6.8, 6.9 |
| `:534` multi-electron atoms, spin, exclusion | Reference "Beyond hydrogen" |
| `:552` periodic table, `:561` spin–orbit, `:571` level ordering, `:579` covalent bond | Reference "Beyond hydrogen" (ideas only; Beiser ch 7 and 8) |

# Formulas: Quantum theory of the hydrogen atom

## Setup

$$U(r) = -\frac{e^2}{4\pi\varepsilon_0r}\ \text{(spherically symmetric)},\qquad -\frac{\hbar^2}{2m}\nabla^2\psi + U(r)\psi = E\psi$$

Use spherical polar coordinates $(r, \theta, \phi)$ and separate:

$${\psi(r, \theta, \phi) = R(r)\,\Theta(\theta)\,\Phi(\phi)}$$

| Equation | Condition | Quantum number |
|---|---|---|
| $\Phi(\phi)$ | single-valued, $\Phi = e^{im_l\phi}$ | $m_l$ (integer) |
| $\Theta(\theta)$ | finite at $\theta = 0, \pi$ | $l \ge \lvert m_l\rvert$ |
| $R(r)$ | $\to 0$ as $r \to \infty$ (bound) | $n > l$ |

## Quantum numbers

| Name | Symbol | Allowed values | Fixes |
|---|---|---|---|
| principal | $n$ | $1, 2, 3, \dots$ | energy |
| orbital | $l$ | $0, 1, \dots, n - 1$ | size of $L$ |
| magnetic | $m_l$ | $-l, \dots, +l$ | $L_z$ |

For each $l$ there are $2l + 1$ values of $m_l$, so each $n$ has $\sum_{l=0}^{n-1}(2l + 1) = n^2$ states ($2n^2$ with spin). Letters: $l = 0, 1, 2, 3, 4 \to$ s, p, d, f, g.

## Energy and angular momentum

$${E_n = -\frac{me^4}{32\pi^2\varepsilon_0^2\hbar^2}\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}}$$

Energy depends only on $n$, so states with the same $n$ are degenerate (special to the $1/r$ potential).

$${L = \sqrt{l(l + 1)}\,\hbar,\qquad L_z = m_l\hbar,\qquad \cos\theta = \frac{m_l}{\sqrt{l(l + 1)}}}$$

For $l = 2$: $L = \sqrt6\hbar$ and $L_z = -2\hbar, \dots, +2\hbar$ (5 orientations). Since $|m_l| \le l < \sqrt{l(l + 1)}$, $L$ can never point exactly along $z$. For $s$ states $L = 0$.

## Probability density

$$|\Phi|^2 = \text{constant},\qquad P(r)\,dr = r^2|R(r)|^2dr,\qquad \text{radial nodes} = n - l - 1$$

1s: $R \propto e^{-r/a_0}$, so $P(r) \propto r^2e^{-2r/a_0}$ and the most probable radius is $a_0 = 0.0529$ nm. For $l = n - 1$ the most probable radius is $n^2a_0$.

## Transitions

$$h\nu = E_i - E_f,\qquad \nu = \frac{E_i - E_f}{h}\ \text{(frequency at which } |\Psi|^2 \text{ oscillates)}$$

$${\Delta l = \pm1,\qquad \Delta m_l = 0, \pm1,\qquad \Delta n\ \text{any}}$$

A photon carries one unit of angular momentum. 2p $\to$ 1s and 3d $\to$ 2p are allowed. 2s $\to$ 1s ($\Delta l = 0$) and 3d $\to$ 1s ($\Delta l = 2$) are forbidden; 2s is metastable (about 0.1 s instead of $10^{-8}$ s).

# Practice: Quantum theory of the hydrogen atom

28 questions with worked answers (tap a solution to open it). These are mostly "explain" questions, since the professor wants understanding rather than derivations. Points are in brackets.

## A. State and explain

### Problem 1 [QM 5 · Recall · 2 pts]

Why are spherical polar coordinates used for the hydrogen atom?

*Solution.* **Reason.** The Coulomb potential $U = -e^2/4\pi\varepsilon_0r$ depends **only on $r$**, so the system has spherical symmetry.

In spherical polar coordinates $(r,\theta,\varphi)$ the Schrödinger equation **separates** into three ordinary differential equations, one for each variable:

$$\psi(r,\theta,\varphi) = R(r)\,\Theta(\theta)\,\Phi(\varphi)$$

The boundary conditions (periodicity in $\varphi$, regularity at the poles, decay as $r\to\infty$) are also simple in these coordinates.

### Problem 2 [QM 5 · Recall · 3 pts]

Explain how the three quantum numbers arise from separating the Schrödinger equation. Which condition gives each one?

*Solution.* **Separation.** Writing $\psi = R(r)\Theta(\theta)\Phi(\varphi)$ splits the equation into three. Each boundary condition produces one quantum number.

| equation | condition | quantum number |
|---|---|---|
| $\Phi(\varphi)$ | single-valued: $\Phi(\varphi + 2\pi) = \Phi(\varphi)$ | $m_l = 0,\pm1,\pm2,\dots$ |
| $\Theta(\theta)$ | finite at the poles $\theta = 0,\pi$ | $l = 0,1,2,\dots$ with $l \ge \lvert m_l\rvert$ |
| $R(r)$ | $R\to0$ as $r\to\infty$ (bound state) | $n = 1,2,\dots$ with $n > l$, and the energies $E_n$ |

### Problem 3 [QM 5 · Recall · 3 pts]

Name the quantum numbers n, l and mₗ, give their allowed values, and say what physical quantity each fixes.

*Solution.* | number | allowed values | fixes |
|---|---|---|
| **$n$** (principal) | $1, 2, 3, \dots$ | the **energy**, $E_n = -13.6/n^2$ eV |
| **$l$** (orbital) | $0, 1, \dots, n-1$ | the **magnitude** of angular momentum, $L = \sqrt{l(l+1)}\,\hbar$ |
| **$m_l$** (magnetic) | $-l, \dots, +l$ | the **$z$-component**, $L_z = m_l\hbar$ |

For each $n$ there are $n^2$ states (without spin).

### Problem 4 [QM 5 · Recall · 2 pts]

How does the quantum-mechanical energy of hydrogen compare with Bohr's? What is new?

*Solution.* **Same energies.** The quantum-mechanical result is exactly Bohr's:

$$E_n = -\frac{13.6\ \text{eV}}{n^2}$$

**What is new.**

- It comes from the **wave equation**, with no assumed orbits.
- Two more quantum numbers, $l$ and $m_l$, with the **degeneracy** $n^2$.
- **Probability distributions** instead of orbits.
- A correct angular momentum, $\sqrt{l(l+1)}\hbar$, and selection rules for transitions.

### Problem 5 [QM 5 · Recall · 2 pts]

Compare the angular momentum of hydrogen in Bohr's model and in quantum mechanics. What is surprising about s states?

*Solution.* | | **Bohr** | **Quantum mechanics** |
|---|---|---|
| magnitude | $L = n\hbar$ | $L = \sqrt{l(l+1)}\,\hbar$ |
| depends on | $n$ | $l$ (with $l\le n-1$) |
| minimum | $\hbar$ (never zero) | $0$ |

**Surprise.** For an **s state** ($l = 0$), $L = 0$: the electron has **no orbital angular momentum**, which is impossible for any classical orbit. The 1s state is a spherical cloud, not a circulating electron.

### Problem 6 [QM 5 · Recall · 3 pts]

What is space quantisation? Why can L never point exactly along the z-axis?

*Solution.* **Space quantisation.** The angular momentum vector can take only orientations for which

$$L_z = m_l\hbar,\qquad m_l = -l,\dots,+l$$

**Why $\mathbf L$ can never point along $z$.** The largest $|L_z|$ is $l\hbar$, but $|\mathbf L| = \sqrt{l(l+1)}\hbar > l\hbar$. So $L_z < L$ always.

**Uncertainty reason.** If $\mathbf L$ pointed along $z$, then $L_x = L_y = 0$ and $L_z = L$ would all be exactly known together, which the uncertainty principle forbids. Only $L_z$ and $|L|$ are definite; $L_x$ and $L_y$ are uncertain.

### Problem 7 [QM 5 · Recall · 2 pts]

In what sense does the electron in hydrogen have no orbit? Where does Bohr's radius reappear?

*Solution.* **No orbit.** The electron has no definite path. It has only a **probability density** $|\psi|^2$ and can be found at any $r$ (with different probabilities). The ground state is a spherical cloud.

**Bohr's radius reappears.** For the 1s state the radial probability is $P(r)\propto r^2e^{-2r/a_0}$, which peaks at

$$r = a_0 = 0.053\ \text{nm}$$

so $a_0$ is the **most probable** distance (the average is $\tfrac32a_0$).

### Problem 8 [QM 5 · Recall · 3 pts]

Why doesn't an atom in a stationary state radiate? Why does it radiate during a transition?

*Solution.* **Stationary state.** $|\Psi|^2$ is constant in time (Chapter 11), so the charge distribution does not oscillate and **no radiation** is emitted.

**During a transition.** The atom is in a superposition $\Psi = a\Psi_i + b\Psi_f$. The cross term makes $|\Psi|^2$ oscillate at

$$\nu = \frac{E_i - E_f}h$$

The oscillating charge distribution acts as an oscillating **electric dipole**, which radiates at that frequency. This explains both the frequency of the emitted light and the selection rules.

### Problem 9 [QM 5 · Recall · 2 pts]

State the selection rules for allowed transitions. Why is Δl = ±1?

*Solution.* **Selection rules** (electric dipole transitions):

$$\Delta l = \pm1,\qquad \Delta m_l = 0,\ \pm1$$

**Why $\Delta l = \pm1$.** A photon carries one unit ($\hbar$) of angular momentum. Angular momentum is conserved, so the atom's $l$ must change by one unit to compensate.

**Examples.** $2p\to1s$ is allowed; $2s\to1s$ and $3d\to2s$ are forbidden.

### Problem 10 [QM 5 · Recall · 2 pts]

Why is the 2s state of hydrogen long-lived?

*Solution.* **Reason.** The only lower state is $1s$, and the transition $2s\to1s$ has $\Delta l = 0$, which the selection rule $\Delta l = \pm1$ **forbids** (single-photon).

With no allowed route down, the $2s$ state is **metastable**. It decays only through much slower processes (two-photon emission, collisions) and has a lifetime of about $0.1$ s, about $10^8$ times longer than a typical allowed transition ($\sim10^{-9}$ s).

## B. Show or work out

### Problem 11 [QM 5 · Derivation · 3 pts]

Show that there are n² states with principal quantum number n.

*Solution.* **Count.** For each $l = 0, 1, \dots, n-1$ there are $2l + 1$ values of $m_l$:

$$\sum_{l=0}^{n-1}(2l + 1) = 2\cdot\frac{n(n-1)}2 + n = \boxed{n^2}$$

(Including spin doubles this to $2n^2$, the capacity of each shell.)

### Problem 12 [QM 5 · Derivation · 3 pts]

List all (n, l, mₗ) states for n = 3 and write their spectroscopic names.

*Solution.* **For $n = 3$:** $l = 0, 1, 2$.

| $l$ | name | $m_l$ values | states |
|---|---|---|---|
| 0 | $3s$ | $0$ | 1 |
| 1 | $3p$ | $-1, 0, 1$ | 3 |
| 2 | $3d$ | $-2, -1, 0, 1, 2$ | 5 |

Total $= 9 = n^2$ ✓. In hydrogen they all have the same energy, $-1.51$ eV.

### Problem 13 [QM 5 · Derivation · 4 pts]

For l = 2, find L and the possible angles between L and the z-axis.

*Solution.* **Magnitude.** $L = \sqrt{l(l+1)}\,\hbar$:

$$L = \sqrt{6}\,\hbar \approx 2.45\hbar$$

**Z-component.** $L_z = m_l\hbar$ with $m_l = 0, \pm1, \pm2$. The angle satisfies

$$\cos\theta = \frac{m_l}{\sqrt6}$$

$$\theta \approx 35^\circ,\ 66^\circ,\ 90^\circ,\ 114^\circ,\ 145^\circ$$

**Check.** $L_z$ can never equal $L$: $L_z^\text{max} = 2\hbar < 2.45\hbar$, so $\mathbf L$ is never aligned with the $z$-axis.

### Problem 14 [QM 5 · Derivation · 4 pts]

For the 1s state, P(r) ∝ r²e^(−2r/a₀). Show that the most probable radius is a₀.

*Solution.* **Radial probability density** for 1s:

$$P(r) \propto r^2e^{-2r/a_0}$$

**Maximise.**

$$\frac{dP}{dr} \propto \left(2r - \frac{2r^2}{a_0}\right)e^{-2r/a_0} = 2r\left(1 - \frac r{a_0}\right)e^{-2r/a_0} = 0$$

$r = 0$ is a minimum ($P = 0$), so the maximum is at

$$\boxed{r = a_0}$$

**Note.** This is the most probable radius, **not** the average radius: $\langle r\rangle = \tfrac32a_0$, because of the long tail.

### Problem 15 [QM 5 · Derivation · 3 pts]

Which of these transitions are allowed: 3p → 1s, 3d → 2s, 4f → 3d, 2s → 1s, 3s → 2p?

*Solution.* **Selection rule.** $\Delta l = \pm1$ (and $\Delta m_l = 0, \pm1$): a photon carries one unit of angular momentum.

| transition | $\Delta l$ | allowed? |
|---|---|---|
| $3p \to 1s$ | $1 \to 0 = -1$ | yes |
| $3d \to 2s$ | $2 \to 0 = -2$ | **no** |
| $4f \to 3d$ | $3 \to 2 = -1$ | yes |
| $2s \to 1s$ | $0 \to 0 = 0$ | **no** |
| $3s \to 2p$ | $0 \to 1 = +1$ | yes |

**Note.** $2s \to 1s$ is single-photon forbidden, which is why the $2s$ state is metastable.

### Problem 16 [QM 5 · Derivation · 3 pts]

Explain, using a superposition Ψ = aΨᵢ + bΨ\_f, why the emitted frequency is (Eᵢ − E\_f)/h.

*Solution.* **Superposition.** $\Psi = a\Psi_i + b\Psi_f$ with $\Psi_k = \psi_ke^{-iE_kt/\hbar}$.

**Probability density.**

$$|\Psi|^2 = |a|^2|\psi_i|^2 + |b|^2|\psi_f|^2 + ab^*\psi_i\psi_f^*\,e^{-i(E_i - E_f)t/\hbar} + \text{c.c.}$$

The first two terms are constant in time. The **cross term** oscillates at angular frequency

$$\omega = \frac{E_i - E_f}\hbar$$

**Consequence.** The charge distribution (and so the electric dipole) oscillates at this frequency, and an oscillating dipole radiates at the same frequency:

$$\boxed{\nu = \frac{E_i - E_f}h}$$

A pure stationary state has a constant $|\Psi|^2$ and does not radiate.

### Problem 17 [QM 5 · Derivation · 3 pts]

Sketch the radial probability densities of 1s, 2s and 2p and mark their nodes.

*Solution.* **Radial density** $P(r) = r^2|R_{nl}(r)|^2$. The number of radial nodes is $n - l - 1$.

| state | radial nodes | shape of $P(r)$ |
|---|---|---|
| $1s$ | 0 | a single peak at $a_0$ |
| $2s$ | $2 - 0 - 1 = 1$ | small inner peak, a node at $2a_0$, then a larger outer peak near $5a_0$ |
| $2p$ | $2 - 1 - 1 = 0$ | a single peak at $4a_0$ |

**Observation.** $2s$ and $2p$ have the same energy, but $2s$ has some probability close to the nucleus (penetration), which is why in multi-electron atoms $2s$ is lower than $2p$.

## C. Short numericals

### Problem 18 [QM 5 · Numerical · 2 pts]

Find the energy of a 3d electron in hydrogen. Does it differ from a 3s electron? Why?

*Solution.* **Idea.** In hydrogen, $E_n = -13.6/n^2$ eV depends only on $n$.

$$E_3 = -\frac{13.6}{9} \approx \boxed{-1.51\ \text{eV}}$$

The 3s, 3p and 3d states all have this energy: they are degenerate. This is special to the $1/r$ potential. (In atoms with more electrons, $l$ also affects the energy.)

### Problem 19 [QM 5 · Numerical · 3 pts]

For a 1s electron, the probability of being found inside r = a₀ is 1 − 5e⁻². Evaluate it (e² ≈ 7.39) and comment.

*Solution.* **Idea.** The probability of being inside $a_0$ is $1 - 5e^{-2}$, so evaluate it.

$$5e^{-2} \approx \frac{5}{7.39} \approx 0.68\ \Rightarrow\ P \approx 1 - 0.68 = \boxed{0.32}$$

**Comment.** The electron is more likely to be found **outside** $a_0$ than inside it, even though $a_0$ is the single most probable radius. The radial distribution $P(r) \propto r^2e^{-2r/a_0}$ peaks at $a_0$ but has a long tail beyond it.

### Problem 20 [QM 5 · Numerical · 2 pts]

A hydrogen atom is in a 4f state. Which states can it decay to directly?

*Solution.* **Idea.** Selection rule $\Delta l = \pm1$ (a photon carries one unit of angular momentum), and the atom must go to a lower energy.

4f has $l = 3$, so the final state needs $l = 2$ or $4$. $l = 4$ does not exist for $n \le 4$, and 4d is at the same energy (no photon). So the only direct decay is

$$4f \to \boxed{3d}$$

## D. Discuss

### Problem 21 [QM 5 · Discussion · 3 pts]

Explain why the shapes of p orbitals matter for chemistry.

*Solution.* **Shape.** A $p$ orbital has two lobes along one axis ($p_x$, $p_y$, $p_z$) with a node at the nucleus: it is **directional**, unlike the spherical $s$ orbital.

**Why it matters in chemistry.** Bonds form where orbital lobes on neighbouring atoms **overlap**. So the lobe directions set the **directions of bonds** and therefore the shapes of molecules: the roughly $90^\circ$ H–O–H and H–N–H angles come from $p$ orbitals, and hybrid orbitals ($sp^3$ tetrahedral for methane) are mixtures of $s$ and $p$ lobes.

### Problem 22 [QM 5 · Discussion · 3 pts]

What does the hydrogen solution keep from the Bohr model and what does it discard?

*Solution.* **Kept from Bohr.**

- The energies $E_n = -13.6/n^2$ eV.
- The radius $a_0$, now as the **most probable** 1s radius.
- The idea of discrete states and transitions $h\nu = E_i - E_f$.

**Discarded.**

- **Definite orbits**, replaced by probability densities.
- $L = n\hbar$, replaced by $L = \sqrt{l(l+1)}\hbar$ (and $L = 0$ is allowed).

**Added.** The quantum numbers $l$ and $m_l$, degeneracy $n^2$, space quantisation, selection rules, and correct radial and angular shapes.


## D. More practice: counting states and transitions

### Problem 23 [QM 5 · Numerical · 3 pts]

List the orbital states of hydrogen with $n = 3$ and give the degeneracy, with and without spin.

*Solution.* For $n = 3$, $l = 0, 1, 2$ and $m_l = -l,\dots,+l$:

| $l$ | subshell | number of $m_l$ values |
|---|---|---|
| $0$ | $3s$ | $1$ |
| $1$ | $3p$ | $3$ |
| $2$ | $3d$ | $5$ |

$$\text{total} = 1 + 3 + 5 = n^2 = \boxed{9}\ \text{(orbital)},\qquad 2n^2 = \boxed{18}\ \text{(with spin)}$$

All $9$ share the energy $E_3 = -13.6/9 = -1.51$ eV, which is a special feature of the Coulomb potential (in most other potentials the energy also depends on $l$).

### Problem 24 [QM 5 · Numerical · 3 pts]

Find the wavelength of the photon emitted in the transition $n = 3\to n = 2$ in hydrogen. Which spectral series is it?

*Solution.* **Idea.** $\Delta E = 13.6\ \text{eV}\left(\dfrac1{n_f^2} - \dfrac1{n_i^2}\right)$ and $\lambda = hc/\Delta E$ with $hc = 1240$ eV nm.

$$\Delta E = 13.6\left(\frac14 - \frac19\right) = 13.6\times\frac5{36} = 1.89\ \text{eV}$$

$$\lambda = \frac{1240}{1.89} = \boxed{656\ \text{nm}}$$

**Series.** Final level $n = 2$ is the **Balmer** series, and this is its first line (H$_\alpha$), a red line in the visible.

### Problem 25 [QM 5 · Numerical · 3 pts]

An electron is in a state with $l = 2$. Find $|\vec L|$, the possible values of $L_z$, and the smallest angle between $\vec L$ and the $z$-axis.

*Solution.* $|\vec L| = \sqrt{l(l+1)}\,\hbar = \boxed{\sqrt6\,\hbar = 2.45\hbar}$

$$L_z = m_l\hbar,\quad m_l\in\{-2,-1,0,1,2\}\ \Rightarrow\ \boxed{L_z = 0,\ \pm\hbar,\ \pm2\hbar}$$

**Smallest angle** ($m_l = 2$):

$$\cos\theta = \frac{L_z}{|\vec L|} = \frac2{\sqrt6} = 0.816\ \Rightarrow\ \theta = \boxed{35.3^\circ}$$

**Meaning.** $\vec L$ can never point exactly along $z$, because $|L_z| < |\vec L|$ always; this is the uncertainty principle at work (knowing $L_z$ exactly means $L_x$ and $L_y$ are undefined).

### Problem 26 [QM 5 · Concept · 3 pts]

How many radial nodes and angular nodes do the $3s$, $3p$, $3d$ and $4f$ orbitals have?

*Solution.* **Rules.** Radial nodes $= n - l - 1$, angular nodes $= l$, total nodes $= n - 1$.

| orbital | $n$ | $l$ | radial nodes | angular nodes | total |
|---|---|---|---|---|---|
| $3s$ | $3$ | $0$ | $2$ | $0$ | $2$ |
| $3p$ | $3$ | $1$ | $1$ | $1$ | $2$ |
| $3d$ | $3$ | $2$ | $0$ | $2$ | $2$ |
| $4f$ | $4$ | $3$ | $0$ | $3$ | $3$ |

**Pattern.** For fixed $n$ the total number of nodes is the same; the orbital with the biggest $l$ has the fewest radial nodes.

### Problem 27 [QM 5 · Derivation · 4 pts]

For the hydrogen ground state $|\psi_{100}|^2\propto e^{-2r/a_0}$, show that the most probable distance of the electron from the nucleus is $a_0$.

*Solution.* **Radial probability density.** Include the spherical shell volume $4\pi r^2\,dr$:

$$P(r) = 4\pi r^2|\psi|^2 = \frac4{a_0^3}r^2e^{-2r/a_0}$$

**Maximise:**

$$\frac{dP}{dr}\propto\left(2r - \frac{2r^2}{a_0}\right)e^{-2r/a_0} = 0\ \Rightarrow\ \boxed{r = a_0}$$

**Common mistake.** The wavefunction itself is largest at $r = 0$, but the **radial probability** peaks at $a_0$, because the volume of the shell goes to zero as $r\to0$. The average is larger still: $\langle r\rangle = \tfrac32a_0$.

### Problem 28 [QM 5 · Concept · 3 pts]

The electric-dipole selection rule for hydrogen is $\Delta l = \pm1$ (and $\Delta m_l = 0, \pm1$). Which of these transitions are allowed: $3p\to1s$, $3d\to2s$, $2s\to1s$, $3d\to2p$?

*Solution.* Check $\Delta l$ for each:

| transition | $\Delta l$ | allowed? |
|---|---|---|
| $3p\to1s$ | $1\to0$: $-1$ | ✓ allowed |
| $3d\to2s$ | $2\to0$: $-2$ | ✗ forbidden |
| $2s\to1s$ | $0\to0$: $0$ | ✗ forbidden |
| $3d\to2p$ | $2\to1$: $-1$ | ✓ allowed |

**Why $\Delta l = \pm1$.** A photon carries one unit of angular momentum, so the atom's $l$ must change by one.

**Consequence.** The $2s$ state cannot decay to $1s$ by emitting a single photon, so it is long-lived (metastable, about $0.12$ s) compared with $2p$ (about $1.6$ ns).
