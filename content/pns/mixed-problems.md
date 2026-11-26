# Mixed problems: several topics at once

Endsem questions rarely stay inside one lecture. These 15 problems each chain two to four topics together, the way a long exam question does. Try each one on paper before opening the solution. In the problem bank, filter by **Source → Mixed** to get them all, or pick a topic to see the mixed problems that use it.

| # | Topics |
|---|---|
| 1 | Bayes, Poisson, prediction |
| 2 | Joint pdf, covariance, CLT |
| 3 | Uniform prior, iterated expectation, Beta posterior |
| 4 | MLE, CLT, an approximate interval |
| 5 | Polar Jacobian, Rayleigh, MLE |
| 6 | CLT inside Bayes' rule |
| 7 | Random sums, total variance, Bayes |
| 8 | MGFs, the Gamma sum, exact vs CLT |
| 9 | MLE, convergence in probability and in distribution |
| 10 | Gaussian vectors, conditional expectation, MAP |
| 11 | Counting, hypergeometric likelihood, MLE |
| 12 | Minimum of exponentials, MLE, bias |
| 13 | Mixtures, Bayes, total variance |
| 14 | Bivariate normal, best linear predictor, least squares |
| 15 | Monte Carlo, CLT, sample size |

### Problem 1 [Mixed: Bayes + Poisson + prediction]

The number of emails you get in an hour is Poisson$(\lambda)$. On a normal day $\lambda = 2$; on a busy day $\lambda = 5$. Prior: $P(\text{busy}) = 0.3$. In the first hour you get 4 emails. (a) Find $P(\text{busy}\mid X = 4)$. (b) Given this, find the probability that the next hour brings no emails (hours are independent given $\lambda$).

**Solution.** (a) The $\frac{1}{4!}$ cancels, so
$$P(\text{busy}\mid X = 4) = \frac{0.3\,e^{-5}5^4}{0.7\,e^{-2}2^4 + 0.3\,e^{-5}5^4} = \frac{0.3(0.006738)(625)}{0.7(0.13534)(16) + 1.2634} = \frac{1.2634}{1.5157 + 1.2634}\approx\boxed{0.455}.$$
Four emails is evidence for a busy day: the probability rose from 0.3 to 0.455.

(b) Condition on the type of day, using the **posterior** weights (total probability):
$$P(X_2 = 0\mid X_1 = 4) = 0.545\,e^{-2} + 0.455\,e^{-5} = 0.0738 + 0.0031\approx\boxed{0.077}.$$
Note $X_1$ and $X_2$ are independent **given** $\lambda$, but not independent: $X_1$ tells you about $\lambda$, which tells you about $X_2$.

### Problem 2 [Mixed: joint pdf + covariance + CLT]

$(X, Y)$ has joint pdf $f(x,y) = x + y$ on $[0,1]^2$. (a) Find $E[X]$, $\text{Var}(X)$ and $\text{Cov}(X,Y)$. (b) Find $E[X+Y]$ and $\text{Var}(X+Y)$. (c) $S$ is the sum of 100 independent copies of $X + Y$. Approximate $P(S>120)$.

**Solution.** (a) Marginal: $f_X(x) = \int_0^1(x + y)\,dy = x + \frac12$. Then
$$E[X] = \int_0^1x\big(x + \tfrac12\big)dx = \tfrac13 + \tfrac14 = \tfrac7{12},\qquad E[X^2] = \tfrac14 + \tfrac16 = \tfrac5{12},\qquad\text{Var}(X) = \tfrac5{12} - \tfrac{49}{144} = \tfrac{11}{144}.$$
$E[XY] = \int\!\!\int xy(x + y) = 2\int_0^1\!\!\int_0^1x^2y\,dx\,dy = 2\cdot\frac13\cdot\frac12 = \frac13$, so
$$\text{Cov}(X,Y) = \tfrac13 - \big(\tfrac7{12}\big)^2 = \tfrac{48 - 49}{144} = -\tfrac1{144}.$$
By symmetry $Y$ has the same mean and variance.

(b) $E[X + Y] = \frac76$ and $\text{Var}(X + Y) = \frac{11}{144} + \frac{11}{144} + 2\big(-\frac1{144}\big) = \frac{20}{144} = \frac5{36}$. Forgetting the covariance term is the classic slip.

(c) $E[S] = \frac{700}6\approx116.67$, $\text{Var}(S) = \frac{500}{36}\approx13.89$, sd $\approx3.727$. By the CLT,
$$P(S>120)\approx P\Big(Z>\frac{120 - 116.67}{3.727}\Big) = P(Z>0.89)\approx\boxed{0.19}.$$

