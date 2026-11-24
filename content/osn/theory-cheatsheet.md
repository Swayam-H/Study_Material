# Theory cheat sheet 1: memory (L10 to L13)

*Definitions, "why" answers and trade-offs in one place, for the 3 to 5 mark theory parts. Each line is written so you can copy its shape into an answer: **term, what it is, why it exists, cost**.*

## Key definitions

| Term | One-line answer |
| --- | --- |
| Address space | The process's private view of memory (code, heap, stack), all addresses virtual, starting at 0 |
| Virtual vs physical address | VA is what the program uses; PA is the real RAM address; the MMU translates every access |
| Dynamic relocation (base and bounds) | PA = VA + base, with a check VA < bounds; hardware does it, so the process can be moved |
| Segmentation | A base and bounds pair per segment (code, heap, stack); the top VA bits pick the segment |
| Internal fragmentation | Wasted space **inside** an allocated unit (the heap and stack gap in base and bounds, the rounding in buddy) |
| External fragmentation | Free space split into small holes **between** allocations (variable-size segments) |
| Compaction | Copying segments together to merge holes; costly (stop processes, copy memory) |
| Paging | Fixed-size pages and frames; no external fragmentation; one page table per process |
| Page table / PTE | Maps VPN to PFN; the entry has valid, present, protection, dirty and reference bits |
| TLB | A small hardware cache of VPN to PFN translations; works through spatial and temporal locality |
| ASID | An address-space id in each TLB entry, so entries from different processes coexist (no flush) |
| Multi-level page table | A directory of pointers to pages of the table; only used parts are allocated |
| Page fault | Access to a valid but not present page; the OS fetches it from swap, then retries |
| Swap space | Disk area that holds pages evicted from RAM |
| Thrashing | The working sets exceed RAM, so the system spends its time paging |
| Working set | The pages a process needs over a short window |
| Belady's anomaly | With FIFO, more frames can mean more faults |
| Demand paging | Load a page only when it is first touched |

## Why and trade-offs (copy these shapes)

- **Why virtualize memory?** Protection (isolation), transparency (each process sees its own space) and efficiency (hardware support, sharing RAM among many processes).
- **Why must the base/bounds instructions be privileged?** A user program could otherwise map itself over other processes or the kernel.
- **Base and bounds vs segmentation vs paging:** base/bounds wastes the gap between heap and stack; segmentation fixes the gap but causes external fragmentation; paging removes external fragmentation but needs large page tables and an extra memory access per reference (fixed by the TLB).
- **Why are linear page tables too big?** One entry per virtual page, per process: 2^(VPN bits) × PTE size (4 MB per process for 32-bit addresses with 4 KB pages).
- **Bigger pages:** smaller tables and a higher TLB reach, but more internal fragmentation.
- **Multi-level tables:** save space for sparse address spaces; cost one extra memory reference per level on a TLB miss. Time traded for space.
- **Hybrid (paging plus segments):** one table per segment, so unused gaps cost nothing; but it needs segments and brings back external fragmentation for page tables.
- **Inverted page table:** one entry per physical frame (system-wide), small, but needs a hash for lookup.
- **TLB miss handling:** hardware-managed (x86) walks the table itself; software-managed (MIPS) traps to the OS. Valid and present: refill the TLB. Valid but not present: page fault. Not valid: segfault.
- **Context switch and the TLB:** flush it (simple, but a cold start) or use ASIDs (no flush, but extra hardware and OS bookkeeping).
- **Free-list policies:** first fit (fast), best fit (tiny leftovers), worst fit (also fragments), next fit (spreads splinters); the buddy allocator makes coalescing easy but wastes space inside blocks.
- **Dirty bit:** a clean page can be dropped; a dirty one must be written back, so the OS prefers clean pages. **Reference bit:** drives the clock approximation of LRU.
- **Page replacement:** OPT is the best (needs the future), FIFO is simple but has Belady's anomaly, LRU uses history (stack property, costly to implement exactly), clock approximates LRU cheaply.
- **When memory is full:** the swap daemon evicts between the low and high watermarks, in clusters, to batch the disk writes.
- **AMAT:** disk is about 100,000× slower than RAM, so even a 0.1% miss rate dominates.
- **Thrashing fixes:** admission control (run fewer processes) or kill a process.

## Common "explain" questions in one sentence each

