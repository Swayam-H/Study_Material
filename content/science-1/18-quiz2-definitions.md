# Quiz-2 definitions sheet: Thermodynamics (Atkins 11e 1A–3B)

This sheet goes with the formula sheet (sheet 6). It lists every term with a precise definition, then the laws stated in exam-ready form.
- Tags: **[A]** = Atkins only, **[S]** = slides only, **[Z]** = Zemansky.
- Convention: $\Delta U = q + w$, with $q$ and $w$ counted as energy **into** the system.

---

## 1A Systems, state, temperature, perfect gas

### Systems and boundaries
| Term | Definition | Notes |
|---|---|---|
| system | The part of the universe chosen for study. | Choosing it well often makes a problem easy. |
| surroundings | Everything outside the system, where measurements are made. | |
| boundary | What separates the system from its surroundings. | It may be real or imaginary, fixed or movable. |
| universe | The system together with its surroundings. | $\Delta S_\text{univ} = \Delta S_\text{sys} + \Delta S_\text{sur}$ |
| open system | A system that can exchange both matter and energy with its surroundings. | Example: a pot with no lid. |
| closed system | A system that can exchange energy but not matter. | Example: a sealed flask or piston. |
| isolated system | A system that can exchange neither matter nor energy. | Example: an ideal thermos. $\Delta U = 0$. |
| diathermic wall | A boundary that allows energy to pass as heat. | |
| adiabatic wall | A boundary that does not allow energy to pass as heat. | |

### Properties and state
| Term | Definition | Notes |
|---|---|---|
| intensive property | A property that does not depend on the amount of substance. | $p$, $T$, density, $V_m$ |
| extensive property | A property proportional to the amount of substance. | $V$, $n$, $m$, $U$, $H$, $S$, $C$ |
| molar quantity | An extensive quantity divided by the amount: $X_m = X/n$. | It is intensive. |
| specific quantity | An extensive quantity divided by the mass. | e.g. specific heat capacity (J K⁻¹ g⁻¹) |
| state | The condition of a system, fixed by the values of its state variables. | |
| state variable / state function | A property whose value depends only on the current state, not on how the state was reached. | $U$, $H$, $S$, $p$, $V$, $T$. $\oint dX = 0$. |
| path function | A quantity whose value depends on the route taken between two states. | $q$, $w$. A body does not "contain" heat or work. |
| equation of state | A relation between the state variables of a substance. | $p = f(T, V, n)$, e.g. $pV = nRT$ |

### Equilibrium
| Term | Definition | Notes |
|---|---|---|
| thermodynamic equilibrium | The macroscopic properties no longer change with time and are uniform throughout. | It requires thermal, mechanical and chemical equilibrium. |
| thermal equilibrium | No change of state occurs when two bodies are in contact through a diathermic wall. | They then have the same temperature. |
| mechanical equilibrium | There is no unbalanced force. | Equal pressure on both sides of a movable wall. |

### Pressure and temperature
| Term | Definition | Notes |
|---|---|---|
| pressure | Force divided by the area it acts on: $p = F/A$. | Pa = N m⁻²; 1 bar = 10⁵ Pa; 1 atm = 101 325 Pa |
| standard pressure $p°$ | Exactly 1 bar. | |
| temperature | The property that tells whether two bodies in thermal contact will exchange energy as heat; heat flows from higher to lower $T$. | Kinetic theory: a measure of the average translational KE. |
| thermometer | A device whose thermometric property (length of a liquid column, gas pressure, resistance) changes with $T$. | It works because of the zeroth law. |
| triple point of water | The single $T$, $p$ at which ice, liquid water and vapour coexist. | $T_3$ = 273.16 K exactly (fixed point of the Kelvin scale). |
| Celsius scale $\theta$ | $\theta/^\circ\text{C} = T/\text{K} - 273.15$. | |
| thermodynamic (Kelvin) scale | The absolute scale with $T = 0$ at absolute zero, defined by $T_C/T_H = Q_C/Q_H$ for a reversible engine (3A.3). | It agrees with the perfect-gas scale. |
| absolute zero | $T = 0$ K ($-273.15$ °C). | Where all gases' $p$ extrapolates to zero at constant $V$. It is unattainable. |

