# Learn: dynamic programming

Dynamic programming solves a problem by writing its answer in terms of answers to **smaller subproblems of the same kind**, and computing each subproblem once, in an order where everything it needs is already known. The midsem gave DP a whole 6-mark question in six 1-mark parts, Assignment 2 had four DP problems, and Lectures 11 to 13 plus Tutorial 3 were DP. Expect a DP on the endsem. Sources: Lectures 11–13, Tutorial 3, KT ch. 6, DPV ch. 6, Assignment 2.

## The answer format the rubric wants

> **In short:** Say what each table entry means, how it is computed from smaller entries, and in what order. Each part earns its own mark.

Midsem Q5 marked these six parts separately, one mark each. Write every DP answer under these headings.

1. **Table and meaning.** "$DP[i][j]$ = the maximum utility obtainable in ... starting from ... ." State what each index ranges over and **where the final answer is**.
2. **Base cases.** The smallest subproblems, and the value for impossible states ($-\infty$ for a max, $+\infty$ for a min).
3. **Recurrence.** Condition on **one decision** (the first or last choice). Each option gives a smaller subproblem plus a local cost.
4. **Feasibility.** Say how invalid options are excluded: "only options with $b \ge c_N$ enter the max", or "infeasible terms are $-\infty$". Never compare an infeasible option as 0.
5. **Order of evaluation and reconstruction.** Fill subproblems before they are used. Store the argmax in a `choice` table and walk it back from the answer cell.
6. **Complexity.** (number of states) × (work per state) for time; table size for space. Say whether the answer is **pseudo-polynomial** (depends on a numeric value like $B$ or $W$). Note when rolling arrays cut space, and that reconstruction needs the full table.

**Proof of correctness** is induction on the evaluation order: assume all smaller entries are correct; every solution of the current subproblem makes one of the decisions in the recurrence, and its remainder is a solution of the smaller subproblem, so it is counted; conversely every term in the max is achieved by a real solution.

## Why it works: optimal substructure and overlapping subproblems

> **In short:** Best answers are built from best answers to smaller pieces, and the same pieces come up again and again, so store them.

- **Optimal substructure.** An optimal solution contains optimal solutions to subproblems (cut-and-paste: if the remainder were not optimal, swap in a better one).
- **Overlapping subproblems.** A plain recursion would solve the same subproblem many times (Fibonacci: exponential). Memoising or filling a table makes it polynomial in the number of distinct subproblems.

Every DP is a **shortest or longest path in a DAG** whose vertices are subproblems and whose edges are decisions (Lecture 11).

## Weighted interval scheduling (Lecture 11)

> **In short:** Either the last job is in the answer or it is not; try both.

Jobs $u_i = (s_i, t_i)$ with values $v_i$; choose non-overlapping jobs of maximum total value. Sort by finish time; let $p(j)$ = the largest index $i < j$ whose job finishes before $j$ starts (0 if none).

$$\boxed{\text{OPT}(j) = \max\{v_j + \text{OPT}(p(j)),\ \text{OPT}(j-1)\}, \quad \text{OPT}(0) = 0}$$

Either job $j$ is in the optimum (then no job in $p(j)+1..j-1$ is, as they all overlap $j$), or it is not. Sort and binary-search $p(\cdot)$: $O(n\log n)$. The lecture's memoised version without binary search is $O(n^2)$.

## Shortest paths in a DAG (Lecture 11)

> **In short:** The best route to $v$ is the best route to one of its predecessors plus one edge.

Topologically sort; $\text{OPT}(v) = \min_{(u, v)\in E}\{\text{OPT}(u) + \ell(u, v)\}$, $\text{OPT}(s) = 0$. $O(n + m)$.

## Longest increasing subsequence (Assignment 2 Q1)

> **In short:** For each length, remember the smallest possible last element; that list stays sorted, so binary search updates it.

Distinct prices $p_1..p_n$; longest strictly increasing subsequence.

**$O(n^2)$.** $L[i]$ = length of the longest increasing subsequence **ending at** $i$: $L[i] = 1 + \max\{L[j] : j < i,\ p_j < p_i\}$ (max of an empty set is 0). Answer $\max_i L[i]$.

