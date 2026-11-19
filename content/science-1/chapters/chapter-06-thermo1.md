# Learn: Thermodynamics in one pass (Atkins 1A to 3B)

Sources: slides `thermo.tex` (L1-2 plus extras), `thermo-l3.tex`, `thermo-l4.tex`; tutorial problem set; Atkins 11e (Atkins, de Paula, Keeler).
Page numbers are the book's printed pages. Study order and homework: [10a-quiz2-plan.md](10a-quiz2-plan.md). Anything marked **[beyond slides]** is Atkins only.

## Sign convention (get this right first)
- Slides and Atkins: `ΔU = Q + W`, **W = work done ON the system**. So `W = -∫P dV`; expansion gives W < 0.
- The tutorial slides ("First law and heat capacities") say W > 0 = work done BY the gas. If a question says "work done by", flip the sign.
- Engines (L3): Q_H, Q_C, W are **magnitudes**, with W = Q_H − Q_C.
- In Clausius-inequality formulas (L4) heats are **signed**, with Q > 0 meaning heat in.

---
## 1. State, temperature, perfect gas (Atkins 1A, p.4-10)
- System types: open (matter and energy cross), closed (energy only), isolated (neither).
- Intensive: P, T, density. Extensive: V, n, U, S. State function: U, S, H, P, V, T. Path function: Q, W.
- **Zeroth law**: if A~C and B~C are in thermal equilibrium, then A~B. This is why a thermometer works. A metal bench feels colder because it conducts heat away faster; both are at the same T.
- Constant-volume gas thermometer: P ∝ T, so `T = T₃ (P/P₃)` with T₃ = 273.16 K. All gases extrapolate to P = 0 at −273.15 °C, which defines absolute zero.
- `PV = nRT = N k_B T`, R = 8.314 J/K/mol = 0.08314 L·bar/K/mol, k_B = 1.381e-23 J/K.
- Dalton's law: p_total = Σ p_i, where p_i = x_i·p. It is exact only in the perfect-gas limit.
- Trap: when using R = 0.08314, keep V in L and P in bar.

## 2. Kinetic theory (Atkins 1B, p.11-18)
Assumptions: point-like molecules, no forces except elastic collisions, random motion.
- One molecule: Δp = 2m v_x per hit, time between hits on the same wall 2L/v_x, so F = m v_x²/L.
- N molecules and ⟨v_x²⟩ = ⟨v²⟩/3 give **PV = ⅓ N m⟨v²⟩ = ⅔ N⟨E_k⟩**.
- Compare with PV = N k_B T: **⟨E_k⟩ = (3/2) k_B T**. This depends on T only, not on the mass.
- **v_rms = √(3RT/M)**; v_mp = √(2RT/M); v̄ = √(8RT/πM). Order: v_mp < v̄ < v_rms. For N₂ at 300 K these are 422, 476 and 517 m/s.
- M in **kg/mol** (N₂ = 0.028).
- Maxwell-Boltzmann: f(v) = 4π(M/2πRT)^{3/2} v² e^{−Mv²/2RT}. The v² factor means more ways to have a high speed; the exponential means high energy is rare. Raising T moves the peak right and flattens the curve. Lighter molecules have a broader curve and a higher peak speed.
- v_mp derivation: d/dv(v² e^{−Mv²/2RT}) = 0 gives v² = 2RT/M.
- Fraction in a narrow window ≈ f(v)·Δv.
- Escape of He: v_rms at 300 K is 1.37 km/s, far below 11.2 km/s. Even so, the high-speed tail of the distribution lets a small fraction escape, and collisions refill the tail.
- Equal T means equal ⟨E_k⟩ (H₂ and O₂ in one box). H₂ is 4× faster because M differs by 16.
- **[beyond slides]** Collisions (1B.2): cross-section σ = πd², mean relative speed v_rel = √2 v̄, collision frequency z = σ v_rel N/V = σ v_rel p/(k_B T), mean free path **λ = v_rel/z = k_B T/(σp)**. At fixed T, λ ∝ 1/p (homework E1B.8).

## 3. Real gases (Atkins 1C, p.19-27)
- **Z = PV_m/RT** (Z = 1 is ideal). Z < 1 means attraction dominates; Z > 1 means repulsion (size) dominates, which happens at high P.
- **vdW**: `(P + a/V_m²)(V_m − b) = RT`, or `P = RT/(V_m − b) − a/V_m²`. b is the excluded volume (repulsion). a/V_m² is the pressure reduction from attraction.
- Why a/V_m² and not a/V_m: attraction needs pairs of molecules, so it scales as (n/V)².
- Tutorial 4 (5 mol in 1 L, 298 K): ideal 124 bar; N₂ 119 bar (Z = 0.96); He 140 bar (Z = 1.13).
- **[beyond slides]** Critical point: T_c = 8a/(27Rb), V_c = 3b, p_c = a/(27b²). Virial: Z = 1 + B/V_m + C/V_m² + .... Corresponding states: gases at the same reduced (p_r, T_r, V_r) behave alike. Boyle temperature T_B = a/(Rb).
- Ideal law fails at high P (finite size) and low T (attraction).

## 4. Work, heat, first law (Atkins 2A.1-2A.3, p.34-42)
- **W = −∫P_ext dV**. |W| is the area under the P-V path, so it is a path function. Heat Q is also a path function. Their sum ΔU is a state function.
- Quasi-static means a sequence of equilibrium states. Reversible = quasi-static + no friction.
- Reversible isothermal (ideal gas): `W = −nRT ln(V₂/V₁)`, ΔU = 0, Q = −W. (1 mol, 300 K, 10→20 L: W = −1.73 kJ.)
- **Free expansion** (insulated, into vacuum): Q = 0, W = 0, ΔU = 0, so ΔT = 0 for an ideal gas.
- Expansion against a constant external P: W = −P_ext ΔV, which is less work than reversible.
- Heat is energy in transit, not something a body contains. Joule's paddle wheel gives 4.18 J = 1 cal.
- dU is exact and dQ, dW are inexact: ∮dU = 0 but ∮dQ ≠ 0.
- Other work: dW = F dL (wire; plus sign), γ dA (film has two surfaces, so dA = 2ℓ dx), E dZ (cell, W = nFE), E dΠ, μ₀H dM. Generalised: dW = Y dX. Atkins separates expansion work from additional (non-expansion) work.
- **[beyond slides]** Calorimetry (2A.4): a bomb calorimeter works at constant volume, so q_V = ΔU. Calibrate it once (C_cal = q/ΔT from a known heat), then ΔU = C_cal ΔT (homework E2C.4).

## 5. Heat capacity and enthalpy (Atkins 2A.4, 2B, p.42-50)
- `C_V = (∂U/∂T)_V`, `C_P = (∂H/∂T)_P`. `H = U + PV`, and **ΔH = Q_P** (constant P, no extra work).
- Ideal gas: `C_P,m − C_V,m = R`, γ = C_P/C_V.
- Equipartition (each quadratic term gives ½kT): monatomic C_V = 3R/2, C_P = 5R/2, γ = 5/3. Diatomic (vibration frozen at room T) C_V = 5R/2, C_P = 7R/2, γ = 7/5.
- For an ideal gas **ΔU = nC_V ΔT for every process**, because U depends on T only.
- Constant-P heating of 1 mol monatomic gas by 100 K: Q = +2.08 kJ, W = −0.83 kJ, ΔU = +1.25 kJ.
- **[beyond slides]** Reactions with gases: **ΔH = ΔU + Δn_g RT**, where Δn_g is the change in moles of gas (2B.1; homework E2B.2, E2C.6). Real heat capacities vary with T: C_p,m = a + bT + c/T², so integrate (2B.2; homework Ex 2B.2, E2B.3).

## 6. Ideal-gas processes (Atkins 2E, p.67-69)
| Process | W (on gas) | Q | ΔU |
|---|---|---|---|
| Isochoric | 0 | nC_VΔT | nC_VΔT |
| Isobaric | −PΔV = −nRΔT | nC_PΔT | nC_VΔT |
| Isothermal (rev) | −nRT ln(V₂/V₁) | −W | 0 |
| Adiabatic (rev) | nC_VΔT | 0 | nC_VΔT |

- Reversible adiabatic: **TV^{γ−1} = const, PV^γ = const**. Derivation: nC_V dT = −(nRT/V)dV, then integrate using R/C_V = γ − 1.
- The adiabat is steeper than the isotherm because γ > 1. Compression heats the gas. Fire syringe: T₂ = 300·10^0.4 = 754 K, P₂ = 25 bar.
- Same Q = 0 gives different outcomes: free expansion has ΔT = 0, while reversible adiabatic expansion cools.
- Atkins writes the adiabat as V_i T_i^c = V_f T_f^c with c = C_V,m/R (2E.2b), and w_ad = C_V ΔT (2E.1).

## 7. Differentials, Joule and Joule-Thomson (Atkins 2D, p.59-66)
- dU = C_V dT + π_T dV, with **π_T = (∂U/∂V)_T = T(∂p/∂T)_V − p**. Perfect gas: π_T = 0. vdW: **π_T = a/V_m²** > 0 (attractions).
- Joule's experiment saw no ΔT only because the water bath swamped it. Real gases cool slightly on free expansion (N₂ doubling: ΔT ≈ −0.13 K in the gas alone).
- **Joule-Thomson**: steady throttling through a plug, Q = 0, so **H_i = H_f** (isenthalpic). μ = (∂T/∂p)_H. μ > 0 means the gas cools, μ < 0 means it warms.
- Molecular picture: attractions dominate, so molecules climb out of potential wells and slow down (cooling). Repulsions dominate, so the gas warms. High T favours repulsions.
- vdW low pressure: μ ≈ (1/C_P,m)(2a/RT − b), with **inversion temperature T_I = 2a/(Rb)**. For N₂ this gives about 850 K (measured 621 K).
- Data: CO₂ μ = +1.1 K/atm; N₂ +0.27; H₂ −0.03 (T_I ~200 K); He −0.06 (T_I ~40 K). H₂ and He warm when throttled at room T.
- μ_T = (∂H/∂p)_T = −C_P μ. Both π_T and μ_T are 0 for a perfect gas.
- Linde refrigerator: compress, throttle, counter-current heat exchange, repeat.
- Exact versus inexact differentials (Atkins 2D.1): dU, dH are exact; test with the cross-derivative condition ∂M/∂y = ∂N/∂x **[beyond slides]**.
- **[beyond slides]** Expansion coefficient α = (1/V)(∂V/∂T)_p and isothermal compressibility κ_T = −(1/V)(∂V/∂p)_T (2D.2). Perfect gas: α = 1/T, κ_T = 1/p (homework Ex 2D.2, P2D.2).

## 8. Second law and engines (Atkins 3A.1, 3A.3, p.78-86; slides L3)
- Over a cycle ΔU = 0, so Q_net = −W_net. The work equals the enclosed area (clockwise is an engine).
- **η = W/Q_H = 1 − Q_C/Q_H**. Fridge COP = Q_C/W. Heat pump COP = Q_H/W. COP can exceed 1.
- **Kelvin-Planck**: no cyclic device converts heat from a single reservoir entirely into work. **Clausius**: no cyclic device moves heat cold → hot with no other effect.
- Equivalence: a perfect fridge combined with an ordinary engine gives a 100% engine.
- Irreversibility sources: friction, finite ΔT heat flow, free expansion, mixing, fast change.
- **Carnot cycle**: isothermal expansion at T_H (Q_H = nRT_H ln(V₂/V₁)), adiabatic expansion, isothermal compression at T_C, adiabatic compression. The adiabats force V₂/V₁ = V₃/V₄. This gives Q_C/Q_H = T_C/T_H and **η = 1 − T_C/T_H**.
- Carnot's theorem: no engine beats a reversible one, and all reversible engines between the same two reservoirs are equally efficient. The proof runs the Carnot engine backwards and uses the Clausius statement.
- Kelvin scale: T_C/T_H ≡ Q_C/Q_H for a reversible engine.
- COP_max: fridge T_C/(T_H − T_C), heat pump T_H/(T_H − T_C).
- Otto: η = 1 − r^{1−γ}. Fridge door open in a closed kitchen: the room **warms**, because W ends up as heat.
- Check an inventor's claim in two steps: first law (W = Q_H − Q_C), then compare η with 1 − T_C/T_H.

