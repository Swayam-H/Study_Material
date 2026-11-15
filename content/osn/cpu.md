# Lecture 01: What an operating system is

*Slides: L01. Read: OSTEP ch 2, Silb ch 1 (1.1-1.4, 1.7).*

## 0.1 The job of an OS

An operating system is the layer of software between your programs and the hardware. A program never drives the disk controller or the timer chip directly. It asks the OS, and the OS does the work on its behalf.

The OS has three goals (L01 s9):

1. Run user programs, and make programs easy to write.
2. Make the hardware convenient to use.
3. Use the hardware efficiently.

It does this by **abstracting** each resource (L01 s10). The CPU becomes a *process*, physical memory becomes an *address space*, and the disk becomes *files*. Devices such as cameras and printers are reached through the same kind of interface.

**Example.** Think about `printf("hi\n")`. The C library formats the string, then calls `write(1, "hi\n", 3)`. That is a system call. The OS checks that file descriptor 1 is open, finds the terminal driver behind it, and copies the 3 bytes out. Your program knows nothing about the terminal hardware.

## 0.2 The three pieces

OSTEP is organized around three ideas, and so is this course (L01 s11-15).

**Virtualization.** The OS takes one physical resource and makes it look like many private ones.

- **CPU virtualization (s12).** There are usually more processes than CPUs. The OS switches between them quickly, so each process seems to have a CPU of its own. Which process runs next is decided by a *policy*, the scheduler.
- **Memory virtualization (s13).** The memory that active processes need is often more than the RAM available. Every process gets its own private address space, and the OS maps it onto real memory, using the disk when RAM runs out.

**Concurrency (s14).** Many things happen at the same time: several processes, or several threads inside one process. When they share data, the order of their steps can change the result. The OS gives tools (locks, condition variables, semaphores) to keep shared data correct.

**Persistence (s15).** RAM loses its contents when the power goes. Disks and SSDs keep data, and the file system manages it. The file system turns reads and writes on files into requests to the low-level device driver.

**Example: CPU virtualization (OSTEP ch 2, `cpu.c`).** A program prints a letter in a loop. Run four copies at once on a one-CPU machine and all four make progress, with their output interleaved. The single CPU is being shared so quickly that it looks like four.

**Example: concurrency (OSTEP ch 2, `threads.c`).** Two threads each add 1 to a shared counter 100,000 times. You expect 200,000. With a large enough loop count you often get less, and a different number each run. The reason is that `counter++` is three machine instructions (load, add, store), and the threads can interleave in the middle of them. Unit 4 explains this in detail.

## 0.3 Design goals

When you judge an OS design, these are the questions to ask (L01 s18):

| Goal | What it means |
| --- | --- |
| Abstraction | The system is convenient to use, for example files instead of disk sectors |
| Performance | Low overhead; virtualization must not cost too much time or space |
| Protection | Programs are isolated from each other, and the OS is isolated from programs |
| Reliability | The OS keeps running; if it crashes, every program goes with it |
| Others | Energy efficiency, security, mobility |

## 0.4 From libraries to a protected OS

The first operating systems were just **libraries** of common functions, such as I/O routines (L01 s20). One program ran at a time. A human operator chose the order, and nothing was interactive.

This broke down once several programs shared a machine. If any program could call disk code directly, it could read any file on the disk. The fix was the **system call** (s21-22), which works like this:

- A program does not call OS code like a normal function. It runs a special **trap** instruction.
- The hardware jumps to a **trap handler** that the OS set up in advance, and raises the privilege level to **kernel mode**.
- In kernel mode the OS has full access to the hardware. It does the requested work.
- The OS runs **return-from-trap**. This drops back to **user mode** and resumes the program.
- In user mode, the hardware blocks privileged actions such as direct I/O.

This user/kernel split is the base of everything in Unit 1.

## 0.5 Types of operating systems

