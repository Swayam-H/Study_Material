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

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

## A. Assignment 4 (this year)

### Problem 1 [FD · Proof · 5 pts · Assignment 4 individual Q1]

Let R(A, B, C, D, E, F, G, H) have FD set F, and suppose A belongs to no key of R. Specify one FD X → Y to add to F so that A becomes a key. Justify.

*Solution.*

**Assumption.** F is an arbitrary set of FDs on R, and every attribute is single-valued. *(Reason: the question does not fix F, so the answer must work for every F.)*

**Answer.** Add the FD **A → K**, where K is any candidate key of R.

**Proof that A becomes a key.**
1. R has at least one candidate key K, because the set of all attributes of R is a superkey and every superkey contains a candidate key. Since A belongs to no key, A ∉ K.
2. After adding A → K, we have A → K. Since K is a key, K → R holds. By transitivity, A → R, that is, $A^+ = R$. So {A} is a superkey.
3. {A} consists of a single attribute, so its only proper subset is the empty set, which is not a superkey. Hence {A} is minimal, and A is a **candidate key**, not merely a superkey.
4. The argument used only the fact that K is a key, so it holds for every F.

**Final answer.** Add **A → K** for a candidate key K of R; then $A^+ = R$ and A is a candidate key.

> **Examiner's note.** A → R (or A → BCDEFGH) is also correct but was capped at 4 of 5, because it does not use the structure of R. A → B, or any FD with A on the right, earns nothing.

### Problem 2 [Normalisation · Application · 20 pts · Assignment 4 individual Q2]

R(A, C, F, G, K, L), G = {L → K, K → GAL, C → FG, F → A}. (a) Highest normal form. (b) BCNF decomposition. (c) Minimal cover. (d) 3NF synthesis from the cover.

*Solution.*

**Assumption.** The given FDs are the complete specification, and all attributes are atomic. *(Reason: stated in the question; normal forms are judged with respect to $G^+$.)*

**Closures.** $A^+ = A$, $G^+ = G$, $F^+ = AF$, $C^+ = ACFG$, $K^+ = L^+ = AGKL$, $(CK)^+ = (CL)^+ = ACFGKL = R$.

**(a) Highest normal form.**
1. C appears on no right-hand side, so C is in every candidate key. $C^+ \ne R$, so C alone is not a key.
2. $(CK)^+ = R$ and $(CL)^+ = R$, while adding A, F or G to C does not reach K or L. Hence the candidate keys are **CK** and **CL**.
3. Prime attributes: C, K, L. Non-prime attributes: A, F, G.
4. C → FG holds, C is a proper subset of the key CK, and F and G are non-prime. This is a partial dependency, so R is **not in 2NF**. R is in 1NF because all attributes are atomic.

**(a) Answer.** The highest normal form is **1NF**.

**(b) BCNF decomposition.**
1. K → AGL violates BCNF ($K^+ = AGKL \ne R$). Decompose R into R1 = (K, L, A, G) and R2 = R − (AGL − K) = (C, F, K).
2. In R1 the FDs K → AGL and L → K hold; K and L are keys of R1, so R1 is in BCNF.
3. In R2 the FD C → F holds, but the key of R2 is CK, so C is not a superkey of R2. Decompose R2 into (C, F) and (C, K). Both are two-attribute relations, hence in BCNF.
4. Each split is lossless, because the common attributes (K in step 1, C in step 3) form a key of one of the two parts.

**(b) Answer.** **{(K, L, A, G), (C, F), (C, K)}**, a lossless BCNF decomposition.

**(c) Minimal cover.**
1. Splitting right-hand sides gives L → K, K → G, K → A, K → L, C → F, C → G, F → A.
2. Every left-hand side is a single attribute, so no attribute is extraneous.
3. For each FD X → B, compute $X^+$ using the other FDs: L → K gives $L^+ = L$; K → G gives AKL; K → A gives GKL; K → L gives AGK; C → F gives CG; C → G gives ACF; F → A gives F. In no case is B reached, so no FD is redundant.

**(c) Answer.** **{L → K, K → A, K → G, K → L, C → F, C → G, F → A}**.

**(d) 3NF synthesis.**
1. One relation per left-hand side of the cover: (L, K), (K, A, G, L), (C, F, G), (F, A).
2. No relation contains a candidate key (CK or CL), so add (C, K).
3. (L, K) is contained in (K, A, G, L), so remove it.

**(d) Answer.** **{(K, L, A, G), (C, F, G), (F, A), (C, K)}**, which is in 3NF, lossless (it contains the key CK) and dependency-preserving (every FD of the cover lies within one relation).

> **Examiner's note.** Decompositions and covers are not unique; the grader checks yours against the definitions. Also correct for (b): {(K, L, A, G), (C, F), (C, L)} or {(F, A), (C, F, G), (K, L), (C, K)}. Wrong: citing K → L or L → K as a 2NF violation (K and L are prime).

### Problem 3 [FD · Proof · 10 pts · Assignment 4 group Q1]

Prove or disprove: if attribute A appears on the right-hand side of no FD in F, then A belongs to every candidate key.

*Solution.*

**Assumption.** "Does not appear on the right-hand side of any FD in F" refers to the FDs as listed in F, not to $F^+$. *(Reason: $F^+$ always contains the trivial FD A → A, so under that reading the hypothesis could never hold.)*

**Answer.** The statement is **true**.

**Proof.**
1. Let K be any candidate key of R, and suppose for contradiction that A ∉ K.
2. Since K is a superkey, $K^+ = R$, so A ∈ $K^+$.
3. The closure algorithm starts with the set K, which does not contain A, and each step adds only attributes that lie on the right-hand side of some FD in F.
4. By hypothesis, A lies on no right-hand side, so no step can add A. Hence A ∉ $K^+$.
5. Steps 2 and 4 contradict each other, so A ∈ K.
6. K was an arbitrary candidate key, so A belongs to every candidate key.

**Final answer.** True: an attribute that appears on no right-hand side cannot be derived from other attributes, so it belongs to every superkey and therefore to every candidate key.

> **Examiner's note.** Checking the statement on one or two examples is not a proof; an example can only disprove a universal claim.

### Problem 4 [FD · Proof · 10 pts · Assignment 4 group Q2]

For R(A1, …, An), find the minimum number of FDs that makes every non-empty subset of attributes a superkey; then give a 3NF decomposition.

*Solution.*

**Assumptions.**
1. n ≥ 2 (for n = 1 the only non-empty subset is R itself and no FD is needed). *(Reason: the case n = 1 is trivial.)*
2. Every FD has a non-empty left-hand side. *(Reason: ∅ → Y would force Y to be constant in every state.)*

**Step 1: reduction to single attributes.** Every superset of a superkey is a superkey, and every non-empty subset contains a single attribute. So every non-empty subset is a superkey if and only if $\{A_i\}^+ = R$ for every i.

**Step 2: at least n FDs are needed.** Fix i. The closure of {Ai} can grow only through an FD whose left-hand side is contained in {Ai}; since left-hand sides are non-empty, that left-hand side is exactly {Ai}. So for each i, F must contain an FD with left-hand side {Ai}. These n FDs are distinct, so |F| ≥ n.

**Step 3: n FDs suffice.** Take F = {A1 → A2, A2 → A3, …, An−1 → An, An → A1}. Starting from any Ai and following the cycle reaches every attribute, so $\{A_i\}^+ = R$ for all i.

**Step 4: 3NF decomposition.** Every FD in F has a single attribute on its left-hand side, and each single attribute is a key. More generally every non-trivial FD in $F^+$ has a non-empty left-hand side, which contains some Ai and is therefore a superkey. So R is already in **BCNF**, hence in 3NF, and no decomposition is needed.

**Final answer.** The minimum is **n** FDs (for example the cycle A1 → A2 → … → An → A1), and the 3NF decomposition is **{R}** itself, which is trivially lossless and dependency-preserving.

> **Examiner's note.** Common wrong counts: n − 1 (an open chain fails because $\{A_n\}^+ = \{A_n\}$) and n(n − 1) (sufficient but not minimal). Never decompose into single-attribute relations: their natural join is a Cartesian product, so the decomposition is lossy.

### Problem 5 [Normalisation · Application · 20 pts · Assignment 4 group Q3]

R(A, C, F, G, K, L), Σ = {L → A, F → GKL, C → AFK, K → F}. Same four parts.

*Solution.*

**Assumption.** The FD set is written Σ to avoid confusion with the attribute G. *(Reason: the question names both the FD set and an attribute G.)*

