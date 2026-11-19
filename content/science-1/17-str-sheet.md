# Special relativity sheet (Beiser ch. 1 + slides)

**Sources and tags**
- Slides: `STR.tex`, lines 113–366 (lectures STR-1 to STR-4).
- Beiser, *Concepts of Modern Physics* 6e, ch. 1 and its Appendices I–II. Equation numbers like (1.41) are Beiser's.
- Also used: `03-lecture-notes/relativity/STR-notes.pdf` and the tutorial walkthrough.
- Tags: **[B]** = Beiser only, **[S]** = slides only, **[N]** = notes only. Everything else is in both.

## 0. Setup and conventions
- Frame $K'$ (Beiser: $S'$) moves at velocity $v$ along $+x$ relative to $K$ ($S$). The axes are parallel and the origins coincide at $t = t' = 0$.

$$\beta = \frac vc,\qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} = \frac{1}{\sqrt{1 - \beta^2}} \ge 1$$

| $\beta$ | 0.6 | 0.8 | 0.9 | 0.99 | 0.998 | 0.999 |
|---|---|---|---|---|---|---|
| $\gamma$ | 1.25 | 5/3 = 1.667 | 2.29 | 7.09 | 15.8 | 22.4 |

| Identity | Use |
|---|---|
| $\gamma^2(1 - \beta^2) = 1$, $\gamma^2\beta^2 = \gamma^2 - 1$ | algebra |
| $\gamma \approx 1 + \tfrac12\beta^2$ | $\beta \ll 1$ |
| $\beta = \dfrac{pc}{E}$, $\gamma = \dfrac{E}{mc^2} = 1 + \dfrac{KE}{mc^2}$, $\beta\gamma = \dfrac{p}{mc}$ | particle kinematics |

**Proper time** $t_0$ (or $\tau$): the time between two events that happen **at the same place** in some frame. That frame is the clock's rest frame.

**Proper length** $L_0$: the length measured in the object's rest frame.

**Sign convention for the interval (it differs between sources):**
- Slides: $(\Delta s)^2 = \Delta x^2 + \Delta y^2 + \Delta z^2 - c^2\Delta t^2$, so a timelike interval has $(\Delta s)^2 < 0$.
- Beiser (1.53) and the tutorial: $(\Delta s)^2 = c^2\Delta t^2 - \Delta x^2$, so a timelike interval has $(\Delta s)^2 > 0$.
- The physics is the same either way: **timelike** means $\lvert c\Delta t\rvert > \lvert\Delta x\rvert$. State which convention you are using.

## 1. Why relativity: the postulates (Beiser 1.1; slides `STR.tex:113`)
**The problem**
- Maxwell's equations predict one speed of light, $c$, and the EM wave equation is **not** Galilean-invariant.
- The same EM phenomenon is described differently in different frames:
    - a coil moving past a magnet at rest: force $q\vec v\times\vec B$;
    - a magnet moving past a coil at rest: induced $\vec E$ (Faraday).
- **[B]** The ether was proposed as an absolute rest frame. Michelson–Morley found no ether wind (a null result).

**Einstein's postulates (1905)**
1. The laws of physics are the same in all inertial frames, and there is no preferred frame.
2. The speed of light in free space is the same, $c$, in all inertial frames, independent of the motion of the source or the observer.

$c = 2.998\times10^8$ m/s $\approx 300$ m/μs $\approx 1$ ft/ns.

## 2. Galilean transformation (the classical limit; Beiser 1.26–1.32)
$$x' = x - vt,\quad y' = y,\quad z' = z,\quad t' = t;\qquad u_x' = u_x - v$$

It fails for light: it would give $c' = c - v$.

