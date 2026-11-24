# Learn: balanced brackets and lower bounds by reduction

Lecture 22 uses one idea twice. A **reduction** turns a fast algorithm for problem X into a fast algorithm for problem Y; if Y is known to be hard, X must be hard too. First it proves a **memory** lower bound for checking brackets, then it defines **NP-hardness** the same way. Sources: Lecture 22, Class Test II pack.

## Balanced brackets in one pass

Input: a string over `( ) [ ]` read once, left to right (a **stream**). Decide whether it is balanced.

**One bracket type.** Keep a counter: $+1$ for `(`, $-1$ for `)`. Balanced iff the counter never goes negative and ends at 0. Memory $O(\log n)$ bits.

**Two types: counters fail.** Two independent counters accept `([)]`: both counters go up, down, and end at 0, but `[` is closed by `)`. Addition is commutative, so after `([` and after `[(` the counters are the same, yet the next legal closer differs. A stack works but uses $\Theta(n)$ memory.

**Lower bound: $\Omega(n)$ bits for two types (deterministic).** Reduce **equality** to bracket checking.

1. Alice turns $x \in \{0,1\}^{m}$ into $S_A$ by $0 \mapsto$ `(`, $1 \mapsto$ `[`, left to right. Bob turns $y$ into $S_B$ by $0\mapsto$ `)`, $1\mapsto$ `]`, **right to left**. ($x = y = 0110$ gives `([[()]])`.)
2. $S_AS_B$ is balanced $\iff x = y$: the $i$-th opener is closed by the $i$-th closer from the end, which encodes $y_i$.
3. If a streaming algorithm used $s$ bits, Alice runs it on $S_A$ and sends its memory ($s$ bits) to Bob, who continues on $S_B$. That decides equality with $s$ bits, so $s \ge m = n/2$.

**Randomised checksum, $O(\log n)$ bits.** Encode `(` $= +1$, `)` $= -1$, `[` $= +2$, `]` $= -2$. Keep depth $d$, weight $w = r^d \bmod p$ and a sum $H$. On an opener: $H \mathrel{+}= v\cdot w$, then $d{+}{+}$, $w \leftarrow wr$. On a closer: first $d{-}{-}$, $w \leftarrow wr^{-1}$, then $H \mathrel{+}= v\cdot w$. Accept iff $d$ never goes negative, $d$ ends at 0 and $H = 0$. A matched pair at the same depth adds $v - v = 0$; a mismatch leaves a nonzero polynomial in $r$ of degree $< n$, which vanishes at a random $r$ with probability $< n/p$ (Schwartz–Zippel). Hand traces for `([()])` (accept) and `([(]))` (reject) with $p = 17$, $r = 3$ are in the Class Test II pack.

# Learn: P, NP and reductions

## Decision problems and the classes

Everything here is about **decision problems** (answer YES/NO). Turn an optimisation problem into one with a threshold: "is there an independent set of size $\ge k$?"

| Term | Definition to write in the exam |
|---|---|
| **P** | Decision problems solvable in time $O(n^c)$ for a constant $c$, where $n$ is the input size in bits. |
| **NP** | Problems $X$ with a polynomial-time **verifier** $V$: $x$ is a YES instance $\iff$ some certificate $y$ with $\lvert y\rvert \le \text{poly}(\lvert x\rvert)$ makes $V(x, y)$ accept. NP means "nondeterministic polynomial", not "not polynomial". |
| **$A \le_P B$** | A polynomial-time computable map $f$ with: $x$ is YES for $A$ $\iff$ $f(x)$ is YES for $B$. "$A$ is no harder than $B$." |
| **NP-hard** | Every problem in NP reduces to $X$. It suffices to show $Y \le_P X$ for one known NP-hard $Y$ (Lecture 22: 3-SAT $\le_P X$). |
| **NP-complete** | $X \in$ NP **and** $X$ is NP-hard. Both halves earn marks. |
| **Cook–Levin** | SAT (and 3-SAT) is NP-complete. Every other proof is a reduction from a known problem. |
| **ETH** | 3-SAT has no $2^{o(n)}$ algorithm ($n$ = number of variables). A conjecture, stronger than P ≠ NP. |

