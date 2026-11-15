# Lecture 10, part 1: The address space

*Slides: L10-L13. Read: OSTEP ch 13-22, Silb ch 9-10. Tutorial 3 (paging in xv6). Homework 03.*

Unit 1 shared one CPU among many processes. This unit does the same for memory. Every process should believe it has a large, private memory starting at address 0, even though there is only one physical memory, shared with the OS and every other process.

The unit builds the answer in steps, and each step fixes a problem the previous one left behind:

1. **Address spaces** (3.1): the illusion we want to give.
2. **Base and bounds** (3.3): translate addresses in hardware. Problem: wastes the gap between heap and stack.
3. **Segmentation** (3.4): a separate base and bounds per region. Problem: variable-size pieces fragment memory.
4. **Paging** (3.5): fixed-size pieces. Problems: each access needs an extra memory read, and page tables are huge.
5. **TLB** (3.6): cache translations to fix the speed problem.
6. **Multi-level page tables** (3.7): allocate page-table pieces only where needed, to fix the size problem.
7. **Swapping** (3.8-3.9): use the disk when RAM runs out, and choose wisely which page to evict.

*L10 s2-15. OSTEP ch 13.*

**How we got here (L10 s3-7).**

- **Early systems.** The OS sat at address 0 as a library, and one program used the rest of memory. There was no abstraction and no protection.
- **Multiprogramming and time-sharing.** Several processes are kept ready, so the CPU can switch when one waits for I/O. Interactive users want quick responses.
- **Naive time-sharing.** Save *all* of memory to disk and load the next process. This is far too slow.
- **Keep processes resident.** Each process gets a slice of physical memory, and the OS switches between them. This creates a new problem: what stops process B from reading or overwriting process A's memory? **Protection** becomes essential.

**The address space** is the process's own view of memory. It holds everything the program needs:

- **Code**: the instructions. Its size is fixed, so it goes at the bottom.
- **Heap**: memory from `malloc()`. It sits above the code and grows toward *higher* addresses.
- **Stack**: local variables, arguments and return addresses. It starts at the top and grows toward *lower* addresses.

The free space in between lets both heap and stack grow.

```
0KB   +------------------+
      | Program code     |   static, fixed size
1KB   +------------------+
      | Heap   (grows v) |   malloc()
2KB   +------------------+
      |                  |
      |      free        |
      |                  |
15KB  +------------------+
      | Stack  (grows ^) |   function calls, locals
16KB  +------------------+
```

The slides say the heap "grows downward" and the stack "grows upward". That refers to the picture, where 0 is at the top. In terms of addresses, the heap grows up and the stack grows down.

**Every address a program sees is virtual (L10 s10).** If you print a pointer in C, you see a *virtual* address. The process thinks it starts at 0, but it might really be loaded at physical address 320KB. The OS and hardware **translate** every virtual address into a physical one. That translation is what "virtualizing memory" means.

**Three goals (L10 s12-15).**

| Goal | Meaning |
| --- | --- |
| Transparency | The program cannot tell memory is virtualized; it behaves as if it owns private physical memory |
| Efficiency | Low overhead in time and in space for bookkeeping; this needs hardware help, such as the TLB |
| Protection | A process can only touch its own address space; processes are isolated from each other and from the OS |

**Isolation** means one part can fail without affecting another. Memory isolation protects processes from each other and protects the OS from processes. Microkernels go further and isolate parts of the OS from each other.

# Lecture 10, part 2: The memory API

*L10 s16-25. OSTEP ch 14.*

There are two kinds of memory in a C program:

- **Stack memory** is automatic. In `void f() { int x; }`, the compiler reserves `x` when `f` is called and frees it when `f` returns. You cannot keep it after the function returns.
- **Heap memory** is explicit. You ask for it with `malloc()` and must give it back with `free()`. It lives until you free it.

**`malloc(size_t size)`** returns a pointer to `size` bytes, or `NULL` if it fails. Always compute the size with `sizeof`:

```c
double *d = malloc(sizeof(double));          // one double
int *arr = malloc(10 * sizeof(int));         // array of 10 ints
char *copy = malloc(strlen(src) + 1);        // +1 for the '\0' terminator
```

**`sizeof` trap (L10 s19).** For `int *x = malloc(10 * sizeof(int));`, `sizeof(x)` is **4 or 8**, the size of the *pointer*, not 40. For an array declared as `int x[10];`, `sizeof(x)` is 40, because the compiler knows the array's size.

**`free(ptr)`** takes only the pointer. You do not pass the size, because the allocator keeps it in a small header just before the block. The hard part is knowing *when* to free.

**The seven classic errors (L10 s21-24).** All of them compile, and many seem to run fine until they suddenly don't.

| # | Error | Example | What happens |
| --- | --- | --- | --- |
| 1 | Forgetting to allocate | `char *dst; strcpy(dst, "hi");` | `dst` points anywhere; usually a segfault |
| 2 | Not allocating enough (**buffer overflow**) | `malloc(strlen(src))`, then `strcpy` | The `'\0'` is written one byte past the end; may corrupt the heap or create a security hole |
| 3 | Forgetting to initialize | Read from `malloc`'d memory before writing | Garbage values (**uninitialized read**). `calloc()` zeroes the memory |
| 4 | Forgetting to free (**leak**) | Allocate in a loop, never free | Harmless in a short program (the OS reclaims everything at exit); fatal in a long-running server or inside the kernel |
| 5 | Freeing too early (**dangling pointer**) | `free(p); p->x = 1;` | `p` points to memory that may now belong to something else |
| 6 | Freeing twice (**double free**) | `free(p); free(p);` | Undefined; corrupts the allocator's own data |
| 7 | **Invalid free** | `free(p + 4)` or freeing a stack address | Passes `free` a pointer `malloc` never returned |

Tools such as `valgrind` and `gdb`, and compiler flags such as `-fsanitize=address`, catch most of these.

**Under the hood (L10 s25).** `malloc` and `free` are **library** calls, not system calls. The library manages the heap and asks the OS for more memory when it needs it:

- **`brk` / `sbrk`** move the *program break*, the end of the heap.
- **`mmap`** creates a new region of memory.

Other library calls: **`calloc()`** allocates and zeroes. **`realloc()`** grows or shrinks a block, copying the data if it has to move.

# Lecture 11, part 1: Base and bounds

*L11 s3-25. OSTEP ch 15, Silb 9.2.*

We use the same strategy as Limited Direct Execution: let the program run directly, and have the hardware step in on **every** memory reference. The hardware *translates* each virtual address (instruction fetch, load or store) into a physical address. The OS sets up the hardware and steps in only at key moments.

**Simplifying assumptions, relaxed later (L11 s6):**

1. Each address space is placed **contiguously** in physical memory.
2. Each address space is **smaller** than physical memory.
3. All address spaces are the **same size**.

**Running example (L11 s7-8).** The statement `x = x + 3` compiles to three instructions at virtual addresses 128, 132 and 135. `x` lives on the stack at virtual address 15KB. Running it makes these memory references:

1. Fetch the instruction at 128.
2. Load from 15KB.
3. Fetch the instruction at 132 (it uses only registers).
4. Fetch the instruction at 135.
5. Store to 15KB.

All five are virtual addresses. The OS wants to put this 16KB process at physical address 32KB, not at 0.

**Static relocation (L11 s11).** A loader rewrites every address in the program when it is loaded. For example, `load 1000` becomes `load 4000` if the program is placed at 3000. This has two problems: there is no protection, and the program is hard to move once it is running.

**Dynamic relocation: base and bounds (L11 s12-15).** Each CPU has two registers, held in the **MMU** (memory management unit):

- **Base:** where the process starts in physical memory.
- **Bounds** (limit): the size of the address space.

