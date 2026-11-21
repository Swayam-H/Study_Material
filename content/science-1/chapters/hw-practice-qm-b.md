# HW practice: Beiser Chapter 4, Atomic structure

In-chapter examples 4.1 to 4.7 (Example 4.8, Rutherford scattering, is outside the course scope) and end-of-chapter problems 5, 6, 13, 16 and 30. Constants: $a_0 = 0.0529$ nm, $R = 1.097\times10^{7}$ m⁻¹, $E_n = -13.6/n^2$ eV, $1/\lambda = R(1/n_f^2 - 1/n_i^2)$.

### Problem 1 [HW practice · Beiser Ex 4.1]

13.6 eV is needed to separate a hydrogen atom into a proton and an electron, i.e. $E = -13.6$ eV. Find the orbital radius and velocity of the electron.

*Solution.* In the Bohr model, $E = -\dfrac{e^2}{8\pi\epsilon_0r}$ (kinetic $+\dfrac{e^2}{8\pi\epsilon_0r}$, potential $-\dfrac{e^2}{4\pi\epsilon_0r}$):

$$r = \frac{e^2}{8\pi\epsilon_0|E|} = \frac{1.44\ \text{eV nm}}{2(13.6\ \text{eV})} = \boxed{0.0529\ \text{nm}}$$

This is the Bohr radius $a_0$. The kinetic energy equals 13.6 eV, so

$$v = \sqrt{\frac{2KE}{m}} = \sqrt{\frac{2(13.6)(1.602\times10^{-19})}{9.11\times10^{-31}}} = \boxed{2.19\times10^{6}\ \text{m/s}}\ (\approx c/137)$$

### Problem 2 [HW practice · Beiser Ex 4.2]

An electron collides with a hydrogen atom in its ground state and excites it to $n = 3$. How much energy was given to the atom?

*Solution.* $E_1 = -13.6$ eV and $E_3 = -13.6/9 = -1.51$ eV, so

$$\Delta E = E_3 - E_1 = 13.6\left(1 - \frac19\right) = \boxed{12.1\ \text{eV}}$$

In an inelastic collision the atom takes exactly the level difference (the incident electron keeps the rest of its energy).

### Problem 3 [HW practice · Beiser Ex 4.3]

(a) Find the quantum number of the Bohr orbit in a hydrogen atom whose radius is 0.0100 mm. (b) What is the energy of the atom in this state?

*Solution.* **(a)** $r_n = n^2a_0$:

$$n = \sqrt{\frac{r_n}{a_0}} = \sqrt{\frac{1.00\times10^{-5}\ \text{m}}{5.29\times10^{-11}\ \text{m}}} = \boxed{435}$$

**(b)** $E_n = -\dfrac{13.6}{435^2} = \boxed{-7.2\times10^{-5}\ \text{eV}}$.

Such a Rydberg atom is nearly ionized and about $10^{4}$ times larger than normal.

### Problem 4 [HW practice · Beiser Ex 4.4]

Find the longest wavelength in the Balmer series (the H$\alpha$ line).

*Solution.* The Balmer series has $n_f = 2$. The longest wavelength is the smallest energy step, $n_i = 3$:

$$\frac1\lambda = R\left(\frac14 - \frac19\right) = \frac{5R}{36}\ \Rightarrow\ \lambda = \frac{36}{5R} = \frac{36}{5(1.097\times10^{7})} = \boxed{656\ \text{nm}}$$

(red, visible).

### Problem 5 [HW practice · Beiser Ex 4.5]

(a) Find the orbital frequencies of electrons in the $n=1$ and $n=2$ Bohr orbits. (b) What is the frequency of the photon emitted for $n=2\to n=1$? (c) An electron spends about $10^{-8}$ s in an excited state. How many revolutions does an $n=2$ electron make in $1.00\times10^{-8}$ s?

*Solution.* **(a)** $f_n = v_n/2\pi r_n$ with $v_n = v_1/n$ and $r_n = n^2a_0$, so $f_n = f_1/n^3$. For $n=1$: $f_1 = 2.19\times10^{6}/(2\pi\cdot5.29\times10^{-11}) = \boxed{6.58\times10^{15}\ \text{Hz}}$. For $n=2$: $f_2 = f_1/8 = \boxed{8.2\times10^{14}\ \text{Hz}}$.

**(b)** $h\nu = 13.6(1 - 1/4) = 10.2$ eV, so $\nu = 10.2/(4.136\times10^{-15}) = \boxed{2.47\times10^{15}\ \text{Hz}}$. This is not equal to either orbital frequency ($6.6\times10^{15}$ Hz and $8.2\times10^{14}$ Hz): the classical picture would predict radiation at the orbital frequency, and the quantum result differs. For large $n$ the photon frequency for $n\to n-1$ approaches the orbital frequency (correspondence principle).