## 9. Entropy (Atkins 3A.2, 3A.3(c), 3B, p.80-91; slides L4)
- Carnot gives Q_H/T_H + Q_C/T_C = 0 (signed heats), so ∮dQ_rev/T = 0. In general **Clausius inequality: ∮dQ/T ≤ 0**.
- **dS = dQ_rev/T** (state function, J/K). 1/T is the integrating factor. For any process, invent a reversible path between the same end states.
- Isothermal ideal gas: **ΔS = nR ln(V_f/V_i)**. Heating: **ΔS = C ln(T_f/T_i)** (C_P at constant P, C_V at constant V). Phase change: **ΔS = ΔH_trs/T_trs**.
- Trouton: ΔS_vap ≈ 85 J/K/mol. Water is higher (109) because of hydrogen bonding. Vaporisation ≫ fusion (22 J/K/mol for ice).
- ΔS_gas is the same for reversible and free expansion; only ΔS_surr and ΔS_univ differ (reversible: ΔS_univ = 0; free: ΔS_univ = +nR ln 2).
- Heat flow Q from T_H to T_C: ΔS_univ = Q(1/T_C − 1/T_H) > 0.
- **ΔS_isolated ≥ 0**, and ΔS_univ = ΔS_sys + ΔS_surr ≥ 0. A system can lose entropy if the surroundings gain more (freezing water).
- **Boltzmann S = k_B ln W**, with W = N!/(n!(N−n)!) for the left/right box. Doubling the volume gives W_f/W_i = 2^N, so ΔS = Nk ln2 = nR ln2, matching Clausius. The log makes S additive.
- For large N the width is ~1/√N, so "irreversible" means overwhelmingly improbable to reverse.
- Entropy is not just "disorder": a shuffled deck has no ΔS_thermo, and crystallisation can be spontaneous because S_surr rises more.
- **[beyond slides]** Composite processes (3B.4): split the change into reversible steps and add the ΔS values. Gas changing both V and T: **ΔS = nR ln(V_f/V_i) + nC_V,m ln(T_f/T_i)** (homework Ex 3B.1). Phase change away from T_trs (e.g. supercooled water freezing at −10 °C): heat to T_trs, transform, cool back.
- Third law (Atkins 3C, p.92, after the Quiz-2 range): S → 0 as T → 0 for a perfect crystal.

## 10. Thermochemistry (Atkins 2C, p.51-58) **[beyond slides, but in the homework]**
- Standard state (°): pure substance at exactly 1 bar, at the stated temperature (tables use 298.15 K).
- Physical change: Δ_subH° = Δ_fusH° + Δ_vapH° at the same T. Reversing a process flips the sign of ΔH.
- **Hess's law**: the standard enthalpy of an overall reaction is the sum of those of the steps it can be split into (homework Ex 2C.1).
- **Formation**: Δ_fH° of an element in its reference state is 0, and **Δ_rH° = Σν Δ_fH°(products) − Σν Δ_fH°(reactants)** (homework P2C.8).
- **Kirchhoff's law**: Δ_rH°(T₂) = Δ_rH°(T₁) + ∫Δ_rC_p° dT, with Δ_rC_p° = Σν C_p,m°(products) − Σν C_p,m°(reactants). Constant Δ_rC_p°: Δ_rH°(T₂) = Δ_rH°(T₁) + Δ_rC_p°(T₂ − T₁) (homework Ex 2C.2).
- A bomb calorimeter gives Δ_rU; convert with Δ_rH = Δ_rU + Δn_g RT (homework E2C.4, E2C.6).
- DSC: integrating the excess heat capacity C_p,ex over the transition gives the transition enthalpy (homework P2C.10).

---
## Exam traps
1. Sign of W (see the top section). 2. M in kg/mol. 3. T in kelvin everywhere. 4. R in J versus L·bar. 5. ΔU = nC_VΔT even at constant P. 6. ΔS_gas for free expansion is not 0. 7. v_rms ∝ √T (doubling T gives √2, not 2). 8. Adiabatic does not mean isothermal. 9. Carnot efficiency uses kelvin. 10. Isothermal Q = −W, not 0.

## Check-your-understanding
Why does a gas that expands freely into vacuum have ΔS_univ > 0 even though Q = 0? (Answer in `practice/quiz2-answer-key.md`, Q-C1.)

# Learn: Gases (Atkins 1A to 1C)

Scope: Thermo-1 (slides `thermo.tex` 62–595) plus tutorial P1–P4. Anything marked **\[beyond slides\]** is Atkins only. Constants: R = 8.314 J K⁻¹ mol⁻¹ = 0.08314 L bar K⁻¹ mol⁻¹; k\_B = 1.381×10⁻²³ J K⁻¹.

## 1A The perfect gas

**Key ideas**

- A *system* is what you study, the *surroundings* are the rest. Open: matter and energy cross. Closed: energy only. Isolated: neither.
- At equilibrium the state is fixed by a few variables (P, V, T, n) linked by an equation of state. Intensive: P, T, density. Extensive: V, n, U. State function: U, T. Path function: Q, W.
- **Zeroth law**: if A and B are each in thermal equilibrium with C, they are in equilibrium with each other. This is why a thermometer (C) can compare A and B. Temperature is the shared property. A metal bench feels colder than a wooden one only because it conducts heat away faster; both are at the same T.
- A constant-volume gas thermometer has P ∝ T. At low pressure every gas extrapolates to P = 0 at −273.15 °C, which defines absolute zero and the Kelvin scale.
- Boyle (PV const), Charles (V ∝ T) and Avogadro (V ∝ n) combine into one law, exact only as P → 0.

**Key equations**

$$
PV = nRT = Nk_BT, \qquad T/\mathrm{K} = \theta/{}^\circ\mathrm{C} + 273.15, \qquad T = T_3\,\frac{P}{P_3}\;\;(T_3 = 273.16\ \mathrm{K})
$$

**Worked example (tutorial P1).** A constant-volume thermometer reads 6.69 kPa at the triple point. Find the reading at 100 °C, and the temperature when it reads 8.00 kPa.

$$
P = P_3\frac{T}{T_3} = 6.69\times\frac{373.15}{273.16} = 9.14\ \mathrm{kPa}, \qquad \frac{\Delta P}{\Delta T} = \frac{P_3}{T_3} = 24.5\ \mathrm{Pa\,K^{-1}}
$$

$$
T = 273.16\times\frac{8.00}{6.69} = 326.6\ \mathrm{K} = 53.5\ {}^\circ\mathrm{C}
$$

The zeroth law justifies reading the oil's temperature: after a while the thermometer and oil are in equilibrium, so they share T.

**Beyond slides (Atkins 1A.1(a), 1A.2(b))**

- **Pressure** is force per area, P = F/A. Units: 1 Pa = 1 N m⁻² = 1 kg m⁻¹ s⁻². 1 bar = 10⁵ Pa (the standard pressure p°). 1 atm = 101 325 Pa exactly. 1 Torr = 101 325/760 Pa ≈ 133.3 Pa.
- **Dalton's law**: a mixture of perfect gases exerts the sum of the pressures each would exert alone. The partial pressure is p\_J = x\_J p, with mole fraction x\_J = n\_J/n.

$$
p = p_A + p_B + \dots, \qquad p_J = x_J\,p, \qquad x_J = \frac{n_J}{n}, \qquad \sum_J x_J = 1
$$

It is exact only in the perfect-gas limit.

**Homework (from the plan)**

- Ex 1A.1: pressure of N₂ heated at constant volume.
- Ex 1A.2: partial pressures in air, starting from its mass composition.
- E1A.2: could a given gas sample really exert the stated pressure?
- E1A.9: molar mass from a gas density.
- E1A.11: mole fractions and partial pressures in an H₂/N₂ mixture.
- P1A.2: a temperature scale built on hydrogen's melting and boiling points; where is absolute zero on it?
- P1A.11: barometric formula, pressure against altitude.
- Tutorial P1 (the worked example above).

**Check your understanding (1A).** A sealed rigid flask of gas at 20 °C is heated to 40 °C. Is the pressure doubled? Give the ratio P₂/P₁ to three figures.

## 1B The kinetic model

**Key ideas**

- Model: N point-like molecules of mass m in random motion, no forces except brief elastic collisions, elastic wall hits.
- Pressure is the average momentum delivered to the walls per unit time and area. Heavier or faster molecules hit harder, so P depends on ⟨v²⟩.
- Comparing with PV = Nk\_BT shows temperature is a measure of mean translational kinetic energy. It depends on T only, not on mass.
- Speeds are spread out (Maxwell–Boltzmann). The v² factor is the growing number of ways to have a high speed; the exponential is the rarity of high energy. Raising T shifts the peak right and flattens the curve. Lighter molecules give a broader curve.

**Key equations**

$$
PV = \tfrac13 Nm\langle v^2\rangle = \tfrac23 N\langle E_k\rangle, \qquad \langle E_k\rangle = \tfrac32 k_BT, \qquad E_{k,\mathrm{molar}} = \tfrac32 RT
$$

$$
f(v) = 4\pi\left(\frac{M}{2\pi RT}\right)^{3/2} v^2 e^{-Mv^2/2RT}
$$

$$
v_{mp}=\sqrt{\frac{2RT}{M}}\;<\;\bar v=\sqrt{\frac{8RT}{\pi M}}\;<\;v_{rms}=\sqrt{\frac{3RT}{M}}
$$

For N₂ at 300 K: 422, 476, 517 m/s. All scale as √(T/M).

**Derivation outline 1: pressure and ⟨E\_k⟩**

1. One molecule, cube of side L, hits the wall with v\_x and rebounds: Δp\_x = −2mv\_x per hit.
2. It returns to the same wall every Δt = 2L/v\_x, so the mean force is F = 2mv\_x/(2L/v\_x) = mv\_x²/L.
3. Sum over N molecules and divide by area L²: P = Nm⟨v\_x²⟩/V.
4. Isotropy gives ⟨v\_x²⟩ = ⟨v²⟩/3, so PV = ⅓Nm⟨v²⟩ = ⅔N⟨E\_k⟩.
5. Equate to Nk\_BT: ⟨E\_k⟩ = ½m⟨v²⟩ = (3/2)k\_BT. Hence v\_rms = √(3k\_BT/m) = √(3RT/M).

**Derivation outline 2: v\_mp from df/dv = 0** (tutorial P3a, homework P1B.10)

Drop constants and differentiate g(v) = v² e^{−Mv²/2RT}:

$$
\frac{dg}{dv} = \left(2v - \frac{Mv^3}{RT}\right)e^{-Mv^2/2RT} = 0 \;\Rightarrow\; v_{mp}^2 = \frac{2RT}{M}
$$

The roots v = 0 and v → ∞ are minima, so the non-trivial root is the maximum.

**Worked example (tutorial P3).** N₂ (M = 0.0280 kg mol⁻¹) at 500 K.

(a) v\_mp = √(2×8.314×500/0.0280) = 545 m s⁻¹.

(b) Fraction with 290–300 m s⁻¹ ≈ f(v)Δv at v = 295, Δv = 10:

$$
\frac{Mv^2}{2RT} = \frac{0.0280\times295^2}{2\times8.314\times500} = 0.293, \qquad f \approx 9.1\times10^{-4}\ \mathrm{s\,m^{-1}} \;\Rightarrow\; f\Delta v \approx 0.9\%
$$

(c) At 1000 K the fraction is smaller (about 0.37%): the peak moves to about 770 m/s and the curve flattens, leaving fewer molecules at 295 m/s.

**Also on the slides (short exam answers)**

- N₂ at 300 K: v\_rms = √(3×8.314×300/0.0280) = 517 m s⁻¹, close to the speed of sound in air (343 m/s). H₂: about 1.9 km/s. He: 1.37 km/s.
- Equal T gives equal ⟨E\_k⟩ (H₂ and O₂ in one box). H₂ is 4× faster since M differs by 16.
- Doubling T multiplies v\_rms by √2, not 2. Pressure at fixed V doubles.
- He escape (tutorial P2): v\_rms = 1.37 km/s at 300 K is far below 11.2 km/s. v\_rms would equal 11.2 km/s only at T = Mv²/3R ≈ 2×10⁴ K. Escape still happens because the high-speed tail of the distribution is never empty, and collisions refill it. Total translational energy of 1 L at 1 bar is (3/2)PV = 150 J for any gas.

**Beyond slides: collisions (Atkins 1B.2)**

Treat molecules as hard spheres with collision cross-section σ = πd². A molecule sweeps volume σ v\_rel per unit time, with relative speed v\_rel = √2 ̄v. Then:

