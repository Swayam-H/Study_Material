# Science-1 Thermo 5: Free energy and phases

Your existing thermo notes (`notes/10-thermo-quiz2-notes.md`, the cheatsheet, formula sheet, definitions and `practice/quiz2-*`) cover Atkins 1A–3B, the Quiz-2 range, and are complete for that range. The gap is Thermo-5 (17 Oct), which came after the quiz: the third law (3C), Helmholtz and Gibbs energies (3D), the fundamental equation and Maxwell relations (3E), phase diagrams and the phase rule (4A), and the Clapeyron equations (4B). There are no slides for that lecture (`thermo-l4.tex:413` only previews it), so this doc follows Atkins and the HW list, whose items for Focus 3 and 4 are used in the questions below.

## Explainer

### The third law and absolute entropies

The second law tells us how to calculate a change in entropy, but not the entropy itself. To find the entropy of a substance at a temperature T we measure its heat capacity from very low temperatures upwards and add up the contributions dS = C\_p dT/T, together with ΔH/T for each phase transition on the way. This gives S(T) − S(0). The third law fixes the starting point: the entropy of every perfect crystalline substance is zero at T = 0. In statistical terms a perfect crystal at absolute zero has only one possible arrangement, W = 1, and S = k ln W = 0. Entropies measured on this basis are called third-law entropies. Heat capacities cannot be measured right down to zero, so the last few kelvin are covered by the Debye law C\_p = aT³, for which the entropy at a low temperature is simply S(T) = C\_p(T)/3. With standard molar entropies tabulated, the entropy change of a reaction follows as Δ\_rS° = ΣνS°(products) − ΣνS°(reactants). Reactions that produce gas generally have positive Δ\_rS°, and those that consume gas negative ones.

### Helmholtz and Gibbs energies

The second law says that a change is spontaneous if the total entropy of system and surroundings increases. This is inconvenient, because it requires us to keep track of the surroundings. Under the conditions most common in practice the surroundings can be accounted for automatically. If heat dq enters the system from surroundings at the same temperature, the Clausius inequality dS ≥ dq/T can be rearranged. At constant volume dq = dU, and the condition becomes dU − TdS ≤ 0. At constant pressure dq = dH, and the condition becomes dH − TdS ≤ 0. These suggest two new state functions, the Helmholtz energy A = U − TS and the Gibbs energy G = H − TS. At constant temperature and volume a spontaneous change lowers A, and at constant temperature and pressure it lowers G. Equilibrium is reached when A or G has its minimum value. Chemistry is usually done at constant pressure, so G is the more useful of the two.

The relation ΔG = ΔH − TΔS shows the balance between energy and entropy. A reaction that releases heat (ΔH < 0) and increases entropy (ΔS > 0) is spontaneous at every temperature. One with ΔH > 0 and ΔS < 0 is never spontaneous. In the other two cases the sign of ΔG depends on T, and the entropy term dominates at high temperature. The two functions also have a direct meaning in terms of work. The change in A is the maximum total work a process can do, and the change in G is the maximum non-expansion work, such as electrical work in a cell or the work a cell's chemistry does in building molecules. This is why A is sometimes called the work function and G the free energy.

### The fundamental equation and Maxwell relations

Combining the first law with dq\_rev = TdS and dw\_rev = −pdV gives the fundamental equation dU = TdS − pdV. Although derived for a reversible change, it involves only state functions, so it holds for any change of a closed system doing no non-expansion work. It shows that U is naturally a function of S and V. The definitions of H, A and G then give similar equations: dH = TdS + Vdp, dA = −SdT − pdV and dG = −SdT + Vdp. Because each is an exact differential, the mixed second derivatives must be equal, and this produces four Maxwell relations, such as (∂S/∂V)\_T = (∂p/∂T)\_V. Their value is that they convert quantities that are hard to measure, such as how entropy changes with volume, into quantities that are easy to measure, such as how pressure changes with temperature. One immediate use is the thermodynamic equation of state, π\_T = T(∂p/∂T)\_V − p, which gives the internal pressure from the equation of state alone. For a perfect gas it is zero; for a van der Waals gas it is a/V\_m².

The equation dG = −SdT + Vdp shows how the Gibbs energy depends on temperature and pressure. G falls as temperature rises, at a rate equal to the entropy, and rises with pressure, at a rate equal to the volume. The Gibbs–Helmholtz equation, (∂(G/T)/∂T)\_p = −H/T², puts the temperature dependence in the form most useful for reactions: if ΔH is known, the change of ΔG/T with temperature follows. For pressure, a liquid or solid has a small, nearly constant volume, so G changes only slightly, by about V\_mΔp. A perfect gas has V = nRT/p, and integrating gives G\_m(p) = G\_m° + RT ln(p/p°), so a gas's Gibbs energy depends strongly on pressure.

