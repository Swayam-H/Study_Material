# Moodle practice set, solved

These are the six problems from the Moodle practice set (max flow and randomized approximation), with the official solutions expanded, and the two "additional practice" Hall problems.

**PP1 (Practice set Problem 1).** A network carries the flow $s\to a$ 4/4, $s\to b$ 1/2, $a\to b$ 3/3, $a\to t$ 1/2, $b\to t$ 4/4. (a) Every $s$–$t$ path passes through a saturated edge. Does that mean $f$ is maximum? (b) Is $f$ maximum? If not, find a larger flow and prove it is maximum.

*Solution.* (a) **No.** It only means greedy augmentation **without back edges** is stuck. A larger flow may need to cancel flow already sent. Maximality needs a cut with capacity equal to the value, or equivalently no $s$–$t$ path in the residual graph **including backward edges**.

(b) $\text{val}(f) = 4 + 1 = 5$. In $G_f$: $s\to b$ has residual $2 - 1 = 1$; the backward edge $b\to a$ has residual $f(a, b) = 3$; $a\to t$ has residual $2 - 1 = 1$. So
$$s\to b\to a\to t, \qquad \Delta = \min(1, 3, 1) = 1$$
is an augmenting path. Pushing 1 lowers $f(a, b)$ to 2:
$$f'(s,a) = 4,\ f'(s,b) = 2,\ f'(a,b) = 2,\ f'(a,t) = 2,\ f'(b,t) = 4,\qquad \text{val}(f') = 6.$$
Check conservation: at $a$, in 4 = out $2 + 2$; at $b$, in $2 + 2$ = out 4. **Maximality**: the cut $P = \{s\}$ has $C = c(s,a) + c(s,b) = 4 + 2 = 6 = \text{val}(f')$, so by weak duality $f'$ is maximum (and the cut is minimum).

**PP2 (Practice set Problem 2).** $m$ groups of exactly $k$ students (a student may be in several groups). Split the class into two rooms so that no group is entirely in one room. (a) Show this is always possible if $m < 2^{k-1}$. (b) For $k = 2$, what is the smallest number of pairs that cannot be split?

*Solution.* (a) Put each student in room 1 or 2 by an independent fair coin. A fixed group is all in room 1 with probability $2^{-k}$ and all in room 2 with probability $2^{-k}$: monochromatic with probability $2^{1-k}$. Let $X_i$ indicate that group $i$ is monochromatic and $X = \sum_i X_i$. By linearity, $\mathbb{E}[X] = m\cdot2^{1-k} < 1$ when $m < 2^{k-1}$. $X$ takes non-negative integer values; if every split had $X\ge1$, the average would be $\ge 1$. So some split has $X = 0$.

(b) **3.** For $k = 2$ each group is an edge, and a valid split is a 2-colouring in which every edge crosses: the graph of pairs must be bipartite. The pairs $\{1,2\}, \{2,3\}, \{1,3\}$ form a triangle (an odd cycle), which cannot be split. Any two pairs form a graph with at most two edges, which has no cycle and is bipartite. So 3 is the minimum. (Part (a) only guarantees $m < 2$ here, so its bound is not tight.)

**PP3 (Practice set Problem 3).** In a directed graph with $s, t$, some edges are protected (cannot be removed). Find the fewest removable edges whose removal leaves no $s$–$t$ path, or report that it is impossible. Give a polynomial algorithm, prove it, and state its time.

*Solution.* **Idea**: make a min cut count only removable edges by giving protected edges a capacity so large that no min cut can use them.

```
FewestRemovableEdges(G, protected E_p, s, t):
    if t is reachable from s using only edges of E_p:   // BFS
        return "impossible"
    c(e) ← |E| + 1 if e ∈ E_p, else 1
    f ← max flow from s to t (Ford–Fulkerson)
    P ← vertices reachable from s in G_f
    return val(f) and the removable edges from P to V \ P
```

**Correctness.** If $s$ reaches $t$ through protected edges, nothing can be removed from that path: impossible. Otherwise let $P_0$ = the vertices reachable from $s$ along protected edges; $t\notin P_0$, and no protected edge leaves $P_0$ (its head would be in $P_0$). So the cut $(P_0, V\setminus P_0)$ uses only removable edges and has capacity $\le\lvert E\rvert < \lvert E\rvert + 1$. Hence **no minimum cut contains a protected edge**. Now:

- A cut $(P, Q)$ with no protected edge from $P$ to $Q$ has capacity = the number of removable edges from $P$ to $Q$, and deleting them leaves no edge out of $P$, so $t$ is unreachable.
- If deleting a set $F$ of removable edges disconnects $t$, let $P$ be the vertices still reachable from $s$. Every edge from $P$ to $V\setminus P$ was deleted (else its head is reachable), so those edges are in $F$, none is protected, and $C(P, V\setminus P)\le\lvert F\rvert$.

So the minimum cut capacity equals the answer, and by max-flow min-cut it equals $\text{val}(f)$. The residual reachable set gives a min cut; its forward edges are the edges to remove.

**Time.** BFS $O(\lvert V\rvert + \lvert E\rvert)$. The flow value is at most $\lvert E\rvert$, so Ford–Fulkerson does at most $\lvert E\rvert$ augmentations of $O(\lvert V\rvert + \lvert E\rvert)$: $O(\lvert E\rvert(\lvert V\rvert + \lvert E\rvert))$.

**PP4 (Practice set Problem 4).** Directed graph with $m$ edges; each vertex joins $S$ independently with probability $p$; edge $(u, v)$ is cut if $u\in S$, $v\in\bar S$. (a) Expected number of cut edges, best $p$, and conclude a $\frac14$-approximation. (b) With $p = \frac12$, are the indicators of $(u, v)$ and $(v, w)$ independent? Does (a) need independence?

*Solution.* (a) $\Pr[(u,v)\text{ cut}] = \Pr[u\in S]\Pr[v\notin S] = p(1-p)$ by independence. With indicators $X_e$ and linearity, $\mathbb{E}[\sum_eX_e] = p(1-p)m$. Since $p(1-p) = \frac14 - (p-\frac12)^2$, the best choice is $p = \frac12$, giving $\frac m4$. Some $S$ reaches the average, so every directed graph has a set cutting $\ge\frac m4$ edges. No set cuts more than $m$, so the random algorithm achieves at least $\frac14$ of the optimum in expectation.

(b) **No.** Both are cut only if $v\in\bar S$ (for $(u,v)$) and $v\in S$ (for $(v,w)$), which is impossible: $\Pr[\text{both}] = 0\ne\frac14\cdot\frac14$. Part (a) used only linearity of expectation, which holds for dependent variables.

**PP5 (Practice set Problem 5).** True or false (prove or give a counterexample): (a) distinct capacities ⇒ the min cut is unique; (b) if $f$ is a max flow and $(P, Q)$ a min cut, every edge from $Q$ to $P$ carries 0; (c) integer capacities ⇒ every max flow is integral; (d) if a max flow sends a positive amount around a directed cycle, decreasing every cycle edge by that amount gives another max flow.

*Solution.* (a) **False.** $s\to a$ (1), $s\to b$ (2), $a\to c$ (4), $b\to c$ (5), $c\to t$ (3). $P = \{s\}$ has capacity 3 and $P = \{s, a, b, c\}$ has capacity 3; every other cut is $\ge 4$. Distinct capacities can still give equal cut sums.
(b) **True.** By cut invariance and capacities, $\text{val}(f) = f(P\to Q) - f(Q\to P)\le C(P, Q) - f(Q\to P)$. By MFMC $\text{val}(f) = C(P, Q)$, so $f(Q\to P)\le 0$; flows are non-negative, so every $Q\to P$ edge carries 0.
(c) **False.** $s\to a$, $a\to t$, $a\to b$, $b\to t$, all capacity 1. Send 1 on $s\to a$, then $\frac12$ on $a\to t$ and $\frac12$ on $a\to b\to t$: value $1 = C(\{s\}, \cdot)$, maximum, not integral. Integrality guarantees **an** integral max flow (Ford–Fulkerson finds one), not that all are.
(d) **True.** Let each cycle edge carry $\ge\delta > 0$ and lower each by $\delta$. Capacities hold (flows drop but stay $\ge 0$). Each cycle vertex loses $\delta$ of inflow and $\delta$ of outflow: conservation holds. If $s$ is on the cycle, its outflow and inflow both drop by $\delta$, so the value is unchanged; otherwise nothing at $s$ changes. Same value, so still maximum.

**PP6 (Practice set Problem 6).** Sequential greedy for MaxCut: $v_1\in S$; each next $v$ goes to $\bar S$ if $d_S(v) > d_{\bar S}(v)$, else to $S$ (counting already-placed neighbours). (a) Give a bipartite graph and an order where it does not cut every edge. (b) Prove that for a connected bipartite graph processed in BFS order it cuts every edge.

*Solution.* (a) The path $a - b - c - d$ in order $a, d, b, c$. $a\in S$; $d$ has no placed neighbour (tie 0–0), so $d\in S$; $b$ has $a\in S$, so $b\in\bar S$; $c$ has $b\in\bar S$ and $d\in S$ (tie), so $c\in S$. Edge $cd$ is not cut: 2 of 3 edges. Placing $d$ before any of its neighbours fixed its side arbitrarily.

(b) BFS from $r$ gives layers $L_0 = \{r\}, L_1, L_2, \ldots$. In a bipartite graph there is no edge inside a layer (with the two BFS tree paths it would close an odd cycle), and every edge joins consecutive layers. **Claim**: greedy puts even layers in $S$ and odd layers in $\bar S$. Induction in BFS order: $r\in S$. When $v\in L_i$ ($i\ge1$) is processed, its already-placed neighbours lie in $L_{i-1}$ (not $L_i$: no edges inside a layer; not $L_{i+1}$: processed later), and there is at least one (its BFS parent). By induction all of $L_{i-1}$ is on one side, so all placed neighbours of $v$ are on that side. If $L_{i-1}\subseteq S$ then $d_S(v)\ge1 > 0 = d_{\bar S}(v)$, so $v\in\bar S$; if $L_{i-1}\subseteq\bar S$ then $d_S(v) = 0 < d_{\bar S}(v)$, so the rule (go to $\bar S$ only when $d_S(v) > d_{\bar S}(v)$) puts $v\in S$. Either way $v$ goes opposite $L_{i-1}$. Every edge joins consecutive layers, which are on opposite sides, so every edge is cut: $\lvert\text{Cut}(S)\rvert = \lvert E\rvert$.

**PP7 (Additional practice 1.1, magic squares, 5 marks).** $M$ is an $n\times n$ matrix of non-negative integers whose rows and columns all sum to $d$. Prove $M = P_1 + \cdots + P_d$ for permutation matrices $P_i$ (repeats allowed).

*Solution.* **Induction on $d$.** $d = 0$: $M = 0$, the empty sum. For $d\ge1$, build the bipartite **multigraph** $G$ with rows $r_1..r_n$ on the left, columns $c_1..c_n$ on the right, and $M_{ij}$ parallel edges between $r_i$ and $c_j$. Every vertex has degree $d$ (row and column sums).

**$G$ has a perfect matching** by Hall: for any set $S$ of rows, $d\lvert S\rvert$ edges leave $S$, all landing in $N(S)$, which receives at most $d\lvert N(S)\rvert$ edges in total. So $\lvert N(S)\rvert\ge\lvert S\rvert$.

A perfect matching picks, for each row $i$, a distinct column $\sigma(i)$ with $M_{i\sigma(i)}\ge1$. Let $P$ be the permutation matrix of $\sigma$. Then $M - P$ has non-negative integer entries and all line sums $d - 1$. By induction $M - P = P_2 + \cdots + P_d$, so $M = P + P_2 + \cdots + P_d$.

**PP8 (Additional practice 1.2, König, 5 marks).** In a bipartite graph, the size of a minimum vertex cover equals the size of a maximum matching.

*Solution.* **$\ge$**: the edges of a matching are disjoint, so a cover needs a distinct vertex for each: $\lvert C\rvert\ge\lvert M\rvert$.

**$\le$**: let $M$ be maximum and $Z$ the set of vertices reachable from free left vertices by alternating paths (non-matching edges $L\to R$, matching edges $R\to L$). Take $C = (L\setminus Z)\cup(R\cap Z)$.

*$C$ covers every edge* $uv$ ($u\in L$): if $u\notin Z$ then $u\in C$. If $u\in Z$ and $uv\notin M$, the alternating path extends along $uv$ to $v$, so $v\in Z\cap R\subseteq C$. If $u\in Z$ and $uv\in M$: $u$ is matched, so it is not a free start; the alternating path reached $u$ through its matched edge, from $v$, so $v\in Z$.

*$\lvert C\rvert = \lvert M\rvert$*: each $v\in R\cap Z$ is matched (else the alternating path to it would be augmenting, contradicting Berge) and its partner is in $L\cap Z$. Each $u\in L\setminus Z$ is matched (free left vertices are in $Z$) and its partner is not in $Z$ (else $u$ would be reached through it). So every edge of $M$ has exactly one endpoint in $C$, and every vertex of $C$ is matched: $\lvert C\rvert = \lvert M\rvert$.

# Assignments 1 and 2, solved

**AS1 (Assignment 1 Q1).** Given $z_0, \ldots, z_{n-1}$ (repeats allowed), find the coefficients of a polynomial of degree $n$ with zeros exactly at the $z_j$, in $O(n\log^2 n)$, with proof.

*Solution.* $P(x) = \prod_{j}(x - z_j)$ vanishes exactly at the $z_j$ (with multiplicity). **Algorithm**: Build($l, r$) returns $\prod_{l\le j<r}(x - z_j)$: if $r - l = 1$ return $(x - z_l)$; else let $m = \lfloor(l + r)/2\rfloor$ and return FFT-Multiply(Build($l, m$), Build($m, r$)). Call Build($0, n$).

**Correctness** by induction on $r - l$: the product of the two halves is the product over $[l, r)$.

**Time.** The two children have degree $\approx k/2$ each for a node of size $k$, and FFT multiplication of two degree-$k/2$ polynomials costs $O(k\log k)$. So $T(n) = 2T(n/2) + O(n\log n)$. **Recursion tree**: level $j$ has $2^j$ nodes of size $n/2^j$, costing $2^j\cdot O(\frac n{2^j}\log\frac n{2^j})\le O(n\log n)$; there are $\log_2 n$ levels, so $T(n) = O(n\log^2 n)$. (The basic master theorem does not cover a driving term $n\log n$; sum the levels.) Multiplying factors one at a time would cost $\Theta(n^2)$.

**AS2 (Assignment 1 Q2).** Cities with distinct cable costs; an MST is built. (1) A new cable $e = (u, v)$ with cost $c(e)$ is proposed: check efficiently whether it helps, and update. (2) Prove the MST is unique.

*Solution.* (1) Find the path between $u$ and $v$ in the tree (DFS, $O(n)$) and its heaviest edge $f$. If $c(e) > w(f)$, $e$ is the heaviest edge of the cycle $\text{path} + e$, so by the cycle property it is in no MST: keep the tree. Otherwise the new MST is $T - f + e$, which is cheaper by $w(f) - c(e)$. **Why optimal**: every non-tree edge $g$ of the old graph is the heaviest on its cycle with $T$; that cycle avoids $e$ and is still a cycle in $G + e$, so $g$ is in no MST of $G + e$. So the MST of $G + e$ lies inside $T\cup\{e\}$, a graph with exactly one cycle, whose MST is obtained by deleting that cycle's heaviest edge. $O(n)$ time.

(2) Suppose $T\ne T'$ are MSTs. Let $e$ be the lightest edge in their symmetric difference, say $e\in T\setminus T'$. $T' + e$ has a cycle; it contains an edge $e'\notin T$ (else $T$ has a cycle), so $e'\in T'\setminus T$ and $w(e') > w(e)$ by the choice of $e$ and distinctness. Then $T' + e - e'$ is a spanning tree lighter than $T'$: contradiction.

**AS3 (Assignment 1 Q3).** $n$ students and $n$ projects with complete rankings. (1) Give an $O(n^2)$ algorithm for a stable matching, proving it cannot stop with an unmatched student while a project is available. (2) Prove student-optimality of its output, and the corresponding statement for projects.

*Solution.* Students propose in Gale–Shapley (matchings page). (1) **Time**: each student proposes to each project at most once, $\le n^2$ proposals, each $O(1)$ with a precomputed rank table: $O(n^2)$. **No one left out**: if student $s$ ends unmatched, $s$ proposed to every project; a project that has received a proposal stays matched; so all $n$ projects are matched to $n$ students other than $s$: impossible. **Stability**: the blocking-pair case analysis (Theorem 3 on the matchings page). (2) Student-optimal and project-pessimal: Theorem 4 on the matchings page (first rejection by a valid partner gives a blocking pair; then the pessimality argument). "The corresponding statement for projects": every project gets its **worst** valid student in this output, and its best one in the project-proposing version.

**AS4 (Assignment 1 Q4).** (a) Prove WhateverFirstSearch($s$) marks exactly the vertices reachable from $s$. (b) TwoColorSearch: all white; $s$ gray; while some vertex is gray, pick a gray $v$: if it has no white neighbour, colour it black, else pick a white neighbour $w$, set parent($w$) = $v$, colour $w$ gray. Prove the invariant "no black vertex is adjacent to a white vertex", and that at the end the reachable vertices are black, the others white, and the parent edges form a spanning tree of $s$'s component.

*Solution.* (a) See the graphs page: induction on bag insertions for "only reachable"; the first-unmarked-vertex-on-a-path contradiction for "every reachable".

(b) **Invariant.** Initially nothing is black. A vertex turns black only when it has no white neighbour, so the invariant holds right after. Later steps only turn white vertices gray (never white again) and gray ones black; no vertex ever becomes white, so a black vertex never gains a white neighbour.
**Termination**: each step colours a white vertex gray or a gray vertex black; each vertex changes at most twice, so at most $2n$ steps.
**At the end** no vertex is gray. Every vertex coloured is reachable (a vertex turns gray only as a neighbour of a gray, hence by induction reachable, vertex). Conversely, if a reachable $v$ were white, take a path $s\leadsto v$; $s$ is black, so there is a black vertex followed by a white one on the path: adjacent black and white, contradicting the invariant. So reachable = black, unreachable = white.
**Tree**: each vertex except $s$ that became gray got exactly one parent, which was already gray (coloured earlier). So the parent edges, $k - 1$ of them on the $k$ reached vertices, point from each vertex to an earlier one: following parents strictly goes back in time and ends at $s$, so there is no cycle, and every vertex is connected to $s$. A connected acyclic graph on the component is a spanning tree rooted at $s$.

**AS5 (Assignment 2 Q1).** Longest strictly increasing subsequence of $n$ distinct prices in $O(n\log n)$, with proof, plus $O(1)$ queries "is $p_k$ on some longest increasing subsequence?" after $O(n\log n)$ preprocessing.

*Solution.* Full answer on the DP page (patience `tail` array with binary search; correctness via the sorted-tails invariant; queries via $L[k] + R[k] - 1 = \lambda$ where $R$ comes from running the algorithm on the reversed sequence for decreasing runs).

**AS6 (Assignment 2 Q2).** Maximum-capacity set of servers in a tree with no two adjacent, in $O(n)$, with reconstruction.

*Solution.* Tree DP with in$[v] = c_v + \sum$ out$[\text{child}]$ and out$[v] = \sum\max(\text{in}, \text{out})[\text{child}]$ in post-order; $O(n)$ because each vertex is a child once; reconstruct top-down with a "parent chosen" flag. Details on the DP page.

**AS7 (Assignment 2 Q3).** $k$-ary Huffman: counterexample to naive merging, the corrected algorithm, and its time.

*Solution.* Four symbols of frequency 1 with $k = 3$: naive cost 7, optimal 6. Fix: pad with zero-frequency dummies until $(n - 1)\equiv 0\pmod{k-1}$, then merge the $k$ smallest each time. $O(n\log n)$. Details on the greedy page.

**AS8 (Assignment 2 Q4).** Remove at most $k$ speed signs to minimise travel time: greedy counterexample, DP, $O(n^2k)$ time and $O(nk)$ space.

*Solution.* Counterexample $d = (0, 1, 5, 6)$, $a = (2, 4, 7, 8)$, $l = 10$, $k = 2$: greedy reaches 44, optimum 38. DP $T[i][r]$ = the fastest way to reach sign $i$ with $i$ kept and $r$ removals so far, minimising over the previous kept sign. Details on the DP page.

**AS9 (Assignment 2 Q5).** Minimum initial energy on a grid moving right or down, strength always $\ge1$.

*Solution.* Backward DP $E[i][j] = \max(1, \min(E[i+1][j], E[i][j+1]) - g[i][j])$; on the given grid the answer is 7. Details on the DP page.

# New endsem-style problems

These are new problems in the style of this year's papers, one per major post-midsem topic, with marking schemes.

**NE1 (flow reduction, 6 marks).** A hospital has $n$ doctors and $k$ holiday periods; period $j$ is a set $D_j$ of days. Doctor $i$ can work only on days in $S_i$. Each holiday day needs exactly one doctor; each doctor works at most $c$ days in total and at most one day per period. Decide whether a valid assignment exists, in polynomial time.

*Solution.* **Network.** Source $s$; a node per doctor $i$ with $s\to i$ capacity $c$; a node $(i, j)$ per doctor and period with $i\to(i, j)$ capacity 1; for each day $d\in D_j\cap S_i$ an edge $(i, j)\to d$ capacity 1; each day node $d\to t$ capacity 1. Let $D = \sum_j\lvert D_j\rvert$ (the periods are disjoint sets of days).

**Claim**: an assignment exists iff the max flow equals $D$.
($\Rightarrow$) An assignment gives a flow: one unit $s\to i\to(i, j)\to d\to t$ for each (doctor, day) pair. Doctor $i$ uses $\le c$ units at $s\to i$ and $\le 1$ per gadget; each day gets exactly 1. Value $D$.
($\Leftarrow$) By **integrality** take an integral max flow of value $D$. Every $d\to t$ is saturated: each day gets exactly one unit, i.e. one doctor. Doctor $i$ is assigned at most $c$ days (capacity of $s\to i$), at most one per period (capacity of $i\to(i,j)$), only days in $S_i$ (edges exist only there).

**Time.** $O(nk + \sum_i\lvert S_i\rvert)$ edges, flow value $\le D$, so Ford–Fulkerson is $O(D\cdot E')$, polynomial.

*Marking.* Network (2) · both directions with integrality cited (3) · size and time (1).

**NE2 (probabilistic method, 5 marks).** A graph $G$ has $n$ vertices and $m$ edges with $m\ge n/2$. Show $G$ has an independent set of size at least $\frac{n^2}{4m}$.

*Solution.* Keep each vertex independently with probability $p$, giving a set $S$; let $X = \lvert S\rvert$ and $Y$ = the number of edges inside $S$. $\mathbb{E}[X] = pn$ and, since an edge survives iff both ends do, $\mathbb{E}[Y] = p^2m$ (linearity). Delete one endpoint of each surviving edge: what remains is independent with at least $X - Y$ vertices. $\mathbb{E}[X - Y] = pn - p^2m$. Take $p = \frac{n}{2m}\le 1$ (using $m\ge n/2$): $\mathbb{E}[X - Y] = \frac{n^2}{2m} - \frac{n^2}{4m} = \frac{n^2}{4m}$. Some outcome has $X - Y\ge\frac{n^2}{4m}$, giving an independent set that large.

*Marking.* Random set and deletion step (1) · both expectations via linearity (2) · choice of $p$ with $p\le1$ checked (1) · averaging conclusion (1).

**NE3 (NP-hardness, 6 marks).** **Dominating Set**: given $G$ and $k$, is there $D\subseteq V$, $\lvert D\rvert\le k$, such that every vertex is in $D$ or adjacent to $D$? Show it is NP-complete, by reduction from Vertex Cover.

*Solution.* **In NP**: certificate $D$; check $\lvert D\rvert\le k$ and each vertex is in $D$ or has a neighbour in $D$: $O(n + m)$.

**Direction**: Vertex Cover $\le_P$ Dominating Set. Given $(G, k)$, delete isolated vertices (they need not be covered in VC; let $n'$ remain). Build $G'$: keep $G$, and for each edge $uv$ add a new vertex $x_{uv}$ adjacent to $u$ and $v$. Keep $k$.

($\Rightarrow$) A vertex cover $C$ of size $\le k$: each $x_{uv}$ is adjacent to $u$ or $v$, one of which is in $C$; each original vertex is non-isolated, and any edge $uw$ at it has $u\in C$ or $w\in C$, so it is in $C$ or adjacent to $C$. $C$ dominates $G'$.

($\Leftarrow$) A dominating set $D$ of size $\le k$ in $G'$: replace each $x_{uv}\in D$ by $u$ (still dominating, since $u$ dominates everything $x_{uv}$ did: $x_{uv}$, $u$, $v$). Now $D\subseteq V$. Each $x_{uv}$ must be dominated by $u$ or $v$, so every edge has an endpoint in $D$: a vertex cover of size $\le k$.

**Size**: $n + m$ vertices and $m + 2m$ edges.

*Marking.* In NP (1) · correct direction and construction (2) · both directions (2) · polynomial size (1).

**NE4 (fingerprinting, 4 marks).** Alice and Bob each hold an $n\times n$ 0/1 matrix, $A$ and $B$. Give an $O(\log n)$-bit protocol that detects $A\ne B$ with probability $\ge 1 - \frac1n$.

*Solution.* Read each matrix row by row as a bit string of length $N = n^2$ and use the polynomial fingerprint: a prime $p\in[N^2, 2N^2]$, random $r\in\mathbb{Z}_p$, Alice sends $(r, P_A(r)\bmod p)$. If $A\ne B$, $P_A - P_B$ is nonzero of degree $< N$, so it has $< N$ roots and $\Pr[\text{miss}] < N/p\le 1/N\le 1/n$. If $A = B$ the test always passes. Bits sent: $2\lceil\log_2 p\rceil = O(\log n)$.

*Marking.* Encoding as a polynomial over a prime field (1) · error bound with the root-counting argument (2) · bit count (1).
