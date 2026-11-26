---
title: "P&S endsem formula and cheat sheet"
subtitle: "Full syllabus (L1 to L24 + regression slides 1 to 36), organised by the 15 exam topics. Read, cover, recall. No Markov chains, no regression slides 37 to 56."
---

# Endsem formula and cheat sheet

## 0. Toolkit you use in every question

**Distributions** ($\Gamma$ uses rate $\lambda$; Geometric counts trials $1,2,\dots$)

| $X$ | pmf / pdf | $E[X]$ | $\operatorname{Var}(X)$ | $M_X(t)$ |
|---|---|---|---|---|
| Bern$(p)$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ | $1-p+pe^t$ |
| Bin$(n,p)$ | $\binom nk p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ | $(1-p+pe^t)^n$ |
| Geom$(p)$ | $(1-p)^{k-1}p$ | $\frac1p$ | $\frac{1-p}{p^2}$ | $\frac{pe^t}{1-(1-p)e^t}$ |
| Poi$(\lambda)$ | $e^{-\lambda}\frac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t-1)}$ |
| $\mathcal U[a,b]$ | $\frac1{b-a}$ | $\frac{a+b}2$ | $\frac{(b-a)^2}{12}$ | $\frac{e^{tb}-e^{ta}}{t(b-a)}$ |
| Exp$(\lambda)$ | $\lambda e^{-\lambda x}$ | $\frac1\lambda$ | $\frac1{\lambda^2}$ | $\frac{\lambda}{\lambda-t},\ t<\lambda$ |
| Gamma$(\alpha,\lambda)$ | $\frac{\lambda^\alpha x^{\alpha-1}e^{-\lambda x}}{\Gamma(\alpha)}$ | $\frac\alpha\lambda$ | $\frac\alpha{\lambda^2}$ | $\big(\frac\lambda{\lambda-t}\big)^\alpha$ |
| Beta$(\alpha,\beta)$ | $\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}$ | $\frac\alpha{\alpha+\beta}$ | $\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$ | — |
| $\mathcal N(\mu,\sigma^2)$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ | $e^{\mu t+\sigma^2t^2/2}$ |
| Laplace$(\mu,b)$ | $\frac1{2b}e^{-\lvert x-\mu\rvert/b}$ | $\mu$ | $2b^2$ | $\frac{e^{\mu t}}{1-b^2t^2}$ |

- $B(\alpha,\beta) = \frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}$, $\Gamma(n) = (n-1)!$, $\Gamma(\frac12) = \sqrt\pi$, $\int_0^\infty x^{k}e^{-\lambda x}dx = \frac{k!}{\lambda^{k+1}}$.
- **Modes:** Beta $\frac{\alpha-1}{\alpha+\beta-2}$; Gamma $\frac{\alpha-1}{\lambda}$. Exp is memoryless: $P(X>s+t\mid X>s) = e^{-\lambda t}$.
- **Expectation tricks:** $E[X] = \int_0^\infty P(X>x)dx$ for $X\ge0$; $E[X] = \sum_{k\ge1}P(X\ge k)$ on $\{0,1,\dots\}$. Indicators: $E[\mathbf 1_A] = P(A)$.
- $\operatorname{Var}(X) = E[X^2]-(E X)^2$; $\operatorname{Var}(\sum X_i) = \sum\operatorname{Var}X_i + 2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$; $\operatorname{Cov}(aX+b,cY+d) = ac\operatorname{Cov}(X,Y)$; $|\rho|\le1$.
- **Derived density, one variable:** CDF method $F_Y(y) = P(g(X)\le y)$, then differentiate. Monotone $g$: $f_Y(y) = f_X(g^{-1}(y))\,\big|\frac{d}{dy}g^{-1}(y)\big|$.
- **Max / min of i.i.d.:** $F_{\max} = F^n$, $1-F_{\min} = (1-F)^n$. Min of independent Exp$(\lambda_i)$ is Exp$(\sum\lambda_i)$.
- **Convolution:** $f_{X+Y}(z) = \int f_X(x)f_Y(z-x)\,dx$ (independent). Limits come from both supports.

---

## SECTION 1 (5 marks each)

## 1. MGF

$$M_X(t) = E[e^{tX}]$$

$$E[X^k] = M_X^{(k)}(0)$$

$$M_{aX+b}(t) = e^{bt}M_X(at)$$

