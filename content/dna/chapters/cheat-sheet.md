# Cheat sheet

You may bring **two handwritten A4 sheets** (printouts are not allowed). Writing them is itself revision: copy this plan by hand, in your own words, and add the mistakes you made in the [mock endsem](../mock-endsem/mock-endsem.html). The layout assumes you write on both sides of each sheet. If only one side is allowed, keep the sections marked **must** and drop the rest.

**What earns the space.** The exam is "like assignment questions" and you will have enough time, so the sheets are not for definitions you can explain in your own words. Put down:
1. **Procedures with steps you might reorder or forget**: closure, minimal cover, BCNF split, 3NF synthesis, the dependency-preservation test, the mapping steps and 8A–8D. **Must.**
2. **Notation you must draw exactly**: (min, max), division, outer joins, TRC quantifiers. **Must.**
3. **Patterns that turn English into a query**: "none", "every", "including zero", "the maximum without MAX", ties. **Must.**
4. **Your own mistakes** from A1–A6 and the mock. These are worth more than anything copied from here.

**What to leave off**: long worked examples, full schemas (the paper gives them), history, and anything you have not used while practising.

## Page 1, front: relational model and mapping (must)

**Keys.** Superkey: no two tuples agree. Key: minimal superkey. Prime: in some key. Counting superkeys among n attributes: one key of size k gives $2^{n-k}$; k single-attribute keys give $2^n - 2^{n-k}$; two keys K1, K2 give $2^{n-|K_1|} + 2^{n-|K_2|} - 2^{n-|K_1 \cup K_2|}$.

**Constraints.** Domain (type/CHECK), key (no duplicate key), entity integrity (PK not NULL), referential (FK value exists or NULL). Insert can violate all four; delete only referential (→ restrict / cascade / set null / set default); update: any.

**Drawing EER from English** (A2, both papers):
- "identified by X and Y" → composite key; "one or more" → (1, N); "zero or more" → (0, N); "exactly one" → (1, 1).
- (min, max) sits next to the entity: how many relationship instances **each** entity of that type is in. Weak entity side is always (1, 1).
- Value that depends on two entities (role of an actor **in an episode**) → attribute of the relationship, not of either entity.
- "a director may also act" → overlapping specialization or two relationships to one PERSON; say which and why.
- Every vague word → a written assumption.

**Ternary (min, max)**: count triples. Course with ≤ 2 profs and ≤ 100 students → (1, 200).

**EER → relational rules.**
1. Strong entity → relation; simple attributes only (composite → its parts); a key becomes the PK.
2. Weak entity → relation + owner's PK as FK; PK = owner PK + partial key; FK ON DELETE CASCADE.
3. 1:1 → put the other side's PK as FK on the **total** side, UNIQUE (+ NOT NULL); relationship attributes go there too. Both total → may merge into one relation.
4. 1:N → FK on the **N** side (+ NOT NULL if N side total); relationship attributes on the N side.
5. M:N → new relation (PK₁, PK₂, attributes); PK = both FKs.
6. Multivalued attribute → new relation (owner PK, value); PK = both.
7. n-ary → new relation with every participant's PK as FK + attributes; PK = all FKs, minus the FK of any entity with max 1.
8. Recursive → FK to the same relation, renamed by role (e.g. Super_ssn).
9. Derived attributes → not stored.
10. Specialization (superclass C with key k, subclasses S₁…Sₘ):
   - **8A** C(k, C attrs) + Sᵢ(k, Sᵢ attrs), k FK → C. Always works.
   - **8B** Sᵢ(k, C attrs, Sᵢ attrs) only. Total only (else entities in no subclass are lost); overlapping duplicates C attrs.
   - **8C** one relation (k, all attrs, type t). Disjoint only; NULLs.
   - **8D** one relation (k, all attrs, flags f₁…fₘ). Overlapping (also works disjoint).
   - Shared subclass (member of all superclasses) → 8A or 8C with the common key.
11. Category / union type (member of one superclass): superclasses have different keys → new surrogate key in the category relation, added as FK in each superclass relation; same key → reuse it.

**Rubric majors** (A2/A3): missing key, weak without owner key, FK to part of a key, FK on wrong side, M:N not separate, multivalued as column, attribute in wrong relation, specialization lost / 8C for overlapping, unmapped diamond, no arrows.

## Page 1, back: functional dependencies and normal forms (must)

**Guidelines and anomalies**: clear semantics per relation; no insert / delete / update anomalies; few NULLs; no spurious tuples (never join on a non-key attribute).

**Closure** $X^+$: start X, add right sides whose left sides are inside, repeat. X → B iff B ∈ $X^+$. X is a superkey iff $X^+$ = R.

