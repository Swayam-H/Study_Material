# Learn: stable matchings

Stable matching is the course's first topic where the hard part is the **proof**, not the algorithm. The midsem gave it 6 of 30 marks: 3 for running Gale–Shapley both ways on an $8 \times 8$ instance, and 3 for proving the matching is unique when both versions agree. Sources: Lectures 6 and 7, KT ch. 1, Assignment 1 Q3.

## The problem

> **In short:** Pair everyone so that no two people would both rather be with each other than with their assigned partners.

There are $n$ men and $n$ women, and each person ranks everyone on the other side. A **perfect matching** pairs everyone up. A man and woman $(m, w)$ who are **not** paired together form a **blocking pair** (also called a rogue couple or instability) if **both** would rather be together: $m$ prefers $w$ to his partner, **and** $w$ prefers $m$ to hers. A perfect matching is **stable** if it has no blocking pair.

## The Gale–Shapley algorithm (proposer version)

> **In short:** Proposers go down their lists; receivers keep the best offer so far and trade up when a better one arrives.

The lecture has the women proposing, but the algorithm works the same either way. With men proposing:

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

The lecture's version in rounds is the same algorithm. In each round, every free proposer proposes to the best person left on his list. Each receiver keeps the best offer she has (counting her current partner) and rejects the others. A rejected proposer crosses that person off his list.

Every proof below uses two simple facts:

- **Receivers only trade up.** Once $w$ is engaged she stays engaged, and every change of partner is to someone she likes more.
- **Proposers only go down.** $m$ proposes in order of preference, so his partners only get worse over time.

## Theorem 1: termination in at most $n^2$ proposals

> **In short:** Nobody proposes to the same person twice, and there are only $n^2$ pairs.

Each proposal goes from a man to a woman he has never proposed to before. There are only $n^2$ (man, woman) pairs, so there are at most $n^2$ proposals.

For the running time, keep an array `next[m]` (the next woman on $m$'s list) and a table `rank[w][m]` (built in $O(n^2)$). Then each proposal takes $O(1)$, and the whole algorithm runs in $O(n^2)$. That is linear in the input size, since the preference lists have $2n^2$ entries.

## Theorem 2: everyone is matched

> **In short:** A receiver who has been proposed to stays engaged forever, so a man left over would mean every woman is engaged to someone else, which is too many men.

Suppose the loop ends with some man $m$ still free. He only stops after proposing to all $n$ women. A woman who has received a proposal stays engaged from then on, so all $n$ women are engaged, to $n$ different men. But there are only $n$ men, and $m$ is not one of them. Contradiction. (This is what Assignment 1 Q3 asks: the algorithm cannot stop with a single man while a woman is still available.)

## Theorem 3: the output is stable

> **In short:** If $m$ liked $w$ more, he proposed to her earlier; she then only traded up, so she cannot prefer $m$ to her final partner.

Suppose $(m, w)$ blocks the output $S$: $m$ prefers $w$ to his partner $w'$, and $w$ prefers $m$ to her partner $m'$.

- **Case 1: $m$ never proposed to $w$.** He proposes in order of preference and ended up with $w'$. Since he ranks $w$ above $w'$, he must have proposed to $w$ before reaching $w'$. Contradiction.
- **Case 2: $m$ proposed to $w$.** At some point (then or later) she dropped him for someone she liked more. Receivers only trade up, so her final partner $m'$ is someone she prefers to $m$. Contradiction.

## Theorem 4: proposer-optimal, receiver-pessimal

> **In short:** Proposers are never rejected by a partner they could have in some stable matching, so each ends with the best one possible. Receivers get the worst.

Call $w$ a **valid partner** of $m$ if at least one stable matching pairs them. Let best$(m)$ be the valid partner $m$ likes most.

**Proposer-optimal.** Men-proposing GS gives every man best$(m)$.

*Proof.* We show that no man is ever rejected by a valid partner. Since he proposes in order, he then ends with his best valid partner.

1. Suppose some man is rejected by a valid partner, and look at the **first** time this happens: $m$ is rejected by $w$ because she prefers some $m'$.
2. Since this is the first such rejection, $m'$ has not been rejected by any valid partner yet. He proposes in order, so he likes $w$ at least as much as every one of his valid partners.
3. $w$ is valid for $m$, so some stable matching $S'$ contains $(m, w)$. In $S'$, $m'$ has some partner $w''$. That is a valid partner of $m'$ and $w'' \ne w$, so by step 2, $m'$ prefers $w$ to $w''$.
4. Now look at $S'$: $w$ prefers $m'$ to $m$ (step 1), and $m'$ prefers $w$ to $w''$ (step 3). So $(m', w)$ blocks $S'$, which contradicts its stability.

