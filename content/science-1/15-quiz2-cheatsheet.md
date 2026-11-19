# Quiz-2 cheat sheet: Thermodynamics (Atkins 11e 1A–3B)

Built from the slides (`thermo.tex`, `thermo-l3.tex`, `thermo-l4.tex`), the tutorial, Atkins 11e and the four teaching docs. Material tagged **[A]** is in Atkins but not in the slides, and **[S]** is in the slides only. Everything else is in both. Homework items are tagged like (E2A.4).

---

## 0. Before anything else

### Sign conventions (the most common way to lose marks)

$$\Delta U = q + w \qquad q,\ w = \text{energy INTO the system}$$

| Quantity | Positive when | Negative when |
|---|---|---|
| $q$ (heat) | heat flows in | heat flows out |
| $w$ (work) | work is done ON the system (compression) | the system does work (expansion) |

- Slides and Atkins: $w = -\int p_\text{ex}\,dV$.
- **The tutorial slides use the opposite convention** ($W$ = work done BY the gas, $\Delta U = Q - W$). If a question says "work done by", flip the sign and state it.
- Engines (L3): $Q_H$, $Q_C$, $W$ are **magnitudes**, with $W = Q_H - Q_C$.
- The Clausius inequality uses **signed** heats.

### Constants and handy numbers (no calculator)

| Quantity | Value |
|---|---|
| $R$ | $8.314\ \text{J K}^{-1}\text{mol}^{-1} = 0.08314\ \text{L bar K}^{-1}\text{mol}^{-1} = 0.08206\ \text{L atm K}^{-1}\text{mol}^{-1}$ |
| $k_B = R/N_A$ | $1.381\times10^{-23}\ \text{J K}^{-1}$ |
| $N_A$ | $6.022\times10^{23}\ \text{mol}^{-1}$ |
| $F$ | $96\,485\ \text{C mol}^{-1}$ |
| 1 bar, 1 atm | $10^5$ Pa, $1.01325\times10^5$ Pa |
| 1 L bar | 100 J |
| $RT$ | 2.48 kJ/mol at 298 K; 2.49 kJ/mol at 300 K; $RT$ = 24.8 L bar/mol at 298 K |
| $V_m$ (perfect gas) | 24.79 L/mol at SATP (298 K, 1 bar); 22.41 L/mol at 273 K, 1 atm |
| logarithms | $\ln 2 = 0.693$, $\ln 3 = 1.099$, $\ln 10 = 2.303$, $\ln(1+x)\approx x$ for small $x$ |
| powers | $10^{0.4} = 2.51$, $10^{1.4} = 25.1$, $8^{2/3} = 4$, $8^{5/3} = 32$, $8^{-0.4} = 0.435$ |
| square roots | $\sqrt2 = 1.414$, $\sqrt3 = 1.732$, $\sqrt{8/\pi} = 1.596$ |

### Unit traps
- **$M$ in kg/mol** for speeds (N₂: 0.028).
- **$T$ in kelvin** everywhere.
- Match $R$ to your units: with L bar, the answer comes out in L bar, and $\times 100$ gives J.
- Δ always means final minus initial. Always write the sign.

### Answering style (90 min, short answers, verbosity is penalised)
State the principle, then the equation, then substitute with units, then box the answer, then one line on sign or meaning. Marking schemes reward each of these steps.

---

## 1A The perfect gas (Atkins p.4–10; slides `thermo.tex` 62–272)

### System vocabulary
| Term | Meaning |
|---|---|
| Open / closed / isolated | exchanges matter and energy / energy only / neither |
| Diathermic / adiabatic wall | lets heat through / does not |
| Intensive / extensive | independent of amount ($p$, $T$, $\rho$, $V_m$) / proportional to amount ($V$, $n$, $U$, $H$, $S$) |
| State / path function | depends only on state ($U$, $H$, $S$, $p$, $V$, $T$) / depends on route ($q$, $w$) |
| Equilibrium | properties uniform and unchanging; thermal (same $T$), mechanical (same $p$), chemical |

### Zeroth law
If A ~ C and B ~ C are in thermal equilibrium, then A ~ B. This makes temperature well defined, and C is a thermometer.

- *Cold bench:* metal and wood are at the same $T$. Metal feels colder because it conducts heat from the skin faster, and touch senses heat flow, not temperature.

### Gas thermometer and the Kelvin scale
At constant $V$, $p \propto T$:

$$T = T_3\,\frac{p}{p_3},\qquad T_3 = 273.16\ \text{K (triple point of water)}$$

- All gases, in the limit $p \to 0$, extrapolate to $p = 0$ at $\theta = -273.15\ ^\circ$C.
- $T/\text{K} = \theta/^\circ\text{C} + 273.15$.
- Tutorial P1: 6.69 kPa at $T_3$ gives 9.14 kPa at 100 °C. A reading of 8.00 kPa means 326.6 K = 53.5 °C.
- **(P1A.2)** For a new scale based on two fixed points, plot $p$ against $\theta$, which is linear. Absolute zero is where the line meets $p = 0$. Convert it to the new scale by linear interpolation.

### Gas laws and the perfect gas equation
| Law | Statement | Held constant |
|---|---|---|
| Boyle | $pV$ = const | $n$, $T$ |
| Charles | $V \propto T$ (and $p \propto T$) | $n$, $p$ (or $V$) |
| Avogadro | $V \propto n$ | $p$, $T$ |

$$pV = nRT = Nk_BT \qquad \frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}\ (\text{fixed } n)$$

- It is a *limiting law*: exact only as $p \to 0$.
- (Ex 1A.1) Heating at constant $V$: $p_2 = p_1 T_2/T_1$. 100 atm at 300 K becomes 167 atm at 500 K.

### Molar mass from density **(E1A.9)**

$$\rho = \frac{m}{V} = \frac{pM}{RT} \;\Rightarrow\; M = \frac{\rho RT}{p}$$

### Mixtures **[A]** (Ex 1A.2, E1A.11)

$$x_J = \frac{n_J}{n},\quad \sum_J x_J = 1,\qquad p_J = x_J\,p,\quad p = \sum_J p_J\ \text{(Dalton)}$$

- For a perfect gas, each component behaves as if alone: $p_J = n_J RT/V$.
- From a **mass** composition, divide each mass by its $M$ to get moles, then take mole fractions.

### Barometric formula **[A]** (P1A.11)

$$\frac{dp}{dh} = -\rho g = -\frac{pMg}{RT}\;\Rightarrow\; p = p_0\,e^{-h/H},\quad H = \frac{RT}{Mg} \approx 8\ \text{km}$$

---

## 1B The kinetic model (Atkins p.11–18; slides `thermo.tex` 277–440, 504–539)

