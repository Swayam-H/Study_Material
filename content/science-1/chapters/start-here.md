# Start here: Endsem topic map

The endsem covers the whole course in 12 topics: pre-midsem (topics 1–4) is about 1/3 of the marks, post-midsem (topics 5–12) about 2/3, and no formula sheet is allowed.

## How to read the tables

Each topic has one table. A row is a subtopic, and the sub-subtopics are in its second column.

- **Slides** = the Overleaf slides in `Science-1/02-lecture-slides/lecture-notes-tex/`, given as `file:line` of the frame. A file with no extension is a `.tex` file.
- **MT** = Marion & Thornton, *Classical Dynamics* 5e. **Beiser** = *Concepts of Modern Physics* 6e. **Atkins** = *Physical Chemistry* 11e. **Kreyszig** = *Advanced Engineering Mathematics* 10e (not in your folder).
- **HW** = the instructor's homework list (`01-course-info/homework-till-thermo.pdf`). **E** = solved example, **P** = end-of-chapter problem. Atkins homework codes follow the same scheme.
- **Notes** = `03-lecture-notes/`, **Tut** = `04-tutorials/`, **PP** = `05-past-papers/`. **Mine** = your own `notes/` and `practice/` files.
- QM rows follow the professor's forum list exactly: Beiser ch 2, 3, 4 (no Rutherford appendix), 5, and 6.1–6.9 (no Zeeman). For ch 6 he wants understanding, not derivations.

**Videos** under each table cover only the subtopics they name. Titles, channels and lengths were checked on YouTube on 18 Nov; the full list is in "Video list" near the end.

## Pre-midsem (about 1/3)

### 1. Intro, scales, modelling and nonlinear dynamics (lectures 1–4, 5–19 Aug)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| What is science | Theory vs everyday "theory"; scientific method; induction, deduction and abduction; reductionism vs holism | Overleaf intro lecture (not in your folder) | none | HW 1a–e; OneNote L1 links (Stanford entry on scientific method) |
| IT and science | Science for IT, IT for science; quantum computing (keyword level); DNA computing, Adleman's experiment | Overleaf SCI\_IT and DNA computing decks (not in your folder) | none | HW 1f; Adleman DNA computing preprint (OneNote L1) |
| Scales in nature | Length scales from the universe to nuclei; time scales; energy scales; Fermi estimates | Powers of 10 videos (OneNote L2) | none | HW 2a–c (mosquito power, cricket ball KE vs mc², walk vs car energy) |
| Units and non-dimensionalisation | Dimensional analysis; choosing scales; finding the controlling parameter | Overleaf "Non-dimensionalization and Mathematical Modelling" | none | Notes `Prey-predator1.pdf` §3; HW 3e |
| Modelling toolkit | Geometry and linear algebra (patterns); calculus and ODEs (change); probability (chance, determinism to chaos) | Same Overleaf deck | Kreyszig ch 4 | OneNote L3–4 |
| Prey–predator (Lotka–Volterra) | Prey and predator equations and each term; steady states; Jacobian and its eigenvalues; eigenvectors and the "flow"; complex eigenvalues of the coexistence state give cycles | none | Kreyszig 4.5 | Notes `Prey-predator1.pdf`; HW 3a–e; PP `midsem-practice-problems.pdf` §B |
| Logistic map | Why r x(1 − x); link to the continuous logistic equation; cobweb and phase plots; fixed points 0 and 1 − 1/r; stability \|f′(x\*)\| < 1; linear map comparison (c is immaterial) | none | MT 4.7; Kreyszig 4.4 | Notes `logisticMap.pdf`, `stability-logistic.pdf`; HW 4a–b, MT P4.16, P4.17; PP practice §A |
| Period doubling and chaos | Bifurcations at r = 1 and r = 3; superstable points; period-doubling cascade; deterministic chaos | none | MT 4.7–4.8 | Notes `stability-logistic.pdf`; HW 4c–d; Complexity Explorables animations |

**Videos**

