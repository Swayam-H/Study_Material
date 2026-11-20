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

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

## A. Assignment 5 (this year)

Schema for A5 (individual paper): BOOKS(**ISBN**, AuthorName, Title, Publisher, YearofBook), COAUTHORS(**ISBN, JointAuthorName**), PERSONS(**Name**, YearofBirth, Residence), PUBLISHERS(**Publisher**, City). The group paper calls the attributes Author and JointAuthor. Assumptions used by the key: AuthorName, JointAuthorName → PERSONS.Name; BOOKS.Publisher → PUBLISHERS; COAUTHORS.ISBN → BOOKS; the senior author is not also listed as a coauthor; "younger" means a larger YearofBirth.

### Problem 1 [RA · Application · 5 pts · Assignment 5 individual Q1(a)]

Give the complete rows of books whose senior author is younger than all the coauthors of the book.

*Solution.*

**Assumptions.**
1. ISBN is the key of BOOKS, (ISBN, JointAuthorName) of COAUTHORS, Name of PERSONS. *(Reason: an ISBN identifies one book; AuthorName and JointAuthorName are foreign keys to PERSONS, and a foreign key references a key.)*
2. X is younger than Y if and only if X.YearofBirth > Y.YearofBirth. *(Reason: only the year of birth is stored.)*
3. A book with no coauthors is included. *(Reason: "younger than all the coauthors" is a universal condition, which is true over an empty set.)*

**Derivation.**

$$ \begin{aligned} S &\leftarrow \rho_{S(\text{ISBN},\,\text{SYear})}\big(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{BOOKS} \\ &\qquad \bowtie_{\text{AuthorName}=\text{Name}} \text{PERSONS})\big) \\ C &\leftarrow \rho_{C(\text{ISBN},\,\text{CYear})}\big(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{COAUTHORS} \\ &\qquad \bowtie_{\text{JointAuthorName}=\text{Name}} \text{PERSONS})\big) \\ \text{NOTYOUNGER} &\leftarrow \pi_{\text{ISBN}}\big(\sigma_{\text{SYear} \le \text{CYear}}(S \\ &\qquad \bowtie C)\big) \\ \text{ANSWER} &\leftarrow \text{BOOKS} \bowtie \big(\pi_{\text{ISBN}}(\text{BOOKS}) \\ &\qquad - \text{NOTYOUNGER}\big) \end{aligned} $$

**Explanation.**
1. S holds the birth year of each book's senior author and C the birth year of each coauthor. After renaming, ISBN is their only common attribute, so S ⋈ C pairs the two years book by book.
2. By Assumption 2, the senior author is *not* younger than a coauthor when SYear ≤ CYear. NOTYOUNGER is the set of books with at least one such coauthor.
3. π ISBN(BOOKS) − NOTYOUNGER is the set of books whose senior author is younger than every coauthor. A book with no coauthors never occurs in S ⋈ C, so it is kept (Assumption 3).
4. ISBN is the key of BOOKS, so the final natural join returns the complete row of each selected book.

**Final answer.** ANSWER as derived above.

> **Examiner's note.** If you assume instead that books without coauthors are excluded, replace π ISBN(BOOKS) by π ISBN(COAUTHORS); comparing SYear with the per-book MAX(CYear) is also accepted.

### Problem 2 [RA · Application · 5 pts · Assignment 5 individual Q1(b)]

Give the book title and the number of authors for the book.

*Solution.*

**Assumptions.**
1. The authors of a book are its senior author and its coauthors, and the senior author is not also stored as a coauthor of the same book. *(Reason: the question says any other authors are stored in COAUTHORS.)*
2. ISBN is the key of BOOKS. *(Reason: an ISBN identifies one book.)*

**Derivation.**

