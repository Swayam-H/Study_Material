# Thermochemistry and state functions: Atkins 11e 2C, 2D (teaching notes)


## How to use these notes

These notes teach Atkins 11e Topics 2C (thermochemistry) and 2D (state functions, internal pressure and the Joule–Thomson effect) from scratch, in about 60 minutes of reading. Both topics are in the Quiz-2 range (Thermo-1 to Thermo-4).

**Sources.** Topic 2C has no slides, so Part A is taught from Atkins (book p.51–58). Topic 2D follows the course slides (`thermo.tex`, lines 842–862 and 1393–1739) and Atkins p.59–66. Anything that goes beyond both is marked **\[beyond the quiz\]**.

**Sign convention (same as the slides and Atkins).** w is the work done **on** the system, and the first law is

```latex
\Delta U = q + w, \qquad \mathrm{d}U = \mathrm{d}q + \mathrm{d}w, \qquad \mathrm{d}w = -p_\text{ex}\,\mathrm{d}V
```

So an expanding gas has w < 0, and heat flowing in has q > 0. Enthalpy is H = U + pV, and at constant pressure ΔH = q\_p.

**How each subsection runs.** First the idea in words, then the derivation with every step, then an exam-style worked example with numbers you can do without a calculator. Each topic ends with check-your-understanding questions; the answers are near the end, followed by a list of common mistakes and a one-screen formula summary.

**Homework.** The assigned items are solved in full at the end of each topic. Each solution has a marking scheme in the style of the course's Monsoon-2026 midsem rubric.

**Handy numbers for hand arithmetic.** R = 8.314 J K⁻¹ mol⁻¹ = 0.08314 L bar K⁻¹ mol⁻¹. RT at 298 K ≈ 2.48 kJ mol⁻¹ ≈ 24.8 L bar mol⁻¹. 1 bar = 10⁵ Pa; 1 L = 10⁻³ m³; 1 L bar = 100 J.

## Part A. Topic 2C: Thermochemistry

**There are no lecture slides for 2C.** The 10-Oct lecture log lists it as reading, and the homework sets seven items on it, so everything in Part A is taught from Atkins 11e p.51–58 in my own words.

**The one idea behind the whole topic.** Enthalpy is a state function. So ΔH for going from reactants to products does not care which route you take. Every result in 2C (Hess's law, formation enthalpies, Kirchhoff's law) is this one fact used in a different way.

**Why chemists care.** At constant pressure, the heat a reaction gives out is −ΔH (Topic 2B: ΔH = q\_p). So tabulated enthalpies tell you the heat from burning a fuel or digesting food without doing the experiment.

**Words you need.**

- **Thermochemistry**: the study of the heat released or absorbed by reactions and physical changes.
- **Exothermic**: releases heat to the surroundings. At constant pressure, ΔH < 0 (Atkins also says *exenthalpic*).
- **Endothermic**: absorbs heat. At constant pressure, ΔH > 0 (*endenthalpic*).
- **Calorimetry**: measuring that heat. At constant volume the heat equals ΔU (Topic 2A); at constant pressure it equals ΔH (Topic 2B).

## 2C.1 Standard enthalpy changes

### Intuition

The enthalpy change of a process depends on the conditions: the pressure, the temperature, and the phase of each substance. A table of ΔH values is only useful if everyone measures under the same agreed conditions. Those agreed conditions are the **standard state**.

### Standard state

> The **standard state** of a substance at a stated temperature is its **pure** form at exactly **1 bar**.

- Standard quantities carry a superscript °: ΔH°, H°\_m.
- Liquid ethanol at 298 K: its standard state is pure liquid ethanol at 1 bar and 298 K. Solid iron at 500 K: pure iron at 1 bar and 500 K.
- **Temperature is not part of the definition.** A standard state exists at every temperature. Tables use 298.15 K by convention, so a ΔH° with no temperature attached means 298.15 K.
- Solutions need a more careful definition (Topic 5E, not in this quiz).

A **standard enthalpy change** ΔH° is the enthalpy of the products in their standard states minus that of the reactants in their standard states, all at the same temperature.

### (a) Enthalpies of physical change

The enthalpy change per mole for a change of phase is the **standard enthalpy of transition**, Δ\_trsH°. Examples for water:

```latex
\text{H}_2\text{O(l)} \to \text{H}_2\text{O(g)} \qquad \Delta_\text{vap}H^\circ(373\ \text{K}) = +40.66\ \text{kJ mol}^{-1}
```

```latex
\text{H}_2\text{O(s)} \to \text{H}_2\text{O(l)} \qquad \Delta_\text{fus}H^\circ(273\ \text{K}) = +6.01\ \text{kJ mol}^{-1}
```

At 298 K, Δ\_vapH°(H₂O) = +44.0 kJ mol⁻¹, larger than at 373 K. Section 2C.3 explains why.

**Notation.** The process goes on the Δ as a subscript (Δ\_vapH), not on the H. You will still see the older H\_vap in many books.

The common transitions and their symbols (all molar quantities):

| Process | What happens | Symbol |
| --- | --- | --- |
| Transition | phase α → phase β | Δ\_trsH |
| Fusion | s → l | Δ\_fusH |
| Vaporization | l → g | Δ\_vapH |
| Sublimation | s → g | Δ\_subH |
| Mixing | pure components → mixture | Δ\_mixH |
| Solution | solute → solution | Δ\_solH |
| Hydration | X±(g) → X±(aq) | Δ\_hydH |
| Atomization | species → atoms(g) | Δ\_atH |
| Ionization | X(g) → X⁺(g) + e⁻(g) | Δ\_ionH |
| Electron gain | X(g) + e⁻(g) → X⁻(g) | Δ\_egH |
| Reaction | reactants → products | Δ\_rH |
| Combustion | compound + O₂ → CO₂(g), H₂O(l) (+ N₂) | Δ\_cH |
| Formation | elements → compound | Δ\_fH |
| Activation | reactants → activated complex | Δ^‡H |

### Derivation: two consequences of H being a state function

**1. Sublimation = fusion + vaporization.** Turn ice into vapour in two ways at the same temperature T:

- directly: s → g, enthalpy change Δ\_subH°;
- in two steps: s → l, then l → g, enthalpy change Δ\_fusH° + Δ\_vapH°.

Both routes start in the same state and end in the same state. H is a state function, so ΔH is the same on both:

```latex
\Delta_\text{sub}H^\circ = \Delta_\text{fus}H^\circ + \Delta_\text{vap}H^\circ \qquad (\text{all at the same } T)
```

Every Δ\_fusH° is positive (melting always absorbs heat), so Δ\_subH° > Δ\_vapH° at a given temperature.

**2. Reversing a process flips the sign.** Go A → B and then B → A. You are back where you started, so the total ΔH is zero:

```latex
\Delta H^\circ(\text{A} \to \text{B}) = -\Delta H^\circ(\text{B} \to \text{A})
```

So the enthalpy of condensation of water at 298 K is −44 kJ mol⁻¹.

**Worked example.** Estimate Δ\_subH° of ice at 0 °C. Use Δ\_fusH° = 6.0 kJ mol⁻¹ and Δ\_vapH° ≈ 45 kJ mol⁻¹ at 0 °C (a little above the 44 kJ mol⁻¹ at 25 °C). Then Δ\_subH° ≈ 6.0 + 45 = **51 kJ mol⁻¹**. The two steps must be at the same temperature; mixing 6.01 kJ (at 273 K) with 40.66 kJ (at 373 K) would be wrong.

### (b) Enthalpies of chemical change

A **thermochemical equation** is a balanced equation plus its standard enthalpy change:

```latex
\text{CH}_4\text{(g)} + 2\,\text{O}_2\text{(g)} \to \text{CO}_2\text{(g)} + 2\,\text{H}_2\text{O(l)} \qquad \Delta H^\circ = -890\ \text{kJ}
```

It means: pure, separate reactants in their standard states turn into pure, separate products in their standard states. The small enthalpy of mixing and separating is ignored (except for ions in solution).

The **standard reaction enthalpy** Δ\_rH° is defined from the standard molar enthalpies H°\_m(J) of each species J:

```latex
\Delta_\text{r}H^\circ = \sum_\text{products} \nu\, H^\circ_\text{m} - \sum_\text{reactants} \nu\, H^\circ_\text{m}
```

Here ν are the stoichiometric coefficients (positive numbers). Its unit is kJ mol⁻¹, where "per mole" means **per mole of reaction as written**. For 2A + B → 3C + D, it is per 2 mol A, or per 1 mol B, or per 3 mol C. This formula cannot be used directly, because absolute enthalpies H°\_m are unknown. Section 2C.2 fixes that.

The **standard enthalpy of combustion** Δ\_cH° is Δ\_rH° for complete oxidation of an organic compound to CO₂(g) and H₂O(l), plus N₂(g) if it contains nitrogen. For glucose, Δ\_cH° = −2808 kJ mol⁻¹: burning 1 mol releases 2808 kJ of heat at constant pressure.

**Worked example (per mole of reaction).** For 2H₂(g) + O₂(g) → 2H₂O(l), Δ\_rH° = −572 kJ mol⁻¹. Written as H₂(g) + ½O₂(g) → H₂O(l), it is −286 kJ mol⁻¹. Scaling the equation scales Δ\_rH°. Burning 4.0 g of H₂ (2.0 mol) at constant pressure releases 2 × 286 = 572 kJ.

### (c) Hess's law

> The standard enthalpy of an overall reaction is the sum of the standard enthalpies of the reactions it can be split into.

- **Why it is true:** H is a state function. Splitting a reaction into steps just picks a different route between the same start and end.
- The steps need not happen in real life. They only have to balance.
- **Rules:** reversing an equation flips the sign of its ΔH; multiplying an equation by a number multiplies its ΔH by that number.
- **Use:** you can get Δ\_rH° for a reaction that is hard to measure (too slow, or with side reactions) from reactions that are easy to measure, such as combustions.

**Recipe.** (1) Write the target equation. (2) For each species that appears in only one of the given equations, take that equation, reverse it if the species is on the wrong side, and scale it to the coefficient you need. (3) Add the equations and check that everything else cancels. (4) Add the ΔH values in the same way.

### Worked example: Atkins Example 2C.1 (Hess)

**Data.** Hydrogenation of propene, C₃H₆(g) + H₂(g) → C₃H₈(g): −124 kJ mol⁻¹. Combustion of propane, C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l): −2220 kJ mol⁻¹. Formation of water, H₂(g) + ½O₂(g) → H₂O(l): −286 kJ mol⁻¹. **Find** Δ\_cH° of propene.

**Target.** C₃H₆(g) + (9/2)O₂(g) → 3CO₂(g) + 3H₂O(l).

**Assemble.** C₃H₆ appears only in the hydrogenation, so keep it as written. The propane it makes has to be burned, so add the combustion. That leaves one H₂ too many on the left and one H₂O too many on the right, so add water formation reversed:

| Step | Equation | Δ\_rH° / kJ mol⁻¹ |
| --- | --- | --- |
| 1 | C₃H₆ + H₂ → C₃H₈ | −124 |
| 2 | C₃H₈ + 5O₂ → 3CO₂ + 4H₂O(l) | −2220 |
| 3 | H₂O(l) → H₂ + ½O₂ | +286 |
| Sum | C₃H₆ + (9/2)O₂ → 3CO₂ + 3H₂O(l) | **−2058** |

**Check the cancellation.** C₃H₈ is made in step 1 and used in step 2. H₂ is used in step 1 and made in step 3. O₂: 5 used, ½ made back, net 9/2. H₂O: 4 made, 1 used, net 3.

### Exam-style example: hydrogenation of benzene (Atkins Self-test 2C.1)

**Q.** Δ\_cH° of liquid benzene is −3268 kJ mol⁻¹ and of liquid cyclohexane is −3920 kJ mol⁻¹. Take Δ\_cH°(H₂) = −286 kJ mol⁻¹. Find Δ\_rH° for C₆H₆(l) + 3H₂(g) → C₆H₁₂(l).

**A.** Burn the reactants, then "un-burn" the product:

```latex
\Delta_\text{r}H^\circ = \Delta_\text{c}H^\circ(\text{C}_6\text{H}_6) + 3\,\Delta_\text{c}H^\circ(\text{H}_2) - \Delta_\text{c}H^\circ(\text{C}_6\text{H}_{12})
```

```latex
= -3268 + 3(-286) - (-3920) = -3268 - 858 + 3920 = -206\ \text{kJ mol}^{-1}
```

**General rule from this example:** from combustion data, Δ\_rH° = Σ ν Δ\_cH°(reactants) − Σ ν Δ\_cH°(products). This is the **opposite order** to the formation-enthalpy formula in 2C.2. Burning the reactants takes you down to CO₂ and H₂O; un-burning the products brings you back up.

**\[beyond the quiz\]** Hydrogenating one C=C bond in cyclohexene releases about 120 kJ mol⁻¹. Three isolated double bonds would give about −360 kJ mol⁻¹, but benzene gives only −206. The missing \~150 kJ mol⁻¹ is the extra stability of benzene's delocalized ring.

## 2C.2 Standard enthalpies of formation

### Intuition

