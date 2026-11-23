# Rapid revision 1: CPU virtualization (L01 to L07)

*One pass over every lecture deck: shorter than the chapter notes, longer than the formula sheets. For the numbers, use the formula sheets; for depth, use the chapter pages.*

## L01: What an OS is

- **Job:** sit between applications and hardware. It **virtualizes** resources (CPU, memory, disk), manages them, and gives programs system calls to use them.
- **Three pieces:** virtualization (CPU becomes processes, memory becomes address spaces), concurrency (many things at once, safely), persistence (data survives power loss: file systems).
- **Design goals:** abstraction, performance (low overhead), protection and isolation, reliability; also energy, security and mobility.
- **History:** libraries, then a protected OS (system calls through traps and a privilege level), then multiprogramming and time-sharing, then modern OSes.
- **Types:** batch (no interaction, high throughput), time-sharing (interactive, fast response), distributed (many machines appear as one), embedded (small dedicated devices), real-time (deadlines: hard or soft).

## L02: The process

- A **process** is a running program. Time-sharing the CPU gives the illusion of many CPUs; a **policy** decides which runs, and a **mechanism** (context switch) does the switching.
- **Machine state:** the address space (code, heap, stack), registers (PC, stack pointer, frame pointer) and open files.
- **Creation:** load code and static data from disk (lazily in modern OSes), set up the stack (argc, argv), set up the heap, open fds 0, 1 and 2, then jump to `main()`.
- **States:** running, ready, blocked, plus initial and final (zombie). Running and ready switch by scheduling; I/O moves a process to blocked and its completion back to ready.
- **PCB / process list:** the OS keeps a structure per process. In xv6, `struct proc` holds the state, pid, pagetable, trapframe, `struct context` (saved kernel registers), open files and the parent.

## L03: The process API

- `fork()` makes an almost identical copy. It returns 0 in the child and the child's PID in the parent. The order they run in is not determined.
- `wait()` blocks the parent until a child exits, which makes the output order deterministic.
- `exec()` replaces the program image (code, heap and stack); on success it never returns.
- **Why separate fork and exec:** the shell can set things up in between. For `ls > out`: fork, then in the child close(1), open("out") (which takes fd 1), then exec. Pipes work the same way.
- The parent and child have **separate copies** of memory, so changing x in one does not affect the other. File descriptors are shared, offset included.
- Other calls: `kill()`, signals, `getpid()`. Zombies wait for their parent's wait(); orphans go to init.
- This raises two problems: how to keep **control** (stop a misbehaving process) and **performance** (low overhead). Both lead to L04.

## L04: Limited direct execution

- **Direct execution:** run the program natively on the CPU, which is fast. But it can do anything, and the OS might never get the CPU back.
- **Problem 1, restricted operations:** **user mode vs kernel mode.** A system call executes a **trap** instruction: it saves registers to the kernel stack, raises the privilege level and jumps through the **trap table** (set up at boot with a privileged instruction). **Return-from-trap** reverses this. The user passes a **syscall number**, never an address.
- **Problem 2, switching processes:** in the cooperative approach, the OS waits for a syscall or yield, and a `while(1)` loop means a reboot. In the non-cooperative approach, a **timer interrupt** every few ms gives the OS control back.
- **Context switch:** the hardware saves the *user* registers to the kernel stack. The OS `switch()` saves the *kernel* registers into the proc structure, loads the other process's, and switches stacks. Return-from-trap then lands in the new process.
- xv6: `swtch()` saves ra, sp and s0–s11 into `struct context`; the scheduler loop picks a RUNNABLE process; `yield()` → `sched()` → `swtch()`.
- Nested interrupts: disable interrupts during handling, and use locks inside the kernel.

## L05: Scheduling basics

- **Metrics:** turnaround = completion − arrival (performance); response = first run − arrival (interactivity). Fairness is a third.
- **FIFO:** simple, but suffers the **convoy effect**: short jobs wait behind a long one.
- **SJF:** optimal turnaround when all jobs arrive together. Non-preemptive, so a late short job still waits.
- **STCF (preemptive SJF):** always run the job with the least time left. Optimal turnaround.
- **Round robin:** a time slice (quantum) per job in turn. Best response, worst turnaround. The slice must be a multiple of the timer interval, and long enough to amortise context-switch cost (including cache and TLB state).
- **I/O:** treat each CPU burst as a job, so another job's CPU burst overlaps a job's I/O.
- **Trade-off:** you cannot be best at both turnaround and response. The OS also doesn't know job lengths, which leads to MLFQ.

