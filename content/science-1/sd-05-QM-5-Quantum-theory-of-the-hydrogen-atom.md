# Science-1 QM 5: Quantum theory of the hydrogen atom

Solving the Schrödinger equation for the Coulomb potential gives three quantum numbers n, l, mₗ. n fixes the energy (the same −13.6/n² eV as Bohr), l fixes the size of the angular momentum, and mₗ its direction. The electron has no orbit, only a probability cloud. This doc covers Beiser 6.1–6.9 (6.10 Zeeman is excluded) and the slides `QM.tex:444` to `:533`. Your professor said the focus is understanding, not derivations, so the theory stresses what each result means.

## Explainer

### Why go beyond Bohr

The Bohr model gave the right energy levels for hydrogen, but it did so by assuming that the electron moves in circular orbits and that its angular momentum is a whole multiple of ħ. Neither assumption had any deeper justification, and the model could say nothing about atoms with more than one electron or about why some spectral lines are brighter than others. The proper treatment is to solve Schrödinger's equation for an electron bound to a proton, and see what quantum mechanics itself predicts.

### Separating the Schrödinger equation

The electron feels the Coulomb potential U = −e²/(4πε₀r), which depends only on its distance r from the nucleus. Because the potential has spherical symmetry, the natural coordinates are spherical polar coordinates r, θ and φ. In these coordinates the equation can be separated: we look for a wave function of the form ψ = R(r)Θ(θ)Φ(φ), and the single partial differential equation breaks into three ordinary ones, one for each variable. Each of these has acceptable solutions only for particular values of a separation constant, and these constants are the quantum numbers of the atom.

The azimuthal equation is the simplest. Its solution is Φ = e^(imₗφ), and because φ and φ + 2π describe the same point in space, Φ must return to its starting value after one turn. This is possible only if mₗ is an integer. The polar equation for Θ has solutions that remain finite at θ = 0 and θ = π only when a second constant takes the form l(l + 1), with l a whole number not smaller than |mₗ|. Finally, the radial equation has solutions that vanish at large r, as a bound electron's must, only when the energy takes one of the values Eₙ = −13.6 eV/n², with n an integer greater than l. In each case the quantum number appears for the same reason as in the particle in a box: a wave function that is required to be well behaved can do so only for certain values of its parameters. A problem in three dimensions simply gives three such conditions.

### Energy: the principal quantum number

The principal quantum number n determines the energy, and the formula is exactly Bohr's. What is different is that the energy depends on n alone, so that states with the same n but different l and mₗ have the same energy. There are n² such states for each n. This degeneracy is a special property of the 1/r potential; in atoms with more electrons the inner electrons screen the nucleus and states of different l separate in energy.

### Angular momentum: the orbital quantum number

The orbital quantum number l determines the magnitude of the electron's angular momentum, L = √(l(l + 1)) ħ. This is not Bohr's L = nħ. In particular, an electron in an s state (l = 0) has no orbital angular momentum at all, something no classical orbit can manage. States are labelled by n followed by a letter for l, so that s, p, d and f stand for l = 0, 1, 2 and 3, and a 3d electron has n = 3 and l = 2.

### Direction: the magnetic quantum number

The magnetic quantum number mₗ determines the component of the angular momentum along a chosen axis, L\_z = mₗħ. Since mₗ takes only the 2l + 1 values from −l to +l, the vector L can point only in certain directions relative to that axis. This is called space quantisation. The largest possible L\_z is lħ, which is always smaller than √(l(l + 1)) ħ, so L can never lie exactly along the axis. If it could, its x and y components would both be exactly zero, and all three components would be known at once, which the uncertainty principle does not allow. Only the magnitude of L and one of its components can be definite at the same time.

### Probability density

