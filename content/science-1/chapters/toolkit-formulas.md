# Sheet: Thermodynamics formula sheet

This sheet lists formulas only. Explanations are in the cheat sheet and the teaching docs.
- **[A]** = Atkins only, **[S]** = slides only, **[Z]** = Zemansky (other kinds of work), **[3E]** = derived in Topic 3E: use the result, don't derive it.
- Course convention: $\Delta U = q + w$, with $w$ = work done **on** the system.
- Perfect gas assumed unless stated. $n$ = moles, $N$ = molecules, $m$ = mass of one molecule, $M$ = molar mass (kg/mol).

## Constants
| Symbol | Value |
|---|---|
| $R$ | $8.314\ \text{J K}^{-1}\text{mol}^{-1} = 0.08314\ \text{L bar K}^{-1}\text{mol}^{-1} = 0.08206\ \text{L atm K}^{-1}\text{mol}^{-1}$ |
| $k_B$ | $R/N_A = 1.381\times10^{-23}\ \text{J K}^{-1}$ |
| $N_A$ | $6.022\times10^{23}\ \text{mol}^{-1}$ |
| $F$ | $N_Ae = 96\,485\ \text{C mol}^{-1}$ |
| pressure | $1\ \text{bar} = 10^5\ \text{Pa}$; $1\ \text{atm} = 1.01325\times10^5\ \text{Pa} = 760\ \text{Torr}$ |
| energy | $1\ \text{L bar} = 100\ \text{J}$; $1\ \text{cal} = 4.184\ \text{J}$ |
| temperature | $T/\text{K} = \theta/^\circ\text{C} + 273.15$; $T_3(\text{H}_2\text{O}) = 273.16\ \text{K}$ |
| $V_m$ (perfect gas) | $24.79\ \text{L mol}^{-1}$ at 298.15 K, 1 bar; $22.41\ \text{L mol}^{-1}$ at 273.15 K, 1 atm |

---

## 1A Perfect gas
| Formula | Notes |
|---|---|
| $pV = nRT = Nk_BT$ | perfect gas equation; exact as $p\to0$ |
| $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$ | fixed $n$ |
| $pV = \text{const}$; $V\propto T$; $p\propto T$; $V\propto n$ | Boyle; Charles (constant $p$); constant $V$; Avogadro |
| $V_m = \dfrac{V}{n} = \dfrac{RT}{p}$ | molar volume |
| $\rho = \dfrac{pM}{RT}$, so $M = \dfrac{\rho RT}{p}$ | gas density; molar mass from density |
| $T = T_3\,\dfrac{p}{p_3}$ | constant-volume gas thermometer |
| $x_J = \dfrac{n_J}{n}$, $\sum_J x_J = 1$ | mole fraction **[A]** |
| $p_J = x_Jp = \dfrac{n_JRT}{V}$, $p = \sum_J p_J$ | partial pressure; Dalton's law **[A]** |
| $p = p_0\,e^{-h/H}$, $H = \dfrac{RT}{Mg}$ | barometric formula, isothermal atmosphere **[A]** |

