# Formula sheet 1: CPU and networking (L01 to L09)

Exam-ready rules, tables and checks, in the notation of the notes. Sheet 2 covers memory, and sheet 3 covers concurrency and file systems.

## Processes and limited direct execution (L02 to L04)

| From → To | Cause |
|---|---|
| Ready → Running | Scheduled (OS) |
| Running → Ready | Descheduled, e.g. timer interrupt (OS) |
| Running → Blocked | Process starts I/O or waits |
| Blocked → Ready | I/O completes (interrupt) |

There is never a direct Blocked → Running edge. A **zombie** has exited and is not yet waited on; an **orphan** has lost its parent and is reparented to init.

- `fork()` returns 0 in the child and the child's PID in the parent. With $k$ forks in sequence (or a loop of $k$), there are $2^k$ processes.
- `exec()` never returns on success. Redirection: `fork`, then in the child `close(1); open(file)`, then `exec`.
- **Two register saves on a timer switch:** the hardware saves the *user* registers to the kernel stack (trapframe); the OS's `switch()`/`swtch()` saves the *kernel* registers to the proc structure (`struct context`: ra, sp, s0–s11 in xv6).
- The trap table is set at boot (a privileged instruction). User code passes a **syscall number**, never an address.

## Scheduling metrics (L05)

$$
\boxed{T_{\text{turnaround}} = T_{\text{completion}} - T_{\text{arrival}} \qquad T_{\text{response}} = T_{\text{first run}} - T_{\text{arrival}}}
$$

| Policy | Preemptive? | Best at | Weakness |
|---|---|---|---|
| FIFO | No | Simplicity | Convoy effect: short jobs stuck behind a long one |
| SJF | No | Turnaround (if all arrive together) | Late short jobs wait behind a running long job |
| STCF | Yes | Turnaround, always | Response; long jobs can starve |
| RR (quantum q) | Yes | Response | Worst turnaround; switch cost if q is small |

RR with $n$ jobs arriving together: job $i$ (from 1) first runs at $(i-1)q$, so the average response is $\frac{(n-1)q}{2}$. Tie rule from the notes: a job arriving exactly when a slice ends joins the queue **ahead** of the job just preempted. Context-switch cost is amortised when q is much larger than the switch time.

## MLFQ (L06)

1. If Priority(A) > Priority(B), A runs.
2. If equal, A and B run in round robin.
3. A new job starts at the top priority.
4. Once a job uses up its allotment at a level (in total, however often it gave up the CPU), it moves down one level.
5. After some period S, move every job to the top (priority boost).

| Problem | Fix |
|---|---|
| Starvation of long jobs | Rule 5 boost |
| Gaming (I/O just before the slice ends) | Rule 4 total-allotment accounting |
| A job that becomes interactive stays low | Rule 5 boost |

Higher queues usually have shorter quanta. If S is too large, jobs starve; if too small, MLFQ acts like plain RR.

## CFS and multiprocessor scheduling (L07)

$$
\boxed{\text{time\_slice}_k = \frac{w_k}{\sum_i w_i} \cdot \text{sched\_latency} \qquad \Delta\text{vruntime}_k = \frac{1024}{w_k} \cdot \text{runtime}_k}
$$

| nice | −20 | −10 | −5 | −1 | 0 | 1 | 5 | 10 | 19 |
|---|---|---|---|---|---|---|---|---|---|
| weight | 88761 | 9548 | 3121 | 1277 | **1024** | 820 | 335 | 110 | 15 |

- Each nice step changes the weight by about 1.25×. Only **ratios** matter: nice 0 vs 5 gives the same split as 5 vs 10 (about 3:1).
- Every process's vruntime grows by the same amount per period: that is the fairness check.
- $\text{slice} \ge \text{min\_granularity}$ (6 ms in the slides). With sched_latency 48 ms, more than 8 equal processes each get 6 ms.
- CFS picks the **minimum vruntime** from a red-black tree ($O(\log n)$). A waking sleeper gets the tree's minimum vruntime, so it cannot monopolise the CPU.
- **Multiprocessor:** SQMS is simple but has lock contention and poor cache affinity. MQMS has good affinity but load imbalance, fixed by migration and work stealing. Coherence comes from bus snooping.

## Layers and devices (L08)

