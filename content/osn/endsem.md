# Endsem practice: the professor's sheet

*Endsem: 24 Nov 2026, 9 AM. 9 questions × 10 marks. These are the 20 problems from the professor's post-midsem practice sheet (CS3.301_Questions.pdf), rewritten as 10-mark questions. Every solution below is written the way you should write it in the exam: state the rule, show the working, box the answer, then add the one-line reason. Marks in brackets are a guess at how 10 marks split.*

**How the sheet was made.** It has two questions per OSTEP chapter: 15, 16, 17, 18, 19, 20, 28, 30, 31 and 40. Most numbers come from the worked examples on the L11 to L19 slides, sometimes with small changes. Each question asks you to (a) calculate or trace, (b) say who does it and why, and (c) give the trade-off or the fix. The midsem reused sheet problems, so learn each **method**; if the numbers change, the method still works.

**How to write a 10-mark answer.** (1) Write the rule or formula first, one line. (2) Show each step, in a table if there are several addresses. (3) End each part with a clear answer. (4) For "why" parts, give the **mechanism** in one sentence and the **consequence** in another. Examiners give most marks for the method, so never write only a final number.

## Address translation and segmentation

**E1 (sheet Q1).** A process has a 16 KB address space, loaded with base = 32 KB and bounds = 16 KB (bounds holds the size). (a) Translate 0, 1024, 3000, 4400, 16384 and 18000, or say which fault. [5] (b) Who sets base and bounds, when, and why must those instructions be privileged? [3] (c) Why does base and bounds waste memory? [2]

*Solution.*

**(a) Rule.** The hardware (MMU) first checks the **bounds**, then adds the **base**:

$$
0 \le VA < \text{bounds} \;\Rightarrow\; PA = VA + \text{base}; \quad \text{otherwise raise an exception (fault)}
$$

Here base = 32 KB = 32768 and bounds = 16 KB = 16384. Legal virtual addresses are 0 to 16383.

| VA | Bounds check (VA < 16384?) | Working | Result |
| --- | --- | --- | --- |
| 0 | yes | 0 + 32768 | **32768** |
| 1024 | yes | 1024 + 32768 | **33792** |
| 3000 | yes | 3000 + 32768 | **35768** |
| 4400 | yes | 4400 + 32768 | **37168** |
| 16384 | **no** (VA = bounds) | the last legal address is 16383 | **Fault** |
| 18000 | **no** (18000 > 16383) | | **Fault** |

*Watch out:* with the textbook's 4 KB address space, 4400 would fault. Here the space is 16 KB, so it is valid. Always compare with *this* question's bounds. Also, the check is `VA < bounds`, **not** `VA <= bounds`.

**(b)** The **OS**, running in **kernel mode**, sets the registers. It does so **when it creates the process** (loads the base chosen from the free list and the bounds from the address-space size) and **on every context switch**, where it saves the old process's values in its PCB and restores the new process's. The instructions must be **privileged** because, if a user program could write base or bounds, it could set them to cover another process's memory or the kernel, which destroys **protection and isolation**. A user attempt to execute them traps to the OS.

**(c)** The whole address space (16 KB) is placed in one contiguous slot, including the large **unused gap between the heap and the stack**. That reserved but unused space inside the process's slot is **internal fragmentation**. A process with a small heap and a small stack still occupies its full slot. This motivates segmentation (a base and bounds pair per segment) and later paging.

---

**E2 (sheet Q2).** The OS moves a descheduled process's address space to another region of physical memory. List the steps, and explain why the process never notices. [10]

*Solution.*

**Steps** (the process is not running, so its memory is quiet):

1. **Deschedule** the process (it is already in the ready or blocked state).
2. **Choose a new region** from the **free list** that is big enough for the whole address space.
3. **Copy** the address space (code, heap, stack) from the old region to the new one.
4. **Update the saved base** in the process's **PCB** to the new region's start address. The bounds are unchanged because the size is unchanged.
5. **Return the old region** to the free list.
6. When the process is next scheduled, the OS **loads the new base** into the MMU's base register as part of the context switch.

**Why the process never notices.** The process only ever generates **virtual addresses** that start at 0. The hardware adds the base **on every access**, so the process's addresses, pointers and bounds are unchanged; only the hidden VA-to-PA mapping moved. This is exactly why **dynamic relocation** (base and bounds) can move a process after it has started, whereas **static (software) relocation**, where a loader rewrites addresses once, cannot: the program would then hold stale physical addresses. The cost is that the copy takes time proportional to the size of the address space.

---

**E3 (sheet Q3).** 16-bit VAs: the top 2 bits pick the segment and the low 14 bits are the offset (max segment size 16 KB). The stack grows downward.

| Segment | Bits | Base | Size | Grows positive? |
| --- | --- | --- | --- | --- |
| Code | 00 | 32 KB | 2 KB | Yes |
| Heap | 01 | 34 KB | 3 KB | Yes |
| Stack | 11 | 28 KB | 2 KB | No |
| unused | 10 | – | – | – |

(a) Translate 0x0100, 0x4200, 0x4C00, 0xFC00, 0xF000 and 0x8000. [7] (b) How does the hardware compute a stack address? [3]

*Solution.*

**(a) Method.** Write the VA in binary: the top 2 bits give the segment, the low 14 bits give the offset. Then, for a forward-growing segment, check offset < size and compute PA = base + offset. For the stack (grows backwards): **negative offset = offset − 16384** (the maximum segment size), check that its magnitude is at most the size, then PA = base + negative offset.

Base values in bytes: code 32768, heap 34816, stack 28672. Sizes: code 2048, heap 3072, stack 2048.

| VA | Segment (top 2 bits) | Offset (low 14 bits) | Check | PA |
| --- | --- | --- | --- | --- |
| 0x0100 | 00 = code | 0x0100 = 256 | 256 < 2048, ok | 32768 + 256 = **33024** |
| 0x4200 | 01 = heap | 0x0200 = 512 | 512 < 3072, ok | 34816 + 512 = **35328** |
| 0x4C00 | 01 = heap | 0x0C00 = 3072 | 3072 < 3072? **no** | **Fault** |
| 0xFC00 | 11 = stack | 0x3C00 = 15360 | 15360 − 16384 = −1024, and 1024 ≤ 2048, ok | 28672 − 1024 = **27648** |
| 0xF000 | 11 = stack | 0x3000 = 12288 | 12288 − 16384 = −4096, and 4096 > 2048 | **Fault** |
| 0x8000 | 10 = unused | 0 | segment 10 is not mapped | **Fault** |

*Watch out:* 0x4C00 is exactly one byte past the end of the heap (size 3072 means valid offsets 0 to 3071). 0xFC00 is the standard stack example: the offset must be converted to a **negative** one before adding to the base.

**(b)** A stack segment grows toward lower addresses, so offsets are measured **backwards from the top** of the virtual segment. The hardware knows the direction from a **"grows positive" bit** in the segment register. Steps: (1) extract the segment bits and the offset; (2) subtract the maximum segment size (16 KB) from the offset to get a **negative offset**; (3) check that the magnitude of the negative offset does not exceed the segment size; (4) add the (negative) offset to the base: **PA = base + (offset − 16 KB)**. Example: offset 15360 gives −1024, and 28 KB − 1 KB = 27 KB = 27648.

---

**E4 (sheet Q4).** (a) Explain external fragmentation with a small example, and why compaction is expensive. [6] (b) How can several processes share a code segment safely? [4]

*Solution.*

**(a) External fragmentation** is free memory that is split into **small holes between allocated segments**, so that a request fails even though the *total* free space is large enough. Segments have different sizes, so allocating and freeing them leaves holes of different sizes.

*Example:* three 4 KB segments A, B and C sit one after another (12 KB). A and C exit, leaving two 4 KB holes with B between them. Total free memory = 8 KB, but a new **6 KB** segment **cannot be placed**, because neither hole is big enough.

**Compaction** rearranges segments to make one large hole. It is **expensive** because the OS must: (1) **stop** the affected processes; (2) **copy** every moved segment (memory-intensive, so cost proportional to the amount of memory moved); (3) **update** the base registers in each PCB. All of that is done while the processes are paused. A growing segment can also make the work wasted soon after.

