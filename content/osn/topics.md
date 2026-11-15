# CS3.301 OSN: topics and subtopics

Built from the 17 lecture decks in `lectures/` (main source), the tutorial slides in `tutorials/`, and the four books in `textbooks/`. Project code is left out.

**How to read this:** `L05 s8-10` means lecture 05, slides 8 to 10 (PDF page numbers). Book references are chapters or sections:
- **OSTEP**: Arpaci-Dusseau, *Three Easy Pieces*
- **Silb**: Silberschatz, 10th ed.
- **K&R**: Kurose & Ross, 7th ed.
- **LBoS**: Little Book of Semaphores

---

## Unit 0: What an OS is
*Lecture 01*

1. **What an OS does** (L01 s5-10)
   - Application → execution: what the OS sits between
   - Life without an OS; what the OS abstracts
2. **The three pieces** (L01 s11-17)
   - Virtualization: CPU (s12, demo s16) and memory (s13)
   - Concurrency (s14, demo s17)
   - Persistence (s15)
3. **Design goals** (L01 s18): abstraction, performance, protection/isolation, reliability
4. **History and types of OS** (L01 s19-28)
   - Libraries → protected OS (s20-21)
   - Batch, time-sharing, distributed, embedded, real-time (s23-28)

📖 OSTEP ch 2 · Silb ch 1 (1.1-1.4, 1.7)

---

## Unit 1: CPU virtualization

### 1.1 The process abstraction
*Lecture 02*

- What a process is: CPU virtualization by time-sharing (s2-7)
- What makes up a process: address space, registers, PC, open files (s8)
- How the OS creates a process: load, stack, heap, I/O setup (s10)
- Process states and transitions: running, ready, blocked (s12-15)
- Storing process state: PCB / process list (s16)
- xv6: `struct context`, `struct proc` (s17-19)

📖 OSTEP ch 4 · Silb 3.1-3.3 · 🛠 Tutorial 1 s8 (process), s11-12 (intro to xv6)

### 1.2 Process API and system calls
*Lecture 03*

- Why system calls exist (s2-4)
- `fork()` (s6-8), `wait()` (s9-10), `exec()` (s11-13)
- Process creation flow and process trees (s14-15)
- How a shell uses fork/exec/wait, and redirection (s16-17)
- The two problems this raises: control and performance (s18-21)

💻 **Code:** fork, wait and exec examples (OSTEP `p1.c`/`p2.c`/`p3.c`; yours are in `practice/`)
📖 OSTEP ch 5 · Silb 2.3, 3.3 · 🛠 Tutorial 1 (syscalls, file descriptors, essential syscalls) · 📝 Homework 01

### 1.3 Mechanism: Limited Direct Execution
*Lecture 04*

- Direct execution and why it is unsafe (s2)
- **Problem 1, restricted operations:**
  - User mode and kernel mode (s6)
  - Traps, the trap table, return-from-trap (s8-10)
- **Problem 2, switching processes:**
  - Cooperative vs. timer interrupt (s11-12)
  - Saving and restoring context (s13)
  - The LDE protocol with a timer interrupt (s14-15)
  - Nested and multiple interrupts (s16)

📖 OSTEP ch 6 · Silb 1.4, 2.3 · 🛠 Tutorial 1 s4-7 (modes, CPU action, trap handler), Tutorial 2 s4-9 (context switch, `swtch()`, scheduler loop, preemption path)

### 1.4 Scheduling basics
*Lecture 05*

- Workload assumptions (s5)
- Turnaround time (s6) and response time (s17)
- FCFS and the convoy effect (s8-10)
- SJF, including different arrival times (s11-14)
- STCF / preemptive SJF (s15-18)
- Round Robin and time-slice length (s19-21)
- Trade-offs: turnaround vs. response; overlapping I/O (s22)

📖 OSTEP ch 7 · Silb 5.1-5.3 · 🛠 Tutorial 2 s10-12 (FIFO vs. RR in xv6) · 📝 Homework 02

### 1.5 MLFQ
*Lecture 06*

- The crux: learning from history without knowing job length (s3-4)
- Rules 1-2: priority, then RR within a level (s5-6)
- Attempt #1 (Rules 3-4a/4b): how priority changes, with examples 1-3 (s7-13)
- Problems: starvation, gaming, changing behaviour (s14-17)
- Attempt #2 (Rule 5): priority boost (s18-20)
- Attempt #3 (rewritten Rule 4): better accounting, anti-gaming (s21-22)
- Tuning: per-level time slices; real systems such as Solaris and BSD (s23-26)

📖 OSTEP ch 8 · Silb 5.3.6

