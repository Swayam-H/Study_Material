# Reference: Videos for the endsem, topic by topic

One short lecture and one problem-solving video for each endsem topic, in chapter order, each followed by this site's own worked problems. The exam is **Monday 23 November, 3 PM**, so watch only the topics you are weakest on and spend the rest of the time on the Practice pages.

**How these were picked.** All links come from a web search on 21 Nov 2026 that matched them by title to the Elmasri topics on your syllabus. I could not open YouTube from where this list was made, so **lengths, channels, view counts and comments were not checked**. The list is not ranked by reviews. Before you commit to a video, check that its length is about an hour or less and skim its comments. If one turns out to be poor, skip it and use the second option.

Kamal's style is proofs, stated assumptions and open queries, while most YouTube DBMS videos aim at GATE-style one-line answers. Use the videos for the method, then practise in his style on this site.

## 1. Relational model, keys and constraints

- **Watch:** [Finding candidate keys using closure of a set of attributes](https://www.youtube.com/watch?v=HE_1BDeGpSA). This also covers the first step of chapter 4.
- **Problems:** [Finding Candidate Key, GATE question solved](https://www.youtube.com/watch?v=VQrHLz8Stec)
- **On this site:** [Chapter 1 Practice](../ch1-relational-model/practice.html) (superkey counting, constraint violations). Quick check 1 is below.

## 2. ER and EER modelling

- **Watch:** [E-R Model in DBMS One Shot](https://www.youtube.com/watch?v=Y0j5kJ7a5PU), then [Extended Entity Relationship Models (EER diagrams)](https://www.youtube.com/watch?v=NKjTajqtytQ)
- **More on constraints:** [Ternary and Cardinality](https://www.youtube.com/watch?v=2AFX10h6kV4) and [Cardinality limits, Strong and Weak Entity Set in E R Diagrams](https://www.youtube.com/watch?v=-H_n_eAJeSA)
- **Problems:** [Exercises based on ER Model Concepts (Part 1)](https://www.youtube.com/watch?v=l9BRmq7pgZ8)
- **On this site:** [Chapter 2 Practice](../ch2-er-eer/practice.html) (Assignment 2 and past papers). Quick check 2 is below.

Many videos use Chen's 1:N notation. Kamal also uses (min, max), so check which end each number goes on against the [Chapter 2 Reference](../ch2-er-eer/reference.html).

## 3. Mapping EER to relations

- **Watch:** [ER to Relational mapping: ER diagram conversion into tables](https://www.youtube.com/watch?v=v3qGAu88ifI), then [Mapping specialization and generalization into relational mapping (Elmasri ch 9)](https://www.youtube.com/watch?v=nnrhpPHiOBg)
- **Problems:** [Mapping of EER to Relational model](https://www.youtube.com/watch?v=WOFYySkSrQQ)
- **On this site:** [Chapter 3 Practice](../ch3-mapping/practice.html). Quick check 3 is below.

## 4. Functional dependencies and normalisation

This topic carries the most marks across past papers (M23 Q4–Q6, M25 Q5–Q6, all of A4).

- **Watch:** [Normalization in DBMS: 1NF 2NF 3NF BCNF 4NF 5NF, all normal forms in one lecture](https://www.youtube.com/watch?v=OMhBXd-ETFU)
- **Algorithms:** [COMP3311 Wk9: Minimal Cover, 3NF and BCNF Decomposition](https://www.youtube.com/watch?v=gztYPy940Mw) (UNSW). It is the closest match to Elmasri's 3NF synthesis and BCNF decomposition algorithms.
- **Problems:** [Normalization, BCNF, 3NF, Lossless Decomposition and Dependency Preserving: 3-in-1 GATE 2019 question](https://www.youtube.com/watch?v=JMOCbSbpf-4), and [How to find Minimal Cover](https://www.youtube.com/watch?v=6FTxqGj6mFI)
- **On this site:** [Chapter 4 Practice](../ch4-normalisation/practice.html) (A4 proofs and four-part problems). Quick check 4 is below.

## 5. Relational algebra

- **Watch:** [Relational Algebra: Select, Project, Join, Division](https://www.youtube.com/watch?v=lbhSPUSRjvE)
- **Problems:** [Relational Algebra Queries (Part 1)](https://www.youtube.com/watch?v=Dgq01JAWw4Y) and [(Part 2)](https://www.youtube.com/watch?v=4y4tBfnPlS8), then [Relational Algebra Questions with Solution, Part 1](https://www.youtube.com/watch?v=5KlHir314FQ) and [Part 2](https://www.youtube.com/watch?v=jflJnvTHFAg)
- **On this site:** [Chapter 5 Practice](../ch5-relational-algebra/practice.html) (all A5 BOOKS queries, Elmasri 8.15–8.22). Quick check 5 is below.

## 6. Tuple relational calculus

- **Watch:** [Tuple Relational Calculus (Formal Definition)](https://www.youtube.com/watch?v=4xb6ODQ9XFM)
- **Problems:** [Tuple Relational Calculus (Example Queries)](https://www.youtube.com/watch?v=KTD6nU0s3Ak), then [TRC Query Example 1](https://www.youtube.com/watch?v=zS6Ey6v8YBg) and [Example 2](https://www.youtube.com/watch?v=xH1F8zviKls)
- **On this site:** [Chapter 6 Practice](../ch6-trc/practice.html) (Elmasri 8.24–8.29). Quick check 6 is below.

TRC is exam-only this year with no assignment, so expect at least one "for all" query. That pattern is quick check 6.

## 7. SQL

- **Watch:** [SQL Tutorial (JOIN, GROUP BY, SUBQUERY, HAVING, IN)](https://www.youtube.com/watch?v=i_VWvDiftdc), then [Correlated and Non-Correlated Subquery in SQL](https://www.youtube.com/watch?v=QaRVoXOyob8)
- **Division in SQL:** [Understanding Relational Division in SQL](https://www.youtube.com/watch?v=KJvo1XfiKPE)
- **Problems:** [Practice Questions on SQL: Sub Queries](https://www.youtube.com/watch?v=MLM7wNBeCIk)
- **On this site:** [Chapter 7 Practice](../ch7-sql/practice.html) (A6, Elmasri 6.x and 7.x, past papers). Quick check 7 is below.

## After the videos

Sit the [mock endsem](../mock-endsem/mock-endsem.html) in one timed sitting, then write your two A4 sheets from the [cheat sheet](../cheat-sheet/cheat-sheet.html).

# Practice: Quick checks for each topic

One problem per topic, written in Kamal's style. Write your assumptions first, then the answer, then open the solution. Problems 5 to 7 are the same query in RA, TRC and SQL, using Elmasri's COMPANY schema.

### Problem 1 [Keys · Application · Quick check]

R(A, B, C, D, E) has F = {AB → C, C → D, D → A}. Find every candidate key of R. Justify.

*Solution.*

**Step 1: attributes in every key.** B and E appear on no right-hand side, so nothing can derive them. Every key must contain both.

**Step 2: is BE enough?** (BE)⁺ = {B, E}, because no FD fires. So BE is not a superkey, and every key is BE plus at least one of A, C, D.

**Step 3: try each addition.**
- (ABE)⁺: AB → C gives C, C → D gives D. So (ABE)⁺ = ABCDE, a superkey.
- (BCE)⁺: C → D gives D, D → A gives A. So (BCE)⁺ = ABCDE.
- (BDE)⁺: D → A gives A, AB → C gives C. So (BDE)⁺ = ABCDE.

Each is minimal, because removing any attribute leaves BE or drops B or E, and none of those is a superkey.

**Answer.** The candidate keys are **ABE, BCE and BDE**. The prime attributes are therefore all five: A, B, C, D, E.

### Problem 2 [ER · Application · Quick check]

An employee's dependents are identified only by their first name, and two employees may each have a dependent called "Asha". Model DEPENDENT in ER and give the (min, max) pair on each side of the relationship. State your assumptions.

*Solution.*

**Assumptions.**
- A1: every dependent belongs to exactly one employee. *(Reason: "an employee's dependents".)*
- A2: an employee may have no dependents. *(Reason: nothing says every employee has one.)*

**Answer.**
- DEPENDENT is a **weak entity type** (double rectangle), because its name alone does not identify it.
- Its owner is EMPLOYEE, through the **identifying relationship** DEPENDENTS_OF (double diamond).
- Name is the **partial key** (dashed underline). A dependent is identified by (employee's Ssn, Name).
- DEPENDENT has **total participation** (double line), and EMPLOYEE has partial participation.
- (min, max) pairs: DEPENDENT in DEPENDENTS_OF is **(1, 1)** by A1. EMPLOYEE in DEPENDENTS_OF is **(0, N)** by A2.

### Problem 3 [Mapping · Application · Quick check]

EMPLOYEE(Ssn, Name, Salary) has subclasses SECRETARY(TypingSpeed) and ENGINEER(EngType). The specialization is **disjoint and total**. Which of Elmasri's options 8A–8D can map it? Give the relations for the option you would choose and say why.

*Solution.*

- **8A** (superclass relation plus one relation per subclass) works for any specialization.
- **8B** (subclass relations only, each with the inherited attributes) needs a **total** specialization, or employees in no subclass would be lost. It is also best for disjoint ones, or overlapping employees would be stored twice. Both conditions hold here, so it works.
- **8C** (one relation plus a type attribute) needs **disjoint**, which holds here.
- **8D** (one relation plus a Boolean flag per subclass) works for overlapping and also for disjoint. It is valid but wasteful here.

**My choice: 8C.** Keys are in bold. It gives EMPLOYEE(**Ssn**, Name, Salary, JobType, TypingSpeed, EngType). It is a single table with no joins, and JobType enforces disjointness. The cost is NULLs, because TypingSpeed is NULL for engineers and EngType is NULL for secretaries.

8A would be EMPLOYEE(**Ssn**, Name, Salary), SECRETARY(**Ssn**, TypingSpeed) and ENGINEER(**Ssn**, EngType), with each subclass Ssn a foreign key to EMPLOYEE. It is also a full-credit answer if you justify it.

### Problem 4 [Normalisation · Application · Quick check]

R(A, B, C, D) has F = {A → B, B → C}. (a) Find the key. (b) What is the highest normal form of R? (c) Decompose R into BCNF and say whether the decomposition is lossless and dependency-preserving.

*Solution.*

**(a)** A and D appear on no right-hand side, so both are in every key. (AD)⁺ = {A, D, B, C} = R. So **AD is the only candidate key**. The prime attributes are A and D.

**(b)** In A → B, A is a proper subset of the key and B is non-prime, so this is a **partial dependency** and R is not in 2NF. R is in **1NF** only (assuming atomic values).

**(c)** A → B violates BCNF, because A is not a superkey. Take A⁺ = {A, B, C}:
- R1(A, B, C) with A → B and B → C, and R2(A, D).
- In R1, B → C still violates BCNF (B⁺ = {B, C}), so split R1 into R11(B, C) and R12(A, B).

**Result** (keys in bold): (**B**, C), (**A**, B), (**A**, **D**).

- **Lossless:** yes. Each split is on X → Y, where X is the common attribute and X is a key of one part. For example, R12 ∩ R11 = {B}, and B → C makes B a key of R11.
- **Dependency-preserving:** yes. A → B lies in (A, B) and B → C lies in (B, C).

### Problem 5 [Relational algebra · Application · Quick check]

COMPANY schema: EMPLOYEE(Fname, Lname, Ssn, …), PROJECT(Pname, Pnumber, Plocation, Dnum), WORKS_ON(Essn, Pno, Hours). In relational algebra, find the names of employees who work on **every** project controlled by department 5.

*Solution.*

This is a "for all" query, so use **division**.

DEPT5_PROJS ← ρ₍Pno₎(π_Pnumber(σ_Dnum=5(PROJECT)))

EMP_PROJ ← ρ₍Ssn, Pno₎(π_Essn, Pno(WORKS_ON))

RESULT_SSNS ← EMP_PROJ ÷ DEPT5_PROJS

RESULT ← π_Fname, Lname(RESULT_SSNS * EMPLOYEE)

The renames make the divisor's attribute (Pno) match the dividend's, and make Ssn line up for the natural join with EMPLOYEE.

**Edge case worth stating.** If department 5 controls no projects, the divisor is empty and the result is every employee who appears in WORKS_ON. State that as an assumption. Note that, strictly, "every project" is vacuously true for all employees, including those who work on nothing.

### Problem 6 [TRC · Application · Quick check]

Write the query from Problem 5 in tuple relational calculus.

*Solution.*

{ e.Fname, e.Lname | EMPLOYEE(e) AND (∀x)( NOT PROJECT(x) OR NOT (x.Dnum = 5) OR (∃w)( WORKS_ON(w) AND w.Essn = e.Ssn AND w.Pno = x.Pnumber ) ) }

Read it as: for every tuple x, either x is not a department-5 project, or e works on it.

The equivalent form without ∀ is the one that maps directly to SQL:

{ e.Fname, e.Lname | EMPLOYEE(e) AND NOT (∃x)( PROJECT(x) AND x.Dnum = 5 AND NOT (∃w)( WORKS_ON(w) AND w.Essn = e.Ssn AND w.Pno = x.Pnumber ) ) }

That is, there is no department-5 project that e does not work on. This version is **safe**, because every output value comes from EMPLOYEE.

### Problem 7 [SQL · Application · Quick check]

Write the query from Problem 5 in SQL, using NOT EXISTS.

*Solution.*

```sql
SELECT e.Fname, e.Lname
FROM EMPLOYEE e
WHERE NOT EXISTS (            -- there is no project ...
  SELECT *
  FROM PROJECT p
  WHERE p.Dnum = 5            -- ... controlled by dept 5 ...
    AND NOT EXISTS (          -- ... that e does not work on
      SELECT *
      FROM WORKS_ON w
      WHERE w.Essn = e.Ssn
        AND w.Pno = p.Pnumber));
```

This is the second TRC form from Problem 6, line for line. Unlike the RA division, it returns employees who work on nothing when department 5 has no projects, because the condition is vacuously true. Say which behaviour you assume.

A counting version, where COUNT(DISTINCT Pno) for e equals the number of department-5 projects, is also correct if the WHERE clause restricts it to department-5 projects. It is easier to get wrong, so write NOT EXISTS in the exam.
