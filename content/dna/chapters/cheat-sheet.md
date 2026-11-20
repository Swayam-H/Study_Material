# Cheat sheet

You may bring **two handwritten A4 pages** (printed sheets are not allowed, even if the content was handwritten by a tool). Writing them is itself revision: copy this plan by hand, in your own words, and add the mistakes you made in the [mock endsem](../mock-endsem/mock-endsem.html). Page 1 is design and theory; page 2 is the query languages.

## Page 1, front: relational model, EER, mapping

**Keys.** Superkey: no two tuples agree. Key: minimal superkey. Prime: in some key. Counting superkeys among n attributes: one key of size k gives $2^{n-k}$; k single-attribute keys give $2^n - 2^{n-k}$; two keys K1, K2 give $2^{n-|K_1|} + 2^{n-|K_2|} - 2^{n-|K_1 \cup K_2|}$.

**Constraints.** Domain (type/CHECK), key (no duplicate key), entity integrity (PK not NULL), referential (FK value exists or NULL). Insert can violate all four; delete only referential (→ restrict / cascade / set null / set default); update: any.

**EER notation.** Weak = double box + double diamond + dashed-underlined partial key, (1,1) on the weak side. Multivalued = double oval. Derived = dashed oval. Composite = oval with sub-ovals. Total = double line. (min, max) beside the entity: each entity takes part in ≥ min, ≤ max instances. Specialization: circle with **d** or **o**; double line from superclass = total. Category = ∪ in circle (member of **one** superclass); shared subclass = member of **all**.

**Ternary (min, max)**: count triples. Course with ≤ 2 profs and ≤ 100 students → (1, 200).

**Mapping steps.** 1 strong → relation (composite → parts). 2 weak → owner's full PK + partial key, FK CASCADE. 3 1:1 → FK on total side, UNIQUE (+NOT NULL). 4 1:N → FK on N side (+NOT NULL if total). 5 M:N → new relation, PK = both FKs, relationship attrs here. 6 multivalued → (owner PK, value). 7 n-ary → all FKs (drop a max-1 participant from the PK). Derived: not stored. Specialization: **8A** always works; **8B** total only; **8C** disjoint only; **8D** overlapping. Category with different keys: surrogate key.

**Rubric majors** (A2/A3): missing key, weak without owner key, FK to part of a key, FK on wrong side, M:N not separate, multivalued as column, attribute in wrong relation, specialization lost / 8C for overlapping, unmapped diamond, no arrows.

## Page 1, back: functional dependencies and normal forms

**Closure** $X^+$: start X, add right sides whose left sides are inside, repeat. X → B iff B ∈ $X^+$.

**Keys from FDs**: attributes on no right side are in **every** key (proof: closure never adds them). Start from them, add attributes until $X^+$ = R, keep minimal ones.

**Armstrong**: reflexivity, augmentation, transitivity; derived: union, decomposition, pseudotransitivity. Never "AB → C ⇒ A → C".

**Normal forms** (check against all keys and $F^+$):
- 2NF: no non-prime attribute depends on part of a key (single-attribute keys ⇒ 2NF).
- 3NF: every non-trivial X → A: X superkey **or** A prime.
- BCNF: every non-trivial X → A: X superkey. Two-attribute relations are BCNF.
- Highest NF: report the violating FD for the next level.

**Minimal cover**: split right sides → remove extraneous left attributes → remove redundant FDs, testing against the **current** set.

**BCNF**: split violating X → Y into XY and R − (Y − X); re-project FDs; lossless, may lose FDs (AB → C, C → B).

**3NF synthesis**: minimal cover → one relation per left side → add a key relation if none → drop contained relations. Lossless + dependency-preserving.

**Lossless binary**: $R_1 \cap R_2$ → $R_1$ or → $R_2$ (common attributes are a key of a side). **Dependency preservation**: Z = X; repeat Z ∪= ((Z ∩ Ri)⁺ ∩ Ri); check Y ⊆ Z.

**Proof patterns**: "add A → K for a key K makes A a key"; "n FDs (a cycle) make every subset a superkey"; "3NF + all keys single ⇒ BCNF".

## Page 2, front: relational algebra and TRC

**RA**: σ rows, π columns (removes duplicates), ρ rename, ∪ ∩ − (union-compatible), ×, ⋈c, natural ⋈ (same names, one copy), ⟕ ⟖ ⟗ (NULL padding), γ G; F(A)→N.
- "not / no / never" → all − those that do.
- "all / every" → ÷, or all − those missing something.
- Division: $R \div S = \pi_Y(R) - \pi_Y((\pi_Y(R) \times S) - R)$.
- "compare two rows" → self-join with ρ.
- "max" without MAX → all − those beaten by someone (self-join with <).
- "for each, count, including zero" → ⟕ then γ COUNT(inner column).
- Two roles (author or coauthor) → ∪ after ρ.
- Count separately what lives at different grain (books vs authors).
- Left outer join = join ∪ ((R − π_R(join)) × NULLs).
- Natural join over all attributes = ∩ (proof: t ∈ both ⇔ (t, t) passes the σ).

**TRC**: $\{t.A \mid \text{COND}\}$; left side = free variables; every variable ranged R(t); n variables ⇒ ≥ n − 1 join conditions.
- ∃ = some; ¬∃ = none; ∀x P = ¬∃x ¬P; P ⇒ Q = ¬P ∨ Q.
- "every project of dept 5": ¬∃x (PROJECT(x) ∧ x.Dnum = 5 ∧ ¬∃w (WORKS_ON(w) ∧ w.Essn = e.Ssn ∧ w.Pno = x.Pnumber)).
- Unsafe: {t | ¬R(t)}. No aggregates in TRC: say so.
- Empty set: "all of none" is true; state whether such rows are included.

## Page 2, back: SQL

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

**DDL**: PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY … REFERENCES … ON DELETE / UPDATE {RESTRICT, CASCADE, SET NULL, SET DEFAULT}; ALTER TABLE ADD/DROP COLUMN/CONSTRAINT; DROP … CASCADE | RESTRICT.

**Views**: single-table with key ⇒ updatable; joins usually not; aggregates/GROUP BY never. WITH CHECK OPTION.

**Embedded SQL**: EXEC SQL …; host variables in DECLARE SECTION, used as :x; SQLCODE 0 ok, 100 no more rows; cursor DECLARE / OPEN / FETCH INTO / CLOSE; UPDATE … WHERE CURRENT OF c; dynamic SQL PREPARE / EXECUTE; SQLJ iterators. Impedance mismatch = sets vs one value at a time.

**Algorithm → SQL** (GA6): copy the table you modify; store list order explicitly (Pos); one statement per step; check the **reduced** table; MIN to pick one element; COUNT(*) > 0 for "not empty".

## Answer-writing checklist (every question)

1. Assumptions first: keys, FKs, NULLs, the meaning of every vague word, with a reason each.
2. Method visible: closures, ← steps, comments in SQL.
3. Handle the edge cases out loud: empty sets, ties, zero counts, duplicates.
4. Final answer clearly marked.
5. If you truly cannot start a whole question, "I do not know" earns 20% (two questions at most).
