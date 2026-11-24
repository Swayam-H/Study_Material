# Learn: greedy algorithms

A greedy algorithm builds a solution one irrevocable choice at a time, always taking what looks best now. It is usually easy to state and hard to prove. The midsem gave greedy 6 of 30 marks (Huffman, 2; room assignment, 4), and Assignment 2 Q3 asked for $k$-ary Huffman. Sources: Lecture 10, Tutorial 3 (Huffman), DPV 5.2, KT ch. 4.

## Two ways to prove a greedy algorithm optimal

1. **Greedy stays ahead.** Show by induction that after each step, the greedy partial solution is at least as good as any other solution's corresponding part (interval scheduling).
2. **Exchange argument.** Take any optimal solution that differs from greedy. Change it, one step at a time, to agree with greedy's choice without making it worse. So greedy's solution is optimal (Huffman, MST cut property).
3. **Structural bound** (for "minimise the number of resources"): show every solution needs at least $d$, then show greedy never uses more than $d$ (interval partitioning).

To show a greedy rule is **wrong**, a single small counterexample is a full answer (Assignment 2 Q3.1 and Q4.1).

# Learn: Huffman coding

## Prefix-free codes

A code assigns a bit string to each symbol. A code is **prefix-free** if no codeword is a prefix of another. Then any concatenation decodes uniquely: read bits until they spell a codeword, output it, repeat. Example from the lecture: with $A = 0$, $B = 10$, $C = 110$, $D = 111$, the stream 0110111 decodes as $A, C, D$. With $A = 0$, $B = 01$ it is ambiguous.

A prefix-free code is the same thing as a **binary tree with the symbols at the leaves**: the path from the root (0 = left, 1 = right) spells the codeword. A symbol at an internal node would be a prefix of its descendants. In an optimal code the tree is **full** (every internal node has 2 children): a node with one child can be contracted, shortening codewords.

## The objective

With frequencies $f_i$ and depths (codeword lengths) $\ell_i$,
$$\boxed{\text{cost}(T) = \sum_i f_i \ell_i = \sum_{\text{non-root nodes } v} f(v)}$$
where an internal node's frequency is the sum of the frequencies of the leaves below it. The second form holds because a leaf at depth $\ell$ is counted once for each of the $\ell$ non-root nodes on its path. Lecture 10's example: $f_1 + 2f_2 + 2f_3 = f_1 + f_2 + f_3 + (f_2 + f_3)$.

## Huffman's algorithm

```
Huffman(f_1..f_n):
    H ← min-priority queue of the n symbols, keyed by frequency
    repeat n − 1 times:
        x ← deletemin(H); y ← deletemin(H)
        make a new node z with children x, y and f(z) = f(x) + f(y)
        insert(H, z)
    return the single remaining node (the root)
```
$n - 1$ merges, each $O(\log n)$ with a heap: **$O(n\log n)$**. (If the frequencies are already sorted, two queues give $O(n)$.)

## Why it is optimal

**Lemma (exchange).** If $x, y$ have the two smallest frequencies, some optimal tree has $x$ and $y$ as **siblings at maximum depth**.

*Proof.* Take an optimal full tree $T$. Its deepest level has two sibling leaves $a, b$ (full tree). Swap $x$ with $a$: since $f_x \le f_a$ and $\ell_a \ge \ell_x$, the cost changes by $(f_a - f_x)(\ell_x - \ell_a) \le 0$. Likewise swap $y$ with $b$. The cost does not increase, so the new tree is still optimal and has $x, y$ as deepest siblings.

**Theorem.** Huffman's tree is optimal.

*Proof by induction on $n$.* $n = 2$ is trivial. Replace $x, y$ by a single symbol $z$ with $f_z = f_x + f_y$. For any tree $T'$ on the reduced alphabet, expanding $z$ into a node with children $x, y$ gives a tree $T$ with $\text{cost}(T) = \text{cost}(T') + f_x + f_y$. Huffman on $n$ symbols is "merge $x, y$, then Huffman on the reduced alphabet", which is optimal there by induction. By the lemma some optimal tree on $n$ symbols has $x, y$ as siblings, and contracting them gives a tree $T'$ on the reduced alphabet; so $\text{OPT}_n = \text{OPT}_{n-1} + f_x + f_y$, which is exactly what Huffman achieves.

## Kraft's inequality (Lecture 10 exercise)

For any prefix-free binary code with lengths $\ell_1, \ldots, \ell_m$:
$$\boxed{\sum_{i=1}^m 2^{-\ell_i} \le 1}$$

*Proof.* Let $L = \max \ell_i$. A codeword of length $\ell_i$ is a prefix of exactly $2^{L - \ell_i}$ strings of length $L$. Because no codeword is a prefix of another, these sets are disjoint. There are only $2^L$ strings of length $L$, so $\sum_i 2^{L-\ell_i} \le 2^L$; divide by $2^L$. (Equivalently: a random walk down the tree, flipping a fair coin at each node, reaches leaf $i$ with probability $2^{-\ell_i}$, and these events are disjoint.) Equality holds exactly for full trees.

## $k$-ary Huffman (Assignment 2 Q3)

With an alphabet of $k$ symbols the tree is $k$-ary. Naively merging the $k$ smallest each time can fail.

