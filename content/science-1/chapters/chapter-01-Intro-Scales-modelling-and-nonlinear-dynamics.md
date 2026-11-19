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

*Solution.* A system near a steady state either returns to it or leaves it, so steady states organise the long-term behaviour. Linearising, deviations evolve as e^(λt) along the eigenvectors of the Jacobian: Re λ < 0 decays (stable), Re λ > 0 grows (unstable), imaginary parts give rotation (spirals, or a centre when Re λ = 0).

### Problem 6 [Intro · Recall · 2 pts · HW 4c]

Explain why the logistic map period-doubles at r = 3.

*Solution.* At x\* = 1 − 1/r the slope is f′ = 2 − r, which reaches −1 at r = 3. Beyond that, deviations alternate in sign and grow, so the fixed point is unstable; meanwhile f(f(x)) develops two new stable fixed points, which are the 2-cycle the orbit settles onto.

### Problem 7 [Intro · Recall · 2 pts · HW 4d]

Explain "deterministic chaos" and how it is seen in the logistic map.

*Solution.* A deterministic rule producing aperiodic, unpredictable behaviour, because tiny differences in initial conditions grow exponentially. In the logistic map for r > 3.57 (fully at r = 4), two starting values differing in the sixth decimal separate completely within a few dozen iterations.

## B. Show or derive

### Problem 8 [Intro · Derivation · 3 pts · HW 4b, practice P2]

For f(x) = mx + c, show that c is immaterial to the stability of the fixed point.

*Solution.* x\* = mx\* + c gives x\* = c/(1 − m). With xₙ = x\* + eₙ: eₙ₊₁ = meₙ, independent of c. So stability is |m| < 1 for any c; c only shifts x\*.

### Problem 9 [Intro · Derivation · 4 pts · practice P1]

For the logistic map, find the fixed points and their stability ranges in r. Name the bifurcations at r = 1 and r = 3.

*Solution.* x\* = 0 and x\* = 1 − 1/r (meaningful for r ≥ 1). f′(x) = r(1 − 2x). At 0: f′ = r, stable for r < 1. At 1 − 1/r: f′ = 2 − r, stable for 1 < r < 3. At r = 1 a transcritical bifurcation (the two points cross and exchange stability); at r = 3 a period-doubling bifurcation (2-cycle born).

### Problem 10 [Intro · Derivation · 2 pts · practice P3]

Find the value of r for which the non-trivial fixed point is superstable (f′(x\*) = 0).

*Solution.* f′(x\*) = r(1 − 2x\*) = 0 gives x\* = ½; then 1 − 1/r = ½, so r = 2.

### Problem 11 [Intro · Derivation · 4 pts · Quiz-1 Q1]

f(x) = x² − 3x + 1 has roots c₁ = 2.63, c₂ = 0.38. For g₁(x) = (x² + 1)/3 and g₂(x) = 3 − 1/x, (a) show g(x) = x has c₁, c₂ as solutions; (b) find a∞ and b∞ for aₙ₊₁ = g₁(aₙ), bₙ₊₁ = g₂(bₙ). Why?

*Solution.* (a) g₁(x) = x gives x² + 1 = 3x; g₂(x) = x gives 3x − 1 = x². Both are x² − 3x + 1 = 0. (b) g₁′ = 2x/3: 0.25 at c₂ (stable), 1.75 at c₁ (unstable), so a∞ = c₂ = 0.38 (for |a₀| < c₁). g₂′ = 1/x²: 0.14 at c₁ (stable), 6.9 at c₂ (unstable), so b∞ = c₁ = 2.63 (for most b₀ > 0).

### Problem 12 [Intro · Derivation · 8 pts · 2026 midsem Q8] (hard)

Newton's iteration xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) for f(x) = 1/x − a computes 1/a. (a) Show it needs no division. (b) Show it is equivalent to a logistic map and find r; how does the map behave for this r? (c) For which x₀ does it converge to 1/a, and what happens otherwise?

*Solution.* (a) f′ = −1/x², so xₙ₊₁ = xₙ + xₙ²(1/xₙ − a) = 2xₙ − axₙ²: only multiplication and subtraction. (b) Let z = ax/2: zₙ₊₁ = (a/2)(2xₙ − axₙ²) = 2zₙ − 2zₙ² = 2zₙ(1 − zₙ), a logistic map with r = 2. Its fixed point z\* = ½ (x = 1/a) is superstable, f′ = 0, so convergence is quadratic (the number of correct digits doubles each step). (c) It converges for 0 < z₀ < 1, i.e. 0 < x₀ < 2/a. Outside, z₁ ≤ 0, and from a negative value the map runs off to −∞, because the attraction is only to the basin (0, 1).