**(c)** Revolutions $= f_2t = (8.2\times10^{14})(1.00\times10^{-8}) = \boxed{8.2\times10^{6}}$, so the electron makes millions of turns before radiating.

### Problem 6 [HW practice · Beiser Ex 4.6]

Positronium is a positron and an electron orbiting each other. Compare the wavelengths of its spectral lines with those of ordinary hydrogen.

*Solution.* The Bohr energies depend on the reduced mass:

$$E_n = -\frac{\mu e^4}{32\pi^2\epsilon_0^2\hbar^2n^2}$$

For hydrogen $\mu\approx m_e$. For positronium both bodies have mass $m_e$, so $\mu = m_e/2$ and

$$E_n = -\frac{6.8\ \text{eV}}{n^2}$$

All energy differences are half those of hydrogen, so every photon has half the energy and **every wavelength is twice as long**. For example the $n=3\to2$ line is at $2\times656 = 1312$ nm (infrared) instead of 656 nm. The orbit is also twice as big ($r_n = 2n^2a_0$).

### Problem 7 [HW practice · Beiser Ex 4.7]

A muon has mass $207m_e$ and charge $\pm e$. A negative muon can be captured by a nucleus to form a muonic atom. (a) A proton captures a $\mu^-$; find the radius of the first Bohr orbit. (b) Find the ionization energy.

*Solution.* Use the reduced mass $\mu = \dfrac{m_\mu m_p}{m_\mu + m_p} = \dfrac{(207)(1836)}{207+1836}m_e = 186\,m_e$. Bohr results scale as $r\propto1/\mu$ and $E\propto\mu$:

**(a)** $r_1 = \dfrac{a_0}{186} = \dfrac{0.0529\ \text{nm}}{186} = \boxed{2.8\times10^{-4}\ \text{nm} = 284\ \text{fm}}$, which is 186 times smaller than hydrogen's.

**(b)** $E_{\text{ion}} = 13.6\ \text{eV}\times186 = \boxed{2.53\ \text{keV}}$.

### Problem 8 [HW practice · Beiser Ch 4 Problems 5 and 6]

5. What is the shortest wavelength in the Brackett series? 6. What is the shortest wavelength in the Paschen series?

*Solution.* The shortest wavelength of a series (the series limit) comes from $n_i\to\infty$:

$$\frac1{\lambda_{\min}} = \frac{R}{n_f^2}\ \Rightarrow\ \lambda_{\min} = \frac{n_f^2}{R}$$

**5. Brackett** ($n_f = 4$): $\lambda_{\min} = \dfrac{16}{1.097\times10^{7}} = \boxed{1458\ \text{nm}}$ (infrared).

**6. Paschen** ($n_f = 3$): $\lambda_{\min} = \dfrac{9}{1.097\times10^{7}} = \boxed{820\ \text{nm}}$ (infrared).

### Problem 9 [HW practice · Beiser Ch 4 Problem 13]

Compare the uncertainty in the momentum of an electron confined to a region of linear dimension $a_0$ with the momentum of an electron in the ground-state Bohr orbit.

*Solution.* Take $\Delta x\sim a_0$. The uncertainty principle gives

$$\Delta p \ge \frac{\hbar}{2a_0} = \frac{1.055\times10^{-34}}{2(5.29\times10^{-11})} = 1.0\times10^{-24}\ \text{kg m/s}$$

In the Bohr ground state $mv a_0 = \hbar$, so

$$p = \frac{\hbar}{a_0} = 2.0\times10^{-24}\ \text{kg m/s}$$

So $\Delta p\ge p/2$: the minimum uncertainty is **of the same order as the momentum itself**. An electron localized to atomic size must have a momentum of about this size, which is what the Bohr model says it has.

### Problem 10 [HW practice · Beiser Ch 4 Problem 16]

A beam of 13.0 eV electrons bombards gaseous hydrogen. What series of wavelengths will be emitted?

*Solution.* The most the atom can absorb is 13.0 eV, so it reaches level $n$ only if $13.6(1 - 1/n^2)\le13.0$:

| level | energy above ground / eV |
|---|---|
| $n=2$ | 10.20 |
| $n=3$ | 12.09 |
| $n=4$ | 12.75 |
| $n=5$ | 13.06 (not reached) |

So $n = 2, 3, 4$ can be excited. The emitted lines, from $1/\lambda = R(1/n_f^2 - 1/n_i^2)$:

| series | transition | $\lambda$ |
|---|---|---|
| Lyman | $2\to1$, $3\to1$, $4\to1$ | 121.5 nm, 102.5 nm, 97.2 nm |
| Balmer | $3\to2$, $4\to2$ | 656.1 nm, 486.0 nm |
| Paschen | $4\to3$ | 1874.6 nm |

Six lines in total: three in the Lyman series (ultraviolet), two in the Balmer series (visible), and one in the Paschen series (infrared).