**(b) Sharing** works through **protection bits** kept for each segment. The code segment is marked **read-execute only**. Several processes then **map the same physical code segment** (each process's segment table points to the same physical base), and each keeps its own private data, heap and stack segments. Because the segment is read-only, no process can corrupt it, and the hardware checks the protection bits on every access (a write attempt traps). This saves physical memory: one copy of the code serves all processes.

## Free-space management

**E5 (sheet Q5).** The free list holds chunks of 10, 30, 20 and 15 bytes, in that order. Requests arrive for 12, 18 and 9 bytes. Ignore headers; a chunk is split and the remainder stays in place. (a) Show the list after each request under first fit, best fit and worst fit. [7] (b) A request for 25 then arrives. Which policies succeed, and what does that suggest? [3]

*Solution.*

**(a) Rules.** **First fit**: the first chunk that is big enough. **Best fit**: the *smallest* chunk that is big enough. **Worst fit**: the *largest* chunk. After the choice, the chunk shrinks by the request size and stays where it is.

*First fit* (list 10, 30, 20, 15):
- 12 → first chunk ≥ 12 is 30 → list **10, 18, 20, 15**
- 18 → first chunk ≥ 18 is 18 (the second one) → list **10, 20, 15** (that chunk is used up)
- 9 → first chunk ≥ 9 is 10 → list **1, 20, 15**

*Best fit* (list 10, 30, 20, 15):
- 12 → chunks ≥ 12 are 30, 20, 15; the smallest is 15 → list **10, 30, 20, 3**
- 18 → chunks ≥ 18 are 30, 20; the smallest is 20 → list **10, 30, 2, 3**
- 9 → chunks ≥ 9 are 10, 30; the smallest is 10 → list **1, 30, 2, 3**

*Worst fit* (list 10, 30, 20, 15):
- 12 → largest is 30 → list **10, 18, 20, 15**
- 18 → largest is 20 → list **10, 18, 2, 15**
- 9 → largest is 18 (list is 10, 18, 2, 15) → list **10, 9, 2, 15**

| Policy | After 12 | After 18 | After 9 |
| --- | --- | --- | --- |
| First fit | 10, 18, 20, 15 | 10, 20, 15 | 1, 20, 15 |
| Best fit | 10, 30, 20, 3 | 10, 30, 2, 3 | 1, 30, 2, 3 |
| Worst fit | 10, 18, 20, 15 | 10, 18, 2, 15 | 10, 9, 2, 15 |

**(b)** A request for 25 bytes: the largest chunk in each final list is 20 (first fit), **30 (best fit)**, 15 (worst fit). So only **best fit succeeds**. *What it suggests:* **no policy is best for every request sequence**. Best fit preserved a large chunk here by using small chunks for small requests, but it leaves tiny **splinters** (1, 2 and 3 bytes) that are useless, and each request needs a full list search. Worst fit tries to leave big remainders but here chopped up the largest chunks. First fit is fast but fragments the front of the list.

---

**E6 (sheet Q6).** A binary buddy allocator manages a 64 KB heap starting at 0. Requests arrive in order: A = 7 KB, B = 3 KB, C = 20 KB. (a) Which block does each get, and which splits are needed? [5] (b) What is the total internal fragmentation? [2] (c) A is freed, then B. Describe the coalescing. [3]

*Solution.*

**(a) Method.** Round each request up to the next power of two. To satisfy it, split a free block in half repeatedly until a block of that size exists. The two halves of a split are **buddies**.

- **A = 7 KB → 8 KB block.** Split 64 → 32 + 32; split the first 32 → 16 + 16; split the first 16 → 8 + 8. **A = [0, 8 KB).**
- **B = 3 KB → 4 KB block.** Take the free 8 KB at [8, 16) and split it → 4 + 4. **B = [8, 12 KB).**
- **C = 20 KB → 32 KB block.** The free 32 KB block at [32, 64) fits exactly, no split needed. **C = [32, 64 KB).**

The free blocks now are [12, 16) (4 KB) and [16, 32) (16 KB).

**(b) Internal fragmentation** = block size − request size: A: 8 − 7 = 1 KB; B: 4 − 3 = 1 KB; C: 32 − 20 = 12 KB. Total = **14 KB**.

**(c) Coalescing rule:** when a block is freed, check its **buddy** (the other half of the block it was split from). If the buddy is **completely free**, merge the two into the next size up, and repeat upward.

- **Free A [0, 8):** its buddy is [8, 16), which is **not free as a whole** (it was split, and B holds [8, 12)). So **no merge**; [0, 8) just becomes a free 8 KB block.
- **Free B [8, 12):** its buddy is [12, 16), which is free → merge into [8, 16) (8 KB). Now [8, 16)'s buddy is [0, 8), which is free → merge into [0, 16) (16 KB). Now [0, 16)'s buddy is [16, 32), which is free → merge into [0, 32) (32 KB). Now [0, 32)'s buddy is [32, 64), which holds C → **stop**.

Final free list: one 32 KB block at [0, 32). Address check: a block's buddy address = block address XOR block size.

## Paging and TLBs

**E7 (sheet Q7).** 32-bit VAs, 4 KB pages, 4-byte PTEs and a linear page table. (a) VPN and offset bits? [2] (b) Table size per process, and for 100 processes? [3] (c) VA 0x00403A2C maps to a page whose PTE holds PFN 0x01F2. What is the PA? [3] (d) Without a TLB, how many memory references does one load need? [2]

*Solution.*

**(a)** Page size 4 KB = 2^12, so the **offset = 12 bits**. **VPN = 32 − 12 = 20 bits**.

**(b)** A linear table has one entry per virtual page: 2^20 entries × 4 bytes = 2^22 bytes = **4 MB per process**. For 100 processes: 100 × 4 MB = **400 MB**, just for page tables. This is why linear page tables are too big (next topic: multi-level tables).

**(c)** Split the address 0x00403A2C: the low 12 bits (3 hex digits) are the offset: **offset = 0xA2C**. The rest is the VPN: 0x00403 (VPN = 0x403). The PTE for this VPN gives PFN = 0x01F2. The offset is not translated:

$$
PA = (\text{PFN} \ll 12) \mid \text{offset} = 0x01F2 \cdot 0x1000 + 0xA2C = \textbf{0x01F2A2C}
$$

(PFN digits followed by the 3 offset digits.)

**(d)** **2 memory references**: one to read the **PTE** from the page table in memory, and one to access the **data** itself. (With a TLB hit, only 1.)

---

**E8 (sheet Q8).** What happens, and who handles it? (a) A load to a page with valid = 0. (b) valid = 1, present = 0. (c) A store to a read-only page. (d) How are the dirty and reference bits used in eviction? [10]

*Solution.*

**(a) valid = 0.** The page is **not part of the process's address space** (never allocated). The **hardware** (MMU) raises an exception and traps to the **OS**, which treats it as an **illegal memory access** and normally **kills the process** (segmentation fault).

**(b) valid = 1, present = 0.** The page is in the address space but is **swapped out to disk**, so the access causes a **page fault**, handled by the **OS page-fault handler** (not the hardware). Steps: (1) the PTE holds the page's **disk address**; (2) the OS finds a free frame (if memory is full, it picks a victim page by the replacement policy and writes it back if dirty); (3) it issues a **disk read** and **blocks** the process (another process runs meanwhile); (4) on completion it updates the PTE (**present = 1**, new PFN); (5) it **retries the faulting instruction**, which now succeeds (after a TLB refill).

**(c) Store to a read-only page** (protection bit does not allow writes). The hardware detects the violation and raises a **protection fault** that traps to the **OS**. Normally the OS **terminates the process**. (If the page was deliberately marked read-only for **copy-on-write**, as in your MP2 xv6 fork, the OS handler instead allocates a new frame, copies the page, maps it writable and retries.)

**(d) Dirty bit.** Set by the hardware when the page is **written**. When choosing a victim, a **clean** page can simply be discarded (its copy on disk is up to date), but a **dirty** page must first be **written back** to disk, which costs an extra I/O. So the OS **prefers to evict clean pages**. **Reference (use) bit.** Set by the hardware whenever the page is **accessed**. The OS uses it to **approximate LRU**: in the **clock algorithm** the hand sweeps over the pages; a page with use = 1 is given a second chance (the bit is cleared), and the first page found with use = 0 is evicted.

---

**E9 (sheet Q9).** An array of ten 4-byte ints a[0..9] starts at VA 100. Pages are 16 bytes, and the TLB starts empty. (a) Which pages hold the array? Mark each access as a hit or miss, and give the hit rate. [5] (b) The loop runs again right away. What is the hit rate, and which locality explains it? [2] (c) What would the first-loop hit rate be with 4 KB pages? [3]

*Solution.*

**(a)** Page size 16 bytes, so VPN = VA / 16. The array occupies bytes 100 to 139 (a[i] is at 100 + 4i).

| Element | VA | VPN (VA ÷ 16) | TLB result |
| --- | --- | --- | --- |
| a[0] | 100 | 6 (bytes 96–111) | **Miss** (first touch of page 6) |
| a[1] | 104 | 6 | Hit |
| a[2] | 108 | 6 | Hit |
| a[3] | 112 | 7 (bytes 112–127) | **Miss** |
| a[4] | 116 | 7 | Hit |
| a[5] | 120 | 7 | Hit |
| a[6] | 124 | 7 | Hit |
| a[7] | 128 | 8 (bytes 128–143) | **Miss** |
| a[8] | 132 | 8 | Hit |
| a[9] | 136 | 8 | Hit |

The array spans **virtual pages 6, 7 and 8**. Pattern: M H H M H H H M H H. **3 misses, 7 hits**, so the hit rate = 7 / 10 = **70%**. The misses are compulsory (cold) misses, one per new page.

**(b)** On the second run all three translations (VPN 6, 7 and 8) are already in the TLB, so every access hits: **hit rate = 100%**. This is **temporal locality**: the same pages are re-referenced soon after.

**(c)** With 4 KB pages, bytes 100 to 139 all lie in **page 0**, so the first access misses and the other nine hit: hit rate = **90%**. The page size exploits **spatial locality**: neighbouring addresses lie on the same page, so a larger page means more neighbours per TLB entry and fewer misses.

---

**E10 (sheet Q10).** A TLB lookup takes 1 ns and a memory access 100 ns. On a miss, the hardware reads one PTE from memory. (a) Find the effective access time for hit rates of 98% and 90%. [5] (b) P1 and P2 both use VPN 10, mapped to different frames. What problem does this cause on a context switch? Give two fixes and their trade-offs. [5]

*Solution.*

**(a) Cases.** A **hit** costs one TLB lookup plus one memory access (the data): 1 + 100 = **101 ns**. A **miss** costs the lookup, one memory access for the PTE, then the data access: 1 + 100 + 100 = **201 ns**.

$$
EAT = h(t + m) + (1-h)(t + 2m)
$$

- h = 0.98: EAT = 0.98 × 101 + 0.02 × 201 = 98.98 + 4.02 = **103 ns**.
- h = 0.90: EAT = 0.90 × 101 + 0.10 × 201 = 90.9 + 20.1 = **111 ns**.

A drop of 8 points in hit rate costs about 8 ns (8%) per access.

**(b) The problem.** The TLB holds **VPN → PFN** translations but does not know which process they belong to. After a context switch from P1 to P2, the entry "VPN 10 → P1's frame" is still in the TLB. If P2 accesses VPN 10, it **hits the stale entry and reads P1's memory**: wrong data and a protection violation.

**Fix 1: flush the TLB** (invalidate all entries) on every context switch. *Trade-off:* simple and needs no extra hardware, but the next process starts with an **empty (cold) TLB**, so every switch is followed by a burst of misses, which hurts performance if switches are frequent.

**Fix 2: ASIDs (address-space identifiers).** Add an ASID field (like a PID) to each TLB entry, and the hardware matches both the VPN **and** the current process's ASID. *Trade-off:* entries from several processes can coexist, so **no flush** and warm TLBs after a switch. But it needs **extra hardware bits** in every TLB entry, and the OS must manage ASID allocation (and recycle them). It also lets two processes share a physical page through two entries with different ASIDs.

## Multi-level page tables

**E11 (sheet Q11).** A 16 KB address space (14-bit VAs), 64-byte pages and 4-byte PTEs. The process uses only VPNs 0, 1 (code), 4, 5 (heap), 254 and 255 (stack). (a) VPN and offset bits? How large would a linear table be? [2] (b) With one page of PTEs per directory entry, how many bits index the directory and how many index a page of the table? [2] (c) How many pages does the two-level table need? [2] (d) Split 0x3F80 into directory index, table index and offset. Its PTE holds PFN 55. What is the PA? [4]

*Solution.*

**(a)** 64-byte pages = 2^6, so **offset = 6 bits**; **VPN = 14 − 6 = 8 bits** (256 virtual pages). A linear table: 256 entries × 4 B = **1024 B = 1 KB = 16 pages** (1024 / 64).

**(b)** One page holds 64 / 4 = **16 PTEs**, so a page of the table is indexed by **4 bits** (2^4 = 16). The directory needs one entry per page of the table: 256 PTEs / 16 = 16 pages, so **4 bits** (8 − 4) index the directory. The VA splits as **| 4-bit PD index | 4-bit PT index | 6-bit offset |**.

**(c)** Needed pages: **1 page for the page directory**, plus only the table pages that contain a used VPN. VPNs 0, 1, 4 and 5 all lie in table page 0 (VPNs 0–15); VPNs 254 and 255 lie in table page 15 (VPNs 240–255). That is 2 table pages. **Total = 1 + 2 = 3 pages** (192 bytes) instead of 16 pages. The other 14 directory entries are marked invalid and cost nothing more.

**(d)** 0x3F80 in binary (14 bits): 11 1111 1000 0000 → split **1111 | 1110 | 000000**.

- PD index = 1111 = **15** → the directory entry points to table page 15.
- PT index = 1110 = **14** → entry 14 of that page, which is VPN 15 × 16 + 14 = 254.
- Offset = 000000 = **0**.

The PTE holds PFN = 55, so PA = 55 × 64 + 0 = **3520** (= **0xDC0**).

---

**E12 (sheet Q12).** 48-bit VAs, 4 KB pages, 8-byte PTEs, and every level must fit in one page. (a) How many levels are needed? [5] (b) How many memory references does a load need on a TLB miss, and what is the trade-off? [5]

*Solution.*

**(a)** Offset = 12 bits (4 KB), so VPN = 48 − 12 = **36 bits**. One page holds 4096 / 8 = **512 PTEs = 2^9**, so each level can index **9 bits**. Levels needed = ⌈36 / 9⌉ = **4 levels** (9 + 9 + 9 + 9 = 36).

$$
\text{levels} = \left\lceil \frac{\text{VPN bits}}{\log_2(\text{page size} / \text{PTE size})} \right\rceil = \left\lceil \frac{36}{9} \right\rceil = 4
$$

**(b)** On a TLB miss the hardware reads **one entry per level** (4 memory references to walk the table) and then the data itself: **4 + 1 = 5 memory references**. (On a TLB hit: 1.)

**Trade-off:** multi-level tables trade **time for space**. *Space saved:* page-table pages are allocated only for the parts of the address space actually in use, so a sparse address space needs very little memory (unlike a linear table of 2^36 × 8 B = 512 GB). *Time and complexity cost:* a TLB miss costs several memory references instead of one extra, and the lookup logic is more complex. This is acceptable because the TLB makes misses rare.

*Variant to expect:* RISC-V **Sv39** (the xv6 system you used): 39-bit VA, 4 KB pages, 8-byte PTEs → 27-bit VPN = 3 levels × 9 bits.

## Locks

**E13 (sheet Q13).** `lock: while (m->flag == 1) ; m->flag = 1;` and `unlock: m->flag = 0;` (a) Give an interleaving with two threads in the critical section. [3] (b) Rewrite lock() with TestAndSet. [3] (c) Evaluate the spin lock for correctness, fairness and single-CPU performance. [4]

*Solution.*

**(a)** The bug is that **testing the flag and setting it are two separate steps**. Interleaving (flag = 0 initially):

| Step | T1 | T2 | flag |
| --- | --- | --- | --- |
| 1 | `while (flag == 1)`: sees 0, exits the loop | | 0 |
| 2 | *timer interrupt: switch to T2* | | 0 |
| 3 | | `while (flag == 1)`: sees 0, exits | 0 |
| 4 | | `flag = 1`; **enters the critical section** | 1 |
| 5 | *switch back to T1* | | 1 |
| 6 | `flag = 1`; **enters the critical section** | | 1 |

**Both threads are now in the critical section**: mutual exclusion is violated.

**(b)** `TestAndSet(ptr, new)` atomically returns the **old** value and stores the **new** one, so the test and the set cannot be separated:

```c
void lock(lock_t *m) {
    while (TestAndSet(&m->flag, 1) == 1)
        ;   // spin: old value 1 means someone else holds the lock
}
void unlock(lock_t *m) { m->flag = 0; }
```

If the old value was 0, the lock was free and this thread has just taken it (it left flag = 1); only one thread can ever see the old value 0.

**(c)** **Correctness: yes.** The atomic test-and-set guarantees mutual exclusion. **Fairness: no.** There is no queue and no ordering, so a thread can spin forever while others keep winning (starvation). **Performance on a single CPU: very poor.** If the lock holder is preempted inside the critical section, every other thread runs and **spins for its whole time slice** without being able to get the lock (the holder cannot release it until it runs again). With N threads, up to N − 1 slices are wasted. (On several CPUs, spinning is reasonable when critical sections are short, because the holder runs on another CPU.)

---

**E14 (sheet Q14).** A ticket lock: `myturn = FetchAndAdd(&ticket); while (turn != myturn) ;` and `unlock: turn++`, with ticket = turn = 0. (a) T1, T2 and T3 call lock in that order. Give each myturn and the order they enter. [3] (b) T1 calls unlock twice by mistake. What happens? [4] (c) Why is this fair when test-and-set is not? [3]

*Solution.*

**(a)** `FetchAndAdd` returns the old value of ticket and increments it atomically: **T1: myturn = 0** (ticket becomes 1), **T2: myturn = 1** (ticket becomes 2), **T3: myturn = 2** (ticket becomes 3). turn = 0, so only T1 passes the `while`. **Entry order: T1, T2, T3.** (T1's unlock makes turn = 1, letting T2 in; T2's unlock lets T3 in.)

**(b)** Double unlock by T1:

- First `unlock`: turn = 1, so **T2** enters (correct).
- Second `unlock` (by T1, mistaken): turn = 2, so **T3** now sees turn == myturn and **enters while T2 is still inside**. Two threads are in the critical section: **mutual exclusion is broken**.
- Worse, turn is now permanently one ahead of the "correct" count, so later threads keep overlapping. The ticket lock relies on **exactly one unlock per lock**; an extra unlock destroys its invariant.

**(c)** In a ticket lock each thread takes a **ticket number** and is served in **ticket order (FIFO)**: a thread that asked earlier always goes before one that asked later, so every thread gets in after a bounded number of others (**bounded waiting, no starvation**). With a test-and-set spin lock, when the lock is released **whichever thread happens to be running and executes its TestAndSet first wins**, so an unlucky thread can lose every time (starvation).

## Condition variables

**E15 (sheet Q15).** Two broken joins. Version 1 (no state variable): exit = lock, signal, unlock; join = lock, wait, unlock. Version 2 (no lock): exit = `done = 1; signal`; join = `if (done == 0) wait`. (a) and (b) Give an interleaving in which each version makes the parent wait forever. [3 + 3] (c) Write the correct version. [4]

*Solution.*

**(a) Version 1 (no state variable).**

| Step | Parent | Child |
| --- | --- | --- |
| 1 | creates the child | |
| 2 | | runs first: `thr_exit()`: lock, `signal(&c)`, unlock |
| 3 | `thr_join()`: lock, `wait(&c)` | |

The child's **signal found nobody waiting and was lost** (a condition variable has no memory). The parent then waits **forever** for a signal that will never come. A state variable (`done`) is needed so the parent can see that the child has already finished.

**(b) Version 2 (no lock).**

| Step | Parent | Child |
| --- | --- | --- |
| 1 | `thr_join()`: checks `done == 0`, true | |
| 2 | *interrupt before it calls wait* | |
| 3 | | `thr_exit()`: `done = 1; signal(&c)` (nobody is waiting yet: lost) |
| 4 | calls `wait(&c)` | |

The parent checked the condition, was interrupted **before it went to sleep**, and so missed the signal: it sleeps **forever**. The check and the wait must be one atomic step, which is what holding the **lock** (released atomically by `wait`) provides.

**(c) Correct version:**

```c
int done = 0;

void thr_exit() {
    lock(&m);
    done = 1;          // record the state
    signal(&c);        // wake the parent if it is waiting
    unlock(&m);
}

void thr_join() {
    lock(&m);
    while (done == 0)  // while, not if
        wait(&c, &m);  // atomically releases m and sleeps; re-acquires m on wake-up
    unlock(&m);
}
```

*Rules to state:* (1) always keep a **state variable** that records the condition; (2) **hold the lock** when calling wait and signal; (3) always test the condition in a **while** loop.

---

**E16 (sheet Q16).** allocate(n) waits on one CV while bytesLeft < n. free(n) adds n and calls signal. bytesLeft starts at 0. (a) Ta calls allocate(100) and Tb calls allocate(10), and both wait. Tc calls free(50). Show how a thread can stay asleep even though memory is available. [4] (b) Give the fix and its cost. [3] (c) Why must allocate use a while loop? [3]

*Solution.*

**(a)** Trace (one CV, one `signal`):

| Step | Action | bytesLeft | Waiting on the CV |
| --- | --- | --- | --- |
| 1 | Ta: allocate(100): 0 < 100, waits | 0 | Ta |
| 2 | Tb: allocate(10): 0 < 10, waits | 0 | Ta, Tb |
| 3 | Tc: free(50): bytesLeft = 50, **signal wakes one waiter**, suppose Ta | 50 | Tb |
| 4 | Ta rechecks: 50 < 100, **waits again** | 50 | Tb, Ta |

**Tb needs only 10 bytes and 50 are free, but Tb is never woken**, because the single signal woke the wrong thread (Ta) and was "used up". Tb stays asleep although memory is available.

**(b) Fix: `broadcast`** (wake **all** waiters) in free(). Each woken thread rechecks its own condition (Tb sees 50 ≥ 10 and proceeds; Ta sees 50 < 100 and sleeps again). This is a **covering condition**: it covers all cases where a thread might be able to proceed. **Cost:** threads that cannot proceed are also woken, recheck and go back to sleep, which wastes **context switches**, a bigger cost as the number of waiters grows.

**(c)** With **Mesa semantics** (used by pthreads and almost every real system), `signal` only makes the waiter **ready**, it does not run it immediately. Between the signal and the moment the woken thread re-acquires the lock, **another thread can run and change the state** (for example, take the memory), so the condition may no longer hold. Also, **spurious wake-ups** can happen. A `while` loop makes the thread **recheck the condition after every wake-up** and sleep again if it is false, so it only proceeds when the condition really is true. `if` would proceed on a stale assumption.

## Semaphores

**E17 (sheet Q17).** Thread A prints A1 then A2. Thread B prints B1 then B2. (a) Using semaphores, ensure A1 comes before B2 and B1 comes before A2. Give initial values. [6] (b) What goes wrong if both threads call sem_wait before sem_post? [4]

*Solution.*

**(a)** This is the **rendezvous** problem: each thread must finish its first step before the *other* thread starts its second step. Use **two semaphores, both initialised to 0** (an ordering semaphore starts at 0 because the event has not happened yet):

```c
sem_t aDone, bDone;
sem_init(&aDone, 0, 0);
sem_init(&bDone, 0, 0);

// Thread A                    // Thread B
print("A1");                   print("B1");
sem_post(&aDone);              sem_post(&bDone);   // signal: my first step is done
sem_wait(&bDone);              sem_wait(&aDone);   // wait for the other's first step
print("A2");                   print("B2");
```

*Why it works:* A2 cannot print until B has posted `bDone`, which happens after B1, so B1 < A2. Symmetrically, A1 < B2. Each thread posts **before** it waits, so neither can block forever.

**(b) Deadlock.** If both call `sem_wait` first, A waits for `bDone` (which only B's post can supply) and B waits for `aDone` (which only A's post can supply). Both are blocked in `sem_wait` and neither reaches its `sem_post`: a **circular wait**, so both sleep **forever**. The order post-then-wait is what makes the rendezvous safe.

---

**E18 (sheet Q18).** The semaphore reader-writer lock, where the first reader waits on writelock and the last reader posts it. (a) What are the initial values of lock and writelock? Why do only the first and last readers touch writelock? [4] (b) Give a scenario in which a writer waits forever. [3] (c) Suggest a fix. [3]

*Solution.*

**(a)** Both are **1**: `lock` is a binary semaphore (a mutex) that protects the shared `readers` counter, and `writelock` is a binary semaphore that gives a writer exclusive access (and that readers collectively hold). **Why only the first and last readers touch `writelock`:** many readers may read at the same time, so they need to block writers only once, as a group. The **first reader** (readers goes 0 → 1) acquires `writelock` on behalf of all readers, so any writer blocks. Readers that arrive later only increment the counter. The **last reader** to leave (readers goes 1 → 0) releases `writelock`, allowing a writer in. All the counter changes are protected by `lock`.

**(b) Writer starvation.** R1 holds the read lock (and so `writelock`). Writer W calls `acquire_write` and blocks on `writelock`. R2 arrives before R1 finishes, takes `lock`, sees readers = 2 (not the first reader), and reads. Then R3 arrives before R1 or R2 finishes, and so on. As long as there is always at least one reader inside, `readers` never reaches 0, so the last-reader release never happens and **W waits forever**.

**(c) Fix: give waiting writers priority.** Add a semaphore `turnstile` (initial value 1). A **writer** does `sem_wait(&turnstile)` before waiting on `writelock` (holding the turnstile while it waits) and `sem_post(&turnstile)` after it releases. Every **reader** does `sem_wait(&turnstile); sem_post(&turnstile);` at the start of `acquire_read`, so once a writer is waiting, **new readers queue behind it** at the turnstile. Existing readers finish, `readers` reaches 0, the writer gets `writelock`. (Trade-off: this can now starve readers if writers keep arriving; fairness needs a more careful design. Your Homework 04 is this problem.)

## File system implementation

**E19 (sheet Q19).** VSFS: 4 KB blocks and 256-byte inodes. Block 0 is the superblock, block 1 the inode bitmap, block 2 the data bitmap, and the inode table starts at block 3. (a) In which block, and at what byte address, is inode 37? [4] (b) An inode has 12 direct pointers, 1 single-indirect and 1 double-indirect pointer, and pointers are 4 bytes. What is the maximum file size? [4] (c) Why is this design a good fit for real files? [2]

*Solution.*

**(a) Formula.**

$$
\text{offset in table} = i \times \text{sizeof(inode)} \qquad \text{address} = \text{inodeStartAddr} + \text{offset}
$$

The inode table starts at block 3, so inodeStartAddr = 3 × 4096 = **12288** (12 KB).

- Offset in the table = 37 × 256 = **9472** bytes.
- Block within the table = 9472 / 4096 = 2 (remainder 1280), so it is the **third block of the table: disk block 3 + 2 = block 5**.
- **Byte address = 12288 + 9472 = 21760.** Check: block 5 starts at 5 × 4096 = 20480, and 21760 − 20480 = **1280** bytes into the block (= (37 mod 16) × 256, since 16 inodes fit per block).
- (Sector = 21760 / 512 = 42, and the inode starts in the middle of that sector.)

**(b)** A 4 KB block holds 4096 / 4 = **1024 pointers**. Reachable data blocks:

- 12 direct pointers → 12 blocks = 48 KB
- 1 single-indirect → 1024 blocks = 4 MB
- 1 double-indirect → 1024 × 1024 = 1,048,576 blocks = 4 GB

$$
\text{max size} = (12 + 1024 + 1024^2) \times 4\text{ KB} = 1{,}048{,}612 \times 4096 = \textbf{4{,}299{,}210{,}752 bytes} \approx 4\text{ GB}
$$

**(c)** **Most files are small** (the file-size distribution is heavily skewed to small files), so the 12 direct pointers cover them with **no extra disk reads** and small inodes. The **few very large files** are reachable through indirect blocks, paying one or two extra reads. So the design is **space-efficient and fast for the common case** while still supporting huge files. This unbalanced tree is intentional.

---

**E20 (sheet Q20).** Nothing is cached, and each directory fits in one block. List the disk I/Os for (a) `open("/foo/bar", O_RDONLY)` [3], (b) the first 4 KB `read()` [3], and (c) creating `/foo/bar` [4].

*Solution.*

**(a) open("/foo/bar"): 5 reads.** Path traversal starts at the **root inode**, whose location is known (inode 2 in vsfs). For each directory in the path, read its inode, then its data block (to find the next name). Finally read the target's inode.

1. Read the **root inode**.
2. Read the **root directory's data block** (find "foo" → its inode number).
3. Read **foo's inode**.
4. Read **foo's data block** (find "bar" → its inode number).
5. Read **bar's inode** (check permissions, allocate the file-table entry).

General rule: **2 × (depth) + 1 reads** for a path of depth (number of directories) 2 → 5. No writes. The cost grows with the length of the pathname.

**(b) First read() of 4 KB: 2 reads + 1 write = 3 I/Os.**

1. **Read bar's inode** (find the first data block's pointer).
2. **Read the data block.**
3. **Write bar's inode** (to update the last-accessed time, atime).

