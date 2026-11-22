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

**Diagram** (tap to enlarge).

[![EER diagram of the TV show database](fig/dna-ia2-tvshow.svg)](../../assets/fig/dna-ia2-tvshow.svg)

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

**Diagram** (tap to enlarge).

[![EER diagram of the EER model itself](fig/dna-ga2-eer-of-eer.svg)](../../assets/fig/dna-ga2-eer-of-eer.svg)

**Final answer.** The EER diagram consists of the entity types, specializations and relationship types listed above.

> **Examiner's note.** The key accepted any equivalent model with stated assumptions. What is being tested is that you know every definition of chapters 3 and 4 precisely enough to model it.

## B. Textbook exercises set by Kamal

In the exam, draw these as diagrams. Here each design is written as lists and tables that you can turn straight into a diagram: entity types with keys (bold), attributes, relationship types with (min, max), and specializations with their constraints.

### Problem 3 [ER · Application · 5 pts · Elmasri 3.16]

In the UNIVERSITY schema of Figure 3.20, which attribute combinations must be unique for each SECTION to enforce: (a) in a given semester and year, only one section can use a classroom at a given DaysTime; (b) in a given semester and year, an instructor teaches only one section at a given DaysTime; (c) in a given semester and year, the section numbers of the same course are all different? Can you think of similar constraints?

*Solution.*

**Assumptions.**
1. SECTION has SecId (the key), SecNo, Sem, Year, CRoom (Bldg, RoomNo) and DaysTime. Its course comes through SECS and its instructor through TEACHES. *(Reason: Figure 3.20.)*
2. DaysTime values are exact slots, so two sections clash only if their DaysTime values are equal. *(Reason: DaysTime is restricted to allowed values such as 'MWF 9am-9.50am'.)*

**Answer.**
1. (a) **{Sem, Year, Bldg, RoomNo, DaysTime}** must be unique.
2. (b) **{Sem, Year, DaysTime, Id of the INSTRUCTOR}** must be unique. The instructor is reached through TEACHES.
3. (c) **{Sem, Year, SecNo, CCode of the COURSE}** must be unique. The course is reached through SECS.

**Why the ER diagram cannot show (b) and (c) as keys.** They include an attribute of a *related* entity, reached through a relationship. ER keys are made of the entity's own attributes. These constraints become ordinary UNIQUE constraints after mapping, when the instructor Id and CCode are foreign-key columns of SECTION.

**Similar constraints.**
1. A student cannot take two sections with the same {Sem, Year, DaysTime}. This is a constraint on TAKES.
2. A section's enrolment cannot exceed the room's capacity.
3. An instructor teaches at most a fixed number of sections per semester.

> **Examiner's note.** (b) has an exception: Elmasri notes it fails if an instructor may teach two combined sections together. Mentioning it shows you read the constraint as a miniworld rule, not a fact.

### Problem 4 [ER · Application · 4 pts · Elmasri 3.17]

Design one attribute of STUDENT for previous college education: one entry per college attended, each with college name, start and end dates, degree entries (degree name, month and year awarded) and transcript entries (course name, semester, year, grade). Use the notation of Figure 3.5.

*Solution.*

**Assumption.** A student may have attended no previous college, and may have no degree or no completed course at a college. *(Reason: "if any" in the question.)* So all three levels are multivalued and may be empty.

**Notation.** In Figure 3.5, { } marks a multivalued attribute and ( ) a composite attribute.

**Answer.**

```
{ PreviousCollege ( CollegeName,
                    StartDate,
                    EndDate,
                    { Degree ( DegreeName, Month, Year ) },
                    { Transcript ( CourseName, Semester, Year, Grade ) } ) }
```

**Diagram** (tap to enlarge).

[![STUDENT with nested composite and multivalued attributes](fig/dna-317-nested-attr.svg)](../../assets/fig/dna-317-nested-attr.svg)

**Explanation.**
1. PreviousCollege is **multivalued**, because a student has one entry per college.
2. Each entry is **composite**: name, two dates and two nested multivalued attributes.
3. Degree and Transcript are themselves multivalued composite attributes, because a college can award several degrees and record many courses.

> **Examiner's note.** Exercise 3.18 asks for the same design with entities. That version, with weak entities PREVIOUS_COLLEGE (owner STUDENT), DEGREE and TRANSCRIPT_ENTRY (owner PREVIOUS_COLLEGE), is the one to prefer when the data is queried. Nesting this deep maps to three extra relations in any case.

### Problem 5 [ER · Application · 8 pts · Elmasri 3.22]

Design an ER schema for a sports league: teams have players, not all of whom play in each game. Track the players who take part in each game for each team, the positions they played, and the game's result. State your assumptions. (Choose a sport.)

*Solution.*

