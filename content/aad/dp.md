# Learn: dynamic programming

Dynamic programming writes the answer to a problem in terms of answers to **smaller subproblems of the same kind**. It computes each subproblem once, in an order where everything a subproblem needs is already known. DP is a big part of the course: the midsem gave it a whole 6-mark question (six 1-mark parts), Assignment 2 had four DP problems, and Lectures 11 to 13 plus Tutorial 3 were all DP. Expect one on the endsem. Sources: Lectures 11–13, Tutorial 3, KT ch. 6, DPV ch. 6, Assignment 2.

## The answer format the rubric wants

> **In short:** Say what each table entry means, how it is computed from smaller entries, and in what order. Each part earns its own mark.

Midsem Q5 gave one mark for each of these six parts. Write every DP answer under these headings.

1. **Table and meaning.** For example: "$DP[i][j]$ = the maximum utility you can get in ... starting from ... ." Say what range each index covers and **which cell holds the final answer**.
2. **Base cases.** The smallest subproblems, and the value used for impossible states ($-\infty$ when maximising, $+\infty$ when minimising).
3. **Recurrence.** Split on **one decision**, usually the first or last choice. Each option gives a smaller subproblem plus a local cost.
4. **Feasibility.** Say how invalid options are left out: "only options with $b \ge c_N$ enter the max", or "infeasible terms are $-\infty$". Never treat an infeasible option as 0.
5. **Order and reconstruction.** Fill each cell only after the cells it uses. To recover the solution itself, store the best choice in a `choice` table and follow it back from the answer cell.
6. **Complexity.** Time = (number of states) × (work per state); space = table size. Say if the answer is **pseudo-polynomial**, meaning it depends on a number in the input like $B$ or $W$. Mention when keeping only the last row saves space, and that reconstruction needs the full table.

**Proof of correctness** is induction in the order the table is filled. Assume all smaller entries are correct. Every solution of the current subproblem makes one of the decisions in the recurrence, and what is left is a solution of a smaller subproblem, so the recurrence counts it. In the other direction, every value in the max comes from a real solution.

## Why it works: optimal substructure and overlapping subproblems

> **In short:** Best answers are built from best answers to smaller pieces, and the same pieces come up again and again, so store them.

- **Optimal substructure.** An optimal solution is built from optimal solutions to its subproblems. (Cut and paste: if one piece were not optimal, swapping in a better piece would improve the whole.)
- **Overlapping subproblems.** Plain recursion would solve the same subproblem many times (Fibonacci becomes exponential). Storing answers, either by memoising or by filling a table, makes the time polynomial in the number of distinct subproblems.

Every DP is a **shortest or longest path in a DAG**: the vertices are subproblems and the edges are decisions (Lecture 11).

## Weighted interval scheduling (Lecture 11)

> **In short:** Either the last job is in the answer or it is not; try both.

Each job $u_i = (s_i, t_i)$ has a value $v_i$. Choose non-overlapping jobs with the largest total value. Sort the jobs by finish time, and let $p(j)$ be the largest index $i < j$ whose job finishes before job $j$ starts (0 if there is none).

$$\boxed{\text{OPT}(j) = \max\{v_j + \text{OPT}(p(j)),\ \text{OPT}(j-1)\}, \quad \text{OPT}(0) = 0}$$

Either job $j$ is in the best answer, and then none of jobs $p(j)+1..j-1$ are (they all overlap $j$), or it is not. Sorting and binary-searching for $p(\cdot)$ gives $O(n\log n)$. The lecture's memoised version without binary search is $O(n^2)$.

![Weighted interval scheduling](fig/aad-weighted-intervals.svg)

*Figure. Jobs sorted by finish time, with $p(j)$ on the right. The table fills as OPT = 2, 4, 6, 7, 8, 9: for example $\text{OPT}(6) = \max(3 + \text{OPT}(3), \text{OPT}(5)) = \max(9, 8) = 9$, taking jobs 1, 3 and 6.*

## Shortest paths in a DAG (Lecture 11)

> **In short:** The best route to $v$ is the best route to one of its predecessors plus one edge.

