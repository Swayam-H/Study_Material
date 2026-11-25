# Learn: flows, cuts and duality

Max flow is the largest post-midsem topic. Class Test I was entirely max flow (an Edmonds–Karp trace and two reductions), Quiz II Q2 was matching and Hall via max-flow min-cut, and Lectures 14 to 18 plus a revision session were spent on it. The endsem will almost certainly have a trace or a reduction from this chapter. Sources: Lectures 14–18, KT ch. 7, DPV 7.2, the Moodle practice set.

## Flow networks

A **flow network** is a directed graph $G = (V, E)$ with a source $s$, a sink $t$ and capacities $c(u, v) \ge 0$. A **flow** $f: E \to \mathbb{R}_{\ge 0}$ satisfies

1. **Capacity**: $0 \le f(u, v) \le c(u, v)$ for every edge;
2. **Conservation**: $\sum_{v} f(v, u) = \sum_{w} f(u, w)$ for every $u \ne s, t$ (flow in = flow out).

The **value** is the net flow out of the source:
$$\text{val}(f) = \sum_v f(s, v) - \sum_u f(u, s).$$
Goal: a flow of maximum value.

## Cuts

An **$s$–$t$ cut** $(P, Q)$ is a partition of $V$ with $s \in P$, $t \in Q$. Its **capacity** counts only edges going **forward**, from $P$ to $Q$:
$$C(P, Q) = \sum_{u\in P,\ v\in Q} c(u, v).$$
Edges from $Q$ back to $P$ do not count, and neither do edges inside $P$ or inside $Q$.

## Cut invariance

$$\boxed{\text{for every flow } f \text{ and cut } (P, Q):\quad \text{val}(f) = f(P \to Q) - f(Q \to P)}$$

*Proof.* Sum the conservation equations (out − in) over all $u \in P$. For $u \ne s$ each term is 0; for $s$ it is val$(f)$. So $\text{val}(f) = \sum_{u\in P}(\text{out}(u) - \text{in}(u))$. An edge with both ends in $P$ appears once as an outflow and once as an inflow and cancels. What remains is the flow on edges leaving $P$ minus the flow on edges entering $P$.

## Weak duality

$$\boxed{\text{val}(f) \le C(P, Q) \text{ for every flow } f \text{ and every cut } (P, Q)}$$

*Proof.* $\text{val}(f) = f(P\to Q) - f(Q \to P) \le f(P \to Q) \le C(P, Q)$, using $f \ge 0$ and the capacity constraint.

**Certificate of optimality.** If some flow $f^*$ and cut $(P^*, Q^*)$ have $\text{val}(f^*) = C(P^*, Q^*)$, then $f^*$ is a maximum flow **and** $(P^*, Q^*)$ is a minimum cut (every flow is $\le C(P^*,Q^*) = \text{val}(f^*)$, every cut is $\ge \text{val}(f^*) = C(P^*,Q^*)$). To prove a flow is optimal in an exam, **exhibit one cut** with matching capacity (CT I Q1.2, 2 marks).

# Learn: Ford–Fulkerson

## Why plain greedy fails

Greedy "find any $s$–$t$ path with spare capacity, push the bottleneck, repeat" can get stuck. **Diamond**: edges $s\to u, s\to v, u\to v, u \to t, v \to t$, all capacity 1. If greedy first sends 1 along $s \to u \to v \to t$, then $s\to u$ and $v \to t$ are full and no path with spare capacity remains: value 1. The optimum is 2 ($s\to u\to t$ and $s \to v\to t$). Greedy needs a way to **undo** flow.

Practice set Problem 1(a) is the same lesson: "every $s$–$t$ path has a saturated edge" does **not** mean the flow is maximum.

## The residual graph

Given $f$, the **residual graph** $G_f$ has, for each edge $(u, v) \in E$:

- a **forward** edge $(u, v)$ with residual capacity $c_f(u, v) = c(u, v) - f(u, v)$ if this is positive (room to add);
- a **backward** edge $(v, u)$ with $c_f(v, u) = f(u, v)$ if this is positive (room to cancel).

Pushing $\Delta$ along a backward edge $(v, u)$ means **decreasing** $f(u, v)$ by $\Delta$.

## The algorithm

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

