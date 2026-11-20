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

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

### Problem 1 [Mapping · Application · 10 pts · Assignment 3 individual (EtoR-I)]

Map the television-show EER model (chapter on ER/EER, Problem 1) to relations. Show primary keys, foreign-key arrows, explanation and assumptions.

*Solution.*

**Assumptions.**
1. Production companies are identified by Name, TV shows by (Title, Year) and persons by (Name, DOB). *(Reason: these are the identifiers given in the requirements.)*
2. Season_No is unique within a show and Episode_No is unique within a season. *(Reason: as in the EER model.)*
3. An actor plays one role per episode. *(Reason: the requirements record "the role".)*

**Relational schema.** Primary-key attributes are marked †.

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

**Explanation of the mapping.**
1. **Strong entity types** (PRODUCTION_COMPANY, TV_SHOW, PERSON) each become a relation. The composite attribute Address is replaced by its components Street, City and Country.
2. **Weak entity types** take the owner's primary key plus their partial key as their primary key. EPISODE's owner SEASON is itself weak, so EPISODE carries SEASON's full three-part key. The identifying relationships need no separate relation.
3. **PRODUCES (1:N)** is mapped by the foreign key Company_Name on the N side (TV_SHOW). It is NOT NULL because every show must have a producer (total participation).
4. **DIRECTS and APPEARS_IN (M:N)** each become a relation whose key is the combination of both participants' keys. Role is placed in APPEARS_IN because it describes an actor in an episode.
5. The **multivalued attribute** Genre becomes the relation TV_SHOW_GENRE.
6. The **specialization** of PERSON is overlapping and total, so option 8A is used: a PERSON relation plus ACTOR and DIRECTOR relations sharing its key. A person who both acts and directs appears in both.
7. **Derived attributes** are not stored; they are computed with COUNT queries.

**Final answer.** The ten relations in the table, with the foreign keys drawn as arrows from each foreign key to the primary key it references.

> **Examiner's note.** Also accepted with a stated assumption: surrogate keys, option 8B or 8D, Role inside the APPEARS_IN key. Not accepted: option 8C (a single Person_Type attribute), because it cannot represent a person who is both an actor and a director.

### Problem 2 [Mapping · Application · 10 pts · Assignment 3 group (EtoR-G)]

Map the EER-of-EER model (chapter on ER/EER, Problem 2) to relations. Focus on: the strong/weak specialization of ENTITY_TYPE, the attribute specializations, the weak entity's key, 1:1 relationships, and the ternary relationships.

*Solution.*

**Assumptions.**
1. Entity types are identified by Name, entities by Entity_Id and attributes by Attr_Name. *(Reason: these are the identifiers in the EER model.)*
2. For a ternary relationship in which one participant has maximum 1, that participant is determined by the other two. *(Reason: the maximum 1 means at most one such entity per combination of the others.)*

**Relational schema** (primary keys in bold).
1. ENTITY_TYPE(**Name**).
2. STRONG_ENTITY_TYPE(**Name**, Key_Attr_Name); Name → ENTITY_TYPE; Key_Attr_Name → KEY_ATTRIBUTE, NOT NULL, UNIQUE.
3. WEAK_ENTITY_TYPE(**Owner_Name, Name**, Partial_Key_Attr_Name); Owner_Name → STRONG_ENTITY_TYPE; Name → ENTITY_TYPE; Partial_Key_Attr_Name → PARTIAL_KEY_ATTRIBUTE, NOT NULL, UNIQUE.
4. ENTITY(**Entity_Id**, Type_Name); Type_Name → ENTITY_TYPE, NOT NULL.
5. ATTRIBUTE(**Attr_Name**, Accepts_Null), and one relation per subclass: SIMPLE_ATTRIBUTE, SINGLE_VALUED_ATTRIBUTE, STORED_ATTRIBUTE, DERIVED_ATTRIBUTE, COMPOSITE_ATTRIBUTE, MULTIVALUED_ATTRIBUTE, KEY_ATTRIBUTE, PARTIAL_KEY_ATTRIBUTE, PARTICIPATION_CONSTRAINT(**Attr_Name**, Min, Max), CARDINALITY_CONSTRAINT(**Attr_Name**, Min, Max); each with Attr_Name → ATTRIBUTE.
6. VALUE_SET(**Attr_Name, Value**); Attr_Name → MULTIVALUED_ATTRIBUTE.
7. CONSISTS_OF(**Composite_Name, Component_Name**); HAS_ATTRIBUTES(**Entity_Type_Name, Attr_Name**); DESCRIBED_BY(**Entity_Id, Attr_Name**).
8. REL_TYPE(**Entity_Type1, Entity_Type2, Attr_Name**); BINARY_REL_TYPE(**Entity_Type1**, Entity_Type2 NOT NULL UNIQUE).
9. HAS_SUBCLASS(**Superclass_Name, Attr_Name**, Subclass_Name); GENERALIZATION(**Subclass_Name, Attr_Name**, Superclass_Name).

