# Mock endsem

Six questions, one per syllabus block, written the way Kamal writes assignment questions: short statements, an unfamiliar schema, words left for you to interpret, and the standing instruction **"No clarifications. Make assumptions, state and justify them."** Sit it in one go (about 3 hours), on paper, with only your two A4 sheets. Then open each solution and grade yourself per part: **A** if your answer is correct and justified as a whole, **C** if it shows a misunderstanding, **B** otherwise.

> **Schema for Questions 4 and 5 (conference database).** Underlined attributes are keys or foreign keys, but the underlining does not say which.
> PAPERS(**PaperID**, Title, Track, Year) · WRITES(**PaperID, Author**, Position) · PEOPLE(**Name**, Affiliation, Country) · REVIEWS(**PaperID, Reviewer**, Score)
> Position is an author's place in the author list (1 = first author). Score is an integer review score. Author and Reviewer are people.

### Problem 1 [Mock · EER · 10 pts · Mock endsem Q1]

Draw an EER model with (min, max) constraints for a conference. A conference has one or more tracks, each identified by a name within the conference; a conference is identified by its acronym and year. Every paper is submitted to exactly one track and has one or more authors, listed in order; one of the authors is the contact author. Each person is identified by email and has a name and one or more affiliations. Programme committee members review papers; each paper gets at least three reviews, and each review records a score and comments. A review is identified by the paper and a review number. A person may be both an author and a PC member. No clarifications.

*Solution.*

**Assumptions.**
1. Track names are unique only within a conference. *(Reason: "identified by a name within the conference".)*
2. Review numbers are unique only within a paper. *(Reason: "identified by the paper and a review number".)*
3. The database may hold persons who are neither authors nor PC members, for example organisers. *(Reason: not excluded by the requirements; this makes the specialization partial.)*
4. A PC member need not have written any review yet. *(Reason: reviews are assigned after the PC is formed.)*

**Entity types.**
1. CONFERENCE: composite key (Acronym, Year).
2. TRACK: **weak**, owner CONFERENCE, partial key Track_name.
3. PAPER: key PaperID; attribute Title.
4. PERSON: key Email; attribute Name; **multivalued** attribute Affiliation.
5. REVIEW: **weak**, owner PAPER, partial key Review_no; attributes Score and Comments.
6. AUTHOR and PC_MEMBER: subclasses of PERSON.

**Specialization.** PERSON → {AUTHOR, PC_MEMBER} is **overlapping (o)**, because a person may be both, and **partial**, by Assumption 3.

**Relationship types with (min, max).**

| Relationship | Participants and (min, max) | Attribute | Justification |
| --- | --- | --- | --- |
| HAS_TRACK (identifying) | CONFERENCE (1,N), TRACK (1,1) | — | a conference has one or more tracks |
| SUBMITTED_TO | PAPER (1,1), TRACK (0,N) | — | each paper to exactly one track |
| WRITES | AUTHOR (1,N), PAPER (1,N) | Position | a paper has one or more authors, in order |
| CONTACT | PAPER (1,1), AUTHOR (0,N) | — | one contact author per paper |
| OF_PAPER (identifying) | PAPER (3,N), REVIEW (1,1) | — | at least three reviews per paper |
| WRITTEN_BY | REVIEW (1,1), PC_MEMBER (0,N) | — | each review by one PC member; Assumption 4 |

**Constraints that EER cannot express** (stated as assumptions):
- the contact author of a paper must be one of its authors;
- a PC member must not review a paper they wrote;
- the Position values of a paper's authors are 1, 2, …, n without gaps.

**Final answer.** The EER diagram with the six entity types above (TRACK and REVIEW drawn as weak, with double rectangles and dashed partial keys), the overlapping partial specialization, and the six relationship types with the (min, max) pairs in the table.

> **Examiner's note.** An A needs every (min, max), both weak entities with partial keys, the overlapping specialization with its reason, Position on WRITES (not on PAPER or AUTHOR), the multivalued Affiliation, and at least one stated assumption.

### Problem 2 [Mock · Mapping · 10 pts · Mock endsem Q2]

Map your model from Question 1 to relations. Show primary keys, foreign keys (as arrows or "→"), NOT NULL / UNIQUE where constraints need them, and briefly explain each mapping choice.

