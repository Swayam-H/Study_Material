# Midsem: numeric algorithms

The midsem had 5 problems of 6 marks each. Every solution below follows the official solutions and rubric, with the marking scheme after each part and the steps the rubric wanted shown. Do each part on paper first, then open the solution.

**MS1a (Midsem Q1.1, 2 marks).** Show the recursive calls made by Karatsuba's integer multiplication algorithm on $x = 1234$, $y = 5678$, until reaching the base cases. Single-digit multiplications are handled directly in the base case.

*Solution.* **Formula** (state it, 0.5 marks). Split $x = x_1\cdot10^{h} + x_0$, $y = y_1\cdot10^h + y_0$ with $h$ = half the length. Make three recursive calls
$$P_1 = x_1y_1,\quad P_2 = x_0y_0,\quad P_3 = (x_1 + x_0)(y_1 + y_0),$$
and return $P_1\cdot10^{2h} + (P_3 - P_1 - P_2)\cdot10^h + P_2$.

**Level 1** ($h = 2$): $x_1 = 12, x_0 = 34, y_1 = 56, y_0 = 78$; sums $12 + 34 = 46$, $56 + 78 = 134$.

```
K(1234, 5678)
├── K(12, 56)                         h = 1: 1|2, 5|6, sums 3, 11
│   ├── K(1, 5) = 5                   base
│   ├── K(2, 6) = 12                  base
│   └── K(3, 11)                      11 has 2 digits, so split: 0|3, 1|1, sums 3, 2
│       ├── K(0, 1) = 0
│       ├── K(3, 1) = 3
│       └── K(3, 2) = 6               → 0·100 + (6−0−3)·10 + 3 = 33
│   → 5·100 + (33 − 5 − 12)·10 + 12 = 672
├── K(34, 78)                         3|4, 7|8, sums 7, 15
│   ├── K(3, 7) = 21
│   ├── K(4, 8) = 32
│   └── K(7, 15)                      0|7, 1|5, sums 7, 6
│       ├── K(0, 1) = 0
│       ├── K(7, 5) = 35
│       └── K(7, 6) = 42              → 0 + (42−0−35)·10 + 35 = 105
│   → 21·100 + (105 − 21 − 32)·10 + 32 = 2652
└── K(46, 134)                        pad to 0046, 0134, h = 2: 0|46, 1|34, sums 46, 35
    ├── K(0, 1) = 0
    ├── K(46, 34)                     4|6, 3|4, sums 10, 7
    │   ├── K(4, 3) = 12
    │   ├── K(6, 4) = 24
    │   └── K(10, 7)                  1|0, 0|7, sums 1, 7
    │       ├── K(1, 0) = 0
    │       ├── K(0, 7) = 0
    │       └── K(1, 7) = 7           → 0 + (7−0−0)·10 + 0 = 70
    │   → 12·100 + (70 − 12 − 24)·10 + 24 = 1564
    └── K(46, 35)                     4|6, 3|5, sums 10, 8
        ├── K(4, 3) = 12
        ├── K(6, 5) = 30
        └── K(10, 8)                  1|0, 0|8, sums 1, 8
            ├── K(1, 0) = 0
            ├── K(0, 8) = 0
            └── K(1, 8) = 8           → 80
        → 12·100 + (80 − 12 − 30)·10 + 30 = 1610
    → 0·10⁴ + (1610 − 0 − 1564)·100 + 1564 = 6164
→ 672·10⁴ + (6164 − 672 − 2652)·100 + 2652 = 6720000 + 284000 + 2652 = 7006652
```
Check: $1234 \times 5678 = 7\,006\,652$. ✓

The rubric accepts small variations in how the uneven call $K(46, 134)$ is padded and split.

**Marking (2).** Formula with three products (0.5) · Level 1: the three calls $K(12,56)$, $K(34,78)$, $K(46,134)$ (0.5) · Level 2 splits (0.5) · Level 3 splits down to single digits, including the extra level for sums like $3 + 8 = 11$ (0.5).