### Assumptions
1. Molecules of mass $m$ are in ceaseless random motion.
2. Their size is negligible compared with the distances travelled.
3. They do not interact except in brief elastic collisions.

### Pressure derivation (memorise the skeleton)
1. One molecule hits the wall: $\Delta p_x = 2mv_x$. The time between hits on the same wall is $2L/v_x$, so $F = mv_x^2/L$.
2. Sum over $N$ molecules and divide by $L^2$: $p = Nm\langle v_x^2\rangle/V$.
3. Isotropy gives $\langle v_x^2\rangle = \langle v_y^2\rangle = \langle v_z^2\rangle = \tfrac13\langle v^2\rangle$.

$$pV = \tfrac13 Nm\langle v^2\rangle = \tfrac23 N\langle E_k\rangle$$

4. Compare with $pV = Nk_BT$:

$$\boxed{\langle E_k\rangle = \tfrac12 m\langle v^2\rangle = \tfrac32 k_BT}\qquad \text{(per mole: } \tfrac32 RT\text{)}$$

$T$ measures the average translational KE. It is independent of mass.

### Characteristic speeds (all $\propto\sqrt{T/M}$)
| Speed | Formula | N₂, 300 K |
|---|---|---|
| most probable | $v_\text{mp} = \sqrt{2RT/M}$ | 422 m/s |
| mean | $v_\text{mean} = \sqrt{8RT/\pi M}$ | 476 m/s |
| root mean square | $v_\text{rms} = \sqrt{3RT/M}$ | 517 m/s |
| mean relative **[A]** | $v_\text{rel} = \sqrt2\,v_\text{mean}$ (same species) | 674 m/s |

- The ratio $v_\text{mp} : v_\text{mean} : v_\text{rms} = 1 : 1.128 : 1.225$. They are ordered this way because of the long high-speed tail.
- Other $v_\text{rms}$ values: He at 300 K is 1.37 km/s. At 20 °C (E1B.2), H₂ is 1.90 km/s and O₂ is 0.48 km/s.
- Doubling $T$ multiplies speeds by $\sqrt2$, **not 2**. At the same $T$, $v \propto 1/\sqrt M$, so H₂ is 4× faster than O₂.

### Maxwell–Boltzmann distribution

$$f(v) = 4\pi\left(\frac{M}{2\pi RT}\right)^{3/2} v^2\, e^{-Mv^2/2RT}$$

- The $v^2$ factor: more ways (a bigger spherical shell) to have higher speed.
- The exponential: high energies are rare.
- Higher $T$ or lower $M$: the peak moves right, and the curve gets broader and flatter. The area is always 1.
- **$v_\text{mp}$ (P1B.10, tutorial P3a):** set $\frac{d}{dv}\left(v^2e^{-Mv^2/2RT}\right) = \left(2v - \frac{Mv^3}{RT}\right)e^{\cdots} = 0$. This gives $v^2 = 2RT/M$.
- **Fraction in a narrow window:** $\Delta N/N \approx f(v)\,\Delta v$ (tutorial P3b: about 0.9 %).
- **Mean speed (Ex 1B.1):** $v_\text{mean} = \int_0^\infty v f(v)\,dv = \sqrt{8RT/\pi M}$.
- **Escape (P1B.7, tutorial P2):** $v_\text{esc} = \sqrt{2gR_\text{planet}}$, which is 11.2 km/s for Earth. Setting $v = v_\text{esc}$ gives the temperature at which that happens. Light gases escape even at low $T$, because a fraction of molecules in the high-speed tail always exceeds $v_\text{esc}$ and collisions keep refilling the tail.

### Collisions **[A]** (E1B.8)
| Quantity | Formula |
|---|---|
| collision cross-section | $\sigma = \pi d^2$ (d = molecular diameter); N₂ ≈ 0.40 nm², Ar 0.36 nm² |
| collision frequency | $z = \sigma v_\text{rel}\,\dfrac{N}{V} = \dfrac{\sigma v_\text{rel}\,p}{k_BT}$ (N₂ at 1 atm, 300 K: $6.6\times10^{9}\ \text{s}^{-1}$) |
| mean free path | $\lambda = \dfrac{v_\text{rel}}{z} = \dfrac{k_BT}{\sigma p}$ (about 100 nm at 1 atm) |

- $\lambda \propto 1/p$ at fixed $T$. To make $\lambda$ equal a length $L$, set $p = k_BT/(\sigma L)$.

### Concept checks
- H₂ and O₂ at the same $T$ have the **same** $\langle E_k\rangle$. H₂ has 4× the $v_\text{rms}$.
- Doubling $T$ at constant $V$ raises $v_\text{rms}$ by a factor of $\sqrt2$ and doubles $p$.
- The total translational KE of a gas is $\tfrac32 pV$, independent of the species (tutorial P2b).

---

## 1C Real gases (Atkins p.19–27; slides `thermo.tex` 445–499)

### Compression factor

$$Z = \frac{pV_m}{RT}\qquad Z = 1\ \text{perfect};\quad Z < 1\ \text{attractions dominate};\quad Z > 1\ \text{repulsions dominate (high } p)$$

The perfect gas law fails at **high $p$** (molecular size matters) and **low $T$** (attractions matter).

### Virial equation **[A]**

$$pV_m = RT\left(1 + \frac{B}{V_m} + \frac{C}{V_m^2} + \cdots\right)$$

- $B(T)$ is the second virial coefficient. At the **Boyle temperature**, $B = 0$ and the gas behaves nearly perfectly over a range of $p$.
- For a van der Waals gas, $B = b - a/RT$, so $T_B = a/(Rb)$.

### van der Waals equation

$$\left(p + \frac{a}{V_m^2}\right)(V_m - b) = RT \quad\Longleftrightarrow\quad p = \frac{RT}{V_m - b} - \frac{a}{V_m^2}$$

| Term | Meaning |
|---|---|
| $b$ | excluded volume per mole (repulsion), which raises $p$ |
| $a/V_m^2$ | pressure reduction from attractions; it scales as $(n/V)^2$ because attraction needs **pairs** |

| Gas | $a$ / L² bar mol⁻² | $b$ / L mol⁻¹ |
|---|---|---|
| He | 0.0346 | 0.0238 |
| N₂ | 1.370 | 0.0387 |
| CO₂ | 3.640 | 0.0427 |

- Tutorial P4 (5 mol in 1 L at 298 K): $p_\text{ideal}$ = 124 bar. N₂ gives 119 bar ($Z$ = 0.96, $a$ wins). He gives 140 bar ($Z$ = 1.13, $b$ wins).
- Slide example: 1 mol CO₂ in 0.5 L at 300 K gives $p_\text{ideal}$ = 49.9 bar but $p_\text{vdW}$ = 54.5 − 14.6 = 40.0 bar.

