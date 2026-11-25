# Learn: randomized algorithms and MaxCut

Lecture 19 introduces algorithms that flip coins, and one proof technique you will use again and again: **define indicator variables, use linearity of expectation, conclude that some outcome is at least the average**. Quiz II Q1 was exactly this method applied to DAGs instead of cuts. Sources: Lecture 19, the Moodle practice set (Problems 2, 4, 6), Class Test II.

## Deterministic versus randomized

A **deterministic** algorithm always takes the same steps on the same input. A **randomized** algorithm also flips fair coins, so its running time and/or output are random variables even for a fixed input.

**Why randomize? QuickSort.** With a fixed pivot rule (first element, say), some input (here, a sorted array) gives splits of size 0 and $n-1$ every time: $\Theta(n^2)$. For **any** deterministic rule there is such a bad family. With a uniformly random pivot there are no bad inputs: the **expected** time is $O(n\log n)$ on **every** input; only unlucky coins are slow.

- **Monte Carlo**: always fast, may be wrong with small probability (fingerprinting below).
- **Las Vegas**: always correct, running time is random (randomized QuickSort, Rabin–Karp with verification).

## Probability toolkit

- **Indicator variable**: $X_A = 1$ if event $A$ happens, else 0. $\mathbb{E}[X_A] = \Pr[A]$.
- **Linearity of expectation**:
$$\boxed{\mathbb{E}\Big[\sum_i X_i\Big] = \sum_i \mathbb{E}[X_i] \quad \text{always, independent or not}}$$
This is the most important line in the chapter. The rubric gives marks for saying the variables need **not** be independent.
- **Union bound**: $\Pr[A_1 \cup \cdots \cup A_k] \le \sum_i \Pr[A_i]$, also with no independence.
- **Independence**: $\Pr[A \cap B] = \Pr[A]\Pr[B]$. **Pairwise** independence (every pair) is weaker than **mutual** independence (every subfamily).
- **Averaging principle** (probabilistic method): if $\mathbb{E}[X] = \mu$ then some outcome has $X \ge \mu$ and some has $X \le \mu$. A random variable cannot always be below its mean.
- **Markov**: for $X \ge 0$, $\Pr[X \ge a] \le \mathbb{E}[X]/a$.
- **Repetition**: if one run succeeds with probability $\ge p$, then $k$ independent runs all fail with probability $\le (1-p)^k \le e^{-pk}$.

## The MaxCut problem

$G = (V, E)$ undirected, $n$ vertices, $m$ edges. A **cut** is a partition $(S, \bar S)$; $\text{Cut}(S)$ is the set of edges with one end on each side. **MaxCut**: find $S$ maximising $\lvert\text{Cut}(S)\rvert$. MaxCut is NP-hard (np page); **MinCut** is polynomial (max flow). One word changes everything.

**Is MaxCut $= m$?** Every edge is cut iff $G$ is bipartite (the two sides are the colour classes). BFS 2-colouring decides it in $O(n+m)$. An odd cycle cannot have all its edges cut: going round it the sides alternate, and an odd number of switches cannot return to the start. So MaxCut$(C_5) = 4$.

## Greedy heuristics

**Greedy rules can fail.** Natural rules such as "move the highest-degree vertex across if it helps" can get stuck below the optimum, and even good rules depend on the processing order (below). What we can prove is a guarantee of half the edges.

**Sequential greedy** (Lecture 19 §3.2): place $v_1$ in $S$; for each next vertex $v$, put it on the side **opposite** the majority of its already-placed neighbours (in $\bar S$ if $d_S(v) > d_{\bar S}(v)$, else in $S$).

**Theorem (Exercise 1): sequential greedy cuts $\ge m/2$ edges.** When $v$ is placed, the edges from $v$ to already-placed neighbours are decided for the first time, and at least half of them, $\max(d_S(v), d_{\bar S}(v)) \ge \frac12(d_S(v) + d_{\bar S}(v))$, are cut. Every edge is decided exactly once, when its later endpoint is placed. Summing over all vertices, at least half of all edges are cut.