Each augmentation keeps $f$ feasible (capacities hold by the choice of $\Delta$; at an inner vertex of $p$, one unit "in" and one unit "out" are changed by the same $\Delta$ in a way that keeps in = out) and increases the value by $\Delta$ (the first edge of $p$ leaves $s$, and a simple path never re-enters $s$).

## Max-flow min-cut theorem

$$\boxed{\max_f \text{val}(f) = \min_{(P,Q)} C(P, Q)}$$

*Proof via the algorithm's output.* When Ford–Fulkerson stops, let $P^*$ = the vertices reachable from $s$ in $G_f$, and $Q^* = V \setminus P^*$.

1. $s \in P^*$, and $t \in Q^*$ (otherwise there would be an augmenting path). So $(P^*, Q^*)$ is an $s$–$t$ cut.
2. For an edge $(u, v)$ with $u \in P^*$, $v \in Q^*$: the forward residual edge must be absent (else $v$ would be reachable), so $f(u, v) = c(u, v)$. **Saturated.**
3. For an edge $(v, u)$ with $v \in Q^*$, $u \in P^*$: the backward residual edge $(u, v)$ must be absent, so $f(v, u) = 0$. **Empty.**
4. By cut invariance, $\text{val}(f) = \sum_{P^*\to Q^*} c - 0 = C(P^*, Q^*)$.

By the certificate, $f$ is maximum and $(P^*, Q^*)$ is a minimum cut. This also gives the **three equivalent conditions**: $f$ is maximum $\iff$ $G_f$ has no $s$–$t$ path $\iff$ $\text{val}(f) = C(P, Q)$ for some cut.

**Finding a min cut** after computing a max flow: BFS/DFS from $s$ in $G_f$; $P^*$ is what you reach. (CT I accepted both $P^* = \{s\}$ and $P^* = V\setminus\{t\}$ there, since both cuts had capacity 16.)

## Worked example (Lecture 16)

Edges: $s\to a$ 7, $s\to b$ 8, $a\to c$ 4, $a\to d$ 5, $c \to d$ 2, $c\to t$ 5, $b \to d$ 4, $d\to t$ 6 (plus a capacity-3 edge between $a$ and $b$ that stays unused).

| Iteration | Augmenting path in $G_f$ | $\Delta$ | Value | Note |
|---|---|---|---|---|
| 1 | $s\to a\to c\to d\to t$ | 2 | 2 | $c\to d$ saturated; back edge $d\to c$ appears |
| 2 | $s\to b\to d\to t$ | 4 | 6 | $b\to d$, $d\to t$ saturated |
| 3 | $s\to a\to c\to t$ | 2 | 8 | $a\to c$ saturated |
| 4 | $s\to a\to d\to c\to t$ | 2 | 10 | uses back edge $d\to c$: $f(c,d)$ drops 2 → 0 |

Now in $G_f$, $s$ reaches $a$ (residual 1), $b$ (residual 4) and $d$ (via $a\to d$, residual 3). From $d$ there is nowhere new to go: $d\to t$ is full, and $f(c, d) = 0$ so there is no back edge $d\to c$. From $a$, $a\to c$ is full. So $c$ and $t$ are unreachable. $P^* = \{s, a, b, d\}$, $Q^* = \{c, t\}$. Forward edges across: $a \to c$ (4) and $d\to t$ (6). $C = 10 = \text{val}(f)$. Maximum.

## Integrality

$$\boxed{\text{if all capacities are integers, there is a maximum flow with every } f(e) \text{ an integer}}$$

*Proof.* Ford–Fulkerson starts at 0; if all flows are integers, all residual capacities are integers, so $\Delta$ is an integer and the flows stay integers (induction on iterations). It stops at a maximum flow.

It does **not** say every maximum flow is integral (practice set Problem 5(c): split one unit as $\frac12 + \frac12$ over two paths). Whenever you turn a flow into a matching, a set of paths or a 0/1 choice, **cite this theorem** (rubric marks it explicitly).

## Running time

With integer capacities each augmentation adds $\Delta \ge 1$, so there are at most $\lvert f^*\rvert$ augmentations, each found by BFS/DFS in $O(m)$: **$O(m\lvert f^*\rvert)$**. This is pseudo-polynomial: with capacities like $10^9$ and an unlucky choice of paths that keeps crossing a capacity-1 middle edge back and forth, it can take $2\cdot10^9$ iterations. With irrational capacities it may not even terminate.

