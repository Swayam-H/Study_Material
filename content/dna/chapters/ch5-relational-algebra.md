# Learn: Relational algebra

Relational algebra (RA) is a small set of operations that take relations and return a relation. Every SQL query is translated into an RA expression before it runs, and this course tests RA directly: Assignment 5 asked for three RA queries (individual) and a proof plus three queries (group) on a BOOKS database. Sources: Elmasri and Navathe 7e sections 8.1–8.5; Kamal's practice exercises 8.15–8.17 and 8.22; Assignment 5 keys and rubrics; past-paper outer-join questions.

> **Study path.** Learn the operations in the order below and do Practice A (the real A5 questions) on paper. Most RA questions are one of five patterns: *select–join–project*, *set difference for "no" or "not all"*, *self-join for comparing two rows*, *division for "every"*, and *grouping for counts*. The pattern list in the Reference is the fastest revision.

## The notation

| Operation | Symbol | Result |
| --- | --- | --- |
| Selection | $\sigma_{c}(R)$ | Rows of R satisfying condition c |
| Projection | $\pi_{L}(R)$ | Columns L of R, **duplicates removed** |
| Rename | $\rho_{S(B_1,\dots,B_n)}(R)$ | R renamed to S with attributes B1…Bn |
| Union, intersection, difference | $R \cup S$, $R \cap S$, $R - S$ | Set operations; R and S must be **union-compatible** |
| Cartesian product | $R \times S$ | Every row of R paired with every row of S |
| Theta join | $R \bowtie_{c} S$ | $\sigma_c(R \times S)$ |
| Equijoin | $R \bowtie_{A=B} S$ | Theta join with only = conditions; both A and B kept |
| Natural join | $R * S$ or $R \bowtie S$ | Equijoin on all same-named attributes, one copy kept |
| Division | $R \div S$ | Values of R's extra attributes paired with **every** row of S |
| Aggregate / grouping | $\gamma_{G;\,F(A)\to N}(R)$, Elmasri: $_{G}\mathcal{F}_{F\,A}(R)$ | One row per group of G with aggregate values |
| Outer joins | ⟕ left, ⟖ right, ⟗ full | Join plus unmatched rows padded with NULL |
| Assignment | $T \leftarrow E$ | Names an intermediate result |

**Selection** $\sigma_c(R)$: c is built from comparisons (=, ≠, <, ≤, >, ≥) of attributes and constants, joined with AND, OR, NOT. It is applied row by row, so it can never compare two different rows (that needs a join). Selection is commutative and cascades: $\sigma_{c_1}(\sigma_{c_2}(R)) = \sigma_{c_1 \wedge c_2}(R)$.

**Projection** $\pi_L(R)$: keeps the listed columns and **removes duplicate rows** (relations are sets). This is the main difference from SQL SELECT, which keeps duplicates unless you write DISTINCT. If L contains a key, the number of rows does not change.

**Rename** $\rho$: needed to (a) join a relation with itself (self-join), (b) make attribute names match for a natural join or set operation, (c) name results.

## Set operations

R and S are **union-compatible** if they have the same number of attributes and the i-th attributes have the same domain. Then $R \cup S$, $R \cap S$, $R - S$ are defined; the result takes R's attribute names. ∪ and ∩ are commutative and associative; − is neither. $R \cap S = R - (R - S)$.

**Difference is how RA says "not".** "Employees who work on no project" = all employees minus those who work on some project:

$$\pi_{\text{Ssn}}(\text{EMPLOYEE}) - \rho_{(\text{Ssn})}(\pi_{\text{Essn}}(\text{WORKS\_ON}))$$

## Products and joins

$R \times S$ pairs every row with every row: |R| × |S| rows, degree deg R + deg S. On its own it is meaningless; followed by a selection it is a join.

