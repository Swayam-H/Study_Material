# Learn: Mapping EER to relations

Assignment 3 gave you an EER diagram and asked for the relational schema: every relation, primary keys underlined, an arrow from each foreign key to the key it references, and a short explanation with assumptions. The method is mechanical: Elmasri ch 9 gives a fixed sequence of steps (9.1 for ER, 9.2 for the EER extensions), and Kamal's rubric marks you against exactly those steps. Learn the seven ER steps and the four specialization options, and you can map any diagram.

> **Study path.** Read the algorithm, then do the TV show mapping (Practice Problem 1) yourself before reading the key. Then read the major and minor mistakes list in the Reference: it is literally the grading scheme.

## The ER-to-relational algorithm (Elmasri 9.1)

**Step 1. Regular (strong) entity types.** One relation per strong entity type, with all its *simple* attributes. Composite attributes contribute only their **simple components** (Address → Street, City, Country). Pick one key as the primary key; keep other keys as UNIQUE. Multivalued and derived attributes are *not* columns here.

**Step 2. Weak entity types.** One relation per weak entity type, with its simple attributes **plus the primary key of its owner** as a foreign key. Its primary key = **owner's PK + partial key**. If the owner is itself weak (EPISODE owned by SEASON owned by TV_SHOW), map the owner first; the weak entity then carries the owner's *full* composite key: EPISODE(Title, Year, Season_No, Episode_No, …). Use ON DELETE CASCADE on that FK: an episode cannot exist without its season. The identifying relationship needs **no relation of its own**.

**Step 3. Binary 1:1 relationships.** Three choices:
- *Foreign key approach* (usual): put the PK of one side as an FK in the other, preferably in the side with **total participation** (fewer NULLs). DEPARTMENT gets Mgr_ssn because every department has a manager. Mark it UNIQUE (it is 1:1) and NOT NULL if participation is total.
- *Merged relation*: if both sides are total, merge into one relation.
- *Cross-reference relation*: a separate relation with both keys; useful if participation is rare on both sides.

**Step 4. Binary 1:N relationships.** Put the PK of the **1-side** as a foreign key in the **N-side** relation (each employee works for *one* department, so EMPLOYEE gets Dno). Relationship attributes go on the N side too. NOT NULL if the N side's participation is total. (A cross-reference relation is allowed if few N-side entities participate.)

**Step 5. Binary M:N relationships.** Always a **new relation** whose PK is the **combination of both participants' PKs**, each a foreign key. Relationship attributes (Hours, Role) become columns of this relation. WORKS_ON(Essn, Pno, Hours).

**Step 6. Multivalued attributes.** A new relation with the attribute plus the owning entity's PK as FK; PK = **both together**. TV_SHOW_GENRE(Title, Year, Genre). If the multivalued attribute is composite, include all its simple components.

**Step 7. N-ary relationships (n > 2).** A new relation with the PKs of all participants as FKs, plus relationship attributes. Its PK is usually all the FKs; but if a participant has max = 1 (that participant is determined by the others), that participant's FK can be left out of the key.

**Derived attributes** are not stored; they are computed by a query (COUNT of seasons). If you store one, mark it derived.

**Why the FK goes on the N side.** A column holds one value per row. An employee has one department, so EMPLOYEE.Dno is single-valued. A department has many employees, so DEPARTMENT cannot hold "the" employee. For M:N neither side can hold the other, so a third relation is needed.

## Mapping specialization (Elmasri 9.2)

Superclass C with attributes {k, a1, …, an}, subclasses S1, …, Sm.

| Option | Relations | Works for | Notes |
| --- | --- | --- | --- |
| **8A** Multiple relations, superclass and subclasses | L(k, a1…an); Li(k, subclass attrs) with k → L | **Any** specialization (total/partial, d/o) | Most general; needs a join to get full subclass rows |
| **8B** Subclass relations only | Li(k, a1…an, subclass attrs) | **Total** only (else entities in no subclass are lost); best for **disjoint** (overlap duplicates superclass attributes) | No superclass relation |
| **8C** Single relation, one type attribute | L(k, a1…an, all subclass attrs, t) | **Disjoint** only (t holds one value) | Many NULLs if subclasses have many attrs |
| **8D** Single relation, Boolean flags | L(k, a1…an, all subclass attrs, t1…tm) | **Overlapping** (and disjoint) | One flag per subclass |

