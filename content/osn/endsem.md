# Endsem practice: the professor's sheet

*Endsem: 24 Nov 2026, 9 AM. 9 questions × 10 marks. These are the 20 problems from the professor's post-midsem practice sheet (CS3.301_Questions.pdf), rewritten as 10-mark questions with full solutions.*

**How the sheet was made.** It has two questions per OSTEP chapter: 15, 16, 17, 18, 19, 20, 28, 30, 31 and 40. Most of the numbers come from the worked examples on the L11 to L19 slides, sometimes with small changes. Each question asks you to (a) calculate or trace, (b) say who does it and why, and (c) give the trade-off or the fix. The midsem reused sheet problems, so learn each **method**. If the numbers change, the method still works.

Marks in brackets are a guess at how 10 marks split.

## Address translation and segmentation

**E1 (sheet Q1).** A process has a 16 KB address space, loaded with base = 32 KB and bounds = 16 KB (bounds holds the size). (a) Translate 0, 1024, 3000, 4400, 16384 and 18000, or say which fault. [5] (b) Who sets base and bounds, when, and why must those instructions be privileged? [3] (c) Why does base and bounds waste memory? [2]

*Solution.* (a) A VA is legal only if VA < bounds = 16384. Then PA = VA + 32768.

| VA | Result |
| --- | --- |
| 0 | 32768 |
| 1024 | 33792 |
| 3000 | 35768 |
| 4400 | **37168** (this faults in OSTEP's 4 KB version, but is valid here) |
| 16384 | **Fault**: VA = bounds, and the last legal address is 16383 |
| 18000 | **Fault** |

(b) The OS sets them in kernel mode. It does this when it creates the process and on every context switch, restoring the values from the process's PCB. If a user program could change them, it could point base at another process's memory or at the kernel, so the instructions must be privileged.

(c) The whole address space is allocated in physical memory, including the unused gap between heap and stack. That waste is **internal fragmentation**.

---

**E2 (sheet Q2).** The OS moves a descheduled process's address space to another region of physical memory. List the steps, and explain why the process never notices. [10]

*Solution.*

1. The process is already descheduled, so it is not running.
2. The OS copies the address space from the old region to the new one.
3. The OS writes the new base into the saved base register in the process's PCB.
4. The OS adds the old region to the free list.
5. On the next context switch to this process, the new base is loaded into the MMU.

The process only ever uses **virtual** addresses. Its VAs and bounds are unchanged, and only the hidden VA-to-PA mapping moved. This is dynamic relocation.

---

**E3 (sheet Q3).** 16-bit VAs: the top 2 bits pick the segment and the low 14 bits are the offset (max segment size 16 KB). The stack grows downward.

| Segment | Bits | Base | Size | Grows positive? |
| --- | --- | --- | --- | --- |
| Code | 00 | 32 KB | 2 KB | Yes |
| Heap | 01 | 34 KB | 3 KB | Yes |
| Stack | 11 | 28 KB | 2 KB | No |
| unused | 10 | – | – | – |

(a) Translate 0x0100, 0x4200, 0x4C00, 0xFC00, 0xF000 and 0x8000. [7] (b) How does the hardware compute a stack address? [3]

*Solution.* (a)

| VA | Segment | Offset | Result |
| --- | --- | --- | --- |
| 0x0100 | code | 256 | 32768 + 256 = **33024** |
| 0x4200 | heap | 0x200 = 512 | 34816 + 512 = **35328** |
| 0x4C00 | heap | 0xC00 = 3072 | **Fault**: offset must be < 3072 (one byte past the end) |
| 0xFC00 | stack | 0x3C00 = 15360 | 15360 − 16384 = −1024, so PA = 28672 − 1024 = **27648** |
| 0xF000 | stack | 0x3000 = 12288 | −4096, more than 2 KB below base: **fault** |
| 0x8000 | 10 | – | **Fault**: unused segment |

(b) For a stack address, the hardware takes the offset and subtracts the maximum segment size: negative offset = offset − 16 KB. It checks that |negative offset| ≤ segment size, and then PA = base + negative offset. A "grows positive" bit in the segment register tells the hardware which rule to use.

---

**E4 (sheet Q4).** (a) Explain external fragmentation with a small example, and why compaction is expensive. [6] (b) How can several processes share a code segment safely? [4]

*Solution.* (a) Segments have different sizes, so allocating and freeing them leaves holes of different sizes between them. Example: free holes of 4 KB and 2 KB cannot satisfy a 5 KB segment, even though 6 KB is free. **Compaction** stops the processes, copies their segments together into one block, and updates their segment registers. That copies a lot of memory and pauses everything, and a growing segment can make the work wasted.

(b) Each segment has **protection bits**. The code segment is marked read-execute, so every process can map the same physical code segment, and none of them can write to it. The hardware checks the bits on each access.

## Free-space management

**E5 (sheet Q5).** The free list holds chunks of 10, 30, 20 and 15 bytes, in that order. Requests arrive for 12, 18 and 9 bytes. Ignore headers; a chunk is split and the remainder stays in place. (a) Show the list after each request under first fit, best fit and worst fit. [7] (b) A request for 25 then arrives. Which policies succeed, and what does that suggest? [3]

*Solution.* (a)

| Policy | After 12 | After 18 | After 9 |
| --- | --- | --- | --- |
| First fit | 10, **18**, 20, 15 | 10, 20, 15 (the 18 is used up) | **1**, 20, 15 |
| Best fit | 10, 30, 20, **3** | 10, 30, **2**, 3 | **1**, 30, 2, 3 |
| Worst fit | 10, **18**, 20, 15 | 10, 18, **2**, 15 | 10, **9**, 2, 15 |

(b) Only **best fit** succeeds, using the 30. No policy is best for every workload. Here best fit kept a large chunk, but it also left tiny useless splinters (1, 2, 3).

---

**E6 (sheet Q6).** A binary buddy allocator manages a 64 KB heap starting at 0. Requests arrive in order: A = 7 KB, B = 3 KB, C = 20 KB. (a) Which block does each get, and which splits are needed? [5] (b) What is the total internal fragmentation? [2] (c) A is freed, then B. Describe the coalescing. [3]

*Solution.* (a) Round each request up to a power of two.

- A needs 8 KB. Split 64 into 32 + 32, then [0, 32) into 16 + 16, then [0, 16) into 8 + 8. **A = [0, 8 KB)**.
- B needs 4 KB. Split [8, 16) into 4 + 4. **B = [8, 12 KB)**.
- C needs 32 KB. **C = [32, 64 KB)**.

(b) (8 − 7) + (4 − 3) + (32 − 20) = **14 KB**.

(c) When A is freed, its buddy [8, 16) is split and part of it holds B, so nothing merges. When B is freed, it merges with [12, 16) into [8, 16). That merges with [0, 8) into [0, 16), and that merges with [16, 32) into [0, 32). It stops there, because the buddy [32, 64) holds C.

## Paging and TLBs

**E7 (sheet Q7).** 32-bit VAs, 4 KB pages, 4-byte PTEs and a linear page table. (a) VPN and offset bits? [2] (b) Table size per process, and for 100 processes? [3] (c) VA 0x00403A2C maps to a page whose PTE holds PFN 0x01F2. What is the PA? [3] (d) Without a TLB, how many memory references does one load need? [2]

*Solution.* (a) 12-bit offset (2^12 = 4 KB) and a 20-bit VPN. (b) 2^20 × 4 B = **4 MB** per process, **400 MB** for 100 processes. (c) VPN = 0x00403 and offset = 0xA2C, so PA = **0x01F2A2C**: the PFN followed by the unchanged offset. (d) **2**: one to read the PTE and one for the data.

---

**E8 (sheet Q8).** What happens, and who handles it? (a) A load to a page with valid = 0. (b) valid = 1, present = 0. (c) A store to a read-only page. (d) How are the dirty and reference bits used in eviction? [10]

*Solution.*

- (a) The hardware raises an exception and the OS handles it. The address is not part of the address space, so the OS usually kills the process (segmentation fault).
- (b) **Page fault.** The OS page-fault handler finds the swap address stored in the PTE and reads the page from disk; the process is blocked during the I/O. It evicts a page first if memory is full. It then sets present = 1 and the PFN, and retries the instruction.
- (c) **Protection fault**: a trap to the OS, which usually kills the process. With copy-on-write (as in MP2), the OS instead copies the page, makes it writable and retries the instruction.
- (d) A clean page can be dropped for free, but a dirty one must be written back to disk first, so the OS prefers clean pages. The reference (use) bit is set on each access, and the clock algorithm uses it to approximate LRU: it skips pages with use = 1, clearing the bit as it passes.

---

**E9 (sheet Q9).** An array of ten 4-byte ints a[0..9] starts at VA 100. Pages are 16 bytes, and the TLB starts empty. (a) Which pages hold the array? Mark each access as a hit or miss, and give the hit rate. [5] (b) The loop runs again right away. What is the hit rate, and which locality explains it? [2] (c) What would the first-loop hit rate be with 4 KB pages? [3]

*Solution.* (a) The array covers bytes 100 to 139. VPN 6 (96–111) holds a[0..2], VPN 7 (112–127) holds a[3..6], and VPN 8 (128–143) holds a[7..9]. The pattern is miss, hit, hit, miss, hit, hit, hit, miss, hit, hit, so the hit rate is **70%**. Spatial locality.

(b) **100%** (assuming the TLB still holds the three entries). Temporal locality.

(c) Bytes 100 to 139 all fall in page 0, so there is 1 miss and the hit rate is **90%**. Bigger pages capture more spatial locality.

---

**E10 (sheet Q10).** A TLB lookup takes 1 ns and a memory access 100 ns. On a miss, the hardware reads one PTE from memory. (a) Find the effective access time for hit rates of 98% and 90%. [5] (b) P1 and P2 both use VPN 10, mapped to different frames. What problem does this cause on a context switch? Give two fixes and their trade-offs. [5]

*Solution.* (a) A hit costs 1 + 100 = 101 ns. A miss costs 1 + 100 (PTE) + 100 (data) = 201 ns.

$$\text{EAT} = h(t_{TLB} + t_M) + (1-h)(t_{TLB} + 2t_M)$$

- At 98%: 0.98 × 101 + 0.02 × 201 = **103 ns**.
- At 90%: 90.9 + 20.1 = **111 ns**.

(b) After a switch, the TLB still holds P1's VPN 10 → PFN entry, so P2 would access P1's frame. **Fix 1: flush the TLB** on every switch. It is simple, but every switch then starts with a cold TLB and a burst of misses. **Fix 2: an address-space identifier (ASID)** in each entry, so entries from different processes can coexist. There is no flush, but it needs extra hardware bits and the OS must manage the ASIDs.

## Multi-level page tables

**E11 (sheet Q11).** A 16 KB address space (14-bit VAs), 64-byte pages and 4-byte PTEs. The process uses only VPNs 0, 1 (code), 4, 5 (heap), 254 and 255 (stack). (a) VPN and offset bits? How large would a linear table be? [2] (b) With one page of PTEs per directory entry, how many bits index the directory and how many index a page of the table? [2] (c) How many pages does the two-level table need? [2] (d) Split 0x3F80 into directory index, table index and offset. Its PTE holds PFN 55. What is the PA? [4]

*Solution.* (a) 6-bit offset, 8-bit VPN. A linear table has 256 × 4 B = **1 KB = 16 pages**. (b) A page holds 64 / 4 = 16 PTEs, so **4 bits** index a page of the table and **4 bits** index the directory. (c) The directory, plus the table page for VPNs 0–15, plus the table page for VPNs 240–255: **3 pages** instead of 16. (d) 0x3F80 = 11 1111 1000 0000. The VPN is 1111 1110 = 254: **directory index 15, table index 14, offset 0**. PA = 55 × 64 = **3520 (0xDC0)**.

---

**E12 (sheet Q12).** 48-bit VAs, 4 KB pages, 8-byte PTEs, and every level must fit in one page. (a) How many levels are needed? [5] (b) How many memory references does a load need on a TLB miss, and what is the trade-off? [5]

*Solution.* (a) One page holds 4096 / 8 = 512 PTEs, so each level uses 9 bits. The VPN is 48 − 12 = 36 bits, and 36 / 9 = **4 levels**. (b) **5**: one per level plus the data. Multi-level tables trade **time for space**. A TLB miss costs more memory references, but table pages exist only for the parts of the address space in use. They are also more complex to implement.

*Likely twist:* RISC-V Sv39 (Tutorial 3 and xv6) has 39-bit VAs, so 27 VPN bits and **3 levels** of 9 bits.

## Locks

**E13 (sheet Q13).** `lock: while (m->flag == 1) ; m->flag = 1;` and `unlock: m->flag = 0;` (a) Give an interleaving with two threads in the critical section. [3] (b) Rewrite lock() with TestAndSet. [3] (c) Evaluate the spin lock for correctness, fairness and single-CPU performance. [4]

*Solution.* (a) flag = 0. T1 reads flag = 0 and leaves the loop, then a timer interrupt switches to T2. T2 reads 0, sets flag = 1 and enters. T1 resumes, sets flag = 1 and enters as well. Both are inside.

(b)
```c
void lock(lock_t *m) { while (TestAndSet(&m->flag, 1) == 1) ; }  // spin
void unlock(lock_t *m) { m->flag = 0; }
```

(c) **Correct**: yes, the test and the set happen as one atomic step. **Fair**: no, a thread can spin forever while others keep winning. **Performance on one CPU**: poor. If the holder is preempted, each waiter spins for its whole time slice, so N threads can waste N − 1 slices. On multiple CPUs it is reasonable when critical sections are short.

---

**E14 (sheet Q14).** A ticket lock: `myturn = FetchAndAdd(&ticket); while (turn != myturn) ;` and `unlock: turn++`, with ticket = turn = 0. (a) T1, T2 and T3 call lock in that order. Give each myturn and the order they enter. [3] (b) T1 calls unlock twice by mistake. What happens? [4] (c) Why is this fair when test-and-set is not? [3]

*Solution.* (a) T1 gets 0, T2 gets 1 and T3 gets 2. They enter in the order T1, T2, T3.

(b) The first unlock sets turn = 1, and T2 enters. The second sets turn = 2, and **T3 enters while T2 is still inside**. turn now stays one ahead of where it should be, so later threads keep overlapping in pairs. Mutual exclusion is broken from then on.

(c) Each thread gets a ticket and is served in ticket order (FIFO), so every thread eventually gets in. With test-and-set, whoever happens to run when the lock is released wins, so a thread can starve.

## Condition variables

**E15 (sheet Q15).** Two broken joins. Version 1 (no state variable): exit = lock, signal, unlock; join = lock, wait, unlock. Version 2 (no lock): exit = `done = 1; signal`; join = `if (done == 0) wait`. (a) and (b) Give an interleaving in which each version makes the parent wait forever. [3 + 3] (c) Write the correct version. [4]

*Solution.* (a) Version 1: the child runs first and calls thr_exit. Its signal finds no waiter and is lost. The parent then calls wait and sleeps forever.

(b) Version 2: the parent checks done == 0 and is interrupted before it calls wait. The child sets done = 1 and signals, but nobody is waiting. The parent resumes, calls wait, and sleeps forever.

(c)
```c
void thr_exit() { lock(&m); done = 1; signal(&c); unlock(&m); }
void thr_join() { lock(&m); while (done == 0) wait(&c, &m); unlock(&m); }
```
Rules: always use a state variable, hold the lock around signal and wait, and check the condition in a while loop.

---

**E16 (sheet Q16).** allocate(n) waits on one CV while bytesLeft < n. free(n) adds n and calls signal. bytesLeft starts at 0. (a) Ta calls allocate(100) and Tb calls allocate(10), and both wait. Tc calls free(50). Show how a thread can stay asleep even though memory is free. [4] (b) Give the fix and its cost. [3] (c) Why must allocate use a while loop? [3]

*Solution.* (a) free(50) sets bytesLeft = 50, and signal wakes one waiter. If it wakes Ta, Ta rechecks 50 < 100 and sleeps again. Tb, which needs only 10, is never woken.

(b) Use **broadcast**, which wakes all waiters. This is a **covering condition**. The cost is that threads that still cannot proceed also wake up, recheck and sleep again, which wastes context switches.

(c) Under Mesa semantics, a woken thread does not run at once. Another thread can take the memory first, and spurious wake-ups can happen, so the condition must be rechecked after every wake-up.

## Semaphores

**E17 (sheet Q17).** Thread A prints A1 then A2. Thread B prints B1 then B2. (a) Using semaphores, ensure A1 comes before B2 and B1 comes before A2. Give initial values. [6] (b) What goes wrong if both threads call sem_wait before sem_post? [4]

*Solution.* (a) This is the **rendezvous**. Use two semaphores, `aArrived` and `bArrived`, both starting at 0.

```c
// Thread A                 // Thread B
print("A1");                print("B1");
sem_post(&aArrived);        sem_post(&bArrived);
sem_wait(&bArrived);        sem_wait(&aArrived);
print("A2");                print("B2");
```

(b) **Deadlock.** Each thread waits for a post that the other only makes after its own wait, so both sleep forever.

---

**E18 (sheet Q18).** The semaphore reader-writer lock, where the first reader waits on writelock and the last reader posts it. (a) What are the initial values of lock and writelock? Why do only the first and last readers touch writelock? [4] (b) Give a scenario in which a writer waits forever. [3] (c) Suggest a fix. [3]

*Solution.* (a) Both start at **1**. `lock` protects the readers count. The first reader takes writelock for the whole group of readers, which blocks writers. Middle readers only update the count, and the last reader to leave releases writelock.

(b) R1 holds the read lock, and W waits on writelock. R2 arrives before R1 leaves, then R3 before R2 leaves, and so on. readers never drops to 0, so W waits forever.

(c) Writer priority: add a semaphore `turnstile` (initial 1). A writer does sem_wait(turnstile) before waiting on writelock and posts it after. Every reader does sem_wait(turnstile) and sem_post(turnstile) on entry, so new readers queue up behind a waiting writer. (This is Homework 04.)

## File system implementation

**E19 (sheet Q19).** VSFS: 4 KB blocks and 256-byte inodes. Block 0 is the superblock, block 1 the inode bitmap, block 2 the data bitmap, and the inode table starts at block 3. (a) In which block, and at what byte address, is inode 37? [4] (b) An inode has 12 direct pointers, 1 single-indirect and 1 double-indirect pointer, and pointers are 4 bytes. What is the maximum file size? [4] (c) Why is this design a good fit for real files? [2]

*Solution.* (a) Inode 37 starts 37 × 256 = 9472 bytes into the table. 9472 / 4096 gives inode-table block 2, so it is in **disk block 5**. Byte address = 12288 + 9472 = **21760**, which is offset (37 mod 16) × 256 = 1280 into the block. Sector = 21760 / 512 = **42** (it starts halfway through that sector). The slide used inode 32, which sits at the start of a block; 37 does not.

(b) A block holds 4096 / 4 = 1024 pointers.

$$(12 + 1024 + 1024^2) \times 4\text{ KB} = 48\text{ KB} + 4\text{ MB} + 4\text{ GB} \approx 4.004\text{ GB}$$

That is 4,299,210,752 bytes.

(c) Most files are small, so direct pointers serve them with no extra reads. The few large files pay for the indirection. The tree is deliberately unbalanced.

---

**E20 (sheet Q20).** Nothing is cached, and each directory fits in one block. List the disk I/Os for (a) `open("/foo/bar", O_RDONLY)` [3], (b) the first 4 KB `read()` [3], and (c) creating `/foo/bar` [4].

*Solution.* (a) Read the root inode, root data, foo inode, foo data, then bar's inode: **5 reads** (2 × depth + 1).

(b) Read bar's inode, read the data block, and write bar's inode to update its access time: **2 reads and 1 write**. No bitmap is touched.

(c) Read the root inode, root data, foo inode and foo data. Read the inode bitmap and write it back. Write foo's data (the new entry). Read bar's inode and write it (it shares a block with other inodes, so this is a read-modify-write). Write foo's inode. That is **10 I/Os: 6 reads and 4 writes**.

*Likely follow-up:* each allocating write takes 5 I/Os (read inode, read data bitmap, write data bitmap, write data, write inode). Creating a 12 KB file therefore takes 10 + 3 × 5 = **25 I/Os**.

# Endsem practice: post-midsem extras

*Topics from L13 to L19 that the sheet skips. They are written in the same 10-mark style, with new numbers.*

**X1.** Reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5. (a) Count faults for FIFO with 3 frames and with 4 frames. [4] (b) Count faults for LRU with 3 and 4 frames, and for OPT with 3 frames. [4] (c) What is Belady's anomaly, and why can LRU never show it? [2]

*Solution.* (a) **FIFO with 3 frames: 9 faults.** Contents after each fault: [1], [1,2], [1,2,3], [2,3,4], [3,4,1], [4,1,2], [1,2,5]; then 1 and 2 hit; then [2,5,3], [5,3,4]; then 5 hits. **FIFO with 4 frames: 10 faults**: 1, 2, 3 and 4 miss, 1 and 2 hit, and then 5, 1, 2, 3, 4 and 5 all miss.

(b) **LRU with 3 frames: 10 faults** (only the two hits on 1, 2 after the 5). **LRU with 4 frames: 8 faults** (misses on 1, 2, 3, 4, 5, 3, 4, 5). **OPT with 3 frames: 7 faults** (1, 2, 3; 4 evicts 3; 5 evicts 4; 3 evicts 1; 4 evicts 2).

(c) **Belady's anomaly** means more frames give more faults, as FIFO does here (9 → 10). LRU and OPT have the **stack property**: the pages held with N frames are always a subset of those held with N + 1 frames. So adding a frame can never cause an extra miss.

---

**X2.** T_M = 100 ns and T_D = 10 ms. (a) Find the AMAT at a 99.9% hit rate. [3] (b) What hit rate keeps the AMAT under 200 ns? [3] (c) Describe, step by step, what happens on a TLB miss for a page that is valid but not present. [4]

*Solution.* (a) AMAT = T_M + P_miss × T_D = 100 ns + 0.001 × 10^7 ns = **10.1 µs**.

(b) 100 + P × 10^7 ≤ 200 gives P ≤ 10^−5, so the hit rate must be at least **99.999%**. Disk misses dominate everything.

(c) The hardware walks the page table and finds valid = 1, present = 0, so it raises a page fault. The OS finds a free frame, running the replacement policy and writing back a dirty victim if needed. It reads the page from the swap address in the PTE, while the process is blocked. It updates the PTE (present = 1, PFN) and retries the instruction. The retry misses in the TLB again, the hardware inserts the entry, and a final retry hits.

---

**X3.** One producer and two consumers share a one-slot buffer.

```c
void *consumer() { lock(&m); if (count == 0) wait(&cv, &m); get(); signal(&cv); unlock(&m); }
void *producer() { lock(&m); if (count == 1) wait(&cv, &m); put(); signal(&cv); unlock(&m); }
```

(a) Show how a consumer can call get() on an empty buffer. [4] (b) After changing `if` to `while`, show how all three threads can end up asleep. [4] (c) Give the final fix. [2]

*Solution.* (a) Tc1 finds the buffer empty and waits. P fills the buffer and signals, so Tc1 becomes ready but does not run yet. Tc2 runs first and consumes. Tc1 then runs, does not recheck because of the `if`, and calls get() on an empty buffer.

(b) Tc1 and Tc2 both wait. P fills, signals (waking Tc1) and then waits because the buffer is full. Tc1 consumes and signals, but there is **one CV**, and the signal wakes Tc2 instead of P. Tc2 sees an empty buffer and waits. Now all three are asleep.

(c) Use `while`, plus **two CVs**: producers wait on `empty` and signal `fill`, and consumers wait on `fill` and signal `empty`.

---

**X4.** In a semaphore bounded buffer (empty = MAX, full = 0, mutex = 1), the producer calls sem_wait(&mutex) *before* sem_wait(&empty), and the consumer likewise takes mutex before full. (a) Show the deadlock. [5] (b) Fix it, and say why the fix works. [5]

*Solution.* (a) The buffer is empty. The consumer takes mutex, then blocks on full = 0 **while holding mutex**. The producer blocks on mutex. Neither can ever proceed.

(b) Take mutex **inside** the counting semaphores: `sem_wait(&empty); sem_wait(&mutex); put(); sem_post(&mutex); sem_post(&full);`, and the mirror image in the consumer. A thread then only holds mutex while it can actually make progress, so there is no hold-and-wait across the two semaphores.

---

**X5.** `counter = counter + 1` compiles to `mov 0x8049a1c, %eax; add $1, %eax; mov %eax, 0x8049a1c`. counter starts at 50, and two threads each run it once. (a) Trace an interleaving that ends with 51. [5] (b) Define critical section, race condition, indeterminate and mutual exclusion. [5]

*Solution.* (a)

| Step | T1 | T2 | eax (T1 / T2) | counter |
| --- | --- | --- | --- | --- |
| 1 | mov (load) | | 50 / – | 50 |
| 2 | add | | 51 / – | 50 |
| 3 | *interrupt, save T1's eax* | mov (load) | 51 / 50 | 50 |
| 4 | | add | 51 / 51 | 50 |
| 5 | | mov (store) | | **51** |
| 6 | mov (store) | | | **51** |

One update is lost.

(b) **Critical section**: code that accesses a shared resource. **Race condition**: the result depends on the timing of the threads. **Indeterminate**: the output can differ from run to run. **Mutual exclusion**: only one thread may be in the critical section at a time.

---

**X6.** A 100-byte file. `fd = open("f", O_RDONLY); read(fd, buf, 10);` then `fork()`. The child calls `read(fd, buf, 20)` and exits. The parent waits, then calls `lseek(fd, 0, SEEK_CUR)`. (a) What does it return, and why? [3] (b) What if the child had opened the file again itself? [2] (c) Run `echo x > a; ln a b; ln -s a s; rm a`. Give the link count of b, and say what `cat b` and `cat s` do. [3] (d) How do you update a file atomically? [2]

*Solution.* (a) It returns **30**. After fork, the parent and child fd tables point to the **same open-file-table entry**, which holds one shared offset (10 + 20).

(b) A separate open() creates a new entry with its own offset, so the parent's offset would stay at 10.

(c) After `ln`, the inode's link count is 2; `rm a` drops it to **1**. `cat b` prints x. `cat s` fails (No such file), because s stores the **path** "a", which no longer exists: it is a dangling symlink.

(d) Write to `f.tmp`, call `fsync()`, then `rename("f.tmp", "f")`. rename is atomic, so a crash leaves either the old file or the new one, never a mix.

---

**X7.** Dining philosophers, with 5 philosophers and 5 forks. Each runs `sem_wait(left); sem_wait(right); eat; sem_post(right); sem_post(left);`. (a) Show the deadlock, and name the four conditions. [5] (b) Give the standard fix and the condition it breaks. [3] (c) Name one other fix. [2]

*Solution.* (a) All five grab their left fork at the same time, then each waits forever for the right fork. The four conditions are **mutual exclusion, hold-and-wait, no preemption and circular wait**.

(b) Philosopher 4 picks up the **right fork first**. That breaks the **circular wait**, because there is now a total order on forks.

(c) Admission control: a semaphore initialised to 4 lets at most 4 philosophers try at once. Alternatively, pick up both forks atomically under one lock, which breaks hold-and-wait.

---

**X8.** (a) Write CompareAndSwap and a spin lock using it. [3] (b) Write a lock using LoadLinked and StoreConditional. [3] (c) What is priority inversion, and how can it be fixed? [4]

*Solution.* (a)
```c
int CompareAndSwap(int *ptr, int expected, int new) {
    int actual = *ptr;
    if (actual == expected) *ptr = new;
    return actual;            // all of this happens atomically
}
void lock(lock_t *l) { while (CompareAndSwap(&l->flag, 0, 1) == 1) ; }
```
(b)
```c
void lock(lock_t *l) {
    while (1) {
        while (LoadLinked(&l->flag) == 1) ;               // spin until free
        if (StoreConditional(&l->flag, 1) == 1) return;   // fails if anyone wrote since LL
    }
}
```
(c) Low-priority L holds a lock, and high-priority H needs it and waits (or spins). A medium-priority M then preempts L, so H effectively waits for M. With a spin lock on one CPU, H can spin forever and L never runs. Fixes: **priority inheritance** (L temporarily runs at H's priority), or avoid spinning (yield or sleep).

# Endsem practice: pre-midsem problems

*Lectures 1 to 9, in 10-mark exam style. These are new problems; the professor's sheet had none for this half.*

**P1.** (a) What does this print, and in what order? [4] (b) Define zombie and orphan. What does xv6's exit() do with a dying process's children? [3] (c) Why are fork and exec separate calls? [3]

```c
int main() {
    int x = 1;
    if (fork() == 0) {
        x++;
        if (fork() == 0) { x++; printf("%d\n", x); exit(0); }
        wait(NULL); printf("%d\n", x);
    } else { wait(NULL); printf("%d\n", x); }
}
```

*Solution.* (a) It prints **3, 2, 1**, always in that order. The grandchild has x = 3 and prints first. The child (x = 2) waits for the grandchild, and the parent (x = 1) waits for the child. Each process has its own copy of x.

(b) A **zombie** has exited, but its parent has not called wait() yet, so its process-table entry and exit status are kept. An **orphan** is a process whose parent exited first. xv6's exit() reparents the children to init, which waits on them, sets the process state to ZOMBIE, and wakes the parent.

(c) Between fork and exec, the shell can change the child's environment, for example `close(1); open("out.txt", ...)` for redirection, or setting up pipes. The program it then runs inherits those changes without knowing about them.

---

**P2.** Limited direct execution. (a) List the hardware and OS steps when a timer interrupt switches from process A to process B. [6] (b) Which registers are saved twice, by whom, and where? [2] (c) Why does the trap table have to be set up at boot, and why is a system-call *number* used instead of an address? [2]

*Solution.* (a)

1. **Hardware**: the timer interrupt fires. A's user registers are saved to A's kernel stack, the CPU switches to kernel mode, and it jumps to the trap handler.
2. **OS**: the handler decides to switch and calls `switch()`, which saves A's kernel registers into A's proc structure.
3. **OS**: it restores B's kernel registers from B's proc structure and switches to B's kernel stack.
4. **OS**: return-from-trap.
5. **Hardware**: restores B's user registers from B's kernel stack, switches to user mode, and jumps to B's PC.

(b) The **user registers** are saved by the hardware onto the kernel stack (in xv6, the trapframe). The **kernel registers** are saved by the OS in `swtch()` into the proc structure (`struct context`: ra, sp and s0–s11).

(c) The trap table is installed in kernel mode at boot, using a privileged instruction, so user code cannot redirect traps. User code passes a number, and the kernel validates it and looks up the handler. That way user code can never jump to an arbitrary kernel address.

---

**P3.** Jobs: A arrives at 0 and needs 6; B arrives at 2 and needs 3; C at 4 needs 8; D at 6 needs 2. Find the average turnaround and response times for FIFO, SJF (non-preemptive), STCF and RR (q = 2; a new arrival joins the queue before the job that was just preempted). [10]

*Solution.*

| Policy | Schedule | Completion A, B, C, D | Avg turnaround | Avg response |
| --- | --- | --- | --- | --- |
| FIFO | A 0–6, B 6–9, C 9–17, D 17–19 | 6, 9, 17, 19 | (6+7+13+13)/4 = **9.75** | (0+4+5+11)/4 = **5** |
| SJF | A 0–6, D 6–8, B 8–11, C 11–19 | 6, 11, 19, 8 | (6+9+15+2)/4 = **8** | (0+6+7+0)/4 = **3.25** |
| STCF | A 0–2, B 2–5, A 5–6, D 6–8, A 8–11, C 11–19 | 11, 5, 19, 8 | (11+3+15+2)/4 = **7.75** | (0+0+7+0)/4 = **1.75** |
| RR | A 0–2, B 2–4, A 4–6, C 6–8, B 8–9, D 9–11, A 11–13, C 13–19 | 13, 9, 19, 11 | (13+7+15+5)/4 = **10** | (0+0+2+3)/4 = **1.25** |

STCF is best for turnaround and RR is best for response. Turnaround = completion − arrival, and response = first run − arrival.

---

**P4.** MLFQ with three queues: Q2 (top, quantum 10 ms), Q1 (20 ms) and Q0 (round robin), with no boost. A is CPU-bound and needs 100 ms, arriving at 0. B needs 20 ms and arrives at 30. (a) Trace the schedule and give both turnaround times. [4] (b) Show how a job can game Rules 4a/4b, and give the fix. [3] (c) Why is a priority boost needed, and what goes wrong if it is too frequent? [3]

*Solution.* (a) A runs 0–10 in Q2 and moves down to Q1. It runs 10–30 in Q1 and moves to Q0. B arrives at 30 in Q2 and runs 30–40, then moves to Q1. B runs 40–50 in Q1 and finishes. A resumes at 50 with 70 ms left and finishes at 120. **Turnaround: B = 20 and A = 120.** MLFQ approximates SJF without knowing job lengths.

(b) Under the old rule, a job that gives up the CPU before its slice ends keeps its priority. A job can issue a pointless I/O at 9.9 ms of every 10 ms slice and stay at the top forever. Fix (the new Rule 4): count the **total allotment** used at a level, whatever the I/O pattern, and demote the job once it is used up.

(c) Without a boost, a stream of interactive jobs can **starve** long jobs, and a job that becomes interactive stays stuck low. Rule 5 moves every job to the top every S ms. If S is too small, CPU-bound jobs keep returning to the top and interactive jobs lose their advantage. If S is too large, long jobs starve. The value of S is a tuning choice (Ousterhout's "voo-doo constant").

---

**P5.** CFS with sched_latency = 48 ms and min_granularity = 6 ms. A and B have nice 0 (weight 1024), and C has nice −5 (weight 3121). (a) Give each process's time slice. [4] (b) Show how much each one's vruntime grows over one period. [3] (c) With 12 processes at nice 0, what slice does each get? [2] (d) Where does CFS put a process waking from a long sleep? [1]

*Solution.* (a) The total weight is 1024 + 1024 + 3121 = 5169. A and B each get 48 × 1024 / 5169 = **9.51 ms**, and C gets 48 × 3121 / 5169 = **28.98 ms**.

$$\text{slice}_k = \frac{w_k}{\sum w}\cdot\text{sched\_latency}, \qquad \text{vruntime}_k \mathrel{+}= \frac{1024}{w_k}\cdot\text{runtime}_k$$

(b) A and B gain 9.51 × 1024/1024 = 9.51. C gains 28.98 × 1024/3121 = **9.51** too. vruntime advances equally, which is why weighted fairness works.

(c) 48 / 12 = 4 ms, which is below min_granularity, so each gets **6 ms** (one round takes 72 ms).

(d) CFS sets its vruntime to the **minimum vruntime** in the red-black tree. Otherwise its tiny vruntime would let it monopolise the CPU while it catches up.

---

**P6.** Multiprocessor scheduling. (a) What is cache affinity, and how does single-queue scheduling (SQMS) hurt it? [3] (b) Give two scalability problems with SQMS. [2] (c) Under MQMS, A is alone on CPU 0, while B and D share CPU 1. What is the problem, and how is it fixed? [3] (d) Why is cache coherence needed, and how does bus snooping provide it? [2]

*Solution.* (a) A process that runs on the same CPU again finds its data still in that CPU's cache, which makes it faster. SQMS gives each CPU whatever job is next in one global queue, so jobs bounce between CPUs and keep finding cold caches.

(b) The single queue needs a **lock**, which becomes contended as the number of CPUs grows. There is also the affinity problem from (a), and extra mechanisms to fix it make SQMS more complex.

(c) **Load imbalance**: A gets 100% of a CPU while B and D get 50% each. Fix it with **migration**, for example **work stealing**: a lightly loaded queue occasionally checks another queue and takes a job. Checking too often costs overhead, and too rarely leaves the imbalance.

(d) Each CPU caches memory, so a write on one CPU can leave stale copies in the others. With **bus snooping**, every cache watches the shared bus and invalidates (or updates) its copy when it sees a write to that address.

---

**P7.** Network layers and devices. (a) Name the TCP/IP layers, the data unit at each, and the address each uses. [4] (b) Which header does a hub, a switch and a router each look at? [3] (c) A host sends a 1000-byte HTTP message over TCP/IP and Ethernet. Show the encapsulation, assuming 20-byte TCP and IP headers and an 18-byte Ethernet header and trailer. [3]

*Solution.* (a) **Application**: message, with hostnames and ports used by the app. **Transport**: segment (TCP) or datagram (UDP), with port numbers. **Network**: packet (datagram), with IP addresses. **Link**: frame, with MAC addresses. The physical layer below carries bits.

(b) A **hub** works at layer 1 and reads no header: it repeats bits to every port. A **switch** works at layer 2: it reads the **MAC** address and forwards only to the right port, learning which port leads to which MAC. A **router** works at layer 3: it reads the **IP** address and forwards between networks using its routing table.

(c) 1000 B of data, plus the TCP header = a 1020 B segment, plus the IP header = a 1040 B packet, plus the Ethernet header and trailer = a **1058 B frame**. Each layer treats everything above it as data.

---

**P8.** TCP. The client ISN is 1000 and the server ISN is 5000. (a) Give the seq and ack numbers of the three-way handshake. [3] (b) The client then sends 3 segments of 100 bytes. Give their seq numbers. The second segment is lost. What ACKs does the server send, and when does fast retransmit fire? [4] (c) Describe the 4-way close, and explain why TIME_WAIT exists. [3]

*Solution.* (a) SYN: seq = 1000. SYN-ACK: seq = 5000, ack = 1001. ACK: seq = 1001, ack = 5001. (A SYN uses up one sequence number.)

(b) The segments have seq = 1001, 1101 and 1201. The server ACKs 1101 after the first. The second is lost. When the third arrives, the ACK is still **1101** (a duplicate), because ACKs are **cumulative**. Fast retransmit fires after **three duplicate ACKs** for 1101, which takes three more segments arriving after the gap. The sender then resends 1101 without waiting for the timeout.

(c) The client sends FIN, and the server ACKs. Later the server sends its own FIN, and the client ACKs. The client then stays in **TIME_WAIT** (twice the maximum segment lifetime), so it can resend the last ACK if that is lost, and so delayed old segments cannot be mistaken for part of a new connection on the same ports.

---

**P9.** (a) EstimatedRTT = 80 ms and DevRTT = 8 ms. A SampleRTT of 120 ms arrives. Find the new EstimatedRTT, DevRTT and TimeoutInterval, with α = 0.125 and β = 0.25. [4] (b) ssthresh = 8 and cwnd starts at 1. List cwnd for rounds 1 to 8. Three duplicate ACKs arrive at the end of round 8. Give rounds 9 to 11. Then there is a timeout at the end of round 11. Give rounds 12 to 15. [6]

*Solution.* (a) EstimatedRTT = 0.875 × 80 + 0.125 × 120 = **85**. DevRTT = 0.75 × 8 + 0.25 × |120 − 85| = 6 + 8.75 = **14.75** (K&R order: update the estimate first). Timeout = 85 + 4 × 14.75 = **144 ms**.

(b)

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cwnd | 1 | 2 | 4 | 8 | 9 | 10 | 11 | 12 | 6 | 7 | 8 | 1 | 2 | 4 | 5 |

Slow start runs until round 4, when cwnd reaches ssthresh = 8. Congestion avoidance then adds 1 per round. After the 3 duplicate ACKs, ssthresh = 12 / 2 = 6 and cwnd = 6 (fast recovery, Reno). After the timeout, ssthresh = 8 / 2 = 4 and cwnd = 1, so slow start runs again (1, 2, 4) and then grows linearly from 4.

---

**P10.** (a) Compute the UDP checksum of the 16-bit words 0x1234, 0xF00F and 0x0F0F. [4] (b) List the socket calls for a TCP server and a TCP client, and say which ones block. [4] (c) Why does accept() return a new socket? [2]

*Solution.* (a) 0x1234 + 0xF00F = 0x10243. Wrap the carry around: 0x0243 + 1 = 0x0244. Then 0x0244 + 0x0F0F = 0x1153. The checksum is the ones' complement: **0xEEAC**. Check: 0x1153 + 0xEEAC = 0xFFFF.

(b) **Server**: socket, bind, listen, accept (**blocks** until a client connects), recv (**blocks** until data arrives), send, close. **Client**: socket, connect (**blocks** for the handshake), send, recv (**blocks**), close. UDP has no listen, accept or connect: it uses sendto and recvfrom, and recvfrom blocks. A blocking call puts the process to sleep, so it is a context-switch point.

(c) The listening socket keeps accepting new connections. Each accepted connection gets its own socket, identified by the 4-tuple (source IP, source port, destination IP, destination port). That is how one server on port 80 serves many clients at once.