**Theta join** $R \bowtie_c S = \sigma_c(R \times S)$. **Equijoin**: only equality comparisons; the joined attributes both appear. **Natural join** $R * S$: equality on **all attributes with the same name**, keeping one copy. If R and S share no attribute names, the natural join is a Cartesian product. If they share *all* names, it is the intersection (A5 group Q1, proved below). Rows with NULL in a join attribute never match.

The **join selectivity** is |R ⋈ S| / (|R| × |S|). A join on a foreign key to a key returns at most |R| rows.

**Outer joins** keep rows that find no partner:
- **Left outer** R ⟕ S: every row of R; unmatched ones padded with NULLs in S's attributes.
- **Right outer** R ⟖ S: every row of S.
- **Full outer** R ⟗ S: both.

Use an outer join whenever the question says "for each X … including those with none": "every department and its employee count, including departments with no employees".

A left outer join can be built from the basic operations (M24 Quiz 4 Q1):

$$\begin{aligned} T_1 &\leftarrow R \bowtie_{c} S \\ T_2 &\leftarrow R - \pi_{\text{attrs}(R)}(T_1) \\ R ⟕_c S &= T_1 \cup (T_2 \times \{(\text{NULL},\dots,\text{NULL})\}) \end{aligned}$$

## Division

$R(Z) \div S(X)$ with X ⊆ Z, Y = Z − X: the Y-values y such that **for every** tuple s in S, (y, s) is in R. "Employees who work on **all** the projects that John Smith works on":

