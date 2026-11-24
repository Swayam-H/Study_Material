# Learn: stable matchings

The stable matching problem is the course's first example where the hard part is the **proof**, not the algorithm. The midsem gave it 6 of 30 marks: 3 for running Gale–Shapley both ways on an $8 \times 8$ instance, 3 for proving uniqueness when both versions agree. Sources: Lectures 6 and 7, KT ch. 1, Assignment 1 Q3.

## The problem

There are $n$ men and $n$ women. Each person ranks all members of the other side. A **perfect matching** pairs everyone. A pair $(m, w)$ **not** matched to each other is a **blocking pair** (rogue couple, instability) if $m$ prefers $w$ to his partner **and** $w$ prefers $m$ to her partner. A perfect matching is **stable** if it has no blocking pair.

## The Gale–Shapley algorithm (proposer version)

The lecture uses women proposing; the algorithm is symmetric. Written with men proposing:

```
all people free
while some man m is free and has not proposed to every woman:
    w ← highest-ranked woman m has not yet proposed to
    if w is free: engage (m, w)
    else if w prefers m to her current partner m':
        engage (m, w); m' becomes free
    else: w rejects m
return the engaged pairs
```

The lecture's round-based version is the same thing: in each round every free proposer proposes to the best person not yet crossed off; each receiver keeps the best offer so far (including her tentative partner) and rejects the rest; rejected proposers cross that person off.

Two monotonicity facts drive every proof:

- **Receivers only trade up.** Once $w$ is engaged she stays engaged, and each change of partner is to someone she prefers.
- **Proposers only go down.** $m$ proposes in his preference order, so his partners get worse over time.

## Theorem 1: termination in at most $n^2$ proposals

Each proposal is from a man to a woman he has never proposed to. There are $n^2$ (man, woman) pairs, so at most $n^2$ proposals. With an array `next[m]` and a ranking table `rank[w][m]` (built in $O(n^2)$), each proposal is $O(1)$, so the algorithm runs in $O(n^2)$ time, which is linear in the input size (the preference lists have $2n^2$ entries).

## Theorem 2: everyone is matched

Suppose the loop ends with a man $m$ free. He stops only after proposing to all $n$ women. Each woman who received a proposal is engaged from then on. So all $n$ women are engaged, to $n$ different men, but there are only $n$ men and $m$ is not one of them: contradiction. (This is the Assignment 1 Q3 requirement: the algorithm cannot stop with an unmatched man while a woman is available.)

## Theorem 3: the output is stable

Suppose $(m, w)$ is a blocking pair in the output $S$: $m$ prefers $w$ to his partner $w'$ and $w$ prefers $m$ to her partner $m'$.

- **Case 1: $m$ never proposed to $w$.** He proposes in order, and he ended with $w'$, so he proposed to $w$ before $w'$ only if he ranks $w$ higher. He ranks $w$ higher, so he did propose to $w$. Contradiction.
- **Case 2: $m$ proposed to $w$.** She rejected him at some point (then or later), for someone she prefers. Since receivers only trade up, her final partner $m'$ is someone she prefers to $m$. Contradiction.

## Theorem 4: proposer-optimal, receiver-pessimal

Call $w$ a **valid partner** of $m$ if some stable matching pairs them. Let best$(m)$ be his highest-ranked valid partner.

**Proposer-optimal.** Men-proposing GS matches every man to best$(m)$.

*Proof.* Suppose not, and consider the **first** moment in the run when some man $m$ is rejected by a valid partner $w$. She rejects him for $m'$, whom she prefers. Since this is the first rejection by a valid partner, $m'$ has not yet been rejected by any valid partner, and he proposes in order, so $m'$ ranks $w$ at least as high as all his valid partners. Take a stable matching $S'$ with $(m, w) \in S'$, and let $w''$ be $m'$'s partner in $S'$ (a valid partner of $m'$, so $m'$ prefers $w$ to $w''$, as $w \ne w''$). Then in $S'$: $w$ prefers $m'$ to $m$, and $m'$ prefers $w$ to $w''$. $(m', w)$ blocks $S'$: contradiction.

**Receiver-pessimal.** In the men-proposing output $S^*$ every woman gets her **worst** valid partner.

*Proof.* Suppose $(m, w) \in S^*$ but some stable $S'$ gives $w$ a partner $m'$ she ranks **below** $m$. In $S'$, $m$ has some partner $w' \ne w$. Since $w$ is best$(m)$, $m$ prefers $w$ to $w'$. Then $(m, w)$ blocks $S'$: contradiction.

In particular, **the output does not depend on the order** in which free men propose.

$$\boxed{S_W \le_m S' \le_m S_M \text{ for every stable } S'}$$
(each man likes his $S_M$ partner best and his $S_W$ partner least among valid partners).