### Critical point and corresponding states **[A]**
- At the critical point the isotherm has a horizontal inflection: $(\partial p/\partial V_m)_T = 0$ and $(\partial^2 p/\partial V_m^2)_T = 0$. These give:

$$V_c = 3b,\qquad T_c = \frac{8a}{27Rb},\qquad p_c = \frac{a}{27b^2},\qquad Z_c = \frac{p_cV_c}{RT_c} = \frac38$$

- Below $T_c$, vdW isotherms show unphysical loops. They are replaced by a flat line drawn so that the areas above and below are equal (the Maxwell construction): that line is liquid–vapour coexistence.
- Reduced variables are $p_r = p/p_c$, $T_r = T/T_c$, $V_r = V_m/V_c$. **Corresponding states:** real gases at the same $T_r$ and $V_r$ have about the same $p_r$ and the same $Z$.
- Reduced vdW equation: $p_r = \dfrac{8T_r}{3V_r - 1} - \dfrac{3}{V_r^2}$. It contains no $a$ or $b$.
- Characteristic temperatures for a vdW gas: $T_c = \tfrac{8}{27}T_B$, $T_B = a/Rb$, $T_I = 2a/Rb = 2T_B$. For N₂ these are 126, 426 and 852 K.

---

## 2A Internal energy (Atkins p.34–45; slides `thermo.tex` 600–867, 1124–1352)

### Work and heat
- **Work:** energy transfer that uses *organised* motion in the surroundings (a weight falls, a piston moves). It could in principle raise a weight.
- **Heat:** energy transfer driven by a temperature difference, using *disorderly* thermal motion.
- Both describe energy in transit. A body contains neither.
- Joule's paddle wheel: 4.18 J of work has the same effect as 1 cal of heat.
- Exothermic means it releases heat ($q < 0$). Endothermic means it absorbs heat.

### First law
$U$ is a state function. For a closed system, $\Delta U = q + w$; for an isolated system, $\Delta U = 0$.

$$dU = dq + dw,\qquad \oint dU = 0,\qquad \oint dq \ne 0$$

### Expansion work

$$dw = -p_\text{ex}\,dV$$

| Process | Work on the gas |
|---|---|
| free expansion ($p_\text{ex} = 0$) | $w = 0$ |
| constant $p_\text{ex}$ | $w = -p_\text{ex}\Delta V$ |
| reversible ($p_\text{ex} = p$ at every step) | $w = -\int p\,dV$ |
| reversible isothermal, perfect gas | $w = -nRT\ln\dfrac{V_f}{V_i} = -nRT\ln\dfrac{p_i}{p_f}$ |
| gas produced at constant $p_\text{ex}$ (Ex 2A.1) | $w = -p_\text{ex}\Delta V = -n_\text{gas}RT$; a closed fixed vessel gives $w = 0$ |

- $|w|$ is the area under the path on a $p$–$V$ diagram, so work depends on the path.
- **Reversible means maximum work out.** At every step $p_\text{ex}$ is as large as it can be without stopping the expansion. Any irreversible route gives less.
- Slide example: 1 mol, 300 K, 10 → 20 L reversibly gives $w = -RT\ln2 = -1.73$ kJ, and $q = +1.73$ kJ.
- Slide two-route example (A: 1 bar, 20 L to C: 2 bar, 10 L): route 1 gives $w = +1.0$ kJ, route 2 gives $w = +2.0$ kJ. $\Delta U = 0$ on both because $T_A = T_C$, so $q = -1.0$ and $-2.0$ kJ.

### Model results: E2A.4 type (1 mol perfect gas, 293 K, 10 → 30 L)
| Route | $w$ | $q$ | $\Delta U$ |
|---|---|---|---|
| reversible isothermal | $-RT\ln3 = -2.68$ kJ | +2.68 kJ | 0 |
| against constant $p_\text{ex} = p_f$ | $-p_f\Delta V = -RT(20/30) = -1.62$ kJ | +1.62 kJ | 0 |
| free (vacuum) | 0 | 0 | 0 |

$\Delta U = 0$ in every case because $T$ is constant and the gas is perfect. Only the split between $q$ and $w$ changes.

### Work with an equation of state (P2A.6)
For $p = nRT/V - n^2a/V^2$:

$$w = -nRT\ln\frac{V_f}{V_i} + n^2a\left(\frac1{V_i} - \frac1{V_f}\right)$$

The second term is positive on expansion, so **less** work is done on the surroundings than by a perfect gas. Attractions hold the gas back.

### Other kinds of work [S] (Atkins Table 2A.1; Zemansky ch.3)
General form: $dw = Y\,dX$, with $Y$ an intensive "force" and $X$ an extensive "displacement".

| System | $dw$ (on the system) |
|---|---|
| gas | $-p\,dV$ |
| wire / rubber band | $+\mathcal F\,dL$ (plus sign: tension pulls inward). For Hooke's law $\mathcal F = k(L - L_0)$: $w = \tfrac12k(L - L_0)^2$ |
| surface film | $\gamma\,dA$. A soap film has **two** faces: $dA = 2\ell\,dx$ |
| electrochemical cell | $\mathcal E\,dZ$ (Atkins: $\phi\,dQ$). Reversible: $W = nF\mathcal E$ |
| dielectric slab | $E\,d\Pi$ |
| paramagnet | $\mu_0\mathcal H\,d\mathcal M$. Curie's law: $\mathcal M = C_C\mathcal H/T$ |

- Generalised first law: $dU = dq - p\,dV + \mathcal F\,dL + \gamma\,dA + \mathcal E\,dZ + \cdots$
- Atkins: $dU = dq + dw_\text{exp} + dw_\text{add}$.
- (P2A.3) Elastomer: $w = \int_0^{x} F\,dx$ with the given $F(x)$. For $k_f(x) = a - bx^{1/2}$, $F = (a - bx^{1/2})x$ and $w = \tfrac12 ax^2 - \tfrac25 bx^{5/2}$.

### Molecular interpretation and equipartition
- Each quadratic term in the energy contributes $\tfrac12 k_BT$ per molecule.

| Molecule | Translational | Rotational | $U_m - U_m(0)$ | $C_{V,m}$ |
|---|---|---|---|---|
| monatomic | 3 | 0 | $\tfrac32RT$ | $\tfrac32R$ |
| linear | 3 | 2 | $\tfrac52RT$ | $\tfrac52R$ |
| nonlinear | 3 | 3 | $3RT$ | $3R$ |

- Vibrations are frozen at room $T$, which is why N₂ is not $\tfrac72R$. An active vibrational mode adds $k_BT$ (kinetic + potential).
- **For a perfect gas, $U$ depends only on $T$.**

### Heat capacity and calorimetry
$$C_V = \left(\frac{\partial U}{\partial T}\right)_V,\qquad \Delta U = q_V = C_V\Delta T\ \ (\text{constant }V,\ C_V\text{ constant})$$