**$O(n\log n)$ (patience).** Keep an array `tail`, where `tail[k]` = the smallest possible last value of an increasing subsequence of length $k + 1$ seen so far. For each $p_i$: binary-search the first position with `tail[pos]` $\ge p_i$; set `tail[pos] = p_i` (append if pos = length). Then $L[i]$ = pos + 1. The answer is the final length of `tail`.

*Why `tail` is sorted.* If `tail[k]` $\ge$ `tail[k+1]`, the length-$(k+2)$ subsequence ending at `tail[k+1]` has a length-$(k+1)$ prefix ending below `tail[k+1]` $\le$ `tail[k]`, contradicting minimality of `tail[k]`. So binary search is valid.

*Why it is correct.* By induction on $i$: after processing $p_1..p_i$, `tail[k]` is the minimum last value over all increasing subsequences of length $k+1$ in the prefix. $p_i$ can extend exactly the subsequences whose last value is $< p_i$, i.e. lengths $1..$pos, so the best new subsequence has length pos + 1 and it improves `tail[pos]`; no other entry can change.

*Time.* $n$ binary searches over an array of length $\le n$: $O(n\log n)$ worst case.

**Critical orders in $O(1)$ per query.** Compute $L[i]$ (longest ending at $i$) as above, and $R[i]$ = longest increasing subsequence **starting at** $i$, by running the same algorithm on the reversed array looking for decreasing subsequences (equivalently, on $-p_n, \ldots, -p_1$). Let $\lambda$ = the LIS length.
$$\boxed{p_k \text{ lies on some LIS} \iff L[k] + R[k] - 1 = \lambda}$$
(a longest one through $k$ glues a best one ending at $k$ to a best one starting at $k$). Store a boolean per $k$: $O(n\log n)$ preprocessing, $O(1)$ per query.

## 0/1 knapsack (Tutorial 3)

> **In short:** For each item and each remaining capacity, either take the item or skip it.

Items with weights $w_i$ and values $v_i$, capacity $W$, each item at most once.
$$K[i][c] = \max\{K[i-1][c],\ v_i + K[i-1][c - w_i] \text{ (if } w_i \le c)\}, \quad K[0][c] = 0.$$
$O(nW)$ time, pseudo-polynomial. **1-D trick:** keep one row and loop $c$ from $W$ **down** to $w_i$, so each item is used at most once. Looping $c$ **upward** lets an item be reused: that is the **unbounded** knapsack.

**Counting versions (Tutorial 3).** Number of ways to make sum $S$ from coins: loop coins outside and sums inside to count **combinations** (order ignored); loop sums outside and coins inside to count **permutations** (order matters). Grid paths: $P[i][j] = P[i-1][j] + P[i][j-1]$, with blocked cells 0.

## Sequence alignment and edit distance (Lecture 12)

> **In short:** Look at the last column of the alignment: it matches two characters or puts a gap on one side.

Strings $x[1..m]$, $y[1..n]$, scoring matrix $\delta$ including gap scores $\delta(-, c)$ and $\delta(c, -)$. $A[i][j]$ = the best score aligning $x[1..i]$ with $y[1..j]$. The last column is one of: $x_i$ with $y_j$; $x_i$ with a gap; a gap with $y_j$.
$$\boxed{A[i][j] = \max\{A[i-1][j-1] + \delta(x_i, y_j),\ A[i-1][j] + \delta(x_i, -),\ A[i][j-1] + \delta(-, y_j)\}}$$
$A[0][0] = 0$, $A[i][0] = \sum_{k \le i}\delta(x_k, -)$, $A[0][j] = \sum_{k\le j}\delta(-, y_k)$. $O(mn)$ time and space ($O(\min(m,n))$ space for the score alone). Edit distance is the same with min and costs 1 for a mismatch or gap.

## Cloth cutting (Lectures 12 and 13)

> **In short:** A piece is either sold whole or cut once, and then the two parts are independent smaller problems.

$X \times Y$ cloth, products $(a_i, b_i, c_i)$, guillotine cuts, rotation allowed. $P[x][y]$ = the best price of a product that is exactly $x \times y$ (0 if none).
$$DP[x][y] = \max\Big\{P[x][y],\ \max_{1\le k<x}(DP[k][y] + DP[x-k][y]),\ \max_{1\le k<y}(DP[x][k] + DP[x][y-k])\Big\}$$
The first cut splits the piece into two **independent** rectangles. Fill in increasing $x, y$. $O(XY(X+Y))$ time, $O(XY)$ space. Lecture 13 example: $4 \times 4$ cloth, products $1\times1$ for 2, $2\times2$ for 7, $4\times1$ for 5, $4\times4$ for 20: cutting into four $2\times2$ pieces gives 28 > 20.

