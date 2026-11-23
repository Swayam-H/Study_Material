# Lecture 14: Threads and race conditions

*Slides: L14-L17. Read: OSTEP ch 26-32, Silb ch 4, 6-8, LBoS ch 1-4. Tutorial 6 (code in `tutorials/06 - Concurrency.zip`). Homework 04 (readers-writers).*

Units 1-3 dealt with *separate* processes, each with its own private memory. This unit is about **threads**, which share one address space. Sharing makes communication easy, but it also creates bugs that depend on timing: they appear one run in a thousand and vanish when you add a `printf`. The unit has two goals:

1. **Atomicity:** make a group of steps on shared data behave as one indivisible step. The tool is a **lock**.
2. **Ordering:** make one thread wait until another has done something. The tools are **condition variables** and **semaphores**.

*L14. OSTEP ch 26-27, Silb 4.1-4.4, 6.1-6.2, LBoS ch 1. Tutorial 6 s3-9.*

**What a thread is (L14 s3-5).** A normal process has one point of execution: one program counter (PC). A **multi-threaded** process has several. Each thread works like a mini-process, but **all threads share the same address space**.

| Per process (shared by its threads) | Per thread (private) |
| --- | --- |
| Code, global variables, heap | Program counter |
| Open files, page table, PID | Registers |
|  | **Its own stack** (locals, arguments, return addresses) |

The OS stores each thread's state in a **thread control block (TCB)**, alongside the process's PCB.

Switching between two threads of the same process is a context switch that saves and restores registers. Unlike a process switch, the address space stays the same, so the **page table is not switched** and the TLB need not be flushed. That makes thread switches cheaper.

**Address-space layout (L14 s6-7).** With two threads there are two stacks, placed at different points in the address space. The neat "heap grows up, stack grows down" picture no longer holds, but stacks are usually small, so it rarely matters.

- A **global** variable, such as `counter`, exists **once** and every thread sees it.
- A **local** variable, such as the loop index `i`, exists separately in **each** thread's stack, even when both threads run the same function.

**Why use threads (L14 s8-10)?**

1. **Parallelism.** Split work across CPUs. For example, four threads each add up a quarter of an array on four cores. Turning a single-threaded program into one that does this is called *parallelization*.
2. **Overlapping I/O.** While one thread is blocked on disk, the network, or even a page fault, another thread can use the CPU. Web servers and databases are built this way.

**Threads or processes?** Use threads when the tasks share a lot of data. Use processes for logically separate tasks that share little; their isolation then protects you.

**Creating and joining threads (L14 s11-13).**

```c
#include <pthread.h>

void *mythread(void *arg) {
    printf("%s\n", (char *) arg);
    return NULL;
}

int main() {
    pthread_t p1, p2;
    printf("main: begin\n");
    pthread_create(&p1, NULL, mythread, "A");   // start a thread running mythread("A")
    pthread_create(&p2, NULL, mythread, "B");
    pthread_join(p1, NULL);                     // wait for p1 to finish
    pthread_join(p2, NULL);
    printf("main: end\n");
}
```

The output is always "begin" first and "end" last. But it may be **"A, B" or "B, A"**: a thread created first is not guaranteed to run first.

Creating a thread is **not** like calling a function. A function call runs and returns before the caller continues. A created thread runs *independently*: perhaps immediately, perhaps much later, at the scheduler's choice. Compile with `gcc -pthread`.

## The shared counter: a race condition

*L14 s14-18.* Two threads each run `counter = counter + 1` ten million times. The answer should be 20,000,000. Real runs print 20,000,000, then **19,345,221**, then **19,221,041**: wrong, and different every time, even on a single CPU.

The reason: one C statement is **three instructions** (see it with `objdump -d`):

```
100: mov 0x8049a1c, %eax   ; load counter from memory into a register
105: add $0x1, %eax        ; add 1 in the register
108: mov %eax, 0x8049a1c   ; store the register back to memory
```

A timer interrupt can arrive between any two of these instructions. Starting with counter = 50:

| Step | Thread | Action | T1's eax | T2's eax | counter |
| --- | --- | --- | --- | --- | --- |
| 1 | T1 | load | 50 |  | 50 |
| 2 | T1 | add | 51 |  | 50 |
| 3 |  | *interrupt: switch to T2* | (saved: 51) |  | 50 |
| 4 | T2 | load |  | 50 | 50 |
| 5 | T2 | add |  | 51 | 50 |
| 6 | T2 | store |  | 51 | **51** |
| 7 |  | *interrupt: switch to T1* | 51 |  | 51 |
| 8 | T1 | store | 51 |  | **51** |

Two increments ran, but the counter went from 50 to 51. **One update was lost.** Both threads read the old value 50 before either one wrote.

**Key terms (L14 s19).** Most of this vocabulary comes from Dijkstra.

- **Critical section:** code that accesses a shared resource and must not be run by more than one thread at once. Here, the three instructions.
- **Race condition (data race):** threads enter a critical section at about the same time, and the result depends on the exact timing.
- **Indeterminate program:** a program with one or more race conditions, whose output varies from run to run.
- **Mutual exclusion:** a guarantee that if one thread is inside the critical section, all others are kept out.

**Atomicity (L14 s21).** If the hardware had a single instruction that added 1 to memory in one step, an interrupt could not split it. That is what **atomic** means: all or nothing, with no visible in-between state. We cannot have an atomic instruction for every operation (an atomic B-tree insert, say). Instead, the hardware gives us a **few atomic instructions**, and we build **synchronization primitives** on top of them.

The same "all or nothing" idea appears in file systems (journaling), databases (transactions) and distributed systems.

**Why this is an OS topic (L14 s23).** The kernel was the first concurrent program. Suppose two processes both `write()` to the end of the same file. Each must allocate a block, record it in the inode, and update the file size. An interrupt between those steps corrupts the file system. Page tables, the process list and nearly every other kernel structure need the same care.

**Tip: think like a malicious scheduler.** For any piece of concurrent code, ask: "If I could interrupt at the *worst* possible instruction, could I break this?" If even one interleaving breaks it, the code is wrong. Improbable is not impossible.

Tutorial 6 tells the story of the **Therac-25** radiation machine (1985-1987). Two tasks shared state without synchronization, and when the operator typed quickly, the machine delivered about a hundred times the intended dose. Six known overdoses, three deaths. The bug passed testing because the testers typed slowly.

# Lecture 15: Locks

*L15. OSTEP ch 28 (ch 29 for concurrent data structures), Silb 6.3-6.5. Tutorial 6 s11-13.*

**What a lock does (L15 s2-4).** A lock is a variable that is either **available** (free) or **acquired** (held, by exactly one *owner* thread).

- `lock()`: if the lock is free, take it and continue. Otherwise, do not return until it is free.
- `unlock()`: make the lock free. If threads are waiting, one of them will eventually get it.

Everything between `lock` and `unlock` behaves as if it were one atomic instruction. Threads are created by the programmer but scheduled by the OS in any order. Locks give back to the programmer a little control over that order.

**POSIX mutex (L15 s5):**

```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

pthread_mutex_lock(&lock);
balance = balance + 1;          // critical section
pthread_mutex_unlock(&lock);
```

- **A mutex protects *data*, not code** (Tutorial 6). Every thread that touches the data, *including readers*, must take the same mutex. A comment saying which variables each lock guards helps a lot.
- **Coarse-grained vs. fine-grained locking (L15 s6).** With one big lock for everything, only one thread is ever in locked code. With separate locks for separate data (`lockA` for a list, `lockB` for a hash table), two threads can work on different structures at the same time.

Tutorial 6 measured the counter fixed three ways. All three print the correct 2,000,000:

| Approach | Time | Why |
| --- | --- | --- |
| Lock around each `counter++` | 137 ms | 2 million lock/unlock pairs, nearly all contended |
| Lock around the whole loop | 4 ms | Fastest, but thread 2 cannot start until thread 1 has finished: no parallelism at all |
| `_Atomic long` counter | 28 ms | One atomic instruction per increment; no locking |

The lesson: locks that are too coarse make the program sequential; locks that are too fine cost overhead on every operation.

## Building a lock

**How do we judge a lock? (L15 s8-9)**

1. **Mutual exclusion:** does it actually keep a second thread out? This is required.
2. **Fairness:** does every waiting thread eventually get the lock, or can one **starve**?
3. **Performance:** how much overhead does it add? Check three cases: no contention; many threads on one CPU; many threads on many CPUs.

**Attempt 0: disable interrupts (L15 s10-11).**

```c
void lock()   { DisableInterrupts(); }
void unlock() { EnableInterrupts(); }
```

With no interrupts there are no context switches, so the code runs atomically, at least on one CPU. It is simple but fails in practice:

1. **It requires trust.** A greedy program could call `lock()` and never give the CPU back; a buggy one could loop forever.
2. **It does not work on multiprocessors.** Threads on other CPUs keep running.
3. **Interrupts get lost.** If a disk completion is missed, the waiting process is never woken.

Today it is used only inside the kernel, for very short sections.

**Attempt 1: a flag with plain loads and stores (L15 s12-14). This is broken.**

```c
void lock(lock_t *m) {
    while (m->flag == 1)   // TEST
        ;                  // spin
    m->flag = 1;           // SET
}
void unlock(lock_t *m) { m->flag = 0; }
```

**Problem 1: no mutual exclusion.** Here is one bad interleaving, starting with flag = 0:

1. T1 tests the flag and sees 0.
2. An interrupt switches to T2.
3. T2 tests the flag, sees 0, and sets it to 1.
4. An interrupt switches back to T1.
5. T1 sets the flag to 1 as well.

**Both threads are now inside the critical section.** The test and the set are two separate steps.

**Problem 2: spin-waiting** burns CPU time, and on one CPU the waiter cannot even make progress until it is switched out.

**Fix: hardware atomic instructions.** Each one below runs as **a single indivisible step**. The C code only describes what the hardware does.

**Test-and-set (atomic exchange) (L15 s15-19).**

```c
int TestAndSet(int *old_ptr, int new) {
    int old = *old_ptr;   // fetch the old value
    *old_ptr = new;       // store the new value
    return old;           // ...all in one atomic step
}

void lock(lock_t *lock) {
    while (TestAndSet(&lock->flag, 1) == 1)
        ;                 // spin
}
void unlock(lock_t *lock) { lock->flag = 0; }
```

There are two cases:

- **The lock is free** (flag = 0). TestAndSet returns 0, so the loop stops, and the flag is now 1. We own the lock.
- **The lock is held** (flag = 1). TestAndSet returns 1 (and writes 1 over 1), so we keep spinning until the owner stores 0.

