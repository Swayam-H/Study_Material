# Learn: balanced brackets and lower bounds by reduction

Lecture 22 uses one idea twice. A **reduction** turns a fast algorithm for problem X into a fast algorithm for problem Y. So if Y is known to be hard, X must be hard too. The lecture first uses this to prove a **memory** lower bound for checking brackets, and then defines **NP-hardness** the same way. Sources: Lecture 22, the Lecture 24 course summary, the NP tutorial.

## One bracket type

> **In short:** With one bracket type only the count of open brackets matters, so a single counter is enough.

**Problem.** A string $S = s_1\ldots s_n$ of `(` and `)` arrives one character at a time, and we get a single left-to-right pass over it (the **one-pass streaming model**). Accept iff every `(` is properly closed and no `)` appears before its partner.

**Algorithm 1: stack, $O(n)$ space.** Push on `(`. On `)`, pop, and reject if the stack is empty. Accept iff the stack is empty at the end. On `((( … )))` with $n/2$ openers first, the stack holds $n/2$ items halfway through: $\Theta(n)$ space.

**Algorithm 2: counter, $O(\log n)$ space (DYCK₁).** Every item on the stack is the same symbol `(`, so only how many there are matters. Keep a counter $c$: add 1 for `(` and subtract 1 for `)`. Reject as soon as $c < 0$ (a closer with no partner so far). Accept iff $c = 0$ at the end. Since $c \le n$, it needs $\lceil\log_2(n+1)\rceil$ bits: about 30 bits for $n = 10^9$.

## Two bracket types

> **In short:** With two types the order of the open brackets matters, and counters cannot remember order.

**Definition.** A string of `( ) [ ]` is balanced if (1) every opener is closed by a closer of the **same type**, and (2) the last bracket opened is the first one closed. The stack still works (check the type on top before popping), using $O(n)$ space.

**Counters fail.** Keep one counter for round brackets, $c_{\text{round}}$, and one for square, $c_{\text{square}}$. These strings fool them:

- `([)]`: `[` was opened inside `(`, so it must close first, but `)` comes first. Both counters stay $\ge 0$ and end at $(0, 0)$.
- `(([))[]]`: $c_{\text{round}}$ goes $0,1,2,2,1,0,0,0,0$ and $c_{\text{square}}$ goes $0,0,0,1,1,1,2,1,0$. Both end at 0, yet the `[` at position 3 is crossed by `))`.
- `([[())])`, and in general any string that opens and closes the same *number* of each type.

**Why:** after `([` and after `[(` the counters hold the same values $(1, 1)$. Adding up counts ignores order, so counters can't remember the **order** in which brackets were opened, and that order decides which closer is allowed next.

## Lower bound: $\Omega(n)$ bits for two types (deterministic)

> **In short:** A small-memory bracket checker would let Alice and Bob test equality with few bits, which is impossible.

**Recall (Lecture 20, Theorem 1).** Alice holds $x \in \{0,1\}^m$ and Bob holds $y$. Any deterministic protocol where Alice sends one message and Bob decides whether $x = y$ needs at least $m$ bits. With fewer bits, two strings $x \ne x'$ would get the same message (pigeonhole), and Bob holding $y = x$ couldn't tell them apart.

**The reduction.**

1. Alice turns $x$ into openers $S_A$, left to right: $0 \mapsto$ `(` and $1 \mapsto$ `[`.
2. Bob turns $y$ into closers $S_B$, **right to left** (since the last opened must be the first closed): $0\mapsto$ `)` and $1\mapsto$ `]`. For $x = y = 0110$: $S_AS_B = $ `([[()]])`.
3. **Claim 1.** $S_AS_B$ (length $n = 2m$) is balanced $\iff x = y$. The $i$-th opener (which encodes $x_i$) is closed by the $i$-th closer counted from the end (which encodes $y_i$), so the types match exactly when $x_i = y_i$.

![Bracket reduction](fig/aad-bracket-reduction.svg)

*Figure. Alice writes $x = 0110$ as openers and Bob writes $y = 0110$ as closers in reverse. Each opener is closed by the closer at the mirror position, so the string is balanced exactly when every pair has the same type, that is, when $x = y$.*

**Theorem 2.** Any deterministic one-pass algorithm $A$ for two bracket types uses $s(n) \ge n/2 = \Omega(n)$ bits.

*Proof.* Alice runs $A$ on $S_A$ and sends Bob $A$'s entire memory, which is $s(n)$ bits. Bob loads that memory and continues running $A$ on $S_B$. Now $A$ has processed $S_AS_B$ in one pass, so it says "balanced" iff $x = y$ (Claim 1). So Alice and Bob decided equality using $s(n)$ bits, and Theorem 1 gives $s(n) \ge m = n/2$. $\square$

**Key takeaway: streaming memory = communication.** If you pause a one-pass algorithm halfway, its memory is a message from the first half of the input to the second half. So a lower bound on communication becomes a lower bound on space.

