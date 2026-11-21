# HW practice: Thermodynamics (Atkins 11e)

Worked solutions for the Atkins homework items that had no full solution elsewhere in these notes. Problem statements are taken from the 11th edition. Items that already have a full worked solution are not repeated: Ex 2A.1, E2A.4(a), P2A.3, P2A.6, Ex 2B.2, E2B.2(a), E2B.3(a), P2B.2, Ex 2C.1, Ex 2C.2, E2C.4(a), E2C.6(a), P2C.1, P2C.8, P2C.10, Ex 2D.2, E2D.2(a), P2D.2, P2D.8, I2.5 (Chapter 6); Ex 3B.1, E3A.4(b), P3A.3, P3A.5, P3B.2, P3B.10, I3.2, E3C.3(a), E3D.2(a), P3E.4, E4A.2(b), E4A.3(b), E4A.4(a), E4B.7(b), E4B.8(b), P4B.5 (Chapter 7). Zemansky 3.8, 3.10, 3.11, 3.13, 3.14 are not solved here because the Zemansky text is not in the course folder.

Constants used: $R = 8.3145\ \mathrm{J\,K^{-1}mol^{-1}} = 0.082058\ \mathrm{dm^3\,atm\,K^{-1}mol^{-1}}$, $k_B = 1.3806\times10^{-23}\ \mathrm{J\,K^{-1}}$, 1 atm = 101 325 Pa.

## 1A and 1B: gases and the kinetic model

### Problem 1 [HW practice · Thermo · Ex 1A.1]

Nitrogen gas is put in a vessel of constant volume at 100 atm and 300 K, then heated to 500 K. What pressure would it exert, assuming perfect-gas behaviour?

*Solution.* Volume and amount are fixed, so the combined gas law $pV/nT = R$ reduces to $p_1/T_1 = p_2/T_2$:

$$p_2 = p_1\frac{T_2}{T_1} = 100\ \text{atm}\times\frac{500}{300} = \boxed{167\ \text{atm}}$$

### Problem 2 [HW practice · Thermo · Ex 1A.2]

The mass percentage composition of dry air at sea level is approximately N₂ 75.5, O₂ 23.2, Ar 1.3. What is the partial pressure of each component when the total pressure is 1.20 atm?

*Solution.* Mole fractions do not depend on sample size, so take 100 g of air and convert with $n = m/M$:

| gas | mass / g | $M$ / g mol⁻¹ | $n$ / mol | $x_J = n_J/n$ | $p_J = x_Jp$ / atm |
|---|---|---|---|---|---|
| N₂ | 75.5 | 28.01 | 2.695 | 0.781 | 0.937 |
| O₂ | 23.2 | 32.00 | 0.725 | 0.210 | 0.252 |
| Ar | 1.3 | 39.95 | 0.0325 | 0.0094 | 0.0113 |

Total $n = 3.453$ mol. Using $p_J = x_J\,p$ with $p = 1.20$ atm:

$$\boxed{p(\mathrm{N_2}) = 0.937\ \text{atm},\quad p(\mathrm{O_2}) = 0.252\ \text{atm},\quad p(\mathrm{Ar}) = 0.0113\ \text{atm}}$$

The three add to 1.20 atm, as Dalton's law requires.

### Problem 3 [HW practice · Thermo · E1A.2]

(a) Could 131 g of xenon in a vessel of volume 1.0 dm³ exert a pressure of 20 atm at 25 °C if it behaved as a perfect gas? If not, what pressure would it exert? (b) The same question for 25 g of argon in 1.5 dm³ at 30 °C, pressure 2.0 bar.

*Solution.* Compute the pressure a perfect gas would exert, $p = nRT/V$, and compare.

**(a)** $n = 131/131.3 = 0.998$ mol, $T = 298.15$ K:

$$p = \frac{(0.998)(0.082058)(298.15)}{1.0}\ \text{atm} = \boxed{24\ \text{atm}}$$

It would exert about **24 atm**, not 20 atm. So **no**: 20 atm is not what a perfect gas of this amount would give.

**(b)** $n = 25/39.95 = 0.626$ mol, $T = 303.15$ K, $V = 1.5\times10^{-3}$ m³:

$$p = \frac{(0.626)(8.3145)(303.15)}{1.5\times10^{-3}} = 1.05\times10^{6}\ \text{Pa} = \boxed{10.5\ \text{bar}}$$

So **no**: it would exert 10.5 bar, not 2.0 bar.

### Problem 4 [HW practice · Thermo · E1A.9]

(a) The mass density of a gaseous compound was found to be 1.23 kg m⁻³ at 330 K and 20 kPa. What is its molar mass? (b) In another experiment 250 cm³ of a gas at 152 Torr and 298 K had mass 33.5 mg (after buoyancy correction). What is the molar mass?

*Solution.* For a perfect gas $pV = (m/M)RT$, so

$$M = \frac{\rho RT}{p}$$

**(a)** $M = \dfrac{(1.23)(8.3145)(330)}{2.0\times10^{4}} = 0.1687\ \text{kg mol}^{-1} = \boxed{169\ \text{g mol}^{-1}}$

**(b)** $p = 152/760\ \text{atm} = 2.027\times10^4$ Pa. Then $n = pV/RT = (2.027\times10^4)(2.50\times10^{-4})/(8.3145\times298.15) = 2.044\times10^{-3}$ mol and

$$M = \frac{33.5\ \text{mg}}{2.044\times10^{-3}\ \text{mol}} = \boxed{16.4\ \text{g mol}^{-1}}$$

(methane-like).

### Problem 5 [HW practice · Thermo · E1A.11]

(a) A vessel of volume 22.4 dm³ contains 2.0 mol H₂ and 1.0 mol N₂ at 273.15 K. Find (i) the mole fractions, (ii) the partial pressures, (iii) the total pressure. (b) The same for 1.5 mol H₂ and 2.5 mol N₂.

*Solution.* $x_J = n_J/n$, $p_J = n_JRT/V$ and $p = \sum p_J$.

**(a)** $n = 3.0$ mol. (i) $x(\mathrm{H_2}) = 2/3 = 0.667$, $x(\mathrm{N_2}) = 1/3 = 0.333$. (iii) $p = nRT/V = (3.0)(0.082058)(273.15)/22.4 = 3.00$ atm. (ii) $p(\mathrm{H_2}) = \tfrac23(3.00) = 2.00$ atm and $p(\mathrm{N_2}) = 1.00$ atm.

$$\boxed{x = 0.667,\ 0.333;\quad p_J = 2.00,\ 1.00\ \text{atm};\quad p = 3.00\ \text{atm}\ (3.04\ \text{bar})}$$

**(b)** $n = 4.0$ mol. $x(\mathrm{H_2}) = 0.375$, $x(\mathrm{N_2}) = 0.625$, $p = 4.0\times0.082058\times273.15/22.4 = 4.00$ atm, so $p(\mathrm{H_2}) = 1.50$ atm and $p(\mathrm{N_2}) = 2.50$ atm.

(Because 22.4 dm³ is the molar volume at 0 °C and 1 atm, each mole contributes 1 atm.)

### Problem 6 [HW practice · Thermo · P1A.2]

Neptunians use a Celsius-type scale based on the melting point (0 °N) and boiling point (100 °N) of hydrogen. In the limit of zero pressure, $pV$ is 28 dm³ atm at 0 °N and 40 dm³ atm at 100 °N. Where is absolute zero on their scale?

*Solution.* For a perfect gas $pV = nRT$ is linear in absolute temperature, so it is linear in any linear temperature scale $\theta$:

$$pV = a + b\theta,\qquad a = 28,\quad b = \frac{40-28}{100} = 0.12\ \text{dm}^3\,\text{atm}\,({}^\circ\mathrm N)^{-1}$$

Absolute zero is where $pV = 0$:

$$0 = 28 + 0.12\,\theta_0\ \Rightarrow\ \theta_0 = -\frac{28}{0.12} = \boxed{-233\ {}^\circ\mathrm N}$$

Check: the interval between the two fixed points is 100 °N and $pV$ rises by a factor $40/28 = 1.43$, so absolute zero lies $28/12 = 2.33$ intervals below 0 °N.

### Problem 7 [HW practice · Thermo · P1A.11]

