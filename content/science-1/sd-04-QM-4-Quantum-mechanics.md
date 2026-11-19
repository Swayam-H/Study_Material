# Science-1 QM 4: Quantum mechanics

The Schrödinger equation is to quantum mechanics what F = ma is to classical mechanics: you solve it with the right potential and boundary conditions, and the allowed wave functions and energies come out. This doc covers all of Beiser ch 5 (5.1–5.11, including the tunnel-effect appendix) and the slides `QM.tex:258` to `:443`.

## Explainer

### The wave function

Classical mechanics answers questions with certainties: given the initial position and velocity of a body and the forces on it, Newton's laws predict exactly where it will be at any later time. Quantum mechanics cannot do this, because the uncertainty principle forbids us to know the initial position and momentum exactly. What it predicts instead are probabilities. For a particle the central object is the wave function Ψ(x, t), and the probability of finding the particle between x and x + dx at time t is |Ψ|² dx. Since the particle must be somewhere, the integral of |Ψ|² over all space must equal one, and a wave function that satisfies this is said to be normalised. A wave function must also be single-valued and continuous, together with its first derivative, wherever the potential is finite. These requirements turn out to be what produces quantisation.

### Schrödinger's equation

The wave function itself obeys an equation that plays the role Newton's second law plays in classical mechanics. Schrödinger's equation cannot be derived from anything more basic; it is a postulate, justified by the success of its predictions. It can, however, be made plausible. For a free particle the wave function should be a travelling wave Ψ = A e^(−i(ωt − kx)), with energy E = ħω and momentum p = ħk. Differentiating this twice with respect to x brings down a factor p², and differentiating once with respect to t brings down a factor E. Substituting these into the energy relation E = p²/2m + U gives the time-dependent Schrödinger equation, iħ ∂Ψ/∂t = −(ħ²/2m) ∂²Ψ/∂x² + UΨ. The equation is linear in Ψ, which means that if Ψ₁ and Ψ₂ are solutions, so is any combination of them. When two solutions are added, the probability density contains a cross term in addition to |Ψ₁|² and |Ψ₂|², and this interference term is what produces the bright and dark fringes in the double-slit experiment with electrons.

### Expectation values and operators

A quantum calculation does not predict the result of a single measurement, but it does predict the average of many. The expectation value of x is ⟨x⟩ = ∫ x|Ψ|² dx, the average position found if the measurement is repeated on many identically prepared particles. Other quantities are found in the same way with the help of operators. Momentum corresponds to the operator −iħ ∂/∂x, and energy to iħ ∂/∂t, and the expectation value of any quantity is obtained by sandwiching its operator between Ψ\* and Ψ and integrating.

### Stationary states

In most problems of interest the potential does not depend on time. The wave function can then be written as Ψ = ψ(x) e^(−iEt/ħ), and the time-dependent equation reduces to the steady-state Schrödinger equation for ψ(x) alone. For such a state |Ψ|² = |ψ|² does not change in time, which is why these are called stationary states. The steady-state equation generally has acceptable solutions only for certain values of E. These values are the eigenvalues of the energy, and the corresponding ψ are the eigenfunctions. Quantisation of energy is not put in by hand, as it was in the Bohr model; it emerges from the requirement that ψ be well behaved.

### Particle in a box

The simplest application is a particle in a box with infinitely high walls a distance L apart. Inside the box U = 0, and outside the particle can never be found, so ψ must vanish at the walls. The solutions are sine waves ψₙ = √(2/L) sin(nπx/L), and the allowed energies are Eₙ = n²π²ħ²/(2mL²), the same result obtained earlier by fitting de Broglie waves into the box. The probability density, however, now has a definite shape. In the ground state the particle is most likely to be found near the centre, while in the state n = 2 it is never found at the centre at all, behaviour quite unlike a classical particle, which is equally likely to be anywhere in the box.

### Finite potential well

If the walls are of finite height U, the wave function no longer has to vanish at them. Outside the box, where E < U, the solutions of the Schrödinger equation decay exponentially, and ψ leaks a short way into the walls. The particle therefore has a small probability of being found in a region where classical physics says it cannot go, and because the wave is less confined, the energy levels are slightly lower than in the infinite box. Only a finite number of bound states exist.