**Assumptions.**
1. Sport: football (soccer). Each game is between exactly two teams, a home team and an away team. *(Reason: this is how league fixtures work.)*
2. A player belongs to one team for the whole season. *(Reason: the requirement does not mention transfers.)* The examiner's note covers the other case.
3. A player may play several positions in one game (moved during the match). *(Reason: "the positions they played".)*
4. The result is the two scores, and the winner is derived from them. *(Reason: storing the winner as well would be redundant.)*

**Entity types.**
1. TEAM: **Team_name**, City, Coach.
2. PLAYER: **Player_id**, Name, Bdate, Shirt_no.
3. GAME: **Game_id**, Date, Venue, Home_score, Away_score, and derived Winner.

**Relationship types.**

| Relationship | Participants and (min, max) | Attributes |
| --- | --- | --- |
| PLAYS_FOR | PLAYER (1,1), TEAM (11,N) | — |
| HOME | GAME (1,1), TEAM (0,N) | — |
| AWAY | GAME (1,1), TEAM (0,N) | — |
| PLAYED_IN | PLAYER (0,N), GAME (22,N) | {Position} (multivalued), Minutes |

**Diagram** (tap to enlarge).

[![ER diagram of the sports database](fig/dna-322-sports.svg)](../../assets/fig/dna-322-sports.svg)

**Explanation.**
1. The team of each player in a game is found through PLAYS_FOR, so PLAYED_IN does not need TEAM as a third participant.
2. GAME takes part in PLAYED_IN at least 22 times, which is 11 players per side.
3. "Not all players participate in each game" is why PLAYED_IN is separate from PLAYS_FOR.
4. HOME and AWAY are two relationships between the same entity types, and the role names tell them apart. A constraint (not shown in ER) says a team cannot play itself.

> **Examiner's note.** If players can change teams during the season, PLAYED_IN must record the team too. Make it ternary (PLAYER, GAME, TEAM), or add a Team role. Either design is right when the assumption is stated.

### Problem 6 [ER · Application · 5 pts · Elmasri 3.26]

SECTION has Section_number, Semester, Year, Course_number, Instructor, Room_no, Building, Weekdays and Hours. Section_number is unique for each course within a semester and year. Identify three composite keys, and show how they can be represented in an ER diagram.

*Solution.*

**Assumptions.**
1. In a semester, a room holds one section in each (Weekdays, Hours) slot. *(Reason: a room cannot host two classes at once.)*
2. In a semester, an instructor teaches one section in each (Weekdays, Hours) slot. *(Reason: an instructor cannot be in two rooms at once.)*
3. Slots do not partly overlap ('MWF' and 'MW' at the same hour are treated as different slots). *(Reason: the domains are lists of fixed values.)*

**Keys.**
1. K1 = **{Course_number, Semester, Year, Section_number}**, from the stated numbering rule.
2. K2 = **{Semester, Year, Building, Room_no, Weekdays, Hours}**, from assumption 1.
3. K3 = **{Semester, Year, Instructor, Weekdays, Hours}**, from assumption 2.

Semester and Year are in all three keys, and Weekdays and Hours in two. Each key is minimal: dropping any attribute allows two sections to share the remaining values.

**ER representation.**
1. Show each key as a **composite attribute** with its own name and underline each one: Sec_key1(Course_number, Semester, Year, Section_number), Sec_key2(Semester, Year, Building, Room_no, Weekdays, Hours), Sec_key3(Semester, Year, Instructor, Weekdays, Hours).
2. ER allows several keys, each underlined, but a simple attribute should belong to one composite attribute. So shared components either appear in several composites, which repeats them, or the extra keys are written as a note beside the diagram.
3. Alternatively, add a surrogate SecId as the single underlined key and list K1–K3 as uniqueness constraints. Elmasri does this in Figure 3.20.

**Diagram** (tap to enlarge).

[![SECTION with its keys](fig/dna-326-section-keys.svg)](../../assets/fig/dna-326-section-keys.svg)

> **Examiner's note.** Assumption 3 matters: if 'MWF 9:00' and 'MW 9:00' count as a clash, no key can express it, and it becomes a semantic constraint (a trigger after mapping).

### Problem 7 [EER · Application · 10 pts · Elmasri 4.16]

Design an EER schema for an application you choose, with at least five entity types, four relationship types, a weak entity type, a superclass/subclass relationship, a category, and an n-ary (n > 2) relationship type. Specify all constraints.

*Solution.*

**Application: a hospital.**

**Assumptions.**
1. People are identified by a hospital ID, and a person can be both staff and a patient. *(Reason: staff are sometimes treated in their own hospital.)*
2. A bill is paid either by an insurance company or by a person. *(Reason: this gives a natural category.)*
3. Beds are numbered within each ward. *(Reason: bed 4 exists in many wards.)*

