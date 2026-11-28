# Practice: Endsem set 2, this year's new syllabus areas

A full 50-mark paper in the 2025 format, aimed at the syllabus parts the past papers barely touched.

**120 min, 50 marks, calculator allowed.** It covers modelling and scientific method, Atkins thermo (1A–3E), central force, rocket motion, calculus of variations, Hamilton's principle and STR kinematics. Solutions are collapsed under each question, so you can sit it as a paper.

Constants: $g = 9.8$ m/s², $GM_{Earth} = 3.986\times10^{14}$ m³/s², $R = 8.314$ J/(mol K) $= 0.08314$ L bar/(mol K), $c = 3\times10^8$ m/s, 1 ly = c × 1 yr.

## Part I (17 × 2 marks)

### Problem 1 [Set 2 Q1 (2)]

**(Modelling)** Coffee at 90 °C in a 20 °C room cools to 60 °C in 10 min. Using Newton's law of cooling $dT/dt = -k(T - T_{room})$, find when it reaches 40 °C.

*Solution.* $T - 20 = 70e^{-kt}$. At t = 10: $40/70 = e^{-10k}$, so $k = \ln(7/4)/10 = 0.0560$ min⁻¹. For 40 °C: $20/70 = e^{-kt}$, so $t = \ln3.5/k = \mathbf{22.4}$ min.

### Problem 2 [Set 2 Q2 (2)]

**(Modelling)** In the logistic model $\dot N = rN(1 - N/K)$ with r, K > 0, find the fixed points and their stability. What does K mean physically?

*Solution.* The fixed points are N* = 0 and N* = K. Let $f(N) = rN(1 - N/K)$, so $f'(N) = r(1 - 2N/K)$. Then $f'(0) = r > 0$ (unstable) and $f'(K) = -r < 0$ (stable). K is the carrying capacity: the population the environment can sustain.

### Problem 3 [Set 2 Q3 (2)]

**(Scientific method)** "All swans are white" has been confirmed by 10,000 observations. Is it proven? What single observation changes the situation, and which principle of the scientific method does this show?

*Solution.* It is not proven, because no finite number of confirmations proves a universal claim (the problem of induction). One black swan **falsifies** it. This shows falsifiability (Popper): a scientific claim must risk being refuted, and theories are kept only provisionally.

### Problem 4 [Set 2 Q4 (2)]

A block rests on an incline with $\mu_s = 0.40$ and $\mu_k = 0.30$. The angle is raised to 30°. Does the block slide? If so, find its acceleration.

*Solution.* $\tan30° = 0.577 > \mu_s = 0.40$, so it **slides**. $a = g(\sin30° - \mu_k\cos30°) = 9.8(0.5 - 0.260) = \mathbf{2.35}$ m/s².

### Problem 5 [Set 2 Q5 (2)]

Is $\vec F = (2xy,\ x^2 + z,\ y)$ conservative? If so, find a potential U with $\vec F = -\nabla U$.

*Solution.* $\nabla\times\vec F$: x-component $\partial_yF_z - \partial_zF_y = 1 - 1 = 0$; y-component $\partial_zF_x - \partial_xF_z = 0$; z-component $\partial_xF_y - \partial_yF_x = 2x - 2x = 0$. So it is **conservative**, and $U = -(x^2y + yz)$ (+ const).

### Problem 6 [Set 2 Q6 (2)]

**(Calculus of variations)** Find the Euler–Lagrange equation for $J[y] = \int(y'^2 + y^2)\,dx$ and its general solution. Then do the same for $J = \int\sqrt{1 + y'^2}\,dx$ and say what curve it gives.

*Solution.* For $f = y'^2 + y^2$: $\dfrac{d}{dx}(2y') - 2y = 0$, so $y'' = y$ and $y = Ae^x + Be^{-x}$. For $f = \sqrt{1+y'^2}$ (with no y), $\partial f/\partial y' = y'/\sqrt{1+y'^2} = $ const, so y' is constant: **a straight line** (the shortest path in a plane).

### Problem 7 [Set 2 Q7 (2)]

A bead slides without friction on a straight wire rotating in a horizontal plane at constant ω. Its Lagrangian is $\mathcal L = \tfrac12 m(\dot r^2 + \omega^2r^2)$. Find the equation of motion. Is $H = p_r\dot r - \mathcal L$ conserved? Is it equal to the energy?

*Solution.* $p_r = m\dot r$ and $m\ddot r = m\omega^2r$, so $r = Ae^{\omega t} + Be^{-\omega t}$ (the bead flies outward). $H = \tfrac12 m\dot r^2 - \tfrac12 m\omega^2r^2$ is **conserved** (no explicit t) but is **not** the energy $\tfrac12 m(\dot r^2 + \omega^2r^2)$. The constraint is time-dependent, and the wire does work on the bead, so the energy keeps increasing.

