---
title: "Probability & Statistics, Quiz 2: Worked Solutions"
subtitle: "All five questions, with the reasoning behind each step"
date: "Monsoon 2026"
---

# How this is laid out

The quiz has four 5-mark questions and one 10-mark question (30 marks in total). Each solution has:

- **The idea**: the one tool that cracks the question, in a sentence or two.
- **The solution**: written the way you'd write it in the exam, with every step justified.
- **Watch out**: the mistakes that cost marks.

Notation follows this year's slides (L14 to L20): $M_X(t) = E[e^{tX}]$, $\xrightarrow{d}$ for convergence in distribution, $\xrightarrow{a.s.}$ for almost sure convergence, $\mathbf Z$ for a standard normal vector, $C_{\mathbf X}$ or $\Sigma$ for a covariance matrix.

| Q | Topic | Lecture | Marks |
|---|---|---|---|
| 1 | Exponential samples to Uniform$[a,b]$ | L15 ($F_X(X)$ is uniform) | 5 |
| 2 | MGF of a sum of two Binomials | L14 (MGFs) | 5 |
| 3 | Binomial$(n,\frac\lambda n) \xrightarrow{d}$ Poisson$(\lambda)$ | L18 (convergence in distribution) | 5 |
| 4 | $X_n = n\mathbf 1\{U_n<\frac1n\}$ does not converge a.s. | L17 (a.s. convergence, Borel–Cantelli) | 5 |
| 5 | pdf of $\mathbf X = A\mathbf Z + \boldsymbol\mu$ | L19, L20 (Jacobian, Gaussian vectors) | 10 |

---

# Question 1: Exponential samples to Uniform$[a,b]$

> *Given access to samples from an exponential random variable with parameter $\lambda$, how will you generate samples from Uniform$[a,b]$?*

## The idea

Plug a continuous random variable into **its own CDF** and you always get a Uniform$(0,1)$ (L15). So turn the exponential sample into a Uniform$(0,1)$ first, then stretch and shift it onto $[a,b]$.

## The procedure

For $X\sim\text{Exp}(\lambda)$ the CDF is $F_X(x) = 1 - e^{-\lambda x}$ for $x\ge 0$.

1. Draw a sample $x$ of $X\sim\text{Exp}(\lambda)$.
2. Compute $u = F_X(x) = 1 - e^{-\lambda x}$.
3. Return $y = a + (b-a)\,u$.

In one line:

$$\boxed{\,Y = a + (b-a)\bigl(1 - e^{-\lambda X}\bigr) \sim \text{Uniform}[a,b]\,}$$

## Why it works

**Step 1: $U = 1 - e^{-\lambda X}$ is Uniform$(0,1)$.**

$X > 0$ with probability 1, so $U$ takes values in $(0,1)$. Fix $u\in(0,1)$. The map $x\mapsto 1 - e^{-\lambda x}$ is strictly increasing, so we can undo it inside the probability:

$$
\begin{aligned}
P(U\le u) &= P\bigl(1 - e^{-\lambda X}\le u\bigr) = P\bigl(e^{-\lambda X}\ge 1 - u\bigr) \\
&= P\bigl(-\lambda X\ge \ln(1-u)\bigr) = P\Bigl(X\le -\tfrac1\lambda\ln(1-u)\Bigr) \\
&= 1 - \exp\Bigl(-\lambda\cdot\bigl(-\tfrac1\lambda\ln(1-u)\bigr)\Bigr) = 1 - (1-u) = u .
\end{aligned}
$$

Also $P(U\le u) = 0$ for $u\le 0$ and $=1$ for $u\ge 1$. That is exactly the Uniform$(0,1)$ CDF.

**Step 2: $Y = a + (b-a)U$ is Uniform$[a,b]$.**

Since $b - a > 0$, for $y\in[a,b]$:

$$P(Y\le y) = P\Bigl(U\le \frac{y-a}{b-a}\Bigr) = \frac{y-a}{b-a},$$

