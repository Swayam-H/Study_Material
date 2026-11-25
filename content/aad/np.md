# Learn: balanced brackets and lower bounds by reduction

Lecture 22 uses one idea twice. A **reduction** turns a fast algorithm for problem X into a fast algorithm for problem Y; if Y is known to be hard, X must be hard too. First it proves a **memory** lower bound for checking brackets, then it defines **NP-hardness** the same way. Sources: Lecture 22, the Lecture 24 course summary, the NP tutorial.

## One bracket type

> **In short:** With one bracket type only the count of open brackets matters, so a single counter is enough.

**Problem.** A string $S = s_1\ldots s_n$ over `(` and `)` arrives one character at a time, in a single left-to-right pass (the **one-pass streaming model**). Accept iff every `(` is properly closed and no `)` comes before its partner.

**Algorithm 1: stack, $O(n)$ space.** Push on `(`; on `)` pop, rejecting if the stack is empty; accept iff the stack ends empty. On `((( … )))` with $n/2$ openers first, the stack holds $n/2$ items halfway through: $\Theta(n)$ space.

**Algorithm 2: counter, $O(\log n)$ space (DYCK₁).** Every stack entry is the same symbol `(`, so only their number matters. Keep $c$: $+1$ for `(`, $-1$ for `)`; reject as soon as $c < 0$ (a closer with no partner in this prefix); accept iff $c = 0$ at the end. $c \le n$, so it takes $\lceil\log_2(n+1)\rceil$ bits: about 30 bits for $n = 10^9$.

## Two bracket types

> **In short:** With two types the order of the open brackets matters, and counters cannot remember order.

**Definition.** A string over `( ) [ ]` is balanced if (1) every opener is matched by a closer of the **same type** and (2) the nesting is last-opened, first-closed. The stack still works (check the type of the top before popping), in $O(n)$ space.

**Counters fail.** Keep $c_{\text{round}}$ and $c_{\text{square}}$. They are fooled by:

- `([)]`: `[` was opened inside `(`, so must close first, but `)` arrives first. Both counters stay $\ge 0$ and end at $(0, 0)$.
- `(([))[]]`: $c_{\text{round}}$ goes $0,1,2,2,1,0,0,0,0$ and $c_{\text{square}}$ goes $0,0,0,1,1,1,2,1,0$; both end at 0, yet `[` at position 3 is crossed with `))`.
- `([[())])` and in general any string that opens and closes the same *numbers* of each type.

**Why:** after `([` and after `[(` the counters hold the same values $(1, 1)$. Addition is commutative, so counters cannot remember the **order** in which brackets were opened, and the order decides which closer is legal next.

## Lower bound: $\Omega(n)$ bits for two types (deterministic)

> **In short:** A small-memory bracket checker would let Alice and Bob test equality with few bits, which is impossible.

**Recall (Lecture 20, Theorem 1).** If Alice holds $x \in \{0,1\}^m$ and Bob holds $y$, any deterministic one-message protocol deciding $x = y$ needs $\ge m$ bits: with fewer, two strings $x \ne x'$ get the same message (pigeonhole), and Bob holding $y = x$ cannot tell them apart.

**The reduction.**

1. Alice turns $x$ into openers $S_A$, left to right: $0 \mapsto$ `(`, $1 \mapsto$ `[`.
2. Bob turns $y$ into closers $S_B$, **right to left** (the last opened must be the first closed): $0\mapsto$ `)`, $1\mapsto$ `]`. For $x = y = 0110$: $S_AS_B = $ `([[()]])`.
3. **Claim 1.** $S_AS_B$ (length $n = 2m$) is balanced $\iff x = y$: the $i$-th opener (type $x_i$) is closed by the $i$-th closer from the end, which encodes $y_i$.

**Theorem 2.** Any deterministic one-pass algorithm $A$ for two bracket types uses $s(n) \ge n/2 = \Omega(n)$ bits.

*Proof.* Alice runs $A$ on $S_A$, then sends Bob $A$'s entire memory ($s(n)$ bits). Bob loads it and continues $A$ on $S_B$. $A$ has now processed $S_AS_B$ in one pass, so it answers "balanced" iff $x = y$ (Claim 1). Alice and Bob have decided equality with $s(n)$ bits, so $s(n) \ge m = n/2$ by Theorem 1. $\square$

**Key takeaway: streaming memory = communication.** Pausing a one-pass algorithm mid-stream, its memory is a message from the first half of the input to the second. A communication lower bound becomes a space lower bound.

## Randomised checksum in $O(\log n)$ bits

> **In short:** Give each depth its own random weight so that matched pairs cancel and mismatches almost never do.

Note that the hard strings above have a special shape, all $m$ openers first and then all $m$ closers ("1-hill"), and even this needs $\Omega(n)$ bits deterministically. With randomness we can beat it.

**Two-polynomial view.** Encode `(`,`)` $\mapsto 1$ and `[`,`]` $\mapsto 2$. Openers $a_1..a_m$, closers (which arrive inside-out) $b_m, \ldots, b_1$. Balanced $\iff a_i = b_i$ for all $i$ $\iff P_{\text{open}}(z) = \sum_i a_iz^{i-1} \equiv P_{\text{close}}(z) = \sum_i b_iz^{i-1}$.

