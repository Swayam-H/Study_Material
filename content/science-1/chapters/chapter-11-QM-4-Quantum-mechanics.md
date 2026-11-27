# Learn: Quantum mechanics

The Schrödinger equation is to quantum mechanics what $F = ma$ is to classical mechanics: you solve it with the right potential and boundary conditions, and the allowed wave functions and energies come out. This doc covers all of Beiser ch 5 (5.1–5.11, including the tunnel-effect appendix) and the slides `QM.tex:258` to `:443`. The professor wants understanding over derivations, so for each derivation learn the idea and the boxed result first.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## The wave function

Classical mechanics answers questions with certainties: given the initial position and velocity of a body and the forces on it, Newton's laws predict exactly where it will be at any later time. Quantum mechanics cannot do this, because the uncertainty principle forbids us to know the initial position and momentum exactly. What it predicts instead are probabilities. The central object is the wave function $\Psi(x, t)$, which may be complex:

$$\boxed{P(x)\,dx = |\Psi(x, t)|^2\,dx = \Psi^*\Psi\,dx,\qquad \int_{-\infty}^{\infty}|\Psi|^2\,dx = 1\ \ (\text{normalised})}$$

A wave function must also be single-valued and continuous, together with its first derivative $\partial\Psi/\partial x$, wherever the potential is finite. These requirements turn out to be what produces quantisation.

## The postulates (slides "math formulation")

| # | Postulate |
|---|---|
| 1 | The state of a particle is a wave function $\Psi(x, t)$. |
| 2 | It evolves by the Schrödinger equation $i\hbar\,\partial\Psi/\partial t = \hat H\Psi$. |
| 3 | **Born:** $\lvert\Psi\rvert^2dx$ is the probability of finding the particle in $dx$. |
| 4 | Each observable $A$ has an operator $\hat A$; $\langle A\rangle = \int\Psi^*\hat A\,\Psi\,dx$. |
| 5 | **Collapse:** a measurement gives one definite value, and immediately afterwards the state is the one matching that value. |
| 6 | **Superposition:** if $\Psi_1, \Psi_2$ are normalised solutions with $\int\Psi_1^*\Psi_2\,dx = 0$, then $a_1\Psi_1 + a_2\Psi_2$ is a solution, normalised when $\lvert a_1\rvert^2 + \lvert a_2\rvert^2 = 1$. |
| 7 | **Correspondence:** results go over to classical ones for large quantum numbers. |

## Schrödinger's equation

Schrödinger's equation cannot be derived from anything more basic; it is a postulate, justified by its predictions. It can be made plausible in two ways.

**Route 1: from a free-particle wave.** Take $\Psi = A\,e^{-(i/\hbar)(Et - px)}$, using $E = \hbar\omega$ and $p = \hbar k$. Then

$$\frac{\partial^2\Psi}{\partial x^2} = -\frac{p^2}{\hbar^2}\Psi\ \Rightarrow\ p^2\Psi = -\hbar^2\frac{\partial^2\Psi}{\partial x^2},\qquad \frac{\partial\Psi}{\partial t} = -\frac{iE}{\hbar}\Psi\ \Rightarrow\ E\Psi = i\hbar\frac{\partial\Psi}{\partial t}$$

Multiply $E = p^2/2m + U$ by $\Psi$ and substitute:

$$\boxed{i\hbar\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U\Psi}\qquad(\text{time-dependent})$$

**Route 2: from the classical wave equation** (slides "Motivate proof"). A wave of fixed wavelength satisfies $\nabla^2\psi + k^2\psi = 0$ with $k = 2\pi/\lambda$. De Broglie gives $k = p/\hbar$, and $p^2 = 2m(E - V)$:

$$\nabla^2\psi + \frac{2m(E - V)}{\hbar^2}\psi = 0\quad\Longleftrightarrow\quad \left[-\frac{\hbar^2}{2m}\nabla^2 + V\right]\psi = E\psi$$

The equation is **linear** in $\Psi$, so any combination of solutions is a solution. When two solutions are added, $|\Psi_1 + \Psi_2|^2 = |\Psi_1|^2 + |\Psi_2|^2 + 2\,\text{Re}(\Psi_1^*\Psi_2)$, and the cross term is the interference that makes the double-slit fringes for electrons.

## Expectation values and operators

A quantum calculation does not predict the result of a single measurement, but it does predict the average of many identically prepared particles:

$$\boxed{\langle x\rangle = \int_{-\infty}^{\infty}x\,|\Psi|^2\,dx,\qquad \langle G(x)\rangle = \int_{-\infty}^{\infty}G(x)\,|\Psi|^2\,dx}$$

Other quantities need operators, sandwiched between $\Psi^*$ and $\Psi$:

$$\boxed{\hat p = -i\hbar\frac{\partial}{\partial x} = \frac{\hbar}{i}\frac{\partial}{\partial x},\qquad \hat E = i\hbar\frac{\partial}{\partial t},\qquad \hat H = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + U}$$

**Where $\hat p$ comes from** (slides "Momentum operator"). Start from $\langle p\rangle = m\,d\langle x\rangle/dt$.

1. $\dfrac{d\langle x\rangle}{dt} = \displaystyle\int x\left(\Psi^*\partial_t\Psi + \Psi\,\partial_t\Psi^*\right)dx$.
2. Use the Schrödinger equation and its conjugate: the $V$ terms cancel, leaving $\dfrac{d\langle x\rangle}{dt} = \dfrac{i\hbar}{2m}\displaystyle\int x\,\partial_x\left(\Psi^*\Psi_x - \Psi\Psi^*_x\right)dx$.
3. Integrate by parts twice ($\Psi \to 0$ at $\pm\infty$): $\dfrac{d\langle x\rangle}{dt} = -\dfrac{i\hbar}{m}\displaystyle\int\Psi^*\frac{\partial\Psi}{\partial x}\,dx$.
4. Hence $\langle p\rangle = \displaystyle\int\Psi^*\left(-i\hbar\frac{\partial}{\partial x}\right)\Psi\,dx$.

Every other operator is built from $\hat x$ and $\hat p$, e.g. $\hat K = \hat p^2/2m = -(\hbar^2/2m)\,\partial^2/\partial x^2$.

## Stationary states

In most problems the potential does not depend on time. Separate the variables:

$$\begin{gathered}\Psi(x, t) = \psi(x)\,e^{-iEt/\hbar}\quad\Longrightarrow\quad \boxed{-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + U\psi = E\psi} \\[4pt] (\text{steady-state, } \hat H\psi = E\psi)\end{gathered}$$

Then $|\Psi|^2 = |\psi|^2$ does not change in time, which is why these are called stationary states. The equation has acceptable solutions only for certain $E$: these are the **eigenvalues**, and the matching $\psi$ the **eigenfunctions**. Quantisation is not put in by hand, as in the Bohr model; it emerges from the requirement that $\psi$ be well behaved.

## Particle in a box

Infinitely high walls a distance $L$ apart: $U = 0$ inside, and $\psi = 0$ at $x = 0$ and $x = L$. Inside, $\psi'' = -k^2\psi$ with $k = \sqrt{2mE}/\hbar$, so $\psi = A\sin kx$, and $\psi(L) = 0$ forces $kL = n\pi$:

$$\boxed{\psi_n = \sqrt{\frac2L}\,\sin\frac{n\pi x}{L},\qquad E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} = \frac{n^2h^2}{8mL^2},\qquad n = 1, 2, 3, \dots}$$

This matches the de Broglie result, but the probability density now has a definite shape. In the ground state the particle is most likely found near the centre; for $n = 2$ it is never found at the centre at all, quite unlike a classical particle, which is equally likely to be anywhere. For large $n$ the density evens out (correspondence principle).

## Finite potential well

If the walls have finite height $U$, then outside the box, where $E < U$,

$$\psi'' = a^2\psi,\qquad a = \frac{\sqrt{2m(U - E)}}{\hbar},\qquad \psi \propto e^{-a|x|}\ \ (\text{decaying})$$

So $\psi$ leaks a short way into the walls: the particle has a small probability of being where classical physics says it cannot go. Because the wave is less confined, the wavelengths are longer and **the levels are slightly lower** than in the infinite box. Only a **finite number** of bound states exist.

## Tunnelling

**Set-up** (slides "Tunneling"). A particle of energy $E$ meets a barrier of height $U > E$ and width $L$:

| Region | Wave function | Wave number |
|---|---|---|
| I, $x < 0$ | $\psi = Ae^{ik_1x} + Be^{-ik_1x}$ (incident + reflected) | $k_1 = \sqrt{2mE}/\hbar$ |
| II, $0 < x < L$ | $\psi = Ce^{k_2x} + De^{-k_2x}$ | $k_2 = \sqrt{2m(U - E)}/\hbar$ |
| III, $x > L$ | $\psi = Fe^{ik_1x}$ (transmitted only) | $k_1$ |

Matching $\psi$ and $d\psi/dx$ at $x = 0$ and $x = L$ gives four equations:

$$\begin{aligned} A + B &= C + D, & ik_1(A - B) &= k_2(C - D),\\ Ce^{k_2L} + De^{-k_2L} &= Fe^{ik_1L}, & k_2\left(Ce^{k_2L} - De^{-k_2L}\right) &= ik_1Fe^{ik_1L}. \end{aligned}$$

For a wide barrier the transmission probability is

$$\boxed{T = \frac{|F|^2}{|A|^2} \approx e^{-2k_2L},\qquad k_2 = \frac{\sqrt{2m(U - E)}}{\hbar}}$$