$$ \begin{aligned} \text{AUTH} &\leftarrow \rho_{(\text{ISBN},\,\text{Author})}(\pi_{\text{ISBN},\,\text{AuthorName}}(\text{BOOKS})) \\ &\qquad \cup \rho_{(\text{ISBN},\,\text{Author})}(\pi_{\text{ISBN},\,\text{JointAuthorName}}(\text{COAUTHORS})) \\ \text{CNT} &\leftarrow \gamma_{\text{ISBN};\ \text{COUNT(Author)} \to \text{NumAuthors}}(\text{AUTH}) \\ \text{ANSWER} &\leftarrow \pi_{\text{Title},\,\text{NumAuthors}}(\text{BOOKS} \bowtie \text{CNT}) \end{aligned} $$

**Explanation.**
1. AUTH has one tuple for each (book, author) pair, senior authors included. The two operands of ∪ have two attributes over the same domains, so they are union-compatible, and ∪ removes duplicates.
2. Grouping on ISBN, not on Title, keeps different books with the same title apart.
3. Every book has a senior author, so every book appears in CNT with NumAuthors ≥ 1.

**Final answer.** ANSWER(Title, NumAuthors) as derived above.

> **Examiner's note.** Also accepted: a left outer join BOOKS ⟕ COAUTHORS grouped on ISBN, counting JointAuthorName (which ignores NULLs) and adding 1.

### Problem 3 [RA · Application · 5 pts · Assignment 5 individual Q1(c)]

For each city, give the total number of books published and the total number of authors.

*Solution.*

**Assumptions.**
1. A book is published in the City of its publisher. *(Reason: the publisher is the only link between a book and a city.)*
2. NumAuthors for a city is the number of distinct persons who are the senior author or a coauthor of at least one book published there. *(Reason: "number of authors" counts persons.)*
3. AUTH is the relation of (ISBN, Author) pairs from Problem 2. *(Reason: it already contains both author roles.)*

**Derivation.**

$$ \begin{aligned} \text{BC} &\leftarrow \pi_{\text{ISBN},\,\text{City}}(\text{BOOKS} \bowtie \text{PUBLISHERS}) \\ \text{NB} &\leftarrow \gamma_{\text{City};\ \text{COUNT(ISBN)} \to \text{NumBooks}}(\text{BC}) \\ \text{NA} &\leftarrow \gamma_{\text{City};\ \text{COUNT(Author)} \to \text{NumAuthors}}\big(\pi_{\text{City},\,\text{Author}}(\text{BC} \\ &\qquad \bowtie \text{AUTH})\big) \\ \text{ANSWER} &\leftarrow \text{NB} \bowtie \text{NA} \end{aligned} $$

**Explanation.**
1. Publisher is the key of PUBLISHERS, so BC has exactly one tuple per book and COUNT(ISBN) counts books.
2. π City, Author (BC ⋈ AUTH) has one tuple per (city, author), so COUNT(Author) counts each author once per city.
3. The two counts are computed separately: counting ISBN in BC ⋈ AUTH would count each book once per author.
4. Every city in NB has a book and every book has an author, so NB and NA contain the same cities and the final join loses none.

**Final answer.** ANSWER(City, NumBooks, NumAuthors) as derived above.

> **Examiner's note.** Two other readings were accepted when stated: counting (book, author) pairs, or counting authors whose Residence is the city.

### Problem 4 [RA · Proof · 5 pts · Assignment 5 group Q1]

R(A1, …, An) and S(A1, …, An) have the same attributes. Show that the natural join over A1, …, An equals R ∩ S.

*Solution.*

**Assumption.** The relations contain no NULLs. *(Reason: a tuple with NULL in some Ai would fail the test Ai = Ai in the join.)*

**Definition.** The natural join over all the attributes A1, …, An is

$$ \begin{aligned} &R * S = \pi_{R.A_1,\dots,R.A_n}\big(\sigma_{R.A_1=S.A_1 \wedge \dots \wedge R.A_n=S.A_n}(R \\ &\qquad \times S)\big), \end{aligned} $$