- Independent: $M_{X+Y} = M_XM_Y$; i.i.d. sum $M_{S_n} = M_X^n$. $M(0) = 1$ always (sanity check).
- $K = \ln M$: $K'(0) = E X$, $K''(0) = \operatorname{Var}X$ (faster than differentiating $M$ twice).
- **Random sum** $Z = \sum_{i=1}^NX_i$, $N$ indep of the $X_i$: $M_Z(t) = M_N(\ln M_X(t))$, $E Z = E N\,E X$, $\operatorname{Var}Z = E N\operatorname{Var}X + (EX)^2\operatorname{Var}N$.
- **Mixture** (choose $Y_i$ w.p. $p_i$): $M = \sum p_iM_{Y_i}$. Read off a pmf: $M(t) = \sum p_ke^{tx_k}\Rightarrow P(X = x_k) = p_k$.
- **Uniqueness** (equal MGFs near 0 ⇒ same law) and **continuity** ($M_{X_n}\to M_X$ near 0 ⇒ $X_n\xrightarrow d X$).
- **Closed sums:** Bin+Bin (same $p$), Poi+Poi, Normal+Normal, $n$ Exp$(\lambda)$ = Gamma$(n,\lambda)$, Gamma+Gamma (same $\lambda$). Geom$(p)$ many Exp$(\lambda)$ = Exp$(p\lambda)$; Poi$(\lambda)$ many Bern$(p)$ = Poi$(\lambda p)$.

**Move:** "find the distribution of a sum / transform" = multiply MGFs, match the table. "Find moments" = differentiate at 0 (or expand as a power series and read $E[X^k]/k!$).
**Traps:** product rule needs independence. Say where $M$ is finite (Exp: $t<\lambda$). Cauchy has no MGF.

## 2. Tower rule (iterated expectation)

$$E[X] = E\big[E[X\mid Y]\big]$$

$$\operatorname{Var}(X) = E\big[\operatorname{Var}(X\mid Y)\big] + \operatorname{Var}\big(E[X\mid Y]\big)$$

- $E[X\mid Y]$ is a random variable, a function $g(Y)$ where $g(y) = E[X\mid Y=y]$.
- Pull out what is known: $E[h(Y)X\mid Y] = h(Y)E[X\mid Y]$. So $E[XY] = E[Y\,E[X\mid Y]]$.
- Independent: $E[X\mid Y] = E X$. Always $E\big[(X - E[X\mid Y])\,h(Y)\big] = 0$.
- $E[X\mid Y]$ minimises $E[(X-g(Y))^2]$ over all $g$ (the MMSE / CE estimator).
- Discrete version: $E X = \sum_y E[X\mid Y=y]P(Y=y)$; continuous: $\int E[X\mid Y=y]f_Y(y)dy$.