On every reference, the hardware does this:

$$
\boxed{\text{if } 0 \le VA < \text{bounds}: \quad PA = VA + \text{base} \qquad \text{else: raise an exception}}
$$

**Worked example (L11 s14).** Base = 32KB (32768), bounds = 16KB:

- Fetch at 128: 128 < 16KB, so PA = 128 + 32768 = **32896**.
- Load from 15KB: 15KB < 16KB, so PA = 15KB + 32KB = **47KB**.

**Second example (L11 s15).** A 4KB address space loaded at 16KB:

| Virtual address | Physical address |
| --- | --- |
| 0 | 16KB (16384) |
| 1KB | 17KB |
| 3000 | 19384 |
| 4400 | **Fault**: 4400 ≥ 4096 |

**What the hardware must provide (L11 s17):**

- Kernel and user modes
- Base and bounds registers
- Circuitry to translate and check bounds
- Privileged instructions to set base and bounds
- Privileged instructions to register exception handlers
- The ability to raise exceptions

If user code could change its own base register, protection would mean nothing.

**What the OS must do (L11 s18-21):**

- **Process creation:** find a free slot using the **free list** (a list of unused physical ranges), and mark it used.
- **Process exit:** put its memory back on the free list.
- **Context switch:** there is only one base/bounds pair per CPU. Save the old process's values into its PCB and load the new process's values. A process can even be *moved* while it is descheduled: copy its memory, then update its saved base.
- **Exceptions:** install handlers at boot. A process that goes out of bounds usually gets killed.

**Timeline (L11 s22-23).**

1. At boot, the OS sets up the trap table, starts the timer, and initializes the process table and free list.
2. Process A runs. The hardware translates every access, and the OS does nothing.
3. A timer interrupt arrives, and the OS switches to B, saving A's base and bounds and loading B's.
4. B loads from an address out of bounds. The hardware traps, and the OS kills B and frees its memory.

**The cost: internal fragmentation (L11 s25).** The whole slot (32KB-48KB here) is reserved, including the unused gap between heap and stack. Space wasted *inside* an allocated unit is **internal fragmentation**. For a 32-bit address space (4GB), this would be absurd.

# Lecture 11, part 2: Segmentation

*L11 s26-49. OSTEP ch 16-17.*

The idea is to give each logical **segment** (code, heap, stack) its **own base and bounds**. Each segment can sit anywhere in physical memory, and the unused gap takes no physical memory at all. This supports **sparse** address spaces: large, but mostly empty.

**Segment registers in the running example (L11 s31):**

| Segment | Base | Size | Grows positive? |
| --- | --- | --- | --- |
| Code | 32K | 2K | yes |
| Heap | 34K | 3K | yes |
| Stack | 28K | 2K | **no** |

**Translating an address.** The key step is to find the **offset within the segment** first, then add that segment's base. The virtual address on its own is not enough.

- **Code, VA 100 (L11 s32):** code starts at virtual 0, so the offset is 100. 100 < 2K, so PA = 32768 + 100 = **32868**.
- **Heap, VA 4200 (L11 s33):** the heap starts at virtual 4KB (4096), so the offset is 4200 − 4096 = 104. PA = 34816 + 104 = **34920**. Adding 4200 + 34K directly would give 39016, which is wrong.
- **An address beyond a segment's size** causes a fault. This is where the name **segmentation fault** comes from (L11 s34).

**Which segment does an address belong to?**

**Explicit approach (L11 s35-36).** Use the top bits of the virtual address. In a 14-bit address space:

- The top 2 bits select the segment: 00 = code, 01 = heap, 11 = stack.
- The low 12 bits are the offset.

VA 4200 = `01 0000 0110 1000`. The top bits `01` mean heap, and the offset is `0x068` = 104, the same answer as before.

```c
Segment = (VirtualAddress & SEG_MASK) >> SEG_SHIFT;  // SEG_MASK = 0x3000, SEG_SHIFT = 12
Offset  = VirtualAddress & OFFSET_MASK;              // OFFSET_MASK = 0xFFF
if (Offset >= Bounds[Segment])
    RaiseException(PROTECTION_FAULT);
else
    PhysAddr = Base[Segment] + Offset;
```

This has two downsides. One of the four segment values goes unused. And each segment can be at most 4KB, a quarter of the address space.

**Implicit approach (L11 s37).** The hardware works out the segment from *how the address was formed*:

- An address from the program counter (an instruction fetch) is in **code**.
- An address based on the stack or base pointer is in the **stack**.
- Anything else is in the **heap**.

This wastes no address bits, but the rules are more complex.

**The stack grows backwards (L11 s39-40).** The hardware needs one more bit per segment: does it grow positive or negative? For a negative segment, the offset is negative.

**Worked example.** VA 15KB is `11 1100 0000 0000`. The segment is 11 (stack) and the raw offset is 3KB. The maximum segment size is 4KB, so the real offset is 3KB − 4KB = **−1KB**. PA = 28KB + (−1KB) = **27KB**. Bounds check: |−1KB| = 1KB ≤ the current size of 2KB, so the access is legal.

**Sharing and protection bits (L11 s41).** Each segment gets permission bits: read, write, execute. Code is marked **read-execute** only, so the same physical code segment can be safely shared by many processes, for example a shared library. A write to a read-only segment raises an exception.

**Coarse vs. fine-grained (L11 s42).**

- **Coarse-grained:** a few large segments (code, heap, stack), held in registers.
- **Fine-grained:** thousands of small segments. These need a **segment table** in memory, as in Multics and the Burroughs B5000.

**OS duties (L11 s43):**

- Save and restore *all* the segment registers on a context switch.
- Grow a segment when asked. For example, `malloc` calls `sbrk()`, and the OS raises the heap's size register if there is room.
- Manage free physical space. This is now hard, because segments come in different sizes.

## External fragmentation and free-space management

Variable-sized segments leave physical memory full of small **holes**. If 24KB is free but split into three 8KB pieces, a 20KB request **fails**. Wasted space *between* allocations is **external fragmentation** (L11 s44).

**Compaction (L11 s45).** Stop the processes, copy their segments together into one block, and update their base registers. This works but is slow, because it copies a lot of memory.

**Free-list strategies (L11 s46; OSTEP ch 17).** Each strategy decides which free chunk to use. Say the free list holds chunks of 10, 30 and 20 bytes, and a request for 15 arrives:

| Strategy | Rule | Picks | Leftover |
| --- | --- | --- | --- |
| Best fit | Smallest chunk that fits | 20 | 5 (tends to leave tiny, useless slivers) |
| Worst fit | Largest chunk | 30 | 15 (keeps big chunks, but must search the whole list) |
| First fit | First chunk that fits | 30 | 15 (fast; small pieces pile up at the front of the list) |
| Next fit | First fit, starting where the last search stopped | depends | Spreads allocations through the list |

On `free`, an allocator **coalesces**: if the freed chunk is next to another free chunk, it merges them into one bigger chunk. No strategy removes fragmentation completely.

**Buddy allocation (L11 s47).** Free memory is one block of size 2^N. To serve a request, keep splitting a block in half until the next split would be too small. For a 7KB request from 64KB: 64 → 32 → 16 → **8KB**, and the 8KB block is handed out. That wastes 1KB *inside* the block, which is internal fragmentation.

The benefit is fast **coalescing** on free. A block's "buddy" is the other half of the same split. Its address differs from the block's address in exactly one bit, so it is easy to find. If the buddy is free, merge the two, then check the merged block's buddy, and so on up.

**Two kinds of waste (L11 s48).**

