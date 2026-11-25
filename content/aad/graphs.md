# Learn: exploring graphs

Graphs are the language for almost everything after the midsem: matchings, flows, cuts and reductions are all graph problems. This chapter covers the basic searches and what they tell you. Sources: Lecture 4, DPV ch. 3, Assignment 1 Q4.

## Representation

> **In short:** Adjacency lists store only the edges that exist, so a search over the graph costs $O(n + m)$.

$G = (V, E)$, $n = |V|$, $m = |E|$.

- **Adjacency matrix**: $n \times n$, $O(1)$ edge test, $O(n^2)$ space, $O(n)$ to list a vertex's neighbours.
- **Adjacency list**: $O(n + m)$ space, neighbours listed in $O(\deg v)$. All the linear-time algorithms below use lists.

## Generic search ("whatever-first search", Assignment 1 Q4)

> **In short:** Keep a bag of vertices to explore. Which vertex you take out next (stack, queue or heap) gives DFS, BFS or Dijkstra.

```
WhateverFirstSearch(s):
    put s into the bag
    while the bag is not empty:
        take v from the bag
        if v is unmarked:
            mark v
            for each edge v→w: put w into the bag
```

**Claim.** It marks exactly the vertices reachable from $s$.

- *Only reachable vertices are marked.* Induction on the order in which vertices enter the bag: $s$ is reachable; any other $w$ enters the bag only when some marked (hence, by induction, reachable) $v$ with an edge $v \to w$ is processed, so $w$ is reachable too.
- *Every reachable vertex is marked.* Suppose $v$ is reachable but unmarked, with path $s = v_0, v_1, \ldots, v_k = v$. Let $v_i$ be the first unmarked vertex on it ($i \ge 1$, since $s$ is marked first). $v_{i-1}$ was marked, and at that moment $v_i$ was put in the bag. The loop runs until the bag is empty, so $v_i$ was taken out later and marked: contradiction.

A **stack** as the bag gives depth-first search, a **queue** gives breadth-first search, a **priority queue** keyed by distance gives Dijkstra, keyed by edge weight gives Prim. Each vertex is marked once and each edge pushes once, so $O(n + m)$ bag operations.

## Depth-first search

> **In short:** Go as deep as possible, then back up. The order in which vertices start and finish reveals cycles and dependencies.

```
explore(v):  visited[v] ← true; pre[v] ← clock++
             for each edge v→u: if not visited[u]: explore(u)
             post[v] ← clock++
DFS(G):      for each v: if not visited[v]: explore(v)
```
Time $O(n + m)$. The tree edges form a **DFS forest**. For an edge $(u, v)$ in a directed graph:

| Type | Meaning | pre/post intervals |
|---|---|---|
| Tree / forward | $v$ is a descendant of $u$ | $[u\,[v\;\;]_v\,]_u$ |
| Back | $v$ is an ancestor of $u$ | $[v\,[u\;\;]_u\,]_v$ |
| Cross | neither; $v$ finished earlier | $[v\;\;]_v\;[u\;\;]_u$ |

Intervals are always nested or disjoint (parenthesis property). In an undirected graph there are only tree and back edges.

## DAGs and topological order

> **In short:** A cycle shows up as an edge back to a vertex still in progress. With no cycle, sorting by finish time gives an order where every edge points forward.

**A directed graph has a cycle if and only if DFS finds a back edge.** (A back edge $u \to v$ plus the tree path $v \leadsto u$ is a cycle; conversely, in a cycle, the first vertex $v$ DFS reaches will have the whole cycle as descendants, so the cycle edge into $v$ is a back edge.)

In a DAG, **every edge $u \to v$ has post$[u] >$ post$[v]$** (tree, forward and cross edges all satisfy it, and there are no back edges). So listing vertices in **decreasing post order** gives a **topological order**: every edge goes left to right. A DAG has at least one source (no incoming edges) and one sink.

The opposite direction is the idea behind Quiz II Q1: **any** ordering of the vertices, keeping only the forward edges, gives a DAG.

## Strongly connected components

> **In short:** Groups of vertices that can all reach each other. Shrinking each group to a point leaves a DAG.

$u$ and $v$ are strongly connected if each reaches the other. The SCCs partition $V$, and contracting each SCC gives a DAG (the **meta-graph**). Algorithm (Kosaraju, DPV 3.4), $O(n + m)$:

1. Run DFS on the **reverse** graph $G^R$; the vertex with the highest post number lies in a **source** SCC of $G^R$, i.e. a **sink** SCC of $G$.
2. Run explore in $G$ from vertices in decreasing post order of step 1. Each explore stays inside one sink component (everything it could leak into has already been visited), so each call finds exactly one SCC.