because $\frac{y-a}{b-a}\in[0,1]$. This is the Uniform$[a,b]$ CDF (0 below $a$, 1 above $b$). $\square$

## Watch out

- **Don't start from a uniform.** The whole point is that you only have exponential samples. Inverse transform ($X = F^{-1}(U)$) or accept–reject both *need* a uniform as input, so they get no marks here.
- **Write the justification.** "Use $F_X(X)$" without proving it is uniform usually loses most of the marks.
- $U' = e^{-\lambda X}$ also works, since $e^{-\lambda X} = 1 - U$ and $1-U$ is uniform too.

**Bonus (if $\lambda$ is unknown).** With two independent samples $X_1, X_2\sim\text{Exp}(\lambda)$, the ratio $\frac{X_1}{X_1+X_2}$ is Uniform$(0,1)$ whatever $\lambda$ is. You won't need this, but it's a neat fact.

---

# Question 2: MGF of a sum of two Binomials

> *Derive the MGF of $Z$ where $Z = X + Y$ and $X$ and $Y$ are i.i.d. Binomial$(n,p)$. What is peculiar about the law/distribution of $Z$?*

## The idea

MGFs turn sums of independent variables into **products**. Then the uniqueness theorem (equal MGFs near 0 means equal distributions) lets you name the distribution of $Z$ just by looking at its MGF.

## Step 1: the MGF of $X\sim\text{Binomial}(n,p)$

Write $q = 1 - p$. Using the pmf $P(X=k) = \binom nk p^kq^{n-k}$ for $k = 0,\dots,n$:

$$M_X(t) = E[e^{tX}] = \sum_{k=0}^n e^{tk}\binom nk p^kq^{n-k} = \sum_{k=0}^n\binom nk (pe^t)^k q^{n-k}.$$

This is the binomial theorem $(a+b)^n = \sum_k\binom nk a^kb^{n-k}$ with $a = pe^t$ and $b = q$:

$$\boxed{\,M_X(t) = \bigl(1 - p + pe^t\bigr)^n,\qquad t\in\mathbb R\,}$$

It's a finite sum, so it is finite for **every** real $t$. (Write the domain: marks are often cut for leaving it out.)

*Quick check by another route:* $X$ is a sum of $n$ independent Bernoulli$(p)$ variables, each with MGF $E[e^{tB}] = q + pe^t$. Multiply $n$ of them and you get the same answer.

## Step 2: the MGF of $Z = X + Y$

Because $X$ and $Y$ are independent, $e^{tX}$ and $e^{tY}$ are independent, so the expectation of the product splits:

$$M_Z(t) = E\bigl[e^{t(X+Y)}\bigr] = E\bigl[e^{tX}\bigr]\,E\bigl[e^{tY}\bigr] = M_X(t)\,M_Y(t).$$

Since $X$ and $Y$ have the same distribution, $M_Y = M_X$:

$$\boxed{\,M_Z(t) = \bigl(1 - p + pe^t\bigr)^{2n},\qquad t\in\mathbb R\,}$$

## Step 3: what is peculiar about $Z$

$\bigl(1 - p + pe^t\bigr)^{2n}$ is exactly the MGF of a **Binomial$(2n,p)$**. By the uniqueness theorem,

$$\boxed{\,Z = X + Y\sim\text{Binomial}(2n,\,p)\,}$$

So **the sum is again binomial**: the family is closed under adding independent copies (with the same $p$). The law of $Z$ is of the same type as the laws of $X$ and $Y$, only with $n$ doubled. This is unusual: for most distributions the sum of two independent copies is a new kind of distribution (for example, two Uniforms add up to a triangle).

**Intuition.** $X$ counts successes in $n$ independent trials and $Y$ counts successes in another $n$ independent trials, all with success probability $p$. Together that's $2n$ independent trials, so the total count is Binomial$(2n,p)$.

**Moments for free.** Differentiating $M_Z$ at 0:

$$E[Z] = M_Z'(0) = 2n\,(q+pe^0)^{2n-1}\,p = 2np,\qquad \operatorname{Var}(Z) = 2np(1-p).$$

