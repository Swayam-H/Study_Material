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
- Reverse the process (relations → EER), see the ER/EER Practice page, Problem 18 (M24 Quiz 2 Q3).

# Practice: Mapping EER to relations

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

## A. Assignment 3 (this year)

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

**Schema diagram** (tap to enlarge).

[![Relational schema with foreign-key arrows](fig/dna-a3i-schema.svg)](../../assets/fig/dna-a3i-schema.svg)

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

**Schema diagram** (tap to enlarge).

[![Relational schema with foreign-key arrows](fig/dna-a3g-schema.svg)](../../assets/fig/dna-a3g-schema.svg)

**Explanation of the mapping.**
1. Regular entity types become relations keyed by their identifiers.
2. Every specialization uses option 8A (superclass relation plus one relation per subclass, sharing the key), because the specializations are partial and several subclasses have their own relationships.
3. The weak entity type's key is the owner's key plus its own name, following the weak-entity rule.
4. 1:1 and 1:N relationships are folded into foreign keys: NOT NULL where participation is total, UNIQUE where the relationship is 1:1.
5. M:N and ternary relationships become separate relations holding the participants' keys. In HAS_SUBCLASS and GENERALIZATION the participant with maximum 1 is a non-key foreign key, by Assumption 2.
6. The composite attribute (min, max) is flattened into the columns Min and Max; the multivalued Value_set becomes VALUE_SET; the derived Component_count is not stored.

**Final answer.** The 23 relations above, with foreign-key arrows, together with a table showing how each of the 11 relationships in the EER diagram was mapped.

> **Examiner's note.** The diamond-by-diamond table is what proves that no relationship was left unmapped (major mistake M9). Write it.

## B. Textbook exercises set by Kamal (Elmasri 9.2–9.8)

Each answer below follows the A3 rubric: one line per relation with its primary key (bold), every foreign key with its target, the mapping step used, and the assumptions that decided NOT NULL and UNIQUE.

### Problem 3 [Mapping · Application · 10 pts · Elmasri 9.2]

Map the UNIVERSITY ER schema of Figure 3.20 to relations.

*Solution.*

**The schema (Figure 3.20).**
1. Entity types:
   1. COLLEGE (**CName**, COffice, CPhone).
   2. INSTRUCTOR (**Id**, Rank, IName, IOffice, IPhone).
   3. DEPT (**DCode**, DName (unique), DOffice, DPhone).
   4. COURSE (**CCode**, CoName (unique), Credits, Level, CDesc).
   5. SECTION (**SecId**, SecNo, Sem, Year, CRoom(Bldg, RoomNo), DaysTime).
   6. STUDENT (**SId**, SName(FName, MName, LName), Addr, Phone, Major, DOB).
2. Relationships, with (min, max):
   1. DEAN: COLLEGE (1,1), INSTRUCTOR (0,1).
   2. ADMINS: COLLEGE (0,N), DEPT (1,1).
   3. CHAIR: DEPT (1,1), INSTRUCTOR (0,1), with attribute CStartDate.
   4. EMPLOYS: DEPT (0,N), INSTRUCTOR (1,1).
   5. HAS: DEPT (0,N), STUDENT (0,1).
   6. OFFERS: DEPT (0,N), COURSE (1,1).
   7. SECS: COURSE (0,N), SECTION (1,1).
   8. TEACHES: INSTRUCTOR (0,N), SECTION (1,1).
   9. TAKES: STUDENT (0,N), SECTION (5,N), with attribute Grade.

**The ER schema being mapped** (tap to enlarge).

[![The UNIVERSITY ER schema of Figure 3.20](fig/dna-92-university-er.svg)](../../assets/fig/dna-92-university-er.svg)

**Assumptions.**
1. (min, max) values are read as printed in Figure 3.20. *(Reason: they decide NOT NULL.)* The text says a student "is assigned to one primary academic department", which would make HAS (1,1) for STUDENT and its foreign key NOT NULL.
2. Grade may be NULL until it is recorded. *(Reason: "the grade is recorded when available".)*