| Layer | Unit | Address | Device |
|---|---|---|---|
| Application (L5–7) | Message | – | – |
| Transport (L4) | Segment (TCP) / datagram (UDP) | Port | – |
| Network (L3) | Packet / datagram | IP address | Router |
| Link (L2) | Frame | MAC address | Switch, bridge |
| Physical (L1) | Bits | – | Hub, repeater |

Encapsulation size: frame = data + TCP 20 + IP 20 + Ethernet header and trailer. Each IP fragment carries its own IP header.

## Transport layer (L09)

| | TCP | UDP |
|---|---|---|
| Connection | 3-way handshake | None |
| Reliability and order | Yes | No |
| Flow and congestion control | Yes | No |
| Header | 20 bytes or more | 8 bytes (src port, dst port, length, checksum) |
| Socket identified by | 4-tuple (src IP, src port, dst IP, dst port) | 2-tuple (dst IP, dst port) |

- Ports 0–1023 are well-known and need privilege to bind.
- **Seq/ack:** seq = number of the first byte in the segment; ack = **next byte expected** (cumulative). SYN and FIN each use one sequence number. Handshake from ISNs x and y: SYN(seq x), SYN-ACK(seq y, ack x+1), ACK(seq x+1, ack y+1).
- **Fast retransmit** after 3 duplicate ACKs; otherwise retransmit on timeout.
- **Close:** FIN, ACK, FIN, ACK, and the active closer waits in TIME_WAIT (2 × MSL).
- **Server:** socket, bind, listen, accept, recv/send, close. **Client:** socket, connect, send/recv, close. accept, connect and recv block. UDP uses sendto and recvfrom, with no listen or accept.

TCP timeout (update EstimatedRTT first, then DevRTT, as in K&R):

$$
\boxed{\begin{aligned}
\text{EstimatedRTT} &= (1-\alpha)\,\text{EstimatedRTT} + \alpha\,\text{SampleRTT}, \quad \alpha = 0.125\\
\text{DevRTT} &= (1-\beta)\,\text{DevRTT} + \beta\,|\text{SampleRTT} - \text{EstimatedRTT}|, \quad \beta = 0.25\\
\text{TimeoutInterval} &= \text{EstimatedRTT} + 4\,\text{DevRTT}
\end{aligned}}
$$

Sending limit and throughput:

$$
\boxed{\text{LastByteSent} - \text{LastByteAcked} \le \min(\text{cwnd}, \text{rwnd}) \qquad \text{throughput} \approx \frac{\text{cwnd}}{\text{RTT}}}
$$

| Event | ssthresh | cwnd | Next phase |
|---|---|---|---|
| Start | given | 1 MSS | Slow start: doubles every RTT |
| cwnd reaches ssthresh | – | – | Congestion avoidance: +1 MSS per RTT |
| 3 duplicate ACKs (Reno) | cwnd / 2 | ssthresh | Congestion avoidance |
| Timeout | cwnd / 2 | 1 MSS | Slow start |

**Internet checksum:** add the 16-bit words, wrapping any carry back into the low bit, then take the ones' complement. The receiver adds all words plus the checksum, and the result must be 0xFFFF. It misses errors that cancel out, for example the same bit flipped from 0 to 1 in one word and from 1 to 0 in another.

# Formula sheet 2: memory (L10 to L13)

## Number tools

| $2^{10}$ | $2^{12}$ | $2^{14}$ | $2^{16}$ | $2^{20}$ | $2^{30}$ | $2^{32}$ |
|---|---|---|---|---|---|---|
| 1 K (1024) | 4 K (4096) | 16 K (16384) | 64 K | 1 M | 1 G | 4 G |

Each hex digit is 4 bits. To split an address, write it in binary and cut from the right: offset bits first, then the index bits. Useful values: 1 KB = 1024, 2 KB = 2048, 28 KB = 28672, 32 KB = 32768, 34 KB = 34816.

## Base and bounds; segmentation (L11)

$$
\boxed{0 \le VA < \text{bounds} \;\Rightarrow\; PA = VA + \text{base}, \quad \text{else fault}}
$$

The last legal address is bounds − 1. If bounds is given as the **end** physical address, check PA < bounds instead. Read which convention the question uses.

Segmentation: the top bits pick the segment, and the rest is the offset. Check offset < size, then add the base. For a segment that grows downward (the stack):