**Check with the pmf (optional).** By convolution, for $k = 0,\dots,2n$:

$$P(Z = k) = \sum_j\binom nj\binom n{k-j}p^kq^{2n-k} = \binom{2n}{k}p^kq^{2n-k},$$

using Vandermonde's identity $\sum_j\binom nj\binom n{k-j} = \binom{2n}k$. The MGF route is much quicker.

## Watch out

- The same-$p$ condition matters. If $X\sim\text{Bin}(n,p_1)$ and $Y\sim\text{Bin}(m,p_2)$ with $p_1\ne p_2$, then $M_Z(t) = (q_1+p_1e^t)^n(q_2+p_2e^t)^m$, which is not a binomial MGF, so $Z$ is not binomial.
- Independence is what lets $E[e^{tX}e^{tY}]$ split into a product. Say so in your answer.
- Different $n$ but the same $p$ is fine: $\text{Bin}(n,p) + \text{Bin}(m,p) = \text{Bin}(n+m,p)$.

---

# Question 3: Binomial$(n,\frac\lambda n)\xrightarrow{d}$ Poisson$(\lambda)$

> *For $n>\lambda$, $X_n$ is a Binomial$(n,\frac\lambda n)$ random variable. Show that $X_n$ converges in distribution to Poisson$(\lambda)$.*

## The idea

Convergence in distribution means $F_{X_n}(x)\to F_X(x)$ at every continuity point $x$ of $F_X$ (L18). For integer-valued variables it's enough to show the **pmfs** converge at each integer $k$. Alternatively, show the **MGFs** converge (continuity theorem). Either proof gets full marks. Proof 1 is the more standard one.

The condition $n>\lambda$ is only there so that $p_n = \frac\lambda n<1$ is a valid probability.

Let $X\sim\text{Poisson}(\lambda)$, with $P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}$ for $k = 0,1,2,\dots$

## Proof 1: the pmfs converge

Fix an integer $k\ge 0$ and take $n>\max(k,\lambda)$. Split the binomial pmf into pieces whose limits we know:

$$
\begin{aligned}
P(X_n = k) &= \binom nk\Bigl(\frac\lambda n\Bigr)^k\Bigl(1 - \frac\lambda n\Bigr)^{n-k} \\
&= \frac{\lambda^k}{k!}\cdot\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{(1)}\cdot\underbrace{\Bigl(1 - \frac\lambda n\Bigr)^n}_{(2)}\cdot\underbrace{\Bigl(1 - \frac\lambda n\Bigr)^{-k}}_{(3)} .
\end{aligned}
$$

Now take $n\to\infty$ with $k$ fixed:

- **(1)** $= 1\cdot\bigl(1 - \frac1n\bigr)\cdots\bigl(1 - \frac{k-1}n\bigr)$. That's $k$ factors, each $\to 1$, so $(1)\to 1$.
- **(2)** $\to e^{-\lambda}$, from the standard limit $\bigl(1 + \frac an\bigr)^n\to e^a$ with $a = -\lambda$.
- **(3)** is a fixed power $-k$ of something tending to 1, so $(3)\to 1$.

Therefore

$$\boxed{\,\lim_{n\to\infty}P(X_n = k) = e^{-\lambda}\frac{\lambda^k}{k!} = P(X = k)\quad\text{for every } k = 0,1,2,\dots\,}$$

**From pmfs to CDFs.** All the variables take values in $\{0,1,2,\dots\}$. For $x<0$, $F_{X_n}(x) = 0 = F_X(x)$. For $x\ge 0$, let $m = \lfloor x\rfloor$. Then

$$F_{X_n}(x) = \sum_{k=0}^{m}P(X_n = k)\ \longrightarrow\ \sum_{k=0}^{m}P(X = k) = F_X(x),$$

because it is a **finite** sum of $m+1$ terms, and each term converges. So $F_{X_n}(x)\to F_X(x)$ for every $x$ (so in particular at every continuity point), which means $X_n\xrightarrow{d}\text{Poisson}(\lambda)$. $\square$

