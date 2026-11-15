---
title: "Probability & Statistics (MA6.101), Lectures 14 to 20"
subtitle: "Slide-by-slide study notes with worked examples, plus extra problems from probabilitycourse.com and Bertsekas"
date: "Monsoon 2026"
---

# How to use this document

**What it covers.** This year's Lectures 14 to 20 (Prof. Tejas Bodas): moment generating functions, stochastic simulation, convergence of random variables, the laws of large numbers, the central limit theorem, random vectors and Gaussian vectors.

**How each lecture is laid out.**

1. **Part A, the slides.** Every slide in order, with the slide number (for example *Slide 5/23*), what it says, and an explanation. Every example on a slide is worked out in full, and every red **HW** on a slide is solved.
2. **Part B, extra worked examples and problems.** These come from [probabilitycourse.com](https://www.probabilitycourse.com) (Pishro-Nik) and from Bertsekas & Tsitsiklis, *Introduction to Probability*, 2nd ed. (the PDF in `probability-and-statistics/textbooks/`). Every problem has a full solution. Many are also last year's homework, tutorial or exam questions, and those are marked.

**Tip.** Before reading a solution, cover it and try the first two lines yourself. Most problems in this course come down to choosing the right tool, and the solutions say which one and why.

## Reading plan (about 7 hours)

| Block | Lecture(s) | Topic | Time |
|---|---|---|---|
| 0 | L1 to L13 | Toolkit recap (below) | 15 min |
| 1 | L14 (slides 1 to 6) | Moment generating functions | 75 min |
| 2 | L14 (slides 7 to 12), L15 | Simulation: inverse transform, $F_X(X)$ is uniform, Monte Carlo, importance sampling | 70 min |
| 3 | L16 | Accept–reject; pointwise vs uniform convergence; what "$X_n \to X$" means | 45 min |
| 4 | L17 | Sure and almost sure convergence, SLLN, the sample mean, Borel–Cantelli | 55 min |
| 5 | L18 | Convergence in probability, in mean, in distribution; CLT; normal approximation | 75 min |
| 6 | L19 | Random vectors, covariance matrix, Jacobian | 45 min |
| 7 | L20 | Gaussian vectors, marginals and conditionals, bivariate normal | 50 min |
| 8 | All | Practice map, formula sheet, exam-style self-test | 30 min |

## Which file holds which slides

The course uses three slide decks, and each lecture PDF holds a slice of one deck.

| File | Deck | Slides in the file | Topics |
|---|---|---|---|
| `L14.pdf` | Deck A (23 slides) | 1 to 12 | MGF; sampling a discrete random variable |
| `L15.pdf` | Deck A | 13 to 18 | Sampling a continuous random variable; $F_X(X)$ is uniform; Monte Carlo integration; importance sampling |
| `L16.pdf` | Deck B (30 slides) | 2 to 11 | Recap; accept–reject; pointwise and uniform convergence; convergence of random variables |
| `L17.pdf` | Deck B | 11 to 19 | Sure and a.s. convergence; SLLN; the sample mean; Borel–Cantelli |
| `L18.pdf` | Deck B | 20 to 30 | Convergence in probability, in $r$-th mean, in distribution; CLT |
| `L19.pdf` | Deck C (36 slides) | 1 to 8 | Random vectors; covariance matrix; functions of random vectors |
| `L20.pdf` | Deck C | 9 to 19 | Standard normal vector; multivariate Gaussian; marginals and conditionals; bivariate Gaussians |

Deck A slides 19 to 23 are not in any PDF. The L16 recap ("inverse transform, $F_X(X)$ is uniform, importance sampling") shows nothing else was taught from that deck. Last year the same instructor taught this material in last year's L15 to L21, so last year's HW 6 to 9 and Tutorials 6 to 9 match these lectures closely. The practice map at the end lists them.

## Notation

| Symbol | Meaning |
|---|---|
| $U \sim \mathcal U[0,1]$ | uniform random variable on $[0,1]$; $U_1, U_2, \dots$ are i.i.d. copies |
| $\mathbf 1\{A\}$ or $\mathbf 1_A$ | indicator: $1$ if event $A$ happens, $0$ otherwise |
| $\Phi(z)$, $\varphi(z)$ | standard normal CDF and pdf |
| $S_n = X_1 + \dots + X_n$ | partial sum |
| $\hat\mu_n = S_n / n$ | sample mean |
| $X_n \xrightarrow{a.s.} X$ | almost sure convergence (also "with probability 1") |
| $X_n \xrightarrow{p} X$ | convergence in probability |
| $X_n \xrightarrow{L^r} X$, $X_n \xrightarrow{m.s.} X$ | convergence in $r$-th mean; mean square is $r = 2$ |
| $X_n \xrightarrow{d} X$ | convergence in distribution (weak convergence) |
| $\mathbf X$, $\mathbf x$ | random vector and a value it takes (bold) |
| $C_{\mathbf X}$ or $\Sigma$ | covariance matrix |

## Toolkit from Lectures 1 to 13 (used constantly below)

**1. LOTUS (law of the unconscious statistician).** You never need the distribution of $g(X)$ to find its mean:
$$E[g(X)] = \sum_x g(x)\,p_X(x) \quad\text{or}\quad E[g(X)] = \int_{-\infty}^{\infty} g(x)\,f_X(x)\,dx .$$

**2. Independence factorises expectations.** If $X$ and $Y$ are independent, then for any functions $g, h$:
$$E[g(X)\,h(Y)] = E[g(X)]\;E[h(Y)].$$

**3. Iterated expectations and random sums (L12).** $E[X] = E\big[E[X\mid Y]\big]$. For $Y = X_1 + \dots + X_N$ with i.i.d. $X_i$ independent of $N$:
$$E[Y] = E[N]\,E[X], \qquad \operatorname{Var}(Y) = E[N]\operatorname{Var}(X) + (E[X])^2 \operatorname{Var}(N).$$

**4. Convolution (L13).** For independent $X, Y$ and $Z = X + Y$: $f_Z(z) = \int f_X(x) f_Y(z - x)\,dx$.

**5. Variance and covariance (L13).**
$$\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X), \qquad \operatorname{Var}\Big(\sum_i X_i\Big) = \sum_i \operatorname{Var}(X_i) + 2\sum_{i<j}\operatorname{Cov}(X_i, X_j),$$
and covariance is bilinear: $\operatorname{Cov}(aX + bY, Z) = a\operatorname{Cov}(X,Z) + b\operatorname{Cov}(Y,Z)$. Independent implies uncorrelated, but not the other way round.

**6. CDF facts (L7, L9).** $F_X$ is non-decreasing and right-continuous, $F_X(-\infty) = 0$, $F_X(\infty) = 1$, and $P(a < X \le b) = F_X(b) - F_X(a)$. For $U \sim \mathcal U[0,1]$ and $0 \le c \le 1$, $P(U \le c) = c$.

**7. Function of one random variable (L8).** If $Y = g(X)$ with $g$ monotone and differentiable, and $h = g^{-1}$:
$$f_Y(y) = f_X\big(h(y)\big)\,\Big|\frac{dh}{dy}(y)\Big| .$$

**8. Continuity of probability (L3).** If $A_1 \subseteq A_2 \subseteq \dots$ then $P\big(\bigcup_m A_m\big) = \lim_m P(A_m)$. Union bound: $P\big(\bigcup_n E_n\big) \le \sum_n P(E_n)$.

**9. Calculus facts.**
$$e^x = \sum_{k\ge 0}\frac{x^k}{k!}, \qquad \sum_{k\ge 0} r^k = \frac{1}{1-r}\ (|r|<1), \qquad \Big(1 + \frac{a}{n}\Big)^n \to e^a, \qquad \Big(1 + \frac{a}{n} + o\big(\tfrac1n\big)\Big)^n \to e^a .$$

**10. The distributions you need** (the MGF column is new in L14 and derived there).

| Distribution | pmf / pdf | Mean | Variance | MGF $M_X(t)$ |
|---|---|---|---|---|
| Bernoulli$(p)$ | $P(1) = p,\ P(0) = 1-p$ | $p$ | $p(1-p)$ | $1 - p + pe^t$ |
| Binomial$(n,p)$ | $\binom nk p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ | $(1 - p + pe^t)^n$ |
| Geometric$(p)$ on $\{1,2,\dots\}$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ | $\dfrac{pe^t}{1-(1-p)e^t}$, $t < -\ln(1-p)$ |
| Poisson$(\lambda)$ | $e^{-\lambda}\lambda^k/k!$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t - 1)}$ |
| Uniform$[a,b]$ | $\frac{1}{b-a}$ on $[a,b]$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ | $\dfrac{e^{tb} - e^{ta}}{t(b-a)}$, $M(0) = 1$ |
| Exponential$(\lambda)$ | $\lambda e^{-\lambda x}$, $x \ge 0$ | $1/\lambda$ | $1/\lambda^2$ | $\dfrac{\lambda}{\lambda - t}$, $t < \lambda$ |
| Normal$(\mu, \sigma^2)$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ | $e^{\mu t + \sigma^2 t^2/2}$ |
| Gamma$(\alpha, \lambda)$ | $\frac{\lambda^\alpha x^{\alpha-1}e^{-\lambda x}}{\Gamma(\alpha)}$, $x > 0$ | $\alpha/\lambda$ | $\alpha/\lambda^2$ | $\Big(\dfrac{\lambda}{\lambda - t}\Big)^\alpha$, $t < \lambda$ |

Gamma$(n, \lambda)$ with integer $n$ is also called Erlang$(n,\lambda)$. It is the distribution of a sum of $n$ i.i.d. Exponential$(\lambda)$ variables (proved with MGFs in L14).




# Lecture 14, part 1: Moment generating functions (Deck A, slides 1 to 6)

**Big picture.** A random variable is described by its pmf/pdf or its CDF. The MGF is a third description. It packs the whole distribution into one function of a variable $t$. Two things make it worth learning:

1. **Moments by differentiation.** $E[X], E[X^2], \dots$ come from derivatives at $t = 0$, with no sums or integrals to evaluate.
2. **Sums become products.** The pdf of a sum of independent variables needs a convolution integral (L13). The MGF of that sum is just a product. With the uniqueness property this lets you *identify* distributions of sums in one line, and it is also the engine behind the proof of the CLT in L18.

## Part A: the slides

### Slide 2/23: Definition, region of convergence, Bernoulli example

> **On the slide.** The MGF of $X$ is $M_X:\mathbb R\to[0,\infty]$, $M_X(t) = E[e^{tX}]$. Discrete: $M_X(t) = \sum_{x\in\Omega'} e^{tx}p_X(x)$. Continuous: $M_X(t) = \int_{-\infty}^{\infty} e^{tx}f_X(x)\,dx$. $D_X := \{t : M_X(t) < \infty\}$ is the region of convergence (ROC), and $t = 0$ is always in it. *Find the MGF of a Bernoulli$(p)$ variable $Z$.*

**Reading the definition.** Fix a number $t$. Then $e^{tX}$ is a new random variable (a function of $X$), and $M_X(t)$ is its expected value, computed with LOTUS. Do this for every $t$ and you get a **function of $t$**. An MGF is a function, not a number.

$$\boxed{\,M_X(t) = E\big[e^{tX}\big] = \begin{cases}\displaystyle\sum_{x} e^{tx}\,p_X(x) & X \text{ discrete}\\[2mm] \displaystyle\int_{-\infty}^{\infty} e^{tx} f_X(x)\,dx & X\text{ continuous}\end{cases}}$$

Here $\Omega'$ on the slide is the set of values $X$ can take (its support).

**Why the codomain is $[0,\infty]$.** The integrand $e^{tx}$ is always positive, so the expectation is positive. It can also be $+\infty$ when the sum or integral diverges. That is why we track the ROC.

**Why $t = 0$ is always in the ROC.** $M_X(0) = E[e^{0}] = E[1] = 1$. This gives a quick sanity check on any MGF you compute: **it must equal 1 at $t = 0$.**

**The ROC is always an interval containing 0.** (Not on the slide, but useful.) If $t_1 < t < t_2$ with $t_1, t_2 \in D_X$, then for every $x$, $e^{tx} \le \max(e^{t_1x}, e^{t_2x}) \le e^{t_1 x} + e^{t_2 x}$. Taking expectations, $M_X(t) \le M_X(t_1) + M_X(t_2) < \infty$.

**When is an MGF useful?** When the ROC contains an open interval $(-\epsilon, \epsilon)$ around 0. Then (slide 4) it determines all the moments and the distribution. Some distributions fail this. The Cauchy distribution $f(x) = \frac{1}{\pi(1+x^2)}$ has $M(t) = \infty$ for every $t \ne 0$, so its ROC is $\{0\}$ and the MGF tells you nothing.

**Why "moment generating"?** Expand the exponential: $e^{tX} = \sum_{k\ge0} \frac{t^kX^k}{k!}$. Taking expectations term by term (allowed when the ROC contains a neighbourhood of 0):
$$M_X(t) = 1 + t\,E[X] + \frac{t^2}{2!}E[X^2] + \frac{t^3}{3!}E[X^3] + \cdots = \sum_{k\ge 0} E[X^k]\,\frac{t^k}{k!}.$$
So **$E[X^k]$ is the coefficient of $t^k/k!$** in the power series of $M_X$. All the moments are "generated" by one function.

**Slide example: Bernoulli$(p)$.** $Z$ takes the value 1 with probability $p$ and 0 with probability $1-p$:
$$M_Z(t) = e^{t\cdot 0}(1-p) + e^{t\cdot 1}p = \boxed{1 - p + pe^t}, \qquad D_Z = \mathbb R .$$
Check: $M_Z(0) = 1 - p + p = 1$. ✓ Also $M_Z'(t) = pe^t$, so $M_Z'(0) = p = E[Z]$, which previews slide 4.

### Slide 3/23: MGF examples (exponential, normal) and HW

> **On the slide.** For Exp$(\lambda)$, $M_X(t) = \frac{\lambda}{\lambda - t}$ for $t < \lambda$. For $Z\sim\mathcal N(\mu,\sigma^2)$, $M_Z(t) = e^{\mu t + \frac12\sigma^2t^2}$ (proof: the ProofWiki link). **HW:** find the MGF of Binomial$(n,p)$, $\mathcal N(0,1)$ and Poisson$(\lambda)$.

**Exponential$(\lambda)$.** With $f_X(x) = \lambda e^{-\lambda x}$ for $x \ge 0$:
$$M_X(t) = \int_0^\infty e^{tx}\lambda e^{-\lambda x}\,dx = \lambda\int_0^\infty e^{-(\lambda - t)x}\,dx .$$
- If $t < \lambda$, the exponent $-(\lambda-t)x$ decays, and the integral is $\frac{1}{\lambda - t}$. So $M_X(t) = \frac{\lambda}{\lambda - t}$.
- If $t \ge \lambda$, the integrand does not decay (it is $\ge 1$), so the integral is $+\infty$.

$$\boxed{M_X(t) = \frac{\lambda}{\lambda - t},\quad D_X = (-\infty, \lambda)}$$

The ROC matters here. A common exam deduction is losing marks for not stating "$t < \lambda$" (last year's Quiz 2 deducted 0.5 marks for exactly this).

**Normal: first the standard normal $Z\sim\mathcal N(0,1)$ (this is also the HW).** Complete the square in the exponent:
$$M_Z(t) = \int_{-\infty}^\infty e^{tz}\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz = \int_{-\infty}^\infty \frac{1}{\sqrt{2\pi}}e^{-\frac{z^2 - 2tz}{2}}\,dz .$$
Now $z^2 - 2tz = (z - t)^2 - t^2$, so
$$M_Z(t) = e^{t^2/2}\underbrace{\int_{-\infty}^\infty \frac{1}{\sqrt{2\pi}}e^{-(z-t)^2/2}\,dz}_{=\,1\ \text{(pdf of }\mathcal N(t,1))} = \boxed{e^{t^2/2}}, \qquad D_Z = \mathbb R.$$

**Linear-transformation rule** (Bertsekas Example 4.25; use it all the time). If $Y = aX + b$:
$$M_Y(t) = E\big[e^{t(aX + b)}\big] = e^{bt}\,E\big[e^{(at)X}\big] = \boxed{e^{bt}M_X(at)} .$$

**General normal.** $X\sim\mathcal N(\mu,\sigma^2)$ can be written $X = \mu + \sigma Z$. By the rule above,
$$M_X(t) = e^{\mu t}M_Z(\sigma t) = e^{\mu t}e^{\sigma^2t^2/2} = \boxed{e^{\mu t + \frac12\sigma^2t^2}} .$$

**HW: Binomial$(n,p)$.** Use the binomial theorem $\sum_k\binom nk a^kb^{n-k} = (a+b)^n$:
$$M_X(t) = \sum_{k=0}^n e^{tk}\binom nk p^k(1-p)^{n-k} = \sum_{k=0}^n \binom nk (pe^t)^k(1-p)^{n-k} = \boxed{(1 - p + pe^t)^n}, \qquad D_X = \mathbb R.$$
Slide 6 gives a second derivation: a binomial is a sum of $n$ independent Bernoullis.

**HW: Poisson$(\lambda)$.** Use $\sum_k \frac{a^k}{k!} = e^a$:
$$M_X(t) = \sum_{k=0}^\infty e^{tk}\frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda}\sum_{k=0}^\infty\frac{(\lambda e^t)^k}{k!} = e^{-\lambda}e^{\lambda e^t} = \boxed{e^{\lambda(e^t - 1)}}, \qquad D_X = \mathbb R.$$

### Slide 4/23: Moments from derivatives

> **On the slide.** If $M_X(t)$ is finite for all $|t| \le \epsilon$ for some $\epsilon > 0$, then $M_X$ is infinitely differentiable on $(-\epsilon,\epsilon)$ (without proof). Let $M_X^{(r)}(t) = \frac{d^r}{dt^r}M_X(t)$. Intuitively, $M_X^{(r)}(t) = E[e^{tX}X^r]$, and so $E[X^r] = M_X^{(r)}(0)$. **HW:** work this out for Exp$(\lambda)$. **HW:** find the MGF of every random variable studied so far.

**Why $M^{(r)}(t) = E[X^r e^{tX}]$.** Differentiate inside the expectation (the "property without proof" is what justifies swapping $\frac{d}{dt}$ and $E$):
$$\frac{d}{dt}e^{tx} = x\,e^{tx},\qquad \frac{d^r}{dt^r}e^{tx} = x^r e^{tx}\quad\Longrightarrow\quad M_X^{(r)}(t) = E\big[X^re^{tX}\big].$$
Put $t = 0$:
$$\boxed{E[X^r] = M_X^{(r)}(0)}, \qquad \operatorname{Var}(X) = M_X''(0) - \big(M_X'(0)\big)^2 .$$

**A shortcut worth knowing (not on the slide).** Let $K_X(t) = \ln M_X(t)$ (the *cumulant generating function*). Then
$$K_X'(0) = E[X], \qquad K_X''(0) = \operatorname{Var}(X).$$
*Proof.* $K' = M'/M$ and $K'' = \frac{M''M - (M')^2}{M^2}$. At $t = 0$, $M(0) = 1$, so $K'(0) = M'(0)$ and $K''(0) = M''(0) - M'(0)^2$. $\square$

This is much faster whenever $M$ is an exponential of something. For example, for Poisson $K(t) = \lambda(e^t - 1)$, so $K'(0) = \lambda$ and $K''(0) = \lambda$, giving mean = variance = $\lambda$ in one line. For the normal, $K(t) = \mu t + \sigma^2t^2/2$, so $K'(0) = \mu$ and $K''(0) = \sigma^2$.

**HW: Exp$(\lambda)$.** Write $M(t) = \lambda(\lambda - t)^{-1}$ and differentiate repeatedly:
$$M'(t) = \frac{\lambda}{(\lambda - t)^2},\qquad M''(t) = \frac{2\lambda}{(\lambda - t)^3},\qquad M^{(r)}(t) = \frac{r!\,\lambda}{(\lambda - t)^{r+1}} .$$
At $t = 0$:
$$E[X] = \frac1\lambda,\qquad E[X^2] = \frac{2}{\lambda^2},\qquad \operatorname{Var}(X) = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac1{\lambda^2},\qquad \boxed{E[X^r] = \frac{r!}{\lambda^r}} .$$
*Check with the series method:* $\frac{\lambda}{\lambda - t} = \frac{1}{1 - t/\lambda} = \sum_{k\ge0}\frac{t^k}{\lambda^k} = \sum_{k\ge 0}\frac{k!}{\lambda^k}\cdot\frac{t^k}{k!}$, so the coefficient of $t^k/k!$ is $k!/\lambda^k$. ✓

**HW: the MGF of every random variable so far.** The table in the toolkit (block 0) lists them. Here are the derivations not done above.

*Geometric$(p)$ on $\{1, 2, \dots\}$.* Substitute $j = k - 1$:
$$M(t) = \sum_{k\ge1}e^{tk}(1-p)^{k-1}p = pe^t\sum_{j\ge0}\big((1-p)e^t\big)^j = \frac{pe^t}{1 - (1-p)e^t},$$
valid when $(1-p)e^t < 1$, that is, $t < -\ln(1-p)$. (This was last year's Endsem Q1(a).) Moments with the shortcut: $K(t) = \ln p + t - \ln(1 - qe^t)$ with $q = 1 - p$:
$$K'(t) = 1 + \frac{qe^t}{1 - qe^t}\ \Rightarrow\ K'(0) = 1 + \frac qp = \frac1p,\qquad K''(t) = \frac{qe^t}{(1 - qe^t)^2}\ \Rightarrow\ K''(0) = \frac{q}{p^2}.$$
So $E[X] = 1/p$ and $\operatorname{Var}(X) = (1-p)/p^2$. ✓

*Discrete uniform on $\{1,\dots,6\}$ (a fair die).* $M(t) = \frac16(e^t + e^{2t} + \dots + e^{6t}) = \dfrac{e^t(e^{6t} - 1)}{6(e^t - 1)}$ for $t\ne0$.

*Continuous uniform $[a,b]$.* $M(t) = \frac{1}{b-a}\int_a^b e^{tx}dx = \dfrac{e^{tb} - e^{ta}}{t(b - a)}$ for $t \ne 0$, and $M(0) = 1$. For $U\sim\mathcal U[0,1]$: $M_U(t) = \frac{e^t - 1}{t} = \sum_{k\ge0}\frac{t^k}{(k+1)!} = \sum_{k\ge 0}\frac{1}{k+1}\cdot\frac{t^k}{k!}$, so $E[U^k] = \frac{1}{k+1}$ (probabilitycourse Example 6.4).

*Gamma$(\alpha,\lambda)$* (last year's HW6 Q11). Use $\int_0^\infty x^{\alpha-1}e^{-cx}dx = \Gamma(\alpha)/c^\alpha$ for $c > 0$:
$$M(t) = \frac{\lambda^\alpha}{\Gamma(\alpha)}\int_0^\infty x^{\alpha-1}e^{-(\lambda - t)x}dx = \frac{\lambda^\alpha}{\Gamma(\alpha)}\cdot\frac{\Gamma(\alpha)}{(\lambda - t)^\alpha} = \Big(\frac{\lambda}{\lambda - t}\Big)^\alpha,\qquad t<\lambda .$$

*Laplace (double exponential), $f(x) = \frac\lambda2 e^{-\lambda|x|}$* (last year's Tutorial 6 Q3). Split the integral at 0:
$$M(t) = \frac\lambda2\Big[\int_0^\infty e^{-(\lambda - t)x}dx + \int_0^\infty e^{-(\lambda + t)x}dx\Big] = \frac\lambda2\Big[\frac{1}{\lambda - t} + \frac{1}{\lambda + t}\Big] = \frac{\lambda^2}{\lambda^2 - t^2},\qquad |t| < \lambda.$$

### A key fact behind slides 5 and 6: the MGF determines the distribution

The slides use this without stating it. **Uniqueness (inversion) theorem** (Bertsekas p. 234; probabilitycourse 6.1.3): *if $M_X(t) = M_Y(t)$ for all $t$ in some interval $(-a, a)$ with $a > 0$, then $X$ and $Y$ have the same CDF.*

In practice you "invert" an MGF by **pattern matching** against the table:

- A finite sum $\sum_k p_k e^{tx_k}$ is a discrete variable taking the value $x_k$ with probability $p_k$ (read the exponents and coefficients). For example, $M(t) = \frac16e^{-2t} + \frac26e^{t} + \frac36e^{4t}$ means $P(X = -2) = \frac16$, $P(X = 1) = \frac13$, $P(X = 4) = \frac12$ (last year's HW6 Q3).
- $\frac{2}{2-t}$ is Exp$(2)$; $e^{3(e^t-1)}$ is Poisson$(3)$; $e^{5t + 2t^2}$ is $\mathcal N(5, 4)$ (since $\sigma^2/2 = 2$).
- A weighted average of MGFs is a **mixture**: $\frac13\cdot\frac{2}{2-t} + \frac23\cdot\frac{3}{3-t}$ means "with probability $\frac13$ an Exp(2), otherwise an Exp(3)", so $f(x) = \frac13\cdot2e^{-2x} + \frac23\cdot3e^{-3x}$ for $x \ge 0$ (Bertsekas Problem 33).

### Slide 5/23: MGF of a sum of independent random variables

> **On the slide.** $Z = X + Y$. (The pdf of $Z$ for independent $X, Y$ is the convolution from L13.) What is $M_Z(t)$? $M_Z(t) = E[e^{(X+Y)t}] = E[e^{Xt}e^{Yt}]$. If $X$ and $Y$ are independent, $E[g(X)h(Y)] = E[g(X)]E[h(Y)]$, so $M_Z(t) = E[e^{Xt}]E[e^{Yt}]$. Boxed: $M_Z(t) = M_X(t)M_Y(t)$.

**Derivation, step by step.**
$$M_Z(t) = E\big[e^{t(X+Y)}\big] = E\big[e^{tX}\cdot e^{tY}\big] \overset{\text{indep.}}{=} E\big[e^{tX}\big]\,E\big[e^{tY}\big] = M_X(t)\,M_Y(t).$$
The middle step applies toolkit fact 2 with $g(x) = e^{tx}$ and $h(y) = e^{ty}$. The formula holds for every $t$ in both ROCs.

$$\boxed{X, Y\ \text{independent}\ \Longrightarrow\ M_{X+Y}(t) = M_X(t)\,M_Y(t)}$$

**Why this matters.** A convolution integral becomes a product. Together with uniqueness, you can *name* the distribution of a sum:

- **Poisson + Poisson.** $X\sim$ Poisson$(\lambda)$ and $Y\sim$ Poisson$(\mu)$ independent: $M_{X+Y}(t) = e^{\lambda(e^t-1)}e^{\mu(e^t-1)} = e^{(\lambda + \mu)(e^t - 1)}$, so $X + Y\sim$ Poisson$(\lambda + \mu)$ (Bertsekas Ex. 4.32).
- **Normal + normal.** $e^{\mu_1t + \sigma_1^2t^2/2}e^{\mu_2t + \sigma_2^2t^2/2} = e^{(\mu_1 + \mu_2)t + (\sigma_1^2 + \sigma_2^2)t^2/2}$, so $X + Y\sim\mathcal N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$ (Bertsekas Ex. 4.33). This takes one line, compared with a page of completing the square in a convolution.
- **Binomial + binomial, same $p$** (last year's Tutorial 6 Q2, probabilitycourse Ex. 6.9). $(1 - p + pe^t)^m(1 - p + pe^t)^n = (1 - p + pe^t)^{m+n}$, so $X + Y\sim$ Binomial$(m + n, p)$. With *different* $p$'s the product is not of binomial form, and the sum is not binomial.
- **Two i.i.d. Exp$(\lambda)$.** $M_{X+Y}(t) = \big(\frac{\lambda}{\lambda - t}\big)^2$, the Gamma$(2,\lambda)$ MGF. So $f_{X+Y}(z) = \lambda^2ze^{-\lambda z}$ for $z \ge 0$. That is exactly what the convolution gives (last year's Endsem Q3), with no integral.

**Independence is essential.** Take $Y = X$ with $X\sim$ Bernoulli$(\frac12)$. Then $M_{X+Y}(t) = M_{2X}(t) = M_X(2t) = \frac12 + \frac12e^{2t}$, but $M_X(t)^2 = \big(\frac12 + \frac12e^t\big)^2 = \frac14 + \frac12e^t + \frac14e^{2t}$. They differ. (The converse also fails: $M_{X+Y} = M_XM_Y$ does not by itself prove $X$ and $Y$ are independent.)

### Slide 6/23: Sums of $n$ i.i.d. variables, and random sums

> **On the slide.** For $Z = X_1 + \dots + X_n$ with $X_i$ i.i.d.: $M_Z(t) = (M_X(t))^n$. For $Z = X_1 + \dots + X_N$ where $N$ is a positive discrete random variable: $M_Z(t) = E[e^{tZ}] = E_N\big[E[e^{tZ}\mid N]\big] = E_N\big[(M_X(t))^N\big] = \sum_n p_N(n)M_X(t)^n$. **HW:** prove that $M_Z(t) = M_N(\log M_X(t))$.

**Fixed $n$.** Apply slide 5 repeatedly (the $X_i$ are mutually independent):
$$M_Z(t) = M_{X_1}(t)M_{X_2}(t)\cdots M_{X_n}(t) = \boxed{\big(M_X(t)\big)^n} .$$
*Examples.*
- Binomial$(n,p)$ = sum of $n$ Bernoulli$(p)$: $(1 - p + pe^t)^n$, which matches the HW on slide 3.
- Sum of $n$ i.i.d. Exp$(\lambda)$: $\big(\frac{\lambda}{\lambda - t}\big)^n$, the Gamma$(n, \lambda)$ (Erlang) MGF. So **a sum of $n$ i.i.d. Exp$(\lambda)$ is Gamma$(n,\lambda)$** (last year's HW6 Q7). We will use this to *simulate* Gamma variables in L15.
- Sum of $n$ i.i.d. Geometric$(p)$ gives the negative binomial (number of trials until the $n$-th success).

**Random number of terms.** Now $N$ is random, independent of the i.i.d. $X_i$. (The slide assumes this implicitly, as in L12.) Condition on $N$ (iterated expectations):

1. For a fixed value $n$: $E\big[e^{tZ}\mid N = n\big] = E\big[e^{t(X_1 + \dots + X_n)}\mid N = n\big] = E\big[e^{t(X_1 + \dots + X_n)}\big] = M_X(t)^n$. The second equality holds because the $X_i$ are independent of $N$.
2. So $E\big[e^{tZ}\mid N\big] = M_X(t)^N$, a random variable that is a function of $N$.
3. Take the expectation over $N$:
$$M_Z(t) = E\big[M_X(t)^N\big] = \sum_n p_N(n)\,M_X(t)^n .$$

**HW proof: $M_Z(t) = M_N(\log M_X(t))$.** Write the power as an exponential, $a^N = e^{N\ln a}$, with $a = M_X(t) > 0$:
$$M_Z(t) = E\Big[e^{N\cdot\ln M_X(t)}\Big] = E\big[e^{sN}\big]\Big|_{s = \ln M_X(t)} = M_N\big(\ln M_X(t)\big).\qquad\square$$
**How to use it** (Bertsekas's phrasing): *take the formula for $M_N(s)$ and replace every $e^s$ by $M_X(t)$.*

**Bonus: L12's random-sum formulas fall out.** Take logs: $K_Z(t) = K_N\big(K_X(t)\big)$. By the chain rule, and using $K_X(0) = 0$:
$$K_Z'(0) = K_N'(0)\,K_X'(0) = E[N]\,E[X],$$
$$K_Z''(0) = K_N''(0)\big(K_X'(0)\big)^2 + K_N'(0)\,K_X''(0) = \operatorname{Var}(N)(E[X])^2 + E[N]\operatorname{Var}(X).$$
These are exactly $E[Z]$ and $\operatorname{Var}(Z)$ from L12.

**Worked example (Bertsekas Ex. 4.35): a geometric number of exponentials is exponential.** Jane visits bookstores until she finds a book. Each store has it with probability $p$, and she spends an Exp$(\lambda)$ time in each store. Total time $Z = X_1 + \dots + X_N$ with $N\sim$ Geometric$(p)$. Then
$$M_N(s) = \frac{pe^s}{1 - (1-p)e^s}\ \xrightarrow{\ e^s\,\to\,\frac{\lambda}{\lambda - t}\ }\ M_Z(t) = \frac{p\frac{\lambda}{\lambda - t}}{1 - (1-p)\frac{\lambda}{\lambda - t}} = \frac{p\lambda}{(\lambda - t) - (1-p)\lambda} = \frac{p\lambda}{p\lambda - t}.$$
So $Z\sim$ Exp$(p\lambda)$. This is surprising, since a sum of a *fixed* number $n\ge2$ of exponentials is not exponential. Check the mean: $E[Z] = E[N]E[X] = \frac1p\cdot\frac1\lambda = \frac{1}{p\lambda}$. ✓

**Worked example (Bertsekas Problem 45): Poisson thinning.** $N\sim$ Poisson$(\lambda)$ customers arrive, and each buys with probability $p$ independently, so $X_i\sim$ Bernoulli$(p)$. Then $M_N(s) = e^{\lambda(e^s - 1)}$. Replace $e^s$ by $1 - p + pe^t$:
$$M_Z(t) = e^{\lambda(1 - p + pe^t - 1)} = e^{\lambda p(e^t - 1)},$$
so the number of buyers is Poisson$(\lambda p)$.

## Part B: extra worked examples and problems

**B1 (Bertsekas Ex. 4.22, 4.27).** $P(X=2) = \frac12$, $P(X=3) = \frac16$, $P(X=5) = \frac13$. Find $M_X$, $E[X]$, $E[X^2]$, $\operatorname{Var}(X)$.

*Solution.* $M(t) = \frac12e^{2t} + \frac16e^{3t} + \frac13e^{5t}$. Then $M'(t) = e^{2t} + \frac12e^{3t} + \frac53e^{5t}$ and $M''(t) = 2e^{2t} + \frac32e^{3t} + \frac{25}{3}e^{5t}$. So
$$E[X] = 1 + \tfrac12 + \tfrac53 = \tfrac{19}{6},\qquad E[X^2] = 2 + \tfrac32 + \tfrac{25}3 = \tfrac{71}{6},\qquad \operatorname{Var}(X) = \tfrac{71}{6} - \tfrac{361}{36} = \tfrac{65}{36}.$$

**B2 (Bertsekas Problem 29).** $P(X=1) = \frac12$, $P(X=2) = P(X=3) = \frac14$. Use the MGF to get $E[X], E[X^2], E[X^3]$.

*Solution.* $M(t) = \frac12e^t + \frac14e^{2t} + \frac14e^{3t}$, and $M^{(r)}(0) = \frac12\cdot1^r + \frac14\cdot2^r + \frac14\cdot3^r$:
$$E[X] = \tfrac12 + \tfrac24 + \tfrac34 = \tfrac74,\qquad E[X^2] = \tfrac12 + 1 + \tfrac94 = \tfrac{15}4,\qquad E[X^3] = \tfrac12 + 2 + \tfrac{27}4 = \tfrac{37}4 .$$

**B3 (Bertsekas Problem 32: spot the fake MGF).** A non-negative integer-valued $X$ has one of these as its MGF: (1) $M(s) = e^{2(e^{e^s - 1} - 1)}$; (2) $M(s) = e^{2(e^{e^s} - 1)}$. (a) Which is impossible? (b) Find $P(X = 0)$.

*Solution.* (a) Every MGF has $M(0) = 1$. For (1): $M(0) = e^{2(e^{0} - 1)} = e^0 = 1$. ✓ For (2): $M(0) = e^{2(e - 1)} \ne 1$, so (2) is impossible.
(b) For a non-negative integer variable, $M(s) = \sum_{k\ge0}P(X=k)e^{sk}$. As $s\to-\infty$, every term with $k \ge 1$ vanishes, so $P(X=0) = \lim_{s\to-\infty}M(s)$ (Bertsekas Problem 38). Here $e^s\to0$, so
$$P(X=0) = e^{2(e^{-1} - 1)} \approx 0.2825 .$$

**B4 (Bertsekas Problem 36).** $X\sim$ Bernoulli$(\frac13)$, $Y\sim$ Exp$(2)$, $Z\sim$ Poisson$(3)$, all independent. Find the MGFs of (a) $U = XY + (1 - X)Z$, (b) $2Z + 3$, (c) $Y + Z$.

*Solution.* (a) $U = Y$ if $X = 1$ (probability $\frac13$) and $U = Z$ if $X = 0$. Condition on $X$ (and use independence): $M_U(t) = \frac13M_Y(t) + \frac23M_Z(t) = \frac13\cdot\frac{2}{2 - t} + \frac23e^{3(e^t - 1)}$, for $t < 2$. This is a mixture.
(b) Linear rule: $M_{2Z + 3}(t) = e^{3t}M_Z(2t) = e^{3t}e^{3(e^{2t} - 1)}$.
(c) Independent sum: $M_{Y+Z}(t) = \frac{2}{2 - t}e^{3(e^t - 1)}$, for $t < 2$.

**B5 (last year's HW6 Q5).** $X\sim$ Exp$(2)$ and $Y\sim$ Bernoulli$(0.5)$ independent, $Z = X + Y$. Find $M_Z$, then $E[Z]$ and $\operatorname{Var}(Z)$ from it.

*Solution.* $M_Z(t) = \frac{2}{2 - t}\cdot\frac{1 + e^t}{2} = \frac{1 + e^t}{2 - t}$ for $t < 2$. Use the log shortcut: $K(t) = \ln(1 + e^t) - \ln(2 - t)$.
$$K'(t) = \frac{e^t}{1 + e^t} + \frac{1}{2 - t}\Rightarrow E[Z] = \tfrac12 + \tfrac12 = 1,\qquad K''(t) = \frac{e^t}{(1 + e^t)^2} + \frac{1}{(2 - t)^2}\Rightarrow \operatorname{Var}(Z) = \tfrac14 + \tfrac14 = \tfrac12 .$$
(Check: $\operatorname{Var}(X) + \operatorname{Var}(Y) = \frac14 + \frac14$. ✓)

**B6 (last year's Quiz 2 Q1, an exam question).** $Z = X + U$ with $X\sim$ Exp$(\lambda)$ and $U\sim\mathcal U(0,1)$ independent. Derive $E[Z]$ and $E[Z^2]$ using MGFs (state the domain of $t$).

*Solution.* $M_X(t) = \frac{\lambda}{\lambda - t}$ for $t<\lambda$; $M_U(t) = \frac{e^t - 1}{t}$ for $t\ne0$, with $M_U(0) = 1$. So $M_Z(t) = \frac{\lambda}{\lambda - t}\cdot\frac{e^t - 1}{t}$ for $t < \lambda$. For $U$, expand $\frac{e^t - 1}{t} = 1 + \frac t2 + \frac{t^2}6 + \cdots$, so $M_U'(0) = \frac12$ and $M_U''(0) = \frac13$. For $X$: $M_X'(0) = \frac1\lambda$ and $M_X''(0) = \frac{2}{\lambda^2}$. By the product rule,
$$E[Z] = M_X'(0) + M_U'(0) = \frac1\lambda + \frac12,\qquad E[Z^2] = M_X''(0) + 2M_X'(0)M_U'(0) + M_U''(0) = \frac{2}{\lambda^2} + \frac1\lambda + \frac13 .$$

**B7 (last year's Tutorial 6 Q8).** $M_X(t) = \frac{1}{1 - 3t}$, $M_Y(t) = \frac{1}{(1 - 3t)^2}$ for $t < \frac13$, with $X, Y$ independent. Find $E[(X+Y)^2]$.

*Solution.* $M_{X+Y}(t) = (1 - 3t)^{-3}$. Then $M'(t) = 9(1 - 3t)^{-4}$ and $M''(t) = 108(1 - 3t)^{-5}$, so $E[(X+Y)^2] = M''(0) = 108$. (Check: $X$ is exponential with mean 3 and variance 9; $Y$ is Gamma with mean 6 and variance 18; so $X + Y$ has mean 9 and variance 27, and $27 + 81 = 108$. ✓)

**B8 (Bertsekas Problem 34: inverting a product).** Three penalty takers succeed independently with probabilities $p_1, p_2, p_3$. Find the pmf of the number of goals $X$ from its MGF.

*Solution.* $X$ is a sum of independent Bernoullis, so $M_X(t) = \prod_{i=1}^3(1 - p_i + p_ie^t)$. Expand and read off the coefficient of $e^{kt}$:
$$P(X=0) = (1-p_1)(1-p_2)(1-p_3),\qquad P(X=3) = p_1p_2p_3,$$
$$P(X=1) = p_1(1-p_2)(1-p_3) + (1-p_1)p_2(1-p_3) + (1-p_1)(1-p_2)p_3,$$
$$P(X=2) = p_1p_2(1-p_3) + p_1(1-p_2)p_3 + (1-p_1)p_2p_3 .$$

**B9 (Bertsekas Ex. 4.34: random sum).** A village has 3 gas stations, each open with probability $\frac12$ independently. An open station has $X\sim\mathcal U[0, 1000]$ gallons. Find the MGF and the mean of the total available gas $Y$.

*Solution.* $N\sim$ Binomial$(3,\frac12)$, so $M_N(s) = \big(\frac{1 + e^s}{2}\big)^3$. $M_X(t) = \frac{e^{1000t} - 1}{1000t}$. Replace $e^s$ by $M_X(t)$:
$$M_Y(t) = \frac18\Big(1 + \frac{e^{1000t} - 1}{1000t}\Big)^3,\qquad E[Y] = E[N]E[X] = 1.5\times500 = 750 \text{ gallons}.$$

**B10 (Bertsekas Problem 42).** Show that a random sum of independent normals need not be normal.

*Solution.* Let $N$ be 1 or 2 with probability $\frac12$ each, and $X_i\sim\mathcal N(0,1)$. Then $M_Y(t) = \frac12e^{t^2/2} + \frac12e^{t^2}$. This is a mixture of $\mathcal N(0,1)$ and $\mathcal N(0,2)$. It is not of the form $e^{\mu t + \sigma^2t^2/2}$, so by uniqueness $Y$ is not normal.

**B11 (Bertsekas Ex. 4.36).** $N\sim$ Geometric$(p)$ and $X_i\sim$ Geometric$(q)$, all independent. Show $Y = X_1 + \dots + X_N\sim$ Geometric$(pq)$.

*Solution.* Replace $e^s$ in $M_N(s) = \frac{pe^s}{1 - (1-p)e^s}$ by $M_X(t) = \frac{qe^t}{1 - (1-q)e^t}$ and clear the inner denominator:
$$M_Y(t) = \frac{pqe^t}{1 - (1-q)e^t - (1-p)qe^t} = \frac{pqe^t}{1 - (1 - pq)e^t},$$
which is the Geometric$(pq)$ MGF.

**B12 (Bertsekas Problem 43, exam style).** A motorist meets 4 lights, each red with probability $\frac12$ independently. Each red light costs an $\mathcal N(1, \frac14)$ wait (minutes), independently. Let $X$ be the total wait. Find $M_X$ and $P(X > 4)$. Is $X$ normal?

*Solution.* $N\sim$ Binomial$(4,\frac12)$ red lights, so $M_N(s) = \big(\frac{1 + e^s}{2}\big)^4$, and each wait has $M_W(t) = e^{t + t^2/8}$. Therefore
$$M_X(t) = \Big(\frac{1 + e^{t + t^2/8}}{2}\Big)^4 .$$
Given $N = n\ge1$, $X\sim\mathcal N(n, n/4)$ (a sum of independent normals); given $N = 0$, $X = 0$. By total probability:
$$P(X > 4) = \sum_{n=1}^4\binom4n\frac1{16}\Big[1 - \Phi\Big(\frac{4 - n}{\sqrt{n/4}}\Big)\Big] = \tfrac{4}{16}(1 - \Phi(6)) + \tfrac{6}{16}(1 - \Phi(2.83)) + \tfrac4{16}(1 - \Phi(1.15)) + \tfrac1{16}(0.5) \approx 0.063 .$$
$X$ is not normal: it has an atom $P(X = 0) = \frac1{16}$.

**B13 (probabilitycourse 6.1.6 Problems 8 and 9; last year's Tutorial 6 Q4). The engine of the LLN and the CLT.** Let $M_X$ be finite near 0. Show
$$\text{(a)}\ \lim_{n\to\infty}\Big[M_X\big(\tfrac sn\big)\Big]^n = e^{sE[X]},\qquad \text{(b) if } E[X] = 0,\ \operatorname{Var}(X) = 1:\ \lim_{n\to\infty}\Big[M_X\big(\tfrac{s}{\sqrt n}\big)\Big]^n = e^{s^2/2}.$$

*Solution.* Near 0, Taylor's theorem gives $M_X(u) = 1 + uE[X] + \frac{u^2}{2}E[X^2] + o(u^2)$.
(a) With $u = s/n$: $M_X(s/n) = 1 + \frac{sE[X]}{n} + o(\frac1n)$, and $(1 + \frac an + o(\frac1n))^n\to e^a$, so the limit is $e^{sE[X]}$.
(b) With $u = s/\sqrt n$, $E[X] = 0$ and $E[X^2] = 1$: $M_X(s/\sqrt n) = 1 + \frac{s^2}{2n} + o(\frac1n)$, so the limit is $e^{s^2/2}$.

*Why this matters.* $\big[M_X(s/n)\big]^n$ is the MGF of the sample mean $\frac{S_n}{n}$, and (a) says it tends to the MGF of the constant $E[X]$ (a law of large numbers). $\big[M_X(s/\sqrt n)\big]^n$ is the MGF of $\frac{S_n}{\sqrt n}$, and (b) says it tends to the MGF of $\mathcal N(0,1)$. That is the central limit theorem (L18). The normal MGF in (c) of the tutorial question is exactly $e^{s^2/2}$.




# Lectures 14 and 15: Generating samples from a uniform (Deck A, slides 7 to 18)

**Big picture.** A computer gives you one kind of randomness: (pseudo-)random numbers $U_1, U_2, \dots$ that behave like i.i.d. $\mathcal U[0,1]$ samples. How these are produced is not part of the course (slide 13 says so). The question for these two lectures is:

> Given i.i.d. uniforms, how do you produce i.i.d. samples of *any* random variable $X$ you like, and how do you use samples to compute things such as integrals and expectations?

Four tools answer this:

| Tool | Slides | What it does |
|---|---|---|
| Inverse transform (discrete) | 8 to 12 | $U\mapsto X$ by cutting $[0,1]$ into intervals of lengths $p_j$ |
| Inverse transform (continuous) | 13 to 15 | $X = F_X^{-1}(U)$ |
| Probability integral transform | 16 | the reverse direction: $F_X(X)\sim\mathcal U[0,1]$ |
| Monte Carlo and importance sampling | 17, 18 | estimate integrals and expectations by sample averages |

Accept–reject (L16) is a fifth tool for when $F_X^{-1}$ is hard to compute.

## Part A: the slides

### Slide 7/23: "Generate samples using uniform distribution"

This is the section title. Everything from here to slide 18 builds samples of other distributions out of uniform samples.

### Slide 8/23: Our aim, and 5000 uniform samples

> **On the slide.** Suppose you have access to samples from a uniform random variable $U$ over $[0,1]$. The code `uni_samples = np.random.uniform(0, 1, 5000)` and `plt.hist(uni_samples, bins = 10, density = True)` give a flat histogram of height about 1. `uni_samples` is a vector of 5000 realizations of $U$. You can also see it as a realization of $U_1, U_2, \dots, U_{5000}$, i.i.d. uniform variables.

**Two ways to read the same vector.** This distinction comes back in the convergence lectures, so it is worth fixing now.

- *5000 realizations of one random variable $U$.* You ran the same experiment 5000 times and wrote down the outcome each time.
- *One realization of 5000 i.i.d. random variables $U_1, \dots, U_{5000}$.* A single outcome $\omega$ of a big experiment gives the whole vector $(U_1(\omega), \dots, U_{5000}(\omega))$.

The second view is the one used for sample means: $\frac{1}{n}\sum U_i$ is a random variable, and the SLLN (slide 17, and L17) is a statement about the sequence $U_1, U_2, \dots$.

**Why the histogram has height about 1.** With `density = True`, matplotlib scales the bars so their total area is 1. There are 10 bins of width $0.1$, each holding about $500$ of the $5000$ samples, so each bar has height about $\frac{500}{5000\times0.1} = 1$. That is the $\mathcal U[0,1]$ density. The bars wobble around 1 because 5000 is finite. The count in each bar is Binomial$(5000, 0.1)$, with standard deviation $\sqrt{5000\times0.1\times0.9}\approx21$, about 4% of 500, which is the size of the wobble in the picture.

### Slide 9/23: How to simulate a die using these samples

> **On the slide.** Can you convert the 5000 uniform samples into outcomes of a die? The code assigns `dice_sample = 1` if `u < 1/6`, `2` if `1/6 < u < 2/6`, and so on up to `6` if `5/6 < u < 6/6`, then plots a histogram with 6 bins. Example: uniforms $[0.02,\ 0.8,\ 0.6,\ 0.03]$ give dice $[1,\ 5,\ 4,\ 1]$. The histogram is flat at about $0.2$.

**The idea.** Cut $[0,1]$ into 6 pieces of equal length $\frac16$. The face is the number of the piece that $u$ falls into:

$$\text{face} = k \quad\text{if}\quad \frac{k-1}{6} \le u < \frac k6, \qquad\text{so}\qquad P(\text{face} = k) = P\Big(\frac{k-1}6\le U<\frac k6\Big) = \frac16 .$$

The last step uses toolkit fact 6: the probability that $U$ lands in an interval is the interval's length.

**Checking the slide's example.**

| $u$ | piece | face |
|---|---|---|
| $0.02$ | $[0, \frac16) = [0, 0.167)$ | 1 |
| $0.8$ | $[\frac46, \frac56) = [0.667, 0.833)$ | 5 |
| $0.6$ | $[\frac36, \frac46) = [0.5, 0.667)$ | 4 |
| $0.03$ | $[0, \frac16)$ | 1 |

**Two details in the code.**

1. *One-line version.* The face is $\lfloor 6u\rfloor + 1$, which in numpy is `np.floor(6*uni_samples) + 1`.
2. *Boundaries.* The slide's `if` conditions use strict inequalities on both sides, so a value such as $u = \frac16$ exactly matches no branch. That has probability 0 for a continuous $U$, so it does not affect the distribution. In code, the half-open intervals $[\frac{k-1}6, \frac k6)$ are the clean choice.

**Why the histogram has height $0.2$, not $\frac16$.** The 6 bins span $[1, 6]$, so each has width $\frac56$. Each holds about $\frac16$ of the samples, and `density = True` makes height × width = fraction, so the height is $\frac{1/6}{5/6} = 0.2$. The flatness is what matters: every face is equally likely.

### Slide 10/23: Our aim for a general discrete random variable

> **On the slide.** Consider a discrete random variable $X$ with support set $\{x_0, x_1, \dots\}$ and pmf $p_X(x_j) = p_j$ for $j = 0, 1, \dots$ such that $\sum_j p_j = 1$. The support could be finite or infinite. **Our aim:** create i.i.d. samples of $X$ using i.i.d. random samples of $U$. We shall now see the inverse transform method to do this.

The die is the special case $x_j = j + 1$ and $p_j = \frac16$. Now the pieces of $[0,1]$ have unequal lengths $p_0, p_1, \dots$, and there may be infinitely many of them (for example, Poisson or geometric).

"i.i.d. samples of $X$ from i.i.d. samples of $U$" means: apply the same function to each $U_i$. If $X_i = h(U_i)$ with $U_1, U_2, \dots$ i.i.d., then $X_1, X_2, \dots$ are automatically i.i.d. (functions of independent variables are independent). So the only thing to design is the function $h$ that gives the right pmf.

### Slide 11/23: The inverse transform method

> **On the slide.** Let $u\in[0,1]$ be a realization of $U$. The corresponding sample of $X$ is
> $$X = \begin{cases} x_0 & \text{if } u < p_0\\ x_1 & \text{if } p_0\le u< p_0 + p_1\\ x_2 & \text{if } p_0 + p_1 \le u < p_0 + p_1 + p_2\\ \ \vdots\\ x_j & \text{if } \sum_{i=0}^{j-1}p_i\le u<\sum_{i=0}^j p_i\\ \ \vdots\end{cases}$$
> Why is this method correct? Why call it the inverse transform method?

**Picture.** Lay the probabilities end to end along $[0,1]$:

```
0        p0        p0+p1          p0+p1+p2                 1
|---x0---|----x1----|------x2-------|---- ... ----------------|
```

Throw $U$ at the stick. Whichever segment it lands in, output that segment's label.

**Algorithm (as code).** Walk along the segments until the running total passes $u$:

```python
def sample_discrete(xs, ps, u):
    cum = 0.0
    for x, p in zip(xs, ps):
        cum += p
        if u < cum:
            return x
    return xs[-1]   # guards against round-off when u is very close to 1
```

### Slide 12/23: Why it is correct, and why "inverse transform"

> **On the slide.** $X = x_j$ if $\sum_{i=0}^{j-1}p_i \le U < \sum_{i=0}^j p_i$. Now $P(X = x_j) = p_j$, hence the method is correct. Recall $F_X(x_j) = \sum_{i=0}^j p_i$. This implies $X = x_j$ if $F_X(x_{j-1}) \le U < F_X(x_j)$. After generating $U$, we determine $X$ by finding the interval $[F_X(x_{j-1}), F_X(x_j))$ in which $u$ lies. At a high level we are performing $X = F_X^{-1}(U)$, but $F_X$ is discontinuous, so its inverse has to be cleverly defined.

**Correctness.** The segment for $x_j$ has length exactly $p_j$:
$$P(X = x_j) = P\Big(\sum_{i=0}^{j-1}p_i\le U<\sum_{i=0}^{j}p_i\Big) = \sum_{i=0}^{j}p_i - \sum_{i=0}^{j-1}p_i = p_j .\qquad\checkmark$$

**The name.** The cut points are the values of the CDF (here we list the support in increasing order, $x_0 < x_1 < \cdots$): $\sum_{i\le j}p_i = F_X(x_j)$. So the rule reads
$$\boxed{X = x_j \iff F_X(x_{j-1}) \le U < F_X(x_j)} .$$
Look at the graph of the staircase $F_X$. You start from the height $U$ on the vertical axis, move right until you hit the staircase, and drop down to the $x$ value where the step happens. That is reading the graph of $F_X$ backwards, from $y$ to $x$, which is what an inverse function does. Hence "inverse transform".

**The "cleverly defined" inverse.** A staircase has no inverse in the usual sense: it is flat between jumps (many $x$ for one height) and it jumps (heights it never takes). The standard fix, which works for **every** CDF, is the *generalized inverse*
$$\boxed{F^{-1}(u) := \inf\{x : F(x)\ge u\}}\qquad 0<u<1,$$
"the smallest $x$ at which the CDF reaches height $u$". For a staircase it returns $x_j$ for every $u\in(F(x_{j-1}), F(x_j)]$, which is the slide's rule. (The only difference is at the single points $u = F(x_j)$, which have probability 0.) For a continuous strictly increasing $F$ it is the ordinary inverse. The proof that it always works is on the next page, after slide 14.

**Efficiency note (Ross).** The loop checks segments in order, so the expected number of comparisons is $\sum_j (j+1)p_j$. Listing the values in **decreasing order of probability** makes the loop stop sooner on average. (The method stays correct in any order, since the segment lengths are still $p_j$, but then the cut points are no longer CDF values.)

### Slide 13/23: Our aim for a continuous random variable

> **On the slide.** Suppose you have access to samples from $U$ over $[0,1]$ (we will not study how to generate such samples). Consider a continuous random variable $X$ with support set $\mathcal X$ and CDF $F_X(x)$. The support of $X$ could be arbitrary. **Our aim:** create i.i.d. samples of $X$ using i.i.d. samples of $U$. We shall again see the inverse transform method.

The discrete method found the $x$ where the CDF crosses height $U$. For a continuous $X$, the CDF has no jumps, so "the $x$ where $F_X$ reaches height $U$" is just the solution of $F_X(x) = U$.

### Slide 14/23: The lemma and its proof

> **On the slide.** **Lemma.** Let $U$ be uniform over $[0,1]$. Consider a continuous random variable $X$ with CDF $F_X(\cdot)$, and define $\hat X := F_X^{-1}(U)$. Then the CDF of $\hat X$ is $F_X(\cdot)$.
> **Proof.** $F_{\hat X}(x) = \mathbb P[F_X^{-1}(U)\le x] = \mathbb P[U\le F_X(x)] = F_X(x)$.

**The proof line by line.**

1. $F_{\hat X}(x) = P(\hat X\le x) = P\big(F_X^{-1}(U)\le x\big)$. This is the definition of a CDF.
2. $F_X^{-1}(U)\le x \iff U \le F_X(x)$. Apply the increasing function $F_X$ to both sides of the inequality. Because $F_X$ is increasing it keeps the direction of the inequality, and $F_X(F_X^{-1}(U)) = U$.
3. $P(U\le F_X(x)) = F_X(x)$, because $F_X(x)$ is a number in $[0,1]$ and $P(U\le c) = c$ for such $c$ (toolkit fact 6).

**Making step 2 airtight, for any CDF.** Step 2 is immediate when $F_X$ is continuous and strictly increasing. With the generalized inverse $G(u) = \inf\{x: F(x)\ge u\}$ it holds for **every** CDF $F$:
$$G(u)\le x \iff u\le F(x).$$
*Proof.* ($\Leftarrow$) If $u\le F(x)$, then $x$ belongs to the set $\{y : F(y)\ge u\}$, so the infimum $G(u)$ of that set is at most $x$.
($\Rightarrow$) Because $F$ is non-decreasing and right-continuous, the set $\{y: F(y)\ge u\}$ is an interval $[G(u),\infty)$ that contains its left endpoint, so $F(G(u))\ge u$. If $G(u)\le x$, then $F(x)\ge F(G(u))\ge u$. $\square$

So $P(G(U)\le x) = P(U\le F(x)) = F(x)$ for every CDF. One method covers discrete, continuous and mixed distributions, and slide 12's rule is the discrete case.

### Slide 15/23: How to use the lemma, and what is special about it

> **On the slide.** Using this lemma, how do you generate samples of a continuous $X$ from samples of $U$? **Answer:** draw $u\sim U$ and compute $F_X^{-1}(u)$. This is a sample of $\hat X$, which has the same distribution as $X$. (Link: Wikipedia, inverse transform sampling.) Do you observe anything "special" about this lemma?

**Recipe.**

1. Write down the CDF $F_X(x)$.
2. Solve $F_X(x) = u$ for $x$. The answer is $x = F_X^{-1}(u)$.
3. For each uniform sample $u_i$, output $x_i = F_X^{-1}(u_i)$.

**Example (the classic): Exp$(\lambda)$.** $F(x) = 1 - e^{-\lambda x}$ for $x\ge0$. Solve $1 - e^{-\lambda x} = u$:
$$e^{-\lambda x} = 1 - u\ \Rightarrow\ x = -\frac1\lambda\ln(1-u).$$
So $X = -\frac1\lambda\ln(1 - U)\sim$ Exp$(\lambda)$. Since $1 - U$ is also $\mathcal U[0,1]$, the simpler $X = -\frac1\lambda\ln U$ works too (probabilitycourse Ch. 14, Example 5).

**What is special.** Three things.

1. **One uniform is enough for any distribution.** The same single source of randomness produces exponential, Cauchy, normal (in principle), anything. This is called the *universality of the uniform*.
2. **The construction is explicit and exact.** There is no approximation, unlike Monte Carlo. Each $u$ gives exactly one sample, and none are wasted, unlike accept–reject in L16.
3. **It runs both ways.** If $F^{-1}(U)$ has CDF $F$, then applying $F$ to an $F$-distributed variable should give back a uniform. That is slide 16.

Its limitation is also worth knowing: you need $F_X^{-1}$ in a usable form. For the normal distribution, $\Phi$ has no closed form, so its inverse has none either. That is why other methods exist (accept–reject in L16, and Box–Muller in L19).

### Slide 16/23: Application in data analysis

> **On the slide.** Lemma: $\hat X = F_X^{-1}(U)$ has distribution $F_X(\cdot)$. What will be the CDF of $Y = F_X(\hat X)$? **Uniform!** A consequence of this lemma is that $F_X(X)$ is a uniform distribution. This property is known as the "probability integral transform" or "universality of the uniform". This property is used to test whether a set of observations can be modelled as arising from a specified distribution $G(\cdot)$ or not.

**Why $F_X(X)$ is uniform.** Two short proofs.

*Via the lemma (the slide's route).* $X$ and $\hat X = F_X^{-1}(U)$ have the same distribution, so $F_X(X)$ and $F_X(\hat X)$ have the same distribution. But $F_X(\hat X) = F_X(F_X^{-1}(U)) = U$ when $F_X$ is continuous. So $F_X(X)\sim\mathcal U[0,1]$.

*Directly (when $F_X$ is continuous and strictly increasing).* For $0<y<1$:
$$P(F_X(X)\le y) = P\big(X\le F_X^{-1}(y)\big) = F_X\big(F_X^{-1}(y)\big) = y .$$
That is the $\mathcal U[0,1]$ CDF.

$$\boxed{X \text{ continuous with CDF } F_X\ \Longrightarrow\ F_X(X)\sim\mathcal U[0,1]}$$

**Continuity is needed.** For $X\sim$ Bernoulli$(\frac12)$, $F_X(X)$ equals $\frac12$ (when $X = 0$) or $1$ (when $X = 1$). It takes only two values, so it is not uniform.

**Example.** If $X\sim$ Exp$(\lambda)$ then $1 - e^{-\lambda X}\sim\mathcal U[0,1]$, and so is $e^{-\lambda X}$ (as $1 - U$ is uniform).

**Goodness-of-fit testing, the red bullet.** You have data $x_1, \dots, x_n$ and a hypothesis "the data come from CDF $G$". Transform each point: $u_i = G(x_i)$.

- If the hypothesis is right, the $u_i$ are i.i.d. $\mathcal U[0,1]$ samples, so their histogram should be flat, and their sorted values should lie close to the line $\frac in$.
- If the $u_i$ bunch up (for example, most of them near 0 or near 1), the data did not come from $G$.

Formal tests such as the Kolmogorov–Smirnov test measure how far the $u_i$ are from uniform. All of them rest on this one fact: the question "is the data from $G$?" becomes the standard question "is the data uniform?".

### Slide 17/23: Evaluating integrals via the Monte Carlo approach

> **On the slide.** Suppose you want to compute $\theta = \int_0^1 g(x)\,dx$ using only samples from $U[0,1]$. How? $\theta = E[g(U)]$. Use i.i.d. samples of $U$ and invoke the strong law of large numbers (SLLN): *suppose $X_i$ are i.i.d. and $S_n = \sum_{i=1}^n X_i$; then $\frac{S_n}{n}\to E[X]$.* As $n\to\infty$, $\sum_{i=1}^n \frac{g(U_i)}{n}\to E[g(U)] = \theta$. **HW:** how will you compute $\int_a^b g(x)\,dx$ or $\int_0^\infty g(x)\,dx$?

**Step 1: write the integral as an expectation.** The $\mathcal U[0,1]$ density is 1 on $[0,1]$, so by LOTUS
$$E[g(U)] = \int_0^1 g(x)\cdot 1\,dx = \theta .$$

**Step 2: estimate the expectation by a sample average.** Let $X_i = g(U_i)$. These are i.i.d. (functions of i.i.d. variables) with mean $\theta$. The SLLN says the average converges to the mean:
$$\boxed{\hat\theta_n = \frac1n\sum_{i=1}^n g(U_i)\ \xrightarrow{\ n\to\infty\ }\ \theta}$$
L17 makes "$\to$" precise: it holds *with probability 1*.

**How accurate is it?** (Using L17 and L18.) $\hat\theta_n$ is unbiased, $E[\hat\theta_n] = \theta$, and
$$\operatorname{Var}(\hat\theta_n) = \frac{\operatorname{Var}(g(U))}{n},\qquad\text{so the typical error is}\quad\frac{\sigma_g}{\sqrt n},\quad \sigma_g^2 = \operatorname{Var}(g(U)).$$
Ten times more accuracy costs a hundred times more samples. The $\frac1{\sqrt n}$ rate does not depend on the dimension, which is why Monte Carlo is the method of choice for high-dimensional integrals.

**Worked example.** $\theta = \int_0^1 e^{x}\,dx = e - 1\approx 1.7183$. Here $\operatorname{Var}(e^U) = E[e^{2U}] - (e-1)^2 = \frac{e^2-1}{2} - (e - 1)^2\approx 0.2420$, so with $n = 1000$ samples the typical error is $\sqrt{0.2420/1000}\approx 0.016$.

**Worked example with no closed form.** $\theta = \int_0^1 e^{x^2}dx\approx 1.46265$ has no antiderivative in elementary functions, but the estimator $\frac1n\sum e^{U_i^2}$ is one line of code. A run with $n = 10^5$ gave $1.4635$.

```python
u = np.random.uniform(0, 1, 100000)
theta_hat = np.mean(np.exp(u**2))
```

**HW part 1: $\int_a^b g(x)\,dx$.** Two equivalent ways.

- *Substitute* $x = a + (b-a)u$, so $dx = (b-a)\,du$:
$$\int_a^b g(x)\,dx = (b - a)\int_0^1 g\big(a + (b-a)u\big)\,du = (b-a)\,E\big[g(a + (b-a)U)\big].$$
- *Equivalently,* $V = a + (b-a)U\sim\mathcal U[a,b]$ has density $\frac{1}{b-a}$, so $\int_a^b g = (b-a)E[g(V)]$.

Estimator: $\hat\theta_n = \frac{b-a}{n}\sum_{i=1}^n g\big(a + (b-a)U_i\big)$.

**HW part 2: $\int_0^\infty g(x)\,dx$.** Map $(0,\infty)$ onto $(0,1)$ with a substitution.

- *Ross's substitution* $y = \frac{1}{1+x}$, so $x = \frac1y - 1$ and $dx = -\frac{dy}{y^2}$:
$$\int_0^\infty g(x)\,dx = \int_0^1 \frac{g\big(\frac1y - 1\big)}{y^2}\,dy = E\Big[\frac{g(1/U - 1)}{U^2}\Big].$$
- *Log substitution* $x = -\ln y$, so $dx = -\frac{dy}{y}$:
$$\int_0^\infty g(x)\,dx = \int_0^1\frac{g(-\ln y)}{y}\,dy = E\Big[\frac{g(-\ln U)}{U}\Big].$$
- *Or use a density on $(0,\infty)$ directly* (this is importance sampling, slide 18). With $Y\sim$ Exp$(1)$: $\int_0^\infty g(x)\,dx = E\big[g(Y)e^{Y}\big]$.

*Check:* $\int_0^\infty e^{-x^2}dx = \frac{\sqrt\pi}{2}\approx0.8862$. The first substitution with $2\times10^5$ samples gave $0.8871$.

**Last year's HW6 Q8: $I_2 = \int_0^\infty e^{-x}dx$ with $N$ uniform samples.** With the log substitution, $\frac{g(-\ln u)}{u} = \frac{e^{\ln u}}{u} = \frac uu = 1$. Every sample gives exactly 1, so the estimate is $\hat I_2 = 1$ with **zero variance**. This happens because the substitution's density matches the integrand exactly, which is the ideal case of importance sampling below. Ross's substitution also works, $\hat I_2 = \frac1N\sum\frac{e^{-(1/U_i - 1)}}{U_i^2}$, but with non-zero variance.

### Slide 18/23: Importance sampling

> **On the slide.** Suppose you want to compute $E[h(X)]$ where $X$ has pdf $f(\cdot)$. Assume you do not have samples from $X$ but you know $f(\cdot)$. Now suppose you have access to samples from a random variable $Y$ with pdf $g(\cdot)$. How will you use i.i.d. samples of $Y$ to compute $E[h(X)]$?
> $$E[h(X)] = \int h(x)f(x)\,dx = \int\frac{h(y)f(y)}{g(y)}g(y)\,dy = E_Y\Big[\frac{h(Y)f(Y)}{g(Y)}\Big].$$
> Now use the LLN and samples of $Y$ to estimate $E[h(X)]$.

**The trick in the middle line.** Multiply and divide by $g$. The integral is unchanged, but it now reads as the expectation of the function $\frac{h(y)f(y)}{g(y)}$ under the density $g$, which we *can* sample from. (The dummy variable is renamed from $x$ to $y$ to stress that the samples come from $Y$.)

**The estimator.** Draw $Y_1, \dots, Y_n$ i.i.d. from $g$ and average:
$$\boxed{\widehat{E[h(X)]} = \frac1n\sum_{i=1}^n h(Y_i)\,w(Y_i),\qquad w(y) = \frac{f(y)}{g(y)}}$$
The $w(Y_i)$ are the **importance weights** (or likelihood ratios). They correct for sampling from the "wrong" distribution: a point that $g$ over-samples relative to $f$ gets weight below 1, and a point it under-samples gets weight above 1. By the SLLN the estimator converges to $E_Y[h(Y)w(Y)] = E[h(X)]$.

**The one condition you must check: support.** The middle step divides by $g(y)$, so we need
$$g(y)>0\quad\text{wherever}\quad h(y)f(y)\ne0 .$$
If $g$ is zero on part of the region where $hf$ lives, that part of the integral is simply never sampled, and the estimator converges to the wrong number. Last year's Tutorial 6 Q7, in Part B below, is exactly this trap.

**Why it is called "importance" sampling.** Even when you *can* sample from $f$, sampling from a different $g$ can give a far smaller variance. The idea is to put the samples where $|h(x)|f(x)$ is large, the "important" region, and correct with the weights. The best possible choice is $g \propto |h|f$. When $h\ge 0$ this gives **zero variance**: with $g = hf/E[h(X)]$, every term $h(Y_i)w(Y_i)$ equals $E[h(X)]$. You cannot use that $g$ in practice, because it needs the answer to normalise it, but it tells you what to aim for. HW6 Q8 above was an instance of it.

**Worked example: a rare event.** Estimate $\theta = P(Z > 5)$ for $Z\sim\mathcal N(0,1)$. The true value is $\theta\approx2.87\times10^{-7}$.

- *Plain Monte Carlo* averages $\mathbf 1\{Z_i>5\}$. With a million samples you expect $0.29$ hits, so the estimate is almost always $0$. Useless.
- *Importance sampling* with $Y\sim\mathcal N(5,1)$, centred on the important region. With $h(y) = \mathbf 1\{y>5\}$:
$$w(y) = \frac{f(y)}{g(y)} = \frac{e^{-y^2/2}}{e^{-(y-5)^2/2}} = e^{-5y + 12.5},\qquad \hat\theta = \frac1n\sum_{i=1}^n\mathbf 1\{Y_i > 5\}\,e^{-5Y_i + 12.5} .$$
About half of the $Y_i$ exceed 5, and each contributes a tiny weight. A run with $n = 10^5$ gave $2.88\times10^{-7}$, within 1% of the truth.

## Part B: extra worked examples and problems

### Discrete inverse transform

**B1 (last year's Tutorial 6 Q5).** $p_X(1) = 0.4$, $p_X(5) = 0.3$, $p_X(10) = 0.3$. Describe the inverse transform method and give the ranges of $u$.

*Solution.* The CDF values are $F(1) = 0.4$, $F(5) = 0.7$, $F(10) = 1$. Draw $u\sim\mathcal U[0,1]$ and set
$$X = \begin{cases}1 & 0\le u<0.4\\ 5 & 0.4\le u < 0.7\\ 10 & 0.7\le u\le 1\end{cases}$$
Each interval's length equals the probability of its value. For example, $u = 0.55$ gives $X = 5$.

**B2 (probabilitycourse Ch. 14, Example 4).** $P(X=1) = 0.35$, $P(X=2) = 0.15$, $P(X=3) = 0.4$, $P(X=4) = 0.1$.

*Solution.* The intervals are $[0, 0.35)\to1$, $[0.35, 0.5)\to2$, $[0.5, 0.9)\to3$, $[0.9, 1)\to4$. (Ordering for speed: checking $3$ first, then $1$, then $2$, then $4$ cuts the expected number of comparisons from $0.35 + 2(0.15) + 3(0.4) + 4(0.1) = 2.25$ to $0.4 + 2(0.35) + 3(0.15) + 4(0.1) = 1.95$.)

**B3 (probabilitycourse Ch. 14, Examples 1 and 3): Bernoulli and binomial.** Bernoulli$(p)$: $X = \mathbf 1\{U < p\}$, so $P(X = 1) = P(U<p) = p$. Binomial$(n,p)$: add $n$ independent Bernoullis, $X = \sum_{i=1}^n\mathbf 1\{U_i<p\}$. This uses L14's fact that a binomial is a sum of i.i.d. Bernoullis.

**B4 (probabilitycourse Ch. 14, Exercise 1): Geometric$(p)$ in closed form.** The inverse transform for a geometric can be solved exactly. Since $P(X > k) = (1-p)^k$, we have $F(k) = 1 - (1-p)^k$. The rule "smallest $k$ with $F(k) \ge u$" becomes "smallest $k$ with $(1-p)^k\le 1-u$", that is, $k\ge\frac{\ln(1-u)}{\ln(1-p)}$ (dividing by $\ln(1-p)<0$ flips the inequality). So
$$X = \Big\lceil\frac{\ln(1-U)}{\ln(1-p)}\Big\rceil,\quad\text{or equivalently (with probability 1)}\quad X = \Big\lfloor\frac{\ln(1-U)}{\ln(1-p)}\Big\rfloor + 1 .$$
*Check of the second form:* $X>k\iff\frac{\ln(1-U)}{\ln(1-p)}\ge k\iff 1-U\le(1-p)^k$, which has probability $(1-p)^k$. ✓ A negative binomial (trials until the $r$-th success) is a sum of $r$ independent geometrics.

**B5 (probabilitycourse Ch. 14, Exercise 2 and Example 7): Poisson$(\lambda)$, two ways.**

*(a) Inverse transform with an infinite support.* Walk along $p_0 = e^{-\lambda}$, $p_1, p_2, \dots$, adding up the CDF until it exceeds $u$. The recursion $p_{i+1} = \frac{\lambda}{i+1}p_i$ avoids computing factorials.

*(b) Counting exponential arrivals.* Arrivals of a Poisson process of rate $\lambda$ have i.i.d. Exp$(\lambda)$ gaps $T_i = -\frac1\lambda\ln U_i$ (slide 15). The number of arrivals in $[0,1]$ is Poisson$(\lambda)$, so
$$X = \max\{j : T_1 + \dots + T_j\le1\} = \max\{j : U_1U_2\cdots U_j\ge e^{-\lambda}\}.$$
The second form holds because $-\frac1\lambda\ln(U_1\cdots U_j)\le1\iff U_1\cdots U_j\ge e^{-\lambda}$. In words: keep multiplying uniforms until the product drops below $e^{-\lambda}$; the number of factors *before* that is $X$. (A simulation with $\lambda = 2$ matched the Poisson pmf to 3 decimals.)

### Continuous inverse transform

**B6 (last year's HW6 Q4): Weibull lifetime.** $F_X(x) = 1 - e^{-x^2}$ for $x\ge0$. Solve $1 - e^{-x^2} = u$: $x^2 = -\ln(1-u)$, so
$$X = \sqrt{-\ln(1 - U)}\qquad(\text{or } \sqrt{-\ln U}).$$

**B7 (last year's Tutorial 6 Q6).** $F(x) = \frac12\Big(1 + \frac{x}{\sqrt{1+x^2}}\Big)$ on $\mathbb R$. (a) Find $F^{-1}(u)$. (b) Find the sample for $U = 0.75$.

*Solution.* (a) Set $\frac{x}{\sqrt{1+x^2}} = 2u - 1 =: v$. Note that $x$ and $v$ have the same sign. Squaring: $x^2 = v^2(1 + x^2)$, so $x^2 = \frac{v^2}{1 - v^2}$, and
$$x = \frac{v}{\sqrt{1 - v^2}} = \frac{2u - 1}{\sqrt{1 - (2u-1)^2}} = \frac{2u-1}{2\sqrt{u(1-u)}},\qquad 0<u<1,$$
using $1 - (2u-1)^2 = 4u(1-u)$.
(b) $u = 0.75$: $x = \frac{0.5}{2\sqrt{0.1875}} = \frac{0.5}{0.866} = \frac{1}{\sqrt3}\approx0.577$. *Check:* $F(1/\sqrt3) = \frac12\big(1 + \frac{1/\sqrt3}{\sqrt{4/3}}\big) = \frac12(1 + \frac12) = 0.75$. ✓

**B8 (probabilitycourse Ch. 14, Exercise 3).** $f(x) = \frac52x^{3/2}$ on $(0,1)$. The CDF is $F(x) = x^{5/2}$, so $X = U^{2/5}$.

**B9 (probabilitycourse Ch. 14, Exercise 4).** $F(x) = \frac{x^2 + x}{2}$ on $[0,1]$. Solve the quadratic $x^2 + x - 2u = 0$ and keep the root in $[0,1]$:
$$X = \frac{-1 + \sqrt{1 + 8U}}{2} = \sqrt{2U + \tfrac14} - \tfrac12 .$$

**B10 (probabilitycourse Ch. 14, Exercise 5): Cauchy, and a warning.** $F(x) = \frac1\pi\arctan x + \frac12$, so $X = \tan\big(\pi(U - \frac12)\big)$. If you average 1000 such samples, and repeat 100 times, the averages do *not* settle down. The Cauchy distribution has no mean ($E|X| = \infty$), so the SLLN does not apply. Monte Carlo needs a finite mean (slide 17's box hides this assumption; L17 states it).

**B11: a triangular density.** $f(x) = x$ on $[0,1]$ and $2 - x$ on $[1,2]$. The CDF is $\frac{x^2}2$ on $[0,1]$ and $1 - \frac{(2-x)^2}{2}$ on $[1,2]$, with $F(1) = \frac12$. Invert each piece:
$$X = \begin{cases}\sqrt{2U} & U\le\frac12\\ 2 - \sqrt{2(1 - U)} & U>\frac12\end{cases}$$
(Another way: $X = U_1 + U_2$ for two independent uniforms has this density, by the L13 convolution.)

**B12 (last year's Tutorial 7 Q6; probabilitycourse Ch. 14, Example 6): Gamma from uniforms.** (a) $X = -\frac1\lambda\ln U\sim$ Exp$(\lambda)$. (b) For Gamma with integer shape $k$ and *scale* $\theta$ (rate $\frac1\theta$), add $k$ independent exponentials, using L14 slide 6:
$$Y = -\theta\sum_{i=1}^k\ln U_i = -\theta\ln(U_1U_2\cdots U_k).$$
The product form needs only one logarithm. (Non-integer shapes such as $\frac52$ need accept–reject; see L16.)

### The probability integral transform

**B12a (last year's Quiz 2 Q3).** You can only sample $X\sim$ Exp$(\lambda)$. Give a procedure that produces $\mathcal U(0,1)$ samples, and justify it.

*Solution.* Draw $x$ from Exp$(\lambda)$ and return $u = F_X(x) = 1 - e^{-\lambda x}$. By slide 16, $F_X(X)\sim\mathcal U(0,1)$ because $F_X$ is continuous. Directly, for $0\le u<1$:
$$P(1 - e^{-\lambda X}\le u) = P\Big(X\le-\tfrac1\lambda\ln(1-u)\Big) = 1 - e^{-\lambda\cdot\frac{-\ln(1-u)}{\lambda}} = 1 - (1 - u) = u .$$
(The marking scheme gave 0 marks to answers that used uniform samples, such as accept–reject, since uniforms were not available.)

**B12b: chaining the two directions.** With only Exp$(1)$ samples, how do you produce samples of a Cauchy variable?

*Solution.* First make a uniform, $U = 1 - e^{-X}$ (slide 16), then apply the Cauchy inverse CDF (slide 14): $\tan\big(\pi(U - \frac12)\big)$. In general, $F_Y^{-1}(F_X(X))$ turns a continuous $X$ into any target $Y$. This is the composition of slides 16 and 14.

### Monte Carlo integration

**B13 (last year's Endsem Q2): estimating $\pi$.** Draw $n$ i.i.d. points $(X_i, Y_i)$ uniform on $[0,1]^2$, and let $I_i = \mathbf 1\{X_i^2 + Y_i^2\le1\}$ (inside the quarter disc). Then
$$\hat\pi = \frac4n\sum_{i=1}^n I_i .$$
*Justification.* $E[I_i] = P(X^2 + Y^2\le1) = $ area of the quarter disc $= \frac\pi4$. Equivalently $\frac\pi4 = \int_0^1\sqrt{1 - x^2}\,dx = \int_0^1\int_0^1\mathbf 1\{x^2 + y^2\le1\}\,dy\,dx$. By the SLLN, $\hat\pi\to4\cdot\frac\pi4 = \pi$.
*Accuracy.* $\operatorname{Var}(4I_i) = 16\cdot\frac\pi4\big(1 - \frac\pi4\big)\approx2.697$, so $\operatorname{SD}(\hat\pi)\approx\sqrt{2.697/n}$. With $n = 10^4$ that is about $0.016$, so you get roughly two correct decimals.

**B14 (last year's Tutorial 7 Q5).** $I = \int_0^{2\pi}f(x)\,dx$. (a) Monte Carlo with uniform samples. (b) With samples from a pdf $g$. (c) Show both are right on average.

*Solution.* (a) $X_i\sim\mathcal U[0,2\pi]$: $\hat I = \frac{2\pi}{N}\sum_{i=1}^N f(X_i)$. (b) $X_i\sim g$: $\hat I = \frac1N\sum_{i=1}^N\frac{f(X_i)}{g(X_i)}$, which needs $g>0$ wherever $f\ne0$ on $[0, 2\pi]$. (c) By linearity, $E[\hat I]$ equals the expectation of one term. In (a), $E[2\pi f(X)] = 2\pi\int_0^{2\pi}f(x)\frac{1}{2\pi}dx = I$. In (b), $E\big[\frac{f(X)}{g(X)}\big] = \int\frac{f(x)}{g(x)}g(x)\,dx = I$. Both estimators are unbiased.

**B15 (last year's HW6 Q17).** $I_1 = \int_0^a\sqrt x\,dx$ with $N$ samples of $U[0,1]$, and with samples from a pdf $g$ on $[0,a]$.

*Solution.* Substituting $x = au$: $\hat I_1 = \frac aN\sum_{i=1}^N\sqrt{aU_i}$. With $X_i\sim g$: $\hat I_1 = \frac1N\sum_{i=1}^N\frac{\sqrt{X_i}}{g(X_i)}$. The exact value is $\frac23a^{3/2}$; for $a = 4$ a run gave $5.331$ against $5.333$.

### Importance sampling

**B16 (last year's Tutorial 6 Q7): the support trap.** Estimate $\theta = E[X^2]$ for $X\sim$ Exp$(1)$ by importance sampling with $N$ samples $Y_i\sim\mathcal U[0,5]$.

*Solution.* $f(y) = e^{-y}$ and $g(y) = \frac15$ on $[0,5]$, so $w(y) = 5e^{-y}$ and
$$\hat\theta = \frac1N\sum_{i=1}^N 5\,Y_i^2e^{-Y_i}.$$
*The catch.* $g = 0$ on $(5,\infty)$, where $x^2e^{-x}$ is still positive, so the support condition fails. The estimator converges to
$$\int_0^5x^2e^{-x}\,dx = 2 - 37e^{-5}\approx1.7507,\qquad\text{not}\quad\theta = E[X^2] = 2 .$$
About 12% of the answer lives beyond 5 and is never sampled. The fix is a proposal with support $[0,\infty)$, for example $g = $ Exp$(\frac12)$, whose heavier tail covers the region where $x^2e^{-x}$ is large.

**B17: importance sampling to compute an expectation you cannot sample.** Suppose $f(x) = \frac{2}{\pi(1 + x^2)}$ on $[0,\infty)$ (a half-Cauchy) and you want $E[e^{-X}]$, but can only sample Exp$(1)$. With $Y\sim$ Exp$(1)$, $g(y) = e^{-y}$:
$$E[e^{-X}] = E_Y\Big[e^{-Y}\cdot\frac{2/(\pi(1+Y^2))}{e^{-Y}}\Big] = E_Y\Big[\frac{2}{\pi(1 + Y^2)}\Big],$$
so the estimator is $\frac1n\sum\frac{2}{\pi(1 + Y_i^2)}$. The weights cancel the $e^{-y}$ exactly. Notice the support condition holds ($g>0$ on all of $[0,\infty)$).

**B18: choosing the proposal (exam-style reasoning).** To estimate $P(X>20)$ for $X\sim$ Exp$(1)$ (true value $e^{-20}\approx2\times10^{-9}$), a good proposal is the shifted exponential $Y = 20 + E$ with $E\sim$ Exp$(1)$. Its density is $g(y) = e^{-(y-20)}$ on $[20,\infty)$, so every sample lands in the event, and the weight is $w(y) = \frac{e^{-y}}{e^{-(y-20)}} = e^{-20}$, constant. The estimator returns $e^{-20}$ exactly, with zero variance: the proposal is the optimal $g\propto hf$, as described under slide 18.



# Lecture 16: Accept–reject, and what "$X_n\to X$" means (Deck B, slides 2 to 11)

**Big picture.** The lecture has two halves.

1. **Accept–reject (slides 2 to 7).** The inverse transform needs $F^{-1}$ in a usable form. Accept–reject needs only the pmf or pdf, plus some distribution you can already sample from. It finishes the simulation chapter.
2. **Convergence of random variables (slides 7 to 11).** The SLLN was used on slide 17 of L15 without saying what "$\frac{S_n}{n}\to E[X]$" means for *random* quantities. These slides start answering that by recalling convergence of numbers and of functions. L17 and L18 then define five kinds of convergence.

## Part A: the slides

### Slide 2/30: Recap

> **On the slide.** Inverse transform method. $F_X(X)$ is uniform! Importance sampling.

These are the three tools from L14 and L15. See the previous section for each.

### Slide 3/30: The accept–reject method

> **On the slide.** Suppose you want to generate samples from $X$ with pmf $p(\cdot)$ using samples from $Y$ with pmf $q(\cdot)$. Suppose that $\frac{p(y)}{q(y)}\le c$ for all $y$. The method:
> Step 1: generate a sample $y\sim q(\cdot)$.
> Step 2: generate $u\sim\mathcal U(0,1)$.
> Step 3: if $u\le\frac{p(y)}{c\,q(y)}$, accept $y$ as a sample from $X$.
> Step 4: if not, reject $y$ and go back to Step 1.

**The vocabulary.** $p$ is the **target** (what you want). $q$ is the **proposal** (what you can sample). $c$ is the **envelope constant**: $c\,q(y)$ sits on top of $p(y)$ everywhere, like an envelope.

**The intuition.** A proposal $y$ is kept with probability $\frac{p(y)}{c\,q(y)}$, a number in $[0,1]$ because of the bound $p\le cq$.

- Where $q$ proposes a value *more* often than $p$ wants ($q(y)$ large relative to $p(y)$), the ratio is small and most proposals of $y$ are thrown away.
- Where $p$ wants a value relatively more, the ratio is near 1 and proposals of $y$ are almost always kept.

The thinning reshapes the proposal's distribution into the target's.

**Two facts you can read off immediately.**

- **$c\ge1$, always.** Sum $p(y)\le c\,q(y)$ over all $y$: $1\le c\cdot1$. Equality $c = 1$ forces $p = q$ (nothing to do).
- **The support condition.** We need $q(y)>0$ wherever $p(y)>0$; otherwise $\frac{p}{q}$ is not bounded and no $c$ exists. You cannot reach values your proposal never produces. This is the same condition as in importance sampling.

### Slide 4/30: Flowchart, and the question

> **On the slide.** A flowchart (from Ross): Start, generate $Y\sim g$, generate a random number $U$, is $U\le\frac{f(Y)}{c\,g(Y)}$? Yes: set $X = Y$. No: go back to the start. Why does the method work? What is $P(y\mid\text{accept})$? Is it $p(y)$?

The flowchart uses $f$ and $g$ for densities, the continuous version. The algorithm is the same with pdfs in place of pmfs, and so is the proof (with sums replaced by integrals; see below).

The question on the slide is the key point. Every accepted value $y$ is the output, so its distribution is the distribution of $Y$ **given that it was accepted**. The method works exactly when that conditional distribution is $p$.

### Slides 5/30 and 6/30: Proof

> **On the slide.** $P(\text{accept}\mid y) = P\big(u\le\frac{p(y)}{cq(y)}\big) = \frac{p(y)}{cq(y)}$ since $u\sim\mathcal U(0,1)$. So the joint probability of sampling $y\sim q(\cdot)$ and accepting it is $P(\text{sample } y\text{ and accept}) = q(y)\cdot\frac{p(y)}{cq(y)} = \frac{p(y)}{c}$. The marginal probability of accepting (the normalizing constant) is $P(\text{accept}) = \sum_y\frac{p(y)}{c} = \frac1c$. Hence
> $$P(y\mid\text{accept}) = \frac{P(\text{sample } y\text{ and accept})}{P(\text{accept})} = \frac{p(y)/c}{1/c} = p(y).$$
> Therefore the accepted samples are distributed according to $p(\cdot)$.

**The proof is Bayes' rule in three steps.** Think of one round as a two-stage experiment: first $Y$ is drawn, then a coin with success probability $\frac{p(Y)}{cq(Y)}$ is tossed.

1. *Likelihood.* Given $Y = y$, the round accepts when $U\le\frac{p(y)}{cq(y)}$. Since $U$ is uniform and independent of $Y$, and the threshold is in $[0,1]$, this has probability $\frac{p(y)}{cq(y)}$ (toolkit fact 6).
2. *Joint.* Multiply by the prior $q(y)$: the $q(y)$ cancels, leaving $\frac{p(y)}{c}$. This cancellation is the whole trick.
3. *Normalise.* Summing over $y$ gives $P(\text{accept}) = \frac1c\sum_y p(y) = \frac1c$, and dividing gives $p(y)$.

**What the slide's proof leaves implicit: the repeated rounds.** The output is the $y$ from the *first* accepted round, not from a single round. Rounds are independent and identical, so the first accepted round is distributed like one round conditioned on acceptance. To see it directly, add up over the round $k$ in which the first acceptance happens:
$$P(X = y) = \sum_{k\ge1}\underbrace{\Big(1 - \frac1c\Big)^{k-1}}_{\text{first } k-1 \text{ rejected}}\cdot\underbrace{\frac{p(y)}{c}}_{\text{round } k: \ y \text{ and accept}} = \frac{p(y)}{c}\cdot\frac{1}{1 - (1 - 1/c)} = p(y).\qquad\checkmark$$

**The continuous version (pdfs $f$, $g$).** The same computation with CDFs:
$$P(Y\le x\mid\text{accept}) = \frac{P(Y\le x,\ \text{accept})}{P(\text{accept})} = \frac{\int_{-\infty}^x g(y)\frac{f(y)}{cg(y)}\,dy}{\int_{-\infty}^\infty g(y)\frac{f(y)}{cg(y)}\,dy} = \frac{\frac1c F(x)}{\frac1c} = F(x).$$
This is last year's HW6 Q18 and probabilitycourse Ch. 14, Exercise 6.

**How many rounds? (Not on the slide, but examined: last year's HW7 Q8.)** Each round accepts with probability $\frac1c$, independently of the other rounds. So the number of rounds $N$ until the first acceptance is **Geometric$(\frac1c)$**:
$$\boxed{P(\text{accept}) = \frac1c,\qquad N\sim\text{Geometric}\Big(\frac1c\Big),\qquad E[N] = c}$$
Generating $k$ samples takes a sum of $k$ independent geometrics, so the expected number of rounds is $kc$. Each round uses two uniforms (one inside the proposal, one for the test), so expect about $2kc$ uniforms.

**Choosing $c$.** Any $c\ge\sup_y\frac{p(y)}{q(y)}$ gives correct samples, but a bigger $c$ means more rejections. The best choice is
$$\boxed{c^* = \max_y\frac{p(y)}{q(y)}}$$
and a good proposal is one shaped like the target, so that $c^*$ is close to 1.

**A picture that explains everything (continuous case).** Draw the curve $c\,g(x)$ above $f(x)$. A round picks $Y\sim g$ and then a height $V = U\cdot c\,g(Y)$, uniform in $[0, c\,g(Y)]$. The point $(Y, V)$ is uniform in the region under $c\,g$. "Accept if $U\le\frac{f(Y)}{cg(Y)}$" means "accept if $V\le f(Y)$", that is, if the point falls under $f$. Accepted points are uniform under $f$, so their $x$-coordinates have density $f$. The acceptance probability is $\frac{\text{area under } f}{\text{area under } cg} = \frac1c$.

**A practical bonus.** The test only uses the ratio $\frac{p(y)}{c\,q(y)}$. If you know $p$ only up to a constant, $p = \tilde p/Z$ with $Z$ unknown, use $\tilde p$ and a $\tilde c\ge\max\frac{\tilde p}{q}$ instead. The $Z$ cancels. That is why accept–reject (and MCMC, slide 7) is used in Bayesian statistics, where normalising constants are often impossible to compute.

### Slide 7/30: Stochastic simulation

> **On the slide.** This was a brief introduction to stochastic simulation. Refer to the book *Simulation* by Sheldon Ross! Some popular techniques: the inverse transform method, accept–reject (rejection sampling), importance sampling, Markov chain Monte Carlo (MCMC) methods: the Hastings–Metropolis algorithm, Gibbs sampling, slice sampling.

**The three methods you studied, side by side.**

| | Inverse transform | Accept–reject | Importance sampling |
|---|---|---|---|
| Output | exact samples of $X$ | exact samples of $X$ | an estimate of $E[h(X)]$ (weighted samples) |
| Needs | $F^{-1}$ (or a CDF you can search) | pdf/pmf $p$ (up to a constant), a proposal $q$ and $c\ge\max p/q$ | pdf $f$, a proposal $g>0$ where $hf\ne0$ |
| Cost | one uniform per sample | $c$ rounds per sample on average | $n$ proposal samples per estimate |
| Typical use | Exp, Geometric, Weibull, Cauchy, discrete tables | Beta, Gamma with non-integer shape, normal, truncated distributions | rare events, variance reduction |

**MCMC in one paragraph (not examined in detail).** When even accept–reject is too wasteful, for example in high dimensions where $c$ becomes astronomically large, MCMC builds a Markov chain whose long-run distribution is the target $p$, and uses the chain's states as (dependent) samples. Hastings–Metropolis proposes a move and accepts it with a probability that, like accept–reject, involves only *ratios* of $p$. Gibbs sampling updates one coordinate at a time from its conditional distribution. These methods rely on convergence results for dependent sequences, which is one more reason for the next topic.

### Slide 7/30 (second): "Convergence of Random Variables"

This is a section title. (The deck has two slides numbered 7.) Everything from here to the end of L18 is about this.

### Slide 8/30: Pointwise convergence

> **On the slide.** When do we say $\{x_n\}$ converges to $x\in\mathbb R$? *We say $x_n\to x$ if for every $\epsilon>0$ we can find $N(\epsilon)\in\mathbb N$ such that $|x_n - x|<\epsilon$ for $n>N(\epsilon)$.* What about convergence of functions? *We say that the sequence of functions $F_n(\cdot)$ converges to $F(\cdot)$ pointwise if the sequence $\{F_n(x)\}$ converges to $F(x)$ for all $x\in\mathbb R$.*

**Reading the $\epsilon$–$N$ definition.** Pick any tolerance $\epsilon$, however small. Then from some index on, *every* term is within $\epsilon$ of $x$. The index $N(\epsilon)$ may grow as $\epsilon$ shrinks; that is allowed. Two ways a sequence fails: it keeps jumping away (like $(-1)^n$), or it drifts off (like $n$).

*Example.* $x_n = \frac1n\to0$: given $\epsilon$, take $N(\epsilon) = \lceil1/\epsilon\rceil$; then $n>N$ gives $\frac1n<\epsilon$.

**Pointwise convergence of functions.** Freeze a point $x$. Then $F_1(x), F_2(x), \dots$ is an ordinary sequence of numbers. Pointwise convergence asks that each such sequence converges, separately for each $x$.

*Example.* $F_n(x) = x^n$ on $[0,1]$. For $0\le x<1$, $x^n\to0$. For $x = 1$, $1^n = 1\to1$. So
$$F_n\to F\ \text{pointwise},\qquad F(x) = \begin{cases}0 & 0\le x<1\\ 1 & x = 1\end{cases}$$
Every $F_n$ is continuous but the limit is not. Pointwise convergence can break continuity.

**Why this slide is here.** A random variable is a *function* $X:\Omega\to\mathbb R$. So a sequence of random variables $X_1, X_2, \dots$ is a sequence of functions on $\Omega$, and "$X_n\to X$ pointwise on $\Omega$" (that is, $X_n(\omega)\to X(\omega)$ for every outcome $\omega$) is the first and strongest notion of convergence, *sure convergence*, in L17. CDFs are functions on $\mathbb R$, and "$F_{X_n}(x)\to F_X(x)$ pointwise" (at continuity points) is the weakest notion, *convergence in distribution*, in L18.

### Slide 9/30: Uniform convergence

> **On the slide.** (Pointwise definition repeated.) For every $x$, the sequence $\{F_n(x)\}$ converges to $F(x)$. For every $\epsilon$, there exists $N(\epsilon, x)$, which can depend on $x$. Only those $F_n(x)$ are $\epsilon$-close to $F(x)$ for which $n>N(\epsilon,x)$. *If $N(\epsilon,x) = N(\epsilon)$ (independent of $x$) for every $x\in\mathbb R$, then the convergence of $F_n$ to $F$ is called uniform convergence.*

**The difference is the order of "for all" and "there exists".**

- Pointwise: for every $x$ and every $\epsilon$, there is an $N(\epsilon, x)$. Different points may need different, ever larger, $N$.
- Uniform: for every $\epsilon$ there is **one** $N(\epsilon)$ that works for all $x$ at once.

Equivalently, uniform convergence means the *worst-case* gap goes to 0:
$$\boxed{F_n\to F\ \text{uniformly}\iff \sup_x|F_n(x) - F(x)|\to0}$$
Picture an $\epsilon$-band around the graph of $F$. Uniform convergence means that from some $n$ on, the *whole* graph of $F_n$ lies inside the band.

**Examples.**

1. *$x^n$ on $[0,1]$: pointwise, not uniform.* At a fixed $x<1$, $x^n<\epsilon$ needs $n>\frac{\ln\epsilon}{\ln x}$. With $\epsilon = 0.1$: $x = 0.5$ needs $n>3.3$, but $x = 0.99$ needs $n>229$, and as $x\to1$ the required $N$ blows up. No single $N$ works. Equivalently, $\sup_{0\le x<1}|x^n - 0| = 1$ for every $n$. On $[0, 0.9]$ the convergence *is* uniform, since $\sup = 0.9^n\to0$. Uniformity depends on the domain.
2. *$F_n(x) = \frac xn$ on $\mathbb R$: pointwise to 0, not uniform.* $N(\epsilon, x) = \frac{|x|}{\epsilon}$ grows with $|x|$; $\sup_x\frac{|x|}{n} = \infty$. On any bounded interval it is uniform.
3. *$F_n(x) = \frac{x}{1 + nx^2}$ on $\mathbb R$: uniform to 0.* Calculus gives the maximum of $|F_n|$ at $x = \frac1{\sqrt n}$, with value $\frac{1}{2\sqrt n}\to0$. One $N(\epsilon) = \frac{1}{4\epsilon^2}$ works for all $x$.
4. *$F_n(x) = nxe^{-nx}$ on $[0,\infty)$: pointwise to 0, not uniform.* For fixed $x>0$, the exponential beats the $n$. But the bump at $x = \frac1n$ always has height $e^{-1}$, and it just moves towards 0. So $\sup|F_n| = e^{-1}$ does not shrink.
5. *A CDF example: $F_n(x) = 1 - e^{-nx}$ for $x>0$ (and 0 for $x\le0$).* This is the CDF of Exp$(n)$. It tends to $1$ for each $x>0$ and stays 0 for $x\le0$. The convergence is not uniform on $(0,\infty)$, since $\sup_{x>0}e^{-nx} = 1$, but it is uniform on $[a,\infty)$ for any $a>0$. This exact example returns in L18 (slide 23), where the point $x = 0$ causes trouble.

**A fact worth knowing.** A uniform limit of continuous functions is continuous. So example 1's discontinuous limit already proves that the convergence there cannot be uniform.

### Slide 10/30: Convergence of a sequence of random variables

> **On the slide.** We are now interested in the convergence of an infinite sequence of random variables $\{X_n\}$ to some limiting random variable $X$. What does $X_n\to X$ even mean? When you perform the random experiment once, you get a sequence of realizations $\{x_n\}$ and $x$. If you are "lucky", maybe $x_n\to x$. But if you perform the experiment again, you may not be so lucky and get a different sequence $\{x'_n\}$ which may not converge to $x'$. We will come up with notions of convergence that depend on how often you see the sequence of realizations converging.

**A concrete version.** Toss a fair coin forever, and let $X_n$ be the fraction of heads in the first $n$ tosses. One run of the experiment is one infinite sequence of tosses, an outcome $\omega$, and it produces a sequence of numbers $x_n = X_n(\omega)$.

- $\omega = HTHTHT\dots$ gives $x_n\to\frac12$. Lucky.
- $\omega = HHHH\dots$ gives $x_n = 1$ for all $n$, so $x_n\to1\ne\frac12$. Unlucky.
- $\omega = HTTHHHHTTTTTTTT\dots$ (blocks that double in length, alternating) gives $x_n$ swinging between about $\frac13$ and $\frac23$ forever, with no limit at all. Also unlucky.

So "does $X_n\to\frac12$?" has no yes/no answer for *every* $\omega$. The useful questions are *how many* outcomes are unlucky, measured by probability, and *how badly*. The answers give different notions:

| How we measure "converging" | Notion | Where |
|---|---|---|
| $x_n\to x$ for **every** outcome | sure convergence | L17 |
| the unlucky outcomes have **probability 0** | almost sure convergence | L17 |
| for each large $n$, a big deviation $\vert X_n - X\vert>\epsilon$ is **improbable** | convergence in probability | L18 |
| the **average** deviation $E\vert X_n - X\vert^r$ goes to 0 | convergence in $r$-th mean | L18 |
| only the **CDFs** converge | convergence in distribution | L18 |

For the coin, the SLLN (L17) says the unlucky outcomes have probability 0: the fraction of heads converges to $\frac12$ almost surely.

### Slide 11/30: What can $X$ and $X_n$ be?

> **On the slide.** Convergence of $X_n\to X$. Here $X$ could even be a deterministic number. The $X_n$'s could be dependent on each other. Each random variable $X_n$ could have a different law (pmf/pdf).

**Each bullet with an example.**

- *$X$ deterministic.* The sample mean $\hat\mu_n$ converges to the constant $\mu$ (SLLN). A constant $c$ is a random variable too: $X(\omega) = c$ for every $\omega$.
- *The $X_n$ dependent.* The sample means $\hat\mu_n$ and $\hat\mu_{n+1}$ share $n$ of their terms, so they are strongly dependent. The SLLN needs i.i.d. *inputs* $X_i$, but the sequence that converges, $\hat\mu_n$, is not i.i.d.
- *Different laws.* $X_n\sim\mathcal N(0,\frac1n)$, or $X_n\sim$ Binomial$(n,\frac\lambda n)$, change distribution with $n$.

In general, nothing ties the $X_n$ together except that they all live on the same probability space $\Omega$ (needed for every mode except convergence in distribution).

## Part B: extra worked examples and problems

### Accept–reject

**B1 (last year's Tutorial 6 Q9).** Target $p(x) = 2x$ on $[0,1]$, proposal $q = \mathcal U(0,1)$. (a) Smallest $c$ with $p\le c\,q$. (b) The algorithm.

*Solution.* (a) $\frac{p(x)}{q(x)} = 2x\le2$, with equality at $x = 1$, so $c = 2$. (b) Generate $Y\sim\mathcal U(0,1)$ and $U\sim\mathcal U(0,1)$. Accept $X = Y$ if $U\le\frac{2Y}{2\cdot1} = Y$; otherwise repeat. Half the rounds are accepted on average ($\frac1c = \frac12$).
*Sanity check.* $P(X\le x) = P(Y\le x\mid U\le Y) = \frac{\int_0^xy\,dy}{\int_0^1y\,dy} = \frac{x^2/2}{1/2} = x^2$, the CDF of $2x$. ✓ (The inverse transform would give $X = \sqrt U$ directly, with no rejections. Use accept–reject when there is no easy inverse.)

**B2 (last year's HW6 Q16).** Target $\mathcal N(0.5, 0.04)$, proposal $\mathcal U(0,1)$. (a) Smallest $c$ with $p(x)\le c\,q(x)$ on $[0,1]$. (b) The algorithm.

*Solution.* (a) $\sigma = 0.2$. The ratio is $p(x)$ itself, largest at the mean: $c = p(0.5) = \frac{1}{0.2\sqrt{2\pi}}\approx1.995$.
(b) Generate $Y, U\sim\mathcal U(0,1)$. Accept $X = Y$ if $U\le\frac{p(Y)}{c} = \exp\Big(-\frac{(Y - 0.5)^2}{0.08}\Big)$.
*Caveat worth writing in an exam.* The normal lives on all of $\mathbb R$ but the proposal only on $[0,1]$, so the support condition fails outside $[0,1]$. The output is the normal **truncated to $[0,1]$**. The lost mass is $P(|Z|>2.5)\approx1.2\%$, so it is a close approximation, not exact.

**B3 (probabilitycourse Ch. 14, Exercise 7): Beta$(2,4)$.** $f(x) = 20x(1-x)^3$ on $(0,1)$, proposal $\mathcal U(0,1)$.

*Solution.* Maximise $f$: $f'(x) = 20(1-x)^2(1 - 4x) = 0$ gives $x = \frac14$, so $c = f(\frac14) = 20\cdot\frac14\cdot\frac{27}{64} = \frac{135}{64}\approx2.11$. Accept $Y$ if
$$U\le\frac{f(Y)}{c} = \frac{256}{27}Y(1-Y)^3 .$$
About $2.11$ rounds per sample. (A simulation of $10^5$ samples gave a mean of $0.333$, the Beta$(2,4)$ mean $\frac{2}{6}$, and $2.11$ rounds per sample.)

**B4 (Ross, *Simulation*): a discrete example.** $X$ takes values $1, \dots, 10$ with probabilities $0.11, 0.12, 0.09, 0.08, 0.12, 0.10, 0.09, 0.09, 0.10, 0.10$. Use the discrete uniform proposal $q_j = \frac1{10}$.

*Solution.* $c = \max_j\frac{p_j}{q_j} = \frac{0.12}{0.1} = 1.2$. Generate $Y = \lfloor10U_1\rfloor + 1$, then accept if $U_2\le\frac{p_Y}{1.2\times0.1} = \frac{p_Y}{0.12}$. On average $1.2$ rounds per sample.

**B5 (probabilitycourse Ch. 14, Exercise 9): the normal from exponentials.** Sample $|Z|$, the half-normal $f(x) = \frac{2}{\sqrt{2\pi}}e^{-x^2/2}$ on $x>0$, with proposal Exp$(1)$, $g(x) = e^{-x}$. Then attach a random sign.

*Solution.* The ratio is $\frac fg = \sqrt{\frac2\pi}\,e^{x - x^2/2}$. The exponent $x - \frac{x^2}2$ is largest at $x = 1$, so
$$c = \sqrt{\tfrac2\pi}\,e^{1/2} = \sqrt{\tfrac{2e}{\pi}}\approx1.32,\qquad \frac{f(Y)}{cg(Y)} = e^{Y - Y^2/2 - 1/2} = e^{-(Y-1)^2/2}.$$
Accept $Y$ if $U\le e^{-(Y-1)^2/2}$. Then output $Z = Y$ or $-Y$ with probability $\frac12$ each (one more uniform). This gives exact $\mathcal N(0,1)$ samples, which the inverse transform cannot do in closed form.
*Tails matter.* The proposal's tails must be at least as heavy as the target's. Here $e^{-x}$ dominates $e^{-x^2/2}$ for large $x$, so the ratio is bounded. The reverse (an exponential target with a half-normal proposal) has $\frac fg\propto e^{-x + x^2/2}\to\infty$, so no $c$ exists.

**B6 (last year's Tutorial 7 Q7; probabilitycourse Ch. 14, Exercise 8): Gamma$(\frac52, 1)$.** $f(x) = \frac{x^{3/2}e^{-x}}{\Gamma(5/2)}$ with $\Gamma(\frac52) = \frac34\sqrt\pi$.

*Solution.* The inverse transform has no closed form, and summing exponentials needs an integer shape. Use an exponential proposal with the **same mean** $\frac52$, that is rate $\frac25$: $g(x) = \frac25e^{-2x/5}$.
$$\frac{f(x)}{g(x)} = \frac{x^{3/2}e^{-x}}{\frac34\sqrt\pi\cdot\frac25e^{-2x/5}} = \frac{10}{3\sqrt\pi}\,x^{3/2}e^{-3x/5}.$$
Maximise $\frac32\ln x - \frac35x$: the derivative $\frac{3}{2x} - \frac35 = 0$ gives $x = \frac52$. So
$$c = \frac{10}{3\sqrt\pi}\Big(\frac52\Big)^{3/2}e^{-3/2}\approx1.66 .$$
Algorithm: $Y = -\frac52\ln U_1$; accept if $U_2\le\dfrac{Y^{3/2}e^{-3Y/5}}{(5/2)^{3/2}e^{-3/2}}$. (A simulation gave mean $2.49$ and variance $2.49$, matching $\alpha = \frac52$, with $1.66$ rounds per sample.)
*Why the rate $\frac25$?* For a Gamma$(\alpha, 1)$ target and an Exp$(\lambda)$ proposal, the ratio is $\propto x^{\alpha-1}e^{-(1-\lambda)x}$, which is bounded only if $\lambda<1$. Minimising the resulting $c$ over $\lambda$ gives $\lambda = \frac1\alpha$, the proposal with the target's mean.

**B7 (probabilitycourse Ch. 14, Exercise 10): a conditional distribution.** Sample $X\sim$ Gamma$(2,1)$ *conditioned on* $X\ge5$. The density is $f(x) = \frac{xe^{-x}}{6e^{-5}}$ for $x\ge5$ (since $P(X\ge5) = 6e^{-5}$).

*Solution.* Naive approach: sample Gamma$(2,1)$ until a value $\ge5$ appears. That succeeds with probability $6e^{-5}\approx0.04$, so about 25 tries each. Better: a shifted exponential proposal with mean 2 above 5, $g(x) = \frac12e^{-(x-5)/2}$ for $x\ge5$, generated as $Y = 5 - 2\ln V$. Then
$$\frac fg = \frac x3e^{-(x-5)/2},$$
which is decreasing for $x\ge5$, so $c = \frac{f(5)}{g(5)} = \frac53$. Accept if $U\le\frac{Y}{5}e^{-(Y-5)/2}$. That is $1.67$ rounds instead of 25. (Simulated mean $6.17$, matching the exact $\frac{37}6$.)

**B8: uniform points in a disc.** Sample a point uniformly in the unit disc using uniforms.

*Solution.* Propose $(Y_1, Y_2)$ uniform on $[-1,1]^2$ (density $\frac14$); target density $\frac1\pi$ on the disc. Then $\frac fg = \frac4\pi$ inside the disc and 0 outside, so $c = \frac4\pi$ and the test $U\le\frac{f}{cg}$ is "accept if $Y_1^2 + Y_2^2\le1$" (probability 1 inside, 0 outside). The acceptance rate is $\frac\pi4\approx0.785$. This is the Monte Carlo $\pi$ estimator of L15 in disguise: the fraction of accepted proposals estimates $\frac\pi4$.

**B9 (last year's HW7 Q8).** Expected number of iterations to generate $k$ samples by rejection?

*Solution.* Each sample needs $N_j\sim$ Geometric$(\frac1c)$ rounds, independently, so $E[N_1 + \dots + N_k] = kc$.

**B10 (concept check, exam style).** Is the following "proof" correct? "Accepted samples have pmf $p$ because $P(\text{accept}\mid y) = \frac{p(y)}{cq(y)}$, which is proportional to $p(y)$."

*Answer.* No. $P(\text{accept}\mid y)$ is proportional to $\frac{p(y)}{q(y)}$, not to $p(y)$. The missing step is multiplying by the proposal probability $q(y)$ (slide 5's joint probability), which turns $\frac{p}{q}$ into $p$. And for a pmf the conclusion also needs the normalisation by $P(\text{accept}) = \frac1c$.

### Pointwise and uniform convergence

**B11.** Decide pointwise and uniform convergence on the given domain.
(a) $f_n(x) = \frac{\sin(nx)}{n}$ on $\mathbb R$. (b) $f_n(x) = \frac{nx}{1 + nx}$ on $[0,\infty)$. (c) $F_n(x) = \mathbf 1\{x\ge\frac1n\}$ on $\mathbb R$, the CDF of the constant random variable $\frac1n$.

*Solution.* (a) $|f_n(x)|\le\frac1n$ for every $x$, so $\sup|f_n|\le\frac1n\to0$: uniform convergence to 0.
(b) $f_n(0) = 0$; for $x>0$, $f_n(x) = \frac{1}{1 + 1/(nx)}\to1$. So the pointwise limit is $\mathbf 1\{x>0\}$. Not uniform: at $x = \frac1n$, $f_n = \frac12$, so $\sup|f_n - f| \ge \frac12$ for every $n$.
(c) For $x\le0$: $F_n(x) = 0$ for all $n$, since $\frac1n>0\ge x$. For $x>0$: $F_n(x) = 1$ once $n\ge\frac1x$. So $F_n\to\mathbf 1\{x>0\}$ pointwise. Not uniform: at $x = \frac{1}{2n}$ the gap is 1.
*Look ahead.* The constants $\frac1n$ obviously converge to the constant $0$, whose CDF is $\mathbf 1\{x\ge0\}$. The pointwise limit $\mathbf 1\{x>0\}$ agrees with it everywhere **except at $x = 0$**, the jump point. This is why L18 defines convergence in distribution by asking for $F_n(x)\to F(x)$ only at points where $F$ is continuous.



# Lecture 17: Sure and almost sure convergence, the SLLN and the sample mean (Deck B, slides 11 to 19)

**Big picture.** L16 ended with the question "what does $X_n\to X$ mean when each $X_n$ is random?". This lecture gives the first two answers, both of which look at the sequence **outcome by outcome**:

- **Sure convergence:** $X_n(\omega)\to X(\omega)$ for *every* outcome $\omega$.
- **Almost sure convergence:** the outcomes where it fails have *probability 0*.

The headline example of almost sure convergence is the **strong law of large numbers** (SLLN), which justifies Monte Carlo (L15) and the use of the sample mean as an estimator. The lecture ends with the main tool for proving almost sure convergence (Borel–Cantelli) and a warning (almost sure convergence does not make the means converge).

## Part A: the slides

### Slide 11/30: Recap

> **On the slide.** Convergence of $X_n\to X$. $X$ could even be a deterministic number. The $X_n$'s could be dependent on each other. Each $X_n$ could have a different law (pmf/pdf).

This repeats the last slide of L16; see the examples there.

### Slide 12/30: Pointwise or sure convergence

> **On the slide.** *$\{X_n, n\ge0\}$ converges to $X$ pointwise or surely if for all $\omega\in\Omega$ we have $\lim_{n\to\infty}X_n(\omega) = X(\omega)$.* Example: $\Omega = \{H, T\}$,
> $$X_n = \begin{cases}\frac1n & \text{if }\omega = H\\ 1 + \frac1n & \text{if } \omega = T\end{cases}\qquad\text{and}\qquad X = \begin{cases}0 & \text{if } \omega = H\\ 1 & \text{if }\omega = T.\end{cases}$$

**The definition is slide 8 of L16, applied on $\Omega$.** A random variable is a function on $\Omega$. Sure convergence is pointwise convergence of the functions $X_n:\Omega\to\mathbb R$ to the function $X:\Omega\to\mathbb R$. Probability plays no role at all.

**The example.** One coin toss decides everything. There are only two outcomes, so check both.

- $\omega = H$: the realized sequence is $1, \frac12, \frac13, \dots\to0 = X(H)$. ✓
- $\omega = T$: the realized sequence is $2, \frac32, \frac43, \dots\to1 = X(T)$. ✓

Every outcome gives a convergent sequence with the right limit, so $X_n\to X$ surely. Here the convergence is even uniform on $\Omega$: $|X_n(\omega) - X(\omega)| = \frac1n$ for both outcomes.

**Note the structure.** $X_n = X + \frac1n$. The randomness is decided once (by the toss), and then the sequence moves deterministically towards $X$. Whether the coin is fair does not matter, which shows that sure convergence ignores probabilities.

### Slide 13/30: Almost sure convergence

> **On the slide.** *$X_n$ converges to $X$ almost surely if $P\big(\omega\in\Omega: \lim_{n\to\infty}X_n(\omega) = X(\omega)\big) = 1$.* The set of outcomes where convergence does not happen has measure 0: $P\{\omega\in\Omega:\lim_n X_n(\omega)\ne X(\omega)\} = 0$. Example: $\Omega = [0,1]$, pick a number uniformly in $[0,1]$. Let $X_n(\omega) = \omega^n$ and $X(\omega) = 0$ for all $\omega$. $X_n(\omega)\to X(\omega)$ for $\omega\in[0,1)$. $X_n(\omega)\not\to X(\omega)$ for $\omega = 1$, and $\mathbb P\{\omega = 1\}$ [$= 0$]. This is almost sure convergence as $\mathbb P\{[0,1)\} = 1$.

(The slide's line "and $\mathbb P\{\omega = 1\}$" is missing "$= 0$".)

**Reading the definition.** Collect all the lucky outcomes into one event,
$$C = \{\omega : X_n(\omega)\to X(\omega)\}.$$
Almost sure convergence says $P(C) = 1$, or equivalently that the unlucky outcomes $C^c$ form an event of probability 0. Unlucky outcomes may exist; they just carry no probability. Notation: $X_n\xrightarrow{a.s.}X$, also called convergence *with probability 1* (w.p.1).

**The example.** This is the function $x^n$ from L16 slide 8, now viewed as a random variable on $\Omega = [0,1]$.

- For $\omega\in[0,1)$, $\omega^n\to0$. These outcomes are lucky.
- For $\omega = 1$, $1^n = 1\not\to0$. This outcome is unlucky.
- So $C = [0,1)$, and with the uniform probability $P(C) = 1 - 0 = 1$.

Hence $X_n\xrightarrow{a.s.}0$, but $X_n$ does **not** converge to 0 surely, because of the single outcome $\omega = 1$.

**Sure versus almost sure.** Sure convergence implies almost sure convergence ($C = \Omega$ has probability 1), and the example shows the converse fails. In probability, almost sure is the natural notion, because changing random variables on an event of probability 0 changes no probability, expectation or distribution. That is why sure convergence is rarely used after this slide.

**A useful equivalent form.** $X_n\xrightarrow{a.s.}X$ means: with probability 1, for every $\epsilon>0$, $|X_n - X|<\epsilon$ for *all large enough* $n$. Equivalently, for each $\epsilon>0$, the event "$|X_n - X|\ge\epsilon$ happens for infinitely many $n$" has probability 0. Slide 18 builds on this form.

### Slide 14/30: Example 2, the strong law of large numbers

> **On the slide.** *Let $\{X_n, n\ge0\}$ be a sequence of i.i.d. random variables with mean $\mu$ and $S_n = \sum_{i=1}^nX_i$. Then $\frac{S_n}{n}\to\mu$ a.s.* Toss a biased coin (probability of heads $\mu$) repeatedly. What is $\omega$ and $\Omega$? Let $X_i$ be the outcome of the $i$-th toss and $S_n$ the number of heads in $n$ tosses. The empirical mean is $\frac{S_n}{n}$.

$$\boxed{X_1, X_2, \dots \text{ i.i.d.},\ E|X_1|<\infty,\ \mu = E[X_1]\quad\Longrightarrow\quad\hat\mu_n = \frac{S_n}{n}\xrightarrow{a.s.}\mu}$$

The precise condition is that the mean exists and is finite, $E|X_1|<\infty$. No variance is needed.

**What is $\omega$ and $\Omega$? (the blue question).** The SLLN is a statement about the whole infinite sequence of tosses, so an outcome must record all of them.

- **An outcome $\omega$** is one infinite sequence of tosses, for example $\omega = (H, T, T, H, H, \dots)$.
- **The sample space** is the set of all such sequences, $\Omega = \{H, T\}^{\mathbb N} = \{(\omega_1, \omega_2, \dots) : \omega_i\in\{H, T\}\}$. This set is uncountable.
- **The random variables** read off coordinates: $X_i(\omega) = 1$ if $\omega_i = H$, else 0. $S_n(\omega)$ is the number of $H$'s among the first $n$ coordinates.

The SLLN then says
$$P\Big(\Big\{\omega : \frac{S_n(\omega)}{n}\to\mu\Big\}\Big) = 1 .$$

**The unlucky outcomes.** $\omega = (H, H, H, \dots)$ has $\frac{S_n}{n} = 1$ for every $n$, so it is unlucky if $\mu<1$. The block sequence from L16 (alternating blocks of doubling length) has no limit at all. There are uncountably many unlucky sequences, and yet their total probability is 0. (Indeed, for $0<\mu<1$ *every* single sequence has probability 0, since $P(\text{first } n \text{ tosses match}) \le \max(\mu, 1-\mu)^n\to0$. "Probability 0" does not mean "impossible".)

**Why the SLLN matters in this course.**

- It is the justification of **Monte Carlo** (L15 slide 17): the i.i.d. values $g(U_i)$ have finite mean $\theta$, so their average converges to $\theta$ with probability 1.
- It makes "probability = long-run frequency" a theorem: with $X_i = \mathbf 1\{A \text{ happens on trial } i\}$, the fraction of trials on which $A$ happens converges to $P(A)$ almost surely.
- It justifies the **sample mean** as an estimator (slide 15).

**When it fails.** Without a finite mean, the SLLN can fail. For i.i.d. Cauchy samples, $\frac{S_n}{n}$ is again standard Cauchy for every $n$ (a known property of the Cauchy distribution), so it never settles down. This is the simulation of L15 Part B, B10.

### Slide 15/30: Detour, the sample mean as an estimator

> **On the slide.** Now that we know $\frac{S_n}{n}\to\mu$, we can use $\hat\mu_n := \frac{S_n}{n}$ as an "estimator" for the mean, especially when the underlying distribution is not known. The estimator $\hat\mu_n$ is a random variable. What is its CDF? What are its mean and variance? $\hat\mu_n$ is an "unbiased estimator" since $E[\hat\mu_n] = \mu$. $\operatorname{Var}(\hat\mu_n) = \frac{\sigma^2}{n}$. We will soon see the CLT, which will tell us the CDF of $\hat\mu_n$ without any information on the law of the $X_i$.

**The estimator is random.** Each data set gives one number $\hat\mu_n(\omega)$; a different data set gives a different number. So it makes sense to ask for its distribution.

**Mean.** By linearity of expectation (no independence needed):
$$E[\hat\mu_n] = \frac1n\sum_{i=1}^nE[X_i] = \frac1n\cdot n\mu = \mu .$$
An estimator whose expected value equals the quantity it estimates is called **unbiased**: it is right on average.

**Variance.** Now use independence (variances of independent variables add; toolkit fact 5) and $\operatorname{Var}(aY) = a^2\operatorname{Var}(Y)$:
$$\operatorname{Var}(\hat\mu_n) = \frac{1}{n^2}\operatorname{Var}\Big(\sum_{i=1}^nX_i\Big) = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n} .$$
So the **standard error** is $\frac{\sigma}{\sqrt n}$. To halve the typical error you need four times as much data.

$$\boxed{E[\hat\mu_n] = \mu,\qquad\operatorname{Var}(\hat\mu_n) = \frac{\sigma^2}{n},\qquad\operatorname{SD}(\hat\mu_n) = \frac{\sigma}{\sqrt n}}$$

**What is its CDF?** Exactly, it depends on the law of the $X_i$, and it is known only in special cases:

| $X_i$ | distribution of $S_n = n\hat\mu_n$ | (from) |
|---|---|---|
| Bernoulli$(p)$ | Binomial$(n, p)$ | L14 slide 6 |
| Poisson$(\lambda)$ | Poisson$(n\lambda)$ | L14 slide 5 |
| Exp$(\lambda)$ | Gamma$(n, \lambda)$ | L14 slide 6 |
| $\mathcal N(\mu, \sigma^2)$ | $\mathcal N(n\mu, n\sigma^2)$ | L14 slide 5 |

The CLT (L18) gives the approximate answer in *every* case: $\hat\mu_n\approx\mathcal N\big(\mu, \frac{\sigma^2}{n}\big)$ for large $n$.

### Slide 16/30: Detour, the incremental formula for the sample mean

> **On the slide.** Given $\hat\mu_n$, suppose you see an additional sample $X_{n+1}$. How will you compute $\hat\mu_{n+1}$? Naive way: $\hat\mu_{n+1} = \frac{\sum_{i=1}^{n+1}X_i}{n+1}$. There is an incremental formula that uses $\hat\mu_n$:
> $$\hat\mu_{n+1} = \hat\mu_n + \frac{1}{n+1}\big[X_{n+1} - \hat\mu_n\big].$$
> Such averaging formulas are used extensively in reinforcement learning.

**Derivation.** Write the new sum in terms of the old mean, $S_{n+1} = S_n + X_{n+1} = n\hat\mu_n + X_{n+1}$:
$$\hat\mu_{n+1} = \frac{n\hat\mu_n + X_{n+1}}{n+1} = \frac{(n+1)\hat\mu_n - \hat\mu_n + X_{n+1}}{n+1} = \hat\mu_n + \frac{1}{n+1}\big(X_{n+1} - \hat\mu_n\big).$$

**Reading it.** new estimate $=$ old estimate $+$ step size $\times$ (new observation $-$ old estimate). The bracket is the "surprise" or error. The estimate moves a fraction $\frac{1}{n+1}$ of the way towards the new data point. As $n$ grows the steps shrink, so the estimate settles down (consistent with the SLLN).

**Why it is useful.** The naive way stores all the data and costs $O(n)$ per update. The incremental way stores two numbers ($\hat\mu_n$ and $n$) and costs $O(1)$ per update. In reinforcement learning, value estimates are updated as $Q\leftarrow Q + \alpha\,(\text{target} - Q)$. With $\alpha = \frac{1}{n+1}$ this is exactly the running mean. With a constant $\alpha$ it becomes an exponentially weighted average, which forgets old data and can track a changing environment.

**Quick example.** Data $4, 8, 6, 10$: $\hat\mu_1 = 4$; $\hat\mu_2 = 4 + \frac12(8 - 4) = 6$; $\hat\mu_3 = 6 + \frac13(6 - 6) = 6$; $\hat\mu_4 = 6 + \frac14(10 - 6) = 7$. Check: $\frac{4 + 8 + 6 + 10}{4} = 7$. ✓

### Slide 17/30: Recap, modes of convergence

> **On the slide.** Sure convergence (box). Almost sure convergence (box). SLLN: $\{X_n\}$ i.i.d. with mean $\mu$ and $S_n = \sum X_i$; then $\hat\mu_n := \frac{S_n}{n}\to\mu$ a.s. The estimator $\hat\mu_n$ has mean $\mu$ and variance $\frac{\sigma^2}{n}$. $\hat\mu_{n+1} = \hat\mu_n + \frac1{n+1}[X_{n+1} - \hat\mu_n]$.

Nothing new; the summary is that sure $\Rightarrow$ almost sure, the SLLN is an almost sure statement, and the sample mean is unbiased with variance $\frac{\sigma^2}n$.

### Slide 18/30: The Borel–Cantelli lemma

> **On the slide.** *Self-study: Theorem 7.5 (probabilitycourse.com). Consider a sequence of random variables $X_1, X_2, \dots$. If for all $\epsilon$ we have $\sum_{n=1}^\infty P(|X_n - X|>\epsilon)<\infty$, then $X_n\to X$ a.s.* This is only a sufficient condition for almost sure convergence! Thm 7.6 (HW) gives necessary and sufficient conditions. Lots of problems in probabilitycourse; practice them!

**Theorem 7.5 in words.** If the probabilities of an $\epsilon$-deviation are *summable*, for every $\epsilon$, the sequence converges almost surely. Summable means they shrink fast enough, for example like $\frac{1}{n^2}$ or $e^{-n}$, but not like $\frac1n$.

$$\boxed{\sum_{n=1}^\infty P(|X_n - X|>\epsilon)<\infty\ \ \text{for every } \epsilon>0\quad\Longrightarrow\quad X_n\xrightarrow{a.s.}X}$$

**Why it is true (the self-study proof).** Fix $\epsilon$ and let $E_n = \{|X_n - X|>\epsilon\}$.

1. *Tail bound.* For any $m$, by the union bound (toolkit fact 8),
$$P\Big(\bigcup_{n\ge m}E_n\Big)\le\sum_{n\ge m}P(E_n)\xrightarrow{m\to\infty}0,$$
because the tail of a convergent series goes to 0.
2. *"Infinitely often" has probability 0.* If $E_n$ happens for infinitely many $n$, then for every $m$ some $E_n$ with $n\ge m$ happens. So $P(E_n \text{ infinitely often})\le P\big(\bigcup_{n\ge m}E_n\big)$ for every $m$, and letting $m\to\infty$ gives 0. This step is the **(first) Borel–Cantelli lemma**: *if $\sum_nP(E_n)<\infty$ then, with probability 1, only finitely many of the $E_n$ happen.*
3. *From one $\epsilon$ to all.* So, with probability 1, $|X_n - X|\le\epsilon$ for all large $n$. Do this for $\epsilon = 1, \frac12, \frac13, \dots$. A countable union of probability-0 events has probability 0, so with probability 1 the statement holds for every $\epsilon = \frac1k$ at once, which is exactly $X_n(\omega)\to X(\omega)$. $\square$

**Only sufficient.** Slide 19's example converges almost surely although $\sum_nP(|X_n|>\epsilon) = \sum\frac1n = \infty$. The condition can fail and the conclusion still hold.

**Theorem 7.6 (the HW): a necessary and sufficient condition.** For $\epsilon>0$ define
$$A_m = \{|X_n - X|<\epsilon\ \text{for all } n\ge m\},$$
the event that from time $m$ on, the sequence stays within $\epsilon$ of $X$. Then
$$\boxed{X_n\xrightarrow{a.s.}X\iff\lim_{m\to\infty}P(A_m) = 1\ \ \text{for every }\epsilon>0}$$

*Proof.* The events grow with $m$: $A_1\subseteq A_2\subseteq\cdots$ (if you stay close from time $m$, you stay close from time $m+1$). Their union $\bigcup_mA_m$ is the event "eventually always within $\epsilon$". By continuity of probability (toolkit fact 8),
$$\lim_{m\to\infty}P(A_m) = P\Big(\bigcup_mA_m\Big) = P(\text{eventually always within }\epsilon).$$
($\Rightarrow$) On the event $C$ where $X_n\to X$, the sequence is eventually within $\epsilon$, so $C\subseteq\bigcup_mA_m$ and the probability is 1.
($\Leftarrow$) If the probability is 1 for each $\epsilon = \frac1k$, intersect these countably many probability-1 events. On the intersection, for every $k$ the sequence is eventually within $\frac1k$, so it converges. $\square$

**A companion fact: the second Borel–Cantelli lemma.** *If the events $E_n$ are **independent** and $\sum_nP(E_n) = \infty$, then with probability 1 infinitely many of them happen.* This is the tool for proving that a sequence does *not* converge almost surely; it is used on slide 20 (L18) and in Part B.

### Slide 19/30: Another example of a.s. convergence

> **On the slide.** Consider a uniform random variable $U$ and define $X_n = n\mathbf 1_{\{U\le\frac1n\}}$: $X_n = n$ when $U\le\frac1n$ and $X_n = 0$ otherwise. Given a realization of $U$, what can you say about the sequence $\{X_n\}$? Once an $X_n$ is zero, all higher-indexed variables are also zero! This happens for all realizations other than $U = 0$. In that case, since $0\le\frac1n$ for all $n$, the $X_n$'s run off to infinity and we don't see convergence to 0. But $P(U = 0) = 0$. Does $E[X_n]\to0$? *Almost sure convergence does not imply that the means converge!*

**The realized sequences.** Fix $U = u$.

- If $u>0$: $X_n = n$ while $n\le\frac1u$, and $X_n = 0$ for every $n>\frac1u$. For example, $u = 0.3$ gives $1, 2, 3, 0, 0, 0, \dots$ So $X_n(u)\to0$.
- If $u = 0$: $X_n = n$ for all $n$, so $X_n\to\infty$.

The only unlucky outcome is $u = 0$, and $P(U = 0) = 0$, so $X_n\xrightarrow{a.s.}0$. (It is not sure convergence, because of $u = 0$.)

**The means.** $E[X_n] = n\cdot P(U\le\frac1n) = n\cdot\frac1n = 1$ for every $n$. So
$$E[X_n] = 1\not\to0 = E[\lim X_n] .$$

**Why the means do not follow.** Each $X_n$ is 0 with probability $1 - \frac1n$ but takes a huge value $n$ with the small probability $\frac1n$. The rare large value keeps the mean at 1 ("mass escaping to infinity"). Almost sure convergence looks at each outcome separately and does not see this, because for each fixed $u>0$ the big values stop after a while. Convergence in mean (L18) is the mode that does control this, and it fails here.

**Connection with slide 18.** $\sum_nP(|X_n|>\epsilon) = \sum_n\frac1n = \infty$ (for $0<\epsilon<1$), so Theorem 7.5 cannot be used, and yet $X_n\to0$ a.s. Theorem 7.6 does work: $A_m = \{X_n = 0 \text{ for all } n\ge m\} = \{U>\frac1m\}$, so $P(A_m) = 1 - \frac1m\to1$. ✓

The same formula with *independent* uniforms $U_n$ (one per $n$) behaves completely differently; that is the next slide, at the start of L18.

## Part B: extra worked examples and problems

**B1 (probabilitycourse 7.2.7, Example 1).** A fair coin is tossed once. $X_n = \frac{n}{n+1}$ if $H$, and $X_n = (-1)^n$ if $T$. Does $X_n$ converge almost surely?

*Solution.* On $H$: $\frac12, \frac23, \frac34, \dots\to1$. On $T$: $-1, 1, -1, \dots$ has no limit. So $P(\lim X_n = 1) = P(H) = \frac12$. The set where the sequence converges has probability $\frac12<1$, so $X_n$ does **not** converge almost surely (to anything).

**B2 (probabilitycourse 7.2.7, Example 2).** $\Omega = [0,1]$ with the uniform probability. $X_n(s) = 1$ if $0\le s<\frac{n+1}{2n}$ and 0 otherwise; $X(s) = 1$ if $0\le s<\frac12$ and 0 otherwise. Show $X_n\xrightarrow{a.s.}X$.

*Solution.* Note $\frac{n+1}{2n} = \frac12 + \frac{1}{2n}$, which decreases to $\frac12$.
- $s<\frac12$: $X_n(s) = 1 = X(s)$ for all $n$. ✓
- $s>\frac12$: $X_n(s) = 0 = X(s)$ as soon as $\frac12 + \frac{1}{2n}\le s$, that is, $n\ge\frac{1}{2s - 1}$. ✓
- $s = \frac12$: $X_n(\frac12) = 1$ for all $n$, but $X(\frac12) = 0$. ✗

The failure set is $\{\frac12\}$, of probability 0, so $X_n\to X$ almost surely.

**B3 (probabilitycourse 7.2.7, Example 3).** $X_n = \pm\frac1n$ with probability $\frac12$ each. Show $X_n\xrightarrow{a.s.}0$.

*Solution.* $|X_n| = \frac1n$ always, so $P(|X_n|>\epsilon) = 0$ once $n\ge\frac1\epsilon$. The series $\sum_nP(|X_n|>\epsilon)$ has at most $\lfloor\frac1\epsilon\rfloor$ non-zero terms, so it is finite, and Theorem 7.5 applies. (Here the convergence is even sure: $|X_n(\omega)|\le\frac1n$ for every $\omega$.)

**B4 (probabilitycourse 7.2.7, Example 4; last year's HW8 Q1(b)).** $X_n$ independent, $X_n\sim$ Bernoulli$(\frac1n)$. Does $X_n\to0$ almost surely?

*Solution.* Theorem 7.5 does not apply: for $0<\epsilon<1$, $\sum_nP(X_n = 1) = \sum_n\frac1n = \infty$. Use Theorem 7.6. For $0<\epsilon<1$, $A_m = \{X_n = 0\ \text{for all } n\ge m\}$. For any $N\ge m$, by independence,
$$P(A_m)\le P(X_m = 0,\dots,X_N = 0) = \frac{m-1}{m}\cdot\frac{m}{m+1}\cdots\frac{N-1}{N} = \frac{m-1}{N}\xrightarrow{N\to\infty}0 .$$
The product telescopes. So $P(A_m) = 0$ for every $m$, and $\lim_mP(A_m) = 0\ne1$: **no** almost sure convergence. With probability 1, the sequence contains infinitely many 1s. (The second Borel–Cantelli lemma gives the same answer in one line: the events $\{X_n = 1\}$ are independent with $\sum\frac1n = \infty$.) Compare slide 19: the same marginal probabilities $\frac1n$, but there the events were nested (all driven by one $U$), and that made the difference.

**B5 (last year's HW8 Q10 and HW7 Q4).** $Y_n\sim$ Bernoulli$(\frac{n}{n+1})$ independent, and $X_{n+1} = Y_1Y_2\cdots Y_n$. Show $X_n\xrightarrow{a.s.}0$ (and hence in probability).

*Solution.* $X_{n+1} = 1$ only if all of $Y_1, \dots, Y_n$ equal 1:
$$P(X_{n+1} = 1) = \prod_{k=1}^n\frac{k}{k+1} = \frac12\cdot\frac23\cdots\frac{n}{n+1} = \frac{1}{n+1}\to0 .$$
The sequence is non-increasing (multiplying by 0 or 1), so once it hits 0 it stays at 0. Therefore $A_m = \{X_n = 0\ \text{for all } n\ge m\} = \{X_m = 0\}$, and $P(A_m) = 1 - \frac1m\to1$. By Theorem 7.6, $X_n\to0$ almost surely. (Equivalently, the only way to avoid convergence is $Y_k = 1$ for every $k$, which has probability $\lim\frac{1}{n+1} = 0$.) Again $\sum_n P(X_n = 1) = \sum\frac1n = \infty$, so Theorem 7.5 is no help.

**B6 (probabilitycourse 7.2.8, Problem 2).** $X_1, X_2, \dots$ i.i.d. $\mathcal U(0,1)$ and $Y_n = \min(X_1, \dots, X_n)$. Show $Y_n\xrightarrow{a.s.}0$.

*Solution.* For $0<\epsilon<1$: $P(Y_n>\epsilon) = P(\text{all } X_i>\epsilon) = (1-\epsilon)^n$. This is a geometric series, $\sum_n(1-\epsilon)^n = \frac{1-\epsilon}{\epsilon}<\infty$, so Theorem 7.5 gives $Y_n\to0$ almost surely. (For $\epsilon\ge1$ the probabilities are 0.)

**B7 (probabilitycourse 7.2.8, Problem 3).** $X_n\sim\mathcal N(0,\frac1n)$. Show $X_n\xrightarrow{a.s.}0$.

*Solution.* $X_n$ has the same law as $\frac{Z}{\sqrt n}$, so $P(|X_n|>\epsilon) = 2\big(1 - \Phi(\epsilon\sqrt n)\big)$. Use the Gaussian tail bound $1 - \Phi(x)\le\frac12e^{-x^2/2}$ for $x\ge0$:
$$\sum_nP(|X_n|>\epsilon)\le\sum_ne^{-\epsilon^2n/2} = \sum_n\big(e^{-\epsilon^2/2}\big)^n<\infty,$$
a geometric series. Theorem 7.5 gives almost sure convergence. Note that no independence between the $X_n$ was needed; Theorem 7.5 never needs it.

**B8 (probabilitycourse 7.2.8, Problem 4).** On $\Omega = [0,1]$ with uniform probability, $X_n(s) = \frac{n}{n+1}s + (1-s)^n$ and $X(s) = s$. Show $X_n\xrightarrow{a.s.}X$.

*Solution.* For $0<s\le1$: $\frac{n}{n+1}s\to s$ and $(1-s)^n\to0$, so $X_n(s)\to s$. At $s = 0$: $X_n(0) = 0 + 1 = 1\to1\ne0 = X(0)$. The failure set $\{0\}$ has probability 0.

**B9 (Bertsekas Problem 13; last year's Tutorial 8 Q7).** (a) If $X_n\to a$ and $Y_n\to b$ almost surely, show $X_n + Y_n\to a + b$ almost surely. (b) Find $\lim_{n\to\infty}\frac{\sum_{i=1}^nX_i^2}{\sum_{i=1}^nX_i}$ for i.i.d. $X_i\sim\mathcal U[0,1]$.

*Solution.* (a) Let $A$ and $B$ be the events where $X_n\not\to a$ and $Y_n\not\to b$. Both have probability 0. Outside $A\cup B$ both sequences converge, so the sum converges to $a + b$. The failure set of the sum is inside $A\cup B$, and $P(A\cup B)\le P(A) + P(B) = 0$. The same argument works for products and for ratios (when $b\ne0$), or for any continuous function of the two limits.
(b) Divide top and bottom by $n$. By the SLLN, $\frac1n\sum X_i^2\to E[X^2] = \frac13$ and $\frac1n\sum X_i\to E[X] = \frac12$, almost surely. By (a) applied to the ratio,
$$\frac{\sum X_i^2}{\sum X_i}\xrightarrow{a.s.}\frac{1/3}{1/2} = \frac23 .$$

**B10 (Bertsekas Problem 14).** $X_i$ i.i.d. and $Y_i$ i.i.d., with finite means and $E[Y]\ne0$. Does $Z_n = \frac{X_1 + \dots + X_n}{Y_1 + \dots + Y_n}$ converge almost surely?

*Solution.* Yes: $Z_n = \frac{(X_1 + \dots + X_n)/n}{(Y_1 + \dots + Y_n)/n}\to\frac{E[X]}{E[Y]}$ almost surely, by the SLLN on the top and the bottom and B9(a). (No independence between the two sequences is needed.)

**B11 (exam-style contrast with slide 19).** Let $U_1, U_2, \dots$ be **independent** uniforms and $X_n = n^2\mathbf 1\{U_n\le\frac1{n^2}\}$. Does $X_n\to0$ almost surely? What is $E[X_n]$?

*Solution.* $P(|X_n|>\epsilon) = \frac1{n^2}$ for $0<\epsilon<1$, and $\sum\frac1{n^2} = \frac{\pi^2}6<\infty$. By Theorem 7.5, $X_n\to0$ almost surely, even though the $U_n$ are independent. Yet $E[X_n] = n^2\cdot\frac1{n^2} = 1$ for every $n$. With $\frac1n$ instead of $\frac1{n^2}$ (slide 20 of L18), the sum diverges and, by the second Borel–Cantelli lemma, almost sure convergence fails.

**B12 (Bertsekas Problems 16 and 18, optional): the SLLN with a finite fourth moment.** This is the standard short proof, assuming $E[X_i^4]<\infty$ and (after subtracting the mean) $E[X_i] = 0$.

1. *A criterion (Problem 16).* If $Y_n\ge0$ and $\sum_nE[Y_n]<\infty$, then $Y_n\to0$ almost surely. Reason: $E\big[\sum_nY_n\big] = \sum_nE[Y_n]<\infty$, so $\sum_nY_n<\infty$ with probability 1, and the terms of a convergent series tend to 0.
2. *The fourth moment of the sum.* Expand $E[S_n^4] = \sum_{i,j,k,l}E[X_iX_jX_kX_l]$. Any term with an index that appears exactly once vanishes, because $E[X_i] = 0$ and independence lets you factor it out. What is left: $n$ terms $E[X_i^4]$ and $3n(n-1)$ terms $E[X_i^2X_j^2]$ with $i\ne j$. So $E[S_n^4]\le Cn^2$ for a constant $C$ (Bertsekas gets $C = 3E[X^4]$).
3. *Apply the criterion* to $Y_n = \big(\frac{S_n}{n}\big)^4$: $\sum_nE[Y_n]\le\sum_n\frac{Cn^2}{n^4} = C\sum_n\frac1{n^2}<\infty$. So $\big(\frac{S_n}n\big)^4\to0$, hence $\frac{S_n}{n}\to0$, almost surely. $\square$

The general SLLN (finite mean only) needs a harder proof, which is beyond the course.

**B13 (concept check).** True or false? (a) If $X_n\to X$ surely then $X_n\to X$ almost surely. (b) If $\sum_nP(|X_n|>\epsilon) = \infty$ for some $\epsilon$, then $X_n\not\to0$ almost surely. (c) If $X_n\xrightarrow{a.s.}X$ then $E[X_n]\to E[X]$.

*Answers.* (a) True ($C = \Omega$). (b) False in general: slide 19 and B5 are counterexamples; it becomes true when the events $\{|X_n|>\epsilon\}$ are independent (second Borel–Cantelli). (c) False: slide 19.



# Lecture 18: Convergence in probability, in mean and in distribution; the central limit theorem (Deck B, slides 20 to 30)

**Big picture.** L17 judged convergence outcome by outcome. This lecture introduces three notions that only look at **probabilities or averages at each fixed $n$**:

- **In probability:** big deviations become *improbable*.
- **In $r$-th mean:** the *average* size of the deviation goes to 0.
- **In distribution:** only the *CDFs* converge; the values themselves need not get close.

It then fits all five modes into one diagram and ends with the most important convergence-in-distribution result of all, the **central limit theorem** (CLT), and its practical use, the normal approximation.

## Part A: the slides

### Slide 20/30: Towards convergence in probability

> **On the slide.** Now define $X_n = n\mathbf 1_{\{U_n\le\frac1n\}}$ where the $\{U_n\}$ are i.i.d. uniform. $X_n = n$ when $U_n\le\frac1n$ and $X_n = 0$ otherwise. What can you say about $\{X_n\}$? Is it true that once an $X_n$ is zero, all higher-indexed variables are also zero? No! On every run of the experiment (every sample path), we will have a sequence of zero and non-zero values, where the non-zero values become rarer and rarer but keep happening once in a while. On no sample path would you see convergence to zero, but the occurrence of non-zero values becomes rare. We now characterise this notion of convergence.

**Compare with slide 19 (L17).** The only change is $U\to U_n$: a fresh, independent uniform for each $n$. Each $X_n$ has exactly the same distribution as before ($n$ with probability $\frac1n$, else 0), but the *joint* behaviour is completely different.

| | Slide 19: one $U$ | Slide 20: independent $U_n$ |
|---|---|---|
| A typical sample path | $1, 2, 3, 0, 0, 0, 0, \dots$ | $1, 0, 0, 4, 0, 0, \dots, 0, 37, 0, \dots, 0, 912, 0, \dots$ |
| Once 0, always 0? | yes (for $u>0$) | no |
| Almost sure convergence to 0? | yes | **no** |
| Each $X_n$'s distribution | $n$ w.p. $\frac1n$ | the same |

**Why the non-zero values never stop (making the slide's claim precise).** The events $E_n = \{U_n\le\frac1n\}$ are independent, and $\sum_nP(E_n) = \sum_n\frac1n = \infty$. By the **second Borel–Cantelli lemma** (L17, slide 18), with probability 1 infinitely many of them happen. So with probability 1, $X_n = n$ for infinitely many $n$, and the sample path does not converge to 0; it is in fact unbounded. ("On no sample path" means "on a set of sample paths of probability 1".)

**But they do become rare.** The expected number of non-zero values among $n = 1001, \dots, 10^6$ is $\sum_{n=1001}^{10^6}\frac1n\approx\ln1000\approx6.9$. Among a million terms, only about 7 are non-zero. For any single large $n$, $X_n$ is almost certainly 0. That is the property the next slide names.

### Slide 21/30: Convergence in probability

> **On the slide.** *$X_n$ converges to $X$ in probability if $\lim_{n\to\infty}P(|X_n - X|>\epsilon) = 0$ for all $\epsilon>0$.* How would you compute $P(|X_n - X|>\epsilon)$ when $X_n, X$ are continuous or discrete? Example: $X_n = n$ with probability $\frac1n$ and $X_n = 0$ otherwise. $P(|X_n - X|>\epsilon) = P(X_n>\epsilon) = \frac1n$ when $n>\epsilon$. When $n<\epsilon$, $P(|X_n - X|>\epsilon) = 0$. Once $n>\epsilon$, $\lim_{n\to\infty}P(X_n>\epsilon) = \lim\frac1n = 0$. $X_n$ converges to 0 in probability, but not almost surely. **a.s. convergence implies convergence in probability.**

$$\boxed{X_n\xrightarrow{p}X\iff\text{for every }\epsilon>0:\ \lim_{n\to\infty}P(|X_n - X|>\epsilon) = 0}$$

The title's "w.h.p." means *with high probability*: for large $n$, $X_n$ is within $\epsilon$ of $X$ with probability close to 1.

**How to compute $P(|X_n - X|>\epsilon)$ (the red question).**

- *$X$ a constant $c$ (the usual case).* Only the distribution of $X_n$ is needed:
$$P(|X_n - c|>\epsilon) = P(X_n<c-\epsilon) + P(X_n>c+\epsilon),$$
which is a sum of pmf values (discrete) or an integral of the pdf outside $[c-\epsilon, c+\epsilon]$ (continuous).
- *$X$ random.* You need the distribution of the difference $D_n = X_n - X$, and for that the **joint** distribution of $X_n$ and $X$. A common case is $X_n = X + Y_n$, where $D_n = Y_n$.
- *When exact computation is hard*, bound the probability instead with Markov's or Chebyshev's inequality (see the box after slide 22).

**The slide's example.** With $X = 0$, $|X_n - 0| = X_n$, which is either 0 or $n$. For $n>\epsilon$, $P(X_n>\epsilon) = P(X_n = n) = \frac1n\to0$. So $X_n\xrightarrow{p}0$. This works for **both** slide 19's and slide 20's sequences, since convergence in probability uses only the distribution of $X_n - X$ for each $n$ separately. It cannot tell the two sequences apart; almost sure convergence can. That is exactly why "in probability" is a weaker requirement than "almost surely".

**a.s. $\Rightarrow$ in probability (proof).** Fix $\epsilon$ and let $A_m = \{|X_n - X|<\epsilon\ \text{for all}\ n\ge m\}$ as in Theorem 7.6. If $X_n\xrightarrow{a.s.}X$, then $P(A_m)\to1$ (Theorem 7.6). Since $A_m\subseteq\{|X_m - X|<\epsilon\}$,
$$P(|X_m - X|<\epsilon)\ge P(A_m)\to1 .$$
So $P(|X_m - X|\ge\epsilon)\to0$. $\square$ (Bertsekas Problem 15.) Slide 20's sequence shows that the converse is false.

### Slide 22/30: Convergence in $r$-th mean

> **On the slide.** *$X_n$ converges to $X$ in $r$-th mean if $\lim_{n\to\infty}E[|X_n - X|^r] = 0$.* How will you compute $E[|X_n - X|^r]$? When $r = 2$ it is convergence in the mean-squared sense; in addition, if $X = 0$, it implies that the second moments converge to 0. In the convergence in probability example, do we have convergence in mean or mean square? **Convergence in $r$-th mean implies convergence in probability.**

$$\boxed{X_n\xrightarrow{L^r}X\iff\lim_{n\to\infty}E\big[|X_n - X|^r\big] = 0}\qquad(r\ge1)$$

$r = 1$ is *convergence in mean*, and $r = 2$ is *mean-square convergence*, written $X_n\xrightarrow{m.s.}X$.

**How to compute $E[|X_n - X|^r]$.** It is LOTUS applied to the difference: $E[|D_n|^r] = \sum|d|^rp_{D_n}(d)$ or $\int|d|^rf_{D_n}(d)\,dd$, with $D_n = X_n - X$. As before, for a constant $X = c$ you only need the law of $X_n$. For mean square and a constant, the **bias–variance decomposition** does it with no integrals:
$$\boxed{E\big[(X_n - c)^2\big] = \operatorname{Var}(X_n) + \big(E[X_n] - c\big)^2}$$
(Expand $X_n - c = (X_n - E[X_n]) + (E[X_n] - c)$; the cross term has mean 0.) So **$X_n\xrightarrow{m.s.}c$ exactly when $E[X_n]\to c$ and $\operatorname{Var}(X_n)\to0$.** This is the quickest test in practice.

**The slide's question: does the example converge in mean?** No. $E|X_n - 0| = n\cdot\frac1n = 1$ for every $n$, which does not go to 0. In mean square it is worse: $E[X_n^2] = n^2\cdot\frac1n = n\to\infty$. So the example converges in probability but **not** in mean or mean square. (Same diagnosis as slide 19: a rare but huge value.)

**$L^r\Rightarrow$ in probability (the red bullet).** By Markov's inequality (box below) applied to the non-negative $|X_n - X|^r$:
$$P(|X_n - X|\ge\epsilon) = P\big(|X_n - X|^r\ge\epsilon^r\big)\le\frac{E|X_n - X|^r}{\epsilon^r}\to0 .\qquad\square$$
(probabilitycourse Theorem 7.4; last year's HW8 Q7 and Tutorial 7 Q9.) Also, higher means are stronger: if $s\ge r\ge1$, $L^s$ convergence implies $L^r$ convergence (probabilitycourse Theorem 7.3). In particular, mean square implies convergence in mean.

**The sample mean converges in mean square.** $E[(\hat\mu_n - \mu)^2] = \operatorname{Var}(\hat\mu_n) = \frac{\sigma^2}{n}\to0$ (L17 slide 15). So $\hat\mu_n\xrightarrow{m.s.}\mu$, and therefore $\hat\mu_n\xrightarrow{p}\mu$. That last statement is the **weak law of large numbers**, next.

### Toolkit box (Bertsekas 5.1 and 5.2): Markov, Chebyshev and the weak law

These inequalities are not on this year's slides, but they are the standard way to prove convergence in probability, and last year's Tutorial 7 Q8 listed them as tools to "use directly".

**Markov's inequality.** If $X\ge0$ and $a>0$,
$$\boxed{P(X\ge a)\le\frac{E[X]}{a}}$$
*Proof.* $a\,\mathbf 1\{X\ge a\}\le X$ always (if $X\ge a$ the left side is $a\le X$; otherwise it is $0\le X$). Take expectations: $a\,P(X\ge a)\le E[X]$. $\square$

**Chebyshev's inequality.** If $X$ has mean $\mu$ and variance $\sigma^2$, then for $c>0$,
$$\boxed{P(|X - \mu|\ge c)\le\frac{\sigma^2}{c^2}}$$
*Proof.* Apply Markov to the non-negative $(X - \mu)^2$ with $a = c^2$: $P\big((X-\mu)^2\ge c^2\big)\le\frac{E[(X-\mu)^2]}{c^2}$. (This is last year's Tutorial 7 Q8(a).) $\square$

*How good are they? (Bertsekas Ex. 5.1, 5.2.)* For $X\sim\mathcal U[0,4]$: Markov gives $P(X\ge3)\le\frac23$ (exact: $\frac14$); Chebyshev gives $P(|X-2|\ge1)\le\frac{4/3}{1} = \frac43$, which says nothing (exact: $\frac12$). For $X\sim$ Exp$(1)$: Chebyshev gives $P(X\ge c)\le\frac{1}{(c-1)^2}$, while the truth is $e^{-c}$. They are crude, but they need only a mean (and a variance), which is what makes them useful in proofs.

**The weak law of large numbers (WLLN).** For i.i.d. $X_i$ with mean $\mu$ and variance $\sigma^2$, Chebyshev applied to $\hat\mu_n$ gives
$$\boxed{P(|\hat\mu_n - \mu|\ge\epsilon)\le\frac{\sigma^2}{n\epsilon^2}\xrightarrow{n\to\infty}0,\qquad\text{so}\qquad\hat\mu_n\xrightarrow{p}\mu}$$
It is "weak" because it gives convergence in probability, which the SLLN (almost sure) implies. Its advantage is a one-line proof plus an explicit bound for finite $n$.

*Example (Bertsekas 5.5, polling).* A fraction $p$ of voters support a candidate; poll $n$ at random, and let $M_n$ be the sample fraction. Each reply is Bernoulli$(p)$, with variance $p(1-p)\le\frac14$. Chebyshev gives $P(|M_n - p|\ge\epsilon)\le\frac{1}{4n\epsilon^2}$. For 95% confidence of accuracy $\pm0.01$, you need $\frac{1}{4n(0.01)^2}\le0.05$, so $n\ge50{,}000$. (The CLT, at the end of this lecture, shows that 9604 is enough.)

### Slide 23/30: Weak convergence (in distribution)

> **On the slide.** *$X_n$ converges to $X$ in distribution if $\lim_{n\to\infty}F_{X_n}(x) = F_X(x)$ for all continuity points of $F_X(\cdot)$.* a.s. convergence and convergence in probability imply convergence in distribution. Example: $X_n$ is exponential with parameter $\lambda n$. Then $F_{X_n}(x) = 1 - e^{-n\lambda x}$ and $F_X(x) = 1$ for all $x$ [$\ge0$]. Note $x = 0$ is a point of discontinuity, as $F_X(0) = 1$ and $F_{X_n}(0) = 0$. **HW EX2:** $X_n$ are [independent] Binomial$(n,\frac\lambda n)$. It converges in distribution to Poisson$(\lambda)$.

$$\boxed{X_n\xrightarrow{d}X\iff F_{X_n}(x)\to F_X(x)\ \text{at every } x \text{ where } F_X \text{ is continuous}}$$

(Two small slips on the slide: "$F_X(x) = 1$ for all $x$" means for all $x\ge0$, since $F_X(x) = 0$ for $x<0$; and the HW's "i.i.d." cannot be meant literally, since the $X_n$ have different distributions. It just means $X_n\sim$ Binomial$(n, \frac\lambda n)$.)

**What it says, and what it does not.** Only the CDFs are compared. The values $X_n(\omega)$ never need to be close to $X(\omega)$; the variables need not even be defined on the same $\Omega$. For example, if $X\sim\mathcal N(0,1)$ and $X_n = -X$ for all $n$, then $F_{X_n} = F_X$ (by symmetry), so $X_n\xrightarrow{d}X$, yet $|X_n - X| = 2|X|$ never shrinks. That is why this mode is called **weak** convergence.

**The slide's example: Exp$(\lambda n)$.** As $n$ grows, the mean $\frac{1}{\lambda n}$ shrinks to 0, so we expect $X_n\to0$. The CDF of the constant $X = 0$ is the step $F_X(x) = \mathbf 1\{x\ge0\}$.

- $x<0$: $F_{X_n}(x) = 0 = F_X(x)$. ✓
- $x>0$: $F_{X_n}(x) = 1 - e^{-n\lambda x}\to1 = F_X(x)$. ✓
- $x = 0$: $F_{X_n}(0) = 0$ for every $n$, but $F_X(0) = 1$. ✗

So the CDFs converge everywhere **except at the jump of $F_X$**. If the definition demanded convergence at every $x$, this obvious example would fail, which is why only continuity points are required. (This is the L16 example $1 - e^{-nx}$, and its non-uniform convergence near 0.)

**a.s. and in probability imply in distribution.** The slide states it; here is the idea for "in probability $\Rightarrow$ in distribution". If $X_n\le x$ then either $X\le x+\epsilon$ or $|X_n - X|>\epsilon$. So $F_{X_n}(x)\le F_X(x+\epsilon) + P(|X_n - X|>\epsilon)$, and similarly $F_X(x-\epsilon) - P(|X_n - X|>\epsilon)\le F_{X_n}(x)$. Let $n\to\infty$, then $\epsilon\to0$; at a continuity point both bounds tend to $F_X(x)$. $\square$

**The converse holds when the limit is a constant (last year's Tutorial 8 Q3).** If $X_n\xrightarrow{d}c$, then $X_n\xrightarrow{p}c$. *Proof:* $c-\epsilon$ and $c+\epsilon$ are continuity points of the step $F_X = \mathbf 1\{x\ge c\}$, so
$$P(|X_n - c|>\epsilon)\le F_{X_n}(c-\epsilon) + 1 - F_{X_n}(c+\epsilon)\to0 + 1 - 1 = 0 .\qquad\square$$

**For integer-valued variables, compare pmfs (probabilitycourse Theorem 7.1).** If all $X_n$ and $X$ take values in $\{0, 1, 2, \dots\}$, then $X_n\xrightarrow{d}X$ if and only if $P(X_n = k)\to P(X = k)$ for every $k$.

**For MGFs (the continuity theorem, used without proof by Bertsekas).** If $M_{X_n}(s)\to M_X(s)$ for all $s$ in an interval around 0, then $X_n\xrightarrow{d}X$. This is how the CLT is proved.

**HW EX2: Binomial$(n,\frac\lambda n)\xrightarrow{d}$ Poisson$(\lambda)$, two proofs.**

*Proof 1 (pmfs, probabilitycourse 7.2.4 Example 3).* Fix $k$. Then
$$P(X_n = k) = \binom nk\Big(\frac\lambda n\Big)^k\Big(1 - \frac\lambda n\Big)^{n-k} = \frac{\lambda^k}{k!}\cdot\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\to1}\cdot\underbrace{\Big(1 - \frac\lambda n\Big)^n}_{\to e^{-\lambda}}\cdot\underbrace{\Big(1 - \frac\lambda n\Big)^{-k}}_{\to1}\ \longrightarrow\ \frac{e^{-\lambda}\lambda^k}{k!}.$$
By Theorem 7.1, $X_n\xrightarrow{d}$ Poisson$(\lambda)$.

*Proof 2 (MGFs).* Using toolkit fact 9,
$$M_{X_n}(t) = \Big(1 - \frac\lambda n + \frac\lambda ne^t\Big)^n = \Big(1 + \frac{\lambda(e^t - 1)}{n}\Big)^n\longrightarrow e^{\lambda(e^t-1)},$$
the Poisson$(\lambda)$ MGF.

*Meaning.* Counting rare events among many independent trials gives a Poisson count. For example, typos on a page, calls in a minute, or decays per second.

### Slide 24/30: Summary of the five modes

> **On the slide.** A chart (from Wikipedia): pointwise convergence, $\lim X_n(\omega) = X(\omega)$ for every $\omega$; almost sure convergence, $\lim X_n(\omega) = X(\omega)$ almost surely; convergence in probability, $\lim P(|X_n - X|>\epsilon) = 0$ for any $\epsilon>0$; mean-square convergence, $\lim E[(X_n - X)^2] = 0$; convergence in distribution, $\lim F_n(x) = F(x)$ for any continuity point $x$.

| Mode | Definition | What it looks at | Quick test |
|---|---|---|---|
| Sure | $X_n(\omega)\to X(\omega)$ for all $\omega$ | every sample path | rarely used |
| Almost sure | $P(X_n\to X) = 1$ | sample paths, up to probability 0 | Borel–Cantelli: $\sum_nP(\vert X_n - X\vert>\epsilon)<\infty$; or Theorem 7.6; or monotone sequences |
| In probability | $P(\vert X_n - X\vert>\epsilon)\to0$ | one $n$ at a time | compute it, or Markov/Chebyshev |
| Mean square | $E[(X_n - X)^2]\to0$ | one $n$ at a time, on average | $E[X_n]\to c$ and $\operatorname{Var}(X_n)\to0$ (for a constant $c$) |
| In distribution | $F_{X_n}(x)\to F_X(x)$ at continuity points | only the marginal CDFs | CDFs, pmfs (integer case), or MGFs |

### Slide 25/30: Relations between the modes (no proofs)

> **On the slide.** Almost sure convergence $\Rightarrow$ convergence in probability $\Leftarrow$ mean-square convergence; convergence in probability $\Rightarrow$ convergence in distribution. (Link: Wikipedia, proofs of convergence of random variables.)

$$\begin{array}{ccccc}
\text{sure}\Rightarrow\text{almost sure} & & & & \text{mean square}\ (L^2)\Rightarrow L^1\\
 & \searrow & & \swarrow & \\
 & & \text{in probability} & & \\
 & & \Downarrow & & \\
 & & \text{in distribution} & & 
\end{array}$$

Proofs of every arrow are above: a.s. $\Rightarrow$ p (slide 21), $L^r\Rightarrow$ p (slide 22), p $\Rightarrow$ d (slide 23). Here are counterexamples for every arrow that is **missing**. They are worth memorising, because exam questions of the form "does it converge in mode X? in mode Y?" are built from them.

| Claim | False because of | Details |
|---|---|---|
| p $\Rightarrow$ a.s. | slide 20: $X_n = n\mathbf 1\{U_n\le\frac1n\}$, independent $U_n$ | $\sum\frac1n = \infty$ and independence: infinitely many non-zeros |
| p $\Rightarrow$ m.s. (or $L^1$) | slide 21: $X_n = n$ w.p. $\frac1n$ | $E\vert X_n\vert = 1$ |
| a.s. $\Rightarrow$ m.s. (or $L^1$) | slide 19: $X_n = n\mathbf 1\{U\le\frac1n\}$, one $U$ | converges a.s., but $E[X_n] = 1$ |
| m.s. $\Rightarrow$ a.s. | independent $X_n\sim$ Bernoulli$(\frac1n)$ | $E[X_n^2] = \frac1n\to0$, but infinitely many 1s (L17 B4) |
| d $\Rightarrow$ p | $X\sim\mathcal N(0,1)$, $X_n = -X$; or i.i.d. copies of $X$ | same CDFs, values never close |

And the one partial converse: **d $\Rightarrow$ p when the limit is a constant.**

### Slide 26/30: Towards the CLT

> **On the slide.** Recall $\hat\mu_n = \frac{S_n}{n}$ where $S_n = \sum_{i=1}^nX_i$, and $\{X_i\}$ is i.i.d. with mean $\mu$ and variance $\sigma^2$. $E[\hat\mu_n] = \mu$ and $\operatorname{var}(\hat\mu_n) = \frac{\sigma^2}{n}$. Now consider $Y_n = \frac{\hat\mu_n - \mu}{\sigma/\sqrt n}$ (centering and scaling). What are the mean and variance of $Y_n$? $E[Y_n] = 0$ and $\operatorname{Var}(Y_n) = 1$. What is $F_{Y_n}(\cdot)$? What is $\lim_{n\to\infty}F_{Y_n}(\cdot)$? Answer: $\Phi(\cdot) = F_{\mathcal N(0,1)}(\cdot)$. In other words, $Y_n$ converges to $Y = \mathcal N(0,1)$ in distribution.

**Standardising.** Subtract the mean and divide by the standard deviation:
$$Y_n = \frac{\hat\mu_n - \mu}{\sigma/\sqrt n} = \frac{S_n - n\mu}{\sigma\sqrt n},\qquad E[Y_n] = \frac{E[\hat\mu_n] - \mu}{\sigma/\sqrt n} = 0,\qquad\operatorname{Var}(Y_n) = \frac{\operatorname{Var}(\hat\mu_n)}{\sigma^2/n} = 1 .$$
(The second form multiplies the top and bottom by $n$.)

**Why divide by exactly $\frac{\sigma}{\sqrt n}$?** Look at $S_n - n\mu$, scaled by different powers of $n$:

- Divided by $n$: $\frac{S_n - n\mu}{n} = \hat\mu_n - \mu\to0$ (LLN). Too much shrinking; the limit is the boring constant 0.
- Not divided at all: $\operatorname{Var}(S_n - n\mu) = n\sigma^2\to\infty$. It spreads out without limit.
- Divided by $\sqrt n$: the variance stays at $\sigma^2$, and the shape settles down.

$\sqrt n$ is the only scaling that "zooms in" on the fluctuations of $\hat\mu_n$ around $\mu$ at the rate that keeps them visible. The remarkable fact, which the next slide states, is that the limiting shape is always the same.

### Slides 27/30 and 28/30: The central limit theorem

> **On the slide (27).** *Let $\{X_n, n\ge0\}$ be i.i.d. random variables, each with mean $\mu$ and variance $0<\sigma^2<\infty$. Let $\hat\mu_n = \frac{\sum_{i=1}^nX_i}{n}$ and $Y_n = \frac{\hat\mu_n - \mu}{\sigma/\sqrt n}$. Then $Y_n$ converges to $\mathcal N(0,1)$ in distribution.* The $X_i$ could be ANY discrete or continuous random variables with finite mean and variance. What is the consequence when $E[X_i] = 0$ and $\operatorname{Var}(X_i) = 1$? Then $Y_n = \frac{S_n}{\sqrt n}$, and it converges in distribution to $\mathcal N(0,1)$. $\frac{S_n}{n}$ converges almost surely to 0, but $\frac{S_n}{\sqrt n}$ converges to a random variable $\mathcal N(0,1)$.
>
> **On the slide (28).** (Same box.) The CLT gives a way to find the approximate distribution of $\hat\mu_n$. For large enough $n$, we can use the approximation $Y_n\sim\mathcal N(0,1)$. Since Gaussianity is preserved under affine transformations, $\hat\mu_n\sim\mathcal N(\mu,\frac{\sigma^2}{n})$ [approximately].

$$\boxed{\frac{S_n - n\mu}{\sigma\sqrt n}\xrightarrow{d}\mathcal N(0,1),\quad\text{that is,}\quad\lim_{n\to\infty}P\Big(\frac{S_n - n\mu}{\sigma\sqrt n}\le z\Big) = \Phi(z)\ \text{for every } z}$$

(Every $z$ is a continuity point of $\Phi$, so here the convergence holds at all $z$.)

**What is remarkable.** The $X_i$ can have *any* distribution with finite variance: Bernoulli, uniform, exponential, a die, a mixture. The *shape* of their distribution is forgotten in the limit. Only $\mu$ and $\sigma^2$ survive.

**The blue question: $E[X_i] = 0$, $\operatorname{Var}(X_i) = 1$.** Then $Y_n = \frac{S_n}{\sqrt n}$. Compare:
$$\frac{S_n}{n}\xrightarrow{a.s.}0\ \ (\text{SLLN}),\qquad\frac{S_n}{\sqrt n}\xrightarrow{d}\mathcal N(0,1)\ \ (\text{CLT}).$$
Dividing by $n$ kills the randomness; dividing by $\sqrt n$ keeps exactly one unit of it. (By the way, $\frac{S_n}{\sqrt n}$ does *not* converge in probability to anything; only its distribution settles down.)

**Slide 28's practical reading.** For large $n$, treat $Y_n$ as $\mathcal N(0,1)$. Undoing the standardisation (an affine map preserves normality):
$$\boxed{\hat\mu_n\approx\mathcal N\Big(\mu,\frac{\sigma^2}{n}\Big),\qquad S_n\approx\mathcal N(n\mu, n\sigma^2)}$$
This answers L17 slide 15's question "what is the CDF of $\hat\mu_n$?", without knowing the law of the $X_i$.

**How large is "large enough"?** A common rule of thumb is $n\ge30$. It is better when the $X_i$ are symmetric (a sum of 12 uniforms is already very close to normal) and worse when they are skewed (Bernoulli with $p$ near 0 or 1, exponential) or heavy-tailed.

**Proof sketch via MGFs (Bertsekas Problem 12; L14 Part B, B13; last year's Tutorial 6 Q4).** Assume the MGF exists near 0. Let $Z_i = \frac{X_i - \mu}{\sigma}$, so $E[Z_i] = 0$, $E[Z_i^2] = 1$, and $Y_n = \frac{1}{\sqrt n}\sum_{i=1}^nZ_i$.

1. *Independence turns the sum into a power* (L14 slide 6 and the linear rule):
$$M_{Y_n}(s) = E\Big[e^{\frac{s}{\sqrt n}\sum Z_i}\Big] = \Big[M_Z\Big(\frac{s}{\sqrt n}\Big)\Big]^n .$$
2. *Taylor expand near 0*, using $M_Z(0) = 1$, $M_Z'(0) = E[Z] = 0$, $M_Z''(0) = E[Z^2] = 1$:
$$M_Z(u) = 1 + \frac{u^2}{2} + o(u^2)\quad\Longrightarrow\quad M_Z\Big(\frac{s}{\sqrt n}\Big) = 1 + \frac{s^2}{2n} + o\Big(\frac1n\Big).$$
3. *Take the limit* with $(1 + \frac an + o(\frac1n))^n\to e^a$:
$$M_{Y_n}(s)\to e^{s^2/2},$$
which is the MGF of $\mathcal N(0,1)$.
4. *Conclude* with the continuity theorem (slide 23): MGFs converging to the MGF of $\mathcal N(0,1)$ gives $Y_n\xrightarrow{d}\mathcal N(0,1)$. $\square$

(The same computation with $\frac sn$ in place of $\frac{s}{\sqrt n}$ gives $M_{\hat\mu_n}(s)\to e^{s\mu}$, the MGF of the constant $\mu$: the WLLN, probabilitycourse 7.1.3 Problem 5. The general CLT, without assuming an MGF, uses characteristic functions in the same way.)

### Slide 29/30: Example from probabilitycourse.com

> **On the slide.** Assumptions: $X_1, X_2, \dots$ are i.i.d. Bernoulli$(p)$ and $Z_n = \frac{X_1 + \dots + X_n - np}{\sqrt{np(1-p)}}$, with $p = \frac13$. Plots of the PMFs of $Z_1, Z_2, Z_3$ and $Z_{30}$.

Here $\mu = p = \frac13$ and $\sigma^2 = p(1-p) = \frac29$. $S_n\sim$ Binomial$(n,\frac13)$, and $Z_n = \frac{S_n - n/3}{\sqrt{2n/9}}$ is its standardised version. The values and probabilities behind the pictures:

| $n$ | values of $Z_n$ | probabilities |
|---|---|---|
| 1 | $-0.707,\ 1.414$ | $\frac23,\ \frac13$ |
| 2 | $-1,\ 0.5,\ 2$ | $\frac49,\ \frac49,\ \frac19$ |
| 3 | $-1.225,\ 0,\ 1.225,\ 2.449$ | $\frac{8}{27},\ \frac{12}{27},\ \frac{6}{27},\ \frac1{27}$ |
| 30 | $\frac{k - 10}{2.582}$ for $k = 0, \dots, 30$, spaced $0.387$ apart | $\binom{30}{k}(\frac13)^k(\frac23)^{30-k}$ |

*How to compute a row* (for example $n = 2$): $S_2\in\{0,1,2\}$ with probabilities $(\frac23)^2, 2\cdot\frac13\cdot\frac23, (\frac13)^2$, and $Z_2 = \frac{S_2 - 2/3}{2/3}$.

**What the pictures show.**

- Every $Z_n$ has mean 0 and variance 1, by construction.
- For small $n$ the PMF is lopsided: a tall bar on the left and a long right tail, because $p = \frac13<\frac12$ makes the Bernoulli skewed.
- By $n = 30$ the bars trace a bell curve. The skew fades like $\frac1{\sqrt n}$.
- The bars themselves get shorter (each value has probability about $0.387\times\varphi(z)$), so the **PMFs** do not converge to anything. It is the **CDFs** that converge to $\Phi$, which is why the CLT is a statement about convergence in distribution. Equivalently, the histogram scaled to area 1 (bar height divided by the spacing $0.387$) approaches the density $\varphi$.

### Slide 30/30: The normal approximation based on the CLT

> **On the slide.** Let $S_n = X_1 + \dots + X_n$ where the $X_i$ are i.i.d. with mean $\mu$ and variance $\sigma^2$. If $n$ is large, the CDF of $S_n$ can be approximated as $P(S_n<c)\approx\Phi(z)$ where $z = \frac{c - n\mu}{\sigma\sqrt n}$. (Video link: youtube.com/watch?v=zeJD6dqJ5lo.)

$$\boxed{P(S_n\le c)\approx\Phi\Big(\frac{c - n\mu}{\sigma\sqrt n}\Big),\qquad P(\hat\mu_n\le c)\approx\Phi\Big(\frac{c - \mu}{\sigma/\sqrt n}\Big)}$$

**The recipe (probabilitycourse 7.1.2).**

1. Write the quantity as a sum $S_n$ (or average) of i.i.d. terms.
2. Find $\mu = E[X_i]$ and $\sigma^2 = \operatorname{Var}(X_i)$, then $E[S_n] = n\mu$ and $\operatorname{SD}(S_n) = \sigma\sqrt n$.
3. Standardise the boundary: $z = \frac{c - n\mu}{\sigma\sqrt n}$.
4. Read $\Phi(z)$ from the table; use $1 - \Phi(z)$ for "$>$" and $\Phi(z_2) - \Phi(z_1)$ for intervals. Use $\Phi(-z) = 1 - \Phi(z)$.

**The continuity correction (De Moivre–Laplace).** If $S_n$ is integer-valued (binomial, Poisson, counts), then $P(S_n<c)$, $P(S_n\le c)$ and $P(S_n\le c - 1)$ can be different numbers, but the normal approximation would give them all almost the same value. Fix this by moving the boundary half-way between integers: for integers $k\le l$,
$$P(k\le S_n\le l)\approx\Phi\Big(\frac{l + \frac12 - n\mu}{\sigma\sqrt n}\Big) - \Phi\Big(\frac{k - \frac12 - n\mu}{\sigma\sqrt n}\Big).$$
Think of each integer $j$ as the bar $[j - \frac12, j + \frac12]$ in a histogram, and approximate the area of the bars by the area under the normal curve.

*Bertsekas Ex. 5.12.* $S\sim$ Binomial$(36, \frac12)$: $\mu_S = 18$, $\sigma_S = 3$.

- Exact: $P(S\le21) = 0.8785$.
- No correction: $\Phi\big(\frac{21 - 18}{3}\big) = \Phi(1) = 0.8413$. Off by 0.04.
- With correction: $\Phi\big(\frac{21.5 - 18}{3}\big) = \Phi(1.17) = 0.8783$. Off by 0.0002.
- Even a single value works: $P(S = 19)\approx\Phi\big(\frac{19.5 - 18}{3}\big) - \Phi\big(\frac{18.5 - 18}{3}\big) = 0.6915 - 0.5662 = 0.1253$, against the exact $\binom{36}{19}2^{-36} = 0.1251$.

## Part B: extra worked examples and problems

### Convergence in probability and in mean

**B1 (Bertsekas Ex. 5.7).** $Y\sim$ Exp$(1)$ and $Y_n = \frac Yn$. (The $Y_n$ are dependent.) Does $Y_n\to0$ in probability?

*Solution.* $P(|Y_n|\ge\epsilon) = P(Y\ge n\epsilon) = e^{-n\epsilon}\to0$. Yes. (In fact $Y_n(\omega) = \frac{Y(\omega)}{n}\to0$ for every outcome, so it also converges surely.)

**B2 (Bertsekas Ex. 5.8; probabilitycourse 7.2.6).** $Y_n = n^2$ with probability $\frac1n$, else 0. Show $Y_n\xrightarrow{p}0$ but $E[Y_n]\to\infty$, and no $L^r$ convergence.

*Solution.* $P(|Y_n|\ge\epsilon) = \frac1n\to0$ for $n^2\ge\epsilon$. But $E[Y_n] = \frac{n^2}{n} = n\to\infty$, and $E[Y_n^r] = n^{2r-1}\to\infty$ for every $r\ge1$. (This is Bertsekas's answer to Problem 7(b) below.)

**B3 (last year's HW7 Q1; Bertsekas Problem 5).** $X_1, X_2, \dots$ independent $\mathcal U[-1,1]$. Show convergence in probability, and find the limit, for: (a) $Y_n = \frac{X_n}{n}$; (b) $Y_n = X_n^n$; (c) $Y_n = X_1X_2\cdots X_n$; (d) $Y_n = \max\{X_1, \dots, X_n\}$.

*Solution.*
(a) $|Y_n|\le\frac1n$, so $P(|Y_n|\ge\epsilon) = 0$ once $n>\frac1\epsilon$. Limit 0.
(b) $P(|X_n|^n\ge\epsilon) = P(|X_n|\ge\epsilon^{1/n}) = 1 - \epsilon^{1/n}\to1 - 1 = 0$ (for $0<\epsilon<1$), since $|X_n|\sim\mathcal U[0,1]$. Limit 0.
(c) By independence $E|Y_n| = \prod E|X_i| = 2^{-n}$. Markov: $P(|Y_n|\ge\epsilon)\le\frac{2^{-n}}{\epsilon}\to0$. Limit 0.
(d) For $0<\epsilon<2$: $P(|Y_n - 1|\ge\epsilon) = P(\text{all } X_i\le1-\epsilon) = \big(\frac{2 - \epsilon}{2}\big)^n\to0$. Limit 1.

**B4 (last year's HW7 Q2).** $X_i$ i.i.d. with mean $\mu$ and variance $\sigma^2>0$. Let $Y_i = \frac13X_i + \frac23X_{i+1}$ and $M_n = \frac1n\sum_{i=1}^nY_i$. (a) Are the $Y_i$ independent? (b) Identically distributed? (c) Show $M_n\xrightarrow{p}\mu$.

*Solution.* (a) No: $Y_i$ and $Y_{i+1}$ both contain $X_{i+1}$; indeed $\operatorname{Cov}(Y_i, Y_{i+1}) = \frac23\cdot\frac13\sigma^2 = \frac29\sigma^2\ne0$. (b) Yes: each $Y_i$ is the same function of an i.i.d. pair. (c) $E[M_n] = \mu$. For the variance, $\operatorname{Var}(Y_i) = \big(\frac19 + \frac49\big)\sigma^2 = \frac59\sigma^2$, neighbours have covariance $\frac29\sigma^2$, and others 0:
$$\operatorname{Var}\Big(\sum_{i=1}^nY_i\Big) = n\cdot\frac59\sigma^2 + 2(n-1)\cdot\frac29\sigma^2 = \frac{9n - 4}{9}\sigma^2,\qquad\operatorname{Var}(M_n) = \frac{(9n-4)\sigma^2}{9n^2}\le\frac{\sigma^2}{n}.$$
Chebyshev: $P(|M_n - \mu|\ge\epsilon)\le\frac{\sigma^2}{n\epsilon^2}\to0$. (The WLLN does not need independence, only a variance of the average that goes to 0.)

**B5 (last year's HW7 Q3 and HW8 Q5).** (a) $X_n\sim\mathcal N(0,\frac1n)$: show $X_n\xrightarrow{p}0$. (b) $X_n = X + Y_n$ with $Y_n\sim\mathcal N(0,\frac1n)$ independent of $X$: show $X_n\xrightarrow{m.s.}X$.

*Solution.* (a) Chebyshev: $P(|X_n|\ge\epsilon)\le\frac{1}{n\epsilon^2}\to0$. (b) $E[(X_n - X)^2] = E[Y_n^2] = \frac1n\to0$. Note that nothing about $X$ is needed.

**B6 (last year's HW7 Q7).** $X_n = X + Y_n$ with $E[Y_n] = \frac1n$ and $\operatorname{Var}(Y_n) = \frac{\sigma^2}{n}$. Show $X_n\xrightarrow{p}X$.

*Solution.* Bias–variance: $E[(X_n - X)^2] = E[Y_n^2] = \frac{\sigma^2}{n} + \frac{1}{n^2}\to0$, so mean square, hence in probability.

**B7 (last year's Quiz 2 Q2; HW7 Q5; Tutorial 7 Q8(b)).** $X_n$ has the Laplace density $\frac n2e^{-n|x|}$. Show $X_n\xrightarrow{p}0$.

*Solution, three ways.*
- *Directly:* $P(|X_n|>\epsilon) = 2\int_\epsilon^\infty\frac n2e^{-nx}\,dx = e^{-n\epsilon}\to0$.
- *Markov:* $E|X_n| = n\int_0^\infty xe^{-nx}\,dx = \frac1n$, so $P(|X_n|>\epsilon)\le\frac{1}{n\epsilon}\to0$.
- *Chebyshev:* $E[X_n] = 0$ (symmetric) and $E[X_n^2] = n\int_0^\infty x^2e^{-nx}\,dx = \frac{2}{n^2}$, so $P(|X_n|>\epsilon)\le\frac{2}{n^2\epsilon^2}\to0$.

**B8 (last year's HW8 Q4; probabilitycourse 7.2.6; Tutorial 7 Q4(b); Endsem Q7).** (a) $X_n\sim\mathcal U(0,\frac1n)$: show $X_n\xrightarrow{p}0$ and $X_n\xrightarrow{L^r}0$. (b) Endsem Q7: $X_n\sim\mathcal U(5 - \frac1n, 5 + \frac1n)$: show $X_n\xrightarrow{d}5$, and compute $P(|X_n - 5|>\epsilon)$ explicitly.

*Solution.* (a) $P(X_n>\epsilon) = 0$ once $\frac1n\le\epsilon$. And $E[X_n^r] = \int_0^{1/n}x^r\,n\,dx = \frac{1}{(r+1)n^r}\to0$.
(b) *Distribution:* the limit's CDF is $\mathbf 1\{x\ge5\}$, continuous except at 5. For $x<5$, $F_n(x) = 0$ once $5 - \frac1n>x$; for $x>5$, $F_n(x) = 1$ once $5 + \frac1n<x$. So $F_n(x)\to F(x)$ at every $x\ne5$. (At $x = 5$, $F_n(5) = \frac12$ for all $n$, which is allowed to disagree.)
*Probability:* the density is $\frac n2$ on an interval of half-width $\frac1n$. If $\frac1n\le\epsilon$, the whole interval lies within $\epsilon$ of 5, so the probability is 0. If $\frac1n>\epsilon$, the part outside $(5-\epsilon, 5+\epsilon)$ has total length $2(\frac1n - \epsilon)$, so
$$P(|X_n - 5|>\epsilon) = \begin{cases}1 - n\epsilon & n<\frac1\epsilon\\ 0 & n\ge\frac1\epsilon\end{cases}\ \xrightarrow{n\to\infty}0 .$$

**B9 (last year's HW8 Q1).** Independent $X_n\sim$ Bernoulli$(\frac1n)$. Does $X_n\to0$ (a) in mean square, (b) almost surely, (c) in distribution?

*Solution.* (a) Yes: $E[X_n^2] = \frac1n\to0$. (b) No: L17 Part B, B4 (Theorem 7.6, or the second Borel–Cantelli lemma). (c) Yes: m.s. implies p implies d. Directly, $F_{X_n}(x) = 1 - \frac1n\to1$ for $0\le x<1$, and the CDFs are 0 for $x<0$ and 1 for $x\ge1$. This is the "m.s. does not imply a.s." example.

**B10 (last year's Tutorial 7 Q1).** One uniform $U$ and $X_n = n\mathbf 1\{U\le\frac1n\}$ (L17 slide 19). Does $X_n\to0$ in (a) distribution, (b) probability, (c) almost surely (can Borel–Cantelli be applied?), (d) mean?

*Solution.* (c) Yes, almost surely (slide 19). Borel–Cantelli (Theorem 7.5) **cannot** be applied, since $\sum_nP(X_n>\epsilon) = \sum\frac1n = \infty$; the conclusion holds anyway (use Theorem 7.6). (b) and (a) follow from (c). (d) No: $E|X_n| = 1$.

**B11 (last year's Quiz 2, second set, Q1b): convergence in distribution only.** $X_n\sim$ Exp$(n)$ and $Y_n = nX_n$. Let $Y\sim$ Exp$(1)$, independent of all $Y_n$ (and the $Y_n$ independent). Does $Y_n\to Y$ in (a) distribution, (b) probability, (c) almost surely, (d) $L^1$?

*Solution.* (a) Yes: $F_{Y_n}(y) = P(X_n\le\frac yn) = 1 - e^{-n\cdot y/n} = 1 - e^{-y}$. Every $Y_n$ is exactly Exp$(1)$.
(b) No. Condition on $Y$: $P(Y_n>Y + \epsilon) = \int_0^\infty e^{-(y+\epsilon)}e^{-y}\,dy = \frac12e^{-\epsilon}$, and the same for $Y>Y_n + \epsilon$. So $P(|Y_n - Y|>\epsilon) = e^{-\epsilon}$ for every $n$, which does not tend to 0.
(c) No: a.s. would imply (b). (Or by Theorem 7.6: $P(A_m) = \prod_{n\ge m}(1 - e^{-\epsilon}) = 0$.)
(d) No: $Y_n - Y$ has the Laplace density $\frac12e^{-|z|}$ (from (b)), so $E|Y_n - Y| = 1$ for every $n$.
This is the cleanest exam-style example that **d does not imply p**: identical distributions, independent values.

**B12 (last year's Tutorial 7 Q3).** $X\sim$ Bernoulli$(\frac13)$ and $X_n = (1 + \frac1n)X$. Show $X_n\xrightarrow{p}X$.

*Solution.* $|X_n - X| = \frac Xn\le\frac1n$, so $P(|X_n - X|>\epsilon) = 0$ once $n>\frac1\epsilon$. (It even converges surely.)

**B13 (last year's Tutorial 7 Q10).** $X_i$ i.i.d. with $E[X] = 2$ and $\operatorname{Var}(X) = 9$. Let $Y_i = \frac{X_i}{2^i}$, $T_n = \sum_{i=1}^nY_i$ and $A_n = \frac{T_n}{n}$. (a) Means and variances. (b) to (d) Do $Y_n$, $T_n$, $A_n$ converge in probability, and to what?

*Solution.* (a) $E[Y_n] = \frac{2}{2^n}$, $\operatorname{Var}(Y_n) = \frac{9}{4^n}$. $E[T_n] = 2\sum_{i=1}^n2^{-i} = 2(1 - 2^{-n})$ and $\operatorname{Var}(T_n) = 9\sum_{i=1}^n4^{-i} = 3(1 - 4^{-n})$. $E[A_n] = \frac{2(1 - 2^{-n})}{n}$ and $\operatorname{Var}(A_n) = \frac{3(1 - 4^{-n})}{n^2}$.
(b) $Y_n\to0$: mean and variance both go to 0, so mean square, hence in probability.
(c) $T_n$ does **not** converge to a constant: its variance tends to $3$, not 0. It converges (in mean square, hence in probability) to the *random variable* $T = \sum_{i=1}^\infty\frac{X_i}{2^i}$, since $E[(T - T_n)^2] = \operatorname{Var}\big(\sum_{i>n}Y_i\big) + \big(E\sum_{i>n}Y_i\big)^2 = 3\cdot4^{-n} + 4\cdot4^{-n}\to0$.
(d) $A_n\to0$: mean and variance go to 0. (Note: not to $E[X] = 2$. The $Y_i$ are not identically distributed, so the LLN does not apply.)

**B14 (last year's HW8 Q11).** $Y_i$ i.i.d. with mean $\mu$ and variance $\sigma^2$, and $X_n = \frac1n(Y_1Y_2 + Y_2Y_3 + \dots + Y_{n-1}Y_n + Y_nY_1)$. Show $X_n\xrightarrow{p}\mu^2$.

*Solution.* Each product of two independent terms has mean $\mu^2$, so $E[X_n] = \mu^2$. Let $v = \operatorname{Var}(Y_1Y_2) = (\sigma^2 + \mu^2)^2 - \mu^4$. Neighbouring products share one factor: $\operatorname{Cov}(Y_1Y_2, Y_2Y_3) = \mu^2E[Y^2] - \mu^4 = \mu^2\sigma^2$. Non-neighbours are independent. For $n\ge3$ the cyclic sum has $n$ terms and $n$ neighbouring pairs, so
$$\operatorname{Var}(X_n) = \frac{nv + 2n\mu^2\sigma^2}{n^2} = \frac{v + 2\mu^2\sigma^2}{n}\to0,$$
and Chebyshev finishes it.

**B15 (last year's Tutorial 8 Q2): the "typewriter" sequence.** $U\sim\mathcal U[0,1]$; $X_1 = \mathbf 1\{U\in[0,1]\}$; $X_2, X_3$ are the indicators of the two halves; $X_4, \dots, X_7$ of the four quarters; and so on. Find the limit in probability, and decide almost sure convergence.

*Solution.* In the $k$-th sweep the intervals have length $2^{-k}$, so $P(X_n = 1) = 2^{-k}\to0$: $X_n\xrightarrow{p}0$ (and in every $L^r$, since $E[X_n^r] = 2^{-k}$). But for **every** $u$, each sweep covers $[0,1]$, so $X_n(u) = 1$ once in every sweep, infinitely often. No sample path converges: $X_n\not\to0$ almost surely. (Another "m.s. does not imply a.s." example, with no independence.)

**B16 (last year's Tutorial 8 Q4).** Show $\hat\mu_n\to E[X]$ in mean square.

*Solution.* $E[(\hat\mu_n - \mu)^2] = \operatorname{Var}(\hat\mu_n) = \frac{\sigma^2}{n}\to0$.

### Convergence in distribution

**B17 (last year's Tutorial 7 Q2).** $X_i$ i.i.d. $\mathcal U[0,1]$ and $Y_n = n\big(1 - \max_{i\le n}X_i\big)$. Show $Y_n\xrightarrow{d}$ Exp$(1)$.

*Solution.* For $0\le y<n$: $P(Y_n>y) = P\big(\max X_i<1 - \frac yn\big) = \big(1 - \frac yn\big)^n\to e^{-y}$. So $F_{Y_n}(y)\to1 - e^{-y}$ for $y\ge0$ (and both are 0 for $y<0$).

**B18 (last year's Tutorial 7 Q4(a) and Tutorial 8 Q5): discrete to continuous.** $Y_n$ uniform on $\{1, \dots, n\}$ and $X_n = \frac{Y_n}{n}$. Show $X_n\xrightarrow{d}\mathcal U(0,1)$.

*Solution.* For $0\le x\le1$, $F_{X_n}(x) = P(Y_n\le nx) = \frac{\lfloor nx\rfloor}{n}$, and $nx - 1<\lfloor nx\rfloor\le nx$ gives $x - \frac1n<F_{X_n}(x)\le x$. So $F_{X_n}(x)\to x$. (Outside $[0,1]$ both CDFs are 0 or 1.)

**B19 (probabilitycourse 7.2.8, Problem 1).** $X_n\sim$ Geometric$(\frac\lambda n)$ and $Y_n = \frac{X_n}{n}$. Show $Y_n\xrightarrow{d}$ Exp$(\lambda)$.

*Solution.* $P(Y_n>y) = P(X_n>ny) = \big(1 - \frac\lambda n\big)^{\lfloor ny\rfloor}\to e^{-\lambda y}$, because $\lfloor ny\rfloor = ny - \theta$ with $0\le\theta<1$, and $(1 - \frac\lambda n)^{ny}\to e^{-\lambda y}$ while $(1 - \frac\lambda n)^{-\theta}\to1$. (The waiting time in many tiny trials becomes exponential: the continuous analogue of Binomial $\to$ Poisson.)

**B20 (last year's HW8 Q9): hypergeometric to binomial.** A bag has $n$ blue and $n$ red balls; draw 10 without replacement; $X_n$ is the number of blue balls. Show $X_n\xrightarrow{d}$ Binomial$(10,\frac12)$.

*Solution.* For $k = 0, \dots, 10$:
$$P(X_n = k) = \frac{\binom nk\binom{n}{10-k}}{\binom{2n}{10}} = \binom{10}{k}\frac{\overbrace{n(n-1)\cdots(n-k+1)}^{k\ \text{factors}}\cdot\overbrace{n(n-1)\cdots(n-9+k)}^{10-k\ \text{factors}}}{\underbrace{2n(2n-1)\cdots(2n-9)}_{10\ \text{factors}}}\ \longrightarrow\ \binom{10}{k}\frac{n^{10}}{(2n)^{10}} = \binom{10}k\frac{1}{2^{10}}.$$
By Theorem 7.1 this is convergence in distribution. (Drawing 10 from a huge bag is almost like drawing with replacement.)

**B21 (last year's HW8 Q6).** $X_n = \frac{Z}{\sqrt n}$ with $E[Z^2]<\infty$. Show $X_n\xrightarrow{d}0$.

*Solution.* $E[X_n^2] = \frac{E[Z^2]}{n}\to0$, so $X_n\to0$ in mean square, hence in probability, hence in distribution.

### Normal approximation (CLT)

**B22 (Bertsekas Ex. 5.9).** 100 packages with weights i.i.d. $\mathcal U[5,50]$ pounds. $P(\text{total}>3000)$?

*Solution.* $\mu = 27.5$, $\sigma^2 = \frac{45^2}{12} = 168.75$. $z = \frac{3000 - 2750}{\sqrt{16875}} = \frac{250}{129.9} = 1.92$. $P\approx1 - \Phi(1.92) = 0.027$.

**B23 (Bertsekas Ex. 5.10): turning a count into a sum.** Processing times are i.i.d. $\mathcal U[1,5]$. Find $P(\text{at least 100 parts processed within 320 time units})$.

*Solution.* "At least 100 parts by time 320" is the same event as "the first 100 parts take at most 320", $\{S_{100}\le320\}$. $\mu = 3$, $\sigma^2 = \frac{16}{12} = \frac43$. $z = \frac{320 - 300}{\sqrt{100\cdot4/3}} = 1.73$, so $P\approx\Phi(1.73) = 0.958$.

**B24 (Bertsekas Ex. 5.11): polling, revisited.** With $M_n$ the sample fraction, $\operatorname{Var}(M_n) = \frac{p(1-p)}{n}\le\frac{1}{4n}$, so
$$P(|M_n - p|\ge\epsilon)\approx2\Big(1 - \Phi\Big(\frac{\epsilon}{\sigma_{M_n}}\Big)\Big)\le2\big(1 - \Phi(2\epsilon\sqrt n)\big).$$
*(a)* $n = 100$, $\epsilon = 0.1$: $\le2(1 - \Phi(2)) = 0.0455$ (Chebyshev only gave $0.25$). *(b)* 95% confidence of $\pm0.01$: need $2\epsilon\sqrt n = 0.02\sqrt n\ge1.96$, so $n\ge9604$, compared with Chebyshev's $50{,}000$.

**B25 (last year's HW8 Q2).** Call durations have $\mu = 10$ and $\sigma = 10$ minutes. (a) For 50 calls, $P(\bar X>12)$. (b) Minimum $n$ with $P(\bar X>12)\le0.05$. (c) For 80 calls, $P(9<\bar X<11)$. (Given: $\Phi^{-1}(0.95) = 1.6449$, $\Phi(\sqrt2) = 0.9214$, $\Phi(0.8944) = 0.8147$.)

*Solution.* (a) $\operatorname{SD}(\bar X) = \frac{10}{\sqrt{50}}$, $z = \frac{2\sqrt{50}}{10} = \sqrt2$: $P\approx1 - 0.9214 = 0.0786$.
(b) Need $\frac{2\sqrt n}{10}\ge1.6449$, so $\sqrt n\ge8.22$ and $n\ge67.6$: $n = 68$.
(c) $z = \frac{1}{10/\sqrt{80}} = 0.8944$: $P\approx2(0.8147) - 1 = 0.6294$.

**B26 (last year's HW8 Q3).** Rods: $\mu = 100$ mm, $\sigma = 5$ mm, roughly normal. (a) $P(\text{one rod}>110)$. (b) $P(\text{mean of }36>103)$.

*Solution.* (a) $z = 2$: $1 - 0.9772 = 0.0228$. (b) $\operatorname{SD}(\bar X) = \frac56$, $z = \frac{3}{5/6} = 3.6$: $1 - 0.9998 = 0.0002$. Averages vary far less than individuals.

**B27 (last year's HW8 Q8 = Bertsekas Problem 8; Tutorial 8 Q8).** (a) A fair roulette (odd with probability $\frac12$) is watched for 100 rounds; you call it unfair if more than 55 are odd. $P(\text{wrong decision})$? (b) $P(>220$ heads in 400 tosses$)$. Are (a) and (b) the same? (c) $P(40\le$ heads $\le60)$ in 100 tosses.

*Solution.* (a) $S\sim$ Binomial$(100,\frac12)$, mean 50, SD 5. "More than 55" is $S\ge56$, so the corrected boundary is $55.5$: $1 - \Phi(1.1) = 0.1357$ (exact $0.1356$; without the correction $1 - \Phi(1) = 0.159$).
(b) Mean 200, SD 10: $1 - \Phi\big(\frac{220.5 - 200}{10}\big) = 1 - \Phi(2.05) = 0.0202$ (exact $0.0201$).
Not the same, although $55\%$ of 100 equals $55\%$ of 400. The SD of the *proportion* is $\frac{0.5}{\sqrt n}$, which halves when $n$ quadruples, so the same excess proportion is twice as many standard deviations away. More data makes the same deviation less likely (the LLN at work).
(c) $P(39.5\le S\le60.5)\approx2\Phi(2.1) - 1 = 0.9643$ (exact $0.9648$).

**B28 (last year's Tutorial 8 Q6).** Test scores: mean 75, SD 10, roughly normal. (a) $P(\text{score}\ge100)$. (b) Out of 100 people, how many expected below 60? (c) $P(\text{mean of 100}<70)$.

*Solution.* (a) $1 - \Phi(2.5) = 0.0062$. (b) $100\cdot\Phi(-1.5) = 100\times0.0668\approx6.7$ people. (c) $\operatorname{SD}(\bar X) = 1$, so $z = -5$: $\Phi(-5)\approx2.9\times10^{-7}$. Essentially impossible.

**B29 (last year's Tutorial 8 Q9; probabilitycourse 7.1.2).** Service times: mean 2, variance 1, independent. $Y$ = total for 50 customers. $P(90<Y<110)$?

*Solution.* $E[Y] = 100$, $\operatorname{SD}(Y) = \sqrt{50}$. $P\approx\Phi\big(\frac{10}{\sqrt{50}}\big) - \Phi\big(-\frac{10}{\sqrt{50}}\big) = 2\Phi(\sqrt2) - 1 = 0.8427$.

**B30 (probabilitycourse 7.1.3, Problems 1 to 4).**
1. *Plane:* 100 passengers, weight mean 170 and SD 30 lb. $P(\text{total}>18{,}000)$: mean $17{,}000$, SD 300, $z = \frac{10}3$, so $1 - \Phi(3.33)\approx4.3\times10^{-4}$.
2. *$\pm1$ steps:* $X_i = +1$ w.p. $0.6$ and $-1$ w.p. $0.4$; $Y = X_1 + \dots + X_{25}$; estimate $P(4\le Y\le6)$ with a continuity correction. $E[X_i] = 0.2$ and $\operatorname{Var}(X_i) = 1 - 0.04 = 0.96$, so $E[Y] = 5$ and $\operatorname{Var}(Y) = 24$. The source's answer uses $[3.5, 6.5]$: $2\Phi\big(\frac{1.5}{\sqrt{24}}\big) - 1 = 0.2405$.
*A warning worth noticing.* A sum of 25 terms equal to $\pm1$ is always **odd**, so $\{4\le Y\le6\} = \{Y = 5\}$, with exact probability $\binom{25}{15}0.6^{15}0.4^{10} = 0.161$. The values of $Y$ are 2 apart, so the right correction is half the step, $\pm1$: $P(4\le Y\le6)\approx2\Phi\big(\frac{1}{\sqrt{24}}\big) - 1 = 0.162$, which is almost exact. The $\pm\frac12$ rule assumes values 1 apart.
3. *Sandwiches:* 64 guests each want 0, 1, 2 sandwiches w.p. $\frac14, \frac12, \frac14$. Mean 1, variance $\frac12$ each, so the total has mean 64 and SD $4\sqrt2 = 5.66$. For 95% confidence, $64 + 1.6449\times5.66 = 73.3$, so make 74.
4. *Sample size:* $X_i\sim$ Exp$(1)$; smallest $n$ with $P(0.9\le\bar X\le1.1)\ge0.95$. Need $2\Phi(0.1\sqrt n) - 1\ge0.95$, so $0.1\sqrt n\ge1.96$ and $n\ge385$.

**B31 (Bertsekas Problem 9): normal versus Poisson approximation.** Each day the computer crashes with probability $0.05$, independently. Find $P(\text{at least 45 crash-free days out of 50})$ (a) by the normal approximation, (b) by the Poisson approximation.

*Solution.* Let $X\sim$ Binomial$(50, 0.05)$ be the number of crash days; we want $P(X\le5)$. Mean $2.5$, variance $2.375$.
(a) $\Phi\big(\frac{5.5 - 2.5}{\sqrt{2.375}}\big) = \Phi(1.95) = 0.974$.
(b) Poisson$(2.5)$: $\sum_{k=0}^5e^{-2.5}\frac{2.5^k}{k!} = 0.958$.
The exact value is $0.962$. Poisson wins here because $p$ is small and $np$ is moderate; the binomial is too skewed for the normal approximation.

**B32 (Bertsekas Problem 10).** Daily gadget counts are i.i.d. with mean 5 and variance 9. (a) $P(\text{total in 100 days}<440)$. (b) Largest $n$ with $P(X_1 + \dots + X_n\ge200 + 5n)\le0.05$. (c) $N$ = first day the total exceeds 1000. Approximate $P(N\ge220)$.

*Solution.* (a) Mean 500, SD 30: $\Phi\big(\frac{440 - 500}{30}\big) = \Phi(-2) = 0.023$.
(b) $P\approx1 - \Phi\big(\frac{200}{3\sqrt n}\big)\le0.05$ requires $\frac{200}{3\sqrt n}\ge1.645$, so $\sqrt n\le40.5$ and $n\le1642$.
(c) $N\ge220$ means the total after 219 days is still at most 1000: $P(S_{219}\le1000)\approx\Phi\big(\frac{1000 - 1095}{3\sqrt{219}}\big) = \Phi(-2.14) = 0.016$. (Same trick as B23.)

**B33 (Bertsekas Problem 11).** $X_i, Y_i$ i.i.d. $\mathcal U[0,1]$ and $W = \frac{(X_1 + \dots + X_{16}) - (Y_1 + \dots + Y_{16})}{16}$. Approximate $P(|W - E[W]|<0.001)$.

*Solution.* $E[W] = 0$ and $\operatorname{Var}(W) = \frac{32\cdot\frac1{12}}{256} = \frac{1}{96}$, so $\operatorname{SD}(W) = 0.102$. $P\approx2\Phi\big(\frac{0.001}{0.102}\big) - 1 = 2\Phi(0.0098) - 1\approx0.0078$.

**B34 (last year's HW8 Q12, bonus): binomial to normal without MGFs (sketch).** Write $P(k) = \binom Nkp^kq^{N-k}$, take logs, and use Stirling, $\ln N!\approx N\ln N - N$. With $k = Np + x$, expand $\ln P(k)$ to second order in $x$ around the peak $k = Np$: the first-order term vanishes (that is why the peak is at $Np$), and the second-order coefficient is $-\frac{1}{2Npq}$. So $P(k)\approx C\,e^{-x^2/(2Npq)}$, a Gaussian with mean $Np$ and variance $Npq$; normalising fixes $C = \frac{1}{\sqrt{2\pi Npq}}$. (The finer Stirling formula $N!\approx\sqrt{2\pi N}(N/e)^N$ gives the constant directly.)



# Lecture 19: Random vectors, the covariance matrix and the Jacobian (Deck C, slides 1 to 8)

**Big picture.** So far we have handled one or two random variables at a time. Many problems involve several at once: the coordinates of a point, the readings of several sensors, the returns of several stocks. This lecture packs them into a **random vector** and builds the vector versions of three familiar tools:

| One variable (L1 to L13) | Random vector (this lecture) |
|---|---|
| mean $E[X]$ | mean vector $E[\mathbf X]$ |
| variance $\operatorname{Var}(X)$ | covariance matrix $C_{\mathbf X}$ |
| $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$ | $C_{A\mathbf X + \mathbf b} = AC_{\mathbf X}A^T$ |
| $f_Y(y) = f_X(h(y))\,\vert h'(y)\vert$ | $f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,\vert J\vert$ |

These are exactly the tools L20 needs for Gaussian vectors.

## Part A: the slides

### Slide 1/36: Random vectors

> **On the slide.** We are now moving from a univariate random variable to multivariate random variables, also called random vectors. An $n$-dimensional random vector is a column vector $\mathbf X = (X_1, \dots, X_n)^T$ whose components $X_i$ are scalar-valued random variables defined on the same space $(\Omega, \mathcal F, P)$. Since the components are on the same space, they may be correlated with each other. Example: $\mathbf X = (X_1, X_2)^T$ where $X_1 = Z_1$ and $X_2 = Z_1 + Z_2$, where $Z_1$ and $Z_2$ are independent standard normal. **What is the pdf, cdf, marginals, mean, variance/covariance of $\mathbf X$?**

**Why "the same space" matters.** All components are functions of the same outcome $\omega$, so they can be related. In the example, $X_1$ and $X_2$ share $Z_1$: if $Z_1$ happens to be large, both are pushed up. A random vector is just a convenient package for several *jointly distributed* random variables (L10 to L13), with matrix notation to keep the algebra short.

**The red question, fully solved.** Everything follows from writing $\mathbf X$ in terms of the independent $Z$'s.

*Mean.* $E[X_1] = E[Z_1] = 0$ and $E[X_2] = E[Z_1] + E[Z_2] = 0$, so $E[\mathbf X] = (0,0)^T$.

*Variances and covariance.*
$$\operatorname{Var}(X_1) = 1,\qquad\operatorname{Var}(X_2) = \operatorname{Var}(Z_1) + \operatorname{Var}(Z_2) = 2,$$
$$\operatorname{Cov}(X_1, X_2) = \operatorname{Cov}(Z_1, Z_1 + Z_2) = \operatorname{Var}(Z_1) + \operatorname{Cov}(Z_1, Z_2) = 1 + 0 = 1 .$$
So
$$C_{\mathbf X} = \begin{bmatrix}1 & 1\\ 1 & 2\end{bmatrix},\qquad\rho_{X_1,X_2} = \frac{1}{\sqrt{1\cdot2}} = \frac{1}{\sqrt2}\approx0.71 .$$

*Marginals.* $X_1 = Z_1\sim\mathcal N(0,1)$. $X_2 = Z_1 + Z_2$ is a sum of independent normals, so $X_2\sim\mathcal N(0, 2)$ (L14 slide 5).

*Joint pdf.* The map $(z_1, z_2)\mapsto(x_1, x_2) = (z_1, z_1 + z_2)$ is invertible: $z_1 = x_1$ and $z_2 = x_2 - x_1$. Then for any region $B$,
$$P(\mathbf X\in B) = P\big((Z_1, Z_2)\in\{(x_1, x_2 - x_1) : (x_1, x_2)\in B\}\big).$$
This map is a "shear" that preserves areas (its Jacobian, slide 7, is 1), so the density just moves along with it:
$$f_{\mathbf X}(x_1, x_2) = f_{Z_1}(x_1)\,f_{Z_2}(x_2 - x_1) = \frac{1}{2\pi}\exp\Big(-\frac{x_1^2 + (x_2 - x_1)^2}{2}\Big).$$
(L20 shows that this is the bivariate normal density with covariance $C_{\mathbf X}$: indeed $C_{\mathbf X}^{-1} = \begin{bmatrix}2 & -1\\ -1 & 1\end{bmatrix}$ and $\mathbf x^TC_{\mathbf X}^{-1}\mathbf x = 2x_1^2 - 2x_1x_2 + x_2^2 = x_1^2 + (x_2 - x_1)^2$.)

*Joint CDF.* Condition on $Z_1 = z$:
$$F_{\mathbf X}(x_1, x_2) = P(Z_1\le x_1,\ Z_1 + Z_2\le x_2) = \int_{-\infty}^{x_1}\varphi(z)\,P(Z_2\le x_2 - z)\,dz = \int_{-\infty}^{x_1}\varphi(z)\,\Phi(x_2 - z)\,dz .$$
This has no closed form, which is typical. Densities are usually easier to work with than CDFs for vectors.

### Slide 2/36: Notation

> **On the slide.** The CDF and pdf of $\mathbf X$ are $F_{\mathbf X}(\mathbf x) = F_{X_1,\dots,X_n}(x_1, \dots, x_n)$ and $f_{\mathbf X}(\mathbf x) = f_{X_1,\dots,X_n}(x_1, \dots, x_n)$. The joint CDF/pdf captures the correlation between components. The expected value vector is $E[\mathbf X] = (E[X_1], \dots, E[X_n])^T$. Linearity of expectation holds here, so for any deterministic matrix $\mathbf A$ and vector $\mathbf b$, and $\mathbf Y = \mathbf A\mathbf X + \mathbf b$, we have $E[\mathbf Y] = \mathbf AE[\mathbf X] + \mathbf b$.

$$F_{\mathbf X}(\mathbf x) = P(X_1\le x_1, \dots, X_n\le x_n),\qquad P(\mathbf X\in B) = \int_Bf_{\mathbf X}(\mathbf x)\,d\mathbf x .$$

**Why $E[A\mathbf X + \mathbf b] = AE[\mathbf X] + \mathbf b$.** Look at one row. The $i$-th component of $\mathbf Y$ is $Y_i = \sum_ja_{ij}X_j + b_i$, an ordinary linear combination, so by ordinary linearity $E[Y_i] = \sum_ja_{ij}E[X_j] + b_i$, which is the $i$-th component of $AE[\mathbf X] + \mathbf b$. $\mathbf A$ can be any $m\times n$ matrix: $\mathbf Y$ may have a different dimension from $\mathbf X$.

**Marginals from the joint (recall L11).** Integrate out the other variables: $f_{X_1}(x_1) = \int\cdots\int f_{\mathbf X}(x_1, x_2, \dots, x_n)\,dx_2\cdots dx_n$. The joint determines the marginals, but not the other way round, except when the components are independent, in which case $f_{\mathbf X} = \prod_if_{X_i}$.

### Slide 3/36: The covariance matrix

> **On the slide.** The covariance matrix $C_{\mathbf X}$ captures the covariance between components and is defined by
> $$C_{\mathbf X} = E\big[(\mathbf X - E[\mathbf X])(\mathbf X - E[\mathbf X])^T\big] = \begin{bmatrix}\operatorname{Var}(X_1) & \operatorname{Cov}(X_1, X_2) & \dots & \operatorname{Cov}(X_1, X_n)\\ \operatorname{Cov}(X_2, X_1) & \operatorname{Var}(X_2) & \dots & \operatorname{Cov}(X_2, X_n)\\ \vdots & & & \vdots\\ \operatorname{Cov}(X_n, X_1) & \operatorname{Cov}(X_n, X_2) & \dots & \operatorname{Var}(X_n)\end{bmatrix}$$

**Why the outer product gives this matrix.** Let $\mathbf D = \mathbf X - E[\mathbf X]$, a column vector. Then $\mathbf D\mathbf D^T$ is an $n\times n$ matrix whose $(i,j)$ entry is $D_iD_j = (X_i - E X_i)(X_j - EX_j)$. Taking expectations entry by entry gives $\operatorname{Cov}(X_i, X_j)$, and on the diagonal $\operatorname{Cov}(X_i, X_i) = \operatorname{Var}(X_i)$.

**Basic facts.**

- $C_{\mathbf X}$ is **symmetric**, because $\operatorname{Cov}(X_i, X_j) = \operatorname{Cov}(X_j, X_i)$.
- **Shortcut** (like $\operatorname{Var}(X) = E[X^2] - (EX)^2$): $C_{\mathbf X} = E[\mathbf X\mathbf X^T] - E[\mathbf X]E[\mathbf X]^T$.
- **Independent components** give a **diagonal** $C_{\mathbf X}$. (A diagonal $C_{\mathbf X}$ does not imply independence in general, but it does for Gaussian vectors; see L20.)
- The **correlation coefficients** are read off as $\rho_{ij} = \frac{C_{ij}}{\sqrt{C_{ii}C_{jj}}}$.

### Slide 4/36: Properties, and functions of random vectors

> **On the slide.** The covariance matrix $C_{\mathbf X}$ is always positive semi-definite, i.e., for any vector $a\ne0$ we have $a^TC_{\mathbf X}a\ge0$. Why? Let $u = a^T(\mathbf X - E[\mathbf X])$; then $a^TC_{\mathbf X}a = E[uu^T] = E[u^2]\ge0$. **HW:** if $\mathbf Y = \mathbf A\mathbf X + \mathbf b$, show that $C_{\mathbf Y} = AC_{\mathbf X}A^T$. Now recall how we obtained the pdf of $Y$ from the pdf of $X$ when $Y = g(X)$: *for $g$ monotone, continuous and differentiable, $f_Y(y) = f_X(h(y))\,|\frac{dh}{dy}(y)|$ where $h$ is the inverse function of $g$.* How does this generalise to $\mathbf Y = G(\mathbf X)$? How do we get $f_{\mathbf Y}$ from $f_{\mathbf X}$?

**Positive semi-definite (PSD), in words.** For any fixed vector $a$, the scalar $a^T\mathbf X = \sum a_iX_i$ is a random variable, and
$$\boxed{\operatorname{Var}(a^T\mathbf X) = a^TC_{\mathbf X}a}$$
A variance is never negative, so $a^TC_{\mathbf X}a\ge0$ for every $a$. That is the PSD property. The slide's proof is exactly this: $u = a^T(\mathbf X - E\mathbf X)$ is a scalar with mean 0, so $E[u^2] = \operatorname{Var}(a^T\mathbf X)$, and
$$E[u^2] = E\big[a^T(\mathbf X - E\mathbf X)(\mathbf X - E\mathbf X)^Ta\big] = a^TE\big[(\mathbf X - E\mathbf X)(\mathbf X - E\mathbf X)^T\big]a = a^TC_{\mathbf X}a .$$
(The constant vectors $a^T$ and $a$ come out of the expectation by linearity.)

**When is it strictly positive?** $a^TC_{\mathbf X}a = 0$ means $\operatorname{Var}(a^T\mathbf X) = 0$, so $a^T\mathbf X$ is a constant: the components satisfy an exact linear relation. Example (probabilitycourse 6.1.5): for $X, Y$ independent $\mathcal U(0,1)$ and $\mathbf V = (X, Y, X + Y)^T$, the vector $a = (1, 1, -1)$ gives $a^T\mathbf V = 0$, so $C_{\mathbf V}$ is singular ($\det C_{\mathbf V} = 0$). Without such exact relations, $C_{\mathbf X}$ is positive **definite**: all eigenvalues $>0$ and $\det C_{\mathbf X}>0$, so $C_{\mathbf X}^{-1}$ exists. (L20's Gaussian density needs this.)

**HW: $C_{\mathbf Y} = AC_{\mathbf X}A^T$.** Since $E[\mathbf Y] = AE[\mathbf X] + \mathbf b$, the $\mathbf b$ cancels: $\mathbf Y - E[\mathbf Y] = A(\mathbf X - E[\mathbf X])$. Then, using $(AD)^T = D^TA^T$:
$$C_{\mathbf Y} = E\big[A(\mathbf X - E\mathbf X)(\mathbf X - E\mathbf X)^TA^T\big] = A\,E\big[(\mathbf X - E\mathbf X)(\mathbf X - E\mathbf X)^T\big]\,A^T = AC_{\mathbf X}A^T .\qquad\square$$

$$\boxed{\mathbf Y = A\mathbf X + \mathbf b\ \Longrightarrow\ E[\mathbf Y] = AE[\mathbf X] + \mathbf b,\qquad C_{\mathbf Y} = AC_{\mathbf X}A^T}$$

This is the vector form of $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$: the shift $\mathbf b$ disappears, and the scaling appears "twice". The single-entry versions are worth remembering:
$$\operatorname{Var}(a^T\mathbf X) = a^TC_{\mathbf X}a,\qquad\operatorname{Cov}(a^T\mathbf X, b^T\mathbf X) = a^TC_{\mathbf X}b .$$

*Check with slide 1.* $\mathbf X = A\mathbf Z$ with $A = \begin{bmatrix}1 & 0\\ 1 & 1\end{bmatrix}$ and $C_{\mathbf Z} = I$, so $C_{\mathbf X} = AA^T = \begin{bmatrix}1 & 1\\ 1 & 2\end{bmatrix}$. ✓ Same answer as before, with no covariance algebra.

**The 1D change of variables, recalled.** For $Y = g(X)$ with $g$ monotone and $h = g^{-1}$: $f_Y(y) = f_X(h(y))\,|h'(y)|$. The factor $|h'(y)|$ is the "stretch factor": probability is conserved, so where $g$ stretches intervals, the density must thin out by the same factor. Slides 5 to 8 generalise this; the derivative becomes a matrix of partial derivatives, and its determinant measures how volumes are stretched.

### Slide 5/36: Functions of random vectors

> **On the slide.** Let $\mathbf Y = G(\mathbf X)$ where $G:\mathbb R^n\to\mathbb R^n$ is continuous and invertible with continuous partial derivatives. Then one can write $Y_i = G_i(X_1, \dots, X_n)$ for $i = 1, \dots, n$. For example, if $\begin{bmatrix}Y_1\\Y_2\end{bmatrix} = \begin{bmatrix}2X_1\\X_1 + X_2\end{bmatrix}$ then $G_1(X_1, X_2) = 2X_1$ and $G_2(X_1, X_2) = X_1 + X_2$. **What does continuity of $G$ mean? Continuity of components?**

**The blue question.** A vector-valued function $G = (G_1, \dots, G_n)$ is continuous exactly when **every component** $G_i:\mathbb R^n\to\mathbb R$ is continuous. (A vector is close to another exactly when every coordinate is close.) Similarly, "continuous partial derivatives" means every $\frac{\partial G_i}{\partial x_j}$ exists and is continuous. In the example, $G_1 = 2x_1$ and $G_2 = x_1 + x_2$ are polynomials, so all is well.

**Two requirements to check in every problem.**

1. **Same dimension** ($\mathbb R^n\to\mathbb R^n$), so that the Jacobian matrix is square and has a determinant. If you want the density of fewer variables, for example only $Y_1 = X_1 + X_2$, add a convenient extra variable such as $Y_2 = X_2$, apply the theorem, and then integrate $Y_2$ out.
2. **Invertible** (one-to-one), at least on the region where $f_{\mathbf X}>0$, so that each $\mathbf y$ comes from exactly one $\mathbf x$.

### Slide 6/36: The inverse map

> **On the slide.** Let $H$ denote the inverse of $G$. We similarly have $X_i = H_i(Y_1, \dots, Y_n)$. For the example we have $X_1 = H_1(Y_1, Y_2) = \frac{X_1}{2}$ [should read $\frac{Y_1}{2}$] and $X_2 = H_2(Y_1, Y_2) = Y_2 - \frac{Y_1}{2}$.

**Finding $H$: solve for the $x$'s.** From $y_1 = 2x_1$, $x_1 = \frac{y_1}{2}$. Substitute into $y_2 = x_1 + x_2$: $x_2 = y_2 - \frac{y_1}{2}$. So
$$H(\mathbf y) = \begin{bmatrix}y_1/2\\ y_2 - y_1/2\end{bmatrix}.$$
(The slide's first formula has a typo: $H_1$ must be written in terms of $Y$, so $X_1 = \frac{Y_1}{2}$.)

*Check:* $G(H(\mathbf y)) = \big(2\cdot\frac{y_1}{2},\ \frac{y_1}{2} + y_2 - \frac{y_1}{2}\big) = (y_1, y_2)$. ✓

### Slide 7/36: The Jacobian theorem

> **On the slide.** *Let $\mathbf Y = G(\mathbf X)$ where $G:\mathbb R^n\to\mathbb R^n$ is continuous and invertible with continuous partial derivatives, and let $H$ denote its inverse. Then*
> $$f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,|J|$$
> *where $J$ is the determinant of the Jacobian matrix*
> $$\begin{bmatrix}\frac{\partial H_1}{\partial y_1} & \frac{\partial H_1}{\partial y_2} & \dots & \frac{\partial H_1}{\partial y_n}\\ \frac{\partial H_2}{\partial y_1} & \frac{\partial H_2}{\partial y_2} & \dots & \frac{\partial H_2}{\partial y_n}\\ \vdots & & & \vdots\\ \frac{\partial H_n}{\partial y_1} & \frac{\partial H_n}{\partial y_2} & \dots & \frac{\partial H_n}{\partial y_n}\end{bmatrix}$$

$$\boxed{f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}\big(H(\mathbf y)\big)\,|J|,\qquad J = \det\Big[\frac{\partial H_i}{\partial y_j}\Big]_{i,j}}$$

Row $i$ of the matrix holds the partial derivatives of the $i$-th inverse component $H_i$. Note that $J$ is computed from the **inverse** map $H$, as functions of $\mathbf y$, and that the formula uses its **absolute value**.

**The recipe.**

1. Solve $\mathbf y = G(\mathbf x)$ for $\mathbf x = H(\mathbf y)$.
2. Compute the matrix of partials of $H$ and its determinant $J$.
3. Write $f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,|J|$.
4. **Find the support:** the set of $\mathbf y$ for which $H(\mathbf y)$ lies where $f_{\mathbf X}>0$. Students lose most marks on this step.

**A useful shortcut.** The Jacobian of the inverse is the reciprocal of the Jacobian of the forward map: $J = \frac{1}{\det[\partial G_i/\partial x_j]}$, evaluated at $\mathbf x = H(\mathbf y)$. Use whichever is easier to differentiate.

**With $n = 1$** the matrix is the single entry $h'(y)$, and the theorem is the 1D formula of slide 4.

### Slide 8/36: The Jacobian determinant, and two HWs

> **On the slide.** From vector calculus: the Jacobian gives the ratio of the incremental areas $dx_1dx_2\cdots dx_n$ and $dy_1\cdots dy_n$. (Links: Wikipedia, Jacobian matrix and determinant; Khan Academy.) **HW1:** for the running example, find $f_{\mathbf Y}(\mathbf y)$. **HW2:** when $\mathbf Y = \mathbf A\mathbf X + \mathbf b$, show that $f_{\mathbf Y}(\mathbf y) = \frac{1}{|\det(A)|}f_{\mathbf X}(A^{-1}(\mathbf y - \mathbf b))$.

**Why the determinant (the "ratio of areas").** Probability is conserved: the small box $d\mathbf y$ around $\mathbf y$ comes from a small region around $\mathbf x = H(\mathbf y)$, and both have the same probability:
$$f_{\mathbf Y}(\mathbf y)\,\text{vol}(d\mathbf y) = f_{\mathbf X}(\mathbf x)\,\text{vol}(d\mathbf x)\quad\Longrightarrow\quad f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(\mathbf x)\,\frac{\text{vol}(d\mathbf x)}{\text{vol}(d\mathbf y)} .$$
Near $\mathbf y$, the map $H$ is approximately linear, with matrix $\big[\frac{\partial H_i}{\partial y_j}\big]$. A linear map multiplies all volumes by the absolute value of its determinant. So $\frac{\text{vol}(d\mathbf x)}{\text{vol}(d\mathbf y)} = |J|$. For example, the matrix $\begin{bmatrix}a & 0\\0 & d\end{bmatrix}$ turns a unit square into an $a\times d$ rectangle, of area $|ad|$.

**HW1: the running example.** $H(\mathbf y) = \big(\frac{y_1}{2},\ y_2 - \frac{y_1}{2}\big)$, so
$$\Big[\frac{\partial H_i}{\partial y_j}\Big] = \begin{bmatrix}\frac12 & 0\\ -\frac12 & 1\end{bmatrix},\qquad J = \frac12\cdot1 - 0\cdot\big(-\tfrac12\big) = \frac12 .$$
$$\boxed{f_{\mathbf Y}(y_1, y_2) = \frac12\,f_{\mathbf X}\Big(\frac{y_1}{2},\ y_2 - \frac{y_1}{2}\Big)}$$
(Forward check: $\det\begin{bmatrix}2 & 0\\1 & 1\end{bmatrix} = 2$, and $\frac12$ is its reciprocal. The map doubles areas, so the density halves.)

*With specific inputs.*
- If $X_1, X_2$ are i.i.d. $\mathcal N(0,1)$: $f_{\mathbf Y}(\mathbf y) = \frac{1}{4\pi}\exp\Big(-\frac12\Big[\frac{y_1^2}{4} + \big(y_2 - \frac{y_1}2\big)^2\Big]\Big)$.
- If $\mathbf X$ is slide 1's vector: $f_{\mathbf Y}(\mathbf y) = \frac{1}{4\pi}\exp\Big(-\frac12\Big[\frac{y_1^2}{4} + (y_2 - y_1)^2\Big]\Big)$.

(Both are bivariate normal densities, with covariance matrices $AA^T = \begin{bmatrix}4 & 2\\2 & 2\end{bmatrix}$ and $AC_{\mathbf X}A^T = \begin{bmatrix}4 & 4\\4 & 5\end{bmatrix}$, where $A = \begin{bmatrix}2 & 0\\1 & 1\end{bmatrix}$. Both have determinant 4, matching the constant $\frac{1}{2\pi\sqrt4} = \frac{1}{4\pi}$.)

**HW2: affine maps.** If $A$ is an invertible $n\times n$ matrix, then $\mathbf y = A\mathbf x + \mathbf b$ inverts to $H(\mathbf y) = A^{-1}(\mathbf y - \mathbf b)$. This is linear in $\mathbf y$, with matrix of partial derivatives $A^{-1}$ (constant), so $J = \det(A^{-1}) = \frac{1}{\det A}$. Hence
$$\boxed{f_{\mathbf Y}(\mathbf y) = \frac{1}{|\det A|}\,f_{\mathbf X}\big(A^{-1}(\mathbf y - \mathbf b)\big)}$$
(probabilitycourse Example 6.15.) The running example is the case $A = \begin{bmatrix}2 & 0\\1 & 1\end{bmatrix}$, $\det A = 2$, $\mathbf b = \mathbf 0$. L20 uses this with $\mathbf X$ a standard normal vector to get the multivariate Gaussian density.

## Part B: extra worked examples and problems

**B1 (last year's HW9 Q3).** $Y_1 = X_1 + X_2$, $Y_2 = X_1 - X_2$. (a) Find $H$. (b) Find $|J|$. (c) Write $f_{\mathbf Y}$ in terms of $f_{\mathbf X}$.

*Solution.* (a) Adding and subtracting: $X_1 = \frac{Y_1 + Y_2}{2}$, $X_2 = \frac{Y_1 - Y_2}{2}$.
(b) $J = \det\begin{bmatrix}\frac12 & \frac12\\ \frac12 & -\frac12\end{bmatrix} = -\frac14 - \frac14 = -\frac12$, so $|J| = \frac12$.
(c) $f_{\mathbf Y}(y_1, y_2) = \frac12f_{\mathbf X}\big(\frac{y_1 + y_2}{2}, \frac{y_1 - y_2}{2}\big)$.
*Example.* If $X_1, X_2$ are i.i.d. $\mathcal N(0,1)$, then $\big(\frac{y_1 + y_2}{2}\big)^2 + \big(\frac{y_1 - y_2}{2}\big)^2 = \frac{y_1^2 + y_2^2}{2}$, so
$$f_{\mathbf Y}(\mathbf y) = \frac12\cdot\frac{1}{2\pi}e^{-(y_1^2 + y_2^2)/4} = \frac{1}{\sqrt{4\pi}}e^{-y_1^2/4}\cdot\frac{1}{\sqrt{4\pi}}e^{-y_2^2/4}.$$
The density factorises: the sum and difference are **independent** $\mathcal N(0,2)$ variables. (Only for normals is this true; L20 explains why.)

**B2 (last year's Quiz 2 Q4).** $(X_1, X_2)$ uniform on the unit square, $Y_1 = X_1 - X_2$, $Y_2 = X_1 + X_2$. Find $f_{\mathbf Y}$.

*Solution.* $X_1 = \frac{Y_1 + Y_2}{2}$, $X_2 = \frac{Y_2 - Y_1}{2}$, $|J| = \frac12$. So $f_{\mathbf Y} = \frac12$ wherever $0<\frac{y_1 + y_2}{2}<1$ and $0<\frac{y_2 - y_1}{2}<1$, that is,
$$|y_1|<y_2\ \ (0<y_2\le1),\qquad|y_1|<2 - y_2\ \ (1<y_2<2).$$
The support is the square with corners $(0,0), (1,1), (0,2), (-1,1)$: the unit square rotated by $45°$ and scaled by $\sqrt2$, which has area 2 (so the density $\frac12$ integrates to 1). *Cross-check:* integrating out $y_1$ gives $f_{Y_2}(y_2) = y_2$ on $(0,1]$ and $2 - y_2$ on $(1,2)$, the triangular density of a sum of two uniforms (L13 convolution).

**B3 (last year's Tutorial 9 Q2): a non-linear map.** $X_1\sim\mathcal U[1,2]$ and, independently, $X_2$ has density $\frac38x_2^2$ on $[0,2]$. Find the joint pdf of $Y_1 = X_1^2$, $Y_2 = X_1 + X_2$.

*Solution.* On the support $X_1>0$, so the map is invertible: $X_1 = \sqrt{Y_1}$ and $X_2 = Y_2 - \sqrt{Y_1}$.
$$J = \det\begin{bmatrix}\frac{1}{2\sqrt{y_1}} & 0\\ -\frac{1}{2\sqrt{y_1}} & 1\end{bmatrix} = \frac{1}{2\sqrt{y_1}} .$$
$$f_{\mathbf Y}(y_1, y_2) = f_{X_1}(\sqrt{y_1})\,f_{X_2}(y_2 - \sqrt{y_1})\cdot\frac{1}{2\sqrt{y_1}} = \frac{3(y_2 - \sqrt{y_1})^2}{16\sqrt{y_1}}$$
on the support $1\le y_1\le4$ (from $1\le x_1\le2$) and $\sqrt{y_1}\le y_2\le\sqrt{y_1} + 2$ (from $0\le x_2\le2$), and 0 elsewhere.

**B4 (last year's Tutorial 9 Q1).** $X_1, X_2$ independent with $E[X_1] = 2$, $\operatorname{Var}(X_1) = 4$, $E[X_2] = 5$, $\operatorname{Var}(X_2) = 1$. $\mathbf Y = A\mathbf X$ with $A = \begin{bmatrix}1 & 2\\3 & -1\end{bmatrix}$. Find $E[\mathbf Y]$ and $C_{\mathbf Y}$.

*Solution.* $E[\mathbf Y] = A\begin{bmatrix}2\\5\end{bmatrix} = \begin{bmatrix}12\\1\end{bmatrix}$. With $C_{\mathbf X} = \operatorname{diag}(4,1)$:
$$AC_{\mathbf X} = \begin{bmatrix}4 & 2\\12 & -1\end{bmatrix},\qquad C_{\mathbf Y} = AC_{\mathbf X}A^T = \begin{bmatrix}4 & 2\\12 & -1\end{bmatrix}\begin{bmatrix}1 & 3\\2 & -1\end{bmatrix} = \begin{bmatrix}8 & 10\\10 & 37\end{bmatrix}.$$
*Check one entry by hand:* $\operatorname{Var}(Y_2) = \operatorname{Var}(3X_1 - X_2) = 9\cdot4 + 1 = 37$. ✓

**B5 (last year's Tutorial 9 Q7).** Show $\operatorname{Var}(a^T\mathbf X) = a^T\Sigma a$ and $\operatorname{Cov}(a^T\mathbf X, b^T\mathbf X) = a^T\Sigma b$; evaluate for $\Sigma = \begin{bmatrix}4 & 1\\1 & 2\end{bmatrix}$, $a = (2,-1)^T$, $b = (1,3)^T$.

*Solution.* Both are the $1\times1$ and off-diagonal entries of $C_{\mathbf Y}$ for $\mathbf Y = \begin{bmatrix}a^T\\b^T\end{bmatrix}\mathbf X$, by slide 4's HW. Numerically, $\Sigma a = (7, 0)^T$, so $a^T\Sigma a = 14$; $\Sigma b = (7, 7)^T$, so $a^T\Sigma b = 14 - 7 = 7$.

**B6 (last year's HW9 Q7 and Q8).** $E[\mathbf X] = (1,2)^T$, $C_{\mathbf X} = \begin{bmatrix}4 & 1\\1 & 2\end{bmatrix}$.
(a) $Y_1 = 2X_1 - X_2 + 3$, $Y_2 = X_1 + 4X_2$. (b) $Y_1 = X_1 + 2X_2$, $Y_2 = 3X_1 - X_2$. Find the means and covariance matrices.

*Solution.* (a) $E[\mathbf Y] = (2 - 2 + 3,\ 1 + 8) = (3, 9)$. With rows $a_1 = (2,-1)$, $a_2 = (1, 4)$: $\Sigma a_1 = (7,0)$ and $\Sigma a_2 = (8, 9)$. So $\operatorname{Var}(Y_1) = 14$, $\operatorname{Var}(Y_2) = 8 + 36 = 44$, $\operatorname{Cov} = a_1^T\Sigma a_2 = 16 - 9 = 7$:
$$C_{\mathbf Y} = \begin{bmatrix}14 & 7\\7 & 44\end{bmatrix}.$$
(The $+3$ changes the mean only.)
(b) $E[\mathbf Y] = (5, 1)$. Rows $(1,2)$ and $(3,-1)$: $\Sigma(1,2)^T = (6,5)$ and $\Sigma(3,-1)^T = (11, 1)$. So $\operatorname{Var}(Y_1) = 6 + 10 = 16$, $\operatorname{Var}(Y_2) = 33 - 1 = 32$, $\operatorname{Cov} = 11 + 2 = 13$:
$$C_{\mathbf Y} = \begin{bmatrix}16 & 13\\13 & 32\end{bmatrix}.$$

**B7 (last year's HW9 Q1).** $\mathbf Y = (Y_1, \dots, Y_4)$ with mean $(5, -1, 4, -3)$ and covariance $\operatorname{diag}(4, 5, 4, 5)$. $B = \begin{bmatrix}2 & -1 & 0 & 1\\ -1 & 2 & -1 & 0\\ 0 & 1 & 1 & -2\end{bmatrix}$. (a) $E[B\mathbf Y]$. (b) $\operatorname{Cov}(B\mathbf Y)$. (c) Which pairs have zero covariance?

*Solution.* (a) $B\mu = (10 + 1 - 3,\ -5 - 2 - 4,\ -1 + 4 + 6) = (8, -11, 9)$.
(b) With a diagonal $\Sigma$, entry $(i,j)$ of $B\Sigma B^T$ is $\sum_kB_{ik}B_{jk}\sigma_k^2$:
$$B\Sigma B^T = \begin{bmatrix}26 & -18 & -15\\ -18 & 28 & 6\\ -15 & 6 & 29\end{bmatrix}.$$
For example, $(1,1) = 4\cdot4 + 1\cdot5 + 0 + 1\cdot5 = 26$ and $(1,2) = (2)(-1)4 + (-1)(2)5 = -18$.
(c) None: every off-diagonal entry is non-zero.

**B8 (last year's HW9 Q9).** $\mu = (1,-1)^T$ and $\Sigma = \begin{bmatrix}3 & -1\\-1 & 2\end{bmatrix}$. Find $E[(X_1 + X_2)^2]$.

*Solution.* With $a = (1,1)^T$: $E[(a^T\mathbf X)^2] = \operatorname{Var}(a^T\mathbf X) + (a^T\mu)^2 = (3 + 2 - 2) + 0^2 = 3$.

**B9 (probabilitycourse 6.1.5): a covariance matrix from a joint pdf.** $f_{X,Y}(x,y) = \frac32x^2 + y$ on $(0,1)^2$. Find $C_{\mathbf U}$ for $\mathbf U = (X, Y)^T$.

*Solution.* Marginals: $f_X(x) = \frac32x^2 + \frac12$ and $f_Y(y) = y + \frac12$. Moments: $E[X] = \frac58$, $E[X^2] = \frac{7}{15}$, $E[Y] = \frac7{12}$, $E[Y^2] = \frac5{12}$, and by LOTUS $E[XY] = \int_0^1\int_0^1xy\big(\frac32x^2 + y\big)\,dx\,dy = \frac{17}{48}$. So
$$C_{\mathbf U} = \begin{bmatrix}\frac{7}{15} - \frac{25}{64} & \frac{17}{48} - \frac{35}{96}\\[2pt] \cdot & \frac5{12} - \frac{49}{144}\end{bmatrix} = \begin{bmatrix}\frac{73}{960} & -\frac1{96}\\[2pt] -\frac1{96} & \frac{11}{144}\end{bmatrix}.$$

**B10 (last year's Tutorial 9 Q8): the law of total covariance.** (a) $E[\mathbf Y] = E\big[E[\mathbf Y\mid\mathbf X]\big]$. (b) $\operatorname{Cov}(\mathbf Y) = E[\Sigma_{\mathbf Y\mid\mathbf X}] + \operatorname{Cov}(\mu_{\mathbf Y\mid\mathbf X})$. (c) For $\mathbf Y = A\mathbf X + \mathbf Z$ with $\mathbf X, \mathbf Z$ independent, zero mean, covariances $\Sigma_X, \Sigma_Z$: find $E[\mathbf Y]$ and $\operatorname{Cov}(\mathbf Y)$; evaluate for $A = \begin{bmatrix}1 & 2\\0 & 1\end{bmatrix}$, $\Sigma_X = \begin{bmatrix}4 & 1\\1 & 3\end{bmatrix}$, $\Sigma_Z = \operatorname{diag}(1, 2)$.

*Solution.* (a) Iterated expectation, applied to each component. (b) This is the vector form of the law of total variance from L12: write $\mathbf Y - E\mathbf Y = (\mathbf Y - \mu_{\mathbf Y|\mathbf X}) + (\mu_{\mathbf Y|\mathbf X} - E\mathbf Y)$, take the outer product and expectations; the cross terms vanish because $E[\mathbf Y - \mu_{\mathbf Y|\mathbf X}\mid\mathbf X] = \mathbf 0$. (c) Given $\mathbf X$, $\mu_{\mathbf Y|\mathbf X} = A\mathbf X$ and $\Sigma_{\mathbf Y|\mathbf X} = \Sigma_Z$. So $E[\mathbf Y] = \mathbf 0$ and $\operatorname{Cov}(\mathbf Y) = \Sigma_Z + A\Sigma_XA^T$. Numerically $A\Sigma_X = \begin{bmatrix}6 & 7\\1 & 3\end{bmatrix}$ and $A\Sigma_XA^T = \begin{bmatrix}20 & 7\\7 & 3\end{bmatrix}$, so
$$\operatorname{Cov}(\mathbf Y) = \begin{bmatrix}21 & 7\\7 & 5\end{bmatrix}.$$

**B11 (probabilitycourse Ch. 14, Example 8): the Box–Muller method, proved with the Jacobian.** Let $U_1, U_2$ be independent $\mathcal U(0,1)$ and
$$Z_1 = \sqrt{-2\ln U_1}\,\cos(2\pi U_2),\qquad Z_2 = \sqrt{-2\ln U_1}\,\sin(2\pi U_2).$$
Show that $Z_1, Z_2$ are independent $\mathcal N(0,1)$. (This is how computers make normal samples, which the inverse transform of L15 cannot do in closed form.)

*Solution.* Think in polar coordinates: the radius is $R = \sqrt{-2\ln U_1}$ and the angle is $\Theta = 2\pi U_2$. The inverse map is
$$u_1 = e^{-(z_1^2 + z_2^2)/2},\qquad u_2 = \frac{1}{2\pi}\theta(z_1, z_2),$$
where $\theta$ is the angle of the point $(z_1, z_2)$. Using $\frac{\partial\theta}{\partial z_1} = -\frac{z_2}{r^2}$ and $\frac{\partial\theta}{\partial z_2} = \frac{z_1}{r^2}$ with $r^2 = z_1^2 + z_2^2$:
$$J = \det\begin{bmatrix}-z_1u_1 & -z_2u_1\\ -\frac{z_2}{2\pi r^2} & \frac{z_1}{2\pi r^2}\end{bmatrix} = -\frac{u_1(z_1^2 + z_2^2)}{2\pi r^2} = -\frac{u_1}{2\pi}.$$
Since $f_{\mathbf U} = 1$ on the unit square,
$$f_{\mathbf Z}(z_1, z_2) = 1\cdot|J| = \frac{1}{2\pi}e^{-(z_1^2 + z_2^2)/2} = \varphi(z_1)\,\varphi(z_2).$$
The joint density factorises into two standard normal densities, so $Z_1, Z_2$ are independent $\mathcal N(0,1)$. $\square$

**B12: the density of a sum by the "extra variable" trick.** $X_1, X_2$ i.i.d. Exp$(\lambda)$. Find the density of $S = X_1 + X_2$ with the Jacobian method.

*Solution.* Add $T = X_1$. Then $X_1 = T$, $X_2 = S - T$, and $J = \det\begin{bmatrix}0 & 1\\1 & -1\end{bmatrix} = -1$, so $|J| = 1$ and
$$f_{S,T}(s,t) = \lambda e^{-\lambda t}\,\lambda e^{-\lambda(s - t)} = \lambda^2e^{-\lambda s},\qquad0<t<s .$$
Integrate out $t$: $f_S(s) = \int_0^s\lambda^2e^{-\lambda s}\,dt = \lambda^2se^{-\lambda s}$, the Gamma$(2,\lambda)$ density (as L14 found with MGFs, and L13 with the convolution formula, which this method reproduces in general).



# Lecture 20: Gaussian random vectors (Deck C, slides 9 to 19)

**Big picture.** The normal distribution is the most important single distribution (the CLT of L18 explains why). This lecture builds its vector version, the **multivariate Gaussian** $\mathcal N(\boldsymbol\mu, \Sigma)$. The whole lecture rests on one idea:

$$\text{every Gaussian vector is an affine function of independent standard normals: }\ \mathbf X = A\mathbf Z + \boldsymbol\mu .$$

From that one idea, and the L19 tools ($C_{A\mathbf X + \mathbf b} = AC_{\mathbf X}A^T$ and the Jacobian), we get the density, the fact that linear maps keep vectors Gaussian, and the two properties that make Gaussians so useful: **marginals and conditionals of a Gaussian vector are again Gaussian**, with explicit formulas.

## Part A: the slides

### Slide 9/36: Recap

> **On the slide.** We looked at $n$-length random vectors $\mathbf X$, which are essentially multivariate random variables. Its CDF/pdf is simply the joint CDF/pdf of the components. $E[\mathbf X] = [E[X_1], \dots, E[X_n]]$, and $C_{\mathbf X}$ is the covariance matrix. *Let $\mathbf Y = G(\mathbf X)$ where $G:\mathbb R^n\to\mathbb R^n$ is continuous and invertible with continuous partial derivatives. Let $H$ denote its inverse. Then $f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))|J|$ where $J$ is the determinant of the Jacobian matrix.* If $\mathbf Y = \mathbf A\mathbf X + \mathbf b$, then $C_{\mathbf Y} = AC_{\mathbf X}A^T$ and
> $$f_{\mathbf Y}(\mathbf y) = \frac{1}{|\det(A)|}f_{\mathbf X}\big(A^{-1}(\mathbf y - \mathbf b)\big).$$

All of this is proved in L19 (slides 4, 7 and 8). The last formula is the engine of this lecture: apply it with $\mathbf X$ replaced by a standard normal vector.

### Slide 10/36: The standard normal vector

> **On the slide.** An $n$-length random vector $\mathbf Z$ is called a standard normal vector if its components $Z_i$ are independent and standard normal. **What is $E[\mathbf Z]$ and $C_{\mathbf Z}$?** Show that the pdf is given by
> $$f_{\mathbf Z}(\mathbf z) = \frac{1}{(2\pi)^{n/2}}e^{-\frac12\mathbf z^T\mathbf z}.$$

**The blue question.** Each $Z_i$ has mean 0 and variance 1, and independent components have zero covariance. So
$$E[\mathbf Z] = \mathbf 0,\qquad C_{\mathbf Z} = I_n\ \ (\text{the } n\times n \text{ identity}).$$

**The pdf.** Independent components multiply:
$$f_{\mathbf Z}(\mathbf z) = \prod_{i=1}^n\frac{1}{\sqrt{2\pi}}e^{-z_i^2/2} = \frac{1}{(2\pi)^{n/2}}\exp\Big(-\frac12\sum_{i=1}^nz_i^2\Big) = \frac{1}{(2\pi)^{n/2}}e^{-\frac12\mathbf z^T\mathbf z},$$
because $\mathbf z^T\mathbf z = z_1^2 + \dots + z_n^2 = \|\mathbf z\|^2$.

**Worth noticing.** $f_{\mathbf Z}$ depends on $\mathbf z$ only through its length $\|\mathbf z\|$. So the density is the same in every direction: rotating a standard normal vector gives a standard normal vector again. (If $Q$ is orthogonal, $QQ^T = I$, then $Q\mathbf Z$ has covariance $QIQ^T = I$, and by slide 14 below it is again standard normal.)

### Slide 11/36: Building general Gaussians from $\mathbf Z$

> **On the slide.** Now suppose $\mathbf X = A\mathbf Z + \boldsymbol\mu$. What is $E[\mathbf X]$ and $C_{\mathbf X}$? $E[\mathbf X] = \boldsymbol\mu$ and $C_{\mathbf X} = AA^T$. Note that $A$ can have dimension $n\times l$, in which case $\mathbf Z$ is an $l$-length standard normal. What is $f_{\mathbf X}(\mathbf x)$?

**Why.** By L19 slides 2 and 4, $E[\mathbf X] = AE[\mathbf Z] + \boldsymbol\mu = \boldsymbol\mu$ and $C_{\mathbf X} = AC_{\mathbf Z}A^T = AIA^T = AA^T$.

**The shape of $A$.** $A$ does not have to be square.

- $l<n$ (fewer sources of randomness than components): $C_{\mathbf X} = AA^T$ has rank at most $l$, so it is singular. Then $\mathbf X$ lives on a lower-dimensional plane in $\mathbb R^n$ and has **no joint pdf**. Example: $\mathbf X = (Z, 2Z)$ lies on the line $x_2 = 2x_1$. This is still a perfectly good Gaussian vector (a *degenerate* one). Last year's HW9 Q4 and Q6 (Part B) produce such vectors.
- $l = n$ with $A$ invertible: the usual case, with a pdf (slide 12).

### Slide 12/36: The multivariate Gaussian density

> **On the slide.** What is $f_{\mathbf X}(\mathbf x)$?
> $$f_{\mathbf X}(\mathbf x) = \frac{1}{|\det(A)|}f_{\mathbf Z}\big(A^{-1}(\mathbf x - \boldsymbol\mu)\big) = \frac{1}{(2\pi)^{n/2}\sqrt{\det(C_{\mathbf X})}}e^{-\frac12(\mathbf x - \boldsymbol\mu)^TC_{\mathbf X}^{-1}(\mathbf x - \boldsymbol\mu)}$$
> Henceforth we will use the notation $\Sigma$ to represent $C_{\mathbf X}$. *Definition 1: $\mathbf X$ is multivariate Gaussian with mean vector $\mu$ and covariance matrix $\Sigma$ (denoted by $\mathbf X\sim\mathcal N(\mu, \Sigma)$) if for some $A$ and $\boldsymbol\mu$, it can be written as $\mathbf X = A\mathbf Z + \boldsymbol\mu$ where $\mathbf Z$ is a standard normal vector and $\Sigma = AA^T$.*

**Filling in the red step** ($A$ square and invertible). The first line is the affine formula of slide 9 with $\mathbf b = \boldsymbol\mu$. Put $\mathbf v = \mathbf x - \boldsymbol\mu$. Two facts turn it into the second line.

*The exponent.* Using $(A^{-1})^T = (A^T)^{-1}$ and $(A^T)^{-1}A^{-1} = (AA^T)^{-1}$:
$$\big(A^{-1}\mathbf v\big)^T\big(A^{-1}\mathbf v\big) = \mathbf v^T(A^T)^{-1}A^{-1}\mathbf v = \mathbf v^T(AA^T)^{-1}\mathbf v = \mathbf v^T\Sigma^{-1}\mathbf v .$$

*The constant.* $\det\Sigma = \det(A)\det(A^T) = (\det A)^2$, so $|\det A| = \sqrt{\det\Sigma}$.

Together:
$$\boxed{f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}\exp\Big(-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)\Big)}$$

**Reading the formula.**

- With $n = 1$ and $\Sigma = \sigma^2$ it is the familiar $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x - \mu)^2/(2\sigma^2)}$. The vector formula replaces "divide by $\sigma^2$" with "multiply by $\Sigma^{-1}$".
- The density depends on $A$ **only through** $\Sigma = AA^T$. Many matrices give the same $\Sigma$ (for example $A$ and $AQ$ for any orthogonal $Q$), and they all give the same distribution. So the notation $\mathcal N(\boldsymbol\mu, \Sigma)$ makes sense: **a Gaussian vector is completely determined by its mean vector and covariance matrix.**
- The formula needs $\Sigma$ invertible ($\det\Sigma>0$). The degenerate case of slide 11 is covered by Definition 1 but has no pdf.
- **Check with L19 slide 1:** $\mathbf X = (Z_1, Z_1 + Z_2)$ has $A = \begin{bmatrix}1 & 0\\1 & 1\end{bmatrix}$, $\Sigma = \begin{bmatrix}1 & 1\\1 & 2\end{bmatrix}$, $\det\Sigma = 1$, $\Sigma^{-1} = \begin{bmatrix}2 & -1\\-1 & 1\end{bmatrix}$. The boxed formula gives $\frac{1}{2\pi}e^{-\frac12(2x_1^2 - 2x_1x_2 + x_2^2)}$, the same as the Jacobian answer there. ✓

### Slide 13/36: Three equivalent definitions

> **On the slide.** The following are equivalent definitions (without proof):
> 1. $\mathbf X\sim\mathcal N(\mu, \Sigma)$ if for some $A$ and $\boldsymbol\mu$, it can be written as $\mathbf X = A\mathbf Z + \boldsymbol\mu$.
> 2. $\mathbf X\sim\mathcal N(\mu, \Sigma)$ if it has the pdf $f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det(\Sigma)}}e^{-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)}$.
> 3. $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ iff for all vectors $\mathbf a\in\mathbb R^n$, it turns out that $\mathbf a^T\mathbf X$ is univariate Gaussian $\mathcal N(a^T\boldsymbol\mu, a^T\Sigma a)$.
>
> For equivalent definitions see https://en.wikipedia.org/wiki/Multivariate_normal_distribution

**How to use each one.**

| Definition | Use it to... |
|---|---|
| 1. $\mathbf X = A\mathbf Z + \boldsymbol\mu$ | **build** or **simulate** a Gaussian vector; prove things by reducing to independent $Z$'s |
| 2. the pdf | compute probabilities and conditional densities; recognise a Gaussian by the form of its density |
| 3. every linear combination is normal | **check** that something is (or is not) a Gaussian vector; get the distribution of any $\mathbf a^T\mathbf X$ at once |

Definition 3 is the one in last year's HW9 Q2 and Tutorial 9 Q3 ("$X$ and $Y$ are bivariate normal if $aX + bY$ is normal for all $a$ and $b$"). It counts a constant as a normal with variance 0, and it is the most useful in exams: for example $X_1 - 3X_2 + X_3\sim\mathcal N(\mathbf a^T\boldsymbol\mu, \mathbf a^T\Sigma\mathbf a)$ with $\mathbf a = (1,-3,1)^T$, with no integration at all.

**Why they agree (sketch, not needed for the exam).**

- (1 ⇒ 3) $\mathbf a^T\mathbf X = (A^T\mathbf a)^T\mathbf Z + \mathbf a^T\boldsymbol\mu$ is a linear combination of independent normals plus a constant, so it is normal (L14 slide 5, by MGFs). Its mean and variance follow from L19.
- (1 ⇒ 2) This is slide 12, when $A$ is invertible.
- (2 ⇒ 1) Take $A = \Sigma^{1/2}$, the symmetric square root, and check with the Jacobian that $\mathbf Z = A^{-1}(\mathbf X - \boldsymbol\mu)$ has the pdf of slide 10.
- (3 ⇒ 1) By definition 3, $\mathbf s^T\mathbf X$ is normal for every $\mathbf s$, so the multivariate MGF is $E[e^{\mathbf s^T\mathbf X}] = e^{\mathbf s^T\boldsymbol\mu + \frac12\mathbf s^T\Sigma\mathbf s}$ (slide 14 below). That is also the MGF of $A\mathbf Z + \boldsymbol\mu$ for any $A$ with $AA^T = \Sigma$. Equal MGFs give equal distributions.

### Slide 14/36: Affine maps preserve Gaussianity

> **On the slide.** Suppose $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$; then what can we say about $\mathbf Y = \mathbf A\mathbf X + \mathbf b$? Is it a Gaussian vector? Easy to see that $E[\mathbf Y] = AE[\mathbf X] + b$ and $C_{\mathbf Y} = A\Sigma A^T$. Like in the univariate case, we can use MGF (for multivariate MGF see Bertsekas) to show the following. *Suppose $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$. Now consider $\mathbf Y = \mathbf A\mathbf X + \mathbf b$. Then we have $\mathbf Y\sim\mathcal N(AE[\mathbf X] + b, A\Sigma A^T)$.*

$$\boxed{\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)\ \Longrightarrow\ A\mathbf X + \mathbf b\sim\mathcal N\big(A\boldsymbol\mu + \mathbf b,\ A\Sigma A^T\big)}$$

The mean and covariance come free from L19. The new content is that $\mathbf Y$ is **still Gaussian**. Here is the MGF proof the slide points to. It is last year's HW9 Q10 and Tutorial 9 Q4.

**The multivariate MGF.** For a random vector, $M_{\mathbf X}(\mathbf s) = E\big[e^{\mathbf s^T\mathbf X}\big]$ for $\mathbf s\in\mathbb R^n$. Just as in L14, if it is finite near $\mathbf s = \mathbf 0$ it **determines the joint distribution** (Bertsekas Section 4.4, transforms of joint distributions).

**Step 1 (HW9 Q10): the MGF of $\mathcal N(\boldsymbol\mu, \Sigma)$.** Write $\mathbf X = A\mathbf Z + \boldsymbol\mu$ and put $\mathbf u = A^T\mathbf s$. Then $\mathbf s^T\mathbf X = \mathbf u^T\mathbf Z + \mathbf s^T\boldsymbol\mu$, and by independence and the 1D normal MGF $E[e^{uZ}] = e^{u^2/2}$:
$$M_{\mathbf X}(\mathbf s) = e^{\mathbf s^T\boldsymbol\mu}\prod_{i}E\big[e^{u_iZ_i}\big] = e^{\mathbf s^T\boldsymbol\mu}e^{\frac12\sum_iu_i^2} = e^{\mathbf s^T\boldsymbol\mu + \frac12\mathbf u^T\mathbf u} .$$
Since $\mathbf u^T\mathbf u = \mathbf s^TAA^T\mathbf s = \mathbf s^T\Sigma\mathbf s$:
$$\boxed{M_{\mathbf X}(\mathbf s) = \exp\Big(\mathbf s^T\boldsymbol\mu + \frac12\mathbf s^T\Sigma\mathbf s\Big)}$$
(This is the 1D formula $e^{\mu t + \sigma^2t^2/2}$ with $t$ replaced by the vector $\mathbf s$.)

**Step 2 (Tutorial 9 Q4): the MGF of $\mathbf Y = A\mathbf X + \mathbf b$.** Since $\mathbf s^T\mathbf Y = (A^T\mathbf s)^T\mathbf X + \mathbf s^T\mathbf b$,
$$M_{\mathbf Y}(\mathbf s) = e^{\mathbf s^T\mathbf b}M_{\mathbf X}(A^T\mathbf s) = \exp\Big(\mathbf s^T(A\boldsymbol\mu + \mathbf b) + \frac12\mathbf s^T(A\Sigma A^T)\mathbf s\Big).$$
This is the MGF of $\mathcal N(A\boldsymbol\mu + \mathbf b, A\Sigma A^T)$, so by uniqueness that is the distribution of $\mathbf Y$. $\square$

$A$ can be any $m\times n$ matrix here. Taking $A$ to be a row vector $\mathbf a^T$ gives definition 3 of slide 13. Taking $A$ to pick out some of the coordinates gives the marginalization property of the next slide.

### Slide 15/36: Marginalization and conditioning

> **On the slide.** Let $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ and partition $\mathbf X$ as $[\mathbf X_1, \mathbf X_2]^T$, where $\mathbf X_1$ is $m\times1$ and $\mathbf X_2$ is $(n - m)\times1$. We similarly have $\boldsymbol\mu = [\boldsymbol\mu_1, \boldsymbol\mu_2]^T$ and $\Sigma = \begin{bmatrix}\Sigma_{11} & \Sigma_{12}\\ \Sigma_{21} & \Sigma_{22}\end{bmatrix}$, where $\Sigma_{11}$ is an $m\times m$ matrix and so on. **Marginalization property:** the $m$-dimensional marginal distribution of $\mathbf X_1$ is $\mathcal N(\boldsymbol\mu_1, \Sigma_{11})$ and $\mathbf X_2$ is $\mathcal N(\boldsymbol\mu_2, \Sigma_{22})$. **Conditioning property:** the $m$-dimensional conditional distribution of $\mathbf X_1$ given $\mathbf X_2 = \mathbf x_2$ is
> $$\mathcal N\big(\boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\mathbf x_2 - \boldsymbol\mu_2),\ \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\big).$$
> Note the decrease in variance, which does not depend on $\mathbf x_2$.

The slide says "without proof"; here are both proofs, since the second is last year's Tutorial 9 Q6.

**Marginalization.** $\mathbf X_1 = [\,I_m\ \ 0\,]\,\mathbf X$. By slide 14 it is Gaussian with mean $[\,I_m\ \ 0\,]\boldsymbol\mu = \boldsymbol\mu_1$ and covariance $[\,I_m\ \ 0\,]\,\Sigma\,[\,I_m\ \ 0\,]^T = \Sigma_{11}$. In words: **to get a marginal, just delete the rows and columns of the other variables.** For example, if $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ in $\mathbb R^3$, then $X_2\sim\mathcal N(\mu_2, \Sigma_{22})$ and $(X_1, X_3)$ has mean $(\mu_1, \mu_3)$ and covariance $\begin{bmatrix}\Sigma_{11} & \Sigma_{13}\\ \Sigma_{31} & \Sigma_{33}\end{bmatrix}$ (entries of the $3\times3$ matrix).

**Conditioning: the "remove what $\mathbf X_2$ explains" proof.** Let $B = \Sigma_{12}\Sigma_{22}^{-1}$ and define the residual
$$\mathbf W = \mathbf X_1 - B\mathbf X_2 .$$

1. *$(\mathbf W, \mathbf X_2)$ is a Gaussian vector,* since it is a linear function of $\mathbf X$ (slide 14).
2. *$\mathbf W$ and $\mathbf X_2$ are uncorrelated:* $\operatorname{Cov}(\mathbf W, \mathbf X_2) = \Sigma_{12} - B\Sigma_{22} = \Sigma_{12} - \Sigma_{12} = 0$.
3. *So they are independent.* For a Gaussian vector, zero cross-covariance makes the MGF factor: with block-diagonal covariance, $\exp\big(\mathbf s_1^T\boldsymbol\mu_W + \mathbf s_2^T\boldsymbol\mu_2 + \frac12\mathbf s_1^T\Sigma_W\mathbf s_1 + \frac12\mathbf s_2^T\Sigma_{22}\mathbf s_2\big) = M_{\mathbf W}(\mathbf s_1)M_{\mathbf X_2}(\mathbf s_2)$, which is the MGF of an independent pair.
4. *Mean and covariance of $\mathbf W$:* $E[\mathbf W] = \boldsymbol\mu_1 - B\boldsymbol\mu_2$, and expanding $\operatorname{Cov}(\mathbf X_1 - B\mathbf X_2)$,
$$\Sigma_W = \Sigma_{11} - B\Sigma_{21} - \Sigma_{12}B^T + B\Sigma_{22}B^T = \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21},$$
since the last three terms are each $\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$ (using $\Sigma_{21} = \Sigma_{12}^T$ and $\Sigma_{22}$ symmetric).
5. *Condition.* $\mathbf X_1 = \mathbf W + B\mathbf X_2$. Given $\mathbf X_2 = \mathbf x_2$, the term $B\mathbf x_2$ is a constant and $\mathbf W$ keeps its distribution (it is independent of $\mathbf X_2$). So
$$\mathbf X_1\mid\mathbf X_2 = \mathbf x_2\ \sim\ \mathcal N\big(\boldsymbol\mu_1 - B\boldsymbol\mu_2 + B\mathbf x_2,\ \Sigma_W\big) = \mathcal N\big(\boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\mathbf x_2 - \boldsymbol\mu_2),\ \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\big).\ \square$$

**Reading the formula.**

- **The conditional mean is linear in $\mathbf x_2$.** It starts at the prior mean $\boldsymbol\mu_1$ and moves by $\Sigma_{12}\Sigma_{22}^{-1}$ times the "surprise" $\mathbf x_2 - \boldsymbol\mu_2$. With one variable each, this is $\mu_1 + \frac{\sigma_{12}}{\sigma_{22}}(x_2 - \mu_2)$, the regression line.
- **The conditional covariance is smaller** (we subtract the PSD matrix $\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$). Observing $\mathbf X_2$ reduces our uncertainty about $\mathbf X_1$.
- **The note on the slide:** the reduction is the same whatever value $\mathbf x_2$ we observe. This is special to Gaussians. For most other joint distributions, the conditional variance depends on the observed value.
- If $\Sigma_{12} = 0$, then $\mathbf X_1\mid\mathbf X_2\sim\mathcal N(\boldsymbol\mu_1, \Sigma_{11})$, the marginal: **uncorrelated parts of a Gaussian vector are independent.**

### Slide 16/36: Towards bivariate Gaussians

> **On the slide.** Suppose $X_1\sim\mathcal N(\mu_1, \sigma_1^2)$ and $X_2\sim\mathcal N(\mu_2, \sigma_2^2)$. Also suppose $X_1$ and $X_2$ are independent. For $\mathbf x = [x_1, x_2]^T$ [the slide prints $[x_2, x_2]^T$], we have
> $$f_{\mathbf X}(\mathbf x) = f_{X_1}(x_1)f_{X_2}(x_2) = \frac{1}{2\pi\sigma_1\sigma_2}e^{-\left(\frac{(x_1 - \mu_1)^2}{2\sigma_1^2} + \frac{(x_2 - \mu_2)^2}{2\sigma_2^2}\right)} = \frac{1}{(2\pi)\sqrt{\det(\Sigma)}}e^{-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)}$$
> where $\Sigma = \begin{bmatrix}\sigma_1^2 & 0\\0 & \sigma_2^2\end{bmatrix}$, and hence $\mathbf X$ is bivariate Gaussian. In general, a vector composed of independent Gaussians is a Gaussian vector. The converse is not true: a vector of dependent Gaussian components need not be a Gaussian vector (EX 5.35 in probabilitycourse.com).

**Checking the last equality.** $\det\Sigma = \sigma_1^2\sigma_2^2$, so $\sqrt{\det\Sigma} = \sigma_1\sigma_2$. And $\Sigma^{-1} = \operatorname{diag}(1/\sigma_1^2, 1/\sigma_2^2)$, so
$$\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu) = \frac{(x_1 - \mu_1)^2}{2\sigma_1^2} + \frac{(x_2 - \mu_2)^2}{2\sigma_2^2}.\ ✓$$
This matches the pdf of slide 13 with $n = 2$, so $\mathbf X$ is a Gaussian vector.

**The counterexample: Gaussian components, but not a Gaussian vector** (probabilitycourse 5.3.2; the slide calls it EX 5.35). Let $X\sim\mathcal N(0,1)$ and, independently, flip a fair coin $W$. Set $Y = X$ on heads and $Y = -X$ on tails.

- $Y\sim\mathcal N(0,1)$: conditioning on the coin, $F_Y(y) = \frac12\Phi(y) + \frac12P(-X\le y) = \frac12\Phi(y) + \frac12\Phi(y) = \Phi(y)$, since $-X\sim\mathcal N(0,1)$ too.
- But $X + Y$ is $2X$ on heads and $0$ on tails. So $P(X + Y = 0) = \frac12$: not a normal distribution (a normal with positive variance gives probability 0 to a point, and $X + Y$ is not a constant either). Definition 3 fails with $\mathbf a = (1,1)$, so $(X, Y)$ is **not** a Gaussian vector.
- Also $\operatorname{Cov}(X, Y) = E[XY] = \frac12E[X^2] - \frac12E[X^2] = 0$. So $X, Y$ are uncorrelated and each normal, yet clearly dependent ($|Y| = |X|$ always).

**The lesson:** "uncorrelated implies independent" holds for **jointly** Gaussian variables (slide 15), not merely for variables that are each Gaussian. Exam questions test exactly this.

### Slide 17/36: Bivariate Gaussians

> **On the slide.** In general, $X_1$ and $X_2$ need not be independent, in which case we have a general bivariate Gaussian $\mathbf X = [X_1, X_2]^T\sim\mathcal N(\boldsymbol\mu, \Sigma)$, where $\mu = [\mu_1, \mu_2]^T$ and $\Sigma = \begin{bmatrix}\sigma_{11} & \sigma_{12}\\ \sigma_{21} & \sigma_{22}\end{bmatrix}$. **Show that bivariate Gaussian is closed under marginalization, i.e., $X_1\sim\mathcal N(\mu_1, \sigma_{11})$ and $X_2\sim\mathcal N(\mu_2, \sigma_{22})$. Show that bivariate Gaussian is closed under conditioning (for proof see Theorem 5.4, probabilitycourse.com).** This means that given $X_2 = x_2$, one can show that $f_{X_1|X_2}(x_1|x_2)$ is Gaussian. These two properties make multivariate Gaussians efficient modelling tools and handy in Gaussian processes and Bayesian optimization.

**The bivariate density written out.** Write $\sigma_{11} = \sigma_1^2$, $\sigma_{22} = \sigma_2^2$ and $\sigma_{12} = \sigma_{21} = \rho\sigma_1\sigma_2$, where $\rho$ is the correlation coefficient, $-1<\rho<1$. Then
$$\det\Sigma = \sigma_1^2\sigma_2^2(1 - \rho^2),\qquad\Sigma^{-1} = \frac{1}{\sigma_1^2\sigma_2^2(1 - \rho^2)}\begin{bmatrix}\sigma_2^2 & -\rho\sigma_1\sigma_2\\ -\rho\sigma_1\sigma_2 & \sigma_1^2\end{bmatrix}$$
(the $2\times2$ inverse: swap the diagonal, negate the off-diagonal, divide by the determinant). With $u = \frac{x_1 - \mu_1}{\sigma_1}$ and $v = \frac{x_2 - \mu_2}{\sigma_2}$ (standardised values), the pdf of slide 13 becomes
$$\boxed{f(x_1, x_2) = \frac{1}{2\pi\sigma_1\sigma_2\sqrt{1 - \rho^2}}\exp\Big(-\frac{u^2 - 2\rho uv + v^2}{2(1 - \rho^2)}\Big)}$$
With $\mu = 0$ and $\sigma_1 = \sigma_2 = 1$, it is the formula quoted in last year's HW9 Q2 and Tutorial 9 Q3.

**Both red questions at once: complete the square.** Since $u^2 - 2\rho uv + v^2 = (1 - \rho^2)u^2 + (v - \rho u)^2$,
$$f(x_1, x_2) = \underbrace{\frac{1}{\sqrt{2\pi}\sigma_1}e^{-u^2/2}}_{\text{pdf of }\mathcal N(\mu_1, \sigma_1^2)\text{ at }x_1}\ \times\ \underbrace{\frac{1}{\sqrt{2\pi}\,\sigma_2\sqrt{1 - \rho^2}}\exp\Big(-\frac{(v - \rho u)^2}{2(1 - \rho^2)}\Big)}_{\text{pdf of }\mathcal N\left(\mu_2 + \rho\sigma_2u,\ (1 - \rho^2)\sigma_2^2\right)\text{ at }x_2}.$$
(Check the second factor: $\frac{(v - \rho u)^2}{1 - \rho^2} = \frac{(x_2 - \mu_2 - \rho\sigma_2u)^2}{(1 - \rho^2)\sigma_2^2}$.)

- **Marginalization.** Integrate over $x_2$: the second factor is a pdf in $x_2$, so it integrates to 1, leaving $f_{X_1}(x_1) = $ the $\mathcal N(\mu_1, \sigma_1^2)$ pdf, that is, $X_1\sim\mathcal N(\mu_1, \sigma_{11})$. By symmetry (complete the square in $u$ instead), $X_2\sim\mathcal N(\mu_2, \sigma_{22})$.
- **Conditioning.** $f_{X_2|X_1}(x_2|x_1) = \frac{f(x_1, x_2)}{f_{X_1}(x_1)}$ is exactly the second factor:
$$X_2\mid X_1 = x_1\ \sim\ \mathcal N\Big(\mu_2 + \rho\sigma_2\frac{x_1 - \mu_1}{\sigma_1},\ (1 - \rho^2)\sigma_2^2\Big)\qquad(\text{probabilitycourse Theorem 5.4}).$$
Swapping the roles of the two variables,
$$\boxed{X_1\mid X_2 = x_2\ \sim\ \mathcal N\Big(\mu_1 + \rho\sigma_1\frac{x_2 - \mu_2}{\sigma_2},\ (1 - \rho^2)\sigma_1^2\Big)}$$
This is slide 15 with $\Sigma_{12}\Sigma_{22}^{-1} = \frac{\rho\sigma_1\sigma_2}{\sigma_2^2} = \frac{\rho\sigma_1}{\sigma_2}$ and $\Sigma_{11} - \frac{\Sigma_{12}^2}{\Sigma_{22}} = \sigma_1^2 - \rho^2\sigma_1^2$. ✓

**How to remember the conditional.** In standard units: if $X_2$ is $v$ standard deviations above its mean, the best guess for $X_1$ is $\rho v$ standard deviations above its mean ("regression to the mean" when $|\rho|<1$). The remaining spread is $\sigma_1\sqrt{1 - \rho^2}$. At $\rho = 0$, observing $X_2$ tells us nothing. As $|\rho|\to1$, it tells us almost everything.

**The constructive view (probabilitycourse 5.3.2, Theorem 5.3).** Every bivariate normal can be written as
$$X_1 = \mu_1 + \sigma_1Z_1,\qquad X_2 = \mu_2 + \sigma_2\big(\rho Z_1 + \sqrt{1 - \rho^2}\,Z_2\big),$$
with $Z_1, Z_2$ independent $\mathcal N(0,1)$. This is definition 1 with $A = \begin{bmatrix}\sigma_1 & 0\\ \rho\sigma_2 & \sigma_2\sqrt{1 - \rho^2}\end{bmatrix}$; check that $AA^T = \Sigma$. It is how Tutorial 9 Q3 is usually answered: this pair has the right means, variances and correlation, every $aX_1 + bX_2$ is normal, and a Gaussian vector is fixed by its mean and covariance. The Jacobian ($Z_1 = U$, $Z_2 = \frac{V - \rho U}{\sqrt{1 - \rho^2}}$ in standard units, so $|J| = \frac{1}{\sqrt{1 - \rho^2}}$) then gives the boxed pdf.

**Gaussian processes and Bayesian optimization (context only, not exam material).** A Gaussian process models an unknown function $f$ by declaring that the values $(f(t_1), \dots, f(t_k))$ at any finite set of points form a Gaussian vector. After measuring $f$ at a few points, the conditioning formula of slide 15 gives, in closed form, a prediction (the conditional mean) and an uncertainty (the conditional variance) at every other point. Bayesian optimization uses these to choose where to measure next. Both rely only on the two closure properties of this slide.

### Slides 18 and 19/36: Pictures of bivariate Gaussian pdfs

> **On the slides.** Slide 18: a 3-D plot of a bell-shaped joint density $p(x, y)$ over the $(x,y)$ plane, with the two marginal densities $p(x)$ and $p(y)$ drawn as curves on the back walls. Slide 19: a cloud of simulated points from a bivariate Gaussian, with a green ellipse around the bulk of the cloud, and histograms of each coordinate on the back walls with the marginal pdfs (red and blue curves) drawn over them.

**What to see in them.**

1. **The marginals are normal curves** (slide 17's marginalization), on both slides. On slide 19 the histograms of each coordinate of the simulated points match the normal pdfs drawn over them.
2. **The marginal curves can have different heights.** A normal pdf peaks at $\frac{1}{\sqrt{2\pi}\sigma}$, so the taller, narrower marginal belongs to the coordinate with the smaller variance.
3. **The contours are ellipses.** The density is constant where $(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu) = c$, which is an ellipse centred at $\boldsymbol\mu$, like the green curve on slide 19. With $\rho = 0$ its axes are parallel to the coordinate axes (a circle if also $\sigma_1 = \sigma_2$). With $\rho\ne0$ it is tilted: for $\rho>0$ the cloud leans along a rising line, for $\rho<0$ along a falling line. In general its axes point along the eigenvectors of $\Sigma$, with half-lengths proportional to the square roots of the eigenvalues.
4. **How much probability an ellipse holds** is worked out in B12 below: the "2-standard-deviation" ellipse ($c = 4$) holds only about 86%, not the 95% of the 1-D rule.

## Part B: extra worked examples and problems

**B1 (last year's HW9 Q4).** $\mathbf X\sim\mathcal N(\mathbf m, C)$ with $\mathbf m = \begin{bmatrix}1\\2\end{bmatrix}$, $C = \begin{bmatrix}4 & 1\\1 & 1\end{bmatrix}$. Let $\mathbf Y = A\mathbf X + \mathbf b$ with $A = \begin{bmatrix}2 & 1\\-1 & 1\\1 & 3\end{bmatrix}$ and $\mathbf b = \begin{bmatrix}-1\\0\\1\end{bmatrix}$. Find (a) $P(X_2>0)$, (b) $\mathbf m_{\mathbf Y}$, (c) $C_{\mathbf Y}$, (d) $P(Y_2\le2)$.

*Solution.* (a) By marginalization $X_2\sim\mathcal N(2, 1)$, so $P(X_2>0) = P\big(Z>\frac{0 - 2}{1}\big) = \Phi(2)\approx0.9772$.
(b) $\mathbf m_{\mathbf Y} = A\mathbf m + \mathbf b = (4, 1, 7) + (-1, 0, 1) = (3, 1, 8)^T$.
(c) $AC = \begin{bmatrix}9 & 3\\-3 & 0\\7 & 4\end{bmatrix}$, and multiplying by $A^T$:
$$C_{\mathbf Y} = ACA^T = \begin{bmatrix}21 & -6 & 18\\-6 & 3 & -3\\18 & -3 & 19\end{bmatrix}.$$
(d) By slide 14, $Y_2 = -X_1 + X_2\sim\mathcal N(1, 3)$, so $P(Y_2\le2) = \Phi\big(\frac{1}{\sqrt3}\big) = \Phi(0.577)\approx0.7181$.
*Remark.* $\mathbf Y$ is 3-dimensional but built from the 2-dimensional $\mathbf X$, so $C_{\mathbf Y}$ is singular ($\det C_{\mathbf Y} = 0$). $\mathbf Y$ is a degenerate Gaussian vector with no joint pdf in $\mathbb R^3$, yet every component is a normal variable (slide 11).

**B2 (last year's HW9 Q5).** $\mathbf X = (X_1, X_2, X_3)\sim\mathcal N(\boldsymbol\mu, \Sigma)$ with $\boldsymbol\mu = (1,2,3)^T$ and $\Sigma = \begin{bmatrix}4 & 1 & 0\\1 & 2 & 1\\0 & 1 & 3\end{bmatrix}$. Find the distribution of $(X_1, X_3)$ given $X_2 = x_2$.

*Solution.* Take $\mathbf X_1 = (X_1, X_3)$ (the part we want) and $\mathbf X_2 = X_2$ (the part we observe). Reading off the entries:
$$\Sigma_{11} = \begin{bmatrix}4 & 0\\0 & 3\end{bmatrix},\qquad\Sigma_{12} = \begin{bmatrix}1\\1\end{bmatrix},\qquad\Sigma_{22} = 2 .$$
Then $\Sigma_{12}\Sigma_{22}^{-1} = \begin{bmatrix}1/2\\1/2\end{bmatrix}$, and
$$\boldsymbol\mu_{1|2} = \begin{bmatrix}1\\3\end{bmatrix} + \frac{x_2 - 2}{2}\begin{bmatrix}1\\1\end{bmatrix},\qquad\Sigma_{1|2} = \begin{bmatrix}4 & 0\\0 & 3\end{bmatrix} - \frac12\begin{bmatrix}1 & 1\\1 & 1\end{bmatrix} = \begin{bmatrix}3.5 & -0.5\\-0.5 & 2.5\end{bmatrix}.$$
*Notice:* $X_1$ and $X_3$ are uncorrelated (independent) to begin with, but **given** $X_2$ they become negatively correlated. Both are positively tied to $X_2$, so once $X_2$ is known, a high $X_1$ "uses up" some of what $X_2$ explains and points to a lower $X_3$.

**B3 (last year's HW9 Q6): a degenerate Gaussian.** $\mathbf Z = (Z_1, Z_2)\sim\mathcal N(\mathbf m, C)$ with $\mathbf m = (1, 2)^T$ and $C = \begin{bmatrix}2 & -1\\-1 & 3\end{bmatrix}$. Let $\mathbf W = A\mathbf Z + \mathbf b$ with $A = \begin{bmatrix}1 & 1\\1 & -1\\2 & 0\end{bmatrix}$, $\mathbf b = (0, 0, -2)^T$. (a) Find the mean and covariance of $\mathbf W$. (b) Find $P(W_2>1)$.

*Solution.* (Here $\mathbf Z$ is not standard normal; it is just the name of the vector.) (a) $E[\mathbf W] = A\mathbf m + \mathbf b = (3, -1, 2) + (0, 0, -2) = (3, -1, 0)^T$. Next, $AC = \begin{bmatrix}1 & 2\\3 & -4\\4 & -2\end{bmatrix}$, so
$$C_{\mathbf W} = ACA^T = \begin{bmatrix}3 & -1 & 2\\-1 & 7 & 6\\2 & 6 & 8\end{bmatrix}.$$
*Spot checks:* $\operatorname{Var}(W_2) = \operatorname{Var}(Z_1 - Z_2) = 2 + 3 - 2(-1) = 7$ and $\operatorname{Var}(W_3) = \operatorname{Var}(2Z_1) = 8$. ✓ As in B1, $\det C_{\mathbf W} = 0$ (rank 2).
(b) $W_2\sim\mathcal N(-1, 7)$, so $P(W_2>1) = 1 - \Phi\big(\frac{1 - (-1)}{\sqrt7}\big) = 1 - \Phi(0.756)\approx0.2248$.

**B4 (last year's HW9 Q2).** $(X, Y)$ is standard bivariate normal with correlation $\rho$ (pdf in slide 17). Find the joint pdf of $U = X + Y$ and $V = X - Y$.

*Solution 1 (the fast way, slide 14).* $(U, V)$ is a linear image of a Gaussian vector, so it is Gaussian, with
$$\operatorname{Var}(U) = 2 + 2\rho,\qquad\operatorname{Var}(V) = 2 - 2\rho,\qquad\operatorname{Cov}(U, V) = \operatorname{Var}(X) - \operatorname{Var}(Y) = 0 .$$
Uncorrelated parts of a Gaussian vector are independent, so $U\sim\mathcal N(0, 2(1 + \rho))$ and $V\sim\mathcal N(0, 2(1 - \rho))$ are independent:
$$f_{U,V}(u, v) = \frac{1}{4\pi\sqrt{1 - \rho^2}}\exp\Big(-\frac{u^2}{4(1 + \rho)} - \frac{v^2}{4(1 - \rho)}\Big).$$
*Solution 2 (the Jacobian, L19).* $x = \frac{u + v}{2}$, $y = \frac{u - v}{2}$, $|J| = \frac12$, and $x^2 - 2\rho xy + y^2 = \frac{(1 - \rho)u^2 + (1 + \rho)v^2}{2}$. Substituting into the pdf gives the same answer.

**B5 (last year's HW9 Q11).** $\mathbf X$ is a standard normal vector in $\mathbb R^n$ and $\mathbf Y = A\mathbf X + \mathbf b$, with $A$ square, symmetric and invertible. (a) Find $f_{\mathbf Y}$. (b) Evaluate it for $A = \begin{bmatrix}2 & 0\\0 & 3\end{bmatrix}$, $\mathbf b = (1, -1)^T$, $\mathbf y = (3, 2)^T$.

*Solution.* (a) By slide 12 with $\Sigma = AA^T = A^2$:
$$f_{\mathbf Y}(\mathbf y) = \frac{1}{(2\pi)^{n/2}|\det A|}\exp\Big(-\frac12(\mathbf y - \mathbf b)^TA^{-2}(\mathbf y - \mathbf b)\Big) = \frac{1}{(2\pi)^{n/2}|\det A|}\exp\Big(-\frac12\big\|A^{-1}(\mathbf y - \mathbf b)\big\|^2\Big).$$
(b) $A^{-1}(\mathbf y - \mathbf b) = \big(\frac22, \frac33\big) = (1, 1)$, with squared length 2, and $\det A = 6$. So $f_{\mathbf Y}(\mathbf y) = \frac{1}{2\pi\cdot6}e^{-1} = \frac{e^{-1}}{12\pi}\approx0.00976$.

**B6 (last year's Tutorial 9 Q5).** $\mathbf X\sim\mathcal N\Big(\mathbf 0, \begin{bmatrix}5 & 2\\2 & 1\end{bmatrix}\Big)$. Find $a$ such that $Y_1 = X_1 + aX_2$ and $Y_2 = X_2$ are independent.

*Solution.* $(Y_1, Y_2)$ is a linear image of $\mathbf X$, hence Gaussian, so independence is the same as zero covariance: $\operatorname{Cov}(X_1 + aX_2, X_2) = 2 + a\cdot1 = 0$, so $a = -2$. In general $a = -\frac{\sigma_{12}}{\sigma_{22}}$: $Y_1$ is the residual $\mathbf W$ of the slide-15 proof. Here $\operatorname{Var}(Y_1) = 5 + 4 - 4\cdot2 = 1$, so $X_1 = Y_1 + 2X_2$ and $X_1\mid X_2 = x_2\sim\mathcal N(2x_2, 1)$, exactly as the conditioning formula says.

**B7 (probabilitycourse 5.3.2, numerical example).** $X, Y$ are bivariate normal with $\mu_X = 1$, $\sigma_X^2 = 1$, $\mu_Y = 0$, $\sigma_Y^2 = 4$, $\rho = \frac12$. Find (a) $P(2X + Y\le3)$, (b) $\operatorname{Cov}(X + Y, 2X - Y)$, (c) $P(Y>1\mid X = 2)$.

*Solution.* $\operatorname{Cov}(X, Y) = \rho\sigma_X\sigma_Y = 1$.
(a) $V = 2X + Y$ is normal with mean 2 and variance $4\cdot1 + 4 + 2\cdot2\cdot1 = 12$, so $P(V\le3) = \Phi\big(\frac{1}{\sqrt{12}}\big)\approx0.6136$.
(b) By bilinearity, $2\operatorname{Var}(X) - \operatorname{Cov}(X, Y) + 2\operatorname{Cov}(Y, X) - \operatorname{Var}(Y) = 2 - 1 + 2 - 4 = -1$.
(c) $Y\mid X = 2$ is normal with mean $0 + \frac12\cdot2\cdot\frac{2 - 1}{1} = 1$ and variance $(1 - \frac14)\cdot4 = 3$, so $P(Y>1\mid X = 2) = 1 - \Phi(0) = \frac12$.

**B8 (Bertsekas Chapter 4, Problem 28): the bivariate normal from scratch.** The zero-mean bivariate normal pdf is $f(x, y) = ce^{-q(x,y)}$ with
$$q(x, y) = \frac{\frac{x^2}{\sigma_x^2} - 2\rho\frac{xy}{\sigma_x\sigma_y} + \frac{y^2}{\sigma_y^2}}{2(1 - \rho^2)},\qquad-1<\rho<1 .$$
(a) Write $q$ as $(\alpha x - \beta y)^2 + \gamma^2y^2$. (b) Show $X\sim\mathcal N(0, \sigma_x^2)$ and $Y\sim\mathcal N(0, \sigma_y^2)$. (c) Find $c$. (d) Find the conditional pdf of $X$ given $Y = y$. (e) Show the correlation coefficient is $\rho$. (f) Show $X, Y$ are independent iff uncorrelated. (g) Show the estimation error $E[X\mid Y] - X$ is normal with mean 0 and variance $(1 - \rho^2)\sigma_x^2$, and independent of $Y$.

*Solution.* (a) Completing the square in $x$ (as in slide 17):
$$q = \frac{\big(\frac{x}{\sigma_x} - \rho\frac{y}{\sigma_y}\big)^2}{2(1 - \rho^2)} + \frac{y^2}{2\sigma_y^2},\quad\text{so}\quad\alpha = \frac{1}{\sigma_x\sqrt{2(1 - \rho^2)}},\ \ \beta = \frac{\rho}{\sigma_y\sqrt{2(1 - \rho^2)}},\ \ \gamma = \frac{1}{\sqrt2\,\sigma_y}.$$
(b) $\int e^{-(\alpha x - \beta y)^2}dx = \frac{\sqrt\pi}{\alpha}$ for every $y$, so $f_Y(y) = \frac{c\sqrt\pi}{\alpha}e^{-y^2/(2\sigma_y^2)}$, a $\mathcal N(0, \sigma_y^2)$ shape. By symmetry, $X\sim\mathcal N(0, \sigma_x^2)$.
(c) Matching $f_Y$ to $\frac{1}{\sqrt{2\pi}\sigma_y}e^{-y^2/(2\sigma_y^2)}$: $c = \frac{\alpha}{\sqrt\pi\sqrt{2\pi}\sigma_y} = \frac{1}{2\pi\sigma_x\sigma_y\sqrt{1 - \rho^2}}$.
(d) $f_{X|Y}(x|y)\propto e^{-(\alpha x - \beta y)^2} = \exp\Big(-\frac{(x - \rho\frac{\sigma_x}{\sigma_y}y)^2}{2(1 - \rho^2)\sigma_x^2}\Big)$, so $X\mid Y = y\sim\mathcal N\big(\rho\frac{\sigma_x}{\sigma_y}y,\ (1 - \rho^2)\sigma_x^2\big)$.
(e) $E[XY] = E\big[Y\,E[X\mid Y]\big] = \rho\frac{\sigma_x}{\sigma_y}E[Y^2] = \rho\sigma_x\sigma_y$, so the correlation coefficient is $\frac{\rho\sigma_x\sigma_y}{\sigma_x\sigma_y} = \rho$.
(f) Independent always implies uncorrelated. Conversely, uncorrelated means $\rho = 0$, and then $q = \frac{x^2}{2\sigma_x^2} + \frac{y^2}{2\sigma_y^2}$, so the pdf factors.
(g) Given $Y = y$, the error $E[X\mid Y] - X = \rho\frac{\sigma_x}{\sigma_y}y - X$ is, by (d), $\mathcal N(0, (1 - \rho^2)\sigma_x^2)$ whatever $y$ is. A conditional distribution that does not depend on $y$ means the error is independent of $Y$, and that is also its unconditional distribution.

**B9 (an illustrative example; the numbers are made up).** Heights (cm) of two siblings are bivariate normal, with $\mu_1 = 170$, $\sigma_1 = 7$ for the younger and $\mu_2 = 175$, $\sigma_2 = 8$ for the older, and $\rho = 0.5$. The older sibling is 183 cm. What is the chance the younger one is over 180 cm?

*Solution.* By slide 17, $X_1\mid X_2 = 183$ is normal with
$$\text{mean } 170 + 0.5\cdot\frac78(183 - 175) = 173.5,\qquad\text{SD } 7\sqrt{1 - 0.25}\approx6.062 .$$
So $P(X_1>180\mid X_2 = 183) = 1 - \Phi\big(\frac{180 - 173.5}{6.062}\big) = 1 - \Phi(1.072)\approx0.142$. Without the information, $P(X_1>180) = 1 - \Phi(10/7)\approx0.077$: knowing a tall sibling nearly doubles the chance. The older sibling is 1 SD above average, and the prediction for the younger moves only $\rho\times1 = 0.5$ SD above average.

**B10: simulating any bivariate normal** (probabilitycourse 5.3.2, Eq. 5.23, together with Box–Muller from L19 B11).

1. Make $Z_1, Z_2$ independent $\mathcal N(0,1)$ from two uniforms by Box–Muller.
2. Find $A$ with $AA^T = \Sigma$. For $2\times2$, the lower-triangular choice (the *Cholesky factor*) is $A = \begin{bmatrix}\sigma_1 & 0\\ \rho\sigma_2 & \sigma_2\sqrt{1 - \rho^2}\end{bmatrix}$.
3. Return $\mathbf X = A\mathbf Z + \boldsymbol\mu$ (definition 1).

*Example.* $\Sigma = \begin{bmatrix}4 & 2\\2 & 5\end{bmatrix}$: $\sigma_1 = 2$, $\rho\sigma_2 = \frac{\sigma_{12}}{\sigma_1} = 1$, $\sigma_2\sqrt{1 - \rho^2} = \sqrt{5 - 1} = 2$, so $A = \begin{bmatrix}2 & 0\\1 & 2\end{bmatrix}$; check $AA^T = \begin{bmatrix}4 & 2\\2 & 5\end{bmatrix}$. ✓ With $\boldsymbol\mu = (1, 0)$ and $\mathbf Z = (0.5, -1)$, the sample is $\mathbf X = (1 + 1,\ 0.5 - 2) = (2, -1.5)$.

In code, for any dimension:

```python
import numpy as np
L = np.linalg.cholesky(Sigma)            # lower triangular, L @ L.T == Sigma
Z = np.random.standard_normal((N, len(mu)))
X = mu + Z @ L.T                         # each row is one sample of N(mu, Sigma)
print(np.cov(X, rowvar=False))           # close to Sigma for large N
```

**B11: Gaussian vector or not?** Decide for each pair; $X, Z$ are independent $\mathcal N(0,1)$.

1. $(X, 3X + 1)$. **Yes** (definition 1 with $A = [1, 3]^T$), but degenerate: all its mass is on a line, with no joint pdf.
2. $(X + Z, X - Z)$. **Yes**, a linear image of the standard normal vector $(X, Z)$; in fact two independent $\mathcal N(0, 2)$ variables (B4 with $\rho = 0$).
3. $(X, Y)$ with $Y = X$ or $-X$ on a fair coin flip. **No** (slide 16).
4. $(X, Y)$ with $Y = |Z|\operatorname{sign}(X)$. $Y\sim\mathcal N(0,1)$, because $|Z|$ gets a random sign independent of it. But $X$ and $Y$ always have the same sign, so $P(X>0, Y<0) = 0$. A non-degenerate bivariate normal has a positive pdf everywhere, so it gives that quadrant positive probability. A degenerate one lies on a line through the origin; $Y = cX$ is impossible here, because given $X$, $Y$ still varies. **No.**
5. $(X, X^2)$. **No**: $X^2$ is not even normal.

**B12: how much probability is inside an ellipse?** Let $\mathbf X\sim\mathcal N(\boldsymbol\mu, \Sigma)$ in $\mathbb R^2$ with $\Sigma$ invertible. Find $P\big((\mathbf X - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf X - \boldsymbol\mu)\le c\big)$.

*Solution.* Write $\mathbf X = A\mathbf Z + \boldsymbol\mu$. By the slide-12 calculation, the quadratic form equals $\mathbf Z^T\mathbf Z = Z_1^2 + Z_2^2$. Box–Muller (L19 B11) says $Z_1^2 + Z_2^2 = R^2 = -2\ln U$ for a uniform $U$. So
$$P(Z_1^2 + Z_2^2\le c) = P\big(U\ge e^{-c/2}\big) = 1 - e^{-c/2},$$
that is, $Z_1^2 + Z_2^2\sim$ Exponential with rate $\frac12$. For the "2-SD ellipse" ($c = 4$) this is $1 - e^{-2}\approx0.865$. The ellipse holding 95% has $c = -2\ln0.05\approx5.99$. (In $n$ dimensions, $\mathbf Z^T\mathbf Z$ has the chi-square distribution with $n$ degrees of freedom; you meet it again in statistics.)



# Practice map, formula sheet and self-test

## 1. Practice map: last year's questions, and where each is solved

Last year's homeworks 6 to 9, tutorials 6 to 9, Quiz 2 and the end-semester paper cover the same material as this year's Lectures 14 to 20. The table says where each question is worked out in these notes, so you can try it first and then check.

**How to read the "Solved in" column.** "MGF" is Lecture 14 part 1 and "Sim" is the simulation part (Lectures 14 and 15). "L16" to "L20" are those lectures. "B7" means problem B7 in that lecture's Part B, and "slide 4" means the explanation under that slide in Part A.

### Moment generating functions (L14)

| Question | Topic | Solved in |
|---|---|---|
| HW6 Q1 | MGF, mean and variance of $\mathcal N(\mu, \sigma^2)$ | MGF slide 3 (and slide 4) |
| HW6 Q2 | i.i.d. sums; random sums $M_N(\ln M_X(t))$ | MGF slide 6 |
| HW6 Q3 | pmf from an MGF | MGF, "key fact" section before slide 5 |
| HW6 Q5 | Exponential plus Bernoulli | MGF B5 |
| HW6 Q7 | sum of i.i.d. exponentials is Gamma | MGF slide 6 |
| HW6 Q10 | MGF of a 3-point pmf | not worked; see the self-check answer below the table |
| HW6 Q11 | Gamma MGF and where it is finite | MGF slide 4 |
| HW6 Q12 | Poisson MGF, mean, variance | MGF slide 3 (HW) and slide 4 |
| HW6 Q13, Q14 | convolution; Poisson plus Poisson | MGF slide 5 (Poisson plus Poisson by MGFs); convolution is L13 |
| Tutorial 6 Q2 | Binomial plus Binomial | MGF slide 5 |
| Tutorial 6 Q3 | moments from an MGF | MGF slide 4 |
| Tutorial 6 Q4 | limits of MGFs (the engine of the LLN and CLT) | MGF B13 |
| Tutorial 6 Q8 | MGF algebra with independent variables | MGF B7 |
| Quiz 2 Q1 | MGF exam question | MGF B6 |
| Endsem Q1 | Geometric MGF and moments | MGF slide 4 |
| Endsem Q3 | sum of two independent exponentials | MGF slide 5 |
| Endsem Q4 | mixture distribution | idea in the MGF "key fact" section (mixtures); by total probability, $f_X = \sum_ip_if_{Y_i}$ and $E[X] = \sum_ip_iE[Y_i]$ |

*Self-check for HW6 Q10* ($p(-1) = 0.2$, $p(0) = 0.5$, $p(1) = 0.3$): $M_X(t) = 0.2e^{-t} + 0.5 + 0.3e^t$, $E[X] = M'(0) = 0.1$, $E[X^2] = M''(0) = 0.5$, $\operatorname{Var}(X) = 0.49$.

### Simulation (L14 to L16)

| Question | Topic | Solved in |
|---|---|---|
| Tutorial 6 Q5 | discrete inverse transform | Sim B1 |
| HW6 Q4 | inverse transform for a Weibull lifetime | Sim B6 |
| Tutorial 6 Q6 | inverse transform from a given CDF | Sim B7 |
| Tutorial 7 Q6 | Gamma from uniforms | Sim B12 |
| Quiz 2 Q3 | $F_X(X)$ is uniform | Sim B12a |
| HW6 Q8 | Monte Carlo on $[0,\infty)$; zero-variance proposal | Sim slides 17 and 18 |
| HW6 Q17 | Monte Carlo for $\int_0^a\sqrt x\,dx$ | Sim B15 |
| Tutorial 7 Q5 | Monte Carlo integral | Sim B14 |
| Endsem Q2 | estimating $\pi$ | Sim B13 |
| Tutorial 6 Q7 | importance sampling: the support trap | Sim B16 |
| HW6 Q15 | importance sampling (ill-posed as printed; see the note below) | idea in Sim B16 |
| HW6 Q18 | proof of accept–reject | L16 slides 5 and 6 |
| Tutorial 6 Q9 | accept–reject constant | L16 B1 |
| HW6 Q16 | accept–reject for a normal on $[0,1]$ | L16 B2 |
| Tutorial 7 Q7 | accept–reject for Gamma$(\frac52, 1)$ | L16 B6 |
| HW7 Q8 | expected iterations for $k$ samples | L16 B9 |

*Note on HW6 Q15.* As printed it asks for $E[\sqrt X]$ with $X\sim\mathcal N(0,1)$, which is undefined because $X<0$ half the time. The proposal $\mathcal U[0,5]$ also misses all negative values, the support trap of Sim B16. If the intended target is $\theta = E[\sqrt X\,\mathbf 1\{X>0\}] = \int_0^\infty\sqrt x\,\varphi(x)\,dx$, the estimator is $\hat\theta = \frac1N\sum_i\sqrt{Y_i}\,\frac{\varphi(Y_i)}{1/5} = \frac5N\sum_i\sqrt{Y_i}\,\varphi(Y_i)$, which ignores $x>5$ (probability about $3\times10^{-7}$).

### Convergence and the laws of large numbers (L16 to L18)

| Question | Topic | Solved in |
|---|---|---|
| Tutorial 8 Q1 | do two series converge? (needed for Borel–Cantelli) | not worked; see the self-check answer below the table |
| HW7 Q4, HW8 Q10 | products of Bernoullis; a.s. convergence | L17 B5 |
| HW8 Q1 | several modes for one sequence | L18 B9 (part (b) also in L17 B4) |
| Tutorial 8 Q7 | an SLLN limit | L17 B9 |
| HW7 Q1 | uniform maxima and minima | L18 B3 |
| HW7 Q2 | variance of a weighted sample mean | L18 B4 |
| HW7 Q3, HW8 Q5 | $X + \mathcal N(0, 1/n)$ noise | L18 B5 |
| HW7 Q5, Quiz 2 Q2 | convergence in probability, three ways | L18 B7 |
| HW7 Q6 | m.s. implies p; a counterexample to the converse | L18 slide 22 and the counterexample table under slide 25 |
| HW7 Q7 | $X_n = X + Y_n$ | L18 B6 |
| HW8 Q4, Endsem Q7 | $\mathcal U(0, \frac1n)\to0$ | L18 B8 |
| HW8 Q7, Tutorial 7 Q9 | $L^r$ implies p | L18 slide 22 |
| Tutorial 7 Q8 | Markov, Chebyshev, WLLN | L18 toolkit box and B7 |
| Tutorial 7 Q1 | sequences built on one uniform $U$ | L18 B10 |
| Quiz 2 Q1b | convergence in distribution only | L18 B11 |
| Tutorial 7 Q3 | a discrete sequence | L18 B12 |
| Tutorial 7 Q10 | $T_n = \sum X_i/2^i$ and $A_n$ | L18 B13 |
| HW8 Q11 | sample-mean consistency | L18 B14 |
| Tutorial 8 Q2 | the "typewriter" sequence | L18 B15 |
| Tutorial 8 Q4 | convergence of a maximum or minimum | L18 B16 |
| Tutorial 7 Q2 | i.i.d. uniforms | L18 B17 |
| Tutorial 7 Q4, Tutorial 8 Q5 | discrete to continuous and back | L18 B18 (and B8) |
| Tutorial 8 Q3 | a question on convergence in distribution | L18 slide 23 |
| HW8 Q9 | hypergeometric to binomial | L18 B20 |
| HW8 Q6 | $\frac{1}{\sqrt n}Z\to0$ in distribution | L18 B21 |

*Self-check for Tutorial 8 Q1.* (a) $\sum\frac{n!}{n^n}$ converges: by the ratio test, $\frac{a_{n+1}}{a_n} = \big(\frac{n}{n+1}\big)^n\to\frac1e<1$. (b) $\sum\big(\frac{3n+1}{4n}\big)^n$ converges: by the root test, $\frac{3n+1}{4n}\to\frac34<1$.

### Central limit theorem and normal approximation (L18)

| Question | Topic | Solved in |
|---|---|---|
| Tutorial 6 Q4 | MGF limits behind the CLT | MGF B13; L18 slides 27 and 28 |
| HW8 Q2 | call durations | L18 B25 |
| HW8 Q3 | rod lengths | L18 B26 |
| HW8 Q8, Tutorial 8 Q8 | roulette bias; coin tosses | L18 B27 |
| Tutorial 8 Q6 | test scores | L18 B28 |
| Tutorial 8 Q9 | bank teller | L18 B29 |
| HW8 Q12 (bonus) | binomial to normal without MGFs | L18 B34 |

### Random vectors and Gaussian vectors (L19 and L20)

| Question | Topic | Solved in |
|---|---|---|
| Tutorial 9 Q1 | mean and covariance of $A\mathbf X$ | L19 B4 |
| Tutorial 9 Q7 | $\operatorname{Var}(a^T\mathbf X)$, $\operatorname{Cov}(a^T\mathbf X, b^T\mathbf X)$ | L19 B5 |
| HW9 Q7, Q8 | means and covariances of linear combinations | L19 B6 |
| HW9 Q1 | $B\mathbf Y$ for a $3\times4$ matrix | L19 B7 |
| HW9 Q9 | $E[(X_1 + X_2)^2]$ | L19 B8 |
| Tutorial 9 Q8 | law of total covariance | L19 B10 |
| HW9 Q3 | Jacobian for sum and difference | L19 B1 |
| Quiz 2 Q4 | Jacobian with a uniform square | L19 B2 |
| Tutorial 9 Q2 | a non-linear Jacobian | L19 B3 |
| HW9 Q10 | MGF of $\mathcal N(\boldsymbol\mu, \Sigma)$ | L20 slide 14 |
| Tutorial 9 Q4 | affine maps keep vectors Gaussian (MGF proof) | L20 slide 14 |
| Tutorial 9 Q6 | the conditioning formula | L20 slide 15 |
| Tutorial 9 Q3 | bivariate normal pdf from the definition | L20 slide 17 |
| HW9 Q4 | Gaussian $A\mathbf X + \mathbf b$; probabilities | L20 B1 |
| HW9 Q5 | conditional of $(X_1, X_3)$ given $X_2$ | L20 B2 |
| HW9 Q6 | a degenerate Gaussian | L20 B3 |
| HW9 Q2 | $X + Y$ and $X - Y$ for a bivariate normal | L20 B4 |
| HW9 Q11 | density of $A\mathbf X + \mathbf b$ | L20 B5 |
| Tutorial 9 Q5 | making $X_1 + aX_2$ independent of $X_2$ | L20 B6 |

**Not in Lectures 14 to 20.** HW6 Q6 (Bayes' rule), HW6 Q9 (variance of $3X - 2Y + 5$) and Tutorial 6 Q1 (a function of a random point) revise Lectures 1 to 13. Endsem Q5 and Q6 (maximum likelihood), Q8 (Markov chains) and Q9 (Bayesian estimation) belong to later lectures.

## 2. Formula sheet

### MGFs (L14)

$$M_X(t) = E[e^{tX}],\qquad M_X^{(k)}(0) = E[X^k],\qquad K = \ln M_X:\ K'(0) = E[X],\ K''(0) = \operatorname{Var}(X).$$
$$M_{aX + b}(t) = e^{bt}M_X(at),\qquad M_{X + Y} = M_XM_Y\ (\text{independent}),\qquad M_{S_n} = M_X^n\ (\text{i.i.d.}).$$
$$\text{Random sum } Z = \sum_{i=1}^NX_i:\qquad M_Z(t) = M_N\big(\ln M_X(t)\big),$$
$$E[Z] = E[N]\,E[X],\qquad\operatorname{Var}(Z) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N).$$

| Distribution | $M(t)$ | Finite for |
|---|---|---|
| Bernoulli$(p)$ | $1 - p + pe^t$ | all $t$ |
| Binomial$(n,p)$ | $(1 - p + pe^t)^n$ | all $t$ |
| Poisson$(\lambda)$ | $e^{\lambda(e^t - 1)}$ | all $t$ |
| Geometric$(p)$ on $\{1, 2, \dots\}$ | $\frac{pe^t}{1 - (1 - p)e^t}$ | $t<-\ln(1 - p)$ |
| Uniform$[a,b]$ | $\frac{e^{tb} - e^{ta}}{t(b - a)}$ ($1$ at $t = 0$) | all $t$ |
| Exponential$(\lambda)$ | $\frac{\lambda}{\lambda - t}$ | $t<\lambda$ |
| Gamma$(\alpha, \lambda)$ | $\big(\frac{\lambda}{\lambda - t}\big)^\alpha$ | $t<\lambda$ |
| $\mathcal N(\mu, \sigma^2)$ | $e^{\mu t + \sigma^2t^2/2}$ | all $t$ |

**Uniqueness:** equal MGFs near 0 mean equal distributions. **Continuity:** $M_{X_n}(t)\to M_X(t)$ near 0 implies $X_n\xrightarrow{d}X$.

### Simulation (L14 to L16, L19)

- **Discrete inverse transform:** $X = x_k$ when $F(x_{k-1})<U\le F(x_k)$.
- **Continuous inverse transform:** $X = F^{-1}(U)$; and $F_X(X)\sim\mathcal U[0,1]$. Exponential: $X = -\frac1\lambda\ln U$.
- **Monte Carlo:** $\int_a^bh(x)\,dx\approx\frac{b - a}{N}\sum_ih(U_i)$ with $U_i\sim\mathcal U[a,b]$; standard error $\frac{\sigma}{\sqrt N}$.
- **Importance sampling:** $E_f[h(X)] = E_g\big[h(Y)\frac{f(Y)}{g(Y)}\big]$. Need $g>0$ wherever $hf\ne0$. Best $g\propto|h|f$.
- **Accept–reject:** if $f\le cg$, draw $Y\sim g$ and $U$, accept when $U\le\frac{f(Y)}{cg(Y)}$. $P(\text{accept}) = \frac1c$; the number of rounds is Geometric$(\frac1c)$ with mean $c$; best $c = \max\frac fg$.
- **Box–Muller:** $Z_1 = \sqrt{-2\ln U_1}\cos(2\pi U_2)$, $Z_2 = \sqrt{-2\ln U_1}\sin(2\pi U_2)$ are i.i.d. $\mathcal N(0,1)$.

### Convergence (L16 to L18)

| Mode | Definition |
|---|---|
| almost surely | $P\big(\lim_nX_n = X\big) = 1$ |
| in probability | $P(\lvert X_n - X\rvert>\epsilon)\to0$ for every $\epsilon>0$ |
| in $r$-th mean | $E\lvert X_n - X\rvert^r\to0$ ($r = 2$: mean square) |
| in distribution | $F_{X_n}(x)\to F_X(x)$ at every continuity point $x$ of $F_X$ |

- **Implications:** a.s. $\Rightarrow$ p $\Rightarrow$ d; $L^r\Rightarrow$ p; $L^s\Rightarrow L^r$ for $s>r\ge1$; d to a constant $\Rightarrow$ p. No others hold in general.
- **Borel–Cantelli:** $\sum_nP(A_n)<\infty\Rightarrow P(A_n\text{ i.o.}) = 0$. So if $\sum_nP(|X_n - X|>\epsilon)<\infty$ for every $\epsilon>0$, then $X_n\to X$ a.s. **Second lemma:** $A_n$ independent and $\sum P(A_n) = \infty\Rightarrow P(A_n\text{ i.o.}) = 1$.
- **Markov:** $P(X\ge a)\le\frac{E[X]}{a}$ for $X\ge0$. **Chebyshev:** $P(|X - \mu|\ge c)\le\frac{\sigma^2}{c^2}$.
- **Sample mean** $M_n$: $E[M_n] = \mu$, $\operatorname{Var}(M_n) = \frac{\sigma^2}{n}$. **WLLN:** $P(|M_n - \mu|\ge\epsilon)\le\frac{\sigma^2}{n\epsilon^2}\to0$. **SLLN:** $M_n\to\mu$ a.s.
- **Mean square to a constant:** $E[(X_n - c)^2] = \operatorname{Var}(X_n) + (E[X_n] - c)^2$, so both terms must go to 0.

### CLT (L18)

$$Z_n = \frac{S_n - n\mu}{\sigma\sqrt n}\xrightarrow{d}\mathcal N(0,1),\qquad P(S_n\le c)\approx\Phi\Big(\frac{c - n\mu}{\sigma\sqrt n}\Big).$$
For integer-valued $S_n$, use the continuity correction: $P(k\le S_n\le l)\approx\Phi\big(\frac{l + \frac12 - n\mu}{\sigma\sqrt n}\big) - \Phi\big(\frac{k - \frac12 - n\mu}{\sigma\sqrt n}\big)$.

| $z$ | 1 | 1.645 | 1.96 | 2 | 2.326 | 2.576 | 3 |
|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | 0.8413 | 0.95 | 0.975 | 0.9772 | 0.99 | 0.995 | 0.99865 |

### Random vectors (L19)

$$E[A\mathbf X + \mathbf b] = AE[\mathbf X] + \mathbf b,\qquad C_{\mathbf X} = E\big[(\mathbf X - E\mathbf X)(\mathbf X - E\mathbf X)^T\big] = E[\mathbf X\mathbf X^T] - E[\mathbf X]E[\mathbf X]^T .$$
$$C_{A\mathbf X + \mathbf b} = AC_{\mathbf X}A^T,\qquad\operatorname{Var}(\mathbf a^T\mathbf X) = \mathbf a^TC_{\mathbf X}\mathbf a,\qquad\operatorname{Cov}(\mathbf a^T\mathbf X, \mathbf b^T\mathbf X) = \mathbf a^TC_{\mathbf X}\mathbf b .$$
$C_{\mathbf X}$ is symmetric and positive semi-definite.
$$\textbf{Jacobian: } f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,|J|,\ \ J = \det\Big[\frac{\partial H_i}{\partial y_j}\Big];\qquad\textbf{affine: } f_{\mathbf Y}(\mathbf y) = \frac{f_{\mathbf X}\big(A^{-1}(\mathbf y - \mathbf b)\big)}{|\det A|}.$$
$$\begin{bmatrix}a & b\\c & d\end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix}d & -b\\-c & a\end{bmatrix}.$$

### Gaussian vectors (L20)

$$f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}e^{-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)},\qquad\mathbf X = A\mathbf Z + \boldsymbol\mu\ \ (AA^T = \Sigma),\qquad M_{\mathbf X}(\mathbf s) = e^{\mathbf s^T\boldsymbol\mu + \frac12\mathbf s^T\Sigma\mathbf s}.$$
$$A\mathbf X + \mathbf b\sim\mathcal N(A\boldsymbol\mu + \mathbf b, A\Sigma A^T),\qquad\mathbf a^T\mathbf X\sim\mathcal N(\mathbf a^T\boldsymbol\mu, \mathbf a^T\Sigma\mathbf a).$$
- **Marginal:** keep the rows and columns of the variables you want.
- **Conditional:** $\mathbf X_1\mid\mathbf X_2 = \mathbf x_2\sim\mathcal N\big(\boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\mathbf x_2 - \boldsymbol\mu_2),\ \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\big)$.
- **Bivariate:** $X_1\mid X_2 = x_2\sim\mathcal N\big(\mu_1 + \rho\sigma_1\frac{x_2 - \mu_2}{\sigma_2},\ (1 - \rho^2)\sigma_1^2\big)$.
- **Independence:** for a Gaussian vector, uncorrelated parts are independent. This fails for variables that are only individually Gaussian.
- **Simulation (2×2 Cholesky):** $A = \begin{bmatrix}\sigma_1 & 0\\ \rho\sigma_2 & \sigma_2\sqrt{1 - \rho^2}\end{bmatrix}$.

## 3. Exam-style self-test

Try each one before looking at the answers that follow.

**T1.** $X$ has MGF $M_X(t) = \frac{e^{2(e^t - 1)}}{1 - t}$ for $t<1$. Identify the distribution of $X$, and find $E[X]$ and $\operatorname{Var}(X)$.

**T2.** $N$ is Geometric$(\frac14)$ on $\{1, 2, \dots\}$, and $X_1, X_2, \dots$ are i.i.d. Exponential$(2)$, independent of $N$. Find the distribution of $S = X_1 + \dots + X_N$.

**T3.** Give a sampling algorithm, using $U\sim\mathcal U[0,1]$, for (a) the pdf $f(x) = 3x^2$ on $[0,1]$; (b) the pmf $P(X = 1) = 0.2$, $P(X = 2) = 0.5$, $P(X = 3) = 0.3$.

**T4.** Use accept–reject with proposal $\mathcal U[0,1]$ for the target $f(x) = 6x(1 - x)$ on $[0,1]$. Find the smallest $c$, the acceptance probability, and the expected number of proposals needed for 100 accepted samples.

**T5.** You estimate $p = P(A)$ by the fraction of $N$ independent simulation runs in which $A$ happens. How large must $N$ be so that the standard error is at most $0.005$, whatever $p$ is?

**T6.** $X_n$ are independent, with $X_n = n$ with probability $\frac{1}{n^2}$ and $X_n = 0$ otherwise. Does $X_n\to0$ (a) almost surely, (b) in probability, (c) in mean ($L^1$), (d) in mean square?

**T7.** $X_n$ is uniform on $\{\frac1n, \frac2n, \dots, \frac nn\}$. Show that $X_n\xrightarrow{d}\mathcal U[0,1]$.

**T8.** A fair die is rolled 100 times. Approximate the probability that the total is at least 380.

**T9.** $\mathbf X = (X_1, X_2)$ has mean $(1, -1)$ and covariance $\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}$. Let $Y_1 = X_1 + X_2$ and $Y_2 = X_1 - 2X_2$. Find $E[\mathbf Y]$, $C_{\mathbf Y}$ and the correlation of $Y_1$ and $Y_2$.

**T10.** $(X, Y)$ is bivariate normal with $\mu_X = 0$, $\mu_Y = 2$, $\sigma_X = 1$, $\sigma_Y = 3$, $\rho = -0.6$. Find $P(Y>2\mid X = 1)$ and $P(X + Y>0)$.

**T11. True or false?**
(a) If $X_n\xrightarrow{p}X$, then $E[X_n]\to E[X]$.
(b) If $X_n\xrightarrow{d}c$ for a constant $c$, then $X_n\xrightarrow{p}c$.
(c) A covariance matrix can have a negative entry on its diagonal.
(d) If $M_X(t) = M_Y(t)$ for all $t\in(-1, 1)$, then $X$ and $Y$ have the same distribution.
(e) In accept–reject, using a larger $c$ than necessary (still with $f\le cg$) produces samples with the wrong distribution.
(f) If $X$ and $Y$ are each $\mathcal N(0,1)$ and $\operatorname{Cov}(X, Y) = 0$, then $X$ and $Y$ are independent.

### Answers

**T1.** $M_X$ is the product of the Poisson$(2)$ MGF $e^{2(e^t - 1)}$ and the Exponential$(1)$ MGF $\frac{1}{1 - t}$. By uniqueness, $X$ has the distribution of $P + E$ with $P\sim$ Poisson$(2)$ and $E\sim$ Exp$(1)$ independent. With $K(t) = 2(e^t - 1) - \ln(1 - t)$: $E[X] = K'(0) = 2 + 1 = 3$ and $\operatorname{Var}(X) = K''(0) = 2 + 1 = 3$.

**T2.** $M_N(s) = \frac{pe^s}{1 - (1 - p)e^s}$ with $p = \frac14$, and $M_X(t) = \frac{2}{2 - t}$. Substituting $e^s = M_X(t)$:
$$M_S(t) = \frac{p\cdot\frac{2}{2 - t}}{1 - (1 - p)\frac{2}{2 - t}} = \frac{2p}{2p - t} = \frac{1/2}{1/2 - t}.$$
So $S\sim$ Exponential$(\frac12)$, with mean $2 = E[N]E[X] = 4\cdot\frac12$. ✓ (A geometric sum of exponentials is exponential.)

**T3.** (a) $F(x) = x^3$, so $X = U^{1/3}$. (b) Return 1 if $U\le0.2$, return 2 if $0.2<U\le0.7$, and return 3 otherwise.

**T4.** $c = \max f = f(\frac12) = 1.5$. The acceptance probability is $\frac1c = \frac23$, and 100 samples need $100c = 150$ proposals on average.

**T5.** The standard error is $\sqrt{\frac{p(1 - p)}{N}}\le\frac{1}{2\sqrt N}$, since $p(1 - p)\le\frac14$. So $\frac{1}{2\sqrt N}\le0.005$ gives $N\ge10{,}000$.

**T6.** (a) Yes: $\sum P(X_n\ne0) = \sum\frac{1}{n^2}<\infty$, so by Borel–Cantelli only finitely many $X_n$ are non-zero. (b) Yes, since a.s. implies p. (c) Yes: $E|X_n| = n\cdot\frac{1}{n^2} = \frac1n\to0$. (d) No: $E[X_n^2] = n^2\cdot\frac{1}{n^2} = 1$ for every $n$.

**T7.** For $0\le x\le1$, $F_{X_n}(x) = \frac{\lfloor nx\rfloor}{n}$, and $\big|\frac{\lfloor nx\rfloor}{n} - x\big|\le\frac1n\to0$. So $F_{X_n}(x)\to x$, the $\mathcal U[0,1]$ CDF (and the CDFs are 0 for $x<0$ and 1 for $x>1$).

**T8.** One roll has mean $3.5$ and variance $\frac{35}{12}$. So $S$ has mean 350 and SD $\sqrt{100\cdot\frac{35}{12}}\approx17.08$. With the continuity correction, $P(S\ge380) = P(S\ge379.5)\approx1 - \Phi\big(\frac{29.5}{17.08}\big) = 1 - \Phi(1.73)\approx0.042$. (The exact value is $0.0420$.)

**T9.** $A = \begin{bmatrix}1 & 1\\1 & -2\end{bmatrix}$, $E[\mathbf Y] = A(1, -1)^T = (0, 3)^T$, and
$$C_{\mathbf Y} = A\begin{bmatrix}2 & 1\\1 & 3\end{bmatrix}A^T = \begin{bmatrix}7 & -5\\-5 & 10\end{bmatrix},\qquad\rho_{Y_1Y_2} = \frac{-5}{\sqrt{70}}\approx-0.60 .$$
(Check: $\operatorname{Var}(Y_2) = 2 + 4\cdot3 - 4\cdot1 = 10$.)

**T10.** $Y\mid X = 1$ is normal with mean $2 + (-0.6)(3)\frac{1 - 0}{1} = 0.2$ and SD $3\sqrt{1 - 0.36} = 2.4$, so $P(Y>2\mid X = 1) = 1 - \Phi\big(\frac{1.8}{2.4}\big) = 1 - \Phi(0.75)\approx0.227$. Next, $X + Y$ is normal with mean 2 and variance $1 + 9 + 2(-0.6)(1)(3) = 6.4$, so $P(X + Y>0) = \Phi\big(\frac{2}{\sqrt{6.4}}\big) = \Phi(0.79)\approx0.785$.

**T11.** (a) False: $X_n = n$ with probability $\frac1n$ (else 0) goes to 0 in probability, but $E[X_n] = 1$. (b) True. (c) False: diagonal entries are variances. (d) True (uniqueness of MGFs). (e) False: the samples are still exactly right; it only takes more proposals ($c$ on average per sample). (f) False in general (the random-sign example, L20 slide 16). It is true if $(X, Y)$ is a Gaussian vector.


