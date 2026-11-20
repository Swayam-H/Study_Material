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

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

## A. Assignment 2 (this year)

### Problem 1 [EER · Application · 10 pts · Assignment 2 individual (IA2)]

Television show database. (a) A show is identified by title and year of release, has one or more seasons, each with episodes of a given duration in minutes. Each show is associated with a production company and classified under one or more genres. Each episode is directed by one or more directors and features one or more actors; a plot outline is recorded for every episode. (b) Each actor is identified by name and date of birth and appears in one or more shows; for every episode in which an actor appears, the role is recorded. (c) Each director is identified by name and date of birth and directs one or more episodes; a director may also act, even in an episode they direct. (d) Each production company is identified by name, has an address, and produces one or more shows. Draw the EER model with (min, max) everywhere.

*Solution.*

**Assumptions.**
1. Season_No is unique within a show and Episode_No is unique within a season. *(Reason: seasons and episodes are numbered per show and per season, so they cannot be identified on their own.)*
2. An actor plays one role in a given episode. *(Reason: the requirements record "the role", singular.)*
3. Every person stored is an actor or a director. *(Reason: persons enter the database only through these two roles.)*
4. Genre values are plain names. *(Reason: no other genre information is required.)*

**Entity types and attributes.**
1. PRODUCTION_COMPANY: key Name; composite attribute Address(Street, City, Country).
2. TV_SHOW: composite key (Title, Year); multivalued attribute Genre; derived attribute No_of_Seasons.
3. SEASON: **weak** entity type, owner TV_SHOW, partial key Season_No; derived No_of_Episodes.
4. EPISODE: **weak** entity type, owner SEASON, partial key Episode_No; attributes Duration_Min and Plot_Outline.
5. PERSON: composite key (Name, DOB), with subclasses ACTOR (derived No_of_Shows) and DIRECTOR (derived No_Episodes_Directed).

**Relationship types with (min, max).** Each pair is written beside the entity type it constrains.

| Relationship | Participant 1 | Participant 2 | Attribute | Justification |
| --- | --- | --- | --- | --- |
| PRODUCES | PRODUCTION_COMPANY (1,N) | TV_SHOW (1,1) | — | Requirement (a) and (d) |
| HAS_SEASON (identifying) | TV_SHOW (1,N) | SEASON (1,1) | — | A show has one or more seasons |
| HAS_EPISODE (identifying) | SEASON (1,N) | EPISODE (1,1) | — | A season has episodes |
| DIRECTS | DIRECTOR (1,N) | EPISODE (1,N) | — | Requirement (a) and (c) |
| APPEARS_IN | ACTOR (1,N) | EPISODE (1,N) | Role | Requirement (a) and (b) |

**Specialization.** PERSON → {ACTOR, DIRECTOR} is **overlapping (o)**, because requirement (c) states that a director may also act. It is **total** by Assumption 3.

**Justification of the main design choices.**
- SEASON and EPISODE are weak because "Season 2" or "Episode 5" has no meaning without its show or season, and they should be deleted with their owner.
- Role is an attribute of APPEARS_IN, because it describes an actor *in a particular episode*, not the actor alone or the episode alone.
- Actors are related to episodes rather than shows, because roles are recorded per episode; "appears in one or more shows" then follows from (1,N) on episodes.

**Final answer.** The EER diagram contains the five entity types above (two of them weak, with double rectangles, double diamonds and dashed partial keys), the five relationship types with the (min, max) pairs in the table, and an overlapping, total specialization of PERSON.

> **Examiner's note.** Grade A needed: every line carrying a (min, max) pair, both weak entities correctly drawn with partial keys, a sensible d/o choice with a reason, and at least one multivalued and one composite attribute. Major mistakes: a strong entity with no key, a weak entity with no partial key, (1:N) written instead of (min, max), min greater than max.

### Problem 2 [EER · Application · 10 pts · Assignment 2 group (GA2)]

Draw an EER model of the EER model itself: entities have attributes (simple or composite, single- or multivalued, stored or derived, may accept NULL); entity types are strong (with a key attribute) or weak (with a partial key, depending on a strong type through an identifying relationship type); relationship types associate entity types and may have attributes; participation and cardinality constraints in (min, max); entity types may have subclasses (specialization), and strong types may be generalized into a superclass.