|  | Internal fragmentation | External fragmentation |
| --- | --- | --- |
| Where | Unused space *inside* an allocated unit | Free space *between* allocated units, in pieces too small to use |
| Caused by | Fixed or rounded-up sizes (base and bounds, buddy, paging) | Variable sizes (segmentation, malloc) |
| Fix | Smaller units | Compaction, smarter allocation, or fixed-size units (paging) |

**Segmentation summary.** It supports sparse address spaces, translates quickly, and allows sharing. But it suffers from external fragmentation, and it does not help a single segment that is itself large and sparse, such as a big heap with few used parts. Paging, next, fixes both.

# Lecture 12, part 1: Paging

*L12 s3-24. OSTEP ch 18, Silb 9.3. Tutorial 3 s2-6. Homework 03.*

There are two ways to manage space. You can cut it into **variable-sized** pieces, as segmentation does, which leads to external fragmentation. Or you can cut it into **fixed-sized** pieces. **Paging** is the second way:

- The virtual address space is divided into **pages**, all the same size.
- Physical memory is divided into **page frames** of that same size.
- Any page can go into any free frame.

The idea dates back to the Atlas computer in the early 1960s.

**Advantages (L12 s8):**

- **No external fragmentation.** Every free frame is as good as any other.
- **Simple free-space management.** The OS keeps a list of free frames. A 4-page address space just takes any 4 free frames.
- **Flexibility.** It makes no assumptions about how the heap and stack grow, or how sparse the address space is.

There is still a little **internal** fragmentation: on average, half of the last page in each region goes unused.

**Tiny example (L12 s6-9).**

- A 64-byte address space with 16-byte pages has 4 virtual pages (VP 0-3).
- Physical memory is 128 bytes, so it has 8 frames. Frame 0 belongs to the OS.
- The **page table** for this process: VP0 → PF3, VP1 → PF7, VP2 → PF5, VP3 → PF2.

One slide lists VP3 → frame 4. The figure and the page table both say frame 2, which matches OSTEP.

Each **process has its own page table**. The same VPN in two processes maps to different frames, which is what gives isolation.

## Splitting a virtual address

A virtual address has two parts:

- The **VPN** (virtual page number) picks the page.
- The **offset** picks the byte within that page.

If the page size is 2^k bytes, the low k bits are the offset, and the remaining high bits are the VPN.

**Worked example: translate VA 21 (L12 s11).**

1. The address space is 64 bytes, so addresses have 6 bits. Pages are 16 bytes, so the offset is 4 bits and the VPN is 2 bits.
2. 21 = `01 0101`, so VPN = `01` = 1 and offset = `0101` = 5.
3. The page table says VP1 → PF7 = `111`.
4. Replace the VPN with the PFN and keep the offset: `111 0101` = **117**.

**The offset is never translated.** Only the page number changes.

```c
VPN      = (VirtualAddress & VPN_MASK) >> SHIFT;   // here VPN_MASK = 0x30, SHIFT = 4
offset   = VirtualAddress & OFFSET_MASK;           // OFFSET_MASK = 0x0F
PhysAddr = (PFN << SHIFT) | offset;
```

## Page-table entries (PTEs)

The simplest page table is a **linear page table**: an array indexed by VPN. Each element is a **PTE**, which holds the PFN plus several bits (L12 s15-17):

| Bit | Meaning |
| --- | --- |
| **Valid** | Is this page part of the address space at all? The unused middle of a sparse address space is marked invalid and needs **no frame**. Touching it traps, and the process is usually killed |
| **Protection** | May the page be read, written, executed? Code is usually read and execute only |
| **Present** | Is the page in RAM right now, or swapped out to disk? (See 3.8) |
| **Dirty** | Has the page been written since it was loaded? A dirty page must be written back to disk before it is evicted |
| **Reference / accessed** | Was the page used recently? Used by page replacement (3.9) |

On **x86** (L12 s17), the PTE holds:

- P (present)
- R/W (writes allowed)
- U/S (user-mode access allowed)
- A (accessed) and D (dirty)
- Caching bits: PWT, PCD, PAT, G
- The PFN, in bits 31-12

x86 has no separate valid bit. P = 0 traps, and the OS decides whether that page is invalid or just swapped out.

On **RISC-V Sv39**, which xv6 uses (Tutorial 3 s6), the PTE flags are:

- **V**: valid
- **R**, **W**, **X**: read, write, execute
- **U**: accessible from user mode

In xv6:

- Text pages are mapped R, X, U, but **not W**, so a program cannot overwrite its own code.
- Data, heap and stack pages are mapped R, W, U.
- Below the user stack there is a **guard page** without the U bit. A stack overflow hits it and causes a page fault, instead of silently overwriting the heap.

## Two problems with paging

**Problem 1: page tables are big (L12 s12).**

- A 32-bit address space with 4KB pages has a 12-bit offset and a 20-bit VPN.
- That is 2²⁰ ≈ 1 million PTEs. At 4 bytes each, the table is **4MB per process**.
- 100 processes would need **400MB** just for page tables.

The tables are far too big for the MMU chip, so they live in memory. The hardware only holds the **page-table base register** (PTBR) pointing to the current process's table:

- On x86 this is CR3.
- On RISC-V it is `satp`.

The OS changes it on every context switch.

**Problem 2: paging is slow (L12 s18-20).** Every memory reference now needs an *extra* memory read to fetch the PTE first:

```c
VPN     = (VirtualAddress & VPN_MASK) >> SHIFT;
PTEAddr = PTBR + (VPN * sizeof(PTE));
PTE     = AccessMemory(PTEAddr);                 // the extra reference
if (PTE.Valid == False)
    RaiseException(SEGMENTATION_FAULT);
else if (CanAccess(PTE.ProtectBits) == False)
    RaiseException(PROTECTION_FAULT);
else {
    offset   = VirtualAddress & OFFSET_MASK;
    PhysAddr = (PTE.PFN << PFN_SHIFT) | offset;
    Register = AccessMemory(PhysAddr);
}
```

**Memory trace of `array.c` (L12 s21-23).** This loop zeroes a 1000-element array:

```c
int array[1000];
for (i = 0; i < 1000; i++)
    array[i] = 0;
```

It compiles to 4 instructions:

```
1024  movl $0x0,(%edi,%eax,4)   ; array[i] = 0
1028  incl %eax                 ; i++
1032  cmpl $0x03e8,%eax         ; compare i with 1000
1036  jne  1024
```

The setup: a 64KB address space with 1KB pages. The page table is at physical address 1KB. The code is in VPN 1 → PFN 4. The array spans VA 40000-44000, which is VPNs 39-42 → PFNs 7-10.

Each loop iteration makes:

- 4 instruction fetches, each needing a PTE read first, so 8 accesses.
- 1 store to `array[i]`, also needing a PTE read first, so 2 accesses.

That is **10 memory accesses** for 4 instructions: five for page tables and five "real" ones. Paging alone makes the program more than twice as slow. The TLB fixes this.

# Lecture 12, part 2: The TLB

*L12 s25-43. OSTEP ch 19.*

The **TLB** (translation-lookaside buffer) is a small, very fast **hardware cache of VPN → PFN translations**. It is part of the MMU. On every memory reference, the hardware checks the TLB first:

- On a **hit**, the translation is used right away, with no page-table access.
- On a **miss**, the hardware (or OS) reads the page table, puts the translation into the TLB, and **retries** the instruction. The retry then hits.

```c
VPN = (VirtualAddress & VPN_MASK) >> SHIFT;
(Success, TlbEntry) = TLB_Lookup(VPN);
if (Success == True) {                                   // TLB hit
    if (CanAccess(TlbEntry.ProtectBits) == True) {
        Offset   = VirtualAddress & OFFSET_MASK;
        PhysAddr = (TlbEntry.PFN << SHIFT) | Offset;
        Register = AccessMemory(PhysAddr);
    } else RaiseException(PROTECTION_FAULT);
} else {                                                 // TLB miss
    PTEAddr = PTBR + (VPN * sizeof(PTE));
    PTE = AccessMemory(PTEAddr);
    if (PTE.Valid == False)                       RaiseException(SEGMENTATION_FAULT);
    else if (CanAccess(PTE.ProtectBits) == False) RaiseException(PROTECTION_FAULT);
    else {
        TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits);
        RetryInstruction();
    }
}
```

