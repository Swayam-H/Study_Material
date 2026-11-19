# First law: Atkins 11e 2A, 2B, 2E (teaching notes)


## How to use these notes

These notes teach the first law of thermodynamics from lecture Thermo-2 (slides `thermo.tex`, lines 597–1390) and Atkins 11e Topics 2A, 2B and 2E. Read them top to bottom; each topic ends with check questions, and the answers are near the end.

Each subsection runs in the same order: the idea in words, then the derivation with every step, then a worked example with numbers you can do by hand. Material marked **\[beyond slides\]** comes only from Atkins. It still matters, because the homework uses it, but the slides come first.

### The one convention you must not get wrong

The course (slides and Atkins) uses the **acquisitive convention**: every energy transfer is counted from the system's point of view.

```latex
\Delta U = q + w
```

- q = energy transferred **into** the system as heat. Heat in: q > 0. Heat out: q < 0.
- w = work done **on** the system. Compression: w > 0. Expansion: w < 0.
- The slides write capital Q and W; Atkins writes lower-case q and w. The meaning is the same.

**Warning.** The tutorial slides ("First law and heat capacities") use the engineering convention, W = work done **by** the gas, so their first law reads ΔU = Q − W. If a question says "work done by the gas", answer with the sign flipped and say so in one line.

### Symbols used throughout

| Symbol | Meaning | Units |
| --- | --- | --- |
| U | internal energy of the system (state function) | J |
| H | enthalpy, H = U + pV (state function) | J |
| q, w | heat into, work on the system (path functions) | J |
| p | pressure of the gas inside the system | Pa or bar |
| p\_ex | external pressure, the pressure the surroundings push back with | Pa or bar |
| V, T, n | volume, absolute temperature, amount of substance | m³ or L, K, mol |
| R | gas constant, 8.314 J K⁻¹ mol⁻¹ = 0.08314 L bar K⁻¹ mol⁻¹ |  |
| k\_B | Boltzmann constant, R/N\_A = 1.381 × 10⁻²³ J K⁻¹ |  |
| C\_V, C\_p | heat capacity at constant volume, at constant pressure | J K⁻¹ |
| C\_V,m, C\_p,m | molar heat capacities, C/n | J K⁻¹ mol⁻¹ |
| γ | heat capacity ratio, C\_p/C\_V (slides) | none |
| c | C\_V,m/R (Atkins, in 2E only) | none |
| Δn\_g | change in moles of gas in a reaction | mol |

ΔX always means X(final) − X(initial). Always write the sign of ΔX, even when it is positive.

### Numbers to keep in your head (no calculator)

- RT = 2.48 kJ mol⁻¹ at 298 K and 2.49 kJ mol⁻¹ at 300 K.
- ln 2 = 0.693, ln 3 = 1.099, ln 10 = 2.303.
- 1 L bar = 100 J (because 10⁻³ m³ × 10⁵ Pa = 100 J). 1 bar = 10⁵ Pa; 1 atm = 1.013 bar.
- 10^0.4 ≈ 2.51 and 10^1.4 ≈ 25.1 (the fire syringe).

## 2A.1 Work, heat and energy

Work and heat are two ways of moving energy across a boundary. Neither one is something a system contains.

### Intuition: Joule's paddle wheel (slides, 1845)

A weight falls and turns a paddle wheel inside an insulated tank of water. The water gets warmer, yet no flame or hot object touched it.

Ask yourself whether we "heated" the water. We did not. The surroundings did **work** on the water (the falling weight drove the paddles), and the water's energy rose. Joule found that a fixed amount of work always gives the same temperature rise as a fixed amount of heating: 4.18 J of work does what 1 cal of heat does.

The conclusion of the slide is the whole of 2A in one line. Work and heat are two currencies for transferring energy. The water cannot tell which one was used; only the surroundings can.

### System, surroundings and boundary

- The **system** is the part of the world we study (a gas in a cylinder, a reaction flask, a cell).
- The **surroundings** are everything else. Measurements are made in the surroundings.
- An **open** system exchanges matter and energy with its surroundings. A **closed** system exchanges energy only. An **isolated** system exchanges neither.
- A **diathermic** wall lets energy through as heat. An **adiabatic** wall does not. (In 2E "adiabatic" describes a process with q = 0, which is what an adiabatic wall gives you.)

### Definitions

- **Work** is energy transferred by motion against an opposing force. A transfer counts as work if, in principle, it could raise a weight somewhere in the surroundings. A gas pushing a piston out does work; so does a cell driving a motor.
- **Energy** is the capacity to do work. Doing work on a system (compressing a gas, winding a spring) raises its energy; the system doing work lowers it.
- **Heat** is energy transferred because of a temperature difference between system and surroundings.
- An **exothermic** process releases energy as heat (all combustions). An **endothermic** process absorbs energy as heat (vaporising water).

What you observe depends on the wall:

| Process | Adiabatic container | Diathermic container in a constant-T bath |
| --- | --- | --- |
| Exothermic | system temperature rises | heat flows out; system T stays constant |
| Endothermic | system temperature falls | heat flows in; system T stays constant |

### The molecular picture (slides and Atkins)

- **Heat** uses the random, disordered motion of molecules. Fast molecules in the hot surroundings collide with molecules at the boundary and make them jiggle harder.
- **Work** uses organised motion. All the atoms of a falling weight move down together; all the electrons in a current drift the same way; a piston moves as one block.
- The distinction is made **in the surroundings**. A piston compressing a gas speeds up the gas molecules, and collisions quickly randomise that motion. It is still work, because the surroundings' motion (the descending weight) was organised.

### Heat is energy in transit

"The heat in this cup" is, strictly, wrong. Heat exists only while energy is crossing a boundary. A hot cup has more **internal energy** (Topic 2A.2) than a cold one, and heat flows from it to its surroundings. The common misconception in the slides is "a hotter object has more heat"; replace it with "a hotter object has more internal energy".

### Worked example: where you draw the boundary decides the label

**Question.** A 100 W electric heater is switched on for 60 s inside an insulated tank of 1.0 kg of water. Find q, w and ΔU (a) when the system is the water alone, (b) when the system is the water plus the heater.

**Energy delivered.** 100 W × 60 s = 6.0 kJ.

**(a) System = water.** The hot heater coil is outside the boundary and warms the water through a temperature difference. So q = +6.0 kJ, w = 0, and ΔU = q + w = +6.0 kJ.

**(b) System = water + heater.** Now electrons are pushed through the heater by the external supply, which is organised motion in the surroundings. So w = +6.0 kJ (electrical work), q = 0 (insulated tank), and ΔU = +6.0 kJ.

**Lesson.** ΔU is the same both ways, because it depends only on the initial and final states. The split into q and w depends on the boundary. Always state the system first.

The water warms by about 6000 J ÷ (4180 J K⁻¹) ≈ 1.4 K, using 4.18 J g⁻¹ K⁻¹ for water.

## 2A.2 Internal energy and the first law

The first law says the energy of an isolated system never changes; for a closed system this becomes ΔU = q + w, with U a state function.

### What internal energy is

The **internal energy** U is the total energy of the molecules inside the system: their kinetic energy (translation, rotation, vibration) plus the potential energy of their interactions and bonds.

It leaves out the energy of the system as a whole. A flask of gas on a moving train has the same U as the same flask on the platform.

- U is **extensive**: double the sample, double U. The molar internal energy U\_m = U/n is **intensive**.
- Only changes, ΔU = U\_f − U\_i, can be measured. The zero of U is arbitrary, and it never matters.

### The first law

Experiments show two facts. First, heating a system and doing work on it change U in exactly equivalent ways (Joule). Second, an isolated system's U never changes; nobody has ever built a machine that does work forever without fuel.

Together these give the first law:

```latex
\Delta U = q + w \qquad \text{(closed system)}
```

In words: U changes only by heat added to the system and by work done on it. Think of U as a bank balance that accepts deposits in two currencies (heat, work) but stores only one thing (energy).

- Isolated system: q = 0 and w = 0, so ΔU = 0.
- **Quick example.** A gas is compressed with 500 J of work and loses 200 J as heat. Then w = +500 J, q = −200 J and ΔU = +300 J.
- **Quick example.** A motor delivers 10 kJ of work each second and loses 3 kJ as heat. Then w = −10 kJ, q = −3 kJ and ΔU = −13 kJ each second.

### State functions and exact differentials (slides)

A **state function** depends only on the current state of the system, not on its history. U, H, p, V and T are state functions. q and w are **path functions**: they describe a process, not a state.

The slides use a hiking analogy. Your change in altitude depends only on where you started and finished (state function). The distance you walked depends on the trail (path function).

In calculus language, dU is an **exact differential**: it integrates to a difference of end values, and it gives zero around any closed loop.

```latex
\int_A^B \mathrm{d}U = U_B - U_A, \qquad \oint \mathrm{d}U = 0
```

Small amounts of heat and work are **inexact differentials**, written đq and đw in the slides (δq and δw in the equations here). Their integrals depend on the path, and around a closed loop they need not vanish.

```latex
\int_A^B \delta q \neq q_B - q_A, \qquad \oint \delta q \neq 0
```

There is no such thing as q\_A: a state has no "heat content" and no "work content". The first law in differential form, for a slow (quasi-static) process with only expansion work, is

```latex
\mathrm{d}U = \delta q + \delta w = \delta q - p\,\mathrm{d}V
```

The remarkable part is that two inexact pieces add up to an exact one. The formal test for exactness belongs to Topic 2D.

### Equipartition: where the energy sits (slides)

**Intuition.** Each independent way a molecule can store energy, if that energy is a square of a coordinate or momentum, gets the same average share at temperature T.

**Theorem.** At thermal equilibrium, each quadratic term in a molecule's energy contributes ½k\_B T to its average energy. It holds when the energy levels of that motion are much closer together than k\_B T.

**Counting the terms.**

1. **Translation.** E\_trans = ½mv\_x² + ½mv\_y² + ½mv\_z² has 3 quadratic terms, so ⟨E\_trans⟩ = 3 × ½k\_B T = (3/2)k\_B T. This is Lecture 1's kinetic-theory result. Per mole, multiply by N\_A: (3/2)RT.
2. **Rotation of a linear molecule** (N₂, O₂, CO₂). It can rotate about two axes perpendicular to the bond, each with energy ½Iω². Rotation about the bond axis has almost no moment of inertia and does not count. That adds 2 terms, so +RT per mole.
3. **Rotation of a non-linear molecule** (H₂O, CH₄) **\[beyond slides\]**: three axes, so +(3/2)RT per mole.
4. **Vibration.** Each mode has a kinetic and a potential quadratic term, so it would add RT per mole. At room temperature the vibrational levels are far apart compared with k\_B T, so vibrations are "frozen out" (a quantum effect). That is why N₂ has U\_m = (5/2)RT, not (7/2)RT.

| Molecule | Translation terms | Rotation terms | U\_m (above its T = 0 value) |
| --- | --- | --- | --- |
| Monatomic (He, Ar) | 3 | 0 | (3/2)RT |
| Linear (N₂, O₂) | 3 | 2 | (5/2)RT |
| Non-linear (H₂O) \[beyond slides\] | 3 | 3 | 3RT |

**The key consequence.** A perfect gas has no forces between molecules, so moving the molecules further apart costs no energy. Its U depends **only on T**, not on V or p. Any isothermal process of a perfect gas therefore has ΔU = 0. (Real gases and liquids also store energy in intermolecular attractions, so their U depends on V too; Topic 2D measures this.)

### Worked example: equipartition numbers

