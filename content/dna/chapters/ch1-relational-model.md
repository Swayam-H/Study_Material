# Learn: The relational model, keys and constraints

Everything in this course sits on one idea: data is stored as **relations** (tables), a relation is a **set of tuples**, and **constraints** say which sets of tuples are legal. Keys, foreign keys and integrity rules come back in every later topic: EER mapping produces them, normalisation is about choosing them well, relational algebra and SQL query through them. Sources: Elmasri and Navathe 7e ch 1–2 (database concepts, briefly) and ch 5 (5.1–5.3); Kamal's Assignment 1 (queries on the COMPANY database in Excel); last year's quizzes on keys and constraint violations (M23 endsem Q1, M24 Quiz 2, M25 Quiz 2).

> **Study path.** Read *Learn* once. Keep *Reference* open while you do *Practice*. The exam asks you to *use* these ideas (find keys, spot violated constraints, count superkeys), so do the practice questions on paper before opening the solutions.

## Why a database, and what the "relational" part means

A **database** is a collection of related data; a **DBMS** is the software that defines, stores, queries and protects it. The point of a DBMS over a pile of files is that the description of the data (the **schema**, kept in the **catalog**) is separate from the programs that use it, so the data can be shared, queried in a high-level language, kept consistent by constraints, protected, and recovered after failures. The **three-schema architecture** separates the *external* level (each user's view), the *conceptual* level (the whole logical structure) and the *internal* level (files and indexes). Changing a lower level without breaking a higher one is **data independence**: logical (change the conceptual schema without changing views) and physical (change storage without changing the conceptual schema).

A **data model** is the set of concepts used to describe a database. The ER model (next chapter) is a *conceptual* model, close to how people think. The **relational model** is a *representational* (implementation) model: it is what MySQL, PostgreSQL and SQLite actually store.

## Relations, tuples, attributes, domains

A **relation schema** R(A1, A2, …, An) is a name plus a list of attributes. Each attribute Ai has a **domain** dom(Ai), the set of atomic values it may take (for example, 10-digit phone numbers). A **relation state** r(R) is a *set* of n-tuples t = ⟨v1, …, vn⟩ with each vi in dom(Ai) or NULL. The number of attributes is the **degree** (arity); the number of tuples is the **cardinality**.

Four properties follow from "a relation is a set of tuples":

1. **No duplicate tuples.** A set has no repeats. (SQL tables are *multisets* unless you use DISTINCT or a key; this difference matters in SQL questions.)
2. **No order among tuples.** Row 1 and row 2 are not "first" and "second".
3. **Attribute order matters only for notation.** ⟨v1, …, vn⟩ is read against the schema's order; with named attributes, order is irrelevant.
4. **Values are atomic.** No lists, no sets, no nested tables inside a cell. This is the **first normal form** assumption, and it is why multivalued attributes in an EER diagram become separate relations.

**NULL** means "unknown", "does not apply" or "exists but not recorded". These three meanings are different, which is why SQL uses three-valued logic with NULL (see the SQL chapter).

## Keys

A **superkey** is a set of attributes SK such that no two distinct tuples in *any* legal state agree on SK. The set of all attributes is always a superkey, because there are no duplicate tuples.

A **key** (candidate key) is a *minimal* superkey: remove any attribute and it stops being a superkey. A relation can have several candidate keys; the one chosen to identify tuples is the **primary key** (underlined); the others are **unique keys** (alternate keys). An attribute that belongs to *some* candidate key is **prime**; any other attribute is **non-prime**. This prime/non-prime split is what 2NF and 3NF are defined on.

**Keys are a property of the schema, not of the current data.** A sample table can show that something is *not* a key (two rows agree on it), but it can never prove that something *is* a key, because tomorrow's insert might break it. When a question asks you to find keys "from the data", say this explicitly and state the assumption you are making (M25 Quiz 2 Q1 was exactly this trap).

**Counting superkeys.** If a relation has n attributes and its candidate keys are k *single* attributes, a set of attributes is a superkey exactly when it contains at least one of those k attributes. There are 2ⁿ subsets in all and 2ⁿ⁻ᵏ subsets that avoid all k key attributes, so

$$\boxed{\#\text{superkeys} = 2^n - 2^{n-k}}$$

For composite keys, use inclusion–exclusion: with keys K1 and K2, #superkeys = 2ⁿ⁻|K1| + 2ⁿ⁻|K2| − 2ⁿ⁻|K1∪K2|.

## Integrity constraints

Constraints are rules every legal state must obey. The DBMS enforces them, and the exam asks you to say **which one** a given INSERT, DELETE or UPDATE breaks.

| Constraint | Rule | Typical violation |
| --- | --- | --- |
| **Domain** | Every value is in its attribute's domain (type, range, CHECK) | GPA = 4.1 when the domain is 0 to 4; Age = −3 |
| **Key** | No two tuples share a value of a candidate key | INSERT a student with an ID that already exists |
| **Entity integrity** | No primary key attribute is NULL | INSERT a tuple whose primary key (or part of it) is NULL |
| **Referential integrity** | A foreign key value either matches the primary key of an existing tuple in the referenced relation, or is NULL (if allowed) | INSERT/UPDATE an FK to a value that does not exist; DELETE a referenced tuple |
| **NOT NULL** | The attribute may not be NULL | INSERT with that attribute missing |
| **Semantic** (general) | Business rules, written as CHECK, assertions or triggers | "Salary of an employee ≤ salary of their supervisor" |

Key constraint and entity integrity are **different** constraints: inserting a duplicate primary key breaks the *key* constraint; inserting a NULL primary key breaks *entity integrity*. Last year's rubric deducted marks for naming the wrong one.

A **foreign key** FK in R1 references the primary key PK of R2 when FK has the same domain(s) as PK and every FK value in R1 either appears as a PK value in R2 or is NULL. R1 is the **referencing** relation, R2 the **referenced** relation. A foreign key may reference its own relation (Super_ssn in EMPLOYEE).

## What happens when an update would break a constraint

- **INSERT** can break all four: domain, key, entity integrity, referential integrity. The default action is to **reject** the insert.
- **DELETE** can break only **referential integrity**, and only when the deleted tuple is referenced. Options: **RESTRICT/NO ACTION** (reject), **CASCADE** (delete the referencing tuples too), **SET NULL** or **SET DEFAULT** on the referencing FK.
- **UPDATE** of a non-key, non-FK attribute can break only the domain constraint. Updating a primary key is like a delete plus an insert. Updating a foreign key can break referential integrity (and domain).

## The COMPANY database

The textbook's running example (Figure 5.5–5.6) is used in Assignment 1, in Chapter 8's examples, and in most practice questions.

| Relation | Attributes (primary key first) | Foreign keys |
| --- | --- | --- |
| EMPLOYEE | **Ssn**, Fname, Minit, Lname, Bdate, Address, Sex, Salary, Super_ssn, Dno | Super_ssn → EMPLOYEE; Dno → DEPARTMENT |
| DEPARTMENT | **Dnumber**, Dname, Mgr_ssn, Mgr_start_date | Mgr_ssn → EMPLOYEE |
| DEPT_LOCATIONS | **Dnumber, Dlocation** | Dnumber → DEPARTMENT |
| PROJECT | **Pnumber**, Pname, Plocation, Dnum | Dnum → DEPARTMENT |
| WORKS_ON | **Essn, Pno**, Hours | Essn → EMPLOYEE; Pno → PROJECT |
| DEPENDENT | **Essn, Dependent_name**, Sex, Bdate, Relationship | Essn → EMPLOYEE |

Learn this schema well: Ch 8 and Ch 6–7 examples, and many textbook exercises (6.5, 8.16, 8.24) are written on it.

# Reference: The relational model, keys and constraints

## Terms (Elmasri 5.1)

- Relation schema R(A1, …, An); degree n; relation state r(R) = set of tuples; cardinality = number of tuples.
- Domain: set of atomic values with a data type and format.
- Characteristics: no duplicate tuples, tuples unordered, values atomic (1NF), NULL allowed unless forbidden.
- Relational database schema S = {R1, …, Rm} plus integrity constraints IC.

## Keys (Elmasri 5.2.2)

- Superkey: no two tuples agree on it, in every legal state.
- Candidate key: minimal superkey. Primary key: the chosen candidate key (underlined). Unique key: the other candidate keys.
- Prime attribute: in some candidate key. Non-prime: in none.
- Keys come from the meaning of the data, not from one sample table.
- Superkeys with k single-attribute candidate keys out of n attributes: 2ⁿ − 2ⁿ⁻ᵏ.

## Constraints (Elmasri 5.2)

- Inherent (model-based): no duplicate tuples, atomic values.
- Schema-based: domain, key, NOT NULL, entity integrity, referential integrity.
- Application-based (semantic): CHECK, assertions, triggers.
- Entity integrity: no PK attribute is NULL. Referential integrity: FK value matches an existing PK or is NULL.

## Update operations (Elmasri 5.3)

| Operation | Can violate | Default | Alternatives |
| --- | --- | --- | --- |
| INSERT | domain, key, entity integrity, referential integrity | reject | ask user to correct |
| DELETE | referential integrity only | reject (RESTRICT) | CASCADE, SET NULL, SET DEFAULT |
| UPDATE (non-key, non-FK) | domain | reject | — |
| UPDATE (PK) | key, entity integrity, referential integrity (as delete + insert) | reject | CASCADE to FKs |
| UPDATE (FK) | domain, referential integrity | reject | — |

## What to be able to do without notes

- Define superkey, candidate key, primary key, prime attribute; say why a sample table cannot prove a key.
- Count superkeys for given keys.
- For any INSERT, DELETE or UPDATE on a populated schema, name every violated constraint and say why.
- List the foreign keys of a schema and state the assumptions you used.
- Write the COMPANY schema from memory.

# Practice: The relational model, keys and constraints

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

## A. Textbook exercises set by Kamal

### Problem 1 [Constraints · Application · 10 pts · Elmasri 5.11]

Each update below is applied directly to the COMPANY state of Figure 5.6. Discuss all integrity constraints violated by each, if any, and the different ways of enforcing them. (a) Insert ⟨'Robert', 'F', 'Scott', '943775543', '1972-06-21', '2365 Newcastle Rd, Bellaire, TX', M, 58000, '888665555', 1⟩ into EMPLOYEE. (b) Insert ⟨'ProductA', 4, 'Bellaire', 2⟩ into PROJECT. (c) Insert ⟨'Production', 4, '943775543', '2007-10-01'⟩ into DEPARTMENT. (d) Insert ⟨'677678989', NULL, '40.0'⟩ into WORKS_ON. (e) Insert ⟨'453453453', 'John', 'M', '1990-12-12', 'spouse'⟩ into DEPENDENT. (f) Delete the WORKS_ON tuples with Essn = '333445555'. (g) Delete the EMPLOYEE tuple with Ssn = '987654321'. (h) Delete the PROJECT tuple with Pname = 'ProductX'. (i) Modify Mgr_ssn and Mgr_start_date of department 5 to '123456789' and '2007-10-01'. (j) Modify Super_ssn of employee '999887777' to '943775543'. (k) Modify Hours of WORKS_ON (Essn '999887777', Pno 10) to '5.0'.

*Solution.*

**Assumptions.**
1. Each operation is applied on its own to the original state, so Robert Scott from (a) does not exist in (c) or (j). *(Reason: "applied directly to the database state shown in Figure 5.6".)*
2. The keys and foreign keys are those of Figure 5.7. Dname is also unique. *(Reason: Figure 5.5 and Section 5.2.)*

**The COMPANY schema the updates act on** (tap to enlarge).

[![COMPANY schema with its foreign keys](fig/dna-p10-company-schema.svg)](../../assets/fig/dna-p10-company-schema.svg)

**Working.**
1. **(a) No violation.**
   1. Ssn 943775543 is new, so the key holds.
   2. Super_ssn 888665555 (Borg) and Dno 1 exist, so referential integrity holds.
   3. The values are in their domains.
2. **(b) Referential integrity violated.**
   1. Pnumber 4 is new, so the key holds.
   2. Dnum 2 does not exist in DEPARTMENT.
   3. Enforcement options: **reject** the insertion; **insert department 2 first**, then the project; or set Dnum to NULL, if a project may exist without a department.
3. **(c) Key constraint and referential integrity violated.**
   1. Dnumber 4 already exists (Administration).
   2. Mgr_ssn 943775543 is not an employee.
   3. Enforcement options: **reject**; or correct the data, using a new Dnumber and inserting the manager as an employee first.
4. **(d) Entity integrity and referential integrity violated.**
   1. Pno is part of the primary key (Essn, Pno) and is NULL.
   2. Essn 677678989 is not an employee.
   3. Enforcement: **reject**, or ask for a valid Pno and insert the employee first. Entity integrity cannot be fixed by the DBMS; the user must supply a key value.
5. **(e) No violation.** Essn 453453453 (Joyce English) exists, and (453453453, John) is a new key.
6. **(f) No violation.** No relation refers to WORKS_ON, so deleting its tuples cannot break referential integrity.
7. **(g) Referential integrity violated.** Wallace (987654321) is referenced in four places:
   1. EMPLOYEE.Super_ssn of Zelaya and Jabbar.
   2. DEPARTMENT.Mgr_ssn of department 4.
   3. WORKS_ON (projects 20 and 30).
   4. DEPENDENT (Abner).

   The options are:
   1. **Reject** the deletion (RESTRICT).
   2. **Cascade**: delete her WORKS_ON and DEPENDENT tuples. Cascading on Super_ssn would delete her supervisees as well, which is clearly wrong.
   3. **Set NULL**: set Zelaya's and Jabbar's Super_ssn to NULL, and department 4's Mgr_ssn to NULL if a department may have no manager. Otherwise set them to a new supervisor or manager first.

   A sensible combination: CASCADE for WORKS_ON and DEPENDENT, SET NULL for Super_ssn, and RESTRICT for Mgr_ssn until a new manager is assigned.
8. **(h) Referential integrity violated.** ProductX is Pnumber 1, referenced by WORKS_ON tuples (Smith and English).
   1. **Reject**; or **cascade** by deleting those WORKS_ON tuples.
   2. SET NULL is not possible, because Pno is part of WORKS_ON's key.
9. **(i) No violation.** 123456789 (Smith) exists, and the date is valid.
10. **(j) Referential integrity violated.** 943775543 is not an employee.
    1. **Reject**; or insert the new supervisor first; or set Super_ssn to NULL.
11. **(k) No violation.** Hours is not part of any key or foreign key, and 5.0 is in its domain.

**Final answer.** (a), (e), (f), (i) and (k) violate nothing. (b) and (j) violate referential integrity. (c) violates the key constraint and referential integrity. (d) violates entity integrity and referential integrity. (g) and (h) violate referential integrity on deletion, and are handled by reject, cascade or set NULL as discussed.

> **Examiner's note.** In (g), list every referencing relation, not just the first you notice. Saying that cascading Super_ssn would delete employees, and is therefore wrong, is the kind of judgement Kamal's A/B/C grading rewards.

### Problem 2 [Constraints · Application · 8 pts · Elmasri 5.12]

AIRLINE (Figure 5.8). Consider an update that enters a reservation on a particular flight or flight leg on a given date. (a) Give the operations for this update. (b) What constraints would you check? (c) Which are key, entity integrity and referential integrity constraints, and which are not? (d) Specify all referential integrity constraints of Figure 5.8.

*Solution.*

**Assumptions.**
1. A reservation on a whole flight means one seat on **every leg** of that flight on that date. *(Reason: SEAT_RESERVATION is kept per leg instance.)*
2. Number_of_available_seats in LEG_INSTANCE must be kept up to date. *(Reason: it is stored, not derived.)*

**(a) Operations**, for each leg L of the flight (or the one leg):
1. Read the LEG_INSTANCE tuple (Flight_number, L, Date) and check that Number_of_available_seats > 0.
2. Insert ⟨Flight_number, L, Date, Seat_number, Customer_name, Customer_phone⟩ into SEAT_RESERVATION.
3. Update that LEG_INSTANCE: Number_of_available_seats = Number_of_available_seats − 1.

All of this runs as **one transaction**, so either every leg is booked or none is.

**(b) Constraints to check.**
1. The leg instance exists.
2. The seat is not already reserved on that leg instance.
3. No key attribute of the reservation is NULL.
4. Available seats are more than 0 before the booking, and never negative after it.
5. Seat_number is a valid seat of the airplane assigned to that instance (at most Total_number_of_seats).
6. Customer_name is given.

**(c) Classification.**
1. **Key**: (Flight_number, Leg_number, Date, Seat_number) is unique in SEAT_RESERVATION, which is check 2.
2. **Entity integrity**: none of those four key attributes is NULL, which is check 3.
3. **Referential integrity**: (Flight_number, Leg_number, Date) exists in LEG_INSTANCE, which is check 1.
4. **Not one of these three**: checks 4, 5 and 6. They are **semantic** constraints. Check 6 can be declared NOT NULL, and check 4 partly by CHECK (Number_of_available_seats >= 0). Check 5 needs a trigger or application code, because it compares with another table.

**(d) Referential integrity constraints of Figure 5.8.**
1. FLIGHT_LEG.Flight_number → FLIGHT.Flight_number
2. FLIGHT_LEG.Departure_airport_code → AIRPORT.Airport_code
3. FLIGHT_LEG.Arrival_airport_code → AIRPORT.Airport_code
4. LEG_INSTANCE.(Flight_number, Leg_number) → FLIGHT_LEG.(Flight_number, Leg_number)
5. LEG_INSTANCE.Airplane_id → AIRPLANE.Airplane_id
6. LEG_INSTANCE.Departure_airport_code → AIRPORT.Airport_code
7. LEG_INSTANCE.Arrival_airport_code → AIRPORT.Airport_code
8. FARE.Flight_number → FLIGHT.Flight_number
9. CAN_LAND.Airplane_type_name → AIRPLANE_TYPE.Airplane_type_name
10. CAN_LAND.Airport_code → AIRPORT.Airport_code
11. AIRPLANE.Airplane_type → AIRPLANE_TYPE.Airplane_type_name
12. SEAT_RESERVATION.(Flight_number, Leg_number, Date) → LEG_INSTANCE.(Flight_number, Leg_number, Date)

**(d) as a schema diagram** (tap to enlarge).

[![AIRLINE schema with foreign keys](fig/dna-512-airline-schema.svg)](../../assets/fig/dna-512-airline-schema.svg)

> **Examiner's note.** In (d), the composite foreign keys (4 and 12) and the two airport references from each leg table are the ones most often missed. The DDL for this schema is Problem 6.6 on the SQL Practice page.

### Problem 3 [Foreign keys · Application · 4 pts · Elmasri 5.15]

SALESPERSON(Ssn, Name, Start_year, Dept_no), TRIP(Ssn, From_city, To_city, Departure_date, Return_date, Trip_id), EXPENSE(Trip_id, Account#, Amount). A trip can be charged to one or more accounts. Specify the foreign keys, stating your assumptions.

*Solution.*

**Assumptions.**
1. Keys: SALESPERSON(**Ssn**), TRIP(**Trip_id**), EXPENSE(**Trip_id, Account#**). *(Reason: Trip_id identifies a trip, and a trip has several account lines, one per account.)*
2. Each trip is taken by one salesperson. *(Reason: TRIP has one Ssn.)*
3. There is no ACCOUNT or DEPARTMENT relation, so Account# and Dept_no are not foreign keys here. *(Reason: those relations are not in the schema.)*

**Foreign keys.**
1. TRIP.Ssn → SALESPERSON.Ssn: every trip belongs to an existing salesperson.
2. EXPENSE.Trip_id → TRIP.Trip_id: every expense line belongs to an existing trip.

**Schema diagram** (tap to enlarge).

[![Foreign keys of 5.15](fig/dna-515-fk.svg)](../../assets/fig/dna-515-fk.svg)

**Final answer.** Two foreign keys: **TRIP.Ssn → SALESPERSON** and **EXPENSE.Trip_id → TRIP**. Dept_no and Account# would become foreign keys if DEPARTMENT and ACCOUNT tables were added.

### Problem 4 [Foreign keys · Application · 4 pts · Elmasri 5.16]

STUDENT(Ssn, Name, Major, Bdate), COURSE(Course#, Cname, Dept), ENROLL(Ssn, Course#, Quarter, Grade), BOOK_ADOPTION(Course#, Quarter, Book_isbn), TEXT(Book_isbn, Book_title, Publisher, Author). Specify the foreign keys, stating your assumptions.

*Solution.*

**Assumptions.**
1. Keys: STUDENT(**Ssn**), COURSE(**Course#**), ENROLL(**Ssn, Course#, Quarter**), BOOK_ADOPTION(**Course#, Quarter, Book_isbn**), TEXT(**Book_isbn**). *(Reason: a student can take a course in several quarters, and a course can adopt several books per quarter.)*
2. A course can adopt a book in a quarter even if no student has enrolled yet. *(Reason: books are chosen before enrolment.)* So BOOK_ADOPTION does not reference ENROLL.
3. There is no DEPARTMENT relation. *(Reason: not in the schema.)*

**Foreign keys.**
1. ENROLL.Ssn → STUDENT.Ssn
2. ENROLL.Course# → COURSE.Course#
3. BOOK_ADOPTION.Course# → COURSE.Course#
4. BOOK_ADOPTION.Book_isbn → TEXT.Book_isbn

**Schema diagram** (tap to enlarge).

[![Foreign keys of 5.16](fig/dna-516-fk.svg)](../../assets/fig/dna-516-fk.svg)

**Final answer.** The four foreign keys above. STUDENT.Major and COURSE.Dept would reference a DEPARTMENT table if one existed.

> **Examiner's note.** BOOK_ADOPTION.(Course#, Quarter) → ENROLL is wrong: (Course#, Quarter) is not a key of ENROLL, and a foreign key must reference a key.

### Problem 5 [Foreign keys · Application · 6 pts · Elmasri 5.17]

CAR(Serial_no, Model, Manufacturer, Price), OPTION(Serial_no, Option_name, Price), SALE(Salesperson_id, Serial_no, Date, Sale_price), SALESPERSON(Salesperson_id, Name, Phone). Specify the foreign keys, populate with a few tuples, and give an insertion into SALE and into SALESPERSON that violates referential integrity, and one that does not.

*Solution.*

**Assumptions.**
1. Keys: CAR(**Serial_no**), OPTION(**Serial_no, Option_name**), SALE(**Salesperson_id, Serial_no**), SALESPERSON(**Salesperson_id**). *(Reason: an option is installed on one car; a car may be sold jointly by several salespeople.)*

**Foreign keys.**
1. OPTION.Serial_no → CAR.Serial_no
2. SALE.Serial_no → CAR.Serial_no
3. SALE.Salesperson_id → SALESPERSON.Salesperson_id

**Schema diagram** (tap to enlarge).

[![Foreign keys of 5.17](fig/dna-517-fk.svg)](../../assets/fig/dna-517-fk.svg)

**Sample state.**

CAR:

| Serial_no | Model | Manufacturer | Price |
| --- | --- | --- | --- |
| C1 | City | Honda | 900000 |
| C2 | Nexon | Tata | 800000 |

OPTION:

| Serial_no | Option_name | Price |
| --- | --- | --- |
| C1 | Sunroof | 50000 |

SALESPERSON:

| Salesperson_id | Name | Phone |
| --- | --- | --- |
| S1 | Asha | 98450 11111 |
| S2 | Ravi | 98450 22222 |

SALE:

| Salesperson_id | Serial_no | Date | Sale_price |
| --- | --- | --- | --- |
| S1 | C1 | 2026-11-01 | 940000 |

**Insertions into SALE.**
1. **Violates**: ⟨S3, C2, 2026-11-10, 800000⟩, because salesperson S3 does not exist. ⟨S1, C9, …⟩ would also violate, because car C9 does not exist.
2. **Does not violate**: ⟨S2, C2, 2026-11-10, 790000⟩, because S2 and C2 both exist.

**Insertions into SALESPERSON.**
1. **None can violate referential integrity.** SALESPERSON has no foreign key; it is only *referenced*. So any new salesperson, such as ⟨S3, Meera, 98450 33333⟩, is fine as far as referential integrity goes.
2. It could only violate the **key** constraint, for example by inserting S1 again.

**Final answer.** There are three foreign keys: OPTION and SALE reference CAR, and SALE references SALESPERSON. A SALE insertion violates referential integrity when its salesperson or car is missing. A SALESPERSON insertion can never violate it, because that relation has no foreign key.

> **Examiner's note.** The question invites you to invent a violating SALESPERSON insertion. Saying that none exists, and why, is the A answer.

### Problem 6 [Keys · Concept · 5 pts · Elmasri 5.20]

Universities cannot use SSNs as primary keys, and generated Student_ids (surrogate keys) are used instead. (a) Propose natural keys for a student record. (b) If a natural key includes last name, can the last name change? If so, how can a key include it and stay unique? (c) What are the advantages and disadvantages of surrogate keys?

*Solution.*

**Assumption.** A natural key must be unique for every student who will ever be in the database, and should not change. *(Reason: those are the properties a primary key needs.)*

**(a) Natural candidates.**
1. A government identity number other than SSN, such as a passport or national ID number. But not every student has one, and the privacy concerns are the same.
2. {First_name, Last_name, Birth_date, Birth_place}: usually unique, but not guaranteed.
3. {Email} assigned at admission. Unique, but it is really assigned by the university, so it is close to a surrogate.
4. {Last_name, Birth_date, Admission_year, Sequence#}. This is unique by construction, but the Sequence# part is generated.

Each of these is weaker than a generated ID on either uniqueness, availability or stability.

**(b)** **No**: last names change, for example on marriage. Solutions:
1. Store the last name **at the time of admission** as a separate, never-updated attribute (Admission_last_name) and use that in the key, while the current Last_name is an ordinary attribute.
2. Combine the last name with something stable and unique, such as {Admission_last_name, Birth_date, Sequence#}.
3. If the key value must change, declare ON UPDATE CASCADE on every foreign key that references it, so the change follows everywhere.

**(c) Surrogate keys.**
1. **Advantages**:
   1. Unique by construction.
   2. Never change.
   3. Short and simple, so foreign keys and indexes are small and joins are fast.
   4. Carry no personal information, which suits privacy rules.
   5. Do not depend on data that may be missing.
2. **Disadvantages**:
   1. They have no meaning to users, who must look them up.
   2. They do not stop duplicates of the real entity: the same person can be entered twice with two IDs unless a UNIQUE constraint is also placed on the natural attributes.
   3. They need a generator (sequence) and an extra column.

**Final answer.** Natural keys are possible but none is both guaranteed unique and stable, and names change. Keep a frozen admission name if one must be in the key. Surrogates are unique, stable and private, but meaningless, and need a UNIQUE constraint on natural attributes to prevent duplicate people.

## B. Review questions (short answers)

### Problem 7 [Relational model · Concept · 8 pts · Elmasri 5.1–5.5]

(5.1) Define domain, attribute, n-tuple, relation schema, relation state, degree, relational database schema, relational database state. (5.2) Why are tuples not ordered? (5.3) Why are duplicate tuples not allowed? (5.4) What is the difference between a key and a superkey? (5.5) Why do we designate one candidate key as the primary key?

*Solution.*

**5.1.**
1. **Domain** D: a set of atomic values, with a data type and format. Example: Usa_phone_numbers, 10-digit strings.
2. **Attribute** A: the name of a role played by a domain in a relation schema. dom(A) is its domain.
3. **n-tuple** t: an ordered list of n values ⟨v1, …, vn⟩, each vi in dom(Ai) or NULL.
4. **Relation schema** R(A1, …, An): a relation name and a list of attributes.
5. **Relation state** r(R): a set of n-tuples of R at some moment. Formally, r(R) ⊆ dom(A1) × … × dom(An).
6. **Degree** (arity): the number of attributes n.
7. **Relational database schema** S: a set of relation schemas {R1, …, Rm} together with a set of integrity constraints IC.
8. **Relational database state**: a set of relation states {r1, …, rm}, one per schema, that satisfies the constraints in IC.

**5.2.** A relation is a **set** of tuples, and sets have no order. The order in which tuples are stored or shown carries no meaning, so the model does not define one. (Physical storage may have an order, but that is below the logical level.)

**5.3.** Again, because a relation is a set, and a set has no duplicate elements. Also, every tuple must be identifiable by its values. Two identical tuples could not be told apart, and that would break the idea of a key. (SQL tables are multisets and do allow duplicates, unless a key or DISTINCT is used.)

**5.4.**
1. A **superkey** is any set of attributes whose values are unique in every valid state. Every relation has at least one: the set of all its attributes.
2. A **key** is a **minimal** superkey: removing any attribute makes it non-unique.
3. Example: in EMPLOYEE, {Ssn, Ename} is a superkey but not a key; {Ssn} is a key.

**5.5.**
1. A relation can have several candidate keys.
2. One is chosen as the **primary key** so that every other relation refers to tuples in the same way, through foreign keys to that key. The DBMS also enforces entity integrity on it (no NULL) and usually indexes it.
3. The usual choice is the candidate key that is smallest, simplest and least likely to change. Example: Ssn rather than {Name, Address}. The others remain **unique keys**.

## C. Last year's papers: keys

### Problem 8 [Keys · Concept · 3 pts · M24 Quiz 2 Q1c]

Differentiate between superkey, candidate key and primary key.

*Solution.*

**Definitions.**
1. A **superkey** of R is a set of attributes SK such that no two distinct tuples in *any* legal state of R have the same values on SK. Every superset of a superkey is again a superkey.
2. A **candidate key** is a *minimal* superkey: removing any attribute from it gives a set that is no longer a superkey.
3. The **primary key** is one candidate key chosen by the designer to identify tuples. It is underlined in the schema, and by the entity integrity constraint it can never be NULL.

**Relationship between them.** Every primary key is a candidate key, and every candidate key is a superkey. The converses do not hold.

**Example.** In STUDENT(Roll, Email, Name), where Roll and Email are each unique:
- {Roll, Name} is a superkey but not a candidate key, because its subset {Roll} is already a superkey.
- {Roll} and {Email} are candidate keys.
- {Roll} is chosen as the primary key; {Email} remains an alternate (unique) key.

### Problem 9 [Keys · Numerical · 3 pts · M25 Quiz 2 Q1b]

A relation has 5 attributes, and exactly 3 of them are each unique on their own (each is a candidate key by itself), and there are no other candidate keys. How many superkeys are there?

*Solution.*

**Working.**
1. Every superkey contains a candidate key. The candidate keys here are three single attributes, so a set of attributes is a superkey exactly when it contains at least one of these three attributes.
2. The number of subsets of the 5 attributes is $2^5 = 32$.
3. A subset fails to be a superkey exactly when it avoids all three key attributes, i.e. when it is a subset of the remaining 2 attributes. There are $2^2 = 4$ such subsets (including the empty set).
4. Hence the number of superkeys is $32 - 4 = 28$.

**Final answer.** **28 superkeys.** In general, with n attributes and k single-attribute candidate keys, the count is $2^n - 2^{n-k}$.

### Problem 10 [Keys · Numerical · 3 pts · M24 Quiz 2 Q1b]

VEHICLE(Vehicle_ID, Registration, Model, Company, Year, Colour), where Vehicle_ID and Registration are each underlined separately (each is a key on its own). How many superkeys does VEHICLE have? Which of {Year, Colour}, {Vehicle_ID, Registration}, {Vehicle_ID, Model, Company}, {Registration, Year, Colour, Company} are superkeys?

*Solution.*

**Assumption.** Vehicle_ID and Registration are the only candidate keys. *(Reason: they are the only attributes marked as keys.)*

**Working.**
1. A set is a superkey exactly when it contains Vehicle_ID or Registration.
2. There are $2^6 = 64$ subsets of the six attributes, and $2^4 = 16$ of them contain neither key attribute.
3. So the number of superkeys is $64 - 16 = 48$.
4. {Year, Colour} contains neither key attribute, so it is **not** a superkey.
5. {Vehicle_ID, Registration}, {Vehicle_ID, Model, Company} and {Registration, Year, Colour, Company} each contain a key attribute, so each **is** a superkey. None of them is a candidate key, because each has a proper subset ({Vehicle_ID} or {Registration}) that is already a superkey.

**Final answer.** **48 superkeys.** Superkeys: {Vehicle_ID, Registration}, {Vehicle_ID, Model, Company}, {Registration, Year, Colour, Company}. Not a superkey: {Year, Colour}.

### Problem 11 [Keys · Concept · 4 pts · M25 Quiz 2 Q1a]

You are shown a library issue table with 10 rows: StudentID, BookID, BookTitle, IssueDate, ReturnDate. In the sample, BookTitle happens to be different in every row. Is BookTitle a candidate key?

*Solution.*

**Assumption.** The table records book issues over time, so new rows will be added. *(Reason: an issue table grows with every loan; the question does not say the state is fixed.)*

**Answer.**
1. A key is a constraint that must hold in **every** legal state of the relation, not only in the rows shown. A sample of data can show that a set is *not* a key (by exhibiting two rows that agree on it), but it can never prove that a set *is* a key.
2. In the sample, StudentID repeats (S04 appears twice) and BookID repeats (B03 appears twice), so neither is a key on its own.
3. BookTitle is unique only in this sample. Two copies of the same title, or the same book issued again later, would give two rows with equal BookTitle. So BookTitle is not a key of the schema.
4. From the meaning of the data, a student can borrow the same book on different days, so a suitable key is (StudentID, BookID, IssueDate).

**Final answer.** **No.** BookTitle is not a candidate key; a suitable candidate key is **(StudentID, BookID, IssueDate)**.

> **Examiner's note.** If you assume "this is the complete table and no rows will ever be added", then BookTitle is a minimal unique attribute *for this state*, and that answer is acceptable **only** with the assumption written down.

## D. Last year's papers: constraint violations

### Problem 12 [Constraints · Application · 6 pts · M23 endsem Q1]

MAJOR(**Name**, Department NOT NULL); STUDENT(**ID**, Name NOT NULL, Age > 0, GPA between 0 and 4, Major → MAJOR.Name). STUDENT has IDs 101–104; 103 is a Physics major. Name every constraint violated by each statement (independently):
(a) INSERT INTO Student VALUES (104, 'Eve', 22, 4.1, 'Chemistry');
(b) UPDATE Student SET Major = 'History' WHERE ID = 103;
(c) DELETE FROM Major WHERE Name = 'Physics';

*Solution.*

**Assumptions.**
1. Each statement is applied to the original state, independently of the others. *(Reason: the question says so.)*
2. The foreign key uses the default action, ON DELETE RESTRICT. *(Reason: no referential action is specified.)*

**(a)** The statement violates two constraints.
- A student with ID 104 already exists, so the new tuple duplicates the primary key: a **key constraint** violation. (It is not an entity integrity violation, because the key value is not NULL.)
- GPA = 4.1 lies outside the permitted range 0 to 4: a **domain constraint** (CHECK) violation.
- 'Chemistry' exists in MAJOR, so referential integrity is satisfied.

**(b)** No tuple of MAJOR has Name = 'History', so student 103 would reference a non-existent major: a **referential integrity** violation.

**(c)** Student 103 references 'Physics'. Deleting that tuple would leave a dangling reference: a **referential integrity** violation. Under RESTRICT the delete is rejected.

**Final answer.** (a) key constraint and domain constraint; (b) referential integrity; (c) referential integrity (delete rejected).

> **Examiner's note.** Mention what other actions would do in (c): ON DELETE CASCADE deletes student 103 as well; SET NULL sets 103's Major to NULL. Writing "entity integrity" for (a) lost a mark in the 2023 key.

### Problem 13 [Constraints · Application · 3 pts · M24 Quiz 2 Q4]

For a USERS(**uid**, name, age CHECK age > 0) and ORDERS(**oid**, uid → USERS, amount) database, give one example each of: an INSERT violating the key constraint; an INSERT violating entity integrity; a DELETE on ORDERS that violates referential integrity; an acceptable DELETE on ORDERS; an acceptable UPDATE on USERS; an UPDATE on USERS violating a domain constraint.

*Solution.*

**Assumption.** USERS contains a tuple with uid = 1, and ORDERS contains a tuple with oid = 7. *(Reason: the examples need existing tuples.)*

| Required example | Statement | Why |
| --- | --- | --- |
| INSERT violating the key constraint | `INSERT INTO USERS VALUES (1, 'Ravi', 20);` | uid 1 already exists |
| INSERT violating entity integrity | `INSERT INTO USERS VALUES (NULL, 'Ravi', 20);` | primary key is NULL |
| DELETE on ORDERS violating RI | **Not possible** | no relation references ORDERS |
| Acceptable DELETE on ORDERS | `DELETE FROM ORDERS WHERE oid = 7;` | deleting a referencing tuple never breaks RI |
| Acceptable UPDATE on USERS | `UPDATE USERS SET name = 'Ravi K' WHERE uid = 1;` | non-key, valid value |
| UPDATE violating a domain constraint | `UPDATE USERS SET age = -5 WHERE uid = 1;` | violates CHECK (age > 0) |

**Justification of the third row.** Referential integrity can be violated by a delete only in the *referenced* relation. ORDERS is the referencing relation and nothing references it, so no delete on ORDERS can violate referential integrity.

### Problem 14 [Constraints · Concept · 2 pts]

Which update operations can violate referential integrity, and what are the options when a DELETE would?

*Solution.*

**Operations that can violate referential integrity.**
1. INSERT into the referencing relation, when the new foreign-key value does not exist in the referenced relation.
2. UPDATE of a foreign-key attribute to a value that does not exist in the referenced relation.
3. DELETE of a referenced tuple (and UPDATE of a referenced primary key), when some tuple still refers to it.

**Options when a DELETE would violate it.**
- **RESTRICT / NO ACTION**: reject the delete (the default).
- **CASCADE**: also delete the referencing tuples.
- **SET NULL**: set the referencing foreign keys to NULL (only if they are not part of a primary key).
- **SET DEFAULT**: set them to the declared default value.

### Problem 15 [Foreign keys · Application · 3 pts · M24 Quiz 2 Q2, Elmasri 5.14]

ORDER-PROCESSING: CUSTOMER(**Cust#**, Cname, City); ORDER(**Order#**, Odate, Cust#, Ord_amt); ORDER_ITEM(**Order#, Item#**, Qty); ITEM(**Item#**, Unit_price); SHIPMENT(**Order#, Warehouse#**, Ship_date); WAREHOUSE(**Warehouse#**, City). Specify the foreign keys.

*Solution.*

**Assumption.** An order may be shipped from several warehouses, and each (order, warehouse) pair has its own ship date. *(Reason: (Order#, Warehouse#) is given as the key of SHIPMENT.)*

**Foreign keys.**
1. ORDER.Cust# → CUSTOMER.Cust#
2. ORDER_ITEM.Order# → ORDER.Order#
3. ORDER_ITEM.Item# → ITEM.Item#
4. SHIPMENT.Order# → ORDER.Order#
5. SHIPMENT.Warehouse# → WAREHOUSE.Warehouse#

**Justification.** Each foreign key is an attribute whose values identify a tuple of another relation, and it references that relation's primary key. In ORDER_ITEM and SHIPMENT both parts of the composite key are foreign keys, because these relations record M:N associations.