$$ \begin{aligned} \text{SMITH\_PNOS} &\leftarrow \pi_{\text{Pno}}(\text{WORKS\_ON} \\ &\qquad \bowtie_{\text{Essn}=\text{Ssn}} \sigma_{\text{Fname}=\text{`John'} \wedge \text{Lname}=\text{`Smith'}}(\text{EMPLOYEE})) \\ \text{SSN\_PNOS} &\leftarrow \pi_{\text{Essn},\text{Pno}}(\text{WORKS\_ON}) \\ \text{ANSWER} &\leftarrow \text{SSN\_PNOS} \div \text{SMITH\_PNOS} \end{aligned} $$

Division from basic operations (know this; exams ask it):

$$\boxed{R \div S = \pi_Y(R) - \pi_Y\big((\pi_Y(R) \times S) - R\big)}$$

Read it as: all candidates, minus those candidates that are *missing* some required partner. The middle part $(\pi_Y(R) \times S) - R$ lists every (candidate, required) pair that does not occur.

## Aggregates and grouping

$\gamma_{G;\,F_1(A_1)\to N_1,\dots}(R)$ groups R by the attributes G and computes aggregates COUNT, SUM, AVG, MIN, MAX in each group. With no G, the whole relation is one group. Elmasri writes $_{\text{Dno}}\mathcal{F}_{\text{COUNT Ssn},\ \text{AVERAGE Salary}}(\text{EMPLOYEE})$.

- COUNT(A) counts rows where A is not NULL; duplicates in the group are counted unless you project first (A5 key: π the (book, author) pairs before counting so each author counts once).
- A group exists only if it has at least one row: a department with no employees **does not appear** in $\gamma_{\text{Dno}}$ of EMPLOYEE. To include it, use an outer join first and COUNT a column from the inner side (counts NULL as 0).
- To filter on an aggregate (SQL HAVING), apply σ *after* γ.

## Recursive closure and other notes

RA cannot express **recursive closure** (all supervisees at any depth) in one expression; each level needs another join. SQL handles it with recursive queries (WITH RECURSIVE, Elmasri 7.1.10) or with a loop in a stored procedure (GA6 did a topological sort that way).

**Complete set**: {σ, π, ∪, ρ, −, ×} can express all the others ($R \cap S$ via −, joins via × and σ, division via the formula above).

## How to write an RA answer that earns an A

Kamal's A5 keys always: (1) state **keys and foreign keys** as assumptions; (2) state the reading of any ambiguous word ("younger", "authors of a book", "number of authors"); (3) give a **step-by-step derivation** with ← and a final single expression; (4) explain each step in a numbered list, including why duplicates or empty groups are handled correctly. The rubric gives marks for the right **pattern** (difference for "all", union of the two author roles, separate counts), and accepts alternatives that follow from a stated assumption.

# Reference: Relational algebra

## Operation laws

- $\sigma_{c_1 \wedge c_2}(R) = \sigma_{c_1}(\sigma_{c_2}(R))$; σ commutes with σ.
- $\pi_{L_1}(\pi_{L_2}(R)) = \pi_{L_1}(R)$ when $L_1 \subseteq L_2$.
- $R \bowtie_c S = \sigma_c(R \times S)$; $R \cap S = R - (R - S)$.
- Sizes: $|R \times S| = |R|\cdot|S|$; $|\pi_L(R)| \le |R|$ (= if L has a key); $|R \cup S| \le |R| + |S|$; $|R \cap S| \le \min(|R|, |S|)$.
- Natural join over all attributes = intersection; over none = Cartesian product.
- Division: $R \div S = \pi_Y(R) - \pi_Y((\pi_Y(R) \times S) - R)$.

## Query patterns

| Question says | Pattern |
| --- | --- |
| "names of X that satisfy …" | σ on the facts, join to get names, π |
| "… with no …", "never", "not any" | all − those that do |
| "… than all / every …" | all − those that fail for some (or ÷) |
| "two different …", "same … as another" | self-join with ρ, condition on ≠ |
| "the most / largest" | γ MAX then join back (or: all − those with a bigger partner) |
| "for each …, number of …" | γ with COUNT; outer join first to keep zeros |
| "authors (of any role)" | ∪ of the two roles after renaming |
| "including those with none" | ⟕ |

## What to be able to do without notes

- Write any SPJ (select–project–join) query; know which join to use.
- Express "not", "all", "every", "only", "at least two" with −, ÷ and self-joins.
- Write division from basic operators, and a left outer join from basic operators.
- Use γ correctly (group key, rename, filter after).
- Compute the result of an RA expression on a given small instance (8.15, 8.22 style).
- Prove simple RA identities from definitions (A5 group Q1).

# Practice: Relational algebra

## A. Assignment 5 (this year)

Schema for A5 (individual paper): BOOKS(**ISBN**, AuthorName, Title, Publisher, YearofBook), COAUTHORS(**ISBN, JointAuthorName**), PERSONS(**Name**, YearofBirth, Residence), PUBLISHERS(**Publisher**, City). The group paper calls the attributes Author and JointAuthor. Assumptions used by the key: AuthorName, JointAuthorName → PERSONS.Name; BOOKS.Publisher → PUBLISHERS; COAUTHORS.ISBN → BOOKS; the senior author is not also listed as a coauthor; "younger" means a larger YearofBirth.

### Problem 1 [RA · Application · 5 pts · Assignment 5 individual Q1(a)]

Give the complete rows of books whose senior author is younger than all the coauthors of the book.

*Solution.*

$$ \begin{aligned} S &\leftarrow \rho_{S(\text{ISBN},\,\text{SYear})}\big(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{BOOKS} \\ &\qquad \bowtie_{\text{AuthorName}=\text{Name}} \text{PERSONS})\big) \\ C &\leftarrow \rho_{C(\text{ISBN},\,\text{CYear})}\big(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{COAUTHORS} \\ &\qquad \bowtie_{\text{JointAuthorName}=\text{Name}} \text{PERSONS})\big) \\ \text{NOTYOUNGER} &\leftarrow \pi_{\text{ISBN}}\big(\sigma_{\text{SYear} \le \text{CYear}}(S \\ &\qquad \bowtie C)\big) \\ \text{ANSWER} &\leftarrow \text{BOOKS} \bowtie \big(\pi_{\text{ISBN}}(\text{BOOKS}) \\ &\qquad - \text{NOTYOUNGER}\big) \end{aligned} $$

S ⋈ C joins on ISBN (the only common name after renaming), pairing the senior author's year with each coauthor's. A book is *not* a match if some coauthor is the same age or younger (SYear ≤ CYear). Subtracting gives books where the senior author is younger than every coauthor. A book with no coauthors never appears in S ⋈ C, so it is kept: "younger than all of an empty set" is true (state it). Joining back with BOOKS on the key gives complete rows. Also accepted, if you state that books without coauthors are excluded: replace π ISBN(BOOKS) by π ISBN(COAUTHORS), or compare SYear with $\gamma_{\text{ISBN};\,\text{MAX(CYear)}}(C)$.

### Problem 2 [RA · Application · 5 pts · Assignment 5 individual Q1(b)]

Give the book title and the number of authors for the book.

*Solution.*

$$ \begin{aligned} \text{AUTH} &\leftarrow \rho_{(\text{ISBN},\,\text{Author})}(\pi_{\text{ISBN},\,\text{AuthorName}}(\text{BOOKS})) \\ &\qquad \cup \rho_{(\text{ISBN},\,\text{Author})}(\pi_{\text{ISBN},\,\text{JointAuthorName}}(\text{COAUTHORS})) \\ \text{CNT} &\leftarrow \gamma_{\text{ISBN};\ \text{COUNT(Author)} \to \text{NumAuthors}}(\text{AUTH}) \\ \text{ANSWER} &\leftarrow \pi_{\text{Title},\,\text{NumAuthors}}(\text{BOOKS} \bowtie \text{CNT}) \end{aligned} $$

AUTH has one row per (book, author) including the senior author. Group on **ISBN**, not Title (two books can share a title). Every book has a senior author, so every book appears with NumAuthors ≥ 1. Alternative: left outer join BOOKS ⟕ COAUTHORS, count JointAuthorName (NULLs not counted) and add 1.

### Problem 3 [RA · Application · 5 pts · Assignment 5 individual Q1(c)]

For each city, give the total number of books published and the total number of authors.

*Solution.* A book is published in its publisher's city.

$$ \begin{aligned} \text{BC} &\leftarrow \pi_{\text{ISBN},\,\text{City}}(\text{BOOKS} \bowtie \text{PUBLISHERS}) \\ \text{NB} &\leftarrow \gamma_{\text{City};\ \text{COUNT(ISBN)} \to \text{NumBooks}}(\text{BC}) \\ \text{NA} &\leftarrow \gamma_{\text{City};\ \text{COUNT(Author)} \to \text{NumAuthors}}\big(\pi_{\text{City},\,\text{Author}}(\text{BC} \\ &\qquad \bowtie \text{AUTH})\big) \\ \text{ANSWER} &\leftarrow \text{NB} \bowtie \text{NA} \end{aligned} $$

The two counts must be computed **separately**: counting ISBN in BC ⋈ AUTH would count each book once per author. Projecting (City, Author) before counting makes each author count once per city. Other readings accepted if stated: count (book, author) pairs; count authors *residing* in the city.

### Problem 4 [RA · Proof · 5 pts · Assignment 5 group Q1]

R(A1, …, An) and S(A1, …, An) have the same attributes. Show that the natural join over A1, …, An equals R ∩ S.

*Solution.* By definition $R * S = \pi_{R.A_1,\dots,R.A_n}(\sigma_{R.A_1=S.A_1 \wedge \dots \wedge R.A_n=S.A_n}(R \times S))$; its schema is (A1, …, An), the same as R ∩ S.
(i) ⊆: if t ∈ R * S, there are r ∈ R, s ∈ S agreeing on every Ai with t = r[A1..An]. These are all the attributes, so t = r = s; hence t ∈ R and t ∈ S, so t ∈ R ∩ S.
(ii) ⊇: if t ∈ R ∩ S, the pair (t, t) ∈ R × S satisfies every equality, passes σ, and projects to t; so t ∈ R * S.
Both inclusions give equality. (Assume no NULLs: a NULL fails Ai = Ai.)

### Problem 5 [RA · Application · 5 pts · Assignment 5 group Q2(a)]

Give complete rows of books whose senior author lives in the city of the publisher.

*Solution.*

$$ \begin{aligned} &\pi_{\text{ISBN},\,\text{Author},\,\text{Title},\,\text{Publisher},\,\text{YearofBook}}\Big(\sigma_{\text{Residence}=\text{City}}\big((\text{BOOKS} \\ &\qquad \bowtie_{\text{Author}=\text{Name}} \text{PERSONS}) \bowtie \text{PUBLISHERS}\big)\Big) \end{aligned} $$

BOOKS and PERSONS share no attribute name, so that join needs an explicit condition. The natural join with PUBLISHERS is on Publisher. Alternative: rename PERSONS to (Author, YearofBirth, City) and natural-join all three, so the city match happens in the join itself.

### Problem 6 [RA · Application · 5 pts · Assignment 5 group Q2(b)]

Give coauthor name and the number of books the coauthor published.

*Solution.* A coauthor is anyone listed in COAUTHORS; count all distinct books they wrote in either role.

$$ \begin{aligned} \text{AUTH} &\leftarrow \rho_{(\text{ISBN},\,\text{Name})}(\pi_{\text{ISBN},\,\text{Author}}(\text{BOOKS})) \\ &\qquad \cup \rho_{(\text{ISBN},\,\text{Name})}(\pi_{\text{ISBN},\,\text{JointAuthor}}(\text{COAUTHORS})) \\ \text{CO} &\leftarrow \rho_{(\text{Name})}(\pi_{\text{JointAuthor}}(\text{COAUTHORS})) \\ \text{ANSWER} &\leftarrow \gamma_{\text{Name};\ \text{COUNT(ISBN)} \to \text{NumBooks}}(\text{AUTH} \\ &\qquad \bowtie \text{CO}) \end{aligned} $$

Also accepted if stated that only coauthored books count: $\gamma_{\text{JointAuthor};\ \text{COUNT(ISBN)}}(\text{COAUTHORS})$.

### Problem 7 [RA · Application · 5 pts · Assignment 5 group Q2(c)]

Give the complete rows of authors who published a book before a coauthor of a subsequent book of theirs was born.

*Solution.* Two copies of BOOKS (earlier book B1, later book B2, same senior author) and the coauthors' birth years of B2:

$$ \begin{aligned} B_1 &\leftarrow \rho_{(\text{ISBN1},\,\text{Author},\,Y_1)}(\pi_{\text{ISBN},\,\text{Author},\,\text{YearofBook}}(\text{BOOKS})) \\ B_2 &\leftarrow \rho_{(\text{ISBN2},\,\text{Author},\,Y_2)}(\pi_{\text{ISBN},\,\text{Author},\,\text{YearofBook}}(\text{BOOKS})) \\ ZB &\leftarrow \rho_{(\text{ISBN2},\,\text{ZYear})}(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{COAUTHORS} \\ &\qquad \bowtie_{\text{JointAuthor}=\text{Name}} \text{PERSONS})) \\ X &\leftarrow \pi_{\text{Author}}\big(\sigma_{Y_2 > Y_1 \wedge \text{ZYear} > Y_1}(B_1 \\ &\qquad \bowtie B_2 \bowtie ZB)\big) \\ \text{ANSWER} &\leftarrow \text{PERSONS} \bowtie \rho_{(\text{Name})}(X) \end{aligned} $$