No bitmap is read or written: a read does not allocate anything.

**(c) Create /foo/bar: 10 I/Os (6 reads + 4 writes).**

1. Read the root inode.
2. Read the root data (find "foo").
3. Read foo's inode.
4. Read foo's data (check that "bar" does not already exist).
5. Read the **inode bitmap** (find a free inode).
6. Write the **inode bitmap** (mark it allocated).
7. Write **foo's data block** (add the entry (bar, new inode number)).
8. Read the **new inode** (it shares a 4 KB block with other inodes, so the block must be read before part of it is modified).
9. Write the **new inode** (initialise it).
10. Write **foo's inode** (its modification time changes, and its size if the directory grew).

*Likely follow-up from the slides:* each **allocating write** takes **5 I/Os** (read the inode, read the data bitmap, write the data bitmap, write the data block, write the inode). Creating a 12 KB file therefore takes 10 + 3 × 5 = **25 I/Os**.

# Endsem practice: post-midsem extras

*These cover slide topics from L13 to L19 that the professor's sheet skips and that are most likely to be asked. Same exam format as E1 to E20: rule, working, answer, reason. Also redo the existing banks:*

- *Page replacement and AMAT: M10, M11, M12, M13 (Memory page)*
- *Threads, races, locks, semaphores, deadlock: S1 to S28 (Concurrency page). In particular S1 (counter race), S7 (priority inversion), S9 and S12 (producer/consumer), S15 and S16 (dining philosophers, deadlock)*
- *File API and vsfs: F1 to F21 (File systems page)*

