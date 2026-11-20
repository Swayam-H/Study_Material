# Learn: Functional dependencies and normalisation

Normalisation is the theory of what makes a relation schema *good*: no redundancy, no update anomalies, and decompositions that lose neither data nor constraints. Everything rests on one tool, the **attribute closure** $X^+$. If you can compute closures fast and correctly, you can find keys, test normal forms, find minimal covers and check decompositions. Sources: Elmasri and Navathe 7e ch 14 (14.1–14.5) and ch 15 (15.1–15.3); Assignment 4 (N-I individual, NG group) with Kamal's rubric; past papers M22–M25.

> **Study path.** Learn closure first and do five closures by hand. Then keys, then the normal-form definitions in their *general* (any candidate key) form, then the two algorithms (BCNF decomposition and 3NF synthesis). Assignment 4's Q2 has exactly the four-part shape to expect in the final: highest NF, BCNF decomposition, minimal cover, 3NF synthesis.

## Why normalise: informal guidelines and anomalies

Elmasri 14.1 gives four informal design guidelines:

1. **Clear semantics**: each relation describes one entity type or one relationship type; don't mix attributes of several.
2. **No redundancy, so no anomalies.** Store EMP_DEPT(Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn) and department data repeats for each employee. That causes:
   - **Insertion anomaly**: cannot add a new department with no employees (Ssn, the key, would be NULL); adding an employee needs the department data typed again consistently.
   - **Deletion anomaly**: deleting the last employee of a department deletes the department's information.
   - **Modification (update) anomaly**: changing a department's manager needs every one of its rows updated, or the data becomes inconsistent.
3. **Few NULLs**: put attributes that are often NULL in a separate relation.
4. **No spurious tuples**: decompose only on attributes that are keys (or foreign keys referencing keys), so the natural join gives back exactly the original rows.

## Functional dependencies

A **functional dependency** X → Y on R holds when any two tuples that agree on X also agree on Y, in *every* legal state of R. An FD is a statement about the meaning of the data (from the requirements), not about one table instance: a sample table can *disprove* an FD (two rows agree on X and differ on Y) but never prove it.

**Trivial FD**: X → Y with Y ⊆ X. **Full FD**: removing any attribute from X breaks it. **Partial FD**: some proper subset of X still determines Y. **Transitive FD**: X → Z and Z → Y where Z is not a key and Z ⊄ X.

**Armstrong's axioms** (sound and complete):
- IR1 **Reflexivity**: if Y ⊆ X then X → Y.
- IR2 **Augmentation**: if X → Y then XZ → YZ.
- IR3 **Transitivity**: if X → Y and Y → Z then X → Z.

Derived rules: **decomposition** (X → YZ gives X → Y), **union** (X → Y and X → Z give X → YZ), **pseudotransitivity** (X → Y and WY → Z give WX → Z).

Warning: there is **no** "left decomposition". AB → C does **not** give A → C. And X → Y does **not** give Y → X.

$F^+$, the **closure of F**, is the set of all FDs implied by F.

## Attribute closure: the core algorithm

$X^+$ = all attributes functionally determined by X.

1. Start with $X^+ := X$.
2. Repeat: for each FD Y → Z in F, if Y ⊆ $X^+$, add Z to $X^+$.
3. Stop when a full pass adds nothing.

Key fact: X → B is in $F^+$ **if and only if** B ∈ $X^+$. So every question about implication becomes a closure computation.

Example: R(A, B, C, D, E), F = {A → DE, B → A, D → C}. $B^+$: B; B → A adds A; A → DE adds D, E; D → C adds C. $B^+$ = ABCDE = R, so B is a superkey (in fact a candidate key: a single attribute).

## Keys from FDs

- **Superkey**: S with $S^+$ = R. **Candidate key**: minimal superkey. **Prime attribute**: in at least one candidate key.
- **Attributes on no right-hand side are in every key** (A4 group Q1: proved via closure; nothing can add them). **Attributes on right sides only, never on a left side, are in no key** (unless needed trivially). Attributes on both sides: test.
- Procedure: let L = attributes on no right side. Compute $L^+$. If it is R, L is the only candidate key. Otherwise add other attributes one at a time (then pairs, …) and keep the minimal sets that reach R.

