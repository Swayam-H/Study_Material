# Lecture 08, part 1: The parts of a network

*Slides: L08-L09. Read: K&R ch 1 (1.1-1.5), 2.7 (socket programming), ch 3 (all). Tutorial 4. Practice sheet: `09 - Transport Layer - Practice Questions.pdf`.*

Units 0 and 1 dealt with processes on one machine. This unit asks how a process on one machine talks to a process on another, and what the OS does to make that work.

*L08 s3-18. K&R 1.1-1.3.*

**Hosts.** A host is any device that sends or receives data: a laptop, a phone, a server. In the **client-server** model, the client sends a request and the server sends a response. A server can also act as a client, for example a web server that asks a file server for data.

**IP address.** IPv4 addresses are 32 bits, written as four octets of 8 bits each (0-255), such as `192.168.1.1`. Every packet carries a source IP and a destination IP.

**Devices, from simplest to smartest (L08 s8-13).**

| Device | Layer | What it does |
| --- | --- | --- |
| Repeater | L1 | Regenerates a weak signal so it can travel further |
| Hub | L1 | A repeater with many ports: every host receives everyone's traffic |
| Bridge | L2 | Sits between two hubs and learns which hosts are on each side, so it forwards only what needs to cross |
| Switch | L2 | Many ports; learns which host (MAC address) is on each port and sends a frame only to its destination. Everything on one switch is one network |
| Router | L3 | Connects *different* networks. Keeps a **routing table** and has an IP address in each network it joins |

A switch alone cannot get a packet from `192.168.10.20` to a host on `172.190.20.x`, because that host is on another network. The packet must go through a **router**. The router's address on your network is your **default gateway**, the exit point for all traffic leaving the network. The Internet is, at heart, a very large mesh of routers.

**Network sizes (L08 s15-17).**

- **PAN:** a few metres, for example Bluetooth.
- **LAN:** one building. Wired LANs run at 100 Mbps-40 Gbps; Wi-Fi runs at 11 Mbps-7 Gbps. In networking, 1 Mbps means 10⁶ bits per second, not 2²⁰.
- **MAN:** a city, for example cable TV networks.
- **WAN:** a country or continent. The Internet is the biggest WAN.

Early LANs shared one cable, so only one machine could transmit at a time. When two transmitted together their signals collided, and each waited a random time before trying again.

# Lecture 08, part 2: Layering

*L08 s19-32. K&R 1.5.*

Sending data across the world involves many separate problems: signalling bits on a wire, getting a frame to the next device, routing across networks, and delivering to the right program. **Layering** splits these into a stack. Each layer:

- Uses only the service of the layer below it.
- Offers a service to the layer above it, through an **interface**.
- Talks to the *same* layer on the other machine through a **protocol**, an agreed set of rules.

The set of layers and protocols together is called the **network architecture**.

**The OSI model (7 layers).**

| # | Layer | Job | Address / unit | Examples |
| --- | --- | --- | --- | --- |
| 7 | Application | Network services for programs | message | HTTP, SMTP, DNS |
| 6 | Presentation | Data format, encryption, compression |  | TLS, JPEG |
| 5 | Session | Open, maintain and close sessions |  |  |
| 4 | Transport | **Process to process**: reliability, ordering, flow control | **port**, segment | TCP, UDP |
| 3 | Network | **End to end** across many hops: routing and forwarding | **IP address**, packet | IP, ICMP, routers |
| 2 | Data link | **Hop to hop** between directly connected nodes | **MAC address** (48 bits), frame | Ethernet, Wi-Fi card, switch |
| 1 | Physical | Raw bits on a medium | bit | Cable, fibre, radio, hub |

**The TCP/IP model (4 layers)** is what the Internet actually uses:

- **Application** = OSI 5-7 (HTTP, SMTP, DNS, RTP)
- **Transport** = OSI 4 (TCP, UDP)
- **Internet** = OSI 3 (IP, ICMP)
- **Link** = OSI 1-2 (Ethernet, 802.11, DSL)

**Encapsulation (L08 s30).** On the way down, each layer wraps whatever it receives from above with its own header, treating that content as an opaque payload:

```
Application data
Transport:  [TCP hdr | data]                      = segment
Network:    [IP hdr | TCP hdr | data]             = packet (datagram)
Link:       [MAC hdr | IP hdr | TCP hdr | data | trailer] = frame
Physical:   1000100001000001000...                = bits
```