**MS1b (Midsem Q1.2, 2 marks).** Compute the Fourier transform of $a = (1, 2, 3, 4, 4, 3, 2, 1)$.

*Solution.* $n = 8$, $\omega = e^{2\pi i/8} = \frac{1+i}{\sqrt2}$, and we want $A(\omega^k)$ for $k = 0..7$ where $A(x) = 1 + 2x + 3x^2 + 4x^3 + 4x^4 + 3x^5 + 2x^6 + x^7$.

**Split** into even and odd indices:
$a_{\text{even}} = (a_0, a_2, a_4, a_6) = (1, 3, 4, 2)$, $a_{\text{odd}} = (a_1, a_3, a_5, a_7) = (2, 4, 3, 1)$.

**4-point FFTs** with $\omega^2 = i$ (evaluate at $1, i, -1, -i$):

- $E(y) = 1 + 3y + 4y^2 + 2y^3$: $E(1) = 10$, $E(i) = 1 + 3i - 4 - 2i = -3 + i$, $E(-1) = 1 - 3 + 4 - 2 = 0$, $E(-i) = 1 - 3i - 4 + 2i = -3 - i$. So $E = (10, -3+i, 0, -3-i)$.
- $O(y) = 2 + 4y + 3y^2 + y^3$: $O(1) = 10$, $O(i) = 2 + 4i - 3 - i = -1 + 3i$, $O(-1) = 2 - 4 + 3 - 1 = 0$, $O(-i) = -1 - 3i$. So $O = (10, -1+3i, 0, -1-3i)$.