A4 individual Q2: R(A, C, F, G, K, L), {L → K, K → GAL, C → FG, F → A}. C is on no right side, so C is in every key. $C^+$ = ACFG ≠ R. Adding K: $(CK)^+$ = R; adding L: $(CL)^+$ = R (L → K). Adding A, F or G does not reach K or L. **Candidate keys CK and CL.** Prime: C, K, L. Non-prime: A, F, G.

A4 individual Q1: "A is in no key of R(A, …, H). Add one FD so that A becomes a key." Take any candidate key K of R (one exists, since R itself is a superkey; K does not contain A). Add **A → K**. Then $A^+$ ⊇ K and $K^+$ = R, so $A^+$ = R; a single attribute is automatically minimal, so A is a candidate key. (A → R also works but scored at most 4/5 because it does not use the structure.)

## Normal forms (general definitions, Elmasri 14.4–14.5)

Always test against **all candidate keys**, not just the primary key, and against $F^+$ (derived FDs count too).

- **1NF**: every attribute is atomic and single-valued; no multivalued or composite attributes, no nested relations. Fix: move a multivalued attribute to a new relation with the key (best), or repeat rows with an extended key, or fixed columns Phone1, Phone2 (bad: NULLs, fixed max).
- **2NF**: 1NF, and **no non-prime attribute is partially dependent on any candidate key** (depends on a proper subset of a key). A relation whose candidate keys are all single attributes is automatically 2NF.
- **3NF**: for every non-trivial X → A in $F^+$, **X is a superkey or A is prime**. Equivalent: 2NF and no non-prime attribute is transitively dependent on a key.
- **BCNF**: for every non-trivial X → A in $F^+$, **X is a superkey**. (3NF without the "or A is prime" escape.)

BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF. **Every two-attribute relation is in BCNF.**

To find the **highest normal form**: check 2NF (any FD from part of a key to a non-prime attribute?), then 3NF (any FD with a non-superkey left side and a non-prime right side?), then BCNF (any FD with a non-superkey left side at all?).

A4 individual Q2: C → FG has C ⊂ CK and F, G non-prime: **partial dependency**, so not 2NF. Highest NF is **1NF**.

A4 group Q3: R(A, C, F, G, K, L), {L → A, F → GKL, C → AFK, K → F}. Only key C (single attribute), so 2NF holds automatically. F → GKL: F not a superkey, G, K, L non-prime: not 3NF. Highest NF is **2NF**.

The classic BCNF-but-not-3NF gap: R(A, B, C) with AB → C and C → B. Keys AB and AC; all attributes prime, so 3NF; C → B has C not a superkey, so not BCNF.

## Decomposition properties

**Lossless (non-additive) join**: joining the parts gives back exactly R's tuples, never extra (spurious) ones. **Binary test** (Elmasri 15.2): a decomposition of R into R1 and R2 is lossless iff

$$\boxed{(R_1 \cap R_2) \to (R_1 - R_2) \text{ or } (R_1 \cap R_2) \to (R_2 - R_1) \text{ is in } F^+}$$

i.e. the common attributes form a superkey of one of the parts. For more parts, apply the test to each binary split, or use the matrix (chase) test.

**Dependency preservation**: every FD of F can be checked inside one part, or follows from the FDs that hold in the parts: $(\pi_{R_1}(F) \cup \dots \cup \pi_{R_m}(F))^+ = F^+$. Test for X → Y: start Z = X; repeat for each part Ri: Z := Z ∪ (( Z ∩ Ri)⁺ ∩ Ri); if Y ⊆ Z at the end, it is preserved.

Example (M23 endsem Q6): R(A, B, C, D), A → B, B → C, C → D. {R1(A, B, D), R2(B, C)}: A → B in R1, B → C in R2, but C → D: no part contains both C and D, and from C we get nothing in R1 or R2 beyond C. **Not preserved.** {(A, B), (B, C), (C, D)}: each FD sits in one part. **Preserved** (and lossless: each split is on a key).

**The trade-off**: 3NF synthesis always gives lossless **and** dependency-preserving. BCNF decomposition always gives lossless, but **may lose** dependencies (R(A, B, C), AB → C, C → B: BCNF gives (C, B), (A, C), and AB → C is lost).

## Minimal cover (canonical cover)

A set F is minimal if (1) every right side is one attribute, (2) no left side has an extraneous attribute, (3) no FD is redundant. Algorithm (Elmasri 15.1, Algorithm 15.2):

