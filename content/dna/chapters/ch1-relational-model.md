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

## A. Keys

### Problem 1 [Keys · Concept · 3 pts · M24 Quiz 2 Q1c]

Differentiate between superkey, candidate key and primary key.

*Solution.* **Superkey:** any set of attributes whose values are unique across all tuples in every legal state; adding attributes to a superkey keeps it a superkey. **Candidate key:** a *minimal* superkey, so no proper subset is a superkey. **Primary key:** one candidate key chosen by the designer to identify tuples; it is underlined, and by entity integrity it may not be NULL. Every primary key is a candidate key, and every candidate key is a superkey, but not conversely. Example: in STUDENT(Roll, Email, Name), {Roll, Name} is a superkey but not a candidate key; Roll and Email are both candidate keys; Roll is chosen as the primary key.

### Problem 2 [Keys · Numerical · 3 pts · M25 Quiz 2 Q1b]

A relation has 5 attributes, and exactly 3 of them are each unique on their own (each is a candidate key by itself), and there are no other candidate keys. How many superkeys are there?

*Solution.* A set is a superkey iff it contains at least one of the 3 key attributes. All subsets: 2⁵ = 32. Subsets avoiding all 3 key attributes: subsets of the remaining 2 attributes, 2² = 4 (including the empty set). So #superkeys = 32 − 4 = **28**. In general 2ⁿ − 2ⁿ⁻ᵏ.

### Problem 3 [Keys · Numerical · 3 pts · M24 Quiz 2 Q1b]

VEHICLE(Vehicle_ID, Registration, Model, Company, Year, Colour), where Vehicle_ID and Registration are each underlined separately (each is a key on its own). How many superkeys does VEHICLE have? Which of {Year, Colour}, {Vehicle_ID, Registration}, {Vehicle_ID, Model, Company}, {Registration, Year, Colour, Company} are superkeys?

*Solution.* n = 6, k = 2: 2⁶ − 2⁴ = 64 − 16 = **48** superkeys. {Year, Colour} is **not** a superkey (contains neither key). The other three each contain Vehicle_ID or Registration, so they **are** superkeys (none of them is a candidate key except the single attributes themselves).

### Problem 4 [Keys · Concept · 4 pts · M25 Quiz 2 Q1a]

You are shown a library issue table with 10 rows: StudentID, BookID, BookTitle, IssueDate, ReturnDate. In the sample, BookTitle happens to be different in every row. Is BookTitle a candidate key?

*Solution.* **Not justified.** A key is a constraint on all legal states, and a sample can only *rule out* keys. The data shows StudentID repeats (S04 twice) and BookID repeats (B03 twice), so neither is a key; BookTitle is unique *in this sample* only. Semantically, a student can borrow the same book twice on different days, so a sensible key is **(StudentID, BookID, IssueDate)**. If the question insists "this is the complete table and no new data will be added", then BookTitle is the smallest candidate key **for this state** — state that assumption explicitly, as the rubric requires.

## B. Constraint violations

### Problem 5 [Constraints · Application · 6 pts · M23 endsem Q1]

MAJOR(**Name**, Department NOT NULL); STUDENT(**ID**, Name NOT NULL, Age > 0, GPA between 0 and 4, Major → MAJOR.Name). STUDENT has IDs 101–104; 103 is a Physics major. Name every constraint violated by each statement (independently):
(a) INSERT INTO Student VALUES (104, 'Eve', 22, 4.1, 'Chemistry');
(b) UPDATE Student SET Major = 'History' WHERE ID = 103;
(c) DELETE FROM Major WHERE Name = 'Physics';

*Solution.* **(a)** Two violations. ID 104 already exists: **key constraint** (not entity integrity — the key is not NULL). GPA 4.1 is outside 0–4: **domain constraint** (a CHECK). 'Chemistry' exists in MAJOR, so referential integrity holds.

**(b)** 'History' is not a Name in MAJOR: **referential integrity**.

**(c)** Student 103 references 'Physics': deleting it would leave a dangling reference, so **referential integrity**; with the default RESTRICT the delete is rejected. (With ON DELETE CASCADE, student 103 would be deleted; with SET NULL, 103's Major would become NULL.)

### Problem 6 [Constraints · Application · 3 pts · M24 Quiz 2 Q4]

For a USERS(**uid**, name, age CHECK age > 0) and ORDERS(**oid**, uid → USERS, amount) database, give one example each of: an INSERT violating the key constraint; an INSERT violating entity integrity; a DELETE on ORDERS that violates referential integrity; an acceptable DELETE on ORDERS; an acceptable UPDATE on USERS; an UPDATE on USERS violating a domain constraint.

*Solution.*
- Key: USERS has uid 1; `INSERT INTO USERS VALUES (1, 'Ravi', 20)`.
- Entity integrity: `INSERT INTO USERS VALUES (NULL, 'Ravi', 20)`.
- DELETE on ORDERS violating RI: **impossible** in this schema, since nothing references ORDERS. Deleting from the *referencing* relation never breaks RI. Say so (that was the point of the question).
- Acceptable DELETE: `DELETE FROM ORDERS WHERE oid = 7`.
- Acceptable UPDATE: `UPDATE USERS SET name = 'Ravi K' WHERE uid = 1`.
- Domain: `UPDATE USERS SET age = -5 WHERE uid = 1`.

### Problem 7 [Constraints · Concept · 2 pts]

Which update operations can violate referential integrity, and what are the options when a DELETE would?

*Solution.* INSERT into the referencing relation (FK value not present), UPDATE of an FK (new value not present), DELETE from the referenced relation (and UPDATE of a referenced PK). Options for the DELETE: RESTRICT (reject), CASCADE (also delete referencing tuples), SET NULL, SET DEFAULT.

### Problem 8 [Foreign keys · Application · 3 pts · M24 Quiz 2 Q2, Elmasri 5.15]

ORDER-PROCESSING: CUSTOMER(**Cust#**, Cname, City); ORDER(**Order#**, Odate, Cust#, Ord_amt); ORDER_ITEM(**Order#, Item#**, Qty); ITEM(**Item#**, Unit_price); SHIPMENT(**Order#, Warehouse#**, Ship_date); WAREHOUSE(**Warehouse#**, City). Specify the foreign keys.

*Solution.* ORDER.Cust# → CUSTOMER; ORDER_ITEM.Order# → ORDER; ORDER_ITEM.Item# → ITEM; SHIPMENT.Order# → ORDER; SHIPMENT.Warehouse# → WAREHOUSE. Assumption: an order can be shipped from several warehouses (given), so (Order#, Warehouse#) is SHIPMENT's key and both parts are FKs. Ship_date is per (order, warehouse).
