# Practice: Thermodynamics, 42 mixed questions

Recall, understanding, derivations and numericals for Atkins 1A to 3B. Do them on paper without a calculator, then open the solution.

## Part A: recall

### Problem 1 [Thermodynamics · Recall · set A1]

State the zeroth law.

*Solution.* **Zeroth law.** If system A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A and B are in thermal equilibrium with each other.

**Why it matters.** It makes **temperature** well defined: "being at the same temperature" is a transitive relation, which is what a thermometer relies on.

### Problem 2 [Thermodynamics · Recall · set A2]

Write PV in terms of ⟨v²⟩ from kinetic theory, then give ⟨E_k⟩ in terms of T.

*Solution.* **Kinetic theory** (pressure from molecular collisions with the walls):

$$PV = \tfrac13Nm\langle v^2\rangle = \tfrac23N\langle E_k\rangle$$

**Comparing** with $PV = Nk_BT$:

$$\boxed{\langle E_k\rangle = \tfrac12m\langle v^2\rangle = \tfrac32k_BT}$$

The mean translational energy per molecule depends **only on temperature**, not on the gas.

### Problem 3 [Thermodynamics · Recall · set A3]

Write the vdW equation and say what a and b represent.

*Solution.* **van der Waals equation.**

$$\left(P + \frac a{V_m^2}\right)(V_m - b) = RT$$

- **$b$**: the **excluded volume** per mole (molecules are not points: repulsion at short range).
- **$a$**: the strength of the long-range **attraction**; it reduces the pressure by $a/V_m^2$.

**Effect.** Repulsion ($b$) makes $Z > 1$; attraction ($a$) makes $Z < 1$.

### Problem 4 [Thermodynamics · Recall · set A4]

Give C_P,m − C_V,m and γ for a diatomic ideal gas at room temperature.

*Solution.* **Heat capacities of a perfect gas.**

$$C_{P,m} - C_{V,m} = R$$

**Diatomic gas at room temperature** (3 translational + 2 rotational degrees of freedom; vibration frozen out):

$$C_{V,m} = \tfrac52R,\qquad C_{P,m} = \tfrac72R,\qquad \gamma = \frac{C_P}{C_V} = \frac75$$

**Check.** Monatomic gas has $C_V = \tfrac32R$ and $\gamma = 5/3$.

### Problem 5 [Thermodynamics · Recall · set A5]

State the Kelvin-Planck and Clausius statements.

*Solution.* **Kelvin–Planck.** No cyclic device can take heat from a **single** reservoir and convert it **entirely** into work.

**Clausius.** No cyclic device can transfer heat from a **cold** body to a **hot** body with **no other effect** (it needs work).

**Equivalence.** The two statements are equivalent: a violation of one lets you build a violation of the other.

**Consequence.** Every heat engine must reject some heat to a cold reservoir, so its efficiency is below $1$.

### Problem 6 [Thermodynamics · Recall · set A6]

State the Clausius inequality and the definition of entropy.

*Solution.* **Clausius inequality.** For any cycle,

$$\oint\frac{dq}T \le 0$$

with equality for a reversible cycle.

**Entropy.** From the equality for reversible paths, $dq_\text{rev}/T$ is an exact differential:

$$dS = \frac{dq_\text{rev}}T$$

so $S$ is a **state function**. For an irreversible process $dS > dq/T$.

### Problem 7 [Thermodynamics · Recall · set A7]

Give S in terms of microstates.

*Solution.* **Boltzmann's entropy.**

$$S = k_B\ln W$$

where $W$ is the number of microstates compatible with the macrostate.

- More ways to arrange the system gives higher entropy.
- A perfect crystal at $T = 0$ has $W = 1$, so $S = 0$ (third law).

### Problem 8 [Thermodynamics · Recall · set A8]

Write the relation between T and V (and P and V) for a reversible adiabatic process.

*Solution.* **Reversible adiabatic process** of a perfect gas, with $\gamma = C_P/C_V$:

$$PV^\gamma = \text{constant},\qquad TV^{\gamma-1} = \text{constant},\qquad T^\gamma P^{1-\gamma} = \text{constant}$$

**Derivation sketch.** $dU = -P\,dV$ gives $C_V\,dT = -(nRT/V)\,dV$, so $\dfrac{dT}T = -(\gamma-1)\dfrac{dV}V$.

## Part B: understanding

### Problem 9 [Thermodynamics · Concept · set B1]

A metal bench feels colder than a wooden one. Which is colder, and what does the zeroth law say?

*Solution.* **Both benches are at the same temperature** (room temperature): they are in thermal equilibrium with the room.

**Why metal feels colder.** The metal has a much higher thermal conductivity, so it draws heat from your skin faster. What you feel is the **rate of heat flow**, not the temperature.

**Zeroth law.** Both benches are in equilibrium with the surroundings (and with a thermometer placed on either), so they share one temperature. The sensation is an unreliable thermometer.

### Problem 10 [Thermodynamics · Concept · set B2]

H₂ and O₂ share a box at 300 K. Compare ⟨E_k⟩ and v_rms.

*Solution.* **Same translational kinetic energy.** At the same $T$,

$$\langle E_k\rangle = \tfrac32k_BT\quad\text{for both gases}$$

**Different speeds.** $\tfrac12m\langle v^2\rangle$ is the same, so

$$v_\text{rms} = \sqrt{\frac{3RT}M}\propto\frac1{\sqrt M}$$

$$\frac{v_\text{rms}(\text{H}_2)}{v_\text{rms}(\text{O}_2)} = \sqrt{\frac{32}{2}} = \boxed{4}$$

Hydrogen is $4$ times faster, so it effuses and escapes faster.

### Problem 11 [Thermodynamics · Concept · set B3]

For an ideal gas, why is ΔU = nC_VΔT also valid at constant pressure?

*Solution.* **Why $\Delta U = nC_V\Delta T$ is path independent.** For a perfect gas the molecules do not interact, so $U$ depends **only on $T$**. $U$ is a state function of $T$ alone, so for any process

$$\Delta U = \int nC_V\,dT = nC_V\Delta T$$

**At constant pressure** the heat is larger:

$$q_P = nC_P\Delta T = \Delta U + P\Delta V = nC_V\Delta T + nR\Delta T$$

The extra $nR\Delta T$ goes into the **expansion work** done by the gas, not into $U$.

### Problem 12 [Thermodynamics · Concept · set B4]

Explain why an adiabat is steeper than an isotherm on a P-V diagram.

*Solution.* **Slopes.** At a given point $(P, V)$:

$$\text{isotherm } PV = c:\quad \frac{dP}{dV} = -\frac PV$$

$$\text{adiabat } PV^\gamma = c:\quad \frac{dP}{dV} = -\gamma\frac PV$$

Since $\gamma > 1$ the adiabat is **steeper**.

**Physical reason.** In an adiabatic expansion $q = 0$, so the work comes from the internal energy and the gas **cools**: the pressure falls both from the larger volume and from the lower $T$. In an isotherm, heat flows in to keep $T$ constant.

### Problem 13 [Thermodynamics · Concept · set B5]

A gas expands freely into vacuum in an insulated box. Give Q, W, ΔU and ΔS_gas, ΔS_surr, ΔS_univ. Why does ΔS_gas ≠ Q/T here?

*Solution.* **Free expansion into vacuum** (insulated, no work done):

$$Q = 0,\qquad W = 0,\qquad \Delta U = 0$$

**Entropy** (use a reversible path with the same end states, an isothermal expansion):

$$\Delta S_\text{gas} = nR\ln\frac{V_f}{V_i} > 0,\qquad \Delta S_\text{surr} = 0,\qquad \Delta S_\text{univ} = nR\ln\frac{V_f}{V_i} > 0$$

**Why $\Delta S_\text{gas}\ne Q/T$.** Here $Q = 0$ but $\Delta S > 0$. The relation $\Delta S = Q/T$ holds only for a **reversible** path; this process is irreversible, so $\Delta S > Q/T$.