- *Who handles a TLB miss / page fault?* TLB miss: hardware or OS; page fault: always the OS.
- *Why does a process not notice relocation?* It only uses virtual addresses; only the base moved.
- *How does the stack segment translate?* Offset minus the max segment size gives a negative offset, added to the base.
- *Why is the offset not translated in paging?* Pages and frames are the same size, so only the page number changes.
- *Why does the TLB work?* Spatial locality (neighbours share a page) and temporal locality (reuse).

# Theory cheat sheet 2: concurrency (L14 to L17)

## Key definitions

| Term | One-line answer |
| --- | --- |
| Thread | Another point of execution in the same address space; own PC, registers and stack; shared code, heap and globals |
| Race condition | The result depends on the timing of threads |
| Critical section | Code that accesses shared data and must not run concurrently |
| Mutual exclusion | At most one thread inside the critical section |
| Atomic | All or nothing; no visible in-between state |
| Indeterminate program | Output varies between runs because of races |
| Lock (mutex) | A variable that is free or held; gives mutual exclusion |
| Spin lock | A thread loops until the lock is free; wastes CPU but needs no OS help |
| Condition variable | A queue of waiting threads, used with a lock and a state variable |
| Semaphore | An integer with `wait` (decrement, block if negative) and `post` (increment, wake a waiter) |
| Deadlock | A cycle of threads, each waiting for a resource held by the next |
| Starvation | A thread never gets the resource it needs |
| Livelock | Threads keep retrying but make no progress |
| Priority inversion | A high-priority thread waits for a low-priority lock holder that a medium thread preempts |

## Why and trade-offs

- **Why threads?** Parallelism on many CPUs, and overlapping I/O with computation. **Threads vs processes:** threads share memory (easy sharing, cheap switch, but races); processes are isolated.
- **Three lock criteria:** correctness (mutual exclusion, progress, bounded waiting), fairness, performance (one CPU vs many CPUs).
- **Locks compared:** disable interrupts (single CPU only, needs trust); flag with load/store (broken); test-and-set, CAS, LL/SC (correct but unfair, and a waste on one CPU); ticket lock (fair, FIFO); yield (less waste but starvation, many switches); queue with park and unpark (no spinning, fair).
- **Why does the flag lock fail?** The test and the set are separate steps, so two threads can both see 0.
- **Ticket lock:** fetch-and-add a ticket, spin until `turn` equals it, `turn++` on unlock. A double unlock breaks mutual exclusion.
- **The CV rules:** (1) a state variable, (2) hold the lock for wait and signal, (3) `while`, never `if`. **Why while:** Mesa semantics, so another thread may change the state before the woken thread runs, and spurious wake-ups happen.
- **Lost wakeup:** a signal sent when nobody is waiting is forgotten (a CV has no memory), so the parent must check a state variable first.
- **One CV vs two:** with one, a consumer can wake another consumer and every thread sleeps; use `empty` and `fill`.
- **Covering condition:** when waiters need different amounts, wake everyone with `broadcast`; the cost is extra wake-ups.
- **Semaphore initial values:** lock 1, ordering 0, rendezvous 0 and 0, bounded buffer empty = MAX and full = 0 and mutex = 1, throttling N.
- **Bounded buffer deadlock:** taking the mutex before waiting on `full` or `empty` makes a thread sleep holding the mutex. Wait first, then lock.
- **Reader-writer:** first reader takes `writelock`, last releases it; writers can starve; fix with a turnstile (writer-priority).
- **Dining philosophers:** all take the left fork gives a circular wait; fix by reversing one philosopher or allowing only N − 1 at the table.
- **Priority inversion fix:** priority inheritance.
- **Deadlock needs all four:** mutual exclusion, hold and wait, no preemption, circular wait. **Prevention:** lock ordering (circular wait), acquire all at once (hold and wait), trylock (no preemption), lock-free structures (mutual exclusion). **Avoidance:** the Banker's algorithm (safe states). **Detect and recover:** find cycles, then kill or roll back.
- **Non-deadlock bugs:** atomicity violation (fix with a lock) and order violation (fix with a CV or semaphore).
- **Coarse vs fine-grained locking:** coarse is simple but limits parallelism; fine allows more concurrency but is complex and error-prone.
- **Hoare vs Mesa:** Hoare signal hands over the CPU at once (`if` suffices); Mesa only marks the waiter ready (`while` needed). Real systems use Mesa.

# Theory cheat sheet 3: CPU, networking and file systems

## CPU virtualization (L01 to L07)

