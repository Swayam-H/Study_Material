# Mock endsem: the paper

> **How to sit it.** Set a timer for **3 hours**. Close the notes, keep only a pen, paper and a calculator, and attempt every question. When the time is up, open the next page, **Mock endsem: solutions**, and mark yourself.

This is last year's endsem. Two of its questions were on Markov chains, which are not in this year's syllabus. They have been swapped for questions on the central limit theorem and on linear regression (slides 1–36), the two biggest topics that last year's paper didn't test. The original paper gave no marks, so treat each question as equal, about **18 minutes** each.

| Q | Topic | Lectures |
|---|---|---|
| 1 | MGFs | L14 |
| 2 | Monte Carlo estimation | L15 |
| 3 | Sum of independent exponentials | L13 |
| 4 | Mixture distributions | L11–L12 |
| 5 | MLE for Uniform$[a,b]$ | L22 |
| 6 | MLE for Poisson, bias and MSE | L21–L22 |
| 7 | Convergence in distribution and in probability | L17 |
| 8 | **New:** CLT approximation | L19 |
| 9 | Bayesian estimation, Gamma–exponential | L23–L24 |
| 10 | **(a) New:** least squares as the Gaussian MLE; (b) MSE and the bias–variance tradeoff | Regression, L21 |

## Questions

**Q1. Moment generating functions.** Find the MGF $M_X(t) = E[e^{tX}]$, and the values of $t$ for which it exists, when
(a) $X\sim\text{Geometric}(p)$ with $P(X = k) = (1-p)^{k-1}p$ for $k = 1, 2, \dots$;
(b) $X\sim\text{Exponential}(\lambda)$.

**Q2. Monte Carlo estimation of $\pi$.** Using two independent Uniform$[0,1]$ samples to make a point in the unit square, count how often it lands inside the quarter circle $x^2 + y^2\le1$. Repeat $n$ times. Write down an estimator of $\pi$ based on this, and show that it is unbiased.

**Q3. Sum of independent exponentials.** $X_1, X_2$ are i.i.d. Exponential$(\lambda)$ and $Z = X_1 + X_2$. Find the pdf of $Z$ by convolution, and find $E[Z]$ from that pdf.

**Q4. Mixture distribution.** $Z$ takes values in $\{1,\dots,n\}$ with $P(Z = i) = p_i$. Conditioned on $Z = i$, $X$ is distributed as $Y_i$, which has pdf $f_{Y_i}$. That is, $X = Y_Z$.
(a) Find $E[X]$.
(b) Prove that $f_X(x) = \sum_{i=1}^np_if_{Y_i}(x)$.

**Q5. MLE for a uniform distribution.** $x_1,\dots,x_n$ are i.i.d. samples from $U[a,b]$, where $a$ and $b$ are both unknown. Find MLEs of $a$ and $b$.

**Q6. MLE for a Poisson distribution.** $X_1,\dots,X_n$ are i.i.d. Poisson$(\gamma)$. Find the MLE $\hat\gamma$ of $\gamma$, its bias and its MSE.

**Q7. Convergence.** $X_n\sim\text{Uniform}\big(5 - \frac1n,\ 5 + \frac1n\big)$.
(a) Show that $X_n\xrightarrow{d}5$.
(b) For $\epsilon>0$, find $P(|X_n - 5|>\epsilon)$ exactly, and deduce that $X_n\to5$ in probability.

**Q8. (New) The central limit theorem.** A fair die is rolled 100 times and $S$ is the total.
(a) Find $E[S]$ and $\text{Var}(S)$.
(b) Use the CLT, with a continuity correction, to approximate $P(S\ge380)$.
(c) Roughly how many rolls $n$ are needed so that the average $\bar X_n$ is within $0.1$ of $3.5$ with probability about $0.95$?

**Q9. Bayesian estimation.** $x_1,\dots,x_n$ are i.i.d. Exponential$(\lambda)$, and the prior on $\lambda$ is Gamma$(\alpha,\beta)$: $f(\lambda) = \frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}$ for $\lambda>0$.
(a) Write the likelihood and find the posterior distribution of $\lambda$.
(b) Find the MAP estimate.