1. **Split right sides**: X → ABC becomes X → A, X → B, X → C.
2. **Remove extraneous left attributes**: for XB → A, if A ∈ $X^+$ (computed with the *current* F), replace with X → A.
3. **Remove redundant FDs**: for each X → A, compute $X^+$ using F without that FD; if A is still in it, delete the FD. Test against the **current, already reduced** set.

Order matters and covers are not unique; the rubric says **verify, don't match**: check the result is equivalent to F and minimal.

A4 group Q3: {L → A, F → GKL, C → AFK, K → F}. Split: L → A, F → G, F → K, F → L, C → A, C → F, C → K, K → F. Left sides single, nothing to remove. Redundancy: C → A is redundant (C → F → L → A); after removing it, C → F is redundant (C → K → F); C → K is then essential. **Minimal cover** {L → A, F → G, F → K, F → L, K → F, C → K}. Trap: each of C → A, C → F, C → K is redundant *in the original*, but you cannot drop all three.

## The two decomposition algorithms

**BCNF decomposition** (Algorithm 15.5): while some Ri is not in BCNF, pick a violating X → Y holding in Ri (use closures: X with $X^+ ∩ R_i$ bigger than X but not all of Ri), replace Ri by **(X ∪ Y)** and **(Ri − (Y − X))**. Each split is lossless because X is a key of X ∪ Y. After each split, **re-derive the FDs that hold in each part** (projections, including derived ones) before checking again.

A4 individual Q2 BCNF: closures $K^+ = L^+$ = AGKL, $F^+$ = AF, $C^+$ = ACFG. Split on K → AGL: R1 = (K, L, A, G) (keys K and L; BCNF) and R2 = R − (AGL − K) = (C, F, K). In R2: C → F holds, C is not a key (key CK), so split: (C, F) and (C, K). Result **{(K, L, A, G), (C, F), (C, K)}**. Other orders give other correct answers, e.g. {(F, A), (C, F, G), (K, L), (C, K)}.

**3NF synthesis** (Algorithm 15.4): (1) find a minimal cover G; (2) for each left side X, make a relation X ∪ {all A with X → A in G}; (3) if no relation contains a candidate key of R, add one relation that is a key; (4) remove any relation contained in another. Result: 3NF, lossless, dependency-preserving.

A4 individual Q2 3NF: minimal cover {L → K, K → A, K → G, K → L, C → F, C → G, F → A}. Groups: (L, K), (K, A, G, L), (C, F, G), (F, A). No relation contains CK or CL → add (C, K). (L, K) ⊆ (K, A, G, L) → drop it. **{(K, L, A, G), (C, F, G), (F, A), (C, K)}**.

## Beyond BCNF (Elmasri 14.6–14.7, for recognition)