**Entity types.**
1. PERSON: **Pid**, Name (First, Last), Bdate, {Phone}.
2. DOCTOR, a subclass of PERSON: Speciality, Licence_no.
3. PATIENT, a subclass of PERSON: Blood_group.
4. WARD: **Ward_no**, Name, Floor.
5. BED, weak with owner WARD: partial key **Bed_no**, Type.
6. MEDICINE: **Med_code**, Name, Unit_price.
7. INSURER: **Ins_id**, Name.
8. BILL: **Bill_no**, Amount, Date.
9. PAYER, a category: INSURER ∪ PERSON.

**Specialization.** PERSON → {DOCTOR, PATIENT} is **overlapping** (o) and **partial**, because a person can be both, and a visitor or contact can be neither.

**Category.** PAYER = INSURER ∪ PERSON is **partial**: not every insurer or person pays a bill.

**Relationship types.**

| Relationship | Participants and (min, max) | Attributes |
| --- | --- | --- |
| IN_WARD (identifying) | WARD (1,N), BED (1,1) | — |
| OCCUPIES | PATIENT (0,1), BED (0,1) | Since |
| WORKS_IN | DOCTOR (1,1), WARD (1,N) | — |
| BILLED | PATIENT (0,N), BILL (1,1) | — |
| PAYS | PAYER (0,N), BILL (1,1) | — |
| PRESCRIBES (ternary) | DOCTOR (0,N), PATIENT (0,N), MEDICINE (0,N) | Date, Dose |

**Diagram** (tap to enlarge).

[![EER diagram of the hospital](fig/dna-416-hospital.svg)](../../assets/fig/dna-416-hospital.svg)

**Why PRESCRIBES is ternary.** A prescription is one fact about a doctor, a patient and a medicine together. Three binary relationships could not say which doctor prescribed which medicine to which patient.

**Other constraints.**
1. A patient cannot be their own doctor in PRESCRIBES.
2. A bed holds at most one patient (the (0,1) on BED).
3. Bill amounts are positive.

> **Examiner's note.** Any domain works. Marks go to meeting every listed requirement and giving the constraints (d/o, total/partial, (min, max)) with a reason for each.

### Problem 8 [EER · Application · 8 pts · Elmasri 4.17]

Modify the BANK ER schema (Elmasri Figure 3.22, called 3.21 in the exercise) to track types of ACCOUNT (savings, checking, …) and LOAN (car, home, …), and each account's TRANSACTIONS (deposits, withdrawals, checks, …) and each loan's PAYMENTS, both with amount, date and time. Use specialization and generalization, and state assumptions.

*Solution.*

**The original schema.**
1. Entity types:
   1. BANK (**Code**, Name, Addr).
   2. BANK_BRANCH, weak with owner BANK through BRANCHES: partial key Branch_no, and Addr.
   3. ACCOUNT (**Acct_no**, Balance, Type).
   4. LOAN (**Loan_no**, Amount, Type).
   5. CUSTOMER (**Ssn**, Name, Phone, Addr).
2. Relationships: ACCTS (BRANCH 1:N ACCOUNT), LOANS (BRANCH 1:N LOAN), A_C (ACCOUNT M:N CUSTOMER), L_C (LOAN M:N CUSTOMER).

**Assumptions.**
1. Every account is exactly one type, and every loan is exactly one type. *(Reason: the existing Type attribute holds one value.)*
2. Transactions are numbered within an account, and payments within a loan. *(Reason: they have no global identifier in the requirements.)*
3. The types have their own attributes: savings has an interest rate, checking has an overdraft limit, a car loan has a vehicle number, a home loan has a property address. *(Reason: a subclass is only worth having if it has its own attributes or relationships.)*

**Modifications.**
1. **ACCOUNT specialization**, defined by the attribute Type: subclasses SAVINGS_ACCT (Interest_rate) and CHECKING_ACCT (Overdraft_limit). It is **disjoint (d) and total**.
2. **LOAN specialization**, defined by the attribute Type: subclasses CAR_LOAN (Vehicle_no) and HOME_LOAN (Property_addr). It is **disjoint and total**.
3. **TRANSACTION**, a weak entity with owner ACCOUNT through identifying relationship ACC_TRANS (ACCOUNT (0,N), TRANSACTION (1,1)). Partial key Trans_no; attributes Amount, Date, Time.
   1. It is specialized (disjoint, total) into DEPOSIT, WITHDRAWAL and CHECK.
   2. CHECK has its own attributes Check_no and Payee.
4. **PAYMENT**, a weak entity with owner LOAN through identifying relationship LOAN_PAY (LOAN (0,N), PAYMENT (1,1)). Partial key Payment_no; attributes Amount, Date, Time.

