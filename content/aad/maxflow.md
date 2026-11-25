# Learn: flows, cuts and duality

Max flow is the biggest topic after the midsem. Class Test I was all max flow (an Edmonds–Karp trace and two reductions), Quiz II Q2 was matching and Hall via max-flow min-cut, and Lectures 14 to 18 plus a revision session covered it. The endsem will almost certainly have a trace or a reduction from this chapter. Sources: Lectures 14–18, KT ch. 7, DPV 7.2, the Moodle practice set.

## Flow networks

> **In short:** Push as much as possible from $s$ to $t$ through pipes with limits, with nothing lost or created at the junctions.

A **flow network** is a directed graph $G = (V, E)$ with a source $s$, a sink $t$, and a capacity $c(u, v) \ge 0$ on each edge. A **flow** $f: E \to \mathbb{R}_{\ge 0}$ must obey two rules:

1. **Capacity:** $0 \le f(u, v) \le c(u, v)$ on every edge.
2. **Conservation:** at every vertex $u \ne s, t$, flow in = flow out, that is $\sum_{v} f(v, u) = \sum_{w} f(u, w)$.

The **value** of a flow is the net amount leaving the source:
$$\text{val}(f) = \sum_v f(s, v) - \sum_u f(u, s).$$
The goal is a flow with the largest value.

## Cuts

> **In short:** A cut is a wall between $s$ and $t$; its capacity is the total of the pipes crossing it in the $s$-to-$t$ direction.

An **$s$–$t$ cut** $(P, Q)$ splits $V$ into two sides with $s \in P$ and $t \in Q$. Its **capacity** adds up only the edges going **forward**, from $P$ to $Q$:
$$C(P, Q) = \sum_{u\in P,\ v\in Q} c(u, v).$$
Edges going back from $Q$ to $P$ don't count, and neither do edges inside one side.

## Cut invariance

> **In short:** Whatever wall you pick, the net flow crossing it equals the total flow, because nothing leaks in between.

$$\boxed{\text{for every flow } f \text{ and cut } (P, Q):\quad \text{val}(f) = f(P \to Q) - f(Q \to P)}$$

*Proof.* For each $u \in P$, write down out$(u)$ − in$(u)$ and add these up.
- For $u \ne s$ the term is 0 (conservation). For $s$ it is val$(f)$. So the sum is val$(f)$.
- Now count the same sum edge by edge. An edge with both ends in $P$ appears once as an outflow and once as an inflow, so it cancels.
- What is left is the flow on edges leaving $P$ minus the flow on edges entering $P$.

## Weak duality

> **In short:** All the flow must cross every wall, so no flow can exceed any cut's capacity.

$$\boxed{\text{val}(f) \le C(P, Q) \text{ for every flow } f \text{ and every cut } (P, Q)}$$

*Proof.* $\text{val}(f) = f(P\to Q) - f(Q \to P) \le f(P \to Q) \le C(P, Q)$. The first step uses $f \ge 0$ and the second the capacity rule.

**Certificate of optimality.** Suppose a flow $f^*$ and a cut $(P^*, Q^*)$ have $\text{val}(f^*) = C(P^*, Q^*)$. Then $f^*$ is a maximum flow **and** $(P^*, Q^*)$ is a minimum cut: every flow is $\le C(P^*,Q^*) = \text{val}(f^*)$, and every cut is $\ge \text{val}(f^*) = C(P^*,Q^*)$. So to prove a flow is optimal in an exam, **show one cut** with the same capacity (CT I Q1.2, 2 marks).

# Learn: Ford–Fulkerson

## Why plain greedy fails

> **In short:** Pushing flow along any path can block better routes, so we need a way to take flow back.

The greedy idea "find any $s$–$t$ path with spare room, push as much as it allows, repeat" can get stuck. **Diamond example:** edges $s\to u, s\to v, u\to v, u \to t, v \to t$, all of capacity 1. If greedy first sends 1 along $s \to u \to v \to t$, then $s\to u$ and $v \to t$ are full and no path with spare room is left, so it stops at value 1. The best is 2 ($s\to u\to t$ and $s \to v\to t$). Greedy needs a way to **undo** flow.

Practice set Problem 1(a) teaches the same lesson: "every $s$–$t$ path has a full edge" does **not** mean the flow is maximum.

## The residual graph

> **In short:** It shows what you can still do: add flow on edges with spare room, or cancel flow already sent.

Given a flow $f$, the **residual graph** $G_f$ has, for each edge $(u, v) \in E$:

- a **forward** edge $(u, v)$ with residual capacity $c_f(u, v) = c(u, v) - f(u, v)$, if that is positive (room to add more);
- a **backward** edge $(v, u)$ with $c_f(v, u) = f(u, v)$, if that is positive (room to cancel what was sent).

Pushing $\Delta$ along a backward edge $(v, u)$ means **lowering** $f(u, v)$ by $\Delta$.

## The algorithm

> **In short:** Find a path in the residual graph, push as much as it allows, repeat until no path is left.

```
FordFulkerson(G, s, t):
    f(e) ← 0 for every edge
    while there is an s–t path p in G_f:
        Δ ← min over edges of p of c_f(e)          // bottleneck, > 0
        for each edge (u, v) of p:
            if forward:  f(u, v) ← f(u, v) + Δ
            if backward: f(v, u) ← f(v, u) − Δ
    return f
```

Each augmentation keeps $f$ a valid flow. Capacities hold because of how $\Delta$ is chosen. At each inner vertex of $p$, the path changes one incoming and one outgoing amount by the same $\Delta$ in a way that keeps in = out. The value goes up by $\Delta$, because the first edge of $p$ leaves $s$ and a simple path never comes back to $s$.

## Max-flow min-cut theorem

> **In short:** When no augmenting path remains, the vertices you can still reach form a cut that the flow fills completely, so flow = cut.

$$\boxed{\max_f \text{val}(f) = \min_{(P,Q)} C(P, Q)}$$

*Proof, using what the algorithm stops with.* When Ford–Fulkerson stops, let $P^*$ be the set of vertices reachable from $s$ in $G_f$, and $Q^* = V \setminus P^*$.

