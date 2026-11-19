# Science-1 STR: Special relativity

Two postulates, the same laws in every inertial frame and the same speed of light in every inertial frame, force us to give up absolute time. From them follow the Lorentz transformation, time dilation, length contraction, relativistic velocity addition, the Doppler effect, and the relations E = γmc² and E² = p²c² + m²c⁴. Sources: slides `STR.tex:113` to `:366`, Beiser ch 1 (1.1–1.10), MT ch 14, the tutorial (`04-tutorials/relativity`), and your sheet `notes/17-str-sheet.md`. The questions follow the 2025 midsem (Q2, Q13), the 2026 midsem Q11, HW 2b and the tutorial's rocket problem.

## Explainer

### Why relativity was needed

Newtonian mechanics satisfies a principle of relativity of its own. If one frame moves at constant velocity relative to another, the Galilean transformation x′ = x − vt, t′ = t carries the laws of motion over unchanged, and no mechanical experiment can tell which frame is "really" at rest. Electromagnetism does not fit this scheme. Maxwell's equations predict that light travels at one definite speed c, and under a Galilean transformation the wave equation changes its form, so the speed would be c − v in a moving frame. There was also an awkward asymmetry in the theory itself. A coil moving past a stationary magnet has a current driven by the magnetic force qv × B, while a magnet moving past a stationary coil drives the same current through an induced electric field, although only the relative motion can matter. Experiments, most famously that of Michelson and Morley, found no sign of any motion of the earth through a medium that might carry light. Einstein resolved the conflict in 1905 by taking two postulates as basic: the laws of physics are the same in all inertial frames, and the speed of light in free space has the same value c in all inertial frames, whatever the motion of the source or observer.

### Relativity of simultaneity

The second postulate looks harmless, but it overturns the idea of a universal time. Consider an observer at the middle of a moving train who receives two flashes, one from each end, at the same moment. Since the flashes travelled equal distances at the same speed c, the observer concludes that they were emitted simultaneously. An observer on the platform sees the train moving forward during the flight of the light, so the rear flash had further to go to reach the mid-point than the front one. Since light also travels at c in the platform frame, the rear flash must have been emitted first. Two events that are simultaneous in one frame are not, in general, simultaneous in another. Only events at the same place can be agreed by everyone to be simultaneous.

### The Lorentz transformation

The Lorentz transformation gives the precise relation between the coordinates of an event in two frames. Suppose frame K′ moves at speed v along the x-axis of K and the origins coincide at t = t′ = 0. The transformation must be linear, it must reduce to the Galilean one at low speeds, and the inverse must have the same form with v replaced by −v, as the first postulate requires. Demanding in addition that a light flash from the origin travels as x = ct in K and as x′ = ct′ in K′ fixes the result: x′ = γ(x − vt), t′ = γ(t − vx/c²), with y and z unchanged and γ = 1/√(1 − v²/c²). The term vx/c² in the time equation is the relativity of simultaneity written as a formula. When v is small compared with c, γ is nearly one, this term is negligible, and the Galilean transformation is recovered.

### Time dilation and length contraction

Two striking consequences follow. A clock at rest in one frame ticks at intervals Δt₀, its proper time. Since the ticks happen at the same place in that frame, the Lorentz transformation shows that an observer moving relative to the clock measures intervals Δt = γΔt₀. A moving clock runs slow. Muons produced high in the atmosphere live only 2.2 μs in their own frame, and without this effect they could travel only about 0.66 km, yet they are observed in large numbers at sea level. Lengths are affected in a complementary way. To measure the length of a moving rod, an observer must record the positions of its two ends at the same time in their own frame, and the Lorentz transformation then gives L = L₀/γ, where L₀ is the proper length measured in the rod's rest frame. The contraction occurs only along the direction of motion. In the muon's frame it is the atmosphere that is contracted, so that the two accounts agree on whether the muon arrives.

### Symmetry and the twin paradox

These effects are entirely symmetric between two inertial observers: each finds the other's clocks slow and the other's rods short. There is no contradiction, because the two observers disagree about which events are simultaneous. The twin paradox appears to break this symmetry. One twin stays at home while the other travels to a distant star and returns, and the traveller is found to be younger. The situations of the two are not equivalent, however. The traveller changes from one inertial frame to another at the turning point, while the stay-at-home twin remains in a single inertial frame throughout, so it is the traveller whose clock records less time.

### Velocity addition and the Doppler effect

