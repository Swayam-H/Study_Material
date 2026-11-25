# Learn: greedy algorithms

A greedy algorithm builds its answer one choice at a time, always taking whatever looks best right now and never going back. Greedy algorithms are usually easy to state and hard to prove correct. The midsem gave greedy 6 of 30 marks (Huffman 2, room assignment 4), and Assignment 2 Q3 asked for $k$-ary Huffman. Sources: Lecture 10, Tutorial 3 (Huffman), DPV 5.2, KT ch. 4.

## Two ways to prove a greedy algorithm optimal

> **In short:** Either show greedy is never behind at any step, or show any optimal solution can be changed step by step into greedy's without getting worse.

1. **Greedy stays ahead.** Show by induction that after every step, greedy's partial answer is at least as good as the matching part of any other solution (interval scheduling).
2. **Exchange argument.** Take any optimal solution that differs from greedy's. Change it one step at a time to agree with greedy's choices, never making it worse. So greedy's answer is optimal too (Huffman, the MST cut property).
3. **Lower bound** (for "use as few resources as possible"): show that every solution needs at least $d$, then show greedy never uses more than $d$ (interval partitioning).

To show a greedy rule is **wrong**, one small counterexample is a complete answer (Assignment 2 Q3.1 and Q4.1).

# Learn: Huffman coding

## Prefix-free codes

> **In short:** No codeword starts another one, so a bit stream decodes in only one way. Such codes are exactly leaves of a binary tree.

A code gives each symbol a bit string, its codeword. A code is **prefix-free** if no codeword is the beginning of another. Then any stream of codewords decodes in only one way: read bits until they spell a codeword, output it, and repeat. Lecture example: with $A = 0$, $B = 10$, $C = 110$, $D = 111$, the stream 0110111 reads as $A, C, D$. With $A = 0$ and $B = 01$, the stream 01 could be $B$ or $A$ followed by something else, so it is ambiguous.

A prefix-free code is the same thing as a **binary tree with the symbols at the leaves**. The path from the root spells the codeword (left = 0, right = 1). A symbol cannot sit at an internal node, because its codeword would be a prefix of the ones below it. In an optimal code the tree is **full** (every internal node has 2 children): a node with only one child could be removed, making codewords shorter.

![Code tree](fig/aad-huffman-tree.svg)

*Figure. The lecture code $A = 0$, $B = 10$, $C = 110$, $D = 111$ as a tree: left is 0, right is 1, symbols at the leaves. With frequencies $.5, .25, .125, .125$ this is exactly the tree Huffman builds, and each internal node carries the total frequency below it.*

## The objective

> **In short:** Total bits = sum of frequency × depth, so frequent symbols should sit high in the tree.

If symbol $i$ has frequency $f_i$ and depth (codeword length) $\ell_i$, then
$$\boxed{\text{cost}(T) = \sum_i f_i \ell_i = \sum_{\text{non-root nodes } v} f(v)}$$
Here an internal node's frequency is the total frequency of the leaves below it. The two sums are equal because a leaf at depth $\ell$ is counted once for each of the $\ell$ non-root nodes on its path. Lecture 10's example: $f_1 + 2f_2 + 2f_3 = f_1 + f_2 + f_3 + (f_2 + f_3)$.

## Huffman's algorithm

> **In short:** Repeatedly merge the two rarest symbols into one.

```
Huffman(f_1..f_n):
    H ← min-priority queue of the n symbols, keyed by frequency
    repeat n − 1 times:
        x ← deletemin(H); y ← deletemin(H)
        make a new node z with children x, y and f(z) = f(x) + f(y)
        insert(H, z)
    return the single remaining node (the root)
```
There are $n - 1$ merges, each $O(\log n)$ with a heap, so **$O(n\log n)$**. (If the frequencies come already sorted, two plain queues give $O(n)$.)

## Why it is optimal

> **In short:** The two rarest symbols can always be deepest siblings, and merging them leaves a smaller problem of the same kind.

**Lemma (exchange).** If $x$ and $y$ have the two smallest frequencies, then some optimal tree has $x$ and $y$ as **siblings at the deepest level**.