1. $s \in P^*$, and $t \in Q^*$ (otherwise there would still be an augmenting path). So $(P^*, Q^*)$ is an $s$–$t$ cut.
2. Take an edge $(u, v)$ going forward, $u \in P^*$, $v \in Q^*$. Its forward residual edge must be missing, or $v$ would be reachable. So $f(u, v) = c(u, v)$: the edge is **full**.
3. Take an edge $(v, u)$ going backward, $v \in Q^*$, $u \in P^*$. Its backward residual edge $(u, v)$ must be missing, so $f(v, u) = 0$: the edge is **empty**.
4. By cut invariance, $\text{val}(f) = \sum_{P^*\to Q^*} c - 0 = C(P^*, Q^*)$.

By the certificate, $f$ is a maximum flow and $(P^*, Q^*)$ is a minimum cut. This also shows **three conditions are equivalent**: $f$ is maximum $\iff$ $G_f$ has no $s$–$t$ path $\iff$ $\text{val}(f) = C(P, Q)$ for some cut.

**Finding a min cut** once you have a max flow: run BFS or DFS from $s$ in $G_f$; $P^*$ is everything you reach. (In CT I both $P^* = \{s\}$ and $P^* = V\setminus\{t\}$ were accepted, since both cuts had capacity 16.)

## Worked example (Lecture 16)

Edges: $s\to a$ 7, $s\to b$ 8, $a\to c$ 4, $a\to d$ 5, $c \to d$ 2, $c\to t$ 5, $b \to d$ 4, $d\to t$ 6 (plus a capacity-3 edge between $a$ and $b$ that is never used).

| Iteration | Augmenting path in $G_f$ | $\Delta$ | Value | Note |
|---|---|---|---|---|
| 1 | $s\to a\to c\to d\to t$ | 2 | 2 | $c\to d$ saturated; back edge $d\to c$ appears |
| 2 | $s\to b\to d\to t$ | 4 | 6 | $b\to d$, $d\to t$ saturated |
| 3 | $s\to a\to c\to t$ | 2 | 8 | $a\to c$ saturated |
| 4 | $s\to a\to d\to c\to t$ | 2 | 10 | uses back edge $d\to c$: $f(c,d)$ drops 2 → 0 |

Now, in $G_f$, $s$ reaches $a$ (residual 1), $b$ (residual 4) and $d$ (through $a\to d$, residual 3). From $d$ there is nowhere new to go: $d\to t$ is full, and $f(c, d) = 0$, so there is no back edge $d\to c$. From $a$, the edge $a\to c$ is full. So $c$ and $t$ can't be reached. $P^* = \{s, a, b, d\}$ and $Q^* = \{c, t\}$. The forward edges across are $a \to c$ (4) and $d\to t$ (6), so $C = 10 = \text{val}(f)$. The flow is maximum.

## Integrality

> **In short:** With whole-number capacities every step pushes a whole number, so the final flow is whole numbers too.

$$\boxed{\text{if all capacities are integers, there is a maximum flow with every } f(e) \text{ an integer}}$$

*Proof.* Ford–Fulkerson starts with all flows 0. If all flows are integers, so are all residual capacities, so $\Delta$ is an integer and the flows stay integers (induction on iterations). The algorithm stops at a maximum flow.

It does **not** say that every maximum flow is integral (practice set Problem 5(c): split one unit as $\frac12 + \frac12$ over two paths). Whenever you turn a flow into a matching, a set of paths or a 0/1 choice, **cite this theorem**. The rubric gives a mark for it.

## Running time

> **In short:** Each step adds at least 1 unit, so the number of steps can be as large as the flow value itself.

With integer capacities each augmentation adds $\Delta \ge 1$. So there are at most $\lvert f^*\rvert$ augmentations, each found by BFS or DFS in $O(m)$: **$O(m\lvert f^*\rvert)$** in total. That is only pseudo-polynomial. With capacities like $10^9$ and unlucky paths that keep crossing a capacity-1 middle edge back and forth, it can take $2\cdot10^9$ iterations. With irrational capacities it might never stop.

## Edmonds–Karp: shortest augmenting paths

> **In short:** Always taking a shortest path makes the distances grow, which bounds the number of steps independently of the capacities.

Always augment along a **shortest** path in $G_f$ (fewest edges, found by BFS).

$$\boxed{\text{Edmonds–Karp makes } O(nm) \text{ augmentations, so runs in } O(nm^2)}$$

*Proof sketch.*
1. **Distances never shrink.** For every $v$, the BFS distance $d_f(s, v)$ never decreases. The only new residual edges are reverses of edges on a shortest path. Those go from distance $i+1$ back to $i$, so they cannot create shortcuts.
2. **Each edge is the bottleneck $O(n)$ times.** An edge $(u, v)$ is **critical** when it is the bottleneck and disappears from $G_f$; at that moment $d(v) = d(u) + 1$. Before it can be critical again, the reverse edge $(v, u)$ must be used, which needs $d'(u) = d'(v) + 1 \ge d(v) + 1 = d(u) + 2$. So $d(u)$ grows by 2 between critical moments. Distances are at most $n$, so each edge is critical $O(n)$ times.
3. **Total.** Every augmentation has a critical edge, and there are $O(m)$ residual edges, so there are $O(nm)$ augmentations, each costing $O(m)$.

**Capacity scaling** is another fix: only use paths whose bottleneck is at least $\Delta$, starting with $\Delta$ = the largest power of two $\le C_{\max}$ and halving it each phase. $O(m^2\log C_{\max})$.

## Flow decomposition

> **In short:** A 0/1 flow is a bundle of separate paths; trace them out one by one.

An integral flow of value $k$ in a unit-capacity network splits into $k$ edge-disjoint $s$–$t$ paths (plus maybe some cycles). Start at $s$ and follow edges with $f = 1$. By conservation, whenever you enter a vertex you can leave it again, so you eventually reach $t$. Set that path's flow to zero and repeat. A cycle found on the way can be deleted without changing the value (practice set Problem 5(d)). $O(nm)$ in total.

# Learn: reductions to max flow

Most flow questions say "design an algorithm for X". The answer always has the same shape: **build a network, prove the correspondence in both directions, cite max-flow min-cut and integrality, and give the network size and running time.** CT I marked these as construction 3, proof 2, size 1.

