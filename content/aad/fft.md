# Learn: polynomial multiplication and the FFT

The Fast Fourier Transform multiplies two degree-$d$ polynomials in $O(d\log d)$ time instead of $O(d^2)$. It is divide and conquer, made possible by a clever choice of points to evaluate at: the complex roots of unity. The midsem gave it 4 of 30 marks (an 8-point transform by hand, plus the pseudocode), and Assignment 1 Q1 used it. Sources: Lectures 3, 4 and 8; DPV 2.6; Tutorial 1.

## The problem

> **In short:** Multiplying polynomials directly pairs every term with every term, $O(d^2)$ work. We want $O(d\log d)$.

Given $A(x) = a_0 + a_1x + \cdots + a_dx^d$ and $B(x) = b_0 + \cdots + b_dx^d$, find $C(x) = A(x)B(x) = c_0 + \cdots + c_{2d}x^{2d}$. Each coefficient is
$$c_k = \sum_{i=0}^{k} a_i b_{k-i},$$
which is called a **convolution**. Computing each $c_k$ directly costs $\Theta(d)$, so $\Theta(d^2)$ for all of them.

## Two representations

> **In short:** A polynomial can be stored as its coefficients or as its values at enough points. Multiplying is easy with values; the hard part is converting between the two.

- **Coefficients:** the list $(a_0, \ldots, a_d)$.
- **Values:** $A(x_0), \ldots, A(x_d)$ at any $d+1$ different points.

**Fact.** The values at any $d+1$ different points pin down a degree-$d$ polynomial completely. Reason: if two such polynomials agreed at $d+1$ points, their difference would have degree $\le d$ but $d+1$ roots, so it must be zero.

With values, multiplying is easy: $C(x_k) = A(x_k)B(x_k)$ at each point, $O(n)$ in total. Since $C$ has degree $2d$, we need $n \ge 2d+1$ points. The plan:

1. **Evaluate** $A$ and $B$ at $n$ points ($n$ a power of 2, $n \ge 2d+1$).
2. **Multiply** the values point by point: $O(n)$.
3. **Interpolate**: turn $C$'s values back into coefficients.