**X1.** Page replacement trace (L13 s48-52). Reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5. (a) Count the page faults for FIFO with 3 frames and with 4 frames. [4] (b) Count the faults for LRU with 3 and 4 frames, and for OPT with 3 frames. [4] (c) What is Belady's anomaly, and why can LRU never show it? [2]

*Solution.*

**Method.** For each reference, check whether the page is in memory (hit) or not (miss, a page fault). On a miss with full frames, evict by the policy: FIFO evicts the page that has been in memory longest; LRU evicts the page whose last use is oldest; OPT evicts the page whose next use is furthest in the future (or never).

**(a) FIFO.** Frames shown oldest first.

| Ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3 frames | M [1] | M [1 2] | M [1 2 3] | M [2 3 4] | M [3 4 1] | M [4 1 2] | M [1 2 5] | H | H | M [2 5 3] | M [5 3 4] | H |
| 4 frames | M | M | M | M [1 2 3 4] | H | H | M [2 3 4 5] | M [3 4 5 1] | M [4 5 1 2] | M [5 1 2 3] | M [1 2 3 4] | M [2 3 4 5] |

FIFO with 3 frames: **9 faults**. FIFO with 4 frames: **10 faults**.

**(b) LRU** (evict the least recently used).

- **3 frames:** 1, 2, 3, 4 (evict 1), 1 (evict 2), 2 (evict 3), 5 (evict 4) are 7 misses; then 1 and 2 hit; 3 (evict 5), 4 (evict 1), 5 (evict 2) are 3 more misses. Total **10 faults**.
- **4 frames:** 1, 2, 3, 4 miss; 1 and 2 hit; 5 (evict 3) misses; 1 and 2 hit; 3 (evict 4), 4 (evict 5), 5 (evict 1) miss. Total **8 faults**.

