# Learn: numbers and algorithms

Lecture 1 starts the course with the oldest algorithms there are: adding and multiplying numbers written as digit strings. The point is to practise the two things every later answer needs, a **proof of correctness** and a **running-time analysis**, on problems where the algorithm itself is easy. Sources: DPV 0.2, 0.3, 1.1, 1.2.3; Erickson ch. 0; Quiz I Q2.

## Asymptotic notation

For functions $f, g$ on the positive integers:

- $f = O(g)$ if there are constants $c > 0$, $n_0$ with $f(n) \le c\,g(n)$ for all $n \ge n_0$ ("$f$ grows no faster than $g$").
- $f = \Omega(g)$ if $g = O(f)$.
- $f = \Theta(g)$ if both hold.
- $f = o(g)$ if $f(n)/g(n) \to 0$ (strictly slower). Lecture 3 uses this: Karatsuba is $o(n^2)$.

Rules worth writing down without proof: constants and lower-order terms drop out; $n^a = O(n^b)$ when $a \le b$; any polynomial is $o$ of any exponential ($n^{100} = o(1.01^n)$); any power of a log is $o$ of any power of $n$ ($(\log n)^{10} = o(n^{0.1})$). Bases of logs do not matter inside $O$, because $\log_a n = \log_b n / \log_b a$.

## Input size counts digits, not values

An algorithm on an integer $x$ is measured in $n$ = the **number of digits (bits)** of $x$, which is about $\log x$. So "polynomial time" for multiplication means polynomial in $\log x$. This matters again in DP: an $O(TB)$ table is **pseudo-polynomial** because $B$ is a value, not a length (Midsem Q5 rubric note).

## Adding and multiplying digit strings

**Grade-school addition** of two $n$-digit numbers walks right to left with a carry. The carry is at most 1 in base 10 (and in any base $b$: $(b-1)+(b-1)+1 = 2b-1 < 2b$). Time $\Theta(n)$, which is optimal because the output has $n$ digits.

**Repeated addition** ($x \cdot y = y + y + \cdots + y$, $x$ times) is correct by definition but takes $x$ additions, which is $2^n$ for an $n$-bit $x$: exponential in the input size.

**Lattice (grade-school) multiplication** forms all $n \cdot m$ digit products and adds along diagonals with carries. Time $\Theta(nm)$, so $\Theta(n^2)$ for two $n$-digit numbers.

## Peasant multiplication (Quiz I Q2)

```
PeasantMultiply(x, y):
    prod ← 0
    while x > 0:
        if x is odd: prod ← prod + y
        x ← ⌊x/2⌋
        y ← y + y
    return prod
```

**Correctness by an invariant.** Let $x_0, y_0$ be the inputs. Claim: at the start of every iteration,
$$\boxed{\text{prod} + x \cdot y = x_0 \cdot y_0.}$$

- Initially prod $= 0$, $x = x_0$, $y = y_0$: true.
- If $x$ is even, $x = 2\lfloor x/2 \rfloor$, so $x y = \lfloor x/2\rfloor (2y)$. prod is unchanged, the new $x' y' = \lfloor x/2 \rfloor \cdot 2y = xy$. Invariant kept.
- If $x$ is odd, $x = 2\lfloor x/2\rfloor + 1$, so $xy = \lfloor x/2 \rfloor (2y) + y$. prod grows by $y$ and $x'y'$ shrinks by exactly $y$. Invariant kept.
- The loop ends when $x = 0$, so prod $= x_0 y_0$.

**Termination.** $x$ is a non-negative integer that strictly decreases ($\lfloor x/2 \rfloor < x$ for $x \ge 1$).

**Running time.** $x$ halves each iteration, so the loop runs $\lfloor \log_2 x \rfloor + 1 = O(\log x)$ times. Each iteration does one parity test, one halving (a shift), one doubling (a shift) and at most one addition. **State the cost of an addition** (the rubric deducts a mark otherwise):

- if additions are $O(1)$ (machine words): $O(\log x)$;
- if an addition of $n$-bit numbers costs $O(n)$: $O(\log x \cdot \log y)$, i.e. $O(n^2)$ for $n$-bit inputs.