**Generalization (optional).** TRANSACTION and PAYMENT share Amount, Date and Time. They could be generalized into a superclass MONEY_MOVEMENT(Amount, Date, Time). I keep them separate, because they have different owners (account or loan) and different identifying relationships, so the superclass would have no common key.

**Diagram** (tap to enlarge).

[![EER diagram of the modified BANK](fig/dna-417-bank.svg)](../../assets/fig/dna-417-bank.svg)

**Final answer.** The BANK schema above with two attribute-defined, disjoint, total specializations (ACCOUNT and LOAN), and two new weak entity types (TRANSACTION, itself specialized, and PAYMENT).

### Problem 9 [EER · Application · 8 pts · Elmasri 4.18]

Olympic facilities: draw an EER diagram for the narrative in Elmasri 4.18. (Sports complexes are one-sport or multisport. Multisport complexes have an area for each sport with a location indicator. A complex has a location, a chief organiser, a total area. Complexes hold events, each with a planned date, duration, number of participants and number of officials. Officials are listed with their events. Equipment is needed for events and for maintenance. For each facility type, the number of facilities needed and an approximate budget are kept.)

*Solution.*

**Assumptions.**
1. A complex is identified by Complex_id. *(Reason: no key is given, and names may repeat.)*
2. Every complex is exactly one of one-sport or multisport. *(Reason: "divided into one-sport and multisport types".)*
3. An event takes place in one complex. *(Reason: "each complex holds a series of events".)*
4. The number of facilities needed and the budget belong to each **type**, not to each complex. *(Reason: "for each type, the number of facilities needed is kept".)*

**Entity types and specialization.**
1. SPORTS_COMPLEX: **Complex_id**, Location, Chief_organizer, Total_area, Ctype.
   1. It is specialized by the attribute Ctype into ONE_SPORT (Sport) and MULTISPORT. The specialization is **disjoint and total**.
   2. MULTISPORT has a multivalued composite attribute {Sport_area(Sport, Location_indicator)}.
2. FACILITY_TYPE: **Type_name** ('one-sport' or 'multisport'), No_needed, Approx_budget. It holds the per-type information from assumption 4 and has exactly two instances.
3. EVENT: **Event_id**, Name, Planned_date, Duration, No_participants, No_officials.
4. OFFICIAL: **Official_id**, Name, Role.
5. EQUIPMENT: **Equip_id**, Name, Quantity.

**Relationship types.**

| Relationship | Participants and (min, max) | Attributes |
| --- | --- | --- |
| OF_TYPE | SPORTS_COMPLEX (1,1), FACILITY_TYPE (0,N) | — |
| HOLDS | SPORTS_COMPLEX (0,N), EVENT (1,1) | — |
| OFFICIATES | OFFICIAL (0,N), EVENT (0,N) | — |
| NEEDS | EVENT (0,N), EQUIPMENT (0,N) | Quantity |
| MAINTAINED_WITH | SPORTS_COMPLEX (0,N), EQUIPMENT (0,N) | — |

**Diagram** (tap to enlarge).

[![EER diagram of the Olympic facilities](fig/dna-418-olympics.svg)](../../assets/fig/dna-418-olympics.svg)

**Final answer.** The schema above. Its key design choices: a disjoint, total, attribute-defined specialization of SPORTS_COMPLEX; sport areas as a multivalued composite attribute of MULTISPORT; and a separate FACILITY_TYPE entity for the per-type counts and budgets.

> **Examiner's note.** Putting No_needed and Budget on SPORTS_COMPLEX is the usual mistake: it repeats one per-type value in every complex. Sport areas may also be a weak entity AREA (owner MULTISPORT) if events are held in a specific area.

### Problem 10 [EER · Application · 12 pts · Elmasri 4.19]

Library case study (Georgia Tech Library, Elmasri 4.19): identify the classification, aggregation, identification and specialization abstractions, give (min, max) constraints, list the details that affect design but not the conceptual schema, list semantic constraints separately, and draw an EER diagram.

*Solution.*

**Assumptions.**
1. A "title" is a book identified by ISBN, and a "volume" is one physical copy. *(Reason: "250,000 volumes, an average of 2.5 copies per book".)*
2. Wanted books (to acquire) are books the library does not hold. *(Reason: "books they are interested in acquiring but cannot obtain".)*
3. Professors are members whose details come from employee records. *(Reason: "professors are considered automatic members".)*

**Classification (entity and relationship types).**
1. Entity types:
   1. BOOK (**ISBN**, Title, {Author}, Subject_area, Language, Binding, Edition, Description).
   2. COPY, weak with owner BOOK (partial key Copy_no).
   3. MEMBER (**Card_no**, Ssn, Name, Campus_addr, Home_addr, {Phone}, Photo, Issue_date, Expiry_date).
   4. STAFF (**Staff_id**, Name).
   5. NOTICE, weak with owner MEMBER (partial key Notice_date).
