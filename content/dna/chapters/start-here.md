# Start here: the endsem map

This is the map for the Data and Applications (CS4.301) final exam on **Monday 23 November 2026 at 3 PM**. It tells you what is examined, where each topic is taught in Elmasri and Navathe 7e, which assignment tested it, how this year's papers differ from last year's, and how to use the remaining days. Every chapter on this site has three pages: **Learn** (the ideas in order), **Reference** (the facts to check while practising) and **Practice** (worked problems from this year's assignments, Kamal's textbook exercises and past papers, with solutions hidden until you open them).

## Exam rules (from the Moodle announcements)

- **Syllabus**: the union of everything in the six assignments, **plus tuple relational calculus**. Kamal: "Questions will be like assignment questions; understanding is important."
- **Two handwritten A4 sheets** allowed (no printouts). The [cheat sheet](../cheat-sheet/cheat-sheet.html) page says what to put on them.
- **"I do not know"** written as the whole answer to a question earns **20%** of it, for at most two questions. Use it instead of a blank or a guess you cannot justify.
- **Graded by Kamal only**, no TAs. Each part gets **A** (almost perfect, nearly full marks), **C** (issues or lack of understanding, under a third of the marks) or **B** (the rest, about half). There is no per-error rubric: the complete answer is judged as a whole. A regrade request regrades the **whole script**, and the total can go down.
- The exam length has not been announced.
- **Kamal's last advice (22 Nov)**: go through the assignment solutions and see *how* each solution was reached, and solve textbook exercises. "You will have enough time to answer the questions." Don't over-prepare: come relaxed and with an open mind.
- Every assignment this year said **"No clarifications. State and justify your assumptions."** Expect the same: an ambiguous question is deliberate, and your stated reading is part of the answer.

## Syllabus map

| Topic | Elmasri 7e | This year | Past papers | Chapter |
| --- | --- | --- | --- | --- |
| Relational model, keys, constraints | 5.1–5.3 | A1 (COMPANY), underlies all | M23 Q1, M24 Quiz 2, M25 Quiz 2 | [Ch 1](../ch1-relational-model/learn.html) |
| ER/EER modelling | 3.1–3.7, 4.1–4.5 | A2: TV shows (I), EER of EER (G) | M23 Q7, M24 Quiz 2 Q3 | [Ch 2](../ch2-er-eer/learn.html) |
| EER → relational mapping | 9.1–9.2 | A3: map both A2 models | M22 Q1 | [Ch 3](../ch3-mapping/learn.html) |
| FDs and normalisation | 14.1–14.5, 15.1–15.3 | A4: proofs, 4-part NF problems | M23 Q4–Q6, M24 Quiz 4, M25 Q5–Q6 | [Ch 4](../ch4-normalisation/learn.html) |
| Relational algebra | 8.1–8.5 | A5: BOOKS queries, join = ∩ proof | M24 Quiz 4 Q1 | [Ch 5](../ch5-relational-algebra/learn.html) |
| Tuple relational calculus | 8.6 | (exam only) | — | [Ch 6](../ch6-trc/learn.html) |
| SQL | 6.1–6.4, 7.1, 7.3, 7.4, 10.1, 10.2 | A1, A6: BOOKS queries, topological sort | M23 Q2–Q3, M25 Q1, Q3, Q4 | [Ch 7](../ch7-sql/learn.html) |

Kamal's practice list (5 Nov): RA 8.15–8.17, 8.22; TRC 8.24–8.27, 8.29; SQL 6.5, 6.8, 6.10, 6.13, 6.15, 7.5, 7.7–7.9, 10.7. All of them are worked in the Practice pages.

## This year versus last year's papers

The papers on the OSDG archive (M21–M25) were set by a different instructor. They are useful practice for **technique**, but the **style** is different.

| | Last year's papers | This year (Kamal) |
| --- | --- | --- |
| Question type | Short, closed: "write the query", "show the output", "is it in 2NF?" | Open: "prove or disprove", "state and justify assumptions", algorithm to SQL |
| Data | Populated sample tables; exact output asked | A schema with no data; meaning of words left to you |
| Marking | Marks per row or step | A/B/C per part, judged on correctness and justification |
| Theory | Definitions ("what is 3NF?") | Proofs from definitions (A4 Q1, A5 group Q1) |
| Alternatives | One model answer | Any correct answer under a stated reading ("verify, don't match") |
| Domains | New domain each question | Reused schemas across topics (TV shows, EER of EER, BOOKS) |

What this means for you:
1. **Write assumptions first** for every question: keys, foreign keys, NULLs, and your reading of each ambiguous word. The keys list them as A1, A2, … with a one-line justification each.
2. **Show the method** (closures, derivation steps with ←, the SQL with comments). A correct final answer with no working earned only the final-answer mark in A4.
3. **Expect a proof**. The two so far were short: an attribute on no right-hand side is in every key; natural join over all attributes is intersection. Both are proved by taking an arbitrary element and following the definition.
4. **Expect the BOOKS schema** (A5 and A6 both used it). Every A5/A6 query is worked in RA, TRC and SQL on this site.

## How to spend the last three days

| When | Do | Pages |
| --- | --- | --- |
| Fri evening | Closure, keys, normal forms, the two decomposition algorithms; redo A4 Q2 and group Q3 without looking | Ch 4 |
| Sat morning | Relational algebra patterns; redo all six A5 queries | Ch 5 |
| Sat afternoon | TRC: ∃, ¬∃, ∀ as ¬∃¬; do 8.24, 8.29 and the A5 queries in TRC | Ch 6 |
| Sat evening | SQL: evaluation order, NULLs, NOT EXISTS, LEFT JOIN counts, ties; redo A6 | Ch 7 |
| Sun morning | EER notation and (min, max); mapping steps and 8A–8D; redo A2 and A3 individual | Ch 2, Ch 3 |
| Sun afternoon | Sit the [mock endsem](../mock-endsem/mock-endsem.html) in one timed sitting (about 3 hours), then mark it A/B/C | Mock |
| Sun evening | Write your two A4 sheets from the [cheat sheet](../cheat-sheet/cheat-sheet.html) and your mistakes | Cheat sheet |
| Mon morning | Flashcards from the practice bank; reread the Reference pages | All |

## Using the practice bank

The **Practice problem bank** on the course page collects every problem from every chapter. Filter by topic, switch to **Flashcard** mode, and mark the ones you miss; the course page then shows your weak topics. Problem labels say where each came from: "Assignment 5 individual Q1(a)", "Elmasri 8.16", "M23 endsem Q4".