B1 ⋈ B2 joins on Author (same senior author); renaming ISBN to ISBN2 in ZB attaches the coauthors of the *later* book. Y2 > Y1 makes it subsequent (and excludes pairing a book with itself); ZYear > Y1 means the coauthor was born after the earlier book. All conditions sit in one σ, so they refer to the same author, books and coauthor. This is the self-join pattern.

## B. Textbook exercises set by Kamal (COMPANY schema)

COMPANY: EMPLOYEE(Fname, Minit, Lname, **Ssn**, Bdate, Address, Sex, Salary, Super_ssn, Dno), DEPARTMENT(Dname, **Dnumber**, Mgr_ssn, Mgr_start_date), DEPT_LOCATIONS(**Dnumber, Dlocation**), PROJECT(Pname, **Pnumber**, Plocation, Dnum), WORKS_ON(**Essn, Pno**, Hours), DEPENDENT(**Essn, Dependent_name**, Sex, Bdate, Relationship).

### Problem 8 [RA · Application · 10 pts · Elmasri 8.16 a–e]

(a) Names of employees in department 5 who work more than 10 hours per week on ProductX. (b) Employees with a dependent having the same first name as themselves. (c) Employees directly supervised by Franklin Wong. (d) For each project, project name and total hours. (e) Employees who work on every project.