*Solution.*

**Assumption.** The specialization is mapped with option 8A. *(Reason: it is overlapping and partial, which rules out 8B (needs total) and 8C (needs disjoint).)*

**Relational schema** (primary keys in bold).
1. CONFERENCE(**Acronym, Year**)
2. TRACK(**Acronym, Year, Track_name**); (Acronym, Year) → CONFERENCE, ON DELETE CASCADE
3. PAPER(**PaperID**, Title, Acronym, Year, Track_name, Contact_email); (Acronym, Year, Track_name) → TRACK, NOT NULL; Contact_email → AUTHOR, NOT NULL
4. PERSON(**Email**, Name)
5. PERSON_AFFILIATION(**Email, Affiliation**); Email → PERSON
6. AUTHOR(**Email**); Email → PERSON
7. PC_MEMBER(**Email**); Email → PERSON
8. WRITES(**PaperID, Email**, Position); PaperID → PAPER; Email → AUTHOR; UNIQUE (PaperID, Position)
9. REVIEW(**PaperID, Review_no**, Score, Comments, Reviewer_email); PaperID → PAPER, ON DELETE CASCADE; Reviewer_email → PC_MEMBER, NOT NULL

**Explanation of the mapping.**
1. Strong entity types (CONFERENCE, PAPER, PERSON) become relations keyed by their keys.
2. Weak entity types (TRACK, REVIEW) take the owner's full key plus their partial key as primary key; the identifying relationships need no relation of their own.
3. SUBMITTED_TO, CONTACT and WRITTEN_BY are 1:N, so each becomes a foreign key on the N side, NOT NULL because participation on that side is total. The foreign key to TRACK carries all three parts of TRACK's key.
4. WRITES is M:N, so it becomes a relation keyed by both participants; its attribute Position goes there, and UNIQUE (PaperID, Position) stops two authors sharing a position.
5. The multivalued Affiliation becomes PERSON_AFFILIATION.
6. The constraints "at least three reviews" and "the contact author is an author of the paper" cannot be enforced by keys; they need a CHECK, an assertion or a trigger.

**Final answer.** The nine relations above, with arrows from each foreign key to the key it references.

> **Examiner's note.** Major mistakes to avoid: TRACK keyed by Track_name alone, Affiliation as a column of PERSON, Position in AUTHOR, option 8C for the specialization.

### Problem 3 [Mock · Normalisation · 20 pts · Mock endsem Q3]

(a) Prove or disprove: if R is in 3NF and every candidate key of R is a single attribute, then R is in BCNF.
(b) R(A, B, C, D, E) with F = {AB → C, C → D, D → B, D → E}. (i) Find all candidate keys and the highest normal form of R. (ii) Decompose R into BCNF; is your decomposition dependency-preserving? (iii) Find a minimal cover of F. (iv) Using it, decompose R into 3NF. Is each 3NF relation also in BCNF?

*Solution.*

**(a)** The statement is **true**.

**Proof.**
1. Suppose R is in 3NF and every candidate key of R is a single attribute, and suppose for contradiction that some non-trivial FD X → A in $F^+$ violates BCNF, so X is not a superkey.
2. Since R is in 3NF and X is not a superkey, A must be prime, so A belongs to some candidate key.
3. Every candidate key is a single attribute, so {A} is itself a candidate key, and A → R.
4. From X → A and A → R, transitivity gives X → R, so X is a superkey. This contradicts step 1.
5. Hence no FD violates BCNF, and R is in BCNF. ∎

**(b)(i) Keys and highest normal form.**
1. A appears on no right-hand side, so it is in every key; $A^+ = A$.
2. $(AB)^+$: AB → C, C → D, D → B, D → E gives ABCDE. $(AC)^+$: C → D, D → B, D → E gives ABCDE. $(AD)^+$: D → B, D → E, AB → C gives ABCDE. $(AE)^+ = AE$.
3. **Candidate keys: AB, AC, AD.** Prime: A, B, C, D. Non-prime: E.
4. D → E holds, D is a proper subset of the key AD, and E is non-prime: a partial dependency. **R is not in 2NF; the highest normal form is 1NF.**