| Type | Idea | Example |
| --- | --- | --- |
| Batch | Similar jobs are grouped and run together by an operator; no interaction | Early mainframes |
| Time-sharing (multitasking) | Each task gets a time quantum, then the OS switches; many users at once | UNIX, Multics |
| Distributed | One system spread across networked machines; shares resources and tolerates faults | LOCUS (UCLA, 1980s) |
| Embedded | Small and specialized for one device; compact and reliable | Microwave, router firmware |
| Real-time | Must finish work before a deadline, or the system fails | Car braking, avionics |

# Lecture 02: The process

*Slides: L02-L07. Read: OSTEP ch 4-10, Silb ch 3 and 5. Tutorials 1 and 2. Homework 01 and 02.*

This unit answers one question: how does one CPU run many programs so that each seems to have the CPU to itself? The answer has two halves:

- **Mechanisms** are the low-level tools: system calls, traps and context switches.
- **Policies** are the decisions: which process runs next, and for how long.

*L02. OSTEP ch 4, Silb 3.1-3.2.*

A **program** is code sitting on disk. A **process** is a running instance of it. One program can have many processes at once; for example, three terminal windows each run their own `bash` process.

**What a process is made of (L02 s8-9).** Everything the running program can read or change is called its *machine state*:

| Part | What it holds |
| --- | --- |
| Process ID (PID) | A unique number naming the process |
| Memory image | Code and static data, plus the heap and stack, which grow at run time |
| CPU context | Registers, including the program counter (PC, the next instruction) and stack pointer |
| Open files | File descriptors for files and devices, such as stdin, stdout and stderr |

**How the OS creates a process (L02 s10-11).** Process creation happens in six steps:

1. Load the code and static data from disk into memory. Modern systems do this *lazily*, loading pieces only when they are first used (Unit 3 explains how paging makes this possible).
2. Allocate the **stack**, which holds local variables, function arguments and return addresses. Fill in `argc` and `argv`.
3. Create the **heap**, which holds data from `malloc()`.
4. Set up file descriptors 0, 1 and 2 (stdin, stdout, stderr).
5. Set the PC to the program's entry point.
6. Jump to `main()`.

**Process states (L02 s12-13).** A process is always in one of three states:

- **Running:** it is executing on a CPU right now.
- **Ready:** it could run, but the OS has picked another process.
- **Blocked:** it is waiting for an event, usually I/O such as a disk read or a key press. It cannot run until that event happens.

The moves between states are:

- Ready → Running when the scheduler picks it.
- Running → Ready when it is descheduled, for example when its time slice ends.
- Running → Blocked when it starts I/O.
- Blocked → Ready when the I/O completes.

A blocked process never goes straight to Running; it must be picked again.

**Example (L02 s15).** P0 runs for 3 time units and then starts an I/O that takes 3 units. P1 just computes.

| Time | P0 | P1 | Note |
| --- | --- | --- | --- |
| 1-3 | Running | Ready | P0 starts I/O at the end of time 3 |
| 4-6 | Blocked | Running | The OS runs P1 instead of leaving the CPU idle |
| 7-8 | Ready | Running | P0's I/O is done; P1 finishes at 8 |
| 9-10 | Running | (done) | P0 finishes |

Running P1 while P0 waits keeps the CPU busy. Whether the OS should switch back to P0 the moment its I/O finishes is a *policy* question, covered in 1.4.

**How the OS stores this (L02 s16-19).** The OS keeps a **process list**. Each entry is a **Process Control Block (PCB)**. In xv6 the PCB is `struct proc`. It holds:

- The state (`UNUSED`, `USED`, `SLEEPING`, `RUNNABLE`, `RUNNING`, `ZOMBIE`)
- `pid`, a pointer to the page table, and a pointer to the kernel stack
- `struct context`, the saved registers that the context switch uses
- The trap frame and open files

A **zombie** is a process that has exited but whose parent has not yet called `wait()` to collect its exit status.

# Lecture 03: The process API (fork, exec, wait)