### Problem 3 [Mixed: uniform prior + iterated expectation + Beta posterior] (hard)

A coin's bias $P$ is Uniform$(0,1)$. Given $P = p$, you toss it $n$ times and get $K$ heads. (a) Show $P(K = k) = \frac1{n+1}$ for $k = 0,\dots,n$. (b) Find $E[K]$ and $\text{Var}(K)$ by conditioning on $P$. (c) Find the posterior of $P$ given $K = k$ and the CE estimate.

**Solution.** (a) By total probability over the continuous $P$,
$$P(K = k) = \int_0^1\binom nkp^k(1-p)^{n-k}\,dp = \binom nkB(k+1, n-k+1) = \binom nk\frac{k!\,(n-k)!}{(n+1)!} = \frac1{n+1}.$$
(b) $E[K\mid P] = nP$ and $\text{Var}(K\mid P) = nP(1-P)$. So
$$E[K] = E[nP] = \frac n2,\qquad\text{Var}(K) = E[nP(1-P)] + \text{Var}(nP) = n\Big(\frac12 - \frac13\Big) + \frac{n^2}{12} = \boxed{\frac n6 + \frac{n^2}{12}}.$$
Check with (a): $K$ uniform on $\{0,\dots,n\}$ has variance $\frac{(n+1)^2 - 1}{12} = \frac{n^2 + 2n}{12}$, the same.