We can never know the absolute enthalpy of a substance, just as there is no absolute height. Mountains are measured from sea level instead. Thermochemistry picks its own "sea level": **the elements in their most stable forms have enthalpy zero**. Every compound then gets an enthalpy relative to its elements, and one table of these numbers gives Δ\_rH° for any reaction.

### Definitions

> The **standard enthalpy of formation** Δ\_fH° of a substance is the standard reaction enthalpy for making **1 mol** of it from its elements in their **reference states**.

> The **reference state** of an element is its most stable state at the stated temperature and 1 bar.

- At 298 K: nitrogen is N₂(g), mercury is Hg(l), carbon is graphite, tin is white (metallic) tin.
- Exception: for phosphorus, white phosphorus is used because it is the most reproducible form, even though it is not the most stable.
- Example: Δ\_fH°(C₆H₆, l) refers to 6C(s, graphite) + 3H₂(g) → C₆H₆(l), and equals +49.0 kJ mol⁻¹.
- **An element in its reference state has Δ\_fH° = 0 at every temperature**, because its formation reaction is a "null" reaction such as N₂(g) → N₂(g).

**Standard state versus reference state (a favourite short question).** Every substance, in any phase, has a standard state: pure, at 1 bar. A reference state applies only to elements and picks out one phase or allotrope, the most stable one. Diamond has a standard state, but it is not carbon's reference state, so Δ\_fH°(C, diamond) = +1.9 kJ mol⁻¹, not zero.

**Ions in solution.** You cannot make a solution of cations alone. So by convention the hydrogen ion is given zero at every temperature:

```latex
\Delta_\text{f}H^\circ(\text{H}^+, \text{aq}) = 0
```

Then if Δ\_fH°(HBr, aq) = −122 kJ mol⁻¹, all of it is assigned to the anion: Δ\_fH°(Br⁻, aq) = −122 kJ mol⁻¹. Other ions follow step by step.

### Derivation: Δ\_rH° from formation enthalpies

Picture the reaction as a two-step route through the elements:

1. **"Unform" the reactants** into their elements. Unforming is formation reversed, so this step contributes −Σ ν Δ\_fH°(reactants).
2. **Form the products** from those same elements. This contributes +Σ ν Δ\_fH°(products).

The atoms are conserved, so the elements at the halfway point are exactly the ones needed. H is a state function, so the direct route has the same ΔH as this detour:

```latex
\Delta_\text{r}H^\circ = \sum_\text{products} \nu\, \Delta_\text{f}H^\circ - \sum_\text{reactants} \nu\, \Delta_\text{f}H^\circ
```

A compact form uses **stoichiometric numbers** ν\_J, which carry a sign: positive for products, negative for reactants.

```latex
\Delta_\text{r}H^\circ = \sum_\text{J} \nu_\text{J}\, \Delta_\text{f}H^\circ(\text{J})
```

For CH₄ + 2O₂ → CO₂ + 2H₂O: ν(CH₄) = −1, ν(O₂) = −2, ν(CO₂) = +1, ν(H₂O) = +2. Don't mix up ν (always positive) with ν\_J (signed).

### Worked example: combustion of methane

Data at 298 K, in kJ mol⁻¹: Δ\_fH°(CH₄, g) = −74.8; Δ\_fH°(CO₂, g) = −393.5; Δ\_fH°(H₂O, l) = −285.8; O₂(g) is an element in its reference state, so 0.

```latex
\Delta_\text{c}H^\circ = [-393.5 + 2(-285.8)] - [-74.8 + 2(0)] = -965.1 + 74.8 = -890.3\ \text{kJ mol}^{-1}
```

This matches the −890 kJ mol⁻¹ in the thermochemical equation of 2C.1.

### Exam-style example: running it backwards

**Q.** Δ\_cH° of liquid benzene is −3268 kJ mol⁻¹. Find Δ\_fH°(C₆H₆, l), using the CO₂ and H₂O(l) values above.

**A.** The combustion is C₆H₆(l) + (15/2)O₂ → 6CO₂(g) + 3H₂O(l). Apply the formula, with the benzene value x as the only unknown:

```latex
-3268 = [6(-393.5) + 3(-285.8)] - x = -3218.4 - x
```

```latex
x = \Delta_\text{f}H^\circ(\text{C}_6\text{H}_6, \text{l}) = -3218.4 + 3268 \approx +50\ \text{kJ mol}^{-1}
```

The tabulated value is +49.0; the small gap comes from rounding the data. A positive Δ\_fH° means benzene sits *above* its elements on the enthalpy scale.

### Exam-style example: a consistency check

**Q.** Δ\_fH°(H₂O, l) = −285.83 and Δ\_fH°(H₂O, g) = −241.82 kJ mol⁻¹. What is Δ\_vapH° of water at 298 K?

**A.** H₂O(l) → H₂O(g) is a "reaction" like any other: Δ\_vapH° = (−241.82) − (−285.83) = **+44.01 kJ mol⁻¹**, the value quoted in 2C.1. Watch the phase of water in every problem: using H₂O(g) instead of H₂O(l) changes Δ\_rH° by 44 kJ mol⁻¹ per mole of water.

## 2C.3 Temperature dependence of reaction enthalpies (Kirchhoff's law)

### Intuition

Tables give Δ\_rH° at 298 K, but reactions often run hot. Heat the reactants and the products separately. Each one's enthalpy rises at a rate equal to its heat capacity C\_p (because dH = C\_p dT at constant pressure). If the products have the larger total heat capacity, their enthalpy climbs faster, and Δ\_rH° = H(products) − H(reactants) becomes more positive as T rises. If the reactants have the larger heat capacity, Δ\_rH° becomes more negative. Only the **difference** of heat capacities matters.

### Derivation (show every step in an exam)

**Step 1. One substance.** At constant pressure, dH = C\_p dT (Topic 2B). Integrate from T₁ to T₂ for the standard molar enthalpy of species J, assuming no phase change in between:

```latex
H^\circ_\text{m}(\text{J}, T_2) = H^\circ_\text{m}(\text{J}, T_1) + \int_{T_1}^{T_2} C^\circ_{p,\text{m}}(\text{J})\, \mathrm{d}T
```

**Step 2. Combine with signed coefficients.** Multiply by ν\_J (positive for products, negative for reactants) and sum over all species. The left side becomes Δ\_rH°(T₂) and the first term on the right becomes Δ\_rH°(T₁):

```latex
\Delta_\text{r}H^\circ(T_2) = \Delta_\text{r}H^\circ(T_1) + \int_{T_1}^{T_2} \Delta_\text{r}C_p^\circ\, \mathrm{d}T \qquad \text{(Kirchhoff's law)}
```

**Step 3. Define the reaction heat capacity:**

```latex
\Delta_\text{r}C_p^\circ = \sum_\text{J} \nu_\text{J}\, C^\circ_{p,\text{m}}(\text{J}) = \sum_\text{products} \nu\, C^\circ_{p,\text{m}} - \sum_\text{reactants} \nu\, C^\circ_{p,\text{m}}
```

In differential form the law says d(Δ\_rH°)/dT = Δ\_rC\_p°: the slope of Δ\_rH° against T is the reaction heat capacity.

**Step 4. Constant Δ\_rC\_p°.** Individual heat capacities change with T, but their difference changes much less. Over a modest range, take Δ\_rC\_p° as constant and pull it out of the integral:

```latex
\Delta_\text{r}H^\circ(T_2) = \Delta_\text{r}H^\circ(T_1) + \Delta_\text{r}C_p^\circ\,(T_2 - T_1)
```

**Same result as a Hess cycle (a good alternative derivation).** To react at T₂: cool the reactants from T₂ to T₁, react at T₁, then heat the products from T₁ back to T₂. The three steps start and end in the same states as the direct reaction at T₂, so

```latex
\Delta_\text{r}H^\circ(T_2) = -\!\int_{T_1}^{T_2}\! C_p(\text{reactants})\,\mathrm{d}T + \Delta_\text{r}H^\circ(T_1) + \int_{T_1}^{T_2}\! C_p(\text{products})\,\mathrm{d}T
```

Combining the two integrals gives Kirchhoff's law again.

**Caveat: phase changes.** If a species melts or boils between T₁ and T₂, the simple formula fails. Split the range at the transition, add that species' Δ\_trsH°, and switch to the heat capacity of the new phase.

### Worked example: Atkins Example 2C.2 (Kirchhoff)

**Q.** Δ\_fH°(H₂O, g) = −241.82 kJ mol⁻¹ at 298 K. Estimate it at 100 °C. Molar C\_p in J K⁻¹ mol⁻¹: H₂O(g) 33.58; H₂(g) 28.84; O₂(g) 29.37. Assume they are constant.

**Step 1. Equation.** H₂(g) + ½O₂(g) → H₂O(g).

**Step 2. Δ\_rC\_p°.**

```latex
\Delta_\text{r}C_p^\circ = 33.58 - \left(28.84 + \tfrac{1}{2} \times 29.37\right) = 33.58 - 43.53 = -9.94\ \text{J K}^{-1}\,\text{mol}^{-1}
```

**Step 3. Apply the law.** T₂ − T₁ = 373 − 298 = 75 K. **Convert J to kJ** before adding:

```latex
\Delta_\text{f}H^\circ(373\ \text{K}) = -241.82 + (75)(-9.94 \times 10^{-3}) = -241.82 - 0.75 = -242.6\ \text{kJ mol}^{-1}
```

The change is under 1%. That is typical: Kirchhoff corrections are small unless the temperature range is hundreds of kelvin.

### Exam-style example: why Δ\_vapH° of water is smaller at 100 °C

**Q.** Δ\_vapH°(298 K) = 44.0 kJ mol⁻¹. C\_p,m(H₂O, l) = 75.3 and C\_p,m(H₂O, g) = 33.6 J K⁻¹ mol⁻¹. Estimate Δ\_vapH° at 373 K.

**A.** For H₂O(l) → H₂O(g), ΔC\_p = 33.6 − 75.3 = −41.7 J K⁻¹ mol⁻¹. So

```latex
\Delta_\text{vap}H^\circ(373\ \text{K}) \approx 44.0 + (75)(-41.7 \times 10^{-3}) = 44.0 - 3.1 = 40.9\ \text{kJ mol}^{-1}
```

The measured value is 40.66 kJ mol⁻¹. The liquid has a much larger heat capacity than the vapour, so as both are heated, the liquid's enthalpy catches up with the vapour's and the gap narrows.

### Quick sign judgement (no data needed)

For gases, C\_p,m ≈ (7/2)R for linear molecules and ≈ 4R for nonlinear ones (rotation counted, vibration not). For N₂ + 3H₂ → 2NH₃: Δ\_rC\_p° ≈ 2(4R) − 4 × (7/2)R = −6R ≈ −50 J K⁻¹ mol⁻¹ (tabulated values give −45). It is negative, so Δ\_rH° becomes more negative as T rises, by about 5 kJ mol⁻¹ per 100 K.

## 2C.4 Experimental techniques

Three instruments, and one conversion you must know: a bomb calorimeter measures ΔU, tables want ΔH, and the bridge is ΔH = ΔU + Δn\_g RT. (The bomb calorimeter and the Δn\_g RT bridge are introduced in Atkins 2A and 2B; 2C.4 adds DSC and ITC.)

### (a) Bomb calorimetry: measuring Δ\_rU

**Intuition.** Burn the sample inside a sealed steel vessel (the "bomb") filled with oxygen at high pressure. The bomb sits in a water bath, and the whole assembly is insulated. The volume cannot change, so no expansion work is done, w = 0, and the heat released equals −ΔU of the reaction.

**The calorimeter constant C** is the heat capacity of the whole assembly: q = CΔT. Find it by **calibration**, either

- electrically, q = IΔφt (current × potential difference × time), or
- by burning a standard such as benzoic acid, whose Δ\_cU is known accurately.

**Bookkeeping.** The heat released by n mol of reaction is absorbed by the calorimeter:

```latex
C\,\Delta T = -n\,\Delta_\text{c}U \qquad\Longrightarrow\qquad \Delta_\text{c}U = -\frac{C\,\Delta T}{n}
```

### Derivation: converting Δ\_rU to Δ\_rH

**Step 1.** From H = U + pV, for the reaction: Δ\_rH = Δ\_rU + Δ(pV).

**Step 2.** Solids and liquids have tiny molar volumes. For example, 1 bar × 0.1 L mol⁻¹ = 10 J mol⁻¹, negligible next to kJ mol⁻¹. So only the gases contribute to Δ(pV).

**Step 3.** Treat the gases as perfect: pV = n\_g RT. At a fixed temperature, Δ(pV) = Δn\_g RT, so

```latex
\Delta_\text{r}H = \Delta_\text{r}U + \Delta n_\text{g}\,RT
```

Here Δn\_g = (moles of gaseous products) − (moles of gaseous reactants) per mole of reaction as written. It is a pure number in this formula, and RT ≈ 2.48 kJ mol⁻¹ at 298 K.

**Physical reading.** If the gas amount shrinks (Δn\_g < 0), then at constant pressure the surroundings push in and do work on the system. That extra energy also leaves as heat, so more heat comes out at constant pressure than at constant volume: Δ\_rH is more negative than Δ\_rU.

### Worked example: Δn\_g RT for methane

**Q.** For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), Δ\_rH° = −890.3 kJ mol⁻¹ at 298 K. What does a bomb calorimeter measure?

