# Learn: Special relativity

Two postulates, the same laws in every inertial frame and the same speed of light in every inertial frame, force us to give up absolute time. From them follow the Lorentz transformation, time dilation, length contraction, relativistic velocity addition, the Doppler effect, and the relations E = γmc² and E² = p²c² + m²c⁴. Sources: slides `STR.tex:113` to `:366`, Beiser ch 1 (1.1–1.10), MT ch 14, the tutorial (`04-tutorials/relativity`), and your sheet `notes/17-str-sheet.md`. The questions follow the 2025 midsem (Q2, Q13), the 2026 midsem Q11, HW 2b and the tutorial's rocket problem.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## Why relativity was needed

Newtonian mechanics satisfies a principle of relativity of its own. If one frame moves at constant velocity relative to another, the Galilean transformation x′ = x − vt, t′ = t carries the laws of motion over unchanged, and no mechanical experiment can tell which frame is "really" at rest. Electromagnetism does not fit this scheme. Maxwell's equations predict that light travels at one definite speed c, and under a Galilean transformation the wave equation changes its form, so the speed would be c − v in a moving frame. There was also an awkward asymmetry in the theory itself. A coil moving past a stationary magnet has a current driven by the magnetic force qv × B, while a magnet moving past a stationary coil drives the same current through an induced electric field, although only the relative motion can matter. Experiments, most famously that of Michelson and Morley, found no sign of any motion of the earth through a medium that might carry light. Einstein resolved the conflict in 1905 by taking two postulates as basic: the laws of physics are the same in all inertial frames, and the speed of light in free space has the same value c in all inertial frames, whatever the motion of the source or observer.

## Relativity of simultaneity

The second postulate looks harmless, but it overturns the idea of a universal time. Consider an observer at the middle of a moving train who receives two flashes, one from each end, at the same moment. Since the flashes travelled equal distances at the same speed c, the observer concludes that they were emitted simultaneously. An observer on the platform sees the train moving forward during the flight of the light, so the rear flash had further to go to reach the mid-point than the front one. Since light also travels at c in the platform frame, the rear flash must have been emitted first. Two events that are simultaneous in one frame are not, in general, simultaneous in another. Only events at the same place can be agreed by everyone to be simultaneous.

## The Lorentz transformation

The Lorentz transformation gives the precise relation between the coordinates of an event in two frames. Suppose frame K′ moves at speed v along the x-axis of K and the origins coincide at t = t′ = 0. The transformation must be linear, it must reduce to the Galilean one at low speeds, and the inverse must have the same form with v replaced by −v, as the first postulate requires. Demanding in addition that a light flash from the origin travels as x = ct in K and as x′ = ct′ in K′ fixes the result: x′ = γ(x − vt), t′ = γ(t − vx/c²), with y and z unchanged and γ = 1/√(1 − v²/c²). The term vx/c² in the time equation is the relativity of simultaneity written as a formula. When v is small compared with c, γ is nearly one, this term is negligible, and the Galilean transformation is recovered.

## Time dilation and length contraction

Two striking consequences follow. A clock at rest in one frame ticks at intervals Δt₀, its proper time. Since the ticks happen at the same place in that frame, the Lorentz transformation shows that an observer moving relative to the clock measures intervals Δt = γΔt₀. A moving clock runs slow. Muons produced high in the atmosphere live only 2.2 μs in their own frame, and without this effect they could travel only about 0.66 km, yet they are observed in large numbers at sea level. Lengths are affected in a complementary way. To measure the length of a moving rod, an observer must record the positions of its two ends at the same time in their own frame, and the Lorentz transformation then gives L = L₀/γ, where L₀ is the proper length measured in the rod's rest frame. The contraction occurs only along the direction of motion. In the muon's frame it is the atmosphere that is contracted, so that the two accounts agree on whether the muon arrives.

## Symmetry and the twin paradox

These effects are entirely symmetric between two inertial observers: each finds the other's clocks slow and the other's rods short. There is no contradiction, because the two observers disagree about which events are simultaneous. The twin paradox appears to break this symmetry. One twin stays at home while the other travels to a distant star and returns, and the traveller is found to be younger. The situations of the two are not equivalent, however. The traveller changes from one inertial frame to another at the turning point, while the stay-at-home twin remains in a single inertial frame throughout, so it is the traveller whose clock records less time.

## Velocity addition and the Doppler effect