**Receiver-pessimal.** In the men-proposing output $S^*$, every woman gets her **worst** valid partner.

*Proof.* Suppose $(m, w) \in S^*$, but some stable matching $S'$ gives $w$ a partner $m'$ she ranks **below** $m$. In $S'$, $m$ has some other partner $w' \ne w$. By proposer-optimality $w = $ best$(m)$, so $m$ prefers $w$ to $w'$. Then $m$ and $w$ both prefer each other to their partners in $S'$, so $(m, w)$ blocks $S'$. Contradiction.

In particular, **the output does not depend on the order** in which free men propose.

$$\boxed{S_W \le_m S' \le_m S_M \text{ for every stable } S'}$$
Each man likes his partner in $S_M$ (men proposing) best and his partner in $S_W$ (women proposing) least among all his valid partners.

## Uniqueness when both versions agree (Midsem Q2.2)

> **In short:** Men-proposing is best for men and women-proposing is best for women. If they agree, no other stable matching fits in between.

**Claim.** If men-proposing and women-proposing GS give the same matching $S$, then $S$ is the only stable matching.

*Proof.* Let $S'$ be any stable matching, and suppose $S' \ne S$. Then some man $m$ has a different partner in $S'$. Let $w$ be his partner in $S$.
- $S = S_M$ is best for men, so $m$ prefers $w$ to his partner in $S'$.
- $S = S_W$ is best for women, so $w$ prefers $m$ to her partner in $S'$. (Her partner in $S'$ is not $m$, since $m$'s partner changed.)

So $(m, w)$ blocks $S'$, contradicting its stability. Hence $S' = S$.

The rubric gives full marks for this contradiction, or for the **range** argument ($S_W \le_m S' \le_m S_M$ and $S_W = S_M$ force $S' = S$). A plain-English version without the argument gets at most 1.5 of 3.

# Learn: Hall's theorem

Hall's theorem says exactly when a bipartite graph has a matching that covers one whole side. It is the tool behind Quiz I Q1 (domino tiling), Midsem Q4 (SDRs and Latin squares) and Quiz II Q2 (proved there with max-flow min-cut). Sources: Lectures 7 and 10, MIT matching notes.

## Statement

> **In short:** One side can be fully matched exactly when every group on that side has at least as many neighbours as members.

Take a bipartite graph $G = (L \cup R, E)$. For a set $S \subseteq L$, let $N(S) \subseteq R$ be its **neighbourhood**: all vertices joined to at least one vertex of $S$.

$$\boxed{G \text{ has a matching covering } L \iff \lvert N(S)\rvert \ge \lvert S\rvert \text{ for every } S \subseteq L}$$

When $\lvert L\rvert = \lvert R\rvert$, a matching covering $L$ is a **perfect matching**.

## Proof

> **In short:** Necessity is counting. For sufficiency, either every group has spare neighbours (match one edge and recurse), or some group is exactly tight (solve it and the rest separately).

**($\Rightarrow$), the easy direction.** If a matching $M$ covers $L$, then the vertices of $S$ are matched to $\lvert S\rvert$ **different** vertices, and they all lie in $N(S)$.