Derive the barometric formula $p = p_0e^{-h/H}$ with $H = RT/Mg$ by showing that $dp = -\rho g\,dh$. Evaluate (a) the pressure difference between the top and bottom of a 15 cm laboratory vessel, and (b) the external pressure at 11 km if the ground pressure is 1.0 atm. Take $H \approx 8$ km.

*Solution.* **Derivation.** A thin slab of air between $h$ and $h+dh$ is supported by the pressure difference across it. Its weight per unit area is $\rho g\,dh$, so

$$dp = -\rho g\,dh$$

For a perfect gas the mass density is $\rho = Mp/RT$. Substituting (this is the point where $\rho$ depends on $p$):

$$\frac{dp}{p} = -\frac{Mg}{RT}\,dh = -\frac{dh}{H}\ \Rightarrow\ \ln\frac p{p_0} = -\frac hH\ \Rightarrow\ \boxed{p = p_0e^{-h/H}}$$

with $H = RT/Mg$ (taking $T$ constant).

**(a)** For $h = 0.15$ m, $h/H = 0.15/8000 = 1.9\times10^{-5}$, so

$$\Delta p \approx p_0\frac hH = (1\ \text{atm})(1.9\times10^{-5}) = 1.9\times10^{-5}\ \text{atm}\ (\approx 1.9\ \text{Pa})$$

Over a laboratory vessel the pressure is uniform to about two parts in $10^5$.

**(b)** $p = (1.0\ \text{atm})\,e^{-11/8} = \boxed{0.25\ \text{atm}}$.

### Problem 8 [HW practice · Thermo · Ex 1B.1]

Calculate $v_{\mathrm{rms}}$ and the mean speed $v_{\mathrm{mean}}$ of N₂ molecules at 25 °C.

*Solution.* $M = 0.02802$ kg mol⁻¹, $T = 298$ K.

$$v_{\mathrm{rms}} = \sqrt{\frac{3RT}{M}} = \sqrt{\frac{3(8.3145)(298)}{0.02802}} = \boxed{515\ \text{m s}^{-1}}$$

$$v_{\mathrm{mean}} = \sqrt{\frac{8RT}{\pi M}} = \sqrt{\frac{8(8.3145)(298)}{\pi(0.02802)}} = \boxed{475\ \text{m s}^{-1}}$$

The ordering $v_{\mathrm{mp}} < v_{\mathrm{mean}} < v_{\mathrm{rms}}$ holds, with $v_{\mathrm{mp}} = \sqrt{2RT/M} = 421$ m s⁻¹.

### Problem 9 [HW practice · Thermo · E1B.2]

(a) Calculate the root-mean-square speeds of H₂ and O₂ molecules at 20 °C. (b) The same for CO₂ and He.

*Solution.* $v_{\mathrm{rms}} = \sqrt{3RT/M}$ with $T = 293.15$ K and $3RT = 7312$ J mol⁻¹.

| gas | $M$ / kg mol⁻¹ | $v_{\mathrm{rms}}$ / m s⁻¹ |
|---|---|---|
| H₂ | 0.002016 | **1.90 × 10³** |
| O₂ | 0.03200 | **478** |
| CO₂ | 0.04401 | **408** |
| He | 0.004003 | **1.35 × 10³** |

At the same temperature the speed scales as $M^{-1/2}$: H₂ is 4 times faster than O₂, since $\sqrt{32/2}=4$.

### Problem 10 [HW practice · Thermo · E1B.8]

(a) At what pressure does the mean free path of argon at 20 °C become comparable to the diameter of a 100 cm³ vessel containing it? Take $\sigma = 0.36\ \mathrm{nm^2}$. (b) At what pressure does it become comparable to 10 times the diameter of the atoms themselves?

*Solution.* Mean free path of a perfect gas:

$$\lambda = \frac{k_BT}{\sqrt2\,\sigma p}\ \Rightarrow\ p = \frac{k_BT}{\sqrt2\,\sigma\lambda}$$

**(a)** Treat the vessel as a sphere: $V = \pi d^3/6 = 1.00\times10^{-4}$ m³ gives $d = 5.76\times10^{-2}$ m. With $T = 293.15$ K and $\sigma = 3.6\times10^{-19}$ m²:

$$p = \frac{(1.3806\times10^{-23})(293.15)}{\sqrt2\,(3.6\times10^{-19})(5.76\times10^{-2})} = \boxed{0.14\ \text{Pa}}$$

(A cube of side 4.64 cm gives 0.17 Pa; the answer depends on the shape assumed but is about 0.1 Pa either way.)

**(b)** From $\sigma = \pi d_{\mathrm{Ar}}^2$ (collision cross-section with collision diameter $d$), $d_{\mathrm{Ar}} = \sqrt{\sigma/\pi} = 0.339$ nm, so $\lambda = 3.39$ nm:

$$p = \frac{(1.3806\times10^{-23})(293.15)}{\sqrt2\,(3.6\times10^{-19})(3.39\times10^{-9})} = \boxed{2.3\times10^{6}\ \text{Pa}\approx 23\ \text{atm}}$$

At this pressure the mean free path is only ten atomic diameters, so the dilute-gas formula is already doubtful.

### Problem 11 [HW practice · Thermo · P1B.7]

Calculate the escape velocity from the surface of a planet of radius $R$. Evaluate it for (i) Earth ($R = 6.37\times10^6$ m, $g = 9.81$ m s⁻²) and (ii) Mars ($R = 3.38\times10^6$ m, $m_{\mathrm{Mars}}/m_{\mathrm{Earth}} = 0.108$). At what temperatures do H₂, He and O₂ have mean speeds equal to their escape speeds? What proportion of molecules can escape at (i) 240 K and (ii) 1500 K?

*Solution.* **Escape speed.** Energy conservation: $\tfrac12mv_e^2 = GMm/R$. Since $g = GM/R^2$, $GM = gR^2$ and

$$\boxed{v_e = \sqrt{2gR}}$$

- Earth: $v_e = \sqrt{2(9.81)(6.37\times10^6)} = 1.12\times10^4$ m s⁻¹ (11.2 km s⁻¹).
- Mars: $g_{\mathrm M} = g\,(m_{\mathrm M}/m_{\mathrm E})(R_{\mathrm E}/R_{\mathrm M})^2 = 9.81(0.108)(6.37/3.38)^2 = 3.76$ m s⁻², so $v_e = \sqrt{2(3.76)(3.38\times10^6)} = 5.04\times10^3$ m s⁻¹.

**Temperature at which $v_{\mathrm{mean}} = v_e$.** Set $\sqrt{8RT/\pi M} = v_e$:

$$T = \frac{\pi Mv_e^2}{8R}$$

| gas | $T$ on Earth / K | $T$ on Mars / K |
|---|---|---|
| H₂ | $1.2\times10^{4}$ | $2.4\times10^{3}$ |
| He | $2.4\times10^{4}$ | $4.8\times10^{3}$ |
| O₂ | $1.9\times10^{5}$ | $3.8\times10^{4}$ |

**Fraction able to escape** (speed $> v_e$). With $a = \sqrt{M/2RT}$, $x = av_e$, integrating the Maxwell distribution:

$$P(v>v_e) = \mathrm{erfc}(x) + \frac{2}{\sqrt\pi}\,x\,e^{-x^2}$$

| gas | Earth, 240 K | Earth, 1500 K | Mars, 240 K | Mars, 1500 K |
|---|---|---|---|---|
| H₂ | $3\times10^{-27}$ | $1.5\times10^{-4}$ | $1.1\times10^{-5}$ | 0.25 |
| He | $\sim10^{-53}$ | $1\times10^{-8}$ | $5\times10^{-11}$ | 0.043 |
| O₂ | 0 | $\sim10^{-69}$ | $\sim10^{-88}$ | $4\times10^{-14}$ |

Even though the mean speed of H₂ is far below $v_e$ on Earth, the high-speed tail lets a small fraction escape at 1500 K (the upper atmosphere), which, accumulated over geological time, explains why Earth has lost its light gases but kept O₂ and N₂. Mars, with its much lower $v_e$, loses H₂ rapidly and He and O₂ much more slowly.

### Problem 12 [HW practice · Thermo · P1B.8]

