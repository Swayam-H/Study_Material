# Learn: ER and EER modelling

The ER model describes a mini-world as **entities**, their **attributes**, and the **relationships** between them, with **constraints** on how often things take part. The EER (enhanced ER) model adds **subclasses**, **superclasses** and **categories**. In this course you are asked to *draw* an EER diagram from a page of requirements (Assignment 2), to *read* one and map it to tables (Assignment 3), and to justify every (min, max) you write. Sources: Elmasri and Navathe 7e ch 3 (3.1–3.7, 3.9) and ch 4 (4.1–4.5); Assignment 2 (IA2: television shows; GA2: an EER model of the EER model itself) with Kamal's rubric; M23 endsem Q7 (ternary relationship constraints); M24 Quiz 2 Q3 (reverse engineering).

> **Study path.** Learn the notation table first; most lost marks in Assignment 2 were notation (weak entity not double-boxed, partial key not dashed, missing (min, max)). Then work through the TV show model in *Practice*: it is the individual paper's domain and also the input to Assignment 3.

## Entities and attributes

An **entity** is a thing with independent existence (a person, a car, a course, a job). An **entity type** is the set of entities with the same attributes (EMPLOYEE); its current members are the **entity set**. In a diagram an entity type is a **rectangle**.

Attributes are **ovals** joined to their entity type. Each attribute is classified three ways:

- **Simple** (atomic) or **composite**: Address = (Street, City, Country) is composite; draw the component ovals hanging off the Address oval. Keep composites when users sometimes need the whole, sometimes the parts.
- **Single-valued** or **multivalued**: Genre of a TV show can have several values; draw a **double oval**.
- **Stored** or **derived**: Age is derivable from Birth_date, No_of_Seasons from counting seasons; draw a **dashed oval**.

**NULL** applies when a value is unknown or does not apply (Apartment_no for a house).

A **key attribute** has a distinct value for every entity; underline it. A composite key (Title, Year) is drawn as one composite attribute with the whole thing underlined, or as two underlined attributes with a stated assumption. An entity type may have several keys (Vehicle_id and Registration). An entity type with no key of its own is **weak** (below).

## Relationships

A **relationship type** R among entity types E1, …, En is a set of associations among their entities; draw a **diamond** joined to each participant. The number of participating entity types is the **degree**: binary (2), ternary (3). A relationship of an entity type with itself is **recursive**; each line then has a **role name** (SUPERVISION: supervisor, supervisee).

Relationships can have their own attributes. Hours belongs to WORKS_ON (the hours *this employee* works on *this project*), not to EMPLOYEE or PROJECT. Role belongs to APPEARS_IN in the TV show model.

## Structural constraints: two notations

**Cardinality ratio** (for binary relationships): 1:1, 1:N, N:1, M:N, written on the lines. **Participation**: **total** (every entity must take part; **double line**; existence dependency) or **partial** (single line).

**(min, max) notation** replaces both. A pair (min, max) is written on the line between entity type E and relationship R, and it means: **each entity of E takes part in at least min and at most max relationship instances of R**. min = 0 means partial participation, min ≥ 1 means total; max = 1 or N.

The two notations are written at *opposite* ends. In 1:N WORKS_FOR between DEPARTMENT (1) and EMPLOYEE (N), the "N" is written next to EMPLOYEE; but in (min, max) each employee works for exactly one department, so (1,1) goes next to EMPLOYEE, and each department has one or more employees, so (1,N) goes next to DEPARTMENT. Kamal's rubric accepts either side **as long as you use one convention consistently** — state it.

**How to choose (min, max).** Read each requirement as a sentence about *one* entity: "each television show is associated with a production company" → each show takes part in exactly one PRODUCES → (1,1) beside TV_SHOW. "A production company produces one or more shows" → (1,N) beside PRODUCTION_COMPANY. If the text says nothing, min = 0 is the safe default and you should state the assumption.

## Weak entity types

A **weak entity type** has no key of its own; it is identified by being related to an **owner** (identifying) entity type through an **identifying relationship**. Notation: **double rectangle** for the weak entity, **double diamond** for the identifying relationship, and its **partial key** underlined with a **dashed** line. The weak entity always has **total participation** in the identifying relationship: (1,1) on the weak side. The owner side is (0,N) or (1,N).