It depends very sensitively on the width and height. Tunnelling explains the alpha decay of nuclei and is the working principle of the **scanning tunnelling microscope** (STM; the slide's "SEM" is a slip).

## Harmonic oscillator

The potential $U = \tfrac12kx^2$, with $\omega = \sqrt{k/m}$, describes any system vibrating about a stable equilibrium, such as the atoms in a molecule.

**How it is solved** (slides; know the steps, not every line).

1. Put $x = by$ with $b = \sqrt{\hbar/m\omega}$: the equation becomes $\psi_{yy} + (\alpha - y^2)\psi = 0$, with $\alpha = 2E/\hbar\omega$.
2. For large $|y|$, $\psi_{yy} \approx y^2\psi$, so $\psi \sim e^{-y^2/2}$ (the decaying choice).
3. Try $\psi = f(y)\,e^{-y^2/2}$: this gives $f'' - 2yf' + (\alpha - 1)f = 0$.
4. A power series $f = \sum a_ny^n$ gives the recursion
$$a_{n+2} = \frac{2n + 1 - \alpha}{(n + 1)(n + 2)}\,a_n$$
5. If the series never stops, $f \sim e^{y^2}$ and $\psi$ blows up. So it must stop: $\alpha = 2n + 1$.

$$\boxed{E_n = \left(n + \tfrac12\right)\hbar\omega = \left(n + \tfrac12\right)h\nu,\qquad n = 0, 1, 2, \dots,\qquad E_0 = \tfrac12h\nu}$$

The polynomials are the Hermite polynomials $f_0 = 1$, $f_1 = 2y$, $f_2 = 4y^2 - 2$ (the slide labels $n = 2$ with $\alpha = 4$; it should be $\alpha = 5$).

- The levels are **equally spaced** by $h\nu$, as Planck assumed, but the lowest is **not zero**: the zero-point energy $\tfrac12h\nu$ is required by the uncertainty principle, since an oscillator at rest at the bottom would have definite $x$ and $p$.
- The particle has a non-zero chance of being found **beyond the classical turning points**: the slides say about 10% for $n = 0$ (exact value $\text{erfc}(1) \approx 16\%$). This falls as $n$ grows, and the classical distribution returns as $n \to \infty$.

# Reference: Quantum mechanics

Beiser ch 5 (with its tunnel-effect appendix) section by section, with each derivation written out, and the slides' own derivations (`QM.tex:258` to `:443`: the momentum operator, the 3-D box, the oscillator series solution, the barrier boundary conditions) in full. Beiser's in-chapter examples are summarised with their answers; full worked versions are in *HW practice: Beiser chapters 4 to 6*.

## 5.1 Quantum mechanics

**Classical against quantum.** In classical mechanics a particle's future is fixed by its initial position and momentum and the forces on it. In quantum mechanics the uncertainty principle forbids knowing the initial state exactly, so the theory predicts **probabilities**. Example: Bohr says the hydrogen electron is always 5.3 × 10⁻¹¹ m from the nucleus; quantum mechanics says that is the *most probable* distance, and most measurements give something else. Classical mechanics is not a separate theory but an approximation: everyday objects contain so many atoms that departures from average behaviour are unnoticeable.

**The wave function.** Ψ itself has no physical interpretation, but |Ψ|² at a place and time is proportional to the probability of finding the body there then. Momentum, angular momentum and energy can also be extracted from Ψ. The problem of quantum mechanics is to find Ψ when forces restrict the motion.

**Complex Ψ.** Wave functions are usually complex. Write Ψ = A + iB with A, B real; the complex conjugate (replace i by −i) is Ψ* = A − iB, and

$$
|\Psi|^2 = \Psi^*\Psi = A^2 - i^2B^2 = A^2 + B^2 \ge 0
$$

always a positive real number, as a probability density must be.

**Normalisation.** The particle exists somewhere, so ∫|Ψ|² dV must be finite: if it were 0 there would be no particle, and ∞ means nothing. Choosing the constant in Ψ so that |Ψ|² *equals* the probability density P:

$$
\int_{-\infty}^{\infty}|\Psi|^2\,dV = 1 \tag{5.1}
$$

Every acceptable Ψ can be normalised by multiplying by a constant.

**Well-behaved wave functions.** Only these give physically meaningful results:

1. Ψ must be continuous and single-valued everywhere (P has one value at each place and time).
2. ∂Ψ/∂x, ∂Ψ/∂y, ∂Ψ/∂z must be continuous and single-valued everywhere (needed for momentum, 5.6).
3. Ψ must be normalisable, so Ψ → 0 as x, y, z → ±∞.

Model problems can break rule 2: a box with *infinitely* hard walls has a kink in ψ at the walls. Real walls are never infinitely hard, and there the derivative is continuous (compare the finite well, 5.9).

**Probability in a region.** For motion along x:

$$
P_{x_1x_2} = \int_{x_1}^{x_2}|\Psi|^2\,dx \tag{5.2}
$$

**The slides' postulates (`QM.tex:258`).** (1) The state of a system is a wave function Ψ(x, t), possibly complex. (2) It evolves by Schrödinger's equation $i\hbar\,\partial\Psi/\partial t = \hat H\Psi$. (3) Born: |Ψ(x, t)|² dx is the probability of finding the system at x at time t. (4) Every observable has an operator, and its expectation value is $\langle A\rangle = \int\Psi^*\hat A\Psi\,dx$. (5) A measurement gives one result and "collapses" the wave function onto the state with that result.

## 5.2 The wave equation

Schrödinger's equation plays the role in quantum mechanics that F = ma plays in Newtonian mechanics, and it is a wave equation in Ψ. First recall the classical wave equation for a quantity y moving in x at speed v:

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2} \tag{5.3}
$$

It follows from Newton's second law for mechanical waves and from Maxwell's equations for em waves.

**Partial derivatives (box).** ∂f/∂x means differentiate with respect to x holding every other variable fixed. For f = yx²: ∂f/∂x = 2yx, ∂f/∂y = x², ∂²f/∂x² = 2y, ∂²f/∂y² = 0.

**Solutions.** Every solution has the form $F(t \pm x/v)$ for any differentiable F: $t - x/v$ moves in +x, $t + x/v$ in −x. Pulses, wave trains, superpositions and standing waves are all special cases. For a free, undamped (constant A), monochromatic (constant ω) wave in +x:

$$
y = Ae^{-i\omega(t - x/v)} = A\cos\omega\left(t - \frac xv\right) - iA\sin\omega\left(t - \frac xv\right) \tag{5.5, 5.6}
$$

using $e^{-i\theta} = \cos\theta - i\sin\theta$. For a string only the real part, the familiar cosine, means anything.

**Example 5.1 (Beiser): check that (5.5) solves (5.3).** $\partial y/\partial x = (i\omega/v)y$, so $\partial^2y/\partial x^2 = (i\omega/v)^2y = -(\omega^2/v^2)y$. $\partial y/\partial t = -i\omega y$, so $\partial^2y/\partial t^2 = -\omega^2y$. Then $\partial^2y/\partial x^2 = (1/v^2)\,\partial^2y/\partial t^2$. ✓

## 5.3 Schrödinger's equation: time-dependent form

**The free-particle wave.** Ψ is not measurable, so it may be complex. Take the free wave (5.5), and use ω = 2πν and v = νλ:

$$
\Psi = Ae^{-i\omega(t - x/v)} = Ae^{-2\pi i(\nu t - x/\lambda)}
$$

With $E = h\nu = 2\pi\hbar\nu$ and $\lambda = h/p = 2\pi\hbar/p$, $2\pi\nu = E/\hbar$ and $2\pi/\lambda = p/\hbar$:

$$
\Psi = Ae^{-(i/\hbar)(Et - px)} \tag{5.9}
$$

the wave of a free particle with energy E and momentum p moving in +x.

**Differentiate.** Twice in x, once in t:

$$
\frac{\partial^2\Psi}{\partial x^2} = -\frac{p^2}{\hbar^2}\Psi \;\Rightarrow\; p^2\Psi = -\hbar^2\frac{\partial^2\Psi}{\partial x^2} \tag{5.10}
$$

$$
\frac{\partial\Psi}{\partial t} = -\frac{iE}{\hbar}\Psi \;\Rightarrow\; E\Psi = -\frac{\hbar}{i}\frac{\partial\Psi}{\partial t} = i\hbar\frac{\partial\Psi}{\partial t} \tag{5.11}
$$

**Use the energy.** At speeds well below c, the total energy is kinetic plus potential, with U(x, t) standing for the influence of the rest of the universe:

$$
E = \frac{p^2}{2m} + U(x,t) \quad\Rightarrow\quad E\Psi = \frac{p^2\Psi}{2m} + U\Psi \tag{5.12, 5.13}
$$

Substitute (5.10) and (5.11):

$$
i\hbar\,\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U\Psi \tag{5.14}
$$

and in three dimensions

$$
i\hbar\,\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\left(\frac{\partial^2\Psi}{\partial x^2} + \frac{\partial^2\Psi}{\partial y^2} + \frac{\partial^2\Psi}{\partial z^2}\right) + U\Psi \tag{5.15}
$$

**Is it valid?** The route used a free particle (constant U) and then assumed the result for any U(x, y, z, t). That leap has no formal justification, nor does any other route, including Schrödinger's own. So:

> Schrödinger's equation cannot be derived from other basic principles of physics; it is a basic principle in itself.

It is postulated, solved, and checked against experiment, and it agrees remarkably well (for non-relativistic problems; near c a more elaborate theory is needed). It does not add a principle: F = ma follows from it if the quantities are read as averages. Newton's laws weren't derived from anything either.

**The slides' first motivating route (`QM.tex:269`): straight to the steady-state equation.**

1. A wave of wave number k obeys $\nabla^2\psi + k^2\psi = 0$ (the spatial part of the wave equation).
2. De Broglie: $k = 2\pi/\lambda = p/\hbar$, so $\nabla^2\psi + (p/\hbar)^2\psi = 0$, solved by $\psi = e^{ipx/\hbar}$.
3. Free particle: $E = p^2/2m$, and from step 2, $p^2\psi = -\hbar^2\nabla^2\psi$, so $-\dfrac{\hbar^2}{2m}\nabla^2\psi = E\psi$.
4. In a potential, $E = p^2/2m + V(x)$, giving the **time-independent Schrödinger equation**

$$
\left(-\frac{\hbar^2}{2m}\nabla^2 + V(x)\right)\psi(x) = E\psi(x)
$$

**The slides' second route (`QM.tex:283`)** is the one above: $\Psi = e^{i(kx - \omega t)}$ with $k = p/\hbar$ and $\omega = E/\hbar$ (the slide's "ω = ν/2π" should read ω = 2πν), so $\Psi = e^{(i/\hbar)(px - Et)}$; then $\partial_t\Psi = -(i/\hbar)E\Psi$ and $\partial_x^2\Psi = -(p^2/\hbar^2)\Psi$; with $E = p^2/2m + V$ this gives (5.14).

**Features.** First order in time, so Ψ at one instant fixes Ψ at all later times. Linear in Ψ (5.4). The i on the left forces Ψ to be complex.

## 5.4 Linearity and superposition

**Linear** means every term contains Ψ or a derivative of Ψ to the first power, with no term free of Ψ and no Ψ², (∂Ψ/∂x)², and so on. So if Ψ₁ and Ψ₂ are solutions, so is

$$
\Psi = a_1\Psi_1 + a_2\Psi_2
$$

(apply the equation term by term). Wave functions obey the superposition principle like other waves, so they interfere. Sections 3.4 and 3.7 already assumed this.

**Electrons through two slits (Fig. 5.2).** Slit 1 alone gives $P_1 = |\Psi_1|^2$; slit 2 alone gives $P_2 = |\Psi_2|^2$. With both open you might expect $P_1 + P_2$, but **wave functions add, not probabilities**:

$$
P = |\Psi_1 + \Psi_2|^2 = (\Psi_1^* + \Psi_2^*)(\Psi_1 + \Psi_2) = P_1 + P_2 + \Psi_1^*\Psi_2 + \Psi_2^*\Psi_1
$$

The last two terms, together $2\,\mathrm{Re}(\Psi_1^*\Psi_2)$, are the interference terms; they make the alternating bright and dark bands, as for light through a double slit. The same algebra explains radiation from atoms (6.8).

**Normalising a superposition (slides `QM.tex:297`).** If Ψ₁ and Ψ₂ are normalised and orthogonal (∫Ψ₁*Ψ₂ dx = 0, true for eigenstates of different energy), then a₁Ψ₁ + a₂Ψ₂ is normalised when $|a_1|^2 + |a_2|^2 = 1$. The cross terms integrate to zero.

## 5.5 Expectation values

**Definition.** ⟨x⟩ is the average position you would get by measuring x on a great many particles with the same Ψ at the same instant.

**Derivation.** For N₁ particles at x₁, N₂ at x₂, and so on, the average position is the centre of mass:

$$
\bar x = \frac{N_1x_1 + N_2x_2 + \cdots}{N_1 + N_2 + \cdots} = \frac{\sum N_ix_i}{\sum N_i} \tag{5.16}
$$

For one particle replace N\_i by the probability of finding it in dx at x\_i, $P_i = |\Psi_i|^2dx$ (5.17), and turn sums into integrals:

$$
\langle x\rangle = \frac{\int_{-\infty}^{\infty}x|\Psi|^2dx}{\int_{-\infty}^{\infty}|\Psi|^2dx} \;\xrightarrow{\text{normalised}}\; \langle x\rangle = \int_{-\infty}^{\infty}x|\Psi|^2\,dx \tag{5.18, 5.19}
$$

Any function of position, such as the potential energy U(x), works the same way:

$$
\langle G(x)\rangle = \int_{-\infty}^{\infty}G(x)|\Psi|^2\,dx \tag{5.20}
$$