The wave function does not describe a path. It gives the probability |ψ|² dV of finding the electron in a small volume, and the electron may be found at any distance from the nucleus. The probability of finding it between r and r + dr is P(r) dr = r²|R|² dr, the factor r² coming from the volume of a thin spherical shell. For the ground state this function has its maximum at r = a₀, the Bohr radius. The Bohr orbit therefore survives, but only as the most probable distance of the electron, not as a track it follows. The angular parts of ψ give the familiar shapes: s states are spherical, and p and d states have lobes in definite directions, which is why chemical bonds have definite directions.

### Radiative transitions

Quantum mechanics also explains why atoms are stable and how they radiate. In a stationary state |Ψ|² does not change with time, so the electron's charge distribution is static and, unlike Bohr's orbiting electron, it does not radiate. During a transition the electron is in a mixture of the initial and final states, and |Ψ|² then oscillates at the frequency (Eᵢ − E\_f)/h. An oscillating charge distribution radiates at its oscillation frequency, so the emitted photon has exactly the energy Eᵢ − E\_f. What Bohr had to postulate now follows from the theory.

### Selection rules

Not every pair of levels is connected by such a transition. The rate depends on an integral of the dipole moment between the two states, and this integral vanishes unless Δl = ±1 and Δmₗ = 0 or ±1. These are the selection rules. The rule on l has a simple meaning: the photon carries away one unit of angular momentum, so the atom's angular momentum must change by one unit. A striking consequence is that an electron in the 2s state cannot fall to 1s by emitting a photon, since that would require Δl = 0, and so the 2s state is unusually long-lived.

## Summary

### 6.1 Schrödinger's equation for the hydrogen atom

- The potential is U(r) = −e²/(4πε₀r). It depends only on r, the distance from the nucleus: it is **spherically symmetric**.
- So use spherical polar coordinates (r, θ, φ), with x = r sinθ cosφ, y = r sinθ sinφ, z = r cosθ.
- The time-independent 3-D equation is −(ħ²/2m)∇²ψ + U(r)ψ = Eψ, with the Laplacian written in spherical coordinates. You don't need to write it out.
- Use the reduced mass m′ if you want the 0.05% correction (chunk 10, 4.7).

### 6.2 Separation of variables

**Idea.** Look for solutions that are a product of three one-variable functions:

```latex
\psi(r,\theta,\phi) = R(r)\,\Theta(\theta)\,\Phi(\phi)
```

Substituting splits the equation into three ordinary equations, one per variable, linked by separation constants. Those constants become the quantum numbers:

| Equation | Its condition | Quantum number |
| --- | --- | --- |
| Φ(φ) | Φ must be single-valued: Φ(φ + 2π) = Φ(φ), so Φ = e^(imₗφ) | mₗ (an integer) |
| Θ(θ) | Θ must be finite at θ = 0 and π | l, with |
| R(r) | R must go to 0 as r → ∞ (bound state) | n, with l < n |

**The point:** quantum numbers arise from the requirement that ψ be well behaved in each direction, exactly as n did in the 1-D box. Three dimensions give three quantum numbers.

### 6.3 Quantum numbers

| Name | Symbol | Allowed values | Fixes |
| --- | --- | --- | --- |
| Principal | n | 1, 2, 3, … | Energy |
| Orbital | l | 0, 1, …, n − 1 | Size of angular momentum L |
| Magnetic | mₗ | −l, …, 0, …, +l | z-component of L |

- For each l there are 2l + 1 values of mₗ. For each n there are Σ(2l + 1) = **n² states** with the same energy (2n² counting spin, which comes in ch 7).
- Example: n = 2 has l = 0 (mₗ = 0) and l = 1 (mₗ = −1, 0, +1), so 4 states.

### 6.4 Principal quantum number: quantisation of energy

```latex
E_n = -\frac{m e^4}{32\pi^2\varepsilon_0^2\hbar^2}\,\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}
```

- Exactly Bohr's result, but now it comes from the wave equation without ad hoc orbits.
- Energy depends **only on n**, not on l or mₗ. States with the same n and different l or mₗ are **degenerate**. This is special to the 1/r potential (in other atoms the l-degeneracy is lifted).
- Only E < 0 gives quantised bound states. For E > 0 the electron is free and any energy is allowed.

