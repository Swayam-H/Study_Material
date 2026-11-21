# HW practice: Lectures 1 to 4, nonlinear dynamics

The conceptual homework questions of Lectures 1 to 3 and HW 4b to 4d already have full solutions in Chapter 1 (Problems 1 to 14, 17 to 21). This page adds the two Lecture 4 items that were missing: HW 4a (phase plots) and HW 4e (Marion & Thornton problems 4-16 and 4-17).

### Problem 1 [HW practice · HW 4a]

How are phase plots used?

*Solution.* A **phase plot** shows the state of a system rather than its time history. For a flow $\dot{\mathbf x} = \mathbf f(\mathbf x)$ the axes are the state variables (for example prey and predator numbers, or position and momentum), and each solution is a curve; time is implicit along the curve. For a map $x_{n+1} = f(x_n)$ the phase plot has $x_n$ on the horizontal axis and $x_{n+1}$ on the vertical axis (the **return map**), together with the diagonal $x_{n+1} = x_n$.

What it is used for:

- **Steady states.** Fixed points are where the curve meets the diagonal (map) or where $\mathbf f = 0$ (flow).
- **Stability.** The slope $|f'(x^*)|<1$ at a map's fixed point means stable; the direction field near a flow's fixed point shows whether trajectories converge, spiral, or leave.
- **Following dynamics graphically.** The **cobweb** construction (go vertically to the curve, horizontally to the diagonal, repeat) shows convergence, oscillation, cycles or chaos without solving anything.
- **Qualitative behaviour at a glance.** Closed loops are periodic orbits (Lotka–Volterra), a spiral into a point is damped relaxation, and an orbit that fills a region is chaotic. Crossing trajectories are impossible for a deterministic flow, which constrains what the picture can look like.
- **Global picture.** Separatrices and basins of attraction show which initial states end up where.

### Problem 2 [HW practice · MT 4-16]

The curve $x_{n+1} = f(x_n)$ intersects the curve $x_{n+1} = x_n$ at $x_0$. The expansion of $x_{n+1}$ about $x_0$ is $x_{n+1} - x_0 = \beta(x_n - x_0)$, where $\beta = (df/dx)$ at $x = x_0$. (a) Describe the geometrical sequence that the successive values of $x_{n+1} - x_0$ form. (b) Show that the intersection is stable when $|\beta|<1$ and unstable when $|\beta|>1$.

*Solution.* **(a)** Let $\epsilon_n = x_n - x_0$. The expansion says $\epsilon_{n+1} = \beta\epsilon_n$, so

$$\epsilon_n = \beta^n\epsilon_0$$

is a **geometric progression with common ratio $\beta$**:

- $0<\beta<1$: the iterates approach $x_0$ monotonically (a staircase in the cobweb diagram).
- $-1<\beta<0$: the iterates alternate on either side of $x_0$ while getting closer (an inward spiral cobweb).
- $\beta>1$: they move away monotonically; $\beta<-1$: they alternate and move away.
- $\beta = \pm1$: the linear approximation is neutral and the next order decides.