2. Relationship types:
   1. HAS_COPY (BOOK–COPY, identifying).
   2. BORROWS (MEMBER–COPY; Date_out, Due_date, Return_date).
   3. NOTIFIED (identifying, MEMBER–NOTICE). NOTICE is a weak entity type with partial key Notice_date and attribute Kind (overdue or renewal).

**Specialization and generalization.**
1. MEMBER → {PROFESSOR, OTHER_MEMBER}, disjoint and total. Professors have a different loan period and grace period, and their notices go to the campus address.
2. BOOK → {HELD_BOOK, WANTED_BOOK}, disjoint and total. Only held books have copies. A wanted book has a Reason attribute (rare, out of print, lost).
3. HELD_BOOK → {LENDABLE, NON_LENDABLE}, disjoint and total. NON_LENDABLE has a Kind attribute (reference, rare, map). Only copies of lendable books may take part in BORROWS.
4. STAFF → {CHIEF_LIBRARIAN, ASSOCIATE_LIBRARIAN, REFERENCE_LIBRARIAN, CHECKOUT_STAFF, ASSISTANT}, disjoint and total.

**Aggregation.**
1. A book's catalogue entry aggregates its title, authors, subject and description.
2. A loan aggregates a member, a copy and dates.

**Identification.**
1. ISBN identifies a book. Title cannot, because two books can share a title.
2. Card_no identifies a member. Ssn is an alternative key.
3. (ISBN, Copy_no) identifies a copy.

**(min, max) constraints.**

| Relationship | (min, max) |
| --- | --- |
| HAS_COPY | HELD_BOOK (1,N), COPY (1,1) |
| BORROWS (current loans) | MEMBER (0,5), COPY (0,1) |
| NOTIFIED | MEMBER (0,N), NOTICE (1,1) |

**Diagram** (tap to enlarge).

[![EER diagram of the library](fig/dna-419-library.svg)](../../assets/fig/dna-419-library.svg)

**Details that do not affect the conceptual design.** The counts (16,000 members, 100,000 titles, 250,000 volumes), the 10% of volumes on loan, the 5% of members sent reminders, the 5% of overdue books lost, the borrowing distribution (top 1% and top 10%) and the 20% inactive members. These affect physical design (sizes, indexes, statistics), not the entity types.

**Semantic constraints** (not expressible in the EER diagram).
1. Loan period: 21 days, or three months for professors.
2. Grace period: one week, or two weeks for professors.
3. At most five books out per member.
4. A card is valid for four years, and a renewal notice is sent one month before expiry.
5. Non-lendable books are never loaned.
6. A professor's notices go to their campus address.

> **Examiner's note.** The exercise is graded on the separation it asks for: what goes in the diagram, what is a semantic constraint, and what is only a statistic. Keep the three lists apart.

### Problem 11 [EER · Application · 10 pts · Elmasri 4.20]

Art museum: draw an EER schema for the requirements of Elmasri 4.20. (ART_OBJECT with Id_no, Artist, Year, Title, Description; types PAINTING, SCULPTURE, STATUE and OTHER, each with its attributes; PERMANENT_COLLECTION or BORROWED, each with its attributes; Origin and Epoch; ARTIST details; EXHIBITIONS; other COLLECTIONS.) Discuss assumptions and justify your choices.

*Solution.*

**Assumptions.**
1. Every art object is exactly one of the four types. *(Reason: OTHER exists "to accommodate objects that do not fall into" the main three.)*
2. Every art object is either owned or borrowed, never both. *(Reason: "either PERMANENT_COLLECTION ... and BORROWED".)*
3. An exhibition is identified by its name. *(Reason: the requirements give a name and dates, and no ID.)*
4. Style is common to all four types, so it is moved up to ART_OBJECT. *(Reason: every type lists Style.)*
5. An object has at most one known artist. *(Reason: "an Artist (if known)".)*

**Entity types.**
1. ART_OBJECT: **Id_no**, Title, Description, Year, Origin, Epoch, Style.
2. ARTIST: **Name**, Date_born, Date_died, Country_of_origin, Epoch, Main_style, Description.
3. EXHIBITION: **Name**, Start_date, End_date.
4. COLLECTION: **Name**, Type, Description, Address, Phone, Contact_person.

**Specializations of ART_OBJECT.**
1. By type, **disjoint and total**:
   1. PAINTING: Paint_type, Drawn_on.
   2. SCULPTURE: Material, Height, Weight.
   3. STATUE: Material, Height, Weight.
   4. OTHER: Type.
2. By ownership, **disjoint and total**:
   1. PERMANENT_COLLECTION: Date_acquired, Status, Cost.
   2. BORROWED: Date_borrowed, Date_returned.

