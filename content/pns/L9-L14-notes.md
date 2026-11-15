---
title: "Probability & Statistics (MA6.101), Lectures 9 to 14"
subtitle: "Slide-by-slide study notes with worked examples, plus extra problems from probabilitycourse.com and Bertsekas"
date: "Monsoon 2026"
---

# How to use this document

**What it covers.** This year's Lectures 9 to 14 (Prof. Tejas Bodas): right-continuity of the CDF, mixed random variables, several random variables at once (joint PMFs and PDFs, marginals, independence, functions of two variables, covariance), conditioning (on events, on partitions, on another random variable), conditional expectation and the law of iterated expectations, sums of random variables (convolution), Bayes' rule for random variables, and the variance of a sum. Lecture 14 (moment generating functions) is already covered in full in the companion document `L14-L20-notes`, so here it gets a short summary only.

**How each lecture is laid out** (same as the L14 to L20 notes).

1. **Part A, the slides.** Every slide in order, with its slide number (for example *Slide 15/26*), a box saying what the slide says, then an explanation. Every question asked on a slide (the blue ones) is answered, and every red **HW** is solved.
2. **Part B, extra worked examples and problems.** These come from [probabilitycourse.com](https://www.probabilitycourse.com) (Pishro-Nik, Chapters 4 and 5) and from Bertsekas & Tsitsiklis, *Introduction to Probability*, 2nd ed. (the PDF in `probability-and-statistics/textbooks/`). Every problem has a full solution. Many are last year's homework, tutorial or exam questions, and those are marked.

**Tip.** Cover each solution and try the first two lines yourself. In this part of the course almost every problem is one of five moves: *sum the joint over the variable you don't want*, *divide the joint by a marginal*, *condition on something and average*, *find the CDF first and then differentiate*, or *expand a covariance like a bracket*. The solutions say which move they use.

## Reading plan (about 4 hours)

| Block | Lecture | Topic | Time |
|---|---|---|---|
| 0 | L1 to L8 | Toolkit recap (below) | 10 min |
| 1 | L9 | Right-continuity of the CDF, mixed random variables, joint PMF, marginals | 35 min |
| 2 | L10 | Independence, $E[XY]$, joint PDFs, $E[g(X,Y)]$, max and min, covariance | 50 min |
| 3 | L11 | Conditioning on an event, $E[X\mid A]$, partitions, memorylessness | 30 min |
| 4 | L12 | Conditioning on a random variable, $E[X\mid Y]$, iterated expectations, random sums | 55 min |
| 5 | L13 | Convolution, Bayes' rule for random variables, variance of sums | 45 min |
| 6 | L14 | MGFs and the discrete inverse transform (short summary, see the L14 to L20 notes) | 10 min |
| 7 | All | Practice map, formula sheet, exam-style self-test | 25 min |

## Which file holds which slides

The lectures use four slide decks, and each lecture PDF holds a slice of one deck.

| File | Deck | Slides in the file | Topics |
|---|---|---|---|
| `L9.pdf` | Deck 1 (26 slides) | 2 to 11 | Right-continuity; mixed random variables; joint PMF, marginals |
| `L10.pdf` | Deck 1 | 12 to 26 | Independence; $E[XY]$; joint CDF and PDF; $E[g(X,Y)]$; max/min; covariance |
| `L11.pdf` | Deck 2 (36 slides) | 2 to 11 | Conditioning on an event; $E[X\mid A]$; partitions; conditioning on $\{X\in A\}$; geometric |
| `L12.pdf` | Deck 2 | 12 to 29 | Conditioning on $Y$; $E[X\mid Y = y]$; continuous versions; $E[X\mid Y]$; iterated expectations; random sums |
| `L13.pdf` (same file as `Y2.pdf`) | Deck 3 (18 slides) | 2 to 13 | Convolution; Bayes' rule revisited; variance of sums |
| `L14.pdf` | Deck A (23 slides) | 1 to 12 | MGFs; sampling a discrete random variable |

Deck 2 slides 30 to 36 are not in any PDF. Deck 2's agenda (slide 12) lists "Bayes rule revisited" and "Sums of random variables", and those are exactly what Deck 3 (L13) teaches, so nothing is missing. Deck 3 slides 14 to 18 (MGFs) are also not in the file; that material is taught again in L14.

**Last year's practice.** Last year's Homework 5 and Tutorial 5 match L9 to L12 almost question for question. Homework 4 and Tutorial 4 have the max/min and mixed-variable questions, Homework 6 and Tutorial 6 have the L13 questions, and last year's mid-semester paper (Q1 to Q4) is all L10 to L13. The practice map at the end lists every one of them and where it is solved.

## Notation

| Symbol | Meaning |
|---|---|
| $p_{XY}(x,y)$ or $p_{X,Y}(x,y)$ | joint PMF: $P(X = x, Y = y)$ |
| $F_{XY}(x,y)$ | joint CDF: $P(X\le x, Y\le y)$ |
| $f_{XY}(x,y)$ | joint PDF |
| $p_X$, $f_X$, $F_X$ | marginal PMF, PDF, CDF of $X$ |
| $F_X(x+)$, $F_X(x-)$ | right-hand and left-hand limits of $F_X$ at $x$ |
| $p_{X\mid A}(x)$, $f_{X\mid A}(x)$ | conditional PMF / PDF of $X$ given the event $A$ |
| $p_{X\mid Y}(x\mid y)$, $f_{X\mid Y}(x\mid y)$ | conditional PMF / PDF of $X$ given $Y = y$ |
| $E[X\mid Y = y]$ | a number (depends on $y$) |
| $E[X\mid Y]$ | a random variable, the function $y\mapsto E[X\mid Y=y]$ applied to $Y$ |
| $\operatorname{Cov}(X,Y)$, $\rho(X,Y)$ | covariance and correlation coefficient |
| $\delta(x - a)$ | Dirac delta: a "spike" of total mass 1 at $a$, used to write point masses inside a PDF |
| i.i.d. | independent and identically distributed |

## Toolkit from Lectures 1 to 8 (used constantly below)

**1. Probability space.** $(\Omega, \mathcal F, \mathbb P)$: sample space, $\sigma$-algebra of events, probability measure. Countable additivity: for disjoint $A_1, A_2,\dots$, $\mathbb P(\bigcup_i A_i) = \sum_i\mathbb P(A_i)$.

**2. Continuity of probability (L3).** If $A_n\uparrow A$ (increasing, $A = \bigcup_n A_n$) or $A_n\downarrow A$ (decreasing, $A = \bigcap_n A_n$), then $\mathbb P(A_n)\to\mathbb P(A)$. This is the tool behind right-continuity in L9.

**3. Conditional probability, total probability, Bayes (L3).** $\mathbb P(A\mid B) = \frac{\mathbb P(A\cap B)}{\mathbb P(B)}$. If $B_1,\dots,B_n$ partition $\Omega$:
$$\mathbb P(A) = \sum_i\mathbb P(A\mid B_i)\,\mathbb P(B_i),\qquad \mathbb P(B_j\mid A) = \frac{\mathbb P(A\mid B_j)\mathbb P(B_j)}{\sum_i\mathbb P(A\mid B_i)\mathbb P(B_i)} .$$
Events $A, B$ are independent if $\mathbb P(A\cap B) = \mathbb P(A)\mathbb P(B)$.

**4. Random variable, PMF, CDF (L4 to L7).** A random variable is a function $X:\Omega\to\mathbb R$ with $\{X\le x\}\in\mathcal F$ for every $x$. $p_X(x) = \mathbb P(X = x)$, $F_X(x) = \mathbb P(X\le x)$, $P(a<X\le b) = F_X(b) - F_X(a)$. For a continuous $X$, $f_X = F_X'$ and $P(X = a) = 0$ for every single point $a$.

**5. Expectation and LOTUS (L5).** $E[X] = \sum_x x\,p_X(x)$ or $\int x f_X(x)\,dx$, and for any function $g$,
$$E[g(X)] = \sum_x g(x)\,p_X(x)\quad\text{or}\quad\int g(x)\,f_X(x)\,dx .$$
$E[aX + b] = aE[X] + b$, $\operatorname{Var}(X) = E[X^2] - (E[X])^2$, $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$.

**6. Standard distributions (L6 to L8).**

| Distribution | PMF / PDF | Mean | Variance |
|---|---|---|---|
| Bernoulli$(p)$ | $P(X=1) = p$, $P(X=0) = 1-p$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\binom nk p^k(1-p)^{n-k}$, $k = 0..n$ | $np$ | $np(1-p)$ |
| Geometric$(p)$ | $(1-p)^{k-1}p$, $k = 1, 2,\dots$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson$(\lambda)$ | $e^{-\lambda}\frac{\lambda^k}{k!}$, $k = 0,1,\dots$ | $\lambda$ | $\lambda$ |
| Uniform$[a,b]$ | $\frac{1}{b-a}$ on $[a,b]$ | $\frac{a+b}2$ | $\frac{(b-a)^2}{12}$ |
| Exponential$(\lambda)$ | $\lambda e^{-\lambda x}$, $x\ge0$; $P(X>x) = e^{-\lambda x}$ | $\frac1\lambda$ | $\frac1{\lambda^2}$ |
| Normal $\mathcal N(\mu,\sigma^2)$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |

**7. Function of one random variable (L8).** Find the CDF of $Y = g(X)$ first, $F_Y(y) = P(g(X)\le y)$, then differentiate. If $g$ is monotone with inverse $h$: $f_Y(y) = f_X(h(y))\,|h'(y)|$.

**8. Two series you will need.** For $|r|<1$:
$$\sum_{k=0}^\infty r^k = \frac{1}{1-r},\qquad \sum_{k=1}^\infty k\,r^{k-1} = \frac{1}{(1-r)^2},\qquad \sum_{k=0}^\infty k\,r^{k} = \frac{r}{(1-r)^2}.$$



# Lecture 9: Right-continuity of the CDF, mixed random variables, joint PMFs (Deck 1, slides 2 to 11)

**The big picture.** So far every random variable lived alone. This lecture finishes the story of a single random variable (why the CDF is right-continuous, and what to do when a variable is neither discrete nor continuous) and then starts the main theme of L9 to L13: **several random variables defined on the same experiment**. The key objects are the joint PMF and the marginals.

**Read alongside:** Bertsekas §2.5 (joint PMFs) and Problem 3.9 (mixed random variables); probabilitycourse.com §4.3.1 (mixed random variables) and §5.1.1 (joint PMFs).

## Part A: the slides

### Slide 2/26: This lecture

> **On the slide.** Right-continuity of CDF. Mixed random variables. Multiple random variables.

### Slide 3/26: For a random variable $X$, its CDF satisfies the following

> **On the slide.**
>
> - $F_X(\infty) = 1$ and $F_X(-\infty) = 0$ when $P(-\infty < X < \infty) = 1$.
> - $F_X:\mathbb R\to[0,1]$ is **non-decreasing and right continuous**.
> - At a point of discontinuity $x$ we have (1) the right-hand limit $F_X(x+) := \lim_{\epsilon\downarrow0}F_X(x+\epsilon)$; (2) the left-hand limit $F_X(x-) := \lim_{\epsilon\uparrow 0}F_X(x - \epsilon)$; (3) $F_X(x-)\ne F_X(x+)$; (4) $F_X(x)$ could be set to either of the two. Which one?
> - Right continuity mandates that at a point of discontinuity we have $F_X(x) = F_X(x+)$.
> - By default, $F_X(x) = F_X(x+) = F_X(x-)$ if $F_X$ is continuous at $x$.

**What "$F_X(\pm\infty)$" means.** $F_X(\infty)$ is shorthand for $\lim_{x\to\infty}F_X(x)$. The condition $P(-\infty<X<\infty) = 1$ just says $X$ is a genuine real number (it never "escapes to infinity").

**Answer to "which one?".** Because $F_X(x) = P(X\le x)$ uses "$\le$", the point $x$ itself is *included*. So the value at a jump is the **top** of the jump, the right-hand limit:
$$F_X(x) = F_X(x+),\qquad F_X(x-) = P(X<x),\qquad \boxed{F_X(x) - F_X(x-) = P(X = x)} .$$
The size of a jump is exactly the probability sitting at that point. A continuous CDF has no jumps, which is why $P(X = a) = 0$ for continuous variables.

**Example.** A fair die: $F_X(3) = P(X\le3) = \frac36$, while $F_X(3-) = P(X<3) = P(X\le2) = \frac26$. The jump at 3 is $\frac16 = P(X = 3)$. When you draw a staircase CDF, the filled dot goes on the **upper** step at each jump.

### Slide 4/26: Right-continuity, proof that $F_X$ is non-decreasing

> **On the slide.** Consider $a<b$. We want to show $F_X(a)\le F_X(b)$. Define $A := \{\omega: X(\omega)\le a\}$ and $B := \{\omega: X(\omega)\le b\}$. Easy to see that $A\subseteq B$, hence $\mathbb P(A)\le\mathbb P(B)$. So $F_X(a) = P_X((-\infty, a]) = \mathbb P(A)\le\mathbb P(B) = F_X(b)$.

**Why $A\subseteq B$.** If $X(\omega)\le a$ and $a<b$ then $X(\omega)\le b$. **Why $\mathbb P(A)\le\mathbb P(B)$.** Write $B = A\cup(B\setminus A)$ as a disjoint union, so $\mathbb P(B) = \mathbb P(A) + \mathbb P(B\setminus A)\ge\mathbb P(A)$ (monotonicity of probability, L2).

### Slide 5/26: Right-continuity, the proof

> **On the slide.** We want to prove $F_X(x) = F_X(x+)$. Consider a sequence $\{x_n\}$ decreasing to $x$, so $F_X(x+) = \lim_{x_n\downarrow x}F_X(x_n)$. Define $A_n := \{\omega: X(\omega)\le x_n\}$ and $A := \{\omega: X(\omega)\le x\}$. Is $A_n\uparrow A$ or $A_n\downarrow A$? Clearly $A_n\downarrow A$. From continuity of probability, $\lim_n\mathbb P(A_n) = \mathbb P(A)$. This implies $\lim_{x_n\downarrow x}F_X(x_n) = F_X(x)$. You cannot prove the other way by considering $x_n\uparrow x$ because $\bigcup_n(-\infty, x_n] = (-\infty, x)$ and $P_X(-\infty, x)\ne F_X(x)$.

**Why $A_n\downarrow A$.** Since $x_n$ decreases, $A_1\supseteq A_2\supseteq\cdots$. Their intersection is $\{X\le x_n \text{ for every } n\}$. A number that is $\le x_n$ for all $n$ is $\le\lim x_n = x$, and conversely. So $\bigcap_n A_n = \{X\le x\} = A$.

**Why the left side fails.** Take $x_n\uparrow x$ (strictly below $x$). Then $A_n = \{X\le x_n\}$ increases, and the union is $\{X<x\}$, **not** $\{X\le x\}$: the point $x$ itself is never reached. Continuity of probability gives $F_X(x-) = P(X<x)$, which differs from $F_X(x)$ by $P(X = x)$. That is the whole asymmetry: "$\le$" in the definition of the CDF makes it right-continuous, not left-continuous.

**Exam tip.** A favourite short question is "prove that a CDF is right-continuous" or "show that $P(X<x) = F_X(x-)$". Both are this slide: pick the right monotone sequence of events and apply continuity of probability.

### Slide 5/26 (section title): Mixed random variables

### Slide 6/26: Mixed random variables

> **On the slide.** Random variables that are neither continuous nor discrete are called mixed random variables. Their CDF is partly continuous and partly piecewise continuous (has jumps). Example: $X$ is a $\mathcal U[0,1]$ random variable and $Y = X$ if $X\le0.5$ and $Y = 0.5$ if $X>0.5$. What is the CDF and PDF of $Y$?

**Solution.** $Y = \min(X, 0.5)$. All the probability of $\{X>0.5\}$, which is $\frac12$, gets piled onto the single point $0.5$.

- $y<0$: $F_Y(y) = 0$.
- $0\le y<0.5$: $Y\le y$ happens only when $X\le y$ (since $Y = X$ there), so $F_Y(y) = P(X\le y) = y$.
- $y\ge0.5$: $Y$ is always $\le0.5\le y$, so $F_Y(y) = 1$.
$$F_Y(y) = \begin{cases}0 & y<0\\ y & 0\le y<0.5\\ 1 & y\ge0.5\end{cases}$$
The CDF climbs continuously from 0 to $0.5$, then **jumps** from $0.5$ to $1$ at $y = 0.5$. The jump size is $P(Y = 0.5) = P(X>0.5) = 0.5$, and the value at the jump is the top, as slide 3 requires.

*The "PDF".* There is no ordinary PDF, because of the jump. Using a Dirac delta to represent the point mass:
$$f_Y(y) = \underbrace{1\cdot\mathbf 1\{0\le y<0.5\}}_{\text{continuous part, total mass }0.5} + \underbrace{0.5\,\delta(y - 0.5)}_{\text{point mass}} .$$
*Mean.* $E[Y] = \int_0^{0.5}y\cdot1\,dy + 0.5\times0.5 = 0.125 + 0.25 = 0.375$. (Check by LOTUS on $X$: $E[\min(X, 0.5)] = \int_0^{0.5}x\,dx + \int_{0.5}^1 0.5\,dx = 0.125 + 0.25$. ✓)

### Slide 7/26: Mixed random variables, expectation

> **On the slide.** Let $F_Y(y) = C(y) + D(y)$, where $C(y)$ corresponds to the continuous part and $D(y)$ to the discontinuous part. Then
> $$E[Y] = \int_{-\infty}^\infty y\,c(y)\,dy + \sum_{y_k}y_k\,P(Y = y_k),$$
> where $\{y_1, y_2,\dots\}$ are the jump points of $D(y)$, with $P(Y = y_k)>0$, and $c(y) = C'(y)$. See section 4.3.1 of probabilitycourse.com. Example: the amount of pending workload on a server. A server on a cluster may be idle with a finite probability; if busy, the pending work is a continuous random variable.

**How to split a mixed CDF.** $D(y)$ is the staircase made of the jumps: $D(y) = \sum_{y_k\le y}P(Y = y_k)$. Whatever is left, $C(y) = F_Y(y) - D(y)$, is continuous and non-decreasing; its derivative $c(y)$ is the "continuous density". Note that $C(\infty) + D(\infty) = 1$, so **neither part integrates to 1 on its own**. In the slide 6 example, $D(y) = 0.5\cdot\mathbf 1\{y\ge0.5\}$, $C(y) = \min(\max(y,0), 0.5)$, $c(y) = 1$ on $[0, 0.5)$.

**Recipe for any mixed question.**

1. Find the point masses $P(Y = y_k)$ (usually from a "with probability ..." clause or from a $\min$/$\max$ that clips).
2. Find the continuous density $c(y)$ on the rest.
3. Check: $\sum_k P(Y = y_k) + \int c(y)\,dy = 1$.
4. $E[g(Y)] = \int g(y)c(y)\,dy + \sum_k g(y_k)P(Y = y_k)$.

**The server example, made concrete.** Suppose the server is idle with probability $0.3$ (pending work $W = 0$), and when busy the pending work is Exponential(2). Then $P(W = 0) = 0.3$, $c(w) = 0.7\cdot2e^{-2w}$ for $w>0$, $F_W(w) = 0.3 + 0.7(1 - e^{-2w})$ for $w\ge0$, and $E[W] = 0\cdot0.3 + 0.7\cdot\frac12 = 0.35$.

### Slide 7/26 (section title): Multiple random variables

### Slide 8/26: A running example

> **On the slide.** Consider an experiment of tossing a coin and a die together. $\Omega = \{0,1\}\times\{1,2,3,4,5,6\}$, $\mathcal F = 2^\Omega$, $\mathbb P(\omega) = \frac1{12}$. Let $X$ and $Y$ denote the random variables depicting the outcome of the coin and the die respectively. For $\omega = (1, 5)$ we have $X(\omega) = 1$ and $Y(\omega) = 5$. We are now interested in the joint PMF $p_{XY}(x,y)$ and joint CDF $F_{XY}(x,y)$ of $X$ and $Y$ together.

**The point.** $X$ and $Y$ are two functions on the **same** $\Omega$. Each $\omega$ produces a pair $(X(\omega), Y(\omega))$. Knowing $p_X$ and $p_Y$ separately does not tell you how they behave together (for example whether a head tends to come with a 6). The joint distribution does.

### Slide 9/26: An example

> **On the slide.** $p_{XY}(x,y) := \mathbb P\{\omega\in\Omega: X(\omega) = x\text{ and }Y(\omega) = y\}$. $F_{XY}(x,y) := \mathbb P\{\omega: X(\omega)\le x\text{ and }Y(\omega)\le y\}$. We can use the PMF to calculate $P((X,Y)\in A)$: $P((X,Y)\in A) = \mathbb P\{\omega: (X(\omega), Y(\omega))\in A\}$, therefore $P((X,Y)\in A) = \sum_{(x,y)\in A}p_{XY}(x,y)$. Suppose $A$ is the event that you get a head and the roll is even. What is $P((X,Y)\in A)$?

**Answer.** $A = \{(1,2), (1,4), (1,6)\}$, each with joint probability $\frac1{12}$, so $P((X,Y)\in A) = \frac3{12} = \frac14$.

**Why the sum formula holds.** The events $\{X = x, Y = y\}$ for different pairs $(x,y)$ are disjoint (each $\omega$ gives one pair), and $\{(X,Y)\in A\}$ is their union over $(x,y)\in A$. Countable additivity does the rest.

**The joint PMF as a table.** For two discrete variables, always draw the table: rows for $x$, columns for $y$, entries $p_{XY}(x,y)$. Here it is a $2\times6$ table with every entry $\frac1{12}$. Probabilities of events are sums of cells; marginals are row and column sums (next slide).

### Slide 10/26: Marginals

> **On the slide.** What is $p_{XY}(1, i)$? ($=\frac1{12}$.) $\sum_i p_{XY}(1,i) = \mathbb P\{\omega: X(\omega) = 1\} = \frac12 = p_X(1)$. Similarly $p_{XY}(1,i) + p_{XY}(0,i) = \frac16 = p_Y(i)$.
> **The marginal PMFs $p_X$ and $p_Y$ can be obtained from the joint PMF as follows:** $p_X(x) = \sum_y p_{XY}(x,y)$ and $p_Y(y) = \sum_x p_{XY}(x,y)$. This is true in general, and requires a proof.

**In the table picture:** $p_X$ is the row sums, $p_Y$ the column sums, written in the margins of the table, hence the name.

**Warning.** The marginals do **not** determine the joint. Example: $X$ and $Y$ both Bernoulli$(\frac12)$. Joint 1: all four cells $\frac14$ (independent coins). Joint 2: $p(0,0) = p(1,1) = \frac12$ (so $Y = X$). Joint 3: $p(0,1) = p(1,0) = \frac12$ (so $Y = 1 - X$). Same marginals, three completely different joints. Going joint $\to$ marginal is always possible; marginal $\to$ joint needs extra information (such as independence, L10).

### Slide 11/26: Marginals, the proof

> **On the slide.**
> $$\begin{aligned}p_X(x) &= \mathbb P\{\omega: X(\omega) = x\} \\  &= \mathbb P\Big\{\bigcup_y\{\omega: X(\omega) = x, Y(\omega) = y\}\Big\} \\  &= \sum_y\mathbb P\{\omega: X(\omega) = x, Y(\omega) = y\}.\end{aligned}$$

**Line by line.** (1) Definition of the PMF. (2) $Y$ takes *some* value, so $\{X = x\}$ splits according to which value $Y$ took. (3) The pieces $\{X = x, Y = y\}$ for different $y$ are disjoint, and $Y$ takes countably many values, so countable additivity applies. This is just the **total probability theorem** with the partition $\{Y = y\}_y$.

## Part B: extra worked examples and problems

**B1 (Bertsekas Problem 3.9 idea; probabilitycourse.com §4.3.1).** $X\sim\mathcal U[-1, 1]$ and $Y = \max(X, 0)$. Find $F_Y$, the point masses, and $E[Y]$, $E[Y^2]$.

*Solution.* $Y = 0$ whenever $X\le0$, so $P(Y = 0) = \frac12$. For $0\le y\le1$: $F_Y(y) = P(X\le y) = \frac{y+1}{2}$. So $F_Y(y) = 0$ for $y<0$, $\frac{1+y}2$ for $0\le y<1$, $1$ for $y\ge1$; a jump of $\frac12$ at 0, then slope $\frac12$. Continuous density $c(y) = \frac12$ on $(0,1)$.
$$E[Y] = 0\cdot\tfrac12 + \int_0^1 y\cdot\tfrac12\,dy = \tfrac14,\qquad E[Y^2] = \int_0^1y^2\cdot\tfrac12\,dy = \tfrac16,\qquad\operatorname{Var}(Y) = \tfrac16 - \tfrac1{16} = \tfrac{5}{48}.$$

**B2 (last year's HW5 Q1).** With probability $0.4$, $Y = 2$; with probability $0.6$, $Y\sim$ Exp(1). Find $P(Y\ge1)$ and the CDF of $Y$.

*Solution.* Condition on which case happens (total probability).
$$P(Y\ge1) = 0.4\cdot1 + 0.6\cdot e^{-1}\approx0.4 + 0.2207 = 0.6207 .$$
CDF: $P(Y\le y) = 0.4\,\mathbf 1\{y\ge2\} + 0.6(1 - e^{-y})$ for $y\ge0$, i.e.
$$F_Y(y) = \begin{cases}0 & y<0\\ 0.6(1 - e^{-y}) & 0\le y<2\\ 0.4 + 0.6(1 - e^{-y}) & y\ge2\end{cases}$$
with a jump of $0.4$ at $y = 2$. ($E[Y] = 0.4\cdot2 + 0.6\cdot1 = 1.4$.)

**B3 (last year's HW5 Q7; also probabilitycourse.com §4.3.1).** $f_X(x) = 2x$ on $[0,1]$, and $Y = X$ if $X\le\frac12$, $Y = \frac12$ if $X>\frac12$. Find the CDF of $Y$.

*Solution.* Same shape as slide 6. For $0\le y<\frac12$: $F_Y(y) = P(X\le y) = y^2$. For $y\ge\frac12$: $F_Y(y) = 1$. So
$$F_Y(y) = \begin{cases}0 & y<0\\ y^2 & 0\le y<\frac12\\ 1 & y\ge\frac12\end{cases}$$
with a jump of $1 - \frac14 = \frac34 = P(X>\frac12)$ at $y = \frac12$. ($E[Y] = \int_0^{1/2}y\cdot2y\,dy + \frac12\cdot\frac34 = \frac1{12} + \frac38 = \frac{11}{24}$.)

**B4 (last year's Tutorial 4 Q7, the taxi and the bus).** With probability $\frac12$ a taxi is waiting (wait $X = 0$). Otherwise the next taxi comes at $T\sim\mathcal U[0,8]$ minutes and the bus comes at exactly 5 minutes; you take whichever comes first. Find the CDF of $X$ and $E[X]$.

*Solution.* With no taxi waiting, $X = \min(T, 5)$. Point masses: $P(X = 0) = \frac12$ and $P(X = 5) = \frac12P(T>5) = \frac12\cdot\frac38 = \frac3{16}$. Continuous part on $(0,5)$: density $\frac12\cdot\frac18 = \frac1{16}$. Check: $\frac12 + \frac3{16} + 5\cdot\frac1{16} = 1$. ✓
$$F_X(x) = \begin{cases}0 & x<0\\ \frac12 + \frac{x}{16} & 0\le x<5\\ 1 & x\ge5\end{cases}\qquad E[X] = \int_0^5\frac{x}{16}\,dx + 5\cdot\frac3{16} = \frac{25}{32} + \frac{30}{32} = \frac{55}{32}\approx1.72\text{ min}.$$

**B5 (last year's Tutorial 5 Q4, producer and consumer).** A producer makes $b$ items with probability $p$ and nothing otherwise; the consumer tries to take $T\sim$ Exp$(\lambda)$ items. Items consumed: $C = 0$ if nothing is produced, else $\min(T, b)$. Find the distribution of $C$ and $E[C]$.

*Solution.* Point masses: $P(C = 0) = 1 - p$ (the event $T = 0$ has probability 0), and $P(C = b) = p\,P(T\ge b) = pe^{-\lambda b}$. Continuous part on $(0, b)$: $c(t) = p\lambda e^{-\lambda t}$. Check: $(1-p) + pe^{-\lambda b} + p(1 - e^{-\lambda b}) = 1$. ✓
$$E[C] = p\,E[\min(T,b)] = p\Big(\int_0^b t\lambda e^{-\lambda t}dt + b e^{-\lambda b}\Big) = p\int_0^b P(T>t)\,dt = \frac{p(1 - e^{-\lambda b})}{\lambda}.$$
(The middle step uses the tail formula $E[W] = \int_0^\infty P(W>t)\,dt$ for $W\ge0$, last year's Tutorial 4 Q3, with $P(\min(T,b)>t) = e^{-\lambda t}$ for $t<b$ and 0 after.)

**B6 (last year's HW4 Q8(b), a mixed variable in disguise).** A dart lands uniformly in a disc of radius $r$; $X$ is its distance from the centre, so $F_X(x) = \frac{x^2}{r^2}$ on $[0,r]$. Score: $S = \frac1X$ if $X\le t$ (with $t<r$), else $S = 0$. Find $F_S$. Is $S$ continuous?

*Solution.* $P(S = 0) = P(X>t) = 1 - \frac{t^2}{r^2}$, a point mass, so $S$ is **not** continuous: it is mixed. When $X\le t$, $S = \frac1X\ge\frac1t$. So $F_S(s) = 0$ for $s<0$, $F_S(s) = 1 - \frac{t^2}{r^2}$ for $0\le s<\frac1t$, and for $s\ge\frac1t$:
$$F_S(s) = P(S = 0) + P\big(\tfrac1s\le X\le t\big) = 1 - \frac{t^2}{r^2} + \frac{t^2 - 1/s^2}{r^2} = 1 - \frac{1}{s^2r^2}.$$

**B7 (Bertsekas Problem 2.24, the stock trader).** $(X, Y)$ is uniform over the integer pairs with $-2\le x\le4$ and $-1\le y - x\le1$. (a) Find the marginal PMFs and the means. (b) The trader holds 100 shares of A and 200 of B; find the mean profit $100X + 200Y$.

*Solution.* For each of the 7 values of $x$ there are 3 values of $y$ ($x-1, x, x+1$): 21 equally likely points, each $\frac1{21}$. (a) $p_X(x) = \frac3{21} = \frac17$ for $x = -2,\dots,4$, so $E[X] = 1$. $Y$ ranges over $-3,\dots,5$; count the points in each column: $y = -3$ and $5$: 1 point each; $y = -2$ and $4$: 2 each; $y = -1,\dots,3$: 3 each. So $p_Y = \frac1{21}(1,2,3,3,3,3,3,2,1)$, symmetric about 1, and $E[Y] = 1$. (b) By linearity (L10 slide 21), $E[100X + 200Y] = 100 + 200 = 300$.

**B8 (last year's Tutorial 5 Q1).** $p_{XY}(x,y) = \frac{1}{2^{x+y}}$ for $x,y = 1,2,3,\dots$ Find the marginals. Are $X$, $Y$ independent? Find $P(X^2 + Y\le10)$.

*Solution.* $p_X(x) = \sum_{y\ge1}2^{-x}2^{-y} = 2^{-x}\cdot1 = (\frac12)^x$: Geometric$(\frac12)$. Same for $Y$. Since $p_{XY} = p_Xp_Y$ for every pair, they are independent (L10). For the event, list $x$ (only $x\le3$ works, since $x = 4$ needs $Y\le-6$):
$$P = \tfrac12P(Y\le9) + \tfrac14P(Y\le6) + \tfrac18P(Y\le1) = \tfrac12(1 - 2^{-9}) + \tfrac14(1 - 2^{-6}) + \tfrac1{16} = \tfrac{827}{1024}\approx0.808 .$$

**B9 (last year's HW5 Q4, two coins).** A box has a fair coin and a coin with $P(H) = \frac23$. Pick one at random and toss it ($X$), then toss the other one ($Y$). Find $p_{XY}$. Are $X$ and $Y$ independent?

*Solution.* Condition on which coin goes first (each with probability $\frac12$):
$$p_{XY}(1,1) = \tfrac12\big(\tfrac12\cdot\tfrac23\big) + \tfrac12\big(\tfrac23\cdot\tfrac12\big) = \tfrac13,\quad p_{XY}(1,0) = \tfrac12\cdot\tfrac12\cdot\tfrac13 + \tfrac12\cdot\tfrac23\cdot\tfrac12 = \tfrac14,$$
$$p_{XY}(0,1) = \tfrac14\ \text{(by symmetry)},\qquad p_{XY}(0,0) = \tfrac12\cdot\tfrac12\cdot\tfrac13 + \tfrac12\cdot\tfrac13\cdot\tfrac12 = \tfrac16 .$$
Marginals: $p_X(1) = \frac13 + \frac14 = \frac7{12} = p_Y(1)$. Then $p_X(1)p_Y(1) = \frac{49}{144}\ne\frac{48}{144} = p_{XY}(1,1)$: **not independent** (only slightly). Intuition: a head on the first toss makes it a bit more likely that the biased coin went first, so the second coin is more likely to be the fair one.


# Lecture 10: Independence, joint PDFs, functions of two variables, covariance (Deck 1, slides 12 to 26)

**The big picture.** With the joint PMF in hand, this lecture asks four questions. When are $X$ and $Y$ *independent*? How do we do the same things for *continuous* pairs (joint CDF and joint PDF)? How do we compute $E[g(X,Y)]$ and the distribution of $Z = g(X,Y)$ (with $\max$ and $\min$ as the key example)? And how do we measure how two variables move together (*covariance*)?

**Read alongside:** Bertsekas §2.5 to 2.7, §3.4 and §4.2; probabilitycourse.com §5.1 (two discrete variables), §5.2 (two continuous variables) and §5.3.1 (covariance and correlation).

## Part A: the slides

### Slide 12/26: Independence

> **On the slide.** Back with the running example of coin and die. Write down $p_{XY}(x,y)$ and $F_{XY}(x,y)$. Notice that $p_{XY}(1,i) = p_X(1)p_Y(i)$ and $F_{XY}(1,i) = F_X(1)F_Y(i)$. In general, if $p_{XY}(x,y) = p_X(x)p_Y(y)$ and $F_{XY}(x,y) = F_X(x)F_Y(y)$ we say $X$ and $Y$ are independent.
> **Two random variables $X$ and $Y$ are independent if** $p_{XY}(x,y) = p_X(x)p_Y(y)$ and $F_{XY}(x,y) = F_X(x)F_Y(y)$.

**Writing them down.** $p_{XY}(x,y) = \frac1{12}$ for $x\in\{0,1\}$, $y\in\{1,\dots,6\}$, and $0$ otherwise. For the CDF, count the cells to the lower-left of $(x, y)$:
$$F_{XY}(x,y) = F_X(x)\,F_Y(y),\qquad F_X(x) = \begin{cases}0 & x<0\\ \frac12 & 0\le x<1\\ 1 & x\ge1\end{cases},\qquad F_Y(y) = \begin{cases}0 & y<1\\ \frac{\lfloor y\rfloor}{6} & 1\le y<6\\ 1 & y\ge6\end{cases}$$
For example $F_{XY}(0, 3.5) = P(X = 0, Y\le3) = \frac3{12} = \frac12\cdot\frac36$. ✓

**"For all $x, y$".** Independence needs the product rule at **every** pair $(x,y)$. One failure is enough to make them dependent; one success proves nothing. (For discrete variables, the PMF condition and the CDF condition are equivalent, so checking one is enough.)

**A fast test from the table.** $p_{XY} = p_Xp_Y$ for all cells means every row of the joint table is proportional to every other row. If a cell is $0$ while its row and column sums are both positive, the variables are dependent immediately (the product would be positive).

### Slide 13/26: Independence and $\mathbb P(A\cap B) = \mathbb P(A)\mathbb P(B)$

> **On the slide.** How does this relate to $\mathbb P(A\cap B) = \mathbb P(A)\mathbb P(B)$? Take $A = \{\omega: X(\omega)\le x\}$ and $B = \{\omega: Y(\omega)\le y\}$. Then $F_{XY}(x,y) := \mathbb P\{\omega: X(\omega)\le x\text{ and }Y(\omega)\le y\} = \mathbb P(A\cap B)$.

**So** $F_{XY}(x,y) = F_X(x)F_Y(y)$ says exactly that the events $\{X\le x\}$ and $\{Y\le y\}$ are independent events (L3), for every choice of $x$ and $y$. Similarly $p_{XY}(x,y) = p_X(x)p_Y(y)$ says $\{X = x\}$ and $\{Y = y\}$ are independent events. Independence of random variables = independence of *every* event about $X$ from *every* event about $Y$. A consequence (last year's HW5 Q11): if $X$ and $Y$ are independent then so are $g(X)$ and $h(Y)$ for any functions $g, h$, because $\{g(X) = a\} = \{X\in g^{-1}(a)\}$ is an event about $X$.

### Slide 14/26: $E[XY]$

> **On the slide.** $E[X] = \sum_x x\,p_X(x)$ and $E[Y] = \sum_y y\,p_Y(y)$. Also $E[X] = \sum_x\sum_y x\,p_{XY}(x,y)$ and $E[Y] = \sum_x\sum_y y\,p_{XY}(x,y)$. How do we define $E[XY]$? You want to search over all values $X\times Y$ can take ($\{1,2,\dots,6\}$) and weight it by the corresponding probabilities. $E[XY] = \sum_x\sum_y xy\,p_{XY}(x,y) = 1.75 = E[X]E[Y]$.
> **If $X$ and $Y$ are independent, $E[XY] = E[X]E[Y]$.**

**Why $E[X] = \sum_x\sum_y x\,p_{XY}(x,y)$.** Do the inner sum first: $\sum_y p_{XY}(x,y) = p_X(x)$ (marginal, L9). So it collapses to $\sum_x x\,p_X(x)$.

**The number 1.75.** $XY = 0$ when the coin is tails and $XY = Y$ when it is heads, so $E[XY] = \sum_{i=1}^6 i\cdot\frac1{12} = \frac{21}{12} = 1.75$. And $E[X]E[Y] = \frac12\cdot\frac72 = 1.75$. ✓

**Proof of the boxed fact.** If $p_{XY}(x,y) = p_X(x)p_Y(y)$, the double sum factorises:
$$E[XY] = \sum_x\sum_y xy\,p_X(x)p_Y(y) = \Big(\sum_x x\,p_X(x)\Big)\Big(\sum_y y\,p_Y(y)\Big) = E[X]\,E[Y].$$
The same argument gives $E[g(X)h(Y)] = E[g(X)]\,E[h(Y)]$ for independent $X$, $Y$. **The converse is false**: $E[XY] = E[X]E[Y]$ does not imply independence (see L12 slide 14 and B8 below).

### Slide 15/26: Example where $X$ and $Y$ are dependent

> **On the slide.** Now consider rolling a die. $X = 1$ if the outcome is odd, 0 otherwise; $Y = 1$ if the outcome is even, 0 otherwise. What is $p_X(x)$, $p_Y(y)$, $p_{XY}(x,y)$ and $F_{XY}(x,y)$? What is $E[XY]$?

**Solution.** $Y = 1 - X$ always. $p_X(0) = p_X(1) = \frac12$, and the same for $Y$. The joint table:

| | $Y = 0$ | $Y = 1$ |
|---|---|---|
| $X = 0$ | 0 | $\frac12$ |
| $X = 1$ | $\frac12$ | 0 |

Joint CDF: $F_{XY}(x,y) = 0$ if $x<0$ or $y<0$; $= p_{XY}(0,0) = 0$ if $0\le x<1$, $0\le y<1$; $=\frac12$ if exactly one of $x, y$ is $\ge1$ and the other is in $[0,1)$; $= 1$ if $x\ge1$ and $y\ge1$.

$E[XY] = 0$, because $XY = 0$ always (a number cannot be both odd and even). But $E[X]E[Y] = \frac14$. So $E[XY]\ne E[X]E[Y]$, which proves they are dependent. Also $p_{XY}(0,0) = 0\ne\frac14 = p_X(0)p_Y(0)$ and $F_{XY}(0,0) = 0\ne F_X(0)F_Y(0) = \frac14$. Covariance (slide 25): $\operatorname{Cov}(X,Y) = 0 - \frac14 = -\frac14$, negative because when one is up the other is down.

### Slide 16/26: Consistency conditions

> **On the slide.** $\sum_{x,y}p_{XY}(x,y) = 1$. $F_{XY}(\infty,\infty) = 1$. $F_{XY}(-\infty,-\infty) = 0$. $F_{XY}(-\infty,\infty) = 0$. $F_{XY}(\infty,-\infty) = 0$. $F_{XY}(x,\infty) = F_X(x)$ (marginal CDF). $F_{XY}(\infty,y) = F_Y(y)$ (marginal CDF).

**Why.** $F_{XY}(x, \infty) = P(X\le x, Y<\infty) = P(X\le x)$, because "$Y<\infty$" is always true. If either argument is $-\infty$ the event is impossible, so the CDF is $0$. All limits are justified by continuity of probability, as in L9.

**One more property you need (not on the slide).** The probability of a rectangle:
$$P(a<X\le b,\ c<Y\le d) = F(b,d) - F(a,d) - F(b,c) + F(a,c).$$
(Inclusion-exclusion: take the big lower-left quadrant at $(b,d)$, remove the two quadrants at $(a,d)$ and $(b,c)$, add back the doubly-removed one at $(a,c)$.) This is why a valid joint CDF must give a non-negative value here, which is stronger than being non-decreasing in each variable.

### Slide 17/26: Multiple continuous random variables

> **On the slide.** Pick a point uniformly at random from a unit square centred at $(.5, .5)$. Random variables $X$ and $Y$ represent the $x$ and $y$ coordinates of the point chosen. $F_{X,Y}(x,y)$ denotes the probability that the point chosen lies below and to the left of $(x,y)$. In this example, $F_{X,Y}(x,y) = xy$. Now visualise $F_{X,Y}(x+h, y) - F_{X,Y}(x,y)$. This is the probability that the point lies in the thin strip below $y$ and between $x$ and $x+h$.

**Uniform means area.** For a uniform point in a region of area 1, the probability of any subregion is its area. "Below and to the left of $(x,y)$", inside the square, is an $x\times y$ rectangle, so $F_{XY}(x,y) = xy$ for $0\le x,y\le1$. In full, $F_{XY}(x,y) = \tilde x\,\tilde y$ with $\tilde x = \min(\max(x,0),1)$, and the same for $\tilde y$.

### Slide 18/26: Multiple continuous random variables (rate in $x$)

> **On the slide.** $F_{X,Y}(x+h, y) - F_{X,Y}(x,y)$ is the probability that the point lies in the thin strip below $y$ and between $x$ and $x + h$. $\frac{\partial F_{XY}(x,y)}{\partial x} = \lim_{h\to0}\frac{F_{X,Y}(x+h,y) - F_{X,Y}(x,y)}{h}$. This is the rate of change of the joint CDF in the $x$ direction.

### Slide 19/26: Multiple continuous random variables (the joint PDF)

> **On the slide.** $\frac{\partial F_{XY}(x,y)}{\partial y} = \lim_{h\to0}\frac{F_{X,Y}(x, y+h) - F_{X,Y}(x,y)}{h}$ denotes the rate of change in the $y$ direction. $f_{X,Y}(x,y) := \frac{\partial^2F_{XY}(x,y)}{\partial x\,\partial y}$ is the joint probability density function. $f_{X,Y}(x,y)\,dx\,dy$ denotes the probability that $(X,Y)$ lies in a rectangle of area $dx\,dy$ around $(x,y)$. In this example $f_{X,Y}(x,y) = 1$. $F_{XY}(x,y) := \int_{-\infty}^x\int_{-\infty}^y f_{XY}(s,t)\,ds\,dt$.

**How to think of the joint PDF.** It is probability per unit **area**. Probabilities of regions are double integrals:
$$\boxed{P((X,Y)\in A) = \iint_A f_{XY}(x,y)\,dx\,dy},\qquad f_{XY}\ge0,\qquad \iint_{\mathbb R^2}f_{XY} = 1 .$$
In the square example, $\frac{\partial^2}{\partial x\partial y}(xy) = 1$ inside the square and $0$ outside.

**The 90% skill: drawing the region.** Almost every joint-PDF problem is "integrate $f$ over a region". Always sketch the support of $f$ and the region $A$, then choose the order of integration so the limits are easy.

**Example (last year's Tutorial 5 Q8).** $f_{XY}(x,y) = x + y$ on $[0,1]^2$. Find $P(X>Y\mid X<\frac12)$.
$$P(X<\tfrac12) = \int_0^{1/2}\!\!\int_0^1(x+y)\,dy\,dx = \int_0^{1/2}\big(x + \tfrac12\big)dx = \tfrac18 + \tfrac14 = \tfrac38,$$
$$\begin{gathered}P(Y<X<\tfrac12) = \int_0^{1/2}\!\!\int_0^x(x+y)\,dy\,dx = \int_0^{1/2}\tfrac32x^2\,dx = \tfrac1{16} \\[3pt] P(X>Y\mid X<\tfrac12) = \frac{1/16}{3/8} = \frac16 .\end{gathered}$$

### Slide 20/26: Summary for continuous random variables

> **On the slide.** $f_{XY}(x,y)$ denotes the joint pdf for $X$ and $Y$. $F_{XY}(x,y) := \int_{-\infty}^x\int_{-\infty}^y f_{XY}(s,t)\,ds\,dt$ and $f_{X,Y}(x,y) := \frac{\partial^2F_{XY}}{\partial x\partial y}$.
> **The marginal pdfs** $f_X$ and $f_Y$ can be obtained from the joint pdf: $f_X(x) = \int_{-\infty}^\infty f_{XY}(x,y)\,dy$ and $f_Y(y) = \int_{-\infty}^\infty f_{XY}(x,y)\,dx$.
> **Two random variables $X$ and $Y$ are independent if** $f_{XY}(x,y) = f_X(x)f_Y(y)$, $F_{XY}(x,y) = F_X(x)F_Y(y)$ and $E[XY] = E[X]E[Y]$.
> Rules similar for more than 2 random variables.

**Marginals: "integrate out" the other variable.** Watch the limits: if the support is not a rectangle, the limits of the inner integral depend on the outer variable.

**Careful with the independence box.** The *definition* is $f_{XY} = f_Xf_Y$ for all $(x,y)$ (equivalently, $F_{XY} = F_XF_Y$). $E[XY] = E[X]E[Y]$ is a *consequence*, not part of the definition, and on its own it does not imply independence.

**Fast independence test for continuous pairs.** $X$ and $Y$ are independent exactly when $f_{XY}(x,y) = g(x)h(y)$ for some functions $g, h$ **and the support is a product set** (a rectangle, possibly infinite). Two classic traps:

- $f = 2$ on the triangle $0\le y\le x\le1$: the formula "$2$" factorises, but the support is a triangle, so they are dependent (knowing $x$ restricts $y$ to $[0, x]$).
- $f = x + y$ on $[0,1]^2$: the support is a square, but $x + y$ does not factorise, so they are dependent.

**Example (last year's Tutorial 5 Q3).** $f_{XY} = 6e^{-(2x+3y)}$ for $x,y\ge0$. This is $2e^{-2x}\cdot3e^{-3y}$ on a product set, so $X\sim$ Exp(2) and $Y\sim$ Exp(3) are independent. Hence $E[Y\mid X>2] = E[Y] = \frac13$ (information about $X$ tells you nothing about $Y$).

### Slide 21/26: Towards $E[g(X,Y)]$

> **On the slide.** What about $E[aX + bY + c]$?
> $$\begin{aligned}E[aX + bY + c] &= \sum_{x,y}(ax + by + c)p_{XY}(x,y) \\  &= a\sum_{x,y}x\,p_{XY}(x,y) + b\sum_{x,y}y\,p_{XY}(x,y) + c\sum_{x,y}p_{XY}(x,y) \\  &= aE[X] + bE[Y] + c.\end{aligned}$$
> What is $E[aX + bY + c]$ for the running example? Along similar lines, one would expect $E[g(X,Y)] = \sum_x\sum_y g(x,y)p_{XY}(x,y)$.

**Running example.** $E[X] = \frac12$, $E[Y] = \frac72$, so $E[aX + bY + c] = \frac a2 + \frac{7b}2 + c$.

**Linearity needs no independence.** The derivation never used independence. $E[X + Y] = E[X] + E[Y]$ is true for **any** $X$, $Y$ (last year's HW5 Q8). This is what makes indicator tricks work (B11 below).

### Slide 22/26: Finding $p_Z(\cdot)$ where $Z = g(X,Y)$

> **On the slide.** Suppose $Z = g(X)$. Then what is $p_Z(z)$? $p_Z(z) = \sum_{\{x: g(x) = z\}}p_X(x)$. Now suppose $Z = g(X,Y)$; then we have
> $$p_Z(z) = \sum_{\{x,y: g(x,y) = z\}}p_{XY}(x,y).$$
> Does this need a proof? No, if you are an unconscious statistician!

**In words.** To find $P(Z = z)$, collect every cell of the joint table where $g$ equals $z$ and add them up. (The joke: LOTUS users happily do this without proof; the proof is just that $\{Z = z\}$ is the disjoint union of the events $\{X = x, Y = y\}$ over those cells.)

**Example.** Two fair dice, $Z = \max(X, Y)$. The cells with max equal to $z$ form an "L" shape with $2z - 1$ cells, so $p_Z(z) = \frac{2z-1}{36}$ for $z = 1,\dots,6$.

### Slide 23/26: $E[g(X,Y)]$

> **On the slide.** How do we define $E[g(X,Y)]$? One way is to define $Z = g(X,Y)$ and find $E[Z] = \sum_z z\,p_Z(z)$. Recall $p_Z(z) = \sum_{\{x,y: g(x,y) = z\}}p_{XY}(x,y)$. This gives $E[Z] = \sum_z\sum_{\{x,y: g(x,y) = z\}}z\,p_{XY}(x,y)$. This is the same as $E[g(X,Y)] = \sum_{(x,y)}g(x,y)\,p_{XY}(x,y)$.
> $$\begin{gathered}\boxed{E[g(X,Y)] = \sum_{x,y}g(x,y)\,p_{XY}(x,y)} \\[3pt] \boxed{E[g(X,Y)] = \int_{-\infty}^\infty\!\!\int_{-\infty}^\infty g(x,y)f_{XY}(x,y)\,dx\,dy\ \text{(continuous)}}\end{gathered}$$

**The step "this is the same as".** Inside the double sum, $z = g(x,y)$ for every cell in the inner sum. So we are adding $g(x,y)p_{XY}(x,y)$ over all cells, grouped by the value of $g$. Regrouping a sum does not change it. That is 2D LOTUS: **you never need the distribution of $Z$ to find its mean**.

**Example (Bertsekas Problem 4.7; last year's midsem Q2 in spirit).** $X, Y$ i.i.d. $\mathcal U[0,1]$. Then
$$E|X - Y| = \int_0^1\!\!\int_0^1|x - y|\,dx\,dy = 2\int_0^1\!\!\int_0^x(x - y)\,dy\,dx = 2\int_0^1\frac{x^2}{2}dx = \frac13 .$$
(By symmetry, the regions $x>y$ and $x<y$ contribute equally.) Similarly $P(X<Y) = \iint_{x<y}1\,dx\,dy = \frac12$, the area of a half square.

### Slide 24/26: Example of a function of random variables

> **On the slide.** Suppose $X$ and $Y$ are continuous independent random variables. Let $Z = \max(X,Y)$ and $Z = \min(X,Y)$. Find the CDF and pdf of $Z$ for each case.
> **HW:** When $X$ and $Y$ are exponential with parameters $\lambda_1$ and $\lambda_2$, then $Z$ ($=\min$) is also exponential with parameter $\lambda_1 + \lambda_2$.

**Max: "everyone is below $z$".**
$$\begin{gathered}\{\max(X,Y)\le z\} = \{X\le z\}\cap\{Y\le z\}\ \Rightarrow\ F_{\max}(z) = F_X(z)F_Y(z) \\[3pt] f_{\max}(z) = f_X(z)F_Y(z) + F_X(z)f_Y(z).\end{gathered}$$

**Min: "everyone is above $z$".** Work with the tail $P(Z>z)$:
$$\{\min(X,Y)>z\} = \{X>z\}\cap\{Y>z\}\ \Rightarrow\ F_{\min}(z) = 1 - (1 - F_X(z))(1 - F_Y(z)),$$
$$f_{\min}(z) = f_X(z)(1 - F_Y(z)) + f_Y(z)(1 - F_X(z)).$$
Both use independence to split the probability of the intersection. For $n$ i.i.d. variables with CDF $F$ and PDF $f$: $F_{\max} = F^n$, $f_{\max} = nF^{n-1}f$, $F_{\min} = 1 - (1-F)^n$, $f_{\min} = n(1-F)^{n-1}f$.

**HW solved.** $X\sim$ Exp$(\lambda_1)$, $Y\sim$ Exp$(\lambda_2)$ independent, $Z = \min(X,Y)$. For $z\ge0$, $P(X>z) = e^{-\lambda_1z}$ and $P(Y>z) = e^{-\lambda_2z}$, so
$$\begin{gathered}P(Z>z) = e^{-\lambda_1z}e^{-\lambda_2z} = e^{-(\lambda_1+\lambda_2)z} \\[3pt] \Rightarrow\ F_Z(z) = 1 - e^{-(\lambda_1+\lambda_2)z},\quad f_Z(z) = (\lambda_1+\lambda_2)e^{-(\lambda_1+\lambda_2)z},\ z\ge0 .\end{gathered}$$
That is the Exp$(\lambda_1 + \lambda_2)$ tail, so $Z\sim$ Exp$(\lambda_1+\lambda_2)$. For $z<0$ both CDFs are $0$. (Last year's midsem Q3 is the three-variable version: $\min(X,Y,Z)\sim$ Exp$(\lambda_1+\lambda_2+\lambda_3)$.) Interpretation: two independent alarm clocks ringing at rates $\lambda_1$ and $\lambda_2$; the first ring comes at the combined rate.

### Slide 25/26: Covariance of $X$ and $Y$

> **On the slide.** $\operatorname{Cov}(X,Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$. When the covariance is zero, they are said to be uncorrelated. (Section 4.2 Bertsekas.) https://en.wikipedia.org/wiki/Covariance

**Proof of the shortcut.** Write $\mu_X = E[X]$, $\mu_Y = E[Y]$ and expand, using linearity:
$$E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - \mu_YE[X] - \mu_XE[Y] + \mu_X\mu_Y = E[XY] - \mu_X\mu_Y .$$

**Correlation coefficient.** Covariance depends on units (measure $X$ in cm instead of m and it grows by 100). The unit-free version is
$$\rho(X,Y) = \frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}\in[-1, 1],$$
with $\rho = \pm1$ exactly when $Y - E[Y]$ is a positive (negative) multiple of $X - E[X]$ (Bertsekas Problems 4.20 and 4.21, via the Cauchy–Schwarz inequality $(E[XY])^2\le E[X^2]E[Y^2]$).

**Independent $\Rightarrow$ uncorrelated** (from slide 14). The converse fails; see L12 slide 14.

### Slide 26/26: Covariance of $X$ and $Y$ (pictures)

> **On the slide.** Three scatter plots: a cloud tilted down ($\operatorname{cov}(X,Y)<0$), a round cloud ($\operatorname{cov}(X,Y)\approx0$), a cloud tilted up ($\operatorname{cov}(X,Y)>0$).

**Reading the pictures.** The product $(X - \mu_X)(Y - \mu_Y)$ is positive in the top-right and bottom-left quadrants (around the mean point) and negative in the other two. An upward-tilted cloud puts most of its mass in the positive quadrants, so the average product is positive. Covariance measures **linear** association only: points on a circle or a parabola symmetric about $\mu_X$ can have covariance 0 while being completely dependent.

## Part B: extra worked examples and problems

### Joint PMFs and PDFs

**B1 (last year's Tutorial 5 Q6).** The joint PMF is

| | $Y=2$ | $Y=4$ | $Y=5$ |
|---|---|---|---|
| $X=1$ | $\frac1{12}$ | $\frac1{24}$ | $\frac1{24}$ |
| $X=2$ | $\frac16$ | $\frac1{12}$ | $\frac18$ |
| $X=3$ | $\frac14$ | $\frac18$ | $\frac1{12}$ |

Find (a) $P(X\le2, Y\le4)$, (b) the marginals, (c) $P(Y = 2\mid X = 1)$, (d) whether they are independent.

*Solution.* Use 24ths: rows are $(2,1,1)$, $(4,2,3)$, $(6,3,2)$. (a) $\frac{2+1+4+2}{24} = \frac9{24} = \frac38$. (b) Row sums $p_X = (\frac4{24}, \frac9{24}, \frac{11}{24}) = (\frac16,\frac38,\frac{11}{24})$; column sums $p_Y = (\frac{12}{24},\frac6{24},\frac6{24}) = (\frac12,\frac14,\frac14)$. (c) $\frac{p_{XY}(1,2)}{p_X(1)} = \frac{2/24}{4/24} = \frac12$. (d) Row 1 is $(2,1,1)$ and row 2 is $(4,2,3)$, not proportional. Concretely $p_X(2)p_Y(2) = \frac38\cdot\frac12 = \frac3{16}\ne\frac16$. Dependent.

**B2 (last year's HW5 Q2).** $f_{XY}(x,y) = \frac12e^{-2x} + \frac{cy^2}{(1+x)^2}$ for $x\ge0$, $0\le y\le1$. Find (a) $c$, (b) $P(0\le X\le1, 0\le Y\le\frac12)$, (c) $P(0\le X\le1)$.

*Solution.* (a) $\int_0^1\!\int_0^\infty\frac12e^{-2x}dx\,dy = \frac14$ and $\int_0^1\!\int_0^\infty\frac{cy^2}{(1+x)^2}dx\,dy = c\cdot1\cdot\frac13$. So $\frac14 + \frac c3 = 1$, giving $c = \frac94$.
(b) $\int_0^1\frac12e^{-2x}dx\cdot\frac12 + \frac94\int_0^1\frac{dx}{(1+x)^2}\int_0^{1/2}y^2dy = \frac{1 - e^{-2}}{8} + \frac94\cdot\frac12\cdot\frac1{24} = \frac{1 - e^{-2}}8 + \frac3{64}\approx0.155$.
(c) Integrate $y$ over $[0,1]$: $\frac{1 - e^{-2}}{4} + \frac94\cdot\frac12\cdot\frac13 = \frac{1 - e^{-2}}{4} + \frac38\approx0.591$.

**B3 (last year's HW5 Q5).** $f_{XY}(x,y) = x + \frac32y^2$ on $[0,1]^2$. Find the marginal and joint CDFs.

*Solution.* For $0\le x,y\le1$: $F_{XY}(x,y) = \int_0^x\!\int_0^y(s + \frac32t^2)\,dt\,ds = \frac{x^2y}{2} + \frac{xy^3}{2}$. Marginal CDFs by plugging in 1 (slide 16): $F_X(x) = F_{XY}(x,1) = \frac{x^2 + x}{2}$ and $F_Y(y) = F_{XY}(1,y) = \frac{y + y^3}{2}$. (Marginal PDFs: $f_X = x + \frac12$, $f_Y = \frac12 + \frac32y^2$.) Outside the square, clip: $F_{XY}(x,y) = F_{XY}(\min(x,1),\min(y,1))$ for $x,y\ge0$, and $0$ if $x<0$ or $y<0$.

**B4 (Bertsekas Problem 3.23, uniform on a triangle).** $(X,Y)$ is uniform on the triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$. Find $f_{XY}$, $f_Y$, and decide independence.

*Solution.* Area $\frac12$, so $f_{XY} = 2$ on $\{x,y\ge0, x+y\le1\}$. $f_Y(y) = \int_0^{1-y}2\,dx = 2(1-y)$ for $0\le y\le1$, and by symmetry $f_X(x) = 2(1-x)$. $f_Xf_Y = 4(1-x)(1-y)\ne2$: dependent (the support is not a rectangle). $E[X] = \int_0^12x(1-x)dx = \frac13$. (The conditional parts of this problem are in L12 B5.)

**B5 (Bertsekas Problem 3.15, semicircle).** A point is uniform in the half disc $\{x^2 + y^2\le r^2, y\ge0\}$. Find $f_Y$ and $E[Y]$.

*Solution.* Area $\frac{\pi r^2}{2}$, so $f_{XY} = \frac{2}{\pi r^2}$ on the half disc. For $0\le y\le r$, $x$ runs over $[-\sqrt{r^2-y^2}, \sqrt{r^2-y^2}]$:
$$f_Y(y) = \frac{4\sqrt{r^2 - y^2}}{\pi r^2},\qquad E[Y] = \int_0^r y\,\frac{4\sqrt{r^2-y^2}}{\pi r^2}\,dy = \frac{4}{\pi r^2}\cdot\frac{r^3}{3} = \frac{4r}{3\pi}.$$
(Substitute $u = r^2 - y^2$.) Direct check with 2D LOTUS in polar coordinates: $E[Y] = \frac{2}{\pi r^2}\int_0^\pi\!\int_0^r\rho\sin\theta\cdot\rho\,d\rho\,d\theta = \frac{2}{\pi r^2}\cdot\frac{r^3}{3}\cdot2$. ✓

### Functions of two variables: max, min, ratios and products

**B6 (last year's HW4 Q1).** $X_1\sim\mathcal U(0,1)$ and $X_2\sim$ Exp(1) independent; $Y = \max(X_1,X_2)$. Find $f_Y$.

*Solution.* $F_Y(y) = F_1(y)F_2(y)$. For $0\le y\le1$: $F_Y = y(1 - e^{-y})$; for $y>1$: $F_1 = 1$, so $F_Y = 1 - e^{-y}$. Differentiate:
$$f_Y(y) = \begin{cases}1 - e^{-y} + ye^{-y} & 0<y<1\\ e^{-y} & y>1\end{cases}$$
(Check: $\int_0^1(1 - e^{-y} + ye^{-y})dy + e^{-1} = (1 - (1 - e^{-1}) + (1 - 2e^{-1})) + e^{-1} = 1$. ✓)

**B7 (last year's HW4 Q9 and Tutorial 4 Q5).** $X_1,\dots,X_n$ i.i.d. Exp$(\lambda)$. Find the distributions of $L = \min$ and $T = \max$, and $E[T]$.

*Solution.* $L\sim$ Exp$(n\lambda)$ by the slide 24 argument. $F_T(t) = (1 - e^{-\lambda t})^n$. For $E[T]$, the slick route is memorylessness: the first finish comes after Exp$(n\lambda)$, then the remaining $n-1$ restart fresh, the next finish comes after Exp$((n-1)\lambda)$, and so on:
$$E[T] = \frac{1}{n\lambda} + \frac{1}{(n-1)\lambda} + \cdots + \frac1\lambda = \frac1\lambda\sum_{k=1}^n\frac1k,\qquad n = 3:\ E[T] = \frac{11}{6\lambda}.$$
In HW4 Q9 (three days of rain, mean daily rainfall $\frac1\lambda$): $P(\text{at least one day}>\frac1\lambda) = 1 - (1 - e^{-1})^3\approx0.747$, and the expected number of such days is $3e^{-1}\approx1.10$ (sum of indicators).

**B8 (uncorrelated but dependent, continuous version).** $X\sim\mathcal U[-1,1]$ and $Y = X^2$. Show $\operatorname{Cov}(X,Y) = 0$ but $X, Y$ are dependent.

*Solution.* $E[X] = 0$ and $E[XY] = E[X^3] = 0$ (odd function, symmetric density), so $\operatorname{Cov} = 0 - 0\cdot E[Y] = 0$. But $Y$ is a function of $X$: $P(Y\le\frac14, X>\frac12) = 0$ while $P(Y\le\frac14)P(X>\frac12) = \frac12\cdot\frac14>0$. Dependent. Covariance missed the relationship because it is not linear.

**B9 (last year's Tutorial 5 Q5, a ratio).** $X, Y$ i.i.d. $\mathcal U(0,1)$, $Z = \frac XY$. Find $F_Z$ and $f_Z$.

*Solution.* CDF first: $F_Z(z) = P(X\le zY)$, the area of the part of the unit square under the line $x = zy$.

- $0\le z\le1$: the region is a triangle with vertices $(0,0)$, $(0,1)$, $(z,1)$ in $(x,y)$, area $\frac z2$.
- $z>1$: the complement $\{x>zy\}$ is the triangle $(0,0)$, $(1,0)$, $(1,\frac1z)$ of area $\frac1{2z}$, so $F_Z = 1 - \frac1{2z}$.
$$f_Z(z) = \begin{cases}\frac12 & 0<z\le1\\ \frac{1}{2z^2} & z>1\end{cases}$$
($E[Z] = \infty$, since $\int^\infty\frac{z}{2z^2}dz$ diverges.)

**B10 (last year's HW4 Q4 and Tutorial 5 Q7, products).** (a) $U_1, U_2$ i.i.d. $\mathcal U(0,1)$, $W = U_1U_2$: find $F_W$, $f_W$, $E[W]$. (b) $X, Y$ i.i.d. $\mathcal U(0,2)$: find $P(XY<1)$.

*Solution.* (a) $F_W(w) = P(U_1U_2\le w) = \int_0^1P(U_2\le\frac wu)\,du = \int_0^w1\,du + \int_w^1\frac wu\,du = w - w\ln w$ for $0<w\le1$ (condition on $U_1 = u$; when $u<w$ the event is certain). So $f_W(w) = -\ln w$, and $E[W] = E[U_1]E[U_2] = \frac14$ by independence (no integral needed).
(b) The density is $\frac14$ on $[0,2]^2$. The area of $\{xy<1\}$ in the square is $\int_0^2\min(2, \frac1x)\,dx = \int_0^{1/2}2\,dx + \int_{1/2}^2\frac{dx}x = 1 + \ln4$. So $P(XY<1) = \frac{1 + 2\ln2}{4}\approx0.597$.

### Expectations of functions; indicator tricks

**B11 (Bertsekas Problem 2.26, minimum of golf scores).** Each day your score is uniform on $\{101,\dots,110\}$, independently. You play 3 days and keep the minimum $X$. Find the PMF of $X$ and the improvement in expected score.

*Solution.* Tails are easiest: $P(X\ge k) = P(\text{all three}\ge k) = \big(\frac{111-k}{10}\big)^3$ for $101\le k\le110$. Then $p_X(k) = P(X\ge k) - P(X\ge k+1) = \frac{(111-k)^3 - (110-k)^3}{1000}$. Using $E[X] = 100 + \sum_{k=101}^{110}P(X\ge k)$:
$$E[X] = 100 + \frac{1^3 + 2^3 + \cdots + 10^3}{1000} = 100 + \frac{3025}{1000} = 103.025 .$$
One day's mean is $105.5$, so the expected improvement is $2.475$ strokes.

**B12 (last year's HW5 Q3).** $X_1, X_2, X_3$ i.i.d. Bernoulli$(p)$; $Y_1 = \max(X_1,X_2)$, $Y_2 = \max(X_1,X_3)$, $Y_3 = \max(X_2,X_3)$, $Y = Y_1 + Y_2 + Y_3$. Find $E[Y]$ and $\operatorname{Var}(Y)$.

*Solution.* Each $Y_i$ is Bernoulli with $q := P(Y_i = 1) = 1 - (1-p)^2 = 2p - p^2$. So $E[Y] = 3q = 3p(2 - p)$ (linearity; the $Y_i$ are dependent but that does not matter). For the variance, use the L13 formula $\operatorname{Var}(\sum Y_i) = \sum\operatorname{Var}(Y_i) + 2\sum_{i<j}\operatorname{Cov}(Y_i,Y_j)$. By symmetry all three covariances are equal:
$$P(Y_1 = Y_2 = 1) = P(X_1 = 1) + P(X_1 = 0, X_2 = 1, X_3 = 1) = p + (1-p)p^2,$$
$$\operatorname{Var}(Y) = 3q(1-q) + 6\big[p + (1-p)p^2 - q^2\big] = 3p(1-p)^2(4 - 3p).$$
(Sanity checks: $p = 0$ or $p = 1$ gives 0, as it must.)

**B13 (last year's HW5 Q12, the multinomial; Bertsekas Problem 2.27).** A die with $r$ faces (face $i$ has probability $p_i$) is rolled $n$ times; $X_i$ is the number of times face $i$ comes up. Find the joint PMF, $E[X_i]$, $\operatorname{Var}(X_i)$ and $E[X_iX_j]$.

*Solution.* A particular sequence with $k_1$ ones, ..., $k_r$ $r$'s has probability $p_1^{k_1}\cdots p_r^{k_r}$, and there are $\frac{n!}{k_1!\cdots k_r!}$ such sequences:
$$p_{X_1\dots X_r}(k_1,\dots,k_r) = \frac{n!}{k_1!\cdots k_r!}p_1^{k_1}\cdots p_r^{k_r},\qquad k_1 + \cdots + k_r = n .$$
Each $X_i$ alone is Binomial$(n, p_i)$: $E[X_i] = np_i$, $\operatorname{Var}(X_i) = np_i(1-p_i)$. For $i\ne j$ write $X_i = \sum_{m=1}^n A_m$, $X_j = \sum_{l=1}^n B_l$ with indicators $A_m = \mathbf 1\{\text{roll }m\text{ is }i\}$, $B_l = \mathbf 1\{\text{roll }l\text{ is }j\}$. $E[A_mB_m] = 0$ (one roll cannot show both faces) and $E[A_mB_l] = p_ip_j$ for $m\ne l$:
$$E[X_iX_j] = n(n-1)p_ip_j,\qquad\operatorname{Cov}(X_i,X_j) = n(n-1)p_ip_j - n^2p_ip_j = -np_ip_j .$$
Negative, as expected: more 1s leaves fewer rolls for 2s.

**B14 (Bertsekas Problem 4.17).** $X$ and $Y$ have the same variance. Show $X - Y$ and $X + Y$ are uncorrelated.

*Solution.* Expand bilinearly (L13): $\operatorname{Cov}(X - Y, X + Y) = \operatorname{Var}(X) + \operatorname{Cov}(X,Y) - \operatorname{Cov}(Y,X) - \operatorname{Var}(Y) = 0$.

**B15 (last year's Tutorial 5 Q2).** $X, Y$ i.i.d. $\mathcal N(0,1)$, $Z = 1 + X + XY^2$, $W = 1 + X$. Find $\operatorname{Cov}(Z, W)$.

*Solution.* Constants do not matter: $\operatorname{Cov}(Z,W) = \operatorname{Cov}(X + XY^2, X) = \operatorname{Var}(X) + \operatorname{Cov}(XY^2, X)$. And $\operatorname{Cov}(XY^2,X) = E[X^2Y^2] - E[XY^2]E[X] = E[X^2]E[Y^2] - 0 = 1$ (independence). So $\operatorname{Cov}(Z,W) = 2$.


# Lecture 11: Conditioning a random variable on an event (Deck 2, slides 2 to 11)

**The big picture.** Conditioning is the most powerful tool in this course: *if a problem is hard, condition on something that would make it easy, then average.* This lecture does it for events: given that event $A$ happened, what is the new PMF of $X$, and what is its new mean? Then it splits $\Omega$ into pieces and puts the pieces back together (the total probability and total expectation theorems for random variables).

**Read alongside:** Bertsekas §2.6 (conditioning) and §3.5 (conditioning for continuous variables); probabilitycourse.com §5.1.3 (conditioning and independence) and §5.1.5 (conditional expectation).

## Part A: the slides

### Slide 2/36: Today's class

> **On the slide.** Conditioning $X$ on an event $A\in\mathcal F$. Conditional expectation $E[X\mid A]$. Conditioning $X$ with disjoint partitions $\{A_i\}$ of $\Omega$. Conditioning $X$ on an event $\{X\in A\}\in\mathcal F'$. Conditioning $X$ on another random variable $Y$. Conditional expectation $E[X\mid Y = y]$.

The last two items are L12. $\mathcal F'$ is the $\sigma$-algebra on the *range* of $X$ (for real-valued $X$, the Borel sets), so "$\{X\in A\}$ with $A\in\mathcal F'$" is an event described through the value of $X$, such as $\{X\ge 3\}$.

### Slide 3/36: A new running example

> **On the slide.** Pick 2 integers from $\{1,2,3\}$ without replacement. $\Omega = \{(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)\}$, $\mathbb P\{\omega\} = \frac16$ for all $\omega$. Denote them by random variables $X$ and $Y$. For $\omega = (1,3)$, $X(\omega) = 1$ and $Y(\omega) = 3$. Write down their joint PMF $p_{X,Y}(x,y)$. Write down their marginal PMFs $p_X$ and $p_Y$. What is $E[X]$, $E[Y]$ and $E[XY]$?

**Solution.** The joint table has $\frac16$ off the diagonal and $0$ on it:

| | $Y=1$ | $Y=2$ | $Y=3$ | $p_X$ |
|---|---|---|---|---|
| $X=1$ | 0 | $\frac16$ | $\frac16$ | $\frac13$ |
| $X=2$ | $\frac16$ | 0 | $\frac16$ | $\frac13$ |
| $X=3$ | $\frac16$ | $\frac16$ | 0 | $\frac13$ |
| $p_Y$ | $\frac13$ | $\frac13$ | $\frac13$ | |

Both marginals are uniform on $\{1,2,3\}$, so $E[X] = E[Y] = 2$. For $E[XY]$, add $xy$ over the six off-diagonal cells: $\frac16(2 + 3 + 2 + 6 + 3 + 6) = \frac{22}{6} = \frac{11}{3}$. So $\operatorname{Cov}(X,Y) = \frac{11}3 - 4 = -\frac13$: dependent, and negatively related (a big first number leaves smaller numbers for the second). The zeros on the diagonal already showed dependence.

### Slide 4/36: Conditioning on an event $A$

> **On the slide.** Consider a discrete random variable $X$ with PMF $p_X(x)$. Suppose an event $A\in\mathcal F$ has happened. Consider the event $\{\omega: X(\omega) = x\}$, shorthand $\{X = x\}$. What is $\mathbb P(X = x\mid A)$? $\mathbb P(X = x\mid A) = \frac{\mathbb P(\{X = x\}\cap A)}{\mathbb P(A)}$.
> $$\boxed{p_{X\mid A}(x) := \frac{\mathbb P(\{X = x\}\cap A)}{\mathbb P(A)}}$$
> $p_{X\mid A}$ denotes the conditional PMF of $X$ under event $A$. In the running example say $A$ is the event that the first number is odd and the second is even: $A = \{(1,2),(3,2)\}$. Compute $p_{X\mid A}(\cdot)$. How do we know that it is consistent, i.e., $\sum_x p_{X\mid A}(x) = 1$?

**Solution.** $\mathbb P(A) = \frac26 = \frac13$. $\{X = 1\}\cap A = \{(1,2)\}$ and $\{X = 3\}\cap A = \{(3,2)\}$, each of probability $\frac16$. So
$$p_{X\mid A}(1) = \frac{1/6}{1/3} = \frac12,\qquad p_{X\mid A}(3) = \frac12,\qquad p_{X\mid A}(2) = 0 .$$
**Picture.** Restrict attention to the outcomes in $A$, throw the rest away, and rescale the survivors so they add up to 1. Conditioning never creates new possibilities; it only removes some and rescales the rest.

### Slide 5/36: Consistency of the conditional PMF

> **On the slide.** $\sum_x p_{X\mid A}(x) = 1$. Proof: $\sum_x p_{X\mid A}(x) = \sum_x\frac{\mathbb P(\{X = x\}\cap A)}{\mathbb P(A)}$. $\{\omega: X(\omega) = x\}$ are disjoint sets for different $x$. From the theorem of total probability, this implies that $\{X = x\}\cap A$ are disjoint sets for all $x$. $\sum_xp_{X\mid A}(x) = \frac{\mathbb P(\bigcup_x\{\{X = x\}\cap A\})}{\mathbb P(A)} = \frac{\mathbb P(A)}{\mathbb P(A)} = 1$.

**The key step.** The sets $\{X = x\}$ partition $\Omega$ ($X$ takes exactly one value), so the pieces $\{X = x\}\cap A$ partition $A$. Their probabilities add up to $\mathbb P(A)$. In fact $p_{X\mid A}$ is just the PMF of $X$ under the new probability measure $\mathbb P(\cdot\mid A)$, which is a legitimate probability measure (L3). So **everything you know about PMFs carries over to conditional PMFs**: expectations, LOTUS, variances.

### Slide 6/36: Another example

> **On the slide.** Let $X$ denote the outcome of a die. Let $A$ denote the event that the roll is odd. What is $p_{X\mid A}(x)$? Given that event $A$ has happened, what is the average value of the die, i.e., $E[X\mid A]$?
> $$\boxed{E[X\mid A] = \sum_x x\,p_{X\mid A}(x)}\qquad\text{Using LOTUS,}\qquad\boxed{E[g(X)\mid A] = \sum_x g(x)\,p_{X\mid A}(x)}$$

**Solution.** $\mathbb P(A) = \frac12$, so $p_{X\mid A}(x) = \frac{1/6}{1/2} = \frac13$ for $x\in\{1,3,5\}$ and $0$ otherwise. Then $E[X\mid A] = \frac{1 + 3 + 5}{3} = 3$. With LOTUS, $E[X^2\mid A] = \frac{1 + 9 + 25}{3} = \frac{35}{3}$, so the conditional variance is $\operatorname{Var}(X\mid A) = \frac{35}3 - 9 = \frac83$.

### Slide 7/36: Today's class (agenda, item 3 highlighted)

### Slide 8/36: Conditioning with disjoint partitions

> **On the slide.** Now let $\{A_i, i = 1,\dots,n\}$ be a disjoint partition of $\Omega$. Prove the following using the law of total probability:
> $$\boxed{p_X(x) = \sum_{i=1}^n\mathbb P(A_i)\,p_{X\mid A_i}(x)}$$
> Proof: $\sum_{i=1}^n\mathbb P(A_i)\frac{\mathbb P(\{X = x\}\cap A_i)}{\mathbb P(A_i)} = \sum_{i=1}^n\mathbb P(\{X = x\}\cap A_i) = \mathbb P(\{X = x\})$. The last equality follows from the law of total probability. An important consequence is
> $$\boxed{E[X] = \sum_{i=1}^n\mathbb P(A_i)\,E[X\mid A_i]}$$

**Proof of the consequence (total expectation theorem).** Multiply the first box by $x$ and sum over $x$, then swap the two finite/absolutely convergent sums:
$$E[X] = \sum_x x\sum_i\mathbb P(A_i)p_{X\mid A_i}(x) = \sum_i\mathbb P(A_i)\sum_x x\,p_{X\mid A_i}(x) = \sum_i\mathbb P(A_i)E[X\mid A_i].$$

**In words: the overall mean is the probability-weighted average of the conditional means.** Check with the die: $A_1$ = odd, $A_2$ = even. $E[X\mid A_1] = 3$, $E[X\mid A_2] = 4$, so $E[X] = \frac12\cdot3 + \frac12\cdot4 = 3.5$. ✓

**The divide-and-conquer recipe.** When $E[X]$ is hard to compute directly, find a partition (the outcome of the first step, which coin was picked, which case of a mixed variable happens) such that each $E[X\mid A_i]$ is easy. Then average. B1 to B4 below and the geometric example on slide 11 all work this way.

### Slide 9/36: Today's class (agenda, item 4 highlighted)

### Slide 10/36: Conditioning on the event $X\in A$

> **On the slide.** Consider a discrete random variable $X$ with PMF $p_X(x)$. Suppose an event $X\in A$ has happened, where $A\in\mathcal F'$. $X\in A = \{\omega: X(\omega)\in A\}$ and $\mathbb P\{X\in A\} = \sum_{x\in A}p_X(x)$. We use the same notation $p_{X\mid A}(x) := \frac{\mathbb P(\{X = x\}\cap\{X\in A\})}{\mathbb P(X\in A)}$. If $x\notin A$, we have $p_{X\mid A}(x) = 0$. Otherwise (when $x\in A$) we have $p_{X\mid A}(x) = \frac{p_X(x)}{\mathbb P(X\in A)}$. Running example: suppose we are given $X\in A$ where $A = \{2,3\}$. What is $p_{X\mid A}(x)$?

**Why it simplifies.** When the event is about $X$ itself, $\{X = x\}\cap\{X\in A\}$ is either $\{X = x\}$ (if $x\in A$) or empty (if not). So you just **keep the PMF on $A$ and divide by its total mass**:
$$p_{X\mid A}(x) = \begin{cases}\dfrac{p_X(x)}{P(X\in A)} & x\in A\\[4pt] 0 & x\notin A\end{cases}$$

**Running example.** $p_X$ is uniform on $\{1,2,3\}$, $P(X\in\{2,3\}) = \frac23$, so $p_{X\mid A}(2) = p_{X\mid A}(3) = \frac{1/3}{2/3} = \frac12$. (A conditioned uniform is uniform on what is left.)

**Continuous version** (L12 slide 21 and Bertsekas §3.5). $f_{X\mid A}(x) = \frac{f_X(x)}{P(X\in A)}$ for $x\in A$, and 0 otherwise. Example: $X\sim$ Exp$(\lambda)$ and $A = \{X>t\}$. Then $f_{X\mid A}(x) = \frac{\lambda e^{-\lambda x}}{e^{-\lambda t}} = \lambda e^{-\lambda(x - t)}$ for $x>t$: a fresh exponential started at $t$. This is the memoryless property, and it gives $E[X\mid X>t] = t + \frac1\lambda$.

### Slide 11/36: Revisiting the geometric random variable

> **On the slide.** Let $N$ be a geometric random variable with parameter $p$. Its PMF is $p_N(k) = (1-p)^{k-1}p$. Suppose we are given the event $A := \{N>n\}$; $P(A) = (1-p)^n$. What is $p_{N\mid A}(k)$? For $k>n$, $p_{N\mid A}(k) = \frac{P\{(N>n)\cap(N = k)\}}{P(N>n)} = (1-p)^{k-1-n}p$. For $k\le n$, $p_{N\mid A}(k) = 0$.

**Why $P(N>n) = (1-p)^n$.** $N>n$ means the first $n$ trials all failed.

**What the answer says: memorylessness.** Put $k = n + m$. Then
$$P(N = n + m\mid N>n) = (1-p)^{m-1}p = P(N = m).$$
Given that the first $n$ trials failed, the number of *extra* trials needed, $N - n$, is again Geometric$(p)$. The coin has no memory of past failures. The geometric is the only memoryless distribution on $\{1,2,\dots\}$, just as the exponential is the only memoryless continuous one, and the geometric is the discrete version of the exponential (last year's HW4 Q2 makes this precise).

**Consequence: the mean of the geometric in two lines (Bertsekas Example 2.17).** Partition on the first trial: $A_1 = \{N = 1\}$ (probability $p$) and $A_2 = \{N>1\}$ (probability $1-p$). Then $E[N\mid A_1] = 1$ and, by memorylessness, $E[N\mid A_2] = 1 + E[N]$. Total expectation:
$$E[N] = p\cdot1 + (1-p)(1 + E[N])\ \Rightarrow\ pE[N] = 1\ \Rightarrow\ \boxed{E[N] = \frac1p}.$$
The same trick with $E[N^2\mid A_2] = E[(1 + N)^2] = 1 + 2E[N] + E[N^2]$ gives $E[N^2] = \frac{2-p}{p^2}$ and $\operatorname{Var}(N) = \frac{1-p}{p^2}$.

## Part B: extra worked examples and problems

**B1 (last year's HW5 Q10).** Two fair dice, $S = X + Y$. $A_1 = \{S\le7\}$, $A_2 = \{S\ge8\}$. (a) Find $p_{S\mid A_1}$ and $p_{S\mid A_2}$. (b) Find $P(S = 6)$ from them.

*Solution.* $p_S(s) = \frac{6 - |s - 7|}{36}$. $P(A_1) = \frac{1+2+3+4+5+6}{36} = \frac{21}{36}$ and $P(A_2) = \frac{15}{36}$. Conditioning on an event about $S$ (slide 10):
$$p_{S\mid A_1}(s) = \frac{(s-1)/36}{21/36} = \frac{s-1}{21},\ s = 2,\dots,7;\qquad p_{S\mid A_2}(s) = \frac{13 - s}{15},\ s = 8,\dots,12 .$$
(b) Slide 8: $P(S = 6) = P(A_1)p_{S\mid A_1}(6) + P(A_2)p_{S\mid A_2}(6) = \frac{21}{36}\cdot\frac5{21} + 0 = \frac5{36}$. ✓

**B2 (Bertsekas Problem 3.18).** $f_X(x) = \frac x4$ for $1<x\le3$. Let $A = \{X\ge2\}$. Find $E[X]$, $P(A)$, $f_{X\mid A}$ and $E[X\mid A]$.

*Solution.* $E[X] = \int_1^3\frac{x^2}4dx = \frac{27 - 1}{12} = \frac{13}{6}$. $P(A) = \int_2^3\frac x4dx = \frac{9 - 4}{8} = \frac58$. So $f_{X\mid A}(x) = \frac{x/4}{5/8} = \frac{2x}{5}$ for $2\le x\le3$, and
$$E[X\mid A] = \int_2^3\frac{2x^2}{5}dx = \frac{2(27 - 8)}{15} = \frac{38}{15}\approx2.53 .$$
(Check with slide 8: $P(A^c) = \frac38$, $f_{X\mid A^c} = \frac{2x}{3}$ on $(1,2)$, $E[X\mid A^c] = \frac{2(8-1)}{9} = \frac{14}9$, and $\frac58\cdot\frac{38}{15} + \frac38\cdot\frac{14}{9} = \frac{19}{12} + \frac{7}{12} = \frac{13}6$. ✓)

**B3 (memorylessness used twice; Bertsekas Problem 3.20, the absent-minded professor).** Two appointments are scheduled for the same time. Durations are independent Exp with mean 30 minutes. Student 1 arrives on time; student 2 arrives 5 minutes late. Find the expected time from student 1's arrival until student 2 leaves.

*Solution.* Let $T_1$ be student 1's duration. Partition on $A = \{T_1\le5\}$ (student 1 is done before student 2 arrives) and $A^c$.

- On $A$ (probability $1 - e^{-5/30}$): student 2 starts at minute 5, so the total is $5 + T_2$, mean $5 + 30 = 35$.
- On $A^c$ (probability $e^{-1/6}$): student 2 waits until $T_1$ ends. By memorylessness, $E[T_1\mid T_1>5] = 5 + 30$. Then student 2 takes another $T_2$, so the mean total is $35 + 30 = 65$.
$$E = 35(1 - e^{-1/6}) + 65e^{-1/6} = 35 + 30e^{-1/6}\approx35 + 25.4 = 60.4\text{ minutes}.$$

**B4 (expected number of tosses to see two heads in a row).** A fair coin is tossed until HH appears. Find the expected number of tosses $N$.

*Solution.* Partition on the first toss, and then on the second (each time the problem restarts, the mean is $E[N]$ again):

- First toss T (probability $\frac12$): wasted 1 toss, restart: mean $1 + E[N]$.
- First H, second T (probability $\frac14$): wasted 2 tosses, restart: mean $2 + E[N]$.
- First H, second H (probability $\frac14$): done in 2.
$$E[N] = \tfrac12(1 + E[N]) + \tfrac14(2 + E[N]) + \tfrac14\cdot2\ \Rightarrow\ \tfrac14E[N] = \tfrac32\ \Rightarrow\ E[N] = 6 .$$

**B5 (last year's Tutorial 4 Q2, rounding up an exponential).** $X\sim$ Exp(1) and $N = \lceil X\rceil$. Find the PMF of $N$ and $E[N]$. Then find $E[X\mid N = n]$.

*Solution.* $P(N = n) = P(n - 1<X\le n) = e^{-(n-1)} - e^{-n} = (e^{-1})^{n-1}(1 - e^{-1})$: Geometric with $p = 1 - e^{-1}$, so $E[N] = \frac{1}{1 - e^{-1}}\approx1.582$. Given $N = n$, $X$ is the exponential restricted to $(n-1, n]$; by memorylessness it is $n - 1$ plus an Exp(1) conditioned to be $\le1$, so
$$E[X\mid N = n] = n - 1 + \frac{\int_0^1xe^{-x}dx}{1 - e^{-1}} = n - 1 + \frac{1 - 2e^{-1}}{1 - e^{-1}}\approx n - 1 + 0.418 = n - 0.582 .$$
(Total expectation check: $E[X] = E[N] - 0.582 = 1.582 - 0.582 = 1$. ✓)

**B6 (truncated normal; a conditional expectation used in Black–Scholes, last year's HW4 Q12).** $Z\sim\mathcal N(0,1)$ and $c\ge0$. Find $E[Z\mid Z>c]$ and $E[\max(Z - c, 0)]$.

*Solution.* $\int_c^\infty z\varphi(z)\,dz = [-\varphi(z)]_c^\infty = \varphi(c)$, since $\varphi'(z) = -z\varphi(z)$. So
$$\begin{gathered}E[Z\mid Z>c] = \frac{\varphi(c)}{1 - \Phi(c)} \\[3pt] E[\max(Z - c,0)] = P(Z>c)\big(E[Z\mid Z>c] - c\big) = \varphi(c) - c(1 - \Phi(c)).\end{gathered}$$
(The second is total expectation over $\{Z>c\}$ and $\{Z\le c\}$; on the second piece the payoff is 0.)


# Lecture 12: Conditioning on a random variable, $E[X\mid Y]$ and iterated expectations (Deck 2, slides 12 to 29)

**The big picture.** L11 conditioned on a single event. Now we condition on **the value of another random variable**: for each possible $y$, the event $\{Y = y\}$ gives a conditional PMF of $X$ and a conditional mean $E[X\mid Y = y]$. Treating that conditional mean as a function of the random $Y$ gives the random variable $E[X\mid Y]$, and its average is $E[X]$ (the law of iterated expectations). This is the most used result of the whole first half of the course: last year's midsem Q1 and Q2 and the endsem Q4 are all built on it.

**Read alongside:** Bertsekas §2.6, §3.5 and §4.3 (conditional expectation and variance revisited), §4.5 (sum of a random number of random variables); probabilitycourse.com §5.1.5 (conditional expectation, law of total expectation, law of total variance) and §5.2.3 (conditioning for continuous variables).

## Part A: the slides

### Slide 12/36: Today's class

> **On the slide.** Conditioning $X$ on an event $A\in\mathcal F$. Conditional expectation $E[X\mid A]$. Conditioning $X$ with disjoint partitions $\{A_i\}$ of $\Omega$. Conditioning $X$ on an event $\{X\in A\}\in\mathcal F'$. **Conditioning $X$ on another random variable $Y$.** Conditional expectation $E[X\mid Y = y]$. Law of iterated expectation $E[X\mid Y]$. Bayes rule revisited. Sums of random variables.

The last two items are taught in L13.

### Slide 13/36: Conditioning $X$ on random variable $Y$

> **On the slide.** Consider discrete random variables $X$ and $Y$ with joint PMF $p_{XY}(x,y)$ and marginal PMFs $p_X(x)$ and $p_Y(y)$. Suppose an event $A: \{Y = y\}$ has happened and we are interested in the probability that $X = x$ given $Y = y$. This conditional PMF is denoted $p_{X\mid Y}(x\mid y)$. In fact $p_{X\mid Y}(x\mid y) := \frac{P(X = x, Y = y)}{P(Y = y)} = \frac{p_{X,Y}(x,y)}{p_Y(y)}$.
> $$\boxed{p_{X,Y}(x,y) = p_{X\mid Y}(x\mid y)\,p_Y(y)}$$
> This is essentially the same as $P(A\cap B) = P(A\mid B)P(B)$. Is $p_{X\mid Y}(x\mid y)$ consistent? $\sum_xp_{X\mid Y}(x\mid y) = \sum_x\frac{p_{X,Y}(x,y)}{p_Y(y)} = 1$.

**In the table picture.** Fix the column $Y = y$. Its entries are $p_{XY}(x, y)$ for the various $x$, and they add up to $p_Y(y)$ (the column sum). Divide the column by its sum: that normalised column is $p_{X\mid Y}(\cdot\mid y)$. **One conditional PMF per column.** (It is only defined for $y$ with $p_Y(y)>0$.)

**Running example (pick 2 from $\{1,2,3\}$, L11 slide 3).** Column $Y = 1$ is $(0, \frac16, \frac16)$ with sum $\frac13$, so $p_{X\mid Y}(2\mid1) = p_{X\mid Y}(3\mid1) = \frac12$: given the second number is 1, the first is 2 or 3 equally likely. In general $p_{X\mid Y}(x\mid y) = \frac12$ for $x\ne y$.

**Multiplication rule in both directions.** $p_{XY}(x,y) = p_{X\mid Y}(x\mid y)p_Y(y) = p_{Y\mid X}(y\mid x)p_X(x)$. Models are often *built* this way: first draw $Y$, then draw $X$ from a distribution that depends on $Y$ (two-stage experiments). B1 and B2 below are examples.

### Slide 14/36: What if $X$ and $Y$ are independent?

> **On the slide.** When do we say $X$ and $Y$ are independent? When $p_{X,Y}(x,y) = p_X(x)p_Y(y)$. We also know $p_{X,Y}(x,y) = p_{X\mid Y}(x\mid y)p_Y(y)$. This implies $p_{X\mid Y}(x\mid y) = p_X(x)$. NOTE: Independence implies $E[XY] = E[X]E[Y]$.
> **Independent random variables are uncorrelated ($\operatorname{Cov}(X,Y) = 0$). But uncorrelated random variables need not be independent!! (See Example 4.13 in Bertsekas.)**

**Meaning.** Independent $\iff$ every column of the table, once normalised, is the same distribution $p_X$. Learning $Y$ does not change your beliefs about $X$.

**Bertsekas Example 4.13 (uncorrelated but dependent).** $(X,Y)$ takes the four values $(1,0)$, $(0,1)$, $(-1,0)$, $(0,-1)$, each with probability $\frac14$ (the four points of a diamond).

- $E[X] = E[Y] = 0$ by symmetry, and $XY = 0$ at every point, so $E[XY] = 0$ and $\operatorname{Cov}(X,Y) = 0$.
- But $p_{X\mid Y}(0\mid1) = 1$ (if $Y = 1$ then $X$ must be 0), while $p_X(0) = \frac12$. So they are dependent.

What goes wrong: covariance only detects *linear* tendencies. Here $|X|$ and $|Y|$ are perfectly (negatively) related, $|X| + |Y| = 1$, but the relation is symmetric, so there is no linear trend.

### Slide 15/36: Conditioning $X$ on random variable $Y$ (total probability)

> **On the slide.** From $p_{X,Y}(x,y) = p_{X\mid Y}(x\mid y)p_Y(y)$, summing both sides over $y$:
> $$\boxed{p_X(x) = \sum_yp_{X\mid Y}(x\mid y)\,p_Y(y)}$$
> Similarly from $p_{X,Y}(x,y) = p_{Y\mid X}(y\mid x)p_X(x)$, summing over $x$: $\boxed{p_Y(y) = \sum_xp_{Y\mid X}(y\mid x)p_X(x)}$. Notice the similarity to the law of total probability $P(A) = \sum_iP(A\mid B_i)P(B_i)$.

This is L11 slide 8 with the partition $A_i = \{Y = y_i\}$.

**Example (Bertsekas §2.6, the noisy channel; also last year's HW6 Q6 in spirit).** $N\sim$ Poisson$(\lambda)$ messages arrive; each is independently lost with probability $1 - q$. Let $X$ be the number received. Given $N = n$, $X\sim$ Binomial$(n, q)$. Then
$$p_X(k) = \sum_{n\ge k}\binom nkq^k(1-q)^{n-k}e^{-\lambda}\frac{\lambda^n}{n!} = e^{-\lambda}\frac{(\lambda q)^k}{k!}\sum_{m\ge0}\frac{(\lambda(1-q))^m}{m!} = e^{-\lambda q}\frac{(\lambda q)^k}{k!}.$$
So $X\sim$ Poisson$(\lambda q)$: **thinning a Poisson gives a Poisson** (Bertsekas Problem 2.37).

### Slide 16/36: Picture of conditional PMFs

> **On the slide.** A 3D bar plot of a joint PMF $p_{X,Y}(x,y)$ over a grid with $y = 1, 2, 3$, and next to it three "slice views": the conditional PMFs $p_{X\mid Y}(x\mid3)$, $p_{X\mid Y}(x\mid2)$, $p_{X\mid Y}(x\mid1)$, each obtained from one row $y$ of the joint and rescaled.

**Reading it.** Slicing the joint at $Y = y$ gives a profile whose *shape* is the conditional PMF; dividing by the slice's total height $p_Y(y)$ just rescales it to sum to 1. Different slices can have completely different shapes; that is dependence.

### Slide 17/36: Recap

> **On the slide.** Boxes: $p_{X\mid A}(x) := \frac{p_X(x)}{P(A)}$ if $x\in A$. $E[X\mid A] = \sum_xx\,p_{X\mid A}(x)$. $p_X(x) = \sum_{i=1}^n\mathbb P(A_i)p_{X\mid A_i}(x)$. $E[X] = \sum_{i=1}^n\mathbb P(A_i)E[X\mid A_i]$. $p_{X,Y}(x,y) = p_{X\mid Y}(x\mid y)p_Y(y)$. $p_X(x) = \sum_yp_{X\mid Y}(x\mid y)p_Y(y)$.

### Slide 18/36: Conditional expectation $E[X\mid Y = y]$

> **On the slide.** It is easy to guess that
> $$\boxed{E[X\mid Y = y] := \sum_xx\,p_{X\mid Y}(x\mid y),\qquad E[Y\mid X = x] := \sum_yy\,p_{Y\mid X}(y\mid x)}$$
> Can you write $E[X]$ in terms of $E[X\mid Y = y]$?
> $$\boxed{E[X] = \sum_yp_Y(y)\,E[X\mid Y = y]}$$
> Proof: $\sum_yp_Y(y)E[X\mid Y = y] = \sum_yp_Y(y)\sum_xx\,p_{X\mid Y}(x\mid y) = \sum_x\sum_yx\,p_{X,Y}(x,y) = \sum_xx\,p_X(x) = E[X]$.

**Proof, line by line.** (1) Definition. (2) $p_Y(y)p_{X\mid Y}(x\mid y) = p_{XY}(x,y)$ (slide 13), and swap the order of summation. (3) $\sum_yp_{XY}(x,y) = p_X(x)$ (marginal). (4) Definition of $E[X]$.

**Running example.** Given $Y = y$, $X$ is uniform on the other two numbers:
$$E[X\mid Y = 1] = \tfrac{2+3}2 = 2.5,\qquad E[X\mid Y = 2] = \tfrac{1+3}2 = 2,\qquad E[X\mid Y = 3] = \tfrac{1+2}{2} = 1.5 .$$
Then $E[X] = \frac13(2.5 + 2 + 1.5) = 2$. ✓ Note the pattern: $E[X\mid Y = y] = \frac{6 - y}{2}$ (the sum of the other two is $6 - y$).

### Slide 19/36: Summary (discrete)

> **On the slide.** The four boxes of slide 17, plus $E[X\mid Y = y] := \sum_xx\,p_{X\mid Y}(x\mid y)$ and $E[X] = \sum_yp_Y(y)E[X\mid Y = y]$.

### Slides 20/36 to 25/36: How about all this for continuous $X$ and $Y$?

> **On the slides.** The eight summary boxes are converted one at a time to the continuous case, ending with:
> $$f_{X\mid A}(x) = \frac{f_X(x)}{P(A)}\ \text{if }x\in A,\qquad E[X\mid A] = \int_{-\infty}^\infty x\,f_{X\mid A}(x)\,dx,$$
> $$f_X(x) = \sum_{i=1}^n\mathbb P(A_i)f_{X\mid A_i}(x),\qquad E[X] = \sum_{i=1}^n\mathbb P(A_i)E[X\mid A_i],$$
> $$f_{X,Y}(x,y) = f_{X\mid Y}(x\mid y)f_Y(y),\qquad f_X(x) = \int_yf_{X\mid Y}(x\mid y)f_Y(y)\,dy,$$
> $$E[X\mid Y = y] = \int_xx\,f_{X\mid Y}(x\mid y)\,dx,\qquad E[X] = \int_yE[X\mid Y = y]f_Y(y)\,dy .$$

**The rule of thumb.** Replace PMFs by PDFs and sums over the *values of a continuous variable* by integrals. Sums over a partition $\{A_i\}$ stay sums (there are still finitely many pieces).

**The one subtle point: conditioning on $Y = y$ when $P(Y = y) = 0$.** For continuous $Y$, the event $\{Y = y\}$ has probability 0, so $\frac{P(\cdot\,\cap\,\{Y=y\})}{P(Y=y)}$ is $\frac00$. The definition
$$\boxed{f_{X\mid Y}(x\mid y) := \frac{f_{XY}(x,y)}{f_Y(y)}\quad(f_Y(y)>0)}$$
is justified as a limit: condition on the thin strip $\{y\le Y\le y + \delta\}$, which has positive probability $\approx f_Y(y)\delta$, and let $\delta\to0$:
$$P(X\in[x, x+\epsilon]\mid y\le Y\le y+\delta)\approx\frac{f_{XY}(x,y)\,\epsilon\,\delta}{f_Y(y)\,\delta} = \frac{f_{XY}(x,y)}{f_Y(y)}\epsilon .$$
**Geometric picture.** $f_{X\mid Y}(\cdot\mid y)$ is the slice of the joint density surface along the horizontal line $Y = y$, rescaled to integrate to 1. For a **uniform** joint density, every slice is flat, so $X\mid Y = y$ is uniform on the slice. This makes triangle and disc problems quick (B5 below).

**Example (last year's HW5 Q6).** $f_{XY}(x,y) = cx(y - x)e^{-y}$ for $0\le x\le y<\infty$. Find $c$ and both conditional densities.

*Solution.* Integrate $x$ first: $\int_0^yx(y-x)\,dx = \frac{y^3}{6}$. So $f_Y(y) = c\frac{y^3}{6}e^{-y}$ and $\int_0^\infty\frac{y^3}{6}e^{-y}dy = \frac{3!}{6} = 1$, giving $c = 1$. Integrating $y$ instead: $f_X(x) = xe^{-x}\int_x^\infty(y - x)e^{-(y-x)}dy = xe^{-x}$. Then
$$\begin{gathered}f_{X\mid Y}(x\mid y) = \frac{x(y-x)e^{-y}}{y^3e^{-y}/6} = \frac{6x(y-x)}{y^3},\ 0\le x\le y; \\[3pt] f_{Y\mid X}(y\mid x) = \frac{x(y-x)e^{-y}}{xe^{-x}} = (y - x)e^{-(y-x)},\ y\ge x .\end{gathered}$$
(The second says: given $X = x$, $Y - x\sim$ Gamma(2,1), with mean 2, so $E[Y\mid X = x] = x + 2$.)

### Slide 26/36: Conditional expectation $E[X\mid Y]$

> **On the slide.** Recall $E[X\mid Y = y] := \sum_xx\,p_{X\mid Y}(x\mid y)$. $E[X\mid Y = y]$ is a constant given $y$. $g(y) := E[X\mid Y = y]$ is a function of $y$. Now consider the random variable $E[X\mid Y]$. When $Y$ takes the value $y$ (this happens with probability $p_Y(y)$), $E[X\mid Y]$ takes the value $E[X\mid Y = y]$. $E[X\mid Y]$ is a function of $Y$, say $g(Y)$. What is the expectation of $E[X\mid Y]$?

**This is the conceptual jump of the lecture.**

- $E[X\mid Y = 2]$ is a **number**.
- $E[X\mid Y]$ is a **random variable**: first compute the function $g(y) = E[X\mid Y = y]$, then plug in the random $Y$.

In the running example, $g(y) = \frac{6 - y}{2}$, so $E[X\mid Y] = \frac{6 - Y}{2}$, a random variable taking values $2.5, 2, 1.5$ with probability $\frac13$ each. It is "the best guess of $X$ once you have seen $Y$". Two extreme cases: if $X$ and $Y$ are independent, $E[X\mid Y] = E[X]$ (a constant: $Y$ tells you nothing); if $X = h(Y)$, then $E[X\mid Y] = h(Y)$ ($Y$ tells you everything).

### Slide 27/36: The law of iterated expectations

> **On the slide.** $g(Y) = E[X\mid Y]$. What is $E[g(Y)] = E[E[X\mid Y]]$? $E[g(Y)] = \sum_yg(y)p_Y(y) = \sum_yE[X\mid Y = y]p_Y(y)$. This implies $E[g(Y)] = E[E[X\mid Y]] = E[X]$. This is the law of iterated expectation.
> $$\boxed{E\big[E[X\mid Y]\big] = E[X]}$$

**Why it is just slide 18 again.** LOTUS on the function $g$ of $Y$ gives $E[g(Y)] = \sum_yg(y)p_Y(y)$, and slide 18 says that sum is $E[X]$. The inner expectation is over $X$ (with $Y$ frozen), the outer one over $Y$.

**Two companion rules (Bertsekas §4.3, Problem 4.25).**

1. **Taking out what is known:** $E[h(Y)X\mid Y] = h(Y)E[X\mid Y]$. (Given $Y$, $h(Y)$ is a constant.)
2. **Law of total variance:**
$$\boxed{\operatorname{Var}(X) = E\big[\operatorname{Var}(X\mid Y)\big] + \operatorname{Var}\big(E[X\mid Y]\big)}$$
"Total spread = average spread *within* each group + spread *between* the group means." *Proof:* $E[\operatorname{Var}(X\mid Y)] = E[E[X^2\mid Y]] - E[(E[X\mid Y])^2] = E[X^2] - E[(E[X\mid Y])^2]$ and $\operatorname{Var}(E[X\mid Y]) = E[(E[X\mid Y])^2] - (E[X])^2$. Add them: $E[X^2] - (E[X])^2$.

*Running example check.* Given $Y = y$, $X$ is uniform on two numbers that differ by 1 or 2: $\operatorname{Var}(X\mid Y = 1) = \frac14$ (values 2, 3), $\operatorname{Var}(X\mid Y = 2) = 1$ (values 1, 3), $\operatorname{Var}(X\mid Y = 3) = \frac14$. So $E[\operatorname{Var}(X\mid Y)] = \frac13(\frac14 + 1 + \frac14) = \frac12$. And $\operatorname{Var}(\frac{6 - Y}2) = \frac14\cdot\frac23 = \frac16$. Total $\frac12 + \frac16 = \frac23 = \operatorname{Var}(X)$ for $X$ uniform on $\{1,2,3\}$. ✓

### Slide 28/36: Conditional expectation $E[X\mid Y]$, Example

> **On the slide.** Consider $Y = \lambda_1$ with probability $p$ and $\lambda_2$ with probability $1-p$. Now consider an exponential random variable $X$ with a random parameter $Y$. What is $E[X]$? $E[X] = E[E[X\mid Y]] = \sum_yE[X\mid Y = y]p_Y(y)$. We have $X\sim$ Exp$(\lambda_1)$ with probability $p$ when $Y = \lambda_1$, and $X\sim$ Exp$(\lambda_2)$ with probability $1 - p$. $E[X\mid Y = \lambda_i] = \frac1{\lambda_i}$, so $E[X] = \frac p{\lambda_1} + \frac{1-p}{\lambda_2}$.

**Going further (a typical exam extension).**

- *Density* (total probability, slide 20): $f_X(x) = p\lambda_1e^{-\lambda_1x} + (1-p)\lambda_2e^{-\lambda_2x}$, a **mixture** (hyperexponential). It is *not* exponential with the average rate.
- *Variance* (total variance): $\operatorname{Var}(X\mid Y = \lambda_i) = \frac1{\lambda_i^2}$, so
$$\operatorname{Var}(X) = \Big(\frac p{\lambda_1^2} + \frac{1-p}{\lambda_2^2}\Big) + \Big(\frac{p}{\lambda_1^2} + \frac{1-p}{\lambda_2^2} - \Big(\frac{p}{\lambda_1} + \frac{1-p}{\lambda_2}\Big)^2\Big).$$

- *Tail*: $P(X>t) = pe^{-\lambda_1t} + (1-p)e^{-\lambda_2t}$.
- Last year's endsem Q4 is the general version: if $P(Z = i) = p_i$ and $X\mid Z = i$ has the distribution of $Y_i$, then $f_X = \sum_ip_if_{Y_i}$ and $E[X] = \sum_ip_iE[Y_i]$.

### Slide 29/36: Conditional expectation $E[X\mid Y]$, Example 2 (random sums)

> **On the slide.** Consider $Y = X_1 + X_2 + \cdots + X_N$, where $N$ is a positive integer valued random variable with PMF $p_N(\cdot)$ and the $X_i$ are independent and identically distributed (i.i.d.) with mean $E[X]$ (and independent of $N$). What is $E[Y]$? Use $E[Y] = E[E[Y\mid N]]$. What is $E[Y\mid N = n]$? $E[Y\mid N = n] = E[X_1 + \cdots + X_n] = nE[X]$. This implies $E[Y\mid N] = NE[X]$. Now $E[Y] = E[E[Y\mid N]] = E[NE[X]] = E[X]E[N]$. **What is $\operatorname{Var}(Y)$? (section 4.5)**

**Where independence of $N$ is used.** $E[Y\mid N = n] = E[X_1 + \cdots + X_n\mid N = n] = E[X_1 + \cdots + X_n]$ only because knowing $N = n$ does not change the distribution of the $X_i$.

**HW solved: $\operatorname{Var}(Y)$.** Use the law of total variance with $N$ as the conditioning variable. Given $N = n$, $Y$ is a sum of $n$ i.i.d. terms, so (L13) $\operatorname{Var}(Y\mid N = n) = n\operatorname{Var}(X)$, i.e. $\operatorname{Var}(Y\mid N) = N\operatorname{Var}(X)$. Also $E[Y\mid N] = NE[X]$. Hence
$$\boxed{\operatorname{Var}(Y) = E[N\operatorname{Var}(X)] + \operatorname{Var}(NE[X]) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N)}$$
Two sources of randomness: the terms themselves (first part) and how many terms there are (second part). Sanity checks: if $N = n$ is fixed, $\operatorname{Var}(N) = 0$ and we get $n\operatorname{Var}(X)$; if every $X_i = c$ is constant, $Y = cN$ and we get $c^2\operatorname{Var}(N)$.

**Worked example.** You roll a die to get $N$, then toss $N$ fair coins; $Y$ is the number of heads. $E[N] = 3.5$, $\operatorname{Var}(N) = \frac{35}{12}$, $E[X] = \frac12$, $\operatorname{Var}(X) = \frac14$:
$$E[Y] = 3.5\cdot\tfrac12 = 1.75,\qquad\operatorname{Var}(Y) = 3.5\cdot\tfrac14 + \tfrac14\cdot\tfrac{35}{12} = \tfrac{7}{8} + \tfrac{35}{48} = \tfrac{77}{48}\approx1.60 .$$

## Part B: extra worked examples and problems

**B1 (last year's midsem Q1).** A fair die is rolled until a 6 appears. Each roll pays its face value, except the final 6, which pays 0. Find the expected total reward.

*Solution.* Let $N$ = number of rolls, Geometric$(\frac16)$, $E[N] = 6$. Given $N = n$, the first $n - 1$ rolls are non-6 rolls, each uniform on $\{1,\dots,5\}$ with mean 3 (conditioning on "not a 6", L11 slide 10), and the last pays 0. So $E[Y\mid N] = 3(N - 1)$ and
$$E[Y] = E[3(N-1)] = 3(6 - 1) = 15 .$$
(Last year's solution also does it by summing the series $\sum_n3(n-1)(\frac56)^{n-1}\frac16$; the iterated-expectation route is the one to learn.)

**B2 (last year's midsem Q2).** $X, Y$ i.i.d. $\mathcal U[0,1]$. Prove $P(X<Y) = \frac12$ by conditioning.

*Solution.* Condition on $Y$ (the continuous total probability theorem):
$$P(X<Y) = \int_0^1P(X<Y\mid Y = y)f_Y(y)\,dy = \int_0^1P(X<y)\,dy = \int_0^1y\,dy = \frac12 .$$
The step $P(X<Y\mid Y = y) = P(X<y)$ uses independence. (For i.i.d. continuous variables, symmetry gives $\frac12$ without any integral: $P(X<Y) = P(Y<X)$ and $P(X = Y) = 0$.)

**B3 (last year's HW5 Q9).** $f_{XY} = \frac{x^2}{4} + \frac{y^2}{4} + \frac{xy}{6}$ on $0\le x\le1$, $0\le y\le2$. For $0\le y\le2$ find $f_{X\mid Y}(x\mid y)$ and $P(X<\frac12\mid Y = y)$.

*Solution.* $f_Y(y) = \int_0^1\big(\frac{x^2}{4} + \frac{y^2}{4} + \frac{xy}{6}\big)dx = \frac1{12} + \frac{y^2}{4} + \frac{y}{12}$. Multiply top and bottom by 12:
$$\begin{gathered}f_{X\mid Y}(x\mid y) = \frac{3x^2 + 3y^2 + 2xy}{1 + y + 3y^2},\quad 0\le x\le1; \\[3pt] P(X<\tfrac12\mid Y = y) = \frac{\frac18 + \frac32y^2 + \frac y4}{1 + y + 3y^2} = \frac{1 + 2y + 12y^2}{8(1 + y + 3y^2)} .\end{gathered}$$
(Check at $y = 0$: $f_{X\mid Y}(x\mid0) = 3x^2$, and $P(X<\frac12\mid Y = 0) = \frac18$. ✓)

**B4 (Bertsekas Problem 3.21, breaking a stick twice).** Break a stick of length $\ell$ at a uniform point and keep the left piece $Y$; break that at a uniform point and keep the left piece $X$. Find $f_{XY}$, $f_X$ and $E[X]$ two ways.

*Solution.* $f_Y(y) = \frac1\ell$ on $[0,\ell]$ and $f_{X\mid Y}(x\mid y) = \frac1y$ on $[0,y]$. Multiplication rule: $f_{XY}(x,y) = \frac{1}{\ell y}$ for $0\le x\le y\le\ell$. Marginal:
$$f_X(x) = \int_x^\ell\frac{dy}{\ell y} = \frac1\ell\ln\frac\ell x,\quad0<x\le\ell;\qquad E[X] = \int_0^\ell\frac x\ell\ln\frac\ell x\,dx = \frac\ell4 .$$
Iterated expectations is much faster: $E[X\mid Y] = \frac Y2$, so $E[X] = \frac{E[Y]}{2} = \frac\ell4$.

**B5 (Bertsekas Problem 3.23(c) to (e), the triangle again).** $(X,Y)$ uniform on the triangle $(0,0)$, $(1,0)$, $(0,1)$ (L10 B4). Find $f_{X\mid Y}$, $E[X\mid Y = y]$, and $E[X]$ by total expectation and symmetry.

*Solution.* The slice at height $y$ is $[0, 1-y]$ and the joint is flat, so $X\mid Y = y\sim\mathcal U[0, 1-y]$: $f_{X\mid Y}(x\mid y) = \frac1{1-y}$ and $E[X\mid Y = y] = \frac{1 - y}{2}$. Total expectation: $E[X] = \frac{1 - E[Y]}{2}$. By symmetry $E[X] = E[Y]$, so $E[X] = \frac{1 - E[X]}{2}$, i.e. $E[X] = \frac13$.

**B6 (Bertsekas Problem 2.32, joint lives).** $m$ couples ($2m$ people); each person is alive later with probability $p$, independently. $A$ = number alive, $S$ = number of couples with both alive. Find $E[S\mid A = a]$.

*Solution.* Given $A = a$, by symmetry the set of survivors is a uniformly random $a$-subset of the $2m$ people. Write $S = \sum_{j=1}^m\mathbf 1_j$, where $\mathbf 1_j$ indicates that couple $j$ survives. $P(\text{both in couple } j\text{ survive}\mid A = a) = \frac{\binom{2m-2}{a-2}}{\binom{2m}{a}} = \frac{a(a-1)}{2m(2m-1)}$. Linearity of conditional expectation:
$$E[S\mid A = a] = m\cdot\frac{a(a-1)}{2m(2m-1)} = \frac{a(a-1)}{2(2m-1)} .$$
(Check: $a = 2m$ gives $m$.)

**B7 (Bertsekas Problem 4.41, the elevator; a compound Poisson sum).** $N\sim$ Poisson$(\lambda)$ people enter; person $i$'s excess weight fraction $X_i\sim\mathcal U[0,1]$, independent. $Y = \sum_{i=1}^NX_i$. Find $E[Y]$ and $\operatorname{Var}(Y)$.

*Solution.* $E[Y] = E[N]E[X] = \frac\lambda2$. $\operatorname{Var}(Y) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N) = \frac\lambda{12} + \frac\lambda4 = \frac\lambda3$. (For a Poisson number of terms this always simplifies to $\lambda E[X^2]$, here $\lambda\cdot\frac13$. ✓ The MGF part of this problem is in the L14 to L20 notes.)

**B8 (Bertsekas Problem 2.41(c), traffic tickets).** You drive 250 days a year and get a ticket on each day with probability $0.02$, independently. Each ticket costs \$10, \$20 or \$50 with probabilities $0.5$, $0.3$, $0.2$. Find the mean and variance of the yearly amount.

*Solution.* $N\sim$ Binomial$(250, 0.02)$: $E[N] = 5$, $\operatorname{Var}(N) = 4.9$. One ticket: $E[X] = 5 + 6 + 10 = 21$, $E[X^2] = 50 + 120 + 500 = 670$, $\operatorname{Var}(X) = 670 - 441 = 229$. So $E[Y] = 5\cdot21 = 105$ and
$$\operatorname{Var}(Y) = 5\cdot229 + 21^2\cdot4.9 = 1145 + 2160.9 = 3305.9 .$$

**B9 (a two-stage experiment with a continuous first stage).** $P\sim\mathcal U[0,1]$ is the (random) bias of a coin; given $P = p$, toss it $n$ times and let $K$ be the number of heads. Find $E[K]$, $\operatorname{Var}(K)$ and $P(K = k)$.

*Solution.* $K\mid P\sim$ Binomial$(n,P)$, so $E[K\mid P] = nP$ and $\operatorname{Var}(K\mid P) = nP(1-P)$.
$$\begin{gathered}E[K] = nE[P] = \frac n2 \\[3pt] \operatorname{Var}(K) = nE[P - P^2] + n^2\operatorname{Var}(P) = n\Big(\frac12 - \frac13\Big) + \frac{n^2}{12} = \frac{n(n+2)}{12}.\end{gathered}$$
And $P(K = k) = \int_0^1\binom nkp^k(1-p)^{n-k}dp = \binom nk\frac{k!\,(n-k)!}{(n+1)!} = \frac1{n+1}$ for $k = 0,\dots,n$: **uniform**! (The integral is the Beta integral $\int_0^1p^a(1-p)^bdp = \frac{a!\,b!}{(a+b+1)!}$.) Compare: a fair coin gives $\operatorname{Var}(K) = \frac n4$, much smaller than $\frac{n(n+2)}{12}$ for large $n$; uncertainty about the bias adds the $\operatorname{Var}(E[K\mid P])$ term.

**B10 (Bertsekas Problem 4.26, variance of a product).** $X$, $Y$ independent. Show $\operatorname{Var}(XY) = (E[X])^2\operatorname{Var}(Y) + (E[Y])^2\operatorname{Var}(X) + \operatorname{Var}(X)\operatorname{Var}(Y)$.

*Solution.* Condition on $X$. $E[XY\mid X] = XE[Y]$ and $\operatorname{Var}(XY\mid X) = X^2\operatorname{Var}(Y)$. Total variance:
$$\begin{aligned}\operatorname{Var}(XY) &= E[X^2]\operatorname{Var}(Y) + (E[Y])^2\operatorname{Var}(X) \\  &= \big(\operatorname{Var}(X) + (E[X])^2\big)\operatorname{Var}(Y) + (E[Y])^2\operatorname{Var}(X).\end{aligned}$$


# Lecture 13: Sums of random variables, Bayes' rule revisited, variance of sums (Deck 3, slides 2 to 13)

**The big picture.** Three tools that combine everything from L9 to L12. (1) The **convolution formula** gives the distribution of $X + Y$. (2) **Bayes' rule for random variables** turns $f_{Y\mid X}$ (how measurements behave) into $f_{X\mid Y}$ (what we learn from a measurement). (3) The **variance of a sum** expands like a bracket, with covariance as the cross term. The last one is the seed of the law of large numbers (L17 in the L14 to L20 notes).

**Read alongside:** Bertsekas §3.6 (continuous Bayes' rule), §4.1 (sums of independent variables, convolution) and §4.2 (covariance); probabilitycourse.com §5.2.4 (functions of two continuous random variables) and §5.3.1 (covariance and correlation). There is a shorter earlier version of this lecture in `study/L13-notes.md`; this section replaces it.

## Part A: the slides

### Slide 2/18: Topics

> **On the slide.** We have seen: conditioning; law of iterated expectations. This class: sums of random variables and convolutions; Bayes rule revisited; variance of sums of random variables; moment generating functions.

The MGF slides (14 to 18) are not in the PDF; MGFs are taught in L14 (see the last section and the L14 to L20 notes).

### Slide 3/18: Sums of independent random variables

> **On the slide.** Consider $Z = X + Y$. What is the pdf of $Z$? What is $p_Z(z)$ or $f_Z(z)$? $p_Z(z) = \sum_{\{(x,y): x+y = z\}}p_{X,Y}(x,y)$; $f_Z(z) = \int_{\{(x,y): x+y = z\}}f_{X,Y}(x,y)\,dx\,dy$. If $X$ and $Y$ are independent, $p_{X,Y}(x,y) = p_X(x)p_Y(y)$ and $f_{X,Y}(x,y) = f_X(x)f_Y(y)$. This gives us the
> **Convolution formula**
> $$p_Z(z) = \sum_xp_X(x)\,p_Y(z - x),\qquad f_Z(z) = \int_{-\infty}^\infty f_X(x)\,f_Y(z - x)\,dx .$$
> HW: What if $X$ and $Y$ are not independent?

**Where it comes from.** The discrete version is L10 slide 22 with $g(x,y) = x + y$: collect the cells on the anti-diagonal $x + y = z$. Once $x$ is fixed, $y$ must be $z - x$, so there is one cell per $x$:
$$p_Z(z) = \sum_xp_{XY}(x, z - x).$$
For the continuous case, go through the CDF (the safe route of L8). For independent $X$, $Y$, condition on $X = x$:
$$F_Z(z) = P(X + Y\le z) = \int f_X(x)\,P(Y\le z - x)\,dx = \int f_X(x)F_Y(z - x)\,dx,$$
and differentiating under the integral gives $f_Z(z) = \int f_X(x)f_Y(z - x)\,dx$.

**HW solved: not independent.** Nothing changes except that the joint no longer factorises:
$$\boxed{p_Z(z) = \sum_xp_{XY}(x, z - x),\qquad f_Z(z) = \int_{-\infty}^\infty f_{XY}(x, z - x)\,dx}$$
(The slide's $\int_{\{x+y = z\}}f\,dx\,dy$ is shorthand for this line integral.) Example: $(X,Y)$ uniform on the triangle $x, y\ge0$, $x + y\le1$ ($f = 2$). Then $f_Z(z) = \int_0^z2\,dx = 2z$ for $0\le z\le1$. (Check: $F_Z(z) = z^2$, the area of the smaller triangle $\{x + y\le z\}$ times 2.)

**The recipe (where most mistakes happen).**

1. Write $f_X(x)f_Y(z - x)$.
2. Find the $x$ for which **both** factors are non-zero. This gives limits that depend on $z$.
3. Split into cases of $z$ according to how the limits change.
4. Integrate (or sum) in each case, and state that $f_Z = 0$ elsewhere.

### Slide 4/18: Examples

> **On the slide.** EX1: Suppose $X$ and $Y$ are independent and $\mathcal U[0,1]$. Find the pdf and CDF of $Z = X + Y$. (Link: the Wikipedia animation "Convolution of box signal with itself".) Ex2: Suppose $X$ and $Y$ are outcomes of independent rolls of dice. Find the pmf of $Z = X + Y$.

**EX1.** $f_X(x) = 1$ needs $0\le x\le1$; $f_Y(z - x) = 1$ needs $0\le z - x\le1$, i.e. $z - 1\le x\le z$. So $x\in[\max(0, z-1), \min(1, z)]$:
$$f_Z(z) = \begin{cases}\int_0^z1\,dx = z & 0\le z\le1\\ \int_{z-1}^11\,dx = 2 - z & 1\le z\le2\\ 0 & \text{otherwise}\end{cases}\qquad F_Z(z) = \begin{cases}0 & z<0\\ \frac{z^2}2 & 0\le z\le1\\ 1 - \frac{(2-z)^2}2 & 1\le z\le2\\ 1 & z>2\end{cases}$$
A **triangle** on $[0,2]$ peaking at $z = 1$. The animation shows one box sliding across the other; $f_Z(z)$ is the overlap length when the shift is $z$. (The CDF is also immediate geometrically: $\{X + Y\le z\}$ is a corner triangle of area $\frac{z^2}{2}$.)

**Ex2.** $p_Z(z) = \sum_x\frac16\cdot\frac16$ over the $x\in\{1,\dots,6\}$ with $z - x\in\{1,\dots,6\}$, i.e. $\max(1, z-6)\le x\le\min(6, z-1)$. Counting:
$$p_Z(z) = \frac{6 - |z - 7|}{36},\qquad z = 2, 3,\dots,12 .$$
The discrete version of the same triangle. Adding more uniforms makes the shape smoother and more bell-like: three uniforms give a piecewise quadratic (Bertsekas Problem 4.12), and the limit is the central limit theorem.

### Slide 5/18: Inference problem

> **On the slide.** A block diagram: $X$ (with density $f_X(x)$) $\to$ Measurement $\to$ $Y$ (with density $f_{Y\mid X}(y\mid x)$) $\to$ Inference $\to$ $f_{X\mid Y}(x\mid y)$. $X$ is an unobservable random variable with a known distribution. We only observe measurements $Y$ that take values according to $f_{Y\mid X}(y\mid x)$. The objective is to draw inference about $X$ having seen a realisation of $Y$, i.e. obtain $f_{X\mid Y}(x\mid y)$ using only $f_X(x)$ and $f_{Y\mid X}(y\mid x)$, both of which are known.

**Vocabulary.** $f_X$ is the **prior** (what we believe before measuring). $f_{Y\mid X}$ is the **likelihood** or measurement model. $f_{X\mid Y}$ is the **posterior** (what we believe after seeing $Y = y$). Examples: $X$ = transmitted bit, $Y$ = noisy received voltage; $X$ = disease status, $Y$ = test result; $X$ = bulb quality, $Y$ = observed lifetime.

### Slide 6/18: Bayes' rule revisited

> **On the slide.**
> $$P(B\mid A) = \frac{P(A\mid B)P(B)}{P(A)}$$
> For continuous random variables $X$ and $Y$:
> $$f_{X\mid Y}(x\mid y) = \frac{f_{Y\mid X}(y\mid x)f_X(x)}{f_Y(y)} = \frac{f_{Y\mid X}(y\mid x)f_X(x)}{\int_{-\infty}^\infty f_{Y\mid X}(y\mid t)f_X(t)\,dt}$$
> For discrete random variables $X$ and $Y$:
> $$p_{X\mid Y}(x\mid y) = \frac{p_{Y\mid X}(y\mid x)p_X(x)}{p_Y(y)} = \frac{p_{Y\mid X}(y\mid x)p_X(x)}{\sum_ip_{Y\mid X}(y\mid i)p_X(i)}$$

**Proof in one line.** Write the joint both ways (L12 slide 13): $f_{X\mid Y}(x\mid y)f_Y(y) = f_{XY}(x,y) = f_{Y\mid X}(y\mid x)f_X(x)$, and divide by $f_Y(y)$. The denominator is the total probability theorem (L12 slide 20).

**Working rule.** posterior $\propto$ likelihood $\times$ prior, *as a function of $x$*, with $y$ fixed. The denominator does not depend on $x$; it is just whatever constant makes the posterior integrate (or sum) to 1. Often you can recognise the posterior's shape and skip computing it.

### Slide 7/18: Example 3.19 (Bertsekas), bulb lifetime

> **On the slide.** The lifetime of a Philips bulb is assumed to be an exponential random variable $Y$ with parameter $\Lambda$. $\Lambda$ itself is a uniform random variable over $[1, 1.5]$. You test a bulb and see that it has a lifetime of $y$ units. What can you say about the randomness of $\Lambda$ having observed $Y = y$? What is $f_\Lambda(\lambda)$? What is $f_{Y\mid\Lambda}(y\mid\lambda)$? What is $f_Y(y)$? Answer: $f_{\Lambda\mid Y}(\lambda\mid y) = \frac{2\lambda e^{-\lambda y}}{\int_1^{1.5}2te^{-ty}\,dt}$ for $\lambda\in[1,1.5]$.

**Step by step.**

- Prior: $f_\Lambda(\lambda) = \frac{1}{1.5 - 1} = 2$ on $[1, 1.5]$.
- Likelihood: $f_{Y\mid\Lambda}(y\mid\lambda) = \lambda e^{-\lambda y}$, $y\ge0$.
- Evidence: $f_Y(y) = \int_1^{1.5}2te^{-ty}\,dt$ (integrate by parts if you need it in closed form: $\int te^{-ty}dt = -\frac{t}{y}e^{-ty} - \frac{1}{y^2}e^{-ty}$).
- Posterior: likelihood $\times$ prior over evidence, giving the slide's answer.

**Interpretation.** Compare the posterior at the two ends: $\frac{f(1.5\mid y)}{f(1\mid y)} = 1.5e^{-0.5y}$. For a short lifetime ($y<2\ln1.5\approx0.81$) the posterior favours large $\lambda$ (a bad bulb); for a long lifetime it favours small $\lambda$ (a good bulb). The data pull the belief in the sensible direction.

### Slide 8/18: Bayes' rule revisited (mixed case)

> **On the slide.** For discrete $N$ and continuous random variable $Y$:
> $$P(N = n\mid Y = y) = \frac{f_{Y\mid N}(y\mid n)p_N(n)}{f_Y(y)} = \frac{f_{Y\mid N}(y\mid n)p_N(n)}{\sum_if_{Y\mid N}(y\mid i)p_N(i)}$$
> Equivalently:
> $$f_{Y\mid N}(y\mid n) = \frac{P(N = n\mid Y = y)f_Y(y)}{p_N(n)} = \frac{P(N = n\mid Y = y)f_Y(y)}{\int_{-\infty}^\infty P(N = n\mid Y = t)f_Y(t)\,dt}$$

**Rule.** Use a PMF for whichever variable is discrete and a PDF for whichever is continuous; sums over discrete values, integrals over continuous ones. The structure never changes. The first form is used for *detection* (which of finitely many hypotheses is true?), as in the next slide.

### Slide 9/18: Example 3.20 (Bertsekas), signal in noise

> **On the slide.** Suppose $X = 1$ w.p. $p$ and $X = -1$ w.p. $1 - p$. While transmitting this signal, it is corrupted by Gaussian noise $N\sim\mathcal N(0,1)$. We observe $Y = X + N$. Suppose you observe $Y = y$; then show that
> $$P(X = 1\mid Y = y) = \frac{pe^y}{pe^y + (1-p)e^{-y}} .$$
> Intuitively, this probability goes to zero as $y$ decreases to $-\infty$ and increases to 1 as $y$ increases to $\infty$. $P(X = 1\mid Y = y) = \frac{f_{Y\mid X}(y\mid1)p_X(1)}{f_Y(y)}$. Here $f_Y(y) = f_{Y\mid X}(y\mid1)p_X(1) + f_{Y\mid X}(y\mid-1)p_X(-1)$. Substitute values to obtain the answer.

**Solution.** Given $X = 1$, $Y = 1 + N\sim\mathcal N(1,1)$; given $X = -1$, $Y\sim\mathcal N(-1,1)$ (noise independent of the signal). So
$$P(X = 1\mid Y = y) = \frac{p\,e^{-(y-1)^2/2}}{p\,e^{-(y-1)^2/2} + (1-p)\,e^{-(y+1)^2/2}}$$
(the $\frac1{\sqrt{2\pi}}$ cancels). Multiply top and bottom by $e^{(y^2+1)/2}$: $-\frac{(y-1)^2}{2} + \frac{y^2 + 1}{2} = y$ and $-\frac{(y+1)^2}{2} + \frac{y^2+1}2 = -y$. This gives the slide's formula.

**Decision rule.** Decide "$X = 1$" when this posterior exceeds $\frac12$, i.e. $pe^y>(1-p)e^{-y}$, i.e.
$$y>\frac12\ln\frac{1-p}{p}.$$
For $p = \frac12$ the threshold is 0 (decide by the sign of $y$). If $+1$ is a priori more likely ($p>\frac12$), the threshold moves below 0: you need stronger evidence to decide $-1$.

### Slide 10/18: Variance of sums of random variables

> **On the slide.** Let $X_1, X_2,\dots,X_n$ be possibly dependent and non-identical random variables. Let's say you know the joint pdf/pmf for every pair of random variables from this collection. AIM: calculate $\operatorname{Var}(Z)$ where $Z = \sum_{i=1}^na_iX_i$ for some scalars $a_i$.

**Why "every pair" is enough.** The answer will need only $\operatorname{Var}(X_i)$ and $\operatorname{Cov}(X_i,X_j)$, and each of these involves at most two variables at a time. You do not need the full $n$-dimensional joint distribution.

### Slide 11/18: Variance of sums, properties of covariance

> **On the slide.** Recall $\operatorname{Var}(X) = E[X - E[X]]^2 = E[X^2] - E[X]^2$. Also recall $\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y]$. The following properties of covariance follow (HW):
>
> 1. $\operatorname{Cov}(X,X) = \operatorname{Var}(X)$
> 2. If $X, Y$ are independent, $\operatorname{Cov}(X,Y) = 0$
> 3. $\operatorname{Cov}(X,Y) = \operatorname{Cov}(Y,X)$
> 4. $\operatorname{Cov}(aX, Y) = a\operatorname{Cov}(X,Y)$
> 5. $\operatorname{Cov}(X + a, Y) = \operatorname{Cov}(X,Y)$
> 6. $\operatorname{Cov}(X + Z, Y) = \operatorname{Cov}(X,Y) + \operatorname{Cov}(Z,Y)$
> 7. $\operatorname{Cov}\big(\sum_{i=1}^ma_iX_i, \sum_{j=1}^nb_jY_j\big) = \sum_{i=1}^m\sum_{j=1}^na_ib_j\operatorname{Cov}(X_i,Y_j)$

**HW solved.** Use $\operatorname{Cov}(U,V) = E[(U - E U)(V - E V)]$ and linearity of expectation.

1. $\operatorname{Cov}(X,X) = E[(X - EX)^2] = \operatorname{Var}(X)$.
2. Independence gives $E[XY] = E[X]E[Y]$ (L10 slide 14), so $\operatorname{Cov} = 0$.
3. The definition is symmetric in $X$ and $Y$.
4. $aX - E[aX] = a(X - EX)$, so the factor $a$ comes out of the expectation.
5. $(X + a) - E[X + a] = X - EX$: shifting does not change deviations from the mean.
6. $(X + Z) - E[X + Z] = (X - EX) + (Z - EZ)$; multiply by $(Y - EY)$ and use linearity.
7. Apply 4 and 6 repeatedly in the first slot, then use 3 to do the same in the second slot.

**How to remember 7:** covariance **expands like multiplying out brackets**, with constants pulled out and additive constants dropped.

### Slide 12/18: Variance of sums, the derivation

> **On the slide.** AIM: calculate $\operatorname{Var}(Z)$ where $Z = \sum_{i=1}^na_iX_i$. $\operatorname{Var}(Z) = \operatorname{Cov}(Z,Z)$ and therefore
> $$\begin{aligned}\operatorname{Cov}\Big(\sum_ia_iX_i, \sum_ja_jX_j\Big) &= \sum_i\sum_ja_ia_j\operatorname{Cov}(X_i,X_j) \\  &= \sum_{i=1}^na_i^2\operatorname{Var}(X_i) + \sum_{(i,j): i\ne j}a_ia_j\operatorname{Cov}(X_i,X_j).\end{aligned}$$
> $$\boxed{\operatorname{Var}\Big(\sum_{i=1}^na_iX_i\Big) = \sum_{i=1}^na_i^2\operatorname{Var}(X_i) + \sum_{(i,j): i\ne j}a_ia_j\operatorname{Cov}(X_i,X_j)}$$

**Reading the double sum.** Put the terms $a_ia_j\operatorname{Cov}(X_i,X_j)$ in an $n\times n$ grid. The diagonal ($i = j$) gives the variances (property 1). Off the diagonal, the grid is symmetric (property 3), so each unordered pair appears **twice**:
$$\operatorname{Var}\Big(\sum_ia_iX_i\Big) = \sum_ia_i^2\operatorname{Var}(X_i) + 2\sum_{i<j}a_ia_j\operatorname{Cov}(X_i,X_j).$$
(In matrix form, $\operatorname{Var}(\mathbf a^T\mathbf X) = \mathbf a^TC_{\mathbf X}\mathbf a$ with the covariance matrix of L19.)

### Slide 13/18: Variance of sums, consequences

> **On the slide.** Show that $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y)$. Now if the $X_i$ are independent, what is $\operatorname{Var}(Z)$? Let $\{X_i, i = 1, 2,\dots,n\}$ be i.i.d. and consider $S_n = \frac{\sum_{i=1}^nX_i}{n}$. Show that $\operatorname{Var}(S_n) = \frac{\operatorname{Var}(X)}{n}$.

**Solutions.**

- $n = 2$, $a_1 = a_2 = 1$: the off-diagonal pair appears twice, giving $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y)$. (Last year's midsem Q4 asked exactly this; a direct proof expands $E[((X - EX) + (Y - EY))^2]$.) More generally,
$$\operatorname{Var}(aX + bY + c) = a^2\operatorname{Var}(X) + b^2\operatorname{Var}(Y) + 2ab\operatorname{Cov}(X,Y).$$
In particular $\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) - 2\operatorname{Cov}(X,Y)$: for independent variables, **variances add even when you subtract**.

- Independent $X_i$: every covariance is 0, so $\operatorname{Var}(\sum_ia_iX_i) = \sum_ia_i^2\operatorname{Var}(X_i)$. (Pairwise uncorrelated is enough.)
- Sample mean: $a_i = \frac1n$, so $\operatorname{Var}(S_n) = n\cdot\frac1{n^2}\operatorname{Var}(X) = \frac{\operatorname{Var}(X)}{n}$. Averaging $n$ samples shrinks the spread by a factor $n$ (the standard deviation by $\sqrt n$). Together with $E[S_n] = E[X]$ and Chebyshev's inequality, this gives the weak law of large numbers: $P(|S_n - E[X]|\ge\epsilon)\le\frac{\operatorname{Var}(X)}{n\epsilon^2}\to0$.

## Part B: extra worked examples and problems

### Convolution

**B1 (last year's HW6 Q13; Bertsekas Problem 4.10).** $X$ uniform on $\{1,2,3\}$; $P(Y = 0) = \frac12$, $P(Y = 1) = \frac13$, $P(Y = 2) = \frac16$; independent. Find the PMF of $Z = X + Y$.

*Solution.* $p_Z(z) = \sum_x\frac13p_Y(z - x)$, i.e. $\frac13$ times the sum of $p_Y$ over the allowed values $z - x$:
$$\begin{gathered}p_Z(1) = \tfrac13\cdot\tfrac12 = \tfrac16,\quad p_Z(2) = \tfrac13\big(\tfrac13 + \tfrac12\big) = \tfrac5{18}, \\[3pt] p_Z(3) = \tfrac13\cdot1 = \tfrac13,\quad p_Z(4) = \tfrac13\big(\tfrac16 + \tfrac13\big) = \tfrac16,\quad p_Z(5) = \tfrac13\cdot\tfrac16 = \tfrac1{18}.\end{gathered}$$
(Sum: $\frac{3 + 5 + 6 + 3 + 1}{18} = 1$. ✓)

**B2 (last year's HW6 Q14; Bertsekas Problem 4.11).** Show that the sum of independent Poisson$(\mu)$ and Poisson$(\lambda)$ is Poisson$(\mu + \lambda)$.

*Solution.* For $z = 0, 1, 2,\dots$:
$$p_Z(z) = \sum_{x=0}^ze^{-\mu}\frac{\mu^x}{x!}e^{-\lambda}\frac{\lambda^{z-x}}{(z-x)!} = \frac{e^{-(\mu+\lambda)}}{z!}\sum_{x=0}^z\binom zx\mu^x\lambda^{z-x} = e^{-(\mu+\lambda)}\frac{(\mu+\lambda)^z}{z!},$$
by the binomial theorem. (The limits $0\le x\le z$ come from needing both $x\ge0$ and $z - x\ge0$.)

**B3 (last year's endsem Q3; Bertsekas Problem 4.8).** $X_1, X_2$ i.i.d. Exp$(\lambda)$. Find the PDF of $Z = X_1 + X_2$ and $E[Z]$.

*Solution.* Both factors are non-zero when $x\ge0$ and $z - x\ge0$, so for $z\ge0$:
$$f_Z(z) = \int_0^z\lambda e^{-\lambda x}\lambda e^{-\lambda(z-x)}\,dx = \lambda^2e^{-\lambda z}\int_0^zdx = \lambda^2ze^{-\lambda z},$$
and $0$ for $z<0$. This is Gamma$(2,\lambda)$ (Erlang). $E[Z] = \frac2\lambda$ (linearity; no integral needed). With *different* rates $\lambda\ne\mu$ the same steps give $f_Z(z) = \frac{\lambda\mu}{\mu - \lambda}(e^{-\lambda z} - e^{-\mu z})$.

**B4 (Bertsekas Problem 4.9 / Example 4.9 variant, a difference).** $X\sim$ Exp$(\lambda)$, $Y\sim$ Exp$(\mu)$ independent. Find the PDF of $W = X - Y$.

*Solution.* $W = X + (-Y)$ with $f_{-Y}(t) = \mu e^{\mu t}$ for $t\le0$. For $w\ge0$: need $x\ge0$ and $x - w\ge0$, so $x\ge w$:
$$f_W(w) = \int_w^\infty\lambda e^{-\lambda x}\mu e^{-\mu(x - w)}dx = \frac{\lambda\mu}{\lambda + \mu}e^{-\lambda w}.$$
For $w<0$: $x\ge0$ is the binding constraint and the same computation gives $\frac{\lambda\mu}{\lambda+\mu}e^{\mu w}$. Two exponential tails glued at 0; for $\lambda = \mu$ it is the Laplace density $\frac\lambda2e^{-\lambda|w|}$.

**B5 (last year's Tutorial 6 Q1; Bertsekas Problem 4.6).** $(X,Y)$ is uniform on the triangle with vertices $(0,1)$, $(0,-1)$, $(1,0)$. Find the CDF and PDF of $Z = |X - Y|$.

*Solution.* The triangle is $\{0\le x\le1, |y|\le1 - x\}$, of area 1, so $f_{XY} = 1$. First find the density of $U = X - Y$ with the dependent-convolution formula from slide 3 (for differences: $f_U(u) = \int f_{XY}(x, x - u)\,dx$). The point $(x, x - u)$ is in the triangle when $x\ge0$ and $|x - u|\le1 - x$. The second condition means $x - u\le1 - x$ (i.e. $x\le\frac{1+u}{2}$) and $u - x\le1 - x$ (i.e. $u\le1$). So for $-1\le u\le1$ the allowed range is $0\le x\le\frac{1+u}{2}$. So $f_U(u) = \frac{1+u}{2}$ on $[-1,1]$. Then $Z = |U|$ has, for $0\le z\le1$,
$$f_Z(z) = f_U(z) + f_U(-z) = \frac{1+z}2 + \frac{1-z}2 = 1,\qquad F_Z(z) = z .$$
So $Z\sim\mathcal U[0,1]$, a surprisingly clean answer. (A simulation with $2\times10^6$ points gives quartiles $0.251$, $0.501$, $0.751$.)

**B6 (Bertsekas Problem 3.35(b), conditioning on a sum).** $X, Y$ i.i.d. Exp$(\lambda)$, $Z = X + Y$. Find $f_{X\mid Z}(x\mid z)$.

*Solution.* Bayes with $f_{Z\mid X}(z\mid x) = f_Y(z - x)$ (given $X = x$, $Z$ is $Y$ shifted by $x$):
$$f_{X\mid Z}(x\mid z) = \frac{f_X(x)f_Y(z - x)}{f_Z(z)} = \frac{\lambda e^{-\lambda x}\lambda e^{-\lambda(z-x)}}{\lambda^2ze^{-\lambda z}} = \frac1z,\qquad 0\le x\le z .$$
Given the total, the split point is **uniform**: knowing $X + Y = z$ tells you nothing about where in $[0, z]$ the first part ends. (The joint density $\lambda^2e^{-\lambda(x+y)}$ is constant along each line $x + y = z$, so every split is equally likely.)

### Bayes' rule

**B7 (last year's HW6 Q6, the Geiger counter).** The rate is $\lambda_1 = 0.1$ (prior 0.8) or $\lambda_2 = 0.5$ (prior 0.2). The count in one second is $K\mid\lambda\sim$ Poisson$(\lambda)$. You observe $K = 2$. Find $P(\lambda = 0.1\mid K = 2)$.

*Solution.* Discrete Bayes (slide 6). The likelihoods are $e^{-0.1}\frac{0.1^2}{2}$ and $e^{-0.5}\frac{0.5^2}{2}$; the $\frac12$ cancels:
$$P(\lambda_1\mid K = 2) = \frac{0.8\cdot0.01\,e^{-0.1}}{0.8\cdot0.01\,e^{-0.1} + 0.2\cdot0.25\,e^{-0.5}} = \frac{0.007239}{0.007239 + 0.030327}\approx0.193 .$$
Two counts in a second is far more typical of the high rate, so the belief flips from 80% "low" to about 19% "low".

**B8 (Bertsekas Problem 3.34, the defective coin minting machine).** The bias $P$ of a coin has PDF $f_P(p) = pe^p$ on $[0,1]$. (a) Find $P(H)$ for one toss. (b) Given heads, find the posterior of $P$. (c) Given heads on the first toss, find $P(\text{heads on the second})$.

*Solution.* (a) Total probability: $P(H) = \int_0^1p\cdot pe^p\,dp = \big[e^p(p^2 - 2p + 2)\big]_0^1 = e - 2\approx0.718$.
(b) Mixed Bayes (slide 8): $f_{P\mid H}(p) = \frac{p\cdot pe^p}{e - 2} = \frac{p^2e^p}{e - 2}$ on $[0,1]$.
(c) Given $P$, tosses are independent, so $P(H_2\mid H_1) = E[P\mid H_1] = \frac{\int_0^1p^3e^p\,dp}{e - 2} = \frac{6 - 2e}{e - 2}\approx0.784$. Seeing a head raised the probability of the next head from $0.718$ to $0.784$: the tosses are *not* independent unconditionally, only given $P$.

**B9 (a medical test with a continuous reading).** A patient is ill with probability $0.01$. A blood marker $Y$ is $\mathcal N(5, 1)$ for ill patients and $\mathcal N(2, 1)$ for healthy ones. The reading is $y = 4$. Find $P(\text{ill}\mid Y = 4)$.

*Solution.* Mixed Bayes; the normal constants cancel:
$$\begin{aligned}P(\text{ill}\mid Y &= 4) \\  &= \frac{0.01e^{-(4-5)^2/2}}{0.01e^{-1/2} + 0.99e^{-(4-2)^2/2}} \\  &= \frac{0.01\cdot0.6065}{0.006065 + 0.99\cdot0.1353} \\  &= \frac{0.006065}{0.006065 + 0.1340}\approx0.043 .\end{aligned}$$
Even though $y = 4$ is closer to the ill mean, the tiny prior keeps the posterior at about 4%. (Base-rate effect, the continuous version of the L3 disease-test example.)

### Variance of sums and covariance

**B10 (last year's HW6 Q9).** $\operatorname{Var}(X) = 4$, $\operatorname{Var}(Y) = 9$, $\operatorname{Cov}(X,Y) = -2$. Find $\operatorname{Var}(3X - 2Y + 5)$, and the value if $X$ and $Y$ were independent.

*Solution.* $9\cdot4 + 4\cdot9 + 2\cdot3\cdot(-2)\cdot(-2) = 36 + 36 + 24 = 96$. Independent: $72$. The "$+5$" never matters, and the two minus signs make the cross term positive.

**B11 (Bertsekas Problem 4.18).** $W, X, Y, Z$ have mean 0, variance 1, and are pairwise uncorrelated. Let $R = W + X$, $S = X + Y$, $T = Y + Z$. Find $\rho(R,S)$ and $\rho(R,T)$.

*Solution.* $\operatorname{Var}(R) = \operatorname{Var}(S) = \operatorname{Var}(T) = 2$. Expand bilinearly: $\operatorname{Cov}(R,S) = \operatorname{Cov}(W + X, X + Y) = \operatorname{Var}(X) = 1$ (the only shared term), and $\operatorname{Cov}(R,T) = 0$ (nothing shared). So $\rho(R,S) = \frac{1}{2}$ and $\rho(R,T) = 0$.

**B12 (the hat problem, Bertsekas §4.2).** $n$ people throw their hats in a box and each picks one at random. Let $X$ be the number who get their own hat. Find $E[X]$ and $\operatorname{Var}(X)$.

*Solution.* $X = \sum_{i=1}^nX_i$ with $X_i = \mathbf 1\{\text{person }i\text{ gets own hat}\}$. $E[X_i] = \frac1n$, so $E[X] = 1$. $\operatorname{Var}(X_i) = \frac1n(1 - \frac1n)$. For $i\ne j$: $E[X_iX_j] = P(\text{both}) = \frac1n\cdot\frac1{n-1}$, so $\operatorname{Cov}(X_i,X_j) = \frac{1}{n(n-1)} - \frac1{n^2} = \frac{1}{n^2(n-1)}$. Then
$$\operatorname{Var}(X) = n\cdot\frac1n\Big(1 - \frac1n\Big) + n(n-1)\cdot\frac{1}{n^2(n-1)} = 1 - \frac1n + \frac1n = 1 .$$
Mean 1 and variance 1 for every $n\ge2$, the same as a Poisson(1). The ordered-pair count $n(n-1)$ is the "$\sum_{i\ne j}$" of slide 12.

**B13 (the binomial variance in one line).** $X\sim$ Binomial$(n,p)$ is a sum of $n$ independent Bernoulli$(p)$ indicators, so $\operatorname{Var}(X) = np(1-p)$ with no algebra. Contrast with drawing **without replacement** (hypergeometric: $n$ draws from $N$ balls of which $K$ are red): the indicators are now negatively correlated, $\operatorname{Cov}(X_i,X_j) = \frac{K(K-1)}{N(N-1)} - \frac{K^2}{N^2}$, and the variance shrinks by the factor $\frac{N - n}{N - 1}$.

**B14 (choosing a portfolio: minimum variance).** Two assets have returns $X$, $Y$ with $\operatorname{Var}(X) = \sigma_X^2$, $\operatorname{Var}(Y) = \sigma_Y^2$, $\operatorname{Cov}(X,Y) = c$. You invest a fraction $a$ in $X$ and $1 - a$ in $Y$. Which $a$ minimises the variance?

*Solution.* $V(a) = a^2\sigma_X^2 + (1-a)^2\sigma_Y^2 + 2a(1-a)c$. Setting $V'(a) = 0$:
$$a^* = \frac{\sigma_Y^2 - c}{\sigma_X^2 + \sigma_Y^2 - 2c}.$$
For independent assets with equal variance $\sigma^2$, $a^* = \frac12$ and $V = \frac{\sigma^2}{2}$: diversification halves the risk, the two-asset version of $\operatorname{Var}(S_n) = \frac{\operatorname{Var}(X)}{n}$.


# Lecture 14: Moment generating functions and sampling a discrete random variable (Deck A, slides 1 to 12), short version

**This lecture is covered in full in the companion notes** `study/L14-L20-notes.md` (and `.pdf`): "Lecture 14, part 1: Moment generating functions" (slides 2 to 6, with 13 extra problems) and the first half of "Lectures 14 and 15: Generating samples from a uniform" (slides 7 to 12). This section is a one-page summary so that this document is complete, and to show how L14 connects to L12 and L13.

## What the slides say, in one page

**Slides 2 and 3: definition and examples.** The moment generating function of $X$ is
$$M_X(t) = E\big[e^{tX}\big] = \sum_xe^{tx}p_X(x)\quad\text{or}\quad\int e^{tx}f_X(x)\,dx,$$
defined for the $t$ where the expectation is finite (the *region of convergence*, which always contains $t = 0$, where $M_X(0) = 1$). Standard examples:

| $X$ | $M_X(t)$ | where finite |
|---|---|---|
| Bernoulli$(p)$ | $1 - p + pe^t$ | all $t$ |
| Binomial$(n,p)$ | $(1 - p + pe^t)^n$ | all $t$ |
| Geometric$(p)$ | $\dfrac{pe^t}{1 - (1-p)e^t}$ | $t<-\ln(1-p)$ |
| Poisson$(\lambda)$ | $e^{\lambda(e^t - 1)}$ | all $t$ |
| Uniform$[a,b]$ | $\dfrac{e^{tb} - e^{ta}}{t(b-a)}$ ($=1$ at $t=0$) | all $t$ |
| Exponential$(\lambda)$ | $\dfrac{\lambda}{\lambda - t}$ | $t<\lambda$ |
| $\mathcal N(\mu,\sigma^2)$ | $e^{\mu t + \sigma^2t^2/2}$ | all $t$ |

**Slide 4: moments from derivatives.** $M_X^{(k)}(0) = E[X^k]$. So $E[X] = M'(0)$ and $\operatorname{Var}(X) = M''(0) - (M'(0))^2$. Shortcut: with $K(t) = \ln M_X(t)$, $E[X] = K'(0)$ and $\operatorname{Var}(X) = K''(0)$.

**Key fact (used on slides 5 and 6).** If two MGFs agree on an open interval around 0, the distributions are the same. So you can identify a distribution by recognising its MGF.

**Slide 5: sums of independent variables.** If $X$ and $Y$ are independent,
$$M_{X+Y}(t) = E[e^{tX}e^{tY}] = M_X(t)\,M_Y(t).$$
This is the L10 fact $E[g(X)h(Y)] = E[g(X)]E[h(Y)]$ with $g = h = e^{t\,\cdot}$. It turns the **convolution** of L13 into a **product**. Example: Poisson$(\mu)$ + Poisson$(\lambda)$ has MGF $e^{\mu(e^t-1)}e^{\lambda(e^t-1)} = e^{(\mu+\lambda)(e^t-1)}$, so it is Poisson$(\mu+\lambda)$: compare with the convolution proof in L13 B2.

**Slide 6: i.i.d. sums and random sums.** For $n$ i.i.d. terms, $M_{X_1+\cdots+X_n}(t) = (M_X(t))^n$. For a random sum $Y = X_1 + \cdots + X_N$ with $N$ independent of the i.i.d. $X_i$, condition on $N$ (L12):
$$M_Y(t) = E\big[E[e^{tY}\mid N]\big] = E\big[(M_X(t))^N\big] = M_N\big(\ln M_X(t)\big),$$
i.e. take $M_N(s)$ and replace every $e^s$ by $M_X(t)$. Differentiating at 0 gives back the L12 slide 29 formulas $E[Y] = E[N]E[X]$ and $\operatorname{Var}(Y) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N)$.

**Slides 7 to 12: sampling a discrete random variable from a uniform.** Given $U\sim\mathcal U[0,1]$ and a PMF $p_0, p_1,\dots$ on values $x_0<x_1<\cdots$, output
$$X = x_j\quad\text{if}\quad\sum_{i<j}p_i\le U<\sum_{i\le j}p_i ,$$
so $P(X = x_j) = p_j$ (the length of the $j$-th segment). Since the cut points are the CDF values, this is $X = F_X^{-1}(U)$ with the generalised inverse $F^{-1}(u) = \inf\{x: F(x)\ge u\}$: the **inverse transform method**. Example: a fair die is $X = \lceil6U\rceil$.

## Where to go next

- Full slide-by-slide notes, the MGF problems (B1 to B13) and the simulation problems: `L14-L20-notes`, Lecture 14 part 1 and "Lectures 14 and 15".
- Matching practice: last year's HW6 Q1 to Q3, Q5, Q7, Q10 to Q12; Tutorial 6 Q2 to Q5 and Q8; Quiz 2 Q1; endsem Q1. The practice map in the L14 to L20 notes says where each is solved.


# Practice map, formula sheet and self-test

## 1. Practice map: last year's questions, and where each is solved

Last year's Homework 4 and 5, Tutorials 4 and 5, Homework 6 and Tutorial 6 (the L13 parts), the mid-semester paper and parts of the endsem cover the material of this year's Lectures 9 to 13. The table says where each question is worked out in these notes, so you can try it first and then check.

**How to read the "Solved in" column.** "L10 B7" means problem B7 in Lecture 10's Part B. "L12 slide 28" means the explanation under that slide in Part A.

### Lecture 9: CDFs, mixed random variables, joint PMFs

| Question | Topic | Solved in |
|---|---|---|
| HW5 Q1 | mixed: point mass plus exponential | L9 B2 |
| HW5 Q7 | mixed CDF from clipping $X$ at $\frac12$ | L9 B3 |
| Tutorial 4 Q7 | taxi or bus: two point masses | L9 B4 |
| Tutorial 5 Q4 | producer and consumer: $\min(T, b)$ | L9 B5 |
| HW4 Q8(b) | dart score $\frac1X$: is it continuous? | L9 B6 |
| HW5 Q4 | joint PMF of two coin tosses; independence | L9 B9 |
| Tutorial 5 Q1 | $p_{XY} = 2^{-(x+y)}$: marginals, an event | L9 B8 |
| Quiz 1 Q3 | random variable, Borel $\sigma$-algebra, $P$ vs $P_X$ vs $F_X$ | partly L9 slides 3 to 5 and the toolkit; the full answer is in the L1 to L8 notes |

### Lecture 10: independence, joint PDFs, functions of two variables, covariance

| Question | Topic | Solved in |
|---|---|---|
| Tutorial 5 Q6 | joint PMF table: marginals, conditional, independence | L10 B1 |
| HW5 Q2 | constant of a joint PDF; probabilities of rectangles | L10 B2 |
| HW5 Q5 | marginal and joint CDFs | L10 B3 |
| HW5 Q8 | $E[X + Y] = E[X] + E[Y]$; $E[f(X) + h(Y)]$ | L10 slide 21 (part (b): same proof with LOTUS, slide 23) |
| HW5 Q11 | $g(X)$, $h(Y)$ independent | L10 slide 13 |
| HW5 Q3 | sums of dependent Bernoulli maxima | L10 B12 |
| HW5 Q12 | multinomial: joint PMF, $E[X_iX_j]$ | L10 B13 |
| Tutorial 5 Q2 | $\operatorname{Cov}(1 + X + XY^2, 1 + X)$ | L10 B15 |
| Tutorial 5 Q3 | factorising joint PDF; $E[Y\mid X>2]$ | L10 slide 20 |
| Tutorial 5 Q5 | ratio $X/Y$ of uniforms | L10 B9 |
| Tutorial 5 Q7 | $P(XY<1)$ | L10 B10(b) |
| Tutorial 5 Q8 | $P(X>Y\mid X<\frac12)$ | L10 slide 19 |
| HW4 Q1 | max of a uniform and an exponential | L10 B6 |
| HW4 Q4 | product of two uniforms | L10 B10(a) |
| HW4 Q9, Tutorial 4 Q5 | max and min of i.i.d. exponentials | L10 B7 |
| HW4 Q10(a) | longer piece of a broken stick | not worked; see the self-check below |
| Midsem Q3 | min of three exponentials | L10 slide 24 (HW) |
| Midsem Q2 | $P(X<Y)$ for i.i.d. uniforms | L10 slide 23 and L12 B2 |

*Self-check for HW4 Q10(a).* $L = \max(U, 1 - U)$ with $U\sim\mathcal U[0,1]$. For $\frac12\le\ell\le1$, $P(L\le\ell) = P(1 - \ell\le U\le\ell) = 2\ell - 1$, so $L\sim\mathcal U[\frac12, 1]$, $f_L = 2$ there, and $E[L] = \frac34$.

### Lecture 11: conditioning on an event

| Question | Topic | Solved in |
|---|---|---|
| HW5 Q10 | conditional PMFs of a dice sum; total probability | L11 B1 |
| Tutorial 4 Q2 | $\lceil X\rceil$ for an exponential | L11 B5 |
| HW4 Q12 | $E[\max(Z - c, 0)]$ for a standard normal | L11 B6 |
| Tutorial 5 Q8 | conditioning a joint PDF on an event | L10 slide 19 |

### Lecture 12: conditioning on a random variable, iterated expectations

| Question | Topic | Solved in |
|---|---|---|
| HW5 Q6 | constant, marginals and both conditional PDFs | L12 slides 20 to 25 (worked example) |
| HW5 Q9 | conditional PDF and a conditional probability | L12 B3 |
| Midsem Q1 | die game: random sum, iterated expectations | L12 B1 |
| Midsem Q2 | $P(X<Y)$ by conditioning | L12 B2 |
| Endsem Q4 | mixture distribution | L12 slide 28 |
| Tutorial 4 Q8 | expected number of uniforms to pass 2 | not worked; see the self-check below |

*Self-check for Tutorial 4 Q8.* Let $m(x)$ be the expected number of further uniforms needed when the current score is $x$ and the target is 2. Conditioning on the next uniform gives $m(x) = 1 + \int_x^{\min(x+1, 2)}m(s)\,ds$. On $[1,2]$ this is the "pass 1" problem shifted, $m(x) = e^{2-x}$; solving on $[0,1]$ then gives $m(0) = e^2 - e\approx4.67$.

### Lecture 13: convolution, Bayes' rule, variance of sums

| Question | Topic | Solved in |
|---|---|---|
| HW6 Q13 | convolution of two PMFs | L13 B1 |
| HW6 Q14 | Poisson + Poisson by convolution | L13 B2 |
| Endsem Q3 | sum of two exponentials by convolution | L13 B3 |
| Tutorial 6 Q1 | $\lvert X - Y\rvert$ on a triangle | L13 B5 |
| HW6 Q6 | Geiger counter: discrete Bayes | L13 B7 |
| HW6 Q9 | $\operatorname{Var}(3X - 2Y + 5)$ | L13 B10 |
| Midsem Q4 | $\operatorname{Var}(X + Y)$ | L13 slide 13 |

**Bertsekas end-of-chapter problems solved here.** 2.24 (L9 B7), 2.26 (L10 B11), 2.27 (L10 B13), 2.32 (L12 B6), 2.37 (L12 slide 15), 2.41(c) (L12 B8), 3.15 (L10 B5), 3.18 (L11 B2), 3.20 (L11 B3), 3.21 (L12 B4), 3.23 (L10 B4, L12 B5), 3.34 (L13 B8), 3.35(b) (L13 B6), 4.6 (L13 B5), 4.7 (L10 slide 23), 4.8 (L13 B3), 4.9 (L13 B4), 4.10 (L13 B1), 4.11 (L13 B2), 4.17 (L10 B14), 4.18 (L13 B11), 4.26 (L12 B10), 4.41 (L12 B7). Good unsolved ones to try next: 2.25, 2.31, 3.22, 3.24, 4.5, 4.12, 4.19, 4.23, 4.24.

## 2. Formula sheet

### One variable (L9)

$$F_X(x) = F_X(x+),\qquad F_X(x) - F_X(x-) = P(X = x),\qquad P(X<x) = F_X(x-).$$
Mixed: $E[g(Y)] = \int g(y)c(y)\,dy + \sum_kg(y_k)P(Y = y_k)$, with the continuous density $c$ and the point masses together summing to 1.

### Joint distributions (L9, L10)

| | Discrete | Continuous |
|---|---|---|
| Event | $P((X,Y)\in A) = \sum_{(x,y)\in A}p_{XY}$ | $\iint_Af_{XY}\,dx\,dy$ |
| Marginal | $p_X(x) = \sum_yp_{XY}(x,y)$ | $f_X(x) = \int f_{XY}(x,y)\,dy$ |
| Joint CDF | $F_{XY}(x,y) = P(X\le x, Y\le y)$ | $f_{XY} = \frac{\partial^2F_{XY}}{\partial x\partial y}$ |
| Independence | $p_{XY} = p_Xp_Y$ for all $x,y$ | $f_{XY} = f_Xf_Y$ (product form *and* product-set support) |
| LOTUS | $E[g(X,Y)] = \sum g\,p_{XY}$ | $\iint g\,f_{XY}$ |

$F_{XY}(x,\infty) = F_X(x)$; rectangle: $P(a<X\le b, c<Y\le d) = F(b,d) - F(a,d) - F(b,c) + F(a,c)$.

**Max and min of independent variables:**
$$\begin{gathered}F_{\max}(z) = F_X(z)F_Y(z) \\[3pt] 1 - F_{\min}(z) = (1 - F_X(z))(1 - F_Y(z)) \\[3pt] \min(\text{Exp}(\lambda_i))\sim\text{Exp}\Big(\sum\lambda_i\Big).\end{gathered}$$

**Expectation and covariance:**
$$\begin{gathered}E[aX + bY + c] = aE[X] + bE[Y] + c\ \text{(always)} \\[3pt] X\perp Y\Rightarrow E[g(X)h(Y)] = E[g(X)]E[h(Y)]\end{gathered}$$
$$\begin{gathered}\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y] \\[3pt] \rho = \frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1] \\[3pt] \text{independent}\Rightarrow\text{uncorrelated}\ (\not\Leftarrow).\end{gathered}$$

### Conditioning (L11, L12)

$$p_{X\mid A}(x) = \frac{P(\{X = x\}\cap A)}{P(A)},\qquad\text{for }A = \{X\in S\}:\ p_{X\mid A}(x) = \frac{p_X(x)}{P(X\in S)}\ (x\in S).$$
$$p_X(x) = \sum_iP(A_i)p_{X\mid A_i}(x),\qquad E[X] = \sum_iP(A_i)E[X\mid A_i].$$
$$p_{X\mid Y}(x\mid y) = \frac{p_{XY}(x,y)}{p_Y(y)},\qquad f_{X\mid Y}(x\mid y) = \frac{f_{XY}(x,y)}{f_Y(y)},\qquad p_X(x) = \sum_yp_{X\mid Y}(x\mid y)p_Y(y).$$
$$\begin{gathered}E[X\mid Y = y] = \sum_xx\,p_{X\mid Y}(x\mid y) \\[3pt] E\big[E[X\mid Y]\big] = E[X] \\[3pt] \operatorname{Var}(X) = E[\operatorname{Var}(X\mid Y)] + \operatorname{Var}(E[X\mid Y]).\end{gathered}$$
**Memorylessness:** $N\sim$ Geom$(p)$: $N - n\mid N>n\sim$ Geom$(p)$. $X\sim$ Exp$(\lambda)$: $X - t\mid X>t\sim$ Exp$(\lambda)$, so $E[X\mid X>t] = t + \frac1\lambda$.
**Random sums** ($N$ independent of i.i.d. $X_i$):
$$E\Big[\sum_{i=1}^NX_i\Big] = E[N]E[X],\qquad\operatorname{Var}\Big(\sum_{i=1}^NX_i\Big) = E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N).$$

### Sums, Bayes, variance of sums (L13)

$$\begin{gathered}p_{X+Y}(z) = \sum_xp_X(x)p_Y(z - x) \\[3pt] f_{X+Y}(z) = \int f_X(x)f_Y(z - x)\,dx\quad(\text{independent; otherwise use }f_{XY}(x, z - x)).\end{gathered}$$
$$f_{X\mid Y}(x\mid y) = \frac{f_{Y\mid X}(y\mid x)f_X(x)}{\int f_{Y\mid X}(y\mid t)f_X(t)\,dt}\qquad(\text{posterior}\propto\text{likelihood}\times\text{prior}).$$
$$\operatorname{Var}\Big(\sum_ia_iX_i\Big) = \sum_ia_i^2\operatorname{Var}(X_i) + 2\sum_{i<j}a_ia_j\operatorname{Cov}(X_i,X_j),\qquad\operatorname{Var}(\bar X_n) = \frac{\operatorname{Var}(X)}{n}.$$
Useful sums: U[0,1] + U[0,1] is triangular on $[0,2]$; Exp$(\lambda)$ + Exp$(\lambda)$ is Gamma$(2,\lambda)$; Poisson + Poisson is Poisson; Binomial$(n,p)$ + Binomial$(m,p)$ is Binomial$(n+m,p)$.

## 3. Exam-style self-test

Try these without notes (about 40 minutes), then check the answers below.

**T1.** The joint PMF of $X\in\{0,1\}$ and $Y\in\{0,1,2\}$ is $p(0,0) = 0.1$, $p(0,1) = 0.2$, $p(0,2) = 0.1$, $p(1,0) = 0.2$, $p(1,1) = 0.1$, $p(1,2) = 0.3$. Find the marginals, $E[X\mid Y = 2]$ and $\operatorname{Cov}(X,Y)$. Are they independent?

**T2.** $X\sim$ Exp(1) and $Y = \min(X, 2)$. Is $Y$ discrete, continuous or mixed? Find $P(Y = 2)$ and $E[Y]$.

**T3.** $f_{XY}(x,y) = c(x + y)$ for $0\le x\le y\le1$. Find $c$, $f_X$ and $P(X + Y\le1)$.

**T4.** $X$, $Y$ i.i.d. Exp$(\lambda)$. Find $P(X>2Y)$.

**T5.** The number of customers in a day is Poisson(4), and each spends an amount uniform on $[0, 100]$, independently. Find the mean and standard deviation of the day's takings.

**T6.** A coin's bias $X$ is uniform on $[0,1]$. You toss it once and get heads. Find the posterior density of $X$ and the probability that the next toss is heads.

**T7.** $X\sim\mathcal U[0,1]$ and $Y\sim$ Exp(1) are independent. Find the PDF of $X + Y$.

**T8.** $X_1, X_2, X_3$ each have variance 1, and $\operatorname{Cov}(X_i, X_j) = 0.5$ for $i\ne j$. Find $\operatorname{Var}(X_1 + X_2 + X_3)$ and $\operatorname{Var}(X_1 - X_2)$.

**T9.** $N\sim$ Geometric$(\frac14)$. Find $E[N\mid N>3]$ and $P(N = 6\mid N>3)$.

**T10. True or false?**
(a) If $\operatorname{Cov}(X,Y) = 0$, then $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$.
(b) $E[X\mid Y]$ is a number.
(c) If $X$ and $Y$ are independent, $E[X\mid Y] = E[X]$.
(d) For any random variable, $F_X(x) - F_X(x-) = P(X = x)$.
(e) $f_{XY}(x,y) = 6xy^2$ on $[0,1]^2$ makes $X$ and $Y$ independent.
(f) $f_{XY}(x,y) = 8xy$ on $0\le x\le y\le1$ makes $X$ and $Y$ independent.
(g) For independent $X$ and $Y$, $\operatorname{Var}(X - Y) = \operatorname{Var}(X) - \operatorname{Var}(Y)$.

### Answers

**T1.** $p_X = (0.4, 0.6)$, $p_Y = (0.3, 0.3, 0.4)$. $E[X\mid Y = 2] = \frac{0.3}{0.4} = 0.75$. $E[X] = 0.6$, $E[Y] = 0.3 + 0.8 = 1.1$, $E[XY] = 1\cdot0.1 + 2\cdot0.3 = 0.7$, so $\operatorname{Cov} = 0.7 - 0.66 = 0.04$. Dependent: $p(0,0) = 0.1\ne0.4\cdot0.3$.

**T2.** Mixed: a point mass $P(Y = 2) = P(X\ge2) = e^{-2}\approx0.135$ plus density $e^{-y}$ on $(0,2)$. $E[Y] = \int_0^2P(X>t)\,dt = 1 - e^{-2}\approx0.865$.

**T3.** $\int_0^1\!\int_0^y(x + y)\,dx\,dy = \int_0^1\frac32y^2\,dy = \frac12$, so $c = 2$. $f_X(x) = \int_x^12(x + y)\,dy = 1 + 2x - 3x^2$ on $[0,1]$. For $P(X + Y\le1)$, $x$ runs over $[0,\frac12]$ and $y$ over $[x, 1 - x]$; the inner integral is $1 - 4x^2$, and $\int_0^{1/2}(1 - 4x^2)\,dx = \frac13$.

**T4.** Condition on $Y$: $\int_0^\infty e^{-2\lambda y}\lambda e^{-\lambda y}\,dy = \frac13$.

**T5.** Random sum: mean $4\cdot50 = 200$; variance $E[N]\operatorname{Var}(X) + (E[X])^2\operatorname{Var}(N) = 4\cdot\frac{10^4}{12} + 2500\cdot4 = \frac{40000}{3}$, so the SD is about $115.5$.

**T6.** Posterior $\propto x\cdot1$, so $f_{X\mid H}(x) = 2x$ on $[0,1]$. $P(H_2\mid H_1) = E[X\mid H_1] = \int_0^12x^2\,dx = \frac23$ (Laplace's rule of succession with one observation).

**T7.** For $0\le z\le1$: $\int_0^ze^{-(z-x)}dx = 1 - e^{-z}$. For $z>1$: $\int_0^1e^{-(z-x)}dx = (e - 1)e^{-z}$. Zero for $z<0$.

**T8.** $3 + 2\cdot3\cdot0.5 = 6$, and $1 + 1 - 2\cdot0.5 = 1$.

**T9.** Memorylessness: $N - 3\mid N>3\sim$ Geom$(\frac14)$, so $E[N\mid N>3] = 3 + 4 = 7$ and $P(N = 6\mid N>3) = P(N = 3) = (\frac34)^2\frac14 = \frac{9}{64}$.

**T10.** (a) True. (b) False: it is a random variable, a function of $Y$. (c) True. (d) True (L9 slide 3). (e) True: $6xy^2 = 2x\cdot3y^2$ on a square. (f) False: the support is a triangle. (g) False: variances add, $\operatorname{Var}(X - Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$.