*Solution.*
(a) $\pi_{\text{Fname},\text{Lname}}\big(\sigma_{\text{Dno}=5}(\text{EMPLOYEE}) \bowtie_{\text{Ssn}=\text{Essn}} \sigma_{\text{Hours}>10}(\text{WORKS\_ON}) \bowtie_{\text{Pno}=\text{Pnumber}} \sigma_{\text{Pname}=\text{`ProductX'}}(\text{PROJECT})\big)$

(b) $\pi_{\text{Fname},\text{Lname}}\big(\text{EMPLOYEE} \bowtie_{\text{Ssn}=\text{Essn} \,\wedge\, \text{Fname}=\text{Dependent\_name}} \text{DEPENDENT}\big)$

(c) $\text{WONG} \leftarrow \pi_{\text{Ssn}}(\sigma_{\text{Fname}=\text{`Franklin'} \wedge \text{Lname}=\text{`Wong'}}(\text{EMPLOYEE}))$; answer $\pi_{\text{Fname},\text{Lname}}(\text{EMPLOYEE} \bowtie_{\text{Super\_ssn}=\text{Ssn}} \text{WONG})$ — rename WONG's Ssn (e.g. to Wssn) so the condition is unambiguous.

(d) $\pi_{\text{Pname},\text{Total}}\big(\text{PROJECT} \bowtie_{\text{Pnumber}=\text{Pno}} \gamma_{\text{Pno};\ \text{SUM(Hours)}\to\text{Total}}(\text{WORKS\_ON})\big)$ (projects with no workers are omitted; use ⟕ to keep them).