**Facts.** Reductions compose (a polynomial of a polynomial is a polynomial). If $A \le_P B$ and $B \in$ P then $A \in$ P. If $A \le_P B$ and $A$ is NP-hard then $B$ is NP-hard. P ⊆ NP. If any NP-complete problem is in P then P = NP.

## The direction rule

$$\boxed{\text{to prove } X \text{ is NP-hard, reduce a KNOWN hard problem TO } X:\ \ Y \le_P X}$$

Take an **arbitrary** instance of the known problem $Y$ and build an instance of $X$. Showing $X \le_P$ 3-SAT proves nothing about hardness (every NP problem reduces to 3-SAT). Mnemonic: **from the known, to the new.**

## The five-part proof (how it is marked)

1. **$X \in$ NP**: name the certificate, say what the verifier checks, give its time.
2. **Source and direction**: "We show 3-SAT $\le_P X$."
3. **Construction**: given an arbitrary instance of the source, describe the instance of $X$ exactly (vertices, edges, numbers, $k$).
4. **Correctness, both directions**: ($\Rightarrow$) a YES certificate of the source gives one for $X$; ($\Leftarrow$) a YES certificate for $X$ gives one for the source. Most lost marks are a missing ($\Leftarrow$).
5. **Polynomial time**: count the size of the constructed instance.

## 3-SAT, XOR-SAT and why OR is hard (Lecture 22)

**3-SAT**: a CNF formula, each clause an OR of 3 literals; is there a satisfying assignment? Brute force $O(m2^n)$.

**3-XOR-SAT** (each clause an XOR) is easy: XOR clauses are linear equations mod 2, solved by Gaussian elimination in $O(n^3)$. Elimination works because XOR has inverses ($x \oplus x = 0$), so equations can cancel variables. OR has no inverse ($1 \vee 1 = 1$), and 3-SAT is believed to need exponential time.

**MaxCut is NP-hard** (Karp). An edge $uv$ is cut iff $x_u \oplus x_v = 1$. Satisfying **all** such equations is the bipartite test (easy); satisfying as **many** as possible is MaxCut (hard).

# Learn: the standard NP-hardness chain

$$\text{3-SAT} \to \text{Independent Set} \to \text{Vertex Cover} \to \text{Set Cover}, \qquad \text{Independent Set} \to \text{Clique}, \qquad \text{3-SAT} \to \text{3-Colouring}, \qquad \text{3-SAT} \to \text{Subset Sum}$$

## 3-SAT ≤P Independent Set

**IS**: given $G$, $k$, is there a set of $k$ pairwise non-adjacent vertices?

**IS ∈ NP**: certificate the set $S$; check $\lvert S\rvert \ge k$ and no edge inside $S$: $O(n + m)$.

**Construction.** Formula $\varphi$ with clauses $C_1..C_m$. For each clause make a **triangle** of 3 vertices, one per literal. Add an edge between every pair of vertices labelled with **complementary** literals ($x_i$ and $\neg x_i$). Set $k = m$.

**($\Rightarrow$)** Take a satisfying assignment. In each clause pick one true literal's vertex. That is $m$ vertices, one per triangle (no triangle edge inside), and no two are complementary (both can't be true): independent.

**($\Leftarrow$)** An independent set of size $m$ has exactly one vertex per triangle (two in one triangle would be adjacent). Set those literals true; this is consistent because no complementary pair was chosen (they are adjacent). Unset variables are arbitrary. Every clause has a true literal.

**Size**: $3m$ vertices, $O(m^2)$ edges, polynomial.

## Independent Set ≤P Vertex Cover

$S$ is independent $\iff$ $V \setminus S$ is a vertex cover (an edge inside $S$ is exactly an edge with no endpoint in $V\setminus S$). So $(G, k) \mapsto (G, n - k)$. Both directions are this one line; write both.

## Independent Set ≤P Clique

$S$ is independent in $G$ $\iff$ $S$ is a clique in the **complement** $\bar G$. Map $(G, k)\mapsto (\bar G, k)$, $O(n^2)$.

## Vertex Cover ≤P Set Cover

Universe $U = E$; for each vertex $v$ a set $S_v$ = the edges at $v$; same $k$. $k$ vertices cover all edges iff the corresponding $k$ sets cover $U$.

## 3-SAT ≤P 3-Colouring

