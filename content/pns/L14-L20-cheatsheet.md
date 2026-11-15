---
title: "P&S (MA6.101) cheat sheet: Lectures 14 to 20"
subtitle: "MGFs · simulation · convergence · LLN and CLT · random vectors · Gaussian vectors · exam traps. Explanations and worked problems are in the Lectures 14 to 20 notes."
---

## 1. Moment generating functions (L14)

### Definition and moments

$$M_X(t) = E[e^{tX}] = \sum_xe^{tx}p_X(x)\ \text{ or }\ \int e^{tx}f_X(x)\,dx$$

- Region of convergence $D_X = \{t : M_X(t)<\infty\}$ is an interval containing 0, and $M_X(0) = 1$ (sanity check).
- Useful only when finite on some $(-\epsilon, \epsilon)$. Then $E[X^k] = M_X^{(k)}(0)$ and $M_X(t) = \sum_kE[X^k]\frac{t^k}{k!}$. Cauchy has $M(t) = \infty$ for all $t\ne0$.
- **Shortcut:** $K(t) = \ln M_X(t)$ gives $K'(0) = E[X]$ and $K''(0) = \operatorname{Var}(X)$. Exponential$(\lambda)$: $E[X^r] = \frac{r!}{\lambda^r}$.

### Rules

- **Linear:** $M_{aX + b}(t) = e^{bt}M_X(at)$.
- **Independent sum:** $M_{X + Y} = M_XM_Y$. i.i.d. sum: $M_{S_n} = (M_X)^n$.
- **Random sum** $Z = \sum_{i=1}^NX_i$, $N$ independent of the $X_i$:
$$M_Z(t) = M_N\big(\ln M_X(t)\big)$$
$$E[Z] = E[N]E[X],\quad\operatorname{Var}(Z) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N)$$
- **Mixture** (pick $Y_i$ with probability $p_i$): $M_X = \sum_ip_iM_{Y_i}$ and $f_X = \sum_ip_if_{Y_i}$.
- **Uniqueness:** equal MGFs near 0 mean equal distributions. $\sum_kp_ke^{tx_k}$ means $P(X = x_k) = p_k$.
- **Continuity:** $M_{X_n}(t)\to M_X(t)$ near 0 implies $X_n\xrightarrow{d}X$.

### Table

| $X$ | $M_X(t)$ | $E[X]$ | $\operatorname{Var}(X)$ |
|---|---|---|---|
| Bernoulli$(p)$ | $1 - p + pe^t$ | $p$ | $p(1 - p)$ |
| Bin$(n,p)$ | $(1 - p + pe^t)^n$ | $np$ | $np(1 - p)$ |
| Geom$(p)$ on $1, 2, \dots$ | $\frac{pe^t}{1 - (1 - p)e^t}$ | $\frac1p$ | $\frac{1 - p}{p^2}$ |
| Poisson$(\lambda)$ | $e^{\lambda(e^t - 1)}$ | $\lambda$ | $\lambda$ |
| $\mathcal U[a,b]$ | $\frac{e^{tb} - e^{ta}}{t(b - a)}$ | $\frac{a + b}{2}$ | $\frac{(b - a)^2}{12}$ |
| Exp$(\lambda)$ | $\frac{\lambda}{\lambda - t}$ | $\frac1\lambda$ | $\frac{1}{\lambda^2}$ |
| Gamma$(\alpha,\lambda)$ | $\big(\frac{\lambda}{\lambda - t}\big)^\alpha$ | $\frac\alpha\lambda$ | $\frac{\alpha}{\lambda^2}$ |
| $\mathcal N(\mu,\sigma^2)$ | $e^{\mu t + \sigma^2t^2/2}$ | $\mu$ | $\sigma^2$ |

Finite for all $t$, except Geometric ($t<-\ln(1 - p)$) and Exponential, Gamma ($t<\lambda$).

### Sums you can name at once (independent terms)

- Bin$(n,p)$ + Bin$(m,p)$ = Bin$(n + m, p)$; Poisson$(\lambda)$ + Poisson$(\mu)$ = Poisson$(\lambda + \mu)$.
- $\mathcal N(\mu_1,\sigma_1^2) + \mathcal N(\mu_2,\sigma_2^2) = \mathcal N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$.
- $n$ i.i.d. Exp$(\lambda)$ = Gamma$(n,\lambda)$; Gamma$(\alpha,\lambda)$ + Gamma$(\beta,\lambda)$ = Gamma$(\alpha + \beta,\lambda)$.
- Geometric$(p)$ many Exp$(\lambda)$ = Exp$(p\lambda)$; Poisson$(\lambda)$ many Bernoulli$(p)$ = Poisson$(\lambda p)$.