Because the test and the set are one step, only one thread can ever see the 0. This is a **spin lock**.

How it rates (L15 s18-19):

- **Correct:** yes.
- **Fair:** no. A spinning thread may lose every race and **starve**.
- **Performance on one CPU:** terrible. If the holder is preempted, each of the N−1 other threads may spin through a whole time slice. Spin locks also need a **preemptive** scheduler; without one, a spinner never gives up the CPU.
- **Performance on many CPUs:** reasonable when there are about as many threads as CPUs and critical sections are short. The waiter spins only briefly while the holder finishes on another CPU.

**Compare-and-swap (CAS) (L15 s20-21).** This is called compare-and-exchange on x86.

```c
int CompareAndSwap(int *ptr, int expected, int new) {
    int original = *ptr;
    if (original == expected)
        *ptr = new;
    return original;
}
void lock(lock_t *lock) {
    while (CompareAndSwap(&lock->flag, 0, 1) == 1)
        ;   // spin
}
```

It writes only if the value is what you expected. As a lock, it behaves exactly like test-and-set. CAS is more powerful in general, though: it is the basis of **lock-free** data structures.

**Load-linked / store-conditional (LL/SC) (L15 s22-24).** Used on MIPS, ARM, PowerPC and RISC-V.

- **LL** loads a value and remembers the address.
- **SC** stores **only if nobody has written that address since the LL**. It returns 1 on success and 0 on failure.

```c
void lock(lock_t *lock) {
    while (1) {
        while (LoadLinked(&lock->flag) == 1)
            ;                                      // spin until it looks free
        if (StoreConditional(&lock->flag, 1) == 1)
            return;                                // we got it
        // otherwise someone beat us: try again
    }
}
// shorter version:
// while (LoadLinked(&lock->flag) || !StoreConditional(&lock->flag, 1)) ;
```

If two threads both load 0, only the first SC succeeds. The second fails, because the flag was written after its LL, so it loops again.

**Fetch-and-add and the ticket lock (L15 s25-27).**

```c
int FetchAndAdd(int *ptr) {
    int old = *ptr;
    *ptr = old + 1;
    return old;
}

typedef struct { int ticket; int turn; } lock_t;   // both start at 0

void lock(lock_t *lock) {
    int myturn = FetchAndAdd(&lock->ticket);   // take a number
    while (lock->turn != myturn)
        ;                                      // wait to be called
}
void unlock(lock_t *lock) {
    lock->turn = lock->turn + 1;               // call the next number
}
```

It works like the ticket machine at a deli counter: every thread gets a unique number, and they are served in order. **It is fair:** once a thread has a ticket, it is guaranteed to get the lock after the threads ahead of it. Test-and-set spinners could starve.

## Getting the OS to help: stop spinning

**Yield (L15 s28-29).** Instead of spinning, give up the CPU:

```c
void lock() {
    while (TestAndSet(&flag, 1) == 1)
        yield();   // running -> ready; let someone else run
}
```

With 2 threads on 1 CPU, this works well: the waiter yields and the holder finishes. With **100 threads**, if the holder is preempted, the other 99 each run, find the lock held, and yield. That is 99 context switches, which is better than 99 wasted time slices but still costly. And **starvation** is still possible: an unlucky thread can keep yielding forever while others take the lock.

**Sleeping in a queue: park and unpark (L15 s30-32).** Keep an explicit **queue** of waiting threads, and put them to **sleep**:

- `park()` puts the calling thread to sleep.
- `unpark(tid)` wakes a particular thread.

These come from Solaris. Linux has a similar mechanism called a **futex**.

```c
typedef struct { int flag; int guard; queue_t *q; } lock_t;

void lock(lock_t *m) {
    while (TestAndSet(&m->guard, 1) == 1)
        ;                          // short spin: guard protects flag and q
    if (m->flag == 0) {
        m->flag = 1;               // lock was free: take it
        m->guard = 0;
    } else {
        queue_add(m->q, gettid()); // lock held: join the queue
        m->guard = 0;
        park();                    // and sleep
    }
}

void unlock(lock_t *m) {
    while (TestAndSet(&m->guard, 1) == 1)
        ;
    if (queue_empty(m->q))
        m->flag = 0;                    // nobody waiting: free the lock
    else
        unpark(queue_remove(m->q));     // hand the lock DIRECTLY to the next thread
    m->guard = 0;
}
```

Three details matter:

1. **The guard** is a tiny spin lock that protects only the flag and the queue for a few instructions. Spinning on it is cheap.
2. **The lock is handed over directly.** When there is a waiter, `unlock` leaves `flag = 1` and wakes the next thread. The flag never drops to 0 in between, so no other thread can sneak in. Waiters are served in FIFO order, so the lock is fair.
3. **The wakeup/waiting race** (OSTEP ch 28). Suppose a thread releases the guard and is interrupted just *before* it calls `park()`. If the holder runs `unpark()` at that moment, the wakeup comes before the sleep, and the thread then sleeps forever. Solaris fixes this with `setpark()`: the thread announces it is about to park, so an `unpark()` that arrives early makes the `park()` return immediately.

**Priority inversion (L15 s33).** This is a *correctness* problem with spin locks, not just a speed problem:

1. Low-priority T1 takes a spin lock.
2. High-priority T2 wakes up and spins on the same lock.
3. The scheduler always prefers T2, so T1 never runs and never releases the lock. The system hangs.

This happened on the Mars Pathfinder rover. There are three fixes:

- Avoid spin locks.
- **Priority inheritance:** while T2 waits, T1 temporarily runs at T2's priority, so it can finish and release the lock.
- Give all threads the same priority.

**Summary of lock designs (L15 s34).**

| Lock | Mutual exclusion | Fair | How it waits |
| --- | --- | --- | --- |
| Plain flag (loads and stores) | **No** | No | Spin |
| Test-and-set / CAS / LL-SC | Yes | No | Spin |
| Ticket (fetch-and-add) | Yes | **Yes** | Spin |
| Test-and-set + yield | Yes | No | Yield |
| Queue + park/unpark | Yes | **Yes** | **Sleep** |

Each design fixes a weakness of the one before it. Real systems use a **two-phase lock**: spin briefly in case the lock is released soon, then sleep. Linux's futex-based mutexes work this way.

**Concurrent data structures (OSTEP ch 29), briefly.**

- A counter with one lock does not scale across CPUs. An **approximate counter** keeps a local count per CPU and adds it to the global count every S updates.
- **Hand-over-hand locking** on a linked list (one lock per node) sounds good but is usually slower than one lock for the whole list.
- A **hash table** with one lock per bucket scales very well.
- The general advice: start with one big lock, and make it finer only if measurements show a problem.

# Lecture 16: Condition variables

*L16. OSTEP ch 30, Silb 6.7 (monitors) and 7.3, LBoS 4.1-4.2. Tutorial 6 s14-18.*

**Locks are not enough (L16 s3-5).** A lock answers "may I touch this data now?". It cannot answer "has something I am waiting for happened yet?". The standard example is a parent that must wait for its child thread to finish (a `join`). The output must be "parent: begin, child, parent: end" whatever order the scheduler picks.

**Attempt: spin on a shared flag.**

```c
volatile int done = 0;

void *child(void *arg) {
    printf("child\n");
    done = 1;
    return NULL;
}

int main() {
    printf("parent: begin\n");
    pthread_t c;
    pthread_create(&c, NULL, child, NULL);
    while (done == 0)
        ;                        // spin
    printf("parent: end\n");
}
```

This gives the right output, but on one CPU the parent may burn its whole time slice spinning before the child even gets to run. With compiler and memory reordering it can even be incorrect. We want the parent to **sleep** until the condition becomes true.

## The API

A **condition variable (CV)** is an explicit queue of threads waiting for some state to become true (L16 s6-7). The idea comes from Hoare's **monitors**; Silberschatz presents it that way in 6.7.

```c
pthread_cond_t c = PTHREAD_COND_INITIALIZER;

pthread_cond_wait(&c, &m);    // wait(c, m)
pthread_cond_signal(&c);      // signal(c): wake one waiter
pthread_cond_broadcast(&c);   // wake all waiters
```

**What `wait(c, m)` does, in order:**

1. It must be called with mutex `m` **held**.
2. It **atomically** releases `m` and puts the thread to sleep on `c`.
3. When the thread is woken, it **re-acquires `m`** before returning.

Step 2 must be atomic. If a thread released the lock and was interrupted before it slept, a `signal` could slip in between, and the thread would then sleep through the only wakeup it was ever going to get. This is called a **lost wakeup**.

**What `signal(c)` does:** it wakes one waiting thread, if there is one. **If nobody is waiting, nothing happens. The signal is not remembered.** (Semaphores, in 4.4, are different: a `post` is remembered in the counter.)

## Join done properly

```c
int done = 0;                                    // the STATE: has the child finished?
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;   // protects done
pthread_cond_t c = PTHREAD_COND_INITIALIZER;     // where the parent sleeps

void thr_exit() {                 // called by the child
    pthread_mutex_lock(&m);
    done = 1;
    pthread_cond_signal(&c);
    pthread_mutex_unlock(&m);
}

void thr_join() {                 // called by the parent
    pthread_mutex_lock(&m);
    while (done == 0)
        pthread_cond_wait(&c, &m);
    pthread_mutex_unlock(&m);
}
```

There are two cases, depending on who runs first (L16 s9-10).

**Trace 1: the parent waits first.**

| Parent | done | Child |
| --- | --- | --- |
| Creates the child, calls `thr_join` | 0 |  |
| Locks m; sees done == 0; `wait` releases m and sleeps | 0 |  |
|  | 1 | Prints "child"; locks m; sets done = 1 |
|  | 1 | `signal`: the parent becomes ready; unlocks m |
| Wakes holding m; the `while` re-checks: done == 1 | 1 |  |
| Unlocks m; prints "parent: end" | 1 |  |

**Trace 2: the child runs first.**

| Parent | done | Child |
| --- | --- | --- |
| Creates the child, then is descheduled | 0 |  |
|  | 1 | Prints "child"; locks m; sets done = 1 |
|  | 1 | `signal`: nobody is waiting, so nothing happens; unlocks m |
| `thr_join`: locks m; done == 1, so it **never waits** | 1 |  |
| Unlocks m; prints "parent: end" | 1 |  |

In trace 2 the signal was lost, but that did no harm, because `done` recorded the event. **The parent checks the state, not the signal.**

**Broken version 1: no state variable (L16 s11).** Remove `done` so that `thr_exit` only signals and `thr_join` always waits. If the child runs first, its signal finds no waiter and is lost. The parent then calls `wait` and **sleeps forever**: nothing will ever signal again.

**Broken version 2: no lock (L16 s12).**