The TV show model's PERSON → {ACTOR, DIRECTOR} is overlapping, so **8C is wrong** (a person who acts and directs needs two type values). 8A was the key's choice; 8B and 8D were accepted with a stated assumption.

**Shared subclass** (lattice): use 8A-style; the shared subclass's PK is the common key, an FK to each superclass. **Category** (union type) whose superclasses have *different* keys: introduce a **surrogate key** (Owner_id) in the category relation and add it as an FK column to each superclass relation. If the superclasses share a key, use it directly.

## Drawing the answer

Write each relation as NAME(attr, attr, …) with the PK underlined (on paper) or bold. Draw an **arrow from each foreign key to the PK it references**; one arrow per FK group is fine. A foreign key to a composite key must contain **all** its parts (an FK to (Title, Year) cannot be just Title: that is major mistake M3). Then a few lines: "how each construct was mapped" and "assumptions".

# Reference: Mapping EER to relations

## The steps at a glance

| EER construct | Maps to |
| --- | --- |
| Strong entity | Relation; simple attrs; composite → components; PK = chosen key |
| Weak entity | Relation; PK = owner's full PK + partial key; FK → owner (CASCADE) |
| Identifying relationship | Nothing extra (it is the FK in the weak entity) |
| 1:1 | FK on the total side, UNIQUE (+ NOT NULL if total); or merge |
| 1:N | FK on the N side (+ NOT NULL if N side total); relationship attrs on N side |
| M:N | New relation; PK = both FKs; relationship attrs here |
| Multivalued attribute | New relation (owner PK, value); PK = both |
| n-ary relationship | New relation; FKs to all; PK = all FKs (minus any max-1 participant) |
| Derived attribute | Not stored (compute by query), or stored and marked derived |
| Specialization | 8A / 8B (total) / 8C (disjoint) / 8D (overlapping) |
| Category | Surrogate key in the category, FK in each superclass |

## Kamal's rubric (A3, both papers)

- **A**: no major mistake, ≤ 2 minor. **B**: 1 major or ≥ 3 minor. **C**: 2–3 major. **D**: ≥ 4 major or largely missing. The same mistake in N places counts N times; one wrong key carried consistently counts once.
- **Major**: relation without PK or entity not mapped; weak entity PK missing owner's full key; FK references part of a composite key; 1:N FK on the wrong side or unmapped; M:N not a separate relation or PK missing a side; ternary mapped as binary; multivalued attribute kept as a column; relationship attribute in the wrong relation; specialization lost or 8C for overlapping; a diamond not mapped at all; no FK arrows.
- **Minor**: one arrow missing or reversed; one PK attribute not underlined; composite kept whole; derived stored unmarked; identifying or foldable relationship mapped as an extra relation without a reason; missing NOT NULL for total participation; missing UNIQUE on a 1:1 FK; missing explanation or assumptions.
- Names do not matter; structure does. Surrogate keys are fine if stated.

## What to be able to do without notes

- Map any ER/EER diagram in the order: strong, weak, 1:1, 1:N, M:N, multivalued, n-ary, specialization.
- Say for each FK where it goes and why, with NOT NULL / UNIQUE where the constraint demands.
- Pick 8A/8B/8C/8D from (d/o, total/partial) and defend it.
- Reverse the process (relations → EER), see chapter on ER/EER Problem 7.

# Practice: Mapping EER to relations

### Problem 1 [Mapping · Application · 10 pts · Assignment 3 individual (EtoR-I)]

Map the television-show EER model (chapter on ER/EER, Problem 1) to relations. Show primary keys, foreign-key arrows, explanation and assumptions.

*Solution.* (PK attributes listed first; † = part of PK.)