## 1B Kinetic model
| Formula | Notes |
|---|---|
| $\Delta p_x = 2mv_x$, $\Delta t = 2L/v_x$, $F = mv_x^2/L$ | one molecule, one wall |
| $pV = \tfrac13Nm\langle v^2\rangle = \tfrac23N\langle E_k\rangle$ | kinetic theory |
| $p = \tfrac13\rho\langle v^2\rangle$ | $\rho = Nm/V$ |
| $\langle v_x^2\rangle = \langle v_y^2\rangle = \langle v_z^2\rangle = \tfrac13\langle v^2\rangle$ | isotropy |
| $\langle E_k\rangle = \tfrac12m\langle v^2\rangle = \tfrac32k_BT$ | per molecule |
| $E_{k,\text{tot}} = \tfrac32nRT = \tfrac32pV$ | per sample, the same for any gas at given $p$, $V$ |
| $v_\text{rms} = \sqrt{\langle v^2\rangle} = \sqrt{\dfrac{3RT}{M}} = \sqrt{\dfrac{3k_BT}{m}}$ | root-mean-square speed |
| $v_\text{mean} = \sqrt{\dfrac{8RT}{\pi M}}$ | mean speed $= \int_0^\infty vf(v)\,dv$ |
| $v_\text{mp} = \sqrt{\dfrac{2RT}{M}}$ | most probable speed, from $df/dv = 0$ |
| $v_\text{mp} : v_\text{mean} : v_\text{rms} = 1 : 1.128 : 1.225$ | ratios; all scale as $\sqrt{T/M}$ |
| $f(v) = 4\pi\left(\dfrac{M}{2\pi RT}\right)^{3/2}v^2e^{-Mv^2/2RT}$ | Maxwell–Boltzmann speed distribution, $\int_0^\infty f\,dv = 1$ |
| $f(v_x) = \left(\dfrac{M}{2\pi RT}\right)^{1/2}e^{-Mv_x^2/2RT}$ | one-dimensional (velocity component) distribution **[A]** |
| $\dfrac{\Delta N}{N} \approx f(v)\,\Delta v$ | fraction in a narrow speed range |
| $v_\text{rel} = \sqrt2\,v_\text{mean}$ | mean relative speed, identical molecules **[A]** |
| $v_\text{rel} = \sqrt{\dfrac{8k_BT}{\pi\mu}}$, $\mu = \dfrac{m_Am_B}{m_A + m_B}$ | mean relative speed, different molecules **[A]** |
| $\sigma = \pi d^2$, with $d = \tfrac12(d_A + d_B)$ for unlike pairs | collision cross-section **[A]** |
| $z = \sigma v_\text{rel}\,\dfrac{N}{V} = \dfrac{\sigma v_\text{rel}\,p}{k_BT}$ | collision frequency **[A]** |
| $\lambda = \dfrac{v_\text{rel}}{z} = \dfrac{k_BT}{\sigma p}$ | mean free path **[A]** |
| $v_\text{esc} = \sqrt{2gR_p} = \sqrt{\dfrac{2GM_p}{R_p}}$ | escape speed from a planet of radius $R_p$ (P1B.7) |

## 1C Real gases
| Formula | Notes |
|---|---|
| $Z = \dfrac{pV_m}{RT} = \dfrac{V_m}{V_m^\circ}$ | compression factor; $Z<1$: attractions dominate; $Z>1$: repulsions dominate |
| $pV_m = RT\left(1 + \dfrac{B}{V_m} + \dfrac{C}{V_m^2} + \cdots\right)$ | virial equation in $V_m$ **[A]** |
| $pV_m = RT(1 + B'p + C'p^2 + \cdots)$, $B' = \dfrac{B}{RT}$ | virial equation in $p$ **[A]** |
| $B(T_B) = 0$ | Boyle temperature **[A]** |
| $\left(p + \dfrac{a}{V_m^2}\right)(V_m - b) = RT$ | van der Waals equation |
| $p = \dfrac{nRT}{V - nb} - \dfrac{n^2a}{V^2}$ | vdW in terms of $n$ and $V$ |
| $B = b - \dfrac{a}{RT}$, so $T_B = \dfrac{a}{Rb}$ | vdW second virial coefficient **[A]** |
| $Z \approx 1 + \left(b - \dfrac{a}{RT}\right)\dfrac{p}{RT}$, $V_m \approx \dfrac{RT}{p} + b - \dfrac{a}{RT}$ | vdW at low pressure |
| $\left(\dfrac{\partial p}{\partial V_m}\right)_T = 0$, $\left(\dfrac{\partial^2p}{\partial V_m^2}\right)_T = 0$ | conditions at the critical point **[A]** |
| $V_c = 3b$, $T_c = \dfrac{8a}{27Rb}$, $p_c = \dfrac{a}{27b^2}$ | vdW critical constants **[A]** |
| $Z_c = \dfrac{p_cV_c}{RT_c} = \dfrac38$ | vdW critical compression factor **[A]** |
| $p_r = \dfrac{p}{p_c}$, $T_r = \dfrac{T}{T_c}$, $V_r = \dfrac{V_m}{V_c}$ | reduced variables **[A]** |
| $p_r = \dfrac{8T_r}{3V_r - 1} - \dfrac{3}{V_r^2}$ | reduced vdW equation, the same for all gases **[A]** |
| $T_c : T_B : T_I = \tfrac{8}{27} : 1 : 2$ (in units of $a/Rb$) | vdW characteristic temperatures |