$$
z = \frac{\sigma v_{rel} N}{V} = \frac{\sigma v_{rel}\,p}{k_BT}, \qquad \lambda = \frac{v_{rel}}{z} = \frac{k_BT}{\sigma p}
$$

z is collisions per second per molecule; λ is the mean free path. At fixed T, λ ∝ 1/p. At fixed V, λ is independent of T, since p ∝ T. Atkins' N₂ example at 1 atm, 25 °C with σ = 0.45 nm²: z ≈ 7×10⁹ s⁻¹ and λ ≈ 90 nm.

**Homework (from the plan)**

- Ex 1B.1: v\_rms and mean speed of N₂ at 25 °C.
- E1B.2: v\_rms of H₂ and O₂.
- E1B.8: pressure at which argon's mean free path reaches the size of its container (needs 1B.2).
- P1B.7: escape speeds, and temperatures at which mean molecular speeds reach them.
- P1B.8: plot Maxwell–Boltzmann curves from 200 K to 2000 K.
- P1B.10: derive v\_mp from df/dv = 0 (above).
- Tutorial P2 and P3.

**Check your understanding (1B).** An H₂ and an He sample are both at 300 K. Which has the larger v\_rms, and which has the larger mean kinetic energy per molecule? Give the ratio of their v\_rms.

## 1C Real gases

**Key ideas**

- The perfect-gas law assumes point molecules with no forces. It fails at **high P** (molecules have finite size, so less free volume) and **low T** (attractions reduce the force and frequency of wall hits).
- The compression factor Z measures the deviation. Z < 1: attraction dominates. Z > 1: repulsion (size) dominates, typical at high P.
- van der Waals corrects the two assumptions with two constants: b (excluded volume per mole) and a (strength of attraction).
- Why a/V\_m² and not a/V\_m: attraction needs pairs of molecules, so it scales as the density squared.

**Key equations**

$$
Z = \frac{PV_m}{RT}, \qquad \left(P + \frac{a}{V_m^2}\right)(V_m - b) = RT \;\Longleftrightarrow\; P = \frac{RT}{V_m - b} - \frac{a}{V_m^2}
$$

| Gas | a (L² bar mol⁻²) | b (L mol⁻¹) |
| --- | --- | --- |
| He | 0.0346 | 0.0238 |
| N₂ | 1.370 | 0.0387 |
| CO₂ | 3.640 | 0.0427 |

**Worked example (tutorial P4).** 5.00 mol in a 1.00 L cylinder at 298 K. Use R = 0.08314 L bar K⁻¹ mol⁻¹, so RT = 24.78 L bar mol⁻¹ and V\_m = 0.200 L mol⁻¹.

$$
P_{ideal} = \frac{24.78}{0.200} = 124\ \mathrm{bar}\ \text{(same for any gas)}
$$

$$
P_{N_2} = \frac{24.78}{0.200-0.0387} - \frac{1.370}{0.200^2} = 153.6 - 34.3 = 119\ \mathrm{bar}
$$

$$
P_{He} = \frac{24.78}{0.200-0.0238} - \frac{0.0346}{0.200^2} = 140.6 - 0.9 = 140\ \mathrm{bar}
$$

Since V\_m and T are the same, Z = P/P\_ideal. For N₂, Z = 119/124 = 0.96 < 1: the a term (−34.3 bar) slightly outweighs the b term (+29.7 bar). For He, Z = 140/124 = 1.13 > 1: a is negligible, so b wins.

Slide example: 1.00 mol CO₂ in 0.500 L at 300 K gives P\_ideal = 49.9 bar but P\_vdW = 54.5 − 14.6 ≈ 40.0 bar. The ideal law is about 25% too high because attraction dominates; CO₂ liquefies easily.

**Beyond slides (Atkins 1C)**

- **Virial equation.** Expand Z in powers of the density. B and C depend on temperature and are fitted from Z data. B is usually the dominant correction.

$$
Z = 1 + \frac{B}{V_m} + \frac{C}{V_m^2} + \dots \qquad \text{(or } Z = 1 + B'p + C'p^2 + \dots)
$$

- **Boyle temperature.** At T\_B the second virial coefficient is zero, so Z → 1 with zero slope as p → 0 and the gas is nearly perfect over a wide range. For vdW, T\_B = a/(Rb), which gives about 426 K for N₂.
- **Critical constants.** Below T\_c, compressing a gas along an isotherm condenses it to a liquid. At T\_c the two phases merge at the critical point and above T\_c there is only one (supercritical) phase. For vdW the critical point is where the isotherm has an inflection with zero slope:

$$
T_c = \frac{8a}{27Rb}, \qquad V_c = 3b, \qquad p_c = \frac{a}{27b^2}, \qquad Z_c = \frac{p_cV_c}{RT_c} = \frac38
$$

For CO₂ this gives T\_c ≈ 304 K and p\_c ≈ 74 bar, close to the measured 304 K and 74 bar.

- **Corresponding states.** Reduced variables X\_r = X/X\_c (for p, V\_m, T). Real gases at the same p\_r and T\_r have similar Z and similar deviations from ideality. In reduced form the vdW equation contains no gas-specific constants.

**Homework (from the plan).** None is set for 1C. Tutorial P4 (above) covers it.

**Check your understanding (1C).** N₂ has Z < 1 at moderate pressure but Z > 1 at very high pressure at the same T. Explain using the a and b terms. Then state whether Z for He at 298 K can ever be below 1.

## Answers to the check questions

- **1A.** No. The ratio must use kelvin: P₂/P₁ = T₂/T₁ = 313.15/293.15 = 1.07, a 6.8% rise. Doubling 20 °C to 40 °C is not doubling T.
- **1B.** H₂ has the larger v\_rms. Both have the same mean kinetic energy per molecule, (3/2)k\_BT, which depends on T only. v\_rms(H₂)/v\_rms(He) = √(M\_He/M\_H₂) = √(4.00/2.016) = 1.41.
- **1C.** At moderate pressure the molecules are far enough apart that attraction (the a/V\_m² term) is the larger correction, so Z < 1. At very high pressure V\_m approaches b, so RT/(V\_m − b) grows faster than a/V\_m² and repulsion wins, giving Z > 1. For He at 298 K, Z is always above 1: its Boyle temperature a/(Rb) ≈ 17 K is far below 298 K, so the b term dominates at every pressure.

## Exam traps

1. **M in kg/mol.** N₂ is 0.0280, not 28.0. Using g/mol makes v\_rms wrong by √1000.
2. **T in kelvin** in every formula and ratio, including P ∝ T.
3. **Units of R.** 8.314 J K⁻¹ mol⁻¹ with SI (Pa, m³); 0.08314 L bar K⁻¹ mol⁻¹ with L and bar. Never mix them.
4. **v\_rms ∝ √T.** Doubling T gives ×√2 in speed, ×2 in kinetic energy.
5. Equal T means equal ⟨E\_k⟩, not equal speed.
6. v\_mp < mean < v\_rms, with the factors √2 : √(8/π) : √3.
7. In vdW use V\_m = V/n, and check a and b units (L² bar mol⁻², L mol⁻¹).
8. Z < 1 means attraction dominates, Z > 1 means size dominates.

# Learn: The first law (Atkins 2A, 2B, 2E)

## How to use these notes

These notes teach the first law of thermodynamics from lecture Thermo-2 (slides `thermo.tex`, lines 597–1390) and Atkins 11e Topics 2A, 2B and 2E. Read them top to bottom; each topic ends with check questions, and the answers are near the end.

Each subsection runs in the same order: the idea in words, then the derivation with every step, then a worked example with numbers you can do by hand. Material marked **\[beyond slides\]** comes only from Atkins. It still matters, because the homework uses it, but the slides come first.

### The one convention you must not get wrong

The course (slides and Atkins) uses the **acquisitive convention**: every energy transfer is counted from the system's point of view.

$$
\Delta U = q + w
$$

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

$$
\Delta U = q + w \qquad \text{(closed system)}
$$

In words: U changes only by heat added to the system and by work done on it. Think of U as a bank balance that accepts deposits in two currencies (heat, work) but stores only one thing (energy).

- Isolated system: q = 0 and w = 0, so ΔU = 0.
- **Quick example.** A gas is compressed with 500 J of work and loses 200 J as heat. Then w = +500 J, q = −200 J and ΔU = +300 J.
- **Quick example.** A motor delivers 10 kJ of work each second and loses 3 kJ as heat. Then w = −10 kJ, q = −3 kJ and ΔU = −13 kJ each second.

### State functions and exact differentials (slides)

A **state function** depends only on the current state of the system, not on its history. U, H, p, V and T are state functions. q and w are **path functions**: they describe a process, not a state.

The slides use a hiking analogy. Your change in altitude depends only on where you started and finished (state function). The distance you walked depends on the trail (path function).

In calculus language, dU is an **exact differential**: it integrates to a difference of end values, and it gives zero around any closed loop.

$$
\int_A^B \mathrm{d}U = U_B - U_A, \qquad \oint \mathrm{d}U = 0
$$

Small amounts of heat and work are **inexact differentials**, written đq and đw in the slides (δq and δw in the equations here). Their integrals depend on the path, and around a closed loop they need not vanish.

$$
\int_A^B \delta q \neq q_B - q_A, \qquad \oint \delta q \neq 0
$$

There is no such thing as q\_A: a state has no "heat content" and no "work content". The first law in differential form, for a slow (quasi-static) process with only expansion work, is

$$
\mathrm{d}U = \delta q + \delta w = \delta q - p\,\mathrm{d}V
$$

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

$$
\Delta U = n\cdot\tfrac52 R\,\Delta T = (2.00)(2.5)(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(100\ \mathrm{K}) \approx +4.16\ \mathrm{kJ}
$$

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

$$
\delta w = -p_\mathrm{ex}\,\mathrm{d}V
$$

3. Add up the small steps from V\_i to V\_f:

$$
w = -\int_{V_i}^{V_f} p_\mathrm{ex}\,\mathrm{d}V
$$

Check the signs. In an expansion dV > 0, so w < 0: the gas does work and loses energy. In a compression dV < 0, so w > 0.

It is the **external** pressure that sets the work, even during a compression. The work is the energy that leaves or enters the surroundings: a weight resting on the piston is raised or lowered, and its potential energy changes by p\_ex A dz. The slides write the formula with the gas's own p, which is correct because they assume a quasi-static process, where p\_ex = p.

On a p\_ex–V graph (an **indicator diagram**), |w| equals the **area under the path**.

### Case 1: free expansion (p\_ex = 0)

A gas expanding into a vacuum pushes against nothing. With p\_ex = 0, the integral gives w = 0.

### Case 2: expansion against a constant external pressure

Take p\_ex constant (the atmosphere, say) and pull it out of the integral:

$$
w = -p_\mathrm{ex}\int_{V_i}^{V_f}\mathrm{d}V = -p_\mathrm{ex}(V_f - V_i) = -p_\mathrm{ex}\,\Delta V
$$

On the indicator diagram this is a rectangle of height p\_ex and width ΔV.

**Worked example (Atkins Example 2A.1, gas production).** 50 g of iron reacts with hydrochloric acid at 25 °C: Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g). Find w (a) in a sealed vessel of fixed volume, (b) in an open beaker.

- **(a)** The volume cannot change, so w = 0.
- **(b)** The H₂ pushes back the atmosphere at constant p\_ex. The liquids and solids barely change volume, so ΔV ≈ V(H₂) = nRT/p\_ex. Then

$$
w = -p_\mathrm{ex}\,\Delta V \approx -p_\mathrm{ex}\cdot\frac{nRT}{p_\mathrm{ex}} = -nRT
$$

- One mole of Fe gives one mole of H₂, so n = 50 g ÷ 55.85 g mol⁻¹ ≈ 0.90 mol. With RT = 2.48 kJ mol⁻¹, w ≈ −0.90 × 2.48 kJ ≈ **−2.2 kJ**.
- **Comment.** p\_ex cancels. At lower pressure the gas takes up more room, so the two effects cancel. This result, w = −Δn\_g RT, comes back in 2B as ΔH = ΔU + Δn\_g RT.

### Case 3: reversible expansion

To expand reversibly, keep p\_ex equal to the gas pressure p at every stage (take the sand off grain by grain). Then δw = −p dV, and

$$
w_\mathrm{rev} = -\int_{V_i}^{V_f} p\,\mathrm{d}V
$$

Now p is the gas's own pressure, so you need its **equation of state** to do the integral. This is where Topic 1A (or 1C, for real gases) plugs in.

