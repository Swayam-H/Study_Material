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
