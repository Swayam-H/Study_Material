---
title: "Probability & Statistics (MA6.101), Lectures 21 to 24 + Linear Regression"
subtitle: "Estimation, the friendly-but-not-easy version: point estimators, MLE, Bayesian inference, MAP"
date: "Monsoon 2026"
---

# Before we start

These notes cover everything after L20: the **statistics** half of the course. Up to L20 we were doing *probability*: you're given a model and you work out things about the data it produces. From L21 on it's the other way round. You're given **data**, and you have to guess the model.

Same style as the L14–L20 notes: casual, but still exam-level. Every derivation is done in full, the worked problems are quiz/endsem type, and each step comes with the *why*, not just the *what*.

**What's in here**

| Part | Slides | What it's about | Time |
|---|---|---|---|
| 1 | L21 (slides 1–9) | The big picture, estimators, bias, MSE, consistency | 40 min |
| 2 | L22 (slides 10–20) | Markov's inequality, MSE→0 ⇒ consistent, sample variance, Uniform$(0,\theta)$ | 50 min |
| 3 | L22 (slides 21–30) | Maximum likelihood estimation, with every example on the slides | 50 min |
| 4 | L23 (slides 31–49) | Bayesian inference: Beta–Binomial, Gaussian–Gaussian, Gamma–Poisson | 60 min |
| 5 | L24 (slides 50–53) | Conjugate priors, MAP, conditional expectation estimator | 35 min |
| 6 | Linear regression (slides 1–36 only) | Least squares, LS = Gaussian MLE, MLE of $\sigma^2$, Laplace noise. Slides 37–56 are not in the syllabus | 35 min |
| 7 | — | Worked practice problems from last year's HW 11–12, Tut 11–12, Endsem | 60 min |
| 8 | — | Formula sheet + self-test | 20 min |

**Which file has which slides.** L21 to L24 are all slices of a single 53-slide deck (the slide numbers run continuously): L21 = slides 1–9, L22 = 10–30, L23 = 31–50, L24 = 50–53. Linear regression is its own 12-slide deck (`linear_regression.pdf`, 56 PDF pages because the slides build up). Only PDF pages 1–36 are in the endsem syllabus; pages 37–56 are not.