*L03. OSTEP ch 5, Silb 3.3. Tutorial 1. Homework 01. Your `practice/p1.c`-`p3.c` are the OSTEP examples.*

A **system call** is a function call into the OS that runs at a higher privilege level (L03 s3). The four you need for processes are `fork()`, `exec()`, `wait()` and `exit()`.

**`fork()` (L03 s6-8)** creates a new process, the *child*, which is an almost exact copy of the caller, the *parent*:

- The child gets a copy of the parent's memory, registers and open file descriptors.
- Both processes continue from the line right after `fork()`.
- `fork()` returns twice: the child's PID in the parent, and 0 in the child. It returns -1 on failure.
- After the fork, each process changes its own copy of memory independently.
- Which one runs first is decided by the scheduler, so the output order is **not deterministic**.

```c
int main() {
    printf("hello (pid:%d)\n", getpid());
    int rc = fork();
    if (rc < 0) { fprintf(stderr, "fork failed\n"); exit(1); }
    else if (rc == 0) printf("child (pid:%d)\n", getpid());
    else printf("parent of %d (pid:%d)\n", rc, getpid());
}
```

The output can be either order:

```
hello (pid:29146)
parent of 29147 (pid:29146)
child (pid:29147)
```

"hello" prints once, because it ran before the fork.

**`wait()` (L03 s9-10)** makes the parent block until a child exits. It returns that child's PID, or -1 if there are no children. Adding `wait()` in the parent branch makes the output order fixed: the child always prints first. `wait()` also lets the OS free the child's PCB, which is how zombies are cleaned up. `waitpid()` waits for one specific child.

**`exec()` (L03 s11-13)** replaces the current program with a different one. It loads the new executable, overwrites the code and data, resets the heap and stack, and starts `main()` with the new `argv`. A successful `exec()` **never returns**, because the code that called it no longer exists. The process keeps its PID and its open file descriptors.

```c
if (rc == 0) {
    char *args[] = {"wc", "p3.c", NULL};
    execvp(args[0], args);       // only returns on error
    printf("this never prints\n");
}
```

**Why fork and exec are separate calls (L03 s16-17).** A shell runs a loop: read a command, `fork()`, run `exec()` in the child, and `wait()` in the parent. Between the fork and the exec, the child can change its own setup without affecting the shell. That is how redirection works.

For `wc p3.c > out.txt`, the child runs:

```c
close(STDOUT_FILENO);                               // free fd 1
open("out.txt", O_CREAT|O_WRONLY|O_TRUNC, 0644);    // lowest free fd = 1
execvp("wc", args);                                 // wc writes to fd 1 = out.txt
```

`open()` always returns the lowest free descriptor, so the file becomes fd 1. Pipes work the same way, using `pipe()` and `dup2()`.

**Process tree.** Every process except the first (`init`, PID 1) has a parent. If a parent exits before its child, the child becomes an *orphan* and is adopted by `init`, which calls `wait()` for it.

**Useful extras.** `kill()` sends a signal: `SIGINT` from Ctrl-C, `SIGTSTP` from Ctrl-Z, `SIGKILL` to force an exit. `getpid()` and `getppid()` return a process's own PID and its parent's PID.

# Lecture 04: Limited direct execution

*L04. OSTEP ch 6, Silb 1.4 and 2.3. Tutorial 1 s4-7, Tutorial 2 s4-9.*

The fastest way to run a program is to run it directly on the CPU. This raises two problems:

1. **Restricted operations.** How do we stop the program from doing I/O or touching memory it should not, while still letting it ask for those things?
2. **Switching.** While the program is running, the OS is not. How does the OS get the CPU back so it can run another process?

**Limited Direct Execution (LDE)** solves both: let the program run directly, but limit what it can do and make sure the OS can take control back.

## Problem 1: user mode, kernel mode and traps

The hardware has a **mode bit** (L04 s6):