Plot the Maxwell–Boltzmann speed distributions for molar mass 100 g mol⁻¹ at temperatures between 200 K and 2000 K.

*Solution.* The distribution is

$$f(v) = 4\pi\left(\frac{M}{2\pi RT}\right)^{3/2}v^2e^{-Mv^2/2RT}$$

Plot $f(v)$ against $v$ (0 to about 1500 m s⁻¹) for $T = 200,\ 500,\ 1000,\ 2000$ K. The shape is fixed by the most probable speed $v_{\mathrm{mp}} = \sqrt{2RT/M}$ and the peak height $f(v_{\mathrm{mp}}) = \dfrac{4}{e\sqrt\pi\,v_{\mathrm{mp}}}$:

| $T$ / K | $v_{\mathrm{mp}}$ / m s⁻¹ | peak $f(v_{\mathrm{mp}})$ / 10⁻³ s m⁻¹ |
|---|---|---|
| 200 | 182 | 8.1 |
| 500 | 288 | 5.1 |
| 1000 | 408 | 3.6 |
| 2000 | 577 | 2.6 |

What the plot shows:

- Each curve rises as $v^2$ (few slow molecules, because few ways to have small speed), peaks at $v_{\mathrm{mp}}$ and falls off exponentially.
- Raising $T$ moves the peak to the right as $\sqrt T$ and lowers and broadens it, because the area under every curve is 1.
- The high-speed tail grows rapidly with $T$: this is what drives reaction rates and evaporation.

### Problem 13 [HW practice · Thermo · P1B.10]

The maximum of the Maxwell–Boltzmann distribution occurs where $df/dv = 0$. Find an expression for the most probable speed of molecules of molar mass $M$ at temperature $T$.

*Solution.* Write $f(v) = A\,v^2e^{-Bv^2}$ with $A = 4\pi(M/2\pi RT)^{3/2}$ and $B = M/2RT$. Differentiate:

$$\frac{df}{dv} = A\left(2v - 2Bv^3\right)e^{-Bv^2} = 2Av\,(1 - Bv^2)\,e^{-Bv^2}$$

This vanishes at $v = 0$ (a minimum, since $f = 0$ there), at $v\to\infty$, and where $1 - Bv^2 = 0$:

$$v^2 = \frac1B = \frac{2RT}{M}\ \Rightarrow\ \boxed{v_{\mathrm{mp}} = \sqrt{\frac{2RT}{M}}}$$

The second derivative is negative there, so it is a maximum.

## 3C, 3D, 3E: third law, Gibbs energy, thermodynamic relations

### Problem 14 [HW practice · Thermo · Ex 3C.1]

The molar constant-pressure heat capacity of a nonmetallic solid at 4.2 K is 0.43 J K⁻¹ mol⁻¹. What is its molar entropy at that temperature (relative to $S_m(0)$)?

*Solution.* At very low temperature the Debye law applies: $C_{p,m} = aT^3$. Then

$$S_m(T) - S_m(0) = \int_0^T\frac{C_{p,m}}T\,dT = a\int_0^TT^2\,dT = \frac{aT^3}{3} = \frac{C_{p,m}(T)}3$$

$$S_m(4.2\ \mathrm K) = S_m(0) + \frac{0.43}{3} = S_m(0) + \boxed{0.14\ \text{J K}^{-1}\text{mol}^{-1}}$$

The integral converges at $T\to0$, which is why the third law lets us start entropy sums at $T = 0$.

### Problem 15 [HW practice · Thermo · Ex 3D.2]

How much energy is available for sustaining muscular and nervous activity from the oxidation of 1.00 mol of glucose molecules under standard conditions at 37 °C? The standard entropy of reaction is +182.4 J K⁻¹ mol⁻¹ and $\Delta_rH^\circ = -2808$ kJ mol⁻¹.

*Solution.* The maximum non-expansion work at constant $T$ and $p$ is $-\Delta_rG^\circ$. Taking $\Delta_rH^\circ$ independent of temperature between 25 and 37 °C:

$$\Delta_rG^\circ = \Delta_rH^\circ - T\Delta_rS^\circ = -2808\ \text{kJ mol}^{-1} - (310\ \mathrm K)(0.1824\ \text{kJ K}^{-1}\text{mol}^{-1}) = -2865\ \text{kJ mol}^{-1}$$