**Question.** (a) Find the translational contribution to U\_m of any gas at 298 K. (b) Find ΔU when 2.00 mol of N₂ is heated from 300 K to 400 K.

**(a)** U\_m,trans = (3/2)RT = 1.5 × 2.48 kJ mol⁻¹ = 3.72 kJ mol⁻¹. This is the same for He and for a protein in the gas phase: equipartition does not care about mass.

**(b)** For N₂, U = n(5/2)RT plus a constant, so

```latex
\Delta U = n\cdot\tfrac52 R\,\Delta T = (2.00)(2.5)(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(100\ \mathrm{K}) \approx +4.16\ \mathrm{kJ}
```

This answer holds whatever the process, at constant volume, at constant pressure or anything else, because U of a perfect gas depends only on T.

## 2A.3 Expansion work

The work done on a gas is w = −∫p\_ex dV. It is zero for free expansion, −p\_exΔV against a constant pressure, and largest in size when the expansion is reversible. It depends on the path.

### Quasi-static and reversible processes (slides)

A **quasi-static** process is slow enough that the system passes through a sequence of equilibrium states. The slides picture a piston loaded with sand: remove the grains one by one and the gas is always in equilibrium; remove a block suddenly and it is not.

- Only in a quasi-static process are p, V and T defined at every moment.
- Only then can the process be drawn as a **curve** on a p–V diagram. A sudden process has a start point and an end point, but no curve between them.
- A quasi-static process with no friction is **reversible**.

Atkins defines a **reversible** change as one that an infinitesimal change in a variable can reverse. Take a gas whose pressure p is exactly matched by the external pressure p\_ex. Raise p\_ex by a hair and the gas is compressed; lower it by a hair and the gas expands. That system is in mechanical equilibrium, poised to go either way.

If instead p\_ex is **measurably** smaller than p, lowering p\_ex slightly does not change the direction: the gas keeps rushing out. That expansion is irreversible.

### Derivation: the general expression for work

Put the gas in a cylinder closed by a massless, frictionless piston of area A. The surroundings push on the outside of the piston with pressure p\_ex, so the force they exert is p\_ex A, directed inwards.

1. Let the piston move **outwards** by dz. The surroundings' force points in, the motion points out, so the work done **on** the gas is negative: δw = −(p\_ex A) dz.
2. The volume swept out is dV = A dz. Substitute:

```latex
\delta w = -p_\mathrm{ex}\,\mathrm{d}V
```

3. Add up the small steps from V\_i to V\_f:

```latex
w = -\int_{V_i}^{V_f} p_\mathrm{ex}\,\mathrm{d}V
```

Check the signs. In an expansion dV > 0, so w < 0: the gas does work and loses energy. In a compression dV < 0, so w > 0.

It is the **external** pressure that sets the work, even during a compression. The work is the energy that leaves or enters the surroundings: a weight resting on the piston is raised or lowered, and its potential energy changes by p\_ex A dz. The slides write the formula with the gas's own p, which is correct because they assume a quasi-static process, where p\_ex = p.

On a p\_ex–V graph (an **indicator diagram**), |w| equals the **area under the path**.

### Case 1: free expansion (p\_ex = 0)

A gas expanding into a vacuum pushes against nothing. With p\_ex = 0, the integral gives w = 0.

### Case 2: expansion against a constant external pressure

Take p\_ex constant (the atmosphere, say) and pull it out of the integral:

```latex
w = -p_\mathrm{ex}\int_{V_i}^{V_f}\mathrm{d}V = -p_\mathrm{ex}(V_f - V_i) = -p_\mathrm{ex}\,\Delta V
```

On the indicator diagram this is a rectangle of height p\_ex and width ΔV.

**Worked example (Atkins Example 2A.1, gas production).** 50 g of iron reacts with hydrochloric acid at 25 °C: Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g). Find w (a) in a sealed vessel of fixed volume, (b) in an open beaker.

- **(a)** The volume cannot change, so w = 0.
- **(b)** The H₂ pushes back the atmosphere at constant p\_ex. The liquids and solids barely change volume, so ΔV ≈ V(H₂) = nRT/p\_ex. Then

```latex
w = -p_\mathrm{ex}\,\Delta V \approx -p_\mathrm{ex}\cdot\frac{nRT}{p_\mathrm{ex}} = -nRT
```

- One mole of Fe gives one mole of H₂, so n = 50 g ÷ 55.85 g mol⁻¹ ≈ 0.90 mol. With RT = 2.48 kJ mol⁻¹, w ≈ −0.90 × 2.48 kJ ≈ **−2.2 kJ**.
- **Comment.** p\_ex cancels. At lower pressure the gas takes up more room, so the two effects cancel. This result, w = −Δn\_g RT, comes back in 2B as ΔH = ΔU + Δn\_g RT.

### Case 3: reversible expansion

To expand reversibly, keep p\_ex equal to the gas pressure p at every stage (take the sand off grain by grain). Then δw = −p dV, and

```latex
w_\mathrm{rev} = -\int_{V_i}^{V_f} p\,\mathrm{d}V
```

Now p is the gas's own pressure, so you need its **equation of state** to do the integral. This is where Topic 1A (or 1C, for real gases) plugs in.

**Isothermal reversible expansion of a perfect gas.** Keep the gas in a constant-temperature bath. At every stage p = nRT/V, and n, R and T are constants, so they come out of the integral:

```latex
w = -\int_{V_i}^{V_f}\frac{nRT}{V}\,\mathrm{d}V = -nRT\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V} = -nRT\ln\frac{V_f}{V_i}
```

Because p\_i V\_i = p\_f V\_f at constant T, you can also write w = −nRT ln(p\_i/p\_f).

**Slides example.** 1.00 mol of perfect gas expands reversibly at 300 K from 10.0 L to 20.0 L.

```latex
w = -(1.00)(8.314)(300)\ln 2 \approx -(2.49\ \mathrm{kJ})(0.693) \approx -1.73\ \mathrm{kJ}
```

The gas does 1.73 kJ of work on its surroundings, yet its temperature, and so its U, does not change. The energy must have come in as heat from the bath: q = +1.73 kJ.

At a higher temperature the same volume change gives more work, because the gas pushes harder and the matched p\_ex must be larger.

### Why reversible expansion gives the maximum work

**Intuition.** During an expansion the gas can only move the piston if p\_ex ≤ p. Any time p\_ex is smaller than p, some of the gas's "pushing power" is wasted: it goes into sloshing and turbulence that end up as internal energy, not into lifting the weight.

**Argument on the diagram.** For an isothermal expansion, the reversible path follows the isotherm p = nRT/V. An expansion against a constant p\_ex can only finish if p\_ex ≤ p\_f, so its rectangle sits under the lowest point of the isotherm. The area under the curve is always bigger than the rectangle.

**Argument in symbols.** Work done by the gas is −w = ∫p\_ex dV. In every expansion step dV > 0 and p\_ex ≤ p, so

```latex
-w = \int p_\mathrm{ex}\,\mathrm{d}V \;\le\; \int p\,\mathrm{d}V = -w_\mathrm{rev}
```

Equality holds only when p\_ex = p throughout, which is the reversible path. (A full proof for any pair of end states uses the second law, Topic 3A.)

For a **compression** the inequality flips: the reversible path is the **least** work you must do on the gas. Any irreversible compression costs more.

&#91;embedded content: indicator diagram · isothermal expansion from V\_i to 3V\_i\]

The whole shaded area is the reversible work and the darker rectangle is the work against p\_ex = p\_f; the band between them is what the irreversible path wastes.

### Worked example: Atkins E2A.4(a), one expansion done three ways

**Question.** 1.00 mol of Ar is expanded isothermally at 20 °C from 10.0 dm³ to 30.0 dm³ (i) reversibly, (ii) against a constant external pressure equal to the final pressure of the gas, (iii) freely. Find q, w and ΔU for each.

**Step 0: what is common to all three.** Ar behaves as a perfect monatomic gas, so U depends only on T. Every path starts and ends at 293 K, so **ΔU = 0 for all three**, and then the first law gives q = −w.

Useful number: nRT = (1.00)(8.314)(293.15) J ≈ 2.44 kJ.

**(i) Reversible.**

```latex
w = -nRT\ln\frac{V_f}{V_i} = -(2.44\ \mathrm{kJ})\ln 3 = -(2.44)(1.099)\ \mathrm{kJ} \approx -2.68\ \mathrm{kJ}
```

So q = +2.68 kJ and ΔU = 0.

**(ii) Against constant p\_ex = p\_f.** First find the final pressure:

```latex
p_f = \frac{nRT}{V_f} = \frac{2437\ \mathrm{J}}{0.0300\ \mathrm{m^3}} \approx 8.12\times10^4\ \mathrm{Pa}
```

Then w = −p\_ex ΔV = −(8.12 × 10⁴ Pa)(0.0200 m³) ≈ −1.62 kJ.

A faster route for the exam: w = −p\_f ΔV = −(nRT/V\_f)ΔV = −nRT × (20/30) = −(2/3)(2.44 kJ) ≈ −1.62 kJ. So q = +1.62 kJ and ΔU = 0.

**(iii) Free.** p\_ex = 0, so w = 0. Then ΔU = 0 forces q = 0.

| Path | w / kJ | q / kJ | ΔU / kJ |
| --- | --- | --- | --- |
| (i) reversible | −2.68 | +2.68 | 0 |
| (ii) constant p\_ex = p\_f | −1.62 | +1.62 | 0 |
| (iii) free | 0 | 0 | 0 |

**What to notice.**

- Same initial state and same final state in all three, so the state function ΔU is the same. q and w are not, because they are path functions.
- The reversible path gives the most work, as the argument above predicts (2.68 > 1.62 > 0).
- In (ii) the gas is not in equilibrium mid-way, so "isothermal" only means it starts and ends at 293 K, in contact with the bath.

### Work depends on the path (slides)

**Question.** Take a gas from A (1 bar, 20 L) to C (2 bar, 10 L) by two routes. Find w for each, then q.

- **Route 1.** Compress at a constant 1 bar from 20 L to 10 L, then heat at constant volume to 2 bar. Only the first step does work: w₁ = −(1 bar)(10 L − 20 L) = +10 L bar = **+1.0 kJ**.
- **Route 2.** Heat at constant volume (20 L) to 2 bar, then compress at a constant 2 bar to 10 L. Only the second step does work: w₂ = −(2 bar)(−10 L) = +20 L bar = **+2.0 kJ**.

Same start, same finish, different work. Work is not a property of a state; there is no "work content" of a gas.

**Now the heat.** p\_A V\_A = 20 L bar = p\_C V\_C, so T\_A = T\_C. For a perfect gas ΔU = 0 on both routes, and q = −w: q₁ = −1.0 kJ, q₂ = −2.0 kJ. Heat depends on the path too; only the sum q + w does not.

**Go round a cycle.** Go A → C by route 1, then back C → A along route 2 reversed (expand at 2 bar, then cool at constant volume). The work on the gas is +1.0 kJ − 2.0 kJ = −1.0 kJ, so the gas does a net 1.0 kJ of work, equal to the rectangle enclosed by the loop. Then q = +1.0 kJ and ΔU = 0. This is ∮dU = 0 but ∮δq ≠ 0 in action, and it is a heat engine in miniature (Lecture 3).

**Deeper check (assume a monatomic gas).** Route 1, step 1 halves pV, so nRΔT = −1.0 kJ. Then q = (5/2)(−1.0) = −2.5 kJ, w = +1.0 kJ, ΔU = (3/2)(−1.0) = −1.5 kJ. Step 2 restores pV: nRΔT = +1.0 kJ, q = ΔU = +1.5 kJ, w = 0. The totals are q = −1.0 kJ, w = +1.0 kJ, ΔU = 0, as above. (C\_p,m = (5/2)R is derived in 2B.2.)