- In **user mode**, privileged instructions such as I/O and changing the page table are blocked. Trying one raises an exception, and the OS usually kills the process.
- In **kernel mode**, the OS can do anything.

To ask for a privileged operation, a program makes a system call:

1. The program puts a **system-call number** in a register and runs a **trap** instruction (`ecall` on RISC-V, `int 0x80` or `syscall` on x86).
2. The hardware saves the user registers onto the process's **kernel stack**, switches to kernel mode, and jumps to the handler.
3. The handler is found through the **trap table**, which the OS sets up at boot. Only the OS can set it, because writing it is a privileged instruction.
4. The OS does the work. It checks the arguments, since it cannot trust user pointers.
5. **Return-from-trap** restores the registers, switches back to user mode, and resumes the program at the instruction after the trap.

The program cannot choose *where* in the kernel to jump; it can only pick a system-call number. That is the key protection.

**Interrupt vs. trap (L04 s8).**

- An **interrupt** comes from outside the running program, for example a timer, a disk or a keyboard.
- A **trap** is caused by the program itself, either on purpose (a system call) or by mistake (an exception, such as dividing by zero or a bad memory access).

**The full timeline (L04 s9-10).**

1. At boot, the OS (kernel mode) fills the trap table.
2. To start a program, the OS:
   1. Makes a process-list entry.
   2. Allocates memory and loads the program.
   3. Sets up the user stack with `argv`.
   4. Puts the initial registers on the kernel stack.
   5. Runs return-from-trap. The hardware restores the registers, switches to user mode and jumps to `main()`.
3. When the program makes a system call, it traps in, the OS handles it, and return-from-trap brings it back.
4. When `main` returns, `exit()` traps in, and the OS frees the process's memory and removes it from the list.

## Problem 2: getting the CPU back

**Cooperative approach (L04 s11).** The OS waits for the process to make a system call, call `yield()`, or cause an exception. A program stuck in an infinite loop never does any of these, so the only fix would be a reboot. Early Mac OS worked this way.

**Non-cooperative approach (L04 s12).** At boot, the OS starts a **timer** that raises an interrupt every few milliseconds. On each interrupt, the running process stops and the OS's interrupt handler runs. The OS then decides whether to keep running the current process or to switch to another one. Starting the timer is privileged, so a process cannot turn it off.

**Context switch (L04 s13-15).** When the scheduler decides to switch from process A to process B:

1. The timer interrupt makes the *hardware* save A's user registers onto A's kernel stack, and enter the kernel.
2. The OS calls `switch()`. This *software* step saves A's kernel registers into A's PCB (`proc->context`).
3. `switch()` loads B's kernel registers from B's PCB, including the stack pointer, so the CPU is now on B's kernel stack.
4. Return-from-trap restores B's user registers from B's kernel stack and resumes B.

There are two saves. The hardware saves the *user* registers on a trap, and the OS saves the *kernel* registers on a switch. In xv6, `swtch.S` saves only the callee-saved registers (`ra`, `sp`, `s0`-`s11`), because the C calling convention already preserves the rest (Tutorial 2 s7).

**xv6 scheduler loop (Tutorial 2 s8-9).**

- Each CPU runs `scheduler()`. It loops over `proc[]`, finds a `RUNNABLE` process, marks it `RUNNING`, and calls `swtch(&c->context, &p->context)`.
- On a timer interrupt, `usertrap()` calls `yield()`. That sets the process back to `RUNNABLE` and runs `sched()`, which switches back to the scheduler.

**Interrupts during interrupts (L04 s16).** What if a timer interrupt arrives while the OS is handling a system call? There are two tools:

- **Disable interrupts** while handling one. This must be short, or interrupts get lost.
- Use **locks** to protect kernel data structures (Unit 4).

**Cost.** A context switch takes microseconds. The bigger cost is indirect: after a switch, the caches and TLB hold the old process's data, so the new process starts with misses.

