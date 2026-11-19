# Quiz-2 answer key (do not open until you've attempted `quiz2-practice-questions.md`)

## Check-your-understanding from the notes (Q-C1)
Free expansion has Q = 0, but entropy is defined along a **reversible** path with the same end states. Take the reversible isothermal route: ΔS_gas = nR ln(V_f/V_i) > 0. The surroundings do not change (ΔS_surr = 0), so ΔS_univ = +nR ln(V_f/V_i) > 0. The Q = 0 of the actual path is irrelevant because S is a state function.

## Part A
- **A1.** If A and C are in thermal equilibrium and B and C are too, then A and B are in thermal equilibrium.
- **A2.** PV = ⅓Nm⟨v²⟩ = ⅔N⟨E_k⟩; ⟨E_k⟩ = ½m⟨v²⟩ = (3/2)k_BT.
- **A3.** (P + a/V_m²)(V_m − b) = RT. b: excluded volume per mole (repulsion). a: strength of attraction.
- **A4.** C_P,m − C_V,m = R; γ = 7/5 (C_V = 5R/2, C_P = 7R/2).
- **A5.** Kelvin-Planck: no cyclic device converts heat from a single reservoir entirely into work. Clausius: no cyclic device transfers heat from cold to hot with no other effect.
- **A6.** ∮dQ/T ≤ 0 (equality for reversible). dS = dQ_rev/T.
- **A7.** S = k_B ln W.
- **A8.** TV^{γ−1} = const; PV^γ = const.

## Part B
- **B1.** Both are at the same T. Metal conducts heat from the skin faster. Zeroth law: both are in equilibrium with the surroundings (and a thermometer), hence the same temperature; feel measures heat flow.
- **B2.** Same ⟨E_k⟩ = (3/2)k_BT. v_rms ∝ 1/√M, so H₂ is √16 = 4× faster.
- **B3.** U of an ideal gas depends only on T, so ΔU = ∫C_V dT regardless of path. At constant P, Q = nC_PΔT is larger because the extra goes to work.
- **B4.** For an adiabat PV^γ = const with γ > 1. In expansion Q = 0, so the gas does work at the expense of its internal energy and cools, so P falls faster than for an isotherm (dP/dV = −γP/V against −P/V).
- **B5.** Q = 0, W = 0, ΔU = 0. ΔS_gas = nR ln(V_f/V_i) > 0, ΔS_surr = 0, ΔS_univ = nR ln(V_f/V_i). ΔS_gas ≠ Q/T because the process is irreversible; ΔS = Q_rev/T only for a reversible path.
- **B6.** He: T_I ≈ 40 K, room T is above it, repulsions dominate, μ < 0 (slight warming). CO₂: large a, μ ≈ +1.1 K/atm, cools.
- **B7.** Kelvin-Planck: Q_C > 0 always, and η ≤ 1 − T_C/T_H even for a reversible engine. A frictionless engine still must reject heat.
- **B8.** ΔS_water < 0 (ordering), ΔS_univ > 0 (released heat and compressor work raise S_surr by more).
- **B9.** π_T = T(∂p/∂T)_V − p. For vdW, T(∂p/∂T)_V = RT/(V_m − b), so π_T = RT/(V_m − b) − p = a/V_m², which is positive because it comes from the attraction term only.
- **B10.** Carnot's theorem: if two reversible engines had different efficiencies, running the better one as an engine and the other as a fridge would move heat cold to hot with no work, violating Clausius.

## Part C (key steps; marks are for the steps)
- **C1.** One molecule: Δp = 2mv_x, Δt = 2L/v_x, F = mv_x²/L. Sum over N: P = (m/L³)Σv_x² = Nm⟨v_x²⟩/V. Isotropy: ⟨v_x²⟩ = ⟨v²⟩/3. PV = ⅓Nm⟨v²⟩ = Nk_BT, hence ½m⟨v²⟩ = (3/2)k_BT.
- **C2.** d/dv[v²e^{−Mv²/2RT}] = (2v − Mv³/RT)e^{...} = 0, so v² = 2RT/M.
- **C3.** Q = 0, dU = −P dV, nC_V dT = −(nRT/V)dV, so dT/T = −(R/C_V)dV/V = −(γ−1)dV/V; integrate: TV^{γ−1} = const; with T = PV/nR, PV^γ = const.
- **C4.** Isotherms: Q_H = nRT_H ln(V₂/V₁), Q_C = nRT_C ln(V₃/V₄). Adiabats: T_HV₂^{γ−1} = T_CV₃^{γ−1}, T_HV₁^{γ−1} = T_CV₄^{γ−1}, so V₂/V₁ = V₃/V₄. Hence Q_C/Q_H = T_C/T_H, η = 1 − T_C/T_H.
- **C5.** Perfect fridge R* moves Q_C cold → hot with no work. Engine takes Q_H, rejects Q_C, does W = Q_H − Q_C. Combined: cold reservoir unchanged, hot loses Q_H − Q_C, all converted to W. Violates Kelvin-Planck.
- **C6.** Q = 0. Work done on the gas: W = p_iV_i − p_fV_f. First law: U_f − U_i = p_iV_i − p_fV_f, so U_f + p_fV_f = U_i + p_iV_i, so H_f = H_i.
- **C7.** Each molecule has twice as many positions, W_f/W_i = 2^N. ΔS = k_B ln 2^N = Nk_B ln 2 = nR ln 2, which matches the Clausius result.