### 6.5 Orbital quantum number: quantisation of angular momentum magnitude

```latex
L = \sqrt{l(l+1)}\;\hbar
```

- Note it is √(l(l+1))ħ, not lħ as in Bohr's model. For l = 0 (s states), **L = 0**: the electron has no orbital angular momentum, which no classical orbit can do.
- The kinetic energy splits into a radial part and an orbital part L²/(2mr²). Because L is fixed, the orbital part enters the radial equation like a centrifugal barrier (compare the effective potential in chunk 4).
- **Letter notation:** l = 0, 1, 2, 3, 4 → s, p, d, f, g. A state is written n then letter: 1s, 2s, 2p, 3d.

### 6.6 Magnetic quantum number: quantisation of angular momentum direction

```latex
L_z = m_l\,\hbar
```

- The z-axis is any direction you choose, typically along an applied magnetic field (hence "magnetic").
- **Space quantisation:** the vector L can only point at angles where cosθ = mₗ/√(l(l+1)). For l = 2, L = √6 ħ and L\_z = −2ħ … +2ħ, giving 5 allowed orientations.
- L can never point exactly along z, because |mₗ| ≤ l < √(l(l+1)). If it did, L\_x and L\_y would both be exactly zero, and the uncertainty principle forbids knowing all three components. Only L and L\_z are definite; L\_x and L\_y are not.
- The magnetic moment of the orbit is proportional to L, so its energy in a field B depends on mₗ. That is the Zeeman effect (6.10, not in your syllabus).

### 6.7 Electron probability density

- **No definite orbit.** The electron is found at a given place with probability |ψ|² dV = |R|²|Θ|²|Φ|² dV. It can be found anywhere, but some regions are much more likely.
- |Φ|² = constant: the density is always **symmetric about the z-axis**.
- **Radial probability:** the chance of finding the electron between r and r + dr, in a thin spherical shell of volume 4πr² dr:

```latex
P(r)\,dr = r^2\,|R(r)|^2\,dr
```

