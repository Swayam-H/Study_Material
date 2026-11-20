# Mock endsem

Six questions, one per syllabus block, written the way Kamal writes assignment questions: short statements, an unfamiliar schema, words left for you to interpret, and the standing instruction **"No clarifications. Make assumptions, state and justify them."** Sit it in one go (about 3 hours), on paper, with only your two A4 sheets. Then open each solution and grade yourself per part: **A** if your answer is correct and justified as a whole, **C** if it shows a misunderstanding, **B** otherwise.

> **Schema for Questions 4 and 5 (conference database).** Underlined attributes are keys or foreign keys, but the underlining does not say which.
> PAPERS(**PaperID**, Title, Track, Year) · WRITES(**PaperID, Author**, Position) · PEOPLE(**Name**, Affiliation, Country) · REVIEWS(**PaperID, Reviewer**, Score)
> Position is an author's place in the author list (1 = first author). Score is an integer review score. Author and Reviewer are people.

### Problem 1 [Mock · EER · 10 pts · Mock endsem Q1]

Draw an EER model with (min, max) constraints for a conference. A conference has one or more tracks, each identified by a name within the conference; a conference is identified by its acronym and year. Every paper is submitted to exactly one track and has one or more authors, listed in order; one of the authors is the contact author. Each person is identified by email and has a name and one or more affiliations. Programme committee members review papers; each paper gets at least three reviews, and each review records a score and comments. A review is identified by the paper and a review number. A person may be both an author and a PC member. No clarifications.

*Solution.* **Entities.** CONFERENCE (key (Acronym, Year)). TRACK: **weak**, owner CONFERENCE, partial key Track_name, identifying relationship HAS_TRACK: CONFERENCE (1,N), TRACK (1,1). PAPER (key PaperID; Title). PERSON (key Email; Name; **multivalued** Affiliation). REVIEW: **weak**, owner PAPER, partial key Review_no; Score, Comments; identifying relationship OF_PAPER: PAPER (3,N), REVIEW (1,1).
**Specialization.** PERSON → {AUTHOR, PC_MEMBER}, **overlapping (o)** (stated: a person may be both), **partial** (the database may hold people who are neither, e.g. a chair; state it).
**Relationships.** SUBMITTED_TO: PAPER (1,1), TRACK (0,N). WRITES: AUTHOR (1,N), PAPER (1,N), with attribute Position. CONTACT: PAPER (1,1), AUTHOR (0,N). WRITTEN_BY: REVIEW (1,1), PC_MEMBER (0,N) (or (1,N) if every PC member must review something).
**Constraints EER cannot express** (write them as assumptions): the contact author must be one of the paper's authors; a PC member must not review their own paper; Position values of one paper are 1, 2, …, n without gaps.
An A needs every (min, max), the two weak entities with partial keys, the overlapping specialization with a reason, the relationship attribute Position on WRITES (not on PAPER or AUTHOR), the multivalued Affiliation, and at least one stated assumption.

### Problem 2 [Mock · Mapping · 10 pts · Mock endsem Q2]

Map your model from Question 1 to relations. Show primary keys, foreign keys (as arrows or "→"), NOT NULL / UNIQUE where constraints need them, and briefly explain each mapping choice.

*Solution.*
- CONFERENCE(**Acronym, Year**)
- TRACK(**Acronym, Year, Track_name**), (Acronym, Year) → CONFERENCE (weak: owner key + partial key; CASCADE)
- PAPER(**PaperID**, Title, Acronym, Year, Track_name, Contact_email), (Acronym, Year, Track_name) → TRACK **NOT NULL** (1:N, total); Contact_email → AUTHOR NOT NULL
- PERSON(**Email**, Name); PERSON_AFFILIATION(**Email, Affiliation**) (multivalued)
- AUTHOR(**Email**) → PERSON; PC_MEMBER(**Email**) → PERSON (option 8A: overlapping and partial rule out 8B and 8C)
- WRITES(**PaperID, Email**, Position), PaperID → PAPER, Email → AUTHOR (M:N with its attribute); add UNIQUE(PaperID, Position)
- REVIEW(**PaperID, Review_no**, Score, Comments, Reviewer_email), PaperID → PAPER (weak), Reviewer_email → PC_MEMBER NOT NULL (1:N folded into the N side)

Explain: the FK to a composite key carries all three parts; "at least three reviews" and "contact is an author" are not enforceable by keys (need a CHECK/assertion/trigger: say so). Major mistakes to avoid: TRACK keyed by Track_name alone, Affiliation as a column, Position in AUTHOR, 8C for the specialization.