$$
\boxed{PA = \text{base}_{\text{seg}} + \text{offset}, \qquad \text{offset}_{\text{neg}} = \text{offset} - \text{max segment size}, \quad |\text{offset}_{\text{neg}}| \le \text{size}}
$$

The maximum segment size is $2^{\text{offset bits}}$. An unused segment always faults.

## Free-space management (L11)

| Policy | Picks | Note |
|---|---|---|
| First fit | First chunk big enough | Fast; splinters the front of the list |
| Next fit | First fit, starting where the last search stopped | Spreads splinters out |
| Best fit | Smallest chunk big enough | Full search; leaves tiny splinters |
| Worst fit | Largest chunk | Full search; tends to fragment badly |

**Buddy:** round the request up to $2^k$ and split blocks in half until one fits. Internal fragmentation = block − request. On a free, merge with the buddy only if the buddy is **entirely** free, and repeat upward. A block's buddy address differs in exactly one bit (address XOR size).

## Paging (L12)

With page size $2^k$ bytes and an $n$-bit virtual address:

$$
\boxed{\text{offset bits} = k, \quad \text{VPN bits} = n - k, \quad PA = (\text{PFN} \ll k) \mid \text{offset}}
$$

$$
\boxed{\text{linear page table size} = 2^{\,n-k} \times \text{PTE size}}
$$

For example, 32 bits, 4 KB pages and 4-byte PTEs give 4 MB per process, and 400 MB for 100 processes. Without a TLB, every access costs 2 memory references (PTE plus data).

| PTE bit | Meaning | If wrong on access |
|---|---|---|
| Valid | Page is part of the address space | Trap; OS kills the process (segfault) |
| Present | Page is in RAM, not swapped out | Page fault; OS reads it from swap |
| Protection (R/W/X, U) | Allowed access types | Protection fault (or copy-on-write) |
| Dirty | Modified since it was loaded | Must be written back before eviction |
| Reference / use / accessed | Recently used | Clock skips it and clears it |

## TLB (L12)

Count misses as one per **new page** touched (cold TLB). Hit rate = hits / accesses.

$$
\boxed{EAT = h\,(t + m) + (1-h)\,(t + L\,m + m)}
$$

Here $t$ is the TLB lookup time, $m$ the memory time, $h$ the hit rate and $L$ the number of page-table levels ($L = 1$ for a linear table). For example, $t = 1$, $m = 100$ and $h = 98\%$ give 103 ns.

- **Context switch:** either flush the TLB (simple, but the TLB starts cold) or tag entries with an **ASID** (needs hardware and OS bookkeeping).
- **TLB coverage** = entries × page size. Spatial locality comes from bigger pages; temporal locality from re-running the loop.
- A hardware-managed TLB walks the table itself (x86). A software-managed one traps to the OS (MIPS).

## Smaller page tables (L13)

Entries per page $= P/e$ (page size over PTE size), so each level indexes $\log_2(P/e)$ bits:

$$
\boxed{\text{levels} = \left\lceil \frac{\text{VPN bits}}{\log_2(P/e)} \right\rceil}
$$

| Setup | Bits per level | Levels |
|---|---|---|
| 14-bit VA, 64 B pages, 4 B PTEs | 4 | 2 (the 0x3F80 example: PD 15, PT 14, PFN 55 gives 3520) |
| 32-bit VA, 4 KB pages, 4 B PTEs | 10 | 2 (x86) |
| 39-bit VA, 4 KB pages, 8 B PTEs (Sv39, xv6) | 9 | 3 |
| 48-bit VA, 4 KB pages, 8 B PTEs (x86-64) | 9 | 4 |

- Pages needed = 1 directory + one table page per directory entry that covers a used VPN.
- A TLB miss costs $L$ table references plus 1 for the data. Multi-level tables trade **time for space**.
- **Hybrid** (one page table per segment): $\text{PTE address} = \text{Base}[SN] + VPN \times \text{sizeof(PTE)}$, and bounds = the number of valid pages.
- **Inverted:** one entry per physical frame for the whole system, so its size is (RAM / page size) × entry size. Lookup uses a hash on (PID, VPN).

## Swapping (L13)

$$
\boxed{AMAT = T_M + P_{\text{miss}} \cdot T_D}
$$

