# Quiz I: tiling, multiplication, Hadamard

Quiz I had three 5-mark questions. Solutions follow the official HackMD rubric.

**QA1 (Quiz I Q1, 5 marks).** Can the figure below be tiled by dominoes (two horizontally or vertically adjacent squares)? Give a tiling or a short proof that none exists.

The figure, row by row from the top, with columns 1 to 8 (`#` = a square, `.` = empty):

```
row 1:  . . # # . . . .
row 2:  . # # # . . . .
row 3:  # # # # # . # #
row 4:  # # # # # . # #
row 5:  # # # # # # # #
row 6:  . # # # # # # #
row 7:  . . . # # # # #
row 8:  . . . . # # # .
```

*Solution.* **No tiling exists.**

**Bipartite model (1 mark).** Colour square $(r, c)$ black if $r + c$ is even, white otherwise, like a chessboard. The figure has 42 squares: **21 black and 21 white**, so the simple colour count does not rule out a tiling. Horizontally or vertically adjacent squares have opposite colours, so every domino covers one black and one white square. Let $L$ = black squares, $R$ = white squares, with an edge between side-adjacent squares.

**Tiling = perfect matching (1 mark).** A domino is an edge of this graph, and a tiling uses every square exactly once, so a tiling is exactly a perfect matching.

**A Hall violator (1 mark).** Take the 11 black squares
$$S = \{(1,3), (2,2), (2,4), (3,1), (3,3), (3,5), (4,2), (4,4), (5,1), (5,3), (6,2)\}$$
(the black squares of the upper-left block).

**Its neighbourhood (1 mark).** The white squares adjacent to at least one of them are
$$N(S) = \{(1,4), (2,3), (3,2), (3,4), (4,1), (4,3), (4,5), (5,2), (5,4), (6,3)\},$$
so $\lvert N(S)\rvert = 10 < 11 = \lvert S\rvert$. (Check the boundary squares: $(3,5)$ has no square at $(3,6)$ or $(2,5)$, so its only white neighbours are $(3,4)$ and $(4,5)$; $(6,2)$ has no $(6,1)$ or $(7,2)$, so only $(5,2)$ and $(6,3)$.)

**Conclusion (1 mark).** By Hall's theorem a perfect matching needs $\lvert N(S)\rvert \ge \lvert S\rvert$ for every $S \subseteq L$. This fails, so there is no perfect matching and the figure cannot be tiled.

