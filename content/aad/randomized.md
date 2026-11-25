# Learn: randomized algorithms and MaxCut

Lecture 19 introduces algorithms that flip coins. It also introduces one proof technique you will use again and again: **define indicator variables, use linearity of expectation, and conclude that some outcome is at least the average**. Quiz II Q1 used exactly this method, on DAGs instead of cuts. Sources: Lecture 19, the Moodle practice set (Problems 2, 4, 6), Class Test II.

## Deterministic versus randomized

> **In short:** Flipping coins can make every input behave like an average one, at the price of a small chance of bad luck.

A **deterministic** algorithm always does the same thing on the same input. A **randomized** algorithm also flips fair coins, so even on a fixed input its running time or output (or both) can vary.

**Why use randomness? QuickSort.** With a fixed pivot rule (say, the first element), some input splits into sizes 0 and $n-1$ every time; for that rule a sorted array does it, giving $\Theta(n^2)$. **Every** deterministic rule has such bad inputs. With a pivot chosen uniformly at random there are no bad inputs: the **expected** time is $O(n\log n)$ on **every** input, and only unlucky coin flips are slow.

- **Monte Carlo:** always fast, but wrong with a small probability (fingerprinting, below).
- **Las Vegas:** always correct, but the running time is random (randomized QuickSort, Rabin–Karp with checking).

## Probability toolkit

> **In short:** Linearity of expectation needs no independence at all, which makes it the tool for almost every proof here.

- **Indicator variable:** $X_A = 1$ if event $A$ happens, else 0. Then $\mathbb{E}[X_A] = \Pr[A]$.
- **Linearity of expectation:**
$$\boxed{\mathbb{E}\Big[\sum_i X_i\Big] = \sum_i \mathbb{E}[X_i] \quad \text{always, independent or not}}$$
This is the most important line in the chapter. The rubric gives marks for saying that the variables do **not** need to be independent.
- **Union bound:** $\Pr[A_1 \cup \cdots \cup A_k] \le \sum_i \Pr[A_i]$. This doesn't need independence either.
- **Independence:** $\Pr[A \cap B] = \Pr[A]\Pr[B]$. **Pairwise** independence (every pair is independent) is weaker than **mutual** independence (every group is).
- **Averaging principle** (the probabilistic method): if $\mathbb{E}[X] = \mu$, then some outcome has $X \ge \mu$ and some has $X \le \mu$. A random variable can't always be below its average.
- **Markov:** for $X \ge 0$, $\Pr[X \ge a] \le \mathbb{E}[X]/a$.
- **Repetition:** if one run succeeds with probability $\ge p$, then $k$ independent runs all fail with probability $\le (1-p)^k \le e^{-pk}$.

## The MaxCut problem

> **In short:** Split the vertices into two sides to cut as many edges as possible.

$G = (V, E)$ is undirected with $n$ vertices and $m$ edges. A **cut** splits the vertices into two sides $(S, \bar S)$, and $\text{Cut}(S)$ is the set of edges with one end on each side. **MaxCut** asks for the $S$ with the largest $\lvert\text{Cut}(S)\rvert$. MaxCut is NP-hard (NP page), while **MinCut** is solvable in polynomial time (max flow). One word changes everything.

**Is MaxCut $= m$?** Every edge can be cut iff $G$ is bipartite, with the two colour classes as the sides. BFS 2-colouring checks this in $O(n+m)$. An odd cycle can never have all its edges cut: going round it the sides alternate, and an odd number of switches can't bring you back to the starting side. So MaxCut$(C_5) = 4$.

## Greedy heuristics

> **In short:** Greedy rules can get stuck below the optimum, but placing each vertex opposite most of its placed neighbours always cuts at least half the edges.

**Attempt 1: max-degree greedy, and why it fails (Lecture 19 §3.1).** Start with $S = \emptyset$. Go through the vertices from highest degree to lowest, and move $v$ into $S$ if that strictly increases the cut.

*Counterexample.* A tree with two neighbouring hubs $u_1, u_2$ (degree 4 each). $u_1$ is joined to leaves $a_1, a_2, a_3$ and $u_2$ to leaves $b_1, b_2, b_3$: 8 vertices, 7 edges.