**Practice material.** Last year's HW 11 and Tutorial 11 match L21–L22 (estimators, MLE). HW 12 and Tutorial 12 match L23–L24 (Bayesian, MAP). Last year's Endsem Q5, Q6, Q9 and Q10(b) are on this material too. (Last year's HW 10 and Tutorial 10 are on Markov chains, which aren't in this year's slides, so skip those unless your instructor says otherwise.)

**Notation**

| Symbol | Meaning |
|---|---|
| $\theta^*$ | the true, unknown parameter (a fixed number) |
| $\hat\Theta = h(X_1,\dots,X_n)$ | an estimator: a function of the random sample, so it's a random variable |
| $\hat\theta = h(x_1,\dots,x_n)$ | an estimate: the number you get once you plug in the actual data |
| $\hat\mu_n = \bar X = \frac1n\sum X_i$ | sample mean |
| $\Theta$ (capital) | in Bayesian land, the unknown parameter treated as a random variable |
| $f_\Theta(\theta)$ / $p_\Theta(\theta)$ | prior |
| $f_{X\mid\Theta}(x\mid\theta)$ | likelihood |
| $f_{\Theta\mid X}(\theta\mid x)$ | posterior |

---

# Part 1 — L21: what does "estimating" even mean?

## Slide 2: probability vs statistics

The slide's picture is the whole course in one diagram:

- **Probability:** model $\to$ data. "If the coin has $P(H)=0.6$, what's the chance of 7 heads in 10 tosses?"
- **Statistics:** data $\to$ model. "I saw 7 heads in 10 tosses. What's $P(H)$?"

The second question is harder, because the answer is never certain. Any $P(H)$ strictly between 0 and 1 *could* have produced 7 heads. Statistics is about making a good guess and being honest about how good it is.

## Slide 3: three kinds of answers

You want to learn some unknown $\theta^*$ (a mean, a variance, a rate, whatever) from data $\mathcal D = \{x_1,\dots,x_n\}$. There are three kinds of answer you can give:

1. **Point estimate:** one number. "$\theta^* \approx 0.7$." *This is what L21–L24 are about.*
2. **Interval estimate:** a range plus a confidence. "$\theta^* \in [0.55, 0.85]$ with 95% confidence."
3. **Hypothesis test:** a yes/no decision between candidate values. "Is $\theta = 0.5$ or $\theta = 0.7$?"

## Slides 4–5: Bayesian vs frequentist

This is the philosophical split that the rest of the course is built on, so it's worth getting straight now.

**Frequentist (classical).** $\theta^*$ is a fixed, unknown *constant*. There's nothing random about it. The randomness is all in the data. You build an estimator $\hat\Theta = h(X_1,\dots,X_n)$, and because the $X_i$ are random, $\hat\Theta$ is a random variable. You then ask: on average, over many repeated datasets, how close is $\hat\Theta$ to $\theta^*$?

**Bayesian.** You don't know $\theta^*$, so you *model your uncertainty* about it as a random variable $\Theta$ with a **prior** $p_\Theta(\theta)$. You see data, and use Bayes' rule to update the prior into a **posterior** $p_{\Theta\mid X}(\theta\mid x)$. The prior and posterior describe your *state of knowledge*, not some physical randomness in $\theta^*$.

> The quick way to remember it: frequentists put the randomness in the data, Bayesians put it in the parameter too.

L21–L22 are frequentist. L23–L24 are Bayesian.

## Slide 6: estimator vs estimate

This distinction trips people up in proofs, so be careful with it:

- **Estimator** $\hat\Theta = h(X_1,\dots,X_n)$: a *recipe*, and a **random variable**. You can take its expectation, variance, and so on.
- **Estimate** $\hat\theta = h(x_1,\dots,x_n)$: the *number* you get when you run the recipe on your actual data.

Example: the sample mean $\hat\mu_n = \frac1n\sum_{i=1}^n X_i$ is an estimator of the true mean $\mu$. If your data is $\{2, 4, 9\}$, the estimate is $5$.

When a question says "is this estimator unbiased?", it's asking about the random variable, so capital letters.

## Slide 7: bias

$$
\boxed{B(\hat\Theta) = E[\hat\Theta] - \theta^*}
$$

Bias asks: *if I repeated the experiment over and over and averaged all my estimates, would I land on the truth?* If yes ($B = 0$), the estimator is **unbiased**.

The slide then asks the key question: **are all unbiased estimators good?** Consider two estimators of the mean $\mu$:

- $\hat\Theta_1 = X_1$ (just use the first sample and throw the rest away)
- $\hat\Theta_2 = \hat\mu_n$ (the sample mean)

Both are unbiased: $E[X_1] = \mu$ and $E[\hat\mu_n] = \mu$. But obviously $\hat\Theta_1$ is terrible: it ignores $n-1$ data points! The difference shows up in the variance:

$$
\text{Var}(\hat\Theta_1) = \sigma^2, \qquad \text{Var}(\hat\Theta_2) = \frac{\sigma^2}{n}.
$$

So "unbiased" alone tells you nothing about how *spread out* the guesses are. We need a measure that captures both.

## Slide 8: mean squared error and the bias–variance decomposition

$$
\boxed{\text{MSE}(\hat\Theta) = E\big[(\hat\Theta - \theta^*)^2\big] = \text{Var}(\hat\Theta) + B(\hat\Theta)^2}
$$

**Why the decomposition holds.** It's just the identity $E[Y^2] = \text{Var}(Y) + (E[Y])^2$ with $Y = \hat\Theta - \theta^*$. Two small facts finish it:

- $\theta^*$ is a constant, and subtracting a constant doesn't change variance, so $\text{Var}(\hat\Theta - \theta^*) = \text{Var}(\hat\Theta)$.
- $E[\hat\Theta - \theta^*] = E[\hat\Theta] - \theta^* = B(\hat\Theta)$, by definition.

Plug both in and you get the box. So MSE = (how spread out the guesses are) + (how far off-centre they are)$^2$. (Last year's Endsem Q10(b) asked for exactly this, plus "explain the tradeoff". So learn this one properly.)

**The point:** a *biased* estimator can beat an unbiased one, if its variance is small enough to make up for the bias. That's the bias–variance tradeoff.

### Slide 8 exercise: MSE of $\hat\Theta_1 = X_1$ and $\hat\Theta_2 = \hat\mu_n + 1$

- $\hat\Theta_1 = X_1$: unbiased, so $\text{MSE} = \text{Var}(X_1) = \sigma^2$.
- $\hat\Theta_2 = \hat\mu_n + 1$: $E[\hat\Theta_2] = \mu + 1$, so the bias is $1$. The variance is $\text{Var}(\hat\mu_n) = \sigma^2/n$ (adding a constant doesn't change variance). So

$$
\text{MSE}(\hat\Theta_2) = \frac{\sigma^2}{n} + 1.
$$

So which wins? $\hat\Theta_2$ beats $\hat\Theta_1$ exactly when $\frac{\sigma^2}{n} + 1 < \sigma^2$, i.e. when $\sigma^2 > \frac{n}{n-1}$. If the data is very noisy, a biased-but-stable estimator wins. If $\sigma^2$ is tiny, the bias of $1$ dominates and you're better off with $X_1$. Neither is better in general; it depends on the true parameters. (That's a recurring annoyance in frequentist stats: the "best" estimator often depends on the thing you don't know.)

## Slide 9: consistency

What happens as you collect more and more data? You'd hope your estimator closes in on the truth. That's **consistency**:

$$
\boxed{\hat\Theta_n \text{ is consistent if } \lim_{n\to\infty} P\big(|\hat\Theta_n - \theta^*| \ge \epsilon\big) = 0 \text{ for every } \epsilon > 0}
$$

That's just $\hat\Theta_n \xrightarrow{p} \theta^*$, convergence in probability from L18. If you have $\hat\Theta_n \xrightarrow{a.s.} \theta^*$ instead, it's called **strongly consistent** (and since a.s. ⇒ in probability, strongly consistent ⇒ consistent).

- $\hat\mu_n$ is strongly consistent for $\mu$: that's literally the SLLN.
- "Pick a random $X_i$ from the data" is **not** consistent. Its distribution is just the distribution of $X$, no matter how big $n$ gets, so $P(|X_i - \mu| \ge \epsilon)$ stays at some fixed positive number (unless $X$ is a constant).

**Careful: unbiased and consistent are different properties.** Neither implies the other.

- *Unbiased but not consistent:* $\hat\Theta_n = X_1$. Unbiased for every $n$, but it never improves.
- *Consistent but biased:* $\hat\mu_n + \frac1n$ (slide 20, coming up). Biased for every $n$, but the bias dies off and it converges.

---

# Part 2 — L22 (first half): Markov, consistency, and the famous $n-1$

## Slides 11–13: Markov's inequality

$$
\boxed{X \ge 0,\ a > 0 \implies P(X \ge a) \le \frac{E[X]}{a}}
$$

In words: a non-negative random variable can't be large too often, because that would drag its mean up.

**The slide's proof (continuous case).** Split the expectation at $a$ and throw away the part below $a$ (it's non-negative, so you're only making things smaller):

$$
E[X] = \int_0^a x f_X(x)\,dx + \int_a^\infty x f_X(x)\,dx \ \ge\ \int_a^\infty x f_X(x)\,dx \ \ge\ \int_a^\infty a f_X(x)\,dx = a\,P(X \ge a).
$$

The second $\ge$ uses $x \ge a$ on $[a,\infty)$. Divide by $a$ and you're done.

**A slicker proof that works for any $X \ge 0$ (discrete, continuous, mixed).** Notice that

$$
a \cdot \mathbf 1\{X \ge a\} \le X
$$

always holds: if $X \ge a$ the left side is $a \le X$, and otherwise it's $0 \le X$. Take expectations of both sides: $a\,P(X\ge a) \le E[X]$. Two lines. This is the version I'd write in an exam if they don't specify.

**Why do we care?** Markov is weak on its own (e.g. if $E[X] = 5$, it tells you $P(X \ge 20) \le 0.25$), but it's a *machine for producing other inequalities*. Apply it to a cleverly chosen non-negative random variable:

- Apply it to $(X - \mu)^2$ with $a = \epsilon^2$ and you get **Chebyshev**: $P(|X-\mu| \ge \epsilon) \le \sigma^2/\epsilon^2$.
- Apply it to $(\hat\Theta_n - \theta^*)^2$ and you get the next theorem.

## Slide 14: MSE → 0 implies consistency

**Theorem.** If $\lim_{n\to\infty}\text{MSE}(\hat\Theta_n) = 0$, then $\hat\Theta_n$ is consistent.

**Proof.**

$$
P(|\hat\Theta_n - \theta^*| \ge \epsilon) = P\big((\hat\Theta_n - \theta^*)^2 \ge \epsilon^2\big) \le \frac{E[(\hat\Theta_n - \theta^*)^2]}{\epsilon^2} = \frac{\text{MSE}(\hat\Theta_n)}{\epsilon^2} \to 0.
$$

This is *the* workhorse for proving consistency in exams. The recipe is:

1. Compute the bias and variance.
2. Show both $\to 0$ (so MSE $=\text{Var} + B^2 \to 0$).
3. Cite this theorem.

**Is the converse true?** No, and this is a good exam trap. Consider

$$
\hat\Theta_n = \begin{cases} \theta^* & \text{w.p. } 1 - \tfrac1n \\ n & \text{w.p. } \tfrac1n \end{cases}
$$

It's consistent: $P(|\hat\Theta_n - \theta^*| \ge \epsilon) \le \frac1n \to 0$. But $\text{MSE} = \frac{(n - \theta^*)^2}{n} \to \infty$. Rare-but-huge errors don't stop convergence in probability, but they wreck the MSE. (Same story as "convergence in probability doesn't imply convergence in mean square" from L18.)

## Slides 15–18: estimating the variance, and why we divide by $n-1$

The true variance is $\sigma^2 = E[(X-\mu)^2]$. The natural estimator would be $\frac1n\sum(X_i - \mu)^2$, which is perfectly unbiased... but it needs $\mu$, which you don't know. So you plug in $\hat\mu_n$ instead:

$$
S^2 = \frac1n \sum_{i=1}^n (X_i - \hat\mu_n)^2.
$$

**The slide's HW: is $S^2$ unbiased?** No. Here's the slide's derivation, step by step.

**Step 1.** Add and subtract $\mu$ inside the square:

$$
E[(X_i - \hat\mu_n)^2] = E[(X_i - \mu)^2] + E[(\hat\mu_n - \mu)^2] - 2E[(X_i - \mu)(\hat\mu_n - \mu)].
$$

**Step 2.** Work out the three pieces.

- $E[(X_i - \mu)^2] = \sigma^2$. That's the definition.
- $E[(\hat\mu_n - \mu)^2] = \text{Var}(\hat\mu_n) = \sigma^2/n$.
- The cross term is the interesting one. Write $\hat\mu_n - \mu = \frac1n\sum_j (X_j - \mu)$. Then
  $$
  E[(X_i-\mu)(\hat\mu_n-\mu)] = \frac1n\sum_j E[(X_i-\mu)(X_j-\mu)] = \frac1n\sum_j \text{Cov}(X_i, X_j) = \frac{\sigma^2}{n},
  $$
  because independence kills every term except $j = i$.

**Step 3.** Put it together:

$$
E[(X_i - \hat\mu_n)^2] = \sigma^2 + \frac{\sigma^2}{n} - \frac{2\sigma^2}{n} = \sigma^2\Big(1 - \frac1n\Big),
$$

so

$$
E[S^2] = \frac{n-1}{n}\sigma^2, \qquad B(S^2) = -\frac{\sigma^2}{n}.
$$

**Why is it biased low?** Intuition: $\hat\mu_n$ is computed *from the same data*, so it sits closer to the data points than the true $\mu$ does. (In fact $\hat\mu_n$ is the value of $c$ that *minimises* $\sum (X_i - c)^2$.) Deviations from $\hat\mu_n$ are systematically a bit smaller than deviations from $\mu$.

**The fix (slide 18).** Rescale by $\frac{n}{n-1}$:

$$
\boxed{\bar S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \hat\mu_n)^2, \qquad E[\bar S^2] = \sigma^2}
$$

This is the "sample variance" your calculator uses.

> **Faster derivation (worth memorising).** The identity $\sum (X_i - \bar X)^2 = \sum (X_i - \mu)^2 - n(\bar X - \mu)^2$ gives $E[\sum (X_i - \bar X)^2] = n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n-1)\sigma^2$ in one line. To prove the identity, expand $\sum\big((X_i - \mu) - (\bar X - \mu)\big)^2$ and use $\sum(X_i - \mu) = n(\bar X - \mu)$.

### Slide 18 question: is $\sqrt{\bar S^2}$ unbiased for $\sigma$?

No (unless the data is constant). Clean proof using nothing but variance $\ge 0$. Let $\bar S = \sqrt{\bar S^2}$. Then

$$
0 \le \text{Var}(\bar S) = E[\bar S^2] - (E[\bar S])^2 = \sigma^2 - (E[\bar S])^2,
$$

so $E[\bar S] \le \sigma$. Equality would need $\text{Var}(\bar S) = 0$, i.e. $\bar S$ is a constant, which doesn't happen for non-degenerate data. So $\bar S$ **underestimates** $\sigma$ on average.

**The general lesson:** unbiasedness does *not* survive nonlinear transformations. If $\hat\Theta$ is unbiased for $\theta$, then $g(\hat\Theta)$ is usually *not* unbiased for $g(\theta)$. (Jensen's inequality is the general reason.)

Another example of the same thing, which was on last year's HW 11 Q8 and Tutorial 11 Q4: $\bar X$ is unbiased for $\mu$, but

$$
E[\bar X^2] = \text{Var}(\bar X) + (E\bar X)^2 = \mu^2 + \frac{\sigma^2}{n},
$$

so $\bar X^2$ is biased for $\mu^2$, with bias $\sigma^2/n$. (It is asymptotically unbiased and consistent, though.) If you want an unbiased version: $\bar X^2 - \frac{\bar S^2}{n}$.

## Slide 19: estimating $\theta$ in Uniform$(0, \theta)$

This example shows up *everywhere* (it was on last year's HW 11 Q9, Tutorial 11 Q1, and in MLE form on the Endsem). Do it properly once and you'll own it.

**Setup.** $X_1,\dots,X_n \sim \mathcal U(0,\theta)$ i.i.d. Estimator: $\hat\theta_n = M = \max\{X_1,\dots,X_n\}$.

Intuitively it makes sense: $\theta$ is the upper end of the range, and the biggest thing you've seen is your best clue. But the max can never *exceed* $\theta$, so it must undershoot on average.

**Distribution of the max (L9–L10 skill).** For $0 \le t \le \theta$:

$$
F_M(t) = P(\text{all } X_i \le t) = \Big(\frac{t}{\theta}\Big)^n, \qquad f_M(t) = \frac{n t^{n-1}}{\theta^n}.
$$

**Mean:**

$$
E[M] = \int_0^\theta t \cdot \frac{n t^{n-1}}{\theta^n}\,dt = \frac{n}{\theta^n}\cdot\frac{\theta^{n+1}}{n+1} = \frac{n}{n+1}\theta.
$$

So $B(M) = -\frac{\theta}{n+1}$. Biased low, as expected.

**Second moment and variance:**

$$
E[M^2] = \frac{n}{\theta^n}\cdot\frac{\theta^{n+2}}{n+2} = \frac{n}{n+2}\theta^2, \qquad \text{Var}(M) = \frac{n\theta^2}{n+2} - \frac{n^2\theta^2}{(n+1)^2} = \frac{n\theta^2}{(n+1)^2(n+2)}.
$$

**MSE:**

$$
\text{MSE}(M) = \frac{n\theta^2}{(n+1)^2(n+2)} + \frac{\theta^2}{(n+1)^2} = \frac{2\theta^2}{(n+1)(n+2)}.
$$

**The unbiased version.** $\tilde\theta_n = \frac{n+1}{n}M$ has $E[\tilde\theta_n] = \theta$, and

$$
\text{MSE}(\tilde\theta_n) = \text{Var}(\tilde\theta_n) = \frac{(n+1)^2}{n^2}\cdot\frac{n\theta^2}{(n+1)^2(n+2)} = \frac{\theta^2}{n(n+2)}.
$$

**Consistency.** For $0 < \epsilon < \theta$,

$$
P(|M - \theta| \ge \epsilon) = P(M \le \theta - \epsilon) = \Big(\frac{\theta - \epsilon}{\theta}\Big)^n \to 0.
$$

(It's actually a.s., since $M$ is increasing in $n$ and bounded by $\theta$; that's what the slide says.) And $\tilde\theta_n = \frac{n+1}{n}M$ is consistent too, since $\frac{n+1}{n}\to 1$.

### Going further: three estimators compared (Tutorial 11 Q1)

Another unbiased estimator comes from the mean: $E[X] = \theta/2$, so $\hat\theta_{\text{mom}} = 2\bar X$ is unbiased with

$$
\text{Var}(2\bar X) = 4\cdot\frac{\theta^2/12}{n} = \frac{\theta^2}{3n}.
$$

Now compare:

| Estimator | Bias | MSE |
|---|---|---|
| $2\bar X$ | $0$ | $\dfrac{\theta^2}{3n}$ |
| $\frac{n+1}{n}M$ | $0$ | $\dfrac{\theta^2}{n(n+2)}$ |
| $M$ | $-\dfrac{\theta}{n+1}$ | $\dfrac{2\theta^2}{(n+1)(n+2)}$ |
| $\frac{n+2}{n+1}M$ | $-\dfrac{\theta}{(n+1)^2}$ | $\dfrac{\theta^2}{(n+1)^2}$ |

Two things worth noticing:

1. The max-based estimators have MSE of order $1/n^2$, while $2\bar X$ is only order $1/n$. So for large $n$ the max is far better. The reason: for the uniform, the max is what actually tells you where the top end $\theta$ is, and the sample mean blurs that information by averaging in all the small values.
2. The last row is the *best possible* multiple $cM$. Minimise $\text{MSE}(cM) = c^2 E[M^2] - 2c\theta E[M] + \theta^2$ over $c$: you get $c = \frac{E[M]\theta}{E[M^2]} = \frac{n+2}{n+1}$, with MSE $\frac{\theta^2}{(n+1)^2}$. It's slightly **biased**, and it **beats** the unbiased one. That's the bias–variance tradeoff again, in an actual example.

## Slide 20: consistent but biased

$X_i \sim \mathcal N(\mu, \sigma^2)$, and $\hat\mu'_n = \hat\mu_n + \frac1n$. Then $E[\hat\mu'_n] = \mu + \frac1n$ (biased), but the bias $\to 0$ and the variance $\sigma^2/n \to 0$, so $\text{MSE} = \frac{\sigma^2}{n} + \frac1{n^2} \to 0$ and the estimator is consistent.

**Vocabulary:** an estimator whose bias $\to 0$ as $n\to\infty$ is called **asymptotically unbiased**. $S^2$ (divide by $n$), $M$ for the uniform, and $\hat\mu_n + 1/n$ are all asymptotically unbiased.

---

# Part 3 — L22 (second half): maximum likelihood

## Slide 21: the likelihood function

So far we've been *checking* estimators someone handed us. But where do good estimators come from? For the mean and variance, we had natural guesses. For a general parameter (a rate, a shape, the $\theta$ in some weird pdf), we need a **systematic recipe**. That recipe is maximum likelihood.

**The likelihood** is the joint pmf/pdf of the data, but viewed as a function of the parameter $\theta$, with the data held fixed:

$$
L(x_1,\dots,x_n;\theta) = \begin{cases} p_{X_1,\dots,X_n}(x_1,\dots,x_n;\theta) & \text{discrete} \\ f_{X_1,\dots,X_n}(x_1,\dots,x_n;\theta) & \text{continuous} \end{cases}
$$

For i.i.d. data it factorises:

$$
L(\theta) = \prod_{i=1}^n f_X(x_i;\theta), \qquad \ln L(\theta) = \sum_{i=1}^n \ln f_X(x_i;\theta).
$$

> **The mental shift.** The pdf $f(x;\theta)$ asks "for this fixed $\theta$, how likely is each $x$?" The likelihood $L(\theta)$ asks "for this fixed data, how well does each $\theta$ explain it?" Same formula, different variable. Note that $L(\theta)$ is *not* a pdf in $\theta$; it doesn't have to integrate to 1.

**Why the log?** Products are painful to differentiate, sums are easy. And since $\ln$ is strictly increasing, whatever $\theta$ maximises $L$ also maximises $\ln L$. (That's last year's HW 11 Q4, word for word.)

### Slide 21 exercise: write down the likelihoods

**(a) $\text{Exp}(\theta)$, rate $\theta$:**
$$
L(\theta) = \prod \theta e^{-\theta x_i} = \theta^n e^{-\theta\sum x_i}, \quad x_i \ge 0.
$$

**(b) $\mathcal N(\theta, 1)$:**
$$
L(\theta) = (2\pi)^{-n/2}\exp\Big(-\tfrac12\sum (x_i - \theta)^2\Big).
$$

**(c) $\text{Binom}(n_0, \theta)$, $n_0$ known (I'm calling the trials $n_0$ so it doesn't clash with the sample size $n$):**
$$
L(\theta) = \prod_{i=1}^n \binom{n_0}{x_i}\theta^{x_i}(1-\theta)^{n_0 - x_i} = \Big[\prod\binom{n_0}{x_i}\Big]\theta^{\sum x_i}(1-\theta)^{nn_0 - \sum x_i}.
$$

**(d) $\text{Binom}(\theta, p)$, unknown number of trials $\theta \in \{0, 1, 2, \dots\}$:**
$$
L(\theta) = \prod_{i=1}^n \binom{\theta}{x_i} p^{x_i}(1-p)^{\theta - x_i}, \quad \text{and } L(\theta) = 0 \text{ if } \theta < \max_i x_i.
$$

Case (d) is the one that's actually interesting, and it's what slide 22's warning is about.

## Slide 22: the MLE

$$
\boxed{\hat\Theta_{ML} = \arg\max_\theta L(x_1,\dots,x_n;\theta) = \arg\max_\theta \ln L(x_1,\dots,x_n;\theta)}
$$

"Choose the parameter value under which the data you actually saw is most probable."

**The default method:** set $\frac{d}{d\theta}\ln L = 0$, solve, and check it's a max (second derivative $< 0$, or argue from the shape).

**When calculus doesn't work** (the slide's warning, plus one more):

1. **The parameter is an integer** (like $\theta$ in Binom$(\theta, p)$). You can't differentiate in $\theta$. Use the **ratio trick**: look at $L(\theta)/L(\theta - 1)$ and find where it crosses 1.
2. **The support depends on $\theta$** (like Uniform$(0,\theta)$). The likelihood has a jump, and the max sits at a boundary, not at a zero of the derivative. See slide 27.

### Worked example: the integer case, Binom$(N, p)$ with $N$ unknown

Take one observation $x$ from $\text{Binom}(N, p)$ with $p$ known. Then, for $N \ge x$,

$$
\frac{L(N)}{L(N-1)} = \frac{\binom{N}{x}p^x(1-p)^{N-x}}{\binom{N-1}{x}p^x(1-p)^{N-1-x}} = \frac{N}{N - x}(1-p).
$$

(using $\binom{N}{x}/\binom{N-1}{x} = \frac{N}{N-x}$). This ratio is $\ge 1$ exactly when

$$
N(1-p) \ge N - x \iff N \le \frac{x}{p}.
$$

So $L$ increases while $N \le x/p$ and decreases after: $\hat N_{ML} = \lfloor x/p \rfloor$. (If $x/p$ is an integer, both $x/p$ and $x/p - 1$ tie.) Sanity check: you expect $x \approx Np$, so $N \approx x/p$. 

## Slide 23: properties of the MLE (no proof)

Under mild regularity conditions:

1. **Consistent:** $\hat\Theta_{ML} \xrightarrow{p} \theta^*$.
2. **Asymptotically unbiased:** $E[\hat\Theta_{ML}] \to \theta^*$.

Note what's *not* on the list: the MLE is **not necessarily unbiased** for finite $n$. Examples coming up: $\hat\sigma^2_{ML}$ (divides by $n$), and $\hat\theta_{ML} = \max x_i$ for the uniform.

Two more facts worth knowing (not on the slides, but they come up in problems):

- **Invariance:** the MLE of $g(\theta)$ is $g(\hat\theta_{ML})$. E.g. if $\hat\theta_{ML} = \bar x$ is the MLE of an exponential's mean, the MLE of the rate $1/\theta$ is $1/\bar x$. (Tutorial 11 Q3.)
- **The MLE may not exist, or may not be unique.** Examples in the practice section (Tutorial 11 Q8 and HW 11 Q10).

## Slides 25–30: the standard MLE examples

These are all on the slides. Do each one yourself before reading; they're quick and very likely exam material.

### Exponential (slide 25)

$$
\ln L(\lambda) = n\ln\lambda - \lambda\sum x_i, \qquad \frac{d}{d\lambda}\ln L = \frac{n}{\lambda} - \sum x_i = 0 \implies \boxed{\hat\lambda_{ML} = \frac{n}{\sum x_i} = \frac{1}{\bar x}}
$$

Second derivative: $-n/\lambda^2 < 0$, so it's a max. Makes sense: the mean of Exp$(\lambda)$ is $1/\lambda$, so estimate the rate as 1 over the sample mean.

*Twist:* is $\hat\lambda_{ML}$ unbiased? No. $E[1/\bar X] \ne 1/E[\bar X]$ (a nonlinear function again). To get the actual value: $T = \sum X_i \sim \text{Gamma}(n, \lambda)$ (L14), so using the Gamma integral $\int_0^\infty t^{a-1}e^{-\lambda t}dt = \frac{\Gamma(a)}{\lambda^a}$,
$$
E\Big[\frac1T\Big] = \int_0^\infty\frac1t\cdot\frac{\lambda^n}{\Gamma(n)}t^{n-1}e^{-\lambda t}\,dt = \frac{\lambda^n}{\Gamma(n)}\cdot\frac{\Gamma(n-1)}{\lambda^{n-1}} = \frac{\lambda}{n-1}\qquad(n\ge2).
$$
So $E[\hat\lambda_{ML}] = E[n/T] = \frac{n}{n-1}\lambda$. Biased high, but the bias goes to 0, exactly as slide 23 promised.

### Bernoulli (slide 26)

$$
\ln L(p) = \Big(\sum x_i\Big)\ln p + \Big(n - \sum x_i\Big)\ln(1-p),
$$
$$
\frac{d}{dp}\ln L = \frac{\sum x_i}{p} - \frac{n - \sum x_i}{1-p} = 0 \implies \boxed{\hat p_{ML} = \frac1n\sum x_i}
$$

(To solve: cross-multiply, $(1-p)\sum x_i = p(n - \sum x_i)$, and the $p\sum x_i$ terms cancel, leaving $\sum x_i = np$.)

The fraction of 1s. Unbiased ($E[\bar X] = p$) and consistent (SLLN).

### Uniform$(0,\theta)$ (slide 27) — the "don't differentiate" one

$$
L(\theta) = \prod \frac{1}{\theta}\mathbf 1\{0 \le x_i \le \theta\} = \begin{cases} \theta^{-n} & \theta \ge \max x_i \\ 0 & \theta < \max x_i \end{cases}
$$

If you blindly differentiate $\theta^{-n}$, you get $-n\theta^{-n-1} \ne 0$ and you're stuck. Instead, *look* at the function: it's zero until $\theta = \max x_i$ (any smaller $\theta$ would make some data point impossible), then it's $\theta^{-n}$, which is *decreasing*. So the max is at the left edge:

$$
\boxed{\hat\theta_{ML} = \max(x_1,\dots,x_n)}
$$

We showed in slide 19 that this is biased ($E = \frac{n}{n+1}\theta$) but consistent. Last year's Endsem Q5 generalised this to Uniform$[a,b]$ with both unknown (practice section).

### Normal, $\sigma^2$ known (slide 28)

$$
\ln L(\mu) = -\frac n2\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum (x_i - \mu)^2, \qquad \frac{d}{d\mu}\ln L = \frac{1}{\sigma^2}\sum(x_i - \mu) = 0 \implies \boxed{\hat\mu_{ML} = \bar x}
$$

Notice that maximising $\ln L$ here is the same as *minimising* $\sum(x_i - \mu)^2$. That's "least squares", and it comes back in linear regression.

### Normal, both unknown (slide 29)

Now $\ln L(\mu, \sigma^2) = -\frac n2 \ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum(x_i - \mu)^2$, and you set *both* partial derivatives to zero.

- $\partial/\partial\mu$: same as before, gives $\hat\mu = \bar x$ (it doesn't depend on $\sigma^2$).
- $\partial/\partial\sigma^2$: treat $v = \sigma^2$ as the variable.
  $$
  \frac{\partial}{\partial v}\ln L = -\frac{n}{2v} + \frac{1}{2v^2}\sum(x_i - \hat\mu)^2 = 0 \implies \boxed{\hat\sigma^2_{ML} = \frac1n\sum(x_i - \bar x)^2}
  $$

So the MLE of the variance divides by $n$: it's exactly $S^2$ from slide 16, which we know is **biased** ($E = \frac{n-1}{n}\sigma^2$). The MLE gave us the biased one! That's fine; slide 23 only promised *asymptotic* unbiasedness.

### Poisson (slide 30)

Each term of the likelihood is $\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}$, so
$$
\ln L(\lambda) = \sum(x_i\ln\lambda - \lambda - \ln x_i!) = n\bar x\ln\lambda - n\lambda + C,
$$
where $C = -\sum\ln x_i!$ doesn't involve $\lambda$ and can be ignored. Differentiate:
$$
\frac{n\bar x}{\lambda} - n = 0 \implies \boxed{\hat\lambda_{ML} = \bar x}
$$

Unbiased, with $\text{MSE} = \text{Var}(\bar X) = \lambda/n$. (That's last year's Endsem Q6, practically verbatim.)

### The pattern

For lots of standard families, the MLE ends up matching the sample version of the parameter's meaning: Bernoulli $p$ = mean, so $\hat p = \bar x$. Poisson $\lambda$ = mean, so $\hat\lambda = \bar x$. Exponential rate = 1/mean, so $\hat\lambda = 1/\bar x$. That's a great sanity check. But it's *not* a rule: the uniform's MLE is the max, not $2\bar x$.

---

# Part 4 — L23: Bayesian inference

## Slide 31: the setup

Now we switch philosophies. You're uncertain about $\theta^*$, so you model it as a random variable $\Theta$, and Bayes' rule does the rest:

$$
\boxed{\underbrace{f_{\Theta\mid X}(\theta\mid x)}_{\text{posterior}} \;\propto\; \underbrace{f_{X\mid\Theta}(x\mid\theta)}_{\text{likelihood}} \times \underbrace{f_\Theta(\theta)}_{\text{prior}}}
$$

- **Prior:** what you believe about $\theta$ *before* seeing data.
- **Likelihood:** the same thing as in MLE: how well each $\theta$ explains the data.
- **Posterior:** what you believe *after* seeing data.

As data accumulates, the posterior gets narrower and narrower around the truth.

## Slide 32: four versions of Bayes' rule

The slide lists all four combinations of discrete/continuous for $X$ and $\Theta$. They all have the same shape:

$$
\text{posterior} = \frac{\text{likelihood} \times \text{prior}}{\text{marginal of the data}}
$$

You just use $p$ for whichever variable is discrete and $f$ for whichever is continuous. The denominator is always "sum/integrate the numerator over $\theta$":

$$
f_X(x) = \int f_{X\mid\Theta}(x\mid\theta)f_\Theta(\theta)\,d\theta \quad\text{or}\quad p_X(x) = \sum_\theta p_{X\mid\Theta}(x\mid\theta)p_\Theta(\theta).
$$

> **The most important trick in this whole part.** The denominator doesn't depend on $\theta$. It's just whatever constant makes the posterior integrate to 1. So in practice, **write likelihood × prior, drop every factor that doesn't involve $\theta$, and recognise the shape.** If it looks like $\theta^{a-1}(1-\theta)^{b-1}$, it's a Beta. If it looks like $\lambda^{a-1}e^{-b\lambda}$, it's a Gamma. If it's $\exp(-\text{quadratic in }\theta)$, it's a Gaussian. You never need to do the integral.
>
> The slides do the integral explicitly in each example (to show you it works), but in an exam, recognising the kernel is faster and less error-prone.

## Slide 34: the Beta distribution

$$
\Theta \sim \text{Beta}(\alpha, \beta): \quad f_\Theta(\theta) = \frac{1}{B(\alpha,\beta)}\theta^{\alpha-1}(1-\theta)^{\beta-1}, \quad 0 < \theta < 1,
$$

where

$$
B(\alpha,\beta) = \int_0^1 \theta^{\alpha-1}(1-\theta)^{\beta-1}\,d\theta = \frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}, \qquad \Gamma(n) = (n-1)! \text{ for integers.}
$$