**Binary view (the alternative rubric).** Write $x = \sum_i x_i 2^i$ with bits $x_i$. "x odd" tests the current lowest bit, $x \leftarrow \lfloor x/2\rfloor$ is a right shift, $y \leftarrow 2y$ is a left shift. After $k$ iterations, $x^{(k)} = \lfloor x/2^k\rfloor$, $y^{(k)} = 2^k y$ and $\text{prod}^{(k)} = y\sum_{i<k} x_i 2^i$. After all bits are read, prod $= y \sum_i x_i 2^i = xy$. Keep the loop variables separate from the inputs, with superscripts; the rubric says this is the most common reason a good binary answer is capped.

## Euclid's GCD

$\gcd(a, b) = \gcd(b, a \bmod b)$, with $\gcd(a, 0) = a$.

**Why.** Write $a = bq + r$. Any common divisor of $a$ and $b$ divides $r = a - bq$; any common divisor of $b$ and $r$ divides $a = bq + r$. So the pairs $(a, b)$ and $(b, r)$ have the same set of common divisors, hence the same greatest one.

**Running time.** If $a \ge b$ then $a \bmod b < a/2$ (if $b \le a/2$ then $r < b \le a/2$; otherwise $r = a - b < a/2$). So every two steps both numbers at least halve, and there are $O(\log a)$ steps, i.e. $O(n)$ divisions for $n$-bit inputs.

## Fibonacci (Pingala) numbers

$F_0 = 0$, $F_1 = 1$, $F_n = F_{n-1} + F_{n-2}$. The naive recursion makes $T(n) = T(n-1) + T(n-2) + O(1) \ge F_n \approx 1.618^n$ calls, which is exponential, because it recomputes the same values. Storing each $F_k$ once (iterating upward) takes $O(n)$ additions. This is the first example of **dynamic programming**: remember answers to overlapping subproblems. With $2 \times 2$ matrix powers, $\begin{pmatrix}1&1\\1&0\end{pmatrix}^n$ by repeated squaring needs only $O(\log n)$ matrix multiplications.

# Learn: divide and conquer

Divide and conquer solves a problem by splitting it into smaller instances of the **same** problem, solving those recursively, and combining their answers. Analysing it always means writing and solving a recurrence. Sources: Lectures 1 and 2, Tutorial 1, DPV 2.1–2.5.

## The recipe

1. **Divide** the input into $a$ subproblems of size $n/b$.
2. **Conquer** them recursively (base case: tiny inputs solved directly).
3. **Combine** the answers in $O(n^d)$ time.

The running time satisfies $T(n) = a\,T(n/b) + O(n^d)$.

## Solving recurrences with a recursion tree

Draw the tree. Level $j$ has $a^j$ nodes, each on a problem of size $n/b^j$, each doing $(n/b^j)^d$ work. So
$$\text{work at level } j = a^j \left(\frac{n}{b^j}\right)^d = n^d \left(\frac{a}{b^d}\right)^j = n^d r^j, \qquad r = \frac{a}{b^d}.$$
The total over $\log_b n$ levels is a geometric series in $r$, and a geometric series is $\Theta$ of its largest term:

- $r < 1$: the root dominates, $T = \Theta(n^d)$;
- $r = 1$: every level equal, $T = \Theta(n^d \log n)$;
- $r > 1$: the leaves dominate, $T = \Theta(n^{\log_b a})$ (there are $a^{\log_b n} = n^{\log_b a}$ leaves).

## Master theorem

$$\boxed{T(n) = aT(n/b) + O(n^d) \implies T(n) = \begin{cases} O(n^d) & d > \log_b a \\ O(n^d \log n) & d = \log_b a \\ O(n^{\log_b a}) & d < \log_b a \end{cases}}$$

Examples: merge sort $2T(n/2) + n$ gives $n\log n$; binary search $T(n/2) + 1$ gives $\log n$; Karatsuba $3T(n/2) + n$ gives $n^{\log_2 3}$; Strassen $7T(n/2) + n^2$ gives $n^{\log_2 7}$; $2T(n/2) + n^2$ gives $n^2$; $2T(n/2)+1$ gives $n$.

**When the master theorem does not apply**, sum the tree directly (Tutorial 1):