Velocities cannot be added in the ordinary way either. If a body moves at u′ in frame K′, which itself moves at v relative to K, its speed in K is u = (u′ + v)/(1 + u′v/c²). For small speeds the denominator is close to one and this is ordinary addition. But putting u′ = c gives u = c for any v, so the formula is consistent with the second postulate, and no combination of speeds below c can ever produce a speed greater than c. The same reasoning applied to the arrival of successive wave crests from a moving source gives the relativistic Doppler effect. For a source and observer moving apart at relative speed v, the observed frequency is ν = ν₀√((1 − β)/(1 + β)), with β = v/c. Unlike sound, light needs no medium, so only the relative velocity enters. The red shift of light from distant galaxies, which increases with their distance, is the evidence that the universe is expanding.

## Relativistic momentum and energy

Mechanics must also be revised. If momentum is defined as mv, it is not conserved in collisions viewed from different frames, because velocities transform in the new way. Conservation is restored by defining p = γmv. The work done in accelerating a body from rest to speed v is then K = (γ − 1)mc², which suggests that the total energy of a body is E = γmc² and that a body at rest has the rest energy E₀ = mc². Mass is a form of energy. Eliminating the velocity gives the useful relation E² = (pc)² + (mc²)². When v is small, expanding γ gives K ≈ ½mv² plus a small correction of order v²/c², so Newtonian mechanics is again the low-speed limit. A particle of zero rest mass, such as the photon, must always travel at c and has E = pc.

## The spacetime interval

