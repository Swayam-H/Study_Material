---
title: "Statistics Surprise Quiz (practice)"
subtitle: "Probability and Statistics, Monsoon 2026 · Lectures 21 to 24"
---

# Part 1: What past papers tell us

This sheet is built from last year's papers in the project (Surprise Quiz of 14 Nov 2025, Endsem 2025, HW 11–12, Tutorials 11–12) and the 2019–2025 past-paper questions cited in the Final Boss notes. The syllabus is this year's L21–L24: estimators, bias, MSE, consistency, MLE, Bayesian inference, conjugate priors, MAP and the CE estimator.

Confidence intervals and hypothesis testing are **not** in this year's slides and have never appeared in the cited papers, so they are left out. Regression is only in a homework (and you said it's not important), so it's left out too.

## Topic frequency

| Topic | Where it appeared | Count |
|---|---|:-:|
| MLE by calculus (Poisson, Gaussian, Exponential) | Endsem 2022 Q6 · 2023 Q3, Q7(b) · 2024 Q1, Q2 · 2025 Q6 | **6** |
| Bayesian posterior + MAP / CE (conjugate pairs) | Endsem 2019 Q7 · 2022 Q9, Q10 · 2023 Q1 · 2024 Q2 · 2025 Q9 | **6** |
| Bias, variance and MSE of given estimators | Surprise Quiz 2025 Sec. B · Endsem 2024 Q1, 2025 Q6(b), Q10(b) | **4** |
| MLE where the support depends on $\theta$ (Uniform) | Endsem 2023 Q7(a) · 2024 Q1 · 2025 Q5 | **3** |
| Definitions (consistency, strong consistency, MSE) | Surprise Quiz 2025 Q1 · Endsem 2025 Q10(b) | **2** |
| Sample variance, $n$ vs $n-1$, is $S$ unbiased for $\sigma$ | slides L22 (marked "HW"), Tutorial 11 Q5 | slides only |
| Confidence intervals, hypothesis tests | never | **0** |

## Patterns worth knowing

**Questions repeat almost word for word.** Uniform$[a,b]$ MLE came in both 2024 and 2025. "Poisson MLE, then its MSE" came in 2023, 2024 *and* 2025.

**The conjugate pair rotates.** Beta–Bernoulli (2023), Gamma–Poisson (2024), Gamma–Exponential (2025). The one pair from this year's slides that hasn't been examined yet is **Gaussian–Gaussian**, so that's the prediction here.

**The shape is "derive, then compute a property".** Marks are split 7 + 3 or 5 + 5: find the MLE or posterior, then find its bias/MSE or its MAP.

**Solutions are symbolic, with checks.** Official solutions check the second derivative for an MLE, and say *why* a Uniform likelihood is maximised at the boundary.

**The surprise quiz itself** (14 Nov 2025) opened with a 2-mark "memory test" of definitions, then had a 10-mark "three estimators" table of bias, variance and MSE. Its Markov chain questions are not in this year's syllabus, so they are replaced here by MLE and Bayes questions, the two biggest endsem topics.

<div style="page-break-after: always;"></div>

# Part 2: The quiz

**Time:** 40 minutes. **Total:** 30 marks (+3 bonus). Closed book.

Throughout, $X_1, \dots, X_n$ are i.i.d. and $\bar X = \frac1n \sum_{i=1}^n X_i$.

---

### Q1. Memory test (6 marks)

(a) Define what it means for an estimator $\hat\Theta_n$ to be (i) **consistent** and (ii) **strongly consistent** for $\theta$. *(2)*

(b) State and **prove** the bias–variance decomposition of the MSE. *(3)*

(c) What is a **conjugate prior**? Give one conjugate prior–likelihood pair. *(1)*

---

### Q2. Three estimators of the mean (7 marks)

Let $X_i$ have mean $\theta$ and variance $\sigma^2$, with $n \ge 2$. Consider

$$
\hat\Theta_1 = \frac{X_1 + X_n}{2}, \qquad
\hat\Theta_2 = \frac{1}{n+1}\sum_{i=1}^n X_i, \qquad
\hat\Theta_3 = \bar X + \frac{1}{\sqrt n}.
$$

(a) Find the bias, variance and MSE of each estimator. *(4)*

(b) Which of them are consistent? Justify each. *(2)*

(c) Show that $\hat\Theta_2$ has a **smaller** MSE than $\bar X$ exactly when $\theta^2 < \left(2 + \frac1n\right)\sigma^2$. *(1)*

---

### Q3. MLE by calculus, plus invariance (5 marks)

Let $X_i$ have pdf

$$
f(x;\theta) = \theta\, x^{\theta - 1}, \qquad 0 < x < 1, \quad \theta > 0.
$$