### Problem 3 [Mock · Normalisation · 20 pts · Mock endsem Q3]

(a) Prove or disprove: if R is in 3NF and every candidate key of R is a single attribute, then R is in BCNF.
(b) R(A, B, C, D, E) with F = {AB → C, C → D, D → B, D → E}. (i) Find all candidate keys and the highest normal form of R. (ii) Decompose R into BCNF; is your decomposition dependency-preserving? (iii) Find a minimal cover of F. (iv) Using it, decompose R into 3NF. Is each 3NF relation also in BCNF?

*Solution.* (a) **True.** Suppose R is in 3NF, every key is a single attribute, and some non-trivial X → A in $F^+$ violates BCNF, so X is not a superkey. Since R is in 3NF, A must be prime, so A belongs to some candidate key; all keys are single attributes, so {A} itself is a key and A → R. Then X → A and A → R give X → R by transitivity: X is a superkey, a contradiction. So no violation exists and R is in BCNF.

(b)(i) A is on no right side, so A is in every key; $A^+$ = A. $(AB)^+$ = ABCDE, $(AC)^+$ = ACDBE, $(AD)^+$ = ADBEC, $(AE)^+$ = AE. **Keys AB, AC, AD.** Prime A, B, C, D; non-prime E. D → E: D is a proper subset of the key AD and E is non-prime: partial dependency, **not 2NF**. Highest NF: **1NF**.
(ii) D → BE violates ($D^+$ = BDE). Split: R1(**D**, B, E) and R2(A, C, D). In R2 the projected FDs are C → D, AC → D, AD → C; keys AC, AD; C → D violates. Split R2 into (**C**, D) and (**A, C**). Result **{(B, D, E), (C, D), (A, C)}**, lossless (each split's common attribute is a key of one side). **AB → C is lost**: starting from AB, no part adds C (B gives only B in BDE; A gives only A in AC). So not dependency-preserving: BCNF can force this.
(iii) Right sides are single; AB → C has no extraneous attribute ($A^+$ = A, $B^+$ = B); no FD is implied by the others (each closure test fails). **F is already minimal.**
(iv) Groups (A, B, C), (C, D), (D, B, E). (A, B, C) contains the key AB, so no extra relation. **{(A, B, C), (C, D), (B, D, E)}**, lossless and dependency-preserving. (C, D) and (B, D, E) are BCNF. In (A, B, C) the projected FDs are AB → C and **C → B** (from C → D → B); its keys are AB and AC, B is prime, so it is **3NF but not BCNF**. This is the 3NF/BCNF trade-off in one problem.

### Problem 4 [Mock · RA · 20 pts · Mock endsem Q4]

On the conference schema, write relational algebra for (a)–(c) and tuple relational calculus for (d)–(e). State your assumptions.
(a) Complete rows of papers all of whose authors are from India (Country = 'India').
(b) For each track, the number of papers and the average review score of its papers.
(c) Names of reviewers who reviewed a paper written by someone with the same affiliation as the reviewer.
(d) Names of reviewers who reviewed every paper in the track 'DB'.
(e) Titles of papers that received no score below 3.

*Solution.* Assumptions: keys PaperID, (PaperID, Author), Name, (PaperID, Reviewer); Author, Reviewer → PEOPLE.Name; PaperID in WRITES and REVIEWS → PAPERS; every paper has at least one author; one affiliation per person (Name is the key of PEOPLE).

(a) Papers with at least one non-Indian author, subtracted from all papers:
$$ \begin{aligned} \text{BAD} &\leftarrow \pi_{\text{PaperID}}\big(\text{WRITES} \\ &\qquad \bowtie_{\text{Author}=\text{Name}} \sigma_{\text{Country} \ne \text{`India'}}(\text{PEOPLE})\big) \\ \text{ANSWER} &\leftarrow \text{PAPERS} \bowtie (\pi_{\text{PaperID}}(\text{PAPERS}) \\ &\qquad - \text{BAD}) \end{aligned} $$
(If some author's Country is NULL, σ treats the comparison as not true, so that paper is kept: state your reading.)

(b) Count and average separately (a join would multiply papers by reviews):
$$ \begin{aligned} \text{NP} &\leftarrow \gamma_{\text{Track};\ \text{COUNT(PaperID)} \to \text{NumPapers}}(\text{PAPERS}) \\ \text{AS} &\leftarrow \gamma_{\text{Track};\ \text{AVG(Score)} \to \text{AvgScore}}\big(\pi_{\text{PaperID},\,\text{Track},\,\text{Reviewer},\,\text{Score}}(\text{PAPERS} \\ &\qquad \bowtie \text{REVIEWS})\big) \\ \text{ANSWER} &\leftarrow \text{NP} ⟕ \text{AS} \end{aligned} $$
The projection keeps Reviewer so two equal scores on one paper are not merged into one tuple (π removes duplicates). The left outer join keeps tracks with no reviews (AvgScore NULL). "Average of per-paper averages" is another reading; state which you use.

(c) Rename two copies of PEOPLE:
$$ \begin{aligned} &\pi_{\text{Reviewer}}\Big(\sigma_{\text{RAff}=\text{AAff}}\big(\text{REVIEWS} \bowtie \text{WRITES} \\ &\qquad \bowtie \rho_{(\text{Reviewer},\,\text{RAff},\,\text{RC})}(\text{PEOPLE}) \\ &\qquad \bowtie \rho_{(\text{Author},\,\text{AAff},\,\text{AC})}(\text{PEOPLE})\big)\Big) \end{aligned} $$
REVIEWS ⋈ WRITES joins on PaperID (pairs each review with each author of that paper); the renamed copies attach each side's affiliation by natural join. Add Reviewer ≠ Author if reviewing one's own paper should not count.

(d)
$$ \begin{aligned} &\{\, p.\text{Name} \mid\  \text{PEOPLE}(p) \wedge (\exists r)(\text{REVIEWS}(r) \\ &\qquad \wedge r.\text{Reviewer}=p.\text{Name}) \\ &\qquad \wedge \neg(\exists x)\big(\text{PAPERS}(x) \wedge x.\text{Track}=\text{`DB'} \\ &\qquad \wedge \neg(\exists v)(\text{REVIEWS}(v) \\ &\qquad \wedge v.\text{PaperID}=x.\text{PaperID} \wedge v.\text{Reviewer}=p.\text{Name})\big) \,\} \end{aligned} $$
The first ∃ restricts the answer to people who reviewed something (otherwise, if there are no DB papers, every person qualifies vacuously; say which you want).

(e)
$$ \begin{aligned} &\{\, x.\text{Title} \mid \text{PAPERS}(x) \wedge \neg(\exists r)(\text{REVIEWS}(r) \\ &\qquad \wedge r.\text{PaperID}=x.\text{PaperID} \wedge r.\text{Score} < 3) \,\} \end{aligned} $$
Papers with no reviews at all are included (vacuously no low score): state it, or add an ∃ review condition.

### Problem 5 [Mock · SQL · 15 pts · Mock endsem Q5]

On the conference schema, write SQL. (a) For every person, the number of papers they wrote and the number on which they are first author; include people with zero. (b) The paper or papers with the highest average score (list all ties). (c) Reviewers who reviewed at least two papers in the same track. (d) DDL for REVIEWS so that scores lie between 1 and 5 and deleting a paper deletes its reviews.

*Solution.*

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

In (a), `SUM(CASE …)` returns 0 for people with no papers, because on their single NULL row the CASE yields 0. In (c), DISTINCT is needed because a reviewer can qualify in several tracks.

### Problem 6 [Mock · SQL · 10 pts · Mock endsem Q6]

EMPLOYEE(Ssn, Super_ssn) stores a supervision hierarchy. The **level** of an employee is 0 if they have no supervisor, and otherwise one more than their supervisor's level. Algorithm: (A) LEVEL ← all employees with no supervisor, at level 0; (B) k ← 0; (C) repeat: (D) add every employee whose supervisor has level k and who has no level yet, at level k + 1; (E) k ← k + 1; (F) until step (D) added nothing; (G) if some employee has no level, report an error; else (H) output every employee with their level. (a) Give SQL for each step. (b) What does an error in (G) mean? (c) Write the same computation as one recursive query.

*Solution.* Assumptions: Ssn is the key; Super_ssn → Ssn (NULL for the top); no duplicate rows; loops in a stored procedure (MySQL syntax) with variables k and added.

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

MySQL does not allow reading LVL in a subquery of an INSERT into LVL; insert into a temporary table first, then copy (state it). (b) An employee left without a level is not reachable from any top employee: following Super_ssn from them never reaches NULL, so the supervision chain contains a **cycle** (A supervises B supervises A). (c)

```sql
WITH RECURSIVE L (Ssn, Level) AS (
    SELECT Ssn, 0 FROM EMPLOYEE WHERE Super_ssn IS NULL
  UNION ALL
    SELECT E.Ssn, L.Level + 1 FROM EMPLOYEE E JOIN L ON E.Super_ssn = L.Ssn
)
SELECT Ssn, Level FROM L ORDER BY Level, Ssn;
```

Employees on a cycle never appear (the base case never reaches them), matching (G).