```c
void thr_exit() { done = 1; pthread_cond_signal(&c); }
void thr_join() { if (done == 0) pthread_cond_wait(&c); }   // pseudo-code: no mutex
```

| Step | Parent | Child | done |
| --- | --- | --- | --- |
| 1 | `if (done == 0)` is true |  | 0 |
| 2 | *interrupted just before `wait`* |  | 0 |
| 3 |  | `done = 1` | 1 |
| 4 |  | `signal`: no waiter yet | 1 |
| 5 | `wait`: sleeps forever |  | 1 |

The check and the sleep must happen as one atomic step. Holding `m` stops the child from changing `done` between them, and `wait` releases `m` only once the thread is safely asleep.

**Three rules for every CV (L16 s13):**

1. **Use a state variable.** The CV is only a place to sleep. The state (`done`, `count`) records whether the condition actually holds.
2. **Hold the lock** when calling `wait` (required) and when calling `signal` (the simplest choice, and always correct).
3. **Re-check the condition in a `while` loop** after waking.

The one correct shape:

```c
// waiting thread                       // signalling thread
pthread_mutex_lock(&m);                 pthread_mutex_lock(&m);
while (!condition)                      /* change the state */
    pthread_cond_wait(&cv, &m);         pthread_cond_signal(&cv);
/* use the state */                     pthread_mutex_unlock(&m);
pthread_mutex_unlock(&m);
```

## The producer/consumer (bounded buffer) problem

*L16 s14-24.* **Producers** put items into a shared buffer and **consumers** take them out. A producer must wait while the buffer is **full**, and a consumer must wait while it is **empty**. Real examples:

- A multi-threaded web server: one thread puts incoming requests in a queue, and worker threads take them.
- A Unix pipe, as in `grep foo file.txt | wc -l`: grep writes lines into a kernel buffer, and wc reads them.

**Start with a one-slot buffer.**

```c
int buffer;
int count = 0;               // 0 = empty, 1 = full

void put(int value) {
    assert(count == 0);      // only put into an empty buffer
    count = 1;
    buffer = value;
}
int get() {
    assert(count == 1);      // only get from a full buffer
    count = 0;
    return buffer;
}
```

The asserts make any mistake visible immediately.

**Broken version 1: one CV and `if` (L16 s16).**

```c
pthread_cond_t cond;
pthread_mutex_t mutex;

void *producer(void *arg) {
    for (int i = 0; i < loops; i++) {
        pthread_mutex_lock(&mutex);            // p1
        if (count == 1)                        // p2
            pthread_cond_wait(&cond, &mutex);  // p3
        put(i);                                // p4
        pthread_cond_signal(&cond);            // p5
        pthread_mutex_unlock(&mutex);          // p6
    }
}

void *consumer(void *arg) {
    for (int i = 0; i < loops; i++) {
        pthread_mutex_lock(&mutex);            // c1
        if (count == 0)                        // c2
            pthread_cond_wait(&cond, &mutex);  // c3
        int tmp = get();                       // c4
        pthread_cond_signal(&cond);            // c5
        pthread_mutex_unlock(&mutex);          // c6
        printf("%d\n", tmp);
    }
}
```

With one producer and one consumer this works. With **two consumers** (Tc1, Tc2) it has two separate bugs.

**Bug 1: `if` instead of `while` (L16 s17).**

| Tc1 | Tc2 | Tp | count | What happens |
| --- | --- | --- | --- | --- |
| c1-c3, sleeps |  |  | 0 | Nothing to get |
| sleeping |  | p1, p2, p4 | 1 | Buffer now full |
| *ready* |  | p5 | 1 | Tc1 is woken, but does not run yet |
| ready |  | p6, p1, p2, p3, sleeps | 1 | Buffer full, so the producer sleeps |
| ready | c1, c2, c4 |  | 0 | **Tc2 sneaks in and takes the item** |
| ready | c5, c6 | ready | 0 | Tc2's signal wakes Tp |
| c4 |  |  | 0 | Tc1 finally runs, and `get` finds the buffer empty: **the assert fails** |

Tc1 was woken when the buffer was full, but by the time it actually ran, the buffer was empty again. Because of the `if`, it never re-checked.

**Fix 1:** change `if` to `while` at c2 (and at p2). A woken thread re-checks `count`; if another thread took the item first, it goes back to sleep.

**Bug 2: one CV for both kinds of waiter (L16 s19-20).** Even with `while`, a single CV can wake the wrong *kind* of thread:

| Tc1 | Tc2 | Tp | count | What happens |
| --- | --- | --- | --- | --- |
| c1-c3, sleeps |  |  | 0 | Nothing to get |
| sleeping | c1-c3, sleeps |  | 0 | Nothing to get |
| sleeping | sleeping | p1, p2, p4 | 1 | Buffer now full |
| *ready* | sleeping | p5 | 1 | Tp wakes Tc1 |
| ready | sleeping | p6, p1, p2, p3, sleeps | 1 | Buffer full, so Tp sleeps |
| c2, c4 | sleeping | sleeping | 0 | Tc1 re-checks and takes the item |
| c5 | *ready* | sleeping | 0 | **Tc1's signal wakes Tc2, not Tp** |
| c6, c1, c2, c3, sleeps | ready | sleeping | 0 | Tc1 loops round, finds nothing, sleeps |
| sleeping | c2, c3, sleeps | sleeping | 0 | Tc2 re-checks: still empty, sleeps |
| sleeping | sleeping | sleeping | 0 | **All three threads are asleep** |

A consumer should only ever wake a producer, and a producer should only ever wake a consumer. **Signals must be directed.**

**Fix 2: two condition variables (L16 s21).**

```c
pthread_cond_t empty, fill;     // producers wait on empty, consumers wait on fill
pthread_mutex_t mutex;

void *producer(void *arg) {
    for (int i = 0; i < loops; i++) {
        pthread_mutex_lock(&mutex);
        while (count == 1)
            pthread_cond_wait(&empty, &mutex);
        put(i);
        pthread_cond_signal(&fill);     // wake a consumer
        pthread_mutex_unlock(&mutex);
    }
}

void *consumer(void *arg) {
    for (int i = 0; i < loops; i++) {
        pthread_mutex_lock(&mutex);
        while (count == 0)
            pthread_cond_wait(&fill, &mutex);
        int tmp = get();
        pthread_cond_signal(&empty);    // wake a producer
        pthread_mutex_unlock(&mutex);
        printf("%d\n", tmp);
    }
}
```

**General version: MAX slots (L16 s22-24).** Make the buffer a circular array, so producers can get ahead of consumers:

```c
int buffer[MAX];
int fill_ptr = 0, use_ptr = 0, count = 0;

void put(int value) {
    buffer[fill_ptr] = value;
    fill_ptr = (fill_ptr + 1) % MAX;    // wrap around
    count++;
}
int get() {
    int tmp = buffer[use_ptr];
    use_ptr = (use_ptr + 1) % MAX;
    count--;
    return tmp;
}
```

The producer and consumer are the two-CV code above, with `while (count == MAX)` at p2 instead of `count == 1`. Now a producer sleeps only when **all** slots are full, and a consumer only when **all** are empty.

The lecture's run with MAX = 2, one producer and one consumer:

| # | Event | count |
| --- | --- | --- |
| 1 | Tp: `put(0)`, signal(fill) | 1 |
| 2 | Tp: `put(1)`, signal(fill) | 2 |
| 3 | Tp: count == MAX, so wait(empty) | 2 |
| 4 | Tc: `get()` returns 0, signal(empty): Tp becomes ready | 1 |
| 5 | Tp: re-checks, count < MAX, so `put(2)` | 2 |
| 6 | Tc: gets 1, then 2; count == 0, so wait(fill) | 0 |

Tutorial 6's version is identical, with the CVs named `not_full` and `not_empty`, which are clearer names for the same thing.

## Mesa semantics: why `while`, always

There are two possible meanings for `signal` (L16 s25):

- **Hoare semantics** (the original monitors): the signalled thread runs *immediately*, so the condition is guaranteed to still be true. This is hard to implement.
- **Mesa semantics** (what pthreads and almost every real system use): `signal` only moves the waiter to the ready queue. **Other threads may run first and change the state.**

Under Mesa semantics, a signal is a **hint**, not a promise. On top of that, some implementations allow **spurious wakeups**: a thread can return from `wait` with no signal at all. Both reasons lead to the same rule: **always re-check the condition in a `while` loop**. With `while`, the code is correct even if a thread wakes for no reason.

## Covering conditions and broadcast

*L16 s26-27, OSTEP 30.3.* A memory allocator where threads wait for enough free space:

```c
int bytesLeft = MAX_HEAP_SIZE;
pthread_cond_t c;
pthread_mutex_t m;

void *allocate(int size) {
    pthread_mutex_lock(&m);
    while (bytesLeft < size)
        pthread_cond_wait(&c, &m);
    void *ptr = ...;            // get memory from the heap
    bytesLeft -= size;
    pthread_mutex_unlock(&m);
    return ptr;
}

void free(void *ptr, int size) {
    pthread_mutex_lock(&m);
    bytesLeft += size;
    pthread_cond_signal(&c);    // but which waiter should we wake?
    pthread_mutex_unlock(&m);
}
```

The problem, step by step, with bytesLeft = 0:

1. Ta calls `allocate(100)`. 0 < 100, so it waits.
2. Tb calls `allocate(10)`. 0 < 10, so it waits.
3. Tc calls `free(50)`. bytesLeft becomes 50, and it signals.
4. The signal wakes **Ta**. It re-checks: 50 < 100, so it waits again.

Tb needs only 10 bytes and could run, but it stays asleep. Nobody wakes it.

**Fix:** use `pthread_cond_broadcast(&c)` in `free`. That wakes **every** waiter; each re-checks its own condition, Tb proceeds, and Ta goes back to sleep. This is called a **covering condition**: it covers every case where a thread might need to wake up.

|  | `signal()` | `broadcast()` |
| --- | --- | --- |
| Wakes | One waiting thread | All waiting threads |
| Correct for the allocator? | No: it may wake Ta instead of Tb | Yes |
| Cost | Minimal | Extra wakeups, lock contention, context switches |
| Use when | You know which waiter can proceed (for example, separate CVs) | You cannot tell which waiter can proceed |

A warning from OSTEP: if your code only works with `broadcast` and you cannot explain why it needs it, you probably have a bug somewhere else.

**Tutorial 6's four ways to break producer/consumer.** All four compile without warnings and all four survive a short test run. That is the point: you have to reason about concurrency bugs, because testing will not reliably find them.