Velocities cannot be added in the ordinary way either. If a body moves at u′ in frame K′, which itself moves at v relative to K, its speed in K is u = (u′ + v)/(1 + u′v/c²). For small speeds the denominator is close to one and this is ordinary addition. But putting u′ = c gives u = c for any v, so the formula is consistent with the second postulate, and no combination of speeds below c can ever produce a speed greater than c. The same reasoning applied to the arrival of successive wave crests from a moving source gives the relativistic Doppler effect. For a source and observer moving apart at relative speed v, the observed frequency is ν = ν₀√((1 − β)/(1 + β)), with β = v/c. Unlike sound, light needs no medium, so only the relative velocity enters. The red shift of light from distant galaxies, which increases with their distance, is the evidence that the universe is expanding.

### Relativistic momentum and energy

Mechanics must also be revised. If momentum is defined as mv, it is not conserved in collisions viewed from different frames, because velocities transform in the new way. Conservation is restored by defining p = γmv. The work done in accelerating a body from rest to speed v is then K = (γ − 1)mc², which suggests that the total energy of a body is E = γmc² and that a body at rest has the rest energy E₀ = mc². Mass is a form of energy. Eliminating the velocity gives the useful relation E² = (pc)² + (mc²)². When v is small, expanding γ gives K ≈ ½mv² plus a small correction of order v²/c², so Newtonian mechanics is again the low-speed limit. A particle of zero rest mass, such as the photon, must always travel at c and has E = pc.

### The spacetime interval