**Move:** when $X$ depends on a random parameter (stick broken at a uniform point, coin with random bias $p\sim\mathcal U$, Poisson with random rate), condition on the parameter, compute the inner mean/variance as a formula in it, then average.
**Classic:** stick of length $\ell$, break at $Y\sim\mathcal U[0,\ell]$, then $X\sim\mathcal U[0,Y]$: $E X = \frac\ell4$. Coin $P\sim\mathcal U[0,1]$, $n$ tosses: $E[\#H] = \frac n2$, $P(\#H = k) = \frac1{n+1}$.
**Traps:** $\operatorname{Var}X\ne E[\operatorname{Var}(X\mid Y)]$; the second term is easy to forget.

## 3. Conditioning (events, Bayes)

$$P(A\mid B) = \frac{P(A\cap B)}{P(B)}$$

$$P(A) = \sum_iP(A\mid B_i)P(B_i)$$

$$P(B_j\mid A) = \frac{P(A\mid B_j)P(B_j)}{\sum_iP(A\mid B_i)P(B_i)}$$

- Chain rule: $P(A_1\cdots A_n) = P(A_1)P(A_2\mid A_1)\cdots$. Independence: $P(AB) = P(A)P(B)$; mutual ≠ pairwise.
- **RV given an event** $A$: $f_{X\mid A}(x) = \frac{f_X(x)}{P(X\in A)}$ for $x\in A$, 0 elsewhere. $E[X\mid A] = \int xf_{X\mid A}$.
- **Total expectation:** $E X = \sum_iE[X\mid A_i]P(A_i)$. Use it for "first step" problems (e.g. $E[\text{tosses until HH}] = 6$).
- Geometric/Exp memorylessness: $X - s\mid X>s$ has the original law.

**Move:** tree diagram, write the partition, then Bayes. For mixed problems (discrete cause, continuous effect): $P(B\mid X=x) = \frac{f_{X\mid B}(x)P(B)}{\sum f_{X\mid B_i}(x)P(B_i)}$.
**Traps:** $P(A\mid B)\ne P(B\mid A)$ (base-rate). Conditioning on a zero-probability event needs densities.

## 4. Marginalization and conditioning (joint distributions)

$$f_X(x) = \int f_{X,Y}(x,y)\,dy$$

$$f_{X\mid Y}(x\mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$$

$$f_{X,Y} = f_Yf_{X\mid Y}$$

- Normalise first: $\iint f = 1$ gives the constant.
- **Draw the support.** Limits of $\int dy$ depend on $x$ (e.g. $0<y<x<1$: $f_X(x) = \int_0^xf\,dy$, $f_Y(y) = \int_y^1f\,dx$).
- $P((X,Y)\in A) = \iint_Af$. $E[g(X,Y)] = \iint g f$.
- **Independent ⇔** $f_{X,Y} = f_Xf_Y$, i.e. factorises **and** the support is a rectangle. $0<y<x<1$ is never independent.
- Conditional pdf in $x$ for fixed $y$ is a normalised slice of $f_{X,Y}$; read its family off the shape (e.g. uniform slice).
- Discrete: $p_X(x) = \sum_yp_{X,Y}(x,y)$; table row/column sums.
- **Continuous Bayes:** $f_{X\mid Y}(x\mid y) = \frac{f_{Y\mid X}(y\mid x)f_X(x)}{\int f_{Y\mid X}(y\mid x')f_X(x')dx'}$.

**Move:** sketch region → constant → marginals with $x$-dependent limits → conditional = joint/marginal with the support stated → $E[X\mid Y=y]$.
**Traps:** forgetting the support/indicator in the answer; marginal limits taken as constants on a triangular region; uncorrelated ≠ independent.

## 5. Inverse transform

$$X = F^{-1}(U),\ U\sim\mathcal U[0,1]$$

$$P(F^{-1}(U)\le x) = P(U\le F(x)) = F(x)$$

General $F$: $G(u) = \inf\{x : F(x)\ge u\}$. Conversely $F_X(X)\sim\mathcal U[0,1]$ for continuous $X$.

| Target | Sampler |
|---|---|
| $\mathcal U[a,b]$ | $a+(b-a)U$ |
| Exp$(\lambda)$ | $-\frac1\lambda\ln U$ (or $\ln(1-U)$) |
| Weibull $F = 1-e^{-(\lambda x)^k}$ | $\frac1\lambda(-\ln U)^{1/k}$ |
| $f = nx^{n-1}$ on $[0,1]$ | $U^{1/n}$ |
| Cauchy | $\tan(\pi(U-\frac12))$ |
| Pareto $F = 1-x^{-\alpha}$, $x\ge1$ | $U^{-1/\alpha}$ |
| Geom$(p)$ | $\lceil\ln U/\ln(1-p)\rceil$ |
| Gamma$(n,\lambda)$, integer $n$ | $-\frac1\lambda\ln(U_1\cdots U_n)$ |

- **Discrete:** return $x_k$ when $F(x_{k-1})<U\le F(x_k)$. Expected comparisons $= \sum_kk\,p_k$, so order values by decreasing $p_k$.
- Poisson: multiply uniforms until the product $<e^{-\lambda}$; $X$ = (number used) $-1$.
- Piecewise $F$: invert each piece on its own $u$-range.

**Move:** compute $F$ (integrate the pdf with care at the support), set $u = F(x)$, solve for $x$, state the $u$-range for each piece.
**Traps:** invert the CDF, not the pdf; check $F^{-1}$ lands in the support.

## 6. Monte Carlo

$$\theta = \int_a^bh(x)dx = (b-a)E[h(U)]$$

$$\hat\theta_N = \frac{b-a}N\sum_{i=1}^Nh(U_i)$$

- Unbiased; $\operatorname{Var}\hat\theta_N = \frac{(b-a)^2\sigma_h^2}{N}$; consistent by SLLN; CI by CLT: $\hat\theta\pm1.96\frac{\hat\sigma}{\sqrt N}$. Error $\propto\frac1{\sqrt N}$.
- **Sample size** for error $\le\epsilon$ w.p. $1-\delta$: Chebyshev $N\ge\frac{\sigma^2}{\epsilon^2\delta}$; CLT $N\ge\big(\frac{z\sigma}{\epsilon}\big)^2$.
- Probability $p = P(A)$: $\hat p$ = fraction of hits, $\operatorname{Var} = \frac{p(1-p)}N\le\frac1{4N}$. $\pi$: $P(U_1^2+U_2^2\le1) = \frac\pi4$, so $\hat\pi = 4\hat p$.
- Infinite range: $\int_0^\infty h = E[h(X)/f(X)]$ for any density $f>0$ there, e.g. $X\sim$Exp(1): $E[h(X)e^X]$. Or substitute $y = \frac1{1+x}$.
- Multiple integrals over $[0,1]^d$: same, average $h(U_1,\dots,U_d)$.
- **Importance sampling:** $E_f[h(X)] = E_g\big[h(Y)\frac{f(Y)}{g(Y)}\big]$, need $g>0$ where $hf\ne0$; best $g\propto|h|f$.

**Move:** rewrite the integral as an expectation, name the estimator, show $E = \theta$, compute its variance, then Chebyshev/CLT for $N$.
**Traps:** forgetting the $(b-a)$ factor; the variance is of $h(U)$, not of $U$.

## 7. Random vector

$$C_{\mathbf X} = E[(\mathbf X-\boldsymbol\mu)(\mathbf X-\boldsymbol\mu)^T] = E[\mathbf X\mathbf X^T]-\boldsymbol\mu\boldsymbol\mu^T$$

$$E[A\mathbf X+\mathbf b] = A\boldsymbol\mu+\mathbf b$$

$$C_{A\mathbf X+\mathbf b} = AC_{\mathbf X}A^T$$

- $C$ symmetric PSD: $\mathbf a^TC\mathbf a = \operatorname{Var}(\mathbf a^T\mathbf X)\ge0$. Singular ⇔ some $\mathbf a^T\mathbf X$ is constant. $\operatorname{Cov}(\mathbf a^T\mathbf X,\mathbf b^T\mathbf X) = \mathbf a^TC\mathbf b$.
- **Jacobian:** $\mathbf Y = G(\mathbf X)$, inverse $H$: $f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,|\det\frac{\partial H}{\partial\mathbf y}|$, $\ |\det\frac{\partial H}{\partial\mathbf y}| = 1/|\det\frac{\partial G}{\partial\mathbf x}|$. Affine: $\frac1{|\det A|}f_{\mathbf X}(A^{-1}(\mathbf y-\mathbf b))$. Polar: extra factor $r$. $(X_1+X_2,X_1-X_2)$: $|J| = \frac12$.
- One function only (e.g. $X_1/X_2$): add a dummy $Y_2 = X_2$, transform, integrate $y_2$ out.
- **Gaussian vector** $\mathcal N(\boldsymbol\mu,\Sigma)$: $f = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}e^{-\frac12(\mathbf x-\boldsymbol\mu)^T\Sigma^{-1}(\mathbf x-\boldsymbol\mu)}$. $A\mathbf X+\mathbf b\sim\mathcal N(A\boldsymbol\mu+\mathbf b, A\Sigma A^T)$; every $\mathbf a^T\mathbf X$ is normal; marginals = sub-blocks; uncorrelated ⇒ independent (jointly Gaussian only).
- **Generate** $\mathcal N(\boldsymbol\mu,\Sigma)$: $\mathbf X = A\mathbf Z+\boldsymbol\mu$, $AA^T = \Sigma$. 2×2 Cholesky $A = \begin{bmatrix}\sigma_1&0\\\rho\sigma_2&\sigma_2\sqrt{1-\rho^2}\end{bmatrix}$. Box–Muller: $\sqrt{-2\ln U_1}(\cos,\sin)(2\pi U_2)$.
- $2\times2$: $\det = ad-bc$, inverse $\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$.

**Traps:** $AC A^T$ not $A^TCA$; shift $\mathbf b$ drops out of $C$; state the new support after a Jacobian; $Y = \pm X$ (fair coin) is normal, uncorrelated with $X$, yet dependent.

## 8. Probabilistic inequalities

$$\text{Markov: } P(X\ge a)\le\frac{E X}{a}\ (X\ge0)$$

$$\text{Chebyshev: } P(|X-\mu|\ge c)\le\frac{\sigma^2}{c^2}$$

- Generalised Markov: $P(|X|\ge a)\le\frac{E|X|^r}{a^r}$; Chebyshev = Markov on $(X-\mu)^2$.
- **Chernoff** (Markov on $e^{tX}$): $P(X\ge a)\le\min_{t>0}e^{-ta}M_X(t)$.
- **Union bound:** $P(\cup A_i)\le\sum P(A_i)$. **Jensen:** $g$ convex ⇒ $g(E X)\le E[g(X)]$ (so $(EX)^2\le EX^2$, $E[1/X]\ge1/EX$ for $X>0$, $E\sqrt X\le\sqrt{EX}$). **Cauchy–Schwarz:** $(E[XY])^2\le E[X^2]E[Y^2]$.
- **Proof of Markov** (often asked): $a\mathbf 1\{X\ge a\}\le X$, take expectations.
- Chebyshev on the sample mean: $P(|M_n-\mu|\ge\epsilon)\le\frac{\sigma^2}{n\epsilon^2}$. Polling $\pm0.01$ at 95%: $n\ge\frac{1}{4\epsilon^2\delta} = 50{,}000$ (CLT gives 9604).
- Within $k$ sd: $P(|X-\mu|<k\sigma)\ge1-\frac1{k^2}$.

**Move:** compute the exact probability too when asked to compare, and comment that the bound is loose but distribution-free.
**Traps:** Markov needs $X\ge0$; a bound $>1$ is useless but not wrong.

## 9. SLLN and CLT

$X_i$ i.i.d., mean $\mu$, variance $\sigma^2<\infty$, $M_n = \frac{S_n}n$: $E M_n = \mu$, $\operatorname{Var}M_n = \frac{\sigma^2}n$.

- **WLLN:** $M_n\xrightarrow p\mu$ (proof: Chebyshev above). **SLLN:** $P(\lim M_n = \mu) = 1$ (needs only $E|X|<\infty$). Fails for Cauchy.
- **CLT:**
$$Z_n = \frac{S_n-n\mu}{\sigma\sqrt n}\xrightarrow d\mathcal N(0,1)$$

$$S_n\approx\mathcal N(n\mu,n\sigma^2),\quad M_n\approx\mathcal N\big(\mu,\tfrac{\sigma^2}n\big)$$
- **Continuity correction** (integer $S_n$): $P(S_n\le k)\approx\Phi\big(\frac{k+0.5-n\mu}{\sigma\sqrt n}\big)$, $P(S_n\ge k)\approx1-\Phi\big(\frac{k-0.5-n\mu}{\sigma\sqrt n}\big)$, $P(S_n = k)$ with $k\pm0.5$.
- Bin$(n,p)\approx\mathcal N(np,np(1-p))$; Poi$(\lambda)\approx\mathcal N(\lambda,\lambda)$; Gamma$(n,\lambda)\approx\mathcal N(\frac n\lambda,\frac n{\lambda^2})$.
- SLLN uses: Monte Carlo is consistent, the empirical frequency $\to p$, $\frac1n\sum g(X_i)\to E g(X)$ a.s., $\frac1n\sum X_i^2\to E X^2$.

**Move:** write the quantity as a sum of i.i.d. terms, find one term's $\mu,\sigma^2$, standardise, apply correction if integer, read $\Phi$.
**Traps:** $\sigma\sqrt n$ for the sum, $\sigma/\sqrt n$ for the mean; the CLT is about distribution, it says nothing a.s.

## 10. MSE and MLE (estimation)

$$b(\hat\Theta) = E[\hat\Theta]-\theta$$

$$\text{MSE} = E[(\hat\Theta-\theta)^2] = \operatorname{Var}(\hat\Theta)+b^2$$

- **Consistent:** $\hat\Theta_n\xrightarrow p\theta$. MSE $\to0$ ⇒ consistent (Markov on $(\hat\Theta-\theta)^2$). Biased can still be consistent.
- $\bar S^2 = \frac1{n-1}\sum(X_i-\bar X)^2$ is unbiased; $\frac1n\sum(X_i-\bar X)^2$ has mean $\frac{n-1}n\sigma^2$. $\sqrt{\bar S^2}$ is biased for $\sigma$ (Jensen).
- **Uniform$(0,\theta)$:** $M = \max X_i$ has $f_M = \frac{nm^{n-1}}{\theta^n}$, $E M = \frac n{n+1}\theta$, $\operatorname{Var} M = \frac{n\theta^2}{(n+1)^2(n+2)}$, $\text{MSE}(M) = \frac{2\theta^2}{(n+1)(n+2)}$. $\frac{n+1}nM$: unbiased, MSE $\frac{\theta^2}{n(n+2)}$. $2\bar X$: unbiased, MSE $\frac{\theta^2}{3n}$.
- **MLE:** $\hat\theta = \arg\max_\theta\sum_i\ln f(x_i;\theta)$. Set the derivative to 0, check it is a max, check the boundary. **Invariance:** MLE of $g(\theta)$ is $g(\hat\theta)$.

| Model | MLE |
|---|---|
| Bern$(p)$, Bin$(m,p)$ | $\bar x$, $\ \bar x/m$ |
| Poi$(\lambda)$ | $\bar x$ |
| Exp$(\lambda)$ | $1/\bar x$ (biased: $E = \frac n{n-1}\lambda$) |
| Geom$(p)$ | $1/\bar x$ |
| $\mathcal N(\mu,\sigma^2)$ | $\bar x$, $\ \frac1n\sum(x_i-\bar x)^2$ |
| $\mathcal U(0,\theta)$ | $\max x_i$ (do NOT differentiate) |
| $\mathcal U[a,b]$ | $\hat a = \min x_i$, $\hat b = \max x_i$ |
| Laplace location $\mu$ | sample median |
| Laplace scale $b$ | $\frac1n\sum\lvert x_i-\mu\rvert$ |
| Gamma$(\alpha,\lambda)$, $\alpha$ known | $\alpha/\bar x$ |
| $f = \theta x^{\theta-1}$ on $(0,1)$ | $-n/\sum\ln x_i$ |

- **Uniform$[a,b]$ bias:** $E[\min] = a+\frac{b-a}{n+1}$, $E[\max] = b-\frac{b-a}{n+1}$; both biased inward, consistent.
- **Regression (slides 1 to 36):** $y_i = \beta_0+\beta_1x_i+w_i$. Least squares $\min\sum(y_i-\beta_0-\beta_1x_i)^2$:
$$\hat\beta_1 = \frac{S_{xy}}{S_{xx}} = \frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2}$$

$$\hat\beta_0 = \bar y-\hat\beta_1\bar x$$
Through the origin: $\hat\beta = \frac{\sum x_iy_i}{\sum x_i^2}$. Gaussian noise ⇒ LS = MLE; $\hat\sigma^2_{ML} = \frac1n\sum e_i^2$. Laplace noise ⇒ MLE minimises $\sum|y_i-\beta_0-\beta_1x_i|$ (LAD).

**Move (MSE):** find the estimator's distribution (often via max/min CDF), then $E$, $E[\cdot^2]$, combine. **Move (MLE):** likelihood → log → derivative → solve → second derivative / boundary.
**Traps:** support depends on $\theta$ ⇒ likelihood is an indicator, maximise by inspection; MLE need not be unbiased.

---

## SECTION 2 (10 marks each)

## 11. Accept–reject

Target $f$, proposal $g$, constant $c$ with $f(x)\le cg(x)$ for all $x$. Repeat: $Y\sim g$, $U\sim\mathcal U[0,1]$; accept $X = Y$ if $U\le\frac{f(Y)}{cg(Y)}$.

$$P(\text{accept}) = \frac1c$$

$$\#\text{rounds}\sim\text{Geom}\big(\tfrac1c\big),\ E = c$$

$$c^* = \sup_x\frac{f(x)}{g(x)}$$

**Proof (write it):** $P(Y\le x,\text{acc}) = \int_{-\infty}^xg(y)\frac{f(y)}{cg(y)}dy = \frac{F(x)}c$; with $x\to\infty$, $P(\text{acc}) = \frac1c$; divide: $P(Y\le x\mid\text{acc}) = F(x)$.

- Find $c^*$: maximise $r(x) = f/g$ (derivative of $\ln r$ = 0, check endpoints). Need $c\ge1$ and supp $f\subseteq$ supp $g$.
- Unnormalised $\tilde f = Kf$ with $\tilde f\le\tilde cg$: still exact, acceptance $= \frac{\int\tilde f}{\tilde c}$.
- $k$ samples need $kc$ rounds on average, i.e. $2kc$ uniforms (one for $Y$ by inverse transform, one for $U$).
- **Known answers:** Beta$(2,4)$ with $\mathcal U$: $c = \frac{135}{64}$ at $x = \frac14$. Beta$(\alpha,\beta)$ with $\mathcal U$: $c = $ max of pdf at the mode. Half-normal $\sqrt{2/\pi}e^{-x^2/2}$ with Exp(1): $c = \sqrt{2e/\pi}\approx1.32$ at $x = 1$. Normal: generate half-normal, then attach a random sign.
- Best Exp$(\lambda)$ proposal for a Gamma target: optimise $c(\lambda)$ over $\lambda$ too (Gamma$(\frac52,1)$: $\lambda = \frac25$, $c\approx1.66$).

**Move (10 marks):** (a) check support and that $f/g$ is bounded, (b) find $c^*$ by calculus, (c) algorithm in steps with $g$ sampled by inverse transform, (d) acceptance $1/c$ and expected iterations $c$, (e) correctness proof above.
**Traps:** $g$ with lighter tails than $f$ (e.g. normal target, uniform proposal on all of $\mathbb R$) has no finite $c$; accept when $U\le f/(cg)$, not $\ge$.

## 12. Bayesian inference

$$f_{\Theta\mid X}(\theta\mid x) = \frac{f_{X\mid\Theta}(x\mid\theta)f_\Theta(\theta)}{\int f_{X\mid\Theta}(x\mid\theta')f_\Theta(\theta')d\theta'}$$

Posterior $\propto$ likelihood $\times$ prior.

- **MAP** $= \arg\max_\theta$ posterior $= \arg\max_\theta[\ln f_{X\mid\Theta}+\ln f_\Theta]$. Flat prior ⇒ MAP = MLE.
- **CE (LMS)** $= E[\Theta\mid X = x]$ = posterior mean; minimises the mean squared error. Its MSE is $E[\operatorname{Var}(\Theta\mid X)]$.
- Discrete prior: table of $\theta$, prior, likelihood, product, normalise.

**Conjugate pairs** (data $x_1..x_n$, $s = \sum x_i$):

| Prior | Likelihood | Posterior |
|---|---|---|
| Beta$(\alpha,\beta)$ | Bern$(\theta)$ / Bin, $k$ successes in $n$ | Beta$(\alpha+k,\ \beta+n-k)$ |
| Beta$(\alpha,\beta)$ | Geom$(\theta)$ on $1,2,\dots$ | Beta$(\alpha+n,\ \beta+s-n)$ |
| Gamma$(\alpha,\beta)$ | Poi$(\lambda)$ | Gamma$(\alpha+s,\ \beta+n)$ |
| Gamma$(\alpha,\beta)$ | Exp$(\lambda)$ | Gamma$(\alpha+n,\ \beta+s)$ |
| $\mathcal N(\mu_0,\sigma_0^2)$ | $\mathcal N(\theta,\sigma^2)$, $\sigma$ known | $\mathcal N(\mu_n,\sigma_n^2)$ below |

$$\frac1{\sigma_n^2} = \frac1{\sigma_0^2}+\frac n{\sigma^2}$$

$$\mu_n = \sigma_n^2\Big(\frac{\mu_0}{\sigma_0^2}+\frac{s}{\sigma^2}\Big);$$

$$\sigma_0 = \sigma:\ \mu_n = \frac{s+\mu_0}{n+1},\ \sigma_n^2 = \frac{\sigma^2}{n+1}$$

(Slides 41 and 52 print $/n$; the correct denominator is $n+1$.) Gaussian: MAP = CE = $\mu_n$.

- **Beta$(a,b)$ posterior:** CE $= \frac a{a+b}$, MAP $= \frac{a-1}{a+b-2}$. Uniform prior = Beta(1,1): MAP $= \frac kn$ (= MLE), CE $= \frac{k+1}{n+2}$ (Laplace).
- **Gamma$(a,b)$ posterior:** CE $= \frac ab$, MAP $= \frac{a-1}b$.
- **Predictive:** $P(\text{next success}\mid\text{data}) = E[\Theta\mid\text{data}]$.
- As $n\to\infty$ the prior washes out: MAP, CE → MLE.

**Move (10 marks):** (a) write likelihood $\prod f(x_i\mid\theta)$ and prior, (b) multiply, drop constants, recognise the kernel ($\theta^{a-1}(1-\theta)^{b-1}$ → Beta; $\theta^{a-1}e^{-b\theta}$ → Gamma; $e^{-\text{quadratic}}$ → Normal, complete the square), (c) MAP by mode or derivative, (d) CE by the family mean or direct integral, (e) compare with MLE.
**Traps:** prior support restricts the posterior (prior on $[0,\frac12]$ ⇒ MAP is clipped); for $\mathcal U(0,\theta)$ data the likelihood is $\theta^{-n}\mathbf 1\{\theta\ge\max x_i\}$; keep track of rate vs scale in Gamma.

## 13. Limit theorems (two 10-mark questions)

**Modes** for $X_n\to X$: sure; a.s. $P(X_n\to X) = 1$; in probability $P(|X_n-X|>\epsilon)\to0\ \forall\epsilon$; $L^r$: $E|X_n-X|^r\to0$; in distribution $F_{X_n}(x)\to F_X(x)$ at continuity points.

$$\text{a.s.}\Rightarrow\text{p}\Rightarrow\text{d}$$

$$L^s\Rightarrow L^r\Rightarrow\text{p}\ (s>r\ge1)$$

$$\text{d to a constant}\Rightarrow\text{p}$$

- **Prove a.s.:** fix $\omega$ (e.g. $X_n(\omega) = \omega^n$ on $[0,1)$), or **BC1:** $\sum_nP(|X_n-X|>\epsilon)<\infty\ \forall\epsilon$ ⇒ a.s.
- **BC2:** independent and $\sum P(A_n) = \infty$ ⇒ $A_n$ i.o. w.p. 1. Independent Bern$(p_n)\to0$ a.s. iff $\sum p_n<\infty$.
- **Prove p:** compute $P(|X_n-X|>\epsilon)$ directly, or Markov/Chebyshev, or show $L^2$: $E(X_n-c)^2 = \operatorname{Var}X_n+(EX_n-c)^2\to0$.
- **Prove d:** CDFs (max/min!), pmfs for integer values, or MGFs.
- **Continuous mapping:** $g$ continuous keeps a.s., p, d.

**Counterexamples:** Bern$(\frac1n)$ independent: p and m.s., not a.s. $\ X_n = n$ w.p. $\frac1n$: p, not $L^1$. $\ n\mathbf 1\{U\le\frac1n\}$: a.s., not $L^1$. $\ X_n = -X$, $X\sim\mathcal N(0,1)$: d, not p.

**Standard limits:**

- $n\min(U_1..U_n)\xrightarrow d$ Exp(1); $\max U_i\to1$ a.s. ($P(\max<1-\epsilon) = (1-\epsilon)^n$, summable); $n(1-\max U_i)\xrightarrow d$ Exp(1).
- Bin$(n,\frac\lambda n)\xrightarrow d$ Poi$(\lambda)$: $M = (1+\frac\lambda n(e^t-1))^n\to e^{\lambda(e^t-1)}$.
- $(1-\frac\lambda n)^n\to e^{-\lambda}$, $(1+\frac xn)^n\to e^x$, $\sum n^{-p}<\infty$ iff $p>1$.
- **CLT via MGF:** $M_{Z_n}(t) = [M_Y(\frac t{\sqrt n})]^n = [1+\frac{t^2}{2n}+o(\frac1n)]^n\to e^{t^2/2}$, $Y = \frac{X-\mu}\sigma$.
- **WLLN proof:** Chebyshev, $\frac{\sigma^2}{n\epsilon^2}\to0$.
- Function sequences: uniform iff $\sup_x|f_n-f|\to0$ ($x^n$ on $[0,1]$ not uniform; $nxe^{-nx}$ sup $\frac1e$, not uniform).

**Move (10 marks):** name the candidate limit, test each mode in the order d → p → m.s. → a.s., give a one-line reason or counterexample for each; for the CLT part, compute $\mu,\sigma$ per term and give the numerical $\Phi$ answer.
**Traps:** convergence in p says nothing about $E X_n$; BC2 needs independence; compare CDFs only at continuity points ($X_n = \frac1n$: $F_n(0) = 0$ but $X_n\to0$ in d).

## 14. Random vector (10-mark version)

Likely parts: build/verify $C$, distribution of $A\mathbf X+\mathbf b$, a Jacobian density, a Gaussian conditional, or generating a correlated pair.

$$\mathbf X_1\mid\mathbf X_2 = \mathbf x_2\sim\mathcal N(\boldsymbol\mu_{1|2},\Sigma_{1|2})$$

$$\boldsymbol\mu_{1|2} = \boldsymbol\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(\mathbf x_2-\boldsymbol\mu_2)$$

$$\Sigma_{1|2} = \Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}$$

**Bivariate normal** ($\rho = \frac{\sigma_{12}}{\sigma_1\sigma_2}$):
$$X_1\mid X_2 = x_2\sim\mathcal N\Big(\mu_1+\rho\sigma_1\tfrac{x_2-\mu_2}{\sigma_2},\ (1-\rho^2)\sigma_1^2\Big)$$

$$\begin{gathered}aX_1+bX_2\sim\mathcal N(a\mu_1+b\mu_2,\ \sigma^2_{ab})\\ \sigma^2_{ab} = a^2\sigma_1^2+b^2\sigma_2^2+2ab\rho\sigma_1\sigma_2\end{gathered}$$

- $X_1-\frac{\sigma_{12}}{\sigma_{22}}X_2$ is independent of $X_2$. Equal variances ⇒ $X_1+X_2\perp X_1-X_2$.
- MGF $M(\mathbf s) = e^{\mathbf s^T\boldsymbol\mu+\frac12\mathbf s^T\Sigma\mathbf s}$. Ellipse $(\mathbf x-\boldsymbol\mu)^T\Sigma^{-1}(\mathbf x-\boldsymbol\mu)\le c$ holds $1-e^{-c/2}$ in 2-D.
- Total covariance: $\operatorname{Cov}\mathbf Y = E[\operatorname{Cov}(\mathbf Y\mid\mathbf X)]+\operatorname{Cov}(E[\mathbf Y\mid\mathbf X])$; $\mathbf Y = A\mathbf X+\mathbf Z$ independent: $A\Sigma_XA^T+\Sigma_Z$.
- **Jacobian checklist:** inverse map → partials → $|J|$ → substitute → **support** → (marginalise the dummy).

---

## 15. Key numbers and last-minute traps

| $z$ | 0.5 | 1 | 1.28 | 1.5 | 1.645 | 1.96 | 2 | 2.33 | 2.576 | 3 |
|---|---|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | .6915 | .8413 | .8997 | .9332 | .95 | .975 | .9772 | .9901 | .995 | .9987 |

$\Phi(-z) = 1-\Phi(z)$. Two-sided: 90% ↔ 1.645, 95% ↔ 1.96, 99% ↔ 2.576. $P(|Z|\le1) = .683$, $\le2$: .954, $\le3$: .997. $\ln2 = .693$, $e^{-1} = .368$, $\sqrt{2\pi} = 2.507$.

1. Always state the support with every pdf you write (joint, conditional, transformed, posterior).
2. Independence is needed for $M_{X+Y} = M_XM_Y$, $\operatorname{Var}(X+Y) = \operatorname{Var}X+\operatorname{Var}Y$, BC2.
3. Law of total variance has two terms.
4. Inverse transform inverts $F$; accept–reject accepts when $U\le f/(cg)$; MC needs the $(b-a)$ factor.
5. CLT: integer sums take a continuity correction; sum uses $\sigma\sqrt n$, mean $\sigma/\sqrt n$.
6. $\theta$-dependent support ⇒ MLE by inspection (max / min), not calculus.
7. Recognise posterior kernels; Gamma here is rate $\beta$; Normal–Normal denominator $n+1$ when $\sigma_0 = \sigma$.
8. Uncorrelated ⇒ independent only for jointly Gaussian vectors.
9. $C_{A\mathbf X} = ACA^T$; Jacobian uses $|J|$ of the inverse map.
10. Show the derivation: the prof gives marks for the standard move written cleanly, even if arithmetic slips.
