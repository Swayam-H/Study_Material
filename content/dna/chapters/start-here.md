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

The official endsem syllabus (from the TA, 22 Nov), matched to this site. The TA's chapter numbers are Elmasri 7e.

| Topic | Elmasri 7e | This year | Site chapter |
| --- | --- | --- | --- |
| Databases, data models, architecture | Ch 1, 2 | (exam only) | [Ch 0](../ch0-database-concepts/learn.html) |
| Relational model, keys, constraints | Ch 5 | A1 (COMPANY), underlies all | [Ch 1](../ch1-relational-model/learn.html) |
| ER and EER modelling | Ch 3, 4 | A2: TV shows (I), EER of EER (G) | [Ch 2](../ch2-er-eer/learn.html) |
| ER/EER to relational mapping | Ch 9 | A3: map both A2 models | [Ch 3](../ch3-mapping/learn.html) |
| FDs and normalisation | Ch 14, 15 | A4: proofs, 4-part NF problems | [Ch 4](../ch4-normalisation/learn.html) |
| Relational algebra | Ch 8.1–8.5 (and 7 for SQL links) | A5: BOOKS queries, join = ∩ proof | [Ch 5](../ch5-relational-algebra/learn.html) |
| Tuple relational calculus | Ch 8.6 | (exam only) | [Ch 6](../ch6-trc/learn.html) |
| SQL | Ch 6, 7.1, 7.3, 7.4, 10.1, 10.2 | A1, A6: BOOKS queries, topological sort | [Ch 7](../ch7-sql/learn.html) |

**What the professor and TA said (22 Nov).** Questions will be like the assignment questions, and "the principles remain the same". The assignment solutions are the best representative: study *how* each problem was approached. Textbook exercises are a good start, because they teach how to address a problem. You will have enough time in the exam.

## The exercise list

These are the textbook exercises the TA listed. The Practice page of each chapter works the problem-type exercises in the assignment style and answers the review questions briefly.

| Topic | Exercises | Where |
| --- | --- | --- |
| Database | 1.1, 1.2, 1.3, 1.8–1.12 | [Ch 0 Practice](../ch0-database-concepts/practice.html) |
| Data models and ER | 2.1–2.5, 2.14 | [Ch 0 Practice](../ch0-database-concepts/practice.html) |
| ER and EER | 3.3–3.13, 3.16, 3.17, 3.22, 3.26, 4.2, 4.6, 4.7, 4.16–4.20 | [Ch 2 Practice](../ch2-er-eer/practice.html) |
| Relational data model | 5.1–5.5, 5.11, 5.12, 5.15–5.17, 5.20, 9.2–9.8 | [Ch 1](../ch1-relational-model/practice.html), [Ch 3](../ch3-mapping/practice.html) Practice |
| FDs and normalisation | 14.2–14.12, 14.19–14.34, 15.1–15.12, 15.21, 15.24 | [Ch 4 Practice](../ch4-normalisation/practice.html) |
| Relational algebra | 7.1–7.9, 8.1–8.5, 8.9–8.12, 8.15–8.22 | [Ch 5](../ch5-relational-algebra/practice.html), [Ch 7](../ch7-sql/practice.html) Practice |
| Tuple relational calculus | 8.24–8.30 | [Ch 6 Practice](../ch6-trc/practice.html) |
| SQL | 6.5–6.13, 6.15, 7.5, 7.7–7.9, 10.7 | [Ch 7 Practice](../ch7-sql/practice.html) |

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

## From now to Monday 3 PM

Kamal's advice is to understand how the assignment solutions were reached, do textbook exercises, and not over-prepare. So the plan is one pass per topic: redo the assignment from its key, do a few listed exercises, and stop.

| When | Do | Pages |
| --- | --- | --- |
| Sun 4–6 PM | Normalisation: redo A4 (individual and group) from the key, then 14.19–14.24 | Ch 4 |
| Sun 6–7:30 PM | RA and TRC: redo A5, then TRC 8.24–8.30 | Ch 5, Ch 6 |
| Sun 8–9:30 PM | SQL: redo A6, then 6.5–6.13 | Ch 7 |
| Sun 9:30–10:30 PM | EER and mapping: redo A2 and A3 individual; 3.16, 9.2–9.8 | Ch 2, Ch 3 |
| Sun 10:30–11:30 PM | Write your two A4 sheets from the [cheat sheet](../cheat-sheet/cheat-sheet.html) and your mistakes. Then sleep | Cheat sheet |
| Mon 9–10:30 AM | Database concepts: the definition questions 1.1, 2.1–2.5 and 2.14 | Ch 0 |
| Mon 10:30 AM–12:30 PM | Your weakest two topics from the practice bank (Flashcard mode) | All |
| Mon after 12:30 PM | Stop. Eat, reread your two sheets once, and go in rested | |

The [mock endsem](../mock-endsem/mock-endsem.html) is optional now. Use one question from it if a topic still feels shaky.

## Using the practice bank

The **Practice problem bank** on the course page collects every problem from every chapter. Filter by topic, switch to **Flashcard** mode, and mark the ones you miss; the course page then shows your weak topics. Problem labels say where each came from: "Assignment 5 individual Q1(a)", "Elmasri 8.16", "M23 endsem Q4".