# Lecture 05: Scheduling basics

*L05. OSTEP ch 7, Silb 5.1-5.3. Tutorial 2 s10-12. Homework 02.*

**Metrics (L05 s6, s17).** Three measures are used to judge a schedule:

- **Turnaround** = completion time − arrival time. This measures how long a job takes from start to finish.
- **Response** = time of first run − arrival time. This measures how long you wait before anything happens.
- **Fairness**, measured with **Jain's index**: J = (Σxᵢ)² / (n · Σxᵢ²). J = 1 means every job got an equal share. Good performance and fairness often pull against each other.

**Starting assumptions (L05 s5).** These are relaxed one at a time:

1. Every job runs for the same time.
2. All jobs arrive together.
3. A job, once started, runs to completion.
4. Jobs use only the CPU, with no I/O.
5. Each job's run time is known.

The lecture's running example uses three jobs: W (WhatsApp), T (Teams) and S (Skype).

| Policy | Idea | Example from the slides | Avg turnaround |
| --- | --- | --- | --- |
| FCFS / FIFO | Run in arrival order | W, T, S all 20 s, arrive at 0 | (20+40+60)/3 = **40** |
| FCFS, unequal | Same, but W = 100 s, T = S = 20 s, W first | Short jobs stuck behind W (the **convoy effect**) | (100+120+140)/3 = **120** |
| SJF | Run the shortest job first (non-preemptive) | T, S, then W | (20+40+140)/3 = **66.7** |
| SJF, late arrivals | W arrives at 0; T and S arrive at 20 | W cannot be stopped, so T and S wait | (100+100+120)/3 = **106.7** |
| STCF (preemptive SJF) | When a job arrives, run whichever has the **least time left** | W runs 0-20, T 20-40, S 40-60, W 60-140 | (140+20+40)/3 = **66.7** |

The slides print 66.3 for the SJF and STCF rows; the correct value is 200/3 = 66.7.

SJF is optimal for turnaround when all jobs arrive together. STCF is optimal when they arrive at different times.

**Response time and Round Robin (L05 s17-21).** STCF is poor for response time: with three 20 s jobs, the third waits 40 s before it runs at all (average response (0+20+40)/3 = 20). **Round Robin (RR)** runs each job for one **time slice** (quantum), then moves to the next. The slice must be a multiple of the timer-interrupt period. With a 5 s slice, the average response is (0+5+10)/3 = 5.

The slice length is a trade-off:

- A shorter slice gives better response time.
- But each switch has a cost, which is **amortized** over the slice. A 1 ms switch every 10 ms wastes 10%; with a 100 ms slice it wastes about 1%.
- RR has bad turnaround, because it stretches every job out: in the example, the jobs finish at 50, 55 and 60.

**The basic trade-off:** a fair policy (RR) has good response but bad turnaround. An unfair policy (SJF/STCF) has good turnaround but bad response.

**Adding I/O.** Treat each CPU burst as its own job. When job A starts I/O, run B. When A's I/O finishes, A's next burst is short, so STCF runs it soon. This **overlaps** computation with I/O and keeps the CPU busy.

# Lecture 06: MLFQ scheduling

*L06. OSTEP ch 8, Silb 5.3.6.*

We want SJF-like turnaround and RR-like response, but the OS does not know how long jobs are. **MLFQ learns from history.** If a job keeps using its full slice, it is probably a long batch job. If it keeps giving up the CPU early for I/O, it is probably interactive.

There are several queues, each with its own priority level. **The final rules (L06 s26):**

1. If Priority(A) > Priority(B), A runs and B does not.
2. If Priority(A) = Priority(B), A and B run in round robin.
3. A new job starts in the **top** queue. MLFQ assumes every job might be short.
4. Once a job has used up its **allotment** at a level, it moves down one level. This counts total time used at that level, *however many times it gave up the CPU*.
5. After every period **S**, move all jobs back to the top queue (the **priority boost**).