## Bipartite matching (Quiz II Q2.1–2.2)

> **In short:** Each left vertex can send one unit to one right vertex, so a whole-number flow is exactly a matching.

**Construction.** Vertices $L \cup R \cup \{s, t\}$. Edges: $s \to u$ with capacity 1 for each $u \in L$; $u\to v$ with capacity 1 (or $\infty$) for each graph edge $(u, v)$; $v \to t$ with capacity 1 for each $v \in R$.

**Matching → flow.** For each matched edge set $f(s,u) = f(u,v) = f(v,t) = 1$. Matched edges share no vertex, so each vertex carries at most one unit. This is a valid flow of value $\lvert M\rvert$, so max flow $\ge$ max matching.

**Flow → matching.** By **integrality**, take an integral max flow, so each unit edge carries 0 or 1. Let $M = \{(u,v) : f(u,v) = 1\}$. At $u \in L$ at most 1 unit can come in (from $s$), so at most one edge out of $u$ carries flow; the same holds at each $v \in R$. So $M$ is a matching, and its size is $\text{val}(f)$ (cut invariance on the cut $\{s\} \cup L$). So max matching $\ge$ max flow.

Ford–Fulkerson makes at most $n$ augmentations of $O(m)$ each: $O(nm)$.

## Hall's theorem via max-flow min-cut (Quiz II Q2.3)

> **In short:** Hall's condition makes every finite cut at least $\lvert L\rvert$, so the max flow covers all of $L$.

Use the network above with **$c(u, v) = \infty$** on the middle edges.

($\Rightarrow$) A matching covering $L$ sends the vertices of $S$ to different partners, all in $N(S)$, so $\lvert N(S)\rvert \ge \lvert S\rvert$.

($\Leftarrow$) The cut $(\{s\}, \text{rest})$ has capacity $\lvert L\rvert$, so the min cut is at most $\lvert L\rvert$. We show every finite cut is at least $\lvert L\rvert$. Take **any** finite cut $(A, B)$, and let $S = A \cap L$ and $T = A \cap R$.
- No $\infty$ edge can go from $A$ to $B$, so every neighbour of $S$ is in $A$: $N(S) \subseteq T$.
- The forward edges across are $s\to u$ for $u \in L\setminus S$ and $v\to t$ for $v\in T$. So, using Hall's condition at the end,
$$C(A, B) = \lvert L\setminus S\rvert + \lvert T\rvert \ge \lvert L\rvert - \lvert S\rvert + \lvert N(S)\rvert \ge \lvert L\rvert.$$

So the min cut is exactly $\lvert L\rvert$. By MFMC the max flow is $\lvert L\rvert$, and by the previous section that is a matching covering $L$.

## Edge-disjoint paths: Menger's theorem (CT I Q3)

> **In short:** With capacity 1 on every edge, a flow of $k$ is $k$ paths that share no edge, and a cut is a set of edges to delete.

**Claim.** The largest number of directed $s$–$t$ paths that share no edge equals the smallest number of edges whose removal cuts $t$ off from $s$.

Give every edge capacity 1.

- **Easy direction (paths ≤ cut).** Given $k$ edge-disjoint paths, any set $F$ of edges that cuts $t$ off must contain an edge from each path. The paths share no edges, so $\lvert F\rvert \ge k$.
- **Paths → flow.** $k$ edge-disjoint paths give a 0/1 flow of value $k$.
- **Flow → paths.** By integrality take a 0/1 max flow $f^*$. Flow decomposition splits it into $\text{val}(f^*)$ edge-disjoint paths.
- **Cut → edge set.** By MFMC some cut $(P^*, Q^*)$ has $C(P^*, Q^*) = \text{val}(f^*)$. With unit capacities, this is the number of edges from $P^*$ to $Q^*$. Deleting them leaves no way out of $P^*$.

So max #paths $= \text{val}(f^*) = C(P^*, Q^*) \ge$ smallest cutting set $\ge$ max #paths, and all of these are equal.

**Algorithm.** Max flow with unit capacities: at most $n - 1$ augmentations (the value is at most the out-degree of $s$), each $O(m)$, so $O(nm)$. Then decompose in $O(nm)$.

**Vertex-disjoint paths:** split each vertex (next section) with capacity 1, then use the same argument.

## Vertex capacities (CT I Q2)

> **In short:** Turn each vertex into an entry and an exit joined by one edge that carries the vertex's limit.

Each vertex $v \ne s, t$ has a capacity $c(v)$ on the total flow passing through it.

**Construction.** Split each $v$ into $v_{\text{in}}$ and $v_{\text{out}}$, joined by an edge $(v_{\text{in}}, v_{\text{out}})$ with capacity $c(v)$. Each original edge $(u, v)$ becomes $(u_{\text{out}}, v_{\text{in}})$ with capacity $c(u, v)$. $s$ and $t$ are not split: $s$ plays $s_{\text{out}}$ and $t$ plays $t_{\text{in}}$.

**Correctness.** Every edge into $v$ now enters $v_{\text{in}}$, and the only way out of $v_{\text{in}}$ is the internal edge. By conservation at $v_{\text{in}}$, $\sum_u f(u, v) = f(v_{\text{in}}, v_{\text{out}}) \le c(v)$. In the same way, everything leaving $v$ goes out of $v_{\text{out}}$. So flows in $G$ that respect the vertex capacities match up one-to-one, with the same value, with flows in $G'$. A max flow in $G'$ is therefore a max flow in $G$.

**Size and time.** $\lvert V'\rvert = 2n - 2$ and $\lvert E'\rvert = m + n - 2$. Run any max-flow algorithm on $G'$, for example Edmonds–Karp in $O(n m^2)$ up to constants.

## Many sources and sinks (Lecture 15 exercise)

> **In short:** Add one super-source feeding all sources and one super-sink collecting from all sinks.

Add a super-source $s^*$ with edges $s^* \to s_i$ of capacity $\infty$ (or the supply of $s_i$), and a super-sink $t^*$ with edges $t_j \to t^*$. Flows in the two networks match up one-to-one.

## Circulations with demands and lower bounds (Lecture 15 exercise)

> **In short:** Send the required minimums first, then use max flow to fix the imbalances they leave.