whose schema is (A1, …, An), the same as the schema of R ∩ S.

**Proof.**
1. *R * S ⊆ R ∩ S.* Let t ∈ R * S. By the definition there are r ∈ R and s ∈ S with r[Ai] = s[Ai] for every i, and t = r[A1, …, An]. Since A1, …, An are all the attributes of R and of S, t = r and t = s. Hence t ∈ R and t ∈ S, so t ∈ R ∩ S.
2. *R ∩ S ⊆ R * S.* Let t ∈ R ∩ S. Then (t, t) ∈ R × S satisfies t[Ai] = t[Ai] for every i, so it passes the selection, and its projection is t. Hence t ∈ R * S.
3. By (1) and (2), and since both sides have the same schema, R * S = R ∩ S. ∎

### Problem 5 [RA · Application · 5 pts · Assignment 5 group Q2(a)]

Give complete rows of books whose senior author lives in the city of the publisher.

*Solution.*

**Assumptions.**
1. Each book has one senior author and one publisher; each person has one residence and each publisher one city. *(Reason: ISBN, Name and Publisher are the keys.)*
2. Residence and City are both city names and can be compared for equality. *(Reason: the question says Residence is a city.)*

**Derivation.**

$$ \begin{aligned} &\pi_{\text{ISBN},\,\text{Author},\,\text{Title},\,\text{Publisher},\,\text{YearofBook}}\Big(\sigma_{\text{Residence}=\text{City}}\big((\text{BOOKS} \\ &\qquad \bowtie_{\text{Author}=\text{Name}} \text{PERSONS}) \bowtie \text{PUBLISHERS}\big)\Big) \end{aligned} $$

**Explanation.**
1. BOOKS and PERSONS share no attribute name, so the join condition Author = Name must be written explicitly; it attaches the senior author's Residence to each book.
2. The natural join with PUBLISHERS is on Publisher, their only common attribute, and attaches the publisher's City.
3. σ Residence = City keeps the books whose senior author lives in the publisher's city. Coauthors play no part.
4. The projection on the BOOKS attributes returns each selected book's complete row exactly once.

**Final answer.** The expression above.

> **Examiner's note.** Also accepted: rename PERSONS to (Author, YearofBirth, City) and natural-join all three relations, so the city match happens inside the join.

### Problem 6 [RA · Application · 5 pts · Assignment 5 group Q2(b)]

Give coauthor name and the number of books the coauthor published.

*Solution.*

**Assumptions.**
1. A coauthor is a person listed at least once as JointAuthor. *(Reason: the question asks about coauthors.)*
2. The number of books a coauthor published counts all distinct books of which the person is the senior author or a coauthor. *(Reason: a person publishes a book in either role; the question does not restrict the role.)*

**Derivation.**

$$ \begin{aligned} \text{AUTH} &\leftarrow \rho_{(\text{ISBN},\,\text{Name})}(\pi_{\text{ISBN},\,\text{Author}}(\text{BOOKS})) \\ &\qquad \cup \rho_{(\text{ISBN},\,\text{Name})}(\pi_{\text{ISBN},\,\text{JointAuthor}}(\text{COAUTHORS})) \\ \text{CO} &\leftarrow \rho_{(\text{Name})}(\pi_{\text{JointAuthor}}(\text{COAUTHORS})) \\ \text{ANSWER} &\leftarrow \gamma_{\text{Name};\ \text{COUNT(ISBN)} \to \text{NumBooks}}(\text{AUTH} \\ &\qquad \bowtie \text{CO}) \end{aligned} $$

**Explanation.**
1. AUTH has one tuple per (book, person) pair in either role; ∪ removes duplicates.
2. The natural join with CO keeps only persons who are coauthors of at least one book.
3. Each (ISBN, Name) pair occurs once, so COUNT(ISBN) is the number of distinct books per coauthor.