**(b)(ii) BCNF decomposition.**
1. D → BE violates BCNF ($D^+ = BDE$). Split into R1 = (D, B, E), with key D, and R2 = (A, C, D).
2. The FDs holding in R2 are C → D, AC → D and AD → C; its keys are AC and AD. C → D violates BCNF in R2. Split into (C, D) and (A, C).
3. Each split is lossless, because the common attributes (D, then C) form a key of one part.
4. **AB → C is not preserved.** Starting from Z = AB: (B, D, E) adds only B; (C, D) adds nothing; (A, C) adds only A. C is never reached.

**Answer.** **{(B, D, E), (C, D), (A, C)}**, lossless but **not dependency-preserving**.

**(b)(iii) Minimal cover.** Every right-hand side is a single attribute. In AB → C neither A nor B is extraneous ($A^+ = A$, $B^+ = B$). No FD is implied by the others (each closure test fails). **F itself is a minimal cover.**

**(b)(iv) 3NF synthesis.**
1. One relation per left-hand side: (A, B, C), (C, D), (D, B, E).
2. (A, B, C) contains the key AB, so no extra relation is needed. No relation is contained in another.
3. (C, D) and (D, B, E) are in BCNF. In (A, B, C) the projected FDs are AB → C and C → B (from C → D → B); its keys are AB and AC. C → B violates BCNF but not 3NF, because B is prime.

**Answer.** **{(A, B, C), (C, D), (B, D, E)}**, lossless and dependency-preserving; (A, B, C) is in **3NF but not BCNF**.

### Problem 4 [Mock · RA · 20 pts · Mock endsem Q4]

On the conference schema, write relational algebra for (a)–(c) and tuple relational calculus for (d)–(e). State your assumptions.
(a) Complete rows of papers all of whose authors are from India (Country = 'India').
(b) For each track, the number of papers and the average review score of its papers.
(c) Names of reviewers who reviewed a paper written by someone with the same affiliation as the reviewer.
(d) Names of reviewers who reviewed every paper in the track 'DB'.
(e) Titles of papers that received no score below 3.

*Solution.*

**Assumptions.**
1. The keys are PaperID for PAPERS, (PaperID, Author) for WRITES, Name for PEOPLE and (PaperID, Reviewer) for REVIEWS. *(Reason: a paper has many authors and many reviewers, each listed once.)*
2. Author and Reviewer refer to PEOPLE.Name, and PaperID in WRITES and REVIEWS refers to PAPERS. *(Reason: they name people and papers.)*
3. Every paper has at least one author, and each person has one affiliation and one country. *(Reason: Name is the key of PEOPLE.)*
4. In (b), the average is over all reviews of the track's papers. *(Reason: "average review score"; the average of per-paper averages is another possible reading.)*

**(a)** Papers with at least one non-Indian author are subtracted from all papers:

$$ \begin{aligned} \text{BAD} &\leftarrow \pi_{\text{PaperID}}\big(\text{WRITES} \\ &\qquad \bowtie_{\text{Author}=\text{Name}} \sigma_{\text{Country} \ne \text{`India'}}(\text{PEOPLE})\big) \\ \text{ANSWER} &\leftarrow \text{PAPERS} \bowtie (\pi_{\text{PaperID}}(\text{PAPERS}) \\ &\qquad - \text{BAD}) \end{aligned} $$

If an author's Country is NULL, the selection treats the comparison as not true, so that paper is kept.

**(b)** The paper count and the average score are computed separately, because joining papers with reviews would count each paper once per review:

$$ \begin{aligned} \text{NP} &\leftarrow \gamma_{\text{Track};\ \text{COUNT(PaperID)} \to \text{NumPapers}}(\text{PAPERS}) \\ \text{AS} &\leftarrow \gamma_{\text{Track};\ \text{AVG(Score)} \to \text{AvgScore}}\big(\pi_{\text{PaperID},\,\text{Track},\,\text{Reviewer},\,\text{Score}}(\text{PAPERS} \\ &\qquad \bowtie \text{REVIEWS})\big) \\ \text{ANSWER} &\leftarrow \text{NP} ⟕ \text{AS} \end{aligned} $$

The projection keeps Reviewer so that two equal scores on the same paper are not merged into one tuple. The left outer join keeps tracks with no reviews, whose AvgScore is NULL.

**(c)** Two renamed copies of PEOPLE attach the reviewer's and the author's affiliations:

$$ \begin{aligned} &\pi_{\text{Reviewer}}\Big(\sigma_{\text{RAff}=\text{AAff}}\big(\text{REVIEWS} \bowtie \text{WRITES} \\ &\qquad \bowtie \rho_{(\text{Reviewer},\,\text{RAff},\,\text{RC})}(\text{PEOPLE}) \\ &\qquad \bowtie \rho_{(\text{Author},\,\text{AAff},\,\text{AC})}(\text{PEOPLE})\big)\Big) \end{aligned} $$

REVIEWS ⋈ WRITES joins on PaperID, pairing each review with each author of the reviewed paper. Add Reviewer ≠ Author to exclude a person reviewing their own paper.

**(d)** There is no DB paper that p did not review; the first ∃ restricts the answer to people who reviewed at least one paper:

$$ \begin{aligned} &\{\, p.\text{Name} \mid\  \text{PEOPLE}(p) \wedge (\exists r)(\text{REVIEWS}(r) \\ &\qquad \wedge r.\text{Reviewer}=p.\text{Name}) \\ &\qquad \wedge \neg(\exists x)\big(\text{PAPERS}(x) \wedge x.\text{Track}=\text{`DB'} \\ &\qquad \wedge \neg(\exists v)(\text{REVIEWS}(v) \\ &\qquad \wedge v.\text{PaperID}=x.\text{PaperID} \wedge v.\text{Reviewer}=p.\text{Name})\big) \,\} \end{aligned} $$

Without the first ∃, every person would qualify vacuously if the track DB had no papers.

**(e)** No review of the paper has a score below 3:

$$ \begin{aligned} &\{\, x.\text{Title} \mid \text{PAPERS}(x) \wedge \neg(\exists r)(\text{REVIEWS}(r) \\ &\qquad \wedge r.\text{PaperID}=x.\text{PaperID} \wedge r.\text{Score} < 3) \,\} \end{aligned} $$

Papers with no reviews are included (they have no low score); add an ∃ review condition to exclude them.

### Problem 5 [Mock · SQL · 15 pts · Mock endsem Q5]

On the conference schema, write SQL. (a) For every person, the number of papers they wrote and the number on which they are first author; include people with zero. (b) The paper or papers with the highest average score (list all ties). (c) Reviewers who reviewed at least two papers in the same track. (d) DDL for REVIEWS so that scores lie between 1 and 5 and deleting a paper deletes its reviews.

*Solution.*

**Assumptions.**
1. Position = 1 denotes the first author. *(Reason: given.)*
2. Papers with no reviews have no average and are not candidates in (b). *(Reason: AVG over an empty set is NULL.)*
3. A reviewer reviews a paper at most once. *(Reason: (PaperID, Reviewer) is the key of REVIEWS.)*

**Queries.**

```sql
-- (a) LEFT JOIN keeps people with no papers; COUNT(column) gives 0 for them
SELECT P.Name,
       COUNT(W.PaperID) AS NumPapers,
       SUM(CASE WHEN W.Position = 1 THEN 1 ELSE 0 END) AS NumFirst
FROM   PEOPLE P LEFT JOIN WRITES W ON W.Author = P.Name
GROUP BY P.Name;

-- (b) ties kept; papers with no reviews have no average and are not listed
WITH A AS (SELECT PaperID, AVG(Score) AS AvgScore FROM REVIEWS GROUP BY PaperID)
SELECT P.PaperID, P.Title
FROM   PAPERS P JOIN A ON A.PaperID = P.PaperID
WHERE  A.AvgScore = (SELECT MAX(AvgScore) FROM A);

-- (c)
SELECT DISTINCT R.Reviewer
FROM   REVIEWS R JOIN PAPERS P ON P.PaperID = R.PaperID
GROUP BY R.Reviewer, P.Track
HAVING COUNT(DISTINCT R.PaperID) >= 2;

-- (d)
CREATE TABLE REVIEWS (
  PaperID  INT         NOT NULL,
  Reviewer VARCHAR(60) NOT NULL,
  Score    INT         NOT NULL CHECK (Score BETWEEN 1 AND 5),
  PRIMARY KEY (PaperID, Reviewer),
  FOREIGN KEY (PaperID)  REFERENCES PAPERS(PaperID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Reviewer) REFERENCES PEOPLE(Name)    ON DELETE RESTRICT ON UPDATE CASCADE
);
```

**Explanation.**
- (a) The LEFT JOIN keeps people with no papers. COUNT(W.PaperID) gives 0 for them, and SUM(CASE …) gives 0 because on their single NULL row the CASE yields 0.
- (b) Comparing with the maximum of the per-paper averages keeps all ties.
- (c) Grouping on (Reviewer, Track) counts papers per reviewer per track; DISTINCT is needed because a reviewer may qualify in several tracks.
- (d) CHECK restricts Score to 1 to 5, and ON DELETE CASCADE removes a paper's reviews with it. RESTRICT on Reviewer keeps a person with reviews from being deleted.

### Problem 6 [Mock · SQL · 10 pts · Mock endsem Q6]

EMPLOYEE(Ssn, Super_ssn) stores a supervision hierarchy. The **level** of an employee is 0 if they have no supervisor, and otherwise one more than their supervisor's level. Algorithm: (A) LEVEL ← all employees with no supervisor, at level 0; (B) k ← 0; (C) repeat: (D) add every employee whose supervisor has level k and who has no level yet, at level k + 1; (E) k ← k + 1; (F) until step (D) added nothing; (G) if some employee has no level, report an error; else (H) output every employee with their level. (a) Give SQL for each step. (b) What does an error in (G) mean? (c) Write the same computation as one recursive query.

*Solution.*

**Assumptions.**
1. Ssn is the key of EMPLOYEE, and Super_ssn references Ssn and is NULL for an employee with no supervisor. *(Reason: given.)*
2. The loop is written in a MySQL stored procedure with variables k and added. *(Reason: SQL has no loops outside procedures.)*

**(a) SQL for each step.**

```sql
CREATE TABLE LVL (Ssn CHAR(9) PRIMARY KEY, Level INT NOT NULL);
INSERT INTO LVL SELECT Ssn, 0 FROM EMPLOYEE WHERE Super_ssn IS NULL;         -- (A)
SET k = 0;                                                                     -- (B)
REPEAT                                                                         -- (C)
  INSERT INTO LVL
    SELECT E.Ssn, k + 1
    FROM   EMPLOYEE E JOIN LVL L ON E.Super_ssn = L.Ssn
    WHERE  L.Level = k
      AND  E.Ssn NOT IN (SELECT Ssn FROM LVL);                                 -- (D)
  SET added = ROW_COUNT();
  SET k = k + 1;                                                               -- (E)
UNTIL added = 0 END REPEAT;                                                    -- (F)
IF (SELECT COUNT(*) FROM EMPLOYEE WHERE Ssn NOT IN (SELECT Ssn FROM LVL)) > 0 -- (G)
  THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'cycle in supervision';
ELSE SELECT Ssn, Level FROM LVL ORDER BY Level, Ssn;                           -- (H)
END IF;
```

**Explanation of the steps.**
1. (A) LVL holds each employee with a level; the employees with no supervisor get level 0.
2. (D) Each round adds the employees whose supervisor has level k and who have no level yet, with level k + 1.
3. (F) ROW_COUNT() returns how many rows the INSERT added; the loop stops when it is 0.
4. (G) Any employee still missing from LVL triggers the error; otherwise (H) outputs the levels.

MySQL does not allow an INSERT into LVL to read LVL in a subquery; insert into a temporary table first and then copy, and say so in the answer.

**(b) Meaning of the error.** An employee who never receives a level is not reachable from any employee without a supervisor: following Super_ssn from them never reaches NULL. Since the number of employees is finite, the supervision chain must repeat, so it contains a **cycle** (for example, A supervises B and B supervises A).

**(c) Recursive query.**

```sql
WITH RECURSIVE L (Ssn, Level) AS (
    SELECT Ssn, 0 FROM EMPLOYEE WHERE Super_ssn IS NULL
  UNION ALL
    SELECT E.Ssn, L.Level + 1 FROM EMPLOYEE E JOIN L ON E.Super_ssn = L.Ssn
)
SELECT Ssn, Level FROM L ORDER BY Level, Ssn;
```

Employees on a cycle never appear in the result, because the base case never reaches them; this matches step (G).