### Problem 14 [Thermodynamics · Concept · set B6]

Explain the sign of μ_JT for He versus CO₂ at room temperature.

*Solution.* **Joule–Thomson coefficient** $\mu_{JT} = (\partial T/\partial P)_H$.

**Helium.** Its inversion temperature is about $40$ K, far below room temperature. Above the inversion temperature **repulsion** dominates, the gas warms on expansion, and $\mu_{JT}<0$ at room temperature (a slight warming).

**CO$_2$.** It has a large attraction parameter $a$ (and a high inversion temperature, $\sim2000$ K). At room temperature attraction dominates: the molecules do work against attraction as they separate, the gas **cools**, and $\mu_{JT}\approx+1.1$ K/atm.

**Use.** Liquefying gases in refrigerators and the Linde process.

### Problem 15 [Thermodynamics · Concept · set B7]

Why can heat engines never be 100% efficient even without friction?

*Solution.* **Kelvin–Planck.** A cycle that takes heat $Q_H$ and converts all of it to work is forbidden, so $Q_C > 0$ always and $\eta = W/Q_H < 1$.

**Even without friction.** For a **reversible** (frictionless) engine

$$\eta_\text{max} = 1 - \frac{T_C}{T_H} < 1$$

as long as $T_C > 0$.

**Reason.** The engine must return to its initial state, so it must dump some entropy; the only way is to reject heat to a colder reservoir.

### Problem 16 [Thermodynamics · Concept · set B8]

Water freezes in a freezer. Signs of ΔS_water and ΔS_univ?

*Solution.* **Water** ($\Delta S_\text{water}$): freezing orders the molecules, so

$$\Delta S_\text{water} < 0$$

**Universe.** The released latent heat plus the compressor work are dumped into the room, increasing $S_\text{surr}$ by **more** than the water loses:

$$\Delta S_\text{univ} = \Delta S_\text{water} + \Delta S_\text{surr} > 0$$

**Lesson.** A local decrease of entropy is allowed as long as the total increases.

### Problem 17 [Thermodynamics · Concept · set B9]

For a vdW gas, why is π_T = a/V_m² > 0?

*Solution.* **Internal pressure.**

$$\pi_T = \left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial P}{\partial T}\right)_V - P$$

**van der Waals gas.** $P = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$, so $(\partial P/\partial T)_V = \dfrac R{V_m - b}$:

$$\pi_T = \frac{RT}{V_m - b} - P = \boxed{\frac a{V_m^2}} > 0$$

**Meaning.** It comes only from the attraction term $a$: expanding the gas pulls the molecules apart against their attraction, so $U$ increases with $V$. A perfect gas has $\pi_T = 0$.

### Problem 18 [Thermodynamics · Concept · set B10]

Why is the Carnot efficiency independent of the working substance?

*Solution.* **Carnot's theorem.** All reversible engines operating between the same two temperatures have the **same efficiency**, independent of the working substance.

**Proof by contradiction.** Suppose reversible engine A is more efficient than reversible engine B.

1. Run A as an engine and B **in reverse** as a refrigerator, using A's work to drive B.
2. The net result would be heat transferred from the cold to the hot reservoir with **no work input**.
3. That violates the Clausius statement.

Hence $\eta_A = \eta_B$, and since both depend only on the reservoir temperatures, $\eta = 1 - T_C/T_H$.

## Part C: derivations

### Problem 19 [Thermodynamics · Derivation · set C1] (hard)

Derive P = (N m⟨v_x²⟩)/V for a cubic box and hence ⟨E_k⟩ = 3k_BT/2.

*Solution.* **One molecule, one wall.** A molecule with $x$-velocity $v_x$ in a cubic box of side $L$ hits the wall, bounces back, and changes momentum by $\Delta p = 2mv_x$. The time between hits on the same wall is $\Delta t = 2L/v_x$, so the average force it exerts is

$$F = \frac{\Delta p}{\Delta t} = \frac{mv_x^2}L$$

**Sum over $N$ molecules.**