It lives on $(0,1)$, so it's the natural prior for a probability. The plot on slide 35 shows how flexible it is: $\alpha = \beta = 1$ is flat, $\alpha = \beta = 2$ is a hump at $\tfrac12$, $\alpha > \beta$ leans right, $\alpha = \beta = 0.5$ is U-shaped.

**Think of $\alpha - 1$ and $\beta - 1$ as "imaginary heads and tails you've already seen".** That intuition makes every Beta–Binomial result obvious.

**Mean and variance (slide 36), derived.** The trick is that any integral of the form $\int_0^1\theta^{a}(1-\theta)^{b}\,d\theta$ is a Beta function:

$$
E[\Theta] = \frac{1}{B(\alpha,\beta)}\int_0^1 \theta^{\alpha}(1-\theta)^{\beta-1}\,d\theta = \frac{B(\alpha+1,\beta)}{B(\alpha,\beta)} = \frac{\Gamma(\alpha+1)\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\alpha+\beta+1)} = \frac{\alpha}{\alpha+\beta},
$$

using $\Gamma(z+1) = z\Gamma(z)$. The same trick gives $E[\Theta^2] = \frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}$, and so

$$
\boxed{E[\Theta] = \frac{\alpha}{\alpha+\beta}, \qquad \text{Var}(\Theta) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}, \qquad \text{mode} = \frac{\alpha - 1}{\alpha + \beta - 2}\ (\alpha,\beta > 1)}
$$

And yes, $\text{Beta}(1,1)$ has pdf $\frac{1}{B(1,1)}\theta^0(1-\theta)^0 = 1$ on $(0,1)$: it's the uniform.

## Slides 33, 37–40: Example 1, Beta prior + Binomial likelihood

**Setup.** A coin with unknown $P(H) = \theta^*$. You toss it $n$ times and see $k$ heads. Prior: $\Theta \sim \text{Beta}(\alpha, \beta)$.

**The quick way (kernel recognition):**

$$
f_{\Theta\mid X}(\theta\mid k) \propto \underbrace{\binom nk\theta^k(1-\theta)^{n-k}}_{\text{likelihood}} \cdot \underbrace{\frac{1}{B(\alpha,\beta)}\theta^{\alpha-1}(1-\theta)^{\beta-1}}_{\text{prior}} \propto \theta^{k+\alpha-1}(1-\theta)^{n-k+\beta-1}.
$$

That's the kernel of a Beta. So

$$
\boxed{\Theta \mid X = k \ \sim\ \text{Beta}(\alpha + k,\ \beta + n - k)}
$$

**The slide's way (doing the integral).** The marginal is

$$
f_X(k) = \binom nk\frac{1}{B(\alpha,\beta)}\int_0^1\theta^{k+\alpha-1}(1-\theta)^{n-k+\beta-1}\,d\theta = \binom nk\frac{B(k+\alpha,\, n-k+\beta)}{B(\alpha,\beta)},
$$

and dividing, the $\binom nk$ and $B(\alpha,\beta)$ cancel, leaving

$$
f_{\Theta\mid X}(\theta\mid k) = \frac{\theta^{k+\alpha-1}(1-\theta)^{n-k+\beta-1}}{B(k+\alpha,\, n-k+\beta)}.
$$

Same answer. (Side note: $f_X(k)$ is called the Beta–Binomial distribution. With a uniform prior, $f_X(k) = \binom nk B(k+1, n-k+1) = \binom nk\frac{k!(n-k)!}{(n+1)!} = \frac{1}{n+1}$, so every $k$ from $0$ to $n$ is equally likely.)

**Read it with the "imaginary tosses" intuition:** you started with $\alpha - 1$ imaginary heads and $\beta - 1$ imaginary tails, then added $k$ real heads and $n-k$ real tails. The posterior just adds the counts. That's why conjugate priors are so convenient.

### Slide 36: uniform prior, and what happens as $n\to\infty$

With $\alpha = \beta = 1$, the posterior is $\text{Beta}(k+1, n-k+1)$, so

$$
E[\Theta\mid k] = \frac{k+1}{n+2}, \qquad \text{Var}(\Theta\mid k) = \frac{(k+1)(n-k+1)}{(n+2)^2(n+3)}.
$$

(The variance on the slide looks garbled; this is what the Beta formula gives with $\alpha' = k+1$, $\beta' = n-k+1$, $\alpha'+\beta' = n+2$.)

$\frac{k+1}{n+2}$ is **Laplace's rule of succession**: it's like the MLE $\frac kn$ but with one fake head and one fake tail mixed in. If you toss once and see a head, the MLE says $P(H) = 1$ (overconfident!), while the posterior mean says $\frac23$.

As $n\to\infty$: $\frac kn \to \theta^*$ a.s. by the SLLN, so $\frac{k+1}{n+2}\to\theta^*$ too. And the variance is at most $\frac{(n+2)^2/4}{(n+2)^2(n+3)} = \frac{1}{4(n+3)} \to 0$. So the posterior collapses to a spike (a "Dirac delta") at $\theta^*$. **With enough data, the prior stops mattering.**

## Slides 41–44: Example 2, Gaussian prior + Gaussian likelihood

**Setup.** $X_1,\dots,X_n$ i.i.d. $\mathcal N(\theta^*, \sigma^2)$ with $\sigma^2$ **known** and $\theta^*$ unknown. Prior: $\Theta \sim \mathcal N(\mu_0, \sigma^2)$. (On the slide, the prior has the *same* variance $\sigma^2$ as the noise. That's a simplification; I'll do the general case right after.)

**The slide's HW: derive the posterior.** This is a "complete the square" exercise. Write likelihood × prior and keep only what depends on $\theta$:

$$
f_{\Theta\mid X}(\theta\mid x) \propto \exp\Big(-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i - \theta)^2\Big)\cdot\exp\Big(-\frac{(\theta - \mu_0)^2}{2\sigma^2}\Big) = \exp\Big(-\frac{1}{2\sigma^2}Q(\theta)\Big),
$$

where