## Uniqueness when both versions agree (Midsem Q2.2)

**Claim.** If men-proposing and women-proposing GS give the same matching $S$, then $S$ is the only stable matching.

*Proof.* Let $S'$ be any stable matching and suppose $S' \ne S$. Then some man $m$ has a different partner in $S'$; let $w$ be his partner in $S$. Because $S = S_M$ is man-optimal, $m$ prefers $w$ to his $S'$ partner. Because $S = S_W$ is woman-optimal, $w$ prefers $m$ to her $S'$ partner (she has a different partner in $S'$, since $m$ does). So $(m, w)$ blocks $S'$, contradicting stability of $S'$. Hence $S' = S$.

The rubric gives full marks for this contradiction or for the **range** argument ($S_W \le_m S' \le_m S_M$ with $S_W = S_M$ forces $S' = S$), and at most 1.5 of 3 for a plain-English version.

# Learn: Hall's theorem

Hall's theorem says exactly when a bipartite graph has a matching that covers one side. It is the tool behind Quiz I Q1 (domino tiling), Midsem Q4 (SDRs and Latin squares) and Quiz II Q2 (proved via max-flow min-cut). Sources: Lectures 7 and 10, MIT matching notes.

## Statement

For a bipartite graph $G = (L \cup R, E)$ and $S \subseteq L$, let $N(S) \subseteq R$ be the set of vertices adjacent to some vertex of $S$.

$$\boxed{G \text{ has a matching covering } L \iff \lvert N(S)\rvert \ge \lvert S\rvert \text{ for every } S \subseteq L}$$

When $\lvert L\rvert = \lvert R\rvert$ a matching covering $L$ is a **perfect matching**.

## Proof

**($\Rightarrow$), easy.** If $M$ covers $L$, the vertices of $S$ are matched to $\lvert S\rvert$ **distinct** vertices, all in $N(S)$.

