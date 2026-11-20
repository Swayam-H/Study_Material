# Learn: Quantum theory of the hydrogen atom

Solving the Schrödinger equation for the Coulomb potential gives three quantum numbers n, l, mₗ. n fixes the energy (the same −13.6/n² eV as Bohr), l fixes the size of the angular momentum, and mₗ its direction. The electron has no orbit, only a probability cloud. This doc covers Beiser 6.1–6.9 (6.10 Zeeman is excluded) and the slides `QM.tex:444` to `:533`. Your professor said the focus is understanding, not derivations, so the theory stresses what each result means.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Why go beyond Bohr

The Bohr model gave the right energy levels for hydrogen, but it did so by assuming that the electron moves in circular orbits and that its angular momentum is a whole multiple of ħ. Neither assumption had any deeper justification, and the model could say nothing about atoms with more than one electron or about why some spectral lines are brighter than others. The proper treatment is to solve Schrödinger's equation for an electron bound to a proton, and see what quantum mechanics itself predicts.

## Separating the Schrödinger equation

The electron feels the Coulomb potential U = −e²/(4πε₀r), which depends only on its distance r from the nucleus. Because the potential has spherical symmetry, the natural coordinates are spherical polar coordinates r, θ and φ. In these coordinates the equation can be separated: we look for a wave function of the form ψ = R(r)Θ(θ)Φ(φ), and the single partial differential equation breaks into three ordinary ones, one for each variable. Each of these has acceptable solutions only for particular values of a separation constant, and these constants are the quantum numbers of the atom.

The azimuthal equation is the simplest. Its solution is Φ = e^(imₗφ), and because φ and φ + 2π describe the same point in space, Φ must return to its starting value after one turn. This is possible only if mₗ is an integer. The polar equation for Θ has solutions that remain finite at θ = 0 and θ = π only when a second constant takes the form l(l + 1), with l a whole number not smaller than |mₗ|. Finally, the radial equation has solutions that vanish at large r, as a bound electron's must, only when the energy takes one of the values Eₙ = −13.6 eV/n², with n an integer greater than l. In each case the quantum number appears for the same reason as in the particle in a box: a wave function that is required to be well behaved can do so only for certain values of its parameters. A problem in three dimensions simply gives three such conditions.

## Energy: the principal quantum number

The principal quantum number n determines the energy, and the formula is exactly Bohr's. What is different is that the energy depends on n alone, so that states with the same n but different l and mₗ have the same energy. There are n² such states for each n. This degeneracy is a special property of the 1/r potential; in atoms with more electrons the inner electrons screen the nucleus and states of different l separate in energy.

## Angular momentum: the orbital quantum number

The orbital quantum number l determines the magnitude of the electron's angular momentum, L = √(l(l + 1)) ħ. This is not Bohr's L = nħ. In particular, an electron in an s state (l = 0) has no orbital angular momentum at all, something no classical orbit can manage. States are labelled by n followed by a letter for l, so that s, p, d and f stand for l = 0, 1, 2 and 3, and a 3d electron has n = 3 and l = 2.

## Direction: the magnetic quantum number

The magnetic quantum number mₗ determines the component of the angular momentum along a chosen axis, L\_z = mₗħ. Since mₗ takes only the 2l + 1 values from −l to +l, the vector L can point only in certain directions relative to that axis. This is called space quantisation. The largest possible L\_z is lħ, which is always smaller than √(l(l + 1)) ħ, so L can never lie exactly along the axis. If it could, its x and y components would both be exactly zero, and all three components would be known at once, which the uncertainty principle does not allow. Only the magnitude of L and one of its components can be definite at the same time.

## Probability density

The wave function does not describe a path. It gives the probability |ψ|² dV of finding the electron in a small volume, and the electron may be found at any distance from the nucleus. The probability of finding it between r and r + dr is P(r) dr = r²|R|² dr, the factor r² coming from the volume of a thin spherical shell. For the ground state this function has its maximum at r = a₀, the Bohr radius. The Bohr orbit therefore survives, but only as the most probable distance of the electron, not as a track it follows. The angular parts of ψ give the familiar shapes: s states are spherical, and p and d states have lobes in definite directions, which is why chemical bonds have definite directions.

![Radial probability and the angular momentum vector model](fig/orbitals-angular-momentum.svg)

*Figure. Left: radial probability densities of 1s, 2s and 2p. Right: for $l=2$, $\mathbf L$ has length $\sqrt6\hbar$ and $L_z=m_l\hbar$, so it can point only along five cones.*

## Radiative transitions

Quantum mechanics also explains why atoms are stable and how they radiate. In a stationary state |Ψ|² does not change with time, so the electron's charge distribution is static and, unlike Bohr's orbiting electron, it does not radiate. During a transition the electron is in a mixture of the initial and final states, and |Ψ|² then oscillates at the frequency (Eᵢ − E\_f)/h. An oscillating charge distribution radiates at its oscillation frequency, so the emitted photon has exactly the energy Eᵢ − E\_f. What Bohr had to postulate now follows from the theory.

## Selection rules