(e) $\text{ALLP} \leftarrow \rho_{(\text{Pno})}(\pi_{\text{Pnumber}}(\text{PROJECT}))$; $\text{E} \leftarrow \pi_{\text{Essn},\text{Pno}}(\text{WORKS\_ON}) \div \text{ALLP}$; answer $\pi_{\text{Fname},\text{Lname}}(\text{EMPLOYEE} \bowtie_{\text{Ssn}=\text{Essn}} \text{E})$.

### Problem 9 [RA · Application · 10 pts · Elmasri 8.16 f–j]

(f) Employees who work on no project. (g) For each department, name and average salary. (h) Average salary of female employees. (i) Names and addresses of employees who work on at least one project in Houston but whose department has no location in Houston. (j) Last names of department managers with no dependents.

*Solution.*
(f) $\pi_{\text{Fname},\text{Lname}}\big(\text{EMPLOYEE} \bowtie (\pi_{\text{Ssn}}(\text{EMPLOYEE}) - \rho_{(\text{Ssn})}(\pi_{\text{Essn}}(\text{WORKS\_ON})))\big)$

(g) $\pi_{\text{Dname},\text{AvgSal}}\big(\text{DEPARTMENT} \bowtie_{\text{Dnumber}=\text{Dno}} \gamma_{\text{Dno};\ \text{AVG(Salary)}\to\text{AvgSal}}(\text{EMPLOYEE})\big)$