$$
Q(\theta) = \sum(x_i - \theta)^2 + (\theta - \mu_0)^2 = (n+1)\theta^2 - 2\theta\Big(\sum x_i + \mu_0\Big) + \underbrace{\sum x_i^2 + \mu_0^2}_{\text{no }\theta}.
$$

Complete the square in $\theta$. Pull out the $(n+1)$:
$$
Q(\theta) = (n+1)\Big[\theta^2 - 2\theta m\Big] + \dots,\qquad m = \frac{\sum x_i + \mu_0}{n+1},
$$
and $\theta^2 - 2\theta m = (\theta - m)^2 - m^2$. The $-m^2$ doesn't involve $\theta$, so it joins the constant:

$$
Q(\theta) = (n+1)(\theta - m)^2 + \text{const}.
$$

Constants in the exponent just become constant factors in front, and those get absorbed into the normalisation.

So

$$
f_{\Theta\mid X}(\theta\mid x) \propto \exp\Big(-\frac{(n+1)}{2\sigma^2}(\theta - m)^2\Big),
$$

which is a Gaussian kernel with mean $m$ and variance $\frac{\sigma^2}{n+1}$:

$$
\boxed{\Theta \mid X = x \ \sim\ \mathcal N\Big(\frac{\sum_{i=1}^n x_i + \mu_0}{n+1},\ \frac{\sigma^2}{n+1}\Big)}
$$

> **Heads-up: slide 41 has a typo.** It says the posterior mean is $\frac{\sum x_i + \mu_0}{n}$. The correct denominator is $n+1$, as slides 43–44 show. The same typo is on slide 52 (MAP for Example 2). If an exam asks, use $n+1$.

**Interpretation:** the prior behaves exactly like **one extra data point** at $\mu_0$. Posterior mean = average of $n$ real points and one fake point. That's because the prior's variance equals the noise variance, so the prior is "worth" one observation.

**As $n\to\infty$ (slide 44):** the mean $\to \bar x$ (the MLE), the variance $\to 0$. The prior washes out again.

### The general version (prior variance $\sigma_0^2 \ne \sigma^2$)

This is the version that shows up in problems (e.g. Tutorial 12 Q3), so it's worth knowing. Prior $\mathcal N(\mu_0, \sigma_0^2)$, noise variance $\sigma^2$. The same completing-the-square gives:

$$
\boxed{\frac{1}{\sigma_{\text{post}}^2} = \frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}, \qquad \mu_{\text{post}} = \sigma_{\text{post}}^2\Big(\frac{\mu_0}{\sigma_0^2} + \frac{\sum x_i}{\sigma^2}\Big)}
$$

In words: **precisions add** (precision = 1/variance), and the posterior mean is a **precision-weighted average** of the prior mean and the data. Set $\sigma_0 = \sigma$ and you get the slide's answer back.

## Slides 45–49: Example 3, Gamma prior + Poisson likelihood

**The Gamma distribution** (rate parametrisation, as in the slides):

$$
\Lambda \sim \text{Gamma}(\alpha, \beta): \quad f_\Lambda(\lambda) = \frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}, \ \lambda > 0, \qquad E = \frac\alpha\beta, \ \text{Var} = \frac{\alpha}{\beta^2}, \ \text{mode} = \frac{\alpha-1}{\beta}\ (\alpha \ge 1).
$$

The key integral (which is how the slides get the marginal):

$$
\int_0^\infty \lambda^{a-1}e^{-b\lambda}\,d\lambda = \frac{\Gamma(a)}{b^a}.
$$

**Setup.** Observe one count $X = x$ from Poisson$(\lambda)$. Prior $\Lambda \sim \text{Gamma}(\alpha, \beta)$.

**Kernel recognition:**

$$
f_{\Lambda\mid X}(\lambda\mid x) \propto \frac{\lambda^x e^{-\lambda}}{x!}\cdot\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda} \propto \lambda^{x+\alpha-1}e^{-(1+\beta)\lambda}.
$$

That's a Gamma kernel:

$$
\boxed{\Lambda\mid X = x \ \sim\ \text{Gamma}(\alpha + x,\ \beta + 1)}
$$

The slides confirm it by computing $f_X(x) = \frac{\beta^\alpha\Gamma(x+\alpha)}{\Gamma(\alpha)x!(1+\beta)^{x+\alpha}}$ and dividing.

**Posterior mean and variance (slide 49):** $E[\Lambda\mid x] = \frac{x+\alpha}{1+\beta}$, $\text{Var}(\Lambda\mid x) = \frac{x+\alpha}{(1+\beta)^2}$.

### Extending to $n$ observations (this is what problems actually ask)

With $x_1,\dots,x_n$ i.i.d. Poisson$(\lambda)$, the likelihood is $\propto \lambda^{\sum x_i}e^{-n\lambda}$, so

$$
\boxed{\Lambda\mid x_1,\dots,x_n \ \sim\ \text{Gamma}\Big(\alpha + \sum x_i,\ \beta + n\Big)}
$$

**Interpretation:** $\alpha$ is like "total count seen before", $\beta$ is like "number of intervals observed before". Each new interval adds its count to $\alpha$ and 1 to $\beta$.

And here's a really nice way to see the posterior mean:

$$
E[\Lambda\mid x] = \frac{\alpha + \sum x_i}{\beta + n} = \underbrace{\frac{\beta}{\beta+n}}_{\text{weight}}\cdot\underbrace{\frac{\alpha}{\beta}}_{\text{prior mean}} + \underbrace{\frac{n}{\beta+n}}_{\text{weight}}\cdot\underbrace{\bar x}_{\text{MLE}}.
$$

The posterior mean is a **weighted average of the prior mean and the MLE**, and the weight on the data $\to 1$ as $n\to\infty$. The Beta–Binomial and Gaussian–Gaussian cases have exactly the same structure. If you remember one sentence from L23, make it this one.

### The same trick for an exponential likelihood (last year's Endsem Q9)

$X_i \sim \text{Exp}(\lambda)$ i.i.d., prior $\Lambda\sim\text{Gamma}(\alpha,\beta)$. Likelihood $\lambda^n e^{-\lambda\sum x_i}$, so

$$
f_{\Lambda\mid X} \propto \lambda^{n}e^{-\lambda\sum x_i}\cdot\lambda^{\alpha-1}e^{-\beta\lambda} = \lambda^{\alpha+n-1}e^{-(\beta+\sum x_i)\lambda} \implies \Lambda\mid x \sim \text{Gamma}\Big(\alpha+n,\ \beta+\sum x_i\Big).
$$

Gamma is conjugate for the exponential too.

---

# Part 5 — L24: conjugate priors, MAP and the CE estimator

## Slide 50: conjugate priors

When the posterior lands in the **same family** as the prior, the prior is called **conjugate** to that likelihood. That's what happened in all three examples:

| Likelihood | Conjugate prior | Posterior |
|---|---|---|
| Binomial$(n, \theta)$, $k$ successes | Beta$(\alpha,\beta)$ | Beta$(\alpha + k,\ \beta + n - k)$ |
| Bernoulli, $n$ trials, $k$ ones | Beta$(\alpha,\beta)$ | Beta$(\alpha + k,\ \beta + n - k)$ |
| Geometric$(\theta)$, values $y_1..y_n$ | Beta$(\alpha,\beta)$ | Beta$(\alpha + n,\ \beta + \sum y_i - n)$ |
| Poisson$(\lambda)$, $n$ counts | Gamma$(\alpha,\beta)$ | Gamma$(\alpha + \sum x_i,\ \beta + n)$ |
| Exponential$(\lambda)$, $n$ values | Gamma$(\alpha,\beta)$ | Gamma$(\alpha + n,\ \beta + \sum x_i)$ |
| $\mathcal N(\theta, \sigma^2)$, $\sigma^2$ known | $\mathcal N(\mu_0, \sigma_0^2)$ | $\mathcal N(\mu_{\text{post}}, \sigma^2_{\text{post}})$ (precisions add) |

(The geometric row uses the pmf $\theta(1-\theta)^{y-1}$: likelihood $\theta^n(1-\theta)^{\sum y_i - n}$.)

Why it's convenient: updating your beliefs becomes "update two numbers", instead of "compute a new function". And with sequential data, yesterday's posterior is today's prior; you just keep adding.

## Slide 51: MAP, the maximum a posteriori estimate

A posterior is a whole distribution. Sometimes you just want one number. The first option is **the peak**:

$$
\boxed{\hat\theta_{MAP} = \arg\max_\theta f_{\Theta\mid X}(\theta\mid x) = \arg\max_\theta f_{X\mid\Theta}(x\mid\theta)\,f_\Theta(\theta)}
$$