(c) Posterior $\propto p^k(1-p)^{n-k}\cdot1$, which is Beta$(k+1, n-k+1)$. CE $= \frac{k+1}{n+2}$ (Laplace's rule of succession).

### Problem 4 [Mixed: MLE + CLT + an approximate interval]

Waiting times are i.i.d. Exp$(\lambda)$. From $n = 100$ waits you find $\bar x = 2$ minutes. (a) Find the MLE of $\lambda$ and of the mean wait $\mu = 1/\lambda$. (b) Use the CLT to give an approximate 95% range for $\mu$, and turn it into one for $\lambda$.

**Solution.** (a) $\hat\lambda = 1/\bar x = 0.5$ per minute, and by invariance $\hat\mu = \bar x = 2$ minutes.

(b) $\bar X\approx\mathcal N\big(\mu, \frac{\mu^2}{n}\big)$, since an exponential's sd equals its mean. Plugging in $\hat\mu = 2$ for the sd, $\text{sd}(\bar X)\approx\frac{2}{10} = 0.2$, so with probability about 0.95, $|\bar X - \mu|\le1.96(0.2) = 0.392$:
$$\mu\in[1.61,\ 2.39]\quad\Longrightarrow\quad\lambda = \frac1\mu\in[0.42,\ 0.62].$$
(Taking reciprocals flips the ends.) The range shrinks like $1/\sqrt n$: four times the data halves it.

### Problem 5 [Mixed: polar Jacobian + Rayleigh + MLE]

$X, Y$ are i.i.d. $\mathcal N(0,\sigma^2)$ and $R = \sqrt{X^2 + Y^2}$. (a) Find the pdf of $R$. (b) You observe $R_1,\dots,R_n$ i.i.d. like $R$. Find the MLE of $\sigma^2$ and check whether it is unbiased.

**Solution.** (a) Change to polar coordinates, $x = r\cos\phi$, $y = r\sin\phi$, with Jacobian $r$:
$$f_{R,\Phi}(r,\phi) = \frac{1}{2\pi\sigma^2}e^{-r^2/(2\sigma^2)}\cdot r,\qquad r>0,\ 0\le\phi<2\pi .$$
It factors, so $R$ and $\Phi$ are independent, and integrating out $\phi$ gives
$$f_R(r) = \frac{r}{\sigma^2}e^{-r^2/(2\sigma^2)},\qquad r>0\quad\text{(Rayleigh)}.$$
(b) $\ln L = \sum\ln r_i - n\ln\sigma^2 - \frac{\sum r_i^2}{2\sigma^2}$. Differentiate in $v = \sigma^2$: $-\frac nv + \frac{\sum r_i^2}{2v^2} = 0$, so
$$\hat\sigma^2 = \frac{1}{2n}\sum_{i=1}^nR_i^2 .$$
$E[R^2] = E[X^2 + Y^2] = 2\sigma^2$, so $E[\hat\sigma^2] = \sigma^2$: unbiased.

### Problem 6 [Mixed: CLT inside Bayes' rule]

Machine A makes bolts with mean length 10.0 mm, machine B with mean 10.3 mm; both have sd 0.5 mm. A box comes from one machine, each equally likely. You measure 25 bolts and get $\bar x = 10.2$. Using the CLT for $\bar X$, find $P(\text{A}\mid\bar x)$.

**Solution.** Given the machine, $\bar X\approx\mathcal N\big(\mu, \frac{0.25}{25}\big)$, sd $0.1$. Treat the normal density as the likelihood:
$$\text{A: } z = \frac{10.2 - 10.0}{0.1} = 2,\qquad\text{B: } z = \frac{10.2 - 10.3}{0.1} = -1 .$$
The common factors cancel, and with equal priors
$$P(\text{A}\mid\bar x) = \frac{e^{-2^2/2}}{e^{-2^2/2} + e^{-1^2/2}} = \frac{0.1353}{0.1353 + 0.6065}\approx\boxed{0.18}.$$
So B is about 4.5 times as likely. The single bolts overlap a lot, but averaging 25 of them makes the evidence sharp.

### Problem 7 [Mixed: random sums + total variance + Bayes]

Roll a fair die to get $X$, then toss $X$ fair coins and let $Y$ be the number of heads. (a) Find $E[Y]$ and $\text{Var}(Y)$. (b) Find $\text{Cov}(X, Y)$. (c) Find $P(X = 6\mid Y = 5)$.

**Solution.** Given $X$, $Y\sim\text{Binomial}(X,\frac12)$, so $E[Y\mid X] = \frac X2$ and $\text{Var}(Y\mid X) = \frac X4$.

(a) $E[Y] = \frac{3.5}2 = 1.75$, and by the law of total variance
$$\text{Var}(Y) = E\Big[\frac X4\Big] + \text{Var}\Big(\frac X2\Big) = \frac{3.5}4 + \frac14\cdot\frac{35}{12} = \frac78 + \frac{35}{48} = \boxed{\frac{77}{48}}\approx1.60 .$$
(b) $E[XY] = E\big[X\,E[Y\mid X]\big] = \frac12E[X^2]$, so $\text{Cov}(X,Y) = \frac12E[X^2] - E[X]\cdot\frac{E[X]}2 = \frac12\text{Var}(X) = \frac{35}{24}$.

(c) Only $X = 5$ or $6$ can give 5 heads. $P(Y = 5\mid X = 5) = \frac1{32}$ and $P(Y = 5\mid X = 6) = \frac{6}{64}$. The prior $\frac16$ cancels:
$$P(X = 6\mid Y = 5) = \frac{6/64}{2/64 + 6/64} = \boxed{\tfrac34}.$$

### Problem 8 [Mixed: MGFs + the Gamma sum + exact vs CLT]

$X_1, X_2,\dots$ are i.i.d. Exp(1) and $S_n = X_1 + \cdots + X_n$. (a) Use MGFs to identify the distribution of $S_n$. (b) Compute $P(S_2>3)$ exactly and by the CLT. (c) Approximate $P(S_{100}>110)$.

**Solution.** (a) $M_X(t) = \frac1{1-t}$ for $t<1$. By independence,
$$M_{S_n}(t) = \big(M_X(t)\big)^n = (1-t)^{-n},\qquad t<1,$$
which is the MGF of Gamma$(n,1)$. By uniqueness of MGFs, $S_n\sim$ Gamma$(n,1)$, with pdf $\frac{s^{n-1}e^{-s}}{(n-1)!}$ for $s>0$.

(b) **Exact:** $S_2$ has pdf $se^{-s}$. Integrating by parts,
$$P(S_2>3) = \int_3^\infty se^{-s}\,ds = \Big[-se^{-s} - e^{-s}\Big]_3^\infty = 4e^{-3}\approx0.199 .$$
**CLT:** mean 2, variance 2, so $P(S_2>3)\approx P\big(Z>\frac{1}{\sqrt2}\big) = P(Z>0.71)\approx0.24$. That is 20% too high, because $S_2$ is still very skewed.

(c) Mean 100, sd 10:
$$P(S_{100}>110)\approx P(Z>1)\approx0.159 .$$
The exact Gamma answer is about 0.158, so here the CLT is within 0.001. The CLT is a large-$n$ statement.

### Problem 9 [Mixed: MLE + convergence in probability and in distribution] (hard)

$X_1,\dots,X_n$ i.i.d. Uniform$[0,\theta]$ and $M_n = \max_iX_i$ (the MLE). (a) Show $M_n\to\theta$ in probability. (b) Show $n(\theta - M_n)$ converges in distribution, and identify the limit.

**Solution.** Everything follows from $P(M_n\le m) = \big(\frac m\theta\big)^n$ for $0\le m\le\theta$ (all $n$ samples must be $\le m$).

(a) $M_n\le\theta$ always, so for $0<\epsilon<\theta$,
$$P(|M_n - \theta|>\epsilon) = P(M_n<\theta - \epsilon) = \Big(1 - \frac\epsilon\theta\Big)^n\to0 .$$
So $M_n\xrightarrow{p}\theta$: the MLE is consistent.

(b) Let $W_n = n(\theta - M_n)\ge0$. For $x\ge0$ and $n$ large enough that $x<n\theta$,
$$P(W_n>x) = P\Big(M_n<\theta - \frac xn\Big) = \Big(1 - \frac{x}{n\theta}\Big)^n\to e^{-x/\theta}.$$
So
$$n(\theta - M_n)\xrightarrow{d}\text{Exp}\big(\tfrac1\theta\big)\quad(\text{rate }\tfrac1\theta,\ \text{mean }\theta).$$
The error of $M_n$ is of size $\frac1n$, not the usual $\frac1{\sqrt n}$, which is why its MSE (Part 7, Problem 21) shrinks like $\frac1{n^2}$.

### Problem 10 [Mixed: Gaussian vectors + conditional expectation + MAP]

A signal $\Theta\sim\mathcal N(0,1)$ is sent and you receive $X = \Theta + W$, with noise $W\sim\mathcal N(0,\sigma^2)$ independent of $\Theta$. (a) Find the joint distribution of $(\Theta, X)$. (b) Find $E[\Theta\mid X]$ and the MAP estimate. (c) Compare its MSE with that of the ML estimate $\hat\theta = X$.

**Solution.** (a) $(\Theta, X)$ is a linear map of the independent Gaussians $(\Theta, W)$, so it is jointly Gaussian, with means 0, $\text{Var}(\Theta) = 1$, $\text{Var}(X) = 1 + \sigma^2$ and $\text{Cov}(\Theta, X) = \text{Var}(\Theta) = 1$.

(b) For a bivariate normal, $E[\Theta\mid X = x] = \frac{\text{Cov}(\Theta,X)}{\text{Var}(X)}x = \frac{x}{1 + \sigma^2}$. The posterior is normal, so its mode equals its mean: MAP $=$ CE $= \frac{x}{1+\sigma^2}$.

(c) The conditional variance is $1 - \frac{1}{1+\sigma^2} = \frac{\sigma^2}{1+\sigma^2}$, which is the MSE of the CE. The ML estimate $X$ has MSE $E[W^2] = \sigma^2$, which is larger. With $\sigma^2 = 1$: $0.5$ against $1$. Shrinking towards the prior mean pays off.

### Problem 11 [Mixed: counting + hypergeometric likelihood + MLE]

To estimate the number $N$ of fish in a lake, you tag 10 and release them. Later you catch 20 and find 4 tagged. Find the MLE of $N$.

**Solution.** Given $N$, the number tagged in the catch is hypergeometric:
$$L(N) = \frac{\binom{10}4\binom{N-10}{16}}{\binom N{20}},\qquad N\ge26 .$$
$N$ is an integer, so compare neighbours instead of differentiating:
$$\frac{L(N)}{L(N-1)} = \frac{N-10}{N-26}\cdot\frac{N-20}{N}\ \ge1\iff(N-10)(N-20)\ge N(N-26)\iff200\ge4N\iff N\le50 .$$
So $L$ rises up to $N = 50$ and then falls, with $L(50) = L(49)$. **Both 49 and 50 are MLEs.** This matches the intuition $\frac{4}{20} = \frac{10}{N}$, giving $N\approx50$.

### Problem 12 [Mixed: minimum of exponentials + MLE + bias]

A device has two parts in series, each with an Exp$(\lambda)$ lifetime, independently. It fails when either part fails. You observe device lifetimes $T_1,\dots,T_n$. (a) Find the distribution of $T$. (b) Find the MLE of $\lambda$. (c) Is it unbiased? If not, fix it.

**Solution.** (a) $P(T>t) = P(\text{both parts survive past }t) = e^{-2\lambda t}$, so $T\sim\text{Exp}(2\lambda)$.

(b) $\ln L = n\ln(2\lambda) - 2\lambda\sum t_i$, so $\frac n\lambda = 2\sum t_i$ and $\hat\lambda = \frac{n}{2\sum T_i} = \frac{1}{2\bar T}$.

(c) $\sum T_i\sim\text{Gamma}(n, 2\lambda)$, and $E[1/\text{Gamma}(n,r)] = \frac{r}{n-1}$. So $E[\hat\lambda] = \frac n2\cdot\frac{2\lambda}{n-1} = \frac{n}{n-1}\lambda$: biased upwards. The fix is $\frac{n-1}{2\sum T_i}$.

### Problem 13 [Mixed: mixtures + Bayes + total variance]

$X$ comes from $\mathcal N(0,1)$ or $\mathcal N(2,1)$, each with probability $\frac12$. (a) Find $E[X]$ and $\text{Var}(X)$. (b) You observe $x = 1.5$. Which component most likely produced it?

**Solution.** (a) Let $C$ be the component. $E[X] = \frac12(0) + \frac12(2) = 1$. By total variance,
$$\text{Var}(X) = E[\text{Var}(X\mid C)] + \text{Var}(E[X\mid C]) = 1 + \text{Var}(\text{0 or 2, fifty-fifty}) = 1 + 1 = \boxed2 .$$
(b) With equal priors the $\frac1{\sqrt{2\pi}}$ cancels:
$$P(C = 2\mid x = 1.5) = \frac{e^{-(0.5)^2/2}}{e^{-(1.5)^2/2} + e^{-(0.5)^2/2}} = \frac1{1 + e^{-1}}\approx\boxed{0.73}.$$
The second component is about 2.7 times as likely. ($e^{-1.125}/e^{-0.125} = e^{-1}$.)

### Problem 14 [Mixed: bivariate normal + best linear predictor + least squares]

$(X, Y)$ is bivariate normal with $\mu_X = 0$, $\mu_Y = 1$, $\sigma_X = 1$, $\sigma_Y = 2$ and $\rho = 0.5$. (a) Find $E[Y\mid X = x]$. (b) Find the $a, b$ that minimise $E[(Y - a - bX)^2]$. (c) How does this connect to least squares on data?

**Solution.** (a) For a bivariate normal,
$$E[Y\mid X = x] = \mu_Y + \rho\frac{\sigma_Y}{\sigma_X}(x - \mu_X) = 1 + x .$$
(b) Set the derivatives to zero, exactly as on regression slides 12–20 but with expectations instead of sums:
$$a = E[Y] - bE[X],\qquad b = \frac{\text{Cov}(X,Y)}{\text{Var}(X)} = \frac{0.5\cdot1\cdot2}{1} = 1,$$
so $a = 1$. The best line is $1 + x$, the same as (a).

(c) Least squares replaces $E$ by averages: $\hat\beta_1 = \frac{S_{xy}}{S_{xx}}$ is the sample version of $\frac{\text{Cov}(X,Y)}{\text{Var}(X)}$, and $\hat\beta_0 = \bar y - \hat\beta_1\bar x$ is the sample version of $a$. For Gaussian data, the fitted line estimates $E[Y\mid X]$.

### Problem 15 [Mixed: Monte Carlo + CLT + sample size]

You estimate $p = P(Z>2)$ for $Z\sim\mathcal N(0,1)$ by simulating $n$ normals and taking the fraction above 2. (a) What are the mean and standard error of the estimate? (b) How large must $n$ be for the estimate to be within $0.001$ of $p\approx0.0228$ with probability about 0.95?

**Solution.** (a) The estimate is $\hat p = \frac1n\sum_{i=1}^n\mathbf 1\{Z_i>2\}$, an average of i.i.d. Bernoulli$(p)$ variables. So
$$E[\hat p] = p\ \ (\text{unbiased}),\qquad\text{se}(\hat p) = \sqrt{\frac{p(1-p)}{n}}.$$

(b) By the CLT, $\hat p\approx\mathcal N\big(p, \frac{p(1-p)}{n}\big)$, so $P(|\hat p - p|\le0.001)\approx0.95$ when $1.96\sqrt{\frac{p(1-p)}{n}}\le0.001$:
$$n\ge\frac{1.96^2\,p(1-p)}{0.001^2} = \frac{3.8416\times0.0228\times0.9772}{10^{-6}}\approx\boxed{85{,}600}.$$
Rare events need many samples, because the error must be small compared with $p$ itself.
