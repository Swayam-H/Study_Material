# Learn: The second law and entropy (Atkins 3A, 3B)

## How to use these notes

These notes teach Atkins 11e Topics 3A and 3B from scratch, in the order the lectures did (Thermo-3, then Thermo-4). Budget about 80 minutes: 45 for engines, the second law and the definition of entropy (3A), 25 for entropy changes in specific processes (3B), and 10 for the mistakes list and formula sheet. The fully worked homework solutions (sections 14A and 22) add about 30 minutes.

**Sources.** The slides (`thermo-l3.tex`, `thermo-l4.tex`) come first. Anything only Atkins has is marked **\[beyond slides\]**. Notation follows the slides; Atkins equation numbers are given in brackets, such as (3A.9), so you can look things up.

**How each part runs.** Intuition first, then the derivation with every step, then a worked example with numbers you can do by hand. Each topic ends with check questions; the answers are near the end of the doc.

**Two sign conventions.** Mixing them up is the commonest way to lose marks in this chapter.

- **Engines, fridges and heat pumps (slides L3):** Q\_H, Q\_C and W are all **magnitudes**, so they are positive numbers. The arrows on the diagram show the direction.
- **Clausius inequality and entropy (slides L4):** heats are **signed**. q > 0 means heat flows into the system. The first law is ΔU = q + w, where w is the work done on the system (Atkins and the slides agree).

| Symbol | Meaning | Units |
| --- | --- | --- |
| T\_H, T\_C | temperatures of the hot and cold reservoirs | K |
| Q\_H, Q\_C | heat taken from the hot reservoir and given to the cold one, per cycle (magnitudes) | J |
| W | net work per cycle (magnitude) | J |
| q, w | heat into the system, work done on the system (signed) | J |
| đq\_rev | small amount of heat along a reversible path (the bar on đ means "not exact") | J |
| η | efficiency, W/Q\_H | none |
| COP | coefficient of performance of a fridge or heat pump | none |
| γ | heat capacity ratio C\_p/C\_V | none |
| r | compression ratio, V\_max/V\_min | none |
| S, S\_m | entropy, molar entropy | J K⁻¹, J K⁻¹ mol⁻¹ |
| ΔS\_sys, ΔS\_sur, ΔS\_tot | entropy change of the system, the surroundings, and the two together (the slides write ΔS\_univ for ΔS\_tot) | J K⁻¹ |
| W (statistics only) | number of microstates. Not work: read the context | none |
| k (or k\_B) | Boltzmann constant, 1.381 × 10⁻²³ | J K⁻¹ |
| R | gas constant, 8.314 = N\_A k | J K⁻¹ mol⁻¹ |
| n, N | amount in moles, number of molecules | mol, none |

**Numbers to keep in your head for a no-calculator paper:** ln 2 ≈ 0.693, ln 3 ≈ 1.10, ln 10 ≈ 2.30, R ln 2 ≈ 5.76 J K⁻¹ mol⁻¹, and ln(1 + x) ≈ x when x is small (ln 1.05 ≈ 0.05).

## 1. Why we need a second law (3A.1, intuition)

The first law says energy is conserved. It does not say which way things happen, and the second law fills that gap.

**One-way processes are everywhere.** An egg breaks and never reassembles. Milk mixes into coffee and never unmixes. A hot drink cools to room temperature and never heats itself up from the room. A ball dropped on the floor bounces lower each time and ends at rest; a ball resting on a warm floor never starts bouncing by itself. Film any of these and play it backwards. The reversed film conserves energy and obeys Newton's laws, yet you know at once that it is fake (slides L4, "Play it backwards").

**What the reversed films have in common.** In each real process, energy or matter **spreads out**:

- The ball's ordered kinetic energy (all atoms moving the same way) becomes random thermal jiggling of the many atoms in the floor.
- The gas from a leaking tyre spreads into the much larger volume of the room.
- Heat flows from the hot drink into the room, sharing the energy among far more molecules.

The reverse would need the random motion of many molecules to gather, by itself, into a small region or into one coordinated motion. Nothing forbids this mechanically, but it is so improbable that it is never seen for large systems. Atkins calls this the *dispersal* of energy and matter.

**What the second law does.** It turns this observation into a law, without mentioning molecules. Historically it was first stated in terms of engines (Kelvin–Planck and Clausius, sections 4–5). It was then made quantitative with a new state function, the **entropy S**, chosen so that

$$
\Delta S_{\text{tot}} = \Delta S_{\text{sys}} + \Delta S_{\text{sur}} \ge 0 \quad \text{for every real process}
$$

The division of labour is:

- the **first law** (internal energy U) tells you which changes are *allowed*, because they conserve energy;
- the **second law** (entropy S) tells you which of the allowed changes are *spontaneous*, meaning they happen by themselves.

**Roadmap.** The lectures build up to entropy in five steps, and these notes follow the same order:

1. Engines run in cycles; efficiency and COP (sections 2–3).
2. The two engine statements of the second law, and why they are equivalent (section 4).
3. Reversible processes and the Carnot cycle, which is the best possible engine (sections 5–9).
4. Carnot's result gives ∮đq\_rev/T = 0, so đq\_rev/T is the change of a state function: entropy (sections 10–11).
5. The molecular meaning, S = k ln W (sections 12–13). Then 3B applies all of this to specific processes.

## 2. Cycles and heat engines (slides L3)

An engine must run in a cycle, so ΔU = 0 every cycle, and the net work out equals the net heat in.

**Intuition.** One isothermal expansion of a gas turns heat completely into work. But it works only once: the piston reaches the end of the cylinder. To keep producing work you must push the gas back to where it started and repeat. A device that returns to its starting state is running a **cycle**, and every practical engine does this.

**A reservoir** is a body so large that its temperature does not change when heat flows into or out of it. The sea, the atmosphere and a boiler held at fixed temperature by burning fuel are all good approximations.

### The first law over a cycle

U is a state function. After one full cycle the working substance is back in its initial state, so U is back to its initial value:

$$
\oint \mathrm{d}U = 0 \;\Longrightarrow\; \Delta U_{\text{cycle}} = q_{\text{net}} + w_{\text{net}} = 0 \;\Longrightarrow\; q_{\text{net}} = -w_{\text{net}}
$$

Here w\_net is the work done *on* the gas, so −w\_net is the work done *by* the gas. In words: **net work done by the gas = net heat absorbed by the gas**, per cycle.

**Work is the enclosed area.** The work done by the gas on a path is ∫p dV, the area under the path on a p–V diagram. Going round a loop, the expansion stroke contributes the area under the upper curve (positive) and the compression stroke subtracts the area under the lower curve. What is left is the **area enclosed by the loop**.

- A **clockwise** loop has expansion at high pressure and compression at low pressure, so there is net work *out*. This is an engine.
- An **anticlockwise** loop has net work *in*. This is a refrigerator or heat pump.

### Heat engines and efficiency

Every heat engine does three things each cycle:

1. absorbs heat Q\_H from a hot reservoir at T\_H;
2. delivers work W;
3. rejects heat Q\_C to a cold reservoir at T\_C.

All three are **magnitudes**. The net heat absorbed is Q\_H − Q\_C, so the first law over a cycle gives

$$
W = Q_{\mathrm{H}} - Q_{\mathrm{C}}
$$

The **efficiency** is what you get (work) divided by what you pay for (heat from the hot reservoir, which is where the fuel goes):

$$
\eta = \frac{W}{Q_{\mathrm{H}}} = \frac{Q_{\mathrm{H}} - Q_{\mathrm{C}}}{Q_{\mathrm{H}}} = 1 - \frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}}
$$

The first law alone would allow Q\_C = 0 and η = 1. The second law will forbid that (section 4). Atkins writes the same thing as η = |w|/|q\_h| (3A.7) and η = 1 − |q\_c|/|q\_h| (3A.8), using modulus signs because his heats are signed.

&#91;embedded content: energy flow per cycle · engine, refrigerator, heat pump\]

The same three arrows appear in all three devices; only their directions and the one you want change. A fridge and a heat pump are the same machine run for different purposes.

### Worked example: a rectangular cycle

A gas is taken clockwise round a rectangle on a p–V diagram, between p = 1.0 bar and 3.0 bar and between V = 1.0 L and 4.0 L. Per cycle it absorbs Q\_H = 2400 J in total on the steps where heat flows in. Find W, Q\_C and η.

1. Work = enclosed area = Δp × ΔV = (2.0 bar)(3.0 L) = 6.0 bar L. Since 1 bar L = 10⁵ Pa × 10⁻³ m³ = 100 J, W = 600 J. The loop is clockwise, so this is work *out*.
2. First law over the cycle: Q\_C = Q\_H − W = 2400 − 600 = 1800 J.
3. η = W/Q\_H = 600/2400 = 0.25.

**Exam habit:** in a cycle, Q\_H is the total heat absorbed on the steps where heat goes in. It is not the net heat. The net heat is Q\_H − Q\_C = W.

## 3. Refrigerators and heat pumps: COP (slides L3)

Run an engine backwards and work carries heat from cold to hot. The coefficient of performance (COP) measures heat moved per unit of work, and it can be well above 1.

**Intuition.** Heat does not flow uphill by itself, but you can *pump* it uphill, the way a pump lifts water. In a refrigerator the cold reservoir is the inside of the fridge and the hot reservoir is the kitchen. The coils at the back feel warm because that is where the heat is dumped. A heat pump is the same machine with the opposite purpose: it takes heat from the cold outdoors and delivers it into a warm house.

**Energy balance.** All quantities are magnitudes. Work W goes in, heat Q\_C is taken from the cold side, and heat Q\_H comes out on the hot side. Over a cycle ΔU = 0, so

$$
Q_{\mathrm{H}} = Q_{\mathrm{C}} + W
$$

**COP = what you want ÷ what you pay for.** You always pay W. What you want depends on the job:

$$
\text{COP}_{\text{fridge}} = \frac{Q_{\mathrm{C}}}{W} \qquad\qquad \text{COP}_{\text{heat pump}} = \frac{Q_{\mathrm{H}}}{W}
$$

Because Q\_H = Q\_C + W, the two are related by COP\_heat pump = COP\_fridge + 1 (a one-line consequence, not on the slides).

**Why COP can exceed 1.** The work does not *make* the heat; it *moves* heat that was already there. The slide example: a heat pump with COP = 3.5 delivers 3.5 kJ to the house for every 1 kJ of electricity. An electric heater delivers only 1 kJ. The extra 2.5 kJ is drawn from the cold outdoor air.

**The best possible COP.** Section 6 shows that a reversible (Carnot) device has Q\_C/Q\_H = T\_C/T\_H. Putting that in gives the slide limits:

$$
\text{COP}_{\text{fridge, max}} = \frac{T_{\mathrm{C}}}{T_{\mathrm{H}} - T_{\mathrm{C}}} \qquad\qquad \text{COP}_{\text{heat pump, max}} = \frac{T_{\mathrm{H}}}{T_{\mathrm{H}} - T_{\mathrm{C}}}
$$

Read them physically. A small temperature gap T\_H − T\_C makes pumping cheap, so the COP is large. Cooling something very cold (small T\_C) makes a fridge's COP small: each joule removed near absolute zero costs a lot of work.

### Worked example 1: a fridge

A fridge with COP = 3 removes 900 J from its inside. How much work does it use, and how much heat reaches the kitchen?

- W = Q\_C/COP = 900/3 = 300 J.
- Q\_H = Q\_C + W = 900 + 300 = 1200 J. The kitchen gains more heat than the food lost.

### Worked example 2: a heat pump against its limit

A house is kept at 27 °C (300 K) when it is −3 °C (270 K) outside. It needs 5.0 kW of heat. What is the least electrical power an ideal heat pump needs?

1. COP\_max = T\_H/(T\_H − T\_C) = 300/30 = 10.
2. Least power = heat needed / COP = 5.0/10 = 0.50 kW. An electric heater would need the full 5.0 kW.

### Concept check from the slides: the open fridge door

You leave the fridge door open in a closed, insulated kitchen. Does the kitchen get warmer, cooler, or stay the same?

It gets **warmer**. The fridge only moves heat round a loop: from the kitchen into the open fridge, then out of the back coils into the kitchen again. The electrical work W also ends up as heat in the kitchen, so the kitchen gains W every cycle. An air conditioner *does* cool a room because its hot side is outside the room.

## 4. The two statements of the second law, and why they are equivalent (3A.1, slides L3)

The second law can be stated as "no perfect engine" (Kelvin–Planck) or "no perfect fridge" (Clausius). Each one implies the other, so they are the same law.

### Kelvin–Planck statement

> No cyclic device can absorb heat from a single reservoir and convert it *entirely* into work.

Atkins words it as: no process is possible whose *sole result* is the absorption of heat from a reservoir and its complete conversion into work. What it means:

- η < 1 for every heat engine, and Q\_C > 0 always. Every engine needs a cold sink.
- The first law would allow a 100% engine. The second law forbids it.
- A ship cannot cross the ocean by cooling the sea water and using the heat, even though the sea holds a vast amount of internal energy. There is no colder reservoir to dump heat into.
- **The word "cyclic" (or "sole result") matters.** An isothermal expansion of a perfect gas *does* turn heat entirely into work: ΔU = 0, so q = −w. But the gas ends up in a larger volume, so that is not the sole result, and it cannot be repeated without compressing the gas again.

### Clausius statement

> No cyclic device can transfer heat from a colder body to a hotter body with no other effect.

In Atkins's words, heat does not flow spontaneously from a cool body to a hotter one. A fridge does not break this rule because it needs work, and that work is the "other effect".

### The equivalence proof

Two statements A and B are equivalent if each implies the other. The neat way is to prove the contrapositives: **if Clausius fails, Kelvin–Planck fails**, and **if Kelvin–Planck fails, Clausius fails**. In each case you build a combined device and do the bookkeeping for one cycle. The drawing below the two proofs shows both set-ups.

**Proof 1 (slides): a perfect fridge gives a perfect engine.** Suppose a "perfect fridge" R\* exists. Each cycle it moves heat Q\_C from the cold reservoir to the hot one with no work. Run an ordinary engine E between the same two reservoirs, sized so that it rejects exactly Q\_C per cycle. E takes Q\_H from the hot reservoir and delivers W = Q\_H − Q\_C.

| Per cycle, combined device | Engine E | Perfect fridge R\* | Net |
| --- | --- | --- | --- |
| Hot reservoir | loses Q\_H | gains Q\_C | loses Q\_H − Q\_C |
| Cold reservoir | gains Q\_C | loses Q\_C | no change |
| Work | delivers W = Q\_H − Q\_C | needs none | W = Q\_H − Q\_C out |

The combination takes heat Q\_H − Q\_C from a single reservoir and turns all of it into work, with nothing else changed. That is exactly what Kelvin–Planck forbids.

**Proof 2 (the reverse, which the slides say "also works"): a perfect engine gives a perfect fridge.** Suppose a perfect engine E\* exists. It takes heat Q from the hot reservoir and delivers W = Q, rejecting nothing. Use that work to drive an ordinary fridge R. R takes Q\_C from the cold reservoir and delivers Q\_C + W = Q\_C + Q to the hot reservoir.

| Per cycle, combined device | Perfect engine E\* | Ordinary fridge R | Net |
| --- | --- | --- | --- |
| Hot reservoir | loses Q | gains Q\_C + Q | gains Q\_C |
| Cold reservoir | no change | loses Q\_C | loses Q\_C |
| Work | delivers W = Q | uses W = Q | none |

The net effect is heat Q\_C moved from cold to hot with no work and no other change. That breaks Clausius.

So each statement fails exactly when the other does: they are one law in two forms.

&#91;embedded content: equivalence proof · the dashed box is the combined device; red marks the impossible machine\]

In each panel, look only at what crosses the dashed box. Proof 1 leaves heat taken from one reservoir and turned entirely into work. Proof 2 leaves heat moved uphill with no work.

**A preview of the entropy view (Atkins 3A.2).** Once entropy is defined (section 11), both statements become one rule: ΔS\_tot ≥ 0. A perfect engine takes heat Q from a reservoir at T, lowering its entropy by Q/T, and work carries no entropy away, so the total entropy falls. In a perfect fridge the cold body loses Q/T\_C and the hot body gains only Q/T\_H, which is smaller, so again the total entropy falls. Both are forbidden for the same reason.

### Worked example: which law does it break?

1. A device takes 500 J per cycle from the sea at 290 K and delivers 500 J of work, with nothing else changed. The first law is satisfied (500 = 500). It breaks **Kelvin–Planck**: heat from a single reservoir is turned entirely into work.
2. A box moves 100 J per cycle from a 270 K freezer compartment to a 300 K kitchen with no power supply. Energy is conserved. It breaks **Clausius**.
3. An inventor's engine takes 1000 J at 400 K, rejects 500 J at 300 K and gives 500 J of work (slides, concept check 1). The first law is fine. But η = 0.50, while the best possible is 1 − 300/400 = 0.25 (section 6). It breaks the second law, so don't invest.

## 5. Reversibility: what makes a process reversible (slides L3)

A process is reversible if it can be run backwards so that *both* the system and its surroundings return to their original states, with no trace left anywhere. Reversible processes give the best possible performance, which is why the Carnot engine is built from them.

**Intuition.** Picture a gas in a cylinder whose piston holds a pile of sand. Remove one grain at a time and the gas expands in tiny steps, always almost in equilibrium. Put the grains back one at a time and every step retraces itself exactly. Now pull the piston out suddenly instead. The gas rushes, swirls and heats unevenly, and no small push on the piston will make that swirl run backwards. The first process is (nearly) reversible; the second is not.

A useful test: a reversible change can be reversed by an **infinitesimal** change in a condition, such as making the external pressure dp higher instead of dp lower, or the reservoir dT colder instead of dT hotter. (This is the Topic 2A definition, and it says the same thing.)

| Sources of irreversibility | Conditions for reversibility |
| --- | --- |
| friction and viscosity | quasi-static: so slow that the system passes through a sequence of equilibrium states |
| heat flow across a finite temperature difference | no dissipative effects (no friction, no electrical resistance) |
| free expansion, and mixing of different substances | heat exchanged only between bodies at (almost) the same temperature |
| electrical resistance, inelastic deformation |  |
| fast (non-quasi-static) changes |  |

**Why heat flow across a finite ΔT is irreversible.** Heat flows by itself from 400 K to 300 K. To send it back, from 300 K to 400 K, you need a fridge and work. So the surroundings cannot be restored for free. If the temperature difference is only dT, the direction of flow can be flipped by an infinitesimal change, and the flow is reversible.

**Why reversible means best.** In a reversible expansion the gas pushes against the largest pressure it can (its own, less an infinitesimal amount), so it does the **most work** possible between the given states. Any friction or fast motion wastes some of the possible work as heat that is dumped somewhere. Atkins puts this as |w\_rev| ≥ |w|, which is the starting point of his proof of the Clausius inequality (section 10).

**Reversible processes are idealisations**, like a frictionless plane: infinitely slow, so a real reversible engine would deliver zero power. They still matter because they set the upper limit for real devices. They also give the path along which entropy is *calculated* (section 11).

### Worked example: classify these

1. Ice melting in a glass of water held at exactly 0 °C, with heat supplied from surroundings at 0 °C + dT: **reversible**, because heat flows across an infinitesimal temperature difference.
2. Ice melting in a drink at 20 °C: **irreversible**, because heat flows across a finite ΔT of 20 K.
3. Gas expanding into a vacuum when a partition breaks: **irreversible** (free expansion).
4. A gas compressed by a piston that moves slowly and without friction, inside an insulated cylinder: **reversible** (a reversible adiabatic change).
5. Stirring a liquid with a paddle: **irreversible**, because the work is dissipated as heat through viscosity.

## 6. The Carnot cycle and its efficiency (3A.3(a), slides L3)

The Carnot cycle is two reversible isotherms joined by two reversible adiabats. For a perfect gas it gives Q\_C/Q\_H = T\_C/T\_H, so η = 1 − T\_C/T\_H.

**Intuition.** Section 5 says heat must be exchanged only between bodies at the same temperature, or the process is irreversible. So the engine takes in heat only while it sits at T\_H (an isotherm touching the hot reservoir) and gives out heat only while it sits at T\_C (an isotherm touching the cold reservoir). To get from one temperature to the other without any heat flow, it uses adiabats. Two isotherms plus two adiabats is the only way to run a reversible cycle between two reservoirs.

### The four stages (slide numbering)

| Stage | What happens | Heat | Temperature |
| --- | --- | --- | --- |
| 1 → 2 | reversible isothermal expansion, V₁ → V₂, touching the hot reservoir | absorbs Q\_H | stays T\_H |
| 2 → 3 | reversible adiabatic expansion, V₂ → V₃, insulated | none | falls T\_H → T\_C |
| 3 → 4 | reversible isothermal compression, V₃ → V₄, touching the cold reservoir | rejects Q\_C | stays T\_C |
| 4 → 1 | reversible adiabatic compression, V₄ → V₁, insulated | none | rises T\_C → T\_H |