- For the 1s state, R ∝ e^(−r/a₀), so P(r) ∝ r²e^(−2r/a₀). Setting dP/dr = 0 gives the **most probable radius r = a₀**, Bohr's radius. Bohr's orbit survives as the most likely distance, not as a path.
- ⟨r⟩ for 1s is 1.5a₀, a bit larger than the most probable r because the tail is long.
- For other states, the most probable radius for the largest-l state (l = n − 1) is n²a₀, again matching Bohr's rₙ.
- **Shapes:** s states (l = 0) are spherically symmetric. p states have two lobes (dumbbell) along an axis. d states have more lobes. The number of radial nodes is n − l − 1.
- Chemistry follows from these shapes (bond directions, covalent bonding, the slides' last frames).

### 6.8 Radiative transitions

- In a stationary state, |Ψ|² doesn't change in time, so the charge distribution is static and **does not radiate**. That explains the stability Bohr had to assume.
- During a transition the electron is in a **superposition** of the initial and final states: Ψ = aΨᵢ + bΨ\_f. The cross term makes |Ψ|² oscillate at frequency ν = (Eᵢ − E\_f)/h.
- An oscillating charge distribution is an oscillating electric dipole, and it radiates at exactly that frequency. So the emitted photon has hν = Eᵢ − E\_f, now explained rather than postulated.

### 6.9 Selection rules

- Not every pair of levels gives a line. The transition probability depends on the **dipole moment integral** ∫ψ\_f\* r ψᵢ dV between the two states. If it is zero, the transition is **forbidden** (very unlikely).
- Evaluating the integrals gives the selection rules for allowed (electric dipole) transitions:

```latex
\Delta l = \pm 1, \qquad \Delta m_l = 0, \pm 1, \qquad \Delta n \text{ any}
```

- **Physical reason for Δl = ±1:** a photon carries one unit (ħ) of angular momentum. Taking it away or adding it must change the atom's angular momentum by one unit.
- Examples: 2p → 1s is allowed. 2s → 1s is forbidden (Δl = 0), so the 2s state is metastable and lives about 0.1 s instead of 10⁻⁸ s. 3d → 2p is allowed; 3d → 1s is not (Δl = 2).
- In hydrogen, every line in the Lyman, Balmer and other series still appears, because states with the right l exist for each n (energy depends only on n). Selection rules matter more for which sublevels connect and for lifetimes.

### What to be able to do without notes

- Explain why spherical coordinates and separation of variables are used, and how each quantum number arises from a condition on ψ.
- List n, l, mₗ with their ranges and meanings; count the states for a given n.
- State Eₙ, L = √(l(l+1))ħ and L\_z = mₗħ, and explain space quantisation and why L can't lie along z.
- Explain what P(r) is and show the 1s most probable radius is a₀.
- Explain why stationary states don't radiate and transitions do.
- State the selection rules and decide whether a given transition is allowed.

## Questions

These are mostly "explain" questions, since the professor wants understanding rather than derivations. Points are in brackets.

### A. State and explain (2–3 points)

1. (2) Why are spherical polar coordinates used for the hydrogen atom?
2. (3) Explain how the three quantum numbers arise from separating the Schrödinger equation. Which condition gives each one?
3. (3) Name the quantum numbers n, l and mₗ, give their allowed values, and say what physical quantity each fixes.
4. (2) How does the quantum-mechanical energy of hydrogen compare with Bohr's? What is new?
5. (2) Compare the angular momentum of hydrogen in Bohr's model and in quantum mechanics. What is surprising about s states?
6. (3) What is space quantisation? Why can L never point exactly along the z-axis?
7. (2) In what sense does the electron in hydrogen have no orbit? Where does Bohr's radius reappear?
8. (3) Why doesn't an atom in a stationary state radiate? Why does it radiate during a transition?
9. (2) State the selection rules for allowed transitions. Why is Δl = ±1?
10. (2) Why is the 2s state of hydrogen long-lived?

### B. Show or work out (3–5 points)

11. (3) Show that there are n² states with principal quantum number n.
12. (3) List all (n, l, mₗ) states for n = 3 and write their spectroscopic names.
13. (4) For l = 2, find L and the possible angles between L and the z-axis.
14. (4) For the 1s state, P(r) ∝ r²e^(−2r/a₀). Show that the most probable radius is a₀.
15. (3) Which of these transitions are allowed: 3p → 1s, 3d → 2s, 4f → 3d, 2s → 1s, 3s → 2p?
16. (3) Explain, using a superposition Ψ = aΨᵢ + bΨ\_f, why the emitted frequency is (Eᵢ − E\_f)/h.
17. (3) Sketch the radial probability densities of 1s, 2s and 2p and mark their nodes.

### C. Short numericals

18. (2) Find the energy of a 3d electron in hydrogen. Does it differ from a 3s electron? Why?
19. (3) For a 1s electron, the probability of being found inside r = a₀ is 1 − 5e⁻². Evaluate it (e² ≈ 7.39) and comment.
20. (2) A hydrogen atom is in a 4f state. Which states can it decay to directly?

### D. Discuss

21. (3) Explain why the shapes of p orbitals matter for chemistry.
22. (3) What does the hydrogen solution keep from the Bohr model and what does it discard?

## Answer key

1. The Coulomb potential depends only on r, so the equation separates neatly in r, θ and φ, and the boundary conditions are simple in those coordinates.
2. Writing ψ = R(r)Θ(θ)Φ(φ) splits the equation into three. Φ must be single-valued around the z-axis, which gives integer mₗ. Θ must stay finite at the poles, which gives l ≥ |mₗ|. R must vanish at infinity for a bound state, which gives n > l and the energies.
3. n = 1, 2, … fixes the energy. l = 0, …, n − 1 fixes the magnitude L = √(l(l+1))ħ. mₗ = −l, …, +l fixes L\_z = mₗħ.
4. The same Eₙ = −13.6/n² eV. What is new is that it comes from the wave equation without assumed orbits, together with l and mₗ, the degeneracy, and the probability distributions.
5. Bohr: L = nħ, never zero. Quantum: L = √(l(l+1))ħ, set by l, not n. For s states (l = 0), L = 0: the electron has no orbital angular momentum at all, impossible for a classical orbit.
6. L can only take orientations with L\_z = mₗħ. Since |mₗ| ≤ l < √(l(l+1)), L\_z is always less than L, so L can't lie along z. If it did, L\_x and L\_y would both be exactly zero, giving all three components exactly, which the uncertainty principle forbids.
7. The electron has only a probability density |ψ|²; it can be found at any r. For 1s, the most probable distance is a₀, Bohr's radius.
8. In a stationary state |Ψ|² is constant in time, so the charge doesn't oscillate and doesn't radiate. In a transition Ψ is a mix of two states; |Ψ|² oscillates at (Eᵢ − E\_f)/h, and an oscillating dipole radiates at that frequency.
9. Δl = ±1 and Δmₗ = 0, ±1. The photon carries one unit of angular momentum, so the atom's l must change by one.
10. The only lower state is 1s, and 2s → 1s has Δl = 0, which is forbidden. With no allowed way down, 2s lives about 0.1 s.
11. For each l there are 2l + 1 values of mₗ. Summing over l = 0 to n − 1: Σ(2l + 1) = 2 × n(n − 1)/2 + n = n².
12. 3s: (3,0,0). 3p: (3,1,−1), (3,1,0), (3,1,1). 3d: (3,2,−2) to (3,2,2), five states. Total 9.
13. L = √6 ħ ≈ 2.45ħ. cosθ = mₗ/√6 for mₗ = 2, 1, 0, −1, −2, giving θ ≈ 35°, 66°, 90°, 114°, 145°.
14. dP/dr ∝ (2r − 2r²/a₀)e^(−2r/a₀) = 0, so r = a₀ (r = 0 is a minimum).
15. 3p → 1s allowed (Δl = −1). 3d → 2s forbidden (Δl = −2). 4f → 3d allowed. 2s → 1s forbidden. 3s → 2p allowed (Δl = +1).
16. |Ψ|² contains a cross term ∝ ψᵢ\*ψ\_f e^(i(Eᵢ − E\_f)t/ħ) + complex conjugate, which oscillates at angular frequency (Eᵢ − E\_f)/ħ. The charge density, and so the dipole, oscillates at ν = (Eᵢ − E\_f)/h, and radiates at that frequency.
17. 1s: one peak at a₀, no nodes. 2s: a small inner peak, a node, then a main peak near 5a₀ (n − l − 1 = 1 node). 2p: one peak at 4a₀, no radial nodes.
18. E₃ = −13.6/9 ≈ −1.51 eV, the same for 3s, 3p and 3d. In hydrogen the energy depends only on n.
19. 5e⁻² ≈ 5/7.39 ≈ 0.68, so P ≈ 0.32. The electron is more likely to be found outside a₀ than inside it, even though a₀ is the single most probable radius, because the distribution has a long tail.
20. Δl = −1, so only to d states with lower energy: 3d. (4d is the same energy and 4f → 4d would not emit.)
21. p densities are lobes along particular axes. Bonds form where lobes from neighbouring atoms overlap, so the lobes set the directions of bonds and the shapes of molecules.
22. It keeps Eₙ = −13.6/n² eV and the radius a₀ (as the most probable 1s radius). It discards definite orbits, replaces L = nħ by √(l(l+1))ħ, and adds l, mₗ, degeneracy, space quantisation and selection rules.