### Gases and gas laws
| Term | Definition | Notes |
|---|---|---|
| perfect (ideal) gas | A gas that obeys $pV = nRT$ exactly at all conditions: no interactions and negligible molecular size. | Real gases approach it as $p \to 0$. |
| limiting law | A law that is strictly true only in a limit, here $p \to 0$. | The perfect gas law is one. |
| Boyle's law | At constant $n$ and $T$, $pV$ = constant. | |
| Charles's law | At constant $n$ and $p$, $V \propto T$. At constant $n$ and $V$, $p \propto T$. | |
| Avogadro's principle | At the same $T$ and $p$, equal volumes of gases contain equal numbers of molecules: $V \propto n$. | |
| amount of substance $n$ | Measured in moles; 1 mol contains $N_A$ entities. | $N_A = 6.022\times10^{23}$ mol⁻¹ |
| molar mass $M$ | Mass per amount of substance. | Use kg mol⁻¹ in kinetic formulas. |
| SATP | 298.15 K and 1 bar, where $V_m$ = 24.79 L mol⁻¹. | STP: 273.15 K and 1 atm, where $V_m$ = 22.41 L mol⁻¹. |
| mole fraction $x_J$ | $x_J = n_J/n$. | $\sum_J x_J = 1$ **[A]** |
| partial pressure $p_J$ | $p_J = x_Jp$: the pressure component J would exert if it alone occupied the container. | **[A]** |
| Dalton's law | The pressure of a mixture of perfect gases is the sum of the partial pressures. | Exact only for perfect gases. **[A]** |

---

## 1B Kinetic model
| Term | Definition | Notes |
|---|---|---|
| kinetic model of gases | A gas is a collection of molecules of mass $m$ in ceaseless random motion. Their size is negligible compared with the distances they travel, and they interact only through brief elastic collisions. | |
| elastic collision | A collision in which the total translational kinetic energy is conserved. | |
| root-mean-square speed $v_\text{rms}$ | The square root of the mean of the squared speeds, $\sqrt{\langle v^2\rangle} = \sqrt{3RT/M}$. | |
| mean speed $v_\text{mean}$ | The average speed, $\int_0^\infty vf(v)\,dv = \sqrt{8RT/\pi M}$. | |
| most probable speed $v_\text{mp}$ | The speed at the peak of $f(v)$, $\sqrt{2RT/M}$. | |
| mean relative speed $v_\text{rel}$ | The mean speed at which one molecule approaches another, $\sqrt2\,v_\text{mean}$ for identical molecules. | **[A]** |
| Maxwell–Boltzmann distribution | $f(v)$, where $f(v)\,dv$ is the fraction of molecules with speeds between $v$ and $v + dv$. | Normalised: $\int_0^\infty f\,dv = 1$ |
| collision diameter $d$ | The separation of two molecular centres at contact. | **[A]** |
| collision cross-section $\sigma$ | The target area $\sigma = \pi d^2$ within which two molecules collide. | **[A]** |
| collision frequency $z$ | The number of collisions one molecule makes per unit time, $z = \sigma v_\text{rel}N/V$. | s⁻¹ **[A]** |
| mean free path $\lambda$ | The average distance a molecule travels between collisions, $\lambda = v_\text{rel}/z = k_BT/\sigma p$. | **[A]** |
| degree of freedom | An independent way a molecule can store energy (translation, rotation, vibration). | |
| equipartition theorem | At thermal equilibrium, each quadratic term in a molecule's energy has an average value of $\tfrac12k_BT$. | Valid when the levels are closely spaced (classical); vibrations are often frozen. |
| escape speed | The minimum speed needed to leave a planet's gravity: $\sqrt{2gR}$. | 11.2 km/s for Earth |

---