Sort topologically. Then $\text{OPT}(v) = \min_{(u, v)\in E}\{\text{OPT}(u) + \ell(u, v)\}$ with $\text{OPT}(s) = 0$. Time $O(n + m)$.

## Longest increasing subsequence (Assignment 2 Q1)

> **In short:** For each length, remember the smallest possible last element; that list stays sorted, so binary search updates it.

Given distinct prices $p_1..p_n$, find the longest strictly increasing subsequence.

**$O(n^2)$.** Let $L[i]$ be the length of the longest increasing subsequence **ending at** $i$. Then $L[i] = 1 + \max\{L[j] : j < i,\ p_j < p_i\}$, where the max of an empty set is 0. The answer is $\max_i L[i]$.

**$O(n\log n)$ (patience sorting).** Keep an array `tail`, where `tail[k]` is the smallest last value of any increasing subsequence of length $k + 1$ seen so far. For each $p_i$, binary-search for the first position with `tail[pos]` $\ge p_i$ and set `tail[pos] = p_i` (append if pos is at the end). Then $L[i]$ = pos + 1. The answer is the final length of `tail`.

*Why `tail` stays sorted.* Suppose `tail[k]` $\ge$ `tail[k+1]`. The length-$(k+2)$ subsequence ending at `tail[k+1]` has a length-$(k+1)$ prefix whose last value is below `tail[k+1]` $\le$ `tail[k]`. That contradicts `tail[k]` being the smallest such value. So binary search is valid.

*Why it is correct.* By induction on $i$: after reading $p_1..p_i$, `tail[k]` is the smallest last value over all increasing subsequences of length $k+1$ so far. $p_i$ can extend exactly those subsequences that end below $p_i$, which are the lengths $1..$pos. So the best new subsequence has length pos + 1, it improves `tail[pos]`, and no other entry can change.

*Time.* $n$ binary searches in an array of length $\le n$: $O(n\log n)$.

**Which prices lie on some LIS, $O(1)$ per query.** Compute $L[i]$ (longest ending at $i$) as above. Also compute $R[i]$, the longest increasing subsequence **starting at** $i$, by running the same algorithm on $-p_n, \ldots, -p_1$ (the reversed array, looking for decreasing runs). Let $\lambda$ be the LIS length.
$$\boxed{p_k \text{ lies on some LIS} \iff L[k] + R[k] - 1 = \lambda}$$
The longest subsequence through $k$ is a best one ending at $k$ glued to a best one starting at $k$ ($p_k$ is counted twice, hence the $-1$). Store one boolean per $k$: $O(n\log n)$ preprocessing, then $O(1)$ per query.

## 0/1 knapsack (Tutorial 3)

> **In short:** For each item and each remaining capacity, either take the item or skip it.

Items have weights $w_i$ and values $v_i$, the capacity is $W$, and each item can be used at most once.
$$K[i][c] = \max\{K[i-1][c],\ v_i + K[i-1][c - w_i] \text{ (if } w_i \le c)\}, \quad K[0][c] = 0.$$
$O(nW)$ time, which is pseudo-polynomial. **One-row trick:** keep a single row and loop $c$ **down** from $W$ to $w_i$, so each item is used at most once. Looping $c$ **upward** lets an item be reused, which solves the **unbounded** knapsack instead.

**Counting versions (Tutorial 3).** To count the ways to make sum $S$ from coins: put the coin loop outside and the sum loop inside to count **combinations** (order ignored); put the sum loop outside and coins inside to count **permutations** (order matters). Grid paths: $P[i][j] = P[i-1][j] + P[i][j-1]$, with blocked cells set to 0.

## Sequence alignment and edit distance (Lecture 12)

> **In short:** Look at the last column of the alignment: it matches two characters or puts a gap on one side.

Strings $x[1..m]$ and $y[1..n]$, with a scoring matrix $\delta$ that includes gap scores $\delta(-, c)$ and $\delta(c, -)$. Let $A[i][j]$ be the best score for aligning $x[1..i]$ with $y[1..j]$. The last column of the alignment is one of three things: $x_i$ with $y_j$, $x_i$ with a gap, or a gap with $y_j$.
$$\boxed{A[i][j] = \max\{A[i-1][j-1] + \delta(x_i, y_j),\ A[i-1][j] + \delta(x_i, -),\ A[i][j-1] + \delta(-, y_j)\}}$$
Base cases: $A[0][0] = 0$, $A[i][0] = \sum_{k \le i}\delta(x_k, -)$, $A[0][j] = \sum_{k\le j}\delta(-, y_k)$. $O(mn)$ time and space, or $O(\min(m,n))$ space if you only need the score. Edit distance is the same with min instead of max, and cost 1 for a mismatch or a gap.