$$P = \frac F{L^2} = \frac m{L^3}\sum v_x^2 = \frac{Nm\langle v_x^2\rangle}V$$

**Isotropy:** $\langle v_x^2\rangle = \langle v^2\rangle/3$, so

$$PV = \tfrac13Nm\langle v^2\rangle$$

Compare with $PV = Nk_BT$:

$$\boxed{\tfrac12m\langle v^2\rangle = \tfrac32k_BT}$$

### Problem 20 [Thermodynamics · Derivation · set C2] (hard)

Derive v_mp = √(2RT/M) from the Maxwell-Boltzmann distribution.

*Solution.* **Maxwell speed distribution.** $f(v)\propto v^2e^{-Mv^2/2RT}$. The most probable speed is where $f$ is maximum:

$$\frac d{dv}\left[v^2e^{-Mv^2/2RT}\right] = \left(2v - \frac{Mv^3}{RT}\right)e^{-Mv^2/2RT} = 0$$

$$2 = \frac{Mv^2}{RT}\ \Rightarrow\ \boxed{v_p = \sqrt{\frac{2RT}M}}$$

**Comparison.** $v_p < \bar v = \sqrt{8RT/\pi M} < v_\text{rms} = \sqrt{3RT/M}$, in the ratio $1 : 1.13 : 1.22$.

### Problem 21 [Thermodynamics · Derivation · set C3] (hard)

Starting from nC_V dT = −P dV, derive PV^γ = const.

*Solution.* **Adiabatic:** $q = 0$, so $dU = -P\,dV$. For a perfect gas $dU = nC_V\,dT$ and $P = nRT/V$:

$$nC_V\,dT = -\frac{nRT}V\,dV\ \Rightarrow\ \frac{dT}T = -\frac R{C_V}\frac{dV}V = -(\gamma - 1)\frac{dV}V$$

using $R/C_V = (C_P - C_V)/C_V = \gamma - 1$.

**Integrate:**

$$\ln T = -(\gamma-1)\ln V + \text{const}\ \Rightarrow\ \boxed{TV^{\gamma-1} = \text{constant}}$$

**With $T = PV/nR$:**

$$\boxed{PV^\gamma = \text{constant}}$$

### Problem 22 [Thermodynamics · Derivation · set C4] (hard)

Derive η_Carnot = 1 − T_C/T_H for an ideal gas.

*Solution.* **Isotherms** (reversible, perfect gas): $\Delta U = 0$, so $q = -w$:

$$Q_H = nRT_H\ln\frac{V_2}{V_1},\qquad Q_C = nRT_C\ln\frac{V_3}{V_4}$$

(the gas expands $V_1\to V_2$ at $T_H$ and is compressed $V_3\to V_4$ at $T_C$).

**Adiabats:** $TV^{\gamma-1}$ is constant on each:

$$T_HV_2^{\gamma-1} = T_CV_3^{\gamma-1},\qquad T_HV_1^{\gamma-1} = T_CV_4^{\gamma-1}$$

Dividing: $\dfrac{V_2}{V_1} = \dfrac{V_3}{V_4}$, so the logarithms in $Q_H$ and $Q_C$ are equal and

$$\frac{Q_C}{Q_H} = \frac{T_C}{T_H}\ \Rightarrow\ \boxed{\eta = 1 - \frac{Q_C}{Q_H} = 1 - \frac{T_C}{T_H}}$$

### Problem 23 [Thermodynamics · Derivation · set C5] (hard)

Show that a 100%-efficient engine violating Kelvin-Planck can be built from a Clausius-violating "perfect fridge" plus an ordinary engine.

*Solution.* **Claim.** If Kelvin–Planck were violated, so would Clausius (and conversely).

**Proof.** Suppose a "perfect" refrigerator $R^*$ moved heat $Q_C$ from the cold to the hot reservoir with **no work**.

Couple it with an ordinary engine that takes $Q_H$ from the hot reservoir, rejects $Q_C$ to the cold one and does work $W = Q_H - Q_C$.

**Net effect:**