Atkins labels the same corners A, B, C, D and calls the stages 1 to 4. The loop runs clockwise on a p–V diagram, so it is an engine. The drawing at the end of this section shows the loop, with the proportions of the worked example.

### Derivation of η = 1 − T\_C/T\_H for a perfect gas

**Step 1: heat on the isotherms.** For a perfect gas U depends only on T, so ΔU = 0 on an isotherm and q = −w. The reversible isothermal work is w = −nRT ln(V\_f/V\_i) (Topic 2A). So:

$$
\text{stage } 1\to2:\quad Q_{\mathrm{H}} = q_{12} = nRT_{\mathrm{H}}\ln\frac{V_2}{V_1} \;(>0)
$$

$$
\text{stage } 3\to4:\quad q_{34} = nRT_{\mathrm{C}}\ln\frac{V_4}{V_3} < 0 \quad\Longrightarrow\quad Q_{\mathrm{C}} = |q_{34}| = nRT_{\mathrm{C}}\ln\frac{V_3}{V_4}
$$

**Step 2: the adiabats link the volumes.** For a reversible adiabatic change of a perfect gas, TV^(γ−1) = constant (Topic 2E). A quick reminder of where this comes from: dU = đw gives nC\_V,m dT = −(nRT/V) dV, so C\_V,m dT/T = −R dV/V. Integrating gives T V^(R/C\_V,m) = constant, and R/C\_V,m = γ − 1. Atkins writes the same thing as VT^c = constant with c = C\_V,m/R. Apply it to the two adiabats:

$$
\text{stage } 2\to3:\; T_{\mathrm{H}}V_2^{\gamma-1} = T_{\mathrm{C}}V_3^{\gamma-1} \qquad\qquad \text{stage } 4\to1:\; T_{\mathrm{H}}V_1^{\gamma-1} = T_{\mathrm{C}}V_4^{\gamma-1}
$$

Divide the first equation by the second. T\_H and T\_C cancel:

$$
\left(\frac{V_2}{V_1}\right)^{\gamma-1} = \left(\frac{V_3}{V_4}\right)^{\gamma-1} \quad\Longrightarrow\quad \frac{V_2}{V_1} = \frac{V_3}{V_4}
$$

**Why V₂/V₁ = V₃/V₄, in words.** Both adiabats run between the same two temperatures. Each one therefore stretches or shrinks the volume by the same factor, f = (T\_H/T\_C)^(1/(γ−1)): V₃ = f V₂ and V₄ = f V₁. Dividing gives V₃/V₄ = V₂/V₁. The expansion ratio on the cold isotherm equals the one on the hot isotherm.

**Step 3: take the ratio of the heats.** The two logarithms are now equal, so they cancel:

$$
\frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}} = \frac{nRT_{\mathrm{C}}\ln(V_3/V_4)}{nRT_{\mathrm{H}}\ln(V_2/V_1)} = \frac{T_{\mathrm{C}}}{T_{\mathrm{H}}}
$$

**Step 4: efficiency.**

$$
\eta_{\text{Carnot}} = 1 - \frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}} = 1 - \frac{T_{\mathrm{C}}}{T_{\mathrm{H}}} \qquad (3\text{A}.9)
$$

**The adiabatic works cancel.** On stage 2→3 the gas does work nC\_V,m(T\_H − T\_C); on stage 4→1 exactly the same amount is done on it. So the net work comes only from the isotherms: W = Q\_H − Q\_C.

**What the result says.**

- η depends only on the two temperatures, which must be in **kelvin**.
- η = 1 would need T\_C = 0 or T\_H = ∞. A perfect engine is impossible, which agrees with Kelvin–Planck.
- Raising T\_H or lowering T\_C improves the efficiency. This is why power stations use superheated steam.

**Best COP, now derived.** For a Carnot fridge or heat pump, Q\_C/Q\_H = T\_C/T\_H still holds, and W = Q\_H − Q\_C:

$$
\text{COP}_{\text{fridge}} = \frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}} - Q_{\mathrm{C}}} = \frac{T_{\mathrm{C}}}{T_{\mathrm{H}} - T_{\mathrm{C}}} \qquad \text{COP}_{\text{heat pump}} = \frac{Q_{\mathrm{H}}}{Q_{\mathrm{H}} - Q_{\mathrm{C}}} = \frac{T_{\mathrm{H}}}{T_{\mathrm{H}} - T_{\mathrm{C}}}
$$

### Quick examples

- Slides: T\_H = 500 K, T\_C = 300 K gives η = 1 − 300/500 = 0.40. For Q\_H = 1000 J, W = 400 J and Q\_C = 600 J.
- Atkins (Brief illustration 3A.3): steam at 573 K, waste heat to 293 K gives η = 1 − 293/573 = 0.489. Real plants get less because of friction and irreversible turbines.

### Worked example: one Carnot cycle, stage by stage

1.00 mol of a monatomic perfect gas (C\_V,m = 3R/2, so γ = 5/3) runs a Carnot cycle between T\_H = 400 K and T\_C = 300 K. On the hot isotherm it expands from V₁ = 10.0 L to V₂ = 20.0 L. Use R ln 2 = 5.76 J K⁻¹ mol⁻¹.

1. **Hot isotherm:** Q\_H = nRT\_H ln 2 = 400 × 5.76 = 2305 J.
2. **Adiabatic expansion:** f = (T\_H/T\_C)^(1/(γ−1)) = (4/3)^(3/2). By hand, (4/3) × √(4/3) = 1.333 × 1.155 = 1.54. So V₃ = 1.54 × 20.0 = 30.8 L. The gas does work nC\_V,m(T\_H − T\_C) = 1.5 × 8.314 × 100 = 1247 J.
3. **Cold isotherm:** V₄ = f V₁ = 15.4 L, and V₃/V₄ = 2, as it must be. Q\_C = nRT\_C ln 2 = 300 × 5.76 = 1729 J.
4. **Adiabatic compression:** 1247 J of work is done on the gas, cancelling stage 2.
5. **Net:** W = Q\_H − Q\_C = 2305 − 1729 = 576 J, so η = 576/2305 = 0.25. This equals 1 − 300/400.

| Stage | q into gas (J) | w on gas (J) | ΔU (J) |
| --- | --- | --- | --- |
| 1 → 2 | +2305 | −2305 | 0 |
| 2 → 3 | 0 | −1247 | −1247 |
| 3 → 4 | −1729 | +1729 | 0 |
| 4 → 1 | 0 | +1247 | +1247 |
| Cycle | +576 | −576 | 0 |

Notice one more thing for later. Q\_H/T\_H = 2305/400 = 5.76 J K⁻¹ and Q\_C/T\_C = 1729/300 = 5.76 J K⁻¹. They are equal. That equality is the seed of entropy (section 10).

&#91;embedded content: Carnot cycle on a p–V diagram · two isotherms, two adiabats, clockwise\]

The adiabats are steeper than the isotherms (pV^γ versus pV is constant), which is why the loop closes. The loop runs clockwise, so the net work is out of the gas.

## 7. Carnot's theorem and its proof (3A.3(a), slides L3)

No engine between two reservoirs can beat a reversible one, and every reversible engine between them has the same efficiency, 1 − T\_C/T\_H, whatever it is made of.

> **Carnot's theorem.** (1) No engine working between two given reservoirs is more efficient than a reversible engine working between them. (2) All reversible engines working between the same two reservoirs have the same efficiency, whatever the working substance.

**Intuition.** A reversible engine wastes nothing: no friction, no heat leaking across a temperature gap. Anything an irreversible engine does differently can only lose work. The surprising part is (2): the efficiency of a reversible engine cannot depend on whether it runs on helium, steam or rubber bands. If it did, you could pair a better one with a worse one run backwards and get something for nothing.

### Proof of part (1) (slides: uses the Clausius statement)

Suppose some engine X is *more* efficient than a Carnot engine C between the same reservoirs: η\_X > η\_C.

1. A Carnot engine is reversible, so run C **backwards** as a refrigerator.
2. Size the two machines so they exchange the **same work W** per cycle, and let X's work drive the fridge C.
3. Since η = W/Q\_H and η\_X > η\_C with the same W, X draws **less** heat from the hot reservoir than the fridge C returns to it: Q\_H(X) < Q\_H(C).
4. Bookkeeping per cycle:
   - Work: X makes W and C uses it, so there is no net work.
   - Hot reservoir: gains Q\_H(C) − Q\_H(X) > 0.
   - Cold reservoir: loses Q\_C(C) − Q\_C(X) = \[Q\_H(C) − W\] − \[Q\_H(X) − W\] = Q\_H(C) − Q\_H(X), the same amount.
5. Net effect: heat moved from cold to hot with no work and no other change. This breaks Clausius, so the assumption is false and η\_X ≤ η\_C.

**With numbers.** Reservoirs at 400 K and 300 K, so η\_C = 0.25. Suppose X claims η\_X = 0.40. Take W = 100 J.

| Per cycle | Engine X (η = 0.40) | Carnot C run backwards (η = 0.25) | Net |
| --- | --- | --- | --- |
| Hot reservoir | gives 250 J | receives 400 J | gains 150 J |
| Cold reservoir | receives 150 J | gives 300 J | loses 150 J |
| Work | makes 100 J | uses 100 J | 0 |

150 J per cycle flows uphill from 300 K to 400 K for free. Impossible, so X cannot exist.

### Proof of part (2)

Now let X be reversible too. Part (1) with C as the "better" engine says η\_X ≤ η\_C. Because X is reversible, we can also run X backwards and C forwards, and the same argument gives η\_C ≤ η\_X. Both hold only if η\_X = η\_C.

**Atkins's version \[beyond slides\].** Atkins proves part (2) with the Kelvin statement instead. He sizes the machines so the cold reservoir has no net change. The more efficient engine A then drives B backwards and still has work left over. Net result: heat from the hot reservoir turned completely into work, which Kelvin forbids. Either statement works, because they are equivalent (section 4).

### Why the theorem matters

- **1 − T\_C/T\_H is a law of nature**, not a property of perfect gases. The perfect-gas calculation in section 6 simply found the value that every reversible engine must share.
- So **Q\_C/Q\_H = T\_C/T\_H for every reversible cycle, whatever the working substance.** This is step 2 of Atkins's three-step proof that entropy is a state function (section 10).
- It also lets temperature be defined without reference to any substance (section 8).

### Worked example: judge the claims

Reservoirs at 600 K and 300 K, so η\_max = 1 − 300/600 = 0.50.

1. Claimed η = 0.55: **impossible**, because it beats Carnot.
2. Claimed η = 0.50 from a real petrol engine: **impossible in practice**, because only a reversible (infinitely slow) engine reaches the limit.
3. Claimed η = 0.30: **allowed**. It is an irreversible engine doing worse than the limit.
4. Two different reversible engines, one using helium and one using steam, between these reservoirs: **both have η = 0.50 exactly**.

## 8. The thermodynamic temperature scale (3A.3(b), slides L3)

Kelvin turned Carnot's theorem around: since Q\_C/Q\_H for a reversible engine depends only on the two reservoirs, that ratio can be used to *define* the ratio of their temperatures.

**Intuition.** A mercury thermometer measures temperature through one substance's expansion, and a different liquid would give a slightly different scale. Carnot's theorem gives a measure that belongs to no substance: run any reversible engine between two bodies and look at what fraction of the heat comes out the cold side. That fraction depends only on how hot the two bodies are.

**The definition.**

$$
\frac{T_{\mathrm{C}}}{T_{\mathrm{H}}} \equiv \left.\frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}}\right|_{\text{reversible}}
$$

This fixes only *ratios* of temperatures. To fix the size of the unit, one temperature is assigned a value: the triple point of water is set to 273.16 K exactly (slides). \[Beyond slides: Atkins notes this was due to be replaced. Since 2019 the SI kelvin is defined by fixing the Boltzmann constant at k = 1.380649 × 10⁻²³ J K⁻¹ exactly; the triple point is still 273.16 K to within measurement error.\]

Since η = 1 − Q\_C/Q\_H, the definition can also be written in terms of efficiency. With the cold body as the unknown and the hot reservoir known:

$$
T = (1 - \eta)\,T_{\mathrm{h}} \qquad (3\text{A}.10)
$$

**Three things to notice.**

1. **It is independent of any material**, unlike a mercury or gas thermometer.
2. **It agrees with the perfect-gas scale** from Lecture 1. The derivation in section 6 used the T in pV = nRT and found Q\_C/Q\_H = T\_C/T\_H. So the perfect-gas temperature and the thermodynamic temperature have the same ratios. With the same fixed point they are the same scale. This is why we can use one symbol T for both.
3. **T = 0 would need Q\_C = 0**, which is a 100% efficient engine and is forbidden by Kelvin–Planck. So absolute zero cannot be reached by such a process. This is a hint of the third law (Atkins 3C, after the quiz range).

### Worked example

(a) A reversible engine takes heat from a reservoir at 400 K and has a measured efficiency of 0.30. What is the temperature of its cold sink?

T\_C = (1 − η) T\_H = 0.70 × 400 = 280 K.

(b) A reversible engine rejects heat to a sink at 300 K and has an efficiency of 0.40. What is the temperature of the hot source?

Q\_C/Q\_H = 1 − 0.40 = 0.60 = T\_C/T\_H, so T\_H = 300/0.60 = 500 K.

## 9. The Otto cycle (slides only; in Atkins only as problem P3B.10)

A petrol engine is modelled as two reversible adiabats joined by two constant-volume steps. Its ideal efficiency depends only on the compression ratio r = V\_max/V\_min:

$$
\eta_{\text{Otto}} = 1 - r^{\,1-\gamma}
$$

**Intuition: the four strokes.** Fuel and air are drawn in. The piston compresses them so quickly that there is no time for heat to flow, so the compression is adiabatic. A spark ignites the mixture, which burns so fast that the piston barely moves: heat enters at constant volume, and pressure and temperature jump. The hot gas pushes the piston out in the power stroke, again adiabatically. Finally the exhaust valve opens and the hot gas is swapped for a cool fresh charge; the model treats this as cooling at constant volume back to the start.

| Step | What happens | Heat |
| --- | --- | --- |
| 1 → 2 | reversible adiabatic compression, V\_max → V\_min | none |
| 2 → 3 | ignition: heating at constant volume V\_min | Q\_in = nC\_V,m(T₃ − T₂) |
| 3 → 4 | power stroke: reversible adiabatic expansion, V\_min → V\_max | none |
| 4 → 1 | exhaust: cooling at constant volume V\_max | Q\_out = nC\_V,m(T₄ − T₁) |

(Atkins's problem labels the same corners A, B, C, D.)

### Route to the formula

This derivation is the core of homework P3B.10(b)–(c). Here it is in slide notation; section 22 redoes it in Atkins's notation.

1. **Heat flows only on the constant-volume steps.** At constant volume no work is done, so q = ΔU = nC\_V,mΔT. That gives the Q\_in and Q\_out in the table, and η = 1 − Q\_out/Q\_in.
2. **The adiabats link the temperatures.** TV^(γ−1) is constant on each adiabat, and both adiabats run between the same two volumes. So each multiplies the temperature by the *same* factor, r^(γ−1): T₂ = T₁ r^(γ−1) and T₃ = T₄ r^(γ−1).
3. **Substitute and cancel:** Q\_out/Q\_in = (T₄ − T₁)/(T₃ − T₂) = (T₄ − T₁)/\[r^(γ−1)(T₄ − T₁)\] = r^(1−γ). The C\_V,m and the bracket (T₄ − T₁) cancel, so η = 1 − r^(1−γ).

This is the same trick as V₂/V₁ = V₃/V₄ in the Carnot cycle: two adiabats spanning the same range produce the same ratio.

### Numbers

- **Slides:** r = 8, γ = 1.4. Then r^(γ−1) = 8^0.4 = 2^1.2 ≈ 2.30, so η = 1 − 1/2.30 ≈ 0.56.
- **Hand-friendly version:** r = 8 with γ = 4/3 (a gas with C\_V,m = 3R). Then r^(γ−1) = 8^(1/3) = 2, so η = 1 − 1/2 = 0.50.

### Worked example: Otto versus Carnot

Use r = 8 and γ = 4/3, with intake at T₁ = 300 K and peak temperature T₃ = 1500 K after ignition. Is the Otto cycle as good as a Carnot engine working between the same extreme temperatures?

1. T₂ = 300 × 2 = 600 K at the end of compression. T₄ = 1500/2 = 750 K at the end of the power stroke.
2. η\_Otto = 0.50 (from above). As a check: Q\_out/Q\_in = (750 − 300)/(1500 − 600) = 450/900 = 0.50.
3. η\_Carnot = 1 − 300/1500 = 0.80.

The Otto cycle is worse because its heat does not all enter at the top temperature. It enters across the whole range from 600 K to 1500 K, and it leaves across the range from 750 K to 300 K. Carnot's limit needs all the heat in at T\_max and all the heat out at T\_min.

**Real engines** (slides table):

| Engine | Ideal η | Typical real η |
| --- | --- | --- |
| Petrol (Otto) | 0.56 | 0.25–0.30 |
| Diesel | 0.6–0.65 | 0.35–0.45 |
| Steam (Rankine) | 0.5–0.6 | 0.33–0.45 |

The gap comes from friction, heat leaking through the cylinder walls, and combustion that is not instantaneous. This is the "30% of fuel energy" from the start of Lecture 3.

## 10. From Carnot to the Clausius inequality (3A.3(c), slides L4)

For every reversible cycle ∮đq\_rev/T = 0, and for every real cycle ∮đq/T ≤ 0. The first result makes entropy a state function; the second makes it grow.

**From here on heats are signed:** q > 0 means heat flows *into* the working substance.

### Step 1: the Carnot cycle with signed heats

In magnitudes, Q\_C/Q\_H = T\_C/T\_H. With signs, the hot isotherm has q\_H = +Q\_H (in) and the cold isotherm has q\_C = −Q\_C (out). Then

$$
\frac{q_{\mathrm{H}}}{T_{\mathrm{H}}} + \frac{q_{\mathrm{C}}}{T_{\mathrm{C}}} = \frac{Q_{\mathrm{H}}}{T_{\mathrm{H}}} - \frac{Q_{\mathrm{C}}}{T_{\mathrm{C}}} = 0 \qquad (3\text{A}.6)
$$

Check with the section 6 example: +2305/400 − 1729/300 = 5.76 − 5.76 = 0. The adiabats add nothing, because q = 0 on them. So the sum of q/T round the whole Carnot cycle is zero.

*Sign warning:* in the middle of his derivation Atkins switches to signing q\_h and q\_c from the reservoirs' side, so his q\_h becomes negative. Always state your sign convention before you write a sum of q/T.

### Step 2: any working substance

Carnot's theorem (section 7) says Q\_C/Q\_H = T\_C/T\_H for *every* reversible engine, whatever it contains. So Step 1 holds for any substance, not just a perfect gas.

### Step 3: any reversible cycle

Take any reversible loop on a p–V diagram. Cover it with many closely spaced adiabats, and join each neighbouring pair with two short isotherms that run along the loop's edge, one at the top and one at the bottom. Each thin strip is now a small Carnot cycle, and for each one Σq/T = 0.

Add up all the strips. Wherever two neighbouring strips share an adiabat, they run along it in opposite directions; it carries no heat anyway, so nothing is left over from the inside. What remains is the zigzag of short isotherms round the outside, and its Σq/T is still zero. As the strips get thinner, the zigzag becomes the smooth loop (Atkins Fig. 3A.12):

$$
\oint \frac{\text{đ}q_{\text{rev}}}{T} = 0 \qquad \text{for every reversible cycle} \qquad (3\text{A}.5)
$$

### Step 4: this makes đq\_rev/T the change of a state function

Take two states A and B, and two different reversible paths between them. Go from A to B along path 1 and come back along path 2. That is a cycle, so by Step 3

$$
\int_{A,\,\text{path 1}}^{B} \frac{\text{đ}q_{\text{rev}}}{T} + \int_{B,\,\text{path 2}}^{A} \frac{\text{đ}q_{\text{rev}}}{T} = 0 \;\Longrightarrow\; \int_{A,\,\text{path 1}}^{B} \frac{\text{đ}q_{\text{rev}}}{T} = \int_{A,\,\text{path 2}}^{B} \frac{\text{đ}q_{\text{rev}}}{T}
$$

The integral is the same along every reversible path, so it depends only on the end states. That is exactly what it means to be the change of a state function. That function is the **entropy** (section 11).

### Step 5: irreversible cycles, the Clausius inequality

An irreversible engine between T\_H and T\_C is less efficient than Carnot (section 7):

$$
1 - \frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}} < 1 - \frac{T_{\mathrm{C}}}{T_{\mathrm{H}}} \;\Longrightarrow\; \frac{Q_{\mathrm{C}}}{Q_{\mathrm{H}}} > \frac{T_{\mathrm{C}}}{T_{\mathrm{H}}} \;\Longrightarrow\; \frac{Q_{\mathrm{H}}}{T_{\mathrm{H}}} - \frac{Q_{\mathrm{C}}}{T_{\mathrm{C}}} < 0
$$