| Relation | Attributes | Foreign keys |
| --- | --- | --- |
| PRODUCTION_COMPANY | Name†, Street, City, Country | — |
| TV_SHOW | Title†, Year†, Company_Name | Company_Name → PRODUCTION_COMPANY, NOT NULL |
| TV_SHOW_GENRE | Title†, Year†, Genre† | (Title, Year) → TV_SHOW |
| SEASON | Title†, Year†, Season_No† | (Title, Year) → TV_SHOW |
| EPISODE | Title†, Year†, Season_No†, Episode_No†, Duration_Min, Plot_Outline | (Title, Year, Season_No) → SEASON |
| PERSON | Name†, DOB† | — |
| DIRECTOR | Name†, DOB† | (Name, DOB) → PERSON |
| ACTOR | Name†, DOB† | (Name, DOB) → PERSON |
| DIRECTS | Title†, Year†, Season_No†, Episode_No†, Dir_Name†, Dir_DOB† | episode key → EPISODE; (Dir_Name, Dir_DOB) → DIRECTOR |
| APPEARS_IN | Title†, Year†, Season_No†, Episode_No†, Actor_Name†, Actor_DOB†, Role | episode key → EPISODE; (Actor_Name, Actor_DOB) → ACTOR |

How each construct was mapped: strong entities → one relation each, composite Address split. Weak SEASON and EPISODE: owner key + partial key; EPISODE carries SEASON's full three-part key; identifying relationships need no relation. PRODUCES (1:N): FK on TV_SHOW, NOT NULL for total participation. DIRECTS and APPEARS_IN (M:N): own relations; Role in APPEARS_IN. Genre (multivalued): TV_SHOW_GENRE. PERSON specialization (overlapping, total): 8A. Derived counts: not stored.

Also accepted with a stated assumption: surrogate keys; 8B or 8D; Role in the APPEARS_IN key (if an actor can play two roles in one episode). **Not** accepted: 8C (single Person_Type) — cannot represent someone who both acts and directs.

### Problem 2 [Mapping · Application · 10 pts · Assignment 3 group (EtoR-G)]

Map the EER-of-EER model (chapter on ER/EER, Problem 2) to relations. Focus on: the strong/weak specialization of ENTITY_TYPE, the attribute specializations, the weak entity's key, 1:1 relationships, and the ternary relationships.

*Solution.* Outline of the key (23 relations):
- ENTITY_TYPE(**Name**); STRONG_ENTITY_TYPE(**Name**, Key_Attr_Name) with Name → ENTITY_TYPE and Key_Attr_Name → KEY_ATTRIBUTE, **NOT NULL, UNIQUE** (1:1, total); WEAK_ENTITY_TYPE(**Owner_Name, Name**, Partial_Key_Attr_Name) — PK = owner's key + own name (weak-entity rule), Owner_Name → STRONG_ENTITY_TYPE.
- ENTITY(**Entity_Id**, Type_Name) — "has instances" is 1:N, folded as FK Type_Name NOT NULL.
- ATTRIBUTE(**Attr_Name**, Accepts_Null) and one relation per subclass (SIMPLE, SINGLE_VALUED, STORED, DERIVED, COMPOSITE, MULTIVALUED, KEY, PARTIAL_KEY, PARTICIPATION_CONSTRAINT(Attr_Name, Min, Max), CARDINALITY_CONSTRAINT(…)) each with PK Attr_Name → ATTRIBUTE (option 8A, chosen because specializations are partial and some subclasses have their own relationships). The composite (min, max) becomes columns Min, Max.
- VALUE_SET(**Attr_Name, Value**) for the multivalued Value_set.
- M:N relations: CONSISTS_OF(**Composite_Name, Component_Name**), HAS_ATTRIBUTES(**Entity_Type_Name, Attr_Name**), DESCRIBED_BY(**Entity_Id, Attr_Name**).
- Ternary relations: REL_TYPE(**Entity_Type1, Entity_Type2, Attr_Name**); HAS_SUBCLASS(**Superclass_Name, Attr_Name**, Subclass_Name) and GENERALIZATION(**Subclass_Name, Attr_Name**, Superclass_Name): where one participant has max 1 it is determined by the other two, so it is a non-key FK.
- BINARY_REL_TYPE(**Entity_Type1**, Entity_Type2 UNIQUE NOT NULL): 1:1 both ways.

The key also had a diamond-by-diamond traceability table showing each of the 11 relationships mapped. That is a good habit: it proves rule M9 (no unmapped diamond).

### Problem 3 [Mapping · Application · 8 pts · Elmasri Fig 9.1 / 9.2]