**One polynomial.** Use signed values $v($`(`$) = +1$, $v($`)`$) = -1$, $v($`[`$) = +2$, $v($`]`$) = -2$, so a matching pair sums to 0. With the opener and closer at depth $d$ paired,
$$P(x) = \sum_{d=0}^{m-1}\big(v(\text{open at } d) + v(\text{close at } d)\big)x^d.$$
Balanced ⇒ every coefficient is 0, so $P \equiv 0$. A type mismatch at depth $d$ gives coefficient $\pm1 \ne 0$, so $P \not\equiv 0$.

**Algorithm 3 (single checksum).** Pick a prime $p > n^2$ and random $r \in \{1..p-1\}$; precompute $r^{-1} \bmod p$. Keep depth $d = 0$, weight $w = r^d = 1$, checksum $H = 0$, flag `seen_close` = false.

- **Opener** $s_i$: if `seen_close`, reject (an opener after a closer: not 1-hill). Else $H \leftarrow H + v(s_i)\,w$; $d \leftarrow d + 1$; $w \leftarrow wr$.
- **Closer** $s_i$: `seen_close` ← true; if $d = 0$, reject. Else $d \leftarrow d - 1$; $w \leftarrow wr^{-1}$ (back to $r^{d}$); $H \leftarrow H + v(s_i)\,w$.
- **End**: accept iff $d = 0$ and $H \equiv 0 \pmod p$.

A closer first steps down to the depth of the opener it closes, then adds its value with the **same** weight $r^d$, so a matched pair contributes $+v\,r^d - v\,r^d = 0$.

**Example 1, balanced `([()])`** with $p = 17$, $r = 3$, $r^{-1} = 6$ ($3\cdot6 = 18 \equiv 1$):

| $s_i$ | depth used | term | $H$ |
|---|---|---|---|
| `(` | 0 | $+1\cdot1$ | 1 |
| `[` | 1 | $+2\cdot3$ | 7 |
| `(` | 2 | $+1\cdot9$ | 16 |
| `)` | 2 | $-1\cdot9$ | 7 |
| `]` | 1 | $-2\cdot3$ | 1 |
| `)` | 0 | $-1\cdot1$ | 0 |

$d = 0$ and $H = 0$: **accept**.

**Example 2, crossed `([(]))`** (two `(`, two `)`, one `[`, one `]`, so counters are fooled): openers give $H = 1 + 6 + 9 = 16$. Then `]` closes depth 2: $16 - 2\cdot9 = -2 \equiv 15$; `)` closes depth 1: $15 - 3 = 12$; `)` closes depth 0: $12 - 1 = 11$. $H = 11 \ne 0$: **reject**. Indeed $P(x) = (1-1) + (2-1)x + (1-2)x^2 = x - x^2$ and $P(3) = -6 \equiv 11$.

**Theorem 3 (error and space).** A valid string has $P \equiv 0$, so $H = 0$ always (one-sided error). An invalid string either fails the depth/phase checks (caught with certainty) or has $P \not\equiv 0$ of degree $\le m - 1 < n$, so by Schwartz–Zippel $\Pr[H = 0] \le \frac{n}{p} < \frac1n$ for $p > n^2$. Space: $p, r, r^{-1}, d, w, H$ are $O(\log p) = O(\log n)$ bits.

The course summary calls this the 1-hill version (DYCK₂ restricted to "all opens, then all closes"). The tutorial closes with the same moral as this section: a reduction turns a known lower bound (equality, or 3-SAT) into a new one.

# Learn: P, NP and reductions

This chapter follows the NP tutorial ("NP, Reductions and Satisfiability", Samarth Singla) and the complexity pages of the Lecture 24 course summary. Its main result is the one the course promised in Lecture 22: **Max-Cut is NP-hard**, proved by the chain 3-SAT $\le_P$ NAE-3SAT $\le_P$ Max-Cut.

## Efficient means polynomial time

> **In short:** Polynomial running times stay usable as inputs grow; exponential ones explode almost at once.

An algorithm is **efficient** if it runs in time $O(n^c)$ for a constant $c$, where $n$ is the input size. The tutorial's table (at $10^9$ operations per second) shows why the line is drawn there:

| Running time | $n = 100$ | $n = 1000$ |
|---|---|---|
| $n^2$ | 10 µs | 1 ms |
| $n^3$ | 1 ms | 1 s |
| $1.307^n$ (best known 3-SAT) | about 7 minutes | about $10^{116}$ s |
| $2^n$ | about $4\times10^{13}$ years | about $10^{301}$ s |

Polynomials are closed under composition: calling a polynomial-time routine a polynomial number of times is still polynomial. With $2^n$ time, doubling the computer's speed only lets you handle $n + 1$.

## Decision versus optimisation

> **In short:** Asking only yes or no loses nothing, because a yes/no solver can recover the best value and a solution.

The theory is stated for **decision problems** (YES/NO; a problem is the set of its YES instances). Optimisation versions become decision versions with a threshold: "is there a cut with $\ge k$ edges?", "is there an independent set of size $\ge k$?". Nothing is lost:

- **Optimal value**: binary search on $k \in \{0, \ldots, \lvert E\rvert\}$ uses $O(\log\lvert E\rvert)$ calls to the decision version.
- **An actual solution** (self-reducibility, for SAT): ask whether $\Phi[x_1 = 1]$ is satisfiable, fix $x_1$ accordingly, and repeat for $x_2, \ldots, x_n$. That is $n + 1$ calls.

