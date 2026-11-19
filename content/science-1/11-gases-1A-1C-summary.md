# Gases: Atkins 11e 1A–1C summary

Scope: Thermo-1 (slides `thermo.tex` 62–595) plus tutorial P1–P4. Anything marked **\[beyond slides\]** is Atkins only. Constants: R = 8.314 J K⁻¹ mol⁻¹ = 0.08314 L bar K⁻¹ mol⁻¹; k\_B = 1.381×10⁻²³ J K⁻¹.

## 1A The perfect gas

**Key ideas**

- A *system* is what you study, the *surroundings* are the rest. Open: matter and energy cross. Closed: energy only. Isolated: neither.
- At equilibrium the state is fixed by a few variables (P, V, T, n) linked by an equation of state. Intensive: P, T, density. Extensive: V, n, U. State function: U, T. Path function: Q, W.
- **Zeroth law**: if A and B are each in thermal equilibrium with C, they are in equilibrium with each other. This is why a thermometer (C) can compare A and B. Temperature is the shared property. A metal bench feels colder than a wooden one only because it conducts heat away faster; both are at the same T.
- A constant-volume gas thermometer has P ∝ T. At low pressure every gas extrapolates to P = 0 at −273.15 °C, which defines absolute zero and the Kelvin scale.
- Boyle (PV const), Charles (V ∝ T) and Avogadro (V ∝ n) combine into one law, exact only as P → 0.

**Key equations**

```latex
PV = nRT = Nk_BT, \qquad T/\mathrm{K} = \theta/{}^\circ\mathrm{C} + 273.15, \qquad T = T_3\,\frac{P}{P_3}\;\;(T_3 = 273.16\ \mathrm{K})
```

**Worked example (tutorial P1).** A constant-volume thermometer reads 6.69 kPa at the triple point. Find the reading at 100 °C, and the temperature when it reads 8.00 kPa.

```latex
P = P_3\frac{T}{T_3} = 6.69\times\frac{373.15}{273.16} = 9.14\ \mathrm{kPa}, \qquad \frac{\Delta P}{\Delta T} = \frac{P_3}{T_3} = 24.5\ \mathrm{Pa\,K^{-1}}
```

```latex
T = 273.16\times\frac{8.00}{6.69} = 326.6\ \mathrm{K} = 53.5\ {}^\circ\mathrm{C}
```

The zeroth law justifies reading the oil's temperature: after a while the thermometer and oil are in equilibrium, so they share T.

**Beyond slides (Atkins 1A.1(a), 1A.2(b))**

- **Pressure** is force per area, P = F/A. Units: 1 Pa = 1 N m⁻² = 1 kg m⁻¹ s⁻². 1 bar = 10⁵ Pa (the standard pressure p°). 1 atm = 101 325 Pa exactly. 1 Torr = 101 325/760 Pa ≈ 133.3 Pa.
- **Dalton's law**: a mixture of perfect gases exerts the sum of the pressures each would exert alone. The partial pressure is p\_J = x\_J p, with mole fraction x\_J = n\_J/n.

```latex
p = p_A + p_B + \dots, \qquad p_J = x_J\,p, \qquad x_J = \frac{n_J}{n}, \qquad \sum_J x_J = 1
```

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

```latex
PV = \tfrac13 Nm\langle v^2\rangle = \tfrac23 N\langle E_k\rangle, \qquad \langle E_k\rangle = \tfrac32 k_BT, \qquad E_{k,\mathrm{molar}} = \tfrac32 RT
```

```latex
f(v) = 4\pi\left(\frac{M}{2\pi RT}\right)^{3/2} v^2 e^{-Mv^2/2RT}
```

```latex
v_{mp}=\sqrt{\frac{2RT}{M}}\;<\;\bar v=\sqrt{\frac{8RT}{\pi M}}\;<\;v_{rms}=\sqrt{\frac{3RT}{M}}
```

For N₂ at 300 K: 422, 476, 517 m/s. All scale as √(T/M).

**Derivation outline 1: pressure and ⟨E\_k⟩**

1. One molecule, cube of side L, hits the wall with v\_x and rebounds: Δp\_x = −2mv\_x per hit.
2. It returns to the same wall every Δt = 2L/v\_x, so the mean force is F = 2mv\_x/(2L/v\_x) = mv\_x²/L.
3. Sum over N molecules and divide by area L²: P = Nm⟨v\_x²⟩/V.
4. Isotropy gives ⟨v\_x²⟩ = ⟨v²⟩/3, so PV = ⅓Nm⟨v²⟩ = ⅔N⟨E\_k⟩.
5. Equate to Nk\_BT: ⟨E\_k⟩ = ½m⟨v²⟩ = (3/2)k\_BT. Hence v\_rms = √(3k\_BT/m) = √(3RT/M).

**Derivation outline 2: v\_mp from df/dv = 0** (tutorial P3a, homework P1B.10)

Drop constants and differentiate g(v) = v² e^{−Mv²/2RT}:

```latex
\frac{dg}{dv} = \left(2v - \frac{Mv^3}{RT}\right)e^{-Mv^2/2RT} = 0 \;\Rightarrow\; v_{mp}^2 = \frac{2RT}{M}
```