**Relationship types.**

| Relationship | Participants and (min, max) | Reason |
| --- | --- | --- |
| CREATED_BY | ART_OBJECT (0,1), ARTIST (1,N) | Artist may be unknown; an artist in the database made at least one object |
| BORROWED_FROM | BORROWED (1,1), COLLECTION (0,N) | Replaces the attribute "Collection" with a relationship to the COLLECTION entity |
| DISPLAYED_IN | ART_OBJECT (0,N), EXHIBITION (1,N) | An exhibition shows several objects; an object may be in none or many |

**Diagram** (tap to enlarge).

[![EER diagram of the art museum](fig/dna-420-museum.svg)](../../assets/fig/dna-420-museum.svg)

**Justification of the choices.**
1. Two **independent specializations** of the same superclass, one by type and one by ownership. A painting can be borrowed and a statue owned, so these are two separate specializations, not one with eight subclasses.
2. The **Artist attribute becomes a relationship** to ARTIST, because artists have their own attributes.
3. The **Collection attribute of BORROWED becomes a relationship** to COLLECTION for the same reason.
4. SCULPTURE and STATUE have the same attributes but stay as separate subclasses, because the requirements name them as different categories.

> **Examiner's note.** Merging SCULPTURE and STATUE into one subclass with a flag is also accepted if justified. Making the two specializations a single one loses marks, because it cannot express "a borrowed painting".

## C. Review questions (short answers)

### Problem 12 [ER · Concept · 10 pts · Elmasri 3.3–3.13]

(3.3) Define entity, attribute, attribute value, relationship instance, composite, multivalued, derived and complex attribute, key attribute, value set. (3.4) Entity versus entity type versus entity set. (3.5) Attribute versus value set. (3.6) Relationship instance versus type versus set. (3.7) What is a participation role, and when are role names needed? (3.8) The two ways of specifying structural constraints, with pros and cons. (3.9) When can a relationship attribute migrate to an entity? (3.10) Relationships as attributes: what are their value sets, and which models use the idea? (3.11) Recursive relationships, with examples. (3.12) When are weak entities used? Define owner, weak entity type, identifying relationship, partial key. (3.13) Can an identifying relationship have degree more than two?

*Solution.*

**3.3.**
1. An **entity** is a thing in the miniworld with an independent existence. Example: the employee John Smith.
2. An **attribute** is a property that describes an entity. Its **value** for a given entity is the attribute value. Example: Salary = 30000.
3. A **relationship instance** associates one entity from each participating type. Example: (Smith, ProductX) in WORKS_ON.
4. Kinds of attribute:
   1. **Composite**: made of parts, such as Name(First, Last).
   2. **Multivalued**: has a set of values, such as {Phone}.
   3. **Derived**: computed from other data, such as Age from Bdate.
   4. **Complex**: composite and multivalued nested to any depth, such as {Address(Street, City)}.
5. A **key attribute** has a value that is distinct for every entity of the type.
6. A **value set** (domain) is the set of values an attribute may take.

**3.4.**
1. An **entity type** is a collection of entities with the same attributes. It is the schema (intension), such as EMPLOYEE(Name, Ssn, …).
2. The **entity set** is the collection of all entities of that type in the database at one moment. It is the extension.
3. An **entity** is one member of the set.

**3.5.** An **attribute** is a named property of an entity type (Age). Its **value set** is the set of values it may take (integers from 16 to 70). Several attributes can share a value set.

**3.6.**
1. A **relationship type** R among entity types E1, …, En defines a set of associations. It is the schema, such as WORKS_FOR(EMPLOYEE, DEPARTMENT).
2. The **relationship set** is the current set of its instances.
3. A **relationship instance** is one association, such as (Smith, Research).

**3.7.**
1. A **role** is the part an entity plays in a relationship. Example: supervisor or supervisee in SUPERVISION.
2. Role names are **necessary in recursive relationships**, where the same entity type takes part twice. They are also necessary when two relationship types link the same pair of entity types, such as home and away teams.

**3.8.**
1. **Cardinality ratio plus participation**: 1:1, 1:N or M:N, plus total or partial participation. It is simple and easy to read, but it cannot state exact limits such as "at least 5".
2. **(min, max) on each participation**: it is precise (the exact minimum and maximum) and extends to n-ary relationships. It is harder to read, and the reading direction is the opposite of cardinality ratios: (min, max) sits next to the entity it describes.

**3.9.** An attribute of a 1:1 relationship can migrate to either participant. An attribute of a 1:N relationship can migrate to the **N side** only, because each N-side entity takes part at most once. An attribute of an M:N relationship cannot migrate, because it depends on the combination. Example: Hours in WORKS_ON.