**Explanation of the mapping.**
1. Regular entity types become relations keyed by their identifiers.
2. Every specialization uses option 8A (superclass relation plus one relation per subclass, sharing the key), because the specializations are partial and several subclasses have their own relationships.
3. The weak entity type's key is the owner's key plus its own name, following the weak-entity rule.
4. 1:1 and 1:N relationships are folded into foreign keys: NOT NULL where participation is total, UNIQUE where the relationship is 1:1.
5. M:N and ternary relationships become separate relations holding the participants' keys. In HAS_SUBCLASS and GENERALIZATION the participant with maximum 1 is a non-key foreign key, by Assumption 2.
6. The composite attribute (min, max) is flattened into the columns Min and Max; the multivalued Value_set becomes VALUE_SET; the derived Component_count is not stored.

**Final answer.** The 23 relations above, with foreign-key arrows, together with a table showing how each of the 11 relationships in the EER diagram was mapped.

> **Examiner's note.** The diamond-by-diamond table is what proves that no relationship was left unmapped (major mistake M9). Write it.

### Problem 3 [Mapping · Application · 8 pts · Elmasri Fig 9.1 / 9.2]

Map the COMPANY ER schema: EMPLOYEE (Ssn; Name composite; Address; Salary; Sex; Bdate), DEPARTMENT (Number, Name; multivalued Locations), PROJECT (Number, Name; Location), DEPENDENT (weak, partial key Name, owner EMPLOYEE; Sex, Bdate, Relationship); WORKS_FOR (1:N, total on both), MANAGES (1:1, Start_date, total on DEPARTMENT), CONTROLS (1:N, total on PROJECT), SUPERVISION (1:N recursive), WORKS_ON (M:N, Hours).

*Solution.*

**Assumptions.**
1. Name is composite (Fname, Minit, Lname). *(Reason: as in Elmasri Figure 9.1.)*
2. A department that loses its manager keeps its employees. *(Reason: only DEPENDENT is existence-dependent.)*

**Relational schema** (primary keys in bold).
1. EMPLOYEE(**Ssn**, Fname, Minit, Lname, Bdate, Address, Sex, Salary, Super_ssn, Dno); Super_ssn → EMPLOYEE.Ssn (NULL allowed); Dno → DEPARTMENT.Dnumber, NOT NULL.
2. DEPARTMENT(**Dnumber**, Dname UNIQUE, Mgr_ssn, Mgr_start_date); Mgr_ssn → EMPLOYEE.Ssn, NOT NULL, UNIQUE.
3. DEPT_LOCATIONS(**Dnumber, Dlocation**); Dnumber → DEPARTMENT.
4. PROJECT(**Pnumber**, Pname UNIQUE, Plocation, Dnum); Dnum → DEPARTMENT, NOT NULL.
5. WORKS_ON(**Essn, Pno**, Hours); Essn → EMPLOYEE; Pno → PROJECT.
6. DEPENDENT(**Essn, Dependent_name**, Sex, Bdate, Relationship); Essn → EMPLOYEE, ON DELETE CASCADE.

**Explanation.**
1. WORKS_FOR (1:N, total on EMPLOYEE) gives the NOT NULL foreign key Dno in EMPLOYEE.
2. SUPERVISION (recursive 1:N) gives Super_ssn in EMPLOYEE; it may be NULL because the top employee has no supervisor.
3. MANAGES (1:1, total on DEPARTMENT) gives Mgr_ssn in DEPARTMENT, NOT NULL and UNIQUE; its attribute Start_date goes with the foreign key.
4. CONTROLS (1:N, total on PROJECT) gives Dnum in PROJECT.
5. WORKS_ON (M:N) becomes its own relation with Hours.
6. Locations (multivalued) becomes DEPT_LOCATIONS; DEPENDENT (weak) takes the owner key.