**Isothermal reversible expansion of a perfect gas.** Keep the gas in a constant-temperature bath. At every stage p = nRT/V, and n, R and T are constants, so they come out of the integral:

$$
w = -\int_{V_i}^{V_f}\frac{nRT}{V}\,\mathrm{d}V = -nRT\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V} = -nRT\ln\frac{V_f}{V_i}
$$

Because p\_i V\_i = p\_f V\_f at constant T, you can also write w = −nRT ln(p\_i/p\_f).

**Slides example.** 1.00 mol of perfect gas expands reversibly at 300 K from 10.0 L to 20.0 L.

$$
w = -(1.00)(8.314)(300)\ln 2 \approx -(2.49\ \mathrm{kJ})(0.693) \approx -1.73\ \mathrm{kJ}
$$

The gas does 1.73 kJ of work on its surroundings, yet its temperature, and so its U, does not change. The energy must have come in as heat from the bath: q = +1.73 kJ.

At a higher temperature the same volume change gives more work, because the gas pushes harder and the matched p\_ex must be larger.

### Why reversible expansion gives the maximum work

**Intuition.** During an expansion the gas can only move the piston if p\_ex ≤ p. Any time p\_ex is smaller than p, some of the gas's "pushing power" is wasted: it goes into sloshing and turbulence that end up as internal energy, not into lifting the weight.

**Argument on the diagram.** For an isothermal expansion, the reversible path follows the isotherm p = nRT/V. An expansion against a constant p\_ex can only finish if p\_ex ≤ p\_f, so its rectangle sits under the lowest point of the isotherm. The area under the curve is always bigger than the rectangle.

**Argument in symbols.** Work done by the gas is −w = ∫p\_ex dV. In every expansion step dV > 0 and p\_ex ≤ p, so

$$
-w = \int p_\mathrm{ex}\,\mathrm{d}V \;\le\; \int p\,\mathrm{d}V = -w_\mathrm{rev}
$$

Equality holds only when p\_ex = p throughout, which is the reversible path. (A full proof for any pair of end states uses the second law, Topic 3A.)

For a **compression** the inequality flips: the reversible path is the **least** work you must do on the gas. Any irreversible compression costs more.

&#91;embedded content: indicator diagram · isothermal expansion from V\_i to 3V\_i\]

The whole shaded area is the reversible work and the darker rectangle is the work against p\_ex = p\_f; the band between them is what the irreversible path wastes.

### Worked example: Atkins E2A.4(a), one expansion done three ways

**Question.** 1.00 mol of Ar is expanded isothermally at 20 °C from 10.0 dm³ to 30.0 dm³ (i) reversibly, (ii) against a constant external pressure equal to the final pressure of the gas, (iii) freely. Find q, w and ΔU for each.

**Step 0: what is common to all three.** Ar behaves as a perfect monatomic gas, so U depends only on T. Every path starts and ends at 293 K, so **ΔU = 0 for all three**, and then the first law gives q = −w.

Useful number: nRT = (1.00)(8.314)(293.15) J ≈ 2.44 kJ.

**(i) Reversible.**

$$
w = -nRT\ln\frac{V_f}{V_i} = -(2.44\ \mathrm{kJ})\ln 3 = -(2.44)(1.099)\ \mathrm{kJ} \approx -2.68\ \mathrm{kJ}
$$

So q = +2.68 kJ and ΔU = 0.

**(ii) Against constant p\_ex = p\_f.** First find the final pressure:

$$
p_f = \frac{nRT}{V_f} = \frac{2437\ \mathrm{J}}{0.0300\ \mathrm{m^3}} \approx 8.12\times10^4\ \mathrm{Pa}
$$

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

$$
\mathrm{d}U = \delta q + \delta w_\mathrm{exp} + \delta w_\mathrm{add}
$$

1. At constant volume dV = 0, so δw\_exp = −p\_ex dV = 0.
2. If the system cannot do any other kind of work (it is not, say, a battery driving a motor), δw\_add = 0.
3. What is left is dU = δq\_V, where the subscript V marks the constant-volume condition. Integrate from i to f:

$$
\Delta U = q_V
$$

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

$$
C_V = \left(\frac{\partial U}{\partial T}\right)_V
$$

- C\_V is **extensive** (100 g of water has 100 times the heat capacity of 1 g). The **molar** heat capacity C\_V,m = C\_V/n is intensive.
- The **specific** heat capacity is per gram; for liquid water it is about 4.18 J K⁻¹ g⁻¹.
- Heat capacities depend on T and fall at low temperature, but over a modest range near room temperature they are almost constant.

At constant volume, then,

$$
\mathrm{d}U = C_V\,\mathrm{d}T \quad\Rightarrow\quad \Delta U = C_V\,\Delta T = q_V \quad (C_V \text{ constant})
$$

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

$$
w = \int_{L_0}^{L} k\,(L' - L_0)\,\mathrm{d}L' = \int_0^{L-L_0} k\,x\,\mathrm{d}x = \tfrac12 k\,(L - L_0)^2
$$

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

$$
w = nFE = (2)(96\,485\ \mathrm{C\,mol^{-1}})(1.10\ \mathrm{V}) \approx 212\ \mathrm{kJ}
$$

Run forwards, the cell can deliver at most this much electrical work. Lecture 5 turns this into ΔG = −nFE.

### Dielectric and magnetic work

- **Dielectric slab** in a field E: δw = E dΠ, where Π is the slab's total electric dipole moment.
- **Paramagnetic solid** in a field H: δw = μ₀H dM, where M is the total magnetic moment. Its equation of state is Curie's law, M = C\_C H/T. Aligning the spins does work on the solid.
- **Adiabatic demagnetisation.** Magnetise a salt at constant T (heat flows out), then switch off the field adiabatically. The spins randomise and the salt cools to millikelvin. It is the magnetic analogue of compressing a gas and then letting it expand adiabatically.

### The first law with several kinds of work

When several kinds of work are possible, add them (quasi-static form):

$$
\mathrm{d}U = \delta q - p\,\mathrm{d}V + F\,\mathrm{d}L + \gamma\,\mathrm{d}A + E\,\mathrm{d}Z + \cdots
$$

Atkins groups them into two kinds:

$$
\mathrm{d}U = \delta q + \delta w_\mathrm{exp} + \delta w_\mathrm{add}
$$

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

$$
w = -(0.895\ \mathrm{mol})(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K}) = -2.22\times10^{3}\ \mathrm{J} \approx -2.2\ \mathrm{kJ}
$$

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

$$
w = -nRT\ln\frac{V_f}{V_i} = -(2437\ \mathrm{J})\ln\frac{30.0}{10.0} = -(2437\ \mathrm{J})(1.0986) = -2.68\ \mathrm{kJ}
$$

So **w = −2.68 kJ, q = +2.68 kJ, ΔU = 0**.

4. **(ii) Constant p\_ex = p\_f.** The final pressure is

$$
p_f = \frac{nRT}{V_f} = \frac{2437\ \mathrm{J}}{3.00\times10^{-2}\ \mathrm{m^3}} = 8.12\times10^{4}\ \mathrm{Pa}
$$

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

$$
w = \int_0^{l}\left(ax - bx^{3/2}\right)\mathrm{d}x = \left[\frac{a x^2}{2} - \frac{2b\,x^{5/2}}{5}\right]_0^{l}
$$

4. **Result.**

$$
w = \tfrac12 a l^{2} - \tfrac25 b\, l^{5/2}
$$

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

$$
w = -\int_{V_i}^{V_f}\left(\frac{nRT}{V} - \frac{n^2 a}{V^2}\right)\mathrm{d}V = -nRT\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V} + n^2 a\int_{V_i}^{V_f}\frac{\mathrm{d}V}{V^2}
$$

3. **First integral:** −nRT ln(V\_f/V\_i), the perfect-gas result.
4. **Second integral:** ∫V⁻² dV = −V⁻¹, so n²a\[−1/V\] from V\_i to V\_f = n²a(1/V\_i − 1/V\_f).
5. **Result.**

$$
w = -nRT\ln\frac{V_f}{V_i} + n^2 a\left(\frac{1}{V_i} - \frac{1}{V_f}\right)
$$

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

$$
H \equiv U + pV
$$

Here p and V are the system's own pressure and volume. U, p and V are all state functions, so H is a state function too, and ΔH is independent of path.

### Derivation: ΔH = q\_p

1. **Change everything a little.** U → U + dU, p → p + dp, V → V + dV. Then

$$
H + \mathrm{d}H = (U + \mathrm{d}U) + (p + \mathrm{d}p)(V + \mathrm{d}V) = U + pV + \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p + \mathrm{d}p\,\mathrm{d}V
$$

2. **Cancel and drop.** U + pV = H cancels on both sides. dp dV is a product of two infinitesimals, so it is negligible:

$$
\mathrm{d}H = \mathrm{d}U + p\,\mathrm{d}V + V\,\mathrm{d}p
$$

3. **Use the first law.** dU = δq + δw, so dH = δq + δw + p dV + V dp.
4. **Apply the conditions.** If the system is in mechanical equilibrium with its surroundings at pressure p and does only expansion work, then δw = −p dV, which cancels the +p dV:

$$
\mathrm{d}H = \delta q + V\,\mathrm{d}p
$$

5. **Constant pressure.** dp = 0, so dH = δq\_p. Integrate:

$$
\Delta H = q_p \qquad \text{(constant } p\text{, no additional work)}
$$

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

$$
\Delta H = \Delta U + \Delta n_g RT \qquad\text{or, per mole of reaction,}\qquad \Delta H_\mathrm{m} = \Delta U_\mathrm{m} + \Delta\nu_g RT
$$

**Physical meaning.** If the reaction makes gas (Δn\_g > 0), the system must push back the atmosphere, so it needs more heat at constant p than at constant V: ΔH > ΔU. If it consumes gas (Δn\_g < 0), the atmosphere pushes in and does work on the system, so ΔH < ΔU. This is the same −nRT expansion work you met in Atkins Example 2A.1.

**Worked example (bomb calorimeter to ΔH).** A bomb calorimeter gives Δ\_c U = −885 kJ mol⁻¹ for methane at 298 K. Find Δ\_c H.

- Reaction: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). At 298 K the water is liquid, so it does not count as gas.
- Δν\_g = 1 − (1 + 2) = −2.
- Δ\_c H = Δ\_c U + Δν\_g RT = −885 + (−2)(2.48) ≈ **−890 kJ mol⁻¹**. ΔH is more negative because the gas volume shrinks and the atmosphere does about 5 kJ mol⁻¹ of work on the system.

**Trap.** Count only **gas-phase** species, and check the physical state of water at the stated temperature.

## 2B.2 How enthalpy changes with temperature

C\_p = (∂H/∂T)\_p is the slope of H against T at constant pressure. For a perfect gas C\_p − C\_V = nR, and when C\_p varies with T you integrate a + bT + c/T².

### The heat capacity at constant pressure

$$
C_p = \left(\frac{\partial H}{\partial T}\right)_p
$$

It is the constant-pressure partner of C\_V = (∂U/∂T)\_V. It is extensive; C\_p,m = C\_p/n is intensive. At constant pressure

$$
\mathrm{d}H = C_p\,\mathrm{d}T \quad\Rightarrow\quad \Delta H = C_p\,\Delta T = q_p \quad (C_p \text{ constant})
$$

So you measure C\_p by heating a sample that is free to expand (open to the atmosphere) and dividing the heat by the temperature rise.

### Why C\_p > C\_V (slides)

At constant volume, all the heat raises U. At constant pressure the gas expands as it warms, so part of the heat leaves as expansion work. To reach the same temperature rise you must supply more heat. More heat per kelvin means a larger heat capacity.

### Derivation: C\_p − C\_V = nR for a perfect gas

**Route 1 (slides: from H = U + nRT).** For a perfect gas pV = nRT, so

$$
H = U + pV = U + nRT
$$

Both U and H depend only on T, so the partial derivatives are ordinary derivatives. Differentiate with respect to T:

$$
\frac{\mathrm{d}H}{\mathrm{d}T} = \frac{\mathrm{d}U}{\mathrm{d}T} + nR \quad\Rightarrow\quad C_p = C_V + nR \quad\Rightarrow\quad C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R
$$

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

$$
q = nC_{p,\mathrm{m}}\Delta T = \tfrac52(8.314)(100)\ \mathrm{J} \approx +2.08\ \mathrm{kJ}
$$