**Q10.**
(a) **(New)** In the model $Y_i = \beta_0 + \beta_1x_i + \varepsilon_i$ with $\varepsilon_i$ i.i.d. $\mathcal N(0,\sigma^2)$, show that the maximum likelihood estimates of $\beta_0, \beta_1$ are the least squares estimates, and find them.
(b) Define the mean square error of an estimator. Explain the bias–variance tradeoff.

# Mock endsem: solutions

Mark yourself question by question. For Q1–Q7, Q9 and Q10(b), these follow last year's official solutions. Q8 and Q10(a) are new.

### Problem 1 [Endsem Q1] — MGFs

Find the MGF $M_X(t) = E[e^{tX}]$, and the values of $t$ for which it exists, when
(a) $X\sim\text{Geometric}(p)$ with $P(X = k) = (1-p)^{k-1}p$ for $k = 1, 2, \dots$;
(b) $X\sim\text{Exponential}(\lambda)$.

**Solution.** (a) With $q = 1 - p$,
$$M_X(t) = \sum_{k=1}^\infty e^{tk}q^{k-1}p = pe^t\sum_{k=1}^\infty\big(qe^t\big)^{k-1} = \frac{pe^t}{1 - (1-p)e^t}.$$
The geometric series converges only if $(1-p)e^t<1$, i.e. for $t<-\ln(1-p)$.

(b)
$$M_X(t) = \int_0^\infty e^{tx}\lambda e^{-\lambda x}\,dx = \lambda\int_0^\infty e^{-(\lambda - t)x}\,dx = \frac{\lambda}{\lambda - t},\qquad t<\lambda .$$
For $t\ge\lambda$ the integral diverges. Marks are lost for leaving out the range of $t$.

### Problem 2 [Endsem Q2] — Monte Carlo for $\pi$

Using two independent Uniform$[0,1]$ samples to make a point in the unit square, count how often it lands inside the quarter circle $x^2 + y^2\le1$. Repeat $n$ times. Write down an estimator of $\pi$ based on this, and show that it is unbiased.

**Solution.** Let $(X_i, Y_i)$ be i.i.d. uniform on $[0,1]^2$, and $I_i = \mathbf 1\{X_i^2 + Y_i^2\le1\}$. Then $I_i$ is Bernoulli with
$$P(I_i = 1) = \text{area of the quarter disc} = \int_0^1\sqrt{1 - x^2}\,dx = \frac\pi4 .$$
So the estimator is
$$\hat\pi_n = \frac4n\sum_{i=1}^nI_i,\qquad E[\hat\pi_n] = 4\cdot\frac\pi4 = \pi ,$$
which is unbiased. (Bonus: $\text{Var}(\hat\pi_n) = \frac{16}{n}\cdot\frac\pi4\big(1 - \frac\pi4\big)\approx\frac{2.70}{n}$, and by the WLLN $\hat\pi_n\to\pi$ in probability.)

### Problem 3 [Endsem Q3] — sum of two exponentials

$X_1, X_2$ are i.i.d. Exponential$(\lambda)$ and $Z = X_1 + X_2$. Find the pdf of $Z$ by convolution, and find $E[Z]$ from that pdf.

**Solution.** By convolution, $f_Z(z) = \int f_{X_1}(x)f_{X_2}(z - x)\,dx$. The integrand is nonzero only when $x\ge0$ and $z - x\ge0$, so for $z<0$, $f_Z(z) = 0$. For $z\ge0$:
$$f_Z(z) = \int_0^z\lambda e^{-\lambda x}\cdot\lambda e^{-\lambda(z-x)}\,dx = \lambda^2e^{-\lambda z}\int_0^z dx = \lambda^2ze^{-\lambda z}.$$
This is Gamma$(2,\lambda)$. Then, substituting $u = \lambda z$,
$$E[Z] = \int_0^\infty\lambda^2z^2e^{-\lambda z}\,dz = \frac1\lambda\int_0^\infty u^2e^{-u}\,du = \frac{\Gamma(3)}{\lambda} = \frac2\lambda ,$$
which agrees with $E[X_1] + E[X_2]$.