**Worked example: array access (L12 s29-30).**

- Addresses are 8 bits, pages are 16 bytes, so the VPN is 4 bits and the offset is 4 bits.
- An array of ten 4-byte ints starts at VA 100 = `0110 0100`, so a\[0\] is at VPN 6, offset 4.
- Page 6 holds a\[0\]-a\[2\]. Page 7 holds a\[3\]-a\[6\]. Page 8 holds a\[7\]-a\[9\].

| Access | a0 | a1 | a2 | a3 | a4 | a5 | a6 | a7 | a8 | a9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1st pass | miss | hit | hit | miss | hit | hit | hit | miss | hit | hit |

The first pass hits **70%** of the time, even though every page is touched for the first time. That is **spatial locality**: neighbours share a page. A second pass hits 100%, which is **temporal locality**: recently used translations are reused. With realistic 4KB pages, a dense array scan misses only about once per page, which is once every 1024 ints.

**Who handles a TLB miss? (L12 s32-34)**

|  | Hardware-managed (CISC, x86) | Software-managed (RISC: MIPS, SPARC) |
| --- | --- | --- |
| On a miss | Hardware **walks the page table** itself, using CR3, then fills the TLB and retries | Hardware raises an **exception**; the OS's TLB-miss handler looks up the translation, writes the TLB with a privileged instruction, and returns from the trap |
| Page-table format | Fixed by the hardware | Any structure the OS likes |
| Pros | Fast; the OS is not involved | Flexible, and the hardware is simple |

Two subtle points for software-managed TLBs:

1. The return-from-trap must **retry the same instruction**, not move on to the next one as a system call would. So the hardware saves a different PC depending on the kind of trap.
2. The miss handler itself must not miss in the TLB, or it would loop forever. Fix this by keeping the handler in **unmapped** physical memory, or by **wiring** some TLB entries so they are always present.

**What a TLB entry holds (L12 s35).**

- VPN, PFN, a valid bit, protection bits, and often an ASID and a dirty bit.
- TLBs are typically 32-128 entries and **fully associative**: any translation can sit in any slot, and the hardware searches all slots in parallel.
- The TLB valid bit is different from the PTE valid bit. An invalid TLB entry is just an empty slot. An invalid PTE means the page was never allocated.

**Context switches (L12 s36-38).** TLB entries belong to one process. P1's VPN 10 → PFN 100 and P2's VPN 10 → PFN 170 cannot both be used. There are two solutions:

1. **Flush the TLB** on every context switch by clearing all valid bits. Hardware-managed TLBs flush when CR3 changes. This is simple, but each process starts with a burst of misses.
2. **Address-space identifiers (ASIDs).** Tag every entry with a short process ID, usually 8 bits. The OS sets the current ASID on each switch, and entries from different processes coexist. Nothing needs flushing.

**Sharing (L12 s39).** Two entries with *different* VPNs can map to the *same* PFN. For example, P1's VPN 10 and P2's VPN 50 can both point to PFN 101, marked r-x. This is how shared libraries and shared code save memory.

**Replacement (L12 s40).** When the TLB is full, which entry goes?

- **LRU** evicts the least recently used entry and exploits locality.
- **Random** is simple and avoids LRU's corner case. With a 3-entry TLB and a loop over 4 pages, LRU **misses on every access**, because it always evicts the very entry needed next. Random does much better there.

**Real example: MIPS R4000 (L12 s41).** It has a software-managed TLB, a 32-bit address space and 4KB pages. Each entry holds:

- A **19-bit VPN**: user addresses use only half the space; the kernel has the rest.
- A 24-bit PFN, so it can address up to 64GB of physical memory.
- A **G** (global) bit: the entry is shared by all processes, and the ASID is ignored.
- An 8-bit ASID, 3 coherence bits, a dirty bit and a valid bit.

A *wired* register reserves some slots for the OS. The OS manages entries with four privileged instructions: TLBP (probe), TLBR (read), TLBWI (write indexed) and TLBWR (write random).

**TLB coverage and Culler's law (L12 s42).** "RAM isn't always RAM": if a program touches more pages than the TLB can map, it misses constantly. Timing a loop that touches more and more pages shows jumps where each TLB level runs out, roughly 5 ns, then 20 ns, then 70 ns per access. **Larger pages** (2MB or 1GB "huge pages") increase coverage. Databases use them for large, randomly accessed data.

**Effective access time.** With TLB hit rate h, TLB lookup time t and memory access time m, using a linear page table:

$$
\boxed{EAT = h\,(t + m) + (1-h)\,(t + 2m)}
$$

**Example.** t = 1 ns, m = 100 ns, h = 0.99: EAT = 0.99 × 101 + 0.01 × 201 = **102 ns**. That is only 2% slower than having no virtual memory. With a two-level page table, a miss costs t + 3m.

# Lecture 13, part 1: Smaller page tables

*L13 s3-28. OSTEP ch 20, Silb 9.4. Tutorial 3 s4-12.*

A linear page table costs 4MB per process on a 32-bit machine, and most of it is wasted. Look at a sparse address space with 16KB of space and 1KB pages, so 16 PTEs (L13 s8):

- Only VPN 0 (code → PFN 10), VPN 4 (heap → PFN 23), and VPNs 14-15 (stack → PFNs 28 and 4) are valid.
- The other 12 entries are invalid. They still take up space in the table.

The slides cover five ways to shrink the table. Each one trades away time, flexibility or simplicity.

## 1. Bigger pages (L13 s6-7)

With 16KB pages instead of 4KB pages on a 32-bit machine:

- The VPN shrinks to 18 bits, and the offset grows to 14 bits.
- The table has 2¹⁸ entries × 4 bytes = **1MB**, four times smaller.

The downside is **internal fragmentation**: programs use only small parts of each big page, so memory fills with mostly empty pages. That is why the normal page size stays small: 4KB on x86, 8KB on SPARC. Many CPUs also support huge pages (2MB, 4MB, 1GB), but mainly to reduce TLB misses, not to save page-table space.

## 2. Hybrid: paging plus segments (L13 s8-11)

This idea comes from Multics. Keep a separate **page table per segment** (code, heap, stack), so the unused space between heap and stack needs no PTEs. The MMU keeps a base/bounds pair per segment, but with new meanings:

- **Base** holds the *physical address of that segment's page table*.
- **Bounds** holds *how many pages* that segment's table has (the number of valid pages).

On a 32-bit machine with 4KB pages, the virtual address splits as **Seg (2 bits) | VPN (18 bits) | offset (12 bits)**. Segment 01 is code, 10 is heap, 11 is stack, and 00 is unused. On a TLB miss:

```c
SN           = (VirtualAddress & SEG_MASK) >> SN_SHIFT;
VPN          = (VirtualAddress & VPN_MASK) >> VPN_SHIFT;
AddressOfPTE = Base[SN] + (VPN * sizeof(PTE));
```

For example, if code uses pages 0-2, its table has 3 entries and bounds = 3. An access to code page 3 raises an exception.

The downsides:

- It still assumes a code/heap/stack layout. A large, sparse heap still wastes PTEs.
- Page tables now come in **different sizes**, so external fragmentation returns when allocating them.

## 3. Multi-level page tables (L13 s12-25)

This is what x86, ARM and RISC-V actually use.