### Phase diagrams and the phase rule

For a pure substance the molar Gibbs energy is called the chemical potential, μ. At given temperature and pressure the stable phase is the one with the lowest chemical potential, and two phases can coexist only where their chemical potentials are equal. A phase diagram maps out these regions in the p–T plane. Each area is a region where one phase is stable, the lines between areas are phase boundaries where two phases coexist, and three boundaries meet at the triple point, where solid, liquid and vapour coexist at a single temperature and pressure. The liquid–vapour line ends at the critical point, beyond which liquid and vapour can no longer be distinguished. Water is unusual in that its solid–liquid boundary slopes backwards, because ice is less dense than water, so increasing the pressure lowers the melting point. Carbon dioxide has its triple point above 1 atm, which is why dry ice sublimes instead of melting.

Gibbs's phase rule counts how many intensive variables can be changed freely while keeping a given number of phases in equilibrium. For C components and P phases the number of degrees of freedom is F = C − P + 2. For a pure substance, C = 1, so a single phase has F = 2 and occupies an area; two phases have F = 1 and lie on a line; and three phases have F = 0, a single point. Four phases of one substance can never be in equilibrium.

### The Clapeyron equations

The slopes of the phase boundaries follow from the fact that μ changes with temperature at the rate −S\_m and with pressure at the rate V\_m. Along a boundary the two chemical potentials must remain equal, and this requires dp/dT = Δ\_trsS/Δ\_trsV = Δ\_trsH/(TΔ\_trsV), the Clapeyron equation. For melting ΔV is small, so the solid–liquid line is steep. For vaporisation the vapour volume is so much larger than the liquid's that ΔV ≈ RT/p, and the equation becomes the Clausius–Clapeyron equation, d ln p/dT = Δ\_vapH/RT². Integrated, ln(p₂/p₁) = −(Δ\_vapH/R)(1/T₂ − 1/T₁). A plot of ln p against 1/T is therefore a straight line of slope −Δ\_vapH/R, which is how enthalpies of vaporisation are measured from vapour pressures.

## Summary

### Third law (Atkins 3C)

- Perfect crystal at T = 0: S = 0 (W = 1). Nernst heat theorem: ΔS → 0 as T → 0.
- Calorimetric entropy: S(T) = S(0) + ∫C\_p/T dT + Δ\_fusH/T\_f + ∫C\_p/T dT + Δ\_vapH/T\_b + …
- Debye extrapolation at low T: C\_p = aT³, so S(T) = C\_p(T)/3.
- Δ\_rS° = ΣνS°\_m(products) − ΣνS°\_m(reactants). Gas consumed gives ΔS < 0.

### Helmholtz and Gibbs energies (3D)

```latex
A = U - TS,\qquad G = H - TS = A + pV
```

- From Clausius dS ≥ dq/T: at constant T, V, dA ≤ 0; at constant T, p, dG ≤ 0. Equilibrium at the minimum.
- ΔG = ΔH − TΔS. Signs: ΔH < 0, ΔS > 0 always spontaneous; ΔH > 0, ΔS < 0 never; otherwise depends on T (entropy wins at high T).
- ΔA = maximum total work; ΔG = maximum non-expansion work (electrical, etc.).
- Δ\_rG° = ΣνΔ\_fG°(products) − ΣνΔ\_fG°(reactants), or Δ\_rH° − TΔ\_rS°. Δ\_fG° = 0 for elements in reference states.

### Fundamental equation and Maxwell relations (3E)

```latex
dU = T\,dS - p\,dV,\quad dH = T\,dS + V\,dp,\quad dA = -S\,dT - p\,dV,\quad dG = -S\,dT + V\,dp
```

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

### Phase diagrams (4A)

- Chemical potential of a pure substance μ = G\_m. Stable phase = lowest μ; coexistence where μ is equal.
- Transferring dn from a region of μ₁ to μ₂ changes G by (μ₂ − μ₁)dn; matter flows to lower μ.
- Areas: one phase. Lines: two phases. Triple point: three. Critical point: end of the liquid–vapour line.
- Water: triple point 273.16 K, 611 Pa; solid–liquid line has negative slope (ice less dense). CO₂: triple point 5.11 atm, so it sublimes at 1 atm.
- Phase rule: F = C − P + 2. For C = 1: P = 1 area (F = 2), P = 2 line (F = 1), P = 3 point (F = 0). Maximum phases in equilibrium: C + 2.