*Solution.*

**Assumptions.**
1. Each entity type has a unique name and each attribute has a unique name. *(Reason: names are how the EER model refers to its constructs.)*
2. A strong entity type has exactly one key attribute and a weak entity type exactly one partial key. *(Reason: the requirements speak of "a key attribute" and "a partial key".)*
3. The three attribute classifications are independent of each other. *(Reason: an attribute is simple or composite, and separately single- or multivalued, and separately stored or derived.)*

**Entity types and attributes.**
1. ENTITY (key Entity_id) and ENTITY_TYPE (key Name), related by HAS_INSTANCES: ENTITY_TYPE (0,N), ENTITY (1,1).
2. ATTRIBUTE (key Attribute_name; attribute Accepts_NULL), with three **disjoint, total** specializations: {SIMPLE, COMPOSITE}, {SINGLE_VALUED, MULTIVALUED}, {STORED, DERIVED}. MULTIVALUED has the multivalued attribute Value_set; COMPOSITE has the derived attribute Component_count.
3. ENTITY_TYPE is specialized (**disjoint, total**) into STRONG_ENTITY_TYPE and WEAK_ENTITY_TYPE.
4. KEY_ATTRIBUTE and PARTIAL_KEY_ATTRIBUTE are subclasses of ATTRIBUTE.
5. RELATIONSHIP_TYPE, with BINARY_RELATIONSHIP_TYPE as a subclass; participation and cardinality constraints are modelled with the composite attribute (Min, Max).

**Relationship types with (min, max).**

| Relationship | Participants and (min, max) |
| --- | --- |
| DESCRIBED_BY | ENTITY (1,N), ATTRIBUTE (1,N) |
| HAS_ATTRIBUTES | ENTITY_TYPE (1,N), ATTRIBUTE (0,N) |
| CONSISTS_OF (recursive) | COMPOSITE (2,N) as whole, ATTRIBUTE (0,N) as component |
| HAS_KEY | STRONG_ENTITY_TYPE (1,1), KEY_ATTRIBUTE (0,1) |
| HAS_PARTIAL_KEY | WEAK_ENTITY_TYPE (1,1), PARTIAL_KEY_ATTRIBUTE (1,1) |
| IDENTIFYING_RELATIONSHIP | WEAK_ENTITY_TYPE (1,1), STRONG_ENTITY_TYPE (0,N) |
| RELATIONSHIP_TYPE (ternary) | ENTITY_TYPE in two roles (1,N), ATTRIBUTE (0,N) |
| HAS_SUBCLASS (recursive) | ENTITY_TYPE as superclass (0,N), as subclass (0,1) |
| GENERALIZATION | STRONG_ENTITY_TYPE (2,N), ENTITY_TYPE as superclass (0,1) |

**Justification.** A composite attribute has at least two components, hence (2,N). A weak entity type depends on exactly one owner, hence (1,1) on its side of the identifying relationship. Generalization combines at least two strong entity types, hence (2,N).

**Final answer.** The EER diagram consists of the entity types, specializations and relationship types listed above.

> **Examiner's note.** The key accepted any equivalent model with stated assumptions. What is being tested is that you know every definition of chapters 3 and 4 precisely enough to model it.

## B. Past papers (other years; style differs)

### Problem 3 [EER · Application · 5 pts · M23 endsem Q7]

TEACHES is a ternary relationship among PROFESSOR, COURSE and STUDENT (which professor teaches which course to which student). A course is taught by at least 1 and at most 2 professors and attended by at least 1 and at most 100 students; a professor teaches no course or at most 3 courses; a student attends no course or at most 6 courses. Give (min, max) for each participant.

*Solution.*

**Assumption.** Every professor of a course teaches it to every student of that course. *(Reason: TEACHES records triples; without this assumption the maxima below are upper bounds that may not be reached.)*