**A.** Gases: 1 mol CO₂ on the right; 1 + 2 = 3 mol on the left (the water is liquid). So Δn\_g = 1 − 3 = −2.

```latex
\Delta_\text{r}U = \Delta_\text{r}H - \Delta n_\text{g}RT = -890.3 - (-2)(2.48) = -890.3 + 5.0 = -885.3\ \text{kJ mol}^{-1}
```

The correction is only about 0.6%, but exams test the sign. Counting the liquid water as a gas is the classic error.

### Worked example: calibrate, then measure

**Q.** Supplying 10.0 kJ electrically raises a bomb calorimeter's temperature by 2.00 K. Then 0.90 g of glucose (M = 180 g mol⁻¹) is burned in it. Given Δ\_cH° = −2808 kJ mol⁻¹, predict ΔT.

**A.**

1. C = 10.0 kJ / 2.00 K = **5.00 kJ K⁻¹**.
2. C₆H₁₂O₆(s) + 6O₂(g) → 6CO₂(g) + 6H₂O(l): Δn\_g = 6 − 6 = 0, so Δ\_cU = Δ\_cH = −2808 kJ mol⁻¹.
3. n = 0.90/180 = 0.0050 mol, so q = 0.0050 × 2808 = 14.0 kJ.
4. ΔT = q/C = 14.0/5.00 = **2.8 K**.

Run backwards, the same steps turn a measured ΔT into Δ\_cU, and then Δn\_g RT turns it into Δ\_cH.

### (b) Differential scanning calorimetry (DSC)

**Intuition.** Two small, identical pans are heated side by side: one holds the sample and one holds an inert reference that does nothing interesting. A computer heats both at the same steady rate and adjusts the power so their temperatures stay **equal**. While nothing happens, the sample needs only its ordinary heating power. When the sample melts or a protein unfolds (an endothermic process), it soaks up extra heat, and the computer must feed it extra power to keep up. The instrument records that **excess power**.

- "Differential": sample compared with reference.
- "Scanning": the temperature is swept linearly, T = T₀ + αt, where α is the **scan rate** (K s⁻¹).

**Derivation of the excess heat capacity.** With no process, heating by ΔT takes q\_p = C\_pΔT. During a process the sample needs q\_p + q\_p,ex. Treat the extra as an apparent rise in heat capacity, from C\_p to C\_p + C\_p,ex. Since ΔT = αt and the excess power is P\_ex = q\_p,ex/t,

```latex
C_{p,\text{ex}} = \frac{q_{p,\text{ex}}}{\Delta T} = \frac{q_{p,\text{ex}}}{\alpha t} = \frac{P_\text{ex}}{\alpha}
```

**From the curve to ΔH.** A plot of C\_p,ex against T is a **thermogram**. In a small step dT, the extra heat absorbed is C\_p,ex dT, and at constant pressure heat equals enthalpy change. Add up the steps from where the process starts (T₁) to where it ends (T₂):

```latex
\Delta H = \int_{T_1}^{T_2} C_{p,\text{ex}}\, \mathrm{d}T \qquad \text{(the area under the peak)}
```

**How to read a thermogram.**

- **Flat baseline**: no process, so no excess heat capacity.
- **Peak**: the process is happening. For protein unfolding, the peak position is the melting temperature T\_m. Atkins' example (ubiquitin) keeps its native shape up to about 45 °C, then unfolds endothermically.
- **Peak area** = ΔH of the process. A peak pointing up means endothermic (extra power needed); an exothermic process needs less power and shows a dip.
- **Baseline after ≠ baseline before**: the product state has a different heat capacity. The height of that step is ΔC\_p of the transition. Unfolded proteins usually have a larger C\_p than folded ones.

&#91;embedded content: DSC thermogram (schematic): peak, area and baseline step\]

Schematic thermogram of a protein unfolding. The shaded area between the curve and the baseline is ΔH, the peak sits at T\_m, and the rise from the native baseline (dashed) to the unfolded baseline is ΔC\_p.

### Worked example: from power to C\_p,ex

**Q.** At a scan rate of 1.0 K min⁻¹, a DSC needs 0.10 mW of excess power. What is C\_p,ex?

**A.** α = 1.0 K min⁻¹ = (1/60) K s⁻¹. C\_p,ex = P\_ex/α = (1.0 × 10⁻⁴ W) × (60 s K⁻¹) = 6.0 × 10⁻³ J K⁻¹ = **6.0 mJ K⁻¹**.

### Worked example: integrating a peak

**Q.** A protein's thermogram has a roughly triangular peak 8.0 mJ K⁻¹ high with a base 20 K wide, on a flat baseline. The sample holds 2.0 × 10⁻⁷ mol of protein. Find the molar enthalpy of unfolding.

**A.** Area = ½ × base × height = ½ × 20 K × 8.0 mJ K⁻¹ = 80 mJ = 0.080 J. Divide by the amount: ΔH = 0.080 J / 2.0 × 10⁻⁷ mol = 4.0 × 10⁵ J mol⁻¹ = **+400 kJ mol⁻¹**. It is positive because unfolding breaks many weak interactions. On a real curve, approximate the shape with triangles or trapezoids, or count grid squares (each square = its width in K × its height in mJ K⁻¹).

### (c) Isothermal titration calorimetry (ITC), briefly

ITC is also differential. A reference cell and a sample cell, each with a small heater, are held at a fixed temperature difference. Small, precise volumes of a second reagent are injected into the sample cell, and the instrument records the power needed to hold the temperatures. An exothermic reaction needs less power, an endothermic one more. For injection i, the heat is q\_i = P\_i Δt, and it equals V Δ\_rH Δc\_i, where V is the solution volume and Δc\_i the change in concentration of unreacted reagent. Summing over all injections gives Δ\_rH.

## 2C homework solutions with marking scheme

Every problem statement here was read from the Atkins PDF (Focus 2 exercises and problems, book p.72–73). Examples 2C.1 and 2C.2, also on the list, are worked in full in 2C.1 and 2C.3.

**How the marking schemes work.** They copy the style of the course's Monsoon-2026 midsem rubric:

- each step is marked all-or-nothing, in units of 0.5 or 1 mark;
- any equivalent method that is internally consistent earns full marks;
- exercises (E) are out of 5 and problems (P) out of 10.

Under each table, "Where marks are lost" lists the usual slips.

**Data used** (Atkins Resource section): M(C₁₀H₈) = 128.18 g mol⁻¹, M(C₆H₅OH) = 94.12 g mol⁻¹, Δ\_cH°(C₆H₅OH, s) = −3054 kJ mol⁻¹. RT = 2.479 kJ mol⁻¹ at 298 K.

### E2C.4(a). Bomb-calorimeter constant, then phenol (5 marks)

**Problem.** Burning 120 mg of naphthalene, C₁₀H₈(s), in a bomb calorimeter raised the temperature by 3.05 K. Find the calorimeter constant. By how much will the temperature rise when 150 mg of phenol, C₆H₅OH(s), is burned under the same conditions? Given: Δ\_cH(C₁₀H₈, s) = −5157 kJ mol⁻¹.

**Step 1. The bomb measures ΔU, so convert.** At constant volume, q\_V = ΔU. The combustion is C₁₀H₈(s) + 12O₂(g) → 10CO₂(g) + 4H₂O(l), so Δn\_g = 10 − 12 = −2.

```latex
\Delta_\text{c}U = \Delta_\text{c}H - \Delta n_\text{g}RT = -5157 - (-2)(2.479) = -5152\ \text{kJ mol}^{-1}
```

**Step 2. Heat released by the naphthalene.**

```latex
n = \frac{0.120\ \text{g}}{128.18\ \text{g mol}^{-1}} = 9.36\times10^{-4}\ \text{mol}, \qquad q = n\,|\Delta_\text{c}U| = (9.36\times10^{-4})(5152) = 4.82\ \text{kJ}
```

**Step 3. Calorimeter constant.**

```latex
C = \frac{q}{\Delta T} = \frac{4.82\ \text{kJ}}{3.05\ \text{K}} = 1.58\ \text{kJ K}^{-1}
```

**Step 4. Heat released by the phenol.** C₆H₅OH(s) + 7O₂(g) → 6CO₂(g) + 3H₂O(l), so Δn\_g = 6 − 7 = −1. Then Δ\_cU = −3054 + 2.48 = −3051.5 kJ mol⁻¹.

```latex
n = \frac{0.150\ \text{g}}{94.12\ \text{g mol}^{-1}} = 1.594\times10^{-3}\ \text{mol}, \qquad q = (1.594\times10^{-3})(3051.5) = 4.86\ \text{kJ}
```

**Step 5. Temperature rise.**

```latex
\Delta T = \frac{q}{C} = \frac{4.86\ \text{kJ}}{1.58\ \text{kJ K}^{-1}} = 3.08\ \text{K}
```

**Check.** If you skip the Δn\_g RT corrections, you get C = 1.583 kJ K⁻¹ and ΔT = 3.07 K. The corrections change only the third significant figure, so both answers are accepted. The two samples release almost the same heat (4.82 and 4.86 kJ), so similar temperature rises make sense.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | States that the bomb gives q\_V = ΔU, and converts with Δn\_g = −2 (or says why the correction is negligible) | 1 |
| 2 | n(C₁₀H₈) = 9.36 × 10⁻⁴ mol (mg converted to g) and q = 4.82 kJ | 1 |
| 3 | C = 1.58 kJ K⁻¹, with units | 1 |
| 4 | Δ\_cH°(phenol) from tables, balanced equation, n = 1.59 × 10⁻³ mol, q = 4.86 kJ | 1 |
| 5 | ΔT = 3.08 K (3.07 K accepted) | 1 |
|  | **Total** | **5** |

**Where marks are lost:** treating mg as g (a factor of 1000); mixing J and kJ in C; using naphthalene's Δ\_cH for phenol; counting H₂O(l) as a gas in Δn\_g; a negative C or ΔT.

### E2C.6(a). Δ\_rH from Δ\_rU (5 marks)

**Problem.** For C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g), Δ\_rU° = −1373 kJ mol⁻¹ at 298 K. Calculate Δ\_rH°.

**Step 1. Relation.** From H = U + pV, Δ\_rH = Δ\_rU + Δ(pV). Condensed phases contribute almost nothing, and the gases are treated as perfect, so Δ\_rH = Δ\_rU + Δn\_g RT.

**Step 2. Count the gas.** The products have 2 + 3 = 5 mol of gas (here the water is a **gas**). The reactants have 3 mol of O₂; ethanol is a liquid and does not count. So Δn\_g = 5 − 3 = **+2**.

**Step 3. Substitute.**

```latex
\Delta_\text{r}H^\circ = -1373 + (2)(2.479) = -1368\ \text{kJ mol}^{-1}
```

**Step 4. Sign check.** Δn\_g > 0, so at constant pressure the reaction pushes back the atmosphere and some energy leaves as work. Less heat is released at constant pressure, so |Δ\_rH| < |Δ\_rU|. ✓

Part (b) works the same way: Δn\_g = 14 − 15 = −1, giving Δ\_rH° = −775.2 kJ mol⁻¹.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | Δ\_rH = Δ\_rU + Δn\_g RT stated, or derived from H = U + pV | 1 |
| 2 | Δn\_g = +2: ethanol excluded, gaseous water included | 1.5 |
| 3 | Substitution with RT in kJ mol⁻¹ | 1 |
| 4 | Δ\_rH° = −1368 kJ mol⁻¹ | 1 |
| 5 | Sign check or physical interpretation | 0.5 |
|  | **Total** | **5** |

**Where marks are lost:** Δn\_g = +1 (ethanol counted as a gas) or −1 (water counted as a liquid); adding RT = 2479 J straight to kJ; the relation written backwards, as Δ\_rU = Δ\_rH + Δn\_g RT.

### P2C.1. Body heat (10 marks)

**Problem.** An average human produces about 10 MJ of heat a day through metabolism. (a) If the body were an isolated system of mass 65 kg with the heat capacity of water, what would its temperature rise be? (b) The body actually loses heat mainly by evaporating water. What mass of water must evaporate each day to keep the temperature constant?

**(a) Step 1. Principle.** An isolated body keeps all the heat, so q = m c\_s ΔT, with the specific heat capacity of water c\_s = 4.18 J K⁻¹ g⁻¹.

**Step 2. Substitute in consistent units** (10 MJ = 1.0 × 10⁷ J; 65 kg = 6.5 × 10⁴ g):

```latex
\Delta T = \frac{q}{m\,c_s} = \frac{1.0\times10^{7}\ \text{J}}{(6.5\times10^{4}\ \text{g})(4.18\ \text{J K}^{-1}\,\text{g}^{-1})} = 37\ \text{K}
```

**Step 3. Comment.** Body temperature would climb from 37 °C to about 74 °C in one day, which would be fatal. So the body must shed this heat continuously.

**(b) Step 4. Principle.** At constant pressure, evaporating n mol of water absorbs nΔ\_vapH, so we need nΔ\_vapH = q. Use Δ\_vapH(H₂O) = 44.0 kJ mol⁻¹ (the 298 K value; at 37 °C, Kirchhoff gives 43.5).

**Step 5. Amount, then mass.**