### Phase transitions (4B)

- (∂μ/∂T)\_p = −S\_m (falls faster for gas, then liquid, then solid); (∂μ/∂p)\_T = V\_m.
- Clapeyron: dp/dT = Δ\_trsH/(TΔ\_trsV). Solid–liquid: steep, slope sign set by ΔV.
- Clausius–Clapeyron (vapour ideal, V\_liquid neglected):

```latex
\frac{d\ln p}{dT} = \frac{\Delta_{vap}H}{RT^2},\qquad \ln\frac{p_2}{p_1} = -\frac{\Delta_{vap}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
```

- ln p vs 1/T has slope −Δ\_vapH/R. With log₁₀, multiply the slope by 2.303.
- Trouton's rule: Δ\_vapS ≈ 85 J K⁻¹ mol⁻¹ for many liquids.

### What to be able to do without notes

- State the third law and use S = C\_p/3 at low T and tabulated S° for Δ\_rS°.
- Derive the criteria dA ≤ 0 and dG ≤ 0 from the Clausius inequality.
- Calculate Δ\_rG° and say when a reaction becomes spontaneous.
- Write dU, dH, dA, dG and derive any Maxwell relation; use one to find π\_T or (∂S/∂V)\_T.
- Read a phase diagram and apply F = C − P + 2.
- Derive the Clapeyron equation and use Clausius–Clapeyron for Δ\_vapH or a boiling point.

## Questions

Points in brackets. Items tagged with an Atkins code are from your HW list (sometimes with data filled in so they work without the tables). R = 8.314 J K⁻¹ mol⁻¹; RT at 298 K ≈ 2.48 kJ mol⁻¹.

### A. State and explain (2–3 points)

1. (2) State the third law of thermodynamics and explain it in terms of S = k ln W.
2. (2) Why are the Helmholtz and Gibbs energies more convenient than the total entropy for deciding spontaneity?
3. (3) What is the physical meaning of ΔA and ΔG in terms of work?
4. (2) A reaction has ΔH > 0 and ΔS > 0. At what temperatures is it spontaneous? Give the general condition.
5. (2) What is the chemical potential of a pure substance, and how does it decide which phase is stable?
6. (3) Sketch the phase diagram of water and label the areas, lines, triple point and critical point. Why does the solid–liquid line slope backwards?
7. (2) Why does solid CO₂ sublime at 1 atm rather than melt?
8. (2) Why does the chemical potential of a gas fall more steeply with temperature than that of the liquid?

### B. Show or derive (3–5 points)

9. (4) Starting from the Clausius inequality, show that at constant temperature and pressure a spontaneous change has dG ≤ 0.
10. (3) From dU = TdS − pdV and the definitions of H, A and G, write dH, dA and dG. Derive the Maxwell relation (∂S/∂V)\_T = (∂p/∂T)\_V.
11. (3) Show that π\_T = T(∂p/∂T)\_V − p, and evaluate it for a perfect gas and for a van der Waals gas.
12. (4) Use (∂S/∂V)\_T = (∂p/∂T)\_V to find (∂S/∂V)\_T for a perfect gas, a van der Waals gas p = RT/(V\_m − b) − a/V\_m², and a Dieterici gas p = RTe^(−a/RTV\_m)/(V\_m − b). For an isothermal expansion, compare ΔS for the perfect and van der Waals gases. *(P3E.4)*
13. (3) Derive the Gibbs–Helmholtz equation (∂(G/T)/∂T)\_p = −H/T².
14. (4) Derive the Clapeyron equation, and from it the Clausius–Clapeyron equation. State the approximations.
15. (2) Using the phase rule, show that four phases of a pure substance cannot coexist.

### C. Numericals

