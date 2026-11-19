# Learn: Scales, modelling and nonlinear dynamics

The first four lectures: what science is, orders of magnitude, and two nonlinear models, the logistic map and the Lotka–Volterra prey–predator equations. Sources: lectures 1–4, slides `maps.tex`, notes in `03-lecture-notes/nonlinear-dynamics`, HW lectures 1–4. Questions follow Quiz-1, the 2026 midsem Q8 and Q9, and Sections A and B of the practice set.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## What science is

In everyday speech a "theory" is a guess. In science the word means almost the opposite: a well-tested explanation of a wide range of phenomena, which makes definite predictions that could in principle be shown false, and which has survived repeated attempts to do so. The scientific method is the cycle by which such theories are built: observe, propose a hypothesis, deduce its consequences, test them by experiment, and revise the hypothesis when it fails. Three kinds of reasoning take part. Induction generalises from many observations to a rule, as when repeated sunrises suggest that the sun always rises. Deduction derives particular consequences from general laws, as when Newton's laws predict an eclipse. Abduction infers the most plausible explanation of an observation, as a doctor does from symptoms. Reductionism explains a system through its parts, for example a gas through its molecules, while holism holds that some properties belong only to the whole, as an ecosystem's stability or a mind does. The relation between science and computing runs both ways: computers simulate physical systems, and physical systems can compute, as in Adleman's 1994 experiment, which solved a small Hamiltonian-path problem with strands of DNA, or in quantum computers.

## Orders of magnitude

A physicist's first step with a new problem is often an estimate. Nature spans an enormous range of scales, from nuclei of 10⁻¹⁵ m to the observable universe at about 10²⁶ m, and from nuclear times of 10⁻²³ s to the age of the universe at about 10¹⁷ s. A Fermi estimate breaks a question into factors whose sizes can be guessed to within a factor of a few, and multiplies them. The answer is rarely exact, but it is seldom wrong by more than a factor of ten, which is often enough to tell whether an idea is feasible. The number of cells in a human body, for instance, is roughly the body's mass divided by that of one cell, about 70 kg / 10⁻¹² kg ≈ 10¹³–10¹⁴. Dimensional analysis serves a similar purpose: an equation must balance in its units, and the combination of quantities that can appear in an answer is often fixed by dimensions alone. Non-dimensionalising a model, by measuring each variable in units natural to the problem, reveals how many independent parameters actually control its behaviour.

## Iterated maps

Many systems change in discrete steps, such as a population counted once a generation. They can be described by a map xₙ₊₁ = f(xₙ), and the question is how the sequence x₀, x₁, x₂, … behaves in the long run. A fixed point satisfies x\* = f(x\*); if the sequence starts there, it stays there. Whether nearby points approach the fixed point or move away is decided by the slope of the map. Writing xₙ = x\* + εₙ and expanding gives εₙ₊₁ ≈ f′(x\*)εₙ, so the fixed point is stable if |f′(x\*)| < 1 and unstable if |f′(x\*)| > 1. A positive slope gives monotonic approach or escape, a negative slope gives oscillation about the fixed point. The linear map f(x) = mx + c shows all four kinds of behaviour as m varies, and its constant c only moves the fixed point, to c/(1 − m), without affecting stability. A cobweb plot, drawn by moving alternately to the curve y = f(x) and the line y = x, shows the iteration graphically.

## The logistic map

The logistic map xₙ₊₁ = rxₙ(1 − xₙ), with 0 ≤ x ≤ 1 the population as a fraction of its maximum, is the simplest model of a population that grows when small but is limited by crowding. The factor rxₙ describes growth, and the factor (1 − xₙ) the effect of limited resources. It is the discrete counterpart of the logistic equation dN/dt = rN(1 − N/K). The map has two fixed points, x\* = 0 and x\* = 1 − 1/r. Since f′(x) = r(1 − 2x), the origin is stable for r < 1, when the population dies out. For 1 < r < 3 the second fixed point, at which f′ = 2 − r, is stable, and the population settles to a steady value. At r = 3 the slope there passes through −1 and the fixed point becomes unstable. The population then alternates between two values, a 2-cycle, which corresponds to a stable fixed point of the twice-iterated map f(f(x)). As r increases further the 2-cycle itself becomes unstable at r = 1 + √6 ≈ 3.45 and gives way to a 4-cycle, then an 8-cycle, and so on, the successive values of r crowding together by a factor of about 4.67, Feigenbaum's constant. Beyond r∞ ≈ 3.57 the motion is chaotic.