Examples: DEPENDENT owned by EMPLOYEE (partial key Dependent_name); SEASON owned by TV_SHOW (partial key Season_No); EPISODE owned by SEASON, a weak entity owned by another weak entity (partial key Episode_No). The full identifier of an episode is (Title, Year, Season_No, Episode_No).

When is something weak rather than strong with a composite key? When its identity genuinely depends on the owner (episode 3 means nothing without the season), and when deleting the owner should delete it.

## Higher-degree relationships

A **ternary** relationship TEACHES(PROFESSOR, COURSE, STUDENT) records *triples*: this professor teaches this course to this student. It is **not** equivalent to three binary relationships: the binaries can say "P teaches C", "S takes C" and "P teaches S" without saying that P taught C *to* S. Use a ternary when the fact really is about all three at once.

For (min, max) on a ternary, read each line as "each entity of this type appears in at least min and at most max **triples**". That is the M23 endsem Q7 trap: "a course is taught by at most 2 professors to at most 100 students" bounds the triples a course can be in by 2 × 100 = 200, so COURSE gets (1, 200), not (1, 2).

## The EER extensions

**Subclass / superclass.** A subclass (DIRECTOR) is a subset of a superclass (PERSON) and **inherits** all its attributes and relationships; it may add its own (No_Episodes_Directed) and take part in its own relationships (DIRECTS). An entity in a subclass is the *same* real-world entity as in the superclass, in a specific role.

**Specialization** is top-down (start with PERSON, define ACTOR and DIRECTOR). **Generalization** is bottom-up (start with CAR and TRUCK, notice shared attributes, introduce VEHICLE). The diagram is the same: superclass joined by a line to a **circle**, the circle joined to each subclass by a line with a **subset symbol (⊂)**. Kamal's rubric calls the circle a "triangle"; any clear hierarchy symbol was accepted.

Two independent constraints on a specialization:

- **Disjointness**: **d** in the circle if an entity can be in at most one subclass; **o** (overlapping) if it can be in several. Test: "can one entity belong to two subclasses at once?" A person who acts and directs (the IA2 requirement says a director may also act) forces **o**.
- **Completeness**: **total** (double line from superclass to circle: every superclass entity is in some subclass) or **partial** (single line).

That gives four combinations: disjoint–total, disjoint–partial, overlapping–total, overlapping–partial.

**Predicate-defined** (condition-defined) subclasses: membership is decided by a condition on a superclass attribute (Job_type = 'Engineer'); write the condition on the line. If all subclasses use the same attribute, the specialization is **attribute-defined** (write the attribute name beside the circle). Otherwise it is **user-defined**.

**Hierarchies and lattices.** In a hierarchy every subclass has one superclass. In a **lattice** a subclass can have several superclasses (shared subclass, multiple inheritance): ENGINEERING_MANAGER is both an ENGINEER and a MANAGER, and must be in *all* of them.

**Categories (union types).** A category OWNER is a subclass of the **union** of *different* superclasses (PERSON, BANK, COMPANY): an owner is one of them. Notation: the circle contains **∪**. Unlike a shared subclass, a category member is in **one** of its superclasses, not all. Categories can be total or partial.

## How to build a model from requirements (and how it is graded)

1. Underline the **nouns** with independent existence: candidate entity types. Nouns that only describe something are attributes.
2. Find each entity's **key**. No key of its own and identified through another entity → weak entity.
3. Mark **multivalued**, **composite** and **derived** attributes.
4. Turn **verbs** linking entities into relationships. Check degree: does the fact need all three?
5. Put a **(min, max)** on every line, justified by a sentence of the requirements or a stated assumption.
6. Look for "is a", "may also", "types of": specialization; choose d/o and total/partial with a reason.
7. Write your **assumptions**. GA2's rubric made "at least one assumption" part of grade B, and IA2 and GA2 both said "no clarifications".

GA2 rubric in one line: **A** needs a hierarchy, a correct weak entity, (min, max) on every line and sensible d/o, with no major mistake and at most two minor ones. **Major mistakes**: a strong entity with no key, a weak entity with no partial key, a missing or malformed (min, max) (1:N instead of a pair), a min > max, a weak entity with min 0 on its identifying relationship, a dangling line. **Minor mistakes**: no multivalued or composite attribute anywhere, notation slips (weak not double-boxed, partial key not dashed, derived not dashed), no assumptions.

