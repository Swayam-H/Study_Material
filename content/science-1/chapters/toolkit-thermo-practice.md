# Practice: Thermodynamics, 42 mixed questions

Recall, understanding, derivations and numericals for Atkins 1A to 3B. Do them on paper without a calculator, then open the solution.

## Part A: recall

### Problem 1 [Thermodynamics · Recall · set A1]

State the zeroth law.

*Solution.* If A and C are in thermal equilibrium and B and C are too, then A and B are in thermal equilibrium.

### Problem 2 [Thermodynamics · Recall · set A2]

Write PV in terms of ⟨v²⟩ from kinetic theory, then give ⟨E_k⟩ in terms of T.

*Solution.* PV = ⅓Nm⟨v²⟩ = ⅔N⟨E_k⟩; ⟨E_k⟩ = ½m⟨v²⟩ = (3/2)k_BT.

### Problem 3 [Thermodynamics · Recall · set A3]

Write the vdW equation and say what a and b represent.

*Solution.* (P + a/V_m²)(V_m − b) = RT. b: excluded volume per mole (repulsion). a: strength of attraction.

### Problem 4 [Thermodynamics · Recall · set A4]

Give C_P,m − C_V,m and γ for a diatomic ideal gas at room temperature.

*Solution.* C_P,m − C_V,m = R; γ = 7/5 (C_V = 5R/2, C_P = 7R/2).

### Problem 5 [Thermodynamics · Recall · set A5]

State the Kelvin-Planck and Clausius statements.

*Solution.* Kelvin-Planck: no cyclic device converts heat from a single reservoir entirely into work. Clausius: no cyclic device transfers heat from cold to hot with no other effect.

### Problem 6 [Thermodynamics · Recall · set A6]

State the Clausius inequality and the definition of entropy.

*Solution.* ∮dQ/T ≤ 0 (equality for reversible). dS = dQ_rev/T.

### Problem 7 [Thermodynamics · Recall · set A7]

Give S in terms of microstates.

*Solution.* S = k_B ln W.

### Problem 8 [Thermodynamics · Recall · set A8]

Write the relation between T and V (and P and V) for a reversible adiabatic process.

*Solution.* TV^{γ−1} = const; PV^γ = const.

## Part B: understanding

### Problem 9 [Thermodynamics · Concept · set B1]

A metal bench feels colder than a wooden one. Which is colder, and what does the zeroth law say?

*Solution.* Both are at the same T. Metal conducts heat from the skin faster. Zeroth law: both are in equilibrium with the surroundings (and a thermometer), hence the same temperature; feel measures heat flow.

### Problem 10 [Thermodynamics · Concept · set B2]

H₂ and O₂ share a box at 300 K. Compare ⟨E_k⟩ and v_rms.

*Solution.* Same ⟨E_k⟩ = (3/2)k_BT. v_rms ∝ 1/√M, so H₂ is √16 = 4× faster.

### Problem 11 [Thermodynamics · Concept · set B3]

For an ideal gas, why is ΔU = nC_VΔT also valid at constant pressure?

*Solution.* U of an ideal gas depends only on T, so ΔU = ∫C_V dT regardless of path. At constant P, Q = nC_PΔT is larger because the extra goes to work.

### Problem 12 [Thermodynamics · Concept · set B4]

Explain why an adiabat is steeper than an isotherm on a P-V diagram.

*Solution.* For an adiabat PV^γ = const with γ > 1. In expansion Q = 0, so the gas does work at the expense of its internal energy and cools, so P falls faster than for an isotherm (dP/dV = −γP/V against −P/V).

### Problem 13 [Thermodynamics · Concept · set B5]

A gas expands freely into vacuum in an insulated box. Give Q, W, ΔU and ΔS_gas, ΔS_surr, ΔS_univ. Why does ΔS_gas ≠ Q/T here?

