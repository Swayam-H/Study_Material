# Learn: Tuple relational calculus

Relational algebra says *how* to compute an answer (a sequence of operations). **Tuple relational calculus** (TRC) says *what* the answer is: a set of tuples that satisfy a logical formula. SQL's SELECT … FROM … WHERE EXISTS is TRC in disguise, so TRC is also the best way to think about nested SQL. TRC was added to the final exam syllabus on top of the assignments (Kamal's announcement), with practice exercises 8.24–8.27 and 8.29. Source: Elmasri and Navathe 7e section 8.6.

> **Study path.** Learn the query shape and the three rules (range every variable, join every variable, quantify every variable that is not in the answer). Then learn the one hard idea: **"for all" is "not exists … not"**. Practice A is the textbook exercises Kamal set; Practice B rewrites the Assignment 5 queries in TRC, which is the most likely form of an exam question.

## The shape of a TRC query

$$ \begin{aligned} &\{\, t_1.A_1, \dots, t_n.A_n \mid \text{COND}(t_1, \dots, t_n, \\ &\qquad t_{n+1}, \dots, t_{n+m}) \,\} \end{aligned} $$

- A **tuple variable** t ranges over the tuples of one relation. The **range relation** is given by an atom R(t), read "t is a tuple of R".
- To the left of the bar: the attributes to return (or just t for whole tuples).
- To the right: a **formula** that must be true.

"Employees earning more than 50000": $\{\, t \mid \text{EMPLOYEE}(t) \wedge t.\text{Salary} > 50000 \,\}$. "Only their names": $\{\, t.\text{Fname}, t.\text{Lname} \mid \text{EMPLOYEE}(t) \wedge t.\text{Salary} > 50000 \,\}$.

## Formulas

**Atoms** are of three kinds: R(t); $t.A \;\theta\; s.B$; $t.A \;\theta\; c$, with θ one of =, ≠, <, ≤, >, ≥ and c a constant. **Formulas** are built from atoms with ∧ (AND), ∨ (OR), ¬ (NOT), and the quantifiers **∃t** (there exists) and **∀t** (for all).

A variable is **bound** if it is introduced by a quantifier (∃t or ∀t) and **free** otherwise. Rule: **the variables to the left of the bar must be exactly the free variables** on the right. Every other variable must be bound by ∃ or ∀.

Example (Elmasri Q1): names and addresses of employees in the Research department.