$$\boxed{w_{\text{non-exp,max}} = 2865\ \text{kJ per mole of glucose}}$$

The positive $\Delta_rS^\circ$ makes the Gibbs energy more negative than the enthalpy: the products (CO₂, H₂O) have more freedom than the reactants.

### Problem 16 [HW practice · Thermo · Ex 3E.2]

Show thermodynamically that $\pi_T = (\partial U/\partial V)_T = 0$ for a perfect gas, and compute its value for a van der Waals gas.

*Solution.* From $dU = T\,dS - p\,dV$, at constant $T$:

$$\pi_T = \left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial S}{\partial V}\right)_T - p$$

The Maxwell relation from $dA = -S\,dT - p\,dV$ is $(\partial S/\partial V)_T = (\partial p/\partial T)_V$, so

$$\boxed{\pi_T = T\left(\frac{\partial p}{\partial T}\right)_V - p}$$

**Perfect gas.** $p = nRT/V$, so $(\partial p/\partial T)_V = nR/V$ and $\pi_T = nRT/V - p = 0$.

**van der Waals gas.** $p = \dfrac{nRT}{V - nb} - \dfrac{an^2}{V^2}$, so $(\partial p/\partial T)_V = \dfrac{nR}{V-nb}$ and

$$\pi_T = \frac{nRT}{V-nb} - \left(\frac{nRT}{V-nb} - \frac{an^2}{V^2}\right) = \boxed{\frac{an^2}{V^2}}$$

The internal energy increases on expansion because molecules must be pulled apart against attractions, measured by $a$. The excluded volume $b$ does not appear.

### Problem 17 [HW practice · Thermo · Ex 3E.3]

For a phase transition of a solid, $\Delta_{\mathrm{trs}}V = +1.0\ \mathrm{cm^3\,mol^{-1}}$ independent of pressure. By how much does the Gibbs energy of transition change when the pressure rises from 1.0 bar to 3.0 Mbar?

*Solution.* $(\partial G/\partial p)_T = V$, so for the transition $\Delta_{\mathrm{trs}}G(p_f) - \Delta_{\mathrm{trs}}G(p_i) = \Delta_{\mathrm{trs}}V\,\Delta p$:

$$\Delta(\Delta_{\mathrm{trs}}G) = (1.0\times10^{-6}\ \text{m}^3\text{mol}^{-1})(3.0\times10^{11} - 1.0\times10^{5})\ \text{Pa} = \boxed{+3.0\times10^{2}\ \text{kJ mol}^{-1}}$$

The positive $\Delta_{\mathrm{trs}}V$ means high pressure disfavours the transition; 3 Mbar is the pressure scale of the Earth's core.

### Problem 18 [HW practice · Thermo · P3D.1]

A perfect gas is in a cylinder of fixed volume divided by a frictionless, thermally insulating piston into sections A and B. B is held at 300 K (isothermal). Each section holds 2.00 mol, $C_{V,m} = 20$ J K⁻¹ mol⁻¹, initially $T_A = T_B = 300$ K and $V_A = V_B = 2.00\ \mathrm{dm^3}$. Heat is supplied to A so it expands reversibly, compressing B to 1.00 dm³. (a) Find the final pressure and $T_A$. (b) $\Delta S$ of A. (c) $\Delta S$ of B. (d) $\Delta U$ of each section. (e) $\Delta A$ for B, and explain why it cannot be found for A. (f) What does reversibility imply for the total $\Delta A$?

*Solution.* **(a)** B is isothermal at 300 K: $p_f = nRT/V_B = (2.00)(8.3145)(300)/(1.00\times10^{-3}) = \boxed{4.99\times10^{6}\ \text{Pa} = 49.9\ \text{bar}}$. Section A takes up the rest of the fixed total volume: $V_A = 4.00 - 1.00 = 3.00$ dm³, and the pressures are equal, so

$$T_A = \frac{pV_A}{nR} = \frac{(4.99\times10^6)(3.00\times10^{-3})}{(2.00)(8.3145)} = \boxed{900\ \text{K}}$$