## 1C Real gases
| Term | Definition | Notes |
|---|---|---|
| real gas | A gas whose molecules interact and have finite size, so it deviates from $pV = nRT$. | Deviations are largest at high $p$ and low $T$. |
| repulsive interaction | A short-range force that dominates when molecules are nearly in contact. It makes the gas harder to compress than a perfect gas, so $Z > 1$. | |
| attractive interaction | A longer-range force at intermediate separations. It makes the gas easier to compress, so $Z < 1$. | |
| compression factor $Z$ | $Z = pV_m/RT$, the ratio of the molar volume to that of a perfect gas at the same $T$ and $p$. | $Z = 1$ for a perfect gas |
| virial equation | An expansion of $pV_m/RT$ in powers of $1/V_m$ (or $p$): $1 + B/V_m + C/V_m^2 + \cdots$. | **[A]** |
| virial coefficients $B$, $C$, … | The temperature-dependent coefficients of that expansion. | $B$ is the second virial coefficient. **[A]** |
| Boyle temperature $T_B$ | The temperature at which $B = 0$, so the gas behaves almost perfectly over a range of $p$. | vdW: $T_B = a/Rb$ **[A]** |
| van der Waals equation | $(p + a/V_m^2)(V_m - b) = RT$, a model equation of state for real gases. | |
| vdW parameter $a$ | Measures the strength of attractions; reduces the pressure by $a/V_m^2$. | L² bar mol⁻² |
| vdW parameter $b$ | The excluded volume per mole, i.e. the volume the molecules themselves occupy. | L mol⁻¹ |
| critical point | The state ($T_c$, $p_c$, $V_c$) at which liquid and vapour become indistinguishable. | **[A]** |
| critical temperature $T_c$ | Above $T_c$ a gas cannot be liquefied by pressure alone. | **[A]** |
| supercritical fluid | Matter above both $T_c$ and $p_c$, which is a single dense fluid phase. | **[A]** |
| van der Waals loops | Unphysical oscillations of vdW isotherms below $T_c$. | **[A]** |
| Maxwell construction | Replacing a vdW loop by a horizontal line that encloses equal areas above and below it. The line represents liquid–vapour coexistence. | **[A]** |
| reduced variables | $p_r = p/p_c$, $T_r = T/T_c$, $V_r = V_m/V_c$. | **[A]** |
| principle of corresponding states | Real gases at the same reduced volume and reduced temperature exert the same reduced pressure (they have about the same $Z$). | An approximation; best for spherical molecules. **[A]** |

---

## 2A Work, heat, internal energy

### Energy, work and heat
| Term | Definition | Notes |
|---|---|---|
| energy | The capacity to do work. | J |
| work | Energy transferred by motion against an opposing force. In principle it could raise a weight in the surroundings. | Molecular view: transfer that uses organised motion. |
| heat | Energy transferred because of a temperature difference between the system and its surroundings. | Molecular view: transfer that uses disorderly thermal motion. Energy in transit, not contained. |
| exothermic process | A process that releases energy as heat to the surroundings ($q < 0$). | e.g. combustion |
| endothermic process | A process that absorbs energy as heat ($q > 0$). | e.g. vaporisation |
| internal energy $U$ | The total energy of a system: the kinetic and potential energy of its molecules, from translation, rotation, vibration, interactions and bonds. | State function, extensive. Only changes $\Delta U$ are measurable. |
| first law | The internal energy of an isolated system is constant. For a closed system, $\Delta U = q + w$. | Energy is conserved. |
| perpetual motion machine of the first kind | A device that produces work without consuming energy. The first law forbids it. | |

### Expansion work
| Term | Definition | Notes |
|---|---|---|
| expansion work | Work arising from a change in volume, $dw = -p_\text{ex}\,dV$. | |
| non-expansion (additional) work | Any work other than expansion work: electrical, surface, extension, chemical. | $dw_\text{add}$ **[A]** |
| external pressure $p_\text{ex}$ | The pressure the surroundings exert on the boundary. It is what enters $dw = -p_\text{ex}\,dV$. | |
| free expansion | Expansion against zero external pressure (into a vacuum), so $w = 0$. | |
| indicator diagram | A plot of $p$ against $V$ for a process. The area under the curve is $\lvert w\rvert$. | |
| quasi-static process | A process slow enough that the system passes through a continuous sequence of equilibrium states, so it can be drawn as a curve on a $p$–$V$ diagram. | **[S]** |
| reversible process | A change that can be reversed by an infinitesimal change in a variable, leaving both the system and the surroundings as they were. The system stays in equilibrium with its surroundings throughout. | Quasi-static, with no dissipation. It gives the maximum work. |
| irreversible process | Any real process that cannot be undone without leaving a change in the surroundings. | Friction, finite $\Delta T$, free expansion, mixing |

### Processes
| Term | Definition | Notes |
|---|---|---|
| isothermal | At constant temperature. | |
| isobaric | At constant pressure. | |
| isochoric | At constant volume. | |
| adiabatic | With no heat transfer, $q = 0$. | |
| cyclic process | A process that returns the system to its initial state, so $\Delta(\text{any state function}) = 0$. | |