**Construction.** A triangle **T, F, B** (true, false, base). For each variable $x_i$, vertices $x_i$ and $\neg x_i$ joined to each other and to B, so one of them is coloured T and the other F. For each clause $(a \vee b \vee c)$, an **OR-gadget**: a 6-vertex graph whose output can be coloured T iff at least one input is T, and whose output is joined to F and B (forcing it to T).

**($\Rightarrow$)** Colour literals by the assignment; every clause has a true input, so each gadget can be completed with output T.
**($\Leftarrow$)** In any 3-colouring, call T's colour "true"; each variable pair gets T and F (it avoids B and the two differ); each gadget output is forced to T, which is possible only if some input literal is T. So the assignment satisfies every clause.
**Size** $O(n + m)$.

The gadget details are rarely asked; the structure (palette triangle, variable pairs, forced clause outputs) and the two directions are what earn marks.

## 3-SAT ≤P Subset Sum (sketch)

Numbers written in base 10 with one digit per variable and one per clause. For each variable two numbers ($x_i$ true / false) with a 1 in the variable's digit and a 1 in each clause digit the literal satisfies; two slack numbers per clause (1 and 2 in the clause digit). Target: 1 in every variable digit and 4 in every clause digit. Picking exactly one of each variable pair is forced by the variable digit; a clause digit reaches 4 with slack only if at least one literal contributes. No carries occur (each digit sums to at most 5 < 10). The numbers have $n + m$ digits: polynomial in the input length. Subset Sum has an $O(nT)$ DP, which is only **pseudo-polynomial**, so there is no contradiction.

## Practice

**NP1.** Prove Clique is NP-complete.

*Solution.* **In NP**: certificate the set $S$; check $\lvert S\rvert \ge k$ and all $\binom{\lvert S\rvert}{2}$ pairs are edges, $O(n^2)$. **Hard**: Independent Set $\le_P$ Clique via $(G, k)\mapsto(\bar G, k)$. ($\Rightarrow$) An independent set in $G$ has no edges of $G$ inside, so all pairs are edges of $\bar G$: a clique. ($\Leftarrow$) The same argument backwards. Building $\bar G$ is $O(n^2)$. IS is NP-hard by 3-SAT $\le_P$ IS, and reductions compose.

**NP2 (DPV 8.4 trap).** A student shows "Clique on graphs of max degree 3" reduces to 3-SAT and concludes it is NP-hard. What is wrong? Is it NP-hard?

*Solution.* The direction is wrong: $X \le_P$ 3-SAT only shows $X$ is no harder than 3-SAT. And the problem is in P: a clique in a graph of max degree 3 has at most 4 vertices, so check all subsets of size $\le 4$ in $O(n^4)$.

**NP3.** Hitting Set: given sets $S_1..S_m$ over $U$ and $k$, is there $H \subseteq U$, $\lvert H\rvert \le k$, meeting every $S_i$? Show NP-complete.

*Solution.* **In NP**: certificate $H$; check size and that each $S_i \cap H \ne \emptyset$. **Hard**: Vertex Cover $\le_P$ Hitting Set. Given $(G, k)$, let $U = V$ and one set $\{u, v\}$ per edge. A vertex cover is exactly a set of vertices hitting every edge-set. Both directions are immediate, $O(n + m)$.

**NP4.** Show that "does $G$ have an independent set of size $\ge n/2$?" (half-IS) is NP-hard.

*Solution.* In NP: the certificate is the set, checked in $O(n + m)$. Hardness: reduce IS. Given $(G, k)$ with $n$ vertices, build $G'$ with an independent set of half its size iff $G$ has one of size $k$.

- If $k \le n/2$: add $n - 2k$ **isolated** vertices. $G'$ has $2n - 2k$ vertices, so the target is $n - k$. ($\Rightarrow$) an IS of size $k$ in $G$ plus all new vertices has size $n - k$. ($\Leftarrow$) an IS of size $n - k$ in $G'$ contains at most $n - 2k$ new vertices, so at least $k$ old ones, which are independent in $G$.
- If $k > n/2$ (and $k \ge 2$): add $2k - n$ new vertices, each adjacent to **every** other vertex. $G'$ has $2k$ vertices, so the target is $k$. A new vertex is adjacent to everything, so it can only be in an IS of size 1. Hence an IS of size $k \ge 2$ in $G'$ uses only old vertices, and it exists iff $G$ has one.

Both constructions add $O(n)$ vertices and $O(n^2)$ edges: polynomial.