![Alignment recurrence](fig/aad-alignment-cell.svg)

*Figure. Each cell is computed from three neighbours: up-left (match the two last characters), up (gap in $y$), and left (gap in $x$). Filling row by row guarantees all three are ready.*

## Cloth cutting (Lectures 12 and 13)

> **In short:** A piece is either sold whole or cut once, and then the two parts are independent smaller problems.

An $X \times Y$ cloth, products $(a_i, b_i, c_i)$ (size $a_i \times b_i$, price $c_i$), straight cuts all the way across, rotation allowed. Let $P[x][y]$ be the best price of a product that is exactly $x \times y$ (0 if none).
$$DP[x][y] = \max\Big\{P[x][y],\ \max_{1\le k<x}(DP[k][y] + DP[x-k][y]),\ \max_{1\le k<y}(DP[x][k] + DP[x][y-k])\Big\}$$
The first cut splits the piece into two **independent** rectangles. Fill in increasing $x, y$. $O(XY(X+Y))$ time, $O(XY)$ space. Lecture 13 example: a $4 \times 4$ cloth with products $1\times1$ for 2, $2\times2$ for 7, $4\times1$ for 5, $4\times4$ for 20. Cutting into four $2\times2$ pieces gives 28, more than 20.

## Pebbling a $4 \times n$ checkerboard (Lectures 12 and 13)

> **In short:** Only 8 patterns can appear in a column, so carry the last column's pattern as the state.

Place pebbles so that no two are next to each other horizontally or vertically, and maximise the sum of the covered numbers.

**(a) Patterns.** A column's pattern is a 4-bit string with no two adjacent 1s: 0000, 0001, 0010, 0100, 0101, 1000, 1001, 1010. There are **eight**, each with at most 2 pebbles (so $2n$ pebbles are always enough).

![Pebbling patterns](fig/aad-pebbling-patterns.svg)

*Figure. The 8 patterns a column of height 4 can have. Two patterns can sit in neighbouring columns iff they share no row ($p \mathbin{\&} q = 0$).*

**(b) DP.** Patterns $p, q$ in neighbouring columns are **compatible** iff $p \mathbin{\&} q = 0$ (no shared row). Let $w(k, p)$ be the sum of column $k$'s numbers in the rows where $p$ has a 1.
$$DP[k][p] = w(k, p) + \max_{q:\ p\,\&\,q = 0} DP[k-1][q], \qquad DP[1][p] = w(1, p).$$
The answer is $\max_p DP[n][p]$. Each column takes at most $8 \times 8 = 64$ operations, so $O(n)$. The only thing remembered about the past is the last column's pattern.

## Maximum-weight independent set on a tree (Assignment 2 Q2)

> **In short:** Each vertex is either taken (its children are not) or skipped (each child chooses freely).

A tree $T$ with weights $c_v > 0$: choose vertices, no two adjacent, with the largest total weight. Root the tree anywhere. For each vertex $v$:

- $\text{in}[v]$ = the best total in $v$'s subtree **with** $v$ chosen $= c_v + \sum_{u\text{ child}} \text{out}[u]$;
- $\text{out}[v]$ = the best total **without** $v$ $= \sum_{u\text{ child}}\max(\text{in}[u], \text{out}[u])$.

For leaves, in $= c_v$ and out $= 0$. The answer is $\max(\text{in}[r], \text{out}[r])$ at the root $r$. Compute in **post-order** (children before parents) with one DFS.

*Correctness.* If $v$ is chosen, none of its children can be (they are adjacent to it), and the children's subtrees don't otherwise affect each other. If $v$ is not chosen, each child's subtree is free to do its best. Induction on subtree height.

*Time.* Each vertex does work proportional to its number of children, and the children add up to $n - 1$ over the whole tree: $O(n)$.