### Problem 4 [Endsem Q4] — mixtures

$Z$ takes values in $\{1,\dots,n\}$ with $P(Z = i) = p_i$. Conditioned on $Z = i$, $X$ is distributed as $Y_i$, which has pdf $f_{Y_i}$. That is, $X = Y_Z$.
(a) Find $E[X]$.
(b) Prove that $f_X(x) = \sum_{i=1}^np_if_{Y_i}(x)$.

**Solution.** (a) By the law of iterated expectation, and since $E[X\mid Z = i] = E[Y_i]$,
$$E[X] = E\big[E[X\mid Z]\big] = \sum_{i=1}^nP(Z = i)E[X\mid Z = i] = \sum_{i=1}^np_iE[Y_i].$$
(b) By total probability over $Z$,
$$F_X(x) = P(X\le x) = \sum_{i=1}^nP(Z = i)P(X\le x\mid Z = i) = \sum_{i=1}^np_iF_{Y_i}(x).$$
Differentiate (a finite sum, so term by term) to get $f_X(x) = \sum_ip_if_{Y_i}(x)$.

### Problem 5 [Endsem Q5] — MLE for $U[a,b]$

$x_1,\dots,x_n$ are i.i.d. samples from $U[a,b]$, where $a$ and $b$ are both unknown. Find MLEs of $a$ and $b$.

**Solution.**
$$L(a,b) = \begin{cases}(b-a)^{-n} & a\le\min_ix_i\text{ and }b\ge\max_ix_i\\ 0 & \text{otherwise.}\end{cases}$$
$\partial\ln L/\partial a = \frac{n}{b-a}>0$, so $L$ increases in $a$ up to the boundary $\min x_i$. $\partial\ln L/\partial b = -\frac{n}{b-a}<0$, so $L$ decreases in $b$ down to $\max x_i$. Hence
$$\hat a = \min_ix_i,\qquad\hat b = \max_ix_i .$$
Setting the derivatives to zero gives nothing, since the maximum sits on the boundary of the allowed region.

### Problem 6 [Endsem Q6] — Poisson MLE, bias and MSE

$X_1,\dots,X_n$ are i.i.d. Poisson$(\gamma)$. Find the MLE $\hat\gamma$ of $\gamma$, its bias and its MSE.

**Solution.**
$$\ln L(\gamma) = -n\gamma + \Big(\sum x_i\Big)\ln\gamma - \sum\ln(x_i!),\qquad\frac{d}{d\gamma}\ln L = -n + \frac{\sum x_i}{\gamma} = 0\implies\hat\gamma = \bar X .$$
The second derivative is $-\sum x_i/\gamma^2<0$, so it is a maximum. $E[\hat\gamma] = \frac1n\sum E[X_i] = \gamma$, so the bias is 0. Hence
$$\text{MSE}(\hat\gamma) = \text{Var}(\bar X) = \frac{\gamma}{n}.$$

### Problem 7 [Endsem Q7] — convergence of $U(5 - \frac1n, 5 + \frac1n)$

$X_n\sim\text{Uniform}\big(5 - \frac1n,\ 5 + \frac1n\big)$.
(a) Show that $X_n\xrightarrow{d}5$.
(b) For $\epsilon>0$, find $P(|X_n - 5|>\epsilon)$ exactly, and deduce that $X_n\to5$ in probability.