**Final answer.** ANSWER(Name, NumBooks) as derived above.

> **Examiner's note.** If you state that only coauthored books count, γ JointAuthor; COUNT(ISBN) (COAUTHORS) is accepted.

### Problem 7 [RA · Application · 5 pts · Assignment 5 group Q2(c)]

Give the complete rows of authors who published a book before a coauthor of a subsequent book of theirs was born.

*Solution.*

**Assumptions.**
1. "Author" is the senior author of both books, and "a coauthor of a subsequent book" is a JointAuthor of a later book by the same senior author. *(Reason: the schema calls the senior author Author and the others coauthors.)*
2. An event in year y1 is before an event in year y2 if and only if y1 < y2. *(Reason: only years are stored.)*
3. The complete row of an author is the author's tuple in PERSONS. *(Reason: PERSONS describes persons.)*

**Derivation.**

$$ \begin{aligned} B_1 &\leftarrow \rho_{(\text{ISBN1},\,\text{Author},\,Y_1)}(\pi_{\text{ISBN},\,\text{Author},\,\text{YearofBook}}(\text{BOOKS})) \\ B_2 &\leftarrow \rho_{(\text{ISBN2},\,\text{Author},\,Y_2)}(\pi_{\text{ISBN},\,\text{Author},\,\text{YearofBook}}(\text{BOOKS})) \\ ZB &\leftarrow \rho_{(\text{ISBN2},\,\text{ZYear})}(\pi_{\text{ISBN},\,\text{YearofBirth}}(\text{COAUTHORS} \\ &\qquad \bowtie_{\text{JointAuthor}=\text{Name}} \text{PERSONS})) \\ X &\leftarrow \pi_{\text{Author}}\big(\sigma_{Y_2 > Y_1 \wedge \text{ZYear} > Y_1}(B_1 \\ &\qquad \bowtie B_2 \bowtie ZB)\big) \\ \text{ANSWER} &\leftarrow \text{PERSONS} \bowtie \rho_{(\text{Name})}(X) \end{aligned} $$

**Explanation.**
1. B1 and B2 are two renamed copies of BOOKS. B1 ⋈ B2 joins on Author only, giving every pair of books by the same senior author.
2. ZB gives the birth year of each coauthor of each book; renaming ISBN to ISBN2 attaches the coauthors of the *later* book B2.
3. Y2 > Y1 makes B2 a subsequent book (and excludes pairing a book with itself); ZYear > Y1 means the coauthor was born after B1 was published.
4. All the conditions are in one selection over the same combined tuple, so they refer to the same author, the same two books and the same coauthor.
5. Renaming Author to Name and joining with PERSONS returns the complete rows.

**Final answer.** ANSWER as derived above.

## B. Textbook exercises set by Kamal (COMPANY schema)

COMPANY: EMPLOYEE(Fname, Minit, Lname, **Ssn**, Bdate, Address, Sex, Salary, Super_ssn, Dno), DEPARTMENT(Dname, **Dnumber**, Mgr_ssn, Mgr_start_date), DEPT_LOCATIONS(**Dnumber, Dlocation**), PROJECT(Pname, **Pnumber**, Plocation, Dnum), WORKS_ON(**Essn, Pno**, Hours), DEPENDENT(**Essn, Dependent_name**, Sex, Bdate, Relationship).

### Problem 8 [RA · Application · 10 pts · Elmasri 8.16 a–e]

(a) Names of employees in department 5 who work more than 10 hours per week on ProductX. (b) Employees with a dependent having the same first name as themselves. (c) Employees directly supervised by Franklin Wong. (d) For each project, project name and total hours. (e) Employees who work on every project.

*Solution.*

**Assumptions.**
1. Names are output as (Fname, Lname). *(Reason: "names" in the COMPANY schema.)*
2. Franklin Wong is identified by first and last name, and only one employee has that name. *(Reason: the question names him.)*

**(a)**