```latex
n = \frac{1.0\times10^{7}\ \text{J}}{4.40\times10^{4}\ \text{J mol}^{-1}} = 227\ \text{mol}, \qquad m = (227\ \text{mol})(18.02\ \text{g mol}^{-1}) = 4.1\times10^{3}\ \text{g} = 4.1\ \text{kg}
```

Using 43.5 kJ mol⁻¹ gives 4.14 kg, the same to two significant figures. **Assumptions:** all the heat leaves by evaporation, and the heat capacity is constant over the range.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| (a) principle | q = m c\_s ΔT (or CΔT) for an isolated system | 1.5 |
| (a) data | c\_s = 4.18 J K⁻¹ g⁻¹, with m and q in consistent units | 1 |
| (a) answer | ΔT ≈ 37 K, with units | 1.5 |
| (a) comment | Unsurvivable, so the body must shed heat | 0.5 |
| (b) principle | Heat removed = nΔ\_vapH (enthalpy, because the pressure is constant) | 1.5 |
| (b) data | Chooses Δ\_vapH and states its temperature | 1 |
| (b) amount | n ≈ 227 mol | 1 |
| (b) answer | m ≈ 4.1 kg | 1.5 |
| Assumptions | All heat lost by evaporation; constant heat capacity | 0.5 |
|  | **Total** | **10** |

**Where marks are lost:** using kg with c\_s in J K⁻¹ g⁻¹ (a factor of 1000); giving the amount in mol instead of the mass; using Δ\_vapH at 373 K without comment (40.7 kJ mol⁻¹ gives 4.4 kg, so the "data" mark is lost); using Δ\_fusH instead of Δ\_vapH.

### P2C.8. Silylene reactions (10 marks)

**Problem.** Given Δ\_fH°(SiH₂) = +274 kJ mol⁻¹, Δ\_fH°(SiH₄) = +34.3 kJ mol⁻¹ and Δ\_fH°(Si₂H₆) = +80.3 kJ mol⁻¹, calculate Δ\_rH° for (a) SiH₄(g) → SiH₂(g) + H₂(g) and (b) Si₂H₆(g) → SiH₂(g) + SiH₄(g).

**Step 1. Principle.** Use Hess's law through the elements:

```latex
\Delta_\text{r}H^\circ = \sum_\text{products}\nu\,\Delta_\text{f}H^\circ - \sum_\text{reactants}\nu\,\Delta_\text{f}H^\circ
```

H₂(g) is an element in its reference state, so Δ\_fH°(H₂) = 0.

**Step 2. (a)**

```latex
\Delta_\text{r}H^\circ = [274 + 0] - [34.3] = +239.7 \approx +240\ \text{kJ mol}^{-1}
```

**Step 3. (b)**

```latex
\Delta_\text{r}H^\circ = [274 + 34.3] - [80.3] = +228.0\ \text{kJ mol}^{-1}
```

**Step 4. Interpretation.** Both reactions are strongly endothermic: making SiH₂ means breaking Si–H bonds in (a) and the Si–Si bond in (b). That fits silylene being a high-energy, reactive intermediate that appears only in the thermal (high-temperature) decomposition of silanes.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | Δ\_rH° = ΣνΔ\_fH°(products) − ΣνΔ\_fH°(reactants) stated, or the route through the elements | 2 |
| 1 | Δ\_fH°(H₂, g) = 0, with the reason (element in its reference state) | 1 |
| 2 | (a) Correct substitution | 1.5 |
| 2 | (a) +240 kJ mol⁻¹, with sign and units | 1.5 |
| 3 | (b) Correct substitution | 1.5 |
| 3 | (b) +228 kJ mol⁻¹, with sign and units | 1.5 |
| 4 | Endothermic, consistent with bond breaking or a reactive intermediate | 1 |
|  | **Total** | **10** |

**Where marks are lost:** reactants minus products (giving −240 and −228); giving H₂ a non-zero Δ\_fH°; leaving out units or the sign.

### P2C.10. Enthalpy of unfolding of lysozyme from a DSC scan (10 marks)

**Problem.** Atkins Fig. 2.1 shows the DSC scan of hen white lysozyme: C\_p,ex in mJ °C⁻¹ against θ in °C, from 30 to 90 °C. Determine the enthalpy of unfolding by integrating the curve, and the change in heat capacity that accompanies the transition.

**Reading the figure.** The curve starts at 0 near 30 °C, peaks at about 8.9 mJ °C⁻¹ near 61 °C, and levels off at about 1.5 mJ °C⁻¹ by 90 °C. I read the values below from the printed figure (digitized from the page image). Your readings will differ by about ±0.1, which doesn't change the answer at two significant figures.

| θ / °C | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C\_p,ex / mJ °C⁻¹ | 0.0 | 0.1 | 0.6 | 1.5 | 3.2 | 6.4 | 8.8 | 8.4 | 6.7 | 4.6 | 2.9 | 1.8 | 1.5 |

**Step 1. Principle.** At constant pressure:

```latex
\Delta H = \int_{T_1}^{T_2} C_{p,\text{ex}}\,\mathrm{d}T
```

This is the area under the curve. A step of 1 °C is the same size as 1 K, so mJ °C⁻¹ × °C = mJ.

**Step 2. Integrate (trapezium rule, step h = 5 °C).** The bracket is half the two end values plus the sum of the eleven interior values:

```latex
A = h\left[\tfrac{1}{2}(y_\text{first} + y_\text{last}) + \sum y_\text{interior}\right] = 5\left[\tfrac{1}{2}(0 + 1.5) + 45.0\right] = 5 \times 45.75 \approx 229\ \text{mJ}
```

Counting squares works too. Each grid square is 15 °C × 1.5 mJ °C⁻¹ = 22.5 mJ, and the curve encloses about 10 squares, so about 230 mJ.

**Step 3. Baseline.** After the transition the curve settles at 1.5 mJ °C⁻¹, not 0, because the unfolded protein has a higher heat capacity. That plateau is not part of the unfolding enthalpy. Use a baseline that steps from 0 to 1.5 mJ °C⁻¹ at T\_m ≈ 61 °C, and subtract its area, 1.5 × (90 − 61) ≈ 44 mJ:

```latex
\Delta H \approx 229 - 44 \approx 185\ \text{mJ} \approx +0.19\ \text{J}
```

A more careful baseline, which rises in step with the fraction of protein unfolded, gives 187 mJ: the same to two significant figures. Integrating all the way down to zero instead gives 0.23 J. That over-counts, but it is accepted if the student says which baseline they used.

**Step 4. Change in heat capacity.**

```latex
\Delta C_p = C_p(\text{unfolded}) - C_p(\text{native}) \approx 1.5 - 0 = +1.5\ \text{mJ K}^{-1}
```

**Step 5. Sanity check and note.** A triangle with the peak height (8.9 mJ °C⁻¹) and twice the half-width (2 × 23 °C) gives ½ × 8.9 × 46 ≈ 205 mJ, the same size. ΔH > 0, so unfolding is endothermic. The problem gives no amount of protein, so the answer is the enthalpy for the sample in the cell (in J), not per mole.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | ΔH = ∫C\_p,ex dT = area between the curve and the baseline | 2 |
| 2 | Values read from the curve and a method set up (trapezia, triangle or squares) | 2 |
| 2 | Correct area with units; notes 1 °C = 1 K | 2 |
| 3 | Recognises the post-transition baseline and subtracts it (or justifies not doing so) | 1.5 |
| 3 | ΔH ≈ +0.19 J (0.18–0.23 J accepted with a stated method); endothermic | 1 |
| 4 | ΔC\_p ≈ +1.5 mJ K⁻¹ from the difference between the baselines | 1.5 |
|  | **Total** | **10** |

**Where marks are lost:** quoting the peak height (8.9 mJ °C⁻¹) as ΔH; dividing by an amount of protein the problem never gives; leaving the answer in mJ °C⁻¹; skipping the ΔC\_p part; reading 1.5 mJ °C⁻¹ as the start value instead of the end value.

## 2C check your understanding

Try each in the answer-in-the-box style of Quiz-1, then check the answers near the end.

**C1.** At 298 K, Δ\_fH°(Br₂, l) = 0 but Δ\_fH°(Br₂, g) = +30.9 kJ mol⁻¹. Explain both values in one or two sentences each.

**C2.** A reaction at 298 K has Δn\_g = +1 and Δ\_rU = −100.0 kJ mol⁻¹. Find Δ\_rH. Is more heat released in a bomb calorimeter or in an open beaker, and why?

**C3.** (a) Δ\_rH°(298 K) = −50.0 kJ mol⁻¹ and Δ\_rC\_p° = +20 J K⁻¹ mol⁻¹, constant. Estimate Δ\_rH° at 398 K. (b) In a DSC scan of a protein, the baseline after the peak sits higher than the baseline before it. What does that tell you?

## Part B. Topic 2D: State functions and exact differentials

**Sources.** This part follows the course slides (`thermo.tex`: "State functions and exact differentials" at line 842, and the π\_T and Joule–Thomson frames at lines 1393–1739) and Atkins 11e p.59–66. Where Atkins goes beyond the slides (the exactness test, α and κ\_T), I say so.

**The big idea.** U and H are state functions, so their small changes dU and dH can be written in terms of small changes of two variables, with partial derivatives as coefficients. Each partial derivative turns out to be something physical: a heat capacity, an internal pressure, an expansion coefficient, a Joule–Thomson coefficient. The rules of partial derivatives then link them to each other. Topic 2D shows how that works.