### 1.6 Proportional share (CFS) and multiprocessor scheduling
*Lecture 07*

- **Proportional share and the Linux CFS:**
  - vruntime, sched_latency, min_granularity (s2-6)
  - Weighting with nice values (s7-8)
  - Red-black trees for efficiency (s9)
  - Handling I/O and sleeping processes (s10)
  - Beyond the basics (s11-13)
- **Multiprocessor scheduling:**
  - Hardware background: caches, coherence, synchronization, cache affinity (s15-21)
  - Single-queue scheduling (SQMS): simple, but poor locality and scalability (s22-24)
  - Multi-queue scheduling (MQMS): load imbalance and migration, work stealing (s25-28)
  - Real systems: O(1), CFS, BFS (s29)

📖 OSTEP ch 9 (incl. CFS) and ch 10 · Silb 5.5, 5.7

---

## Unit 2: Networking

### 2.1 Network basics and layering
*Lecture 08*

- Processes on different machines; hosts; client-server (s3-6)
- IP addresses (s7)
- Devices: repeater, hub, bridge, switch, router; routing hierarchy (s8-13)
- Network types: LAN, MAN, WAN, and so on (s15-17)
- Components of a network; how processes communicate (s18-20)
- **Layering:**
  - OSI model: L1 physical, L2 data link, L3 network, L4 transport, L5-7 (s21-29)
  - TCP/IP 4-layer model and the protocol stack (s31-32)
- End-to-end walk-through of one video-call frame, OS side to wire and back (s33-36)
- Packet loss (s36); review questions (s38-39)

📖 K&R ch 1 (1.1-1.3, 1.5), K&R 4.1 and 6.4 (switches/routers, light)

### 2.2 Transport layer, sockets, UDP and TCP
*Lecture 09*

- Role of the OS at the transport layer (s5-7)
- **Socket API:** core functions, using sockets, ports, well-known ports, blocking calls as context-switch points (s8-13)
- Transport services; multiplexing and demultiplexing (s15-19)
- Connection-oriented vs. connectionless; TCP vs. UDP (s20-23)
- **UDP:** segment header (s24), checksum (s25)
- **TCP:**
  - Segment structure: ports, seq/ack, flags, window, options (s27-30)
  - Sequence numbers worked example (s31)
  - RTT estimation: EstimatedRTT, DevRTT, timeout (s32)
  - Timeout and retransmission, fast retransmit (s33-34)
  - Flow control with the receive window (s35)
  - **Congestion control:** principles, slow start, AIMD congestion avoidance (s36-38)
  - **Connection lifecycle:** 3-way handshake, data transfer, 4-way close (s39-41)

💻 **Code:** socket(), bind(), listen(), accept(), connect(), send/recv, sendto/recvfrom
📖 K&R ch 3 (3.1-3.7), K&R 2.7 (socket programming) · 🛠 Tutorial 4 (TCP vs. UDP sockets, step by step, plus code zip) · 📄 `09 - Transport Layer - Practice Questions.pdf`

---

## Unit 3: Memory virtualization

### 3.1 Address spaces and the memory API
*Lecture 10*

- Why virtualize memory: early systems, multiprogramming, protection (s2-7)
- The address space: code, heap, stack; every address is virtual (s8-11)
- Goals: transparency, efficiency, protection/isolation (s12-15)
- **Memory API:**
  - Stack vs. heap (s17)
  - `malloc()`, `sizeof`, `free()` (s18-20)
- **Common errors:** overflow, leaks, uninitialized reads, dangling pointers, double free (s21-24)
- OS support: `brk`/`sbrk`, `mmap` (s25)

💻 **Code:** malloc and free usage, plus the buggy examples
📖 OSTEP ch 13 and ch 14 · Silb 9.1

### 3.2 Address translation and segmentation
*Lecture 11*

- Hardware-based translation; simplifying assumptions (s4-8)
- Static (software) relocation vs. dynamic relocation (s9-12)
- **Base and bounds:**
  - Translation formula and worked examples (s13-15)
  - MMU (s16)
  - Hardware support (s17)
- **OS responsibilities:** free list, context switches, exceptions; boot and runtime timelines (s18-23)
- Internal fragmentation (s25)
- **Segmentation:**
  - Generalized base/bounds per segment (s26-31)
  - Code, heap and stack worked examples (s32-33, s39-40)
  - Segfaults (s34)
  - Explicit vs. implicit segment selection (s35-38)
  - Negative-growth stack (s39-40)
  - Protection bits and sharing (s41)
  - Fine vs. coarse-grained segmentation (s42)
  - OS support (s43)
