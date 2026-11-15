# Lecture 13: Sums of Random Variables, Bayes Revisited, Variance of Sums

Source: `Lectures/L13.pdf` (same file as `Lectures/Y2.pdf`). The PDF holds slides 2 to 13 of 18, so the Moment Generating Functions part listed on the topics slide isn't in this file. It probably continues in Lecture 14 (not yet checked).

Matching practice: **Homework 6** Q6, Q9, Q13, Q14 and **Tutorial 6** Q1.

---

## 1. Sums of random variables: the convolution formula

**Question:** if Z = X + Y, what is the pmf/pdf of Z?

Collect every (x, y) pair that adds up to z:

- Discrete: p_Z(z) = Σ over {(x,y): x+y=z} of p_{X,Y}(x, y)
- Continuous: f_Z(z) = same idea with an integral

Once you fix x, y has to be z − x. So in general (this answers the slide's HW, "what if X and Y are not independent?"):

> p_Z(z) = Σ_x p_{X,Y}(x, z − x)  and  f_Z(z) = ∫ f_{X,Y}(x, z − x) dx

**When X and Y are independent**, the joint splits into a product, which gives the **convolution formula**:

> p_Z(z) = Σ_x p_X(x) · p_Y(z − x)
> f_Z(z) = ∫_{−∞}^{∞} f_X(x) · f_Y(z − x) dx

**How to use it (the recipe):**
1. Write f_X(x) f_Y(z − x).
2. Work out for which x **both** factors are nonzero. This step is where most mistakes happen.
3. Those x-limits depend on z, so split z into cases.
4. Integrate (or sum) over the limits for each case.

### EX1: X, Y independent U[0,1]. Find the pdf and CDF of Z = X + Y.

f_X(x) = 1 needs 0 ≤ x ≤ 1. f_Y(z − x) = 1 needs 0 ≤ z − x ≤ 1, that is, z − 1 ≤ x ≤ z.
So x has to lie in [max(0, z−1), min(1, z)].

- 0 ≤ z ≤ 1: x runs from 0 to z, so f_Z(z) = z
- 1 ≤ z ≤ 2: x runs from z−1 to 1, so f_Z(z) = 2 − z
- otherwise f_Z(z) = 0

That's a **triangle** on [0, 2] peaking at z = 1 (the Wikipedia GIF on the slide shows the box sliding over itself).

CDF: F_Z(z) = z²/2 on [0,1], = 1 − (2−z)²/2 on [1,2], 0 below 0, 1 above 2.

### Ex2: Two independent dice. Find the pmf of Z = X + Y.

p_Z(z) = Σ_x (1/6)(1/6) over the x in 1..6 that also make z − x land in 1..6.
Count the ways: z = 2 has 1 way, z = 7 has 6 ways, z = 12 has 1 way.

> p_Z(z) = (6 − |z − 7|) / 36, for z = 2, 3, …, 12

It's the discrete version of the same triangle shape.

---

## 2. Bayes rule revisited (inference)

**Setup (inference problem):** X is something we **can't see**, but we know its distribution f_X(x) (the *prior*). We observe a measurement Y, and we know how Y behaves given X: f_{Y|X}(y|x). **Goal:** after seeing Y = y, find f_{X|Y}(x|y) (the *posterior*).

The four versions are all the same idea, posterior = likelihood × prior / normalizer:

| X | Y | Formula |
|---|---|---|
| continuous | continuous | f_{X\|Y}(x\|y) = f_{Y\|X}(y\|x) f_X(x) / ∫ f_{Y\|X}(y\|t) f_X(t) dt |
| discrete | discrete | p_{X\|Y}(x\|y) = p_{Y\|X}(y\|x) p_X(x) / Σ_i p_{Y\|X}(y\|i) p_X(i) |
| discrete N | continuous Y | P(N=n \| Y=y) = f_{Y\|N}(y\|n) p_N(n) / Σ_i f_{Y\|N}(y\|i) p_N(i) |
| (flipped) | | f_{Y\|N}(y\|n) = P(N=n\|Y=y) f_Y(y) / ∫ P(N=n\|Y=t) f_Y(t) dt |

**Tip:** the denominator is just "the numerator summed or integrated over every possible value of the hidden variable". You rarely need to compute it separately.

### Example 3.19 (Bertsekas): bulb lifetime

Lifetime Y ~ Exponential(Λ), where Λ itself is uniform on [1, 1.5]. You observe Y = y. What do you now believe about Λ?

- Prior: f_Λ(λ) = 1/(1.5 − 1) = **2** for λ in [1, 1.5]
- Likelihood: f_{Y|Λ}(y|λ) = **λ e^{−λy}**, y ≥ 0
- Normalizer: f_Y(y) = ∫_1^{1.5} 2 t e^{−ty} dt
- Posterior: **f_{Λ|Y}(λ|y) = 2λe^{−λy} / ∫_1^{1.5} 2t e^{−ty} dt**, for λ in [1, 1.5]

Intuition: a long lifetime y makes e^{−λy} shrink faster for big λ, so the posterior shifts toward small λ (a "good bulb").

### Example 3.20 (Bertsekas): signal in noise

X = +1 with probability p, −1 with probability 1 − p. Noise N ~ N(0,1). We see Y = X + N = y.

Given X = 1, Y ~ N(1, 1); given X = −1, Y ~ N(−1, 1). So

P(X=1 | Y=y) = p·e^{−(y−1)²/2} / [ p·e^{−(y−1)²/2} + (1−p)·e^{−(y+1)²/2} ]

(the 1/√(2π) cancels). Multiply the top and bottom by e^{(y²+1)/2}: (y−1)² becomes e^{y} and (y+1)² becomes e^{−y}, giving

> **P(X = 1 | Y = y) = p e^{y} / ( p e^{y} + (1 − p) e^{−y} )**

Sanity check: y → +∞ gives 1, y → −∞ gives 0. A big positive reading means X was almost surely +1.

---

## 3. Variance of a sum

**Goal:** Var(Z) for Z = Σ a_i X_i, where the X_i may be dependent and have different distributions.

Recall: Var(X) = E[X²] − (E[X])², Cov(X, Y) = E[XY] − E[X]E[Y].

**Covariance rules** (slide's HW: prove each one from the definition):
1. Cov(X, X) = Var(X)
2. X, Y independent gives Cov(X, Y) = 0 (the converse is **not** true)
3. Cov(X, Y) = Cov(Y, X)
4. Cov(aX, Y) = a·Cov(X, Y)
5. Cov(X + a, Y) = Cov(X, Y), so shifting by a constant does nothing
6. Cov(X + Z, Y) = Cov(X, Y) + Cov(Z, Y)
7. Cov(Σ a_i X_i, Σ b_j Y_j) = Σ_i Σ_j a_i b_j Cov(X_i, Y_j), so covariance is "bilinear" (it expands like multiplying brackets)

Since Var(Z) = Cov(Z, Z), rule 7 gives the **key result**:

> **Var(Σ a_i X_i) = Σ a_i² Var(X_i) + Σ_{i≠j} a_i a_j Cov(X_i, X_j)**

(The i≠j sum counts each pair twice, once as (i, j) and once as (j, i).)

**Consequences (the slide's exercises):**
- **Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y)**. Take a_1 = a_2 = 1; the cross term appears twice.
- Similarly **Var(aX + bY + c) = a²Var(X) + b²Var(Y) + 2ab·Cov(X, Y)**. Note that c disappears and the signs of a and b matter in the cross term.
- **X_i independent**: every Cov term is 0, so Var(Σ a_i X_i) = Σ a_i² Var(X_i).
- **Sample mean** S_n = (X_1 + … + X_n)/n with X_i i.i.d.: a_i = 1/n, so Var(S_n) = n · (1/n²) · Var(X) = **Var(X)/n**. Averaging more samples shrinks the spread. This is the seed of the Law of Large Numbers.

---

## Quick-reference card

- Z = X+Y, independent: **f_Z(z) = ∫ f_X(x) f_Y(z−x) dx**; find the x-limits where both factors are nonzero
- Posterior ∝ likelihood × prior; normalize by summing or integrating over the hidden variable
- **Var(aX + bY + c) = a²Var X + b²Var Y + 2ab Cov(X,Y)**
- **Var(sample mean of n iid) = Var(X)/n**

---

## Your turn: practice (send me your answers in the thread and I'll check them)

1. **(HW6 Q13)** X is uniform on {1, 2, 3}. Y has P(Y=0)=1/2, P(Y=1)=1/3, P(Y=2)=1/6. They're independent. Find the pmf of Z = X + Y with the convolution formula.
2. **(HW6 Q9)** Var(X) = 4, Var(Y) = 9, Cov(X, Y) = −2. Find Var(3X − 2Y + 5). What would it be if X and Y were independent?
3. **(HW6 Q6)** The rate λ of a Geiger counter is 0.1 (prior prob 0.8) or 0.5 (prior prob 0.2). Counts in one second are Poisson(λ). You see K = 2. Find P(λ = 0.1 | K = 2).
4. **(HW6 Q14)** Use convolution to show that the sum of independent Poisson(μ) and Poisson(λ) is Poisson(μ + λ). Hint: the binomial theorem.
5. **(Concept check)** Why does the "5" in Q2 not affect the variance, and why does the sign of the "−2" matter?
