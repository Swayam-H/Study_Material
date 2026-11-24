# Start here: the AAD endsem map

The endsem is on **Thursday 26 November 2026** and is worth **35 marks** (Moodle evaluation table: 2 quizzes × 10, midsem 25, endsem 35, 2 class tests × 5, 5 assignment/tutorial quizzes × 2). The instructor is Girish Varma. These notes are built from Lectures 1 to 22, the three tutorials, Assignments 1 and 2, the midsem paper with its solutions and rubric, Quiz I with its rubric, Quiz II with solutions, Class Test I with solutions, and the Moodle practice sets. The textbooks behind the lectures are Dasgupta–Papadimitriou–Vazirani (DPV) and Kleinberg–Tardos (KT).

> **How to use this course.** Read a chapter's theory, then close it and do its worked problems without looking. Then do the midsem and quiz pages as timed papers. The last page is a cheat sheet for the final hour.

## What the papers look like

Every paper so far has had the same shape, and the endsem will almost certainly follow it.

| Paper | Length | What was asked |
|---|---|---|
| Quiz I | 3 × 5 marks | Domino tiling (Hall), peasant multiplication proof, Hadamard product in $O(n\log n)$ |
| Midsem | 5 × 6 marks | Karatsuba trace, an 8-point FFT, FFT pseudocode, Gale–Shapley both ways, uniqueness proof, Huffman, room assignment greedy, SDRs, Latin squares, a DP in six marked parts |
| Class Test I | 8 + 6 + 6 | Edmonds–Karp trace with a backward edge, vertex capacities, Menger's theorem |
| Quiz II | 5 + 5 | Random permutation gives a DAG with $m/2$ edges; matching as flow and Hall via max-flow min-cut |

Three kinds of question repeat:

1. **Hand traces** (Karatsuba, FFT, Gale–Shapley, Huffman, Edmonds–Karp, Rabin–Karp, checksums). Marks are per level or per round, and the rubric gives marks for *showing the steps*, not only the answer.
2. **Proofs with a fixed skeleton** (Hall's condition, a flow reduction, linearity of expectation plus the probabilistic method, an exchange argument, a reduction for NP-hardness). The rubric splits marks between the construction, each direction of the proof, and the complexity.
3. **A DP designed in parts**: the table and what an entry means, base cases, recurrence, how infeasible choices are handled, reconstruction, time and space. The midsem gave 1 mark to each.

## How marks are given (read this twice)

These rules come straight from the rubrics.

- **A number without a reason earns a fraction.** Quiz II Q1.2: writing $\Pr = 1/2$ earned 0.5 of 1.5; the other 1.0 was for the swap bijection.
- **State the theorem you use.** Midsem Q4.1 gave 1 mark for stating Hall's theorem correctly and 1 for applying it.
- **Name the integrality theorem** whenever a flow becomes a matching or a set of paths (Quiz II Q2.2, CT I Q3).
- **Stopping early costs heavily.** CT I Q1: stopping Edmonds–Karp at 14 instead of 16 lost 2.5 marks. Always check the residual graph for a path through a backward edge.
- **Complexity needs its assumption.** Quiz I Q2 deducted 1 mark when the cost of an addition was not stated.
- **An $O(n^2)$ answer to an $O(n \log n)$ question scores 0** (Quiz I Q3 rubric).
- **Plain-English proofs cap at half marks** (Midsem Q2.2 rubric: ≤ 1.5 of 3).
- **Use $-\infty$ or "exclude from the max" for infeasible DP choices**, and say which (Midsem Q5.3).

## Syllabus map

| Topic | Lectures | Textbook | Notes page |
|---|---|---|---|
| Multiplication, GCD, asymptotics | 1 | DPV 0.2, 0.3, 1.1, 1.2.3 | Numbers and D&C |
| Divide and conquer, master theorem, Karatsuba, Strassen | 1, 2 | DPV 2.1–2.5 | Numbers and D&C |
| Lower bounds, polynomial multiplication | 3 | DPV 2.3 (p. 59), 2.6 | Numbers and D&C, FFT |
| FFT, inverse FFT | 3, 4, 8 | DPV 2.6 | FFT |
| DFS, DAGs, SCCs, backtracking | 4 | DPV 3 | Graphs |
| BFS, Dijkstra, Bellman–Ford, MST | 5, Tutorial 2 | DPV 4, 5.1 | Graphs |
| Stable matchings | 6, 7 | KT 1 | Matchings |
| Hall's theorem, SDRs | 7, 10 | MIT notes | Matchings |
| Maximum matchings, Berge, Kuhn, König | 8, 9, Tutorial 3 | Cornell CS6820 notes | Matchings |
| Huffman, greedy | 10, Tutorial 3 | DPV 5.2, KT 4 | Greedy |
| Dynamic programming | 11–13, Tutorial 3 | KT 6, DPV 6 | DP |
| Max flow, min cut, reductions | 14–18 | KT 7, DPV 7.2 | Max flow |
| Randomized MaxCut, probabilistic method | 19 | | Randomized |
| Fingerprinting, Rabin–Karp | 20, 21 | | Randomized |
| Balanced brackets, reductions, NP-hardness | 22 and the 16 Nov lecture | KT 8, DPV 8 | NP |

The 16 Nov lecture "NP and Reductions II" and the 18 Nov tutorial were not in the course folder, so the NP chapter uses the standard KT/DPV reduction chain, which is what such a lecture normally covers.

## Where exam questions come from

Most questions are lecture exercises lifted almost word for word, or a lecture method applied to a new object.

| Exam question | Source |
|---|---|
| Quiz I Q1 domino tiling | Solved on the Lecture 10 slide ("Quiz 1: Problem 1") |
| Quiz I Q3 Hadamard | Divide and conquer from Lectures 2 and 3 (same recurrence as merge sort and FFT) |
| Midsem Q1.3 FFT pseudocode | DPV Figure 2.9, Lecture 8 code |
| Midsem Q2.2 uniqueness | Lecture 6/7 theorems on proposer-optimality |
| Midsem Q4.1, Q4.2 | Hall exercises from Lecture 7 reading (MIT notes, Exercises 1, 2) |
| Midsem Q5 battery | Same shape as Assignment 2 Q4 and the Lecture 13 DPs |
| CT I Q2, Q3 | Lecture 15–17 exercises "Vertex capacities" and "Menger's theorem" |
| Quiz II Q1 | Lecture 19 random-cut method applied to DAGs |
| Quiz II Q2 | Lecture 15 bipartite matching exercise plus Hall from Lecture 7 |

So for the endsem: **do every lecture exercise in the flow and randomized chapters**, and expect at least one reduction-to-flow proof, one linearity-of-expectation proof, one NP-hardness reduction and one DP.

## Plan for the last day

If you have about 12 hours:

1. **2 h — Max flow** (biggest post-midsem topic). Learn the residual graph, the termination proof, and the five reductions. Redo CT I without notes.
2. **1.5 h — Randomized.** The MaxCut template, then fingerprinting and Rabin–Karp with one hand trace each. Redo Quiz II Q1.
3. **1.5 h — NP.** Definitions, the direction rule, then 3-SAT → Independent Set, Vertex Cover, Clique, 3-Colouring, Subset Sum.
4. **1.5 h — DP.** The six-part answer format, then LIS, knapsack, alignment, tree DP and the battery problem.
5. **1.5 h — Matchings and Hall.** Gale–Shapley trace and proofs, Hall applications, Berge, König.
6. **1 h — FFT and D&C.** One 8-point FFT by hand, the master theorem cases, Karatsuba.
7. **1 h — Greedy and graphs.** Huffman with proof, interval partitioning, cut property, Dijkstra's proof.
8. **1 h — Cheat sheet** and a final pass over the "how marks are given" list above.