## Edmonds–Karp: shortest augmenting paths

Always augment along a **shortest** path in $G_f$ (fewest edges, found by BFS).

$$\boxed{\text{Edmonds–Karp makes } O(nm) \text{ augmentations, so runs in } O(nm^2)}$$

*Proof sketch.* (1) The BFS distance $d_f(s, v)$ never decreases for any $v$: new residual edges are reverses of edges on a shortest path, which go from distance $i+1$ to $i$ and cannot create shortcuts. (2) An edge $(u, v)$ is **critical** (the bottleneck, removed from $G_f$) when $d(v) = d(u) + 1$. For it to be critical again, $(v, u)$ must first be used, which needs $d'(u) = d'(v) + 1 \ge d(v) + 1 = d(u) + 2$. So each time an edge is critical again, $d(u)$ has grown by 2; distances are at most $n$, so each edge is critical $O(n)$ times. Every augmentation has a critical edge, and there are $O(m)$ residual edges: $O(nm)$ augmentations, each $O(m)$.

**Capacity scaling** is the other fix: only augment along paths with bottleneck $\ge \Delta$, halving $\Delta$ from the largest power of two $\le C_{\max}$; $O(m^2\log C_{\max})$.

## Flow decomposition

An integral flow of value $k$ on a unit-capacity network decomposes into $k$ edge-disjoint $s$–$t$ paths (plus cycles): follow edges with $f = 1$ from $s$; by conservation you can always leave a vertex you entered, until you reach $t$; zero out that path and repeat. A cycle found on the way can be deleted without changing the value (practice set Problem 5(d)). $O(nm)$ total.

# Learn: reductions to max flow

Most flow questions are "design an algorithm for X". The answer is always: **build a network, prove the correspondence both ways, cite max-flow min-cut and integrality, give the size and time.** CT I marked these as construction 3 / proof 2 / size 1.

## Bipartite matching (Quiz II Q2.1–2.2)

**Construction.** $V' = L \cup R \cup \{s, t\}$; edges $s \to u$ (capacity 1) for $u \in L$, $u\to v$ (capacity 1, or $\infty$) for each edge $(u, v)$, $v \to t$ (capacity 1) for $v \in R$.

**Matching → flow.** For each matched edge set $f(s,u) = f(u,v) = f(v,t) = 1$. Disjointness means each vertex carries at most one unit: feasible, value $\lvert M\rvert$. So max flow $\ge$ max matching.

**Flow → matching.** By **integrality** take an integral max flow, so every $f(e) \in \{0, 1\}$ on the unit edges. Let $M = \{(u,v) : f(u,v) = 1\}$. At $u \in L$ inflow is at most $c(s, u) = 1$, so at most one edge leaves $u$ with flow; symmetrically at $v \in R$. So $M$ is a matching of size $\text{val}(f)$ (cut invariance on the cut $\{s\} \cup L$). So max matching $\ge$ max flow.

Ford–Fulkerson takes at most $n$ augmentations of $O(m)$: $O(nm)$.

## Hall's theorem via max-flow min-cut (Quiz II Q2.3)

Use the network above with **$c(u, v) = \infty$** on the middle edges.

($\Rightarrow$) A matching covering $L$ sends each $u\in S$ to a distinct partner in $N(S)$, so $\lvert N(S)\rvert \ge \lvert S\rvert$.

($\Leftarrow$) The cut $(\{s\}, \text{rest})$ has capacity $\lvert L\rvert$, so the min cut is $\le \lvert L\rvert$. Take **any** finite cut $(A, B)$; let $S = A \cap L$, $T = A \cap R$. No $\infty$ edge goes from $A$ to $B$, so every neighbour of $S$ is in $A$: $N(S) \subseteq T$. The edges crossing forward are $s\to u$ for $u \in L\setminus S$ and $v\to t$ for $v\in T$:
$$C(A, B) = \lvert L\setminus S\rvert + \lvert T\rvert \ge \lvert L\rvert - \lvert S\rvert + \lvert N(S)\rvert \ge \lvert L\rvert,$$
using Hall's condition. So the min cut is exactly $\lvert L\rvert$, and by MFMC the max flow is $\lvert L\rvert$; by the previous part this is a matching covering $L$.

