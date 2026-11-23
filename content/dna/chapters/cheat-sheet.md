# Cheat sheet

You may bring **two handwritten A4 sheets** (printouts are not allowed). Writing them is itself revision: copy this plan by hand, in your own words, and add the mistakes you made in the [mock endsem](../mock-endsem/mock-endsem.html). The layout assumes you write on both sides of each sheet. If only one side is allowed, keep the sections marked **must** and drop the rest.

**What earns the space.** The exam is "like assignment questions" and you will have enough time, so the sheets are not for definitions you can explain in your own words. Put down:
1. **Procedures with steps you might reorder or forget**: closure, minimal cover, BCNF split, 3NF synthesis, the dependency-preservation test, the mapping steps and 8A–8D. **Must.**
2. **Notation you must draw exactly**: (min, max), division, outer joins, TRC quantifiers. **Must.**
3. **Patterns that turn English into a query**: "none", "every", "including zero", "the maximum without MAX", ties. **Must.**
4. **Lists the definition questions ask for by count**: the four DBMS actions, the four characteristics, the three levels, the two independences.
5. **Your own mistakes** from A1–A6 and the mock. These are worth more than anything copied from here.

**What to leave off**: long worked examples, full schemas (the paper gives them), history, and anything you have not used while practising.

## Page 1, front, top: database concepts (Elmasri 1–2)

**DBMS does**: define (catalog, meta-data), construct, manipulate (query, update, report), share; also protect and maintain. **DB approach vs files**: self-describing (catalog), program–data independence and abstraction, multiple views, sharing with concurrency control and atomic, isolated transactions. Files lead to uncontrolled redundancy (duplicated effort, wasted space, inconsistency). **Controlled** redundancy = kept on purpose, consistency enforced by the DBMS.

**Models**: conceptual (ER), representational (relational, object), physical (access paths), self-describing (XML, NoSQL). Object = operations + OID + inheritance; XML = tagged tree, schema mixed in. **Schema** = intension, rarely changes; **state** = extension, changes on every update, must be valid.

**Three levels**: external views → conceptual → internal; mappings transform requests and reformat results, and give independence. **Logical** (conceptual changes, views unchanged) is harder than **physical** (storage changes, conceptual unchanged), because programs depend on the logical structure. SDL internal, DDL conceptual, VDL external; SQL is DDL + VDL + DML. Nonprocedural = what, set at a time; procedural = how, record at a time.

**Users**: DBA, designers, casual / parametric (canned transactions) / sophisticated / standalone end users, analysts and programmers. **Tiers**: 2-tier (client app + DB server via ODBC/JDBC); 3-tier (client, application/web server with rules and security, DB server) for the web; n-tier splits the middle tier.

## Page 1, front: relational model and mapping (must)

**Keys.** Superkey: no two tuples agree. Key: minimal superkey. Prime: in some key. Counting superkeys among n attributes: one key of size k gives $2^{n-k}$; k single-attribute keys give $2^n - 2^{n-k}$; two keys K1, K2 give $2^{n-|K_1|} + 2^{n-|K_2|} - 2^{n-|K_1 \cup K_2|}$.

**Constraints.** Domain (type/CHECK), key (no duplicate key), entity integrity (PK not NULL), referential (FK value exists or NULL). Insert can violate all four; delete only referential (→ restrict / cascade / set null / set default); update: any.

**Ternary (min, max)**: count triples. Course with ≤ 2 profs and ≤ 100 students → (1, 200).

**Mapping steps.** 1 strong → relation (composite → parts). 2 weak → owner's full PK + partial key, FK CASCADE. 3 1:1 → FK on total side, UNIQUE (+NOT NULL). 4 1:N → FK on N side (+NOT NULL if total). 5 M:N → new relation, PK = both FKs, relationship attrs here. 6 multivalued → (owner PK, value). 7 n-ary → all FKs (drop a max-1 participant from the PK). Derived: not stored. Specialization: **8A** always works; **8B** total only; **8C** disjoint only; **8D** overlapping. Category with different keys: surrogate key.

**Rubric majors** (A2/A3): missing key, weak without owner key, FK to part of a key, FK on wrong side, M:N not separate, multivalued as column, attribute in wrong relation, specialization lost / 8C for overlapping, unmapped diamond, no arrows.

## Page 1, back: functional dependencies and normal forms (must)

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

**Lossless binary**: $R_1 \cap R_2$ → $R_1$ or → $R_2$ (common attributes are a key of a side).

**Lossless, 3+ relations (matrix test)**: one row per $R_i$, one column per attribute; cell = $a_j$ if $A_j \in R_i$, else $b_{ij}$. For each X → Y: rows that agree on all X columns get equal Y columns (copy an $a$ if any row has one, else one of the $b$s). Repeat until nothing changes. Lossless iff some row is all $a$.