16. (2) The molar heat capacity of a solid at 10 K is 0.43 J K⁻¹ mol⁻¹. Find its molar entropy at that temperature. *(Ex 3C.1)*
17. (2) Calculate Δ\_rS° at 298 K for ½N₂(g) + 3/2 H₂(g) → NH₃(g). S°\_m: NH₃ 192.45, N₂ 191.61, H₂ 130.68 J K⁻¹ mol⁻¹. *(E3C.3(a))*
18. (2) Find Δ\_rG° at 298 K for 4HI(g) + O₂(g) → 2I₂(s) + 2H₂O(l). Δ\_fG°: HI(g) +1.70, H₂O(l) −237.13 kJ mol⁻¹. *(E3D.2(a))*
19. (3) For the combustion of glucose at 298 K, Δ\_cH° = −2808 kJ mol⁻¹ and Δ\_cS° = +182 J K⁻¹ mol⁻¹. How much non-expansion work can 1 mol supply at most? Why is it more than |ΔH|? *(like Ex 3D.2)*
20. (2) CaCO₃ → CaO + CO₂ has ΔH° = +178 kJ mol⁻¹ and ΔS° = +161 J K⁻¹ mol⁻¹. Above what temperature is it spontaneous?
21. (3) Find the change in molar Gibbs energy at 298 K when (a) a perfect gas and (b) liquid water (V\_m = 18 cm³ mol⁻¹) are compressed isothermally from 1 bar to 2 bar. Comment. *(like Ex 3E.3)*
22. (2) The chemical potential of a substance differs by −8.3 kJ mol⁻¹ between two regions. By how much does G change when 0.15 mmol is transferred? *(E4A.2(b))*
23. (2) What is the maximum number of phases in equilibrium in a four-component system? In a one-component system, is P = 1 an area, a line or a point? *(E4A.3(b), E4A.4(a))*
24. (2) The vapour pressure of a liquid fits ln(p/Torr) = 18.361 − (3036.8 K)/T. Find Δ\_vapH. *(E4B.7(b))*
25. (3) The vapour pressure of a liquid fits log₁₀(p/Torr) = 8.750 − (1625 K)/T. Find Δ\_vapH and the normal boiling point (log₁₀ 760 = 2.881). *(E4B.8(b))*
26. (3) The entropies of fusion and vaporisation of water are 22.0 and 109.9 J K⁻¹ mol⁻¹. Find the difference in slope of μ against T on either side of (a) the freezing point and (b) the boiling point. (c) By how much does μ of water supercooled to −5 °C exceed that of ice? *(P4B.5)*
27. (3) Estimate the melting point of ice at 50 bar. Densities: ice 0.92, water 1.00 g cm⁻³; Δ\_fusH = 6.01 kJ mol⁻¹. *(E4B.14(a))*

### D. Estimate

28. (2) Use Trouton's rule to estimate Δ\_vapH of benzene (T\_b = 353 K).
29. (3) At the top of a high mountain the pressure is about 1/3 atm. Estimate the boiling point of water (Δ\_vapH = 40.7 kJ mol⁻¹, ln 3 ≈ 1.1).

## Answer key

### A. State and explain

1. The entropy of every perfect crystalline substance is zero at T = 0. A perfect crystal at absolute zero has exactly one arrangement, W = 1, so S = k ln 1 = 0. Any disorder (defects, random orientations) leaves W > 1 and a residual entropy.
2. Spontaneity requires ΔS\_total ≥ 0, which needs the entropy of the surroundings too. At constant T and p (or T and V) the surroundings' entropy change is −ΔH/T (or −ΔU/T), and it is built into G (or A), so the criterion uses only system properties.
3. −ΔA is the maximum work (of any kind) a process at constant T can do. −ΔG is the maximum non-expansion work at constant T and p, such as the electrical work of a cell.
4. ΔG = ΔH − TΔS < 0 when T > ΔH/ΔS. Entropy drives it at high temperature.
5. μ = G\_m. At given T and p the phase with the lowest μ is stable; matter flows from high to low μ; phases coexist where their μ are equal.
6. Areas solid, liquid, vapour; boundaries for melting, boiling and sublimation; triple point 273.16 K, 611 Pa; liquid–vapour line ends at the critical point (647 K, 218 atm). The solid–liquid line has negative slope because Δ\_fusV < 0 (ice is less dense), so in dp/dT = ΔH/(TΔV) the slope is negative: pressure lowers the melting point.
7. Its triple point is at 5.11 atm. Below that pressure the liquid is never the stable phase, so at 1 atm the solid goes straight to vapour.
8. (∂μ/∂T)\_p = −S\_m, and S\_m(gas) > S\_m(liquid), so the gas's μ falls faster. That is why the gas becomes the stable phase at high temperature.

### B. Show or derive