| Bug | What goes wrong |
| --- | --- |
| `if` instead of `while` | With two consumers, one signal lets both through. The second reads a slot nothing wrote and drives count to −1 |
| One CV instead of two | A signal meant for a consumer can wake a producer, and the wakeup is lost. It did not hang once in 25 test runs |
| Forgetting to signal | Producers fill the buffer and block; consumers are never told. A total hang at 0% CPU |
| Reading `count` outside the lock (in a progress `printf`) | The original data race again, in code you believed was synchronized |

# Lecture 17: Semaphores

*L17. OSTEP ch 31, Silb 6.6 and 7.1, LBoS ch 2-4. Homework 04.*

A **semaphore** is a single primitive that can act as **both a lock and a condition variable**. Dijkstra introduced it in the 1960s, for the THE operating system.

**Definition (L17 s3-5).** A semaphore is an object holding an **integer value**, with two operations. Both are **atomic**.

```c
#include <semaphore.h>
sem_t s;
sem_init(&s, 0, 1);   // 2nd arg 0: shared by threads of one process; 3rd arg: initial value 1

int sem_wait(sem_t *s) {
    // decrement the value of s by one
    // if the value is now negative, sleep
}
int sem_post(sem_t *s) {
    // increment the value of s by one
    // if any threads are waiting, wake one
}
```

- Dijkstra called these **P()** and **V()**, from Dutch words. You will also see **down/up** and **wait/signal**.
- **`sem_wait` may block. `sem_post` never blocks.**
- The **initial value decides the behaviour**, so a semaphore must always be initialized.

**The value counts the waiters (L17 s6).** By Dijkstra's definition, when the value is negative, its magnitude equals the number of waiting threads. Start with value 1 and three threads:

| Event | init | T0 wait | T1 wait | T2 wait | T0 post | T1 post | T2 post |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Value | 1 | 0 | −1 | −2 | −1 | 0 | 1 |
| Waiting | none | none | T1 | T1, T2 | T2 | none | none |
| Effect |  | T0 enters | T1 sleeps | T2 sleeps | wakes T1 | wakes T2 |  |

(The Linux implementation never lets the value go below 0, so this counting does not hold there. See the Zemaphore below.)

## A semaphore as a lock (binary semaphore)

*L17 s7-9.*

```c
sem_t m;
sem_init(&m, 0, 1);     // X = 1

sem_wait(&m);
// critical section
sem_post(&m);
```

**Why X = 1:** the first thread to call `sem_wait` should get through, and everyone after it should block.

- Value **1** means free.
- Value **0** means held, with nobody waiting.
- Value **−k** means held, with k threads waiting.

A lock has only two states, so this is called a **binary semaphore**.

**Two threads contending:**

1. T0 calls `sem_wait`: 1 → 0, and T0 enters the critical section.
2. An interrupt switches to T1. T1 calls `sem_wait`: 0 → −1, which is negative, so T1 sleeps.
3. T0 runs again, finishes, and calls `sem_post`: −1 → 0, and T1 is woken.
4. T1 returns from `sem_wait` and enters. When it posts, the value goes 0 → 1.

The value never goes above 1.

## A semaphore for ordering

*L17 s10-11.* The parent waits for the child, as with `join`:

```c
sem_t s;

void *child(void *arg) {
    printf("child\n");
    sem_post(&s);          // signal: the child is done
    return NULL;
}

int main() {
    sem_init(&s, 0, 0);    // X = 0
    printf("parent: begin\n");
    pthread_t c;
    pthread_create(&c, NULL, child, NULL);
    sem_wait(&s);          // wait here for the child
    printf("parent: end\n");
}
```

**Why X = 0:** there is nothing to give away until the event happens.

- **Case 1, the parent waits first.** The parent's wait takes 0 → −1, and it sleeps. The child runs and posts: −1 → 0, waking the parent.
- **Case 2, the child finishes first.** The child posts: 0 → 1, with nobody to wake. Later the parent's wait takes 1 → 0 and returns at once.

Unlike a CV signal, **a post is never lost**: it is stored in the value. That is why no separate `done` variable is needed.

**Choosing the initial value (L17 s12).** The rule is: *the initial value is the number of resources you are willing to give away immediately after initialization.*

| Use | Initial value | Why |
| --- | --- | --- |
| Lock | 1 | One thread may enter the critical section |
| Ordering | 0 | Nothing to give away until the event happens |
| Bounded buffer: `empty` | MAX | All MAX slots are free for producers |
| Bounded buffer: `full` | 0 | No data yet for consumers |
| Throttling | N | Let up to N threads in at once |

## The bounded buffer with semaphores

*L17 s13-19.* The circular buffer:

```c
int buffer[MAX];
int fill = 0, use = 0;

void put(int value) {
    buffer[fill] = value;          // F1
    fill = (fill + 1) % MAX;       // F2
}
int get() {
    int tmp = buffer[use];         // G1
    use = (use + 1) % MAX;         // G2
    return tmp;
}
```

**First attempt: two semaphores.** `empty` counts free slots (starting at MAX), and `full` counts filled slots (starting at 0). Each side waits on one semaphore and posts the other.

```c
sem_t empty, full;

void *producer(void *arg) {
    for (int i = 0; i < loops; i++) {
        sem_wait(&empty);    // P1: wait for a free slot
        put(i);              // P2
        sem_post(&full);     // P3: one more filled slot
    }
}
void *consumer(void *arg) {
    int tmp = 0;
    while (tmp != -1) {
        sem_wait(&full);     // C1: wait for a filled slot
        tmp = get();         // C2
        sem_post(&empty);    // C3: one more free slot
        printf("%d\n", tmp);
    }
}
// in main: sem_init(&empty, 0, MAX); sem_init(&full, 0, 0);
```

**Simulation with MAX = 1** (L17 s15):

| Step | Thread, line | Action | empty | full | Buffer | Effect |
| --- | --- | --- | --- | --- | --- | --- |
| 0 |  | initialize | 1 | 0 | \[ \] |  |
| 1 | Consumer C1 | wait(full) | 1 | −1 | \[ \] | Consumer sleeps |
| 2 | Producer P1 | wait(empty) | 0 | −1 | \[ \] | Continues |
| 3 | Producer P2 | put(0) | 0 | −1 | \[0\] |  |
| 4 | Producer P3 | post(full) | 0 | 0 | \[0\] | Wakes the consumer |
| 5 | Producer P1 | wait(empty) | −1 | 0 | \[0\] | Producer sleeps: buffer full |
| 6 | Consumer C2 | get() | −1 | 0 | \[ \] | Reads 0 |
| 7 | Consumer C3 | post(empty) | 0 | 0 | \[ \] | Wakes the producer |
| 8 | Producer P2 | put(1) | 0 | 0 | \[1\] | The cycle continues |

The producer never overwrites unread data, and the consumer never reads an empty slot.

**The problem when MAX > 1 (L17 s16).** Say MAX = 10 with two producers. Both pass `sem_wait(&empty)`, because there are plenty of free slots, and both run `put` at the same time. With fill = 0:

1. Pa runs F1: buffer\[0\] = A. Then Pa is interrupted before F2.
2. Pb runs F1: buffer\[0\] = B. **A is overwritten.**
3. Pb runs F2: fill = 1.
4. Pa runs F2: fill = 2.

A is lost, slot 1 holds garbage, and fill = 2. `put` and `get` are critical sections, and nothing protects them. We need mutual exclusion too.

**Adding a mutex in the wrong place: deadlock (L17 s17-18).**

```c
void *producer(void *arg) {           void *consumer(void *arg) {
    sem_wait(&mutex);   // P0              sem_wait(&mutex);   // C0
    sem_wait(&empty);   // P1              sem_wait(&full);    // C1
    put(i);             // P2              int tmp = get();    // C2
    sem_post(&full);    // P3              sem_post(&empty);   // C3
    sem_post(&mutex);   // P4              sem_post(&mutex);   // C4
}                                     }
```

Here is how it deadlocks:

1. The buffer is empty and the consumer runs first.
2. C0: the consumer takes the mutex (1 → 0).
3. C1: `wait(full)` takes full 0 → −1, so the consumer **sleeps while holding the mutex**.
4. The producer runs. P0: `wait(mutex)` takes it 0 → −1, so the producer sleeps.
5. The consumer waits for the producer to post `full`. The producer waits for the consumer to release the mutex. **Neither can ever proceed.**

This is a cycle of waiting: a deadlock (see 4.5).

**The working solution: shrink the lock's scope (L17 s19).**

```c
void *producer(void *arg) {               void *consumer(void *arg) {
    for (i = 0; i < loops; i++) {             for (i = 0; i < loops; i++) {
        sem_wait(&empty);   // P1                 sem_wait(&full);    // C1
        sem_wait(&mutex);   // P1.5 lock          sem_wait(&mutex);   // C1.5 lock
        put(i);             // P2                 int tmp = get();    // C2
        sem_post(&mutex);   // P2.5 unlock        sem_post(&mutex);   // C2.5 unlock
        sem_post(&full);    // P3                 sem_post(&empty);   // C3
    }                                             printf("%d\n", tmp);
}                                             }
                                          }
```

Wait on `empty`/`full` *outside* the lock, and hold the mutex only around `put`/`get`. Then no thread ever sleeps while holding the mutex.

## Reader-writer locks

*L17 s20-22, OSTEP 31.5, LBoS 4.2.* Consider a shared list. Inserts change it; lookups only read it. Many lookups can safely run at the same time, but an insert needs the list to itself.

| Lock held by \\ Requested by | Reader | Writer |
| --- | --- | --- |
| Reader(s) | Allowed | Must wait |
| Writer | Must wait | Must wait |

```c
typedef struct {
    sem_t lock;        // binary semaphore protecting readers
    sem_t writelock;   // allows ONE writer or MANY readers
    int readers;       // number of readers inside
} rwlock_t;

void rwlock_init(rwlock_t *rw) {
    rw->readers = 0;
    sem_init(&rw->lock, 0, 1);
    sem_init(&rw->writelock, 0, 1);
}

void rwlock_acquire_readlock(rwlock_t *rw) {
    sem_wait(&rw->lock);
    rw->readers++;
    if (rw->readers == 1)          // the first reader locks out writers
        sem_wait(&rw->writelock);
    sem_post(&rw->lock);
}

void rwlock_release_readlock(rwlock_t *rw) {
    sem_wait(&rw->lock);
    rw->readers--;
    if (rw->readers == 0)          // the last reader lets writers in
        sem_post(&rw->writelock);
    sem_post(&rw->lock);
}

void rwlock_acquire_writelock(rwlock_t *rw) { sem_wait(&rw->writelock); }
void rwlock_release_writelock(rwlock_t *rw) { sem_post(&rw->writelock); }
```