Each vertex has a demand $d(v)$ (negative means it supplies, positive means it needs), with $\sum_v d(v) = 0$. Find $f$ with $0 \le f \le c$ and in − out $= d(v)$ at every vertex. Add $s^*$ with edges $s^* \to v$ of capacity $-d(v)$ for suppliers, and edges $v\to t^*$ of capacity $d(v)$ for vertices with demand. A feasible circulation exists iff the max flow fills all of these edges, that is, equals $D = \sum_{d(v)>0} d(v)$.

**Lower bounds** $\ell(e) \le f(e)$: first send $\ell(e)$ along each edge. Then set $c'(e) = c(e) - \ell(e)$ and adjust the demands to $d'(v) = d(v) - (\text{in}_\ell(v) - \text{out}_\ell(v))$. Solve the demand problem with $c'$, then add $\ell$ back.

## Project selection / maximum-weight closure (Lecture 15 exercise)

> **In short:** Infinite edges stop a cut from separating a project from its prerequisite, so a min cut is a legal plan, and the cheapest cut is the most profitable plan.

Projects have profits $p_i$ (possibly negative) and prerequisites "$i$ requires $j$". Choose a set of projects that includes all prerequisites of its members (a closed set) with the largest total profit.

**Construction.** $s \to i$ with capacity $p_i$ if $p_i > 0$; $i \to t$ with capacity $-p_i$ if $p_i < 0$; and $i \to j$ with capacity $\infty$ for each "$i$ requires $j$".

**Claim.** For a cut $(A, B)$, the set $A \setminus \{s\}$ is closed iff $C(A, B) < \infty$, and then $C(A, B) = \sum_{p_i > 0} p_i - \text{profit}(A \setminus\{s\})$.
- A finite cut has no $\infty$ edge leaving $A$, so no chosen project has an unchosen prerequisite.
- Its capacity is the positive profits **not** taken plus the costs that **are** taken.

So the min cut gives the most profitable closed set, with profit $= \sum_{p_i>0}p_i - $ min cut.

## Fewest removable edges to cut $s$ from $t$ (practice set Problem 3)

Give removable edges capacity 1 and protected edges capacity $\lvert E\rvert + 1$. If $t$ can be reached from $s$ using protected edges only, the answer is "impossible". Otherwise, let $P_0$ be the set reachable along protected edges; it gives a cut of capacity $\le \lvert E\rvert$ that uses only removable edges. So no min cut uses a protected edge, and the min cut capacity is the answer. The full solution is on the practice page.

## Matrix rounding (Lecture 15 exercise)

> **In short:** The real matrix is a fractional flow; integrality turns it into a whole-number one with the same row and column limits.

**Problem.** $A = (a_{ij})$ is an $m\times n$ matrix of non-negative reals with row sums $R_i$ and column sums $C_j$. Find an integer matrix $B$ where each $b_{ij}$ is $\lfloor a_{ij}\rfloor$ or $\lceil a_{ij}\rceil$, each row sum is $\lfloor R_i\rfloor$ or $\lceil R_i\rceil$, and each column sum is $\lfloor C_j\rfloor$ or $\lceil C_j\rceil$.

**Construction (a circulation with lower and upper bounds).** Vertices $s$, $t$, rows $r_1..r_m$, columns $c_1..c_n$.

| Edge | Lower bound | Upper bound |
|---|---|---|
| $s\to r_i$ | $\lfloor R_i\rfloor$ | $\lceil R_i\rceil$ |
| $r_i\to c_j$ | $\lfloor a_{ij}\rfloor$ | $\lceil a_{ij}\rceil$ |
| $c_j\to t$ | $\lfloor C_j\rfloor$ | $\lceil C_j\rceil$ |
| $t\to s$ (return edge) | $\lfloor\sum_i R_i\rfloor$ | $\lceil\sum_i R_i\rceil$ |

Every demand is 0 (it is a circulation).

**A fractional circulation exists.** Set $f(s, r_i) = R_i$, $f(r_i, c_j) = a_{ij}$, $f(c_j, t) = C_j$ and $f(t, s) = \sum_{i,j} a_{ij}$. Every value lies between its floor and ceiling. Conservation holds: at $r_i$, in $= R_i = \sum_j a_{ij} =$ out; at $c_j$, in $= \sum_i a_{ij} = C_j =$ out; at $s$ and $t$ both sides equal the total.

**An integral one exists.** All the bounds are integers. A circulation with lower bounds reduces (previous section) to a max-flow problem with integer capacities, which fills its source edges exactly when a circulation exists. The fractional circulation shows one does. By the **integrality theorem** that max flow can be taken integral, and it converts back into an integral circulation $f^*$.

**Read off the rounding.** $b_{ij} = f^*(r_i, c_j)$ is an integer between $\lfloor a_{ij}\rfloor$ and $\lceil a_{ij}\rceil$. By conservation at $r_i$, row $i$ of $B$ sums to $f^*(s, r_i)$, which lies in $[\lfloor R_i\rfloor, \lceil R_i\rceil]$. Likewise column $j$ sums to $f^*(c_j, t) \in [\lfloor C_j\rfloor, \lceil C_j\rceil]$. So a consistent rounding always exists, and max flow finds it in polynomial time.

## Min vertex cover in a bipartite graph (König, via flow)

> **In short:** Read the cover off the min cut of the matching network.

Use the unit network with $\infty$ middle edges. A finite cut $(A, B)$ corresponds to the cover $(L\cap B) \cup (R \cap A)$. It is a cover because an edge $(u, v)$ with $u \in A\cap L$ forces $v \in A$ (no $\infty$ edge leaves $A$), so every edge has an endpoint in the set. The cut's capacity is exactly the size of this cover, and every cover gives such a cut. So min cover = min cut = max flow = max matching.

## Practice

**MF1 (practice set Problem 5).** True or false: (a) distinct capacities ⇒ unique min cut; (b) in a max flow with min cut $(P, Q)$, every edge from $Q$ to $P$ carries 0; (c) integer capacities ⇒ every max flow is integral; (d) cancelling flow around a directed cycle keeps the flow maximum.