## Edge-disjoint paths: Menger's theorem (CT I Q3)

**Claim.** The maximum number of pairwise edge-disjoint directed $s$–$t$ paths equals the minimum number of edges whose removal disconnects $t$ from $s$.

Give every edge capacity 1.

- **Weak direction (paths ≤ cut).** $k$ edge-disjoint paths: any disconnecting set $F$ must contain an edge of each path, and the paths share no edges, so $\lvert F\rvert \ge k$.
- **Paths → flow.** $k$ edge-disjoint paths give a 0/1 flow of value $k$.
- **Flow → paths.** By integrality take a 0/1 max flow $f^*$; flow decomposition gives $\text{val}(f^*)$ edge-disjoint paths.
- **Cut → edge set.** By MFMC some cut $(P^*, Q^*)$ has $C(P^*, Q^*) = \text{val}(f^*)$; with unit capacities this is the number of edges from $P^*$ to $Q^*$, and deleting them leaves no path out of $P^*$.

So max #paths $= \text{val}(f^*) = C(P^*, Q^*) \ge$ min disconnecting set $\ge$ max #paths: all equal.

**Algorithm.** Max flow with unit capacities: at most $n - 1$ augmentations (the value is at most $\deg^+(s)$), each $O(m)$, so $O(nm)$; then decompose in $O(nm)$.

**Vertex-disjoint paths**: split vertices (next) with capacity 1, then the same argument.

## Vertex capacities (CT I Q2)

Each vertex $v \ne s, t$ has capacity $c(v)$ on the total flow through it.

**Construction.** Split each $v$ into $v_{\text{in}}$ and $v_{\text{out}}$ joined by an edge $(v_{\text{in}}, v_{\text{out}})$ of capacity $c(v)$. Every original edge $(u, v)$ becomes $(u_{\text{out}}, v_{\text{in}})$ with capacity $c(u, v)$ ($s$ and $t$ are not split: $s$ acts as $s_{\text{out}}$, $t$ as $t_{\text{in}}$).

**Correctness.** All edges into $v$ now enter $v_{\text{in}}$, whose only exit is the internal edge; by conservation at $v_{\text{in}}$, $\sum_u f(u, v) = f(v_{\text{in}}, v_{\text{out}}) \le c(v)$. Similarly everything leaving goes out of $v_{\text{out}}$. So flows in $G$ satisfying vertex capacities correspond one-to-one (same value) to flows in $G'$; a max flow in $G'$ is a max flow in $G$.

**Size and time.** $\lvert V'\rvert = 2n - 2$, $\lvert E'\rvert = m + n - 2$. Any max-flow algorithm on $G'$, e.g. Edmonds–Karp in $O(n m^2)$ up to constants.

## Many sources and sinks (Lecture 15 exercise)

Add a super-source $s^*$ with edges $s^* \to s_i$ of capacity $\infty$ (or the supply of $s_i$), and a super-sink $t^*$ with $t_j \to t^*$. Flows correspond one-to-one.

## Circulations with demands and lower bounds (Lecture 15 exercise)

Demands $d(v)$ (negative = supply, positive = demand), $\sum_v d(v) = 0$; find $f$ with $0 \le f \le c$ and in − out $= d(v)$. Add $s^*$ with edges $s^* \to v$ of capacity $-d(v)$ for suppliers, and $v\to t^*$ of capacity $d(v)$ for demanders. A feasible circulation exists iff the max flow saturates all of them, i.e. equals $D = \sum_{d(v)>0} d(v)$.

**Lower bounds** $\ell(e) \le f(e)$: pre-send $\ell(e)$ on each edge. Set $c'(e) = c(e) - \ell(e)$ and adjust demands: $d'(v) = d(v) - (\text{in}_\ell(v) - \text{out}_\ell(v))$. Solve the demand problem on $c'$, then add $\ell$ back.

## Project selection / maximum-weight closure (Lecture 15 exercise)

Projects with profits $p_i$ (possibly negative), and prerequisites "$i$ requires $j$". Choose a prerequisite-closed set of maximum profit.