(The denominator $f_X(x)$ doesn't depend on $\theta$, so you can ignore it.) Compare with the MLE:

$$
\hat\theta_{ML} = \arg\max_\theta f_{X\mid\Theta}(x\mid\theta).
$$

So **MAP = MLE with the prior multiplied in.** In log form:

$$
\hat\theta_{MAP} = \arg\max_\theta\big[\ln L(\theta) + \ln f_\Theta(\theta)\big].
$$

The $\ln f_\Theta$ term acts like a "penalty" pulling the estimate towards where the prior thinks $\theta$ is. Two consequences:

- **Uniform prior ⇒ MAP = MLE** (the prior term is constant), as long as the MLE lies inside the prior's range. If it doesn't, the MAP gets clipped to the edge of the prior's support.
- **As $n\to\infty$**, $\ln L$ is a sum of $n$ terms while $\ln f_\Theta$ is fixed, so the likelihood dominates and MAP $\to$ MLE.

**For a discrete $\Theta$** (finitely many candidate values), MAP is just "compute likelihood × prior for each candidate and pick the largest". That's how hypothesis-testing-style problems (HW 12 P2, P4, P5, Tutorial 12 Q1) work.

## Slide 52: MAP for Example 2 (Gaussian)

The posterior is Gaussian, and a Gaussian's peak is at its mean, so

$$
\hat\theta_{MAP} = \frac{\sum_{i=1}^n x_i + \mu_0}{n+1}
$$

(again, $n+1$, not $n$ as the slide says).

**Slide HW: is it the same as the MLE?** No. $\hat\theta_{ML} = \bar x = \frac{\sum x_i}{n}$, while the MAP mixes in $\mu_0$. They're equal only in the special case $\mu_0 = \bar x$. The difference is

$$
\hat\theta_{MAP} - \hat\theta_{ML} = \frac{\mu_0 - \bar x}{n+1} \to 0,
$$

so they agree in the limit, exactly as argued above. The MAP is "shrunk" a little towards the prior mean.

## Slide 53: the conditional expectation (CE) estimator

The other natural one-number summary is the **mean** of the posterior:

$$
\boxed{\hat\theta_{CE} = E[\Theta\mid X = x] = \int \theta f_{\Theta\mid X}(\theta\mid x)\,d\theta}
$$

(It's also called the LMS or MMSE estimator, because of the next fact.)

**Why it's special: it minimises the mean squared error** (that's last year's HW 12 P9). For any guess $g(x)$:

$$
E\big[(\Theta - g(x))^2 \mid X = x\big] = \text{Var}(\Theta\mid X=x) + \big(E[\Theta\mid X=x] - g(x)\big)^2,
$$

(same bias–variance identity as slide 8, applied to the posterior). The first term doesn't depend on $g$, and the second is $\ge 0$ with equality iff $g(x) = E[\Theta\mid X=x]$. So the CE estimator is the best possible guess in mean-squared-error terms. The minimum achievable error is the posterior variance.

### Slide 53 HW: $\hat\theta_{CE}$ for all the previous examples (plus MAP and MLE)

| Example | Posterior | $\hat\theta_{MLE}$ | $\hat\theta_{MAP}$ (mode) | $\hat\theta_{CE}$ (mean) |
|---|---|---|---|---|
| Beta prior, $k$ heads in $n$ | Beta$(\alpha+k,\ \beta+n-k)$ | $\dfrac kn$ | $\dfrac{\alpha+k-1}{\alpha+\beta+n-2}$ | $\dfrac{\alpha+k}{\alpha+\beta+n}$ |
| … with uniform prior | Beta$(k+1,\ n-k+1)$ | $\dfrac kn$ | $\dfrac kn$ | $\dfrac{k+1}{n+2}$ |
| Gaussian, prior $\mathcal N(\mu_0,\sigma^2)$ | $\mathcal N\big(\frac{\sum x_i+\mu_0}{n+1}, \frac{\sigma^2}{n+1}\big)$ | $\bar x$ | $\dfrac{\sum x_i + \mu_0}{n+1}$ | $\dfrac{\sum x_i + \mu_0}{n+1}$ |
| Gamma prior, one Poisson count $x$ | Gamma$(\alpha + x,\ 1 + \beta)$ | $x$ | $\dfrac{\alpha + x - 1}{1+\beta}$ | $\dfrac{\alpha + x}{1+\beta}$ |
| Gamma prior, $n$ Poisson counts | Gamma$(\alpha + \sum x_i,\ \beta + n)$ | $\bar x$ | $\dfrac{\alpha + \sum x_i - 1}{\beta + n}$ | $\dfrac{\alpha + \sum x_i}{\beta + n}$ |

(The Beta MAP needs $\alpha + k > 1$ and $\beta + n - k > 1$ so the peak is interior; the Gamma MAP needs $\alpha + x \ge 1$.)

**Patterns to notice:**

- For the Gaussian, **MAP = CE**, because a Gaussian is symmetric, so its peak and its mean coincide.
- For Beta and Gamma, the posterior is skewed, so MAP $\ne$ CE. The mode always has that "$-1$" and the mean doesn't.
- With a uniform prior, MAP = MLE, but CE is still different (Laplace's $\frac{k+1}{n+2}$).
- In every case all three estimators converge to the same thing as $n\to\infty$.

---

# Part 6 — Linear regression (slides 1–36)

> **Endsem syllabus.** Only **slides 1–36** of `linear_regression.pdf` are examinable: the model, least squares, the intercept and slope, least squares as the Gaussian MLE, the MLE of $\sigma^2$, and the Laplace / least-absolute-deviations slide. **Slides 37–56 are NOT in the syllabus** (bias and MSE of $\hat\beta_0, \hat\beta_1$, the Bayesian view, the MAP estimate, and the posterior / CE estimate), so they're left out here.

The PDF has 56 pages because each slide builds up over several pages. Page ranges below are the PDF page numbers, so you can find each one quickly. The good news is that this deck is a reunion: least squares is just MLE from L22 applied to a line.

## The model (slides 1–6)

You get data pairs $\mathcal D = \{(x_i, y_i)\}_{i=1}^n$, for example hours studied and marks. The model is

$$
Y_i = \beta_0^* + \beta_1^* x_i + \varepsilon_i,
$$

where $\beta_0^*$ (intercept) and $\beta_1^*$ (slope) are unknown. They are our $\theta^*$. The noise terms $\varepsilon_1,\dots,\varepsilon_n$ are i.i.d., independent of the $x_i$, with $E[\varepsilon_i] = 0$ and $\text{Var}(\varepsilon_i) = \sigma^2$.

So at each $x_i$, $Y_i$ is a random variable centred on the line:

$$
E[Y_i \mid X_i = x_i] = \beta_0^* + \beta_1^* x_i, \qquad \text{Var}(Y_i \mid X_i = x_i) = \sigma^2 .
$$

The picture on the slide shows this: a little distribution (blue) sitting on the line at every $x_i$, and the data point (red) is one draw from each.

## Least squares (slides 7–11)

For a candidate line $\beta_0 + \beta_1 x$, the **residual** of point $i$ is

$$
e_i = y_i - \beta_0 - \beta_1 x_i ,
$$

the vertical gap between the point and the line. We want all residuals small together, so we add up their squares:

$$
J(\beta_0,\beta_1) = \sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y_i - \beta_0 - \beta_1 x_i)^2 .
$$

The **least squares estimates** $(\hat\beta_0, \hat\beta_1)$ are the values that minimise $J$.

## The intercept (slides 12–15)

Write $\bar x = \frac1n\sum x_i$ and $\bar y = \frac1n\sum y_i$. Two facts you'll use constantly:

$$
\sum_{i=1}^n (x_i - \bar x) = 0, \qquad \sum_{i=1}^n (y_i - \bar y) = 0 .
$$

Set both partial derivatives of $J$ to zero:

$$
\frac{\partial J}{\partial \beta_0} = -2\sum_{i=1}^n (y_i - \beta_0 - \beta_1 x_i) = 0, \qquad
\frac{\partial J}{\partial \beta_1} = -2\sum_{i=1}^n x_i (y_i - \beta_0 - \beta_1 x_i) = 0 .
$$

Divide the first equation by $-2n$:

$$
\bar y - \beta_0 - \beta_1 \bar x = 0 \quad\Longrightarrow\quad \beta_0 = \bar y - \beta_1 \bar x .
$$

**Reading it.** The fitted line always passes through the point $(\bar x, \bar y)$.

## The slope (slides 16–20)

Substitute $\beta_0 = \bar y - \beta_1\bar x$ into the second equation. It becomes

$$
\sum_{i=1}^n x_i c_i = 0, \qquad \text{where } c_i = (y_i - \bar y) - \beta_1 (x_i - \bar x).
$$

Now the trick on the slide. The $c_i$ add up to zero, because both brackets do:

$$
\sum_i c_i = \sum_i (y_i - \bar y) - \beta_1 \sum_i (x_i - \bar x) = 0, \qquad\text{so}\qquad \sum_i \bar x\, c_i = 0 .
$$

Subtract this from $\sum_i x_i c_i = 0$:

$$
\sum_{i=1}^n (x_i - \bar x)\, c_i = 0
\quad\Longrightarrow\quad
\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y) = \beta_1 \sum_{i=1}^n (x_i - \bar x)^2 .
$$

With $S_{xx} = \sum_i (x_i - \bar x)^2$ and $S_{xy} = \sum_i (x_i - \bar x)(y_i - \bar y)$:

$$
\boxed{\hat\beta_1 = \frac{S_{xy}}{S_{xx}}, \qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x}
$$

**Handy forms for calculation.** $S_{xx} = \sum x_i^2 - n\bar x^2$ and $S_{xy} = \sum x_i y_i - n\bar x\bar y$. These are much quicker with numbers.

## Least squares is the MLE under Gaussian noise (slides 21–26)

Now assume $\varepsilon_i \sim \mathcal N(0, \sigma^2)$ i.i.d. Then $Y_1,\dots,Y_n$ are independent with $Y_i \sim \mathcal N(\beta_0^* + \beta_1^* x_i, \sigma^2)$. The likelihood is

$$
L(y_1,\dots,y_n;\beta_0,\beta_1) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\Big(-\frac{(y_i - \beta_0 - \beta_1 x_i)^2}{2\sigma^2}\Big),
$$

and taking logs,

$$
\ln L = -\frac n2 \ln(2\pi\sigma^2) - \frac{1}{2\sigma^2} J(\beta_0, \beta_1).
$$

The first term doesn't involve $(\beta_0, \beta_1)$, and $\frac{1}{2\sigma^2} > 0$. So maximising $\ln L$ is the same as minimising $J$:

$$
\boxed{(\hat\beta_0, \hat\beta_1)_{ML} = \arg\max_{\beta_0,\beta_1} \ln L = \arg\min_{\beta_0,\beta_1} J(\beta_0,\beta_1)}
$$

giving $\hat\beta_{1,ML} = S_{xy}/S_{xx}$ and $\hat\beta_{0,ML} = \bar y - \hat\beta_{1,ML}\bar x$. It's the same thing we saw for the normal mean in Part 3 (maximising the Gaussian likelihood minimises a sum of squares), now with a line instead of a single number.

## MLE of the noise variance (slides 27–31)

If $\sigma^2$ is unknown too, the log likelihood is the same expression with $\sigma^2$ as a third parameter:

$$
\ln L(\beta_0,\beta_1,\sigma^2) = -\frac n2 \ln(2\pi\sigma^2) - \frac{1}{2\sigma^2} J(\beta_0, \beta_1).
$$

For **every** fixed $\sigma^2$, the best $(\beta_0, \beta_1)$ is still $(\hat\beta_0, \hat\beta_1)$, since $\sigma^2$ only scales $J$. So plug those in and maximise over $\sigma^2$:

$$
\frac{\partial \ln L}{\partial \sigma^2} = -\frac{n}{2\sigma^2} + \frac{J(\hat\beta_0,\hat\beta_1)}{2\sigma^4} = 0
\quad\Longrightarrow\quad
\boxed{\hat\sigma^2_{ML} = \frac{J(\hat\beta_0,\hat\beta_1)}{n} = \frac1n \sum_{i=1}^n e_i^2}, \qquad e_i = y_i - \hat\beta_0 - \hat\beta_1 x_i .
$$

Like the divide-by-$n$ sample variance, this is **biased**. The slide states (without proof) that $\frac{1}{n-2}\sum_i e_i^2$ is unbiased. The intuition is the same as $n - 1$ before: we estimated two parameters from the data, so we lose two degrees of freedom.

## A different noise model gives a different loss (slides 32–36)

Suppose the noise is **Laplace** instead: $f_\varepsilon(e) = \frac{1}{2b} e^{-|e|/b}$. Then

$$
\ln L = -n\ln(2b) - \frac1b \sum_{i=1}^n |e_i|, \qquad e_i = y_i - \beta_0 - \beta_1 x_i ,
$$

so the MLE minimises $\sum_i |e_i|$. That's **least absolute deviations (LAD)**.

The takeaway is that **the noise model decides the loss**: Gaussian noise gives squared error, Laplace noise gives absolute error. On the slide's picture with one outlier, squaring punishes the outlier heavily and drags the least squares line towards it, while LAD stays with the rest of the data. It's the mean-vs-median story again.

## Worked problems

### Problem 1 [Least squares with numbers]

Fit $y = \beta_0 + \beta_1 x$ by least squares to the points $(1, 2), (2, 3), (3, 5), (4, 6)$. Then give $\hat\sigma^2_{ML}$ and the unbiased estimate of $\sigma^2$.

**Solution.** $n = 4$, $\bar x = 2.5$, $\bar y = 4$. Deviations: $x_i - \bar x = -1.5, -0.5, 0.5, 1.5$ and $y_i - \bar y = -2, -1, 1, 2$. So

$$
S_{xx} = 2.25 + 0.25 + 0.25 + 2.25 = 5, \qquad S_{xy} = 3 + 0.5 + 0.5 + 3 = 7 .
$$

$$
\hat\beta_1 = \frac{7}{5} = 1.4, \qquad \hat\beta_0 = 4 - 1.4 \times 2.5 = 0.5 .
$$

Fitted values are $1.9, 3.3, 4.7, 6.1$, so the residuals are $e_i = 0.1, -0.3, 0.3, -0.1$, and $\sum e_i^2 = 0.01 + 0.09 + 0.09 + 0.01 = 0.2$. Then

$$
\hat\sigma^2_{ML} = \frac{0.2}{4} = 0.05, \qquad \frac{0.2}{n - 2} = \frac{0.2}{2} = 0.1 .
$$

Check: the residuals add up to 0, as they must (that's the $\partial J/\partial\beta_0 = 0$ equation).

### Problem 2 [Regression through the origin]

Suppose the model has no intercept: $Y_i = \beta x_i + \varepsilon_i$ with $\varepsilon_i \sim \mathcal N(0, \sigma^2)$ i.i.d. Find the MLE of $\beta$.

**Solution.** As on slide 26, $\ln L = -\frac n2\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_i (y_i - \beta x_i)^2$, so the MLE minimises $J(\beta) = \sum_i (y_i - \beta x_i)^2$.

$$
\frac{dJ}{d\beta} = -2\sum_i x_i (y_i - \beta x_i) = 0 \quad\Longrightarrow\quad \hat\beta_{ML} = \frac{\sum_i x_i y_i}{\sum_i x_i^2} .
$$

$J''(\beta) = 2\sum x_i^2 > 0$, so this is a minimum. Note it is **not** $S_{xy}/S_{xx}$: without an intercept the line is forced through the origin, not through $(\bar x, \bar y)$.

### Problem 3 [Which loss does the MLE use?]

The noise is i.i.d. with pdf $f_\varepsilon(e) = \frac{1}{2b}e^{-|e|/b}$. Write down the log likelihood for $(\beta_0, \beta_1)$ and say what the MLE minimises. Why might you prefer it to least squares?

**Solution.** $\ln L = \sum_i \ln\big(\frac{1}{2b} e^{-|y_i - \beta_0 - \beta_1 x_i|/b}\big) = -n\ln(2b) - \frac1b\sum_i |y_i - \beta_0 - \beta_1 x_i|$. The first term is constant and $\frac1b > 0$, so the MLE minimises $\sum_i |e_i|$ (least absolute deviations). It's preferable when the data has outliers: an absolute value grows linearly, so one far-off point can't drag the line the way a squared residual can.

## Likely exam questions

- "Derive the least squares estimates $\hat\beta_0, \hat\beta_1$." (slides 12–20)
- "Show that least squares is the MLE when the noise is Gaussian." (slides 21–26)
- "Find the MLE of $\sigma^2$." (slides 27–31)
- "What does the MLE minimise under Laplace noise?" (slides 32–36)
- A numerical fit like Problem 1.

---

# Part 7 — Worked practice problems

These are from last year's HW 11, HW 12, Tutorial 11, Tutorial 12 and Endsem (the source is in brackets). Try each one before reading the solution: even just writing the likelihood or the posterior kernel yourself is most of the work.

## A. Bias, MSE, consistency

### Problem 1 [HW 11 Q1]

$X_1,\dots,X_n$ i.i.d. with pdf $f_X(x) = \theta\big(x - \tfrac12\big) + 1$ on $[0,1]$, $\theta\in[-2,2]$. Estimator: $\hat\Theta_n = 12\bar X - 6$. Is it unbiased? Consistent? What's the MSE?

**Solution.** First, the moments of one $X$:

$$
E[X] = \int_0^1 x\Big(\theta\big(x - \tfrac12\big) + 1\Big)dx = \theta\Big(\frac13 - \frac14\Big) + \frac12 = \frac{\theta}{12} + \frac12.
$$

So $E[\hat\Theta_n] = 12\big(\frac{\theta}{12} + \frac12\big) - 6 = \theta$. **Unbiased.**

For the variance:

$$
E[X^2] = \theta\Big(\frac14 - \frac16\Big) + \frac13 = \frac{\theta}{12} + \frac13, \qquad \text{Var}(X) = \frac{\theta}{12} + \frac13 - \Big(\frac{\theta}{12} + \frac12\Big)^2 = \frac{1}{12} - \frac{\theta^2}{144}.
$$

Then

$$
\text{MSE}(\hat\Theta_n) = \text{Var}(12\bar X) = \frac{144\,\text{Var}(X)}{n} = \frac{12 - \theta^2}{n}.
$$

This $\to 0$, so **consistent** (by the MSE theorem from slide 14).

### Problem 2 [HW 11 Q3]

$X_i$ i.i.d. with mean $\mu$ and variance $\sigma^2$. Is $\hat\mu_{B,n} = \frac1n\sum_{i=1}^n\big(1 + \frac1i\big)X_i$ consistent?

**Solution.** Use the MSE recipe: bias $\to0$ and variance $\to0$.

*Bias.* By linearity,
$$
E[\hat\mu_{B,n}] = \frac{1}{n}\sum_{i=1}^n\Big(1 + \frac1i\Big)\mu = \frac{\mu}{n}\Big(n + H_n\Big) = \mu\Big(1 + \frac{H_n}{n}\Big),
$$
where $H_n = 1 + \frac12 + \dots + \frac1n \approx \ln n$. So $B = \mu H_n/n \to 0$, since $\ln n$ grows much slower than $n$.

*Variance.* The $X_i$ are independent, so the variances add, with each weight squared:
$$
\text{Var}(\hat\mu_{B,n}) = \frac{\sigma^2}{n^2}\sum_{i=1}^n\Big(1 + \frac1i\Big)^2 \le \frac{\sigma^2}{n^2}\cdot 4n = \frac{4\sigma^2}{n} \to 0,
$$
using $1 + \frac1i\le2$, so each squared weight is at most 4.

So $\text{MSE}\to 0$, and it's **consistent** (just biased for every finite $n$). The plain sample mean is consistent too, of course.

### Problem 3 [Tutorial 11 Q5] (hard)

$X_i \sim \mathcal N(\mu,\sigma^2)$, both unknown, $n \ge 2$. (a) Show $\hat\sigma^2_{ML}$ is biased. (b) Fix it. (c) Among estimators $c\,\hat\sigma^2_{ML}$, which $c$ minimises the MSE? (You may use: $W = \sum(X_i - \bar X)^2$ satisfies $E[W] = (n-1)\sigma^2$ and $\text{Var}(W) = 2(n-1)\sigma^4$ for normal data.)

**Solution.** (a) $\hat\sigma^2_{ML} = W/n$, so $E = \frac{n-1}{n}\sigma^2 \ne \sigma^2$. (b) $\frac{n}{n-1}\hat\sigma^2_{ML} = W/(n-1)$ is unbiased.

(c) Write the estimator as $aW$ (with $a = c/n$). Then

$$
\text{MSE}(aW) = a^2\,\text{Var}(W) + \big(aE[W] - \sigma^2\big)^2 = \sigma^4\Big[2(n-1)a^2 + \big((n-1)a - 1\big)^2\Big].
$$

Differentiate in $a$ and set to zero:

$$
4(n-1)a + 2(n-1)\big((n-1)a - 1\big) = 0 \implies 2a + (n-1)a = 1 \implies a = \frac{1}{n+1}.
$$

So the best estimator divides by $n+1$, i.e. $c = \frac{n}{n+1}$. Neither the MLE ($n$) nor the unbiased one ($n-1$) wins on MSE! Same lesson as the Uniform table: a bit of bias can buy a lot of variance reduction.

## B. Maximum likelihood

### Problem 4 [HW 11 Q2]

$X_1,\dots,X_4$ i.i.d. Geometric$(p)$ with $P(X = x) = p(1-p)^{x-1}$. Observed $(2, 3, 3, 5)$. Find the likelihood and the MLE.

**Solution.**

$$
L(p) = \prod p(1-p)^{x_i - 1} = p^4(1-p)^{\sum x_i - 4} = p^4(1-p)^9.
$$

$\ln L = 4\ln p + 9\ln(1-p)$, so $\frac4p = \frac{9}{1-p}$, giving $\hat p = \frac{4}{13}$. In general, $\hat p = \frac{n}{\sum x_i} = \frac{1}{\bar x}$. (Mean of a geometric is $1/p$, so this is the "invert the sample mean" pattern again.)

### Problem 5 [Endsem Q5]

$x_1,\dots,x_n$ i.i.d. Uniform$[a,b]$, both unknown. Find the MLEs.

**Solution.**

$$
L(a,b) = \begin{cases}(b-a)^{-n} & a \le \min x_i \text{ and } b \ge \max x_i \\ 0 & \text{otherwise.}\end{cases}
$$

$(b-a)^{-n}$ gets bigger as the interval $[a,b]$ gets *shorter*, but the interval must contain all the data. So make it as short as possible while still covering the data:

$$
\hat a_{ML} = \min_i x_i, \qquad \hat b_{ML} = \max_i x_i.
$$

(For full marks, say explicitly that $\partial \ln L/\partial a = \frac{n}{b-a} > 0$, so $\ln L$ increases in $a$ up to the boundary $\min x_i$, and similarly decreases in $b$ down to $\max x_i$.)

### Problem 6 [HW 11 Q10] (tricky)

$X_i$ i.i.d. Uniform$[\theta, \theta+1]$. Find an MLE of $\theta$. Is it unique? Unbiased? Consistent?

**Solution.** $L(\theta) = 1$ if every $x_i \in[\theta,\theta+1]$, i.e. if

$$
\max_i x_i - 1 \le \theta \le \min_i x_i,
$$

and $0$ otherwise. So $L$ is **flat** on a whole interval: *every* $\theta$ in $[\max x_i - 1, \min x_i]$ is an MLE. **The MLE is not unique.**

Take $\hat\theta = \min_i X_i$. Each $X_i = \theta + U_i$ with $U_i\sim\mathcal U[0,1]$, so $\min X_i = \theta + \min U_i$. For the min of $n$ uniforms, $P(\min U_i>t) = (1-t)^n$, so $E[\min U_i] = \int_0^1(1-t)^n\,dt = \frac{1}{n+1}$. So $E[\hat\theta] = \theta + \frac{1}{n+1}$: **biased, but asymptotically unbiased**. And $P(\hat\theta - \theta \ge \epsilon) = (1 - \epsilon)^n \to 0$, so it's **consistent**. (Picking $\max X_i - 1$ gives bias $-\frac{1}{n+1}$; the midpoint $\frac{\min X_i + \max X_i - 1}{2}$ is unbiased by symmetry.)

### Problem 7 [Tutorial 11 Q8] (subtle)

$X_i$ i.i.d. Binomial$(m, \theta)$, $m$ known, $\theta\in(0,1)$. (a) Find the MLE of $\theta$. (b) Does the MLE of $1/\theta$ exist?

**Solution.** (a) $\ln L = \big(\sum x_i\big)\ln\theta + \big(nm - \sum x_i\big)\ln(1-\theta) + C$. This is the Bernoulli calculation with $nm$ trials in total and $\sum x_i$ successes, so $\hat\theta = \frac{\sum x_i}{nm} = \frac{\bar x}{m}$.

(b) If *all* $x_i = 0$ (which has positive probability), then $L(\theta) = (1-\theta)^{nm}$, which increases as $\theta \downarrow 0$. But $\theta = 0$ isn't in the parameter space $(0,1)$, so the supremum is never attained: **the MLE of $\theta$ doesn't exist** for that data, and neither does the MLE of $1/\theta$. (Whenever $\sum x_i > 0$, invariance gives $\widehat{1/\theta} = \frac{m}{\bar x}$.) The point: always check the maximiser lies in the allowed range.

### Problem 8 [Endsem Q6]

$X_i$ i.i.d. Poisson$(\gamma)$. Find the MLE, its bias and MSE.

**Solution.** From slide 30, $\hat\gamma = \bar X$. Check the second derivative: $-\sum x_i/\gamma^2 < 0$ (if $\sum x_i > 0$), so it's a max. $E[\bar X] = \gamma$, so the bias is $0$, and $\text{MSE} = \text{Var}(\bar X) = \gamma/n$.

### Problem 9 [HW 11 Q5]

One observation $X \sim\mathcal N(0,\sigma^2)$. (a) Find an unbiased estimator of $\sigma^2$. (b) Write the log-likelihood. (c) Find the MLE of $\sigma$.

**Solution.** (a) $E[X^2] = \text{Var}(X) = \sigma^2$, so $X^2$ is unbiased.

(b) $\ln L(\sigma) = -\frac12\ln(2\pi) - \ln\sigma - \frac{x^2}{2\sigma^2}$.

(c) $\frac{d}{d\sigma}\ln L = -\frac1\sigma + \frac{x^2}{\sigma^3} = 0 \implies \hat\sigma = |x|$. (Not $x$: $\sigma > 0$.)

## C. Bayesian, MAP and CE

### Problem 10 [Tutorial 12 Q1] — discrete prior

A coin is Type A ($P(H) = 0.25$) or Type B ($P(H) = 0.75$), each with prior $\frac12$. You see HHT. Find $P(\text{A}\mid\text{HHT})$ and the MAP estimate of $P(H)$.

**Solution.**

$$
P(\text{HHT}\mid A) = 0.25^2\cdot0.75 = \frac{3}{64}, \qquad P(\text{HHT}\mid B) = 0.75^2\cdot 0.25 = \frac{9}{64}.
$$

The priors are equal, so they cancel:

$$
P(A\mid\text{HHT}) = \frac{3/64}{3/64 + 9/64} = \frac14.
$$

MAP picks Type B, so $\hat p_{MAP} = 0.75$.

### Problem 11 [Tutorial 12 Q2]

Prior $p\sim\mathcal U[0,1]$. One observation $y = 3$ from Geometric$(p)$. Find the full posterior, then the MAP and CE.

**Solution.** Posterior $\propto p(1-p)^2\cdot 1$, which is the Beta$(2,3)$ kernel. The normaliser is $B(2,3) = \frac{1!\,2!}{4!} = \frac{1}{12}$, so

$$
f(p\mid y=3) = 12\,p(1-p)^2, \quad 0 \le p \le 1.
$$

MAP: the Beta mode is $\frac{2-1}{2+3-2} = \frac13$. (Or differentiate: $(1-p)^2 - 2p(1-p) = 0 \Rightarrow p = \frac13$.) This equals the MLE $1/y = \frac13$, as it should with a flat prior.

CE: the Beta mean is $\frac{2}{5}$.

### Problem 12 [Tutorial 12 Q3] — Gaussian, unequal variances

Unknown mean $\mu$; one observation $x \sim\mathcal N(\mu, 1)$. Prior $\mu\sim\mathcal N(10, 1)$. You observe $x_1 = 12$. Posterior?

**Solution.** Precisions add: $\frac{1}{\sigma^2_{\text{post}}} = \frac11 + \frac11 = 2$, so $\sigma^2_{\text{post}} = \frac12$. Mean: $\frac12\big(\frac{10}{1} + \frac{12}{1}\big) = 11$.

$$
\mu\mid x_1 = 12 \ \sim\ \mathcal N\Big(11,\ \frac12\Big).
$$

The prior and the single measurement are equally reliable, so the answer is halfway between them.

### Problem 13 [Tutorial 12 Q4] — Gamma–Poisson with data

$X_i \sim$ Poisson$(\lambda)$ i.i.d., prior Gamma$(2, 1)$. Three observations: $2, 3, 4$. Find the posterior, MAP and CE.

**Solution.** $\sum x_i = 9$, $n = 3$, so the posterior is Gamma$(2 + 9,\ 1 + 3) = \text{Gamma}(11, 4)$.

$$
\hat\lambda_{MAP} = \frac{11 - 1}{4} = 2.5, \qquad \hat\lambda_{CE} = \frac{11}{4} = 2.75.
$$

Compare with the MLE $\bar x = 3$: the prior (mean 2) pulls the estimate down a bit. Check via the weighted-average formula: $\frac{1}{4}\cdot 2 + \frac34\cdot 3 = 2.75$. ✓

### Problem 14 [Tutorial 12 Q6]

Prior $f_X(x) = 3x^2$ on $[0,1]$, and $Y\mid X = x \sim$ Geometric$(x)$. Find the MAP of $X$ given $Y = 5$.

**Solution.** Posterior $\propto 3x^2\cdot x(1-x)^4 \propto x^3(1-x)^4$ (a Beta$(4,5)$ kernel). Maximise $3\ln x + 4\ln(1-x)$:

$$
\frac3x = \frac{4}{1-x} \implies \hat x_{MAP} = \frac37.
$$

### Problem 15 [HW 12 P1] — truncated prior

$X_i$ are Exp$(\Theta)$. Prior: $f_\Theta(\theta) = 10\theta$ on $[0, 1/\sqrt5]$. (a) One observation, $x = 30$. Find the posterior, MAP and CE. (b) Five observations: 30, 25, 15, 40, 20. Same questions.

**Solution.** (a) Posterior $\propto 10\theta\cdot\theta e^{-30\theta} \propto \theta^2 e^{-30\theta}$ on $[0, 1/\sqrt5]$, normalised by $c = \int_0^{1/\sqrt5}\theta^2 e^{-30\theta}\,d\theta$.

MAP: $\frac{d}{d\theta}(2\ln\theta - 30\theta) = \frac2\theta - 30 = 0 \Rightarrow \theta = \frac1{15}$. That's inside $[0, 0.447]$, so $\hat\theta_{MAP} = \frac{1}{15}\approx 0.067$.

CE: $\frac{\int_0^{1/\sqrt5}\theta^3e^{-30\theta}d\theta}{\int_0^{1/\sqrt5}\theta^2 e^{-30\theta}d\theta}$. Without the truncation, this would be the mean of a Gamma$(3, 30)$, i.e. $\frac{3}{30} = 0.1$. The cut at $0.447$ is far out in the tail ($30 \times 0.447 \approx 13$), so it barely matters: numerically $\hat\theta_{CE}\approx 0.0999$.

(b) $\sum x_i = 130$, $n = 5$. Posterior $\propto \theta\cdot\theta^5 e^{-130\theta} = \theta^6e^{-130\theta}$ on the same range. MAP $= \frac{6}{130} = \frac{3}{65}\approx 0.046$. CE $\approx \frac{7}{130}\approx 0.054$.

The lesson: a truncated prior just restricts the support. Find the unrestricted peak, and check that it lands inside the allowed range.

### Problem 16 [HW 12 P3] (hard) — triangular prior

$\Theta$ has the triangular prior $f_\Theta(\theta) = 2 - 4\big|\tfrac12 - \theta\big|$ on $[0,1]$. You see $k$ heads in $n$ tosses. Find the MAP.

**Solution.** The prior is $4\theta$ on $[0,\frac12]$ and $4(1-\theta)$ on $[\frac12, 1]$. So the posterior is, up to a constant,

$$
g(\theta) = \begin{cases}\theta^{k+1}(1-\theta)^{n-k} & 0\le\theta\le\frac12 \\ \theta^k(1-\theta)^{n-k+1} & \frac12\le\theta\le1\end{cases}
$$

(It's continuous at $\frac12$.) Each piece is a Beta-shaped bump:

- the left piece peaks at $\frac{k+1}{n+1}$,
- the right piece peaks at $\frac{k}{n+1}$.

Now three cases:

1. If $\frac{k+1}{n+1}\le\frac12$ (i.e. $k \le \frac{n-1}{2}$), the left peak is inside its piece. The right piece is decreasing on $[\frac12,1]$ (its peak $\frac{k}{n+1}$ is even further left). So $\hat\theta_{MAP} = \frac{k+1}{n+1}$.
2. If $\frac{k}{n+1}\ge\frac12$ (i.e. $k\ge\frac{n+1}{2}$), by symmetry $\hat\theta_{MAP} = \frac{k}{n+1}$.
3. Otherwise ($k = \frac n2$, $n$ even), the left piece is increasing all the way to $\frac12$ and the right piece is decreasing from $\frac12$, so $\hat\theta_{MAP} = \frac12$.

Intuition: compared with the MLE $\frac kn$, the prior nudges the estimate towards $\frac12$.

### Problem 17 [HW 12 P5] — MAP as a decision rule

Box 1 has 1 black, 2 white balls; box 2 has 2 black, 1 white. You pick box 1 with probability $p$, then draw one ball. (a) MAP rule? (b) With $p = \frac12$, probability of error, vs not drawing at all?

**Solution.** (a) Given *black*: compare $p\cdot\frac13$ (box 1) vs $(1-p)\cdot\frac23$ (box 2). Choose box 1 iff $p > \frac23$. Given *white*: compare $p\cdot\frac23$ vs $(1-p)\cdot\frac13$. Choose box 1 iff $p > \frac13$.

(b) With $p = \frac12$: black ⇒ box 2, white ⇒ box 1. Errors happen when you see black from box 1, or white from box 2:

$$
P(\text{error}) = \frac12\cdot\frac13 + \frac12\cdot\frac13 = \frac13.
$$

Without a draw, the best you can do is guess, with error $\frac12$. One ball cuts your error from $\frac12$ to $\frac13$.

### Problem 18 [HW 12 P7] — ML vs MAP for a signal

$X\sim\mathcal N(0,\sigma_X^2)$ is sent, and you receive $Y = aX + bW$, with $W\sim\mathcal N(0,\sigma_W^2)$ independent of $X$. Find the ML and MAP estimates of $X$ given $Y = y$.

**Solution.** Given $X = x$, the only randomness left in $Y$ is $bW$, so $Y\sim\mathcal N(ax, b^2\sigma_W^2)$.

ML: the log-likelihood is $-\frac{(y - ax)^2}{2b^2\sigma_W^2}$ plus a constant. That's largest (zero) when $y = ax$, so $\hat x_{ML} = \frac ya$.

MAP: maximise $-\frac{(y-ax)^2}{2b^2\sigma_W^2} - \frac{x^2}{2\sigma_X^2}$. Differentiate:

$$
\frac{a(y - ax)}{b^2\sigma_W^2} = \frac{x}{\sigma_X^2} \implies \hat x_{MAP} = \frac{a\sigma_X^2}{a^2\sigma_X^2 + b^2\sigma_W^2}\,y.
$$

Sanity checks: if the noise is tiny ($\sigma_W\to0$), MAP $\to y/a$ = ML. If the noise is huge, MAP $\to 0$, the prior mean: you stop trusting the measurement. This is the same shrinkage idea as ridge regression.

### Problem 19 [HW 12 P8] — CE with a uniform prior

$\Theta\sim\mathcal U[4,10]$, and $X = \Theta + U$ with $U\sim\mathcal U[-1,1]$ independent of $\Theta$. Find $E[\Theta\mid X = x]$.

**Solution.** $f_{X\mid\Theta}(x\mid\theta) = \frac12$ if $|x - \theta|\le1$. So the posterior is $\propto \frac16\cdot\frac12$ (a constant) on

$$
\theta\in[4,10]\cap[x-1,\,x+1],
$$

i.e. the posterior is *uniform* on that overlap, and the CE is the midpoint:

$$
E[\Theta\mid X = x] = \begin{cases}\frac{x + 5}{2} & 3\le x\le5 \quad (\text{overlap } [4,\,x+1]) \\ x & 5\le x\le9 \quad (\text{overlap } [x-1,\,x+1]) \\ \frac{x + 9}{2} & 9\le x\le 11 \quad (\text{overlap } [x-1,\,10])\end{cases}
$$

Note the MAP isn't unique here: every point of the overlap is a peak.

### Problem 20 [Endsem Q9]

$x_1,\dots,x_n$ i.i.d. Exp$(\lambda)$, prior Gamma$(\alpha, \beta)$. Find the posterior and the MAP.

**Solution.** From Part 4: posterior Gamma$(\alpha + n,\ \beta + \sum x_i)$. MAP = mode $= \frac{\alpha + n - 1}{\beta + \sum x_i}$. (And for completeness, CE $= \frac{\alpha + n}{\beta + \sum x_i}$; as $n\to\infty$ both $\to\frac{1}{\bar x} = \hat\lambda_{ML}$.)

For the exam, write the posterior derivation the long way like the official solution does (keep the normalising integral and evaluate it with the Gamma function), unless the question says "identify".

## D. More practice: boundary MLEs, bias fixes, Laplace and conjugate priors

These are new problems in the style of this year's quiz: MLEs where the maximum sits on a boundary, correcting a biased estimator, the Laplace distribution, and conjugate posteriors.

### Problem 21 [Uniform(0, θ): MLE, bias and the fix]

$X_1,\dots,X_n$ i.i.d. Uniform$[0,\theta]$. (a) Find the MLE. (b) Find its bias and MSE. (c) Make it unbiased and compare the MSE with that of the moment estimator $2\bar X$.

**Solution.** (a) $L(\theta) = \theta^{-n}$ if $\theta\ge\max_i x_i$, and $0$ otherwise. $\theta^{-n}$ decreases in $\theta$, so take the smallest allowed value:
$$\hat\theta_{ML} = M := \max_iX_i .$$
Setting $\frac{d}{d\theta}\ln L = -\frac n\theta = 0$ has no solution. The maximum is at the boundary, which is the whole point of this kind of question.

(b) $P(M\le m) = (m/\theta)^n$ on $[0,\theta]$, so $f_M(m) = nm^{n-1}/\theta^n$. Then
$$E[M] = \frac{n}{n+1}\theta,\qquad E[M^2] = \frac{n}{n+2}\theta^2,\qquad \text{Var}(M) = \frac{n\theta^2}{(n+1)^2(n+2)} .$$
The bias is $-\frac{\theta}{n+1}$ (it always underestimates, since $M\le\theta$), and
$$\text{MSE}(M) = \text{Var}(M) + \text{bias}^2 = \frac{n\theta^2 + (n+2)\theta^2}{(n+1)^2(n+2)} = \boxed{\frac{2\theta^2}{(n+1)(n+2)}}.$$
(c) $\tilde\theta = \frac{n+1}nM$ is unbiased, with $\text{MSE} = \text{Var}(\tilde\theta) = \frac{(n+1)^2}{n^2}\text{Var}(M) = \frac{\theta^2}{n(n+2)}$.

$2\bar X$ is also unbiased, with $\text{MSE} = 4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n}$.

Both MSEs of $M$ and $\tilde\theta$ shrink like $1/n^2$, far faster than the $1/n$ of $2\bar X$. And for $n\ge2$, $\tilde\theta$ beats $M$, since $\frac{1}{n(n+2)}<\frac{2}{(n+1)(n+2)}$ exactly when $n+1<2n$.

### Problem 22 [Shifted exponential]

$X_i$ i.i.d. with pdf $f(x;\theta) = e^{-(x-\theta)}$ for $x\ge\theta$. Find the MLE of $\theta$, its bias, and an unbiased version.

**Solution.** $L(\theta) = \exp\big(-\sum_i(x_i - \theta)\big) = e^{n\theta - \sum x_i}$, as long as $\theta\le\min_ix_i$, and $0$ otherwise. This **increases** in $\theta$, so push $\theta$ up to the boundary:
$$\hat\theta_{ML} = \min_iX_i .$$
Write $X_i = \theta + E_i$ with $E_i\sim\text{Exp}(1)$. The minimum of $n$ independent Exp(1) variables is Exp$(n)$, so $E[\min_iX_i] = \theta + \frac1n$. The bias is $+\frac1n$, and $\min_iX_i - \frac1n$ is unbiased. The MLE is still consistent: $P(\min X_i - \theta>\epsilon) = e^{-n\epsilon}\to0$.

### Problem 23 [Uniform(−θ, θ)]

$X_i$ i.i.d. Uniform$[-\theta,\theta]$, $\theta>0$. Find the MLE and an unbiased estimator based on it.

**Solution.** $L(\theta) = (2\theta)^{-n}$ when every $|x_i|\le\theta$, and $0$ otherwise. It decreases in $\theta$, so
$$\hat\theta_{ML} = \max_i|X_i| .$$
Each $|X_i|$ is Uniform$[0,\theta]$, so by Problem 21, $E[\max_i|X_i|] = \frac{n}{n+1}\theta$, and $\frac{n+1}n\max_i|X_i|$ is unbiased. A common mistake is $\max_iX_i$, which ignores the negative observations.

### Problem 24 [Laplace location: the MLE is the median]

$X_i$ i.i.d. with pdf $f(x;\theta) = \frac12e^{-|x-\theta|}$. (a) Show the MLE of $\theta$ is a sample median. (b) Compute it for the data $2, 5, 1, 9, 4$. (c) What happens if the 9 is mistyped as 90?

**Solution.** (a) $\ln L(\theta) = -n\ln2 - \sum_i|x_i - \theta|$, so the MLE minimises $g(\theta) = \sum_i|x_i - \theta|$. Away from the data points,
$$g'(\theta) = \#\{i : x_i<\theta\} - \#\{i : x_i>\theta\}.$$
This is negative while fewer than half the points lie below $\theta$ and positive once more than half do. So $g$ is smallest at a median. For odd $n$ it's the middle value. For even $n$ every $\theta$ between the two middle values is an MLE, so the MLE is not unique.

(b) Sorted: $1, 2, 4, 5, 9$, so $\hat\theta = \boxed{4}$. (The mean is $4.2$.)

(c) The median stays $4$, while the mean jumps to $20.4$. This is the same robustness story as least absolute deviations in Part 6.

### Problem 25 [Laplace scale]

$X_i$ i.i.d. with pdf $f(x;b) = \frac1{2b}e^{-|x|/b}$, $b>0$. Find the MLE of $b$, and show it is unbiased. Find its MSE.

**Solution.** $\ln L(b) = -n\ln(2b) - \frac1b\sum_i|x_i|$, so
$$\frac{d}{db}\ln L = -\frac nb + \frac{\sum|x_i|}{b^2} = 0\implies\boxed{\hat b = \frac1n\sum_{i=1}^n|X_i|}.$$
The derivative is positive below $\hat b$ and negative above it, so this is a maximum. $|X_i|$ has pdf $\frac1be^{-y/b}$ on $y\ge0$, i.e. it is exponential with mean $b$ and variance $b^2$. So $E[\hat b] = b$ (unbiased) and $\text{MSE} = \text{Var}(\hat b) = \frac{b^2}n$.

### Problem 26 [A biased plug-in, and its correction]

$X_i$ i.i.d. Bernoulli$(p)$. The MLE of $p$ is $\hat p = \bar X$, so by invariance the MLE of the variance $v = p(1-p)$ is $\hat v = \hat p(1-\hat p)$. Find its bias and an unbiased fix.

**Solution.** $E[\hat p] = p$ and $E[\hat p^2] = \text{Var}(\hat p) + p^2 = \frac{p(1-p)}n + p^2$, so
$$E[\hat v] = p - \frac{p(1-p)}n - p^2 = p(1-p)\Big(1 - \frac1n\Big).$$
The bias is $-\frac{p(1-p)}n$, and
$$\frac{n}{n-1}\hat p(1-\hat p)\quad\text{is unbiased.}$$
This is the same $\frac{n}{n-1}$ correction as for the sample variance. Indeed, with 0/1 data, $\frac1n\sum(X_i - \bar X)^2 = \hat p(1-\hat p)$ exactly. **Invariance gives you the MLE of $g(\theta)$, but not an unbiased one.**

### Problem 27 [Exponential: unbiased for the mean, biased for the rate]

$X_i$ i.i.d. Exp$(\lambda)$. (a) Find the MLEs of $\lambda$, of the mean $\mu = 1/\lambda$, and of $P(X>1)$. (b) Which of the first two is unbiased? Fix the other.

**Solution.** (a) $\ln L = n\ln\lambda - \lambda\sum x_i$ gives $\hat\lambda = 1/\bar X$. By invariance, $\hat\mu = \bar X$ and $\widehat{P(X>1)} = e^{-\hat\lambda} = e^{-1/\bar X}$.

(b) $E[\bar X] = 1/\lambda$, so $\hat\mu$ is unbiased. For $\hat\lambda$, let $S = \sum X_i\sim\text{Gamma}(n,\lambda)$. Then
$$E\Big[\frac1S\Big] = \int_0^\infty\frac1s\cdot\frac{\lambda^ns^{n-1}e^{-\lambda s}}{(n-1)!}\,ds = \frac{\lambda^n(n-2)!}{(n-1)!\,\lambda^{n-1}} = \frac{\lambda}{n-1}\qquad(n\ge2).$$
So $E[\hat\lambda] = E[n/S] = \frac{n}{n-1}\lambda$: biased upwards. The fix is $\frac{n-1}{S} = \frac{n-1}{n\bar X}$. (By Jensen, $E[1/\bar X]>1/E[\bar X]$, so an upward bias was to be expected.)

### Problem 28 [A power-family MLE]

$X_i$ i.i.d. with pdf $f(x;\theta) = \theta x^{\theta-1}$ on $(0,1)$, $\theta>0$. Find the MLE, and evaluate it for the data $0.5, 0.25$.

**Solution.** $\ln L = n\ln\theta + (\theta - 1)\sum\ln x_i$, so
$$\frac n\theta + \sum_i\ln x_i = 0\implies\boxed{\hat\theta = -\frac{n}{\sum_i\ln X_i}}.$$
It's positive because every $\ln x_i<0$. The second derivative is $-n/\theta^2<0$, so it is a maximum. For the data, $\sum\ln x_i = -\ln2 - 2\ln2 = -3\ln2$, so $\hat\theta = \frac{2}{3\ln2}\approx0.962$.

### Problem 29 [Rayleigh]

$X_i$ i.i.d. with pdf $f(x;\sigma) = \frac{x}{\sigma^2}e^{-x^2/(2\sigma^2)}$ for $x\ge0$. Find the MLE of $\sigma^2$. Is it unbiased? (Use $E[X^2] = 2\sigma^2$.)

**Solution.** $\ln L = \sum\ln x_i - 2n\ln\sigma - \frac{\sum x_i^2}{2\sigma^2}$. Then
$$\frac{d}{d\sigma}\ln L = -\frac{2n}\sigma + \frac{\sum x_i^2}{\sigma^3} = 0\implies\boxed{\hat\sigma^2 = \frac{1}{2n}\sum_{i=1}^nX_i^2}.$$
$E[\hat\sigma^2] = \frac{1}{2n}\cdot n\cdot2\sigma^2 = \sigma^2$, so it's unbiased. But $\hat\sigma = \sqrt{\hat\sigma^2}$ (the MLE of $\sigma$, by invariance) is biased low, by Jensen: $E[\sqrt{Y}]<\sqrt{E[Y]}$.

### Problem 30 [Two samples, one parameter]

$X_1,\dots,X_n$ i.i.d. Poisson$(\lambda)$ and, independently, $Y_1,\dots,Y_m$ i.i.d. Poisson$(2\lambda)$. Find the MLE of $\lambda$ and its variance.

**Solution.** The likelihood is the product of both samples' pmfs:
$$\ln L = \Big(\sum x_i\Big)\ln\lambda - n\lambda + \Big(\sum y_j\Big)\ln(2\lambda) - 2m\lambda + C .$$
$$\frac{d}{d\lambda}\ln L = \frac{\sum x_i + \sum y_j}{\lambda} - (n + 2m) = 0\implies\boxed{\hat\lambda = \frac{\sum_iX_i + \sum_jY_j}{n + 2m}}.$$
The numerator is Poisson$\big((n + 2m)\lambda\big)$, so $E[\hat\lambda] = \lambda$ and $\text{Var}(\hat\lambda) = \frac{\lambda}{n + 2m}$. Each $Y$ counts like two $X$'s, which makes sense: it carries twice the rate.

### Problem 31 [Beta–geometric: posterior, MAP, CE and prediction]

Each day a student keeps attempting a problem until they solve it, and the attempt count is Geometric$(p)$: $P(Y = y\mid p) = p(1-p)^{y-1}$ for $y = 1, 2, \dots$. The prior is $p\sim\text{Beta}(2,2)$. Over three days the counts are $3, 1, 4$. (a) Find the posterior. (b) Find the MAP, the CE and the MLE. (c) Find the probability that tomorrow's first attempt succeeds.

**Solution.** (a)
$$f(p\mid y)\propto\underbrace{p^{1}(1-p)^{1}}_{\text{prior}}\cdot\underbrace{p^3(1-p)^{(3+1+4)-3}}_{\text{likelihood}} = p^4(1-p)^6 ,$$
the kernel of $\boxed{\text{Beta}(5,7)}$. In general, the posterior is Beta$(\alpha + n,\ \beta + \sum y_i - n)$.

(b) For Beta$(a,b)$, the mode is $\frac{a-1}{a+b-2}$ and the mean is $\frac{a}{a+b}$. So
$$\hat p_{MAP} = \frac{4}{10} = 0.4,\qquad\hat p_{CE} = \frac5{12}\approx0.417,\qquad\hat p_{ML} = \frac{n}{\sum y_i} = \frac38 = 0.375 .$$
The prior's mean is $\frac12$, so both Bayesian answers are pulled from the MLE towards $\frac12$.

(c) $P(Y_4 = 1\mid\text{data}) = \int_0^1p\,f(p\mid y)\,dp = E[p\mid\text{data}] = \frac5{12}$. The predictive probability is the posterior mean.

### Problem 32 [Gamma–exponential with numbers]

Waiting times are Exp$(\lambda)$, and the prior is $\lambda\sim\text{Gamma}(2,1)$ (shape 2, rate 1). You observe $0.5, 1.5, 1.0$. Find the posterior, the MAP, the CE and the MLE.

**Solution.** Likelihood × prior:
$$\lambda^3e^{-3\lambda}\cdot\lambda^{2-1}e^{-\lambda} = \lambda^{4}e^{-4\lambda},$$
which is $\boxed{\text{Gamma}(5,4)}$, i.e. Gamma$(\alpha + n,\ \beta + \sum x_i)$. The Gamma$(a,b)$ mode is $\frac{a-1}b$ and its mean is $\frac ab$:
$$\hat\lambda_{MAP} = \frac44 = 1,\qquad\hat\lambda_{CE} = \frac54 = 1.25,\qquad\hat\lambda_{ML} = \frac{1}{\bar x} = 1 .$$
Here the MAP happens to equal the MLE. The CE is larger, because the Gamma is right-skewed and its mean sits above its mode.

### Problem 33 [A Bayesian boundary case] (tricky)

$X_1,\dots,X_n$ i.i.d. Uniform$[0,\theta]$, with prior $f(\theta) = \theta^{-2}$ for $\theta\ge1$. Let $m = \max_ix_i$ and $c = \max(1, m)$. Find the posterior, the MAP and the CE.

**Solution.** The likelihood is $\theta^{-n}$ for $\theta\ge m$, and the prior lives on $\theta\ge1$. So
$$f(\theta\mid x)\propto\theta^{-(n+2)}\quad\text{for }\theta\ge c .$$
Normalise: $\int_c^\infty\theta^{-(n+2)}\,d\theta = \frac{c^{-(n+1)}}{n+1}$, so
$$f(\theta\mid x) = (n+1)\,c^{n+1}\,\theta^{-(n+2)},\qquad\theta\ge c .$$
This decreases in $\theta$, so the MAP is at the boundary: $\hat\theta_{MAP} = c = \max(1, m)$. The CE is
$$E[\theta\mid x] = (n+1)c^{n+1}\int_c^\infty\theta^{-(n+1)}\,d\theta = (n+1)c^{n+1}\cdot\frac{c^{-n}}{n} = \boxed{\frac{n+1}{n}\,c}.$$
Compare Problem 21: the CE carries the same $\frac{n+1}{n}$ factor as the unbiased frequentist fix.

### Problem 34 [A biased estimator can win]

$K\sim\text{Binomial}(n,p)$. Compare the MSE of the MLE $K/n$ with that of the uniform-prior CE $\frac{K+1}{n+2}$.

**Solution.** The MLE is unbiased, so its MSE is its variance, $\frac{p(1-p)}n$.

For the CE, $E\big[\frac{K+1}{n+2}\big] = \frac{np+1}{n+2}$, so the bias is $\frac{1-2p}{n+2}$ and the variance is $\frac{np(1-p)}{(n+2)^2}$. Then
$$\text{MSE}_{CE} = \frac{np(1-p) + (1-2p)^2}{(n+2)^2}.$$
At $p = \frac12$ the bias vanishes and $\text{MSE}_{CE} = \frac{n}{4(n+2)^2}<\frac1{4n} = \text{MSE}_{ML}$. At $p = 0$, $\text{MSE}_{CE} = \frac{1}{(n+2)^2}>0 = \text{MSE}_{ML}$. So neither is better for every $p$. The CE trades a little bias for less variance, and wins when $p$ is near the prior's centre. That's the bias–variance tradeoff in one example.

### Problem 35 [MAP with a Laplace prior] (hard)

One observation $X\mid\theta\sim\mathcal N(\theta,1)$, and the prior is $f(\theta) = \frac12e^{-|\theta|}$. Find the MAP estimate as a function of $x$.

**Solution.** Maximise the log posterior, up to constants:
$$g(\theta) = -\frac{(x-\theta)^2}{2} - |\theta| .$$
- On $\theta>0$: $g'(\theta) = x - \theta - 1$, which is zero at $\theta = x - 1$. That is valid only if $x>1$.
- On $\theta<0$: $g'(\theta) = x - \theta + 1$, which is zero at $\theta = x + 1$. That is valid only if $x<-1$.
- If $|x|\le1$: $g$ increases on $\theta<0$ and decreases on $\theta>0$, so the peak is at the kink, $\theta = 0$.

$$\boxed{\hat\theta_{MAP} = \begin{cases}x - 1 & x>1\\ 0 & |x|\le1\\ x + 1 & x<-1\end{cases}}$$
This "soft threshold" shrinks the data towards 0, and sets it exactly to 0 when the data is weak. Compare a Gaussian prior, which shrinks by a constant factor but never gives exactly 0. Notice too that the maximum at a kink can't be found by setting $g' = 0$, just like the boundary MLEs above.

---

# Part 8 — Formula sheet and self-test

## Formula sheet

**Estimator quality**

$$
B(\hat\Theta) = E[\hat\Theta] - \theta^*, \qquad \text{MSE} = E[(\hat\Theta - \theta^*)^2] = \text{Var}(\hat\Theta) + B^2
$$

$$
\text{consistent: } P(|\hat\Theta_n - \theta^*|\ge\epsilon)\to0; \qquad \text{MSE}\to0\ \Rightarrow\ \text{consistent (not conversely)}
$$

$$
\text{Markov: } P(X\ge a)\le\frac{E[X]}{a}\ (X\ge0) \qquad \text{Chebyshev: } P(|X-\mu|\ge\epsilon)\le\frac{\sigma^2}{\epsilon^2}
$$

**Mean and variance**

$$
E[\bar X] = \mu,\quad \text{Var}(\bar X) = \frac{\sigma^2}{n}, \qquad E\Big[\tfrac1n\sum(X_i - \bar X)^2\Big] = \frac{n-1}{n}\sigma^2, \qquad \bar S^2 = \frac{1}{n-1}\sum(X_i - \bar X)^2 \text{ unbiased}
$$

**Uniform$(0,\theta)$, $M = \max X_i$:** $E[M] = \frac{n}{n+1}\theta$, $\text{Var}(M) = \frac{n\theta^2}{(n+1)^2(n+2)}$, $\text{MSE}(M) = \frac{2\theta^2}{(n+1)(n+2)}$, $\frac{n+1}{n}M$ unbiased with MSE $\frac{\theta^2}{n(n+2)}$.

**MLEs**

| Model | MLE |
|---|---|
| Bernoulli$(p)$ | $\bar x$ |
| Binomial$(m,\theta)$, $m$ known | $\bar x/m$ |
| Geometric$(p)$ on $\{1,2,\dots\}$ | $1/\bar x$ |
| Poisson$(\lambda)$ | $\bar x$ |
| Exponential$(\lambda)$ (rate) | $1/\bar x$ |
| $\mathcal N(\mu,\sigma^2)$ | $\hat\mu = \bar x$, $\hat\sigma^2 = \frac1n\sum(x_i - \bar x)^2$ |
| Uniform$(0,\theta)$ | $\max x_i$ |
| Uniform$[a,b]$ | $\min x_i$, $\max x_i$ |
| Binomial$(N, p)$, $N$ unknown, one obs. | $\lfloor x/p\rfloor$ |

**Bayes**

$$
\text{posterior}\propto\text{likelihood}\times\text{prior}, \qquad \hat\theta_{MAP} = \arg\max_\theta\big[\ln L(\theta) + \ln f_\Theta(\theta)\big], \qquad \hat\theta_{CE} = E[\Theta\mid X = x]
$$

| Distribution | Mean | Mode |
|---|---|---|
| Beta$(\alpha,\beta)$ | $\frac{\alpha}{\alpha+\beta}$ | $\frac{\alpha-1}{\alpha+\beta-2}$ |
| Gamma$(\alpha,\beta)$ (rate) | $\frac\alpha\beta$ | $\frac{\alpha-1}{\beta}$ |
| $\mathcal N(m, v)$ | $m$ | $m$ |

Conjugate updates: see the table in Part 5. Gaussian: precisions add, mean is a precision-weighted average.

Useful integrals: $\int_0^1\theta^{a-1}(1-\theta)^{b-1}d\theta = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$, $\int_0^\infty\lambda^{a-1}e^{-b\lambda}d\lambda = \frac{\Gamma(a)}{b^a}$.

## Self-test

Exam-style, roughly in increasing difficulty. Answers are below. Give each one a real attempt first.

1. True or false, with a one-line reason each: (a) every unbiased estimator is consistent; (b) every consistent estimator is asymptotically unbiased; (c) the MLE is always unbiased; (d) with a uniform prior, MAP = MLE.
2. $X\ge0$ with $E[X] = 3$. Give the best bound Markov provides on $P(X\ge12)$. If you also know $\text{Var}(X) = 1$, what does Chebyshev give?
3. $X_1,\dots,X_n$ i.i.d. with pdf $f(x;\theta) = e^{-(x-\theta)}$ for $x\ge\theta$ (a shifted exponential). Find the MLE of $\theta$, its bias, and its MSE. Is it consistent?
4. $X_1,\dots,X_n$ i.i.d. with pdf $f(x;\theta) = \frac{x}{\theta}e^{-x^2/(2\theta)}$, $x>0$ (Rayleigh). Find $\hat\theta_{ML}$. Is it unbiased? (Hint: $E[X^2] = 2\theta$.)
5. A coin with a Beta$(2,2)$ prior on $P(H)$ shows 7 heads in 10 tosses. Find the posterior, then $\hat\theta_{ML}$, $\hat\theta_{MAP}$ and $\hat\theta_{CE}$, and order them.
6. Show that for the Beta–Binomial model, the posterior mean is a weighted average of the prior mean and the MLE, and find the weights.
7. $X_1,\dots,X_n$ are i.i.d. Poisson$(\lambda)$, with a Gamma$(\alpha,\beta)$ prior on $\lambda$. The CE estimate turns out to equal the MLE exactly. What must be true of the data?

### Answers

**1.** (a) False: $X_1$ is unbiased, not consistent. (b) False: the "$\theta^*$ w.p. $1-\frac1n$, $n$ w.p. $\frac1n$" example is consistent but $E\to\theta^* + 1$. (c) False: $\hat\sigma^2_{ML}$ divides by $n$; $\max x_i$ for the uniform. (d) True, as long as the MLE lies in the prior's support (the prior term is a constant there).

**2.** Markov: $P(X\ge12)\le\frac3{12} = \frac14$. Chebyshev: $P(X\ge12)\le P(|X - 3|\ge9)\le\frac{1}{81}$. Knowing the variance helps a lot.

**3.** $L(\theta) = e^{-\sum x_i + n\theta}$ if $\theta\le\min x_i$, else $0$. It's *increasing* in $\theta$, so $\hat\theta = \min x_i$ (another boundary MLE). $\min X_i - \theta\sim\text{Exp}(n)$ (the min of $n$ Exp$(1)$s), so the bias is $\frac1n$ and $\text{MSE} = \frac{1}{n^2} + \frac{1}{n^2} = \frac{2}{n^2}$. MSE $\to0$, so consistent.

**4.** $\ln L = \sum\ln x_i - n\ln\theta - \frac{\sum x_i^2}{2\theta}$; $-\frac n\theta + \frac{\sum x_i^2}{2\theta^2} = 0 \Rightarrow \hat\theta = \frac{\sum x_i^2}{2n}$. $E[\hat\theta] = \frac{n\cdot2\theta}{2n} = \theta$: unbiased. (A rare MLE that's exactly unbiased.)

**5.** Posterior Beta$(9, 5)$. MLE $= 0.7$, MAP $= \frac{8}{12} = 0.667$, CE $= \frac{9}{14} = 0.643$. Order: CE < MAP < MLE. The prior (centred at $\frac12$) pulls everything towards $\frac12$, and the mean gets pulled more than the mode.

**6.** $\frac{\alpha+k}{\alpha+\beta+n} = \frac{\alpha+\beta}{\alpha+\beta+n}\cdot\frac{\alpha}{\alpha+\beta} + \frac{n}{\alpha+\beta+n}\cdot\frac kn$. The prior acts like $\alpha+\beta$ pseudo-observations.

**7.** $\frac{\alpha + \sum x_i}{\beta + n} = \bar x \iff \alpha + n\bar x = \beta\bar x + n\bar x\iff\bar x = \frac\alpha\beta$. The sample mean must equal the prior mean. (That's the weighted-average formula: if both things being averaged are equal, so is the average.)