## 2. Simulation (L14 to L16)

### Discrete inverse transform

Values $x_1<x_2<\dots$ with $F_k = P(X\le x_k)$: return $x_k$ when $F_{k-1}<U\le F_k$ (probability $p_k$). Average number of comparisons is $\sum_kk\,p_k$, so test likely values first.

- Bernoulli: $\mathbf 1\{U\le p\}$. Binomial: add $n$ Bernoullis.
- Geometric$(p)$: $X = \big\lceil\frac{\ln U}{\ln(1 - p)}\big\rceil$.
- Poisson$(\lambda)$: recursion $p_{k+1} = p_k\frac{\lambda}{k + 1}$ in the search, or multiply uniforms until the product drops below $e^{-\lambda}$; $X$ = factors used $- 1$.

### Continuous inverse transform

$X = F^{-1}(U)$. In general use $G(u) = \inf\{x : F(x)\ge u\}$, since $G(u)\le x\iff u\le F(x)$, so $P(G(U)\le x) = F(x)$.

| Target | Sampler |
|---|---|
| $\mathcal U[a,b]$ | $a + (b - a)U$ |
| Exp$(\lambda)$ | $-\frac1\lambda\ln U$ |
| Weibull, $F = 1 - e^{-(\lambda x)^k}$ | $\frac1\lambda(-\ln U)^{1/k}$ |
| $f(x) = nx^{n-1}$ on $[0,1]$ | $U^{1/n}$ |
| Cauchy | $\tan\big(\pi(U - \frac12)\big)$ |
| Gamma$(n,\lambda)$, integer $n$ | $-\frac1\lambda\ln(U_1\cdots U_n)$ |
| $\mathcal N(0,1)$ | no closed $F^{-1}$: Box–Muller |

**Probability integral transform:** $X$ continuous $\Rightarrow F_X(X)\sim\mathcal U[0,1]$. Used for goodness of fit, and $F_Y^{-1}(F_X(X))$ turns $X$ into $Y$.

### Monte Carlo integration

$$\int_a^bh(x)\,dx = (b - a)E[h(U)]\approx\frac{b - a}{N}\sum_{i=1}^Nh(U_i)$$

- Unbiased; standard error $\frac{(b - a)\sigma_h}{\sqrt N}$; 95% interval $\hat\theta\pm1.96\frac{\hat\sigma}{\sqrt N}$. Ten times the accuracy costs 100 times the samples.
- $\int_0^\infty h\,dx$: substitute $y = \frac{1}{1 + x}$ to get $\int_0^1h\big(\frac1y - 1\big)\frac{dy}{y^2}$, or use $X\sim$ Exp(1): $E\big[h(X)e^X\big]$.
- Probability by simulation: $\hat p$ = fraction of hits, SE $=\sqrt{p(1 - p)/N}\le\frac{1}{2\sqrt N}$. $\pi$: $P(U_1^2 + U_2^2\le1) = \frac\pi4$.

### Importance sampling

$$E_f[h(X)] = E_g\Big[h(Y)\frac{f(Y)}{g(Y)}\Big]\approx\frac1N\sum_ih(Y_i)\frac{f(Y_i)}{g(Y_i)},\quad Y_i\sim g$$

- **Support condition:** $g>0$ wherever $hf\ne0$, otherwise the estimate is silently biased.
- Best $g\propto|h|f$ (zero variance when $h\ge0$). The proposal needs tails at least as heavy as $hf$.
- Rare events: move $g$ to the region. $P(Z>5)$ with $Y\sim\mathcal N(5,1)$: weight $\frac{\varphi(y)}{\varphi(y - 5)} = e^{-5y + 12.5}$.

### Accept–reject

Need $f\le cg$ (so $c\ge1$ and the support of $f$ lies inside that of $g$). Draw $Y\sim g$ and $U$; accept $X = Y$ if $U\le\frac{f(Y)}{c\,g(Y)}$, else repeat.