**Solution.** (a) The limit is the constant 5, with CDF $F(x) = 0$ for $x<5$ and $1$ for $x\ge5$. It is continuous everywhere except $x = 5$. The CDF of $X_n$ is
$$F_n(x) = \begin{cases}0 & x<5 - \frac1n\\ \frac n2\big(x - 5 + \frac1n\big) & 5 - \frac1n\le x\le5 + \frac1n\\ 1 & x>5 + \frac1n.\end{cases}$$
Fix $x<5$. Once $n>\frac1{5-x}$, $x<5 - \frac1n$, so $F_n(x) = 0\to F(x)$. Fix $x>5$. Once $n>\frac1{x-5}$, $F_n(x) = 1\to F(x)$. So $F_n\to F$ at every continuity point, and $X_n\xrightarrow{d}5$. (At $x = 5$, $F_n(5) = \frac12$ for every $n$, but that point doesn't need to converge.)

(b) The density is $\frac n2$ on an interval of length $\frac2n$. If $n<\frac1\epsilon$, then $[5-\epsilon, 5+\epsilon]$ lies inside the support and has probability $\frac n2\cdot2\epsilon = n\epsilon$. If $n\ge\frac1\epsilon$, the whole support lies inside $[5-\epsilon, 5+\epsilon]$. So
$$P(|X_n - 5|>\epsilon) = \begin{cases}1 - n\epsilon & n<\frac1\epsilon\\ 0 & n\ge\frac1\epsilon.\end{cases}$$
This is 0 for all large $n$, so $X_n\to5$ in probability. (Convergence in distribution to a **constant** always implies convergence in probability, and this shows it directly.)

### Problem 8 [New, replaces the Markov chain question] — CLT for dice

A fair die is rolled 100 times and $S$ is the total.
(a) Find $E[S]$ and $\text{Var}(S)$.
(b) Use the CLT, with a continuity correction, to approximate $P(S\ge380)$.
(c) Roughly how many rolls $n$ are needed so that the average $\bar X_n$ is within $0.1$ of $3.5$ with probability about $0.95$?

**Solution.** (a) One roll has mean $3.5$ and variance $\frac{91}6 - 3.5^2 = \frac{35}{12}$. So
$$E[S] = 350,\qquad\text{Var}(S) = 100\cdot\frac{35}{12} = \frac{875}{3}\approx291.7,\qquad\text{sd}\approx17.08 .$$
(b) $S$ takes integer values, so $P(S\ge380) = P(S\ge379.5)$. By the CLT,
$$P(S\ge379.5)\approx P\Big(Z\ge\frac{379.5 - 350}{17.08}\Big) = P(Z\ge1.73)\approx0.042 .$$
(Without the correction you get $P(Z\ge1.76)\approx0.039$, which also earns most of the marks if the method is clear.)

(c) $\bar X_n\approx\mathcal N\big(3.5, \frac{35}{12n}\big)$. We need $0.1 = 1.96\sqrt{35/(12n)}$, so
$$n = \Big(\frac{1.96}{0.1}\Big)^2\cdot\frac{35}{12}\approx384.2\cdot2.917\approx1121 .$$
So about 1,121 rolls. Chebyshev would demand $n\ge\frac{35/12}{0.05\cdot0.01}\approx5833$: the CLT gives a much sharper (approximate) answer.

### Problem 9 [Endsem Q9] — Gamma prior, exponential data

$x_1,\dots,x_n$ are i.i.d. Exponential$(\lambda)$, and the prior on $\lambda$ is Gamma$(\alpha,\beta)$: $f(\lambda) = \frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}$ for $\lambda>0$.
(a) Write the likelihood and find the posterior distribution of $\lambda$.
(b) Find the MAP estimate.

