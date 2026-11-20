# Learn: SQL

SQL is the language every relational DBMS speaks. It has a **data definition** part (CREATE, ALTER, DROP), a **data manipulation** part (SELECT, INSERT, UPDATE, DELETE), and ways to use it from programs. This course tested it in Assignment 1 (queries on COMPANY), Assignment 6 (three queries on the BOOKS schema, and a topological sort written as SQL statements in a stored procedure), the SQL lab exam, and every past endsem. Sources: Elmasri and Navathe 7e sections 6.1–6.4, 7.1, 7.3, 7.4, 10.1, 10.2; Kamal's practice exercises 6.5, 6.8, 6.10, 6.13, 6.15, 7.5, 7.7–7.9, 10.7; Assignment 6 keys and rubrics; past papers M22–M25.

> **Study path.** Read the SELECT evaluation order first; almost every SQL error comes from forgetting it. Then NULL and three-valued logic, then the four hard patterns: **NOT EXISTS for "every / none"**, **LEFT JOIN + COUNT(column) for zeros**, **max with ties**, **WHERE vs HAVING**. Practice A is Assignment 6, which shows exactly what Kamal marks.

## Data definition (6.1–6.2)

```sql
CREATE TABLE EMPLOYEE (
  Fname      VARCHAR(15)   NOT NULL,
  Lname      VARCHAR(15)   NOT NULL,
  Ssn        CHAR(9)       NOT NULL,
  Bdate      DATE,
  Salary     DECIMAL(10,2) CHECK (Salary > 0),
  Super_ssn  CHAR(9),
  Dno        INT           NOT NULL DEFAULT 1,
  CONSTRAINT EMPPK      PRIMARY KEY (Ssn),
  CONSTRAINT EMPSUPERFK FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn)
                        ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT EMPDEPTFK  FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
                        ON DELETE SET DEFAULT ON UPDATE CASCADE
);
```

- **Types**: INT, SMALLINT, DECIMAL(p, s), FLOAT; CHAR(n) (fixed), VARCHAR(n); DATE, TIME, TIMESTAMP; BOOLEAN; CREATE DOMAIN for reusable types.
- **Constraints**: NOT NULL; DEFAULT; CHECK (row condition); PRIMARY KEY (implies NOT NULL and unique); UNIQUE (alternate key); FOREIGN KEY … REFERENCES.
- **Referential triggered actions**: ON DELETE / ON UPDATE with **RESTRICT / NO ACTION** (default: reject), **CASCADE** (propagate), **SET NULL**, **SET DEFAULT**. Choose by meaning: a weak entity's FK to its owner → CASCADE on delete; an employee's supervisor → SET NULL; a department FK with a sensible default → SET DEFAULT.
- **Naming constraints** (CONSTRAINT name …) lets you drop them later.
- **Circular FKs** (EMPLOYEE.Dno → DEPARTMENT, DEPARTMENT.Mgr_ssn → EMPLOYEE): create tables first, add one FK later with ALTER TABLE, or insert with constraints deferred.

## Schema change (7.4)

```sql
DROP TABLE DEPENDENT CASCADE;            -- also drops constraints and views that use it
DROP TABLE DEPENDENT RESTRICT;           -- only if nothing references it
ALTER TABLE EMPLOYEE ADD COLUMN Job VARCHAR(12);
ALTER TABLE EMPLOYEE DROP COLUMN Address CASCADE;
ALTER TABLE DEPARTMENT ALTER COLUMN Mgr_ssn SET DEFAULT '333445555';
ALTER TABLE EMPLOYEE DROP CONSTRAINT EMPSUPERFK CASCADE;
ALTER TABLE EMPLOYEE ADD CONSTRAINT EMPSUPERFK FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn);
DROP SCHEMA COMPANY CASCADE;
```

A new column is NULL in existing rows unless a DEFAULT is given; so it cannot be NOT NULL without a DEFAULT.

## Basic retrieval (6.3)

```sql
SELECT   [DISTINCT] <attributes and expressions>
FROM     <tables, joins>
WHERE    <row condition>
GROUP BY <grouping attributes>
HAVING   <group condition>
ORDER BY <attributes> [ASC | DESC];
```