- $P(\text{accept}) = \frac1c$. Rounds per sample $\sim$ Geometric$(\frac1c)$, mean $c$; $k$ samples take $kc$ rounds on average.
- Best $c = \sup_x\frac{f(x)}{g(x)}$: maximise the ratio by calculus.
- Unnormalised target $\tilde f$ (constant $\int\tilde f$ unknown): bound $\tilde f\le\tilde cg$; it still works, with acceptance probability $\frac{\int\tilde f}{\tilde c}$.
- Known values: Beta(2,4) with $\mathcal U$: $c = \frac{135}{64}$. Half-normal with Exp(1): $c = \sqrt{2e/\pi}\approx1.32$. Gamma$(\frac52,1)$ with Exp$(\frac25)$: $c\approx1.66$.

### Normal samples

- **Box–Muller:** $Z_1 = \sqrt{-2\ln U_1}\cos2\pi U_2$ and $Z_2 = \sqrt{-2\ln U_1}\sin2\pi U_2$ are i.i.d. $\mathcal N(0,1)$.
- **Any** $\mathcal N(\boldsymbol\mu,\Sigma)$: $\mathbf X = A\mathbf Z + \boldsymbol\mu$ with $AA^T = \Sigma$ (Cholesky). For $2\times2$: $A = \begin{bmatrix}\sigma_1 & 0\\ \rho\sigma_2 & \sigma_2\sqrt{1 - \rho^2}\end{bmatrix}$.

## 3. Convergence (L16 to L18)

### Functions: pointwise vs uniform

Pointwise: $f_n(x)\to f(x)$ for each $x$. Uniform: $\sup_x|f_n(x) - f(x)|\to0$; find the sup by calculus.

- $x^n$ on $[0,1]$: pointwise to $\mathbf 1\{x = 1\}$, not uniform (the limit jumps).
- $nxe^{-nx}$ on $[0,\infty)$: pointwise to 0, sup $=\frac1e$ at $x = \frac1n$: not uniform.
- $\frac{x}{1 + nx^2}$: sup $=\frac{1}{2\sqrt n}\to0$: uniform. $\frac{\sin nx}{n}$: uniform.

### Five modes for $X_n\to X$

| Mode | Meaning |
|---|---|
| sure | $X_n(\omega)\to X(\omega)$ for every $\omega$ |
| a.s. | $P\big(\{\omega : X_n(\omega)\to X(\omega)\}\big) = 1$ |
| in probability | $P(\lvert X_n - X\rvert>\epsilon)\to0$ for all $\epsilon>0$ |
| $L^r$ ($r\ge1$) | $E\lvert X_n - X\rvert^r\to0$; $r = 2$: mean square |
| in distribution | $F_{X_n}(x)\to F_X(x)$ at continuity points of $F_X$ |

**Implications:** sure $\Rightarrow$ a.s. $\Rightarrow$ p $\Rightarrow$ d, and for $s>r\ge1$, $L^s\Rightarrow L^r\Rightarrow$ p. d $\Rightarrow$ p only when the limit is a constant. Nothing else holds in general.

### Counterexamples to memorise

- **p but not a.s.:** independent $X_n\sim$ Bernoulli$(\frac1n)$: $\sum\frac1n = \infty$, so infinitely many 1s. Also in m.s. (so m.s. $\not\Rightarrow$ a.s.).
- **p but not $L^1$:** $X_n = n$ with probability $\frac1n$, else 0: $E|X_n| = 1$.
- **a.s. but not $L^1$:** $X_n = n\mathbf 1\{U\le\frac1n\}$ (one $U$): $\to0$ a.s., $E[X_n] = 1$.
- **d but not p:** $X\sim\mathcal N(0,1)$, $X_n = -X$.

### How to prove each

- **a.s.:** fix $\omega$ and find the limit ($\omega^n\to0$ on $[0,1)$), or Borel–Cantelli: $\sum_nP(|X_n - X|>\epsilon)<\infty$ for every $\epsilon$.
- **p:** compute $P(|X_n - X|>\epsilon)$, or use Markov / Chebyshev, or show $L^r$.
- **m.s. to $c$:** $E(X_n - c)^2 = \operatorname{Var}(X_n) + (E[X_n] - c)^2\to0$.
- **d:** CDFs; or for integer values $P(X_n = k)\to P(X = k)$ for all $k$; or MGFs.
- **Continuous mapping:** $g$ continuous keeps a.s., p and d convergence: $g(X_n)\to g(X)$.