1. $u_1$ moves into $S$: the cut goes from 0 to 4.
2. Next is $u_2$. Moving it cuts $u_2b_1, u_2b_2, u_2b_3$ (+3) but un-cuts $u_1u_2$ (−1), a net gain of 2, so it moves. Cut = 6.
3. Now every leaf's only neighbour is in $S$, so moving a leaf would lose 1. The algorithm stops at **6**.

But a tree is bipartite: $S = \{u_1, b_1, b_2, b_3\}$ cuts all **7** edges. Putting both hubs on the same side threw away the edge between them.

**Sequential greedy** (Lecture 19 §3.2): put $v_1$ in $S$. For each next vertex $v$, put it on the side **opposite** most of its already-placed neighbours: in $\bar S$ if $d_S(v) > d_{\bar S}(v)$, otherwise in $S$.

**Theorem (Exercise 1): sequential greedy cuts at least $m/2$ edges.** When $v$ is placed, the edges from $v$ to its already-placed neighbours are decided, and at least half of them are cut, since $\max(d_S(v), d_{\bar S}(v)) \ge \frac12(d_S(v) + d_{\bar S}(v))$. Each edge is decided exactly once, when its later endpoint is placed. Adding up over all vertices, at least half of all edges are cut.

**Worked trace: the house graph** (a square $v_1v_2v_4v_3$ with a roof vertex $v_5$ joined to $v_1, v_2$; 6 edges), in the order $v_1..v_5$:

| Step | Vertex | Placed neighbours | Choice | Cut so far |
|---|---|---|---|---|
| 1 | $v_1$ | none | $S$ | 0 |
| 2 | $v_2$ | $v_1\in S$ | $\bar S$ | 1 |
| 3 | $v_3$ | $v_1 \in S$ | $\bar S$ | 2 |
| 4 | $v_4$ | $v_2, v_3 \in \bar S$ | $S$ | 4 |
| 5 | $v_5$ | $v_1 \in S$, $v_2 \in \bar S$ (tie) | $S$ | 5 |

A cut of 5 is optimal, because the triangle $v_1v_2v_5$ always has an uncut edge.

**Sequential greedy is not optimal, even without ties (Lecture 19 §3.3).** Take 6 vertices and 11 edges: $v_1v_2$, $v_1v_3$, and all 9 edges between $\{v_1, v_2, v_3\}$ and $\{v_4, v_5, v_6\}$. In the order $v_1, \ldots, v_6$:
- $v_1$ goes in $S$.
- $v_2$ and $v_3$ each see only $v_1 \in S$, so they go to $\bar S$ (2 edges cut).
- $v_4, v_5, v_6$ each see $v_1 \in S$ and $v_2, v_3 \in \bar S$. Since $d_{\bar S} = 2 > 1 = d_S$, each goes into $S$, cutting 2 edges and leaving its edge to $v_1$ uncut.

The total is $1 + 1 + 2 + 2 + 2 = 8$. But $S^* = \{v_1, v_2, v_3\}$ cuts all **9** cross edges (only $v_1v_2$ and $v_1v_3$ are uncut). Greedy grabbed 2 edges early and paid 3 later.

**Exercise 1 warm-up (triangle).** On a triangle in the order $v_1, v_2, v_3$: $v_2$ has 1 back edge and greedy cuts it. $v_3$ has 2 back edges (to $v_1 \in S$ and $v_2 \in \bar S$), a tie, and greedy cuts exactly 1. Total $2 \ge 3/2$. This is the proof above in miniature. Every edge is a back edge of exactly one vertex (its later endpoint), so $\sum_i \lvert\text{BackEdges}(v_i)\rvert = m$, and step $i$ cuts $\max(d_S, d_{\bar S}) \ge \frac12\lvert\text{BackEdges}(v_i)\rvert$.

The result depends on the order. Practice set Problem 6: on the path $a-b-c-d$ in the order $a, d, b, c$, it cuts only 2 of the 3 edges. In **BFS order** on a connected bipartite graph it cuts every edge, because it reproduces the BFS 2-colouring (induction over the layers).

## The random cut

> **In short:** Put each vertex on a random side. Each edge is cut half the time, so on average half the edges are cut.

**Algorithm.** Put each vertex in $S$ independently with probability $\frac12$.

**Theorem.** $\mathbb{E}[\lvert\text{Cut}(S)\rvert] = m/2$.