&#91;embedded content: two routes from A to C on a p–V diagram\]

Route 1 compresses under the lower rectangle (1.0 kJ), route 2 under the whole shaded block (2.0 kJ); the end states, and so ΔU, are the same.

## 2A.4 Heat transactions

At constant volume, with no work other than expansion, the heat supplied equals ΔU. That is why a bomb calorimeter measures ΔU, and why C\_V is the slope of U against T.

### Derivation: q\_V = ΔU

Split the work into expansion work and everything else ("additional" work, such as electrical work):

```latex
\mathrm{d}U = \delta q + \delta w_\mathrm{exp} + \delta w_\mathrm{add}
```

1. At constant volume dV = 0, so δw\_exp = −p\_ex dV = 0.
2. If the system cannot do any other kind of work (it is not, say, a battery driving a motor), δw\_add = 0.
3. What is left is dU = δq\_V, where the subscript V marks the constant-volume condition. Integrate from i to f:

```latex
\Delta U = q_V
```

On the left we write ΔU because U is a state function. On the right we write q, never Δq, because a state has no "q" to take a difference of.

### Calorimetry: the bomb calorimeter \[beyond slides\]

**Calorimetry** is the measurement of energy transferred as heat; a **calorimeter** is the device.

The standard tool for ΔU is the **adiabatic bomb calorimeter**:

- The reaction (usually a combustion in oxygen at high pressure) runs inside a sealed steel vessel, the **bomb**. Its volume is fixed, so the heat it exchanges is q\_V = ΔU.
- The bomb sits in a stirred water bath; bomb plus water plus stirrer is the calorimeter.
- An outer bath is continuously adjusted to the calorimeter's temperature. With no temperature difference, no heat leaks out, so the whole calorimeter is adiabatic.
- The temperature rise ΔT of the calorimeter is proportional to the heat the reaction releases: q = CΔT, where C is the **calorimeter constant** (the heat capacity of the whole assembly).

You find C by **calibration**, in one of two ways:

1. **Electrically.** Pass a current I from a supply of potential difference Δφ through a heater for time t. The energy delivered is q = IΔφt (1 A V s = 1 J). Measure ΔT and set C = q/ΔT.
2. **Chemically.** Burn a known mass of a standard (benzoic acid) whose heat output is known.

**Sign care.** The heat that warms the calorimeter came **out** of the reaction. If the reaction mixture is the system, q\_system = −CΔT, so ΔU\_reaction = −CΔT.

**Worked example.** A current of 2.0 A from a 10 V supply runs for 300 s and the calorimeter warms by 2.0 K. Then 0.010 mol of an organic compound is burned in it and the temperature rises by 5.0 K. Find the molar ΔU of combustion.

- Calibration: q = (2.0 A)(10 V)(300 s) = 6.0 kJ, so C = 6.0 kJ ÷ 2.0 K = 3.0 kJ K⁻¹.
- Combustion: the calorimeter absorbs CΔT = (3.0 kJ K⁻¹)(5.0 K) = 15 kJ. The reaction released it, so ΔU = −15 kJ for 0.010 mol.
- Per mole: Δ\_c U = −15 kJ ÷ 0.010 mol = **−1.5 × 10³ kJ mol⁻¹**.
- To turn this into Δ\_c H you need ΔH = ΔU + Δn\_g RT, which is in 2B.1.

### Heat capacity

**Intuition.** Heat capacity says how much energy it takes to warm something by one kelvin. A large heat capacity means a small temperature rise for a given amount of heat; the sample has a large "capacity" for heat.

U depends on both T and V. At constant volume only its T-dependence matters, so the **heat capacity at constant volume** is a partial derivative, the slope of U against T with V held fixed:

```latex
C_V = \left(\frac{\partial U}{\partial T}\right)_V
```

- C\_V is **extensive** (100 g of water has 100 times the heat capacity of 1 g). The **molar** heat capacity C\_V,m = C\_V/n is intensive.
- The **specific** heat capacity is per gram; for liquid water it is about 4.18 J K⁻¹ g⁻¹.
- Heat capacities depend on T and fall at low temperature, but over a modest range near room temperature they are almost constant.

At constant volume, then,

```latex
\mathrm{d}U = C_V\,\mathrm{d}T \quad\Rightarrow\quad \Delta U = C_V\,\Delta T = q_V \quad (C_V \text{ constant})
```

That last equation is how C\_V is measured: supply a known heat at constant volume and divide by the temperature rise.

**For a perfect gas this goes further.** U depends only on T, so dU = C\_V dT holds for **any** process, not only at constant volume. The slides stress this: in all four standard processes (2E), ΔU = nC\_V,m ΔT.

### Heat capacities from equipartition (slides)

Differentiate the U\_m values from 2A.2 with respect to T:

| Gas | U\_m | C\_V,m | Value / J K⁻¹ mol⁻¹ |
| --- | --- | --- | --- |
| Monatomic (He, Ar) | (3/2)RT | (3/2)R | 12.5 |
| Linear (N₂, O₂) | (5/2)RT | (5/2)R | 20.8 |
| Non-linear (H₂O) \[beyond slides\] | 3RT | 3R | 24.9 |

These match experiment near room temperature. At high temperature vibrations wake up and C\_V,m climbs; at very low temperature even rotations freeze out.

### Worked example: heating at constant volume

**Question.** 1.00 mol of a monatomic perfect gas at 1.00 atm and 300 K is heated at constant volume to 400 K. Find the final pressure, w, ΔU and q.

1. **Final pressure.** At constant V, p ∝ T: p\_f = (1.00 atm)(400/300) = 1.33 atm.
2. **Work.** dV = 0, so w = 0.
3. **ΔU.** ΔU = nC\_V,m ΔT = (1.00)(3/2)(8.314)(100) J ≈ **+1.25 kJ**.
4. **Heat.** q = ΔU − w = +1.25 kJ. All the heat goes into U.

Compare this with the isobaric example in 2B.2, where the same ΔT needs more heat.

### Check your understanding: 2A

**Q2A-1.** A perfect gas is compressed reversibly and isothermally. Give the signs of w, q and ΔU, and say in one sentence where the work goes.

**Q2A-2.** 2.00 mol of a perfect gas at 300 K expands isothermally from 5.0 L to 10.0 L. Find w and q (a) against a constant external pressure equal to the final pressure, (b) reversibly. Which is larger in size, and why?

**Q2A-3.** A bomb calorimeter has C = 4.0 kJ K⁻¹. Burning 0.010 mol of a compound raises its temperature by 2.5 K. Find the molar ΔU of combustion, with its sign.

## Other kinds of work (slides)

Every kind of work has the same shape, δw = Y dX: an intensive "generalised force" Y times the change in an extensive "generalised displacement" X. The first law simply adds the kinds together.

### The pattern

| System | Force Y (intensive) | Displacement X (extensive) | δw on the system |
| --- | --- | --- | --- |
| Gas (expansion) | pressure, entered as −p | volume V | −p dV |
| Stretched wire or rubber band | tension F | length L | +F dL |
| Surface film | surface tension γ | area A | +γ dA |
| Electrochemical cell | emf E | charge Z | +E dZ |
| Dielectric slab | electric field E | total polarisation Π | +E dΠ |
| Paramagnetic solid | field μ₀H | total magnetisation M | +μ₀H dM |

Atkins (Table 2A.1) lists four of these with its own symbols: expansion −p\_ex dV, surface expansion γ dσ (σ = area), extension f dl, electrical φ dQ. Here γ means surface tension; do not confuse it with the heat capacity ratio γ of 2E.

### Stretched wire and rubber band: δw = +F dL

**Why the plus sign.** Gas pressure pushes **outwards**, so when the gas expands (dV > 0) it is the gas doing the work, and w < 0. Tension pulls **inwards**, so when you stretch a wire (dL > 0) you work against it, and w > 0. The rule behind both: work on the system is positive when the displacement goes against the system's own push or pull.

**Derivation for an elastic wire.** Hooke's law gives F = k(L − L₀), with L₀ the unstretched length. Stretch it slowly from L₀ to L:

```latex
w = \int_{L_0}^{L} k\,(L' - L_0)\,\mathrm{d}L' = \int_0^{L-L_0} k\,x\,\mathrm{d}x = \tfrac12 k\,(L - L_0)^2
```

(the middle step substitutes x = L′ − L₀). Example: k = 200 N m⁻¹ and a 5.0 cm stretch give w = ½(200)(0.050)² = 0.25 J.

A wire has its own equation of state, F = f(L, T), just as a gas has p = f(V, T).

**Demonstration.** Stretch a thick rubber band quickly and touch it to your lip: it is warm. Fast means no time for heat to flow (q = 0), and w > 0, so ΔU > 0 and T rises. It is the rubber-band version of the fire syringe in 2E.

### Surface work: δw = γ dA

**Intuition.** A molecule at a surface has fewer neighbours than one inside, so it has lost some attractive interactions. Making new surface therefore costs energy. The surface tension γ is that cost per unit area, in N m⁻¹ = J m⁻².

**Soap-film frame.** A wire of length ℓ slides along a U-shaped frame holding a soap film. Pull it out by dx. A film has **two** faces, so the new area is dA = 2ℓ dx, and the force needed is F = 2γℓ.

**Worked example (slides): spraying water.** Break 1.0 cm³ of water into droplets of radius 1.0 μm (γ = 0.072 J m⁻²).

- One droplet has area 4πr² and volume (4/3)πr³, so area per volume is 3/r. Total new area ≈ 3V/r = 3(1.0 × 10⁻⁶ m³)/(1.0 × 10⁻⁶ m) = 3.0 m².
- Work: w = γA = (0.072)(3.0) ≈ 0.22 J. A thimble of water gives three square metres of surface.

### Electrical work: δw = E dZ

Push a small charge dZ through a cell **against** its emf E (that is, charge it). The work done on the cell is δw = E dZ. Atkins writes this as δw = φ dQ, with φ the potential difference and Q the charge.

The process is **reversible** when the external voltage only just exceeds E, so the current is tiny. This is the electrical version of quasi-static.

**Worked example (slides): Daniell cell, E = 1.10 V.** Drive 2 mol of electrons backwards through the cell (one mole of Cu²⁺ involved). With F = 96 485 C mol⁻¹ the Faraday constant,

```latex
w = nFE = (2)(96\,485\ \mathrm{C\,mol^{-1}})(1.10\ \mathrm{V}) \approx 212\ \mathrm{kJ}
```

Run forwards, the cell can deliver at most this much electrical work. Lecture 5 turns this into ΔG = −nFE.

### Dielectric and magnetic work

- **Dielectric slab** in a field E: δw = E dΠ, where Π is the slab's total electric dipole moment.
- **Paramagnetic solid** in a field H: δw = μ₀H dM, where M is the total magnetic moment. Its equation of state is Curie's law, M = C\_C H/T. Aligning the spins does work on the solid.
- **Adiabatic demagnetisation.** Magnetise a salt at constant T (heat flows out), then switch off the field adiabatically. The spins randomise and the salt cools to millikelvin. It is the magnetic analogue of compressing a gas and then letting it expand adiabatically.

### The first law with several kinds of work

When several kinds of work are possible, add them (quasi-static form):

```latex
\mathrm{d}U = \delta q - p\,\mathrm{d}V + F\,\mathrm{d}L + \gamma\,\mathrm{d}A + E\,\mathrm{d}Z + \cdots
```

Atkins groups them into two kinds:

```latex
\mathrm{d}U = \delta q + \delta w_\mathrm{exp} + \delta w_\mathrm{add}
```

- w\_exp is expansion work, −p dV.
- w\_add is all other ("additional" or non-expansion) work: electrical, surface, chemical work in muscles and cells.
- ΔH = q\_p, in 2B, holds only when w\_add = 0.
- Preview of Lecture 5: at constant T and p, the maximum non-expansion work a process can give is set by ΔG.

Each pair (Y, X) has its own equation of state and its own p–V-like diagram: F–L, γ–A, H–M.

**Slides concept check.** A balloon is inflated slowly at constant temperature. What work is done on the system "gas + rubber"? **Both** kinds: the pump does work pushing gas in, and the rubber is stretched (elastic work, the 2D cousin of F dL and γ dA). Constant T does not mean zero work; in an isothermal process the work can leave again as heat.

### Check your understanding: other work

**QW-1.** Why does δw = +F dL carry the opposite sign to δw = −p dV, when both are "work done on the system"?

**QW-2.** A soap film fills a frame whose sliding wire is 5.0 cm long. The wire is pulled out by 2.0 cm. With γ = 0.025 N m⁻¹, how much work is done on the film?

## Homework solutions with marking scheme: 2A

Here are full solutions to the four assigned 2A items (Ex 2A.1, E2A.4(a), P2A.3, P2A.6), each followed by a marking scheme in the style of the course midsem rubric.

**How the schemes work.** As in the Monsoon 2026 midsem rubric, each step is marked all-or-nothing, and any equivalent form or consistent sign convention earns the marks. Single-step exercises are out of 5; multi-part exercises and problems are out of 10. The problem statements are paraphrased from Atkins 11e (p. 40 and pp. 70–71).

### Ex 2A.1 (Atkins Example 2A.1): work of gas production \[5 marks\]

**Problem.** 50 g of iron reacts with hydrochloric acid: Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g). Find the work done (a) in a closed vessel of fixed volume, (b) in an open beaker at 25 °C.

**Solution.**

1. Expansion work against an external pressure is w = −∫p\_ex dV; for a constant p\_ex this is w = −p\_ex ΔV.
2. **(a)** The vessel is rigid, so ΔV = 0 and **w = 0**.
3. **(b)** The beaker is open, so p\_ex is the constant atmospheric pressure. The solid and the solution barely change volume, so ΔV is the volume of H₂ made: ΔV ≈ nRT/p\_ex.
4. Substituting, w = −p\_ex(nRT/p\_ex) = −nRT. The external pressure cancels.
5. One mole of Fe gives one mole of H₂, so n = 50 g ÷ 55.85 g mol⁻¹ = 0.895 mol.
6. Then:

```latex
w = -(0.895\ \mathrm{mol})(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K}) = -2.22\times10^{3}\ \mathrm{J} \approx -2.2\ \mathrm{kJ}
```

7. The sign is negative: the reaction mixture does 2.2 kJ of work pushing back the atmosphere.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Principle | States w = −p\_exΔV (or w = −∫p\_ex dV) | 1 |
| 2. Part (a) | Rigid vessel, so ΔV = 0 and w = 0 | 1 |
| 3. Set-up (b) | ΔV ≈ V(H₂) = nRT/p\_ex, saying condensed-phase volumes are neglected; hence w = −nRT | 1 |
| 4. Amount | n(H₂) = n(Fe) = 0.895 mol from the 1 : 1 stoichiometry | 1 |
| 5. Answer | w ≈ −2.2 kJ, with sign, units and T in kelvin | 1 |
| **Total** |  | **5** |

**Where marks are lost.**

- Using T = 25 instead of 298 K (step 5).
- Using the molar mass of H₂ instead of Fe, or taking 2 mol H₂ per mol Fe (step 4).
- Writing +2.2 kJ, or "the work done by the system is −2.2 kJ", which is a double negative (step 5).
- Computing ΔV without saying why the solution's volume change is ignored (step 3).

### E2A.4(a): one isothermal expansion done three ways \[10 marks\]

**Problem.** 1.00 mol Ar is expanded isothermally at 20 °C from 10.0 dm³ to 30.0 dm³ (i) reversibly, (ii) against a constant external pressure equal to the final pressure of the gas, (iii) freely. Find q, w and ΔU for each.

**Solution.**

1. **Common to all three.** Ar is a perfect gas, so U depends only on T. Every path starts and ends at T = 293.15 K, so **ΔU = 0** in all three cases, and the first law gives q = −w.
2. Useful product: nRT = (1.00 mol)(8.3145 J K⁻¹ mol⁻¹)(293.15 K) = 2437 J.
3. **(i) Reversible.** For a reversible isothermal expansion of a perfect gas,

```latex
w = -nRT\ln\frac{V_f}{V_i} = -(2437\ \mathrm{J})\ln\frac{30.0}{10.0} = -(2437\ \mathrm{J})(1.0986) = -2.68\ \mathrm{kJ}
```

So **w = −2.68 kJ, q = +2.68 kJ, ΔU = 0**.

4. **(ii) Constant p\_ex = p\_f.** The final pressure is

```latex
p_f = \frac{nRT}{V_f} = \frac{2437\ \mathrm{J}}{3.00\times10^{-2}\ \mathrm{m^3}} = 8.12\times10^{4}\ \mathrm{Pa}
```

Then w = −p\_ex ΔV = −(8.12 × 10⁴ Pa)(2.00 × 10⁻² m³) = −1.62 × 10³ J. So **w = −1.62 kJ, q = +1.62 kJ, ΔU = 0**.

5. **(iii) Free.** p\_ex = 0, so **w = 0**. With ΔU = 0, **q = 0**.
6. **Interpretation.** The reversible path gives the most work, 2.68 > 1.62 > 0 kJ. ΔU is identical because U is a state function; q and w differ because they are path functions.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Key principle | U of a perfect gas depends only on T, so ΔU = 0 on all three paths and q = −w | 2 |
| 2. (i) Equation | w = −nRT ln(V\_f/V\_i), stated for reversible isothermal change | 1 |
| 3. (i) Result | w = −2.68 kJ, q = +2.68 kJ, ΔU = 0 | 1 |
| 4. (ii) Final pressure | p\_f = nRT/V\_f = 8.12 × 10⁴ Pa (or the shortcut w = −nRTΔV/V\_f) | 1 |
| 5. (ii) Equation | w = −p\_exΔV with p\_ex = p\_f | 1 |
| 6. (ii) Result | w = −1.62 kJ, q = +1.62 kJ, ΔU = 0 | 1 |
| 7. (iii) | p\_ex = 0, so w = 0, q = 0, ΔU = 0 | 1 |
| 8. Units and T | T = 293 K; Pa with m³ (or bar with dm³, 1 dm³ bar = 100 J) | 1 |
| 9. Interpretation | \|w\_rev\| > \|w\_irr\| > 0; ΔU path-independent, q and w path-dependent | 1 |
| **Total** |  | **10** |

**Where marks are lost.**

- Saying ΔU ≠ 0 for the irreversible path because it is "not isothermal" (step 1). Only the end temperatures matter.
- Using p\_i instead of p\_f in (ii) (step 5).
- Using log₁₀ 3 = 0.477 instead of ln 3 = 1.099 (step 3).
- Mixing dm³ with Pa, which is out by a factor of 1000 (step 8).
- Claiming the gas cools in free expansion (step 7).

### P2A.3: stretching an elastomer whose spring weakens \[10 marks\]

**Problem.** In a perfect elastomer the restoring force is |F| = k\_f x. Suppose instead k\_f(x) = a − bx^(1/2). Find the work done on extending the polymer from x = 0 to x = l.

**Solution.**

1. **Sign.** Stretching pulls the polymer against its own inward restoring force, as for the wire in "Other kinds of work". So the work done **on** the polymer is positive: δw = +|F| dx.
2. **Force.** |F| = k\_f(x) · x = (a − bx^(1/2))x = ax − bx^(3/2).
3. **Integrate** from 0 to l:

```latex
w = \int_0^{l}\left(ax - bx^{3/2}\right)\mathrm{d}x = \left[\frac{a x^2}{2} - \frac{2b\,x^{5/2}}{5}\right]_0^{l}
```

4. **Result.**

```latex
w = \tfrac12 a l^{2} - \tfrac25 b\, l^{5/2}
```

5. **Checks.**
   - With b = 0 this is ½al², the Hooke's-law result for a perfect elastomer.
   - The b-term lowers the work, as it should: a weaker restoring force is easier to stretch against.
   - Units: a is in N m⁻¹ and b in N m^(−3/2), so both terms are N m = J.
   - The model only makes sense while k\_f > 0, that is for l < (a/b)².
   - A numerical integration in Python (a = 2, b = 0.5, l = 1.3) agrees with the formula to 12 figures.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Sign and principle | Work on the polymer = +∫\|F\| dx, with the sign justified (or a consistently stated "work by" convention) | 2 |
| 2. Force | \|F\| = k\_f(x) x = ax − bx^(3/2) | 2 |
| 3. Integration | Correct antiderivatives ax²/2 and (2/5)bx^(5/2), limits 0 to l | 2 |
| 4. Result | w = ½al² − (2/5)bl^(5/2) | 2 |
| 5. Check | b = 0 limit, or the physical reason the work is smaller, or a units check | 2 |
| **Total** |  | **10** |

**Where marks are lost.**

- Integrating k\_f(x) instead of k\_f(x)·x (step 2). That gives al − (2/3)bl^(3/2), which has units of force, not energy, and a units check catches it.
- Power-rule slips: x^(3/2) integrates to (2/5)x^(5/2), not (3/2)x^(5/2) (step 3).
- A negative answer with no stated convention (step 1).

### P2A.6: reversible isothermal work for a gas with attractions \[10 marks\]

**Problem.** Attractions dominate, and the equation of state is p = nRT/V − n²a/V². Derive the work of reversible isothermal expansion. Compared with a perfect gas, is more or less work done on the surroundings?

**Solution.**

1. **Principle.** Reversible means p\_ex = p at every stage, so w = −∫p dV from V\_i to V\_f, with T constant.
2. **Substitute and split.**

```latex
w = -\int_{V_i}^{V_f}\left(\frac{nRT}{V} - \frac{n^2 a}{V^2}\right)\mathrm{d}V = -nRT\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V} + n^2 a\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V^2}
```

3. **First integral:** −nRT ln(V\_f/V\_i), the perfect-gas result.
4. **Second integral:** ∫V⁻² dV = −V⁻¹, so n²a\[−1/V\] from V\_i to V\_f = n²a(1/V\_i − 1/V\_f).
5. **Result.**

```latex
w = -nRT\ln\frac{V_f}{V_i} + n^2 a\left(\frac{1}{V_i} - \frac{1}{V_f}\right)
```

6. **Comparison.** In an expansion V\_f > V\_i, so 1/V\_i − 1/V\_f > 0 and the correction is positive. It makes w less negative, so the gas does **less** work on the surroundings than a perfect gas. Physically, the attractions pull the molecules together and lower the pressure at every volume, so the gas pushes less hard on the piston.
7. **Size of the effect (illustration, not asked).** Take 1.00 mol at 298 K expanding from 1.00 dm³ to 2.00 dm³, with a = 3.64 dm⁶ bar mol⁻² (roughly CO₂). The perfect-gas term is −(2478 J)(0.693) = −1.72 kJ. The correction is (3.64 dm⁶ bar)(1.00 − 0.50) dm⁻³ = 1.82 dm³ bar = +182 J. So w ≈ −1.54 kJ, about 11% less work out. (Checked by numerical integration in Python.)

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Principle | Reversible, so p\_ex = p and w = −∫p dV at constant T | 2 |
| 2. Set-up | Substitutes the equation of state and splits the integral | 1 |
| 3. First term | −nRT ln(V\_f/V\_i) | 2 |
| 4. Second term | +n²a(1/V\_i − 1/V\_f), with the sign right | 2 |
| 5. Final expression | Complete w, or an equivalent form | 1 |
| 6. Conclusion | Less work done on the surroundings, with the reason (attractions lower p) | 2 |
| **Total** |  | **10** |