*Solution.* (a) **False**: $s\to a$ 1, $s\to b$ 2, $a\to c$ 4, $b\to c$ 5, $c\to t$ 3. Cuts $\{s\}$ (1 + 2) and $\{s,a,b,c\}$ (3) are both minimum. (b) **True**: $\text{val}(f) = f(P\to Q) - f(Q\to P) \le C(P,Q) - f(Q\to P)$ and $\text{val}(f) = C(P,Q)$, so $f(Q\to P) \le 0$. (c) **False**: $s\to a$, $a\to t$, $a\to b$, $b\to t$ all capacity 1; send $\frac12$ on each route from $a$. (d) **True**: lowering each cycle edge by $\delta$ keeps capacities and conservation (each cycle vertex loses $\delta$ in and $\delta$ out), and the value is unchanged.

**MF2.** Show that if every edge capacity is increased by 1, the max flow can increase by more than 1, and that if all capacities are multiplied by $\lambda > 0$, the max flow is multiplied by $\lambda$.

*Solution.* Scaling: every cut capacity scales by $\lambda$, so the min cut does, so by MFMC the max flow does. Adding 1: a cut with $k$ forward edges gains $k$. With $s \to a \to t$ and $s \to b \to t$ all capacity 1, max flow 2 becomes 4 (min cut $\{s\}$ has two edges, each +1).

**MF3 (Lecture 15, Dilworth via flow sketch).** In a DAG, the minimum number of vertex-disjoint paths covering all vertices equals $n$ minus a maximum matching in the bipartite graph $(V_{\text{out}}, V_{\text{in}})$ with an edge $u_{\text{out}}v_{\text{in}}$ per DAG edge.

*Solution.* Start with $n$ trivial paths. Each matched edge $u_{\text{out}}v_{\text{in}}$ glues the path ending at $u$ to the path starting at $v$, reducing the count by 1; matching constraints ensure each vertex has at most one successor and one predecessor, so the result is a set of disjoint paths. Conversely a path cover with $k$ paths uses $n - k$ edges, which form a matching. So min paths $= n - $ max matching.

# Learn: the Lecture 15 exercise set, solved

Lecture 15 (repeated as Lecture 17) ends with a long exercise set. The reductions in it (vertex capacities, Menger, project selection, circulations, matrix rounding) are in the previous chapter. This chapter solves the rest: the numerical warm-ups, the worst case for Ford–Fulkerson, both fixes with full proofs, the eight "packing versus covering" duality exercises, and the coal-and-steel case study.

## Numerical warm-ups

**LF1 (Lecture 15, valid flows).** The candidate flow (labels $f/c$) is $s\to a$ 5/6, $s\to b$ 4/4, $a\to b$ 2/3, $a\to c$ 3/5, $b\to c$ 6/7, $c\to t$ 8/10. (1) Check every capacity constraint. (2) Check conservation at $a$, $b$, $c$. Is it a feasible flow? (3) If not, find the defective node, the discrepancy, and a minimal fix that keeps the capacities. (4) What is $\text{val}(f)$ after the fix?

*Solution.* (1) $5 \le 6$, $4 \le 4$, $2 \le 3$, $3 \le 5$, $6 \le 7$, $8 \le 10$: every edge satisfies $0 \le f(e) \le c(e)$.

(2) Conservation, in = out:

| Node | In | Out | Verdict |
|---|---|---|---|
| $a$ | $f(s,a) = 5$ | $f(a,b) + f(a,c) = 2 + 3 = 5$ | ✓ |
| $b$ | $f(s,b) + f(a,b) = 4 + 2 = 6$ | $f(b,c) = 6$ | ✓ |
| $c$ | $f(a,c) + f(b,c) = 3 + 6 = 9$ | $f(c,t) = 8$ | ✗ |

Not feasible: conservation fails at $c$.

(3) $c$ **accumulates** 1 unit (9 in, 8 out). The smallest fix is to raise $f(c,t)$ from 8 to 9, which is allowed since $9 \le 10$. (Lowering an inflow instead, say $f(b,c)$ to 5, would break conservation at $b$ and need a second change.)

(4) $\text{val}(f) = f(s,a) + f(s,b) = 5 + 4 = 9$, which also equals the inflow to $t$, $f(c,t) = 9$, as it must.

**LF2 (Lecture 15, cut capacities with opposing and internal edges).** Edges and capacities: $s\to u$ 8, $s\to v$ 5, $u\to w$ 4, $u\to v$ 3, $v\to w$ 2, $w\to v$ 7, $w\to t$ 6, $v\to t$ 1. Find $C(P, Q)$ for $P_1 = \{s\}$, $P_2 = \{s,u,v\}$, $P_3 = \{s,u,w\}$, $P_4 = \{s,u,v,w\}$, listing forward, backward and internal edges.

*Solution.* Only **forward** edges ($P \to Q$) count toward capacity.

| $P$ | Forward ($P\to Q$) | Backward ($Q\to P$) | Internal | $C(P,Q)$ |
|---|---|---|---|---|
| $\{s\}$ | $s\to u$ 8, $s\to v$ 5 | none | none | 13 |
| $\{s,u,v\}$ | $u\to w$ 4, $v\to w$ 2, $v\to t$ 1 | $w\to v$ (7, not counted) | $s\to u$, $s\to v$, $u\to v$ | 7 |
| $\{s,u,w\}$ | $s\to v$ 5, $u\to v$ 3, $w\to v$ 7, $w\to t$ 6 | $v\to w$ (2, not counted) | $s\to u$, $u\to w$ | 21 |
| $\{s,u,v,w\}$ | $w\to t$ 6, $v\to t$ 1 | none | all other edges | 7 |

The opposing pair $v\to w$ / $w\to v$ shows the point: whichever of the two points from $P$ to $Q$ counts, the other is ignored. The min cut has capacity 7. A flow of 7 exists ($s\to u\to w\to t$ 4, $s\to v\to w\to t$ 2, $s\to v\to t$ 1), so by weak duality both are optimal.

**LF3 (Lecture 15, cut invariance with back-flow).** A flow of value 10: $f(s,a) = 7$, $f(s,b) = 3$, $f(a,b) = 2$, $f(a,t) = 5$, $f(b,t) = 5$. For $P = \{s, b\}$, $Q = \{a, t\}$: compute the flow out of $P$, the flow back into $P$, the net flow, and explain why the back-flow term matters.