(Each 4-point FFT is itself two 2-point FFTs: $E$ from $(1, 4)$ and $(3, 2)$, $O$ from $(2, 3)$ and $(4, 1)$; the rubric's split tree shows these.)

**Butterflies**: $X_k = E_k + \omega^kO_k$ and $X_{k+4} = E_k - \omega^kO_k$ for $k = 0..3$.

- $k = 0$: $X_0 = 10 + 10 = 20$, $X_4 = 10 - 10 = 0$.
- $k = 1$: $\omega(-1+3i) = \frac{(1+i)(-1+3i)}{\sqrt2} = \frac{-4+2i}{\sqrt2} = -2\sqrt2 + \sqrt2\,i$. So $X_1 = (-3 - 2\sqrt2) + (1 + \sqrt2)i$ and $X_5 = (-3 + 2\sqrt2) + (1 - \sqrt2)i$.
- $k = 2$: $X_2 = 0 + \omega^2\cdot 0 = 0$, $X_6 = 0$.
- $k = 3$: $\omega^3(-1-3i) = \frac{(-1+i)(-1-3i)}{\sqrt2} = \frac{4+2i}{\sqrt2} = 2\sqrt2 + \sqrt2\,i$. So $X_3 = (-3 + 2\sqrt2) + (-1 + \sqrt2)i$ and $X_7 = (-3 - 2\sqrt2) + (-1 - \sqrt2)i$.

$$\hat a \approx (20,\ -5.83 + 2.41i,\ 0,\ -0.17 + 0.41i,\ 0,\ -0.17 - 0.41i,\ 0,\ -5.83 - 2.41i)$$

Sanity checks: $X_0$ is the sum of the entries (20); $X_4 = A(-1)$ is the alternating sum $1 - 2 + 3 - 4 + 4 - 3 + 2 - 1 = 0$; the input is real, so $X_{8-k} = \overline{X_k}$ (true for $X_1, X_7$ and $X_3, X_5$). If your course convention uses $\omega = e^{-2\pi i/8}$, every value is replaced by its conjugate; either is accepted with the convention stated.

**Marking (2).** The rubric accepted either the recursive FFT or direct evaluation of $A(\omega^k)$ using $\omega^4 = -1$, $\omega^5 = -\omega$ etc., and gave full marks if enough work was shown to determine every value, even if not simplified. Partial marks otherwise.

**MS1c (Midsem Q1.3, 2 marks).** Fill in lines 4, 5, 7 and 8 of the FFT algorithm (input $a$ of length $n$, a power of 2, and a primitive $n$th root of unity $\omega$; output $M_n(\omega)a$).

*Solution.*

- Line 4: $(s_0, \ldots, s_{n/2-1}) \leftarrow \text{FFT}((a_0, a_2, \ldots, a_{n-2}), \omega^2)$
- Line 5: $(s'_0, \ldots, s'_{n/2-1}) \leftarrow \text{FFT}((a_1, a_3, \ldots, a_{n-1}), \omega^2)$
- Line 7: $r_j \leftarrow s_j + \omega^j s'_j$
- Line 8: $r_{j+n/2} \leftarrow s_j - \omega^j s'_j$

**Why.** $A(x) = A_e(x^2) + xA_o(x^2)$. The squares of the $n$th roots of unity are the $(n/2)$th roots, generated by $\omega^2$, so lines 4 and 5 evaluate $A_e$ and $A_o$ there. Line 7 is $A(\omega^j)$. Line 8 uses $\omega^{j+n/2} = -\omega^j$ and $(\omega^{j+n/2})^2 = \omega^{2j}$.

**Marking (2).** 0.5 per line: even-indexed elements with $\omega^2$; odd-indexed with $\omega^2$; positive butterfly; negative butterfly ($s_j + \omega^{j+n/2}s'_j$ also accepted).

# Midsem: stable matchings

**MS2a (Midsem Q2.1, 3 marks).** Find the stable matching produced by Gale–Shapley in (a) the women-proposing version and (b) the men-proposing version, for these preferences (row $i$ is person $i$'s list, best first).

| Man | Preferences (women) | | Woman | Preferences (men) |
|---|---|---|---|---|
| M1 | 5 7 1 2 6 8 4 3 | | W1 | 5 3 7 6 1 2 8 4 |
| M2 | 2 3 7 5 4 1 8 6 | | W2 | 8 6 3 5 7 2 1 4 |
| M3 | 8 5 1 4 6 2 3 7 | | W3 | 1 5 6 2 4 8 7 3 |
| M4 | 3 2 7 4 1 6 8 5 | | W4 | 8 7 3 2 4 1 5 6 |
| M5 | 7 2 5 1 3 6 8 4 | | W5 | 6 4 7 3 8 1 2 5 |
| M6 | 1 6 7 5 8 4 2 3 | | W6 | 2 8 5 3 4 6 7 1 |
| M7 | 2 5 7 6 3 4 8 1 | | W7 | 7 5 2 1 8 6 4 3 |
| M8 | 3 8 4 5 7 2 6 1 | | W8 | 7 4 1 5 2 3 6 8 |

*Solution.* Method: in each round every free proposer proposes to the best person not yet crossed off; each receiver keeps the best proposal so far (comparing with her or his tentative partner, using **the receiver's** list) and rejects the rest.

**(a) Women propose.**

*Round 1.* W1→M5 (accept). W2→M8 (accept). W3→M1 (accept). W4→M8: M8's list is 3 8 **4** 5 7 **2** 6 1, so he prefers W4 to W2: accepts W4, rejects W2. W5→M6 (accept). W6→M2 (accept). W7→M7 (accept). W8→M7: M7's list 2 5 **7** 6 3 4 **8** 1 prefers W7: rejects W8. Rejected: W2, W8.

*Round 2.* W2's next is M6, who holds W5; M6's list 1 6 7 **5** 8 4 **2** 3 prefers W5: rejects W2. W8's next is M4 (free): accepts. Rejected: W2.

*Round 3.* W2's next is M3 (free): accepts. Nobody rejected; stop.

**Women-proposing result: (W1, M5), (W2, M3), (W3, M1), (W4, M8), (W5, M6), (W6, M2), (W7, M7), (W8, M4).**

**(b) Men propose.**

*Round 1.* M1→W5, M2→W2, M3→W8, M4→W3, M5→W7, M6→W1 (all accept, free). M7→W2: W2's list 8 6 3 5 **7** **2** 1 4 prefers M7 to M2: accepts M7, rejects M2. M8→W3: W3's list 1 5 6 2 **4** **8** 7 3 prefers M4: rejects M8. Rejected: M2, M8.

*Round 2.* M2→W3 (his 2nd): W3 holds M4; her list ranks M2 (4th) above M4 (5th): accepts M2, rejects M4. M8→W8 (his 2nd): W8 holds M3; her list 7 4 1 5 2 **3** 6 **8** prefers M3: rejects M8. Rejected: M4, M8.

*Round 3.* M4→W2 (his 2nd): W2 holds M7, ranked above M4: rejects. M8→W4 (his 3rd, free): accepts. Rejected: M4.

*Round 4.* M4→W7: W7 holds M5 (her 2nd choice), M4 is her 7th: rejects.
*Round 5.* M4→W4: W4 holds M8 (her 1st): rejects.
*Round 6.* M4→W1: W1 holds M6 (her 4th), M4 is her 8th: rejects.
*Round 7.* M4→W6 (free): accepts. Stop.

**Men-proposing result: (M1, W5), (M2, W3), (M3, W8), (M4, W6), (M5, W7), (M6, W1), (M7, W2), (M8, W4).**

The two results differ (e.g. W1 gets M5 in (a) but M6 in (b)), so this instance has more than one stable matching. Check of proposer-optimality: in (a) W1 gets M5, her first choice; in (b) she gets M6, her fourth.

**Marking (3).** 1.5 per version: 1.5 for rounds shown and the correct matching; 1.0 for the correct matching with only some steps, or correct steps with a slip leaving at least 6 correct pairs; 0.5 for correct steps with fewer than 6 correct pairs, or at least 6 correct pairs with no steps.

**MS2b (Midsem Q2.2, 3 marks).** Suppose for some preference lists Gale–Shapley gives the same output for the men-proposing and the women-proposing versions. Show that the stable matching is unique.

*Solution.* **Facts used** (Lectures 6–7): the men-proposing output $S_M$ gives every man his best valid partner (the best woman he is matched with in any stable matching), and the women-proposing output $S_W$ gives every woman her best valid partner.

Let $S = S_M = S_W$, and suppose for contradiction that a stable matching $S' \ne S$ exists.

1. Since $S' \ne S$, some man $m$ has different partners in $S$ and $S'$. Let $w$ be his partner in $S$; so $(m, w) \in S$ and $(m, w) \notin S'$.
2. $S = S_M$ is man-optimal, and $m$'s partner in $S'$ is a valid partner of his, different from $w$. So **$m$ prefers $w$ to his partner in $S'$**.
3. $S = S_W$ is woman-optimal. $w$'s partner in $S'$ is not $m$ (as $(m, w)\notin S'$) and is a valid partner of hers. So **$w$ prefers $m$ to her partner in $S'$**.
4. Then $(m, w)$ is a blocking pair for $S'$, contradicting the stability of $S'$.

Hence every stable matching equals $S$: it is unique.

*Alternative (range argument).* For every stable $S'$, each man weakly prefers his $S_M$ partner and weakly dislikes his $S_W$ partner relative to $S'$ (man-optimal and man-pessimal): $S_W \le_m S' \le_m S_M$. If $S_W = S_M = S$, every man has the same partner in $S'$ as in $S$, so $S' = S$.

**Marking (3).** Full marks for a rigorous proof by contradiction via a blocking pair, or the range argument with the optimality bounds stated. At most 1.5 for a plain-English explanation that still names the blocking pair or the collapsing range; less if the connection is not explicit.

# Midsem: greedy algorithms

**MS3a (Midsem Q3.1, 2 marks).** Apply Huffman's algorithm to A:5, B:9, C:12, D:13, E:16, F:20, G:25. Show the merges and give the codes.

*Solution.* Always merge the two smallest weights.

| Step | Merge | New weight | Remaining weights |
|---|---|---|---|
| 1 | A(5) + B(9) | 14 | 12, 13, 14, 16, 20, 25 |
| 2 | C(12) + D(13) | 25 | 14, 16, 20, 25, 25 |
| 3 | 14 + E(16) | 30 | 20, 25, 25, 30 |
| 4 | F(20) + G(25) | 45 | 25, 30, 45 |
| 5 | 25 (CD) + 30 | 55 | 45, 55 |
| 6 | 45 + 55 | 100 | done |

At step 4 there is a tie between G(25) and the merged CD(25); either choice is a correct Huffman tree with the same codeword lengths. With left = 0 and right = 1, one valid code (the rubric's):

| Char | Freq | Code | Length |
|---|---|---|---|
| A | 5 | 0001 | 4 |
| B | 9 | 0000 | 4 |
| C | 12 | 011 | 3 |
| D | 13 | 010 | 3 |
| E | 16 | 001 | 3 |
| F | 20 | 11 | 2 |
| G | 25 | 10 | 2 |

Cost $= 5\cdot4 + 9\cdot4 + 12\cdot3 + 13\cdot3 + 16\cdot3 + 20\cdot2 + 25\cdot2 = 269$, which equals the sum of the merged weights $14 + 25 + 30 + 45 + 55 + 100$. The code is prefix-free because the symbols are leaves.

**Marking (2).** Correct sequence of merges (1) · correct codes or an equivalent valid Huffman tree (1).

**MS3b (Midsem Q3.2, 4 marks).** Lectures $L_i = (s_i, f_i)$; overlapping lectures need different rooms; a lecture ending at $t$ does not overlap one starting at $t$. Give (1) the greedy choice, (2) pseudocode, (3) a proof of optimality, (4) time and space.

*Solution.* **(1) Greedy choice.** Sort lectures by **start time**. For each lecture in this order, look at the room whose current lecture **finishes earliest**. If that finish time is $\le s_i$, put the lecture there; otherwise every room is busy at time $s_i$, so open a new room. A min-priority queue keyed by finish time gives the earliest-free room.

**(2) Pseudocode.**
```
RoomAssignment(L[1..n]):
    sort lectures by increasing start time
    Q ← empty min-priority queue of (finish time, room)
    r ← 0
    for each lecture (s, f) in sorted order:
        if Q non-empty and min(Q).finish ≤ s:
            (t, c) ← ExtractMin(Q)          // reuse room c
        else:
            r ← r + 1; c ← r                // open a new room
        assign (s, f) to room c
        Insert(Q, (f, c))
    return the assignment and r
```

**(3) Optimality.** Let $d$ = the maximum number of lectures in progress at the same moment (the **depth**).

- *Lower bound.* Any valid assignment uses at least $d$ rooms: those $d$ lectures pairwise overlap, so they need distinct rooms.
- *Greedy uses at most $d$.* Suppose greedy opens room $k+1$ for a lecture starting at $s$. Then the earliest finish among the $k$ open rooms is $> s$, so every room's current lecture finishes after $s$. These lectures started at or before $s$ (lectures are processed by start time). So at time $s$ (just after), all $k$ of them and the new lecture are in progress: $k + 1$ overlapping lectures, so $d \ge k + 1$. Hence the number of rooms greedy opens never exceeds $d$.

So greedy uses exactly $d$ rooms, the minimum. Rooms are reused only when free, so no two overlapping lectures share a room: the assignment is valid.

**(4) Complexity.** Sorting $O(n\log n)$. Each lecture does at most one ExtractMin and one Insert, $O(\log n)$ each: $O(n\log n)$ total. The queue holds at most $n$ entries: **$O(n\log n)$ time, $O(n)$ space.**

**Marking (4).** Greedy choice "earliest-available room, new room only if none is free" (1) · pseudocode (1) · proof via maximum overlap (1; 0.5 for the right intuition without a complete proof) · both complexities (1; 0.5 for one).

# Midsem: SDRs and Latin squares

**MS4a (Midsem Q4.1, 3 marks).** $S_1, \ldots, S_m$ are $r$-element subsets of $\{1, \ldots, n\}$ with $m \le n$, and every element belongs to exactly $d$ of the sets. Show the sets have an SDR.

*Solution.* **Bipartite graph.** $L = \{S_1, \ldots, S_m\}$, $R = \{1, \ldots, n\}$, with an edge $S_i - j$ iff $j \in S_i$. An SDR is exactly a matching that covers $L$ (each set matched to a distinct element of itself).

**Hall's theorem.** $G$ has a matching covering $L$ iff $\lvert N(I)\rvert \ge \lvert I\rvert$ for every $I \subseteq L$.

**Counting.** Count all edges two ways: each set has $r$ elements, each element is in $d$ sets, so $mr = nd$, i.e. $\frac rd = \frac nm \ge 1$ (since $m \le n$), so $r \ge d$.

**Verify Hall.** Take any $I \subseteq L$ with $\lvert I\rvert = k$. The sets in $I$ have $kr$ edges in total, all landing in $N(I)$. Each element of $N(I)$ is in exactly $d$ sets overall, so it receives at most $d$ of these edges: $kr \le d\lvert N(I)\rvert$. Hence
$$\lvert N(I)\rvert \ge \frac{kr}{d} \ge k.$$
Hall's condition holds, so a matching covering $L$, i.e. an SDR, exists.

**Marking (3).** Correct bipartite graph (0.5; partial for recognising it is a perfect-matching problem) · $mr = nd \Rightarrow r \ge d$ (0.5) · Hall's theorem stated correctly (1) · Hall applied correctly (1). The rubric warns that permutation or induction arguments without Hall usually fail.

**MS4b (Midsem Q4.2, 3 marks).** An $r\times n$ Latin rectangle has each of $1..n$ exactly once per row and at most once per column. Show every $r\times n$ Latin rectangle ($r < n$) extends to an $n \times n$ Latin square.

*Solution.* **Induction on $r$**: it suffices to add **one** row to any $r\times n$ Latin rectangle with $r < n$; repeating $n - r$ times gives a Latin square.

**Construction.** For each column $j$ let $S_j = \{1..n\} \setminus \{\text{numbers already in column } j\}$. A new row is valid iff it picks a **distinct** number from each $S_j$ (distinct: the row is a permutation; from $S_j$: no repeat in the column). That is an SDR of $S_1, \ldots, S_n$.

**Degrees.** Column $j$ holds $r$ distinct numbers, so $\lvert S_j\rvert = n - r$. Each number $x$ appears once in each of the $r$ rows, in $r$ different columns, so $x$ is missing from exactly $n - r$ columns: $x$ lies in exactly $n - r$ of the sets.

**Apply Q4.1** with $m = n$ sets, set size $n - r$ and $d = n - r \ge 1$: an SDR exists. (Equivalently: the column–number bipartite graph is $(n-r)$-regular, so it has a perfect matching.) Place each representative in its column: the new row contains every number exactly once and repeats nothing in any column. The result is an $(r+1)\times n$ Latin rectangle.

**Marking (3).** Recognising the induction, adding one row at a time until $n$ (0.5) · bipartite graph construction (0.5) and its degrees (1) · applying 4.1 to prove the induction step (1).

# Midsem: dynamic programming

**MS5 (Midsem Q5, 6 marks).** A phone is used for $T$ hours with $B$ units of battery. Each hour choose Normal mode (costs $c_N$, utility $u_N$) or Power-saving (costs $c_P$, utility $u_P$); a mode needs enough battery for the whole hour. The battery may run out early, after which every hour gives 0. Maximise total utility. Answer: 5.1 table and base cases; 5.2 recurrence; 5.3 feasibility; 5.4 running out early; 5.5 recovering the modes; 5.6 time and space for the value only and for the sequence.

*Solution.* **5.1 Table and base cases.**
$$DP[t][b] = \text{the maximum total utility obtainable in the } t \text{ remaining hours, starting with } b \text{ units of battery},$$
for $t \in \{0..T\}$, $b \in \{0..B\}$: a $(T+1)\times(B+1)$ table. The answer is $DP[T][B]$. Base cases:
$$DP[0][b] = 0 \ \ (\text{no hours left}), \qquad DP[t][0] = 0 \ \ (\text{empty battery, phone unusable}).$$

**5.2 Recurrence.** Condition on the mode used in the current hour. For $t \ge 1$, $b \ge 1$:
$$DP[t][b] = \max\begin{cases} u_N + DP[t-1][b - c_N] & \text{if } b \ge c_N\\ u_P + DP[t-1][b - c_P] & \text{if } b \ge c_P\\ 0 & \text{if neither mode is feasible}\end{cases}$$
Only terms whose condition holds enter the max; the 0 case is used **only** when no mode is feasible.

*Correctness.* Any plan for $(t, b)$ either uses N now, leaving a plan for $(t-1, b - c_N)$ worth at most $DP[t-1][b-c_N]$, or P similarly, or (if neither is affordable) is stuck at 0. Every term is achievable. By induction on $t$, $DP[t][b]$ is optimal.

**5.3 Feasibility.** A mode may run only if $b \ge c$. If $b < c_N$, the Normal term is left out of the max (this also avoids the negative index $b - c_N$); likewise for P. Equivalently define the infeasible term as $-\infty$. It must **not** be treated as 0 in the comparison, since that could beat a genuinely feasible option's value. If $b < c_N$ and $b < c_P$ (including $b = 0$), $DP[t][b] = 0$.

**5.4 Battery running out early.** No special logic is needed. Spending the last units in hour $t$ moves to state $(t-1, 0)$ or to a state where $b < \min(c_N, c_P)$; the base case $DP[t-1][0] = 0$ or the stuck case of 5.3 gives the remaining hours utility 0. So plans that drain the battery before hour $T$ are allowed and valued correctly.

**5.5 Recovering the modes.** Store $\text{Choice}[t][b] \in \{N, P, \text{none}\}$ = the option achieving the max (ties arbitrary). Then:
```
t ← T; b ← B; S ← empty list
while t > 0 and b > 0 and Choice[t][b] ≠ none:
    if Choice[t][b] = N: append N; b ← b − c_N
    else:                append P; b ← b − c_P
    t ← t − 1
return S          // hours after S (if |S| < T) have utility 0
```
$S$ is in chronological order and its utility equals $DP[T][B]$.

**5.6 Complexity.** $(T+1)(B+1)$ states, each a max over at most two options: $O(1)$ each.
(a) **Value only:** $O(TB)$ time; row $t$ depends only on row $t-1$, so **$O(B)$ space** with two rows.
(b) **With the sequence:** $O(TB)$ to fill plus $O(T)$ to backtrack, $O(TB)$ time; **$O(TB)$ space** because the whole Choice table is needed for backtracking.
This is **pseudo-polynomial**: it depends on the value $B$, not its bit length.

**Worked instance** (official solution): $T = 5$, $B = 6$, $(c_N, u_N) = (2, 3)$, $(c_P, u_P) = (1, 2)$. Filling the table row by row:

| $t \backslash b$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 2 (P) | 3 (N) | 3 (N) | 3 (N) | 3 (N) | 3 (N) |
| 2 | 0 | 2 | 4 (P) | 5 (N) | 6 (N) | 6 | 6 |
| 3 | 0 | 2 | 4 | 6 (P) | 7 (N) | 8 (N) | 9 (N) |
| 4 | 0 | 2 | 4 | 6 | 8 (P) | 9 (N) | 10 (N) |
| 5 | 0 | 2 | 4 | 6 | 8 | 10 (P) | 11 (N) |

$DP[5][6] = 11$. Backtracking: N ($b = 6 \to 4$), then P, P, P, P: the plan **N, P, P, P, P** uses $2 + 1 + 1 + 1 + 1 = 6$ units for $3 + 2 + 2 + 2 + 2 = 11$. (The official solution writes the table "forwards" as utility of the first $t$ hours using exactly $b$ units, with $-\infty$ for infeasible states and answer $\max\{\max_b DP[T][b], \max_{t<T} DP[t][B]\}$; it also gives 11. Either formulation earns full marks if it is consistent.)

**Marking (6).** 1 mark each for 5.1 to 5.5; 5.6 split 0.5 for (a) and 0.5 for (b).