**3.10.**
1. A binary relationship can be seen as an attribute of each participant whose value set is the **entity set of the other participant**. The value is a single entity, or a set of entities if the attribute is multivalued. Example: EMPLOYEE.Department, with value set the DEPARTMENT entity set.
2. **Functional data models** and object models (including ODMG) use this idea. In them, relationships are references between objects.

**3.11.** A **recursive** relationship has the same entity type in two roles. Examples:
1. SUPERVISION (EMPLOYEE supervises EMPLOYEE).
2. PREREQUISITE (COURSE requires COURSE).
3. MARRIED_TO (PERSON–PERSON).
4. FRIEND_OF in a social network.

**3.12.**
1. A **weak entity type** has no key of its own and is identified by being related to another entity. It is used when entities exist only through another entity, such as a DEPENDENT of an EMPLOYEE, or a SECTION numbered within a COURSE.
2. The **owner** (identifying) entity type is the one it depends on.
3. The **identifying relationship** links the weak entity to its owner. The weak entity always has total participation in it.
4. The **partial key** is the set of attributes that identifies a weak entity among those with the same owner. Example: Dependent_name.

**3.13.** **Yes.** Example: LANGUAGE_PROFICIENCY for a person, identified by both the PERSON and the LANGUAGE. Another example: a weak entity INTERVIEW identified through a ternary identifying relationship with CANDIDATE and COMPANY, with partial key Date. The weak entity's key is then the combination of all owners' keys plus the partial key.

### Problem 13 [EER · Concept · 6 pts · Elmasri 4.2, 4.6, 4.7]

(4.2) Define superclass of a subclass, superclass/subclass relationship, IS-A relationship, specialization, generalization, category, specific (local) attributes, specific relationships. (4.6) Discuss the two main types of constraints on specializations and generalizations. (4.7) Specialization hierarchy versus lattice.

*Solution.*

**4.2.**
1. A **subclass** is a subset of the entities of another entity type, its **superclass**, that needs to be shown separately. Example: ENGINEER is a subclass of EMPLOYEE.
2. The **superclass/subclass relationship** is the link between them. Every subclass member is the same real-world entity as a superclass member, playing a more specific role.
3. It is also called an **IS-A relationship**: an ENGINEER IS-A EMPLOYEE.
4. **Specialization** is the process of defining subclasses of a superclass, top-down, based on some distinguishing characteristic.
5. **Generalization** is the reverse, bottom-up: common features of several entity types are combined into a superclass. Example: CAR and TRUCK generalize to VEHICLE.
6. A **category** (union type) is a subclass of the **union** of several superclasses that may have different keys. Example: OWNER = PERSON ∪ BANK ∪ COMPANY. A member belongs to **one** of the superclasses.
7. **Specific (local) attributes** belong only to a subclass. Example: Typing_speed of SECRETARY.
8. **Specific relationships** have only the subclass as a participant. Example: only HOURLY_EMPLOYEE takes part in BELONGS_TO a trade union.

**4.6.**
1. **Disjointness**:
   1. **Disjoint (d)**: an entity is in at most one subclass.
   2. **Overlapping (o)**: an entity may be in several.
2. **Completeness**:
   1. **Total** (double line): every superclass entity is in at least one subclass.
   2. **Partial** (single line): some superclass entities may be in none.
3. The two constraints are independent, giving four combinations: disjoint total, disjoint partial, overlapping total, overlapping partial.
4. Membership may also be **predicate-defined** (by a condition, or by a defining attribute) or **user-defined**.

**4.7.**
1. In a **hierarchy**, every subclass has **exactly one** superclass, so the classes form a tree.
2. In a **lattice**, a subclass may have **more than one** superclass. Such a subclass is a **shared subclass**. Example: ENGINEERING_MANAGER is both a MANAGER and an ENGINEER.
3. A shared subclass inherits from **all** its superclasses (multiple inheritance), and its members are in the **intersection**. A category's members are in the **union**.

## D. Last year's papers and extra drills

### Problem 14 [EER · Application · 5 pts · M23 endsem Q7]

TEACHES is a ternary relationship among PROFESSOR, COURSE and STUDENT (which professor teaches which course to which student). A course is taught by at least 1 and at most 2 professors and attended by at least 1 and at most 100 students; a professor teaches no course or at most 3 courses; a student attends no course or at most 6 courses. Give (min, max) for each participant.

*Solution.*

**Assumption.** Every professor of a course teaches it to every student of that course. *(Reason: TEACHES records triples; without this assumption the maxima below are upper bounds that may not be reached.)*