It rejects more heat than a reversible engine would, so the signed sum of q/T goes negative. The general statement is the **Clausius inequality**:

$$
\oint \frac{\text{đ}q}{T} \le 0 \qquad (= 0 \text{ only for a reversible cycle})
$$

Here T is the temperature of the reservoir that supplies or receives each bit of heat. During an irreversible change the system may not even have a single temperature, but the reservoir always does.

**Worked example.** Three engines, each taking Q\_H = 1000 J per cycle from a reservoir at 400 K and rejecting heat at 300 K. Σq/T = 1000/400 − Q\_C/300 = 2.50 − Q\_C/300 J K⁻¹.

| Engine | Q\_C (J) | W (J) | η | Σq/T (J K⁻¹) | Verdict |
| --- | --- | --- | --- | --- | --- |
| Real, irreversible | 800 | 200 | 0.20 | 2.50 − 2.67 = −0.17 | allowed |
| Carnot (reversible) | 750 | 250 | 0.25 | 2.50 − 2.50 = 0 | the limit |
| The inventor's claim (section 4) | 500 | 500 | 0.50 | 2.50 − 1.67 = +0.83 | forbidden |

### Step 6: one process, dS ≥ đq/T

Take a cycle that goes from A to B by some *irreversible* process, then returns from B to A *reversibly*. Apply the Clausius inequality to the whole cycle:

$$
\int_A^B \frac{\text{đ}q}{T} + \underbrace{\int_B^A \frac{\text{đ}q_{\text{rev}}}{T}}_{=\,S_A - S_B\,=\,-\Delta S} \le 0 \;\Longrightarrow\; \Delta S \ge \int_A^B \frac{\text{đ}q}{T}, \qquad \mathrm{d}S \ge \frac{\text{đ}q}{T} \qquad (3\text{A}.11)
$$

The equality holds for a reversible process and the inequality for an irreversible one.

**Atkins's route to the same result \[beyond slides\].** A reversible change does the most work, so |đw\_rev| ≥ |đw|. Both are negative for an expansion, so đw − đw\_rev ≥ 0. Because U is a state function, dU = đq + đw = đq\_rev + đw\_rev along both paths. Rearranging gives đq\_rev − đq = đw − đw\_rev ≥ 0, so đq\_rev ≥ đq. Divide by T: dS = đq\_rev/T ≥ đq/T.

### Step 7: isolated systems, ΔS ≥ 0

An isolated system exchanges no heat, so đq = 0 and the inequality becomes dS ≥ 0 (3A.12). The system together with its surroundings ("the universe") is isolated, so

$$
\Delta S_{\text{isolated}} \ge 0, \qquad \Delta S_{\text{tot}} = \Delta S_{\text{sys}} + \Delta S_{\text{sur}} \ge 0
$$

The equality holds only for reversible processes. This is the **entropy form of the second law**. What follows from it:

- **The arrow of time.** Natural processes run in the direction that increases S\_tot.
- **Spontaneous means irreversible.** A spontaneous process has ΔS\_tot > 0. A reversible process has ΔS\_tot = 0 and is spontaneous in neither direction: it is a sequence of equilibrium states.
- **Equilibrium.** An isolated system stops changing when its S has reached a maximum.
- **Local decreases are allowed.** A system's own entropy *can* fall, provided the surroundings gain more. Water freezing in a freezer is an example (section 20).

## 11. The thermodynamic definition of entropy (3A.2(a), slides L4)

Entropy is the state function whose change is the reversible heat divided by the temperature at which that heat is transferred:

$$
\mathrm{d}S = \frac{\text{đ}q_{\text{rev}}}{T} \quad (3\text{A}.1\text{a}) \qquad\qquad \Delta S = \int_i^f \frac{\text{đ}q_{\text{rev}}}{T} \quad (3\text{A}.1\text{b})
$$

Units are J K⁻¹. Entropy is **extensive**: double the sample and you double S. The molar entropy S\_m = S/n (J K⁻¹ mol⁻¹) is intensive.

**Intuition: why heat, and why divide by T?** Atkins's picture is that entropy measures how much energy is spread out in a random way.

- **Only heat counts, not work.** Heating a system makes its molecules jiggle more randomly. Work done by a moving piston pushes the molecules in one direction, which is ordered motion, so it does not add randomness by itself.
- **The same heat matters more when the system is cold.** A sneeze in a silent library is noticed; the same sneeze in a busy street is not. A cold system has little random motion, so a joule of heat changes it a lot. A hot system is already very agitated, so the same joule makes a smaller relative difference. Hence the 1/T. Section 12 makes this precise with microstates.

### The recipe for any process

> To find ΔS for **any** change, including an irreversible one, invent a **reversible** path between the same initial and final states, and integrate đq\_rev/T along it.

This works because S is a state function: ΔS\_sys depends only on the end states. **Never** divide the *actual* heat of an irreversible process by T to get ΔS\_sys. For a free expansion q = 0, yet ΔS\_sys > 0 (section 15).

### Why 1/T is an integrating factor

An **integrating factor** is something you multiply an inexact differential by to make it exact. Here is the check for a perfect gas, using the exactness test from Topic 2D: a differential M dT + N dV is exact when ∂M/∂V = ∂N/∂T.

**Heat is not exact.** For a reversible change đq\_rev = dU − đw\_rev = C\_V dT + p dV, and p = nRT/V, so

$$
\text{đ}q_{\text{rev}} = C_V\,\mathrm{d}T + \frac{nRT}{V}\,\mathrm{d}V \qquad \frac{\partial C_V}{\partial V} = 0 \;\ne\; \frac{\partial}{\partial T}\!\left(\frac{nRT}{V}\right) = \frac{nR}{V}
$$

The test fails, so q depends on the path, as you know from Topic 2A.

**Divide by T and it becomes exact:**

$$
\frac{\text{đ}q_{\text{rev}}}{T} = \frac{C_V}{T}\,\mathrm{d}T + \frac{nR}{V}\,\mathrm{d}V \qquad \frac{\partial}{\partial V}\!\left(\frac{C_V}{T}\right) = 0 = \frac{\partial}{\partial T}\!\left(\frac{nR}{V}\right)
$$

Now it passes, so it is the differential of a function. Integrating (with C\_V constant) gives that function:

$$
S(T,V) = C_V\ln T + nR\ln V + \text{const} \quad\Longrightarrow\quad \Delta S = C_V\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i}
$$

This single formula holds every perfect-gas result in Topic 3B: isothermal expansion (first term zero), heating at constant volume (second term zero), and the composite processes of section 18.

### Entropy change of the surroundings

The surroundings are modelled as a huge reservoir at a fixed temperature T\_sur. Heat entering them changes their internal energy (or their enthalpy, if they are at constant pressure). That is a state function, and the reservoir stays in internal equilibrium. So the reservoir "sees" every transfer as reversible, whatever is happening in the system:

$$
\mathrm{d}S_{\text{sur}} = \frac{\text{đ}q_{\text{sur}}}{T_{\text{sur}}} \quad (3\text{A}.2\text{a}) \qquad\qquad \Delta S_{\text{sur}} = \frac{q_{\text{sur}}}{T_{\text{sur}}} \quad (3\text{A}.2\text{b})
$$

- Use the **actual** heat here. Usually q\_sur = −q: whatever the system loses, the surroundings gain.
- **Adiabatic process:** q\_sur = 0, so ΔS\_sur = 0 (3A.3), whether the process is reversible or not. The fine print: no local hot spots form in the surroundings.
- **Exothermic process:** the surroundings gain heat, so their entropy rises. **Endothermic:** it falls.

### Worked examples

1. **Atkins (Brief illustration 3A.1).** Forming 1.00 mol H₂O(l) from its elements at 298 K releases 286 kJ, so q\_sur = +286 kJ and ΔS\_sur = 286 000/298 = +960 J K⁻¹.
2. **Hand-friendly.** A reaction releases 30 kJ into surroundings at 300 K: ΔS\_sur = 30 000/300 = +100 J K⁻¹. If instead it *absorbed* 6.0 kJ: ΔS\_sur = −6000/300 = −20 J K⁻¹.
3. **Isothermal expansion (Atkins Example 3A.1).** For a perfect gas ΔU = 0, so q\_rev = −w\_rev = nRT ln(V\_f/V\_i). T is constant and comes out of the integral, so ΔS = q\_rev/T = nR ln(V\_f/V\_i). Since pV is constant at fixed T, this is also nR ln(p\_i/p\_f) (Self-test 3A.1).
   - 1.00 mol halves its pressure at 300 K: ΔS = R ln 2 = +5.76 J K⁻¹.
   - 2.00 mol compressed isothermally to one third of its volume: ΔS = 2R ln(1/3) = −2 × 8.314 × 1.10 = −18.3 J K⁻¹. Compression lowers the gas's entropy; the surroundings must gain at least that much.

## 12. The statistical definition: microstates and S = k ln W (3A.2(b), slides L4)

Boltzmann's formula S = k ln W counts the microscopic arrangements behind what we observe. Applied to a gas that doubles its volume, it gives exactly the Clausius result, nR ln 2.

### Macrostates and microstates

- A **macrostate** is what you can measure: p, V, T, or (in the toy model below) *how many* molecules are in the left half of a box.
- A **microstate** is a complete microscopic description: *which particular* molecules are on the left, or which energy level each molecule occupies.
- Many microstates look the same from outside. **W** is the number of microstates that give one macrostate.
- **The basic assumption:** every microstate with the same total energy is equally likely.

### Toy model: four labelled particles (slides)

Four particles A, B, C, D each sit in either the left or the right half of a box. Each has 2 choices, so there are 2⁴ = 16 microstates in all, and each has probability 1/16. Group them by macrostate n\_left:

| n\_left | Microstates (left \| right) | W | Probability |
| --- | --- | --- | --- |
| 4 | ABCD \| none | 1 | 1/16 |
| 3 | ABC\|D, ABD\|C, ACD\|B, BCD\|A | 4 | 4/16 |
| 2 | AB\|CD, AC\|BD, AD\|BC, BC\|AD, BD\|AC, CD\|AB | 6 | 6/16 |
| 1 | A\|BCD, B\|ACD, C\|ABD, D\|ABC | 4 | 4/16 |
| 0 | none \| ABCD | 1 | 1/16 |

In general W is the number of ways to choose which n of the N particles are on the left:

$$
W = \binom{N}{n} = \frac{N!}{n!\,(N-n)!}
$$

The even split is the most likely (6/16). "All on the left" happens 1 time in 16: not rare for four particles.

### Large N: the most probable macrostate wins

- **N = 100:** P(all on the left) = 2⁻¹⁰⁰. By hand, 2¹⁰ = 1024 ≈ 10³, so 2¹⁰⁰ ≈ 10³⁰, and P ≈ 10⁻³⁰. (Exactly, 7.9 × 10⁻³¹.)
- **Width of the peak.** The fraction on the left, n/N, is spread about 1/2 with a width that shrinks like 1/√N (the standard deviation is 1/(2√N)). For N = 10 that is about ±16%; for N = 1000, about ±1.6%; for N = 6 × 10²³, about ±10⁻¹², which is far too small to measure.
- **What "irreversible" means.** A gas never un-mixes, not because mechanics forbids it, but because the un-mixed macrostates are an absurdly small fraction of all microstates. The second law is a **statistical** law that is never seen to fail for macroscopic systems.

### The Boltzmann formula

$$
S = k\ln W \qquad (3\text{A}.4), \qquad k = \frac{R}{N_{\mathrm{A}}} = 1.381\times10^{-23}\ \mathrm{J\,K^{-1}}
$$

**Why a logarithm?** Entropy must be extensive. Put two independent systems side by side. Every microstate of the first can pair with every microstate of the second, so W = W₁W₂. The logarithm turns that product into a sum:

$$
S = k\ln(W_1W_2) = k\ln W_1 + k\ln W_2 = S_1 + S_2
$$

**W = 1 gives S = 0.** A perfect crystal at T = 0 has every molecule in its lowest state, which can happen in only one way. This is the third law (Lecture 5, Atkins 3C).

### Check: doubling the volume gives nR ln 2

A gas of N molecules expands freely into a vacuum, from V to 2V.

1. Each molecule now has twice as many places to be. Think of the volume divided into tiny cells: there are twice as many cells.
2. The molecules move independently, so the number of microstates is multiplied by 2 for each molecule: W\_f/W\_i = 2^N.
3. Therefore

$$
\Delta S = k\ln W_f - k\ln W_i = k\ln\frac{W_f}{W_i} = k\ln 2^N = Nk\ln 2 = nR\ln 2
$$

The last step uses N = nN\_A and N\_A k = R. This is exactly the Clausius answer (section 11): +5.76 J K⁻¹ for 1 mol. Two very different definitions, one counting arrangements and one measuring heat, agree. The same argument for V\_i → V\_f gives W\_f/W\_i = (V\_f/V\_i)^N and so ΔS = nR ln(V\_f/V\_i).

### Atkins's energy-level picture \[mostly beyond slides\]

Atkins counts W as the number of ways to share the molecules among their **energy levels** at a fixed total energy.

- **Expansion.** In a bigger box, the translational energy levels lie closer together (a quantum result, Topic 7D). More levels are within reach at the same energy, so W and S increase (Fig. 3A.5).
- **Heating.** Adding heat lets molecules reach higher levels, so W increases. When the system is cold, few levels are occupied, and the extra energy opens up a large *fraction* of new arrangements. When it is hot, many levels are already occupied, so the same energy makes a smaller fractional difference (Fig. 3A.6). This is the molecular reason for the 1/T in dS = đq\_rev/T.

### Worked example (exam style)

Six labelled molecules move freely between the two halves of a box.

1. How many microstates are there in total? 2⁶ = 64.
2. What is W for the 3–3 split? 6!/(3! 3!) = 720/36 = 20. Its probability is 20/64 ≈ 0.31.
3. What is the probability that all six are on the left? 1/64 ≈ 0.016.
4. What is the entropy difference between the 3–3 macrostate and the all-left macrostate? ΔS = k ln(20/1) = k ln 20 ≈ 3.0k, which is about 4.1 × 10⁻²³ J K⁻¹. That is tiny, because there are only six molecules.

## 13. How the two definitions fit together (framework for I3.2)

The thermodynamic definition (dS = đq\_rev/T) and the statistical one (S = k ln W) describe the same quantity from two sides. One is measured with heat and thermometers; the other is counted from molecular arrangements. Homework I3.2 asks you to discuss this. Below is the framework; section 14A turns it into a model answer with a marking scheme.

|  | Thermodynamic (Clausius) | Statistical (Boltzmann) |
| --- | --- | --- |
| Definition | dS = đq\_rev/T | S = k ln W |
| Built from | measurable heat and temperature | counting microstates |
| Gives | only *changes* ΔS | *absolute* values of S |
| Needs | a reversible path between the states | a molecular model of the system |
| Easy to apply to | the surroundings, real bulk samples | small, idealised systems |
| Why S rises | Clausius inequality, ∮đq/T ≤ 0 | the most probable macrostate wins as N grows |

**Points a good answer covers.**