- **Bomb calorimeter [A]** works at constant $V$, so it measures $\Delta U$. Calibrate first: $C_\text{cal} = q/\Delta T$, using a known reaction or electrical heating $q = IVt$. Then $q = C_\text{cal}\Delta T$.
- (E2C.4) Calorimeter constant from a standard: $C_\text{cal} = n|\Delta_cU|/\Delta T$. For the second sample, $\Delta T = n'|\Delta_cU'|/C_\text{cal}$. Get $\Delta_cU$ from $\Delta_cH$ using $\Delta n_g RT$ (see 2B).

---

## 2B Enthalpy (Atkins p.46–50; slides `thermo.tex` 893–937, 989–1022)

### Definition
$$H = U + pV,\qquad dH = dq\ \ (\text{constant }p,\ \text{no extra work})\ \Rightarrow\ \Delta H = q_p$$

- $H$ is a state function.
- **Reactions with gases [A]:** $\Delta H = \Delta U + \Delta n_g RT$, where $\Delta n_g$ = moles of gas in products minus reactants (E2B.2, E2C.6).
    - Example: $\text{N}_2 + 3\text{H}_2 \to 2\text{NH}_3$ has $\Delta n_g = -2$, so $\Delta H_m - \Delta U_m = -2RT = -4.96$ kJ/mol at 298 K.
    - Condensed phases: $\Delta H \approx \Delta U$.

### Heat capacity at constant pressure
$$C_p = \left(\frac{\partial H}{\partial T}\right)_p,\qquad \Delta H = \int_{T_1}^{T_2} C_p\,dT$$

- **Temperature-dependent [A]:** $C_{p,m} = a + bT + c/T^2$ (Table 2B.1). Then (Ex 2B.2, E2B.3)

$$\Delta H_m = a(T_2 - T_1) + \tfrac12 b(T_2^2 - T_1^2) - c\left(\frac1{T_2} - \frac1{T_1}\right)$$

- E2B.3 recipe for $C_p = \alpha + \beta T$:
    - At constant $p$: $q = \Delta H$, $w = -nR\Delta T$, $\Delta U = \Delta H - nR\Delta T$.
    - At constant $V$: $w = 0$, and $\Delta U$ and $\Delta H$ are **the same as at constant $p$** (both state functions, perfect gas, same $\Delta T$). So $q = \Delta U$.

### Relation between heat capacities (perfect gas)
$$H = U + nRT \;\Rightarrow\; C_p - C_V = nR,\qquad C_{p,m} - C_{V,m} = R,\qquad \gamma = \frac{C_p}{C_V}$$

| Gas | $C_{V,m}$ | $C_{p,m}$ | $\gamma$ |
|---|---|---|---|
| monatomic | $\tfrac32R$ | $\tfrac52R$ | $\tfrac53 = 1.67$ |
| diatomic (room $T$) | $\tfrac52R$ | $\tfrac72R$ | $\tfrac75 = 1.40$ |

- Physically, $C_p > C_V$ because at constant $p$ part of the heat leaves again as expansion work.
- Slide bookkeeping (1 mol monatomic gas, +100 K at constant $p$): $q = +2.08$ kJ, $w = -0.83$ kJ, $\Delta U = +1.25$ kJ. So 40 % of the heat leaves as work.
- Concept check: heating the same gas from 300 to 400 K at constant $V$ and at constant $p$ gives the same $\Delta U$, but $q$ is bigger at constant $p$.
- (P2B.2) Estimate the moles of air in a room as $n = pV/RT$, then $q = nC_{p,m}\Delta T$. Air's small heat capacity is why deserts cool fast at night.

---

## 2C Thermochemistry [A] (Atkins p.51–58; not in slides; 7 homework items)

### Standard states and physical changes
- **Standard state (°):** the pure substance at exactly **1 bar**, at the specified $T$. Tables are at 298.15 K.
- Phase-change enthalpies: $\Delta_\text{sub}H° = \Delta_\text{fus}H° + \Delta_\text{vap}H°$ (same $T$). The reverse process has $-\Delta H$.
- Water: $\Delta_\text{fus}H$ = 6.01 kJ/mol at 273 K; $\Delta_\text{vap}H$ = 40.7 kJ/mol at 373 K.

### Hess's law
The standard reaction enthalpy of an overall reaction is the sum of the values for the steps it can be split into (Ex 2C.1). Add and subtract equations, and multiply by coefficients, exactly as you would do with the equations themselves.

### Formation enthalpies
- $\Delta_fH°$ is the standard enthalpy of forming 1 mol of a compound from its elements in their **reference states**. For an element in its reference state, $\Delta_fH° = 0$.

$$\Delta_rH° = \sum_\text{products}\nu\,\Delta_fH° - \sum_\text{reactants}\nu\,\Delta_fH°\qquad \text{(P2C.8)}$$

- Combustion ($\Delta_cH°$) goes to CO₂(g) + H₂O(l), and $\Delta_cH < 0$.

### Kirchhoff's law (temperature dependence)
$$\Delta_rH°(T_2) = \Delta_rH°(T_1) + \int_{T_1}^{T_2}\Delta_rC_p°\,dT,\qquad \Delta_rC_p° = \sum_\text{prod}\nu C_{p,m}° - \sum_\text{reac}\nu C_{p,m}°$$

- Constant $\Delta_rC_p°$: $\Delta_rH°(T_2) = \Delta_rH°(T_1) + \Delta_rC_p°(T_2 - T_1)$.
- Ex 2C.2: for $\text{H}_2 + \tfrac12\text{O}_2 \to \text{H}_2\text{O(g)}$, $\Delta_rC_p = 33.58 - 28.84 - \tfrac12(29.37) = -9.95$ J/K/mol. So $\Delta_fH°(373\ \text{K}) = -241.82 - 0.75 = -242.57$ kJ/mol.

### Calorimetry and DSC
- A bomb calorimeter gives $\Delta U$. Convert with $\Delta H = \Delta U + \Delta n_gRT$ (E2C.4, E2C.6).
- **DSC** (differential scanning calorimetry) measures the extra heat needed to keep the sample at the reference's temperature during a scan, which gives an excess heat capacity $C_{p,\text{ex}}$. Then:
    - $\Delta_\text{trs}H = \int C_{p,\text{ex}}\,dT$, the area under the peak (P2C.10);
    - the baseline shift across the transition gives $\Delta C_p$.
- (P2C.1) Body heat: if the body were isolated, $\Delta T = q/(mc)$, about 37 K for 10 MJ, 65 kg. The mass of water that must evaporate is $q/\Delta_\text{vap}H$ (per mass), about 4 kg.

---

## 2D State functions and exact differentials (Atkins p.59–66; slides `thermo.tex` 842–862, 1393–1739)