$$ \begin{aligned} &\pi_{\text{Fname},\text{Lname}}\big(\sigma_{\text{Dno}=5}(\text{EMPLOYEE}) \\ &\qquad \bowtie_{\text{Ssn}=\text{Essn}} \sigma_{\text{Hours}>10}(\text{WORKS\_ON}) \\ &\qquad \bowtie_{\text{Pno}=\text{Pnumber}} \sigma_{\text{Pname}=\text{`ProductX'}}(\text{PROJECT})\big) \end{aligned} $$

The selections restrict to department 5, to more than 10 hours and to ProductX; the joins link each employee to their WORKS_ON rows and those rows to the project.

**(b)**

$$ \begin{aligned} &\pi_{\text{Fname},\text{Lname}}\big(\text{EMPLOYEE} \\ &\qquad \bowtie_{\text{Ssn}=\text{Essn} \,\wedge\, \text{Fname}=\text{Dependent\_name}} \text{DEPENDENT}\big) \end{aligned} $$

The join condition pairs each employee with their own dependents whose name equals the employee's first name.

**(c)**

$$ \begin{aligned} \text{WONG} &\leftarrow \rho_{(\text{Wssn})}\big(\pi_{\text{Ssn}}(\sigma_{\text{Fname}=\text{`Franklin'} \wedge \text{Lname}=\text{`Wong'}}(\text{EMPLOYEE}))\big) \\ \text{ANSWER} &\leftarrow \pi_{\text{Fname},\text{Lname}}(\text{EMPLOYEE} \\ &\qquad \bowtie_{\text{Super\_ssn}=\text{Wssn}} \text{WONG}) \end{aligned} $$

Renaming Wong's Ssn to Wssn keeps the join condition unambiguous.

**(d)**

$$ \begin{aligned} &\pi_{\text{Pname},\text{Total}}\big(\text{PROJECT} \\ &\qquad \bowtie_{\text{Pnumber}=\text{Pno}} \gamma_{\text{Pno};\ \text{SUM(Hours)}\to\text{Total}}(\text{WORKS\_ON})\big) \end{aligned} $$

Projects with no workers do not appear; a left outer join from PROJECT would keep them with a NULL total.

**(e)**

$$ \begin{aligned} \text{ALLP} &\leftarrow \rho_{(\text{Pno})}(\pi_{\text{Pnumber}}(\text{PROJECT})) \\ E &\leftarrow \pi_{\text{Essn},\text{Pno}}(\text{WORKS\_ON}) \div \text{ALLP} \\ \text{ANSWER} &\leftarrow \pi_{\text{Fname},\text{Lname}}(\text{EMPLOYEE} \\ &\qquad \bowtie_{\text{Ssn}=\text{Essn}} E) \end{aligned} $$

Division keeps exactly the employees paired in WORKS_ON with every project.

### Problem 9 [RA · Application · 10 pts · Elmasri 8.16 f–j]

(f) Employees who work on no project. (g) For each department, name and average salary. (h) Average salary of female employees. (i) Names and addresses of employees who work on at least one project in Houston but whose department has no location in Houston. (j) Last names of department managers with no dependents.

*Solution.*

**Assumption.** Every employee has a non-NULL Dno, and Mgr_ssn is never NULL. *(Reason: as in the COMPANY schema.)*

**(f)**

$$ \begin{aligned} &\pi_{\text{Fname},\text{Lname}}\big(\text{EMPLOYEE} \bowtie (\pi_{\text{Ssn}}(\text{EMPLOYEE}) \\ &\qquad - \rho_{(\text{Ssn})}(\pi_{\text{Essn}}(\text{WORKS\_ON})))\big) \end{aligned} $$

All employees minus those who appear in WORKS_ON; the join recovers their names.

**(g)**