So if the decision version is hard, the optimisation version is hard too.

## The class P, and finding versus checking

> **In short:** Many problems are hard to solve but easy to check once someone hands you an answer.

**P** is the set of decision problems solvable in time polynomial in the input size. Course examples: shortest paths, MST, sorting, max flow and min cut, bipartiteness ("can we cut every edge?"), 2-SAT, XOR-SAT, balanced brackets, pattern matching.

Finding and checking can differ enormously. Solving a hard Sudoku takes hours; checking a filled grid is one scan. Finding a satisfying assignment of a 3-SAT formula takes about $1.307^n$ with the best known algorithm; checking one is $O(m)$. **NP captures problems whose YES answers have a short proof that is quick to check.**

## The class NP (verifier definition)

> **In short:** NP = problems where a yes answer comes with a short proof that can be checked quickly.

$$\boxed{L \in \text{NP} \iff \exists\ \text{poly-time } V,\ \text{polynomial } q:\ \ x \in L \iff \exists c,\ \lvert c\rvert \le q(\lvert x\rvert),\ V(x, c) = \text{Yes}}$$

The string $c$ is the **certificate** (witness, proof).

- **Completeness**: every YES instance has some certificate that convinces $V$.
- **Soundness**: for a NO instance, no certificate fools $V$.
- The certificate must be short (polynomial size) and verification fast (polynomial time).

NP stands for **nondeterministic polynomial time**: a machine that could guess $c$ and then verify it.

| Problem | Certificate | Verification |
|---|---|---|
| 3-SAT | a truth assignment | evaluate each clause, $O(m)$ |
| Max-Cut $\ge k$ | a partition $(S, V\setminus S)$ | count crossing edges, $O(\lvert E\rvert)$ |
| Independent Set $\ge k$ | a set $S$ of $k$ vertices | no edge inside $S$, $O(\lvert E\rvert)$ |
| Clique $\ge k$ | a set $S$ of $k$ vertices | all $\binom k2$ pairs adjacent |
| 3-Colouring | a colour per vertex | endpoints differ on every edge |
| Hamiltonian Cycle | an ordering of the vertices | consecutive pairs are edges |
| Composite($N$) | a factor $d$ | $1 < d < N$ and $d \mid N$ |

Composite is also in P (the AKS primality test, 2002): **being in NP does not mean being hard.** Membership in NP is an *upper* bound on difficulty.

### Worked template: Max-Cut (decision) is in NP

Given $G = (V, E)$ and $k$, is there $S \subseteq V$ with $\lvert E(S, V\setminus S)\rvert \ge k$? Write all four lines:

1. **Certificate**: a bit $x_u \in \{0,1\}$ for every vertex: $\lvert V\rvert$ bits, polynomial.
2. **Verifier**: for each edge $(u,v)$ add 1 if $x_u \ne x_v$; accept iff the total is $\ge k$. Time $O(\lvert V\rvert + \lvert E\rvert)$.
3. **Completeness**: if a cut of size $\ge k$ exists, its bit vector is accepted.
4. **Soundness**: if every cut has fewer than $k$ edges, every bit vector gives a total below $k$, so $V$ rejects.

## Two misconceptions the tutorial corrects

> **In short:** NP does not mean "not polynomial", and NP-hard does not mean every instance is hard.

**"NP means not polynomial."** False. Every problem in P is in NP. *Proof that P ⊆ NP:* if $L \in$ P is decided by $A$, take the verifier $V(x, c)$ that ignores $c$ and runs $A(x)$; any certificate, even the empty one, works.

**"NP-hard means every instance is hard."** False. Hardness is about the **worst case**. Special cases can be easy: Max-Cut on bipartite graphs (cut every edge), Independent Set on trees (a simple DP), 3-SAT where every clause has a positive literal (set every variable to 1).

## P versus NP

> **In short:** Is checking really easier than solving? Nobody knows, but almost everyone thinks so.

Is P = NP, that is, is every quickly checkable problem also quickly solvable? Open since 1971 (a Clay Millennium problem). Almost everyone believes P ≠ NP. If P = NP, much of cryptography breaks and finding proofs becomes as easy as checking them.

Some problems are not obviously in NP. **UNSAT** ("no assignment works") has no evident short proof of non-existence; such complements form **co-NP**.

## Reductions

> **In short:** Turn instances of $A$ into instances of $B$ with the same answer; then $B$ is at least as hard as $A$.

To solve $A$ using a solver for $B$: transform an instance $x$ of $A$ into an instance $f(x)$ of $B$ in polynomial time and ask the $B$-solver. We never write a solver for $B$; we only show how we would use one.