### Borel–Cantelli

- **BC1:** $\sum_nP(A_n)<\infty\Rightarrow P(A_n\text{ i.o.}) = 0$ (no independence needed).
- **BC2:** $A_n$ independent and $\sum_nP(A_n) = \infty\Rightarrow P(A_n\text{ i.o.}) = 1$.
- Independent Bernoulli$(p_n)$: $X_n\to0$ a.s. exactly when $\sum p_n<\infty$ ($\frac{1}{n^2}$ yes, $\frac1n$ no).

### Inequalities and laws of large numbers

- **Markov:** $P(X\ge a)\le\frac{E[X]}{a}$ for $X\ge0$. **Chebyshev:** $P(|X - \mu|\ge c)\le\frac{\sigma^2}{c^2}$.
- Sample mean $M_n = \frac{S_n}{n}$: $E[M_n] = \mu$, $\operatorname{Var}(M_n) = \frac{\sigma^2}{n}$; update $M_n = M_{n-1} + \frac1n(X_n - M_{n-1})$.
- **WLLN:** $P(|M_n - \mu|\ge\epsilon)\le\frac{\sigma^2}{n\epsilon^2}\to0$. **SLLN:** $M_n\to\mu$ a.s. (fails for Cauchy).
- **Polling** ($\pm0.01$, 95%): Chebyshev $n\ge\frac{1}{4\epsilon^2\delta} = 50{,}000$; CLT $n\ge\frac{1.96^2}{4\epsilon^2} = 9604$.

### Handy limits

- $\big(1 - \frac\lambda n\big)^n\to e^{-\lambda}$; $\big(1 + \frac xn\big)^n\to e^x$; $\sum\frac{1}{n^p}<\infty$ iff $p>1$.
- $n$ i.i.d. $\mathcal U[0,1]$: $P(\max\le x) = x^n$, $P(\min>x) = (1 - x)^n$; $n\cdot\min\xrightarrow{d}$ Exp(1).
- Bin$(n,\frac\lambda n)\xrightarrow{d}$ Poisson$(\lambda)$. $\mathcal U(0,\frac1n)$ and $\mathcal N(0,\frac1n)$ go to 0 a.s., in p, in m.s. and in d (BC1 gives a.s. whatever the joint construction).

## 4. Central limit theorem (L18)

$X_i$ i.i.d. with mean $\mu$ and variance $\sigma^2<\infty$:
$$Z_n = \frac{S_n - n\mu}{\sigma\sqrt n} = \frac{M_n - \mu}{\sigma/\sqrt n}\xrightarrow{d}\mathcal N(0,1)$$

- So $S_n\approx\mathcal N(n\mu, n\sigma^2)$ and $M_n\approx\mathcal N(\mu, \frac{\sigma^2}{n})$. Recipe: write as a sum, find $\mu,\sigma$, standardise, use $\Phi$.
- **Continuity correction** (integer-valued $S_n$): $P(S_n\le k)\approx\Phi\big(\frac{k + 0.5 - n\mu}{\sigma\sqrt n}\big)$, $P(S_n\ge k)\approx1 - \Phi\big(\frac{k - 0.5 - n\mu}{\sigma\sqrt n}\big)$, and $P(S_n = k)$ uses $k\pm0.5$.
- Bin$(n,p)\approx\mathcal N(np, np(1 - p))$; Poisson$(\lambda)\approx\mathcal N(\lambda,\lambda)$ for large $\lambda$.
- Sample size for margin $\epsilon$ at 95%: $n\ge\big(\frac{1.96\sigma}{\epsilon}\big)^2$.
- **Proof idea:** $M_{Z_n}(t) = \big[M_Y\big(\frac{t}{\sqrt n}\big)\big]^n = \big[1 + \frac{t^2}{2n} + o(\frac1n)\big]^n\to e^{t^2/2}$, where $Y = \frac{X - \mu}{\sigma}$.

| $z$ | 0.5 | 1 | 1.28 | 1.5 | 1.645 |
|---|---|---|---|---|---|
| $\Phi(z)$ | 0.6915 | 0.8413 | 0.8997 | 0.9332 | 0.95 |

| $z$ | 1.96 | 2 | 2.33 | 2.576 | 3 |
|---|---|---|---|---|---|
| $\Phi(z)$ | 0.975 | 0.9772 | 0.9901 | 0.995 | 0.9987 |