$$ \begin{aligned} &\{\, t.\text{Fname}, t.\text{Lname}, t.\text{Address} \mid \text{EMPLOYEE}(t) \\ &\qquad \wedge (\exists d)(\text{DEPARTMENT}(d) \wedge d.\text{Dname}=\text{`Research'} \\ &\qquad \wedge d.\text{Dnumber}=t.\text{Dno}) \,\} \end{aligned} $$

Here t is free (it appears in the answer); d is bound by ∃. The atom DEPARTMENT(d) gives d's range, $d.\text{Dname}=\text{`Research'}$ is a **selection condition**, $d.\text{Dnumber}=t.\text{Dno}$ is a **join condition**.

## Three rules that make an answer correct

1. **Range every variable**: every t has an atom R(t), inside the scope of its quantifier.
2. **Join every variable**: with n tuple variables you usually need at least **n − 1 join conditions** linking them. A missing join condition silently turns the query into a Cartesian product (Elmasri 8.27).
3. **Quantify every non-answer variable**, and put its range, selection and join conditions **inside** the parentheses of its quantifier.

## Existential and universal quantifiers

**∃** is "some" / "at least one": translate "who works on some project in Houston" with an ∃ over WORKS_ON and PROJECT.

**∀** is "every" / "all". Use the equivalences

$$\boxed{(\forall x)(P(x)) \equiv \neg(\exists x)(\neg P(x))}$$

$$\boxed{\text{IF } P \text{ THEN } Q \;\equiv\; \neg P \vee Q}$$

and De Morgan ($\neg(P \wedge Q) \equiv \neg P \vee \neg Q$). The universal quantifier must be used with an implication, because x ranges over *everything*, not just one relation: "for every x, **if** x is a project of department 5 **then** e works on x".

Example (Elmasri Q3): employees who work on **all** projects controlled by department 5.

$$ \begin{aligned} &\{\, e.\text{Lname}, e.\text{Fname} \mid\  \text{EMPLOYEE}(e) \\ &\qquad \wedge (\forall x)\big(\neg\text{PROJECT}(x) \vee \neg(x.\text{Dnum}=5) \\ &\qquad \vee (\exists w)(\text{WORKS\_ON}(w) \wedge w.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge x.\text{Pnumber}=w.\text{Pno})\big) \,\} \end{aligned} $$

The same with only ∃ (the form to use in SQL with NOT EXISTS):

$$ \begin{aligned} &\{\, e.\text{Lname}, e.\text{Fname} \mid\  \text{EMPLOYEE}(e) \\ &\qquad \wedge \neg(\exists x)\big(\text{PROJECT}(x) \\ &\qquad \wedge x.\text{Dnum}=5 \\ &\qquad \wedge \neg(\exists w)(\text{WORKS\_ON}(w) \wedge w.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge x.\text{Pnumber}=w.\text{Pno})\big) \,\} \end{aligned} $$

Read it as: "there is no department-5 project that e does not work on". This **double negation** is the most tested idea in TRC and in SQL.

**"No …" uses one ¬∃.** Employees with no dependents (Q6):

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid \text{EMPLOYEE}(e) \\ &\qquad \wedge \neg(\exists d)(\text{DEPENDENT}(d) \\ &\qquad \wedge e.\text{Ssn}=d.\text{Essn}) \,\} \end{aligned} $$

## Safe expressions

An expression is **safe** if every value in its result comes from the **domain of the expression**: values that appear in the relations it mentions or as constants in it. $\{\, t \mid \neg\text{EMPLOYEE}(t) \,\}$ is **unsafe**: infinitely many tuples are not employees. Every safe TRC expression has an equivalent RA expression and vice versa, which is why RA (and SQL) is called **relationally complete**.

## What TRC cannot do

Basic TRC has **no aggregates** (COUNT, SUM, AVG), **no grouping**, and no ordering. "At least two" can be written with two distinct tuple variables; "the number of" cannot be computed. If an exam asks for a count in TRC, say it is not expressible in basic TRC and give the closest expressible query, or use the aggregate extension and say so.

## Translating between RA, TRC and SQL

| Idea | RA | TRC | SQL |
| --- | --- | --- | --- |
| Selection | σ | condition on t | WHERE |
| Projection | π | attributes left of the bar | SELECT list |
| Join | ⋈ | ∃ with join condition | FROM + WHERE / JOIN |
| Not | − | ¬∃ | NOT EXISTS / NOT IN |
| All | ÷ | ∀ … (¬P ∨ Q), or ¬∃ … ¬∃ | NOT EXISTS (… NOT EXISTS …) |
| Union | ∪ | ∨ | UNION |

# Reference: Tuple relational calculus

- Query: $\{\, t_1.A, \dots \mid \text{COND} \,\}$; left side lists exactly the free variables.
- Atoms: R(t); t.A θ s.B; t.A θ c.
- Connectives: ∧, ∨, ¬; quantifiers ∃, ∀.
- Equivalences: $(\forall x)P \equiv \neg(\exists x)\neg P$; $(\exists x)P \equiv \neg(\forall x)\neg P$; $P \Rightarrow Q \equiv \neg P \vee Q$; $\neg(P \wedge Q) \equiv \neg P \vee \neg Q$; $\neg(P \vee Q) \equiv \neg P \wedge \neg Q$.
- Universal pattern: $(\forall x)(\neg R(x) \vee \neg\text{cond}(x) \vee \text{wanted}(x))$, or with ∃ only: $\neg(\exists x)(R(x) \wedge \text{cond}(x) \wedge \neg\text{wanted}(x))$.
- n tuple variables ⇒ normally ≥ n − 1 join conditions; fewer gives a Cartesian product.
- Safe: result values come from the relations and constants in the expression.
- Not expressible in basic TRC: aggregates, grouping, ordering, recursive closure.

## What to be able to do without notes

- Write a TRC query for any select–project–join question, with every variable ranged and joined.
- Write "no", "every" and "only" with ¬∃ and ∀, and convert between the two forms.
- Identify free and bound variables; spot an unsafe expression.
- Translate a TRC query to RA and to SQL.

# Practice: Tuple relational calculus

Every solution below is written the way an answer should look on the exam script: **assumptions** first (each with its reason), then the **working** in full sentences, then a clearly marked **final answer**. The quoted *Examiner's notes* are for you, not for the script: they list accepted alternatives and the mistakes that cost marks.

Schemas: COMPANY as in the relational algebra chapter. AIRLINE: AIRPORT(**Airport_code**, Name, City, State), FLIGHT(**Flight_number**, Airline, Weekdays), FLIGHT_LEG(**Flight_number, Leg_number**, Departure_airport_code, Scheduled_departure_time, Arrival_airport_code, Scheduled_arrival_time), FARE(**Flight_number, Fare_code**, Amount, Restrictions). LIBRARY: BOOK(**Book_id**, Title, Publisher_name), BOOK_LOANS(**Book_id, Branch_id, Card_no**, Date_out, Due_date), LIBRARY_BRANCH(**Branch_id**, Branch_name, Address), BORROWER(**Card_no**, Name, Address, Phone).

## A. Textbook exercises set by Kamal

### Problem 1 [TRC · Application · 6 pts · Elmasri 8.24 a, b, c]

In TRC: (a) names of employees in department 5 who work more than 10 hours per week on ProductX; (b) employees with a dependent of the same first name; (c) employees directly supervised by Franklin Wong.

*Solution.*

**Assumption.** ProductX and Franklin Wong are identified by name, and the names are unique. *(Reason: the queries refer to them by name.)*

**(a)** The free variable e ranges over EMPLOYEE; w and p are bound by ∃ and joined to e and to each other.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid\  \text{EMPLOYEE}(e) \wedge e.\text{Dno}=5 \\ &\qquad \wedge (\exists w)(\exists p)\big(\text{WORKS\_ON}(w) \wedge \text{PROJECT}(p) \\ &\qquad \wedge w.\text{Essn}=e.\text{Ssn} \wedge w.\text{Pno}=p.\text{Pnumber} \\ &\qquad \wedge p.\text{Pname}=\text{`ProductX'} \\ &\qquad \wedge w.\text{Hours}>10\big) \,\} \end{aligned} $$

**(b)** The dependent d must belong to e (join on Essn) and have e's first name.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid \text{EMPLOYEE}(e) \\ &\qquad \wedge (\exists d)(\text{DEPENDENT}(d) \\ &\qquad \wedge d.\text{Essn}=e.\text{Ssn} \wedge d.\text{Dependent\_name}=e.\text{Fname}) \,\} \end{aligned} $$

**(c)** The supervisor s is bound by ∃ and linked to e through Super_ssn.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid \text{EMPLOYEE}(e) \\ &\qquad \wedge (\exists s)(\text{EMPLOYEE}(s) \\ &\qquad \wedge s.\text{Fname}=\text{`Franklin'} \wedge s.\text{Lname}=\text{`Wong'} \\ &\qquad \wedge e.\text{Super\_ssn}=s.\text{Ssn}) \,\} \end{aligned} $$

### Problem 2 [TRC · Application · 8 pts · Elmasri 8.24 e, f, i, j]

(e) Employees who work on every project. (f) Employees who work on no project. (i) Names and addresses of employees who work on at least one project located in Houston but whose department has no location in Houston. (j) Last names of department managers with no dependents.

*Solution.*

**Assumption.** "Every project" means every tuple of PROJECT. *(Reason: no other set of projects is named.)*

**(e)** For every tuple p, either p is not a project, or some WORKS_ON tuple links e to p.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid \text{EMPLOYEE}(e) \wedge (\forall p)\big(\neg\text{PROJECT}(p) \\ &\qquad \vee (\exists w)(\text{WORKS\_ON}(w) \wedge w.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge w.\text{Pno}=p.\text{Pnumber})\big) \,\} \end{aligned} $$