| Term | Definition to write in the exam |
|---|---|
| **$A \le_P B$** (Karp, many-one) | A polynomial-time computable $f$ with $x \in A \iff f(x) \in B$ for **every** instance $x$. Read it as "$A$ reduces to $B$", "$A$ is no harder than $B$", "$B$ is at least as hard as $A$". |
| Cook (Turing) reduction | May call the $B$-solver many times. The course uses Karp reductions: one call, at the end. |
| **NP-hard** | Every $A \in$ NP satisfies $A \le_P X$. NP-hard problems need not be in NP (optimisation versions, the Halting Problem). |
| **NP-complete** | NP-hard **and** in NP: the hardest problems in NP. If one is in P then P = NP. Both halves earn marks. |
| **Cook–Levin** (1971, 1973) | SAT is NP-complete (and so is 3-SAT). Every other proof is a reduction from a known problem. |
| **ETH** | 3-SAT cannot be solved in time $2^{o(n)}$, $n$ = number of variables. A conjecture stronger than P ≠ NP; it gives tight conditional lower bounds. |

**Lemma.** If $A \le_P B$ and $B \in$ P, then $A \in$ P. (Contrapositive: if $A \le_P B$ and $A \notin$ P, then $B \notin$ P.)

*Proof.* Let $f$ run in time $p(n)$ and $B$'s algorithm in time $r(n)$, both polynomials. On input $x$ with $\lvert x\rvert = n$: (1) compute $f(x)$ in time $p(n)$, so $\lvert f(x)\rvert \le p(n)$ (an algorithm cannot write more than it has time for); (2) run $B$'s algorithm on $f(x)$ in time $r(p(n))$. The answer is correct because $x \in A \iff f(x) \in B$. Total $p(n) + r(p(n))$: polynomial. $\square$

**Reductions compose**: $A \le_P B \le_P C$ gives $A \le_P C$ by $g \circ f$. That is why we build chains from one root.

**Cook–Levin, proof idea.** For $L \in$ NP with a verifier $V$ running in time $T$, the whole run of $V$ is a $T \times T$ table of bits. "This table is a valid accepting run" is a set of local constraints, each a small CNF. The certificate bits are free variables, so the formula $\Phi$ is satisfiable $\iff x \in L$.

## The direction rule

> **In short:** Reduce from the problem you know is hard to the one you want to show is hard.

$$\boxed{\text{to prove } X \text{ NP-hard, reduce a KNOWN hard problem TO } X:\ \ \text{3-SAT} \le_P X}$$

The arrow points towards the harder problem: **from what you know is hard, to what you want to prove hard.** The tutorial's direction check:

| Statement | Verdict |
|---|---|
| "I reduced Max-Cut to 3-SAT, so Max-Cut is NP-hard." | **Wrong.** It shows Max-Cut is no harder than 3-SAT. |
| "I reduced 3-SAT to Max-Cut, so Max-Cut is NP-hard." | **Correct.** A fast Max-Cut solver would give a fast 3-SAT solver. |
| "I reduced my problem $X$ to 2-SAT, so $X \in$ P." | **Correct.** 2-SAT is in P, so $X$ is by the lemma. |
| "I reduced 2-SAT to my problem $X$, so $X$ is hard." | **Wrong.** 2-SAT is easy; this says nothing. |

## The recipe for "prove $X$ is NP-complete" (how it is marked)

> **In short:** In NP, then a reduction from a known hard problem, then both directions, then polynomial size.

1. **$X \in$ NP**: name the certificate, say what the verifier checks, give its time.
2. **Pick a known NP-complete $A$** (3-SAT is the usual choice) and say "we show $A \le_P X$".
3. **Construct $f$** from instances of $A$ to instances of $X$. Direction: $A \to X$! Describe it exactly (vertices, edges, numbers, $k$) for an **arbitrary** instance.
4. **($\Rightarrow$)** If $x$ is a YES instance of $A$, then $f(x)$ is a YES instance of $X$. Usually: turn a solution of $x$ into a solution of $f(x)$.
5. **($\Leftarrow$)** If $f(x)$ is a YES instance of $X$, then $x$ is a YES instance of $A$. Usually: turn **any** solution of $f(x)$ back into a solution of $x$.
6. **Polynomial time**: $f$ runs in polynomial time (so its output is polynomial size).

Step 5 is where most marks are lost: the solution of $f(x)$ is arbitrary, not one you designed.

## A map of classic reductions

> **In short:** Every hardness proof traces back to SAT through a chain of reductions.

The tutorial's map, every arrow $A \to B$ meaning $A \le_P B$ and every problem NP-complete:

- SAT → 3-SAT
- 3-SAT → Independent Set → Vertex Cover; Independent Set → Clique
- 3-SAT → **NAE-3SAT → Max-Cut** (the tutorial's main result)
- 3-SAT → 3-Colouring, 3-SAT → Subset Sum, 3-SAT → Hamiltonian Cycle → TSP (decision)

The Max-Cut branch was done in the tutorial; the others were left for the practice sheet and are worked below the main result.

# Learn: 3-SAT, XOR-SAT and Max-Cut is NP-hard

## 3-SAT versus XOR-SAT (Lecture 22 and the tutorial)

> **In short:** XOR equations can be added to cancel variables, so elimination works; OR clauses cannot be cancelled.

**Definitions (Lecture 22).** Boolean variables $x_1..x_n$; a **literal** is $x_i$ or $\neg x_i$; a **clause** is an OR of literals, satisfied if at least one literal is 1; a **CNF** formula $\Phi = C_1 \wedge \cdots \wedge C_m$ is satisfied when every clause is. **3-SAT**: given a CNF formula with 3 literals per clause, is there a satisfying assignment?

**Brute force** tries all $2^n$ assignments, $O(m)$ each: $O(m2^n)$. For $n = 100$ that is about $1.26\times10^{30}$ steps, some $4\times10^{10}$ years at $10^{12}$ assignments per second. Fifty years of work only lowered the base (about $1.334^n$, then $1.307^n$), still $2^{cn}$.

**ETH** (Impagliazzo and Paturi, 1999): there is a constant $c > 0$ such that 3-SAT cannot be solved in time $O(2^{cn})$; in other words no **subexponential** $2^{o(n)}$ algorithm (such as $2^{\sqrt n}$ or $2^{n/\log n}$) exists. Lecture 22 states Karp's theorem (1972) that 3-SAT $\le_P$ Max-Cut, so under ETH Max-Cut has no subexponential exact algorithm either.

**3-XOR-SAT** (each clause an XOR) is in P. Lecture 22's version: $a \oplus b$ is addition mod 2 and $\neg x_i = x_i + 1$, so for example $\neg x_1 \oplus x_2 \oplus x_3 = 1$ becomes $x_1 + x_2 + x_3 \equiv 0 \pmod 2$ (the $+1$ moves to the right side). Gaussian elimination either reaches a contradiction $0 \equiv 1$ (unsatisfiable) or finds a solution, in $O(n^3)$ for $m = O(n)$.

Each XOR clause is a linear equation mod 2 (with $\neg x = x + 1$), so Gaussian elimination solves the system in $O(n^3)$. The tutorial's worked example:

$$x_1 \oplus x_2 \oplus x_3 = 1 \ (E_1), \qquad x_1 \oplus x_2 \oplus x_4 = 0 \ (E_2), \qquad x_2 \oplus x_3 \oplus x_4 = 1 \ (E_3)$$

1. $E_1 \oplus E_2$: $x_3 \oplus x_4 = 1$ ($x_1, x_2$ cancel because $x \oplus x = 0$).
2. Substitute into $E_3$: $x_2 \oplus 1 = 1$, so $x_2 = 0$.
3. $x_4$ is free; choose $x_4 = 0$, so $x_3 = 1$; then $E_1$ gives $x_1 = 1 \oplus 0 \oplus 1 = 0$.

Solution $(x_1, x_2, x_3, x_4) = (0, 0, 1, 0)$. Check: $E_1 = 1$, $E_2 = 0$, $E_3 = 1$. ✓

**The key ingredient is cancellation**: $x \oplus x = 0$, so equations can be added to eliminate variables. With OR, $x \vee x = x$: nothing cancels, and elimination has nothing to work with.

## The fragile boundary between easy and hard

> **In short:** Tiny changes in the question move a problem from easy to hard.

| In P | NP-hard |
|---|---|
| 2-SAT | 3-SAT |
| XOR-SAT (Gaussian elimination) | 3-SAT (OR clauses) |
| Min-Cut (max flow) | Max-Cut |
| Cut **all** edges (bipartite check) | Cut $\ge k$ edges |
| 2-Colouring | 3-Colouring |
| Shortest path | Longest simple path |
| Eulerian circuit (each edge once) | Hamiltonian cycle (each vertex once) |

A small change in the definition can make a problem jump from polynomial to (believed) exponential. That is why we need rigorous reductions, not intuition.

## Max-Cut and its easy special case

> **In short:** Cutting every edge is a bipartiteness test; cutting as many as possible is hard.

Decision Max-Cut: given $G$ and $k$, is there $S$ with $\ge k$ edges crossing $(S, V\setminus S)$? Give each vertex a bit $x_u$; edge $(u,v)$ is cut $\iff x_u \oplus x_v = 1$.

- Cutting **all** $\lvert E\rvert$ edges means solving the XOR system $\{x_u \oplus x_v = 1\}$, which is exactly "is $G$ bipartite?": $O(\lvert V\rvert + \lvert E\rvert)$ by BFS.
- Cutting **as many as possible** means maximising the number of satisfied equations: hard.

Example: on the odd cycle $C_5$, each cut edge switches sides as you walk around, and you must return to the starting side, so an even number of edges is cut. The max cut is 4 (one edge uncut).

## Step 1a: 3-SAT ≤P NAE-4SAT

> **In short:** Add one shared variable $z$ that plays the role of "false", so not-all-equal becomes at-least-one-true.

**NAE-SAT (not-all-equal).** A clause is satisfied if its literals are **not all equal**: at least one true and at least one false.

**Why NAE is the right stepping stone: symmetry.** Flipping every variable keeps an NAE assignment valid (true and false swap, so "not all equal" is preserved). Max-Cut has the same symmetry (swap $S$ and $V\setminus S$). Ordinary SAT does not: flipping a satisfying assignment can break it.

**Construction.** Add one new variable $z$ to every clause: $(\ell_1 \vee \ell_2 \vee \ell_3) \mapsto \text{NAE}(\ell_1, \ell_2, \ell_3, z)$.

- **($\Rightarrow$)** Take a satisfying assignment and set $z = 0$. Each clause has a true $\ell_i$ and a false $z$, so it is not all equal. ✓
- **($\Leftarrow$)** Take an NAE assignment. If $z = 1$, flip every variable (still NAE by symmetry), so now $z = 0$. Not all equal with $z = 0$ forces some $\ell_i = 1$, so every original clause is satisfied. ✓

$z$ acts as the reference for "false", which removes the symmetry problem.

## Step 1b: NAE-4SAT ≤P NAE-3SAT

> **In short:** Split each 4-literal clause into two 3-literal clauses joined by a fresh variable.

Split each 4-clause with a fresh variable $w$:

$$\boxed{\text{NAE}(a, b, c, d) \ \mapsto\ \text{NAE}(a, b, w) \wedge \text{NAE}(\neg w, c, d)}$$

- **($\Rightarrow$)** Suppose $a, b, c, d$ are not all equal.
  - If $a \ne b$: the first clause holds for any $w$. Choose $w = c$, so $\neg w \ne c$ and the second holds.
  - If $a = b$: choose $w = \neg a$, so the first holds. The second becomes $\text{NAE}(a, c, d)$; since $a = b$ and not all four are equal, $c$ or $d$ differs from $a$. ✓
- **($\Leftarrow$)** Suppose $a = b = c = d = v$. The first clause forces $w = \neg v$, so the second is $\text{NAE}(v, v, v)$: violated. So if both new clauses hold, the old clause held.

**Size**: $n + 1 + m$ variables and $2m$ clauses: linear. So **NAE-3SAT is NP-hard**.

## Step 2: NAE-3SAT ≤P Max-Cut

> **In short:** Sides of the cut are truth values; a triangle scores 2 exactly when its clause has both a true and a false literal.

**Construction.** Given an NAE-3SAT formula with $n$ variables and $m$ clauses (each on 3 distinct variables):

1. **Literal vertices**: two vertices $x_i$ and $\neg x_i$ per variable. The side of the cut a literal is on is its truth value.
2. **Variable edges**: one edge $x_i$ – $\neg x_i$ per variable. It scores 1 only if $x_i$ and $\neg x_i$ are on opposite sides (consistency).
3. **Clause triangles**: for each clause, a triangle on its three literal vertices. It scores 2 if the clause is not-all-equal and 0 otherwise.
4. **Target** $k = n + 2m$, the largest possible score.

**Two counting facts.** There are exactly $n$ variable edges. A triangle has **at most 2** cut edges: with only two sides, two of its three vertices share a side. It has exactly 2 if its vertices are split and 0 if they all lie on one side. (If two clauses share a pair of literals, that triangle edge appears twice; count it twice, or give it weight 2.)

**($\Rightarrow$) NAE-satisfiable ⇒ a cut of size $\ge n + 2m$.** Put every true literal vertex in $S$ and every false one in $V \setminus S$. $x_i$ and $\neg x_i$ are always on opposite sides, so all $n$ variable edges are cut. Each clause is not-all-equal, so its triangle is split and gives 2. Total $n + 2m$.

**($\Leftarrow$) A cut of size $\ge n + 2m$ ⇒ NAE-satisfiable.** Triangles contribute at most $2m$ and variable edges at most $n$, so reaching $n + 2m$ needs both at their maximum. All variable edges cut means $x_i$ and $\neg x_i$ are on opposite sides, so "a literal is true iff it is in $S$" is a consistent assignment. Every triangle has 2 cut edges, so its literals are not all on one side: the clause is NAE-satisfied.

**Size**: $2n$ vertices, $n + 3m$ edges: polynomial.

$$\boxed{\text{3-SAT} \le_P \text{NAE-3SAT} \le_P \text{Max-Cut, so Max-Cut is NP-hard (and NP-complete, being in NP).}}$$

**Worked example (from the tutorial).** $\Phi = \text{NAE}(x_1, x_2, x_3) \wedge \text{NAE}(\neg x_1, x_2, \neg x_3)$: $n = 3$, $m = 2$, $k = 3 + 2\cdot2 = 7$.

- $x_1 = 1, x_2 = 0, x_3 = 0$: $S = \{x_1, \neg x_2, \neg x_3\}$. Clause 1 is $(1, 0, 0)$ and clause 2 is $(0, 0, 1)$, both split. Cut = 3 variable edges + 2 + 2 = **7 = k**. ✓
- $x_1 = x_2 = x_3 = 1$: triangle 1 lies on one side and scores 0, so the cut is only $3 + 0 + 2 = 5 < 7$.

# Learn: the other classic reductions (practice sheet)

These are the remaining branches of the tutorial's map. Independent Set, Vertex Cover and Clique were done in the tutorial as warm-ups; the rest are the standard textbook proofs (KT 8, DPV 8) for the practice sheet.

## Independent Set ≤P Vertex Cover (tutorial warm-up)

> **In short:** What is left over after an independent set is a vertex cover, and the other way round.

**Observation**: $S$ is independent $\iff$ $V \setminus S$ is a vertex cover. For each edge, "not both endpoints in $S$" $\iff$ "at least one endpoint in $V\setminus S$". So $(G, k) \mapsto (G, n - k)$: IS $\ge k$ $\iff$ VC $\le n - k$. Both directions are this one line; write both.

## Independent Set ≤P Clique (tutorial warm-up)

> **In short:** Flip every edge to a non-edge: independent sets become cliques.

$S$ is independent in $G$ $\iff$ $S$ is a clique in the **complement** $\bar G$. Map $(G, k)\mapsto (\bar G, k)$, $O(n^2)$.

Every reduction proof has the same four parts: (1) construction, (2) $\Rightarrow$, (3) $\Leftarrow$, (4) polynomial time.

## 3-SAT ≤P Independent Set

> **In short:** Pick one true literal per clause; the conflict edges stop you from picking both $x$ and $\neg x$.

**IS**: given $G$, $k$, is there a set of $k$ pairwise non-adjacent vertices?

**IS ∈ NP**: certificate the set $S$; check $\lvert S\rvert \ge k$ and no edge inside $S$: $O(n + m)$.

**Construction.** Formula $\varphi$ with clauses $C_1..C_m$. For each clause make a **triangle** of 3 vertices, one per literal. Add an edge between every pair of vertices labelled with **complementary** literals ($x_i$ and $\neg x_i$). Set $k = m$.

**($\Rightarrow$)** Take a satisfying assignment. In each clause pick one true literal's vertex. That is $m$ vertices, one per triangle (no triangle edge inside), and no two are complementary (both can't be true): independent.