9. Clausius: dS ≥ dq/T. At constant p with only expansion work, dq = dH, so dS ≥ dH/T, i.e. dH − TdS ≤ 0. At constant T, dG = dH − TdS − SdT = dH − TdS, so dG ≤ 0. Equality holds at equilibrium.
10. dH = dU + pdV + Vdp = TdS + Vdp. dA = dU − TdS − SdT = −SdT − pdV. dG = dH − TdS − SdT = −SdT + Vdp. From dA: (∂A/∂T)\_V = −S and (∂A/∂V)\_T = −p. Equal mixed derivatives give (∂S/∂V)\_T = (∂p/∂T)\_V.
11. Divide dU = TdS − pdV by dV at constant T: π\_T = T(∂S/∂V)\_T − p = T(∂p/∂T)\_V − p (Maxwell). Perfect gas: T(nR/V) − p = 0. Van der Waals: T·R/(V\_m − b) − p = a/V\_m².
12. Perfect: R/V\_m, so ΔS = R ln(V\_f/V\_i). Van der Waals: R/(V\_m − b), so ΔS = R ln((V\_f − b)/(V\_i − b)), larger than the perfect-gas value because the molecules have less free volume to start with. Dieterici: (∂p/∂T)\_V = \[R/(V\_m − b)\] e^(−a/RTV\_m)(1 + a/RTV\_m).
13. (∂(G/T)/∂T)\_p = (1/T)(∂G/∂T)\_p − G/T² = −S/T − G/T² = −(TS + G)/T² = −H/T², using G = H − TS.
14. Along the boundary μα = μβ, so dμα = dμβ: −SαdT + Vαdp = −SβdT + Vβdp. So dp/dT = Δ\_trsS/Δ\_trsV = Δ\_trsH/(TΔ\_trsV). For vaporisation, neglect V\_liquid and treat the vapour as perfect: ΔV ≈ RT/p. Then dp/dT = pΔ\_vapH/RT², i.e. d ln p/dT = Δ\_vapH/RT². Also assume Δ\_vapH is constant over the range when integrating.
15. F = C − P + 2 = 1 − 4 + 2 = −1 < 0, which is impossible, so four phases cannot coexist.

### C. Numericals

16. S = C\_p/3 = 0.14 J K⁻¹ mol⁻¹.
17. 192.45 − ½(191.61) − 3/2(130.68) = 192.45 − 95.81 − 196.02 = −99.4 J K⁻¹ mol⁻¹. Negative, since 2 mol of gas become 1.
18. 2(−237.13) − 4(1.70) = −474.26 − 6.80 = −481.1 kJ mol⁻¹. Spontaneous.
19. ΔG = −2808 − 298 × 0.182 = −2808 − 54 = −2862 kJ, so up to 2862 kJ of non-expansion work. Since ΔS > 0, some heat can flow in from the surroundings and still keep the total entropy from falling, adding to the work available.
20. T > 178000/161 ≈ 1100 K (about 830 °C).
21. (a) RT ln 2 = 2.48 × 0.693 ≈ 1.72 kJ mol⁻¹. (b) V\_mΔp = 18 × 10⁻⁶ × 10⁵ = 1.8 J mol⁻¹. A gas's Gibbs energy is about a thousand times more sensitive to pressure, because its molar volume is so much larger.
22. ΔG = nΔμ = 0.15 × 10⁻³ × (−8.3 × 10³) ≈ −1.2 J.
23. F = 0 gives P\_max = C + 2 = 6. For C = 1, P = 1 gives F = 2: an area, in which T and p can both be varied.
24. Slope of ln p vs 1/T is −Δ\_vapH/R, so Δ\_vapH = 3036.8 × 8.314 ≈ 25.2 kJ mol⁻¹.
25. Δ\_vapH = 2.303 × 8.314 × 1625 ≈ 31.1 kJ mol⁻¹. At p = 760 Torr: 1625/T = 8.750 − 2.881 = 5.869, so T\_b ≈ 277 K.
26. The slope is −S\_m, so the difference (liquid minus solid, or vapour minus liquid) is −Δ\_trsS. (a) −22.0 J K⁻¹ mol⁻¹. (b) −109.9 J K⁻¹ mol⁻¹. (c) Δμ ≈ Δ\_fusS × ΔT = 22.0 × 5 = 110 J mol⁻¹ above ice, so supercooled water tends to freeze.
27. V\_m(ice) = 18.0/0.92 ≈ 19.6 cm³, V\_m(water) = 18.0 cm³, so Δ\_fusV ≈ −1.6 cm³ mol⁻¹. ΔT ≈ TΔVΔp/ΔH = 273 × (−1.6 × 10⁻⁶) × (49 × 10⁵)/6010 ≈ −0.35 K. It melts at about −0.35 °C.

### D. Estimate

28. Δ\_vapH ≈ 85 × 353 ≈ 30 kJ mol⁻¹ (measured: 30.8).
29. 1/T = 1/373 + (R/Δ\_vapH) ln 3 = 0.00268 + (8.314/40700)(1.1) ≈ 0.00268 + 0.000225 = 0.00291, so T ≈ 344 K, about 70 °C.