*Reconstruction in $O(n)$.* Walk down from the root, carrying a flag saying whether the parent was chosen. At $v$: if the parent was chosen, $v$ is not; otherwise choose $v$ iff $\text{in}[v] \ge \text{out}[v]$. Pass the decision down to the children.

![Tree independent set](fig/aad-tree-mis.svg)

*Figure. Each vertex shows its weight and its in/out values, computed from the leaves up. For example $\text{in}[r] = 3 + \text{out}[a] + \text{out}[b] = 3 + 5 + 6 = 14$. Walking down from the root picks $r, c, d, e$.*

## Road signs: remove at most $k$ (Assignment 2 Q4)

> **In short:** Remember the last kept sign and how many removals are left.

Signs stand at $0 = d_1 < \cdots < d_n < l$, and sign $i$ sets a pace $a_i$ (minutes per km). A kept sign's pace holds until the next kept sign, or until $l$. Remove at most $k$ signs (never sign 1) to make the trip as fast as possible.

**Greedy fails.** $d = (0, 1, 5, 6)$, $a = (2, 4, 7, 8)$, $l = 10$, $k = 2$. The original time is $2\cdot1 + 4\cdot4 + 7\cdot1 + 8\cdot4 = 57$. Removing one sign gives: sign 2 → 49, sign 3 → 54, sign 4 → 53. Greedy removes sign 2 (49), and the best second removal (sign 3) then gives 44. But removing signs 3 and 4 gives $2\cdot1 + 4\cdot9 = 38$. Removing just one of the two slow signs saves only 3 or 4 minutes, because the other slow sign still covers most of the road; removing both saves 19. Greedy spends its first removal on sign 2 (the best single gain) and then can remove only one slow sign. The gains interact, because removing a sign changes how far the previous kept sign's pace reaches.

**DP.** Let $T[i][r]$ be the least time to drive from 0 to $d_i$, given that sign $i$ is **kept** and exactly $r$ of the signs $2..i-1$ were removed.
$$T[i][r] = \min_{\substack{j<i\\ r - (i-j-1) \ge 0}}\Big(T[j][r - (i - j - 1)] + a_j(d_i - d_j)\Big), \qquad T[1][0] = 0.$$
Here $j$ is the previous kept sign, and the $i - j - 1$ signs between them are removed. Infeasible states are $+\infty$. The answer is
$$\min_{j,\ r:\ r + (n - j) \le k} T[j][r] + a_j(l - d_j).$$
*Complexity.* $nk$ states ($r \le k$), each trying $O(n)$ values of $j$: $O(n^2k)$ time and $O(nk)$ space. Store the best $j$ to recover which signs stay.

## Minimum initial energy (Assignment 2 Q5)

> **In short:** Work backwards from the goal, because the energy you need at a cell depends on what comes after it.

A grid $g$; you move right or down, and your strength must stay $\ge 1$ after every cell, including the first and last. Work **backwards**: let $E[i][j]$ be the least strength you need when **entering** cell $(i, j)$, before its effect is applied.
$$E[M-1][N-1] = \max(1,\ 1 - g[M-1][N-1]), \qquad E[i][j] = \max\big(1,\ \min(E[i+1][j], E[i][j+1]) - g[i][j]\big)$$
(Neighbours outside the grid count as $+\infty$.) The answer is $E[0][0]$. A forward DP fails because the best path depends on two things at once, the lowest strength along the way and the final strength, and they cannot be combined into one number. Going backwards, the "need" is a single number.

On the assignment grid the table is
$$E = \begin{pmatrix} 7 & 5 & 1\\ 6 & 6 & 6\\ 5 & 1 & 2\end{pmatrix},$$
so the answer is **7**, matching the given path E, E, S, S. $O(MN)$ time and space.

## The battery problem (Midsem Q5)

This is fully solved, with all six marked parts, on the midsem page. The model: $DP[t][b]$ is the most utility you can get with $t$ hours left and battery $b$. $DP[0][b] = DP[t][0] = 0$, and $DP[t][b]$ is the max over feasible modes of $u + DP[t-1][b - c]$, or 0 if no mode is feasible.

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