### Exact versus inexact
- $df = M\,dx + N\,dy$ is **exact** (so $f$ is a state function) if and only if $\left(\frac{\partial M}{\partial y}\right)_x = \left(\frac{\partial N}{\partial x}\right)_y$.
- Then $\int_A^B df = f_B - f_A$ and $\oint df = 0$.
- $dq$ and $dw$ are inexact. Hiking analogy: altitude gained is a state function; distance walked is a path function.

**Partial-derivative toolkit**

| Name | Relation |
|---|---|
| reciprocal | $(\partial x/\partial y)_z = 1/(\partial y/\partial x)_z$ |
| Euler chain | $(\partial x/\partial y)_z(\partial y/\partial z)_x(\partial z/\partial x)_y = -1$ |
| mixed derivatives | $\partial^2f/\partial x\partial y = \partial^2f/\partial y\partial x$ |

### Changes in internal energy
$$dU = C_V\,dT + \pi_T\,dV,\qquad \pi_T = \left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p$$

The second formula for $\pi_T$ (the thermodynamic equation of state) is derived in 3E: use it, don't derive it.

| Gas | $\pi_T$ | Meaning |
|---|---|---|
| perfect | 0 | no interactions, so $U = U(T)$ |
| van der Waals | $a/V_m^2 > 0$ | only $a$ appears |

- Molecular meaning: at constant $T$ the KE is fixed, so $\pi_T$ is the change in potential energy as molecules separate.
    - Attractions dominate: $\pi_T > 0$, because pulling molecules apart raises their potential energy.
    - Repulsions dominate: $\pi_T < 0$.
- Size: N₂ at 1 bar has $\pi_T \approx 0.002$ bar (negligible). Dense CO₂ (0.5 L/mol) has 14.6 bar.
- **Isothermal vdW expansion (E2D.2):** $\Delta U_m = \int \pi_T\,dV_m = a\left(\dfrac1{V_{m,i}} - \dfrac1{V_{m,f}}\right)$. Then $w = -\int p\,dV$ using the vdW $p$, and $q = \Delta U - w$.
- **Joule experiment:** free expansion has $w = 0$, and Joule saw no $\Delta T$. He concluded $\pi_T = 0$, but the water bath's huge heat capacity hid the real effect (N₂ doubling cools by about 0.13 K in the gas alone).

### Expansion coefficient and compressibility [A]
$$\alpha = \frac1V\left(\frac{\partial V}{\partial T}\right)_p,\qquad \kappa_T = -\frac1V\left(\frac{\partial V}{\partial p}\right)_T\qquad \text{perfect gas: } \alpha = \frac1T,\ \kappa_T = \frac1p\ \ (\text{Ex 2D.2})$$

$$\left(\frac{\partial U}{\partial T}\right)_p = \alpha\pi_TV + C_V,\qquad C_p - C_V = \frac{\alpha^2TV}{\kappa_T}\ \ (\text{general; } = nR \text{ for a perfect gas; P2D.2})$$

**I2.5 one-liner.** $\left(\dfrac{\partial C_V}{\partial V}\right)_T = \dfrac{\partial^2U}{\partial V\partial T} = \left(\dfrac{\partial \pi_T}{\partial T}\right)_V = T\left(\dfrac{\partial^2p}{\partial T^2}\right)_V$. This is 0 for a perfect gas because $p$ is linear in $T$.

### Changes in enthalpy and the Joule–Thomson effect
$$dH = C_p\,dT + \mu_T\,dp,\qquad \mu_T = \left(\frac{\partial H}{\partial p}\right)_T = -C_p\,\mu\ \ (\text{Euler chain})$$

**Why throttling conserves enthalpy.** In steady flow through a porous plug in an insulated tube, $q = 0$. Pushing the gas in and out gives $w = p_iV_i - p_fV_f$. So $U_f - U_i = p_iV_i - p_fV_f$, which means $H_f = H_i$: the process is **isenthalpic**.

$$\mu = \left(\frac{\partial T}{\partial p}\right)_H\qquad \mu > 0:\ \text{gas cools on expansion};\quad \mu < 0:\ \text{gas warms}$$

- **Molecular picture:** attractions dominate, so molecules climb out of each other's potential wells and lose kinetic energy, and $T$ falls. Repulsions dominate, so $T$ rises. At high $T$, repulsions win. For a perfect gas, $\mu = 0$.
- **van der Waals, low pressure (P2D.8):**

$$\mu \approx \frac{1}{C_{p,m}}\left(\frac{2a}{RT} - b\right),\qquad T_I = \frac{2a}{Rb}$$

- N₂ at 298 K: $\mu \approx 0.25$ K/bar (measured 0.27 K/atm). The vdW $T_I$ is about 850 K; the real value is 621 K.

| Gas | $\mu$ / K atm⁻¹ (298 K) | $T_I$ / K | Effect when throttled at room $T$ |
|---|---|---|---|
| CO₂ | +1.1 | ~1500 | cools strongly (extinguisher frosts) |
| N₂ | +0.27 | 621 | cools |
| H₂ | −0.03 | ~200 | warms |
| He | −0.06 | ~40 | warms slightly |

- **Linde liquefaction:**
    1. Compress the gas and remove the heat of compression.
    2. Throttle it, so it cools (only if it is inside the inversion curve).
    3. Use the cold gas to pre-cool the incoming gas in a counter-current heat exchanger.
    4. Repeat until the gas liquefies.
- H₂ and He must first be pre-cooled below $T_I$ (H₂ with liquid N₂, He with liquid H₂).
- Measuring $\mu_T$: keep $T$ constant with a heater, and $\mu_T \approx -q/\Delta p$ per mole.

---

## 2E Adiabatic changes (Atkins p.67–69; slides `thermo.tex` 942–988, 1025–1121)

### Reversible adiabatic process, perfect gas ($q = 0$)
$$dU = dw:\quad nC_{V,m}\,dT = -\frac{nRT}{V}\,dV\;\Rightarrow\;\frac{dT}{T} = -\frac{R}{C_{V,m}}\frac{dV}{V} = -(\gamma - 1)\frac{dV}{V}$$

$$TV^{\gamma-1} = \text{const},\qquad pV^\gamma = \text{const},\qquad T^\gamma p^{1-\gamma} = \text{const}$$

- **Atkins form:** $V_iT_i^{\,c} = V_fT_f^{\,c}$ with $c = C_{V,m}/R$. Equivalently $T_f = T_i(V_i/V_f)^{1/c}$.
- **Work:** $w_\text{ad} = C_V\Delta T = \dfrac{p_fV_f - p_iV_i}{\gamma - 1}$.
- **Irreversible adiabatic process against a constant $p_\text{ex}$:** $nC_{V,m}(T_f - T_i) = -p_\text{ex}(V_f - V_i)$. Solve this together with $pV = nRT$. Do **not** use $pV^\gamma$, which holds only for reversible paths.
- The adiabat is steeper than the isotherm: $\dfrac{dp}{dV}\Big|_\text{ad} = -\gamma\dfrac pV$ against $-\dfrac pV$. With no heat coming in, the expanding gas cools, so $p$ falls faster.
- Compression heats the gas; expansion cools it.