**($\Leftarrow$)** An independent set of size $m$ has exactly one vertex per triangle (two in one triangle would be adjacent). Set those literals true; this is consistent because no complementary pair was chosen (they are adjacent). Unset variables are arbitrary. Every clause has a true literal.

**Size**: $3m$ vertices, $O(m^2)$ edges, polynomial.

## Vertex Cover ≤P Set Cover

> **In short:** Each vertex is the set of edges it touches.

Universe $U = E$; for each vertex $v$ a set $S_v$ = the edges at $v$; same $k$. $k$ vertices cover all edges iff the corresponding $k$ sets cover $U$.

## 3-SAT ≤P 3-Colouring

> **In short:** Two colours stand for true and false; gadgets force every clause to contain a true literal.

**Construction.** A triangle **T, F, B** (true, false, base). For each variable $x_i$, vertices $x_i$ and $\neg x_i$ joined to each other and to B, so one of them is coloured T and the other F. For each clause $(a \vee b \vee c)$, an **OR-gadget**: a 6-vertex graph whose output can be coloured T iff at least one input is T, and whose output is joined to F and B (forcing it to T).

**($\Rightarrow$)** Colour literals by the assignment; every clause has a true input, so each gadget can be completed with output T.
**($\Leftarrow$)** In any 3-colouring, call T's colour "true"; each variable pair gets T and F (it avoids B and the two differ); each gadget output is forced to T, which is possible only if some input literal is T. So the assignment satisfies every clause.
**Size** $O(n + m)$.