$$
w = -p\,\Delta V = -nR\,\Delta T = -(8.314)(100)\ \mathrm{J} \approx -0.83\ \mathrm{kJ}
$$

$$
\Delta U = q + w \approx +1.25\ \mathrm{kJ}, \qquad \Delta H = q_p \approx +2.08\ \mathrm{kJ}
$$

**Check.** nC\_V,m ΔT = (3/2)(8.314)(100) J = 1.25 kJ. It matches.

**Reading it.** 0.83 ÷ 2.08 = 0.40, so 40% of the heat leaves again as expansion work. That fraction is R/C\_p,m = 2/5 for any monatomic perfect gas. Compare 2A.4: the same 100 K rise at constant volume needed only 1.25 kJ.

**Slides concept check 2.** The same perfect gas is heated from 300 K to 400 K once at constant V and once at constant p. Which is true? **ΔU is the same, but q is larger at constant pressure.** ΔU = nC\_V,m ΔT depends only on ΔT; at constant p the gas also does expansion work, so it needs extra heat.

### When C\_p depends on temperature: C\_p,m = a + bT + c/T² \[beyond slides\]

Over small ranges C\_p is nearly constant, and for monatomic gases it is essentially constant. Otherwise Atkins uses the empirical fit

$$
C_{p,\mathrm{m}} = a + bT + \frac{c}{T^2}
$$

where a, b and c are constants fitted to experiment (Atkins Table 2B.1). Then you cannot write ΔH = C\_pΔT; you must integrate dH = C\_p dT.

**Derivation.** Integrate term by term from T₁ to T₂:

$$
\Delta H_\mathrm{m} = \int_{T_1}^{T_2}\left(a + bT + \frac{c}{T^2}\right)\mathrm{d}T = a(T_2 - T_1) + \tfrac12 b\,(T_2^2 - T_1^2) - c\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
$$

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

$$
\Delta H_\mathrm{m} = \int_{T_1}^{T_2}\left(a + bT + \frac{c}{T^2}\right)\mathrm{d}T = a(T_2 - T_1) + \tfrac12 b\,(T_2^2 - T_1^2) - c\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
$$

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

$$
\Delta H_\mathrm{m} - \Delta U_\mathrm{m} = \Delta\nu_g RT = (-2)(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K}) = -4.96\times10^{3}\ \mathrm{J\,mol^{-1}}
$$

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

$$
\Delta H = 20.17(T_2 - T_1) + \tfrac12(0.3665)(T_2^2 - T_1^2) = 1513\ \mathrm{J} + \tfrac12(0.3665)(75.0)(671.3)\ \mathrm{J} = 1513 + 9226 = 1.07\times10^{4}\ \mathrm{J}
$$

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

$$
n = \frac{pV}{RT} = \frac{(1.013\times10^{5}\ \mathrm{Pa})(107.25\ \mathrm{m^3})}{(8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}})(298\ \mathrm{K})} = 4.39\times10^{3}\ \mathrm{mol}
$$

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

$$
w_\mathrm{ad} = C_V\,\Delta T = nC_{V,\mathrm{m}}\,\Delta T
$$

This holds for reversible **and** irreversible adiabatic changes. The catch is that you need T\_f, and T\_f depends on how the change happens. For the reversible case we can find it.

### Derivation: reversible adiabatic, the slides' γ form

1. **First law with q = 0.** dU = δw. The change is reversible, so δw = −p dV. For a perfect gas dU = nC\_V,m dT. So

$$
nC_{V,\mathrm{m}}\,\mathrm{d}T = -p\,\mathrm{d}V = -\frac{nRT}{V}\,\mathrm{d}V
$$

2. **Separate the variables.** Divide both sides by nC\_V,m T:

$$
\frac{\mathrm{d}T}{T} = -\frac{R}{C_{V,\mathrm{m}}}\,\frac{\mathrm{d}V}{V}
$$

3. **Bring in γ.** Using C\_p,m − C\_V,m = R (2B.2):

$$
\frac{R}{C_{V,\mathrm{m}}} = \frac{C_{p,\mathrm{m}} - C_{V,\mathrm{m}}}{C_{V,\mathrm{m}}} = \gamma - 1
$$

4. **Integrate** from (T\_i, V\_i) to (T\_f, V\_f), with γ constant:

$$
\ln\frac{T_f}{T_i} = -(\gamma - 1)\ln\frac{V_f}{V_i} \quad\Rightarrow\quad T_f V_f^{\gamma-1} = T_i V_i^{\gamma-1}
$$

5. **Switch to p and V.** Put T = pV/(nR) into TV^(γ−1) = constant. The constant nR can be absorbed, leaving

$$
TV^{\gamma-1} = \text{const}, \qquad pV^{\gamma} = \text{const}
$$

In practice: T\_f = T\_i (V\_i/V\_f)^(γ−1) and p\_f = p\_i (V\_i/V\_f)^γ.

### The same result in Atkins's c form

Atkins defines c = C\_V,m/R, so R/C\_V,m = 1/c. Step 4 then reads

$$
c\,\ln\frac{T_f}{T_i} = \ln\frac{V_i}{V_f} \quad\Rightarrow\quad \left(\frac{T_f}{T_i}\right)^{c} = \frac{V_i}{V_f} \quad\Rightarrow\quad V_i T_i^{\,c} = V_f T_f^{\,c}
$$

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

$$
T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma-1} = (300\ \mathrm{K})(10)^{0.40} \approx (300)(2.51) \approx 754\ \mathrm{K}\ (\approx 480\ ^\circ\mathrm{C})
$$

No-calculator trick: log₁₀ 2.5 ≈ 0.40, so 10^0.4 ≈ 2.5.

**Pressure.**

$$
p_2 = p_1\left(\frac{V_1}{V_2}\right)^{\gamma} = (1.00\ \mathrm{bar})(10)^{1.40} \approx 25\ \mathrm{bar}
$$

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

$$
\left(\frac{\mathrm{d}p}{\mathrm{d}V}\right)_\text{isotherm} = -\frac{p}{V}
$$

- Adiabat: pV^γ = constant. Differentiate: V^γ dp + γpV^(γ−1) dV = 0. Divide by V^γ:

$$
\left(\frac{\mathrm{d}p}{\mathrm{d}V}\right)_\text{adiabat} = -\gamma\,\frac{p}{V}
$$

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

# Learn: Thermochemistry and state functions (Atkins 2C, 2D)

## How to use these notes

These notes teach Atkins 11e Topics 2C (thermochemistry) and 2D (state functions, internal pressure and the Joule–Thomson effect) from scratch, in about 60 minutes of reading. Both topics are in the Quiz-2 range (Thermo-1 to Thermo-4).

**Sources.** Topic 2C has no slides, so Part A is taught from Atkins (book p.51–58). Topic 2D follows the course slides (`thermo.tex`, lines 842–862 and 1393–1739) and Atkins p.59–66. Anything that goes beyond both is marked **\[beyond the quiz\]**.

**Sign convention (same as the slides and Atkins).** w is the work done **on** the system, and the first law is

$$
\Delta U = q + w, \qquad \mathrm{d}U = \mathrm{d}q + \mathrm{d}w, \qquad \mathrm{d}w = -p_\text{ex}\,\mathrm{d}V
$$

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

$$
\text{H}_2\text{O(l)} \to \text{H}_2\text{O(g)} \qquad \Delta_\text{vap}H^\circ(373\ \text{K}) = +40.66\ \text{kJ mol}^{-1}
$$

$$
\text{H}_2\text{O(s)} \to \text{H}_2\text{O(l)} \qquad \Delta_\text{fus}H^\circ(273\ \text{K}) = +6.01\ \text{kJ mol}^{-1}
$$

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

$$
\Delta_\text{sub}H^\circ = \Delta_\text{fus}H^\circ + \Delta_\text{vap}H^\circ \qquad (\text{all at the same } T)
$$

Every Δ\_fusH° is positive (melting always absorbs heat), so Δ\_subH° > Δ\_vapH° at a given temperature.

**2. Reversing a process flips the sign.** Go A → B and then B → A. You are back where you started, so the total ΔH is zero:

$$
\Delta H^\circ(\text{A} \to \text{B}) = -\Delta H^\circ(\text{B} \to \text{A})
$$

So the enthalpy of condensation of water at 298 K is −44 kJ mol⁻¹.

**Worked example.** Estimate Δ\_subH° of ice at 0 °C. Use Δ\_fusH° = 6.0 kJ mol⁻¹ and Δ\_vapH° ≈ 45 kJ mol⁻¹ at 0 °C (a little above the 44 kJ mol⁻¹ at 25 °C). Then Δ\_subH° ≈ 6.0 + 45 = **51 kJ mol⁻¹**. The two steps must be at the same temperature; mixing 6.01 kJ (at 273 K) with 40.66 kJ (at 373 K) would be wrong.

### (b) Enthalpies of chemical change

A **thermochemical equation** is a balanced equation plus its standard enthalpy change:

$$
\text{CH}_4\text{(g)} + 2\,\text{O}_2\text{(g)} \to \text{CO}_2\text{(g)} + 2\,\text{H}_2\text{O(l)} \qquad \Delta H^\circ = -890\ \text{kJ}
$$

It means: pure, separate reactants in their standard states turn into pure, separate products in their standard states. The small enthalpy of mixing and separating is ignored (except for ions in solution).

The **standard reaction enthalpy** Δ\_rH° is defined from the standard molar enthalpies H°\_m(J) of each species J:

$$
\Delta_\text{r}H^\circ = \sum_\text{products} \nu\, H^\circ_\text{m} - \sum_\text{reactants} \nu\, H^\circ_\text{m}
$$

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

$$
\Delta_\text{r}H^\circ = \Delta_\text{c}H^\circ(\text{C}_6\text{H}_6) + 3\,\Delta_\text{c}H^\circ(\text{H}_2) - \Delta_\text{c}H^\circ(\text{C}_6\text{H}_{12})
$$

$$
= -3268 + 3(-286) - (-3920) = -3268 - 858 + 3920 = -206\ \text{kJ mol}^{-1}
$$

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

$$
\Delta_\text{f}H^\circ(\text{H}^+, \text{aq}) = 0
$$

Then if Δ\_fH°(HBr, aq) = −122 kJ mol⁻¹, all of it is assigned to the anion: Δ\_fH°(Br⁻, aq) = −122 kJ mol⁻¹. Other ions follow step by step.

### Derivation: Δ\_rH° from formation enthalpies

Picture the reaction as a two-step route through the elements:

1. **"Unform" the reactants** into their elements. Unforming is formation reversed, so this step contributes −Σ ν Δ\_fH°(reactants).
2. **Form the products** from those same elements. This contributes +Σ ν Δ\_fH°(products).

The atoms are conserved, so the elements at the halfway point are exactly the ones needed. H is a state function, so the direct route has the same ΔH as this detour:

$$
\Delta_\text{r}H^\circ = \sum_\text{products} \nu\, \Delta_\text{f}H^\circ - \sum_\text{reactants} \nu\, \Delta_\text{f}H^\circ
$$

A compact form uses **stoichiometric numbers** ν\_J, which carry a sign: positive for products, negative for reactants.

$$
\Delta_\text{r}H^\circ = \sum_\text{J} \nu_\text{J}\, \Delta_\text{f}H^\circ(\text{J})
$$

For CH₄ + 2O₂ → CO₂ + 2H₂O: ν(CH₄) = −1, ν(O₂) = −2, ν(CO₂) = +1, ν(H₂O) = +2. Don't mix up ν (always positive) with ν\_J (signed).

### Worked example: combustion of methane

Data at 298 K, in kJ mol⁻¹: Δ\_fH°(CH₄, g) = −74.8; Δ\_fH°(CO₂, g) = −393.5; Δ\_fH°(H₂O, l) = −285.8; O₂(g) is an element in its reference state, so 0.

$$
\Delta_\text{c}H^\circ = [-393.5 + 2(-285.8)] - [-74.8 + 2(0)] = -965.1 + 74.8 = -890.3\ \text{kJ mol}^{-1}
$$

This matches the −890 kJ mol⁻¹ in the thermochemical equation of 2C.1.

### Exam-style example: running it backwards

**Q.** Δ\_cH° of liquid benzene is −3268 kJ mol⁻¹. Find Δ\_fH°(C₆H₆, l), using the CO₂ and H₂O(l) values above.

**A.** The combustion is C₆H₆(l) + (15/2)O₂ → 6CO₂(g) + 3H₂O(l). Apply the formula, with the benzene value x as the only unknown:

$$
-3268 = [6(-393.5) + 3(-285.8)] - x = -3218.4 - x
$$

$$
x = \Delta_\text{f}H^\circ(\text{C}_6\text{H}_6, \text{l}) = -3218.4 + 3268 \approx +50\ \text{kJ mol}^{-1}
$$

The tabulated value is +49.0; the small gap comes from rounding the data. A positive Δ\_fH° means benzene sits *above* its elements on the enthalpy scale.

### Exam-style example: a consistency check

**Q.** Δ\_fH°(H₂O, l) = −285.83 and Δ\_fH°(H₂O, g) = −241.82 kJ mol⁻¹. What is Δ\_vapH° of water at 298 K?

**A.** H₂O(l) → H₂O(g) is a "reaction" like any other: Δ\_vapH° = (−241.82) − (−285.83) = **+44.01 kJ mol⁻¹**, the value quoted in 2C.1. Watch the phase of water in every problem: using H₂O(g) instead of H₂O(l) changes Δ\_rH° by 44 kJ mol⁻¹ per mole of water.

## 2C.3 Temperature dependence of reaction enthalpies (Kirchhoff's law)

### Intuition

Tables give Δ\_rH° at 298 K, but reactions often run hot. Heat the reactants and the products separately. Each one's enthalpy rises at a rate equal to its heat capacity C\_p (because dH = C\_p dT at constant pressure). If the products have the larger total heat capacity, their enthalpy climbs faster, and Δ\_rH° = H(products) − H(reactants) becomes more positive as T rises. If the reactants have the larger heat capacity, Δ\_rH° becomes more negative. Only the **difference** of heat capacities matters.

### Derivation (show every step in an exam)

**Step 1. One substance.** At constant pressure, dH = C\_p dT (Topic 2B). Integrate from T₁ to T₂ for the standard molar enthalpy of species J, assuming no phase change in between:

$$
H^\circ_\text{m}(\text{J}, T_2) = H^\circ_\text{m}(\text{J}, T_1) + \int_{T_1}^{T_2} C^\circ_{p,\text{m}}(\text{J})\, \mathrm{d}T
$$

**Step 2. Combine with signed coefficients.** Multiply by ν\_J (positive for products, negative for reactants) and sum over all species. The left side becomes Δ\_rH°(T₂) and the first term on the right becomes Δ\_rH°(T₁):

$$
\Delta_\text{r}H^\circ(T_2) = \Delta_\text{r}H^\circ(T_1) + \int_{T_1}^{T_2} \Delta_\text{r}C_p^\circ\, \mathrm{d}T \qquad \text{(Kirchhoff's law)}
$$

**Step 3. Define the reaction heat capacity:**

$$
\Delta_\text{r}C_p^\circ = \sum_\text{J} \nu_\text{J}\, C^\circ_{p,\text{m}}(\text{J}) = \sum_\text{products} \nu\, C^\circ_{p,\text{m}} - \sum_\text{reactants} \nu\, C^\circ_{p,\text{m}}
$$

In differential form the law says d(Δ\_rH°)/dT = Δ\_rC\_p°: the slope of Δ\_rH° against T is the reaction heat capacity.

**Step 4. Constant Δ\_rC\_p°.** Individual heat capacities change with T, but their difference changes much less. Over a modest range, take Δ\_rC\_p° as constant and pull it out of the integral:

$$
\Delta_\text{r}H^\circ(T_2) = \Delta_\text{r}H^\circ(T_1) + \Delta_\text{r}C_p^\circ\,(T_2 - T_1)
$$

**Same result as a Hess cycle (a good alternative derivation).** To react at T₂: cool the reactants from T₂ to T₁, react at T₁, then heat the products from T₁ back to T₂. The three steps start and end in the same states as the direct reaction at T₂, so

$$
\Delta_\text{r}H^\circ(T_2) = -\!\int_{T_1}^{T_2}\! C_p(\text{reactants})\,\mathrm{d}T + \Delta_\text{r}H^\circ(T_1) + \int_{T_1}^{T_2}\! C_p(\text{products})\,\mathrm{d}T
$$

Combining the two integrals gives Kirchhoff's law again.

**Caveat: phase changes.** If a species melts or boils between T₁ and T₂, the simple formula fails. Split the range at the transition, add that species' Δ\_trsH°, and switch to the heat capacity of the new phase.

### Worked example: Atkins Example 2C.2 (Kirchhoff)

**Q.** Δ\_fH°(H₂O, g) = −241.82 kJ mol⁻¹ at 298 K. Estimate it at 100 °C. Molar C\_p in J K⁻¹ mol⁻¹: H₂O(g) 33.58; H₂(g) 28.84; O₂(g) 29.37. Assume they are constant.

**Step 1. Equation.** H₂(g) + ½O₂(g) → H₂O(g).

**Step 2. Δ\_rC\_p°.**

$$
\Delta_\text{r}C_p^\circ = 33.58 - \left(28.84 + \tfrac{1}{2} \times 29.37\right) = 33.58 - 43.53 = -9.94\ \text{J K}^{-1}\,\text{mol}^{-1}
$$

**Step 3. Apply the law.** T₂ − T₁ = 373 − 298 = 75 K. **Convert J to kJ** before adding:

$$
\Delta_\text{f}H^\circ(373\ \text{K}) = -241.82 + (75)(-9.94 \times 10^{-3}) = -241.82 - 0.75 = -242.6\ \text{kJ mol}^{-1}
$$

The change is under 1%. That is typical: Kirchhoff corrections are small unless the temperature range is hundreds of kelvin.

### Exam-style example: why Δ\_vapH° of water is smaller at 100 °C

**Q.** Δ\_vapH°(298 K) = 44.0 kJ mol⁻¹. C\_p,m(H₂O, l) = 75.3 and C\_p,m(H₂O, g) = 33.6 J K⁻¹ mol⁻¹. Estimate Δ\_vapH° at 373 K.

**A.** For H₂O(l) → H₂O(g), ΔC\_p = 33.6 − 75.3 = −41.7 J K⁻¹ mol⁻¹. So

$$
\Delta_\text{vap}H^\circ(373\ \text{K}) \approx 44.0 + (75)(-41.7 \times 10^{-3}) = 44.0 - 3.1 = 40.9\ \text{kJ mol}^{-1}
$$

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

$$
C\,\Delta T = -n\,\Delta_\text{c}U \qquad\Longrightarrow\qquad \Delta_\text{c}U = -\frac{C\,\Delta T}{n}
$$

### Derivation: converting Δ\_rU to Δ\_rH

**Step 1.** From H = U + pV, for the reaction: Δ\_rH = Δ\_rU + Δ(pV).

**Step 2.** Solids and liquids have tiny molar volumes. For example, 1 bar × 0.1 L mol⁻¹ = 10 J mol⁻¹, negligible next to kJ mol⁻¹. So only the gases contribute to Δ(pV).

**Step 3.** Treat the gases as perfect: pV = n\_g RT. At a fixed temperature, Δ(pV) = Δn\_g RT, so

$$
\Delta_\text{r}H = \Delta_\text{r}U + \Delta n_\text{g}\,RT
$$

Here Δn\_g = (moles of gaseous products) − (moles of gaseous reactants) per mole of reaction as written. It is a pure number in this formula, and RT ≈ 2.48 kJ mol⁻¹ at 298 K.

**Physical reading.** If the gas amount shrinks (Δn\_g < 0), then at constant pressure the surroundings push in and do work on the system. That extra energy also leaves as heat, so more heat comes out at constant pressure than at constant volume: Δ\_rH is more negative than Δ\_rU.

### Worked example: Δn\_g RT for methane

**Q.** For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), Δ\_rH° = −890.3 kJ mol⁻¹ at 298 K. What does a bomb calorimeter measure?

**A.** Gases: 1 mol CO₂ on the right; 1 + 2 = 3 mol on the left (the water is liquid). So Δn\_g = 1 − 3 = −2.

$$
\Delta_\text{r}U = \Delta_\text{r}H - \Delta n_\text{g}RT = -890.3 - (-2)(2.48) = -890.3 + 5.0 = -885.3\ \text{kJ mol}^{-1}
$$

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

$$
C_{p,\text{ex}} = \frac{q_{p,\text{ex}}}{\Delta T} = \frac{q_{p,\text{ex}}}{\alpha t} = \frac{P_\text{ex}}{\alpha}
$$

**From the curve to ΔH.** A plot of C\_p,ex against T is a **thermogram**. In a small step dT, the extra heat absorbed is C\_p,ex dT, and at constant pressure heat equals enthalpy change. Add up the steps from where the process starts (T₁) to where it ends (T₂):

$$
\Delta H = \int_{T_1}^{T_2} C_{p,\text{ex}}\, \mathrm{d}T \qquad \text{(the area under the peak)}
$$

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

$$
\Delta_\text{c}U = \Delta_\text{c}H - \Delta n_\text{g}RT = -5157 - (-2)(2.479) = -5152\ \text{kJ mol}^{-1}
$$

**Step 2. Heat released by the naphthalene.**

$$
n = \frac{0.120\ \text{g}}{128.18\ \text{g mol}^{-1}} = 9.36\times10^{-4}\ \text{mol}, \qquad q = n\,|\Delta_\text{c}U| = (9.36\times10^{-4})(5152) = 4.82\ \text{kJ}
$$

**Step 3. Calorimeter constant.**

$$
C = \frac{q}{\Delta T} = \frac{4.82\ \text{kJ}}{3.05\ \text{K}} = 1.58\ \text{kJ K}^{-1}
$$

**Step 4. Heat released by the phenol.** C₆H₅OH(s) + 7O₂(g) → 6CO₂(g) + 3H₂O(l), so Δn\_g = 6 − 7 = −1. Then Δ\_cU = −3054 + 2.48 = −3051.5 kJ mol⁻¹.

$$
n = \frac{0.150\ \text{g}}{94.12\ \text{g mol}^{-1}} = 1.594\times10^{-3}\ \text{mol}, \qquad q = (1.594\times10^{-3})(3051.5) = 4.86\ \text{kJ}
$$

**Step 5. Temperature rise.**

$$
\Delta T = \frac{q}{C} = \frac{4.86\ \text{kJ}}{1.58\ \text{kJ K}^{-1}} = 3.08\ \text{K}
$$

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

$$
\Delta_\text{r}H^\circ = -1373 + (2)(2.479) = -1368\ \text{kJ mol}^{-1}
$$

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

$$
\Delta T = \frac{q}{m\,c_s} = \frac{1.0\times10^{7}\ \text{J}}{(6.5\times10^{4}\ \text{g})(4.18\ \text{J K}^{-1}\,\text{g}^{-1})} = 37\ \text{K}
$$

**Step 3. Comment.** Body temperature would climb from 37 °C to about 74 °C in one day, which would be fatal. So the body must shed this heat continuously.

**(b) Step 4. Principle.** At constant pressure, evaporating n mol of water absorbs nΔ\_vapH, so we need nΔ\_vapH = q. Use Δ\_vapH(H₂O) = 44.0 kJ mol⁻¹ (the 298 K value; at 37 °C, Kirchhoff gives 43.5).

**Step 5. Amount, then mass.**

$$
n = \frac{1.0\times10^{7}\ \text{J}}{4.40\times10^{4}\ \text{J mol}^{-1}} = 227\ \text{mol}, \qquad m = (227\ \text{mol})(18.02\ \text{g mol}^{-1}) = 4.1\times10^{3}\ \text{g} = 4.1\ \text{kg}
$$

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

$$
\Delta_\text{r}H^\circ = \sum_\text{products}\nu\,\Delta_\text{f}H^\circ - \sum_\text{reactants}\nu\,\Delta_\text{f}H^\circ
$$

H₂(g) is an element in its reference state, so Δ\_fH°(H₂) = 0.

**Step 2. (a)**

$$
\Delta_\text{r}H^\circ = [274 + 0] - [34.3] = +239.7 \approx +240\ \text{kJ mol}^{-1}
$$

**Step 3. (b)**

$$
\Delta_\text{r}H^\circ = [274 + 34.3] - [80.3] = +228.0\ \text{kJ mol}^{-1}
$$

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

$$
\Delta H = \int_{T_1}^{T_2} C_{p,\text{ex}}\,\mathrm{d}T
$$

This is the area under the curve. A step of 1 °C is the same size as 1 K, so mJ °C⁻¹ × °C = mJ.

**Step 2. Integrate (trapezium rule, step h = 5 °C).** The bracket is half the two end values plus the sum of the eleven interior values:

$$
A = h\left[\tfrac{1}{2}(y_\text{first} + y_\text{last}) + \sum y_\text{interior}\right] = 5\left[\tfrac{1}{2}(0 + 1.5) + 45.0\right] = 5 \times 45.75 \approx 229\ \text{mJ}
$$

Counting squares works too. Each grid square is 15 °C × 1.5 mJ °C⁻¹ = 22.5 mJ, and the curve encloses about 10 squares, so about 230 mJ.

**Step 3. Baseline.** After the transition the curve settles at 1.5 mJ °C⁻¹, not 0, because the unfolded protein has a higher heat capacity. That plateau is not part of the unfolding enthalpy. Use a baseline that steps from 0 to 1.5 mJ °C⁻¹ at T\_m ≈ 61 °C, and subtract its area, 1.5 × (90 − 61) ≈ 44 mJ:

$$
\Delta H \approx 229 - 44 \approx 185\ \text{mJ} \approx +0.19\ \text{J}
$$

A more careful baseline, which rises in step with the fraction of protein unfolded, gives 187 mJ: the same to two significant figures. Integrating all the way down to zero instead gives 0.23 J. That over-counts, but it is accepted if the student says which baseline they used.

**Step 4. Change in heat capacity.**

$$
\Delta C_p = C_p(\text{unfolded}) - C_p(\text{native}) \approx 1.5 - 0 = +1.5\ \text{mJ K}^{-1}
$$

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

$$
\mathrm{d}f = \left(\frac{\partial f}{\partial x}\right)_y \mathrm{d}x + \left(\frac{\partial f}{\partial y}\right)_x \mathrm{d}y
$$

- The subscript says which variable is held fixed. (∂U/∂T)\_V and (∂U/∂T)\_p are **different** quantities.
- Mixed second derivatives do not depend on the order: ∂²f/∂x∂y = ∂²f/∂y∂x.
- Reciprocal: (∂y/∂x)\_z = 1/(∂x/∂y)\_z.
- **Euler chain relation**, for three variables linked by one equation (like p, V, T):

$$
\left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial z}\right)_x \left(\frac{\partial z}{\partial x}\right)_y = -1
$$