### Problem 11 [HW practice · Beiser Ch 4 Problem 30]

An antiproton has the mass of a proton but a charge of $-e$. If a proton and an antiproton orbited each other, how far apart would they be in the ground state? Why might you think such a system could not occur?

*Solution.* The two bodies have equal mass, so the reduced mass is $\mu = m_p/2 = 918\,m_e$. The Bohr radius of the relative motion scales as $1/\mu$, and the proton–antiproton separation is this radius:

$$r = \frac{4\pi\epsilon_0\hbar^2}{\mu e^2} = \frac{a_0}{918} = \frac{0.0529\ \text{nm}}{918} = \boxed{5.8\times10^{-5}\ \text{nm} = 5.8\times10^{-14}\ \text{m}}$$

(each particle orbits the centre at half this distance).

Such a system could not last because a particle and its antiparticle **annihilate**. At a separation of 58 fm they are only a few proton radii apart (the strong interaction acts at about 1 fm), so annihilation into mesons happens almost at once. Protonium-like atoms exist only as very short-lived states.

# HW practice: Beiser Chapter 5, Quantum mechanics

In-chapter examples 5.1 to 5.7 and end-of-chapter problems 1, 8, 9, 13, 21, 24, 31. Constants: $\hbar = 1.055\times10^{-34}$ J s, $m_e = 9.11\times10^{-31}$ kg.

### Problem 1 [HW practice · Beiser Ex 5.1]

Verify that Eq. (5.5), $\Psi = Ae^{-i\omega(t - x/v)}$, is a solution of the wave equation.

*Solution.* The wave equation is $\dfrac{\partial^2\Psi}{\partial x^2} = \dfrac1{v^2}\dfrac{\partial^2\Psi}{\partial t^2}$. Write $\Psi = Ae^{-i\omega t + i\omega x/v}$:

$$\frac{\partial^2\Psi}{\partial x^2} = \left(\frac{i\omega}v\right)^2\Psi = -\frac{\omega^2}{v^2}\Psi,\qquad \frac{\partial^2\Psi}{\partial t^2} = (-i\omega)^2\Psi = -\omega^2\Psi$$

so $\partial^2\Psi/\partial x^2 = (1/v^2)\,\partial^2\Psi/\partial t^2$ holds identically. ✓

### Problem 2 [HW practice · Beiser Ex 5.2]

A particle on the $x$ axis has the wave function $\psi = ax$ between $x=0$ and $x=1$, and $\psi = 0$ elsewhere. (a) Find the probability of finding the particle between $x = 0.45$ and $x = 0.55$. (b) Find $\langle x\rangle$.

*Solution.* **(a)** $P = \displaystyle\int_{0.45}^{0.55}|\psi|^2dx = a^2\left[\frac{x^3}3\right]_{0.45}^{0.55} = \boxed{0.0251\,a^2}$.

**(b)** $\langle x\rangle = \displaystyle\int_0^1 x\,|\psi|^2dx = a^2\left[\frac{x^4}4\right]_0^1 = \boxed{\frac{a^2}{4}}$.

**Normalization.** For $\psi$ to describe a particle that is somewhere in $0<x<1$, $\int_0^1a^2x^2dx = a^2/3 = 1$, so $a^2 = 3$. Then $P = 0.075$ and $\langle x\rangle = 0.75$: the particle is more likely at large $x$, where $|\psi|^2$ is larger.

### Problem 3 [HW practice · Beiser Ex 5.3]

An eigenfunction of the operator $d^2/dx^2$ is $\psi = e^{2x}$. Find the corresponding eigenvalue.

*Solution.* Apply the operator: $\dfrac{d^2}{dx^2}e^{2x} = 4e^{2x}$. This has the form (operator)$\psi$ = (number)$\psi$, so $e^{2x}$ is an eigenfunction and the eigenvalue is $\boxed{4}$.

### Problem 4 [HW practice · Beiser Ex 5.4]

Find the probability that a particle trapped in a box of width $L$ is between $0.45L$ and $0.55L$ for the ground and first excited states.

*Solution.* $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$, so

$$P = \frac2L\int_{0.45L}^{0.55L}\sin^2\frac{n\pi x}L\,dx = \left[\frac xL - \frac1{2n\pi}\sin\frac{2n\pi x}L\right]_{0.45L}^{0.55L}$$

- $n=1$: $P = 0.10 + \dfrac{\sin(0.9\pi)-\sin(1.1\pi)}{2\pi} = 0.10 + \dfrac{0.309+0.309}{6.283} = \boxed{0.198}$ (about 20 %).
- $n=2$: $P = 0.10 + \dfrac{\sin(1.8\pi)-\sin(2.2\pi)}{4\pi} = 0.10 - 0.0935 = \boxed{0.0065}$ (0.65 %).