**Closures.** $C^+ = R$; $F^+ = K^+ = AFGKL$; $L^+ = AL$; $A^+ = A$; $G^+ = G$.

**(a) Highest normal form.**
1. C appears on no right-hand side, so it is in every key; $C^+ = R$, so **C is the only candidate key**. The only prime attribute is C.
2. The key is a single attribute, so no partial dependency is possible: R is in **2NF**.
3. F → GKL holds, F is not a superkey, and G, K, L are non-prime, so R is **not in 3NF**. (L → A and K → F violate 3NF in the same way.)

**(a) Answer.** The highest normal form is **2NF**.

**(b) BCNF decomposition.**
1. L → A violates BCNF. Decompose into R1 = (L, A), with key L, and R2 = (C, F, G, K, L).
2. In R2 the FD F → GKL holds and F is not a key of R2. Decompose R2 into R3 = (F, G, K, L), with keys F and K, and R4 = (C, F), with key C.
3. R1, R3 and R4 are in BCNF: in each, every non-trivial FD that holds has a key on its left-hand side.
4. Both splits are lossless, because the common attribute (L, then F) is a key of one part.

**(b) Answer.** **{(A, L), (F, G, K, L), (C, F)}**. It is also dependency-preserving here: C → AFK follows from C → F, F → KL and L → A.

**(c) Minimal cover.**
1. Split right-hand sides: L → A, F → G, F → K, F → L, C → A, C → F, C → K, K → F.
2. All left-hand sides are single attributes, so nothing is extraneous.
3. Test each FD against the current set. C → A is redundant (C → F → L → A); remove it. With the reduced set, C → F is redundant (C → K → F); remove it. C → K is now essential ($C^+ = C$ without it). Every other FD is essential.

**(c) Answer.** **{L → A, F → G, F → K, F → L, K → F, C → K}**.

**(d) 3NF synthesis.**
1. Relations from the cover: (L, A), (F, G, K, L), (K, F), (C, K).
2. (C, K) contains the key C, so no extra relation is needed.
3. (K, F) is contained in (F, G, K, L), so remove it.

**(d) Answer.** **{(A, L), (F, G, K, L), (C, K)}**, which is lossless and dependency-preserving; here it coincides with a BCNF decomposition.

> **Examiner's note.** C → A, C → F and C → K are each redundant in the original set, but they cannot all be removed: redundancy must be tested against the current, already reduced set.

## B. Textbook exercises set by Kamal

These are the problem-type exercises from the TA's list (Elmasri 14.19–14.34, 15.21, 15.24), worked the way the A4 key works a problem: assumptions, closures, keys, then each decomposition with its reason.

### Problem 6 [Normalisation · Application · 15 pts · Elmasri 14.19]

A university keeps: STUDENT (Sname, Snum, Ssn, Sc_addr, Sc_phone, Sp_addr, Sp_phone, Bdate, Sex, Class, Major_code, Minor_code, Prog), with Ssn and Snum each unique; DEPARTMENT (Dname, Dcode, Doffice, Dphone, Dcollege), with Dname and Dcode each unique; COURSE (Cname, Cdesc, Cnum, Credit, Level, Cdept), with Cnum unique; SECTION (Iname, Semester, Year, Sec_course, Sec_num), where Sec_num numbers the sections of one course in one semester and year as 1, 2, 3, …; a grade record (Ssn, a section, Grade). Show all FDs, then design 3NF or BCNF relations with their keys. Note unspecified requirements and make assumptions.

*Solution.*

**Assumptions.**
1. A section is identified by (Sec_course, Semester, Year, Sec_num). *(Reason: Sec_num restarts at 1 for each course and semester, so it identifies a section only together with the course, semester and year.)*
2. Each section has exactly one instructor, and Iname identifies the instructor. *(Reason: the requirement gives one Iname per section and no instructor number. In practice names are not unique, so an instructor ID would be better.)*
3. A student has at most one grade per section. *(Reason: a grade record "refers to a student, a particular section, and a grade".)*
4. Addresses and phones are independent: Sc_phone does not determine Sc_addr, and Doffice does not determine Dphone. *(Reason: the requirements do not say so, and phones can be shared or mobile.)*
5. Major_code, Minor_code and Cdept are department codes. Minor_code may be NULL. *(Reason: "minor department (if any)".)*
6. Cname is not assumed unique. *(Reason: only Cnum is said to be unique.)*

**Functional dependencies.**
1. FD1: Ssn → Sname, Snum, Sc_addr, Sc_phone, Sp_addr, Sp_phone, Bdate, Sex, Class, Major_code, Minor_code, Prog.
2. FD2: Snum → Ssn (so Snum determines everything Ssn determines).
3. FD3: Dcode → Dname, Doffice, Dphone, Dcollege.
4. FD4: Dname → Dcode.
5. FD5: Cnum → Cname, Cdesc, Credit, Level, Cdept.
6. FD6: {Sec_course, Semester, Year, Sec_num} → Iname.
7. FD7: {Ssn, Sec_course, Semester, Year, Sec_num} → Grade.

**Design.** One relation per group of FDs, with the left-hand side as key:

| Relation | Attributes | Keys | Foreign keys |
| --- | --- | --- | --- |
| STUDENT | Ssn, Snum, Sname, Sc_addr, Sc_phone, Sp_addr, Sp_phone, Bdate, Sex, Class, Major_code, Minor_code, Prog | **Ssn** (primary), Snum | Major_code, Minor_code → DEPARTMENT.Dcode |
| DEPARTMENT | Dcode, Dname, Doffice, Dphone, Dcollege | **Dcode** (primary), Dname | |
| COURSE | Cnum, Cname, Cdesc, Credit, Level, Cdept | **Cnum** | Cdept → DEPARTMENT.Dcode |
| SECTION | Sec_course, Semester, Year, Sec_num, Iname | **{Sec_course, Semester, Year, Sec_num}** | Sec_course → COURSE.Cnum |
| GRADE_REPORT | Ssn, Sec_course, Semester, Year, Sec_num, Grade | **{Ssn, Sec_course, Semester, Year, Sec_num}** | Ssn → STUDENT; (Sec_course, Semester, Year, Sec_num) → SECTION |

**Normal form.**
1. In each relation, every non-trivial FD that holds has a key of that relation on the left: FD1 and FD2 in STUDENT, FD3 and FD4 in DEPARTMENT, FD5 in COURSE, FD6 in SECTION, FD7 in GRADE_REPORT.
2. No FD crosses relations, so none is lost.

**Final answer.** The five relations above are each in **BCNF** (hence 3NF), with the keys shown, and the design preserves all seven FDs.

**Unspecified requirements noted.** Whether an instructor needs an ID; whether a student may repeat a course in a later semester (allowed here, since the section key includes semester and year); whether a course must belong to an existing department (assumed yes, via the foreign key); whether Prog values are restricted per department.

> **Examiner's note.** Marks go to the FDs and the keys. The most common error is keying SECTION on Sec_num alone. If you assume Sc_phone → Sc_addr, you must split STUDENT further, and that is fine when stated.

### Problem 7 [Anomalies · Concept · 6 pts · Elmasri 14.20]

What update anomalies occur in the EMP_PROJ and EMP_DEPT relations of Figures 14.3 and 14.4?

*Solution.*

**Assumptions.**
1. EMP_DEPT(Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn) has key Ssn. EMP_PROJ(Ssn, Pnumber, Hours, Ename, Pname, Plocation) has key {Ssn, Pnumber}. *(Reason: as in Figures 14.3 and 14.4.)*

**EMP_DEPT.**
1. **Insertion.**
   1. To insert a new employee, the department's Dname and Dmgr_ssn must be typed again, consistently with every other employee of that department.
   2. A department with no employees cannot be inserted, because Ssn (the key) would be NULL.
2. **Deletion.** Deleting the last employee of a department also deletes the only record of that department's name and manager.
3. **Modification.** Changing the manager of department 5 requires updating the tuple of *every* employee in department 5. Missing one leaves the database inconsistent.

**EMP_PROJ.**
1. **Insertion.** A project with no employees assigned cannot be inserted, because Ssn is part of the key. An employee who works on no project cannot be inserted either.
2. **Deletion.** Deleting the last employee who works on a project deletes the project's name and location.
3. **Modification.** Changing a project's Pname or Plocation, or an employee's Ename, requires updating every tuple for that project or employee.

**Cause.** Both relations mix two entities: employee and department in EMP_DEPT, and employee, project and works-on in EMP_PROJ. The cause is the dependencies Dnumber → Dname, Dmgr_ssn (transitive), and Ssn → Ename, Pnumber → Pname, Plocation (partial).