*Solution.* Q = 0, W = 0, ΔU = 0. ΔS_gas = nR ln(V_f/V_i) > 0, ΔS_surr = 0, ΔS_univ = nR ln(V_f/V_i). ΔS_gas ≠ Q/T because the process is irreversible; ΔS = Q_rev/T only for a reversible path.

### Problem 14 [Thermodynamics · Concept · set B6]

Explain the sign of μ_JT for He versus CO₂ at room temperature.

*Solution.* He: T_I ≈ 40 K, room T is above it, repulsions dominate, μ < 0 (slight warming). CO₂: large a, μ ≈ +1.1 K/atm, cools.

### Problem 15 [Thermodynamics · Concept · set B7]

Why can heat engines never be 100% efficient even without friction?

*Solution.* Kelvin-Planck: Q_C > 0 always, and η ≤ 1 − T_C/T_H even for a reversible engine. A frictionless engine still must reject heat.

### Problem 16 [Thermodynamics · Concept · set B8]

Water freezes in a freezer. Signs of ΔS_water and ΔS_univ?

*Solution.* ΔS_water < 0 (ordering), ΔS_univ > 0 (released heat and compressor work raise S_surr by more).

### Problem 17 [Thermodynamics · Concept · set B9]

For a vdW gas, why is π_T = a/V_m² > 0?

*Solution.* π_T = T(∂p/∂T)_V − p. For vdW, T(∂p/∂T)_V = RT/(V_m − b), so π_T = RT/(V_m − b) − p = a/V_m², which is positive because it comes from the attraction term only.

### Problem 18 [Thermodynamics · Concept · set B10]

Why is the Carnot efficiency independent of the working substance?

*Solution.* Carnot's theorem: if two reversible engines had different efficiencies, running the better one as an engine and the other as a fridge would move heat cold to hot with no work, violating Clausius.

## Part C: derivations

### Problem 19 [Thermodynamics · Derivation · set C1] (hard)

Derive P = (N m⟨v_x²⟩)/V for a cubic box and hence ⟨E_k⟩ = 3k_BT/2.

*Solution.* One molecule: Δp = 2mv_x, Δt = 2L/v_x, F = mv_x²/L. Sum over N: P = (m/L³)Σv_x² = Nm⟨v_x²⟩/V. Isotropy: ⟨v_x²⟩ = ⟨v²⟩/3. PV = ⅓Nm⟨v²⟩ = Nk_BT, hence ½m⟨v²⟩ = (3/2)k_BT.

### Problem 20 [Thermodynamics · Derivation · set C2] (hard)

Derive v_mp = √(2RT/M) from the Maxwell-Boltzmann distribution.

*Solution.* d/dv[v²e^{−Mv²/2RT}] = (2v − Mv³/RT)e^{...} = 0, so v² = 2RT/M.

### Problem 21 [Thermodynamics · Derivation · set C3] (hard)

Starting from nC_V dT = −P dV, derive PV^γ = const.

*Solution.* Q = 0, dU = −P dV, nC_V dT = −(nRT/V)dV, so dT/T = −(R/C_V)dV/V = −(γ−1)dV/V; integrate: TV^{γ−1} = const; with T = PV/nR, PV^γ = const.

### Problem 22 [Thermodynamics · Derivation · set C4] (hard)

Derive η_Carnot = 1 − T_C/T_H for an ideal gas.

*Solution.* Isotherms: Q_H = nRT_H ln(V₂/V₁), Q_C = nRT_C ln(V₃/V₄). Adiabats: T_HV₂^{γ−1} = T_CV₃^{γ−1}, T_HV₁^{γ−1} = T_CV₄^{γ−1}, so V₂/V₁ = V₃/V₄. Hence Q_C/Q_H = T_C/T_H, η = 1 − T_C/T_H.

### Problem 23 [Thermodynamics · Derivation · set C5] (hard)

Show that a 100%-efficient engine violating Kelvin-Planck can be built from a Clausius-violating "perfect fridge" plus an ordinary engine.