**How the rules developed.** The original Rule 4 was in two parts. Rule 4a demoted a job that used its whole slice. Rule 4b let a job that gave up the CPU early stay at the same level. This caused three problems (L06 s14-17):

| Problem | What goes wrong | Fix |
| --- | --- | --- |
| Starvation | Many interactive jobs use all the CPU; long jobs at the bottom never run | Rule 5: boost everyone periodically |
| Gaming | A job issues a pointless I/O at 99% of its slice, so it never gets demoted | Rule 4: count total time at a level |
| Behaviour change | A job that turns interactive stays stuck at the bottom | Rule 5: the boost gives it another chance |

**Example (L06 s10-11).** Job A is a long CPU-bound job that has sunk to Q0. Job B, a 20 ms interactive job, arrives at T = 100 in Q2. B runs at top priority and finishes in two 10 ms slices before it can sink far. MLFQ approximates SJF without knowing job lengths in advance.

**Tuning.** S is a "voodoo constant" (Ousterhout): too big and long jobs starve, too small and interactive jobs lose their share. Real systems use short slices at the top (about 10 ms, for interactive jobs) and long slices at the bottom (hundreds of ms, for CPU-bound jobs). Solaris uses 60 queues and boosts about every second. FreeBSD computes priority from decayed CPU usage. `nice` lets a user give the scheduler a hint. Your MP1 MLFQ in xv6 is this same design.

# Lecture 07: CFS and multiprocessor scheduling

*L07. OSTEP ch 9-10, Silb 5.5, 5.7.*

**Proportional share** aims to give each job a guaranteed *fraction* of the CPU, rather than optimizing turnaround or response. Examples are lottery scheduling, stride scheduling and Linux's CFS.

**CFS: the Completely Fair Scheduler (L07 s2-13).**

- Each process has a **vruntime**, which grows as the process runs. **CFS always runs the process with the lowest vruntime.**
- **Slice length:** time\_slice = sched\_latency / n. With sched\_latency = 48 ms and 4 runnable jobs, each gets 12 ms. When two jobs finish, the other two get 24 ms each.
- **min\_granularity** (about 6 ms) sets a floor on the slice. With 10 jobs, 48/10 = 4.8 ms becomes 6 ms, so switching overhead stays bounded.
- **Weights from `nice`.** Nice values run from −20 to +19. Each one maps to a weight; nice 0 has weight 1024 and nice −5 has weight 3121.

$$
\boxed{\text{time\_slice}_k = \frac{w_k}{\sum_i w_i} \cdot \text{sched\_latency} \qquad \text{vruntime}_i \mathrel{+}= \frac{w_0}{w_i} \cdot \text{runtime}_i}
$$

**Example.** A has nice −5 (weight 3121) and B has nice 0 (weight 1024). A's slice is 3121/4145 × 48 ≈ 36 ms, and B's is about 12 ms. A's vruntime also grows at 1024/3121 ≈ 0.33× real time, so it is picked more often. Both effects favour A.

- **Red-black tree.** Runnable processes are kept sorted by vruntime, so insert, delete and find-minimum all take O(log n). The leftmost node runs next. Sleeping processes are not in the tree.
- **Waking up.** A process that slept for 10 s would have a tiny vruntime and could hog the CPU to catch up. So CFS sets its vruntime to the **minimum vruntime in the tree** when it wakes. The cost is that jobs which sleep often may get slightly less than their fair share.
- Linux 6.6 replaced CFS with EEVDF, which is also a fair-share scheduler.

**Multiprocessor scheduling (L07 s14-30).**

The hardware background:

- Each CPU has its own **cache**. Caches work because of *temporal locality* (data used again soon) and *spatial locality* (nearby data used next).
- **Cache coherence.** CPU 1 writes A = D′ into its cache. Then the process moves to CPU 2, which reads the old D from memory. Hardware prevents this with **bus snooping**: each cache watches the bus and either invalidates or updates its copy.
- Coherence does **not** remove the need for locks. Two CPUs running `List_Pop()` at once can both pop the same node.
- **Cache affinity.** A process runs faster when it goes back to the CPU it last used, because its data is still in that CPU's cache and TLB.