## Randomised checksum in $O(\log n)$ bits

> **In short:** Give each depth its own random weight so that matched pairs cancel and mismatches almost never do.

The hard strings above have a special shape: all $m$ openers first, then all $m$ closers ("1-hill"). Even these need $\Omega(n)$ bits deterministically. With randomness we can do much better.

**Two-polynomial view.** Encode `(` and `)` as 1, and `[` and `]` as 2. The openers are $a_1..a_m$, and the closers arrive from the inside out as $b_m, \ldots, b_1$. Then balanced $\iff a_i = b_i$ for all $i$ $\iff P_{\text{open}}(z) = \sum_i a_iz^{i-1}$ and $P_{\text{close}}(z) = \sum_i b_iz^{i-1}$ are the same polynomial.

**One polynomial.** Use signed values $v($`(`$) = +1$, $v($`)`$) = -1$, $v($`[`$) = +2$, $v($`]`$) = -2$, so a correctly matched pair adds to 0. Pair the opener and closer at each depth $d$:
$$P(x) = \sum_{d=0}^{m-1}\big(v(\text{open at } d) + v(\text{close at } d)\big)x^d.$$
If the string is balanced, every coefficient is 0, so $P \equiv 0$. A type mismatch at depth $d$ gives a coefficient of $\pm1 \ne 0$, so $P \not\equiv 0$.

**Algorithm 3 (single checksum).** Pick a prime $p > n^2$ and a random $r \in \{1..p-1\}$, and precompute $r^{-1} \bmod p$. Start with depth $d = 0$, weight $w = r^d = 1$, checksum $H = 0$, and a flag `seen_close` = false.

- **Opener** $s_i$: if `seen_close` is set, reject (an opener after a closer means the string is not 1-hill). Otherwise $H \leftarrow H + v(s_i)\,w$, then $d \leftarrow d + 1$ and $w \leftarrow wr$.
- **Closer** $s_i$: set `seen_close`. If $d = 0$, reject. Otherwise $d \leftarrow d - 1$ and $w \leftarrow wr^{-1}$ (back to $r^{d}$), then $H \leftarrow H + v(s_i)\,w$.
- **End:** accept iff $d = 0$ and $H \equiv 0 \pmod p$.

A closer first steps back down to the depth of the opener it closes, and then adds its value with the **same** weight $r^d$. So a matched pair contributes $+v\,r^d - v\,r^d = 0$.

**Example 1, balanced `([()])`**, with $p = 17$, $r = 3$, $r^{-1} = 6$ (since $3\cdot6 = 18 \equiv 1$):

| $s_i$ | depth used | term | $H$ |
|---|---|---|---|
| `(` | 0 | $+1\cdot1$ | 1 |
| `[` | 1 | $+2\cdot3$ | 7 |
| `(` | 2 | $+1\cdot9$ | 16 |
| `)` | 2 | $-1\cdot9$ | 7 |
| `]` | 1 | $-2\cdot3$ | 1 |
| `)` | 0 | $-1\cdot1$ | 0 |

$d = 0$ and $H = 0$: **accept**.

**Example 2, crossed `([(]))`** (two `(`, two `)`, one `[`, one `]`, so counters are fooled). The openers give $H = 1 + 6 + 9 = 16$. Then `]` closes depth 2: $16 - 2\cdot9 = -2 \equiv 15$. `)` closes depth 1: $15 - 3 = 12$. `)` closes depth 0: $12 - 1 = 11$. $H = 11 \ne 0$: **reject**. Check: $P(x) = (1-1) + (2-1)x + (1-2)x^2 = x - x^2$, and $P(3) = -6 \equiv 11$.

**Theorem 3 (error and space).** A valid string has $P \equiv 0$, so $H = 0$ every time: the error is one-sided. An invalid string either fails the depth or order checks (caught for sure), or has $P \not\equiv 0$ with degree $\le m - 1 < n$. In that case Schwartz–Zippel gives $\Pr[H = 0] \le \frac{n}{p} < \frac1n$ for $p > n^2$. Space: $p, r, r^{-1}, d, w, H$ each take $O(\log p) = O(\log n)$ bits.

The course summary calls this the 1-hill version (DYCK₂ restricted to "all opens, then all closes"). The tutorial ends with the same lesson as this section: a reduction turns a known lower bound (for equality, or for 3-SAT) into a new one.

# Learn: P, NP and reductions

This chapter follows the NP tutorial ("NP, Reductions and Satisfiability", Samarth Singla) and the complexity pages of the Lecture 24 course summary. Its main result is the one Lecture 22 promised: **Max-Cut is NP-hard**, proved by the chain 3-SAT $\le_P$ NAE-3SAT $\le_P$ Max-Cut.

## Efficient means polynomial time

> **In short:** Polynomial running times stay usable as inputs grow; exponential ones explode almost at once.