**Relational schema.**
1. COLLEGE(**CName**, COffice, CPhone, Dean_id): Dean_id → INSTRUCTOR.Id, NOT NULL, UNIQUE. *(Step 3, 1:1 DEAN: the FK goes on the total side, COLLEGE.)*
2. INSTRUCTOR(**Id**, Rank, IName, IOffice, IPhone, DCode): DCode → DEPT, NOT NULL. *(Step 4, EMPLOYS: N side; INSTRUCTOR is total.)*
3. DEPT(**DCode**, DName UNIQUE, DOffice, DPhone, CName, Chair_id, CStartDate):
   1. CName → COLLEGE, NOT NULL. *(Step 4, ADMINS.)*
   2. Chair_id → INSTRUCTOR, NOT NULL, UNIQUE, and the relationship attribute CStartDate goes with it. *(Step 3, CHAIR: DEPT is total.)*
4. COURSE(**CCode**, CoName UNIQUE, Credits, Level, CDesc, DCode): DCode → DEPT, NOT NULL. *(Step 4, OFFERS.)*
5. SECTION(**SecId**, SecNo, Sem, Year, Bldg, RoomNo, DaysTime, CCode, Instructor_id):
   1. CCode → COURSE, NOT NULL. *(Step 4, SECS.)*
   2. Instructor_id → INSTRUCTOR, NOT NULL. *(Step 4, TEACHES.)*
   3. CRoom is composite, so it is mapped as its parts. *(Step 1.)*
   4. UNIQUE (SecNo, Sem, Year, CCode), UNIQUE (Sem, Year, Bldg, RoomNo, DaysTime) and UNIQUE (Sem, Year, DaysTime, Instructor_id). These are the constraints of Elmasri 3.16.
6. STUDENT(**SId**, FName, MName, LName, Addr, Phone, Major, DOB, DCode): DCode → DEPT, NULL allowed. *(Step 4, HAS.)*
7. TAKES(**SId, SecId**, Grade): SId → STUDENT, SecId → SECTION. *(Step 5, M:N.)*

**Schema diagram** (tap to enlarge).

[![UNIVERSITY relational schema](fig/dna-92-university-schema.svg)](../../assets/fig/dna-92-university-schema.svg)

**Constraints lost in mapping.**
1. "A section must have at least five students" (5,N) cannot be declared with keys or foreign keys. It needs an assertion or trigger.
2. The same is true of the total participation of DEPT in CHAIR, *if* the FK were placed on the INSTRUCTOR side. Placing it on DEPT, as here, keeps it as NOT NULL.

**Final answer.** The seven relations above. DEPT and INSTRUCTOR reference each other (DCode and Chair_id), and so do COLLEGE and INSTRUCTOR (through DEPT), so one of the FKs must be added after the tables exist, or checked at commit time.

> **Examiner's note.** The A3 rubric's majors: an FK on the wrong side of a 1:N relationship, a missing NOT NULL where participation is total, and an M:N relationship (TAKES) not given its own relation. Writing the lost (5,N) constraint explicitly is what earns the A.

### Problem 4 [Mapping · Application · 6 pts · Elmasri 9.3]

Reverse engineering: map the LIBRARY relational schema (Figure 6.6, called 6.14 in the exercise) into an ER schema. State assumptions. The relations are BOOK(Book_id, Title, Publisher_name), BOOK_AUTHORS(Book_id, Author_name), PUBLISHER(Name, Address, Phone), BOOK_COPIES(Book_id, Branch_id, No_of_copies), BOOK_LOANS(Book_id, Branch_id, Card_no, Date_out, Due_date), LIBRARY_BRANCH(Branch_id, Branch_name, Address), BORROWER(Card_no, Name, Address, Phone).

*Solution.*

**Method.**
1. A relation whose key is its own identifier becomes an **entity type**.
2. A relation whose key consists only of foreign keys becomes a **relationship type**.
3. A relation holding an owner key plus one value becomes a **multivalued attribute**.
4. A non-key foreign key becomes a **1:N relationship**.

**Assumptions.**
1. Authors are only names, with no other data. *(Reason: BOOK_AUTHORS has only Author_name.)*
2. The key of BOOK_LOANS is (Book_id, Branch_id, Card_no). So a borrower holds at most one copy of a given book from a given branch at a time. *(Reason: that is the key in the figure.)*