**OPT, 3 frames:** 1, 2, 3 miss; 4 misses (evict 3, used furthest ahead); 1 and 2 hit; 5 misses (evict 4); 1 and 2 hit; 3 misses (evict 1, which is never used again); 4 misses (evict 2); 5 hits. Total **7 faults**, the minimum possible.

| Policy | 3 frames | 4 frames |
| --- | --- | --- |
| FIFO | 9 | **10** |
| LRU | 10 | 8 |
| OPT | 7 | – |

**(c) Belady's anomaly:** giving a process **more frames** produces **more** page faults, as FIFO does here (9 → 10). It happens because FIFO ignores how recently a page was used. LRU and OPT have the **stack property**: the set of pages in memory with N frames is always a **subset** of the set with N + 1 frames, so adding a frame can only turn misses into hits, never the reverse.

---

**X2.** AMAT and the page-fault path (L13 s33-47). T_M = 100 ns and T_D = 10 ms. (a) Find the AMAT at a 99.9% hit rate. [3] (b) What hit rate keeps the AMAT under 200 ns? [3] (c) Describe step by step what happens on a TLB miss for a page that is valid but not present. [4]

*Solution.*

**(a)** $AMAT = T_M + P_{miss} \cdot T_D$. With P_miss = 0.001 and T_D = 10 ms = 10,000,000 ns: AMAT = 100 + 0.001 × 10,000,000 = 100 + 10,000 = 10,100 ns = **10.1 µs**. (At 90% hits: 100 + 0.1 × 10^7 = about 1 ms.)

**(b)** Need 100 + P × 10^7 < 200, so P < 100 / 10^7 = 10^−5. The hit rate must be **above 99.999%**. The disk is about 100,000 times slower than memory, so even a tiny miss rate **dominates** the average.

**(c) Steps:**

1. The TLB lookup **misses**, so the hardware walks the page table and reads the PTE.
2. The PTE has **valid = 1, present = 0**, so the hardware raises a **page fault** (trap to the OS).
3. The **OS page-fault handler** finds the page's disk address (stored in the PTE).
4. It finds a **free frame**. If none is free, the replacement policy picks a **victim**, and if the victim is dirty it is written to disk first.
5. The OS issues the **disk read** and **blocks** the process; the scheduler runs another process while the I/O completes.
6. When the I/O finishes, the OS sets **present = 1** and the **PFN** in the PTE.
7. The faulting instruction is **retried**. It misses in the TLB again, the hardware now finds a present PTE, installs it in the TLB, and the next retry **hits**.

---

**X3.** Producer/consumer with condition variables (L16 s14-24). One producer and two consumers share a one-slot buffer.

```c
void *consumer() { lock(&m); if (count == 0) wait(&cv, &m); get(); signal(&cv); unlock(&m); }
void *producer() { lock(&m); if (count == 1) wait(&cv, &m); put(); signal(&cv); unlock(&m); }
```

(a) Show how a consumer can call get() on an empty buffer. [4] (b) After changing `if` to `while`, show how all three threads can end up asleep. [4] (c) Give the final fix. [2]

*Solution.*

**(a) Problem with `if` (Mesa semantics).** Tc1 and Tc2 are consumers, P is the producer.

| Step | Event | count |
| --- | --- | --- |
| 1 | Tc1 runs: buffer empty, `wait` (sleeps) | 0 |
| 2 | P runs: `put()` fills the buffer, `signal` wakes Tc1 (now **ready**, not running) | 1 |
| 3 | **Tc2 runs first**: count is 1, so it skips the wait, `get()` empties the buffer | 0 |
| 4 | Tc1 runs: it was already past its `if`, so it does **not recheck**, and calls `get()` on an **empty buffer** | 0 (error) |

**(b) Problem with one CV.** With `while` instead of `if`:

| Step | Event |
| --- | --- |
| 1 | Tc1 and Tc2 both run first: count = 0, both wait on the CV |
| 2 | P: `put()`, `signal` wakes one waiter (Tc1); then P loops and finds the buffer full, so it **waits** |
| 3 | Tc1: `get()`, then `signal`: with **one** CV, the signal can wake **Tc2** (a consumer) instead of P |
| 4 | Tc2: count = 0, waits again |

**All three threads are now asleep** (P waits for room, Tc1 finished and Tc2 waits for data, nothing is left to wake them). The signal woke the wrong **kind** of thread.

**(c) Fix.** Use **`while`** (recheck after wake-up) **and two CVs**: a producer waits on `empty` and signals `fill`; a consumer waits on `fill` and signals `empty`. Then a consumer's signal can only wake a producer, and vice versa.

```c
producer: lock; while (count == MAX) wait(&empty, &m); put(); signal(&fill);  unlock;
consumer: lock; while (count == 0)   wait(&fill, &m);  get(); signal(&empty); unlock;
```

---

**X4.** Semaphore bounded buffer (L17 s13-19). empty = MAX, full = 0, mutex = 1. A first attempt takes `sem_wait(&mutex)` **before** `sem_wait(&empty)` in the producer, and `sem_wait(&mutex)` before `sem_wait(&full)` in the consumer. (a) Show the deadlock. [5] (b) Fix it, and say why the fix works. [5]

*Solution.*

**(a) Deadlock.** The buffer is empty (full = 0).

| Step | Event |
| --- | --- |
| 1 | The consumer runs: `sem_wait(&mutex)` succeeds (mutex = 0), then `sem_wait(&full)` **blocks** (full = 0), **while still holding the mutex** |
| 2 | The producer runs: `sem_wait(&mutex)` **blocks**, because the consumer holds it |

The consumer waits for the producer to put an item (full), and the producer waits for the consumer to release the mutex: a **circular wait**, so both sleep forever. The cause is **hold and wait**: a thread blocks on `full` or `empty` while holding the mutex.

**(b) Fix: shrink the mutex's scope** so it covers only the buffer update:

```c
producer:                       consumer:
  sem_wait(&empty);               sem_wait(&full);
  sem_wait(&mutex);               sem_wait(&mutex);
  put(i);                         tmp = get();
  sem_post(&mutex);               sem_post(&mutex);
  sem_post(&full);                sem_post(&empty);
```

A thread now waits for **empty/full first, without holding the mutex**, so it cannot block anyone while it sleeps. It only takes the mutex once it knows there is room (or an item), so the critical section is short and always makes progress. (The mutex is still needed when MAX > 1: without it, two producers could write the same slot.)

---

**X5.** The counter race (L14 s14-18). `counter = counter + 1` compiles to `mov counter, %eax; add $1, %eax; mov %eax, counter`. counter starts at 50, and two threads each run it once. (a) Trace an interleaving that ends with 51. [5] (b) Define critical section, race condition, indeterminate program and mutual exclusion. [5]