**Solution.** (a) Likelihood:
$$f(x_1,\dots,x_n\mid\lambda) = \prod_{i=1}^n\lambda e^{-\lambda x_i} = \lambda^ne^{-\lambda\sum x_i}.$$
By Bayes' rule,
$$f(\lambda\mid x) = \frac{\lambda^ne^{-\lambda\sum x_i}\cdot\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}}{\int_0^\infty(\text{same})\,d\lambda} = \frac{\lambda^{\alpha+n-1}e^{-(\beta + \sum x_i)\lambda}}{\int_0^\infty\lambda^{\alpha+n-1}e^{-(\beta+\sum x_i)\lambda}\,d\lambda}.$$
With $u = (\beta + \sum x_i)\lambda$, the denominator is $\frac{\Gamma(\alpha + n)}{(\beta + \sum x_i)^{\alpha+n}}$. So
$$f(\lambda\mid x) = \frac{(\beta + \sum x_i)^{\alpha+n}}{\Gamma(\alpha + n)}\lambda^{\alpha+n-1}e^{-(\beta+\sum x_i)\lambda},$$
i.e. $\lambda\mid x\sim\text{Gamma}\big(\alpha + n,\ \beta + \sum x_i\big)$.

(b) Maximise $\ln f = (\alpha + n - 1)\ln\lambda - (\beta + \sum x_i)\lambda + C$:
$$\frac{\alpha + n - 1}{\lambda} = \beta + \sum x_i\implies\hat\lambda_{MAP} = \frac{\alpha + n - 1}{\beta + \sum_ix_i}.$$
(The CE is $\frac{\alpha + n}{\beta + \sum x_i}$. Both tend to $1/\bar x = \hat\lambda_{ML}$ as $n\to\infty$.)

### Problem 10 [New (a) and Endsem Q10(b)] — least squares and MSE

(a) **(New)** In the model $Y_i = \beta_0 + \beta_1x_i + \varepsilon_i$ with $\varepsilon_i$ i.i.d. $\mathcal N(0,\sigma^2)$, show that the maximum likelihood estimates of $\beta_0, \beta_1$ are the least squares estimates, and find them.
(b) Define the mean square error of an estimator. Explain the bias–variance tradeoff.

**Solution.** (a) The $Y_i$ are independent with $Y_i\sim\mathcal N(\beta_0 + \beta_1x_i, \sigma^2)$, so
$$\ln L(\beta_0,\beta_1) = -\frac n2\ln(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_{i=1}^n(y_i - \beta_0 - \beta_1x_i)^2 .$$
The first term doesn't involve $\beta_0, \beta_1$, and $\frac1{2\sigma^2}>0$. So maximising $\ln L$ is the same as minimising $J = \sum_i(y_i - \beta_0 - \beta_1x_i)^2$, which is least squares. Setting the partial derivatives to zero:
$$\frac{\partial J}{\partial\beta_0} = 0\implies\beta_0 = \bar y - \beta_1\bar x,\qquad\frac{\partial J}{\partial\beta_1} = 0\implies\hat\beta_1 = \frac{\sum_i(x_i - \bar x)(y_i - \bar y)}{\sum_i(x_i - \bar x)^2} = \frac{S_{xy}}{S_{xx}},$$
and $\hat\beta_0 = \bar y - \hat\beta_1\bar x$. (Show the substitution step from slides 16–20 for full marks: put $\beta_0 = \bar y - \beta_1\bar x$ into the second equation and use $\sum(x_i - \bar x) = 0$.)

(b) $\text{MSE}(\hat\Theta) = E\big[(\hat\Theta - \theta^*)^2\big]$. Add and subtract $E[\hat\Theta]$:
$$E\big[(\hat\Theta - E\hat\Theta + E\hat\Theta - \theta^*)^2\big] = \underbrace{E\big[(\hat\Theta - E\hat\Theta)^2\big]}_{\text{Var}(\hat\Theta)} + \underbrace{(E\hat\Theta - \theta^*)^2}_{\text{bias}^2} + 2(E\hat\Theta - \theta^*)\underbrace{E\big[\hat\Theta - E\hat\Theta\big]}_{=0}.$$
So $\text{MSE} = \text{Var} + \text{bias}^2$. **Tradeoff:** lowering one term usually raises the other. A slightly biased estimator can have a lower MSE than an unbiased one if it cuts the variance enough. Shrinking towards a prior guess is the standard example: the uniform-prior CE $\frac{K+1}{n+2}$ beats $\frac Kn$ near $p = \frac12$ (L21–L24 notes, Problem 34).