- **OS goals:** abstraction, performance, protection, reliability. The OS virtualizes the CPU, memory and disk, and provides system calls.
- **Process states:** running, ready, blocked. The OS (scheduler) moves ready to running; I/O moves running to blocked; I/O completion moves blocked to ready.
- **fork / exec / wait:** fork copies the process (0 in the child), exec replaces its image (never returns on success), wait blocks until a child exits. **Separate** so the shell can set up redirection and pipes between them.
- **Limited direct execution:** run natively for speed; the OS keeps control with **user and kernel modes**, **traps** (system calls, with a trap table set at boot) and a **timer interrupt** (to regain the CPU from a looping process).
- **Context switch:** hardware saves user registers on the kernel stack; the OS saves kernel registers in the proc structure and restores the next process's.
- **Scheduling:** FIFO (convoy effect), SJF (best turnaround if all arrive together), STCF (best turnaround, preemptive), RR (best response, worst turnaround). Turnaround and response cannot both be optimal.
- **MLFQ:** several queues; new jobs start at the top; use up the allotment and move down; periodic boost. It approximates SJF without knowing job length. The boost fixes starvation and behaviour change; total-allotment accounting fixes gaming.
- **CFS:** run the process with the lowest vruntime; slice proportional to weight; vruntime grows at 1024 / weight; a red-black tree gives O(log n); a waking sleeper gets the minimum vruntime.
- **Multiprocessor:** cache affinity; SQMS (simple, but lock contention and poor affinity) vs MQMS (scalable, but load imbalance, fixed by work stealing); bus snooping for coherence.

## Networking (L08 and L09)

- **Layers:** application, transport (ports), network (IP, routing), link (MAC, hop to hop), physical. **Encapsulation:** each layer adds a header; decapsulation removes it.
- **Devices:** hub (L1), switch (L2, MAC learning), router (L3, IP routing).
- **Hop-to-hop** is the link layer (MAC changes each hop); **end-to-end** is the network layer (IP stays the same); **process-to-process** is the transport layer.
- **UDP:** connectionless, unreliable, 8-byte header; **TCP:** connection-oriented, reliable, ordered, with flow and congestion control.
- **TCP reliability:** sequence and ACK numbers (cumulative), timeout (EstimatedRTT plus 4 × DevRTT), fast retransmit on 3 duplicate ACKs.
- **Flow vs congestion control:** flow protects the receiver (rwnd); congestion protects the network (cwnd). Slow start doubles cwnd until ssthresh, then +1 MSS per RTT; 3 duplicate ACKs halve cwnd; a timeout resets it to 1.
- **Handshake and close:** SYN, SYN-ACK, ACK; FIN and ACK each way; TIME_WAIT handles a lost final ACK and old segments.
- **Sockets:** `socket`, `bind`, `listen`, `accept` (returns a new socket), `connect`, `send` and `recv`; blocking calls are context-switch points. A TCP connection is identified by the 4-tuple; a UDP socket by the destination IP and port.

## File systems (L18 and L19)

- **File** = array of bytes with an inode number; **directory** = list of (name, inode number).
- **fd table → open-file table → inode:** fork and dup share an open-file entry (and its offset); a separate open gets its own offset.
- **Hard link:** another name for the same inode (link count); not for directories, not across file systems. **Symlink:** a file holding a path; can dangle. A file is freed when its link count is 0 and no fd is open.
- **Atomic update:** write a temp file, `fsync`, then `rename`.
- **vsfs layout:** superblock, inode bitmap, data bitmap, inode table, data region. The inode holds mode, size, times, link count and block pointers.
- **Multi-level index:** 12 direct plus single, double and triple indirect; unbalanced because most files are small. **Alternatives:** extents (compact), linked/FAT (poor random access, no hard links).
- **I/O counts:** open = 2 × depth + 1 reads; a read = 3 I/Os (inode, data, inode write for atime); an allocating write = 5 I/Os; a create = 10 I/Os.
- **Caching and write buffering** cut I/O (batching, scheduling, avoidance), at the price of losing data in a crash unless `fsync` is used.
- **Crash consistency:** a write needs the data block, inode and bitmap; a crash between them leaves a leak or an inconsistency. **fsck** scans the whole disk (slow); **journaling** writes a transaction to the log, commits (TxEnd), then checkpoints; recovery replays committed transactions. xv6 uses a log with `begin_op` and `end_op`.
- **xv6:** 1 KB blocks, 12 direct pointers plus 1 indirect, so the maximum file is 268 KB; layers: file descriptor, pathname, directory, inode, log, buffer cache, disk.