The output depends on the order. Practice set Problem 6: on the path $a-b-c-d$ in order $a, d, b, c$ it cuts only 2 of 3 edges, while in **BFS order** on a connected bipartite graph it cuts every edge (it reproduces the BFS 2-colouring, by induction over layers).

## The random cut

**Algorithm.** Put each vertex in $S$ independently with probability $\frac12$.

**Theorem.** $\mathbb{E}[\lvert\text{Cut}(S)\rvert] = m/2$.

*Proof.* For each edge $e = (u, v)$ let $X_e = 1$ if $e$ is cut. $e$ is cut iff $u, v$ land on different sides, which happens in 2 of the 4 equally likely outcomes ($S\bar S$, $\bar S S$), so $\mathbb{E}[X_e] = \frac12$. $\lvert\text{Cut}(S)\rvert = \sum_e X_e$, and by linearity
$$\mathbb{E}[\lvert\text{Cut}(S)\rvert] = \sum_{e\in E}\mathbb{E}[X_e] = \frac m2.$$

**Corollary (probabilistic method).** Every graph has a cut with at least $m/2$ edges: a random variable cannot always be below its average.

**Approximation ratio.** MaxCut $\le m$, so the random cut is a $\frac12$-approximation in expectation.

**Independence of edge indicators** (Lecture 19 §5.4). Any **two** edge indicators are independent (for edges $uv$, $vw$: $\Pr[\text{both cut}] = \Pr[u \ne v, v \ne w] = \frac14 = \frac12\cdot\frac12$), but a **triangle**'s three indicators are not mutually independent: all three cut is impossible ($\Pr = 0 \ne \frac18$). Linearity did not need any of this.

**How many repetitions for 99%?** Let $p = \Pr[\lvert\text{Cut}\rvert \ge m/2]$. The cut size is an integer $\le m$; values below $m/2$ are at most $\lceil m/2\rceil - 1 \le m/2 - \frac12$. So $\frac m2 = \mathbb{E} \le (1 - p)(\frac m2 - \frac12) + pm$, giving $p \ge \frac{1}{m+2}$. After $k$ runs, all fail with probability $\le (1 - \frac{1}{m+2})^k \le e^{-k/(m+2)}$. With $k = (m+2)\ln 100$, this is $\le 1\%$.

## The template for "every X has a Y with at least ..."

1. **Random object**: choose the structure at random (vertex sides, a permutation, a truth assignment, a colouring).
2. **Indicator per item** (edge, clause, group): compute its probability of being good, with a **justification** (counting, symmetry, independence).
3. **Linearity**: $\mathbb{E}[\text{number good}] = \sum \Pr[\text{item good}]$; mention that independence is not needed.
4. **Averaging**: some outcome is at least the expectation; that outcome is the object you wanted.
5. If the bound is "$< 1$ bad item expected", conclude that some outcome has **zero** bad items (the count is a non-negative integer).

Quiz II Q1 rubric: 1.5 for indicators + linearity, 1.0 for the averaging conclusion, and the probability itself was worth 0.5 for the number and 1.0 for the reason.

## Lecture 19 exercises, solved

**RA1 (Exercise 2, hat-check).** $n$ backpacks returned in a uniformly random order. Expected number of students who get their own?

*Solution.* $X_i = 1$ if student $i$ gets their own. Exactly $(n-1)!$ of the $n!$ permutations fix $i$, so $\mathbb{E}[X_i] = \frac1n$. By linearity $\mathbb{E}[\sum X_i] = n \cdot \frac1n = 1$, for every $n$. (For $n = 3$ the 6 permutations have $3, 1, 1, 1, 0, 0$ fixed points, average 1.) The $X_i$ are dependent (if $n - 1$ students have their own, so does the last), which does not matter.

**RA2 (Exercise 3).** A random bit array $A[1..n]$ of fair independent coins. Expected number of positions $i < n$ with $A[i] \ne A[i+1]$?