- Logistic map, period doubling, chaos: [This equation will change how you see the world (the logistic map)](https://www.youtube.com/watch?v=ovJcsL7vyrk), Veritasium
- Prey–predator: [Differential Equations, Lecture 8.3: Predator-prey models](https://www.youtube.com/watch?v=pDESymjFkAU)

### 2. Newtonian mechanics: one particle and many (lectures 5, 8)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Newton's laws | Vector formulation; inertial frames; problem-solving strategy | `CM-1particle:3`, `:21`, `:98` | MT 2.1–2.4 | Notes `Newtonian-single-particle.pdf` |
| Work and energy | Work and KE theorem; conservative forces (curl F = 0 test); potential energy; total mechanical energy is conserved | `CM-1particle:31`, `:41`, `:71` | MT 2.5–2.6 | Midsem 2026 Q1 (which forces are conservative); HW MT E2.2, E2.4 |
| Momentum and angular momentum | Linear momentum conservation; torque; angular momentum conservation | `CM-1particle:51`, `:61` | MT 2.5 | HW MT E2.10 |
| Galilean relativity | Galilean transformation; invariance of Newton's laws | `CM-1particle:85` | MT 2.3 | none |
| Constrained motion | Block on an incline; constraint forces | `CM-1particle:109` | MT 2.4 | HW MT P2.27, P2.32 |
| Oscillations | SHO equation of motion; small oscillations near any potential minimum | `CM-1particle:127`, `:143` | MT 2.6, ch 3 | HW MT P2.42, P2.45, P2.47, P2.53 |
| Limits of classical mechanics | Very fast, very small and very massive regimes | `STR:2` | MT 2.7 | none |
| Systems of particles | Centre of mass; total P conserved; L = L of CoM + L about CoM; energy | `CM-SystemOfParticles:3`, `:15`, `:41`, `:67`, `:84`, `:101` | MT 9.1–9.5 | HW MT E9.1, E9.3, E9.10, P9.15 |
| Variable mass | Rocket equation; falling rope | none | MT 9.11 | HW §9.11 rocket EoM |

### 3. Calculus of variations and Lagrangian mechanics (lectures 6–7)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| From equations of motion to path principles | Fermat's least time; Snell's law from least time | `Lagrangian:1`, `:23`, `:52` | MT 6.1 | Midsem 2026 Q4 (Snell's law) |
| Calculus of variations | Stationary functional; Euler equation; second form of Euler's equation; several dependent variables | `Lagrangian:64`, `:81`, `:93` | MT 6.2–6.5 | HW MT E6.1, E6.3, E6.5 |
| Brachistochrone | Setting up the time functional; cycloid solution | `Lagrangian:40`, `:103` | MT 6.3, E6.2 | HW MT E6.2 |
| Hamilton's principle | Hand-wavy derivation; L = T − V; action | `Lagrangian:118`, `:132`, `:153` | MT 7.2 | Midsem 2026 Q2, Q6; `Lagrangian_Mechanics.pptx`; notes `Lagrangian-Hamiltonian-notes.pdf` |
| Generalised coordinates and E–L equations | Degrees of freedom; Euler–Lagrange equations | `Lagrangian:168`, `:173` | MT 7.3–7.4, 7.6 | Midsem 2026 Q7 (double pendulum) |
| Worked systems | Simple pendulum; wall of death; block on a rising incline; ML training as a variational problem | `Lagrangian:184`, `:203`, `:216`, `:229`, `:245` | MT E7.2, E7.4, P7.11, P7.12 | HW MT E7.3, E7.7, E7.8 |
| Constraints | Lagrange's equations with undetermined multipliers; disk rolling down an incline | `Lagrangian:259`, `:272` | MT 7.5, E7.9 | HW MT E7.10 |
| Newtonian vs Lagrangian | Similarities and differences | `Lagrangian:290` | MT 7.6–7.7 | Midsem 2026 Q5 |
| Symmetries and conservation laws | Cyclic coordinates and conjugate momentum; time symmetry gives energy; translation gives momentum; rotation gives angular momentum | `Lagrangian:307`, `:317`, `:326` | MT 7.9 | Midsem 2026 Q2 (cyclic q₁) |

**Videos**

- Brachistochrone: [The Brachistochrone, with Steven Strogatz](https://www.youtube.com/watch?v=Cld0p3a43fU), 3Blue1Brown
- Hamilton's principle and E–L equations: [Lagrangian Mechanics: when theoretical physics got real](https://www.youtube.com/watch?v=QbnkIdw0HJQ), Jorge S. Diaz. Your professor lists this one in the OneNote log.
- Worked E–L problems: [Euler-Lagrange Equation (7 Problems Every Physics Student Must Solve)](https://www.youtube.com/watch?v=gUBtJp_GHbo)
- Symmetries and conservation laws: [The most beautiful idea in physics - Noether's Theorem](https://www.youtube.com/watch?v=CxlHLqJ9I0A), Looking Glass Universe

### 4. Hamiltonian dynamics and the two-body problem (lecture 8, CM-2)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Hamiltonian mechanics | Legendre transform L → H; canonical equations; cyclic coordinates in H; worked example | `Lagrangian:335`, `STR:14`, `STR:29` | MT 7.10–7.11, E7.11 | HW MT E7.11, E7.17; notes `Lagrangian-Hamiltonian-notes.pdf` |
| Phase space and Liouville | Phase-space trajectories; Liouville's theorem (the blob keeps its volume); sketch of proof | `STR:50`, `STR:79`, `STR:100` | MT 7.12 | none |
| Two-body reduction | Centre of mass and reduced mass; first integrals | `Lagrangian:352`, `:374` | MT 8.1–8.3 | Notes `central-force.pdf` |
| Central-force motion | Equations of motion; angular momentum conservation; Kepler's 2nd law (areal velocity) | `Lagrangian:390`, `:405` | MT 8.4–8.5 | Midsem 2026 Q3; HW MT E8.2 |
| Effective potential and orbits | Centrifugal energy; types of orbit; Kepler's laws; orbital dynamics (overview) | `Lagrangian:405`, `:418`, `:427` | MT 8.6–8.8 | Notes `central-force.pdf` |
| Three-body problem | No closed-form solution | `Lagrangian:440` | none | none |

**Videos**

- Legendre transform, L to H: [Legendre Transformation Explained: From Lagrangian to Hamiltonian](https://www.youtube.com/watch?v=xJGluipIV2k)
- Liouville: [Liouville's Theorem and phase space](https://www.youtube.com/watch?v=5wlZ8InAWm0)
- Kepler's 2nd law: [Kepler's Second Law Derivation](https://www.youtube.com/watch?v=GeP74mziA2o)
- Effective potential and orbits: [Classical Mechanics: Effective Potential and Planetary Orbits](https://www.youtube.com/watch?v=TIR7BOgQy4M)

## Post-midsem (about 2/3)

### 5. Special relativity (STR-1 to STR-4, 16–30 Sep)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Postulates and simultaneity | Why Newtonian mechanics fails; two postulates; relativity of simultaneity (train) | `STR:2`, `STR:140` | Beiser 1.1; MT 14.1–14.2 | Mine `notes/17-str-sheet.md` |
| Lorentz transformation | How space-time coordinates transform; outline of the derivation; notes on the transform | `STR:154`, `:179`, `:188` | Beiser App. I; MT 14.3 | Tut `STR-tut.pptx` |
| Time dilation | Moving clock ticks slower; proper time | `STR:200` | Beiser 1.2; MT 14.3–14.4 | Tut `STR-problem-walkthrough.pdf` P1 (rocket passing a station) |
| Length contraction | Rod measured from a moving frame; moving rod and moving clock together | `STR:216`, `:259` | Beiser 1.4 | Tut walkthrough |
| Twin paradox | Why the travelling twin is younger | none | Beiser 1.5; MT 14.6 | none |
| Doppler effect | Frequency seen by a moving observer; expanding universe | `STR:238` | Beiser 1.3; MT 14.5 | none |
| Velocity addition | Derive the relative velocity formulae | `STR:270` | Beiser App. I; MT 14.3 | Tut walkthrough |
| Relativistic momentum and energy | p = γmv; energy and rest energy E₀ = mc²; E² = p²c² + m²c⁴ | `STR:282`, `:297` | Beiser 1.7–1.9; MT 14.7–14.8 | Mine `17-str-sheet.md` |
| Spacetime interval | Invariant interval; light cone | `STR:317` | Beiser App. II; MT 14.9 | none |
| Electricity and magnetism | Magnetic force as a relativistic effect of a moving line charge | `STR:335`, `:347` | Beiser 1.6 | Link on `STR:349` (tinyurl) |
| General relativity | Equivalence principle; gravity as curved spacetime | `STR:357` | Beiser 1.10 | Terrell–Penrose effect paper (OneNote STR-1) |

**Videos**

- Lorentz transformation: [Lorentz Transformations | Special Relativity Ch. 3](https://www.youtube.com/watch?v=Rh0pYtQG5wI), minutephysics. The rest of the series covers simultaneity and dilation.
- Time dilation and length contraction: [Relativity Using Spacetime Diagrams | Time Dilation & Length Contraction (Complete)](https://www.youtube.com/watch?v=1de6GiqcCUc), For the Love of Physics
- Velocity addition: [Relativistic Velocity Addition | Special Relativity](https://www.youtube.com/watch?v=JOzznKWRGc0), DeepBean
- Twin paradox: [The Twin Paradox: Time Travel, Explained Visually](https://www.youtube.com/watch?v=V4ZzUPFEG8M), Richard Behiel. It runs almost 3 hours, so watch only the opening part.
- Electricity and magnetism: [How Special Relativity Makes Magnets Work](https://www.youtube.com/watch?v=1TKSfAkWWN0), Veritasium

### 6. Thermodynamics I: gases and the first law (Thermo-1 to 3, 3–10 Oct)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Systems, state and temperature | Systems and surroundings; state variables and equilibrium; zeroth law; thermometers and absolute scale | `thermo:62`, `:106`, `:142`, `:175`, `:207` | Atkins 1A.1; Zemansky ch 1–2 | Mine `notes/pdf/1-gases-1A-1C-summary.pdf`; Tut thermo P1 |
| Perfect gas | Perfect gas law; mixtures, Dalton's law, partial pressures | `thermo:246` | Atkins 1A.2 | HW Atkins Ex 1A.1, 1A.2, E1A.2, E1A.9, E1A.11, P1A.2, P1A.11 |
| Kinetic model | Assumptions; pressure from collisions; rms speed | `thermo:277`, `:308`, `:335`, `:357` | Atkins 1B.1(a) | HW Ex 1B.1, E1B.2; Tut P2 |
| Maxwell–Boltzmann distribution | Speed distribution; most probable, mean and rms speeds; collisions and mean free path | `thermo:379`, `:422`, `:504`, `:524` | Atkins 1B.1(b)–(c), 1B.2 | HW E1B.8, P1B.7, P1B.8, P1B.10; Tut P3; notes `KineticTheory.pdf` |
| Real gases | Compression factor; virial coefficients; critical constants; van der Waals; corresponding states | `thermo:445`, `:481` | Atkins 1C | Tut P4 |
| Work and heat | Joule's paddle wheel; quasi-static processes; work on a gas; reversible isothermal expansion; work depends on path | `thermo:600`, `:648`, `:688`, `:726`, `:747`, `:788` | Atkins 2A.1, 2A.3; Zemansky ch 3 | HW Ex 2A.1, E2A.4, P2A.6 |
| Other kinds of work | Stretching, surface, electrical and magnetic work | `thermo:1124` to `:1334` | Atkins Table 2A.1; Zemansky ch 3 | HW P2A.3; Zemansky 3.8, 3.10, 3.11, 3.13, 3.14 |
| First law and internal energy | First law; equipartition; heat capacities | `thermo:809`, `:867`, `:893` | Atkins 2A.2, 2A.4 | Notes `Thermodynamics.pdf` |
| Enthalpy | Definition; variation with T; C\_p − C\_V | `thermo:921`, `:989`, `:1104` | Atkins 2B | HW Ex 2B.2, E2B.2, E2B.3, P2B.2 |
| Thermochemistry | Hess's law; Kirchhoff's law; calorimetry | none | Atkins 2C | HW Ex 2C.1, 2C.2, E2C.4(a), E2C.6, P2C.1, P2C.8, P2C.10 |
| State functions and Joule–Thomson | Exact differentials; internal pressure π\_T and its molecular meaning; Joule's experiment; JT expansion, μ, inversion curve, liquefaction | `thermo:842`, `:1393`, `:1422`, `:1460`, `:1503`, `:1537`, `:1584`, `:1618`, `:1660`, `:1698` | Atkins 2D | HW Ex 2D.2, E2D.2(a), P2D.2, P2D.8, I2.5 |
| Adiabatic changes | Four standard processes; adiabats; fire syringe; free expansion | `thermo:942`, `:1025`, `:1056`, `:1086` | Atkins 2E | Mine `notes/pdf/2-first-law-2A-2B-2E.pdf` |

**Videos**

- Maxwell–Boltzmann: [Chemical Kinetics 1.3 - Maxwell-Boltzmann Distribution](https://www.youtube.com/watch?v=azJKKRV5ezU), TMP Chem. `notes/10a-quiz2-plan.md` §4 lists the TMP Chem videos for every Atkins topic from 1A to 2E.
- Joule–Thomson: [Joule-Thomson Coefficient and Inversion temperature](https://www.youtube.com/watch?v=bCGeKu6P73Y)

### 7. Thermodynamics II: second law, entropy and free energy (Thermo-4 and 5, 14–17 Oct)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Second law and engines | Cyclic processes; heat engines; Kelvin–Planck and Clausius statements and their equivalence; reversible vs irreversible | `thermo-l3:21`, `:57`, `:92`, `:128`, `:198`, `:237` | Atkins 3A.1; Zemansky ch 6–7 | Mine `notes/pdf/4-second-law-entropy-3A-3B.pdf` |
| Refrigerators and heat pumps | COP | `thermo-l3:161` | Zemansky ch 6 | HW P3A.5 |
| Carnot cycle | Cycle, efficiency, Carnot's theorem; thermodynamic temperature; Otto cycle | `thermo-l3:270`, `:309`, `:340`, `:364`, `:382` | Atkins 3A.3(a)–(b) | HW P3A.3, P3B.10 |
| Entropy (Clausius) | Definition dS = dq\_rev/T; Clausius inequality; irreversible heat flow; entropy increase | `thermo-l4:20`, `:47`, `:63`, `:188`, `:221` | Atkins 3A.2(a), 3A.3(c); Zemansky ch 8 | HW E3A.4(b) |
| Entropy changes | Expansion; heating; phase transitions; mixing water | `thermo-l4:100`, `:125`, `:159`, `:376` | Atkins 3B | HW Ex 3B.1, P3B.2; slide problem set 4 (`thermo-l4:413`) |
| Statistical entropy | Microstates; large N; S = k ln W; is entropy "disorder"? | `thermo-l4:243`, `:291`, `:326`, `:345` | Atkins 3A.2(b) | HW I3.2 |
| Third law | Calorimetric entropy; Nernst theorem; third-law entropies | preview only (`thermo-l4:413`) | Atkins 3C | HW Ex 3C.1, E3C.3(a) |
| Helmholtz and Gibbs energies | A and G; spontaneity and equilibrium criteria; maximum work; standard Gibbs energies | preview only | Atkins 3D | HW Ex 3D.2, E3D.2(a), P3D.1 |
| Combining first and second laws | Fundamental equation dU = T dS − p dV; Maxwell relations; π\_T = T(∂p/∂T)\_V − p; Gibbs–Helmholtz equation | none | Atkins 3E | HW Ex 3E.2, 3E.3, P3E.4 |
| Phase diagrams | Phases and transitions; phase boundaries; Gibbs phase rule | preview only | Atkins 4A | HW E4A.2(b), E4A.3(b), E4A.4(a) |
| Phase boundaries | Stability vs T and p; Clapeyron and Clausius–Clapeyron equations | preview only | Atkins 4B | HW E4B.7(b), E4B.8(b) |

**Videos**

- Carnot cycle: [The Carnot Cycle and Intro to Entropy](https://www.youtube.com/watch?v=qLfpXAMyXNc)
- Entropy: [Chemical Thermodynamics 4.2 - Entropy](https://www.youtube.com/watch?v=_ezMWAeNmOs), TMP Chem
- Free energies and Maxwell relations: [Lecture 27: Thermodynamic Potentials, Legendre Transform, and Maxwell's Relations](https://www.youtube.com/watch?v=Fy-NSsdloqo), [Chemical Thermodynamics 6.4 - Maxwell Relations 1: Concept](https://www.youtube.com/watch?v=f3W7gVGVOi8), TMP Chem
- Phase diagrams: [Chemical Thermodynamics 7.0 - Phase Diagrams Review](https://www.youtube.com/watch?v=Z80H1l8-tY0), TMP Chem
- Phase rule: [Gibbs Phase Rule](https://www.youtube.com/watch?v=CceXmKio_DE)
- Clausius–Clapeyron: [Derive clausius clapeyron equation](https://www.youtube.com/watch?v=qqyzdmTp6s8)

Mine, for Thermo-1 to 4: `notes/10-thermo-quiz2-notes.md`, `notes/10a-quiz2-plan.md` (has every homework item mapped to slide lines), `notes/15-quiz2-cheatsheet.md`, `practice/quiz2-practice-questions.md` with its answer key, and `practice/quiz2-flashcards.md`.

### 8. QM 1: Particle properties of waves (Beiser ch 2, whole chapter)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Electromagnetic waves | Coupled E and B fields moving at c; interference and diffraction; colour depends on wavelength | `QM:1`, `:13`, `:30` | Beiser 2.1 | none |
| Blackbody radiation | Rayleigh–Jeans and the ultraviolet catastrophe; Planck's quantised oscillators; Planck formula; Wien and Stefan–Boltzmann laws | `QM:42`, `:56` | Beiser 2.2 | none |
| Photoelectric effect | Experimental facts classical theory can't explain; KE\_max = hν − φ; work function, threshold frequency, stopping potential | `QM:67` | Beiser 2.3 | none |
| What is light? | Wave–particle duality | `QM:119` | Beiser 2.4 | none |
| X-rays | X-ray tube as an inverse photoelectric effect; bremsstrahlung; cutoff λ\_min = hc/eV; characteristic lines | `QM:82` | Beiser 2.5 | none |
| X-ray diffraction | Bragg planes; 2d sinθ = nλ; NaCl pattern | `QM:82` (Bragg figures) | Beiser 2.6 | none |
| Compton effect | Photon momentum p = h/λ; derive the Compton shift; Compton wavelength; experiment and results | `QM:107` | Beiser 2.7 | none |
| Pair production | Threshold 2mc² and why a nucleus is needed; annihilation; photoelectric vs Compton vs pair production | none | Beiser 2.8 | none |
| Photons and gravity | Gravitational mass of a photon; gravitational red shift; black holes | none | Beiser 2.9 | none |

**Videos**

- Blackbody: [Origins of Quantum Mechanics: Planck's Solution to the Ultraviolet Catastrophe](https://www.youtube.com/watch?v=eNk4Ihlfwko), Gianmarc Grazioli
- Photoelectric effect: [Photoelectric Effect (6 of 8) Stopping Potential, An Explanation](https://www.youtube.com/watch?v=mXnTzcB3wFU), Step by Step Science. The other parts of the series cover the rest of 2.3.
- X-ray diffraction: [X-ray diffraction and interplanar spacings](https://www.youtube.com/watch?v=rLSReSyKhBw), Taylor Sparks
- Compton effect: [Deriving the Compton Scattering Formula (Part 1)](https://www.youtube.com/watch?v=y9lWZQIQMyo), with parts [2](https://www.youtube.com/watch?v=EoNYhNEafJQ) and [3](https://www.youtube.com/watch?v=mvmIVeUM15Q), ThatSingaporeanGuy
- Pair production: [Pair production and annihilation: from fizzics.org](https://www.youtube.com/watch?v=NWOHkBNq_GY), Fizzics Organisation

### 9. QM 2: Wave properties of particles (Beiser ch 3, whole chapter)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| De Broglie waves | λ = h/p; why everyday objects show no wave nature | `QM:137`, `:163` | Beiser 3.1 | none |
| Waves of what? | Wave function Ψ; \|Ψ\|² as probability density | `QM:163` | Beiser 3.2 | none |
| Describing a wave | General wave formula; wave number and angular frequency | none | Beiser 3.3 | none |
| Phase and group velocities | Wave packets and beats; v\_p vs v\_g; group velocity equals particle speed | `QM:177`, `:193` | Beiser 3.4 | none |
| Particle diffraction | Davisson–Germer experiment and results | `QM:147` | Beiser 3.5 | none |
| Particle in a box (wave picture) | Standing waves; E\_n = n²h²/8mL²; no zero energy | none | Beiser 3.6 | none |
| Uncertainty principle | Δx Δp ≥ ħ/2 from wave packets; gamma-ray microscope (particle view); energy–time form | `QM:206` | Beiser 3.7–3.8 | none |
| Applying uncertainty | Why electrons can't live in the nucleus; minimum energy of a trapped particle; line widths | `QM:206` | Beiser 3.9 | none |

**Videos**

- Phase and group velocity: [Phase and Group Velocity of de Broglie Waves](https://www.youtube.com/watch?v=sQwBka251Qw)
- Davisson–Germer: [Davisson-Germer Experiment (Proof That Electrons Are Waves)](https://www.youtube.com/watch?v=WJknTbOwktw)
- Uncertainty from wave packets: [The more general uncertainty principle, regarding Fourier transforms](https://www.youtube.com/watch?v=MBnnXbOM5S4), 3Blue1Brown

### 10. QM 3: Atomic structure (Beiser ch 4, without the Rutherford scattering appendix)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Nuclear atom | Thomson vs Rutherford models; results of the scattering experiment (no derivation) | `QM:224` | Beiser 4.1 | none |
| Electron orbits | Planetary model; why a classical orbiting electron must radiate and collapse | `QM:224` | Beiser 4.2 | none |
| Atomic spectra | Line spectra; Lyman, Balmer, Paschen series; Rydberg formula | none | Beiser 4.3 | none |
| Bohr atom | Orbit holds a whole number of de Broglie wavelengths; orbit radii; Bohr radius | `QM:234` | Beiser 4.4 | none |
| Energy levels and spectra | E\_n = −13.6 eV/n²; ionisation energy; emission and absorption from level jumps | `QM:234` | Beiser 4.5 | none |
| Correspondence principle | Large n gives classical radiation frequency | none | Beiser 4.6 | none |
| Nuclear motion | Reduced-mass correction to spectral lines | none | Beiser 4.7 | none |
| Atomic excitation | Excitation by collisions and by photons; Franck–Hertz experiment | `QM:246` | Beiser 4.8 | none |
| The laser | Spontaneous vs stimulated emission; metastable states; population inversion; 3- and 4-level lasers | `StatMech` LASER frame | Beiser 4.9 | none |

**Videos**

- Bohr energy levels: [Bohr Model (6 of 7) Energy Level Derivation and Calculation](https://www.youtube.com/watch?v=_kHJCX3hTaY), Step by Step Science. Part 1 of the series covers spectra.
- Franck–Hertz: [The Franck-Hertz Experiment (1961)](https://www.youtube.com/watch?v=-l2WbgvetfU), an archive demonstration film
- Laser: [Population Inversion and Laser Action, Physics Lecture](https://www.youtube.com/watch?v=CAfoVDEDTb8), Sabaq Foundation

### 11. QM 4: Quantum mechanics (Beiser ch 5, whole chapter)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Foundations | Classical mechanics as a limit; conditions on a well-behaved Ψ; normalisation | `QM:258` | Beiser 5.1 | none |
| The wave equation | Classical wave equation and its solutions, including complex ones | none | Beiser 5.2 | none |
| Time-dependent Schrödinger equation | Motivation from a free-particle wave; second motivating derivation; features of the equation | `QM:269`, `:283`, `:297` | Beiser 5.3 | none |
| Linearity and superposition | Amplitudes add, not probabilities; two-slit picture | `QM:297` | Beiser 5.4 | none |
| Expectation values | ⟨x⟩ and ⟨G(x)⟩ | none | Beiser 5.5 | none |
| Operators | Momentum operator; energy (Hamiltonian) operator; expectation values with operators | `QM:309` | Beiser 5.6 | none |
| Steady-state Schrödinger equation | Separating out time; eigenvalues and eigenfunctions | `QM:297` | Beiser 5.7 | none |
| Particle in a box | Boundary conditions; normalised ψ\_n and \|ψ\_n\|²; energies; momentum; 3-D box | `QM:323`, `:336`, `:346` | Beiser 5.8 | none |
| Finite potential well | ψ penetrates the walls; lower energy levels | none | Beiser 5.9 | none |
| Tunnel effect | Barrier penetration; T ≈ e^(−2k₂L); alpha decay, tunnel diode, STM | `QM:390`, `:408`, `:433` | Beiser 5.10 and the ch 5 appendix | none |
| Harmonic oscillator | Evenly spaced levels E\_n = (n + ½)hν; zero-point energy; ψ shapes vs a classical oscillator | `QM:353`, `:363`, `:379` | Beiser 5.11 | none |

**Videos**

- Particle in a box: [L7.1 The infinite square well](https://www.youtube.com/watch?v=GvkMLfecMjQ), SAYPhysics
- Tunnelling: [The Quantum Barrier Potential Part 1: Quantum Tunneling](https://www.youtube.com/watch?v=EMq_QbyghMU), Professor Dave Explains
- Harmonic oscillator: [Quantum Chemistry 5.5 - Harmonic Oscillator Energy Levels](https://www.youtube.com/watch?v=GPM9NYCY0f0), TMP Chem

### 12. QM 5: Quantum theory of the hydrogen atom (Beiser 6.1–6.9; understanding, not derivations)

| Subtopic | Sub-subtopics | Slides | Textbook | Other resources |
| --- | --- | --- | --- | --- |
| Schrödinger equation for hydrogen | Coulomb potential; why spherical polar coordinates | `QM:444` | Beiser 6.1 | none |
| Separation of variables | ψ = R(r)Θ(θ)Φ(φ); one equation per variable (idea only) | `QM:461`, `:468` | Beiser 6.2 | none |
| Quantum numbers | Three dimensions give n, l, m\_l; allowed ranges | `QM:480` | Beiser 6.3 | none |
| Principal quantum number | Energy quantisation, same as Bohr | `QM:480`, `:491` | Beiser 6.4 | none |
| Orbital quantum number | L = √(l(l+1)) ħ; s, p, d, f notation | `QM:499` | Beiser 6.5 | none |
| Magnetic quantum number | L\_z = m\_l ħ; space quantisation | `QM:499` | Beiser 6.6 | none |
| Electron probability density | No definite orbits; radial probability P(r) dr; most probable radius; s and p density shapes | `QM:491` | Beiser 6.7 | none |
| Radiative transitions | Why a mix of two states radiates; transition frequency | `QM:523` | Beiser 6.8 | none |
| Selection rules | Δl = ±1, Δm\_l = 0, ±1; allowed vs forbidden transitions | `QM:523` | Beiser 6.9 | none |

**Videos**

- Quantum numbers and probability densities, no derivations: [How Schrödinger Discovered the Shapes of Atoms](https://www.youtube.com/watch?v=7ZtbOaRPRkw)
- Energy eigenvalues: [Quantum Chemistry 7.6 - Hydrogen Atom Eigenvalues](https://www.youtube.com/watch?v=wJCEskknrtI), TMP Chem
- Selection rules: [Selection rules in the optical transitions of electrons](https://www.youtube.com/watch?v=xgWuEe7Fs9Y)

I matched the QM slides to Beiser sections by frame title only. QM also has no homework, tutorial or past paper in your folder yet.

## Video list

There are 43 videos, about 15.4 hours in all, or 12.5 hours if you skip most of #14. Lengths are h:mm:ss or m:ss as YouTube lists them on 18 Nov 2026.

| # | Topic | Covers | Title | Channel | Length |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 Nonlinear dynamics | Logistic map, chaos | [This equation will change how you see the world (the logistic map)](https://www.youtube.com/watch?v=ovJcsL7vyrk) | Veritasium | 18:39 |
| 2 | 1 Nonlinear dynamics | Prey–predator | [Differential Equations, Lecture 8.3: Predator-prey models](https://www.youtube.com/watch?v=pDESymjFkAU) | Professor Macauley | 41:42 |
| 3 | 3 Lagrangian | Brachistochrone | [The Brachistochrone, with Steven Strogatz](https://www.youtube.com/watch?v=Cld0p3a43fU) | 3Blue1Brown | 16:01 |
| 4 | 3 Lagrangian | Hamilton's principle, E–L | [Lagrangian Mechanics: when theoretical physics got real](https://www.youtube.com/watch?v=QbnkIdw0HJQ) | Dr. Jorge S. Diaz | 29:56 |
| 5 | 3 Lagrangian | Worked E–L problems | [Euler-Lagrange Equation (7 Problems Every Physics Student Must Solve)](https://www.youtube.com/watch?v=gUBtJp_GHbo) | For the Love of Physics | 1:24:35 |
| 6 | 3 Lagrangian | Symmetries, conservation | [The most beautiful idea in physics - Noether's Theorem](https://www.youtube.com/watch?v=CxlHLqJ9I0A) | Looking Glass Universe | 9:53 |
| 7 | 4 Hamiltonian, two-body | Legendre transform | [Legendre Transformation Explained: From Lagrangian to Hamiltonian](https://www.youtube.com/watch?v=xJGluipIV2k) | Dr. Shane Ross | 1:13:51 |
| 8 | 4 Hamiltonian, two-body | Liouville | [Liouville's Theorem and phase space](https://www.youtube.com/watch?v=5wlZ8InAWm0) | Electronics and Sciences | 29:09 |
| 9 | 4 Hamiltonian, two-body | Kepler's 2nd law | [Kepler's Second Law Derivation](https://www.youtube.com/watch?v=GeP74mziA2o) | Flipping Physics | 4:51 |
| 10 | 4 Hamiltonian, two-body | Effective potential, orbits | [Classical Mechanics: Effective Potential and Planetary Orbits](https://www.youtube.com/watch?v=TIR7BOgQy4M) | Foundations of Physics Problems | 16:05 |
| 11 | 5 Relativity | Lorentz transformation | [Lorentz Transformations, Special Relativity Ch. 3](https://www.youtube.com/watch?v=Rh0pYtQG5wI) | minutephysics | 12:17 |
| 12 | 5 Relativity | Time dilation, length contraction | [Relativity Using Spacetime Diagrams, Time Dilation & Length Contraction (Complete)](https://www.youtube.com/watch?v=1de6GiqcCUc) | For the Love of Physics | 44:35 |
| 13 | 5 Relativity | Velocity addition | [Relativistic Velocity Addition](https://www.youtube.com/watch?v=JOzznKWRGc0) | DeepBean | 1:55 |
| 14 | 5 Relativity | Twin paradox | [The Twin Paradox: Time Travel, Explained Visually](https://www.youtube.com/watch?v=V4ZzUPFEG8M) | Richard Behiel | 2:55:39 |
| 15 | 5 Relativity | E and B from relativity | [How Special Relativity Makes Magnets Work](https://www.youtube.com/watch?v=1TKSfAkWWN0) | Veritasium | 4:19 |
| 16 | 6 Thermo I | Maxwell–Boltzmann | [Chemical Kinetics 1.3 - Maxwell-Boltzmann Distribution](https://www.youtube.com/watch?v=azJKKRV5ezU) | TMP Chem | 8:54 |
| 17 | 6 Thermo I | Joule–Thomson | [Joule-Thomson Coefficient and Inversion temperature](https://www.youtube.com/watch?v=bCGeKu6P73Y) | Rabika Saini | 11:41 |
| 18 | 7 Thermo II | Carnot cycle | [The Carnot Cycle and Intro to Entropy](https://www.youtube.com/watch?v=qLfpXAMyXNc) | The Cynical Philosopher | 9:56 |
| 19 | 7 Thermo II | Entropy | [Chemical Thermodynamics 4.2 - Entropy](https://www.youtube.com/watch?v=_ezMWAeNmOs) | TMP Chem | 4:39 |
| 20 | 7 Thermo II | Potentials, Maxwell relations | [Lecture 27: Thermodynamic Potentials, Legendre Transform, and Maxwell's Relations](https://www.youtube.com/watch?v=Fy-NSsdloqo) | Bahga Lab IIT Delhi | 40:09 |
| 21 | 7 Thermo II | Maxwell relations | [Chemical Thermodynamics 6.4 - Maxwell Relations 1: Concept](https://www.youtube.com/watch?v=f3W7gVGVOi8) | TMP Chem | 5:10 |
| 22 | 7 Thermo II | Phase diagrams | [Chemical Thermodynamics 7.0 - Phase Diagrams Review](https://www.youtube.com/watch?v=Z80H1l8-tY0) | TMP Chem | 3:48 |
| 23 | 7 Thermo II | Phase rule | [Gibbs Phase Rule](https://www.youtube.com/watch?v=CceXmKio_DE) | Dane Andersen | 14:49 |
| 24 | 7 Thermo II | Clausius–Clapeyron | [Derive clausius clapeyron equation](https://www.youtube.com/watch?v=qqyzdmTp6s8) | Physics mee | 3:19 |
| 25 | 8 QM 1 (Beiser 2) | Blackbody | [Origins of Quantum Mechanics: Planck's Solution to the Ultraviolet Catastrophe](https://www.youtube.com/watch?v=eNk4Ihlfwko) | Gianmarc Grazioli | 42:32 |
| 26 | 8 QM 1 (Beiser 2) | Photoelectric effect | [Photoelectric Effect (6 of 8) Stopping Potential, An Explanation](https://www.youtube.com/watch?v=mXnTzcB3wFU) | Step by Step Science | 13:58 |
| 27 | 8 QM 1 (Beiser 2) | X-ray diffraction | [X-ray diffraction and interplanar spacings](https://www.youtube.com/watch?v=rLSReSyKhBw) | Taylor Sparks | 5:14 |
| 28 | 8 QM 1 (Beiser 2) | Compton effect | [Deriving the Compton Scattering Formula (Part 1)](https://www.youtube.com/watch?v=y9lWZQIQMyo) | ThatSingaporeanGuy | 6:17 |
| 29 | 8 QM 1 (Beiser 2) | Compton effect | [Deriving the Compton Scattering Formula (Part 2)](https://www.youtube.com/watch?v=EoNYhNEafJQ) | ThatSingaporeanGuy | 5:52 |
| 30 | 8 QM 1 (Beiser 2) | Compton effect | [Deriving the Compton Scattering Formula (Part 3)](https://www.youtube.com/watch?v=mvmIVeUM15Q) | ThatSingaporeanGuy | 8:41 |
| 31 | 8 QM 1 (Beiser 2) | Pair production | [Pair production and annihilation: from fizzics.org](https://www.youtube.com/watch?v=NWOHkBNq_GY) | Fizzics Organisation | 4:08 |
| 32 | 9 QM 2 (Beiser 3) | Phase and group velocity | [Phase and Group Velocity of de Broglie Waves (Beiser problem solved)](https://www.youtube.com/watch?v=sQwBka251Qw) | Circus of Physics | 3:39 |
| 33 | 9 QM 2 (Beiser 3) | Davisson–Germer | [Davisson-Germer Experiment (Proof That Electrons Are Waves)](https://www.youtube.com/watch?v=WJknTbOwktw) | For the Love of Physics | 22:30 |
| 34 | 9 QM 2 (Beiser 3) | Uncertainty principle | [The more general uncertainty principle, regarding Fourier transforms](https://www.youtube.com/watch?v=MBnnXbOM5S4) | 3Blue1Brown | 18:06 |
| 35 | 10 QM 3 (Beiser 4) | Bohr energy levels | [Bohr Model (6 of 7) Energy Level Derivation and Calculation](https://www.youtube.com/watch?v=_kHJCX3hTaY) | Step by Step Science | 12:09 |
| 36 | 10 QM 3 (Beiser 4) | Franck–Hertz | [The Franck-Hertz Experiment (1961)](https://www.youtube.com/watch?v=-l2WbgvetfU) | A/V Geeks 16mm Films | 29:40 |
| 37 | 10 QM 3 (Beiser 4) | Laser | [Population Inversion and Laser Action, Physics Lecture](https://www.youtube.com/watch?v=CAfoVDEDTb8) | Sabaq Foundation | 9:43 |
| 38 | 11 QM 4 (Beiser 5) | Particle in a box | [L7.1 The infinite square well](https://www.youtube.com/watch?v=GvkMLfecMjQ) | SAYPhysics | 14:06 |
| 39 | 11 QM 4 (Beiser 5) | Tunnelling | [The Quantum Barrier Potential Part 1: Quantum Tunneling](https://www.youtube.com/watch?v=EMq_QbyghMU) | Professor Dave Explains | 21:35 |
| 40 | 11 QM 4 (Beiser 5) | Harmonic oscillator | [Quantum Chemistry 5.5 - Harmonic Oscillator Energy Levels](https://www.youtube.com/watch?v=GPM9NYCY0f0) | TMP Chem | 8:46 |
| 41 | 12 QM 5 (Beiser 6) | Quantum numbers, orbitals | [How Schrödinger Discovered the Shapes of Atoms](https://www.youtube.com/watch?v=7ZtbOaRPRkw) | Brain Station Advanced | 6:55 |
| 42 | 12 QM 5 (Beiser 6) | Energy eigenvalues | [Quantum Chemistry 7.6 - Hydrogen Atom Eigenvalues](https://www.youtube.com/watch?v=wJCEskknrtI) | TMP Chem | 7:25 |
| 43 | 12 QM 5 (Beiser 6) | Selection rules | [Selection rules in the optical transitions of electrons](https://www.youtube.com/watch?v=xgWuEe7Fs9Y) | 阪大基礎工 物性物理 関山研 (Osaka University lab) | 16:46 |

The twin-paradox video (#14) is almost 3 hours long. For the exam, its first 20 minutes are enough.

## Out of scope and course-wide resources

The professor's list leaves these out, even though some are in the slides:

- Beiser ch 4 appendix, Rutherford scattering
- Beiser 6.10, Zeeman effect (`QM:511`)
- Multi-electron atoms, periodic table, spin–orbit coupling, energy-level ordering, covalent bond (`QM:534` to `:579`)
- All of `StatMech.tex`, except the laser frame, which matches Beiser 4.9

He may update the list after today's last lecture (18 Nov).

| Resource | Where | Covers |
| --- | --- | --- |
| 2026 midsem with rubric | `Science-1_M26_Midsem_Rubric.pdf`, `05-past-papers/2026-midsem-annotated.pdf` | Topics 2–4. Shows how marks are split, e.g. 1 mark for each step of a 3-mark derivation |
| 2025 midsem | `05-past-papers/2025-midsem-set1.pdf`, `Sci-1_midsems.pdf`, `sci_midsem.pdf` | Pre-midsem topics |
| Midsem problem set | `05-past-papers/midsem-practice-problems.pdf` | Topics 1 and 3 (logistic map, prey–predator, Lagrangian) |
| Quiz-1 | `test.pdf` | Short state and derive questions |
| STR tutorial | `04-tutorials/relativity/` | Topic 5 |
| Thermo tutorial | `04-tutorials/thermodynamics/` | Topics 6–7 |
| Integration cheat sheet | `07-reference/integration_formulas_cheat_sheet.pdf` | Maths for every derivation. No formula sheet is allowed in the exam, so learn it |
| Other textbooks | `06-textbooks/Morin_Classical-Mechanics.pdf` | Extra problems for topics 2–4 |