Chaos here means deterministic chaos. The rule is completely determined, with no randomness, yet the sequence never repeats, and two starting values that differ by a tiny amount soon lead to completely different sequences. Long-term prediction is therefore impossible in practice, because the initial state can never be known exactly. Within the chaotic region there are still windows of order, notably a 3-cycle near r ≈ 3.83, and at r = 4 the map is fully chaotic, equivalent under x = sin²θ to doubling an angle at each step. The striking lesson is that a nonlinear term as simple as −rx² is enough to produce all this, whereas a linear map can only converge, diverge or oscillate.

## The prey–predator model

Continuous change is described by differential equations. Lotka and Volterra modelled a prey population X and a predator population Y by dX/dt = αX − βXY and dY/dt = γXY − δY. Prey grow at rate α when there are no predators; they are eaten at a rate proportional to encounters, βXY; predators grow in proportion to the food they catch, γXY; and predators die at rate δ when there is no food. Measuring the populations and time in natural units reduces the four parameters to a single ratio, a = δ/α.

The steady states are found by setting both rates to zero. One is (0, 0), the extinction of both. The other is the coexistence point (δ/γ, α/β). Their stability is decided by linearising the equations, that is, by the eigenvalues of the Jacobian matrix of partial derivatives at each point. If both eigenvalues are real and negative, nearby states approach the point; if one is positive, they move away; if the eigenvalues are complex, the motion spirals, inwards or outwards according to the sign of the real part; and if they are purely imaginary, the motion circles the point. At the origin the eigenvalues are α and −δ, a saddle: a few prey would multiply, so extinction is unstable. At the coexistence point they are ±i√(αδ), so populations near it oscillate with period 2π/√(αδ). The full nonlinear equations have a conserved quantity, and their orbits are closed loops: prey increase, predators follow, prey decline, predators decline, and the cycle repeats. Because the eigenvectors at the coexistence point are complex, the actual real populations are obtained by combining the complex solution with its conjugate, which produces sines and cosines.

Small changes to the model can change its behaviour qualitatively. If prey are harvested at a constant rate, for example, the coexistence point keeps the same prey level but has fewer predators, and the closed cycles are replaced by oscillations that grow, so the system is no longer stable.

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

$$\boxed{x_{n+1} = f(x_n),\qquad x^* = f(x^*),\qquad \text{stable} \iff |f'(x^*)| < 1}$$

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

$$\boxed{x_{n+1} = r\,x_n(1 - x_n),\qquad 0 < r \le 4}$$

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

$$\boxed{\frac{dX}{dt} = \alpha X - \beta XY,\qquad \frac{dY}{dt} = \gamma XY - \delta Y}$$

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

21 questions with worked answers (tap a solution to open it). Points in brackets, Quiz-1 and midsem style.

## A. State and explain

### Problem 1 [Intro · Recall · 3 pts · Quiz-1 Q4, HW 1a–b]

What is a scientific theory? How is it developed, and how does it differ from other knowledge?

*Solution.* A scientific theory is a well-tested explanation of a broad class of phenomena that makes definite, falsifiable predictions (unlike the everyday sense of a guess). It is developed by the cycle of observation, hypothesis, prediction, test and revision, and it is accepted only provisionally, as long as it survives tests. It differs from other knowledge systems in being open to empirical refutation and in being revised when evidence demands it, rather than resting on authority or tradition.

### Problem 2 [Intro · Recall · 3 pts · HW 1c]

Distinguish induction, deduction and abduction with an example of each.

*Solution.* Induction: from many observed cases to a general rule (every swan seen is white, so all swans are white; can fail). Deduction: from a general law to a certain consequence (all metals conduct, copper is a metal, so copper conducts). Abduction: inferring the most plausible explanation (the lawn is wet, so it probably rained).

### Problem 3 [Intro · Recall · 2 pts · HW 1d–e]

What are reductionism and holism? Give an example of each.

*Solution.* Reductionism explains a system by its parts: thermodynamics of a gas from molecular collisions. Holism says the whole has properties not found in the parts: consciousness, or the stability of an ecosystem.

### Problem 4 [Intro · Recall · 2 pts · HW 1f]

Explain DNA computing in your own words.

*Solution.* Information is encoded in DNA strands; mixing them lets billions of molecules react in parallel, each trying a candidate solution, and chemical selection picks out the strands that encode correct answers. Adleman (1994) solved a seven-vertex Hamiltonian path problem this way.

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

*Solution.* A deterministic rule producing aperiodic, unpredictable behaviour, because tiny differences in initial conditions grow exponentially. In the logistic map for r > 3.57 (fully at r = 4), two starting values differing in the sixth decimal separate completely within a few dozen iterations.

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