The receiver strips the headers in reverse order (**decapsulation**). A router only goes up to L3: it reads the IP header and never looks at TCP. A switch only goes up to L2.

**Hop-to-hop vs. end-to-end (L08 s26-27).** Say Machine 234 sends to Machine 345 through two routers:

- **L2** delivers the frame across each single link (host to switch to router, and so on). It uses MAC addresses, which are rewritten at every hop.
- **L3** gets the packet from 234 all the way to 345. The source and destination IP addresses stay the same along the whole path.
- **L4** then delivers the data to the right *process* on 345, using the port number.

# Lectures 08 and 09: What the OS does for networking

*L08 s33-37, L09 s5-13.*

The slides follow one video-call frame from an app on Host 1 to an app on Host 2. Every step relies on OS ideas from Unit 1:

1. The app calls `send()`. This is a **system call**, a trap into the kernel.
2. The kernel copies the data into a **kernel buffer**, and the protocol stack adds the TCP and IP headers.
3. The kernel passes the packet to the **NIC driver**. The network card is just another device, like a disk.
4. The process may **block** while the NIC works. When the NIC finishes, it raises an **interrupt**.
5. Switches and routers forward the packet. No host OS is involved in this step.
6. Host 2's NIC receives the frame and raises an **interrupt**.
7. Host 2's kernel decapsulates (MAC, then IP, then TCP) and puts the data in the socket's **receive buffer**.
8. The receiving app was **blocked** in `recv()`. The OS moves it to **Ready**, and the scheduler eventually runs it.

**Lost packets.** When TCP sends a segment, the OS starts a **timer**. If no ACK comes back before it fires, the timer interrupt runs TCP code that resends the segment. This is the same timer mechanism that preempts processes.

**The socket API (L09 s8-10).** A **socket** is the OS's abstraction for one end of a network connection. To the program, a socket is just a **file descriptor**. The API came from Berkeley Unix in 1983. There are two kinds:

- **Stream** sockets (`SOCK_STREAM`, TCP): reliable and connection-oriented.
- **Datagram** sockets (`SOCK_DGRAM`, UDP): unreliable and connectionless.

| Call | Who uses it | What it does |
| --- | --- | --- |
| `socket()` | both | Create a socket and return a file descriptor |
| `bind()` | server (UDP client optional) | Attach the socket to a local IP and port |
| `listen()` | TCP server | Mark the socket as passive, ready to accept connections |
| `accept()` | TCP server | **Block** until a client connects; return a **new** file descriptor for that client |
| `connect()` | TCP client | Start the 3-way handshake with the server |
| `send()` / `recv()` | both (TCP) | Send or receive bytes; `recv()` blocks until data arrives |
| `sendto()` / `recvfrom()` | both (UDP) | Same, but with the peer's address on each call |
| `close()` | both | Close the connection (starts the FIN exchange) |

**TCP echo server and client** (K&R 2.7 has the same programs in Python):

```c
// server
int s = socket(AF_INET, SOCK_STREAM, 0);
struct sockaddr_in a = { .sin_family = AF_INET,
                         .sin_port = htons(8080),
                         .sin_addr.s_addr = INADDR_ANY };
bind(s, (struct sockaddr*)&a, sizeof a);
listen(s, 10);                       // queue up to 10 pending connections
for (;;) {
    int c = accept(s, NULL, NULL);   // blocks; c is a NEW fd for this client
    char buf[1024];
    ssize_t n = recv(c, buf, sizeof buf, 0);
    send(c, buf, n, 0);              // echo it back
    close(c);                        // s stays open for the next client
}

// client
int s = socket(AF_INET, SOCK_STREAM, 0);
struct sockaddr_in srv = { .sin_family = AF_INET, .sin_port = htons(8080) };
inet_pton(AF_INET, "127.0.0.1", &srv.sin_addr);
connect(s, (struct sockaddr*)&srv, sizeof srv);   // 3-way handshake happens here
send(s, "hi", 2, 0);
recv(s, buf, sizeof buf, 0);
close(s);
```

Things to notice:

- `htons()` converts the port to **network byte order** (big-endian).
- The server has two kinds of sockets. The **listening socket** `s` stays open. Each **connected socket** `c` belongs to one client.
- The client never calls `bind()`. The OS gives it an **ephemeral port** automatically.
- One `send()` of 1000 bytes may arrive as two `recv()` calls of 600 and 400 bytes. TCP is a byte stream with no message boundaries, so real code loops until it has everything.