**Armstrong**: reflexivity (Y ⊆ X ⇒ X → Y), augmentation (X → Y ⇒ XZ → YZ), transitivity; derived: union, decomposition, pseudotransitivity (X → Y, WY → Z ⇒ WX → Z). Never "AB → C ⇒ A → C"; "A → BC ⇒ A → B" is fine.

**Finding all keys**:
- Only on left sides, or on no side → in **every** key. Only on right sides → in **no** key. Both sides → test.
- Core = the "every key" attributes. If core⁺ = R, it is the only key. Else add one "both" attribute at a time, then pairs; skip any superset of a key found.
- Prime = in some key. Report every key, not just one.

**Normal forms** (check against all keys and $F^+$, after splitting right sides):
- 1NF: atomic values only; no multivalued, composite or nested attributes. Fix: new relation (key, value).
- 2NF: no non-prime attribute partially depends on a key (X ⊂ key, X → non-prime). Single-attribute keys ⇒ 2NF.
- 3NF: every non-trivial X → A: X superkey **or** A prime. Breaks via transitive: key → X → A, X not a key, A non-prime.
- BCNF: every non-trivial X → A: X superkey. Two-attribute relations are BCNF.
- Highest NF: test BCNF → 3NF → 2NF on each FD; state the FD that fails the next level.

**Minimal cover** (test each step against the **current** set):
1. Split right sides to single attributes.
2. Extraneous left attribute: in XB → A, B is extraneous if A ∈ $X^+$.
3. Redundant FD: X → A is redundant if A ∈ $X^+$ computed without X → A.
Not unique; order can change the answer.

**Covers**: F covers G iff every X → Y in G has Y ⊆ $X^+$ (closure under F). F ≡ G iff each covers the other.

**Projecting FDs onto Ri**: for each X ⊆ Ri, X → ($X^+$ ∩ Ri). Never just copy FDs whose attributes happen to fit.

**BCNF decomposition**: pick violating X → Y; split into $R_1 = X^+$ and $R_2 = R - (X^+ - X)$; project FDs; repeat on each part. Always lossless; may lose FDs (AB → C, C → B).

**3NF synthesis**: minimal cover → one relation per left side (merge FDs with the same left side) → add a relation for one key if no relation holds a key → drop relations contained in others. Always lossless + dependency-preserving.

**Lossless (nonadditive) binary**: $R_1 \cap R_2$ → $R_1 - R_2$ or → $R_2 - R_1$ (common attributes are a superkey of one side).

**Lossless, 3+ relations (matrix test)**: one row per $R_i$, one column per attribute; cell = $a_j$ if $A_j \in R_i$, else $b_{ij}$. For each X → Y: rows that agree on all X columns get equal Y columns (copy an $a$ if any row has one, else one of the $b$s). Repeat until nothing changes. Lossless iff some row is all $a$.

**Dependency preservation**: $(\bigcup \pi_{R_i}(F))^+ = F^+$. Test each X → Y: Z = X; repeat Z ∪= ((Z ∩ Ri)⁺ ∩ Ri) over all Ri; preserved iff Y ⊆ Z. An FD inside one Ri is preserved at once.

**MVD and 4NF**: X ↠ Y: for each X value, the set of Y values is independent of the rest (R − X − Y), so swapping Y parts between two tuples gives tuples in R. Trivial if Y ⊆ X or X ∪ Y = R. Every FD is an MVD; X ↠ Y ⇒ X ↠ R − X − Y. 4NF: every non-trivial X ↠ Y has X a superkey. Split into XY and X(R − Y); lossless iff $R_1 \cap R_2$ ↠ $R_1 - R_2$.

**5NF**: JD(R1, …, Rn) holds if R = join of its projections; 5NF = every JD is implied by the keys.

**The 4-part problem** (A4 individual Q2 and group Q3, 20 pts each; expect it again):
- (a) Highest NF: all keys first (core method), then the first FD that breaks BCNF, 3NF, 2NF, each named.
- (b) BCNF: each split as X → Y, $X^+$, $R_1$, $R_2$, projected FDs; final relations with keys; name the FDs lost.
- (c) Minimal cover: show each step with the closure that justifies it.
- (d) 3NF from (c): one relation per left side, add a key relation if needed, drop contained ones; say lossless + preserving.
- Carry an error forward correctly: later parts are marked on your earlier answer.

**Proofs** (A4 Q1, A4 group Q1–Q2, A5 group Q1): start from the definition. Prove: take an arbitrary key / tuple and show it; for equality of sets show ⊆ both ways. Disprove: smallest counterexample, R(A, B, C) with an explicit F, and compute the closure.