**($\Leftarrow$), by strong induction on $\lvert L\rvert$** (the lecture's two cases). $\lvert L\rvert = 1$ is clear. Assume Hall's condition.

- **Case 1: strict slack.** $\lvert N(S)\rvert \ge \lvert S\rvert + 1$ for every nonempty $S \subsetneq L$. Pick any edge $(u, v)$, match it, and delete $u$ and $v$. In the remaining graph each nonempty $S \subseteq L - u$ lost at most one neighbour ($v$), so $\lvert N'(S)\rvert \ge \lvert S\rvert$. By induction the rest of $L$ can be matched.
- **Case 2: a tight set.** Some nonempty $T \subsetneq L$ has $\lvert N(T)\rvert = \lvert T\rvert$. The graph on $T \cup N(T)$ satisfies Hall's condition (neighbourhoods inside it are unchanged), so by induction $T$ can be matched into $N(T)$, using all of $N(T)$. For the rest, $G' = (L \setminus T) \cup (R \setminus N(T))$. For $S \subseteq L \setminus T$: $\lvert N(S \cup T)\rvert \ge \lvert S\rvert + \lvert T\rvert$, and $N(S \cup T) = N'(S) \cup N(T)$ (disjoint), so $\lvert N'(S)\rvert \ge \lvert S\rvert$. By induction $L \setminus T$ is matched in $G'$. Combine.

**Proof by max-flow min-cut** (Quiz II Q2.3) is in the max-flow chapter.

## How to use Hall in an exam

1. **Build the bipartite graph** and say what a perfect matching means in the problem (rubric: 0.5–1 mark).
2. **State Hall's theorem** (1 mark).
3. **Verify $\lvert N(S)\rvert \ge \lvert S\rvert$ for an arbitrary $S$**, usually by **double counting edges** between $S$ and $N(S)$ (1 mark).

To prove **no** perfect matching exists, exhibit one set $S$ with $\lvert N(S)\rvert < \lvert S\rvert$ (Quiz I Q1).

## Regular bipartite graphs (Lecture 10 exercises)

**Every $d$-regular bipartite graph ($d \ge 1$) has a perfect matching.** Count edges leaving $S \subseteq L$: exactly $d\lvert S\rvert$. They all land in $N(S)$, which receives at most $d\lvert N(S)\rvert$ edges in total. So $d\lvert S\rvert \le d\lvert N(S)\rvert$. (Also $\lvert L\rvert = \lvert R\rvert$ because $d\lvert L\rvert = \lvert E\rvert = d\lvert R\rvert$.)

**Every $d$-regular bipartite graph is a union of $d$ disjoint perfect matchings.** Take a perfect matching $M$ and remove it; every vertex loses exactly one edge, so the rest is $(d-1)$-regular bipartite. Induct down to $d = 0$.

## Systems of distinct representatives (Midsem Q4.1)

Sets $S_1, \ldots, S_m$ have an **SDR** if there are distinct $s_i \in S_i$. Build $L = \{S_1, \ldots, S_m\}$, $R$ = the elements, edges for membership; an SDR is a matching covering $L$. Hall's condition becomes: **every $k$ of the sets together contain at least $k$ elements.**

If each set has $r$ elements, each element of $\{1..n\}$ is in exactly $d$ sets, and $m \le n$: counting incidences, $md = nr$, so $\frac{r}{d} = \frac{n}{m} \ge 1$. For $k$ sets $I$: $kr$ incidences, each element of $N(I)$ absorbs at most $d$, so $\lvert N(I)\rvert \ge kr/d \ge k$. Full solution in the midsem page.

## Latin rectangles extend to Latin squares (Midsem Q4.2)

An $r \times n$ Latin rectangle ($r < n$) can always get one more row: column $j$ is missing a set $S_j$ of $n - r$ numbers, and each number is missing from exactly $n - r$ columns. That is a $(n-r)$-regular bipartite graph (columns vs numbers), which has a perfect matching: the new row. Repeat until $r = n$.

## Doubly stochastic integer matrices (Lecture 15 problem, "magic squares")

An $n \times n$ non-negative integer matrix with every row and column sum $d$ is a sum of $d$ permutation matrices. Make the bipartite multigraph rows vs columns with $M_{ij}$ parallel edges between row $i$ and column $j$. It is $d$-regular, so it has a perfect matching, i.e. a permutation matrix $P \le M$ entrywise; $M - P$ has line sums $d - 1$; induct. (Full solution in the practice page.)

## Domino tilings (Quiz I Q1)

Colour the grid like a chessboard. Every domino covers one black and one white square, so a tiling is exactly a **perfect matching** in the bipartite graph (black squares vs white squares, edges between side-adjacent squares). A first check: equal numbers of black and white squares are necessary but **not** sufficient. When they are equal, find a set $S$ of black squares with fewer white neighbours. Worked solution in the quizzes page.

# Learn: maximum matchings

When no perfect matching exists we still want the largest matching. The algorithm grows a matching one **augmenting path** at a time. Sources: Lectures 8 and 9, Tutorial 3 (Maximum Matching), Cornell CS6820 notes §1.

## Definitions

A **matching** $M$: no two edges share a vertex. **Maximal**: no edge can be added. **Maximum**: largest possible size. Every maximum matching is maximal, not vice versa (a path $a - b - c - d$ with $M = \{bc\}$ is maximal, size 1, but $\{ab, cd\}$ has size 2). A maximal matching has at least half the size of a maximum one (each edge of a maximum matching touches a vertex of the maximal one, and each such vertex is in at most one).

Relative to $M$: a vertex is **matched** or **free**. An **alternating path** alternates between edges not in $M$ and in $M$. An **augmenting path** is an alternating path whose two endpoints are both free.

## Lemma 1 (flip)

If $P$ is $M$-augmenting then $M \oplus P$ (symmetric difference) is a matching of size $\lvert M\rvert + 1$.

*Proof.* $P$ has odd length $2k+1$: $k+1$ edges outside $M$ and $k$ inside. Flipping swaps them, so the size goes up by one. Matching property, vertex by vertex: off $P$ nothing changes; an interior vertex trades its one $M$ edge for one other $P$ edge; an endpoint was free and gains exactly one edge.

## Berge's lemma

$$\boxed{M \text{ is maximum} \iff \text{there is no } M\text{-augmenting path}}$$

($\Rightarrow$) By Lemma 1.
($\Leftarrow$) Suppose $\lvert M^*\rvert > \lvert M\rvert$. In $M \oplus M^*$ each vertex has degree $\le 2$ (at most one edge from each matching), so its components are paths and cycles, and their edges alternate between $M$ and $M^*$. Cycles alternate, hence are even, with equal numbers of each. Since $M^*$ has more edges overall, some component has more $M^*$ edges than $M$ edges: a path that starts and ends with an $M^*$ edge. Its endpoints are $M$-free (an endpoint meeting an $M$ edge $e$ would either have $e$ in the symmetric difference, making it interior, or $e \in M \cap M^*$, giving it two $M^*$ edges). So it is an $M$-augmenting path.

## Finding augmenting paths: Kuhn's algorithm

Orient unmatched edges $L \to R$ and matched edges $R \to L$. An augmenting path is then a directed path from a free left vertex to a free right vertex, so DFS finds one.

```
try_kuhn(u):                       // u ∈ L
    for v in adj[u]:
        if used[v]: continue
        used[v] ← true
        if match[v] = none or try_kuhn(match[v]):
            match[v] ← u; return true      // flip on the way back
    return false

for u in L: used ← all false; if try_kuhn(u): size++
```

Each search is $O(m)$ and there are $n$ searches: **$O(nm)$**. Correct by Lemma 1 and Berge (a vertex that fails once can be skipped forever, because adding augmenting paths never creates a new one starting at it). Hopcroft–Karp improves this to $O(m\sqrt n)$ by augmenting along many shortest paths at once.

The same answer comes from max flow on $s \to L \to R \to t$ with unit capacities; Ford–Fulkerson on that network does exactly Kuhn's search, since residual back edges are the matched edges reversed.

## König's theorem

$$\boxed{\text{in a bipartite graph, max matching size} = \text{min vertex cover size}}$$

A **vertex cover** is a set $C$ touching every edge.

*Easy direction* ($\le$): each edge of a matching needs its own cover vertex (the edges are disjoint), so $\lvert M\rvert \le \lvert C\rvert$ for every matching and cover.

*Hard direction* (Lecture 8 exercise). Let $M$ be maximum. Let $Z$ = the vertices reachable from free vertices of $L$ by alternating paths (unmatched edge $L \to R$, matched edge $R \to L$). Set
$$C = (L \setminus Z) \cup (R \cap Z).$$
- **$C$ is a cover.** Take an edge $(u, v)$, $u \in L$. If $u \notin Z$, $u \in C$. If $u \in Z$: if $(u, v) \notin M$, the alternating path extends to $v$, so $v \in Z \cap R \subseteq C$; if $(u, v) \in M$, $u$ is matched, so it is not a free start, and the only way to reach it is via its partner $v$, so $v \in Z$.
- **$\lvert C\rvert = \lvert M\rvert$.** Every $v \in R \cap Z$ is matched (else we would have an augmenting path, contradicting maximality), and its partner is in $Z$. Every $u \in L \setminus Z$ is matched (free left vertices are in $Z$), and its partner is not in $Z$ (if the partner $v$ were in $Z$, $u$ would be too). So each matching edge contributes exactly one endpoint to $C$, and each vertex of $C$ is an endpoint of a matching edge.

The flow proof: min vertex cover corresponds to a min cut in the unit network with $\infty$ middle edges (practice page).

## Practice

**MA1 (KT 1.x).** Is it true that in every instance some stable matching contains a pair $(m, w)$ where $m$ is $w$'s first choice and $w$ is $m$'s first choice?

*Solution.* False. Two men, two women: $m_1: w_1 > w_2$, $m_2: w_2 > w_1$, $w_1: m_2 > m_1$, $w_2: m_1 > m_2$. Nobody is the first choice of their own first choice. (The stable matchings here are $\{m_1w_1, m_2w_2\}$ and $\{m_1w_2, m_2w_1\}$.) The true statement is the converse: if $m$ and $w$ rank each other first, every stable matching pairs them (else they block).

**MA2.** Show that men-proposing GS can need $\Omega(n^2)$ proposals.

*Solution.* Let every man have the same list $w_1 > w_2 > \cdots > w_n$ and every woman the same list $m_1 > \cdots > m_n$. The only stable matching is $\{m_iw_i\}$ ($m_1$ and $w_1$ rank each other first, so they must be matched; remove them and repeat). So man $m_i$ ends with $w_i$, and since he proposes in order he proposed to $w_1, \ldots, w_i$: $i$ proposals. The total is $1 + 2 + \cdots + n = n(n+1)/2 = \Omega(n^2)$, whatever order the free men are processed in.

**MA3.** Give a bipartite graph with $\lvert L\rvert = \lvert R\rvert = 3$ and no perfect matching, and the Hall violator.

*Solution.* $L = \{a, b, c\}$, $R = \{x, y, z\}$, edges $ax, bx, cx, cy, cz$. $S = \{a, b\}$ has $N(S) = \{x\}$, so $\lvert N(S)\rvert = 1 < 2$.

**MA4.** Run Kuhn's algorithm on $L = \{1, 2, 3\}$, $R = \{a, b, c\}$, edges $1a, 1b, 2a, 3b, 3c$ (adjacency in that order).

*Solution.* $u = 1$: $a$ free, match $1a$. $u = 2$: $a$ is matched to 1, try_kuhn(1): $a$ used, $b$ free, so match $1b$ and then $2a$. $u = 3$: $b$ is matched to 1, try_kuhn(1): $a$ matched to 2, try_kuhn(2): no unused neighbours, fail; back in 1, $b$ is used; fail. Then $c$ free: match $3c$. Final $\{1b, 2a, 3c\}$, size 3, perfect.