## Proof 2: the MGFs converge

From Question 2, $M_{X_n}(t) = (1 - p_n + p_ne^t)^n$ with $p_n = \frac\lambda n$:

$$M_{X_n}(t) = \Bigl(1 + \frac{\lambda(e^t - 1)}{n}\Bigr)^n\ \longrightarrow\ e^{\lambda(e^t - 1)}\qquad\text{for every } t\in\mathbb R,$$

again by $\bigl(1 + \frac an\bigr)^n\to e^a$, now with $a = \lambda(e^t - 1)$ (a fixed number once $t$ is fixed).

The Poisson$(\lambda)$ MGF is

$$M_X(t) = \sum_{k\ge 0}e^{tk}e^{-\lambda}\frac{\lambda^k}{k!} = e^{-\lambda}\sum_{k\ge0}\frac{(\lambda e^t)^k}{k!} = e^{-\lambda}e^{\lambda e^t} = e^{\lambda(e^t-1)},\qquad t\in\mathbb R .$$

So $M_{X_n}(t)\to M_X(t)$ for all $t$, in particular on an interval around 0. By the **continuity theorem** (the one used to prove the CLT in L18), $X_n\xrightarrow{d}\text{Poisson}(\lambda)$. $\square$

## Intuition

$X_n$ counts successes in $n$ independent trials, each with a tiny success probability $\frac\lambda n$, and the expected count $n\cdot\frac\lambda n = \lambda$ stays fixed. In the limit you get "a fixed average number of rare events", which is the Poisson$(\lambda)$ law. This is why Poisson is a good approximation to Binomial when $n$ is large and $p$ is small.

## Watch out

- Showing that the pmfs converge is not quite the same as the definition. Add the short "finite sum" step to get to the CDFs.
- In (1), don't write $\binom nk\approx\frac{n^k}{k!}$ without justifying it. Write out the $k$ factors.
- In Proof 2, name the theorem you're using (continuity theorem) and state the Poisson MGF, deriving it if there's time.

---

# Question 4: $X_n = n\mathbf 1\{U_n<\frac1n\}$ does not converge to 0 a.s.

> *Let $\{U_n\}$ be a sequence of i.i.d. Uniform$[0,1]$ random variables and let $X_n = n\mathbf 1\{U_n<\frac1n\}$. Show that $X_n$ does not converge to 0 almost surely.*

## The idea

Each $X_n$ is either $0$ or $n$. Let

$$E_n = \{U_n<\tfrac1n\} = \{X_n = n\},\qquad P(E_n) = \tfrac1n .$$

The $E_n$ are **independent** (each depends on its own $U_n$) and $\sum_n\frac1n = \infty$. Intuitively, the "bad" events keep happening forever, so the path keeps jumping back up to $n$. There are two ways to make this precise. Proof A only uses Theorem 7.6 from L17 and does the calculation by hand. Proof B is a one-liner using the second Borel–Cantelli lemma.

## Proof A: Theorem 7.6 (calculate $P(A_m)$)

Recall Theorem 7.6 (L17): $X_n\xrightarrow{a.s.}X$ if and only if, for every $\epsilon>0$,

$$\lim_{m\to\infty}P(A_m) = 1,\qquad\text{where } A_m = \{|X_n - X|<\epsilon\ \text{for all } n\ge m\}.$$

Take $X = 0$ and $\epsilon = \frac12$. Since $X_n\in\{0, n\}$ and $n\ge 1$, "$|X_n|<\frac12$" is the same as "$X_n = 0$", which is the same as "$U_n\ge\frac1n$". So

$$A_m = \bigcap_{n\ge m}\{U_n\ge\tfrac1n\}.$$

Take $m\ge 2$. Because $A_m\subseteq\bigcap_{n=m}^{N}\{U_n\ge\frac1n\}$ for every $N\ge m$, and the $U_n$ are independent,

$$P(A_m)\le\prod_{n=m}^{N}\Bigl(1 - \frac1n\Bigr) = \prod_{n=m}^{N}\frac{n-1}{n} = \frac{m-1}{m}\cdot\frac{m}{m+1}\cdots\frac{N-1}{N} = \frac{m-1}{N}.$$