An algorithm is **efficient** if it runs in time $O(n^c)$ for some constant $c$, where $n$ is the input size. The tutorial's table (at $10^9$ operations per second) shows why the line is drawn there:

| Running time | $n = 100$ | $n = 1000$ |
|---|---|---|
| $n^2$ | 10 µs | 1 ms |
| $n^3$ | 1 ms | 1 s |
| $1.307^n$ (best known 3-SAT) | about 7 minutes | about $10^{116}$ s |
| $2^n$ | about $4\times10^{13}$ years | about $10^{301}$ s |

Polynomials stay polynomial when combined: calling a polynomial-time routine a polynomial number of times is still polynomial. With $2^n$ time, a computer twice as fast only lets you go from $n$ to $n + 1$.

## Decision versus optimisation

> **In short:** Asking only yes or no loses nothing, because a yes/no solver can recover the best value and a solution.

The theory is about **decision problems**, which have YES/NO answers (formally, a problem is the set of its YES instances). An optimisation problem becomes a decision problem by adding a threshold: "is there a cut with $\ge k$ edges?", "is there an independent set of size $\ge k$?". Nothing is lost:

- **The best value:** binary search on $k \in \{0, \ldots, \lvert E\rvert\}$ needs $O(\log\lvert E\rvert)$ calls to the decision version.
- **An actual solution** (self-reducibility, shown for SAT): ask whether $\Phi$ with $x_1 = 1$ is satisfiable, fix $x_1$ to match the answer, and repeat for $x_2, \ldots, x_n$. That is $n + 1$ calls.

So if the decision version is hard, the optimisation version is hard too.

## The class P, and finding versus checking

> **In short:** Many problems are hard to solve but easy to check once someone hands you an answer.

**P** is the set of decision problems that can be solved in time polynomial in the input size. Examples from the course: shortest paths, MST, sorting, max flow and min cut, bipartiteness ("can we cut every edge?"), 2-SAT, XOR-SAT, balanced brackets, pattern matching.

Finding an answer and checking one can be very different. Solving a hard Sudoku takes hours, but checking a filled grid is one scan. Finding a satisfying assignment for a 3-SAT formula takes about $1.307^n$ time with the best known algorithm, but checking one takes $O(m)$. **NP is the class of problems whose YES answers have a short proof that is quick to check.**

## The class NP (verifier definition)

> **In short:** NP = problems where a yes answer comes with a short proof that can be checked quickly.

$$\boxed{L \in \text{NP} \iff \exists\ \text{poly-time } V,\ \text{polynomial } q:\ \ x \in L \iff \exists c,\ \lvert c\rvert \le q(\lvert x\rvert),\ V(x, c) = \text{Yes}}$$

The string $c$ is called the **certificate** (or witness, or proof), and $V$ is the **verifier**.

- **Completeness:** every YES instance has some certificate that convinces $V$.
- **Soundness:** for a NO instance, no certificate can fool $V$.
- The certificate must be short (polynomial size) and checking must be fast (polynomial time).

NP stands for **nondeterministic polynomial time**: think of a machine that could guess $c$ and then check it.

| Problem | Certificate | Verification |
|---|---|---|
| 3-SAT | a truth assignment | evaluate each clause, $O(m)$ |
| Max-Cut $\ge k$ | a partition $(S, V\setminus S)$ | count crossing edges, $O(\lvert E\rvert)$ |
| Independent Set $\ge k$ | a set $S$ of $k$ vertices | no edge inside $S$, $O(\lvert E\rvert)$ |
| Clique $\ge k$ | a set $S$ of $k$ vertices | all $\binom k2$ pairs adjacent |
| 3-Colouring | a colour per vertex | endpoints differ on every edge |
| Hamiltonian Cycle | an ordering of the vertices | consecutive pairs are edges |
| Composite($N$) | a factor $d$ | $1 < d < N$ and $d \mid N$ |

Composite is also in P (the AKS primality test, 2002). So **being in NP does not mean being hard.** Being in NP is an *upper* bound on how hard a problem is.

### Worked template: Max-Cut (decision) is in NP

Given $G = (V, E)$ and $k$, is there an $S \subseteq V$ with $\lvert E(S, V\setminus S)\rvert \ge k$? Write all four lines:

1. **Certificate:** one bit $x_u \in \{0,1\}$ per vertex, saying which side it is on. That is $\lvert V\rvert$ bits, so polynomial.
2. **Verifier:** for each edge $(u,v)$, add 1 if $x_u \ne x_v$. Accept iff the total is $\ge k$. Time $O(\lvert V\rvert + \lvert E\rvert)$.
3. **Completeness:** if a cut with $\ge k$ edges exists, its bit vector is accepted.
4. **Soundness:** if every cut has fewer than $k$ edges, every bit vector gives a total below $k$, so $V$ rejects.

