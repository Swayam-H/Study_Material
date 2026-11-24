# Learn: exploring graphs

Graphs are the language for almost everything after the midsem: matchings, flows, cuts and reductions are all graph problems. This chapter covers the basic searches and what they tell you. Sources: Lecture 4, DPV ch. 3, Assignment 1 Q4.

## Representation

$G = (V, E)$, $n = |V|$, $m = |E|$.

- **Adjacency matrix**: $n \times n$, $O(1)$ edge test, $O(n^2)$ space, $O(n)$ to list a vertex's neighbours.
- **Adjacency list**: $O(n + m)$ space, neighbours listed in $O(\deg v)$. All the linear-time algorithms below use lists.

## Generic search ("whatever-first search", Assignment 1 Q4)

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

**A directed graph has a cycle if and only if DFS finds a back edge.** (A back edge $u \to v$ plus the tree path $v \leadsto u$ is a cycle; conversely, in a cycle, the first vertex $v$ DFS reaches will have the whole cycle as descendants, so the cycle edge into $v$ is a back edge.)

In a DAG, **every edge $u \to v$ has post$[u] >$ post$[v]$** (tree, forward and cross edges all satisfy it, and there are no back edges). So listing vertices in **decreasing post order** gives a **topological order**: every edge goes left to right. A DAG has at least one source (no incoming edges) and one sink.

The opposite direction is the idea behind Quiz II Q1: **any** ordering of the vertices, keeping only the forward edges, gives a DAG.

## Strongly connected components

$u$ and $v$ are strongly connected if each reaches the other. The SCCs partition $V$, and contracting each SCC gives a DAG (the **meta-graph**). Algorithm (Kosaraju, DPV 3.4), $O(n + m)$:

1. Run DFS on the **reverse** graph $G^R$; the vertex with the highest post number lies in a **source** SCC of $G^R$, i.e. a **sink** SCC of $G$.
2. Run explore in $G$ from vertices in decreasing post order of step 1. Each explore stays inside one sink component (everything it could leak into has already been visited), so each call finds exactly one SCC.

## Backtracking

Some problems (3-colouring, SAT, game trees) have no known fast algorithm. **Backtracking** builds a solution one choice at a time (a recursion tree), and abandons a branch as soon as a partial choice already violates a constraint (e.g. two adjacent vertices with the same colour). It is still exponential in the worst case, but it prunes. Game trees are searched the same way with min/max at alternate levels.

# Learn: shortest paths

Sources: Lecture 5, Tutorial 2 (shortest paths), DPV ch. 4.

## BFS: unit weights

BFS from $s$ with a FIFO queue sets $d[v] = d[u] + 1$ the first time $v$ is seen. **Invariant**: if the queue holds $v_1, \ldots, v_r$ front to back, then $d[v_1] \le \cdots \le d[v_r] \le d[v_1] + 1$. So vertices leave the queue in non-decreasing distance order, and $d[v]$ is the number of edges on a shortest path. Time $O(n + m)$.

BFS also tests **bipartiteness**: 2-colour by layer parity; the graph is bipartite iff no edge joins two vertices of the same layer (such an edge would close an odd cycle). This is the "is MaxCut = $\lvert E\rvert$?" test of Lecture 19.

## Dijkstra: non-negative weights

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

A shortest path (with no negative cycles) has at most $n - 1$ edges. **Relax every edge, $n - 1$ times.**

**Why it works.** After round $k$, dist$[v] \le$ the length of the shortest $s$–$v$ path with at most $k$ edges (induction: such a path is a $(k-1)$-edge path plus one edge, which round $k$ relaxes). Round $n - 1$ covers every simple path.

**Negative cycles.** Run one more round. If any dist still decreases, a negative cycle is reachable from $s$. Time $O(nm)$.

**Arbitrage (Lecture 12 in-class quiz).** Trading ratios $r_{ij}$; an opportunity cycle has $\prod r_{ij} > 1$. Take weights $w_{ij} = -\log r_{ij}$: then $\prod r > 1 \iff \sum w < 0$. Add a super-source with 0-weight edges to every vertex and run Bellman–Ford; an opportunity exists iff there is a negative cycle. To output it, follow prev pointers from a vertex updated in round $n$ for $n$ steps (to land on the cycle), then walk prev until a vertex repeats. $O(nm)$.

## Shortest paths in a DAG

Process vertices in topological order and relax each vertex's outgoing edges. Each edge is relaxed once, after its tail is final: $O(n + m)$, and negative weights are fine. **Longest** paths in a DAG work the same way (negate weights or use max). Lecture 11 writes it as a DP: $\text{OPT}(v) = \min_{(u,v)\in E}\{\text{OPT}(u) + \ell(u, v)\}$.

# Learn: minimum spanning trees

Sources: Lecture 5, Tutorial 2 (Prim, DSU and Kruskal), DPV 5.1, Assignment 1 Q2.

A **spanning tree** of a connected undirected graph has $n - 1$ edges, is connected and acyclic (any two of those three properties imply the third). An MST minimises total weight.

## The cut property

$$\boxed{\text{If } X \subseteq \text{some MST, no edge of } X \text{ crosses the cut } (S, V\setminus S), \text{ and } e \text{ is a lightest crossing edge, then } X \cup \{e\} \subseteq \text{some MST.}}$$

**Proof (exchange).** Let $T$ be an MST containing $X$. If $e \in T$, done. Otherwise $T + e$ has a cycle, which crosses the cut at $e$ and so must cross it again at some edge $e'$. $T' = T + e - e'$ is a spanning tree (we broke the only cycle), and $w(e) \le w(e')$, so $w(T') \le w(T)$: $T'$ is an MST containing $X \cup \{e\}$ ($e' \notin X$ because no edge of $X$ crosses the cut).

**Cycle property.** The heaviest edge on a cycle (if strictly heaviest) is in no MST.

## Kruskal

Sort edges by weight; add each edge unless it closes a cycle. Correct by the cut property: when $e = (u, v)$ is added, take $S$ = the current component of $u$; $e$ is the lightest edge leaving $S$ (lighter ones were already processed, and none of those leaves $S$, else it would have been added).

**Union–find (DSU)** decides "same component?". With union by rank and path compression each operation is $O(\alpha(n))$, essentially constant. Union by rank alone gives height $O(\log n)$. Total $O(m\log m)$ for sorting, $= O(m\log n)$.

## Prim

Grow one tree from a start vertex; repeatedly add the lightest edge leaving the tree. Correct by the cut property with $S$ = the current tree. Implementation is Dijkstra with key$[v] = \min_{u \in S} w(u, v)$ instead of a path length: $O((n+m)\log n)$.

## MSTs with distinct weights are unique (Assignment 1 Q2b)

Suppose $T \ne T'$ are both MSTs. Let $e$ be the **lightest edge in exactly one** of them, say $e \in T \setminus T'$. $T' + e$ contains a cycle $C$. $C$ has an edge $e' \notin T$ (else $T$ would contain the cycle). $e' \in T' \setminus T$, so by the choice of $e$ and distinctness, $w(e') > w(e)$. Then $T' + e - e'$ is a spanning tree lighter than $T'$, a contradiction.

## Updating an MST with a new edge (Assignment 1 Q2a)

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