- The cold reservoir is **unchanged** (it gives $Q_C$ to the engine's rejection and receives $Q_C$ from the fridge).
- The hot reservoir loses $Q_H - Q_C$.
- That heat is **entirely converted to work** $W$.

This is a cyclic device taking heat from a **single** reservoir and turning it all into work: it violates **Kelvin–Planck**. So the two statements are equivalent.

### Problem 24 [Thermodynamics · Derivation · set C6] (hard)

Show that Joule-Thomson expansion is isenthalpic.

*Solution.* **Setup.** A gas is forced through a porous plug (Joule–Thomson): initial state $(P_i, V_i, U_i)$ to final $(P_f, V_f, U_f)$, thermally insulated, so $q = 0$.

**Work done on the gas.** The upstream piston does $+P_iV_i$ and the gas does $P_fV_f$ pushing the downstream piston:

$$W = P_iV_i - P_fV_f$$

**First law:** $U_f - U_i = q + W = P_iV_i - P_fV_f$, so

$$U_f + P_fV_f = U_i + P_iV_i\ \Rightarrow\ \boxed{H_f = H_i}$$

The expansion is **isenthalpic**, and the temperature change is given by $\mu_{JT} = (\partial T/\partial P)_H$.

### Problem 25 [Thermodynamics · Derivation · set C7] (hard)

Show that S = k_B ln W gives ΔS = nR ln 2 for the free expansion that doubles the volume.

*Solution.* **Microstates.** Each of the $N$ molecules independently has access to twice as many positions when the volume doubles, so

$$\frac{W_f}{W_i} = 2^N$$

**Boltzmann.**

$$\Delta S = k_B\ln\frac{W_f}{W_i} = k_B\ln2^N = Nk_B\ln2 = \boxed{nR\ln2}$$

**Check.** This is the Clausius result for an isothermal reversible doubling, $\Delta S = nR\ln(V_f/V_i) = nR\ln2$ ✓: the statistical and thermodynamic entropies agree.

## Part D: numerical problems

### Problem 26 [Thermodynamics · Numerical · set D1]

2.00 mol of an ideal monatomic gas is heated from 300 K to 400 K at constant pressure. Find Q, W, ΔU, ΔH.

*Solution.* **Idea.** Constant pressure: $Q = nC_{P}\Delta T$, $\Delta U = nC_V\Delta T$, $W = -P\Delta V = -nR\Delta T$. For a monatomic gas $C_V = \tfrac32R$ and $C_P = \tfrac52R$.

$$Q = nC_P\Delta T = 2(2.5)(8.314)(100) = \boxed{+4157\ \text{J}}$$

$$\Delta U = nC_V\Delta T = 2(1.5)(8.314)(100) = \boxed{2494\ \text{J}}$$

$$W = -nR\Delta T = -2(8.314)(100) = \boxed{-1663\ \text{J}}\ (\text{done by the gas})$$

$$\Delta H = Q_P = \boxed{4157\ \text{J}}$$

**Check.** $Q + W = 4157 - 1663 = 2494 = \Delta U$ ✓.

### Problem 27 [Thermodynamics · Numerical · set D2]

1.00 mol of an ideal gas is compressed reversibly and isothermally at 300 K from 20 L to 5 L. Find W, Q, ΔS_gas, ΔS_surr, ΔS_univ. (Use ln 4 = 1.386.)

*Solution.* **Idea.** Isothermal reversible: $\Delta U = 0$, $W = -nRT\ln(V_2/V_1)$ (energy convention: $W>0$ done on the gas).

$$W = -nRT\ln\frac{V_2}{V_1} = -(8.314)(300)\ln\frac14 = +2494\times1.386 = \boxed{+3458\ \text{J}}$$

$$Q = -W = \boxed{-3458\ \text{J}}\quad(\text{heat leaves the gas})$$

**Entropy.**

$$\Delta S_\text{gas} = nR\ln\frac{V_2}{V_1} = 8.314\ln\frac14 = \boxed{-11.5\ \text{J/K}}$$

$$\Delta S_\text{surr} = -\frac QT = \boxed{+11.5\ \text{J/K}},\qquad \Delta S_\text{univ} = \boxed{0}\ (\text{reversible})$$

### Problem 28 [Thermodynamics · Numerical · set D3]

1.00 mol of ideal monatomic gas at 300 K and 1 bar is compressed reversibly and adiabatically to 1/8 of its volume. Find T₂, P₂, and W.

*Solution.* **Idea.** Reversible adiabatic compression of a monatomic gas, $\gamma = 5/3$, so $\gamma - 1 = 2/3$.

$$T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma-1} = 300\times8^{2/3} = 300\times4 = \boxed{1200\ \text{K}}$$