The roots v = 0 and v → ∞ are minima, so the non-trivial root is the maximum.

**Worked example (tutorial P3).** N₂ (M = 0.0280 kg mol⁻¹) at 500 K.

(a) v\_mp = √(2×8.314×500/0.0280) = 545 m s⁻¹.

(b) Fraction with 290–300 m s⁻¹ ≈ f(v)Δv at v = 295, Δv = 10:

```latex
\frac{Mv^2}{2RT} = \frac{0.0280\times295^2}{2\times8.314\times500} = 0.293, \qquad f \approx 9.1\times10^{-4}\ \mathrm{s\,m^{-1}} \;\Rightarrow\; f\Delta v \approx 0.9\%
```

(c) At 1000 K the fraction is smaller (about 0.37%): the peak moves to about 770 m/s and the curve flattens, leaving fewer molecules at 295 m/s.

**Also on the slides (short exam answers)**

- N₂ at 300 K: v\_rms = √(3×8.314×300/0.0280) = 517 m s⁻¹, close to the speed of sound in air (343 m/s). H₂: about 1.9 km/s. He: 1.37 km/s.
- Equal T gives equal ⟨E\_k⟩ (H₂ and O₂ in one box). H₂ is 4× faster since M differs by 16.
- Doubling T multiplies v\_rms by √2, not 2. Pressure at fixed V doubles.
- He escape (tutorial P2): v\_rms = 1.37 km/s at 300 K is far below 11.2 km/s. v\_rms would equal 11.2 km/s only at T = Mv²/3R ≈ 2×10⁴ K. Escape still happens because the high-speed tail of the distribution is never empty, and collisions refill it. Total translational energy of 1 L at 1 bar is (3/2)PV = 150 J for any gas.

**Beyond slides: collisions (Atkins 1B.2)**

Treat molecules as hard spheres with collision cross-section σ = πd². A molecule sweeps volume σ v\_rel per unit time, with relative speed v\_rel = √2 ̄v. Then:

```latex
z = \frac{\sigma v_{rel} N}{V} = \frac{\sigma v_{rel}\,p}{k_BT}, \qquad \lambda = \frac{v_{rel}}{z} = \frac{k_BT}{\sigma p}
```

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

```latex
Z = \frac{PV_m}{RT}, \qquad \left(P + \frac{a}{V_m^2}\right)(V_m - b) = RT \;\Longleftrightarrow\; P = \frac{RT}{V_m - b} - \frac{a}{V_m^2}
```

| Gas | a (L² bar mol⁻²) | b (L mol⁻¹) |
| --- | --- | --- |
| He | 0.0346 | 0.0238 |
| N₂ | 1.370 | 0.0387 |
| CO₂ | 3.640 | 0.0427 |

**Worked example (tutorial P4).** 5.00 mol in a 1.00 L cylinder at 298 K. Use R = 0.08314 L bar K⁻¹ mol⁻¹, so RT = 24.78 L bar mol⁻¹ and V\_m = 0.200 L mol⁻¹.

```latex
P_{ideal} = \frac{24.78}{0.200} = 124\ \mathrm{bar}\ \text{(same for any gas)}
```

```latex
P_{N_2} = \frac{24.78}{0.200-0.0387} - \frac{1.370}{0.200^2} = 153.6 - 34.3 = 119\ \mathrm{bar}
```

```latex
P_{He} = \frac{24.78}{0.200-0.0238} - \frac{0.0346}{0.200^2} = 140.6 - 0.9 = 140\ \mathrm{bar}
```

Since V\_m and T are the same, Z = P/P\_ideal. For N₂, Z = 119/124 = 0.96 < 1: the a term (−34.3 bar) slightly outweighs the b term (+29.7 bar). For He, Z = 140/124 = 1.13 > 1: a is negligible, so b wins.

Slide example: 1.00 mol CO₂ in 0.500 L at 300 K gives P\_ideal = 49.9 bar but P\_vdW = 54.5 − 14.6 ≈ 40.0 bar. The ideal law is about 25% too high because attraction dominates; CO₂ liquefies easily.

**Beyond slides (Atkins 1C)**

- **Virial equation.** Expand Z in powers of the density. B and C depend on temperature and are fitted from Z data. B is usually the dominant correction.

```latex
Z = 1 + \frac{B}{V_m} + \frac{C}{V_m^2} + \dots \qquad \text{(or } Z = 1 + B'p + C'p^2 + \dots)
```

- **Boyle temperature.** At T\_B the second virial coefficient is zero, so Z → 1 with zero slope as p → 0 and the gas is nearly perfect over a wide range. For vdW, T\_B = a/(Rb), which gives about 426 K for N₂.
- **Critical constants.** Below T\_c, compressing a gas along an isotherm condenses it to a liquid. At T\_c the two phases merge at the critical point and above T\_c there is only one (supercritical) phase. For vdW the critical point is where the isotherm has an inflection with zero slope:

```latex
T_c = \frac{8a}{27Rb}, \qquad V_c = 3b, \qquad p_c = \frac{a}{27b^2}, \qquad Z_c = \frac{p_cV_c}{RT_c} = \frac38
```

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