A UDP version skips `listen()`, `accept()` and `connect()`. The server binds and then loops on `recvfrom()`, which returns the sender's address so it can `sendto()` a reply.

**Blocking calls and scheduling (L09 s13).** `accept()`, `connect()` and `recv()` block. The process goes to the Blocked state and the scheduler runs something else. This is exactly the CPU-I/O overlap from Unit 1.

**Ports (L09 s11-12).** A port is a 16-bit number (0-65535), like a mailbox that a process rents from the OS:

- 0-1023 are *well-known* ports and need privilege to bind.
- 1024-49151 are *registered* ports.
- Clients get temporary *ephemeral* ports.

| Port | Protocol |
| --- | --- |
| 20, 21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |

**Link directions.** A *full-duplex* link carries data both ways at once. A *half-duplex* link carries data both ways, but one direction at a time (a walkie-talkie). A *simplex* link goes one way only (a TV broadcast).

# Lecture 09, part 1: Multiplexing and UDP

*L09 s15-25. K&R 3.1-3.3.*

The transport layer gives **logical communication between processes**. The sender splits messages into segments; the receiver reassembles them. It runs only on the end hosts, never on routers.

**Multiplexing and demultiplexing (L09 s17-19).**

- **Multiplexing** happens at the sender. Data from many sockets (WhatsApp, Chrome, and so on) gets a transport header with port numbers, and goes out through one network interface.
- **Demultiplexing** happens at the receiver. The OS uses the header to hand each segment to the right socket.

UDP and TCP demultiplex differently:

- **UDP socket = 2-tuple** (destination IP, destination port). Segments from *different* senders to the same port all go to the *same* socket.
- **TCP socket = 4-tuple** (source IP, source port, destination IP, destination port). A web server on port 80 with 100 clients has 100 connected sockets plus the listening socket. Each connected socket is picked out by the client's IP and port.

**Example.** Clients A (`10.0.0.1:5000`) and B (`10.0.0.2:5000`) both connect to server S on port 80. Over TCP, their segments go to two different sockets, because the source IPs differ. Over UDP, both would arrive at the same socket on port 80.

**TCP vs. UDP (L09 s21-23).**

|  | TCP | UDP |
| --- | --- | --- |
| Connection | Handshake before any data | None ("fire and forget") |
| Reliability | ACKs and retransmission; in-order delivery | None; segments can be lost, duplicated or reordered |
| Flow control | Yes (receive window) | No |
| Congestion control | Yes (cwnd) | No |
| Errors | Detected and recovered from | Checksum only; bad segments are silently dropped |
| Header | 20 bytes or more | 8 bytes |
| Used for | HTTP/HTTPS, file transfer, email | Streaming, VoIP, DNS, games |

UDP is chosen when lateness is worse than loss (a video frame that arrives late is useless), or when the exchange is one small request and reply (DNS). An application can build its own reliability on top of UDP. Your MP2 mastermind game used acknowledgements and retransmission over UDP in this way.

**UDP header (L09 s24).** Four 16-bit fields: source port, destination port, length (header plus data, in bytes) and checksum.

**Internet checksum (L09 s25).** The checksum lets the receiver detect corrupted bits:

1. Treat the segment (plus a pseudo-header holding the IP addresses) as a series of 16-bit words.
2. Add them using **one's-complement addition**: any carry out of the top bit is added back in at the bottom.
3. Flip every bit of the result. That is the checksum.

The receiver adds all the words *including* the checksum. If the result is all 1s, no error was detected.

**Example (from the slide).**

```
  1110 0110 0110 0110
+ 1101 0101 0101 0101
= 1 1011 1011 1011 1011     carry out of the top bit
  wrap the carry around:
= 1011 1011 1011 1100       sum
checksum = 0100 0100 0100 0011  (flip every bit)
```

The checksum can miss errors, for example two bits flipped in the same column of different words. It detects errors but cannot correct them.

# Lecture 09, part 2: TCP

*L09 s26-42. K&R 3.4-3.7.*

TCP gives a reliable, in-order **byte stream** between two processes. It makes four promises:

1. **Reliable delivery:** every byte sent eventually arrives, or the sender finds out it didn't.
2. **In-order delivery:** bytes arrive in the order they were sent.
3. **Flow control:** the sender never overruns the receiver's buffer.
4. **Congestion control:** the sender never overruns the network.

## The TCP header

