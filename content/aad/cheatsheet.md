# Last-hour cheat sheet

Everything on one page per area. If a line here is unfamiliar, go back to its chapter.

## Running times

| Algorithm | Time | Notes |
|---|---|---|
| Peasant multiplication | $O(\log x)$ iterations | state the cost of addition |
| Euclid gcd | $O(\log a)$ steps | $a \bmod b < a/2$ |
| Merge sort | $O(n\log n)$ | optimal for comparison sorts ($\log_2 n! = \Omega(n\log n)$) |
| Karatsuba | $O(n^{\log_2 3})\approx n^{1.59}$ | $3T(n/2) + O(n)$ |
| Strassen | $O(n^{\log_2 7})\approx n^{2.81}$ | $7T(n/2) + O(n^2)$ |
| Hadamard $H_kv$, FFT | $O(n\log n)$ | $2T(n/2) + O(n)$ |
| Polynomial from $n$ roots | $O(n\log^2 n)$ | $2T(n/2) + O(n\log n)$ |
| DFS, BFS, topological sort, SCC | $O(n + m)$ | |
| Dijkstra (binary heap) | $O((n + m)\log n)$ | needs $w\ge0$ |
| Bellman–Ford | $O(nm)$ | round $n$ detects negative cycles |
| DAG shortest/longest path | $O(n + m)$ | |
| Kruskal, Prim | $O(m\log n)$ | cut property |
| Gale–Shapley | $O(n^2)$ | $\le n^2$ proposals |
| Kuhn bipartite matching | $O(nm)$ | Hopcroft–Karp $O(m\sqrt n)$ |
| Huffman | $O(n\log n)$ | $n-1$ merges |
| Interval partitioning | $O(n\log n)$ time, $O(n)$ space | sort by start, min-heap of finishes |
| LIS | $O(n\log n)$ | patience tails |
| Knapsack | $O(nW)$ | pseudo-polynomial |
| Alignment / edit distance | $O(mn)$ | |
| Ford–Fulkerson | $O(m\lvert f^*\rvert)$ | integer capacities |
| Edmonds–Karp | $O(nm^2)$ | BFS shortest paths, $O(nm)$ augmentations |
| Random cut | $\mathbb{E} = m/2$ | $\frac12$-approximation |
| Fingerprint equality | $O(\log n)$ bits, error $\le (n-1)/p$ | $p$ prime |
| Rabin–Karp | $O(n + m)$, error $\le nm/p$ | union bound |
| Streaming palindrome | $O(\log k + \log n)$ bits, error $\le (n-1)/p$ | $p > \max(k, n/\varepsilon)$ |
| 2D Rabin–Karp ($m\times m$ in $n\times n$) | $O(n^2)$, error $\le n^2m^2/p$ | vertical then horizontal roll, $R = r^m$ |

## Master theorem

$T(n) = aT(n/b) + O(n^d)$: $O(n^d)$ if $d > \log_b a$; $O(n^d\log n)$ if $d = \log_b a$; $O(n^{\log_b a})$ if $d < \log_b a$. Otherwise sum the recursion tree level by level.

## FFT in five lines

- $A(x) = A_e(x^2) + xA_o(x^2)$; $\omega = e^{2\pi i/n}$, $\omega^{n/2} = -1$, $\omega^2$ is a primitive $(n/2)$th root.
- $r_j = s_j + \omega^js'_j$, $r_{j+n/2} = s_j - \omega^js'_j$.
- $M_n(\omega)^{-1} = \frac1nM_n(\omega^{-1})$, because $\sum_\ell\omega^{\ell d} = 0$ for $d\not\equiv0$.
- Multiply: pad to $n\ge 2d+1$ (power of 2), FFT both, multiply pointwise, inverse FFT.
- $n = 8$: $\omega = \frac{1+i}{\sqrt2}$, $\omega^2 = i$, $\omega^3 = \frac{-1+i}{\sqrt2}$, $\omega^4 = -1$.

## Graph facts

- Cycle in a directed graph $\iff$ DFS back edge. DAG: decreasing post order is topological.
- Dijkstra proof: the first edge of a shortest path leaving the done set, plus $w\ge0$.
- Bellman–Ford: after round $k$, dist ≤ best path with $\le k$ edges.
- Cut property: lightest edge across a cut respecting $X$ extends $X$ to an MST (exchange on the cycle). Distinct weights ⇒ unique MST (lightest edge in the symmetric difference).

## Matching facts

- GS: proposers only go down, receivers only go up. Terminates ($\le n^2$), perfect, stable, proposer-optimal, receiver-pessimal.
- Unique stable matching if men- and women-proposing agree: else $(m, w)$ from $S$ blocks $S'$.
- **Hall**: matching covering $L$ $\iff$ $\lvert N(S)\rvert\ge\lvert S\rvert$ $\forall S\subseteq L$. Prove by double counting edges out of $S$. Disprove with one violator.
- $d$-regular bipartite ⇒ perfect matching ⇒ union of $d$ perfect matchings. SDR and Latin squares follow.
- **Berge**: maximum $\iff$ no augmenting path (via $M\oplus M^*$: paths and even cycles).
- **König**: max matching = min vertex cover (bipartite), $C = (L\setminus Z)\cup(R\cap Z)$.