**(b)** Use the hint: heat at constant volume from 300 K to 900 K, then expand isothermally from 2.00 to 3.00 dm³:

$$\Delta S_A = nC_{V,m}\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i} = (2)(20)\ln3 + (2)(8.3145)\ln1.5 = 43.9 + 6.7 = \boxed{+50.7\ \text{J K}^{-1}}$$

**(c)** $\Delta S_B = nR\ln(V_f/V_i) = (2)(8.3145)\ln(1/2) = \boxed{-11.5\ \text{J K}^{-1}}$

**(d)** $U$ depends only on $T$: $\Delta U_A = nC_{V,m}\Delta T = (2)(20)(600) = \boxed{+24.0\ \text{kJ}}$ and $\Delta U_B = \boxed{0}$ (isothermal).

**(e)** For B, $T$ is constant, so $\Delta A_B = \Delta U_B - T\Delta S_B = 0 - (300)(-11.5) = \boxed{+3.46\ \text{kJ}}$ (this equals the work done on B, $nRT\ln2$). For A, $\Delta A = \Delta U - \Delta(TS)$ and $T$ changes from 300 K to 900 K, so $\Delta(TS) = T_fS_f - T_iS_i$ needs the absolute entropies, not just $\Delta S$; they are not given. The shortcut $\Delta A = \Delta U - T\Delta S$ is valid only at constant $T$.

**(f)** For the whole system, $dA = -S_A\,dT_A - S_B\,dT_B - p\,d(V_A+V_B)$ in a reversible change. The total volume is fixed and $T_B$ is constant, so the $p\,dV$ terms cancel exactly between the two sections (the work A does on the piston is the work done on B). Reversibility therefore means no net work crosses the cylinder wall, and $\Delta A_{\mathrm{total}} = -\int S_A\,dT_A$, which is not zero but depends only on heating A.

### Problem 19 [HW practice · Thermo · I3.3(d)]

Show how the first derivative of $G$, $(\partial G/\partial p)_T$, varies with pressure and plot the resulting expression over a pressure range. What is the physical significance of $(\partial G/\partial p)_T$?

*Solution.* From $dG = V\,dp - S\,dT$,

$$\left(\frac{\partial G}{\partial p}\right)_T = V$$

For one mole of a perfect gas $V_m = RT/p$, so the slope is a rectangular hyperbola that diverges as $p\to0$ and decays as $1/p$:

| $p$ / bar | 0.1 | 0.5 | 1 | 2 | 5 | 10 |
|---|---|---|---|---|---|---|
| $V_m$ at 298 K / dm³ | 247.8 | 49.6 | 24.8 | 12.4 | 4.96 | 2.48 |

Integrating gives the familiar logarithm, $G_m(p) = G_m^\circ + RT\ln(p/p^\circ)$, which rises steeply at low $p$ and flattens at high $p$. For a van der Waals gas the slope is $V_m(p)$ from the cubic and stays above $b$; for a liquid or solid $V_m$ is nearly constant, so $G_m$ is almost linear in $p$ with a small slope.

**Significance.** The slope of the Gibbs energy against pressure is the **volume**. It is always positive, so $G$ always rises on compression, and it is far larger for gases than for condensed phases. That is why raising the pressure favours the phase with smaller molar volume (e.g. ice melting under a skate, since ice has the larger volume).

## 4B: physical transformations

### Problem 20 [HW practice · Thermo · Ex 4B.1]

Calculate the effect on the chemical potentials of ice and water of increasing the pressure from 1.00 bar to 2.00 bar at 0 °C. The mass density of ice is 0.917 g cm⁻³ and of liquid water 0.999 g cm⁻³.

*Solution.* $d\mu = V_m\,dp$, and for an incompressible phase $\Delta\mu = V_m\Delta p = M\Delta p/\rho$. With $M = 1.802\times10^{-2}$ kg mol⁻¹ and $\Delta p = 1.00\times10^5$ Pa:

$$\Delta\mu(\text{ice}) = \frac{(1.802\times10^{-2})(1.00\times10^5)}{917} = \boxed{+1.97\ \text{J mol}^{-1}}$$