|  | SQMS (one shared queue) | MQMS (one queue per CPU) |
| --- | --- | --- |
| Simplicity | Reuses a single-CPU policy | Needs a rule for placing new jobs |
| Scalability | Poor: every CPU contends for one lock | Good: no shared lock |
| Cache affinity | Poor: jobs hop between CPUs; needs extra affinity logic | Good: jobs stay on their CPU |
| Load balance | Naturally balanced | Can become imbalanced, for example Q0 = {A} and Q1 = {B, D} |
| Fix needed | Affinity mechanisms | **Migration** and **work stealing** |

**Work stealing.** A queue that is running low peeks at another queue and takes jobs if that queue is much fuller. Peeking too often brings back the overhead SQMS had; peeking too rarely leaves the load imbalanced.

**Real Linux schedulers:**

- O(1): multi-queue, priority-based
- CFS: multi-queue, proportional share
- BFS: single queue, uses EEVDF

# Practice problems, Lectures 01 to 07

Try each one before you open its solution. Problems marked **(L08)** are the lecture's own review questions, and **(sheet)** ones come from the "Transport Layer - Practice Questions" PDF.

**C1.** How many processes exist in total (including the original) after this runs? Draw the process tree.

```c
for (int i = 0; i < 3; i++)
    fork();
```

*Solution.* **8 processes** (2³). Every process that exists when `fork()` runs is duplicated, and the child continues the loop from the same `i`. Call the original P.

- At i = 0, P creates C1.
- At i = 1, P creates C2, and C1 creates C1a.
- At i = 2, P creates C3, C1 creates C1b, C2 creates C2a, and C1a creates C1a-i.

That gives 1 + 1 + 2 + 4 = 8.

---

**C2.** What does this print, and in what order? Could the order ever change?

```c
int x = 5;
int rc = fork();
if (rc == 0) {
    x += 10;
    printf("child %d\n", x);
} else {
    wait(NULL);
    x -= 1;
    printf("parent %d\n", x);
}
```

*Solution.* It prints `child 15`, then `parent 4`, **always in that order**. The parent calls `wait(NULL)` before printing, so it cannot print until the child has exited. The child's change to `x` does not affect the parent's `x`, because after `fork` each process has its own copy of the address space. The parent's 5 becomes 4.

---

**C3.** A program calls `execvp("ls", args)` and the next line is `printf("done\n")`. When does "done" print?

*Solution.* **Never, if `exec` succeeds.** `exec` replaces the calling process's code, data, heap and stack with the new program, so the old program, including the `printf` line, no longer exists. `exec` only returns if it fails (for example, the file is not found), and then "done" prints.

---

**C4.** Explain, step by step, how a shell runs `ls > out.txt` using `fork`, `close`, `open` and `exec`. Why is it important that fork and exec are separate calls?

*Solution.* The steps:

1. The shell calls `fork()`.
2. The child calls `close(1)`, which frees file descriptor 1 (standard output).
3. The child calls `open("out.txt", O_CREAT | O_WRONLY | O_TRUNC, ...)`. `open` always returns the **lowest free descriptor**, which is now 1.
4. The child calls `exec("ls", ...)`. `ls` writes to descriptor 1 as usual, but descriptor 1 is now the file.
5. The parent shell calls `wait()`, then prints the next prompt.

Because fork and exec are separate, the child can change its own environment (open files, redirections, pipes) in the gap *after* `fork` and *before* `exec`, without touching the shell itself and without `ls` knowing anything about it.

---

**C5.** In limited direct execution, how does the OS get the CPU back from a process stuck in `while (1);`? During the switch that follows, two different register saves happen. Who does each one, and where are the registers saved?