## Greedy facts

- Huffman: merge the two smallest; cost $= \sum f_i\ell_i$ = sum of internal node weights; proof by exchange (two smallest are deepest siblings) + induction on $n$.
- Kraft: $\sum 2^{-\ell_i}\le1$. $k$-ary Huffman: pad with zeros until $n - 1\equiv0\pmod{k-1}$.
- Interval scheduling: earliest finish (stays ahead). Interval partitioning: sort by start; rooms = depth.

## DP answer skeleton (one mark each)

1. Table and what an entry means, where the answer is. 2. Base cases. 3. Recurrence by the first/last decision. 4. Infeasible options: excluded from the max or $-\infty$, never 0. 5. Fill order and backtracking with a choice table. 6. States × work; rolling arrays for value only; say "pseudo-polynomial" when a value like $B$ appears.

## Max-flow facts

- Capacity counts only forward edges $P\to Q$. Cut invariance: $\text{val}(f) = f(P\to Q) - f(Q\to P)$.
- Weak duality: val ≤ cut. Equality is a certificate for both.
- Residual: forward $c - f$, backward $f$. FF stops ⇒ reachable set $P^*$ gives a cut with saturated out-edges and empty in-edges ⇒ MFMC.
- Integrality: integer capacities ⇒ an integral max flow exists (not all max flows).
- **Check for a backward-edge augmenting path before stopping** (CT I lost 2.5 marks for stopping at 14).
- Reductions: matching ($s\to L\to R\to t$, unit); Hall ($\infty$ middle, finite cut ⇒ $N(S)\subseteq T$); Menger (unit capacities + decomposition); vertex capacities (split $v_{\text{in}}\to v_{\text{out}}$); super source/sink; demands and lower bounds; project selection ($\infty$ prerequisite edges, profit = positives − min cut); protected edges (capacity $\lvert E\rvert + 1$).
- Write: construction · flow ⇒ solution (cite integrality) · solution ⇒ flow · MFMC · size and time.

## Randomized facts

- Indicators + linearity (no independence needed) + averaging ⇒ existence.
- Random cut: $\Pr[\text{edge cut}] = \frac12$ ⇒ $m/2$. Directed: $p(1-p)$ ⇒ $m/4$. 3 colours: $\frac23m$. 3-SAT: $\frac78m$. Random order DAG: $\frac12$ per edge ⇒ $m/2$.
- $\mathbb{E}[\text{bad}] < 1$ ⇒ some outcome has no bad item.
- Edge indicators of a random cut: pairwise independent, not mutually (triangle).
- Sequential greedy: each vertex cuts at least half of its edges to placed neighbours ⇒ $\ge m/2$.
- Fingerprint: $P_a(r)\bmod p$; nonzero degree-$d$ polynomial over a field has $\le d$ roots; one-sided error; deterministic equality needs $n$ bits (pigeonhole).
- Rolling hash: $H(i+1) = r(H(i) - s[i]R) + s[i+m]$, $R = r^{m-1}\bmod p$; reduce negatives mod $p$.
- Palindrome: $P = F - R = \sum_j (s_{\ell-j} - s_{j+1})x^j$; $H_F \leftarrow H_Fr + s_i$, $H_R \leftarrow H_R + s_i\,\text{pow}$, $\text{pow} \leftarrow \text{pow}\cdot r$. Need $p > k$ too.
- 2D: pixel $(u, j)$ gets $x^{(m-1-j)m + (m-1-u)}$, degree $m^2 - 1$.

## NP facts

- To show $X$ NP-hard: **known ≤P X** (from the known, to the new). Then five parts: $X\in$ NP (certificate, check, time) · direction · construction · both directions · polynomial size.
- NP = poly-time verifier + poly-size certificate (completeness, soundness). P ⊆ NP. NP-hard ≠ every instance hard.
- Decision ⇒ value by binary search ($O(\log m)$ calls) ⇒ solution by self-reducibility ($n + 1$ calls).
- **3-SAT → NAE-4SAT**: add $z$ to every clause (flip all if $z = 1$). **NAE-4 → NAE-3**: $\text{NAE}(a,b,w)\wedge\text{NAE}(\neg w,c,d)$, fresh $w$.
- **NAE-3SAT → Max-Cut**: vertices $x_i, \neg x_i$; edge $x_i\neg x_i$; triangle per clause; $k = n + 2m$. A triangle has ≤ 2 cut edges, so hitting $k$ forces every variable edge cut and every triangle split.
- 3-SAT → IS: triangle per clause, edges between complementary literals, $k = m$.
- IS ↔ VC: $S$ independent $\iff$ $V\setminus S$ is a cover ($k\mapsto n-k$). IS ↔ Clique: complement graph.
- VC → Set Cover: universe = edges, $S_v$ = edges at $v$.
- 3-SAT → 3-Colouring: palette triangle T/F/B, literal pairs joined to B, OR-gadgets forced to T.
- Two bracket types need $\Omega(n)$ memory deterministically (reduction from equality); the randomized checksum uses $O(\log n)$.
- 3-XOR-SAT is in P (Gaussian elimination, XOR has inverses); 3-SAT is NP-complete; MaxCut is NP-hard, MinCut is in P.