**ER schema.**
1. Entity types:
   1. BOOK (**Book_id**, Title, {Author_name}), multivalued, from BOOK_AUTHORS.
   2. PUBLISHER (**Name**, Address, Phone).
   3. LIBRARY_BRANCH (**Branch_id**, Branch_name, Address).
   4. BORROWER (**Card_no**, Name, Address, Phone).
2. Relationship types:

| Relationship | From | Participants and (min, max) | Attributes |
| --- | --- | --- | --- |
| PUBLISHED_BY | BOOK.Publisher_name | BOOK (1,1), PUBLISHER (0,N) | — |
| COPIES | BOOK_COPIES | BOOK (0,N), LIBRARY_BRANCH (0,N) | No_of_copies |
| LOANS (ternary) | BOOK_LOANS | BOOK (0,N), LIBRARY_BRANCH (0,N), BORROWER (0,N) | Date_out, Due_date |

**ER diagram** (tap to enlarge).

[![LIBRARY ER schema](fig/dna-93-library-er.svg)](../../assets/fig/dna-93-library-er.svg)

**Explanation.**
1. LOANS is ternary because the key of BOOK_LOANS has three foreign keys and none is determined by the other two.
2. If Author had more data, it would be an entity AUTHOR with an M:N relationship WRITES.

**Final answer.** Four entity types and three relationship types, as above.

> **Examiner's note.** BOOK_COPIES has copy counts, not individual copies, so there is no COPY entity. Modelling copies as entities is a design improvement, not a reverse-engineering result. Say so if you do it.

### Problem 5 [Mapping · Application · 8 pts · Elmasri 9.4]

Map the SHIP_TRACKING ER schema of Figure 9.8 to relations, with all primary and foreign keys.

*Solution.*

**The schema (Figure 9.8).**
1. Entity types:
   1. SHIP (**Sname**, Owner).
   2. SHIP_TYPE (**Type**, Tonnage, Hull).
   3. SHIP_MOVEMENT, weak with owner SHIP through HISTORY: partial key Time_stamp(Date, Time); attributes Longitude, Latitude.
   4. PORT (**Pname**).
   5. STATE/COUNTRY (**Name**, Continent).
   6. SEA/OCEAN/LAKE (**Name**).
   7. PORT_VISIT, weak with owners SHIP and PORT through SHIP_AT_PORT: partial key Start_date; attribute End_date.
2. Relationships:
   1. TYPE: SHIP N:1 SHIP_TYPE.
   2. HOME_PORT: SHIP N:1 PORT.
   3. IN: PORT N:1 STATE/COUNTRY.
   4. ON: PORT N:1 SEA/OCEAN/LAKE.

**Assumptions.**
1. Port names are unique. *(Reason: Pname is the underlined key.)* If not, the key would be (Pname, State_country_name).
2. Every ship has a type and a home port. *(Reason: maritime registration requires both.)*

**Relational schema.**
1. SHIP_TYPE(**Type**, Tonnage, Hull).
2. STATE_COUNTRY(**Name**, Continent).
3. BODY_OF_WATER(**Name**), for SEA/OCEAN/LAKE.
4. PORT(**Pname**, State_country_name, Water_name): State_country_name → STATE_COUNTRY, Water_name → BODY_OF_WATER. *(Step 4, for IN and ON.)*
5. SHIP(**Sname**, Owner, Type, Home_port): Type → SHIP_TYPE, NOT NULL; Home_port → PORT, NOT NULL. *(Step 4, for TYPE and HOME_PORT.)*
6. SHIP_MOVEMENT(**Sname, Date, Time**, Longitude, Latitude): Sname → SHIP, ON DELETE CASCADE. *(Step 2: weak entity; the composite partial key is mapped as its parts.)*
7. PORT_VISIT(**Sname, Pname, Start_date**, End_date): Sname → SHIP, Pname → PORT. *(Step 2: weak entity with two owners. The key is both owner keys plus the partial key.)*

**Schema diagram** (tap to enlarge).

[![SHIP_TRACKING relational schema](fig/dna-94-ship-schema.svg)](../../assets/fig/dna-94-ship-schema.svg)

**Final answer.** The seven relations above. A ship cannot be at two ports at once, so (Sname, Start_date) is also unique in PORT_VISIT. That is a semantic constraint worth stating.

### Problem 6 [Mapping · Application · 6 pts · Elmasri 9.5]