The minus sign surprises everyone. Memory aid: each variable appears once on top, once on the bottom and once as the subscript.

## 2D.1 Exact and inexact differentials

### Intuition (the slide's hiking analogy)

On a hike, your **change in altitude** depends only on where you start and where you finish. That makes altitude like a state function. The **distance you walk** depends on the trail you take, like a path function. Internal energy U is like altitude. Heat q and work w are like distance walked: they describe the journey, not the place. A state has no "heat content", so there is no such thing as q\_A.

### Definitions

- **State function**: depends only on the current state, not on its history. Examples: U, H, p, V, T (and later S).
- **Path function**: depends on the route between states. Examples: q and w.
- **Exact differential**: a small change whose integral depends only on the end points. dU is exact:

$$
\int_\text{A}^\text{B} \mathrm{d}U = U_\text{B} - U_\text{A}, \qquad \oint \mathrm{d}U = 0
$$

- **Inexact differential**: a small quantity whose integral depends on the path, so the path must be specified. The slides write it with a barred d, đq and đw:

$$
\int_\text{A}^\text{B} \text{đ}q = q \;(\text{not } q_\text{B} - q_\text{A}), \qquad \oint \text{đ}q \neq 0 \text{ in general}
$$

Notice that the integral of đq is just q, the heat for that path, never a "Δq".

The first law in differential form adds two inexact pieces to give an exact one:

$$
\mathrm{d}U = \text{đ}q + \text{đ}w = \text{đ}q - p\,\mathrm{d}V \qquad (\text{quasi-static})
$$

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

$$
\mathrm{d}f = M(x,y)\,\mathrm{d}x + N(x,y)\,\mathrm{d}y
$$

**Test:** df is exact if and only if

$$
\left(\frac{\partial M}{\partial y}\right)_x = \left(\frac{\partial N}{\partial x}\right)_y
$$

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

$$
\frac{\text{đ}q_\text{rev}}{T} = \frac{C_V}{T}\,\mathrm{d}T + \frac{nR}{V}\,\mathrm{d}V
$$

Now ∂(C\_V/T)/∂V = 0 and ∂(nR/V)/∂T = 0. Equal, so it is **exact**. Dividing by T turns heat into the differential of a state function. That state function is the entropy, dS = đq\_rev/T, the centre of Topic 3A. Mathematicians call 1/T an *integrating factor*.

## 2D.2 Changes in internal energy

### (a) dU = C\_V dT + π\_T dV

**Setting.** Take a closed system of fixed composition. An equation of state links p, V and T, so any two of them fix the state. Choose T and V; this gives the simplest formulas for U. The total differential of U(T, V) is

$$
\mathrm{d}U = \left(\frac{\partial U}{\partial T}\right)_V \mathrm{d}T + \left(\frac{\partial U}{\partial V}\right)_T \mathrm{d}V
$$

Both coefficients have names:

$$
C_V = \left(\frac{\partial U}{\partial T}\right)_V \qquad\qquad \pi_T \equiv \left(\frac{\partial U}{\partial V}\right)_T \;\;(\text{internal pressure})
$$

$$
\mathrm{d}U = C_V\,\mathrm{d}T + \pi_T\,\mathrm{d}V
$$

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

$$
\pi_T = T\left(\frac{\partial p}{\partial T}\right)_V - p \qquad (\text{thermodynamic equation of state})
$$

**Perfect gas.** p = nRT/V, so (∂p/∂T)\_V = nR/V. Then

$$
\pi_T = T\cdot\frac{nR}{V} - p = p - p = 0 \;\checkmark
$$

**van der Waals gas.** Molar form: p = RT/(V\_m − b) − a/V\_m². At constant V\_m, only the first term depends on T, so (∂p/∂T)\_V = R/(V\_m − b). Then

$$
\pi_T = \frac{RT}{V_\text{m} - b} - p = \frac{RT}{V_\text{m} - b} - \left(\frac{RT}{V_\text{m} - b} - \frac{a}{V_\text{m}^2}\right) = \frac{a}{V_\text{m}^2}
$$

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

$$
0 = C_{V,\text{m}}\,\Delta T + \int_{V_\text{i}}^{V_\text{f}} \frac{a}{V_\text{m}^2}\,\mathrm{d}V_\text{m} = C_{V,\text{m}}\,\Delta T + a\left(\frac{1}{V_\text{m,i}} - \frac{1}{V_\text{m,f}}\right)
$$

$$
\Delta T = -\frac{a}{C_{V,\text{m}}}\left(\frac{1}{V_\text{m,i}} - \frac{1}{V_\text{m,f}}\right)
$$

Numbers: 1/24.8 − 1/49.6 = 1/49.6 ≈ 0.0202 L⁻¹. Then a × 0.0202 = 0.0276 L bar mol⁻¹ = 2.76 J mol⁻¹ (since 1 L bar = 100 J). So ΔT ≈ −2.76/20.8 ≈ **−0.13 K in the gas alone**.

The gas **cools**: molecules climbing out of each other's attractive wells pay for it with kinetic energy. Now spread those 2.76 J over even 1 kg of water (heat capacity 4.2 kJ K⁻¹): the bath would change by less than a thousandth of a kelvin. That is why Joule saw nothing.

### Exam-style example: ΔU for an isothermal expansion of a dense gas

**Q.** Find ΔU\_m when 1 mol of CO₂ (a = 3.640 L² bar mol⁻²) expands isothermally from 0.50 L to 25 L.

**A.** At constant T, dU = π\_T dV. So ΔU\_m = a(1/V\_i − 1/V\_f) = 3.640 × (2.00 − 0.04) = 7.13 L bar mol⁻¹ ≈ **+713 J mol⁻¹**. For a perfect gas this would be zero. It is positive because the attractions must be overcome.

### (b) Changes in U at constant pressure: α and κ\_T \[Atkins; not on the slides\]

**Step 1.** Divide dU = C\_V dT + π\_T dV by dT and hold p constant:

$$
\left(\frac{\partial U}{\partial T}\right)_p = C_V + \pi_T\left(\frac{\partial V}{\partial T}\right)_p
$$

**Step 2.** The derivative on the right is a measurable material property. Define two of them:

$$
\alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_p \quad (\text{expansion coefficient}) \qquad \kappa_T = -\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_T \quad (\text{isothermal compressibility})
$$

- α is the **fractional** change in volume per kelvin at constant pressure. Units: K⁻¹.
- κ\_T is the fractional *decrease* in volume per unit rise in pressure at constant temperature. Units: Pa⁻¹ or bar⁻¹. The minus sign makes it positive, because raising p (dp > 0) shrinks V (dV < 0).

**Step 3.** Substitute (∂V/∂T)\_p = αV:

$$
\left(\frac{\partial U}{\partial T}\right)_p = \alpha\,\pi_T\,V + C_V
$$

This is general for a closed system of fixed composition. For a perfect gas, π\_T = 0, so (∂U/∂T)\_p = C\_V: for a perfect gas, C\_V is also the slope of U against T at constant **pressure**.

**Step 4. C\_p − C\_V for a perfect gas.** Use H = U + pV = U + nRT:

$$
C_p - C_V = \left(\frac{\partial H}{\partial T}\right)_p - \left(\frac{\partial U}{\partial T}\right)_p = \left(\frac{\partial (U + nRT)}{\partial T}\right)_p - \left(\frac{\partial U}{\partial T}\right)_p = nR
$$

The general result for any substance (its proof needs the Second Law) is C\_p − C\_V = α²TV/κ\_T. For liquid water at 25 °C it gives C\_p,m − C\_V,m ≈ 0.49 J K⁻¹ mol⁻¹, tiny next to C\_p,m = 75.3. Don't assume the difference is always small for condensed phases, though: κ\_T is small too, and in some solids C\_p and C\_V differ by up to 30%.

### Worked example: Atkins Example 2D.2 (α of a perfect gas) and its self-test (κ\_T)

**α.** From pV = nRT, at constant p, V = nRT/p, so (∂V/∂T)\_p = nR/p. Then

$$
\alpha = \frac{1}{V}\cdot\frac{nR}{p} = \frac{nR}{pV} = \frac{nR}{nRT} = \frac{1}{T}
$$

**κ\_T.** At constant T, V = nRT/p, so (∂V/∂p)\_T = −nRT/p². Then

$$
\kappa_T = -\frac{1}{V}\left(-\frac{nRT}{p^2}\right) = \frac{nRT}{pV}\cdot\frac{1}{p} = \frac{1}{p}
$$

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

$$
\mathrm{d}H = \left(\frac{\partial H}{\partial p}\right)_T \mathrm{d}p + C_p\,\mathrm{d}T
$$

**Step 2.** Now consider a change at constant H, so dH = 0:

$$
0 = \left(\frac{\partial H}{\partial p}\right)_T \mathrm{d}p + C_p\,\mathrm{d}T \qquad (\text{constant } H)
$$

**Step 3.** Divide by dp. Because H is constant, dT/dp becomes (∂T/∂p)\_H:

$$
\left(\frac{\partial H}{\partial p}\right)_T = -C_p\left(\frac{\partial T}{\partial p}\right)_H = -C_p\,\mu
$$

The new derivative is the **Joule–Thomson coefficient**, the rate at which temperature changes with pressure when H is held fixed:

$$
\mu = \left(\frac{\partial T}{\partial p}\right)_H
$$

**Step 4.** Substitute back into Step 1:

$$
\mathrm{d}H = -\mu\,C_p\,\mathrm{d}p + C_p\,\mathrm{d}T
$$

### Derivation 2: the Euler chain relation (the slides' route)

H, p and T are three variables linked by the state of the system. The Euler chain relation for them reads

$$
\left(\frac{\partial H}{\partial p}\right)_T \left(\frac{\partial p}{\partial T}\right)_H \left(\frac{\partial T}{\partial H}\right)_p = -1
$$

Solve for the first factor and use the reciprocal rule on the other two, (∂p/∂T)\_H = 1/(∂T/∂p)\_H and (∂T/∂H)\_p = 1/(∂H/∂T)\_p:

$$
\left(\frac{\partial H}{\partial p}\right)_T = -\left(\frac{\partial H}{\partial T}\right)_p \left(\frac{\partial T}{\partial p}\right)_H = -C_p\,\mu
$$

Both routes give the same answer. In an exam, the chain-rule version is quicker to write.

### The isothermal Joule–Thomson coefficient μ\_T