In every frame, observers disagree about the time Δt and the distance Δx between two events, but they agree on the combination (Δs)² = Δx² + Δy² + Δz² − c²Δt². This spacetime interval is invariant under the Lorentz transformation, just as the length of a vector is invariant under rotation. Its sign has a physical meaning. If it is negative (timelike, in the slides' convention), there is a frame in which the two events happen at the same place, and one can cause the other. If it is positive (spacelike), there is a frame in which they are simultaneous, and neither can influence the other.

![Spacetime diagram with light cone](fig/spacetime.svg)

*Figure. Spacetime diagram. Light travels at $45^\circ$. Events inside the cone are timelike-separated from the origin (past or future); events outside are spacelike. A boost tilts both axes toward the light line by the same angle.*

## Electricity, magnetism and gravity

Relativity also unites electricity and magnetism. A line of charges at rest exerts a purely electric force on a nearby charge. In a frame where the line moves, length contraction increases the charge density and therefore the electric force, but the moving charges now form a current, and the magnetic force on the charge exactly cancels the excess. Electric and magnetic forces are the same interaction seen from different frames. Finally, the general theory extends these ideas to gravity. By the principle of equivalence, gravity is locally indistinguishable from acceleration, so light, which bends in an accelerating laboratory, must also bend in a gravitational field. The deflection of starlight passing the sun, observed in 1919, confirmed the prediction.

# Reference: Special relativity

The course material section by section, in the order of the textbook, with the key formulas.

Conventions: K′ moves at v along +x of K, origins coincide at t = t′ = 0, β = v/c, γ = 1/√(1 − β²). Useful values: β = 0.6 gives γ = 1.25; β = 0.8 gives γ = 5/3.

## Postulates (`STR.tex:113`, Beiser 1.1)

- The laws of physics are the same in all inertial frames; there is no preferred frame.
- The speed of light in free space is c in all inertial frames, independent of source or observer.
- Why they were needed: Maxwell's wave equation is not Galilean invariant; the moving-coil and moving-magnet cases are described differently; Michelson–Morley found no ether.

## Lorentz transformation (`STR.tex:154`)

$$
x' = \gamma(x - vt),\quad y' = y,\quad z' = z,\quad t' = \gamma\left(t - \frac{vx}{c^2}\right)
$$

- Inverse: swap primed and unprimed, and v → −v.
- Work with differences: Δx′ = γ(Δx − vΔt), Δt′ = γ(Δt − vΔx/c²).
- Derivation outline: linear guess x′ = γ(x − vt); first postulate gives the same γ in reverse; light flash x = ct, x′ = ct′ fixes γ.
- v ≪ c gives back the Galilean transformation.

## Simultaneity, dilation, contraction

- Simultaneous in K at separation Δx: Δt′ = −γvΔx/c². In the train example the rear flash happens first in the platform frame.
- Time dilation: Δt = γΔt₀, where Δt₀ is the proper time (both events at the same place).
- Length contraction: L = L₀/γ, along the motion only; the ends are measured simultaneously in the measuring frame.
- Both effects are symmetric between two inertial observers.
- Muon: τ₀ = 2.2 μs, 0.998c, γ = 15.8; reaches the ground from about 10 km.
- Twin paradox: the traveller changes frames at turnaround and ages less: t\_traveller = t\_home/γ. Beiser: 0.8c to a star 20 ly away gives 50 y at home and 30 y for the traveller.

## Velocity addition and Doppler

$$
u = \frac{u' + v}{1 + u'v/c^2},\qquad u_x' = \frac{u_x - v}{1 - u_x v/c^2},\qquad u_y' = \frac{u_y}{\gamma(1 - u_x v/c^2)}
$$

- u′ = c gives u = c. 0.5c with 0.5c gives 0.8c.
- Doppler, receding: ν = ν₀√((1 − β)/(1 + β)); approaching: swap the signs. At β = 0.8 receding gives ν₀/3.
- Transverse: ν = ν₀/γ (pure time dilation).
- Small β: Δλ/λ ≈ v/c. Red shift of galaxies and Hubble's law v = H₀R.

## Dynamics (`STR.tex:282`, Beiser 1.7–1.9)

$$
\vec p = \gamma m\vec u,\qquad E = \gamma mc^2,\qquad K = (\gamma - 1)mc^2,\qquad E^2 = (pc)^2 + (mc^2)^2
$$

- p = mu fails because momentum would not be conserved in all frames (the slides' two-particle collision).
- K comes from W = ∫F·dr with F = dp/dt.
- Low speed: K ≈ ½mu² + (3/8)mu⁴/c². The difference is below 1% when u ≲ 0.115c.
- Massless particle: E = pc, speed c.
- Useful: β = pc/E, γ = E/mc².

## Spacetime interval

- (Δs)² = Δx² + Δy² + Δz² − c²Δt² is the same in all frames. (Beiser uses the opposite sign; say which you use.)
- Timelike (|cΔt| > |Δx|): a frame exists where both events are at the same place; causal connection possible.
- Spacelike: a frame exists where they are simultaneous; no causal connection.
- Lightlike: (Δs)² = 0, connected by a light signal.

## Wider ideas

- Electric and magnetic forces on a charge near a line of charges are the same effect seen from two frames; length contraction raises λ′, and the magnetic force cancels the extra electric force.
- General relativity: the equivalence principle; light bends in gravity; mass curves spacetime; confirmed by the bending of starlight (Beiser 1.10).

## What to be able to do without notes

- State the postulates and say why they were needed.
- Write the Lorentz transformation and its inverse, and outline the derivation.
- Derive time dilation and length contraction from the Lorentz transformation, and say which time or length is proper.
- Explain the relativity of simultaneity with the train, and the twin paradox.
- Derive the velocity transformation and use it.
- Derive K = (γ − 1)mc², E² = p²c² + m²c⁴, and the classical limit.
- Show the interval is invariant and classify intervals.

# Formulas: Special relativity

Frame $K'$ moves at $v$ along $+x$ of $K$, origins coincide at $t = t' = 0$.

## Setup

$$\boxed{\beta = \frac vc,\qquad \gamma = \frac{1}{\sqrt{1 - \beta^2}} \ge 1}$$

| $\beta$ | 0.6 | 0.8 | 0.9 | 0.99 | 0.998 |
|---|---|---|---|---|---|
| $\gamma$ | 1.25 | $5/3$ | 2.29 | 7.09 | 15.8 |

$$\gamma^2(1 - \beta^2) = 1,\qquad \gamma^2\beta^2 = \gamma^2 - 1,\qquad \gamma \approx 1 + \tfrac12\beta^2\ (\beta \ll 1)$$

## Lorentz transformation

$$\boxed{x' = \gamma(x - vt),\quad y' = y,\quad z' = z,\quad t' = \gamma\left(t - \frac{vx}{c^2}\right)}$$

Inverse: swap primed and unprimed and put $v \to -v$. For events use differences:

$$\Delta x' = \gamma(\Delta x - v\Delta t),\qquad \Delta t' = \gamma\left(\Delta t - \frac{v\Delta x}{c^2}\right)$$

## Simultaneity, dilation, contraction

$$\Delta t = 0\ \text{in } K \text{ with separation } \Delta x\ \Rightarrow\ \Delta t' = -\frac{\gamma v\Delta x}{c^2}$$

$$\boxed{\Delta t = \gamma\,\Delta t_0}\qquad(\Delta t_0\ \text{proper time: both events at the same place})$$

$$\boxed{L = \frac{L_0}{\gamma}}\qquad(L_0\ \text{proper length; along the motion only; ends measured simultaneously})$$

Twin paradox: $t_\text{traveller} = t_\text{home}/\gamma$.

## Velocity addition and Doppler

$$\boxed{u = \frac{u' + v}{1 + u'v/c^2}},\qquad u_x' = \frac{u_x - v}{1 - u_xv/c^2},\qquad u_y' = \frac{u_y}{\gamma\left(1 - u_xv/c^2\right)}$$

| Doppler (light) | Observed frequency |
|---|---|
| receding | $\nu = \nu_0\sqrt{\dfrac{1 - \beta}{1 + \beta}}$ |
| approaching | $\nu = \nu_0\sqrt{\dfrac{1 + \beta}{1 - \beta}}$ |
| transverse | $\nu = \nu_0/\gamma$ |
| small $\beta$ | $\dfrac{\Delta\lambda}{\lambda} \approx \beta$ |

At $\beta = 0.8$: receding $\nu_0/3$, approaching $3\nu_0$, transverse $0.6\,\nu_0$. Hubble: $v = H_0R$.

## Momentum and energy

$$\boxed{\vec p = \gamma m\vec u,\qquad E = \gamma mc^2,\qquad K = (\gamma - 1)mc^2,\qquad E^2 = (pc)^2 + (mc^2)^2}$$

$$\beta = \frac{pc}{E},\qquad \gamma = \frac{E}{mc^2},\qquad \beta\gamma = \frac{p}{mc},\qquad K \approx \tfrac12 mu^2 + \tfrac38\frac{mu^4}{c^2}\ \ (u \ll c)$$

A massless particle has $E = pc$ and speed $c$. $\vec F = d\vec p/dt$, which is **not** $m\vec a$.

| Particle | Rest energy |
|---|---|
| electron | $0.511\ \text{MeV}$ |
| proton | $938.3\ \text{MeV}$ |
| $1\ \text{u}$ | $931.5\ \text{MeV}$ |

## Spacetime interval

$$\boxed{(\Delta s)^2 = \Delta x^2 + \Delta y^2 + \Delta z^2 - c^2\Delta t^2}\quad\text{(same in all frames; Beiser uses the opposite sign, so say which you use)}$$

| Interval | Condition | Meaning |
|---|---|---|
| timelike | $\lvert c\Delta t\rvert > \lvert\Delta x\rvert$ | same place in some frame; causal link possible |
| spacelike | $\lvert c\Delta t\rvert < \lvert\Delta x\rvert$ | simultaneous in some frame; no causal link |
| lightlike | $\lvert c\Delta t\rvert = \lvert\Delta x\rvert$ | joined by a light signal |

## Electromagnetism from relativity

Line charge $\lambda$ and test charge $q$ at distance $d$: in $K$, $F = \dfrac{q\lambda}{2\pi\varepsilon_0 d}$. In $K'$, $\lambda' = \gamma\lambda$ and $F' = F/\gamma$ (the magnetic force cancels the excess electric force).

# Practice: Special relativity

27 questions with worked answers (tap a solution to open it). Points in brackets, in the style of the midsems. Use c = 3 × 10⁸ m/s = 300 m/μs. No calculator: the numbers are chosen to come out cleanly.

## A. State and explain

### Problem 1 [STR · Recall · 2 pts · 2025 midsem Q2]

State the assumptions (postulates) of the special theory of relativity.

*Solution.* (i) The laws of physics take the same form in all inertial frames; no experiment inside one frame can single it out as at rest. (ii) The speed of light in free space is c in every inertial frame, independent of the motion of source and observer.

### Problem 2 [STR · Recall · 3 pts]

What problems with electromagnetism and Galilean relativity led to these postulates?

*Solution.* Maxwell's equations give one speed c, but the wave equation is not invariant under the Galilean transformation, so it would hold only in one special frame. The same induction experiment is explained by a magnetic force in one frame and an induced electric field in another. Michelson–Morley found no motion through an ether.

### Problem 3 [STR · Recall · 3 pts]

Explain, using a train and two light flashes, why simultaneity is relative.

*Solution.* Flashes from the two ends of a train reach a mid-train observer together, so in the train frame they were simultaneous. On the platform the train moves forward while the light travels, so the rear flash has further to go. With light at c in both frames, the rear flash must have been emitted first. Formally, Δt′ = −γvΔx/c² ≠ 0 when Δx ≠ 0.

### Problem 4 [STR · Recall · 2 pts]

What is proper time? What is proper length?

*Solution.* Proper time is the interval between two events that occur at the same place in some frame (the clock's rest frame). Proper length is the length of an object measured in its rest frame.

### Problem 5 [STR · Recall · 2 pts]

Each of two inertial observers says the other's clock runs slow. Why is this not a contradiction?

*Solution.* Each observer measures the other's clock by comparing it with two of their own clocks at different places, and the two observers disagree about which events are simultaneous. Each conclusion is correct in its own frame.

### Problem 6 [STR · Recall · 3 pts]

Explain the twin paradox and why the twins' situations are not symmetric.

*Solution.* A twin who travels out and back ages less than the twin at home. Only the traveller changes inertial frame at the turnaround (feels an acceleration); the home twin stays in one inertial frame. So the situations are not symmetric, and the traveller's elapsed time is t\_home/γ.

### Problem 7 [STR · Recall · 2 pts]

Why is p = mv not a good definition of momentum in relativity?

*Solution.* With p = mv and the relativistic velocity transformation, momentum conserved in one frame is not conserved in another (the slides' collision of A and B). Defining p = γmv restores conservation in all frames.

### Problem 8 [STR · Recall · 2 pts]

What is the difference between timelike and spacelike intervals? Which can be causally connected?

*Solution.* Timelike: |cΔt| > |Δx|; a frame exists where both events occur at the same place, so one can cause the other. Spacelike: |Δx| > |cΔt|; a frame exists where they are simultaneous, and no signal can connect them.

### Problem 9 [STR · Recall · 3 pts]

Explain how electric and magnetic forces are the same phenomenon seen from different frames.

*Solution.* A line of charge at rest exerts only an electric force on a nearby charge q. In a frame where the charges move, length contraction increases the line density (λ′ > λ), so the electric repulsion is larger, but the moving charges form a current whose magnetic force attracts q and cancels exactly the excess. The net force is the same physics in both frames; electric and magnetic forces are one interaction seen differently.

### Problem 10 [STR · Recall · 2 pts]

State the principle of equivalence and one experimental confirmation of general relativity.

*Solution.* Equivalence: the effects of a uniform gravitational field cannot be distinguished locally from those of an accelerated frame. Since light bends in an accelerating laboratory, it bends in gravity. Confirmed by the deflection of starlight past the sun (1919 eclipse); also gravitational lensing.

## B. Show or derive

### Problem 11 [STR · Derivation · 5 pts]

Outline the derivation of the Lorentz transformation from the two postulates.

*Solution.* **Setup.** $K'$ moves along $x$ at speed $v$ relative to $K$; the origins coincide at $t = t' = 0$. Space is homogeneous, so the transformation must be **linear**.

**Step 1.** The origin of $K'$ ($x' = 0$) sits at $x = vt$, so $x' \propto (x - vt)$:

$$x' = \gamma(x - vt)$$

**Step 2 (first postulate).** $K$ sees $K'$ moving at $-v$ and the physics is the same, so with the same $\gamma$:

$$x = \gamma(x' + vt')$$

**Step 3 (second postulate).** A light flash from the origin at $t = 0$ has $x = ct$ in $K$ **and** $x' = ct'$ in $K'$. Multiply the two relations:

$$xx' = \gamma^2(x - vt)(x' + vt')\ \Rightarrow\ c^2tt' = \gamma^2(ct - vt)(ct' + vt') = \gamma^2tt'(c - v)(c + v)$$

$$\boxed{\gamma = \frac1{\sqrt{1 - v^2/c^2}}}$$

**Step 4.** Eliminate $x'$ from the two relations to get the time:

$$\boxed{t' = \gamma\left(t - \frac{vx}{c^2}\right)}$$

**Check.** For $v \ll c$, $\gamma \to 1$ and $t' \to t$, $x' \to x - vt$: the Galilean transformation ✓.

### Problem 12 [STR · Derivation · 3 pts]

Using the Lorentz transformation, show that a clock moving at v ticks at intervals γΔt₀.

*Solution.* **Events.** The clock sits at $x = 0$ in $K$ and ticks at $t = 0$ and $t = \Delta t_0$ (its **proper time**): the two events have $\Delta x = 0$.

**Lorentz transformation** into $K'$ (where the clock moves):

$$\Delta t' = \gamma\left(\Delta t - \frac{v\Delta x}{c^2}\right) = \gamma\,\Delta t_0$$

$$\boxed{\Delta t' = \gamma\,\Delta t_0 > \Delta t_0}$$

The moving clock's ticks are stretched: it runs **slow** as seen from $K'$.

**Common mistake.** The proper time is the interval between two events at the **same place** in the clock's own frame.

### Problem 13 [STR · Derivation · 3 pts]

Using the Lorentz transformation, show that a moving rod has length L₀/γ. Why must you use the inverse transformation (or simultaneous measurements)?

*Solution.* **Setup.** The rod is at rest in $K$ with ends at $x = 0$ and $x = L_0$. In $K'$ it moves, and its length is the distance between the positions of its two ends measured **at the same time** $t'$, so $\Delta t' = 0$.

**Why the inverse transformation.** The forward transformation $\Delta x' = \gamma(\Delta x - v\Delta t)$ needs $\Delta t$, which we don't know when $\Delta t' = 0$. The inverse needs only $\Delta t'$:

$$\Delta x = \gamma(\Delta x' + v\Delta t') = \gamma\,\Delta x'$$

With $\Delta x = L_0$ and $\Delta x' = L'$:

$$\boxed{L' = \frac{L_0}\gamma}$$

**Common mistake.** Measuring the ends at the same $t$ in the rod's own frame gives the wrong answer, because the events are not simultaneous in $K'$.

### Problem 14 [STR · Derivation · 4 pts]

Derive the velocity transformation uₓ′ = (uₓ − v)/(1 − uₓv/c²) and u\_y′. Show that if uₓ = c then uₓ′ = c.

*Solution.* **Differentials.** From the Lorentz transformation

$$dx' = \gamma(dx - v\,dt),\qquad dt' = \gamma\left(dt - \frac{v\,dx}{c^2}\right),\qquad dy' = dy$$

**Divide** $dx'$ by $dt'$ and substitute $u_x = dx/dt$:

$$\boxed{u_x' = \frac{u_x - v}{1 - u_xv/c^2}}$$

$$\boxed{u_y' = \frac{u_y}{\gamma(1 - u_xv/c^2)}}$$

**Light.** If $u_x = c$:

$$u_x' = \frac{c - v}{1 - v/c} = \frac{c - v}{(c - v)/c} = c$$

The speed of light is the same in every frame, as the postulate demands.

### Problem 15 [STR · Derivation · 4 pts]

Starting from W = ∫F·dr with p = γmu, show that K = (γ − 1)mc². Hence show E² = (pc)² + (mc²)².

*Solution.* **Work-energy.** With $\mathbf p = \gamma m\mathbf u$ and $\mathbf F = d\mathbf p/dt$, for motion along a line:

$$K = \int F\,dx = \int u\,d(\gamma mu) = \gamma mu^2 - \int\gamma mu\,du$$

**Evaluate the last integral** ($\gamma = (1 - u^2/c^2)^{-1/2}$):

$$\int\gamma mu\,du = -mc^2\sqrt{1 - u^2/c^2} = -\frac{mc^2}\gamma\quad(+\text{const})$$

so

$$K = \gamma mu^2 + mc^2\sqrt{1 - u^2/c^2} - mc^2 = \gamma mc^2\left(\frac{u^2}{c^2} + 1 - \frac{u^2}{c^2}\right) - mc^2$$

$$\boxed{K = (\gamma - 1)mc^2}$$

Define $E = \gamma mc^2$ (so $E_0 = mc^2$). Then

$$E^2 - (pc)^2 = \gamma^2m^2c^4\left(1 - \frac{u^2}{c^2}\right) = (mc^2)^2\ \Rightarrow\ \boxed{E^2 = (pc)^2 + (mc^2)^2}$$

### Problem 16 [STR · Derivation · 3 pts · 2025 midsem Q13]

Show how the classical kinetic energy formula follows from the relativistic one. Find the range of speeds for which they differ by less than 1%.

*Solution.* **Expand** for $\beta = u/c \ll 1$:

$$\gamma = (1 - \beta^2)^{-1/2} \approx 1 + \tfrac12\beta^2 + \tfrac38\beta^4$$

$$K = (\gamma - 1)mc^2 \approx \tfrac12mu^2 + \tfrac38\frac{mu^4}{c^2}$$

The first term is the classical kinetic energy.

**Ratio.**

$$\frac{K_\text{rel}}{K_\text{cl}} \approx 1 + \tfrac34\beta^2$$

**1% criterion:** $\tfrac34\beta^2 < 0.01 \Rightarrow \beta < 0.115$, so

$$u \lesssim 0.115c \approx \boxed{3.5\times10^7\ \text{m/s}}$$

**Check.** At $\beta = 0.115$ exactly, $\gamma - 1 = 0.00667$ versus $\tfrac12\beta^2 = 0.00661$: about $1\%$ difference ✓.

### Problem 17 [STR · Derivation · 3 pts]

Show that (Δs)² = Δx² − c²Δt² is the same in K and K′.

*Solution.* **Transform the differences.**

$$\Delta x' = \gamma(\Delta x - \beta c\Delta t),\qquad c\Delta t' = \gamma(c\Delta t - \beta\Delta x)$$

**Square and subtract.**

$$\Delta x'^2 - c^2\Delta t'^2 = \gamma^2\left[(\Delta x - \beta c\Delta t)^2 - (c\Delta t - \beta\Delta x)^2\right]$$

The cross terms $\mp2\beta c\Delta x\Delta t$ cancel, leaving

$$= \gamma^2\left(\Delta x^2 - c^2\Delta t^2\right)(1 - \beta^2) = \Delta x^2 - c^2\Delta t^2$$

since $\gamma^2(1 - \beta^2) = 1$. So $(\Delta s)^2$ is **invariant**.

### Problem 18 [STR · Derivation · 8 pts · 2026 midsem Q11] (hard)

A single-particle Lagrangian is L = −mc√(c² − u·u) − V(r). (a) Find the conjugate momentum p and p·p in terms of u·u. (b) Find H(r, p). (c) Show that (H − V)² = (mc²)² + p²c².

*Solution.* **(a) Conjugate momentum.**

$$\mathbf p = \frac{\partial L}{\partial\mathbf u} = \frac{mc\,\mathbf u}{\sqrt{c^2 - u^2}} = \gamma m\mathbf u,\qquad \mathbf p\cdot\mathbf p = \frac{m^2c^2u^2}{c^2 - u^2}$$

**(b) Hamiltonian.** $H = \mathbf p\cdot\mathbf u - L$:

$$H = \frac{mcu^2}{\sqrt{c^2 - u^2}} + mc\sqrt{c^2 - u^2} + V = \frac{mc^3}{\sqrt{c^2 - u^2}} + V$$

Express $u$ through $p$. From (a): $c^2 - u^2 = \dfrac{m^2c^4}{p^2 + m^2c^2}$. Then

$$\boxed{H = c\sqrt{p^2 + m^2c^2} + V}$$

**(c)** Rearranging,

$$\boxed{(H - V)^2 = (mc^2)^2 + p^2c^2}$$

$H - V = \gamma mc^2$ is Einstein's energy; for small $p$ it reduces to $mc^2 + p^2/2m$.

**Common mistake.** The canonical momentum is $\gamma m\mathbf u$, not $m\mathbf u$.

## C. Numericals

### Problem 19 [STR · Numerical · 4 pts · tutorial P1]

A rocket of proper length 300 m passes a station marker A at 0.8c. (a) Its length in the station frame? (b) How long, in the station frame, between the nose and the tail passing A? (c) That interval in the rocket frame? Which one is proper?

*Solution.* **Setup.** $\beta = 0.8$, $\gamma = 5/3$, $v = 0.8c = 240$ m/$\mu$s.

**(a)** The rocket's proper length is $L_0 = 300$ m, so in the station frame

$$L = \frac{L_0}{\gamma} = \frac{300}{5/3} = \boxed{180\ \text{m}}$$

**(b)** The nose and then the tail pass A, so the station-frame time is the length divided by the speed:

$$\Delta t = \frac{180}{240} = \boxed{0.75\ \mu\text{s}}$$

Both events happen at the same place (A), so this is the **proper time**.

**(c)** In the rocket frame, A moves past the whole $300$ m:

$$\Delta t' = \frac{300}{240} = \boxed{1.25\ \mu\text{s}} = \gamma\,(0.75\ \mu\text{s})$$

The proper time (shorter) is the one measured in the station frame.

### Problem 20 [STR · Numerical · 3 pts]

A muon (τ₀ = 2.2 μs) moves at 0.998c (γ ≈ 15.8). How far does it travel on average in the earth frame, and how thick is 10 km of atmosphere in the muon's frame?

*Solution.* **Idea.** The muon lives $\gamma\tau_0$ in the Earth frame. In its own frame the atmosphere is length-contracted.

$$d = v\,\gamma\tau_0 = (0.998)(300\ \text{m}/\mu\text{s})(15.8)(2.2\ \mu\text{s}) \approx \boxed{10.4\ \text{km}}$$

$$L = \frac{L_0}{\gamma} = \frac{10\ \text{km}}{15.8} \approx \boxed{0.63\ \text{km}}$$

**Check.** In its own frame the muon would travel $v\tau_0 = 0.66$ km. The contracted atmosphere (0.63 km) is shorter than that, so it arrives. Both frames agree.

### Problem 21 [STR · Numerical · 3 pts]

A twin travels at 0.6c to a star 6 ly away and returns. How much does each twin age?

*Solution.* **Setup.** $\beta = 0.6$, $\gamma = 1.25$. Round trip distance $= 12$ ly.

**Home twin** (Earth frame):

$$t_\text{home} = \frac{12\ \text{ly}}{0.6c} = \boxed{20\ \text{y}}$$

**Travelling twin** (proper time along the path):

$$t_\text{traveller} = \frac{t_\text{home}}{\gamma} = \frac{20}{1.25} = \boxed{16\ \text{y}}$$

The traveller is 4 years younger. The situation is not symmetric: only the traveller changes inertial frame at the turnaround.

### Problem 22 [STR · Numerical · 2 pts]

Two particles move towards each other, each at 0.5c in the lab. What is their relative speed?

*Solution.* **Idea.** Relative speed needs the relativistic addition rule, with $u' = 0.5c$ in the frame of one particle, which itself moves at $v = 0.5c$.

$$u = \frac{u' + v}{1 + u'v/c^2} = \frac{0.5c + 0.5c}{1 + 0.25} = \boxed{0.8c}$$

**Check.** Less than $c$ and less than the Galilean answer $c$.

### Problem 23 [STR · Numerical · 2 pts]

A galaxy recedes at 0.6c. By what factor is the frequency of its light shifted?

*Solution.* **Idea.** Receding source: $\nu = \nu_0\sqrt{\dfrac{1 - \beta}{1 + \beta}}$.

$$\frac{\nu}{\nu_0} = \sqrt{\frac{0.4}{1.6}} = \sqrt{0.25} = \boxed{0.5}$$

The frequency is halved, so the wavelength is doubled (a red shift).

### Problem 24 [STR · Numerical · 3 pts]

An electron has kinetic energy equal to its rest energy. Find γ, its speed and its momentum in units of mc.

*Solution.* **Idea.** $K = (\gamma - 1)mc^2$. Setting $K = mc^2$:

$$\gamma - 1 = 1 \Rightarrow \boxed{\gamma = 2}$$

$$\beta = \sqrt{1 - \frac1{\gamma^2}} = \sqrt{1 - \frac14} = \frac{\sqrt3}{2} \approx \boxed{0.87}$$

$$p = \gamma\beta\,mc = 2\cdot\frac{\sqrt3}{2}\,mc = \boxed{\sqrt3\,mc \approx 1.7\,mc}$$

**Check.** $E^2 = (pc)^2 + (mc^2)^2$: $(2mc^2)^2 = 3(mc^2)^2 + (mc^2)^2$ ✓.

## D. Estimate

### Problem 25 [STR · Numerical · 3 pts · HW 2b]

What is the kinetic energy of a fast cricket ball? Compare it with its rest energy E = mc².

*Solution.* **Idea.** At everyday speeds $K = \tfrac12mv^2$, while the rest energy is $mc^2$.

For $m \approx 0.16$ kg and $v \approx 40$ m/s (145 km/h):

$$K \approx \tfrac12(0.16)(40)^2 \approx \boxed{130\ \text{J}}$$

$$mc^2 \approx (0.16)(9\times10^{16}) \approx \boxed{1.4\times10^{16}\ \text{J}}$$

$$\frac{K}{mc^2} = \frac{\beta^2}{2} \approx 10^{-14}$$

The kinetic energy is utterly negligible next to the rest energy, which is why $\tfrac12mv^2$ is perfectly good for everyday motion.

### Problem 26 [STR · Numerical · 2 pts]

By how much does a clock on an aircraft (250 m/s) fall behind in a 10 h flight, ignoring gravity?

*Solution.* **Idea.** A moving clock runs slow by the factor $\gamma \approx 1 + \tfrac12\beta^2$, so over time $t$ it falls behind by about $t\beta^2/2$.

$$\beta = \frac{250}{3\times10^8} = 8.3\times10^{-7},\qquad \frac{\beta^2}{2} \approx 3.5\times10^{-13}$$

$$\Delta t \approx (3.6\times10^4\ \text{s})(3.5\times10^{-13}) \approx 1.3\times10^{-8}\ \text{s} = \boxed{\approx 13\ \text{ns}}$$

### Problem 27 [STR · Numerical · 5 pts · 2025 midsem Q11]

A light source of rest frequency ν₀, a distance l from an observer, moves at v perpendicular to the observer's line of sight. Find the apparent frequency.

*Solution.* **Idea.** At the instant the source crosses the line of sight there is no velocity component along it, so there is **no classical Doppler shift**. Only time dilation remains.

In the observer's frame the source's period is $T = \gamma T_0$, so

$$\boxed{\nu = \frac{\nu_0}{\gamma} = \nu_0\sqrt{1 - \frac{v^2}{c^2}}}$$

This is a **red shift**. The distance $l$ does not enter. The transverse Doppler effect has no classical counterpart.

# Reference: Special relativity quick sheet (Beiser ch. 1)

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