In every frame, observers disagree about the time Δt and the distance Δx between two events, but they agree on the combination (Δs)² = Δx² + Δy² + Δz² − c²Δt². This spacetime interval is invariant under the Lorentz transformation, just as the length of a vector is invariant under rotation. Its sign has a physical meaning. If it is negative (timelike, in the slides' convention), there is a frame in which the two events happen at the same place, and one can cause the other. If it is positive (spacelike), there is a frame in which they are simultaneous, and neither can influence the other.

### Electricity, magnetism and gravity

Relativity also unites electricity and magnetism. A line of charges at rest exerts a purely electric force on a nearby charge. In a frame where the line moves, length contraction increases the charge density and therefore the electric force, but the moving charges now form a current, and the magnetic force on the charge exactly cancels the excess. Electric and magnetic forces are the same interaction seen from different frames. Finally, the general theory extends these ideas to gravity. By the principle of equivalence, gravity is locally indistinguishable from acceleration, so light, which bends in an accelerating laboratory, must also bend in a gravitational field. The deflection of starlight passing the sun, observed in 1919, confirmed the prediction.

## Summary

Conventions: K′ moves at v along +x of K, origins coincide at t = t′ = 0, β = v/c, γ = 1/√(1 − β²). Useful values: β = 0.6 gives γ = 1.25; β = 0.8 gives γ = 5/3.

### Postulates (`STR.tex:113`, Beiser 1.1)

- The laws of physics are the same in all inertial frames; there is no preferred frame.
- The speed of light in free space is c in all inertial frames, independent of source or observer.
- Why they were needed: Maxwell's wave equation is not Galilean invariant; the moving-coil and moving-magnet cases are described differently; Michelson–Morley found no ether.

### Lorentz transformation (`STR.tex:154`)

```latex
x' = \gamma(x - vt),\quad y' = y,\quad z' = z,\quad t' = \gamma\left(t - \frac{vx}{c^2}\right)
```

- Inverse: swap primed and unprimed, and v → −v.
- Work with differences: Δx′ = γ(Δx − vΔt), Δt′ = γ(Δt − vΔx/c²).
- Derivation outline: linear guess x′ = γ(x − vt); first postulate gives the same γ in reverse; light flash x = ct, x′ = ct′ fixes γ.
- v ≪ c gives back the Galilean transformation.

### Simultaneity, dilation, contraction

- Simultaneous in K at separation Δx: Δt′ = −γvΔx/c². In the train example the rear flash happens first in the platform frame.
- Time dilation: Δt = γΔt₀, where Δt₀ is the proper time (both events at the same place).
- Length contraction: L = L₀/γ, along the motion only; the ends are measured simultaneously in the measuring frame.
- Both effects are symmetric between two inertial observers.
- Muon: τ₀ = 2.2 μs, 0.998c, γ = 15.8; reaches the ground from about 10 km.
- Twin paradox: the traveller changes frames at turnaround and ages less: t\_traveller = t\_home/γ. Beiser: 0.8c to a star 20 ly away gives 50 y at home and 30 y for the traveller.

### Velocity addition and Doppler

```latex
u = \frac{u' + v}{1 + u'v/c^2},\qquad u_x' = \frac{u_x - v}{1 - u_x v/c^2},\qquad u_y' = \frac{u_y}{\gamma(1 - u_x v/c^2)}
```

- u′ = c gives u = c. 0.5c with 0.5c gives 0.8c.
- Doppler, receding: ν = ν₀√((1 − β)/(1 + β)); approaching: swap the signs. At β = 0.8 receding gives ν₀/3.
- Transverse: ν = ν₀/γ (pure time dilation).
- Small β: Δλ/λ ≈ v/c. Red shift of galaxies and Hubble's law v = H₀R.

### Dynamics (`STR.tex:282`, Beiser 1.7–1.9)

```latex
\vec p = \gamma m\vec u,\qquad E = \gamma mc^2,\qquad K = (\gamma - 1)mc^2,\qquad E^2 = (pc)^2 + (mc^2)^2
```

- p = mu fails because momentum would not be conserved in all frames (the slides' two-particle collision).
- K comes from W = ∫F·dr with F = dp/dt.
- Low speed: K ≈ ½mu² + (3/8)mu⁴/c². The difference is below 1% when u ≲ 0.115c.
- Massless particle: E = pc, speed c.
- Useful: β = pc/E, γ = E/mc².

### Spacetime interval

- (Δs)² = Δx² + Δy² + Δz² − c²Δt² is the same in all frames. (Beiser uses the opposite sign; say which you use.)
- Timelike (|cΔt| > |Δx|): a frame exists where both events are at the same place; causal connection possible.
- Spacelike: a frame exists where they are simultaneous; no causal connection.
- Lightlike: (Δs)² = 0, connected by a light signal.

### Wider ideas

- Electric and magnetic forces on a charge near a line of charges are the same effect seen from two frames; length contraction raises λ′, and the magnetic force cancels the extra electric force.
- General relativity: the equivalence principle; light bends in gravity; mass curves spacetime; confirmed by the bending of starlight (Beiser 1.10).

### What to be able to do without notes

- State the postulates and say why they were needed.
- Write the Lorentz transformation and its inverse, and outline the derivation.
- Derive time dilation and length contraction from the Lorentz transformation, and say which time or length is proper.
- Explain the relativity of simultaneity with the train, and the twin paradox.
- Derive the velocity transformation and use it.
- Derive K = (γ − 1)mc², E² = p²c² + m²c⁴, and the classical limit.
- Show the interval is invariant and classify intervals.

## Questions

Points in brackets, in the style of the midsems. Use c = 3 × 10⁸ m/s = 300 m/μs. No calculator: the numbers are chosen to come out cleanly.

### A. State and explain (2–3 points)

1. (2) State the assumptions (postulates) of the special theory of relativity. *(2025 midsem Q2)*
2. (3) What problems with electromagnetism and Galilean relativity led to these postulates?
3. (3) Explain, using a train and two light flashes, why simultaneity is relative.
4. (2) What is proper time? What is proper length?
5. (2) Each of two inertial observers says the other's clock runs slow. Why is this not a contradiction?
6. (3) Explain the twin paradox and why the twins' situations are not symmetric.
7. (2) Why is p = mv not a good definition of momentum in relativity?
8. (2) What is the difference between timelike and spacelike intervals? Which can be causally connected?
9. (3) Explain how electric and magnetic forces are the same phenomenon seen from different frames.
10. (2) State the principle of equivalence and one experimental confirmation of general relativity.

### B. Show or derive (3–6 points)

11. (5) Outline the derivation of the Lorentz transformation from the two postulates.
12. (3) Using the Lorentz transformation, show that a clock moving at v ticks at intervals γΔt₀.
13. (3) Using the Lorentz transformation, show that a moving rod has length L₀/γ. Why must you use the inverse transformation (or simultaneous measurements)?
14. (4) Derive the velocity transformation uₓ′ = (uₓ − v)/(1 − uₓv/c²) and u\_y′. Show that if uₓ = c then uₓ′ = c.
15. (4) Starting from W = ∫F·dr with p = γmu, show that K = (γ − 1)mc². Hence show E² = (pc)² + (mc²)².
16. (3) Show how the classical kinetic energy formula follows from the relativistic one. Find the range of speeds for which they differ by less than 1%. *(2025 midsem Q13)*
17. (3) Show that (Δs)² = Δx² − c²Δt² is the same in K and K′.
18. (8) A single-particle Lagrangian is L = −mc√(c² − u·u) − V(r). (a) Find the conjugate momentum p and p·p in terms of u·u. (b) Find H(r, p). (c) Show that (H − V)² = (mc²)² + p²c². *(2026 midsem Q11)*

### C. Numericals

19. (4) A rocket of proper length 300 m passes a station marker A at 0.8c. (a) Its length in the station frame? (b) How long, in the station frame, between the nose and the tail passing A? (c) That interval in the rocket frame? Which one is proper? *(tutorial P1)*
20. (3) A muon (τ₀ = 2.2 μs) moves at 0.998c (γ ≈ 15.8). How far does it travel on average in the earth frame, and how thick is 10 km of atmosphere in the muon's frame?
21. (3) A twin travels at 0.6c to a star 6 ly away and returns. How much does each twin age?
22. (2) Two particles move towards each other, each at 0.5c in the lab. What is their relative speed?
23. (2) A galaxy recedes at 0.6c. By what factor is the frequency of its light shifted?
24. (3) An electron has kinetic energy equal to its rest energy. Find γ, its speed and its momentum in units of mc.

### D. Estimate

25. (3) What is the kinetic energy of a fast cricket ball? Compare it with its rest energy E = mc². *(HW 2b)*
26. (2) By how much does a clock on an aircraft (250 m/s) fall behind in a 10 h flight, ignoring gravity?
27. (5) A light source of rest frequency ν₀, a distance l from an observer, moves at v perpendicular to the observer's line of sight. Find the apparent frequency. *(2025 midsem Q11)*

## Answer key

### A. State and explain

1. (i) The laws of physics take the same form in all inertial frames; no experiment inside one frame can single it out as at rest. (ii) The speed of light in free space is c in every inertial frame, independent of the motion of source and observer.
2. Maxwell's equations give one speed c, but the wave equation is not invariant under the Galilean transformation, so it would hold only in one special frame. The same induction experiment is explained by a magnetic force in one frame and an induced electric field in another. Michelson–Morley found no motion through an ether.
3. Flashes from the two ends of a train reach a mid-train observer together, so in the train frame they were simultaneous. On the platform the train moves forward while the light travels, so the rear flash has further to go. With light at c in both frames, the rear flash must have been emitted first. Formally, Δt′ = −γvΔx/c² ≠ 0 when Δx ≠ 0.
4. Proper time is the interval between two events that occur at the same place in some frame (the clock's rest frame). Proper length is the length of an object measured in its rest frame.
5. Each observer measures the other's clock by comparing it with two of their own clocks at different places, and the two observers disagree about which events are simultaneous. Each conclusion is correct in its own frame.
6. A twin who travels out and back ages less than the twin at home. Only the traveller changes inertial frame at the turnaround (feels an acceleration); the home twin stays in one inertial frame. So the situations are not symmetric, and the traveller's elapsed time is t\_home/γ.
7. With p = mv and the relativistic velocity transformation, momentum conserved in one frame is not conserved in another (the slides' collision of A and B). Defining p = γmv restores conservation in all frames.
8. Timelike: |cΔt| > |Δx|; a frame exists where both events occur at the same place, so one can cause the other. Spacelike: |Δx| > |cΔt|; a frame exists where they are simultaneous, and no signal can connect them.
9. A line of charge at rest exerts only an electric force on a nearby charge q. In a frame where the charges move, length contraction increases the line density (λ′ > λ), so the electric repulsion is larger, but the moving charges form a current whose magnetic force attracts q and cancels exactly the excess. The net force is the same physics in both frames; electric and magnetic forces are one interaction seen differently.
10. Equivalence: the effects of a uniform gravitational field cannot be distinguished locally from those of an accelerated frame. Since light bends in an accelerating laboratory, it bends in gravity. Confirmed by the deflection of starlight past the sun (1919 eclipse); also gravitational lensing.

### B. Show or derive

11. (1) The origin of K′ is at x = vt, so try a linear x′ = γ(x − vt). (2) The first postulate says K sees K′ move at −v by the same rule: x = γ(x′ + vt′), with the same γ. (3) Eliminate x′ to get t′ = γt + (1 − γ²)x/(γv). (4) A light flash from the common origin at t = 0 obeys x = ct and x′ = ct′ (second postulate). Substituting into (1) and (3) and dividing gives c = (c − v)γ²v/(γ²v − …), which reduces to γ = 1/√(1 − v²/c²). Then t′ = γ(t − vx/c²).
12. Ticks at the clock's position x = 0 in K: events (0, 0) and (0, Δt₀). In K′, Δt′ = γ(Δt − vΔx/c²) = γΔt₀ since Δx = 0.
13. Rod at rest in K from 0 to L₀. In K′ the ends must be marked at the same t′, so Δt′ = 0. The forward transformation needs Δt, which we don't know, so use the inverse: Δx = γ(Δx′ + vΔt′) = γΔx′. So L₀ = γL′ and L′ = L₀/γ.
14. dx′/dt = γ(uₓ − v) and dt′/dt = γ(1 − uₓv/c²). Dividing: uₓ′ = (uₓ − v)/(1 − uₓv/c²). Since dy′ = dy, u\_y′ = u\_y/\[γ(1 − uₓv/c²)\]. If uₓ = c: (c − v)/(1 − v/c) = c.
15. W = ∫(dp/dt)·u dt = ∫u d(γmu). Integrating by parts, ∫u d(γmu) = γmu² − ∫γmu du = γmu² + mc²√(1 − u²/c²) − mc² = γmc² − mc². So K = (γ − 1)mc², E = γmc², E₀ = mc². Then E² − p²c² = γ²m²c⁴(1 − u²/c²) = m²c⁴.
16. γ = (1 − β²)^(−½) ≈ 1 + ½β² + (3/8)β⁴, so K ≈ ½mu² + (3/8)mu⁴/c². The ratio K\_rel/K\_cl ≈ 1 + (3/4)β². For less than 1%: (3/4)β² < 0.01, β < 0.115, so u ≲ 3.5 × 10⁷ m/s.
17. Δx′ = γ(Δx − βcΔt), cΔt′ = γ(cΔt − βΔx). Then Δx′² − c²Δt′² = γ²\[(Δx² − c²Δt²)(1 − β²)\] (the cross terms cancel) = Δx² − c²Δt².
18. (a) p = ∂L/∂u = mcu/√(c² − u²) = γmu, so p·p = m²c²u²/(c² − u²). (b) H = p·u − L = mcu²/√(c² − u²) + mc√(c² − u²) + V = mc³/√(c² − u²) + V. From (a), c² − u² = m²c⁴/(p² + m²c²), so H = c√(p² + m²c²) + V. (c) (H − V)² = (mc²)² + p²c². H − V = γmc² is Einstein's energy; for small p it is mc² + p²/2m. The conjugate momentum is not mu but γmu.

### C. Numericals

19. γ = 5/3 and v = 240 m/μs. (a) L = 300/(5/3) = 180 m. (b) 180/240 = 0.75 μs; this is proper time, since both events happen at A. (c) In the rocket frame A moves the full 300 m: 300/240 = 1.25 μs = γ × 0.75 μs.
20. Distance = γvτ₀ ≈ 15.8 × 0.998 × 300 m/μs × 2.2 μs ≈ 10.4 km. In its frame the atmosphere is 10/15.8 ≈ 0.63 km, less than its 0.66 km range.
21. γ = 1.25. Home twin: 12 ly/0.6c = 20 y. Traveller: 20/1.25 = 16 y.
22. u = (0.5 + 0.5)c/(1 + 0.25) = 0.8c.
23. ν/ν₀ = √(0.4/1.6) = 0.5: the frequency is halved (wavelength doubled).
24. K = mc² gives γ = 2, β = √3/2 ≈ 0.87, p = γβmc = √3 mc ≈ 1.7mc.

### D. Estimate

25. m ≈ 0.16 kg, v ≈ 40 m/s (145 km/h). K ≈ ½ × 0.16 × 1600 ≈ 130 J. mc² ≈ 0.16 × 9 × 10¹⁶ ≈ 1.4 × 10¹⁶ J. The ratio K/mc² = β²/2 ≈ 10⁻¹⁴.
26. Δt ≈ tβ²/2 = 3.6 × 10⁴ s × (250/3 × 10⁸)²/2 ≈ 3.6 × 10⁴ × 3.5 × 10⁻¹³ ≈ 1.3 × 10⁻⁸ s, about 13 ns.
27. At the moment the source crosses the line of sight there is no motion along it, so there is no classical Doppler shift. Only time dilation remains: in the observer's frame the source's period is γT₀, so ν = ν₀/γ = ν₀√(1 − v²/c²), a red shift. The distance l doesn't enter. This transverse Doppler effect has no classical counterpart.