**Final answer.** The six relations above. Because EMPLOYEE.Dno and DEPARTMENT.Mgr_ssn reference each other, one of the two foreign keys must be added after both tables exist (ALTER TABLE) or checked at commit time.

### Problem 4 [Mapping · Concept · 4 pts]

PERSON(Ssn, Name) specializes into STUDENT(Major) and EMPLOYEE(Salary), overlapping and partial. Which mapping options are valid? Give the schema for the best one.

*Solution.*

**Working.**
1. The specialization is **partial**, so option 8B (subclass relations only) is invalid: a person who is neither a student nor an employee would not be stored anywhere.
2. The specialization is **overlapping**, so option 8C (a single type attribute) is invalid: one type value cannot record a person who is both.
3. Options **8A** and **8D** satisfy both constraints.

**Schemas.**
- 8A: PERSON(**Ssn**, Name); STUDENT(**Ssn**, Major), Ssn → PERSON; EMPLOYEE(**Ssn**, Salary), Ssn → PERSON.
- 8D: PERSON(**Ssn**, Name, Major, Salary, Is_student, Is_employee), where Major and Salary are NULL when the corresponding flag is false.

**Final answer.** Valid options: **8A and 8D**. I choose **8A**, because it avoids NULL columns and lets each subclass take part in its own relationships; 8D is preferable only when subclasses have very few attributes.

### Problem 5 [Mapping · Application · 4 pts]

Map the ternary SUPPLY(SUPPLIER(Sname), PART(Part_no), PROJECT(Proj_name)) with attribute Quantity. What changes if each (project, part) pair has at most one supplier?

*Solution.*

**Assumption.** SUPPLIER, PART and PROJECT are identified by Sname, Part_no and Proj_name. *(Reason: given.)*

**Working.**
1. An n-ary relationship becomes a new relation that holds the primary keys of all participants as foreign keys, plus its own attributes.
2. In general no participant is determined by the others, so the primary key is the combination of all three foreign keys.
3. If each (project, part) pair has at most one supplier, then (Part_no, Proj_name) → Sname. The key shrinks to (Part_no, Proj_name), and Sname becomes a non-key foreign key.

**Final answer.** SUPPLY(**Sname, Part_no, Proj_name**, Quantity), with three foreign keys. Under the extra constraint: SUPPLY(Sname, **Part_no, Proj_name**, Quantity).

### Problem 6 [Mapping · Concept · 3 pts]

Map the category OWNER = PERSON ∪ BANK ∪ COMPANY, where PERSON has key Ssn, BANK has key Bname, COMPANY has key Cname, and OWNER owns REGISTERED_VEHICLE (1:N).

*Solution.*

**Assumption.** An owner may own several vehicles and a vehicle has one owner. *(Reason: OWNS is given as 1:N.)*

**Working.**
1. The superclasses PERSON, BANK and COMPANY have **different keys** (Ssn, Bname, Cname), so no existing key can identify an owner.
2. Therefore a **surrogate key** Owner_id is introduced in the category relation OWNER.
3. Owner_id is added as a foreign key (UNIQUE, NULL allowed) to each superclass relation, linking each person, bank or company that is an owner to its OWNER tuple.
4. The 1:N ownership relationship is mapped by placing Owner_id as a foreign key in the vehicle relation.

**Final answer.** OWNER(**Owner_id**); PERSON(**Ssn**, …, Owner_id), BANK(**Bname**, …, Owner_id), COMPANY(**Cname**, …, Owner_id), each Owner_id → OWNER; REGISTERED_VEHICLE(**Vehicle_id**, …, Owner_id → OWNER).

### Problem 7 [Mapping · Concept · 3 pts · past-paper style]

Why can a 1:N relationship's foreign key not go on the 1 side? Why must an M:N relationship get its own relation?

*Solution.*

**Answer.**
1. Every attribute value in a relation must be atomic (first normal form), so a column can hold only one value per row.
2. In a 1:N relationship such as WORKS_FOR, each employee is related to exactly one department. A foreign key Dno in EMPLOYEE therefore holds one value per row, as required. On the 1 side, a department row would need to hold *all* its employees' Ssns in one column, which is a multivalued attribute and is not allowed.
3. In an M:N relationship both sides have many partners, so neither relation can hold the foreign key. A separate relation with one row per related pair is the only atomic representation, and its primary key must be the pair, because neither participant's key is unique in it.

**Final answer.** The foreign key goes on the N side because only there it is single-valued; an M:N relationship needs its own relation because neither side can hold a single-valued foreign key.