**Working.** For a ternary relationship, the (min, max) pair beside an entity type counts the **triples** (professor, course, student) in which one entity of that type appears.
1. **COURSE.** A course has at least one professor and at least one student, so it is in at least $1 \times 1 = 1$ triple. It has at most 2 professors and at most 100 students, so it is in at most $2 \times 100 = 200$ triples.
2. **PROFESSOR.** A professor may teach no course, so the minimum is 0. A professor teaches at most 3 courses, each with at most 100 students, so the maximum is $3 \times 100 = 300$.
3. **STUDENT.** A student may attend no course, so the minimum is 0. A student attends at most 6 courses, each with at most 2 professors, so the maximum is $6 \times 2 = 12$.

**Final answer.** COURSE **(1, 200)**, PROFESSOR **(0, 300)**, STUDENT **(0, 12)**.

> **Examiner's note.** Writing (1, 2) for COURSE confuses the per-pair limit with the triple count. Add that the per-pair limits ("at most 2 professors per course") cannot be expressed by (min, max) on the ternary alone.

### Problem 4 [EER · Concept · 4 pts]

Explain, with an example, why a ternary relationship is not equivalent to three binary relationships.

*Solution.*

**Answer.** A ternary relationship records which combinations of *three* entities occur together. Three binary relationships record only which *pairs* occur, and the triples cannot in general be recovered from the pairs.

**Example.** Let SUPPLY(SUPPLIER, PART, PROJECT) mean "supplier s supplies part p to project j", with the instance {(s1, p1, j2), (s1, p2, j1), (s2, p1, j1)}. Replace it by three binary relationships:
- CAN_SUPPLY(s, p) = {(s1, p1), (s1, p2), (s2, p1)}
- USES(j, p) = {(j2, p1), (j1, p2), (j1, p1)}
- SUPPLIES(s, j) = {(s1, j2), (s1, j1), (s2, j1)}

From these pairs, (s1, p1, j1) looks possible: s1 can supply p1, j1 uses p1, and s1 supplies j1. Yet s1 never supplied p1 to j1. The binaries therefore lose information.

**Final answer.** They are not equivalent: the ternary stores exactly which triples occurred, which the binaries cannot reproduce. Binaries may be kept *in addition* to a ternary to express extra constraints, such as "a supplier may supply only parts it can supply".

### Problem 5 [EER · Concept · 3 pts]

Distinguish total from partial and disjoint from overlapping specialization, with one example of each combination.

*Solution.*

**Definitions.**
1. **Disjoint (d)**: an entity of the superclass belongs to at most one subclass. **Overlapping (o)**: it may belong to several.
2. **Total**: every entity of the superclass belongs to at least one subclass (double line from the superclass to the circle). **Partial**: some entities belong to none (single line).

**Examples of the four combinations.**

| Combination | Example | Reason |
| --- | --- | --- |
| Disjoint, total | EMPLOYEE → {HOURLY, SALARIED} | every employee is paid in exactly one way |
| Disjoint, partial | EMPLOYEE → {SECRETARY, ENGINEER, TECHNICIAN} | some employees have none of these jobs |
| Overlapping, total | PART → {MANUFACTURED, PURCHASED} | a part can be both, and is at least one |
| Overlapping, partial | PERSON → {ACTOR, DIRECTOR} | a person may be both, and the database also holds people who are neither |

### Problem 6 [EER · Concept · 3 pts]

What is the difference between a shared subclass and a category?

*Solution.*

**Answer.**
1. A **shared subclass** has several superclasses and appears in a specialization lattice. Each of its entities belongs to **all** of its superclasses and inherits from all of them. Example: ENGINEERING_MANAGER is a subclass of both ENGINEER and MANAGER.
2. A **category** (union type) is a subclass of the **union** of several superclasses, which usually have different keys. Each of its entities belongs to **exactly one** of the superclasses and inherits only from that one. Example: OWNER = PERSON ∪ BANK ∪ COMPANY. It is drawn with ∪ in the circle.

**Final answer.** A shared subclass is an intersection (member of all superclasses); a category is a union (member of one superclass).

### Problem 7 [EER · Application · 6 pts · M24 Quiz 2 Q3]