**The idea:**

1. Cut the linear page table into **page-sized pieces**.
2. If a whole piece contains only invalid PTEs, **don't allocate it at all**.
3. Keep a **page directory** that records, for each piece, whether it exists and which frame it is in.

Each **page-directory entry (PDE)** holds a valid bit and a PFN. The PFN points to a page *of the page table*, not to a data page. A valid PDE means at least one PTE on that page is valid. An invalid PDE means the whole page of PTEs does not exist.

**Benefits:**

- Page-table memory grows with the amount of address space actually *used*.
- Each piece fits exactly in one page, so the OS just grabs a free frame when the table needs to grow. No large contiguous block is needed.

**Cost:** a TLB miss now needs **two** memory reads (the PDE, then the PTE) instead of one. This is a classic **time-space trade-off**. When the TLB hits, which is most of the time, both designs perform the same.

**Worked example (L13 s16-22).**

- The address space is 16KB with 64-byte pages, so addresses are 14 bits: an **8-bit VPN** and a **6-bit offset**.
- A linear table would have 2⁸ = 256 PTEs × 4 bytes = 1KB, which is 16 pages of 64 bytes.
- Each page of the table holds 64 / 4 = 16 PTEs.
- Used pages: VPN 0-1 (code), 4-5 (heap) and 254-255 (stack).

Splitting the VPN:

- The table is 16 pages, so the directory needs 16 entries, indexed by the **top 4 bits** of the VPN.
- Each page of the table has 16 PTEs, indexed by the **bottom 4 bits**.
- The address is laid out as **PD index (4) | PT index (4) | offset (6)**.

```c
PDEAddr = PageDirBase + (PDIndex * sizeof(PDE));
PTEAddr = (PDE.PFN << SHIFT) + (PTIndex * sizeof(PTE));
```

| Directory entry | Valid | Points to | Contents |
| --- | --- | --- | --- |
| 0 | yes | PFN 100 | PTEs for VPN 0-15: VPN 0 → 10 (r-x), 1 → 23 (r-x), 4 → 80 (rw-), 5 → 59 (rw-); the rest invalid |
| 1-14 | no | (nothing allocated) |  |
| 15 | yes | PFN 101 | PTEs for VPN 240-255: 254 → 55 (rw-), 255 → 45 (rw-); the rest invalid |

Space used: **3 pages** (1 directory page + 2 page-table pages) instead of 16, about 5 times less. For real 32- or 64-bit address spaces, the saving is enormous.

**Translating VA 0x3F80:**

1. 0x3F80 = `11 1111 1000 0000`, so VPN = `1111 1110` = 254 and offset = `000000`.
2. The PD index is `1111` = 15. Entry 15 is valid and points to the table page at PFN 101.
3. The PT index is `1110` = 14. Entry 14 of that page is valid: PFN 55 = `110111`, rw-.
4. PA = (55 << 6) | 0 = `00 1101 1100 0000` = **0x0DC0**.

**More than two levels (L13 s23-24).** The rule is that **every piece of the tree, including the directory, should fit in one page**. Example:

- A 30-bit virtual address with 512-byte pages has a 9-bit offset and a **21-bit VPN**.
- A 512-byte page holds 512 / 4 = 128 PTEs, so the PT index is **7 bits**.
- That leaves 14 bits for the directory: 2¹⁴ entries × 4 bytes = 64KB = **128 pages**. The directory no longer fits in one page.
- Fix: split it into two levels of 7 bits each. The address becomes **PD0 (7) | PD1 (7) | PT (7) | offset (9)**.

**General recipe.**

1. Bits per level = log₂(page size / PTE size).
2. Number of levels = ceil(VPN bits / bits per level).

**Real example: RISC-V Sv39 (xv6, Tutorial 3 s4-5).**

- 39-bit virtual addresses and 4KB pages give a 12-bit offset.
- PTEs are 8 bytes, so a page holds 512 of them, which is 9 bits per level.
- 27 / 9 = **3 levels**: VA = **VPN\[2\] (9) | VPN\[1\] (9) | VPN\[0\] (9) | offset (12)**.
- The `satp` register points to the root table. The hardware walks the three levels.
- In xv6, `walk()` in `vm.c` does the same walk in software when the kernel needs to find a PTE.

**Multi-level TLB-miss path (L13 s25).**

```c
// TLB miss, two-level table, hardware-managed
PDIndex = (VPN & PD_MASK) >> PD_SHIFT;
PDEAddr = PDBR + (PDIndex * sizeof(PDE));
PDE = AccessMemory(PDEAddr);
if (PDE.Valid == False) RaiseException(SEGMENTATION_FAULT);
else {
    PTIndex = (VPN & PT_MASK) >> PT_SHIFT;
    PTEAddr = (PDE.PFN << SHIFT) + (PTIndex * sizeof(PTE));
    PTE = AccessMemory(PTEAddr);
    if (PTE.Valid == False)                       RaiseException(SEGMENTATION_FAULT);
    else if (CanAccess(PTE.ProtectBits) == False) RaiseException(PROTECTION_FAULT);
    else { TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits); RetryInstruction(); }
}
```

## 4. Inverted page tables (L13 s26)

Keep **one table for the whole system**, with **one entry per physical frame**. Each entry says which process and which virtual page is using that frame. The table's size depends only on the amount of RAM, not on the number of processes.

The catch: translating means *searching* for the entry matching (pid, VPN). So systems add a **hash table** keyed on (pid, VPN). PowerPC uses this design.

## 5. Swapping the page tables themselves (L13 s27)

Put page tables in *kernel virtual memory*. Then parts of them can be swapped out to disk when memory is tight, like any other page.

**Summary (L13 s28).**

| Approach | Saves space by | Costs |
| --- | --- | --- |
| Bigger pages | Fewer entries | Internal fragmentation |
| Hybrid | One small table per segment | Needs segmentation; tables of varying size cause external fragmentation |
| Multi-level | Allocating only the used pieces | Extra memory reads on a TLB miss; more complex |
| Inverted | One entry per physical frame | Searching (needs a hash table); sharing is harder |

In every case, it is time against space. Bigger tables make TLB misses faster. Systems short on memory prefer small tables. With a software-managed TLB, the OS can use any structure it likes.

# Lecture 13, part 2: Swapping mechanisms

*L13 s29-44. OSTEP ch 21, Silb 10.1-10.2. Tutorial 3 s13-14.*

So far, every page of every process fitted in RAM. Now we want many processes with large address spaces, together bigger than RAM. We add a level below memory in the hierarchy: the **disk**, which is bigger and much slower.

**Why bother? (L13 s30).** So programmers never need to think about whether their data fits. Older systems used **overlays**: the programmer manually loaded and unloaded pieces of code and data. Virtual memory does this automatically and invisibly.

**Swap space (L13 s31-32).** A reserved area of disk, read and written in page-sized blocks. The OS remembers the **disk address** of every swapped-out page.

**Example.** Physical memory has 4 frames. Proc 0, 1 and 2 have some pages in RAM and some in swap. Proc 3 has all its pages in swap, so it is not running at the moment.

The size of swap limits how many pages can be in use at once.

Swap is not the only disk location. **Code pages** come from the program's binary file. If the OS needs a frame, it can simply drop a clean code page and read it again from the binary later. **Clean** pages never need to be written to swap.

## The present bit and page faults

Each PTE gets a **present bit** (L13 s33-34):

- **Present = 1:** the page is in RAM, and the PFN field says which frame holds it.
- **Present = 0:** the page is on disk. The OS reuses the PFN bits to store the page's **disk address**.

Accessing a page that is valid but not present is a **page fault** (L13 s35). The name is misleading, because the access is perfectly legal; it is really a "page miss". It is called a fault because the hardware raises an exception, the same mechanism it uses for an illegal access.