**Construction.** $s \to i$ with capacity $p_i$ if $p_i > 0$; $i \to t$ with capacity $-p_i$ if $p_i < 0$; $i \to j$ with capacity $\infty$ for each "$i$ requires $j$".

**Claim.** For a cut $(A, B)$, $A \setminus \{s\}$ is closed iff $C(A, B) < \infty$, and then $C(A, B) = \sum_{p_i > 0} p_i - \text{profit}(A \setminus\{s\})$. (A finite cut has no $\infty$ edge leaving $A$, i.e. no chosen project with an unchosen prerequisite. Its capacity is the positive profits **not** taken plus the costs **taken**.) So the min cut gives the max-profit closed set; profit $= \sum_{p_i>0}p_i - $ min cut.

## Fewest removable edges to cut $s$ from $t$ (practice set Problem 3)

Removable edges get capacity 1; protected edges get capacity $\lvert E\rvert + 1$. If $t$ is reachable from $s$ through protected edges alone, answer "impossible". Otherwise the set $P_0$ reachable along protected edges gives a cut of capacity $\le \lvert E\rvert$ using only removable edges, so no min cut contains a protected edge, and the min cut capacity is the answer. Full solution in the practice page.

## Matrix rounding (Lecture 15 exercise)

**Problem.** $A = (a_{ij})$ is an $m\times n$ matrix of non-negative reals with row sums $R_i$ and column sums $C_j$. Find an integer matrix $B$ with every $b_{ij} \in \{\lfloor a_{ij}\rfloor, \lceil a_{ij}\rceil\}$, every row sum of $B$ in $\{\lfloor R_i\rfloor, \lceil R_i\rceil\}$ and every column sum in $\{\lfloor C_j\rfloor, \lceil C_j\rceil\}$.

**Construction (a circulation with lower and upper bounds).** Vertices $s$, $t$, rows $r_1..r_m$, columns $c_1..c_n$.

| Edge | Lower bound | Upper bound |
|---|---|---|
| $s\to r_i$ | $\lfloor R_i\rfloor$ | $\lceil R_i\rceil$ |
| $r_i\to c_j$ | $\lfloor a_{ij}\rfloor$ | $\lceil a_{ij}\rceil$ |
| $c_j\to t$ | $\lfloor C_j\rfloor$ | $\lceil C_j\rceil$ |
| $t\to s$ (return edge) | $\lfloor\sum_i R_i\rfloor$ | $\lceil\sum_i R_i\rceil$ |

All demands are 0 (it is a circulation).

**A fractional circulation exists.** Set $f(s, r_i) = R_i$, $f(r_i, c_j) = a_{ij}$, $f(c_j, t) = C_j$, $f(t, s) = \sum_{i,j} a_{ij}$. Every value lies between its floor and ceiling, and conservation holds: at $r_i$, in $= R_i = \sum_j a_{ij} =$ out; at $c_j$, in $= \sum_i a_{ij} = C_j =$ out; at $s$ and $t$, both sides equal the total.

**An integral one exists.** All bounds are integers. Feasibility of a circulation with lower bounds reduces (previous section) to a max-flow problem with integer capacities that saturates its source edges exactly when a circulation exists. The fractional circulation shows it does; by the **integrality theorem** that max flow can be taken integral, which converts back into an integral circulation $f^*$.

**Read off the rounding.** $b_{ij} = f^*(r_i, c_j)$ is an integer in $[\lfloor a_{ij}\rfloor, \lceil a_{ij}\rceil]$; row $i$ of $B$ sums to $f^*(s, r_i) \in [\lfloor R_i\rfloor, \lceil R_i\rceil]$ by conservation at $r_i$; column $j$ sums to $f^*(c_j, t) \in [\lfloor C_j\rfloor, \lceil C_j\rceil]$. So a consistent rounding always exists, and max flow finds it in polynomial time.

## Min vertex cover in a bipartite graph (König, via flow)

Unit network with $\infty$ middle edges. A finite cut $(A, B)$ corresponds to the cover $(L\cap B) \cup (R \cap A)$: an edge $(u, v)$ with $u \in A\cap L$ forces $v \in A$ (no $\infty$ edge leaves $A$), so every edge has an endpoint in the set. Its capacity is exactly the size of that cover, and conversely each cover gives such a cut. So min cover = min cut = max flow = max matching.

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