### Fire syringe (slide example)
Air ($\gamma = 1.4$) at 1 bar and 300 K is compressed to $V/10$:
- $T_2 = 300\times10^{0.4} = 754$ K (about 480 °C)
- $p_2 = 10^{1.4} = 25$ bar

The same physics ignites the fuel in a diesel engine.

### The four standard processes (perfect gas)
| Process | $w$ | $q$ | $\Delta U$ | $\Delta H$ |
|---|---|---|---|---|
| isochoric | 0 | $nC_{V,m}\Delta T$ | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |
| isobaric | $-p\Delta V = -nR\Delta T$ | $nC_{p,m}\Delta T$ | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |
| isothermal (rev) | $-nRT\ln(V_f/V_i)$ | $-w$ | 0 | 0 |
| adiabatic (rev) | $nC_{V,m}\Delta T$ | 0 | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |

**$\Delta U = nC_{V,m}\Delta T$ in every row,** because $U$ depends only on $T$.

### Free expansion versus reversible adiabatic expansion
Both have $q = 0$:
- **Free expansion:** $w = 0$, so $\Delta U = 0$ and $\Delta T = 0$ for a perfect gas.
- **Reversible adiabatic expansion:** the gas does work, so it cools.

Same $q$, different path, different outcome.

---

## 3A Entropy: the second law, Carnot, Clausius (Atkins p.78–87; slides all of `thermo-l3.tex` and `thermo-l4.tex` 20–99, 188–375)

### Cycles and engines
- Over a cycle $\Delta U = 0$, so the net heat in equals the net work out, which is the **area enclosed** by the loop. A clockwise loop is an engine; an anticlockwise loop is a fridge.
- Engine (magnitudes): absorbs $Q_H$, does $W$, rejects $Q_C$.

$$\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}$$

- **[S] Fridge / heat pump:** $\text{COP}_\text{fridge} = \dfrac{Q_C}{W}$, $\text{COP}_\text{hp} = \dfrac{Q_H}{W} = 1 + \text{COP}_\text{fridge}$. COP can exceed 1, because the work *moves* heat rather than creating it.
    - A heat pump with COP 3.5 delivers 3.5 kJ to the house per 1 kJ of electricity.
- A fridge left open in a closed kitchen **warms** the room: the work input ends up as heat in the room.

### Second law: two statements
| Statement | Content |
|---|---|
| **Kelvin–Planck** | No cyclic device can turn heat from a single reservoir *entirely* into work, so $Q_C > 0$ and $\eta < 1$ always |
| **Clausius** | No cyclic device can move heat from cold to hot with *no other effect* |

- **Equivalence proof [S]:** suppose a "perfect fridge" moves $Q_C$ from cold to hot with no work. Pair it with an ordinary engine that rejects $Q_C$. The cold reservoir then sees no net change, and the pair turns $Q_H - Q_C$ from the hot reservoir entirely into $W$, which violates Kelvin–Planck. The reverse argument also works.
- The word "cyclic" matters: an isothermal expansion turns heat entirely into work, but only once.

### Reversibility
A process is reversible if it can be run backwards with **both** the system and the surroundings restored.
- It needs: a quasi-static process, no dissipation, and heat exchanged only across infinitesimal $\Delta T$.
- Sources of irreversibility: friction, heat flow across a finite $\Delta T$, free expansion, mixing, resistance, and fast changes.

### Carnot cycle (two isotherms and two adiabats)
| Step | Process | Heat | Entropy change of gas |
|---|---|---|---|
| 1→2 | isothermal expansion at $T_H$ | $Q_H = nRT_H\ln(V_2/V_1)$ in | $+nR\ln(V_2/V_1)$ |
| 2→3 | adiabatic expansion, $T_H \to T_C$ | 0 | 0 |
| 3→4 | isothermal compression at $T_C$ | $Q_C = nRT_C\ln(V_3/V_4)$ out | $-nR\ln(V_3/V_4)$ |
| 4→1 | adiabatic compression, $T_C \to T_H$ | 0 | 0 |

The adiabats give $T_HV_2^{\gamma-1} = T_CV_3^{\gamma-1}$ and $T_HV_1^{\gamma-1} = T_CV_4^{\gamma-1}$. Dividing one by the other gives $V_2/V_1 = V_3/V_4$, so:

$$\frac{Q_C}{Q_H} = \frac{T_C}{T_H}\quad\Rightarrow\quad \boxed{\eta_\text{Carnot} = 1 - \frac{T_C}{T_H}}\qquad \text{COP}_\text{fridge,max} = \frac{T_C}{T_H - T_C},\quad \text{COP}_\text{hp,max} = \frac{T_H}{T_H - T_C}$$

- 500 K / 300 K gives $\eta = 0.40$. Per 1000 J in: $W$ = 400 J and $Q_C$ = 600 J.
- **P3A.3 numbers** (0.10 mol between 373 K and 273 K, $V_1 = 1.00$ L doubling, $VT^{3/2}$ = const on the adiabats):
    - $V_2 = 2.00$, $V_3 = 3.19$, $V_4 = 1.60$ L
    - $q_H = +215$ J, $q_C = -157$ J, $w_\text{net} = -57.6$ J
    - $\eta = 0.268$, and $\Delta S = \pm0.576$ J/K on the isotherms

**Carnot's theorem**
1. No engine working between two reservoirs beats a reversible engine.
2. All reversible engines between the same two reservoirs have the same $\eta$, whatever the working substance.

*Proof sketch:* suppose an engine X beats Carnot. Drive a reversed Carnot engine with X's work. The net effect moves heat from cold to hot with no work input, which violates Clausius.

**Thermodynamic temperature:** define $T_C/T_H \equiv Q_C/Q_H$ for a reversible engine, fixed by $T_3 = 273.16$ K. It is independent of any material, and $T = 0$ would need a 100 % engine.

**[S] Otto cycle** (two adiabats + two isochores): $\eta = 1 - r^{1-\gamma}$ with $r = V_\text{max}/V_\text{min}$. $r = 8$ gives 0.565; $r = 10$ gives 0.602 (P3B.10).

**Checking an inventor's claim (two steps):**
1. First law: does $W = Q_H - Q_C$?
2. Second law: is $\eta \le 1 - T_C/T_H$?

Example: 1000 J in at 400 K, 500 J out at 300 K, $W$ = 500 J. The first law is fine, but $\eta = 0.50 > 0.25$, so it is impossible.