The gadget details are rarely asked; the structure (palette triangle, variable pairs, forced clause outputs) and the two directions are what earn marks.

## 3-SAT ≤P Subset Sum (sketch)

> **In short:** Write numbers with one digit per variable and per clause so that hitting the target means a consistent assignment satisfying every clause.

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

**NP5 (tutorial direction check).** For each, say whether the conclusion follows: (a) "Max-Cut $\le_P$ 3-SAT, so Max-Cut is NP-hard." (b) "3-SAT $\le_P$ Max-Cut, so Max-Cut is NP-hard." (c) "$X \le_P$ 2-SAT, so $X \in$ P." (d) "2-SAT $\le_P X$, so $X$ is hard."

*Solution.* (a) **No**: it only shows Max-Cut is no harder than 3-SAT (every NP problem reduces to 3-SAT). (b) **Yes**: a polynomial Max-Cut solver composed with the reduction would solve 3-SAT, so Max-Cut is at least as hard as an NP-hard problem. (c) **Yes**: by the lemma, $A \le_P B$ and $B \in$ P give $A \in$ P. (d) **No**: reducing an easy problem to $X$ says nothing about $X$. Rule: the arrow points from the known-hard problem to the new one.

**NP6 (XOR-SAT by elimination).** Decide whether $x_1 \oplus x_2 = 1$, $x_2 \oplus x_3 = 1$, $x_1 \oplus x_3 = 1$ is satisfiable, and relate the answer to Max-Cut on a triangle.

*Solution.* Add all three equations: each variable appears twice and cancels ($x \oplus x = 0$), leaving $0 = 1 \oplus 1 \oplus 1 = 1$. Contradiction, so the system is **unsatisfiable**. These are exactly the equations "edge $uv$ is cut" for the triangle on $\{1, 2, 3\}$, so the triangle cannot have all 3 edges cut: it is an odd cycle, not bipartite. Its max cut is 2 (put one vertex alone), matching the counting fact used in the Max-Cut reduction.

**NP7 (run the reduction).** Apply NAE-3SAT $\le_P$ Max-Cut to $\Phi = \text{NAE}(x_1, x_2, x_3) \wedge \text{NAE}(\neg x_1, \neg x_2, x_3)$. Give $k$, a cut reaching it, and the cut for $x_1 = x_2 = x_3 = 1$.

*Solution.* Vertices $x_1, \neg x_1, x_2, \neg x_2, x_3, \neg x_3$; variable edges $x_i\neg x_i$ ($i = 1, 2, 3$); triangles on $\{x_1, x_2, x_3\}$ and $\{\neg x_1, \neg x_2, x_3\}$. $n = 3$, $m = 2$, so $k = n + 2m = 7$. **Reaching 7**: $x_1 = 1, x_2 = 0, x_3 = 0$ gives clause values $(1, 0, 0)$ and $(0, 1, 0)$, both not-all-equal. $S = \{x_1, \neg x_2, \neg x_3\}$: all 3 variable edges cut, each triangle split (2 each): $3 + 2 + 2 = 7$. **All ones**: clause 1 is $(1,1,1)$, its triangle sits in $S$ and scores 0; clause 2 is $(0, 0, 1)$ and scores 2; total $3 + 0 + 2 = 5 < 7$.