> **Examiner's note.** Give one example of each kind for each relation, and name the dependency that causes it. That link is what chapter 14 is building towards.

### Problem 8 [Normal forms · Concept · 5 pts · Elmasri 14.21]

In what normal form is LOTS (Figure 14.12(a)) with respect to the restrictive definitions that use only the primary key? Would it be the same under the general definitions?

*Solution.*

**Assumptions.**
1. LOTS(Property_id#, County_name, Lot#, Area, Price, Tax_rate), primary key Property_id#, candidate key {County_name, Lot#}. *(Reason: Figure 14.12(a).)*
2. FD1: Property_id# → all; FD2: {County_name, Lot#} → all; FD3: County_name → Tax_rate; FD4: Area → Price. *(Reason: the FDs of Figure 14.12(a), before FD5 is added for BCNF.)*

**Primary key only.**
1. The primary key has one attribute, so no attribute can depend on part of it. LOTS is in **2NF** under the restrictive definition.
2. Property_id# → County_name → Tax_rate and Property_id# → Area → Price are transitive dependencies on the primary key. So LOTS is **not in 3NF**.
3. Answer: **2NF**.

**General definitions (all candidate keys).**
1. County_name → Tax_rate: County_name is a proper subset of the candidate key {County_name, Lot#}, and Tax_rate is not prime. This is a partial dependency on a candidate key, so LOTS is **not in 2NF**.
2. Answer: only **1NF**.

**Final answer.** 2NF under the primary-key definitions; 1NF under the general definitions, because Tax_rate depends partially on the candidate key {County_name, Lot#}. So the answer is not the same.

> **Examiner's note.** This is the reason the general definitions exist. Check every candidate key, not just the primary key, in every NF question this year.

### Problem 9 [BCNF · Proof · 5 pts · Elmasri 14.22]

Prove that any relation schema with two attributes is in BCNF.

*Solution.*

**Assumptions.**
1. R(A, B) has two attributes, and every FD has a non-empty left-hand side. *(Reason: this is the usual convention. An FD ∅ → A would say that A is constant, and then the claim can fail. See the examiner's note.)*

**Proof.** A relation is in BCNF if every non-trivial FD X → Y that holds on it has X a superkey. With attributes A and B, the only non-trivial FDs with non-empty left sides are A → B and B → A. (Any FD with AB on the left is trivial, and A → A, B → B are trivial.) There are four cases:
1. **Neither holds.** There is no non-trivial FD, so the BCNF condition holds vacuously. The key is {A, B}.
2. **Only A → B holds.** Then $A^+ = AB$, so A is a superkey (indeed the key). The only non-trivial FD has a superkey on its left.
3. **Only B → A holds.** Symmetric to case 2: B is the key.
4. **Both hold.** A and B are both keys, and both FDs have a key on the left.

In every case, every non-trivial FD has a superkey as its left-hand side, so R is in BCNF. ∎

> **Examiner's note.** Kamal's proofs (A4, A5) are graded on going case by case from the definition, as here. If ∅ → A were allowed with no ∅ → B, the key would be B and ∅ → A would violate BCNF. Naming the assumption that rules this out is a mark of an A answer.

### Problem 10 [Spurious tuples · Concept · 4 pts · Elmasri 14.23]

Why do spurious tuples occur when EMP_PROJ1 and EMP_LOCS (Figure 14.5) are joined (Figure 14.6)?

*Solution.*

**Assumptions.**
1. EMP_LOCS(Ename, Plocation) and EMP_PROJ1(Ssn, Pnumber, Hours, Pname, Plocation), joined naturally on Plocation. *(Reason: Figure 14.5.)*

**Explanation.**
1. The natural join pairs every EMP_PROJ1 tuple with every EMP_LOCS tuple that has the same Plocation.
2. Plocation is not a key of either relation: many projects are at Houston, and many employees work at Houston.
3. So a project at Houston gets paired with *every* employee who works on any Houston project, not just the employees who work on that project. The result contains tuples saying that an employee works on a project they do not work on. These are the **spurious tuples**.
4. In terms of the lossless-join test (NJB): the decomposition is lossless only if the common attributes determine all attributes of one side. Here the common attribute is {Plocation}, and Plocation → Ename fails and Plocation → Ssn, Pnumber fails, so the decomposition is **lossy**.

**Final answer.** The join attribute Plocation is neither a primary key nor a foreign key referring to a key, so matching on it combines unrelated tuples. To avoid spurious tuples, decompose only so that the shared attributes form a key of at least one of the relations (primary key–foreign key pairs).

### Problem 11 [Normalisation · Application · 8 pts · Elmasri 14.24]

R = {A, B, C, D, E, F, G, H, I, J}, F = {AB → C, A → DE, B → F, F → GH, D → IJ}. Find the key, and decompose into 2NF then 3NF.

*Solution.*

**Assumption.** F is the complete set of FDs, and all attributes are atomic. *(Reason: the question gives F as the specification.)*

**Key.**
1. A and B appear on no right-hand side, so both are in every key.
2. $(AB)^+$: AB → C gives ABC; A → DE gives ABCDE; B → F gives ABCDEF; F → GH gives ABCDEFGH; D → IJ gives all of R.
3. $A^+ = ADEIJ$ and $B^+ = BFGH$, so neither alone is a key.
4. Every key contains A and B, and AB is already a key, so **AB is the only candidate key**.

**2NF.** The non-prime attributes are C to J.
1. A → DE, and through D → IJ, A → DEIJ: these depend on part of the key (partial).
2. B → F, and through F → GH, B → FGH: also partial.
3. Only C depends on the whole key.
4. Split off each partial dependency with everything it determines: R1(**A, B**, C), R2(**A**, D, E, I, J), R3(**B**, F, G, H).

**3NF.**
1. R1: AB → C, key AB. It is in 3NF.
2. R2: A → D → IJ is transitive (D is not a key of R2, and I, J are non-prime). Split into R21(**A**, D, E) and R22(**D**, I, J).
3. R3: B → F → GH is transitive. Split into R31(**B**, F) and R32(**F**, G, H).

**Final answer.** Key **AB**. 2NF: {R1(A, B, C), R2(A, D, E, I, J), R3(B, F, G, H)}. 3NF: **{(A, B, C), (A, D, E), (D, I, J), (B, F), (F, G, H)}**. Every relation's FDs have a key on the left, so they are also in BCNF, and each split is lossless because the shared attribute is a key of one side.

### Problem 12 [Normalisation · Application · 8 pts · Elmasri 14.25]

Repeat Problem 14.24 for G = {AB → C, BD → EF, AD → GH, A → I, H → J}.

*Solution.*

**Assumption.** G is complete, and all attributes are atomic. *(Reason: as given.)*

**Key.**
1. A, B and D appear on no right-hand side, so all three are in every key.
2. $(ABD)^+$: AB → C, BD → EF, AD → GH, A → I, then H → J. That is all of R.
3. Every key contains ABD, and ABD is a key, so **ABD is the only candidate key**.

**2NF.** The non-prime attributes are C, E, F, G, H, I, J. Each depends on a proper subset of ABD:
1. AB → C.
2. BD → EF.
3. AD → GH, and through H → J, AD → GHJ.
4. A → I.

None depends only on the whole key. The 2NF decomposition is R1(**A, B**, C), R2(**B, D**, E, F), R3(**A, D**, G, H, J), R4(**A**, I), and R5(**A, B, D**) to keep the key.

**3NF.** In R3, AD → H → J is transitive (H is not a key of R3, and J is non-prime). Split into R31(**A, D**, G, H) and R32(**H**, J). The other relations have only key-based FDs.

**Final answer.** Key **ABD**. 3NF: **{(A, B, C), (B, D, E, F), (A, D, G, H), (H, J), (A, I), (A, B, D)}**, also in BCNF. The decomposition is lossless because it contains the key relation (A, B, D), and it is dependency-preserving because each FD lies in one relation.

> **Examiner's note.** The common slip is forgetting the key relation (A, B, D). Without it, nothing records which (A, B, D) combinations exist, and the join is lossy.

### Problem 13 [FD · Application · 5 pts · Elmasri 14.26]

The relation state below has tuples 1 to 6: (10, b1, c1), (10, b2, c2), (11, b4, c1), (12, b3, c4), (13, b1, c1), (14, b3, c4) over (A, B, C). (a) Which of A → B, B → C, C → B, B → A, C → A may hold? Give the violating tuples for those that cannot. (b) Does the relation have a potential candidate key?

*Solution.*

**Assumption.** TUPLE# only numbers the rows and is not an attribute. *(Reason: it is not part of the schema (A, B, C).)*

**(a)** An FD X → Y fails in a state if two tuples agree on X and differ on Y. A state can disprove an FD but never prove it.
1. **A → B cannot hold**: tuples 1 and 2 have A = 10 but B = b1 and b2.
2. **B → C may hold**: b1 appears in tuples 1 and 5, both with c1; b3 appears in tuples 4 and 6, both with c4; b2 and b4 appear once.
3. **C → B cannot hold**: tuples 1 and 3 have C = c1 but B = b1 and b4.
4. **B → A cannot hold**: tuples 1 and 5 have B = b1 but A = 10 and 13.
5. **C → A cannot hold**: tuples 1 and 3 have C = c1 but A = 10 and 11.

**(b)**
1. No single attribute is unique: A repeats 10, B repeats b1 and b3, C repeats c1 and c4.
2. {A, B} values are (10, b1), (10, b2), (11, b4), (12, b3), (13, b1), (14, b3), all distinct.
3. {A, C} values are (10, c1), (10, c2), (11, c1), (12, c4), (13, c1), (14, c4), all distinct.
4. {B, C} repeats (b1, c1) in tuples 1 and 5.

**Final answer.** (a) Only **B → C** may hold. (b) Yes: **{A, B}** and **{A, C}** are potential candidate keys in this state. A state cannot prove a key; it only fails to disprove it.

### Problem 14 [Keys · Application · 4 pts · Elmasri 14.27]

R(A, B, C, D, E) with AB → C, CD → E, DE → B. Is AB a candidate key? If not, is ABD?

*Solution.*

**Assumption.** These are all the FDs. *(Reason: as given.)*

**Working.**
1. $(AB)^+$: AB → C gives ABC. No other FD applies (CD and DE need D). $(AB)^+ = ABC \ne R$, so **AB is not a key**; it does not even determine D or E.
2. $(ABD)^+$: ABC, then CD → E gives ABCDE = R. So ABD is a superkey.
3. Minimality: $(AB)^+ = ABC$, $(AD)^+ = AD$, $(BD)^+ = BD$. None is R, so no proper subset is a superkey.
4. Further: A and D appear on no right-hand side, so they are in every key. $(AD)^+ = AD$, so a key needs one more attribute: B gives ABD, C gives $(ACD)^+ = ACDEB = R$, E gives $(ADE)^+ = ADEBC = R$.

**Final answer.** AB is **not** a candidate key. **ABD is** a candidate key. The full set of candidate keys is **{ABD, ACD, ADE}**.

### Problem 15 [Normalisation · Application · 8 pts · Elmasri 14.28]

R = {Course_no, Sec_no, Offering_dept, Credit_hours, Course_level, Instructor_ssn, Semester, Year, Days_hours, Room_no, No_of_students} with FD1: Course_no → Offering_dept, Credit_hours, Course_level; FD2: {Course_no, Sec_no, Semester, Year} → Days_hours, Room_no, No_of_students, Instructor_ssn; FD3: {Room_no, Days_hours, Semester, Year} → Instructor_ssn, Course_no, Sec_no. Find the keys and normalise.

*Solution.*

**Assumption.** The three FDs are complete. *(Reason: as given.)*

**Keys.**
1. Semester and Year appear on no right-hand side, so they are in every key.
2. K1 = {Course_no, Sec_no, Semester, Year}: FD2 adds Days_hours, Room_no, No_of_students, Instructor_ssn; FD1 adds Offering_dept, Credit_hours, Course_level. $K1^+ = R$.
3. K2 = {Room_no, Days_hours, Semester, Year}: FD3 adds Instructor_ssn, Course_no, Sec_no; then FD2 adds No_of_students; FD1 adds the course attributes. $K2^+ = R$.
4. Minimality: dropping any attribute from K1 or K2 leaves a set that matches no left-hand side except FD1 (when Course_no stays), which does not give Sec_no, Room_no or Days_hours. So both are candidate keys.
5. Any other key must contain Semester and Year and must reach Sec_no and Room_no, which needs either {Course_no, Sec_no} or {Room_no, Days_hours}. So **K1 and K2 are the only keys**.

**Normal form of R.** FD1 has Course_no, a proper subset of K1, on the left, and its right side is non-prime. This is a partial dependency, so R is **not in 2NF** (it is in 1NF).

**Normalisation.**
1. Split on FD1: COURSE(**Course_no**, Offering_dept, Credit_hours, Course_level) and SECTION(Course_no, Sec_no, Semester, Year, Days_hours, Room_no, No_of_students, Instructor_ssn).
2. SECTION has keys K1 and K2. FD2 has K1 on the left, and FD3 has K2 on the left. Every FD in SECTION has a superkey on the left, so SECTION is in **BCNF**. COURSE is in BCNF with key Course_no.
3. The split is lossless (Course_no is the key of COURSE) and preserves all three FDs.

**Final answer.** Keys: {Course_no, Sec_no, Semester, Year} and {Room_no, Days_hours, Semester, Year}. Normalised schema: **COURSE(Course_no, Offering_dept, Credit_hours, Course_level)** and **SECTION(Course_no, Sec_no, Semester, Year, Days_hours, Room_no, No_of_students, Instructor_ssn)** with both keys, both in BCNF.

### Problem 16 [Normalisation · Application · 6 pts · Elmasri 14.29]

ORDER(O#, Odate, Cust#, Total_amount) and ORDER_ITEM(O#, I#, Qty_ordered, Total_price, Discount%). Each item has a different discount; Total_price is for one item line; Total_amount is the order's amount. What is RES = ORDER_ITEM ⋈ ORDER? Its key? Its FDs? Is it in 2NF? 3NF?

*Solution.*

**Assumptions.**
1. "Each item has a different discount" means the discount is set per line of an order, so it depends on (O#, I#). *(Reason: the discount sits in ORDER_ITEM, not in an ITEM table.)* If instead it is fixed per item (I# → Discount%), that is another partial dependency and does not change the conclusions.
2. Each order has one date, one customer and one total. *(Reason: they are attributes of ORDER, whose key is O#.)*
3. Total_amount is stored, although it could be derived as a sum. *(Reason: it is in the schema.)*

**RES.** RES(O#, I#, Odate, Cust#, Total_amount, Qty_ordered, Total_price, Discount%). The natural join is on O#, so O# appears once.

**Key.** {O#, I#}, because one order line is one item in one order.

**FDs.**
1. {O#, I#} → Qty_ordered, Total_price, Discount%.
2. O# → Odate, Cust#, Total_amount.

**2NF? No.** O# is a proper subset of the key, and Odate, Cust#, Total_amount are non-prime. These are partial dependencies.

**3NF? No.** 3NF requires 2NF. (By the general definition: O# → Odate has a left side that is not a superkey and a right side that is not prime.)

**Final answer.** RES has key {O#, I#} and FDs {O#, I#} → Qty_ordered, Total_price, Discount% and O# → Odate, Cust#, Total_amount. It is **in 1NF only**. Decomposing it back into ORDER and ORDER_ITEM gives BCNF.

### Problem 17 [Normalisation · Application · 6 pts · Elmasri 14.30]

CAR_SALE(Car#, Date_sold, Salesperson#, Commission%, Discount_amt), primary key {Car#, Salesperson#}, with Date_sold → Discount_amt and Salesperson# → Commission%. Which normal form? Normalise completely.

*Solution.*

**Assumptions.**
1. A car is sold once, on one date, even when several salespeople share the sale. So **Car# → Date_sold**. *(Reason: a car has one sale date.)*
2. Attributes are atomic. *(Reason: no repeating groups are shown.)*

**FDs.** {Car#, Salesperson#} → all; Car# → Date_sold; Date_sold → Discount_amt; Salesperson# → Commission%.

**Normal form.**
1. **1NF: yes**, because the attributes are atomic.
2. **2NF: no.** Salesperson# → Commission% is a partial dependency on the key. So is Car# → Date_sold (and Car# → Discount_amt through Date_sold).
3. **3NF: no**, because it is not in 2NF, and also because Date_sold → Discount_amt is transitive.

**Normalisation.**
1. To 2NF, remove the partial dependencies: SALESPERSON(**Salesperson#**, Commission%), CAR(**Car#**, Date_sold, Discount_amt), CAR_SALE(**Car#, Salesperson#**).
2. To 3NF, in CAR the dependency Car# → Date_sold → Discount_amt is transitive. Split into CAR(**Car#**, Date_sold) and DATE_DISCOUNT(**Date_sold**, Discount_amt).

**Final answer.** The relation is in **1NF** only. The 3NF (and BCNF) schema is **CAR_SALE(Car#, Salesperson#), CAR(Car#, Date_sold), DATE_DISCOUNT(Date_sold, Discount_amt), SALESPERSON(Salesperson#, Commission%)**.

> **Examiner's note.** If you assume each salesperson records their own sale date, Date_sold depends on the full key. Then the 2NF step gives CAR_SALE(Car#, Salesperson#, Date_sold) and SALESPERSON, and the 3NF step moves Discount_amt to DATE_DISCOUNT. Either reading is accepted if stated.

### Problem 18 [Normalisation · Application · 6 pts · Elmasri 14.31]

BOOK(Book_title, Author_name, Book_type, List_price, Author_affil, Publisher) with Book_title → Publisher, Book_type; Book_type → List_price; Author_name → Author_affil. (a) What normal form is it in? (b) Normalise fully, giving the reason for each decomposition.

*Solution.*

**Assumptions.**
1. A book can have several authors, and an author can write several books. *(Reason: otherwise one of Book_title or Author_name would determine the other, and no such FD is given.)*
2. The three FDs are complete. *(Reason: as given.)*

**Key.** Book_title and Author_name appear on no right-hand side. $(Book\_title, Author\_name)^+$ = all attributes. So the key is **{Book_title, Author_name}**.

**(a)** Book_title → Publisher, Book_type and Author_name → Author_affil have a proper subset of the key on the left and non-prime attributes on the right. These are partial dependencies, so BOOK is **in 1NF but not 2NF**.

**(b)**
1. **To 2NF**, remove the partial dependencies:
   1. BOOK_AUTHOR(**Book_title, Author_name**): the many-to-many link.
   2. BOOK_INFO(**Book_title**, Publisher, Book_type, List_price): reason: Book_title → Publisher, Book_type, and List_price through Book_type.
   3. AUTHOR(**Author_name**, Author_affil): reason: Author_name → Author_affil.
2. **To 3NF**, BOOK_INFO has Book_title → Book_type → List_price, a transitive dependency of a non-prime attribute. Split into BOOK_INFO(**Book_title**, Publisher, Book_type) and BOOK_TYPE(**Book_type**, List_price).
3. Each relation now has only key-based FDs, so all are in **BCNF**. No further decomposition is possible without losing information.

**Final answer.** (a) 1NF. (b) **BOOK_AUTHOR(Book_title, Author_name), BOOK_INFO(Book_title, Publisher, Book_type), BOOK_TYPE(Book_type, List_price), AUTHOR(Author_name, Author_affil)**, all in BCNF, lossless and dependency-preserving.

### Problem 19 [FD · Application · 4 pts · Elmasri 14.32]

DISK_DRIVE(Serial_number, Manufacturer, Model, Batch, Capacity, Retailer). Write as FDs: (a) manufacturer and serial number identify the drive; (b) a model number belongs to one manufacturer; (c) all drives in a batch are the same model; (d) all drives of one model of one manufacturer have the same capacity.

*Solution.*

**Assumption.** "Model" is a model number, and two manufacturers could reuse the same serial numbers. *(Reason: (a) needs the manufacturer as well as the serial number to identify a drive.)*

**Answer.**
1. (a) **{Manufacturer, Serial_number} → {Model, Batch, Capacity, Retailer}**.
2. (b) **Model → Manufacturer**.
3. (c) **Batch → Model**.
4. (d) **{Model, Manufacturer} → Capacity**.

**Note.** Because of (b), Model alone determines Manufacturer, so (d) is equivalent to **Model → Capacity**: Manufacturer is extraneous in (d). Also, through (c), Batch → Model → Manufacturer, Capacity.

> **Examiner's note.** The trap is writing (b) the wrong way round (Manufacturer → Model), which would say a manufacturer makes only one model.

### Problem 20 [Normalisation · Application · 6 pts · Elmasri 14.33]

R(Doctor#, Patient#, Date, Diagnosis, Treat_code, Charge): a tuple is one visit of a patient to a doctor, with a treatment code and daily charge. Diagnosis is determined for each patient by a doctor. Each treatment code has a fixed charge. Is R in 2NF? Decompose if needed, then normalise to 3NF if needed.

*Solution.*

**Assumptions.**
1. A visit is identified by {Doctor#, Patient#, Date}: a patient sees a given doctor at most once a day. *(Reason: a tuple describes one visit, and the date distinguishes repeat visits.)*
2. "Diagnosis is determined for each patient by a doctor" means {Doctor#, Patient#} → Diagnosis: the same doctor gives the same patient one diagnosis across visits. *(Reason: this is the reading the FD wording gives.)*
3. Each visit has one treatment code. *(Reason: one Treat_code per tuple.)*

**FDs.** FD1: {Doctor#, Patient#, Date} → Treat_code, Charge, Diagnosis. FD2: {Doctor#, Patient#} → Diagnosis. FD3: Treat_code → Charge.

**2NF? No.** FD2 makes Diagnosis depend on {Doctor#, Patient#}, a proper subset of the key. That is a partial dependency.

**Decompose to 2NF.** R1(**Doctor#, Patient#**, Diagnosis) and R2(**Doctor#, Patient#, Date**, Treat_code, Charge).

**3NF? R2 is not.** {Doctor#, Patient#, Date} → Treat_code → Charge is a transitive dependency of the non-prime Charge. Split R2 into R21(**Doctor#, Patient#, Date**, Treat_code) and R22(**Treat_code**, Charge).

**Final answer.** R is not in 2NF. The 3NF (and BCNF) schema is **{(Doctor#, Patient#, Diagnosis), (Doctor#, Patient#, Date, Treat_code), (Treat_code, Charge)}**.

### Problem 21 [Normal forms · Application · 5 pts · Elmasri 14.34]

CAR_SALE(Car_id, Option_type, Option_listprice, Sale_date, Option_discountedprice) with Car_id → Sale_date, Option_type → Option_listprice, {Car_id, Option_type} → Option_discountedprice. Argue using the generalised 3NF definition that it is not in 3NF; then argue it is not even in 2NF.

*Solution.*

**Assumption.** These FDs are complete. *(Reason: as given.)*

**Key.** Car_id and Option_type appear on no right-hand side, and together they determine all attributes. So the only key is **{Car_id, Option_type}**. The prime attributes are Car_id and Option_type.

**Not in 3NF (general definition).** A relation is in 3NF if, for every non-trivial X → A, either X is a superkey or A is prime.
1. Car_id → Sale_date: Car_id is not a superkey ($Car\_id^+$ = Car_id, Sale_date), and Sale_date is not prime. The condition fails.
2. Option_type → Option_listprice fails in the same way.

**Not even in 2NF.** 2NF forbids a non-prime attribute from depending on a proper subset of a key. Sale_date depends on Car_id, and Option_listprice on Option_type, and each is a proper subset of the key {Car_id, Option_type}. These are partial dependencies.

**Decomposition (to finish the answer).** CAR(**Car_id**, Sale_date), OPTION(**Option_type**, Option_listprice), CAR_OPTION(**Car_id, Option_type**, Option_discountedprice), all in BCNF.

**Final answer.** Both violations come from the FDs Car_id → Sale_date and Option_type → Option_listprice: their left sides are not superkeys and their right sides are not prime (fails 3NF), and the left sides are proper parts of the key (fails 2NF).

### Problem 22 [Normalisation · Application · 6 pts · Elmasri 15.21]

REFRIG(M, Y, P, MP, C) (Model#, Year, Price, Manuf_plant, Color), F = {M → MP, MY → P, MP → C}. (a) Evaluate {M}, {M, Y}, {M, C} as candidate keys. (b) Is REFRIG in 3NF? BCNF? (c) Is the decomposition {R1(M, Y, P), R2(M, MP, C)} lossless?

*Solution.*

**Assumption.** F is complete. *(Reason: as given.)*

**(a)**
1. $M^+$ = M, MP, C. It lacks Y and P, so **{M} is not a key**.
2. $(MY)^+$ = M, Y, MP, P, C = R. $Y^+ = Y$ and $M^+ \ne R$, so no proper subset works. **{M, Y} is a candidate key.**
3. $(MC)^+$ = M, C, MP. It lacks Y and P, so **{M, C} is not a key**.
4. In fact M and Y are on no right-hand side, so every key contains MY. **MY is the only key.**

**(b)**
1. M → MP: M is not a superkey, and MP is not prime. This violates 3NF. (It is also a partial dependency on MY, so REFRIG is not even in 2NF.)
2. MP → C: MP is not a superkey, and C is not prime. This also violates 3NF.
3. So REFRIG is **neither in 3NF nor in BCNF**.

**(c)**
1. R1 ∩ R2 = {M}. By the NJB test, the decomposition is lossless if M → R1 − R2 or M → R2 − R1.
2. R2 − R1 = {MP, C}, and $M^+$ contains MP and C. So **M → {MP, C}** holds and the decomposition is **lossless**.

**Final answer.** (a) Only {M, Y} is a key. (b) Not 3NF and not BCNF, because of M → MP and MP → C. (c) Lossless, because the common attribute M is a key of R2. R2 is still not in 3NF (MP → C is transitive), so a full design would split it into (M, MP) and (MP, C).

### Problem 23 [Lossless join · Application · 8 pts · Elmasri 15.24]

Is the decomposition of LOTS into {LOTS1AX, LOTS1AY, LOTS1B, LOTS2} lossless? Use Algorithm 15.3 (the matrix test) and the NJB test.

*Solution.*

**Assumptions.**
1. LOTS(P, C, L, A, Pr, T) abbreviates (Property_id#, County_name, Lot#, Area, Price, Tax_rate). *(Reason: Figure 14.12.)*
2. FDs: P → all; CL → all; C → T; A → Pr; A → C (FD5, added in Section 14.5 for BCNF). *(Reason: these are the FDs used to produce this decomposition.)*
3. The decomposition is LOTS1AX(P, A, L), LOTS1AY(A, C), LOTS1B(A, Pr), LOTS2(C, T). *(Reason: Sections 14.4–14.5.)*

**Matrix test (Algorithm 15.3).** Rows are the relations and columns are the attributes. Write *a* where the relation has the attribute and *b* elsewhere:

| | P | C | L | A | Pr | T |
| --- | --- | --- | --- | --- | --- | --- |
| LOTS1AX | a | b | a | a | b | b |
| LOTS1AY | b | a | b | a | b | b |
| LOTS1B | b | b | b | a | a | b |
| LOTS2 | b | a | b | b | b | a |

1. **A → C**: rows 1, 2 and 3 agree on A (all *a*). Row 2 has *a* under C, so set C to *a* in rows 1 and 3.
2. **A → Pr**: rows 1, 2 and 3 agree on A. Row 3 has *a* under Pr, so set Pr to *a* in rows 1 and 2.
3. **C → T**: now rows 1, 2, 3 and 4 all have *a* under C. Row 4 has *a* under T, so set T to *a* in rows 1, 2 and 3.
4. Row 1 (LOTS1AX) is now *a a a a a a*, a row of all *a*.

So the decomposition is **lossless**.

**NJB test, joining two at a time.**
1. LOTS1AX ⋈ LOTS1AY: common attribute A, and A → C, so A is a key of LOTS1AY. Lossless, giving LOTS1A(P, A, L, C).
2. LOTS1A ⋈ LOTS1B: common attribute A, and A → Pr, so A is a key of LOTS1B. Lossless, giving LOTS1(P, C, L, A, Pr).
3. LOTS1 ⋈ LOTS2: common attribute C, and C → T, so C is a key of LOTS2. Lossless, giving LOTS.
4. Each binary step is lossless, and a decomposition obtained by successive lossless binary decompositions is lossless (Property NJB with the successive-decomposition property).

**Final answer.** Both tests show that the decomposition is **lossless**.

> **Examiner's note.** In the matrix test, say which FD you apply at each step and which cells change. A bare final matrix gets a B.

## C. Review questions (short answers)

The TA's list includes the chapter 14 and 15 review questions. In the exam these become one-paragraph parts. Each answer below is what one part should contain.

### Problem 24 [Normalisation · Concept · 6 pts · Elmasri 14.2–14.4]

(14.2) Discuss insertion, deletion and modification anomalies and why they are bad. (14.3) Why avoid NULLs? Discuss spurious tuples and how to prevent them. (14.4) State the informal design guidelines and show how violating them is harmful.

*Solution.*

**14.2. Anomalies.** In EMP_DEPT(Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn):
1. **Insertion**: a department with no employees cannot be stored, and every new employee must repeat the department data correctly.
2. **Deletion**: deleting the last employee of a department loses the department.
3. **Modification**: changing a department's manager means changing every employee tuple of that department.

They are bad because they waste storage, make updates expensive, and let the database become **inconsistent** when one copy is changed and another is not.

**14.3. NULLs and spurious tuples.**
1. Many NULLs waste space, and NULL is ambiguous: it can mean "does not apply", "unknown" or "exists but not recorded".
2. NULLs also make joins and aggregates (COUNT, SUM) hard to interpret.
3. Attributes that are often NULL belong in a separate relation. For example, Office_number for the few employees who have one goes in EMP_OFFICES(Essn, Office_number).
4. **Spurious tuples** are wrong tuples produced by joining relations on attributes that are not a primary key–foreign key pair. Prevent them by designing relations so that they are joined only on equality of a key and a foreign key (a lossless decomposition).

**14.4. Guidelines.**
1. **Clear semantics**: each relation describes one entity or one relationship. Violation (mixing employee and department) causes anomalies.
2. **No anomalies**: design so that no insertion, deletion or modification anomaly exists.
3. **Few NULLs**: put rarely applicable attributes in a separate relation.
4. **No spurious tuples**: join only on key–foreign key pairs.

### Problem 25 [FD · Concept · 5 pts · Elmasri 14.5–14.7]

(14.5) What is an FD, and where does the information defining FDs come from? (14.6) Why can't FDs be inferred from one relation state? (14.7) What is an unnormalised relation, and how did the normal forms develop from 1NF to BCNF?

*Solution.*

**14.5.**
1. A **functional dependency** X → Y on R says: for any two tuples t1, t2 in *any* legal state of R, if t1[X] = t2[X] then t1[Y] = t2[Y]. The X-value determines the Y-value.
2. The information comes from the **meaning of the attributes** and the **rules of the miniworld**: the designer's understanding, the requirements, and business rules. Example: "each course has one credit value" gives Course_no → Credit_hours.

**14.6.** An FD is a property of the schema and must hold in **every** legal state, including future ones. One state shows only what holds now. It can *disprove* an FD (two tuples that agree on X and differ on Y), but it cannot prove one, because a later valid insertion could violate it. Example: if today every course has a different instructor, that does not mean Instructor → Course.

**14.7.**
1. An **unnormalised** relation has non-atomic attributes: multivalued or composite values, or nested relations. Example: DEPARTMENT with a set of locations in one cell.
2. Development:
   1. Codd defined **1NF** (atomic values), then **2NF** and **3NF** (1972), based on functional dependencies and the primary key.
   2. Boyce and Codd then proposed **BCNF** as a stronger form of 3NF.
   3. The definitions were later generalised to consider **all candidate keys**.
   4. 4NF and 5NF came later, based on multivalued and join dependencies.

### Problem 26 [Normal forms · Concept · 8 pts · Elmasri 14.8–14.12]

(14.8) Define 1NF, 2NF and 3NF with primary keys only, and say how the general definitions differ. (14.9) What does 2NF avoid? (14.10) What does 3NF avoid? (14.11) How do the general definitions extend beyond primary keys? (14.12) Define BCNF; how does it differ from 3NF, and why is it stronger?

*Solution.*

**14.8. Primary-key definitions.**
1. **1NF**: every attribute's domain is atomic, so there are no multivalued attributes, composite attributes or nested relations.
2. **2NF**: 1NF, and every non-key attribute is **fully** functionally dependent on the primary key. No attribute depends on part of the primary key.
3. **3NF**: 2NF, and no non-key attribute is **transitively** dependent on the primary key through another non-key attribute.

**The general definitions** replace "the primary key" with **every candidate key**, and "non-key attribute" with **non-prime attribute** (one that belongs to no candidate key).

**14.9.** 2NF avoids **partial dependencies**: a non-prime attribute that depends on part of a key. Example: Ename depending on Ssn alone in EMP_PROJ(Ssn, Pnumber, Hours, Ename).

**14.10.** 3NF avoids **transitive dependencies**: a non-prime attribute that depends on a key through another non-prime attribute, X → Z → A. Example: Ssn → Dnumber → Dname in EMP_DEPT.

**14.11.**
1. They test partial and transitive dependencies against **all candidate keys**, not only the primary key, so a dependency on part of an alternate key also counts.
2. The general 3NF definition is: for every non-trivial X → A, either X is a superkey **or** A is prime. This does not even mention keys being primary.
3. Example: LOTS is 2NF with respect to its primary key but only 1NF under the general definitions (see Problem 8, Elmasri 14.21).

**14.12.**
1. **BCNF**: for every non-trivial FD X → A on R, X is a superkey of R.
2. **Difference from 3NF**: 3NF also allows X → A when A is prime. BCNF drops that exception.
3. **Why stronger**: every BCNF relation is in 3NF, but not the other way round. Example: R(Student, Course, Instructor) with {Student, Course} → Instructor and Instructor → Course is in 3NF (Course is prime) but not in BCNF (Instructor is not a superkey).

### Problem 27 [FD theory · Concept · 8 pts · Elmasri 15.1–15.5]

(15.1) What is the role of Armstrong's rules? (15.2) What do soundness and completeness mean? (15.3) What is the closure of a set of FDs? Example. (15.4) When are two FD sets equivalent, and how do we test it? (15.5) What is a minimal set of FDs? Does every set have one? Is it unique?

*Solution.*

**15.1.**
1. Armstrong's rules are:
   1. IR1, **reflexive**: if Y ⊆ X, then X → Y.
   2. IR2, **augmentation**: if X → Y, then XZ → YZ.
   3. IR3, **transitive**: if X → Y and Y → Z, then X → Z.
2. They let us **derive** every FD implied by a given set. That makes it possible to define closures, keys, equivalence and minimal covers, which the design algorithms rely on.

**15.2.**
1. **Sound**: every FD derived with the rules really holds in every state that satisfies F. The rules never derive a false FD.
2. **Complete**: every FD that is implied by F can be derived by repeatedly applying IR1–IR3.
3. Together, the rules derive exactly $F^+$.

**15.3.**
1. The **closure** $F^+$ is the set of all FDs implied by F.
2. Example: F = {A → B, B → C}. Then $F^+$ includes A → C (transitivity), AC → BC (augmentation), A → A (reflexivity), and so on.
3. In practice we compute an attribute closure $X^+$ instead of listing $F^+$, which is exponentially large.

**15.4.**
1. F and G are **equivalent** if $F^+ = G^+$, that is, F covers G and G covers F.
2. **Test**: for every X → Y in G, compute $X^+$ under F and check that Y ⊆ $X^+$. Then do the same for every FD of F under G.

**15.5.**
1. A **minimal set** (minimal cover) is an equivalent set in which:
   1. every right side is a single attribute;
   2. no left-side attribute can be removed while keeping the set equivalent;
   3. no FD can be removed while keeping the set equivalent.
2. **Every set has at least one**: the algorithm always produces one.
3. It is **not always unique**. Example: F = {A → B, B → A, A → C, B → C} has the minimal covers {A → B, B → A, A → C} and {A → B, B → A, B → C}.

### Problem 28 [Decomposition · Concept · 8 pts · Elmasri 15.6–15.12]

(15.6) What is attribute preservation? (15.7) Why are normal forms alone insufficient? (15.8) What is dependency preservation and why does it matter? (15.9) Why can't we guarantee dependency-preserving BCNF decompositions? Counterexample. (15.10) What is the lossless join property and why is it important? (15.11) Which of the two properties must be satisfied? (15.12) Discuss NULLs and dangling tuples.

*Solution.*

**15.6.** **Attribute preservation**: every attribute of R appears in at least one relation of the decomposition, so no attribute is lost.

**15.7.** A relation can be in a high normal form on its own while the **decomposition as a whole** is bad. It might lose FDs, so constraints can no longer be checked inside one relation. Worse, it might be lossy, so joining the parts creates spurious tuples. Example: splitting EMP_PROJ into EMP_LOCS and EMP_PROJ1 gives relations in good normal forms, but they join with spurious tuples.

**15.8.**
1. A decomposition is **dependency-preserving** if the union of the FDs projected onto the parts is equivalent to F: $(\pi_{R_1}(F) \cup \dots \cup \pi_{R_m}(F))^+ = F^+$.
2. It matters because each FD can then be enforced by checking one relation at a time, with no join on every update.

**15.9.**
1. Some relations have no dependency-preserving BCNF decomposition at all.
2. Counterexample: TEACH(Student, Course, Instructor) with FD1 {Student, Course} → Instructor and FD2 Instructor → Course.
   1. The keys are {Student, Course} and {Student, Instructor}.
   2. FD2 violates BCNF, because Instructor is not a superkey.
   3. Every BCNF decomposition puts Instructor and Course together and separates Student from Course. For example, {(Instructor, Course), (Instructor, Student)}.
   4. Then FD1 lies in no single relation, so it is **lost**.

**15.10.**
1. A decomposition D = {R1, …, Rm} of R has the **lossless (nonadditive) join** property if every legal state r of R satisfies $\pi_{R_1}(r) \bowtie \dots \bowtie \pi_{R_m}(r) = r$.
2. It is important because otherwise the join produces **spurious tuples**: false information that cannot be told apart from true tuples.

**15.11.** **Lossless join must always hold.** A lossy decomposition gives wrong answers to queries, so it is unacceptable. Dependency preservation is desirable but can be sacrificed, as in 15.9 to reach BCNF. A lost FD can still be enforced, at a cost, by a join, trigger or assertion.

**15.12.**
1. **NULLs**: in a decomposed design, NULLs in join attributes cause tuples to disappear from natural joins, and NULLs make aggregates ambiguous. Example: an employee with Dno NULL vanishes from EMPLOYEE ⋈ DEPARTMENT. An outer join keeps such tuples.
2. **Dangling tuples**: tuples that have no matching tuple in the relation they would be joined with, so they are lost in a natural join. Example: if EMPLOYEE is split into EMP1(Ssn, Ename) and EMP2(Ssn, Dno), and an employee has no EMP2 tuple, that employee's EMP1 tuple dangles. Avoid this by not splitting on attributes that may be missing, or by allowing NULLs in one relation instead.

## D. Last year's papers (different instructor, different style)

### Problem 29 [Normalisation · Application · 6 pts · M23 endsem Q4]

R(A, B, C, D, E), FDs A → DE, B → A, D → C. (a) Primary key, with justification. (b) 2NF? (c) 3NF?

*Solution.*

**Assumption.** The three FDs are the complete specification. *(Reason: no other dependencies are given.)*

**(a) Primary key.** B appears on no right-hand side, so it is in every key. Its closure is computed as follows: B → A adds A; A → DE adds D and E; D → C adds C. Hence $B^+ = ABCDE = R$. B is a single attribute, so it is minimal, and **B is the only candidate key**; it is the primary key.

**(b) 2NF.** A relation is in 2NF if no non-prime attribute is partially dependent on a candidate key. The only key, B, is a single attribute, so it has no non-empty proper subset, and no partial dependency can exist. **R is in 2NF.**

**(c) 3NF.** A relation is in 3NF if no non-prime attribute is transitively dependent on a key. Here B → A → DE and A → D → C, where A and D are not keys. So D, E and C are transitively dependent on B, and **R is not in 3NF**. Decomposing on the transitive dependencies gives R1(B, A), R2(A, D, E), R3(D, C).

**Final answer.** (a) **B**. (b) **In 2NF.** (c) **Not in 3NF**; 3NF decomposition **{R1(B, A), R2(A, D, E), R3(D, C)}**, which is lossless and dependency-preserving.

> **Examiner's note.** The 2023 key gave zero to "not in 2NF": with a single-attribute key, 2NF always holds.

### Problem 30 [Normalisation · Application · 5 pts · M23 endsem Q5]

R(P, Q, R, S, T, U, V, W, X, Y), FDs PQ → R, PS → VW, QS → TU, P → X, W → Y; the key is PQS. In 2NF? If not, convert.

*Solution.*

**Assumption.** PQS is the only candidate key, as stated. *(Reason: given in the question.)*

**Working.**
1. PQ → R holds, PQ is a proper subset of the key PQS, and R is non-prime. This is a partial dependency, so **R is not in 2NF**. (PS → VW, QS → TU and P → X are further partial dependencies.)
2. To reach 2NF, move each partial dependency into its own relation together with its left-hand side, and keep a relation containing the key:
   - PQ → R gives R1(P, Q, R);
   - PS → VW, together with W → Y (Y depends on PS through W), gives R2(P, S, V, W, Y);
   - QS → TU gives R3(Q, S, T, U);
   - P → X gives R4(P, X);
   - the key gives R5(P, Q, S).

**Final answer.** **Not in 2NF.** 2NF decomposition: **R1(P, Q, R), R2(P, S, V, W, Y), R3(Q, S, T, U), R4(P, X), R5(P, Q, S)**.

> **Examiner's note.** W → Y is a transitive dependency, not a partial one, so it may remain in R2 for 2NF; splitting R2 further into (P, S, V, W) and (W, Y) reaches 3NF and was also accepted.

### Problem 31 [Decomposition · Application · 4 pts · M23 endsem Q6]

R(A, B, C, D), A → B, B → C, C → D. Is each decomposition dependency-preserving? (i) R1(A, B, D), R2(B, C). (ii) R1(A, B), R2(B, C), R3(C, D).

*Solution.*

**Method.** A decomposition preserves X → Y if Y is reached by: Z := X, then repeatedly Z := Z ∪ ((Z ∩ Ri)⁺ ∩ Ri) for each part Ri, until Z stops changing.

**(i) R1(A, B, D), R2(B, C).**
1. A → B lies within R1, and B → C lies within R2.
2. For C → D: start with Z = C. In R1, C ∩ ABD is empty, so nothing is added. In R2, $C^+ ∩ BC = C$, so nothing is added. Z stays {C}, and D is never reached.
3. So C → D is not preserved.

**(ii) R1(A, B), R2(B, C), R3(C, D).** Each FD lies within one part (A → B in R1, B → C in R2, C → D in R3), so all are preserved.

**Final answer.** (i) **Not dependency-preserving** (C → D is lost). (ii) **Dependency-preserving.**

**Advantages and disadvantages of decomposition.** Advantages: less redundancy, and no insertion, deletion or update anomalies. Disadvantages: queries need joins, which are slower, and a careless decomposition may lose dependencies or produce spurious tuples.

### Problem 32 [Normalisation · Application · 6 pts · M25 endsem Q5]

R(A, B, C, D), FDs A → B, BC → D, D → A. (a) All candidate keys. (b) 3NF? (c) BCNF?

*Solution.*

**Assumption.** The three FDs are the complete specification. *(Reason: no others are given.)*

**(a) Candidate keys.**
1. C appears on no right-hand side, so C is in every key. $C^+ = C$, so C alone is not a key.
2. $(AC)^+$: A → B gives B; BC → D gives D. So $(AC)^+ = ABCD = R$.
3. $(BC)^+$: BC → D gives D; D → A gives A. So $(BC)^+ = R$.
4. $(CD)^+$: D → A gives A; A → B gives B. So $(CD)^+ = R$.
5. Each of these pairs is minimal, since C alone is not a key and A, B, D alone do not contain C.

**(a) Answer.** The candidate keys are **AC, BC and CD**.

**(b) 3NF.** Every attribute belongs to some key, so every attribute is prime. For each FD (A → B, BC → D, D → A) the right-hand side is prime, so the 3NF condition holds. **R is in 3NF.**

**(c) BCNF.** A → B holds and $A^+ = AB \ne R$, so A is not a superkey. **R is not in BCNF** (D → A also violates it).

**Final answer.** (a) AC, BC, CD. (b) **Yes**, in 3NF. (c) **No**, not in BCNF.

### Problem 33 [Normalisation · Application · 4 pts · M24 Quiz 4 Q3]

R(A, B, C, D, E, F, G, H, I, J), FDs AB → C, AD → GH, BD → EF, A → I, H → J. In 3NF? If not, decompose.

*Solution.*

**Assumption.** R has the attributes A to J, with J added as stated during the quiz. *(Reason: H → J requires J to be an attribute of R.)*

**Working.**
1. A, B and D appear on no right-hand side, so they are in every key. $(ABD)^+$: AB → C, AD → GH, BD → EF, A → I, H → J; this gives all of R. So **ABD is the only candidate key**, and the prime attributes are A, B, D.
2. AB → C holds, AB is not a superkey, and C is not prime, so **R is not in 3NF**. (It is not even in 2NF, because AB is a proper subset of the key.)
3. The given FDs form a minimal cover (single-attribute right-hand sides after splitting, no extraneous attributes, no redundant FDs).
4. 3NF synthesis creates one relation per left-hand side: (A, B, C), (A, D, G, H), (B, D, E, F), (A, I), (H, J). None contains the key ABD, so (A, B, D) is added.

**Final answer.** **Not in 3NF.** 3NF decomposition: **{(A, B, C), (A, D, G, H), (B, D, E, F), (A, I), (H, J), (A, B, D)}**, which is lossless and dependency-preserving.

### Problem 34 [Normalisation · Application · 7 pts · M24 Quiz 4 Q4]

For each, give candidate keys and decompose to BCNF through 1NF, 2NF, 3NF: (a) R1(A, B, C, D, E), A → B, C → D. (b) R2(A, B, F), AB → F, B → F.

*Solution.*

**Assumption.** All attributes are atomic. *(Reason: no multivalued attributes are mentioned; this makes both relations 1NF.)*

**(a) R1(A, B, C, D, E) with A → B, C → D.**
1. A, C and E appear on no right-hand side, so they are in every key; $(ACE)^+ = ABCDE$. **The candidate key is ACE.**
2. 1NF holds, because all attributes are atomic.
3. A → B and C → D are partial dependencies (A and C are proper subsets of ACE, and B, D are non-prime), so **2NF fails**. Decompose into (A, B), (C, D) and (A, C, E).
4. In each of these relations every FD has a key on its left-hand side, so each is in 3NF and BCNF.

**(b) R2(A, B, F) with AB → F, B → F.**
1. A and B appear on no right-hand side; $(AB)^+ = ABF$. **The candidate key is AB.**
2. 1NF holds.
3. B → F is a partial dependency, so **2NF fails**. Decompose into (B, F) and (A, B).
4. Both relations are in 3NF and BCNF.

**Final answer.** (a) Key ACE; BCNF decomposition **{(A, B), (C, D), (A, C, E)}**. (b) Key AB; BCNF decomposition **{(B, F), (A, B)}**.

### Problem 35 [1NF · Application · 5 pts · M24 Quiz 4 Q2]

EMPLOYEE(Employee_ID, Phone_Number (multivalued), Dept, Manager_ID). Convert to 1NF and 2NF and say what problems each avoids.

*Solution.*

**Assumptions.**
1. Each employee belongs to one department, and each department has one manager. *(Reason: the table shows one Dept and one Manager ID per employee, and Sales has the same manager E13 for E01 and E04.)*
2. Phone numbers are not shared between employees. *(Reason: no phone number appears twice.)*

**1NF.** The Phone Number attribute is multivalued, which violates 1NF. Moving it into its own relation gives
- EMP(**Employee_ID**, Dept, Manager_ID)
- EMP_PHONE(**Employee_ID, Phone**), Employee_ID → EMP.

**2NF.** EMP has a single-attribute key, so it has no partial dependency. EMP_PHONE consists only of key attributes. Both relations are therefore already in **2NF**; no further change is needed.

**Problems avoided.**
- 1NF avoids non-atomic values: with a list of phones in one cell, one phone number cannot be queried, indexed or updated on its own.
- 2NF avoids repeating Dept and Manager_ID once per phone number (which happens if 1NF is reached by one row per phone with key (Employee_ID, Phone)); that repetition causes update anomalies.

**Final answer.** 1NF and 2NF: **EMP(Employee_ID, Dept, Manager_ID)** and **EMP_PHONE(Employee_ID, Phone)**.

> **Examiner's note.** The 2024 rubric also accepted the "one row per phone" 1NF followed by a 2NF split. Note that Dept → Manager_ID is a transitive dependency; 3NF would move it to DEPT(Dept, Manager_ID).

### Problem 36 [Normalisation · Concept · 3 pts · M22 endsem Q6]

Should every database be normalised to 3NF? Give an example where it causes issues.

*Solution.*

**Answer.** No, not every database should be normalised to 3NF.
1. Normalisation removes redundancy, but each decomposition adds joins to the queries that need the data back together.
2. In read-heavy reporting systems (data warehouses, dashboards), the same joins run constantly, so designers deliberately **denormalise** to make those queries fast.
3. BCNF may also lose functional dependencies (for example AB → C with C → B), so 3NF is often the practical stopping point rather than BCNF.

**Example.** An order-history report reads ORDER, CUSTOMER, PRODUCT and ADDRESS for every row. Storing CustomerName and the shipping address inside ORDER duplicates data, but it makes the report a single-table scan. It also keeps the address *as it was at the time of the order*, which a normalised design would overwrite when the customer moves.

**Final answer.** Normalise to 3NF by default, but denormalise where join cost dominates and the redundancy is controlled, as in reporting tables.

