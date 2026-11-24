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

A matrix of reals whose row and column sums are integers can be rounded (each entry up or down) keeping every row and column sum. Network: $s \to$ row $i$ with capacity = row sum, row $i \to$ column $j$ with lower bound $\lfloor a_{ij}\rfloor$ and capacity $\lceil a_{ij}\rceil$, column $j \to t$ with capacity = column sum. The original matrix is a feasible (fractional) flow; by integrality an integral one exists, which is the rounding.

## Min vertex cover in a bipartite graph (König, via flow)

Unit network with $\infty$ middle edges. A finite cut $(A, B)$ corresponds to the cover $(L\cap B) \cup (R \cap A)$: an edge $(u, v)$ with $u \in A\cap L$ forces $v \in A$ (no $\infty$ edge leaves $A$), so every edge has an endpoint in the set. Its capacity is exactly the size of that cover, and conversely each cover gives such a cut. So min cover = min cut = max flow = max matching.

## Practice

**MF1 (practice set Problem 5).** True or false: (a) distinct capacities ⇒ unique min cut; (b) in a max flow with min cut $(P, Q)$, every edge from $Q$ to $P$ carries 0; (c) integer capacities ⇒ every max flow is integral; (d) cancelling flow around a directed cycle keeps the flow maximum.

*Solution.* (a) **False**: $s\to a$ 1, $s\to b$ 2, $a\to c$ 4, $b\to c$ 5, $c\to t$ 3. Cuts $\{s\}$ (1 + 2) and $\{s,a,b,c\}$ (3) are both minimum. (b) **True**: $\text{val}(f) = f(P\to Q) - f(Q\to P) \le C(P,Q) - f(Q\to P)$ and $\text{val}(f) = C(P,Q)$, so $f(Q\to P) \le 0$. (c) **False**: $s\to a$, $a\to t$, $a\to b$, $b\to t$ all capacity 1; send $\frac12$ on each route from $a$. (d) **True**: lowering each cycle edge by $\delta$ keeps capacities and conservation (each cycle vertex loses $\delta$ in and $\delta$ out), and the value is unchanged.

**MF2.** Show that if every edge capacity is increased by 1, the max flow can increase by more than 1, and that if all capacities are multiplied by $\lambda > 0$, the max flow is multiplied by $\lambda$.

*Solution.* Scaling: every cut capacity scales by $\lambda$, so the min cut does, so by MFMC the max flow does. Adding 1: a cut with $k$ forward edges gains $k$. With $s \to a \to t$ and $s \to b \to t$ all capacity 1, max flow 2 becomes 4 (min cut $\{s\}$ has two edges, each +1).

**MF3 (Lecture 15, Dilworth via flow sketch).** In a DAG, the minimum number of vertex-disjoint paths covering all vertices equals $n$ minus a maximum matching in the bipartite graph $(V_{\text{out}}, V_{\text{in}})$ with an edge $u_{\text{out}}v_{\text{in}}$ per DAG edge.

*Solution.* Start with $n$ trivial paths. Each matched edge $u_{\text{out}}v_{\text{in}}$ glues the path ending at $u$ to the path starting at $v$, reducing the count by 1; matching constraints ensure each vertex has at most one successor and one predecessor, so the result is a set of disjoint paths. Conversely a path cover with $k$ paths uses $n - k$ edges, which form a matching. So min paths $= n - $ max matching.