**Who handles a page fault? Always the OS (L13 s36),** even on machines with hardware-managed TLBs. There are two reasons:

1. The disk is so slow (milliseconds) that the extra time to run OS code (microseconds) does not matter.
2. The hardware would have to understand swap space and disk I/O, which is far too complex.

**On a TLB miss, there are three possible outcomes (L13 s40):**

| Case | PTE | What happens |
| --- | --- | --- |
| 1 | Valid, permitted, **present** | Put the translation into the TLB and retry. No disk involved |
| 2 | Valid, **not present** | **Page fault.** The OS fetches the page from disk |
| 3 | **Invalid** (or a protection violation) | Segmentation or protection fault. The OS usually kills the process |

**Hardware side (L13 s39).** This is the same as the TLB-miss code, plus one new check:

```c
else if (PTE.Present == True) {
    TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits);
    RetryInstruction();
} else if (PTE.Present == False)
    RaiseException(PAGE_FAULT);
```

**OS side, the page-fault handler (L13 s41):**

```c
PFN = FindFreePhysicalPage();
if (PFN == -1)                       // no free frame
    PFN = EvictPage();               // run the replacement policy (3.9)
DiskRead(PTE.DiskAddr, PFN);         // process sleeps (Blocked) during the I/O
PTE.present = True;
PTE.PFN     = PFN;
RetryInstruction();                  // TLB miss again, then a TLB hit
```

If the evicted page is **dirty**, it must be written to disk first. That costs a second disk I/O.

**Overlap (L13 s37).** While process A waits for its page to come from disk, A is **Blocked**, and the OS runs process B. The CPU is not idle. This is the same CPU-I/O overlap as in Unit 1.

**Cost of one page fault (L13 s38).** Disk is 10,000-100,000 times slower than memory. A program that faults often runs at disk speed.

**When does eviction really happen? (L13 s42-43)** The OS does not wait until memory is completely full. It keeps two thresholds:

- **Low watermark (LW):** when fewer than LW frames are free, a background thread, the **swap daemon** or **page daemon**, wakes up.
- **High watermark (HW):** the daemon evicts pages until HW frames are free, then goes back to sleep.

Doing this in the background lets the OS **cluster** writes: it writes many dirty pages to swap in one large disk operation, which saves seek and rotation time. The page-fault handler simply asks the daemon for free frames.

**Lazy allocation in xv6 (Tutorial 3 s14).** When a process calls `sbrk(n)` with `SBRK_LAZY`, xv6 only records the new size. It allocates no frames and creates no PTEs. The first touch of each new page causes a page fault. The handler then allocates a frame with `kalloc()`, maps it with `mappages()`, and returns, and the instruction is retried. Memory the program never touches is never allocated. With `SBRK_EAGER`, xv6 allocates immediately through `uvmalloc()`.

**Two more tricks of the same kind (OSTEP ch 23):**

- **Demand zeroing:** a new heap page is mapped but not zeroed until it is first touched.
- **Copy-on-write (COW):** on `fork()`, the child shares the parent's frames, marked **read-only**. The first write by either process causes a fault, and only then does the OS copy that one page. Most children call `exec()` straight away, so most pages are never copied.

# Lecture 13, part 3: Page replacement policies

*L13 s45-67. OSTEP ch 22, Silb 10.4, 10.6.*

When memory is full, which page should be evicted? Think of RAM as a **cache** of all virtual pages. The goal is to keep the miss rate low, because a miss means a trip to disk.

**Average memory access time (L13 s46-47):**

$$
\boxed{AMAT = T_M + P_{miss} \cdot T_D}
$$

T\_M is the memory access time, T\_D is the disk access time, and P\_miss is the miss rate. You always pay T\_M; a miss adds T\_D on top.

**Example.** T\_M = 100 ns and T\_D = 10 ms:

| Hit rate | AMAT |
| --- | --- |
| 90% | 100 ns + 0.1 × 10 ms ≈ **1 ms** |
| 99.9% | 100 ns + 0.001 × 10 ms = **10.1 µs** (100 times faster) |
| 100% | 100 ns |

The disk is so slow that even a tiny miss rate dominates the average.

**Three kinds of misses (L13 s50):**

- **Compulsory** (cold-start): the first touch of a page; it can never be in the cache before that.
- **Capacity**: the cache ran out of room and evicted the page.
- **Conflict**: only happens in hardware caches with limited placement. The OS page cache is fully associative, so it has no conflict misses.

## Worked traces

The slides use one reference stream for every policy, with a cache of 3 frames: **0, 1, 2, 0, 1, 3, 0, 3, 1, 2, 1**.