**Where marks are lost.**

- Getting the sign of ∫V⁻² dV wrong, which flips the conclusion (steps 4 and 6).
- Answering "more work" because the a-term "adds" (step 6).
- Treating p\_ex as constant instead of equal to p (step 1).
- A conclusion with no physical reason (loses part of step 6, which is all-or-nothing).

### Extra practice: E2A.4(b)

2.00 mol He at 0 °C expands from 5.0 dm³ to 20.0 dm³ by the same three routes. Use the E2A.4(a) template; you should get w = −6.30 kJ, −3.41 kJ and 0, with q = −w and ΔU = 0 each time.

## 2B.1 Enthalpy

Enthalpy H = U + pV is the state function whose change equals the heat supplied at constant pressure (with no extra work). For reactions with gases, ΔH = ΔU + Δn\_g RT.

### Intuition: why we need a second energy function

At constant volume, every joule of heat stays in the system as U. Most chemistry happens in open flasks at constant atmospheric pressure, though, and there a system that is heated usually expands. Part of the heat leaves again as expansion work, pushing back the atmosphere, so ΔU < q.

It would be convenient to have a quantity whose change **is** the heat at constant pressure. Adding pV to U does the job: pV is, roughly, the energy needed to make room for the system against the surrounding pressure.

### Definition

```latex
H \equiv U + pV
```

Here p and V are the system's own pressure and volume. U, p and V are all state functions, so H is a state function too, and ΔH is independent of path.

### Derivation: ΔH = q\_p

1. **Change everything a little.** U → U + dU, p → p + dp, V → V + dV. Then

```latex
H + \mathrm{d}H = (U + \mathrm{d}U) + (p + \mathrm{d}p)(V + \mathrm{d}V) = U + pV + \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p + \mathrm{d}p\,\mathrm{d}V
```

2. **Cancel and drop.** U + pV = H cancels on both sides. dp dV is a product of two infinitesimals, so it is negligible:

```latex
\mathrm{d}H = \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p
```

3. **Use the first law.** dU = δq + δw, so dH = δq + δw + p dV + V dp.
4. **Apply the conditions.** If the system is in mechanical equilibrium with its surroundings at pressure p and does only expansion work, then δw = −p dV, which cancels the +p dV:

```latex
\mathrm{d}H = \delta q + V\,\mathrm{d}p
```

5. **Constant pressure.** dp = 0, so dH = δq\_p. Integrate:

```latex
\Delta H = q_p \qquad \text{(constant } p\text{, no additional work)}
```

Both conditions matter. If the system also does electrical work (a battery discharging at constant p), then ΔH ≠ q\_p.

Compare the two results side by side:

| Condition | Heat equals | Measured with |
| --- | --- | --- |
| Constant V, no additional work | q\_V = ΔU | bomb calorimeter |
| Constant p, no additional work | q\_p = ΔH | open (isobaric) calorimeter |

### Measuring ΔH: constant-pressure calorimetry \[beyond slides\]

- An **isobaric calorimeter** can be as simple as an insulated vessel open to the air: measure the temperature change of its contents.
- For combustions, an **adiabatic flame calorimeter** burns a known amount of fuel in oxygen and measures ΔT.
- The most sensitive tool is the differential scanning calorimeter (Topic 2C).
- Or heat electrically at constant pressure and measure what happens.

**Worked example (electrical heating at constant pressure).** A heater drawing 1.0 A from a 10 V supply runs for 180 s in water boiling at 1 atm, and 0.80 g of water evaporates. Find Δ\_vap H and Δ\_vap U per mole.

- Energy supplied as heat at constant pressure: q\_p = IΔφt = (1.0)(10)(180) J = 1.8 kJ. So ΔH = +1.8 kJ.
- Amount evaporated: 0.80 g ÷ 18.02 g mol⁻¹ ≈ 0.044 mol.
- Δ\_vap H = 1.8 kJ ÷ 0.0444 mol ≈ **+41 kJ mol⁻¹**.
- For ΔU, use the next result with Δn\_g = +1 (one mole of vapour from liquid) at 373 K, where RT ≈ 3.1 kJ mol⁻¹: Δ\_vap U ≈ 41 − 3.1 ≈ **+37 kJ mol⁻¹**. About 3 kJ of each mole's 41 kJ goes into pushing back the atmosphere.

### Derivation: ΔH = ΔU + Δn\_g RT \[beyond slides\]

Take a reaction at constant temperature T. From the definition, ΔH = ΔU + Δ(pV).

1. **Solids and liquids.** Their molar volumes are tiny. A solid with V\_m ≈ 30 cm³ mol⁻¹ at 1 bar has pV\_m ≈ (10⁵ Pa)(3 × 10⁻⁵ m³) = 3 J mol⁻¹, nothing next to the kJ mol⁻¹ of a typical ΔU. So for condensed phases H\_m ≈ U\_m and ΔH ≈ ΔU.
2. **Gases.** For the perfect-gas part, pV = n\_g RT. So at constant T, Δ(pV) = (Δn\_g)RT, where Δn\_g is (moles of gaseous products) − (moles of gaseous reactants).
3. **Result.**

```latex
\Delta H = \Delta U + \Delta n_g RT \qquad\text{or, per mole of reaction,}\qquad \Delta H_\mathrm{m} = \Delta U_\mathrm{m} + \Delta\nu_g RT
```

**Physical meaning.** If the reaction makes gas (Δn\_g > 0), the system must push back the atmosphere, so it needs more heat at constant p than at constant V: ΔH > ΔU. If it consumes gas (Δn\_g < 0), the atmosphere pushes in and does work on the system, so ΔH < ΔU. This is the same −nRT expansion work you met in Atkins Example 2A.1.

**Worked example (bomb calorimeter to ΔH).** A bomb calorimeter gives Δ\_c U = −885 kJ mol⁻¹ for methane at 298 K. Find Δ\_c H.

- Reaction: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). At 298 K the water is liquid, so it does not count as gas.
- Δν\_g = 1 − (1 + 2) = −2.
- Δ\_c H = Δ\_c U + Δν\_g RT = −885 + (−2)(2.48) ≈ **−890 kJ mol⁻¹**. ΔH is more negative because the gas volume shrinks and the atmosphere does about 5 kJ mol⁻¹ of work on the system.

**Trap.** Count only **gas-phase** species, and check the physical state of water at the stated temperature.

## 2B.2 How enthalpy changes with temperature

C\_p = (∂H/∂T)\_p is the slope of H against T at constant pressure. For a perfect gas C\_p − C\_V = nR, and when C\_p varies with T you integrate a + bT + c/T².

### The heat capacity at constant pressure

```latex
C_p = \left(\frac{\partial H}{\partial T}\right)_p
```

It is the constant-pressure partner of C\_V = (∂U/∂T)\_V. It is extensive; C\_p,m = C\_p/n is intensive. At constant pressure

```latex
\mathrm{d}H = C_p\,\mathrm{d}T \quad\Rightarrow\quad \Delta H = C_p\,\Delta T = q_p \quad (C_p \text{ constant})
```

So you measure C\_p by heating a sample that is free to expand (open to the atmosphere) and dividing the heat by the temperature rise.

### Why C\_p > C\_V (slides)

At constant volume, all the heat raises U. At constant pressure the gas expands as it warms, so part of the heat leaves as expansion work. To reach the same temperature rise you must supply more heat. More heat per kelvin means a larger heat capacity.

### Derivation: C\_p − C\_V = nR for a perfect gas

**Route 1 (slides: from H = U + nRT).** For a perfect gas pV = nRT, so

```latex
H = U + pV = U + nRT
```

Both U and H depend only on T, so the partial derivatives are ordinary derivatives. Differentiate with respect to T:

```latex
\frac{\mathrm{d}H}{\mathrm{d}T} = \frac{\mathrm{d}U}{\mathrm{d}T} + nR \quad\Rightarrow\quad C_p = C_V + nR \quad\Rightarrow\quad C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R
```

**Route 2 (first-law bookkeeping).** Heat n mol of perfect gas by ΔT at constant pressure.

1. ΔU = nC\_V,m ΔT, because U depends only on T.
2. w = −pΔV. At constant p, pΔV = nRΔT, so w = −nRΔT.
3. q\_p = ΔU − w = nC\_V,m ΔT + nRΔT = n(C\_V,m + R)ΔT.
4. By definition q\_p = nC\_p,m ΔT, so C\_p,m = C\_V,m + R.

R ≈ 8.3 J K⁻¹ mol⁻¹ is large next to C\_V,m ≈ 12.5 J K⁻¹ mol⁻¹ for a monatomic gas, so for gases the difference matters. For liquids and solids, which barely expand, C\_p ≈ C\_V and the difference is usually ignored (the general formula is in Topic 2D).

### Values and the heat capacity ratio γ

The slides define γ = C\_p/C\_V. From equipartition:

| Gas | C\_V,m | C\_p,m | γ = C\_p/C\_V |
| --- | --- | --- | --- |
| Monatomic | (3/2)R = 12.5 | (5/2)R = 20.8 | 5/3 = 1.67 |
| Diatomic (vibration frozen) | (5/2)R = 20.8 | (7/2)R = 29.1 | 7/5 = 1.40 |

(heat capacities in J K⁻¹ mol⁻¹). Measured at 300 K, He has γ = 1.67 and N₂ has γ = 1.40, so equipartition works well here. γ is different for He and N₂ because N₂ has two extra rotational terms, which raise C\_V and C\_p by the same R and so shrink their ratio.

### Worked example: isobaric bookkeeping (slides)

**Question.** 1.00 mol of a monatomic perfect gas is heated by 100 K at constant pressure. Find q, w, ΔU and ΔH.

```latex
q = nC_{p,\mathrm{m}}\Delta T = \tfrac52(8.314)(100)\ \mathrm{J} \approx +2.08\ \mathrm{kJ}
```

```latex
w = -p\,\Delta V = -nR\,\Delta T = -(8.314)(100)\ \mathrm{J} \approx -0.83\ \mathrm{kJ}
```

```latex
\Delta U = q + w \approx +1.25\ \mathrm{kJ}, \qquad \Delta H = q_p \approx +2.08\ \mathrm{kJ}
```

**Check.** nC\_V,m ΔT = (3/2)(8.314)(100) J = 1.25 kJ. It matches.

**Reading it.** 0.83 ÷ 2.08 = 0.40, so 40% of the heat leaves again as expansion work. That fraction is R/C\_p,m = 2/5 for any monatomic perfect gas. Compare 2A.4: the same 100 K rise at constant volume needed only 1.25 kJ.

**Slides concept check 2.** The same perfect gas is heated from 300 K to 400 K once at constant V and once at constant p. Which is true? **ΔU is the same, but q is larger at constant pressure.** ΔU = nC\_V,m ΔT depends only on ΔT; at constant p the gas also does expansion work, so it needs extra heat.

### When C\_p depends on temperature: C\_p,m = a + bT + c/T² \[beyond slides\]

Over small ranges C\_p is nearly constant, and for monatomic gases it is essentially constant. Otherwise Atkins uses the empirical fit

```latex
C_{p,\mathrm{m}} = a + bT + \frac{c}{T^2}
```