**NP8 (why the gadgets are needed).** (a) Why can't we reduce 3-SAT to NAE-3SAT by keeping each clause unchanged? (b) In step 1a, why is it safe to flip every variable when $z = 1$? (c) In step 1b, why does the split need a **fresh** $w$ per clause?

*Solution.* (a) The ($\Rightarrow$) direction fails: $(x \vee y \vee z)$ with $x = y = z = 1$ is satisfied, but $\text{NAE}(1, 1, 1)$ is violated. A satisfiable formula could map to an unsatisfiable one. (b) NAE is symmetric: complementing every variable turns each clause's values into their complements, and "not all equal" is preserved, so the flipped assignment is still an NAE assignment, now with $z = 0$. (c) Each $w$ must be set to suit its own clause ($w = c$ or $w = \neg a$ in the proof). A shared $w$ could be forced to different values by different clauses, breaking ($\Rightarrow$).

**NP9 (decision to search).** You have a black box deciding "does $G$ have a cut with $\ge k$ edges?" and one deciding SAT. Find the maximum cut value, and a satisfying assignment of $\Phi$, with few calls.

*Solution.* **Value**: the answer is monotone in $k$ (a cut of size $\ge k$ is one of size $\ge k - 1$), so binary search $k$ over $\{0, \ldots, \lvert E\rvert\}$: $O(\log\lvert E\rvert)$ calls. **Assignment** (self-reducibility): first ask whether $\Phi$ is satisfiable; if not, stop. For $i = 1..n$: ask whether $\Phi$ with $x_i = 1$ (and the earlier choices fixed) is satisfiable; if yes fix $x_i = 1$, else fix $x_i = 0$ (which must then be satisfiable). Invariant: the formula with the fixed values stays satisfiable. $n + 1$ calls, each on a polynomial-size formula. Hence the decision versions are as hard as the optimisation and search versions.

**NP10 (the tutorial quiz joke, taken seriously).** The tutorial "quiz" demanded a maximum cut and a minimum vertex cover of the seating graph "since both are NP-hard". The seating graph is a grid of desks with edges between neighbours. Are these two problems hard on this graph?

*Solution.* No. A grid is **bipartite** (colour desk $(r, c)$ by the parity of $r + c$; neighbours differ in parity). On a bipartite graph the maximum cut cuts **every** edge (take one colour class as $S$), found by BFS in $O(n + m)$. Minimum vertex cover on a bipartite graph equals the maximum matching (**König**), found by max flow in polynomial time. NP-hardness is a worst-case statement over all graphs; special classes can be easy.

**NP11 (Lecture 22 review 1, counter fooling).** Give a string of length 6 over `( ) [ ]` that is not balanced but fools both counters.

*Solution.* `([)]()`. $c_{\text{round}}$: $1, 1, 0, 0, 1, 0$; $c_{\text{square}}$: $0, 1, 1, 0, 0, 0$. Neither goes negative and both end at 0, but `)` at position 3 closes a `(` while `[` (opened later) is still open, so the string is not balanced. (Any string from the "counters fail" list padded to length 6 also works, e.g. `(([)])`.)

**NP12 (Lecture 22 review 2, Algorithm 3 trace).** Trace Algorithm 3 on `([])` with $p = 17$, $r = 3$.

*Solution.* `(` at depth 0: $H = 1$, $d = 1$, $w = 3$. `[` at depth 1: $H = 1 + 2\cdot3 = 7$, $d = 2$, $w = 9$. `]`: $d = 1$, $w = 9\cdot6 = 54 \equiv 3$, $H = 7 - 2\cdot3 = 1$. `)`: $d = 0$, $w = 3\cdot6 = 18 \equiv 1$, $H = 1 - 1 = 0$. End: $d = 0$, $H = 0$: accept.

**NP13 (Lecture 22 review 3, Max-Cut versus bipartiteness).** What is the max cut of the 5-cycle $C_5$?

*Solution.* **4.** Walking around the cycle, every cut edge switches sides, and we return to the starting vertex, so the number of cut edges is even: at most 4 of 5. Four is reached by alternating sides $S, \bar S, S, \bar S, S$ (only the edge between the first and last vertex is uncut). In equation form, cutting all 5 would need $x_1 \oplus x_2 = \cdots = x_5 \oplus x_1 = 1$; adding them gives $0 = 1$.

**NP14 (Lecture 22, why the special case is enough).** The randomized Algorithm 3 only handles "all openers, then all closers". Why does Theorem 2 still show that no deterministic $O(\log n)$ algorithm handles even this case?

*Solution.* The strings $S_AS_B$ used in the proof of Theorem 2 are themselves of this special shape. So any deterministic algorithm that is correct just on 1-hill strings already decides equality, and needs $\Omega(n)$ bits. Randomness (with error $< 1/n$) is what lets Algorithm 3 use $O(\log n)$ bits.