| Field | Size | Purpose |
| --- | --- | --- |
| Source port, destination port | 16 bits each | Demultiplexing |
| **Sequence number** | 32 bits | Byte position of the **first data byte** in this segment. It counts bytes, not segments |
| **Acknowledgement number** | 32 bits | The **next byte expected**: "I have everything before this." Valid only when ACK is set |
| Header length | 4 bits | Header size; needed because options vary in length |
| Flags |  | **SYN** opens a connection; **ACK** marks the ack number as valid; **FIN** means no more data from this side; **RST** aborts the connection; **PSH** asks for immediate delivery; **URG** marks urgent data |
| **Receive window** | 16 bits | Free buffer space at the receiver (flow control) |
| Checksum | 16 bits | Same one's-complement method as UDP |
| Urgent pointer | 16 bits | End of urgent data (rarely used) |
| Options | variable | MSS, window scaling, timestamps, SACK |

**Sequence numbers (L09 s31).** In the Telnet echo example from K&R:

1. The client sends `Seq=42, ACK=79, data="C"`.
2. The server echoes back `Seq=79, ACK=43, data="C"`. ACK=43 means "I got byte 42; send 43 next."
3. The client replies `Seq=43, ACK=80`.

The ACK is **cumulative**: ACK = n confirms *every* byte up to n − 1. The ACK for the client's data rides along on the server's data segment; this is called **piggybacking**.

## Connection setup and teardown

**3-way handshake (L09 s39):**

1. The client sends **SYN** with seq = x (a random initial sequence number).
2. The server sends **SYN-ACK** with seq = y and ack = x + 1.
3. The client sends **ACK** with ack = y + 1. This segment may already carry data.

Why three messages? Each side must choose its starting sequence number *and* see the other side acknowledge it. With only two, the server could never be sure its own SYN arrived. SYN and FIN each use up one sequence number, even though they carry no data.

**4-way close (L09 s41):**

1. The client sends FIN.
2. The server ACKs it.
3. The server sends its own FIN, possibly much later, because the server may still have data to send. This is a *half-close*.
4. The client ACKs it, then waits in **TIME\_WAIT** for 2 × MSL (maximum segment lifetime).

TIME\_WAIT has two purposes. If the final ACK is lost, the server will resend its FIN, and the client is still there to answer. It also stops stray old segments from being mistaken for part of a new connection on the same ports.

## Reliability

**Timeout and retransmission (L09 s32-33).** TCP sets the timeout from a smoothed estimate of the round-trip time (RTT):

$$
\boxed{\begin{aligned}
\text{EstimatedRTT} &= (1-\alpha)\,\text{EstimatedRTT} + \alpha\,\text{SampleRTT}, \quad \alpha = 0.125\\
\text{DevRTT} &= (1-\beta)\,\text{DevRTT} + \beta\,|\text{SampleRTT} - \text{EstimatedRTT}|, \quad \beta = 0.25\\
\text{TimeoutInterval} &= \text{EstimatedRTT} + 4\,\text{DevRTT}
\end{aligned}}
$$

This is an **exponentially weighted moving average** (EWMA). Older samples count for less and less over time.

- If the timeout is too short, TCP resends segments that were not lost.
- If it is too long, TCP is slow to recover from a real loss.
- The 4 × DevRTT margin grows when the network is jittery and shrinks when it is steady.
- K&R adds a rule: never take an RTT sample from a retransmitted segment, because you cannot tell which copy the ACK belongs to.
- After a timeout, TCP doubles the timeout interval.

**Worked example.** EstimatedRTT = 100, DevRTT = 10, and a new SampleRTT of 140 ms arrives:

- EstimatedRTT = 0.875 × 100 + 0.125 × 140 = **105**
- DevRTT = 0.75 × 10 + 0.25 × |140 − 105| = 7.5 + 8.75 = **16.25**
- Timeout = 105 + 4 × 16.25 = **170 ms**

K&R updates EstimatedRTT first, then uses the new value in DevRTT. Follow that order.

**Fast retransmit (L09 s34).** A receiver that gets a segment *after a gap* immediately re-sends its last ACK; this is a **duplicate ACK**. If the sender sees **3 duplicate ACKs** (the same ACK value 4 times in total), it resends the missing segment right away, without waiting for the timer.

**Example.** The sender sends segments 100, 101, 102, 103 and 104, and 101 is lost. The receiver ACKs 100 with ACK 101. Then 102, 103 and 104 each produce another ACK 101. After the third duplicate, the sender resends 101.

## Flow control