*Proof.* For each edge $e = (u, v)$, let $X_e = 1$ if $e$ is cut. $e$ is cut iff $u$ and $v$ land on different sides, which is 2 of the 4 equally likely outcomes ($S\bar S$ and $\bar S S$). So $\mathbb{E}[X_e] = \frac12$. The cut size is $\lvert\text{Cut}(S)\rvert = \sum_e X_e$, since each cut edge adds 1 and each uncut edge adds 0. For example, on the path $1 - 2 - 3$ with $e_1 = 12$ and $e_2 = 23$:

| $S$ | $X_{e_1}$ | $X_{e_2}$ | $\lvert\text{Cut}(S)\rvert$ |
|---|---|---|---|
| $\emptyset$ | 0 | 0 | 0 |
| $\{1\}$ | 1 | 0 | 1 |
| $\{2\}$ | 1 | 1 | 2 |
| $\{1,2\}$ | 0 | 1 | 1 |

(The complements give the same values.) By linearity,
$$\mathbb{E}[\lvert\text{Cut}(S)\rvert] = \sum_{e\in E}\mathbb{E}[X_e] = \frac m2.$$

**Corollary (probabilistic method).** Every graph has a cut with at least $m/2$ edges, because a random variable can't always be below its average.

**Approximation ratio.** MaxCut $\le m$, so in expectation the random cut is within a factor $\frac12$ of optimal.

**Are the edge indicators independent?** (Lecture 19 §5.4.) Any **two** of them are. For edges $uv$ and $vw$: $\Pr[\text{both cut}] = \Pr[u \ne v, v \ne w] = \frac14 = \frac12\cdot\frac12$. But the three edges of a **triangle** are not mutually independent: all three can never be cut together, so that probability is $0 \ne \frac18$. Linearity didn't need any of this.

**How many repeats for 99% success?** Let $p = \Pr[\lvert\text{Cut}\rvert \ge m/2]$. The cut size is an integer $\le m$, and any value below $m/2$ is at most $\lceil m/2\rceil - 1 \le m/2 - \frac12$. So $\frac m2 = \mathbb{E} \le (1 - p)(\frac m2 - \frac12) + pm$, which gives $p \ge \frac{1}{m+2}$. After $k$ runs, all of them fail with probability $\le (1 - \frac{1}{m+2})^k \le e^{-k/(m+2)}$. Taking $k = (m+2)\ln 100$ makes this at most $1\%$.

## The template for "every X has a Y with at least ..."

> **In short:** If the average is at least $k$, some outcome is at least $k$.

1. **Pick a random object:** choose the structure at random (sides of the vertices, a permutation, a truth assignment, a colouring).
2. **One indicator per item** (edge, clause, group): find the probability that the item is good, and **say why** (counting, symmetry, independence).
3. **Linearity:** $\mathbb{E}[\text{number good}] = \sum \Pr[\text{item good}]$. Mention that independence is not needed.
4. **Averaging:** some outcome is at least the expectation, and that outcome is the object you wanted.
5. If you showed "fewer than 1 bad item expected", conclude that some outcome has **zero** bad items, since the count is a non-negative integer.

Quiz II Q1 rubric: 1.5 for indicators plus linearity and 1.0 for the averaging conclusion. The probability itself was worth 0.5 for the number and 1.0 for the reason.

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

Lectures 20 and 21 rest on one fact: **two different polynomials of degree $\le d$ agree on at most $d$ points of a field**. So if you evaluate both at a random point, you spot the difference with probability at least $1 - d/p$. In this course "randomized hashing" means this polynomial fingerprinting, not universal hash tables. Sources: Lectures 20, 21, the Class Test II paper with its solutions, and the Lecture 24 course summary.

## Equality needs $n$ bits deterministically

> **In short:** With fewer than $n$ bits, two different files must send the same message, and Bob cannot tell them apart.

Alice has a string $a \in \{0,1\}^n$ and Bob has $b$. Alice sends one message, and Bob must decide whether $a = b$, and he must **always be right**.

*Claim.* Some message needs at least $n$ bits. Suppose every message had at most $n-1$ bits. Then there are at most $2^{n-1}$ possible messages for $2^n$ strings, so two different strings $a \ne a'$ get the same message (pigeonhole). Now give Bob $b = a'$. If Alice holds $a'$ the right answer is "equal"; if she holds $a$ it is "not equal". But Bob sees the same message and the same $b$ both times, so he gives the same answer, and one of the two is wrong.