$$P_2 = P_1\left(\frac{V_1}{V_2}\right)^\gamma = 1\times8^{5/3} = \boxed{32\ \text{bar}}$$

**Work.** $q = 0$, so $W = \Delta U = nC_V\Delta T$:

$$W = \tfrac32(8.314)(900) = \boxed{+11.2\ \text{kJ}}$$

**Check.** $P_2V_2/T_2 = 32\times(1/8)/1200 = 1/300 = P_1V_1/T_1$ ✓.

### Problem 29 [Thermodynamics · Numerical · set D4]

Find v_rms of O₂ at 400 K (M = 32 g/mol). By what factor does v_rms of H₂ exceed that of O₂ at the same T?

*Solution.* **Idea.** $v_\text{rms} = \sqrt{3RT/M}$ with $M$ in kg/mol.

$$v_\text{rms}(\text{O}_2) = \sqrt{\frac{3(8.314)(400)}{0.032}} = \sqrt{3.12\times10^5} = \boxed{558\ \text{m/s}}$$

**H$_2$ versus O$_2$.** $v_\text{rms}\propto M^{-1/2}$:

$$\frac{v(\text{H}_2)}{v(\text{O}_2)} = \sqrt{\frac{32}{2}} = \boxed{4}$$

### Problem 30 [Thermodynamics · Numerical · set D5]

1.00 mol of N₂ (a = 1.370, b = 0.0387 in L, bar, mol) is held in 0.500 L at 298 K. Compute P_ideal, P_vdW and Z.

*Solution.* **Idea.** Compare $P = RT/V_m$ (ideal) with the van der Waals pressure $P = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$. $RT = 0.08314\times298 = 24.78$ L bar/mol and $V_m = 0.500$ L/mol.

$$P_\text{ideal} = \frac{24.78}{0.500} = \boxed{49.6\ \text{bar}}$$

$$P_\text{vdW} = \frac{24.78}{0.500 - 0.0387} - \frac{1.370}{0.500^2} = 53.7 - 5.5 = \boxed{48.2\ \text{bar}}$$

$$Z = \frac{PV_m}{RT} = \frac{48.2}{49.6} = \boxed{0.973}$$

**Comment.** $Z < 1$: the attraction ($a$) slightly wins over the repulsion ($b$) at this density.

### Problem 31 [Thermodynamics · Numerical · set D6]

Use T_I = 2a/(Rb) to estimate the inversion temperature of N₂.

*Solution.* **Idea.** The van der Waals inversion temperature (low-pressure limit) is

$$T_I = \frac{2a}{Rb}$$

$$T_I = \frac{2(1.370)}{(0.08314)(0.0387)} = \frac{2.74}{3.22\times10^{-3}} \approx \boxed{850\ \text{K}}$$

**Comparison.** The measured value is $621$ K. The van der Waals model overestimates it, but gets the right magnitude, and it is well above room temperature, so N$_2$ cools on expansion at $300$ K.

### Problem 32 [Thermodynamics · Numerical · set D7]

A Carnot engine runs between 600 K and 300 K and absorbs 1200 J per cycle. Find η, W, Q_C and ΔS_univ per cycle.

*Solution.* **Idea.** A reversible engine has $\eta = 1 - T_C/T_H$, $W = \eta Q_H$, $Q_C = Q_H - W$.

$$\eta = 1 - \frac{300}{600} = \boxed{0.5}$$