**Flow control (L09 s35)** protects the **receiver**. The receiver advertises **rwnd**, its free buffer space. The sender keeps:

$$
\boxed{\text{LastByteSent} - \text{LastByteAcked} \le \text{rwnd}}
$$

The left side is the amount of data **in flight**: sent, but not yet acknowledged.

- When the receiving app reads data out of its buffer, the window opens up again.
- If rwnd = 0, the sender stops. It sends small *probe* segments so it learns when the window reopens.

## Congestion control

**Congestion control (L09 s36-38)** protects the **network**. If too many senders push too hard, router queues overflow, packets are dropped, and everyone's throughput collapses. TCP cannot ask the routers how busy they are, so it treats **packet loss as the signal** of congestion.

Each sender keeps a **congestion window, cwnd**, and its sending is limited by both windows:

$$
\boxed{\text{in-flight data} \le \min(\text{cwnd}, \text{rwnd}), \qquad \text{throughput} \approx \frac{\text{cwnd}}{\text{RTT}}}
$$

TCP moves through these phases:

- **Slow start.** cwnd starts at 1 MSS (maximum segment size) and grows by 1 MSS for every ACK. That **doubles cwnd every RTT**: 1, 2, 4, 8 and so on. It switches to congestion avoidance when cwnd reaches **ssthresh**.
- **Congestion avoidance (additive increase).** cwnd grows by **1 MSS per RTT**, which is linear growth.
- **Triple duplicate ACK (multiplicative decrease).** Some data is still getting through, so this is a mild warning. ssthresh = cwnd / 2, cwnd = ssthresh, and TCP continues linearly. This step is called **fast recovery** (TCP Reno).
- **Timeout.** Nothing is getting through, which is a severe signal. ssthresh = cwnd / 2, cwnd = 1 MSS, and TCP goes back to slow start.

This pattern is called **AIMD** (Additive Increase, Multiplicative Decrease). It gives cwnd the classic **sawtooth** shape over time, and it shares bandwidth fairly between competing flows.

**Worked trace.** ssthresh = 16 MSS, and cwnd starts at 1:

| Round (RTT) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cwnd (MSS) | 1 | 2 | 4 | 8 | 16 | 17 | 18 | 19 | 20 | 10 | 11 |
| Phase | SS | SS | SS | SS | CA | CA | CA | CA | CA (3 dup ACKs) | CA | CA |

After the loss in round 9, ssthresh = 10 and cwnd = 10. Had the loss been a timeout instead, cwnd would drop to 1 and slow start would begin again, now with ssthresh = 10.

**Flow control vs. congestion control.** Both slow the sender down, but for different reasons. Flow control is about the *receiver's* buffer, and the receiver states it directly in the rwnd field. Congestion control is about *routers* in the middle, and the sender has to infer it from loss.

# Practice problems, Lectures 08 and 09

Try each one before you open its solution. Problems marked **(L08)** are the lecture's own review questions, and **(sheet)** ones come from the "Transport Layer - Practice Questions" PDF.

**N1 (L08).** A switch connects hosts H1, H2 and H3 within the network 192.168.10.x. Explain why the switch alone cannot let H2 communicate with a host on a completely different network, and name the device that makes this possible.

*Solution.* A switch works at the **data link layer (L2)**. It forwards frames by **MAC address** between hosts on the same local network. It has no notion of IP networks or routes, so it cannot decide how to send a packet to a host outside 192.168.10.x. That needs a **router**, which works at the **network layer (L3)**: it reads the destination **IP address** and forwards the packet towards the destination network, hop by hop.

---

**N2 (L08).** Using the OSI model, explain why data sent by an application on Host 1 must pass down through Layers 7 to 1 before reaching the physical medium, and then back up through Layers 1 to 7 on Host 2, instead of going directly from application to application.

*Solution.* Two applications on different hosts have no direct connection: the only thing that physically links the two machines is the medium at **Layer 1**. Each layer provides a service to the layer above by using the layer below. Each layer also talks *logically* to its peer layer on the other host, through the header it adds. So the data must go down the stack to reach the wire, and back up the stack on the other side, where each layer reads and removes its peer's header. This layering keeps each layer independent: the application does not need to know about routing, MAC addresses or signalling, and a layer's technology (say, Wi-Fi instead of Ethernet) can change without affecting the others.

---

**N3 (L08).** Describe encapsulation as data moves from the Application layer down to the Physical layer. Define a segment, a packet and a frame, and explain how decapsulation reverses the process at the receiving host.