## L06: MLFQ

- **Goal:** good turnaround (like SJF) and good response (like RR) **without knowing job lengths**, by learning from history.
- **Rules:** (1) higher priority runs; (2) equal priority runs RR; (3) new jobs start at the top; (4) once a job uses its whole allotment at a level, it moves down; (5) every period S, boost all jobs to the top.
- **The old Rule 4 (4a/4b)** kept a job's priority if it gave up the CPU early. That gave three problems: **starvation** of long jobs, **gaming** (I/O just before the slice ends) and **behaviour change** (a job that turns interactive stays low). Rule 5 fixes starvation and behaviour change; total-allotment accounting fixes gaming.
- **Tuning:** shorter slices at high priority, longer below. S is a "voo-doo constant": too long and jobs starve, too short and it behaves like RR. Solaris uses tables; BSD uses decay-usage formulas; users can give advice with `nice`.
- Examples: a long job sinks to the bottom; a short job arriving later finishes fast (approximating SJF); an I/O-bound job stays at the top.

## L07: CFS and multiprocessor scheduling

- **Proportional share:** each job gets a fraction of the CPU. Linux CFS tracks **vruntime** and always runs the job with the **lowest vruntime**.
- **sched_latency** (for example 48 ms) is divided among the n runnable jobs, but each slice is at least **min_granularity** (for example 6 ms).
- **Weights:** nice −20 to +19, where nice 0 has weight 1024 and each step changes it by about 1.25×. Slice is proportional to weight, and vruntime grows at 1024 / weight times real time, so heavier jobs accumulate vruntime more slowly.
- **Red-black tree** of runnable jobs: O(log n) to insert and to find the minimum. Sleeping jobs leave the tree. A waking job is set to the tree's **minimum vruntime**, so it cannot hog the CPU.
- **Multiprocessor hardware:** per-CPU caches need **cache coherence** (bus snooping: invalidate or update), shared data needs locks, and **cache affinity** favours running a job on the same CPU again.
- **SQMS (single queue):** simple and balanced, but the queue lock limits scalability and affinity is poor.
- **MQMS (one queue per CPU):** scalable with good affinity, but **load imbalance**. Fixed by **migration** and **work stealing** (peek at other queues now and then).
- **Real systems:** O(1) scheduler and CFS use multiple queues; BFS uses a single queue.

# Rapid revision 2: networking (L08 and L09)

## L08: The parts of a network and layering

- **Hosts** run applications as clients and servers. Every host has an **IP address** (network part plus host part).
- **Devices:** a repeater or hub (L1) repeats bits to all ports. A bridge or switch (L2) learns MAC addresses and forwards frames only to the right port within a LAN. A **router** (L3) forwards IP packets between networks using a routing table. Routing is hierarchical.
- **Network types:** PAN, LAN, MAN, WAN, and the Internet as a network of networks.
- **OSI model (7 layers):** physical (bits), data link (frames, MAC, hop to hop), network (packets, IP, routing, end to end across hops), transport (segments, ports, process to process, reliability), session, presentation, application.
- **TCP/IP model (4 or 5 layers):** application, transport, network (internet), link plus physical.
- **Encapsulation:** each layer adds its header and treats everything above as payload. The receiver strips headers in reverse. A router looks only up to L3, a switch only up to L2.
- **The OS's role:** the app calls `send()`, then a syscall copies the data into a kernel buffer, the TCP/IP stack adds headers, and the NIC driver uses DMA to send it. Receiving: NIC interrupt, protocol stack, socket buffer, then the blocked `recv()` wakes. Packet loss happens when buffers overflow (queues at routers or the receiver).

## L09: Transport layer, sockets, UDP and TCP

