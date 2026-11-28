# Learn: Scales, modelling and nonlinear dynamics

The first four lectures: what science is and how the scientific method works, orders of magnitude, mathematics as the language of science, non-dimensionalisation, and two nonlinear models, the logistic map and the Lotka–Volterra prey–predator equations. All of it is on the endsem syllabus (mathematical modelling, the scientific method, math as the language of the sciences). Sources: lectures 1–4, slides `maps.tex`, the decks `overleaf/Sci1-IntroLecture` and `overleaf/Sci1-MathModeling`, notes in `03-lecture-notes/nonlinear-dynamics`, HW lectures 1–4. Questions follow Quiz-1, the 2026 midsem Q8 and Q9, and Sections A and B of the practice set.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution. Boxed equations are the ones to know by heart.

## What science is

In everyday speech a "theory" is a guess. In science the word means almost the opposite: a well-tested explanation of a wide range of phenomena, which makes definite predictions that could in principle be shown false, and which has survived repeated attempts to do so. The intro lecture rests scientific knowledge on three pillars.

> **The three pillars of scientific knowledge**
> 1. **Empirical grounding:** knowledge comes from observation and measurement, not intuition or authority.
> 2. **Logical consistency:** hypotheses are stated in logical or mathematical form so their consequences can be deduced.
> 3. **Falsifiability:** a claim must say something an experiment could, in principle, show to be false.

Because of the third pillar, science limits itself to natural phenomena. A supernatural claim relies on causes that cannot be observed or tested, so it is not wrong in a scientific sense; it is outside what science can address.

Science, engineering and technology are often confused. The slides separate them by their goal:

| | Science | Engineering | Technology |
|---|---|---|---|
| Core goal | understand natural laws ("why") | design practical solutions under constraints ("how to apply") | provide usable tools |
| Starting point | an unanswered question | an unsolved problem | available principles |
| Key output | theories and laws | designs and prototypes | products, devices, software |

The relation between science and computing runs both ways: computers simulate physical systems, and physical systems can compute, as in Adleman's 1994 experiment, which solved a small Hamiltonian-path problem with strands of DNA, or in quantum computers.

## Three kinds of reasoning