**Example 5.2 (Beiser).** ψ = ax for 0 ≤ x ≤ 1, zero elsewhere. (a) $P(0.45 \le x \le 0.55) = a^2\int_{0.45}^{0.55}x^2dx = a^2[x^3/3]_{0.45}^{0.55} = 0.0251a^2$. (b) $\langle x\rangle = a^2\int_0^1x^3dx = a^2/4$. (Normalising, $a^2\int_0^1x^2dx = a^2/3 = 1$, so a² = 3, giving P = 0.0753 and ⟨x⟩ = 3/4.)

**Why momentum and energy need something else.** ⟨p⟩ can't be ∫p(x)|Ψ|²dx, because no function p(x) can exist: if x is specified exactly (Δx = 0), Δp ≥ ħ/2Δx forbids a definite p. Likewise ΔEΔt ≥ ħ/2 forbids E(t). Classically, solving the equations gives x(t), p(x, t) and E(x, t), the whole future; in quantum mechanics you get only Ψ, and the future is probabilities. Operators (5.6) give ⟨p⟩ and ⟨E⟩.

## 5.6 Operators

**The hint.** Differentiate the free-particle wave (5.9):

$$
\frac{\partial\Psi}{\partial x} = \frac{i}{\hbar}p\Psi, \qquad \frac{\partial\Psi}{\partial t} = -\frac{i}{\hbar}E\Psi \quad\Rightarrow\quad p\Psi = \frac{\hbar}{i}\frac{\partial\Psi}{\partial x}, \qquad E\Psi = i\hbar\frac{\partial\Psi}{\partial t} \tag{5.21, 5.22}
$$

So momentum corresponds to the operator (ħ/i)∂/∂x and energy to iħ∂/∂t. An **operator** tells you what to do to whatever follows it.

$$
\hat p = \frac{\hbar}{i}\frac{\partial}{\partial x} = -i\hbar\frac{\partial}{\partial x}, \qquad \hat E = i\hbar\frac{\partial}{\partial t} \tag{5.23, 5.24}
$$

(Eq. 5.22 was on the postmark of the Austrian stamp for Schrödinger's 100th birthday.)

**They are general, not just for free particles.** Write E = KE + U as an operator equation, $\hat E = \widehat{KE} + \hat U$, with $\hat U = U$. Since KE = p²/2m,

$$
\widehat{KE} = \frac{\hat p^2}{2m} = \frac{1}{2m}\left(\frac{\hbar}{i}\frac{\partial}{\partial x}\right)^2 = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} \tag{5.26}
$$

so $\hat E = \widehat{KE} + \hat U$ reads $i\hbar\,\partial/\partial t = -(\hbar^2/2m)\,\partial^2/\partial x^2 + U$. Acting on Ψ gives Schrödinger's equation (5.14). **Postulating the operators is equivalent to postulating Schrödinger's equation.** In 3-D (slides) $\widehat{KE} = -\frac{\hbar^2}{2m}\left(\partial_x^2 + \partial_y^2 + \partial_z^2\right)$.

**Expectation values with operators.**

$$
\langle p\rangle = \int_{-\infty}^{\infty}\Psi^*\hat p\Psi\,dx = \frac{\hbar}{i}\int_{-\infty}^{\infty}\Psi^*\frac{\partial\Psi}{\partial x}\,dx, \qquad \langle E\rangle = \int_{-\infty}^{\infty}\Psi^*\hat E\Psi\,dx = i\hbar\int_{-\infty}^{\infty}\Psi^*\frac{\partial\Psi}{\partial t}\,dx \tag{5.28, 5.29}
$$

**Why the order Ψ* (operator) Ψ.** The alternatives fail. $\int\hat p(\Psi^*\Psi)\,dx = (\hbar/i)[\Psi^*\Psi]_{-\infty}^{\infty} = 0$ always, since Ψ → 0 at ±∞. And $\int\Psi^*\Psi\,\hat p\,dx$ leaves the operator with nothing to act on. For x or U(x) the order doesn't matter; for differential operators it does.

**General rule.** Express the observable G in terms of x and p, replace p by (ħ/i)∂/∂x, and

$$
\langle G(x,p)\rangle = \int_{-\infty}^{\infty}\Psi^*\hat G\Psi\,dx \tag{5.30}
$$

All the information the uncertainty principle permits is in Ψ. Slides: all operators can be built from position and momentum operators, $\hat K(\hat r, \hat p)$.

### The slides' derivation of the momentum operator (`QM.tex:309`)

Classically p = m dx/dt. Ask what ⟨p⟩ = m d⟨x⟩/dt is in terms of Ψ. Write C = ħ²/2m and subscripts for partial derivatives.

**Step 1. Schrödinger's equation and its conjugate.**

$$
i\hbar\Psi_t = -C\Psi_{xx} + V\Psi, \qquad -i\hbar\Psi^*_t = -C\Psi^*_{xx} + V\Psi^*
$$

**Step 2. Differentiate ⟨x⟩.** x is just an integration variable, so

$$
\frac{d\langle x\rangle}{dt} = \int x\left(\Psi^*\Psi_t + \Psi^*_t\Psi\right)dx
$$

From step 1, $\Psi_t = (1/i\hbar)(-C\Psi_{xx} + V\Psi)$ and $\Psi^*_t = -(1/i\hbar)(-C\Psi^*_{xx} + V\Psi^*)$. The V terms cancel:

$$
\Psi^*\Psi_t + \Psi^*_t\Psi = -\frac{C}{i\hbar}\left(\Psi^*\Psi_{xx} - \Psi\Psi^*_{xx}\right) = -\frac{C}{i\hbar}\,\frac{\partial}{\partial x}\left(\Psi^*\Psi_x - \Psi\Psi^*_x\right)
$$

(check: the derivative of the bracket is $\Psi^*_x\Psi_x + \Psi^*\Psi_{xx} - \Psi_x\Psi^*_x - \Psi\Psi^*_{xx}$).

**Step 3. Integrate by parts** ("uv rule"), with the boundary term zero because Ψ → 0 at ±∞:

$$
\frac{d\langle x\rangle}{dt} = -\frac{C}{i\hbar}\int x\,\partial_x(\Psi^*\Psi_x - \Psi\Psi^*_x)\,dx = +\frac{C}{i\hbar}\int(\Psi^*\Psi_x - \Psi\Psi^*_x)\,dx
$$

**Step 4. One more integration by parts** gives $\int\Psi\Psi^*_x\,dx = -\int\Psi^*\Psi_x\,dx$, so the two terms are equal:

$$
\frac{d\langle x\rangle}{dt} = \frac{2C}{i\hbar}\int\Psi^*\frac{\partial\Psi}{\partial x}\,dx = \frac{\hbar}{im}\int\Psi^*\frac{\partial\Psi}{\partial x}\,dx
$$

**Step 5.** Multiply by m:

$$
\langle p\rangle = m\frac{d\langle x\rangle}{dt} = \int\Psi^*\left(\frac{\hbar}{i}\frac{\partial}{\partial x}\right)\Psi\,dx \quad\Rightarrow\quad \hat p = \frac{\hbar}{i}\frac{\partial}{\partial x}
$$