*Solution.* Going down the stack, each layer wraps what it receives in its own header:

1. The **application** produces a message.
2. The **transport layer** adds a header with ports, sequence numbers and a checksum. The result is a **segment**.
3. The **network layer** adds an IP header with the source and destination IP addresses. The result is a **packet** (datagram).
4. The **data link layer** adds a header with MAC addresses and a trailer with an error check. The result is a **frame**.
5. The **physical layer** sends the frame as bits.

At the receiver, **decapsulation** reverses this. Each layer checks and removes its own header and hands the payload up to the right protocol above (using a type, protocol or port field), until the application receives the original message.

---

**N4 (L08).** Machine 234 sends data to Machine 345 across two routers. Explain the difference between hop-to-hop and end-to-end delivery here, and which layer is responsible for each.

*Solution.* Per L08:

- **Hop-to-hop** delivery moves a frame from one node to the *next directly connected* node: 234 to the first router, router to router, and the last router to 345. This is the **data link layer (L2)**, using MAC addresses, which change at every hop.
- **End-to-end** delivery gets the data all the way from 234 to 345 across those hops, choosing the route. This is the **network layer (L3)**, using IP addresses, which stay the same for the whole trip.

The transport layer (L4) then extends delivery from host-to-host to process-to-process, using ports.

---

**N5 (L08).** Using the example of sending one video-call frame from Host 1 to Host 2, describe two points in the journey where an **OS mechanism** (not a networking protocol) is essential, and what would go wrong at each without it.

*Solution.* Any two of these, from L08's walk-through of sending one video frame:

- **System call (trap) for `send()`.** The application cannot touch the network card directly; it must trap into the kernel. Without this protection, any process could read or write the NIC and other processes' data.
- **Kernel buffers (memory management).** The kernel copies the frame into OS-managed memory where TCP and IP headers are attached. Without them, the protocol stack would have nowhere to build packets or hold received data.
- **Interrupts from the NIC.** Interrupts tell the OS that a transmission finished or a packet arrived. Without them, the OS would have to poll the NIC constantly, wasting CPU, or would never notice arriving data.
- **Process states and the scheduler.** The receiving app is **blocked** on `recv()` and is moved to **ready** when data arrives. Without this, the app would have to spin while waiting, wasting the CPU.
- **Timers.** A timer interrupt tells TCP when to retransmit a lost segment. Without it, a lost packet would never be noticed.

---

**N6 (sheet Q1).** A host sends a 5000-byte application message over TCP. TCP adds a 20-byte header; IP adds a 20-byte header to every packet or fragment; Ethernet adds a 14-byte header and a 4-byte trailer (18 bytes) to every frame. The Ethernet MTU limits each IP packet (header plus payload) to 1500 bytes.

- (a) Why does the 1500-byte MTU constrain the IP packet but not the Ethernet header and trailer? Why does a lower layer never need to understand the payload it is handed?
- (b) How big is the TCP segment handed to IP?
- (c) Does it fit in one IP packet? If not, give the minimum number of fragments and the exact size of each. (IP fragments the segment as plain bytes and knows nothing of the TCP header; every fragment needs its own 20-byte IP header.)
- (d) Each fragment goes in its own Ethernet frame. How many bytes are transmitted on the wire in total?
- (e) After IP reassembles the fragments, how does the transport layer demultiplex the segment to the right socket, and which header fields does it use? Why can this not happen fragment by fragment?

*Solution.*

(a) The MTU limits **what the link layer will carry as its payload**, which is the IP packet. The Ethernet header and trailer are wrapped around that payload by the link layer itself, so they are outside the limit. Each layer treats what it is handed as an opaque string of bytes: it only needs *its own* header to do its job. This is what lets layers be designed and replaced independently.

(b) 5000 + 20 = **5020 bytes**.

(c) **No.** Each IP packet can carry at most 1500 − 20 = **1480 bytes** of payload. 5020 / 1480 = 3.39, so **4 fragments** are needed:

| Fragment | Payload | IP packet size |
| --- | --- | --- |
| 1 | 1480 (includes the 20-byte TCP header) | 1500 |
| 2 | 1480 | 1500 |
| 3 | 1480 | 1500 |
| 4 | 5020 − 3 × 1480 = 580 | 600 |

(1480 is a multiple of 8, as IP fragment offsets require.) Note that only fragment 1 contains the TCP header.