| | Deduction | Induction | Abduction |
|---|---|---|---|
| Starts from | a rule and a case | many cases | an observation |
| Gives | a consequence | a general rule | the best explanation |
| Certainty | certain (if premises true) | probable | plausible, to be tested |
| Example | all metals expand when heated; copper is a metal; so copper expands | every copper sample expanded, so copper always does | the grass is wet, so it probably rained |
| Role in science | derive testable predictions | build empirical laws (Hume's problem of induction) | generate hypotheses (Peirce) |

Deduction adds no new information but is truth-preserving; induction adds information but is never certain. The scientific cycle uses all three: **abduce** a hypothesis, **deduce** its predictions, **induce** support from the tests. Reductionism explains a system through its parts, for example a gas through its molecules, while holism holds that some properties belong only to the whole ("more is different", P. W. Anderson).

## The scientific method in five steps

The method is a self-correcting process designed to reduce human bias. Each step has a test of whether it was done correctly:

| Step | What it is | Correctness criteria |
|---|---|---|
| 1. Problem | a clear, specific question about nature | testable, grounded in what is known, no vague language ("why is nature beautiful?" fails) |
| 2. Hypothesis | a tentative explanation, often "if … then …" | falsifiable, gives explicit predictions, consistent with established laws unless challenging them with evidence |
| 3. Experiment | a controlled test | controls confounding variables (independent vs dependent), calibrated instruments, reproducible by others |
| 4. Data analysis | statistics and error analysis | statistical significance, random and systematic errors accounted for, no cherry-picking |
| 5. Conclusion | does the data support the hypothesis? | follows from the data alone, speaks of support not proof, open to peer review |

In practice the steps loop: results feed back into new questions and hypotheses.

## Orders of magnitude

A physicist's first step with a new problem is often an estimate. Nature spans an enormous range of scales:

| Quantity | Smallest | Largest | Span |
|---|---|---|---|
| Length | proton, $10^{-15}\ \text{m}$ | observable universe, $10^{26}\ \text{m}$ | over 40 orders |
| Time | Planck time, $10^{-44}\ \text{s}$ | age of the universe, $10^{17}\ \text{s}$ | about 60 orders |
| Energy | a chemical bond, $10^{-19}\ \text{J}$ | a supernova, $10^{44}\ \text{J}$ | over 60 orders |

A Fermi estimate breaks a question into factors whose sizes can be guessed to within a factor of a few, and multiplies them. The answer is rarely exact, but it is seldom wrong by more than a factor of ten, which is often enough to tell whether an idea is feasible. The number of cells in a human body, for instance, is roughly the body's mass divided by that of one cell, $70\ \text{kg}/10^{-12}\ \text{kg} \approx 10^{13}\text{–}10^{14}$. Dimensional analysis serves a similar purpose: an equation must balance in its units, and the combination of quantities that can appear in an answer is often fixed by dimensions alone.

## Mathematics as the language of science

One law can be read three equivalent ways: as a differential equation, as an algebraic solution, and as a graph. The simplest case is a constant rate:

$$\frac{dx}{dt} = c \quad\Longrightarrow\quad x(t) = x(0) + ct \qquad(\text{a straight line of slope } c)$$

If the rate depends on the state itself, as for a radioactive sample, separating variables gives an exponential:

$$\boxed{\frac{dx}{dt} = cx \quad\Longrightarrow\quad x(t) = x_0\,e^{ct}}$$

- $c > 0$: monotonic exponential growth, **asymptotically unstable**.
- $c = 0$: constant, $x(t) = x_0$.
- $c < 0$: monotonic decay to zero, **asymptotically stable**.

Letting $c$ be complex, $c = a + ib$, adds oscillation. Euler's formula gives

$$\boxed{x(t) = x_0\,e^{at}\,e^{ibt} = x_0\,e^{at}\left(\cos bt + i\sin bt\right)}$$

The real part $a$ sets the **envelope** $e^{at}$: growing oscillations for $a > 0$ (unstable), sustained oscillations for $a = 0$ (a centre), damped oscillations for $a < 0$ (stable). The imaginary part $b$ sets the **frequency**. This is exactly the language used later for the eigenvalues of the Lotka–Volterra Jacobian.

Higher-order equations reduce to first-order systems. For $\ddot x = -\alpha x$, set $x_1 = x$ and $x_2 = \dot x$:

$$\frac{d}{dt}\begin{pmatrix}x_1\\x_2\end{pmatrix} = \begin{pmatrix}x_2\\-\alpha x_1\end{pmatrix},\qquad\text{in general}\quad \frac{d\mathbf R}{dt} = \mathbf F(\mathbf R)$$

$\mathbf F$ is a **vector field**: it assigns a velocity to every state, and the motion follows the arrows.

The deck ends with the mathematical toolkit of science: **geometry** (linear algebra: patterns, state spaces), **change** (calculus: ODEs, PDEs, variational principles) and **chance** (probability and statistics, with deterministic chaos and quantum mechanics as special cases).

## Non-dimensionalisation

Non-dimensionalising an equation means removing its units by measuring each variable in a characteristic scale. It reduces the number of parameters to a few dimensionless groups, shows which effects dominate, lets a small experiment stand for a large system (dynamic similarity, as in wind tunnels), and avoids numerical trouble from very large or very small numbers.

**Procedure.** (1) List the variables. (2) Choose scales $L_0$, $T_0$, $U_0$. (3) Define $x^* = x/L_0$, $t^* = t/T_0$, $u^* = u/U_0$. (4) Rewrite derivatives by the chain rule, e.g. $\dfrac{du}{dt} = \dfrac{U_0}{T_0}\dfrac{du^*}{dt^*}$. (5) Divide by one coefficient so the rest become dimensionless groups.

**Worked example: the damped oscillator** $m\ddot x + c\dot x + kx = 0$. Put $x = Xx^*$, $t = Tt^*$:

$$\frac{mX}{T^2}\ddot x^* + \frac{cX}{T}\dot x^* + kX\,x^* = 0$$

Choose $T = \sqrt{m/k}$ and divide by $kX$:

$$\boxed{\ddot x^* + 2\zeta\,\dot x^* + x^* = 0,\qquad \zeta = \frac{c}{2\sqrt{mk}}\ \ (\text{damping ratio})}$$

Three parameters collapse into one, and $X$ drops out because the equation is linear. Other dimensionless numbers are ratios of two effects:

| Number | Formula | Ratio of |
|---|---|---|
| Reynolds | $Re = \rho uL/\mu$ | inertial / viscous forces |
| Mach | $Ma = u/c$ | flow speed / speed of sound |
| Froude | $Fr = u/\sqrt{gL}$ | inertia / gravity |
| Péclet | $Pe = uL/\alpha$ | advection / diffusion |

## The pillars of modelling

1. **Scales and separation of effects.** Systems have micro, meso and macro scales; when $\varepsilon = \ell_\text{micro}/L_\text{macro} \ll 1$, microscopic fluctuations average out into continuum equations (the gas laws from molecular collisions).
2. **Underlying principles.** Start from fundamental laws: conservation of mass, momentum, energy, or reaction rates.
3. **Mathematical formulation.** Translate them into equations, often a conservation law $\dfrac{\partial\psi}{\partial t} + \nabla\cdot\mathbf F(\psi) = S(\psi)$.
4. **Prediction and its limits.** A model allows interpolation, extrapolation, scenario testing and optimisation, but carries measurement and parameter uncertainty, fails outside its assumed scales, and may be chaotic.
5. **Reductionism vs holism.** "The whole is the sum of its parts" vs "more is different".

The course's two worked examples follow: the logistic map (discrete) and the Lotka–Volterra model (continuous).

## Iterated maps

Many systems change in discrete steps, such as a population counted once a generation. They can be described by a map $x_{n+1} = f(x_n)$, and the question is how the sequence $x_0, x_1, x_2, \dots$ behaves in the long run. A **fixed point** satisfies $x^* = f(x^*)$; if the sequence starts there, it stays there. Whether nearby points approach it is decided by the slope of the map. Writing $x_n = x^* + \varepsilon_n$ and expanding gives $\varepsilon_{n+1} \approx f'(x^*)\,\varepsilon_n$, so

$$\boxed{x^* \text{ is stable if } |f'(x^*)| < 1,\qquad \text{unstable if } |f'(x^*)| > 1}$$

A positive slope gives monotonic approach or escape, a negative slope gives oscillation about the fixed point. The linear map $f(x) = mx + c$ shows all four kinds of behaviour as $m$ varies, and its constant $c$ only moves the fixed point, to $x^* = c/(1 - m)$, without affecting stability. A cobweb plot, drawn by moving alternately to the curve $y = f(x)$ and the line $y = x$, shows the iteration graphically.

## The logistic map

The logistic map

$$\boxed{x_{n+1} = r\,x_n(1 - x_n),\qquad 0 \le x \le 1,\ 0 < r \le 4}$$

is the simplest model of a population that grows when small but is limited by crowding: $rx_n$ describes growth and $(1 - x_n)$ the effect of limited resources. It is the discrete counterpart of the logistic equation $dN/dt = rN(1 - N/K)$. Since $f'(x) = r(1 - 2x)$:

$$\boxed{x^* = 0\ \ (f' = r),\qquad x^* = 1 - \frac1r\ \ (f' = 2 - r)}$$

| Range of $r$ | Long-term behaviour |
|---|---|
| $0 < r < 1$ | $x^* = 0$ stable: the population dies out |
| $1 < r < 3$ | $x^* = 1 - 1/r$ stable: a steady population (monotonic for $r < 2$, oscillating for $2 < r < 3$) |
| $r = 3$ | slope at $x^*$ passes through $-1$: the fixed point becomes unstable |
| $3 < r < 1 + \sqrt6 \approx 3.45$ | a stable 2-cycle (a fixed point of $f(f(x))$) |
| $3.45 < r < r_\infty \approx 3.57$ | 4-cycle, 8-cycle, …: period doubling, gaps shrinking by Feigenbaum's $\approx 4.67$ |
| $r > 3.57$ | chaos, with periodic windows (a 3-cycle near $r \approx 3.83$); fully chaotic at $r = 4$ |

Chaos here means **deterministic chaos**. The rule is completely determined, with no randomness, yet the sequence never repeats, and two starting values that differ by a tiny amount soon lead to completely different sequences. Long-term prediction is therefore impossible in practice, because the initial state can never be known exactly. At $r = 4$ the map is equivalent under $x = \sin^2\theta$ to doubling an angle at each step. The striking lesson is that a nonlinear term as simple as $-rx^2$ is enough to produce all this, whereas a linear map can only converge, diverge or oscillate.

![Cobweb diagrams for r = 2.5, 3.3 and 3.9](fig/logistic-cobweb.svg)

*Figure. Cobweb diagrams. Draw the map and the line $y=x$, then bounce between them. For $r=2.5$ the orbit spirals into the fixed point $x^*=0.6$; for $r=3.3$ it ends on a 2-cycle; for $r=3.9$ it never settles.*

![Bifurcation diagram of the logistic map](fig/logistic-bifurcation.png)

*Figure. Bifurcation diagram. For each $r$ the long-term values of $x$. The fixed point splits into a 2-cycle at $r=3$, then 4, 8, ... until chaos near $r\approx3.57$, with periodic windows inside.*

## The prey–predator model

Continuous change is described by differential equations. Lotka and Volterra modelled a prey population $X$ and a predator population $Y$ by

$$\boxed{\frac{dX}{dt} = \alpha X - \beta XY,\qquad \frac{dY}{dt} = \gamma XY - \delta Y}$$

Prey grow at rate $\alpha$ when there are no predators; they are eaten at a rate proportional to encounters, $\beta XY$; predators grow in proportion to the food they catch, $\gamma XY$; and predators die at rate $\delta$ when there is no food. Measuring the populations and time in natural units reduces the four parameters to a single ratio, $a = \delta/\alpha$.

**Steady states** come from setting both rates to zero:

$$\boxed{(X^*, Y^*) = (0, 0)\qquad\text{and}\qquad (X^*, Y^*) = \left(\frac{\delta}{\gamma},\ \frac{\alpha}{\beta}\right)}$$

**Stability** comes from linearising (a Taylor expansion about the point), that is, from the eigenvalues of the Jacobian

$$J = \begin{pmatrix} \alpha - \beta Y & -\beta X \\ \gamma Y & \gamma X - \delta \end{pmatrix}$$

| Eigenvalues | Behaviour near the point |
|---|---|
| both real and negative | stable node: states approach |
| one positive | unstable (a saddle if the other is negative) |
| complex, real part $\neq 0$ | spiral, in (negative) or out (positive) |
| purely imaginary | centre: closed cycles |

At the origin $J = \text{diag}(\alpha, -\delta)$, eigenvalues $\alpha$ and $-\delta$: a saddle, so a few prey would multiply and extinction is unstable. At the coexistence point the eigenvalues are $\lambda = \pm i\sqrt{\alpha\delta}$, so populations near it oscillate with period $T = 2\pi/\sqrt{\alpha\delta}$. The full nonlinear equations have a conserved quantity, and their orbits are closed loops: prey increase, predators follow, prey decline, predators decline, and the cycle repeats. Because the eigenvectors at the coexistence point are complex, the real populations are obtained by combining the complex solution with its conjugate, which produces sines and cosines.

**On a computer** (slides "Velocity vector field" and "Numerical integration"): plotting $(dX/dt, dY/dt)$ as an arrow at each grid point gives the vector field; for $(\alpha, \beta, \gamma, \delta) = (2, 1, 1, 2)$ the flow circles $(2, 2)$. Integrating numerically from $(X_0, Y_0) = (0.75, 2)$ gives oscillations in which the prey peak comes before the predator peak: the rabbits lead the foxes in phase.

Small changes to the model can change its behaviour qualitatively. If prey are harvested at a constant rate, for example, the coexistence point keeps the same prey level but has fewer predators, and the closed cycles are replaced by oscillations that grow, so the system is no longer stable.

![Lotka–Volterra phase portrait and time series](fig/lotka-volterra.svg)

*Figure. Lotka–Volterra. The orbits are closed loops around the coexistence point, each a level curve of $V$; in time, predators peak a quarter cycle after prey.*

# Reference: Scales, modelling and nonlinear dynamics

The course material section by section, in the order of the textbook, with the key formulas.

## Science and scales (lectures 1–2)

- Theory: tested, predictive, falsifiable explanation; not a guess. Method: observe → hypothesise → predict → test → revise.
- Induction (cases → rule), deduction (rule → case), abduction (best explanation of an observation).
- Reductionism (whole from parts) vs holism (emergent properties of the whole).
- DNA computing: Adleman 1994, Hamiltonian path with DNA strands (massive parallelism). Quantum computing at keyword level.
- Fermi estimate: product of guessable factors; aim for the right power of ten.
- Non-dimensionalise: scale each variable by a natural unit; count the parameters that remain.

## Maps (`maps.tex`)

- xₙ₊₁ = f(xₙ); fixed point x\* = f(x\*); stable iff |f′(x\*)| < 1. f′ > 0 monotonic, f′ < 0 oscillating.
- Linear map mx + c: x\* = c/(1 − m); |m| < 1 converges, |m| > 1 diverges, m = −1 2-cycle, m = 1 no fixed point (c ≠ 0) or all points fixed (c = 0). c never affects stability.
- Cobweb: vertical to y = f(x), horizontal to y = x, repeat.

## Logistic map xₙ₊₁ = rxₙ(1 − xₙ), 0 < r ≤ 4

| r | Behaviour |
| --- | --- |
| 0 < r < 1 | x\* = 0 stable: extinction |
| r = 1 | transcritical: the two fixed points exchange stability |
| 1 < r < 3 | x\* = 1 − 1/r stable (f′ = 2 − r); superstable at r = 2 |
| r = 3 | f′ = −1: period doubling, 2-cycle appears |
| 3 < r < 1 + √6 ≈ 3.449 | stable 2-cycle |
| up to r∞ ≈ 3.570 | 4, 8, 16 … cycles; gaps shrink by δ ≈ 4.669 |
| r > 3.570 | chaos, with windows (period 3 near 3.83) |
| r = 4 | full chaos; x = sin²θ gives θ → 2θ |

- 2-cycle points: roots of x² − (1 + 1/r)x + (r + 1)/r² = 0, real only for r > 3.
- Deterministic chaos: deterministic rule, aperiodic, sensitive to initial conditions.
- Continuous analogue: dN/dt = rN(1 − N/K).

## Lotka–Volterra (lecture 3)

$$
\frac{dX}{dt} = \alpha X - \beta XY,\qquad \frac{dY}{dt} = \gamma XY - \delta Y
$$

- Terms: prey growth αX, predation βXY, predator growth from food γXY, predator death δY.
- Fixed points: (0, 0) saddle, eigenvalues α, −δ. (δ/γ, α/β) centre, eigenvalues ±i√(αδ), period 2π/√(αδ).
- Jacobian: J = \[\[α − βY, −βX\], \[γY, γX − δ\]\].
- Eigenvalues and behaviour: both negative real stable node; both positive unstable node; opposite signs saddle; complex with Re < 0 stable spiral, Re > 0 unstable spiral; purely imaginary centre.
- Non-dimensional (x = γX/δ, y = βY/α, τ = αt): dx/dτ = x(1 − y), dy/dτ = ay(x − 1), one parameter a = δ/α.
- Conserved quantity: V = γX − δ ln X + βY − α ln Y, so the orbits are closed.
- Constant prey harvesting h: fixed points (h/α, 0) and (δ/γ, α/β − hγ/βδ); the coexistence point becomes an unstable spiral.

## What to be able to do without notes

- Define theory and the scientific method; distinguish induction, deduction, abduction; reductionism vs holism.
- Make a Fermi estimate with stated assumptions.
- Find fixed points of a map and test stability; draw a cobweb.
- Describe the logistic map's behaviour against r and explain period doubling and chaos.
- Write the LV equations, explain each term, find fixed points, Jacobian and eigenvalues, and interpret them.

# Formulas: Scales, modelling and nonlinear dynamics

Everything you need to write down in this chapter, with the condition under which each result holds.

## Maps and fixed points

A map takes the state at step $n$ to the state at step $n+1$. A fixed point is a state the map leaves unchanged, and it is stable when nearby states are pulled towards it.

$${x_{n+1} = f(x_n),\qquad x^* = f(x^*),\qquad \text{stable} \iff |f'(x^*)| < 1}$$

Sign of the slope: $f'(x^*) > 0$ gives monotonic approach, $f'(x^*) < 0$ gives oscillating approach (the cobweb spirals).

**Linear map** $x_{n+1} = mx_n + c$:

$$\boxed{x^* = \frac{c}{1 - m}}$$

| $m$ | Behaviour |
|---|---|
| $\lvert m\rvert < 1$ | converges to $x^*$ |
| $\lvert m\rvert > 1$ | diverges |
| $m = -1$ | 2-cycle |
| $m = 1$ | no fixed point if $c \ne 0$; every point fixed if $c = 0$ |

The constant $c$ never changes stability. Only $m$ does.

## Logistic map

$${x_{n+1} = r\,x_n(1 - x_n),\qquad 0 < r \le 4}$$

Fixed points and the slope that decides their stability:

$$x^* = 0,\qquad x^* = 1 - \frac1r,\qquad f'(x) = r(1 - 2x)\ \Rightarrow\ f'(0) = r,\quad f'\!\left(1 - \tfrac1r\right) = 2 - r$$

So $x^* = 0$ is stable for $r < 1$, and $x^* = 1 - 1/r$ is stable for $1 < r < 3$.

| $r$ | What happens |
|---|---|
| $0 < r < 1$ | $x^* = 0$ stable (extinction) |
| $r = 1$ | transcritical: the two fixed points swap stability |
| $1 < r < 3$ | $x^* = 1 - 1/r$ stable; superstable at $r = 2$ because $f' = 0$ |
| $r = 3$ | $f' = -1$: period doubling, a 2-cycle is born |
| $3 < r < 1 + \sqrt6 \approx 3.449$ | stable 2-cycle |
| up to $r_\infty \approx 3.570$ | cycles of 4, 8, 16, … |
| $r > 3.570$ | chaos, with windows (period 3 near $3.83$) |
| $r = 4$ | full chaos; $x = \sin^2\theta$ turns the map into $\theta \to 2\theta$ |

2-cycle points are the roots of

$$\boxed{x^2 - \left(1 + \frac1r\right)x + \frac{r+1}{r^2} = 0}$$

whose discriminant $(r+1)(r-3)/r^2$ is positive only for $r > 3$.

Period-doubling gaps shrink by the Feigenbaum ratio:

$$\delta = \lim_{k\to\infty}\frac{r_k - r_{k-1}}{r_{k+1} - r_k} \approx 4.669$$

Continuous analogue (logistic growth with carrying capacity $K$):

$$\frac{dN}{dt} = rN\left(1 - \frac NK\right)$$

## Lotka–Volterra predator–prey

Prey $X$, predator $Y$:

$${\frac{dX}{dt} = \alpha X - \beta XY,\qquad \frac{dY}{dt} = \gamma XY - \delta Y}$$

| Term | Meaning |
|---|---|
| $\alpha X$ | prey growth |
| $\beta XY$ | prey eaten |
| $\gamma XY$ | predator growth from food |
| $\delta Y$ | predator death |

**Fixed points:** $(0,0)$ and $\left(\dfrac{\delta}{\gamma},\dfrac{\alpha}{\beta}\right)$.

**Jacobian:**

$$J = \begin{pmatrix}\alpha - \beta Y & -\beta X\\ \gamma Y & \gamma X - \delta\end{pmatrix}$$

At $(0,0)$ the eigenvalues are $\alpha$ and $-\delta$ (a saddle). At the coexistence point they are $\pm i\sqrt{\alpha\delta}$ (a centre), so the period of small oscillations is

$$\boxed{T = \frac{2\pi}{\sqrt{\alpha\delta}}}$$

**Reading eigenvalues:**

| Eigenvalues | Fixed point |
|---|---|
| both real, negative | stable node |
| both real, positive | unstable node |
| real, opposite signs | saddle |
| complex, $\text{Re} < 0$ | stable spiral |
| complex, $\text{Re} > 0$ | unstable spiral |
| purely imaginary | centre |

**Non-dimensional form** with $x = \gamma X/\delta$, $y = \beta Y/\alpha$, $\tau = \alpha t$ (one parameter left, $a = \delta/\alpha$):

$$\frac{dx}{d\tau} = x(1 - y),\qquad \frac{dy}{d\tau} = a\,y(x - 1)$$

**Conserved quantity** (orbits are closed curves of constant $V$):

$$V = \gamma X - \delta\ln X + \beta Y - \alpha\ln Y$$

**Constant prey harvesting** at rate $h$: the fixed points move to $\left(\dfrac h\alpha, 0\right)$ and $\left(\dfrac\delta\gamma,\ \dfrac\alpha\beta - \dfrac{h\gamma}{\beta\delta}\right)$, and the coexistence point becomes an unstable spiral.

## Estimating

A Fermi estimate is a product of factors you can guess, kept to the right power of ten:

$$\text{answer} \approx \prod_i (\text{guessable factor})_i$$

To non-dimensionalise, scale each variable by a natural unit and count the parameters left over.
# Practice: Scales, modelling and nonlinear dynamics

27 questions with worked answers (tap a solution to open it). Points in brackets, Quiz-1 and midsem style.

## A. State and explain

### Problem 1 [Intro · Recall · 3 pts · Quiz-1 Q4, HW 1a–b]

What is a scientific theory? How is it developed, and how does it differ from other knowledge?

*Solution.* **In one line.** A scientific theory is a well-tested, broad explanation that makes definite predictions which could turn out false.

**How it is built.** Science works in a cycle:

$$\text{observation}\ \to\ \text{hypothesis}\ \to\ \text{prediction}\ \to\ \text{test}\ \to\ \text{revision}$$

A hypothesis becomes a theory only after it survives many independent tests, and even then it is held provisionally.

**How it differs from other knowledge.**

- It is **falsifiable**: some observation could in principle refute it.
- It is **revised** when evidence demands, rather than resting on authority or tradition.
- It is **public**: anyone can repeat the tests.

**Common mistake.** In everyday speech "theory" means a guess. In science it is the opposite: the strongest kind of explanation (the theory of relativity, the atomic theory).

### Problem 2 [Intro · Recall · 3 pts · HW 1c]

Distinguish induction, deduction and abduction with an example of each.

*Solution.* **The three kinds of inference.**

| type | direction | example | certain? |
|---|---|---|---|
| **Induction** | many cases $\to$ general rule | every swan I have seen is white, so all swans are white | no: one black swan breaks it |
| **Deduction** | general law $\to$ a specific case | all metals conduct; copper is a metal; so copper conducts | yes, if the premises are true |
| **Abduction** | observation $\to$ best explanation | the lawn is wet, so it probably rained | no: sprinklers also wet lawns |

**In science.** Abduction proposes a hypothesis, deduction derives its predictions, and induction generalises from the tests.

### Problem 3 [Intro · Recall · 2 pts · HW 1d–e]

What are reductionism and holism? Give an example of each.

*Solution.* **Reductionism.** Explain a system by its parts and their interactions.

- *Example:* the pressure of a gas follows from molecules colliding with the walls (kinetic theory).

**Holism.** The whole can have properties that the parts do not have.

- *Example:* consciousness, or the stability of an ecosystem. No single neuron or species shows it.

**How they fit together.** Most of physics works by reduction, but behaviour such as phase transitions and chaos emerges only when many parts interact, so both views are needed.

### Problem 4 [Intro · Recall · 2 pts · HW 1f]

Explain DNA computing in your own words.

*Solution.* **Idea.** Use DNA molecules as both memory and processor.

1. **Encode.** Each possible answer (for example a path through a graph) is written as a strand of DNA.
2. **Mix.** Billions of strands in a test tube react at once, so all candidates are tried **in parallel**.
3. **Select.** Chemical steps (copying, cutting, filtering) keep only the strands that satisfy the conditions.
4. **Read.** Whatever survives is the answer.

**Example.** Adleman (1994) solved a seven-city Hamiltonian-path problem this way.

**Limits.** It is massively parallel but slow to set up and read out, so it is a proof of principle rather than a competitor to silicon.

### Problem 5 [Intro · Recall · 2 pts · HW 3a–b]

Why are steady states important, and how do the eigenvalues of the Jacobian decide the behaviour near one?

*Solution.* **Why they matter.** A steady state is where $\dot{\mathbf x} = 0$. Near one, the system either returns or leaves, so steady states organise the long-term behaviour.

**Linearise.** Write $\mathbf x = \mathbf x^* + \boldsymbol\epsilon$, so $\dot{\boldsymbol\epsilon} = J\boldsymbol\epsilon$ with $J_{ij} = \partial f_i/\partial x_j\big|_{\mathbf x^*}$. Along each eigenvector

$$\epsilon(t) \propto e^{\lambda t}$$

- $\text{Re}\,\lambda < 0$ for all eigenvalues: **stable** (decay).
- Any $\text{Re}\,\lambda > 0$: **unstable** (growth).
- $\text{Im}\,\lambda \ne 0$: rotation (spiral); $\text{Re}\,\lambda = 0$ with $\text{Im}\,\lambda \ne 0$: a **centre**.

**Common mistake.** At a centre the linearisation is not conclusive for the full nonlinear system. Say "neutral at linear order", not "stable".

### Problem 6 [Intro · Recall · 2 pts · HW 4c]

Explain why the logistic map period-doubles at r = 3.

*Solution.* **Fixed point.** $x^* = 1 - 1/r$. The slope of the map $f(x) = rx(1-x)$ there is

$$f'(x^*) = r(1 - 2x^*) = r\left(1 - 2 + \frac2r\right) = 2 - r$$

**Stability.** $|f'| < 1$ means stable, so $1 < r < 3$. At $r = 3$, $f' = -1$: the deviation $e_{n+1} = f'e_n = -e_n$ flips sign each step without shrinking. Beyond $r = 3$ it flips sign and **grows**.

**What happens next.** $f(f(x))$ acquires two new stable fixed points. The orbit alternates between them: a **2-cycle** (period doubling).

**Common mistake.** The slope reaches $-1$, not $+1$. $f' = +1$ (at $r = 1$) gives a transcritical bifurcation instead.

### Problem 7 [Intro · Recall · 2 pts · HW 4d]

Explain "deterministic chaos" and how it is seen in the logistic map.

*Solution.* **Definition.** Deterministic chaos is **aperiodic, unpredictable behaviour from a deterministic rule**. Nothing is random; the unpredictability comes from extreme sensitivity to initial conditions.

**In the logistic map.** For $r > 3.57$ (fully developed at $r = 4$) the orbit never repeats. Two starts that differ in the sixth decimal place

$$x_0 = 0.200000\quad\text{and}\quad x_0' = 0.200001$$

separate exponentially, $|\delta_n| \approx |\delta_0|e^{\lambda n}$ with Lyapunov exponent $\lambda > 0$, and are completely different within a few dozen iterations.

**Consequence.** Long-term prediction fails, because any measurement error eventually grows to the size of the whole range.

**Common mistake.** Chaos is not noise: the rule is simple, and short-term prediction still works.

## B. Show or derive

### Problem 8 [Intro · Derivation · 3 pts · HW 4b, practice P2]

For f(x) = mx + c, show that c is immaterial to the stability of the fixed point.

*Solution.* **Fixed point.** $x^* = mx^* + c \Rightarrow x^* = \dfrac{c}{1-m}$.

**Perturb.** Let $x_n = x^* + e_n$:

$$x^* + e_{n+1} = m(x^* + e_n) + c = \underbrace{mx^* + c}_{x^*} + me_n$$

$$e_{n+1} = m\,e_n \quad\Rightarrow\quad e_n = m^n e_0$$

The constant $c$ has cancelled. The fixed point is stable iff $|m| < 1$, for any $c$; $c$ only **shifts** $x^*$.

### Problem 9 [Intro · Derivation · 4 pts · practice P1]

For the logistic map, find the fixed points and their stability ranges in r. Name the bifurcations at r = 1 and r = 3.

*Solution.* **Fixed points.** Solve $x = rx(1-x)$:

$$x^* = 0 \qquad\text{or}\qquad 1 = r(1-x)\ \Rightarrow\ x^* = 1 - \frac1r\ \ (\text{physical for } r \ge 1)$$

**Slope.** $f'(x) = r(1 - 2x)$.

| fixed point | $f'$ | stable when |
|---|---|---|
| $0$ | $r$ | $r < 1$ |
| $1 - 1/r$ | $2 - r$ | $1 < r < 3$ |

**Bifurcations.**

- $r = 1$: the two fixed points meet and exchange stability, a **transcritical** bifurcation.
- $r = 3$: $f' = -1$, a **period-doubling** bifurcation (2-cycle born).

**Common mistake.** At $r = 1$ no fixed point is created or destroyed; they merely swap stability.

### Problem 10 [Intro · Derivation · 2 pts · practice P3]

Find the value of r for which the non-trivial fixed point is superstable (f′(x\*) = 0).

*Solution.* **Superstable** means $f'(x^*) = 0$, so errors shrink faster than geometrically.

$$f'(x^*) = r(1 - 2x^*) = 0 \Rightarrow x^* = \tfrac12$$

$$x^* = 1 - \frac1r = \frac12 \Rightarrow \frac1r = \frac12 \Rightarrow \boxed{r = 2}$$

**Check.** $f'(x^*) = 2 - r = 0$ at $r = 2$ ✓ (using the other form of the slope).

### Problem 11 [Intro · Derivation · 4 pts · Quiz-1 Q1]

f(x) = x² − 3x + 1 has roots c₁ = 2.63, c₂ = 0.38. For g₁(x) = (x² + 1)/3 and g₂(x) = 3 − 1/x, (a) show g(x) = x has c₁, c₂ as solutions; (b) find a∞ and b∞ for aₙ₊₁ = g₁(aₙ), bₙ₊₁ = g₂(bₙ). Why?

*Solution.* **(a)** $g_1(x) = x$:

$$\frac{x^2+1}{3} = x \Rightarrow x^2 - 3x + 1 = 0$$

$g_2(x) = x$:

$$3 - \frac1x = x \Rightarrow 3x - 1 = x^2 \Rightarrow x^2 - 3x + 1 = 0$$

Both give $f(x) = 0$, so $c_1 = 2.63$ and $c_2 = 0.38$ are fixed points of both maps.

**(b)** A fixed point attracts only if $|g'| < 1$.

$$g_1'(x) = \frac{2x}{3}:\quad g_1'(c_2) = 0.25\ \text{(stable)},\quad g_1'(c_1) = 1.75\ \text{(unstable)}$$

$$g_2'(x) = \frac1{x^2}:\quad g_2'(c_1) = 0.14\ \text{(stable)},\quad g_2'(c_2) = 6.9\ \text{(unstable)}$$

$$\boxed{a_\infty = c_2 = 0.38},\qquad \boxed{b_\infty = c_1 = 2.63}$$

**Common mistake.** Same equation, different rearrangement, different answer. The rearrangement decides which root is stable.

### Problem 12 [Intro · Derivation · 8 pts · 2026 midsem Q8] (hard)

Newton's iteration xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) for f(x) = 1/x − a computes 1/a. (a) Show it needs no division. (b) Show it is equivalent to a logistic map and find r; how does the map behave for this r? (c) For which x₀ does it converge to 1/a, and what happens otherwise?

*Solution.* **(a) No division.** With $f = 1/x - a$, $f' = -1/x^2$:

$$x_{n+1} = x_n - \frac{1/x_n - a}{-1/x_n^2} = x_n + x_n^2\left(\frac1{x_n} - a\right) = 2x_n - a x_n^2$$

Only multiplication and subtraction.

**(b) Logistic map.** Let $z = ax/2$:

$$z_{n+1} = \frac a2(2x_n - ax_n^2) = 2z_n - 2z_n^2 = 2z_n(1 - z_n)\ \Rightarrow\ \boxed{r = 2}$$

The fixed point $z^* = \tfrac12$ (that is, $x = 1/a$) has $f' = 0$: it is **superstable**, so convergence is quadratic and the number of correct digits doubles each step.

**(c) Basin.** Converges for $0 < z_0 < 1$, that is $0 < x_0 < 2/a$. Outside, $z_1 \le 0$, and from a negative value the iterates run off to $-\infty$.

**Common mistake.** Starting at $x_0 > 2/a$: the first step overshoots to a negative value.

### Problem 13 [Intro · Derivation · 4 pts · HW 3c–d, practice P8–P9]

Write the Lotka–Volterra equations and explain each term. Find the fixed points, the Jacobian and its eigenvalues at each, and describe the behaviour nearby.

*Solution.* **Model.** $\dot X = \alpha X - \beta XY$ (prey), $\dot Y = \gamma XY - \delta Y$ (predator): $\alpha$ prey birth, $\beta$ predation, $\gamma$ predator gain, $\delta$ predator death.

**Fixed points.** $X(\alpha - \beta Y) = 0$ and $Y(\gamma X - \delta) = 0$:

$$(0,0)\qquad\text{and}\qquad \left(\frac\delta\gamma,\ \frac\alpha\beta\right)$$

**Jacobian.**

$$J = \begin{pmatrix}\alpha - \beta Y & -\beta X\\ \gamma Y & \gamma X - \delta\end{pmatrix}$$

**At $(0,0)$:** $J = \text{diag}(\alpha, -\delta)$, eigenvalues $\alpha > 0$ and $-\delta < 0$: a **saddle**.

**At coexistence:**

$$J = \begin{pmatrix}0 & -\beta\delta/\gamma\\ \gamma\alpha/\beta & 0\end{pmatrix}\ \Rightarrow\ \lambda^2 = -\alpha\delta\ \Rightarrow\ \lambda = \pm i\sqrt{\alpha\delta}$$

A **centre**: populations cycle with period $2\pi/\sqrt{\alpha\delta}$, predators lagging prey by a quarter cycle.

**Common mistake.** Pure imaginary eigenvalues alone don't prove closed orbits; the conserved quantity in Problem 16 does.

### Problem 14 [Intro · Derivation · 3 pts · HW 3e, practice P11]

Non-dimensionalise the LV equations and identify the controlling parameter.

*Solution.* **Scale.** Let $x = \gamma X/\delta$, $y = \beta Y/\alpha$, $\tau = \alpha t$. Then

$$\frac{dx}{d\tau} = \frac{\gamma}{\delta\alpha}\left(\alpha X - \beta XY\right) = x(1 - y)$$

$$\frac{dy}{d\tau} = \frac{\beta}{\alpha^2}\left(\gamma XY - \delta Y\right) = \frac\delta\alpha\,y(x - 1)$$

$$\boxed{\frac{dx}{d\tau} = x(1-y),\qquad \frac{dy}{d\tau} = a\,y(x-1),\qquad a = \frac\delta\alpha}$$

Four parameters collapse to one: $a$, the ratio of predator death rate to prey birth rate. The fixed point is $(1,1)$ and the small-oscillation period is $2\pi/\sqrt a$ in $\tau$.

### Problem 15 [Intro · Derivation · 8 pts · 2026 midsem Q9] (hard)

Modify the LV model so that prey are harvested at a constant rate h. Find the rate laws, the fixed points and the behaviour near them. Comment.

*Solution.* **Model.**

$$\dot X = \alpha X - \beta XY - h,\qquad \dot Y = \gamma XY - \delta Y$$

**Fixed points.** From $\dot Y = 0$: $Y = 0$ or $X = \delta/\gamma$.

- $Y = 0$: $\alpha X = h \Rightarrow X = h/\alpha$ (predators extinct).
- $X = \delta/\gamma$: $\alpha - \beta Y = h\gamma/\delta \Rightarrow Y^* = \dfrac\alpha\beta - \dfrac{h\gamma}{\beta\delta}$, which needs $h < \alpha\delta/\gamma$.

**Stability at $(\delta/\gamma, Y^*)$.**

$$J = \begin{pmatrix}h\gamma/\delta & -\beta\delta/\gamma\\ \gamma Y^* & 0\end{pmatrix},\qquad \text{tr} = \frac{h\gamma}\delta > 0,\quad \det = \beta\delta Y^* > 0$$

Positive trace and determinant: an **unstable node or spiral** (a spiral when $\text{tr}^2 < 4\det$, which holds for small $h$).

**At $(h/\alpha, 0)$:** eigenvalues $\alpha > 0$ and $\gamma h/\alpha - \delta$, a **saddle** when $h < \alpha\delta/\gamma$.

**Comment.** The prey level stays $\delta/\gamma$, but predators are fewer, and the neutral cycles are destroyed, so swings grow.

### Problem 16 [Intro · Derivation · 3 pts · practice P12]

Show that V = γX − δ ln X + βY − α ln Y is constant along LV trajectories.

*Solution.* **Differentiate along a trajectory.**

$$\frac{dV}{dt} = \left(\gamma - \frac\delta X\right)\dot X + \left(\beta - \frac\alpha Y\right)\dot Y$$

Factor each bracket:

$$\gamma - \frac\delta X = \frac{\gamma X - \delta}{X},\qquad \beta - \frac\alpha Y = \frac{\beta Y - \alpha}{Y}$$

Substitute $\dot X/X = \alpha - \beta Y$ and $\dot Y/Y = \gamma X - \delta$:

$$\frac{dV}{dt} = (\gamma X - \delta)(\alpha - \beta Y) + (\beta Y - \alpha)(\gamma X - \delta) = 0$$

So $V$ is conserved and trajectories lie on level curves of $V$, which are closed loops around $(\delta/\gamma, \alpha/\beta)$.

### Problem 17 [Intro · Derivation · 3 pts · Quiz-1 Q2]

For the SHO, write the equation of motion and non-dimensionalise it.

*Solution.* **Equation of motion.** $m\ddot x = -kx$.

**Scale.** Let $\tau = t\sqrt{k/m}$ and $\xi = x/x_0$ with $x_0$ any length scale:

$$\frac{d}{dt} = \sqrt{\frac km}\frac d{d\tau}\ \Rightarrow\ m\cdot\frac km\,x_0\,\xi'' = -kx_0\xi\ \Rightarrow\ \boxed{\xi'' + \xi = 0}$$

No parameters are left: in these units **every** oscillator is identical. The only physical content is the time scale $\sqrt{m/k}$.

## C. Estimates

### Problem 18 [Intro · Numerical · 3 pts · Quiz-1 Q3]

Estimate the number of cells in an adult human body.

*Solution.* **Idea.** A Fermi estimate: (mass of a body) ÷ (mass of one cell), keeping to the right power of ten.

$$m_\text{cell} \approx \rho\,V \approx (10^3\ \text{kg m}^{-3})(10\ \mu\text{m})^3 = (10^3)(10^{-15}) = 10^{-12}\ \text{kg}\quad(\text{cells are mostly water})$$

$$N \approx \frac{70\ \text{kg}}{10^{-12}\ \text{kg}} = \boxed{\sim10^{13}\text{–}10^{14}}\quad(\text{accepted estimate about } 3\times10^{13})$$

Cells vary a lot in size (red blood cells are far smaller), but the answer lands in the right range.

### Problem 19 [Intro · Numerical · 3 pts · HW 2b]

Estimate the maximum kinetic energy of a bowled cricket ball, its rest energy mc², and the ratio.

*Solution.* **Idea.** Compare $K = \tfrac12mv^2$ with the rest energy $mc^2$.

$$K \approx \tfrac12(0.16)(40)^2 \approx \boxed{130\ \text{J}},\qquad mc^2 \approx (0.16)(9\times10^{16}) \approx \boxed{1.4\times10^{16}\ \text{J}}$$

$$\frac{K}{mc^2} \approx \boxed{10^{-14}}$$

Everyday motion uses a minuscule fraction of the energy locked in mass.

### Problem 20 [Intro · Numerical · 3 pts · HW 2c]

How long would it take to walk from campus to the airport (about 30 km), and how much energy would you spend? Compare a 50-minute car journey.

*Solution.* **Time.** At walking speed $5$ km/h:

$$t = \frac{30\ \text{km}}{5\ \text{km/h}} = \boxed{6\ \text{h}}\ (\approx 2\times10^4\ \text{s})$$

**Energy.** Walking costs about $250$ W above resting:

$$E \approx (250\ \text{W})(2\times10^4\ \text{s}) = 5\times10^6\ \text{J} = \boxed{5\ \text{MJ}}\ (\approx 1200\ \text{kcal})$$

**Car** (50 minutes, about 12 km/L): fuel $= 30/12 = 2.5$ L of petrol at about $34$ MJ/L:

$$E_\text{car} \approx 2.5 \times 34 \approx 85\ \text{MJ}$$

The car is about $17$ times more energy-expensive, but about $7$ times faster.

### Problem 21 [Intro · Numerical · 2 pts · HW 2a]

Estimate the power needed by a hovering mosquito.

*Solution.* **Idea.** To hover, the mosquito must push air downward at a rate that supplies a force equal to its weight, and power $=$ force $\times$ speed of the air pushed.

$$W = mg = (2\times10^{-6}\ \text{kg})(10) = 2\times10^{-5}\ \text{N}$$

$$P \approx W\,v_\text{air} \approx (2\times10^{-5}\ \text{N})(1\ \text{m/s}) = 2\times10^{-5}\ \text{W}$$

Allowing for inefficiency, $\boxed{P \sim 10^{-4}\ \text{W}}$, a few tens to a hundred microwatts.


## D. More practice: maps, models and estimates

### Problem 22 [Intro · Numerical · 2 pts]

The logistic map is $x_{n+1} = rx_n(1 - x_n)$ with $r = 2.5$. Find the non-zero fixed point, decide whether it is stable, and iterate twice from $x_0 = 0.2$.

*Solution.* **Idea.** A fixed point satisfies $x^* = f(x^*)$ and is stable when $|f'(x^*)| < 1$.

**Fixed point.** $x^* = rx^*(1 - x^*)\Rightarrow x^* = 1 - \dfrac1r = 1 - 0.4 = \boxed{0.6}$

**Stability.** $f'(x) = r(1 - 2x)$, so

$$f'(0.6) = 2.5(1 - 1.2) = -0.5,\qquad |f'| = 0.5 < 1\ \Rightarrow\ \text{stable}$$

**Iterates.**

$$x_1 = 2.5(0.2)(0.8) = 0.4,\qquad x_2 = 2.5(0.4)(0.6) = 0.6 = x^*$$

**Check.** In general $f'(x^*) = 2 - r$, so the fixed point is stable for $1 < r < 3$. The negative slope means the iterates alternate on the two sides of $x^*$ as they converge.

### Problem 23 [Intro · Numerical · 3 pts]

For the logistic map with $r = 3.2$, find the two points of the period-2 cycle.

*Solution.* **Idea.** A period-2 point satisfies $x = f(f(x))$ but $x \ne f(x)$.

$f(f(x)) = x$ is a quartic. Two roots are the fixed points $0$ and $1 - 1/r$; dividing them out leaves the quadratic

$$r^2x^2 - r(r+1)x + (r+1) = 0$$

$$x_\pm = \frac{(r+1) \pm \sqrt{(r+1)(r-3)}}{2r}$$

**Substitute $r = 3.2$:**

$$x_\pm = \frac{4.2 \pm\sqrt{(4.2)(0.2)}}{6.4} = \frac{4.2 \pm 0.917}{6.4} = \boxed{0.799\ \text{and}\ 0.513}$$

**Check.** $f(0.513) = 3.2(0.513)(0.487) = 0.799$ and $f(0.799) = 3.2(0.799)(0.201) = 0.514$ ✓. The cycle only exists for $r > 3$, since the square root needs $(r+1)(r-3) \ge 0$: this is where the fixed point loses stability.

### Problem 24 [Intro · Derivation · 2 pts]

Show that the logistic-map fixed point $x = 0$ is stable for $r < 1$ and unstable for $r > 1$, and explain in terms of a population what this means.

*Solution.* $f'(x) = r(1 - 2x)$, so $f'(0) = r$.

- $r < 1$: $|f'(0)| < 1$, so small populations shrink each generation by the factor $r$ and the population dies out.
- $r > 1$: $|f'(0)| > 1$, so small populations grow geometrically, and extinction is unstable.

**Why.** For small $x$ the map is $x_{n+1}\approx rx_n$, the pure growth law with no crowding. Crowding (the $-rx^2$ term) matters only once the population is no longer small.

**Common mistake.** $r < 1$ means each generation has less than one surviving offspring per individual, not that the species is rare.

### Problem 25 [Intro · Numerical · 3 pts]

Predator–prey model: $\dot x = ax - bxy$, $\dot y = -cy + dxy$ with $a = 1$, $b = 0.1$, $c = 1.5$, $d = 0.075$. Find the coexistence fixed point and the period of small oscillations around it.

*Solution.* **Fixed point.** Set both rates to zero with $x, y \ne 0$: $a = by$ and $c = dx$, so

$$x^* = \frac cd = \frac{1.5}{0.075} = \boxed{20},\qquad y^* = \frac ab = \frac1{0.1} = \boxed{10}$$

**Linearise.** The Jacobian at $(x^*, y^*)$ is

$$J = \begin{pmatrix}0 & -bx^*\\ dy^* & 0\end{pmatrix} = \begin{pmatrix}0 & -2\\ 0.75 & 0\end{pmatrix},\qquad \lambda^2 = -(2)(0.75) = -1.5$$

so $\lambda = \pm i\omega$ with $\omega = \sqrt{ac} = \sqrt{1.5} = 1.225$.

$$T = \frac{2\pi}{\omega} = \frac{6.283}{1.225} = \boxed{5.13}\ \text{time units}$$

**Check.** The eigenvalues are purely imaginary: a centre, so the populations cycle forever around the fixed point at small amplitude instead of settling. The prey peaks first and the predator peak lags a quarter period behind.

### Problem 26 [Intro · Numerical · 2 pts]

Use dimensional analysis to find how the period $T$ of a simple pendulum depends on its length $l$, mass $m$ and $g$. Estimate $T$ for $l = 1$ m. What does the exact answer add?

*Solution.* **Idea.** Look for $T = Cm^\alpha l^\beta g^\gamma$ with the dimensions matching.

$$[\text{s}] = [\text{kg}]^\alpha[\text{m}]^\beta[\text{m s}^{-2}]^\gamma$$

- kg: $\alpha = 0$ (the period does not depend on the mass)
- s: $1 = -2\gamma\Rightarrow\gamma = -\tfrac12$
- m: $0 = \beta + \gamma\Rightarrow\beta = \tfrac12$

$$T = C\sqrt{l/g}$$

**Estimate.** $\sqrt{1/9.8} = 0.32$ s. The exact small-angle result is $C = 2\pi$, so

$$T = 2\pi\sqrt{l/g} \approx \boxed{2.0\ \text{s}}$$

**Lesson.** Dimensional analysis fixes the scaling exactly but cannot give the dimensionless constant $C$ (here $2\pi$). It also cannot tell you about a dimensionless variable such as the amplitude angle $\theta_0$, which the large-angle period depends on.

### Problem 27 [Intro · Numerical · 2 pts]

Estimate the number of breaths you take in a lifetime.

*Solution.* **Idea.** Rate $\times$ time, rounding generously.

- Rate: about $15$ breaths per minute at rest.
- Minutes per year: $60\times24\times365\approx5\times10^5$.
- Lifetime: about $80$ years.

$$N\approx15\times(5\times10^5)\times80\approx\boxed{6\times10^8}$$

**Check.** The answer is of order $10^9$, between half a billion and a billion. Rounding $525{,}600\to5\times10^5$ is the only approximation; it lowers the answer by about $5\%$.