**($\Leftarrow$), by strong induction on $\lvert L\rvert$** (the lecture's two cases). $\lvert L\rvert = 1$ is clear. Assume Hall's condition holds. Either every proper subset has a spare neighbour, or some subset has none.

- **Case 1: every set has slack.** $\lvert N(S)\rvert \ge \lvert S\rvert + 1$ for every nonempty $S \subsetneq L$. Match any edge $(u, v)$ and delete both $u$ and $v$. Each nonempty $S \subseteq L - u$ loses at most one neighbour ($v$), so it still has $\lvert N'(S)\rvert \ge \lvert S\rvert$. By induction the rest of $L$ can be matched.
- **Case 2: some set is tight.** Some nonempty $T \subsetneq L$ has $\lvert N(T)\rvert = \lvert T\rvert$. Split the problem into two smaller ones.
  - *Inside:* the graph on $T \cup N(T)$ still satisfies Hall's condition (the neighbourhoods of subsets of $T$ are unchanged). By induction, $T$ can be matched into $N(T)$, and this uses up all of $N(T)$.
  - *Outside:* let $G'$ be the graph on $(L \setminus T) \cup (R \setminus N(T))$, with neighbourhoods $N'$. For $S \subseteq L \setminus T$, Hall's condition in $G$ gives $\lvert N(S \cup T)\rvert \ge \lvert S\rvert + \lvert T\rvert$. Also $N(S \cup T)$ splits into the disjoint parts $N'(S)$ and $N(T)$. Subtracting $\lvert N(T)\rvert = \lvert T\rvert$ leaves $\lvert N'(S)\rvert \ge \lvert S\rvert$. By induction $L \setminus T$ can be matched in $G'$.
  - Put the two matchings together.

![Splitting at a tight set](fig/aad-hall-tight.svg)

*Figure. Case 2 of the proof. The tight set $T$ is matched onto all of $N(T)$ by induction. What is left, $L \setminus T$ against $R \setminus N(T)$, still satisfies Hall, so it is matched by induction too.*

**The proof by max-flow min-cut** (Quiz II Q2.3) is in the max-flow chapter.

## How to use Hall in an exam

> **In short:** Build the graph, say what a matching means, check the neighbour condition by counting, and state Hall's theorem when you use it.

1. **Build the bipartite graph** and say what a perfect matching means in the problem (rubric: 0.5–1 mark).
2. **State Hall's theorem** (1 mark).
3. **Check $\lvert N(S)\rvert \ge \lvert S\rvert$ for an arbitrary $S$**, usually by **counting the edges** between $S$ and $N(S)$ in two ways (1 mark).

To prove that **no** perfect matching exists, show one set $S$ with $\lvert N(S)\rvert < \lvert S\rvert$ (Quiz I Q1).

![A Hall violation](fig/aad-hall-violation.svg)

*Figure. Here $S = \{a_1, a_2, a_3\}$ has only two neighbours, $b_1$ and $b_2$. Three vertices cannot be matched into two, so no matching covers $L$, even though $a_4$ is fine.*

## Regular bipartite graphs (Lecture 10 exercises)

> **In short:** When every vertex has the same degree, counting edges proves Hall's condition at once.

**Every $d$-regular bipartite graph ($d \ge 1$) has a perfect matching.** Exactly $d\lvert S\rvert$ edges leave $S \subseteq L$. They all land in $N(S)$, and $N(S)$ can receive at most $d\lvert N(S)\rvert$ edges in total. So $d\lvert S\rvert \le d\lvert N(S)\rvert$. (Also $\lvert L\rvert = \lvert R\rvert$, since $d\lvert L\rvert = \lvert E\rvert = d\lvert R\rvert$.)

**Every $d$-regular bipartite graph splits into $d$ disjoint perfect matchings.** Take a perfect matching and remove it. Every vertex loses exactly one edge, so what is left is $(d-1)$-regular bipartite. Repeat down to $d = 0$.

## Systems of distinct representatives (Midsem Q4.1)

> **In short:** Choosing one different element from each set is a matching between sets and elements.

Sets $S_1, \ldots, S_m$ have an **SDR** if we can pick a different element $s_i \in S_i$ from each set. Let $L = \{S_1, \ldots, S_m\}$, let $R$ be the elements, and join a set to each of its elements. An SDR is a matching that covers $L$. Hall's condition becomes: **any $k$ of the sets together contain at least $k$ elements.**

Suppose each set has $r$ elements, each element of $\{1..n\}$ is in exactly $d$ sets, and $m \le n$. Counting (set, element) incidences two ways gives $md = nr$, so $\frac{r}{d} = \frac{n}{m} \ge 1$. A group $I$ of $k$ sets has $kr$ incidences, and each element of $N(I)$ can absorb at most $d$ of them, so $\lvert N(I)\rvert \ge kr/d \ge k$. The full solution is on the midsem page.

## Latin rectangles extend to Latin squares (Midsem Q4.2)

> **In short:** The missing numbers per column form a regular bipartite graph, so a perfect matching (the next row) exists.

An $r \times n$ Latin rectangle with $r < n$ can always get one more row. Column $j$ is missing a set $S_j$ of $n - r$ numbers, and each number is missing from exactly $n - r$ columns. So "column $j$ is missing number $k$" defines an $(n-r)$-regular bipartite graph between columns and numbers. It has a perfect matching, and that matching is the new row. Repeat until $r = n$.

## Doubly stochastic integer matrices (Lecture 15 problem, "magic squares")

> **In short:** Equal row and column sums make a regular bipartite multigraph; peel off one perfect matching at a time.

Claim: an $n \times n$ matrix of non-negative integers whose rows and columns all sum to $d$ is a sum of $d$ permutation matrices. Build a bipartite multigraph of rows vs columns, with $M_{ij}$ parallel edges between row $i$ and column $j$. It is $d$-regular, so it has a perfect matching. That matching is a permutation matrix $P$ with $P \le M$ entry by entry. Then $M - P$ has all line sums $d - 1$, so repeat. (Full solution on the practice page.)

## Domino tilings (Quiz I Q1)

> **In short:** Each domino covers one black and one white square, so a tiling is a perfect matching between the colours.

Colour the grid like a chessboard. Every domino covers one black and one white square. So a tiling is exactly a **perfect matching** in the bipartite graph of black squares vs white squares, with edges between squares that share a side. Having equal numbers of black and white squares is necessary but **not** enough. When the numbers are equal, look for a set $S$ of black squares with fewer white neighbours. The worked solution is on the quizzes page.

![Mutilated 4 by 4 board](fig/aad-domino.svg)

*Figure. Removing two opposite corners removes two squares of the same colour, leaving 6 dark and 8 light. The 8 light squares have only 6 dark neighbours in total, so Hall fails and there is no tiling.*

# Learn: maximum matchings

When there is no perfect matching we still want the largest matching possible. The algorithm grows the matching by one edge at a time, using **augmenting paths**. Sources: Lectures 8 and 9, Tutorial 3 (Maximum Matching), Cornell CS6820 notes §1.

## Definitions

> **In short:** Maximal means you cannot add an edge; maximum means no matching is bigger. They are different.

- A **matching** $M$ is a set of edges in which no two share a vertex.
- **Maximal** means no edge can be added to it.
- **Maximum** means no matching is larger.

Every maximum matching is maximal, but not the other way round. On the path $a - b - c - d$, $M = \{bc\}$ is maximal with size 1, but $\{ab, cd\}$ has size 2. Still, a maximal matching is at least half the size of a maximum one. Each edge of a maximum matching touches a vertex of the maximal one, and each such vertex can be touched by only one of them.

Given $M$, a vertex is **matched** if some edge of $M$ touches it, and **free** otherwise. An **alternating path** uses edges outside $M$ and inside $M$ in turn. An **augmenting path** is an alternating path that starts and ends at free vertices.

## Lemma 1 (flip)

> **In short:** Swapping the edges along an augmenting path gains exactly one edge.

If $P$ is an augmenting path for $M$, then $M \oplus P$ (the symmetric difference: edges in exactly one of $M$, $P$) is a matching of size $\lvert M\rvert + 1$.

*Proof.* $P$ has odd length $2k+1$: $k+1$ edges outside $M$ and $k$ inside. Flipping swaps them, so the size goes up by one. It is still a matching; check vertex by vertex:
- a vertex not on $P$ is unchanged;
- a vertex inside $P$ swaps its one $M$ edge for the other $P$ edge at it;
- an endpoint of $P$ was free and gains exactly one edge.

![Flipping an augmenting path](fig/aad-augment-flip.svg)

*Figure. On the path $a - b - c - d$, the matching $\{bc\}$ is maximal but not maximum. The path is augmenting (both ends free), and flipping it gives $\{ab, cd\}$, one edge more.*

## Berge's lemma

> **In short:** A matching is as large as possible exactly when no augmenting path exists.

$$\boxed{M \text{ is maximum} \iff \text{there is no } M\text{-augmenting path}}$$

($\Rightarrow$) If there were an augmenting path, Lemma 1 would give a bigger matching.

($\Leftarrow$) Suppose some matching $M^*$ is bigger than $M$. Look at $M \oplus M^*$.
1. Each vertex has at most one edge from each matching, so degree $\le 2$. So the components are paths and cycles, and their edges alternate between $M$ and $M^*$.
2. An alternating cycle is even, so it has equally many $M$ and $M^*$ edges.
3. $M^*$ has more edges in total, so some component has more $M^*$ edges than $M$ edges. That must be a path that starts and ends with an $M^*$ edge.
4. Its endpoints are free in $M$. If an endpoint touched an edge $e \in M$, then either $e$ would be in the symmetric difference too (making the endpoint interior), or $e \in M \cap M^*$ (giving the vertex two $M^*$ edges). Both are impossible.

So that path is an augmenting path for $M$.

![Components of the symmetric difference](fig/aad-berge.svg)

*Figure. The components of $M \oplus M^*$ are alternating paths and even cycles. Cycles contain equally many edges of each matching, so if $M^*$ is bigger, some path has one more $M^*$ edge, and that path is augmenting for $M$.*

**Lecture 8 exercise: where is bipartiteness used?** Nowhere. The proof only uses two facts: every vertex has degree at most 2 in $M \oplus M^*$, and the edges alternate. Alternation forces every cycle to be *even* in any graph, because an odd cycle cannot alternate between two matchings. So **Berge's lemma holds in every graph**. What needs bipartiteness is *finding* augmenting paths with a simple alternating search (Kuhn, below). In a general graph, an odd cycle (a "blossom") can hide an augmenting path from that search, which is why general graphs need Edmonds' blossom algorithm.

**Lecture 8 exercise: the same exchange proves MST uniqueness.** Comparing two spanning trees through their symmetric difference, as we compared $M$ and $M^*$, shows that with distinct weights the MST is unique (graphs chapter).

**Faster:** Hopcroft–Karp augments along many vertex-disjoint shortest augmenting paths in each phase. It needs only $O(\sqrt V)$ phases, so it runs in $O(E\sqrt V)$ instead of Kuhn's $O(VE)$.

## Finding augmenting paths: Kuhn's algorithm

> **In short:** Direct the edges so that an augmenting path becomes an ordinary directed path, then search for it with DFS.

Point unmatched edges $L \to R$ and matched edges $R \to L$. An augmenting path is now just a directed path from a free left vertex to a free right vertex, so DFS can find one.

![Kuhn orientation](fig/aad-kuhn.svg)

*Figure. With unmatched edges pointing right and matched edges pointing left, an augmenting path is just a directed path from a free left vertex ($u_1$) to a free right vertex ($v_3$), so DFS finds it.*

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

Each search is $O(m)$ and there are $n$ searches, so **$O(nm)$**. It is correct by Lemma 1 and Berge. A vertex whose search fails once can be skipped forever, because flipping augmenting paths never creates a new one starting at it. Hopcroft–Karp improves this to $O(m\sqrt n)$ by augmenting along many shortest paths at once.

Max flow on the network $s \to L \to R \to t$ with unit capacities gives the same answer. In fact Ford–Fulkerson on that network does exactly Kuhn's search, because the residual back edges are the matched edges reversed.

## König's theorem

> **In short:** In bipartite graphs the largest matching and the smallest vertex cover have the same size.

$$\boxed{\text{in a bipartite graph, max matching size} = \text{min vertex cover size}}$$

A **vertex cover** is a set $C$ of vertices that touches every edge.

*Easy direction* ($\le$): the edges of a matching share no vertices, so each needs its own cover vertex. So $\lvert M\rvert \le \lvert C\rvert$ for every matching $M$ and cover $C$.

*Hard direction* (Lecture 8 exercise). Let $M$ be a maximum matching. Let $Z$ be the set of vertices you can reach from free vertices of $L$ by alternating paths (unmatched edges go $L \to R$, matched edges go $R \to L$). Set
$$C = (L \setminus Z) \cup (R \cap Z).$$
- **$C$ is a cover.** Take an edge $(u, v)$ with $u \in L$. If $u \notin Z$, then $u \in C$. If $u \in Z$, there are two cases. If $(u, v) \notin M$, the alternating path to $u$ extends to $v$, so $v \in Z \cap R \subseteq C$. If $(u, v) \in M$, then $u$ is matched, so it is not a free starting point, and the only way to reach it is through its partner $v$; so $v \in Z$.
- **$\lvert C\rvert = \lvert M\rvert$.** Every $v \in R \cap Z$ is matched (otherwise we would have an augmenting path, but $M$ is maximum), and its partner is in $Z$. Every $u \in L \setminus Z$ is matched (free left vertices are in $Z$), and its partner is not in $Z$ (if the partner were in $Z$, $u$ would be too). So each matching edge puts exactly one endpoint into $C$, and every vertex of $C$ is the endpoint of a matching edge.

![König cover from Z](fig/aad-konig.svg)

*Figure. $M = \{u_1v_1, u_3v_2\}$ is maximum. From the free vertex $u_2$, alternating paths reach $v_1$ and then $u_1$, so $Z = \{u_1, u_2, v_1\}$. The cover $(L \setminus Z) \cup (R \cap Z) = \{u_3, v_1\}$ touches every edge and has size $2 = \lvert M\rvert$.*

The flow proof: a minimum vertex cover corresponds to a minimum cut in the unit network with $\infty$ middle edges (practice page).

## Practice

**MA1 (KT 1.x).** Is it true that in every instance some stable matching contains a pair $(m, w)$ where $m$ is $w$'s first choice and $w$ is $m$'s first choice?

*Solution.* False. Two men, two women: $m_1: w_1 > w_2$, $m_2: w_2 > w_1$, $w_1: m_2 > m_1$, $w_2: m_1 > m_2$. Nobody is the first choice of their own first choice. (The stable matchings here are $\{m_1w_1, m_2w_2\}$ and $\{m_1w_2, m_2w_1\}$.) The true statement is the converse: if $m$ and $w$ rank each other first, every stable matching pairs them (else they block).

**MA2.** Show that men-proposing GS can need $\Omega(n^2)$ proposals.

*Solution.* Let every man have the same list $w_1 > w_2 > \cdots > w_n$ and every woman the same list $m_1 > \cdots > m_n$. The only stable matching is $\{m_iw_i\}$ ($m_1$ and $w_1$ rank each other first, so they must be matched; remove them and repeat). So man $m_i$ ends with $w_i$, and since he proposes in order he proposed to $w_1, \ldots, w_i$: $i$ proposals. The total is $1 + 2 + \cdots + n = n(n+1)/2 = \Omega(n^2)$, whatever order the free men are processed in.

**MA3.** Give a bipartite graph with $\lvert L\rvert = \lvert R\rvert = 3$ and no perfect matching, and the Hall violator.

*Solution.* $L = \{a, b, c\}$, $R = \{x, y, z\}$, edges $ax, bx, cx, cy, cz$. $S = \{a, b\}$ has $N(S) = \{x\}$, so $\lvert N(S)\rvert = 1 < 2$.

**MA4.** Run Kuhn's algorithm on $L = \{1, 2, 3\}$, $R = \{a, b, c\}$, edges $1a, 1b, 2a, 3b, 3c$ (adjacency in that order).

*Solution.* $u = 1$: $a$ free, match $1a$. $u = 2$: $a$ is matched to 1, try_kuhn(1): $a$ used, $b$ free, so match $1b$ and then $2a$. $u = 3$: $b$ is matched to 1, try_kuhn(1): $a$ matched to 2, try_kuhn(2): no unused neighbours, fail; back in 1, $b$ is used; fail. Then $c$ free: match $3c$. Final $\{1b, 2a, 3c\}$, size 3, perfect.