**Toolkit you will use** (Atkins, The chemist's toolkit 9 in Topic 2A). For f(x, y):

```latex
\mathrm{d}f = \left(\frac{\partial f}{\partial x}\right)_y \mathrm{d}x + \left(\frac{\partial f}{\partial y}\right)_x \mathrm{d}y
```

- The subscript says which variable is held fixed. (∂U/∂T)\_V and (∂U/∂T)\_p are **different** quantities.
- Mixed second derivatives do not depend on the order: ∂²f/∂x∂y = ∂²f/∂y∂x.
- Reciprocal: (∂y/∂x)\_z = 1/(∂x/∂y)\_z.
- **Euler chain relation**, for three variables linked by one equation (like p, V, T):

```latex
\left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial z}\right)_x \left(\frac{\partial z}{\partial x}\right)_y = -1
```

The minus sign surprises everyone. Memory aid: each variable appears once on top, once on the bottom and once as the subscript.

## 2D.1 Exact and inexact differentials

### Intuition (the slide's hiking analogy)

On a hike, your **change in altitude** depends only on where you start and where you finish. That makes altitude like a state function. The **distance you walk** depends on the trail you take, like a path function. Internal energy U is like altitude. Heat q and work w are like distance walked: they describe the journey, not the place. A state has no "heat content", so there is no such thing as q\_A.

### Definitions

- **State function**: depends only on the current state, not on its history. Examples: U, H, p, V, T (and later S).
- **Path function**: depends on the route between states. Examples: q and w.
- **Exact differential**: a small change whose integral depends only on the end points. dU is exact:

```latex
\int_\text{A}^\text{B} \mathrm{d}U = U_\text{B} - U_\text{A}, \qquad \oint \mathrm{d}U = 0
```

- **Inexact differential**: a small quantity whose integral depends on the path, so the path must be specified. The slides write it with a barred d, đq and đw:

```latex
\int_\text{A}^\text{B} \text{đ}q = q \;(\text{not } q_\text{B} - q_\text{A}), \qquad \oint \text{đ}q \neq 0 \text{ in general}
```

Notice that the integral of đq is just q, the heat for that path, never a "Δq".

The first law in differential form adds two inexact pieces to give an exact one:

```latex
\mathrm{d}U = \text{đ}q + \text{đ}w = \text{đ}q - p\,\mathrm{d}V \qquad (\text{quasi-static})
```

### Worked example: Atkins Example 2D.1 plus Self-test 2D.1 (same ΔU, different q and w)

**Q.** 1.0 mol of perfect gas at 298 K doubles its volume isothermally, from 24.8 L to 49.6 L. Find q, w and ΔU for (1) free expansion into vacuum, (2) expansion against a constant external pressure of 0.50 bar, (3) reversible expansion.

**Key fact.** U of a perfect gas depends only on T. The process is isothermal, so ΔU = 0 on every path, and therefore q = −w.

| Path | w | q | ΔU |
| --- | --- | --- | --- |
| (1) Free expansion, p\_ex = 0 | 0 | 0 | 0 |
| (2) Against p\_ex = 0.50 bar | −p\_exΔV = −0.50 × 24.8 L bar = −12.4 L bar = −1.24 kJ | +1.24 kJ | 0 |
| (3) Reversible | −nRT ln(V\_f/V\_i) = −2.48 × ln 2 kJ = −1.72 kJ | +1.72 kJ | 0 |

Same start, same end, same ΔU, but three different values of q and of w. That is exactly what "state function" and "path function" mean. (ln 2 ≈ 0.693, and 1 L bar = 100 J.)

### The test for exactness \[beyond the slides; from Atkins Toolkit 9\]

Suppose a differential is written as

```latex
\mathrm{d}f = M(x,y)\,\mathrm{d}x + N(x,y)\,\mathrm{d}y
```

**Test:** df is exact if and only if

```latex
\left(\frac{\partial M}{\partial y}\right)_x = \left(\frac{\partial N}{\partial x}\right)_y
```

**Why.** If df is exact, a function f exists with M = (∂f/∂x)\_y and N = (∂f/∂y)\_x. Then ∂M/∂y and ∂N/∂x are both the mixed second derivative ∂²f/∂x∂y, and mixed derivatives don't depend on the order. If the cross-derivatives differ, no such f can exist, so the differential is inexact.

### Worked example: a maths warm-up

**Q.** Is df = (2xy + 3) dx + (x² + 4y) dy exact? If so, find f.

**A.** M = 2xy + 3, so ∂M/∂y = 2x. N = x² + 4y, so ∂N/∂x = 2x. They are equal, so df is **exact**.

To find f, integrate M with respect to x, holding y fixed: f = x²y + 3x + g(y). Differentiate with respect to y and match to N: x² + g′(y) = x² + 4y, so g = 2y². Hence f = x²y + 3x + 2y² (+ a constant).

By contrast, y dx − x dy has ∂M/∂y = 1 but ∂N/∂x = −1, so it is **inexact**.

### Exam-style example: q and w are inexact, and q/T is exact

**Q.** For a reversible change of a perfect gas with constant C\_V, use T and V as variables. Test dU, đw and đq for exactness.

**A.** Write each one as M dT + N dV and compare ∂M/∂V with ∂N/∂T.

- **dU = C\_V dT + 0 dV.** ∂C\_V/∂V = 0 (C\_V is constant) and ∂(0)/∂T = 0. Equal, so **exact**.
- **đw = −p dV = 0 dT − (nRT/V) dV.** ∂(0)/∂V = 0, but ∂(−nRT/V)/∂T = −nR/V. Unequal, so **inexact**.
- **đq = dU − đw = C\_V dT + (nRT/V) dV.** ∂C\_V/∂V = 0, but ∂(nRT/V)/∂T = nR/V. Unequal, so **inexact**.

Now divide đq by T:

```latex
\frac{\text{đ}q_\text{rev}}{T} = \frac{C_V}{T}\,\mathrm{d}T + \frac{nR}{V}\,\mathrm{d}V
```

Now ∂(C\_V/T)/∂V = 0 and ∂(nR/V)/∂T = 0. Equal, so it is **exact**. Dividing by T turns heat into the differential of a state function. That state function is the entropy, dS = đq\_rev/T, the centre of Topic 3A. Mathematicians call 1/T an *integrating factor*.

## 2D.2 Changes in internal energy

### (a) dU = C\_V dT + π\_T dV

**Setting.** Take a closed system of fixed composition. An equation of state links p, V and T, so any two of them fix the state. Choose T and V; this gives the simplest formulas for U. The total differential of U(T, V) is

```latex
\mathrm{d}U = \left(\frac{\partial U}{\partial T}\right)_V \mathrm{d}T + \left(\frac{\partial U}{\partial V}\right)_T \mathrm{d}V
```

Both coefficients have names:

```latex
C_V = \left(\frac{\partial U}{\partial T}\right)_V \qquad\qquad \pi_T \equiv \left(\frac{\partial U}{\partial V}\right)_T \;\;(\text{internal pressure})
```

```latex
\mathrm{d}U = C_V\,\mathrm{d}T + \pi_T\,\mathrm{d}V
```

- **π\_T has units of pressure**: J m⁻³ = N m⁻² = Pa. That is why it is called the internal pressure.
- It measures how U changes when the molecules are moved further apart **at constant temperature**.
- "U of a perfect gas depends only on T" (Lecture 2) is exactly the statement π\_T = 0.

### Molecular interpretation of π\_T and its sign

At constant T, the average kinetic energy of the molecules is fixed. So any change in U on expansion must come from the **potential energy** of intermolecular interactions. Think of the intermolecular potential curve: a steep repulsive wall at short range and an attractive well beyond it.

- **Perfect gas**: no interactions, so moving molecules apart changes nothing: **π\_T = 0**.
- **Attractions dominate** (most gases at ordinary densities, and liquids): pulling molecules apart lifts them up out of the well. The potential energy rises, so U rises with V: **π\_T > 0**.
- **Repulsions dominate** (very high density, molecules jammed together): letting them move apart lets them slide down the repulsive wall. The potential energy falls: **π\_T < 0**.

### π\_T from an equation of state

A general result, derived in Atkins **Topic 3E** (after the quiz range), lets you calculate π\_T from any equation of state. Use it; you don't need to derive it.

```latex
\pi_T = T\left(\frac{\partial p}{\partial T}\right)_V - p \qquad (\text{thermodynamic equation of state})
```

**Perfect gas.** p = nRT/V, so (∂p/∂T)\_V = nR/V. Then

```latex
\pi_T = T\cdot\frac{nR}{V} - p = p - p = 0 \;\checkmark
```

**van der Waals gas.** Molar form: p = RT/(V\_m − b) − a/V\_m². At constant V\_m, only the first term depends on T, so (∂p/∂T)\_V = R/(V\_m − b). Then

```latex
\pi_T = \frac{RT}{V_\text{m} - b} - p = \frac{RT}{V_\text{m} - b} - \left(\frac{RT}{V_\text{m} - b} - \frac{a}{V_\text{m}^2}\right) = \frac{a}{V_\text{m}^2}
```

Only the **attraction** parameter a survives, so a van der Waals gas always has π\_T > 0. The repulsion parameter b cancels out, so this model can never give the negative π\_T of a repulsion-dominated fluid.

**How big is it?** (numbers from the slides; a in L² bar mol⁻²)

| Gas | V\_m | p | π\_T = a/V\_m² |
| --- | --- | --- | --- |
| N₂ at 298 K (a = 1.370) | 24.8 L | 1 bar | 1.370/24.8² ≈ 0.002 bar |
| CO₂ at 300 K (a = 3.640), Lecture 1 example | 0.50 L | 40 bar | 3.640/0.25 = 14.6 bar |

π\_T is negligible in a dilute gas and large in a dense one. In Lecture 1's CO₂ example, the 14.6 bar by which the real pressure fell below the "repulsion-only" pressure *was* π\_T.

**\[beyond the quiz\] Where the formula comes from.** Topic 3 gives the fundamental equation dU = T dS − p dV. Divide by dV at constant T: π\_T = (∂U/∂V)\_T = T(∂S/∂V)\_T − p. A Maxwell relation, which comes from the Helmholtz energy A = U − TS with dA = −S dT − p dV, says (∂S/∂V)\_T = (∂p/∂T)\_V. Substituting gives π\_T = T(∂p/∂T)\_V − p. You will meet all of this in 3E; for the quiz, just use the result.

### Joule's experiment (1843): why he saw no temperature change

**Set-up.** Two metal vessels sat in a water bath, joined by a tap. One held air at about 22 atm; the other was evacuated. Joule opened the tap and watched the bath thermometer.

**Argument.**

1. The gas expands into vacuum (free expansion), so w = 0.
2. The bath temperature did not change, so no heat flowed: q = 0.
3. So ΔU = q + w = 0, even though V changed. Joule concluded (∂U/∂V)\_T = π\_T = 0.

**The catch.** The water bath had a huge heat capacity compared with the gas, so any real temperature change was far too small to see. Joule had in effect found a property of the perfect gas, not of real air.

### Worked example: how big is the real effect?

**Q.** 1.00 mol of N₂ (a van der Waals gas) at 298 K expands freely from 24.8 L to 49.6 L in an insulated container. Estimate ΔT of the gas. Use a = 1.370 L² bar mol⁻² and C\_V,m = (5/2)R = 20.8 J K⁻¹ mol⁻¹.

**A.** Free and insulated, so q = w = 0 and ΔU = 0. Integrate dU = C\_V dT + π\_T dV with π\_T = a/V\_m². The temperature change is tiny, so treat C\_V as constant:

```latex
0 = C_{V,\text{m}}\,\Delta T + \int_{V_\text{i}}^{V_\text{f}} \frac{a}{V_\text{m}^2}\,\mathrm{d}V_\text{m} = C_{V,\text{m}}\,\Delta T + a\left(\frac{1}{V_\text{m,i}} - \frac{1}{V_\text{m,f}}\right)
```

```latex
\Delta T = -\frac{a}{C_{V,\text{m}}}\left(\frac{1}{V_\text{m,i}} - \frac{1}{V_\text{m,f}}\right)
```

Numbers: 1/24.8 − 1/49.6 = 1/49.6 ≈ 0.0202 L⁻¹. Then a × 0.0202 = 0.0276 L bar mol⁻¹ = 2.76 J mol⁻¹ (since 1 L bar = 100 J). So ΔT ≈ −2.76/20.8 ≈ **−0.13 K in the gas alone**.

The gas **cools**: molecules climbing out of each other's attractive wells pay for it with kinetic energy. Now spread those 2.76 J over even 1 kg of water (heat capacity 4.2 kJ K⁻¹): the bath would change by less than a thousandth of a kelvin. That is why Joule saw nothing.

### Exam-style example: ΔU for an isothermal expansion of a dense gas

**Q.** Find ΔU\_m when 1 mol of CO₂ (a = 3.640 L² bar mol⁻²) expands isothermally from 0.50 L to 25 L.

**A.** At constant T, dU = π\_T dV. So ΔU\_m = a(1/V\_i − 1/V\_f) = 3.640 × (2.00 − 0.04) = 7.13 L bar mol⁻¹ ≈ **+713 J mol⁻¹**. For a perfect gas this would be zero. It is positive because the attractions must be overcome.

### (b) Changes in U at constant pressure: α and κ\_T \[Atkins; not on the slides\]

**Step 1.** Divide dU = C\_V dT + π\_T dV by dT and hold p constant:

```latex
\left(\frac{\partial U}{\partial T}\right)_p = C_V + \pi_T\left(\frac{\partial V}{\partial T}\right)_p
```

**Step 2.** The derivative on the right is a measurable material property. Define two of them:

```latex
\alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_p \quad (\text{expansion coefficient}) \qquad \kappa_T = -\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_T \quad (\text{isothermal compressibility})
```

- α is the **fractional** change in volume per kelvin at constant pressure. Units: K⁻¹.
- κ\_T is the fractional *decrease* in volume per unit rise in pressure at constant temperature. Units: Pa⁻¹ or bar⁻¹. The minus sign makes it positive, because raising p (dp > 0) shrinks V (dV < 0).

**Step 3.** Substitute (∂V/∂T)\_p = αV:

```latex
\left(\frac{\partial U}{\partial T}\right)_p = \alpha\,\pi_T\,V + C_V
```

This is general for a closed system of fixed composition. For a perfect gas, π\_T = 0, so (∂U/∂T)\_p = C\_V: for a perfect gas, C\_V is also the slope of U against T at constant **pressure**.

**Step 4. C\_p − C\_V for a perfect gas.** Use H = U + pV = U + nRT:

```latex
C_p - C_V = \left(\frac{\partial H}{\partial T}\right)_p - \left(\frac{\partial U}{\partial T}\right)_p = \left(\frac{\partial (U + nRT)}{\partial T}\right)_p - \left(\frac{\partial U}{\partial T}\right)_p = nR
```

The general result for any substance (its proof needs the Second Law) is C\_p − C\_V = α²TV/κ\_T. For liquid water at 25 °C it gives C\_p,m − C\_V,m ≈ 0.49 J K⁻¹ mol⁻¹, tiny next to C\_p,m = 75.3. Don't assume the difference is always small for condensed phases, though: κ\_T is small too, and in some solids C\_p and C\_V differ by up to 30%.

### Worked example: Atkins Example 2D.2 (α of a perfect gas) and its self-test (κ\_T)

**α.** From pV = nRT, at constant p, V = nRT/p, so (∂V/∂T)\_p = nR/p. Then

```latex
\alpha = \frac{1}{V}\cdot\frac{nR}{p} = \frac{nR}{pV} = \frac{nR}{nRT} = \frac{1}{T}
```

**κ\_T.** At constant T, V = nRT/p, so (∂V/∂p)\_T = −nRT/p². Then

```latex
\kappa_T = -\frac{1}{V}\left(-\frac{nRT}{p^2}\right) = \frac{nRT}{pV}\cdot\frac{1}{p} = \frac{1}{p}
```

**Meaning.** The hotter a perfect gas, the less its volume responds (as a fraction) to a further 1 K rise: 1 K is a smaller fraction of a larger T. The higher the pressure, the harder it is to compress further.

**Comparison at 298 K** (liquids and solids from Atkins Table 2D.1):

| Substance | α / 10⁻⁴ K⁻¹ | κ\_T / 10⁻⁶ bar⁻¹ |
| --- | --- | --- |
| Perfect gas at 1 bar | 33.6 (= 1/298 K) | 10⁶ (= 1 bar⁻¹) |
| Benzene (l) | 12.4 | 90.9 |
| Water (l) | 2.1 | 49.0 |
| Lead (s) | 0.861 | 2.18 |
| Diamond (s) | 0.030 | 0.185 |

A gas is about 16 times more expansible than water and about 20,000 times more compressible.

### Exam-style example

**Q.** A perfect gas is at 300 K and 2.0 bar. (a) Give α and κ\_T. (b) Estimate the fractional volume change on heating it by 3 K at constant pressure.

**A.** (a) α = 1/T = 1/300 K⁻¹ ≈ 3.3 × 10⁻³ K⁻¹, and κ\_T = 1/p = 0.50 bar⁻¹. (b) ΔV/V ≈ αΔT = 3/300 = **1%**. Check with Charles's law: V ∝ T, so 303/300 = 1.01. ✓

## 2D.3 Changes in enthalpy

### Intuition

H = U + pV is built from state functions, so it is a state function too, and dH is exact. U was easiest as a function of T and V. H is naturally a function of T and **p**, because H is the quantity that matters when pressure is controlled (ΔH = q\_p). So we repeat the 2D.2 game with H(p, T) and ask: which physical quantity is (∂H/∂p)\_T?

### Derivation 1: hold H constant (Atkins' route)

**Step 1.** Total differential of H(p, T), with (∂H/∂T)\_p = C\_p:

```latex
\mathrm{d}H = \left(\frac{\partial H}{\partial p}\right)_T \mathrm{d}p + C_p\,\mathrm{d}T
```

**Step 2.** Now consider a change at constant H, so dH = 0:

```latex
0 = \left(\frac{\partial H}{\partial p}\right)_T \mathrm{d}p + C_p\,\mathrm{d}T \qquad (\text{constant } H)
```

**Step 3.** Divide by dp. Because H is constant, dT/dp becomes (∂T/∂p)\_H:

```latex
\left(\frac{\partial H}{\partial p}\right)_T = -C_p\left(\frac{\partial T}{\partial p}\right)_H = -C_p\,\mu
```

The new derivative is the **Joule–Thomson coefficient**, the rate at which temperature changes with pressure when H is held fixed:

```latex
\mu = \left(\frac{\partial T}{\partial p}\right)_H
```

**Step 4.** Substitute back into Step 1:

```latex
\mathrm{d}H = -\mu\,C_p\,\mathrm{d}p + C_p\,\mathrm{d}T
```

### Derivation 2: the Euler chain relation (the slides' route)

H, p and T are three variables linked by the state of the system. The Euler chain relation for them reads

```latex
\left(\frac{\partial H}{\partial p}\right)_T \left(\frac{\partial p}{\partial T}\right)_H \left(\frac{\partial T}{\partial H}\right)_p = -1
```

Solve for the first factor and use the reciprocal rule on the other two, (∂p/∂T)\_H = 1/(∂T/∂p)\_H and (∂T/∂H)\_p = 1/(∂H/∂T)\_p:

```latex
\left(\frac{\partial H}{\partial p}\right)_T = -\left(\frac{\partial H}{\partial T}\right)_p \left(\frac{\partial T}{\partial p}\right)_H = -C_p\,\mu
```

Both routes give the same answer. In an exam, the chain-rule version is quicker to write.

### The isothermal Joule–Thomson coefficient μ\_T

```latex
\mu_T \equiv \left(\frac{\partial H}{\partial p}\right)_T = -C_p\,\mu
```

- μ\_T is the **enthalpy analogue of π\_T**. π\_T says how U changes with V at constant T; μ\_T says how H changes with p at constant T.
- **Both are zero for a perfect gas.** So U *and* H of a perfect gas depend only on T. (Consistent with H = U + nRT.)
- With C\_p,m in place of C\_p you get the molar μ\_T, in J mol⁻¹ Pa⁻¹ (or J mol⁻¹ bar⁻¹).

**How it is measured.** Measuring μ directly means keeping H fixed, which is awkward. It is easier to keep T fixed. Let the gas flow steadily through a porous plug from p\_i to p\_f, with a small heater beside the plug that holds the temperature constant. By the same flow-work argument used for the Joule–Thomson expansion in 2D.4, the heat q\_m supplied per mole equals ΔH\_m. So

```latex
\mu_T \approx \frac{\Delta H_\text{m}}{\Delta p} = \frac{q_\text{m}}{p_\text{f} - p_\text{i}}
```

The slide writes this as μ\_T ≈ −Q/Δp, with Δp taken as the *size* of the pressure drop. It is the same thing. Then μ = −μ\_T/C\_p.

### Worked example: the heater power for nitrogen

**Q.** For N₂ at 298 K, μ = +0.27 K bar⁻¹ and C\_p,m = 29.1 J K⁻¹ mol⁻¹. (a) Find μ\_T. (b) How much heat per mole must the heater supply to keep the gas at 298 K as it flows from 10 bar to 1 bar?

**A.** (a) μ\_T = −C\_p,m μ = −29.1 × 0.27 ≈ **−7.9 J mol⁻¹ bar⁻¹**.

(b) Δp = 1 − 10 = −9 bar, so q\_m = ΔH\_m ≈ μ\_T Δp = (−7.9)(−9) ≈ **+71 J mol⁻¹**. It is positive: heat must be put in, because nitrogen would otherwise cool on expansion (μ > 0).

## 2D.4 The Joule–Thomson effect

### Intuition

Open the valve on a compressed-gas cylinder and the valve gets cold; a CO₂ fire extinguisher even frosts up. A gas forced from high pressure to low pressure through a narrow opening, with no heat exchanged, usually changes temperature. That change is the **Joule–Thomson effect**, and it is how air, nitrogen and other gases are liquefied. Joule and Thomson (later Lord Kelvin) found a way to measure it under a clean condition: **constant enthalpy**.

### The set-up

Gas is pushed steadily through a **porous plug** (a throttle) inside an insulated tube. Upstream it is at a constant high pressure p\_i and temperature T\_i; downstream at a constant low pressure p\_f and temperature T\_f. Thermometers on both sides measure T\_i and T\_f once the flow is steady. The tube is insulated, so q = 0.

### Derivation: why the expansion is isenthalpic

Follow one fixed amount of gas as it passes through the plug. Picture the gas behind it and the gas in front of it as two pistons that keep the pressures constant.

**Step 0. Adiabatic.** q = 0, so ΔU = w (w = work done **on** the gas).

**Step 1. Upstream work.** Before passing, our gas occupies V\_i at p\_i. The gas behind pushes it through at constant pressure p\_i, and its upstream volume goes from V\_i to 0:

```latex
w_1 = -p_\text{i}(0 - V_\text{i}) = +p_\text{i}V_\text{i}
```

This is positive: the gas is pushed on.

**Step 2. Downstream work.** On the far side, our gas must push the gas in front out of the way at constant pressure p\_f, and its downstream volume goes from 0 to V\_f:

```latex
w_2 = -p_\text{f}(V_\text{f} - 0) = -p_\text{f}V_\text{f}
```

This is negative: the gas does work on its surroundings.

**Step 3. First law.**

```latex
U_\text{f} - U_\text{i} = w_1 + w_2 = p_\text{i}V_\text{i} - p_\text{f}V_\text{f}
```

**Step 4. Rearrange** into the definition of H:

```latex
U_\text{f} + p_\text{f}V_\text{f} = U_\text{i} + p_\text{i}V_\text{i} \quad\Longrightarrow\quad H_\text{f} = H_\text{i}
```

The expansion is **isenthalpic**. The measured ratio ΔT/Δp is therefore a temperature change at constant H. In the limit of a small pressure drop, it is the Joule–Thomson coefficient

```latex
\mu = \left(\frac{\partial T}{\partial p}\right)_H, \qquad \Delta T \approx \mu\,\Delta p
```

- **μ > 0**: expansion (Δp < 0) gives ΔT < 0, so the gas **cools**.
- **μ < 0**: the gas **warms**.
- **Perfect gas: μ = 0.** Its H depends only on T, so constant H means constant T. Any Joule–Thomson effect is therefore a sign of intermolecular forces.

**Joule versus Joule–Thomson (don't mix them up).**

|  | Joule experiment (2D.2) | Joule–Thomson expansion |
| --- | --- | --- |
| Process | free expansion into vacuum, one-off | steady flow through a throttle |
| Work | w = 0 | w = p\_iV\_i − p\_fV\_f (flow work) |
| What is constant | U | H |
| Coefficient | π\_T = (∂U/∂V)\_T | μ = (∂T/∂p)\_H |
| Result for real N₂ | tiny cooling, hidden by the bath | easily measured cooling |

### Worked example: Atkins Brief illustration 2D.2

**Q.** For N₂ at 298 K and 1 atm, μ = +0.27 K atm⁻¹. Estimate ΔT when its pressure drops by 10 atm through a throttle.

**A.** ΔT ≈ μΔp = (+0.27)(−10) = **−2.7 K**. (μ is intensive, so the amount of gas doesn't matter. And 1 atm ≈ 1 bar at this precision.) Throttling from about 200 bar to 1 bar gives roughly 0.25 × (−200) ≈ −50 K: tens of kelvin, enough to matter. This is only an estimate, because μ itself changes with p and T along the way.

### Molecular interpretation: attractions cool, repulsions heat

The gas is insulated, so any energy it needs must come from within. As it expands, its molecules move farther apart.

- **Attractions dominate.** The molecules have to climb out of each other's potential wells. Like a ball thrown upward slowing against gravity, they pay with kinetic energy, so they slow down: **T falls, μ > 0**. (Atkins: this happens when Z < 1.)
- **Repulsions dominate.** Moving apart lets the molecules slide down the repulsive wall, turning potential energy into kinetic energy: **T rises, μ < 0** (Z > 1).
- **Perfect gas.** No interactions, no change: **μ = 0**.
- **Temperature decides the winner.** At high T, molecules move fast, collide hard and spend little time in the attractive region, so repulsions win. At low T, attractions win.

### Quantitative: μ for a van der Waals gas

**Step 1. Low-pressure van der Waals molar volume.** From Topic 1C, the second virial coefficient of a van der Waals gas is B = b − a/RT, so V\_m ≈ RT/p + B:

```latex
V_\text{m} \approx \frac{RT}{p} + b - \frac{a}{RT}
```

**Step 2. A general formula** for μ, derived in Topic 3E (use it):

```latex
\mu = \frac{T\left(\partial V_\text{m}/\partial T\right)_p - V_\text{m}}{C_{p,\text{m}}}
```

**Step 3. Differentiate Step 1** at constant p:

```latex
\left(\frac{\partial V_\text{m}}{\partial T}\right)_p = \frac{R}{p} + \frac{a}{RT^2} \quad\Longrightarrow\quad T\left(\frac{\partial V_\text{m}}{\partial T}\right)_p = \frac{RT}{p} + \frac{a}{RT}
```

**Step 4. Subtract V\_m.** The RT/p terms cancel:

```latex
T\left(\frac{\partial V_\text{m}}{\partial T}\right)_p - V_\text{m} = \frac{RT}{p} + \frac{a}{RT} - \frac{RT}{p} - b + \frac{a}{RT} = \frac{2a}{RT} - b
```

```latex
\mu \approx \frac{1}{C_{p,\text{m}}}\left(\frac{2a}{RT} - b\right)
```

- **2a/RT** comes from attractions and drives **cooling**. It shrinks as T rises.
- **−b** comes from molecular size (repulsions) and drives **heating**. It does not depend on T.
- μ changes sign when the two terms balance. That is the **inversion temperature**:

```latex
\frac{2a}{RT_\text{I}} = b \quad\Longrightarrow\quad T_\text{I} = \frac{2a}{Rb}
```

Below T\_I the gas cools on throttling; above T\_I it warms.

**Note.** This low-pressure μ does not vanish as p → 0, even though the equation of state then approaches the perfect-gas law. μ depends on *derivatives* of the equation of state (through B(T)), and those don't vanish.

**\[beyond the quiz\] Where the Step 2 formula comes from.** In Topic 3, dH = T dS + V dp. At constant T, (∂H/∂p)\_T = T(∂S/∂p)\_T + V. A Maxwell relation (from the Gibbs energy) gives (∂S/∂p)\_T = −(∂V/∂T)\_p. So μ\_T = V − T(∂V/∂T)\_p, and μ = −μ\_T/C\_p gives the Step 2 formula.

### Worked example: nitrogen at 298 K (the slide numbers)

**Data.** a = 1.370 L² bar mol⁻², b = 0.0387 L mol⁻¹, C\_p,m = 29.1 J K⁻¹ mol⁻¹, RT = 24.8 L bar mol⁻¹.

**μ.**

```latex
\frac{2a}{RT} - b = \frac{2.740}{24.8} - 0.0387 = 0.1106 - 0.0387 = 0.0719\ \text{L mol}^{-1}
```

Convert with 1 L bar = 100 J, so 0.0719 L mol⁻¹ = 7.19 J mol⁻¹ bar⁻¹:

```latex
\mu \approx \frac{7.19\ \text{J mol}^{-1}\,\text{bar}^{-1}}{29.1\ \text{J K}^{-1}\,\text{mol}^{-1}} \approx 0.25\ \text{K bar}^{-1}
```

The measured value is 0.27 K atm⁻¹, very close. (The slide does the same in SI: 7.19 × 10⁻⁵ m³ mol⁻¹ / 29.1 = 2.5 × 10⁻⁶ K Pa⁻¹.) **Hand rule:** μ in K bar⁻¹ = 100 × (2a/RT − b in L mol⁻¹) / (C\_p,m in J K⁻¹ mol⁻¹).

**T\_I.**

```latex
T_\text{I} = \frac{2a}{Rb} = \frac{2.740}{0.08314 \times 0.0387} = \frac{2.740}{0.00322} \approx 850\ \text{K}
```

The measured value is 621 K. The van der Waals model gets the right size but overestimates it.

### Who cools and who warms at room temperature?

Measured values (slides, near 298 K and 1 atm), with the van der Waals estimate T\_I = 2a/(Rb) for comparison:

| Gas | a / L² bar mol⁻² | b / L mol⁻¹ | μ / K atm⁻¹ (measured) | T\_I / K (measured) | T\_I / K (vdW) |
| --- | --- | --- | --- | --- | --- |
| CO₂ | 3.640 | 0.0427 | +1.1 | \~1500 | \~2050 |
| N₂ | 1.370 | 0.0387 | +0.27 | 621 | \~850 |
| H₂ | 0.248\* | 0.0266\* | −0.03 | \~200 | \~220 |
| He | 0.0346 | 0.0238 | −0.06 | \~40 | \~35 |

\*H₂ constants are standard data-book values, not from the slides.

**Why He and H₂ warm at room temperature.** Their attractions are very weak: a for He is about 40 times smaller than for N₂. So 2a/RT is smaller than b already at low temperature, and T\_I is low (\~40 K for He, \~200 K for H₂). At 298 K they are above T\_I: repulsions dominate and μ < 0. The warming is slight because the interactions are weak overall.

**Why CO₂ extinguishers frost up.** CO₂ has a large a, a high T\_I and μ ≈ +1.1 K atm⁻¹: strong Joule–Thomson cooling as it leaves the cylinder.

### Concept check (from the slides)

Helium at room temperature leaves a high-pressure cylinder through a valve, in an insulated steady flow. What happens to its temperature? A. It falls, because all gases cool on expansion. B. It rises slightly, because room temperature is above helium's inversion temperature. C. It stays exactly the same, because helium is a perfect gas. D. It rises, because the gas does work on the valve.

**Answer: B.** T\_I ≈ 40 K, so repulsions dominate at 298 K and μ ≈ −0.06 K atm⁻¹. A is false (He is the counterexample), C is false (helium is not exactly perfect), and D has the energy flow backwards.

### The inversion curve

T\_I actually depends on pressure. In the (p, T) plane, a boundary curve, the **inversion curve**, separates a cooling region (μ > 0, inside) from a heating region (μ < 0, outside). At a given pressure, a gas typically has **two** inversion temperatures, an upper and a lower one, and it cools on throttling only between them. Throttling moves the gas along a curve of constant H (an *isenthalp*). The inversion curve passes through the point on each isenthalp where its slope changes sign.

The slides give the van der Waals inversion curve in reduced variables (p\_r = p/p\_c, T\_r = T/T\_c):

```latex
p_\text{r} = 24\sqrt{3T_\text{r}} - 12T_\text{r} - 27
```

Two checks you can do by hand:

- **Low-pressure ends** (p\_r = 0). Put s = √(3T\_r), so 4s² − 24s + 27 = 0, giving s = 4.5 or 1.5. So T\_r = 6.75 (upper) or 0.75 (lower). With T\_c = 8a/(27Rb), the upper value is 6.75 T\_c = 2a/(Rb), the same T\_I as before. ✓
- **Top of the curve.** dp\_r/dT\_r = 0 at T\_r = 3, where p\_r = 72 − 36 − 27 = 9. Above about 9p\_c, the gas cannot be cooled by throttling at any temperature.

### Liquefaction: the Linde refrigerator

1. **Compress** the gas, and remove the heat produced by compression.
2. **Throttle** it through a valve. It cools, provided it is inside the inversion curve.
3. Send the cold gas back past the incoming high-pressure gas in a **counter-current heat exchanger**, pre-cooling it.
4. **Repeat.** Each pass starts colder, so the temperature falls cycle by cycle until some of the gas condenses and liquid drips from the throttle.

&#91;embedded content: Linde refrigerator: compress, cool, pre-cool, throttle, recycle\]

The loop is the trick: gas cooled at the throttle flows back through the heat exchanger and pre-cools the next batch, so every pass reaches the throttle colder than the one before.

**H₂ and He** must first be pre-cooled below their inversion temperatures: H₂ with liquid N₂ (77 K), He with liquid H₂ (20 K). Otherwise throttling would warm them.

## 2D homework solutions with marking scheme

The problem statements were read from the Atkins PDF (book p.73–74 and the Focus 2 integrated activities). Example 2D.2, also on the list, is worked in full in 2D.2. The marking style is the same as for 2C: all-or-nothing steps in units of 0.5 or 1 mark, equivalent consistent methods accepted, exercises out of 5. I2.5 is a three-line derivation, so it is also marked out of 5; P2D.2 and P2D.8 are out of 10.

**Data used:** N₂ van der Waals constants from Atkins Table 1C.3, a = 1.352 dm⁶ atm mol⁻² and b = 3.87 × 10⁻² dm³ mol⁻¹.

### E2D.2(a). Isothermal expansion of a van der Waals gas (5 marks)

**Problem.** For a van der Waals gas, π\_T = a/V\_m². Calculate ΔU\_m for the isothermal expansion of nitrogen from 1.00 dm³ to 20.00 dm³ at 298 K. What are q and w?

**Step 1. ΔU\_m.** At constant T, dU\_m = π\_T dV\_m = (a/V\_m²) dV\_m, so

```latex
\Delta U_\text{m} = \int_{V_\text{i}}^{V_\text{f}} \frac{a}{V_\text{m}^2}\,\mathrm{d}V_\text{m} = a\left(\frac{1}{V_\text{i}} - \frac{1}{V_\text{f}}\right)
```

**Step 2. Numbers in SI.** a = 1.352 × (1.01325 × 10⁵ Pa) × (10⁻³ m³)² = 0.1370 Pa m⁶ mol⁻². With V in m³ mol⁻¹, 1/V\_i − 1/V\_f = 1000 − 50 = 950 mol m⁻³.

```latex
\Delta U_\text{m} = (0.1370\ \text{Pa m}^6\,\text{mol}^{-2})(950\ \text{mol m}^{-3}) = +130\ \text{J mol}^{-1}
```

**Step 3. w (path: reversible, stated).** The question doesn't name a path, so assume a reversible expansion, with p = RT/(V\_m − b) − a/V\_m²:

```latex
w = -\int_{V_\text{i}}^{V_\text{f}} p\,\mathrm{d}V_\text{m} = -RT\ln\frac{V_\text{f} - b}{V_\text{i} - b} + a\left(\frac{1}{V_\text{i}} - \frac{1}{V_\text{f}}\right)
```

```latex
\ln\frac{20.00 - 0.0387}{1.00 - 0.0387} = \ln 20.77 = 3.033, \qquad RT = (8.3145)(298) = 2478\ \text{J mol}^{-1}
```

```latex
w = -(2478)(3.033) + 130 = -7515 + 130 = -7385\ \text{J mol}^{-1} \approx -7.39\ \text{kJ mol}^{-1}
```

**Step 4. q from the first law.**

```latex
q = \Delta U_\text{m} - w = 130 - (-7385) = +7515\ \text{J mol}^{-1} \approx +7.52\ \text{kJ mol}^{-1}
```

**Check.** ΔU\_m is tiny next to q and w, because N₂ is nearly perfect at these volumes. With the perfect-gas formula, w = −RT ln 20 = −7.42 kJ mol⁻¹ and q = +7.55 kJ mol⁻¹. Signs: the gas does work (w < 0) and takes in heat (q > 0) to stay at constant T.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | ΔU\_m = ∫π\_T dV\_m = a(1/V\_i − 1/V\_f) | 1 |
| 2 | Units converted (atm and dm³ to SI); ΔU\_m = +130 J mol⁻¹ | 1 |
| 3 | Path stated, and w = −∫p dV\_m set up with the van der Waals p | 1 |
| 3 | w ≈ −7.39 kJ mol⁻¹ | 1 |
| 4 | q = ΔU\_m − w ≈ +7.52 kJ mol⁻¹, with sign | 1 |
|  | **Total** | **5** |

The perfect-gas w (−7.42 kJ mol⁻¹, q = +7.55 kJ mol⁻¹) earns the step 3 and step 4 marks only if the approximation is stated.

**Where marks are lost:** leaving a in atm units with V in m³; not converting dm³ to m³; no stated path; the sign of w; writing q = −w (true only when ΔU = 0, so only for a perfect gas).

### P2D.2. C\_p − C\_V in terms of V derivatives (10 marks)

**Problem.** Starting from C\_p − C\_V = T(∂p/∂T)\_V(∂V/∂T)\_p, use relations between partial derivatives to express C\_p − C\_V in terms of (∂V/∂T)\_p and (∂V/∂p)\_T. Then evaluate it for a perfect gas.

**A misprint to know about.** The book prints the target as T(∂V/∂T)\_p²/(∂V/∂p)\_T, with no minus sign. That cannot be right: (∂V/∂p)\_T < 0, so it would make C\_p − C\_V negative. The correct result, derived below, carries a minus sign. Say so in your answer.

**Step 1. Euler chain relation for p, V, T:**

```latex
\left(\frac{\partial p}{\partial T}\right)_V\left(\frac{\partial T}{\partial V}\right)_p\left(\frac{\partial V}{\partial p}\right)_T = -1
```

**Step 2. Solve for (∂p/∂T)\_V**, using the reciprocal rule (∂T/∂V)\_p = 1/(∂V/∂T)\_p:

```latex
\left(\frac{\partial p}{\partial T}\right)_V = -\frac{1}{(\partial T/\partial V)_p\,(\partial V/\partial p)_T} = -\frac{(\partial V/\partial T)_p}{(\partial V/\partial p)_T}
```

**Step 3. Substitute** into the starting expression:

```latex
C_p - C_V = -\frac{T\,(\partial V/\partial T)_p^2}{(\partial V/\partial p)_T} = \frac{\alpha^2 T V}{\kappa_T}
```

The second form uses (∂V/∂T)\_p = αV and (∂V/∂p)\_T = −κ\_TV. Both factors make it plainly positive.

**Step 4. Perfect gas.** V = nRT/p, so (∂V/∂T)\_p = nR/p and (∂V/∂p)\_T = −nRT/p².

```latex
C_p - C_V = -\frac{T\,(nR/p)^2}{-nRT/p^2} = nR \qquad (C_{p,\text{m}} - C_{V,\text{m}} = R)
```

**Step 5. Check.** This agrees with Topic 2B. Equivalently, α = 1/T and κ\_T = 1/p give α²TV/κ\_T = pV/T = nR.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | Euler chain relation for p, V, T written correctly, minus sign included | 2 |
| 2 | Rearranged with the reciprocal rule to (∂p/∂T)\_V = −(∂V/∂T)\_p/(∂V/∂p)\_T | 2 |
| 3 | Substituted to reach C\_p − C\_V = −T(∂V/∂T)\_p²/(∂V/∂p)\_T, sign correct (misprint noted, or the α, κ\_T form given) | 2 |
| 4 | Perfect-gas derivatives nR/p and −nRT/p² | 2 |
| 5 | Result nR (R per mole), with a remark that it is positive or matches 2B | 2 |
|  | **Total** | **10** |

An equivalent route also earns full marks for steps 1–2: compute (∂p/∂T)\_V = nR/V directly from pV = nRT, and show that it equals −(∂V/∂T)\_p/(∂V/∂p)\_T.

**Where marks are lost:** dropping the minus sign in the chain relation (or copying the misprint), which makes C\_p − C\_V negative; holding the wrong variable constant; writing R when the expression still contains n.

### P2D.8. μC\_p,m ≈ 2a/RT − b from the internal pressure (10 marks)

**Problem.** Use (∂U/∂V)\_T = a/V\_m² for a van der Waals gas to show that μC\_p,m ≈ 2a/RT − b, using the definition of μ and relations between partial derivatives. Hint: use pV\_m ≈ RT where that is justified.

**Step 1. Link μ to H.** From 2D.3, μ\_T = (∂H\_m/∂p)\_T = −C\_p,m μ, so

```latex
\mu\,C_{p,\text{m}} = -\left(\frac{\partial H_\text{m}}{\partial p}\right)_T
```

**Step 2. Split H.** H\_m = U\_m + pV\_m, so

```latex
\left(\frac{\partial H_\text{m}}{\partial p}\right)_T = \left(\frac{\partial U_\text{m}}{\partial p}\right)_T + \left(\frac{\partial (pV_\text{m})}{\partial p}\right)_T
```

**Step 3. The U term.** By the chain rule at constant T:

```latex
\left(\frac{\partial U_\text{m}}{\partial p}\right)_T = \left(\frac{\partial U_\text{m}}{\partial V_\text{m}}\right)_T\left(\frac{\partial V_\text{m}}{\partial p}\right)_T = \frac{a}{V_\text{m}^2}\left(\frac{\partial V_\text{m}}{\partial p}\right)_T
```

This term is already small, because it is proportional to a. So the perfect-gas V\_m = RT/p is good enough inside it: (∂V\_m/∂p)\_T ≈ −RT/p² = −V\_m²/RT. Hence

```latex
\left(\frac{\partial U_\text{m}}{\partial p}\right)_T \approx \frac{a}{V_\text{m}^2}\left(-\frac{V_\text{m}^2}{RT}\right) = -\frac{a}{RT}
```

**Step 4. The pV term.** Here pV\_m = RT is **not** good enough: it would differentiate to zero and lose the b term. Use the van der Waals equation:

```latex
pV_\text{m} = \frac{RT\,V_\text{m}}{V_\text{m} - b} - \frac{a}{V_\text{m}} = \frac{RT}{1 - b/V_\text{m}} - \frac{a}{V_\text{m}} \approx RT\left(1 + \frac{b}{V_\text{m}}\right) - \frac{a}{V_\text{m}} = RT + \frac{RTb - a}{V_\text{m}}
```

The expansion 1/(1 − x) ≈ 1 + x holds because b ≪ V\_m at low pressure. Inside the small correction term, put 1/V\_m ≈ p/RT:

```latex
pV_\text{m} \approx RT + \left(b - \frac{a}{RT}\right)p \qquad\Longrightarrow\qquad \left(\frac{\partial (pV_\text{m})}{\partial p}\right)_T \approx b - \frac{a}{RT}
```

**Step 5. Combine.**

```latex
\left(\frac{\partial H_\text{m}}{\partial p}\right)_T \approx -\frac{a}{RT} + b - \frac{a}{RT} = b - \frac{2a}{RT} \qquad\Longrightarrow\qquad \mu\,C_{p,\text{m}} \approx \frac{2a}{RT} - b
```

**Step 6. Interpretation.** Half of the 2a/RT comes from the internal energy (molecules climbing out of attractive wells) and half from the pV term. The −b term comes from repulsions. μ changes sign at T\_I = 2a/(Rb). For N₂ at 298 K, this gives μ ≈ 0.25 K bar⁻¹ (2D.4). It agrees with the slide derivation, which uses the 3E formula instead.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | μC\_p,m = −(∂H\_m/∂p)\_T, from μ\_T = −C\_pμ or the Euler chain | 1.5 |
| 2 | H = U + pV split and differentiated at constant T | 1 |
| 3 | Chain rule (∂U/∂p)\_T = π\_T(∂V/∂p)\_T | 1.5 |
| 3 | Perfect-gas approximation used only in this small term, giving −a/RT | 1.5 |
| 4 | Low-pressure van der Waals pV\_m ≈ RT + (b − a/RT)p, expansion justified | 2 |
| 4 | (∂(pV\_m)/∂p)\_T ≈ b − a/RT | 1 |
| 5 | Combined to give μC\_p,m ≈ 2a/RT − b | 1 |
| 6 | Comment on the two terms, the sign or the inversion temperature | 0.5 |
|  | **Total** | **10** |

**Where marks are lost:** setting (∂(pV\_m)/∂p)\_T = 0 (this gives only a/RT, and the b term disappears); the sign in μ\_T = −C\_pμ; using the perfect-gas law in the pV term; approximations made without saying why they are allowed.

### I2.5. (∂C\_V/∂V)\_T = 0 for a perfect gas (5 marks)

**Problem.** Using the equality of mixed partial derivatives and C\_V = (∂U/∂T)\_V (eqn 2A.14), write (∂C\_V/∂V)\_T as a second derivative of U, find how it relates to (∂U/∂V)\_T, and show that (∂C\_V/∂V)\_T = 0 for a perfect gas.

**Step 1. Definition.** C\_V = (∂U/∂T)\_V.

**Step 2. Second derivative.**

```latex
\left(\frac{\partial C_V}{\partial V}\right)_T = \left(\frac{\partial}{\partial V}\left(\frac{\partial U}{\partial T}\right)_V\right)_T = \frac{\partial^2 U}{\partial V\,\partial T}
```

**Step 3. Swap the order** (mixed derivatives are equal, because dU is exact):

```latex
\frac{\partial^2 U}{\partial V\,\partial T} = \left(\frac{\partial}{\partial T}\left(\frac{\partial U}{\partial V}\right)_T\right)_V = \left(\frac{\partial \pi_T}{\partial T}\right)_V
```

**Step 4. Perfect gas.** π\_T = 0 at every temperature, because U depends only on T. A function that is zero for all T has zero T-derivative, so (∂C\_V/∂V)\_T = 0.

**Step 5. Meaning.** The heat capacity of a perfect gas does not depend on its volume (its density). It can depend only on T. **\[beyond the quiz\]** The same holds for a van der Waals gas, because π\_T = a/V\_m² does not depend on T.

| Step | What earns the marks | Marks |
| --- | --- | --- |
| 1 | C\_V = (∂U/∂T)\_V | 1 |
| 2 | Written as the mixed second derivative ∂²U/∂V∂T | 1 |
| 3 | Order swapped, and recognised as (∂π\_T/∂T)\_V | 1.5 |
| 4 | π\_T = 0 for a perfect gas at all T, so the result is 0 | 1 |
| 5 | Physical meaning: C\_V independent of volume | 0.5 |
|  | **Total** | **5** |

**Where marks are lost:** holding the wrong variable constant; stating "C\_V = (3/2)nR is constant" (true only for a monatomic gas, and it skips the method the problem asks for: at most 1 mark); claiming π\_T = 0 only at one temperature.

## 2D check your understanding

**D1.** Is dz = 3x²y dx + (x³ + 2y) dy exact? If so, find z.

**D2.** (a) Explain why a perfect gas has no inversion temperature. (b) Joule's free expansion and the Joule–Thomson expansion each keep one state function constant. Name it for each, and say why a perfect gas's temperature is unchanged in both.

**D3.** For CO₂, a = 3.640 L² bar mol⁻², b = 0.0427 L mol⁻¹ and C\_p,m = 37.1 J K⁻¹ mol⁻¹. Estimate μ at 298 K and the inversion temperature from the van der Waals model, and compare with the measured +1.1 K atm⁻¹ and \~1500 K.

## Answers to the check-your-understanding questions

**C1.** Liquid Br₂ is bromine's reference state at 298 K (its most stable form at 1 bar). Its formation reaction is the null reaction Br₂(l) → Br₂(l), so Δ\_fH° = 0. Br₂(g) is not the reference state. Its "formation" from the element is Br₂(l) → Br₂(g), which is just vaporization, so Δ\_fH°(Br₂, g) = Δ\_vapH°(Br₂) = +30.9 kJ mol⁻¹.

**C2.** Δ\_rH = Δ\_rU + Δn\_g RT = −100.0 + (1)(2.48) = **−97.5 kJ mol⁻¹**. More heat is released in the bomb: 100.0 kJ against 97.5 kJ per mole. In an open beaker at constant pressure, the gas produced pushes back the atmosphere, so 2.5 kJ of the energy leaves as work instead of heat.

**C3.** (a) Δ\_rH°(398 K) = −50.0 + (20 × 10⁻³)(100) = **−48.0 kJ mol⁻¹**. The products have the larger heat capacity, so Δ\_rH° rises with T. (b) The unfolded state has a larger heat capacity than the native state. The height of the step is ΔC\_p for unfolding, and it is positive.

**D1.** M = 3x²y, so ∂M/∂y = 3x². N = x³ + 2y, so ∂N/∂x = 3x². They are equal, so dz is **exact**. Integrating M over x gives z = x³y + g(y). Then ∂z/∂y = x³ + g′(y) = x³ + 2y, so g = y², and **z = x³y + y²** (+ a constant).

**D2.** (a) A perfect gas has μ = 0 at every temperature and pressure, because its H depends only on T. μ never changes sign, so there is nothing to "invert". In van der Waals terms a = b = 0, so neither the cooling term 2a/RT nor the heating term b exists. (b) Joule free expansion (q = 0, w = 0) keeps **U** constant. Joule–Thomson throttling keeps **H** constant. For a perfect gas, both U and H depend only on T (π\_T = 0 and μ\_T = 0), so constant U or constant H means constant T.

**D3.** RT = 24.8 L bar mol⁻¹. 2a/RT = 7.280/24.8 = 0.294 L mol⁻¹, and subtracting b gives 0.251 L mol⁻¹. So μ ≈ 100 × 0.251/37.1 ≈ **0.68 K bar⁻¹**: right sign and size, but below the measured 1.1. T\_I = 2a/(Rb) = 7.280/(0.08314 × 0.0427) = 7.280/0.00355 ≈ **2050 K**, above the measured \~1500 K. As with N₂, the van der Waals model overestimates T\_I.

## Common mistakes

**Thermochemistry (2C)**

1. **Giving Δ\_fH° = 0 to the wrong thing.** Only elements in their reference state get zero. Br₂(g), C(diamond), O₃(g) and H(g) all have non-zero Δ\_fH°.
2. **Order of subtraction.** With formation data it is products − reactants. With combustion data it is reactants − products.
3. **Forgetting the coefficients**, or forgetting that "kJ mol⁻¹" means per mole of reaction *as written*. Doubling the equation doubles Δ\_rH°.
4. **The wrong phase of water.** H₂O(l) and H₂O(g) differ by 44 kJ mol⁻¹ per mole of water. Combustion enthalpies assume liquid water unless told otherwise.
5. **Miscounting Δn\_g.** Count gases only, per mole of reaction. Use Δ\_rH = Δ\_rU + Δn\_g RT with RT ≈ 2.48 kJ mol⁻¹, not 2480.
6. **Adding transition enthalpies at different temperatures**, for example 6.01 kJ (273 K) + 40.66 kJ (373 K) for sublimation.
7. **Kirchhoff slips**: adding J K⁻¹ mol⁻¹ × K straight to kJ mol⁻¹; dropping the ½ in front of O₂; ignoring a phase change inside the temperature range.
8. **DSC**: integrating down to zero instead of down to the baseline, or reading ΔH off the peak height instead of the area.

**State functions and Joule–Thomson (2D)**

9. **Writing Δq or q\_B − q\_A.** q and w belong to paths, not states: ∫đq = q.
10. **Ignoring the subscript.** (∂U/∂T)\_V = C\_V, but (∂U/∂T)\_p = C\_V + απ\_TV.
11. **Dropping the minus sign** in the Euler chain relation, or in κ\_T = −(1/V)(∂V/∂p)\_T and μ\_T = −C\_pμ.
12. **Saying Joule proved π\_T = 0 for real gases.** His bath was too insensitive; real gases have π\_T = a/V\_m² > 0.
13. **Putting b into the van der Waals π\_T.** Only a appears. b does appear in μ, as the −b heating term in (2a/RT − b)/C\_p,m.
14. **Confusing Joule with Joule–Thomson.** Free expansion keeps U constant. Throttling keeps H constant, because the flow work p\_iV\_i − p\_fV\_f is not zero.
15. **"All gases cool when they expand."** He and H₂ warm on throttling at room temperature, because they are above their inversion temperatures.
16. **Sign of μ.** μ > 0 means cooling, because the pressure *falls* (Δp < 0) and ΔT = μΔp.
17. **Units.** 1 L bar = 100 J; 1 bar = 10⁵ Pa; with a in L² bar mol⁻², use R = 0.08314 L bar K⁻¹ mol⁻¹.

## Key results at a glance

| Result | Formula | When / notes |
| --- | --- | --- |
| Standard state | pure substance, 1 bar, any stated T | tables use 298.15 K |
| Physical change | Δ\_subH° = Δ\_fusH° + Δ\_vapH°; ΔH(B→A) = −ΔH(A→B) | same T throughout |
| Hess's law | add equations, add their Δ\_rH° | reversing flips the sign; scaling scales ΔH |
| From formation data | Δ\_rH° = ΣνΔ\_fH°(prod) − ΣνΔ\_fH°(react) = Σν\_JΔ\_fH°(J) | element in reference state: 0; H⁺(aq): 0 |
| From combustion data | Δ\_rH° = ΣνΔ\_cH°(react) − ΣνΔ\_cH°(prod) | reverse order |
| Kirchhoff | Δ\_rH°(T₂) = Δ\_rH°(T₁) + ∫Δ\_rC\_p° dT ≈ Δ\_rH°(T₁) + Δ\_rC\_p°(T₂ − T₁) | no phase change in range |
| Bomb calorimeter | CΔT = −nΔ\_cU; Δ\_rH = Δ\_rU + Δn\_g RT | Δn\_g counts gases only |
| DSC | C\_p,ex = P\_ex/α; ΔH = ∫C\_p,ex dT (peak area) | baseline step = ΔC\_p |
| Exactness test | M dx + N dy exact ⇔ ∂M/∂y = ∂N/∂x | dU, dH exact; đq, đw inexact |
| Internal energy | dU = C\_V dT + π\_T dV, π\_T = (∂U/∂V)\_T | π\_T = T(∂p/∂T)\_V − p (from 3E) |
| π\_T values | perfect gas 0; van der Waals a/V\_m² | > 0 when attractions dominate |
| Joule free expansion | ΔT = −(a/C\_V,m)(1/V\_m,i − 1/V\_m,f) | constant U |
| α, κ\_T | α = (1/V)(∂V/∂T)\_p; κ\_T = −(1/V)(∂V/∂p)\_T | perfect gas: 1/T and 1/p |
| U at constant p | (∂U/∂T)\_p = απ\_TV + C\_V | perfect gas: C\_p − C\_V = nR |
| Enthalpy | dH = −μC\_p dp + C\_p dT; μ\_T = (∂H/∂p)\_T = −C\_pμ | Euler chain relation |
| Joule–Thomson | H\_f = H\_i; μ = (∂T/∂p)\_H; ΔT ≈ μΔp | μ > 0 cools |
| van der Waals μ | μ ≈ (2a/RT − b)/C\_p,m; T\_I = 2a/(Rb) | N₂: 0.25 K bar⁻¹, \~850 K (measured 621 K) |