*Solution.* Perfect fridge R* moves Q_C cold → hot with no work. Engine takes Q_H, rejects Q_C, does W = Q_H − Q_C. Combined: cold reservoir unchanged, hot loses Q_H − Q_C, all converted to W. Violates Kelvin-Planck.

### Problem 24 [Thermodynamics · Derivation · set C6] (hard)

Show that Joule-Thomson expansion is isenthalpic.

*Solution.* Q = 0. Work done on the gas: W = p_iV_i − p_fV_f. First law: U_f − U_i = p_iV_i − p_fV_f, so U_f + p_fV_f = U_i + p_iV_i, so H_f = H_i.

### Problem 25 [Thermodynamics · Derivation · set C7] (hard)

Show that S = k_B ln W gives ΔS = nR ln 2 for the free expansion that doubles the volume.

*Solution.* Each molecule has twice as many positions, W_f/W_i = 2^N. ΔS = k_B ln 2^N = Nk_B ln 2 = nR ln 2, which matches the Clausius result.

## Part D: numerical problems

### Problem 26 [Thermodynamics · Numerical · set D1]

2.00 mol of an ideal monatomic gas is heated from 300 K to 400 K at constant pressure. Find Q, W, ΔU, ΔH.

*Solution.* Q = nC_PΔT = 2(5/2)(8.314)(100) = +4157 J ≈ 4.16 kJ. ΔU = 2(3/2)(8.314)(100) = 2494 J. W = −nRΔT = −1663 J. ΔH = Q = 4157 J. Check: Q + W = 4157 − 1663 = 2494 = ΔU ✓.

### Problem 27 [Thermodynamics · Numerical · set D2]

1.00 mol of an ideal gas is compressed reversibly and isothermally at 300 K from 20 L to 5 L. Find W, Q, ΔS_gas, ΔS_surr, ΔS_univ. (Use ln 4 = 1.386.)

*Solution.* W = −nRT ln(V₂/V₁) = −8.314·300·ln(1/4) = +3458 J (on gas). Q = −3458 J. ΔS_gas = R ln(1/4) = −11.5 J/K. ΔS_surr = +11.5. ΔS_univ = 0.

### Problem 28 [Thermodynamics · Numerical · set D3]

1.00 mol of ideal monatomic gas at 300 K and 1 bar is compressed reversibly and adiabatically to 1/8 of its volume. Find T₂, P₂, and W.

*Solution.* γ = 5/3. T₂ = 300·8^{2/3} = 300·4 = **1200 K**. P₂ = 1·8^{5/3} = 32 bar. W = ΔU = (3/2)R(900) = 11.2 kJ.

### Problem 29 [Thermodynamics · Numerical · set D4]

Find v_rms of O₂ at 400 K (M = 32 g/mol). By what factor does v_rms of H₂ exceed that of O₂ at the same T?

*Solution.* v_rms = √(3·8.314·400/0.032) ≈ **558 m/s**. H₂ is 4× faster (√(32/2)).

### Problem 30 [Thermodynamics · Numerical · set D5]

1.00 mol of N₂ (a = 1.370, b = 0.0387 in L, bar, mol) is held in 0.500 L at 298 K. Compute P_ideal, P_vdW and Z.

*Solution.* RT = 24.78 L bar/mol, V_m = 0.500 L/mol. P_ideal = 49.6 bar. P_vdW = 24.78/0.4613 − 1.370/0.25 = 53.7 − 5.5 = 48.2 bar. Z = 48.2/49.6 = 0.973 (< 1, attraction slightly wins).

### Problem 31 [Thermodynamics · Numerical · set D6]

Use T_I = 2a/(Rb) to estimate the inversion temperature of N₂.

*Solution.* T_I = 2·1.370/(0.08314·0.0387) ≈ 850 K (measured: 621 K).

### Problem 32 [Thermodynamics · Numerical · set D7]

A Carnot engine runs between 600 K and 300 K and absorbs 1200 J per cycle. Find η, W, Q_C and ΔS_univ per cycle.