**(b)** $|\epsilon_n| = |\beta|^n|\epsilon_0|$. If $|\beta|<1$, $|\beta|^n\to0$ for every small $\epsilon_0$, so the iterates converge to $x_0$: **stable**. If $|\beta|>1$, $|\beta|^n\to\infty$, so any small deviation grows until the linear approximation fails: **unstable**. The slope of the map at the fixed point decides, which is the criterion used for the logistic map ($f'(x^*) = r(1-2x^*)$).

### Problem 3 [HW practice · MT 4-17]

The tent map is $x_{n+1} = 2\alpha x_n$ for $0<x<\tfrac12$ and $x_{n+1} = 2\alpha(1-x_n)$ for $\tfrac12<x<1$, with $0<\alpha<1$. Make a map up to 20 iterations for $\alpha = 0.4$ and $0.7$ with $x_1 = 0.2$. Does either map appear chaotic?

*Solution.* Iterate directly (values rounded to 3 decimals):

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| $\alpha=0.4$ | 0.200 | 0.160 | 0.128 | 0.102 | 0.082 | 0.066 | 0.052 | 0.042 | 0.034 | 0.027 |
| $\alpha=0.7$ | 0.200 | 0.280 | 0.392 | 0.549 | 0.632 | 0.516 | 0.678 | 0.451 | 0.631 | 0.517 |

| $n$ | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $\alpha=0.4$ | 0.022 | 0.017 | 0.014 | 0.011 | 0.009 | 0.007 | 0.006 | 0.005 | 0.004 | 0.003 | 0.002 |
| $\alpha=0.7$ | 0.677 | 0.453 | 0.634 | 0.513 | 0.682 | 0.445 | 0.623 | 0.528 | 0.661 | 0.475 | 0.665 |

(Counting $x_1$ as the first entry, 20 iterations give the last column.)

- **$\alpha = 0.4$:** the slope is $2\alpha = 0.8<1$, so every step multiplies $x$ by 0.8 and the sequence decays smoothly to the stable fixed point $x = 0$. **Not chaotic.**
- **$\alpha = 0.7$:** the slope is $2\alpha = 1.4>1$ everywhere, so nearby points separate by a factor 1.4 per step, but the map folds the interval back (the peak at $x = \tfrac12$) so the iterates stay trapped in $[0.42,\,0.70]$. The sequence never settles: it jumps between the two sides of $\tfrac12$ with no repeating pattern. **This looks chaotic** (Lyapunov exponent $\ln1.4 = +0.34$, see Problem 19 of the book).

The sign of $\ln(2\alpha)$ is the test: negative gives a stable fixed point, positive gives sensitive dependence on initial conditions with bounded motion, which is deterministic chaos. The change occurs at $\alpha = 1/2$.

# HW practice: Lecture 5, Newton for one particle (MT Chapter 2)

Marion and Thornton, *Classical Dynamics of Particles and Systems* (5th ed.). Examples 2.2, 2.4, 2.10 and Problems 2-27, 2-32, 2-42, 2-45, 2-47, 2-53.

### Problem 1 [HW practice · MT E2.2]

A block rests on a fixed inclined plane with coefficient of static friction $\mu_s = 0.4$. At what angle $\theta$ will the block start sliding if it is initially at rest?

*Solution.* Take $x$ down the plane and $y$ perpendicular to it. Perpendicular to the plane there is no acceleration, so $N = mg\cos\theta$. Along the plane the friction force $f_s$ points up the plane and has maximum value $\mu_sN$.

The block stays at rest while $mg\sin\theta\le f_{\max} = \mu_smg\cos\theta$. It just starts to slide when the two are equal:

$$mg\sin\theta = \mu_smg\cos\theta\ \Rightarrow\ \tan\theta = \mu_s$$

$$\theta = \tan^{-1}(0.4) = \boxed{22^\circ}$$

The mass cancels, so the result does not depend on the block's mass. Measuring this angle is a standard way to determine $\mu_s$.

### Problem 2 [HW practice · MT E2.4]

Find the displacement and velocity of horizontal motion in a medium in which the retarding force is proportional to the velocity, $F = -kmv$.

*Solution.* The equation of motion along $x$ is

$$m\dot v = -kmv\ \Rightarrow\ \frac{dv}v = -k\,dt\ \Rightarrow\ \ln v = -kt + C_1$$

With $v(0) = v_0$:

$$\boxed{v(t) = v_0e^{-kt}}$$

Integrate again with $x(0) = 0$:

$$x(t) = \int_0^tv_0e^{-kt'}dt' = \boxed{\frac{v_0}k\left(1 - e^{-kt}\right)}$$

As $t\to\infty$, $x\to v_0/k$, so the body travels a **finite** distance although it never quite stops. Eliminating $t$ gives $v = v_0 - kx$: the velocity falls linearly with distance. The time constant is $1/k$.

### Problem 3 [HW practice · MT E2.10]

A charged particle (charge $q$, mass $m$) enters a region of uniform magnetic field $\mathbf B = B_0\hat{\mathbf j}$. Determine its subsequent motion.

*Solution.* The force is $\mathbf F = q\mathbf v\times\mathbf B$. With $\mathbf v = (\dot x,\dot y,\dot z)$ and $\mathbf B = (0, B_0, 0)$,

$$\mathbf v\times\mathbf B = (-\dot zB_0,\ 0,\ \dot xB_0)$$

so with $\alpha = qB_0/m$:

$$\ddot x = -\alpha\dot z,\qquad \ddot y = 0,\qquad \ddot z = \alpha\dot x$$

**$y$:** $\dot y = \dot y_0$ is constant and $y = \dot y_0t + y_0$: uniform motion along $\mathbf B$.

**$x,z$:** differentiate the first and substitute the third (and vice versa):

$$\dddot x = -\alpha\ddot z = -\alpha^2\dot x\ \Rightarrow\ \dot x = A\cos(\alpha t + \delta),\quad \dot z = A\sin(\alpha t+\delta)$$

so the velocity component perpendicular to $\mathbf B$ has constant magnitude $A = v_\perp$ and rotates at the cyclotron frequency $\omega_c = \alpha = qB_0/m$. Integrating once more gives a **circle** in the $xz$ plane of radius

$$\boxed{R = \frac{v_\perp}{\omega_c} = \frac{mv_\perp}{qB_0}}$$

Combined with the uniform motion along $y$, the path is a **helix** of radius $R$ whose axis is parallel to $\mathbf B$ and whose pitch is $2\pi\dot y_0/\omega_c$. The speed is constant because the magnetic force does no work.

### Problem 4 [HW practice · MT 2-27]

A rope of total mass 0.4 kg and total length 4 m has 0.6 m of the rope hanging vertically down off a work bench. How much work must be done to place all the rope on the bench?

*Solution.* The part on the bench does not move vertically. The hanging part has mass

$$m_h = (0.4\ \text{kg})\frac{0.6}{4} = 0.06\ \text{kg}$$

and its centre of mass is 0.3 m below the bench. Raising it to the bench level raises its potential energy by

$$W = m_hg\,\frac{0.6}{2} = (0.06)(9.8)(0.3) = \boxed{0.18\ \text{J}}$$

(Equivalently, $W = \int_0^{0.6}\lambda gy\,dy = \tfrac12\lambda g(0.6)^2$ with $\lambda = 0.1$ kg/m.) The bench is assumed frictionless, and the rope is pulled slowly so no kinetic energy is left over.

### Problem 5 [HW practice · MT 2-32]

Two blocks of unequal masses ($2m$ on an incline of angle $\theta$, $m$ hanging) are connected by a string over a smooth pulley. If the coefficient of kinetic friction is $\mu_k$, what angle $\theta$ of the incline allows the masses to move at constant speed?

*Solution.* Constant speed means zero acceleration for both blocks, so the tension is $T = mg$ from the hanging block. For the block of mass $2m$ on the incline, the forces along the incline are gravity $2mg\sin\theta$ (down the slope), the tension $T$ (up the slope) and kinetic friction $\mu_kN = \mu_k(2mg\cos\theta)$, which opposes the motion.

**Block $2m$ sliding down the incline** (the hanging block rises): friction acts up the slope,

$$2mg\sin\theta = T + 2\mu_kmg\cos\theta = mg + 2\mu_kmg\cos\theta$$

$$\boxed{\sin\theta - \mu_k\cos\theta = \tfrac12}\ \Rightarrow\ \theta = \tan^{-1}\mu_k + \sin^{-1}\frac1{2\sqrt{1+\mu_k^2}}$$

For $\mu_k = 0$ this gives $\theta = 30^\circ$ and increases with $\mu_k$.

(If instead the block $2m$ moves up the incline, friction acts down the slope and $\sin\theta+\mu_k\cos\theta = \tfrac12$, so $\theta = \sin^{-1}\frac1{2\sqrt{1+\mu_k^2}} - \tan^{-1}\mu_k$, which is smaller than $30^\circ$.)

Use the substitution $\mu_k = \tan\varphi$: $\sin\theta - \mu_k\cos\theta = \sin(\theta-\varphi)/\cos\varphi$, so $\sin(\theta - \varphi) = \tfrac12\cos\varphi$.

### Problem 6 [HW practice · MT 2-42]

A solid cube of uniform density and side $b$ is in equilibrium on top of a cylinder of radius $R$. The planes of four sides of the cube are parallel to the axis of the cylinder. The contact is perfectly rough. Under what conditions is the equilibrium stable or not stable?

*Solution.* A perfectly rough contact means the cube rolls without slipping on the cylinder. Tilt the cube by a small angle $\theta$. The contact point moves along the cylinder by arc length $R\theta$, the same distance along the cube's bottom face. Measured from the cylinder axis, the cube's centre of mass (initially directly above the contact point, at height $R + b/2$) is then at height

$$h(\theta) = \left(R + \frac b2\right)\cos\theta + R\theta\sin\theta$$

(the first term is the rotated line from axis to the centre of mass; the second is the shift because the contact point moves sideways by $R\theta$ relative to the cube's centre).

Expand for small $\theta$:

$$h\approx\left(R+\frac b2\right)\left(1 - \frac{\theta^2}2\right) + R\theta^2 = R + \frac b2 + \theta^2\left(\frac R2 - \frac b4\right)$$

The potential energy $U = Mgh$ has a minimum at $\theta = 0$ (stable) if the coefficient of $\theta^2$ is positive:

$$\boxed{R > \frac b2:\ \text{stable};\qquad R<\frac b2:\ \text{unstable};\qquad R = \frac b2:\ \text{neutral (needs the }\theta^4\text{ term)}}$$

The cube is stable if the cylinder's radius of curvature is larger than half the cube's side, i.e. if the centre of mass lies below the centre of curvature of the "rocking" path.

### Problem 7 [HW practice · MT 2-45]

Describe how to determine whether an equilibrium is stable or unstable when $(d^2U/dx^2)_0 = 0$.

*Solution.* At an equilibrium point $x_0$, $U'(x_0) = 0$. If also $U''(x_0) = 0$, the second-derivative test is inconclusive and one must look at the **first nonvanishing derivative**, say of order $n$, so that near $x_0$

$$U(x)\approx U(x_0) + \frac{U^{(n)}(x_0)}{n!}(x - x_0)^n$$

- **$n$ even** (4, 6, ...): $(x-x_0)^n\ge0$ on both sides. If $U^{(n)}(x_0)>0$, $x_0$ is a **minimum**: stable. If $U^{(n)}(x_0)<0$, it is a **maximum**: unstable.
- **$n$ odd** (3, 5, ...): $(x-x_0)^n$ changes sign across $x_0$, so $U$ increases on one side and decreases on the other: an **inflection**. The equilibrium is **unstable** (stable against displacement on one side only).

Equivalently, compute the force $F = -U'$ on both sides of $x_0$ (or the sign of $U'$ just left and right): a restoring force on both sides means stable.

Example: $U = x^4$ has $U'' = 0$ at 0 but $U^{(4)} = 24>0$, so $x = 0$ is stable; $U = x^3$ has $U^{(3)} = 6\ne0$ at 0, so it is an unstable inflection.

### Problem 8 [HW practice · MT 2-47]

A particle moves in the region $x>0$ under the potential $U(x) = U_0\left(\dfrac ax + \dfrac xa\right)$ with $U_0 = 1$ J and $a = 2$ m. Plot the potential, find the equilibrium points, and determine whether they are maxima or minima.

*Solution.* With the numbers, $U(x) = \dfrac2x + \dfrac x2$ (J, with $x$ in metres).

**Equilibrium:** $F = -dU/dx = 0$:

$$\frac{dU}{dx} = U_0\left(-\frac a{x^2} + \frac1a\right) = 0\ \Rightarrow\ x^2 = a^2\ \Rightarrow\ x = a = 2\ \text{m}\ (x>0)$$

There is only one equilibrium point, with $U(a) = 2U_0 = 2$ J.

**Type:** $\dfrac{d^2U}{dx^2} = \dfrac{2U_0a}{x^3} = \dfrac{2U_0}{a^2} = 0.5\ \text{J m}^{-2}>0$ at $x = a$: a **minimum**, so the equilibrium is **stable**.

**Plot:**

| $x$ / m | 0.5 | 1 | 2 | 4 | 8 |
|---|---|---|---|---|---|
| $U$ / J | 4.25 | 2.5 | **2.0** | 2.5 | 4.25 |

$U\to\infty$ as $x\to0^+$ (the $a/x$ term) and $U\to\infty$ linearly as $x\to\infty$ (the $x/a$ term): a single well with its bottom at $x = 2$ m. Small oscillations about the minimum have $\omega^2 = U''/m = 0.5/m$ in SI units.

### Problem 9 [HW practice · MT 2-53]

Which of the following forces are conservative? If conservative, find the potential energy $U(\mathbf r)$.
(a) $F_x = ayz + bx + c$, $F_y = axz + bz$, $F_z = axy + by$.
(b) $F_x = -ze^{-x}$, $F_y = \ln z$, $F_z = e^{-x} + y/z$.
(c) $\mathbf F = \hat{\mathbf e}_r\,a/r$ ($a$, $b$, $c$ constants).

*Solution.* A force is conservative if $\nabla\times\mathbf F = 0$ (on a simply connected region), and then $\mathbf F = -\nabla U$.

**(a)** $\partial_yF_z - \partial_zF_y = (ax + b) - (ax + b) = 0$; $\partial_zF_x - \partial_xF_z = ay - ay = 0$; $\partial_xF_y - \partial_yF_x = az - az = 0$. **Conservative.** Integrate $F_x = -\partial U/\partial x$: $U = -(axyz + \tfrac12bx^2 + cx) + g(y,z)$. Then $-\partial U/\partial y = axz - g_y$ must equal $F_y = axz + bz$, so $g_y = -bz$; and $-\partial U/\partial z = axy - g_z$ must equal $F_z = axy + by$, so $g_z = -by$. Both hold for $g = -byz$:

$$\boxed{U = -\left(axyz + \tfrac12bx^2 + cx + byz\right)}$$

**(b)** $\partial_yF_z - \partial_zF_y = \tfrac1z - \tfrac1z = 0$; $\partial_zF_x - \partial_xF_z = -e^{-x} - (-e^{-x}) = 0$; $\partial_xF_y - \partial_yF_x = 0 - 0 = 0$. **Conservative.**

$$\boxed{U = -\left(ze^{-x} + y\ln z\right)}$$

Check: $-\partial U/\partial x = -ze^{-x}$ ✓, $-\partial U/\partial y = \ln z$ ✓, $-\partial U/\partial z = e^{-x} + y/z$ ✓.

**(c)** A purely radial force depending only on $r$, $\mathbf F = F(r)\hat{\mathbf e}_r$, has zero curl in spherical coordinates, so it is **conservative** (a central force). With $F(r) = a/r$:

$$U(r) = -\int F\,dr = \boxed{-a\ln r + \text{const}}$$

(The constants $b$ and $c$ in the statement do not appear in this force.)

# HW practice: Lectures 6 and 7, calculus of variations, Lagrange and Hamilton

Marion and Thornton, Examples 6.1, 6.3, 6.5, 7.3, 7.7, 7.8, 7.10 and Problem 7-17. (Example 6.2, the brachistochrone, and Example 7.11, the particle on a cylinder, already have full solutions in Chapters 3 and 4.) The homework list says "E-7.17"; the book has no Example 7.17 (examples stop at 7.12), so it is taken to mean Problem 7-17.

### Problem 1 [HW practice · MT E6.1]

Consider $f = (dy/dx)^2$ with $y(x) = x$. Add the function $\eta(x) = \sin x$ and find $J(\alpha)$ between $x = 0$ and $x = 2\pi$. Show that the stationary value of $J(\alpha)$ occurs for $\alpha = 0$.

*Solution.* The varied path is $y(\alpha,x) = x + \alpha\sin x$, which has the same end points $y(0)=0$, $y(2\pi)=2\pi$ for every $\alpha$. Then $dy/dx = 1 + \alpha\cos x$ and

$$J(\alpha) = \int_0^{2\pi}(1 + \alpha\cos x)^2dx = \int_0^{2\pi}(1 + 2\alpha\cos x + \alpha^2\cos^2x)\,dx = 2\pi + 0 + \pi\alpha^2$$

$$\frac{dJ}{d\alpha} = 2\pi\alpha = 0\ \Rightarrow\ \boxed{\alpha = 0}$$

and $d^2J/d\alpha^2 = 2\pi>0$, so it is a minimum. The true extremal (the straight line $y = x$) is the member with $\alpha = 0$, and neighbouring paths all have larger $J$.

### Problem 2 [HW practice · MT E6.3]

Find the equation of the line connecting two fixed points $(x_1,y_1)$ and $(x_2,y_2)$ such that the surface of revolution generated by rotating it about the $y$-axis has minimum area.

*Solution.* A strip of the surface has area $dA = 2\pi x\,ds = 2\pi x\sqrt{1+y'^2}\,dx$, so we extremize

$$A = 2\pi\int_{x_1}^{x_2}x\sqrt{1+y'^2}\,dx,\qquad f = x\sqrt{1+y'^2}$$

$f$ does not contain $y$, so $\partial f/\partial y' $ is constant:

$$\frac{\partial f}{\partial y'} = \frac{xy'}{\sqrt{1+y'^2}} = a\ \Rightarrow\ x^2y'^2 = a^2(1 + y'^2)\ \Rightarrow\ y' = \frac a{\sqrt{x^2-a^2}}$$

Integrate:

$$y = a\cosh^{-1}\frac xa + b\ \Longleftrightarrow\ \boxed{x = a\cosh\frac{y-b}a}$$

This is a **catenary**, and the surface of revolution is a **catenoid** (the shape a soap film takes between two rings). The constants $a,b$ are fixed by requiring the curve to pass through both end points. For some end-point separations no such catenary exists, and the minimal surface is then two discs.

### Problem 3 [HW practice · MT E6.5]

A disk rolls without slipping on an inclined plane. Determine the equation of constraint in terms of the coordinates $y$ and $\theta$, then use it to find the motion and the friction force.

*Solution.* Let $y$ be the distance the centre has moved down the plane and $\theta$ the rotation angle of the disk (radius $R$). Rolling without slipping means the arc length rolled equals the distance moved:

$$y = R\theta\ \Rightarrow\ \boxed{g(y,\theta) = y - R\theta = 0}$$

so $\partial g/\partial y = 1$ and $\partial g/\partial\theta = -R$ (these are the coefficients attached to the multiplier $\lambda$).

**Using the multiplier.** The Lagrangian (with $I = \tfrac12MR^2$ and the plane at angle $\alpha$) is $L = \tfrac12M\dot y^2 + \tfrac12I\dot\theta^2 + Mg(\ell - y)\sin\alpha$. The equations with a multiplier are $\dfrac{\partial L}{\partial q_k} - \dfrac d{dt}\dfrac{\partial L}{\partial\dot q_k} + \lambda\dfrac{\partial g}{\partial q_k} = 0$ gives

$$y:\ Mg\sin\alpha - M\ddot y + \lambda = 0,\qquad \theta:\ -I\ddot\theta - \lambda R = 0$$

From the second, $\lambda = -I\ddot\theta/R = -\tfrac12MR\ddot\theta = -\tfrac12M\ddot y$ (using $\ddot y = R\ddot\theta$). Substituting into the first:

$$Mg\sin\alpha - M\ddot y - \tfrac12M\ddot y = 0\ \Rightarrow\ \boxed{\ddot y = \tfrac23g\sin\alpha}$$

and $\lambda = -\tfrac13Mg\sin\alpha$. The magnitude of the friction force that enforces rolling is $|\lambda| = \tfrac13Mg\sin\alpha$, and the generalized constraint force and torque are $Q_y = \lambda$ and $Q_\theta = -\lambda R$. Compared with frictionless sliding ($g\sin\alpha$), rolling gives only $2/3$ of the acceleration because part of the energy goes into rotation.

### Problem 4 [HW practice · MT E7.3]

Consider projectile motion under gravity in two dimensions. Find the equations of motion in both Cartesian and polar coordinates.

*Solution.* **Cartesian** ($x$ horizontal, $y$ vertical): $T = \tfrac12m(\dot x^2 + \dot y^2)$, $U = mgy$, so $L = \tfrac12m(\dot x^2+\dot y^2) - mgy$.

$$x:\ \frac d{dt}(m\dot x) = 0\Rightarrow\boxed{m\ddot x = 0},\qquad y:\ \frac d{dt}(m\dot y) = -mg\Rightarrow\boxed{m\ddot y = -mg}$$

**Polar** ($r$ the distance from the launch point, $\theta$ the elevation angle from horizontal): $x = r\cos\theta$, $y = r\sin\theta$, so $T = \tfrac12m(\dot r^2 + r^2\dot\theta^2)$, $U = mgr\sin\theta$ and

$$L = \tfrac12m(\dot r^2 + r^2\dot\theta^2) - mgr\sin\theta$$

$$r:\ m\ddot r = mr\dot\theta^2 - mg\sin\theta\ \Rightarrow\ \boxed{\ddot r - r\dot\theta^2 + g\sin\theta = 0}$$

$$\theta:\ \frac d{dt}(mr^2\dot\theta) = -mgr\cos\theta\ \Rightarrow\ \boxed{r\ddot\theta + 2\dot r\dot\theta + g\cos\theta = 0}$$

The Cartesian equations are decoupled and trivial; the polar ones are coupled and nonlinear. The coordinates are a matter of convenience, but the physics is identical, which is the point of Lagrange's formulation (the same recipe in any coordinates).

### Problem 5 [HW practice · MT E7.7]

A bead slides along a smooth wire bent in the shape of a parabola $z = cr^2$. The bead rotates in a circle of radius $R$ when the wire is rotating about its vertical symmetry axis with angular velocity $\omega$. Find the value of $c$.

*Solution.* Use $r$ as the only generalized coordinate, with $\dot\theta = \omega$ fixed and $z = cr^2$, $\dot z = 2cr\dot r$:

$$T = \tfrac12m(\dot r^2 + r^2\omega^2 + \dot z^2) = \tfrac12m\left[\dot r^2(1 + 4c^2r^2) + r^2\omega^2\right],\qquad U = mgcr^2$$

Lagrange's equation for $r$:

$$\frac d{dt}\left[m\dot r(1+4c^2r^2)\right] = m\left[4c^2r\dot r^2 + r\omega^2 - 2gcr\right]$$

Only after deriving the equation set $r = R$ (constant), so that $\dot r = \ddot r = 0$:

$$0 = m(R\omega^2 - 2gcR)\ \Rightarrow\ \boxed{c = \frac{\omega^2}{2g}}$$

This is the shape of a rotating liquid surface (a parabola); a bead at any radius stays at rest relative to the wire.

### Problem 6 [HW practice · MT E7.8]

Consider the double pulley system of Figure 7-6 (a fixed pulley with mass $m_1$ on one side and a movable pulley on the other; the movable pulley carries masses $m_2$ and $m_3$). Use the coordinates $x$ and $y$ shown and determine the equations of motion.

*Solution.* Take the pulleys massless and the strings inextensible. Let $x$ be the depth of $m_1$ below the fixed pulley and $y$ the depth of $m_2$ below the movable pulley, whose own depth is $\ell_1 - x$. The velocities are

$$v_1 = \dot x,\qquad v_2 = -\dot x + \dot y,\qquad v_3 = -\dot x - \dot y$$

The Lagrangian is

$$L = \tfrac12m_1\dot x^2 + \tfrac12m_2(\dot y - \dot x)^2 + \tfrac12m_3(\dot x+\dot y)^2 + m_1gx + m_2g(\ell_1 - x + y) + m_3g(\ell_1 - x + \ell_2 - y)$$

Lagrange's equations:

$$x:\ (m_1+m_2+m_3)\ddot x + (m_3 - m_2)\ddot y = (m_1 - m_2 - m_3)\,g$$

$$y:\ (m_2+m_3)\ddot y + (m_3 - m_2)\ddot x = (m_2 - m_3)\,g$$

Solving the pair:

$$\boxed{\ddot x = g\,\frac{m_1(m_2+m_3) - 4m_2m_3}{m_1(m_2+m_3) + 4m_2m_3},\qquad \ddot y = \frac{2g\,m_1(m_2-m_3)}{m_1(m_2+m_3)+4m_2m_3}}$$

Checks: if $m_2 = m_3 = m$, then $\ddot y = 0$ and $\ddot x = g(m_1 - 2m)/(m_1+2m)$, the ordinary Atwood machine with a combined mass $2m$ on the right. If $m_1 = 0$, $\ddot x = -g$ (the movable pulley falls freely).

### Problem 7 [HW practice · MT E7.10]

A particle of mass $m$ starts at rest on top of a smooth fixed hemisphere of radius $a$. Find the force of constraint and determine the angle at which the particle leaves the hemisphere.

*Solution.* Use $r$ and $\theta$ (measured from the vertical) with the constraint $f = r - a = 0$ and multiplier $\lambda$ (which equals the radial constraint force):

$$L = \tfrac12m(\dot r^2 + r^2\dot\theta^2) - mgr\cos\theta$$

$$r:\ m r\dot\theta^2 - mg\cos\theta - m\ddot r + \lambda = 0\ \ (\partial f/\partial r = 1),\qquad \theta:\ mgr\sin\theta - \frac d{dt}(mr^2\dot\theta) = 0$$

Apply $r = a$, $\dot r = \ddot r = 0$:

$$\theta:\ \ddot\theta = \frac ga\sin\theta\ \Rightarrow\ \dot\theta^2 = \frac{2g}a(1 - \cos\theta)\quad(\text{from rest at the top})$$

$$r:\ \lambda = mg\cos\theta - ma\dot\theta^2 = mg\cos\theta - 2mg(1-\cos\theta)$$

$$\boxed{\lambda = mg\,(3\cos\theta - 2)}$$

This is the normal force the surface exerts, directed outward. It decreases as the particle slides and reaches zero when

$$\cos\theta = \tfrac23\ \Rightarrow\ \boxed{\theta = 48.2^\circ}$$

after which the constraint cannot supply a negative (pulling) force, so the particle leaves the surface at that angle.

### Problem 8 [HW practice · MT 7-17]

A particle of mass $m$ can slide freely along a wire $AB$ whose perpendicular distance from the origin $O$ is $h$. The wire rotates in the vertical plane at constant angular velocity $\dot\theta = \omega$. The position of the particle is described by the angle $\theta$ and the distance $q$ from the foot $C$ of the perpendicular. With gravity acting and $\theta(0) = 0$, $q(0) = 0$, $\dot q(0) = 0$, show that $q(t) = \dfrac g{2\omega^2}(\cosh\omega t - \cos\omega t)$. Sketch it. Compute the Hamiltonian and compare it with the total energy. Is the total energy conserved?

*Solution.* Take $\theta$ measured so that at $\theta = 0$ the perpendicular $OC$ lies along $x$ and the wire is vertical (as in the figure). With $\hat n = (\cos\theta,\sin\theta)$ along $OC$ and $\hat t = (\sin\theta,-\cos\theta)$ along the wire, the position is $\mathbf r = h\hat n + q\hat t$, and since $d\hat n/d\theta = -\hat t$, $d\hat t/d\theta = \hat n$:

$$\dot{\mathbf r} = (\dot q - h\omega)\hat t + q\omega\hat n,\qquad y = h\sin\theta - q\cos\theta$$

$$L = \tfrac12m\left[(\dot q - h\omega)^2 + q^2\omega^2\right] - mg\left(h\sin\omega t - q\cos\omega t\right)$$

Lagrange's equation for $q$:

$$\frac d{dt}\left[m(\dot q - h\omega)\right] = mq\omega^2 + mg\cos\omega t\ \Rightarrow\ \ddot q - \omega^2q = g\cos\omega t$$

**Solve.** Homogeneous solutions are $\cosh\omega t$ and $\sinh\omega t$. A particular solution is $q_p = A\cos\omega t$: $-\omega^2A - \omega^2A = g$, so $A = -g/2\omega^2$. With $q(0) = 0$ and $\dot q(0) = 0$ the $\sinh$ term vanishes and

$$\boxed{q(t) = \frac g{2\omega^2}\left(\cosh\omega t - \cos\omega t\right)}$$

**Sketch:** $q = 0$ at $t = 0$ with zero slope. For small $t$, $q\approx\tfrac g{2\omega^2}\cdot\omega^2t^2 = \tfrac12gt^2$, the free-fall value. For $\omega t\gg1$ the $\cosh$ term takes over and $q\approx\tfrac g{4\omega^2}e^{\omega t}$, with a small oscillating ripple $-\tfrac g{2\omega^2}\cos\omega t$ on top. The bead is flung outward along the wire.

**Hamiltonian.** $p = \partial L/\partial\dot q = m(\dot q - h\omega)$ and

$$H = p\dot q - L = \tfrac12m\dot q^2 - \tfrac12m\omega^2(h^2 + q^2) + mg\left(h\sin\omega t - q\cos\omega t\right)$$

**Total energy** $E = T + U = \tfrac12m\dot q^2 - mh\omega\dot q + \tfrac12m\omega^2(h^2+q^2) + mg(h\sin\omega t - q\cos\omega t)$.

$H\ne E$: the kinetic energy is not a homogeneous quadratic function of $\dot q$ (the constraint depends on time, so $T$ contains terms linear in $\dot q$ and independent of $\dot q$), and $H = T_2 - T_0 + U$ while $E = T_2 + T_1 + T_0 + U$.

**Conservation.** $L$ depends explicitly on time through $\theta = \omega t$, so $dH/dt = -\partial L/\partial t = mg\omega(h\cos\omega t + q\sin\omega t)\ne0$: $H$ is not conserved. $E$ is not conserved either, because the rotating wire does work on the bead through the constraint force (it is the motor driving the wire that supplies the energy).

# HW practice: Lecture 8, multiparticle systems and central forces

Marion and Thornton, Example 8.2 and Examples 9.1, 9.3, 9.10 and Problem 9-15. The "Section 9.11 rocket equation of motion" item is already solved in Chapter 2 (Mechanics 1, Problem 16), including the exhaust-speed relation and burn-out velocity. The homework list says "9.15"; there is no Example 9.15 (examples stop at 9.13), so it is taken to mean Problem 9-15.

### Problem 1 [HW practice · MT E8.2]

A particle moves in the logarithmic spiral orbit $r = ke^{\alpha\theta}$ under an attractive inverse-cube force (Example 8.1). Determine $r(t)$ and $\theta(t)$.

*Solution.* Angular momentum is conserved for a central force: $\ell = mr^2\dot\theta$. With $r = ke^{\alpha\theta}$:

$$\dot\theta = \frac\ell{mr^2} = \frac\ell{mk^2}e^{-2\alpha\theta}\ \Rightarrow\ e^{2\alpha\theta}\,d\theta = \frac\ell{mk^2}\,dt$$

Integrate both sides:

$$\frac{e^{2\alpha\theta}}{2\alpha} = \frac\ell{mk^2}t + C'\ \Rightarrow\ e^{2\alpha\theta} = \frac{2\alpha\ell}{mk^2}t + C$$

with $C = 2\alpha C'$. Take the logarithm:

$$\boxed{\theta(t) = \frac1{2\alpha}\ln\left(\frac{2\alpha\ell}{mk^2}t + C\right)}$$

and substituting back into $r = ke^{\alpha\theta}$:

$$\boxed{r(t) = k\left(\frac{2\alpha\ell}{mk^2}t + C\right)^{1/2}}$$

The constants $C$ and $\ell$ come from the initial conditions $r(0), \theta(0)$ and $\dot\theta(0)$. The radius grows (or shrinks, for $\alpha<0$) as $\sqrt t$, and $\theta$ grows logarithmically: the particle spirals out with ever slower angular speed.

### Problem 2 [HW practice · MT E9.1]

Find the centre of mass of a solid hemisphere of constant density.

*Solution.* Let the density be $\rho$, the radius $a$, and place the origin at the centre of the flat face with the $z$ axis through the pole. By symmetry $X = Y = 0$. Slice the hemisphere into discs of thickness $dz$ at height $z$ with radius $\sqrt{a^2 - z^2}$:

$$dm = \rho\pi(a^2 - z^2)\,dz,\qquad M = \rho\pi\int_0^a(a^2 - z^2)\,dz = \rho\pi\left(a^3 - \frac{a^3}3\right) = \frac{2\pi\rho a^3}3$$

$$Z = \frac1M\int z\,dm = \frac{\rho\pi}M\int_0^az(a^2 - z^2)\,dz = \frac{\rho\pi}M\left(\frac{a^4}2 - \frac{a^4}4\right) = \frac{\rho\pi a^4/4}{2\pi\rho a^3/3}$$

$$\boxed{Z = \frac{3a}8}$$

so the centre of mass lies on the axis, $3a/8$ above the centre of the flat face.

### Problem 3 [HW practice · MT E9.3]

A light string of length $a$ with masses $m_1$ and $m_2$ at its ends is whirled around by hand above the head and released. Describe the subsequent motion and find the tension in the string after release.

*Solution.* After release the only external forces are the gravitational forces on $m_1$ and $m_2$, whose resultant acts at the centre of mass. Hence:

1. **The centre of mass** moves in a parabola, exactly like a single projectile of mass $m_1 + m_2$ launched with the CM velocity at release.
2. **About the centre of mass** there is no external torque (gravity acts at the CM), so the angular momentum about the CM is conserved: the pair keeps rotating with the same angular velocity $\omega$ as at release, with the string taut.

The CM is a distance $b = \dfrac{m_1}{m_1+m_2}a$ from $m_2$ (and $a - b = \dfrac{m_2}{m_1+m_2}a$ from $m_1$). The tension supplies the centripetal force for either mass; for $m_2$, moving in a circle of radius $b$ at angular speed $\omega$:

$$T = m_2b\omega^2 = \boxed{\frac{m_1m_2}{m_1+m_2}\,a\,\omega^2}$$

(the same from $m_1$: $m_1(a-b)\omega^2$). The combination $\mu = m_1m_2/(m_1+m_2)$ is the reduced mass. The tension is independent of gravity, since both masses are in free fall.

### Problem 4 [HW practice · MT E9.10]

A rope of mass per unit length $\rho$ and length $a$ is suspended just above a table. It is released from rest at the top. Find the force on the table after the rope has fallen a distance $x$.

*Solution.* The force on the table has two parts: the **weight** of the rope already lying on the table, and the **impulsive force** from the rope that is still arriving.

*Weight:* the length on the table is $x$, so $F_g = \rho xg$.

*Impulse:* each piece of rope falls freely through a distance $x$ before landing, so it arrives with speed $v^2 = 2gx$. In time $dt$ a mass $dm = \rho v\,dt$ is stopped, delivering momentum $dp = v\,dm = \rho v^2\,dt$, so

$$F_{\text{impulse}} = \rho v^2 = 2\rho gx$$

Total force on the table:

$$F = \rho xg + 2\rho xg = \boxed{3\rho xg}$$

which equals the weight of a length $3x$ of rope. At the instant the last of the rope hits ($x = a$) the force is $3\rho ag = 3Mg$, three times the weight of the whole rope, then drops suddenly to $Mg$.

### Problem 5 [HW practice · MT 9-15]

A smooth rope is placed above a hole in a table (Figure 9-D). One end of the rope falls through the hole at $t = 0$, pulling steadily on the remainder of the rope. Find the velocity and acceleration of the rope as a function of the distance $x$ to the end of the rope. Ignore all friction. The total length of the rope is $L$.

*Solution.* The rope is a loose pile (heap) on the table, at rest, and only the part hanging through the hole is moving. Let $\rho$ be the mass per unit length. The hanging part has mass $\rho x$ and is the only part with momentum $p = \rho xv$. The only external force is its weight $\rho xg$ (the table does not push on the heap vertically in a way that matters, and friction is neglected), so

$$\frac{d}{dt}(\rho xv) = \rho xg\ \Rightarrow\ v^2 + x\dot v = gx$$

Use $\dot v = v\,dv/dx$ and multiply by $x$:

$$xv^2 + x^2v\frac{dv}{dx} = gx^2\ \Rightarrow\ \frac12\frac d{dx}\left(x^2v^2\right) = gx^2$$

$$x^2v^2 = \frac23gx^3 + C,\qquad C = 0\ \text{(the motion starts at } x = 0)$$

$$\boxed{v = \sqrt{\frac{2gx}3}}$$

The acceleration:

$$a = \frac{dv}{dt} = v\frac{dv}{dx} = \frac12\frac{d(v^2)}{dx} = \boxed{\frac g3}$$

The acceleration is **constant, $g/3$**, valid for $0\le x\le L$ (reaching $v = \sqrt{2gL/3}$ when the last of the rope leaves the hole). Energy is not conserved: the kinetic energy at length $x$ is $\tfrac12\rho xv^2 = \tfrac13\rho gx^2$ while the potential energy lost is $\tfrac12\rho gx^2$, so one third of the energy released ($\tfrac16\rho gx^2$) is dissipated as the rope is jerked into motion from the heap.