# Reference: ER and EER modelling

## Notation (Elmasri Fig 3.14, Fig 4.1)

| Construct | Symbol |
| --- | --- |
| Entity type | Rectangle |
| Weak entity type | Double rectangle |
| Relationship type | Diamond |
| Identifying relationship | Double diamond |
| Attribute | Oval |
| Key attribute | Oval, name underlined |
| Partial key | Oval, name underlined with a dashed line |
| Multivalued attribute | Double oval |
| Composite attribute | Oval with component ovals attached |
| Derived attribute | Dashed oval |
| Total participation | Double line (existence dependency) |
| Cardinality ratio | 1, N, M on the lines |
| (min, max) | Pair on each line next to the entity it describes |
| Role name | Label on a line of a recursive relationship |
| Specialization | Superclass — circle — subclasses (⊂ on the subclass lines) |
| Disjoint / overlapping | **d** / **o** in the circle |
| Total / partial specialization | Double / single line from superclass to circle |
| Category (union type) | Circle with **∪** |

## Constraint vocabulary (Elmasri 3.4, 4.3)

- Cardinality ratio: max participation. Participation: min (0 partial, ≥ 1 total).
- (min, max) on entity E for relationship R: E's entities appear in ≥ min, ≤ max instances of R. 0 ≤ min ≤ max, max ≥ 1.
- Weak entity: (1,1) on its side of the identifying relationship.
- Specialization: disjoint vs overlapping; total vs partial; predicate-defined vs user-defined; attribute-defined.
- Shared subclass (lattice): member of all its superclasses. Category: member of one of its superclasses.

## Design choices (Elmasri 3.7.3)

- A concept referenced by several entity types and with its own attributes → entity type, not attribute.
- An attribute that is a key of another entity type → relationship.
- A relationship with only (1,1) and no attributes of its own might be merged; usually keep it.
- Ternary vs binaries: ternary when the fact needs all three at once; binaries cannot recover it.

## What to be able to do without notes

- Draw any construct in the table correctly.
- Turn a page of requirements into a full EER diagram, with every (min, max) justified.
- Decide strong vs weak, attribute vs entity, binary vs ternary, d vs o, total vs partial, and say why.
- Compute (min, max) for a ternary from per-pair limits.
- Reverse-engineer an EER diagram from a relational schema.

# Practice: ER and EER modelling

## A. Assignment 2 (this year)

### Problem 1 [EER · Application · 10 pts · Assignment 2 individual (IA2)]

Television show database. (a) A show is identified by title and year of release, has one or more seasons, each with episodes of a given duration in minutes. Each show is associated with a production company and classified under one or more genres. Each episode is directed by one or more directors and features one or more actors; a plot outline is recorded for every episode. (b) Each actor is identified by name and date of birth and appears in one or more shows; for every episode in which an actor appears, the role is recorded. (c) Each director is identified by name and date of birth and directs one or more episodes; a director may also act, even in an episode they direct. (d) Each production company is identified by name, has an address, and produces one or more shows. Draw the EER model with (min, max) everywhere.

*Solution.* **Entity types.**
- PRODUCTION_COMPANY: key Name; composite Address (Street, City, Country).
- TV_SHOW: key (Title, Year); multivalued Genre; derived No_of_Seasons.
- SEASON (weak, owner TV_SHOW): partial key Season_No; derived No_of_Episodes.
- EPISODE (weak, owner SEASON): partial key Episode_No; Duration_Min; Plot_Outline.
- PERSON: key (Name, DOB). Subclasses ACTOR (derived No_of_Shows) and DIRECTOR (derived No_Episodes_Directed).

**Relationships with (min, max)** (pair written beside the entity it describes):

| Relationship | Side 1 | Side 2 | Attribute |
| --- | --- | --- | --- |
| PRODUCES | PRODUCTION_COMPANY (1,N) | TV_SHOW (1,1) | — |
| HAS_SEASON (identifying) | TV_SHOW (1,N) | SEASON (1,1) | — |
| HAS_EPISODE (identifying) | SEASON (1,N) | EPISODE (1,1) | — |
| DIRECTS | DIRECTOR (1,N) | EPISODE (1,N) | — |
| APPEARS_IN | ACTOR (1,N) | EPISODE (1,N) | Role |