### Problem 13 [Intro · Derivation · 4 pts · HW 3c–d, practice P8–P9]

Write the Lotka–Volterra equations and explain each term. Find the fixed points, the Jacobian and its eigenvalues at each, and describe the behaviour nearby.

*Solution.* Terms as in the summary. Fixed points: (0, 0) and (δ/γ, α/β). J = \[\[α − βY, −βX\], \[γY, γX − δ\]\]. At (0, 0): diag(α, −δ), eigenvalues α, −δ: a saddle (prey grow along X, predators die along Y). At coexistence: \[\[0, −βδ/γ\], \[γα/β, 0\]\], λ² = −αδ, λ = ±i√(αδ): a centre, populations cycle with period 2π/√(αδ), predators lagging prey by a quarter cycle.

### Problem 14 [Intro · Derivation · 3 pts · HW 3e, practice P11]

Non-dimensionalise the LV equations and identify the controlling parameter.

*Solution.* x = γX/δ, y = βY/α, τ = αt give dx/dτ = x(1 − y), dy/dτ = ay(x − 1) with a = δ/α. One parameter remains: the ratio of predator death rate to prey birth rate. Fixed point (1, 1); small-oscillation period 2π/√a in τ.

### Problem 15 [Intro · Derivation · 8 pts · 2026 midsem Q9] (hard)

Modify the LV model so that prey are harvested at a constant rate h. Find the rate laws, the fixed points and the behaviour near them. Comment.

*Solution.* dX/dt = αX − βXY − h, dY/dt = γXY − δY. From dY/dt = 0: Y = 0 or X = δ/γ. Y = 0 gives X = h/α (predators extinct). X = δ/γ gives Y\* = α/β − hγ/(βδ) (needs h < αδ/γ). At (δ/γ, Y\*): J = \[\[α − βY\*, −βδ/γ\], \[γY\*, 0\]\] = \[\[hγ/δ, −βδ/γ\], \[γY\*, 0\]\]: trace hγ/δ > 0, determinant βδY\* > 0, so an unstable spiral (growing oscillations). At (h/α, 0): eigenvalues α > 0 and γh/α − δ < 0, a saddle. Comment: harvesting prey leaves the prey equilibrium unchanged but lowers predators, and it destroys the neutral cycles, so the populations swing more and more widely.

### Problem 16 [Intro · Derivation · 3 pts · practice P12]

Show that V = γX − δ ln X + βY − α ln Y is constant along LV trajectories.

*Solution.* dV/dt = (γ − δ/X)Ẋ + (β − α/Y)Ẏ = (γX − δ)(α − βY) + (βY − α)(γX − δ) = 0.

### Problem 17 [Intro · Derivation · 3 pts · Quiz-1 Q2]

For the SHO, write the equation of motion and non-dimensionalise it.

*Solution.* mẍ = −kx; with τ = t√(k/m), ξ = x/x₀: ξ″ + ξ = 0. The only parameter is the time scale √(m/k); in these units every oscillator is identical.

## C. Estimates

### Problem 18 [Intro · Numerical · 3 pts · Quiz-1 Q3]

Estimate the number of cells in an adult human body.

*Solution.* Body ≈ 70 kg; a typical cell is about 10 μm across, volume 10⁻¹⁵ m³, mass about 10⁻¹² kg (density of water). N ≈ 70/10⁻¹² ≈ 10¹³–10¹⁴ (accepted estimate about 3 × 10¹³).

### Problem 19 [Intro · Numerical · 3 pts · HW 2b]

Estimate the maximum kinetic energy of a bowled cricket ball, its rest energy mc², and the ratio.

*Solution.* m = 0.16 kg, v ≈ 40 m/s: K ≈ 130 J. mc² ≈ 1.4 × 10¹⁶ J. Ratio ≈ 10⁻¹⁴.

### Problem 20 [Intro · Numerical · 3 pts · HW 2c]

How long would it take to walk from campus to the airport (about 30 km), and how much energy would you spend? Compare a 50-minute car journey.

*Solution.* At 5 km/h, 30 km takes about 6 h. Walking costs about 250 W above rest, so roughly 250 × 2 × 10⁴ s ≈ 5 MJ (about 1200 kcal). A car at about 12 km/L uses 2.5 L of petrol, about 2.5 × 34 MJ ≈ 85 MJ, roughly 15–20 times more.

### Problem 21 [Intro · Numerical · 2 pts · HW 2a]

Estimate the power needed by a hovering mosquito.

*Solution.* A mosquito of about 2 mg must push air down to support its weight, 2 × 10⁻⁵ N. Inducing an airflow of order 1 m/s, the power is about weight × speed ≈ 2 × 10⁻⁵ W, a few tens of microwatts (allowing for inefficiency, about 10⁻⁴ W).