*Solution.* $Y_i = 1$ if $A[i]\ne A[i+1]$; $\Pr = \frac12$ (outcomes 01 and 10 of four). Linearity: $\frac{n-1}2$.

**RA3 (Exercise 4).** Every 3-CNF formula with $m$ clauses (3 distinct variables per clause) has an assignment satisfying at least $\frac78 m$ clauses.

*Solution.* Set each variable true or false independently with probability $\frac12$. A clause is false only if all three of its literals are false, which for distinct variables has probability $(\frac12)^3 = \frac18$. So $\Pr[C_j \text{ satisfied}] = \frac78$, and with indicators and linearity $\mathbb{E}[\#\text{satisfied}] = \frac78 m$. Some assignment achieves at least the average. (Consequence: any 3-CNF with at most 7 clauses is satisfiable, since $\frac78 m > m - 1$ when $m < 8$, and the count is an integer.)

**RA4 (Exercise 5).** Every graph has a partition into 3 sets cutting at least $\frac23 m$ edges.

*Solution.* Colour each vertex uniformly from 3 colours independently. An edge is uncut iff both ends get the same colour: probability $3\cdot\frac19 = \frac13$. So $\Pr[\text{cut}] = \frac23$, $\mathbb{E}[\text{cut}] = \frac23 m$, and some partition achieves it. In general $k$ parts give $(1 - \frac1k)m$.

**RA5 (practice set Problem 4).** Directed graph, each vertex in $S$ independently with probability $p$; an edge $(u, v)$ is cut if $u \in S$, $v \in \bar S$. Expected cut, best $p$, and are two indicators of $(u,v)$, $(v,w)$ independent?

*Solution.* $\Pr[(u,v)\text{ cut}] = p(1-p)$, so $\mathbb{E} = p(1-p)m$. Since $p(1-p) = \frac14 - (p - \frac12)^2$, the best is $p = \frac12$, giving $\frac m4$; so some $S$ cuts $\ge \frac m4$ edges, a $\frac14$-approximation. The indicators of $(u,v)$ and $(v,w)$ are **not** independent: both cut needs $v \in \bar S$ and $v\in S$, so $\Pr[\text{both}] = 0 \ne \frac1{16}$. Linearity still applies.

**RA6 (practice set Problem 2, groups in two rooms).** $m$ groups of $k$ students each; split the class into two rooms so no group is all in one room. Show it is possible if $m < 2^{k-1}$. For $k = 2$, what is the fewest pairs that cannot be split?

*Solution.* Send each student to a room by a fair coin. A group is all in room 1 with probability $2^{-k}$ and all in room 2 with $2^{-k}$, so it is monochromatic with probability $2^{1-k}$. Let $X$ = the number of monochromatic groups; $\mathbb{E}[X] = m2^{1-k} < 1$. $X$ is a non-negative integer, so if every split had $X \ge 1$ the average would be $\ge 1$. Hence some split has $X = 0$. For $k = 2$ groups are edges, and a good split is a 2-colouring with every edge crossing, so the pair graph must be bipartite. A triangle (3 pairs) cannot be split; any 2 pairs form a forest, which is bipartite. **Answer 3** (the bound $m < 2$ is not tight here).

**The in-exam version (Quiz II Q1).** Every directed graph with $m$ edges has an acyclic subgraph with $\ge m/2$ edges. Fully solved with the rubric on the quizzes page.

# Learn: fingerprinting and Rabin–Karp

Lectures 20 and 21 use one fact: **two different polynomials of degree $\le d$ agree on at most $d$ points of a field**, so evaluating both at a random point catches a difference with probability $\ge 1 - d/p$. In this course "randomized hashing" means this polynomial fingerprinting, not universal hash tables. Sources: Lectures 20, 21, the Class Test II paper with its solutions, and the Lecture 24 course summary.

## Equality needs $n$ bits deterministically

Alice has $a \in \{0,1\}^n$, Bob has $b$; Alice sends one message and Bob must decide whether $a = b$, **always correctly**.

*Claim.* Some message needs $\ge n$ bits. If all messages had $\le n-1$ bits, there would be at most $2^{n-1}$ messages for $2^n$ strings, so two strings $a \ne a'$ would get the same message (pigeonhole). Give Bob $b = a'$: when Alice holds $a'$ the answer is "equal", when she holds $a$ it is "not equal", but Bob sees the same message and the same $b$ in both cases, so he answers the same: one answer is wrong.

## The fingerprint protocol

Read $a$ as the coefficients of $P_a(x) = \sum_{i=0}^{n-1} a_ix^i$. Fix a prime $p$ (say $p \approx n^2$). Alice picks $r \in \{0, \ldots, p-1\}$ uniformly and sends $(r, P_a(r) \bmod p)$. Bob accepts iff $P_b(r) \equiv P_a(r) \pmod p$.

- **If $a = b$**: always accepts (one-sided error).
- **If $a \ne b$**: $D = P_a - P_b$ is a nonzero polynomial of degree $\le n-1$ over the field $\mathbb{Z}_p$ (this is why $p$ must be **prime**: $\mathbb{Z}_p$ is a field, so a degree-$d$ polynomial has at most $d$ roots). Bob wrongly accepts iff $r$ is a root of $D$:
$$\boxed{\Pr[\text{error}] \le \frac{n-1}{p}}$$
(Schwartz–Zippel, one-variable case).
- **Cost**: $2\lceil\log_2 p\rceil = O(\log n)$ bits instead of $n$. With $p \approx n^2$ the error is $\le 1/n$. A 4 GB file ($n \approx 2^{35}$ bits) with a 100-bit prime: 200 bits sent, error $\le 2^{35}/2^{100} = 2^{-65}$.

**By hand:** $a = 1011$, $b = 1101$, $p = 11$, $r = 3$. $P_a(x) = 1 + x^2 + x^3$, $P_a(3) = 37 \equiv 4$; $P_b(x) = 1 + x + x^3$, $P_b(3) = 31 \equiv 9$. Different, so Bob detects the difference. The colliding seeds are the roots of $D = x^2 - x = x(x-1)$: $r \in \{0, 1\}$, so the error is $2/11 \le 3/11$.

## Rabin–Karp string matching (Lecture 21)

Find all occurrences of a pattern $t$ of length $m$ in a text $s$ of length $n$. Hash each length-$m$ window as a number in base $r$ modulo $p$:
$$H(i) = \big(s[i]r^{m-1} + s[i+1]r^{m-2} + \cdots + s[i+m-1]\big) \bmod p.$$

**Rolling update in $O(1)$.** With $R = r^{m-1} \bmod p$ precomputed:
$$\boxed{H(i+1) = \big(r\,(H(i) - s[i]\,R) + s[i+m]\big) \bmod p}$$
(remove the outgoing character, shift every power up by one, add the incoming character).

**Error.** A non-matching window collides with probability $\le \frac{m-1}{p}$ over a random $r$ (Schwartz–Zippel). There are $\le n$ windows, so by the **union bound** $\Pr[\text{any false match}] \le \frac{nm}{p}$; choose $p \ge n^2m$ for error $\le 1/n$.

**Time.** $O(m)$ for $R$, $H_t$ and $H(0)$; then $O(1)$ per window: $O(n + m)$.

**Las Vegas version.** On every hash match, compare the window with $t$ character by character ($O(m)$). Now the output is always correct. A false alarm costs $O(m)$ and happens with probability $\le m/p$ per window, so the expected wasted work is $\le n\cdot\frac mp\cdot O(m)$, which is $O(m)$ for $p \ge nm$. Total expected time $O(n + m + m\cdot\#\text{matches})$.

**Trace** ($s = 314152$, $t = 415$, $r = 10$, $p = 13$): $R = 100 \bmod 13 = 9$, $H_t = 415 \bmod 13 = 12$, $H(0) = 314 \bmod 13 = 2$. $H(1) = 10(2 - 3\cdot9) + 1 = -249 \equiv 11$; $H(2) = 10(11 - 9) + 5 = 25 \equiv 12$ (**match** at $i = 2$); $H(3) = 10(12 - 36) + 2 = -238 \equiv 9$. Always reduce a negative value into $0..p-1$.

## Streaming palindrome check (Class Test II Q1)

The same idea works on a stream: compare a string with its reverse without storing it. For $S = s_1\ldots s_\ell$ ($\ell \le n$, alphabet $\{0..k-1\}$) let

$$F_\ell(x) = \sum_{i=1}^{\ell} s_ix^{\ell-i}, \qquad R_\ell(x) = \sum_{i=1}^{\ell} s_ix^{i-1}, \qquad \boxed{P(x) = F_\ell(x) - R_\ell(x) = \sum_{j=0}^{\ell-1}(s_{\ell-j} - s_{j+1})x^j}$$

$P \equiv 0$ $\iff$ $s_{\ell-j} = s_{j+1}$ for all $j$ $\iff$ $S$ is a palindrome. For odd $\ell$ the middle coefficient is $s_{m+1} - s_{m+1} = 0$ automatically. Degree $\le n - 1$.

Both halves update term by term: $F_i = x F_{i-1} + s_i$ (Horner) and $R_i = R_{i-1} + s_ix^{i-1}$. Evaluated at a random $r \bmod p$ that is three numbers $H_F, H_R$ and $\text{pow} = r^{i-1}$, so the space is $O(\log p) = O(\log k + \log n + \log\frac1\varepsilon)$ bits, with $p > \max(k, n/\varepsilon)$ and error $\le (n-1)/p$. $p > k$ makes sure two different symbols stay different mod $p$. The full solved question with the rubric and hand traces is on the quizzes page.

## 2D Rabin–Karp (Class Test II Q2)

To find an $m\times m$ icon in an $n\times n$ image, give every pixel of an $m\times m$ grid its own power of $x$: base $x$ down a column, base $x^m$ across columns,

$$P_S(x) = \sum_{j=0}^{m-1}\Big(\sum_{u=0}^{m-1} S[u][j]\,x^{m-1-u}\Big)(x^m)^{m-1-j},$$

so pixel $(u, j)$ gets the exponent $(m-1-j)m + (m-1-u)$, all distinct in $0..m^2-1$, and the degree is $m^2 - 1$. Two passes of the 1D rolling hash compute all $(n-m+1)^2$ fingerprints in $O(n^2)$: first slide vertical strips of height $m$ down each column (base $r$), then slide windows of $m$ strips along each row (base $R = r^m$). By Schwartz–Zippel one window collides with probability $\le (m^2-1)/p$, and by the union bound over $\le n^2$ windows the total is $\le n^2m^2/p$; choose $p > \max(k, n^2m^2/\varepsilon)$, so each hash uses $O(\log k + \log m + \log n)$ bits.

## Practice

**RA8.** For $a = 1100$, $b = 1010$ and $p = 7$, find every $r$ for which the fingerprint test wrongly says "equal".

*Solution.* $P_a = 1 + x$, $P_b = 1 + x^2$, $D = x - x^2 = x(1 - x)$. Over $\mathbb{Z}_7$ the roots are $r = 0$ and $r = 1$. So the error probability is $2/7$, within the bound $(n-1)/p = 3/7$.

**RA9.** Why must $p$ be prime? Give an example where a composite modulus breaks the bound.

*Solution.* Over $\mathbb{Z}_N$ with $N$ composite, a degree-1 polynomial can have many roots. With $N = 8$ and $D(x) = 4x$: $4x \equiv 0 \pmod 8$ for every even $x$, i.e. 4 of the 8 values, far more than the degree 1. Primality makes $\mathbb{Z}_p$ a field (no zero divisors), which is what limits the number of roots to the degree.