### Tunnelling

The same exponential decay leads to tunnelling. When a particle meets a barrier of height U greater than its energy, the wave function decreases exponentially inside the barrier, but if the barrier is thin it has not fallen to zero by the far side, and a small transmitted wave emerges. The transmission probability is roughly T ≈ e^(−2κL), with κ = √(2m(U − E))/ħ, so it depends very sensitively on the barrier width and height. Tunnelling explains the alpha decay of nuclei and is the working principle of the scanning tunnelling microscope.

### Harmonic oscillator

The last important system is the harmonic oscillator, in which the potential is U = ½kx². This describes any system vibrating about a stable equilibrium, such as the atoms in a molecule. Solving the Schrödinger equation gives energies Eₙ = (n + ½)hν, with n = 0, 1, 2, …. The levels are equally spaced by hν, as Planck had assumed for his oscillators, but there is an important difference: the lowest energy is not zero but ½hν. This zero-point energy is required by the uncertainty principle, since an oscillator at rest at the bottom of its well would have both a definite position and a definite momentum.

## Summary

### 5.1 Quantum mechanics

- Classical mechanics is the limit of quantum mechanics for large masses and energies, where λ = h/p is tiny.
- The **wave function Ψ(x, t)** contains everything that can be known. |Ψ|² is the probability density (Born).
- **Normalisation:** ∫|Ψ|² dV = 1 over all space.
- **A well-behaved Ψ must:** (1) be continuous and single-valued; (2) have continuous derivative ∂Ψ/∂x wherever the potential is finite; (3) be normalisable, so Ψ → 0 as x → ±∞.
- Probability of finding the particle between x₁ and x₂ is ∫|Ψ|² dx from x₁ to x₂.

### 5.2 The wave equation

The classical wave equation is ∂²y/∂x² = (1/v²)∂²y/∂t². Its free-wave solutions can be written in complex form y = A e^(−iω(t − x/v)). For a physical wave only the real part matters, but for Ψ the complex form is essential.

### 5.3 Schrödinger's equation: time-dependent form

**Motivation** (not a derivation; it is a postulate checked by experiment). Write a free-particle wave with E = ħω and p = ħk:

```latex
\Psi = A\,e^{-(i/\hbar)(Et - px)} \;\Rightarrow\; \frac{\partial^2\Psi}{\partial x^2} = -\frac{p^2}{\hbar^2}\Psi, \qquad \frac{\partial\Psi}{\partial t} = -\frac{iE}{\hbar}\Psi
```

Insert these into E = p²/2m + U and assume the result holds for any U:

```latex
i\hbar\,\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U\Psi
```

- It is first order in time, so Ψ at one time fixes Ψ at all later times.
- It is **linear**: if Ψ₁ and Ψ₂ are solutions, so is a₁Ψ₁ + a₂Ψ₂.
- Ψ is necessarily complex (the i on the left).
- The slides give a second motivating route (`QM.tex:283`) and list these features at `:297`.

### 5.4 Linearity and superposition

If Ψ = Ψ₁ + Ψ₂, then |Ψ|² = |Ψ₁|² + |Ψ₂|² + 2 Re(Ψ₁\*Ψ₂). The last term is the **interference term**, and it is what produces the double-slit fringes for electrons. **Amplitudes add, not probabilities.**

### 5.5 Expectation values

The expectation value is the average of many measurements on identically prepared systems:

```latex
\langle x\rangle = \int_{-\infty}^{\infty} x\,|\Psi|^2\,dx, \qquad \langle G(x)\rangle = \int_{-\infty}^{\infty} \Psi^*\,G(x)\,\Psi\,dx
```

### 5.6 Operators

Quantities like momentum and energy become operators that act on Ψ:

```latex
\hat p = -i\hbar\,\frac{\partial}{\partial x}, \qquad \hat E = i\hbar\,\frac{\partial}{\partial t}, \qquad \hat H = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + U
```