$$ \begin{aligned} &\pi_{\text{Dname},\text{AvgSal}}\big(\text{DEPARTMENT} \\ &\qquad \bowtie_{\text{Dnumber}=\text{Dno}} \gamma_{\text{Dno};\ \text{AVG(Salary)}\to\text{AvgSal}}(\text{EMPLOYEE})\big) \end{aligned} $$

**(h)**

$$\gamma_{\text{AVG(Salary)}\to\text{AvgSal}}\big(\sigma_{\text{Sex}=\text{`F'}}(\text{EMPLOYEE})\big)$$

There is no grouping attribute, so the result is a single row.

**(i)**

$$ \begin{aligned} \text{HP} &\leftarrow \rho_{(\text{Ssn})}\big(\pi_{\text{Essn}}(\text{WORKS\_ON} \\ &\qquad \bowtie_{\text{Pno}=\text{Pnumber}} \sigma_{\text{Plocation}=\text{`Houston'}}(\text{PROJECT}))\big) \\ \text{HD} &\leftarrow \pi_{\text{Dnumber}}(\sigma_{\text{Dlocation}=\text{`Houston'}}(\text{DEPT\_LOCATIONS})) \\ \text{INHD} &\leftarrow \pi_{\text{Ssn}}(\text{EMPLOYEE} \bowtie_{\text{Dno}=\text{Dnumber}} \text{HD}) \\ \text{ANSWER} &\leftarrow \pi_{\text{Fname},\text{Lname},\text{Address}}\big(\text{EMPLOYEE} \\ &\qquad \bowtie (\text{HP} - \text{INHD})\big) \end{aligned} $$

HP is the set of employees on a Houston project, INHD those whose department has a Houston location; the difference gives the required employees.

**(j)**

$$ \begin{aligned} \text{MGRS} &\leftarrow \rho_{(\text{Ssn})}(\pi_{\text{Mgr\_ssn}}(\text{DEPARTMENT})) \\ \text{WITHDEP} &\leftarrow \rho_{(\text{Ssn})}(\pi_{\text{Essn}}(\text{DEPENDENT})) \\ \text{ANSWER} &\leftarrow \pi_{\text{Lname}}\big(\text{EMPLOYEE} \bowtie (\text{MGRS} \\ &\qquad - \text{WITHDEP})\big) \end{aligned} $$

### Problem 10 [RA · Application · 6 pts · Elmasri 8.17 a, b, d]

AIRLINE: FLIGHT(**Flight_number**, Airline, Weekdays), FLIGHT_LEG(**Flight_number, Leg_number**, Departure_airport_code, Scheduled_departure_time, Arrival_airport_code, Scheduled_arrival_time), FARE(**Flight_number, Fare_code**, Amount, Restrictions). (a) For each flight, the departure airport of the first leg and the arrival airport of the last leg. (b) Flight numbers and weekdays of flights or legs from 'iah' to 'lax'. (d) All fare information for flight 'co197'.

*Solution.*

**Assumption.** The legs of a flight are numbered in order, so the first leg has the smallest Leg_number and the last leg the largest. *(Reason: Leg_number orders the legs.)*

**(a)**

$$\begin{aligned} \text{FIRST} &\leftarrow \gamma_{\text{Flight\_number};\ \text{MIN(Leg\_number)}\to\text{Leg\_number}}(\text{FLIGHT\_LEG}) \\ \text{LAST} &\leftarrow \gamma_{\text{Flight\_number};\ \text{MAX(Leg\_number)}\to\text{Leg\_number}}(\text{FLIGHT\_LEG}) \\ D &\leftarrow \pi_{\text{Flight\_number},\,\text{Departure\_airport\_code}}(\text{FIRST} * \text{FLIGHT\_LEG}) \\ A &\leftarrow \pi_{\text{Flight\_number},\,\text{Arrival\_airport\_code}}(\text{LAST} * \text{FLIGHT\_LEG}) \\ \text{ANSWER} &\leftarrow D * A \end{aligned}$$