**Proof patterns**: "add A → K for a key K makes A a key"; "n FDs (a cycle) make every subset a superkey"; "3NF + all keys single ⇒ BCNF"; "BCNF ⇒ 3NF ⇒ 2NF, not the reverse".

## Page 2, front: relational algebra and TRC (must)

**RA**: σ rows, π columns (removes duplicates), ρ rename, ∪ ∩ − (union-compatible), ×, ⋈c, natural ⋈ (same names, one copy), ⟕ ⟖ ⟗ (NULL padding), γ G; F(A)→N.
- "not / no / never" → all − those that do.
- "all / every" → ÷, or all − those missing something.
- Division: $R \div S = \pi_Y(R) - \pi_Y((\pi_Y(R) \times S) - R)$.
- "compare two rows" → self-join with ρ.
- "max" without MAX → all − those beaten by someone (self-join with <).
- "for each, count, including zero" → ⟕ then γ COUNT(inner column).
- Two roles (author or coauthor) → ∪ after ρ; for "number of authors" count senior + coauthors.
- "younger than **all** coauthors" → books − books with a coauthor at least as young (decide: books with no coauthor qualify? state it).
- Compare years across rows (book before a coauthor was born) → join the chain (BOOKS, COAUTHORS, PERSONS), then σ on the two years.
- γ syntax: $_{G}\gamma_{\text{COUNT}(A) \rightarrow N}(R)$; write the grouping attributes on the left.
- Count separately what lives at different grain (books vs authors).
- Left outer join = join ∪ ((R − π_R(join)) × NULLs).
- Natural join over all attributes = ∩ (proof: t ∈ both ⇔ (t, t) passes the σ).

**TRC**: $\{t.A \mid \text{COND}\}$; left side = free variables; every variable ranged R(t); n variables ⇒ ≥ n − 1 join conditions.
- ∃ = some; ¬∃ = none; ∀x P = ¬∃x ¬P; P ⇒ Q = ¬P ∨ Q (so ¬A ∨ ¬B ∨ C = "if A and B then C").
- **"all / every" (Q3: employees on every dept-5 project).** ∀ form, read "for every x, if x is a dept-5 project then e works on x":
  $\{e.Lname, e.Fname \mid \text{EMPLOYEE}(e) \wedge (\forall x)(\neg\text{PROJECT}(x) \vee \neg(x.Dnum = 5) \vee (\exists w)(\text{WORKS\_ON}(w) \wedge w.Essn = e.Ssn \wedge w.Pno = x.Pnumber))\}$
- **∃-only form** (negate the inside with De Morgan: ∨ becomes ∧, C becomes ¬C), "no dept-5 project that e does not work on":
  $\neg(\exists x)(\text{PROJECT}(x) \wedge x.Dnum = 5 \wedge \neg(\exists w)(\text{WORKS\_ON}(w) \wedge w.Essn = e.Ssn \wedge w.Pno = x.Pnumber))$
  SQL: `NOT EXISTS (SELECT * FROM PROJECT x WHERE x.Dnum=5 AND NOT EXISTS (SELECT * FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=x.Pnumber))`. RA: ÷.
- **"no" (Q6: employees with no dependents).** One ¬∃: $\neg(\exists d)(\text{DEPENDENT}(d) \wedge e.Ssn = d.Essn)$.
- **Equivalences**: $(\forall x)P \equiv \neg(\exists x)\neg P$; $(\exists x)P \equiv \neg(\forall x)\neg P$; $P \Rightarrow Q \equiv \neg P \vee Q$; $\neg(P \wedge Q) \equiv \neg P \vee \neg Q$; $\neg(P \vee Q) \equiv \neg P \wedge \neg Q$.
  - Also: $\neg(P \Rightarrow Q) \equiv P \wedge \neg Q$; $\neg\neg P \equiv P$; $\neg(\exists x)P \equiv (\forall x)\neg P$; $\neg(\forall x)P \equiv (\exists x)\neg P$.
  - ∀ pairs with ⇒ (or ¬R ∨ …), ∃ pairs with ∧. Never $(\forall x)(R(x) \wedge \dots)$ or $(\exists x)(R(x) \Rightarrow \dots)$. Like quantifiers swap; ∀∃ does not.
- **Conversions RA ↔ TRC ↔ SQL**: σ = condition = WHERE; π = left side = SELECT; ⋈ = ∃ + join condition = JOIN / EXISTS; ∪ = ∨ = UNION; ∩ = ∧ = INTERSECT / IN; − = ∧ ¬∃ = NOT EXISTS / EXCEPT; ÷ = ∀ = double NOT EXISTS.
  - RA rules: $R \cap S = R - (R - S)$; $R \bowtie_c S = \sigma_c(R \times S)$; $\sigma_{c_1}(\sigma_{c_2}R) = \sigma_{c_1 \wedge c_2}R$; ∪ ∩ ⋈ commute and associate, − does not.
  - SQL: $x > \text{ALL}(S) \equiv \neg\exists s\,(x \le s)$; $x > \text{ANY}(S) \equiv \exists s\,(x > s)$; NOT IN with a NULL returns nothing, NOT EXISTS is safe.