**Covers**: F covers G iff every X → Y in G has Y ⊆ $X^+$ (closure under F). F ≡ G iff each covers the other.

**MVD and 4NF**: X ↠ Y: for each X value, the set of Y values is independent of the rest (R − X − Y), so swapping Y parts between two tuples gives tuples in R. Trivial if Y ⊆ X or X ∪ Y = R. Every FD is an MVD. 4NF: every non-trivial X ↠ Y has X a superkey. Split into XY and X(R − Y); lossless iff $R_1 \cap R_2$ ↠ $R_1 - R_2$. **Dependency preservation**: Z = X; repeat Z ∪= ((Z ∩ Ri)⁺ ∩ Ri); check Y ⊆ Z.

**Proof patterns**: "add A → K for a key K makes A a key"; "n FDs (a cycle) make every subset a superkey"; "3NF + all keys single ⇒ BCNF".

## Page 2, front: relational algebra and TRC (must)

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
- ∃ = some; ¬∃ = none; ∀x P = ¬∃x ¬P; P ⇒ Q = ¬P ∨ Q (so ¬A ∨ ¬B ∨ C = "if A and B then C").
- **"all / every" (Q3: employees on every dept-5 project).** ∀ form, read "for every x, if x is a dept-5 project then e works on x":
  $\{e.Lname, e.Fname \mid \text{EMPLOYEE}(e) \wedge (\forall x)(\neg\text{PROJECT}(x) \vee \neg(x.Dnum = 5) \vee (\exists w)(\text{WORKS\_ON}(w) \wedge w.Essn = e.Ssn \wedge w.Pno = x.Pnumber))\}$
- **∃-only form** (negate the inside with De Morgan: ∨ becomes ∧, C becomes ¬C), "no dept-5 project that e does not work on":
  $\neg(\exists x)(\text{PROJECT}(x) \wedge x.Dnum = 5 \wedge \neg(\exists w)(\text{WORKS\_ON}(w) \wedge w.Essn = e.Ssn \wedge w.Pno = x.Pnumber))$
  SQL: `NOT EXISTS (SELECT * FROM PROJECT x WHERE x.Dnum=5 AND NOT EXISTS (SELECT * FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=x.Pnumber))`. RA: ÷.
- **"no" (Q6: employees with no dependents).** One ¬∃: $\neg(\exists d)(\text{DEPENDENT}(d) \wedge e.Ssn = d.Essn)$.
- **Rule of thumb**: all/every = two ¬∃ (or ∀ with ¬…∨), RA ÷, SQL double NOT EXISTS. no/none = one ¬∃, RA −, SQL NOT EXISTS. some = one ∃, RA join/σ, SQL EXISTS or join.
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

**DDL**: PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY … REFERENCES … ON DELETE / UPDATE {RESTRICT, CASCADE, SET NULL, SET DEFAULT}; ALTER TABLE ADD/DROP COLUMN/CONSTRAINT; DROP … CASCADE | RESTRICT.

**Assertions and triggers** (7.3):
- `CREATE ASSERTION A CHECK (NOT EXISTS (SELECT … rows that break the rule …));` holds for the whole DB.
- `CREATE TRIGGER T {BEFORE | AFTER} {INSERT | DELETE | UPDATE OF col} ON R FOR EACH ROW WHEN (cond using NEW. / OLD.) action;` is ECA (event, condition, action). INSERT has only NEW, DELETE only OLD. Without FOR EACH ROW it runs once per statement.

**Views**: single-table with key ⇒ updatable; joins usually not; aggregates/GROUP BY never. WITH CHECK OPTION.

**Embedded SQL**: EXEC SQL …; host variables in DECLARE SECTION, used as :x; SQLCODE 0 ok, 100 no more rows; cursor DECLARE / OPEN / FETCH INTO / CLOSE; UPDATE … WHERE CURRENT OF c; dynamic SQL PREPARE / EXECUTE; SQLJ iterators. Impedance mismatch = sets vs one value at a time.

**Algorithm → SQL** (GA6): copy the table you modify; store list order explicitly (Pos); one statement per step; check the **reduced** table; MIN to pick one element; COUNT(*) > 0 for "not empty".

## Answer-writing checklist (every question)

1. Assumptions first: keys, FKs, NULLs, the meaning of every vague word, with a reason each.
2. Method visible: closures, ← steps, comments in SQL.
3. Handle the edge cases out loud: empty sets, ties, zero counts, duplicates.
4. Final answer clearly marked.
5. If you truly cannot start a whole question, "I do not know" earns 20% (two questions at most).