## Pebbling a $4 \times n$ checkerboard (Lectures 12 and 13)

> **In short:** Only 8 patterns can appear in a column, so carry the last column's pattern as the state.

No two pebbles horizontally or vertically adjacent; maximise the sum covered.

**(a) Patterns.** A column pattern is a 4-bit string with no two adjacent 1s: 0000, 0001, 0010, 0100, 0101, 1000, 1001, 1010. **Eight** patterns, each with at most 2 pebbles (so $2n$ pebbles always suffice).

**(b) DP.** Patterns $p, q$ in adjacent columns are **compatible** iff $p \mathbin{\&} q = 0$. Let $w(k, p)$ = the sum of column $k$'s entries in the rows where $p$ has a 1.
$$DP[k][p] = w(k, p) + \max_{q:\ p\,\&\,q = 0} DP[k-1][q], \qquad DP[1][p] = w(1, p).$$
Answer $\max_p DP[n][p]$. At most $8 \times 8 = 64$ operations per column: $O(n)$. The only thing remembered about the past is the last column's pattern.

## Maximum-weight independent set on a tree (Assignment 2 Q2)

> **In short:** Each vertex is either taken (its children are not) or skipped (each child chooses freely).

Tree $T$, weights $c_v > 0$; choose non-adjacent vertices of maximum total weight. Root the tree anywhere. For each $v$:

- $\text{in}[v]$ = the best total in $v$'s subtree **with** $v$ chosen $= c_v + \sum_{u\text{ child}} \text{out}[u]$;
- $\text{out}[v]$ = the best total **without** $v$ $= \sum_{u\text{ child}}\max(\text{in}[u], \text{out}[u])$.

Leaves: in $= c_v$, out $= 0$. Answer $\max(\text{in}[r], \text{out}[r])$. Compute in **post-order** (children before parents) with one DFS.

*Correctness.* If $v$ is chosen, no child can be (they are adjacent), and the children's subtrees are otherwise independent. If $v$ is not chosen, each child's subtree is unconstrained by $v$. Induction on subtree height.

*Time.* Each vertex's work is proportional to its number of children, and $\sum_v \#\text{children} = n - 1$: $O(n)$.

*Reconstruction in $O(n)$.* Walk top-down from the root carrying a flag "parent chosen". At $v$: if the parent was chosen, $v$ is not; otherwise choose $v$ iff $\text{in}[v] \ge \text{out}[v]$. Pass the decision down.

## Road signs: remove at most $k$ (Assignment 2 Q4)

> **In short:** Remember the last kept sign and how many removals are left.

Signs at $0 = d_1 < \cdots < d_n < l$ with paces $a_i$ (minutes per km); the pace of the last kept sign holds until the next kept sign or $l$. Remove at most $k$ signs, never sign 1; minimise the time.

**Greedy fails.** $d = (0, 1, 5, 6)$, $a = (2, 4, 7, 8)$, $l = 10$, $k = 2$. Original time $2\cdot1 + 4\cdot4 + 7\cdot1 + 8\cdot4 = 57$. Single removals give: sign 2 → 49, sign 3 → 54, sign 4 → 53. Greedy removes sign 2 (49), then the best second removal (sign 3) gives 44. But removing signs 3 and 4 gives $2\cdot1 + 4\cdot9 = 38$. Removing sign 3 alone or sign 4 alone saves only 3 or 4 minutes, because the other slow sign still governs most of the road, but removing both saves 19. Greedy spends its first removal on sign 2 (the best single gain) and can then remove only one of the two slow signs. Gains interact, because removing a sign changes the stretch governed by the previous kept sign.

**DP.** $T[i][r]$ = the minimum time to drive from 0 to $d_i$, given sign $i$ is **kept** and exactly $r$ of the signs $2..i-1$ were removed.
$$T[i][r] = \min_{\substack{j<i\\ r - (i-j-1) \ge 0}}\Big(T[j][r - (i - j - 1)] + a_j(d_i - d_j)\Big), \qquad T[1][0] = 0.$$
(The previous kept sign is $j$; the $i - j - 1$ signs between them are removed.) Infeasible states are $+\infty$. Answer:
$$\min_{j,\ r:\ r + (n - j) \le k} T[j][r] + a_j(l - d_j).$$
*Complexity.* $nk$ states (with $r \le k$), $O(n)$ choices of $j$ each: $O(n^2k)$ time, $O(nk)$ space. Store the minimising $j$ to reconstruct which signs stay.