Classically $P = 0.10$ for any state. The ground state puts twice as much probability at the centre, while the $n=2$ state has a node there. The quantum result approaches the classical 0.10 as $n\to\infty$.

### Problem 5 [HW practice · Beiser Ex 5.5]

Find the expectation value $\langle x\rangle$ of the position of a particle trapped in a box of width $L$.

*Solution.* 

$$\langle x\rangle = \frac2L\int_0^Lx\sin^2\frac{n\pi x}L\,dx = \frac2L\int_0^L\frac x2\left(1 - \cos\frac{2n\pi x}L\right)dx = \frac L2 - \frac1L\int_0^Lx\cos\frac{2n\pi x}L\,dx$$

The last integral is zero for integer $n$ (integrate by parts: the boundary term $x\sin(\cdot)$ vanishes at $0$ and $L$, and $\int\sin(\cdot)\,dx$ over whole periods is 0). So

$$\boxed{\langle x\rangle = \frac L2}\quad\text{for every }n$$

This follows from symmetry: $|\psi_n|^2$ is symmetric about $x = L/2$. The particle is on average in the middle even in states with a node there.

### Problem 6 [HW practice · Beiser Ex 5.6]

Electrons with energies 1.0 eV and 2.0 eV hit a barrier 10.0 eV high and 0.50 nm wide. (a) Find the transmission probabilities. (b) How are they affected if the barrier is twice as wide?

*Solution.* For $E<U$ and $kL\gg1$: $T\approx e^{-2k_2L}$ with $k_2 = \sqrt{2m(U-E)}/\hbar$.

**(a)** For $E = 1.0$ eV, $k_2 = \sqrt{2(9.11\times10^{-31})(9.0)(1.602\times10^{-19})}/1.055\times10^{-34} = 1.54\times10^{10}$ m⁻¹, so $2k_2L = 2(1.54\times10^{10})(0.50\times10^{-9}) = 15.4$ and

$$T_1 = e^{-15.4} = \boxed{2\times10^{-7}}$$

For $E = 2.0$ eV, $k_2 = 1.45\times10^{10}$ m⁻¹, $2k_2L = 14.5$:

$$T_2 = e^{-14.5} = \boxed{5\times10^{-7}}$$

The 2.0 eV electrons tunnel about 2.5 times more often (the book's slightly different values come from rounding $k_2$).

**(b)** Doubling $L$ squares the transmission: $T_1 = e^{-30.7} = 4.5\times10^{-14}$ and $T_2 = e^{-29.0} = 2.6\times10^{-13}$. The width matters much more than the energy, which is why tunnelling currents in a scanning tunnelling microscope are so sensitive to height.

### Problem 7 [HW practice · Beiser Ex 5.7]

Find the expectation value $\langle x\rangle$ for the first two states of a harmonic oscillator.

*Solution.* $\psi_0\propto e^{-ax^2/2}$ and $\psi_1\propto x\,e^{-ax^2/2}$ with $a = m\omega/\hbar$. In both, $|\psi|^2$ is an even function of $x$, so $x|\psi|^2$ is odd and integrates to zero over $-\infty<x<\infty$:

$$\langle x\rangle_0 = \langle x\rangle_1 = \boxed{0}$$

Physically, the particle spends equal time on both sides of the equilibrium position, as a classical oscillator does.

### Problem 8 [HW practice · Beiser Ch 5 Problem 1]

Which of the wave functions in Beiser's Fig. 5.15 cannot have physical significance in the interval shown? Why not?

*Solution.* A physical wave function must be **single-valued, continuous, and finite**, and its derivative $\partial\psi/\partial x$ must be continuous (where the potential is finite). From the figure:

- **(a)** a constant: acceptable on the interval shown.
- **(b)** two branches: $\psi$ has two values for each $x$, so it is **not single-valued**. Not acceptable.
- **(c)** and **(d)**: $\psi$ comes to a point (a cusp) where the slope jumps. The derivative is **discontinuous**, which would make $\partial^2\psi/\partial x^2$ infinite there, so Schrödinger's equation fails for finite $E-V$. Not acceptable.
- **(e)**: smooth, single-valued and finite. Acceptable.
- **(f)**: $\psi$ **jumps** at one point: discontinuous. Not acceptable.

So (a) and (e) are physically possible; (b), (c), (d), (f) are not.

### Problem 9 [HW practice · Beiser Ch 5 Problem 8]

Prove that Schrödinger's equation is linear by showing that $\Psi = a_1\Psi_1 + a_2\Psi_2$ is also a solution of Eq. (5.14) if $\Psi_1$ and $\Psi_2$ are solutions.

*Solution.* The time-dependent equation is $i\hbar\dfrac{\partial\Psi}{\partial t} = -\dfrac{\hbar^2}{2m}\dfrac{\partial^2\Psi}{\partial x^2} + V\Psi$. Substitute $\Psi = a_1\Psi_1 + a_2\Psi_2$ with constants $a_1, a_2$:

$$i\hbar\frac{\partial\Psi}{\partial t} = a_1\,i\hbar\frac{\partial\Psi_1}{\partial t} + a_2\,i\hbar\frac{\partial\Psi_2}{\partial t} = a_1\left[-\frac{\hbar^2}{2m}\Psi_1'' + V\Psi_1\right] + a_2\left[-\frac{\hbar^2}{2m}\Psi_2'' + V\Psi_2\right]$$

using that $\Psi_1$ and $\Psi_2$ each satisfy the equation. Regrouping:

$$= -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}(a_1\Psi_1 + a_2\Psi_2) + V(a_1\Psi_1 + a_2\Psi_2) = -\frac{\hbar^2}{2m}\Psi'' + V\Psi$$