**Logical evaluation order** (memorise): **FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY**. Consequences:
- WHERE cannot use aggregates (groups don't exist yet) and cannot use SELECT aliases.
- HAVING filters groups and *can* use aggregates.
- ORDER BY runs last, so it can use aliases and aggregates, even ones not in the output (A6 Q(a) sorted by COUNT(*) without outputting it).
- Every non-aggregated SELECT column must be in GROUP BY (standard SQL).

**Tables are multisets.** SELECT keeps duplicates; use DISTINCT to remove them. UNION, INTERSECT, EXCEPT remove duplicates; UNION ALL, INTERSECT ALL, EXCEPT ALL keep them.

**Pattern matching and other operators**: LIKE with % (any string) and _ (one character): `Lname LIKE '_____%'` = at least five letters; `BloodType LIKE '%-'` = ends with a minus. BETWEEN a AND b (inclusive). IN (list). Arithmetic in SELECT: `Salary * 1.1 AS Raised`. String concatenation `||`.

**Aliases and self-joins**: `FROM EMPLOYEE E, EMPLOYEE S WHERE E.Super_ssn = S.Ssn` pairs each employee with their supervisor. Without a WHERE join condition, two tables in FROM give a **Cartesian product**.

## Insert, delete, update (6.4)

```sql
INSERT INTO EMPLOYEE (Fname, Lname, Ssn, Dno) VALUES ('Richard', 'Marini', '653298653', 4);
INSERT INTO WORKS_ON_INFO (Emp_name, Proj_name, Hours)
  SELECT E.Lname, P.Pname, W.Hours FROM ... ;        -- insert a query result
DELETE FROM EMPLOYEE WHERE Lname = 'Brown';          -- no WHERE: deletes all rows
UPDATE EMPLOYEE SET Salary = Salary * 1.1 WHERE Dno = 5;
```

Each statement is checked against all constraints; a violation rejects it, or triggers the FK action. Past-paper favourite (M23 Q1): list which constraint each statement violates (key, entity integrity, domain/CHECK, referential), treating each independently. See the relational model chapter.

## NULL and three-valued logic (7.1.1)

NULL means unknown, unavailable or not applicable. Any comparison with NULL gives **UNKNOWN**. WHERE and HAVING keep a row only if the condition is **TRUE**.

| AND | TRUE | FALSE | UNKNOWN |
| --- | --- | --- | --- |
| TRUE | TRUE | FALSE | UNKNOWN |
| FALSE | FALSE | FALSE | FALSE |
| UNKNOWN | UNKNOWN | FALSE | UNKNOWN |

| OR | TRUE | FALSE | UNKNOWN |
| --- | --- | --- | --- |
| TRUE | TRUE | TRUE | TRUE |
| FALSE | TRUE | FALSE | UNKNOWN |
| UNKNOWN | TRUE | UNKNOWN | UNKNOWN |

NOT UNKNOWN = UNKNOWN. Test with **IS NULL / IS NOT NULL**, never `= NULL`. Aggregates **ignore NULLs** (except COUNT(*), which counts rows). Rows with NULL in a join column never match in an inner join. GROUP BY puts all NULLs into **one** group.

**The NOT IN trap**: `x NOT IN (subquery)` is UNKNOWN for every x if the subquery returns a NULL, so the query returns nothing. NOT EXISTS has no such problem. The A6 key used NOT IN only after assuming the author columns are never NULL.

## Nested and correlated queries (7.1.2–7.1.5)

A **nested query** is a SELECT inside WHERE (or FROM, or SELECT). Operators: `IN`, `NOT IN`, `= ANY` (same as IN), `> ALL`, `>= ALL`, `< SOME`, `EXISTS`, `NOT EXISTS`, `UNIQUE`.

A **correlated** subquery refers to a column of the outer query and is (logically) evaluated once per outer row:

```sql
-- employees with a dependent of the same first name and sex
SELECT E.Fname, E.Lname
FROM   EMPLOYEE E
WHERE  EXISTS (SELECT * FROM DEPENDENT D
               WHERE D.Essn = E.Ssn AND D.Sex = E.Sex AND D.Dependent_name = E.Fname);
```

**Unqualified names** refer to the innermost table that has them; qualify with aliases to be safe.

**Division in SQL** ("every") uses double NOT EXISTS, exactly as in TRC:

```sql
-- employees who work on every project controlled by department 5
SELECT E.Fname, E.Lname
FROM   EMPLOYEE E
WHERE  NOT EXISTS (SELECT * FROM PROJECT P
                   WHERE P.Dnum = 5
                     AND NOT EXISTS (SELECT * FROM WORKS_ON W
                                     WHERE W.Essn = E.Ssn AND W.Pno = P.Pnumber));
```

Elmasri's alternative uses EXCEPT: `NOT EXISTS ((SELECT Pnumber FROM PROJECT WHERE Dnum = 5) EXCEPT (SELECT Pno FROM WORKS_ON WHERE Essn = E.Ssn))`.

## Joined tables and outer joins (7.1.6)

```sql
FROM EMPLOYEE E JOIN DEPARTMENT D ON E.Dno = D.Dnumber             -- inner join
FROM EMPLOYEE NATURAL JOIN (DEPARTMENT AS DEPT (Dname, Dno, Mssn, Msdate))
FROM EMPLOYEE E LEFT OUTER JOIN EMPLOYEE S ON E.Super_ssn = S.Ssn  -- keep employees with no supervisor
FROM A RIGHT OUTER JOIN B ON ...
FROM A FULL OUTER JOIN B ON ...
```

The four join types (M25 endsem Q1d): **INNER** (only matching pairs), **LEFT** (all left rows, NULLs where no match), **RIGHT** (all right rows), **FULL** (all rows of both). Plus CROSS JOIN (Cartesian product) and NATURAL JOIN (on same-named columns).

**A filter on the right table in WHERE turns a LEFT JOIN back into an inner join** (the NULL rows fail the condition). Put such conditions in the ON clause.

**Full outer join without FULL OUTER JOIN** (M25 Q4, MySQL has none):

```sql
SELECT * FROM A LEFT JOIN B ON A.k = B.k
UNION
SELECT * FROM A RIGHT JOIN B ON A.k = B.k;
-- or keep duplicates correctly with UNION ALL and drop the matched rows from the second part:
SELECT * FROM A LEFT JOIN B ON A.k = B.k
UNION ALL
SELECT * FROM A RIGHT JOIN B ON A.k = B.k WHERE A.k IS NULL;
```

## Aggregates, GROUP BY, HAVING (7.1.7–7.1.8)

COUNT, SUM, MAX, MIN, AVG. `COUNT(*)` counts rows; `COUNT(col)` counts non-NULL values; `COUNT(DISTINCT col)` counts distinct non-NULL values. An aggregate over an empty set: COUNT gives 0, the others give NULL.

**WHERE vs HAVING** (M25 Q3): "total sales per employee, only counting sales over 100":

```sql
SELECT EmployeeID, SUM(SaleAmount) FROM Sales
WHERE  SaleAmount > 100        -- filters rows before grouping: correct
GROUP BY EmployeeID;

SELECT EmployeeID, SUM(SaleAmount) FROM Sales
GROUP BY EmployeeID
HAVING SaleAmount > 100;       -- error: SaleAmount is not a group property
```

HAVING is for conditions on the *group* (`HAVING SUM(SaleAmount) > 1000`). Elmasri 7.5b is the same point: "number of male employees in departments with average salary over 30000" needs the department condition computed over *all* employees, so it goes in a nested query, not in WHERE Sex = 'M' plus HAVING.

**Counting zeros**: groups only exist for rows that exist. To list every doctor including those with 0 admissions:

```sql
SELECT D.DoctorID, D.FirstName, D.LastName, COUNT(A.AdmissionID) AS NumAdmissions
FROM   Doctors D LEFT JOIN Admissions A ON D.DoctorID = A.DoctorID
GROUP BY D.DoctorID, D.FirstName, D.LastName
ORDER BY NumAdmissions DESC;
```

`COUNT(A.AdmissionID)` not `COUNT(*)`: with the LEFT JOIN, a doctor with no admissions still has one row (with NULLs), so COUNT(*) would say 1.

**Maximum with ties**: never `ORDER BY … DESC LIMIT 1` when ties must be listed (A6 Q(b) common mistake). Compare with the maximum:

```sql
WITH C AS (SELECT Dno, COUNT(*) AS N FROM EMPLOYEE GROUP BY Dno)
SELECT Dno FROM C WHERE N = (SELECT MAX(N) FROM C);
-- or: HAVING COUNT(*) >= ALL (SELECT COUNT(*) FROM EMPLOYEE GROUP BY Dno)
```

## WITH, CASE, recursion (7.1.9–7.1.10)

```sql
WITH BIGDEPTS (Dno) AS (SELECT Dno FROM EMPLOYEE GROUP BY Dno HAVING COUNT(*) > 5)
SELECT Dno, COUNT(*) FROM EMPLOYEE
WHERE  Salary > 40000 AND Dno IN (SELECT Dno FROM BIGDEPTS)
GROUP BY Dno;

UPDATE EMPLOYEE
SET Salary = CASE WHEN Dno = 5 THEN Salary + 2000
                  WHEN Dno = 4 THEN Salary + 1500
                  ELSE Salary END;

WITH RECURSIVE SUP_EMP (SupSsn, EmpSsn) AS (
    SELECT Super_ssn, Ssn FROM EMPLOYEE
  UNION
    SELECT E.Super_ssn, S.EmpSsn FROM EMPLOYEE E, SUP_EMP S WHERE E.Ssn = S.SupSsn
)
SELECT * FROM SUP_EMP;      -- all (supervisor, supervisee) pairs at any depth
```

## Views (7.3)

A **view** is a named query, a virtual table:

```sql
CREATE VIEW WORKS_ON1 AS
  SELECT Fname, Lname, Pname, Hours
  FROM   EMPLOYEE, PROJECT, WORKS_ON
  WHERE  Ssn = Essn AND Pno = Pnumber;
DROP VIEW WORKS_ON1;
```

Uses: simplify queries, security (expose only some columns), a stable interface. Implementation: **query modification** (rewrite the query on the base tables) or **view materialisation** (store it; keep it up to date incrementally).

**Updatable views**: a view on **one table** whose columns include its **primary key** (and all NOT NULL columns without defaults) is generally updatable. Views with **joins** are often ambiguous to update; views with **aggregates or GROUP BY** are **not updatable** (what would "set the average to 50000" change?). `WITH CHECK OPTION` rejects updates through the view that would make the row disappear from it.

## Database programming (10.1–10.2)

**Why**: applications need SQL inside a general-purpose program. **Impedance mismatch**: SQL returns sets of rows with SQL types; host languages handle one value at a time with their own types. The fix is **cursors** (iterate over a result) and type binding.

Three approaches (10.1): **embedded SQL** (SQL statements inside the host program, precompiled), **library of function calls / API** (SQL/CLI, JDBC, ODBC: SQL strings passed at run time), **a database programming language** (SQL/PSM, PL/SQL: stored procedures, like GA6's TopoSort).

**Embedded SQL in C** (10.2): statements start with `EXEC SQL` and end with `;`. **Host variables** are declared in `EXEC SQL BEGIN DECLARE SECTION … END DECLARE SECTION` and used with a colon prefix (`:ssn`). **SQLCODE** / **SQLSTATE** report status (SQLCODE 0 = success, 100 = no more rows, < 0 = error; SQLSTATE '00000' success, '02000' no data). A single-row query uses `SELECT … INTO :vars`; a multi-row query uses a **cursor**:

```c
EXEC SQL DECLARE EMP CURSOR FOR
  SELECT Ssn, Fname, Salary FROM EMPLOYEE WHERE Dno = :dno FOR UPDATE OF Salary;
EXEC SQL OPEN EMP;
EXEC SQL FETCH FROM EMP INTO :ssn, :fname, :salary;
while (SQLCODE == 0) {
    EXEC SQL UPDATE EMPLOYEE SET Salary = Salary + :raise WHERE CURRENT OF EMP;
    EXEC SQL FETCH FROM EMP INTO :ssn, :fname, :salary;
}
EXEC SQL CLOSE EMP;
```

**Dynamic SQL**: the query text is built at run time: `EXEC SQL PREPARE stmt FROM :sqltext; EXEC SQL EXECUTE stmt;` (or `EXECUTE IMMEDIATE`). **SQLJ**: embedded SQL in Java, `#sql { … };`, with **iterators** (named or positional) in place of cursors.

## How Kamal grades SQL (A6 rubrics)

- **No clarifications; assumptions as SQL comments** (`-- ISBN is the key of BOOKS`).
- **Verify, don't match**: any query that returns the right rows under the stated assumptions is correct (subqueries, joins, EXCEPT, window functions all accepted).
- Typical deductions: grouping on the wrong columns (Title instead of ISBN), inner join that drops zero-count rows, `1 + COUNT(*)` with a LEFT JOIN, LIMIT 1 losing ties, OR instead of AND for "neither … nor", missing DESC, no ORDER BY when order is the answer.
- For algorithm-to-SQL questions (GA6): one SQL statement per pseudocode line, a working copy of tables you modify, positions stored explicitly because tables have no order, and checks against the *reduced* table.

# Reference: SQL

## Clause order and meaning

| Clause | Runs | Can use aggregates? |
| --- | --- | --- |
| FROM / JOIN | 1 | — |
| WHERE | 2 | No |
| GROUP BY | 3 | — |
| HAVING | 4 | Yes |
| SELECT | 5 | Yes |
| DISTINCT | 6 | — |
| ORDER BY | 7 | Yes (and aliases) |

## Pattern table

| Question | SQL pattern |
| --- | --- |
| "no …", "never" | NOT EXISTS (correlated), or LEFT JOIN … WHERE right.key IS NULL, or EXCEPT |
| "every", "all" | NOT EXISTS (… NOT EXISTS …), or NOT EXISTS (required EXCEPT actual) |
| "for each X, number of Y, including zero" | X LEFT JOIN Y, GROUP BY X's key, COUNT(Y.col) |
| "the most / highest", ties kept | = (SELECT MAX …) or >= ALL, never LIMIT 1 |
| "more than the average" | > (SELECT AVG(…) …) |
| "for each group with condition on the group" | GROUP BY … HAVING |
| "the latest record of X" (update it) | WHERE date = (SELECT MAX(date) … WHERE same X) |
| "neither A nor B" | NOT A AND NOT B |
| "at least two different" | self-join with ≠, or HAVING COUNT(DISTINCT …) >= 2 |
| "both roles" (author or coauthor) | UNION of the two columns |

## NULL rules

- Comparisons with NULL → UNKNOWN; WHERE keeps only TRUE.
- IS NULL / IS NOT NULL; COALESCE(x, 0) replaces NULL.
- Aggregates ignore NULL; COUNT(*) counts rows; empty set: COUNT = 0, others NULL.
- NOT IN with a NULL in the list → no rows.

## DDL keywords

CREATE TABLE / SCHEMA / DOMAIN / VIEW; PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY … REFERENCES … ON DELETE / ON UPDATE {RESTRICT | NO ACTION | CASCADE | SET NULL | SET DEFAULT}; ALTER TABLE ADD / DROP COLUMN, ADD / DROP CONSTRAINT, ALTER COLUMN SET / DROP DEFAULT; DROP … CASCADE | RESTRICT.

## What to be able to do without notes

- Write DDL with all keys and sensible triggered actions (6.5, 6.8).
- Write any query in the pattern table, including correlated NOT EXISTS and outer-join counts.
- Predict the output of a given query on a small table, including row order (ORDER BY) and NULL behaviour.
- Say whether a view is updatable and why.
- Write an embedded SQL fragment with host variables and a cursor.

# Practice: SQL

## A. Assignment 6 (this year)

Schema: BOOKS(**ISBN**, AuthorName, Title, Publisher, YearofBook), COAUTHORS(**ISBN, JointAuthorName**), PERSONS(**Name**, YearofBirth, Residence), PUBLISHERS(**Publisher**, City). The senior author is not repeated in COAUTHORS; author columns are never NULL.

### Problem 1 [SQL · Application · 5 pts · Assignment 6 individual (a)]

For each publisher, list its authors ranked in descending order of the number of books they have published with that publisher as senior author. Output Publisher and AuthorName, grouped by publisher.

*Solution.*

```sql
-- Assumption: ISBN is the key of BOOKS, so COUNT(*) per group = number of books
SELECT   Publisher, AuthorName
FROM     BOOKS
GROUP BY Publisher, AuthorName
ORDER BY Publisher, COUNT(*) DESC;
```

Group on **both** columns (one group per publisher–author pair); sort by publisher first so its rows are together, then by count descending. Common mistakes: GROUP BY Publisher only; ORDER BY COUNT(*) DESC alone (rows of one publisher scattered); no DESC; counting coauthors. A window function `RANK() OVER (PARTITION BY Publisher ORDER BY COUNT(*) DESC)` is also correct.

### Problem 2 [SQL · Application · 5 pts · Assignment 6 individual (b)]

List the book or books with the highest total number of authors (senior author plus coauthors). List all ties. Output ISBN and Title.

*Solution.*

```sql
WITH AuthorCount AS (
    SELECT   B.ISBN, B.Title, 1 + COUNT(C.JointAuthorName) AS NumAuthors
    FROM     BOOKS B LEFT JOIN COAUTHORS C ON B.ISBN = C.ISBN
    GROUP BY B.ISBN, B.Title
)
SELECT ISBN, Title
FROM   AuthorCount
WHERE  NumAuthors = (SELECT MAX(NumAuthors) FROM AuthorCount);
```

LEFT JOIN keeps books with no coauthors; COUNT(C.JointAuthorName) gives 0 for them (COUNT(*) would give 1); comparing with MAX keeps ties (LIMIT 1 would not). Alternatives: HAVING … >= ALL (…), RANK() = 1, or a UNION of both author roles then COUNT(*).

### Problem 3 [SQL · Application · 5 pts · Assignment 6 individual (c)]

List the Name of every person who is neither a senior author nor a coauthor of any book.

*Solution.*

```sql
SELECT P.Name
FROM   PERSONS P
WHERE  NOT EXISTS (SELECT * FROM BOOKS B     WHERE B.AuthorName      = P.Name)
  AND  NOT EXISTS (SELECT * FROM COAUTHORS C WHERE C.JointAuthorName = P.Name);
```

"Neither … nor" = NOT … AND NOT …; using OR returns almost everyone. Also correct: NOT IN twice (safe here because the columns are never NULL), `SELECT Name FROM PERSONS EXCEPT SELECT AuthorName FROM BOOKS EXCEPT SELECT JointAuthorName FROM COAUTHORS`, or two LEFT JOINs with both keys IS NULL.

### Problem 4 [SQL · Application · 10 pts · Assignment 6 group]

Kahn's algorithm (L ← empty; S ← nodes with no incoming edge; while S not empty: remove n from S, append n to L, for each edge n → m remove it and if m has no other incoming edges insert m into S; if edges remain return error else return L). (a) What is the output? (b) With the graph stored as G(FromNode, ToNode), give SQL for each step. (c) Run it on a four-node graph.

*Solution.* (a) A **topological order** of the nodes (every edge u → v has u before v) if the graph is a DAG; an **error** if it has a cycle (cycle nodes never lose all incoming edges). Not unique: depends on which node is taken from S.

(b) Work on a copy so G is not destroyed; store list positions because tables have no order; node set in V(Node).

```sql
CREATE TABLE E AS SELECT FromNode, ToNode FROM G;                 -- working copy
CREATE TABLE L (Pos INT PRIMARY KEY, Node INT);                   -- (A)
CREATE TABLE S AS SELECT Node FROM V
                  WHERE Node NOT IN (SELECT ToNode FROM E);       -- (B)
SELECT COUNT(*) FROM S;                                           -- (C) loop while > 0
SELECT MIN(Node) INTO n FROM S;  DELETE FROM S WHERE Node = n;    -- (D)
INSERT INTO L (Pos, Node) SELECT COALESCE(MAX(Pos), 0) + 1, n FROM L;   -- (E)
CREATE TEMPORARY TABLE M AS SELECT ToNode AS Target FROM E WHERE FromNode = n;  -- (F)
DELETE FROM E WHERE FromNode = n AND ToNode = m;                  -- (G)
SELECT COUNT(*) FROM E WHERE ToNode = m;                          -- (H) = 0 ?
INSERT INTO S VALUES (m);                                         -- (I)
SELECT COUNT(*) FROM E;                                           -- (J) > 0 → error
SELECT Node FROM L ORDER BY Pos;                                  -- (K)
```

The loops go in a stored procedure (WHILE … DO … END WHILE; IF … THEN … END IF; SIGNAL for the error) or a host program.

(c) Edges 1→2, 1→3, 2→4, 3→4. S = {1}. Round 1: n = 1, L = [1]; delete 1→2 (2 has no other incoming → S = {2}), delete 1→3 (S = {2, 3}). Round 2: n = 2, L = [1, 2]; delete 2→4, but 3→4 remains, so 4 not added. Round 3: n = 3, L = [1, 2, 3]; delete 3→4, S = {4}. Round 4: n = 4, L = [1, 2, 3, 4]. E is empty → return [1, 2, 3, 4]. With a cycle (add the edge 4→1): every node now has an incoming edge, so S starts empty, the loop never runs, and (J) finds edges left → error.

Common mistakes: (B) using FromNode (no *outgoing* edge); (D) not deleting n from S (infinite loop); (G) deleting with ToNode = m only; (H)/(J) checking G instead of E; (K) no ORDER BY.

## B. Textbook exercises set by Kamal

UNIVERSITY (Elmasri Fig 1.2): STUDENT(Name, **Student_number**, Class, Major), COURSE(Course_name, **Course_number**, Credit_hours, Department), SECTION(**Section_identifier**, Course_number, Semester, Year, Instructor), GRADE_REPORT(**Student_number, Section_identifier**, Grade), PREREQUISITE(**Course_number, Prerequisite_number**).

### Problem 5 [SQL · Application · 6 pts · Elmasri 6.5]

What referential integrity constraints should hold on UNIVERSITY? Write the DDL.

*Solution.* SECTION.Course_number → COURSE; GRADE_REPORT.Student_number → STUDENT; GRADE_REPORT.Section_identifier → SECTION; PREREQUISITE.Course_number → COURSE; PREREQUISITE.Prerequisite_number → COURSE.

```sql
CREATE TABLE STUDENT (
  Name VARCHAR(30) NOT NULL, Student_number INT PRIMARY KEY,
  Class INT CHECK (Class BETWEEN 1 AND 5), Major CHAR(4));
CREATE TABLE COURSE (
  Course_name VARCHAR(40) NOT NULL, Course_number CHAR(8) PRIMARY KEY,
  Credit_hours INT, Department CHAR(4));
CREATE TABLE SECTION (
  Section_identifier INT PRIMARY KEY,
  Course_number CHAR(8) NOT NULL REFERENCES COURSE(Course_number)
                ON DELETE CASCADE ON UPDATE CASCADE,
  Semester VARCHAR(6), Year CHAR(4), Instructor VARCHAR(30));
CREATE TABLE GRADE_REPORT (
  Student_number INT REFERENCES STUDENT(Student_number) ON DELETE CASCADE ON UPDATE CASCADE,
  Section_identifier INT REFERENCES SECTION(Section_identifier) ON DELETE CASCADE ON UPDATE CASCADE,
  Grade CHAR(1),
  PRIMARY KEY (Student_number, Section_identifier));
CREATE TABLE PREREQUISITE (
  Course_number CHAR(8) REFERENCES COURSE(Course_number) ON DELETE CASCADE ON UPDATE CASCADE,
  Prerequisite_number CHAR(8) REFERENCES COURSE(Course_number) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Course_number, Prerequisite_number));
```

CASCADE on GRADE_REPORT is a choice (deleting a student deletes their grades); RESTRICT is also defensible if records must be kept. Say which and why.

### Problem 6 [SQL · Application · 6 pts · Elmasri 6.8]

Write DDL for the LIBRARY schema with keys and referential triggered actions: BOOK(Book_id, Title, Publisher_name), BOOK_AUTHORS(Book_id, Author_name), PUBLISHER(Name, Address, Phone), BOOK_COPIES(Book_id, Branch_id, No_of_copies), BOOK_LOANS(Book_id, Branch_id, Card_no, Date_out, Due_date), LIBRARY_BRANCH(Branch_id, Branch_name, Address), BORROWER(Card_no, Name, Address, Phone).

*Solution.*

```sql
CREATE TABLE PUBLISHER (Name VARCHAR(40) PRIMARY KEY, Address VARCHAR(80), Phone VARCHAR(15));
CREATE TABLE BOOK (
  Book_id INT PRIMARY KEY, Title VARCHAR(80) NOT NULL,
  Publisher_name VARCHAR(40) REFERENCES PUBLISHER(Name) ON DELETE SET NULL ON UPDATE CASCADE);
CREATE TABLE BOOK_AUTHORS (
  Book_id INT REFERENCES BOOK(Book_id) ON DELETE CASCADE ON UPDATE CASCADE,
  Author_name VARCHAR(40),
  PRIMARY KEY (Book_id, Author_name));
CREATE TABLE LIBRARY_BRANCH (Branch_id INT PRIMARY KEY, Branch_name VARCHAR(40) NOT NULL, Address VARCHAR(80));
CREATE TABLE BORROWER (Card_no INT PRIMARY KEY, Name VARCHAR(40) NOT NULL, Address VARCHAR(80), Phone VARCHAR(15));
CREATE TABLE BOOK_COPIES (
  Book_id INT REFERENCES BOOK(Book_id) ON DELETE CASCADE ON UPDATE CASCADE,
  Branch_id INT REFERENCES LIBRARY_BRANCH(Branch_id) ON DELETE CASCADE ON UPDATE CASCADE,
  No_of_copies INT CHECK (No_of_copies >= 0),
  PRIMARY KEY (Book_id, Branch_id));
CREATE TABLE BOOK_LOANS (
  Book_id INT, Branch_id INT,
  Card_no INT REFERENCES BORROWER(Card_no) ON DELETE RESTRICT ON UPDATE CASCADE,
  Date_out DATE NOT NULL, Due_date DATE NOT NULL,
  PRIMARY KEY (Book_id, Branch_id, Card_no),
  FOREIGN KEY (Book_id, Branch_id) REFERENCES BOOK_COPIES(Book_id, Branch_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (Due_date >= Date_out));
```

Reasons: authors and copies are meaningless without the book (CASCADE); a borrower with books out should not vanish (RESTRICT); a deleted publisher leaves its books (SET NULL).

### Problem 7 [SQL · Application · 10 pts · Elmasri 6.10 (all of 8.16 in SQL)]

COMPANY: (a) department 5 employees working more than 10 hours on ProductX; (b) employees with a dependent of the same first name; (c) employees supervised by Franklin Wong; (d) each project's name and total hours; (e) employees on every project; (f) employees on no project; (g) each department's name and average salary; (h) average salary of female employees; (i) employees on a Houston project whose department has no Houston location; (j) last names of managers with no dependents.

*Solution.*

```sql
-- (a)
SELECT E.Fname, E.Lname
FROM   EMPLOYEE E JOIN WORKS_ON W ON E.Ssn = W.Essn JOIN PROJECT P ON W.Pno = P.Pnumber
WHERE  E.Dno = 5 AND P.Pname = 'ProductX' AND W.Hours > 10;
-- (b)
SELECT E.Fname, E.Lname FROM EMPLOYEE E JOIN DEPENDENT D
  ON D.Essn = E.Ssn AND D.Dependent_name = E.Fname;
-- (c)
SELECT E.Fname, E.Lname FROM EMPLOYEE E JOIN EMPLOYEE S ON E.Super_ssn = S.Ssn
WHERE  S.Fname = 'Franklin' AND S.Lname = 'Wong';
-- (d)
SELECT P.Pname, SUM(W.Hours) AS TotalHours
FROM   PROJECT P LEFT JOIN WORKS_ON W ON P.Pnumber = W.Pno
GROUP BY P.Pnumber, P.Pname;
-- (e)
SELECT E.Fname, E.Lname FROM EMPLOYEE E
WHERE NOT EXISTS (SELECT * FROM PROJECT P
                  WHERE NOT EXISTS (SELECT * FROM WORKS_ON W
                                    WHERE W.Essn = E.Ssn AND W.Pno = P.Pnumber));
-- (f)
SELECT Fname, Lname FROM EMPLOYEE E
WHERE NOT EXISTS (SELECT * FROM WORKS_ON W WHERE W.Essn = E.Ssn);
-- (g)
SELECT D.Dname, AVG(E.Salary) FROM DEPARTMENT D JOIN EMPLOYEE E ON E.Dno = D.Dnumber
GROUP BY D.Dnumber, D.Dname;
-- (h)
SELECT AVG(Salary) FROM EMPLOYEE WHERE Sex = 'F';
-- (i)
SELECT DISTINCT E.Fname, E.Lname, E.Address
FROM   EMPLOYEE E JOIN WORKS_ON W ON E.Ssn = W.Essn JOIN PROJECT P ON W.Pno = P.Pnumber
WHERE  P.Plocation = 'Houston'
  AND  NOT EXISTS (SELECT * FROM DEPT_LOCATIONS L
                   WHERE L.Dnumber = E.Dno AND L.Dlocation = 'Houston');
-- (j)
SELECT E.Lname FROM EMPLOYEE E JOIN DEPARTMENT D ON D.Mgr_ssn = E.Ssn
WHERE  NOT EXISTS (SELECT * FROM DEPENDENT X WHERE X.Essn = E.Ssn);
```

On Elmasri's Figure 5.6 state: (a) John Smith, Joyce English; (b) none; (c) John Smith, Ramesh Narayan, Joyce English; (e) none; (f) none; (h) 31000; (i) Jennifer Wallace (she works on Reorganization in Houston, and department 4 is only in Stafford); (j) Borg.

### Problem 8 [SQL · Application · 4 pts · Elmasri 6.13]

On UNIVERSITY: (a) insert student ⟨'Johnson', 25, 1, 'Math'⟩; (b) change Smith's class to 2; (c) insert course ⟨'Knowledge Engineering', 'cs4390', 3, 'cs'⟩; (d) delete the student named Smith with number 17.

*Solution.*

```sql
INSERT INTO STUDENT VALUES ('Johnson', 25, 1, 'Math');
UPDATE STUDENT SET Class = 2 WHERE Name = 'Smith';
INSERT INTO COURSE VALUES ('Knowledge Engineering', 'cs4390', 3, 'cs');
DELETE FROM STUDENT WHERE Name = 'Smith' AND Student_number = 17;
```

(b) updates every Smith; if names are not unique, use the Student_number. (d) succeeds only if GRADE_REPORT rows for 17 are cascaded or none exist; otherwise it is rejected (referential integrity).

### Problem 9 [SQL · Concept · 4 pts · Elmasri 6.15]

EMPSUPERFK is changed to FOREIGN KEY (Super_ssn) REFERENCES EMPLOYEE(Ssn) ON DELETE CASCADE ON UPDATE CASCADE. (a) What happens on DELETE FROM EMPLOYEE WHERE Lname = 'Borg'? (b) CASCADE or SET NULL here?

*Solution.* (a) Borg (888665555) is the root of the supervision tree. Deleting him cascades to everyone he supervises (Wong, Wallace), then to everyone *they* supervise (Smith, Narayan, English, Zelaya, Jabbar): **all eight employees are deleted** (and, through other cascades, possibly their WORKS_ON and DEPENDENT rows; DEPARTMENT.Mgr_ssn references would block it if RESTRICT). (b) **SET NULL** is better: losing a supervisor should not delete the people they supervised.

### Problem 10 [SQL · Application · 4 pts · Elmasri 7.5]

(a) For each department whose average salary is more than 30000, the department name and number of employees. (b) The same but counting only male employees: can it be done?

*Solution.*

```sql
-- (a)
SELECT D.Dname, COUNT(*) FROM DEPARTMENT D JOIN EMPLOYEE E ON E.Dno = D.Dnumber
GROUP BY D.Dnumber, D.Dname
HAVING AVG(E.Salary) > 30000;
-- (b) the average must be over ALL employees, the count over men only
SELECT D.Dname, COUNT(*) FROM DEPARTMENT D JOIN EMPLOYEE E ON E.Dno = D.Dnumber
WHERE  E.Sex = 'M'
  AND  D.Dnumber IN (SELECT Dno FROM EMPLOYEE GROUP BY Dno HAVING AVG(Salary) > 30000)
GROUP BY D.Dnumber, D.Dname;
```

(b) Yes, but not by adding WHERE Sex = 'M' to (a): that would also restrict the average to men. The department condition goes into a nested query. On Figure 5.6: (a) Research 4, Administration 3, Headquarters 1; (b) Research 3, Administration 1, Headquarters 1.

### Problem 11 [SQL · Application · 6 pts · Elmasri 7.7]

Nested queries: (a) employees in the department of the highest-paid employee; (b) employees whose supervisor's supervisor has Ssn 888665555; (c) employees earning at least 10000 more than the lowest-paid employee.

*Solution.*

```sql
-- (a)
SELECT Fname, Lname FROM EMPLOYEE
WHERE Dno IN (SELECT Dno FROM EMPLOYEE WHERE Salary = (SELECT MAX(Salary) FROM EMPLOYEE));
-- (b)
SELECT Fname, Lname FROM EMPLOYEE
WHERE Super_ssn IN (SELECT Ssn FROM EMPLOYEE WHERE Super_ssn = '888665555');
-- (c)
SELECT Fname, Lname FROM EMPLOYEE
WHERE Salary >= 10000 + (SELECT MIN(Salary) FROM EMPLOYEE);
```

### Problem 12 [SQL · Application · 6 pts · Elmasri 7.8]

Views: (a) department name, manager name, manager salary; (b) employee name, supervisor name, salary for employees in Research; (c) project name, controlling department name, number of employees, total hours; (d) as (c) for projects with more than one employee.

*Solution.*

```sql
CREATE VIEW DEPT_MGR AS
  SELECT D.Dname, E.Fname, E.Lname, E.Salary
  FROM DEPARTMENT D JOIN EMPLOYEE E ON D.Mgr_ssn = E.Ssn;
CREATE VIEW RESEARCH_EMP AS
  SELECT E.Fname, E.Lname, S.Fname AS Sup_fname, S.Lname AS Sup_lname, E.Salary
  FROM EMPLOYEE E JOIN DEPARTMENT D ON E.Dno = D.Dnumber
                  LEFT JOIN EMPLOYEE S ON E.Super_ssn = S.Ssn
  WHERE D.Dname = 'Research';
CREATE VIEW PROJ_SUMMARY AS
  SELECT P.Pname, D.Dname, COUNT(W.Essn) AS Num_emps, SUM(W.Hours) AS Total_hours
  FROM PROJECT P JOIN DEPARTMENT D ON P.Dnum = D.Dnumber
                 LEFT JOIN WORKS_ON W ON W.Pno = P.Pnumber
  GROUP BY P.Pnumber, P.Pname, D.Dname;
CREATE VIEW PROJ_SUMMARY_BIG AS
  SELECT P.Pname, D.Dname, COUNT(*) AS Num_emps, SUM(W.Hours) AS Total_hours
  FROM PROJECT P JOIN DEPARTMENT D ON P.Dnum = D.Dnumber JOIN WORKS_ON W ON W.Pno = P.Pnumber
  GROUP BY P.Pnumber, P.Pname, D.Dname
  HAVING COUNT(*) > 1;
```

LEFT JOIN to the supervisor keeps employees with none (Borg-style roots).

### Problem 13 [SQL · Concept · 5 pts · Elmasri 7.9]

DEPT_SUMMARY(D, C, Total_s, Average_s) AS SELECT Dno, COUNT(*), SUM(Salary), AVG(Salary) FROM EMPLOYEE GROUP BY Dno. Which are allowed? (a) SELECT * FROM DEPT_SUMMARY; (b) SELECT D, C … WHERE Total_s > 100000; (c) SELECT D, Average_s … WHERE C > (SELECT C … WHERE D = 4); (d) UPDATE DEPT_SUMMARY SET D = 3 WHERE D = 4; (e) DELETE FROM DEPT_SUMMARY WHERE C > 4.

*Solution.* Queries (a)–(c) are allowed (query modification rewrites them on EMPLOYEE). (a) rows (5, 4, 133000, 33250), (4, 3, 93000, 31000), (1, 1, 55000, 55000). (b) becomes `SELECT Dno, COUNT(*) FROM EMPLOYEE GROUP BY Dno HAVING SUM(Salary) > 100000` → (5, 4). (c) departments with more employees than department 4's 3 → (5, 33250). Updates (d) and (e) are **not allowed**: the view is defined with grouping and aggregates, so a view row does not correspond to one base row (changing D would mean moving all department-4 employees; deleting a summary row has no single meaning).

### Problem 14 [SQL · Application · 5 pts · Elmasri 10.7]

Embedded SQL in C: read a student's name and print their GPA (A = 4, B = 3, C = 2, D = 1).

*Solution.*

```c
EXEC SQL BEGIN DECLARE SECTION;
  varchar sname[31]; char grade[2]; int credits;
  int SQLCODE;
EXEC SQL END DECLARE SECTION;

prompt("Student name: ", sname);
EXEC SQL DECLARE G CURSOR FOR
  SELECT R.Grade, C.Credit_hours
  FROM   STUDENT S, GRADE_REPORT R, SECTION X, COURSE C
  WHERE  S.Name = :sname AND S.Student_number = R.Student_number
    AND  R.Section_identifier = X.Section_identifier AND X.Course_number = C.Course_number;
EXEC SQL OPEN G;
float points = 0; int hours = 0;
EXEC SQL FETCH FROM G INTO :grade, :credits;
while (SQLCODE == 0) {
    int p = grade[0]=='A' ? 4 : grade[0]=='B' ? 3 : grade[0]=='C' ? 2 : grade[0]=='D' ? 1 : 0;
    points += p * credits; hours += credits;
    EXEC SQL FETCH FROM G INTO :grade, :credits;
}
EXEC SQL CLOSE G;
if (hours > 0) printf("GPA = %.2f\n", points / hours); else printf("No grades\n");
```

Key points: host variables declared in the DECLARE SECTION and prefixed with ':' in SQL; a cursor because the query returns many rows; the loop stops when SQLCODE becomes 100 (no more rows). Weighting by credit hours is the usual definition; an unweighted average is acceptable if stated.

## C. Past papers (other years; style differs)

### Problem 15 [SQL · Application · 6 pts · M25 endsem Q1]

Hospital: Patients(PatientID, FirstName, LastName, DOB, BloodType), Doctors(DoctorID, FirstName, LastName, Specialty, HireDate), Admissions(AdmissionID, PatientID, DoctorID, AdmissionDate, Diagnosis). (a) Blood types shared by more than one patient, with PatientCount, descending. (b) Patients whose LastName is longer than five letters or whose BloodType is negative. (c) Set the diagnosis of Rebecca Adler's most recent admission to 'Cluster Headache' without using AdmissionID directly.

*Solution.*

```sql
-- (a)
SELECT BloodType, COUNT(*) AS PatientCount FROM Patients
GROUP BY BloodType HAVING COUNT(*) > 1
ORDER BY PatientCount DESC;
-- (b)
SELECT * FROM Patients
WHERE LENGTH(LastName) > 5 OR BloodType LIKE '%-';      -- or LastName LIKE '______%'
-- (c)
UPDATE Admissions
SET Diagnosis = 'Cluster Headache'
WHERE PatientID = (SELECT PatientID FROM Patients WHERE FirstName = 'Rebecca' AND LastName = 'Adler')
  AND AdmissionDate = (SELECT MAX(A.AdmissionDate) FROM Admissions A
                       WHERE A.PatientID = (SELECT PatientID FROM Patients
                                            WHERE FirstName = 'Rebecca' AND LastName = 'Adler'));
```

MySQL forbids a subquery on the table being updated; wrap it in a derived table (`SELECT MAX(...) FROM (SELECT ...) T`) or use `ORDER BY AdmissionDate DESC LIMIT 1` in the UPDATE.

### Problem 16 [SQL · Application · 4 pts · M25 endsem Q1(d)B]

List every doctor and the number of admissions they handled, including doctors with zero, highest first, using a JOIN.

*Solution.* See the Learn section: Doctors LEFT JOIN Admissions, GROUP BY the doctor's key and names, COUNT(A.AdmissionID), ORDER BY count DESC. On the sample data: 701 has 2; 703, 704, 705, 706 have 1; 702 (Cuddy) has 0 and must appear.

### Problem 17 [SQL · Concept · 3 pts · M25 endsem Q3]

Query A: SELECT EmployeeID, SUM(SaleAmount) FROM Sales WHERE SaleAmount > 100 GROUP BY EmployeeID. Query B: … GROUP BY EmployeeID HAVING SaleAmount > 100. Which is correct?

*Solution.* **A**. WHERE filters individual sales before grouping, so SUM adds only sales over 100. **B fails**: HAVING is evaluated per group, and SaleAmount is not a single value per group (not grouped, not aggregated); standard SQL rejects it. Even if a DBMS accepted it, it would test an arbitrary row of the group.

### Problem 18 [SQL · Numerical · 5 pts · M23 endsem Q3]

Students(1 Alice CS 21, 2 Bob Physics 22, 3 Charlie Physics 20, 4 David Mathematics 23, 5 Emily CS 22); Courses(101 Database Design, 102 Physics I, 103 Calculus II, 104 Genetics, 105 Organic Chem); Registrations(1→101 A, 2→102 B, 3→103 C, 4→104 B, 5→105 A). Give the output of: (a) students JOIN registrations JOIN courses WHERE grade = 'A' AND major = 'Computer Science', showing student_id, student_name, course_name, grade; (b) SELECT students.major, AVG(students.age) AS average_age FROM students RIGHT OUTER JOIN registrations ON … GROUP BY students.major ORDER BY average_age.

*Solution.* (a) (1, Alice, Database Design, A), (5, Emily, Organic Chem, A). (b) Every registration matches a student, so the right join equals the inner join: Physics (22 + 20)/2 = **21**, Computer Science (21 + 22)/2 = **21.5**, Mathematics **23**. In ascending order: Physics 21, Computer Science 21.5, Mathematics 23. Row order counts because of ORDER BY.

### Problem 19 [SQL · Application · 6 pts · M23 endsem Q2]

Restaurants(r_id, restaurant_name, location, cuisine_type), Orders(order_id, customer_id, restaurant_id, order_date, amount), Customers(c_id, customer_name, …), Chefs(chef_id, chef_name, specialty, years_of_experience, restaurant_id). (a) Revenue per restaurant in October of this year, descending. (b) The customer who spent the most. (c) Restaurants whose average order exceeds the overall average order. (d) Restaurants whose chefs average more than 7 years' experience.

*Solution.*

```sql
-- (a)
SELECT R.restaurant_name, R.location, SUM(O.amount) AS Revenue
FROM Restaurants R JOIN Orders O ON R.r_id = O.restaurant_id
WHERE O.order_date BETWEEN '2023-10-01' AND '2023-10-31'
GROUP BY R.r_id, R.restaurant_name, R.location
ORDER BY Revenue DESC;
-- (b) ties kept
SELECT C.customer_name, SUM(O.amount) AS Total
FROM Customers C JOIN Orders O ON C.c_id = O.customer_id
GROUP BY C.c_id, C.customer_name
HAVING SUM(O.amount) >= ALL (SELECT SUM(amount) FROM Orders GROUP BY customer_id);
-- (c)
SELECT restaurant_name FROM Restaurants
WHERE r_id IN (SELECT restaurant_id FROM Orders GROUP BY restaurant_id
               HAVING AVG(amount) > (SELECT AVG(amount) FROM Orders));
-- (d)
SELECT R.restaurant_name FROM Restaurants R JOIN Chefs C ON R.r_id = C.restaurant_id
GROUP BY R.r_id, R.restaurant_name HAVING AVG(C.years_of_experience) > 7;
```

The 2023 key accepted LIMIT 1 for (b); this year's rubric style would ask you to handle ties or state the assumption that there is a unique maximum.

### Problem 20 [SQL · Application · 3 pts · M25 endsem Q4]

The DBMS has no FULL OUTER JOIN. Compute the full outer join of A and B on attribute k with basic SQL.

*Solution.* `SELECT * FROM A LEFT JOIN B ON A.k = B.k UNION SELECT * FROM A RIGHT JOIN B ON A.k = B.k;` UNION removes the duplicated matched rows. If the tables may contain genuine duplicate rows, use `UNION ALL` with the second part restricted to `WHERE A.k IS NULL` (only B's unmatched rows), so nothing is lost or double-counted. Without RIGHT JOIN, swap the operands of a LEFT JOIN.