The product **telescopes**. Let $N\to\infty$: $P(A_m)\le\frac{m-1}N\to 0$, so

$$\boxed{\,P(A_m) = 0\quad\text{for every } m\ge 2\,}$$

and $\lim_{m\to\infty}P(A_m) = 0\ne 1$. By Theorem 7.6, $X_n$ does **not** converge to 0 almost surely. $\square$

**What this says about the paths.** $A_1\subseteq A_2\subseteq\cdots$, and $\bigcup_mA_m$ is the event "from some point on, $X_n = 0$ forever". By continuity of probability, its probability is $\lim_mP(A_m) = 0$. So with probability 1, $X_n = n$ happens for infinitely many $n$. The paths aren't just failing to converge to 0, they're **unbounded**.

## Proof B: second Borel–Cantelli lemma

The events $E_n = \{U_n<\frac1n\}$ are independent, and

$$\sum_{n=1}^\infty P(E_n) = \sum_{n=1}^\infty\frac1n = \infty .$$

By the **second Borel–Cantelli lemma**, $P(E_n\text{ infinitely often}) = 1$. So with probability 1, $X_n = n\ge 1$ for infinitely many $n$, and such a path cannot converge to 0. Hence $P(X_n\to 0) = 0$, and in particular $X_n\not\xrightarrow{a.s.}0$. $\square$

## Compare: what $X_n$ *does* do

| Mode | Converges to 0? | Reason |
|---|---|---|
| In probability | **Yes** | $P(\lvert X_n\rvert>\epsilon) = P(U_n<\frac1n) = \frac1n\to 0$ |
| In distribution | **Yes** | follows from convergence in probability |
| Almost surely | **No** | this question |
| In mean | **No** | $E[\lvert X_n\rvert] = n\cdot\frac1n = 1$ for every $n$ |

So this is the standard example showing **convergence in probability does not imply a.s. convergence**.

## Watch out

- **Don't confuse this with the L17 slide-19 example**, $X_n = n\mathbf 1\{U\le\frac1n\}$ with **one** uniform $U$ for all $n$. There the events $\{U\le\frac1n\}$ are nested, not independent. Once $n>\frac1U$ the path is 0 forever, so that one **does** converge a.s. The only difference here is a fresh $U_n$ for each $n$, which makes the events independent.
- The first Borel–Cantelli lemma (Theorem 7.5) can't be used to prove *non*-convergence. A divergent sum only means 7.5 tells you nothing. You need independence, through Theorem 7.6 with the product, or through the second Borel–Cantelli lemma.
- If you quote the second Borel–Cantelli lemma, say that the events are independent. That is the hypothesis it needs.

---

# Question 5 (10 marks): pdf of $\mathbf X = A\mathbf Z + \boldsymbol\mu$

> *Suppose $\mathbf X = A\mathbf Z + \boldsymbol\mu$ where $A$ is an $n\times n$ invertible matrix and $\mathbf Z$ is a standard normal vector of length $n$. Derive the expression for the pdf of $\mathbf X$. Derive any intermediate results if required.*

## The idea

This is the L20 derivation of the multivariate Gaussian density. Four steps:

1. Write the pdf of $\mathbf Z$ (independent $\mathcal N(0,1)$ components, so multiply).
2. Find the mean and covariance of $\mathbf X$: $E[\mathbf X] = \boldsymbol\mu$, $\Sigma = AA^T$.
3. Derive the change-of-variables formula for an invertible linear map (L19 HW2): $f_{\mathbf X}(\mathbf x) = \frac{1}{|\det A|}f_{\mathbf Z}\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)$.
4. Rewrite everything in terms of $\boldsymbol\mu$ and $\Sigma$.

"Derive any intermediate results" means steps 2 and 3 should be proved, not just quoted.

## Step 1: the pdf of $\mathbf Z$

A standard normal vector has independent components $Z_i\sim\mathcal N(0,1)$. Independence means the joint pdf is the product of the marginals:

$$f_{\mathbf Z}(\mathbf z) = \prod_{i=1}^n\frac{1}{\sqrt{2\pi}}e^{-z_i^2/2} = \frac{1}{(2\pi)^{n/2}}\exp\Bigl(-\frac12\sum_{i=1}^nz_i^2\Bigr) = \frac{1}{(2\pi)^{n/2}}\exp\Bigl(-\frac12\mathbf z^T\mathbf z\Bigr),\qquad \mathbf z\in\mathbb R^n .$$

Also $E[\mathbf Z] = \mathbf 0$ and $C_{\mathbf Z} = E[\mathbf Z\mathbf Z^T] = I$, because $E[Z_iZ_j] = 1$ if $i = j$ and $E[Z_i]E[Z_j] = 0$ if $i\ne j$.

## Step 2: mean and covariance of $\mathbf X$

By linearity of expectation,

$$E[\mathbf X] = A\,E[\mathbf Z] + \boldsymbol\mu = \boldsymbol\mu .$$

Then $\mathbf X - \boldsymbol\mu = A\mathbf Z$, so

$$\Sigma := C_{\mathbf X} = E\bigl[(\mathbf X - \boldsymbol\mu)(\mathbf X - \boldsymbol\mu)^T\bigr] = E\bigl[A\mathbf Z\mathbf Z^TA^T\bigr] = A\,E[\mathbf Z\mathbf Z^T]\,A^T = AIA^T = AA^T .$$

$$\boxed{\,E[\mathbf X] = \boldsymbol\mu,\qquad \Sigma = AA^T\,}$$

Since $A$ is invertible, $\det\Sigma = \det A\cdot\det A^T = (\det A)^2>0$, so $\Sigma$ is invertible too.

## Step 3: change of variables for $\mathbf x = A\mathbf z + \boldsymbol\mu$

The map $g(\mathbf z) = A\mathbf z + \boldsymbol\mu$ is a bijection of $\mathbb R^n$ (because $A$ is invertible), with inverse

$$h(\mathbf x) = A^{-1}(\mathbf x - \boldsymbol\mu).$$

**Derivation.** Take any region $B\subseteq\mathbb R^n$. Then $\mathbf X\in B$ exactly when $\mathbf Z\in h(B)$, so

$$P(\mathbf X\in B) = P(\mathbf Z\in h(B)) = \int_{h(B)}f_{\mathbf Z}(\mathbf z)\,d\mathbf z .$$

Substitute $\mathbf z = h(\mathbf x) = A^{-1}(\mathbf x - \boldsymbol\mu)$. As $\mathbf x$ runs over $B$, $\mathbf z$ runs over $h(B)$. The Jacobian matrix of $h$ is $\frac{\partial\mathbf z}{\partial\mathbf x} = A^{-1}$ (it's linear, so the matrix is constant), and volumes scale by $|\det A^{-1}| = \frac{1}{|\det A|}$, so $d\mathbf z = \frac{1}{|\det A|}d\mathbf x$:

$$P(\mathbf X\in B) = \int_B f_{\mathbf Z}\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)\frac{1}{|\det A|}\,d\mathbf x .$$

This holds for every region $B$, so the integrand is the pdf of $\mathbf X$:

$$\boxed{\,f_{\mathbf X}(\mathbf x) = \frac{1}{|\det A|}\,f_{\mathbf Z}\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)\,}$$

This is the L19 Jacobian theorem, $f_{\mathbf Y}(\mathbf y) = f_{\mathbf X}(H(\mathbf y))\,|J|$, with $H = h$ and $J = \det A^{-1}$.

## Step 4: put it together and simplify

Plug Step 1 into Step 3:

$$f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}|\det A|}\exp\Bigl(-\frac12\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)^T\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)\Bigr).$$

**The exponent.** Using $(M\mathbf v)^T = \mathbf v^TM^T$ and $(A^{-1})^T = (A^T)^{-1}$:

$$
\begin{aligned}
\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr)^T\bigl(A^{-1}(\mathbf x - \boldsymbol\mu)\bigr) &= (\mathbf x - \boldsymbol\mu)^T(A^T)^{-1}A^{-1}(\mathbf x - \boldsymbol\mu) \\
&= (\mathbf x - \boldsymbol\mu)^T(AA^T)^{-1}(\mathbf x - \boldsymbol\mu),
\end{aligned}
$$

since $(AA^T)^{-1} = (A^T)^{-1}A^{-1}$ (inverse of a product reverses the order). With $\Sigma = AA^T$, this is $(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)$.

**The constant.** $\det\Sigma = \det(AA^T) = (\det A)^2$, so $|\det A| = \sqrt{\det\Sigma}$.

**Final answer.**

$$\boxed{\,f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}\exp\Bigl(-\frac12(\mathbf x - \boldsymbol\mu)^T\Sigma^{-1}(\mathbf x - \boldsymbol\mu)\Bigr),\qquad \mathbf x\in\mathbb R^n,\quad \Sigma = AA^T\,}$$

That is, $\mathbf X\sim\mathcal N(\boldsymbol\mu,\Sigma)$.

## Sanity check: $n = 1$

Take $A = \sigma>0$. Then $X = \sigma Z + \mu$, $\Sigma = \sigma^2$, and the formula gives

$$f_X(x) = \frac{1}{\sqrt{2\pi}\,\sigma}\exp\Bigl(-\frac{(x - \mu)^2}{2\sigma^2}\Bigr),$$

the familiar $\mathcal N(\mu,\sigma^2)$ pdf. ✓

## Why it matters

The final pdf depends on $A$ only through $\Sigma = AA^T$. Different matrices with the same $AA^T$ (for example $A$ and $AQ$ with $Q$ orthogonal) give the **same** distribution. So a Gaussian vector is pinned down completely by its mean vector and covariance matrix, which is why we can write $\mathcal N(\boldsymbol\mu,\Sigma)$.

## Watch out (where marks go)

- **Step 2 and Step 3 are the "intermediate results".** Prove $C_{\mathbf X} = AA^T$ and the $\frac{1}{|\det A|}$ factor; don't just state them.
- **Absolute value of the determinant.** $\det A$ can be negative, and a density can't be. Use $|\det A|$, which equals $\sqrt{\det\Sigma}$.
- **The order in $(AA^T)^{-1}$.** It is $(A^T)^{-1}A^{-1}$, which matches what comes out of the exponent. Writing $A^{-1}(A^T)^{-1}$ instead would be $(A^TA)^{-1}$, the wrong matrix.
- Say where $A$ invertible is used: it makes $g$ a bijection (so the formula applies) and makes $\Sigma$ invertible (so $\Sigma^{-1}$ exists).

---

# One-page summary

| Q | Key result |
|---|---|
| 1 | $Y = a + (b-a)(1 - e^{-\lambda X})\sim\text{Uniform}[a,b]$, because $F_X(X)\sim\text{Uniform}(0,1)$ |
| 2 | $M_X(t) = (1-p+pe^t)^n$, $M_Z(t) = (1-p+pe^t)^{2n}$ for all $t\in\mathbb R$, so $Z\sim\text{Bin}(2n,p)$: the binomial family is closed under independent sums with the same $p$ |
| 3 | $P(X_n = k)\to e^{-\lambda}\frac{\lambda^k}{k!}$ (or $M_{X_n}(t)\to e^{\lambda(e^t-1)}$), so $X_n\xrightarrow{d}\text{Poisson}(\lambda)$ |
| 4 | $P(A_m)\le\prod_{n=m}^N(1-\frac1n) = \frac{m-1}{N}\to 0$; or 2nd Borel–Cantelli with independent $E_n$, $\sum\frac1n = \infty$. So $X_n = n$ infinitely often a.s. |
| 5 | $f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}e^{-\frac12(\mathbf x-\boldsymbol\mu)^T\Sigma^{-1}(\mathbf x-\boldsymbol\mu)}$ with $\Sigma = AA^T$ |