So $\Psi$ satisfies the same equation. The equation is linear because $\Psi$ and its derivatives appear only to the first power, so the **superposition principle** holds, which is why interference of probability amplitudes occurs.

### Problem 10 [HW practice · Beiser Ch 5 Problem 9]

Show that $\langle px\rangle - \langle xp\rangle = \hbar/i$.

*Solution.* With $\hat p = -i\hbar\,\partial/\partial x$,

$$\langle px\rangle = \int\psi^*\,\hat p\,(x\psi)\,dx = -i\hbar\int\psi^*\left(\psi + x\frac{\partial\psi}{\partial x}\right)dx$$

$$\langle xp\rangle = \int\psi^*\,x\,\hat p\,\psi\,dx = -i\hbar\int\psi^*\,x\frac{\partial\psi}{\partial x}\,dx$$

Subtracting, the $x\,\partial\psi/\partial x$ terms cancel:

$$\langle px\rangle - \langle xp\rangle = -i\hbar\int\psi^*\psi\,dx = -i\hbar = \boxed{\frac\hbar i}$$

using the normalization $\int\psi^*\psi\,dx = 1$. So $p$ and $x$ do not commute, $[\hat x,\hat p] = i\hbar$, and this noncommutativity is the origin of $\Delta x\,\Delta p\ge\hbar/2$.

### Problem 11 [HW practice · Beiser Ch 5 Problem 13]

One possible wave function of a particle in the potential well of Beiser's Fig. 5.17 (a well with a floor that rises linearly from left to right) is sketched there. Explain why the wavelength and amplitude of $\psi$ vary as they do.

*Solution.* Inside the well $E - V(x)$ is the kinetic energy. Because the floor rises with $x$, the kinetic energy falls as $x$ increases.

- **Wavelength.** $\lambda(x) = h/p(x)$ with $p = \sqrt{2m[E - V(x)]}$, so as $V$ increases, $p$ drops and the **wavelength lengthens** toward the high-floor side, and shortens toward the low-floor side.
- **Amplitude.** Where the particle moves slowly it spends more time, so the probability density $|\psi|^2$ is larger there (classically $P\propto1/v$). The **amplitude is therefore greater** where $V$ is higher (kinetic energy lower).

The wave function must vanish at the infinite walls at both ends, so there are a whole number of half-wavelengths (not all equal) across the well.

### Problem 12 [HW practice · Beiser Ch 5 Problem 21]

A particle is in a cubic box with infinitely hard walls of edge $L$, with wave functions $\psi = A\sin\frac{n_x\pi x}L\sin\frac{n_y\pi y}L\sin\frac{n_z\pi z}L$. Find the normalization constant $A$.

*Solution.* Normalization: $\int|\psi|^2dV = 1$. The integral factorizes:

$$A^2\int_0^L\sin^2\frac{n_x\pi x}L\,dx\int_0^L\sin^2\frac{n_y\pi y}L\,dy\int_0^L\sin^2\frac{n_z\pi z}L\,dz = A^2\left(\frac L2\right)^3 = 1$$

since $\int_0^L\sin^2(n\pi x/L)\,dx = L/2$ for any integer $n\ge1$. Therefore

$$\boxed{A = \left(\frac2L\right)^{3/2} = \sqrt{\frac{8}{L^3}}}$$

### Problem 13 [HW practice · Beiser Ch 5 Problem 24]

Electrons with energies of 0.400 eV hit a barrier 3.00 eV high and 0.100 nm wide. Find the approximate probability that they penetrate it.

*Solution.* With $T\approx e^{-2kL}$ and $k = \sqrt{2m(U-E)}/\hbar$:

$$k = \frac{\sqrt{2(9.11\times10^{-31})(2.60)(1.602\times10^{-19})}}{1.055\times10^{-34}} = 8.26\times10^{9}\ \text{m}^{-1}$$

$$2kL = 2(8.26\times10^{9})(1.00\times10^{-10}) = 1.65,\qquad T\approx e^{-1.65} = \boxed{0.19}$$