$\Phi(-z) = 1 - \Phi(z)$.

## 5. Random vectors (L19)

### Mean and covariance

- $E[\mathbf X] = (E[X_1],\dots,E[X_n])^T$ and $E[A\mathbf X + \mathbf b] = AE[\mathbf X] + \mathbf b$ for any $m\times n$ matrix $A$.
- $C_{\mathbf X} = E\big[(\mathbf X - \boldsymbol\mu)(\mathbf X - \boldsymbol\mu)^T\big] = E[\mathbf X\mathbf X^T] - \boldsymbol\mu\boldsymbol\mu^T$, with $C_{ij} = \operatorname{Cov}(X_i,X_j)$ and variances on the diagonal.
- Symmetric and PSD: $\mathbf a^TC\mathbf a = \operatorname{Var}(\mathbf a^T\mathbf X)\ge0$. Singular exactly when some $\mathbf a^T\mathbf X$ ($\mathbf a\ne\mathbf 0$) is constant.
$$C_{A\mathbf X + \mathbf b} = AC_{\mathbf X}A^T,\quad\operatorname{Cov}(\mathbf a^T\mathbf X, \mathbf b^T\mathbf X) = \mathbf a^TC\mathbf b$$
- $E[(\mathbf a^T\mathbf X)^2] = \mathbf a^TC\mathbf a + (\mathbf a^T\boldsymbol\mu)^2$; correlation $\rho_{ij} = \frac{C_{ij}}{\sqrt{C_{ii}C_{jj}}}$.
- Independent components $\Rightarrow$ diagonal $C$ (the converse needs Gaussian).
- **Total covariance:** $\operatorname{Cov}(\mathbf Y) = E[\operatorname{Cov}(\mathbf Y\mid\mathbf X)] + \operatorname{Cov}(E[\mathbf Y\mid\mathbf X])$. For $\mathbf Y = A\mathbf X + \mathbf Z$ with independent parts: $A\Sigma_XA^T + \Sigma_Z$.

### Jacobian (change of variables)

$\mathbf Y = G(\mathbf X)$, $G:\mathbb R^n\to\mathbb R^n$ invertible, inverse $H$:
$$f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}\big(H(\mathbf y)\big)\,|J|,\qquad J = \det\Big[\frac{\partial H_i}{\partial y_j}\Big]$$

1. Solve $\mathbf y = G(\mathbf x)$ for $\mathbf x = H(\mathbf y)$.
2. $J$ from the partials of $H$, or $J = 1/\det\big[\frac{\partial G_i}{\partial x_j}\big]$ at $\mathbf x = H(\mathbf y)$.
3. Substitute, and take $|J|$.
4. **State the support:** the $\mathbf y$ whose $H(\mathbf y)$ lies where $f_{\mathbf X}>0$.

- **Affine:** $f_{\mathbf Y}(\mathbf y) = \frac{1}{|\det A|}f_{\mathbf X}\big(A^{-1}(\mathbf y - \mathbf b)\big)$.
- Sum and difference $(X_1 + X_2, X_1 - X_2)$: $|J| = \frac12$. Polar $x = r\cos\theta$, $y = r\sin\theta$: $f_{R,\Theta}(r,\theta) = f_{X,Y}(x,y)\,r$.
- Density of one function only (say $X_1 + X_2$): add $Y_2 = X_2$, transform, then integrate $y_2$ out.
- $\det\begin{bmatrix}a & b\\c & d\end{bmatrix} = ad - bc$ and $\begin{bmatrix}a & b\\c & d\end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix}d & -b\\-c & a\end{bmatrix}$.

## 6. Gaussian vectors (L20)

### Definition, density, MGF

Standard normal vector $\mathbf Z$: i.i.d. $\mathcal N(0,1)$ entries, $E[\mathbf Z] = \mathbf 0$, $C_{\mathbf Z} = I$, $f_{\mathbf Z}(\mathbf z) = (2\pi)^{-n/2}e^{-\mathbf z^T\mathbf z/2}$.

$\mathbf X\sim\mathcal N(\boldsymbol\mu,\Sigma)$ means any (all equivalent):

- $\mathbf X = A\mathbf Z + \boldsymbol\mu$ with $AA^T = \Sigma$;
- every $\mathbf a^T\mathbf X\sim\mathcal N(\mathbf a^T\boldsymbol\mu, \mathbf a^T\Sigma\mathbf a)$;
- ($\Sigma$ invertible) the pdf
$$f(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}e^{-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)}$$