- **External fragmentation and free-space management:**
  - Compaction (s44-45)
  - Best, worst, first and next fit (s46)
  - Buddy allocation (s47)

📖 OSTEP ch 15, ch 16, ch 17 (free-space) · Silb 9.2 · ⚠️ Your folder has two versions of lecture 11; the "(latest from site)" one is newer.

### 3.3 Paging and TLBs
*Lecture 12*

- **Paging idea:** pages and frames, advantages (s4-8)
- **Page table:**
  - VPN + offset split, translating address 21 (s9-11)
  - Page table size and location; linear page table (s12-14)
  - PTE bits: valid, protection, present, dirty, reference; x86 PTE (s15-17)
- Paging is slow: hardware steps and the memory-access protocol (s18-20)
- Memory trace of `array.c` (s21-23)
- **TLB:**
  - Basic algorithm, hit vs. miss (s26-28)
  - Array example and locality (s29-31)
  - Hardware-managed vs. software-managed TLBs (s32-34)
  - TLB entry contents (s35)
  - Context switches: flush vs. ASIDs (s36-38)
  - Sharing pages (s39)
  - Replacement: LRU vs. random (s40)
  - MIPS R4000 entry; TLB coverage and Culler's law (s41-42)

💻 **Code:** the `array.c` trace and the TLB control-flow pseudocode
📖 OSTEP ch 18 and ch 19 · Silb 9.3 · 🛠 Tutorial 3 s2-6 (RISC-V Sv39, PTE format) · 📝 Homework 03

### 3.4 Smaller page tables
*Lecture 13, part 1*

- Why linear tables are big; bigger pages and their limits (s4-7)
- Hybrid paging + segmentation (s8-11)
- **Multi-level page tables:**
  - Page directory and PDEs (s12-13)
  - Benefits and costs (s14-15)
  - 16 KB example with 0x3F80 translation (s16-22)
  - More than two levels (s23-24)
  - Translation control flow (s25)
- Inverted page tables (s26); swapping page tables (s27)

📖 OSTEP ch 20 · Silb 9.4 · 🛠 Tutorial 3 s7-12 (kernel and process address spaces in xv6, growing memory)

### 3.5 Beyond physical memory: swapping mechanisms
*Lecture 13, part 2*

- Swap space (s30-32)
- Present bit; PTE holding a disk address (s33-34)
- **Page faults:** who handles them, servicing them, what if memory is full (s35-38)
- Control flow in hardware and software; three TLB-miss cases (s39-41)
- When replacements happen: high/low watermarks, swap daemon, clustering (s42-43)

📖 OSTEP ch 21 · Silb 10.1-10.2 · 🛠 Tutorial 3 s13-14 (trap handling, page faults, lazy allocation)

### 3.6 Swapping policies
*Lecture 13, part 3*

- AMAT and why a tiny miss rate dominates (s46-47)
- **Policies:**
  - Optimal (Belady): trace, results, 3 C's of misses (s48-50)
  - FIFO and Belady's anomaly / stack property (s51-52)
  - Random (s53-54)
  - LRU and LFU (s55-56)
- Workloads: no locality, 80-20, looping sequential (s57-59)
- Approximating LRU: use bit and the clock algorithm (s60-63)
- Dirty pages; other VM policies such as prefetching and clustering writes (s64-65)
- Thrashing (s66)

📖 OSTEP ch 22 · Silb 10.4, 10.6

---

## Unit 4: Concurrency

### 4.1 Threads and race conditions
*Lecture 14*

- What a thread is; PCB vs. TCB; thread context switch (s3-5)
- Single- vs. multi-threaded address spaces; shared data vs. thread-local storage (s6-7)
- Why threads: parallelism and overlapping I/O; threads vs. processes (s8-10)
- `pthread_create`, `pthread_join`; non-deterministic ordering (s11-13)
- **The shared counter race:**
  - `counter = counter + 1` in assembly (s14-16)
  - The detailed lost-update trace (s17-18)
- Key terms: critical section, race condition, indeterminate, mutual exclusion; atomicity (s19-22)

💻 **Code:** the `pthread` counter program
📖 OSTEP ch 26 and ch 27 · Silb ch 4 (4.1-4.4), 6.1-6.2 · LBoS ch 1 · 🛠 Tutorial 6 s3-9 (threads model, `race_counter.c`)

### 4.2 Locks
*Lecture 15*

- Lock semantics; `pthread_mutex`; coarse vs. fine-grained locking (s2-6)
- Evaluating locks: correctness, fairness, performance (s7-9)
- Disabling interrupts and why it fails (s10-11)
- Load/store flag attempt: no mutual exclusion, spin waste (s12-14)
- **Hardware primitives:**
  - Test-and-set spin lock (s15-19)
  - Compare-and-swap (s20-21)
  - LL/SC (s22-24)
  - Fetch-and-add ticket lock (s25-27)