---

## 2A Internal energy, work, heat
| Formula | Notes |
|---|---|
| $\Delta U = q + w$, $dU = dq + dw$ | first law, closed system |
| $\Delta U = 0$ | isolated system, or any complete cycle |
| $\oint dU = 0$, $\oint dq \ne 0$, $\oint dw \ne 0$ | state function versus path functions |
| $dw = -p_\text{ex}\,dV$ | expansion work |
| $w = -p_\text{ex}\Delta V$ | constant external pressure (irreversible) |
| $w = 0$ | free expansion ($p_\text{ex} = 0$) or constant $V$ |
| $w = -\int_{V_i}^{V_f}p\,dV$ | reversible ($p_\text{ex} = p$) |
| $w = -nRT\ln\dfrac{V_f}{V_i} = -nRT\ln\dfrac{p_i}{p_f}$ | reversible isothermal, perfect gas |
| $q = -w = nRT\ln\dfrac{V_f}{V_i}$ | same process ($\Delta U = 0$) |
| $w = -n_\text{gas}RT$ | gas produced against a constant $p_\text{ex}$ at temperature $T$ (Ex 2A.1) |
| $w = -nRT\ln\dfrac{V_f - nb}{V_i - nb} + n^2a\left(\dfrac1{V_i} - \dfrac1{V_f}\right)$ | reversible isothermal, vdW gas (P2A.6 with $b = 0$) |
| $dw = Y\,dX$ | general work: intensive "force" $Y$, extensive "displacement" $X$ |
| $dw = \mathcal F\,dL$ | wire or elastomer; Hooke's law $\mathcal F = k(L - L_0)$ gives $w = \tfrac12k(L - L_0)^2$ |
| $w = \int_0^x k_f(x)\,x\,dx$ | elastomer with $F = k_fx$; for $k_f = a - bx^{1/2}$: $w = \tfrac12ax^2 - \tfrac25bx^{5/2}$ (P2A.3) |
| $w = \dfrac{L}{2AY}\left(\mathcal F_f^2 - \mathcal F_i^2\right)$ | wire, isothermal change of tension, $Y = \dfrac LA\left(\dfrac{\partial\mathcal F}{\partial L}\right)_T$ (isothermal Young's modulus) **[Z]** |
| $dw = \gamma\,dA$ | surface work |
| $dA = 2\ell\,dx$, $\mathcal F = 2\gamma\ell$ | soap film (two faces) |
| $dw = \mathcal E\,dZ$ (Atkins: $\phi\,dQ$) | electrical work; reversible cell $w = nF\mathcal E$ |
| $dw = E\,d\Pi$ | dielectric slab |
| $dw = \mu_0\mathcal H\,d\mathcal M$ | paramagnet |
| $\mathcal M = C_C\,\mathcal H/T$, so $w = \dfrac{\mu_0T}{2C_C}\left(\mathcal M_f^2 - \mathcal M_i^2\right)$ | Curie's law; isothermal magnetisation **[Z]** |
| $w = \dfrac{\kappa_TV}{2}\left(p_f^2 - p_i^2\right)$ | solid or liquid compressed isothermally, $dV = -\kappa_TV\,dp$ **[Z]** |
| $dU = dq - p\,dV + \mathcal F\,dL + \gamma\,dA + \mathcal E\,dZ + \cdots$ | generalised first law |
| $dU = dq + dw_\text{exp} + dw_\text{add}$ | Atkins's split |
| $\tfrac12k_BT$ per quadratic term | equipartition |
| $U_m - U_m(0) = \tfrac32RT$, $\tfrac52RT$, $3RT$ | monatomic, linear, nonlinear (translation + rotation only) |
| $+RT$ per active vibrational mode | vibrations: $3N_\text{at} - 5$ modes (linear), $3N_\text{at} - 6$ (nonlinear) |
| $C_V = \left(\dfrac{\partial U}{\partial T}\right)_V$, $C_{V,m} = C_V/n$ | heat capacity at constant volume |
| $q_V = \Delta U = \int C_V\,dT = C_V\Delta T$ | constant volume, no extra work |
| $q = C\Delta T$, $C_\text{cal} = \dfrac{q}{\Delta T} = \dfrac{I\,\Delta\phi\,t}{\Delta T}$ | calorimeter constant, electrical calibration **[A]** |
| $q = It\Delta\phi$ | electrical heating (also written $IVt$) |

## 2B Enthalpy
| Formula | Notes |
|---|---|
| $H = U + pV$ | definition (state function) |
| $dH = dq$, $\Delta H = q_p$ | constant $p$, no non-expansion work |
| $\Delta H = \Delta U + \Delta(pV)$ | general |
| $\Delta H = \Delta U + \Delta n_gRT$ | reaction or process involving perfect gases **[A]** |
| $\Delta H \approx \Delta U$ | condensed phases only |
| $H = U + nRT$ | perfect gas |
| $C_p = \left(\dfrac{\partial H}{\partial T}\right)_p$, $\Delta H = \int C_p\,dT$ | heat capacity at constant pressure |
| $C_{p,m} = a + bT + \dfrac{c}{T^2}$ | temperature-dependent heat capacity **[A]** |
| $\Delta H_m = a(T_2 - T_1) + \tfrac12b(T_2^2 - T_1^2) - c\left(\dfrac1{T_2} - \dfrac1{T_1}\right)$ | integrated form (Ex 2B.2) **[A]** |
| $C_p - C_V = nR$, $C_{p,m} - C_{V,m} = R$ | perfect gas |
| $\gamma = \dfrac{C_p}{C_V}$, $\dfrac{R}{C_{V,m}} = \gamma - 1$, $C_{V,m} = \dfrac{R}{\gamma - 1}$, $C_{p,m} = \dfrac{\gamma R}{\gamma - 1}$ | heat-capacity ratio |
| monatomic $\gamma = \tfrac53$; diatomic (room $T$) $\gamma = \tfrac75$; nonlinear $\gamma = \tfrac43$ | equipartition, no vibration |

## Perfect-gas processes (2A, 2B, 2E)
| Process | Defining relation | $w$ | $q$ | $\Delta U$ | $\Delta H$ |
|---|---|---|---|---|---|
| isochoric | $p/T$ = const | 0 | $nC_{V,m}\Delta T$ | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |
| isobaric | $V/T$ = const | $-p\Delta V = -nR\Delta T$ | $nC_{p,m}\Delta T$ | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |
| isothermal (rev) | $pV$ = const | $-nRT\ln(V_f/V_i)$ | $-w$ | 0 | 0 |
| adiabatic (rev) | $pV^\gamma$ = const | $nC_{V,m}\Delta T$ | 0 | $nC_{V,m}\Delta T$ | $nC_{p,m}\Delta T$ |
| free expansion | $T$ unchanged | 0 | 0 | 0 | 0 |

## 2C Thermochemistry [A]
| Formula | Notes |
|---|---|
| standard state ° = pure substance at 1 bar, at the stated $T$ | definition |
| $\Delta_\text{sub}H° = \Delta_\text{fus}H° + \Delta_\text{vap}H°$ | same $T$ |
| $\Delta H(\text{reverse}) = -\Delta H(\text{forward})$ | reversing a process |
| $\Delta_rH°(\text{overall}) = \sum_\text{steps}\Delta_rH°$ | Hess's law |
| $\Delta_rH° = \sum_\text{products}\nu\,\Delta_fH° - \sum_\text{reactants}\nu\,\Delta_fH°$ | reaction enthalpy from formation enthalpies |
| $\Delta_fH°(\text{element in its reference state}) = 0$ | convention |
| $\Delta_rH°(T_2) = \Delta_rH°(T_1) + \int_{T_1}^{T_2}\Delta_rC_p°\,dT$ | Kirchhoff's law |
| $\Delta_rC_p° = \sum_\text{products}\nu\,C_{p,m}° - \sum_\text{reactants}\nu\,C_{p,m}°$ | change in heat capacity |
| $\Delta_rH°(T_2) = \Delta_rH°(T_1) + \Delta_rC_p°(T_2 - T_1)$ | constant $\Delta_rC_p°$ |
| $\Delta_rH°(T_2) = \Delta_rH°(T_1) + \Delta a\,\Delta T + \tfrac12\Delta b(T_2^2 - T_1^2) - \Delta c\left(\dfrac1{T_2} - \dfrac1{T_1}\right)$ | with $C_p = a + bT + c/T^2$ |
| $\Delta_rU = \Delta_rH - \Delta n_gRT$ | bomb calorimeter (constant volume) gives $\Delta_rU$ |
| $C_\text{cal} = \dfrac{n\lvert\Delta_cU\rvert}{\Delta T}$ | calibration with a standard (E2C.4) |
| $C_{p,\text{ex}} = \dfrac{P_\text{ex}}{\alpha}$, $\Delta_\text{trs}H = \int C_{p,\text{ex}}\,dT$ | DSC: excess power over scan rate $\alpha$; area under the peak (P2C.10) |

## 2D State functions and exact differentials
| Formula | Notes |
|---|---|
| $df = M\,dx + N\,dy$ is exact $\iff \left(\dfrac{\partial M}{\partial y}\right)_x = \left(\dfrac{\partial N}{\partial x}\right)_y$ | test for exactness (state function) |
| $\left(\dfrac{\partial x}{\partial y}\right)_z = 1\Big/\left(\dfrac{\partial y}{\partial x}\right)_z$ | reciprocal identity |
| $\left(\dfrac{\partial x}{\partial y}\right)_z\left(\dfrac{\partial y}{\partial z}\right)_x\left(\dfrac{\partial z}{\partial x}\right)_y = -1$ | Euler chain relation |
| $\left(\dfrac{\partial x}{\partial y}\right)_z = -\left(\dfrac{\partial x}{\partial z}\right)_y\left(\dfrac{\partial z}{\partial y}\right)_x$ | permuter (rearranged chain relation) |
| $\dfrac{\partial^2f}{\partial x\,\partial y} = \dfrac{\partial^2f}{\partial y\,\partial x}$ | mixed second derivatives are equal |
| $dU = C_V\,dT + \pi_T\,dV$ | $U(T, V)$ |
| $\pi_T = \left(\dfrac{\partial U}{\partial V}\right)_T$ | internal pressure |
| $\pi_T = T\left(\dfrac{\partial p}{\partial T}\right)_V - p$ | thermodynamic equation of state **[3E]** |
| $\pi_T = 0$ (perfect gas); $\pi_T = \dfrac{a}{V_m^2}$ (vdW) | special cases |
| $\Delta U_m = a\left(\dfrac1{V_{m,i}} - \dfrac1{V_{m,f}}\right)$ | isothermal vdW expansion (E2D.2) |
| $\Delta T = -\dfrac{a}{C_{V,m}}\left(\dfrac1{V_{m,i}} - \dfrac1{V_{m,f}}\right)$ | free (Joule) expansion of a vdW gas **[S]** |
| $\alpha = \dfrac1V\left(\dfrac{\partial V}{\partial T}\right)_p$ | expansion coefficient **[A]** |
| $\kappa_T = -\dfrac1V\left(\dfrac{\partial V}{\partial p}\right)_T$ | isothermal compressibility **[A]** |
| $\alpha = \dfrac1T$, $\kappa_T = \dfrac1p$ | perfect gas (Ex 2D.2) **[A]** |
| $\left(\dfrac{\partial U}{\partial T}\right)_p = \alpha\pi_TV + C_V$ | **[A]** |
| $\left(\dfrac{\partial p}{\partial T}\right)_V = \dfrac{\alpha}{\kappa_T}$ | from the chain relation **[A]** |
| $C_p - C_V = \dfrac{\alpha^2TV}{\kappa_T} = T\left(\dfrac{\partial p}{\partial T}\right)_V\left(\dfrac{\partial V}{\partial T}\right)_p$ | general relation; $= nR$ for a perfect gas (P2D.2) |
| $\left(\dfrac{\partial C_V}{\partial V}\right)_T = T\left(\dfrac{\partial^2p}{\partial T^2}\right)_V$ | $= 0$ for a perfect gas (I2.5) |
| $dH = C_p\,dT + \mu_T\,dp$ | $H(T, p)$ |
| $\mu_T = \left(\dfrac{\partial H}{\partial p}\right)_T = -C_p\,\mu$ | isothermal Joule–Thomson coefficient |
| $\left(\dfrac{\partial H}{\partial p}\right)_T = V - T\left(\dfrac{\partial V}{\partial T}\right)_p = V(1 - \alpha T)$ | **[3E]** |
| $H_f = H_i$ | Joule–Thomson (throttling): $q = 0$, $w = p_iV_i - p_fV_f$ |
| $\mu = \left(\dfrac{\partial T}{\partial p}\right)_H$ | $\mu > 0$: the gas cools on expansion |
| $\mu = \dfrac{T(\partial V_m/\partial T)_p - V_m}{C_{p,m}} = \dfrac{V_m(\alpha T - 1)}{C_{p,m}}$ | general; $= 0$ for a perfect gas |
| $\mu \approx \dfrac{1}{C_{p,m}}\left(\dfrac{2a}{RT} - b\right)$ | vdW at low pressure (P2D.8) |
| $T_I = \dfrac{2a}{Rb}$ | inversion temperature (vdW) |
| $\Delta T \approx \mu\,\Delta p$ | small pressure drop |
| $\mu_T \approx -\dfrac{q_m}{\Delta p}$ | heater method: heat supplied per mole at constant $T$ |
| $p_r = 24\sqrt{3T_r} - 12T_r - 27$ | vdW inversion curve in reduced units **[S]** |

## 2E Adiabatic changes
| Formula | Notes |
|---|---|
| $q = 0$, $\Delta U = w_\text{ad} = C_V(T_f - T_i)$ | any adiabatic process, perfect gas |
| $TV^{\gamma-1} = \text{const}$ | reversible adiabatic |
| $pV^\gamma = \text{const}$ | reversible adiabatic |
| $T^\gamma p^{1-\gamma} = \text{const}$, i.e. $Tp^{(1-\gamma)/\gamma} = \text{const}$ | reversible adiabatic |
| $V_iT_i^{\,c} = V_fT_f^{\,c}$, $c = \dfrac{C_{V,m}}{R}$; $T_f = T_i\left(\dfrac{V_i}{V_f}\right)^{1/c}$ | Atkins form **[A]** |
| $w_\text{ad} = \dfrac{p_fV_f - p_iV_i}{\gamma - 1}$ | reversible adiabatic |
| $\left(\dfrac{dp}{dV}\right)_\text{ad} = -\gamma\dfrac pV$, $\left(\dfrac{dp}{dV}\right)_T = -\dfrac pV$ | slopes: the adiabat is steeper |
| $nC_{V,m}(T_f - T_i) = -p_\text{ex}(V_f - V_i)$ | irreversible adiabatic, constant $p_\text{ex}$ (not $pV^\gamma$) |
| $T_f = T_i\,\dfrac{C_{V,m} + R\,p_f/p_i}{C_{p,m}}$ | same, when $p_\text{ex} = p_f$ |

---

## 3A Second law, engines, entropy
| Formula | Notes |
|---|---|
| $\Delta U_\text{cycle} = 0$, $W_\text{net} = Q_\text{net}$ = enclosed area | any cycle (magnitudes) |
| $W = Q_H - Q_C$ | engine, magnitudes |
| $\eta = \dfrac{W}{Q_H} = 1 - \dfrac{Q_C}{Q_H}$ | efficiency |
| $\text{COP}_\text{fridge} = \dfrac{Q_C}{W}$, $\text{COP}_\text{hp} = \dfrac{Q_H}{W} = 1 + \text{COP}_\text{fridge}$ | coefficients of performance **[S]** |
| $Q_H = nRT_H\ln\dfrac{V_2}{V_1}$, $Q_C = nRT_C\ln\dfrac{V_3}{V_4}$ | Carnot isotherms |
| $T_HV_2^{\gamma-1} = T_CV_3^{\gamma-1}$, $T_HV_1^{\gamma-1} = T_CV_4^{\gamma-1}$, so $\dfrac{V_2}{V_1} = \dfrac{V_3}{V_4}$ | Carnot adiabats |
| $\dfrac{Q_C}{Q_H} = \dfrac{T_C}{T_H}$ | reversible engine; also defines thermodynamic $T$ |
| $\eta_\text{Carnot} = 1 - \dfrac{T_C}{T_H} = \dfrac{T_H - T_C}{T_H}$ | maximum efficiency; $\eta \le \eta_\text{Carnot}$ for any engine |
| $\text{COP}_\text{fridge,max} = \dfrac{T_C}{T_H - T_C}$, $\text{COP}_\text{hp,max} = \dfrac{T_H}{T_H - T_C}$ | reversible fridge and heat pump |
| $w_\text{Carnot} = -nR(T_H - T_C)\ln\dfrac{V_2}{V_1}$ | net work on the gas per cycle |
| $\eta_\text{Otto} = 1 - r^{1-\gamma}$, $r = \dfrac{V_\text{max}}{V_\text{min}}$ | Otto cycle (two adiabats + two isochores) **[S]** (P3B.10) |
| $\dfrac{Q_H}{T_H} + \dfrac{Q_C}{T_C} = 0$ | Carnot cycle, signed heats |
| $\oint\dfrac{dq_\text{rev}}{T} = 0$ | any reversible cycle |
| $dS = \dfrac{dq_\text{rev}}{T}$, $\Delta S = \int_i^f\dfrac{dq_\text{rev}}{T}$ | thermodynamic definition of entropy |
| $\Delta S_\text{sur} = \dfrac{q_\text{sur}}{T_\text{sur}} = -\dfrac{q}{T_\text{sur}}$ | large reservoir, any process |
| $\oint\dfrac{dq}{T} \le 0$ | Clausius inequality; $=$ only if reversible |
| $dS \ge \dfrac{dq}{T}$ | Clausius inequality, one step |
| $\Delta S_\text{isolated} \ge 0$, $\Delta S_\text{tot} = \Delta S + \Delta S_\text{sur} \ge 0$ | principle of entropy increase |
| $\Delta S_\text{tot} = q\left(\dfrac1{T_C} - \dfrac1{T_H}\right) > 0$ | heat $q$ flowing from $T_H$ to $T_C$ (reservoirs) |
| $S = k_B\ln W$, $\Delta S = k_B\ln\dfrac{W_f}{W_i}$ | Boltzmann (statistical) entropy |
| $W = \dfrac{N!}{n!(N - n)!}$, $\sum_n W = 2^N$ | ways to put $n$ of $N$ particles in one half |
| $P(\text{all } N \text{ in one half}) = 2^{-N}$; width $\sim 1/\sqrt N$ | statistics of the two-box model **[S]** |
| $W = W_1W_2$, so $S = S_1 + S_2$ | why entropy is additive |
| $\ln N! \approx N\ln N - N$ | Stirling's approximation (large $N$) |
| $\Delta S = Nk_B\ln2 = nR\ln2$ | doubling the volume, either definition |

## 3B Entropy changes
| Formula | Notes |
|---|---|
| $\Delta S = nR\ln\dfrac{V_f}{V_i} = nR\ln\dfrac{p_i}{p_f}$ | isothermal, perfect gas (any route) |
| $\Delta S_\text{sur} = -nR\ln\dfrac{V_f}{V_i}$ (reversible); $0$ (free expansion) | surroundings |
| $\Delta_\text{trs}S = \dfrac{\Delta_\text{trs}H}{T_\text{trs}}$ | phase change at the transition temperature |
| $\Delta_\text{vap}S° \approx 85\ \text{J K}^{-1}\text{mol}^{-1}$, so $\Delta_\text{vap}H \approx 85\,T_b$ | Trouton's rule |
| $\Delta S = \int_{T_i}^{T_f}\dfrac{C\,dT}{T} = C\ln\dfrac{T_f}{T_i}$ | heating, constant $C$ ($C_p$ at constant $p$, $C_V$ at constant $V$) |
| $\Delta S = a\ln\dfrac{T_f}{T_i} + b(T_f - T_i) - \dfrac c2\left(\dfrac1{T_f^2} - \dfrac1{T_i^2}\right)$ | heating with $C_p = a + bT + c/T^2$ |
| $\Delta S = nC_{V,m}\ln\dfrac{T_f}{T_i} + nR\ln\dfrac{V_f}{V_i}$ | perfect gas, any change of $T$ and $V$ (Ex 3B.1) |
| $\Delta S = nC_{p,m}\ln\dfrac{T_f}{T_i} - nR\ln\dfrac{p_f}{p_i}$ | perfect gas, any change of $T$ and $p$ |
| $\Delta S = 0$, giving $TV^{\gamma-1}$ = const | reversible adiabatic (isentropic) |
| $T_f = \dfrac{C_1T_1 + C_2T_2}{C_1 + C_2}$ | two bodies brought into contact (constant $C$) |
| $\Delta S = C_1\ln\dfrac{T_f}{T_1} + C_2\ln\dfrac{T_f}{T_2} \ge 0$ | entropy change for the same |
| $\Delta S = mc\ln\dfrac{T_f^2}{T_1T_2}$ | equal masses of the same substance mixed |
| $\Delta S(T) = C_p^{(1)}\ln\dfrac{T_\text{trs}}{T} + \dfrac{\Delta_\text{trs}H(T_\text{trs})}{T_\text{trs}} + C_p^{(2)}\ln\dfrac{T}{T_\text{trs}}$ | transition at $T \ne T_\text{trs}$, via a three-step cycle (P3B.2) |
| $\Delta_\text{trs}H(T) = \Delta_\text{trs}H(T_\text{trs}) + \Delta C_p(T - T_\text{trs})$, $\Delta S_\text{sur} = -\dfrac{\Delta_\text{trs}H(T)}{T}$ | surroundings for the same |

---

## Key numbers (checked)
| Quantity | Value |
|---|---|
| N₂ at 300 K | $v_\text{mp}$, $v_\text{mean}$, $v_\text{rms}$, $v_\text{rel}$ = 422, 476, 517, 674 m/s |
| other $v_\text{rms}$ | He at 300 K: 1.37 km/s; H₂ at 293 K: 1.90 km/s; O₂ at 293 K: 0.48 km/s |
| N₂, 1 atm, 300 K, $\sigma = 0.40$ nm² | $z = 6.6\times10^9\ \text{s}^{-1}$, $\lambda \approx 100$ nm |
| vdW $a$ (L² bar mol⁻²), $b$ (L mol⁻¹) | He 0.0346, 0.0238; N₂ 1.370, 0.0387; CO₂ 3.640, 0.0427 |
| N₂ (vdW) | $T_c \approx 126$ K, $T_B \approx 426$ K, $T_I \approx 852$ K (real $T_I$ = 621 K) |
| $\mu$ / K atm⁻¹ at 298 K | CO₂ +1.1, N₂ +0.27, H₂ −0.03, He −0.06 |
| $\gamma$ | He 1.67, N₂ 1.40 |
| water | $\Delta_\text{fus}H$ = 6.01 kJ/mol (22.0 J/K/mol); $\Delta_\text{vap}H$ = 40.7 kJ/mol (109 J/K/mol); $c$ = 4.18 J/g/K |
| $\Delta_fH°$ | H₂O(g) at 298 K: −241.82 kJ/mol; at 373 K: −242.57 kJ/mol (Kirchhoff) |
| Otto | $r = 8$: 0.565; $r = 10$: 0.602 ($\gamma$ = 1.4) |
| fire syringe | $V/10$, $\gamma$ = 1.4, from 300 K: 754 K, 25 bar |