- $T(n) = T(n-1) + n$: $\Theta(n^2)$. $T(n) = T(n-1) + n^c$: $\Theta(n^{c+1})$. $T(n) = 2T(n-1) + 1$: $\Theta(2^n)$. $T(n) = cT(n-1)+1$ with $c>1$: $\Theta(c^n)$.
- $T(n) = T(\sqrt n) + 1$: put $n = 2^m$, $S(m) = S(m/2) + 1$, so $\Theta(\log\log n)$.
- A driving term that is not a pure power, like $49T(n/25) + n^{3/2}\log n$: here $\log_{25} 49 < 3/2$, so the root dominates and the answer is $\Theta(n^{3/2}\log n)$.

## Merge sort

Split the array in half, sort each half recursively, merge the two sorted halves in linear time by repeatedly taking the smaller front element. $T(n) = 2T(n/2) + O(n) = O(n \log n)$. Correctness by induction on $n$: the halves come back sorted, and merge outputs the smallest remaining element at each step.

## Gauss's trick and Karatsuba

Gauss noticed that $(a + bi)(c + di) = ac - bd + (bc + ad)i$ needs only **three** real multiplications, because $bc + ad = (a + b)(c + d) - ac - bd$.

Karatsuba applies the same trick to integers. Split two $n$-digit numbers in half:
$$x = x_1 \cdot 10^{n/2} + x_0, \qquad y = y_1 \cdot 10^{n/2} + y_0,$$
$$xy = x_1 y_1 \cdot 10^n + (x_1 y_0 + x_0 y_1)\cdot 10^{n/2} + x_0 y_0.$$
Compute only three products recursively:
$$P_1 = x_1 y_1,\quad P_2 = x_0 y_0,\quad P_3 = (x_1 + x_0)(y_1 + y_0),$$
$$\boxed{xy = P_1 \cdot 10^n + (P_3 - P_1 - P_2)\cdot 10^{n/2} + P_2.}$$
$T(n) = 3T(n/2) + O(n) = O(n^{\log_2 3}) \approx O(n^{1.585})$. Four products would give $4T(n/2) + O(n) = O(n^2)$, no better than school.

**Tracing it by hand (Midsem Q1.1).** Each call on two numbers splits them at half the length of the longer one, makes three calls, and stops at single digits. The sums $x_1 + x_0$ can have an extra digit (like $3 + 8 = 11$), which then needs one more level. Full trace for $1234 \times 5678$ is in the midsem solutions.

## Strassen's matrix multiplication

Block-multiplying $n \times n$ matrices as $2 \times 2$ block matrices needs 8 products of $n/2$ blocks: $8T(n/2) + O(n^2) = O(n^3)$. Strassen found 7 products (with 18 additions), giving $7T(n/2) + O(n^2) = O(n^{\log_2 7}) \approx O(n^{2.81})$. You do not need the 7 formulas; you need the recurrence and why 7 beats 8.

**Squaring is as hard as multiplying (DPV 2.27, Tutorial 1).** If you can square an $n\times n$ matrix in $S(n)$, then for $A, B$ form $M = \begin{pmatrix}0 & A\\ B & 0\end{pmatrix}$; $M^2 = \begin{pmatrix}AB & 0\\ 0 & BA\end{pmatrix}$, so one squaring of a $2n \times 2n$ matrix gives $AB$. Hence multiplication costs $O(S(2n)) = O(S(n))$ for polynomial $S$.

## The Hadamard transform in $O(n\log n)$ (Quiz I Q3)

$H_0 = [1]$, $H_k = \begin{pmatrix} H_{k-1} & H_{k-1}\\ H_{k-1} & -H_{k-1}\end{pmatrix}$, a $2^k \times 2^k$ matrix. To compute $H_k v$ for $v$ of length $n = 2^k$, split $v = (v_1, v_2)$ into halves of length $n/2$:
$$H_k v = \begin{pmatrix} H_{k-1}v_1 + H_{k-1}v_2 \\ H_{k-1}v_1 - H_{k-1}v_2\end{pmatrix}.$$
Only **two** recursive products, $u_1 = H_{k-1}v_1$ and $u_2 = H_{k-1}v_2$, are needed; then $n$ additions/subtractions combine them. $T(n) = 2T(n/2) + O(n) = O(n\log n)$. This is exactly the FFT butterfly with every twiddle factor equal to 1.

# Learn: lower bounds