### Problem 8 [Set 2 Q8 (2)]

Find the radius of a geostationary orbit (sidereal day 86,164 s).

*Solution.* $r^3 = GMT^2/4\pi^2$, so $r = (3.986\times10^{14}\cdot86164^2/4\pi^2)^{1/3} = \mathbf{4.22\times10^7}$ m (42,200 km, or about 35,800 km above the surface).

### Problem 9 [Set 2 Q9 (2)]

A 70 kg person walks 5.0 m from one end of a 140 kg boat to the other on frictionless water. How far does the boat move, and why?

*Solution.* There is no external horizontal force, so the centre of mass stays put. $70(5 - d) = 140d$ gives $d = 350/210 = \mathbf{1.67}$ m, opposite to the walk.

### Problem 10 [Set 2 Q10 (2)]

**(Rocket)** A rocket in free space ejects gas at 2.5 km/s relative to itself. What speed does it gain when its mass falls to one-fifth of its initial value?

*Solution.* $\Delta v = u\ln(m_0/m) = 2.5\ln5 = \mathbf{4.02}$ km/s. This is the rocket equation, which follows from momentum conservation of rocket plus exhaust.

### Problem 11 [Set 2 Q11 (2)]

A pion (proper lifetime 26 ns) moves at 0.95c in the lab. How far does it travel, on average, before decaying? What would classical physics predict?

*Solution.* γ = 3.20, so the lab lifetime is γτ = 83 ns and the distance is $\gamma v\tau = 3.20(0.95)(3\times10^8)(26\times10^{-9}) = \mathbf{23.7}$ m. Classical physics gives $v\tau = 7.4$ m.

### Problem 12 [Set 2 Q12 (2)]

A spaceship moving at 0.80c fires a probe forward at 0.60c relative to itself. Find the probe's speed relative to Earth.

*Solution.* $u = \dfrac{0.8 + 0.6}{1 + 0.48}c = \mathbf{0.946c}$, still below c.

### Problem 13 [Set 2 Q13 (2)]

A twin travels at 0.80c to a star 4.0 ly away and returns. Find the elapsed time for the Earth twin and for the travelling twin.

*Solution.* Earth frame: $t = 8.0\text{ ly}/0.8c = \mathbf{10}$ yr. Traveller: $t/\gamma = 10\times0.6 = \mathbf{6}$ yr. The traveller ages less because they change inertial frames at the turnaround.

### Problem 14 [Set 2 Q14 (2)]

**(1C)** For N₂, $a = 1.370$ L² bar mol⁻² and $b = 0.0387$ L mol⁻¹. Find the van der Waals Boyle temperature $T_B = a/Rb$. Is Z above or below 1 at 300 K and low pressure? Why?

*Solution.* $T_B = 1.370/(0.08314\times0.0387) = \mathbf{426}$ K. At 300 K < $T_B$, the low-pressure slope of Z is $(b - a/RT)/RT < 0$, so **Z < 1**: attractions dominate.

### Problem 15 [Set 2 Q15 (2)]

**(2C)** Given $\Delta_cH°$ (kJ/mol): C(graphite) −393.5, H₂(g) −285.8, CH₄(g) −890.4, find $\Delta_fH°$(CH₄).