A **multivalued dependency** X ↠ Y: the set of Y values for an X is independent of the other attributes (an employee's projects and dependents). **4NF**: every non-trivial MVD has a superkey left side; fix by splitting EMP(Ename, Pname, Dname) into (Ename, Pname) and (Ename, Dname). **5NF** concerns join dependencies. Not tested in assignments; know the definitions.

# Reference: Functional dependencies and normalisation

## Definitions

| Term | Meaning |
| --- | --- |
| X → Y | Tuples agreeing on X agree on Y (all legal states) |
| $X^+$ | All attributes determined by X; X → B ∈ $F^+$ iff B ∈ $X^+$ |
| Superkey | $S^+$ = R |
| Candidate key | Minimal superkey |
| Prime attribute | In some candidate key |
| Partial dependency | Non-prime attribute depends on a proper subset of a key |
| Transitive dependency | Key → Z → A with Z not a key, A non-prime |
| Equivalent F ≡ G | $F^+ = G^+$ (each implies every FD of the other) |
| Minimal cover | Single right sides, no extraneous left attribute, no redundant FD |

## Normal form tests

| NF | Condition on every non-trivial X → A in $F^+$ |
| --- | --- |
| 1NF | Atomic, single-valued attributes |
| 2NF | A non-prime ⇒ X is not a proper subset of any candidate key |
| 3NF | X is a superkey **or** A is prime |
| BCNF | X is a superkey |
| 4NF | Every non-trivial MVD X ↠ Y: X is a superkey |

## Algorithms

- **Closure**: grow X with right sides whose left sides are already in.
- **Keys**: attributes on no right side are in every key; start from them.
- **Minimal cover**: split right sides → drop extraneous left attributes → drop redundant FDs (test each against the current set).
- **BCNF**: split on violating X → Y into XY and R − (Y − X); recompute projected FDs; repeat. Lossless; may lose FDs.
- **3NF synthesis**: minimal cover → one relation per left side → add a key relation if needed → drop contained relations. Lossless and dependency-preserving.
- **Lossless binary test**: $R_1 \cap R_2$ is a superkey of R1 or of R2.

## Rules from Kamal's A4 rubric

- Decompositions and covers are not unique: **check, don't match**.
- **Error carried forward**: later parts graded against your own earlier result.
- Answer without working earns only the final-answer mark; show closures.
- Common zero-mark slips: citing an FD that is not a violation (e.g. K → L inside a key as a 2NF violation), dropping an essential FD from the cover, a BCNF answer where no relation contains a key (lossy), keeping a contained relation in 3NF synthesis.

## What to be able to do without notes

- Compute any closure in under a minute; list all candidate keys.
- State and apply the general 2NF / 3NF / BCNF definitions; name the highest NF with the violating FD.
- Run BCNF decomposition and 3NF synthesis; prove lossless (common attributes are a key of one side) and check dependency preservation.
- Prove simple FD facts (attribute on no right side is in every key; adding A → K makes A a key).
- Count superkeys from the keys (formula and inclusion–exclusion in the chapter on the relational model).

# Practice: Functional dependencies and normalisation

## A. Assignment 4 (this year)

### Problem 1 [FD · Proof · 5 pts · Assignment 4 individual Q1]

Let R(A, B, C, D, E, F, G, H) have FD set F, and suppose A belongs to no key of R. Specify one FD X → Y to add to F so that A becomes a key. Justify.

*Solution.* Let K be any candidate key of R (one exists because R is a superkey of itself, and every superkey contains a candidate key). A ∉ K since A is in no key. Add **A → K**. Then $A^+$ ⊇ K by the new FD, and K → R holds since K is a key, so by transitivity A → R and $A^+$ = R. {A} is a single attribute, so it has no proper non-empty subset: A is a **candidate key**, not just a superkey. This works for any F, since it only uses that K is a key. (A → BCDEFGH also works but earned at most 4/5.)

### Problem 2 [Normalisation · Application · 20 pts · Assignment 4 individual Q2]

R(A, C, F, G, K, L), G = {L → K, K → GAL, C → FG, F → A}. (a) Highest normal form. (b) BCNF decomposition. (c) Minimal cover. (d) 3NF synthesis from the cover.

*Solution.* Closures: $A^+$ = A, $G^+$ = G, $F^+$ = AF, $C^+$ = ACFG, $K^+ = L^+$ = AGKL, $(CK)^+ = (CL)^+$ = R.

(a) C is on no right side → in every key. Keys **CK** and **CL**. Prime C, K, L; non-prime A, F, G. C → FG: C ⊂ CK, F and G non-prime → partial dependency → not 2NF. **Highest NF: 1NF.**

(b) Violations: L → K…, K → AGL, C → FG, F → A (none of L, K, C, F is a superkey). Split on K → AGL: R1(K, L, A, G) (keys K, L; BCNF) and R2(C, F, K). In R2, C → F and C is not a key of R2 (CK is): split into (C, F) and (C, K). **{(K, L, A, G), (C, F), (C, K)}**, lossless because each split's common attribute (K, then C) is a key of one side. Also correct: {(K, L, A, G), (C, F), (C, L)}; {(F, A), (C, F, G), (K, L), (C, K)}.

(c) Split: L → K, K → G, K → A, K → L, C → F, C → G, F → A. Left sides single. Redundancy test, computing the left side's closure without the FD under test: L → K gives L (keep); K → G gives AKL (keep); K → A gives GKL (keep); K → L gives AGK (keep); C → F gives CG (keep); C → G gives ACF (keep); F → A gives F (keep). Nothing is redundant. **{L → K, K → A, K → G, K → L, C → F, C → G, F → A}**.

(d) Groups: (L, K), (K, A, G, L), (C, F, G), (F, A). No group contains CK or CL → add **(C, K)**. (L, K) ⊆ (K, A, G, L) → drop. **{(K, L, A, G), (C, F, G), (F, A), (C, K)}**, lossless and dependency-preserving.

### Problem 3 [FD · Proof · 10 pts · Assignment 4 group Q1]

Prove or disprove: if attribute A appears on the right-hand side of no FD in F, then A belongs to every candidate key.

*Solution.* **True.** Let K be any candidate key and suppose A ∉ K. K is a superkey, so A ∈ $K^+$. The closure algorithm starts from K (no A) and only ever adds attributes from right-hand sides of FDs in F; none contains A. So A ∉ $K^+$: contradiction. Hence A ∈ K, and in fact A is in every superkey. Assumption to state: "right-hand side" means the FDs as listed in F (in $F^+$, the trivial A → A always has A on the right). Proving it on examples is not a proof.

### Problem 4 [FD · Proof · 10 pts · Assignment 4 group Q2]

For R(A1, …, An), find the minimum number of FDs that makes every non-empty subset of attributes a superkey; then give a 3NF decomposition.

*Solution.* Every non-empty subset is a superkey iff every single attribute is (supersets of superkeys are superkeys). For each i, the closure of {Ai} must grow, so F needs an FD with left side exactly {Ai}: at least **n** FDs (n ≥ 2). The cycle A1 → A2, A2 → A3, …, An → A1 achieves it: following the cycle from any Ai reaches everything. Minimum **n** (0 if n = 1). Every left side is a single attribute, which is a key, so R is already in **BCNF**, hence 3NF: the decomposition is {R} itself. Wrong counts: n − 1 (open chain: $A_n^+$ = An), n(n − 1) (not minimal). Never split into single-attribute relations: their join is a Cartesian product (lossy).

### Problem 5 [Normalisation · Application · 20 pts · Assignment 4 group Q3]

R(A, C, F, G, K, L), Σ = {L → A, F → GKL, C → AFK, K → F}. Same four parts.

*Solution.* $C^+$ = R; $F^+ = K^+$ = AFGKL; $L^+$ = AL. **Only key C**; prime C.

(a) Single-attribute key → 2NF automatically. F → GKL: F not a superkey, right side non-prime → not 3NF. **Highest NF: 2NF.**

(b) Split on L → A: (L, A) and (C, F, G, K, L). In the second, F → GKL violates: split into (F, G, K, L) (keys F, K) and (C, F). **{(A, L), (F, G, K, L), (C, F)}**, lossless and here also dependency-preserving.

(c) **{L → A, F → G, F → K, F → L, K → F, C → K}** (C → A and C → F redundant, as shown in the Learn section). Alternative: keep C → F instead of C → K.

(d) Groups (L, A), (F, G, K, L), (K, F), (C, K); C is in (C, K), no key relation needed; (K, F) ⊆ (F, G, K, L) → drop. **{(A, L), (F, G, K, L), (C, K)}**. Same as BCNF here.

## B. Past papers (other years; style differs)

### Problem 6 [Normalisation · Application · 6 pts · M23 endsem Q4]

R(A, B, C, D, E), FDs A → DE, B → A, D → C. (a) Primary key, with justification. (b) 2NF? (c) 3NF?

*Solution.* (a) B is on no right side, so it is in every key. $B^+$: B → A → DE → C = ABCDE. **Key B** (only candidate key). (b) The key is a single attribute: no partial dependency possible, **2NF holds**. Saying "not 2NF" was marked wrong. (c) B → A → D → C: A and D are non-key, so A → DE and D → C are transitive: **not 3NF**. Decompose: **R1(B, A), R2(A, D, E), R3(D, C)**.

### Problem 7 [Normalisation · Application · 5 pts · M23 endsem Q5]

R(P, Q, R, S, T, U, V, W, X, Y), FDs PQ → R, PS → VW, QS → TU, P → X, W → Y; the key is PQS. In 2NF? If not, convert.

*Solution.* PQ → R is a partial dependency (PQ ⊂ PQS, R non-prime): **not 2NF**. Remove partial dependencies: **R1(P, Q, R), R2(P, S, V, W, Y), R3(Q, S, T, U), R4(P, X), R5(P, Q, S)**. (W → Y is transitive, not partial; it may stay with PS → VW for 2NF, and moving it to (W, Y) gives 3NF. The official key listed it separately; either was accepted.)

### Problem 8 [Decomposition · Application · 4 pts · M23 endsem Q6]

R(A, B, C, D), A → B, B → C, C → D. Is each decomposition dependency-preserving? (i) R1(A, B, D), R2(B, C). (ii) R1(A, B), R2(B, C), R3(C, D).

*Solution.* (i) A → B in R1, B → C in R2. C → D: test Z = C; R1: (C ∩ ABD)⁺ adds nothing; R2: $C^+$ ∩ BC = C. Z stays C, D never reached. Also A → D holds in R1 (via $A^+$), but that does not help C → D. **Not preserving.** (ii) Each FD lies in one part: **preserving**.

Advantages of decomposing: less redundancy, no update anomalies, fewer NULLs. Disadvantages: queries need joins (slower), risk of losing dependencies or creating spurious tuples if done wrong.

### Problem 9 [Normalisation · Application · 6 pts · M25 endsem Q5]

R(A, B, C, D), FDs A → B, BC → D, D → A. (a) All candidate keys. (b) 3NF? (c) BCNF?

*Solution.* C is on no right side: in every key. $C^+$ = C. $(AC)^+$: A → B, BC → D → ACBD = R. $(BC)^+$ = BCDA = R. $(CD)^+$: D → A → B = R. So **keys AC, BC, CD**. Every attribute is prime. (b) **3NF holds**: every right side (B, D, A) is prime. (c) A → B: A is not a superkey → **not BCNF** (also D → A).

### Problem 10 [Normalisation · Application · 4 pts · M24 Quiz 4 Q3]

R(A, B, C, D, E, F, G, H, I, J), FDs AB → C, AD → GH, BD → EF, A → I, H → J. In 3NF? If not, decompose.

*Solution.* A, B, D are on no right side; $(ABD)^+$ = R, so **ABD** is the only key. AB → C: AB is not a superkey and C is non-prime → **not 3NF** (also partial, so not even 2NF). 3NF synthesis: **(A, B, C), (A, D, G, H), (B, D, E, F), (A, I), (H, J), (A, B, D)**; the last holds the key, so the decomposition is lossless.

### Problem 11 [Normalisation · Application · 7 pts · M24 Quiz 4 Q4]

For each, give candidate keys and decompose to BCNF through 1NF, 2NF, 3NF: (a) R1(A, B, C, D, E), A → B, C → D. (b) R2(A, B, F), AB → F, B → F.

*Solution.* (a) Key **ACE** (E appears in no FD). 1NF yes (atomic). A → B and C → D are partial → not 2NF; decompose (A, B), (C, D), (A, C, E). These are in 3NF and BCNF. (b) Key **AB**. B → F is partial → not 2NF; decompose (B, F), (A, B). Both BCNF.

### Problem 12 [1NF · Application · 5 pts · M24 Quiz 4 Q2]

EMPLOYEE(Employee_ID, Phone_Number (multivalued), Dept, Manager_ID). Convert to 1NF and 2NF and say what problems each avoids.

*Solution.* Best 1NF: EMP(**Employee_ID**, Dept, Manager_ID), EMP_PHONE(**Employee_ID, Phone**): already 2NF (EMP has a single-attribute key; EMP_PHONE is all key). Alternative 1NF: one row per phone with key (Employee_ID, Phone); then Dept and Manager_ID depend on Employee_ID alone (partial), so 2NF splits them out. 1NF avoids non-atomic values (cannot query or index one phone number). 2NF avoids repeating Dept and Manager_ID for each phone (update anomalies). Note also Dept → Manager_ID is transitive: 3NF would move it to DEPT(Dept, Manager_ID).

### Problem 13 [Normalisation · Concept · 3 pts · M22 endsem Q6]

Should every database be normalised to 3NF? Give an example where it causes issues.

*Solution.* Not always. Normalisation trades redundancy for joins. Read-heavy reporting tables (data warehouses) are often **denormalised** so that common queries avoid many joins. Example: an order-history report joining ORDER, CUSTOMER, PRODUCT and ADDRESS for every row; storing CustomerName in ORDER duplicates data but makes the report fast, and historical orders should keep the address at time of order anyway. Also, BCNF can lose dependencies (AB → C, C → B), so 3NF is often the practical stopping point.