(a) Find the MLE $\hat\theta_{ML}$. Check that it really is a maximum. *(3)*

(b) Find the MLE of $E[X]$. *(1)*

(c) Evaluate both for the data $(0.5,\ 0.25,\ 0.5,\ 0.125)$. *(1)*

---

### Q4. MLE when the support depends on $\theta$ (5 marks)

Let $X_i \sim \text{Uniform}[\theta, 2\theta]$ with $\theta > 0$ unknown.

(a) Find the MLE $\hat\theta_{ML}$. Explain carefully why you do *not* set a derivative to zero. *(3)*

(b) Is $\hat\theta_{ML}$ unbiased? If not, scale it to get an unbiased estimator. *(2)*

---

### Q5. Gaussian prior, Gaussian data (7 marks)

A machine makes rods of unknown mean length $\mu$. Each measurement is $X_i \mid \mu \sim \mathcal N(\mu, \sigma^2)$ with $\sigma^2$ known, independent given $\mu$. The prior is $\mu \sim \mathcal N(\mu_0, \sigma_0^2)$.

(a) Show that the posterior of $\mu$ given $x_1, \dots, x_n$ is Gaussian, and find its mean and variance. *(4)*

(b) Take $\mu_0 = 10$, $\sigma_0^2 = 1$, $\sigma^2 = 4$ and the data $12, 11, 13, 12$. Find $\hat\mu_{MAP}$, $\hat\mu_{CE}$ and $\hat\mu_{ML}$. *(2)*

(c) What happens to the posterior as $n \to \infty$? *(1)*

---

### Bonus (+3 marks)

Let $\bar S^2 = \frac{1}{n-1}\sum (X_i - \bar X)^2$, which is unbiased for $\sigma^2$. Is $\bar S = \sqrt{\bar S^2}$ unbiased for $\sigma$? Prove your answer.

<div style="page-break-after: always;"></div>

# Part 3: Answer key

Attempt the quiz first. Marks are shown in brackets.

---

## Q1

**(a)** (i) $\hat\Theta_n$ is consistent if $\hat\Theta_n \xrightarrow{p} \theta$, that is, for every $\varepsilon > 0$,

$$
\lim_{n\to\infty} P\big(|\hat\Theta_n - \theta| > \varepsilon\big) = 0. \quad [1]
$$

(ii) It is strongly consistent if $\hat\Theta_n \to \theta$ almost surely:

$$
P\Big(\big\{\omega : \lim_{n\to\infty} \hat\Theta_n(\omega) = \theta\big\}\Big) = 1. \quad [1]
$$

Example: $\bar X$ is strongly consistent for the mean, by the Strong Law of Large Numbers.

**(b)** Write $\hat\Theta - \theta = (\hat\Theta - E\hat\Theta) + (E\hat\Theta - \theta)$, where the second bracket is the constant $b = \text{Bias}(\hat\Theta)$. Then

$$
\begin{aligned}
\text{MSE}(\hat\Theta) = E\big[(\hat\Theta - \theta)^2\big]
&= E\big[(\hat\Theta - E\hat\Theta)^2\big] + 2b\,\underbrace{E\big[\hat\Theta - E\hat\Theta\big]}_{=\,0} + b^2 \\[2pt]
&= \text{Var}(\hat\Theta) + \text{Bias}(\hat\Theta)^2. \quad [3]
\end{aligned}
$$

The cross term vanishes because $b$ is a constant and $E[\hat\Theta - E\hat\Theta] = 0$.

**(c)** A prior family is conjugate to a likelihood if the posterior lands in the **same family** as the prior. Examples: Beta prior with Bernoulli/Binomial data, Gamma prior with Poisson (or Exponential) data, Gaussian prior with Gaussian data. *[1]*

---

## Q2

**(a)** *[4]*

$\hat\Theta_1$: $E = \frac{\theta + \theta}{2} = \theta$, so the bias is $0$. Since $X_1, X_n$ are independent,

$$
\text{Var}(\hat\Theta_1) = \frac{\sigma^2 + \sigma^2}{4} = \frac{\sigma^2}{2}, \qquad \text{MSE}(\hat\Theta_1) = \frac{\sigma^2}{2}.
$$

$\hat\Theta_2$: $E = \frac{n\theta}{n+1}$, so the bias is $-\frac{\theta}{n+1}$. The variance is $\frac{n\sigma^2}{(n+1)^2}$, so

$$
\text{MSE}(\hat\Theta_2) = \frac{n\sigma^2 + \theta^2}{(n+1)^2}.
$$

$\hat\Theta_3$: $E = \theta + \frac{1}{\sqrt n}$, so the bias is $\frac{1}{\sqrt n}$. Adding a constant doesn't change the variance, which stays $\frac{\sigma^2}{n}$. So