### From Carnot to entropy
- With signed heats, Carnot gives $Q_H/T_H + Q_C/T_C = 0$. Any reversible cycle is a sum of thin Carnot cycles, so

$$\oint\frac{dq_\text{rev}}{T} = 0\;\Rightarrow\; dS = \frac{dq_\text{rev}}{T}\ \text{is exact};\quad \Delta S = \int_i^f\frac{dq_\text{rev}}{T}\quad(\text{J K}^{-1})$$

- $1/T$ is an **integrating factor**: it turns the inexact $dq_\text{rev}$ into the exact $dS$.
- To find $\Delta S$ for **any** process, invent a reversible path between the same end states.
- **Surroundings (a large reservoir):** $\Delta S_\text{sur} = q_\text{sur}/T_\text{sur} = -q_\text{sys}/T_\text{sur}$, for any process.

### Clausius inequality and the principle of entropy increase
$$\oint\frac{dq}{T} \le 0\ \ (= 0 \text{ only if reversible}),\qquad dS \ge \frac{dq}{T},\qquad \Delta S_\text{isolated} \ge 0,\qquad \Delta S_\text{tot} = \Delta S_\text{sys} + \Delta S_\text{sur} \ge 0$$

- **Heat flow $q$ from $T_H$ to $T_C$:** $\Delta S_\text{tot} = q\left(\dfrac1{T_C} - \dfrac1{T_H}\right) > 0$. For 1000 J from 400 K to 300 K, $\Delta S_\text{tot} = +0.83$ J/K. The reverse flow would make it negative, which is the Clausius statement.
- An isolated system reaches equilibrium when $S$ is at its maximum.
- A system's own $S$ can fall if the surroundings gain more.

### Statistical entropy (3A.2(b); slides L4)
$$S = k_B\ln W\qquad W = \text{number of microstates consistent with the macrostate}$$

- Two-box counting: the number of ways to put $n$ of $N$ labelled particles on the left is $W = \dfrac{N!}{n!(N - n)!}$.
    - $N = 4$ gives $W$ = 1, 4, 6, 4, 1, with total $2^4 = 16$.
    - $N = 6$ with 3 left gives $W = 20$.
    - The chance of all $N$ on the left is $2^{-N}$; for $N = 100$ that is $8\times10^{-31}$.
- The relative width of the distribution is $\sim 1/\sqrt N$, so for $N \sim 10^{23}$ fluctuations are unmeasurable. "Irreversible" means overwhelmingly improbable to reverse.
- The logarithm makes $S$ **extensive**: $W = W_1W_2$, so $S = S_1 + S_2$.
- **Check against Clausius:** when the volume doubles, $W_f/W_i = 2^N$, so $\Delta S = Nk_B\ln2 = nR\ln2$, the same as the Clausius result.
- A perfect crystal at $T = 0$ has $W = 1$ and $S = 0$ (third law, Topic 3C, after this quiz).
- **I3.2 (thermodynamic versus statistical definitions):**
    - Clausius: $dS = dq_\text{rev}/T$ is measurable, macroscopic, and gives only changes in $S$.
    - Boltzmann: $S = k\ln W$ is microscopic, counts arrangements, and gives absolute values.
    - They agree: the gas-expansion check above, and heating, which populates more energy levels so $W$ rises.
    - Heat added at low $T$ produces a larger relative change in the spread of energy than the same heat at high $T$. That is why $1/T$ appears in $dS = dq_\text{rev}/T$.

### "Entropy = disorder"?
- **Helps:** with spreading, mixing and melting, and with seeing why $\Delta_\text{vap}S \gg \Delta_\text{fus}S$.
- **Misleads:**
    - a shuffled deck of cards has no thermodynamic $\Delta S$;
    - a supercooled liquid crystallises spontaneously even though the crystal is more ordered, because the released heat raises $S_\text{sur}$ by more;
    - living things and fridges lower $S$ locally by exporting entropy.
- **Better phrasing:** entropy counts the microscopic ways to realise what we observe, or how spread out energy and matter are.

---

## 3B Entropy changes in specific processes (Atkins p.88–91; slides `thermo-l4.tex` 100–187)

### Expansion (perfect gas, isothermal)
$$\Delta S = nR\ln\frac{V_f}{V_i} = nR\ln\frac{p_i}{p_f}$$

Gas expanding $V \to 2V$ (1 mol, 300 K), with $\Delta S$ in J/K. It applies to E3A.4(b) as well.

| Route | $\Delta S_\text{sys}$ | $\Delta S_\text{sur}$ | $\Delta S_\text{tot}$ |
|---|---|---|---|
| reversible isothermal | +5.76 | −5.76 | 0 |
| free expansion (vacuum) | +5.76 | 0 | +5.76 |
| reversible adiabatic | 0 (q_rev = 0) | 0 | 0 |

- Same end states give the same $\Delta S_\text{sys}$; only $\Delta S_\text{tot}$ tells the routes apart.
- In a reversible adiabatic expansion $T$ falls, and that loss of entropy exactly cancels the gain from the volume increase.

### Phase transitions (at the transition temperature)
Both phases coexist, so heat flows reversibly at constant $T$:

$$\Delta_\text{trs}S = \frac{\Delta_\text{trs}H}{T_\text{trs}}$$

- Water: fusion gives 6.01 kJ / 273.15 K = **22.0 J/K/mol**; vaporisation gives 40.7 kJ / 373.15 K = **109 J/K/mol**.
- **Trouton's rule:** $\Delta_\text{vap}S° \approx 85$ J/K/mol for many liquids, because a similar volume change happens whenever a liquid becomes a gas.
    - Water is higher because hydrogen bonding orders the liquid.
    - Use it to estimate $\Delta_\text{vap}H \approx 85\,T_b$ J/mol.
- Vaporisation entropy is much larger than fusion entropy, because a gas has far more accessible arrangements.

### Heating
$$\Delta S = \int_{T_i}^{T_f}\frac{C\,dT}{T} = C\ln\frac{T_f}{T_i}\ \ (C\text{ constant});\qquad C_p = a + bT \Rightarrow \Delta S = a\ln\frac{T_f}{T_i} + b(T_f - T_i)$$

- Use $C_p$ at constant $p$ and $C_V$ at constant $V$. $\Delta S$ is the area under the $C/T$ against $T$ curve.
- 1.00 kg water, 20 → 80 °C: $\Delta S = 4180\ln(353.15/293.15) = +778$ J/K.
- **Mixing hot and cold water:** 1 kg at 80 °C + 1 kg at 20 °C ends at 50 °C, with

$$\Delta S = mc\left[\ln\frac{T_f}{T_1} + \ln\frac{T_f}{T_2}\right] = 4180\ln\frac{323.15^2}{353.15\times293.15} = +36\ \text{J/K} > 0$$