With $T_M = 100$ ns and $T_D = 10$ ms: a 90% hit rate gives about 1 ms, 99.9% gives 10.1 µs, and AMAT stays under $2T_M$ only when $P_{\text{miss}} \le T_M / T_D = 10^{-5}$.

| Policy | Evicts | Notes |
|---|---|---|
| OPT (Belady) | Page used furthest in the future | Lower bound on misses; needs the future |
| FIFO | Oldest page loaded | Can show **Belady's anomaly**: more frames, more faults |
| Random | Any page | No corner cases |
| LRU | Least recently used | Stack property, so no anomaly; costly to implement exactly |
| Clock | First page with use bit 0, clearing 1s as the hand passes | Approximates LRU; prefer clean pages |

Check stream: 1,2,3,4,1,2,5,1,2,3,4,5 under FIFO gives 9 faults with 3 frames and 10 with 4. Miss types: compulsory (cold), capacity and conflict. On a TLB miss the PTE can be (1) valid and present, so update the TLB and retry; (2) valid but not present, a page fault; or (3) invalid, a segfault. The swap daemon evicts when free pages drop below the low watermark, until the high watermark is reached. **Thrashing**: the working sets do not fit, so run fewer processes (admission control).

# Formula sheet 3: concurrency and file systems (L14 to L19)

## Threads and races (L14)

Threads share code, the heap and globals. Each thread has its own registers, PC and **stack**. `counter = counter + 1` is load, add, store: an interrupt between the load and the store loses an update. With $n$ threads each adding $k$ times, the final value can be anything from 2 (when $k \ge 2$) up to $nk$.

## Locks (L15)

| Lock | Correct | Fair | Performance |
|---|---|---|---|
| Disable interrupts | Single CPU only | – | Unsafe to trust user code; fails on multiple CPUs |
| Load/store flag | **No** | – | Spins |
| Test-and-set spin | Yes | No | Wastes slices on one CPU; fine on many CPUs for short critical sections |
| CAS or LL/SC spin | Yes | No | Same as test-and-set |
| Ticket (fetch-and-add) | Yes | **Yes, FIFO** | Spins |
| Yield | Yes | No | Up to N − 1 context switches per round |
| Queue + park/unpark | Yes | Yes | Sleeps instead of spinning |

```c
int TestAndSet(int *p, int new) { int old = *p; *p = new; return old; }             // atomic
int CompareAndSwap(int *p, int exp, int new) { int a = *p; if (a == exp) *p = new; return a; }
lock (TAS):    while (TestAndSet(&flag, 1) == 1) ;
lock (CAS):    while (CompareAndSwap(&flag, 0, 1) == 1) ;
lock (LL/SC):  while (1) { while (LoadLinked(&flag)) ; if (StoreConditional(&flag, 1)) return; }
ticket:        myturn = FetchAndAdd(&ticket); while (turn != myturn) ;   unlock: turn++
```

Priority inversion: a high-priority thread waits for a low-priority holder that a medium thread keeps preempting. Fix with priority inheritance.

## Condition variables (L16)

Rules: keep a **state variable**, hold the **lock** when calling wait and signal, and always re-check in a **while** loop (Mesa semantics).

```c
join:  lock(&m); while (done == 0) wait(&c, &m); unlock(&m);
exit:  lock(&m); done = 1; signal(&c); unlock(&m);
producer: lock; while (count == MAX) wait(&empty, &m); put(); signal(&fill);  unlock;
consumer: lock; while (count == 0)   wait(&fill, &m);  get(); signal(&empty); unlock;
```

| Bug | Symptom | Fix |
|---|---|---|
| No state variable | Signal before wait is lost; waits forever | Add `done` |
| No lock | Check-then-wait race; waits forever | Hold the lock |
| `if` instead of `while` | Acts on a stale condition | `while` |
| One CV for producers and consumers | Wakes the wrong kind; all sleep | Two CVs |
| Waiters need different amounts | Wrong thread woken | `broadcast` (covering condition) |

## Semaphores (L17)

$$
\boxed{\texttt{sem\_wait}: s = s - 1,\ \text{sleep if } s < 0 \qquad \texttt{sem\_post}: s = s + 1,\ \text{wake one if any wait}}
$$