Map the BANK ER schema (Elmasri Figure 3.22, called 3.21 in the exercise) to relations, with all primary and foreign keys. (The exercise also asks for the AIRLINE schema and the other schemas of 3.16–3.24.)

*Solution.*

**The schema.**
1. BANK (**Code**, Name, Addr).
2. BANK_BRANCH, weak with owner BANK through BRANCHES (1:N): partial key Branch_no; attribute Addr.
3. ACCOUNT (**Acct_no**, Balance, Type), linked to a branch through ACCTS (1:N).
4. LOAN (**Loan_no**, Amount, Type), linked to a branch through LOANS (1:N).
5. CUSTOMER (**Ssn**, Name, Phone, Addr).
6. A_C: ACCOUNT M:N CUSTOMER. L_C: LOAN M:N CUSTOMER.

**Assumptions.**
1. Every account and every loan belongs to one branch. *(Reason: total participation of ACCOUNT in ACCTS and LOAN in LOANS, as in the figure.)*
2. Every account and loan has at least one customer, which cannot be enforced by keys. *(Reason: an account with no holder is meaningless.)*

**Relational schema.**
1. BANK(**Code**, Name, Addr).
2. BANK_BRANCH(**Bank_code, Branch_no**, Addr): Bank_code → BANK, ON DELETE CASCADE. *(Step 2.)*
3. ACCOUNT(**Acct_no**, Balance, Type, Bank_code, Branch_no): (Bank_code, Branch_no) → BANK_BRANCH, NOT NULL. *(Step 4. The FK is composite, because the branch's key is composite.)*
4. LOAN(**Loan_no**, Amount, Type, Bank_code, Branch_no): (Bank_code, Branch_no) → BANK_BRANCH, NOT NULL. *(Step 4.)*
5. CUSTOMER(**Ssn**, Name, Phone, Addr).
6. A_C(**Ssn, Acct_no**): Ssn → CUSTOMER, Acct_no → ACCOUNT. *(Step 5.)*
7. L_C(**Ssn, Loan_no**): Ssn → CUSTOMER, Loan_no → LOAN. *(Step 5.)*

**Schema diagram** (tap to enlarge).

[![BANK relational schema](fig/dna-95-bank-schema.svg)](../../assets/fig/dna-95-bank-schema.svg)

**The AIRLINE schema.** Mapping the AIRLINE ER diagram gives exactly the relational schema of Elmasri Figure 5.8. Its foreign keys are listed in the Chapter 1 Practice page (Elmasri 5.12 (d)), and its DDL is Problem 6.6 on the SQL Practice page.

> **Examiner's note.** A foreign key that points to only *part* of BANK_BRANCH's key, such as just Branch_no, is a major error in the A3 rubric ("FK to part of a key").

### Problem 7 [Mapping · Application · 12 pts · Elmasri 9.6]

Map the EER diagrams of Figures 4.9 (UNIVERSITY) and 4.12 (SMALL_AIRPORT) to relations. Justify the mapping options.

*Solution.*

**Figure 4.12, SMALL_AIRPORT.**

*Schema read from the figure.*
1. Entity types:
   1. PLANE_TYPE (**Model**, Capacity, Weight).
   2. AIRPLANE (**Reg#**).
   3. HANGAR (**Number**, Location, Capacity).
   4. PERSON (**Ssn**, Name, Address, Phone).
   5. CORPORATION (**Name**, Address, Phone).
   6. OWNER, a category: PERSON ∪ CORPORATION.
   7. EMPLOYEE (Salary, Shift) and PILOT (Lic_num, Restr), subclasses of PERSON.
   8. SERVICE, weak with owner AIRPLANE through PLANE_SERVICE: partial key (Date, Workcode); attribute Hours.
2. Relationships:
   1. OF_TYPE: AIRPLANE N:1 PLANE_TYPE.
   2. STORED_IN: AIRPLANE N:1 HANGAR.
   3. OWNS: OWNER M:N AIRPLANE, with Pdate.
   4. WORKS_ON: EMPLOYEE M:N PLANE_TYPE.
   5. FLIES: PILOT M:N PLANE_TYPE.
   6. MAINTAIN: EMPLOYEE M:N SERVICE.

*Assumptions.*
1. A person can be both an employee and a pilot, or neither (only an owner). So PERSON → {EMPLOYEE, PILOT} is **overlapping and partial**. *(Reason: pilots who are not airport staff own planes, and some staff are pilots.)*
2. The category's superclasses have different keys (Ssn and Name). *(Reason: as in the figure.)*

*Relations.*
1. PLANE_TYPE(**Model**, Capacity, Weight).
2. HANGAR(**Number**, Location, Capacity).
3. AIRPLANE(**Reg#**, Model, Hangar_no): Model → PLANE_TYPE, NOT NULL; Hangar_no → HANGAR, NOT NULL.
4. OWNER(**Owner_id**): a surrogate key for the category. *(Step 9: the superclasses have different keys.)*
5. PERSON(**Ssn**, Name, Address, Phone, Owner_id): Owner_id → OWNER, UNIQUE, NULL allowed.
6. CORPORATION(**Name**, Address, Phone, Owner_id): Owner_id → OWNER, UNIQUE, NULL allowed.
7. OWNS(**Owner_id, Reg#**, Pdate): Owner_id → OWNER, Reg# → AIRPLANE.
8. EMPLOYEE(**Ssn**, Salary, Shift): Ssn → PERSON. *(Option 8A.)*
9. PILOT(**Ssn**, Lic_num, Restr): Ssn → PERSON. *(Option 8A.)*
10. WORKS_ON(**Ssn, Model**): Ssn → EMPLOYEE, Model → PLANE_TYPE.
11. FLIES(**Ssn, Model**): Ssn → PILOT, Model → PLANE_TYPE.
12. SERVICE(**Reg#, Date, Workcode**, Hours): Reg# → AIRPLANE, ON DELETE CASCADE. *(Step 2.)*
13. MAINTAIN(**Ssn, Reg#, Date, Workcode**): Ssn → EMPLOYEE; (Reg#, Date, Workcode) → SERVICE.

**Schema diagram** (tap to enlarge).

[![SMALL_AIRPORT relational schema](fig/dna-96-airport-schema.svg)](../../assets/fig/dna-96-airport-schema.svg)

*Why 8A.*
1. The specialization is partial, so 8B is invalid.
2. It is overlapping, so 8C is invalid.
3. 8D would work, but EMPLOYEE and PILOT each take part in their own M:N relationships. Those relationships need a relation to reference, which 8A provides directly.

**Figure 4.9, UNIVERSITY.**

*Schema read from the figure.*
1. PERSON (**Ssn**, Name(Fname, Minit, Lname), Bdate, Sex, Address(No, Street, Apt_no, City, State, Zip)) is specialized, **disjoint**, into FACULTY (Rank, Foffice, Fphone, Salary) and STUDENT (Class).
2. GRAD_STUDENT is a subclass of STUDENT with defining predicate Class = 5, and has {Degrees(College, Degree, Year)}.
3. INSTRUCTOR_RESEARCHER is a category: FACULTY ∪ GRAD_STUDENT.
4. Other entity types: GRANT (**No**, Title, Agency, St_date); DEPARTMENT (**Dname**, Dphone, Office); COLLEGE (**Cname**, Coffice, Dean); COURSE (**C#**, Cname, Cdesc); SECTION (**Sec#**, Year, Qtr).
5. CURRENT_SECTION is a predicate-defined subclass of SECTION (Qtr = Current_qtr and Year = Current_year).
6. Relationships:

| Relationship | Type | Attributes |
| --- | --- | --- |
| ADVISOR | FACULTY 1:N GRAD_STUDENT | |
| COMMITTEE | FACULTY M:N GRAD_STUDENT | |
| PI | FACULTY 1:N GRANT | |
| SUPPORT | GRANT M:N INSTRUCTOR_RESEARCHER | Start, End, Time |
| BELONGS | FACULTY M:N DEPARTMENT | |
| CHAIRS | FACULTY 1:1 DEPARTMENT | |
| CD | COLLEGE 1:N DEPARTMENT | |
| DC | DEPARTMENT 1:N COURSE | |
| CS | COURSE 1:N SECTION | |
| TEACH | INSTRUCTOR_RESEARCHER 1:N SECTION | |
| MAJOR, MINOR | STUDENT N:1 DEPARTMENT | |
| TRANSCRIPT | STUDENT M:N SECTION | Grade |
| REGISTERED | STUDENT M:N CURRENT_SECTION | |

*Assumptions.*
1. Sec# is unique across all sections. *(Reason: it is the only underlined attribute of SECTION.)*
2. PERSON → {FACULTY, STUDENT} is partial, because staff and alumni exist. *(Reason: single line from PERSON in the figure.)*
3. A student has one major and at most one minor. *(Reason: MAJOR and MINOR are N:1.)*
4. A support period is identified by its start date. *(Reason: the same person can be supported by the same grant more than once.)*

*Relations.*
1. PERSON(**Ssn**, Fname, Minit, Lname, Bdate, Sex, No, Street, Apt_no, City, State, Zip). Composite attributes become their parts. *(Step 1.)*
2. FACULTY(**Ssn**, Rank, Foffice, Fphone, Salary): Ssn → PERSON. *(8A.)*
3. STUDENT(**Ssn**, Class, Major_dept, Minor_dept): Ssn → PERSON; Major_dept → DEPARTMENT, NOT NULL; Minor_dept → DEPARTMENT, NULL allowed. *(8A, and step 4 for MAJOR and MINOR.)*
4. GRAD_STUDENT(**Ssn**, Advisor_ssn): Ssn → STUDENT; Advisor_ssn → FACULTY. *(8A, so that GRAD_STUDENT can take part in ADVISOR, COMMITTEE and the category.)*
5. DEGREES(**Ssn, College, Degree**, Year): Ssn → GRAD_STUDENT. *(Step 6, multivalued.)*
6. COMMITTEE(**Faculty_ssn, Grad_ssn**): Faculty_ssn → FACULTY, Grad_ssn → GRAD_STUDENT.
7. INSTRUCTOR_RESEARCHER(**Ssn**): Ssn → PERSON. *(Step 9: both superclasses have the key Ssn, so no surrogate is needed.)*
8. GRANT(**No**, Title, Agency, St_date, PI_ssn): PI_ssn → FACULTY, NOT NULL.
9. SUPPORT(**Grant_no, IR_ssn, Start**, End, Time): Grant_no → GRANT, IR_ssn → INSTRUCTOR_RESEARCHER.
10. COLLEGE(**Cname**, Coffice, Dean).
11. DEPARTMENT(**Dname**, Dphone, Office, Cname, Chair_ssn): Cname → COLLEGE, NOT NULL; Chair_ssn → FACULTY, UNIQUE.
12. BELONGS(**Faculty_ssn, Dname**).
13. COURSE(**C#**, Cname, Cdesc, Dname): Dname → DEPARTMENT, NOT NULL.
14. SECTION(**Sec#**, Year, Qtr, C#, Instructor_ssn): C# → COURSE, NOT NULL; Instructor_ssn → INSTRUCTOR_RESEARCHER.
15. TRANSCRIPT(**Ssn, Sec#**, Grade): Ssn → STUDENT, Sec# → SECTION.
16. REGISTERED(**Ssn, Sec#**): Ssn → STUDENT, Sec# → SECTION.

**Schema diagram** (tap to enlarge).

[![UNIVERSITY EER relational schema](fig/dna-96-university-schema.svg)](../../assets/fig/dna-96-university-schema.svg)

*Justification.*
1. **8A for PERSON**: the specialization is partial, so 8B is invalid. Each subclass has its own relationships.
2. **8A for GRAD_STUDENT**: it has relationships of its own (ADVISOR, COMMITTEE and the category), which need a relation to reference. Its defining predicate (Class = 5) should be checked: Ssn in GRAD_STUDENT only if STUDENT.Class = 5.
3. **CURRENT_SECTION gets no relation**: it has no attributes of its own and is defined by a predicate on SECTION. REGISTERED references SECTION, and a trigger or check enforces that the section is current.

> **Examiner's note.** Both diagrams test the same three decisions: which 8A–8D option is valid for each specialization, how to map a category (a surrogate when the superclass keys differ, as in 4.12; not needed when they agree, as in 4.9), and what to do with a predicate-defined subclass.

### Problem 8 [Mapping · Concept · 4 pts · Elmasri 9.7]

Can a binary M:N relationship type be mapped without a new relation? Why or why not?

*Solution.*

**Answer.** **No**, not in a relational schema in first normal form.
1. Suppose the foreign key is put in one participant, say a Pno column in EMPLOYEE for WORKS_ON.
   1. An employee works on several projects, so the column would need a **set of values**. That violates 1NF, where every value is atomic.
   2. Alternatively, the employee's tuple would be **repeated** once per project. Then Ssn is no longer a key, and all of the employee's other attributes are stored redundantly, which brings update anomalies.
2. The same happens on the other side, because a project has several employees.
3. Only a separate relation, whose key is the pair of foreign keys, stores each (employee, project) pair once, together with relationship attributes such as Hours, which depend on the pair.

**Final answer.** No. Each side has many partners, so storing the relationship in either participant needs a multivalued attribute (not allowed in 1NF) or duplicated tuples (breaking the key). A new relation is required. Only in a non-1NF model (object or multivalued attributes) can it be avoided.

### Problem 9 [Mapping · Application · 8 pts · Elmasri 9.8]

Car dealer EER (Figure 9.9): VEHICLE(Vin, Price, Model) specialized (d) into CAR(Engine_size), TRUCK(Tonnage), SUV(No_seats); SALE relates VEHICLE (N), SALESPERSON(Sid, Name) (1) and CUSTOMER(Ssn, Name, Address(Street, City, State)) (1), with attribute Date. Map the schema, and show the VEHICLE design under each of the four options 8A–8D.

*Solution.*

**Assumptions.**
1. Every vehicle is exactly one of car, truck or SUV, so the specialization is **disjoint and total**. *(Reason: the "d" in the figure; total is assumed for a dealer's stock.)* If it is partial, 8B becomes invalid.
2. A vehicle is sold at most once. *(Reason: the 1 on SALESPERSON and CUSTOMER means one salesperson and one customer per vehicle sale.)* So Vin identifies a sale.

**The rest of the schema.**
1. SALESPERSON(**Sid**, Name).
2. CUSTOMER(**Ssn**, Name, Street, City, State). The composite Address becomes its parts.
3. SALE(**Vin**, Sid, Ssn, Date): Vin → VEHICLE (or the vehicle relations under 8B); Sid → SALESPERSON, NOT NULL; Ssn → CUSTOMER, NOT NULL.
4. SALE is ternary (step 7), but the 1s reduce its key to Vin alone.

**VEHICLE under the four options.**

| Option | Relations | Comment |
| --- | --- | --- |
| **8A** (super + sub relations) | VEHICLE(**Vin**, Price, Model); CAR(**Vin**, Engine_size); TRUCK(**Vin**, Tonnage); SUV(**Vin**, No_seats); each sub Vin → VEHICLE | Always valid. Queries on all vehicles read one table; subclass attributes need a join |
| **8B** (sub relations only) | CAR(**Vin**, Price, Model, Engine_size); TRUCK(**Vin**, Price, Model, Tonnage); SUV(**Vin**, Price, Model, No_seats) | Valid only because the specialization is total (and best if disjoint). SALE.Vin can no longer have one foreign key, because it would reference three tables |
| **8C** (one relation, one type attribute) | VEHICLE(**Vin**, Price, Model, Vehicle_type, Engine_size, Tonnage, No_seats) | Valid because the specialization is disjoint. Two of the three subclass columns are NULL in every row |
| **8D** (one relation, Boolean flags) | VEHICLE(**Vin**, Price, Model, Is_car, Is_truck, Is_suv, Engine_size, Tonnage, No_seats) | Valid, but meant for overlapping specializations. Here a CHECK that exactly one flag is true is needed |

**Schema diagrams** (tap to enlarge).

[![VEHICLE under 8A to 8D](fig/dna-98-dealer-schema.svg)](../../assets/fig/dna-98-dealer-schema.svg)

**Choice.** **8C**. There are few subclass attributes (one each), the specialization is disjoint, and SALE keeps a single foreign key to VEHICLE. 8A is the best choice if subclasses gain more attributes or their own relationships.

> **Examiner's note.** The common errors are presenting 8B as valid with no mention of totality, and missing that 8B breaks the SALE foreign key.

## C. Extra drills and last year's style

### Problem 10 [Mapping · Application · 8 pts · Elmasri Fig 9.1 / 9.2]

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

**Schema diagram** (tap to enlarge).

[![COMPANY relational schema](fig/dna-p10-company-schema.svg)](../../assets/fig/dna-p10-company-schema.svg)

**Explanation.**
1. WORKS_FOR (1:N, total on EMPLOYEE) gives the NOT NULL foreign key Dno in EMPLOYEE.
2. SUPERVISION (recursive 1:N) gives Super_ssn in EMPLOYEE; it may be NULL because the top employee has no supervisor.
3. MANAGES (1:1, total on DEPARTMENT) gives Mgr_ssn in DEPARTMENT, NOT NULL and UNIQUE; its attribute Start_date goes with the foreign key.
4. CONTROLS (1:N, total on PROJECT) gives Dnum in PROJECT.
5. WORKS_ON (M:N) becomes its own relation with Hours.
6. Locations (multivalued) becomes DEPT_LOCATIONS; DEPENDENT (weak) takes the owner key.

**Final answer.** The six relations above. Because EMPLOYEE.Dno and DEPARTMENT.Mgr_ssn reference each other, one of the two foreign keys must be added after both tables exist (ALTER TABLE) or checked at commit time.

### Problem 11 [Mapping · Concept · 4 pts]

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

### Problem 12 [Mapping · Application · 4 pts]

Map the ternary SUPPLY(SUPPLIER(Sname), PART(Part_no), PROJECT(Proj_name)) with attribute Quantity. What changes if each (project, part) pair has at most one supplier?

*Solution.*

**Assumption.** SUPPLIER, PART and PROJECT are identified by Sname, Part_no and Proj_name. *(Reason: given.)*

**Working.**
1. An n-ary relationship becomes a new relation that holds the primary keys of all participants as foreign keys, plus its own attributes.
2. In general no participant is determined by the others, so the primary key is the combination of all three foreign keys.
3. If each (project, part) pair has at most one supplier, then (Part_no, Proj_name) → Sname. The key shrinks to (Part_no, Proj_name), and Sname becomes a non-key foreign key.

**Final answer.** SUPPLY(**Sname, Part_no, Proj_name**, Quantity), with three foreign keys. Under the extra constraint: SUPPLY(Sname, **Part_no, Proj_name**, Quantity).

### Problem 13 [Mapping · Concept · 3 pts]

Map the category OWNER = PERSON ∪ BANK ∪ COMPANY, where PERSON has key Ssn, BANK has key Bname, COMPANY has key Cname, and OWNER owns REGISTERED_VEHICLE (1:N).

*Solution.*

**Assumption.** An owner may own several vehicles and a vehicle has one owner. *(Reason: OWNS is given as 1:N.)*

**Working.**
1. The superclasses PERSON, BANK and COMPANY have **different keys** (Ssn, Bname, Cname), so no existing key can identify an owner.
2. Therefore a **surrogate key** Owner_id is introduced in the category relation OWNER.
3. Owner_id is added as a foreign key (UNIQUE, NULL allowed) to each superclass relation, linking each person, bank or company that is an owner to its OWNER tuple.
4. The 1:N ownership relationship is mapped by placing Owner_id as a foreign key in the vehicle relation.

**Final answer.** OWNER(**Owner_id**); PERSON(**Ssn**, …, Owner_id), BANK(**Bname**, …, Owner_id), COMPANY(**Cname**, …, Owner_id), each Owner_id → OWNER; REGISTERED_VEHICLE(**Vehicle_id**, …, Owner_id → OWNER).

### Problem 14 [Mapping · Concept · 3 pts · past-paper style]

Why can a 1:N relationship's foreign key not go on the 1 side? Why must an M:N relationship get its own relation?

*Solution.*

**Answer.**
1. Every attribute value in a relation must be atomic (first normal form), so a column can hold only one value per row.
2. In a 1:N relationship such as WORKS_FOR, each employee is related to exactly one department. A foreign key Dno in EMPLOYEE therefore holds one value per row, as required. On the 1 side, a department row would need to hold *all* its employees' Ssns in one column, which is a multivalued attribute and is not allowed.
3. In an M:N relationship both sides have many partners, so neither relation can hold the foreign key. A separate relation with one row per related pair is the only atomic representation, and its primary key must be the pair, because neither participant's key is unique in it.

**Final answer.** The foreign key goes on the N side because only there it is single-valued; an M:N relationship needs its own relation because neither side can hold a single-valued foreign key.