*Solution.* Out of $P$: $f(s,a) + f(b,t) = 7 + 5 = 12$. Back from $Q$ into $P$: $f(a,b) = 2$. Net: $f(P,Q) = 12 - 2 = 10 = \text{val}(f)$ ✓. Without the back-flow term we would report 12, more than the 10 units that leave $s$: the 2 units on $a\to b$ cross the cut forwards (on $s\to a$) and then backwards (on $a\to b$), and are counted twice unless the backward crossing is subtracted.

**LF4 (Lecture 15, many sources and sinks, in full).** Factories $s_1..s_k$ each produce at most $S_i$; hubs $t_1..t_\ell$ each absorb at most $T_j$; intermediate nodes conserve flow. Reduce to single-source max flow, prove it, and interpret the min cut.

*Solution.* **Construction.** $V' = V \cup \{s^*, t^*\}$; add $s^* \to s_i$ with capacity $S_i$ and $t_j \to t^*$ with capacity $T_j$; keep every original edge and capacity.

**Correctness.** Given a feasible multi-source flow $f$ (each $s_i$ sends net $\le S_i$, each $t_j$ receives net $\le T_j$), set $f'(s^*, s_i)$ = net output of $s_i$ and $f'(t_j, t^*)$ = net intake of $t_j$. Capacities hold by the supply and demand limits, conservation now holds at $s_i$ and $t_j$ too, and $\text{val}(f') = \sum_i(\text{output of } s_i) = \text{val}(f)$. Conversely, restricting a flow $f'$ in $G'$ to $E$ gives a flow in which $s_i$ sends $f'(s^*, s_i) \le S_i$ and $t_j$ receives $f'(t_j, t^*) \le T_j$, of the same value. Values match both ways, so max flows correspond.

**Min cut.** If the min cut consists of the edges out of $s^*$, production is the bottleneck; if it consists of original edges, the transmission lines are.

## Ford–Fulkerson can be slow, and two fixes

**LF5 (Lecture 15, worst case for Ford–Fulkerson).** (1) Give a family $G_M$ with at most 6 vertices and 10 edges where Ford–Fulkerson (with an unlucky path choice) needs exactly $2M$ augmentations to reach the max flow $2M$. (2) Trace the first 4 augmentations. (3) For $M = 2^{60}$, how long does this take at $10^9$ operations per second?

*Solution.* (1) Vertices $s, u, v, t$; edges $s\to u$, $s\to v$, $u\to t$, $v\to t$ of capacity $M$, and a middle edge $u\to v$ of capacity 1. The max flow is $2M$ (the cut $\{s\}$ has capacity $2M$, and the two outer paths carry $M$ each).

(2) Alternate between the two paths that use the middle edge:

| Step | Path in $G_f$ | Bottleneck | Effect on $u\to v$ | Value |
|---|---|---|---|---|
| 1 | $s\to u\to v\to t$ | 1 | $f(u,v) = 1$; residual now has only the back edge $v\to u$ | 1 |
| 2 | $s\to v\to u\to t$ (back edge $v\to u$) | 1 | cancels: $f(u,v) = 0$ | 2 |
| 3 | $s\to u\to v\to t$ | 1 | $f(u,v) = 1$ again | 3 |
| 4 | $s\to v\to u\to t$ | 1 | cancelled again | 4 |

Each step pushes 1 unit and then undoes the middle edge, so the algorithm keeps "pushing and cancelling" the same bottleneck edge, and needs $2M$ augmentations. A sensible choice ($s\to u\to t$, then $s\to v\to t$) finishes in 2.

(3) $2M = 2^{61} \approx 2.3\times10^{18}$ augmentations, each scanning about 10 edges: about $2.3\times10^{19}$ operations, so $2.3\times10^{10}$ seconds, roughly 700 years. That is (just) within the age of the universe, but useless. The $O(\lvert E\rvert\lvert f^*\rvert)$ bound is **pseudo-polynomial**: it depends on the numerical value $M$, which takes only $\log M$ bits to write.

**LF6 (Lecture 15, capacity scaling).** Let $U = \max_e c(e)$ and $\Delta$ the largest power of 2 with $\Delta \le U$. In each phase augment only along paths in $G_f(\Delta)$ (residual edges with $c_f(e) \ge \Delta$); when none is left set $\Delta \leftarrow \lfloor\Delta/2\rfloor$; stop when $\Delta < 1$. (1) How many phases? (2) Prove each phase makes at most $2\lvert E\rvert$ augmentations. (3) Conclude the running time.

*Solution.* (1) $\Delta$ runs through $2^{\lfloor\log_2 U\rfloor}, \ldots, 2, 1$: $1 + \lfloor\log_2 U\rfloor = O(\log U)$ phases. The last phase has $\Delta = 1$, which is plain Ford–Fulkerson, so the algorithm ends with a max flow (integer capacities).

(2) **End of a $\Delta$-phase.** Let $A$ be the set of vertices reachable from $s$ in $G_f(\Delta)$; $t \notin A$. Every residual edge leaving $A$ has $c_f(e) < \Delta$, so the residual capacity of the cut $(A, V\setminus A)$ is less than $\lvert E\rvert\Delta$. (An original edge $(x, y)$ gives residual edges $x\to y$ and $y\to x$, and at most one of them goes from $A$ to $V\setminus A$, so at most $\lvert E\rvert$ residual edges leave $A$, each with capacity below $\Delta$.) Since any further flow must cross this cut in $G_f$, $\text{val}(f^*) - \text{val}(f) \le \lvert E\rvert\Delta$.

**The next phase** uses $\Delta/2$: each augmentation pushes at least $\Delta/2$, so it makes at most $\lvert E\rvert\Delta / (\Delta/2) = 2\lvert E\rvert$ augmentations. **The first phase** also obeys this: $\text{val}(f^*) \le C(\{s\}, V\setminus\{s\}) \le \lvert E\rvert U < 2\lvert E\rvert\Delta$, and each augmentation pushes $\ge \Delta$.

(3) $O(\log U)$ phases × $O(\lvert E\rvert)$ augmentations × $O(\lvert E\rvert)$ per BFS/DFS $= \boxed{O(\lvert E\rvert^2\log U)}$. This is **weakly polynomial**: polynomial in the input length, but it still depends (logarithmically) on the numbers.

**LF7 (Lecture 15, Edmonds–Karp in full).** Ford–Fulkerson that always augments along a shortest path (fewest edges, by BFS). Let $\delta_f(s, v)$ be the BFS distance in $G_f$. Prove (1) $\delta_f(s, v)$ never decreases; (2) each edge is critical at most $\lvert V\rvert/2$ times; (3) the total time is $O(\lvert V\rvert\lvert E\rvert^2)$.

*Solution.* (1) **Distances never decrease.** Let one augmentation turn $f$ into $f'$, and suppose some vertex got closer: $\delta'(v) < \delta(v)$. Among such vertices choose $v$ with the smallest $\delta'(v)$; $v \ne s$. Let $u$ be the vertex before $v$ on a shortest $s$–$v$ path in $G_{f'}$, so $\delta'(u) = \delta'(v) - 1$, and by the choice of $v$, $\delta'(u) \ge \delta(u)$.