- Unsafe: {t | ¬R(t)}. No aggregates in TRC: say so.
- Empty set: "all of none" is true; state whether such rows are included.

## Page 2, back: SQL (must, except embedded SQL)

**Order**: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY. WHERE has no aggregates; HAVING is for group conditions; ORDER BY may use aggregates not in the output.

**NULL**: comparisons → UNKNOWN; WHERE keeps TRUE only; IS NULL; aggregates skip NULL, COUNT(*) counts rows; empty: COUNT 0, others NULL; NOT IN with a NULL → nothing (use NOT EXISTS).

**Patterns.**
- none: `WHERE NOT EXISTS (SELECT * FROM T WHERE T.fk = X.key)`.
- every: `NOT EXISTS (SELECT * FROM REQ WHERE NOT EXISTS (SELECT * FROM HAS WHERE …))`.
- zeros: `X LEFT JOIN Y ON … GROUP BY X.key COUNT(Y.col)` (not COUNT(*)).
- ties: `WHERE v = (SELECT MAX(v) FROM …)` or `HAVING agg >= ALL (…)`; never LIMIT 1.
- neither A nor B: `NOT A AND NOT B`.
- filter on the right table of a LEFT JOIN: in ON, not WHERE.
- full outer without FULL: `LEFT JOIN UNION RIGHT JOIN`.
- latest row: `date = (SELECT MAX(date) … same key)`.
- rank within each group: `GROUP BY P, A ORDER BY P, COUNT(*) DESC` (or `RANK() OVER (PARTITION BY P ORDER BY COUNT(*) DESC)`).
- both roles: `(SELECT ISBN, AuthorName AS N FROM BOOKS) UNION (SELECT ISBN, JointAuthorName FROM COAUTHORS)`, then count.
- recursion: `WITH RECURSIVE T(a, b) AS (base SELECT UNION SELECT … FROM R, T WHERE R.x = T.a) SELECT * FROM T;`.

**DDL**: PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY … REFERENCES … ON DELETE / UPDATE {RESTRICT, CASCADE, SET NULL, SET DEFAULT}; ALTER TABLE ADD/DROP COLUMN/CONSTRAINT; DROP … CASCADE | RESTRICT.

**Assertions and triggers** (7.3):
- `CREATE ASSERTION A CHECK (NOT EXISTS (SELECT … rows that break the rule …));` holds for the whole DB.
- `CREATE TRIGGER T {BEFORE | AFTER} {INSERT | DELETE | UPDATE OF col} ON R FOR EACH ROW WHEN (cond using NEW. / OLD.) action;` is ECA (event, condition, action). INSERT has only NEW, DELETE only OLD. Without FOR EACH ROW it runs once per statement.

**Views**: single-table with key ⇒ updatable; joins usually not; aggregates/GROUP BY never. WITH CHECK OPTION.

**Embedded SQL**: EXEC SQL …; host variables in DECLARE SECTION, used as :x; SQLCODE 0 ok, 100 no more rows; cursor DECLARE / OPEN / FETCH INTO / CLOSE; UPDATE … WHERE CURRENT OF c; dynamic SQL PREPARE / EXECUTE; SQLJ iterators. Impedance mismatch = sets vs one value at a time.

**Stored procedure skeleton**: `CREATE PROCEDURE P() BEGIN DECLARE n INT; WHILE (SELECT COUNT(*) FROM S) > 0 DO SELECT MIN(x) INTO n FROM S; … END WHILE; IF … THEN … ELSE … END IF; END;`

**Algorithm → SQL** (GA6): copy the table you modify; store list order explicitly (Pos); one statement per step; check the **reduced** table; MIN to pick one element; COUNT(*) > 0 for "not empty".

## Answer-writing checklist (every question)

1. Assumptions first: keys, FKs, NULLs, the meaning of every vague word, with a reason each.
2. Method visible: closures, ← steps, comments in SQL.
3. Handle the edge cases out loud: empty sets, ties, zero counts, duplicates.
4. Final answer clearly marked.
5. By type: EER → (min, max) on every line, keys underlined. Mapping → PKs underlined, FK arrows, one line per mapping step used. NF → every closure written. RA → name intermediate results. SQL → one comment per clause. Proof → definition first, then the argument.
6. If you truly cannot start a whole question, "I do not know" earns 20% (two questions at most).
