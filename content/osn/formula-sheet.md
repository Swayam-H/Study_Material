# Formula sheet, Lectures 01 to 17

Every number-crunching rule from the course on one page, in the same notation as the notes.

## Scheduling (L05 to L07)

Turnaround and response, for one job:

$$
\boxed{T_{\text{turnaround}} = T_{\text{completion}} - T_{\text{arrival}} \qquad T_{\text{response}} = T_{\text{first run}} - T_{\text{arrival}}}
$$

Averages are taken over all jobs. SJF/STCF minimize average turnaround; RR minimizes average response but usually has the worst turnaround.

CFS time slice and vruntime growth, where $w_0 = 1024$ is the weight of nice 0:

$$
\boxed{\text{time\_slice}_k = \frac{w_k}{\sum_i w_i} \cdot \text{sched\_latency} \qquad \Delta\text{vruntime}_k = \frac{w_0}{w_k} \cdot \text{runtime}_k}
$$

A slice never drops below `min_granularity` (6 ms in the slides), even with many processes.

## Networking (L08 and L09)

TCP timeout estimation (EWMA, update EstimatedRTT first, then DevRTT):

$$
\boxed{\begin{aligned}
\text{EstimatedRTT} &= (1-\alpha)\,\text{EstimatedRTT} + \alpha\,\text{SampleRTT}, \quad \alpha = 0.125\\
\text{DevRTT} &= (1-\beta)\,\text{DevRTT} + \beta\,|\text{SampleRTT} - \text{EstimatedRTT}|, \quad \beta = 0.25\\
\text{TimeoutInterval} &= \text{EstimatedRTT} + 4\,\text{DevRTT}
\end{aligned}}
$$

Sending limits and throughput:

$$
\boxed{\text{LastByteSent} - \text{LastByteAcked} \le \min(\text{cwnd}, \text{rwnd}) \qquad \text{throughput} \approx \frac{\text{cwnd}}{\text{RTT}}}
$$

Congestion control: slow start doubles cwnd every RTT until ssthresh, then +1 MSS per RTT. On a triple duplicate ACK, ssthresh = cwnd/2 and cwnd = ssthresh. On a timeout, ssthresh = cwnd/2 and cwnd = 1 MSS.

Internet checksum: add the 16-bit words with end-around carry, then take the one's complement. The receiver's sum of all words plus the checksum must be 0xFFFF.

## Memory (L10 to L13)

Base and bounds:

$$
\boxed{0 \le VA < \text{bounds} \;\Rightarrow\; PA = VA + \text{base}, \quad \text{else fault}}
$$

Segmentation: find the offset inside the segment first, then add that segment's base. For a segment that grows downward (the stack), the offset is negative:

$$
\boxed{PA = \text{base}_{\text{seg}} + \text{offset}, \qquad \text{offset}_{\text{neg}} = \text{raw offset} - \text{max segment size}}
$$

Paging with a page size of $2^k$ bytes and an $n$-bit virtual address:

$$
\boxed{\text{offset bits} = k, \quad \text{VPN bits} = n - k, \quad PA = (\text{PFN} \ll k) \mid \text{offset}}
$$

Size of a linear page table:

$$
\boxed{\text{page table size} = 2^{\,n-k} \times \text{PTE size}}
$$

For example, 32-bit addresses with 4 KB pages and 4-byte PTEs give $2^{20} \times 4 = 4$ MB per process.

Multi-level page tables: with page size $P$ and PTE size $e$, one page of the table holds $P/e$ entries, so each level indexes $\log_2(P/e)$ bits of the VPN:

$$
\boxed{\text{levels} = \left\lceil \frac{\text{VPN bits}}{\log_2(P/e)} \right\rceil}
$$

Effective access time with a TLB (lookup $t$, memory access $m$, hit rate $h$, single-level table):

$$
\boxed{EAT = h\,(t + m) + (1-h)\,(t + 2m)}
$$

With an $L$-level table, a miss costs $t + (L+1)m$ instead of $t + 2m$.

Average memory access time with swapping (memory $T_M$, disk $T_D$):

$$
\boxed{AMAT = T_M + P_{\text{miss}} \cdot T_D}
$$

## Concurrency (L14 to L17)

A semaphore's value, when negative, is minus the number of waiting threads. Initial values for the standard uses:

| Use | Initial value |
|---|---|
| Lock (binary semaphore) | 1 |
| Ordering (wait for an event) | 0 |
| Bounded buffer, `empty` / `full` | N / 0 |
| Throttle to at most k threads | k |

Deadlock needs all four: mutual exclusion, hold and wait, no preemption, circular wait. Breaking any one prevents it, and a global lock order breaks circular wait.