**Optimal (Belady's MIN) (L13 s48-50): evict the page used *furthest in the future*.**

| Access | 0 | 1 | 2 | 0 | 1 | 3 | 0 | 3 | 1 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Result | M | M | M | H | H | M | H | H | H | M | H |
| Evict |  |  |  |  |  | 2 |  |  |  | 3 |  |
| Cache | 0 | 0,1 | 0,1,2 | 0,1,2 | 0,1,2 | 0,1,3 | 0,1,3 | 0,1,3 | 0,1,3 | 0,1,2 | 0,1,2 |

At the miss on 3, the next uses are: 0 in 1 step, 1 in 3 steps, 2 in 4 steps. So 2 is evicted. The result is **6 hits out of 11 (54.5%)**. Ignoring the 4 compulsory misses, it is 6 of 7 (85.7%). Optimal needs to know the future, so it cannot be built. It is used as a **yardstick** to compare other policies against.

**FIFO (L13 s51): evict the page that has been in memory longest.**

| Access | 0 | 1 | 2 | 0 | 1 | 3 | 0 | 3 | 1 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Result | M | M | M | H | H | M | M | H | M | M | H |
| Evict |  |  |  |  |  | 0 | 1 |  | 2 | 3 |  |
| Queue (oldest first) | 0 | 0,1 | 0,1,2 | 0,1,2 | 0,1,2 | 1,2,3 | 2,3,0 | 2,3,0 | 3,0,1 | 0,1,2 | 0,1,2 |

The result is **4 hits (36.4%)**. FIFO evicted page 0 even though it is used constantly, because FIFO ignores how often or how recently a page is used.

**Random (L13 s53-54): evict a random page.** It is simple, and its result depends on luck. In one run it got 5 hits. Over 10,000 runs, it matched optimal (6 hits) a little over 40% of the time, and sometimes got 2 hits or fewer.

**LRU (L13 s55-56): evict the least recently used page.** It uses the past to predict the future, relying on **locality**.

| Access | 0 | 1 | 2 | 0 | 1 | 3 | 0 | 3 | 1 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Result | M | M | M | H | H | M | H | H | H | M | H |
| Evict |  |  |  |  |  | 2 |  |  |  | 0 |  |
| Cache (LRU → MRU) | 0 | 0,1 | 0,1,2 | 1,2,0 | 2,0,1 | 0,1,3 | 1,3,0 | 1,0,3 | 0,3,1 | 3,1,2 | 3,2,1 |

The result is **6 hits**, matching optimal on this stream.

LFU (least frequently used) is the frequency-based version of the same idea. The opposites, MRU and MFU, do badly, because they ignore locality.

## Belady's anomaly (L13 s52)

You would expect a bigger cache never to hurt. With FIFO, it can. On the stream **1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5**:

- FIFO with **3 frames** gets 3 hits (9 faults).
- FIFO with **4 frames** gets only 2 hits (10 faults).

LRU and Optimal have the **stack property**: the contents of a cache of size N are always a subset of the contents of a cache of size N+1. So adding memory can never hurt them. FIFO and Random do not have this property.

## How policies compare on different workloads (L13 s57-59)

| Workload | What it looks like | Result |
| --- | --- | --- |
| **No locality** | Each access goes to a random one of 100 pages | LRU, FIFO and Random are all equal; the hit rate depends only on cache size. Optimal is better |
| **80-20** | 80% of accesses go to 20% of the pages (the "hot" pages) | LRU beats FIFO and Random, because it keeps the hot pages |
| **Looping sequential** | Pages 0..49 in order, repeated | **LRU and FIFO get 0% hits** with any cache under 50 pages: they always evict the page needed next. Random does much better |

## Approximating LRU: the clock algorithm (L13 s60-63)

True LRU must update a list or a timestamp on *every* memory access, and finding the oldest page means scanning every frame. With 4GB of RAM and 4KB pages, that is about 1 million frames. Far too slow.

Instead, the hardware sets a **use bit** (reference bit) in the PTE whenever a page is read or written. Only the OS clears it. The **clock algorithm** works like this:

- Arrange the frames in a circle, with a "clock hand" pointing at one of them.
- When a page must be evicted, look at the page under the hand.
- If its **use bit is 1**, the page was used recently. Clear the bit (giving it a "second chance") and move the hand on.
- If its **use bit is 0**, evict that page.

**Example.** Pages A-F, with the hand at A. A has u = 1, so clear it and move on. B has u = 1, so clear it and move on. C has u = 0, so **C is evicted**.

Clock does not match perfect LRU, but it does clearly better than FIFO or Random on the 80-20 workload.

**Dirty pages (L13 s64).** Evicting a dirty page costs a disk write; a clean one can simply be dropped. So clock is often extended to use both the use bit and the dirty bit, in this order of preference:

1. Unused and clean: free to evict.
2. Unused and dirty: needs a write-back first.
3. Used and clean.
4. Used and dirty: evict last.

## Other VM policies (L13 s65)

- **Page selection.** *Demand paging* loads a page only when it is touched; this is the default. *Prefetching* loads page P+1 along with P when it is likely to be needed, as in sequential code.
- **Writing pages out.** *Clustering* (grouping) collects pending writes and writes them together.

## Thrashing (L13 s66)

A process's **working set** is the set of pages it is actively using. If the working sets of all running processes add up to more than RAM, the system spends all its time paging and makes almost no progress. This is **thrashing**.

There are two fixes:

- **Admission control:** run fewer processes at once, so that their working sets fit. Doing less work well beats doing everything badly.
- Linux's **out-of-memory (OOM) killer** ends a memory-hungry process.

# Practice problems, Lectures 10 to 13

Try each one before you open its solution. Problems marked **(L08)** are the lecture's own review questions, and **(sheet)** ones come from the "Transport Layer - Practice Questions" PDF.

**M1.** A process has base = 16384 and bounds = 4096 (bounds is the size). Translate the virtual addresses 0, 1000, 4096 and 5000, or say which ones fault.

*Solution.* A virtual address is legal only if it is **less than** bounds. Then PA = VA + base.

| VA | Check | Result |
| --- | --- | --- |
| 0 | 0 < 4096 | 16384 |
| 1000 | 1000 < 4096 | 17384 |
| 4096 | 4096 is not < 4096 | **Fault** (the last legal address is 4095) |
| 5000 | 5000 ≥ 4096 | **Fault** |

---

**M2.** A system uses a 14-bit virtual address. The top 2 bits pick the segment: 00 = code, 01 = heap, 11 = stack. The maximum segment size is therefore 4KB.

| Segment | Base | Size | Grows |
| --- | --- | --- | --- |
| Code (00) | 32K | 2K | Positive |
| Heap (01) | 34K | 3K | Positive |
| Stack (11) | 28K | 2K | Negative |

Translate the virtual addresses 1500, 5000, 7500, 16000 and 13000, or say which ones fault.

*Solution.* The top 2 bits pick the segment, so each segment covers 4096 virtual addresses: 0-4095 is segment 00, 4096-8191 is 01, and 12288-16383 is 11. Subtract the segment's start to get the offset.

| VA | Segment, offset | Check | Physical address |
| --- | --- | --- | --- |
| 1500 | Code, 1500 | 1500 < 2K | 32768 + 1500 = **34268** |
| 5000 | Heap, 5000 − 4096 = 904 | 904 < 3K | 34816 + 904 = **35720** |
| 7500 | Heap, 3404 | 3404 ≥ 3072 | **Fault** |
| 16000 | Stack, 16000 − 12288 = 3712 | See below | **28288** |
| 13000 | Stack, 712 | See below | **Fault** |

The stack grows downward, so its offset is converted to a negative one: negative offset = offset − max segment size (4096).

- For 16000: 3712 − 4096 = −384. |−384| ≤ 2048, so it is legal. PA = 28672 − 384 = **28288**.
- For 13000: 712 − 4096 = −3384. |−3384| > 2048, so it is beyond the stack's 2K: **fault**.

---

**M3.** A free list holds chunks of 20, 10, 40 and 15 bytes, in that order. A request for 12 bytes arrives. Which chunk does each of best fit, worst fit and first fit choose, and how big is the leftover piece? Which strategy tends to leave many tiny unusable pieces, and why?

*Solution.*

| Strategy | Chooses | Leftover |
| --- | --- | --- |
| Best fit (smallest that fits) | 15 | 3 |
| Worst fit (largest) | 40 | 28 |
| First fit (first that fits) | 20 | 8 |

**Best fit** tends to leave many tiny pieces: by choosing the closest fit, it makes the leftover as small as possible, and these slivers are often too small for any later request. Worst fit tries to keep leftovers large, but in practice it also fragments badly, and it must search the whole list.

---

**M4.** A buddy allocator manages 128KB. (a) Show the splits for a 10KB request. How much internal fragmentation is there? (b) A 30KB request follows. Where does it go? (c) Why is coalescing cheap in a buddy system?

*Solution.*

(a) 10KB rounds up to the next power of two, 16KB. The allocator splits 128 into 64 + 64, then one 64 into 32 + 32, then one 32 into 16 + 16, and returns one 16KB block. Internal fragmentation is 16 − 10 = **6KB**.

(b) 30KB rounds up to 32KB. There is a free 32KB block left over from the second split, so it is used directly, with 2KB of internal fragmentation. The free blocks are now one 16KB and one 64KB.

(c) A block's buddy is found by flipping a single bit of its address (the bit that matches the block's size). When a block is freed, the allocator checks that one buddy; if it is also free, the two merge, and this repeats up the levels.

---

**M5.** (a) A 32-bit address space with 8KB pages and 4-byte PTEs: how many bits are in the VPN and offset, and how big is a linear page table? (b) What would 100 such processes cost?

*Solution.*

(a) 8KB = 2¹³, so the **offset is 13 bits** and the **VPN is 32 − 13 = 19 bits**. That is 2¹⁹ = 524,288 PTEs × 4 bytes = **2MB** per process.

(b) 100 processes need **200MB** of page tables. That is why 3.7's smaller-table techniques exist.

---

**M6.** A 1KB address space uses 64-byte pages. The page table is: VPN 0 → PFN 5, VPN 1 → invalid, VPN 2 → PFN 9, VPN 3 → PFN 1. Translate virtual addresses 165, 112 and 200.

*Solution.* A 1KB address space has 10-bit addresses. 64-byte pages mean a 6-bit offset, leaving a 4-bit VPN. VPN = VA / 64 and offset = VA mod 64.

| VA | VPN, offset | PTE | Physical address |
| --- | --- | --- | --- |
| 165 | 2, 37 | PFN 9 | 9 × 64 + 37 = **613** |
| 112 | 1, 48 | Invalid | **Fault**: the OS usually kills the process |
| 200 | 3, 8 | PFN 1 | 1 × 64 + 8 = **72** |