At arbitrary points, step 1 costs $O(n^2)$ (Horner's rule takes $O(n)$ per point). The FFT does steps 1 and 3 in $O(n\log n)$ by picking the points cleverly.

## The even/odd split

> **In short:** Evaluating $A$ at $x$ and at $-x$ shares almost all the work, because both use the same two half-size polynomials in $x^2$.

Split $A$ into its even and odd powers:
$$A(x) = A_e(x^2) + x\,A_o(x^2).$$
$A_e$ uses the even-index coefficients $(a_0, a_2, a_4, \ldots)$ and $A_o$ the odd-index ones $(a_1, a_3, \ldots)$. Each has half the degree. Example from Lecture 3: $A(x) = 3 + 4x + 6x^2 + 2x^3 + x^4 + 10x^5$ gives $A_e(y) = 3 + 6y + y^2$ and $A_o(y) = 4 + 2y + 10y^2$.

Now suppose the points come in **$\pm$ pairs** $\pm x_0, \ldots, \pm x_{n/2-1}$. Since $x$ and $-x$ have the same square,
$$A(x_i) = A_e(x_i^2) + x_i A_o(x_i^2), \qquad A(-x_i) = A_e(x_i^2) - x_i A_o(x_i^2).$$
So all $n$ values need only $A_e$ and $A_o$ at the $n/2$ squares $x_i^2$: two half-size problems. To keep recursing, the squares must **also** come in $\pm$ pairs, and their squares too, all the way down. Real numbers can't do this, because squares of reals are never negative. The complex $n$th roots of unity can.

## Roots of unity

> **In short:** These are evenly spaced points on the unit circle. Squaring them gives the same kind of point set, half as large, so the split can repeat all the way down.

$$\omega = e^{2\pi i/n} = \cos\tfrac{2\pi}{n} + i\sin\tfrac{2\pi}{n}, \qquad \omega^n = 1.$$
The $n$th roots of unity are $1, \omega, \omega^2, \ldots, \omega^{n-1}$, spaced evenly around the unit circle. $\omega$ is a **primitive** $n$th root, meaning $\omega^k \ne 1$ for $0 < k < n$.

Three properties the FFT uses ($n$ even):

- **They come in $\pm$ pairs:** $\omega^{j + n/2} = -\omega^j$, because $\omega^{n/2} = e^{\pi i} = -1$ (half a turn).
- **Their squares are roots of half the order:** $(\omega^j)^2 = (\omega^2)^j$, and $\omega^2$ is a primitive $(n/2)$th root of unity.
- **They sum to zero:** if $d \not\equiv 0 \pmod n$, then $\sum_{\ell=0}^{n-1} \omega^{\ell d} = \frac{\omega^{nd} - 1}{\omega^d - 1} = 0$. If $d \equiv 0$, the sum is $n$.

Values to know for $n = 8$: $\omega = \frac{1+i}{\sqrt2}$, $\omega^2 = i$, $\omega^3 = \frac{-1+i}{\sqrt2}$, $\omega^4 = -1$, $\omega^5 = -\omega$, $\omega^6 = -i$, $\omega^7 = -\omega^3$. For $n = 4$: $1, i, -1, -i$.

## The FFT algorithm

> **In short:** Evaluate the even and odd halves at the $n/2$ squared points, then combine each pair with a plus and a minus (the butterfly).

$$\boxed{A(\omega^j) = A_e(\omega^{2j}) + \omega^j A_o(\omega^{2j}), \quad A(\omega^{j+n/2}) = A_e(\omega^{2j}) - \omega^j A_o(\omega^{2j})}$$

```
FFT(a = (a_0, ..., a_{n-1}), ω):        // n a power of 2, ω a primitive n-th root
    if ω = 1: return a                   // n = 1
    (s_0, ..., s_{n/2-1})  ← FFT((a_0, a_2, ..., a_{n-2}), ω²)
    (s'_0, ..., s'_{n/2-1}) ← FFT((a_1, a_3, ..., a_{n-1}), ω²)
    for j = 0 to n/2 - 1:
        r_j       ← s_j + ω^j · s'_j
        r_{j+n/2} ← s_j − ω^j · s'_j
    return (r_0, ..., r_{n-1})
```

These four lines are exactly the four blanks in Midsem Q1.3 (0.5 marks each). The two lines inside the loop are called the **butterfly**. Since $-\omega^j = \omega^{j+n/2}$, writing $r_{j+n/2} = s_j + \omega^{j+n/2}s'_j$ is also accepted.

**Running time.** Two half-size calls plus $O(n)$ work to combine: $T(n) = 2T(n/2) + O(n) = O(n\log n)$.

## The matrix view

> **In short:** Evaluating at all roots of unity is one matrix–vector product, and the FFT is a fast way to do that product.

Evaluating at all the roots of unity is the same as multiplying by the **Fourier matrix** $M_n(\omega)$, whose entries are $(M_n)_{jk} = \omega^{jk}$ for $j, k = 0..n-1$:
$$\begin{pmatrix}A(1)\\A(\omega)\\\vdots\\A(\omega^{n-1})\end{pmatrix} = M_n(\omega)\begin{pmatrix}a_0\\a_1\\\vdots\\a_{n-1}\end{pmatrix}.$$
The vector $M_n(\omega)a$ is called the **(discrete) Fourier transform** of $a$. The FFT computes it fast.

## Interpolation: the inverse FFT

> **In short:** Going back from values to coefficients is the same FFT run with $\omega^{-1}$ instead of $\omega$, then divided by $n$.

$$\boxed{M_n(\omega)^{-1} = \frac{1}{n}M_n(\omega^{-1})}$$

**Proof.** Entry $(j, k)$ of $M_n(\omega)M_n(\omega^{-1})$ is $\sum_{\ell} \omega^{j\ell}\omega^{-\ell k} = \sum_\ell \omega^{\ell(j-k)}$.
- If $j = k$, every term is 1, so the sum is $n$.
- If $j \neq k$, then $0 < |j - k| < n$, so $\omega^{j-k} \ne 1$, and the geometric sum is $\frac{\omega^{n(j-k)} - 1}{\omega^{j-k}-1} = 0$.

So the product is $nI$.

**Another view (Lecture 4).** The columns of $M_n$ are orthogonal under the complex inner product $\langle u, v\rangle = \sum u_\ell \overline{v_\ell}$, and each has length $\sqrt n$. So $M_n/\sqrt n$ is unitary, and the inverse of a unitary matrix is its conjugate transpose. Since $\overline{\omega} = \omega^{-1}$, this gives the same formula.

So **interpolation is the same FFT, run with $\omega^{-1}$, then divided by $n$**. $\omega^{-1}$ is also a primitive $n$th root of unity, so the same code works. In Lecture 8's code, the `inv` flag flips the sign of the angle and divides each butterfly output by 2. Over $\log_2 n$ levels that divides by $n$ in total.

**Lecture 8's picture for row $m$:** $a_m = \frac1n\sum_j A(\omega^j)\omega^{-jm} = \frac1n\sum_k a_k\sum_j \omega^{j(k-m)}$. Multiplying by $\omega^{-jm}$ "untwists" term $k = m$, so its $n$ steps all point the same way and add up to $n$. Every other term keeps turning, its steps go round a full loop, and they cancel to 0.

## Multiplying polynomials in $O(n\log n)$

> **In short:** Convert both polynomials to values, multiply the values pointwise, and convert back.

1. Let $n$ be the smallest power of two with $n \ge 2d + 1$ ($C$ has degree up to $2d$, so up to $2d+1$ coefficients). **Pad** $a$ and $b$ with zeros to length $n$.
2. $\hat a = \mathrm{FFT}(a, \omega)$ and $\hat b = \mathrm{FFT}(b, \omega)$.
3. $\hat c_j = \hat a_j\hat b_j$ for each $j$.
4. $c = \frac1n\mathrm{FFT}(\hat c, \omega^{-1})$. Round to integers if the inputs were integers.

Total $O(n\log n)$. Why pad: $n$ values cannot pin down a polynomial of degree $n$ or more. Without padding the product "wraps around" (a cyclic convolution).

**Integer multiplication.** An $n$-digit integer is a polynomial evaluated at $x = 10$. Multiply the polynomials with the FFT, then fix up the carries. This uses $O(n\log n)$ arithmetic operations on small numbers.

## A polynomial from its roots (Lecture 8, Assignment 1 Q1)

> **In short:** Multiply the factors in a balanced tree, using FFT multiplication at every level.

Given $z_0, \ldots, z_{n-1}$ (repeats allowed), find the coefficients of $P(x) = \prod_{i}(x - z_i)$. This is the polynomial that is zero exactly at the $z_i$, since $P(z_j) = 0$ iff $(x - z_j)$ divides $P$.

- **One factor at a time** costs $\Theta(i)$ at step $i$, so $\Theta(n^2)$ in total. The FFT doesn't help here, because one of the two operands has only two terms.
- **Balanced product tree:** recursively compute $L(x) = \prod_{i < n/2}(x - z_i)$ and $R(x) = \prod_{i \ge n/2}(x - z_i)$, each of degree $n/2$, then multiply them with the FFT in $O(n\log n)$:
$$\boxed{T(n) = 2T(n/2) + O(n\log n) = O(n\log^2 n)}$$

**Proof of the bound** (recursion tree). Level $j$ has $2^j$ nodes. Each multiplies two polynomials of degree $n/2^{j+1}$, costing $O(\frac{n}{2^j}\log\frac{n}{2^j}) \le O(\frac{n}{2^j}\log n)$. So each level costs $O(n\log n)$, and $\log_2 n$ levels give $O(n\log^2 n)$. The basic master theorem does not apply here, because the extra term is $n\log n$, not $n^d$. Add up the levels instead.

**Correctness** by induction: the node for indices $[l, r)$ returns $\prod_{i\in[l,r)}(x - z_i)$. So the root returns $P$, which has degree $n$ and leading coefficient 1.
## Practice

**FF1 (DPV 2.7).** What is the sum of the $n$th roots of unity? Their product, if $n$ is odd?

*Solution.* Sum: $\sum_{j=0}^{n-1}\omega^j = \frac{\omega^n - 1}{\omega - 1} = 0$ for $n > 1$. Product: $\omega^{0 + 1 + \cdots + (n-1)} = \omega^{n(n-1)/2}$. For odd $n$, $(n-1)/2$ is an integer, so this is $(\omega^n)^{(n-1)/2} = 1$.

**FF2 (DPV 2.8a).** Compute the FFT of $(1, 0, 0, 0)$ and the inverse FFT of $(1, 0, 0, 0)$, with $\omega = i$.

*Solution.* $A(x) = 1$ is constant, so its values at $1, i, -1, -i$ are $(1, 1, 1, 1)$. Inverse: $\frac14 M_4(\omega^{-1})(1,0,0,0)^T$ is $\frac14$ times the first column, $(\frac14, \frac14, \frac14, \frac14)$.

**FF3.** Use the FFT to multiply $A(x) = 1 + x$ and $B(x) = 1 + 2x$ (show each step).

*Solution.* deg $C$ = 2, so $n = 4$ and $\omega = i$. Pad: $a = (1, 1, 0, 0)$, $b = (1, 2, 0, 0)$.
Evaluate at $1, i, -1, -i$: $\hat a = (2, 1+i, 0, 1-i)$, $\hat b = (3, 1+2i, -1, 1-2i)$.
Pointwise: $\hat c = (6, (1+i)(1+2i), 0, (1-i)(1-2i)) = (6, -1+3i, 0, -1-3i)$.
Inverse with $\omega^{-1} = -i$: $c_k = \frac14\sum_j \hat c_j (-i)^{jk}$.
$c_0 = \frac14(6 + (-1+3i) + 0 + (-1-3i)) = 1$.
$c_1 = \frac14(6 + (-1+3i)(-i) + (-1-3i)(i)) = \frac14(6 + (i + 3) + (-i + 3)) = 3$.
$c_2 = \frac14(6 - (-1+3i) - (-1-3i)) = 2$.
$c_3 = \frac14(6 + (-1+3i)(i) + (-1-3i)(-i)) = \frac14(6 + (-i - 3) + (i - 3)) = 0$.
So $C(x) = 1 + 3x + 2x^2$, which matches $(1+x)(1+2x)$.

**FF4 (DPV 2.10 style).** Find the unique polynomial of degree $\le 4$ with $p(1) = 2$, $p(2) = 1$, $p(3) = 0$, $p(4) = 4$, $p(5) = 0$.

*Solution.* Use Lagrange interpolation: $p(x) = \sum_k y_k \prod_{j\neq k}\frac{x - x_j}{x_k - x_j}$. The terms with $y = 0$ vanish, leaving
$p(x) = 2\cdot\frac{(x-2)(x-3)(x-4)(x-5)}{(-1)(-2)(-3)(-4)} + 1\cdot\frac{(x-1)(x-3)(x-4)(x-5)}{(1)(-1)(-2)(-3)} + 4\cdot\frac{(x-1)(x-2)(x-3)(x-5)}{(3)(2)(1)(-1)}$
$= \frac{1}{12}(x-2)(x-3)(x-4)(x-5) - \frac16(x-1)(x-3)(x-4)(x-5) - \frac23(x-1)(x-2)(x-3)(x-5)$.
Check $x = 3$ and $x = 5$: every term has the factor $(x-3)(x-5)$, so $p = 0$. Expanding is optional unless asked.

**FF5.** Explain why the FFT recursion needs $n$ to be a power of 2, and what to do otherwise.

*Solution.* Every level halves the problem and needs the point set to split into $\pm$ pairs, which needs $n$ even at every level, all the way down to 1. If $n$ is not a power of 2, pad the coefficient vector with zeros up to the next power of 2. This at most doubles $n$, so the bound $O(n\log n)$ is unchanged.