where a, b and c are constants fitted to experiment (Atkins Table 2B.1). Then you cannot write ΔH = C\_pΔT; you must integrate dH = C\_p dT.

**Derivation.** Integrate term by term from T₁ to T₂:

```latex
\Delta H_\mathrm{m} = \int_{T_1}^{T_2}\left(a + bT + \frac{c}{T^2}\right)\mathrm{d}T = a(T_2 - T_1) + \tfrac12 b\,(T_2^2 - T_1^2) - c\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
```

The last term comes from ∫T⁻² dT = −T⁻¹. Watch the double minus: c is often negative, and 1/T₂ − 1/T₁ is negative when T₂ > T₁.

**Worked example (Atkins Example 2B.2).** Find the change in molar enthalpy of N₂ heated from 25 °C to 100 °C. For N₂(g): a = 28.58 J K⁻¹ mol⁻¹, b = 3.77 × 10⁻³ J K⁻² mol⁻¹, c = −0.50 × 10⁵ J K mol⁻¹.

1. Temperatures in kelvin: T₁ = 298 K, T₂ = 373 K.
2. First term: a(T₂ − T₁) = 28.58 × 75 ≈ 2144 J mol⁻¹.
3. Second term: ½b(T₂² − T₁²) = ½(3.77 × 10⁻³)(373² − 298²). Factor the difference of squares: (373 − 298)(373 + 298) = 75 × 671 = 50 325. So the term is ≈ 95 J mol⁻¹.
4. Third term: −c(1/T₂ − 1/T₁) = (0.50 × 10⁵)(1/373 − 1/298). Put the bracket over a common denominator: 1/373 − 1/298 = (298 − 373)/(373 × 298) = −75/111 154 ≈ −6.75 × 10⁻⁴ K⁻¹. So the term is ≈ −34 J mol⁻¹.
5. Total: ΔH\_m ≈ 2144 + 95 − 34 ≈ **+2.20 kJ mol⁻¹**.

