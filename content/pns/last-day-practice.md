# Last day practice: how to use it

The endsem has 15 questions. For each topic there's a shortlist of 10 to 12 problems with full solutions, running from basics to hard. Most come from the notes, homeworks, tutorials and past papers. Where the site had too few, new ones were written in the same (a), (b), (c) style.

**Open the [problem bank](../practice.html#lastday) and choose the topic in the "Last day practice" box.** The problems are sorted easy → hard. Rate each one, and anything you rate shaky or wrong goes on the retry list.

| Section | Question | Marks | Shortlist |
|---|---|---|---|
| 2 | Accept–reject | 10 | Accept–reject |
| 2 | Bayesian inference | 10 | Bayesian inference |
| 2 | Limit theorems (two questions) | 2 × 10 | Limit theorems |
| 2 | Random vector | 10 | Random vectors |
| 1 | MGF | 5 | MGF |
| 1 | Tower rule | 5 | Tower rule |
| 1 | Conditioning | 5 | Conditioning |
| 1 | Marginalization and conditioning | 5 | Marginalization |
| 1 | Inverse transform | 5 | Inverse transform |
| 1 | Monte Carlo | 5 | Monte Carlo |
| 1 | Random vector | 5 | Random vectors |
| 1 | Probabilistic inequalities | 5 | Inequalities |
| 1 | SLLN and CLT | 5 | SLLN and CLT |
| 1 | MSE / MLE | 5 | MSE and MLE |

Markov chains and slides 37 to 56 of `linear_regression.pdf` are not in the syllabus, so nothing here uses them.

The new problems written for this list are on the pages that follow, grouped by topic.

# New problems: probabilistic inequalities

The two tools are **Markov's inequality**, $P(X\ge a)\le\frac{E[X]}{a}$ for $X\ge0$ and $a>0$, and **Chebyshev's inequality**, $P(|X-\mu|\ge c)\le\frac{\sigma^2}{c^2}$. The **union bound** $P\big(\bigcup A_i\big)\le\sum P(A_i)$ is the third. Each one needs less information than the one after it, and gives a weaker answer.

### Problem 1 [Inequalities: Markov, then Chebyshev, then exact]

$X\ge0$ has $E[X] = 2$. (a) Bound $P(X\ge10)$. (b) If also $\text{Var}(X) = 1$, give a better bound. (c) Find $P(X\ge10)$ exactly when $X$ is exponential with mean 2.

**Solution.** (a) Markov: $P(X\ge10)\le\frac{2}{10} = 0.2$.

(b) $X\ge10$ means $X - 2\ge8$, which implies $|X - 2|\ge8$. So by Chebyshev,
$$P(X\ge10)\le P(|X - 2|\ge8)\le\frac{1}{64}\approx0.016 .$$
(c) Rate $\frac12$: $P(X\ge10) = e^{-10/2} = e^{-5}\approx0.0067$.

Each extra piece of information (mean, then variance, then the whole distribution) gives a sharper answer. (An exponential with mean 2 has variance 4, so for it Chebyshev gives $\frac{4}{64}\approx0.063$, still above the exact $0.0067$.)

### Problem 2 [Inequalities: proving Chebyshev from Markov]

(a) Prove Chebyshev's inequality from Markov's. (b) Show that for any $t>0$, $P(X\ge a)\le e^{-ta}M_X(t)$.

**Solution.** (a) $(X - \mu)^2\ge0$, and $|X - \mu|\ge c$ exactly when $(X - \mu)^2\ge c^2$. Markov applied to $(X-\mu)^2$ with $a = c^2$:
$$P(|X - \mu|\ge c) = P\big((X - \mu)^2\ge c^2\big)\le\frac{E[(X - \mu)^2]}{c^2} = \frac{\sigma^2}{c^2}.$$
(b) For $t>0$, $x\mapsto e^{tx}$ is increasing and positive, so $\{X\ge a\} = \{e^{tX}\ge e^{ta}\}$. Then Markov gives
$$P(X\ge a) = P(e^{tX}\ge e^{ta})\le\frac{E[e^{tX}]}{e^{ta}} = e^{-ta}M_X(t).$$
The trick in both parts is the same: apply Markov to a nonnegative, increasing function of $X$.

### Problem 3 [Inequalities: how tight are they?]

(a) Find a nonnegative $X$ with $E[X] = \mu$ for which Markov's bound $P(X\ge a)\le\frac\mu a$ holds with equality ($a\ge\mu$). (b) For $k\ge1$, find an $X$ with mean $\mu$ and variance $\sigma^2$ for which $P(|X-\mu|\ge k\sigma) = \frac{1}{k^2}$.

**Solution.** (a) Put all the mass that is at least $a$ exactly at $a$, and the rest at 0. Let $X = a$ with probability $\frac\mu a$, otherwise $0$. Then $E[X] = \mu$ and $P(X\ge a) = \frac\mu a$.

(b) Let $X = \mu\pm k\sigma$ with probability $\frac{1}{2k^2}$ each, and $X = \mu$ otherwise. By symmetry the mean is $\mu$, and
$$\text{Var}(X) = 2\cdot\frac{1}{2k^2}(k\sigma)^2 = \sigma^2,\qquad P(|X - \mu|\ge k\sigma) = \frac1{k^2}.$$
So neither inequality can be improved without more information. In practice they're loose because real distributions don't pile their mass right at the edge.

### Problem 4 [Inequalities: at least how much is near the mean?]

$X$ has mean 10 and standard deviation 2. (a) Give a lower bound for $P(6<X<14)$. (b) What fraction of the probability lies within 3 standard deviations of the mean, at the very least? (c) Compare (a) with the answer when $X$ is normal.

**Solution.** (a) $P(6<X<14) = 1 - P(|X - 10|\ge4)\ge1 - \frac{4}{16} = 0.75$.

(b) $1 - \frac1{3^2} = \frac89\approx0.889$.

(c) For a normal, $P(|Z|<2) = 0.954$. Chebyshev's 0.75 holds for **every** distribution with this mean and variance, which is why it's so much lower.

### Problem 5 [Inequalities: the union bound]

A machine has 10 parts. Each part fails during a day with probability 0.01, but the failures may be dependent. (a) Bound $P(\text{some part fails})$. (b) Find it exactly if the failures are independent. (c) What is the smallest possible value of $P(\text{some part fails})$?

**Solution.** (a) By the union bound, $P\big(\bigcup_iF_i\big)\le\sum_iP(F_i) = 10(0.01) = 0.1$.

(b) $1 - 0.99^{10}\approx0.0956$, just under the bound.

(c) $\bigcup F_i\supseteq F_1$, so the probability is at least $0.01$. This is attained when all ten parts fail together (the same event). So the true answer lies in $[0.01, 0.1]$ whatever the dependence. The union bound needs no independence at all, which is why it's so useful.

### Problem 6 [Inequalities: Chebyshev for an average]

$X_1,\dots,X_n$ are independent with the same mean $\mu$, and $\text{Var}(X_i)\le C$ for all $i$ (they need not have the same distribution). Let $M_n = \frac1n\sum_{i=1}^nX_i$. (a) Bound $\text{Var}(M_n)$. (b) Show $M_n\to\mu$ in probability.

**Solution.** (a) By independence, $\text{Var}(M_n) = \frac{1}{n^2}\sum\text{Var}(X_i)\le\frac{nC}{n^2} = \frac Cn$.

(b) $E[M_n] = \mu$, so by Chebyshev, for every $\epsilon>0$,
$$P(|M_n - \mu|\ge\epsilon)\le\frac{C}{n\epsilon^2}\to0 .$$
This is the weak law of large numbers, and it didn't need identical distributions. Bounded variances are enough. (Independence can even be weakened to "uncorrelated", since only the variance of the sum was used.)

### Problem 7 [Inequalities: Markov proves convergence in probability]

(a) $X_n\ge0$ and $E[X_n] = \frac1n$. Show $X_n\xrightarrow{p}0$. (b) Give an example where $X_n\xrightarrow{p}0$ but $E[X_n]\not\to0$, so Markov can't be used.

**Solution.** (a) For $\epsilon>0$, Markov gives $P(X_n\ge\epsilon)\le\frac{1}{n\epsilon}\to0$.

(b) Let $X_n = n^2$ with probability $\frac1n$, and $0$ otherwise. Then $P(X_n>\epsilon) = \frac1n\to0$, but $E[X_n] = n\to\infty$. Markov is a sufficient tool, not a necessary one. When the mean blows up, compute $P(|X_n|>\epsilon)$ directly.

### Problem 8 [Inequalities: when Chebyshev says nothing]

$X\sim\mathcal U[0,1]$. Compare the Chebyshev bound with the exact value of $P\big(|X - \frac12|\ge c\big)$ for (a) $c = 0.4$ and (b) $c = 0.25$.

**Solution.** $\text{Var}(X) = \frac1{12}$, and exactly $P(|X - \frac12|\ge c) = 1 - 2c$ for $0\le c\le\frac12$.

(a) Chebyshev: $\frac{1/12}{0.16}\approx0.52$. Exact: $0.2$.

(b) Chebyshev: $\frac{1/12}{0.0625}\approx1.33$. That's bigger than 1, so it tells you nothing. Exact: $0.5$.

The bound only becomes informative when $c$ is a few standard deviations ($\sigma\approx0.29$ here).

### Problem 9 [Inequalities: Markov, Chebyshev and the CLT on one question]

$X\sim\text{Binomial}(100, 0.5)$. Bound or approximate $P(X\ge75)$ with (a) Markov, (b) Chebyshev, (c) the CLT.

**Solution.** $E[X] = 50$ and $\text{Var}(X) = 25$.

(a) $P(X\ge75)\le\frac{50}{75}\approx0.67$.

(b) $P(X\ge75)\le P(|X - 50|\ge25)\le\frac{25}{625} = 0.04$.

(c) With the continuity correction, $P(X\ge74.5)\approx P\big(Z\ge\frac{24.5}{5}\big) = P(Z\ge4.9)\approx5\times10^{-7}$.

The three answers differ by six orders of magnitude. Markov uses only the mean, Chebyshev the variance, and the CLT the (approximate) shape.

### Problem 10 [Inequalities: sample size from Chebyshev and from the CLT]

A poll estimates an unknown fraction $p$ by the sample fraction $M_n$ of $n$ people. (a) Use Chebyshev to find $n$ so that $P(|M_n - p|\ge0.05)\le0.1$ whatever $p$ is. (b) Redo it with the CLT.

**Solution.** $\text{Var}(M_n) = \frac{p(1-p)}{n}\le\frac{1}{4n}$, because $p(1-p)\le\frac14$.

(a) We need $\frac{1}{4n(0.05)^2}\le0.1$, so $n\ge\frac{1}{4(0.0025)(0.1)} = 1000$.

(b) $M_n\approx\mathcal N\big(p, \frac{p(1-p)}{n}\big)$, with worst-case sd $\frac{1}{2\sqrt n}$. We need $1.645\cdot\frac{1}{2\sqrt n}\le0.05$ (since $P(|Z|\ge1.645) = 0.1$), so $\sqrt n\ge16.45$ and $n\ge271$.

Chebyshev is a guarantee and the CLT is an approximation, which is why Chebyshev asks for almost four times as many people.

### Problem 11 [Inequalities: the MGF bound beats Chebyshev] (hard)

$X\sim\text{Poisson}(1)$. Bound $P(X\ge4)$ using (a) Markov, (b) Chebyshev, (c) $P(X\ge a)\le\min_{t>0}e^{-ta}M_X(t)$ (Problem 2(b)). (d) Compute it exactly.

**Solution.** (a) $\frac14 = 0.25$.

(b) $P(X\ge4)\le P(|X - 1|\ge3)\le\frac19\approx0.111$.

(c) $M_X(t) = e^{e^t - 1}$, so the bound is $g(t) = \exp(e^t - 1 - 4t)$. Minimise the exponent: $e^t - 4 = 0$ gives $t = \ln4$, and
$$P(X\ge4)\le\exp(4 - 1 - 4\ln4) = \frac{e^3}{256}\approx0.078 .$$
(d) $1 - e^{-1}\big(1 + 1 + \frac12 + \frac16\big) = 1 - \frac{8}{3e}\approx0.019$.

Each bound improves on the last, and none reaches the truth. This is the usual exam pattern.

# New problems: SLLN

**The strong law.** If $X_1, X_2,\dots$ are i.i.d. with $E|X_1|<\infty$, then $\frac1n\sum_{i=1}^nX_i\to E[X_1]$ **almost surely**. Combine it with "a continuous function of an a.s. limit is the a.s. limit of the function" and most problems become one line.

### Problem 1 [SLLN: limits you can read off]

$X_1, X_2,\dots$ are i.i.d. $\mathcal U[0,1]$. Find the almost sure limits of (a) $\frac1n\sum_{i=1}^nX_i^2$, (b) $(X_1X_2\cdots X_n)^{1/n}$, (c) $\frac1n\#\{i\le n : X_i\le0.3\}$.

**Solution.** (a) The $X_i^2$ are i.i.d. with $E[X_1^2] = \frac13$, so the limit is $\frac13$.

(b) Take logs: $\ln(X_1\cdots X_n)^{1/n} = \frac1n\sum\ln X_i\to E[\ln X_1] = \int_0^1\ln x\,dx = -1$ a.s. The exponential is continuous, so $(X_1\cdots X_n)^{1/n}\to e^{-1}\approx0.368$ a.s. Compare the arithmetic mean, which tends to $0.5$.

(c) The indicators $\mathbf 1\{X_i\le0.3\}$ are i.i.d. Bernoulli$(0.3)$, so the fraction tends to $0.3$ a.s. In general, the empirical CDF converges to the true CDF at every point.

### Problem 2 [SLLN: when it applies, and when it fails]

(a) State the SLLN carefully. (b) Explain why the SLLN justifies estimating $\int_0^1e^x\,dx$ by $\frac1n\sum e^{U_i}$ with $U_i$ i.i.d. uniform. What is the limit? (c) If $X_i$ are i.i.d. standard Cauchy, $\frac1n\sum X_i$ is again standard Cauchy for every $n$. Why doesn't this contradict the SLLN?

**Solution.** (a) For i.i.d. $X_i$ with $E|X_1|<\infty$ and mean $\mu$: $P\big(\lim_{n\to\infty}\frac1n\sum_{i=1}^nX_i = \mu\big) = 1$.

(b) $Y_i = e^{U_i}$ are i.i.d. with $E|Y_1| = \int_0^1e^u\,du = e - 1<\infty$, so $\frac1n\sum Y_i\to e - 1\approx1.718$ almost surely. Every simulation run, apart from a probability-0 set of runs, converges to the right answer.

(c) The Cauchy distribution has $E|X| = \int\frac{|x|}{\pi(1+x^2)}dx = \infty$, so the SLLN's assumption fails. Its sample mean never settles down, however large $n$ is. Always check $E|X|<\infty$ before using the law.

### Problem 3 [SLLN: the renewal rate] (hard)

Bulbs are replaced the moment they fail. Lifetimes $X_1, X_2,\dots$ are i.i.d. with mean $2$ months. Let $S_n = X_1 + \cdots + X_n$ and let $N(t)$ be the number of bulbs that have failed by time $t$. Show $\frac{N(t)}{t}\to\frac12$ almost surely as $t\to\infty$.

**Solution.** By definition of $N(t)$,
$$S_{N(t)}\le t<S_{N(t)+1}\quad\Longrightarrow\quad\frac{S_{N(t)}}{N(t)}\le\frac{t}{N(t)}<\frac{S_{N(t)+1}}{N(t)+1}\cdot\frac{N(t)+1}{N(t)}.$$
Each $X_i$ is finite, so $N(t)\to\infty$ as $t\to\infty$. By the SLLN, $\frac{S_n}{n}\to2$ a.s., so both outer terms tend to $2$ (and $\frac{N(t)+1}{N(t)}\to1$). By squeezing, $\frac{t}{N(t)}\to2$, i.e. $\frac{N(t)}{t}\to\frac12$ a.s.: in the long run you use one bulb per mean lifetime.

# New problems: accept–reject

**The method.** To sample from the target $f$ using a proposal $g$ you can sample from, find $c$ with $f(x)\le c\,g(x)$ for all $x$. Then repeat: draw $Y\sim g$ and $U\sim\mathcal U(0,1)$ independently, and **accept** $X = Y$ if $U\le\frac{f(Y)}{c\,g(Y)}$. Each round accepts with probability $\frac1c$, so the number of rounds is Geometric$(\frac1c)$ with mean $c$. The best $c$ is $\max_x\frac{f(x)}{g(x)}$.

### Problem 1 [Accept–reject: the full 10-mark answer]

Target: $f(x) = 6x(1-x)$ on $[0,1]$. Proposal: $\mathcal U[0,1]$. (a) Find the smallest valid $c$. (b) Write the algorithm. (c) Find the acceptance probability and the expected number of proposals needed for 100 samples. (d) Prove that an accepted value has pdf $f$.

**Solution.** (a) $g = 1$, so $c = \max_{[0,1]}6x(1-x) = 6\cdot\frac14 = \frac32$, attained at $x = \frac12$.

(b) Repeat: draw $Y, U\sim\mathcal U(0,1)$ independently. If $U\le\frac{f(Y)}{c\,g(Y)} = 4Y(1-Y)$, output $Y$ and stop; otherwise try again.

(c) $P(\text{accept}) = \frac1c = \frac23$. Each sample takes a Geometric$(\frac23)$ number of rounds, with mean $\frac32$, so 100 samples need $150$ proposals on average.

(d) For one round,
$$P(Y\le x,\ \text{accept}) = \int_0^xg(y)\,P\Big(U\le\frac{f(y)}{c\,g(y)}\Big)dy = \int_0^xg(y)\frac{f(y)}{c\,g(y)}\,dy = \frac{F(x)}{c}.$$
Letting $x\to\infty$ gives $P(\text{accept}) = \frac1c$. So $P(Y\le x\mid\text{accept}) = F(x)$. Rounds are independent, so the value finally output has CDF $F$, i.e. pdf $f$.

### Problem 2 [Accept–reject: choosing a better proposal, and inverse transform as a check]

Target: the exponential truncated to $[0,2]$, $f(x) = \frac{e^{-x}}{1 - e^{-2}}$ for $0\le x\le2$. (a) Use the proposal $\mathcal U[0,2]$: find $c$, the acceptance rule and the acceptance probability. (b) Now use the proposal Exp(1). Find $c$ and the acceptance probability, and describe the rule in words. (c) Give an inverse transform sampler instead.

**Solution.** (a) $g = \frac12$ on $[0,2]$, so $\frac fg = \frac{2e^{-x}}{1 - e^{-2}}$, which is largest at $x = 0$: $c = \frac{2}{1 - e^{-2}}\approx2.31$. Accept if $U\le\frac{f(Y)}{c\,g(Y)} = e^{-Y}$. $P(\text{accept}) = \frac1c\approx0.43$.

(b) $g(x) = e^{-x}$ on $[0,\infty)$. On $[0,2]$, $\frac fg = \frac{1}{1 - e^{-2}}$, and $f = 0$ beyond 2, so $c = \frac1{1 - e^{-2}}\approx1.16$. The ratio $\frac{f(Y)}{c\,g(Y)}$ is $1$ if $Y\le2$ and $0$ otherwise. So the rule is "draw $Y\sim$ Exp(1) and keep it if $Y\le2$", with $P(\text{accept}) = 1 - e^{-2}\approx0.86$. A proposal shaped like the target wastes far fewer draws.

(c) $F(x) = \frac{1 - e^{-x}}{1 - e^{-2}}$ on $[0,2]$. Solve $F(x) = u$: $X = -\ln\big(1 - u(1 - e^{-2})\big)$ with $U\sim\mathcal U(0,1)$. That's one uniform per sample, with no rejections.

# New problems: inverse transform

**The method.** If $F$ is a continuous, strictly increasing CDF and $U\sim\mathcal U(0,1)$, then $X = F^{-1}(U)$ has CDF $F$. For a discrete $X$ with values $x_1<x_2<\cdots$, output $x_k$ when $F(x_{k-1})<U\le F(x_k)$.

### Problem 1 [Inverse transform: why it works, both directions]

(a) Prove that $X = F^{-1}(U)$ has CDF $F$ when $F$ is continuous and strictly increasing. (b) Conversely, if $X$ has continuous CDF $F$, show $F(X)\sim\mathcal U(0,1)$.

**Solution.** (a) $F$ is increasing, so $F^{-1}(U)\le x\iff U\le F(x)$. Hence $P(X\le x) = P(U\le F(x)) = F(x)$, since $P(U\le u) = u$ on $[0,1]$.

(b) For $0<u<1$, $P(F(X)\le u) = P(X\le F^{-1}(u)) = F(F^{-1}(u)) = u$. That is the uniform CDF. (This is the "probability integral transform". It is why a CDF value is always uniformly distributed.)

### Problem 2 [Inverse transform: three continuous examples]

Give a sampler using one $U\sim\mathcal U(0,1)$ for: (a) $f(x) = 3x^2$ on $[0,1]$; (b) the Weibull CDF $F(x) = 1 - e^{-x^2}$, $x\ge0$; (c) the Laplace pdf $f(x) = \frac12e^{-|x|}$.

**Solution.** (a) $F(x) = x^3$, so $X = U^{1/3}$.

(b) $1 - e^{-x^2} = u$ gives $x = \sqrt{-\ln(1-u)}$. Since $1 - U$ is also uniform, $X = \sqrt{-\ln U}$ works too.

(c) $F(x) = \frac12e^x$ for $x<0$ and $1 - \frac12e^{-x}$ for $x\ge0$, with $F(0) = \frac12$. Invert each piece:
$$X = \begin{cases}\ln(2U) & U<\frac12\\ -\ln\big(2(1-U)\big) & U\ge\frac12.\end{cases}$$
Check: at $U = \frac12$ both pieces give 0, and the CDF is continuous there.

### Problem 3 [Inverse transform: a geometric from one uniform]

Let $0<p<1$ and $U\sim\mathcal U(0,1)$. Show that $X = \Big\lceil\frac{\ln U}{\ln(1-p)}\Big\rceil$ is Geometric$(p)$ on $\{1,2,\dots\}$.

**Solution.** $X$ is a positive integer, since $\frac{\ln U}{\ln(1-p)}>0$ (both logs are negative). For $k = 0, 1, 2,\dots$:
$$P(X>k) = P\Big(\frac{\ln U}{\ln(1-p)}>k\Big) = P\big(\ln U<k\ln(1-p)\big) = P\big(U<(1-p)^k\big) = (1-p)^k .$$
(Multiplying by $\ln(1-p)<0$ flips the inequality.) $P(X>k) = (1-p)^k$ is exactly the geometric tail, so $X\sim$ Geometric$(p)$. This is the discrete inverse transform written in closed form, and it's also $\lceil E\rceil$ for an exponential $E$ with rate $-\ln(1-p)$.

### Problem 4 [Inverse transform: a piecewise density]

$f(x) = \frac12$ on $[0,1]$ and $f(x) = \frac14$ on $(1,3]$. (a) Check it's a pdf and find $F$. (b) Give the inverse transform sampler. (c) What does $U = 0.8$ produce?

**Solution.** (a) $\frac12\cdot1 + \frac14\cdot2 = 1$. Integrating,
$$F(x) = \begin{cases}\frac x2 & 0\le x\le1\\ \frac12 + \frac{x-1}{4} & 1<x\le3.\end{cases}$$
(b) For $u\le\frac12$, $\frac x2 = u$ gives $x = 2u$. For $u>\frac12$, $\frac12 + \frac{x-1}4 = u$ gives $x = 4u - 1$.

(c) $0.8>0.5$, so $X = 4(0.8) - 1 = 2.2$.

# New problems: Monte Carlo

**The method.** To estimate $I = E[h(X)]$, average $h(X_1),\dots,h(X_n)$ for i.i.d. samples. The estimate is unbiased, converges by the SLLN, and has standard error $\frac{\sigma_h}{\sqrt n}$ (by the CLT, roughly 95% of runs land within $1.96\frac{\sigma_h}{\sqrt n}$). An integral $\int_a^bg(x)\,dx$ is $(b-a)\,E[g(U)]$ for $U\sim\mathcal U[a,b]$.

### Problem 1 [Monte Carlo: an integral with no closed form]

Estimate $I = \int_0^2e^{-x^2}dx$. (a) Write a Monte Carlo estimator using uniforms, and show it's unbiased. (b) Find its variance in terms of $\sigma^2 = \text{Var}(2e^{-U^2})$. (c) Given $\sigma^2\approx0.475$, how many samples give an error under 0.01 with probability about 0.95?

**Solution.** (a) With $U_i\sim\mathcal U[0,2]$, let $\hat I_n = \frac1n\sum_{i=1}^n2e^{-U_i^2}$. Then
$$E[\hat I_n] = E[2e^{-U^2}] = 2\int_0^2e^{-u^2}\cdot\frac12\,du = I .$$
(b) The terms are i.i.d., so $\text{Var}(\hat I_n) = \frac{\sigma^2}{n}$.

(c) By the CLT we need $1.96\sqrt{\sigma^2/n}\le0.01$, so $n\ge\frac{1.96^2(0.475)}{0.0001}\approx18{,}300$. (The true value is $I\approx0.882$.)

### Problem 2 [Monte Carlo: estimating a probability]

$X, Y$ are i.i.d. $\mathcal U[0,1]$. (a) Give a Monte Carlo estimator of $p = P(X + Y>1.5)$. (b) Find $p$ exactly. (c) What $n$ makes the standard error at most $0.01$?

**Solution.** (a) $\hat p_n = \frac1n\sum_{i=1}^n\mathbf 1\{X_i + Y_i>1.5\}$, with fresh pairs $(X_i, Y_i)$. It's an average of Bernoulli$(p)$ variables, so it is unbiased.

(b) The region $x + y>1.5$ in the unit square is a triangle with legs $0.5$, so $p = \frac12(0.5)^2 = \frac18$.

(c) $\text{se} = \sqrt{\frac{p(1-p)}{n}}\le0.01$ needs $n\ge\frac{(1/8)(7/8)}{10^{-4}}\approx1094$.

### Problem 3 [Monte Carlo: two estimators of $\pi$, compared]

(a) Hit-or-miss: $\hat\pi_1 = \frac4n\sum\mathbf 1\{U_i^2 + V_i^2\le1\}$. (b) Mean-value: $\hat\pi_2 = \frac4n\sum\sqrt{1 - U_i^2}$. Show both are unbiased and find their variances. Which is better?

**Solution.** (a) $P(U^2 + V^2\le1) = \frac\pi4$, so $E[\hat\pi_1] = \pi$ and
$$\text{Var}(\hat\pi_1) = \frac{16}{n}\cdot\frac\pi4\Big(1 - \frac\pi4\Big)\approx\frac{2.70}{n}.$$
(b) $E[\sqrt{1 - U^2}] = \int_0^1\sqrt{1 - u^2}\,du = \frac\pi4$, so $E[\hat\pi_2] = \pi$. And $E[1 - U^2] = \frac23$, so
$$\text{Var}(\hat\pi_2) = \frac{16}{n}\Big(\frac23 - \frac{\pi^2}{16}\Big)\approx\frac{0.80}{n}.$$
The mean-value estimator has about $\frac13$ of the variance, so it needs about a third as many samples for the same accuracy. Averaging a smooth function beats averaging a 0/1 indicator.

### Problem 4 [Monte Carlo: rare events and importance sampling] (hard)

You want $p = P(Z>4)\approx3.2\times10^{-5}$ for $Z\sim\mathcal N(0,1)$. (a) With plain Monte Carlo, about how many samples are needed for a relative standard error of 10%? (b) Instead sample $Y_i\sim\mathcal N(4,1)$ and use $\hat p = \frac1n\sum\mathbf 1\{Y_i>4\}\,w(Y_i)$ with $w(y) = \frac{\phi(y)}{\phi(y-4)}$. Show $\hat p$ is unbiased and simplify $w$.

**Solution.** (a) The standard error is $\sqrt{p(1-p)/n}\approx\sqrt{p/n}$. A relative error of $0.1$ needs $\sqrt{p/n}\le0.1p$, i.e. $n\ge\frac{100}{p}\approx3\times10^6$. Almost every sample is wasted, since a hit happens once in 30,000 draws.

(b) Let $q$ be the $\mathcal N(4,1)$ density. Then
$$E\big[\mathbf 1\{Y>4\}w(Y)\big] = \int\mathbf 1\{y>4\}\frac{\phi(y)}{q(y)}q(y)\,dy = \int_4^\infty\phi(y)\,dy = p .$$
$w(y) = \exp\big(-\frac{y^2}2 + \frac{(y-4)^2}2\big) = e^{8 - 4y}$. Now half the samples land in the region, and each carries a small weight, so a few thousand samples already give a good estimate.