Map the COMPANY ER schema: EMPLOYEE (Ssn; Name composite; Address; Salary; Sex; Bdate), DEPARTMENT (Number, Name; multivalued Locations), PROJECT (Number, Name; Location), DEPENDENT (weak, partial key Name, owner EMPLOYEE; Sex, Bdate, Relationship); WORKS_FOR (1:N, total on both), MANAGES (1:1, Start_date, total on DEPARTMENT), CONTROLS (1:N, total on PROJECT), SUPERVISION (1:N recursive), WORKS_ON (M:N, Hours).

*Solution.*
- EMPLOYEE(**Ssn**, Fname, Minit, Lname, Bdate, Address, Sex, Salary, Super_ssn, Dno) — Super_ssn → EMPLOYEE.Ssn (recursive 1:N on the N side, NULL allowed); Dno → DEPARTMENT, NOT NULL.
- DEPARTMENT(**Dnumber**, Dname UNIQUE, Mgr_ssn, Mgr_start_date) — Mgr_ssn → EMPLOYEE, NOT NULL UNIQUE (1:1, total on department side); the relationship attribute goes with the FK.
- DEPT_LOCATIONS(**Dnumber, Dlocation**) — multivalued.
- PROJECT(**Pnumber**, Pname UNIQUE, Plocation, Dnum) — Dnum → DEPARTMENT NOT NULL.
- WORKS_ON(**Essn, Pno**, Hours) — M:N.
- DEPENDENT(**Essn, Dependent_name**, Sex, Bdate, Relationship) — weak; Essn → EMPLOYEE ON DELETE CASCADE.

Note the circularity: EMPLOYEE.Dno → DEPARTMENT and DEPARTMENT.Mgr_ssn → EMPLOYEE. Insertion needs one FK to be added after the fact (ALTER TABLE) or deferred constraints.

### Problem 4 [Mapping · Concept · 4 pts]

PERSON(Ssn, Name) specializes into STUDENT(Major) and EMPLOYEE(Salary), overlapping and partial. Which mapping options are valid? Give the schema for the best one.

*Solution.* Partial rules out **8B** (a person who is neither would be lost). Overlapping rules out **8C** (one type value). Valid: **8A** and **8D**. 8A: PERSON(**Ssn**, Name), STUDENT(**Ssn**, Major) with Ssn → PERSON, EMPLOYEE(**Ssn**, Salary) with Ssn → PERSON. 8D: PERSON(**Ssn**, Name, Major, Salary, Is_student, Is_employee); NULLs where a flag is false. Prefer 8A if subclasses have many attributes or their own relationships; 8D avoids joins when they have few.

### Problem 5 [Mapping · Application · 4 pts]

Map the ternary SUPPLY(SUPPLIER(Sname), PART(Part_no), PROJECT(Proj_name)) with attribute Quantity. What changes if each (project, part) pair has at most one supplier?

*Solution.* SUPPLY(**Sname, Part_no, Proj_name**, Quantity), three FKs. If (Proj_name, Part_no) determines the supplier — SUPPLIER has max 1 in each (project, part) pair — the key shrinks to (**Part_no, Proj_name**) and Sname becomes a non-key FK. That is the same reasoning the GA3 key used for HAS_SUBCLASS.

### Problem 6 [Mapping · Concept · 3 pts]

Map the category OWNER = PERSON ∪ BANK ∪ COMPANY, where PERSON has key Ssn, BANK has key Bname, COMPANY has key Cname, and OWNER owns REGISTERED_VEHICLE (1:N).

*Solution.* The superclass keys differ, so add a **surrogate key**: OWNER(**Owner_id**). Add Owner_id as an FK (UNIQUE) column to PERSON, BANK and COMPANY. The ownership relationship uses Owner_id: OWNS(**Owner_id, Vehicle_id**, Purchase_date, Lien_or_regular) if M:N, or an FK in the vehicle relation if 1:N.

### Problem 7 [Mapping · Concept · 3 pts · past-paper style]

Why can a 1:N relationship's foreign key not go on the 1 side? Why must an M:N relationship get its own relation?

*Solution.* A relation's column holds one atomic value per row (1NF). On the 1 side, one department row would need all its employees' Ssns in one column: a multivalued column. On the N side, each employee row needs only its single department number. For M:N, both sides have many partners, so neither side can hold the FK; a separate relation with one row per pair is the only atomic representation, and its key must be the pair because neither key alone is unique there.