### Composite processes [A]
Split the change into reversible steps and add the $\Delta S$ values.
- **$V$ and $T$ both change (Ex 3B.1):**

$$\Delta S = nR\ln\frac{V_f}{V_i} + nC_{V,m}\ln\frac{T_f}{T_i}\qquad \left(\text{or } nC_{p,m}\ln\frac{T_f}{T_i} - nR\ln\frac{p_f}{p_i}\right)$$

- **A transition away from $T_\text{trs}$** (P3B.2: water ↔ ice at a temperature other than 0 °C). Take three steps:
    1. heat or cool to $T_\text{trs}$ ($C_p\ln$);
    2. transform at $T_\text{trs}$ ($\pm\Delta H/T_\text{trs}$);
    3. return to the original $T$ ($C_p\ln$).

    Then $\Delta S_\text{sur} = -\Delta H_\text{sys}(T)/T$, with $\Delta H(T)$ from Kirchhoff. If $\Delta S_\text{tot} < 0$, the process is **not spontaneous**.
- **Freezing in a freezer:** $\Delta S_\text{water} < 0$, but $\Delta S_\text{univ} > 0$, because the heat released and the compressor work raise $S_\text{sur}$.

---

## 4. Derivations to know cold (skeletons)

| Result | Key steps |
|---|---|
| $pV = \tfrac13Nm\langle v^2\rangle$ and $\langle E_k\rangle = \tfrac32kT$ | $\Delta p = 2mv_x$, $\Delta t = 2L/v_x$, sum, isotropy, compare with $pV = NkT$ |
| $v_\text{mp} = \sqrt{2RT/M}$ | $d(v^2e^{-Mv^2/2RT})/dv = 0$ |
| $w_\text{rev,iso} = -nRT\ln(V_f/V_i)$ | $p = nRT/V$ inside $-\int p\,dV$ |
| $C_p - C_V = nR$ | $H = U + pV = U + nRT$; differentiate with respect to $T$ |
| $pV^\gamma$ = const | $nC_V\,dT = -(nRT/V)dV$; integrate; $R/C_V = \gamma - 1$; substitute $T = pV/nR$ |
| Kirchhoff | $d(\Delta_rH)/dT = \Delta_rC_p$; integrate |
| $\pi_T^\text{vdW} = a/V_m^2$ | $T(\partial p/\partial T)_V = RT/(V_m - b) = p + a/V_m^2$ |
| JT is isenthalpic | $q = 0$, $w = p_iV_i - p_fV_f$, so $U + pV$ is conserved |
| $\mu_T = -C_p\mu$ | Euler chain on $H(T, p)$ |
| $\eta_\text{Carnot} = 1 - T_C/T_H$ | isotherm heats, adiabat volume ratios, $V_2/V_1 = V_3/V_4$ |
| Kelvin–Planck ⟺ Clausius | perfect fridge + engine gives a 100 % engine (and conversely) |
| $dS = dq_\text{rev}/T$ is exact | Carnot $\sum Q/T = 0$, tile any cycle with Carnot cycles |
| $\Delta S_\text{iso} \ge 0$ | Clausius on an irreversible A→B plus reversible B→A cycle |
| $\Delta S = nR\ln2$ two ways | Clausius ($q_\text{rev}/T$) and Boltzmann ($W_f/W_i = 2^N$) |

---

## 5. Common mistakes
1. Wrong sign of $w$ (check: expansion gives $w < 0$), or mixing up the tutorial and lecture conventions.
2. $M$ in g/mol inside $\sqrt{3RT/M}$.
3. °C inside $\ln(T_f/T_i)$, $\eta = 1 - T_C/T_H$ or $pV = nRT$.
4. Using $pV^\gamma$ for an *irreversible* adiabatic process. Only $C_V\Delta T = -p_\text{ex}\Delta V$ holds there.
5. Setting $q = 0$ for an isothermal process. It is $\Delta U$ that is 0; $q = -w$.
6. Writing $\Delta U = nC_p\Delta T$ at constant $p$. It is always $nC_V\Delta T$ for a perfect gas; $\Delta H = nC_p\Delta T$.
7. $\Delta S_\text{sys} = 0$ for free expansion. Wrong: $\Delta S_\text{sys} = nR\ln(V_f/V_i)$, because you need a reversible path.
8. $\Delta S = q/T$ for an irreversible path. Only $q_\text{rev}$ counts.
9. $v \propto T$. Wrong: $v \propto \sqrt T$, while energy is $\propto T$.
10. Treating COP like efficiency, as if it must be < 1. COP can be > 1.
11. Forgetting the factor 2 for a soap film's two surfaces.
12. Forgetting $\Delta n_gRT$ when converting bomb-calorimeter $\Delta U$ to $\Delta H$.
13. Using $\Delta_fH = 0$ for compounds or non-reference forms. It is 0 only for elements in their reference state (e.g. O₂(g), C(graphite)).
14. Saying "the gas has more heat". Heat is energy in transit; a hotter body has more *internal energy*.

---

## 6. One-line answers to likely "explain" questions
| Question | Answer |
|---|---|
| Why does metal feel colder than wood at the same $T$? | It conducts heat from the skin faster; touch senses heat flow, not $T$. |
| Why is it called the zeroth law? | It was named after the first and second laws, but it is logically prior. |
| Why does a real gas deviate at high $p$ and low $T$? | Finite size (high $p$) and attractions (low $T$) matter. |
| Why is $C_p > C_V$? | At constant $p$, part of the heat does expansion work. |
| Why is the adiabat steeper? | With no heat in, the gas cools as it expands, so $p$ falls faster: $\gamma > 1$. |
| Why does He warm when throttled? | It is above its inversion temperature (~40 K), so repulsions dominate and $\mu < 0$. |
| Why did Joule miss $\pi_T$? | The water bath's heat capacity swamped the tiny temperature change. |
| Why can't a ship run by cooling the ocean? | Kelvin–Planck: you need a cold sink; one reservoir can't give net work in a cycle. |
| Why is reversible work the maximum? | $p_\text{ex}$ is as high as possible at every step without stopping the expansion. |
| Why is $\eta_\text{Carnot}$ independent of the working substance? | Carnot's theorem: otherwise you could violate Clausius. |
| Why does a fridge with its door open warm the room? | The work input ends up as heat in the room. |
| Why does vaporisation entropy exceed fusion entropy? | A gas has vastly more accessible microstates than a liquid. |
| Why does $\ln$ appear in $S = k\ln W$? | Microstates multiply ($W_1W_2$) while entropy must add. |
| How can water freeze spontaneously if $\Delta S_\text{water} < 0$? | $\Delta S_\text{sur} = +\lvert\Delta H\rvert/T$ is larger, so $\Delta S_\text{tot} > 0$. |