A lower bound says **no** algorithm in some model can beat a given time. Sources: Lecture 3, DPV p. 59.

## The trivial output bound

Multiplying two $n$-digit numbers produces up to $2n$ digits, and any algorithm must at least write them, so multiplication is $\Omega(n)$. The same reasoning gives $\Omega(n)$ for reading the input in almost any problem.

## Sorting needs $\Omega(n\log n)$ comparisons

In the **comparison model** the algorithm learns about the input only by asking "is $a_i < a_j$?". Model any such algorithm on inputs of size $n$ as a binary **decision tree**: each internal node is a comparison, each leaf is an output permutation.

1. Every one of the $n!$ orderings of distinct inputs needs a different leaf (two orderings sent to the same leaf would be sorted by the same permutation, and one of them would be wrong).
2. A binary tree of depth $h$ has at most $2^h$ leaves. So $2^h \ge n!$ and $h \ge \log_2 n!$.
3. $n! \ge (n/2)^{n/2}$, so $\log_2 n! \ge \frac{n}{2}\log_2\frac{n}{2} = \Omega(n\log n)$.

$$\boxed{\text{any comparison sort makes } \Omega(n\log n) \text{ comparisons in the worst case}}$$

So merge sort is optimal among comparison sorts. Counting sort and radix sort escape the bound because they look at the values themselves, not only at comparisons.

## Practice

**DC1 (Tutorial 1, DPV 2.5).** Solve (a) $T(n) = 2T(n/3) + 1$, (b) $T(n) = 5T(n/4) + n$, (c) $T(n) = 7T(n/7) + n$, (d) $T(n) = 9T(n/3) + n^2$, (e) $T(n) = 8T(n/2) + n^3$, (f) $T(n) = T(n-1) + 2$, (g) $T(n) = T(\sqrt n) + 1$.

*Solution.* Compare $d$ with $\log_b a$.
(a) $\log_3 2 > 0 = d$: leaves win, $\Theta(n^{\log_3 2})$.
(b) $\log_4 5 > 1$: $\Theta(n^{\log_4 5})$.
(c) $\log_7 7 = 1 = d$: $\Theta(n\log n)$.
(d) $\log_3 9 = 2 = d$: $\Theta(n^2\log n)$.
(e) $\log_2 8 = 3 = d$: $\Theta(n^3\log n)$.
(f) Unroll: $T(n) = T(0) + 2n = \Theta(n)$.
(g) With $n = 2^m$, $S(m) = S(m/2) + 1 = \Theta(\log m)$, so $\Theta(\log\log n)$.

**DC2 (Karatsuba recurrence).** Show that splitting into three parts with 5 multiplications (Toom-3) gives a faster algorithm than Karatsuba.

*Solution.* $T(n) = 5T(n/3) + O(n)$. Since $\log_3 5 \approx 1.465 > 1$, $T(n) = \Theta(n^{\log_3 5}) \approx n^{1.465}$, which beats $n^{\log_2 3} \approx n^{1.585}$.

**DC3.** Give an $O(n \log n)$ algorithm to count the inversions (pairs $i<j$ with $a_i > a_j$) of an array.

*Solution.* Modify merge sort to return (sorted array, inversion count). Inversions split three ways: inside the left half, inside the right half, and **across** (left element > right element). The first two come from recursion. During the merge, whenever an element of the right half is output while $k$ elements of the left half remain, all $k$ of those are larger than it, so add $k$. The merge stays linear, so $T(n) = 2T(n/2) + O(n) = O(n\log n)$.

**DC4 (DPV 2.32 idea, closest pair).** Sketch the $O(n\log n)$ closest-pair algorithm and why the strip check is linear.

*Solution.* Sort by $x$; split at the median $x$ into left and right halves; recursively get the closest distances $\delta_L, \delta_R$; let $\delta = \min$. A closer cross pair must lie in the vertical strip of width $2\delta$ around the split line. Sort the strip by $y$ (or merge pre-sorted lists). Each point only needs to be compared with the next 7 points in $y$-order, because a $\delta \times 2\delta$ box holds at most 8 points pairwise $\ge \delta$ apart (4 per $\delta/2$-square side argument). So the combine step is $O(n)$ and $T(n) = 2T(n/2) + O(n) = O(n \log n)$.