## Backtracking

> **In short:** Try choices one at a time and give up on a branch as soon as it cannot work.

Some problems (3-colouring, SAT, game trees) have no known fast algorithm. **Backtracking** builds a solution one choice at a time (a recursion tree), and abandons a branch as soon as a partial choice already violates a constraint (e.g. two adjacent vertices with the same colour). It is still exponential in the worst case, but it prunes. Game trees are searched the same way with min/max at alternate levels.

# Learn: shortest paths

Sources: Lecture 5, Tutorial 2 (shortest paths), DPV ch. 4.

## BFS: unit weights

> **In short:** Explore in rings of distance 0, 1, 2, ...; the first time BFS reaches a vertex is along a shortest path.

BFS from $s$ with a FIFO queue sets $d[v] = d[u] + 1$ the first time $v$ is seen. **Invariant**: if the queue holds $v_1, \ldots, v_r$ front to back, then $d[v_1] \le \cdots \le d[v_r] \le d[v_1] + 1$. So vertices leave the queue in non-decreasing distance order, and $d[v]$ is the number of edges on a shortest path. Time $O(n + m)$.

BFS also tests **bipartiteness**: 2-colour by layer parity; the graph is bipartite iff no edge joins two vertices of the same layer (such an edge would close an odd cycle). This is the "is MaxCut = $\lvert E\rvert$?" test of Lecture 19.

## Dijkstra: non-negative weights

> **In short:** Always finalise the closest unfinished vertex. With no negative edges, nothing found later can give it a shorter route.

```
dist[s] ← 0; dist[v] ← ∞ otherwise; H ← priority queue on dist
while H not empty:
    u ← deletemin(H)                       // u is now final
    for each edge (u, v):
        if dist[u] + w(u,v) < dist[v]:      // relax
            dist[v] ← dist[u] + w(u,v); prev[v] ← u; decreasekey(H, v)
```

**Correctness (invariant).** Let $R$ be the set of extracted vertices. Claim: for every $u \in R$, dist$[u] = \delta(s, u)$.

When $u$ is extracted, take a shortest path $P$ from $s$ to $u$ and let $(x, y)$ be its first edge leaving $R$ ($x \in R$, $y \notin R$). When $x$ was extracted, $(x, y)$ was relaxed, so dist$[y] \le \delta(x) + w(x,y) = \delta(y) \le \delta(u)$, using **$w \ge 0$** for the last step (the rest of $P$ after $y$ has non-negative length). Since $u$ was chosen with minimum dist, dist$[u] \le$ dist$[y] \le \delta(u)$. And dist$[u] \ge \delta(u)$ always (dist is the length of a real path). So dist$[u] = \delta(u)$.

**Time.** $n$ deletemins and $m$ decreasekeys: $O((n + m)\log n)$ with a binary heap.

**Negative edges break it.** With $s \to a$ (2), $s \to b$ (3), $b \to a$ ($-2$): Dijkstra finalises $a$ at 2, but the path $s \to b \to a$ costs 1.