$$
\text{MSE}(\hat\Theta_3) = \frac{\sigma^2}{n} + \frac1n = \frac{\sigma^2 + 1}{n}.
$$

| | Bias | Variance | MSE |
|---|:-:|:-:|:-:|
| $\hat\Theta_1$ | $0$ | $\sigma^2/2$ | $\sigma^2/2$ |
| $\hat\Theta_2$ | $-\theta/(n+1)$ | $n\sigma^2/(n+1)^2$ | $(n\sigma^2+\theta^2)/(n+1)^2$ |
| $\hat\Theta_3$ | $1/\sqrt n$ | $\sigma^2/n$ | $(\sigma^2+1)/n$ |

**(b)** *[2]* Recall from L22: if $\text{MSE} \to 0$ then the estimator is consistent, by Markov's inequality applied to $(\hat\Theta_n - \theta)^2$:

$$
P\big(|\hat\Theta_n - \theta| > \varepsilon\big) \le \frac{E[(\hat\Theta_n - \theta)^2]}{\varepsilon^2} = \frac{\text{MSE}}{\varepsilon^2}.
$$

* $\hat\Theta_2$ and $\hat\Theta_3$: MSE $\to 0$, so both are **consistent**. Both are biased, but the bias dies out.
* $\hat\Theta_1$: **not consistent.** Careful, "MSE doesn't go to 0" is not on its own a proof. The real reason is that $\hat\Theta_1$ always uses just two samples, so its distribution is the same for every $n$. Then $P(|\hat\Theta_1 - \theta| > \varepsilon)$ is a fixed number, which is positive for small $\varepsilon$ whenever $\sigma^2 > 0$. It cannot go to $0$.

**(c)** *[1]* Compare with $\text{MSE}(\bar X) = \sigma^2/n$:

$$
\frac{n\sigma^2 + \theta^2}{(n+1)^2} < \frac{\sigma^2}{n}
\iff n^2\sigma^2 + n\theta^2 < (n^2 + 2n + 1)\sigma^2
\iff n\theta^2 < (2n+1)\sigma^2
\iff \theta^2 < \Big(2 + \frac1n\Big)\sigma^2.
$$

**The lesson:** a biased estimator can beat an unbiased one. Shrinking $\bar X$ towards $0$ pays off when the true mean is small compared to the noise.

---

## Q3

**(a)** *[3]* The log-likelihood is

$$
\ell(\theta) = \sum_{i=1}^n \ln\big(\theta x_i^{\theta-1}\big) = n\ln\theta + (\theta - 1)\sum_{i=1}^n \ln x_i.
$$

Set the derivative to zero:

$$
\ell'(\theta) = \frac{n}{\theta} + \sum \ln x_i = 0
\quad\Longrightarrow\quad
\boxed{\hat\theta_{ML} = -\frac{n}{\sum_{i=1}^n \ln x_i}}
$$

This is positive, since every $x_i \in (0,1)$ makes $\ln x_i < 0$. The second derivative is $\ell''(\theta) = -n/\theta^2 < 0$, so it is a maximum.

**(b)** *[1]* $E[X] = \int_0^1 x\cdot\theta x^{\theta-1}\,dx = \frac{\theta}{\theta+1}$. By the invariance property of the MLE, the MLE of $g(\theta)$ is $g(\hat\theta_{ML})$:

$$
\widehat{E[X]}_{ML} = \frac{\hat\theta_{ML}}{\hat\theta_{ML} + 1} = \frac{n}{\,n - \sum \ln x_i\,}.
$$

**(c)** *[1]* $\sum \ln x_i = -(\ln 2 + 2\ln 2 + \ln 2 + 3\ln 2) = -7\ln 2 \approx -4.852$. So

$$
\hat\theta_{ML} = \frac{4}{7\ln 2} \approx 0.824, \qquad \widehat{E[X]}_{ML} = \frac{4}{4 + 7\ln 2} \approx 0.452.
$$

Sanity check: the sample mean is $0.344$, in the same range.

---

## Q4

**(a)** *[3]* The pdf is $\frac{1}{\theta}$ on $[\theta, 2\theta]$. So

$$
L(\theta) = \prod_{i=1}^n \frac{1}{\theta}\,\mathbf 1\{\theta \le x_i \le 2\theta\}
= \begin{cases} \theta^{-n}, & \dfrac{\max_i x_i}{2} \le \theta \le \min_i x_i, \\[4pt] 0, & \text{otherwise.} \end{cases}
$$

The two conditions are $\theta \le$ every $x_i$ (so $\theta \le \min x_i$) and $2\theta \ge$ every $x_i$ (so $\theta \ge \max x_i / 2$).