(d) Each frame adds 18 bytes: 3 × 1518 + 618 = **5172 bytes** on the wire. That is 172 bytes of overhead on 5000 bytes of data: 20 (TCP) + 4 × 20 (IP) + 4 × 18 (Ethernet).

(e) The IP layer reassembles the fragments using the **Identification**, **Flags** (more-fragments) and **Fragment Offset** fields, and its **Protocol** field (6) says to pass the result to TCP. TCP then demultiplexes using the **4-tuple**: source and destination IP (from the IP header) and **source and destination port** (from the TCP header). This cannot happen fragment by fragment, because:

- Only the first fragment contains the TCP header, and so the ports. Fragments 2-4 are just bytes, with nothing to say which socket they belong to.
- The TCP checksum covers the whole segment, so it cannot be verified until every fragment has arrived.

---

**N7 (sheet Q2).** A TCP sender starts with EstimatedRTT = 100 ms, DevRTT = 10 ms, α = 0.125 and β = 0.25. It then measures SampleRTT = 140, 90 and 115 ms.

- (a) Compute EstimatedRTT, DevRTT and TimeoutInterval after each sample, to 3 decimal places.
- (b) Right after sample 3, a 4th segment is sent and its ACK arrives 172 ms later. Would the timer already have fired, causing an unnecessary retransmission?
- (c) In one sentence: why does TCP use 4 × DevRTT as the margin, rather than a fixed constant such as 20 ms?

*Solution.* The formulas are EstimatedRTT = 0.875 · EstimatedRTT + 0.125 · Sample, then DevRTT = 0.75 · DevRTT + 0.25 · |Sample − EstimatedRTT|, and Timeout = EstimatedRTT + 4 · DevRTT. Here DevRTT uses the *just-updated* EstimatedRTT, as in the Unit 2 worked example. (RFC 6298 updates DevRTT first, using the old estimate, which gives slightly different numbers; follow whichever order your exam uses.)

| Sample | SampleRTT | EstimatedRTT | DevRTT | TimeoutInterval |
| --- | --- | --- | --- | --- |
| 1 | 140 | 0.875·100 + 0.125·140 = **105.000** | 0.75·10 + 0.25·35 = **16.250** | 105 + 65 = **170.000** |
| 2 | 90 | 0.875·105 + 0.125·90 = **103.125** | 0.75·16.25 + 0.25·13.125 = **15.469** | 103.125 + 61.875 = **165.000** |
| 3 | 115 | 0.875·103.125 + 0.125·115 = **104.609** | 0.75·15.469 + 0.25·10.391 = **14.199** | 104.609 + 56.797 = **161.406** |

(b) **Yes.** The timeout is 161.406 ms, and the ACK arrives at 172 ms. The timer fires about 10.6 ms before the ACK arrives, so the sender retransmits a segment that was not actually lost.

(c) DevRTT measures how much the RTT actually varies on this path, so the safety margin grows on jittery paths (avoiding spurious retransmissions) and shrinks on stable ones (so real losses are detected quickly), which no single fixed constant can do for every path.

---

**N8 (sheet Q3).** A TCP connection has MSS = 1000 bytes, a fixed RTT of 80 ms, cwnd = 1 MSS and ssthresh = 16 MSS at the start. One full window is sent and acknowledged every RTT.

- (a) Tabulate cwnd for rounds 1-9, marking slow start and congestion avoidance.
- (b) At the end of round 9, a loss is detected by three duplicate ACKs. Give the new ssthresh and cwnd.
- (c) Give cwnd for rounds 10, 11 and 12.
- (d) Approximate the throughput (cwnd / RTT) in Mbps at round 4 and at round 11.
- (e) If the loss at round 9 had been detected by a **timeout** instead, what would cwnd and ssthresh become, and which phase does TCP re-enter? Why does TCP treat the two loss signals differently?

*Solution.*

(a)

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cwnd (MSS) | 1 | 2 | 4 | 8 | 16 | 17 | 18 | 19 | 20 |
| Phase | SS | SS | SS | SS | reaches ssthresh | CA | CA | CA | CA |

Slow start doubles cwnd every RTT until it reaches ssthresh = 16 in round 5. From then on, congestion avoidance adds 1 MSS per RTT.

(b) Three duplicate ACKs trigger multiplicative decrease: **ssthresh = 20 / 2 = 10**, and **cwnd = 10** (fast recovery: no return to slow start).

(c) Rounds 10, 11, 12: **10, 11, 12** (congestion avoidance).