$$
\mu_T \equiv \left(\frac{\partial H}{\partial p}\right)_T = -C_p\,\mu
$$

- μ\_T is the **enthalpy analogue of π\_T**. π\_T says how U changes with V at constant T; μ\_T says how H changes with p at constant T.
- **Both are zero for a perfect gas.** So U *and* H of a perfect gas depend only on T. (Consistent with H = U + nRT.)
- With C\_p,m in place of C\_p you get the molar μ\_T, in J mol⁻¹ Pa⁻¹ (or J mol⁻¹ bar⁻¹).

**How it is measured.** Measuring μ directly means keeping H fixed, which is awkward. It is easier to keep T fixed. Let the gas flow steadily through a porous plug from p\_i to p\_f, with a small heater beside the plug that holds the temperature constant. By the same flow-work argument used for the Joule–Thomson expansion in 2D.4, the heat q\_m supplied per mole equals ΔH\_m. So

$$
\mu_T \approx \frac{\Delta H_\text{m}}{\Delta p} = \frac{q_\text{m}}{p_\text{f} - p_\text{i}}
$$

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

$$
w_1 = -p_\text{i}(0 - V_\text{i}) = +p_\text{i}V_\text{i}
$$

This is positive: the gas is pushed on.

**Step 2. Downstream work.** On the far side, our gas must push the gas in front out of the way at constant pressure p\_f, and its downstream volume goes from 0 to V\_f:

$$
w_2 = -p_\text{f}(V_\text{f} - 0) = -p_\text{f}V_\text{f}
$$

This is negative: the gas does work on its surroundings.

**Step 3. First law.**

$$
U_\text{f} - U_\text{i} = w_1 + w_2 = p_\text{i}V_\text{i} - p_\text{f}V_\text{f}
$$

**Step 4. Rearrange** into the definition of H:

$$
U_\text{f} + p_\text{f}V_\text{f} = U_\text{i} + p_\text{i}V_\text{i} \quad\Longrightarrow\quad H_\text{f} = H_\text{i}
$$

The expansion is **isenthalpic**. The measured ratio ΔT/Δp is therefore a temperature change at constant H. In the limit of a small pressure drop, it is the Joule–Thomson coefficient

$$
\mu = \left(\frac{\partial T}{\partial p}\right)_H, \qquad \Delta T \approx \mu\,\Delta p
$$

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

$$
V_\text{m} \approx \frac{RT}{p} + b - \frac{a}{RT}
$$

**Step 2. A general formula** for μ, derived in Topic 3E (use it):

$$
\mu = \frac{T\left(\partial V_\text{m}/\partial T\right)_p - V_\text{m}}{C_{p,\text{m}}}
$$

**Step 3. Differentiate Step 1** at constant p:

$$
\left(\frac{\partial V_\text{m}}{\partial T}\right)_p = \frac{R}{p} + \frac{a}{RT^2} \quad\Longrightarrow\quad T\left(\frac{\partial V_\text{m}}{\partial T}\right)_p = \frac{RT}{p} + \frac{a}{RT}
$$

**Step 4. Subtract V\_m.** The RT/p terms cancel:

$$
T\left(\frac{\partial V_\text{m}}{\partial T}\right)_p - V_\text{m} = \frac{RT}{p} + \frac{a}{RT} - \frac{RT}{p} - b + \frac{a}{RT} = \frac{2a}{RT} - b
$$

$$
\mu \approx \frac{1}{C_{p,\text{m}}}\left(\frac{2a}{RT} - b\right)
$$

- **2a/RT** comes from attractions and drives **cooling**. It shrinks as T rises.
- **−b** comes from molecular size (repulsions) and drives **heating**. It does not depend on T.
- μ changes sign when the two terms balance. That is the **inversion temperature**:

$$
\frac{2a}{RT_\text{I}} = b \quad\Longrightarrow\quad T_\text{I} = \frac{2a}{Rb}
$$

Below T\_I the gas cools on throttling; above T\_I it warms.

**Note.** This low-pressure μ does not vanish as p → 0, even though the equation of state then approaches the perfect-gas law. μ depends on *derivatives* of the equation of state (through B(T)), and those don't vanish.

**\[beyond the quiz\] Where the Step 2 formula comes from.** In Topic 3, dH = T dS + V dp. At constant T, (∂H/∂p)\_T = T(∂S/∂p)\_T + V. A Maxwell relation (from the Gibbs energy) gives (∂S/∂p)\_T = −(∂V/∂T)\_p. So μ\_T = V − T(∂V/∂T)\_p, and μ = −μ\_T/C\_p gives the Step 2 formula.

### Worked example: nitrogen at 298 K (the slide numbers)

**Data.** a = 1.370 L² bar mol⁻², b = 0.0387 L mol⁻¹, C\_p,m = 29.1 J K⁻¹ mol⁻¹, RT = 24.8 L bar mol⁻¹.

**μ.**

$$
\frac{2a}{RT} - b = \frac{2.740}{24.8} - 0.0387 = 0.1106 - 0.0387 = 0.0719\ \text{L mol}^{-1}
$$

Convert with 1 L bar = 100 J, so 0.0719 L mol⁻¹ = 7.19 J mol⁻¹ bar⁻¹:

$$
\mu \approx \frac{7.19\ \text{J mol}^{-1}\,\text{bar}^{-1}}{29.1\ \text{J K}^{-1}\,\text{mol}^{-1}} \approx 0.25\ \text{K bar}^{-1}
$$

The measured value is 0.27 K atm⁻¹, very close. (The slide does the same in SI: 7.19 × 10⁻⁵ m³ mol⁻¹ / 29.1 = 2.5 × 10⁻⁶ K Pa⁻¹.) **Hand rule:** μ in K bar⁻¹ = 100 × (2a/RT − b in L mol⁻¹) / (C\_p,m in J K⁻¹ mol⁻¹).

**T\_I.**

$$
T_\text{I} = \frac{2a}{Rb} = \frac{2.740}{0.08314 \times 0.0387} = \frac{2.740}{0.00322} \approx 850\ \text{K}
$$

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

$$
p_\text{r} = 24\sqrt{3T_\text{r}} - 12T_\text{r} - 27
$$

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

$$
\Delta U_\text{m} = \int_{V_\text{i}}^{V_\text{f}} \frac{a}{V_\text{m}^2}\,\mathrm{d}V_\text{m} = a\left(\frac{1}{V_\text{i}} - \frac{1}{V_\text{f}}\right)
$$

**Step 2. Numbers in SI.** a = 1.352 × (1.01325 × 10⁵ Pa) × (10⁻³ m³)² = 0.1370 Pa m⁶ mol⁻². With V in m³ mol⁻¹, 1/V\_i − 1/V\_f = 1000 − 50 = 950 mol m⁻³.

$$
\Delta U_\text{m} = (0.1370\ \text{Pa m}^6\,\text{mol}^{-2})(950\ \text{mol m}^{-3}) = +130\ \text{J mol}^{-1}
$$

**Step 3. w (path: reversible, stated).** The question doesn't name a path, so assume a reversible expansion, with p = RT/(V\_m − b) − a/V\_m²:

$$
w = -\int_{V_\text{i}}^{V_\text{f}} p\,\mathrm{d}V_\text{m} = -RT\ln\frac{V_\text{f} - b}{V_\text{i} - b} + a\left(\frac{1}{V_\text{i}} - \frac{1}{V_\text{f}}\right)
$$

$$
\ln\frac{20.00 - 0.0387}{1.00 - 0.0387} = \ln 20.77 = 3.033, \qquad RT = (8.3145)(298) = 2478\ \text{J mol}^{-1}
$$

$$
w = -(2478)(3.033) + 130 = -7515 + 130 = -7385\ \text{J mol}^{-1} \approx -7.39\ \text{kJ mol}^{-1}
$$

**Step 4. q from the first law.**

$$
q = \Delta U_\text{m} - w = 130 - (-7385) = +7515\ \text{J mol}^{-1} \approx +7.52\ \text{kJ mol}^{-1}
$$

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

$$
\left(\frac{\partial p}{\partial T}\right)_V\left(\frac{\partial T}{\partial V}\right)_p\left(\frac{\partial V}{\partial p}\right)_T = -1
$$

**Step 2. Solve for (∂p/∂T)\_V**, using the reciprocal rule (∂T/∂V)\_p = 1/(∂V/∂T)\_p:

$$
\left(\frac{\partial p}{\partial T}\right)_V = -\frac{1}{(\partial T/\partial V)_p\,(\partial V/\partial p)_T} = -\frac{(\partial V/\partial T)_p}{(\partial V/\partial p)_T}
$$

**Step 3. Substitute** into the starting expression:

$$
C_p - C_V = -\frac{T\,(\partial V/\partial T)_p^2}{(\partial V/\partial p)_T} = \frac{\alpha^2 T V}{\kappa_T}
$$

The second form uses (∂V/∂T)\_p = αV and (∂V/∂p)\_T = −κ\_TV. Both factors make it plainly positive.

**Step 4. Perfect gas.** V = nRT/p, so (∂V/∂T)\_p = nR/p and (∂V/∂p)\_T = −nRT/p².

$$
C_p - C_V = -\frac{T\,(nR/p)^2}{-nRT/p^2} = nR \qquad (C_{p,\text{m}} - C_{V,\text{m}} = R)
$$

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

$$
\mu\,C_{p,\text{m}} = -\left(\frac{\partial H_\text{m}}{\partial p}\right)_T
$$

**Step 2. Split H.** H\_m = U\_m + pV\_m, so

$$
\left(\frac{\partial H_\text{m}}{\partial p}\right)_T = \left(\frac{\partial U_\text{m}}{\partial p}\right)_T + \left(\frac{\partial (pV_\text{m})}{\partial p}\right)_T
$$

**Step 3. The U term.** By the chain rule at constant T:

$$
\left(\frac{\partial U_\text{m}}{\partial p}\right)_T = \left(\frac{\partial U_\text{m}}{\partial V_\text{m}}\right)_T\left(\frac{\partial V_\text{m}}{\partial p}\right)_T = \frac{a}{V_\text{m}^2}\left(\frac{\partial V_\text{m}}{\partial p}\right)_T
$$

This term is already small, because it is proportional to a. So the perfect-gas V\_m = RT/p is good enough inside it: (∂V\_m/∂p)\_T ≈ −RT/p² = −V\_m²/RT. Hence

$$
\left(\frac{\partial U_\text{m}}{\partial p}\right)_T \approx \frac{a}{V_\text{m}^2}\left(-\frac{V_\text{m}^2}{RT}\right) = -\frac{a}{RT}
$$

**Step 4. The pV term.** Here pV\_m = RT is **not** good enough: it would differentiate to zero and lose the b term. Use the van der Waals equation:

$$
pV_\text{m} = \frac{RT\,V_\text{m}}{V_\text{m} - b} - \frac{a}{V_\text{m}} = \frac{RT}{1 - b/V_\text{m}} - \frac{a}{V_\text{m}} \approx RT\left(1 + \frac{b}{V_\text{m}}\right) - \frac{a}{V_\text{m}} = RT + \frac{RTb - a}{V_\text{m}}
$$

The expansion 1/(1 − x) ≈ 1 + x holds because b ≪ V\_m at low pressure. Inside the small correction term, put 1/V\_m ≈ p/RT:

$$
pV_\text{m} \approx RT + \left(b - \frac{a}{RT}\right)p \qquad\Longrightarrow\qquad \left(\frac{\partial (pV_\text{m})}{\partial p}\right)_T \approx b - \frac{a}{RT}
$$

**Step 5. Combine.**

$$
\left(\frac{\partial H_\text{m}}{\partial p}\right)_T \approx -\frac{a}{RT} + b - \frac{a}{RT} = b - \frac{2a}{RT} \qquad\Longrightarrow\qquad \mu\,C_{p,\text{m}} \approx \frac{2a}{RT} - b
$$

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

$$
\left(\frac{\partial C_V}{\partial V}\right)_T = \left(\frac{\partial}{\partial V}\left(\frac{\partial U}{\partial T}\right)_V\right)_T = \frac{\partial^2 U}{\partial V\,\partial T}
$$

**Step 3. Swap the order** (mixed derivatives are equal, because dU is exact):

$$
\frac{\partial^2 U}{\partial V\,\partial T} = \left(\frac{\partial}{\partial T}\left(\frac{\partial U}{\partial V}\right)_T\right)_V = \left(\frac{\partial \pi_T}{\partial T}\right)_V
$$

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