**Working.** For a ternary relationship, the (min, max) pair beside an entity type counts the **triples** (professor, course, student) in which one entity of that type appears.
1. **COURSE.** A course has at least one professor and at least one student, so it is in at least $1 \times 1 = 1$ triple. It has at most 2 professors and at most 100 students, so it is in at most $2 \times 100 = 200$ triples.
2. **PROFESSOR.** A professor may teach no course, so the minimum is 0. A professor teaches at most 3 courses, each with at most 100 students, so the maximum is $3 \times 100 = 300$.
3. **STUDENT.** A student may attend no course, so the minimum is 0. A student attends at most 6 courses, each with at most 2 professors, so the maximum is $6 \times 2 = 12$.

**Diagram** (tap to enlarge).

[![Ternary TEACHES with its (min, max)](fig/dna-p14-ternary.svg)](../../assets/fig/dna-p14-ternary.svg)

**Final answer.** COURSE **(1, 200)**, PROFESSOR **(0, 300)**, STUDENT **(0, 12)**.

> **Examiner's note.** Writing (1, 2) for COURSE confuses the per-pair limit with the triple count. Add that the per-pair limits ("at most 2 professors per course") cannot be expressed by (min, max) on the ternary alone.

### Problem 15 [EER · Concept · 4 pts]

Explain, with an example, why a ternary relationship is not equivalent to three binary relationships.

*Solution.*

**Answer.** A ternary relationship records which combinations of *three* entities occur together. Three binary relationships record only which *pairs* occur, and the triples cannot in general be recovered from the pairs.

**Example.** Let SUPPLY(SUPPLIER, PART, PROJECT) mean "supplier s supplies part p to project j", with the instance {(s1, p1, j2), (s1, p2, j1), (s2, p1, j1)}. Replace it by three binary relationships:
- CAN_SUPPLY(s, p) = {(s1, p1), (s1, p2), (s2, p1)}
- USES(j, p) = {(j2, p1), (j1, p2), (j1, p1)}
- SUPPLIES(s, j) = {(s1, j2), (s1, j1), (s2, j1)}

From these pairs, (s1, p1, j1) looks possible: s1 can supply p1, j1 uses p1, and s1 supplies j1. Yet s1 never supplied p1 to j1. The binaries therefore lose information.

**Diagram** (tap to enlarge).

[![Ternary SUPPLY next to three binaries](fig/dna-p15-ternary-vs-binary.svg)](../../assets/fig/dna-p15-ternary-vs-binary.svg)

**Final answer.** They are not equivalent: the ternary stores exactly which triples occurred, which the binaries cannot reproduce. Binaries may be kept *in addition* to a ternary to express extra constraints, such as "a supplier may supply only parts it can supply".

### Problem 16 [EER · Concept · 3 pts]

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

**Diagram** (tap to enlarge).

[![The four kinds of specialization](fig/dna-p16-spec-kinds.svg)](../../assets/fig/dna-p16-spec-kinds.svg)

### Problem 17 [EER · Concept · 3 pts]

What is the difference between a shared subclass and a category?

*Solution.*

**Answer.**
1. A **shared subclass** has several superclasses and appears in a specialization lattice. Each of its entities belongs to **all** of its superclasses and inherits from all of them. Example: ENGINEERING_MANAGER is a subclass of both ENGINEER and MANAGER.
2. A **category** (union type) is a subclass of the **union** of several superclasses, which usually have different keys. Each of its entities belongs to **exactly one** of the superclasses and inherits only from that one. Example: OWNER = PERSON ∪ BANK ∪ COMPANY. It is drawn with ∪ in the circle.

**Diagram** (tap to enlarge).

[![Shared subclass and category](fig/dna-p17-shared-vs-category.svg)](../../assets/fig/dna-p17-shared-vs-category.svg)

**Final answer.** A shared subclass is an intersection (member of all superclasses); a category is a union (member of one superclass).

### Problem 18 [EER · Application · 6 pts · M24 Quiz 2 Q3]

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

**Diagram** (tap to enlarge).

[![ER diagram reverse-engineered from the relations](fig/dna-p18-company.svg)](../../assets/fig/dna-p18-company.svg)

**Final answer.** Strong entities EMPLOYEE, DEPARTMENT, PROJECT; weak entity DEPENDENT; relationships DEPENDENTS_OF (identifying), WORKS_ON (M:N, Hours), WORKS_FOR (1:N), MANAGES (1:1), CONTROLS (1:N), with the (min, max) pairs above.

> **Examiner's note.** The rule of thumb: a key made only of foreign keys means a relationship; a foreign key plus a partial key means a weak entity; a lone foreign key means a 1:N or 1:1 relationship.

### Problem 19 [EER · Application · 6 pts · UNIVERSITY design drill]

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

**Diagram** (tap to enlarge).

[![ER diagram of the UNIVERSITY drill](fig/dna-p19-university.svg)](../../assets/fig/dna-p19-university.svg)

**Final answer.** The schema has the six entity types and eight relationship types above. Grade is an attribute of TAKES, because it describes a student in a particular section.