(For such a thin barrier $kL\sim1$, so this is only approximate.)

### Problem 14 [HW practice · Beiser Ch 5 Problem 31]

Find $\langle x\rangle$ and $\langle x^2\rangle$ for the first two states of a harmonic oscillator.

*Solution.* Let $a = m\omega/\hbar$. The normalized states are

$$\psi_0 = \left(\frac a\pi\right)^{1/4}e^{-ax^2/2},\qquad \psi_1 = \left(\frac a\pi\right)^{1/4}\sqrt{2a}\,x\,e^{-ax^2/2}$$

**$\langle x\rangle$:** $|\psi_n|^2$ is even, so $\langle x\rangle_0 = \langle x\rangle_1 = 0$.

**$\langle x^2\rangle$:** Use $\displaystyle\int_{-\infty}^\infty x^{2k}e^{-ax^2}dx$: $\sqrt{\pi/a}\cdot\frac1{2a}$ for $k=1$ and $\sqrt{\pi/a}\cdot\frac3{4a^2}$ for $k=2$.

$$\langle x^2\rangle_0 = \sqrt{\frac a\pi}\int x^2e^{-ax^2}dx = \frac1{2a} = \boxed{\frac{\hbar}{2m\omega}}$$

$$\langle x^2\rangle_1 = 2a\sqrt{\frac a\pi}\int x^4e^{-ax^2}dx = 2a\cdot\frac3{4a^2} = \frac3{2a} = \boxed{\frac{3\hbar}{2m\omega}}$$

The mean-square displacement grows with $n$, as $(n+\frac12)\hbar/m\omega$. For the ground state, $\Delta x = \sqrt{\hbar/2m\omega}$, and with $\Delta p = \sqrt{m\hbar\omega/2}$ it saturates $\Delta x\Delta p = \hbar/2$.

# HW practice: Beiser Chapter 6, Quantum theory of the hydrogen atom

In-chapter examples 6.1 to 6.4 (6.4 is the Zeeman effect, which is not in the endsem scope but is included for completeness) and end-of-chapter problems 2, 6, 9, 11, 18, 24, 26, 31. The radial wave functions used: $R_{10} = \dfrac{2}{a_0^{3/2}}e^{-r/a_0}$, $R_{20} = \dfrac1{2\sqrt2\,a_0^{3/2}}\left(2 - \dfrac r{a_0}\right)e^{-r/2a_0}$.

### Problem 1 [HW practice · Beiser Ex 6.1]

Find the ground-state electron energy $E_1$ by substituting $R_{10}$ into Eq. (6.14).

*Solution.* For $l = 0$ Eq. (6.14) is

$$\frac{d^2R}{dr^2} + \frac2r\frac{dR}{dr} + \frac{2m}{\hbar^2}\left(E + \frac{e^2}{4\pi\epsilon_0r}\right)R = 0$$

With $R = Ce^{-r/a_0}$: $R' = -R/a_0$ and $R'' = R/a_0^2$. Substitute and divide by $R$:

$$\frac1{a_0^2} - \frac2{a_0r} + \frac{2mE}{\hbar^2} + \frac{2m}{\hbar^2}\frac{e^2}{4\pi\epsilon_0r} = 0$$

Collect terms: the $1/r$ terms cancel if $\dfrac{2}{a_0} = \dfrac{2me^2}{4\pi\epsilon_0\hbar^2}$, i.e. $a_0 = \dfrac{4\pi\epsilon_0\hbar^2}{me^2}$ (the Bohr radius). The constant terms must cancel too:

$$E_1 = -\frac{\hbar^2}{2ma_0^2} = \boxed{-\frac{me^4}{32\pi^2\epsilon_0^2\hbar^2} = -13.6\ \text{eV}}$$

which agrees with the Bohr model.

### Problem 2 [HW practice · Beiser Ex 6.2]

Verify that the average value of $1/r$ for a 1s electron in hydrogen is $1/a_0$.

*Solution.* The radial probability density for 1s is $P(r) = 4\pi r^2|\psi_{1s}|^2 = \dfrac4{a_0^3}r^2e^{-2r/a_0}$. Then

$$\left\langle\frac1r\right\rangle = \int_0^\infty\frac1rP(r)\,dr = \frac4{a_0^3}\int_0^\infty r\,e^{-2r/a_0}dr = \frac4{a_0^3}\left(\frac{a_0}2\right)^2 = \boxed{\frac1{a_0}}$$

using $\int_0^\infty r\,e^{-\beta r}dr = 1/\beta^2$. The average potential energy is $-e^2/(4\pi\epsilon_0a_0) = -27.2$ eV, twice the total energy $-13.6$ eV, as the virial theorem requires.

### Problem 3 [HW practice · Beiser Ex 6.3]

How much more likely is a 1s electron in hydrogen to be at a distance $a_0$ from the nucleus than at $a_0/2$?