$$W = 0.5\times1200 = \boxed{600\ \text{J}},\qquad Q_C = 1200 - 600 = \boxed{600\ \text{J}}$$

**Entropy of the universe.**

$$\Delta S_\text{univ} = -\frac{1200}{600} + \frac{600}{300} = -2 + 2 = \boxed{0}$$

as expected for a reversible cycle.

### Problem 33 [Thermodynamics · Numerical · set D8]

Find the maximum COP of a refrigerator working between 270 K (inside) and 300 K (room).

*Solution.* **Idea.** For a refrigerator (a reversed Carnot engine), the coefficient of performance is the heat removed per unit work:

$$\text{COP}_\text{max} = \frac{T_C}{T_H - T_C} = \frac{270}{300 - 270} = \boxed{9}$$

**Meaning.** For each joule of work, at most $9$ J of heat is removed from the inside. Real fridges have a COP of about $3$ to $5$. A smaller temperature difference gives a better COP.

### Problem 34 [Thermodynamics · Numerical · set D9]

An inventor claims an engine that takes 800 J at 500 K, rejects 400 J at 300 K, and does 400 J of work. Is it possible?

*Solution.* **First law.** $Q_H = W + Q_C$: $800 = 400 + 400$ ✓.

**Second law.** Compare with the Carnot limit:

$$\eta_\text{claimed} = \frac W{Q_H} = \frac{400}{800} = 0.5,\qquad \eta_\text{Carnot} = 1 - \frac{300}{500} = 0.4$$

$$0.5 > 0.4\ \Rightarrow\ \boxed{\text{impossible}}$$

**Alternative check.** $\Delta S_\text{univ} = -\dfrac{800}{500} + \dfrac{400}{300} = -1.60 + 1.33 = -0.27$ J/K $< 0$, violating the second law.

### Problem 35 [Thermodynamics · Numerical · set D10]

Compute ΔS for 2.00 kg of water heated from 20 °C to 50 °C (c = 4180 J/kg/K; ln(323.15/293.15) = 0.0974).

*Solution.* **Idea.** Heating at (roughly) constant $c$: $dS = dq/T = mc\,dT/T$.

$$\Delta S = mc\ln\frac{T_f}{T_i} = (2.00)(4180)\ln\frac{323.15}{293.15}$$

$$= 8360\times0.0974 = \boxed{+814\ \text{J/K}}$$

**Check.** Positive, as expected for heating.

### Problem 36 [Thermodynamics · Numerical · set D11]

Mix 1.00 kg of water at 90 °C with 1.00 kg at 10 °C in an insulated vessel. Find the final T and ΔS_univ (use ln 1.0156 ≈ 0.0155 for the argument you get).

*Solution.* **Final temperature.** Equal masses: $T_f = \dfrac{90 + 10}2 = 50\,^\circ\text{C} = 323.15$ K.

**Entropy.** Each kilogram changes by $mc\ln(T_f/T_i)$:

$$\Delta S_\text{hot} = 4180\ln\frac{323.15}{363.15},\qquad \Delta S_\text{cold} = 4180\ln\frac{323.15}{283.15}$$

$$\Delta S = 4180\ln\frac{323.15^2}{363.15\times283.15} = 4180\ln1.0156 = 4180\times0.0155 = \boxed{+65\ \text{J/K}}$$

**Comment.** $\Delta S_\text{univ} > 0$: mixing at different temperatures is irreversible.

### Problem 37 [Thermodynamics · Numerical · set D12]

600 J of heat flows from a body at 600 K to one at 300 K (both large). Compute ΔS_univ.

*Solution.* **Idea.** Heat leaves the hot body (losing entropy) and enters the cold body (gaining more).

$$\Delta S_\text{univ} = -\frac{600}{600} + \frac{600}{300} = -1 + 2 = \boxed{+1.0\ \text{J/K}}$$

**Comment.** Positive, as the second law requires; heat flowing spontaneously from hot to cold is irreversible. (The bodies are large, so their temperatures stay fixed.)

### Problem 38 [Thermodynamics · Numerical · set D13]