$$\Delta\mu(\text{water}) = \frac{(1.802\times10^{-2})(1.00\times10^5)}{999} = \boxed{+1.80\ \text{J mol}^{-1}}$$

The chemical potential of ice rises more than that of water, so if they were in equilibrium at 1 bar, at 2 bar $\mu(\text{ice}) > \mu(\text{water})$ and ice tends to melt. That is the sign of a negative $dT/dp$ for the melting line of water.

### Problem 21 [HW practice · Thermo · Ex 4B.2]

Estimate the typical size of the effect of increasing pressure on the boiling point of a liquid.

*Solution.* The Clapeyron equation for vaporization is $\dfrac{dp}{dT} = \dfrac{\Delta_{\mathrm{vap}}H}{T\,\Delta_{\mathrm{vap}}V}$. At the boiling point $\Delta_{\mathrm{vap}}H/T$ is Trouton's constant, $85\ \mathrm{J\,K^{-1}mol^{-1}}$. Since $V_m(\mathrm g)\gg V_m(\mathrm l)$, $\Delta_{\mathrm{vap}}V \approx V_m(\mathrm g) \approx 25\ \mathrm{dm^3\,mol^{-1}} = 2.5\times10^{-2}\ \mathrm{m^3\,mol^{-1}}$. Then

$$\frac{dp}{dT}\approx\frac{85}{2.5\times10^{-2}} = 3.4\times10^{3}\ \text{Pa K}^{-1} = 0.034\ \text{atm K}^{-1}$$

$$\boxed{\frac{dT}{dp}\approx 29\ \text{K atm}^{-1}}$$

A pressure change of $+0.1$ atm raises the boiling temperature by about 3 K. Any liquid behaves about like this, which is why a pressure cooker works and why water boils lower at altitude.

### Problem 22 [HW practice · Thermo · P4B.12]

The enthalpy changes by $dH = C_p\,dT + V\,dp$. The Clapeyron equation relates $dp$ and $dT$ along a phase boundary. (a) Show that along such a boundary $d\Delta_{\mathrm{trs}}H = \Delta_{\mathrm{trs}}C_p\,dT + (\Delta_{\mathrm{trs}}H/T)\,dT$. (b) Show it can be written $d(\Delta_{\mathrm{trs}}H/T) = \Delta_{\mathrm{trs}}C_p\,d\ln T$.

*Solution.* **(a)** Apply $dH = C_p\,dT + V\,dp$ to each phase, $\alpha$ and $\beta$, and subtract (the transition is $\alpha\to\beta$):

$$d\Delta_{\mathrm{trs}}H = \Delta_{\mathrm{trs}}C_p\,dT + \Delta_{\mathrm{trs}}V\,dp$$

Along the boundary the Clapeyron equation holds, $dp/dT = \Delta_{\mathrm{trs}}H/(T\,\Delta_{\mathrm{trs}}V)$, so $\Delta_{\mathrm{trs}}V\,dp = (\Delta_{\mathrm{trs}}H/T)\,dT$:

$$\boxed{d\Delta_{\mathrm{trs}}H = \Delta_{\mathrm{trs}}C_p\,dT + \frac{\Delta_{\mathrm{trs}}H}{T}\,dT}$$

**(b)** Start from the second form and expand the left side:

$$d\!\left(\frac{\Delta_{\mathrm{trs}}H}T\right) = \frac{d\Delta_{\mathrm{trs}}H}T - \frac{\Delta_{\mathrm{trs}}H}{T^2}\,dT$$

Substitute (a) for $d\Delta_{\mathrm{trs}}H$:

$$= \frac{\Delta_{\mathrm{trs}}C_p\,dT}{T} + \frac{\Delta_{\mathrm{trs}}H}{T^2}dT - \frac{\Delta_{\mathrm{trs}}H}{T^2}dT = \Delta_{\mathrm{trs}}C_p\,\frac{dT}T = \boxed{\Delta_{\mathrm{trs}}C_p\,d\ln T}$$

So $\Delta_{\mathrm{trs}}H/T = \Delta_{\mathrm{trs}}S$ changes along the boundary only because the two phases have different heat capacities, which is the familiar $d\Delta S = \Delta C_p\,d\ln T$.