### Other kinds of work
| Term | Definition | Notes |
|---|---|---|
| generalised force / displacement | Work in any form is $dw = Y\,dX$: an intensive force $Y$ times the change of an extensive displacement $X$. | **[S][Z]** |
| surface tension $\gamma$ | The work needed to increase a surface's area by unit amount, $dw = \gamma\,dA$. | N m⁻¹ = J m⁻² |
| isothermal Young's modulus | $Y = (L/A)(\partial\mathcal F/\partial L)_T$, the stiffness of a wire. | **[Z]** |
| emf $\mathcal E$ | The potential difference of a cell on open circuit. Electrical work is $\mathcal E\,dZ$. | **[S]** |
| Curie's law | For a paramagnet, $\mathcal M = C_C\mathcal H/T$. | **[S][Z]** |

### Heat capacity and calorimetry
| Term | Definition | Notes |
|---|---|---|
| heat capacity $C$ | The heat needed to raise the temperature by one kelvin, $C = dq/dT$. | J K⁻¹. It depends on the path, so state the conditions. |
| $C_V$ | Heat capacity at constant volume, $(\partial U/\partial T)_V$. | |
| molar heat capacity | $C_m = C/n$. | J K⁻¹ mol⁻¹ |
| specific heat capacity | $C_s = C/m$. | Water: 4.18 J K⁻¹ g⁻¹ |
| calorimetry | The measurement of heat transferred during a process. | **[A]** |
| calorimeter constant $C_\text{cal}$ | The heat capacity of a calorimeter, found from a known heat input: $C_\text{cal} = q/\Delta T$. | **[A]** |
| bomb calorimeter | A constant-volume calorimeter, so $q_V = \Delta U$. | **[A]** |

---

## 2B Enthalpy
| Term | Definition | Notes |
|---|---|---|
| enthalpy $H$ | $H = U + pV$. | State function. At constant $p$ with no additional work, $\Delta H = q_p$. |
| $C_p$ | Heat capacity at constant pressure, $(\partial H/\partial T)_p$. | $C_p > C_V$ because part of the heat does expansion work. |
| heat capacity ratio $\gamma$ | $\gamma = C_p/C_V$. | 5/3 for a monatomic gas, 7/5 for a diatomic gas |
| isobaric calorimeter | A constant-pressure calorimeter, which measures $\Delta H$. | e.g. a coffee-cup calorimeter **[A]** |

---

## 2C Thermochemistry [A]

### Standard states and transitions
| Term | Definition | Notes |
|---|---|---|
| thermochemistry | The study of the energy transferred as heat in physical and chemical changes. | |
| standard state | The pure substance at exactly 1 bar, at the specified temperature. | Tables use 298.15 K. |
| standard enthalpy change $\Delta H°$ | The enthalpy change when reactants in their standard states become products in their standard states. | kJ mol⁻¹ |
| standard enthalpy of transition $\Delta_\text{trs}H°$ | The standard enthalpy change accompanying a change of physical state. | Vaporisation, fusion, sublimation |
| enthalpy of vaporisation / fusion / sublimation | The enthalpy change per mole for liquid → gas / solid → liquid / solid → gas. | $\Delta_\text{sub}H = \Delta_\text{fus}H + \Delta_\text{vap}H$ |

### Reactions
| Term | Definition | Notes |
|---|---|---|
| stoichiometric number $\nu$ | The coefficient of a species in a balanced equation. | Products positive, reactants negative, in sums like $\sum\nu_JX_J$. |
| thermochemical equation | A balanced chemical equation together with its $\Delta_rH$. | |
| reaction enthalpy $\Delta_rH$ | The change in enthalpy per mole of reaction as written. | |
| standard enthalpy of combustion $\Delta_cH°$ | The standard reaction enthalpy for complete oxidation of a compound to CO₂(g) and H₂O(l) (and N₂(g) if N is present). | Always negative |
| reference state | The most stable state of an element at the specified $T$ and 1 bar. | e.g. C(graphite), O₂(g), Hg(l) |
| standard enthalpy of formation $\Delta_fH°$ | The standard reaction enthalpy for forming 1 mol of a compound from its elements in their reference states. | $\Delta_fH° = 0$ for elements in their reference states |