FIRST and LAST identify the first and last leg of each flight; joining them back to FLIGHT_LEG on (Flight_number, Leg_number) retrieves the airports.

**(b)**

$$\begin{aligned} L &\leftarrow \sigma_{\substack{\text{Departure\_airport\_code}=\text{`iah'} \\ \wedge\ \text{Arrival\_airport\_code}=\text{`lax'}}}(\text{FLIGHT\_LEG}) \\ \text{ANSWER} &\leftarrow \pi_{\text{Flight\_number},\,\text{Weekdays}}(L * \text{FLIGHT}) \end{aligned}$$

**(d)**

$$\sigma_{\text{Flight\_number}=\text{`co197'}}(\text{FARE})$$

### Problem 11 [RA · Numerical · 6 pts · Elmasri 8.22]

T1(P, Q, R) = {(10, a, 5), (15, b, 8), (25, a, 6)}, T2(A, B, C) = {(10, b, 6), (25, c, 3), (10, b, 5)}. Show (a) $T_1 \bowtie_{P=A} T_2$, (b) $T_1 \bowtie_{Q=B} T_2$, (c) T1 ⟕ (P = A) T2, (d) T1 ⟖ (Q = B) T2, (e) T1 ∪ T2, (f) $T_1 \bowtie_{P=A \wedge R=C} T_2$.

*Solution.*

**Assumption.** The result of a theta join or outer join has the columns P, Q, R, A, B, C in that order. *(Reason: T1's attributes come first.)*

**(a)** P = A pairs 10 with both 10-rows of T2 and 25 with the 25-row:
(10, a, 5, 10, b, 6), (10, a, 5, 10, b, 5), (25, a, 6, 25, c, 3).

**(b)** Q = B matches only Q = b with the two B = b rows:
(15, b, 8, 10, b, 6), (15, b, 8, 10, b, 5).

**(c)** The left outer join adds the unmatched T1 row with NULLs:
the three rows of (a) and (15, b, 8, NULL, NULL, NULL).

**(d)** The right outer join adds the unmatched T2 row with NULLs:
the two rows of (b) and (NULL, NULL, NULL, 25, c, 3).

**(e)** T1 and T2 are union-compatible (integer, character, integer). The union has six distinct tuples, with attribute names P, Q, R:
(10, a, 5), (15, b, 8), (25, a, 6), (10, b, 6), (25, c, 3), (10, b, 5).

**(f)** Only (10, a, 5) and (10, b, 5) agree on both P = A and R = C:
(10, a, 5, 10, b, 5).

## C. Past papers and extra drills

### Problem 12 [RA · Application · 4 pts · M24 Quiz 4 Q1]

Show how this left outer join can be computed with basic RA operations: SELECT E.Lname, E.Fname, D.Dname FROM EMPLOYEE E LEFT OUTER JOIN DEPARTMENT D ON E.Dno = D.Dnumber.

*Solution.*

**Assumption.** Ssn is kept until the last step and projected away at the end. *(Reason: two employees may share a name, and the set difference must not merge them.)*

**Derivation.**

$$ \begin{aligned} T_1 &\leftarrow \pi_{\text{Ssn},\text{Lname},\text{Fname},\text{Dname}}(\text{EMPLOYEE} \\ &\qquad \bowtie_{\text{Dno}=\text{Dnumber}} \text{DEPARTMENT}) \\ T_2 &\leftarrow \pi_{\text{Ssn},\text{Lname},\text{Fname}}(\text{EMPLOYEE}) \\ &\qquad - \pi_{\text{Ssn},\text{Lname},\text{Fname}}(T_1) \\ T_3 &\leftarrow T_2 \times \rho_{(\text{Dname})}(\{(\text{NULL})\}) \\ \text{ANSWER} &\leftarrow \pi_{\text{Lname},\text{Fname},\text{Dname}}(T_1 \cup T_3) \end{aligned} $$

**Explanation.**
1. T1 contains the employees that match a department, with the department name.
2. T2 contains the employees with no matching department.
3. T3 pads those employees with a NULL Dname, which makes T3 union-compatible with T1.
4. The union of T1 and T3 is exactly the left outer join.

### Problem 13 [RA · Application · 4 pts]

Write division using only π, ×, −, and explain each step on: "students who have taken every course offered by the CS department", TAKES(Sid, Cid), COURSE(Cid, Dept).

*Solution.*

**Assumption.** Every student of interest appears in TAKES. *(Reason: division takes its candidates from the dividend.)*

**Derivation.**

$$\begin{aligned} S &\leftarrow \pi_{\text{Cid}}(\sigma_{\text{Dept}=\text{`CS'}}(\text{COURSE})) \\ \text{ALL} &\leftarrow \pi_{\text{Sid}}(\text{TAKES}) \\ \text{MISSING} &\leftarrow \pi_{\text{Sid}}\big((\text{ALL} \times S) - \text{TAKES}\big) \\ \text{ANSWER} &\leftarrow \text{ALL} - \text{MISSING} \end{aligned}$$

**Explanation.**
1. S is the set of required courses, and ALL the set of candidate students.
2. ALL × S lists every (student, required course) pair that *should* exist; subtracting TAKES leaves the pairs that are missing.
3. MISSING is the set of students who lack at least one required course.
4. The remaining students have taken every CS course, which is $\text{TAKES} \div S$.

**Final answer.** $\pi_{\text{Sid}}(\text{TAKES}) - \pi_{\text{Sid}}\big((\pi_{\text{Sid}}(\text{TAKES}) \times S) - \text{TAKES}\big)$. If S is empty, every student qualifies, because "every course" over an empty set is vacuously true.

### Problem 14 [RA · Application · 3 pts]

Employees with the highest salary, without using the MAX aggregate.

*Solution.*

**Assumption.** Salary is never NULL. *(Reason: a NULL salary cannot be compared.)*

**Derivation.**

$$ \begin{aligned} \text{LOWER} &\leftarrow \pi_{E.\text{Ssn}}\big(\rho_E(\text{EMPLOYEE}) \\ &\qquad \bowtie_{E.\text{Salary} < F.\text{Salary}} \rho_F(\text{EMPLOYEE})\big) \\ \text{TOP} &\leftarrow \pi_{\text{Ssn}}(\text{EMPLOYEE}) - \text{LOWER} \\ \text{ANSWER} &\leftarrow \pi_{\text{Fname},\text{Lname}}(\text{EMPLOYEE} \bowtie \text{TOP}) \end{aligned} $$

**Explanation.** The self-join pairs each employee E with every employee F who earns more, so LOWER is the set of employees whom someone out-earns. Everyone else earns the maximum salary. All employees tied at the top are returned.

### Problem 15 [RA · Application · 3 pts]

Employees who work on at least two different projects.

*Solution.*

**Derivation (self-join).**

$$ \begin{aligned} &\pi_{W_1.\text{Essn}}\big(\rho_{W_1}(\text{WORKS\_ON}) \\ &\qquad \bowtie_{W_1.\text{Essn}=W_2.\text{Essn} \,\wedge\, W_1.\text{Pno} \ne W_2.\text{Pno}} \rho_{W_2}(\text{WORKS\_ON})\big) \end{aligned} $$

**Explanation.** The two copies of WORKS_ON are joined on the same employee with different projects, so an employee appears in the result exactly when they work on at least two different projects.

**Alternative (grouping).**

$$ \begin{aligned} &\pi_{\text{Essn}}\big(\sigma_{N \ge 2}(\gamma_{\text{Essn};\ \text{COUNT(Pno)}\to N}(\text{WORKS\_ON}))\big) \end{aligned} $$

Since (Essn, Pno) is the key of WORKS_ON, COUNT(Pno) counts distinct projects.