**Counterexample**, $k = 3$, four symbols each of frequency 1. Naive: merge three 1s into a node of weight 3; now only two nodes remain, so the root gets just 2 children. Depths are $1, 2, 2, 2$, cost $1 + 2 + 2 + 2 = 7$. Better: root with three children, two of them leaves and one an internal node with the other two leaves: depths $1, 1, 2, 2$, cost 6.

**Why it fails.** A full $k$-ary tree with $n$ leaves needs $n - 1 \equiv 0 \pmod{k-1}$ (each merge turns $k$ nodes into 1, reducing the count by $k-1$, and we need to reach exactly 1). Otherwise the **last** merge has fewer than $k$ children, which wastes a short codeword at the top, the most valuable place, instead of at the bottom.

**Fix.** Add dummy symbols of frequency 0 until $n - 1 \equiv 0 \pmod{k-1}$ (at most $k - 2$ dummies), then always merge the $k$ smallest. The dummies sit at the deepest level where they cost nothing, so the under-full node is at the bottom. In the example, add one 0: merge $\{0, 1, 1\}$ into 2, then $\{1, 1, 2\}$: cost 6. The exchange proof goes through as before (the $k$ smallest can be made deepest siblings).

**Time.** $O(n)$ dummies at most $k - 2$, $\lceil (n-1)/(k-1)\rceil$ merges, each $k$ deletemins and an insert: $O(n\log n)$ total (each node is inserted and deleted once).

# Learn: interval scheduling and partitioning

## Interval scheduling: as many non-overlapping jobs as possible

**Greedy: repeatedly pick the job that finishes earliest**, discard those it overlaps, repeat. (Earliest start, shortest job and fewest conflicts all have counterexamples.)

**Greedy stays ahead.** Let greedy pick $g_1, g_2, \ldots, g_k$ and an optimal solution $o_1, \ldots, o_m$, both sorted by finish time. Claim: $f(g_r) \le f(o_r)$ for every $r \le k$. True for $r = 1$ (greedy picks the earliest finish). If $f(g_{r-1}) \le f(o_{r-1}) \le s(o_r)$, then $o_r$ was still available when greedy chose $g_r$, so $f(g_r) \le f(o_r)$. If $m > k$, then $o_{k+1}$ starts after $f(o_k) \ge f(g_k)$ and would have been available to greedy, which stopped: contradiction. So $k = m$. Time $O(n\log n)$ for sorting.

With **weights**, greedy fails and we need DP (next chapter).

## Interval partitioning: fewest rooms (Midsem Q3.2)

All lectures must be scheduled; overlapping ones need different rooms. Minimise the number of rooms.

**Depth** $d$ = the maximum number of lectures that are all in progress at one time. **Every** solution needs at least $d$ rooms.

**Greedy.** Sort by **start** time. For each lecture, put it in a room that is free (the room whose last lecture ends earliest, if it ends by this start); otherwise open a new room. A min-heap of room finish times finds the earliest-free room in $O(\log n)$.

**Optimality.** When greedy opens room $k + 1$ for a lecture starting at $s$, all $k$ rooms have a lecture ending after $s$, and those lectures started at or before $s$ (lectures are processed by start time). So $k + 1$ lectures are all in progress just after $s$: $d \ge k + 1$. Hence greedy never uses more than $d$ rooms, and nobody can use fewer. Time $O(n\log n)$, space $O(n)$. Full write-up with pseudocode in the midsem page.

## Practice

**GD1.** Build a Huffman code for $A{:}45, B{:}13, C{:}12, D{:}16, E{:}9, F{:}5$ and give its cost.

*Solution.* Merges: $F5 + E9 = 14$; $C12 + B13 = 25$; $14 + D16 = 30$; $25 + 30 = 55$; $A45 + 55 = 100$. Codes (left 0): $A = 0$, $C = 100$, $B = 101$, $F = 1100$, $E = 1101$, $D = 111$. Cost $= 45\cdot1 + (12 + 13 + 16)\cdot3 + (5 + 9)\cdot4 = 45 + 123 + 56 = 224$, which equals the sum of the merged weights $14 + 25 + 30 + 55 + 100 = 224$.

**GD2.** Show that "earliest start first" and "shortest interval first" both fail for interval scheduling.

*Solution.* Earliest start: $[0, 10], [1, 2], [3, 4]$. It takes $[0, 10]$ first, which overlaps both others: 1 job, but $\{[1,2], [3,4]\}$ gives 2. Shortest first: $[0, 5], [4, 7], [6, 11]$. It takes $[4, 7]$ (length 3), which overlaps both others: 1 job, but $\{[0,5], [6,11]\}$ gives 2. Earliest finish takes $[0, 5]$ then $[6, 11]$ in both, which is optimal.

**GD3.** Prove: in an optimal prefix code, if $f_i > f_j$ then $\ell_i \le \ell_j$.

*Solution.* If $\ell_i > \ell_j$, swap the codewords of $i$ and $j$. The cost changes by $f_i\ell_j + f_j\ell_i - f_i\ell_i - f_j\ell_j = (f_i - f_j)(\ell_j - \ell_i) < 0$, contradicting optimality.