## The fingerprint protocol

> **In short:** Treat the bits as coefficients of a polynomial and compare its values at one random point. Two different polynomials rarely agree there.

Treat the bits of $a$ as coefficients: $P_a(x) = \sum_{i=0}^{n-1} a_ix^i$. Fix a prime $p$ (say $p \approx n^2$). Alice picks $r \in \{0, \ldots, p-1\}$ at random and sends $(r, P_a(r) \bmod p)$. Bob says "equal" iff $P_b(r) \equiv P_a(r) \pmod p$.

- **If $a = b$:** Bob always says "equal". The error is only one-sided.
- **If $a \ne b$:** $D = P_a - P_b$ is a nonzero polynomial of degree $\le n-1$ over $\mathbb{Z}_p$. Because $p$ is **prime**, $\mathbb{Z}_p$ is a field, and a nonzero degree-$d$ polynomial over a field has at most $d$ roots. Bob is wrong only if $r$ happens to be a root of $D$:
$$\boxed{\Pr[\text{error}] \le \frac{n-1}{p}}$$
(This is Schwartz–Zippel with one variable.)
- **Cost:** $2\lceil\log_2 p\rceil = O(\log n)$ bits instead of $n$. With $p \approx n^2$, the error is at most $1/n$. Example: a 4 GB file ($n \approx 2^{35}$ bits) with a 100-bit prime sends 200 bits, with error $\le 2^{35}/2^{100} = 2^{-65}$.

**By hand:** $a = 1011$, $b = 1101$, $p = 11$, $r = 3$. $P_a(x) = 1 + x^2 + x^3$, so $P_a(3) = 37 \equiv 4$. $P_b(x) = 1 + x + x^3$, so $P_b(3) = 31 \equiv 9$. They differ, so Bob detects the difference. The unlucky choices of $r$ are the roots of $D = x^2 - x = x(x-1)$, namely $r \in \{0, 1\}$, so the error is $2/11 \le 3/11$.

## Rabin–Karp string matching (Lecture 21)

> **In short:** Fingerprint every window of the text, and update each window's fingerprint from the previous one in constant time.

Find every place a pattern $t$ of length $m$ occurs in a text $s$ of length $n$. Hash each length-$m$ window of the text as a base-$r$ number mod $p$:
$$H(i) = \big(s[i]r^{m-1} + s[i+1]r^{m-2} + \cdots + s[i+m-1]\big) \bmod p.$$

**Why hashing helps.** Comparing the pattern with each of the $n - m + 1$ windows character by character costs $O(m)$ each, so $O(nm)$ in the worst case (text $aaa\ldots a$, pattern $aa\ldots ab$: every window matches until its last character). Hashing replaces each $O(m)$ comparison by comparing two numbers in $O(1)$, as long as the window hashes can be updated in $O(1)$.

**Rolling update in $O(1)$.** Precompute $R = r^{m-1} \bmod p$. Then
$$\boxed{H(i+1) = \big(r\,(H(i) - s[i]\,R) + s[i+m]\big) \bmod p}$$
In words: remove the character leaving the window, shift every power up by one, and add the character entering.

**Error.** For a random $r$, a window that does not match collides with probability $\le \frac{m-1}{p}$ (Schwartz–Zippel). There are at most $n$ windows, so by the **union bound** $\Pr[\text{any false match}] \le \frac{nm}{p}$. Choose $p \ge n^2m$ to make this at most $1/n$.

**Time.** $O(m)$ to compute $R$, $H_t$ and $H(0)$, then $O(1)$ per window: $O(n + m)$ in total.