The first reader takes `writelock` on behalf of **all** readers, and the last reader to leave releases it. LBoS calls this pattern a **lightswitch**: the first person into a room turns the light on, and the last one out turns it off.

**Readers can starve a writer (L17 s22):**

| Step | Event | readers | writelock | Inside | Waiting |
| --- | --- | --- | --- | --- | --- |
| 1 | R1 takes a read lock (first reader) | 1 | 0 | R1 |  |
| 2 | R2 takes a read lock | 2 | 0 | R1, R2 |  |
| 3 | W calls `acquire_writelock` | 2 | −1 | R1, R2 | W |
| 4 | R1 leaves (not the last) | 1 | −1 | R2 | W |
| 5 | R3 arrives and enters at once | 2 | −1 | R2, R3 | W |
| ... | Readers keep arriving | ≥ 1 | −1 | ... | **W starves** |

The fix is to stop *new* readers from entering once a writer is waiting. LBoS 4.2.3 does it with a "turnstile" semaphore that every reader must pass through and that a waiting writer holds shut. Writing that version is part of Homework 04, so work it out yourself from LBoS.

**Hill's Law (L17 s22).** "Big and dumb is better." Reader-writer locks add overhead, and they often do not beat a simple, fast lock. Mark Hill found the same with CPU caches: simple direct-mapped caches often beat fancy set-associative ones. Measure before you add complexity.

## Dining philosophers

*L17 s23-25, OSTEP 31.6, LBoS 4.4.* Five philosophers sit round a table with one fork between each pair. Each one loops: think, pick up the forks on both sides, eat, put the forks down.

```c
int left(int p)  { return p; }
int right(int p) { return (p + 1) % 5; }
sem_t forks[5];   // one semaphore per fork, each initialized to 1
```

So P0 uses forks f0 and f1, and P4 uses f4 and f0. The goals are no deadlock, no starvation, and as much concurrency as possible.

**Broken: everyone takes the left fork first.**

```c
void get_forks(int p) {
    sem_wait(&forks[left(p)]);
    sem_wait(&forks[right(p)]);
}
void put_forks(int p) {
    sem_post(&forks[left(p)]);
    sem_post(&forks[right(p)]);
}
```

If all five pick up their left fork at the same moment, each one holds one fork and waits for its neighbour's. **Deadlock.**

**Fix: break the cycle.** Make one philosopher pick up the forks in the opposite order:

```c
void get_forks(int p) {
    if (p == 4) {
        sem_wait(&forks[right(p)]);   // P4 takes f0 first
        sem_wait(&forks[left(p)]);
    } else {
        sem_wait(&forks[left(p)]);
        sem_wait(&forks[right(p)]);
    }
}
```

Now if P0 to P3 each hold their left fork, P4 asks for f0 first, which P0 holds, so P4 blocks **holding nothing**. f4 stays free, P3 can take it and eat, and the chain unwinds. Other classic problems of this kind are the cigarette smokers and the sleeping barber (LBoS ch 4-5).

## Throttling

*L17 s26.* Hundreds of threads all want to run a memory-intensive section of code. If they all enter at once, they need more than the available RAM and the system thrashes (3.9). A semaphore initialized to N caps how many are inside:

```c
sem_init(&s, 0, N);       // for example N = 3

sem_wait(&s);
memory_intensive_region();
sem_post(&s);             // each exit admits one waiting thread
```

This is called **admission control**. LBoS calls the same pattern a **multiplex**.

## Building a semaphore from a lock and a CV: the Zemaphore

*L17 s27-28.*

```c
typedef struct {
    int value;
    pthread_cond_t cond;
    pthread_mutex_t lock;
} Zem_t;

void Zem_init(Zem_t *s, int value) {      // only one thread may call this
    s->value = value;
    pthread_cond_init(&s->cond, NULL);
    pthread_mutex_init(&s->lock, NULL);
}

void Zem_wait(Zem_t *s) {
    pthread_mutex_lock(&s->lock);
    while (s->value <= 0)                 // Mesa: re-check in a while loop
        pthread_cond_wait(&s->cond, &s->lock);
    s->value--;
    pthread_mutex_unlock(&s->lock);
}

void Zem_post(Zem_t *s) {
    pthread_mutex_lock(&s->lock);
    s->value++;
    pthread_cond_signal(&s->cond);
    pthread_mutex_unlock(&s->lock);
}
```

It uses one lock, one CV and one integer. The lock makes `wait` and `post` atomic; the CV lets threads sleep and wake.

|  | Dijkstra's semaphore | Zemaphore |
| --- | --- | --- |
| Can the value be negative? | Yes | No: it never goes below 0 |
| A negative value means | The number of waiters | Not applicable |
| Built from | A primitive | A lock and a CV |
| Matches | The original definition | Linux today |

Going the other way, building a CV out of semaphores, is much harder (Birrell found it so). That is why Lampson's warning applies: "Don't generalize; generalizations are generally wrong." Semaphores generalize locks and CVs, but less completely than it first appears.

## Patterns from the Little Book of Semaphores

Downey's book (LBoS ch 3) names the basic patterns. Homework 04 uses them.

| Pattern | Semaphore setup | What it guarantees |
| --- | --- | --- |
| **Signaling** | One semaphore at 0. A posts after statement a1; B waits before b1 | a1 happens before b1 (the parent/child example above) |
| **Rendezvous** | Two semaphores at 0, one per thread | Neither thread passes its meeting point until both have arrived |
| **Mutex** | One semaphore at 1 | Only one thread in the critical section |
| **Multiplex** | One semaphore at N | At most N threads inside (throttling) |
| **Barrier** | A count, a mutex, and a semaphore | No thread passes until all n threads have arrived |
| **Lightswitch** | A counter and a mutex | The first in locks a resource, the last out unlocks it (the reader-writer lock) |

For rendezvous, a hint: each thread posts its *own* semaphore before waiting on the *other's*. Think about what happens if both threads wait first. For the barrier, think about how the n-th thread to arrive can let all the others through. LBoS 3.3 and 3.6 work through these, including the common wrong versions.

# Deadlock and other concurrency bugs (Tutorial 6)

*Tutorial 6 s19-20. OSTEP ch 32, Silb ch 8.*

**Deadlock** happens when each thread in a group holds something and waits for something another thread in the group holds, so none of them can ever proceed. You have already seen two examples: the bounded buffer with the mutex in the wrong place, and the dining philosophers.

**The simplest case (Tutorial 6, `deadlock.c`):**

```c
void *t1(void *arg) {                   void *t2(void *arg) {
    pthread_mutex_lock(&m1);                pthread_mutex_lock(&m2);   // reversed order!
    usleep(1000);                           usleep(1000);
    pthread_mutex_lock(&m2);   // hangs     pthread_mutex_lock(&m1);   // hangs
}                                       }
```

T1 holds m1 and wants m2. T2 holds m2 and wants m1. Drawn as a **wait-for graph** (Silberschatz calls the general version a resource-allocation graph), the arrows form a **cycle**: T1 → m2 → T2 → m1 → T1.

**Why does deadlock happen in real code?** In large systems, components depend on each other in complicated ways. Encapsulation also hides locking: a call like `v1.addAll(v2)` on two Java vectors locks both, in an order that depends on which one you call it on. One thread calling `v1.addAll(v2)` while another calls `v2.addAll(v1)` can deadlock.

## The four conditions

Deadlock can happen only if **all four** of these hold at the same time (they are known as the Coffman conditions):

| Condition | Meaning | How to break it |
| --- | --- | --- |
| **Mutual exclusion** | A resource can be held by only one thread at a time | Avoid locks: use lock-free structures built on atomic instructions |
| **Hold and wait** | A thread holds one resource while waiting for another | Take all locks at once; or use `trylock` and back off |
| **No preemption** | A lock cannot be taken away from its holder | `trylock`: if you cannot get the second lock, release the first and retry |
| **Circular wait** | There is a cycle in the wait-for graph | **Lock ordering**: always take locks in one global order |

Remove any one of the four and deadlock becomes impossible.

**Prevention, in detail (OSTEP 32.3).**

**Circular wait: lock ordering.** This is the practical fix, and the one Tutorial 6 recommends: it can be enforced by convention and costs nothing at runtime. Pick a global order and always follow it. The dining-philosophers fix is a version of this. When a function receives two locks as arguments, order them by **address**:

```c
void lock_both(pthread_mutex_t *a, pthread_mutex_t *b) {
    if (a > b) { pthread_mutex_t *t = a; a = b; b = t; }   // always lower address first
    pthread_mutex_lock(a);
    pthread_mutex_lock(b);
}
```

A *partial* order is enough when you only need to fix the order between certain locks. The Linux memory-mapping code documents a ten-level order of this kind in a comment.

**Hold and wait: take everything at once.** Wrap all lock acquisitions in one global "prevention" lock. This works, but you must know in advance every lock you will need, and it reduces concurrency.

**No preemption: trylock.**

```c
top:
    pthread_mutex_lock(L1);
    if (pthread_mutex_trylock(L2) != 0) {   // returns EBUSY if L2 is held
        pthread_mutex_unlock(L1);           // give back what we hold
        goto top;                           // and start again
    }
```

This cannot deadlock, but it can **livelock**: two threads repeatedly take one lock, fail on the other, release, and retry, forever. Each one is busy, but neither makes progress. A random delay before retrying makes this unlikely.

**Mutual exclusion: go lock-free.** Use atomic instructions directly. For example, adding to a counter with compare-and-swap:

```c
void AtomicIncrement(int *value, int amount) {
    int old;
    do {
        old = *value;
    } while (CompareAndSwap(value, old, old + amount) != old);   // retry if someone changed it
}
```

(Using the `CompareAndSwap` from 4.2, which returns the original value.) This is correct and never blocks, but lock-free code for anything bigger than a counter is very hard to get right.

**Avoidance via scheduling (OSTEP 32.3, Silb 8.6).** If the OS knew in advance which locks each thread might need, it could schedule threads so that a deadlock never forms. Silberschatz's **Banker's algorithm** does this for resources:

- Each thread declares its **maximum** need in advance.
- The system only grants a request if afterwards it is still in a **safe state**: one where there is some order in which every thread can get its maximum and finish.

*Example (Silb 8.6.1, beyond the slides).* There are 12 units of a resource, and 3 are currently free.

| Thread | Maximum need | Holds now | Still needs |
| --- | --- | --- | --- |
| T0 | 10 | 5 | 5 |
| T1 | 4 | 2 | 2 |
| T2 | 9 | 2 | 7 |

This state is safe, with the order T1, T0, T2:

1. T1 needs 2 and 3 are free, so T1 can finish. It returns its 4, leaving 5 free.
2. T0 needs 5 and 5 are free, so T0 can finish, leaving 10 free.
3. T2 needs 7 and 10 are free, so T2 can finish.

Now suppose T2 asks for 1 more unit. Granting it leaves 2 free. T1 can still finish (leaving 4 free), but then T0 needs 5 and T2 needs 6, so nobody else can. The state would be **unsafe**, so the request is refused and T2 waits. This needs a lot of advance knowledge, so it is rare outside special systems.

**Detect and recover.** Let deadlocks happen occasionally, find the cycle in the graph, and break it, for example by aborting one thread. This is what databases do.

**Deadlock, livelock, starvation (Tutorial 6).** They are easy to confuse:

|  | What you see | CPU use |
| --- | --- | --- |
| **Deadlock** | Threads blocked forever, waiting on each other | About 0% |
| **Livelock** | Threads keep running and retrying, but none makes progress | About 100% |
| **Starvation** | Some threads progress, but one never gets the lock | Normal |

`top -H` shows the per-thread difference.

## Non-deadlock bugs

OSTEP ch 32 reports a study of real bugs in MySQL, Apache, Mozilla and OpenOffice. Most concurrency bugs were **not** deadlocks, and nearly all of the rest were of two kinds.

**1. Atomicity violation.** A sequence that the programmer assumed was atomic is not. The example from MySQL:

```c
// Thread 1                               // Thread 2
if (thd->proc_info) {                     thd->proc_info = NULL;
    fputs(thd->proc_info, ...);
}
```

If thread 2 runs between the check and the `fputs`, thread 1 passes NULL to `fputs` and crashes. **Fix:** put a lock around both the check-and-use and the assignment.

**2. Order violation.** The code assumes that A happens before B, but nothing enforces it:

```c
// Thread 1                               // Thread 2
void init() {                             void mMain(...) {
    mThread = PR_CreateThread(mMain, ...);    mState = mThread->State;   // mThread may still be NULL!
}                                         }
```

Thread 2 can start running before thread 1 has stored `mThread`. **Fix:** make the order explicit with a condition variable (a `mtInit` flag, a lock and a CV) or a semaphore initialized to 0.

## Tools for finding these bugs

Tutorial 6's advice: put a sanitizer target in your Makefile and run it before every submission.

| Tool | Command | What it finds |
| --- | --- | --- |
| ThreadSanitizer | `gcc -fsanitize=thread -g -pthread` | Data races, with both stack traces and the locks held. 5-15× slower |
| gdb | `gdb -p $(pgrep prog)`, then `thread apply all bt` | Where every thread is stuck: the only way to see a deadlock |
| Helgrind | `valgrind --tool=helgrind ./prog` | Races, lock-order inversions, API misuse |
| top | `top -H` | Deadlock (0% CPU) vs. livelock (100%) |
| strace | `strace -f -e trace=futex ./prog` | Which futex each thread is blocked on |
| Error-checking mutex | `PTHREAD_MUTEX_ERRORCHECK` | Double locking, or unlocking a lock you do not hold |

**Tutorial 6's checklist:**

1. Every shared mutable variable is guarded by a named mutex, is atomic, or is never modified, and a comment says which.
2. Every `cond_wait` sits inside a `while` on a condition.
3. You signal the condition you just made true.
4. Every pair of locks has one global order, and every thread follows it.
5. The sanitizer runs as part of your build, not only when something looks wrong.

**Rules for holding a lock (Tutorial 6):**

- Take the same mutex for every access, including reads.
- Keep the critical section short, but never shorter than the invariant it protects.
- Never return or break out of a function while still holding the lock.
- Never call code you do not control while holding a lock.

**Where this leads next (Tutorial 6).** A single-threaded TCP echo server (Unit 2) handles one client and makes the second wait. One thread per connection fixes that in about ten lines. But it stops scaling at a few thousand connections, because every thread needs its own stack. That is the **C10K problem**, and it is why `select`, `poll` and `epoll` exist.

# Concurrency theory from the textbooks

*Theory that the L14 to L17 slides assume or only touch on, from OSTEP ch 26-32 and Silberschatz ch 4, 6-8. These are standard exam definitions and arguments.*

## What a correct critical-section solution must give (Silb 6.2)

A solution to the critical-section problem must satisfy all three conditions:

1. **Mutual exclusion:** if one thread is in its critical section, no other thread can be in its own.
2. **Progress:** if no thread is in the critical section and some want to enter, only those threads take part in deciding who goes next, and the decision cannot be postponed forever.
3. **Bounded waiting:** after a thread asks to enter, there is a limit on how many times other threads can enter before it does. This rules out starvation.

These map onto OSTEP's lock criteria: mutual exclusion is **correctness**, and bounded waiting is **fairness**. For example, a test-and-set spin lock gives mutual exclusion and progress, but **not** bounded waiting. A ticket lock gives all three.

## Peterson's algorithm (Silb 6.3, OSTEP 28 aside)

A software-only lock for two threads (0 and 1), using only loads and stores:

```c
int flag[2] = {0, 0};   // flag[i] = 1: thread i wants to enter
int turn;               // whose turn it is to wait

void lock(int self) {
    int other = 1 - self;
    flag[self] = 1;
    turn = other;                                 // politely let the other go first
    while (flag[other] == 1 && turn == other) ;   // spin
}
void unlock(int self) { flag[self] = 0; }
```

- **Mutual exclusion:** if both threads were inside, both flags would be 1. But `turn` holds a single value. The thread that wrote `turn` *last* sees its own condition true and spins, so both cannot pass.
- **Progress:** if the other thread does not want in (flag[other] = 0), a thread enters at once.
- **Bounded waiting:** a waiting thread gets in after at most **one** entry by the other, because the other thread sets turn back to the waiter before it can re-enter.
- **Why it is not used today:** modern CPUs and compilers **reorder** loads and stores, so another thread may see `flag` and `turn` change in a different order. Peterson's algorithm then needs **memory barriers** (fences). It also spins, and it only handles two threads. Hardware atomic instructions are simpler.

## Thread models and Amdahl's law (Silb 4.2-4.3)

- **User-level threads** are managed by a library with no kernel help: fast to create and switch, but one blocking system call blocks the whole process, and they cannot run on several CPUs at once.
- **Kernel-level threads** are scheduled by the OS: they work in parallel, and one can block without blocking the others. Creation and switching cost more.
- **Mapping models:** **many-to-one** (all user threads on one kernel thread; no parallelism), **one-to-one** (Linux and Windows; most common, with a limit on the thread count), **many-to-many** (user threads multiplexed onto fewer kernel threads; flexible but complex), and the **two-level** variant.
- **Amdahl's law:** if a fraction $S$ of a program is serial, the speedup on $N$ cores is at most

$$
\text{speedup} \le \frac{1}{S + \frac{1 - S}{N}}
$$

For example, with $S = 0.25$ and $N = 4$, the speedup is at most $1 / (0.25 + 0.1875) \approx 2.29$. As $N \to \infty$ it approaches $1/S = 4$. The serial part limits everything.

- **Concurrency vs parallelism:** concurrency means several tasks make progress (possibly interleaved on one core); parallelism means they run at the same instant on different cores.

## Lock-based concurrent data structures (OSTEP 29)

The question for each structure: how do you add locks so it stays correct **and** scales across CPUs?

| Structure | Simple approach | Scalable approach |
| --- | --- | --- |
| Counter | One lock around every update: correct, but slows badly as threads are added | **Approximate counter**: a local counter and lock per CPU, moved into the global counter every **S** updates |
| Linked list | One lock for the whole list | Lock only the real critical section (do `malloc` outside it); hand-over-hand locking (a lock per node) is usually *slower* in practice |
| Queue | One lock | **Michael and Scott**: separate head and tail locks plus a dummy node, so an enqueue and a dequeue can run at the same time |
| Hash table | One lock | **One lock per bucket**, so operations on different buckets run in parallel; this scales very well |

**Approximate counter trade-off:** with threshold $S$ and $C$ CPUs, the global value can lag the true count by up to about $S \times C$. A small $S$ gives an accurate counter that behaves almost like one lock (slow). A large $S$ scales almost perfectly, but the global value is less accurate. OSTEP shows $S = 1024$ giving nearly perfect scaling on 4 CPUs.

General lessons: start with one big lock and make it finer only if performance needs it. Be careful with control flow: every early `return` must release the lock. More concurrency is not automatically faster.

## Monitors and CV semantics (Silb 6.7, OSTEP 30)

- A **monitor** is a language-level construct: an object whose methods run under one implicit lock, so only one thread is active inside it at a time. It also has condition variables. Java's `synchronized` plus `wait`/`notify` is an example.
- **Hoare semantics:** `signal` hands the lock and the CPU straight to the woken thread, so the condition is guaranteed true when it runs. An `if` would then be enough.
- **Mesa semantics** (used by pthreads, Java and almost every real system): `signal` only moves the waiter to the ready queue. Another thread may run first and change the state, and **spurious wake-ups** are allowed. So the waiter must re-check in a `while` loop.

## Semaphores in the kernel (Silb 6.6)

- The busy-waiting semaphore spins inside `wait`, which is called a **spinlock**. A blocking implementation keeps a **list of waiting processes**: `wait` decrements and, if the value is negative, adds the caller to the list and blocks it; `signal` increments and, if any process waits, removes one and wakes it.
- `wait` and `signal` must themselves be atomic, so the kernel protects them with interrupts disabled (one CPU) or a spinlock (many CPUs). The spinning is short because these sections are tiny.
- A LIFO waiting list can cause **starvation**; a FIFO list prevents it.
- **Binary vs counting:** a binary semaphore takes values 0 and 1 and acts like a mutex; a counting semaphore controls a pool of N identical resources.

## Deadlock theory (Silb 8, OSTEP 32)