## 3. Lorentz transformation (Beiser App. I 1.41–1.48; slides `STR.tex:154`)
| Forward ($K \to K'$) | Inverse ($K' \to K$) |
|---|---|
| $x' = \gamma(x - vt)$ | $x = \gamma(x' + vt')$ |
| $y' = y$, $z' = z$ | $y = y'$, $z = z'$ |
| $t' = \gamma\left(t - \dfrac{vx}{c^2}\right)$ | $t = \gamma\left(t' + \dfrac{vx'}{c^2}\right)$ |

- **Symmetric form:** $x' = \gamma(x - \beta\,ct)$, $ct' = \gamma(ct - \beta x)$.
- **Inverse rule:** swap primed and unprimed variables, and $v \to -v$.
- **Differences:** $\Delta x' = \gamma(\Delta x - v\Delta t)$, $\Delta t' = \gamma(\Delta t - v\Delta x/c^2)$. Always work with differences between events.
- **Classical limit:** as $v \ll c$, $\gamma \to 1$ and $vx/c^2 \to 0$, which gives back the Galilean transformation.

**Derivation outline (slides `STR.tex:188`; Beiser 1.33–1.40)**
1. A linear guess: $x' = k(x - vt)$, because the origin $O'$ is at $x = vt$.
2. The first postulate gives the same $k$ in reverse: $x = k(x' + vt')$.
3. Eliminate $x'$: $t' = kt + \dfrac{1 - k^2}{kv}\,x$ (slides write $\gamma$ for $k$).
4. The second postulate: a flash from the common origin at $t = 0$ obeys $x = ct$ and $x' = ct'$. Substituting gives $k = \dfrac{1}{\sqrt{1 - v^2/c^2}} = \gamma$.

## 4. Relativity of simultaneity (slides `STR.tex:140`; notes §11–12)
Events that are simultaneous in one frame are generally **not** simultaneous in another, unless they happen at the same place.

$$\Delta t = 0\ \text{in } K \text{ with separation } \Delta x\ \Rightarrow\ \Delta t' = -\frac{\gamma v\,\Delta x}{c^2}$$

$$\Delta t' = 0\ \text{in } K' \text{ with separation } \Delta x'\ \Rightarrow\ \Delta t = \frac{\gamma v\,\Delta x'}{c^2}$$

- **The train:** flashes from the front and back of a moving train reach a mid-train observer together, so in the train frame they were simultaneous.
- On the platform, the rear flash happened **first**. The light has speed $c$ in both frames, and the train moves towards the front flash.

## 5. Time dilation (Beiser 1.2, eq. 1.3; slides `STR.tex:200`)
$$\boxed{\Delta t = \gamma\,\Delta t_0 = \frac{\Delta t_0}{\sqrt{1 - v^2/c^2}}}$$

$\Delta t_0$ is the proper time, measured by the clock at rest. Every other observer measures a longer time: **a moving clock runs slow.**

- **Light-clock derivation (Beiser):**
    - Mirrors are a distance $L_0$ apart, so at rest one tick is $t_0 = 2L_0/c$.
    - Seen from the ground, the light travels a diagonal: $(ct/2)^2 = L_0^2 + (vt/2)^2$.
    - Solving gives $t = t_0/\sqrt{1 - v^2/c^2}$.
- **Lorentz derivation (slides):** the clock ticks at $(0, n\tau_0)$ in $K$. In $K'$ these events are at $t' = \gamma n\tau_0$, so the ticks are $\gamma\tau_0$ apart.
- **The effect is symmetric:** each observer sees the other's clock run slow (slides `STR.tex:259`).
- **Muon example (Beiser):**
    - Lifetime $\tau_0 = 2.2$ μs, speed $0.998c$, so $\gamma = 15.8$.
    - Without dilation it would travel 0.66 km; with dilation it travels 10.4 km, so it reaches the ground.
    - In the muon's frame, the atmosphere's 10.4 km is length-contracted to 0.66 km.

## 6. Length contraction (Beiser 1.4, eq. 1.9; slides `STR.tex:216`)
$$\boxed{L = \frac{L_0}{\gamma} = L_0\sqrt{1 - v^2/c^2}}$$

- It applies only along the direction of motion. Perpendicular lengths are unchanged.
- **The ends must be measured simultaneously in the measuring frame.** That is why the slides use the inverse transformation: with $\Delta t' = 0$, $\Delta x = \gamma\Delta x'$, so $L_0 = \gamma L'$.
- **Tutorial P1 (rocket):**
    - $L_0 = 300$ m at $0.8c$ ($\gamma = 5/3$, $v = 240$ m/μs). Length in the station frame: $L = 180$ m.
    - The tail passes marker A after 180/240 = 0.75 μs in the station frame. That is **proper** time, because both events happen at A.
    - In the rocket frame the same interval is $\gamma\times0.75 = 1.25$ μs $= L_0/v$.