1. **State both definitions** and say what each symbol means, including what a microstate is.
2. **Show that they agree on a test case.** Isothermal doubling of a perfect gas gives nR ln 2 both ways: from q\_rev/T (section 11) and from W\_f/W\_i = 2^N (section 12).
3. **Explain why heat appears and why 1/T appears**, using the molecular picture. Heat spreads molecules over more energy levels, while work does not. The same heat makes a bigger *fractional* change in W when the system is cold (section 12).
4. **Explain why both definitions predict ΔS\_tot ≥ 0.** Thermodynamically, this follows from the Clausius inequality. Statistically, the system moves to the macrostate with overwhelmingly the most microstates. For large N, "less likely" becomes "never observed".
5. **Say what each one is good for.**
   - Statistics gives absolute entropies and a molecular meaning: dispersal of energy and matter, made precise.
   - Thermodynamics needs no model of molecules. It applies to anything, including the surroundings, which are far too complex for anyone to count W (Atkins's final point in 3A.2).
   - The two meet at T = 0 (W = 1, S = 0; the third law).
6. **\[Beyond the quiz range, optional\]** For a system in contact with a heat bath, the Boltzmann distribution and S = k ln W can be shown to give dS = đq\_rev/T exactly (Atkins 13E). The equality is a theorem, not a coincidence.

Use this as a skeleton: one sentence per point, with the test-case calculation written out, is a solid answer.

## 14. Check your understanding: Topic 3A

Try these before reading on. Answers are in section 23.

**3A-1 (compute).** An engine takes 1200 J per cycle from a reservoir at 600 K and rejects heat to a reservoir at 300 K. (a) What is the most work it could deliver per cycle? (b) It actually delivers 400 J. Find Q\_C and the signed sum Σq/T for one cycle. Is the engine reversible? Is it allowed?

**3A-2 (state and explain).** State the Kelvin–Planck form of the second law. A perfect gas expanding isothermally and reversibly turns all the heat it absorbs into work. Why does this not break the law?

**3A-3 (derive).** 1.00 mol of perfect gas triples its volume at constant temperature. Find ΔS (a) from the Clausius definition, and (b) by counting microstates. Show that the two agree, and give the number.

## 14A. Homework solutions with marking scheme: Topic 3A

Full solutions to the assigned 3A homework, each followed by a marking scheme. Problem statements are taken from Atkins 11e, Focus 3.

**How the marks work.** The schemes follow the style of the course's midsem rubric (`Science-1_M26_Midsem_Rubric.pdf`). Each row is a separate criterion, worth its marks in full or not at all, in steps of 0.5. Equivalent methods and algebraically equivalent answers that are internally consistent earn full credit. Short exercises are out of 5 and problems out of 10. These schemes are written in the rubric's style; they are not the instructor's official marks.

### E3A.4(b): argon expanding three ways (5 marks)

**Problem.** Find ΔS of the system, ΔS\_sur and ΔS\_tot when 2.9 g of argon at 298 K expands from 1.20 dm³ to 4.60 dm³ (i) isothermally and reversibly, (ii) isothermally against p\_ex = 0, and (iii) adiabatically and reversibly.

**Solution.**

1. **Amount.** n = m/M = 2.9 g ÷ 39.95 g mol⁻¹ = 0.0726 mol. Then nR = 0.0726 × 8.3145 = 0.604 J K⁻¹.
2. **Volume ratio.** V\_f/V\_i = 4.60/1.20 = 3.833, and ln 3.833 = 1.344.
3. **(i) Isothermal, reversible.**
   - System: ΔS = nR ln(V\_f/V\_i) = 0.604 × 1.344 = **+0.811 J K⁻¹**.
   - Surroundings: the gas absorbs q\_rev = TΔS = 298 × 0.811 = 242 J from surroundings at 298 K, so ΔS\_sur = −242/298 = **−0.811 J K⁻¹**.
   - Total: **ΔS\_tot = 0**, as for any reversible process.
4. **(ii) Isothermal, against p\_ex = 0 (free expansion).**
   - System: same initial and final states as (i), and S is a state function, so ΔS = **+0.811 J K⁻¹**.
   - Surroundings: p\_ex = 0 gives w = 0. For a perfect gas at constant T, ΔU = 0, so q = ΔU − w = 0. Nothing is exchanged, so **ΔS\_sur = 0**.
   - Total: **ΔS\_tot = +0.811 J K⁻¹ > 0**, so the expansion is irreversible (spontaneous).
5. **(iii) Adiabatic, reversible.**
   - System: q\_rev = 0 at every step, so dS = đq\_rev/T = 0 and **ΔS = 0**.
   - Surroundings: q\_sur = 0, so **ΔS\_sur = 0**. Total: **ΔS\_tot = 0**.
   - Check: the gas cools. For monatomic argon, γ − 1 = 2/3, so T\_f = 298 × (1.20/4.60)^(2/3) = 122 K. Then nR ln(V\_f/V\_i) + nC\_V,m ln(T\_f/T\_i) = 0.811 + 0.0726 × 12.47 × ln(122/298) = 0.811 − 0.811 = 0. The expansion term and the cooling term cancel exactly.

| Path | ΔS (J K⁻¹) | ΔS\_sur (J K⁻¹) | ΔS\_tot (J K⁻¹) |
| --- | --- | --- | --- |
| (i) isothermal reversible | +0.811 | −0.811 | 0 |
| (ii) isothermal, p\_ex = 0 | +0.811 | 0 | +0.811 |
| (iii) adiabatic reversible | 0 | 0 | 0 |

**Marking scheme (5 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| Amount | n = 0.0726 mol from m/M (M = 40 g mol⁻¹ accepted) | 0.5 |
| Formula | states ΔS = nR ln(V\_f/V\_i) for an isothermal perfect-gas expansion | 0.5 |
| (i) system | ΔS = +0.811 J K⁻¹, with units | 0.5 |
| (i) surroundings and total | ΔS\_sur = −0.811 J K⁻¹ and ΔS\_tot = 0, with the reason (q\_rev supplied at the same T) | 1 |
| (ii) system | ΔS unchanged at +0.811 J K⁻¹ because S is a state function | 0.5 |
| (ii) surroundings and total | w = 0 and q = 0, so ΔS\_sur = 0 and ΔS\_tot = +0.811 J K⁻¹ | 0.5 |
| (iii) | ΔS = 0 because q\_rev = 0 (0.5); ΔS\_sur = 0 and ΔS\_tot = 0 (0.5) | 1 |
| Sign check | notes ΔS\_tot ≥ 0, with equality only for the reversible paths | 0.5 |
| **Total** |  | **5** |

**Where marks are usually lost.**

- Writing ΔS = 0 in (ii) "because q = 0". The actual heat is not the reversible heat. This costs the (ii) system mark and makes the total wrong.
- Using −q\_rev/T for the surroundings in (ii). The surroundings use the *actual* heat, which is zero.
- Using nR ln(V\_f/V\_i) in (iii), forgetting that the gas cools and ends in a different state.
- Mass in kg with M in g mol⁻¹, which gives n a thousand times too small.
- Giving a molar ΔS (J K⁻¹ mol⁻¹) when the question asks about this sample.

### P3A.3: a Carnot cycle, stage by stage (10 marks)

**Problem.** 0.10 mol of perfect gas runs a Carnot cycle between a hot source at 373 K and a cold sink at 273 K. The initial volume is 1.00 dm³ and it doubles during the first isothermal stage. On the reversible adiabats take VT^(3/2) = constant. (a) Find the volume after Stage 1 and after Stage 2. (b) Find the volume after Stage 3, using the adiabatic compression that ends at the starting point. (c) Find the heat transferred in each of the four stages. (d) Explain why the work equals the heat taken from the hot source minus the heat put into the cold sink. (e) Find the work over the cycle and the efficiency. (f) Check against eqn 3A.9 (η = 1 − T\_c/T\_h) and eqn 3A.6 (q\_h/T\_h + q\_c/T\_c = 0).

**Set-up.** Atkins's labels: A → B is the hot isotherm, B → C the adiabatic expansion, C → D the cold isotherm, and D → A the adiabatic compression. Heats are signed: q > 0 means heat into the gas. VT^(3/2) = constant is TV^(γ−1) = constant with γ = 5/3 (a monatomic gas).

**Solution.**

(a) **Stage 1** doubles the volume: **V\_B = 2.00 dm³**. **Stage 2** is the adiabat from T\_h to T\_c:

$$
V_\mathrm{B}T_\mathrm{h}^{3/2} = V_\mathrm{C}T_\mathrm{c}^{3/2} \;\Rightarrow\; V_\mathrm{C} = V_\mathrm{B}\left(\frac{T_\mathrm{h}}{T_\mathrm{c}}\right)^{3/2} = 2.00\ \mathrm{dm^3}\times\left(\frac{373}{273}\right)^{3/2}
$$

373/273 = 1.3663, and 1.3663^(3/2) = 1.3663 × √1.3663 = 1.3663 × 1.1689 = 1.5971. So **V\_C = 3.19 dm³**. (The gas cools as it expands, so V\_C > V\_B, as it should be.)

(b) **Stage 4** is the adiabat that ends at A, so it links D at T\_c to A at T\_h:

$$
V_\mathrm{D}T_\mathrm{c}^{3/2} = V_\mathrm{A}T_\mathrm{h}^{3/2} \;\Rightarrow\; V_\mathrm{D} = V_\mathrm{A}\left(\frac{T_\mathrm{h}}{T_\mathrm{c}}\right)^{3/2} = 1.00 \times 1.5971 = 1.60\ \mathrm{dm^3}
$$

That is, **V\_D = 1.60 dm³**. Check: V\_C/V\_D = 3.194/1.597 = 2.00 = V\_B/V\_A, as section 6 says it must be.

(c) **Heat in each stage.** On an isotherm of a perfect gas ΔU = 0, so q = −w = nRT ln(V\_f/V\_i). On a reversible adiabat q = 0.

- **Stage 1 (A → B, 373 K):** q₁ = nRT\_h ln(V\_B/V\_A) = 0.10 mol × 8.3145 J K⁻¹ mol⁻¹ × 373 K × ln 2 = 310.1 J × 0.6931 = **+215 J** (absorbed from the hot source).
- **Stage 2 (B → C):** **q₂ = 0**.
- **Stage 3 (C → D, 273 K):** q₃ = nRT\_c ln(V\_D/V\_C) = 0.10 × 8.3145 × 273 × ln(1/2) = 227.0 J × (−0.6931) = **−157 J** (given out to the cold sink).
- **Stage 4 (D → A):** **q₄ = 0**.

(d) U is a state function and the gas returns to state A, so ΔU = 0 over the cycle. Then q\_cycle + w\_cycle = 0, so the work done *by* the gas is −w\_cycle = q₁ + q₃ = |q\_h| − |q\_c|. The two adiabatic stages exchange work but no heat, and their works cancel: −nC\_V,m(T\_h − T\_c) = −125 J on Stage 2 and +125 J on Stage 4.

(e) Work over the cycle: |w| = 215.0 − 157.3 = **57.6 J** done by the gas. Efficiency: η = |w|/|q\_h| = 57.6/215.0 = **0.268**.

(f) **Eqn 3A.9:** 1 − T\_c/T\_h = 1 − 273/373 = 100/373 = 0.268, which agrees with (e). **Eqn 3A.6:** q\_h/T\_h + q\_c/T\_c = (+215.0 J)/(373 K) + (−157.3 J)/(273 K) = 0.576 − 0.576 = 0 J K⁻¹, which agrees too. Each isotherm moves the same entropy, nR ln 2 = 0.576 J K⁻¹.

**Marking scheme (10 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| (a) | V\_B = 2.00 dm³ (0.5); adiabat set up with T\_h at B and T\_c at C (0.5); V\_C = 3.19 dm³ (0.5) | 1.5 |
| (b) | adiabat written through A, with T\_c at D and T\_h at A (0.5); V\_D = 1.60 dm³ (0.5) | 1 |
| (c) principle | q = nRT ln(V\_f/V\_i) on the isotherms, justified by ΔU = 0 for a perfect gas at constant T | 1 |
| (c) values | q₁ = +215 J (0.5); q₃ = −157 J with the correct sign (1); q = 0 on both adiabats (0.5) | 2 |
| (d) | ΔU = 0 over a cycle because U is a state function, so −w = q\_h + q\_c | 1 |
| (e) | \|w\| = 57.6 J (0.5); η = 0.268 (0.5) | 1 |
| (f) | 1 − T\_c/T\_h = 0.268 matches (0.5); q\_h/T\_h + q\_c/T\_c = 0 shown with numbers (0.5); signed heats used consistently (0.5) | 1.5 |
| Presentation | units on every quantity, temperatures in kelvin, about 3 significant figures | 1 |
| **Total** |  | **10** |

**Where marks are usually lost.**

- Swapping T\_h and T\_c in the adiabat relation, which gives V\_C < V\_B, a gas that heats up as it expands. That costs both (a) and (b).
- Writing the relation as V^(3/2)T = constant instead of VT^(3/2) = constant.
- Reporting q₃ as +157 J "to the gas". The sign is the point of the (c) mark.
- Forming η = q₃/q₁ without moduli, which gives a negative "efficiency".
- In (d), writing only "energy is conserved". The mark needs ΔU = 0 over a cycle *because* U is a state function.

### P3A.5: why a heat pump needs work, and how much (10 marks)

**Problem.** A heat engine can be run as a heat pump: it extracts heat from a cold source, has work done on it, and discards the sum into a hot sink. (a) Assume the engine is perfect and its heat transfers are reversible. Use the second law to explain why heat cannot be extracted from the cold source and discarded into the hot sink unless some work is done on the engine. (b) The hot sink is at T\_h and the cold source at T\_c, and heat |q| is extracted from the cold source. Use the second law to find the work |w| needed so that heat |q| + |w| can be discarded into the hot sink.

**Solution.** Do the entropy bookkeeping for one cycle. The universe here is the engine plus the two reservoirs.

(a)

1. **The engine** runs in a cycle and returns to its initial state. S is a state function, so ΔS\_engine = 0 per cycle.
2. **The cold source** gives up heat |q| at T\_c, so ΔS\_cold = −|q|/T\_c.
3. **The hot sink, if no work is done.** By the first law it receives exactly |q|, so ΔS\_hot = +|q|/T\_h.
4. **Total:**

$$
\Delta S_{\text{tot}} = -\frac{|q|}{T_\mathrm{c}} + \frac{|q|}{T_\mathrm{h}} = |q|\left(\frac{1}{T_\mathrm{h}} - \frac{1}{T_\mathrm{c}}\right) < 0 \quad\text{because } T_\mathrm{h} > T_\mathrm{c}
$$

5. **Conclusion.** The second law requires ΔS\_tot ≥ 0, so this process is impossible. (This is the Clausius statement.) The hot sink takes in entropy at a higher temperature, so the same heat gives it less entropy than the cold source lost. To balance this, the hot sink must receive *more* energy than |q|. By the first law the extra can only come from work done on the engine, so |q| + |w| is discarded.

(b)

1. With work |w| done on the engine, the hot sink receives |q| + |w|:

$$
\Delta S_{\text{tot}} = -\frac{|q|}{T_\mathrm{c}} + \frac{|q| + |w|}{T_\mathrm{h}} \ge 0
$$

2. Rearranging gives

$$
|w| \ge |q|\left(\frac{T_\mathrm{h}}{T_\mathrm{c}} - 1\right) = |q|\,\frac{T_\mathrm{h} - T_\mathrm{c}}{T_\mathrm{c}}
$$

3. For a perfect (reversible) engine the equality holds, ΔS\_tot = 0, so the work needed is **|w| = |q|(T\_h − T\_c)/T\_c**. Any real engine needs more.
4. **Check against section 3.** COP\_fridge = |q|/|w| = T\_c/(T\_h − T\_c), and COP\_heat pump = (|q| + |w|)/|w| = T\_h/(T\_h − T\_c). These are the Carnot limits. As a numerical sense check: to extract 1.00 kJ from 270 K and deliver it to 300 K needs at least 1.00 × 30/270 = 0.111 kJ of work.

**Marking scheme (10 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| (a) engine | the engine returns to its initial state, so ΔS\_engine = 0 per cycle | 1 |
| (a) cold source | ΔS\_cold = −\|q\|/T\_c | 1 |
| (a) hot sink | with no work the hot sink receives \|q\| (first law), so ΔS\_hot = +\|q\|/T\_h | 1 |
| (a) total | ΔS\_tot = \|q\|(1/T\_h − 1/T\_c) < 0 because T\_h > T\_c | 1 |
| (a) conclusion | contradicts ΔS\_tot ≥ 0; work must be supplied so that more energy, and so more entropy, reaches the hot sink | 1 |
| (b) set-up | ΔS\_tot = −\|q\|/T\_c + (\|q\| + \|w\|)/T\_h | 1.5 |
| (b) condition | ΔS\_tot ≥ 0, with equality for the perfect engine | 1 |
| (b) result | \|w\| = \|q\|(T\_h − T\_c)/T\_c (and ≥ for a real engine) | 1.5 |
| (b) check | links to COP = T\_c/(T\_h − T\_c), or gives a numerical sense check | 1 |
| **Total** |  | **10** |

**Where marks are usually lost.**

- Quoting the COP formula without deriving it. The question says "use the Second Law", so (b) set-up and condition carry 2.5 of the marks.
- Putting |q| instead of |q| + |w| into the hot sink in (b).
- Giving the engine a non-zero entropy change. It runs in a cycle.
- Inverting the result to |w| = |q| T\_c/(T\_h − T\_c). Sense check: the work must vanish as T\_h → T\_c.
- Answering (a) with "heat can't flow from cold to hot" alone. Without the entropy argument, or the Clausius statement plus why work fixes it, this earns at most 2 of the 5 marks for (a).

### I3.2: the thermodynamic and statistical definitions of entropy (10 marks)

**Problem.** Discuss the relation between the thermodynamic and statistical definitions of entropy.

**Model answer** (about 330 words, a full answer for a long exam question):

> **Thermodynamic definition.** Clausius defined the entropy change through measurable quantities: dS = đq\_rev/T, where đq\_rev is heat transferred along a reversible path and T is the absolute temperature at which it is transferred. Analysis of the Carnot cycle shows that ∮đq\_rev/T = 0 for every reversible cycle, so S is a state function, and ΔS between two states can be found from any reversible path between them. This definition gives only *changes* in entropy.
>
> **Statistical definition.** Boltzmann defined S = k ln W, where W is the number of microstates (ways of distributing the molecules over their energy states) that are consistent with the macroscopic state at a given total energy. This gives *absolute* entropies. A perfect crystal at T = 0 has W = 1, so S = 0. The logarithm makes S extensive: for independent subsystems W = W₁W₂, so S = S₁ + S₂.
>
> **They agree.** Consider n mol of perfect gas expanding isothermally from V to 2V. Thermodynamically, ΔU = 0, so q\_rev = nRT ln 2 and ΔS = nR ln 2. Statistically, each of the N molecules has twice the volume available, so W\_f/W\_i = 2^N and ΔS = k ln 2^N = Nk ln 2 = nR ln 2, since Nk = nR.
>
> **The statistical view explains the thermodynamic one.** Heat increases random molecular motion and spreads molecules over more energy levels, while work does not; so only heat appears in dS. A given amount of heat produces a larger fractional increase in W in a cold system, where few levels are occupied, than in a hot one: hence the factor 1/T. The second law becomes a statement of probability. For N ≈ 10²³, the macrostate with the most microstates is overwhelmingly likely, so an isolated system moves towards it and ΔS\_tot ≥ 0.
>
> **They are complementary.** The thermodynamic definition needs no molecular model and applies to any system, including surroundings far too complex for W to be counted. The statistical definition needs a model and is practical only for simple systems, but it gives absolute values and a molecular meaning: entropy measures the dispersal of energy and matter.

**Marking scheme (10 marks), by key points.** Other scientifically valid points earn equivalent credit, to a maximum of 10, as in the course rubric's discussion questions.

| Key point | What earns the marks | Marks |
| --- | --- | --- |
| Thermodynamic definition | dS = đq\_rev/T, with "reversible" and "absolute T" stated; gives ΔS only | 1.5 |
| State function | ∮đq\_rev/T = 0 (from the Carnot cycle), so ΔS is path-independent | 1 |
| Statistical definition | S = k ln W, with W defined as the number of microstates at fixed total energy | 1.5 |
| Absolute versus change | statistics gives absolute S (W = 1 gives S = 0); thermodynamics gives only changes | 1 |
| Agreement shown | both routes give nR ln 2 for doubling the volume, with the working shown (1 mark per route) | 2 |
| Molecular meaning | why heat but not work appears, and why 1/T appears | 1 |
| Second law statistically | the most probable macrostate dominates for large N, so ΔS\_tot ≥ 0 | 1 |
| Scope | thermodynamic: no model needed, works for the surroundings; statistical: needs a model, gives absolute values | 1 |
| **Total** |  | **10** |

**Where marks are usually lost.**

- Stating the two formulas and stopping. That earns about 3 of the 10 marks.
- Calling W "work" or "the probability". W is a count of microstates, and the mark needs that definition.
- Writing "entropy is disorder" in place of a definition of microstates.
- Leaving out the worked agreement. It is worth 2 marks and is what turns "they are related" into evidence.
- Claiming that the thermodynamic definition gives absolute entropies.

## 15. 3B.1 Entropy change on expansion (slides L4)

For any isothermal expansion of a perfect gas, reversible or not, ΔS\_sys = nR ln(V\_f/V\_i). What changes from one way of expanding to another is ΔS\_sur, and so ΔS\_tot.

**Intuition.** The gas ends in the same state whichever way it expands, so its entropy change is the same. Only the surroundings can tell a careful reversible expansion from a sudden one: in the reversible case they hand over heat, and in a free expansion they do nothing at all.

**The system.** From section 11:

$$
\Delta S_{\text{sys}} = nR\ln\frac{V_f}{V_i} = nR\ln\frac{p_i}{p_f} \qquad (3\text{B}.2)
$$

The dependence is logarithmic (Atkins Fig. 3B.1). Every doubling adds R ln 2 = 5.76 J K⁻¹ per mole, whatever the starting volume. A tenfold expansion adds R ln 10 = 19.1 J K⁻¹ mol⁻¹.

**The surroundings, case by case.** Use ΔS\_sur = q\_sur/T with the *actual* heat, and q\_sur = −q.

1. **Reversible isothermal.** ΔU = 0, so the gas absorbs q = nRT ln(V\_f/V\_i) from the surroundings. Then

$$
\Delta S_{\text{sur}} = -\frac{q_{\text{rev}}}{T} = -nR\ln\frac{V_f}{V_i} \quad (3\text{B}.3\text{a}) \qquad \Rightarrow \qquad \Delta S_{\text{tot}} = 0
$$

2. **Free expansion into a vacuum (p\_ex = 0).** No work is done (w = 0). The process is isothermal for a perfect gas, so ΔU = 0 and q = 0. Then q\_sur = 0 and ΔS\_sur = 0, so

$$
\Delta S_{\text{tot}} = nR\ln\frac{V_f}{V_i} > 0 \qquad (3\text{B}.3\text{b})
$$

3. **Isothermal, against a constant external pressure equal to the final pressure \[beyond slides; Atkins P3A.1-type\].** The work is w = −p\_f(V\_f − V\_i). For a doubling, V\_f − V\_i = V\_f/2 and p\_fV\_f = nRT, so w = −nRT/2 and q = +nRT/2. Then ΔS\_sur = −nR/2, and ΔS\_tot = nR(ln 2 − 1/2) = 0.19 nR > 0.
4. **Reversible adiabatic.** q = 0, so ΔS\_sys = 0 and ΔS\_sur = 0. The gas still expands, but it also cools. The volume term +nR ln(V\_f/V\_i) is cancelled exactly by the temperature term C\_V ln(T\_f/T\_i). (Setting their sum to zero gives TV^(γ−1) = constant: the adiabat relation again.) A reversible adiabatic process is **isentropic**.

### Worked example: 1.00 mol doubles its volume at 300 K

The slides' table, extended with cases 3 and 4. Use R ln 2 = 5.76 J K⁻¹ and RT = 2494 J.

| Process | q into gas (J) | ΔS\_sys (J K⁻¹) | ΔS\_sur (J K⁻¹) | ΔS\_tot (J K⁻¹) |
| --- | --- | --- | --- | --- |
| Reversible isothermal | +1729 | +5.76 | −5.76 | 0 |
| Isothermal against p\_ex = p\_f \[beyond slides\] | +1247 | +5.76 | −4.16 | +1.61 |
| Free expansion (p\_ex = 0) | 0 | +5.76 | 0 | +5.76 |
| Reversible adiabatic (ends colder, so a different final state) | 0 | 0 | 0 | 0 |

Read it top to bottom for the first three rows. The less work the gas does, the less heat it takes from the surroundings and the larger ΔS\_tot. The reversible path is the one that wastes nothing, so ΔS\_tot = 0.

**A compression example.** 1.00 mol is compressed reversibly and isothermally at 300 K from 10 L to 1 L. Then ΔS\_sys = −R ln 10 = −19.1 J K⁻¹. The gas gives out heat q = −RT ln 10 ≈ −5.7 kJ, so ΔS\_sur = +19.1 J K⁻¹ and ΔS\_tot = 0. The system's entropy fell, which is perfectly allowed.

## 16. 3B.2 Phase transitions and Trouton's rule (slides L4)

At the transition temperature, Δ\_trs S = Δ\_trs H/T\_trs. Melting and boiling raise the entropy; freezing and condensing lower it. Many liquids have Δ\_vap S ≈ 85 J K⁻¹ mol⁻¹ at their normal boiling point (Trouton's rule).

**Intuition.** At the normal transition temperature T\_trs, the two phases are in equilibrium at 1 atm: ice with water at 273 K, water with steam at 373 K. Add a little heat and some solid melts; remove a little and some liquid freezes. The temperature does not move, and the direction can be reversed by an infinitesimal change. So **heat transferred at T\_trs is reversible heat**, and the entropy definition can be used directly.

**Derivation.**

1. The temperature is constant at T\_trs, so it comes out of the integral: ΔS = q\_rev/T\_trs.
2. At constant pressure the heat equals the enthalpy change, so q\_rev = Δ\_trs H.
3. Therefore

$$
\Delta_{\text{trs}}S = \frac{\Delta_{\text{trs}}H}{T_{\text{trs}}} \qquad \text{(at } T_{\text{trs}}\text{ only)} \qquad (3\text{B}.4)
$$

Δ\_trs H is per mole, so Δ\_trs S is a molar quantity too.

**Signs, and the total.**

- **Endothermic transitions** (melting, vaporisation): Δ\_trs S > 0. Matter becomes more dispersed.
- **Exothermic transitions** (freezing, condensation): Δ\_trs S < 0.
- **The surroundings** supply or receive the same heat at the same temperature, so ΔS\_sur = −Δ\_trs H/T\_trs. At T\_trs, ΔS\_tot = 0, as it must be for two phases at equilibrium. Away from T\_trs the formula does not apply: see section 18.

### Slide examples: melting ice and boiling water

$$
\Delta_{\text{fus}}S(\mathrm{H_2O}) = \frac{6010\ \mathrm{J\,mol^{-1}}}{273.15\ \mathrm{K}} \approx 22.0\ \mathrm{J\,K^{-1}\,mol^{-1}} \qquad \Delta_{\text{vap}}S(\mathrm{H_2O}) = \frac{40\,700\ \mathrm{J\,mol^{-1}}}{373.15\ \mathrm{K}} \approx 109\ \mathrm{J\,K^{-1}\,mol^{-1}}
$$

**Vaporisation is far larger than fusion.** Melting loosens a structure, but the molecules stay packed together. Boiling spreads them into a volume about a thousand times larger, so they have vastly more arrangements available.

### Trouton's rule

> Many liquids have Δ\_vap S ≈ 85 J K⁻¹ mol⁻¹ at their normal boiling point.

- **Why it works (Atkins).** Boiling at 1 atm turns roughly the same small volume of liquid into roughly the same large volume of gas, whatever the liquid. So the gain in dispersal, and hence Δ\_vap S, is similar.
- **Use it to estimate:** Δ\_vap H ≈ (85 J K⁻¹ mol⁻¹) × T\_b.
- **Water is higher (109).** Hydrogen bonds hold liquid water in a partly ordered structure, so boiling releases more order than usual. Other hydrogen-bonded liquids deviate the same way.
- **\[Beyond slides\]** Methane is lower (73 J K⁻¹ mol⁻¹). A light molecule with a small moment of inertia has fewer accessible translational and rotational states, so its gas has a lower entropy than usual. Liquids that deviate are the ones with unusual structure in the liquid or the gas.

### Worked examples

1. **Trouton estimate.** A non-hydrogen-bonded liquid boils at 400 K. Then Δ\_vap H ≈ 85 × 400 = 34 000 J mol⁻¹ = 34 kJ mol⁻¹.
2. **Atkins (Brief illustration 3B.2).** Bromine boils at 59.2 °C = 332.4 K, so Δ\_vap H ≈ 332.4 × 85 ≈ 28 kJ mol⁻¹. The experimental value is 29.45 kJ mol⁻¹.
3. **Checking a liquid against the rule.** Benzene has Δ\_vap H = 30.8 kJ mol⁻¹ at its boiling point, 353 K. Then Δ\_vap S = 30 800/353 ≈ 87 J K⁻¹ mol⁻¹, so benzene obeys Trouton's rule.
4. **Freezing at the melting point.** Benzene melts at 279 K with Δ\_fus S = 38.0 J K⁻¹ mol⁻¹ (Atkins Table 3B.1). Then Δ\_fus H = 38.0 × 279 ≈ 10.6 kJ mol⁻¹. When 2.0 mol freezes at 279 K: ΔS\_sys = −2.0 × 38.0 = −76 J K⁻¹, ΔS\_sur = +76 J K⁻¹, and ΔS\_tot = 0.

## 17. 3B.3 Heating at constant pressure and constant volume (slides L4)

Heating from T\_i to T\_f gives ΔS = ∫C dT/T, which is C ln(T\_f/T\_i) when C is constant. Use C\_p at constant pressure and C\_V at constant volume.

**Intuition.** Picture heating as a long line of reservoirs, each only dT hotter than the last. The sample touches each in turn, so every small bit of heat crosses an infinitesimal temperature gap and is transferred reversibly. A bit of heat C dT taken in at temperature T adds C dT/T to the entropy. The early bits, taken in while the sample is cold, count for more.

**Derivation.**

1. Start from the definition (3B.5):

$$
S(T_f) = S(T_i) + \int_{T_i}^{T_f} \frac{\text{đ}q_{\text{rev}}}{T}
$$

2. At constant pressure, đq\_rev = dH, and C\_p = (∂H/∂T)\_p (Topic 2B), so đq\_rev = C\_p dT.
3. Substitute (3B.6), then take C\_p out of the integral if it is constant over the range (3B.7):

$$
S(T_f) = S(T_i) + \int_{T_i}^{T_f} \frac{C_p\,\mathrm{d}T}{T} = S(T_i) + C_p\ln\frac{T_f}{T_i}
$$

4. At constant volume, đq\_rev = dU = C\_V dT, giving the same result with C\_V in place of C\_p.

**Picture.** ΔS is the **area under a plot of C/T against T**, between T\_i and T\_f (slides).

**\[Beyond slides\]** If the heat capacity varies, as in C\_p,m = a + bT, integrate term by term: ΔS\_m = a ln(T\_f/T\_i) + b(T\_f − T\_i). Atkins problems P3B.3 and P3B.4 are of this kind.

### Worked examples

1. **Slides: 1.00 kg of water, 20 °C → 80 °C.** C\_p = 4180 J K⁻¹ for 1 kg. ΔS = 4180 ln(353.15/293.15). By hand, ln(1.205) ≈ 0.186, so ΔS ≈ 4180 × 0.186 ≈ +778 J K⁻¹.
2. **Atkins (Brief illustration 3B.3).** Water with C\_m = 75.3 J K⁻¹ mol⁻¹, 293 K → 323 K: ΔS\_m = 75.3 ln(323/293) = +7.34 J K⁻¹ mol⁻¹.
3. **Constant p versus constant V.** 1.00 mol of a monatomic perfect gas is heated from 300 K to 600 K.
   - At constant V: ΔS = C\_V,m ln 2 = (3/2)R ln 2 = 1.5 × 5.76 = +8.64 J K⁻¹.
   - At constant p: ΔS = C\_p,m ln 2 = (5/2)R ln 2 = 2.5 × 5.76 = +14.4 J K⁻¹.
   - The difference is R ln 2 = 5.76 J K⁻¹. At constant p the volume doubles as T doubles. So constant-pressure heating is the same as constant-volume heating followed by an isothermal doubling of the volume: 8.64 + 5.76 = 14.4. (Here C\_p,m − C\_V,m = R.)

### Is the heating reversible? Look at the surroundings

The system's ΔS is the same however you heat it. ΔS\_tot is not.

Heat the gas of example 3 at constant V by putting it straight into contact with **one** reservoir at 600 K. The heat is q = C\_V ΔT = 1.5 × 8.314 × 300 = 3741 J.

| Heating method | ΔS\_sys (J K⁻¹) | ΔS\_sur (J K⁻¹) | ΔS\_tot (J K⁻¹) |
| --- | --- | --- | --- |
| One reservoir at 600 K (finite ΔT, irreversible) | +8.64 | −3741/600 = −6.24 | +2.40 |
| A series of reservoirs, each dT hotter (reversible) | +8.64 | −8.64 | 0 |

The single reservoir gives up its heat at the highest temperature, 600 K, so it loses less entropy than the gas gains. That difference is the entropy *created* by heat crossing a finite temperature gap.

## 18. 3B.4 Composite processes \[beyond slides\]

When several things change at once, split the change into simple reversible steps and add their ΔS values. This is allowed because S is a state function, so any path between the same end states gives the same ΔS.

**Intuition.** You are not obliged to follow what the gas actually did. You only need *some* reversible route from the start state to the end state that you can calculate. The usual choice for a perfect gas is to change V at constant T, then change T at constant V.

**The general perfect-gas result** (the integrated form from section 11):

$$
\Delta S = nR\ln\frac{V_f}{V_i} + nC_{V,\mathrm{m}}\ln\frac{T_f}{T_i}
$$

The order of the steps does not matter: expand first and then heat, or heat first and then expand. You get the same total either way.

### Worked example: Atkins Example 3B.1 (argon expanded and heated)

Argon at 25 °C (298 K) and 1.00 bar in 0.500 dm³ expands to 1.000 dm³ while being heated to 100 °C (373 K). Take C\_V,m = (3/2)R. Find ΔS.

1. **Amount of gas.** n = p\_iV\_i/RT\_i = (1.00 × 10⁵ Pa)(0.500 × 10⁻³ m³)/(8.3145 × 298) = 50.0/2478 = 0.0202 mol.
   - *Shortcut:* you only ever need nR = p\_iV\_i/T\_i = 50.0/298 = 0.168 J K⁻¹, so you can skip finding n.
2. **Step 1: isothermal expansion at 298 K, 0.500 → 1.000 dm³.** ΔS₁ = nR ln 2 = 0.168 × 0.693 = +0.116 J K⁻¹.
3. **Step 2: heating at constant volume (1.000 dm³), 298 → 373 K.** ΔS₂ = n(3/2)R ln(373/298) = 1.5 × 0.168 × ln 1.25. By hand, ln 1.25 ≈ 0.223, giving +0.056 J K⁻¹. (More exactly 0.0565.)
4. **Total.** ΔS = 0.116 + 0.056 = +0.173 J K⁻¹.

**Atkins's self-test, same method.** The same initial sample is compressed to 0.0500 dm³ and cooled to −25 °C (248 K). Then ΔS = 0.168 × ln(0.1) + 1.5 × 0.168 × ln(248/298) = 0.168 × (−2.303) + 0.252 × (−0.184) = −0.386 − 0.046 = −0.43 J K⁻¹.

### Worked example: freezing away from the transition temperature

Supercooled liquid water at −10 °C (263 K) freezes suddenly to ice at −10 °C. Is this spontaneous? Use C\_p,m(l) = 75.3 and C\_p,m(s) = 37.6 J K⁻¹ mol⁻¹, and Δ\_fus H = 6.01 kJ mol⁻¹ at 273 K (the Atkins data in E3B.7(a)).

**Why not just −Δ\_fus H/T?** At 263 K the liquid and solid are *not* in equilibrium. The freezing is sudden and irreversible, so its heat is not q\_rev and Δ\_trs H/T\_trs does not apply. Instead, build a reversible path through 273 K, where the two phases *are* in equilibrium.

**System: three reversible steps** (per mole, with ln(273/263) ≈ 10/268 ≈ 0.0373).

| Step | ΔS (J K⁻¹ mol⁻¹) | ΔH (J mol⁻¹) |
| --- | --- | --- |
| 1. Warm the liquid, 263 → 273 K | 75.3 × 0.0373 = +2.81 | 75.3 × 10 = +753 |
| 2. Freeze reversibly at 273.15 K | −6010/273.15 = −22.00 | −6010 |
| 3. Cool the ice, 273 → 263 K | 37.6 × (−0.0373) = −1.40 | 37.6 × (−10) = −376 |
| Total (freezing at 263 K) | ΔS\_sys = −20.6 | ΔH = −5633 |

**Surroundings.** They are at 263 K and receive the *actual* heat released at 263 K, q\_sur = −ΔH = +5633 J mol⁻¹. This ΔH(263 K) also comes from the same three-step path, because H is a state function too. It is the Kirchhoff's-law correction from Topic 2C. So ΔS\_sur = 5633/263 = +21.4 J K⁻¹ mol⁻¹.

**Total.** ΔS\_tot = −20.6 + 21.4 = **+0.8 J K⁻¹ mol⁻¹ > 0**, so the freezing is spontaneous.

**What to take from this.**

- The water's entropy falls, because ice is more ordered. But the surroundings are *colder* than 273 K, so the heat they receive raises their entropy by more than the water loses.
- At exactly 0 °C the two terms cancel (ΔS\_tot = 0, equilibrium).
- Above 0 °C the balance tips the other way. Homework P3B.2 asks you to show this at +5 °C (full solution in section 22).
- This matches the slides' concept check: water freezing in a freezer has ΔS\_water < 0 but ΔS\_univ > 0.

## 19. Slide examples: irreversible heat flow, mixing water, melting ice (slides L4)

Every spontaneous process the slides analyse ends with ΔS\_tot > 0, and its reverse would give ΔS\_tot < 0. These three examples are the commonest short exam calculations.

### Heat flow from hot to cold

Heat Q flows from a large body at T\_H to a large body at T\_C. Both are big enough that their temperatures stay fixed, so each behaves as a reservoir and its ΔS is just (heat in)/T.

$$
\Delta S_{\text{tot}} = -\frac{Q}{T_{\mathrm{H}}} + \frac{Q}{T_{\mathrm{C}}} = Q\left(\frac{1}{T_{\mathrm{C}}} - \frac{1}{T_{\mathrm{H}}}\right) > 0 \quad \text{whenever } T_{\mathrm{H}} > T_{\mathrm{C}}
$$

- **Why positive.** The same Q is divided by a smaller T when it enters the cold body, so the cold body gains more entropy than the hot body loses.
- **The reverse is forbidden.** Heat flowing from cold to hot would make ΔS\_tot negative. That is the Clausius statement, now in entropy language.
- **Atkins's version.** He reaches the same result from the Clausius inequality: dS ≥ −|đq|/T\_h + |đq|/T\_c > 0 (Fig. 3A.13).

**Example (slides).** 1000 J flows from 400 K to 300 K. By hand, 1/300 − 1/400 = (400 − 300)/(300 × 400) = 1/1200. So ΔS\_tot = 1000/1200 ≈ +0.83 J K⁻¹.

### Mixing hot and cold water

1.00 kg of water at 80 °C is mixed with 1.00 kg at 20 °C in an insulated flask. Use C\_p = 4180 J K⁻¹ for each kilogram.

1. **Final temperature from the first law.** No heat leaves the flask, so the heat lost by the hot water equals the heat gained by the cold water. With equal masses and the same heat capacity, T\_f is the average: 50 °C = 323.15 K.
2. **ΔS of each part** (each is heated or cooled; use C ln(T\_f/T\_i)):
   - hot water: 4180 ln(323.15/353.15) = −371 J K⁻¹
   - cold water: 4180 ln(323.15/293.15) = +407 J K⁻¹
3. **Total.** ΔS = −371 + 407 ≈ **+36 J K⁻¹**. The flask is insulated, so ΔS\_sur = 0 and this is ΔS\_tot.

**A no-calculator trick.** Combine the logarithms: ΔS = C ln\[T\_f²/(T\_H T\_C)\]. With T\_f = (T\_H + T\_C)/2, the difference T\_f² − T\_H T\_C equals \[(T\_H − T\_C)/2\]² = 30² = 900 K². Then

$$
\Delta S = C\ln\!\left(1 + \frac{900}{353.15\times293.15}\right) \approx 4180\times\frac{900}{1.035\times10^{5}} \approx 4180\times0.0087 \approx 36\ \mathrm{J\,K^{-1}}
$$

This also proves the sign. The arithmetic mean of two numbers is never smaller than their geometric mean, so T\_f² ≥ T\_H T\_C, and mixing always gives ΔS > 0.

**The general method for "two bodies reach equilibrium"** (also Atkins E3B.5 and P3B.5):

1. Find T\_f from energy conservation: Σ C\_i(T\_f − T\_i) = 0.
2. Find each body's ΔS = C\_i ln(T\_f/T\_i).
3. Add them. The sum must come out positive; if it doesn't, check your arithmetic.

### Melting ice and boiling water

The slide values, Δ\_fus S = 22.0 and Δ\_vap S = 109 J K⁻¹ mol⁻¹, are worked in section 16. Those are for the reversible transition at T\_trs, where ΔS\_tot = 0. Here is the irreversible version.

**Ice melting in a warm room.** 1.00 mol of ice at 0 °C melts in a room at 20 °C (293 K).

- The ice melts at 273 K, so ΔS\_sys = +6010/273.15 = +22.0 J K⁻¹. (The system's change is fixed by its end states, as always.)
- The room supplies the 6010 J at 293 K: ΔS\_sur = −6010/293.15 = −20.5 J K⁻¹.
- ΔS\_tot = +1.5 J K⁻¹ > 0. The melting is spontaneous, because heat crosses a finite 20 K gap.

## 20. Entropy versus "disorder" (slides L4)

"Entropy = disorder" is a useful first picture, but it can mislead. The reliable statement is: entropy counts the microscopic ways to realise what we observe, which means it measures how spread out energy and matter are.

### When the disorder picture helps

- A gas spreading into a larger volume, two gases mixing, a solid melting: each gives more arrangements, so there is "more disorder" and S rises.
- It explains why Δ\_vap S ≫ Δ\_fus S. A gas is far more "disordered" than a liquid, while a liquid is only somewhat less ordered than a solid.

### When it misleads (slides)

1. **A shuffled deck of cards** looks "messier" than a sorted one, but its thermodynamic entropy is the same. The order of 52 cards is one arrangement among a handful of macroscopic objects. It is not a count over \~10²³ molecules and their energy levels, and it involves no heat. Everyday "tidiness" is not thermodynamic entropy.
2. **A supercooled liquid crystallises spontaneously.** The crystal is *more* ordered, so S\_sys falls. The process still happens because the heat released raises S\_sur by more (section 18: −20.6 + 21.4 > 0).
3. **Living things** build highly ordered structures. They do it by taking in energy and exporting more entropy to their surroundings, as heat and waste.
4. **A refrigerator** lowers the entropy of its contents, at the cost of a larger rise outside (it dumps Q\_H = Q\_C + W into the kitchen).

### Why the picture fails: it forgets two things

- **It forgets the surroundings.** The second law is about ΔS\_tot. A local decrease in entropy is fine whenever the surroundings gain more.
- **It forgets energy.** "Disorder" suggests looking at positions only. But S also counts how energy is shared among energy levels (Atkins's dispersal of energy). Heat released into the surroundings spreads energy over many more molecules. That counts even when nothing visibly becomes "messier".

> **Key point (slides).** Local decreases in entropy are allowed. Only ΔS\_universe ≥ 0 is required.

### Concept check from the slides

Water freezes in a freezer. What are the signs?

**Answer: ΔS\_water < 0 and ΔS\_univ > 0.** The water becomes ordered ice, so its entropy falls. The heat released, plus the freezer's electrical work, leaves through the back and raises the entropy of the kitchen by more. The universe still gains entropy.

## 21. Check your understanding: Topic 3B

Answers are in section 23.

**3B-1 (compute).** 2.00 mol of a perfect gas expands isothermally at 300 K from 5.0 L to 20.0 L. Find ΔS\_sys, ΔS\_sur and ΔS\_tot (a) for a reversible expansion and (b) for a free expansion into a vacuum.

**3B-2 (estimate).** A liquid with no hydrogen bonding boils at 250 K at 1 atm. Estimate its Δ\_vap H. Then give ΔS\_sys, ΔS\_sur and ΔS\_tot when 1 mol boils at 250 K.

**3B-3 (compute and explain).** Two identical copper blocks, each with heat capacity C = 385 J K⁻¹, one at 400 K and one at 200 K, are put in contact inside an insulated box. Find the final temperature and ΔS\_tot, without a calculator. Explain why the sign must be positive.

## 22. Homework solutions with marking scheme: Topic 3B

Full solutions to the assigned 3B homework, marked in the same rubric style as section 14A: whole marks per criterion, in steps of 0.5, with equivalent methods accepted.

### Example 3B.1: argon expanded and heated (5 marks)

**Problem.** Argon at 25 °C (298 K) and 1.00 bar in 0.500 dm³ expands to 1.000 dm³ and is heated to 100 °C (373 K). Take C\_V,m = (3/2)R. Find ΔS.

**Solution.** This is worked step by step in section 18; here is the condensed version.

1. **Amount.** n = p\_iV\_i/RT\_i = (1.00 × 10⁵ Pa)(0.500 × 10⁻³ m³)/(8.3145 J K⁻¹ mol⁻¹ × 298 K) = 0.0202 mol, so nR = 0.168 J K⁻¹.
2. **Path.** S is a state function, so replace the real process with (1) isothermal expansion at 298 K, then (2) heating at constant volume (1.000 dm³) to 373 K.
3. **Step 1.** ΔS₁ = nR ln(V\_f/V\_i) = 0.168 × ln 2 = +0.116 J K⁻¹.
4. **Step 2.** ΔS₂ = nC\_V,m ln(T\_f/T\_i) = 1.5 × 0.168 × ln(373/298) = 0.252 × 0.2245 = +0.0565 J K⁻¹.
5. **Total.** ΔS = 0.116 + 0.0565 = **+0.173 J K⁻¹**.

**Marking scheme (5 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| Amount | n = 0.0202 mol (or nR = p\_iV\_i/T\_i = 0.168 J K⁻¹), SI units used | 1 |
| Path | splits into isothermal expansion plus constant-volume heating, justified by S being a state function | 1 |
| Step 1 | nR ln 2 = +0.116 J K⁻¹ | 1 |
| Step 2 | uses C\_V (not C\_p) at constant volume: +0.0565 J K⁻¹ | 1 |
| Total | +0.173 J K⁻¹, with units | 1 |
| **Total** |  | **5** |

**Where marks are usually lost.** Using C\_p in step 2 gives 0.094 J K⁻¹ and a total of 0.210 J K⁻¹. Putting dm³ with Pa makes n a thousand times too large. Using Celsius in ln(T\_f/T\_i) gives ln(100/25), which is nonsense.

### P3B.2: water at 5.0 °C does not freeze (10 marks)

**Problem.** Show that liquid water at 5.0 °C freezing to ice at the same temperature is not spontaneous, by calculating the total entropy change. Data from Exercise E3B.7(a): C\_p,m(H₂O, s) = 37.6 J K⁻¹ mol⁻¹, C\_p,m(H₂O, l) = 75.3 J K⁻¹ mol⁻¹, Δ\_fus H = 6.01 kJ mol⁻¹ at the normal freezing point (273.15 K).

**Basis.** 1 mol of water at constant pressure; the surroundings are at T = 278.15 K.

**Why a three-step path is needed.** At 278.15 K liquid and solid are not in equilibrium, so freezing there would be irreversible. Its heat is not q\_rev, and Δ\_fus H/T cannot be used. Instead go reversibly through 273.15 K, where the phases *are* in equilibrium. By hand, ln(273.15/278.15) = −0.01814 (≈ −5/275.65).

**System.**

| Step | ΔS (J K⁻¹ mol⁻¹) | ΔH (J mol⁻¹) |
| --- | --- | --- |
| 1. Cool the liquid, 278.15 → 273.15 K | 75.3 × ln(273.15/278.15) = 75.3 × (−0.01814) = −1.366 | 75.3 × (−5.0) = −376.5 |
| 2. Freeze at 273.15 K | −6010/273.15 = −22.003 | −6010 |
| 3. Warm the ice, 273.15 → 278.15 K | 37.6 × (+0.01814) = +0.682 | 37.6 × (+5.0) = +188.0 |
| Total (freezing at 278.15 K) | **ΔS\_sys = −22.687** | **ΔH = −6198.5** |

**Surroundings.** The surroundings are at 278.15 K and receive the actual heat released, q\_sur = −ΔH = +6198.5 J mol⁻¹. This ΔH at 278 K comes from the same path, because H is a state function too (Kirchhoff's law). So

$$
\Delta S_{\text{sur}} = \frac{q_{\text{sur}}}{T} = \frac{+6198.5\ \mathrm{J\,mol^{-1}}}{278.15\ \mathrm{K}} = +22.285\ \mathrm{J\,K^{-1}\,mol^{-1}}
$$

**Total.**

$$
\Delta S_{\text{tot}} = -22.687 + 22.285 = -0.40\ \mathrm{J\,K^{-1}\,mol^{-1}} < 0
$$

So freezing at 5.0 °C is **not spontaneous**. The reverse process, ice melting at 5.0 °C, has ΔS\_tot = +0.40 J K⁻¹ mol⁻¹ and is spontaneous.

**Cross-check.** Ignore the small heat-capacity steps: ΔS\_tot ≈ Δ\_fus H(1/T − 1/T\_f) = 6010 × (1/278.15 − 1/273.15) = −0.396 J K⁻¹ mol⁻¹. Same sign and nearly the same size. The two big terms cancel to within 2%, so keep four significant figures until the end.

**Marking scheme (10 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| Principle | ΔS\_tot = ΔS\_sys + ΔS\_sur, and the process is spontaneous only if ΔS\_tot > 0 | 1 |
| Path | explains why Δ\_fus H/T can't be used at 278 K and sets up the three-step reversible path via 273.15 K | 1.5 |
| Step 1 | C\_p,m(l) ln(273.15/278.15) = −1.37 J K⁻¹ mol⁻¹ | 1 |
| Step 2 | −Δ\_fus H/T\_f = −22.00 J K⁻¹ mol⁻¹ | 1 |
| Step 3 | C\_p,m(s) ln(278.15/273.15) = +0.68 J K⁻¹ mol⁻¹ | 1 |
| ΔS\_sys | sum = −22.69 J K⁻¹ mol⁻¹ | 0.5 |
| ΔH at 278 K | −6.20 kJ mol⁻¹ from the same path | 1 |
| ΔS\_sur | +6198.5/278.15 = +22.28 J K⁻¹ mol⁻¹ | 1 |
| Conclusion | ΔS\_tot = −0.40 J K⁻¹ mol⁻¹ < 0, so not spontaneous (and the reverse is spontaneous) | 1 |
| Precision and units | kelvin in every logarithm, units throughout, at least 4 significant figures in the two large terms | 1 |
| **Total** |  | **10** |

**Where marks are usually lost.**

- Writing ΔS\_sys = −Δ\_fus H/278 = −21.61 and ΔS\_sur = +21.61, so ΔS\_tot = 0. This loses the path, step and conclusion marks.
- Using 6010 J instead of ΔH(278 K) = 6198.5 J for the surroundings. This gives ΔS\_tot = −1.08 J K⁻¹ mol⁻¹: right sign, wrong value. It loses the ΔH and ΔS\_sur marks.
- Swapping the two heat capacities (using C\_p of ice to cool the liquid).
- Rounding to 3 significant figures too early. The answer is the small difference of two numbers near 22.
- Celsius in the logarithms.

### P3B.10: the Otto cycle (10 marks)

**Problem.** The Otto cycle has four steps:

1. reversible adiabatic compression, A → B;
2. reversible pressure rise at constant volume, B → C (combustion);
3. reversible adiabatic expansion, C → D;
4. reversible pressure fall at constant volume, D → A.

The working substance is 1 mol of a diatomic perfect gas with C\_V,m = (5/2)R. On a reversible adiabat V\_AT\_A^c = V\_BT\_B^c, with c = C\_V,m/R, and U depends only on T. (a) Find w and q for each step in terms of C\_V,m and T\_A to T\_D. (b) With η = |work over the cycle| / |heat supplied in step 2|, find η in terms of the temperatures. (c) Show that η = 1 − (V\_B/V\_A)^(1/c), using V\_C = V\_B and V\_D = V\_A. (d) Find ΔS of the system and of the surroundings for each step. (e) With V\_A = 4.00 dm³, p\_A = 1.00 atm, T\_A = 300 K, V\_A = 10V\_B and p\_C/p\_B = 5, evaluate η and the entropy changes.

**Set-up.** For 1 mol of perfect gas ΔU = C\_V,mΔT on *every* step, because U depends only on T. Here C\_V,m = 2.5 × 8.3145 = 20.79 J K⁻¹ mol⁻¹ and c = 5/2, so 1/c = 0.4. The sign convention is ΔU = q + w, with w the work done on the gas.

**(a) Heat and work, step by step.** On an adiabat q = 0, so w = ΔU. At constant volume w = 0, so q = ΔU.

| Step | q | w | Sign |
| --- | --- | --- | --- |
| 1. A → B, adiabatic compression | 0 | C\_V,m(T\_B − T\_A) | w > 0: work done on the gas |
| 2. B → C, constant volume | C\_V,m(T\_C − T\_B) | 0 | q > 0: heat in |
| 3. C → D, adiabatic expansion | 0 | C\_V,m(T\_D − T\_C) | w < 0: work done by the gas |
| 4. D → A, constant volume | C\_V,m(T\_A − T\_D) | 0 | q < 0: heat out |

**(b) Efficiency.** Over the cycle ΔU = 0, so the total work is w = −(q₂ + q₄) = −C\_V,m\[(T\_C − T\_B) − (T\_D − T\_A)\], which is negative (net work out). Then

$$
\eta = \frac{|w|}{|q_2|} = \frac{(T_\mathrm{C} - T_\mathrm{B}) - (T_\mathrm{D} - T_\mathrm{A})}{T_\mathrm{C} - T_\mathrm{B}} = 1 - \frac{T_\mathrm{D} - T_\mathrm{A}}{T_\mathrm{C} - T_\mathrm{B}}
$$

**(c) In terms of volumes.**

1. Adiabat A → B: V\_AT\_A^c = V\_BT\_B^c, so T\_B = T\_A(V\_A/V\_B)^(1/c).
2. Adiabat C → D: V\_CT\_C^c = V\_DT\_D^c. With V\_C = V\_B and V\_D = V\_A, this gives T\_C = T\_D(V\_A/V\_B)^(1/c).
3. Subtract: T\_C − T\_B = (T\_D − T\_A)(V\_A/V\_B)^(1/c).
4. Substitute into (b):

$$
\eta = 1 - \frac{T_\mathrm{D} - T_\mathrm{A}}{(T_\mathrm{D} - T_\mathrm{A})(V_\mathrm{A}/V_\mathrm{B})^{1/c}} = 1 - \left(\frac{V_\mathrm{B}}{V_\mathrm{A}}\right)^{1/c}
$$

Since 1/c = R/C\_V,m = γ − 1 and V\_A/V\_B = r, this is the slides' η = 1 − r^(1−γ) (section 9).

**(d) Entropy changes.**

- **System.** Steps 1 and 3 are reversible and adiabatic, so q\_rev = 0 and ΔS₁ = ΔS₃ = 0. Steps 2 and 4 are reversible heating or cooling at constant volume, so ΔS = ∫C\_V,m dT/T:

$$
\Delta S_2 = C_{V,\mathrm{m}}\ln\frac{T_\mathrm{C}}{T_\mathrm{B}}, \qquad \Delta S_4 = C_{V,\mathrm{m}}\ln\frac{T_\mathrm{A}}{T_\mathrm{D}}
$$

- **Surroundings.** Every step is reversible, so on each one ΔS\_sur = −ΔS\_sys: 0, −C\_V,m ln(T\_C/T\_B), 0, and −C\_V,m ln(T\_A/T\_D). So ΔS\_tot = 0 for each step.
- **Cycle check.** From (c), T\_C/T\_B = T\_D/T\_A, so ΔS₂ + ΔS₄ = C\_V,m ln\[(T\_C/T\_B)(T\_A/T\_D)\] = 0. The system's entropy returns to its starting value, as a state function must.

**(e) Numbers.** (V\_A/V\_B)^(1/c) = 10^0.4 = 2.512.

1. T\_B = T\_A × 10^0.4 = 300 × 2.512 = **754 K**.
2. B → C is at constant volume, so p/T is constant and T\_C = T\_B × (p\_C/p\_B) = 5 × 753.6 = **3768 K**.
3. T\_D = T\_C/10^0.4 = 3768/2.512 = **1500 K**. (Equivalently, T\_D/T\_A = T\_C/T\_B = 5.)
4. Efficiency: η = 1 − 10^(−0.4) = 1 − 0.398 = **0.602**. Check from (b): 1 − (1500 − 300)/(3768 − 754) = 1 − 1200/3014 = 0.602.
5. Entropy, per mole of gas: ΔS₂ = 20.79 × ln(3768/753.6) = 20.79 × ln 5 = 20.79 × 1.609 = +33.5 J K⁻¹. ΔS₄ = 20.79 × ln(300/1500) = −33.5 J K⁻¹.

| Step | ΔS\_sys (J K⁻¹) | ΔS\_sur (J K⁻¹) | ΔS\_tot (J K⁻¹) |
| --- | --- | --- | --- |
| 1. A → B | 0 | 0 | 0 |
| 2. B → C | +33.5 | −33.5 | 0 |
| 3. C → D | 0 | 0 | 0 |
| 4. D → A | −33.5 | +33.5 | 0 |
| Cycle | 0 | 0 | 0 |

**A note on the data.** The problem says 1 mol, but p\_AV\_A/RT\_A = (101 325 Pa × 4.00 × 10⁻³ m³)/(8.3145 × 300 K) = 0.162 mol. The temperatures and η do not depend on n. The entropies scale with n: with n = 0.162 mol they are ±5.44 J K⁻¹. State which amount you use; either is consistent.

**Optional energy check (1 mol).** q₂ = 20.79 × 3014 = +62.7 kJ, q₄ = 20.79 × (−1200) = −24.9 kJ, and w = −(q₂ + q₄) = −37.7 kJ. Then |w|/q₂ = 0.602, which matches.

**Marking scheme (10 marks).**

| Step | What earns the marks | Marks |
| --- | --- | --- |
| (a) | q = 0 on the adiabats and w = 0 at constant volume (0.5); ΔU = C\_V,mΔT used on all four steps with the correct signs (1) | 1.5 |
| (b) | total work from ΔU\_cycle = 0, i.e. w = −(q₂ + q₄) or w₁ + w₃ (0.5); η = 1 − (T\_D − T\_A)/(T\_C − T\_B) (1) | 1.5 |
| (c) | T\_B and T\_C from the two adiabats using V\_C = V\_B and V\_D = V\_A (1); substitution giving η = 1 − (V\_B/V\_A)^(1/c) (1) | 2 |
| (d) | ΔS = 0 on the reversible adiabats (0.5); C\_V,m ln(T\_f/T\_i) on the constant-volume steps (0.5); ΔS\_sur = −ΔS\_sys on each step because every step is reversible (1) | 2 |
| (e) temperatures | T\_B = 754 K, T\_C = 3768 K, T\_D = 1500 K | 1 |
| (e) efficiency | η = 0.602 | 0.5 |
| (e) entropies | ΔS₂ = +33.5 and ΔS₄ = −33.5 J K⁻¹ mol⁻¹, surroundings opposite, adiabats zero | 1 |
| (e) consistency | notes ΔS over the cycle is zero, or states the amount of gas assumed | 0.5 |
| **Total** |  | **10** |

**Where marks are usually lost.**

- Using C\_p,m instead of C\_V,m on the constant-volume steps. Both the (a) and (d) marks depend on this.
- Using the wrong exponent, (V\_A/V\_B)^c instead of ^(1/c). That gives T\_B = 300 × 10^2.5 ≈ 95 000 K, which should set off alarms.
- Getting T\_C from pV = nRT with n = 1 mol and the given volume. The data are inconsistent for 1 mol, so use p/T = constant at fixed V.
- Writing ΔS\_sur = 0 for every step, forgetting the heat exchanged in steps 2 and 4.
- Taking η = |q₄|/|q₂| (the fraction rejected) instead of 1 minus it.

## 23. Answers to the check questions

### Topic 3A

**3A-1.** (a) The most work comes from a reversible engine: η\_max = 1 − 300/600 = 0.50, so W\_max = 0.50 × 1200 = 600 J. (b) Q\_C = Q\_H − W = 1200 − 400 = 800 J. With signed heats, Σq/T = 1200/600 − 800/300 = 2.00 − 2.67 = −0.67 J K⁻¹. The sum is negative, so the engine is **irreversible but allowed**: it satisfies the Clausius inequality, and η = 0.33 < 0.50.

**3A-2.** Kelvin–Planck: no cyclic device can absorb heat from a single reservoir and convert it entirely into work. The isothermal expansion is not a cycle. Converting the heat to work is not its *sole* result, because the gas is left at a larger volume and lower pressure. To repeat the trick you must compress the gas back, and over a full cycle that costs work and needs a colder place to dump heat.

**3A-3.** (a) Isothermal, so ΔU = 0 and q\_rev = nRT ln 3. Then ΔS = q\_rev/T = nR ln 3. (b) Each molecule has three times as many places to be, so W\_f/W\_i = 3^N and ΔS = k ln 3^N = Nk ln 3 = nR ln 3. The two agree: ΔS = 8.314 × 1.10 = **+9.13 J K⁻¹**.

### Topic 3B

**3B-1.** ΔS\_sys = nR ln(20/5) = 2 × R × 2 ln 2 = 4 × 5.76 = **+23.1 J K⁻¹** in both cases, because the end states are the same. (a) Reversible: ΔS\_sur = −23.1 J K⁻¹, so ΔS\_tot = 0. (b) Free expansion: q = 0, so ΔS\_sur = 0 and ΔS\_tot = +23.1 J K⁻¹.

**3B-2.** Trouton: Δ\_vap H ≈ 85 × 250 ≈ 21 kJ mol⁻¹. At the normal boiling point the liquid and vapour are in equilibrium: ΔS\_sys = +85 J K⁻¹, ΔS\_sur = −85 J K⁻¹ and ΔS\_tot = 0.

**3B-3.** The blocks are identical, so T\_f is the average, 300 K. Then ΔS\_tot = 385\[ln(300/400) + ln(300/200)\] = 385 ln(9/8). By hand, ln 1.125 ≈ 0.125 − 0.125²/2 ≈ 0.117 (exactly 0.118), so ΔS\_tot ≈ 385 × 0.118 ≈ **+45 J K⁻¹**. It must be positive because T\_f² = 90 000 is larger than T\_H T\_C = 80 000 (the mean is never smaller than the geometric mean). Physically, heat crossed a finite temperature gap: the cold block gains its entropy at lower temperatures than those at which the hot block loses its entropy.

## 24. Common mistakes

1. **Celsius in a ratio.** η = 1 − T\_C/T\_H and ln(T\_f/T\_i) need kelvin. With 80 °C and 20 °C you would get nonsense.
2. **Mixing the two sign conventions.** In η and COP, Q\_H and Q\_C are magnitudes. In Σq/T and the Clausius inequality, heats are signed (in = positive).
3. **Using the actual heat for ΔS\_sys.** ΔS\_sys always comes from a *reversible* path. A free expansion has q = 0 but ΔS\_sys = nR ln(V\_f/V\_i) > 0.
4. **Using the reversible heat for ΔS\_sur.** The surroundings use the *actual* heat: ΔS\_sur = q\_sur/T\_sur = −q/T\_sur.
5. **"ΔS\_sys < 0, so it can't happen."** Only ΔS\_tot decides. Freezing below 0 °C, and a fridge cooling its contents, both lower S\_sys.
6. **Δ\_trs H/T\_trs away from T\_trs.** For supercooled water freezing at −10 °C, use the three-step path (section 18), and take q\_sur from ΔH at the actual temperature.
7. **"Adiabatic, so ΔS = 0."** That holds only if the process is *reversible*. A free expansion is adiabatic (q = 0), yet ΔS\_sys > 0.
8. **C\_p versus C\_V.** Use C\_p for heating at constant pressure and C\_V at constant volume. For a perfect gas they differ by R per mole, which is exactly the volume-change term.
9. **Leaving out "cyclic" (or "sole result") from Kelvin–Planck.** Without it, an isothermal expansion looks like a violation.
10. **COP mix-ups.** A fridge's COP uses Q\_C and a heat pump's uses Q\_H. Both can exceed 1. An efficiency η never can.
11. **Quoting Carnot for a real engine.** 1 − T\_C/T\_H is an upper limit. A real engine is always below it.
12. **Assuming V₂/V₁ = V₃/V₄ in a Carnot derivation.** It must be derived from the two adiabats: say so in one line.
13. **W for work versus W for microstates, and k versus R.** k is per molecule and R is per mole. Nk = nR.
14. **Molar versus total.** Δ\_trs S and S\_m are per mole. Multiply by n for the sample.
15. **"Entropy is disorder" used as a proof.** Use it as intuition only. Always check with ΔS\_tot, and remember that energy dispersal counts as well as positions.
16. **The open fridge door "cools the kitchen".** It warms it by W per cycle.

## 25. One-page formula sheet

| Result | Formula | Conditions |
| --- | --- | --- |
| First law over a cycle | W = Q\_H − Q\_C (net work = net heat = enclosed area) | any cycle; magnitudes |
| Engine efficiency | η = W/Q\_H = 1 − Q\_C/Q\_H | any engine |
| COP | fridge Q\_C/W; heat pump Q\_H/W = COP\_fridge + 1 | any device |
| Carnot | Q\_C/Q\_H = T\_C/T\_H; η = 1 − T\_C/T\_H (3A.9) | reversible, any substance |
| Best COP | fridge T\_C/(T\_H − T\_C); heat pump T\_H/(T\_H − T\_C) | reversible |
| Carnot volumes | V₂/V₁ = V₃/V₄, from TV^(γ−1) = const | perfect gas |
| Thermodynamic T | T\_C/T\_H ≡ (Q\_C/Q\_H)\_rev; T = (1 − η)T\_h (3A.10) | triple point of water = 273.16 K |
| Otto | η = 1 − r^(1−γ), r = V\_max/V\_min | perfect gas, reversible steps |
| Clausius (cycle) | ∮đq/T ≤ 0 (= 0 if reversible) | signed heats; T of the reservoir |
| Entropy | dS = đq\_rev/T (3A.1) | always via a reversible path |
| Clausius (process) | dS ≥ đq/T (3A.11); isolated: ΔS ≥ 0 | equality only if reversible |
| Second law | ΔS\_tot = ΔS\_sys + ΔS\_sur ≥ 0 | > 0 means spontaneous |
| Surroundings | ΔS\_sur = q\_sur/T\_sur = −q/T\_sur (3A.2b) | actual heat; reservoir at fixed T |
| Boltzmann | S = k ln W (3A.4); W = N!/\[n!(N − n)!\] for left/right | k = R/N\_A |
| Isothermal expansion | ΔS = nR ln(V\_f/V\_i) = nR ln(p\_i/p\_f) (3B.2) | perfect gas, any path |
| Phase transition | Δ\_trs S = Δ\_trs H/T\_trs (3B.4) | at T\_trs only |
| Trouton | Δ\_vap S ≈ 85 J K⁻¹ mol⁻¹ | normal liquids; not H-bonded |
| Heating | ΔS = C ln(T\_f/T\_i) (3B.7) | C constant; C\_p at constant p, C\_V at constant V |
| Perfect gas, general | ΔS = nR ln(V\_f/V\_i) + nC\_V,m ln(T\_f/T\_i) | any change of V and T |
| Heat flow | ΔS\_tot = Q(1/T\_C − 1/T\_H) | two reservoirs |
| Mixing equal masses | ΔS = C ln\[T\_f²/(T\_H T\_C)\] > 0 | same C, insulated |

**Key numbers:** R ln 2 = 5.76, Δ\_fus S(H₂O) = 22.0, Δ\_vap S(H₂O) = 109 J K⁻¹ mol⁻¹; ln 2 = 0.693, ln 3 = 1.10, ln 10 = 2.30.

# Learn: Free energy and phases

Your existing thermo notes (`notes/10-thermo-quiz2-notes.md`, the cheatsheet, formula sheet, definitions and `practice/quiz2-*`) cover Atkins 1A–3B, the Quiz-2 range, and are complete for that range. The gap is Thermo-5 (17 Oct), which came after the quiz: the third law (3C), Helmholtz and Gibbs energies (3D), the fundamental equation and Maxwell relations (3E), phase diagrams and the phase rule (4A), and the Clapeyron equations (4B). There are no slides for that lecture (`thermo-l4.tex:413` only previews it), so this doc follows Atkins and the HW list, whose items for Focus 3 and 4 are used in the questions below.

> **Study path.** Read *Learn* once, keep *Reference* open for the formulas and the "what to do without notes" list, then do *Practice*: try each question on paper before you open its solution.

## The third law and absolute entropies

The second law tells us how to calculate a change in entropy, but not the entropy itself. To find the entropy of a substance at a temperature T we measure its heat capacity from very low temperatures upwards and add up the contributions dS = C\_p dT/T, together with ΔH/T for each phase transition on the way. This gives S(T) − S(0). The third law fixes the starting point: the entropy of every perfect crystalline substance is zero at T = 0. In statistical terms a perfect crystal at absolute zero has only one possible arrangement, W = 1, and S = k ln W = 0. Entropies measured on this basis are called third-law entropies. Heat capacities cannot be measured right down to zero, so the last few kelvin are covered by the Debye law C\_p = aT³, for which the entropy at a low temperature is simply S(T) = C\_p(T)/3. With standard molar entropies tabulated, the entropy change of a reaction follows as Δ\_rS° = ΣνS°(products) − ΣνS°(reactants). Reactions that produce gas generally have positive Δ\_rS°, and those that consume gas negative ones.

## Helmholtz and Gibbs energies

The second law says that a change is spontaneous if the total entropy of system and surroundings increases. This is inconvenient, because it requires us to keep track of the surroundings. Under the conditions most common in practice the surroundings can be accounted for automatically. If heat dq enters the system from surroundings at the same temperature, the Clausius inequality dS ≥ dq/T can be rearranged. At constant volume dq = dU, and the condition becomes dU − TdS ≤ 0. At constant pressure dq = dH, and the condition becomes dH − TdS ≤ 0. These suggest two new state functions, the Helmholtz energy A = U − TS and the Gibbs energy G = H − TS. At constant temperature and volume a spontaneous change lowers A, and at constant temperature and pressure it lowers G. Equilibrium is reached when A or G has its minimum value. Chemistry is usually done at constant pressure, so G is the more useful of the two.

The relation ΔG = ΔH − TΔS shows the balance between energy and entropy. A reaction that releases heat (ΔH < 0) and increases entropy (ΔS > 0) is spontaneous at every temperature. One with ΔH > 0 and ΔS < 0 is never spontaneous. In the other two cases the sign of ΔG depends on T, and the entropy term dominates at high temperature. The two functions also have a direct meaning in terms of work. The change in A is the maximum total work a process can do, and the change in G is the maximum non-expansion work, such as electrical work in a cell or the work a cell's chemistry does in building molecules. This is why A is sometimes called the work function and G the free energy.

## The fundamental equation and Maxwell relations

Combining the first law with dq\_rev = TdS and dw\_rev = −pdV gives the fundamental equation dU = TdS − pdV. Although derived for a reversible change, it involves only state functions, so it holds for any change of a closed system doing no non-expansion work. It shows that U is naturally a function of S and V. The definitions of H, A and G then give similar equations: dH = TdS + Vdp, dA = −SdT − pdV and dG = −SdT + Vdp. Because each is an exact differential, the mixed second derivatives must be equal, and this produces four Maxwell relations, such as (∂S/∂V)\_T = (∂p/∂T)\_V. Their value is that they convert quantities that are hard to measure, such as how entropy changes with volume, into quantities that are easy to measure, such as how pressure changes with temperature. One immediate use is the thermodynamic equation of state, π\_T = T(∂p/∂T)\_V − p, which gives the internal pressure from the equation of state alone. For a perfect gas it is zero; for a van der Waals gas it is a/V\_m².

The equation dG = −SdT + Vdp shows how the Gibbs energy depends on temperature and pressure. G falls as temperature rises, at a rate equal to the entropy, and rises with pressure, at a rate equal to the volume. The Gibbs–Helmholtz equation, (∂(G/T)/∂T)\_p = −H/T², puts the temperature dependence in the form most useful for reactions: if ΔH is known, the change of ΔG/T with temperature follows. For pressure, a liquid or solid has a small, nearly constant volume, so G changes only slightly, by about V\_mΔp. A perfect gas has V = nRT/p, and integrating gives G\_m(p) = G\_m° + RT ln(p/p°), so a gas's Gibbs energy depends strongly on pressure.

## Phase diagrams and the phase rule

For a pure substance the molar Gibbs energy is called the chemical potential, μ. At given temperature and pressure the stable phase is the one with the lowest chemical potential, and two phases can coexist only where their chemical potentials are equal. A phase diagram maps out these regions in the p–T plane. Each area is a region where one phase is stable, the lines between areas are phase boundaries where two phases coexist, and three boundaries meet at the triple point, where solid, liquid and vapour coexist at a single temperature and pressure. The liquid–vapour line ends at the critical point, beyond which liquid and vapour can no longer be distinguished. Water is unusual in that its solid–liquid boundary slopes backwards, because ice is less dense than water, so increasing the pressure lowers the melting point. Carbon dioxide has its triple point above 1 atm, which is why dry ice sublimes instead of melting.

Gibbs's phase rule counts how many intensive variables can be changed freely while keeping a given number of phases in equilibrium. For C components and P phases the number of degrees of freedom is F = C − P + 2. For a pure substance, C = 1, so a single phase has F = 2 and occupies an area; two phases have F = 1 and lie on a line; and three phases have F = 0, a single point. Four phases of one substance can never be in equilibrium.

## The Clapeyron equations

The slopes of the phase boundaries follow from the fact that μ changes with temperature at the rate −S\_m and with pressure at the rate V\_m. Along a boundary the two chemical potentials must remain equal, and this requires dp/dT = Δ\_trsS/Δ\_trsV = Δ\_trsH/(TΔ\_trsV), the Clapeyron equation. For melting ΔV is small, so the solid–liquid line is steep. For vaporisation the vapour volume is so much larger than the liquid's that ΔV ≈ RT/p, and the equation becomes the Clausius–Clapeyron equation, d ln p/dT = Δ\_vapH/RT². Integrated, ln(p₂/p₁) = −(Δ\_vapH/R)(1/T₂ − 1/T₁). A plot of ln p against 1/T is therefore a straight line of slope −Δ\_vapH/R, which is how enthalpies of vaporisation are measured from vapour pressures.

# Reference: Free energy and phases

The course material section by section, in the order of the textbook, with the key formulas.

## Third law (Atkins 3C)

- Perfect crystal at T = 0: S = 0 (W = 1). Nernst heat theorem: ΔS → 0 as T → 0.
- Calorimetric entropy: S(T) = S(0) + ∫C\_p/T dT + Δ\_fusH/T\_f + ∫C\_p/T dT + Δ\_vapH/T\_b + …
- Debye extrapolation at low T: C\_p = aT³, so S(T) = C\_p(T)/3.
- Δ\_rS° = ΣνS°\_m(products) − ΣνS°\_m(reactants). Gas consumed gives ΔS < 0.

## Helmholtz and Gibbs energies (3D)

$$
A = U - TS,\qquad G = H - TS = A + pV
$$

- From Clausius dS ≥ dq/T: at constant T, V, dA ≤ 0; at constant T, p, dG ≤ 0. Equilibrium at the minimum.
- ΔG = ΔH − TΔS. Signs: ΔH < 0, ΔS > 0 always spontaneous; ΔH > 0, ΔS < 0 never; otherwise depends on T (entropy wins at high T).
- ΔA = maximum total work; ΔG = maximum non-expansion work (electrical, etc.).
- Δ\_rG° = ΣνΔ\_fG°(products) − ΣνΔ\_fG°(reactants), or Δ\_rH° − TΔ\_rS°. Δ\_fG° = 0 for elements in reference states.

## Fundamental equation and Maxwell relations (3E)

$$
dU = T\,dS - p\,dV,\quad dH = T\,dS + V\,dp,\quad dA = -S\,dT - p\,dV,\quad dG = -S\,dT + V\,dp
$$

| From | Maxwell relation |
| --- | --- |
| dU | (∂T/∂V)\_S = −(∂p/∂S)\_V |
| dH | (∂T/∂p)\_S = (∂V/∂S)\_p |
| dA | (∂p/∂T)\_V = (∂S/∂V)\_T |
| dG | (∂V/∂T)\_p = −(∂S/∂p)\_T |

- Memory aid: each comes from equating mixed second derivatives of an exact differential.
- Thermodynamic equation of state: π\_T = (∂U/∂V)\_T = T(∂p/∂T)\_V − p. Perfect gas 0; van der Waals a/V\_m².
- (∂G/∂T)\_p = −S; (∂G/∂p)\_T = V.
- Gibbs–Helmholtz: (∂(G/T)/∂T)\_p = −H/T².
- Pressure dependence: condensed phase ΔG ≈ V\_mΔp; perfect gas G\_m(p) = G\_m° + RT ln(p/p°).

## Phase diagrams (4A)

- Chemical potential of a pure substance μ = G\_m. Stable phase = lowest μ; coexistence where μ is equal.
- Transferring dn from a region of μ₁ to μ₂ changes G by (μ₂ − μ₁)dn; matter flows to lower μ.
- Areas: one phase. Lines: two phases. Triple point: three. Critical point: end of the liquid–vapour line.
- Water: triple point 273.16 K, 611 Pa; solid–liquid line has negative slope (ice less dense). CO₂: triple point 5.11 atm, so it sublimes at 1 atm.
- Phase rule: F = C − P + 2. For C = 1: P = 1 area (F = 2), P = 2 line (F = 1), P = 3 point (F = 0). Maximum phases in equilibrium: C + 2.

## Phase transitions (4B)

- (∂μ/∂T)\_p = −S\_m (falls faster for gas, then liquid, then solid); (∂μ/∂p)\_T = V\_m.
- Clapeyron: dp/dT = Δ\_trsH/(TΔ\_trsV). Solid–liquid: steep, slope sign set by ΔV.
- Clausius–Clapeyron (vapour ideal, V\_liquid neglected):

$$
\frac{d\ln p}{dT} = \frac{\Delta_{vap}H}{RT^2},\qquad \ln\frac{p_2}{p_1} = -\frac{\Delta_{vap}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
$$

- ln p vs 1/T has slope −Δ\_vapH/R. With log₁₀, multiply the slope by 2.303.
- Trouton's rule: Δ\_vapS ≈ 85 J K⁻¹ mol⁻¹ for many liquids.

## What to be able to do without notes

- State the third law and use S = C\_p/3 at low T and tabulated S° for Δ\_rS°.
- Derive the criteria dA ≤ 0 and dG ≤ 0 from the Clausius inequality.
- Calculate Δ\_rG° and say when a reaction becomes spontaneous.
- Write dU, dH, dA, dG and derive any Maxwell relation; use one to find π\_T or (∂S/∂V)\_T.
- Read a phase diagram and apply F = C − P + 2.
- Derive the Clapeyron equation and use Clausius–Clapeyron for Δ\_vapH or a boiling point.

# Formulas: Second law, entropy and free energy

## Engines and the second law

$$\boxed{\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H},\qquad \eta_\text{Carnot} = 1 - \frac{T_C}{T_H}}\qquad \text{COP}_\text{fridge}^\text{max} = \frac{T_C}{T_H - T_C}$$

## Entropy

$$\boxed{dS = \frac{dq_\text{rev}}{T},\qquad \oint\frac{dq}{T} \le 0,\qquad \Delta S_\text{univ} \ge 0}\qquad S = k_B\ln W$$

| Process | $\Delta S$ |
|---|---|
| heating at constant $p$ | $\displaystyle\int\frac{C_p}{T}dT = C_p\ln\frac{T_2}{T_1}$ (constant $C_p$) |
| ideal gas, any path | $nC_V\ln\dfrac{T_2}{T_1} + nR\ln\dfrac{V_2}{V_1}$ |
| isothermal ideal gas | $nR\ln\dfrac{V_2}{V_1}$ |
| phase change at $T_\text{trs}$ | $\dfrac{\Delta_\text{trs}H}{T_\text{trs}}$ |
| surroundings | $-\dfrac{q}{T_\text{surr}}$ |

Free expansion into vacuum: $q = w = \Delta U = 0$ but $\Delta S_\text{gas} = nR\ln(V_2/V_1) > 0$.

## Third law

$$S(0) = 0\ \text{(perfect crystal)},\qquad S(T) = S(0) + \int_0^T\frac{C_p}{T}dT + \frac{\Delta_\text{fus}H}{T_f} + \cdots,\qquad C_p = aT^3\ \Rightarrow\ S = \frac{C_p}{3}$$

$$\Delta_rS^\circ = \sum\nu S_m^\circ(\text{products}) - \sum\nu S_m^\circ(\text{reactants})$$

## Helmholtz and Gibbs energies

$$\boxed{A = U - TS,\qquad G = H - TS = A + pV,\qquad \Delta G = \Delta H - T\Delta S}$$

| $\Delta H$ | $\Delta S$ | Spontaneous? |
|---|---|---|
| $< 0$ | $> 0$ | always |
| $> 0$ | $< 0$ | never |
| otherwise | | depends on $T$ (entropy wins at high $T$) |

$\Delta A$ is the maximum total work and $\Delta G$ the maximum non-expansion work. $\Delta_rG^\circ = \sum\nu\Delta_fG^\circ(\text{products}) - \sum\nu\Delta_fG^\circ(\text{reactants})$.

## Fundamental equations and Maxwell relations

$$\boxed{dU = T\,dS - p\,dV,\quad dH = T\,dS + V\,dp,\quad dA = -S\,dT - p\,dV,\quad dG = -S\,dT + V\,dp}$$

$$\left(\frac{\partial T}{\partial V}\right)_S = -\left(\frac{\partial p}{\partial S}\right)_V,\quad \left(\frac{\partial T}{\partial p}\right)_S = \left(\frac{\partial V}{\partial S}\right)_p,\quad \left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V,\quad \left(\frac{\partial S}{\partial p}\right)_T = -\left(\frac{\partial V}{\partial T}\right)_p$$

$$\left(\frac{\partial G}{\partial T}\right)_p = -S,\quad \left(\frac{\partial G}{\partial p}\right)_T = V,\quad \left(\frac{\partial (G/T)}{\partial T}\right)_p = -\frac{H}{T^2},\quad \pi_T = \left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p$$

$\pi_T = 0$ for a perfect gas and $a/V_m^2$ for a van der Waals gas. Pressure dependence: $\Delta G \approx V_m\Delta p$ (condensed phase), $G_m(p) = G_m^\circ + RT\ln(p/p^\circ)$ (perfect gas).

## Phases

$$\boxed{F = C - P + 2},\qquad \mu = G_m,\qquad \left(\frac{\partial\mu}{\partial T}\right)_p = -S_m,\quad \left(\frac{\partial\mu}{\partial p}\right)_T = V_m$$

For $C = 1$: one phase has $F = 2$ (area), two phases $F = 1$ (line), three phases $F = 0$ (point).

$$\text{Clapeyron: }\frac{dp}{dT} = \frac{\Delta_\text{trs}H}{T\,\Delta_\text{trs}V},\qquad \boxed{\frac{d\ln p}{dT} = \frac{\Delta_\text{vap}H}{RT^2},\quad \ln\frac{p_2}{p_1} = -\frac{\Delta_\text{vap}H}{R}\left(\frac1{T_2} - \frac1{T_1}\right)}$$

Trouton's rule: $\Delta_\text{vap}S \approx 85\ \text{J K}^{-1}\text{mol}^{-1}$.

# Practice: Free energy and phases

29 questions with worked answers (tap a solution to open it). Points in brackets. Items tagged with an Atkins code are from your HW list (sometimes with data filled in so they work without the tables). R = 8.314 J K⁻¹ mol⁻¹; RT at 298 K ≈ 2.48 kJ mol⁻¹.

## A. State and explain

### Problem 1 [Thermo 5 · Recall · 2 pts]

State the third law of thermodynamics and explain it in terms of S = k ln W.

*Solution.* The entropy of every perfect crystalline substance is zero at T = 0. A perfect crystal at absolute zero has exactly one arrangement, W = 1, so S = k ln 1 = 0. Any disorder (defects, random orientations) leaves W > 1 and a residual entropy.

### Problem 2 [Thermo 5 · Recall · 2 pts]

Why are the Helmholtz and Gibbs energies more convenient than the total entropy for deciding spontaneity?

*Solution.* Spontaneity requires ΔS\_total ≥ 0, which needs the entropy of the surroundings too. At constant T and p (or T and V) the surroundings' entropy change is −ΔH/T (or −ΔU/T), and it is built into G (or A), so the criterion uses only system properties.

### Problem 3 [Thermo 5 · Recall · 3 pts]

What is the physical meaning of ΔA and ΔG in terms of work?

*Solution.* −ΔA is the maximum work (of any kind) a process at constant T can do. −ΔG is the maximum non-expansion work at constant T and p, such as the electrical work of a cell.

### Problem 4 [Thermo 5 · Recall · 2 pts]

A reaction has ΔH > 0 and ΔS > 0. At what temperatures is it spontaneous? Give the general condition.

*Solution.* ΔG = ΔH − TΔS < 0 when T > ΔH/ΔS. Entropy drives it at high temperature.

### Problem 5 [Thermo 5 · Recall · 2 pts]

What is the chemical potential of a pure substance, and how does it decide which phase is stable?

*Solution.* μ = G\_m. At given T and p the phase with the lowest μ is stable; matter flows from high to low μ; phases coexist where their μ are equal.

### Problem 6 [Thermo 5 · Recall · 3 pts]

Sketch the phase diagram of water and label the areas, lines, triple point and critical point. Why does the solid–liquid line slope backwards?

*Solution.* Areas solid, liquid, vapour; boundaries for melting, boiling and sublimation; triple point 273.16 K, 611 Pa; liquid–vapour line ends at the critical point (647 K, 218 atm). The solid–liquid line has negative slope because Δ\_fusV < 0 (ice is less dense), so in dp/dT = ΔH/(TΔV) the slope is negative: pressure lowers the melting point.

### Problem 7 [Thermo 5 · Recall · 2 pts]

Why does solid CO₂ sublime at 1 atm rather than melt?

*Solution.* Its triple point is at 5.11 atm. Below that pressure the liquid is never the stable phase, so at 1 atm the solid goes straight to vapour.

### Problem 8 [Thermo 5 · Recall · 2 pts]

Why does the chemical potential of a gas fall more steeply with temperature than that of the liquid?

*Solution.* (∂μ/∂T)\_p = −S\_m, and S\_m(gas) > S\_m(liquid), so the gas's μ falls faster. That is why the gas becomes the stable phase at high temperature.

## B. Show or derive

### Problem 9 [Thermo 5 · Derivation · 4 pts]

Starting from the Clausius inequality, show that at constant temperature and pressure a spontaneous change has dG ≤ 0.

*Solution.* **Clausius inequality.** For any process $dS \ge dq/T$.

**Constant pressure, expansion work only:** $dq = dH$, so

$$dS \ge \frac{dH}T\ \Rightarrow\ dH - T\,dS \le 0$$

**Constant temperature:** $dG = dH - T\,dS - S\,dT = dH - T\,dS$, so

$$\boxed{dG_{T,p} \le 0}$$

Spontaneous processes lower $G$; $dG = 0$ at equilibrium.

**Common mistake.** The condition needs constant $T$ **and** $p$; at constant $T,V$ the quantity to use is $A$.

### Problem 10 [Thermo 5 · Derivation · 3 pts]

From dU = TdS − pdV and the definitions of H, A and G, write dH, dA and dG. Derive the Maxwell relation (∂S/∂V)\_T = (∂p/∂T)\_V.

*Solution.* **Differentials.** Start from $dU = T\,dS - p\,dV$.

$$H = U + pV:\quad dH = T\,dS + V\,dp$$

$$A = U - TS:\quad dA = -S\,dT - p\,dV$$

$$G = H - TS:\quad dG = -S\,dT + V\,dp$$

**Maxwell relation.** From $dA$: $\left(\dfrac{\partial A}{\partial T}\right)_V = -S$ and $\left(\dfrac{\partial A}{\partial V}\right)_T = -p$. $A$ is a state function, so mixed second derivatives are equal:

$$-\left(\frac{\partial S}{\partial V}\right)_T = -\left(\frac{\partial p}{\partial T}\right)_V\ \Rightarrow\ \boxed{\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial p}{\partial T}\right)_V}$$

### Problem 11 [Thermo 5 · Derivation · 3 pts]

Show that π\_T = T(∂p/∂T)\_V − p, and evaluate it for a perfect gas and for a van der Waals gas.

*Solution.* **Divide $dU = T\,dS - p\,dV$ by $dV$ at constant $T$:**

$$\pi_T = \left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial S}{\partial V}\right)_T - p$$

**Maxwell relation** $(\partial S/\partial V)_T = (\partial p/\partial T)_V$:

$$\boxed{\pi_T = T\left(\frac{\partial p}{\partial T}\right)_V - p}$$

**Perfect gas:** $p = nRT/V$, so $T(nR/V) - p = 0$: the energy does not depend on volume.

**van der Waals gas:** $p = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$, so $(\partial p/\partial T)_V = R/(V_m - b)$:

$$\pi_T = \frac{RT}{V_m - b} - p = \boxed{\frac a{V_m^2}}$$

The attraction $a$ gives the internal energy a volume dependence.

### Problem 12 [Thermo 5 · Derivation · 4 pts · P3E.4]

Use (∂S/∂V)\_T = (∂p/∂T)\_V to find (∂S/∂V)\_T for a perfect gas, a van der Waals gas p = RT/(V\_m − b) − a/V\_m², and a Dieterici gas p = RTe^(−a/RTV\_m)/(V\_m − b). For an isothermal expansion, compare ΔS for the perfect and van der Waals gases.

*Solution.* **Strategy.** $(\partial S/\partial V)_T = (\partial p/\partial T)_V$; differentiate $p$ at fixed $V$.

- **Perfect gas** $p = RT/V_m$: $(\partial p/\partial T)_V = R/V_m$.
- **van der Waals** $p = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$: $(\partial p/\partial T)_V = \dfrac R{V_m - b}$.
- **Dieterici** $p = \dfrac{RT\,e^{-a/RTV_m}}{V_m - b}$:

$$\left(\frac{\partial p}{\partial T}\right)_V = \frac R{V_m - b}e^{-a/RTV_m}\left(1 + \frac a{RTV_m}\right)$$

**Isothermal expansion** $V_i \to V_f$ ($\Delta S = \int(\partial S/\partial V)_T\,dV$):

$$\Delta S_\text{perfect} = R\ln\frac{V_f}{V_i},\qquad \Delta S_\text{vdW} = R\ln\frac{V_f - b}{V_i - b}$$

Since $\dfrac{V_f - b}{V_i - b} > \dfrac{V_f}{V_i}$, the van der Waals gas gains **more** entropy: the molecules have less free volume at the start, so the same expansion releases more.

### Problem 13 [Thermo 5 · Derivation · 3 pts]

Derive the Gibbs–Helmholtz equation (∂(G/T)/∂T)\_p = −H/T².

*Solution.* **Differentiate the quotient:**

$$\left(\frac{\partial(G/T)}{\partial T}\right)_p = \frac1T\left(\frac{\partial G}{\partial T}\right)_p - \frac G{T^2}$$

**Use** $(\partial G/\partial T)_p = -S$ (from $dG = -S\,dT + V\,dp$):

$$= -\frac ST - \frac G{T^2} = -\frac{TS + G}{T^2}$$

**Use** $G = H - TS$, so $G + TS = H$:

$$\boxed{\left(\frac{\partial(G/T)}{\partial T}\right)_p = -\frac H{T^2}}$$

**Use.** Applied to $\Delta G$ it gives $\left(\partial(\Delta G/T)/\partial T\right)_p = -\Delta H/T^2$, which tells how an equilibrium constant changes with temperature.

### Problem 14 [Thermo 5 · Derivation · 4 pts]

Derive the Clapeyron equation, and from it the Clausius–Clapeyron equation. State the approximations.

*Solution.* **Phase equilibrium.** Along the boundary between phases $\alpha$ and $\beta$, $\mu_\alpha = \mu_\beta$, and this holds as we move along the line, so $d\mu_\alpha = d\mu_\beta$. With $d\mu = -S_m\,dT + V_m\,dp$:

$$-S_\alpha\,dT + V_\alpha\,dp = -S_\beta\,dT + V_\beta\,dp$$

$$\boxed{\frac{dp}{dT} = \frac{\Delta_\text{trs}S}{\Delta_\text{trs}V} = \frac{\Delta_\text{trs}H}{T\,\Delta_\text{trs}V}}\quad(\text{Clapeyron})$$

**Clausius–Clapeyron** (liquid to vapour). Approximations:

1. $V_\text{liquid} \ll V_\text{vapour}$, so $\Delta V \approx V_\text{vapour}$.
2. The vapour is a perfect gas: $V_m = RT/p$.

$$\frac{dp}{dT} = \frac{\Delta_\text{vap}H\,p}{RT^2}\ \Rightarrow\ \boxed{\frac{d\ln p}{dT} = \frac{\Delta_\text{vap}H}{RT^2}}$$

3. For integration, $\Delta_\text{vap}H$ is taken constant over the range:

$$\ln\frac{p_2}{p_1} = -\frac{\Delta_\text{vap}H}R\left(\frac1{T_2} - \frac1{T_1}\right)$$

### Problem 15 [Thermo 5 · Derivation · 2 pts]

Using the phase rule, show that four phases of a pure substance cannot coexist.

*Solution.* **Phase rule.** $F = C - P + 2$.

For a pure substance $C = 1$ and $P = 4$:

$$F = 1 - 4 + 2 = -1 < 0$$

A negative number of degrees of freedom is impossible: the system would be over-determined. Three phases ($F = 0$, the triple point) is the most that can coexist.

**Check.** Three equal-$\mu$ conditions are enough to fix $T$ and $p$; a fourth would be an extra equation with nothing left to adjust.

## C. Numericals

### Problem 16 [Thermo 5 · Numerical · 2 pts · Ex 3C.1]

The molar heat capacity of a solid at 10 K is 0.43 J K⁻¹ mol⁻¹. Find its molar entropy at that temperature.

*Solution.* **Idea.** At very low temperature $C_p = aT^3$ (Debye), and the third law sets $S(0) = 0$.

$$S(T) = \int_0^T\frac{C_p}{T'}\,dT' = \int_0^T aT'^2\,dT' = \frac{aT^3}{3} = \frac{C_p(T)}{3}$$

$$S(10\ \text{K}) = \frac{0.43}{3} = \boxed{0.14\ \text{J K}^{-1}\text{mol}^{-1}}$$

### Problem 17 [Thermo 5 · Numerical · 2 pts]

Calculate Δ\_rS° at 298 K for ½N₂(g) + 3/2 H₂(g) → NH₃(g). S°\_m: NH₃ 192.45, N₂ 191.61, H₂ 130.68 J K⁻¹ mol⁻¹. *(E3C.3(a))*

*Solution.* **Idea.** $\Delta_rS^\circ = \sum\nu S^\circ_m(\text{products}) - \sum\nu S^\circ_m(\text{reactants})$, with $\nu$ the stoichiometric coefficients.

$$\Delta_rS^\circ = 192.45 - \tfrac12(191.61) - \tfrac32(130.68) = 192.45 - 95.81 - 196.02 = \boxed{-99.4\ \text{J K}^{-1}\text{mol}^{-1}}$$

**Check.** Negative, as expected: two moles of gas ($\tfrac12$ N$_2$ + $\tfrac32$ H$_2$) become one mole of gas, so the disorder falls.

### Problem 18 [Thermo 5 · Numerical · 2 pts]

Find Δ\_rG° at 298 K for 4HI(g) + O₂(g) → 2I₂(s) + 2H₂O(l). Δ\_fG°: HI(g) +1.70, H₂O(l) −237.13 kJ mol⁻¹. *(E3D.2(a))*

*Solution.* **Idea.** $\Delta_rG^\circ = \sum\nu\Delta_fG^\circ(\text{products}) - \sum\nu\Delta_fG^\circ(\text{reactants})$. Elements in their reference states (I$_2$(s), O$_2$(g)) have $\Delta_fG^\circ = 0$.

$$\Delta_rG^\circ = 2(-237.13) - 4(+1.70) = -474.26 - 6.80 = \boxed{-481.1\ \text{kJ mol}^{-1}}$$

**Check.** $\Delta_rG^\circ < 0$, so the reaction is spontaneous under standard conditions.

### Problem 19 [Thermo 5 · Numerical · 3 pts · like Ex 3D.2]

For the combustion of glucose at 298 K, Δ\_cH° = −2808 kJ mol⁻¹ and Δ\_cS° = +182 J K⁻¹ mol⁻¹. How much non-expansion work can 1 mol supply at most? Why is it more than |ΔH|?

*Solution.* **Idea.** The maximum non-expansion work is $|\Delta G|$, and $\Delta G = \Delta H - T\Delta S$.

$$\Delta G = -2808\ \text{kJ} - (298\ \text{K})(0.182\ \text{kJ K}^{-1}) = -2808 - 54 = -2862\ \text{kJ}$$

$$\boxed{w_\text{non-exp,max} = 2862\ \text{kJ per mole}}$$

**Why more than $|\Delta H|$?** $\Delta S > 0$, so the system can absorb heat $T\Delta S$ from the surroundings without making the total entropy fall. That extra energy is available to be turned into work.

### Problem 20 [Thermo 5 · Numerical · 2 pts]

CaCO₃ → CaO + CO₂ has ΔH° = +178 kJ mol⁻¹ and ΔS° = +161 J K⁻¹ mol⁻¹. Above what temperature is it spontaneous?

*Solution.* **Idea.** A reaction is spontaneous when $\Delta G = \Delta H - T\Delta S < 0$. Here $\Delta H > 0$ and $\Delta S > 0$, so entropy wins only at high $T$.

$$\Delta G < 0 \iff T > \frac{\Delta H}{\Delta S} = \frac{178\,000\ \text{J mol}^{-1}}{161\ \text{J K}^{-1}\text{mol}^{-1}} = \boxed{1100\ \text{K}\ (\approx 830\ ^\circ\text{C})}$$

### Problem 21 [Thermo 5 · Numerical · 3 pts · like Ex 3E.3]

Find the change in molar Gibbs energy at 298 K when (a) a perfect gas and (b) liquid water (V\_m = 18 cm³ mol⁻¹) are compressed isothermally from 1 bar to 2 bar. Comment.

*Solution.* **Idea.** At constant $T$, $dG_m = V_m\,dp$.

**(a) Perfect gas:** $V_m = RT/p$, so

$$\Delta G_m = RT\ln\frac{p_2}{p_1} = (2.48\ \text{kJ mol}^{-1})\ln2 = \boxed{1.72\ \text{kJ mol}^{-1}}$$

**(b) Liquid water:** $V_m$ is essentially constant, so

$$\Delta G_m = V_m\Delta p = (18\times10^{-6}\ \text{m}^3)(10^5\ \text{Pa}) = \boxed{1.8\ \text{J mol}^{-1}}$$

**Comment.** The gas is about 1000 times more sensitive to pressure, because its molar volume (about 25 L) is about 1000 times larger than that of the liquid (18 mL).

### Problem 22 [Thermo 5 · Numerical · 2 pts]

The chemical potential of a substance differs by −8.3 kJ mol⁻¹ between two regions. By how much does G change when 0.15 mmol is transferred? *(E4A.2(b))*

*Solution.* **Idea.** $\mu = (\partial G/\partial n)_{T,p}$, so moving $n$ moles across a difference $\Delta\mu$ changes $G$ by $n\,\Delta\mu$.

$$\Delta G = n\,\Delta\mu = (0.15\times10^{-3}\ \text{mol})(-8.3\times10^3\ \text{J mol}^{-1}) = \boxed{-1.2\ \text{J}}$$

### Problem 23 [Thermo 5 · Numerical · 2 pts]

What is the maximum number of phases in equilibrium in a four-component system? In a one-component system, is P = 1 an area, a line or a point? *(E4A.3(b), E4A.4(a))*

*Solution.* **Idea.** The phase rule is $F = C - P + 2$.

**Maximum phases:** the most phases coexist when $F = 0$, so $P_\text{max} = C + 2 = 4 + 2 = \boxed{6}$.

**One component, $P = 1$:** $F = 1 - 1 + 2 = 2$. Both $T$ and $p$ can be varied independently, so one phase occupies an **area** of the phase diagram.

### Problem 24 [Thermo 5 · Numerical · 2 pts]

The vapour pressure of a liquid fits ln(p/Torr) = 18.361 − (3036.8 K)/T. Find Δ\_vapH. *(E4B.7(b))*

*Solution.* **Idea.** Integrating Clausius–Clapeyron gives $\ln p = \text{const} - \dfrac{\Delta_\text{vap}H}{R}\dfrac1T$, so the slope of $\ln p$ against $1/T$ is $-\Delta_\text{vap}H/R$.

Here the slope is $-3036.8$ K, so

$$\Delta_\text{vap}H = (3036.8\ \text{K})(8.314\ \text{J K}^{-1}\text{mol}^{-1}) = \boxed{25.2\ \text{kJ mol}^{-1}}$$

### Problem 25 [Thermo 5 · Numerical · 3 pts]

The vapour pressure of a liquid fits log₁₀(p/Torr) = 8.750 − (1625 K)/T. Find Δ\_vapH and the normal boiling point (log₁₀ 760 = 2.881). *(E4B.8(b))*

*Solution.* **Idea.** With $\log_{10}$ the slope is $-\Delta_\text{vap}H/(2.303R)$.

$$\Delta_\text{vap}H = 2.303\,R\,(1625\ \text{K}) = 2.303 \times 8.314 \times 1625 = \boxed{31.1\ \text{kJ mol}^{-1}}$$

**Normal boiling point** ($p = 760$ Torr, $\log_{10}760 = 2.881$):

$$\frac{1625}{T_b} = 8.750 - 2.881 = 5.869\ \Rightarrow\ T_b = \boxed{277\ \text{K}}$$

### Problem 26 [Thermo 5 · Numerical · 3 pts · P4B.5]

The entropies of fusion and vaporisation of water are 22.0 and 109.9 J K⁻¹ mol⁻¹. Find the difference in slope of μ against T on either side of (a) the freezing point and (b) the boiling point. (c) By how much does μ of water supercooled to −5 °C exceed that of ice?

*Solution.* **Idea.** $(\partial\mu/\partial T)_p = -S_m$, so on crossing a transition the slope of $\mu$ against $T$ jumps by $-\Delta_\text{trs}S$.

**(a)** At the freezing point (liquid minus solid): $-\Delta_\text{fus}S = \boxed{-22.0\ \text{J K}^{-1}\text{mol}^{-1}}$.

**(b)** At the boiling point (vapour minus liquid): $-\Delta_\text{vap}S = \boxed{-109.9\ \text{J K}^{-1}\text{mol}^{-1}}$.

**(c)** At the freezing point $\mu_\text{liq} = \mu_\text{ice}$. Cooling by $\Delta T = 5$ K, the liquid's $\mu$ rises relative to ice's by the slope difference times $\Delta T$:

$$\mu_\text{liq} - \mu_\text{ice} \approx \Delta_\text{fus}S\,\Delta T = 22.0 \times 5 = \boxed{110\ \text{J mol}^{-1}}$$

Supercooled water has the higher $\mu$, so it tends to freeze.

### Problem 27 [Thermo 5 · Numerical · 3 pts]

Estimate the melting point of ice at 50 bar. Densities: ice 0.92, water 1.00 g cm⁻³; Δ\_fusH = 6.01 kJ mol⁻¹. *(E4B.14(a))*

*Solution.* **Idea.** Clapeyron for melting: $\dfrac{dp}{dT} = \dfrac{\Delta_\text{fus}H}{T\Delta_\text{fus}V}$, so for a small pressure change $\Delta T \approx \dfrac{T\,\Delta_\text{fus}V\,\Delta p}{\Delta_\text{fus}H}$.

**Volume change** (18.0 g mol$^{-1}$): $V_m(\text{ice}) = 18.0/0.92 = 19.6$ cm$^3$, $V_m(\text{water}) = 18.0$ cm$^3$, so $\Delta_\text{fus}V = -1.6\times10^{-6}$ m$^3$ mol$^{-1}$.

$$\Delta T \approx \frac{(273)(-1.6\times10^{-6})(49\times10^5)}{6010} = -0.35\ \text{K}$$

Ice melts at about $\boxed{-0.35\ ^\circ\text{C}}$. The melting point falls because water is denser than ice.

## D. Estimate

### Problem 28 [Thermo 5 · Numerical · 2 pts]

Use Trouton's rule to estimate Δ\_vapH of benzene (T\_b = 353 K).

*Solution.* **Idea.** Trouton's rule: $\Delta_\text{vap}S \approx 85\ \text{J K}^{-1}\text{mol}^{-1}$, and at the boiling point $\Delta_\text{vap}H = T_b\Delta_\text{vap}S$.

$$\Delta_\text{vap}H \approx 85 \times 353 = 30\,000\ \text{J mol}^{-1} = \boxed{30\ \text{kJ mol}^{-1}}\quad(\text{measured: } 30.8)$$

### Problem 29 [Thermo 5 · Numerical · 3 pts]

At the top of a high mountain the pressure is about 1/3 atm. Estimate the boiling point of water (Δ\_vapH = 40.7 kJ mol⁻¹, ln 3 ≈ 1.1).

*Solution.* **Idea.** Integrated Clausius–Clapeyron between the normal boiling point ($373$ K, $1$ atm) and the summit ($T$, $\tfrac13$ atm):

$$\ln\frac{p_2}{p_1} = -\frac{\Delta_\text{vap}H}{R}\left(\frac1{T_2} - \frac1{T_1}\right)\ \Rightarrow\ \frac1{T_2} = \frac1{T_1} - \frac{R}{\Delta_\text{vap}H}\ln\frac{p_2}{p_1}$$

With $\ln(p_2/p_1) = \ln\tfrac13 = -1.1$:

$$\frac1{T_2} = \frac1{373} + \frac{8.314}{40\,700}(1.1) = 0.00268 + 0.000225 = 0.00291\ \text{K}^{-1}$$

$$T_2 \approx \boxed{344\ \text{K} \approx 70\ ^\circ\text{C}}$$