Boiling 2.00 mol of water at 373.15 K (ΔH_vap = 40.7 kJ/mol): find ΔS_sys and ΔS_surr (reversible).

*Solution.* **Idea.** Boiling at the boiling point is reversible, so $\Delta S_\text{sys} = \Delta H/T$.

$$\Delta S_\text{sys} = \frac{n\Delta_\text{vap}H}T = \frac{2(40\,700)}{373.15} = \boxed{+218\ \text{J/K}}$$

$$\Delta S_\text{surr} = -218\ \text{J/K},\qquad \Delta S_\text{univ} = \boxed{0}$$

**Comment.** At equilibrium, the total entropy does not change.

### Problem 39 [Thermodynamics · Numerical · set D14]

For 6 labelled particles in a two-halved box, how many microstates have 3 on the left? Give S in terms of k_B, and the probability of 3-3 versus 6-0.

*Solution.* **Number of microstates** with $3$ of the $6$ labelled particles on the left:

$$W = \binom63 = \frac{6!}{3!\,3!} = \boxed{20}$$

$$S = k_B\ln20 = \boxed{3.0\,k_B}$$

**Probabilities** (each of the $2^6 = 64$ arrangements is equally likely):

$$P(3\text{–}3) = \frac{20}{64} = \boxed{0.31},\qquad P(6\text{–}0) = \frac1{64} = \boxed{0.016}$$

**Meaning.** The even split is the most probable macrostate; for $10^{23}$ particles the imbalance is so improbable that it never happens.

### Problem 40 [Thermodynamics · Numerical · set D15]

An Otto engine has compression ratio r = 10 and γ = 1.4. Find η (10^0.4 ≈ 2.51).

*Solution.* **Idea.** Otto cycle efficiency depends only on the compression ratio $r = V_A/V_B$:

$$\eta = 1 - \frac1{r^{\gamma-1}} = 1 - \frac1{10^{0.4}} = 1 - \frac1{2.51} = \boxed{0.60}$$

**Comment.** The Carnot limit between the same extreme temperatures would be higher. Real petrol engines reach about $30$ to $40\%$ because of friction, heat loss and incomplete combustion.

### Problem 41 [Thermodynamics · Numerical · set D16]

A constant-volume gas thermometer reads 6.69 kPa at the triple point of water. What does it read at 100 °C, and what temperature corresponds to 8.00 kPa? (Tutorial P1.)

*Solution.* **Idea.** A constant-volume gas thermometer has $T\propto P$, with the triple point $T_3 = 273.16$ K at $P_3 = 6.69$ kPa.

**At $100\,^\circ$C** ($373.15$ K):

$$P = P_3\frac T{T_3} = 6.69\times\frac{373.15}{273.16} = \boxed{9.14\ \text{kPa}}$$

**For $8.00$ kPa:**

$$T = T_3\frac P{P_3} = 273.16\times\frac{8.00}{6.69} = 326.7\ \text{K} = \boxed{53.5\,^\circ\text{C}}$$

### Problem 42 [Thermodynamics · Numerical · set D17]

5.00 mol of He in a 1.00 L cylinder at 298 K. Compute P_ideal and P_vdW (a = 0.0346, b = 0.0238), and state which term dominates. (Tutorial P4.)

*Solution.* **Idea.** Compare $P = RT/V_m$ with $P = \dfrac{RT}{V_m - b} - \dfrac a{V_m^2}$. $V_m = 1.00/5.00 = 0.200$ L/mol, $RT = 24.78$ L bar/mol.

$$P_\text{ideal} = \frac{24.78}{0.200} = \boxed{124\ \text{bar}}$$

$$P_\text{vdW} = \frac{24.78}{0.200 - 0.0238} - \frac{0.0346}{0.200^2} = 140.6 - 0.9 = \boxed{140\ \text{bar}}$$

**Which dominates.** The $b$ term (repulsion, excluded volume) dominates, because helium's attraction $a$ is tiny. So $P_\text{vdW} > P_\text{ideal}$, $Z = 140/124\approx1.13 > 1$.