## Two misconceptions the tutorial corrects

> **In short:** NP does not mean "not polynomial", and NP-hard does not mean every instance is hard.

**"NP means not polynomial."** False: every problem in P is also in NP. *Proof that P ⊆ NP:* if $A$ solves $L \in$ P, use the verifier $V(x, c)$ that ignores $c$ and just runs $A(x)$. Any certificate works, even the empty one.

**"NP-hard means every instance is hard."** False: hardness is about the **worst case**. Special cases can be easy: Max-Cut on bipartite graphs (cut every edge), Independent Set on trees (a simple DP), 3-SAT where every clause has a positive literal (set every variable to 1).

## P versus NP

> **In short:** Is checking really easier than solving? Nobody knows, but almost everyone thinks so.

Is P = NP? In other words, can every problem whose answers are quick to check also be solved quickly? This has been open since 1971 and is a Clay Millennium problem. Almost everyone believes P ≠ NP. If P = NP, much of cryptography would break, and finding proofs would be as easy as checking them.

Some problems are not obviously in NP at all. **UNSAT** ("no assignment works") has no obvious short proof that nothing works. Complements of NP problems like this form the class **co-NP**.

## Reductions

> **In short:** Turn instances of $A$ into instances of $B$ with the same answer; then $B$ is at least as hard as $A$.

To solve $A$ using a solver for $B$: turn an instance $x$ of $A$ into an instance $f(x)$ of $B$ in polynomial time, and ask the $B$-solver. We never write a solver for $B$. We only show how we would use one if we had it.

| Term | Definition to write in the exam |
|---|---|
| **$A \le_P B$** (Karp, many-one) | A polynomial-time computable $f$ with $x \in A \iff f(x) \in B$ for **every** instance $x$. Read it as "$A$ reduces to $B$", "$A$ is no harder than $B$", "$B$ is at least as hard as $A$". |
| Cook (Turing) reduction | May call the $B$-solver many times. The course uses Karp reductions: one call, at the end. |
| **NP-hard** | Every $A \in$ NP satisfies $A \le_P X$. NP-hard problems need not be in NP (optimisation versions, the Halting Problem). |
| **NP-complete** | NP-hard **and** in NP: the hardest problems in NP. If one is in P then P = NP. Both halves earn marks. |
| **Cook–Levin** (1971, 1973) | SAT is NP-complete (and so is 3-SAT). Every other proof is a reduction from a known problem. |
| **ETH** | 3-SAT cannot be solved in time $2^{o(n)}$, $n$ = number of variables. A conjecture stronger than P ≠ NP; it gives tight conditional lower bounds. |

**Lemma.** If $A \le_P B$ and $B \in$ P, then $A \in$ P. (Turned around: if $A \le_P B$ and $A \notin$ P, then $B \notin$ P.)

*Proof.* Say $f$ runs in time $p(n)$ and $B$'s algorithm in time $r(n)$, both polynomials. On an input $x$ of size $n$:
1. Compute $f(x)$ in time $p(n)$. Then $\lvert f(x)\rvert \le p(n)$, because an algorithm can't write more symbols than it has time for.
2. Run $B$'s algorithm on $f(x)$, in time $r(p(n))$.

The answer is right because $x \in A \iff f(x) \in B$. The total time $p(n) + r(p(n))$ is a polynomial. $\square$

**Reductions chain together:** $A \le_P B$ and $B \le_P C$ give $A \le_P C$, using $g \circ f$. That is why hardness proofs form chains from one starting problem.

**Cook–Levin, the idea of the proof.** Take $L \in$ NP with a verifier $V$ running in time $T$. The whole run of $V$ can be written as a $T \times T$ table of bits. "This table is a valid run that accepts" is a set of local rules, each a small CNF formula. The certificate bits are left as free variables. So the resulting formula $\Phi$ is satisfiable $\iff x \in L$.

## The direction rule

> **In short:** Reduce from the problem you know is hard to the one you want to show is hard.

$$\boxed{\text{to prove } X \text{ NP-hard, reduce a KNOWN hard problem TO } X:\ \ \text{3-SAT} \le_P X}$$

The arrow points towards the harder problem: **from the one you know is hard, to the one you want to prove hard.** The tutorial's direction check:

| Statement | Verdict |
|---|---|
| "I reduced Max-Cut to 3-SAT, so Max-Cut is NP-hard." | **Wrong.** It shows Max-Cut is no harder than 3-SAT. |
| "I reduced 3-SAT to Max-Cut, so Max-Cut is NP-hard." | **Correct.** A fast Max-Cut solver would give a fast 3-SAT solver. |
| "I reduced my problem $X$ to 2-SAT, so $X \in$ P." | **Correct.** 2-SAT is in P, so $X$ is by the lemma. |
| "I reduced 2-SAT to my problem $X$, so $X$ is hard." | **Wrong.** 2-SAT is easy; this says nothing. |