MGF $M(\mathbf s) = e^{\mathbf s^T\boldsymbol\mu + \frac12\mathbf s^T\Sigma\mathbf s}$: the distribution is fixed by $\boldsymbol\mu$ and $\Sigma$.

### Closure properties

- **Affine:** $A\mathbf X + \mathbf b\sim\mathcal N(A\boldsymbol\mu + \mathbf b, A\Sigma A^T)$ for any $m\times n$ $A$. If the result is singular (rank $<m$) there is no pdf, but every component is still normal.
- **Marginal:** keep the rows and columns you want: $\mathbf X_1\sim\mathcal N(\boldsymbol\mu_1,\Sigma_{11})$.
- **Conditional:**
$$\mathbf X_1\mid\mathbf X_2 = \mathbf x_2\sim\mathcal N\big(\boldsymbol\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(\mathbf x_2 - \boldsymbol\mu_2),\ \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}\big)$$
The mean is linear in $\mathbf x_2$; the covariance shrinks and does not depend on $\mathbf x_2$.
- **Proof trick:** $\mathbf W = \mathbf X_1 - \Sigma_{12}\Sigma_{22}^{-1}\mathbf X_2$ is independent of $\mathbf X_2$. Likewise $X_1 + aX_2$ is independent of $X_2$ iff $a = -\frac{\sigma_{12}}{\sigma_{22}}$.
- **Independence:** jointly Gaussian and uncorrelated $\Rightarrow$ independent. Not for merely normal marginals: $Y = \pm X$ on a fair coin is $\mathcal N(0,1)$ with $\operatorname{Cov}(X,Y) = 0$, yet dependent, and $X + Y$ has an atom at 0.

### Bivariate normal

With $\sigma_{12} = \rho\sigma_1\sigma_2$, $u = \frac{x_1 - \mu_1}{\sigma_1}$, $v = \frac{x_2 - \mu_2}{\sigma_2}$:
$$f = \frac{1}{2\pi\sigma_1\sigma_2\sqrt{1 - \rho^2}}\exp\Big(-\frac{u^2 - 2\rho uv + v^2}{2(1 - \rho^2)}\Big)$$
$$X_1\mid X_2 = x_2\sim\mathcal N\Big(\mu_1 + \rho\sigma_1\frac{x_2 - \mu_2}{\sigma_2},\ (1 - \rho^2)\sigma_1^2\Big)$$

- Build it: $X_1 = \mu_1 + \sigma_1Z_1$ and $X_2 = \mu_2 + \sigma_2\big(\rho Z_1 + \sqrt{1 - \rho^2}\,Z_2\big)$
- $aX_1 + bX_2\sim\mathcal N\big(a\mu_1 + b\mu_2,\ a^2\sigma_1^2 + b^2\sigma_2^2 + 2ab\rho\sigma_1\sigma_2\big)$.
- Equal variances: $X_1 + X_2$ and $X_1 - X_2$ are independent (covariance $\sigma_1^2 - \sigma_2^2 = 0$).
- Contours are ellipses $(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu) = c$; in 2-D the ellipse holds probability $1 - e^{-c/2}$ (95% at $c\approx5.99$).

## 7. Exam traps

1. $M_{X + Y} = M_XM_Y$ needs independence. An MGF equals 1 at $t = 0$.
2. Inverse transform inverts the **CDF**, not the pdf. Keep track of the support.
3. Importance sampling with $g = 0$ where $hf\ne0$ is biased, with no warning.
4. Accept–reject with a larger $c$ is still exact, just slower ($c$ rounds per sample).
5. Convergence in probability says nothing about $E[X_n]$ ($n$ with probability $\frac1n$).
6. In distribution: compare CDFs only at continuity points. $X_n = \frac1n\to0$ although $F_n(0) = 0\ne F(0) = 1$.
7. BC2 needs independence; BC1 does not.
8. Continuity correction only for integer-valued sums; $\pm0.5$ in the right direction.
9. Jacobian: $|J|$ of the inverse map, written in $\mathbf y$, plus the support.
10. $C_{A\mathbf X} = AC_{\mathbf X}A^T$ (not $A^TCA$); the shift $\mathbf b$ drops out.
11. Uncorrelated $\Rightarrow$ independent only for jointly Gaussian vectors.