*Solution.* Compare the radial probability densities $P(r) = \dfrac4{a_0^3}r^2e^{-2r/a_0}$:

$$\frac{P(a_0)}{P(a_0/2)} = \frac{a_0^2e^{-2}}{(a_0^2/4)e^{-1}} = \frac4e = \boxed{1.47}$$

It is about 1.5 times as likely to be found at $a_0$. This is the peak of $P(r)$, where $r^2$ growing and $e^{-2r/a_0}$ decaying balance.

### Problem 4 [HW practice · Beiser Ex 6.4]

A sample is placed in a 0.300 T magnetic field. How far apart are the Zeeman components of the 450 nm spectral line?

*Solution.* The normal Zeeman components differ in frequency by $\Delta\nu = \dfrac{eB}{4\pi m}$. Since $\nu = c/\lambda$, $|d\nu| = c\,d\lambda/\lambda^2$, so

$$\Delta\lambda = \frac{\lambda^2\Delta\nu}c = \frac{eB\lambda^2}{4\pi mc} = \frac{(1.602\times10^{-19})(0.300)(450\times10^{-9})^2}{4\pi(9.11\times10^{-31})(3.00\times10^{8})} = 2.8\times10^{-12}\ \text{m} = \boxed{0.0028\ \text{nm}}$$

The components are so close (a few parts in $10^6$ of $\lambda$) that a spectrometer of high resolution is needed.

### Problem 5 [HW practice · Beiser Ch 6 Problem 2]

Show that $\Theta_{20}(\theta) = \dfrac{\sqrt{10}}4(3\cos^2\theta - 1)$ is a solution of Eq. (6.13) and that it is normalized.

*Solution.* Eq. (6.13) for $l=2$, $m_l = 0$:

$$\frac1{\sin\theta}\frac{d}{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right) + l(l+1)\Theta = 0,\quad l(l+1) = 6$$

Let $u = \cos\theta$. Then $\dfrac1{\sin\theta}\dfrac d{d\theta}\left(\sin\theta\dfrac{d\Theta}{d\theta}\right) = \dfrac d{du}\left[(1-u^2)\dfrac{d\Theta}{du}\right]$. With $\Theta = c(3u^2 - 1)$: $d\Theta/du = 6cu$, so $(1-u^2)6cu = 6c(u - u^3)$ and its derivative is $6c(1 - 3u^2)$. Add $6\Theta = 6c(3u^2-1)$:

$$6c(1 - 3u^2) + 6c(3u^2 - 1) = 0\ ✓$$

**Normalization:** $\int_0^\pi|\Theta|^2\sin\theta\,d\theta = \displaystyle\frac{10}{16}\int_{-1}^{1}(3u^2-1)^2du = \frac{10}{16}\int_{-1}^1(9u^4 - 6u^2 + 1)du = \frac{10}{16}\left(\frac{18}5 - 4 + 2\right) = \frac{10}{16}\cdot\frac85 = 1\ ✓$

### Problem 6 [HW practice · Beiser Ch 6 Problem 6]

The azimuthal wave function is $\Phi(\phi) = Ae^{im_l\phi}$. Show that $A = 1/\sqrt{2\pi}$ by integrating $|\Phi|^2$ over all angles from 0 to $2\pi$.

*Solution.* Normalization requires

$$\int_0^{2\pi}|\Phi|^2d\phi = |A|^2\int_0^{2\pi}e^{-im_l\phi}e^{im_l\phi}d\phi = |A|^2(2\pi) = 1$$

so $A = \boxed{1/\sqrt{2\pi}}$ (taking $A$ real and positive). The result is independent of $m_l$ because $|e^{im_l\phi}| = 1$.

### Problem 7 [HW practice · Beiser Ch 6 Problem 9]

Under what circumstances, if any, is $L_z$ equal to $L$?

*Solution.* $L = \sqrt{l(l+1)}\,\hbar$ and $L_z = m_l\hbar$ with $|m_l|\le l$. For $l\ge1$,

$$|L_z|\le l\hbar < \sqrt{l(l+1)}\,\hbar = L$$

so $L_z$ never reaches $L$. The only case where they are equal is $l = 0$, where $L = L_z = 0$. If $L_z$ equalled $L$, the angular momentum vector would point exactly along $z$, and then $L_x = L_y = 0$ simultaneously with $L_z$ would be known, which the uncertainty principle forbids unless $L = 0$.

### Problem 8 [HW practice · Beiser Ch 6 Problem 11]

What are the possible values of the magnetic quantum number $m_l$ of an atomic electron whose orbital quantum number is $l = 4$?

*Solution.* $m_l$ runs from $-l$ to $+l$ in integer steps:

$$\boxed{m_l = -4, -3, -2, -1, 0, +1, +2, +3, +4}$$

which is $2l + 1 = 9$ values.

