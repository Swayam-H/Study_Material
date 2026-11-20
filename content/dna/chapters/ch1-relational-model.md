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

## A. Keys

### Problem 1 [Keys · Concept · 3 pts · M24 Quiz 2 Q1c]

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

### Problem 2 [Keys · Numerical · 3 pts · M25 Quiz 2 Q1b]

A relation has 5 attributes, and exactly 3 of them are each unique on their own (each is a candidate key by itself), and there are no other candidate keys. How many superkeys are there?

*Solution.*

**Working.**
1. Every superkey contains a candidate key. The candidate keys here are three single attributes, so a set of attributes is a superkey exactly when it contains at least one of these three attributes.
2. The number of subsets of the 5 attributes is $2^5 = 32$.
3. A subset fails to be a superkey exactly when it avoids all three key attributes, i.e. when it is a subset of the remaining 2 attributes. There are $2^2 = 4$ such subsets (including the empty set).
4. Hence the number of superkeys is $32 - 4 = 28$.

**Final answer.** **28 superkeys.** In general, with n attributes and k single-attribute candidate keys, the count is $2^n - 2^{n-k}$.

### Problem 3 [Keys · Numerical · 3 pts · M24 Quiz 2 Q1b]

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

### Problem 4 [Keys · Concept · 4 pts · M25 Quiz 2 Q1a]

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

## B. Constraint violations

### Problem 5 [Constraints · Application · 6 pts · M23 endsem Q1]

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

### Problem 6 [Constraints · Application · 3 pts · M24 Quiz 2 Q4]

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

### Problem 7 [Constraints · Concept · 2 pts]

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

### Problem 8 [Foreign keys · Application · 3 pts · M24 Quiz 2 Q2, Elmasri 5.15]

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