**Specialization.** PERSON → {ACTOR, DIRECTOR}, **overlapping (o)**, because requirement (c) says a director may also act. Total or partial: total if every person in the database is an actor or a director (they only enter the database in one of those roles) — state it.

**Why each choice.** Role is on APPEARS_IN because it describes an actor *in an episode*, not the actor or the episode alone. Actors "appear in one or more shows", but roles are per episode, so the relationship is to EPISODE; "appears in one or more shows" then follows from (1,N) on episodes. SEASON and EPISODE are weak: Season 2 or Episode 5 has no meaning without its show or season.

**Assumptions to write.** Season_No unique within a show, Episode_No unique within a season; one role per actor per episode; Genre values are names.

### Problem 2 [EER · Application · 10 pts · Assignment 2 group (GA2)]

Draw an EER model of the EER model itself: entities have attributes (simple or composite, single- or multivalued, stored or derived, may accept NULL); entity types are strong (with a key attribute) or weak (with a partial key, depending on a strong type through an identifying relationship type); relationship types associate entity types and may have attributes; participation and cardinality constraints in (min, max); entity types may have subclasses (specialization), and strong types may be generalized into a superclass.

*Solution.* Outline of the key's model (any equivalent model with stated assumptions earned an A):
- ENTITY (key Entity_id) —(1,N) DESCRIBED_BY (1,N)— ATTRIBUTE (key Attribute_name; attribute Accepts_NULL).
- ATTRIBUTE specialized three times, each **d** and total: {SIMPLE, COMPOSITE}, {SINGLE_VALUED, MULTIVALUED}, {STORED, DERIVED}. COMPOSITE —(2,N) CONSISTS_OF (0,N)— ATTRIBUTE (recursive); derived Component_count. MULTIVALUED has multivalued attribute Value_set.
- ENTITY_TYPE (key Name) —(0,N) HAS_INSTANCES (1,1)— ENTITY; ENTITY_TYPE —(1,N) HAS_ATTRIBUTES (0,N)— ATTRIBUTE.
- ENTITY_TYPE specialized (d, total) into STRONG_ENTITY_TYPE and WEAK_ENTITY_TYPE. STRONG —(1,1) HAS_KEY (0,1)— KEY_ATTRIBUTE; WEAK —(1,1) HAS_PARTIAL_KEY (1,1)— PARTIAL_KEY_ATTRIBUTE; WEAK —(1,1) IDENTIFYING_RELATIONSHIP (0,N)— STRONG.
- RELATIONSHIP_TYPE ternary among ENTITY_TYPE (two roles) and ATTRIBUTE; BINARY_RELATIONSHIP_TYPE; PARTICIPATION_CONSTRAINT and CARDINALITY_CONSTRAINT as attributes with composite (min, max).
- HAS_SUBCLASS (recursive on ENTITY_TYPE: superclass (0,N), subclass (0,1)); GENERALIZATION from (2,N) strong types to one superclass.

The point of the exercise: every concept in Chapter 3–4 shows up as an entity, attribute or relationship, so you must know each definition precisely.

## B. Past papers (other years; style differs)

### Problem 3 [EER · Application · 5 pts · M23 endsem Q7]

TEACHES is a ternary relationship among PROFESSOR, COURSE and STUDENT (which professor teaches which course to which student). A course is taught by at least 1 and at most 2 professors and attended by at least 1 and at most 100 students; a professor teaches no course or at most 3 courses; a student attends no course or at most 6 courses. Give (min, max) for each participant.

*Solution.* Count **triples** each entity can appear in.
- **COURSE (1, 200):** at least one professor and one student → ≥ 1 triple; at most 2 professors × 100 students = 200 triples.
- **PROFESSOR (0, 300):** may teach nothing → 0; at most 3 courses × 100 students each = 300.
- **STUDENT (0, 12):** may attend nothing → 0; at most 6 courses × 2 professors each = 12.

State the assumption that every professor of a course teaches it to every student of that course; then the maxima are reached. The ternary cannot express "each course has ≤ 2 professors" directly; that per-pair limit needs an extra constraint or binaries.

### Problem 4 [EER · Concept · 4 pts]

Explain, with an example, why a ternary relationship is not equivalent to three binary relationships.