(h) $\gamma_{\text{AVG(Salary)}}(\sigma_{\text{Sex}=\text{`F'}}(\text{EMPLOYEE}))$ (no grouping attribute: one row).

(i) $\text{HP} \leftarrow \pi_{\text{Essn}}(\text{WORKS\_ON} \bowtie_{\text{Pno}=\text{Pnumber}} \sigma_{\text{Plocation}=\text{`Houston'}}(\text{PROJECT}))$; $\text{HD} \leftarrow \pi_{\text{Dnumber}}(\sigma_{\text{Dlocation}=\text{`Houston'}}(\text{DEPT\_LOCATIONS}))$; $\text{NOTHD} \leftarrow \pi_{\text{Ssn}}(\text{EMPLOYEE} \bowtie_{\text{Dno}=\text{Dnumber}} \text{HD})$; answer $\pi_{\text{Fname},\text{Lname},\text{Address}}\big(\text{EMPLOYEE} \bowtie (\rho_{(\text{Ssn})}(\text{HP}) - \text{NOTHD})\big)$.

(j) $\text{MGRS} \leftarrow \rho_{(\text{Ssn})}(\pi_{\text{Mgr\_ssn}}(\text{DEPARTMENT}))$; $\text{WITHDEP} \leftarrow \rho_{(\text{Ssn})}(\pi_{\text{Essn}}(\text{DEPENDENT}))$; answer $\pi_{\text{Lname}}(\text{EMPLOYEE} \bowtie (\text{MGRS} - \text{WITHDEP}))$.

### Problem 10 [RA · Application · 6 pts · Elmasri 8.17 a, b, d]

AIRLINE: FLIGHT(**Flight_number**, Airline, Weekdays), FLIGHT_LEG(**Flight_number, Leg_number**, Departure_airport_code, Scheduled_departure_time, Arrival_airport_code, Scheduled_arrival_time), FARE(**Flight_number, Fare_code**, Amount, Restrictions). (a) For each flight, the departure airport of the first leg and the arrival airport of the last leg. (b) Flight numbers and weekdays of flights or legs from 'iah' to 'lax'. (d) All fare information for flight 'co197'.