(d) Throughput ≈ cwnd × MSS / RTT.

- Round 4: 8 × 1000 bytes × 8 bits / 0.08 s = 800,000 bit/s = **0.8 Mbps**.
- Round 11: 11 × 8000 bits / 0.08 s = **1.1 Mbps**.

(e) On a timeout: **ssthresh = 10**, **cwnd = 1 MSS**, and TCP re-enters **slow start**. The reason for the difference: three duplicate ACKs prove that later segments are still getting through, so the network is only mildly congested. A timeout means nothing is coming back at all, which suggests severe congestion, so TCP backs off much harder.

---

**N9 (sheet Q4).** Flow control limits a sender to at most Window bytes in flight (LastByteSent − LastByteAcked), and TCP's ACKs are cumulative.

- (a) State the exact condition under which a sender with plenty of data must stop sending.
- (b) A sender has exactly W bytes in flight. The **first** of these segments is lost, but all the later ones arrive and are buffered. What ACK value does the receiver send back, and why does the sender's usable window not grow at all?
- (c) The lost segment is then retransmitted and arrives. What happens to the next ACK, and why can this one retransmission release a large burst of new data?
- (d) In one sentence: why can one early loss have an outsized effect on a flow-control-limited sender's throughput?

*Solution.*

(a) The sender must stop when **LastByteSent − LastByteAcked ≥ W**, that is, when a full window of unacknowledged data is in flight.

(b) Every segment that arrives after the gap produces an ACK carrying the **same** number: the first byte of the lost segment (the next byte the receiver expects in order). These are **duplicate ACKs**. Because ACKs are cumulative, the receiver cannot acknowledge any byte beyond the gap, even though it has buffered them. LastByteAcked therefore does not move, the sender still has W bytes in flight, and it cannot send anything new. (Three duplicate ACKs will trigger fast retransmit.)

(c) Once the missing segment arrives, the gap is filled, and the receiver's next ACK **jumps** to the byte after the last buffered segment, acknowledging all W bytes at once. LastByteAcked advances by W in one step, the in-flight amount drops to zero, and the sender may immediately send a **whole new window** of data as a burst.

(d) Because cumulative ACKs cannot move past a hole, one early loss freezes the entire window until the retransmission arrives (a timeout, or three duplicate ACKs plus a round trip), so throughput drops to almost zero for that time even though nearly all the data was delivered.

---

**N10.** Compute the 16-bit Internet checksum of the three words 0xF0F0, 0x1234 and 0x8001. Show how the receiver checks it. Give an example of a two-bit error the checksum would miss.

*Solution.* Add the words with 16-bit ones'-complement addition (any carry out of the top bit is added back in at the bottom):

1. 0xF0F0 + 0x1234 = 0x10324. Wrap the carry around: 0x0324 + 1 = **0x0325**.
2. 0x0325 + 0x8001 = **0x8326** (no carry).
3. The checksum is the bitwise complement: \~0x8326 = **0x7CD9**.

The receiver adds all four words, including the checksum: 0x8326 + 0x7CD9 = **0xFFFF**. All ones means no error was detected; any 0 bit means an error.

**A missed error:** if the lowest bit of 0xF0F0 flips from 0 to 1 (giving 0xF0F1) and the lowest bit of 0x8001 flips from 1 to 0 (giving 0x8000), the sum is unchanged, so the checksum still passes. Two errors in the same bit position, in opposite directions, cancel out.

---

**N11.** Two browsers on different machines both connect to a web server on port 80. (a) How does the server's OS deliver each arriving segment to the right connection socket? (b) How would this differ for a UDP server on port 53? (c) List the system calls a TCP server makes, in order, up to the point where it can read a client's request, and say what `accept` returns.

*Solution.*

(a) A TCP connection socket is identified by the **4-tuple** (source IP, source port, destination IP, destination port). Both clients' segments have destination port 80, but their source IPs and ports differ, so the OS finds a different connection socket for each. The listening socket on port 80 only receives new connection requests (SYNs).

(b) A UDP socket is identified only by **(destination IP, destination port)**, so datagrams from all clients arrive at the **same** socket. The server uses the source address returned by `recvfrom` to know where to send each reply.

(c) `socket()` → `bind()` (attach to port 80) → `listen()` → `accept()` → `read()`/`recv()`. `accept` blocks until a client connects, then returns a **new file descriptor**: a connected socket for that one client. The listening socket stays open so the server can accept more clients.

---