## Minimum initial energy (Assignment 2 Q5)

> **In short:** Work backwards from the goal, because the energy you need at a cell depends on what comes after it.

Grid $g$, move right or down, strength must stay $\ge 1$ after every cell (including the first and last). Work **backwards**: $E[i][j]$ = the minimum strength needed when **entering** cell $(i, j)$, before its effect is applied.
$$E[M-1][N-1] = \max(1,\ 1 - g[M-1][N-1]), \qquad E[i][j] = \max\big(1,\ \min(E[i+1][j], E[i][j+1]) - g[i][j]\big)$$
(missing neighbours are $+\infty$). The answer is $E[0][0]$. Forward DP fails because the best path depends on both the minimum along the way and the final energy, two quantities that cannot be combined into one number; backwards, the "need" is a single number.

On the assignment grid the table is
$$E = \begin{pmatrix} 7 & 5 & 1\\ 6 & 6 & 6\\ 5 & 1 & 2\end{pmatrix},$$
so the answer is **7**, matching the given path E, E, S, S. $O(MN)$ time and space.

## The battery problem (Midsem Q5)

Fully solved, with all six marked parts, on the midsem page. The model: $DP[t][b]$ = the maximum utility in $t$ remaining hours with battery $b$; $DP[0][b] = DP[t][0] = 0$; $DP[t][b] = \max$ over feasible modes of $u + DP[t-1][b - c]$, and 0 if no mode is feasible.

## Practice

**DP1 (DPV 6.1).** Contiguous subsequence of maximum sum in $O(n)$.

*Solution.* $S[i]$ = the best sum of a contiguous block **ending at** $i$: $S[i] = \max(a_i, S[i-1] + a_i)$, $S[1] = a_1$. Answer $\max_i S[i]$ (or 0 if the empty block is allowed). Either the block is just $a_i$, or it extends the best block ending at $i - 1$. $O(n)$ time, $O(1)$ space.

**DP2 (DPV 6.2, hotel stops).** Hotels at $a_1 < \cdots < a_n$; penalty $(200 - x)^2$ for a day of $x$ miles; you must stop at $a_n$. Minimise total penalty.

*Solution.* $P[j]$ = the minimum penalty to end a day at hotel $j$. $P[0] = 0$ (start at $a_0 = 0$), $P[j] = \min_{0 \le i < j}\{P[i] + (200 - (a_j - a_i))^2\}$. Answer $P[n]$. $O(n^2)$; store the argmin to recover the stops.

**DP3 (DPV 6.5-style).** Longest palindromic subsequence of $x[1..n]$.

*Solution.* $L[i][j]$ for the substring $x[i..j]$: $L[i][i] = 1$, $L[i][i-1] = 0$; if $x_i = x_j$ then $L[i][j] = 2 + L[i+1][j-1]$, else $\max(L[i+1][j], L[i][j-1])$. Fill by increasing $j - i$. $O(n^2)$.

**DP4.** Coin change: fewest coins from denominations $d_1..d_k$ summing to $S$ (unlimited supply).

*Solution.* $C[0] = 0$, $C[s] = 1 + \min_{d_i \le s} C[s - d_i]$, $+\infty$ if none. $O(kS)$, pseudo-polynomial. Greedy (largest coin first) fails for $\{1, 3, 4\}$, $S = 6$: greedy $4 + 1 + 1$ (3 coins), DP $3 + 3$ (2 coins).

**DP5 (KT 6 Ex 1).** Max-weight independent set on a **path** $v_1..v_n$.

*Solution.* $M[0] = 0$, $M[1] = w_1$, $M[i] = \max(M[i-1], w_i + M[i-2])$. The "take the heaviest, delete its neighbours" greedy fails on weights $(2, 3, 2)$: greedy takes 3, DP takes $2 + 2 = 4$. Odd/even alternation fails on $(3, 1, 1, 3)$: alternation gives 4, DP gives $3 + 3 = 6$.