Intuition: the 11 black squares of the left lobe can only pair with 10 white squares, so one of them is always left over. (The lecture's coloured picture on the Lecture 10 slide shows the same block.)

**Common wrong argument** (rubric): "subtract the figure from a tileable rectangle; if the remainder is untileable, so is the figure". This is false: in a $4\times4$ board, the shape $\{(1,2), (2,2), (2,1), (3,1)\}$ is two vertical dominoes, yet removing it isolates $(1,1)$ and leaves an untileable remainder.

**QA2 (Quiz I Q2, 5 marks).** Prove correctness and analyse the running time of PeasantMultiply($x, y$): prod ← 0; while $x > 0$: if $x$ odd, prod ← prod + $y$; $x \leftarrow \lfloor x/2\rfloor$; $y \leftarrow y + y$; return prod.

*Solution.* **Correctness (3 marks).** Let $x_0, y_0$ be the inputs. **Invariant**: at the start of each iteration, $\text{prod} + x\cdot y = x_0y_0$.

- *Base* (0.5): initially prod $= 0$, $x = x_0$, $y = y_0$. (If $x_0 = 0$ the loop never runs and the algorithm returns $0 = x_0y_0$.)
- *$x$ even* (1.25): $x = 2\lfloor x/2\rfloor$, so $x\cdot y = \lfloor x/2\rfloor\cdot(y + y)$. prod is unchanged and the new $x'y'$ equals the old $xy$.
- *$x$ odd* (1.25): $x = 2\lfloor x/2 \rfloor + 1$, so $x\cdot y = \lfloor x/2\rfloor\cdot(y + y) + y$. prod gains $y$ and $x'y'$ loses exactly $y$.
- *Termination*: $x$ is a non-negative integer that strictly decreases while positive, so it reaches 0, and then $\text{prod} = x_0y_0$.

*Binary version (also 3 marks).* With $x_0 = \sum_{i=0}^{n-1} x_i2^i$: "x odd" tests the current lowest bit; $x \leftarrow \lfloor x/2\rfloor$ is a right shift; $y \leftarrow 2y$ is a left shift. After $k$ iterations, $x^{(k)} = \lfloor x_0/2^k\rfloor$, $y^{(k)} = 2^ky_0$, $\text{prod}^{(k)} = y_0\sum_{i<k}x_i2^i$. After $n$ iterations prod $= y_0x_0$. Keep the iteration superscripts separate from the inputs.

**Running time (2 marks).** $x$ halves each iteration, so the loop runs $\lfloor\log_2 x_0\rfloor + 1 = O(\log x)$ times (1 mark). Each iteration does a parity test, a halving and a doubling (shifts) and at most one addition. **State the cost of addition** (1 mark):

- additions in $O(1)$: total **$O(\log x)$**;
- additions of $O(\log y)$-bit (or $n$-bit) numbers in linear time: total **$O(\log x\cdot\log y)$**, i.e. $O(n^2)$ for two $n$-bit inputs.

Deductions: −1 for giving a final complexity without the addition assumption; −1 for using a symbol like $m$ for $\log x$ without defining it.

**QA3 (Quiz I Q3, 5 marks).** $H_0 = [1]$ and $H_k = \begin{pmatrix}H_{k-1} & H_{k-1}\\ H_{k-1} & -H_{k-1}\end{pmatrix}$. Show that for a column vector $v$ of length $n = 2^k$, $H_kv$ can be computed in $O(n\log n)$ operations.

*Solution.* **Block form (2 marks).** Split $v = \begin{pmatrix}v_1\\ v_2\end{pmatrix}$ with $v_1, v_2$ of length $n/2 = 2^{k-1}$ (state the length; −0.5 otherwise). Then
$$H_kv = \begin{pmatrix}H_{k-1} & H_{k-1}\\ H_{k-1} & -H_{k-1}\end{pmatrix}\begin{pmatrix}v_1\\ v_2\end{pmatrix} = \begin{pmatrix}H_{k-1}v_1 + H_{k-1}v_2\\ H_{k-1}v_1 - H_{k-1}v_2\end{pmatrix}.$$

**Recursive algorithm (1 mark).** Compute only **two** half-size products, $u_1 = H_{k-1}v_1$ and $u_2 = H_{k-1}v_2$, recursively. Output $(u_1 + u_2, u_1 - u_2)$, which is $n$ additions/subtractions, $O(n)$. Base case $k = 0$: $H_0v = v$.

**Recurrence (1 mark).** $T(n) = 2T(n/2) + O(n)$, $T(1) = O(1)$.

**Solution (1 mark).** Master theorem with $a = 2$, $b = 2$, $d = 1$: $d = \log_b a$, so $T(n) = O(n\log n)$. (Recursion tree: $\log_2 n$ levels, each doing $O(n)$ total work.)

**Fatal errors** (0 marks): computing $H_kv$ directly in $O(n^2)$, or recursing on four products ($H_{k-1}v_1$, $H_{k-1}v_2$, $-H_{k-1}v_2$ separately and so on) giving $4T(n/2) + O(n) = O(n^2)$. The whole point is that $H_{k-1}v_1$ and $H_{k-1}v_2$ are each **reused** twice.

# Quiz II: random DAGs and matching via flow

Quiz II had two 5-mark questions, on Lectures 15 to 19.

**QB1 (Quiz II Q1, 5 marks).** $G = (V, E)$ is a directed graph with $n$ vertices, $m$ edges and no self-loops. We want $F\subseteq E$ with $(V, F)$ acyclic and $\lvert F\rvert$ maximum. (1) For a permutation $\pi = (v_1, \ldots, v_n)$ of $V$, let $F_\pi$ be the forward edges $(v_i, v_j)$, $i < j$. Prove $(V, F_\pi)$ is a DAG. (2) If $\pi$ is uniformly random, find $\Pr[e \in F_\pi]$ for an edge $e = (u, v)$, with justification. (3) Using linearity of expectation, find $\mathbb{E}[\lvert F_\pi\rvert]$ and prove every directed graph has an acyclic subgraph with at least $m/2$ edges.

*Solution.* **(1) DAG (1 mark).** Every edge of $F_\pi$ goes from a position $i$ to a larger position $j$. Suppose $(V, F_\pi)$ had a directed cycle $v_{i_1}\to v_{i_2}\to\cdots\to v_{i_k}\to v_{i_1}$. Following it, the positions strictly increase: $i_1 < i_2 < \cdots < i_k < i_1$, so $i_1 < i_1$, a contradiction. So there is no cycle.

**(2) Probability (1.5 marks).** $e = (u, v) \in F_\pi$ exactly when $u$ comes before $v$ in $\pi$. Swapping the positions of $u$ and $v$ is a **bijection** between permutations with $u$ first and permutations with $v$ first (it is its own inverse). So exactly half of the $n!$ equally likely permutations put $u$ first:
$$\Pr[e \in F_\pi] = \frac{n!/2}{n!} = \frac12.$$
(0.5 for the value, 1.0 for the bijection/symmetry reason. $u \ne v$ because there are no self-loops.)

**(3) Expectation and existence (2.5 marks).** For each edge $e$ let $Y_e = 1$ if $e\in F_\pi$, else 0; $\mathbb{E}[Y_e] = \Pr[Y_e = 1] = \frac12$. Then $\lvert F_\pi\rvert = \sum_{e\in E}Y_e$. The $Y_e$ are **not** independent (edges sharing vertices are correlated), but linearity of expectation needs no independence:
$$\mathbb{E}[\lvert F_\pi\rvert] = \sum_{e\in E}\mathbb{E}[Y_e] = \frac m2.$$
(1.5 marks.) **Probabilistic method** (1.0 mark): the average of $\lvert F_\pi\rvert$ over all $n!$ permutations is $m/2$, so some $\pi^*$ has $\lvert F_{\pi^*}\rvert \ge m/2$ (not every value can be below the average). By (1), $(V, F_{\pi^*})$ is acyclic. So every directed graph has an acyclic subgraph with at least $m/2$ edges.

*Remark.* A deterministic version: for any ordering, either the forward edges or the backward edges number at least $m/2$, and each set is acyclic (backward edges are forward for the reversed order). That one-line argument is also a valid proof of the existence claim.

**QB2 (Quiz II Q2, 5 marks).** $G = (L\cup R, E)$ is bipartite. (1) Formulate maximum matching as max flow: vertices, edge directions, capacities. (2) Prove the max flow gives an optimal matching. (3) Prove Hall's theorem using max-flow min-cut: $G$ has a perfect matching iff $\lvert N(S)\rvert \ge \lvert S\rvert$ for all $S\subseteq L$.

*Solution.* **(1) Network (1 mark).** $V' = L\cup R\cup\{s, t\}$. Edges $s\to u$ with capacity 1 for each $u\in L$; $u \to v$ for each $(u, v)\in E$, directed from $L$ to $R$, capacity 1 (or $\infty$); $v\to t$ with capacity 1 for each $v\in R$.

**(2) Optimality (1.5 marks).**
*Matching → flow.* For a matching $M$, set $f = 1$ on $s\to u$, $u\to v$, $v\to t$ for each $(u, v)\in M$ and 0 elsewhere. Each vertex of $L\cup R$ is in at most one matched edge, so it carries at most one unit in and out: capacities and conservation hold, and $\text{val}(f) = \lvert M\rvert$. Hence max flow $\ge$ max matching.
*Flow → matching.* All capacities are integers, so by the **integrality theorem** there is an integral maximum flow $f^*$ (0.5 marks), with $f^*(e) \in \{0, 1\}$ on the unit edges. Let $M = \{(u, v)\in E : f^*(u, v) = 1\}$. At $u\in L$ the inflow is at most $c(s, u) = 1$, so by conservation at most one edge out of $u$ carries flow; at $v\in R$ the outflow is at most $c(v, t) = 1$, so at most one edge into $v$ carries flow. So $M$ is a matching, and $\lvert M\rvert = \text{val}(f^*)$ (cut invariance on the cut $\{s\}\cup L$). Hence max matching $\ge$ max flow. The two are equal, and the matching read off an integral max flow is maximum (1.0 mark).

**(3) Hall via MFMC (2.5 marks).** Set $c(u, v) = \infty$ on the middle edges (this does not change the max flow, since each $u$ still receives at most 1).

($\Rightarrow$, 0.5) If $M$ is perfect, each $u\in S$ is matched to a distinct vertex of $N(S)$, so $\lvert N(S)\rvert\ge\lvert S\rvert$.

($\Leftarrow$) The cut $(\{s\}, V'\setminus\{s\})$ has capacity $\lvert L\rvert$, so the min cut is at most $\lvert L\rvert$. Let $(A, B)$ be any cut of **finite** capacity, with $S = A\cap L$ and $T = A\cap R$. No $\infty$ edge goes from $A$ to $B$, so every neighbour of a vertex of $S$ lies in $A$: **$N(S)\subseteq T$** (1.0). The edges crossing from $A$ to $B$ are $s\to u$ for $u\in L\setminus S$ and $v\to t$ for $v\in T$, so
$$C(A, B) = \lvert L\setminus S\rvert + \lvert T\rvert \ge \lvert L\rvert - \lvert S\rvert + \lvert N(S)\rvert \ge \lvert L\rvert,$$
using Hall's condition in the last step. So the minimum cut is exactly $\lvert L\rvert$, and by the **max-flow min-cut theorem** the maximum flow is $\lvert L\rvert$. By part (2) there is a matching of size $\lvert L\rvert$, which is perfect (1.0).

# Class Test I: max flow

Class Test I was 20 marks on Lectures 14 to 17.

**CT1 (Class Test I Q1, 8 marks).** Run Edmonds–Karp (augment along a shortest $s$–$t$ path in $G_f$ by number of edges) on the network with edges $s\to a$ (10), $s\to c_1$ (6), $c_1\to c_2$ (6), $c_2\to b$ (6), $a\to b$ (6), $b\to t$ (10), $a\to d_1$ (6), $d_1\to d_2$ (6), $d_2\to t$ (6). (1) Trace each iteration: path, bottleneck, flows, residual graph. (2) Give a cut certificate for your final flow.

*Solution.* **Iteration 1.** The unique shortest path (3 edges) is $p_1 = s\to a\to b\to t$. $\Delta_1 = \min\{10, 6, 10\} = 6$. Now $f(s,a) = 6$, $f(a,b) = 6$ (saturated), $f(b,t) = 6$; value 6. $G_f$ gains back edge $b\to a$ (6) and loses $a\to b$; residuals $s\to a$ 4, $b\to t$ 4.

**Iteration 2.** Shortest paths now have 4 edges: $s\to c_1\to c_2\to b\to t$ and $s\to a\to d_1\to d_2\to t$. Take $p_2 = s\to c_1\to c_2\to b\to t$: $\Delta_2 = \min\{6, 6, 6, 4\} = 4$. $b\to t$ is saturated (10/10). Value 10.

**Iteration 3.** $p_3 = s\to a\to d_1\to d_2\to t$: $\Delta_3 = \min\{4, 6, 6, 6\} = 4$. $s\to a$ is saturated (10/10). Value 14.
(Doing iterations 2 and 3 in the other order gives the same flow.)

**Residual graph after iteration 3.** Forward residuals: $s\to c_1$ 2, $c_1\to c_2$ 2, $c_2\to b$ 2, $a\to d_1$ 2, $d_1\to d_2$ 2, $d_2\to t$ 2; $s\to a$, $a\to b$, $b\to t$ have 0. Back edges: $b\to a$ 6, and reverses of all used edges. **Do not stop here**: there is still an $s$–$t$ path.

**Iteration 4.** The only route from $s$ uses $c_1$, reaches $b$, and since $b\to t$ is full it must take the **backward edge $b\to a$**, then exit through $d_1, d_2$:
$$p_4 = s\to c_1\to c_2\to b\xrightarrow{\text{back}}a\to d_1\to d_2\to t \quad (7 \text{ edges})$$
$$\Delta_4 = \min\{2, 2, 2, 6, 2, 2, 2\} = 2.$$
Pushing 2 along $b\to a$ **cancels** 2 units on $a\to b$: $f(a, b)$ drops from 6 to 4. Value $14 + 2 = 16$.

| $i$ | Path | $\Delta_i$ | val$(f)$ |
|---|---|---|---|
| 1 | $s\to a\to b\to t$ | 6 | 6 |
| 2 | $s\to c_1\to c_2\to b\to t$ | 4 | 10 |
| 3 | $s\to a\to d_1\to d_2\to t$ | 4 | 14 |
| 4 | $s\to c_1\to c_2\to b\to a\to d_1\to d_2\to t$ | 2 | 16 |

Final flow: $s\to a$ 10/10, $s\to c_1$ 6/6, $c_1\to c_2$ 6/6, $c_2\to b$ 6/6, $a\to b$ 4/6, $b\to t$ 10/10, $a\to d_1$ 6/6, $d_1\to d_2$ 6/6, $d_2\to t$ 6/6.

**(2) Cut certificate.** In $G_{f^*}$ both edges out of $s$ are saturated, so only $s$ is reachable: $P^* = \{s\}$, $Q^* = V\setminus\{s\}$.
$$C(P^*, Q^*) = c(s, a) + c(s, c_1) = 10 + 6 = 16 = \text{val}(f^*).$$
By weak duality every flow is at most the capacity of every cut, so no flow exceeds 16: $f^*$ is maximum and this cut is minimum. ($P^* = V\setminus\{t\}$, with capacity $c(b,t) + c(d_2, t) = 16$, is also accepted.)

**Marking (8).** $p_1$ first as the unique shortest path (1.5) · the length-4 paths $p_2, p_3$ reaching 14 (2) · $p_4$ with the backward edge, $f(a,b)$ from 6 to 4, value 16 (2.5; stopping at 14 loses all of this) · a valid min cut of capacity 16 with the explanation (2).

**CT2 (Class Test I Q2, 6 marks).** A directed network has vertex capacities $c(v)\ge 0$ on every $v\ne s, t$ (limiting the total flow through $v$) as well as edge capacities. (1) Design an algorithm, by transforming the network, to find a maximum $s$–$t$ flow. (2) Prove correctness and analyse the running time.

*Solution.* **(1) Vertex splitting (3 marks).** Build $G' = (V', E')$: replace each $v\in V\setminus\{s, t\}$ by two vertices $v_{\text{in}}, v_{\text{out}}$ joined by an edge $(v_{\text{in}}, v_{\text{out}})$ of capacity $c(v)$. Redirect each original edge $(u, v)$ to $(u_{\text{out}}, v_{\text{in}})$ with capacity $c(u, v)$ (take $s_{\text{out}} = s$ and $t_{\text{in}} = t$). Run any max-flow algorithm on $G'$ from $s$ to $t$, then map the flow back ($f(u, v) := f'(u_{\text{out}}, v_{\text{in}})$).

**(2) Correctness (2 marks).** In $G'$, every edge into $v$ enters $v_{\text{in}}$, whose only outgoing edge is the bridge. By conservation at $v_{\text{in}}$,
$$\sum_u f'(u_{\text{out}}, v_{\text{in}}) = f'(v_{\text{in}}, v_{\text{out}}) \le c(v),$$
so the flow through $v$ respects its capacity. Conversely, a flow $f$ in $G$ that respects vertex capacities becomes a flow in $G'$ by putting the throughput of $v$ on the bridge. This is a value-preserving bijection between feasible flows, so a max flow of $G'$ gives a max flow of $G$.

**Size and time (1 mark).** $\lvert V'\rvert = 2\lvert V\rvert - 2 = O(\lvert V\rvert)$ and $\lvert E'\rvert = \lvert E\rvert + \lvert V\rvert - 2 = O(\lvert V\rvert + \lvert E\rvert)$. Edmonds–Karp on $G'$ runs in $O(\lvert V'\rvert\lvert E'\rvert^2) = O(\lvert V\rvert(\lvert V\rvert + \lvert E\rvert)^2)$, polynomial.

**CT3 (Class Test I Q3, 6 marks).** $G$ is a directed graph with vertices $s, t$. (1) Prove that the maximum number of pairwise edge-disjoint directed $s$–$t$ paths equals the minimum number of edges whose removal disconnects all $s$–$t$ paths. (2) Give a polynomial-time algorithm to find the paths, with correctness and running time.

*Solution.* **Unit capacities, weak duality (2 marks).** Give every edge capacity 1. If there are $k$ edge-disjoint paths and $F$ is any set of edges whose removal disconnects $t$ from $s$, then $F$ contains at least one edge of each path, and these edges are distinct (paths share no edges), so $k\le\lvert F\rvert$. So max #paths ≤ min #edges.

**Strong duality (2 marks).** By the **integrality theorem** there is a max flow $f^*$ with $f^*(e)\in\{0, 1\}$. Flow decomposition (below) turns it into $\text{val}(f^*)$ edge-disjoint paths. By the **max-flow min-cut theorem** some cut $(P^*, Q^*)$ has $C(P^*, Q^*) = \text{val}(f^*)$; with unit capacities $C(P^*, Q^*)$ is the number of edges from $P^*$ to $Q^*$, and removing them leaves no path from $s\in P^*$ to $t\in Q^*$. So
$$\max\#\text{paths} \ge \text{val}(f^*) = C(P^*, Q^*) \ge \min\lvert F\rvert \ge \max\#\text{paths},$$
and all are equal.

**Algorithm (2 marks).** (i) Set $c(e) = 1$ and run Ford–Fulkerson: the value is at most $\deg^+(s)\le\lvert V\rvert - 1$, so at most $\lvert V\rvert$ augmentations of $O(\lvert E\rvert)$ each: $O(\lvert V\rvert\lvert E\rvert)$. (ii) **Decompose**: starting at $s$, follow any edge with $f^* = 1$; by conservation every vertex entered can be left, so the walk reaches $t$ (if it revisits a vertex, cut out the cycle); record the path, set its edges to 0, repeat $\text{val}(f^*)$ times. Each path is found in $O(\lvert E\rvert)$ (or $O(\lvert V\rvert)$ edges after removing cycles), total $O(\lvert V\rvert\lvert E\rvert)$. The paths are edge-disjoint because each edge carries at most one unit and is zeroed after use. (iii) The min edge set is the set of edges leaving the vertices reachable from $s$ in $G_{f^*}$.

# Class Test II: streaming palindromes and 2D pattern matching

Class Test II was 10 marks (two questions of 1.5 + 1.5 + 2), both on Lectures 20 and 21: polynomial fingerprinting, Schwartz–Zippel and the rolling hash. The theory is in the fingerprinting chapter. The solutions below follow the official solutions and rubric.

**CTB1 (Class Test II Q1, 5 marks).** A stream of characters forms a string $S = s_1s_2\ldots s_\ell$ of length $\ell \le n$ over an alphabet of size $k$; $\ell$ is given before the string. Design a small-space one-pass streaming algorithm to check whether $S$ is a palindrome. (1) [1.5] Define a polynomial $P(x)$ that can be updated term by term as each $s_i$ arrives, such that $P \equiv 0$ (all coefficients 0) iff $S$ is a palindrome. What is its maximum degree? (2) [1.5] Give pseudocode for a randomized streaming algorithm that evaluates $P(r) \bmod p$ in small space. (3) [2] How large should the prime $p$ be? State the error probability and space, showing the dependence on $n$ and $k$.

*Solution.* **The idea.** Comparing $s_1 = s_\ell$, $s_2 = s_{\ell-1}, \ldots$ naively needs the whole string, $\Theta(n\log k)$ bits. Instead reduce "is it a palindrome?" to "is this polynomial identically zero?" and test that at a random point (polynomial identity testing).

**(1) The polynomial (1.5 marks).** Encode the string forwards and backwards:
$$F_\ell(x) = \sum_{i=1}^{\ell} s_i\,x^{\ell-i}, \qquad R_\ell(x) = \sum_{i=1}^{\ell} s_i\,x^{i-1},$$
$$P(x) = F_\ell(x) - R_\ell(x) = \sum_{i=1}^{\ell} s_i\,(x^{\ell-i} - x^{i-1}) = \sum_{j=0}^{\ell-1}(s_{\ell-j} - s_{j+1})\,x^j.$$

- **Zero iff palindrome**: the coefficient of $x^j$ is $s_{\ell-j} - s_{j+1}$, so $P \equiv 0$ $\iff$ $s_{\ell-j} = s_{j+1}$ for every $j$ $\iff$ $S$ reads the same both ways.
- **Odd and even lengths**: for even $\ell = 2m$ every $j$ pairs two different positions. For odd $\ell = 2m+1$ the middle character gives coefficient $(s_{m+1} - s_{m+1})x^m = 0$, so it cancels on its own. Example: $\ell = 5$ gives $P = (s_5 - s_1) + (s_4 - s_2)x + 0\cdot x^2 + (s_2 - s_4)x^3 + (s_1 - s_5)x^4$.
- **Term-by-term update** when $s_i$ arrives: $F_i(x) = x\,F_{i-1}(x) + s_i$ (Horner's rule) and $R_i(x) = R_{i-1}(x) + s_i\,x^{i-1}$. After the last character both have degree $\ell - 1$ and line up, so the algorithm does not even need $\ell$ in advance.
- **Degree** $\deg P = \ell - 1 \le n - 1$.

Rubric: 0.75 for defining $P$ and showing the term-by-term construction; 0.75 for $P \equiv 0 \iff$ palindrome (noting that the middle term vanishes for odd $\ell$) and $\deg P \le n - 1$.

**(2) The streaming algorithm (1.5 marks).**

```
Streaming-Palindrome-Check(stream s_1 ... s_l, symbols in {0..k-1}):
  choose a prime p > max(k, n/eps); pick r uniformly from {0..p-1}
  HF <- 0;  HR <- 0;  pow <- 1
  for each arriving s_i:
      HF  <- (HF * r + s_i)   mod p     // Horner: HF = F_i(r)
      HR  <- (HR + s_i * pow) mod p     // adds s_i * r^(i-1): HR = R_i(r)
      pow <- (pow * r)        mod p     // now pow = r^i
  H <- (HF - HR) mod p
  if H == 0: return PALINDROME  else: return NOT PALINDROME
```

At every step $H_F - H_R \equiv P_i(r) \pmod p$ for the prefix of length $i$, whatever its parity. Rubric: 1.0 for correct $O(1)$-per-character updates of $H_F$, $H_R$, pow; 0.5 for the initialisation and the final test $(H_F - H_R) \bmod p = 0$.

**Trace A: $S = ababa$** with $a\mapsto1$, $b\mapsto2$, $p = 11$, $r = 3$. Here $P \equiv 0$.

| Step | $s_i$ | $H_F = H_F\cdot3 + s_i$ | $H_R = H_R + s_i\cdot\text{pow}$ | pow after |
|---|---|---|---|---|
| 1 | 1 | $0\cdot3 + 1 = 1$ | $0 + 1\cdot1 = 1$ | 3 |
| 2 | 2 | $1\cdot3 + 2 = 5$ | $1 + 2\cdot3 = 7$ | 9 |
| 3 | 1 | $5\cdot3 + 1 = 16 \equiv 5$ | $7 + 1\cdot9 = 16 \equiv 5$ | $27 \equiv 5$ |
| 4 | 2 | $5\cdot3 + 2 = 17 \equiv 6$ | $5 + 2\cdot5 = 15 \equiv 4$ | $15 \equiv 4$ |
| 5 | 1 | $6\cdot3 + 1 = 19 \equiv 8$ | $4 + 1\cdot4 = 8$ | $12 \equiv 1$ |

$H = 8 - 8 = 0$: **PALINDROME**. The prefixes $aba$ (step 3) and $ababa$ (step 5) are odd palindromes, and $H_F = H_R$ holds at exactly those steps.

**Trace B: $S = abaca$** with $c\mapsto3$, same $p$ and $r$. Now $s_2 = 2 \ne s_4 = 3$ and $P(x) = (3-2)x^3 + (2-3)x = x^3 - x \not\equiv 0$.

| Step | $s_i$ | $H_F$ | $H_R$ | pow after |
|---|---|---|---|---|
| 1–3 | 1, 2, 1 | 1, 5, 5 | 1, 7, 5 | 3, 9, 5 |
| 4 | 3 | $5\cdot3 + 3 = 18 \equiv 7$ | $5 + 3\cdot5 = 20 \equiv 9$ | 4 |
| 5 | 1 | $7\cdot3 + 1 = 22 \equiv 0$ | $9 + 1\cdot4 = 13 \equiv 2$ | 1 |

$H = (0 - 2) \bmod 11 = 9 \ne 0$: **NOT PALINDROME**. Check: $P(3) = 27 - 3 = 24 \equiv 2$, and indeed $H_R - H_F \equiv 2$.

**(3) Prime, error and space (2 marks).**

- **$p > k$ (alphabet)**: symbols lie in $\{0..k-1\}$, so two different symbols differ by $0 < \lvert s_{\ell-j} - s_{j+1}\rvert < k$. With $p > k$ this difference is nonzero mod $p$, so a non-palindrome gives a polynomial that is nonzero **over $\mathbb{Z}_p$**.
- **Error (Schwartz–Zippel)**: if $S$ is a palindrome, $P \equiv 0$ and the test always accepts (one-sided error). If not, $P \not\equiv 0$ has degree $\le n - 1$, so at most $n - 1$ roots in the field $\mathbb{Z}_p$, and
$$\Pr[P(r) \equiv 0 \pmod p] \le \frac{\deg P}{p} \le \frac{n-1}{p} < \frac np.$$
- **Choice of $p$**: for error at most $\varepsilon$ (for example $\varepsilon = 1/n$) take $\boxed{p > \max(k,\ n/\varepsilon)}$.
- **Space**: five numbers in $\mathbb{Z}_p$ ($p, r, H_F, H_R, \text{pow}$), so $O(\log p) = O(\log k + \log n + \log\frac1\varepsilon)$ bits; with $\varepsilon = 1/n$ that is $O(\log k + \log n)$, against $\Theta(n\log k)$ to store the string.

Rubric: 1.0 for explaining both $p > k$ and $\Pr[\text{error}] \le (n-1)/p$ via Schwartz–Zippel; 1.0 for $p > \max(k, n/\varepsilon)$ and space $O(\log p) = O(\log k + \log n)$ bits.

**CTB2 (Class Test II Q2, 5 marks).** You are given an $n\times n$ image $I$ and an $m\times m$ icon $T$ ($m \le n$), each pixel from an alphabet of size $k$. Check whether $T$ appears anywhere as an $m\times m$ subgrid of $I$. (1) [1.5] Represent any $m\times m$ subgrid as a single univariate polynomial $P(x)$ so that two grids are identical iff their polynomials are identical. What is its degree? (2) [1.5] Compute the fingerprints of all $(n-m+1)^2$ subgrids in $O(n^2)$ total time with a 2-stage rolling hash. (3) [2] Bound the total false-positive probability with Schwartz–Zippel and the union bound. How large should $p$ be, and how does the space per hash depend on $k$, $m$, $n$?

*Solution.* **(1) One polynomial per subgrid (1.5 marks).** For a subgrid $S[0..m-1][0..m-1]$:

- **Columns, base $x$**: column $j$ becomes $C_j(x) = \sum_{u=0}^{m-1} S[u][j]\,x^{m-1-u}$, degree $m - 1$.
- **Rows of columns, base $x^m$**: combine the columns with powers of $X = x^m$:
$$P_S(x) = \sum_{j=0}^{m-1} C_j(x)\,(x^m)^{m-1-j} = \sum_{j=0}^{m-1}\sum_{u=0}^{m-1} S[u][j]\,x^{(m-1-j)m + (m-1-u)}.$$
- **No two pixels share a power**: pixel $(u, j)$ gets exponent $(m-1-j)m + (m-1-u)$. As $j$ and $u$ range over $0..m-1$ this is a base-$m$ number with digits $m-1-j$ and $m-1-u$, so the exponents are exactly $0, 1, \ldots, m^2 - 1$, each once. For $m = 3$ the exponents are

| | column 0 | column 1 | column 2 |
|---|---|---|---|
| row 0 | $x^8$ | $x^5$ | $x^2$ |
| row 1 | $x^7$ | $x^4$ | $x^1$ |
| row 2 | $x^6$ | $x^3$ | $x^0$ |

So the coefficients of $P_S$ are exactly the pixels, and two grids are equal iff their polynomials are equal: $S = T \iff P_S - P_T \equiv 0$.
- **Degree** $m^2 - 1$ (from pixel $(0, 0)$).

Rubric: 1.0 for a univariate polynomial giving all $m^2$ pixels distinct exponents $0..m^2-1$; 0.5 for stating $\deg P_S = m^2 - 1$.

**(2) Two-stage rolling hash in $O(n^2)$ (1.5 marks).** Recomputing $P_S(r)$ from scratch at every position costs $O(m^2)$ each, $O(n^2m^2)$ in all. Instead:

*Stage 1, vertical strips (base $r$), 0.75 marks.* For column $j$ and top row $i$, let $C[i][j] = \sum_{u=0}^{m-1} I[i+u][j]\,r^{m-1-u} \bmod p$ be the hash of the height-$m$ strip. Sliding down one row: the top pixel $I[i][j]$ had weight $r^{m-1}$, so subtract $I[i][j]\,r^{m-1}$; multiply by $r$ to raise every remaining exponent by 1; add the new bottom pixel $I[i+m][j]$ with weight 1:
$$\boxed{C[i+1][j] = \big((C[i][j] - I[i][j]\,r^{m-1})\cdot r + I[i+m][j]\big) \bmod p}$$
$O(m)$ for $C[0][j]$ plus $O(1)$ per slide is $O(n)$ per column, $O(n^2)$ for all columns.

*Stage 2, horizontal windows (base $R = r^m$), 0.75 marks.* For row $i$, the subgrid at $(i, j)$ is the $m$ strips $C[i][j..j+m-1]$, with hash $H[i][j] = \sum_{v=0}^{m-1} C[i][j+v]\,R^{m-1-v} \bmod p$. This is exactly $P_S(r)$. Sliding right: subtract the leftmost strip $C[i][j]\,R^{m-1}$, multiply by $R$, add the new strip $C[i][j+m]$:
$$\boxed{H[i][j+1] = \big((H[i][j] - C[i][j]\,R^{m-1})\cdot R + C[i][j+m]\big) \bmod p}$$
$O(n)$ per row, $O(n^2)$ for all $(n-m+1)^2$ subgrids.

Full algorithm: choose a prime $p > \max(k, n^2m^2/\varepsilon)$ and a random $r$; precompute $r^{m-1}$, $R = r^m$ and $R^{m-1}$; compute $H_T = P_T(r)$ in $O(m^2)$; run stage 1, then stage 2, reporting FOUND at the first $H[i][j] = H_T$. Total $O(m^2) + O(n^2) + O(n^2) = O(n^2)$.

**Worked example** ($n = 3$, $m = 2$, $p = 17$, $r = 2$, so $r^{m-1} = 2$ and $R = 4$). Image rows $I = (1, 2, 1), (3, 4, 2), (2, 1, 3)$; icon rows $T = (4, 2), (1, 3)$, which is the bottom-right $2\times2$ block of $I$.

- Icon: columns $4\cdot2 + 1 = 9$ and $2\cdot2 + 3 = 7$, so $H_T = (9\cdot4 + 7) \bmod 17 = 43 \bmod 17 = 9$.
- Stage 1, row 0: $C[0][\cdot] = (1\cdot2 + 3,\ 2\cdot2 + 4,\ 1\cdot2 + 2) = (5, 8, 4)$. Slide down: $C[1][0] = (5 - 1\cdot2)\cdot2 + 2 = 8$, $C[1][1] = (8 - 2\cdot2)\cdot2 + 1 = 9$, $C[1][2] = (4 - 1\cdot2)\cdot2 + 3 = 7$. So $C = \begin{pmatrix}5 & 8 & 4\\ 8 & 9 & 7\end{pmatrix}$.
- Stage 2, row 0: $H[0][0] = (5\cdot4 + 8) \bmod 17 = 28 \bmod 17 = 11 \ne 9$; $H[0][1] = ((11 - 5\cdot4)\cdot4 + 4) \bmod 17 = (-32) \bmod 17 = 2 \ne 9$.
- Stage 2, row 1: $H[1][0] = (8\cdot4 + 9) \bmod 17 = 41 \bmod 17 = 7 \ne 9$; $H[1][1] = ((7 - 8\cdot4)\cdot4 + 7) \bmod 17 = (-93) \bmod 17 = 9 = H_T$: **FOUND at $(1, 1)$**.

**(3) Error, prime and space (2 marks).**

- **One window**: take $p > k$ so different pixel values stay different mod $p$. For a subgrid $S \ne T$, $D = P_S - P_T \not\equiv 0$ has degree $\le m^2 - 1$, so by Schwartz–Zippel
$$\Pr[P_S(r) \equiv P_T(r) \pmod p] \le \frac{m^2 - 1}{p} < \frac{m^2}{p}.$$
- **All windows (union bound)** over $(n-m+1)^2 \le n^2$ positions:
$$\Pr[\text{any false positive}] \le (n-m+1)^2\cdot\frac{m^2-1}{p} < \frac{n^2m^2}{p}.$$
- **Prime**: for total error $\le \varepsilon$ take $\boxed{p > \max(k,\ n^2m^2/\varepsilon)}$.
- **Space per hash**: $O(\log p) = O(\log k + \log n + \log m + \log\frac1\varepsilon)$ bits.

Rubric: 1.0 for the Schwartz–Zippel bound $(m^2-1)/p$ and the union bound over $\le n^2$ windows giving $n^2m^2/p$; 1.0 for $p > \max(k, n^2m^2/\varepsilon)$ and $O(\log k + \log m + \log n)$ bits per hash.

**What to take from Class Test II.** Both questions are the Lecture 20–21 recipe applied to a new object: (1) encode the objects as polynomials whose coefficients are the data, so "equal" becomes "the difference polynomial is zero"; (2) evaluate at a random $r$ modulo a prime, updating in $O(1)$ per step; (3) bound one error by degree$/p$ (Schwartz–Zippel) and many errors by the union bound; (4) choose $p$ larger than the alphabet and than (number of tests × degree)$/\varepsilon$. Expect the endsem to do the same with yet another object.