- **Resource-allocation graph:** an edge from a thread to a resource is a **request**, and an edge from a resource to a thread is an **assignment**. With one instance per resource, a **cycle means deadlock**. With several instances, a cycle means deadlock is *possible*, but not certain.
- **Handling it:** **prevention** (make one of the four conditions impossible: lock ordering for circular wait, acquiring all locks at once for hold and wait, trylock and back off for no preemption, lock-free data structures for mutual exclusion); **avoidance** (only grant a request if the system stays in a **safe state**: the Banker's algorithm); **detection and recovery** (find cycles periodically, then kill or roll back a thread); or **ignore it** (most OSes for user code).
- A **safe state** has an order in which every thread can get its maximum need and finish. Unsafe does not mean deadlocked, but it means deadlock cannot be ruled out.
- **Livelock:** threads keep backing off and retrying (for example, with trylock) and none makes progress. Fix it with a random delay before retrying.

# Practice problems, Lectures 14 to 17

Try each one before you open its solution. Problems marked **(L08)** are the lecture's own review questions, and **(sheet)** ones come from the "Transport Layer - Practice Questions" PDF.

**S1.** Two threads each run `counter++` three times, with no lock. counter starts at 0. What are the largest and the smallest possible final values? Give the interleaving that produces the smallest one.

*Solution.* The largest is **6**: every increment runs without interruption. The smallest is **2**. Here is how:

1. T1 loads 0 into its register, then is interrupted.
2. T2 runs two complete increments: counter = 2.
3. T1 adds 1 to its stale 0 and stores 1. **T2's two increments are wiped out.**
4. T2 loads 1 for its third increment, then is interrupted.
5. T1 runs its last two increments in full: counter = 3.
6. T2 adds 1 to its stale 1 and stores **2**.

The result cannot be 1. Every store writes (value loaded) + 1, so once any store has happened, memory holds at least 1. The final value comes from the last store, which is some thread's *last* increment. That increment loaded its value after the same thread's first increment had already stored, so it loaded at least 1 and stored at least 2.

---

**S2.** In the code below, which of `g`, `s`, `local`, `p` and `*p` are shared between two threads that both run `work()`?

```c
int g = 0;
void *work(void *arg) {
    static int s = 0;
    int local = 0;
    int *p = malloc(sizeof(int));
    ...
}
```

*Solution.*

| Variable | Shared? | Why |
| --- | --- | --- |
| `g` | **Yes** | Globals live in the data segment, and there is one copy |
| `s` | **Yes** | A `static` local also lives in the data segment, not on the stack |
| `local` | No | Each thread has it on its own stack |
| `p` | No | The pointer variable itself is on each thread's stack |
| `*p` | Not in practice | The heap is shared memory, but each thread mallocs its own block. It becomes shared only if one thread passes the pointer to another |

---

**S3.** Show an interleaving in which the plain-flag lock from 4.2 (test with a load, then set with a store) lets two threads into the critical section. Then explain exactly why `TestAndSet` closes that gap.

*Solution.* The bad interleaving, starting with flag = 0:

1. T1 tests the flag and sees 0.
2. An interrupt switches to T2. T2 tests, sees 0, and sets the flag to 1, entering the critical section.
3. An interrupt switches back to T1, which sets the flag to 1 and also enters.

The problem is the gap between the test and the set. `TestAndSet` does both in **one atomic instruction**, so there is no gap. Whichever thread executes it first gets back 0 and leaves 1 behind; every other thread gets back 1 and keeps spinning.

---

**S4.** Four threads share one CPU and a test-and-set spin lock. The holder is preempted just after taking the lock. Roughly how much CPU time is wasted before the holder runs again, and why? How do `yield` and the queue lock each improve this?

*Solution.* On one CPU, each of the other three threads gets scheduled in turn and spins for its **whole time slice**, because the lock cannot be released while its holder is not running. That is roughly **3 time slices wasted** for each time the holder is preempted (more if the scheduler is unlucky).

- With **yield**, each waiter gives up the CPU as soon as it finds the lock held. That costs 3 context switches instead of 3 slices, but it still has overhead and starvation is still possible.
- With the **queue lock**, waiters sleep and are not scheduled at all until the holder unparks them, so no time is wasted.

---

**S5.** A ticket lock starts with ticket = 0 and turn = 0. T1, T2 and T3 call `lock()` in that order, then T1 calls `unlock()`, then T4 calls `lock()`, then T2 calls `unlock()`. After each step, give ticket, turn, each thread's `myturn`, and who holds the lock.

*Solution.*

| Step | ticket | turn | myturn | Holder | Spinning |
| --- | --- | --- | --- | --- | --- |
| Start | 0 | 0 |  | none |  |
| T1 lock | 1 | 0 | T1 = 0 | T1 |  |
| T2 lock | 2 | 0 | T2 = 1 | T1 | T2 |
| T3 lock | 3 | 0 | T3 = 2 | T1 | T2, T3 |
| T1 unlock | 3 | 1 |  | **T2** | T3 |
| T4 lock | 4 | 1 | T4 = 3 | T2 | T3, T4 |
| T2 unlock | 4 | 2 |  | **T3** | T4 |

Threads are served strictly in ticket order. That is what makes the ticket lock fair.

---

**S6.** In the queue lock with `park`/`unpark`: (a) What would go wrong if a thread called `park()` *before* releasing the guard? (b) Describe the wakeup/waiting race that remains, and how `setpark()` fixes it.

*Solution.*

(a) The thread would go to sleep **holding the guard**. When the lock holder calls `unlock()`, it spins forever trying to take the guard, so it can never unpark anyone. Everything stops.

(b) The race:

1. A thread adds itself to the queue and releases the guard.
2. It is preempted just *before* calling `park()`.
3. The lock holder runs `unlock()` and calls `unpark()` on it. This has no effect, because the thread is not asleep yet.
4. The thread runs again, calls `park()`, and **sleeps forever**.

With **`setpark()`**, the thread announces "I am about to park" *before* releasing the guard. If an `unpark()` arrives between that announcement and the `park()`, the `park()` returns immediately instead of sleeping.

---

**S7.** Low-priority thread L holds a spin lock. High-priority thread H wakes up and tries to take it. Explain what happens on one CPU, and how priority inheritance fixes it.

*Solution.* H has the higher priority, so the scheduler always runs H, and H spins on the lock. L never gets the CPU, so it never finishes its critical section and never releases the lock. The system hangs, even though nothing is technically deadlocked. With **priority inheritance**, while H waits for a lock that L holds, L temporarily runs at H's priority. L gets the CPU, finishes, releases the lock, and drops back to its own priority, and then H proceeds.

---

**S8.** Is this code correct? If not, give the interleaving that breaks it and fix it.

```c
// waiting thread                      // signalling thread
pthread_mutex_lock(&m);                ready = 1;
while (!ready)                         pthread_cond_signal(&c);
    pthread_cond_wait(&c, &m);
pthread_mutex_unlock(&m);
```

*Solution.* **Not correct: there is a lost wakeup**, because the signaller does not take the lock.

1. The waiter locks m and sees `ready == 0`. Just before it calls `wait`, it is interrupted.
2. The signaller sets `ready = 1` and signals. Nobody is waiting yet, so the signal is lost.
3. The waiter calls `wait` and **sleeps forever**.

**Fix:** the signaller must hold the same mutex:

```c
pthread_mutex_lock(&m);
ready = 1;
pthread_cond_signal(&c);
pthread_mutex_unlock(&m);
```

Now the signaller cannot change `ready` between the waiter's check and its sleep, because the waiter holds m until `wait` has put it to sleep.

---

**S9.** Producer/consumer already uses two CVs (`empty` and `fill`). Do the waits still need `while`, or would `if` now be safe? Give a scenario to justify your answer.

*Solution.* **`while` is still needed.** Two CVs make sure a signal wakes the right *kind* of thread, but not that the condition still holds when the woken thread runs. A scenario:

1. The buffer is empty, and Tc1 is asleep on `fill`.
2. The producer puts an item and signals `fill`, so Tc1 becomes ready.
3. Before Tc1 runs, a newly arriving consumer Tc2 gets the mutex, sees count == 1, and takes the item.
4. Tc1 finally returns from `wait`. With `if`, it calls `get()` on an empty buffer.

Spurious wakeups are a second reason. Under Mesa semantics, always use `while`.

---

**S10.** For each, give the semaphore's initial value: (a) thread B's line `b1` must run after thread A's line `a1`; (b) at most 5 threads may hold a database connection at once; (c) a plain mutex; (d) the `full` semaphore of a bounded buffer with 8 slots; (e) its `empty` semaphore.

*Solution.* (a) **0**. (b) **5**. (c) **1**. (d) `full` = **0**. (e) `empty` = **8**.

---

**S11.** A semaphore starts at 2. T1, T2, T3, T4 and T5 call `sem_wait` in that order, then T1 and T2 each call `sem_post`. After each call, give the value and the list of waiting threads.

*Solution.*

| Call | Value | Waiting |
| --- | --- | --- |
| Start | 2 |  |
| T1 wait | 1 |  |
| T2 wait | 0 |  |
| T3 wait | −1 | T3 |
| T4 wait | −2 | T3, T4 |
| T5 wait | −3 | T3, T4, T5 |
| T1 post | −2 | T4, T5 (T3 woken) |
| T2 post | −1 | T5 (T4 woken) |

At every step, a negative value equals minus the number of waiting threads.

---

**S12.** In the bounded buffer with semaphores: (a) does the order of the two `sem_post` calls in the producer matter? (b) Does the order of the two `sem_wait` calls matter? Explain each.

*Solution.*

(a) **No.** `sem_post` never blocks, so both posts always complete, in either order. Posting the mutex first just ends the critical section slightly sooner.

(b) **Yes.** If a thread takes the mutex first and then waits on `full` or `empty`, it can go to sleep while holding the mutex. The thread that would wake it then blocks on the mutex, and both are stuck: the deadlock from 4.4. Always wait on `full`/`empty` first, then take the mutex.

---

**S13.** Using semaphores only, make three threads print A, B and C in exactly that order every time, whatever order they are scheduled in. Then make two threads print ABABAB... forever.

*Solution.* For A, then B, then C: use two semaphores, `s1` and `s2`, both initialized to 0.

```c
// Thread A            // Thread B            // Thread C
printf("A");           sem_wait(&s1);         sem_wait(&s2);
sem_post(&s1);         printf("B");           printf("C");
                       sem_post(&s2);
```

B cannot print until A has posted s1, and C cannot print until B has posted s2, whatever order the threads start in.

For ABAB...: `sA` starts at 1 (A goes first) and `sB` starts at 0.

```c
// Thread A                       // Thread B
while (1) {                       while (1) {
    sem_wait(&sA);                    sem_wait(&sB);
    printf("A");                      printf("B");
    sem_post(&sB);                    sem_post(&sA);
}                                 }
```

Each thread hands the turn to the other.

---

**S14.** For the semaphore reader-writer lock: R1 holds a read lock, W calls `acquire_writelock`, then R2 calls `acquire_readlock`. What happens to W and R2, and what are `readers` and the value of `writelock`? Why is this unfair, and what is the general idea of the fix?

*Solution.* While R1 is reading, readers = 1 and writelock = 0, because R1, as the first reader, took it.

- W calls `sem_wait(&writelock)`: the value goes to −1, and **W sleeps**.
- R2 takes `lock`, increments readers to 2, and, because it is not the first reader, does not touch writelock. **R2 enters immediately.**
- Now readers = 2, writelock = −1, and W is still waiting.

This is unfair: W arrived before R2, but R2 got in first. W must wait until readers drops all the way to 0, and if readers keep arriving, that may never happen. The fix is to make new readers queue behind a waiting writer, with a turnstile semaphore that the writer holds while it waits (LBoS 4.2.3).

---

**S15.** Dining philosophers: (a) Does it also prevent deadlock if every *even-numbered* philosopher picks up the right fork first? (b) A different fix lets at most four philosophers try to eat at once, using a semaphore initialized to 4. Why does that prevent deadlock?

*Solution.*

(a) **Yes.** With even philosophers taking the right fork first, P0 and P1 both reach for f1 first, and P2 and P3 both reach for f3 first. In each pair, the one who loses holds **nothing**. So the five philosophers can never all be holding one fork each, and the circular wait cannot close. In general, any arrangement where not everyone reaches in the same direction breaks the cycle.

(b) With at most 4 philosophers at the table and 5 forks, even if all 4 hold one fork, one fork is still free. One of the seated philosophers is next to it, so that philosopher can take it, eat, and release both forks. Someone can always make progress, so there is no deadlock. This is the multiplex pattern (LBoS 4.4 calls the semaphore the "footman").

---

**S16.** For each technique, name the deadlock condition it removes: (a) always locking in address order; (b) taking a global lock around all lock acquisitions; (c) `trylock` that releases what it holds on failure; (d) a lock-free counter using compare-and-swap.

*Solution.* (a) **Circular wait**. (b) **Hold and wait**. (c) **No preemption** (OSTEP's classification). Tutorial 6 files it under hold and wait, since after releasing, the thread never waits while holding a lock; both views are reasonable. (d) **Mutual exclusion**.

---

**S17.** T1 holds A and waits for B. T2 holds B and waits for C. T3 holds C and is running, and will not request anything else. Is the system deadlocked? What if T3 then requests A?

*Solution.* **Not deadlocked.** T3 is not waiting for anything, so it will finish and release C. Then T2 gets C, finishes, and releases B, and then T1 gets B. There is a chain, but no cycle. If T3 then requests A, there is a cycle: T1 waits for T2 (B), T2 waits for T3 (C), and T3 waits for T1 (A). All four conditions now hold: **deadlock**.

---

**S18.** There are 12 units of a resource. T0 has maximum 10 and holds 5; T1 has maximum 4 and holds 2; T2 has maximum 9 and holds 3. Is this state safe under the Banker's algorithm? Explain.

*Solution.* The free units are 12 − (5 + 2 + 3) = **2**. The remaining needs are T0: 5, T1: 2, T2: 6.

1. T1 can finish (needs 2, has 2 free). It returns its 4, so 4 are free.
2. Now T0 needs 5 and T2 needs 6, but only 4 are free. Neither can be guaranteed to finish.

The state is **unsafe**. Unsafe does not mean deadlocked yet: it means a deadlock *can* happen if the threads ask for their maximums. This is exactly the state in 4.5's example after granting T2 one more unit, which is why the Banker's algorithm refuses that request.

---

**S19.** Classify each bug as an atomicity violation, an order violation or a deadlock, and give a fix: (a) Thread 1 checks `if (q->head != NULL)` and then reads `q->head->value`, while Thread 2 may remove the head. (b) The main thread creates a worker that immediately uses a global config pointer, and only afterwards does the main thread set that pointer. (c) Function `transfer(a, b)` locks account a, then account b; two threads call `transfer(x, y)` and `transfer(y, x)`.

*Solution.*

(a) **Atomicity violation.** The check and the use are meant to be one atomic step, but nothing makes them one. **Fix:** hold the queue's lock across both the check and the read, and in the remover.

(b) **Order violation.** The worker assumes the pointer was set before it runs. **Fix:** set the pointer *before* creating the thread, or make the worker wait (on a semaphore initialized to 0, or a flag plus a CV) until main has set it.

(c) **Deadlock** (circular wait): one thread holds x and wants y; the other holds y and wants x. **Fix:** always lock the two accounts in a global order, for example by account number or by address, whatever the argument order.

---

**S20.** A program sometimes hangs. `top -H` shows its threads at 0% CPU. What is the likely bug class, and how would you find exactly where each thread is stuck? What if they showed 100% CPU instead?

*Solution.* **0% CPU** means the threads are asleep, blocked. The likely cause is a **deadlock**, or a **lost wakeup** (a thread sleeping in `cond_wait` that nobody will ever signal, like Tutorial 6's "forgot to signal" variant). To find it:

1. Attach with `gdb -p $(pgrep prog)`.
2. Run `thread apply all bt`, which shows exactly which `pthread_mutex_lock` or `pthread_cond_wait` call, on which line, each thread is stuck in.
3. Helgrind can also report lock-order inversions directly.

**100% CPU with no progress** suggests a **livelock**, or threads spinning on a lock or flag. Use `perf` or gdb backtraces to see where they are looping.

---

**S21 (theory).** State the three requirements for a solution to the critical-section problem. For each of these, say which requirements it meets: (a) the load/store flag lock, (b) the test-and-set spin lock, (c) the ticket lock, (d) disabling interrupts on one CPU.

*Solution.* The requirements are **mutual exclusion, progress and bounded waiting**. (a) The flag lock fails **mutual exclusion**: two threads can both see 0. (b) Test-and-set gives mutual exclusion and progress but **not bounded waiting**: a thread can lose every race. (c) The ticket lock meets **all three**, because tickets are served in FIFO order. (d) Disabling interrupts meets all three on a single CPU, but only if the code can be trusted not to keep interrupts off forever, and it does not work on several CPUs.

---

**S22 (theory).** Write Peterson's algorithm for two threads. Prove that it gives mutual exclusion and bounded waiting. Why does it fail on a modern multicore CPU without extra help?

*Solution.* See the Peterson section above for the code: `flag[self] = 1; turn = other; while (flag[other] && turn == other) ;`. **Mutual exclusion:** suppose both are inside. Then both flags are 1, so T0 could only pass if turn = 0, and T1 only if turn = 1. turn holds one value, so this is impossible: whichever thread wrote turn last sees `turn == other` and spins. **Bounded waiting:** if T0 waits, then when T1 leaves and tries again, T1 sets turn = 0 and so lets T0 in first. T0 waits for at most one entry by T1. **Modern hardware:** CPUs and compilers may reorder the stores to flag and turn with the loads after them, so both threads can read the other's flag as 0. It needs memory barriers.

---

**S23 (theory).** A program spends 20% of its time in serial code. (a) What is the maximum speedup on 4 cores, and on 16? (b) What is the limit as the cores grow without bound? (c) Explain the difference between concurrency and parallelism.

*Solution.* (a) On 4 cores: $1 / (0.2 + 0.8/4) = 1 / 0.4 = $ **2.5**. On 16 cores: $1 / (0.2 + 0.05) = $ **4**. (b) $1/0.2 = $ **5**, no matter how many cores. (c) **Concurrency:** several tasks are in progress at once, possibly by interleaving on one core. **Parallelism:** tasks run at the same instant on different cores. Parallelism needs several cores; concurrency does not.

---

**S24 (theory).** Compare user-level and kernel-level threads, and the many-to-one, one-to-one and many-to-many models. Which model does Linux use, and why?

*Solution.* User-level threads are fast to create and switch (no system call), but one blocking system call blocks every thread in the process, and they cannot use several cores. Kernel threads can run in parallel and block independently, but each operation costs a system call. **Many-to-one:** no parallelism, and one block stops everything. **One-to-one:** true parallelism, at the cost of a kernel thread per user thread. **Many-to-many:** flexible, but complex to implement. Linux (and Windows) use **one-to-one**, because kernel threads are cheap enough today and the model is simple.

---

**S25 (theory).** An approximate counter has 4 CPUs and threshold S = 100. (a) Describe update and get. (b) How far can the global count lag behind the true count? (c) What happens if S = 1, and if S = 10⁶?

*Solution.* (a) **Update:** lock the local (per-CPU) counter and increment it. If it reaches S, lock the global counter, add the local value to it, and reset the local one to 0. **Get:** lock the global counter and return it (an approximation). (b) Each CPU can hold up to S − 1 unflushed updates, so the lag is up to about **4 × 99 = 396**. (c) With S = 1, every update touches the global lock, so it is exact but does not scale, like one lock. With S = 10⁶, it scales almost perfectly, but the global value can be wrong by millions.

---

**S26 (theory).** Explain Hoare and Mesa semantics for `signal`. Show a case where `if` is safe under Hoare semantics but unsafe under Mesa semantics. Which do real systems use?

*Solution.* **Hoare:** the signaller hands the lock and the CPU straight to the woken thread, so the condition is still true when that thread runs. **Mesa:** the woken thread only becomes ready, and runs later. Example: a consumer waits because count == 0. A producer puts an item and signals. Under Hoare, the consumer runs at once and the item is still there, so `if` is enough. Under Mesa, a second consumer can run first and take the item, so the woken consumer must re-check (`while`). Real systems (pthreads, Java, Linux) use **Mesa**, and also allow spurious wake-ups.

---

**S27 (theory).** Draw the resource-allocation graph for: T1 holds R1 and requests R2; T2 holds R2 and requests R3; T3 holds R3. (a) Is there a deadlock? (b) T3 now requests R1. Now? (c) If R2 had two instances, would a cycle always mean deadlock?

*Solution.* The edges are R1 → T1, T1 → R2, R2 → T2, T2 → R3, R3 → T3. (a) **No cycle, so no deadlock.** T3 can finish and release R3, then T2, then T1. (b) Adding T3 → R1 creates the cycle T1 → R2 → T2 → R3 → T3 → R1 → T1. With one instance of each resource, a cycle **is** a deadlock. (c) **No.** With several instances, a cycle is necessary but not sufficient: another holder of R2 outside the cycle may finish and free an instance, which breaks the wait.

---

**S28 (theory).** How does a kernel implement a blocking semaphore? Why does it still need a spinlock or disabled interrupts, and why is that acceptable? How can the waiting list cause starvation?

*Solution.* The semaphore holds a value and a **list of waiting processes**. `wait`: decrement; if the value is negative, add the caller to the list and block it (taking it off the run queue). `signal`: increment; if the value is ≤ 0, remove a process from the list and wake it (make it ready). The updates to the value and the list must be atomic, so the kernel disables interrupts (one CPU) or takes a spinlock (many CPUs). This is acceptable because the critical sections are only a few instructions long, unlike the application's critical section, which may be long. If the list is **LIFO**, a waiter can be overtaken forever (starvation). A **FIFO** list gives bounded waiting.