Reverse-engineer an ER diagram from: EMPLOYEE(**Ssn**, Name, Dno), DEPARTMENT(**Dnumber**, Dname, Mgr_ssn), PROJECT(**Pnumber**, Pname, Dnum), WORKS_ON(**Essn, Pno**, Hours), DEPENDENT(**Essn, Dependent_name**, Relationship).

*Solution.*

**Assumptions.**
1. Every project has at least one employee working on it. *(Reason: not stated; (0,N) would also be acceptable with the opposite assumption.)*
2. Mgr_ssn is never NULL, so every department has a manager. *(Reason: a department is managed by an employee.)*

**Working.** Each relation is classified by the structure of its key.
1. EMPLOYEE, DEPARTMENT and PROJECT each have a single-attribute key of their own, so they are **strong entity types**.
2. DEPENDENT's key is (Essn, Dependent_name): a foreign key to EMPLOYEE plus a name that is unique only per employee. So DEPENDENT is a **weak entity type** with owner EMPLOYEE, partial key Dependent_name and identifying relationship DEPENDENTS_OF: EMPLOYEE (0,N), DEPENDENT (1,1).
3. WORKS_ON's key consists of two foreign keys, so it is an **M:N relationship** between EMPLOYEE and PROJECT with attribute Hours: EMPLOYEE (1,N), PROJECT (1,N).
4. EMPLOYEE.Dno is a single foreign key, so it is a **1:N relationship** WORKS_FOR: EMPLOYEE (1,1), DEPARTMENT (1,N).
5. DEPARTMENT.Mgr_ssn is a single foreign key, and an employee manages at most one department, so it is a **1:1 relationship** MANAGES: DEPARTMENT (1,1), EMPLOYEE (0,1).
6. PROJECT.Dnum is a single foreign key, giving the **1:N relationship** CONTROLS: PROJECT (1,1), DEPARTMENT (0,N).

**Final answer.** Strong entities EMPLOYEE, DEPARTMENT, PROJECT; weak entity DEPENDENT; relationships DEPENDENTS_OF (identifying), WORKS_ON (M:N, Hours), WORKS_FOR (1:N), MANAGES (1:1), CONTROLS (1:N), with the (min, max) pairs above.

> **Examiner's note.** The rule of thumb: a key made only of foreign keys means a relationship; a foreign key plus a partial key means a weak entity; a lone foreign key means a 1:N or 1:1 relationship.

### Problem 8 [EER · Application · 6 pts · Elmasri 3.16 style]

A UNIVERSITY database: colleges have departments; departments offer courses with sections; instructors belong to departments, one of whom chairs it; students major in a department and register for sections with a grade. Name the entity types, keys, relationships and (min, max) you would use.

*Solution.*

**Assumptions.**
1. Section numbers repeat across courses, so SECTION is weak with owner COURSE. *(Reason: universities number sections 1, 2, … per course.)*
2. A newly created department may have no courses yet. *(Reason: departments are created before their courses.)*
3. Every instructor belongs to exactly one department. *(Reason: given.)*

**Entity types.** COLLEGE (key CName), DEPT (key DCode), COURSE (key CoCode), SECTION (weak, partial key SecNo, owner COURSE), INSTRUCTOR (key Id), STUDENT (key Sid).

**Relationship types with (min, max).**

| Relationship | Participants and (min, max) | Attribute |
| --- | --- | --- |
| HAS | COLLEGE (1,N), DEPT (1,1) | — |
| OFFERS | DEPT (0,N), COURSE (1,1) | — |
| SECS (identifying) | COURSE (0,N), SECTION (1,1) | — |
| EMPLOYS | DEPT (1,N), INSTRUCTOR (1,1) | — |
| CHAIRS | DEPT (1,1), INSTRUCTOR (0,1) | — |
| TEACHES | INSTRUCTOR (0,N), SECTION (1,1) | — |
| MAJORS | STUDENT (1,1), DEPT (0,N) | — |
| TAKES | STUDENT (0,N), SECTION (0,N) | Grade |

**Final answer.** The schema has the six entity types and eight relationship types above. Grade is an attribute of TAKES, because it describes a student in a particular section.

