---
title: "Probability & Statistics (MA6.101), Lectures 1 to 8"
subtitle: "Slide-by-slide study notes with worked examples, plus extra problems from probabilitycourse.com and Bertsekas"
date: "Monsoon 2026"
---

# How to use this document

**What it covers.** This year's Lectures 1 to 8 (Prof. Tejas Bodas): sample spaces and events, set theory, the axioms of probability, σ-algebras and Borel sets, continuity of $P$, conditional probability, Bayes' rule, independence, counting, random variables as measurable functions, discrete random variables (PMF, CDF, expectation, variance, the standard families), and continuous random variables (pdf, uniform, exponential, Gaussian, functions of a random variable).

**How each lecture is laid out.**

1. **Part A, the slides.** Every slide in order, with the slide number (for example *Slide 41/73*), what it says, and an explanation. Every question asked on a slide is answered, every example is worked out, and every red **HW** is solved.
2. **Part B, extra worked examples and problems.** These come from [probabilitycourse.com](https://www.probabilitycourse.com) (Pishro-Nik) and from Bertsekas & Tsitsiklis, *Introduction to Probability*, 2nd ed. (the PDF in `probability-and-statistics/textbooks/`). Every problem has a full solution. Many are last year's homework, tutorial or exam questions, and those are marked.

**Tip.** Cover each solution and try the first two lines yourself. In this part of the course most marks are lost on *setting up* the problem (what is $\Omega$, which events, which formula), not on the algebra.

## Reading plan (about 4 hours)

| Block | Lecture(s) | Topic | Time |
|---|---|---|---|
| 1 | L1 | Experiments, sample spaces, events, set theory, axioms | 25 min |
| 2 | L2 | σ-algebras, Borel sets, consequences of the axioms, zero-probability events | 30 min |
| 3 | L3, part 1 | Continuity of $P$, conditional probability, total probability, Bayes | 30 min |
| 4 | L3, part 2 | Independence, conditional independence | 25 min |
| 5 | L3, part 3 | Counting and the four kinds of sampling | 30 min |
| 6 | L4 and L5 | Random variables, induced measure, PMF, CDF, expectation | 30 min |
| 7 | L6 | Functions of a discrete random variable, variance, Bernoulli, binomial, geometric, Poisson | 30 min |
| 8 | L7 | CDF in general, pdf, uniform, exponential, memorylessness | 25 min |
| 9 | L8 | Gaussian, functions of a continuous random variable | 30 min |
| 10 | All | Practice map, formula sheet, self-test | 20 min |

## Which file holds which slides

The lectures use three slide decks. Each lecture PDF holds a slice of one deck, and consecutive files overlap by a slide.

| File | Deck | Slides in the file | Topics |
|---|---|---|---|
| `Lecture 1.pdf` | Deck 1 (73 slides) | 1 to 22 | Logistics; experiments, $\Omega$, events; set theory 101; set functions; axioms; the counter-example |
| `Lecture 2.pdf` | Deck 1 | 21 to 36 | σ-algebras; formal definition of $P$; Borel σ-algebra; consequences of the axioms; zero-probability events |
| `L3-1.pdf` | Deck 1 | 36 to 72 | Continuity of $P$; conditional probability; total probability; Bayes; independence; counting |
| `L4-1.pdf` | Deck 2 (31 slides) | 1 to 8 | Random variables as measurable maps; induced measure $P_X$ |
| `L5-1.pdf` | Deck 2 | 8 to 17 | Discrete random variables; PMF; CDF; expectation; moments; linearity |
| `L6-1.pdf` | Deck 2 | 18 to 27 | Functions of a random variable; LOTUS; variance; indicator, Bernoulli, binomial, geometric, Poisson |
| `L7.pdf` | Deck 3 (26 slides) | 1 to 11 | CDF; continuous random variables and the pdf; uniform; exponential |
| `L8.pdf` | Deck 3 | 12 to 23 | Gaussian; standard normal; functions of a continuous random variable |

`L7.pdf` and `L8.pdf` are annotated in class (handwriting on top of the slides). The notes below include what was written. Deck 1 slide 73, Deck 2 slides 28 to 31 and Deck 3 slides 24 to 26 are not in any file. Last year's lectures L1 to L9 cover the same ground, and last year's HW 1 to 4, Tutorials 1 to 4, Quiz 1 and part of the Midsem match these lectures. The practice map at the end lists them.

## Notation

| Symbol | Meaning |
|---|---|
| $\Omega$ | sample space (set of all outcomes); $\omega\in\Omega$ is one outcome |
| $\mathcal F$ | σ-algebra (event space): the collection of events we may assign probabilities to |
| $(\Omega,\mathcal F,P)$ | probability space |
| $A^c$, $A\cup B$, $A\cap B$ (or $AB$), $A\setminus B$, $A\,\Delta\, B$ | complement, union, intersection, difference, symmetric difference |
| $\mathcal P(A)$ or $2^A$ | power set of $A$ (all subsets) |
| $\mathcal B(\mathbb R)$ | Borel σ-algebra on $\mathbb R$ |
| $P(B\mid A)$, written $P(B/A)$ on the slides | conditional probability of $B$ given $A$ |
| $X^{-1}(B) = \{\omega : X(\omega)\in B\}$ | pre-image of a set $B$ under $X$ |
| $P_X(B) = P(X^{-1}(B))$ | induced measure (the "distribution" of $X$) |
| $p_X(x)$, $F_X(x)$, $f_X(x)$ | PMF, CDF, pdf |
| $\binom nk = {}^nC_k$, ${}^nP_k$ | combinations, permutations |
| $\Phi$, $\varphi$ | standard normal CDF and pdf |
| $\mathbf 1_A$ | indicator of the event $A$ |

## Five habits that save marks

1. **Write down $\Omega$ and the events in symbols** before computing anything. Most wrong answers in L3 come from an unclear sample space.
2. **"At least one" means complement.** $P(\text{at least one}) = 1 - P(\text{none})$.
3. **Check every PMF sums to 1 and every pdf integrates to 1.** It catches most algebra slips.
4. **For a function of a continuous random variable, go through the CDF.** $F_Y(y) = P(g(X)\le y)$, rewrite as an event about $X$, then differentiate. It works even when $g$ is not monotone.
5. **State the support.** "$f_Y(y) = \dots$ for $y \in [e^{2a}, e^{2b}]$, and $0$ otherwise." Last year's Quiz 1 solutions write the support out every time.



# Lecture 1: Sample spaces, events, set theory and the axioms (Deck 1, slides 1 to 22)

**Big picture.** Probability theory needs three ingredients: a **random experiment**, its **sample space** $\Omega$ (all possible outcomes), and **events** (subsets of $\Omega$). A probability measure $P$ is a **set function**: it takes an event (a set) and returns a number in $[0,1]$. Because $P$ acts on sets, we first need fluency with set operations. The lecture ends with a surprise: you *cannot* in general assign a probability to every subset of $\Omega$. That problem is solved in Lecture 2 with σ-algebras.

## Part A: the slides

### Slides 1/73 to 8/73: Logistics, evaluation, outline

> **On the slides.** Logistics; books (Bertsekas & Tsitsiklis, two by Ross; probabilitycourse.com, statlect.com, randomservices.org); evaluation (Quiz 1 15%, Midsem 30%, Quiz 2 10%, Endsem 35%, Surprise Quiz 10%); outline (probability basics, random variables, convergence and simulation, statistics, random vectors and processes); prerequisites.

Nothing examinable. Bertsekas Chapters 1 to 3 and probabilitycourse.com Chapters 1 to 4 cover the same material as these notes.

### Slide 9/73: Random experiments and sample space

> **On the slide.** A random experiment involves randomness: a coin toss, a die roll, picking a number at random from $[0,1]$. The sample space $\Omega$ is the set of all possible outcomes, finite or infinite: $\Omega_c = \{H,T\}$, $\Omega_d = \{1,\dots,6\}$, $\Omega_u = [0,1]$, $\Omega_{2c} = \{H,T\}\times\{H,T\} = \{(H,H),(H,T),(T,H),(T,T)\}$.

**What makes a good sample space.** Bertsekas (Section 1.1) asks for two things:

- **Mutually exclusive:** exactly one outcome happens on each run of the experiment.
- **Collectively exhaustive:** whatever happens, it is in $\Omega$.

It must also have the **right granularity**: detailed enough to describe every event you care about. For "did the two tosses match?", $\Omega = \{\text{match}, \text{no match}\}$ would do. But for "was the first toss heads?" you need $\Omega_{2c}$.

**Three kinds of sample space** appear on this slide, and you should recognise them:

| Example | Size of $\Omega$ | Type |
|---|---|---|
| coin, die, two coins | finite | discrete |
| "toss until the first head": $\{H, TH, TTH, \dots\}$ | countably infinite | discrete |
| a number from $[0,1]$ | uncountable | continuous |

The type decides which tools work later. For finite or countable $\Omega$ we can give every single outcome a probability and add. For $[0,1]$ every single point has probability 0 (slide 33), so we must work with intervals.

**$\Omega_{2c}$ is a Cartesian product** (slide 15). Repeating an experiment $n$ times gives $\Omega^n$, with $|\Omega|^n$ outcomes. Two dice: $6^2 = 36$ outcomes.

### Slide 10/73: Outcomes and events

> **On the slide.** $\omega\in\Omega$ is a sample point (possible outcome). A subset $A\subseteq\Omega$ is an event. Examples: $C_1 = \{T\}$; $D_1 = \{6\}$, $D_2 = \{1,3,5\}$; $U_1 = \{0.5\}$, $U_2 = [0.25, 0.75]$. It may not be possible to assign a probability to every subset (more later). *Any guesses for $P(C_1)$, $P(D_1)$, $P(D_2)$, $P(U_1)$, $P(U_2)$?*

**Outcome vs event.** An outcome is an element; an event is a set of outcomes. "The die shows 6" is the event $\{6\}$, a set with one element. We say event $A$ **occurs** if the outcome $\omega$ that actually happens lies in $A$.

**Answers to the guesses** (fair coin, fair die, uniform pick):
$$P(C_1) = \tfrac12,\qquad P(D_1) = \tfrac16,\qquad P(D_2) = \tfrac36 = \tfrac12,\qquad P(U_1) = 0,\qquad P(U_2) = 0.75 - 0.25 = 0.5 .$$

The last two use the uniform rule "probability = length": $[0.25, 0.75]$ has length $0.5$, while the single point $\{0.5\}$ has length 0. So $P(U_1) = 0$ even though $0.5$ is a perfectly possible outcome. Slide 33 returns to this.

### Slide 11/73: Probability theory

> **On the slide.** {Random experiment, sample space, events} are the key ingredients. We measure the probability of subsets of $\Omega$. A probability measure $P$ is a set function: it acts on sets and measures their probability.

The key word is **set function**. Ordinary functions eat numbers ($f(x) = x^2$). $P$ eats sets: $P(\{1,3,5\}) = 1/2$. Slide 17 defines set functions properly.

### Slide 12/73: Set theory 101, operations

> **On the slide.** Venn diagrams. Complement $A^c$; empty set $\emptyset\subseteq A$; union $A\cup B$; intersection $A\cap B$; difference $A\setminus B$; symmetric difference; disjoint events; identity, complement, associative, commutative, distributive and De Morgan's laws.

The blanks on the slide, filled in:

| Operation | Definition | In words |
|---|---|---|
| $A^c$ | $\{\omega\in\Omega : \omega\notin A\}$ | "not $A$" |
| $A\cup B$ | $\{\omega : \omega\in A \text{ or } \omega\in B\}$ | "$A$ or $B$ (or both)" |
| $A\cap B$ | $\{\omega : \omega\in A\text{ and }\omega\in B\}$ | "both $A$ and $B$" |
| $A\setminus B$ | $A\cap B^c$ | "$A$ but not $B$" |
| $A\,\Delta\, B$ | $(A\setminus B)\cup(B\setminus A) = (A\cup B)\setminus(A\cap B)$ | "exactly one of $A, B$" |
| disjoint | $A\cap B = \emptyset$ | "cannot both happen" |

**The laws.**

- Identity: $A\cup\emptyset = A$, $A\cap\Omega = A$.
- Complement: $A\cup A^c = \Omega$, $A\cap A^c = \emptyset$, $(A^c)^c = A$.
- Commutative and associative: $A\cup B = B\cup A$, $(A\cup B)\cup C = A\cup(B\cup C)$, and the same for $\cap$.
- Distributive: $A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$ and $A\cup(B\cap C) = (A\cup B)\cap(A\cup C)$.
- **De Morgan:**
$$\boxed{\Big(\bigcup_i A_i\Big)^c = \bigcap_i A_i^c,\qquad \Big(\bigcap_i A_i\Big)^c = \bigcup_i A_i^c}$$
This holds for any (even uncountable) collection. In words: "not (at least one)" = "none", and "not (all)" = "at least one fails".

**How to prove a set identity.** Show each side is a subset of the other, element by element. For De Morgan: $\omega\in(\cup_iA_i)^c \iff \omega\notin A_i$ for every $i \iff \omega\in A_i^c$ for every $i \iff \omega\in\cap_iA_i^c$. $\square$

### Slide 13/73: Cardinality and countability

> **On the slide.** $|A|$ is the cardinality. Inclusion–exclusion: $|A\cup B| = |A| + |B| - |A\cap B|$. *Inclusion–exclusion for $n$ sets?* $A$ is countable if it is finite or in 1-1 correspondence with $\mathbb N$. Uncountable means not countable.

**Why subtract $|A\cap B|$.** Elements in both sets are counted twice by $|A| + |B|$.

**Three sets.** Add singles, subtract pairs, add back the triple:
$$|A\cup B\cup C| = |A| + |B| + |C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|.$$

**$n$ sets (the question on the slide).**
$$\Big|\bigcup_{i=1}^n A_i\Big| = \sum_i|A_i| - \sum_{i<j}|A_i\cap A_j| + \sum_{i<j<k}|A_i\cap A_j\cap A_k| - \dots + (-1)^{n+1}|A_1\cap\dots\cap A_n| .$$
*Why it is right.* Take an element that lies in exactly $m\ge1$ of the sets. It is counted $\binom m1$ times in the first sum, $\binom m2$ in the second, and so on. Its net count is
$$\binom m1 - \binom m2 + \binom m3 - \dots = 1 - (1-1)^m = 1 .$$
So every element of the union is counted exactly once. The same formula with $P$ instead of $|\cdot|$ is the HW on slide 32.

### Slide 14/73: Monotone sequences of sets

> **On the slide.** Increasing: $A_1\subseteq A_2\subseteq\dots$. Decreasing: $A_1\supseteq A_2\supseteq\dots$. Examples from $\mathcal U[0,1]$: $I_n = [0, 1 - \frac1n]$, $D_n = [0, \frac1n]$.

**$I_n$ is increasing.** $I_1 = \{0\}$, $I_2 = [0, \tfrac12]$, $I_3 = [0, \tfrac23]$, ... Each contains the previous one. Its union is
$$\bigcup_{n\ge1}I_n = [0, 1).$$
Every $x<1$ is in some $I_n$ (pick $n > \frac1{1-x}$), but $1$ is in none of them. So the limit is the half-open interval $[0,1)$, not $[0,1]$.

**$D_n$ is decreasing.** $D_1 = [0,1] \supseteq D_2 = [0,\tfrac12] \supseteq \dots$ Its intersection is
$$\bigcap_{n\ge1}D_n = \{0\}.$$
$0$ is in every $D_n$, while any $x>0$ drops out once $\frac1n < x$.

These examples come back in Lecture 3 (continuity of $P$): $P(I_n) = 1 - \frac1n \to 1 = P([0,1))$ and $P(D_n) = \frac1n\to 0 = P(\{0\})$.

### Slide 15/73: Cartesian product

> **On the slide.** $A\times B = \{(a,b) : a\in A, b\in B\}$. *If $A = \{1,3,5\}$ and $B = \{2,4,6\}$, what is $A\times B$?* $[0,1]\times[0,1]$ is the unit square.

$$A\times B = \{(1,2),(1,4),(1,6),(3,2),(3,4),(3,6),(5,2),(5,4),(5,6)\},\qquad |A\times B| = |A|\cdot|B| = 9.$$
Order matters: $(1,2)\in A\times B$ but $(2,1)\notin A\times B$. In general $|A_1\times\dots\times A_k| = |A_1|\cdots|A_k|$. This is the **multiplication principle** of counting (slide 57).

**Why it matters.** Picking two independent uniform numbers from $[0,1]$ is one uniform point in the unit square, and probabilities become areas. Last year's Tutorial 1 Q3 (two friends meet) is solved this way in Lecture 3 (counting, Part B9).

### Slide 16/73: Power sets

> **On the slide.** $\mathcal P(A)$ is the set of all subsets of $A$ (and $\mathcal P$ is different from $P$!). *What are $\mathcal P(\Omega_c)$, $\mathcal P(\Omega_d)$, $\mathcal P(\Omega_u)$ and their cardinalities?* For discrete $\Omega$ the power set is often written $2^\Omega$.

- $\mathcal P(\Omega_c) = \{\emptyset, \{H\}, \{T\}, \{H,T\}\}$, which has $4 = 2^2$ elements.
- $\mathcal P(\Omega_d)$ has $2^6 = 64$ elements. Each subset is decided by six yes/no choices ("is face $i$ in it?").
- $\mathcal P(\Omega_u) = \mathcal P([0,1])$ is uncountable, and even "bigger" than $[0,1]$ itself (Cantor's theorem: $|\mathcal P(A)| > |A|$ for every set).

### Slide 17/73: Functions and set functions

> **On the slide.** A function maps elements of a domain $D$ to a range $R$: $f : D\to R$. Read about injections, surjections, bijections. Set functions act on sets, so their domain is a collection of sets. Example: length $l : D\to\mathbb R_+$, $D = \{[a,b] : a\le b\}$, $l([c,d]) = d - c$.

**Length is the model for $P$ on $[0,1]$.** Length is a set function, and it already behaves like a probability:

- it is non-negative;
- it adds over disjoint pieces: $l([0, 0.3]) + l((0.3, 1]) = 1 = l([0,1])$;
- a point has length 0.

The uniform distribution on $[0,1]$ is "probability = length". The rest of the lecture asks which sets we can measure this way.

### Slide 18/73: Back to $P$

> **On the slide.** Why the detour? $P$ acts on sets. Given $P(A)$ and $P(B)$, can we deduce $P(A\cup B)$ or $P(A\setminus B)$? How does $P$ act on $A\cup B$, $A\setminus B$, $A\times B$?

The honest answer: **not from $P(A)$ and $P(B)$ alone**. You also need $P(A\cap B)$:
$$P(A\cup B) = P(A) + P(B) - P(A\cap B),\qquad P(A\setminus B) = P(A) - P(A\cap B).$$
For $A\times B$ you need to know how the two experiments are linked. If they are independent (L3), $P(A\times B) = P(A)\,P(B)$. These rules are all *consequences* of the three axioms on the next slide (proved under slide 32).

### Slide 19/73: The axioms

> **On the slide.** Axiom 1: $P(\emptyset) = 0$, $P(\Omega) = 1$. Axiom 2: $0\le P(A)\le 1$ for $A\subseteq\Omega$. Axiom 3 (countable additivity): for disjoint $A_1, A_2, \dots$, $P\big(\bigcup_{i=1}^\infty A_i\big) = \sum_{i=1}^\infty P(A_i)$. *What is the domain of $P$? $\Omega$? $\mathcal P(\Omega)$ seems like a great choice!*

**Domain question.** Not $\Omega$: $P$ eats *events* (sets of outcomes), not outcomes. So the natural guess is the collection of all subsets, $\mathcal P(\Omega)$. Slides 20 to 22 show why that guess fails when $\Omega$ is uncountable.

**Reading Axiom 3.** "Disjoint" means pairwise disjoint: $A_i\cap A_j = \emptyset$ for $i\ne j$. Finite additivity is a special case: take $A_{n+1} = A_{n+2} = \dots = \emptyset$. Since $P(\emptyset) = 0$, the tail adds nothing, so
$$P(A_1\cup\dots\cup A_n) = P(A_1) + \dots + P(A_n)\quad\text{for disjoint }A_i .$$

**The discrete case in one line.** If $\Omega = \{\omega_1,\omega_2,\dots\}$ is countable, every event is a countable disjoint union of single outcomes, so Axiom 3 gives
$$P(A) = \sum_{\omega_i\in A}P(\{\omega_i\}).$$
So a model is fully described by the numbers $p_i = P(\{\omega_i\})\ge0$ with $\sum_i p_i = 1$. With $n$ equally likely outcomes this is the **discrete uniform law** $P(A) = |A|/n$, the basis of all counting problems in L3.

### Slide 20/73: Towards a formal definition

> **On the slide.** Define $P : \mathcal P(\Omega)\to[0,1]$ satisfying the three axioms. *Is there a perceivable problem?* The counter-example constructs a set function for which you cannot assign valid probabilities to every subset without violating the axioms.

### Slides 21/73 and 22/73: The counter-example, and the way out

> **On the slides.** Pick a number uniformly from the real line, so $\Omega = \mathbb R$ and $P(\mathbb R) = 1$. Sets of equal length should have equal probability. $\mathbb R = \bigcup_{n=-\infty}^{\infty}[n, n+1)$. If $P([n,n+1)) = x$ for all $n$, then $P(\mathbb R) = \infty$ (for $x > 0$). If $P([n,n+1)) = 0$, then $P(\mathbb R) = 0$. **Takeaway:** not all set functions can be calibrated to measure every subset (a kitchen scale cannot weigh a sheet of paper). **Way out:** restrict the domain to *measurable* sets. A possible domain here: $\mathcal F = \{\emptyset, \Omega, \mathbb R_-, \mathbb R_+\}$.

**The argument, step by step.**

1. The intervals $[n, n+1)$, $n\in\mathbb Z$, are disjoint, there are countably many of them, and they cover $\mathbb R$.
2. They all have length 1, so "equal length means equal probability" forces $P([n,n+1)) = x$ for the same $x$.
3. Axiom 3: $1 = P(\mathbb R) = \sum_{n\in\mathbb Z}x$. This sum is $0$ if $x = 0$ and $\infty$ if $x>0$. It is never 1. Contradiction.

**The proposed domain** $\mathcal F = \{\emptyset, \mathbb R, \mathbb R_-, \mathbb R_+\}$ (take $\mathbb R_- = (-\infty, 0)$ and $\mathbb R_+ = [0,\infty)$ so they are complements). On this small domain we *can* define a valid $P$, for example $P(\mathbb R_-) = P(\mathbb R_+) = \frac12$. The price: we can only ask "is the number negative?". Lecture 2 makes "a good domain" precise.

## Part B: extra worked examples and problems

**B1 (Bertsekas Problem 1.5).** In a class, 60% are geniuses, 70% love chocolate, and 40% are both. Find the probability that a random student is neither.

*Solution.* Let $G$ = genius and $C$ = chocolate lover. "Neither" is $G^c\cap C^c = (G\cup C)^c$ by De Morgan. Then
$$P(G\cup C) = 0.6 + 0.7 - 0.4 = 0.9,\qquad P(\text{neither}) = 1 - 0.9 = \boxed{0.1}.$$

**B2 (Bertsekas Problem 1.6).** A die is loaded so that each even face is twice as likely as each odd face; all even faces are equally likely, as are all odd faces. Build the model and find $P(\text{outcome} < 4)$.

*Solution.* Let each odd face have probability $p$, so each even face has $2p$. Normalisation: $3p + 3(2p) = 1$, so $p = \frac19$. Then
$$P(\{1,2,3\}) = p + 2p + p = \tfrac49 .$$

**B3 (last year's HW 1, Sets Q1).** Prove or disprove: if $A\cup B = A\cup C$ and $A\cap B = A\cap C$, then $B = C$.

*Solution.* **True.** Take $x\in B$.

- If $x\in A$, then $x\in A\cap B = A\cap C$, so $x\in C$.
- If $x\notin A$, then $x\in A\cup B = A\cup C$, and since $x\notin A$, $x\in C$.

So $B\subseteq C$. By symmetry $C\subseteq B$, hence $B = C$. $\square$ (Neither condition alone is enough: $A = \{1\}$, $B = \{1\}$, $C = \emptyset$ satisfies the union condition but not $B = C$.)


# Lecture 2: σ-algebras, Borel sets and consequences of the axioms (Deck 1, slides 21 to 36)

**Big picture.** Lecture 1 showed that $P$ cannot always measure every subset of $\Omega$. The fix is to choose a collection $\mathcal F$ of subsets, the **events**, that is closed under the operations we need (complements, countable unions). Such a collection is a **σ-algebra**, and $(\Omega,\mathcal F, P)$ is a **probability space**. For finite $\Omega$ we just take all subsets. For $[0,1]$ and $\mathbb R$ we take the **Borel σ-algebra**, generated by intervals. The second half derives the everyday rules ($P(A^c) = 1 - P(A)$, inclusion–exclusion, the union bound) from the axioms, and separates "probability zero" from "impossible".

## Part A: the slides

Slides 21 and 22 (the counter-example) are covered at the end of Lecture 1.

### Slide 23/73: Towards a σ-algebra

> **On the slide.** $\mathcal F = \{\emptyset,\Omega,\mathbb R_-,\mathbb R_+\}$. The domain should have nice, obvious properties: $\emptyset,\Omega\in\mathcal F$; if $B\in\mathcal F$ then $B^c\in\mathcal F$; if $A_1, A_2\in\mathcal F$ then $A_1\cup A_2$ and $A_1\cap A_2\in\mathcal F$. A domain with such properties is a σ-algebra.

### Slide 24/73: σ-algebra as the domain of $P$

> **On the slide.** A σ-algebra (event space) $\mathcal F$ on $\Omega$ is a collection of subsets with (1) $\emptyset\in\mathcal F$ and $\Omega\in\mathcal F$; (2) $A\in\mathcal F\Rightarrow A^c\in\mathcal F$; (3) $A_1, A_2,\dots\in\mathcal F\Rightarrow\bigcup_{n=1}^\infty A_n\in\mathcal F$. It is closed under complements and countable unions. *Is it also closed under countable intersections?* *When $\Omega$ is finite, is $\mathcal P(\Omega)$ a σ-algebra?* Yes, and then we use $\mathcal P(\Omega)$ as the domain.

$$\boxed{\ \mathcal F\ \text{is a σ-algebra} \iff \Omega\in\mathcal F,\quad A\in\mathcal F\Rightarrow A^c\in\mathcal F,\quad A_1,A_2,\ldots\in\mathcal F\Rightarrow \textstyle\bigcup_n A_n\in\mathcal F\ }$$

**Closed under countable intersections (the question).** Yes, by De Morgan:
$$\bigcap_n A_n = \Big(\bigcup_n A_n^c\Big)^c .$$
Each $A_n^c\in\mathcal F$ (rule 2), their union is in $\mathcal F$ (rule 3), and its complement is in $\mathcal F$ (rule 2). $\square$ The same trick gives differences, $A\setminus B = A\cap B^c$, and symmetric differences, $A\,\Delta\, B = (A\setminus B)\cup(B\setminus A)$. These three facts are last year's Tutorial 2 Q4.

**Finite unions are included.** Take $A_3 = A_4 = \dots = \emptyset$ in rule 3.

**$\mathcal P(\Omega)$ is always a σ-algebra** (for any $\Omega$): every set you can form is a subset of $\Omega$. The problem in Lecture 1 was never that $\mathcal P(\mathbb R)$ fails to be a σ-algebra. It is that no sensible $P$ exists on it.

### Slides 25/73 and 26/73: Formal definition of a probability measure

> **On the slides.** A probability measure on the measurable space $(\Omega,\mathcal F)$ is a function $P:\mathcal F\to[0,1]$ with (1) $P(\emptyset) = 0$, $P(\Omega) = 1$; (2) countable additivity for disjoint $A_1, A_2,\dots\in\mathcal F$. The trio $(\Omega,\mathcal F,P)$ is a probability space. When $|\Omega|<\infty$ we take $\mathcal F = 2^\Omega$. *Identify the probability space in the coin and dice experiments.*

**Coin.** $\Omega = \{H,T\}$, $\mathcal F = \{\emptyset,\{H\},\{T\},\{H,T\}\}$, and $P(\emptyset) = 0$, $P(\{H\}) = P(\{T\}) = \frac12$, $P(\Omega) = 1$. (For a biased coin, $P(\{H\}) = p$ and $P(\{T\}) = 1-p$.)

**Die.** $\Omega = \{1,\dots,6\}$, $\mathcal F = 2^\Omega$ (64 events), and $P(A) = |A|/6$ for every $A\in\mathcal F$. You do not list 64 numbers. You give $P$ on the six single outcomes and additivity gives the rest.

**What changed from slide 19.** The domain is now $\mathcal F$, not "all subsets". Axiom 2 ($0\le P\le1$) is built into the codomain $[0,1]$.

### Slides 27/73 to 29/73: Building a σ-algebra for $\mathcal U[0,1]$

> **On the slides.** $\Omega = [0,1]$. Try $\mathcal F = \{\emptyset, [0,1], [0,0.5), [0.5,1]\}$. Problem: we cannot measure $[0.25, 0.75]$, though we know its probability is $0.5$. Add it: $\mathcal F^+ = \mathcal F\cup\{[0.25,0.75]\}$. *Is $\mathcal F^+$ a σ-algebra?* No. Adding intersections, unions and complements gives $\mathcal F^{++}$ = {∅, [0,1], [0,.5), [.5,1], [.25,.75], [.25,.5), [.5,.75], [.25,1], [0,.75], [0,.25)∪[.5,1], [0,.5)∪(.75,1], [0,.25), (.75,1]}. Still not a σ-algebra: each new set demands more. This process is **generating a σ-algebra**, and continuing it gives the Borel σ-algebra $\mathcal B[0,1]$.

**Why $\mathcal F$ is fine but too small.** $\{\emptyset,[0,1],[0,0.5),[0.5,1]\}$ is a σ-algebra (check complements and unions). But it can only answer "is the number below one half?".

**Why $\mathcal F^+$ fails.** $[0.25,0.75]^c = [0,0.25)\cup(0.75,1]$ is not in $\mathcal F^+$.

**Finishing the job.** Here is a cleaner way to see what the σ-algebra generated by $[0,0.5)$ and $[0.25,0.75]$ looks like. These two sets cut $[0,1]$ into four disjoint **atoms**:
$$a_1 = [0, 0.25),\quad a_2 = [0.25, 0.5),\quad a_3 = [0.5, 0.75],\quad a_4 = (0.75, 1].$$
Every set in the generated σ-algebra is a union of some of the atoms, and every such union is in it. So it has exactly $2^4 = 16$ sets. The 13 sets in $\mathcal F^{++}$ are all unions of atoms. The three missing ones are
$$a_1\cup a_3 = [0,0.25)\cup[0.5,0.75],\qquad a_2\cup a_4 = [0.25,0.5)\cup(0.75,1],\qquad a_1\cup a_4 = [0,0.25)\cup(0.75,1],$$
the last being $[0.25,0.75]^c$. Adding them closes the collection. (This is the "partition generates all unions of its blocks" fact, which is last year's HW 2 Q6, solved in Part B.)

### Slide 30/73: The Borel σ-algebra $\mathcal B[0,1]$

> **On the slide.** $\mathcal B[0,1]$ is the σ-algebra generated by closed intervals $[a,b]\subseteq[0,1]$. *Does it contain $(a,b)$, $[a,b)$, $(a,b]$?* Yes: $(a,b) = \bigcup_{n=1}^\infty[a + \frac1n, b - \frac1n]$ and $(a,b] = \bigcap_{n=1}^\infty(a, b + \frac1n)$. So $\mathcal B[0,1]$ is equally generated by intervals of any type.

**"Generated by"** means: the **smallest** σ-algebra containing all the given sets. It exists because the intersection of any family of σ-algebras is again a σ-algebra, so you intersect all σ-algebras that contain the given sets.

**Checking the two identities.**

- $x\in(a,b)$ means $a<x<b$. For large $n$, $a + \frac1n \le x \le b - \frac1n$, so $x$ is in the union. Conversely, every point of every $[a + \frac1n, b - \frac1n]$ lies strictly between $a$ and $b$. (For small $n$ these intervals may be empty, which is harmless.)
- $x\in(a,b]$ iff $a < x < b + \frac1n$ for **every** $n$. That is the intersection.

**More conversions you should be able to do.**
$$\{a\} = \bigcap_n\big(a - \tfrac1n, a + \tfrac1n\big),\qquad [a,b) = \bigcup_n\big[a, b - \tfrac1n\big],\qquad [a,b] = \bigcap_n\big(a - \tfrac1n, b + \tfrac1n\big).$$
So once one type of interval is in, all types are in, and so is every single point and every countable set (a countable union of points). The rationals in $[0,1]$ are a Borel set.

### Slide 31/73: The Borel σ-algebra $\mathcal B(\mathbb R)$

> **On the slide.** If $\Omega = \mathbb R$, $\mathcal B(\mathbb R)$ is generated by open intervals $(a,b)$. It contains $[a,b]$, $[a,b)$, $(a,\infty)$, $[a,\infty)$, $(-\infty,b]$, $(-\infty,b)$, $\{a\}$. *How would you define $\mathcal B(\mathbb R^2)$?*

**Unbounded intervals** come from countable unions: $(a,\infty) = \bigcup_n(a, a + n)$ and $(-\infty, b] = \bigcup_n[b - n, b]$.

**The generator that matters most later:** $\mathcal B(\mathbb R)$ is also generated by the half-lines $\{(-\infty, x] : x\in\mathbb R\}$ (last year's HW 2 Q5, proved in Part B). That is why the **CDF** $F_X(x) = P(X\le x)$ is enough to pin down a whole distribution (Lecture 7).

### Slide 32/73: Consequences of the axioms

> **On the slide.** $P(A^c) = 1 - P(A)$. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$. If $A\subseteq B$, prove $P(A)\le P(B)$ ("$A$ implies $B$"). $P(\bigcup_{i=1}^\infty B_i)\le\sum_{i=1}^\infty P(B_i)$ (Boole's inequality). **HW:** what is $P(A\cup B\cup C)$? State and prove inclusion–exclusion for $P(\bigcup_{i=1}^nA_i)$.

Every proof follows one recipe: **write the set as a disjoint union, then use additivity.**

**Complement.** $A$ and $A^c$ are disjoint with union $\Omega$, so $P(A) + P(A^c) = 1$.

**Monotonicity.** If $A\subseteq B$, then $B = A\cup(B\setminus A)$, a disjoint union. So
$$P(B) = P(A) + P(B\setminus A)\ \ge\ P(A),$$
and as a bonus $\boxed{P(B\setminus A) = P(B) - P(A)\text{ when }A\subseteq B}$.

**Union of two.** Split $A\cup B$ into three disjoint pieces: $A\setminus B$, $A\cap B$, $B\setminus A$. Using $P(A\setminus B) = P(A) - P(A\cap B)$ (since $A = (A\setminus B)\cup(A\cap B)$):
$$P(A\cup B) = [P(A) - P(A\cap B)] + P(A\cap B) + [P(B) - P(A\cap B)] = P(A) + P(B) - P(A\cap B).$$

**Boole's inequality (union bound).** "Disjointify": let $C_1 = B_1$ and $C_i = B_i\setminus(B_1\cup\dots\cup B_{i-1})$. The $C_i$ are disjoint, $C_i\subseteq B_i$, and $\bigcup_iC_i = \bigcup_iB_i$ (each point is put in the $C_i$ for the first $B_i$ containing it). So
$$P\Big(\bigcup_iB_i\Big) = \sum_iP(C_i)\le\sum_iP(B_i).\qquad\square$$
Use it as a quick upper bound: if each of 10 components fails with probability 0.01, the probability that *some* component fails is at most $0.1$, whatever the dependence.

**HW: three sets.** Apply the two-set rule twice, with $D = B\cup C$:
$$P(A\cup D) = P(A) + P(D) - P(A\cap D),\qquad A\cap D = (A\cap B)\cup(A\cap C).$$
Expanding $P(D)$ and $P((A\cap B)\cup(A\cap C))$ with the two-set rule (note $(A\cap B)\cap(A\cap C) = A\cap B\cap C$):
$$\boxed{P(A\cup B\cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC)}$$

**HW: inclusion–exclusion for $n$ events.**
$$P\Big(\bigcup_{i=1}^nA_i\Big) = \sum_{i}P(A_i) - \sum_{i<j}P(A_iA_j) + \sum_{i<j<k}P(A_iA_jA_k) - \dots + (-1)^{n+1}P(A_1\cdots A_n).$$
*Proof.* By induction on $n$, applying the two-set rule to $\big(\bigcup_{i\le n}A_i\big)\cup A_{n+1}$; or reuse the counting argument under Lecture 1, slide 13: an outcome lying in exactly $m\ge1$ of the events is counted $\binom m1 - \binom m2 + \dots = 1$ time, so weighting each outcome by its probability gives the formula. $\square$

**Bonferroni's inequality (last year's Tutorial 1, Sets Q1).** $P(A\cap B)\ge P(A) + P(B) - 1$, and in general
$$P(A_1\cap\dots\cap A_n)\ge\sum_{i=1}^nP(A_i) - (n-1).$$
*Proof.* Apply the union bound to the complements and use De Morgan:
$$1 - P\Big(\bigcap_iA_i\Big) = P\Big(\bigcup_iA_i^c\Big)\le\sum_i\big(1 - P(A_i)\big) = n - \sum_iP(A_i).$$
Rearrange. $\square$ (Slide 32 calls the union bound "Boole's/Bonferroni's inequality"; both names are used.)

### Slide 33/73: Impossible event vs zero-probability event

> **On the slide.** In $\mathcal U[0,1]$, $P(\omega = 0.5) = 0$: a point has zero length. If $P([a,b]) = b - a$, then $P(\{0.5\}) = P([0.5,0.5]) = 0$. Every outcome of this experiment has probability zero. So events of zero probability can happen; they are not impossible. $P(\emptyset) = 0$ too, but $\emptyset$ never happens. Example: $P([0,0.25]\cap[0.75,1]) = P(\emptyset) = 0$ will never happen.

$$\text{impossible } (A = \emptyset)\ \Longrightarrow\ P(A) = 0,\qquad\text{but}\qquad P(A) = 0\ \not\Longrightarrow\ A = \emptyset .$$

Probability zero means "happens with negligible frequency", not "cannot happen". In the uniform experiment *some* number is picked, and whichever one it is had probability zero. Likewise, $P(A) = 1$ ("almost surely") does not mean $A = \Omega$. These ideas return in L17 (almost sure convergence).

### Slide 34/73: The apparent paradox

> **On the slide.** $\Omega = \bigcup_{\omega\in\Omega}\{\omega\}$, so $P(\Omega) = \sum_{\omega}P(\{\omega\}) = 0$? *What is the problem?* $\Omega$ is uncountable and $P$ is only countably additive. $\bigcup_\omega\{\omega\}$ is an uncountable disjoint union.

Axiom 3 says nothing about uncountable unions, so the second equality is not allowed. This is exactly why the axiom says *countable*: if it allowed arbitrary unions, the uniform distribution on $[0,1]$ could not exist.

### Slides 35/73 and 36/73: Limits and continuity

> **On the slides.** How do you define $\lim_{n\to\infty}a_n = L$, $\lim_{x\to c}f(x) = L$, and continuity at $c$? The $(\epsilon,\delta)$ definition. In terms of sequences: $f$ is continuous if $x\to c$ implies $f(x)\to f(c)$. A set function $S$ is continuous if $A_n\to A$ implies $S(A_n)\to S(A)$. *Is $P$ continuous?* Proof in Lecture 3.

**The definitions.**

- $a_n\to L$: for every $\epsilon>0$ there is $N$ with $|a_n - L|<\epsilon$ for all $n\ge N$.
- $\lim_{x\to c}f(x) = L$: for every $\epsilon>0$ there is $\delta>0$ with $|f(x) - L|<\epsilon$ whenever $0<|x - c|<\delta$.
- $f$ is continuous at $c$ if $\lim_{x\to c}f(x) = f(c)$. Equivalently (**sequential form**): for every sequence $x_n\to c$, $f(x_n)\to f(c)$.

The sequential form is the one that carries over to sets: replace "$x_n\to c$" with "$A_n\to A$" (made precise for monotone sequences on slide 37) and ask whether $P(A_n)\to P(A)$. The answer is yes, and it follows from countable additivity (Lecture 3).

## Part B: extra worked examples and problems

**B1 (last year's HW 2 Q1; Bertsekas Problem 1.7).** A four-sided die is rolled until the first even number appears. Give the sample space and a σ-algebra.

*Solution.* Record the sequence of rolls. Every roll before the last is odd (1 or 3) and the last is even (2 or 4):
$$\Omega = \{2,4,\ 12,14,32,34,\ 112,114,132,\dots\}\cup\{\text{infinite sequences of 1s and 3s}\}.$$
The infinite sequences ("an even number never appears") must be included for $\Omega$ to be exhaustive, even though they have probability 0 in total. If you only care about the finite sequences, $\Omega$ is countable and you can take $\mathcal F = \mathcal P(\Omega)$. With the infinite sequences included, $\Omega$ is uncountable. The standard choice is then the σ-algebra generated by the "cylinder" events "the first $k$ rolls are $r_1,\dots,r_k$", which contains every event you would ask about (such as "the game lasts exactly $n$ rolls").

**B2 (last year's HW 2 Q6).** $\{A_1, A_2,\dots\}$ is a finite or countable partition of $\Omega$. What σ-algebra does it generate?

*Solution.* $\sigma(\{A_n\}) = \big\{\bigcup_{i\in I}A_i : I\subseteq\{1,2,\dots\}\big\}$, all unions of blocks (with $I = \emptyset$ giving $\emptyset$).

- *It is a σ-algebra.* $\Omega$ is the union of all blocks. The complement of $\bigcup_{i\in I}A_i$ is $\bigcup_{i\notin I}A_i$ (the blocks partition $\Omega$). A countable union of unions of blocks is a union of blocks.
- *It is the smallest.* Any σ-algebra containing every $A_i$ contains all their countable unions, and $I$ is countable.

With $n$ blocks it has $2^n$ sets. This is the "atoms" picture under slides 27 to 29.

**B3 (last year's Tutorial 2 Q2).** $\Omega = \mathbb N$ and $\mathcal F = \{A\subseteq\mathbb N : A\text{ finite or }A^c\text{ finite}\}$. Show $\mathcal F$ is not a σ-algebra.

*Solution.* $\mathcal F$ contains $\Omega$ ($\Omega^c = \emptyset$ is finite) and is closed under complements (the definition is symmetric). It is even closed under finite unions. But take $A_n = \{2n\}$: each is finite, so in $\mathcal F$. Their countable union is the even numbers $E$. Neither $E$ nor $E^c$ (the odd numbers) is finite, so $E\notin\mathcal F$. It fails rule 3. (Such a collection is called an *algebra*: closed under finite but not countable unions.)

**B4 (last year's Tutorial 2 Q7).** On $(\Omega,\mathcal F,P)$ let $\mathcal G = \{A\in\mathcal F : P(A) = 0\text{ or }1\}$. Show $\mathcal G$ is a σ-algebra.

*Solution.*

1. $P(\Omega) = 1$, so $\Omega\in\mathcal G$.
2. If $P(A)\in\{0,1\}$ then $P(A^c) = 1 - P(A)\in\{0,1\}$.
3. Let $A_1, A_2,\dots\in\mathcal G$ and $A = \bigcup_nA_n$. If some $P(A_k) = 1$, then $1\ge P(A)\ge P(A_k) = 1$ by monotonicity. Otherwise every $P(A_n) = 0$, and by the union bound $P(A)\le\sum_n0 = 0$.

Either way $P(A)\in\{0,1\}$. $\square$

**B5 (last year's HW 2 Q5).** Show that the σ-algebra generated by $\mathcal A = \{(-\infty,x] : x\in\mathbb R\}$ is $\mathcal B(\mathbb R)$.

*Solution.* Write $\sigma(\mathcal A)$ for it. Two inclusions.

- $\sigma(\mathcal A)\subseteq\mathcal B(\mathbb R)$: each $(-\infty,x]$ is Borel (slide 31), and $\mathcal B(\mathbb R)$ is a σ-algebra, so it contains the smallest σ-algebra containing $\mathcal A$.
- $\mathcal B(\mathbb R)\subseteq\sigma(\mathcal A)$: it is enough to show every open interval $(a,b)$ is in $\sigma(\mathcal A)$. First, $(a,b] = (-\infty,b]\cap(-\infty,a]^c\in\sigma(\mathcal A)$. Then
$$(a,b) = \bigcup_{n\ge1}\big(a, b - \tfrac1n\big]\in\sigma(\mathcal A).$$
Since $\sigma(\mathcal A)$ is a σ-algebra containing all the generators of $\mathcal B(\mathbb R)$, it contains $\mathcal B(\mathbb R)$. $\square$

**B6 (inclusion–exclusion, last year's Tutorial 2 Q1).** A fair die is rolled $n$ times. Find the probability that all six faces appear.

*Solution.* Let $A_i$ = "face $i$ never appears". We want $1 - P(A_1\cup\dots\cup A_6)$. Any $k$ specified faces are all missing with probability $\big(\frac{6-k}{6}\big)^n$, and there are $\binom6k$ ways to choose them. Inclusion–exclusion:
$$P(\text{all faces appear}) = \sum_{k=0}^{6}(-1)^k\binom6k\Big(1 - \frac k6\Big)^n .$$
Check $n = 6$: the formula gives $\frac{6!}{6^6} = \frac{720}{46656}\approx0.0154$, the probability that six rolls are a permutation of $1,\dots,6$. ✓


# Lecture 3, part 1: Continuity of $P$, conditional probability and Bayes' rule (Deck 1, slides 36 to 46)

**Big picture.** First, a technical result: $P$ is **continuous** along increasing or decreasing sequences of events. It is the bridge between finite reasoning and limits, and it is used again in the CDF properties (L7) and in convergence (L16 to L18). Then the most used ideas of the whole course: **conditional probability** (updating on information), the **multiplication (chain) rule**, the **law of total probability** (divide and conquer), and **Bayes' rule** (reasoning backwards from effect to cause).

## Part A: the slides

### Slide 37/73: Sequences of sets

> **On the slide.** If $A_1\subset A_2\subset\dots$ are events and $\bigcup_nA_n = A\in\mathcal F$, we say $A_n$ increases to $A$, written $A_n\uparrow A$. If $A_1\supset A_2\supset\dots$ and $\bigcap_nA_n = A$, then $A_n\downarrow A$. Notation: $\lim_nA_n$ means $\bigcup_nA_n$ for increasing and $\bigcap_nA_n$ for decreasing sequences.

For a monotone sequence the "limit" is the obvious one: an increasing sequence grows to its union, a decreasing one shrinks to its intersection. The examples from Lecture 1, slide 14: $[0, 1 - \frac1n]\uparrow[0,1)$ and $[0,\frac1n]\downarrow\{0\}$.

### Slide 38/73: Continuity of $P$

> **On the slide.** **Lemma.** If $A_n\uparrow A$ or $A_n\downarrow A$, then $\lim_{n\to\infty}P(A_n) = P(A)$. *Proof (increasing case).* Define $F_n = A_n - A_{n-1}$. Then $\bigcup_nA_n = \bigcup_nF_n$, so $P(A) = P(\bigcup_nF_n) = \lim_n\sum_{i=1}^nP(F_i) = \lim_nP(A_n)$. Equivalently, if $A_n\downarrow\emptyset$ then $P(A_n)\to0$.

$$\boxed{A_n\uparrow A\ \text{ or }\ A_n\downarrow A\quad\Longrightarrow\quad P(A_n)\to P(A)}$$

**The proof in full (increasing case).** Set $A_0 = \emptyset$ and $F_n = A_n\setminus A_{n-1}$, the "new part" added at step $n$.

1. The $F_n$ are disjoint: a point belongs only to the $F_n$ for the first $A_n$ that contains it.
2. $A_n = F_1\cup\dots\cup F_n$ (disjoint), so $P(A_n) = \sum_{i=1}^nP(F_i)$.
3. $\bigcup_nA_n = \bigcup_nF_n$, so by countable additivity
$$P(A) = \sum_{i=1}^\infty P(F_i) = \lim_{n\to\infty}\sum_{i=1}^nP(F_i) = \lim_{n\to\infty}P(A_n).$$

**Decreasing case.** If $A_n\downarrow A$ then $A_n^c\uparrow A^c$ (De Morgan). By the increasing case, $1 - P(A_n) = P(A_n^c)\to P(A^c) = 1 - P(A)$.

**Why it is useful.** It lets you compute the probability of a limiting event as a limit of easy probabilities.

- *Never getting a head.* Let $A_n$ = "first $n$ tosses are tails". Then $A_n\downarrow$ "all tosses are tails", and $P(A_n) = (1-p)^n\to0$. So $P(\text{no head ever}) = 0$.
- *Uniform on $[0,1]$:* $P([0,\frac1n]) = \frac1n\to0 = P(\{0\})$, which agrees with "a point has probability zero".

### Slide 39/73: Conditional probability

> **On the slide.** *If the die rolls odd, what is the probability that it shows 1? If $\bar\omega\in[0,0.5]$, what is the probability that $\bar\omega\in[0,0.25]$?* Definition: $P(B\mid A) := \dfrac{P(A\cap B)}{P(A)}$ when $P(A)>0$.

$$\boxed{P(B\mid A) = \frac{P(A\cap B)}{P(A)},\qquad P(A)>0}$$

**The two questions.**
$$P(\{1\}\mid\text{odd}) = \frac{P(\{1\})}{P(\{1,3,5\})} = \frac{1/6}{1/2} = \frac13,\qquad P([0,0.25]\mid[0,0.5]) = \frac{0.25}{0.5} = \frac12 .$$

**How to think about it.** Knowing that $A$ happened shrinks the sample space to $A$. Outcomes outside $A$ are ruled out, and the probabilities of outcomes inside $A$ are rescaled by $1/P(A)$ so they add to 1. The relative odds of outcomes inside $A$ do not change.

**$P(\cdot\mid A)$ is itself a probability measure** (on the same $\mathcal F$). It is non-negative, $P(\Omega\mid A) = 1$, and it is countably additive. So every rule from Lecture 2 holds conditionally:
$$P(B^c\mid A) = 1 - P(B\mid A),\qquad P(B\cup C\mid A) = P(B\mid A) + P(C\mid A) - P(BC\mid A).$$
A common mistake is to "complement the condition": $P(B\mid A^c)$ is **not** $1 - P(B\mid A)$.

### Slide 40/73: Bayes, conditioning on two events, the chain rule

> **On the slide.** Show $P(A\mid B)P(B) = P(B\mid A)P(A)$. Bayes: $P(B\mid A) = \frac{P(A\mid B)P(B)}{P(A)}$. *What is $P(A\mid B\cap C)$?* (also written $P(A\mid BC)$). Prove $P(A\cap B\cap C) = P(A)P(B\mid A)P(C\mid AB)$. **HW:** prove $P(A_1\cap\dots\cap A_n) = P(A_1)P(A_2\mid A_1)P(A_3\mid A_1A_2)\cdots P(A_n\mid A_1\cdots A_{n-1})$.

**The symmetric identity.** Both sides equal $P(A\cap B)$, straight from the definition. Dividing by $P(A)$ gives Bayes' rule.

**Chain rule for three events.** Write each factor as a ratio and watch them telescope:
$$P(A)\cdot\frac{P(AB)}{P(A)}\cdot\frac{P(ABC)}{P(AB)} = P(ABC).$$

**HW: chain rule for $n$ events** (also last year's HW 2 Q8). Assume $P(A_1\cdots A_{n-1})>0$ (so every conditioning event has positive probability, since $A_1\cdots A_k\supseteq A_1\cdots A_{n-1}$). Then
$$P(A_1)\prod_{k=2}^n P(A_k\mid A_1\cdots A_{k-1}) = P(A_1)\prod_{k=2}^n\frac{P(A_1\cdots A_k)}{P(A_1\cdots A_{k-1})} = P(A_1\cdots A_n),$$
since every numerator cancels the next denominator. (Formally, induction on $n$: $P(A_1\cdots A_n) = P(A_1\cdots A_{n-1})\,P(A_n\mid A_1\cdots A_{n-1})$.) $\square$

**When to use it.** Whenever the experiment happens **in stages** (draw, then draw again; toss, then toss again). You multiply along a path of the tree diagram.

### Slide 41/73: Conditional probability examples

> **On the slide.** Draw 4 cards without replacement. *Probability that, in order, they are 9♣, 8♦, K♠, K♣? What if with replacement?* For a finite $\Omega$ with equally likely outcomes, $P(B\mid A) = \frac{|A\cap B|}{|A|}$.

**Without replacement.** Chain rule: the first card is right with probability $\frac1{52}$; given that, the second with $\frac1{51}$, and so on:
$$P = \frac1{52}\cdot\frac1{51}\cdot\frac1{50}\cdot\frac1{49} = \frac1{6{,}497{,}400}\approx1.54\times10^{-7}.$$
**With replacement.** Each draw is from the full deck: $P = \big(\frac1{52}\big)^4 = \frac1{7{,}311{,}616}$. Slightly smaller, since a card already drawn can come back and spoil the sequence.

**Equally likely outcomes.** $P(B\mid A) = \frac{|A\cap B|/|\Omega|}{|A|/|\Omega|} = \frac{|A\cap B|}{|A|}$. Conditioning on $A$ is counting inside $A$. That is how slide 39's die answer $\frac13$ comes out: one favourable outcome among three.

### Slide 42/73: Law of total probability

> **On the slide.** $A = (A\cap B)\cup(A\cap B^c)$, so $P(A) = P(A\cap B) + P(A\cap B^c) = P(A\mid B)P(B) + P(A\mid B^c)P(B^c)$. Useful when $P(A)$ is hard but $P(B)$ and $P(A\mid B)$ are easy. In general, for a partition $B_1,\dots,B_n$ of $\Omega$: $P(A) = \sum_iP(A\cap B_i) = \sum_iP(A\mid B_i)P(B_i)$.

$$\boxed{P(A) = \sum_{i}P(A\mid B_i)\,P(B_i)\qquad (B_1, B_2,\dots\text{ a partition of }\Omega)}$$

**Why it is true.** The $A\cap B_i$ are disjoint and their union is $A$ (the $B_i$ cover $\Omega$). Additivity and the multiplication rule $P(A\cap B_i) = P(A\mid B_i)P(B_i)$ do the rest. It also holds for countably many $B_i$. You may drop any $B_i$ with $P(B_i) = 0$.

**How to use it.** Choose the partition to be **the thing you wish you knew**: which bag, which coin, whether it rains. Conditional on it, the problem becomes easy.

### Slide 43/73: Example 1, three bags of marbles

> **On the slide.** 3 bags with $M$ marbles each; bag $i$ has $R_i$ red and $B_i$ blue. Choose a bag at random, then draw a marble. $P(\text{Red}) = \sum_iP(\text{Red}\mid \text{Bag }i)P(\text{Bag }i)$.

Each bag is chosen with probability $\frac13$ and $P(\text{Red}\mid\text{Bag }i) = \frac{R_i}{M}$:
$$P(\text{Red}) = \frac13\Big(\frac{R_1}M + \frac{R_2}M + \frac{R_3}M\Big) = \frac{R_1 + R_2 + R_3}{3M}.$$
Because all bags have the same size, this equals "pick one of the $3M$ marbles uniformly". With unequal bag sizes it would not.

### Slide 44/73: Example 2, the defect-spotting robot

> **On the slide.** If an item is defective, a robot spots it with 98% accuracy. If not defective, the robot declares so with 99% accuracy. 0.1% of items are defective. *If the robot says the item is defective, what is the probability that it is correct?* $P(\text{def}\mid\text{says def}) = \frac{P(\text{says def}\mid\text{def})P(\text{def})}{P(\text{says def})}$. *What is $P(\text{says def})$?*

Let $D$ = defective and $S$ = robot says defective. Given: $P(D) = 0.001$, $P(S\mid D) = 0.98$, $P(S^c\mid D^c) = 0.99$, so $P(S\mid D^c) = 0.01$.

**Total probability for the denominator:**
$$P(S) = P(S\mid D)P(D) + P(S\mid D^c)P(D^c) = 0.98(0.001) + 0.01(0.999) = 0.00098 + 0.00999 = 0.01097 .$$
**Bayes:**
$$P(D\mid S) = \frac{0.00098}{0.01097}\approx\boxed{0.089}.$$
Only about 9% of flagged items are really defective, despite a "98% accurate" robot.

**Why so low.** Picture 100,000 items: 100 defective, of which 98 are flagged. Among the 99,900 good ones, 1% (999) are wrongly flagged. Of the $98 + 999 = 1097$ flags, only 98 are real. When the condition is rare, false positives from the huge "good" group swamp the true positives. This is the **base-rate fallacy**. The same structure appears in last year's HW 2 Q9 (alarm) and Tutorial 2 Q3 (disease test), both in Part B.

### Slide 45/73: Bayes' rule revisited

> **On the slide.** For a partition $B_1,\dots,B_n$ and $P(A)>0$: $P(B_j\mid A) = \dfrac{P(A\mid B_j)P(B_j)}{\sum_{i=1}^nP(A\mid B_i)P(B_i)}$. *In the marble example, given that the marble is red, what is the probability that bag 1 was chosen?*

$$\boxed{P(B_j\mid A) = \frac{P(A\mid B_j)\,P(B_j)}{\sum_iP(A\mid B_i)\,P(B_i)}}$$

**Vocabulary.** $P(B_j)$ is the **prior** (belief before the evidence), $P(A\mid B_j)$ the **likelihood** (how well cause $j$ explains the evidence), and $P(B_j\mid A)$ the **posterior**. The posterior is proportional to prior × likelihood, and the denominator just normalises.

**Marble question.**
$$P(\text{Bag 1}\mid\text{Red}) = \frac{\frac{R_1}{M}\cdot\frac13}{\frac{R_1 + R_2 + R_3}{3M}} = \frac{R_1}{R_1 + R_2 + R_3}.$$
Intuition: each red marble is equally likely to be the one drawn (equal bag sizes), and $R_1$ of them are in bag 1.

### Slide 46/73: Recap

> **On the slide.** Probability space $(\Omega,\mathcal F,P)$; axioms; σ-algebras as domain; Borel σ-algebras; conditional probability; total probability and Bayes.

- $(\Omega,\mathcal F,P)$: outcomes, events you may ask about, and a countably additive measure with total mass 1.
- σ-algebra: contains $\Omega$, closed under complements and countable unions.
- Borel: generated by intervals; contains every set you will meet.
- $P(B\mid A) = P(AB)/P(A)$; chain rule; total probability; Bayes = prior × likelihood, normalised.


## Part B: extra worked examples and problems (continuity, conditioning and Bayes)

These cover slides 36 to 46. Last year's HW 2 and Tutorial 2 problems on Bayes are in Lecture 3, part 2, Part B, so the ones here are new and aimed at the spots where people lose marks.

**B1 (continuity of $P$, a coin tossed forever).** A fair coin is tossed forever. Let $A_n$ = "the first $n$ tosses are all heads" and $B_n$ = "at least one head in the first $n$ tosses". Use continuity of $P$ to find $P\big(\bigcap_n A_n\big)$ and $P\big(\bigcup_n B_n\big)$.

*Solution.* $A_1\supseteq A_2\supseteq\cdots$ is decreasing, so continuity from above gives
$$P\Big(\bigcap_nA_n\Big) = \lim_{n\to\infty}P(A_n) = \lim_{n\to\infty}2^{-n} = \boxed{0}.$$
$\bigcap_nA_n$ is the event "every toss is a head". It is not empty (the outcome $HHH\cdots$ is in it), yet it has probability 0. $B_1\subseteq B_2\subseteq\cdots$ is increasing, so continuity from below gives
$$P\Big(\bigcup_nB_n\Big) = \lim_{n\to\infty}\big(1 - 2^{-n}\big) = \boxed{1}.$$
So a head eventually appears with probability 1. Check: the complement of $\bigcup_nB_n$ is "every toss is a tail", which has probability 0 by the same argument as the first part.

**B2 (countably many sure events).** Suppose $P(A_n) = 1$ for every $n\ge1$. Show that $P\big(\bigcap_nA_n\big) = 1$.

*Solution.* Pass to complements. $P(A_n^c) = 0$ for each $n$, and by countable subadditivity (a consequence of countable additivity, Lecture 2)
$$P\Big(\Big(\bigcap_nA_n\Big)^c\Big) = P\Big(\bigcup_nA_n^c\Big)\le\sum_{n=1}^\infty P(A_n^c) = 0 .$$
So $P\big(\bigcap_nA_n\big) = 1 - 0 = 1$. The same argument shows a countable union of probability-0 events has probability 0. It fails for uncountable unions: on $[0,1]$ with length, every point has probability 0 but their union has probability 1.

**B3 (conditioning shrinks the sample space).** Two fair dice are rolled. Given that the sum is 8, what is the probability that at least one die shows a 6?

*Solution.* Conditioning on $B$ = "sum is 8" makes $B$ the new sample space, and its outcomes stay equally likely:
$$B = \{(2,6),(3,5),(4,4),(5,3),(6,2)\}.$$
Two of the five contain a 6, so
$$P(\text{at least one }6\mid\text{sum } 8) = \frac{P(A\cap B)}{P(B)} = \frac{2/36}{5/36} = \boxed{\tfrac25}.$$
Compare with the unconditional $P(\text{at least one }6) = \frac{11}{36}\approx0.31$. Knowing the sum raised it to $0.4$.

**B4 (the two-children trap).** A family has two children, each a girl or a boy with probability $\frac12$, independently. (a) Given that at least one is a girl, find $P(\text{both girls})$. (b) Given that the **older** child is a girl, find $P(\text{both girls})$.

*Solution.* $\Omega = \{GG, GB, BG, BB\}$ (older first), each with probability $\frac14$.

(a) "At least one girl" is $\{GG,GB,BG\}$, so $P(GG\mid\cdot) = \frac{1/4}{3/4} = \boxed{\tfrac13}$.

(b) "Older is a girl" is $\{GG,GB\}$, so $P(GG\mid\cdot) = \frac{1/4}{2/4} = \boxed{\tfrac12}$.

The two conditions sound alike but are different events, so they give different answers. Always write the conditioning event as a set before you compute.

**B5 (chain rule, drawing without replacement).** Three cards are drawn from a standard deck without replacement. Find the probability that all three are hearts.

*Solution.* Let $H_i$ = "card $i$ is a heart". By the chain rule (slide 41),
$$P(H_1H_2H_3) = P(H_1)\,P(H_2\mid H_1)\,P(H_3\mid H_1H_2) = \frac{13}{52}\cdot\frac{12}{51}\cdot\frac{11}{50} = \frac{1716}{132600} = \boxed{\tfrac{11}{850}}\approx0.0129 .$$
Check by counting: $\binom{13}3\big/\binom{52}3 = 286/22100 = 11/850$. Same answer.

**B6 (total probability in two stages, Pólya's urn).** An urn has 3 red and 2 blue balls. A ball is drawn, then put back **together with one more ball of the same colour**, and a second ball is drawn. (a) Find $P(\text{second is red})$. (b) Given the second is red, find $P(\text{first was red})$.

*Solution.* Let $R_1, R_2$ be "first red" and "second red".

(a) By total probability over the first draw,
$$P(R_2) = P(R_2\mid R_1)P(R_1) + P(R_2\mid R_1^c)P(R_1^c) = \frac46\cdot\frac35 + \frac36\cdot\frac25 = \frac{12}{30} + \frac6{30} = \boxed{\tfrac35}.$$
That is the same as $P(R_1)$, which surprises most people. (It holds for every later draw too.)

(b) By Bayes,
$$P(R_1\mid R_2) = \frac{P(R_2\mid R_1)P(R_1)}{P(R_2)} = \frac{12/30}{18/30} = \boxed{\tfrac23}.$$
A red second ball is evidence that the first was red, because a red first ball adds red to the urn.

**B7 (Bayes with three causes).** Factories A, B and C make 50%, 30% and 20% of a company's bulbs. Their defect rates are 1%, 2% and 5%. A bulb chosen at random is defective. Which factory most likely made it?

*Solution.* Total probability first:
$$P(D) = 0.5(0.01) + 0.3(0.02) + 0.2(0.05) = 0.005 + 0.006 + 0.010 = 0.021 .$$
Then Bayes for each factory:
$$P(A\mid D) = \frac{0.005}{0.021} = \frac5{21},\qquad P(B\mid D) = \frac{0.006}{0.021} = \frac6{21},\qquad P(C\mid D) = \frac{0.010}{0.021} = \boxed{\tfrac{10}{21}}\approx0.48 .$$
C makes the fewest bulbs but is the most likely source, because its likelihood $P(D\mid C)$ is so much larger. Posterior is proportional to prior × likelihood: $0.5\times0.01$, $0.3\times0.02$ and $0.2\times0.05$, in the ratio $5 : 6 : 10$.

**B8 (Monty Hall, done with Bayes).** A car is behind one of three doors, each equally likely. You pick door 1. The host, who knows where the car is, opens a door you did not pick that hides a goat, choosing at random if he has a choice. He opens door 3. Should you switch to door 2?

*Solution.* Let $C_i$ = "car behind door $i$" and $O_3$ = "host opens door 3". The likelihoods are
$$P(O_3\mid C_1) = \tfrac12,\qquad P(O_3\mid C_2) = 1,\qquad P(O_3\mid C_3) = 0 .$$
So $P(O_3) = \frac13\big(\frac12 + 1 + 0\big) = \frac12$, and
$$P(C_2\mid O_3) = \frac{1\cdot\frac13}{\frac12} = \boxed{\tfrac23},\qquad P(C_1\mid O_3) = \frac{\frac12\cdot\frac13}{\frac12} = \tfrac13 .$$
Switch. The host's action carries information because he is not allowed to open the car's door. If he had instead opened door 3 at random and it happened to show a goat, both remaining doors would have probability $\frac12$.

**B9 (updating twice).** A disease has prevalence 1%. A test detects it with probability 0.95 and gives a false positive with probability 0.05. Results of repeated tests are independent given the person's true status. (a) Find $P(\text{disease}\mid\text{one positive})$. (b) Find $P(\text{disease}\mid\text{two positives})$.

*Solution.* (a)
$$P(D\mid+) = \frac{0.95(0.01)}{0.95(0.01) + 0.05(0.99)} = \frac{0.0095}{0.0590}\approx\boxed{0.161}.$$
(b) Given the status, the two results are independent, so $P(++\mid D) = 0.95^2$ and $P(++\mid D^c) = 0.05^2$:
$$P(D\mid++) = \frac{0.9025(0.01)}{0.9025(0.01) + 0.0025(0.99)} = \frac{0.009025}{0.0115}\approx\boxed{0.785}.$$
You get the same answer by using the posterior from (a), $0.161$, as the new prior and updating on the second positive. Note the tests are **conditionally** independent given the status, not independent: a first positive makes a second positive more likely.

**B10 (positive association is symmetric).** Let $P(A)>0$ and $P(B)>0$. Show that $P(A\mid B)>P(A)$ if and only if $P(B\mid A)>P(B)$.

*Solution.* Multiply each inequality by the positive number in its denominator:
$$P(A\mid B)>P(A)\iff P(AB)>P(A)P(B)\iff P(B\mid A)>P(B).$$
So "$B$ makes $A$ more likely" and "$A$ makes $B$ more likely" are the same statement, namely $P(AB)>P(A)P(B)$. Replacing $>$ by $=$ gives the definition of independence in Lecture 3, part 2.


# Lecture 3, part 2: Independence (Deck 1, slides 47 to 56)

**Big picture.** Two events are independent when knowing one tells you nothing about the other: $P(A\mid B) = P(A)$, or equivalently $P(A\cap B) = P(A)P(B)$. The slides then sort out four ideas that students often confuse: **mutual vs pairwise** independence, **independent vs mutually exclusive**, the fact that **zero-probability events are independent of everything**, and **conditional independence**, which can hold without independence and vice versa.

## Part A: the slides

### Slide 47/73: Plan

> **On the slide.** Independence of events; mutually exclusive events; conditional independence; zero-probability events and independence; counting (HW); motivation for random variables.

### Slide 48/73: Independence

> **On the slide.** Toss a coin and roll a die together. *Identify the probability space. What is $P(\{H,6\})$? What is $P(\{T,\text{odd}\}) = P(\bigcup_{i=1,3,5}\{(T,i)\})$?* In both cases $P(A\cap B) = P(A)P(B)$, which implies $P(A\mid B) = P(A)$. $A, B$ are independent iff $P(A\mid B) = P(A)$ and $P(B\mid A) = P(B)$, iff $P(A\cap B) = P(A)P(B)$.

**Probability space.** $\Omega = \{H,T\}\times\{1,\dots,6\}$, 12 equally likely outcomes; $\mathcal F = 2^\Omega$; $P(E) = |E|/12$.

**The two computations.**
$$P(\{(H,6)\}) = \tfrac1{12} = \tfrac12\cdot\tfrac16,\qquad P(\{(T,1),(T,3),(T,5)\}) = \tfrac3{12} = \tfrac14 = \tfrac12\cdot\tfrac12 .$$
In each case the probability of "coin event and die event" is the product of the separate probabilities.

$$\boxed{A, B\text{ independent}\iff P(A\cap B) = P(A)\,P(B)}$$

**Why use the product form as the definition.** It is symmetric in $A$ and $B$, and it still makes sense when $P(A) = 0$ or $P(B) = 0$, where $P(A\mid B)$ is undefined. When $P(B)>0$ it is equivalent to $P(A\mid B) = P(A)$: divide by $P(B)$.

### Slide 49/73: Complements of independent events

> **On the slide.** If $A$ and $B$ are independent, are $A^c$ and $B^c$ independent? What about $A$ and $B^c$? If $A_1,\dots,A_n$ are independent, prove $P(\bigcup_{i=1}^nA_i) = 1 - \prod_{i=1}^n[1 - P(A_i)]$.

**$A$ and $B^c$ (yes).** $A = (A\cap B)\cup(A\cap B^c)$ disjointly, so
$$P(A\cap B^c) = P(A) - P(A)P(B) = P(A)\big(1 - P(B)\big) = P(A)P(B^c).$$
**$A^c$ and $B^c$ (yes).** Apply the same step again, now to the independent pair $(B^c, A)$, to get that $B^c$ and $A^c$ are independent. Or directly with De Morgan:
$$P(A^cB^c) = 1 - P(A\cup B) = 1 - P(A) - P(B) + P(A)P(B) = (1 - P(A))(1 - P(B)).$$
So **if $A$ and $B$ are independent, so is every pair from $\{A, A^c\}\times\{B, B^c\}$.** Learning that $B$ did *not* happen is also information, and it is equally useless for predicting $A$.

**Union of independent events.** "At least one" is the complement of "none":
$$P\Big(\bigcup_iA_i\Big) = 1 - P\Big(\bigcap_iA_i^c\Big) = 1 - \prod_{i=1}^nP(A_i^c) = \boxed{1 - \prod_{i=1}^n\big(1 - P(A_i)\big)} .$$
The middle step uses that the complements of (mutually) independent events are mutually independent (the same argument as above, applied to each subcollection). Typical use: three independent alarms, each working with probability 0.9. At least one works with probability $1 - 0.1^3 = 0.999$.

### Slide 50/73: Mutual and pairwise independence

> **On the slide.** $\{A_i, i\in I\}$ are mutually independent if $P(\bigcap_{j\in J}A_j) = \prod_{j\in J}P(A_j)$ for **every** finite subset $J\subseteq I$. Pairwise independent: every pair is independent. Mutual implies pairwise, but not conversely. **HW:** find an example where pairwise independence does not imply mutual independence.

For three events, mutual independence means **four** conditions:
$$P(AB) = P(A)P(B),\quad P(AC) = P(A)P(C),\quad P(BC) = P(B)P(C),\quad P(ABC) = P(A)P(B)P(C).$$
Pairwise independence is only the first three.

**HW: the standard counter-example** (Bertsekas Example 1.22). Toss two fair coins. Let
$$A = \{\text{1st toss }H\},\quad B = \{\text{2nd toss }H\},\quad C = \{\text{the two tosses agree}\} = \{HH, TT\}.$$
Each has probability $\frac12$. Each pairwise intersection is the single outcome $HH$ (for example $A\cap C = \{HH\}$), with probability $\frac14 = \frac12\cdot\frac12$. So they are pairwise independent. But
$$P(A\cap B\cap C) = P(\{HH\}) = \tfrac14\ \ne\ \tfrac18 = P(A)P(B)P(C).$$
Not mutually independent: once you know $A$ and $B$, you know $C$ for sure.

### Slide 51/73: Independence example

> **On the slide.** Pick a number at random from $\{1,\dots,10\}$. $A$: less than 7. $B$: less than 8. $C$: even. *Are the events mutually independent? Which pairs are independent?*

$A = \{1,\dots,6\}$, $B = \{1,\dots,7\}$, $C = \{2,4,6,8,10\}$, so $P(A) = 0.6$, $P(B) = 0.7$, $P(C) = 0.5$.

| Pair | Intersection | $P(\text{intersection})$ | Product | Independent? |
|---|---|---|---|---|
| $A, B$ | $A$ (since $A\subseteq B$) | $0.6$ | $0.42$ | no |
| $A, C$ | $\{2,4,6\}$ | $0.3$ | $0.3$ | **yes** |
| $B, C$ | $\{2,4,6\}$ | $0.3$ | $0.35$ | no |

Only $A$ and $C$ are independent, so the three are not mutually independent (also $P(ABC) = 0.3\ne0.21$). Note that $A, C$ are independent "by accident": exactly half of $\{1,\dots,6\}$ is even, matching the overall proportion. Change $A$ to "less than 8" (that is, $B$) and it breaks.

### Slide 52/73: Correlation between events

> **On the slide.** $A, B$ are positively correlated iff $P(A\mid B) > P(A)$, negatively correlated iff $P(A\mid B) < P(A)$. $A$ and $B$ have the same correlation as $A^c$ and $B^c$. $A$ and $B$ have the opposite correlation to $A$ and $B^c$.

Multiply through by $P(B)$: positive correlation means $P(AB) > P(A)P(B)$. This form is symmetric, so "$B$ makes $A$ more likely" is the same as "$A$ makes $B$ more likely".

**Proof of the two claims.** Let $d = P(AB) - P(A)P(B)$ (the "covariance" of the events). Then
$$P(AB^c) - P(A)P(B^c) = \big[P(A) - P(AB)\big] - P(A)\big[1 - P(B)\big] = -d,$$
$$P(A^cB^c) - P(A^c)P(B^c) = \big[1 - P(A) - P(B) + P(AB)\big] - \big[1 - P(A)\big]\big[1 - P(B)\big] = d .$$
So $(A, B^c)$ has the opposite sign and $(A^c,B^c)$ the same sign. With $d = 0$ this re-proves slide 49. In slide 51, $A$ and $B$ are positively correlated ($0.6 > 0.42$), and $B$ and $C$ negatively ($0.3 < 0.35$).

### Slide 53/73: Mutually exclusive vs independent

> **On the slide.** If $A$ and $B$ are mutually exclusive, they are not independent (and vice versa). Mutually exclusive: $P(A\cap B) = 0$, $P(A\mid B) = 0$, $P(A\mid B^c) = \frac{P(A)}{P(B^c)}$. Independent: $P(A\cap B) = P(A)P(B)$, $P(A\mid B) = P(A)$, $P(A\mid B^c) = P(A)$. If $A\subseteq B$, the events are neither mutually exclusive nor independent.

The precise statement needs positive probabilities: **if $P(A)>0$ and $P(B)>0$, disjoint events are never independent**, since $P(A\cap B) = 0 < P(A)P(B)$.

Intuition: disjoint events are strongly (negatively) *dependent*. Learning $B$ happened tells you for certain that $A$ did not. Independence means learning $B$ tells you *nothing*.

**The $A\subseteq B$ case.** With $0 < P(A)$ and $P(B) < 1$: $A\cap B = A\ne\emptyset$ (not exclusive) and $P(A\cap B) = P(A) > P(A)P(B)$ (positively correlated, not independent).

### Slide 54/73: Zero-probability events are independent of everything

> **On the slide.** Let $P(E) = 0$. For any $F$ we want $P(E\cap F) = 0$. $E\cap F\subseteq E$, so $P(E\cap F)\le P(E)$.

Completing it: $0\le P(E\cap F)\le P(E) = 0$, so $P(E\cap F) = 0 = P(E)P(F)$. Independent. $\square$

Similarly an event with $P(E) = 1$ is independent of everything (its complement has probability 0, then use slide 49). So an event can be **both disjoint from and independent of** another one, as long as one has probability 0. This is the loophole in slide 53.

### Slide 55/73: Conditional independence

> **On the slide.** $P(A\mid BC) = \frac{P(AB\mid C)}{P(B\mid C)}$, so $P(AB\mid C) = P(A\mid BC)P(B\mid C)$. $A$ and $B$ are conditionally independent given $C$ ($P(C)>0$) if $P(AB\mid C) = P(A\mid C)P(B\mid C)$. As a consequence $P(A\mid BC) = P(A\mid C)$. **HW:** verify whether $A$ and $B$ are conditionally independent given $C$ in the experiment of picking a number from $\{1,\dots,10\}$.

$$\boxed{P(A\cap B\mid C) = P(A\mid C)\,P(B\mid C)}$$

It is ordinary independence, but under the measure $P(\cdot\mid C)$. Equivalent form: once you know $C$, also learning $B$ does not change the probability of $A$.

**The identity on the slide.** $P(A\mid BC) = \frac{P(ABC)}{P(BC)} = \frac{P(ABC)/P(C)}{P(BC)/P(C)} = \frac{P(AB\mid C)}{P(B\mid C)}$. This is the chain rule inside the conditional world.

**HW.** With $A = \{1,\dots,6\}$, $B = \{1,\dots,7\}$, $C = \{2,4,6,8,10\}$ from slide 51:
$$P(A\mid C) = \frac{|\{2,4,6\}|}{5} = \frac35,\quad P(B\mid C) = \frac35,\quad P(AB\mid C) = \frac{|\{2,4,6\}|}{5} = \frac35 .$$
Since $\frac35\ne\frac9{25}$, $A$ and $B$ are **not** conditionally independent given $C$. This is not surprising: $A\subseteq B$, so given $C$, knowing $A$ guarantees $B$.

### Slide 56/73: Conditional independence example

> **On the slide.** Two coins, one fair and one fake (both sides heads). Choose a coin uniformly and toss it twice. $A$: first toss $H$, $P(A) = \frac34$. $B$: second toss $H$, $P(B) = \frac34$. $C$: coin 1 (the fair one) is chosen. $P(A\mid C) = P(B\mid C) = \frac12$ and $P(A\cap B\mid C) = \frac14$, so $A$ and $B$ are conditionally independent given $C$. **HW:** are $A$ and $B$ independent?

**Where $\frac34$ comes from** (total probability over the coin): $P(A) = \frac12\cdot\frac12 + \frac12\cdot1 = \frac34$.

**HW.** Again total probability:
$$P(A\cap B) = P(AB\mid C)P(C) + P(AB\mid C^c)P(C^c) = \tfrac14\cdot\tfrac12 + 1\cdot\tfrac12 = \tfrac58 .$$
But $P(A)P(B) = \frac9{16}$. Since $\frac58 = \frac{10}{16} > \frac9{16}$, $A$ and $B$ are **not independent** (they are positively correlated).

**Why.** The first toss is evidence about *which coin* you hold. A head on toss 1 raises the chance you have the fake coin from $\frac12$ to $P(C^c\mid A) = \frac{1/2}{3/4} = \frac23$, which in turn makes a head on toss 2 more likely: $P(B\mid A) = \frac{5/8}{3/4} = \frac56 > \frac34$. Given the coin, the tosses are independent. Without knowing the coin, they are linked through it.

**Takeaway.** Conditional independence does not imply independence, and independence does not imply conditional independence. (Example of the second: two independent fair coins, $A$ = first is $H$, $B$ = second is $H$, $C$ = "exactly one head". Then $P(AB\mid C) = 0$ but $P(A\mid C)P(B\mid C) = \frac14$.)

## Part B: extra worked examples and problems (conditional probability and independence)

**B1 (last year's HW 2 Q9; Bayes).** The alarm at a power plant goes off with probability 0.99 if something is wrong and 0.02 if nothing is wrong. Something is wrong on 1 day in 100. (a) $P(\text{alarm})$? (b) $P(\text{wrong}\mid\text{alarm})$?

*Solution.* $W$ = something wrong, $L$ = alarm. (a) $P(L) = 0.99(0.01) + 0.02(0.99) = 0.0099 + 0.0198 = \boxed{0.0297}$. (b) $P(W\mid L) = \frac{0.0099}{0.0297} = \boxed{\tfrac13}$.

**B2 (last year's Tutorial 2 Q3).** A disease affects 1 in 10,000. False positive rate 2%, false negative rate 1%. A random person tests positive. Probability they have the disease?

*Solution.* $P(D) = 10^{-4}$, $P(+\mid D) = 0.99$, $P(+\mid D^c) = 0.02$.
$$P(D\mid +) = \frac{0.99\times10^{-4}}{0.99\times10^{-4} + 0.02\times0.9999} = \frac{0.000099}{0.020097}\approx\boxed{0.0049}.$$
Under half a percent. Same lesson as the robot on slide 44.

**B3 (last year's HW 2 Q7).** The channel is good with probability 0.8. An error occurs with probability 0.1 if good and 0.3 if bad. Find $P(E)$ and $P(G\mid E^c)$.

*Solution.* Tree: $P(GE) = 0.08$, $P(GE^c) = 0.72$, $P(G^cE) = 0.06$, $P(G^cE^c) = 0.14$. So $P(E) = 0.08 + 0.06 = \boxed{0.14}$ and $P(G\mid E^c) = \frac{0.72}{0.86} = \frac{36}{43}\approx\boxed{0.837}$.

**B4 (last year's HW 2 Q4).** It rains with probability 0.3 and VC is crowded with probability 0.5. (a) Rain and crowding cannot happen together. You are late with probability 0.5 if it rains and 0.3 if crowded (and never otherwise). Find $P(\text{late})$. (b) Given late, which is more likely, rain or crowding? (c) Now rain and crowding are independent; you are late with probability 0.75 if both, 0.5 if rain only, 0.3 if crowded only. Find $P(\text{late})$.

*Solution.* (a) Partition: $R$, $C$, neither. $P(L) = 0.5(0.3) + 0.3(0.5) + 0 = \boxed{0.30}$. (b) $P(R\mid L) = \frac{0.15}{0.30} = 0.5$ and $P(C\mid L) = 0.5$: equally likely. (c) Partition into four cells: $P(RC) = 0.15$, $P(RC^c) = 0.15$, $P(R^cC) = 0.35$, $P(R^cC^c) = 0.35$:
$$P(L) = 0.75(0.15) + 0.5(0.15) + 0.3(0.35) + 0 = 0.1125 + 0.075 + 0.105 = \boxed{0.2925}.$$

**B5 (last year's HW 2 Q3; Bertsekas Problem 1.19).** Alice's paper is in drawer $j$ with probability $p_j$. If it is in drawer $i$ and she searches there, she finds it with probability $d_i$. She searches drawer $i$ and fails. Find the probability that the paper is in drawer $j$.

*Solution.* Let $F$ = "search of drawer $i$ fails". By total probability, $P(F) = p_i(1 - d_i) + (1 - p_i)\cdot1 = 1 - p_id_i$. Bayes:
$$P(\text{in }j\mid F) = \begin{cases}\dfrac{p_j}{1 - p_id_i}, & j\ne i,\\[3mm] \dfrac{p_i(1 - d_i)}{1 - p_id_i}, & j = i.\end{cases}$$
A failed search lowers belief in drawer $i$ and raises every other drawer by the same factor.

**B6 (last year's HW 2 Q2, the jerseys).** Bag 1 has $100 - k$ CSK and $k$ RCB jerseys; Bag 2 has $k$ CSK and $100 - k$ RCB. Bag 1 is chosen with probability $p$. $P(\text{RCB}) = 0.4$. (a) Find $p$. (b) Which $k$ are valid? (c) $k = 30$. (d) Given CSK, probability it came from Bag 1.

*Solution.* (a) $0.4 = p\frac{k}{100} + (1-p)\frac{100-k}{100}$, so $40 = (100 - k) - p(100 - 2k)$ and
$$p = \frac{60 - k}{100 - 2k}\qquad(k\ne50).$$
(b) Need $0\le p\le1$. If $k<50$ the denominator is positive: $p\le1\iff60 - k\le100 - 2k\iff k\le40$. If $k>50$ it is negative: $p\ge0\iff k\ge60$, and then $p\le1$ holds. Valid: $k\in\{0,\dots,40\}\cup\{60,\dots,100\}$. (c) $p = \frac{30}{40} = 0.75$. (d) $P(\text{CSK}) = 0.75(0.7) + 0.25(0.3) = 0.6$, so $P(\text{Bag 1}\mid\text{CSK}) = \frac{0.525}{0.6} = \boxed{0.875}$.

**B7 (last year's HW 2 Q10).** 56% have a retirement plan ($R$), 68% health insurance ($H$), 49% both. (a) Neither? (b) $P(H\mid R)$? (c) Independent? Mutually exclusive?

*Solution.* (a) $1 - (0.56 + 0.68 - 0.49) = 0.25$. (b) $\frac{0.49}{0.56} = 0.875$. (c) $P(R)P(H) = 0.3808\ne0.49$: not independent (positively correlated, $0.875 > 0.68$). Not exclusive either, since $P(RH) = 0.49 > 0$.

**B8 (last year's HW 2 Q11).** Independent projects, $P(A) = 0.4$, $P(B) = 0.7$. (a) $P(B^c\mid A^c)$. (b) At least one succeeds. (c) Only $A$ succeeds, given at least one does.

*Solution.* (a) Independence of complements: $P(B^c\mid A^c) = P(B^c) = 0.3$. (b) $1 - 0.6\cdot0.3 = 0.82$. (c) $P(AB^c) = 0.4\cdot0.3 = 0.12$, and $AB^c\subseteq$ "at least one", so the answer is $\frac{0.12}{0.82} = \frac6{41}$.

**B9 (last year's HW 2 Q12; reliability).** $C_1, C_2$ in parallel form $S_1$; $C_3, C_4$ in series form $S_2$; $S_1$ and $S_2$ are in parallel. Each component works independently with probability 0.9. $P(\text{system works})$?

*Solution.* $P(S_1) = 1 - 0.1^2 = 0.99$ and $P(S_2) = 0.9^2 = 0.81$. In parallel: $1 - (1 - 0.99)(1 - 0.81) = 1 - 0.01\cdot0.19 = \boxed{0.9981}$.
*Rule of thumb:* series multiplies **working** probabilities; parallel multiplies **failure** probabilities.

**B10 (last year's Tutorial 2 Q8).** Each wing has 2 engines, each failing independently with probability 0.2. The plane survives if each wing has at least one working engine. (a) $P(\text{survive})$. (b) Engines per wing needed for $P\ge0.99$. (c) Given survival, the probability all four engines are fine.

*Solution.* (a) A wing works with probability $1 - 0.2^2 = 0.96$, so $P = 0.96^2 = \boxed{0.9216}$. (b) With $n$ per wing: $(1 - 0.2^n)^2\ge0.99$. $n = 3$ gives $0.992^2 = 0.984$ (not enough); $n = 4$ gives $0.9984^2\approx0.9968$. So $\boxed{n = 4}$. (c) "All four fine" implies survival, so $P = \frac{0.8^4}{0.9216} = \frac{0.4096}{0.9216} = \boxed{\tfrac49}$.

**B11 (last year's Tutorial 2 Q5).** $P(T\ge t) = \frac5{4+t}$ for $t\ge1$, where $T$ is the toss of the first win. After 4 tosses without a win, what is the probability of winning on toss 5?

*Solution.* "4 tosses without winning" is $\{T\ge5\}$. We want
$$P(T = 5\mid T\ge5) = \frac{P(T\ge5) - P(T\ge6)}{P(T\ge5)} = 1 - \frac{5/10}{5/9} = 1 - \frac9{10} = \boxed{0.1}.$$

**B12 (last year's Tutorial 2 Q6).** A and B alternately roll two dice, A first. A wins on a sum of 6, B on a sum of 7. $P(\text{A wins})$?

*Solution.* $a = P(\text{sum }6) = \frac5{36}$, $b = P(\text{sum }7) = \frac6{36}$. A round (A then B) ends without a winner with probability $(1-a)(1-b)$. Condition on the first round (or sum a geometric series):
$$P(\text{A}) = a + (1-a)(1-b)P(\text{A})\ \Longrightarrow\ P(\text{A}) = \frac{a}{1 - (1-a)(1-b)} = \frac{5/36}{1 - \frac{31}{36}\cdot\frac{30}{36}} = \frac{180}{366} = \boxed{\tfrac{30}{61}}\approx0.492 .$$
Going first almost compensates for B's better target.


# Lecture 3, part 3: Counting (Deck 1, slides 57 to 72)

**Big picture.** When all outcomes are equally likely, $P(A) = \frac{|A|}{|\Omega|}$, so probability becomes counting. Everything rests on one principle (multiply the number of choices at each stage) and one correction (divide out the orderings you do not want to distinguish). The slides organise sampling problems into a $2\times2$ grid: **ordered or not**, **with or without replacement**. Memorise the grid and how to decide which cell a problem is in.

## Part A: the slides

### Slide 57/73: The first principle of counting

> **On the slide.** (A picture: the basic counting principle.)

**Multiplication principle.** If an object is built in $r$ stages, with $n_1$ choices at stage 1, and then (whatever happened before) $n_2$ choices at stage 2, ..., $n_r$ at stage $r$, the number of objects is
$$\boxed{n_1\,n_2\cdots n_r}$$
The *number* of choices at a stage must not depend on earlier choices, although *which* choices are available may. Example: a 3-letter "word" with distinct letters has $26\cdot25\cdot24$ forms. The second letter's options depend on the first, but there are always 25 of them.

### Slide 58/73: Permutations and combinations

> **On the slide.** $n$ objects can be arranged in $n!$ ways. Distinct pairs from $n$ objects: $\binom n2 = \frac{n!}{(n-2)!\,2!}$. In general $\binom nk = \frac{n!}{(n-k)!\,k!}$ combinations of $k$ objects; order within a group is immaterial. *What if we also count the ordering?* ${}^nP_k = {}^nC_k\times k!$.

$$\boxed{{}^nP_k = \frac{n!}{(n-k)!} = n(n-1)\cdots(n-k+1),\qquad \binom nk = \frac{{}^nP_k}{k!} = \frac{n!}{k!\,(n-k)!}}$$

**Why divide by $k!$.** Count ordered selections in two stages: first choose *which* $k$ objects ($\binom nk$ ways), then *order* them ($k!$ ways). So ${}^nP_k = \binom nk\,k!$. This "count it two ways" trick is behind almost every formula below.

### Slide 59/73: Experiments with sampling

> **On the slide.** Sampling = choosing elements from a set; uniformly at random means all items equally likely. With or without replacement; ordered ($(a,b,c)\ne(c,b,a)$) or unordered. Four combinations.

Choosing $k$ from $n$ distinct objects:

| | **Ordered** | **Unordered** |
|---|---|---|
| **With replacement** | $n^k$ | $\binom{n+k-1}{k}$ |
| **Without replacement** | ${}^nP_k = \frac{n!}{(n-k)!}$ | $\binom nk$ |

**How to decide.** *Replacement:* can the same object appear twice (a digit in a PIN, a die face)? *Order:* would swapping two positions give a different outcome (first and second prize, a password) or the same one (a committee, a hand of cards)?

**A warning for probability.** In the three cells $n^k$, ${}^nP_k$ and $\binom nk$, uniform sampling makes all the counted outcomes equally likely. In the "unordered with replacement" cell it does **not**. Two dice give the unordered outcome $\{1,2\}$ in 2 ways but $\{1,1\}$ in only 1 way. So for probabilities with replacement, **always count ordered outcomes**.

### Slide 60/73: Ordered sampling with replacement

> **On the slide.** Repetition allowed and order matters. *How many ways: a) $n^k$, b) $\binom nk$, c) $k^n$, d) ${}^nk$?* There are $k$ positions and $n$ choices for each. Total $n^k$.

Multiplication principle with $n$ choices at each of $k$ stages: $\boxed{n^k}$. Examples: $6^k$ outcomes for $k$ dice; $10^4$ four-digit PINs; $2^n$ binary strings of length $n$. The tempting wrong answer $k^n$ swaps the roles: it counts functions from the $n$ objects to the $k$ positions.

### Slide 61/73: Ordered sampling without replacement

> **On the slide.** No repetition, order matters. Position $i$ has $n - i + 1$ choices. Total $n(n-1)\cdots(n-k+1) = \frac{n!}{(n-k)!} = {}^nP_k$.

Example: first, second and third prize among 20 people: $20\cdot19\cdot18 = 6840$ (last year's HW 1 Q5). With $k = n$ this is $n!$, the number of arrangements of all $n$.

### Slide 62/73: Unordered sampling without replacement

> **On the slide.** No repetition, order does not matter. We count distinct $k$-sized subsets: $\binom nk$.

Example: a team of 4 from 15 students: $\binom{15}4 = 1365$ (last year's HW 1 Q2 and Tutorial 1 Q1). A poker hand: $\binom{52}5 = 2{,}598{,}960$.

### Slide 63/73: Unordered sampling with replacement

> **On the slide.** Repetition allowed, order does not matter. Object $i$ can appear up to $k$ times. Let $x_i$ = number of times object $i$ is chosen. Every sample satisfies $\sum_{i=1}^nx_i = k$, so count the solutions of this equation. Answer $\binom{n+k-1}k$ (think: HW).

**HW: why $\binom{n+k-1}{k}$ (stars and bars).** An unordered sample with replacement is determined by the counts $(x_1,\dots,x_n)$ with $x_i\ge0$ and $\sum x_i = k$. Encode it as a row of $k$ stars and $n-1$ bars: $x_1$ stars, a bar, $x_2$ stars, a bar, ..., $x_n$ stars. For $n = 4$, $k = 5$:
$$\star\star\,|\,\,|\,\star\,|\,\star\star\quad\longleftrightarrow\quad(x_1,x_2,x_3,x_4) = (2,0,1,2).$$
Each solution gives exactly one such row and each row gives one solution. A row is $n + k - 1$ symbols, and choosing which $k$ of them are stars decides it:
$$\#\text{solutions} = \binom{n+k-1}{k} = \binom{n+k-1}{n-1}.$$
Example: 3 scoops of ice cream from 5 flavours (repeats allowed, order irrelevant): $\binom{7}{3} = 35$. Slides 69 and 70 redo this argument.

### Slide 64/73: Example 1, licence plates

> **On the slide.** 7-place plates, first 3 letters, last 4 digits: $26^3\cdot10^4$. *What if letters and digits may not repeat?*

With repetition: $26^3\cdot10^4 = 175{,}760{,}000$. Without repetition (ordered, no replacement in each block):
$$26\cdot25\cdot24\cdot10\cdot9\cdot8\cdot7 = 15{,}600\cdot5{,}040 = 78{,}624{,}000 .$$

### Slide 65/73: Example 2, binary functions

> **On the slide.** How many functions on $n$ points take values in $\{0,1\}$? $2^n$.

Each of the $n$ points independently gets a value 0 or 1: ordered sampling with replacement from $\{0,1\}$. It is the same count as subsets of an $n$-set (the points where the function is 1), which is why the power set is written $2^\Omega$ (Lecture 1, slide 16).

### Slide 66/73: Example 3, arrangements of PEPPER

> **On the slide.** If the P's and E's were distinguishable ($P_1P_2P_3E_1E_2R$) there would be $6!$ arrangements. Each indistinguishable arrangement (such as PPPREE) corresponds to $3!\times2!$ distinguished ones. So the count is $\frac{6!}{3!\,2!\,1!}$.

$$\frac{6!}{3!\,2!\,1!} = \frac{720}{12} = 60 .$$
The principle: **overcount, then divide by the number of times each object was counted**. This only works when every object is overcounted by the same factor (here $3!\,2!$ for every word).

### Slide 67/73: Example 4, multinomial coefficients

> **On the slide.** Permutations of $n$ objects, $n_1$ alike, $n_2$ alike, ..., $n_r$ alike: $\frac{n!}{n_1!\,n_2!\cdots n_r!}$ with $\sum n_i = n$. For $r = 2$ this is $\binom n{n_1}$. Dividing $n$ distinct items into $r$ groups of sizes $n_1,\dots,n_r$: $\binom n{n_1}\binom{n - n_1}{n_2}\cdots\binom{n - n_1 - \dots - n_{r-1}}{n_r}$, which equals the same $\frac{n!}{n_1!\cdots n_r!}$.

$$\boxed{\binom{n}{n_1, n_2, \dots, n_r} = \frac{n!}{n_1!\,n_2!\cdots n_r!}}$$

**Why the product of binomials telescopes.** Choose group 1, then group 2 from what is left, and so on:
$$\frac{n!}{n_1!\,(n - n_1)!}\cdot\frac{(n - n_1)!}{n_2!\,(n - n_1 - n_2)!}\cdots = \frac{n!}{n_1!\,n_2!\cdots n_r!}.$$
**Two problems, one answer.** "Arrange letters with repeats" and "split people into labelled groups" are the same problem: assigning each of $n$ positions (people) a letter (group label) with prescribed counts.

**Labelled vs unlabelled groups.** If the groups have no names and equal sizes, divide by the number of ways to permute the groups. Splitting 6 people into three *unnamed* pairs: $\frac{6!}{2!\,2!\,2!\,3!} = 15$.

### Slide 68/73: Example 5, balls in bins with no bin empty

> **On the slide.** $n$ identical red balls into $r$ bins with no bin empty: count solutions of $\sum_{i=1}^rx_i = n$ with $x_i>0$. Arrange the $n$ balls in a line. There are $n - 1$ gaps, and we place $r - 1$ sticks in distinct gaps (two sticks in one gap would make an empty bin). Choose $r - 1$ of $n - 1$ gaps: $\binom{n-1}{r-1}$.

$$\#\{x_i\ge1,\ x_1 + \dots + x_r = n\} = \boxed{\binom{n-1}{r-1}}$$
Example: 10 identical sweets to 4 children, each getting at least one: $\binom93 = 84$.

### Slides 69/73 and 70/73: Example 6, bins may be empty

> **On the slides.** Now count solutions of $\sum_{i=1}^rx_i = n$ with $0\le x_i\le n$. Substitute $y_i = x_i + 1$: then $\sum y_i = n + r$ with $y_i\ge1$, and Example 5 gives $\binom{n+r-1}{r-1}$. Alternative: write each $x_i$ as that many vertical lines and separate bins by $r-1$ plus signs; that is $n + r - 1$ symbols, $n$ alike and $r - 1$ alike, so $\frac{(n + r - 1)!}{n!\,(r-1)!} = \binom{n+r-1}{r-1}$.

$$\#\{x_i\ge0,\ x_1 + \dots + x_r = n\} = \boxed{\binom{n+r-1}{r-1}}$$

(The slide writes the new constraint as "$0 < y_i < n$". The correct range is $1\le y_i\le n + 1$; only $y_i\ge1$ matters for the count.)

This is slide 63 again with $n$ balls ↔ $k$ samples and $r$ bins ↔ $n$ objects. Example: 10 identical sweets to 4 children, any number each: $\binom{13}{3} = 286$.

### Slide 71/73: Example 7, coin tosses

> **On the slide.** Toss a biased coin ($P(H) = p$) $n$ times. $P(k\text{ heads}) = \binom nkp^k(1-p)^{n-k}$. Convention $0^0 = 1$ (for $p = 1$, $k = n$). *Probability that the first head is on toss $r\le n$?* $(1-p)^{r-1}p$.

**Why $\binom nkp^k(1-p)^{n-k}$.** Any *particular* sequence with $k$ heads and $n-k$ tails has probability $p^k(1-p)^{n-k}$ (independent tosses multiply). There are $\binom nk$ such sequences (choose which positions are heads). They are disjoint, so add. This is the **binomial** PMF of Lecture 6.

**The $0^0$ convention.** With $p = 1$ and $k = n$ the formula reads $\binom nn1^n0^0$, which must equal 1 (all heads is certain). Defining $0^0 = 1$ makes the formula valid for all $p\in[0,1]$.

**First head on toss $r$** means $r-1$ tails then a head: $(1-p)^{r-1}p$. This is the **geometric** PMF of Lecture 6. It does not depend on $n$ as long as $r\le n$.

### Slide 72/73: Example 8, dice

> **On the slide.** Roll a die $n$ times ($n$ even). $P(\text{half show 1, half show 6}) = \binom n{n/2}\big(\frac16\big)^n$. $P(n_1\text{ show 1 and }n_2\text{ show 6}) = \frac{n!}{n_1!\,n_2!\,(n - n_1 - n_2)!}\big(\frac16\big)^{n_1}\big(\frac16\big)^{n_2}\big(\frac46\big)^{n - n_1 - n_2}$.

**First part.** Choose which $n/2$ rolls are 1s ($\binom n{n/2}$ ways; the rest are 6s). Each such sequence has probability $(\frac16)^n$.

**Second part: the multinomial probability.** Sort each roll into three categories: "1" (probability $\frac16$), "6" ($\frac16$), "other" ($\frac46$). A particular sequence with $n_1$, $n_2$, $n_3 = n - n_1 - n_2$ in the categories has probability $(\frac16)^{n_1}(\frac16)^{n_2}(\frac46)^{n_3}$, and the number of such sequences is the multinomial coefficient (slide 67). In general:
$$P(n_1,\dots,n_r) = \frac{n!}{n_1!\cdots n_r!}\,p_1^{n_1}\cdots p_r^{n_r}.$$
With $r = 2$ categories this is the binomial formula.

## Part B: extra worked examples and problems (counting)

**B1 (last year's HW 1 Q1 to Q5, quick fire).** (Q1) Two distinct posts among 8 candidates: ${}^8P_2 = 56$. (Q2) 4 from 15: $\binom{15}4 = 1365$. (Q3) 3 of 12 distinct prizes to 1st, 2nd, 3rd: $12\cdot11\cdot10 = 1320$. (Q4) $5\cdot3\cdot4 = 60$ meals. (Q5) President, VP, secretary from 20: $20\cdot19\cdot18 = 6840$.

**B2 (last year's HW 1 Q8).** 10 white and 3 black balls are drawn one by one without replacement until all 3 blacks are out. Probability the last black is drawn 7th?

*Solution.* All $\binom{13}3 = 286$ sets of positions for the black balls are equally likely (symmetry: a random order of the balls). "Last black at position 7" means one black at 7 and the other two among positions 1 to 6: $\binom62 = 15$ ways. Answer $\frac{15}{286}$.

**B3 (last year's HW 1 Q7).** Evaluate $\sum_{r=1}^{15}r^2\binom{15}r\big/\binom{15}{r-1}$.

*Solution.* $\binom{15}r\big/\binom{15}{r-1} = \frac{(r-1)!\,(16 - r)!}{r!\,(15 - r)!} = \frac{16 - r}r$. So the term is $r(16 - r)$ and the sum is $16\sum r - \sum r^2 = 16\cdot120 - 1240 = \boxed{680}$.

**B4 (last year's HW 1 Q6, derangements).** Cards 1 to 6 go into envelopes 1 to 6, no card in its own envelope, and card 1 is in envelope 2. How many ways?

*Solution.* First count all derangements of 6 with inclusion–exclusion. Let $A_i$ = card $i$ in envelope $i$; $|A_{i_1}\cap\dots\cap A_{i_k}| = (6-k)!$:
$$D_6 = \sum_{k=0}^6(-1)^k\binom6k(6-k)! = 6!\sum_{k=0}^6\frac{(-1)^k}{k!} = 720 - 720 + 360 - 120 + 30 - 6 + 1 = 265 .$$
By symmetry card 1 is equally likely to be in each of envelopes 2 to 6, so the answer is $\frac{265}5 = \boxed{53}$.
*Related:* the probability that a random permutation has no fixed point is $\sum_{k=0}^n\frac{(-1)^k}{k!}\to e^{-1}\approx0.368$. That is the umbrella problem, last year's HW 3 Q3 (Lecture 6, Part B).

**B5 (last year's Tutorial 1 Q2, pigeonhole).** A drawer has 100 red, 80 green, 60 blue and 40 black socks. Minimum number drawn (in the dark) to guarantee at least 10 pairs?

*Solution.* With $s$ socks the number of pairs is $\frac{s - u}2$, where $u$ is the number of colours with an odd count. Since $u\le4$, the worst case leaves 4 unpaired socks. Need $\frac{s - u}2\ge10$ in the worst case. $s = 22$ fails (counts like $5,5,5,7$ give $u = 4$ and only 9 pairs). For $s = 23$ (odd), $u$ is odd so $u\le3$, giving at least $\frac{23-3}2 = 10$ pairs. Answer $\boxed{23}$.

**B6 (Bertsekas Problem 1.53).** 90 students, including Joe and Jane, are split at random into three classes of 30. Probability Joe and Jane are in the same class?

*Solution.* Put Joe somewhere. Jane is equally likely to be in any of the remaining 89 seats, 29 of which are in Joe's class: $\frac{29}{89}$. (A full count gives the same thing, but the "fix one person" trick is far quicker.)

**B7 (Bertsekas Problem 1.17).** A batch of 100 items has 5 defective. Testing 4 at random, the batch is accepted if none is defective. $P(\text{accept})$?

*Solution.* Unordered, without replacement: $\frac{\binom{95}4}{\binom{100}4} = \frac{95\cdot94\cdot93\cdot92}{100\cdot99\cdot98\cdot97}\approx0.812$. (Sequential view: $\frac{95}{100}\cdot\frac{94}{99}\cdot\frac{93}{98}\cdot\frac{92}{97}$, the chain rule. Same number.)

**B8 (Bertsekas Problem 1.50, the birthday problem).** $n$ people, 365 equally likely birthdays. Probability all birthdays differ?

*Solution.* Ordered with replacement for $\Omega$ ($365^n$); ordered without replacement for the event ($365\cdot364\cdots(365 - n + 1)$):
$$P(\text{all distinct}) = \frac{365\cdot364\cdots(365 - n + 1)}{365^n} = \prod_{i=0}^{n-1}\Big(1 - \frac i{365}\Big).$$
For $n = 23$, $P(\text{some shared birthday}) = 1 - 0.4927\approx0.507$. For $n = 10$ it is $0.117$.

**B9 (last year's Tutorial 1 Q3: geometric probability).** Two friends arrive independently and uniformly between 5 and 6 pm; whoever arrives first waits 15 minutes. Probability they meet?

*Solution.* In hours after 5 pm, $(X,Y)$ is uniform on the unit square (Lecture 1, slide 15), so probability = area. They meet iff $|X - Y|\le\frac14$. The complement is two corner triangles with legs $\frac34$, total area $2\cdot\frac12\cdot\left(\frac34\right)^2 = \frac9{16}$. So $P = 1 - \frac9{16} = \boxed{\tfrac7{16}}$.


# Lecture 4: Random variables as measurable functions (Deck 2, slides 1 to 8)

**Big picture.** Outcomes $\omega$ are often awkward objects: a sequence of ten die rolls, a pair of cards. What we care about is usually a **number** computed from the outcome: the number of sixes, the sum, the waiting time. A **random variable** is that number, viewed as a function $X:\Omega\to\mathbb R$. It carries the probability from $(\Omega,\mathcal F,P)$ over to the real line, where it becomes the **induced measure** $P_X$ (the distribution of $X$). The only technical condition, **measurability**, makes sure that "$X\in B$" is an event we are allowed to ask about.

## Part A: the slides

### Slide 1/31 and 2/31: Motivation

> **On the slides.** Given $(\Omega,\mathcal F,P)$, it is sometimes hard to work with $\omega$ directly (roll a die ten times: each $\omega$ is a sequence of numbers). We may care about functions of outcomes (the number of 6s in 10 rolls). It is convenient to work in a new, simpler space. A random variable maps $(\Omega,\mathcal F,P)$ to a simpler $(\Omega',\mathcal F',P_X)$. $P_X$ is the induced probability measure on $\Omega'$.

**The ten-roll example in numbers.** $\Omega = \{1,\dots,6\}^{10}$ has $6^{10}\approx60$ million outcomes. Let $X(\omega)$ = number of 6s in $\omega$. Then $\Omega' = \{0,1,\dots,10\}$, just 11 values, and
$$P_X(\{k\}) = P(\{\omega : X(\omega) = k\}) = \binom{10}k\Big(\frac16\Big)^k\Big(\frac56\Big)^{10-k}$$
(Lecture 3, slide 71). We have traded a huge space for a small one without losing anything we care about.

**"Random variable" is a misleading name.** $X$ is neither random nor a variable. It is a fixed, deterministic function. The randomness is in $\omega$; $X$ just reports a number about it.

### Slide 3/31: Random variable as a measurable function

> **On the slide.** A random variable is a function $X:\Omega\to\Omega'$ that transforms $(\Omega,\mathcal F,P)$ into $(\Omega',\mathcal F',P_X)$ and is $(\mathcal F,\mathcal F')$-measurable. $X(\omega)\in\Omega'$ for all $\omega$. For $B\in\mathcal F'$, the pre-image is $X^{-1}(B) := \{\omega\in\Omega : X(\omega)\in B\}$. Measurability: for every $B\in\mathcal F'$, $X^{-1}(B)\in\mathcal F$.

**Pre-image, not inverse.** $X^{-1}(B)$ is a **set** of outcomes, "all $\omega$ that $X$ sends into $B$". It exists for every function, invertible or not. Example: two dice, $X$ = sum, $B = \{3\}$: $X^{-1}(\{3\}) = \{(1,2),(2,1)\}$.

**What measurability buys.** The event "$X\in B$" is literally the set $X^{-1}(B)$. If that set were not in $\mathcal F$, $P$ could not measure it, and "$P(X\in B)$" would be meaningless. Measurability guarantees that every question about $X$ you might ask (with $B\in\mathcal F'$) is a legitimate event.

**Pre-images respect set operations** (a fact used silently all the time):
$$X^{-1}(B^c) = \big(X^{-1}(B)\big)^c,\qquad X^{-1}\Big(\bigcup_iB_i\Big) = \bigcup_iX^{-1}(B_i),\qquad X^{-1}\Big(\bigcap_iB_i\Big) = \bigcap_iX^{-1}(B_i).$$
Disjoint $B_i$ have disjoint pre-images (an $\omega$ cannot be sent to two places).

### Slide 4/31: The induced measure

> **On the slide.** Since $X^{-1}(B)\in\mathcal F$, it can be measured with $P$. *What is $P_X(B)$?* $P_X(B) := P(X^{-1}(B))$ for all $B\in\mathcal F'$: the induced probability measure. *What if no $\omega$ has $X(\omega)\in B$?*

$$\boxed{P_X(B) = P\big(X^{-1}(B)\big) = P(\{\omega : X(\omega)\in B\}) = P(X\in B)}$$

**$P_X$ really is a probability measure** on $(\Omega',\mathcal F')$:

- $P_X(\Omega') = P(X^{-1}(\Omega')) = P(\Omega) = 1$, since every $\omega$ is sent somewhere in $\Omega'$.
- For disjoint $B_i$: $P_X(\bigcup B_i) = P(\bigcup X^{-1}(B_i)) = \sum P(X^{-1}(B_i)) = \sum P_X(B_i)$, by the facts above and countable additivity of $P$.

**The question on the slide.** If no $\omega$ maps into $B$, then $X^{-1}(B) = \emptyset$ and $P_X(B) = P(\emptyset) = 0$. For example, the sum of two dice is never 13, so $P_X(\{13\}) = 0$. That is why we can safely take $\Omega' = \mathbb R$ even when $X$ only takes a few values: the extra points get probability 0.

### Slides 5/31 and 6/31: Convention, $\Omega' = \mathbb R$ with the Borel σ-algebra

> **On the slides.** Most books take $\Omega' = \mathbb R$, so $\mathcal F' = \mathcal B(\mathbb R)$. Recall $\mathcal B(\mathbb R)$: generated by open intervals; contains $[a,b]$, $[a,b)$, $(a,\infty)$, $[a,\infty)$, $(-\infty,b]$, $(-\infty,b)$, $\{a\}$.

With this convention the questions we may ask about $X$ are "is $X$ in this Borel set?": in an interval, equal to a point, in a countable union of intervals, and so on.

**A practical test for measurability.** Since $\mathcal B(\mathbb R)$ is generated by half-lines (Lecture 2, Part B5), it is enough to check that
$$\{\omega : X(\omega)\le x\}\in\mathcal F\quad\text{for every }x\in\mathbb R .$$
These are exactly the events in the CDF $F_X(x) = P(X\le x)$ (Lecture 7). For finite $\Omega$ with $\mathcal F = 2^\Omega$, every function is measurable, so the condition never bites in discrete problems.

**An example where it bites.** $\Omega = \{1,2,3\}$, $\mathcal F = \{\emptyset,\{1\},\{2,3\},\Omega\}$, and $X(\omega) = \omega$. Then $\{X\le2\} = \{1,2\}\notin\mathcal F$, so $X$ is **not** a random variable on this space. The information in $\mathcal F$ cannot tell 2 from 3, so it cannot "see" $X$. By contrast, $Y = \mathbf 1\{\omega = 1\}$ is measurable: its pre-images are $\emptyset$, $\{1\}$, $\{2,3\}$ and $\Omega$.

### Slide 7/31: The picture

> **On the slide.** Diagram: $X$ maps $\Omega$ to $\mathbb R$; a Borel set $B$ pulls back to $X^{-1}(B)\in\mathcal F$. $\Omega\xrightarrow{X}\mathbb R$, $\mathcal F\xrightarrow{X}\mathcal B(\mathbb R)$, $P(\cdot)\xrightarrow{X}P_X(\cdot)$. Care is needed: the events you consider in $\mathcal B(\mathbb R)$ must pull back to valid events in $\mathcal F$. $X^{-1}(B)$ is the pre-image or inverse image of $B$.

Read the picture **right to left**: a question about $X$ (a set $B$ on the real line) is translated into a question about outcomes ($X^{-1}(B)$), which $P$ answers.

### Slide 8/31: The definition

> **On the slide.** A random variable is a map $X : (\Omega,\mathcal F,P)\to(\mathbb R,\mathcal B(\mathbb R),P_X)$ such that for each $B\in\mathcal B(\mathbb R)$, $X^{-1}(B) = \{\omega : X(\omega)\in B\}\in\mathcal F$ and $P_X(B) = P(\omega\in\Omega : X(\omega)\in B)$.

$$\boxed{X:\Omega\to\mathbb R\ \text{ with }\ X^{-1}(B)\in\mathcal F\ \ \forall B\in\mathcal B(\mathbb R);\qquad P_X(B) = P(X^{-1}(B))}$$

This is the definition last year's Quiz 1 Q3 asked for, together with the Borel σ-algebra and "all relationships between $P$, $P_X$ and $F_X$". A model answer:

- $P$ lives on $(\Omega,\mathcal F)$ and measures events about outcomes.
- $P_X$ lives on $(\mathbb R,\mathcal B(\mathbb R))$ and is defined by $P_X(B) = P(X^{-1}(B))$.
- $F_X(x) = P_X((-\infty,x]) = P(\{\omega : X(\omega)\le x\})$ is $P_X$ evaluated on half-lines. Because half-lines generate $\mathcal B(\mathbb R)$, $F_X$ determines $P_X$ completely.
- Discrete: $p_X(x) = P_X(\{x\})$ and $F_X(x) = \sum_{u\le x}p_X(u)$. Continuous: $F_X(x) = \int_{-\infty}^xf_X(u)\,du$ and $P_X(B) = \int_Bf_X(u)\,du$.

**Notation from here on.** We write $P(X\in B)$, $P(X = x)$, $P(X\le x)$, all shorthand for $P$ of the pre-image. Most of the time we forget $\Omega$ altogether and work only with $P_X$ (Deck 2, slide 24 says exactly this).

## Part B: extra worked examples and problems

**B1 (pre-images by hand).** Two dice, $X$ = sum, $Y$ = maximum. Write out $X^{-1}(\{4\})$, $Y^{-1}(\{2\})$ and $\{X = 4\}\cap\{Y = 2\}$, and find their probabilities.

*Solution.* $X^{-1}(\{4\}) = \{(1,3),(2,2),(3,1)\}$, probability $\frac3{36}$. $Y^{-1}(\{2\}) = \{(1,2),(2,1),(2,2)\}$, probability $\frac3{36}$. Intersection $\{(2,2)\}$, probability $\frac1{36}$. So $P(X = 4, Y = 2) = \frac1{36}\ne\frac3{36}\cdot\frac3{36}$: these events are not independent.

**B2 (an induced measure on a continuous space).** Pick $\omega$ uniformly from $\Omega = [0,1]$ and let $X(\omega) = 2\omega + 1$. Find $P_X([2, 2.5])$ and $P_X(\{x : x > 2.9\})$.

*Solution.* $X^{-1}([2,2.5]) = \{\omega : 2\le2\omega + 1\le2.5\} = [0.5, 0.75]$, so $P_X([2,2.5]) = 0.25$. $X^{-1}((2.9,\infty)) = (0.95, 1]$, probability $0.05$. In general $P_X$ is uniform on $[1,3]$ with "probability = length/2". Lecture 8 does this kind of computation systematically.


**B3 (which functions are random variables?).** $\Omega = \{a,b,c,d\}$ with $\mathcal F = \{\emptyset,\{a,b\},\{c,d\},\Omega\}$. Let $X(a) = X(b) = 1$, $X(c) = X(d) = 2$, and $Y(a) = 1$, $Y(b) = 2$, $Y(c) = Y(d) = 3$. Which of $X$ and $Y$ are random variables on $(\Omega,\mathcal F)$?

*Solution.* Check the half-lines $\{\le x\}$ (slide 6).

For $X$: $\{X\le x\}$ is $\emptyset$ for $x<1$, $\{a,b\}$ for $1\le x<2$, and $\Omega$ for $x\ge2$. All are in $\mathcal F$, so **$X$ is a random variable**.

For $Y$: $\{Y\le1\} = \{a\}\notin\mathcal F$, so **$Y$ is not**.

The general rule here: a function is measurable with respect to this $\mathcal F$ exactly when it is constant on $\{a,b\}$ and constant on $\{c,d\}$. $\mathcal F$ cannot tell $a$ from $b$, so no random variable can either.

**B4 (the σ-algebra a random variable generates).** Roll one die, $\Omega = \{1,\dots,6\}$. (a) Let $X(\omega) = 1$ if $\omega$ is odd and $0$ if it is even. List $\sigma(X) = \{X^{-1}(B) : B\in\mathcal B(\mathbb R)\}$. (b) Let $Y(\omega) = 2$ for $\omega\in\{1,2\}$, $1$ for $\omega\in\{3,4\}$ and $0$ for $\omega\in\{5,6\}$. How many sets are in $\sigma(Y)$?

*Solution.* A pre-image only depends on which values of $X$ lie in $B$.

(a) $X$ takes the values 0 and 1, so $X^{-1}(B)$ is one of $\emptyset$ (neither in $B$), $\{2,4,6\}$ (only 0), $\{1,3,5\}$ (only 1) or $\Omega$ (both). So
$$\sigma(X) = \{\emptyset,\ \{1,3,5\},\ \{2,4,6\},\ \Omega\}.$$
(b) $Y$ splits $\Omega$ into three blocks, $\{1,2\}$, $\{3,4\}$ and $\{5,6\}$. Each pre-image is a union of some of the blocks, and every union occurs, so $\sigma(Y)$ has $2^3 = \boxed{8}$ sets. $\sigma(Y)$ is the smallest σ-algebra on which $Y$ is a random variable. It holds exactly the information "which value did $Y$ take".

**B5 (functions of a random variable).** Let $X$ be a random variable and $a, b$ constants. Show that $aX + b$ is a random variable.

*Solution.* Check $\{aX + b\le x\}\in\mathcal F$ for every $x$.

- If $a>0$: $\{aX + b\le x\} = \{X\le\frac{x-b}a\}\in\mathcal F$.
- If $a<0$: dividing flips the inequality, so $\{aX + b\le x\} = \{X\ge c\}$ with $c = \frac{x-b}a$. This is the complement of $\{X<c\}$, and $\{X<c\} = \bigcup_{n\ge1}\{X\le c - \frac1n\}$ is a countable union of events. So $\{X\ge c\}\in\mathcal F$.
- If $a = 0$: $aX + b = b$ is constant, and $\{b\le x\}$ is either $\emptyset$ or $\Omega$.

In all three cases the set is in $\mathcal F$. The same idea (write the event using $\{X\le\cdot\}$ and countable set operations) shows that $X^2$, $|X|$ and $\mathbf 1\{X>c\}$ are random variables too.

**B6 (pre-images behave, images don't).** (a) Prove $X^{-1}(B^c) = \big(X^{-1}(B)\big)^c$. (b) Give an example where the forward image fails: $X(A\cap C)\ne X(A)\cap X(C)$.

*Solution.* (a) $\omega\in X^{-1}(B^c)\iff X(\omega)\in B^c\iff X(\omega)\notin B\iff\omega\notin X^{-1}(B)\iff\omega\in\big(X^{-1}(B)\big)^c$.

(b) Take $\Omega = \{1,2\}$, $X(1) = X(2) = 0$, $A = \{1\}$ and $C = \{2\}$. Then $X(A\cap C) = X(\emptyset) = \emptyset$, but $X(A)\cap X(C) = \{0\}\cap\{0\} = \{0\}$.

This is why the definition of a random variable uses **pre-images**. They respect complements, unions and intersections even when $X$ is many-to-one, so $P_X$ inherits the axioms from $P$ (slide 4).

**B7 (an induced measure you can draw).** Pick $\omega$ uniformly from $\Omega = [0,1]$ and let $X(\omega) = \omega^2$. Find $P_X([0,\frac14])$, the CDF $F_X(x)$, and $P_X(\{\frac12\})$.

*Solution.* For $0\le x\le1$, $X^{-1}([0,x]) = \{\omega : \omega^2\le x\} = [0,\sqrt x]$, which has length $\sqrt x$. So
$$P_X\big([0,\tfrac14]\big) = \sqrt{\tfrac14} = \boxed{\tfrac12},\qquad F_X(x) = \begin{cases}0 & x<0\\ \sqrt x & 0\le x\le1\\ 1 & x>1.\end{cases}$$
$X^{-1}(\{\frac12\}) = \{\frac1{\sqrt2}\}$, a single point, so $P_X(\{\frac12\}) = 0$. Note that $X$ is **not** uniform: half its probability sits in $[0,\frac14]$, because squaring squeezes small numbers together.

**B8 (building an exponential from a uniform).** Pick $\omega$ uniformly from $(0,1]$ and let $X(\omega) = -\ln\omega$. Find $P(X>t)$ for $t\ge0$.

*Solution.* Translate the event into a set of $\omega$'s. $-\ln$ is decreasing, so
$$\{X>t\} = \{\omega : -\ln\omega>t\} = \{\omega : \omega<e^{-t}\} = (0, e^{-t}),$$
an interval of length $e^{-t}$. So
$$P(X>t) = e^{-t},\quad t\ge0,$$
and $X\sim$ Exponential(1). This is the inverse transform method: a deterministic function of one uniform can produce any distribution.

**B9 (same information, different values).** Toss a fair coin three times. Let $X$ = number of heads and $Y$ = (number of heads) − (number of tails). Find the distribution $P_Y$, and decide whether $\sigma(X) = \sigma(Y)$.

*Solution.* The number of tails is $3 - X$, so $Y = X - (3 - X) = 2X - 3$. $X$ is Binomial$(3,\frac12)$, so

| $y$ | $-3$ | $-1$ | $1$ | $3$ |
|---|---|---|---|---|
| $P_Y(\{y\})$ | $\tfrac18$ | $\tfrac38$ | $\tfrac38$ | $\tfrac18$ |

$y\mapsto\frac{y+3}2$ undoes the map, so $\{Y = y\} = \{X = \frac{y+3}2\}$. The two variables have the same level sets, hence $\sigma(X) = \sigma(Y)$. A one-to-one relabelling changes the values but not the information.

**B10 (a full exam-style answer).** $\Omega = \{1,2,3,4\}$, $\mathcal F = 2^\Omega$, $P$ uniform, and $X(\omega) = (\omega - 2)^2$. Find $X^{-1}(\{1\})$, the induced measure $P_X$, and $F_X(1.5)$.

*Solution.* $X(1) = 1$, $X(2) = 0$, $X(3) = 1$, $X(4) = 4$. So $X^{-1}(\{1\}) = \{1,3\}$, and
$$P_X(\{0\}) = P(\{2\}) = \tfrac14,\qquad P_X(\{1\}) = P(\{1,3\}) = \tfrac12,\qquad P_X(\{4\}) = P(\{4\}) = \tfrac14 ,$$
with $P_X(B) = \sum_{x\in B\cap\{0,1,4\}}P_X(\{x\})$ for any Borel $B$. Finally
$$F_X(1.5) = P_X\big((-\infty,1.5]\big) = P(\{1,2,3\}) = \boxed{\tfrac34}.$$
Write each step as "pre-image, then $P$" and you get full marks for the "relationship between $P$, $P_X$ and $F_X$" part of the question.


# Lecture 5: Discrete random variables, PMF, CDF and expectation (Deck 2, slides 8 to 17)

**Big picture.** For a discrete random variable (countably many values) the whole distribution is a list of probabilities, the **PMF** $p_X(x) = P(X = x)$. Everything else comes from it: the **CDF** by adding up, the **mean** as a probability-weighted average, the **moments** $E[X^n]$, and the mean of any function $g(X)$ by the same weighted average. The lecture ends with **linearity**, $E[aX + b] = aE[X] + b$, and asks what happens to the PMF under a transformation.

## Part A: the slides

Slide 8 (the definition) is covered at the end of Lecture 4.

### Slide 9/31: Discrete and continuous random variables

> **On the slide.** If $\Omega'$ is countable, the random variable is discrete, and it is convenient to take $\mathcal F'$ = the power set. If $\Omega'\subseteq\mathbb R$ is uncountable, it is continuous; then $\mathcal F' = \mathcal B(\mathbb R)$ and the definition is trickier (later). You can also use $\Omega' = \mathbb R$ for a discrete random variable and survive. Notation: random variables are capital letters $X,Y,Z$; their values (realisations) are lowercase $x,y,z$.

**Countable vs uncountable range.** Note it is the range $\Omega'$ that decides, not $\Omega$. An indicator $\mathbf 1\{U > 0.5\}$ of a uniform $U$ is discrete even though $\Omega = [0,1]$ is uncountable (slide 23).

### Slides 10/31 and 11/31: Example, the sum of two dice

> **On the slides.** $X$ = sum of two dice. $\Omega = \{(1,1),\dots,(6,6)\}$, $\Omega' = \{2,\dots,12\}$; $\mathcal F, \mathcal F'$ are the power sets. *Is $X$ $(\mathcal F,\mathcal F')$-measurable?* $\{X = 3\}$ is an event in $\mathcal F'$; $P_X(\{3\}) = P(\{\omega : X(\omega) = 3\}) = P(\{(1,2),(2,1)\})$. In general $P_X(\{x\}) := P(\{\omega : X(\omega) = x\})$. *Find $P_X(\{x\})$ for all $x\in\Omega'$.*

**Measurable?** Yes, trivially: $\mathcal F = 2^\Omega$ contains every subset of $\Omega$, so every pre-image is in it.

**The PMF of the sum.** Count the pairs on each anti-diagonal of the $6\times6$ grid. For sum $x\le7$ the pairs are $(1,x-1),\dots,(x-1,1)$: $x - 1$ of them. For $x\ge7$, by symmetry, $13 - x$:

| $x$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $36\,p_X(x)$ | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

$$p_X(x) = \frac{6 - |x - 7|}{36},\qquad x = 2,\dots,12 .$$

### Slide 12/31: Sum of two dice, and why random variables help

> **On the slide.** $P_X(\{x\}) = \frac{x-1}{36}$ for $x\in\{2,\dots,7\}$ and $\frac{13-x}{36}$ for $x\in\{8,\dots,12\}$. *$Z$ = sum of 4 rolls?* $\Omega$ for 4 rolls is even more complicated. This is where $X$ is useful: $P(Z = 4) = P(X_1 = 2, X_2 = 2)$, where $X_1, X_2$ are independent copies of $X$.

**Why it works.** Four rolls summing to 4 means every roll is 1. Split the rolls into two pairs: $X_1$ = sum of rolls 1 and 2, $X_2$ = sum of rolls 3 and 4. Each pair-sum is at least 2, so $Z = 4$ forces $X_1 = X_2 = 2$:
$$P(Z = 4) = P(X_1 = 2)P(X_2 = 2) = \tfrac1{36}\cdot\tfrac1{36} = \tfrac1{1296} = \big(\tfrac16\big)^4. ✓$$
**In general** $P(Z = z) = \sum_xP(X_1 = x)P(X_2 = z - x)$, a **convolution** of PMFs. We reuse the PMF of $X$ instead of enumerating $6^4 = 1296$ outcomes. For example $P(Z = 5) = p_X(2)p_X(3) + p_X(3)p_X(2) = 2\cdot\frac{1\cdot2}{1296} = \frac4{1296}$ (four ways: one roll is 2).

### Slide 13/31: PMF and CDF

> **On the slide.** The function $p_X(x) := P_X(\{x\})$, $x\in\Omega'$, is the probability mass function (PMF). *What is the PMF for a coin toss or a die roll?* The CDF is $F_X(x_1) := \sum_{x\le x_1}p_X(x) = P\{\omega : X(\omega)\le x_1\}$. *What is the CDF for the coin toss or die?*

$$\boxed{p_X(x) = P(X = x),\qquad F_X(x) = P(X\le x) = \sum_{u\le x}p_X(u)}$$

**Coin** (with $X = 1$ for heads, 0 for tails): $p_X(0) = p_X(1) = \frac12$. Die: $p_X(k) = \frac16$, $k = 1,\dots,6$.

**CDFs.** The CDF is defined for **every real** $x$, not only the values $X$ takes:
$$F_{\text{coin}}(x) = \begin{cases}0 & x<0\\ \frac12 & 0\le x<1\\ 1 & x\ge1\end{cases}\qquad F_{\text{die}}(x) = \begin{cases}0 & x<1\\ \frac{\lfloor x\rfloor}6 & 1\le x<6\\ 1 & x\ge6.\end{cases}$$

**Shape of a discrete CDF** (drawn in class on Deck 3, slide 23): a **staircase**. It is flat between the values of $X$, jumps up at each value $x_i$ by exactly $p_X(x_i)$, and is **right-continuous**: at a jump it takes the upper value (the dot is filled on top). You can recover the PMF from the CDF as the jump sizes: $p_X(x) = F_X(x) - F_X(x^-)$.

**Reading probabilities off a CDF** (integer-valued $X$): $P(a < X\le b) = F_X(b) - F_X(a)$, $P(X = k) = F_X(k) - F_X(k-1)$, $P(X\ge k) = 1 - F_X(k-1)$. Mind the strict and non-strict inequalities; for discrete variables they change the answer.

### Slide 14/31: Expectation and moments

> **On the slide.** *How do you define the mean of a collection of numbers?* $E[X] = \sum_{x\in\Omega'}x\,p_X(x)$. *What is $E[X]$ for the coin toss or die?* The $n$-th moment: $E[X^n] = \sum_xx^np_X(x)$. For a function $g$: $E[g(X)] := \sum_xg(x)p_X(x)$.

$$\boxed{E[X] = \sum_xx\,p_X(x),\qquad E[X^n] = \sum_xx^n\,p_X(x),\qquad E[g(X)] = \sum_xg(x)\,p_X(x)}$$

**From averages to expectations.** The mean of numbers $a_1,\dots,a_N$ is $\frac1N\sum a_i$. Group equal values: if value $x$ occurs $N_x$ times, the mean is $\sum_xx\frac{N_x}N$, a weighted average with weights the **relative frequencies**. Expectation replaces relative frequencies by probabilities. This is why $E[X]$ is the long-run average of many independent repetitions (made precise by the law of large numbers, L17).

**Coin and die.** $E[X_{\text{coin}}] = 0\cdot\frac12 + 1\cdot\frac12 = \frac12$. $E[X_{\text{die}}] = \frac{1 + \dots + 6}6 = \frac{21}6 = 3.5$. The mean need not be a value $X$ can take.

**Sum of two dice.** By symmetry of the PMF about 7, $E[X] = 7$. (Or by linearity, $3.5 + 3.5$; that needs $E[X+Y] = E[X] + E[Y]$, proved for joint PMFs later in the course.)

**Moments.** $E[X^2_{\text{die}}] = \frac{1 + 4 + 9 + 16 + 25 + 36}6 = \frac{91}6$. Note $E[X^2]\ne(E[X])^2$ in general; the difference is the variance (Lecture 6).

### Slide 15/31: Consistency of the PMF

> **On the slide.** $p_X(x) = P(\{\omega : X(\omega) = x\})$. *How do you check if $p_X$ is a legitimate PMF?* $\sum_xp_X(x) = 1$. *Can you prove this?* $\sum_xp_X(x) = \sum_xP(\{\omega : X(\omega) = x\}) = P(\bigcup_x\{\omega : X(\omega) = x\}) = P(\Omega)$. $\square$

**The proof, with the reasons.** The events $\{X = x\}$ for different $x$ are **disjoint** ($\omega$ cannot be sent to two values) and their union is **all of $\Omega$** (every $\omega$ goes somewhere). Countable additivity (allowed because $\Omega'$ is countable) gives $\sum_xP(X = x) = P(\Omega) = 1$.

### Slide 16/31: Linearity of expectation

> **On the slide.** $E[X] = \sum_xxp_X(x)$. Functions of random variables are random variables, with $E[g(X)] = \sum_xg(x)p_X(x)$. *For $Y = aX + b$, what is $E[Y]$?* $E[Y] = \sum_x(ax + b)p_X(x) = a\sum_xxp_X(x) + b = aE[X] + b$. *What is the PMF of $Y$?*

$$\boxed{E[aX + b] = aE[X] + b}$$

The step $\sum_xb\,p_X(x) = b$ uses consistency (slide 15). The general fact behind it: **expectation is linear**, $E[g(X) + h(X)] = E[g(X)] + E[h(X)]$ and $E[cg(X)] = cE[g(X)]$, since sums split.

**Careful: linearity is about linear functions.** In general $E[g(X)]\ne g(E[X])$. For a die, $E[X^2] = \frac{91}6\approx15.17$, but $(E[X])^2 = 12.25$.

### Slide 17/31: PMF of $Y = aX + b$

> **On the slide.** If $\Omega' = \{x_1,\dots,x_n\}$, then the range of $Y$ is $\Omega'' = \{y_1,\dots,y_n\}$ with $y_i = ax_i + b$, and $p_Y(y_i) = p_X(x_i)$. Then $E[Y] = \sum_yyp_Y(y) = \sum_x(ax + b)p_Y(ax + b) = \sum_x(ax + b)p_X(x) = aE[X] + b$. *What if $Y = g(X)$ with $g$ many-to-one? What is the PMF of $Y$ then?*

**Why $p_Y(y_i) = p_X(x_i)$.** For $a\ne0$, $y = ax + b$ is one-to-one, so $\{Y = y_i\} = \{X = x_i\}$: the same event, so the same probability. The values move, the probabilities do not. (If $a = 0$, $Y\equiv b$ is constant and $p_Y(b) = 1$.)

**Example.** $X$ = die, $Y = 2X - 1$. Then $Y\in\{1,3,5,7,9,11\}$, each with probability $\frac16$, and $E[Y] = 2(3.5) - 1 = 6$. ✓

**The question at the bottom** (many-to-one $g$) is answered at the start of Lecture 6: several $x$'s land on the same $y$, so their probabilities **add**.

## Part B: extra worked examples and problems

**B1 (last year's HW 3 Q1).** $X\in\{-2,-1,1,2\}$ with $p_X(x) = c(x + 4)$. Find $c$, $E[X]$ and $\operatorname{Var}(X)$.

*Solution.* $c(2 + 3 + 5 + 6) = 16c = 1$, so $c = \frac1{16}$.
$$E[X] = \frac{-2(2) - 1(3) + 1(5) + 2(6)}{16} = \frac{10}{16} = \frac58,\qquad E[X^2] = \frac{4(2) + 1(3) + 1(5) + 4(6)}{16} = \frac{40}{16} = \frac52,$$
$$\operatorname{Var}(X) = \frac52 - \frac{25}{64} = \frac{135}{64}\quad(\text{using }\operatorname{Var} = E[X^2] - (E[X])^2\text{ from Lecture 6}).$$

**B2 (last year's Tutorial 3 Q2).** $X\in\{2,3,4\}$ with probabilities $0.4 - a$, $2a$, $0.6 - a$. (a) Allowed values of $a$. (b) With $X_1, X_2$ independent copies, the range of $P(X_1 + X_2 = 6)$.

*Solution.* (a) The probabilities sum to 1 for every $a$; non-negativity needs $0\le a\le0.4$. (b) Sum 6 comes from $(2,4)$, $(4,2)$, $(3,3)$:
$$P = 2(0.4 - a)(0.6 - a) + (2a)^2 = 6a^2 - 2a + 0.48 .$$
This parabola has its minimum at $a = \frac16$, value $0.48 - \frac16 = \frac{47}{150}\approx0.313$. On $[0,0.4]$ the maximum is at an endpoint: $0.48$ at $a = 0$ and $0.64$ at $a = 0.4$. So $\frac{47}{150}\le P\le\frac{16}{25}$.

**B3 (last year's Tutorial 3 Q3).** At most 3 students wait for a TA. $p(2) = p(1)$, $p(0) = p(3)$, and $p(1) + p(2) = \frac12[p(0) + p(3)]$. Find the PMF.

*Solution.* Let $p(1) = p(2) = s$ and $p(0) = p(3) = t$. Then $2s = \frac12(2t)$, so $t = 2s$, and $2s + 2t = 6s = 1$. So $p(1) = p(2) = \frac16$ and $p(0) = p(3) = \frac13$.

**B4 (last year's Tutorial 3 Q5).** $p(x) = kx$ for $x = 2,4,6$ and $k(x - 2)$ for $x = 8$. Find $k$, $E[X]$, $E[X^2]$.

*Solution.* $k(2 + 4 + 6 + 6) = 18k = 1$, so $k = \frac1{18}$. $E[X] = \frac{2\cdot2 + 4\cdot4 + 6\cdot6 + 8\cdot6}{18} = \frac{104}{18} = \frac{52}9$. $E[X^2] = \frac{4\cdot2 + 16\cdot4 + 36\cdot6 + 64\cdot6}{18} = \frac{672}{18} = \frac{112}3$.

**B5 (last year's Tutorial 3 Q6; the inspection paradox).** A town has 1000 households: 100 of size 1, 200 of size 2, 300 of size 3, 200 of size 4, 100 of size 5, 100 of size 6 (3300 people). $X$ = size of a random household, $Y$ = size of the household of a random person. Find both PMFs and means.

*Solution.* $p_X(k)$ = fraction of households of size $k$: $0.1, 0.2, 0.3, 0.2, 0.1, 0.1$, and $E[X] = 3.3$. A random *person* lands in a size-$k$ household with probability $\frac{k\cdot\#\{\text{size }k\}}{3300}$: $\frac1{33},\frac4{33},\frac9{33},\frac8{33},\frac5{33},\frac6{33}$. So
$$E[Y] = \frac{1 + 8 + 27 + 32 + 25 + 36}{33} = \frac{129}{33}\approx3.91 > 3.3 .$$
(The printed sheet says $E[Y] = 3.3$; the official solution gives $3.91$, which is right.) Big households contain more people, so they are over-sampled when you pick a person. In general $p_Y(k) = \frac{k\,p_X(k)}{E[X]}$ and $E[Y] = \frac{E[X^2]}{E[X]}\ge E[X]$. The same effect makes "the average class size a student experiences" larger than the average class size.

**B6 (last year's Tutorial 3 Q4 and HW 3 Q6: the median).** A median $m$ satisfies $P(X\ge m)\ge\frac12$ and $P(X\le m)\ge\frac12$. Find the medians of (a) a fair die, (b) $p(1) = 0.4$, $p(2) = p(3) = 0.3$, (c) Geometric($\frac12$).

*Solution.* (a) For $3\le m\le4$: $P(X\le m)\ge\frac36$ and $P(X\ge m)\ge\frac36$. For $m<3$, $P(X\le m)\le\frac26$; for $m>4$, $P(X\ge m)\le\frac26$. Medians: $[3,4]$. (b) $m = 2$: $P(X\le2) = 0.7$, $P(X\ge2) = 0.6$. ✓ For $m<2$, $P(X\le m)\le0.4$; for $m>2$, $P(X\ge m)\le0.3$. So $m = 2$ only. (c) $P(X = 1) = \frac12$, so $P(X\le m)\ge\frac12$ needs $m\ge1$, and $P(X\ge m)\ge\frac12$ needs $m\le2$ (since $P(X\ge2) = \frac12$ but $P(X\ge m) = \frac14$ for $2<m\le3$). Medians: $[1,2]$.

**B7 (last year's HW 3 Q7(c); the tail-sum formula).** For a non-negative integer-valued $X$, show $E[X] = \sum_{k=0}^\infty P(X > k)$.

*Solution.* Write $X = \sum_{k=0}^\infty\mathbf 1\{X > k\}$ (for $X = n$, exactly the terms $k = 0,\dots,n-1$ equal 1). Take expectations; for non-negative terms you may swap $E$ and $\sum$. Or directly, swapping the order of summation:
$$\sum_{k\ge0}P(X > k) = \sum_{k\ge0}\sum_{n>k}p_X(n) = \sum_{n\ge1}p_X(n)\sum_{k=0}^{n-1}1 = \sum_nn\,p_X(n) = E[X].\qquad\square$$
*Use:* Geometric($p$) has $P(X > k) = (1-p)^k$, so $E[X] = \sum_k(1-p)^k = \frac1p$ in one line.

**B8 (last year's HW 3 Q8).** Find $\alpha$ minimising $f(\alpha) = E[(X - \alpha)^2]$.

*Solution.* Expand: $f(\alpha) = E[X^2] - 2\alpha E[X] + \alpha^2$, a parabola in $\alpha$ with $f'(\alpha) = 2\alpha - 2E[X] = 0$ at $\alpha = E[X]$. The minimum value is $\operatorname{Var}(X)$. **The mean is the best constant predictor under squared error.** (Under absolute error $E|X - \alpha|$ the best constant is a median.)

**B9 (last year's Tutorial 3 Q8; optimal stopping).** Roll a die; you may keep the value or re-roll once and take the second value. Best strategy and expected payout?

*Solution.* The re-roll is worth $E[X] = 3.5$ on average. So keep the first roll iff it beats 3.5, that is, keep 4, 5, 6 and re-roll 1, 2, 3. Expected payout:
$$\tfrac36\cdot\tfrac{4 + 5 + 6}3 + \tfrac36\cdot3.5 = \tfrac12\cdot5 + \tfrac12\cdot3.5 = \boxed{4.25}.$$


# Lecture 6: Functions of a random variable, variance, and the standard discrete families (Deck 2, slides 18 to 27)

**Big picture.** Three tools and four distributions. The tools: the **PMF of $g(X)$** (add the probabilities of all $x$ that map to the same $y$), the **expected value rule** (LOTUS: $E[g(X)] = \sum g(x)p_X(x)$, no need for the PMF of $g(X)$), and the **variance** (the mean squared distance from the mean). The distributions: **indicator/Bernoulli**, **binomial**, **geometric** and **Poisson**. For each you should know the story (what it counts), the PMF, the mean and the variance, and be able to derive the last two.

## Part A: the slides

### Slide 18/31: A function of a random variable

> **On the slide.** $Y = |X|$, where $X$ is an integer chosen uniformly from $-4$ to $4$: $p_X(x) = \frac19$ for $x\in\{-4,\dots,4\}$. *What is the range of $Y$?* $\{0,\dots,4\}$. *What is $p_Y(2)$?* $p_Y(2) = \sum_{\{x:|x| = 2\}}p_X(x) = p_X(-2) + p_X(2) = \frac29$.

The full PMF: $0$ comes only from $x = 0$, and every other $y$ comes from $\pm y$:
$$p_Y(0) = \tfrac19,\qquad p_Y(y) = \tfrac29\quad(y = 1,2,3,4).$$
Check: $\frac19 + 4\cdot\frac29 = 1$. ✓ (This is Bertsekas Example 2.1.)

### Slide 19/31: The general rule

> **On the slide.** Picture: bars of $p_X$ at $-4,\dots,4$, each $\frac19$, folding onto $p_Y$ at $0,\dots,4$. **Suppose $Y = g(X)$ with $X$ discrete. Then $p_Y(y) = \sum_{\{x : g(x) = y\}}p_X(x)$.** (Proof is HW.)

$$\boxed{p_Y(y) = \sum_{x\,:\,g(x) = y}p_X(x)}$$

**HW proof.** The event $\{Y = y\}$ is $\{\omega : g(X(\omega)) = y\} = \bigcup_{x : g(x) = y}\{X = x\}$. These events are disjoint (different values of $X$) and there are countably many, so additivity gives the formula. $\square$

**Recipe.** For each value $y$, list all $x$ with $g(x) = y$ and add their probabilities. This answers the question left open at the end of Lecture 5. When $g$ is one-to-one the sum has one term and $p_Y(g(x)) = p_X(x)$.

### Slide 20/31: $E[g(X)]$, the law of the unconscious statistician

> **On the slide.** **Theorem.** If $Y = g(X)$ with $X$ discrete with PMF $p_X$, then $E[Y] = \sum_xg(x)p_X(x)$. *Proof.* $E[Y] = \sum_yyp_Y(y) = \sum_y\sum_{\{x : g(x) = y\}}g(x)p_X(x) = \sum_xg(x)p_X(x)$. $\square$ (Wikipedia: Law of the unconscious statistician.)

$$\boxed{E[g(X)] = \sum_xg(x)\,p_X(x)}$$

**Reading the proof.** Start from the definition of $E[Y]$. Replace $p_Y(y)$ by the sum from slide 19, and move $y$ inside, where $y = g(x)$ for every $x$ in that group. The double sum runs over all $x$, grouped by their value of $g(x)$. Every $x$ appears exactly once, so the grouping can be dropped.

**Why it matters.** Lecture 5 *defined* $E[g(X)]$ this way. This theorem shows that the definition agrees with "compute the PMF of $Y = g(X)$, then its mean". You never need the PMF of $g(X)$ to find its expectation. The name: people use the formula "unconsciously", without noticing it needs a proof. (Last year's HW 4 Q6 asks for the continuous version, solved in Lecture 7, Part B.)

**Check with slide 18.** $E[|X|]$ via $Y$: $0\cdot\frac19 + (1 + 2 + 3 + 4)\frac29 = \frac{20}9$. Via LOTUS: $\frac19\sum_{x=-4}^4|x| = \frac{20}9$. ✓

### Slide 21/31: Towards variance

> **On the slide.** Take $g(X) = (X - E[X])^2$, the square of the deviation from the mean. It cannot tell if the deviation is positive or negative. $E[g(X)]$ is the mean square deviation. In fact $\sqrt{E[g(X)]}$ quantifies the deviation.

### Slide 22/31: Variance

> **On the slide.** $\operatorname{Var}(X) := E[(X - E[X])^2]$. **HW:** prove $E[(X - E[X])^2] = E[X^2] - E[X]^2$. $\sigma_X = \sqrt{\operatorname{Var}(X)}$ is the standard deviation. For a fair coin, using $\Omega' = \{+100,-100\}$ instead of $\{1,-1\}$ gives more variance. **HW:** what is $\operatorname{Var}(Y)$ for $Y = aX + b$?

$$\boxed{\operatorname{Var}(X) = E\big[(X - \mu)^2\big] = E[X^2] - \mu^2,\qquad \mu = E[X]}$$

**HW 1: the shortcut formula.** Expand the square and use linearity ($\mu$ is a constant):
$$E[(X - \mu)^2] = E[X^2 - 2\mu X + \mu^2] = E[X^2] - 2\mu E[X] + \mu^2 = E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2 .\qquad\square$$
Two consequences: $E[X^2]\ge(E[X])^2$ always (variance is non-negative), and $\operatorname{Var}(X) = 0$ iff $X$ equals its mean with probability 1.

**The coin.** With values $\pm1$: $\mu = 0$, $\operatorname{Var} = 1$. With $\pm100$: $\mu = 0$, $\operatorname{Var} = 100^2 = 10{,}000$, $\sigma = 100$. Same probabilities, wider spread.

**HW 2: $\operatorname{Var}(aX + b)$** (also last year's HW 3 Q12). $E[aX + b] = a\mu + b$, so
$$\operatorname{Var}(aX + b) = E\big[(aX + b - a\mu - b)^2\big] = E\big[a^2(X - \mu)^2\big] = \boxed{a^2\operatorname{Var}(X)},\qquad\sigma_{aX + b} = |a|\,\sigma_X .$$
Shifting by $b$ moves the distribution without changing its spread. Scaling by $a$ scales the spread by $|a|$.

### Slide 22/31 (second): Examples of discrete random variables

(A section title slide.)

### Slide 23/31: The indicator random variable

> **On the slide.** $\mathbf 1_A(\omega) = 1$ if $\omega\in A\subseteq\Omega$, else 0. Its PMF: $P(A)$ at $x = 1$, $1 - P(A)$ at $x = 0$. It is discrete even if $\Omega$ is continuous; for example $A$ = "the number picked uniformly on the real line is positive". *What are its CDF and mean $E[\mathbf 1_A]$? Its variance and moments?*

With $q = P(A)$:
$$F(x) = \begin{cases}0 & x<0\\ 1 - q & 0\le x<1\\ 1 & x\ge1\end{cases},\qquad E[\mathbf 1_A] = q = P(A),\qquad E[\mathbf 1_A^n] = q,\qquad\operatorname{Var}(\mathbf 1_A) = q(1 - q).$$
The moments are all $q$ because $\mathbf 1_A^n = \mathbf 1_A$ (as $0^n = 0$ and $1^n = 1$). Then $\operatorname{Var} = E[\mathbf 1_A^2] - q^2 = q - q^2$.

$$\boxed{E[\mathbf 1_A] = P(A)}$$
This tiny fact is one of the most useful in the course: **any probability is an expectation**, and a count of events is a sum of indicators, whose mean is the sum of the probabilities (by linearity, proved for sums later). Part B uses it for matching and coupon problems.

### Slide 24/31: Bernoulli random variable

> **On the slide.** $X = 1$ with probability $p$, else $0$. Same as an indicator, but we do not specify $A$. From now on we start ignoring $\Omega$. Used in binary classification ($X = 1$ if the image has a cat) and Bernoulli bandits. $E[X] = p$, $E[X^n] = p$.

$$X\sim\text{Bernoulli}(p):\qquad p_X(1) = p,\ p_X(0) = 1 - p,\qquad E[X] = p,\qquad\operatorname{Var}(X) = p(1 - p).$$
The variance is largest at $p = \frac12$ (most uncertain) and zero at $p\in\{0,1\}$ (no randomness).

### Slide 25/31: Binomial $B(n,p)$

> **On the slide.** Toss a $p$-coin $n$ times; heads = 1, tails = 0; $N$ = number of heads. PMF: $p_N(k) = \binom nkp^k(1-p)^{n-k}$. **HW:** what are $E[N]$, $E[N^2]$, $\operatorname{Var}(N)$?

$$\boxed{p_N(k) = \binom nk p^k(1-p)^{n-k},\ k = 0,\dots,n;\qquad E[N] = np,\qquad\operatorname{Var}(N) = np(1 - p)}$$

**Consistency.** $\sum_k\binom nkp^k(1-p)^{n-k} = (p + 1 - p)^n = 1$ by the binomial theorem.

**HW: $E[N]$** (this is last year's Quiz 1 Q2). Use $k\binom nk = n\binom{n-1}{k-1}$ (Lecture 3, slide 58):
$$E[N] = \sum_{k=1}^nk\binom nkp^k(1-p)^{n-k} = np\sum_{k=1}^n\binom{n-1}{k-1}p^{k-1}(1-p)^{(n-1)-(k-1)} = np\,(p + 1 - p)^{n-1} = np .$$
**HW: $E[N^2]$.** Compute the *factorial moment* $E[N(N-1)]$ first, because $k(k-1)\binom nk = n(n-1)\binom{n-2}{k-2}$:
$$E[N(N-1)] = n(n-1)p^2\sum_{k=2}^n\binom{n-2}{k-2}p^{k-2}(1-p)^{(n-2)-(k-2)} = n(n-1)p^2 .$$
So $E[N^2] = E[N(N-1)] + E[N] = n(n-1)p^2 + np$.

**HW: $\operatorname{Var}(N)$.** $n(n-1)p^2 + np - n^2p^2 = np - np^2 = np(1-p)$. (The slide writes $\operatorname{Var}(X)$; it means $\operatorname{Var}(N)$.)

**The quick way** (once independence of random variables is covered): $N = X_1 + \dots + X_n$ with i.i.d. Bernoulli($p$) $X_i$. Means add, and for independent variables variances add: $np$ and $np(1-p)$. Last year's Quiz 1 solutions show both methods.

### Slide 26/31: Geometric random variable

> **On the slide.** Toss a $p$-coin until the first head; $N$ = number of tosses needed. *PMF?* $p_N(k) = (1-p)^{k-1}p$. **HW:** $E[N]$, $E[N^2]$, $\operatorname{Var}(N)$? *What is $\bar F_N(k) := 1 - F_N(k) = P(N > k)$? What is $P(N > k + m\mid N > k)$?* ($= P(N > m)$, the memoryless property.)

$$\boxed{p_N(k) = (1-p)^{k-1}p,\ k = 1,2,\dots;\qquad E[N] = \frac1p,\qquad\operatorname{Var}(N) = \frac{1-p}{p^2},\qquad P(N > k) = (1-p)^k}$$

Write $q = 1 - p$. Consistency: $\sum_{k\ge1}q^{k-1}p = \frac p{1-q} = 1$.

**Tail.** $N > k$ iff the first $k$ tosses are all tails: $P(N>k) = q^k$. No sum needed.

**HW: $E[N]$.** Differentiate the geometric series $\sum_{k\ge0}x^k = \frac1{1-x}$ to get $\sum_{k\ge1}kx^{k-1} = \frac1{(1-x)^2}$ for $|x|<1$:
$$E[N] = \sum_{k\ge1}kq^{k-1}p = \frac p{(1-q)^2} = \frac1p .$$
(Or by the tail-sum formula: $E[N] = \sum_{k\ge0}q^k = \frac1p$.)

**HW: $E[N^2]$.** Differentiate again: $\sum_{k\ge2}k(k-1)x^{k-2} = \frac2{(1-x)^3}$. So
$$E[N(N-1)] = \sum_kk(k-1)q^{k-1}p = pq\cdot\frac2{(1-q)^3} = \frac{2q}{p^2},\qquad E[N^2] = \frac{2q}{p^2} + \frac1p = \frac{2 - p}{p^2},$$
$$\operatorname{Var}(N) = \frac{2-p}{p^2} - \frac1{p^2} = \frac{1-p}{p^2}.$$
*Example:* waiting for a 6 on a die ($p = \frac16$): mean 6 rolls, variance 30, standard deviation $\approx5.5$. The waiting time is very spread out.

**Memorylessness.** For integers $k, m\ge0$, $\{N > k + m\}\subseteq\{N > k\}$, so
$$P(N > k + m\mid N > k) = \frac{P(N > k + m)}{P(N > k)} = \frac{q^{k+m}}{q^k} = q^m = P(N > m).$$
Having already waited $k$ tosses without a head, the remaining wait has the same distribution as a fresh start. The coin has no memory. The geometric is the **only** memoryless distribution on $\{1,2,\dots\}$, and the exponential (Lecture 7) is its continuous counterpart.

### Slide 27/31: Poisson random variable

> **On the slide.** Parameter $\lambda$, $\Omega' = \mathbb Z_{\ge0}$, PMF $p_X(k) = e^{-\lambda}\frac{\lambda^k}{k!}$. Intuitively, it is the limit of the binomial as $n$ grows and $p$ shrinks with $np\to\lambda$. The binomial mean is $np$, so $p$ must decrease as $n$ increases. Read the Wikipedia page on the Poisson limit theorem. More with Poisson processes.

$$\boxed{p_X(k) = e^{-\lambda}\frac{\lambda^k}{k!},\ k = 0,1,2,\dots;\qquad E[X] = \lambda,\qquad\operatorname{Var}(X) = \lambda}$$

**Consistency, mean and variance** (last year's Tutorial 3 Q1). Using $\sum_{k\ge0}\frac{\lambda^k}{k!} = e^\lambda$:
$$\sum_kp_X(k) = e^{-\lambda}e^\lambda = 1,\qquad E[X] = \sum_{k\ge1}k\,e^{-\lambda}\frac{\lambda^k}{k!} = \lambda e^{-\lambda}\sum_{k\ge1}\frac{\lambda^{k-1}}{(k-1)!} = \lambda .$$
For the variance use the factorial moment again:
$$E[X(X-1)] = \lambda^2e^{-\lambda}\sum_{k\ge2}\frac{\lambda^{k-2}}{(k-2)!} = \lambda^2,\qquad\operatorname{Var}(X) = \lambda^2 + \lambda - \lambda^2 = \lambda .$$

**The Poisson limit theorem.** Let $N_n\sim B(n,p_n)$ with $np_n = \lambda$. For fixed $k$:
$$\binom nkp_n^k(1 - p_n)^{n-k} = \underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\to1}\cdot\frac{\lambda^k}{k!}\cdot\underbrace{\Big(1 - \frac\lambda n\Big)^n}_{\to e^{-\lambda}}\cdot\underbrace{\Big(1 - \frac\lambda n\Big)^{-k}}_{\to1}\ \longrightarrow\ e^{-\lambda}\frac{\lambda^k}{k!}.$$
The first factor is a product of $k$ terms $\frac{n - i}n\to1$ ($k$ is fixed). The third uses $(1 + \frac xn)^n\to e^x$.

**When to use it.** Counts of **many independent rare events**: typos on a page, calls per minute, defects in a batch, decays per second. If $n$ is large and $p$ small, $B(n,p)\approx\text{Poisson}(np)$. Example: $n = 100$, $p = 0.01$. Exact $P(0) = 0.99^{100} = 0.3660$; Poisson $e^{-1} = 0.3679$. Exact $P(2) = 0.1849$; Poisson $\frac{e^{-1}}2 = 0.1839$. Very close.

### Summary table

| $X$ | Story | PMF | $E[X]$ | $\operatorname{Var}(X)$ |
|---|---|---|---|---|
| Bernoulli$(p)$ | one trial | $p^x(1-p)^{1-x}$, $x\in\{0,1\}$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | successes in $n$ trials | $\binom nkp^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Geometric$(p)$ | trials until first success | $(1-p)^{k-1}p$, $k\ge1$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson$(\lambda)$ | rare events in a period | $e^{-\lambda}\frac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Discrete uniform $\{a,\dots,b\}$ | fair die | $\frac1{b-a+1}$ | $\frac{a+b}2$ | $\frac{(b-a+1)^2 - 1}{12}$ |

## Part B: extra worked examples and problems

**B1 (last year's HW 3 Q5).** $X\sim$ Geometric$(\frac14)$ and $Y = |X - 4|$. Find the range and PMF of $Y$.

*Solution.* $X\in\{1,2,\dots\}$, so $Y\in\{0,1,2,\dots\}$. Use slide 19 with $p_X(k) = \frac14(\frac34)^{k-1}$:

- $y = 0$: only $x = 4$: $p_Y(0) = \frac14(\frac34)^3 = \frac{27}{256}$.
- $y = 1,2,3$: $x = 4 + y$ and $x = 4 - y\ge1$: $p_Y(y) = \frac14\big[(\frac34)^{3+y} + (\frac34)^{3-y}\big]$.
- $y\ge4$: only $x = 4 + y$ (since $4 - y\le0$): $p_Y(y) = \frac14(\frac34)^{3+y}$.

**B2 (last year's HW 3 Q2).** A batch of 20 chips: 5 are flawless for sure, and each of the other 15 is defective independently with probability 0.1. $Z$ = number of flawless chips. (a) PMF of $Z$. (b) $P(Z\ge18)$.

*Solution.* $Z = 5 + W$ with $W\sim B(15, 0.9)$. (a) $p_Z(k) = \binom{15}{k-5}0.9^{k-5}0.1^{20-k}$ for $k = 5,\dots,20$. (b) $P(W\ge13) = \binom{15}{13}0.9^{13}0.1^2 + \binom{15}{14}0.9^{14}0.1 + 0.9^{15}\approx\boxed{0.816}$.

**B3 (last year's HW 3 Q11, the St. Petersburg game).** The pot starts at 1 and doubles on each head; at the first tail you win the pot, so you win $2^{k-1}$ if the first tail is on toss $k$. (a) $E[X]$. (b) $P(X > 65)$. (c) The payout is capped at $2^{30}$; find $E[Y]$.

*Solution.* $P(\text{first tail on toss }k) = 2^{-k}$. (a) $E[X] = \sum_{k\ge1}2^{k-1}2^{-k} = \sum_k\frac12 = \infty$. (b) $X>65$ iff $X\ge128 = 2^7$ iff $k\ge8$: $P = \sum_{k\ge8}2^{-k} = 2^{-7} = \frac1{128}$. (c) For $k\le31$ the payout $2^{k-1}\le2^{30}$ is uncapped and contributes $\frac12$ each: $\frac{31}2$. For $k\ge32$ the payout is $2^{30}$, with total probability $2^{-31}$: contributes $\frac12$. So $E[Y] = 16$. A billion-rupee cap makes the "infinitely valuable" game worth 16 rupees.

**B4 (last year's HW 3 Q13).** An urn has 10 black and 1 white ball, drawn without replacement until the white appears. (a) You win \$5 per black ball drawn. Expected winnings? (b) The payout is $2^k$ for $k$ black balls. Expected payout?

*Solution.* The white ball's position is uniform on $\{1,\dots,11\}$ (every order is equally likely), so $K$ = number of blacks before it is uniform on $\{0,\dots,10\}$. (a) $E[5K] = 5\cdot5 = \boxed{25}$. (b) LOTUS: $E[2^K] = \frac1{11}\sum_{k=0}^{10}2^k = \frac{2^{11} - 1}{11} = \frac{2047}{11}\approx\boxed{186.09}$. Note $E[2^K]\ne2^{E[K]} = 32$.

**B5 (last year's HW 3 Q3, the umbrella or matching problem).** $N$ people pick umbrellas at random. (a) $P(\text{at least one gets their own})$. (b) Its limit. (c) The PMF of $X_N$, the number of matches.

*Solution.* (a) $A_i$ = person $i$ gets their own. Any $k$ specified people all match with probability $\frac{(N-k)!}{N!}$. Inclusion–exclusion:
$$P\Big(\bigcup_iA_i\Big) = \sum_{k=1}^N(-1)^{k+1}\binom Nk\frac{(N-k)!}{N!} = \sum_{k=1}^N\frac{(-1)^{k+1}}{k!} = 1 - \frac1{2!} + \frac1{3!} - \dots$$
(b) This tends to $1 - e^{-1}\approx0.632$. (c) Choose which $k$ people match ($\binom Nk$), and the remaining $N - k$ must be a derangement: $D_{N-k} = (N-k)!\sum_{j=0}^{N-k}\frac{(-1)^j}{j!}$. Dividing by $N!$:
$$p_{X_N}(k) = \frac1{k!}\sum_{j=0}^{N-k}\frac{(-1)^j}{j!}\ \xrightarrow{N\to\infty}\ \frac{e^{-1}}{k!}.$$
The number of matches is approximately Poisson(1). Its mean is exactly 1 for every $N$: $X_N = \sum_i\mathbf 1_{A_i}$ and $E[\mathbf 1_{A_i}] = \frac1N$ (slide 23 plus linearity; last year's Tutorial 3 Q9).

**B6 (last year's HW 3 Q9).** Roll $m$ fair $n$-sided dice. (a) $E[\min]$. (b) Its approximation for large $n$. (c) $m = 3$, $n = 100$.

*Solution.* (a) Tail-sum (Lecture 5, B7; here values start at 1, so $E[M] = \sum_{j\ge1}P(M\ge j)$). $M\ge j$ iff every die is $\ge j$: $P(M\ge j) = \big(\frac{n-j+1}n\big)^m$. So
$$E[M] = \sum_{j=1}^n\Big(\frac{n-j+1}n\Big)^m = \frac1{n^m}\sum_{i=1}^ni^m .$$
(b) $\sum_{i=1}^ni^m\approx\frac{n^{m+1}}{m+1}$, so $E[M]\approx\frac n{m+1}$. (c) Exact $\frac{(100\cdot101/2)^2}{10^6} = 25.5025$; approximation $25$.

**B7 (last year's Tutorial 3 Q7 and HW 3 Q14, coupon collector).** $n$ coupon types, each draw uniform. $X$ = draws until every type is seen. Find $E[X]$ and $\operatorname{Var}(X)$.

*Solution.* Split into stages: $X_i$ = draws to get a new type when you already have $i$ types. A draw is new with probability $p_i = \frac{n-i}n$, so $X_i\sim$ Geometric$(p_i)$, and $X = X_0 + X_1 + \dots + X_{n-1}$. By linearity:
$$E[X] = \sum_{i=0}^{n-1}\frac n{n-i} = n\Big(1 + \frac12 + \dots + \frac1n\Big) = nH_n\approx n\ln n .$$
The stages are independent, so variances add:
$$\operatorname{Var}(X) = \sum_{i=0}^{n-1}\frac{1 - p_i}{p_i^2} = \sum_{k=1}^{n}\frac{n(n-k)}{k^2} = n^2\sum_{k=1}^n\frac1{k^2} - nH_n .$$
For $n = 6$ (collecting all faces of a die): $E[X] = 6\cdot2.45 = 14.7$ rolls.


# Lecture 7: The CDF, continuous random variables, uniform and exponential (Deck 3, slides 1 to 11)

**Big picture.** The **CDF** $F_X(x) = P(X\le x)$ works for every random variable, discrete or continuous. For a continuous random variable the CDF has a derivative, the **pdf** $f_X$, and probabilities become **areas under $f_X$**. Single points carry no probability, so $<$ and $\le$ no longer matter. Sums become integrals: $E[X] = \int xf_X(x)\,dx$. Two families are introduced: the **uniform** (the continuous "equally likely") and the **exponential** (waiting times, and the only memoryless continuous distribution).

## Part A: the slides

### Slide 2/26: The induced measure $P_X$ and the CDF

> **On the slide.** $X$ maps $(\Omega,\mathcal F,P)$ to $(\mathbb R,\mathcal B(\mathbb R),P_X)$. The CDF is $F_X(x) = P\{\omega : X(\omega)\le x\}$. It can be written with $P_X$: $\mathcal B(\mathbb R)$ is made up of sets like $(-\infty,a]$, and $F_X(x) = P_X((-\infty,x]) = P\{\omega : X(\omega)\le x\}$. This is a general definition, for continuous and discrete alike.

$$\boxed{F_X(x) = P(X\le x) = P_X\big((-\infty,x]\big),\qquad x\in\mathbb R}$$

**Why one function is enough.** Half-lines $(-\infty,x]$ generate $\mathcal B(\mathbb R)$ (Lecture 2, Part B5). So knowing $P_X$ on half-lines (the CDF) determines $P_X$ on every Borel set. Two random variables with the same CDF have the same distribution.

**The four properties of every CDF** (not on the slide, but used everywhere; Bertsekas Section 3.2):

1. **Non-decreasing:** $x<y\Rightarrow F_X(x)\le F_X(y)$, because $\{X\le x\}\subseteq\{X\le y\}$ (monotonicity of $P$).
2. $\lim_{x\to-\infty}F_X(x) = 0$, since $\{X\le-n\}\downarrow\emptyset$ (continuity of $P$, Lecture 3).
3. $\lim_{x\to\infty}F_X(x) = 1$, since $\{X\le n\}\uparrow\Omega$.
4. **Right-continuous:** $F_X(x + \frac1n)\to F_X(x)$, since $\{X\le x + \frac1n\}\downarrow\{X\le x\}$.

The left limit is $F_X(x^-) = P(X<x)$ (from $\{X\le x - \frac1n\}\uparrow\{X<x\}$). So the **jump at $x$ is $P(X = x)$**:
$$P(X = x) = F_X(x) - F_X(x^-).$$
**Interval probabilities:** $P(a<X\le b) = F_X(b) - F_X(a)$. Any function with properties 1 to 4 is the CDF of some random variable.

### Slide 3/26: Continuous random variables

> **On the slide.** A random variable on $\mathbb R$ is discrete if $F_X$ is piecewise constant, continuous if $F_X$ is a continuous function. A continuous function need not be differentiable, but in this course we only consider continuous random variables whose $F_X$ is continuous and differentiable. Examples: a number picked uniformly from $[a,b]$; the water level in a dam; the pending workload on a server. *(Handwritten: $P(X\in(x, x+h]) = \int_x^{x+h}f(x)\,dx \approx f(x)\,h$, with a sketch of a thin strip of width $h$ under a density curve.)*

**Discrete vs continuous, in terms of the CDF.** Discrete: a staircase (jumps at the values, flat between). Continuous: no jumps at all, so $P(X = x) = 0$ for every $x$.

**There is a third kind.** A CDF can have both jumps and continuous increase: a **mixed** random variable. Example (last year's Tutorial 4 Q7): your waiting time is exactly 0 if a taxi is waiting (probability $\frac12$), otherwise it is continuous. Part B8 works it out. The CDF handles all three kinds; PMFs and pdfs each handle only one.

**The handwritten note** is the key intuition for a pdf: the probability of a short interval is approximately **height × width**:
$$P(x<X\le x + h)\approx f_X(x)\,h\qquad(h\text{ small}).$$

### Slide 4/26: The probability density function

> **On the slide.** A continuous random variable has a pdf $f_X(x)$, $x\in\mathbb R$, with units of probability per unit length: $f_X(x) := \lim_{\Delta\to0^+}\frac{P(x<X\le x + \Delta)}\Delta = \lim_{\Delta\to0^+}\frac{F_X(x + \Delta) - F_X(x)}\Delta = \frac{dF_X(x)}{dx}$ (if the derivative exists). Equivalently $F_X(x) = \int_{-\infty}^xf_X(u)\,du$.

$$\boxed{f_X(x) = \frac{d}{dx}F_X(x),\qquad F_X(x) = \int_{-\infty}^xf_X(u)\,du}$$

**"Density" is the right word.** Like mass density (kg per metre), $f_X$ is probability per unit length. So $f_X(x)$ **can exceed 1**: $\mathcal U[0,\frac12]$ has $f = 2$ on its support. What must be at most 1 is the *area* over any set. And $f_X(x)$ is **not** $P(X = x)$, which is 0.

**The two directions** are the fundamental theorem of calculus: differentiate the CDF to get the pdf; integrate the pdf to get the CDF. At points where $F_X$ has a kink (as at the ends of a uniform), the pdf can be defined either way; changing $f$ at finitely many points changes no probability.

### Slide 5/26: Properties of the pdf

> **On the slide.** $P_X(\mathbb R) = \int_{-\infty}^\infty f_X(u)\,du = 1$. $P_X([a,b]) = F_X(b) - F_X(a) = \int_a^bf_X(u)\,du$ (area under the curve). In general $P_X(B) = \int_{u\in B}f_X(u)\,du$. $P_X(\{a\}) = 0$ (no mass at any point). $P_X([a,b]) = P_X((a,b)) = P_X([a,b)) = P_X((a,b])$. *(Handwritten: "pmf vs pdf"; the four intervals underlined.)*

**pmf vs pdf** (the handwritten comparison):

| | Discrete (PMF $p_X$) | Continuous (pdf $f_X$) |
|---|---|---|
| Meaning | $p_X(x) = P(X = x)$ | $f_X(x)\,dx\approx P(x<X\le x + dx)$ |
| Range of values | $0\le p_X\le1$ | $f_X\ge0$, may exceed 1 |
| Normalisation | $\sum_xp_X(x) = 1$ | $\int f_X(x)\,dx = 1$ |
| $P(X\in B)$ | $\sum_{x\in B}p_X(x)$ | $\int_Bf_X(x)\,dx$ |
| $P(X = a)$ | $p_X(a)$ | $0$ |
| Endpoints | matter | do not matter |

**Why $P(X = a) = 0$.** $\{a\}\subseteq(a - \Delta, a]$, so $P(X = a)\le F_X(a) - F_X(a - \Delta)\to0$ as $\Delta\to0$, by continuity of $F_X$. Hence adding or removing endpoints changes nothing, and the four interval probabilities on the slide are equal. (For a discrete or mixed variable they can differ.)

### Slide 6/26: Mean, variance, moments; linear transformations

> **On the slide.** $E[X] = \int_{-\infty}^\infty uf_X(u)\,du$; $E[X^n] = \int u^nf_X(u)\,du$; $E[g(X)] = \int g(u)f_X(u)\,du$; $\operatorname{Var}(X) = E[g(X)]$ with $g(x) = (x - E[X])^2$. For $Y = aX + b$: $E[Y] = aE[X] + b$; $F_Y(y) = F_X(\frac{y-b}a)$ when $a>0$; $F_Y(y) = 1 - F_X(\frac{y-b}a)$ when $a<0$. *(Handwritten: for $a<0$, $\frac d{dy}\big(1 - F_X(\frac{y-b}a)\big) = -\frac1af_X(\frac{y-b}a)$; for $a>0$, $f_Y(y) = f_X(\frac{y-b}a)\frac1a$; a sketch of a CDF rising from 0 to 1.)*

$$\boxed{E[g(X)] = \int_{-\infty}^\infty g(x)\,f_X(x)\,dx,\qquad\operatorname{Var}(X) = E[X^2] - (E[X])^2}$$

Every discrete formula carries over with $\sum\to\int$ and $p_X\to f_X$: LOTUS, linearity, $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$, and the shortcut formula for the variance. The proofs are the same (last year's HW 4 Q6 asks for LOTUS; see Part B9).

**The CDF of $Y = aX + b$, both cases.**

- $a>0$: $F_Y(y) = P(aX + b\le y) = P\big(X\le\frac{y-b}a\big) = F_X\big(\frac{y-b}a\big)$.
- $a<0$: dividing by a negative number flips the inequality: $P\big(X\ge\frac{y-b}a\big) = 1 - F_X\big(\frac{y-b}a\big)$. (For continuous $X$, $\ge$ vs $>$ does not matter.)

**Differentiating (the handwritten part)** with the chain rule, $\frac d{dy}\frac{y-b}a = \frac1a$:
$$a>0:\ f_Y(y) = \frac1af_X\Big(\frac{y-b}a\Big),\qquad a<0:\ f_Y(y) = -\frac1af_X\Big(\frac{y-b}a\Big).$$
Both are $\boxed{f_Y(y) = \frac1{|a|}f_X\big(\frac{y-b}a\big)}$, since $-\frac1a = \frac1{|a|}$ when $a<0$. The $\frac1{|a|}$ makes sense: stretching by $|a|$ spreads the probability over a region $|a|$ times longer, so the density drops by that factor. Lecture 8 (slides 17 to 22) generalises this to any monotone $g$.

### Slide 7/26: Uniform random variable $\mathcal U[a,b]$

> **On the slide.** Real-valued. pdf $f_X(x) = \frac1{b-a}$ for $x\in[a,b]$. CDF: $0$ for $x<a$, $\frac{x-a}{b-a}$ for $x\in[a,b]$, $1$ otherwise. **HW:** verify $E[X] = \frac{a+b}2$ and $\operatorname{Var}(X) = \frac{(b-a)^2}{12}$. *(Handwritten: $\int_a^bu\,f(u)\,du$ and $\int_a^bu^2\,du$.)*

$$\boxed{X\sim\mathcal U[a,b]:\ f_X(x) = \frac1{b-a}\ \text{on }[a,b],\quad F_X(x) = \frac{x-a}{b-a}\ \text{on }[a,b],\quad E[X] = \frac{a+b}2,\quad\operatorname{Var}(X) = \frac{(b-a)^2}{12}}$$

**HW.**
$$E[X] = \int_a^b\frac u{b-a}\,du = \frac{b^2 - a^2}{2(b-a)} = \frac{a+b}2,\qquad E[X^2] = \int_a^b\frac{u^2}{b-a}\,du = \frac{b^3 - a^3}{3(b-a)} = \frac{a^2 + ab + b^2}3 .$$
$$\operatorname{Var}(X) = \frac{a^2 + ab + b^2}3 - \frac{(a+b)^2}4 = \frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12} = \frac{(b-a)^2}{12}.$$
*Shortcut:* $X = a + (b-a)U$ with $U\sim\mathcal U[0,1]$, which has $E[U] = \frac12$, $E[U^2] = \frac13$, $\operatorname{Var}(U) = \frac1{12}$. Then $\operatorname{Var}(X) = (b-a)^2\cdot\frac1{12}$ by slide 6.

**Probabilities are proportional to length:** $P(X\in[c,d]) = \frac{d - c}{b - a}$ for $[c,d]\subseteq[a,b]$. That is "probability = length" from Lecture 1, rescaled.

### Slide 8/26: Pictures of $\mathcal U[a,b]$

> **On the slide.** The CDF (0, then a straight ramp from $a$ to $b$, then 1) and the pdf (a flat box of height $\frac1{b-a}$). *(Handwritten: $\mathcal U[0,1]$; a coin "H $\frac12$, T $\frac12$" drawn as $[0,1]$ split at $\frac12$; and a die: $[0,1]$ cut at $\frac16,\frac26,\dots,\frac56$ with the pieces labelled 1 to 6.)*

**The handwritten idea: simulate anything discrete from one uniform.** Given $U\sim\mathcal U[0,1]$:

- **Coin:** say "H" if $U<\frac12$, else "T". $P(H) = P(U<\frac12) = \frac12$.
- **Die:** report $k$ if $\frac{k-1}6\le U<\frac k6$. Each piece has length $\frac16$, so each face has probability $\frac16$. Compactly, $X = \lceil6U\rceil$ (ignoring the probability-0 event $U = 0$).
- **Any PMF** $p_1, p_2,\dots$: cut $[0,1]$ into consecutive pieces of lengths $p_1, p_2,\dots$ and report the piece $U$ falls in.

This is the **inverse transform method**, taught properly in this year's L14 and L15 (and used in last year's Surprise Quiz Q3 to simulate a Markov chain).

### Slide 9/26: Exponential random variable $\text{Exp}(\lambda)$

> **On the slide.** Non-negative, parameter $\lambda$. pdf $f_X(x) = \lambda e^{-\lambda x}$ for $x\ge0$. CDF $F_X(x) = 1 - e^{-\lambda x}$ for $x\ge0$. $E[X] = \frac1\lambda$, $\operatorname{Var}(X) = \frac1{\lambda^2}$. $E[X^n] = \frac{n!}{\lambda^n}$.

$$\boxed{X\sim\text{Exp}(\lambda):\ f_X(x) = \lambda e^{-\lambda x},\ F_X(x) = 1 - e^{-\lambda x},\ P(X>x) = e^{-\lambda x}\ (x\ge0);\quad E[X] = \tfrac1\lambda,\ \operatorname{Var}(X) = \tfrac1{\lambda^2}}$$

**CDF.** $\int_0^x\lambda e^{-\lambda u}\,du = \big[-e^{-\lambda u}\big]_0^x = 1 - e^{-\lambda x}$. Remember the **tail** $P(X>x) = e^{-\lambda x}$: it is what you use most.

**Moments (the red claims; last year's Quiz 1 Q4 asks for the mean).** Integrate by parts with $u = x^n$, $dv = \lambda e^{-\lambda x}dx$ ($v = -e^{-\lambda x}$):
$$E[X^n] = \Big[-x^ne^{-\lambda x}\Big]_0^\infty + \int_0^\infty nx^{n-1}e^{-\lambda x}\,dx = 0 + \frac n\lambda\int_0^\infty x^{n-1}\lambda e^{-\lambda x}\,dx = \frac n\lambda E[X^{n-1}].$$
Starting from $E[X^0] = 1$: $E[X] = \frac1\lambda$, $E[X^2] = \frac2{\lambda^2}$, and by induction $E[X^n] = \frac{n!}{\lambda^n}$. So $\operatorname{Var}(X) = \frac2{\lambda^2} - \frac1{\lambda^2} = \frac1{\lambda^2}$.

### Slide 10/26: Pictures of $\text{Exp}(\lambda)$

> **On the slide.** CDFs and pdfs for $\lambda = 0.5, 1, 1.5$. *(Handwritten: "cdf", "pdf"; the pdf intercepts at $0.5$, $1$, $1.5$ are marked.)*

### Slide 11/26: Significance of the exponential; memorylessness

> **On the slide.** Building block for continuous-time Markov chains. Memoryless property: $P(X>a + h\mid X>a) = \frac{e^{-\lambda(a+h)}}{e^{-\lambda a}} = e^{-\lambda h} = P(X>h)$. Used extensively in queueing theory for inter-arrival and service times. *(Handwritten: $P(X>a)$; $\int_\ell^{\ell+h}f_X(x)\,dx = P(X\in(\ell,\ell+h])\approx f_X(\ell)h$; "$e^{-\lambda h}$ is independent of $a$"; "B happens after A"; "$P(X = \ell_1)\ne0$ if $\ell_1$ has point mass".)*

$$\boxed{P(X>a + h\mid X>a) = P(X>h)\quad\text{for all }a,h\ge0}$$

**Proof** (last year's Quiz 1 Q4). $\{X>a + h\}\subseteq\{X>a\}$ ("B happens after A": waiting past $a+h$ requires waiting past $a$), so the intersection is just $\{X>a + h\}$:
$$P(X>a + h\mid X>a) = \frac{P(X>a + h)}{P(X>a)} = \frac{e^{-\lambda(a+h)}}{e^{-\lambda a}} = e^{-\lambda h} = P(X>h).\qquad\square$$
The answer does **not depend on $a$** (the circled annotation). A light bulb with an exponential lifetime that has already burnt for 1000 hours is "as good as new".

**The handwritten point-mass remark.** For a continuous $X$, $P(X = \ell) = 0$. If the distribution has a point mass at $\ell_1$ (a mixed variable), then $P(X = \ell_1)\ne0$ and endpoints matter again.

## Part B: extra worked examples and problems

**B1 (last year's HW 4 Q2; geometric to exponential).** $Y\sim$ Geometric$(p)$ with $p = \lambda h$, and $X = Yh$. Show $F_X(x)\to1 - e^{-\lambda x}$ as $h\downarrow0$.

*Solution.* $Y$ counts time slots of length $h$ until the first success, so $X$ is a waiting time. For $x>0$,
$$P(X>x) = P\big(Y>\tfrac xh\big) = (1 - \lambda h)^{\lfloor x/h\rfloor}.$$
Take logs: $\lfloor x/h\rfloor\ln(1 - \lambda h)$. As $h\to0$, $\lfloor x/h\rfloor\approx\frac xh$ and $\ln(1 - \lambda h)\approx-\lambda h$, so the product $\to-\lambda x$. Hence $P(X>x)\to e^{-\lambda x}$ and $F_X(x)\to1 - e^{-\lambda x}$. Tossing a coin with success probability $\lambda h$ every $h$ seconds becomes an exponential clock with rate $\lambda$.

**B2 (last year's HW 4 Q7; Poisson counts give exponential gaps).** Arrivals in $[0,t]$ are Poisson$(\lambda t)$. Find the distribution of $X$, the first arrival time.

*Solution.* $X>t$ iff there is no arrival in $[0,t]$: $P(X>t) = e^{-\lambda t}\frac{(\lambda t)^0}{0!} = e^{-\lambda t}$. So $X\sim\text{Exp}(\lambda)$. This links slide 27 of Deck 2 to slide 11 here: in a Poisson process the gaps are exponential.

**B3 (last year's HW 4 Q5; the Laplace distribution).** $f_X(x) = \frac1{2b}e^{-|x-\mu|/b}$. Show it is a pdf; find $E[X]$ and $\operatorname{Var}(X)$.

*Solution.* Substitute $y = x - \mu$: the density of $Y$ is symmetric, two half-exponentials with rate $\frac1b$ glued at 0. $\int = 2\cdot\frac1{2b}\int_0^\infty e^{-y/b}dy = 1$. ✓ By symmetry $E[Y] = 0$, so $E[X] = \mu$. $\operatorname{Var}(X) = E[Y^2] = 2\cdot\frac1{2b}\int_0^\infty y^2e^{-y/b}dy = \frac1b\cdot2b^3 = 2b^2$ (using $\int_0^\infty y^2e^{-y/b}dy = \frac{2!}{(1/b)^3}$).

**B4 (last year's Tutorial 4 Q1; Gamma/Erlang).** $f_X(x) = cx^{n-1}e^{-\lambda x}$ for $x>0$. Find $c$, $E[X]$, $\operatorname{Var}(X)$, and a guess for a sum of i.i.d. variables with this distribution.

*Solution.* $\int_0^\infty x^{n-1}e^{-\lambda x}dx = \frac{(n-1)!}{\lambda^n}$, so $c = \frac{\lambda^n}{(n-1)!}$. Then $E[X] = c\frac{n!}{\lambda^{n+1}} = \frac n\lambda$ and $E[X^2] = c\frac{(n+1)!}{\lambda^{n+2}} = \frac{n(n+1)}{\lambda^2}$, so $\operatorname{Var}(X) = \frac n{\lambda^2}$. Mean and variance are $n$ times those of Exp$(\lambda)$, which suggests $X = X_1 + \dots + X_n$ with i.i.d. $X_i\sim\text{Exp}(\lambda)$. That is true (proved with MGFs in L14): the time of the $n$-th arrival.

**B5 (last year's HW 4 Q11; Rayleigh).** $f(x) = xe^{-x^2/2}$ for $x>0$. Find $E[X]$ and $E[X^2]$.

*Solution.* $E[X^2] = \int_0^\infty x^3e^{-x^2/2}dx$. Substitute $t = x^2/2$ ($dt = x\,dx$): $\int_0^\infty2te^{-t}dt = 2$. For $E[X] = \int_0^\infty x^2e^{-x^2/2}dx$, note this is half of $\int_{-\infty}^\infty x^2e^{-x^2/2}dx = \sqrt{2\pi}$ (the variance of a standard normal times $\sqrt{2\pi}$, Lecture 8). So $E[X] = \sqrt{\pi/2}\approx1.2533$.

**B6 (last year's Tutorial 4 Q2; rounding an exponential).** $X\sim\text{Exp}(1)$ and $N = \lceil X\rceil$. Find the PMF and $E[N]$ in two ways.

*Solution.* $P(N = n) = P(n - 1<X\le n) = e^{-(n-1)} - e^{-n} = (e^{-1})^{n-1}(1 - e^{-1})$, so $N\sim$ Geometric$(1 - e^{-1})$ and $E[N] = \frac1{1 - e^{-1}} = \frac e{e - 1}\approx1.582$. Tail-sum check: $P(N>n) = P(X>n) = e^{-n}$, and $\sum_{n\ge0}e^{-n} = \frac1{1 - e^{-1}}$. ✓ Rounding up an exponential gives a geometric: the discrete and continuous memoryless laws match.

**B7 (last year's Tutorial 4 Q3; tail-integral formula).** For $X\ge0$ and $p>0$, show $E[X^p] = \int_0^\infty ps^{p-1}P(X\ge s)\,ds$.

*Solution.* Write $x^p = \int_0^xps^{p-1}ds = \int_0^\infty ps^{p-1}\mathbf 1\{s\le x\}\,ds$. Then swap the order of integration (allowed since everything is non-negative):
$$E[X^p] = \int_0^\infty\Big(\int_0^\infty ps^{p-1}\mathbf 1\{s\le x\}\,ds\Big)f_X(x)\,dx = \int_0^\infty ps^{p-1}\underbrace{\int_s^\infty f_X(x)\,dx}_{P(X\ge s)}ds .$$
With $p = 1$: $E[X] = \int_0^\infty P(X>s)\,ds$, the continuous tail-sum formula. For Exp$(\lambda)$: $\int_0^\infty e^{-\lambda s}ds = \frac1\lambda$. ✓

**B8 (last year's Tutorial 4 Q7; a mixed random variable).** With probability $\frac12$ a taxi is waiting ($X = 0$). Otherwise the next taxi comes at $T\sim\mathcal U[0,8]$ and a bus comes at exactly 5; you take the first. Find $F_X$, the point masses and $E[X]$.

*Solution.* Without a waiting taxi, $X = \min(T,5)$. For $0\le x<5$: $F_X(x) = \frac12 + \frac12\cdot\frac x8$. At $x = 5$ the CDF jumps to 1, because $\min(T,5) = 5$ whenever $T\ge5$: $P(X = 5) = \frac12\cdot\frac38 = \frac3{16}$. So
$$F_X(x) = \begin{cases}0 & x<0\\ \frac12 + \frac x{16} & 0\le x<5\\ 1 & x\ge5\end{cases},\qquad\text{point masses }P(X = 0) = \tfrac12,\ P(X = 5) = \tfrac3{16},$$
and density $\frac1{16}$ on $(0,5)$. Check: $\frac12 + \frac5{16} + \frac3{16} = 1$. ✓ Mean: add the discrete and continuous parts:
$$E[X] = 0\cdot\tfrac12 + 5\cdot\tfrac3{16} + \int_0^5\tfrac x{16}\,dx = \tfrac{15}{16} + \tfrac{25}{32} = \tfrac{55}{32}\approx1.72\text{ minutes}.$$

**B9 (last year's HW 4 Q6; LOTUS for continuous $X$).** Show $E[g(X)] = \int g(x)f_X(x)\,dx$, at least for $g\ge0$.

*Solution.* Use the continuous tail formula (B7 with $p = 1$) for the non-negative random variable $Y = g(X)$, then swap integrals:
$$E[Y] = \int_0^\infty P(g(X)>y)\,dy = \int_0^\infty\int_{\{x:g(x)>y\}}f_X(x)\,dx\,dy = \int f_X(x)\int_0^{g(x)}dy\,dx = \int g(x)f_X(x)\,dx .$$
For general $g$, split $g = g^+ - g^-$ into its positive and negative parts.

**B10 (last year's Midsem A Q3; minimum of exponentials).** $X, Y, Z$ independent, Exp$(\lambda_1)$, Exp$(\lambda_2)$, Exp$(\lambda_3)$. Find the distribution of $W = \min(X,Y,Z)$.

*Solution.* The minimum exceeds $w$ iff **all three** do. For $w\ge0$:
$$P(W>w) = P(X>w)P(Y>w)P(Z>w) = e^{-(\lambda_1 + \lambda_2 + \lambda_3)w}.$$
So $W\sim\text{Exp}(\lambda_1 + \lambda_2 + \lambda_3)$, with $f_W(w) = (\lambda_1 + \lambda_2 + \lambda_3)e^{-(\lambda_1+\lambda_2+\lambda_3)w}$. Competing exponential clocks: rates add. (For the **maximum** use $P(\max\le w) = \prod P(X_i\le w)$ instead; see B11.)

**B11 (last year's HW 4 Q9; the maximum).** Daily rainfall $X_1, X_2, X_3$ i.i.d. Exp$(\lambda)$. (a) $P(\text{at least one day exceeds }1/\lambda)$. (b) CDF, pdf and mean of $M = \max X_i$. (c) $E[N]$, $N$ = number of days above $1/\lambda$.

*Solution.* (a) $P(X_i>\frac1\lambda) = e^{-1}$, so $1 - (1 - e^{-1})^3\approx0.747$. (b) $F_M(m) = (1 - e^{-\lambda m})^3$ and $f_M(m) = 3\lambda e^{-\lambda m}(1 - e^{-\lambda m})^2$ for $m\ge0$. Using the tail integral, $E[M] = \int_0^\infty\big[1 - (1 - e^{-\lambda m})^3\big]dm = \int_0^\infty\big(3e^{-\lambda m} - 3e^{-2\lambda m} + e^{-3\lambda m}\big)dm = \frac1\lambda\big(3 - \frac32 + \frac13\big) = \frac{11}{6\lambda}$. (c) $N\sim B(3, e^{-1})$, so $E[N] = \frac3e\approx1.10$.


# Lecture 8: The Gaussian, and functions of a continuous random variable (Deck 3, slides 12 to 23)

**Big picture.** The **Gaussian (normal)** distribution is the most important in the course: it is what sums of many small independent effects look like (the CLT, L18). Its CDF has no closed form, so we standardise to $\mathcal N(0,1)$ and use the table of $\Phi$. The second half answers: if $Y = g(X)$, what is the pdf of $Y$? For monotone $g$ there is a formula, $f_Y(y) = f_X(h(y))\,|h'(y)|$ with $h = g^{-1}$. For anything else, go through the CDF.

## Part A: the slides

### Slide 12/26: The Gaussian random variable $\mathcal N(\mu,\sigma^2)$

> **On the slide.** Real-valued with two parameters $\mu$, $\sigma$. pdf $f_X(x) = \frac1{\sqrt{2\pi\sigma^2}}e^{-\frac12(\frac{x-\mu}\sigma)^2}$ for $x\in\mathbb R$. **Verify:** $\int f_X = 1$, $E[X] = \mu$, $\operatorname{Var}(X) = \sigma^2$. Plots of pdfs and CDFs for $(\mu,\sigma^2) = (0,0.2), (0,1), (0,5), (-2,0.5)$. *(Handwritten: $E[X^2] - E[X]^2$; $F_X(x) = \int_{-\infty}^xf_X(u)\,du$; $\int x f_X(x)\,dx = \mu$; $E[(X-\mu)^2]$; the peak of each curve circled.)*

$$\boxed{f_X(x) = \frac1{\sqrt{2\pi}\,\sigma}\exp\Big(-\frac{(x-\mu)^2}{2\sigma^2}\Big),\qquad E[X] = \mu,\qquad\operatorname{Var}(X) = \sigma^2}$$

**Verifying the three claims.** Substitute $z = \frac{x-\mu}\sigma$ ($dx = \sigma\,dz$). This turns every integral into one about $\varphi(z) = \frac1{\sqrt{2\pi}}e^{-z^2/2}$:

1. $\int f_X(x)\,dx = \int\varphi(z)\,dz = 1$ (slide 13 proves this).
2. $E[X] = \int(\mu + \sigma z)\varphi(z)\,dz = \mu\cdot1 + \sigma\int z\varphi(z)\,dz = \mu$, because $z\varphi(z)$ is an odd function, so its integral over $\mathbb R$ is 0.
3. $\operatorname{Var}(X) = E[(X - \mu)^2] = \sigma^2\int z^2\varphi(z)\,dz$. Integrate by parts with $u = z$ and $dv = z\varphi(z)\,dz$ (so $v = -\varphi(z)$, since $\varphi'(z) = -z\varphi(z)$):
$$\int z^2\varphi(z)\,dz = \Big[-z\varphi(z)\Big]_{-\infty}^\infty + \int\varphi(z)\,dz = 0 + 1 = 1 .$$
So $\operatorname{Var}(X) = \sigma^2$. (Last year's Tutorial 1 Calculus Q3 is the same computation: $I_1 = \int x^2e^{-x^2}dx = \frac{\sqrt\pi}2$.)

### Slide 13/26: The standard normal $\mathcal N(0,1)$

> **On the slide.** $\mu = 0$, $\sigma = 1$: $f_X(x) = \frac1{\sqrt{2\pi}}e^{-x^2/2}$. *What is $\int_{-\infty}^\infty e^{-x^2/2}dx$? How do you even solve this?* ($=\sqrt{2\pi}$.) The CDF is $\Phi(x) = \frac1{\sqrt{2\pi}}\int_{-\infty}^xe^{-t^2/2}dt$. Its values are tabulated (Fig. 3.10 in Bertsekas). Wikipedia: Gaussian function. *(Handwritten: $\Phi = F_X$; $X\sim\mathcal N(\mu,\sigma^2)$.)*

**The integral (the polar-coordinates trick).** Let $I = \int_{-\infty}^\infty e^{-x^2/2}dx$. $e^{-x^2/2}$ has no elementary antiderivative, so square $I$ and turn it into a double integral:
$$I^2 = \int_{-\infty}^\infty\int_{-\infty}^\infty e^{-(x^2 + y^2)/2}\,dx\,dy = \int_0^{2\pi}\int_0^\infty e^{-r^2/2}\,r\,dr\,d\theta = 2\pi\Big[-e^{-r^2/2}\Big]_0^\infty = 2\pi .$$
(Polar coordinates: $x^2 + y^2 = r^2$ and $dx\,dy = r\,dr\,d\theta$. The extra $r$ is exactly what makes the inner integral easy.) So $I = \sqrt{2\pi}$ and $\varphi$ integrates to 1.

**Using the $\Phi$ table.** Every normal reduces to the standard one:
$$\boxed{X\sim\mathcal N(\mu,\sigma^2)\ \Longrightarrow\ Z = \frac{X - \mu}\sigma\sim\mathcal N(0,1),\qquad P(X\le x) = \Phi\Big(\frac{x - \mu}\sigma\Big)}$$
(by slide 14). The table only lists $z\ge0$. For negative $z$ use symmetry: $\Phi(-z) = 1 - \Phi(z)$.

**Values worth memorising.** $\Phi(1)\approx0.8413$, $\Phi(1.645)\approx0.95$, $\Phi(1.96)\approx0.975$, $\Phi(2)\approx0.9772$, $\Phi(3)\approx0.99865$. The **68–95–99.7 rule**:
$$P(|X - \mu|\le\sigma)\approx0.683,\qquad P(|X - \mu|\le2\sigma)\approx0.954,\qquad P(|X - \mu|\le3\sigma)\approx0.997 .$$
These come from $P(|Z|\le k) = 2\Phi(k) - 1$. The first is last year's Tutorial 4 Q4 (sensor readings within one $\sigma$ are accepted with probability $0.6827$).

**Worked example (Bertsekas Example 3.7).** Annual snowfall is $\mathcal N(60, 20^2)$ inches. $P(\text{at least 80}) = P\big(Z\ge\frac{80-60}{20}\big) = 1 - \Phi(1) = 0.1587$.

### Slide 14/26: Normality is preserved under linear transformations

> **On the slide.** If $X\sim\mathcal N(\mu,\sigma^2)$ then $Y = aX + b$ is normal with $E[Y] = a\mu + b$ and variance $a^2\sigma^2$ (to be proved later). *(Handwritten: **HW**: $Y\sim\mathcal N(a\mu + b, a^2\sigma^2)$, find $f_Y(y)$; also "$E[Y] = a\mu + b$, $\operatorname{Var}(Y) = a^2\sigma^2$" and "$\mathcal U[a,b]$" in the margin.)*

$$\boxed{X\sim\mathcal N(\mu,\sigma^2),\ a\ne0\ \Longrightarrow\ aX + b\sim\mathcal N(a\mu + b,\ a^2\sigma^2)}$$

**HW proof** (this was last year's Midsem A Q5). From Lecture 7, slide 6, $f_Y(y) = \frac1{|a|}f_X\big(\frac{y-b}a\big)$. Substitute the Gaussian pdf:
$$f_Y(y) = \frac1{|a|}\cdot\frac1{\sqrt{2\pi}\sigma}\exp\Big(-\frac{(\frac{y-b}a - \mu)^2}{2\sigma^2}\Big) = \frac1{\sqrt{2\pi}\,|a|\sigma}\exp\Big(-\frac{(y - b - a\mu)^2}{2a^2\sigma^2}\Big),$$
using $\big(\frac{y-b}a - \mu\big)^2 = \frac{(y - b - a\mu)^2}{a^2}$. This is exactly the $\mathcal N(a\mu + b, a^2\sigma^2)$ pdf (with standard deviation $|a|\sigma$). $\square$

The mean and variance alone ($a\mu + b$ and $a^2\sigma^2$) follow for **any** $X$ from linearity. What is special about the normal is that the **shape** stays normal. The margin note "$\mathcal U[a,b]$" makes the same point for the uniform: a linear function of a uniform is uniform ($a + (b-a)U\sim\mathcal U[a,b]$). The exponential is preserved under scaling only: $cX\sim\text{Exp}(\lambda/c)$ for $c>0$, but $X + 1$ is not exponential.

### Slide 15/26: Significance of the Gaussian

> **On the slide.** Key role in the CLT: $\frac1n\sum_{i=1}^nX_i\sim\mathcal N(\mu,\frac{\sigma^2}n)$ (approximately) for any $X_i$ with mean $\mu$ and variance $\sigma^2$. Building block for Gaussian vectors and Gaussian processes. GPs are used in Bayesian optimisation; Brownian motion (a GP) in finance; GP regression and Gaussian mixture models in ML.

### Slide 16/26: A list of distributions

> **On the slide.** Wikipedia: List of probability distributions. Important ones: Beta, Gamma, Erlang, Logistic, Weibull.

None of these is examined in Lectures 1 to 8, but two appear in last year's homework: the **Gamma**$(n,\lambda)$ pdf $\frac{\lambda^n}{(n-1)!}x^{n-1}e^{-\lambda x}$ (Tutorial 4 Q1, Lecture 7 B4), which is the time of the $n$-th arrival (the **Erlang**), and the **Weibull** (a lifetime model; last year's HW 6 Q4). The Laplace and Rayleigh distributions of HW 4 are in Lecture 7, B3 and B5.

### Slide 17/26: Functions of a continuous random variable, the linear case

> **On the slide.** $Y = aX + b$, $X$ continuous. *What are $F_Y$ and $f_Y$?* $F_Y(y) = P(aX + b\le y) = F_X(\frac{y-b}a)$ if $a>0$, so $f_Y(y) = \frac1af_X(\frac{y-b}a)$. $F_Y(y) = 1 - F_X(\frac{y-b}a)$ if $a<0$, so $f_Y(y) = -\frac1af_X(\frac{y-b}a)$. In general $f_Y(y) = \frac1{|a|}f_X(\frac{y-b}a)$.

This repeats Lecture 7, slide 6 (see the explanation there). The point of repeating it: the two-case CDF argument is the template for any monotone $g$.

### Slide 18/26: A guess for monotone $g$

> **On the slide.** Boxed: for $Y = aX + b$, $f_Y(y) = \frac1{|a|}f_X(\frac{y-b}a)$. *What if $Y = g(X)$ with $g$ continuous, differentiable and monotone? Any guess?* Since $g$ is monotone and continuous it is invertible; let $h$ be the inverse, so $h(Y) = X$. Boxed: $f_Y(y) = \big|\frac{dh}{dy}(y)\big|f_X(h(y))$. *(Handwritten: an arrow matching $\frac1{|a|}$ to $|\frac{dh}{dy}|$ and $\frac{y-b}a$ to $h(y)$, with "$h(y) = \frac{y-b}a$"; sketches of increasing and non-monotone curves.)*

The handwritten arrows show how the linear formula *is* the general one: for $g(x) = ax + b$, the inverse is $h(y) = \frac{y-b}a$, with $h'(y) = \frac1a$. So $\frac1{|a|} = |h'(y)|$ and $\frac{y-b}a = h(y)$.

### Slide 19/26: The theorem and the start of the proof

> **On the slide.** **Theorem.** If $Y = g(X)$ with $g$ monotone, continuous and differentiable, then $f_Y(y) = f_X(h(y))\,|\frac{dh}{dy}(y)|$, where $h = g^{-1}$. *Proof.* $g$ is monotone and continuous, so invertible with inverse $h$, and $X = h(Y)$. $F_Y(y) = P(g(X)\le y)$. *Is $P(g(X)\le y) = P(X\le h(y))$ always? Are the events $\{g(X)\le y\}$ and $\{X\le h(y)\}$ the same?* If they are, the probabilities are equal. *(Handwritten: "two events are same if $g$ is ↑; they are complements if $g$ is ↓".)*

$$\boxed{f_Y(y) = f_X\big(h(y)\big)\,\Big|\frac{dh}{dy}(y)\Big|,\qquad h = g^{-1}}$$

The whole proof rests on the question in the slide: **when is $g(X)\le y$ the same event as $X\le h(y)$?** The handwritten answer is the key. If $g$ is increasing, applying $h$ (also increasing) to both sides preserves the inequality, so the events are identical. If $g$ is decreasing, applying $h$ flips it: $g(X)\le y\iff X\ge h(y)$, the complement of $\{X<h(y)\}$.

### Slide 20/26: The picture

> **On the slide.** Two graphs: for increasing $g$, the event $\{g(X)\le y\}$ is $\{X\le h(y)\}$ (the $x$-axis to the left of $h(y)$); for decreasing $g$, it is $\{X\ge h(y)\}$ (to the right).

### Slide 21/26: Case 1, $g$ non-decreasing

> **On the slide.** $F_Y(y) = P(g(X)\le y) = P(X\le h(y)) = F_X(h(y))$. $f_Y(y) = \frac d{dy}F_X(h(y)) = f_X(h(y))\frac{dh}{dy}(y)$, where $\frac{dh}{dy}\ge0$ since $h$ is also non-decreasing. Rewritten: $f_Y(y) = f_X(h(y))|\frac{dh}{dy}(y)|$.

The derivative step is the chain rule: $\frac d{dy}F_X(h(y)) = F_X'(h(y))\,h'(y) = f_X(h(y))\,h'(y)$. Since $h'\ge0$, it equals $|h'|$.

### Slide 22/26: Case 2, $g$ non-increasing; the non-monotone HW

> **On the slide.** $F_Y(y) = P(g(X)\le y) = P(X>h(y)) = 1 - F_X(h(y))$. $f_Y(y) = -\frac d{dy}F_X(h(y)) = -f_X(h(y))\frac{dh}{dy}(y)$, where $\frac{dh}{dy}\le0$. Rewritten: $f_Y(y) = f_X(h(y))|\frac{dh}{dy}(y)|$. $\square$ **HW:** what if $g$ is not monotone? *Q: if $Y = X^2$, what is $f_Y(y)$ in terms of $f_X$?* *(Handwritten: $Y = \log(X)$, $Y = ax^2 + bx$.)*

Since $h'\le0$, $-h' = |h'|$, and both cases give the same formula. $\square$

**Q: $Y = X^2$.** $g(x) = x^2$ is not monotone on $\mathbb R$, so go back to the CDF. For $y>0$:
$$F_Y(y) = P(X^2\le y) = P(-\sqrt y\le X\le\sqrt y) = F_X(\sqrt y) - F_X(-\sqrt y).$$
Differentiate (chain rule, $\frac d{dy}\sqrt y = \frac1{2\sqrt y}$):
$$\boxed{f_Y(y) = \frac{f_X(\sqrt y) + f_X(-\sqrt y)}{2\sqrt y},\qquad y>0}$$
and $f_Y(y) = 0$ for $y<0$. *Example:* $X\sim\mathcal N(0,1)$ gives $f_Y(y) = \frac1{\sqrt{2\pi y}}e^{-y/2}$ for $y>0$, the **chi-square distribution with 1 degree of freedom**. *Example:* $X\sim\mathcal U[-1,1]$ ($f_X = \frac12$) gives $f_Y(y) = \frac1{2\sqrt y}$ on $(0,1]$. Check: $\int_0^1\frac{dy}{2\sqrt y} = 1$. ✓

**HW: general non-monotone $g$** (last year's Tutorial 4 Q6). If the equation $g(x) = y$ has roots $x_1(y), x_2(y),\dots$, each with $g'(x_i)\ne0$, then
$$\boxed{f_Y(y) = \sum_i\frac{f_X(x_i)}{|g'(x_i)|}}$$
*Why.* Near each root, $g$ is monotone, and the event $\{y<Y\le y + dy\}$ is a union of small disjoint intervals around the roots, of lengths $\frac{dy}{|g'(x_i)|}$. Adding their probabilities $f_X(x_i)\frac{dy}{|g'(x_i)|}$ and dividing by $dy$ gives the formula. (Note $\frac1{|g'(x_i)|} = |h_i'(y)|$ for the local inverse $h_i$, so each term is the monotone formula on one branch.) Check with $Y = X^2$: roots $\pm\sqrt y$, $|g'(\pm\sqrt y)| = 2\sqrt y$. ✓

**The handwritten examples.**

- $Y = \log X$ (for $X>0$) is monotone: $h(y) = e^y$, $h'(y) = e^y$, so $f_Y(y) = f_X(e^y)e^y$. For $X\sim\mathcal U(0,1]$: $f_Y(y) = e^y$ for $y\le0$, so $-\log X\sim\text{Exp}(1)$.
- $Y = aX^2 + bX$ is a parabola, not monotone: two roots $x_\pm = \frac{-b\pm\sqrt{b^2 + 4ay}}{2a}$ for $y$ beyond the vertex, with $|g'(x_\pm)| = |2ax_\pm + b| = \sqrt{b^2 + 4ay}$. Use the sum formula, or complete the square and reduce to the $X^2$ case.

### Slide 23/26: The CDF of a discrete random variable (board work)

> **On the slide.** Title "Induced measure $P_X$ and CDF" with handwriting only: $X:\Omega\to\Omega'$. Option 1: $\Omega' = \{a_1,a_2,a_3\}$, a PMF drawn as three spikes. Option 2: $\Omega'\subseteq\mathbb R$, the CDF drawn as a staircase with jumps at $a_3<a_1<a_2$ and the question "$P(X\le a_3)$?".

## Part B: extra worked examples and problems

**B1 (last year's Quiz 1 Q1).** $X\sim\mathcal U[a,b]$ and $Y = e^{2X}$. Find the pdf and CDF of $Y$.

*Solution.* $g(x) = e^{2x}$ is increasing, so $Y\in[e^{2a}, e^{2b}]$, with $h(y) = \frac{\ln y}2$ and $h'(y) = \frac1{2y}$. *CDF route:* for $y$ in the range,
$$F_Y(y) = P\Big(X\le\frac{\ln y}2\Big) = \frac{\frac{\ln y}2 - a}{b - a} = \frac{\ln y - 2a}{2(b-a)}.$$
*Formula route:* $f_Y(y) = f_X(h(y))\,|h'(y)| = \frac1{b-a}\cdot\frac1{2y}$. Both give
$$f_Y(y) = \frac1{2y(b-a)},\quad e^{2a}\le y\le e^{2b};\qquad F_Y(y) = 0\ (y<e^{2a}),\quad\frac{\ln y - 2a}{2(b-a)}\ (\text{in range}),\quad1\ (y>e^{2b}).$$
The official solution writes out the support for both; do the same.

**B2 (inverse transform for the exponential).** $U\sim\mathcal U(0,1)$ and $Y = -\frac1\lambda\ln U$. Find the distribution of $Y$.

*Solution.* **CDF method.** For $y\ge0$, since $-\frac1\lambda\ln u$ is decreasing,
$$P(Y\le y) = P\Big(-\tfrac1\lambda\ln U\le y\Big) = P\big(\ln U\ge-\lambda y\big) = P\big(U\ge e^{-\lambda y}\big) = 1 - e^{-\lambda y}.$$
So $Y\sim\text{Exp}(\lambda)$.

(Equivalently, by the change of variables formula: $g(u) = -\frac1\lambda\ln u$ is decreasing from $(0,1)$ onto $(0,\infty)$, with inverse $h(y) = e^{-\lambda y}$ and $|h'(y)| = \lambda e^{-\lambda y}$, so $f_Y(y) = f_U(h(y))\,|h'(y)| = \lambda e^{-\lambda y}$.)

This is how computers generate exponential samples. Since $1 - U$ is also uniform, it is the inverse CDF $F^{-1}(u) = -\frac1\lambda\ln(1-u)$ in disguise.

**B3 (last year's HW 4 Q3; a projectile).** $d = \frac{v^2}g\sin2\varphi$ with $\varphi\sim\mathcal U[0,\frac\pi2]$. Find the pdf of $d$ and $P(d\le d_0)$.

*Solution.* Let $D = \frac{v^2}g$ and $\theta = 2\varphi\sim\mathcal U[0,\pi]$, so $d = D\sin\theta$, which rises then falls: not monotone. Use the CDF. For $0\le d_0\le D$, $\sin\theta\le\frac{d_0}D$ iff $\theta\le\alpha$ or $\theta\ge\pi - \alpha$, where $\alpha = \arcsin\frac{d_0}D$:
$$P(d\le d_0) = \frac{\alpha + \alpha}\pi = \frac2\pi\arcsin\frac{d_0}D,\qquad f_d(x) = \frac2\pi\cdot\frac1{\sqrt{D^2 - x^2}},\quad0\le x<D .$$
The density blows up near the maximum range $D$: many angles near $45°$ give nearly the maximum distance.

**B4 (last year's HW 4 Q12; a call option).** $Z\sim\mathcal N(0,1)$ and $c\ge0$. Find $E[\max(Z - c, 0)]$ in terms of $\Phi$ and $\varphi$.

*Solution.* LOTUS, with the integrand zero for $z<c$:
$$E[(Z - c)^+] = \int_c^\infty(z - c)\varphi(z)\,dz = \int_c^\infty z\varphi(z)\,dz - c\big(1 - \Phi(c)\big) = \boxed{\varphi(c) - c\big(1 - \Phi(c)\big)},$$
using $\int_c^\infty z\varphi(z)dz = [-\varphi(z)]_c^\infty = \varphi(c)$ (since $\varphi' = -z\varphi$). At $c = 0$ this is $\varphi(0) = \frac1{\sqrt{2\pi}}\approx0.399$.

**B5 (last year's HW 4 Q10; breaking a stick).** A unit stick is broken at $U\sim\mathcal U[0,1]$. (a) Distribution and mean of the longer piece $L$. (b) Distribution of $R$ = shorter/longer; $E[R]$, $E[1/R]$. (c) Break the longer piece again uniformly. Probability that the three pieces form a triangle?

*Solution.* (a) $L = \max(U, 1-U)\in[\frac12,1]$. $P(L\le\ell) = P(1 - \ell\le U\le\ell) = 2\ell - 1$, so $L\sim\mathcal U[\frac12,1]$, $f_L = 2$, $E[L] = \frac34$.
(b) $R = \frac{1-L}L$ is a decreasing function of $L$. $P(R\le r) = P\big(L\ge\frac1{1+r}\big) = 2 - \frac2{1+r} = \frac{2r}{1+r}$ for $0\le r\le1$, so $f_R(r) = \frac2{(1+r)^2}$. Then $E[R] = \int_0^1\frac{2r}{(1+r)^2}dr = 2\ln2 - 1\approx0.386$, and $E[1/R] = \int_0^1\frac2{r(1+r)^2}dr = \infty$ (the integrand behaves like $\frac2r$ near 0).
(c) The pieces are $1 - L$, $LV$, $L(1-V)$ with $V\sim\mathcal U[0,1]$. A triangle needs every piece below $\frac12$. $1 - L\le\frac12$ always. The other two need $1 - \frac1{2L}<V<\frac1{2L}$, an interval of length $\frac1L - 1$. Average over $L$:
$$P = \int_{1/2}^1\Big(\frac1\ell - 1\Big)2\,d\ell = 2\ln2 - 1\approx0.386 .$$

**B6 (last year's HW 4 Q8; darts).** Darts land uniformly on a disc of radius $r$; $X$ = distance from the centre. (a) pdf, mean, variance of $X$. (b) Score $S = 1/X$ if $X\le t$, else 0. Find the CDF of $S$. Is $S$ continuous?

*Solution.* (a) Probability = area ratio: $F_X(x) = \frac{\pi x^2}{\pi r^2} = \frac{x^2}{r^2}$ on $[0,r]$, so $f_X(x) = \frac{2x}{r^2}$. $E[X] = \frac{2r}3$, $E[X^2] = \frac{r^2}2$, $\operatorname{Var}(X) = \frac{r^2}{18}$. (Not uniform: there is more area far from the centre.)
(b) $S = 0$ with probability $P(X>t) = 1 - \frac{t^2}{r^2}$. Otherwise $S\ge\frac1t$. For $s\ge\frac1t$: $P(S\le s) = P(S = 0) + P(\frac1s\le X\le t) = 1 - \frac{t^2}{r^2} + \frac{t^2 - s^{-2}}{r^2} = 1 - \frac1{r^2s^2}$. So
$$F_S(s) = \begin{cases}0 & s<0\\ 1 - \frac{t^2}{r^2} & 0\le s<\frac1t\\ 1 - \frac1{r^2s^2} & s\ge\frac1t.\end{cases}$$
$S$ is **not** continuous: it has a point mass at 0. It is a mixed random variable.

**B7 (last year's Tutorial 4 Q4; using the table).** A sensor reading $X\sim\mathcal N(\mu,\sigma^2)$ is accepted if it is in $[\mu - \sigma,\mu + \sigma]$. Acceptance probability?

*Solution.* $P(|Z|\le1) = 2\Phi(1) - 1 = 2(0.8413) - 1 = 0.6827$.


# Practice map, formula sheet and self-test

## 1. Practice map: last year's questions, and where each is solved

Last year's Homeworks 1 to 4, Tutorials 1 to 4, Quiz 1 and part of the Midsem cover the same material as this year's Lectures 1 to 8. The tables say where each question is worked out in these notes, so you can try it first and then check. Questions that need later material (joint distributions, conditional expectation, covariance) are marked "later", with the answer for self-checking.

**How to read the "Solved in" column.** "L3 B6" means problem B6 in Lecture 3's Part B (Lecture 3 has three Part Bs: conditional probability and independence in part 2, counting in part 3). "L6 slide 25" means the explanation under that slide in Part A.

### Sample spaces, σ-algebras and the axioms (L1, L2)

| Question | Topic | Solved in |
|---|---|---|
| HW1 Sets Q1 | $A\cup B = A\cup C$ and $A\cap B = A\cap C$ imply $B = C$ | L1 B3 |
| Tutorial 1 Sets Q1 | Bonferroni's inequality | L2 slide 32 |
| HW2 Q1 | sample space and σ-algebra, die until even | L2 B1 |
| HW2 Q5 | half-lines generate $\mathcal B(\mathbb R)$ | L2 B5 |
| HW2 Q6 | σ-algebra generated by a partition | L2 B2 |
| Tutorial 2 Q2 | finite/co-finite sets are not a σ-algebra | L2 B3 |
| Tutorial 2 Q4 | closure under $\cap$, $\setminus$, $\Delta$ | L2 slide 24 |
| Tutorial 2 Q7 | $\{A : P(A)\in\{0,1\}\}$ is a σ-algebra | L2 B4 |
| Tutorial 2 Q1 | all six faces in $n$ rolls (inclusion–exclusion) | L2 B6 |
| Quiz 1 Q3 | define random variable and Borel σ-algebra; relate $P$, $P_X$, $F_X$ | L4 slide 8 |

### Conditional probability, Bayes, independence (L3 parts 1 and 2)

| Question | Topic | Solved in |
|---|---|---|
| HW2 Q2 | jerseys: total probability and Bayes | L3 B6 |
| HW2 Q3 | Alice's drawers | L3 B5 |
| HW2 Q4 | coffee, rain and crowds | L3 B4 |
| HW2 Q7 | channel tree diagram | L3 B3 |
| HW2 Q8 | chain rule for $n$ events | L3 slide 40 |
| HW2 Q9 | nuclear alarm (base rates) | L3 B1 |
| HW2 Q10 | retirement plan and insurance | L3 B7 |
| HW2 Q11 | two independent projects | L3 B8 |
| HW2 Q12 | series/parallel reliability | L3 B9 |
| Tutorial 2 Q3 | rare disease test | L3 B2 |
| Tutorial 2 Q5 | ring toss with $P(T\ge t) = \frac5{4+t}$ | L3 B11 |
| Tutorial 2 Q6 | dice duel, A needs 6, B needs 7 | L3 B12 |
| Tutorial 2 Q8 | plane engines | L3 B10 |
| Tutorial 1 Q3 | two friends meet (geometric probability) | L3 B9 (counting part) |

### Counting (L3 part 3)

| Question | Topic | Solved in |
|---|---|---|
| HW1 Q1 to Q5, Tutorial 1 Q1 | permutations and combinations | L3 B1 (counting part) |
| HW1 Q6 | derangements with a constraint (53) | L3 B4 (counting part) |
| HW1 Q7 | $\sum r^2\binom{15}r/\binom{15}{r-1} = 680$ | L3 B3 (counting part) |
| HW1 Q8 | last black ball on draw 7 | L3 B2 (counting part) |
| Tutorial 1 Q2 | pigeonhole socks (23) | L3 B5 (counting part) |

### Discrete random variables (L4 to L6)

| Question | Topic | Solved in |
|---|---|---|
| HW3 Q1 | normalise a PMF, mean, variance | L5 B1 |
| HW3 Q2 | flawless chips (shifted binomial) | L6 B2 |
| HW3 Q3 | umbrella matching | L6 B5 |
| HW3 Q4 | alternating colours | not worked; self-check below |
| HW3 Q5 | $Y = |X - 4|$ for a geometric | L6 B1 |
| HW3 Q6, Tutorial 3 Q4 | medians | L5 B6 |
| HW3 Q7 | CDF to PMF; tail-sum formula | L5 B7 (and L5 slide 13) |
| HW3 Q8 | $\arg\min_\alpha E[(X-\alpha)^2] = E[X]$ | L5 B8 |
| HW3 Q9 | mean of the minimum of $m$ dice | L6 B6 |
| HW3 Q10 | frog jumps | later (conditional expectation); answer $H_{99}\approx5.18$ |
| HW3 Q11 | St. Petersburg game | L6 B3 |
| HW3 Q12 | $\operatorname{Var}(aX + b)$ | L6 slide 22 |
| HW3 Q13 | urn payouts | L6 B4 |
| HW3 Q14, Tutorial 3 Q7 | coupon collector | L6 B7 |
| HW3 Q15 | Buffon's needle | later (joint pdfs); answer $\frac{2l}{\pi d}$ |
| Tutorial 3 Q1 | Poisson: consistency, mean, variance | L6 slide 27 |
| Tutorial 3 Q2 | PMF with a parameter | L5 B2 |
| Tutorial 3 Q3 | TA queue PMF | L5 B3 |
| Tutorial 3 Q5 | normalise, $E[X]$, $E[X^2]$ | L5 B4 |
| Tutorial 3 Q6 | households vs people | L5 B5 |
| Tutorial 3 Q8 | re-roll strategy (4.25) | L5 B9 |
| Tutorial 3 Q9 | matching: mean and variance | mean in L6 B5; variance later (answer 1) |
| Quiz 1 Q2 | binomial first two moments | L6 slide 25 |

*Self-check for HW3 Q4* (8 red, 7 blue, draw 4; $X$ = number of alternating arrangements): only 2 red and 2 blue can alternate, in 2 ways (RBRB, BRBR). $P(2\text{ red}) = \frac{\binom82\binom72}{\binom{15}4} = \frac{588}{1365} = \frac{28}{65}$, so $E[X] = \frac{56}{65}$.

### Continuous random variables and functions of them (L7, L8)

| Question | Topic | Solved in |
|---|---|---|
| HW4 Q1 | $\max(U, E)$, independent | not worked; self-check below |
| HW4 Q2 | geometric to exponential | L7 B1 |
| HW4 Q3 | projectile range (non-monotone $g$) | L8 B3 |
| HW4 Q4 | product of two uniforms | later (joint pdfs); self-check below |
| HW4 Q5 | Laplace | L7 B3 |
| HW4 Q6 | LOTUS, continuous | L7 B9 |
| HW4 Q7 | first Poisson arrival is exponential | L7 B2 |
| HW4 Q8 | darts | L8 B6 |
| HW4 Q9 | max of three exponentials | L7 B11 |
| HW4 Q10 | breaking a stick | L8 B5 |
| HW4 Q11 | Rayleigh moments | L7 B5 |
| HW4 Q12 | $E[(Z - c)^+]$ | L8 B4 |
| Tutorial 4 Q1 | Gamma normalising constant and moments | L7 B4 |
| Tutorial 4 Q2 | $\lceil X\rceil$ of an exponential | L7 B6 |
| Tutorial 4 Q3 | tail-integral formula | L7 B7 |
| Tutorial 4 Q4 | Gaussian within one $\sigma$ | L8 B7 |
| Tutorial 4 Q5 | min and max of $n$ exponentials | L7 B10 and B11 (general $n$: min is Exp$(n\lambda)$; $E[\max] = \frac1\lambda H_n$) |
| Tutorial 4 Q6 | non-monotone transformation formula | L8 slide 22 |
| Tutorial 4 Q7 | taxi or bus (mixed variable) | L7 B8 |
| Tutorial 4 Q8 | uniform sums until exceeding 2 | later (conditional expectation); answer $e^2 - e\approx4.67$ |
| Tutorial 1 Calculus Q3 | Gaussian integrals $I_n$ | L8 slides 12 and 13 |
| Quiz 1 Q1 | pdf and CDF of $e^{2X}$ | L8 B1 |
| Quiz 1 Q4 | exponential mean and memorylessness | L7 slides 9 and 11 |
| Midsem A Q3 | minimum of three exponentials | L7 B10 |
| Midsem A Q5 | $aX + b$ is Gaussian | L8 slide 14 |
| Midsem A Q2 | $P(X<Y) = \frac12$ for i.i.d. uniforms | later (joint pdfs); by symmetry and $P(X = Y) = 0$ |

*Self-check for HW4 Q1* ($Y = \max(U, E)$, $U\sim\mathcal U(0,1)$, $E\sim\text{Exp}(1)$ independent): $F_Y(y) = P(U\le y)P(E\le y) = y(1 - e^{-y})$ on $[0,1]$ and $1 - e^{-y}$ for $y>1$. So $f_Y(y) = 1 - e^{-y} + ye^{-y}$ on $[0,1]$ and $e^{-y}$ for $y>1$.

*Self-check for HW4 Q4* ($W = U_1U_2$): $F_W(w) = w - w\ln w$, $f_W(w) = -\ln w$ on $(0,1)$, $E[W] = \frac14$.

## 2. Formula sheet

### Sets and axioms (L1, L2)

- De Morgan: $(\bigcup A_i)^c = \bigcap A_i^c$, $(\bigcap A_i)^c = \bigcup A_i^c$.
- σ-algebra: $\Omega\in\mathcal F$; closed under complement and countable union (hence countable intersection, difference).
- Axioms: $P(\Omega) = 1$, $P\ge0$, countable additivity for disjoint events.
- $P(A^c) = 1 - P(A)$; $A\subseteq B\Rightarrow P(A)\le P(B)$ and $P(B\setminus A) = P(B) - P(A)$.
- $P(A\cup B) = P(A) + P(B) - P(AB)$; three sets: $+$singles $-$pairs $+$triple.
- Union bound: $P(\bigcup A_i)\le\sum P(A_i)$. Bonferroni: $P(\bigcap A_i)\ge\sum P(A_i) - (n-1)$.
- Continuity: $A_n\uparrow A$ or $A_n\downarrow A\Rightarrow P(A_n)\to P(A)$.
- $P(A) = 0$ does not mean $A = \emptyset$.

### Conditioning and independence (L3)

$$P(B\mid A) = \frac{P(AB)}{P(A)},\qquad P(A_1\cdots A_n) = P(A_1)P(A_2\mid A_1)\cdots P(A_n\mid A_1\cdots A_{n-1})$$
$$P(A) = \sum_iP(A\mid B_i)P(B_i),\qquad P(B_j\mid A) = \frac{P(A\mid B_j)P(B_j)}{\sum_iP(A\mid B_i)P(B_i)}$$

- Independent: $P(AB) = P(A)P(B)$; then also $(A,B^c)$, $(A^c,B)$, $(A^c,B^c)$.
- Mutual independence: product rule for **every** subcollection. Pairwise does not imply mutual.
- Disjoint with positive probabilities implies **dependent**. $P(E) = 0$ or $1$: independent of everything.
- Conditional independence: $P(AB\mid C) = P(A\mid C)P(B\mid C)$. Neither implies nor is implied by independence.
- At least one of independent events: $1 - \prod(1 - P(A_i))$. Series: multiply working probabilities. Parallel: multiply failure probabilities.

### Counting (L3)

| | Ordered | Unordered |
|---|---|---|
| With replacement | $n^k$ | $\binom{n+k-1}k$ |
| Without replacement | $\frac{n!}{(n-k)!}$ | $\binom nk$ |

- Multinomial: $\frac{n!}{n_1!\cdots n_r!}$. Stars and bars: $x_i\ge0$: $\binom{n+r-1}{r-1}$; $x_i\ge1$: $\binom{n-1}{r-1}$.
- Derangements: $D_n = n!\sum_{k=0}^n\frac{(-1)^k}{k!}\approx\frac{n!}e$.
- For probabilities with replacement, count **ordered** outcomes.

### Random variables (L4 to L7)

- $P_X(B) = P(X^{-1}(B))$; $F_X(x) = P(X\le x)$: non-decreasing, right-continuous, $0$ at $-\infty$, $1$ at $\infty$; jump at $x$ = $P(X = x)$.
- $p_Y(y) = \sum_{x:g(x)=y}p_X(x)$. LOTUS: $E[g(X)] = \sum g(x)p_X(x)$ or $\int g(x)f_X(x)\,dx$.
- $E[aX + b] = aE[X] + b$; $\operatorname{Var}(X) = E[X^2] - (E[X])^2$; $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$.
- $E[\mathbf 1_A] = P(A)$. Tail sums: $E[X] = \sum_{k\ge0}P(X>k)$ (non-negative integers), $E[X] = \int_0^\infty P(X>x)\,dx$ ($X\ge0$).
- pdf: $f_X = F_X'$, $P(X\in B) = \int_Bf_X$, $P(X = a) = 0$.

### The distributions

| Distribution | PMF / pdf | Mean | Variance |
|---|---|---|---|
| Bernoulli$(p)$ | $p$ at 1, $1-p$ at 0 | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\binom nkp^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Geometric$(p)$ | $(1-p)^{k-1}p$, $k\ge1$; $P(X>k) = (1-p)^k$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson$(\lambda)$ | $e^{-\lambda}\frac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Uniform $[a,b]$ | $\frac1{b-a}$ | $\frac{a+b}2$ | $\frac{(b-a)^2}{12}$ |
| Exponential$(\lambda)$ | $\lambda e^{-\lambda x}$; $P(X>x) = e^{-\lambda x}$ | $\frac1\lambda$ | $\frac1{\lambda^2}$ |
| Normal $\mathcal N(\mu,\sigma^2)$ | $\frac1{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |

- Memoryless: geometric (discrete) and exponential (continuous): $P(X>a + h\mid X>a) = P(X>h)$.
- Poisson limit: $B(n,p)\approx\text{Poisson}(np)$ for large $n$, small $p$.
- Exponential moments: $E[X^n] = \frac{n!}{\lambda^n}$. Gamma integral: $\int_0^\infty x^{\alpha-1}e^{-\lambda x}dx = \frac{\Gamma(\alpha)}{\lambda^\alpha}$.
- Normal: $\frac{X - \mu}\sigma\sim\mathcal N(0,1)$; $\Phi(-z) = 1 - \Phi(z)$; $aX + b\sim\mathcal N(a\mu + b, a^2\sigma^2)$; $\int e^{-x^2/2} = \sqrt{2\pi}$.
- Min of independent exponentials: Exp(sum of rates).

### Functions of a continuous random variable (L8)

$$f_Y(y) = \frac1{|a|}f_X\Big(\frac{y-b}a\Big)\ \ (Y = aX + b),\qquad f_Y(y) = f_X(h(y))\,|h'(y)|\ \ (g\text{ monotone}, h = g^{-1}),$$
$$f_Y(y) = \sum_{\text{roots }x_i\text{ of }g(x) = y}\frac{f_X(x_i)}{|g'(x_i)|},\qquad Y = X^2:\ f_Y(y) = \frac{f_X(\sqrt y) + f_X(-\sqrt y)}{2\sqrt y}.$$
When in doubt: $F_Y(y) = P(g(X)\le y)$, rewrite as an event about $X$, differentiate.

## 3. Exam-style self-test

Try these under exam conditions (about 30 minutes), then check the answers.

1. $\Omega = \{1,2,3,4\}$. List the σ-algebra generated by $\{1\}$ and $\{2\}$. How many sets does it have?
2. $P(A) = 0.5$, $P(B) = 0.4$, $P(A\mid B) = 0.3$. Find $P(A\cup B)$, $P(B\mid A)$ and $P(A^c\cap B^c)$. Are $A$ and $B$ independent?
3. A test has sensitivity 0.95 ($P(+\mid D)$) and specificity 0.90 ($P(-\mid D^c)$). Prevalence is 5%. Find $P(D\mid +)$.
4. $X\sim$ Geometric$(\frac13)$. Find $P(X>5\mid X>2)$ and $P(X\text{ is even})$.
5. $X\sim\text{Exp}(2)$ and $Y = \sqrt X$. Find $f_Y$.
6. $X\sim\mathcal N(1,4)$. Find $P(|X|<1)$.
7. $X$ has CDF $F(x) = 1 - x^{-2}$ for $x\ge1$ (and 0 otherwise). Find $f_X$, $E[X]$, $\operatorname{Var}(X)$ and $P(X>2\mid X>1.5)$.
8. $U\sim\mathcal U(0,1)$. Find the distribution of $Y = -2\ln(1 - U)$ and its mean.

### Answers

1. The atoms are $\{1\}$, $\{2\}$, $\{3,4\}$, so the σ-algebra is all $2^3 = 8$ unions of atoms: $\emptyset$, $\{1\}$, $\{2\}$, $\{3,4\}$, $\{1,2\}$, $\{1,3,4\}$, $\{2,3,4\}$, $\Omega$.
2. $P(AB) = 0.3\times0.4 = 0.12$. $P(A\cup B) = 0.78$, $P(B\mid A) = 0.24$, $P(A^cB^c) = 0.22$. Not independent: $0.12\ne0.2$ (negatively correlated).
3. $\frac{0.95\times0.05}{0.95\times0.05 + 0.10\times0.95} = \frac{0.0475}{0.1425} = \frac13$.
4. Memoryless: $P(X>3) = (\frac23)^3 = \frac8{27}$. $P(\text{even}) = \sum_{j\ge1}(\frac23)^{2j-1}\frac13 = \frac13\cdot\frac{2/3}{1 - 4/9} = \frac25$.
5. $g(x) = \sqrt x$ is increasing on $[0,\infty)$; $h(y) = y^2$, $h' = 2y$: $f_Y(y) = 2e^{-2y^2}\cdot2y = 4ye^{-2y^2}$ for $y>0$.
6. $P(-1<X<1) = \Phi(0) - \Phi(-1) = 0.5 - 0.1587 = 0.3413$.
7. $f_X(x) = 2x^{-3}$ for $x\ge1$. $E[X] = \int_1^\infty2x^{-2}dx = 2$. $E[X^2] = \int_1^\infty2x^{-1}dx = \infty$, so the variance is infinite. $P(X>2\mid X>1.5) = \frac{1/4}{1/2.25} = 0.5625$.
8. $P(Y>y) = P(1 - U<e^{-y/2}) = e^{-y/2}$, so $Y\sim\text{Exp}(\frac12)$ with mean 2.


