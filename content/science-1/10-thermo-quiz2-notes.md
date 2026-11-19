# Thermo notes for Quiz-2 (Atkins 11e, Topics 1A–3B)

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