### Laws and techniques
| Term | Definition | Notes |
|---|---|---|
| Hess's law | The standard enthalpy of an overall reaction is the sum of the standard enthalpies of the individual reactions it can be divided into. | It follows from $H$ being a state function. |
| Kirchhoff's law | $\Delta_rH°(T_2) = \Delta_rH°(T_1) + \int_{T_1}^{T_2}\Delta_rC_p°\,dT$ | |
| differential scanning calorimetry (DSC) | Sample and reference are heated at the same rate. The extra power the sample needs gives its excess heat capacity, and the area under the peak gives the transition enthalpy. | |
| isothermal titration calorimetry (ITC) | Measures the heat released or absorbed as one reactant is titrated into another at constant $T$. | |

---

## 2D State functions and exact differentials
| Term | Definition | Notes |
|---|---|---|
| exact differential | A differential $df$ whose integral depends only on its end points: $\int_A^Bdf = f_B - f_A$, $\oint df = 0$. | Test: $\partial M/\partial y = \partial N/\partial x$. $dU$, $dH$, $dS$. |
| inexact differential | A differential whose integral depends on the path. | $dq$, $dw$ |
| internal pressure $\pi_T$ | $\pi_T = (\partial U/\partial V)_T$, the change in internal energy with volume at constant $T$. | Units of pressure. 0 for a perfect gas; $a/V_m^2$ for vdW. |
| Joule experiment | Free expansion of a gas into a vacuum inside a water bath, looking for $\Delta T$. | None was seen, because the bath swamped it, so $\pi_T$ appeared to be 0. |
| thermodynamic equation of state | $\pi_T = T(\partial p/\partial T)_V - p$. | Derived in 3E |
| expansion coefficient $\alpha$ | $\alpha = (1/V)(\partial V/\partial T)_p$, the fractional change in volume per unit rise in $T$. | K⁻¹; $1/T$ for a perfect gas **[A]** |
| isothermal compressibility $\kappa_T$ | $\kappa_T = -(1/V)(\partial V/\partial p)_T$, the fractional decrease in volume per unit increase in $p$. | Pa⁻¹; $1/p$ for a perfect gas **[A]** |
| Joule–Thomson effect | The change in temperature of a gas expanding steadily through a throttle from high to low pressure. | |
| throttling | Steady flow through a porous plug or valve in an insulated pipe. | |
| isenthalpic | At constant enthalpy. JT expansion is isenthalpic. | |
| Joule–Thomson coefficient $\mu$ | $\mu = (\partial T/\partial p)_H$. | K bar⁻¹. $\mu > 0$ means the gas cools on expansion. |
| isothermal JT coefficient $\mu_T$ | $\mu_T = (\partial H/\partial p)_T = -C_p\mu$. | |
| inversion temperature $T_I$ | The temperature at which $\mu$ changes sign. | vdW: $T_I = 2a/Rb$ |
| inversion curve | The boundary in $p$–$T$ space inside which $\mu > 0$ (cooling). | |
| Linde refrigerator | A liquefier that repeatedly throttles a compressed gas and uses the cold gas to pre-cool the incoming gas. | |

---

## 2E Adiabatic changes
| Term | Definition | Notes |
|---|---|---|
| adiabatic change | A change with $q = 0$, so $\Delta U = w_\text{ad}$. | |
| reversible adiabatic change | An adiabatic change carried out reversibly. For a perfect gas, $pV^\gamma$ = const and $\Delta S = 0$ (isentropic). | |
| isotherm | A curve of constant $T$ on a $p$–$V$ diagram. | |
| adiabat | A curve followed in a reversible adiabatic change. It is steeper than an isotherm because $\gamma > 1$. | |
| isentropic | At constant entropy. | A reversible adiabatic process is isentropic. |

---

## 3A Second law, engines, entropy

### Spontaneity and the second law
| Term | Definition | Notes |
|---|---|---|
| spontaneous change | A change that tends to occur without needing to be driven by work from outside. | It says nothing about rate. |
| second law | The entropy of an isolated system increases in the course of a spontaneous change: $\Delta S_\text{tot} > 0$. | Equivalent statements are below. |
| dispersal of energy | The direction of spontaneous change is the one that leads to a more chaotic dispersal of the total energy of an isolated system. | **[A]** |
| perpetual motion machine of the second kind | A cyclic device that converts heat from a single reservoir entirely into work. The second law forbids it. | |
| arrow of time | Spontaneous processes are those that increase $S_\text{univ}$. This gives time a direction. | **[S]** |

