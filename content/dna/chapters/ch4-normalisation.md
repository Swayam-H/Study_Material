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

## B. Past papers (other years; style differs)

### Problem 6 [Normalisation · Application · 6 pts · M23 endsem Q4]

R(A, B, C, D, E), FDs A → DE, B → A, D → C. (a) Primary key, with justification. (b) 2NF? (c) 3NF?

*Solution.*

**Assumption.** The three FDs are the complete specification. *(Reason: no other dependencies are given.)*

**(a) Primary key.** B appears on no right-hand side, so it is in every key. Its closure is computed as follows: B → A adds A; A → DE adds D and E; D → C adds C. Hence $B^+ = ABCDE = R$. B is a single attribute, so it is minimal, and **B is the only candidate key**; it is the primary key.

**(b) 2NF.** A relation is in 2NF if no non-prime attribute is partially dependent on a candidate key. The only key, B, is a single attribute, so it has no non-empty proper subset, and no partial dependency can exist. **R is in 2NF.**

**(c) 3NF.** A relation is in 3NF if no non-prime attribute is transitively dependent on a key. Here B → A → DE and A → D → C, where A and D are not keys. So D, E and C are transitively dependent on B, and **R is not in 3NF**. Decomposing on the transitive dependencies gives R1(B, A), R2(A, D, E), R3(D, C).

**Final answer.** (a) **B**. (b) **In 2NF.** (c) **Not in 3NF**; 3NF decomposition **{R1(B, A), R2(A, D, E), R3(D, C)}**, which is lossless and dependency-preserving.

> **Examiner's note.** The 2023 key gave zero to "not in 2NF": with a single-attribute key, 2NF always holds.

### Problem 7 [Normalisation · Application · 5 pts · M23 endsem Q5]

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

### Problem 8 [Decomposition · Application · 4 pts · M23 endsem Q6]

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

### Problem 9 [Normalisation · Application · 6 pts · M25 endsem Q5]

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

### Problem 10 [Normalisation · Application · 4 pts · M24 Quiz 4 Q3]

R(A, B, C, D, E, F, G, H, I, J), FDs AB → C, AD → GH, BD → EF, A → I, H → J. In 3NF? If not, decompose.

*Solution.*

**Assumption.** R has the attributes A to J, with J added as stated during the quiz. *(Reason: H → J requires J to be an attribute of R.)*

**Working.**
1. A, B and D appear on no right-hand side, so they are in every key. $(ABD)^+$: AB → C, AD → GH, BD → EF, A → I, H → J; this gives all of R. So **ABD is the only candidate key**, and the prime attributes are A, B, D.
2. AB → C holds, AB is not a superkey, and C is not prime, so **R is not in 3NF**. (It is not even in 2NF, because AB is a proper subset of the key.)
3. The given FDs form a minimal cover (single-attribute right-hand sides after splitting, no extraneous attributes, no redundant FDs).
4. 3NF synthesis creates one relation per left-hand side: (A, B, C), (A, D, G, H), (B, D, E, F), (A, I), (H, J). None contains the key ABD, so (A, B, D) is added.

**Final answer.** **Not in 3NF.** 3NF decomposition: **{(A, B, C), (A, D, G, H), (B, D, E, F), (A, I), (H, J), (A, B, D)}**, which is lossless and dependency-preserving.

### Problem 11 [Normalisation · Application · 7 pts · M24 Quiz 4 Q4]

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

### Problem 12 [1NF · Application · 5 pts · M24 Quiz 4 Q2]

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

### Problem 13 [Normalisation · Concept · 3 pts · M22 endsem Q6]

Should every database be normalised to 3NF? Give an example where it causes issues.

*Solution.*

**Answer.** No, not every database should be normalised to 3NF.
1. Normalisation removes redundancy, but each decomposition adds joins to the queries that need the data back together.
2. In read-heavy reporting systems (data warehouses, dashboards), the same joins run constantly, so designers deliberately **denormalise** to make those queries fast.
3. BCNF may also lose functional dependencies (for example AB → C with C → B), so 3NF is often the practical stopping point rather than BCNF.

**Example.** An order-history report reads ORDER, CUSTOMER, PRODUCT and ADDRESS for every row. Storing CustomerName and the shipping address inside ORDER duplicates data, but it makes the report a single-table scan. It also keeps the address *as it was at the time of the order*, which a normalised design would overwrite when the customer moves.

**Final answer.** Normalise to 3NF by default, but denormalise where join cost dominates and the redundancy is controlled, as in reporting tables.