- ⟨p⟩ = ∫Ψ\* (−iħ ∂/∂x) Ψ dx. Always put the operator between Ψ\* and Ψ, in that order.
- The Schrödinger equation is just ÊΨ = ĤΨ: the energy operator equals the Hamiltonian.

### 5.7 Schrödinger's equation: steady-state form

If U doesn't depend on time, separate Ψ(x, t) = ψ(x) e^(−iEt/ħ). Then |Ψ|² = |ψ|² doesn't change in time (a **stationary state**), and ψ obeys

```latex
\frac{d^2\psi}{dx^2} + \frac{2m}{\hbar^2}\,(E - U)\,\psi = 0
```

- This is an **eigenvalue equation**, Ĥψ = Eψ. Acceptable (well-behaved) solutions exist only for certain energies Eₙ, the **eigenvalues**. The matching ψₙ are the **eigenfunctions**.
- Energy quantisation comes from requiring ψ to be well behaved, not from an extra postulate.

### 5.8 Particle in a box

U = 0 for 0 < x < L, U = ∞ outside. ψ must be 0 at the walls.

- Inside, d²ψ/dx² = −k²ψ with k = √(2mE)/ħ, so ψ = A sin kx + B cos kx.
- ψ(0) = 0 gives B = 0. ψ(L) = 0 gives kL = nπ.

```latex
E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} = \frac{n^2h^2}{8mL^2}, \qquad \psi_n(x) = \sqrt{\frac{2}{L}}\,\sin\frac{n\pi x}{L}, \qquad n = 1, 2, 3, \dots
```

- A = √(2/L) comes from normalisation, ∫₀ᴸ A² sin²(nπx/L) dx = A²L/2 = 1.
- **Probability density** |ψₙ|²: for n = 1 the particle is most likely in the middle. For n = 2 it is never found at the middle (a node). Classically every position is equally likely; at large n the quantum density averages to that (correspondence).
- ⟨x⟩ = L/2 for every n, by symmetry.
- ψₙ is not a momentum eigenfunction: sin kx is a mix of e^(ikx) and e^(−ikx), so p = ±ħk with equal chances and ⟨p⟩ = 0, while p² has the definite value 2mEₙ.
- **3-D box** (`QM.tex:346`): E = (π²ħ²/2mL²)(n₁² + n₂² + n₃²) for a cube. Different (n₁, n₂, n₃) with the same sum have the same energy: **degeneracy**, e.g. (1,1,2), (1,2,1) and (2,1,1).

### 5.9 Finite potential well

Walls of finite height U. For E < U, outside the well (E − U) < 0, so the solutions are exponentials:

```latex
\psi = C e^{-ax}\ (x > L), \qquad a = \frac{\sqrt{2m(U-E)}}{\hbar}
```

- ψ and dψ/dx must match at the walls. The wave function **penetrates the walls**, decaying over a distance about 1/a.
- The wave is effectively a bit longer than in the infinite box, so **each energy level is lower**.
- There are only a finite number of bound states. Classically the particle could never be in the walls.

### 5.10 Tunnel effect

A particle with E < U meets a barrier of height U and width L. Classically it always bounces back. Quantum mechanically ψ decays inside but is not zero at the far side, so there is a chance of getting through.

```latex
T \approx e^{-2k_2L}, \qquad k_2 = \frac{\sqrt{2m(U-E)}}{\hbar}
```

- T falls **exponentially** with barrier width and with √(mass × energy deficit). A small change in L or U changes T by a large factor.
- Reflection probability R = 1 − T. Even for E > U there is some reflection, unlike classical physics.
- **Examples:** alpha decay (alphas tunnel out of the nucleus; Gamow, 1928), the tunnel diode, the scanning tunnelling microscope, fusion in the Sun, and ammonia inversion.
- **The appendix** solves it exactly: write ψ in the three regions (incoming plus reflected wave, decaying plus growing exponential, transmitted wave), match ψ and dψ/dx at both edges, and get T = \[1 + U² sinh²(k₂L)/(4E(U − E))\]⁻¹. For a wide barrier (k₂L ≫ 1) this reduces to T ≈ e^(−2k₂L) up to a prefactor.

### 5.11 Harmonic oscillator