---

**M7.** An array of 12 four-byte ints starts at virtual address 120, and the page size is 32 bytes. A loop reads a\[0\] to a\[11\] once, starting with an empty TLB. How many TLB hits and misses are there, and what is the hit rate? What would happen if the loop ran a second time straight away? Which kind of locality does each pass show?

*Solution.* The ints sit at 120, 124, ..., 164. Page = address / 32:

- Page 3 (96-127) holds a\[0\] and a\[1\]: one miss, then one hit.
- Page 4 (128-159) holds a\[2\] to a\[9\]: one miss, then seven hits.
- Page 5 (160-191) holds a\[10\] and a\[11\]: one miss, then one hit.

That is **3 misses and 9 hits, a 75% hit rate**. These hits come from **spatial locality**: neighbouring elements share a page.

On an immediate second pass, all three translations are still in the TLB (assuming it holds at least three entries), so all 12 accesses hit. Those hits come from **temporal locality**: the same pages are used again soon.

---

**M8.** A TLB lookup takes 2 ns and a memory access takes 100 ns. The page table is a single-level linear table, and the TLB hit rate is 95%. What is the effective memory-access time? What would it be with no TLB at all?

*Solution.*

- On a TLB hit: 2 + 100 = 102 ns.
- On a TLB miss: 2 + 100 (fetch the PTE) + 100 (fetch the data) = 202 ns.
- EAT = 0.95 × 102 + 0.05 × 202 = 96.9 + 10.1 = **107 ns**.

With no TLB, every access needs the PTE and then the data: **200 ns**, nearly twice as slow.

---

**M9.** Use the multi-level setup from 3.7: a 14-bit address space, 64-byte pages and 4-byte PTEs, so one page holds 16 PTEs.

- (a) Split VA 0x1234 into page-directory index, page-table index and offset.
- (b) Suppose PDE\[4\] is valid with PFN 0x20, and entry 8 of that page of the page table is valid with PFN 0x31. What is the physical address?
- (c) How many memory accesses does this take on a TLB miss?
- (d) For a 48-bit address space with 4KB pages and 8-byte PTEs, how many levels are needed if every piece of the page table must fit in one page?

*Solution.*

(a) 0x1234 in 14 bits is `01 0010 0011 0100`.

- The offset is the low 6 bits: `110100` = **52**.
- The VPN is the high 8 bits: `01001000` = 72.
- The page-directory index is the top 4 bits of the VPN: `0100` = **4**.
- The page-table index is the low 4 bits of the VPN: `1000` = **8**.

(b) PA = (PFN << 6) | offset = (0x31 << 6) + 52 = 0xC40 + 0x34 = **0xC74** (3188).

(c) **3 memory accesses**: the page-directory entry, the page-table entry, and the data itself.

(d) A 4KB page holds 4096 / 8 = 512 PTEs, so each level resolves 9 bits. The VPN is 48 − 12 = 36 bits, and 36 / 9 = **4 levels**. This is exactly x86-64's four-level layout.

---

**M10.** With 3 frames, and starting empty, run the reference string **7, 0, 1, 2, 0, 3, 0, 4, 2, 3** under OPT, FIFO and LRU. Give the number of hits for each. How many of the misses are compulsory (cold-start) misses?

*Solution.* All three policies start with 3 compulsory misses (7, 0, 1).

| Ref | FIFO | Frames | LRU | Frames (least recent first) | OPT | Frames |
| --- | --- | --- | --- | --- | --- | --- |
| 7 | M | 7 | M | 7 | M | 7 |
| 0 | M | 7 0 | M | 7 0 | M | 7 0 |
| 1 | M | 7 0 1 | M | 7 0 1 | M | 7 0 1 |
| 2 | M, evict 7 | 0 1 2 | M, evict 7 | 0 1 2 | M, evict 7 (never used again) | 0 1 2 |
| 0 | **H** | 0 1 2 | **H** | 1 2 0 | **H** | 0 1 2 |
| 3 | M, evict 0 | 1 2 3 | M, evict 1 | 2 0 3 | M, evict 1 (never used again) | 0 2 3 |
| 0 | M, evict 1 | 2 3 0 | **H** | 2 3 0 | **H** | 0 2 3 |
| 4 | M, evict 2 | 3 0 4 | M, evict 2 | 3 0 4 | M, evict 0 (never used again) | 2 3 4 |
| 2 | M, evict 3 | 0 4 2 | M, evict 3 | 0 4 2 | **H** | 2 3 4 |
| 3 | M, evict 0 | 4 2 3 | M, evict 0 | 4 2 3 | **H** | 2 3 4 |

**Hits: OPT 4, LRU 2, FIFO 1.** There are 6 distinct pages, so 6 misses are compulsory. OPT's 6 misses are *all* compulsory: no policy could do better on this string.

---

**M11.** Four frames hold pages A, B, C and D, with use bits 1, 0, 1, 1. The clock hand points at A. Page E is requested, and then page F. Which page is evicted each time, and what are the use bits and hand position afterwards?

*Solution.*

**Request E.** A's use bit is 1: clear it to 0 and move on. B's use bit is 0: **evict B**. E goes into B's frame with use bit 1, and the hand moves to C. The state is now A 0, E 1, C 1, D 1, hand at C.

**Request F.** C is 1, so clear it and move on. D is 1, so clear it and move on. A is 0: **evict A**. F goes into A's frame with use bit 1, and the hand moves to E. The state is now F 1, E 1, C 0, D 0, hand at E.

---

**M12.** Memory takes 100 ns and a disk access takes 10 ms. What is the AMAT with a hit rate of 99.9%, and with 99.99%? What does this say about how often a system can afford to page?

*Solution.* AMAT = T\_M + P\_miss × T\_D.

- At 99.9%: 100 ns + 0.001 × 10 ms = 100 ns + 10 µs = **10.1 µs**, about 100 times slower than memory.
- At 99.99%: 100 ns + 1 µs = **1.1 µs**, still 11 times slower.

Even a tiny miss rate dominates, because disk is 100,000 times slower than memory. A system can only afford to page very rarely: in practice, each process's working set must fit in memory.

---

**M13.** (a) What is thrashing, and what are two ways an OS can respond to it? (b) Why can LRU never suffer from Belady's anomaly while FIFO can? (c) Why does a clean page cost less to evict than a dirty one?

*Solution.*

(a) **Thrashing** is when the working sets of the running processes add up to more than physical memory, so the system spends nearly all its time paging and does little useful work. Two responses:

- **Admission control**: run fewer processes (suspend some) so the rest fit in memory.
- **An out-of-memory killer** (as in Linux): kill a memory-hungry process.

(b) LRU has the **stack property**: with N + 1 frames, the pages in memory are always a superset of those with N frames, so adding a frame can never add a miss. FIFO does not have this property, which is why adding a frame can make it worse.

(c) A clean page is identical to its copy on disk, so it can simply be dropped. A dirty page must first be **written back to disk**, which costs an extra I/O.

---

**M14.** In xv6 (Sv39): (a) why are text pages mapped without the W bit? (b) What is the guard page below the user stack for, and why does it lack the U bit? (c) What does `satp` hold, and when does it change?

*Solution.*

(a) So that a program cannot overwrite its own code, whether by a bug or by an attack. A write to a text page causes a page fault.

(b) If the stack overflows, it runs into the guard page, which has no U bit, so user code cannot access it. The result is a **page fault**, instead of silently overwriting the memory below the stack.

(c) `satp` holds the physical page number of the **root page table** of the current address space (plus the mode, Sv39). It changes whenever the CPU switches address space. In xv6, that happens on every trap into and out of the kernel (in the trampoline code), and when the scheduler switches to another process.

---
