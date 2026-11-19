# Cards: Thermodynamics flashcards

Source column: L1-L4 = lecture slides, Atkins = 11e topic code. Anki block at the bottom (tab-separated: front, back, source).

| # | Question | Answer | Source |
|---|---|---|---|
| 1 | State the zeroth law and why it matters. | If A~C and B~C are in thermal equilibrium then A~B. It makes temperature well defined and thermometers possible. | L1; Atkins 1A |
| 2 | Open, closed, isolated system? | Open: matter and energy cross. Closed: energy only. Isolated: neither. | L1 |
| 3 | Name intensive vs extensive examples. | Intensive: P, T, density. Extensive: V, n, U, S. | L1 |
| 4 | Constant-volume gas thermometer: T from P? | T = T3 (P/P3), T3 = 273.16 K; all gases extrapolate to P=0 at -273.15 C. | L1; tutorial P1 |
| 5 | Kinetic result for PV? | PV = (1/3) N m <v^2> = (2/3) N <Ek>. | L1 |
| 6 | Average translational KE per molecule? | (3/2) k_B T. Depends only on T, not mass. | L1 |
| 7 | v_rms, v_mp, mean speed formulas? | sqrt(3RT/M), sqrt(2RT/M), sqrt(8RT/(pi M)); v_mp < mean < v_rms. | L1 |
| 8 | v_rms of N2 at 300 K? | About 517 m/s (M = 0.028 kg/mol). | L1 |
| 9 | Maxwell-Boltzmann form and meaning of the factors? | f(v)=4pi(M/2piRT)^(3/2) v^2 exp(-Mv^2/2RT). v^2: more ways at high speed; exponential: high energy is rare. | L1; tutorial P3 |
| 10 | Effect of raising T on the MB curve? | Peak moves right, curve flattens and broadens. | L1 |
| 11 | How to find v_mp? | Set d/dv(v^2 exp(-Mv^2/2RT)) = 0, giving v^2 = 2RT/M. | tutorial P3a |
| 12 | Why does Earth lose He although v_rms (300 K) is only 1.4 km/s? | High-speed tail of the MB distribution: a small fraction exceeds 11.2 km/s, and collisions refill the tail. | tutorial P2e |
| 13 | Define compression factor Z. | Z = P V_m / (R T); Z=1 ideal; Z<1 attraction dominates; Z>1 repulsion dominates. | L1; Atkins 1C |
| 14 | van der Waals equation and meaning of a and b? | (P + a/Vm^2)(Vm - b) = RT. b: excluded volume (repulsion). a: attraction. | L1; Atkins 1C |
| 15 | Why a/Vm^2 term? | Attraction needs pairs of molecules, so it scales as (n/V)^2. | tutorial slides |
| 16 | vdW critical constants (Atkins)? | Tc = 8a/(27Rb), Vc = 3b, pc = a/(27 b^2). | Atkins 1C [beyond slides] |
| 17 | When does the ideal gas law fail? | High pressure (finite size) and low temperature (attraction). | L1 |
| 18 | Sign convention for W in the course? | W = work done ON the system, dU = Q + W, W = -integral P dV. | L2; Atkins 2A |
| 19 | Work in reversible isothermal ideal-gas expansion? | W = -nRT ln(V2/V1); DU=0; Q=-W. | L2 |
| 20 | What is a quasi-static process? | A sequence of equilibrium states, slow enough that P, V, T are defined throughout. | L2 |
| 21 | State vs path function examples. | State: U, H, S, T, P, V. Path: Q, W. | L1-2 |
| 22 | Exact vs inexact differential? | dU exact: closed integral = 0. dQ, dW inexact: depend on path. | L2; Atkins 2D.1 |
| 23 | What is heat? | Energy transferred because of a temperature difference; energy in transit, not contained in a body. | L2 |
| 24 | Free expansion of an ideal gas: Q, W, DU, DT? | All zero (Q=0 insulated, W=0 vacuum, DU=0 so DT=0). | L2 concept check |
| 25 | Define C_V and C_P. | C_V=(dU/dT)_V ; C_P=(dH/dT)_P. | L2; Atkins 2A.4 |
| 26 | C_P,m - C_V,m for ideal gas? | R. gamma = C_P/C_V. | L2 |
| 27 | Equipartition and U_m for monatomic/diatomic? | Each quadratic term gives kT/2. Monatomic 3RT/2 (gamma 5/3). Diatomic 5RT/2 (gamma 7/5), vibration frozen. | L2 |
| 28 | Define enthalpy; when is DH = Q? | H = U + PV; DH = Q_P at constant P with no non-expansion work. | L2; Atkins 2B |
| 29 | DU for ANY ideal-gas process? | DU = n C_V DT, since U depends only on T. | L2 |
| 30 | Reversible adiabatic relations? | T V^(gamma-1) = const; P V^gamma = const. | L2; Atkins 2E |
| 31 | Why is the adiabat steeper than the isotherm? | gamma>1: no heat in, so the expanding gas cools and P falls faster. | L2 |
| 32 | Fire syringe numbers? | V/10 with gamma 1.4: T2 = 300*10^0.4 = 754 K, P2 = 25 bar. | L2 |
| 33 | Work formula for a stretched wire; sign? | dW = F dL (plus sign, tension pulls inward). | L2 |
| 34 | Surface work for a soap film? | dW = gamma dA, with two surfaces so dA = 2 l dx. | L2 |
| 35 | Electrical work for a cell? | dW = E dZ; reversible W = nFE. | L2 |
| 36 | Define internal pressure. | pi_T = (dU/dV)_T = T(dp/dT)_V - p. Perfect gas 0; vdW a/Vm^2. | L2 extras; Atkins 2D.2 |
| 37 | Molecular meaning of pi_T sign? | Positive when attractions dominate (expansion raises potential energy). | L2 extras |
| 38 | Why did Joule see no temperature change? | The water bath had a huge heat capacity; the real effect (about -0.13 K for N2) was unmeasurable. | L2 extras |
| 39 | What is conserved in Joule-Thomson expansion? | Enthalpy: H_f = H_i (Q=0, W = p_iV_i - p_fV_f). | L2 extras; Atkins 2D.4 |
| 40 | Define mu_JT and sign meaning. | mu = (dT/dp)_H; positive: cools; negative: warms. | L2 extras |
| 41 | vdW inversion temperature? | T_I = 2a/(Rb); mu ~ (1/Cp)(2a/RT - b). | L2 extras |
| 42 | Why does He warm when throttled at room T? | Room T is above its inversion temperature (~40 K); repulsions dominate. | L2 concept check |
| 43 | Why does a CO2 extinguisher frost? | Large a, mu about +1.1 K/atm: strong JT cooling. | L2 concept check |
| 44 | Isothermal JT coefficient? | mu_T = (dH/dp)_T = -C_p mu. | L2 extras |
| 45 | Efficiency of a heat engine? | eta = W/Q_H = 1 - Q_C/Q_H. | L3; Atkins 3A |
| 46 | COP of fridge and heat pump? | Fridge Q_C/W; heat pump Q_H/W. Carnot max: T_C/(T_H-T_C) and T_H/(T_H-T_C). | L3 |
| 47 | Kelvin-Planck statement? | No cyclic device can turn heat from a single reservoir entirely into work. | L3 |
| 48 | Clausius statement? | No cyclic device can move heat cold to hot with no other effect. | L3 |
| 49 | How to show Kelvin-Planck and Clausius equivalent? | Perfect fridge + ordinary engine gives a 100% engine (and conversely). | L3 |
| 50 | List steps of the Carnot cycle. | Isothermal expansion at T_H; adiabatic expansion; isothermal compression at T_C; adiabatic compression. | L3 |
| 51 | Derive Carnot efficiency in two lines. | Q_H=nRT_H ln(V2/V1), Q_C=nRT_C ln(V3/V4); adiabats give V2/V1=V3/V4, so Q_C/Q_H=T_C/T_H. | L3 |
| 52 | State Carnot theorem. | No engine beats a reversible one between the same reservoirs; all reversible engines have the same efficiency. | L3 |
| 53 | Why does a fridge with its door open warm the kitchen? | Work W ends up as heat in the room: net gain W per cycle. | L3 concept check |
| 54 | Otto cycle efficiency? | eta = 1 - r^(1-gamma); r=8, gamma=1.4 gives 0.56. | L3 |
| 55 | Clausius inequality? | Closed integral of dQ/T <= 0 (equality for reversible). | L4; Atkins 3A |
| 56 | Definition of entropy change? | dS = dQ_rev/T; state function; units J/K. | L4 |
| 57 | DS for isothermal ideal-gas expansion? | DS = nR ln(Vf/Vi). | L4 |
| 58 | DS for heating at const P? | DS = C_P ln(Tf/Ti). | L4 |
| 59 | DS for a phase transition? | DS = DH_trs / T_trs (water: fusion 22, vaporisation 109 J/K/mol). | L4; Atkins 3B |
| 60 | Trouton rule? | DS_vap about 85 J/K/mol for many liquids; water higher due to hydrogen bonding. | L4 |
| 61 | DS of gas, surroundings, universe: free expansion vs reversible isothermal? | Gas: nR ln2 both. Reversible: surr -nR ln2, univ 0. Free: surr 0, univ +nR ln2. | L4 |
| 62 | Entropy increase principle? | DS_isolated >= 0; DS_univ = DS_sys + DS_surr >= 0. | L4 |
| 63 | DS_univ for heat Q from T_H to T_C? | Q(1/T_C - 1/T_H) > 0. | L4 |
| 64 | Boltzmann entropy formula? | S = k_B ln W. | L4 |
| 65 | Number of microstates for n of N on the left? | W = N!/(n!(N-n)!). | L4 |
| 66 | Show S = k ln W matches nR ln2 for doubling volume. | W_f/W_i = 2^N so DS = N k ln2 = nR ln2. | L4 |
| 67 | Why does freezing water not violate the second law? | DS_water < 0, but heat released raises S_surr by more; DS_univ > 0. | L4 concept check |
| 68 | Why is entropy = disorder misleading? | A shuffled deck has no thermodynamic DS; crystallisation is spontaneous because S_surr rises; the measure is number of microstates. | L4 |
| 69 | Why are macroscopic second-law violations never seen? | Fluctuation width ~1/sqrt(N); for N ~ 1e23 reversing is overwhelmingly improbable. | L4 |