Not every pair of levels is connected by such a transition. The rate depends on an integral of the dipole moment between the two states, and this integral vanishes unless Δl = ±1 and Δmₗ = 0 or ±1. These are the selection rules. The rule on l has a simple meaning: the photon carries away one unit of angular momentum, so the atom's angular momentum must change by one unit. A striking consequence is that an electron in the 2s state cannot fall to 1s by emitting a photon, since that would require Δl = 0, and so the 2s state is unusually long-lived.

# Reference: Quantum theory of the hydrogen atom

The course material section by section, in the order of the textbook, with the key formulas.

## 6.1 Schrödinger's equation for the hydrogen atom

- The potential is U(r) = −e²/(4πε₀r). It depends only on r, the distance from the nucleus: it is **spherically symmetric**.
- So use spherical polar coordinates (r, θ, φ), with x = r sinθ cosφ, y = r sinθ sinφ, z = r cosθ.
- The time-independent 3-D equation is −(ħ²/2m)∇²ψ + U(r)ψ = Eψ, with the Laplacian written in spherical coordinates. You don't need to write it out.
- Use the reduced mass m′ if you want the 0.05% correction (chunk 10, 4.7).

## 6.2 Separation of variables

**Idea.** Look for solutions that are a product of three one-variable functions:

$$
\psi(r,\theta,\phi) = R(r)\,\Theta(\theta)\,\Phi(\phi)
$$

Substituting splits the equation into three ordinary equations, one per variable, linked by separation constants. Those constants become the quantum numbers:

| Equation | Its condition | Quantum number |
| --- | --- | --- |
| Φ(φ) | Φ must be single-valued: Φ(φ + 2π) = Φ(φ), so Φ = e^(imₗφ) | mₗ (an integer) |
| Θ(θ) | Θ must be finite at θ = 0 and π | l, with |
| R(r) | R must go to 0 as r → ∞ (bound state) | n, with l < n |

**The point:** quantum numbers arise from the requirement that ψ be well behaved in each direction, exactly as n did in the 1-D box. Three dimensions give three quantum numbers.

## 6.3 Quantum numbers

| Name | Symbol | Allowed values | Fixes |
| --- | --- | --- | --- |
| Principal | n | 1, 2, 3, … | Energy |
| Orbital | l | 0, 1, …, n − 1 | Size of angular momentum L |
| Magnetic | mₗ | −l, …, 0, …, +l | z-component of L |

- For each l there are 2l + 1 values of mₗ. For each n there are Σ(2l + 1) = **n² states** with the same energy (2n² counting spin, which comes in ch 7).
- Example: n = 2 has l = 0 (mₗ = 0) and l = 1 (mₗ = −1, 0, +1), so 4 states.

## 6.4 Principal quantum number: quantisation of energy

$$
E_n = -\frac{m e^4}{32\pi^2\varepsilon_0^2\hbar^2}\,\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}
$$

- Exactly Bohr's result, but now it comes from the wave equation without ad hoc orbits.
- Energy depends **only on n**, not on l or mₗ. States with the same n and different l or mₗ are **degenerate**. This is special to the 1/r potential (in other atoms the l-degeneracy is lifted).
- Only E < 0 gives quantised bound states. For E > 0 the electron is free and any energy is allowed.

## 6.5 Orbital quantum number: quantisation of angular momentum magnitude

$$
L = \sqrt{l(l+1)}\;\hbar
$$

- Note it is √(l(l+1))ħ, not lħ as in Bohr's model. For l = 0 (s states), **L = 0**: the electron has no orbital angular momentum, which no classical orbit can do.
- The kinetic energy splits into a radial part and an orbital part L²/(2mr²). Because L is fixed, the orbital part enters the radial equation like a centrifugal barrier (compare the effective potential in chunk 4).
- **Letter notation:** l = 0, 1, 2, 3, 4 → s, p, d, f, g. A state is written n then letter: 1s, 2s, 2p, 3d.

## 6.6 Magnetic quantum number: quantisation of angular momentum direction

$$
L_z = m_l\,\hbar
$$

- The z-axis is any direction you choose, typically along an applied magnetic field (hence "magnetic").
- **Space quantisation:** the vector L can only point at angles where cosθ = mₗ/√(l(l+1)). For l = 2, L = √6 ħ and L\_z = −2ħ … +2ħ, giving 5 allowed orientations.
- L can never point exactly along z, because |mₗ| ≤ l < √(l(l+1)). If it did, L\_x and L\_y would both be exactly zero, and the uncertainty principle forbids knowing all three components. Only L and L\_z are definite; L\_x and L\_y are not.
- The magnetic moment of the orbit is proportional to L, so its energy in a field B depends on mₗ. That is the Zeeman effect (6.10, not in your syllabus).

## 6.7 Electron probability density

- **No definite orbit.** The electron is found at a given place with probability |ψ|² dV = |R|²|Θ|²|Φ|² dV. It can be found anywhere, but some regions are much more likely.
- |Φ|² = constant: the density is always **symmetric about the z-axis**.
- **Radial probability:** the chance of finding the electron between r and r + dr, in a thin spherical shell of volume 4πr² dr:

$$
P(r)\,dr = r^2\,|R(r)|^2\,dr
$$

- For the 1s state, R ∝ e^(−r/a₀), so P(r) ∝ r²e^(−2r/a₀). Setting dP/dr = 0 gives the **most probable radius r = a₀**, Bohr's radius. Bohr's orbit survives as the most likely distance, not as a path.
- ⟨r⟩ for 1s is 1.5a₀, a bit larger than the most probable r because the tail is long.
- For other states, the most probable radius for the largest-l state (l = n − 1) is n²a₀, again matching Bohr's rₙ.
- **Shapes:** s states (l = 0) are spherically symmetric. p states have two lobes (dumbbell) along an axis. d states have more lobes. The number of radial nodes is n − l − 1.
- Chemistry follows from these shapes (bond directions, covalent bonding, the slides' last frames).

## 6.8 Radiative transitions

- In a stationary state, |Ψ|² doesn't change in time, so the charge distribution is static and **does not radiate**. That explains the stability Bohr had to assume.
- During a transition the electron is in a **superposition** of the initial and final states: Ψ = aΨᵢ + bΨ\_f. The cross term makes |Ψ|² oscillate at frequency ν = (Eᵢ − E\_f)/h.
- An oscillating charge distribution is an oscillating electric dipole, and it radiates at exactly that frequency. So the emitted photon has hν = Eᵢ − E\_f, now explained rather than postulated.

## 6.9 Selection rules

- Not every pair of levels gives a line. The transition probability depends on the **dipole moment integral** ∫ψ\_f\* r ψᵢ dV between the two states. If it is zero, the transition is **forbidden** (very unlikely).
- Evaluating the integrals gives the selection rules for allowed (electric dipole) transitions:

$$
\Delta l = \pm 1, \qquad \Delta m_l = 0, \pm 1, \qquad \Delta n \text{ any}
$$

- **Physical reason for Δl = ±1:** a photon carries one unit (ħ) of angular momentum. Taking it away or adding it must change the atom's angular momentum by one unit.
- Examples: 2p → 1s is allowed. 2s → 1s is forbidden (Δl = 0), so the 2s state is metastable and lives about 0.1 s instead of 10⁻⁸ s. 3d → 2p is allowed; 3d → 1s is not (Δl = 2).
- In hydrogen, every line in the Lyman, Balmer and other series still appears, because states with the right l exist for each n (energy depends only on n). Selection rules matter more for which sublevels connect and for lifetimes.

## What to be able to do without notes

- Explain why spherical coordinates and separation of variables are used, and how each quantum number arises from a condition on ψ.
- List n, l, mₗ with their ranges and meanings; count the states for a given n.
- State Eₙ, L = √(l(l+1))ħ and L\_z = mₗħ, and explain space quantisation and why L can't lie along z.
- Explain what P(r) is and show the 1s most probable radius is a₀.
- Explain why stationary states don't radiate and transitions do.
- State the selection rules and decide whether a given transition is allowed.

# Formulas: Quantum theory of the hydrogen atom

## Setup

$$U(r) = -\frac{e^2}{4\pi\varepsilon_0r}\ \text{(spherically symmetric)},\qquad -\frac{\hbar^2}{2m}\nabla^2\psi + U(r)\psi = E\psi$$

Use spherical polar coordinates $(r, \theta, \phi)$ and separate:

$$\boxed{\psi(r, \theta, \phi) = R(r)\,\Theta(\theta)\,\Phi(\phi)}$$

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

$$\boxed{E_n = -\frac{me^4}{32\pi^2\varepsilon_0^2\hbar^2}\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}}$$

Energy depends only on $n$, so states with the same $n$ are degenerate (special to the $1/r$ potential).

$$\boxed{L = \sqrt{l(l + 1)}\,\hbar,\qquad L_z = m_l\hbar,\qquad \cos\theta = \frac{m_l}{\sqrt{l(l + 1)}}}$$

For $l = 2$: $L = \sqrt6\hbar$ and $L_z = -2\hbar, \dots, +2\hbar$ (5 orientations). Since $|m_l| \le l < \sqrt{l(l + 1)}$, $L$ can never point exactly along $z$. For $s$ states $L = 0$.

## Probability density

$$|\Phi|^2 = \text{constant},\qquad P(r)\,dr = r^2|R(r)|^2dr,\qquad \text{radial nodes} = n - l - 1$$

1s: $R \propto e^{-r/a_0}$, so $P(r) \propto r^2e^{-2r/a_0}$ and the most probable radius is $a_0 = 0.0529$ nm. For $l = n - 1$ the most probable radius is $n^2a_0$.

## Transitions

$$h\nu = E_i - E_f,\qquad \nu = \frac{E_i - E_f}{h}\ \text{(frequency at which } |\Psi|^2 \text{ oscillates)}$$

$$\boxed{\Delta l = \pm1,\qquad \Delta m_l = 0, \pm1,\qquad \Delta n\ \text{any}}$$

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