- Avoiding spinning: `yield` (s28-29)
- Queues with `park`/`unpark`; walk-through (s30-32)
- Priority inversion (s33)

💻 **Code:** TestAndSet, CompareAndSwap, LL/SC, ticket lock, queue lock
📖 OSTEP ch 28 (and ch 29 for lock-based data structures) · Silb 6.3-6.5 · 🛠 Tutorial 6 s10-13

### 4.3 Condition variables
*Lecture 16*

- Why locks are not enough: waiting for a condition (s3-5)
- CV as a queue of waiters; `wait()` / `signal()` (s6-7)
- **Join with a CV:** two traces, and the two broken versions with no state variable or no lock (s8-12)
- Rules for using CVs (s13)
- **Producer/consumer:**
  - One-slot buffer (s14-15)
  - Broken v1 (`if`) and fix: `while` (s16-18)
  - Broken v2 (one CV) and fix: two CVs (s19-21)
  - General MAX-slot solution (s22-24)
- Covering conditions and `broadcast` (s25-27)

💻 **Code:** thr_join/thr_exit, producer/consumer v1 to final
📖 OSTEP ch 30 · Silb 6.7 (monitors), 7.3 · LBoS 4.1-4.2 · 🛠 Tutorial 6 s14-18 (`producer_consumer.c`)

### 4.4 Semaphores
*Lecture 17*

- **Definition:** `sem_wait` / `sem_post` semantics, the value counts waiters (s3-6)
- Binary semaphore as a lock, two traces (s7-9)
- Semaphore for ordering, parent waiting on child (s10-11)
- Choosing the initial value (s12)
- **Bounded buffer:**
  - empty/full attempt (s13-15)
  - Race when MAX > 1 (s16)
  - Deadlock from wrong mutex placement (s17-18)
  - Working solution (s19)
- Reader-writer locks and writer starvation (s20-22)
- Dining philosophers: broken solution and breaking the dependency (s23-25)
- Thread throttling / admission control (s26)
- Implementing semaphores with locks and CVs (Zemaphores) (s27-28)

💻 **Code:** all the semaphore snippets, rwlock, dining philosophers, Zemaphore
📖 OSTEP ch 31 (ch 32 for deadlock) · Silb 6.6, 7.1, ch 8 (deadlock) · LBoS ch 2, 3 (signaling, rendezvous, mutex, multiplex, barrier), 4.1-4.5 · 🛠 Tutorial 6 s19-20 (deadlock, `deadlock.c`) · 📝 Homework 04 (readers-writers)

---

## Not in the lectures yet

The site's calendar lists lectures 25-27 and Tutorial 7 (Filesystems) without slides. When they appear, expect **Persistence**: OSTEP ch 36-42 (I/O devices, disks, files and directories, FS implementation, FFS, journaling), Silb ch 11-15.

## Quick map: lecture → books

| Lecture | Topic | OSTEP | Silberschatz | Other |
|---|---|---|---|---|
| 01 | Intro to OS | 2 | 1 | |
| 02 | Processes | 4 | 3.1-3.2 | Tut 1 |
| 03 | Process API | 5 | 2.3, 3.3 | Tut 1, HW 01 |
| 04 | Limited Direct Execution | 6 | 1.4 | Tut 1, Tut 2 |
| 05 | Scheduling | 7 | 5.1-5.3 | Tut 2, HW 02 |
| 06 | MLFQ | 8 | 5.3 | |
| 07 | CFS, multiprocessor | 9, 10 | 5.5, 5.7 | |
| 08 | Networks intro | | | K&R 1 |
| 09 | Transport layer | | | K&R 2.7, 3; Tut 4 |
| 10 | Address space, memory API | 13, 14 | 9.1 | |
| 11 | Translation, segmentation | 15, 16, 17 | 9.2 | |
| 12 | Paging, TLB | 18, 19 | 9.3 | Tut 3, HW 03 |
| 13 | Smaller tables, swapping | 20, 21, 22 | 9.4, 10 | Tut 3 |
| 14 | Concurrency intro | 26, 27 | 4, 6.1-6.2 | LBoS 1, Tut 6 |
| 15 | Locks | 28, 29 | 6.3-6.5 | Tut 6 |
| 16 | Condition variables | 30 | 6.7, 7.3 | LBoS 4.1-4.2, Tut 6 |
| 17 | Semaphores | 31, 32 | 6.6, 7.1, 8 | LBoS 2-4, HW 04 |