- **Socket API:** `socket`, `bind`, `listen`, `accept` (returns a **new** connected socket), `connect`, `send`/`recv`, `sendto`/`recvfrom`, `close`. Blocking calls put the process to sleep, which makes them context-switch points.
- **Ports:** 16-bit, with 0–1023 well-known (80 HTTP, 443 HTTPS, 22 SSH, 53 DNS). **Multiplexing** at the sender, **demultiplexing** at the receiver: UDP uses (dst IP, dst port), TCP the 4-tuple.
- **UDP:** connectionless, no reliability, an 8-byte header (src port, dst port, length, checksum). Used for DNS, streaming and games. The checksum is a ones' complement sum of 16-bit words.
- **TCP header:** ports, sequence number (number of the first byte), ACK number (next byte expected), header length, flags (SYN, ACK, FIN, RST, PSH, URG), receive window, checksum, options.
- **Connection:** the 3-way handshake (SYN, SYN-ACK, ACK) exchanges ISNs; SYN and FIN each use one sequence number. The close is FIN, ACK, FIN, ACK, then **TIME_WAIT**.
- **Reliability:** cumulative ACKs, a retransmission timer (EstimatedRTT plus 4 × DevRTT) and **fast retransmit** on 3 duplicate ACKs.
- **Flow control** protects the **receiver**: the sender keeps the bytes in flight at most rwnd (the free buffer space advertised by the receiver).
- **Congestion control** protects the **network**: slow start (cwnd doubles each RTT until ssthresh), then congestion avoidance (+1 MSS per RTT, the additive increase of AIMD). On 3 duplicate ACKs: ssthresh = cwnd/2, cwnd = ssthresh. On a timeout: ssthresh = cwnd/2, cwnd = 1 MSS.

# Rapid revision 3: memory (L10 to L13)

## L10: The address space and the memory API