## Anki import block

```
State the zeroth law and why it matters.	If A~C and B~C are in thermal equilibrium then A~B. It makes temperature well defined and thermometers possible.	L1; Atkins 1A
Open, closed, isolated system?	Open: matter and energy cross. Closed: energy only. Isolated: neither.	L1
Name intensive vs extensive examples.	Intensive: P, T, density. Extensive: V, n, U, S.	L1
Constant-volume gas thermometer: T from P?	T = T3 (P/P3), T3 = 273.16 K; all gases extrapolate to P=0 at -273.15 C.	L1; tutorial P1
Kinetic result for PV?	PV = (1/3) N m <v^2> = (2/3) N <Ek>.	L1
Average translational KE per molecule?	(3/2) k_B T. Depends only on T, not mass.	L1
v_rms, v_mp, mean speed formulas?	sqrt(3RT/M), sqrt(2RT/M), sqrt(8RT/(pi M)); v_mp < mean < v_rms.	L1
v_rms of N2 at 300 K?	About 517 m/s (M = 0.028 kg/mol).	L1
Maxwell-Boltzmann form and meaning of the factors?	f(v)=4pi(M/2piRT)^(3/2) v^2 exp(-Mv^2/2RT). v^2: more ways at high speed; exponential: high energy is rare.	L1; tutorial P3
Effect of raising T on the MB curve?	Peak moves right, curve flattens and broadens.	L1
How to find v_mp?	Set d/dv(v^2 exp(-Mv^2/2RT)) = 0, giving v^2 = 2RT/M.	tutorial P3a
Why does Earth lose He although v_rms (300 K) is only 1.4 km/s?	High-speed tail of the MB distribution: a small fraction exceeds 11.2 km/s, and collisions refill the tail.	tutorial P2e
Define compression factor Z.	Z = P V_m / (R T); Z=1 ideal; Z<1 attraction dominates; Z>1 repulsion dominates.	L1; Atkins 1C
van der Waals equation and meaning of a and b?	(P + a/Vm^2)(Vm - b) = RT. b: excluded volume (repulsion). a: attraction.	L1; Atkins 1C
Why a/Vm^2 term?	Attraction needs pairs of molecules, so it scales as (n/V)^2.	tutorial slides
vdW critical constants (Atkins)?	Tc = 8a/(27Rb), Vc = 3b, pc = a/(27 b^2).	Atkins 1C [beyond slides]
When does the ideal gas law fail?	High pressure (finite size) and low temperature (attraction).	L1
Sign convention for W in the course?	W = work done ON the system, dU = Q + W, W = -integral P dV.	L2; Atkins 2A
Work in reversible isothermal ideal-gas expansion?	W = -nRT ln(V2/V1); DU=0; Q=-W.	L2
What is a quasi-static process?	A sequence of equilibrium states, slow enough that P, V, T are defined throughout.	L2
State vs path function examples.	State: U, H, S, T, P, V. Path: Q, W.	L1-2
Exact vs inexact differential?	dU exact: closed integral = 0. dQ, dW inexact: depend on path.	L2; Atkins 2D.1
What is heat?	Energy transferred because of a temperature difference; energy in transit, not contained in a body.	L2
Free expansion of an ideal gas: Q, W, DU, DT?	All zero (Q=0 insulated, W=0 vacuum, DU=0 so DT=0).	L2 concept check
Define C_V and C_P.	C_V=(dU/dT)_V ; C_P=(dH/dT)_P.	L2; Atkins 2A.4
C_P,m - C_V,m for ideal gas?	R. gamma = C_P/C_V.	L2
Equipartition and U_m for monatomic/diatomic?	Each quadratic term gives kT/2. Monatomic 3RT/2 (gamma 5/3). Diatomic 5RT/2 (gamma 7/5), vibration frozen.	L2
Define enthalpy; when is DH = Q?	H = U + PV; DH = Q_P at constant P with no non-expansion work.	L2; Atkins 2B
DU for ANY ideal-gas process?	DU = n C_V DT, since U depends only on T.	L2
Reversible adiabatic relations?	T V^(gamma-1) = const; P V^gamma = const.	L2; Atkins 2E
Why is the adiabat steeper than the isotherm?	gamma>1: no heat in, so the expanding gas cools and P falls faster.	L2
Fire syringe numbers?	V/10 with gamma 1.4: T2 = 300*10^0.4 = 754 K, P2 = 25 bar.	L2
Work formula for a stretched wire; sign?	dW = F dL (plus sign, tension pulls inward).	L2
Surface work for a soap film?	dW = gamma dA, with two surfaces so dA = 2 l dx.	L2
Electrical work for a cell?	dW = E dZ; reversible W = nFE.	L2
Define internal pressure.	pi_T = (dU/dV)_T = T(dp/dT)_V - p. Perfect gas 0; vdW a/Vm^2.	L2 extras; Atkins 2D.2
Molecular meaning of pi_T sign?	Positive when attractions dominate (expansion raises potential energy).	L2 extras
Why did Joule see no temperature change?	The water bath had a huge heat capacity; the real effect (about -0.13 K for N2) was unmeasurable.	L2 extras
What is conserved in Joule-Thomson expansion?	Enthalpy: H_f = H_i (Q=0, W = p_iV_i - p_fV_f).	L2 extras; Atkins 2D.4
Define mu_JT and sign meaning.	mu = (dT/dp)_H; positive: cools; negative: warms.	L2 extras
vdW inversion temperature?	T_I = 2a/(Rb); mu ~ (1/Cp)(2a/RT - b).	L2 extras
Why does He warm when throttled at room T?	Room T is above its inversion temperature (~40 K); repulsions dominate.	L2 concept check
Why does a CO2 extinguisher frost?	Large a, mu about +1.1 K/atm: strong JT cooling.	L2 concept check
Isothermal JT coefficient?	mu_T = (dH/dp)_T = -C_p mu.	L2 extras
Efficiency of a heat engine?	eta = W/Q_H = 1 - Q_C/Q_H.	L3; Atkins 3A
COP of fridge and heat pump?	Fridge Q_C/W; heat pump Q_H/W. Carnot max: T_C/(T_H-T_C) and T_H/(T_H-T_C).	L3
Kelvin-Planck statement?	No cyclic device can turn heat from a single reservoir entirely into work.	L3
Clausius statement?	No cyclic device can move heat cold to hot with no other effect.	L3
How to show Kelvin-Planck and Clausius equivalent?	Perfect fridge + ordinary engine gives a 100% engine (and conversely).	L3
List steps of the Carnot cycle.	Isothermal expansion at T_H; adiabatic expansion; isothermal compression at T_C; adiabatic compression.	L3
Derive Carnot efficiency in two lines.	Q_H=nRT_H ln(V2/V1), Q_C=nRT_C ln(V3/V4); adiabats give V2/V1=V3/V4, so Q_C/Q_H=T_C/T_H.	L3
State Carnot theorem.	No engine beats a reversible one between the same reservoirs; all reversible engines have the same efficiency.	L3
Why does a fridge with its door open warm the kitchen?	Work W ends up as heat in the room: net gain W per cycle.	L3 concept check
Otto cycle efficiency?	eta = 1 - r^(1-gamma); r=8, gamma=1.4 gives 0.56.	L3
Clausius inequality?	Closed integral of dQ/T <= 0 (equality for reversible).	L4; Atkins 3A
Definition of entropy change?	dS = dQ_rev/T; state function; units J/K.	L4
DS for isothermal ideal-gas expansion?	DS = nR ln(Vf/Vi).	L4
DS for heating at const P?	DS = C_P ln(Tf/Ti).	L4
DS for a phase transition?	DS = DH_trs / T_trs (water: fusion 22, vaporisation 109 J/K/mol).	L4; Atkins 3B
Trouton rule?	DS_vap about 85 J/K/mol for many liquids; water higher due to hydrogen bonding.	L4
DS of gas, surroundings, universe: free expansion vs reversible isothermal?	Gas: nR ln2 both. Reversible: surr -nR ln2, univ 0. Free: surr 0, univ +nR ln2.	L4
Entropy increase principle?	DS_isolated >= 0; DS_univ = DS_sys + DS_surr >= 0.	L4
DS_univ for heat Q from T_H to T_C?	Q(1/T_C - 1/T_H) > 0.	L4
Boltzmann entropy formula?	S = k_B ln W.	L4
Number of microstates for n of N on the left?	W = N!/(n!(N-n)!).	L4
Show S = k ln W matches nR ln2 for doubling volume.	W_f/W_i = 2^N so DS = N k ln2 = nR ln2.	L4
Why does freezing water not violate the second law?	DS_water < 0, but heat released raises S_surr by more; DS_univ > 0.	L4 concept check
Why is entropy = disorder misleading?	A shuffled deck has no thermodynamic DS; crystallisation is spontaneous because S_surr rises; the measure is number of microstates.	L4
Why are macroscopic second-law violations never seen?	Fluctuation width ~1/sqrt(N); for N ~ 1e23 reversing is overwhelmingly improbable.	L4
```