**Comment.** With a constant C\_p,m = 29.14 J K⁻¹ mol⁻¹ (the fit's value at 298 K) you get 29.14 × 75 ≈ 2.19 kJ mol⁻¹. Over 75 K the temperature dependence hardly matters; over hundreds of kelvin it does. Exam tip: the difference-of-squares trick in step 3 saves you a lot of arithmetic.

### Check your understanding: 2B

**Q2B-1.** For 2CO(g) + O₂(g) → 2CO₂(g) at 298 K, find ΔH\_m − ΔU\_m. Which is more negative, and why?

**Q2B-2.** 2.0 mol of a diatomic perfect gas is heated from 300 K to 350 K at constant pressure. Find q, w, ΔU and ΔH.

**Q2B-3.** Explain in two sentences why C\_p,m − C\_V,m is about 8 J K⁻¹ mol⁻¹ for a gas but nearly zero for liquid water.

## Homework solutions with marking scheme: 2B

Here are full solutions to the four assigned 2B items (Ex 2B.2, E2B.2(a), E2B.3(a), P2B.2), marked the same way as the 2A set: all-or-nothing steps, equivalent forms accepted, 5 marks for a single-step exercise and 10 otherwise. The problem statements are paraphrased from Atkins 11e (p. 49 and p. 71).

### Ex 2B.2 (Atkins Example 2B.2): enthalpy of N₂ with a temperature-dependent C\_p \[10 marks\]

**Problem.** Find the change in molar enthalpy of N₂ heated from 25 °C to 100 °C, using C\_p,m = a + bT + c/T² with a = 28.58 J K⁻¹ mol⁻¹, b = 3.77 × 10⁻³ J K⁻² mol⁻¹ and c = −0.50 × 10⁵ J K mol⁻¹ (Atkins Table 2B.1).

**Solution.**

1. At constant pressure dH\_m = C\_p,m dT. C\_p,m changes with T, so integrate rather than writing C\_p,m ΔT.
2. Set T₁ = 298 K and T₂ = 373 K, and integrate term by term:

```latex
\Delta H_\mathrm{m} = \int_{T_1}^{T_2}\left(a + bT + \frac{c}{T^2}\right)\mathrm{d}T = a(T_2 - T_1) + \tfrac12 b\,(T_2^2 - T_1^2) - c\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
```

3. Term 1: (28.58)(75) = 2144 J mol⁻¹.
4. Term 2: ½(3.77 × 10⁻³)(373 − 298)(373 + 298) = ½(3.77 × 10⁻³)(50 325) = 95 J mol⁻¹.
5. Term 3: −(−0.50 × 10⁵)(1/373 − 1/298) = (0.50 × 10⁵)(−6.75 × 10⁻⁴) = −34 J mol⁻¹.
6. Sum: ΔH\_m = 2144 + 95 − 34 = 2205 J mol⁻¹ ≈ **+2.20 kJ mol⁻¹**.
7. Check: a constant C\_p,m = 29.14 J K⁻¹ mol⁻¹ (the fit at 298 K) gives (29.14)(75) = 2.19 kJ mol⁻¹. Over only 75 K the temperature dependence adds under 1%.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Principle | dH = C\_p dT at constant p; C\_p varies, so it must be integrated | 2 |
| 2. Set-up | ΔH\_m = ∫(a + bT + c/T²) dT from 298 K to 373 K | 1 |
| 3. Integration | a(T₂ − T₁) + ½b(T₂² − T₁²) − c(1/T₂ − 1/T₁) | 2 |
| 4. Term 1 | 2144 J mol⁻¹ | 1 |
| 5. Term 2 | 95 J mol⁻¹ | 1 |
| 6. Term 3 | −34 J mol⁻¹, with the sign right | 1 |
| 7. Answer | +2.20 kJ mol⁻¹ | 1 |
| 8. Check | Comparison with the constant-C\_p estimate, or a comment that the effect is small over 75 K | 1 |
| **Total** |  | **10** |

**Where marks are lost.**

- Integrating c/T² as +c/T, or losing one of the two minus signs in term 3 (steps 3 and 6).
- Putting the temperatures in °C into the T² and 1/T terms (steps 5 and 6).
- Dropping the powers of ten: b is 3.77 × 10⁻³ and c is −0.50 × 10⁵.
- Writing ΔH\_m = C\_p,m ΔT with no justification (step 1).

### E2B.2(a): ΔH\_m − ΔU\_m for ammonia synthesis \[5 marks\]

**Problem.** Find ΔH\_m − ΔU\_m for N₂(g) + 3H₂(g) → 2NH₃(g) at 298 K.

**Solution.**

1. For perfect gases at constant temperature, ΔH\_m = ΔU\_m + Δν\_g RT.
2. Count the gas: Δν\_g = 2 − (1 + 3) = −2.
3. Substitute:

```latex
\Delta H_\mathrm{m} - \Delta U_\mathrm{m} = \Delta\nu_g RT = (-2)(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K}) = -4.96\times10^{3}\ \mathrm{J\,mol^{-1}}
```

4. So ΔH\_m − ΔU\_m = **−4.96 kJ mol⁻¹**.
5. **Meaning.** ΔH\_m is below ΔU\_m. At constant pressure the gas volume halves, so the surroundings do about 5 kJ mol⁻¹ of work on the system. That energy leaves again as heat, so the reaction gives out more heat at constant pressure than in a sealed vessel.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Principle | ΔH = ΔU + Δn\_g RT (perfect gases, constant T) | 1 |
| 2. Counting | Δν\_g = 2 − 4 = −2 | 1 |
| 3. Substitution | (−2)(8.3145)(298 K), T in kelvin | 1 |
| 4. Answer | −4.96 kJ mol⁻¹, with sign and units | 1 |
| 5. Interpretation | ΔH < ΔU because the system contracts and the surroundings do work on it | 1 |
| **Total** |  | **5** |

**Where marks are lost.**

- Counting Δν\_g as −1 or +2 (step 2).
- Reporting −4955 kJ mol⁻¹, mixing J and kJ (step 4).
- Stating which is larger with no reason (step 5).

### E2B.3(a): heating with a linear C\_p, at constant p and at constant V \[10 marks\]

**Problem.** A perfect-gas sample has C\_p/(J K⁻¹) = 20.17 + 0.3665(T/K). Find q, w, ΔU and ΔH when it is heated from 25 °C to 100 °C (i) at constant pressure, (ii) at constant volume.

**Solution.**

1. **Assumption.** The amount of gas is not given; take n = 1.00 mol and say so. It is needed only for the work term.
2. T₁ = 298.15 K, T₂ = 373.15 K, so ΔT = 75.0 K.
3. **(i) Constant pressure.** q\_p = ΔH = ∫C\_p dT:

```latex
\Delta H = 20.17(T_2 - T_1) + \tfrac12(0.3665)(T_2^2 - T_1^2) = 1513\ \mathrm{J} + \tfrac12(0.3665)(75.0)(671.3)\ \mathrm{J} = 1513 + 9226 = 1.07\times10^{4}\ \mathrm{J}
```

So **q = ΔH = +10.7 kJ**. Shortcut for a linear C\_p: C\_p at the mid-temperature (335.65 K) is 143.2 J K⁻¹, and 143.2 × 75 = 10.74 kJ exactly.

4. Work: w = −pΔV = −nRΔT = −(1.00)(8.3145)(75.0) J = **−0.624 kJ**.
5. ΔU = q + w = 10.74 − 0.62 = **+10.1 kJ**.
6. **(ii) Constant volume.** U and H of a perfect gas depend only on T, and the temperatures are the same as in (i). So **ΔU = +10.1 kJ and ΔH = +10.7 kJ** again.
7. Constant volume means **w = 0**, so **q = ΔU = +10.1 kJ**.
8. **Check.** q\_p − q\_V = 0.62 kJ = nRΔT, the expansion work in (i).

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Assumption | Perfect gas, n = 1.00 mol stated (any stated n used consistently) | 1 |
| 2. Principle (i) | q\_p = ΔH = ∫C\_p dT | 1 |
| 3. Integral | Correct integration with T in kelvin: ΔH = +10.7 kJ | 2 |
| 4. Work (i) | w = −pΔV = −nRΔT = −0.624 kJ | 1 |
| 5. ΔU (i) | ΔU = q + w = +10.1 kJ | 1 |
| 6. State functions (ii) | ΔU and ΔH unchanged because they depend only on T for a perfect gas | 2 |
| 7. (ii) w and q | w = 0, q = ΔU = +10.1 kJ | 1 |
| 8. Check | q\_p − q\_V = nRΔT, or a sensible-size comment | 1 |
| **Total** |  | **10** |

**Where marks are lost.**

- Using °C in the T² term: ½(0.3665)(100² − 25²) gives 1.7 kJ instead of 9.2 kJ (step 3).
- Using C\_p at 298 K times ΔT: 9.7 kJ instead of 10.7 kJ (step 3).
- Setting q = ΔH in (ii), or claiming ΔH = 0 at constant volume (steps 6 and 7).
- Leaving n unstated, so the work has no basis (step 1).

### P2B.2: heating the air in a room \[10 marks\]

**Problem.** Air has C\_p,m ≈ 21 J K⁻¹ mol⁻¹ at 298 K and 1.00 atm. Estimate the energy needed to warm the air in a 5.5 m × 6.5 m × 3.0 m room by 10 °C, and how long a 1.5 kW heater takes, neglecting losses.

**Solution.**

1. Volume: V = (5.5)(6.5)(3.0) m³ = 107 m³.
2. Amount of air, in SI units:

```latex
n = \frac{pV}{RT} = \frac{(1.013\times10^{5}\ \mathrm{Pa})(107.25\ \mathrm{m^3})}{(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K})} = 4.39\times10^{3}\ \mathrm{mol}
```

3. The room is not sealed, so the heating is at constant pressure: q = nC\_p,m ΔT, with ΔT = 10 K (a 10 °C rise is a 10 K rise).
4. Energy: q = (4.39 × 10³ mol)(21 J K⁻¹ mol⁻¹)(10 K) = 9.2 × 10⁵ J ≈ **0.92 MJ**.
5. Time: t = q/P = (9.21 × 10⁵ J)/(1.5 × 10³ J s⁻¹) = 614 s ≈ **10 min**.
6. **Interpretation.** The same volume of water (1.07 × 10⁵ kg at 4.18 J g⁻¹ K⁻¹) would need 4.5 × 10⁹ J for a 10 K rise, about 5000 times more. Air stores very little energy per kelvin, which is why a desert heats fast by day and cools fast at night.
7. **Examiner's note.** 21 J K⁻¹ mol⁻¹ is close to (5/2)R = 20.8, which is really C\_V,m of air. With C\_p,m ≈ (7/2)R = 29 J K⁻¹ mol⁻¹ the answer becomes 1.3 MJ and about 14 min. Use the value the problem gives, but a one-line remark like this shows understanding. As the air warms at constant pressure, about 3% of it leaves the room; the problem says to ignore that.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1. Volume | V = 107 m³ | 1 |
| 2. Amount | n = pV/RT in consistent SI units = 4.39 × 10³ mol | 2 |
| 3. Principle | q = nC\_p,m ΔT at constant pressure, losses neglected | 2 |
| 4. Energy | q ≈ 9.2 × 10⁵ J | 2 |
| 5. Time | t = q/P ≈ 614 s ≈ 10 min | 2 |
| 6. Interpretation | Comparison with water, or the desert point | 1 |
| **Total** |  | **10** |

**Where marks are lost.**

- Mixing litres with pascals, or R = 0.08206 L atm K⁻¹ mol⁻¹ with m³, which is out by 1000 (step 2).
- Forgetting that 1.5 kW = 1500 J s⁻¹ (step 5).
- Using 22.4 L mol⁻¹ (0 °C) instead of about 24.5 L mol⁻¹ at 298 K, which is 9% high. This is acceptable only if the approximation is stated (step 2).
- Giving a number with no physical comment (step 6).

## 2E.1 Adiabatic change: work and temperature

In an adiabatic change q = 0, so the work equals ΔU = C\_V ΔT. A perfect gas expanding reversibly and adiabatically follows TV^(γ−1) = constant; Atkins writes the same law as VT^c = constant with c = C\_V,m/R.

### Intuition

Wrap a gas in insulation and let it expand against a piston. It does work, but no heat flows in to replace the energy it gives away. So U falls, and for a perfect gas that means T falls.

In molecular terms, a molecule that bounces off a **retreating** piston comes back slower, like a ball hitting a bat that is moving away. Compress the gas instead and the **advancing** piston sends molecules back faster: the gas heats up.

### The work of any adiabatic change of a perfect gas

Because U is a state function, you can compute ΔU along any convenient path between the same end states (Atkins's two-step trick):

1. Change the volume from V\_i to V\_f at constant temperature T\_i. For a perfect gas U does not depend on V, so ΔU = 0 for this step.
2. Change the temperature from T\_i to T\_f at constant volume V\_f. Here ΔU = C\_V(T\_f − T\_i), taking C\_V constant.

So ΔU = C\_V ΔT whatever the real path. If the real path is adiabatic, q = 0 and ΔU = w, so

```latex
w_\mathrm{ad} = C_V\,\Delta T = nC_{V,\mathrm{m}}\,\Delta T
```

This holds for reversible **and** irreversible adiabatic changes. The catch is that you need T\_f, and T\_f depends on how the change happens. For the reversible case we can find it.

### Derivation: reversible adiabatic, the slides' γ form

1. **First law with q = 0.** dU = δw. The change is reversible, so δw = −p dV. For a perfect gas dU = nC\_V,m dT. So

```latex
nC_{V,\mathrm{m}}\,\mathrm{d}T = -p\,\mathrm{d}V = -\frac{nRT}{V}\,\mathrm{d}V
```

2. **Separate the variables.** Divide both sides by nC\_V,m T:

```latex
\frac{\mathrm{d}T}{T} = -\frac{R}{C_{V,\mathrm{m}}}\,\frac{\mathrm{d}V}{V}
```

3. **Bring in γ.** Using C\_p,m − C\_V,m = R (2B.2):

```latex
\frac{R}{C_{V,\mathrm{m}}} = \frac{C_{p,\mathrm{m}} - C_{V,\mathrm{m}}}{C_{V,\mathrm{m}}} = \gamma - 1
```

4. **Integrate** from (T\_i, V\_i) to (T\_f, V\_f), with γ constant:

```latex
\ln\frac{T_f}{T_i} = -(\gamma - 1)\ln\frac{V_f}{V_i} \quad\Rightarrow\quad T_f V_f^{\gamma-1} = T_i V_i^{\gamma-1}
```

5. **Switch to p and V.** Put T = pV/(nR) into TV^(γ−1) = constant. The constant nR can be absorbed, leaving

```latex
TV^{\gamma-1} = \text{const}, \qquad pV^{\gamma} = \text{const}
```

In practice: T\_f = T\_i (V\_i/V\_f)^(γ−1) and p\_f = p\_i (V\_i/V\_f)^γ.

### The same result in Atkins's c form

Atkins defines c = C\_V,m/R, so R/C\_V,m = 1/c. Step 4 then reads

```latex
c\,\ln\frac{T_f}{T_i} = \ln\frac{V_i}{V_f} \quad\Rightarrow\quad \left(\frac{T_f}{T_i}\right)^{c} = \frac{V_i}{V_f} \quad\Rightarrow\quad V_i T_i^{\,c} = V_f T_f^{\,c}
```

or T\_f = T\_i (V\_i/V\_f)^(1/c). Since 1/c = R/C\_V,m = γ − 1, this is exactly the slides' formula.

Atkins gets the pressure law like this. The end states obey pV = nRT, so p\_i V\_i/(p\_f V\_f) = T\_i/T\_f = (V\_f/V\_i)^(1/c). Rearranged, (p\_i/p\_f)(V\_i/V\_f)^(1 + 1/c) = 1. And 1 + 1/c = (C\_V,m + R)/C\_V,m = C\_p,m/C\_V,m = γ, so p\_f V\_f^γ = p\_i V\_i^γ.

| Gas | c = C\_V,m/R | γ | γ − 1 = 1/c |
| --- | --- | --- | --- |
| Monatomic | 3/2 | 5/3 | 2/3 |
| Diatomic | 5/2 | 7/5 | 2/5 = 0.4 |

### Worked example: the fire syringe (slides)

**Question.** Air (γ = 1.40) at 1.00 bar and 300 K is compressed rapidly to one-tenth of its volume. Estimate the final temperature and pressure.

**Model.** Rapid means no time for heat to escape, so q ≈ 0. The piston still moves slowly compared with the speed of sound, so the gas stays nearly uniform and the reversible formulas are a fair approximation.

**Temperature.**

```latex
T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma-1} = (300\ \mathrm{K})(10)^{0.40} \approx (300)(2.51) \approx 754\ \mathrm{K}\ (\approx 480\ ^\circ\mathrm{C})
```

No-calculator trick: log₁₀ 2.5 ≈ 0.40, so 10^0.4 ≈ 2.5.

**Pressure.**

```latex
p_2 = p_1\left(\frac{V_1}{V_2}\right)^{\gamma} = (1.00\ \mathrm{bar})(10)^{1.40} \approx 25\ \mathrm{bar}
```

**Self-check.** The perfect gas law must still hold: p₂ = p₁ (V₁/V₂)(T₂/T₁) = (1.00)(10)(2.51) ≈ 25 bar. It agrees.

**Work.** For a 50 cm³ syringe, n = pV/RT = (10⁵ Pa)(5.0 × 10⁻⁵ m³)/(2494 J mol⁻¹) ≈ 2.0 mmol. Then w = nC\_V,m ΔT ≈ (0.0020)(20.8)(454) J ≈ +19 J. A small amount of work, concentrated in very little gas.

**Result.** 480 °C ignites a wisp of cotton. A diesel engine uses the same physics to ignite its fuel without a spark plug.

### Worked example: a big reversible adiabatic expansion

**Question.** 1.00 mol of helium at 300 K and 10.0 L expands reversibly and adiabatically to 80.0 L. Find T\_f, p\_f and w.

1. Helium is monatomic, so γ − 1 = 2/3 (c = 3/2).
2. T\_f = (300 K)(10/80)^(2/3) = (300 K)(1/8)^(2/3) = (300 K)/4 = **75 K**, since 8^(2/3) = 4.
3. p\_i = nRT\_i/V\_i = 2494 J / 0.0100 m³ ≈ 2.49 bar. Then p\_f = p\_i (1/8)^(5/3) = p\_i/32 ≈ **0.078 bar**. Check: nRT\_f/V\_f = (8.314)(75)/(0.0800) Pa ≈ 7.8 kPa. It agrees.
4. w = nC\_V,m ΔT = (1.00)(3/2)(8.314)(75 − 300) J ≈ **−2.81 kJ**. The gas does 2.81 kJ of work, paid for entirely out of its own internal energy.

Note that ΔT does not depend on the amount of gas, but w does.

## 2E.2 Adiabats: pressure change and steepness

A reversible adiabat obeys pV^γ = constant, so it falls more steeply than the isotherm p ∝ 1/V through the same point. Free expansion is also adiabatic, but it is irreversible, does no work and leaves a perfect gas's temperature unchanged.

### Why the adiabat is steeper (slides)

**Intuition.** Expand a gas isothermally and heat flows in to hold T up, so p falls only because V grows. Expand it adiabatically and nothing replaces the energy spent as work: T falls as well, so p falls for two reasons at once. Run backwards, an adiabatic compression heats the gas, and an isothermal one does not.

**Derivation.** Compare the slopes of the two curves at the same point (p, V).

- Isotherm: pV = constant. Differentiate: p dV + V dp = 0, so

```latex
\left(\frac{\mathrm{d}p}{\mathrm{d}V}\right)_\text{isotherm} = -\frac{p}{V}
```

- Adiabat: pV^γ = constant. Differentiate: V^γ dp + γpV^(γ−1) dV = 0. Divide by V^γ:

```latex
\left(\frac{\mathrm{d}p}{\mathrm{d}V}\right)_\text{adiabat} = -\gamma\,\frac{p}{V}
```

The adiabat's slope is γ times the isotherm's, and γ > 1 always (C\_p > C\_V). So the adiabat is **steeper**: it falls faster on expansion and rises faster on compression.

&#91;embedded content: isotherm and reversible adiabat through one point\]

Left of the shared point the adiabat lies above the isotherm, and right of it below: adiabatic compression heats the gas, adiabatic expansion cools it.

**Worked example (by hand).** A monatomic perfect gas at 1.00 bar expands reversibly to 8 times its volume. Compare the final pressure along an adiabat and along an isotherm.

- Adiabat (γ = 5/3): p\_f = (1.00 bar)(1/8)^(5/3) = (1.00 bar)/32 ≈ 0.031 bar, since 8^(5/3) = 2⁵ = 32.
- Isotherm: p\_f = (1.00 bar)/8 = 0.125 bar.
- The adiabat ends 4 times lower, and that factor of 4 is exactly the temperature drop: 8^(2/3) = 4.

### The four standard processes on one diagram (slides)

The slides draw four paths leaving one point on a p–V diagram: isobaric (horizontal), isochoric (vertical), isothermal (falling as 1/V) and adiabatic (falling faster). The summary table is in the next section. The one fact that ties them together: for a perfect gas, ΔU = nC\_V,m ΔT on every path, because U depends only on T.

### Free expansion versus reversible adiabatic expansion (slides concept check)

**Question.** A perfect gas in an insulated container is released into an evacuated second chamber. What happens to its temperature: does it rise, fall or stay the same?

**Answer: it stays the same.** Insulated means q = 0. Expanding into vacuum means pushing against nothing, so w = 0. Then ΔU = 0, and for a perfect gas U depends only on T, so ΔT = 0.

**Contrast.** In a reversible adiabatic expansion q = 0 too, but the gas pushes a piston and does work, so it cools. Same q = 0, different outcome, because the paths differ.

**Worked comparison.** 1.00 mol of a monatomic perfect gas at 300 K and 10.0 L doubles its volume to 20.0 L in an insulated container, by three routes.

| Route | w / kJ | q | ΔU / kJ | T\_f / K |
| --- | --- | --- | --- | --- |
| Free expansion into vacuum | 0 | 0 | 0 | 300 |
| Against a constant p\_ex = 0.50 bar \[beyond slides\] | −0.50 | 0 | −0.50 | 260 |
| Reversible adiabatic | −1.38 | 0 | −1.38 | 189 |

How each row is found:

- **Free:** w = 0, so ΔU = 0 and T\_f = T\_i.
- **Constant p\_ex:** w = −p\_exΔV = −(0.50 × 10⁵ Pa)(0.0100 m³) = −500 J. With q = 0, ΔU = −500 J = nC\_V,m ΔT, so ΔT = −500/(1.5 × 8.314) ≈ −40 K. (A stop holds the piston at 20.0 L. The gas ends at about 1.08 bar, still above p\_ex, so it really did push the piston all the way.)
- **Reversible:** T\_f = (300 K)(1/2)^(2/3) ≈ (300 K)(0.630) ≈ 189 K, and w = nC\_V,m ΔT = (1.5)(8.314)(−111) J ≈ −1.38 kJ.

The more work the gas does, the more it cools, and the reversible route does the most work (2A.3 again).

**The big trap.** TV^(γ−1) = constant and pV^γ = constant hold **only for reversible** adiabatic changes of a perfect gas. Free expansion is adiabatic but not reversible, and its end state (same T, larger V) is not on the reversible adiabat. Always check both conditions before using the formulas.

A real gas does cool slightly on free expansion, because its molecules attract each other; Topic 2D (the Joule experiment) covers that.

### Check your understanding: 2E

**Q2E-1.** A diatomic perfect gas at 300 K and 1.0 bar is compressed reversibly and adiabatically to 1/32 of its volume. Find T\_f and p\_f without a calculator.

**Q2E-2.** Show that, at the same point on a p–V diagram, the slope of a reversible adiabat is γ times the slope of the isotherm. Give the physical reason in one sentence.

**Q2E-3.** A perfect gas expands into a vacuum inside an insulated container. (a) Give q, w, ΔU and ΔT. (b) Why can you not use TV^(γ−1) = constant to find the final temperature?

## The four standard processes (summary)

For a perfect gas, ΔU = nC\_V,m ΔT and ΔH = nC\_p,m ΔT on every path; only q and w change from one process to another.

| Process | What is fixed | Path | w (on gas) | q | ΔU | ΔH |
| --- | --- | --- | --- | --- | --- | --- |
| Isochoric | V | p ∝ T | 0 | nC\_V,m ΔT | nC\_V,m ΔT | nC\_p,m ΔT |
| Isobaric | p | V ∝ T | −pΔV = −nRΔT | nC\_p,m ΔT | nC\_V,m ΔT | nC\_p,m ΔT |
| Isothermal (reversible) | T | pV = const | −nRT ln(V\_f/V\_i) | −w | 0 | 0 |
| Adiabatic (reversible) | q = 0 | pV^γ = const | nC\_V,m ΔT | 0 | nC\_V,m ΔT | nC\_p,m ΔT |

The first five columns follow the slides' table; the ΔH column follows from H = U + nRT.

### A five-step method for any perfect-gas process question

1. **Name the system and the process.** What is held fixed? Is it reversible? Is p\_ex given?
2. **Get ΔT**, from the gas law, or from TV^(γ−1) = const if the change is reversible and adiabatic.
3. **State functions first:** ΔU = nC\_V,m ΔT and ΔH = nC\_p,m ΔT. These need only ΔT.
4. **Then the work from the path:** w = −∫p\_ex dV (zero, −p\_exΔV, or −nRT ln(V\_f/V\_i)).
5. **Then heat by difference:** q = ΔU − w. Check the signs make physical sense: expansion gives w < 0, and heat flows in if the gas warms at constant volume.

For an adiabatic step, step 5 runs the other way: q = 0 is given, so w = ΔU.

## Answers to the check questions

Try each question before reading its answer; every number below was checked by calculation.

### 2A

**Q2A-1.** w > 0 (work is done on the gas), ΔU = 0 (perfect gas, constant T), so q = −w < 0. All the work done on the gas leaves again as heat to the bath.

**Q2A-2.** nRT = (2.00)(8.314)(300) J ≈ 4.99 kJ.

- (a) p\_ex = p\_f = nRT/V\_f, so w = −p\_fΔV = −nRT(ΔV/V\_f) = −(4.99 kJ)(5/10) ≈ **−2.49 kJ**, and q = **+2.49 kJ**.
- (b) w = −nRT ln 2 = −(4.99)(0.693) kJ ≈ **−3.46 kJ**, and q = **+3.46 kJ**.
- Reversible is larger in size. With p\_ex = p at every stage, none of the gas's push is wasted; on the diagram, the area under the isotherm beats the rectangle under p\_f.

**Q2A-3.** The calorimeter absorbs CΔT = (4.0 kJ K⁻¹)(2.5 K) = 10 kJ. The reaction released it, so ΔU = −10 kJ for 0.010 mol, which gives Δ\_c U = **−1.0 × 10³ kJ mol⁻¹**. Constant volume means q\_V = ΔU.

### Other kinds of work

**QW-1.** Gas pressure pushes outwards, so an increase in V moves with the gas's push: the gas does the work and w < 0. Tension pulls inwards, so an increase in L moves against the wire's pull: the surroundings do the work and w > 0.

**QW-2.** The film has two faces, so ΔA = 2ℓΔx = 2(0.050 m)(0.020 m) = 2.0 × 10⁻³ m². Then w = γΔA = (0.025)(2.0 × 10⁻³) J = **5.0 × 10⁻⁵ J** (50 μJ). Forgetting the factor 2 gives half this.

### 2B

**Q2B-1.** Δν\_g = 2 − 3 = −1, so ΔH\_m − ΔU\_m = −RT = **−2.48 kJ mol⁻¹**. Both are negative (a combustion), and ΔH is the more negative. At constant pressure the gas volume shrinks, so the atmosphere does about 2.5 kJ mol⁻¹ of work on the system, and that energy also leaves as heat.

**Q2B-2.** n = 2.0 mol, ΔT = 50 K, C\_p,m = (7/2)R, C\_V,m = (5/2)R.

- q = ΔH = (2.0)(3.5)(8.314)(50) J ≈ **+2.91 kJ**
- w = −nRΔT = −(2.0)(8.314)(50) J ≈ **−0.83 kJ**
- ΔU = (2.0)(2.5)(8.314)(50) J ≈ **+2.08 kJ**
- Check: q + w = 2.91 − 0.83 = 2.08 kJ.

**Q2B-3.** At constant pressure a gas expands a lot on heating (V ∝ T), doing pΔV = nRΔT of work, so each mole needs an extra R ≈ 8.3 J per kelvin. A liquid hardly expands, so its expansion work is negligible and C\_p ≈ C\_V.

### 2E

**Q2E-1.** Diatomic, so γ = 1.4 and γ − 1 = 0.4. Write 32 = 2⁵.

- T\_f = (300 K)(32)^0.4 = (300 K)(2²) = **1200 K**.
- p\_f = (1.0 bar)(32)^1.4 = 2⁷ bar = **128 bar**.
- Check: p\_f = p\_i (V\_i/V\_f)(T\_f/T\_i) = (1.0)(32)(4) = 128 bar.

**Q2E-2.** Isotherm: pV = const gives dp/dV = −p/V. Adiabat: pV^γ = const gives V^γ dp + γpV^(γ−1) dV = 0, so dp/dV = −γp/V, which is γ times steeper. Physically, in an adiabatic expansion T falls as well as V rising, so p drops faster; in an isothermal one, heat flows in and holds T up.

**Q2E-3.** (a) q = 0 (insulated), w = 0 (no opposing pressure), so ΔU = 0 and ΔT = 0. (b) TV^(γ−1) = const was derived assuming δw = −p dV, which needs a reversible change. Free expansion is irreversible, so the formula does not apply; it would wrongly predict cooling.

## Common mistakes

Most lost marks in this material come from signs, conditions and units, not from hard physics.

1. **Mixing sign conventions.** In this course w is work done **on** the system and ΔU = q + w. The tutorial slides use work done **by** the gas (ΔU = Q − W). Say which you are using.
2. **Using the gas pressure in an irreversible expansion.** w = −p\_exΔV uses the **external** pressure. The gas's own p goes in only when the change is reversible.
3. **Writing Δq, Δw or "heat content".** q and w are path functions. Write q and w, never Δq, and never say a body "contains heat".
4. **"Isothermal means no heat" or "adiabatic means no temperature change".** Both are backwards. Isothermal (perfect gas) means ΔU = 0, so q = −w, usually not zero. Adiabatic means q = 0, so T usually changes.
5. **Using TV^(γ−1) = const or pV^γ = const for free or irreversible adiabatic expansion.** Those laws need **reversible** and **adiabatic** and **perfect gas**. Free expansion of a perfect gas has ΔT = 0.
6. **Thinking ΔU = nC\_V,m ΔT is only for constant volume.** For a perfect gas it holds on every path. Likewise ΔH = nC\_p,m ΔT on every path. Do not use C\_p for ΔU.
7. **Using ΔH = q\_p outside its conditions.** It needs constant pressure **and** no additional (non-expansion) work.
8. **Counting liquids and solids in Δn\_g.** Only gas-phase species count. Check whether water is liquid or vapour at the stated temperature.
9. **Units.** 1 L bar = 100 J, 1 dm³ = 1 L = 10⁻³ m³, 1 Pa m³ = 1 J. RT is 2.48 **kJ** mol⁻¹ at 298 K; mixing J and kJ is the classic slip in ΔH = ΔU + Δn\_g RT.
10. **Celsius in a formula that needs kelvin.** ln(T\_f/T\_i), (V\_i/V\_f)^(γ−1) and a + bT + c/T² all need T in kelvin. A temperature **difference** is the same in °C and K.
11. **The c/T² integral.** ∫c/T² dT = −c(1/T₂ − 1/T₁). With c negative and T₂ > T₁ there is a double minus; check the sign of each term.
12. **ln versus log.** The isothermal work uses the natural log: ln 2 = 0.693, not 0.301.
13. **Wrong exponent in adiabatic formulas.** Temperature uses γ − 1 (or 1/c); pressure uses γ. Monatomic γ = 5/3, diatomic γ = 7/5 (vibrations frozen).
14. **"Reversible gives the least work" in an expansion.** For expansion, reversible gives the **most** work out. For compression, it needs the **least** work in.
15. **Forgetting the two faces of a soap film.** dA = 2ℓ dx.