- **History:** early machines held one program plus the OS as a library. Then multiprogramming and time-sharing, then keeping several processes in memory at once, which made **protection** essential.
- **Address space:** code at the bottom, the heap above it growing up, the stack at the top growing down. **Every address a program sees is virtual.**
- **Goals:** transparency (the program can't tell), efficiency (time and space, with hardware support) and protection (isolation).
- **API:** the stack is automatic (gone on return). The heap is `malloc(size)`, which returns `void*`; use `sizeof`, and `strlen + 1` for strings. Release it with `free(ptr)`.
- **Common bugs:** forgetting to allocate (segfault), allocating too little (buffer overflow), not initializing (reading garbage), forgetting to free (leak), freeing too early (dangling pointer), double free, and calling free with a wrong pointer.
- **OS support:** `brk`/`sbrk` grows the heap; `mmap` creates anonymous or file-backed regions. malloc is a library built on top of these.

## L11: Address translation, segmentation and free space

- **Hardware-based translation:** every memory reference is translated by the hardware (the **MMU**), with the OS setting it up. Assumptions at first: contiguous, smaller than physical memory, all the same size.
- **Static relocation** has a loader rewrite addresses: no protection, hard to move. **Dynamic relocation** uses **base and bounds** registers: PA = VA + base, checked against bounds.
- **Hardware needs:** privileged mode, base and bounds registers, translate-and-check circuitry, privileged instructions to set them, and exceptions for out-of-bounds accesses.
- **OS duties:** find space at process creation (free list), free it at termination, save and restore base and bounds on context switches (in the PCB; it can **relocate** a descheduled process by copying it and updating base), and handle exceptions.
- **Problem:** the unused space between heap and stack is still allocated: **internal fragmentation**.
- **Segmentation:** a base and bounds pair **per segment** (code, heap, stack). Explicit selection uses the top bits of the VA; implicit selection infers the segment from how the address was formed. The stack grows down, so a direction bit gives a negative offset. **Protection bits** let processes share code. Fine-grained segmentation uses many small segments with a segment table.
- **External fragmentation:** variable-sized segments leave holes. **Compaction** copies segments together, which is expensive. Otherwise, free-list policies: best, worst, first and next fit, and the **buddy allocator** (powers of two; easy coalescing, internal fragmentation).

## L12: Paging and the TLB

- **Paging:** split the address space into fixed-size **pages** and physical memory into **frames**. No external fragmentation, and it supports sparse address spaces.
- **Translation:** VA = VPN plus offset. The page table maps VPN to PFN, and PA = PFN plus the same offset. Each process has its own page table, located through a register (CR3 on x86, satp on RISC-V).
- **Size:** 32-bit addresses with 4 KB pages give a 20-bit VPN, which at 4 B per PTE is 4 MB per process. Page tables therefore live in memory.
- **PTE bits:** valid, protection (R/W/X, U/S), present, dirty, reference (accessed). x86 also has PWT, PCD, PAT and G.
- **Too slow:** each access needs an extra memory read for the PTE, so memory traffic doubles (see the array.c trace).
- **TLB:** a small, fully associative cache of VPN → PFN entries. On a hit, translate at once; on a miss, walk the table, insert the entry and retry. It works because of **spatial** locality (neighbours on the same page) and **temporal** locality (reuse).
- **Who handles a miss:** hardware on x86 (a page-table walker), software on MIPS (a trap to the OS, whose handler must not itself miss).
- **Entry:** VPN, PFN, valid, protection, ASID, dirty and global bits.
- **Context switch:** flush the TLB, or tag entries with an **ASID**. Shared pages can map different VPNs to the same PFN.
- **Replacement:** LRU or random. **TLB coverage** is limited, and Culler's law says RAM is not truly random-access.

## L13: Smaller page tables, swapping and replacement

- **Bigger pages** shrink tables but cause internal fragmentation (so they are used for large mappings only).
- **Hybrid:** one page table per segment, with base = the table's address and bounds = the number of valid pages. Saves space, but variable-size tables bring external fragmentation back.
- **Multi-level page tables:** a **page directory** points to the pages of the page table, and directory entries for unused regions are invalid. Saves a lot of space and each table page fits in a frame, but a TLB miss costs one reference per level and it is more complex. Worked example: 14-bit VA, 64 B pages, VA 0x3F80 → PD index 15, PT index 14, PFN 55.
- **More levels:** when the directory itself doesn't fit in a page (for example 30-bit VA with 512 B pages, or x86-64's 4 levels, or Sv39's 3).
- **Inverted page tables:** one entry per physical frame, searched with a hash. **Swapping page tables:** keep them in kernel virtual memory.
- **Swap space:** disk space for pages. The **present bit** says whether a page is in RAM; if not, the PTE holds a disk address.
- **Page fault:** handled by the OS. Find a frame (evicting one if needed), issue the disk I/O (the process blocks), update the PTE and retry. On a TLB miss, the PTE is either valid and present, valid but not present (page fault), or invalid (segfault).
- **When to evict:** the swap daemon starts below the **low watermark** and evicts until the **high watermark**, writing in **clusters**.
- **AMAT** = T_M + P_miss × T_D. Disk is about 100,000× slower, so even a tiny miss rate dominates.
- **Policies:** OPT (furthest future use; the benchmark), FIFO (Belady's anomaly), random, LRU and LFU (use history; LRU has the stack property). The three kinds of miss are compulsory, capacity and conflict.
- **Workloads:** with no locality all policies are equal; with 80-20 LRU wins; with a looping sequential pattern LRU and FIFO are worst and random does well.
- **Clock:** an approximation of LRU using the hardware **use bit**. The hand clears 1s and evicts the first 0. Prefer clean pages (dirty ones cost a write-back).
- **Other policies:** demand paging vs prefetching, clustering writes. **Thrashing:** the working sets exceed memory, so use admission control (run fewer processes) or an out-of-memory killer.

# Rapid revision 4: concurrency (L14 to L17)

## L14: Threads and race conditions

- A **thread** is another point of execution in the same address space. It has its own PC, registers and **stack**; the threads of a process share code, heap and globals. Thread state lives in a **TCB**, and switching threads does not change the page table.
- **Why threads:** parallelism on many CPUs, and overlapping I/O with computation in one program. Threads share data easily; processes are better isolated.
- `pthread_create(&t, NULL, fn, arg)` and `pthread_join(t, &ret)`. The run order is **not deterministic**.
- **Counter race:** `counter = counter + 1` is load, add, store. An interrupt between them loses an update, so two threads each adding 1 million can end well short of 2 million.
- **Terms:** critical section (code touching shared data), race condition (the result depends on timing), indeterminate program (output varies from run to run), **mutual exclusion** (one thread at a time). What we want is **atomicity**, built from hardware primitives into synchronization tools.

## L15: Locks

- **Semantics:** a lock is available or held. `pthread_mutex_lock` and `unlock`. **Coarse-grained** (one big lock) is simple; **fine-grained** (many locks) allows more concurrency.
- **Evaluate a lock on:** correctness (mutual exclusion), fairness (no starvation) and performance (one CPU vs many).
- **Disabling interrupts:** works only on one CPU, requires trusting the program, and loses interrupts. Used only inside the kernel.
- **Load/store flag:** broken. Both threads can see 0 and enter, and it also spin-waits.
- **Test-and-set:** atomically return the old value and store the new one. The spin lock is correct but unfair, and terrible on one CPU (waiters burn whole slices).
- **Compare-and-swap**, and **load-linked / store-conditional** (the store fails if anyone wrote since the load), build the same spin lock.
- **Fetch-and-add ticket lock:** take a ticket and wait for your turn. Fair: FIFO.
- **Stop spinning:** `yield()` gives up the CPU but still costs up to N − 1 context switches and can starve. Better: a **queue plus park/unpark** (Solaris), with a guard spin lock. Use `setpark()` before releasing the guard to avoid the wakeup/waiting race. Linux uses **futex**, and two-phase locks spin briefly and then sleep.
- **Priority inversion:** a high-priority thread waits on a low-priority holder that a medium thread keeps preempting. Fix with priority inheritance (or avoid spinning).

## L16: Condition variables

- **Why:** a thread often needs to wait for a **condition** (for example, a child finished). Spinning wastes CPU.
- A **CV** is a queue of waiters. `wait(cv, mutex)` atomically releases the mutex and sleeps, and re-acquires the mutex before returning. `signal(cv)` wakes one waiter; `broadcast` wakes all.
- **Join:** use a state variable `done` plus the lock, and loop `while (done == 0) wait`. Without the state variable, a signal sent first is lost. Without the lock, there is a race between checking and waiting.
- **Producer/consumer:** with `if`, a woken consumer may find the buffer already emptied (**Mesa semantics**: being woken is only a hint). With one CV, a consumer can wake another consumer, and all threads sleep. The fix is `while` plus **two CVs** (`empty` and `fill`), generalised to a MAX-slot buffer.
- **Rule:** always hold the lock when signalling and waiting, and always use `while`.
- **Covering conditions:** if waiters need different amounts (a memory allocator), `signal` may wake the wrong one, so use `broadcast`. It costs extra wake-ups.

## L17: Semaphores

- `sem_wait` decrements and sleeps if the value is negative; `sem_post` increments and wakes one waiter. A negative value is minus the number of waiters. The initial value depends on the use.
- **Lock:** initial value 1 (binary semaphore). **Ordering:** initial value 0 (the parent waits, the child posts).
- **Bounded buffer:** empty = MAX, full = 0, and a mutex = 1 taken **inside** empty and full. Taking the mutex outside deadlocks: a consumer holds the mutex while waiting on full. Without the mutex, two producers with MAX > 1 can race on the fill index.
- **Reader-writer lock:** lock = 1 and writelock = 1. The first reader takes writelock and the last one releases it. Writers can starve.
- **Dining philosophers:** everyone grabbing the left fork deadlocks. Fix it by having the last philosopher take the right fork first, which breaks the circular wait.
- **Throttling:** a semaphore initialised to N limits how many threads enter a region (admission control).
- **Zemaphore:** a semaphore built from a lock, a CV and a value. Its value never goes negative, like Linux's.
- **Deadlock (Tutorial 6, OSTEP 32):** needs mutual exclusion, hold and wait, no preemption and circular wait. Prevent it with lock ordering, trylock, or acquiring all locks at once; there are also avoidance schemes (the Banker's algorithm) and detect-and-recover. Non-deadlock bugs are **atomicity violations** (fix with a lock) and **order violations** (fix with a CV or semaphore).

# Rapid revision 5: file systems (L18 and L19, Tutorial 7)

## L18: Files and directories

- **File:** an array of bytes with a low-level name, its **inode number**. **Directory:** a list of (name, inode number) pairs; directories form a tree rooted at `/`.
- `open(path, O_CREAT | O_WRONLY | O_TRUNC, mode)` returns the lowest free **fd** (0, 1 and 2 are taken). `read` and `write` move the **current offset**; `lseek` sets it (no disk seek).
- **Open file table:** each fd points to a system-wide entry holding the offset, mode and refcount. **fork and dup share an entry**, so the offset is shared; two separate opens get separate offsets.
- `fsync(fd)` forces data to disk. **Atomic update:** write a temp file, fsync it, then `rename` it over the original.
- `stat` gives the size, inode number, link count, owner, permissions and times (all stored in the inode).
- **Directories:** `mkdir` creates `.` and `..`; `opendir`/`readdir`; `rmdir` only works on an empty directory.
- **Hard links:** `link` adds another name for the same inode, raising the **link count**. `unlink` removes a name, and the file is freed when the count reaches 0 and no fd is open. A **symlink** is its own file holding a path: it can cross file systems and point at directories, but can dangle.
- **Permissions:** rwx for owner, group and other (r = 4, w = 2, x = 1), changed with chmod. On a directory, x means you can enter it. Also **ACLs** and the **superuser**.
- **mkfs** makes a file system; **mount** attaches it at a directory, giving a single unified tree.

## L19: File system implementation (vsfs)

- **Two parts:** the data structures on disk, and the access methods (what each call reads and writes).
- **Layout** (64 blocks of 4 KB): superblock (block 0), inode bitmap, data bitmap, inode table (blocks 3–7, 80 inodes of 256 B), and data blocks.
- The **superblock** is read at mount: it holds the counts, where the inode table starts, and a magic number. **Bitmaps** use one bit per inode or block.
- **Locating inode i:** block = (i × 256) / 4096, then add the table start; sector = address / 512.
- **Inode contents:** mode, uid, size, times, link count, the number of blocks, and block pointers.
- **Multi-level index:** 12 direct pointers, then single, double and triple indirect (1024 pointers per 4 KB block): 48 KB, about 4 MB, 4 GB and 4 TB. Unbalanced on purpose, because most files are small. Alternatives: **extents** (start plus length; compact) and **linked allocation / FAT** (poor random access, and no hard links).
- **Directories on disk:** entries of (inode number, record length, string length, name). Deleting an entry leaves a gap that can be reused. Some systems use B-trees for big directories.
- **Free space:** pre-allocate a run of contiguous blocks for a new file.
- **Access paths:** open walks the path (5 reads for /foo/bar). Each read is read inode, read data, write inode (atime). An allocating write takes 5 I/Os. Create takes 10. Long paths are expensive.
- **Caching and buffering:** a unified **page cache** keeps hot inodes and blocks. **Write buffering** batches, schedules and even avoids writes (a file created and deleted soon after), but data can be lost in a crash; apps that care call fsync, or use direct I/O.

## Tutorial 7: the xv6 file system

- **Layers:** disk, buffer cache (`bio.c`), log (`log.c`), inodes (`fs.c`), directories, pathnames, file descriptors (`file.c`, `sysfile.c`).
- **Disk layout:** boot block, superblock, log, inodes, bitmap, data. Blocks are 1 KB; an inode has 12 direct pointers and 1 indirect, so the maximum file is 268 KB.
- **Buffer cache:** `bread` and `bwrite`, with one copy of each block and a sleep lock on each buffer (LRU list).
- **Logging:** each FS syscall runs inside `begin_op` / `end_op`. At commit, write the blocks to the log, write the header (the commit point), install the blocks in their real locations, then clear the log. On recovery, replay a committed log. Large writes are split across several transactions so each fits in the log.
- **Inodes:** `ialloc`, `iget`/`iput` (reference counts in memory), `ilock`, `bmap` (maps a file block number to a disk block, allocating if needed), `readi`/`writei`, and `iupdate` to write the inode back.
- **Path lookup:** `namei` walks the path one component at a time with `dirlookup`.