*Proof.* Take an optimal full tree $T$. Because it is full, its deepest level has two sibling leaves $a, b$. Swap $x$ with $a$. Since $f_x \le f_a$ and $\ell_a \ge \ell_x$, the cost changes by $(f_a - f_x)(\ell_x - \ell_a) \le 0$: the rarer symbol moved down, the commoner one moved up. Swap $y$ with $b$ the same way. The cost did not go up, so the new tree is still optimal, and $x, y$ are now deepest siblings.

**Theorem.** Huffman's tree is optimal.

*Proof by induction on $n$.* $n = 2$ is obvious. Otherwise:
1. Replace $x$ and $y$ by one new symbol $z$ with $f_z = f_x + f_y$.
2. For any tree $T'$ on this smaller alphabet, turning leaf $z$ into a node with children $x, y$ gives a tree $T$ with $\text{cost}(T) = \text{cost}(T') + f_x + f_y$. (Both $x$ and $y$ sit one level below $z$.)
3. Huffman on $n$ symbols is "merge $x, y$, then run Huffman on the smaller alphabet". By induction that second part is optimal.
4. By the lemma, some optimal tree on $n$ symbols has $x, y$ as siblings, and merging them gives a tree on the smaller alphabet. So $\text{OPT}_n = \text{OPT}_{n-1} + f_x + f_y$, which is exactly the cost Huffman gets.

## Kraft's inequality (Lecture 10 exercise)

> **In short:** A codeword of length $\ell$ uses up a $2^{-\ell}$ share of all bit strings, and the shares cannot add to more than 1.

For any prefix-free binary code with lengths $\ell_1, \ldots, \ell_m$:
$$\boxed{\sum_{i=1}^m 2^{-\ell_i} \le 1}$$

*Proof.* Let $L = \max \ell_i$. A codeword of length $\ell_i$ is the beginning of exactly $2^{L - \ell_i}$ strings of length $L$. Since no codeword is a prefix of another, these groups of strings don't overlap. There are only $2^L$ strings of length $L$, so $\sum_i 2^{L-\ell_i} \le 2^L$. Divide by $2^L$.

Another way to see it: walk down the tree from the root, flipping a fair coin at each node to pick left or right. You reach leaf $i$ with probability $2^{-\ell_i}$, and these events can't happen together, so the probabilities add to at most 1. Equality holds exactly for full trees.

## $k$-ary Huffman (Assignment 2 Q3)

> **In short:** Every merge must take exactly $k$ nodes, so pad with zero-frequency dummies first.

With $k$ code symbols instead of 2, the tree is $k$-ary. Simply merging the $k$ smallest each time can fail.

**Counterexample:** $k = 3$, four symbols each of frequency 1. The naive method merges three 1s into a node of weight 3. Now only two nodes remain, so the root gets just 2 children. The depths are $1, 2, 2, 2$, costing $1 + 2 + 2 + 2 = 7$. Better: give the root three children, two leaves and one internal node holding the other two leaves. Depths $1, 1, 2, 2$, cost 6.

![k-ary Huffman counterexample](fig/aad-kary-huffman.svg)

*Figure. Ternary codes for four symbols of frequency 1. Merging three straight away leaves the root with only two children (cost 7). Adding one dummy of frequency 0 first puts the short-of-children node at the bottom instead (cost 6).*

**Why it fails.** Each merge turns $k$ nodes into 1, so it reduces the count by $k-1$. To end at exactly 1 node, a full $k$-ary tree with $n$ leaves needs $n - 1 \equiv 0 \pmod{k-1}$. Otherwise the **last** merge has fewer than $k$ children. That wastes a short codeword at the top, the most valuable place, instead of at the bottom.

**Fix.** Add dummy symbols of frequency 0 until $n - 1 \equiv 0 \pmod{k-1}$ (at most $k - 2$ dummies), then always merge the $k$ smallest. The dummies end up at the deepest level, where they cost nothing, so the under-full node is at the bottom. In the example, add one 0: merge $\{0, 1, 1\}$ into 2, then $\{1, 1, 2\}$, for cost 6. The exchange proof works as before: the $k$ smallest can be made deepest siblings.

**Time.** At most $k - 2$ dummies, and $\lceil (n-1)/(k-1)\rceil$ merges, each with $k$ deletemins and one insert. Each node is inserted and deleted once, so $O(n\log n)$ in total.

# Learn: interval scheduling and partitioning

## Interval scheduling: as many non-overlapping jobs as possible

> **In short:** Always take the job that finishes first; it leaves the most room for the rest.