Inside the allowed interval, $\theta^{-n}$ is **strictly decreasing**, so $\ell'(\theta) = -n/\theta$ is never zero. Setting a derivative to zero finds nothing. The maximum is at the **left endpoint** of the interval:

$$
\boxed{\hat\theta_{ML} = \frac{\max_i X_i}{2} = \frac{X_{(n)}}{2}}
$$

**Trap:** answering $\min x_i$. That is the right endpoint, where the likelihood is *smallest* on the interval.

**(b)** *[2]* Write $X_i = \theta(1 + U_i)$ with $U_i \sim \text{Uniform}[0,1]$. Then $X_{(n)} = \theta(1 + U_{(n)})$. We know $E[U_{(n)}] = \frac{n}{n+1}$ (its cdf is $u^n$), so

$$
E[\hat\theta_{ML}] = \frac{\theta}{2}\Big(1 + \frac{n}{n+1}\Big) = \frac{2n+1}{2n+2}\,\theta \ne \theta.
$$

It is **biased** (low), but asymptotically unbiased. The fix is to rescale:

$$
\tilde\theta = \frac{2n+2}{2n+1}\cdot\frac{X_{(n)}}{2} = \frac{(n+1)\,X_{(n)}}{2n+1}, \qquad E[\tilde\theta] = \theta.
$$

---

## Q5

**(a)** *[4]* By Bayes' rule, the posterior is proportional to prior × likelihood. Drop everything that doesn't involve $\mu$:

$$
f(\mu \mid x_1,\dots,x_n) \propto \exp\!\Big(-\frac{(\mu - \mu_0)^2}{2\sigma_0^2}\Big)\prod_{i=1}^n \exp\!\Big(-\frac{(x_i - \mu)^2}{2\sigma^2}\Big).
$$

Expand the exponent and collect powers of $\mu$:

$$
-\frac{\mu^2}{2}\Big(\frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}\Big) + \mu\Big(\frac{\mu_0}{\sigma_0^2} + \frac{\sum x_i}{\sigma^2}\Big) + \text{const}.
$$

A quadratic in $\mu$ with a negative $\mu^2$ coefficient is the exponent of a Gaussian. Completing the square gives $\mu \mid \text{data} \sim \mathcal N(m_n, v_n)$ with

$$
\boxed{\frac{1}{v_n} = \frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}, \qquad m_n = v_n\Big(\frac{\mu_0}{\sigma_0^2} + \frac{n\bar x}{\sigma^2}\Big)}
$$

Read it as **precisions add**, and the mean is a precision-weighted average of the prior mean and the sample mean. When $\sigma_0^2 = \sigma^2$ this gives $m_n = \frac{\mu_0 + \sum x_i}{n+1}$. (Slides 41 and 52 print $/n$ there. That's a typo: it should be $n+1$.)

**(b)** *[2]* Here $n = 4$, $\bar x = 12$, so

$$
\frac{1}{v_4} = \frac{1}{1} + \frac{4}{4} = 2 \;\Rightarrow\; v_4 = \frac12,
\qquad
m_4 = \frac12\Big(\frac{10}{1} + \frac{4 \cdot 12}{4}\Big) = \frac{10 + 12}{2} = 11.
$$

A Gaussian's mode and mean coincide, so

$$
\hat\mu_{MAP} = \hat\mu_{CE} = 11, \qquad \hat\mu_{ML} = \bar x = 12.
$$

The prior (centred at 10) pulls the estimate one unit down from the data. Here the prior and the data have equal precision, so the estimate lands halfway.

**(c)** *[1]* As $n \to \infty$, $v_n \approx \sigma^2/n \to 0$, and the weight on $\bar x$ goes to 1. The posterior concentrates at $\bar x$, which goes to the true $\mu$ by the LLN. The data overwhelm any prior, and MAP, CE and ML all agree in the limit.

---

## Bonus

**No, $\bar S$ is biased low.** *[3]* Variance is never negative, so

$$
0 \le \text{Var}(\bar S) = E[\bar S^2] - \big(E[\bar S]\big)^2 = \sigma^2 - \big(E[\bar S]\big)^2,
$$

which gives $E[\bar S] \le \sigma$. Equality would need $\text{Var}(\bar S) = 0$, so $\bar S$ would have to be a constant. That fails for any non-degenerate distribution, so $E[\bar S] < \sigma$. (This is also Jensen's inequality for the concave function $\sqrt{\cdot}$.) Unbiasedness doesn't survive non-linear transformations.

---

### Score guide

| Score | Meaning |
|---|---|
| 26–30 | Ready for the endsem statistics section |
| 18–25 | Solid. Redo the questions you lost marks on, then try last year's Endsem Q5, Q6, Q9 |
| below 18 | Revisit L22 (MLE) and L23–L24 (Bayes) in the L21-onward notes first |