*Solution.* η = 1 − 300/600 = 0.5. W = 600 J. Q_C = 600 J. ΔS_univ = 0 (reversible): −1200/600 + 600/300 = 0.

### Problem 33 [Thermodynamics · Numerical · set D8]

Find the maximum COP of a refrigerator working between 270 K (inside) and 300 K (room).

*Solution.* COP_max = T_C/(T_H − T_C) = 270/30 = **9**.

### Problem 34 [Thermodynamics · Numerical · set D9]

An inventor claims an engine that takes 800 J at 500 K, rejects 400 J at 300 K, and does 400 J of work. Is it possible?

*Solution.* First law OK (800 = 400 + 400). η = 0.5, Carnot η = 1 − 300/500 = 0.4. 0.5 > 0.4 so **impossible** (violates the second law).

### Problem 35 [Thermodynamics · Numerical · set D10]

Compute ΔS for 2.00 kg of water heated from 20 °C to 50 °C (c = 4180 J/kg/K; ln(323.15/293.15) = 0.0974).

*Solution.* ΔS = mc ln(T_f/T_i) = 2(4180)(0.0974) ≈ **+814 J/K**.

### Problem 36 [Thermodynamics · Numerical · set D11]

Mix 1.00 kg of water at 90 °C with 1.00 kg at 10 °C in an insulated vessel. Find the final T and ΔS_univ (use ln 1.0156 ≈ 0.0155 for the argument you get).

*Solution.* T_f = 50 °C = 323.15 K. ΔS = 4180[ln(323.15/363.15) + ln(323.15/283.15)] = 4180 ln(323.15²/(363.15·283.15)) = 4180·ln(1.0156) ≈ 4180·0.0155 ≈ **+65 J/K** > 0.

### Problem 37 [Thermodynamics · Numerical · set D12]

600 J of heat flows from a body at 600 K to one at 300 K (both large). Compute ΔS_univ.

*Solution.* ΔS_univ = 600(1/300 − 1/600) = **+1.0 J/K**.

### Problem 38 [Thermodynamics · Numerical · set D13]

Boiling 2.00 mol of water at 373.15 K (ΔH_vap = 40.7 kJ/mol): find ΔS_sys and ΔS_surr (reversible).

*Solution.* ΔS_sys = 2(40700)/373.15 = +218 J/K; ΔS_surr = −218 J/K; ΔS_univ = 0.

### Problem 39 [Thermodynamics · Numerical · set D14]

For 6 labelled particles in a two-halved box, how many microstates have 3 on the left? Give S in terms of k_B, and the probability of 3-3 versus 6-0.

*Solution.* W = 6!/(3!3!) = 20. S = k_B ln 20 ≈ 3.0 k_B. P(3-3) = 20/64 = 0.31; P(6-0) = 1/64 = 0.016.

### Problem 40 [Thermodynamics · Numerical · set D15]

An Otto engine has compression ratio r = 10 and γ = 1.4. Find η (10^0.4 ≈ 2.51).

*Solution.* η = 1 − 10^{−0.4} = 1 − 1/2.51 ≈ **0.60**.

### Problem 41 [Thermodynamics · Numerical · set D16]

A constant-volume gas thermometer reads 6.69 kPa at the triple point of water. What does it read at 100 °C, and what temperature corresponds to 8.00 kPa? (Tutorial P1.)

*Solution.* P = 6.69·373.15/273.16 = 9.14 kPa. T = 273.16·(8.00/6.69) = 326.6 K = 53.5 °C.

### Problem 42 [Thermodynamics · Numerical · set D17]

5.00 mol of He in a 1.00 L cylinder at 298 K. Compute P_ideal and P_vdW (a = 0.0346, b = 0.0238), and state which term dominates. (Tutorial P4.)

*Solution.* V_m = 0.200 L/mol, RT = 24.78. P_ideal = 124 bar. P_vdW = 24.78/(0.2 − 0.0238) − 0.0346/0.04 = 140.6 − 0.9 = 140 bar. b (repulsion) dominates; Z ≈ 1.13.