*Solution.* SUPPLY(SUPPLIER, PART, PROJECT): "s supplies p to j". Replace it with CAN_SUPPLY(s, p), USES(j, p), SUPPLIES(s, j). With s1 supplying p1 to j2 and s2 supplying p2 to j1, and s1 also supplying p2 to j1… the binaries record (s1, p1), (s1, p2), (j1, p2), (j2, p1), (s1, j1), (s1, j2), from which we cannot tell whether s1 supplies p1 to j1. The ternary keeps exactly which triples happened. Binaries can be added *alongside* a ternary for extra constraints (a supplier may only supply parts it can supply).

### Problem 5 [EER · Concept · 3 pts]

Distinguish total from partial and disjoint from overlapping specialization, with one example of each combination.

*Solution.*
- Disjoint, total: EMPLOYEE → {HOURLY, SALARIED} (every employee is exactly one).
- Disjoint, partial: EMPLOYEE → {SECRETARY, ENGINEER, TECHNICIAN} (some employees are none).
- Overlapping, total: PART → {MANUFACTURED, PURCHASED} (a part can be both, and is at least one).
- Overlapping, partial: PERSON → {ACTOR, DIRECTOR} if the database also holds people who are neither.
Total: double line from the superclass to the circle. Disjoint: **d**; overlapping: **o**.

### Problem 6 [EER · Concept · 3 pts]

What is the difference between a shared subclass and a category?

*Solution.* A **shared subclass** (in a lattice) has several superclasses and each member belongs to **all** of them (ENGINEERING_MANAGER is an ENGINEER and a MANAGER); it inherits from all. A **category** (union type) is a subclass of the **union** of several superclasses, and each member belongs to **one** of them (OWNER is a PERSON or a BANK or a COMPANY); it inherits only from the one it belongs to. A category is drawn with ∪ in the circle.

### Problem 7 [EER · Application · 6 pts · M24 Quiz 2 Q3]

Reverse-engineer an ER diagram from: EMPLOYEE(**Ssn**, Name, Dno), DEPARTMENT(**Dnumber**, Dname, Mgr_ssn), PROJECT(**Pnumber**, Pname, Dnum), WORKS_ON(**Essn, Pno**, Hours), DEPENDENT(**Essn, Dependent_name**, Relationship).

*Solution.* Strong entities EMPLOYEE, DEPARTMENT, PROJECT (each has its own single-attribute key). DEPENDENT is **weak** (its key contains an FK to EMPLOYEE plus a partial key Dependent_name) with identifying relationship DEPENDENTS_OF: EMPLOYEE (0,N), DEPENDENT (1,1). WORKS_ON is an **M:N relationship** (its key is two FKs) with attribute Hours: EMPLOYEE (1,N), PROJECT (1,N) or (0,N) by assumption. EMPLOYEE.Dno → WORKS_FOR, 1:N: EMPLOYEE (1,1), DEPARTMENT (1,N). DEPARTMENT.Mgr_ssn → MANAGES, 1:1: DEPARTMENT (1,1), EMPLOYEE (0,1). PROJECT.Dnum → CONTROLS: PROJECT (1,1), DEPARTMENT (0,N). Rule of thumb: a relation whose key is made of FKs is a relationship; an FK plus a partial key is a weak entity; a lone FK is a 1:N or 1:1 relationship.

### Problem 8 [EER · Application · 6 pts · Elmasri 3.16 style]

A UNIVERSITY database: colleges have departments; departments offer courses with sections; instructors belong to departments, one of whom chairs it; students major in a department and register for sections with a grade. Name the entity types, keys, relationships and (min, max) you would use.

*Solution.* COLLEGE(CName key) —(1,N) HAS (1,1)— DEPT(DCode key); DEPT —(0,N) OFFERS (1,1)— COURSE(CoCode key); COURSE —(0,N) SECS (1,1)— SECTION (weak? only if section numbers repeat per course: then partial key SecNo, owner COURSE); INSTRUCTOR(Id key) —(1,1) EMPLOYS (1,N)— DEPT; INSTRUCTOR —(0,1) CHAIRS (1,1)— DEPT; INSTRUCTOR —(0,N) TEACHES (1,1)— SECTION; STUDENT(Sid key) —(1,1) MAJORS (0,N)— DEPT; STUDENT —(0,N) TAKES (0,N)— SECTION with attribute Grade. Write assumptions for every min you chose (for example, a new department may have no courses yet → (0,N)).