- If $(u, v)$ was already an edge of $G_f$: $\delta(v) \le \delta(u) + 1 \le \delta'(u) + 1 = \delta'(v)$, contradicting $\delta'(v) < \delta(v)$.
- If $(u, v)$ is new in $G_{f'}$: it appeared because the augmentation pushed flow along $(v, u)$, which lies on a shortest path in $G_f$, so $\delta(u) = \delta(v) + 1$. Then $\delta(v) = \delta(u) - 1 \le \delta'(u) - 1 = \delta'(v) - 2 < \delta'(v)$, again a contradiction.

(2) **Critical edges.** $(u, v)$ is **critical** if it is the bottleneck, $c_f(u,v) = \Delta$; it then vanishes from the residual graph. At that moment it is on a shortest path, so $\delta(v) = \delta(u) + 1$. To become critical again it must first reappear, which needs flow pushed along $(v, u)$ on a later shortest path, at a time $f''$ with $\delta''(u) = \delta''(v) + 1 \ge \delta(v) + 1 = \delta(u) + 2$ (using (1)). So between two consecutive times $(u, v)$ is critical, $\delta(u)$ grows by at least 2. Distances are at most $\lvert V\rvert - 1$ (or $\infty$ once unreachable), so $(u, v)$ is critical at most $(\lvert V\rvert - 1)/2 < \lvert V\rvert/2$ times.

(3) Every augmentation has at least one critical edge, there are at most $2\lvert E\rvert$ residual edges, so there are at most $2\lvert E\rvert\cdot\lvert V\rvert/2 = \lvert V\rvert\lvert E\rvert$ augmentations, each $O(\lvert E\rvert)$ by BFS: $\boxed{O(\lvert V\rvert\lvert E\rvert^2)}$. This is **strongly polynomial**: no dependence on the capacities at all, so it also terminates with irrational capacities.

## Packing versus covering: weak duality everywhere

Max flow ≤ min cut is one instance of a general pattern: the size of any **packing** (things that cannot share) is at most the size of any **covering** (things that must touch every packed item), because each packed item uses up a **different** covering element. The lecture's exercises:

**LF8 (Exercise 3, independent sets versus clique partitions).** If $V$ is partitioned into cliques $K_1..K_k$, show every independent set has at most one vertex from each clique, so $\alpha(G) \le k$; conclude $\alpha(G) \le \theta(G)$, the fewest cliques that partition $V$.

*Solution.* Two vertices of the same clique are adjacent, and an independent set contains no adjacent pair, so it meets each $K_i$ in at most one vertex. The $K_i$ cover $V$, so $\lvert I\rvert = \sum_i \lvert I\cap K_i\rvert \le k$. This holds for every independent set $I$ and every clique partition, so the maximum of the left side is at most the minimum of the right: $\alpha(G) \le \theta(G)$. (Equality can fail: on $C_5$, $\alpha = 2$ but $\theta = 3$.)

**LF9 (Exercise 4, intervals).** Call a set of intervals **compatible** if no two overlap, and a **clique** if they share a common point. (1) If the intervals are partitioned into $k$ cliques, show a compatible set has at most one interval from each, so max compatible $\le k$. (2) Relate this to $d$, the largest number of intervals overlapping at one point.

*Solution.* (1) Two intervals in the same clique share a point, so they overlap; a compatible set takes at most one from each clique, hence at most $k$ in total. This is LF8 for the interval graph.

(2) Read literally, "max compatible $\le d$" is **false** (two disjoint intervals have $d = 1$ and a compatible set of size 2). The correct duality pairs with (1): the greedy earliest-finish algorithm picks compatible intervals $J_1, J_2, \ldots, J_r$, and the finish points of the $J_i$ "stab" every interval (any interval not chosen overlaps some chosen $J_i$ that ends no later than it, so it contains that finish point). The intervals through each finish point form a clique, so $r$ cliques cover everything and max compatible $= r =$ min cliques: **equality** for intervals. The number $d$ belongs to the *other* duality: a point covered by $d$ intervals needs $d$ different rooms, so $d \le$ min rooms (a partition into compatible sets), and interval partitioning shows min rooms $= d$ (greedy chapter).

**LF10 (Exercises 5 and 6, chains, antichains and Dilworth).** In a poset, a chain has every pair comparable and an antichain has no pair comparable. Let $a(P)$ = largest antichain, $c(P)$ = fewest chains partitioning $P$. (1) Show $a(P) \le c(P)$. (2) Give a 4-element poset with equality. (3) Prove $a(P) = c(P)$ (Dilworth).

*Solution.* (1) Two elements of one chain are comparable, so an antichain has at most one element in each chain of a partition: $\lvert A\rvert \le k$ for every antichain and every chain partition, so $a(P) \le c(P)$.

(2) $P = \{a, b, c, d\}$ with $a \prec b$ and $c \prec d$ only. Chains $\{a, b\}$, $\{c, d\}$ give $c(P) \le 2$; $\{a, c\}$ is an antichain, so $a(P) \ge 2$; with (1), $a(P) = c(P) = 2$.

(3) **Dilworth via König.** Build a bipartite graph with left copies $x^-$ and right copies $x^+$ of each element, and an edge $x^-y^+$ whenever $x \prec y$.

- **Matching → chains.** A matching $M$ says "$y$ follows $x$" for each edge $x^-y^+$; each element has at most one successor and one predecessor, and by transitivity following the edges gives chains. Each matched edge merges two chains, so there are $n - \lvert M\rvert$ chains: $c(P) \le n - \nu$, with $\nu$ the maximum matching.
- **Cover → antichain.** By König there is a vertex cover $C$ with $\lvert C\rvert = \nu$. Let $A$ be the elements $x$ with neither $x^-$ nor $x^+$ in $C$; then $\lvert A\rvert \ge n - \lvert C\rvert = n - \nu$. If $x \prec y$ were both in $A$, the edge $x^-y^+$ would be uncovered. So $A$ is an antichain: $a(P) \ge n - \nu$.

So $c(P) \le n - \nu \le a(P) \le c(P)$, and all are equal. (MF3 above is the same argument for path covers of a DAG.)

**LF11 (Exercises 7 and 8, set packing versus hitting sets; paths versus cuts).** (1) A packing is a family of pairwise disjoint sets from $\mathcal{S}$; a hitting set $H$ meets every set of $\mathcal{S}$. Show $\lvert\mathcal{P}\rvert \le \lvert H\rvert$. (2) If $P_1..P_k$ are edge-disjoint $s$–$t$ paths and $C$ is an $s$–$t$ cut (a set of edges whose removal disconnects $t$ from $s$), show $k \le \lvert C\rvert$, and compare with matchings and vertex covers.

*Solution.* (1) For each set $S \in \mathcal{P}$ pick an element $h_S \in S \cap H$ (exists since $H$ hits $S$). The sets in $\mathcal{P}$ are disjoint, so the $h_S$ are distinct: $S \mapsto h_S$ is an injection from $\mathcal{P}$ into $H$, so $\lvert\mathcal{P}\rvert \le \lvert H\rvert$. Weak duality: every packing is at most every cover, hence max packing ≤ min hitting set.

(2) Each path $P_i$ goes from $s$ to $t$, so removing $C$ breaks it: $P_i$ contains an edge $e_i \in C$. The paths share no edges, so $e_1..e_k$ are distinct and $k \le \lvert C\rvert$. Same shape as **matching ≤ vertex cover**: each matching edge needs its own cover vertex (two matching edges share no endpoint). In both cases max flow–min cut (Menger, König) upgrades the inequality to an equality.

## Two commodities: why the flow toolkit stops working

**LF12 (Lecture 15 case study, coal and steel).** Coal goes from $s_1$ to $t_1$, steel from $s_2$ to $t_2$, 3 trains a day each, on shared tracks: $s_1\to j_1$ 3, $s_2\to j_1$ 1, $s_2\to j_2$ 3, $j_1\to j_2$ 2, $j_1\to t_1$ 3, $j_2\to t_2$ 3, $j_2\to t_1$ 1. Coal and steel together may not exceed a track's capacity. (1) Why not join $s_1, s_2$ to a super-source and $t_1, t_2$ to a super-sink? (2) Does "route as much coal as possible, then steel in what is left" work? (3) Can steel simply push coal backwards, as residual edges do?

*Solution.* (1) Flow has no identity: a single max flow could send coal-origin units into $t_2$ and steel-origin units into $t_1$ (the super-sink only counts totals). Keeping them apart needs **conservation per commodity** at every vertex: $\sum_u f_i(u,v) = \sum_w f_i(v,w)$ for $i = 1, 2$ separately, with the shared constraint $f_1(e) + f_2(e) \le c(e)$. That is a multicommodity flow, not a max flow.

In this network the demands can be met: coal on $s_1\to j_1\to t_1$ (3) and steel on $s_2\to j_2\to t_2$ (3) use disjoint tracks.

(2) **Not in general.** The first phase is free to choose any max coal flow, and a bad choice can block steel. A small example: tracks $s_1\to u$, $u\to v$, $v\to t_1$, $s_1\to t_1$, $s_2\to u$, $v\to t_2$, all capacity 1, demands 1 each. If phase 1 routes its coal unit along $s_1\to u\to v\to t_1$, the shared track $u\to v$ is full and steel cannot move; routing coal on $s_1\to t_1$ instead lets steel use $s_2\to u\to v\to t_2$ and meets both demands. Maximising coal greedily also takes both coal routes and leaves steel nothing.

(3) **No.** A residual back edge cancels flow *of the same commodity*, and conservation repairs itself because any unit is as good as any other. If steel "cancels" coal on $u\to v$, the cancelled coal unit is stranded at $u$; coal must **simultaneously** be rerouted along a completely different $s_1$–$t_1$ path ($s_1\to t_1$ above). One local undo becomes a global, coordinated change to another commodity's routing, which augmenting paths cannot express. That is why multicommodity flow is fundamentally harder: it is solved by linear programming, there is no max-flow min-cut equality in general, and integral multicommodity flow is NP-hard.

## Textbook exercises the lectures assigned (KT 7)

**LF13 (KT 7.4).** True or false: if $f$ is a maximum $s$–$t$ flow (positive integer capacities), then $f$ saturates every edge out of $s$.

*Solution.* **False.** $s\to a$ capacity 10, $a\to t$ capacity 1: the max flow is 1 and $s\to a$ carries 1 of 10.

**LF14 (KT 7.5).** True or false: if $(A, B)$ is a minimum $s$–$t$ cut, it remains a minimum cut after adding 1 to every capacity.

*Solution.* **False.** A cut's capacity grows by its **number of forward edges**, so a min cut with many edges can be overtaken by one with few. Edges $s\to u$ (4), $u\to a$, $u\to b$, $u\to c$ (1 each), and $a\to t$, $b\to t$, $c\to t$ (5 each). The min cut is $(\{s,u\}, \text{rest})$ with capacity $1+1+1 = 3$; the cut $(\{s\}, \text{rest})$ has 4. After adding 1 everywhere they become $2+2+2 = 6$ and $5$, so $(\{s,u\}, \cdot)$ is no longer minimum. (Multiplying every capacity by $\lambda > 0$, by contrast, keeps every min cut minimum: MF2.)