*Solution.* $\Delta_fH = \Delta_cH(\text{C}) + 2\Delta_cH(\text{H}_2) - \Delta_cH(\text{CH}_4) = -393.5 - 571.6 + 890.4 = \mathbf{-74.7}$ kJ/mol (Hess's law).

### Problem 16 [Set 2 Q16 (2)]

**(2B)** For N₂(g) + 3H₂(g) → 2NH₃(g), $\Delta_rH° = -92.2$ kJ/mol at 298 K. Find $\Delta_rU°$.

*Solution.* $\Delta n_g = 2 - 4 = -2$. $\Delta U = \Delta H - \Delta n_gRT = -92.2 + 2(8.314\times10^{-3})(298) = \mathbf{-87.2}$ kJ/mol.

### Problem 17 [Set 2 Q17 (2)]

**(3D)** A reaction has $\Delta H = -100$ kJ/mol and $\Delta S = -200$ J/(K mol), both roughly independent of T. In what temperature range is it spontaneous at constant T and p?

*Solution.* It is spontaneous when $\Delta G = \Delta H - T\Delta S < 0$, that is when $T < \Delta H/\Delta S = 100{,}000/200 = \mathbf{500\ K}$. At low T, the favourable enthalpy wins. At high T, the entropy loss wins.

## Part II

### Problem 18 [Set 2 Q18]

**Carnot cycle with entropy bookkeeping.** (7 marks) One mole of a diatomic ideal gas ($\gamma = 1.4$) runs a Carnot cycle between 500 K and 300 K. The isothermal expansion at 500 K goes from 10.0 L to 30.0 L.

- (a) Find the volumes at the end of the adiabatic expansion and at the end of the isothermal compression. (2)
- (b) Find $Q_H$, $Q_C$, W and η, and check η against $1 - T_C/T_H$. (2)
- (c) Give $\Delta S_{gas}$ for each of the four steps, and $\Delta S_{universe}$ for the cycle. (2)
- (d) If the 500 K isothermal expansion were instead a free expansion into vacuum (same initial and final volumes), what would $\Delta S_{gas}$ and $\Delta S_{universe}$ be for that step? (1)

*Solution.*

- (a) $TV^{\gamma-1} = $ const, so $V_3 = V_2(T_H/T_C)^{1/(\gamma-1)} = 30(5/3)^{2.5} = 30\times3.586 = \mathbf{107.6}$ L and $V_4 = 10\times3.586 = \mathbf{35.9}$ L.
- (b) $Q_H = RT_H\ln3 = 8.314(500)(1.0986) = \mathbf{4.57}$ kJ. $Q_C = RT_C\ln(V_3/V_4) = RT_C\ln3 = \mathbf{2.74}$ kJ. $W = \mathbf{1.83}$ kJ. $\eta = 0.40 = 1 - 300/500$ ✓.
- (c) Isothermal expansion: $+R\ln3 = \mathbf{+9.13}$ J/K. Both adiabats: 0. Isothermal compression: −9.13 J/K. Gas over the cycle: 0. The reservoirs get −4567/500 + 2740/300 = 0, so $\Delta S_{univ} = \mathbf{0}$ (reversible).
- (d) S is a state function, so $\Delta S_{gas} = R\ln3 = \mathbf{+9.13}$ J/K as before. But Q = 0 and the surroundings do not change, so $\Delta S_{univ} = \mathbf{+9.13}$ J/K > 0 (irreversible).

### Problem 19 [Set 2 Q19]

**Bead on a rotating hoop.** (5 marks) A bead of mass m slides without friction on a vertical circular hoop of radius R = 0.10 m that spins about its vertical diameter at ω = 20 rad/s. θ is measured from the bottom. Take $\mathcal L = \tfrac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta) + mgR\cos\theta$.

- (a) Write the Euler–Lagrange equation. (1)
- (b) Find all the equilibrium angles. (2)
- (c) Which ones are stable for these numbers? What changes if ω < $\sqrt{g/R}$? (2)

*Solution.*

- (a) $mR^2\ddot\theta = mR^2\omega^2\sin\theta\cos\theta - mgR\sin\theta$, which gives $\ddot\theta = \sin\theta(\omega^2\cos\theta - g/R)$.
- (b) Equilibria are where $\sin\theta = 0$ (θ = 0 or π) or where $\cos\theta = g/(\omega^2R) = 9.8/40 = 0.245$, which gives $\theta = \mathbf{\pm75.8°}$. The off-axis pair exists only because $\omega^2 > g/R = 98$ s⁻².
- (c) Here ω² = 400 > 98, so the bottom (θ = 0) is **unstable** (linearising, $\ddot\theta \approx (\omega^2 - g/R)\theta$ grows), θ = 75.8° is **stable**, and the top (θ = π) is always unstable. If ω < $\sqrt{g/R} = 9.9$ rad/s, only θ = 0 is stable and the bead stays at the bottom.

### Problem 20 [Set 2 Q20]

**Elliptical orbit.** (4 marks) A satellite's perigee is 7000 km and its apogee is 10,000 km from Earth's centre.

- (a) Find the semi-major axis, the eccentricity and the period. (2)
- (b) Find the speeds at perigee and apogee, and check them with angular-momentum conservation. (2)

*Solution.*

- (a) $a = (7000 + 10000)/2 = \mathbf{8500}$ km. $e = (r_a - r_p)/(r_a + r_p) = \mathbf{0.176}$. $T = 2\pi\sqrt{a^3/GM} = \mathbf{130}$ min.
- (b) From vis-viva, $v^2 = GM(2/r - 1/a)$: $v_p = \mathbf{8.18}$ km/s and $v_a = \mathbf{5.73}$ km/s. Check: $v_pr_p = 5.73\times10^{10} = v_ar_a$ ✓ (angular momentum conserved).