## Part D
- **D1.** Q = nC_PΔT = 2(5/2)(8.314)(100) = +4157 J ≈ 4.16 kJ. ΔU = 2(3/2)(8.314)(100) = 2494 J. W = −nRΔT = −1663 J. ΔH = Q = 4157 J. Check: Q + W = 4157 − 1663 = 2494 = ΔU ✓.
- **D2.** W = −nRT ln(V₂/V₁) = −8.314·300·ln(1/4) = +3458 J (on gas). Q = −3458 J. ΔS_gas = R ln(1/4) = −11.5 J/K. ΔS_surr = +11.5. ΔS_univ = 0.
- **D3.** γ = 5/3. T₂ = 300·8^{2/3} = 300·4 = **1200 K**. P₂ = 1·8^{5/3} = 32 bar. W = ΔU = (3/2)R(900) = 11.2 kJ.
- **D4.** v_rms = √(3·8.314·400/0.032) ≈ **558 m/s**. H₂ is 4× faster (√(32/2)).
- **D5.** RT = 24.78 L bar/mol, V_m = 0.500 L/mol. P_ideal = 49.6 bar. P_vdW = 24.78/0.4613 − 1.370/0.25 = 53.7 − 5.5 = 48.2 bar. Z = 48.2/49.6 = 0.973 (< 1, attraction slightly wins).
- **D6.** T_I = 2·1.370/(0.08314·0.0387) ≈ 850 K (measured: 621 K).
- **D7.** η = 1 − 300/600 = 0.5. W = 600 J. Q_C = 600 J. ΔS_univ = 0 (reversible): −1200/600 + 600/300 = 0.
- **D8.** COP_max = T_C/(T_H − T_C) = 270/30 = **9**.
- **D9.** First law OK (800 = 400 + 400). η = 0.5, Carnot η = 1 − 300/500 = 0.4. 0.5 > 0.4 so **impossible** (violates the second law).
- **D10.** ΔS = mc ln(T_f/T_i) = 2(4180)(0.0974) ≈ **+814 J/K**.
- **D11.** T_f = 50 °C = 323.15 K. ΔS = 4180[ln(323.15/363.15) + ln(323.15/283.15)] = 4180 ln(323.15²/(363.15·283.15)) = 4180·ln(1.0156) ≈ 4180·0.0155 ≈ **+65 J/K** > 0.
- **D12.** ΔS_univ = 600(1/300 − 1/600) = **+1.0 J/K**.
- **D13.** ΔS_sys = 2(40700)/373.15 = +218 J/K; ΔS_surr = −218 J/K; ΔS_univ = 0.
- **D14.** W = 6!/(3!3!) = 20. S = k_B ln 20 ≈ 3.0 k_B. P(3-3) = 20/64 = 0.31; P(6-0) = 1/64 = 0.016.
- **D15.** η = 1 − 10^{−0.4} = 1 − 1/2.51 ≈ **0.60**.
- **D16.** P = 6.69·373.15/273.16 = 9.14 kPa. T = 273.16·(8.00/6.69) = 326.6 K = 53.5 °C.
- **D17.** V_m = 0.200 L/mol, RT = 24.78. P_ideal = 124 bar. P_vdW = 24.78/(0.2 − 0.0238) − 0.0346/0.04 = 140.6 − 0.9 = 140 bar. b (repulsion) dominates; Z ≈ 1.13.

## If you got these wrong
| Wrong in | Revisit |
|---|---|
| A1-A2, B1-B2, C1-C2, D4, D16 | notes §1-2 |
| A3, B9, D5, D17 | notes §3 |
| B3-B4, C3, D1-D3 | notes §4-6 |
| B5-B6, C6, D6 | notes §7 |
| A5, B7, B10, C4-C5, D7-D9, D15 | notes §8 |
| A6-A7, B5, B8, C7, D2, D10-D14 | notes §9 |