### Engines
| Term | Definition | Notes |
|---|---|---|
| heat engine | A cyclic device that absorbs heat from a hot source, converts part of it into work, and rejects the rest to a cold sink. | |
| hot source / cold sink (reservoir) | A body with a heat capacity so large that its temperature stays constant as heat flows in or out. | |
| efficiency $\eta$ | Work output divided by heat absorbed from the hot source: $\eta = W/Q_H$. | $\eta < 1$ always |
| refrigerator | An engine run backwards, using work to move heat from cold to hot. Its purpose is to cool. | |
| heat pump | The same device, where the purpose is to heat the hot side. | |
| coefficient of performance (COP) | Fridge: $Q_C/W$. Heat pump: $Q_H/W$. | It can exceed 1. **[S]** |

### Carnot cycle and temperature
| Term | Definition | Notes |
|---|---|---|
| Carnot cycle | A reversible cycle of four stages: isothermal expansion at $T_H$, adiabatic expansion, isothermal compression at $T_C$, adiabatic compression. | |
| Carnot engine | A reversible engine operating on a Carnot cycle. | $\eta = 1 - T_C/T_H$ |
| Carnot's theorem | No engine operating between two reservoirs is more efficient than a reversible engine, and all reversible engines between the same two reservoirs have the same efficiency, whatever the working substance. | |
| thermodynamic temperature | The temperature defined by $T_C/T_H = Q_C/Q_H$ for a reversible engine, with $T_3$ = 273.16 K. | Independent of any substance |
| Otto cycle | The ideal petrol-engine cycle: adiabatic compression, isochoric heating, adiabatic expansion, isochoric cooling. | **[S]** |
| compression ratio $r$ | $r = V_\text{max}/V_\text{min}$. | $\eta_\text{Otto} = 1 - r^{1-\gamma}$ **[S]** |

### Entropy
| Term | Definition | Notes |
|---|---|---|
| entropy $S$ (thermodynamic) | A state function defined by $dS = dq_\text{rev}/T$. | J K⁻¹, extensive |
| integrating factor | A factor that turns an inexact differential into an exact one. $1/T$ does this for $dq_\text{rev}$. | |
| entropy of the surroundings | $\Delta S_\text{sur} = q_\text{sur}/T_\text{sur}$, valid for any process, because the surroundings act as a reservoir. | |
| Clausius inequality | $dS \ge dq/T$, equivalently $\oint dq/T \le 0$, with equality only for reversible changes. | |
| principle of entropy increase | For an isolated system, $\Delta S \ge 0$. At equilibrium, $S$ is a maximum. | |

### Statistical entropy
| Term | Definition | Notes |
|---|---|---|
| microstate | A complete specification of the state of every particle: which particle is where, or which energy level each occupies. | |
| macrostate | The state described by macroscopic variables, e.g. how many particles are in each half of a box. | Many microstates give one macrostate. |
| weight $W$ | The number of microstates corresponding to a given macrostate. | $W = N!/[n!(N - n)!]$ for two halves |
| Boltzmann formula | $S = k_B\ln W$, the statistical definition of entropy. | The logarithm makes $S$ additive. |
| statistical entropy | Entropy as a measure of the number of ways the energy and matter of a system can be arranged consistent with its macrostate. | Better phrasing than "disorder". |

---

## 3B Entropy changes
| Term | Definition | Notes |
|---|---|---|
| entropy of transition $\Delta_\text{trs}S$ | The entropy change for a phase transition at its transition temperature: $\Delta_\text{trs}H/T_\text{trs}$. | Positive for melting and vaporisation |
| transition temperature $T_\text{trs}$ | The temperature at which two phases are in equilibrium at the given pressure. | e.g. normal boiling point at 1 atm |
| Trouton's rule | Many liquids have about the same standard entropy of vaporisation, around 85 J K⁻¹ mol⁻¹. | Exceptions: H-bonded liquids such as water (109). **[A]** |
| composite process | A change in which several variables change at once. Find $\Delta S$ by splitting it into reversible steps between the same end states. | $\Delta S$ is a state function. **[A]** |

---