**Tutorial 2 warm-up.** Multiplying all weights by $c > 0$ keeps every shortest path (every path's weight scales by the same $c$). Adding $c > 0$ to every weight does **not**: a path with $k$ edges gains $ck$, so paths with fewer edges gain less. Example: $s \to a \to t$ with weights 1, 1 and $s \to t$ with weight 3; after adding 2 the direct edge (5) beats the two-edge path (6).

## Bellman–Ford: negative edges allowed

> **In short:** Improve every distance estimate over and over. A shortest path has at most $n - 1$ edges, so $n - 1$ rounds are enough.

A shortest path (with no negative cycles) has at most $n - 1$ edges. **Relax every edge, $n - 1$ times.**

**Why it works.** After round $k$, dist$[v] \le$ the length of the shortest $s$–$v$ path with at most $k$ edges (induction: such a path is a $(k-1)$-edge path plus one edge, which round $k$ relaxes). Round $n - 1$ covers every simple path.

**Negative cycles.** Run one more round. If any dist still decreases, a negative cycle is reachable from $s$. Time $O(nm)$.

**Arbitrage (Lecture 12 in-class quiz).** Trading ratios $r_{ij}$; an opportunity cycle has $\prod r_{ij} > 1$. Take weights $w_{ij} = -\log r_{ij}$: then $\prod r > 1 \iff \sum w < 0$. Add a super-source with 0-weight edges to every vertex and run Bellman–Ford; an opportunity exists iff there is a negative cycle. To output it, follow prev pointers from a vertex updated in round $n$ for $n$ steps (to land on the cycle), then walk prev until a vertex repeats. $O(nm)$.

## Shortest paths in a DAG

> **In short:** In topological order each vertex's distance is final before it is used, so one pass is enough.

Process vertices in topological order and relax each vertex's outgoing edges. Each edge is relaxed once, after its tail is final: $O(n + m)$, and negative weights are fine. **Longest** paths in a DAG work the same way (negate weights or use max). Lecture 11 writes it as a DP: $\text{OPT}(v) = \min_{(u,v)\in E}\{\text{OPT}(u) + \ell(u, v)\}$.

# Learn: minimum spanning trees

Sources: Lecture 5, Tutorial 2 (Prim, DSU and Kruskal), DPV 5.1, Assignment 1 Q2.

A **spanning tree** of a connected undirected graph has $n - 1$ edges, is connected and acyclic (any two of those three properties imply the third). An MST minimises total weight.

## The cut property

> **In short:** Split the vertices into two groups however you like: the cheapest edge between them is always safe to take.

$$\boxed{\text{If } X \subseteq \text{some MST, no edge of } X \text{ crosses the cut } (S, V\setminus S), \text{ and } e \text{ is a lightest crossing edge, then } X \cup \{e\} \subseteq \text{some MST.}}$$

**Proof (exchange).** Let $T$ be an MST containing $X$. If $e \in T$, done. Otherwise $T + e$ has a cycle, which crosses the cut at $e$ and so must cross it again at some edge $e'$. $T' = T + e - e'$ is a spanning tree (we broke the only cycle), and $w(e) \le w(e')$, so $w(T') \le w(T)$: $T'$ is an MST containing $X \cup \{e\}$ ($e' \notin X$ because no edge of $X$ crosses the cut).

**Cycle property.** The heaviest edge on a cycle (if strictly heaviest) is in no MST.

## Kruskal

> **In short:** Take edges from cheapest to dearest, skipping any edge that would close a loop.

Sort edges by weight; add each edge unless it closes a cycle. Correct by the cut property: when $e = (u, v)$ is added, take $S$ = the current component of $u$; $e$ is the lightest edge leaving $S$ (lighter ones were already processed, and none of those leaves $S$, else it would have been added).

**Union–find (DSU)** decides "same component?". With union by rank and path compression each operation is $O(\alpha(n))$, essentially constant. Union by rank alone gives height $O(\log n)$. Total $O(m\log m)$ for sorting, $= O(m\log n)$.

## Prim

> **In short:** Grow one tree, always adding the cheapest edge that leaves it.

Grow one tree from a start vertex; repeatedly add the lightest edge leaving the tree. Correct by the cut property with $S$ = the current tree. Implementation is Dijkstra with key$[v] = \min_{u \in S} w(u, v)$ instead of a path length: $O((n+m)\log n)$.

## MSTs with distinct weights are unique (Assignment 1 Q2b)

> **In short:** If two MSTs differed, swapping the lightest edge where they differ would make one of them strictly cheaper.

Suppose $T \ne T'$ are both MSTs. Let $e$ be the **lightest edge in exactly one** of them, say $e \in T \setminus T'$. $T' + e$ contains a cycle $C$. $C$ has an edge $e' \notin T$ (else $T$ would contain the cycle). $e' \in T' \setminus T$, so by the choice of $e$ and distinctness, $w(e') > w(e)$. Then $T' + e - e'$ is a spanning tree lighter than $T'$, a contradiction.

## Updating an MST with a new edge (Assignment 1 Q2a)

> **In short:** The new edge makes exactly one loop. Drop the heaviest edge on that loop.

New edge $e = (u, v)$ with cost $c$. Find the unique path $P$ from $u$ to $v$ in the current MST $T$ (DFS, $O(n)$) and its heaviest edge $f$.

- If $c \ge w(f)$, $e$ is the heaviest edge on the cycle $P + e$; by the cycle property it is useless and $T$ stays.
- If $c < w(f)$, the new MST is $T + e - f$.

**Why $T + e - f$ is an MST of $G + e$.** Every edge of $G$ not in $T$ is the heaviest on its cycle with $T$ (that is the cycle-property characterisation of MSTs). Adding $e$ and removing $f$ only changes cycles that went through $f$; in each, $f$ was the heaviest, and is now replaced by path pieces plus $e$, all lighter. Alternatively, run Kruskal on the $n$ edges $T + e$ only: any MST of $G + e$ uses only edges of $T \cup \{e\}$, because every other edge is heaviest on some cycle that avoids $e$. Time $O(n)$.

## Practice

**GR1 (DPV 3.x).** Give a linear-time algorithm to test whether a directed graph has a cycle, and to output one.

*Solution.* Run DFS keeping pre/post numbers and parent pointers. A directed graph has a cycle iff some edge $(u, v)$ is a back edge, recognised by $v$ being on the recursion stack (visited, not yet finished) when $(u, v)$ is scanned. Output the cycle by walking parent pointers from $u$ back to $v$ and adding $(u, v)$. Time $O(n + m)$.

**GR2.** Run Dijkstra from $s$ on: $s\to a$ (4), $s\to b$ (1), $b \to a$ (2), $a \to c$ (1), $b \to c$ (5), $c \to t$ (3), $a \to t$ (6). Give the extraction order and final distances.

*Solution.* Start: $s{:}0$. Extract $s$: $a{:}4$, $b{:}1$. Extract $b$ (1): $a = \min(4, 1+2) = 3$, $c{:}6$. Extract $a$ (3): $c = \min(6, 4) = 4$, $t{:}9$. Extract $c$ (4): $t = \min(9, 7) = 7$. Extract $t$ (7). Order $s, b, a, c, t$; distances $0, 3, 1, 4, 7$ for $s, a, b, c, t$; shortest path to $t$ is $s \to b \to a \to c \to t$.

**GR3.** Prove that in a graph with distinct weights, the lightest edge is in the MST, and the heaviest edge of any cycle is not.

*Solution.* Lightest edge $e = (u, v)$: take the cut $S = \{u\}$; $e$ is the lightest edge crossing it (it is the lightest overall), so by the cut property with $X = \emptyset$ it is in some MST, which is the unique MST. Heaviest cycle edge $f$: if $f \in T$ (an MST), removing it splits $T$ into two parts; the rest of the cycle crosses that cut at some $f' \ne f$ with $w(f') < w(f)$, and $T - f + f'$ is lighter: contradiction.

# Learn: Tutorial 2 problems and the assigned DPV graph exercises

Tutorial 2 (shortest paths, Kruskal with union–find, Prim) and the exercises Lectures 4 and 5 assigned from DPV chapters 3, 4 and 5, all solved.

## Tutorial 2: shortest paths

**GR4 (Tutorial 2 warm-up).** $\pi(s,t)$ is a shortest path in an undirected graph with positive weights. Is it still shortest if (1) every weight is multiplied by $c > 0$? (2) every weight is increased by $c > 0$?

*Solution.* (1) **Yes.** Scaling changes neither $V$ nor $E$, so the competing $s$–$t$ paths are the same objects, and $w'(P) = c\,w(P)$ for every path. For any path $Q$, $w(\pi) \le w(Q)$, and multiplying by $c > 0$ keeps the direction: $w'(\pi) \le w'(Q)$. So $\pi$ is still shortest and $\delta' = c\,\delta$. (For $c < 0$ the inequality would reverse: the hypothesis is used.)

(2) **No.** Now $w'(Q) = w(Q) + c\lvert Q\rvert$: the shift grows with the number of edges, so it is not common to all competitors. Counterexample: $s - a - t$ with weights 1, 1 and a direct edge $s - t$ of weight 3. Originally $s\,a\,t$ costs $2 < 3$. With $c = 2$: $s\,a\,t$ costs $3 + 3 = 6$ and $s\,t$ costs 5, so the direct edge is now the unique shortest path. (If all $s$–$t$ paths had the same number of edges, the answer would be yes again.)

**GR5 (Tutorial 2, BFS and Dijkstra share one proof).** Show BFS computes shortest paths for unit weights by proving its queue invariant, and give the example where Dijkstra fails with a negative edge.

*Solution.* **Invariant**: if the queue is $\langle v_1, \ldots, v_r\rangle$ front to back, then $d[v_1] \le \cdots \le d[v_r] \le d[v_1] + 1$. It holds for $\langle s\rangle$. Popping $v_1$ pushes each newly seen neighbour $x$ with $d[x] = d[v_1] + 1$, which is $\ge d[v_r]$ (order kept) and $\le d[v_2] + 1$ (bound kept). So the front always has a minimum key: BFS is Dijkstra with a FIFO queue instead of a heap, and Dijkstra's correctness proof applies. Cost $O(\lvert V\rvert + \lvert E\rvert)$.

**Negative edge**: $s\to u$ (1), $s\to v$ (2), $v\to u$ (−2). Dijkstra finalises $u$ with $d[u] = 1$ before looking at $v$, but $\delta(u) = 2 - 2 = 0$. Dijkstra's proof uses $w \ge 0$ in exactly one place: $\delta(y) \le \delta(u)$ for a vertex $y$ before $u$ on a shortest path.

**GR6 (Tutorial 2, preferred directions: 0-1 BFS).** $n$ cities, $m$ two-way roads, each with a preferred direction; driving against it is one violation. Find the fewest violations on a route from $s$ to $t$ ($n, m \le 10^6$).

*Solution.* **Reduction.** For a road $u - v$ preferred $u \to v$, add directed edges $u\to v$ of weight 0 and $v\to u$ of weight 1. A route $s = c_0, \ldots, c_L = t$ is exactly a walk in $G'$, and its number of violations is the walk's weight, so the answer is $\delta_{G'}(s, t)$ (walks and paths give the same minimum since $w \ge 0$). $t$ is reachable iff it is in the underlying graph.

**0-1 BFS.** Run Dijkstra with a **deque** instead of a heap: after a successful relaxation along a weight-0 edge push to the **front**, along a weight-1 edge push to the **back**; always pop the front, skipping vertices already done.

*Invariant*: deque keys $k_1 \le k_2 \le \cdots \le k_r \le k_1 + 1$. Popping the front key $m$ (which equals $\text{dist}[u]$ for a not-yet-done $u$): a 0-edge pushes key $m$ to the front, at most every surviving key; a 1-edge pushes $m + 1$ to the back, at least every surviving key. Both preserve sorted order and the "within 1" bound. So `pop_front` returns a minimum key, and Dijkstra's proof applies unchanged.

*Cost*: each vertex is finalised once, each edge relaxed once, each push popped once, $O(1)$ each: $O(n + m)$, against $O(m\log n)$ with a heap.

## Tutorial 2: MSTs

**GR7 (Tutorial 2, Kruskal and union–find).** How does Kruskal detect cycles quickly?

*Solution.* Keep a **disjoint-set union** of the components of the forest built so far. Adding edge $(u, v)$ creates a cycle iff $\text{find}(u) = \text{find}(v)$; otherwise add it and $\text{union}(u, v)$. **Union by rank** keeps trees $O(\log n)$ tall, and **path compression** (pointing every vertex on a find path straight at the root) makes them almost flat, so a sequence of operations costs nearly $O(1)$ each (inverse Ackermann). Kruskal is then dominated by sorting: $O(m\log m) = O(m\log n)$.

**GR8 (Tutorial 2, updating an MST when one weight changes).** $T$ is an MST of $G$; edge $e$ changes weight from $w(e)$ to $\hat w(e)$. Update $T$ in $O(\lvert V\rvert + \lvert E\rvert)$ in all four cases.

*Solution.*

- **(a) $e \notin T$, heavier.** Keep $T$. $e$ was the heaviest edge of the cycle it closes in $T \cup \{e\}$ (else swapping would improve $T$); it is still the heaviest, so by the **cycle property** it stays out. $O(1)$.
- **(c) $e \in T$, lighter.** Keep $T$. Its weight drops by $\Delta$; every spanning tree containing $e$ drops by $\Delta$ and every other tree is unchanged, so $T$ is still minimum. $O(1)$.
- **(b) $e = (u, v) \notin T$, lighter.** $T \cup \{e\}$ has a unique cycle $C$: find the $u$–$v$ path in $T$ by DFS, $O(\lvert V\rvert)$. Let $e_{\max}$ be the heaviest edge of $C$. If $\hat w(e) < w(e_{\max})$, set $T' = T \cup \{e\} \setminus \{e_{\max}\}$, else $T' = T$. By the cycle property the heaviest edge of $C$ is in no MST, and no other cycle has gained a lighter edge.
- **(d) $e \in T$, heavier.** Removing $e$ splits $T$ into two parts, giving a cut $(S, V\setminus S)$; find $S$ by DFS in $O(\lvert V\rvert)$. Scan all edges for the lightest edge $e_{\min}$ crossing the cut (with $e$ at its new weight), $O(\lvert E\rvert)$. Set $T' = T \setminus\{e\} \cup \{e_{\min}\}$. The two halves of $T$ are still optimal inside, and by the **cut property** the lightest crossing edge belongs to an MST.

**GR9 (Tutorial 2, water supply).** $N$ houses; a well at house $i$ costs $W_i$, a pipe between $i$ and $j$ costs $P_{ij}$. Every house must get water from its own well or through pipes from a house with a well. Minimise the cost.

*Solution.* **Construction.** Add a dummy vertex 0 (the water table); for each house an edge $0 - i$ of weight $W_i$, and for each pipe an edge $i - j$ of weight $P_{ij}$. Answer: the MST of $G'$ on $N + 1$ vertices (Prim from vertex 0).

**Correctness.** Take an optimal configuration. In each pipe-connected group, the pipes form a tree (a cycle would have a removable pipe) and there is exactly one well (none means no water; two means one well can be dropped). Groups plus their well edges to 0 form a connected acyclic spanning subgraph of $G'$: a spanning tree of the same cost. Conversely, in any spanning tree of $G'$, deleting vertex 0 splits the houses into groups, each attached to 0 by exactly one well edge and internally connected by pipes, which is a valid configuration of the same cost. So optimal cost = MST weight. **Time** $O((N + M)\log N)$ with $M$ pipes.

**GR10 (Tutorial 2, free swaps and paid swaps).** An array $A$ of distinct integers; $M$ "VIP" index pairs can be swapped any number of times for free, and other adjacent pairs $(i, j)$ can be made swappable for a one-time cost $C_{ij}$. (1) What is the lexicographically largest array using only free swaps? (2) What is the cheapest set of paid swaps after which every permutation is reachable?

*Solution.* (1) Swaps along a connected set of index pairs generate every permutation of that set's positions (adjacent transpositions along a spanning tree generate the symmetric group). So: union–find over the VIP pairs; for each component, sort its **indices** ascending and its **values** descending and place them in that order. Within each component, the largest values go to the earliest positions, which is lexicographically best, and no value can leave its component.

(2) Every permutation is reachable iff the "swap graph" on indices is connected. Treat each free component as one super-vertex and run Kruskal on the paid swaps, starting from the union–find of part (1): add a paid swap only if it joins two different components. This is an MST of the contracted graph, which is the cheapest way to connect it (cut property).

**GR11 (Tutorial 2, XOR MST).** $N \le 10^5$ numbers; joining $i$ and $j$ costs $A[i] \oplus A[j]$. Find the MST without building all $\Theta(N^2)$ edges.

*Solution.* **Split by the highest bit.** Let $b$ be the highest bit where not all numbers agree; split the numbers into $L$ (bit $b$ = 0) and $H$ (bit $b$ = 1). Every edge inside $L$ or inside $H$ has bit $b$ = 0 in its XOR (and all higher bits 0), while every cross edge has bit $b$ = 1, so **every cross edge is heavier than every inside edge**. Hence (cycle and cut properties) the MST is: an MST of $L$, an MST of $H$, and exactly one cross edge, the cheapest one (the cut $(L, H)$ must be crossed, and by the cut property its lightest edge is in the MST; a second cross edge would close a cycle in which it is heaviest). Recurse on $L$ and $H$.

**The cheapest cross edge**: insert $L$ into a binary **trie**, and for each $y \in H$ walk the trie greedily choosing the child that matches $y$'s next bit; this finds $\min_{x\in L} x \oplus y$ in $O(B)$ for $B$-bit numbers. Each number is handled once per level of the recursion, so the total is $O(NB^2)$ (or $O(NB)$ with care), versus $\Theta(N^2)$ for Prim on the complete graph.

## Assigned DPV exercises: chapter 3 (exploring graphs)

**GR12 (DPV 3.7, bipartite graphs).** (a) Give a linear-time test for bipartiteness. (b) Prove that a graph is bipartite iff it has no odd cycle. (c) How many colours does a graph need if it has exactly one odd cycle?

*Solution.* (a) BFS (or DFS) from each unvisited vertex, colouring each newly reached vertex opposite to its parent; the graph is bipartite iff no edge joins two vertices of the same colour. $O(n + m)$.

(b) ($\Rightarrow$) Along any cycle the sides alternate, so returning to the start needs an even length. ($\Leftarrow$) In a connected graph with no odd cycle, colour $v$ by the parity of its BFS distance $d(v)$ from a root. An edge $uv$ has $\lvert d(u) - d(v)\rvert \le 1$; if $d(u) = d(v)$, the two BFS paths to $u$ and $v$ plus the edge $uv$ contain a cycle of odd length $2d(u) - 2d(w) + 1$, where $w$ is where the paths split. So every edge joins different parities.

(c) **3.** Delete one edge $e = xy$ of the odd cycle; the rest has no odd cycle, so it is 2-colourable. If $x$ and $y$ got the same colour, recolour $x$ with a third colour (its other neighbours are 2-coloured, so this is safe). At least 3 are needed because an odd cycle is not 2-colourable.

**GR13 (DPV 3.8, pouring water).** Containers of 10, 7 and 4 pints; the 7 and 4 start full and the 10 empty. Pouring stops when the source empties or the target fills. Can exactly 2 pints end up in the 7- or 4-pint container? Model it as a graph problem.

*Solution.* **Graph**: a vertex for each state $(a, b, c)$ (contents of the 10, 7, 4) with $a + b + c = 11$; a directed edge for each legal pour. The question is reachability from $(0, 7, 4)$ to any state with $b = 2$ or $c = 2$: run BFS (or DFS). **Yes**, and BFS finds the shortest sequence:
$$(0,7,4) \to (4,7,0) \to (10,1,0) \to (6,1,4) \to (6,5,0) \to (2,5,4) \to (2,7,2).$$
(Pour 4→10, 7→10, 10→4, 4→7, 10→4, 4→7: the 4-pint container ends with 2.)

**GR14 (DPV 3.16, prerequisites).** Courses with prerequisite edges form a DAG. With unlimited courses per semester, find the fewest semesters needed.

*Solution.* A course can be taken in semester $1 + $ (longest chain of prerequisites ending at it). Compute $L(v) = 1 + \max_{(u,v)} L(u)$ (with $L(v) = 1$ for sources) in topological order: a longest-path DP on the DAG, $O(n + m)$. The answer is $\max_v L(v)$: taking each course in semester $L(v)$ is legal, and a chain of $k$ courses forces at least $k$ semesters.

**GR15 (DPV 3.26, Euler tours).** (a) A connected undirected graph has a closed walk using every edge exactly once iff every degree is even. (b) It has an Euler path (not closed) iff exactly 0 or 2 vertices have odd degree. (c) Directed version?

*Solution.* (a) ($\Rightarrow$) Each pass through a vertex uses one edge in and one out, so degrees are even. ($\Leftarrow$) Walk from $v$ along unused edges; with all degrees even, you can only get stuck at $v$, so you trace a closed walk. If edges remain, some vertex on the walk has unused edges (connectivity); start a new closed walk there and splice it in. Repeat (Hierholzer, $O(m)$). (b) With two odd vertices $x, y$, add an edge $xy$, take the Euler tour, delete the added edge: an Euler path from $x$ to $y$. Conversely, an open Euler path makes exactly its two endpoints odd. (c) Directed: an Euler tour exists iff the graph is (strongly) connected on its non-isolated vertices and $\text{in}(v) = \text{out}(v)$ for every $v$.

**GR16 (DPV 3.28, 2-SAT).** Give a linear-time algorithm for 2-SAT.

*Solution.* **Implication graph**: vertices $x_i$ and $\neg x_i$; each clause $(a \vee b)$ gives edges $\neg a \to b$ and $\neg b \to a$ (if $a$ is false, $b$ must be true). **Claim**: $\Phi$ is unsatisfiable iff some $x_i$ and $\neg x_i$ lie in the same SCC. (If they do, $x_i \Rightarrow \neg x_i \Rightarrow x_i$, impossible.) Otherwise, process SCCs in reverse topological order (sinks first) and set every literal in an unassigned SCC to true and its complement to false; this never makes an implication $\text{true} \Rightarrow \text{false}$. SCCs take $O(n + m)$. So 2-SAT is in P, unlike 3-SAT.

## Assigned DPV exercises: chapters 4 and 5 (paths and MSTs)

**GR17 (DPV 4.5, counting shortest paths).** In an unweighted graph, count the shortest $s$–$v$ paths for every $v$ in linear time.

*Solution.* BFS from $s$ with $\text{cnt}[s] = 1$. When scanning edge $(u, v)$: if $v$ is new, set $d[v] = d[u] + 1$ and $\text{cnt}[v] = \text{cnt}[u]$; else if $d[v] = d[u] + 1$, add $\text{cnt}[u]$ to $\text{cnt}[v]$. A shortest path to $v$ ends with an edge from some $u$ with $d[u] = d[v] - 1$, and all such $u$ are finished (dequeued) before $v$ is, so the counts are complete. $O(n + m)$.

**GR18 (DPV 4.10, at most $k$ edges).** Shortest paths from $s$ using at most $k$ edges, negative weights allowed.

*Solution.* Run $k$ rounds of Bellman–Ford, each relaxing every edge **using the values from the previous round** (keep two arrays). By induction, after round $i$, $d[v]$ = the lightest $s$–$v$ walk with at most $i$ edges. $O(km)$.

**GR19 (DPV 4.13, fuel range).** Cities and highways with lengths $\ell_e$; a car can drive at most $L$ between refuelling stops (cities). (a) Decide in linear time whether $s$ can reach $t$. (b) Find the smallest tank range that allows the trip in $O((n + m)\log n)$.

*Solution.* (a) Delete every edge with $\ell_e > L$ and test reachability by BFS/DFS: $O(n + m)$. (b) We need the path minimising its **longest** edge (a minimax or bottleneck path). Modify Dijkstra: $d[s] = 0$, relax $d[v] \leftarrow \min(d[v], \max(d[u], \ell_{uv}))$. The same proof works because $\max(d[u], \ell)$ never decreases along a path, just like sums with non-negative weights. $O((n + m)\log n)$. (Equivalently: the path between $s$ and $t$ in an MST minimises the largest edge.)

**GR20 (DPV 4.17, small integer weights).** All weights are integers in $\{1, \ldots, W\}$. Run Dijkstra in (a) $O(W\lvert V\rvert + \lvert E\rvert)$ and (b) $O((\lvert V\rvert + \lvert E\rvert)\log W)$.

*Solution.* (a) Distances are at most $W(\lvert V\rvert - 1)$. Use an array of buckets indexed by distance; insert/decrease-key moves a vertex between buckets in $O(1)$; deletemin scans forward from the last nonempty bucket, and the scan pointer only moves forward (Dijkstra extracts in nondecreasing order), so total scanning is $O(W\lvert V\rvert)$. (b) At any moment the keys in the queue lie in a window $[D, D + W]$ (every key is the last extracted distance plus at most $W$), so only $W + 1$ distinct key values are live: keep a heap over the at most $W + 1$ nonempty buckets, so each operation is $O(\log W)$.

**GR21 (DPV 4.21, currency exchange).** Rates $r_{ij}$ (one unit of $i$ buys $r_{ij}$ of $j$). (a) Find the most profitable conversion sequence from $s$ to $t$. (b) Detect an arbitrage opportunity (a cycle with product of rates $> 1$).

*Solution.* Use weights $w_{ij} = -\log r_{ij}$. A product of rates is maximised exactly when the sum of $-\log$ is minimised, and $\prod r > 1 \iff \sum(-\log r) < 0$. (a) Bellman–Ford from $s$ (weights can be negative), $O(nm)$, assuming no arbitrage. (b) Run one more round: any further improvement means a negative cycle, which is an arbitrage. The Lecture 12 "opportunity cycle" problem is exactly (b).

**GR22 (DPV 4.22, best ratio cycle).** Each city $j$ has profit $p_j$, each edge cost $c_{ij} > 0$; find a cycle maximising $\frac{\sum p}{\sum c}$. (a) For a given $r$, test whether some cycle has ratio $> r$. (b) Find the best ratio to within $\varepsilon$.

*Solution.* (a) Weight each edge $w_{ij} = r\,c_{ij} - p_j$. A cycle $C$ has ratio $> r$ $\iff \sum_C p_j > r\sum_C c_{ij} \iff \sum_C w_{ij} < 0$. So run Bellman–Ford negative-cycle detection, $O(nm)$. (b) The ratio lies in $[0, R]$ with $R = \sum p / \min c$; binary search on $r$ with test (a), $O(\log(R/\varepsilon))$ times.

**GR23 (DPV 5.5, adding 1 to every weight).** (a) Does the MST change? (b) Do shortest paths change?

*Solution.* (a) **No.** Every spanning tree has exactly $n - 1$ edges, so every tree's weight rises by $n - 1$ and their order is unchanged. (b) **Yes, possibly**: paths with more edges gain more (GR4(2)).

**GR24 (DPV 5.9, true or false about MSTs).** Decide each statement for a connected undirected weighted graph.

*Solution.*

| Statement | Answer and reason |
|---|---|
| If $G$ has more than $n - 1$ edges and a unique heaviest edge, that edge is in no MST. | **False**: a heaviest edge that is a bridge must be in every spanning tree. |
| If $G$ has a cycle with a unique heaviest edge $e$, then $e$ is in no MST. | **True**: cycle property (swap $e$ for a lighter cycle edge across the cut it defines). |
| Let $e$ be any edge of minimum weight. Then $e$ is in some MST. | **True**: cut property on any cut that $e$ crosses. |
| If the lightest edge is unique, it is in every MST. | **True**: if an MST $T$ lacked $e$, then $T \cup \{e\}$ has a cycle whose other edges are all heavier than $e$; removing one gives a strictly lighter spanning tree. |
| If $G$ has a cycle with a unique lightest edge $e$, then $e$ is in every MST. | **False**: triangle $a, b, c$ with $ab = 5$, $bc = 6$, $ca = 7$, plus a vertex $x$ joined to $a$ and $b$ with weight 1 each. $ab$ is the unique lightest edge of the cycle $abc$, but it is the heaviest edge of the cycle $axb$, so it is in no MST. |
| Dijkstra's shortest-path tree is an MST. | **False**: triangle $s$–$a$ 2, $s$–$b$ 2, $a$–$b$ 1: SPT uses both 2s (weight 4), MST weight 3. |
| The shortest path between two vertices is part of some MST. | **False**: $sa = 3$, $sb = 2$, $ab = 2$. The shortest $s$–$a$ path is the direct edge (3 < 4), but the only MST is $\{sb, ab\}$ (weight 4), which does not contain it. |
| Prim's algorithm works with negative weights. | **True**: the cut property never uses the sign of the weights. |