(The slide's last line prints h/i; it should be ħ/i.) This also shows the classical relation p = m dx/dt holds for averages, the start of the "F = ma for averages" statement in 5.3.

## 5.7 Schrödinger's equation: steady-state form

**Separating out time.** When U depends only on position, the free-particle wave function already shows the pattern:

$$
\Psi = Ae^{-(i/\hbar)(Et - px)} = Ae^{-(iE/\hbar)t}e^{(ip/\hbar)x} = \psi\,e^{-(iE/\hbar)t} \tag{5.31}
$$

The time dependence of every wave function with a time-independent U has this same form. **Why** (slides `QM.tex:297`): try $\Psi(x,t) = \psi(x)\chi(t)$ in (5.14) and divide by ψχ:

$$
i\hbar\frac{1}{\chi}\frac{d\chi}{dt} = \frac{1}{\psi}\left(-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + U\psi\right)
$$

The left side depends only on t, the right only on x, so both equal a constant, which is the energy E. Then $\chi(t) = \chi(0)e^{-iEt/\hbar}$, and

$$
-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + U\psi = E\psi \quad\Longleftrightarrow\quad \frac{d^2\psi}{dx^2} + \frac{2m}{\hbar^2}(E - U)\psi = 0 \tag{5.32}
$$

In 3-D:

$$
\frac{\partial^2\psi}{\partial x^2} + \frac{\partial^2\psi}{\partial y^2} + \frac{\partial^2\psi}{\partial z^2} + \frac{2m}{\hbar^2}(E - U)\psi = 0 \tag{5.33}
$$

**Stationary states.** $|\Psi|^2 = \psi^*e^{+iEt/\hbar}\psi e^{-iEt/\hbar} = |\psi|^2$: the probability density does not change in time.

**Quantisation appears naturally.** If the steady-state equation has well-behaved solutions, each belongs to a specific E. Energy quantisation is part of the theory and characteristic of all stable systems. Analogy: a string of length L fixed at both ends must have y = 0 at the ends (a **boundary condition**), and only wavelengths $\lambda_n = 2L/(n+1)$, n = 0, 1, 2, … survive (Fig. 5.3).

**Eigenvalues and eigenfunctions.** The energies E\_n for which the steady-state equation can be solved are the **eigenvalues**; the matching ψ\_n are the **eigenfunctions** (German *Eigenwert*, "proper value"). Hydrogen's $E_n = -me^4/(32\pi^2\varepsilon_0^2\hbar^2n^2)$ are eigenvalues (ch 6). Angular momentum is also quantised in stable systems, with eigenvalues $L = \sqrt{l(l+1)}\,\hbar$, l = 0, 1, …, n − 1.

**A variable that is not quantised** (for example the electron's position in hydrogen) gives a spread of results whose average is ⟨G⟩ = ∫G|ψ|²dx. The probability of finding the electron is smeared out; the electron is not. Every measurement finds a whole electron.

**Operators and eigenvalues.** G is quantised to the values G\_n when the wave functions satisfy

$$
\hat G\psi_n = G_n\psi_n \qquad (G_n \text{ real}) \tag{5.34}
$$

It is a postulate that a measurement of G can then yield only one of the G\_n, and if every system is in the state ψ\_k, every measurement gives G\_k.

**Example 5.3 (Beiser).** ψ = e^(2x) is an eigenfunction of d²/dx²: $\frac{d^2}{dx^2}e^{2x} = \frac{d}{dx}2e^{2x} = 4e^{2x} = 4\psi$, eigenvalue 4.

**The Hamiltonian.** From (5.25) and (5.26),

$$
\hat H = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + U, \qquad \hat H\psi_n = E_n\psi_n \tag{5.35, 5.36}
$$

named after the classical Hamiltonian (total energy in terms of coordinates and momenta; chapter 4, Hamiltonian dynamics). The energy levels are the eigenvalues of Ĥ.

**Table 5.1: operators.**

| Quantity | Operator |
| --- | --- |
| Position x | x |
| Momentum p | $(\hbar/i)\,\partial/\partial x$ |
| Potential energy U(x) | U(x) |
| Kinetic energy p²/2m | $-(\hbar^2/2m)\,\partial^2/\partial x^2$ |
| Total energy E | $i\hbar\,\partial/\partial t$ |
| Total energy (Hamiltonian) | $-(\hbar^2/2m)\,\partial^2/\partial x^2 + U(x)$ |

## 5.8 Particle in a box

**Setup.** A particle moves along x between infinitely hard walls at x = 0 and x = L. It loses no energy at the walls. Formally U = ∞ outside and U = 0 inside (Fig. 5.4). It can't have infinite energy, so **ψ = 0 outside**. (Slides `QM.tex:323`: in regions $x < 0$ and $x > L$ the term Vψ is infinite while Eψ is finite, so the only solution is ψ = 0.)

**Inside.** With U = 0, (5.32) becomes

$$
\frac{d^2\psi}{dx^2} + \frac{2mE}{\hbar^2}\psi = 0 \quad\text{i.e.}\quad \frac{d^2\psi}{dx^2} = -k^2\psi, \quad k = \frac{\sqrt{2mE}}{\hbar} \tag{5.37}
$$

whose solution is

$$
\psi = A\sin kx + B\cos kx \tag{5.38}
$$

**Boundary conditions.** ψ(0) = 0: sin 0 = 0, cos 0 = 1, so B = 0. ψ(L) = 0: A sin kL = 0 with A ≠ 0, so kL = nπ:

$$
\frac{\sqrt{2mE_n}}{\hbar}L = n\pi, \qquad n = 1, 2, 3, \dots \tag{5.39}
$$

(n = 0 gives ψ = 0 everywhere, no particle; negative n gives the same states as positive.)

**Energies.** Solve (5.39):

$$
E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} = \frac{n^2h^2}{8mL^2}, \qquad n = 1, 2, 3, \dots \tag{5.40}
$$

the same as the standing-wave result (3.18), with the same meaning: quantised, no zero energy, noticeable only for small m and L.

**Wave functions and normalisation.** $\psi_n = A\sin(n\pi x/L)$. These are finite, single-valued and continuous, with continuous derivatives except at the walls. Normalise using $\sin^2\theta = \tfrac12(1 - \cos 2\theta)$:

$$
\int_0^L A^2\sin^2\frac{n\pi x}{L}\,dx = \frac{A^2}{2}\left[\int_0^Ldx - \int_0^L\cos\frac{2n\pi x}{L}\,dx\right] = \frac{A^2}{2}\left[x - \frac{L}{2n\pi}\sin\frac{2n\pi x}{L}\right]_0^L = \frac{A^2L}{2} \tag{5.43}
$$

Setting this equal to 1:

$$
A = \sqrt{\frac2L}, \qquad \psi_n = \sqrt{\frac2L}\,\sin\frac{n\pi x}{L} \tag{5.46}
$$

(Slides `QM.tex:336`: B = √(2/L) in their labelling, and E\_n = n²E₁ with E₁ = h²/8mL².)

**Probability densities (Fig. 5.5).**

- |ψ\_n|² = 0 at both walls in every state.
- |ψ₁|² is largest, 2/L, at the centre: the ground-state particle is most likely in the middle.
- |ψ₂|² = 0 at the centre: in the n = 2 state the particle is *never* there.
- ψ\_n has n − 1 nodes inside the box (slides: "notice the number of nodes").
- Classically every position is equally likely. At large n the rapid wiggles of |ψ\_n|² average to the uniform 1/L (correspondence principle).
- ψ\_n looks like the vibrations of a string fixed at both ends because the two obey equations of the same form with the same restrictions.

**Example 5.4 (Beiser).** Probability between 0.45L and 0.55L:

$$
P = \frac2L\int_{x_1}^{x_2}\sin^2\frac{n\pi x}{L}\,dx = \left[\frac xL - \frac{1}{2n\pi}\sin\frac{2n\pi x}{L}\right]_{x_1}^{x_2}
$$

n = 1: P = 0.198 (19.8%), twice the classical 10%. n = 2: P = 0.0065 (0.65%), consistent with the node at the centre.

**Example 5.5 (Beiser): ⟨x⟩.** Using $\int x\sin^2ax\,dx = \frac{x^2}{4} - \frac{x\sin 2ax}{4a} - \frac{\cos 2ax}{8a^2}$ with a = nπ/L:

$$
\langle x\rangle = \frac2L\int_0^Lx\sin^2\frac{n\pi x}{L}\,dx = \frac2L\left[\frac{x^2}{4} - \frac{x\sin(2n\pi x/L)}{4n\pi/L} - \frac{\cos(2n\pi x/L)}{8(n\pi/L)^2}\right]_0^L = \frac2L\cdot\frac{L^2}{4} = \frac L2
$$

(sin 2nπ = 0, and cos 2nπ = cos 0 = 1, so the cosine terms cancel.) The average position is the middle in every state, even when |ψ|² = 0 there: ⟨x⟩ is an average, set by the symmetry of |ψ|².

**Momentum.** With $d\psi_n/dx = \sqrt{2/L}\,(n\pi/L)\cos(n\pi x/L)$ and $\int\sin ax\cos ax\,dx = \sin^2ax/2a$:

$$
\langle p\rangle = \int_0^L\psi_n\frac{\hbar}{i}\frac{d\psi_n}{dx}\,dx = \frac{2n\pi\hbar}{iL^2}\int_0^L\sin\frac{n\pi x}{L}\cos\frac{n\pi x}{L}\,dx = \frac{\hbar}{iL}\left[\sin^2\frac{n\pi x}{L}\right]_0^L = 0
$$

But $E_n = p^2/2m$ suggests

$$
p_n = \pm\sqrt{2mE_n} = \pm\frac{n\pi\hbar}{L} \tag{5.47}
$$

The ± is the answer: the particle moves back and forth, so the average is $\tfrac12(n\pi\hbar/L) + \tfrac12(-n\pi\hbar/L) = 0$.

**Momentum eigenfunctions.** ψ\_n is not one: $\hat p\psi_n = \sqrt{2/L}\,(\hbar/i)(n\pi/L)\cos(n\pi x/L)$, which is not a number times ψ\_n. Use $\sin\theta = (e^{i\theta} - e^{-i\theta})/2i$ to split ψ\_n into

$$
\psi_n^{+} = \frac{1}{2i}\sqrt{\frac2L}\,e^{in\pi x/L}, \qquad \psi_n^{-} = -\frac{1}{2i}\sqrt{\frac2L}\,e^{-in\pi x/L} \tag{5.49, 5.50}
$$

Then $\hat p\psi_n^{+} = \frac{\hbar}{i}\cdot\frac{in\pi}{L}\psi_n^{+} = +\frac{n\pi\hbar}{L}\psi_n^{+}$ and likewise $\hat p\psi_n^{-} = -\frac{n\pi\hbar}{L}\psi_n^{-}$. Two momentum eigenfunctions per energy level, one for each direction, with eigenvalues ±nπħ/L, as (5.47) said.

### The 3-D box (slides `QM.tex:346`)

**Setup.** $0 \le x \le L_x$, $0 \le y \le L_y$, $0 \le z \le L_z$, with V = 0 inside and ∞ outside, so ψ = 0 outside. With C = ħ²/2m, inside:

$$
-C\left(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}\right)\psi = E\psi
$$

**Separate.** Try $\psi = \psi_1(x)\psi_2(y)\psi_3(z)$ and divide by ψ:

$$
\frac{\psi_1''}{\psi_1} + \frac{\psi_2''}{\psi_2} + \frac{\psi_3''}{\psi_3} = -\frac{E}{C}
$$

Each term depends on a different variable, so each is a constant: $\psi_1'' = -k_x^2\psi_1$, and so on, with $C(k_x^2 + k_y^2 + k_z^2) = E$. Each is a 1-D box problem, so $k_x = n_1\pi/L_x$, $k_y = n_2\pi/L_y$, $k_z = n_3\pi/L_z$:

$$
\psi = \sqrt{\frac{8}{L_xL_yL_z}}\,\sin\frac{n_1\pi x}{L_x}\,\sin\frac{n_2\pi y}{L_y}\,\sin\frac{n_3\pi z}{L_z}, \qquad E = \frac{h^2}{8m}\left(\frac{n_1^2}{L_x^2} + \frac{n_2^2}{L_y^2} + \frac{n_3^2}{L_z^2}\right)
$$

with each n = 1, 2, 3, …. (The slide writes $L_y$ in the last sine; it should be $L_z$.) A 3-D problem needs **three quantum numbers**, one per boundary condition, which is why hydrogen has three (6.1).

**Degeneracy in a cube** (L\_x = L\_y = L\_z = L). In units of h²/8mL², E = n₁² + n₂² + n₃²:

| E | (n₁, n₂, n₃) | Degeneracy |
| --- | --- | --- |
| 3 | (1,1,1) | 1 |
| 6 | (2,1,1), (1,2,1), (1,1,2) | 3 |
| 9 | (2,2,1) and permutations | 3 |
| 11 | (3,1,1) and permutations | 3 |
| 12 | (2,2,2) | 1 |
| 14 | (3,2,1) and permutations | 6 |

Different states with the same energy are **degenerate**; the symmetry of the cube causes it, and stretching one side lifts it.

## 5.9 Finite potential well

**Setup (Fig. 5.7).** A well of width L (0 < x < L) with walls of height U, and a particle with E < U. Classically it bounces between the walls and never enters regions I (x < 0) or III (x > L). Quantum mechanically it can.

**Outside the well.** In I and III, (5.32) with E − U < 0:

$$
\frac{d^2\psi}{dx^2} - a^2\psi = 0, \qquad a = \frac{\sqrt{2m(U-E)}}{\hbar} \tag{5.53, 5.54}
$$

Solutions are real exponentials, $\psi_I = Ce^{ax} + De^{-ax}$ and $\psi_{III} = Fe^{ax} + Ge^{-ax}$. Ψ must stay finite: $e^{-ax} \to \infty$ as $x \to -\infty$ (so D = 0) and $e^{ax} \to \infty$ as $x \to +\infty$ (so F = 0):

$$
\psi_I = Ce^{ax}, \qquad \psi_{III} = Ge^{-ax} \tag{5.57, 5.58}
$$

The wave function **decays exponentially** into the walls, with penetration depth about 1/a.

**Inside.** As in the box, $\psi_{II} = A\sin(\sqrt{2mE}\,x/\hbar) + B\cos(\sqrt{2mE}\,x/\hbar)$. Now ψ is not zero at the walls (it equals C at x = 0 and Ge^(−aL) at x = L), so **both** sine and cosine are allowed.

**Matching.** ψ and dψ/dx must be continuous at x = 0 and x = L: the inside and outside pieces must meet with the same value and the same slope. Only certain energies E\_n allow a smooth fit, so the energy is still quantised (Fig. 5.8).

**Why the levels are lower.** The wave spills into the walls, so it is effectively longer than in an infinite well of the same width. Longer λ means smaller p = h/λ and so a **lower energy** for each n.