## The recipe for "prove $X$ is NP-complete" (how it is marked)

> **In short:** In NP, then a reduction from a known hard problem, then both directions, then polynomial size.

1. **$X \in$ NP:** name the certificate, say what the verifier checks, and give its running time.
2. **Pick a known NP-complete problem $A$** (usually 3-SAT) and write "we show $A \le_P X$".
3. **Build $f$**, turning instances of $A$ into instances of $X$. Mind the direction: $A \to X$! Describe it exactly (vertices, edges, numbers, $k$) for an **arbitrary** instance.
4. **($\Rightarrow$)** If $x$ is a YES instance of $A$, then $f(x)$ is a YES instance of $X$. Usually you turn a solution of $x$ into a solution of $f(x)$.
5. **($\Leftarrow$)** If $f(x)$ is a YES instance of $X$, then $x$ is a YES instance of $A$. Usually you turn **any** solution of $f(x)$ back into a solution of $x$.
6. **Polynomial time:** $f$ runs in polynomial time (so its output has polynomial size).

Step 5 is where most marks are lost. The solution of $f(x)$ can be anything, not one you designed, so your argument must work for every possible solution.

## A map of classic reductions

> **In short:** Every hardness proof traces back to SAT through a chain of reductions.

The tutorial's map. Each arrow $A \to B$ means $A \le_P B$, and every problem here is NP-complete:

- SAT → 3-SAT
- 3-SAT → Independent Set → Vertex Cover; Independent Set → Clique
- 3-SAT → **NAE-3SAT → Max-Cut** (the tutorial's main result)
- 3-SAT → 3-Colouring, 3-SAT → Subset Sum, 3-SAT → Hamiltonian Cycle → TSP (decision)

![Reduction map](fig/aad-reduction-map.svg)

*Figure. The tutorial's map of reductions. Every problem shown is NP-complete; the red chain is the one proved in full below.*

The tutorial did the Max-Cut branch. The others were left for the practice sheet and are worked out after the main result.

# Learn: 3-SAT, XOR-SAT and Max-Cut is NP-hard

## 3-SAT versus XOR-SAT (Lecture 22 and the tutorial)

> **In short:** XOR equations can be added to cancel variables, so elimination works; OR clauses cannot be cancelled.

The two problems look almost the same: both ask for an assignment to $x_1..x_n$ that satisfies $m$ clauses of 3 literals each. The only difference is the connective inside a clause, and that one change moves the problem from "polynomial" to "believed exponential".

| | **3-SAT** | **3-XOR-SAT** |
|---|---|---|
| Clause | $x_1 \vee \neg x_2 \vee x_3$ | $x_1 \oplus \neg x_2 \oplus x_3 = b$ |
| Satisfied when | **at least one** literal is 1 | the literals add up to $b$ mod 2 (odd or even number of 1s) |
| What it is | a logical condition | a **linear equation** mod 2 |
| Combining two clauses | nothing cancels: $x \vee x = x$ | add them and shared variables cancel: $x \oplus x = 0$ |
| Best known algorithm | about $1.307^n$ (exponential) | Gaussian elimination, $O(n^3)$ |
| Status | NP-complete | in P |

**Definitions (Lecture 22).** A **literal** is $x_i$ or $\neg x_i$. A **clause** is an OR of literals, satisfied if at least one literal is 1. A **CNF** formula $\Phi = C_1 \wedge \cdots \wedge C_m$ is satisfied when every clause is. **3-SAT** asks whether a CNF formula with 3 literals per clause has a satisfying assignment.

### Why XOR-SAT is easy: it is linear algebra

Two rules turn every XOR clause into a linear equation over $\{0, 1\}$ with arithmetic mod 2:

1. $a \oplus b$ is just $a + b \pmod 2$.
2. $\neg x_i = x_i + 1$, so a negation becomes a $+1$ that moves to the right-hand side.

For example, $\neg x_1 \oplus x_2 \oplus x_3 = 1$ becomes $x_1 + 1 + x_2 + x_3 \equiv 1$, that is, $x_1 + x_2 + x_3 \equiv 0 \pmod 2$.

Now the formula is a system of linear equations, and **Gaussian elimination** solves it like any linear system. It either ends in a contradiction $0 \equiv 1$ (unsatisfiable) or leaves a solution, in $O(n^3)$ time when $m = O(n)$.

**The tutorial's worked example.**

$$x_1 \oplus x_2 \oplus x_3 = 1 \ (E_1), \qquad x_1 \oplus x_2 \oplus x_4 = 0 \ (E_2), \qquad x_2 \oplus x_3 \oplus x_4 = 1 \ (E_3)$$

1. **Eliminate** $x_1$ and $x_2$: add $E_1$ and $E_2$. Since $x \oplus x = 0$, they cancel, leaving $x_3 \oplus x_4 = 1$.
2. **Substitute** into $E_3$: $x_2 \oplus (x_3 \oplus x_4) = x_2 \oplus 1 = 1$, so $x_2 = 0$.
3. **Back-substitute:** $x_4$ is free, so choose $x_4 = 0$. Then $x_3 = 1$, and $E_1$ gives $x_1 = 1 \oplus 0 \oplus 1 = 0$.

Solution $(x_1, x_2, x_3, x_4) = (0, 0, 1, 0)$. Check: $E_1 = 0 \oplus 0 \oplus 1 = 1$ ✓, $E_2 = 0 \oplus 0 \oplus 0 = 0$ ✓, $E_3 = 0 \oplus 1 \oplus 0 = 1$ ✓.

### Why 3-SAT is hard: nothing cancels

**What makes elimination work is cancellation:** $x \oplus x = 0$, so adding two equations removes a variable and the system shrinks. With OR, $x \vee x = x$, so combining clauses never removes anything.

The closest thing to elimination for OR clauses makes things worse. To get rid of $x$ you must combine every clause containing $x$ with every clause containing $\neg x$: $(x \vee A)$ and $(\neg x \vee B)$ give $(A \vee B)$. With $k$ clauses of one kind and $l$ of the other, that is $k \cdot l$ new clauses, each **longer** than before. Repeating this blows up instead of shrinking.

So no shortcut is known, and the best algorithms are still essentially a search:

- **Brute force** tries all $2^n$ assignments at $O(m)$ each: $O(m2^n)$. For $n = 100$ that is about $1.26\times10^{30}$ steps, around $4\times10^{10}$ years at $10^{12}$ assignments per second.
- **Fifty years of research** has only lowered the base (to about $1.334^n$, then $1.307^n$). It is still $2^{cn}$.
- **ETH** (Impagliazzo and Paturi, 1999) says this is the truth: there is a constant $c > 0$ such that 3-SAT cannot be solved in $O(2^{cn})$ time. So there is no **subexponential** $2^{o(n)}$ algorithm, such as $2^{\sqrt n}$ or $2^{n/\log n}$.
- Lecture 22 states Karp's theorem (1972) that 3-SAT $\le_P$ Max-Cut. So under ETH, Max-Cut has no subexponential exact algorithm either.

**Exam one-liner.** "XOR-SAT is a linear system over $\mathbb{Z}_2$, because $\oplus$ is addition mod 2 and $\neg x = x + 1$, so Gaussian elimination solves it in $O(n^3)$. Elimination relies on $x \oplus x = 0$. OR has no such cancellation ($x \vee x = x$), and 3-SAT is NP-complete."

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

A small change in the definition can make a problem jump from polynomial to (believed) exponential time. That is why we need careful reductions, not intuition.

## Max-Cut and its easy special case

> **In short:** Cutting every edge is a bipartiteness test; cutting as many as possible is hard.

Decision Max-Cut: given $G$ and $k$, is there a set $S$ with at least $k$ edges crossing $(S, V\setminus S)$? Give each vertex a bit $x_u$ for its side. Edge $(u,v)$ is cut $\iff x_u \oplus x_v = 1$.

- Cutting **every** edge means solving the XOR system $\{x_u \oplus x_v = 1\}$, which is exactly "is $G$ bipartite?". BFS answers it in $O(\lvert V\rvert + \lvert E\rvert)$.
- Cutting **as many as possible** means satisfying as many of those equations as possible, and that is hard.

Example: on the odd cycle $C_5$, each cut edge switches sides as you walk around, and you must end on the side you started from. So an even number of edges is cut, and the max cut is 4 (one edge stays uncut).

## Step 1a: 3-SAT ≤P NAE-4SAT

> **In short:** Add one shared variable $z$ that plays the role of "false", so not-all-equal becomes at-least-one-true.

**NAE-SAT (not-all-equal).** A clause is satisfied if its literals are **not all equal**: at least one is true and at least one is false.

**Why NAE is the right stepping stone: symmetry.** Flipping every variable keeps an NAE assignment valid, because true and false swap and "not all equal" stays true. Max-Cut has the same symmetry: swapping $S$ and $V\setminus S$ changes nothing. Ordinary SAT does not: flipping a satisfying assignment can break it.

**Construction.** Add one new variable $z$ to every clause: $(\ell_1 \vee \ell_2 \vee \ell_3) \mapsto \text{NAE}(\ell_1, \ell_2, \ell_3, z)$.

- **($\Rightarrow$)** Take a satisfying assignment and set $z = 0$. Each clause has a true $\ell_i$ and a false $z$, so its literals are not all equal. ✓
- **($\Leftarrow$)** Take an NAE assignment. If $z = 1$, flip every variable; it is still NAE by symmetry, and now $z = 0$. With $z = 0$, "not all equal" forces some $\ell_i = 1$. So every original clause is satisfied. ✓

$z$ serves as a fixed reference for "false", which removes the symmetry problem.

## Step 1b: NAE-4SAT ≤P NAE-3SAT

> **In short:** Split each 4-literal clause into two 3-literal clauses joined by a fresh variable.

Split each 4-literal clause using a fresh variable $w$:

$$\boxed{\text{NAE}(a, b, c, d) \ \mapsto\ \text{NAE}(a, b, w) \wedge \text{NAE}(\neg w, c, d)}$$

- **($\Rightarrow$)** Suppose $a, b, c, d$ are not all equal. We choose $w$:
  - If $a \ne b$: the first clause holds whatever $w$ is. Choose $w = c$; then $\neg w \ne c$, so the second clause holds.
  - If $a = b$: choose $w = \neg a$, so the first clause holds. The second becomes $\text{NAE}(a, c, d)$. Since $a = b$ and the four are not all equal, $c$ or $d$ differs from $a$, so it holds. ✓
- **($\Leftarrow$)** Suppose instead that $a = b = c = d = v$. The first clause forces $w = \neg v$, and then the second is $\text{NAE}(v, v, v)$, which fails. So if both new clauses hold, the old clause held.

**Size:** $n + 1 + m$ variables and $2m$ clauses, which is linear. So **NAE-3SAT is NP-hard**.

## Step 2: NAE-3SAT ≤P Max-Cut

> **In short:** Sides of the cut are truth values; a triangle scores 2 exactly when its clause has both a true and a false literal.

**Construction.** Start from an NAE-3SAT formula with $n$ variables and $m$ clauses (each clause on 3 different variables).

1. **Literal vertices:** two vertices, $x_i$ and $\neg x_i$, for each variable. The side a literal ends up on is its truth value.
2. **Variable edges:** one edge $x_i$ – $\neg x_i$ per variable. It scores 1 only if $x_i$ and $\neg x_i$ are on opposite sides, which keeps the assignment consistent.
3. **Clause triangles:** for each clause, a triangle on its three literal vertices. It scores 2 if the clause is not-all-equal and 0 otherwise.
4. **Target:** $k = n + 2m$, the most the graph could possibly score.

**Two counting facts.** There are exactly $n$ variable edges. A triangle has **at most 2** cut edges, because with only two sides, two of its three corners must share a side. It has exactly 2 when its corners are split, and 0 when all three are on one side. (If two clauses share a pair of literals, that triangle edge appears twice: count it twice, or give it weight 2.)

**($\Rightarrow$) NAE-satisfiable ⇒ a cut with at least $n + 2m$ edges.** Put every true literal vertex in $S$ and every false one outside. $x_i$ and $\neg x_i$ always land on opposite sides, so all $n$ variable edges are cut. Each clause is not-all-equal, so its triangle is split and scores 2. Total: $n + 2m$.

**($\Leftarrow$) A cut with at least $n + 2m$ edges ⇒ NAE-satisfiable.** Triangles give at most $2m$ and variable edges at most $n$, so reaching $n + 2m$ needs both at their maximum.
- All variable edges are cut, so $x_i$ and $\neg x_i$ are on opposite sides. So "a literal is true iff it is in $S$" is a consistent assignment.
- Every triangle has 2 cut edges, so its literals are not all on one side. So each clause is NAE-satisfied.

**Size:** $2n$ vertices and $n + 3m$ edges, which is polynomial.

$$\boxed{\text{3-SAT} \le_P \text{NAE-3SAT} \le_P \text{Max-Cut, so Max-Cut is NP-hard (and NP-complete, being in NP).}}$$

**Worked example (from the tutorial).** $\Phi = \text{NAE}(x_1, x_2, x_3) \wedge \text{NAE}(\neg x_1, x_2, \neg x_3)$, so $n = 3$, $m = 2$ and $k = 3 + 2\cdot2 = 7$.

- $x_1 = 1, x_2 = 0, x_3 = 0$: $S = \{x_1, \neg x_2, \neg x_3\}$. Clause 1 is $(1, 0, 0)$ and clause 2 is $(0, 0, 1)$, both split. The cut is 3 variable edges + 2 + 2 = **7 = k**. ✓
- $x_1 = x_2 = x_3 = 1$: triangle 1 lies entirely on one side and scores 0, so the cut is only $3 + 0 + 2 = 5 < 7$.

![NAE to Max-Cut example](fig/aad-nae-maxcut.svg)

*Figure. The tutorial example. Blue vertices are the true literals for $x = (1, 0, 0)$. All three vertical edges $x_i - \neg x_i$ are cut, and each clause triangle has exactly 2 cut edges, so the cut reaches $k = 7$.*

# Learn: the other classic reductions (practice sheet)

These are the remaining branches of the tutorial's map. The tutorial did Independent Set, Vertex Cover and Clique as warm-ups. The rest are the standard textbook proofs (KT 8, DPV 8) for the practice sheet.

## Independent Set ≤P Vertex Cover (tutorial warm-up)

> **In short:** What is left over after an independent set is a vertex cover, and the other way round.

**Observation:** $S$ is independent $\iff$ $V \setminus S$ is a vertex cover. For each edge, "not both ends in $S$" means the same as "at least one end in $V\setminus S$". So map $(G, k) \mapsto (G, n - k)$: an independent set of size $\ge k$ exists iff a vertex cover of size $\le n - k$ exists. Both directions are this one line, but write both.

## Independent Set ≤P Clique (tutorial warm-up)

> **In short:** Flip every edge to a non-edge: independent sets become cliques.

$S$ is independent in $G$ $\iff$ $S$ is a clique in the **complement** $\bar G$ (same vertices, edges exactly where $G$ has none). Map $(G, k)\mapsto (\bar G, k)$ in $O(n^2)$.

Every reduction proof has the same four parts: (1) construction, (2) $\Rightarrow$, (3) $\Leftarrow$, (4) polynomial time.

## 3-SAT ≤P Independent Set

> **In short:** Pick one true literal per clause; the conflict edges stop you from picking both $x$ and $\neg x$.

**IS:** given $G$ and $k$, are there $k$ vertices with no edge between any two of them?

**IS ∈ NP:** the certificate is the set $S$. Check $\lvert S\rvert \ge k$ and that no edge lies inside $S$: $O(n + m)$.

**Construction.** Take a formula $\varphi$ with clauses $C_1..C_m$. For each clause make a **triangle** of 3 vertices, one for each of its literals. Add an edge between every two vertices whose literals are **opposites** ($x_i$ and $\neg x_i$). Set $k = m$.

![3-SAT to Independent Set](fig/aad-sat-to-is.svg)

*Figure. One triangle per clause, and a red edge between opposite literals. A satisfying assignment ($x_1 = 1$, $x_3 = 1$) picks one true literal per triangle, and those vertices are independent.*

**($\Rightarrow$)** Take a satisfying assignment and, in each clause, pick the vertex of one true literal. That gives $m$ vertices, one per triangle, so no triangle edge is inside the set. No two are opposites, since $x_i$ and $\neg x_i$ can't both be true. So the set is independent.

**($\Leftarrow$)** An independent set of size $m$ has exactly one vertex in each triangle, since two in the same triangle would be adjacent. Set those literals to true. This is consistent, because opposite literals are joined by an edge and so were never both chosen. Variables not set this way can be anything. Every clause now has a true literal.

**Size:** $3m$ vertices and $O(m^2)$ edges, which is polynomial.

## Vertex Cover ≤P Set Cover

> **In short:** Each vertex is the set of edges it touches.

Let the universe be $U = E$. For each vertex $v$, make the set $S_v$ of edges touching $v$, and keep the same $k$. Then $k$ vertices cover every edge iff the matching $k$ sets cover $U$.

## 3-SAT ≤P 3-Colouring

> **In short:** Two colours stand for true and false; gadgets force every clause to contain a true literal.

**Construction.**
- A triangle **T, F, B** (true, false, base). Its three colours name the palette.
- For each variable $x_i$, vertices $x_i$ and $\neg x_i$, joined to each other and to B. So one is coloured T and the other F.
- For each clause $(a \vee b \vee c)$, an **OR-gadget**: a 6-vertex graph whose output can be coloured T iff at least one input is T. The output is joined to F and B, which forces it to be T.

**($\Rightarrow$)** Colour the literals by the assignment. Every clause has a true input, so each gadget can be finished with output T.

**($\Leftarrow$)** In any 3-colouring, call T's colour "true". Each variable pair gets T and F (both avoid B, and they differ). Each gadget output is forced to T, which is only possible if some input literal is T. So the assignment satisfies every clause.

**Size:** $O(n + m)$.

The gadget's inner details are rarely asked. The structure (palette triangle, variable pairs, forced clause outputs) and the two directions are what earn marks.

## 3-SAT ≤P Subset Sum (sketch)

> **In short:** Write numbers with one digit per variable and per clause so that hitting the target means a consistent assignment satisfying every clause.

Write numbers in base 10 with one digit position for each variable and one for each clause.
- **Variable numbers:** for each variable, two numbers ($x_i$ true, $x_i$ false). Each has a 1 in the variable's digit and a 1 in the digit of every clause that literal satisfies.
- **Slack numbers:** two per clause, with 1 and 2 in that clause's digit.
- **Target:** 1 in every variable digit and 4 in every clause digit.

The variable digit forces you to pick exactly one number from each variable pair. A clause digit can only reach 4 with the slack numbers if at least one literal adds to it. No carries happen, since each digit adds to at most 5 < 10. The numbers have $n + m$ digits, which is polynomial in the input length. Subset Sum does have an $O(nT)$ DP, but that is only **pseudo-polynomial** (it depends on the value $T$), so there is no contradiction.

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