When negative, the value is minus the number of waiters. A Zemaphore (built from a lock and a CV) never goes below 0.

| Use | Initial value |
|---|---|
| Lock (binary semaphore) | 1 |
| Ordering / wait for an event | 0 |
| Rendezvous (A1 before B2, B1 before A2) | two semaphores, both 0; post your own, then wait for the other |
| Bounded buffer `empty` / `full` / `mutex` | MAX / 0 / 1, with the **mutex inside** empty and full |
| Reader-writer `lock` / `writelock` | 1 / 1 (the first reader takes writelock, the last releases it) |
| Dining philosophers forks | 1 each; the last philosopher takes the right fork first |
| Throttle to at most N | N |

Deadlock needs all four: mutual exclusion, hold and wait, no preemption, circular wait. A global lock order breaks circular wait; trylock breaks no preemption; acquiring everything at once breaks hold and wait.

## File API (L18)

- Each process has an **fd table** pointing into the system-wide **open file table** (offset, mode, refcount). fork and dup **share** an entry, and so share the offset. A separate open() makes a new entry with its own offset.
- `lseek` changes only the offset, with no disk I/O. `fsync` forces data to disk. `rename` is atomic: to update safely, write `f.tmp`, fsync it, then `rename("f.tmp", "f")`.
- **Hard link:** a new name for the same inode, so the link count goes up by 1. The data is freed when the count reaches 0 and no fd is open. It cannot link a directory or cross file systems.
- **Symlink:** its own inode, whose data is a path. It can dangle, and can cross file systems.
- Directory link count = 2 + number of subdirectories.
- Permissions: r = 4, w = 2, x = 1 for owner, group and other. For example, 750 is `rwxr-x---` and 644 is `rw-r--r--`. On a directory, x lets you enter it and w lets you create or delete entries.

## vsfs implementation (L19)

Layout: superblock, inode bitmap, data bitmap, inode table, data. With 4 KB blocks and 256 B inodes, 16 inodes fit per block.

$$
\boxed{\text{blk} = \left\lfloor\frac{i \times \text{sizeof(inode)}}{\text{blockSize}}\right\rfloor \qquad \text{addr} = \text{inodeStartAddr} + i \times \text{sizeof(inode)} \qquad \text{sector} = \left\lfloor\frac{\text{addr}}{512}\right\rfloor}
$$

For example, with the table at 12 KB: inode 32 is in iblock 2, sector 40, offset 0; inode 70 is in iblock 4, sector 56, offset 1536; inode 37 is at byte 21760, sector 42.

With block size $B$, pointer size $p$ and $n = B/p$ pointers per indirect block:

$$
\boxed{\text{max size} = (\text{direct} + n + n^2 + n^3) \times B}
$$

With 12 direct pointers and 4 KB blocks: 48 KB direct, about 4 MB with single, about 4 GB with double and about 4 TB with triple indirect. xv6: $(12 + 256) \times 1\text{ KB} = 268$ KB. To find the pointer for a byte offset: block $b = \lfloor\text{offset}/B\rfloor$. If $b < 12$, it is direct. Otherwise subtract 12; if the result is less than $n$, it is single indirect; otherwise subtract $n$ again, and in the double-indirect tree the outer slot is $\lfloor r/n \rfloor$ and the inner slot $r \bmod n$. Example: byte 5,000,000 is block 1220, which is double indirect with outer slot 0 and inner slot 184.

Disk I/Os with a cold cache:

$$
\boxed{\texttt{open()} = 2 \times \text{depth} + 1 \text{ reads} \qquad \text{create} + N \text{ allocating writes} = 10 + 5N}
$$

| Operation | I/Os |
|---|---|
| open("/foo/bar") | 5 reads: root inode, root data, foo inode, foo data, bar inode |
| read() of one block | 3: read inode, read data, write inode (atime) |
| Allocating write() | 5: read inode, read data bitmap, write data bitmap, write data, write inode |
| create("/foo/bar") | 10: 4 path reads, read and write the inode bitmap, write foo's data, read and write bar's inode, write foo's inode |
| Create plus a 12 KB write | 10 + 3 × 5 = 25 |

A bitmap for $K$ blocks takes $K/8$ bytes. Caching and write buffering cut these I/Os (batching, scheduling, avoidance), at the cost of losing data on a crash unless the program calls fsync.