## 7. Twin paradox (Beiser 1.5)
- The travelling twin ages less. The situation is **not** symmetric, because only the traveller accelerates (changes inertial frame) at turnaround.
- **Beiser example:**
    - Dick (20 y old) travels at $0.80c$ to a star 20 ly away and back.
    - Jane (on Earth) ages $2\times20/0.8 = 50$ y.
    - For Dick the distance is $20/\gamma = 12$ ly each way, so he ages $2\times12/0.8 = 30$ y.
    - Doppler-shifted signals sent each year confirm the same result in both accounts.

$$t_\text{traveller} = \frac{t_\text{home}}{\gamma}$$

## 8. Velocity transformation and addition (Beiser 1.49–1.51; slides `STR.tex:270`)
A particle has velocity $\vec u$ in $K$; $K'$ moves at $v$ along $x$:

$$u_x' = \frac{u_x - v}{1 - u_xv/c^2},\qquad u_y' = \frac{u_y}{\gamma\left(1 - u_xv/c^2\right)},\qquad u_z' = \frac{u_z}{\gamma\left(1 - u_xv/c^2\right)}$$

**Derivation (slides):** $u_x' = \dfrac{dx'/dt}{dt'/dt} = \dfrac{\gamma(u_x - v)}{\gamma(1 - u_xv/c^2)}$.

**Addition**, for $u'$ measured in $K'$, which moves at $v$:

$$u = \frac{u' + v}{1 + u'v/c^2}$$

- $0.5c$ added to $0.5c$ gives $0.8c$; $0.9c$ added to $0.9c$ gives $0.9945c$.
- If $u' = c$, then $u = c$: $c$ is invariant and you can never exceed it.
- **Aberration of light [N]:** for $u_x = c\cos\theta$,

$$\cos\theta' = \frac{\cos\theta - \beta}{1 - \beta\cos\theta},\qquad \tan\theta' = \frac{\sin\theta}{\gamma(\cos\theta - \beta)}$$

## 9. Relativistic Doppler effect (Beiser 1.3, eqs 1.4–1.8; slides `STR.tex:238`)
For light only the **relative** velocity matters, because there is no medium.

| Case | Observed frequency |
|---|---|
| source and observer **receding** | $\nu = \nu_0\sqrt{\dfrac{1 - \beta}{1 + \beta}}$ (slides: moving observer) |
| **approaching** | $\nu = \nu_0\sqrt{\dfrac{1 + \beta}{1 - \beta}}$ |
| combined (Beiser 1.8) | $\nu = \nu_0\sqrt{\dfrac{1 + v/c}{1 - v/c}}$, with $v > 0$ approaching, $v < 0$ receding |
| **transverse** (motion perpendicular to the line of sight) | $\nu = \nu_0\sqrt{1 - \beta^2} = \nu_0/\gamma$ (pure time dilation; no classical analogue) **[B]** |
| sound (needs a medium) | $\nu = \nu_0\,\dfrac{1 + v/c_s}{1 - V/c_s}$, with $v$ the observer and $V$ the source speed, both positive towards each other **[B]** |

- **Wavelength:** receding gives $\lambda = \lambda_0\sqrt{\dfrac{1 + \beta}{1 - \beta}}$, a **redshift**.
- **Small $\beta$:** $\dfrac{\Delta\lambda}{\lambda_0} \approx \beta$, so the recession speed is $v \approx c\,\Delta\lambda/\lambda_0$.
- At $\beta = 0.8$: receding gives $\nu_0/3$, approaching gives $3\nu_0$, transverse gives $0.6\nu_0$.
- **Hubble's law [B]:** $v = H_0R$, with $H_0 \approx 21$ km/s per million light-years. Galaxies recede faster the further away they are, so the universe is expanding.
- **Slide derivation:** an observer moves at $v$ away from a source emitting pulses every $t_0$. The pulses reach them at $ct_n = nct_0\,c/(c - v)$. Transform to the observer's frame. There the pulses arrive $\Delta t' = \dfrac{t_0}{\gamma(1 - \beta)} = t_0\sqrt{\dfrac{1 + \beta}{1 - \beta}}$ apart, so $\nu' = \nu\sqrt{(1 - \beta)/(1 + \beta)}$.

## 10. Relativistic momentum (Beiser 1.7, eqs 1.10–1.19; slides `STR.tex:282`)
$$\boxed{\vec p = \gamma m\vec v = \frac{m\vec v}{\sqrt{1 - v^2/c^2}}}$$

- **Why the definition changes:** in a glancing elastic collision viewed from two frames, the transverse velocity of the other particle is reduced by $1/\gamma$, because of time dilation. So $p = mv$ is not conserved in all frames, but $p = \gamma mv$ is.
- $m$ is the (invariant) rest mass. Beiser 6e does not use "relativistic mass".
- **Second law:** $\vec F = \dfrac{d\vec p}{dt} = \dfrac{d(\gamma m\vec v)}{dt}$. This is **not** $m\vec a$. As $v \to c$, $p \to \infty$, so no finite force reaches $c$.
- Units: momentum in MeV/c. A proton at $0.800c$ has $p = \gamma m v = 1251$ MeV/c.

## 11. Energy (Beiser 1.8, eqs 1.20–1.23; slides `STR.tex:297`)
**Derivation (slides).** Work–energy:

$$KE = \int\vec F\cdot d\vec r = \int\frac{d(\gamma m\vec u)}{dt}\cdot\vec u\,dt = \int_0^u \frac{d}{dt}\left(\gamma mc^2\right)dt = (\gamma - 1)mc^2$$

| Quantity | Formula |
|---|---|
| kinetic energy | $KE = (\gamma - 1)mc^2 = E - E_0$ |
| total energy | $E = \gamma mc^2 = mc^2 + KE$ |
| rest energy | $E_0 = mc^2$ |
| low speed | $KE \approx \tfrac12mv^2 + \tfrac38\dfrac{mv^4}{c^2} + \cdots$, which gives $\tfrac12mv^2$ when $v \ll c$ |
| mass–energy | $\Delta E = \Delta m\,c^2$ (energy released when rest mass decreases) |

- A system's rest energy includes internal KE and binding energy. A bound system has **less** rest energy than its separated parts.
- $KE = mc^2$ means $\gamma = 2$ and $v = 0.866c$.

## 12. Energy–momentum relation (Beiser 1.9, eqs 1.24–1.25; slides `STR.tex:297`)
$$\boxed{E^2 = (pc)^2 + (mc^2)^2}\qquad\text{since } E^2 - p^2c^2 = \gamma^2m^2c^4\left(1 - \frac{u^2}{c^2}\right) = m^2c^4$$

- **Massless particle** ($m = 0$, e.g. a photon): $E = pc$, and it must travel at $c$.
- **Ultra-relativistic** ($KE \gg mc^2$): $E \approx pc$.
- **Beiser Example 1.8** ($p = 2.000$ MeV/c): an electron has $E = \sqrt{0.511^2 + 2.000^2} = 2.064$ MeV; a photon has $E = 2.000$ MeV.
- **Invariant:** $E^2 - p^2c^2 = (mc^2)^2$ is the same in all frames, which mirrors the spacetime interval.

| Unit | Value |
|---|---|
| eV | $1\ \text{eV} = 1.602\times10^{-19}$ J; keV, MeV, GeV for larger energies |
| electron | $m_ec^2 = 0.511$ MeV |
| proton | $m_pc^2 = 938.3$ MeV |
| neutron | $m_nc^2 = 939.6$ MeV |
| atomic mass unit | $1\ \text{u} = 931.5$ MeV/c² |
| mass units | MeV/c², GeV/c² |

## 13. Spacetime and the invariant interval (Beiser App. II, eqs 1.52–1.55; slides `STR.tex:317`)
- **4-vector:** $\vec s = (x, y, z, ict)$, with $s^2 = x^2 + y^2 + z^2 - (ct)^2$ the same in all frames. The $i$ makes time behave like a fourth coordinate.
- **Proof that the interval is invariant (slides):**

$$(\Delta s')^2 = \gamma^2\left[(\Delta x - \beta c\Delta t)^2 - (c\Delta t - \beta\Delta x)^2\right] + \Delta y^2 + \Delta z^2 = \gamma^2(1 - \beta^2)\left[\Delta x^2 - c^2\Delta t^2\right] + \cdots = (\Delta s)^2$$

| Interval | Condition | Meaning |
|---|---|---|
| **timelike** | $\lvert c\Delta t\rvert > \lvert\Delta x\rvert$ | a frame exists where both events are at the same place; they **can** be causally connected; the proper time is $\Delta\tau = \sqrt{\Delta t^2 - \Delta x^2/c^2}$ |
| **spacelike** | $\lvert c\Delta t\rvert < \lvert\Delta x\rvert$ | a frame exists where they are simultaneous; **no** causal link; the order in time can differ between frames |
| **lightlike** | $\lvert c\Delta t\rvert = \lvert\Delta x\rvert$ | connected only by a light signal |

- A **worldline** is the path of an object in spacetime.
- The **light cone** is the set of lines $x = \pm ct$. Inside it are the future and past (timelike); outside is "elsewhere" (spacelike).
- Light has slope $\pm1$ on a $ct$–$x$ diagram in **every** frame.

## 14. Electricity and magnetism from relativity (Beiser 1.6; slides `STR.tex:335`)
**Line charge** $\lambda$ on the $x$-axis, with a test charge $q$ at distance $d$.

In the rest frame $K$ there is only an electric force:

$$F = qE = \frac{q\lambda}{2\pi\varepsilon_0 d}$$

In $K'$ the line charges move at $v$:
- Length contraction raises the charge density: $\lambda' = \gamma\lambda$, so there is a **larger** repulsive electric force.
- The moving charges form a current $I = \lambda'v$, so there is an **attractive** magnetic force: $B = \dfrac{\mu_0I}{2\pi d}$, $F_B = qvB$.
- With $\mu_0\varepsilon_0 = 1/c^2$:

$$F' = \frac{q\gamma\lambda}{2\pi\varepsilon_0d}\left(1 - \frac{v^2}{c^2}\right) = \frac{F}{\gamma}$$

- The magnetic force cancels the excess electric force. What is left, $F/\gamma$, is exactly the transverse force transformation that time dilation requires: the transverse momentum change is the same in both frames, but $dt' = \gamma\,dt$.
- **Conclusion:** electric and magnetic forces are the same interaction seen from different inertial frames. Maxwell links the fields; relativity unifies them.
- **Beiser's version:** a current-carrying wire is neutral in the lab. Seen by a moving charge, the positive and negative charge densities contract differently, so the wire looks charged, and the "magnetic" force becomes an electric one.

## 15. General relativity, qualitative (Beiser 1.10; slides `STR.tex:357`)
- **Principle of equivalence:** a uniform gravitational field cannot be told apart from an accelerated frame. Gravitational mass equals inertial mass.
- Light bends in an accelerating lab, so it must bend in gravity. Mass curves spacetime, and curved spacetime tells mass how to move.
- **Evidence:**
    - starlight bent by the Sun (1919 eclipse);
    - gravitational lensing by galaxies (multiple images);
    - gravitational redshift and black holes (Beiser ch. 2);
    - gravitational waves, travelling at $c$ (predicted; Beiser 6e notes they had not yet been detected directly; first detected by LIGO in 2015).

## 16. Problem-solving checklist
1. Name the frames and the **events**, and write each event's coordinates $(x, t)$.
2. Decide which frame measures **proper** time (same place) or **proper** length (rest frame).
3. Time dilation: proper is the **shorter** time. Length contraction: proper is the **longer** length.
4. If unsure, use the full Lorentz transformation on the events rather than shortcuts. For lengths, the ends must be simultaneous in the measuring frame.
5. Check: $u < c$, $\gamma \ge 1$, and the interval comes out the same in both frames.

## 17. Common mistakes
1. Applying $\Delta t = \gamma\Delta t_0$ when neither frame has both events at the same place. Use the Lorentz transformation instead.
2. Contracting lengths perpendicular to the motion.
3. Adding velocities classically, or using $u = u' + v$ for light.
4. Writing $p = mv$ or $KE = \tfrac12mv^2$ at high speed. Use $p = \gamma mv$ and $KE = (\gamma - 1)mc^2$.
5. Using $E = mc^2$ for a moving particle. That is the **rest** energy; the total is $E = \gamma mc^2$.
6. Mixing interval sign conventions (see section 0).
7. Taking the sign of $\beta$ in the Doppler formula wrongly. Receding means a lower frequency.
8. Thinking "both clocks run slow, so it's a contradiction". Simultaneity is relative; and in the twin paradox only one twin changes frame.