U = ½kx², so classically the frequency is ν = (1/2π)√(k/m). The Schrödinger equation has well-behaved solutions only for

```latex
E_n = \left(n + \tfrac12\right)h\nu, \qquad n = 0, 1, 2, \dots
```

- The levels are **evenly spaced** by hν (Planck's assumption in 2.2 came close, but missed the ½).
- **Zero-point energy** E₀ = ½hν. The oscillator is never at rest, which matches the uncertainty principle. It is why helium stays liquid at 0 K at normal pressure.
- ψₙ = (Hermite polynomial) × e^(−y²/2) with y a scaled x. ψ₀ is a Gaussian, most likely at x = 0.
- **Classical comparison:** a classical oscillator spends most time at its turning points. The quantum ground state peaks at the centre and leaks past the turning points, but for large n |ψ|² approaches the classical distribution.
- **Use:** molecular vibrations, atoms in solids. Any potential near a minimum looks like ½kx² (as in chunk 2).

### What to be able to do without notes

- List the conditions for a well-behaved ψ.
- Write the time-dependent and steady-state Schrödinger equations, and motivate the first from a free-particle wave.
- Define and calculate expectation values; write the momentum and energy operators.
- Solve the infinite box completely: Eₙ, normalised ψₙ, sketch |ψₙ|², ⟨x⟩.
- Explain qualitatively the finite well, tunnelling (T ≈ e^(−2k₂L)) and why it matters.
- State the oscillator levels and zero-point energy and compare with the classical oscillator.

## Questions

The style follows your midsem papers and Quiz-1. Points are in brackets. Use hc = 1240 eV nm, ħc = 197 eV nm, mₑc² = 0.511 MeV, h = 4.14 × 10⁻¹⁵ eV s.

### A. State and explain (2–3 points)

1. (3) What conditions must a wave function satisfy to be physically acceptable? Why?
2. (2) Write the time-dependent Schrödinger equation in one dimension and name each term.
3. (2) Why must the wave function be complex?
4. (2) What does the linearity of the Schrödinger equation imply? Why does it lead to interference?
5. (2) What is an expectation value? Write ⟨x⟩ and ⟨p⟩.
6. (2) What is a stationary state? Why is its probability density constant in time?
7. (3) Explain how energy quantisation follows from the steady-state Schrödinger equation without any extra postulate.
8. (2) Why are the energy levels of a finite well lower than those of an infinite well of the same width?
9. (3) What is quantum tunnelling? Give two real examples.
10. (2) What is zero-point energy? Why is it required by the uncertainty principle?
11. (3) Compare the probability distribution of a quantum harmonic oscillator in its ground state with that of a classical oscillator of the same energy.
12. (2) What is degeneracy? Give an example from the 3-D box.

### B. Derive or show (4–6 points)

13. (4) Starting from a free-particle wave Ψ = Ae^(−(i/ħ)(Et − px)) and E = p²/2m + U, obtain the time-dependent Schrödinger equation.
14. (4) Separate variables to obtain the steady-state Schrödinger equation from the time-dependent one when U = U(x).
15. (6) Solve the Schrödinger equation for a particle in an infinite box of width L: find Eₙ, the normalised ψₙ, and sketch |ψₙ|² for n = 1, 2, 3.
16. (3) Show that ⟨x⟩ = L/2 for every state of the infinite box.
17. (3) Show that e^(ikx) is an eigenfunction of the momentum operator, and that sin kx is not. What does this say about the momentum of a particle in a box?
18. (3) Normalise ψ(x) = Ax(L − x) for 0 ≤ x ≤ L (zero outside).
19. (4) For the finite well, write the form of ψ inside and outside, and state the conditions used to join them.
20. (4) Write the energy levels of a particle in a cubical 3-D box. Find the first three energy levels and their degeneracies.

### C. Numericals without a calculator (3 points each)

21. Find the ground-state energy of an electron in a box 1 nm wide.
22. For a particle in a box, find the probability of finding it in the middle third of the box for n = 1 and n = 2. Compare with the classical answer.
23. An electron with E = 1 eV meets a barrier 5 eV high and 0.5 nm wide. Estimate T. What happens to T if the width doubles?
24. Repeat question 23 for a proton. Comment.
25. A molecule vibrates at 10¹⁴ Hz. Find its zero-point energy and the spacing between levels, in eV.
26. Find the wavelength of the photon emitted when an electron in a 1 nm box drops from n = 3 to n = 1.

### D. Estimate and discuss

27. (3) Explain why a scanning tunnelling microscope can sense height changes of about 0.01 nm.
28. (3) Alpha particles of about 5 MeV escape from nuclei where the Coulomb barrier is about 30 MeV. Explain how, and why half-lives vary from microseconds to billions of years.
29. (2) Explain why the harmonic oscillator is useful for any system near a stable equilibrium.

## Answer key

### A. State and explain

1. Ψ must be continuous and single-valued, so the probability is unambiguous. ∂Ψ/∂x must be continuous where U is finite, or the second derivative in the equation would be infinite. Ψ must be normalisable (∫|Ψ|² = 1), so it must go to zero at infinity and the particle is somewhere.
2. iħ ∂Ψ/∂t = −(ħ²/2m) ∂²Ψ/∂x² + UΨ. The left side is the energy operator acting on Ψ. On the right, the first term is the kinetic energy and the second the potential energy.
3. The equation has i on one side and real terms on the other, so a real Ψ can't satisfy it for a moving particle. Only |Ψ|², which is real, is measurable.
4. Any sum of solutions is a solution. The probability of a sum is |Ψ₁ + Ψ₂|², which contains the cross term 2 Re(Ψ₁\*Ψ₂) that can add or cancel, giving interference.
5. The average result of measuring a quantity on many identical systems. ⟨x⟩ = ∫x|Ψ|² dx and ⟨p⟩ = ∫Ψ\*(−iħ ∂/∂x)Ψ dx.
6. A state Ψ = ψ(x)e^(−iEt/ħ) with a definite energy. |Ψ|² = |ψ|²|e^(−iEt/ħ)|² = |ψ|², since the time factor has modulus 1.
7. The steady-state equation has well-behaved solutions (continuous, finite, normalisable, meeting the boundary conditions) only for certain values of E. Those values are the energy levels. In the box, ψ(L) = 0 forces kL = nπ.
8. ψ leaks into the walls, so the wave is effectively spread over a wider region. A longer wavelength means smaller momentum and lower energy.
9. A particle passes through a barrier higher than its energy because ψ decays inside the barrier but is not zero at the far side. Examples: alpha decay, tunnel diode, STM, fusion in the Sun.
10. The lowest energy of a bound system is above the bottom of the potential (½hν for an oscillator). A particle at rest at the bottom would have Δx = 0 and Δp = 0, which the uncertainty principle forbids.
11. Quantum ground state: a Gaussian peaked at x = 0, with a small chance of being beyond the classical turning points. Classical: least likely at the centre (moving fastest) and most likely at the turning points, never beyond them. At large n the quantum distribution approaches the classical one.
12. Different states with the same energy. In a cubical box, (1,1,2), (1,2,1) and (2,1,1) all have n₁² + n₂² + n₃² = 6, so that level is 3-fold degenerate.

### B. Derive or show

13. ∂²Ψ/∂x² = −(p²/ħ²)Ψ, so p²Ψ = −ħ² ∂²Ψ/∂x². Also ∂Ψ/∂t = −(iE/ħ)Ψ, so EΨ = iħ ∂Ψ/∂t. Multiply E = p²/2m + U by Ψ and substitute: iħ ∂Ψ/∂t = −(ħ²/2m)∂²Ψ/∂x² + UΨ. Then assume it holds for any U.
14. Try Ψ = ψ(x)f(t). Dividing the equation by ψf gives iħ(1/f)(df/dt) = (1/ψ)\[−(ħ²/2m)ψ″ + Uψ\]. The left side depends only on t and the right only on x, so both equal a constant E. Then f = e^(−iEt/ħ) and ψ″ + (2m/ħ²)(E − U)ψ = 0.
15. Inside, ψ″ = −k²ψ with k = √(2mE)/ħ, so ψ = A sin kx + B cos kx. ψ(0) = 0 gives B = 0. ψ(L) = 0 gives kL = nπ. So Eₙ = n²π²ħ²/2mL² = n²h²/8mL². Normalising: A² L/2 = 1, so ψₙ = √(2/L) sin(nπx/L). Sketch: |ψ₁|² is one hump; |ψ₂|² two humps with a zero at L/2; |ψ₃|² three humps with zeros at L/3 and 2L/3.
16. |ψₙ|² is symmetric about x = L/2 (replace x by L − x and sin² is unchanged). So x − L/2 averages to zero and ⟨x⟩ = L/2.
17. −iħ d/dx e^(ikx) = ħk e^(ikx), so it is an eigenfunction with p = ħk. −iħ d/dx sin kx = −iħk cos kx, which is not a multiple of sin kx. Since sin kx = (e^(ikx) − e^(−ikx))/2i, a particle in a box has p = +ħk or −ħk with equal probability, so ⟨p⟩ = 0.
18. ∫₀ᴸ x²(L − x)² dx = L⁵/30, so A = √(30/L⁵).
19. Inside: ψ = A sin kx + B cos kx with k = √(2mE)/ħ. Outside: ψ = Ce^(ax) on the left and De^(−ax) on the right, with a = √(2m(U − E))/ħ. The growing exponentials are dropped so ψ stays finite. At each wall, ψ and dψ/dx must be continuous.
20. E = (π²ħ²/2mL²)(n₁² + n₂² + n₃²). The first three levels are 3 units (1,1,1), not degenerate; 6 units (1,1,2) and its permutations, 3-fold; and 9 units (1,2,2) and its permutations, 3-fold.

### C. Numericals

21. E₁ = (1240)²/(8 × 0.511 × 10⁶ × 1²) eV ≈ 1.54 × 10⁶/4.09 × 10⁶ ≈ 0.38 eV.
22. P = 1/3 − (1/2nπ)\[sin(4nπ/3) − sin(2nπ/3)\]. For n = 1: 1/3 + √3/2π ≈ 0.33 + 0.28 = 0.61. For n = 2: 1/3 − √3/4π ≈ 0.33 − 0.14 = 0.20. Classically it is 1/3 for every state, and the quantum answer tends to 1/3 at large n.
23. k₂ = √(2mₑc²(U − E))/ħc = √(2 × 0.511 × 10⁶ × 4)/197 ≈ 2020/197 ≈ 10 nm⁻¹. 2k₂L ≈ 10, so T ≈ e⁻¹⁰ ≈ 5 × 10⁻⁵. Doubling L doubles the exponent: T ≈ e⁻²⁰ ≈ 2 × 10⁻⁹. T is squared, not halved.
24. The proton is 1836 times heavier, so k₂ is √1836 ≈ 43 times larger and 2k₂L ≈ 430. T ≈ e⁻⁴³⁰, which is effectively zero. Tunnelling matters for light particles and thin barriers.
25. hν = 4.14 × 10⁻¹⁵ × 10¹⁴ ≈ 0.41 eV, so the spacing is 0.41 eV and the zero-point energy is about 0.21 eV.
26. E₃ − E₁ = 8E₁ ≈ 8 × 0.38 ≈ 3.0 eV, so λ ≈ 1240/3.0 ≈ 410 nm (violet).

### D. Estimate and discuss

27. Electrons tunnel across the vacuum gap between the tip and the surface, and T ≈ e^(−2k₂L) with k₂ ≈ 10 nm⁻¹ for a few eV. A change of 0.01 nm in L changes the exponent by 0.2, so the current changes by about 20%, which is easy to measure.
28. The alpha particle tunnels through the Coulomb barrier. T depends exponentially on the barrier width and on √(U − E), and both change a lot with the alpha energy. So a small change in alpha energy (4 to 9 MeV) changes the decay rate by over 20 orders of magnitude (the Geiger–Nuttall law).
29. Expand any U(x) about a minimum x₀: U ≈ U(x₀) + ½U″(x₀)(x − x₀)². The linear term vanishes at a minimum. So small oscillations of any system look like a harmonic oscillator with k = U″(x₀), for example molecular vibrations and atoms in solids.