### Problem 9 [HW practice · Beiser Ch 6 Problem 18]

According to Fig. 6.11, $P\,dr$ has two maxima for a 2s electron. Find the values of $r$ at which these maxima occur.

*Solution.* Use $x = r/a_0$. The radial probability density is

$$P(r) = r^2R_{20}^2\propto x^2(2-x)^2e^{-x}$$

Maximize $\ln P = 2\ln x + 2\ln|2-x| - x$:

$$\frac{d\ln P}{dx} = \frac2x - \frac2{2-x} - 1 = 0$$

Multiply by $x(2-x)$: $2(2-x) - 2x - x(2-x) = 0\ \Rightarrow\ x^2 - 6x + 4 = 0$:

$$x = 3\pm\sqrt5 \;\Rightarrow\; \boxed{r = 0.76\,a_0\ \text{and}\ r = 5.24\,a_0}$$

The inner peak is smaller than the outer one, with a node (where $P = 0$) at $r = 2a_0$ in between.

### Problem 10 [HW practice · Beiser Ch 6 Problem 24]

A hydrogen atom is in the 4p state. To what state or states can it go by radiating a photon in an allowed transition?

*Solution.* The selection rule is $\Delta l = \pm1$ (and $\Delta m_l = 0, \pm1$). The 4p state has $l = 1$, so the final state has $l = 0$ or $l = 2$. It must also be lower in energy, so $n<4$ (the $n=4$ states are degenerate with it and cannot radiate):

- $l = 0$: **3s, 2s, 1s**
- $l = 2$: **3d** (there is no 2d or 1d)

$$\boxed{4p\to 3s,\ 2s,\ 1s,\ 3d}$$

### Problem 11 [HW practice · Beiser Ch 6 Problem 26]

The selection rule for transitions in a harmonic oscillator is $\Delta n = \pm1$. (a) Justify this rule on classical grounds. (b) Verify from the wave functions that $n = 1\to3$ is forbidden whereas $n = 1\to0$ and $n = 1\to2$ are allowed.

*Solution.* **(a)** A classical charged oscillator at frequency $\nu$ radiates only at its own frequency $\nu$ (and no harmonics, for a purely harmonic motion). Quantum mechanically, $E_n = (n+\frac12)h\nu$, so a photon of energy $h\nu$ requires $\Delta E = h\nu$, i.e. $\Delta n = \pm1$. A transition with $\Delta n = 2$ would emit $2h\nu$, i.e. at $2\nu$, which the classical oscillator does not produce.

**(b)** Radiation is governed by the dipole matrix element $\int\psi_{n'}\,x\,\psi_n\,dx$; the transition is forbidden if it is zero. Write $y = \sqrt{m\omega/\hbar}\,x$, so that $\psi_n\propto H_n(y)e^{-y^2/2}$ with $H_0 = 1$, $H_1 = 2y$, $H_2 = 4y^2 - 2$, $H_3 = 8y^3 - 12y$. The matrix element is proportional to $\int H_{n'}(y)\,y\,H_n(y)\,e^{-y^2}dy$.

- $1\to0$: $\int 1\cdot y\cdot2y\,e^{-y^2}dy = 2\int y^2e^{-y^2}dy = \sqrt\pi\ne0$. **Allowed.**
- $1\to2$: $\int(4y^2-2)(y)(2y)e^{-y^2}dy = \int(8y^4 - 4y^2)e^{-y^2}dy = 8\cdot\frac{3\sqrt\pi}4 - 4\cdot\frac{\sqrt\pi}2 = 4\sqrt\pi\ne0$. **Allowed.**
- $1\to3$: $\int(8y^3-12y)(y)(2y)e^{-y^2}dy = \int(16y^5 - 24y^3)e^{-y^2}dy = 0$, since the integrand is odd. **Forbidden.**

The parity argument: $\psi_1$ and $\psi_3$ both have odd parity, and $x$ is odd, so the integrand is odd and vanishes. In general $x$ connects only states of opposite parity, and by the properties of Hermite polynomials only $n' = n\pm1$ survive.

### Problem 12 [HW practice · Beiser Ch 6 Problem 31]

Find the minimum magnetic field needed for the Zeeman effect to be observed in a spectral line of 400 nm wavelength when the spectrometer's resolution is 0.010 nm.

*Solution.* The components are separated by $\Delta\lambda = \dfrac{eB\lambda^2}{4\pi mc}$. They are resolved when $\Delta\lambda\ge0.010$ nm:

$$B\ge\frac{4\pi mc\,\Delta\lambda}{e\lambda^2} = \frac{4\pi(9.11\times10^{-31})(3.00\times10^{8})(1.0\times10^{-11})}{(1.602\times10^{-19})(4.00\times10^{-7})^2} = \boxed{1.3\ \text{T}}$$

Fields of this order are attainable with an electromagnet.