*Solution.* Through the **timer interrupt**. At boot, the OS sets up a hardware timer (a privileged operation) that interrupts every few milliseconds. When it fires, the CPU jumps into the OS's interrupt handler, whatever the process was doing, and the scheduler can switch to another process. The two register saves are:

1. **By the hardware**, at the moment of the interrupt: process A's *user* registers are saved onto A's **kernel stack**.
2. **By the OS**, when it decides to switch: the switch routine (`swtch` in xv6) saves A's *kernel* registers into A's **process structure** (its PCB / `context`), and loads B's kernel registers from B's process structure.

The return-from-trap then restores B's user registers from B's kernel stack, and B resumes.

---

**C6.** Three jobs arrive as follows. Job A arrives at 0 and needs 30. Jobs B and C both arrive at 10; B needs 10 and C needs 25. For **FIFO, SJF, STCF and RR** (time slice 10), give the schedule, the average turnaround time and the average response time. For RR, assume jobs that arrive at the same moment a slice ends join the queue ahead of the job that was just preempted.

*Solution.* A runs 0-30 if it is never preempted. B and C arrive at 10.

| Policy | Schedule | Turnaround (A, B, C) | Avg | Response (A, B, C) | Avg |
| --- | --- | --- | --- | --- | --- |
| FIFO | A 0-30, B 30-40, C 40-65 | 30, 30, 55 | **38.3** | 0, 20, 30 | **16.7** |
| SJF | Same as FIFO | 30, 30, 55 | **38.3** | 0, 20, 30 | **16.7** |
| STCF | A 0-10, B 10-20, A 20-40, C 40-65 | 40, 10, 55 | **35** | 0, 0, 30 | **10** |
| RR (10) | A 0-10, B 10-20, C 20-30, A 30-40, C 40-50, A 50-60, C 60-65 | 60, 10, 55 | **41.7** | 0, 0, 10 | **3.3** |

Points to notice:

- **SJF is no better than FIFO here.** When B and C arrive, A is already running, and non-preemptive SJF cannot stop it.
- **STCF** preempts A at t = 10, because B has 10 left and A has 20. At t = 20, A (20 left) beats C (25 left).
- **RR** has the best response time but the worst turnaround, which is the trade-off from 1.4.

---

**C7.** (a) Which MLFQ rule stops a job from "gaming" the scheduler, and how did the old rules allow it? (b) What problem does the priority boost solve, and what goes wrong if the boost period S is too large or too small?

*Solution.*

(a) **Rule 4**: a job's allotment at a level counts its *total* CPU time there, however many times it gave up the CPU. The old Rule 4b let a job keep its priority if it gave up the CPU before its slice ended. A job could issue a pointless I/O at 99% of every slice and stay in the top queue forever.

(b) The **priority boost** (Rule 5) fixes **starvation** (long jobs at the bottom get to run at least every S) and **behaviour change** (a job that becomes interactive gets back to the top). If S is too large, long jobs still starve between boosts. If S is too small, jobs are moved to the top so often that interactive jobs lose their advantage, and MLFQ behaves like plain round robin.

---

**C8.** Two CPU-bound processes run under CFS with sched\_latency = 48 ms. A has nice 0 (weight 1024) and B has nice 5 (weight 335). Compute each one's time slice, and how much each one's vruntime grows during its slice. What do you notice?

*Solution.* The slice is in proportion to the weight:

- A: 48 × 1024 / (1024 + 335) = **36.17 ms**
- B: 48 × 335 / 1359 = **11.83 ms**

vruntime grows by the time run × (1024 / weight):

- A: 36.17 × 1024/1024 = **36.17**
- B: 11.83 × 1024/335 = **36.17**

**They are equal.** The weights make vruntime grow *more slowly* for a higher-priority process, so when CFS keeps all vruntimes level, the higher-weight process gets proportionally more real CPU time. A gets about 75% of the CPU and B about 25%.

---