Equivalently, using ∀x P ≡ ¬∃x ¬P: there is no project p such that no WORKS_ON tuple links e and p.

**(f)** No WORKS_ON tuple belongs to e.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname} \mid \text{EMPLOYEE}(e) \\ &\qquad \wedge \neg(\exists w)(\text{WORKS\_ON}(w) \\ &\qquad \wedge w.\text{Essn}=e.\text{Ssn}) \,\} \end{aligned} $$

**(i)** Some Houston project is worked on by e, and no Houston location belongs to e's department.

$$ \begin{aligned} &\{\, e.\text{Fname}, e.\text{Lname}, e.\text{Address} \mid\  \text{EMPLOYEE}(e) \\ &\qquad \wedge (\exists p)(\exists w)\big(\text{PROJECT}(p) \wedge \text{WORKS\_ON}(w) \\ &\qquad \wedge w.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge w.\text{Pno}=p.\text{Pnumber} \wedge p.\text{Plocation}=\text{`Houston'}\big) \\ &\qquad \wedge \neg(\exists l)\big(\text{DEPT\_LOCATIONS}(l) \wedge l.\text{Dnumber}=e.\text{Dno} \\ &\qquad \wedge l.\text{Dlocation}=\text{`Houston'}\big) \,\} \end{aligned} $$

**(j)** e manages some department and has no dependent.

$$ \begin{aligned} &\{\, e.\text{Lname} \mid\  \text{EMPLOYEE}(e) \\ &\qquad \wedge (\exists d)(\text{DEPARTMENT}(d) \\ &\qquad \wedge d.\text{Mgr\_ssn}=e.\text{Ssn}) \\ &\qquad \wedge \neg(\exists x)(\text{DEPENDENT}(x) \wedge x.\text{Essn}=e.\text{Ssn}) \,\} \end{aligned} $$

### Problem 3 [TRC · Application · 8 pts · Elmasri 8.25]

AIRLINE in TRC: (a) for each flight, flight number, departure airport of the first leg and arrival airport of the last leg; (b) flight numbers and weekdays of flights or legs departing 'iah' and arriving 'lax'; (c) flight number, departure code, scheduled departure time, arrival code, scheduled arrival time and weekdays of flights or legs that depart from some airport in Houston and arrive at some airport in Los Angeles; (d) all fare information for flight 'co197'.

*Solution.*

**Assumptions.**
1. The first leg of a flight is the one with the smallest Leg_number and the last leg the one with the largest. *(Reason: TRC has no MIN or MAX, so the order must be expressed by comparing leg numbers.)*
2. Airports in Houston and Los Angeles are identified through AIRPORT.City. *(Reason: the question refers to cities, not airport codes.)*

**(a)** Legs a and b belong to the same flight; no leg of that flight has a smaller number than a, and none has a larger number than b.

$$ \begin{aligned} &\{\, a.\text{Flight\_number}, a.\text{Departure\_airport\_code}, \\ &\qquad b.\text{Arrival\_airport\_code} \mid\  \text{FLIGHT\_LEG}(a) \\ &\qquad \wedge \text{FLIGHT\_LEG}(b) \wedge a.\text{Flight\_number}=b.\text{Flight\_number} \\ &\qquad \wedge \neg(\exists x)(\text{FLIGHT\_LEG}(x) \\ &\qquad \wedge x.\text{Flight\_number}=a.\text{Flight\_number} \\ &\qquad \wedge x.\text{Leg\_number}<a.\text{Leg\_number}) \\ &\qquad \wedge \neg(\exists y)(\text{FLIGHT\_LEG}(y) \\ &\qquad \wedge y.\text{Flight\_number}=b.\text{Flight\_number} \\ &\qquad \wedge y.\text{Leg\_number}>b.\text{Leg\_number}) \,\} \end{aligned} $$

**(b)** Some leg l of flight f departs from 'iah' and arrives at 'lax'.

$$ \begin{aligned} &\{\, f.\text{Flight\_number}, f.\text{Weekdays} \mid\  \text{FLIGHT}(f) \\ &\qquad \wedge (\exists l)(\text{FLIGHT\_LEG}(l) \\ &\qquad \wedge l.\text{Flight\_number}=f.\text{Flight\_number} \\ &\qquad \wedge l.\text{Departure\_airport\_code}=\text{`iah'} \\ &\qquad \wedge l.\text{Arrival\_airport\_code}=\text{`lax'}) \,\} \end{aligned} $$

**(c)** Both the leg l and the flight f are free (they supply output attributes); the two airports are bound.

$$ \begin{aligned} &\{\, l.\text{Flight\_number}, l.\text{Departure\_airport\_code}, \\ &\qquad l.\text{Scheduled\_departure\_time}, \\ &\qquad l.\text{Arrival\_airport\_code}, \\ &\qquad l.\text{Scheduled\_arrival\_time}, f.\text{Weekdays} \mid \\ &\qquad \text{FLIGHT\_LEG}(l) \wedge \text{FLIGHT}(f) \\ &\qquad \wedge f.\text{Flight\_number}=l.\text{Flight\_number} \\ &\qquad \wedge (\exists a)(\exists b)\big(\text{AIRPORT}(a) \wedge \text{AIRPORT}(b) \\ &\qquad \wedge a.\text{City}=\text{`Houston'} \wedge b.\text{City}=\text{`Los Angeles'} \\ &\qquad \wedge l.\text{Departure\_airport\_code}=a.\text{Airport\_code} \\ &\qquad \wedge l.\text{Arrival\_airport\_code}=b.\text{Airport\_code}\big) \,\} \end{aligned} $$

**(d)** $\{\, r \mid \text{FARE}(r) \wedge r.\text{Flight\_number}=\text{`co197'} \,\}$

### Problem 4 [TRC · Application · 6 pts · Elmasri 8.26]

LIBRARY in TRC: (c) names of borrowers who have no books checked out; (d) for each book loaned out from Sharpstown whose Due_date is today, the title, borrower's name and address; (f) names, addresses and number of books checked out for borrowers with more than five books checked out.

*Solution.*

**Assumption.** "Today" is a constant date supplied with the query. *(Reason: TRC has no date functions.)*

**(c)** No loan belongs to the borrower:

$$ \begin{aligned} &\{\, b.\text{Name} \mid \text{BORROWER}(b) \wedge \neg(\exists l)(\text{BOOK\_LOANS}(l) \\ &\qquad \wedge l.\text{Card\_no}=b.\text{Card\_no}) \,\} \end{aligned} $$

**(d)** The book k and the borrower b are free; the loan l and the branch r are bound and joined to them.

$$ \begin{aligned} &\{\, k.\text{Title}, b.\text{Name}, b.\text{Address} \mid\  \text{BOOK}(k) \\ &\qquad \wedge \text{BORROWER}(b) \\ &\qquad \wedge (\exists l)(\exists r)\big(\text{BOOK\_LOANS}(l) \wedge \text{LIBRARY\_BRANCH}(r) \\ &\qquad \wedge r.\text{Branch\_name}=\text{`Sharpstown'} \\ &\qquad \wedge l.\text{Branch\_id}=r.\text{Branch\_id} \\ &\qquad \wedge l.\text{Book\_id}=k.\text{Book\_id} \\ &\qquad \wedge l.\text{Card\_no}=b.\text{Card\_no} \wedge l.\text{Due\_date}=\text{today}\big) \,\} \end{aligned} $$

**(f)** This query **cannot be expressed** in basic TRC, because TRC has no aggregate functions, so "the number of books checked out" cannot be returned. The condition "more than five books" alone can be written with six bound loan variables $l_1, \dots, l_6$ that all belong to the borrower and are pairwise different (each pair differs in Book_id or Branch_id); with it, the borrower's name and address can be returned, but not the count.

### Problem 5 [TRC · Concept · 3 pts · Elmasri 8.27]

In a TRC query with n tuple variables, what is the typical minimum number of join conditions? Why? What happens with fewer?

*Solution.*

**Answer.** The typical minimum is **n − 1** join conditions.

**Justification.**
1. A join condition links two tuple variables. For the n variables to describe one combined fact, they must all be connected, like the edges of a spanning tree.
2. A connected structure on n variables needs at least n − 1 links, since each link connects one more variable to the rest.
3. With fewer than n − 1 join conditions, at least one variable is not linked to the others. Every tuple of its range then combines with every combination of the others, so the result contains a **Cartesian product** of unrelated tuples. Such a result is almost always wrong and very large.

### Problem 6 [TRC · Application · 4 pts · Elmasri 8.29]

Retrieve the Ssns of employees who work on at least those projects on which the employee with Ssn = 123456789 works. Use (∀x)(IF P THEN Q) with x over PROJECT, P = "123456789 works on x", Q = "e works on x", and the rules ∀ = ¬∃¬ and IF P THEN Q = ¬P ∨ Q.

*Solution.*

**Assumption.** x ranges over all tuples, so the implication "if x is a project on which 123456789 works, then e works on x" is written with ¬PROJECT(x) as one alternative. *(Reason: the universal quantifier is not restricted to one relation.)*

**Direct form**, using (∀x)(IF P THEN Q) with IF P THEN Q ≡ ¬P ∨ Q:

$$ \begin{aligned} &\{\, e.\text{Ssn} \mid \text{EMPLOYEE}(e) \wedge (\forall x)\Big(\neg\text{PROJECT}(x) \\ &\qquad \vee \neg(\exists w)(\text{WORKS\_ON}(w) \\ &\qquad \wedge w.\text{Essn}=\text{`123456789'} \wedge w.\text{Pno}=x.\text{Pnumber}) \\ &\qquad \vee (\exists v)(\text{WORKS\_ON}(v) \wedge v.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge v.\text{Pno}=x.\text{Pnumber})\Big) \,\} \end{aligned} $$

**Form with ∃ only**, using (∀x) P ≡ ¬(∃x)(¬P) and De Morgan's law ¬(¬A ∨ ¬B ∨ C) ≡ A ∧ B ∧ ¬C:

$$ \begin{aligned} &\{\, e.\text{Ssn} \mid \text{EMPLOYEE}(e) \wedge \neg(\exists x)\Big(\text{PROJECT}(x) \\ &\qquad \wedge (\exists w)(\text{WORKS\_ON}(w) \\ &\qquad \wedge w.\text{Essn}=\text{`123456789'} \wedge w.\text{Pno}=x.\text{Pnumber}) \\ &\qquad \wedge \neg(\exists v)(\text{WORKS\_ON}(v) \wedge v.\text{Essn}=e.\text{Ssn} \\ &\qquad \wedge v.\text{Pno}=x.\text{Pnumber})\Big) \,\} \end{aligned} $$

**Reading.** There is no project on which employee 123456789 works and employee e does not.

**Final answer.** Either expression above. Employee 123456789 also satisfies the condition; add $e.\text{Ssn} \ne \text{`123456789'}$ to exclude them.

### Problem 7 [TRC · Application · 4 pts · Elmasri 8.30]

Express in TRC: (a) $\sigma_{A=C}(R(A,B,C))$; (b) $\pi_{A,B}(R)$; (c) $R(A,B,C) * S(C,D,E)$; (d) R ∪ S; (e) R ∩ S; (f) R − S (R, S both (A, B, C)).

*Solution.*

**Answer.**

| Operation | TRC expression | Explanation |
| --- | --- | --- |
| (a) $\sigma_{A=C}(R)$ | $\{\, t \mid R(t) \wedge t.A = t.C \,\}$ | selection becomes a condition on t |
| (b) $\pi_{A,B}(R)$ | $\{\, t.A, t.B \mid R(t) \,\}$ | projection becomes the output list |
| (c) $R * S$ | $\{\, t.A, t.B, t.C, s.D, s.E \mid R(t) \wedge S(s) \wedge t.C = s.C \,\}$ | natural join on C, with one copy of C |
| (d) R ∪ S | $\{\, t \mid R(t) \vee S(t) \,\}$ | union becomes ∨ |
| (e) R ∩ S | $\{\, t \mid R(t) \wedge S(t) \,\}$ | intersection becomes ∧ |
| (f) R − S | $\{\, t \mid R(t) \wedge \neg S(t) \,\}$ | difference becomes ∧ ¬ |

## B. Assignment 5 queries in TRC (likely exam form)

Schema: BOOKS(**ISBN**, AuthorName, Title, Publisher, YearofBook), COAUTHORS(**ISBN, JointAuthorName**), PERSONS(**Name**, YearofBirth, Residence), PUBLISHERS(**Publisher**, City).

### Problem 8 [TRC · Application · 5 pts · A5 individual Q1(a) in TRC]

Complete rows of books whose senior author is younger than all the coauthors of the book.

*Solution.*

**Assumptions.**
1. AuthorName and JointAuthorName refer to PERSONS.Name. *(Reason: they name authors, who are persons.)*
2. X is younger than Y if X.YearofBirth > Y.YearofBirth. *(Reason: only the year of birth is stored.)*
3. Books with no coauthors are included. *(Reason: a universal condition over an empty set is true.)*

**Answer.** The book b qualifies if there is no coauthor of b who is the same age as the senior author or younger:

$$ \begin{aligned} &\{\, b \mid \text{BOOKS}(b) \wedge \neg(\exists c)(\exists p)(\exists q)\big( \text{COAUTHORS}(c) \\ &\qquad \wedge \text{PERSONS}(p) \\ &\qquad \wedge \text{PERSONS}(q) \wedge c.\text{ISBN}=b.\text{ISBN} \\ &\qquad \wedge p.\text{Name}=b.\text{AuthorName} \\ &\qquad \wedge q.\text{Name}=c.\text{JointAuthorName} \\ &\qquad \wedge p.\text{YearofBirth} \le q.\text{YearofBirth}\big) \,\} \end{aligned} $$

**Explanation.** The bound variables c, p and q are the coauthor tuple, the senior author's PERSONS tuple and the coauthor's PERSONS tuple. The condition p.YearofBirth ≤ q.YearofBirth says the senior author is not younger than this coauthor; ¬∃ excludes every book with such a coauthor.

> **Examiner's note.** To exclude books without coauthors, add $(\exists c')(\text{COAUTHORS}(c') \wedge c'.\text{ISBN}=b.\text{ISBN})$ and state the assumption.

### Problem 9 [TRC · Application · 5 pts · A5 group Q2(a) in TRC]

Complete rows of books whose senior author lives in the city of the publisher.

*Solution.*

**Assumption.** Residence and City are both city names and can be compared. *(Reason: the question says Residence is a city.)*

**Answer.** The bound variables p and u are the senior author's PERSONS tuple and the book's PUBLISHERS tuple:

$$ \begin{aligned} &\{\, b \mid \text{BOOKS}(b) \wedge (\exists p)(\exists u)\big(\text{PERSONS}(p) \\ &\qquad \wedge \text{PUBLISHERS}(u) \\ &\qquad \wedge p.\text{Name}=b.\text{AuthorName} \\ &\qquad \wedge u.\text{Publisher}=b.\text{Publisher} \\ &\qquad \wedge p.\text{Residence}=u.\text{City}\big) \,\} \end{aligned} $$

### Problem 10 [TRC · Application · 5 pts · A5 group Q2(c) in TRC]

Complete rows of authors who published a book before a coauthor of a subsequent book of theirs was born.

*Solution.*

**Assumptions.**
1. "Author" is the senior author of both books; the coauthor belongs to the later book. *(Reason: as in the A5 key.)*
2. An earlier year means an earlier event. *(Reason: only years are stored.)*

**Answer.**

$$ \begin{aligned} &\{\, a \mid \text{PERSONS}(a) \wedge (\exists b_1)(\exists b_2)(\exists c)(\exists z)\big( \text{BOOKS}(b_1) \\ &\qquad \wedge \text{BOOKS}(b_2) \wedge \text{COAUTHORS}(c) \wedge \text{PERSONS}(z) \\ &\qquad \wedge b_1.\text{AuthorName}=a.\text{Name} \\ &\qquad \wedge b_2.\text{AuthorName}=a.\text{Name} \\ &\qquad \wedge b_2.\text{YearofBook} > b_1.\text{YearofBook} \\ &\qquad \wedge c.\text{ISBN}=b_2.\text{ISBN} \wedge z.\text{Name}=c.\text{JointAuthorName} \\ &\qquad \wedge z.\text{YearofBirth} > b_1.\text{YearofBook}\big) \,\} \end{aligned} $$

**Explanation.** b1 is the earlier book and b2 the later book, both with senior author a; c is a coauthor of b2 and z is that coauthor's PERSONS tuple. The five variables are linked by four join conditions (a–b1, a–b2, b2–c, c–z), as Problem 5 predicts.

### Problem 11 [TRC · Application · 4 pts]

Publishers all of whose books were written (as senior author) by people living in the publisher's city.

*Solution.*

**Assumption.** A publisher with no books qualifies. *(Reason: "all of its books" is vacuously true over an empty set; add an ∃ book condition to exclude such publishers.)*

**Answer.** There is no book of u whose senior author does not live in u's city:

$$ \begin{aligned} &\{\, u.\text{Publisher} \mid \text{PUBLISHERS}(u) \\ &\qquad \wedge \neg(\exists b)\big( \text{BOOKS}(b) \\ &\qquad \wedge b.\text{Publisher}=u.\text{Publisher} \\ &\qquad \wedge \neg(\exists p)(\text{PERSONS}(p) \wedge p.\text{Name}=b.\text{AuthorName} \\ &\qquad \wedge p.\text{Residence}=u.\text{City})\big) \,\} \end{aligned} $$

### Problem 12 [TRC · Concept · 3 pts]

Which of these are safe? (a) $\{\, t \mid \neg\text{PERSONS}(t) \,\}$ (b) $\{\, t \mid \text{PERSONS}(t) \wedge \neg(\exists b)(\text{BOOKS}(b) \wedge b.\text{AuthorName}=t.\text{Name}) \,\}$ (c) $\{\, t \mid \text{PERSONS}(t) \vee \text{PUBLISHERS}(t) \,\}$

*Solution.*

**Definition.** A TRC expression is **safe** if every value in its result comes from the domain of the expression: the relations it mentions and the constants it uses.

**(a)** $\{\, t \mid \neg\text{PERSONS}(t) \,\}$ is **unsafe**. Infinitely many tuples are not persons, and nothing restricts t to a finite relation.

**(b)** $\{\, t \mid \text{PERSONS}(t) \wedge \neg(\exists b)(\ldots) \,\}$ is **safe**, because the atom PERSONS(t) restricts t to the tuples of PERSONS.

**(c)** $\{\, t \mid \text{PERSONS}(t) \vee \text{PUBLISHERS}(t) \,\}$ takes all its values from the two relations, so it is safe in that sense, but it is **ill-formed**: PERSONS and PUBLISHERS are not union-compatible (three attributes against two), so the result has no well-defined schema.

**Final answer.** (a) unsafe; (b) safe; (c) safe but not a valid query.