*Solution.*
(a) $\text{FIRST} \leftarrow \gamma_{\text{Flight\_number};\ \text{MIN(Leg\_number)}\to\text{Leg\_number}}(\text{FLIGHT\_LEG})$, $\text{LAST} \leftarrow \gamma_{\text{Flight\_number};\ \text{MAX(Leg\_number)}\to\text{Leg\_number}}(\text{FLIGHT\_LEG})$. $\text{D} \leftarrow \pi_{\text{Flight\_number},\,\text{Departure\_airport\_code}}(\text{FIRST} * \text{FLIGHT\_LEG})$, $\text{A} \leftarrow \pi_{\text{Flight\_number},\,\text{Arrival\_airport\_code}}(\text{LAST} * \text{FLIGHT\_LEG})$; answer $\text{D} * \text{A}$.
(b) $\pi_{\text{Flight\_number},\,\text{Weekdays}}\big(\sigma_{\text{Departure\_airport\_code}=\text{`iah'} \wedge \text{Arrival\_airport\_code}=\text{`lax'}}(\text{FLIGHT\_LEG}) * \text{FLIGHT}\big)$.
(d) $\sigma_{\text{Flight\_number}=\text{`co197'}}(\text{FARE})$.

### Problem 11 [RA · Numerical · 6 pts · Elmasri 8.22]

T1(P, Q, R) = {(10, a, 5), (15, b, 8), (25, a, 6)}, T2(A, B, C) = {(10, b, 6), (25, c, 3), (10, b, 5)}. Show (a) $T_1 \bowtie_{P=A} T_2$, (b) $T_1 \bowtie_{Q=B} T_2$, (c) T1 ⟕ (P = A) T2, (d) T1 ⟖ (Q = B) T2, (e) T1 ∪ T2, (f) $T_1 \bowtie_{P=A \wedge R=C} T_2$.

*Solution.* Columns P, Q, R, A, B, C.
(a) (10, a, 5, 10, b, 6), (10, a, 5, 10, b, 5), (25, a, 6, 25, c, 3).
(b) (15, b, 8, 10, b, 6), (15, b, 8, 10, b, 5).
(c) The three rows of (a) plus (15, b, 8, NULL, NULL, NULL).
(d) The two rows of (b) plus (NULL, NULL, NULL, 25, c, 3).
(e) Union-compatible (int, char, int): six rows (10, a, 5), (15, b, 8), (25, a, 6), (10, b, 6), (25, c, 3), (10, b, 5); attribute names P, Q, R.
(f) (10, a, 5, 10, b, 5) only.

## C. Past papers and extra drills

### Problem 12 [RA · Application · 4 pts · M24 Quiz 4 Q1]

Show how this left outer join can be computed with basic RA operations: SELECT E.Lname, E.Fname, D.Dname FROM EMPLOYEE E LEFT OUTER JOIN DEPARTMENT D ON E.Dno = D.Dnumber.

*Solution.*
1. $T_1 \leftarrow \pi_{\text{Lname},\text{Fname},\text{Dname}}(\text{EMPLOYEE} \bowtie_{\text{Dno}=\text{Dnumber}} \text{DEPARTMENT})$ (matched rows).
2. $T_2 \leftarrow \pi_{\text{Lname},\text{Fname}}(\text{EMPLOYEE}) - \pi_{\text{Lname},\text{Fname}}(T_1)$ (employees with no department). Safer with Ssn kept until the end, since two employees can share a name.
3. $T_3 \leftarrow T_2 \times \{(\text{NULL})\}$ with the column named Dname.
4. $\text{ANSWER} \leftarrow T_1 \cup T_3$.

### Problem 13 [RA · Application · 4 pts]

Write division using only π, ×, −, and explain each step on: "students who have taken every course offered by the CS department", TAKES(Sid, Cid), COURSE(Cid, Dept).

*Solution.* $S \leftarrow \pi_{\text{Cid}}(\sigma_{\text{Dept}=\text{`CS'}}(\text{COURSE}))$; $R \leftarrow \text{TAKES}$. All candidates: $\pi_{\text{Sid}}(R)$. Every required pair: $\pi_{\text{Sid}}(R) \times S$. Missing pairs: $(\pi_{\text{Sid}}(R) \times S) - R$. Students missing something: $\pi_{\text{Sid}}$ of that. Answer: $\pi_{\text{Sid}}(R) - \pi_{\text{Sid}}((\pi_{\text{Sid}}(R) \times S) - R)$. If S is empty, every student qualifies (vacuous "every").

### Problem 14 [RA · Application · 3 pts]

Employees with the highest salary, without using the MAX aggregate.

*Solution.* Self-join to find salaries that are beaten by someone: $\text{LOWER} \leftarrow \pi_{E.\text{Ssn}}\big(\rho_E(\text{EMPLOYEE}) \bowtie_{E.\text{Salary} < F.\text{Salary}} \rho_F(\text{EMPLOYEE})\big)$. Answer: $\pi_{\text{Ssn}}(\text{EMPLOYEE}) - \text{LOWER}$, then join for names. Returns all employees tied at the top.

### Problem 15 [RA · Application · 3 pts]

Employees who work on at least two different projects.

*Solution.* $\pi_{W_1.\text{Essn}}\big(\rho_{W_1}(\text{WORKS\_ON}) \bowtie_{W_1.\text{Essn}=W_2.\text{Essn} \,\wedge\, W_1.\text{Pno} \ne W_2.\text{Pno}} \rho_{W_2}(\text{WORKS\_ON})\big)$. Or with grouping: $\pi_{\text{Essn}}(\sigma_{N \ge 2}(\gamma_{\text{Essn};\ \text{COUNT(Pno)}\to N}(\text{WORKS\_ON})))$.