**More (beyond Beiser's text).** Taking the well centred on the origin, the even states satisfy $k\tan(kL/2) = a$ and the odd ones $-k\cot(kL/2) = a$, with $k = \sqrt{2mE}/\hbar$; these are solved graphically. There is always at least one bound state, and only a finite number; a deeper or wider well holds more. The particle has a real chance of being found inside the walls, where classically KE < 0.

## 5.10 Tunnel effect

**Idea.** A barrier of height U and *finite* width L (Fig. 5.9). A particle with E < U would always bounce back classically. Quantum mechanically ψ decays inside the barrier but is not zero at the far side, so some of the wave gets through: the particle **tunnels**. The higher and wider the barrier, the smaller the chance.

**Slides (`QM.tex:390`).** The oscillator already showed probability beyond the classical turning points, where KE < 0. At each edge of the barrier, ψ and dψ/dx must be continuous.

**Approximate transmission probability** (derived in the appendix below):

$$
T \approx e^{-2k_2L}, \qquad k_2 = \frac{\sqrt{2m(U-E)}}{\hbar} \tag{5.60, 5.61}
$$

T falls exponentially with the width L and with √(m(U − E)), so a small change in either changes T by a large factor. Reflection R = 1 − T.

**Where it matters.**

- **Alpha decay**: an alpha particle with a few MeV escapes a nucleus whose wall is perhaps 25 MeV high. It might hit the wall 10³⁸ times before getting out, but it does (Gamow, 1928).
- **Tunnel diode**: electrons cross barriers higher than their kinetic energy.
- **Scanning tunnelling microscope (box)**: Binnig and Rohrer (1981; Nobel 1986, shared with Ruska, inventor of the electron microscope). A probe whose tip is a single atom is brought within a nanometre or two of a conducting surface with about 10 mV across the gap. Electrons tunnel even though they need several eV (the work function) to escape. Since $T \propto e^{-2k_2L}$, a gap change of 0.01 nm changes the current measurably. Scanning with a piezoelectric drive while holding the current constant maps the surface; the map is really one of constant electron density, so different elements look different. The atomic force microscope (AFM) feels repulsive forces instead and works on any surface, including biological ones. (The slides' "Scanning Electron Microscope (SEM)" on `QM.tex:433` should read scanning *tunnelling* microscope.)

**Example 5.6 (Beiser).** Electrons of 1.0 eV and 2.0 eV hit a barrier 10.0 eV high and 0.50 nm wide. For 1.0 eV, $k_2 = \sqrt{2(9.1\times10^{-31})(9.0)(1.6\times10^{-19})}/1.054\times10^{-34} = 1.6\times10^{10}$ m⁻¹, so 2k₂L = 16 and T₁ = e⁻¹⁶ = 1.1 × 10⁻⁷ (one in 8.9 million). For 2.0 eV, T₂ = 2.4 × 10⁻⁷. Doubling the width to 1.0 nm: T₁ = 1.3 × 10⁻¹⁴ and T₂ = 5.1 × 10⁻¹⁴. T is more sensitive to width than to energy here.

### Appendix: the tunnel effect worked out

**Outside the barrier** (regions I and III, U = 0):

$$
\frac{d^2\psi}{dx^2} + \frac{2mE}{\hbar^2}\psi = 0, \qquad k_1 = \frac{\sqrt{2mE}}{\hbar} = \frac p\hbar = \frac{2\pi}{\lambda} \tag{5.73 to 5.77}
$$

$$
\psi_I = Ae^{ik_1x} + Be^{-ik_1x}, \qquad \psi_{III} = Fe^{ik_1x} + Ge^{-ik_1x}
$$

These are the same as A sin + B cos, rewritten with $e^{\pm i\theta} = \cos\theta \pm i\sin\theta$ to describe moving particles.

**What each term means.**

- $Ae^{ik_1x}$: the **incoming** wave (from the left). With $v_I$ its group velocity (the particles' speed), $S = |\psi_{I+}|^2v_I$ is the flux of particles arriving per second.
- $Be^{-ik_1x}$: the **reflected** wave.
- $Fe^{ik_1x}$: the **transmitted** wave. Nothing in region III can send a wave back, so **G = 0** (slides: "only the +ve direction wave").

**Transmission probability** is the ratio of fluxes out and in:

$$
T = \frac{|\psi_{III+}|^2v_{III}}{|\psi_{I+}|^2v_I} = \frac{FF^*v_{III}}{AA^*v_I} = \frac{FF^*}{AA^*} \quad (v_{III} = v_I) \tag{5.83}
$$

Classically T = 0.

**Inside the barrier** (region II, U > E):

$$
\frac{d^2\psi_{II}}{dx^2} - \frac{2m(U-E)}{\hbar^2}\psi_{II} = 0, \qquad \psi_{II} = Ce^{k_2x} + De^{-k_2x}, \qquad k_2 = \frac{\sqrt{2m(U-E)}}{\hbar} \tag{5.84 to 5.86}
$$

The exponents are real, so ψ\_II doesn't oscillate and doesn't describe motion, but |ψ\_II|² ≠ 0: a particle can be found inside and may go on to III or return to I.

**Boundary conditions** (ψ and dψ/dx continuous at x = 0 and x = L; slides `QM.tex:408` list exactly these four):

$$
A + B = C + D \tag{5.91}
$$
$$
ik_1A - ik_1B = k_2C - k_2D \tag{5.92}
$$
$$
Ce^{k_2L} + De^{-k_2L} = Fe^{ik_1L} \tag{5.93}
$$
$$
k_2Ce^{k_2L} - k_2De^{-k_2L} = ik_1Fe^{ik_1L} \tag{5.94}
$$

**Solving for A/F.** From (5.93) and (5.94), adding and subtracting (5.94)/k₂:

$$
C = \frac F2\left(1 + \frac{ik_1}{k_2}\right)e^{(ik_1 - k_2)L}, \qquad D = \frac F2\left(1 - \frac{ik_1}{k_2}\right)e^{(ik_1 + k_2)L}
$$

From (5.91) and (5.92), adding (5.91) and (5.92)/ik₁: $A = \tfrac12\left[C\left(1 - \tfrac{ik_2}{k_1}\right) + D\left(1 + \tfrac{ik_2}{k_1}\right)\right]$. Substitute, using $\left(1 - \tfrac{ik_1}{k_2}\right)\left(1 + \tfrac{ik_2}{k_1}\right) = 2 + i\left(\tfrac{k_2}{k_1} - \tfrac{k_1}{k_2}\right)$:

$$
\frac AF = \left[\frac12 + \frac i4\left(\frac{k_2}{k_1} - \frac{k_1}{k_2}\right)\right]e^{(ik_1 + k_2)L} + \left[\frac12 - \frac i4\left(\frac{k_2}{k_1} - \frac{k_1}{k_2}\right)\right]e^{(ik_1 - k_2)L} \tag{5.95}
$$

**Two approximations.** (1) A high barrier (U ≫ E) makes k₂ ≫ k₁, so $k_2/k_1 - k_1/k_2 \approx k_2/k_1$. (2) A wide barrier ($k_2L \gg 1$) makes $e^{k_2L} \gg e^{-k_2L}$, so drop the second term:

$$
\frac AF \approx \left(\frac12 + \frac{ik_2}{4k_1}\right)e^{(ik_1 + k_2)L}, \qquad \left(\frac AF\right)^* \approx \left(\frac12 - \frac{ik_2}{4k_1}\right)e^{(-ik_1 + k_2)L} \tag{5.97, 5.98}
$$

Multiply:

$$
\frac{AA^*}{FF^*} = \left(\frac14 + \frac{k_2^2}{16k_1^2}\right)e^{2k_2L} \quad\Rightarrow\quad T = \frac{FF^*}{AA^*} = \left[\frac{16}{4 + (k_2/k_1)^2}\right]e^{-2k_2L} \tag{5.99}
$$

From the definitions, $(k_2/k_1)^2 = (U - E)/E = U/E - 1$ (5.100). The bracket varies far more slowly with E and U than the exponential and is of order 1 (for Example 5.6 it is 16/13 ≈ 1.2), so

$$
T \approx e^{-2k_2L} \tag{5.101}
$$

**Exact result** (beyond Beiser, useful as a check): $T = \left[1 + \dfrac{U^2\sinh^2(k_2L)}{4E(U - E)}\right]^{-1}$, which reduces to the above for $k_2L \gg 1$.

**The slides' picture (`QM.tex:433`).** Oscillating ψ in I (incident plus reflected), decaying exponential in II, smaller oscillating ψ in III with the same wavelength as in I: the particle that gets through has the same energy, only its amplitude is reduced.

## 5.11 Harmonic oscillator

**Classical oscillator.** Simple harmonic motion comes from a linear restoring force, Hooke's law F = −kx. With F = ma:

$$
\frac{d^2x}{dt^2} + \frac km x = 0, \qquad x = A\cos(2\pi\nu t + \phi), \qquad \nu = \frac{1}{2\pi}\sqrt{\frac km} \tag{5.62 to 5.64}
$$

φ is fixed by x and the direction of motion at t = 0.

**Why it matters everywhere.** Expand any restoring force about the equilibrium x = 0 in a Maclaurin series:

$$
F(x) = F_{x=0} + \left(\frac{dF}{dx}\right)_0x + \frac12\left(\frac{d^2F}{dx^2}\right)_0x^2 + \cdots
$$

F = 0 at equilibrium, and for small x the x², x³ terms are negligible, so $F \approx (dF/dx)_0\,x$, Hooke's law with $k = -(dF/dx)_0 > 0$. **All oscillations are simple harmonic when small enough**: molecules, atoms in crystals, objects on springs.

**Potential energy.** The work to move from 0 to x against F:

$$
U(x) = -\int_0^xF\,dx = k\int_0^xx\,dx = \tfrac12kx^2, \qquad E = \tfrac12kA^2 \tag{5.65}
$$

a parabola (Fig. 5.10). Classically E can be anything and the particle swings between −A and +A.

**What to expect quantum mechanically.** (1) Discrete energies, not a continuum. (2) The lowest energy is not 0 but some E₀. (3) Some probability of being found beyond ±A.

### Energy levels

With U = ½kx²:

$$
\frac{d^2\psi}{dx^2} + \frac{2m}{\hbar^2}\left(E - \tfrac12kx^2\right)\psi = 0 \tag{5.66}
$$

Change to dimensionless position and energy:

$$
y = \left(\frac1\hbar\sqrt{km}\right)^{1/2}x = \sqrt{\frac{2\pi m\nu}{\hbar}}\,x, \qquad \alpha = \frac{2E}{\hbar}\sqrt{\frac mk} = \frac{2E}{h\nu} \tag{5.67, 5.68}
$$

so that

$$
\frac{d^2\psi}{dy^2} + (\alpha - y^2)\psi = 0 \tag{5.69}
$$

ψ must → 0 as y → ±∞ to be normalisable, and the equation allows that **only when α = 2n + 1**, n = 0, 1, 2, …. With α = 2E/hν:

$$
E_n = \left(n + \tfrac12\right)h\nu, \qquad n = 0, 1, 2, \dots \tag{5.70}
$$

$$
E_0 = \tfrac12 h\nu \quad\text{(zero-point energy)} \tag{5.71}
$$

- Quantised in steps of hν, **evenly spaced** (Planck's assumption in 2.2, but shifted by ½hν).
- The zero-point energy is the lowest possible; an oscillator in equilibrium with its surroundings approaches E₀, not 0, as T → 0 K. It is what the uncertainty principle demands: at rest at the bottom, x and p would both be exactly 0.
- **Level patterns compared (Fig. 5.11).** Hydrogen: E\_n ∝ −1/n², crowding together. Box: E\_n ∝ n², spreading apart. Oscillator: E\_n ∝ n + ½, the only evenly spaced one.

### The slides' series solution (`QM.tex:353` to `:378`)

This is how α = 2n + 1 comes out. Write C = ħ²/2m.

**Step 1. Rescale.** Put x = by in $-C\psi_{xx} + \tfrac12kx^2\psi = E\psi$:

$$
-\frac{C}{b^2}\psi_{yy} + \tfrac12kb^2y^2\psi = E\psi \quad\Rightarrow\quad \psi_{yy} - \frac{kb^4}{2C}y^2\psi + \frac{Eb^2}{C}\psi = 0
$$

Choose b so that $kb^4/2C = 1$, i.e. $b^4 = \hbar^2/mk$ (Beiser's y), and call $\alpha = Eb^2/C$, which works out to 2E/hν. (The slide drops the factor ½ in the middle term; with it the scaling agrees with Beiser.) Result: $\psi_{yy} + (\alpha - y^2)\psi = 0$.

**Step 2. Large-y behaviour.** For y → ±∞, α is negligible: $\psi_{yy} \approx y^2\psi$. Try $\psi = e^{\beta y^2}$: $\psi_{yy} = (4\beta^2y^2 + 2\beta)\psi \approx 4\beta^2y^2\psi$, so $4\beta^2 = 1$ and β = ±½. Only β = −½ is normalisable: $\psi \sim e^{-y^2/2}$.

**Step 3. Factor it out.** Try $\psi = f(y)e^{-y^2/2}$:

$$
\psi_y = e^{-y^2/2}(f' - yf), \qquad \psi_{yy} = e^{-y^2/2}\left(f'' - 2yf' - f + y^2f\right)
$$

Then $\psi_{yy} + (\alpha - y^2)\psi = e^{-y^2/2}\left[f'' - 2yf' + (\alpha - 1)f\right] = 0$, so

$$
f'' - 2yf' + (\alpha - 1)f = 0 \qquad \text{(Hermite's equation)}
$$

**Step 4. Power series.** Put $f = \sum_n a_ny^n$. Then $f'' = \sum n(n-1)a_ny^{n-2}$ and $2yf' = \sum 2na_ny^n$. Shift the index in f'' (n → n + 2) and collect powers of yⁿ:

$$
(n+2)(n+1)a_{n+2} - 2na_n + (\alpha - 1)a_n = 0 \quad\Rightarrow\quad a_{n+2} = \frac{2n + 1 - \alpha}{(n+1)(n+2)}\,a_n
$$

**Step 5. The series must stop.** If it doesn't, for large n $a_{n+2}/a_n \to 2/n$, the same as the series of $e^{y^2}$, so $f \sim e^{y^2}$ and $\psi \sim e^{+y^2/2}$ blows up. The only way out is for the series to terminate: $2n + 1 - \alpha = 0$ for some whole number n (with the other-parity series set to zero). So **α = 2n + 1**, which is $E_n = (n + \tfrac12)h\nu$, and $f_n$ is a polynomial of degree n.

**Step 6. The first few.**

- n = 0, α = 1: a₂ = 0, so f₀ = 1 and ψ₀ ∝ e^(−y²/2), a Gaussian.
- n = 1, α = 3: odd series stops at a₁y, so f₁ ∝ y, conventionally H₁ = 2y.
- n = 2, α = 5: $a_2 = \frac{1 - 5}{2}a_0 = -2a_0$, so f₂ ∝ 1 − 2y², conventionally H₂ = 4y² − 2. (The slide writes α = 4 for n = 2; it should be 5.)

### Wave functions

$$
\psi_n = \left(\frac{2m\nu}{\hbar}\right)^{1/4}\left(2^nn!\right)^{-1/2}H_n(y)\,e^{-y^2/2} \tag{5.72}
$$

| n | H\_n(y) | E\_n |
| --- | --- | --- |
| 0 | 1 | ½hν |
| 1 | 2y | 3/2 hν |
| 2 | 4y² − 2 | 5/2 hν |
| 3 | 8y³ − 12y | 7/2 hν |
| 4 | 16y⁴ − 48y² + 12 | 9/2 hν |
| 5 | 32y⁵ − 160y³ + 120y | 11/2 hν |

- H\_n has only even or only odd powers, so ψ\_n is even or odd; it has n nodes.
- **Beyond the classical limits (Fig. 5.12).** Each ψ\_n leaks past ±A with exponentially falling probability, as in the finite well. For n = 0 the classical limit is y = ±1 (α = 1 = y²), and the probability outside is erfc(1) ≈ 16% (the slides, `QM.tex:379`, quote about 10%). It shrinks as n grows.
- **Classical against quantum density (Fig. 5.13).** A classical oscillator moves slowest at the ends, so it is most likely found near ±A and least likely at 0. The quantum ground state is the opposite: most likely at x = 0. By n = 10, |ψ₁₀|² averaged over its wiggles follows the classical curve, and its tails beyond ±A are small: the correspondence principle. The wiggles get finer as n grows, and soon can't be detected. In ψ₁₀ the wavelength is shortest at x = 0 (fastest motion) and longest near ±A.
- Slides (`QM.tex:379`): spacing ΔE = hν, zero-point energy ½hν, correspondence as n → ∞.

**Example 5.7 (Beiser): ⟨x⟩ = 0.** For n = 0 the integrand is $y\,e^{-y^2}$ and for n = 1 it is $y^3e^{-y^2}$, both odd, so both integrals over (−∞, ∞) vanish. In fact ⟨x⟩ = 0 in every state, as expected: x = 0 is the equilibrium point where U is smallest, and |ψ\_n|² is symmetric about it.

## What to be able to do without notes

- Explain why quantum mechanics predicts probabilities, list the three conditions on a well-behaved ψ, and normalise a wave function.
- Motivate the time-dependent Schrödinger equation from $\Psi = Ae^{-(i/\hbar)(Et - px)}$ (Beiser and slide 2) and the steady-state equation from $\nabla^2\psi + k^2\psi = 0$ (slide 1); say why it is a postulate.
- Show amplitudes add (the interference term) and when a superposition is normalised.
- Derive ⟨x⟩ from the centre-of-mass idea; write p̂, Ê, Ĥ; explain the Ψ*ÂΨ order; derive p̂ from m d⟨x⟩/dt.
- Separate Ψ = ψ(x)e^(−iEt/ħ) and explain stationary states, eigenvalues and eigenfunctions.
- Solve the infinite box completely (E\_n, normalised ψ\_n, |ψ\_n|², ⟨x⟩, ⟨p⟩ = 0, momentum eigenfunctions) and the 3-D box with its degeneracies.
- Explain the finite well (decaying tails, lower levels) and tunnelling (T ≈ e^(−2k₂L), its sensitivity, alpha decay and the STM); write the four boundary conditions and outline the appendix.
- Rescale the oscillator equation, find the e^(−y²/2) tail, derive the recursion and show it must terminate, giving E\_n = (n + ½)hν; compare with the classical oscillator.

# Coverage: Quantum mechanics

Every section and example of Beiser ch 5 and its appendix, and every slide frame from the mathematical formulation to tunnelling (`QM.tex:258` to `:443`). "HW practice" means *HW practice: Beiser chapters 4 to 6*.

## Beiser ch 5

| Beiser | Topic | Where on the site |
| --- | --- | --- |
| 5.1 | Wave function, normalisation, well-behaved conditions | Reference 5.1 |
| 5.2 | The wave equation | Reference 5.2 |
| Ex 5.1 | Check y = Ae^(−iω(t − x/v)) solves it | Reference 5.2; HW practice |
| 5.3 | Time-dependent Schrödinger equation | Reference 5.3 (derivation, plus both slide routes) |
| 5.4 | Linearity and superposition | Reference 5.4 (interference term written out) |
| 5.5 | Expectation values | Reference 5.5 (from the centre-of-mass sum) |
| Ex 5.2 | Probability and ⟨x⟩ for ψ = ax | Reference 5.5; HW practice |
| 5.6 | Operators, Table 5.1 | Reference 5.6 and 5.7 |
| 5.7 | Steady-state equation, eigenvalues, Hamiltonian | Reference 5.7 (separation of variables shown) |
| Ex 5.3 | e^(2x) as an eigenfunction | Reference 5.7; HW practice |
| 5.8 | Particle in a box | Reference 5.8 (normalisation, ⟨x⟩, ⟨p⟩, momentum eigenfunctions) |
| Ex 5.4, 5.5 | Probability in the middle tenth; ⟨x⟩ | Reference 5.8; HW practice |
| 5.9 | Finite potential well | Reference 5.9 |
| 5.10 | Tunnel effect, STM | Reference 5.10 |
| Ex 5.6 | Electrons through a 10 eV barrier | Reference 5.10; HW practice |
| Appendix to ch 5 | The tunnel effect worked out, eqs 5.73 to 5.101 | Reference 5.10 appendix (all steps) |
| 5.11 | Harmonic oscillator | Reference 5.11 |
| Ex 5.7 | ⟨x⟩ = 0 for the oscillator | Reference 5.11; HW practice |

## Slides

| Frame (`QM.tex`) | Where on the site |
| --- | --- |
| `:258` Mathematical formulation (postulates) | Reference 5.1 |
| `:269` Motivating the equation, `:283` another derivation | Reference 5.3 |
| `:297` Features of the equation | Reference 5.3, 5.4, 5.7 |
| `:309` Momentum operator derivation | Reference 5.6 (all steps) |
| `:323`, `:336` Particle in a 1-D box | Reference 5.8 |
| `:346` 3-D box | Reference 5.8 (with degeneracies of a cube) |
| `:353`, `:363`, `:379` Harmonic oscillator | Reference 5.11 (series solution in full) |
| `:390`, `:408`, `:433` Tunnelling | Reference 5.10 and appendix |

## Slide typos corrected on the site

- `:283`: ω = ν/2π should be ω = 2πν.
- `:309`: the final p̂ = (h/i)∂/∂x should be (ħ/i)∂/∂x.
- `:346`: the last sine should have L\_z, not L\_y.
- `:363`: the middle term should be kb⁴/2C, and n = 2 has α = 5, not 4.
- `:379`: the ground-state probability beyond the turning points is about 16%, not 10%.
- `:433`: "Scanning Electron Microscope (SEM)" should be scanning tunnelling microscope (STM).

# Formulas: Quantum mechanics

## Schrödinger equation

$$\boxed{i\hbar\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U\Psi}\qquad\text{(time-dependent, 1-D)}$$

For $U = U(x)$ separate $\Psi = \psi(x)e^{-iEt/\hbar}$:

$$\boxed{-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + U\psi = E\psi}\qquad\text{(steady-state)}$$

Acceptable $\psi$: continuous, single-valued, normalisable ($\int|\Psi|^2dx = 1$), with $d\psi/dx$ continuous where $U$ is finite. Energy quantisation comes from these conditions alone.

| Property | Statement |
|---|---|
| linearity | any sum of solutions is a solution, which gives interference |
| stationary state | $\lvert\Psi\rvert^2 = \lvert\psi\rvert^2$, constant in time |

## Expectation values and operators

$$\langle x\rangle = \int x|\Psi|^2dx,\qquad \langle p\rangle = \int\Psi^*\left(-i\hbar\frac{\partial}{\partial x}\right)\Psi\,dx,\qquad \hat p = -i\hbar\frac{\partial}{\partial x}$$

$e^{ikx}$ is an eigenfunction of $\hat p$ with $p = \hbar k$. $\sin kx$ is not (it is an equal mix of $+\hbar k$ and $-\hbar k$).

## Particle in an infinite box (width $L$)

$$\boxed{\psi_n = \sqrt{\frac2L}\sin\frac{n\pi x}{L},\qquad E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} = \frac{n^2h^2}{8mL^2},\qquad n = 1, 2, \dots}$$

$\langle x\rangle = L/2$ for every state. Normalisation of $\psi = A x(L - x)$: $A = \sqrt{30/L^5}$.

**3-D cubical box:**

$$E = \frac{\pi^2\hbar^2}{2mL^2}\left(n_1^2 + n_2^2 + n_3^2\right)$$

Levels at $3$ (1,1,1), $6$ (1,1,2) and permutations (3-fold), $9$ (1,2,2) and permutations (3-fold), in units of $\pi^2\hbar^2/2mL^2$.

## Finite well

Inside: $\psi = A\sin kx + B\cos kx$ with $k = \sqrt{2mE}/\hbar$. Outside ($E < U$): decaying exponentials with

$$a = \frac{\sqrt{2m(U - E)}}{\hbar}$$

Join $\psi$ and $d\psi/dx$ at each wall. Levels lie below those of an infinite well of the same width because $\psi$ leaks into the walls.

## Tunnelling

$$\boxed{T \approx e^{-2k_2L},\qquad k_2 = \frac{\sqrt{2m(U - E)}}{\hbar}}$$

Doubling the width squares $T$; a heavier particle (larger $m$) tunnels far less.

## Harmonic oscillator ($U = \tfrac12 kx^2$)

$$\boxed{E_n = \left(n + \tfrac12\right)h\nu = \left(n + \tfrac12\right)\hbar\omega,\qquad n = 0, 1, 2, \dots}$$

Zero-point energy $\tfrac12h\nu$; level spacing $h\nu$. Near any minimum $x_0$: $U \approx U(x_0) + \tfrac12U''(x_0)(x - x_0)^2$, so $k = U''(x_0)$.

## Constants

| Quantity | Value |
|---|---|
| $hc$ | $1240\ \text{eV nm}$ |
| $\hbar c$ | $197\ \text{eV nm}$ |
| $m_ec^2$ | $0.511\ \text{MeV}$ |
| $h$ | $4.14\times10^{-15}\ \text{eV s}$ |

# Practice: Quantum mechanics

29 questions with worked answers (tap a solution to open it). The style follows your midsem papers and Quiz-1. Points are in brackets. Use hc = 1240 eV nm, ħc = 197 eV nm, mₑc² = 0.511 MeV, h = 4.14 × 10⁻¹⁵ eV s.

## A. State and explain

### Problem 1 [QM 4 · Recall · 3 pts]

What conditions must a wave function satisfy to be physically acceptable? Why?

*Solution.* **Conditions on $\Psi$.**

1. **Continuous and single-valued**, so the probability density is unambiguous.
2. **$\partial\Psi/\partial x$ continuous** wherever $U$ is finite. Otherwise $\partial^2\Psi/\partial x^2$ would be infinite and the equation could not hold.
3. **Normalisable**: $\int|\Psi|^2dx = 1$, so $\Psi\to0$ at infinity and the particle is certainly somewhere.

**Consequence.** These conditions are what restrict the solutions to a discrete set of energies for bound states.

### Problem 2 [QM 4 · Recall · 2 pts]

Write the time-dependent Schrödinger equation in one dimension and name each term.

*Solution.* **Time-dependent Schrödinger equation (1-D).**

$$i\hbar\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U(x)\Psi$$

**Terms.**

- $i\hbar\,\partial\Psi/\partial t$: the **energy** operator acting on $\Psi$.
- $-\dfrac{\hbar^2}{2m}\dfrac{\partial^2\Psi}{\partial x^2}$: **kinetic energy**, since $\hat p^2/2m$ with $\hat p = -i\hbar\,\partial/\partial x$.
- $U\Psi$: **potential energy**.

So the equation says: total energy $=$ kinetic $+$ potential.

### Problem 3 [QM 4 · Recall · 2 pts]

Why must the wave function be complex?

*Solution.* **Reason.** The Schrödinger equation has a factor $i$ on one side and real terms on the other:

$$i\hbar\frac{\partial\Psi}{\partial t} = \hat H\Psi$$

A real $\Psi$ cannot satisfy it for a travelling particle. A free-particle solution is $\Psi = Ae^{i(kx - \omega t)}$, which is complex.

**What is measurable.** Only $|\Psi|^2 = \Psi^*\Psi$, which is real and non-negative. The phase of $\Psi$ itself is not observable, but **relative** phases matter for interference.

### Problem 4 [QM 4 · Recall · 2 pts]

What does the linearity of the Schrödinger equation imply? Why does it lead to interference?

*Solution.* **Linearity.** If $\Psi_1$ and $\Psi_2$ are solutions, so is $a\Psi_1 + b\Psi_2$: the **superposition principle**.

**Interference.** The probability density of a sum is

$$|\Psi_1 + \Psi_2|^2 = |\Psi_1|^2 + |\Psi_2|^2 + 2\,\text{Re}(\Psi_1^*\Psi_2)$$

The last term is the **cross term**. It can be positive or negative, so probabilities do not simply add: they can reinforce (constructive) or cancel (destructive). This is the origin of double-slit interference for electrons.

### Problem 5 [QM 4 · Recall · 2 pts]

What is an expectation value? Write ⟨x⟩ and ⟨p⟩.

*Solution.* **Expectation value.** The average result of measuring a quantity on many identical systems prepared in the same state $\Psi$.

$$\langle x\rangle = \int_{-\infty}^\infty x\,|\Psi|^2\,dx$$

$$\langle p\rangle = \int_{-\infty}^\infty\Psi^*\left(-i\hbar\frac\partial{\partial x}\right)\Psi\,dx$$

In general $\langle Q\rangle = \int\Psi^*\hat Q\Psi\,dx$ for any observable with operator $\hat Q$.

**Note.** It is an average over many runs, not the result of one measurement.

### Problem 6 [QM 4 · Recall · 2 pts]

What is a stationary state? Why is its probability density constant in time?

*Solution.* **Stationary state.** A solution of the form

$$\Psi(x,t) = \psi(x)\,e^{-iEt/\hbar}$$

with a definite energy $E$.

**Constant probability density.**

$$|\Psi|^2 = |\psi|^2\left|e^{-iEt/\hbar}\right|^2 = |\psi(x)|^2$$

because $|e^{i\theta}| = 1$. Nothing observable changes in time, so the state does not radiate, and all expectation values are constant.

### Problem 7 [QM 4 · Recall · 3 pts]

Explain how energy quantisation follows from the steady-state Schrödinger equation without any extra postulate.

*Solution.* **How quantisation arises.** The steady-state equation

$$\psi'' + \frac{2m}{\hbar^2}(E - U)\psi = 0$$

has solutions for every $E$, but only certain values of $E$ give a $\psi$ that is **continuous, finite, normalisable and satisfies the boundary conditions**. Those special values are the allowed energies.

**Example (box).** $\psi = A\sin kx$ with $\psi(L) = 0$ forces $kL = n\pi$, so

$$E_n = \frac{\hbar^2k^2}{2m} = \frac{n^2\pi^2\hbar^2}{2mL^2}$$

No separate quantum postulate is needed: it follows from the equation and the boundary conditions.

### Problem 8 [QM 4 · Recall · 2 pts]

Why are the energy levels of a finite well lower than those of an infinite well of the same width?

*Solution.* **Reason.** In a finite well the wave function **leaks into the walls**, so the particle is effectively spread over a region wider than $L$.

$$\text{wider region}\ \Rightarrow\ \text{longer }\lambda\ \Rightarrow\ \text{smaller }p = h/\lambda\ \Rightarrow\ \text{lower }E$$

**Limits.**

- Well depth $\to\infty$: the leakage vanishes and $E_n\to n^2h^2/8mL^2$.
- A finite well has a **finite number** of bound states, and fewer when it is shallower or narrower.

### Problem 9 [QM 4 · Recall · 3 pts]

What is quantum tunnelling? Give two real examples.

*Solution.* **Tunnelling.** A particle can pass through a potential barrier **higher than its energy**.

**Mechanism.** Inside the barrier $\psi$ decays exponentially, $\psi\propto e^{-k_2x}$, but it is **not zero** at the far side, so there is a non-zero probability of finding the particle there:

$$T \approx e^{-2k_2L},\qquad k_2 = \frac{\sqrt{2m(U - E)}}\hbar$$

**Real examples.**

- **Alpha decay**: $\alpha$ particles escape the Coulomb barrier of the nucleus.
- **Scanning tunnelling microscope**: current tunnels between tip and surface.
- **Tunnel diode** and flash memory.
- **Fusion in the Sun**: protons tunnel through their mutual repulsion.

### Problem 10 [QM 4 · Recall · 2 pts]

What is zero-point energy? Why is it required by the uncertainty principle?

*Solution.* **Zero-point energy.** The lowest energy of a bound system lies **above** the bottom of its potential well.

- Box: $E_1 = h^2/8mL^2 > 0$.
- Oscillator: $E_0 = \tfrac12h\nu$.

**Why the uncertainty principle requires it.** A particle at rest at the bottom would have both $\Delta x = 0$ and $\Delta p = 0$, so $\Delta x\Delta p = 0 < \hbar/2$. Confining the particle to a region $\Delta x$ forces $\Delta p \gtrsim \hbar/2\Delta x$, and hence a kinetic energy of order $(\Delta p)^2/2m$.

**Consequence.** Helium stays liquid at absolute zero at ordinary pressure.

### Problem 11 [QM 4 · Recall · 3 pts]

Compare the probability distribution of a quantum harmonic oscillator in its ground state with that of a classical oscillator of the same energy.

*Solution.* **Quantum ground state ($n = 0$).** $|\psi_0|^2\propto e^{-m\omega x^2/\hbar}$: a Gaussian **peaked at the centre**, with a small probability of being found **beyond** the classical turning points (tunnelling into the forbidden region).

**Classical oscillator of the same energy.** It moves fastest at the centre, so it spends the least time there: the probability density is **smallest at the centre**, largest at the turning points $\pm A$, and **zero beyond them**.

**Large $n$.** The quantum density oscillates rapidly, but its average follows the classical shape (peaks near the turning points). This is the **correspondence principle**.

### Problem 12 [QM 4 · Recall · 2 pts]

What is degeneracy? Give an example from the 3-D box.

*Solution.* **Degeneracy.** Different states with the **same energy**. The number of such states is the degree of degeneracy.

**Cubical box.** $E\propto n_1^2 + n_2^2 + n_3^2$. The states

$$(1,1,2),\ (1,2,1),\ (2,1,1)$$

all have $n_1^2 + n_2^2 + n_3^2 = 6$, so the energy level $6E_0$ is **3-fold degenerate**.

**Cause.** Degeneracy reflects symmetry (here, the cube's); changing one side length breaks the symmetry and splits the level.

## B. Derive or show

### Problem 13 [QM 4 · Derivation · 4 pts]

Starting from a free-particle wave Ψ = Ae^(−(i/ħ)(Et − px)) and E = p²/2m + U, obtain the time-dependent Schrödinger equation.

*Solution.* **Free-particle wave.** $\Psi = Ae^{-(i/\hbar)(Et - px)}$.

**Differentiate.**

$$\frac{\partial\Psi}{\partial t} = -\frac{iE}\hbar\Psi\ \Rightarrow\ E\Psi = i\hbar\frac{\partial\Psi}{\partial t}$$

$$\frac{\partial^2\Psi}{\partial x^2} = -\frac{p^2}{\hbar^2}\Psi\ \Rightarrow\ p^2\Psi = -\hbar^2\frac{\partial^2\Psi}{\partial x^2}$$

**Energy relation.** Multiply $E = \dfrac{p^2}{2m} + U$ by $\Psi$ and substitute:

$$\boxed{i\hbar\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + U\Psi}$$

The equation is then **postulated** to hold for any $U(x,t)$. It is linear in $\Psi$, which allows superposition.

### Problem 14 [QM 4 · Derivation · 4 pts]

Separate variables to obtain the steady-state Schrödinger equation from the time-dependent one when U = U(x).

*Solution.* **Separate variables** (valid when $U = U(x)$): $\Psi(x,t) = \psi(x)f(t)$.

$$i\hbar\,\psi f' = -\frac{\hbar^2}{2m}\psi''f + U\psi f$$

Divide by $\psi f$:

$$i\hbar\frac{f'}f = \frac1\psi\left[-\frac{\hbar^2}{2m}\psi'' + U\psi\right]$$

The left side depends only on $t$ and the right only on $x$, so both equal a constant $E$.

**Time part:** $f = e^{-iEt/\hbar}$.

**Space part:**

$$-\frac{\hbar^2}{2m}\psi'' + U\psi = E\psi\quad\Longleftrightarrow\quad \boxed{\psi'' + \frac{2m}{\hbar^2}(E - U)\psi = 0}$$

### Problem 15 [QM 4 · Derivation · 6 pts] (hard)

Solve the Schrödinger equation for a particle in an infinite box of width L: find Eₙ, the normalised ψₙ, and sketch |ψₙ|² for n = 1, 2, 3.

*Solution.* **Inside the box** ($U = 0$): $\psi'' = -k^2\psi$ with $k = \sqrt{2mE}/\hbar$, so

$$\psi = A\sin kx + B\cos kx$$

**Boundary conditions.** $\psi(0) = 0 \Rightarrow B = 0$. $\psi(L) = 0 \Rightarrow \sin kL = 0 \Rightarrow kL = n\pi$:

$$\boxed{E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} = \frac{n^2h^2}{8mL^2}}$$

**Normalise.**

$$\int_0^LA^2\sin^2\frac{n\pi x}L\,dx = A^2\frac L2 = 1\ \Rightarrow\ \boxed{\psi_n = \sqrt{\frac2L}\sin\frac{n\pi x}L}$$

**$|\psi_n|^2$:** $n = 1$ has one hump (maximum at $L/2$); $n = 2$ two humps with a zero at $L/2$; $n = 3$ three humps with zeros at $L/3$ and $2L/3$.

**Common mistake.** $n = 0$ is not allowed ($\psi\equiv0$), so $E_1 > 0$ is the zero-point energy.

### Problem 16 [QM 4 · Derivation · 3 pts]

Show that ⟨x⟩ = L/2 for every state of the infinite box.

*Solution.* **Symmetry.** $|\psi_n(x)|^2 = \dfrac2L\sin^2\dfrac{n\pi x}L$. Replace $x \to L - x$:

$$\sin^2\frac{n\pi(L - x)}L = \sin^2\left(n\pi - \frac{n\pi x}L\right) = \sin^2\frac{n\pi x}L$$

so $|\psi_n|^2$ is symmetric about $x = L/2$.

**Mean.**

$$\langle x - L/2\rangle = \int\left(x - \frac L2\right)|\psi_n|^2\,dx = 0$$

(odd integrand about $L/2$), so $\boxed{\langle x\rangle = L/2}$ for every $n$.

### Problem 17 [QM 4 · Derivation · 3 pts]

Show that e^(ikx) is an eigenfunction of the momentum operator, and that sin kx is not. What does this say about the momentum of a particle in a box?

*Solution.* **Momentum operator** $\hat p = -i\hbar\,d/dx$.

$$\hat pe^{ikx} = -i\hbar(ik)e^{ikx} = \hbar k\,e^{ikx}$$

an **eigenfunction** with eigenvalue $p = \hbar k$.

$$\hat p\sin kx = -i\hbar k\cos kx \ne (\text{number})\sin kx$$

so $\sin kx$ is **not** an eigenfunction.

**Meaning for the box.** $\sin kx = \dfrac{e^{ikx} - e^{-ikx}}{2i}$ is a superposition of $p = +\hbar k$ and $p = -\hbar k$, with equal weights. A measurement gives $\pm\hbar k$ with probability $\tfrac12$ each, so $\langle p\rangle = 0$ but $p$ is not definite. (This is the standing-wave picture: a particle bouncing back and forth.)

### Problem 18 [QM 4 · Derivation · 3 pts]

Normalise ψ(x) = Ax(L − x) for 0 ≤ x ≤ L (zero outside).

*Solution.* **Condition.** $\int_0^L|\psi|^2dx = 1$:

$$A^2\int_0^Lx^2(L - x)^2\,dx = 1$$

**Integral.** $\int_0^L(L^2x^2 - 2Lx^3 + x^4)dx = \dfrac{L^5}3 - \dfrac{L^5}2 + \dfrac{L^5}5 = \dfrac{L^5}{30}$.

$$A^2\frac{L^5}{30} = 1\ \Rightarrow\ \boxed{A = \sqrt{\frac{30}{L^5}}}$$

### Problem 19 [QM 4 · Derivation · 4 pts]

For the finite well, write the form of ψ inside and outside, and state the conditions used to join them.

*Solution.* **Finite well** of depth $U$ and width $L$, with $E < U$.

**Inside** ($U = 0$): $\psi'' = -k^2\psi$, $k = \sqrt{2mE}/\hbar$:

$$\psi = A\sin kx + B\cos kx$$

**Outside** ($U > E$): $\psi'' = a^2\psi$, $a = \sqrt{2m(U - E)}/\hbar$:

$$\psi_\text{left} = Ce^{ax},\qquad \psi_\text{right} = De^{-ax}$$

The growing exponentials are dropped so that $\psi$ stays finite as $|x|\to\infty$.

**Matching conditions.** At each wall, $\psi$ **and** $d\psi/dx$ are continuous (the potential is finite, so $\psi''$ is finite). Together with normalisation these fix the allowed energies, which come out as a finite number of discrete levels. The wave function leaks into the walls over a distance $1/a$.

### Problem 20 [QM 4 · Derivation · 4 pts]

Write the energy levels of a particle in a cubical 3-D box. Find the first three energy levels and their degeneracies.

*Solution.* **Separable problem.** $\psi = \psi_{n_1}(x)\psi_{n_2}(y)\psi_{n_3}(z)$ and the energies add:

$$E = \frac{\pi^2\hbar^2}{2mL^2}\left(n_1^2 + n_2^2 + n_3^2\right) \equiv E_0\left(n_1^2 + n_2^2 + n_3^2\right)$$

| level | $(n_1,n_2,n_3)$ | energy | degeneracy |
|---|---|---|---|
| 1st | $(1,1,1)$ | $3E_0$ | 1 |
| 2nd | $(1,1,2)$ and permutations | $6E_0$ | 3 |
| 3rd | $(1,2,2)$ and permutations | $9E_0$ | 3 |

**Check.** $(2,2,2)$ gives $12E_0$ and $(1,1,3)$ gives $11E_0$, so nothing else fits below $9E_0$. The degeneracy arises from the cube's symmetry.

## C. Numericals without a calculator

### Problem 21 [QM 4 · Numerical]

Find the ground-state energy of an electron in a box 1 nm wide.

*Solution.* **Idea.** $E_1 = h^2/8mL^2$. Write it as $(hc)^2/(8\,m_ec^2L^2)$ so everything is in eV and nm.

$$E_1 = \frac{(1240\ \text{eV nm})^2}{8(0.511\times10^6\ \text{eV})(1\ \text{nm})^2} = \frac{1.54\times10^6}{4.09\times10^6} \approx \boxed{0.38\ \text{eV}}$$

### Problem 22 [QM 4 · Numerical]

For a particle in a box, find the probability of finding it in the middle third of the box for n = 1 and n = 2. Compare with the classical answer.

*Solution.* **Idea.** With $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$,

$$P = \int_{L/3}^{2L/3}\frac2L\sin^2\frac{n\pi x}{L}\,dx = \frac13 - \frac{1}{2n\pi}\left[\sin\frac{4n\pi}{3} - \sin\frac{2n\pi}{3}\right]$$

$$n = 1:\quad \frac13 + \frac{\sqrt3}{2\pi} \approx 0.33 + 0.28 = \boxed{0.61}$$

$$n = 2:\quad \frac13 - \frac{\sqrt3}{4\pi} \approx 0.33 - 0.14 = \boxed{0.20}$$

**Compare.** A classical particle is equally likely anywhere, so $P = 1/3$ for every state. The quantum answer oscillates about $1/3$ and approaches it as $n \to \infty$ (the correspondence principle).

### Problem 23 [QM 4 · Numerical]

An electron with E = 1 eV meets a barrier 5 eV high and 0.5 nm wide. Estimate T. What happens to T if the width doubles?

*Solution.* **Idea.** $T \approx e^{-2k_2L}$ with $k_2 = \sqrt{2m(U - E)}/\hbar$.

$$k_2 = \frac{\sqrt{2(m_ec^2)(U - E)}}{\hbar c} = \frac{\sqrt{2(0.511\times10^6)(4)}}{197\ \text{eV nm}} \approx \frac{2020}{197} \approx 10\ \text{nm}^{-1}$$

$$2k_2L = 2(10)(0.5) \approx 10\ \Rightarrow\ T \approx e^{-10} \approx \boxed{5\times10^{-5}}$$

**Doubling the width:** the exponent doubles, so $T \approx e^{-20} \approx 2\times10^{-9}$. $T$ is **squared**, not halved.

### Problem 24 [QM 4 · Numerical]

Repeat question 23 for a proton. Comment.

*Solution.* **Idea.** $k_2 \propto \sqrt m$.

The proton is 1836 times heavier, so $k_2$ is $\sqrt{1836} \approx 43$ times larger and

$$2k_2L \approx 10\times43 \approx 430\ \Rightarrow\ T \approx e^{-430} \approx 0\ \text{(effectively zero)}$$

**Comment.** Tunnelling matters for light particles and thin barriers. The mass dependence enters through the exponent, so the effect disappears very quickly as the mass grows.

### Problem 25 [QM 4 · Numerical]

A molecule vibrates at 10¹⁴ Hz. Find its zero-point energy and the spacing between levels, in eV.

*Solution.* **Idea.** Oscillator levels $E_n = (n + \tfrac12)h\nu$: spacing $h\nu$, zero-point energy $\tfrac12h\nu$.

$$h\nu = (4.14\times10^{-15}\ \text{eV s})(10^{14}\ \text{s}^{-1}) \approx 0.41\ \text{eV}$$

$$\text{spacing} = \boxed{0.41\ \text{eV}},\qquad E_0 = \tfrac12h\nu \approx \boxed{0.21\ \text{eV}}$$

### Problem 26 [QM 4 · Numerical]

Find the wavelength of the photon emitted when an electron in a 1 nm box drops from n = 3 to n = 1.

*Solution.* **Idea.** $E_n = n^2E_1$, so $E_3 - E_1 = (9 - 1)E_1 = 8E_1$.

$$\Delta E = 8(0.38\ \text{eV}) \approx 3.0\ \text{eV}\ \Rightarrow\ \lambda = \frac{1240}{3.0} \approx \boxed{410\ \text{nm}}\quad(\text{violet})$$

## D. Estimate and discuss

### Problem 27 [QM 4 · Discussion · 3 pts]

Explain why a scanning tunnelling microscope can sense height changes of about 0.01 nm.

*Solution.* **Tunnelling current.** Electrons tunnel across the vacuum gap $L$ between the tip and the surface, with

$$T\approx e^{-2k_2L},\qquad k_2 = \frac{\sqrt{2m\phi}}\hbar\approx10\ \text{nm}^{-1}\ \ (\phi\sim\text{a few eV})$$

**Sensitivity.** A change $\delta L = 0.01$ nm changes the exponent by

$$2k_2\delta L = 2(10)(0.01) = 0.2\ \Rightarrow\ \frac{\delta I}I\approx e^{0.2} - 1\approx 20\%$$

A $20\%$ current change is easy to measure, so heights of $0.01$ nm (a hundredth of an atom's size) are detected.

### Problem 28 [QM 4 · Discussion · 3 pts]

Alpha particles of about 5 MeV escape from nuclei where the Coulomb barrier is about 30 MeV. Explain how, and why half-lives vary from microseconds to billions of years.

*Solution.* **Mechanism.** An $\alpha$ particle with $E\approx5$ MeV sits inside a Coulomb barrier about $30$ MeV high. Classically it cannot escape; quantum mechanically it **tunnels** through.

**Why half-lives vary so much.** The decay rate is proportional to the transmission probability $T\approx e^{-2k_2L}$, which depends **exponentially** on the barrier width and on $\sqrt{U - E}$. A small change in the $\alpha$ energy changes both strongly.

An energy change from about $4$ MeV to $9$ MeV changes the half-life by more than $20$ orders of magnitude, from billions of years to microseconds. This is the **Geiger–Nuttall law**.

### Problem 29 [QM 4 · Discussion · 2 pts]

Explain why the harmonic oscillator is useful for any system near a stable equilibrium.

*Solution.* **Taylor expansion about a stable minimum $x_0$.** Since $U'(x_0) = 0$:

$$U(x) \approx U(x_0) + \tfrac12U''(x_0)(x - x_0)^2$$

**This is a spring** with $k = U''(x_0) > 0$, so small oscillations have

$$\omega = \sqrt{\frac{U''(x_0)}m},\qquad E_n = \left(n + \tfrac12\right)\hbar\omega$$

**Examples.** Molecular vibrations (the $\sim10^{14}$ Hz absorption in infrared), atoms in crystals (specific heat of solids), and the electromagnetic field modes of a cavity.