**Greedy: pick the job that finishes earliest**, throw out the jobs that overlap it, and repeat. (Earliest start, shortest job and fewest conflicts all have counterexamples.)

![Interval scheduling](fig/aad-interval-scheduling.svg)

*Figure. Earliest finish takes B (ends at 4), then D (starts at 5), then G: three jobs. Earliest start would take A, then F, and only fit two.*

**Proof: greedy stays ahead.** Let greedy pick $g_1, \ldots, g_k$ and an optimal solution pick $o_1, \ldots, o_m$, both sorted by finish time $f$ (start time is $s$). Claim: $f(g_r) \le f(o_r)$ for every $r \le k$.
- $r = 1$: greedy picks the earliest finish of all.
- Step: if $f(g_{r-1}) \le f(o_{r-1}) \le s(o_r)$, then $o_r$ was still available when greedy chose $g_r$. Greedy took the earliest finisher, so $f(g_r) \le f(o_r)$.

Now suppose $m > k$. Then $o_{k+1}$ starts after $f(o_k) \ge f(g_k)$, so it was still available to greedy, but greedy stopped. Contradiction, so $k = m$. Time $O(n\log n)$ for sorting.

With **weights**, greedy fails and we need DP (next chapter).

## Interval partitioning: fewest rooms (Midsem Q3.2)

> **In short:** You need as many rooms as the most lectures running at one moment, and greedy by start time achieves exactly that.

Every lecture must be scheduled, and overlapping lectures need different rooms. Use as few rooms as possible.

The **depth** $d$ is the largest number of lectures in progress at the same moment. **Every** solution needs at least $d$ rooms.

**Greedy.** Sort by **start** time. Put each lecture into a room that is free by then (the room whose last lecture ends earliest, if it has ended). If no room is free, open a new one. A min-heap of room finish times finds the earliest-free room in $O(\log n)$.

**Why it is optimal.** Suppose greedy opens room $k + 1$ for a lecture starting at time $s$. Then all $k$ existing rooms have a lecture ending after $s$. Those lectures started at or before $s$, since lectures are handled in order of start time. So $k + 1$ lectures are all running just after $s$, which means $d \ge k + 1$. So greedy never uses more than $d$ rooms, and no solution can use fewer. Time $O(n\log n)$, space $O(n)$. The full write-up with pseudocode is on the midsem page.

![Interval partitioning](fig/aad-interval-partitioning.svg)

*Figure. Lectures handled in order of start time. Room 3 is opened for $c$ only because $a$ and $b$ are both still running at time 2, which already shows depth 3. Later lectures reuse rooms that have freed up.*

## Practice

**GD1.** Build a Huffman code for $A{:}45, B{:}13, C{:}12, D{:}16, E{:}9, F{:}5$ and give its cost.

*Solution.* Merges: $F5 + E9 = 14$; $C12 + B13 = 25$; $14 + D16 = 30$; $25 + 30 = 55$; $A45 + 55 = 100$. Codes (left 0): $A = 0$, $C = 100$, $B = 101$, $F = 1100$, $E = 1101$, $D = 111$. Cost $= 45\cdot1 + (12 + 13 + 16)\cdot3 + (5 + 9)\cdot4 = 45 + 123 + 56 = 224$, which equals the sum of the merged weights $14 + 25 + 30 + 55 + 100 = 224$.

**GD2.** Show that "earliest start first" and "shortest interval first" both fail for interval scheduling.

*Solution.* Earliest start: $[0, 10], [1, 2], [3, 4]$. It takes $[0, 10]$ first, which overlaps both others: 1 job, but $\{[1,2], [3,4]\}$ gives 2. Shortest first: $[0, 5], [4, 7], [6, 11]$. It takes $[4, 7]$ (length 3), which overlaps both others: 1 job, but $\{[0,5], [6,11]\}$ gives 2. Earliest finish takes $[0, 5]$ then $[6, 11]$ in both, which is optimal.

**GD3.** Prove: in an optimal prefix code, if $f_i > f_j$ then $\ell_i \le \ell_j$.

*Solution.* If $\ell_i > \ell_j$, swap the codewords of $i$ and $j$. The cost changes by $f_i\ell_j + f_j\ell_i - f_i\ell_i - f_j\ell_j = (f_i - f_j)(\ell_j - \ell_i) < 0$, contradicting optimality.