**Las Vegas version.** Whenever the hashes match, check the window against $t$ character by character ($O(m)$). Now the answer is always correct. A false alarm costs $O(m)$ and happens with probability $\le m/p$ per window, so the expected wasted work is $\le n\cdot\frac mp\cdot O(m)$, which is $O(m)$ for $p \ge nm$. Total expected time: $O(n + m + m\cdot\#\text{matches})$.

**Trace** ($s = 314152$, $t = 415$, $r = 10$, $p = 13$): $R = 100 \bmod 13 = 9$, $H_t = 415 \bmod 13 = 12$, $H(0) = 314 \bmod 13 = 2$. Then $H(1) = 10(2 - 3\cdot9) + 1 = -249 \equiv 11$; $H(2) = 10(11 - 9) + 5 = 25 \equiv 12$ (**match** at $i = 2$); $H(3) = 10(12 - 36) + 2 = -238 \equiv 9$. Always bring a negative value back into $0..p-1$.

## Streaming palindrome check (Class Test II Q1)

> **In short:** Fingerprint the string forwards and backwards at the same time; they match exactly when it is a palindrome.

The same idea works on a stream: compare a string with its reverse without storing it. For $S = s_1\ldots s_\ell$ ($\ell \le n$, symbols from $\{0..k-1\}$), define

$$F_\ell(x) = \sum_{i=1}^{\ell} s_ix^{\ell-i}, \qquad R_\ell(x) = \sum_{i=1}^{\ell} s_ix^{i-1}, \qquad \boxed{P(x) = F_\ell(x) - R_\ell(x) = \sum_{j=0}^{\ell-1}(s_{\ell-j} - s_{j+1})x^j}$$

$F$ reads the string forwards and $R$ reads it backwards. $P \equiv 0$ $\iff$ $s_{\ell-j} = s_{j+1}$ for every $j$ $\iff$ $S$ is a palindrome. For odd $\ell$ the middle coefficient is $s_{m+1} - s_{m+1} = 0$ automatically. The degree is $\le n - 1$.

Both update one symbol at a time: $F_i = x F_{i-1} + s_i$ (Horner) and $R_i = R_{i-1} + s_ix^{i-1}$. At a random $r \bmod p$ this means keeping three numbers, $H_F$, $H_R$ and $\text{pow} = r^{i-1}$. So the space is $O(\log p) = O(\log k + \log n + \log\frac1\varepsilon)$ bits, with $p > \max(k, n/\varepsilon)$ and error $\le (n-1)/p$. The condition $p > k$ makes sure two different symbols stay different mod $p$. The full solved question with the rubric and hand traces is on the quizzes page.

## 2D Rabin–Karp (Class Test II Q2)

> **In short:** Give every pixel its own power of $x$, then roll the hash down the columns and across the rows.

To find an $m\times m$ icon in an $n\times n$ image, give every pixel of an $m\times m$ block its own power of $x$. Use base $x$ going down a column and base $x^m$ going across columns:

$$P_S(x) = \sum_{j=0}^{m-1}\Big(\sum_{u=0}^{m-1} S[u][j]\,x^{m-1-u}\Big)(x^m)^{m-1-j}.$$

Pixel $(u, j)$ gets exponent $(m-1-j)m + (m-1-u)$. These are all different and run over $0..m^2-1$, so the degree is $m^2 - 1$.

Two passes of the 1D rolling hash compute all $(n-m+1)^2$ fingerprints in $O(n^2)$. First slide strips of height $m$ down each column (base $r$). Then slide windows of $m$ strips along each row (base $R = r^m$). By Schwartz–Zippel one window collides with probability $\le (m^2-1)/p$. By the union bound over at most $n^2$ windows, the total is $\le n^2m^2/p$. Choose $p > \max(k, n^2m^2/\varepsilon)$; each hash then uses $O(\log k + \log m + \log n)$ bits.

## Practice

**RA8.** For $a = 1100$, $b = 1010$ and $p = 7$, find every $r$ for which the fingerprint test wrongly says "equal".

*Solution.* $P_a = 1 + x$, $P_b = 1 + x^2$, $D = x - x^2 = x(1 - x)$. Over $\mathbb{Z}_7$ the roots are $r = 0$ and $r = 1$. So the error probability is $2/7$, within the bound $(n-1)/p = 3/7$.

**RA9.** Why must $p$ be prime? Give an example where a composite modulus breaks the bound.

*Solution.* Over $\mathbb{Z}_N$ with $N$ composite, a degree-1 polynomial can have many roots. With $N = 8$ and $D(x) = 4x$: $4x \equiv 0 \pmod 8$ for every even $x$, i.e. 4 of the 8 values, far more than the degree 1. Primality makes $\mathbb{Z}_p$ a field (no zero divisors), which is what limits the number of roots to the degree.