## Laws and principles, stated for exams
| Law | Statement |
|---|---|
| **Zeroth law** | If A is in thermal equilibrium with B, and B is in thermal equilibrium with C, then C is also in thermal equilibrium with A. |
| **First law** | The internal energy of an isolated system is constant. For a closed system, $\Delta U = q + w$, where $U$ is a state function. |
| **Second law (entropy)** | The entropy of an isolated system increases in a spontaneous change: $\Delta S_\text{tot} > 0$. It is zero only for a reversible change. |
| **Second law (Kelvin–Planck)** | No process is possible in which the sole result is the absorption of heat from a reservoir and its complete conversion into work. Equivalently, no cyclic engine works with a single reservoir. |
| **Second law (Clausius)** | Heat does not flow spontaneously from a colder body to a hotter one. No cyclic device can transfer heat from cold to hot with no other effect. |
| **Carnot's theorem** | No engine operating between two given reservoirs can be more efficient than a reversible one. All reversible engines between them have efficiency $1 - T_C/T_H$. |
| **Clausius inequality** | For any cycle, $\oint dq/T \le 0$, with equality for a reversible cycle. Equivalently, $dS \ge dq/T$. |
| **Principle of entropy increase** | The entropy of an isolated system never decreases. |
| **Boyle's law** | At fixed $n$ and $T$, $p \propto 1/V$. |
| **Charles's law** | At fixed $n$ and $p$, $V \propto T$. |
| **Avogadro's principle** | Equal volumes of gases at the same $T$ and $p$ contain the same number of molecules. |
| **Dalton's law** | The pressure of a mixture of perfect gases is the sum of their partial pressures. **[A]** |
| **Equipartition theorem** | For a sample at thermal equilibrium, the average value of each quadratic contribution to the energy is $\tfrac12k_BT$. |
| **Principle of corresponding states** | Real gases at the same reduced volume and reduced temperature exert the same reduced pressure. **[A]** |
| **Hess's law** | The standard enthalpy of an overall reaction is the sum of the standard enthalpies of the reactions it can be divided into. **[A]** |
| **Kirchhoff's law** | The change of a reaction enthalpy with temperature is given by $d\Delta_rH°/dT = \Delta_rC_p°$. **[A]** |
| **Trouton's rule** | $\Delta_\text{vap}S° \approx 85$ J K⁻¹ mol⁻¹ for many liquids at their normal boiling points. **[A]** |

---

## Easily confused pairs
| Pair | Difference |
|---|---|
| heat vs temperature | Heat is energy transferred because of $\Delta T$. Temperature is the property that decides which way heat flows. |
| heat vs internal energy | A hot body has more internal energy, not "more heat". |
| quasi-static vs reversible | Reversible = quasi-static + no dissipation (no friction, no finite-$\Delta T$ heat flow). |
| adiabatic vs isothermal | Adiabatic: $q = 0$ and $T$ usually changes. Isothermal: $T$ constant and usually $q \ne 0$. |
| free expansion vs reversible adiabatic expansion | Both have $q = 0$. Free: $w = 0$ and $\Delta T = 0$ (perfect gas), $\Delta S > 0$. Reversible adiabatic: $w < 0$, the gas cools, $\Delta S = 0$. |
| $C_V$ vs $C_p$ | $C_V = (\partial U/\partial T)_V$ and $C_p = (\partial H/\partial T)_p$; $C_p > C_V$. |
| $\Delta U$ vs $\Delta H$ | $q_V = \Delta U$ (bomb calorimeter); $q_p = \Delta H$; they differ by $\Delta(pV) = \Delta n_gRT$. |
| $\pi_T$ vs $\mu$ | $\pi_T$ is $(\partial U/\partial V)_T$ (Joule experiment). $\mu$ is $(\partial T/\partial p)_H$ (Joule–Thomson). |
| efficiency vs COP | Efficiency is $W/Q_H$ for an engine and is always below 1. COP is heat moved per unit work for a fridge or heat pump and can exceed 1. |
| Kelvin–Planck vs Clausius | One is about converting heat to work; the other is about the direction of heat flow. They are equivalent. |
| microstate vs macrostate | Microscopic arrangement vs observed state. $W$ counts the microstates in one macrostate. |
| thermodynamic vs statistical entropy | $dS = dq_\text{rev}/T$ (macroscopic, gives changes) vs $S = k\ln W$ (microscopic, gives absolute values). They agree, e.g. both give $nR\ln2$ for doubling $V$. |
| real vs Carnot efficiency | Real-engine $\eta$ is always below $\eta_\text{Carnot}$, which depends only on the two temperatures. |