*Solution.*

**(a)** Each thread has its own copy of the registers (saved and restored on a switch), but both share the memory location `counter`.

| Step | Thread | Instruction | T1's eax | T2's eax | counter |
| --- | --- | --- | --- | --- | --- |
| 1 | T1 | load | 50 | | 50 |
| 2 | T1 | add | 51 | | 50 |
| 3 | | *timer interrupt, switch to T2 (T1's eax = 51 is saved)* | | | 50 |
| 4 | T2 | load | | 50 | 50 |
| 5 | T2 | add | | 51 | 50 |
| 6 | T2 | store | | 51 | **51** |
| 7 | | *switch back to T1* | | | 51 |
| 8 | T1 | store | 51 | | **51** |

Both increments ran, but the final value is **51, not 52**: one update was **lost**, because T2 read the old value (50) before T1 wrote its result.

**(b)**
- **Critical section:** a piece of code that accesses a shared resource (here, the three instructions that update `counter`) and must not be run by more than one thread at a time.
- **Race condition:** several threads enter the critical section at about the same time, and the result **depends on the exact timing** of the scheduler.
- **Indeterminate program:** a program with one or more race conditions, so its output **varies from run to run**.
- **Mutual exclusion:** a guarantee that if one thread is in the critical section, **all others are kept out**. A lock provides it.

---

**X6.** File descriptors and links (L18 s6-22). A 100-byte file. `fd = open("f", O_RDONLY); read(fd, buf, 10);` then `fork()`. The child calls `read(fd, buf, 20)` and exits. The parent waits, then calls `lseek(fd, 0, SEEK_CUR)`. (a) What does it return, and why? [3] (b) What if the child had opened the file again itself? [2] (c) Run `echo x > a; ln a b; ln -s a s; rm a`. Give the link count of b, and say what `cat b` and `cat s` do. [3] (d) How do you update a file atomically? [2]

*Solution.*

**(a) It returns 30.** Each process has a **file-descriptor table**, whose entries point to a **system-wide open-file table**. After `fork`, the parent's and child's fd 3 point to the **same open-file-table entry**, which holds the **current offset**. The offset moves 0 → 10 (parent's read) → 30 (child's read of 20). `lseek(fd, 0, SEEK_CUR)` just reports the current offset, so it returns **30**.

**(b)** A separate `open()` creates a **new** open-file-table entry with its **own offset** (starting at 0). The child's reads would then not move the parent's offset, and the parent would still report **10**.

**(c)** `echo x > a` creates inode with link count 1. `ln a b` adds a second name for the **same inode**: count = 2. `ln -s a s` creates a new file whose data is the path "a" (it does not change the count). `rm a` is `unlink("a")`: count drops to **1**. `cat b` prints **x**, because the inode and data still exist. `cat s` **fails** (No such file or directory): the symlink holds the *path* "a", which no longer exists. It is a **dangling symlink**.

**(d) Atomic update:** write the new contents to a temporary file `f.tmp`, call **`fsync()`** so the data is on disk, then **`rename("f.tmp", "f")`**. `rename` is **atomic**, so after a crash the file is either completely the old version or completely the new one, never half-written.

---

**X7.** Dining philosophers (L17 s23-25). 5 philosophers and 5 forks. Each runs `sem_wait(left); sem_wait(right); eat; sem_post(right); sem_post(left);`. (a) Show the deadlock, and name the four deadlock conditions. [5] (b) Give the standard fix and the condition it breaks. [3] (c) Name one other fix. [2]

*Solution.*

**(a)** If all five philosophers pick up their **left** fork at the same moment, each holds one fork and waits for the **right** fork, which is held by the neighbour. Everyone waits for the next, in a cycle: **deadlock**. The four necessary conditions: **(1) mutual exclusion** (a fork is used by one philosopher at a time), **(2) hold and wait** (a philosopher holds one fork while waiting for another), **(3) no preemption** (a fork cannot be taken away), **(4) circular wait** (each waits for a fork held by the next in a cycle).

**(b) Fix: break the dependency.** Let **one philosopher (the last one) pick up the right fork first**, then the left. The forks are then acquired in a consistent global order, so the cycle cannot form. This breaks **circular wait**.

**(c) Another fix:** **admission control**: a semaphore initialised to 4 lets at most 4 philosophers try to eat at once, so at least one can always get both forks. (Or pick up both forks atomically under one lock, which breaks hold and wait.)

---

**X8.** Lock implementations (L15 s15-33). (a) Write CompareAndSwap and a spin lock using it. [3] (b) Write a lock using LoadLinked and StoreConditional. [3] (c) What is priority inversion, and how is it fixed? [4]

*Solution.*

**(a)** CompareAndSwap atomically compares `*ptr` with `expected` and, if equal, writes `new`; it returns the old value:

```c
int CompareAndSwap(int *ptr, int expected, int new) {
    int actual = *ptr;
    if (actual == expected) *ptr = new;
    return actual;          // all of this executes atomically
}
void lock(lock_t *l)   { while (CompareAndSwap(&l->flag, 0, 1) == 1) ; }   // spin until we swapped 0 to 1
void unlock(lock_t *l) { l->flag = 0; }
```

**(b)** `LoadLinked` loads the value; `StoreConditional` stores only if **no other write to that address has happened since the load-linked**, returning 1 on success and 0 on failure:

```c
void lock(lock_t *l) {
    while (1) {
        while (LoadLinked(&l->flag) == 1) ;               // spin while held
        if (StoreConditional(&l->flag, 1) == 1) return;   // fails if another thread wrote in between; retry
    }
}
```

**(c) Priority inversion:** a low-priority thread L holds a lock that a high-priority thread H needs. H waits for L, but a **medium-priority** thread M keeps preempting L, so L cannot finish and release the lock: H is effectively blocked by M. (On one CPU with a spin lock, H can spin forever.) **Fixes:** **priority inheritance** (L temporarily runs at H's priority until it releases the lock), or avoid spinning (use sleeping locks).

---

**X9.** Hybrid paging and segmentation (L13 s8-11). 32-bit VAs and 4 KB pages. The top 2 bits pick the segment (01 code, 10 heap, 11 stack, 00 unused), then an 18-bit VPN, then a 12-bit offset. Each segment has a base register (physical address of its page table) and a bounds register (number of valid pages). Code bounds = 3, heap base = 0x2000 and heap bounds = 10, with 4-byte PTEs. (a) Where is the PTE for VA 0x80001234? [3] (b) What happens on VA 0x40003ABC? [2] (c) The process uses 3 code pages, 10 heap pages and 2 stack pages. Compare the page-table memory with a linear table. [3] (d) Give two drawbacks of the hybrid. [2]

*Solution.*

**(a)** 0x80001234 = 1000 0000 0000 0000 0001 0010 0011 0100. Top 2 bits = **10 = heap**. VPN = (VA & VPN_MASK) >> 12 = **1**, offset = 0x234. Check: VPN 1 < heap bounds 10, so valid. **AddressOfPTE = Base[heap] + VPN × sizeof(PTE) = 0x2000 + 1 × 4 = 0x2004.**

**(b)** 0x40003ABC: top 2 bits = 01 = code; VPN = 3, offset = 0xABC. Code bounds = 3, so valid VPNs are 0, 1 and 2. VPN 3 is **out of bounds**, so the hardware raises an **exception** and the OS likely kills the process.

**(c)** A linear table has 2^20 entries × 4 B = **4 MB**. The hybrid keeps only the valid pages' PTEs: (3 + 10 + 2) × 4 B = **60 B** in total. The unused region between heap and stack costs **nothing**.

**(d)** (1) It still **needs segmentation**, which assumes a particular pattern of address-space use (for example, a large sparse heap still wastes table space). (2) Page tables are now **variable-sized**, so finding memory for them brings **external fragmentation** back.

---

**X10.** Inverted tables, swapping, and the L13 mechanisms. (a) What is an inverted page table, and how big is it for 4 GB of RAM, 4 KB frames and 8-byte entries? [4] (b) Why does lookup need a hash? [2] (c) On a TLB miss, what are the three cases the OS or hardware can find? [4]

*Solution.*

**(a)** An inverted page table has **one entry per physical frame** for the **whole system** (not one table per process). Each entry records which **(process, VPN)** currently uses that frame. 4 GB / 4 KB = 2^20 frames × 8 B = **8 MB in total**, regardless of the number of processes. (A per-process linear table would need 4 MB for each process.)

**(b)** Translation starts from (PID, VPN), but the table is indexed by frame number. Searching 2^20 entries linearly on each TLB miss is far too slow, so a **hash table on (PID, VPN)** points to the right entry.

**(c) Three cases on a TLB miss:**

1. The PTE is **valid and present**: install the translation in the TLB and retry (a hit now).
2. The PTE is **valid but not present**: a **page fault**; the OS brings the page in from swap, updates the PTE and retries.
3. The PTE is **not valid**: an illegal access, so a **segmentation fault**; the OS kills the process.

# Endsem practice: pre-midsem problems

*Lectures 1 to 9 in 10-mark exam style: new problems, because the professor's sheet had none for this half. Also redo the banks already in the chapter pages: C1 to C8 (Lectures 1 to 7) and N1 to N11 (networking, including the transport-layer sheet problems N6 to N9).*

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

*Solution.*

**(a) Trace.** After the first fork there are the **parent** (x = 1) and the **child** (x = 1). The parent goes to the `else` branch and waits. The child increments x to 2, then forks a **grandchild** (x = 2). The grandchild increments x to 3, **prints 3** and exits. The child's `wait` returns and it **prints 2**. The parent's `wait` returns and it **prints 1**.

Output: **3, 2, 1**, always in this order, because each `wait` forces the parent to print after its child. Each process has its **own copy** of x (fork copies the address space), so a change in a child never affects the parent.

**(b)** A **zombie** is a process that has **exited** but whose **parent has not yet called wait()**: its process-table entry and exit status remain until the parent collects them. An **orphan** is a process whose **parent has exited first**; the OS reparents it to **init**. In xv6, `exit()` closes the files, sets the process state to **ZOMBIE**, gives the dying process's **children to init** (which waits for them), and **wakes up the parent**. A zombie that is never waited for stays in the table forever (a leak).

**(c)** Keeping them separate lets the shell run code **between fork and exec**, in the child, to **change the environment** without the program knowing: for `ls > out.txt`, the child does `close(1); open("out.txt", ...)` (the new file gets fd 1), then `exec("ls")`. The same pattern sets up **pipes** and changes the working directory. The program that is then exec'd inherits those fds, so **I/O redirection** needs no support inside the program.

---

**P2.** Limited direct execution (L04). (a) List the hardware and OS steps when a timer interrupt switches from process A to process B. [6] (b) Which registers are saved twice, by whom, and where? [2] (c) Why does the trap table have to be set up at boot, and why is a system-call *number* used instead of an address? [2]

*Solution.*

**(a) Steps:**

1. **Hardware:** the timer interrupt fires. The hardware saves A's **user registers** (including the PC) onto A's **kernel stack**, switches to **kernel mode**, and jumps to the **trap handler** found in the trap table.
2. **OS:** the handler decides to switch to B and calls `switch()` (the scheduler).
3. **OS:** `switch()` saves A's **kernel registers** into A's process structure (its `struct context`).
4. **OS:** it restores B's kernel registers from B's process structure, which also **switches to B's kernel stack**.
5. **OS:** the OS executes **return-from-trap**.
6. **Hardware:** it restores B's user registers from B's kernel stack, switches to **user mode** and jumps to B's PC. B runs as if it had never stopped.

**(b)** The **user registers** are saved **by the hardware** onto the **kernel stack** (in xv6, the trapframe). The **kernel registers** are saved **by the OS** (in `swtch()`) into the **process structure** (xv6: ra, sp, s0 to s11 in `struct context`).

**(c)** The trap table is installed **at boot, in kernel mode, with a privileged instruction**, so the hardware knows where the kernel's handlers are and user code cannot redirect traps to its own code. User code gives a **number** (not an address) so that it can only reach **kernel code the OS has chosen**: the kernel validates the number and looks up the handler itself. An address would let a program jump into the middle of arbitrary kernel code. This is a **protection** mechanism.

---

**P3.** Scheduling. Jobs: A arrives at 0 and needs 6; B arrives at 2 and needs 3; C at 4 needs 8; D at 6 needs 2. Find the average turnaround and response times for FIFO, SJF (non-preemptive), STCF and RR (q = 2; a new arrival joins the queue before the job that was just preempted). [10]

*Solution.*

**Formulas.** Turnaround = completion − arrival. Response = first run − arrival.

**FIFO:** A 0–6, B 6–9, C 9–17, D 17–19. Turnaround: A 6, B 7, C 13, D 13, average = 39 / 4 = **9.75**. Response: A 0, B 4, C 5, D 11, average = 20 / 4 = **5**.

**SJF (non-preemptive):** at 0 only A is there, so A 0–6. At 6, B (3), C (8) and D (2) are waiting, so the shortest is D: D 6–8, then B 8–11, then C 11–19. Turnaround: A 6, B 9, C 15, D 2, average = 32 / 4 = **8**. Response: A 0, B 6, C 7, D 0, average = 13 / 4 = **3.25**.

**STCF (preemptive SJF):** A runs 0–2. At 2, B (3) is shorter than A's remaining 4, so B runs 2–5 (C arrives at 4 with 8, not shorter than B's remaining 1). At 5, A (4) runs; at 6, D (2) is shorter than A's remaining 3, so D 6–8. Then A 8–11, then C 11–19. Completion: A 11, B 5, C 19, D 8. Turnaround: A 11, B 3, C 15, D 2, average = 31 / 4 = **7.75**. Response: A 0, B 0, C 7, D 0, average = 7 / 4 = **1.75**.

**RR (q = 2):** the queue changes as follows (arrivals join ahead of the preempted job).

| Time | Runs | Queue after (front first) |
| --- | --- | --- |
| 0–2 | A | B arrives at 2, goes before A: [B, A] |
| 2–4 | B | C arrives at 4, goes before B: [A, C, B] |
| 4–6 | A | D arrives at 6, goes before A: [C, B, D, A] |
| 6–8 | C | [B, D, A, C] |
| 8–9 | B (finishes) | [D, A, C] |
| 9–11 | D (finishes) | [A, C] |
| 11–13 | A (finishes) | [C] |
| 13–19 | C (finishes) | |

Completion: A 13, B 9, C 19, D 11. Turnaround: A 13, B 7, C 15, D 5, average = 40 / 4 = **10**. Response: A 0, B 0, C 2, D 3, average = 5 / 4 = **1.25**.

| Policy | Avg turnaround | Avg response |
| --- | --- | --- |
| FIFO | 9.75 | 5 |
| SJF | 8 | 3.25 |
| STCF | **7.75** | 1.75 |
| RR | 10 | **1.25** |

**Conclusion:** STCF is best for turnaround, RR is best for response, and the two goals trade off.

---

**P4.** MLFQ with three queues: Q2 (top, quantum 10 ms), Q1 (20 ms) and Q0 (round robin), with no boost. A is CPU-bound and needs 100 ms, arriving at 0. B needs 20 ms and arrives at 30. (a) Trace the schedule and give both turnaround times. [4] (b) Show how a job can game Rules 4a/4b, and give the fix. [3] (c) Why is a priority boost needed, and what goes wrong if it is too frequent? [3]

*Solution.*

**(a) Rules used:** a new job starts at the top queue; a job that uses its whole allotment at a level moves down; the highest-priority non-empty queue runs.

| Time | Event |
| --- | --- |
| 0–10 | A runs in Q2, uses its 10 ms, moves to Q1 |
| 10–30 | A runs in Q1, uses its 20 ms, moves to Q0 |
| 30 | B arrives (needs 20 ms) and enters Q2, which has higher priority than A's Q0 |
| 30–40 | B runs in Q2, uses 10 ms, moves to Q1 |
| 40–50 | B runs in Q1, the remaining 10 ms: **B finishes at 50** |
| 50–120 | A runs in Q0 with 100 − 10 − 20 = 70 ms left: **A finishes at 120** |

**Turnaround: B = 50 − 30 = 20 ms; A = 120 ms.** The short job B overtakes the long job A, so MLFQ approximates SJF without knowing job lengths.

**(b) Gaming (old Rule 4b):** the old rules let a job that **gave up the CPU before its slice ended stay at the same priority**. A job can issue a pointless I/O just before the end of each time slice (for example, at 9.9 ms of a 10 ms slice), so it is never demoted and monopolises the top queue. **Fix (new Rule 4):** account for the **total CPU time used at a level**, regardless of how many times the job gave up the CPU, and demote it once its allotment is used up.

**(c)** Without a boost: **(1) starvation:** if there are many interactive jobs, long jobs sink to the bottom and never run; **(2) behaviour change:** a CPU-bound job that later becomes interactive stays stuck at the bottom. **Rule 5:** after some period S, **move all jobs to the top queue** (this guarantees progress and re-evaluates behaviour). **If S is too small,** CPU-bound jobs keep returning to the top and take CPU time from interactive jobs, so MLFQ degrades towards plain round robin. If S is too large, long jobs still starve between boosts. S is a "voo-doo constant" that must be tuned.

---

**P5.** CFS with sched_latency = 48 ms and min_granularity = 6 ms. A and B have nice 0 (weight 1024), and C has nice −5 (weight 3121). (a) Give each process's time slice. [4] (b) Show how much each one's vruntime grows over one period. [3] (c) With 12 processes at nice 0, what slice does each get? [2] (d) Where does CFS put a process waking from a long sleep? [1]

*Solution.*

**(a) Formula:** $\text{slice}_k = \dfrac{w_k}{\sum w_i} \times \text{sched\_latency}$. Total weight = 1024 + 1024 + 3121 = 5169. A and B: 48 × 1024 / 5169 = **9.51 ms** each. C: 48 × 3121 / 5169 = **28.98 ms**. (They add up to 48 ms.)

**(b) Formula:** $\Delta vruntime = \dfrac{1024}{w_k} \times \text{runtime}$. A and B: 9.51 × 1024 / 1024 = **9.51**. C: 28.98 × 1024 / 3121 = **9.51**. **They are equal.** A higher-weight process gets a longer slice but its vruntime grows more slowly per ms, so when CFS keeps all vruntimes level (always running the one with the **lowest vruntime**), the heavier process receives proportionally more CPU.

**(c)** 48 / 12 = 4 ms, which is below min_granularity, so each process gets **6 ms** (the round then takes 12 × 6 = 72 ms).

**(d)** Its vruntime is set to the **minimum vruntime in the red-black tree**, so it neither monopolises the CPU (with a tiny vruntime) nor is penalised for sleeping.

---

**P6.** Multiprocessor scheduling (L07). (a) What is cache affinity, and how does single-queue scheduling (SQMS) hurt it? [3] (b) Give two scalability problems with SQMS. [2] (c) Under MQMS, A is alone on CPU 0, while B and D share CPU 1. What is the problem, and how is it fixed? [3] (d) Why is cache coherence needed, and how does bus snooping provide it? [2]

*Solution.*

**(a)** **Cache affinity:** a process run again on the **same CPU** finds some of its data still in that CPU's cache (and TLB), so it runs faster. SQMS puts all jobs in one queue and each CPU takes whatever job is next, so a job **bounces between CPUs** and finds a cold cache each time.

**(b)** (1) The single queue needs a **lock**, and as the number of CPUs grows the lock becomes **heavily contended** (CPUs spend more time waiting for it), limiting scalability. (2) Poor affinity, as in (a); fixing it needs extra mechanisms that make it more complex.

**(c)** **Load imbalance:** A gets a whole CPU, while B and D get only 50% each. **Fix: migration.** The OS moves jobs between queues, for example by **work stealing**: a CPU with a short queue occasionally **looks at another queue** and steals a job. Looking too often costs overhead; too rarely leaves the imbalance.

**(d)** Each CPU caches memory, so a write on one CPU can leave **stale copies** in the other caches. With **bus snooping**, each cache **watches the shared bus**, and when it sees a write to an address it holds, it **invalidates** (or updates) its own copy.

---

**P7.** Network layers and devices (L08). (a) Name the TCP/IP layers, the data unit at each, and the address each uses. [4] (b) Which header does a hub, a switch and a router each look at? [3] (c) A host sends a 1000-byte HTTP message over TCP/IP and Ethernet. Show the encapsulation, assuming 20-byte TCP and IP headers and an 18-byte Ethernet header and trailer. [3]

*Solution.*

**(a)**

| Layer | Data unit | Address used |
| --- | --- | --- |
| Application | message | (hostname, port in the app) |
| Transport | segment (TCP) / datagram (UDP) | **port number** |
| Network | packet (datagram) | **IP address** |
| Link | frame | **MAC address** |
| Physical | bits | – |

**(b)** A **hub** works at layer 1 and reads **no header**: it repeats the bits to every port. A **switch** works at layer 2: it reads the **MAC address**, learns which port leads to which MAC, and forwards the frame only to the right port. A **router** works at layer 3: it reads the **IP address** and forwards the packet towards the destination network using its routing table.

**(c)** Each layer wraps what it receives from above: 1000 B of data + 20 B TCP header = **1020 B segment**; + 20 B IP header = **1040 B packet**; + 18 B Ethernet header and trailer = **1058 B frame**. The receiver strips the headers in reverse order (**decapsulation**).

---

**P8.** TCP (L09). The client ISN is 1000 and the server ISN is 5000. (a) Give the seq and ack numbers of the three-way handshake. [3] (b) The client then sends 3 segments of 100 bytes. Give their seq numbers. The second segment is lost. What ACKs does the server send, and when does fast retransmit fire? [4] (c) Describe the 4-way close, and explain why TIME_WAIT exists. [3]

*Solution.*

**(a)** SYN uses one sequence number.

| Segment | seq | ack |
| --- | --- | --- |
| 1. Client → server: SYN | 1000 | – |
| 2. Server → client: SYN-ACK | 5000 | 1001 |
| 3. Client → server: ACK | 1001 | 5001 |

**(b)** Data segments: seq = **1001, 1101, 1201** (each 100 bytes). ACK numbers are **cumulative** and name the **next byte expected**. The server ACKs **1101** after segment 1. Segment 2 (seq 1101) is lost. When segment 3 arrives out of order, the server can only ACK what it has in order, so it sends **ACK 1101 again** (a **duplicate ACK**). **Fast retransmit** fires when the sender receives **three duplicate ACKs** for 1101 (that is, the original plus 3 duplicates, which needs more segments arriving after the gap): the sender then retransmits segment 2 **without waiting for the timeout**.

**(c)** **Close:** the side that closes first sends **FIN**; the other side replies **ACK**; later the other side sends its own **FIN**; the first side replies **ACK**. The side that sent the last ACK then enters **TIME_WAIT** for 2 × MSL (maximum segment lifetime). **Why:** (1) if the final ACK is lost, the other side will retransmit its FIN, and the waiting side can still answer; (2) it lets **old delayed segments** from this connection expire, so they cannot be mistaken for part of a **new connection** reusing the same ports.

---

**P9.** TCP timers and congestion control. (a) EstimatedRTT = 80 ms and DevRTT = 8 ms. A SampleRTT of 120 ms arrives. Find the new EstimatedRTT, DevRTT and TimeoutInterval, with α = 0.125 and β = 0.25. [4] (b) ssthresh = 8 and cwnd starts at 1. List cwnd for rounds 1 to 8. Three duplicate ACKs arrive at the end of round 8. Give rounds 9 to 11. Then there is a timeout at the end of round 11. Give rounds 12 to 15. [6]

*Solution.*

**(a)** (K&R order: update EstimatedRTT first, then DevRTT using the new estimate.)

- EstimatedRTT = 0.875 × 80 + 0.125 × 120 = 70 + 15 = **85 ms**.
- DevRTT = 0.75 × 8 + 0.25 × |120 − 85| = 6 + 8.75 = **14.75 ms**.
- TimeoutInterval = EstimatedRTT + 4 × DevRTT = 85 + 59 = **144 ms**.

**(b)** **Slow start** doubles cwnd each round until it reaches ssthresh; then **congestion avoidance** adds 1 MSS per round. A loss by **3 duplicate ACKs** sets ssthresh = cwnd / 2 and cwnd = ssthresh (fast recovery). A **timeout** sets ssthresh = cwnd / 2 and cwnd = 1 (back to slow start).

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cwnd | 1 | 2 | 4 | 8 | 9 | 10 | 11 | 12 | 6 | 7 | 8 | 1 | 2 | 4 | 5 |

- Rounds 1–4: slow start (1, 2, 4, 8); cwnd reaches ssthresh = 8 at round 4.
- Rounds 5–8: congestion avoidance (+1 per round): 9, 10, 11, 12.
- End of round 8, **3 duplicate ACKs**: ssthresh = 12 / 2 = **6**, cwnd = **6** (round 9), then 7, 8 (rounds 10, 11).
- End of round 11, **timeout**: ssthresh = 8 / 2 = **4**, cwnd = **1** (round 12). Slow start: 1, 2, 4 (reaches ssthresh = 4), then congestion avoidance: 5.

---

**P10.** Checksums and sockets (L09). (a) Compute the UDP checksum of the 16-bit words 0x1234, 0xF00F and 0x0F0F. [4] (b) List the socket calls for a TCP server and a TCP client, and say which ones block. [4] (c) Why does accept() return a new socket? [2]

*Solution.*

**(a) Method:** add the words with **end-around carry** (any carry out of bit 16 is added back into the low bits), then take the **ones' complement**.

- 0x1234 + 0xF00F = 0x10243. The carry (1) wraps around: 0x0243 + 1 = **0x0244**.
- 0x0244 + 0x0F0F = **0x1153** (no carry).
- Ones' complement: 0xFFFF − 0x1153 = **0xEEAC**. This is the checksum.

*Check at the receiver:* 0x1153 + 0xEEAC = 0xFFFF, so no error is detected.

**(b)** **Server:** `socket()`, `bind()`, `listen()`, `accept()` (**blocks** until a client connects), `recv()` (**blocks** until data arrives), `send()`, `close()`. **Client:** `socket()`, `connect()` (**blocks** during the handshake), `send()`, `recv()` (**blocks**), `close()`. UDP has no listen, accept or connect: it uses `sendto()` and `recvfrom()` (which blocks). A blocking call puts the process to **sleep**, so it is a **context-switch point**.

**(c)** The **listening socket** stays open to accept further connections. Each accepted connection gets its **own new socket**, identified by the **4-tuple** (source IP, source port, destination IP, destination port). That is how one server on port 80 can serve many clients at the same time: every connection has its own socket and state.

---

**P11.** Process states (L02 s12-15). P0 needs 2 units of CPU, then issues an I/O that takes 3 units, then needs 1 more unit of CPU. P1 needs 4 units of CPU. P0 starts first. The OS switches to another process when the running one blocks, and a process that finishes its I/O becomes ready but does not preempt. (a) Give each process's state at times 1 to 7. [5] (b) How long would it take if the OS ran P1 only after P0 finished? [2] (c) Draw the state diagram, and say which transitions the OS triggers and which come from events. [3]

*Solution.*

**(a)**

| Time unit | P0 | P1 | Note |
| --- | --- | --- | --- |
| 1 | Running | Ready | |
| 2 | Running | Ready | P0 issues its I/O at the end of this unit |
| 3 | Blocked | Running | OS switches to P1 |
| 4 | Blocked | Running | |
| 5 | Blocked | Running | P0's I/O completes at the end of this unit |
| 6 | Ready | Running | P1 finishes (its 4th unit); P0 is ready but does not preempt |
| 7 | Running | Done | P0 runs its last unit and finishes |

The CPU is busy for all 7 units, because P1's computation **overlaps** P0's I/O.

**(b)** If P1 ran only after P0 finished: P0 takes 2 + 3 (CPU idle during I/O) + 1 = 6 units, then P1 takes 4: **10 units**. Overlapping I/O with another process's computation saves 3 units.

**(c) Transitions:**

- **Ready → Running:** the OS **schedules** the process.
- **Running → Ready:** the OS **deschedules** it (for example, timer interrupt, or yield).
- **Running → Blocked:** the process starts **I/O** (its own system call).
- **Blocked → Ready:** the **I/O completes** (an interrupt).

There is **never a direct Blocked → Running** edge: after the I/O completes the process must wait in the ready queue until the scheduler picks it.
