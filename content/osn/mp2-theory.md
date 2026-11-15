# Mini Project 2: how the three parts fit

The general theory behind every Mini Project 2 requirement, in the order tempest, mastermind, xv6. Read it before the code walkthrough: each section explains the idea, then names where it shows up in the project.

## At a glance

Tempest and mastermind are ordinary programs that ask the Linux kernel to move bytes for them; their theory is about protocols and sockets. The xv6 tasks change the kernel itself; their theory is about page tables and traps.

# Part 1 — tempest: an HTTP client from raw sockets

Tempest fetches a weather report from `wttr.is` using nothing but the operating system's socket calls. To understand it you need four ideas: what a socket is, how TCP behaves, what an HTTP/1.1 message looks like, and how a client knows where a response ends. This part takes them in that order.

## 1.1 Sockets and TCP

A socket is the kernel's handle for one end of a network conversation. To a C program it is just a file descriptor: an integer that `send`, `recv` and `close` act on, exactly like a file opened with `open`. The kernel does all the real work of moving bytes across the network; the program only asks it to.

### The layers involved

Networking is built in layers, each one using the layer below and hiding its details from the layer above.

| Layer | Protocol in tempest | What it provides | Who implements it |
| --- | --- | --- | --- |
| Application | HTTP/1.1 | Requests and responses as text | tempest itself (`http.c`) |
| Transport | TCP | A reliable, ordered byte stream between two programs | The kernel |
| Network | IP | Delivery of packets between machines by IP address | The kernel |
| Link | Ethernet / Wi-Fi | Delivery of frames on one local network | Network card and driver |

The important line is the boundary between application and transport. Everything above it is tempest's job; everything below it is the kernel's. The socket API is exactly that boundary.

### What TCP guarantees, and what it does not

TCP gives the application a **byte stream**: a sequence of bytes that arrives complete, in order and without duplicates. Underneath, IP may lose, reorder or duplicate packets; TCP hides all of that using sequence numbers, acknowledgements and retransmission.

What TCP does **not** give you is message boundaries. If the server writes 3000 bytes in one call, the client may receive them as one `recv` of 3000 bytes, or three of 1000, or 2999 and then 1. The bytes are right and in order, but how they are split into reads is up to the network and the kernel. This single fact is the reason for two tempest requirements:

- **Short writes.** `send` may accept fewer bytes than you asked it to send. It returns the number it took. A correct sender loops, advancing a pointer, until every byte is accepted.
- **Short reads.** `recv` returns whatever has arrived so far, which may be part of a header or part of the body. A correct receiver keeps reading and appending to a buffer until it knows the message is complete.

The usual pattern for sending looks like this:

```c
size_t sent = 0;
while (sent < len) {
    ssize_t n = send(fd, buf + sent, len - sent, 0);
    if (n < 0) {
        if (errno == EINTR) continue;   /* interrupted by a signal: try again */
        return -1;                      /* real error */
    }
    sent += (size_t)n;
}
```

Reading is the same idea in reverse: call `recv` in a loop, grow the buffer when it is full, and stop when `recv` returns 0. A return of 0 means **end of stream**: the other side has closed its half of the connection and no more bytes will ever come.

### The life of a TCP connection

A TCP connection has a clear lifecycle, and each step maps to one system call on the client.

1. `socket(AF_INET or AF_INET6, SOCK_STREAM, 0)` creates an unconnected socket. `SOCK_STREAM` means TCP.
2. `connect(fd, addr, len)` starts the **three-way handshake**: the client sends SYN, the server answers SYN-ACK, the client replies ACK. When `connect` returns 0 the connection is open and both sides have agreed on starting sequence numbers.
3. `send` and `recv` move bytes in both directions. TCP is full duplex: both sides may send at the same time.
4. `close(fd)` (or `shutdown`) sends FIN, telling the peer "I will send nothing more". The peer's `recv` then returns 0 once it has read everything before the FIN.

The server side uses `bind`, `listen` and `accept` instead of `connect`. Tempest is only a client, so it never needs them; mastermind uses both sides.

### Ports and addresses

An IP address names a machine; a **port** (a 16-bit number) names one program on that machine. A TCP connection is identified by four values: client IP, client port, server IP, server port. The client's port is chosen by the kernel automatically when `connect` runs (an "ephemeral" port). The server's port is well known: 80 for plain HTTP, which is what tempest uses.

Numbers on the wire are **big-endian** ("network byte order"). That is why a port is stored with `htons(80)` rather than `80`: on a little-endian machine such as x86 or RISC-V, the bytes would otherwise be reversed. `getaddrinfo` fills the address structure in network order already, which is one reason tempest uses it.

### Why "raw POSIX sockets only"

The spec forbids HTTP libraries such as libcurl. The point is to see that HTTP is nothing more than text written into a TCP stream. With only `getaddrinfo`, `socket`, `connect`, `send`, `recv` and `close`, the program has to do by hand everything a library hides: building the request, handling partial I/O, and finding the end of the response.

**Where this shows up in tempest:** `net.c` holds `net_connect` (resolve and connect), `net_send_all` (the short-write loop) and `net_recv_all` (the short-read loop that stops at end of stream).

## 1.2 HTTP/1.1 messages

HTTP/1.1 is a text protocol: a request and a response are both plain ASCII lines written into a TCP stream. The current definition is split across RFC 9110 (meaning of methods, status codes and headers) and RFC 9112 (the exact message syntax on the wire). Tempest needs only a small part of it.

### The shape of every message

Every HTTP/1.1 message, request or response, has the same four parts:

1. A **start line**: the request line for a request, the status line for a response.
2. Zero or more **header fields**, one per line, each `Name: value`.
3. An **empty line**, which marks the end of the headers.
4. An optional **body** (the content).

Every line ends with **CRLF**, the two bytes `\r\n` (carriage return, line feed). This is not optional decoration: a server is allowed to reject a request whose lines end in a bare `\n`. The empty line is therefore the four bytes `\r\n\r\n` counting the end of the last header, and searching for that sequence is how a client finds where the headers stop and the body starts.

### The request

The request tempest sends for the city New York is:

```http
GET /New%20York?0T HTTP/1.1
Host: wttr.is
Connection: close

```

(each line above ends in `\r\n` on the wire, and the final empty line is what ends the request.)

The **request line** has three parts separated by single spaces:

- **Method** `GET`: retrieve a resource, with no request body.
- **Request target** `/New%20York?0T`: the path and query of the URL. The path names the resource; everything after `?` is the query string. For wttr.is, `0T` asks for the current weather only (`0`) without terminal colour codes (`T`).
- **Version** `HTTP/1.1`.

### Headers tempest sends

| Header | Value | Why it is needed |
| --- | --- | --- |
| `Host` | `wttr.is` | **Mandatory in HTTP/1.1.** One IP address may serve many websites (virtual hosting); `Host` tells the server which one is meant. A request without it gets 400 Bad Request. |
| `Connection` | `close` | Tells the server this is the only request on the connection, so it should close the connection after the response. This gives tempest a simple, reliable end-of-response signal. |

An HTTP/1.1 client does not need `User-Agent` or `Accept` to be correct. Some servers change their output based on `User-Agent` (wttr.is sends plain text to curl-like clients), which is worth knowing if the output ever looks unexpected.

### The response

A typical response looks like this:

```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 312
Connection: close

<312 bytes of weather text>
```

The **status line** is version, a three-digit **status code** and a human-readable reason phrase. Clients must act on the code, never the phrase, because the phrase may be anything. The first digit gives the class:

| Class | Meaning | Examples |
| --- | --- | --- |
| 1xx | Informational, more is coming | 100 Continue |
| 2xx | Success | 200 OK |
| 3xx | Redirection, look elsewhere | 301 Moved Permanently, 302 Found |
| 4xx | Client error, the request was wrong | 400 Bad Request, 404 Not Found |
| 5xx | Server error | 500 Internal Server Error, 503 Service Unavailable |

Tempest treats any status outside 2xx as "the location could not be served" and prints `tempest: invalid location`, which is why the class matters more than the exact number.

### Reading header fields correctly

Three details of the header syntax trip up hand-written parsers:

- **Names are case-insensitive.** `Content-Length`, `content-length` and `CONTENT-LENGTH` are the same field, so comparisons use `strncasecmp`, not `strncmp`.
- **Whitespace around the value is optional.** `Content-Length:312` and `Content-Length:   312` are both valid; the parser skips spaces and tabs after the colon.
- **The body may contain anything.** Once `\r\n\r\n` is found, the rest is bytes, not lines. The body is copied with a length, not with string functions, because it may contain `\0`.

### Persistent and non-persistent connections

HTTP/1.0 opened a new TCP connection for every request. HTTP/1.1 made **persistent connections** the default: after one response, the same connection can carry the next request, which saves a handshake each time. The cost is that the client can no longer use "the server closed the connection" to find the end of a response; it must rely on the body's framing instead (next section).

The spec asks tempest **not** to use a persistent connection and to end it the way RFC 9112 §9 describes. `Connection: close` is that mechanism: the client announces it, the server closes after the response, the client reads until `recv` returns 0 and then closes its own end. Both sides have then sent their FIN, and the connection is fully closed.

**Where this shows up in tempest:** `http_build_request` writes the request line and the two headers with CRLF endings; `http_parse_response` finds `\r\n\r\n`, reads the status code and scans the headers case-insensitively.

## 1.3 Where does the body end? Message framing

Because TCP is a byte stream with no boundaries, every protocol built on it must answer one question: how does the receiver know where a message ends? This is called **framing**. HTTP/1.1 answers it in three ways, chosen by the response headers. RFC 9112 §6.3 gives the order in which a client must check them.

### 1. Content-Length

The simplest case. The header gives the body size in bytes, as a decimal number:

```http
Content-Length: 312
```

The client reads exactly 312 bytes after the empty line and stops. This works for persistent connections because the next response starts right after byte 312. It requires the server to know the full size before it starts sending, which is easy for a file and harder for output that is generated on the fly.

Two checks matter when parsing it:

- The value must be all digits. A negative or non-numeric value is a malformed response.
- If the connection closes before that many bytes arrive, the response is **truncated**. The client should treat this as an error (or at least know that the body is incomplete), not silently print a partial body.

### 2. Transfer-Encoding: chunked

When the server does not know the length in advance, it can send the body as a series of **chunks**, each prefixed by its own size:

```text
1a\r\n
<26 bytes of data>\r\n
10\r\n
<16 bytes of data>\r\n
0\r\n
\r\n
```

The rules are:

1. Each chunk starts with its size in **hexadecimal** (`1a` = 26, `10` = 16), followed by CRLF.
2. Then come exactly that many bytes of data, followed by another CRLF that is not part of the data.
3. The size line may carry **chunk extensions** after a `;` (for example `1a;name=value`). They are rare and a client may ignore them, but it must skip them rather than fail.
4. A chunk of size `0` is the **last chunk**. It may be followed by **trailer** header lines, and then a final empty line.

Decoding means walking this structure and copying only the data parts into the output buffer. A client that prints a chunked body without decoding it shows the hex sizes mixed into the text, which is a classic bug. If both `Transfer-Encoding: chunked` and `Content-Length` appear, chunked wins and `Content-Length` must be ignored; the RFC treats such a message as suspicious because it is a known request-smuggling trick.

### 3. Read until close

If a response has neither header, the body is everything until the server closes the connection. This only works when the connection is not persistent, which is exactly the situation `Connection: close` creates. It is also the reason HTTP/1.0 could work without lengths at all.

### The decision order

| Check, in order | If true | Body is |
| --- | --- | --- |
| Status is 1xx, 204 or 304, or the request was `HEAD` | Response has no body | Empty |
| `Transfer-Encoding` ends in `chunked` | Decode chunks until the 0-size chunk | The decoded chunk data |
| `Content-Length` present and valid | Read that many bytes | Exactly N bytes |
| Neither | Read until the server closes | Everything up to end of stream |

Tempest reads the whole response until close in every case (because it sent `Connection: close`), and then applies this table to the bytes it has to extract the body. That keeps the network code simple and the parsing code in one place.

### Framing is a general idea

The same question comes back in mastermind and it is worth seeing the pattern now. There are only a few ways to frame messages on a stream:

- **Length prefix** (Content-Length, chunk sizes, mastermind's UDP total-chunk count).
- **Delimiter** (CRLF for HTTP header lines, `\n` for mastermind's TCP messages).
- **Connection close** (HTTP read-until-close).
- **Fixed size** (mastermind's 22-byte UDP packets).

A delimiter is simplest for text that can never contain the delimiter. A length prefix is needed for binary data. Connection close is the simplest of all but allows only one message per connection.

**Where this shows up in tempest:** `http_parse_response` checks `Transfer-Encoding` and `Content-Length` case-insensitively, decodes chunks when needed, and uses `Content-Length` to detect a truncated body.

## 1.4 URLs, DNS, timeouts and output

### URL encoding (percent-encoding)

A URL may only contain a limited set of characters. RFC 3986 calls the always-safe ones **unreserved**: letters `A–Z a–z`, digits `0–9`, and the four symbols `- . _ ~`. Other characters either have a special meaning in a URL (`/` separates path segments, `?` starts the query, `#` starts a fragment, `&` and `=` structure the query) or are not allowed at all (space, control bytes, non-ASCII).

**Percent-encoding** replaces any byte that is not unreserved with `%` followed by its two-digit hexadecimal value:

| Input | Bytes | Encoded |
| --- | --- | --- |
| `New York` | space is 0x20 | `New%20York` |
| `São Paulo` | `ã` is UTF-8 0xC3 0xA3 | `S%C3%A3o%20Paulo` |
| `a/b?c` | `/` 0x2F, `?` 0x3F | `a%2Fb%3Fc` |

Three points are worth remembering:

- Encoding works on **bytes**, not characters. A non-ASCII letter in UTF-8 takes two to four bytes, and each byte gets its own `%XX`.
- A city name is a single path segment, so a `/` inside it must be encoded; otherwise the server would see two path segments.
- A space in a path is `%20`. The `+` for a space belongs only to HTML form encoding in query strings and must not be used here.

Without encoding, `GET /New York?0T HTTP/1.1` would have four space-separated words on the request line, and the server would reject it as malformed.

### Name resolution with getaddrinfo

A program connects to an IP address, but the user gives a host name (`wttr.is`). **DNS** (the Domain Name System) translates one to the other. In C the modern call is `getaddrinfo`:

```c
struct addrinfo hints = {0}, *res;
hints.ai_family = AF_UNSPEC;      /* IPv4 or IPv6 */
hints.ai_socktype = SOCK_STREAM;  /* TCP */
int rc = getaddrinfo("wttr.is", "80", &hints, &res);
/* walk res->ai_next, try socket()+connect() on each, stop at the first success */
freeaddrinfo(res);
```

Why `getaddrinfo` rather than the older `gethostbyname`:

- It handles **IPv4 and IPv6** with one code path.
- It returns a **list** of addresses. A host often has several, and a robust client tries each in turn until one connects.
- It fills the complete `sockaddr` (address and port, in network byte order), ready to pass straight to `connect`.
- It is thread-safe and reports errors through its return value, decoded with `gai_strerror`.

### Timeouts and signals

A network program can wait forever: DNS can hang, `connect` can wait for a server that never answers, and `recv` blocks until data arrives. The spec requires the **whole request** to finish within 10 seconds. There are two common designs.

| Approach | How it works | Strength | Weakness |
| --- | --- | --- | --- |
| One overall alarm | `alarm(10)` before DNS; a `SIGALRM` handler ends the program | Covers DNS, connect, send and recv with one line | Coarse; the handler may only do async-signal-safe work |
| Per-call timeouts | `SO_RCVTIMEO`, non-blocking `connect` + `poll` | Precise; no signals | Each blocking call needs its own code; `getaddrinfo` cannot be timed out this way |

Tempest uses the first. A **signal** is an asynchronous notification the kernel delivers to a process. `alarm(n)` asks the kernel to deliver `SIGALRM` after n seconds of real time. When it arrives, the kernel interrupts whatever the program is doing (even inside a blocking `recv`) and runs the handler registered with `sigaction`.

Three rules about signal handlers matter here:

- **Async-signal-safety.** The handler may interrupt `malloc` or `printf` half-way through. Calling them again from the handler can corrupt their internal state. Only functions on the POSIX async-signal-safe list may be called: `write` and `_exit` are on it; `printf`, `malloc` and `exit` are not.
- **`sigaction` over `signal`.** `sigaction` has well-defined behaviour on every POSIX system: whether the handler stays installed, which signals are blocked while it runs, and whether interrupted calls restart (`SA_RESTART`).
- **EINTR.** A signal that arrives during a blocking call may make the call return -1 with `errno == EINTR`. Loops around `send` and `recv` should retry in that case rather than treat it as a failure.

### Output modes and command-line rules

The spec separates what the user normally sees from a debugging view:

- **Default:** print only the decoded body. Headers are protocol details, not the answer.
- **`--raw`:** print the request lines prefixed with `>` and the response header lines prefixed with `<` (the same convention as `curl -v`), then the body bytes exactly as received.

Argument checking follows the usual Unix convention of failing early with a clear message on stderr and a non-zero exit status: too many arguments, a second argument that is not `--raw`, or a blank city all stop the program before any network work starts.

### Cleanup

Every path out of the program, success or error, should close the socket and free every buffer exactly once. The common C pattern is a single `cleanup:` label at the end of `main` that every error branch jumps to. It avoids both leaks (a forgotten `free`) and double frees (a pointer freed twice), and makes the code easy to check with Valgrind.

**Where this shows up in tempest:** `url.c` does the percent-encoding, `net_connect` calls `getaddrinfo` and tries each address, `main.c` arms `alarm(10)` and installs the `SIGALRM` handler with `sigaction`, and `output.c` prints the `>` / `<` lines for `--raw`.

# Part 2 — mastermind: a peer-to-peer game on a LAN

Mastermind turns the code-breaking board game into a networked program. Two copies of the same program find each other on the local network, one challenges the other, and they play over one connection. The theory here is broader than tempest's: discovery with UDP broadcast, protocol design, a single-threaded event loop, terminal control, failure detection, and finally building reliability on top of UDP by hand.

## 2.1 The game and its scoring

### Rules

One player, the **mastermind** (codemaker), picks a secret sequence of 5 digits, the **master**. The other, the **codebreaker**, has at most 12 attempts to guess it. After each attempt the mastermind answers with 5 feedback characters, one per position:

| Symbol | Colour | Usual meaning |
| --- | --- | --- |
| `x` | Green | Right digit in the right position |
| `o` | Yellow | Digit appears in the master, but in another position |
| `-` | Red | Digit does not help (not in the master, or already accounted for) |

The game ends when an attempt equals the master (codebreaker wins) or after the 12th attempt (mastermind wins). Either way the master is then revealed.

In this project the **mastermind types the feedback by hand**. The program only checks its format (exactly 5 characters, each `o`, `x` or `-`); it does not compute the pegs or check that they are honest. The correctness of the game therefore depends on the player, which keeps the network program simple and is stated as an assumption in the readme.

### How correct feedback is computed

Even though the program does not compute it, a viva can ask how it would. The standard algorithm has two passes, and the second pass is where duplicates are handled:

1. **Exact matches.** For each position i, if `guess[i] == master[i]`, mark it `x` and mark both positions as used.
2. **Misplaced matches.** For each remaining guess position, look for an unused master position with the same digit. If one exists, mark the guess position `o` and use up that master position. Otherwise mark it `-`.

Worked example with master `11223` and guess `12131`:

| Position | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| Master | 1 | 1 | 2 | 2 | 3 |
| Guess | 1 | 2 | 1 | 3 | 1 |
| Pass 1 | `x` |  |  |  |  |
| Pass 2 | `x` | `o` | `o` | `o` | `-` |

Position 0 is exact. In pass 2, the guess's `2` matches an unused master `2`, the `1` at position 2 matches the remaining master `1` at position 1, the `3` matches master position 4, and the final `1` finds no unused `1` left, so it is `-`. Counting each master digit only once is what keeps the feedback honest when digits repeat.

An equivalent counting form: the number of `x` is the exact matches; the number of `o` is the sum over digits d of min(count of d in guess, count of d in master), minus the `x` count.

### How hard is the game?

There are 10⁵ = 100,000 possible masters. Each piece of feedback splits the remaining candidates into groups, and a good strategy picks the guess whose worst-case group is smallest (Knuth's minimax idea, originally for 4 pegs and 6 colours, solved in at most 5 guesses). With 12 attempts the codebreaker has plenty of room, so the game is about reasoning rather than luck.

### Keeping the secret secret

The master must never reach the codebreaker's machine before the game ends, not even hidden in the UI. A program that sends the master early and simply does not print it is broken: anyone can read it with a packet capture (Wireshark, `tcpdump`). This is a general security rule: **the client cannot be trusted to hide data it has received.** In this project the `READY` message carries no data, and only `END <master>` ever contains the master. Until then the codebreaker's board shows `*****`.

### Two copies of the same board

Each program keeps its own copy of the board (attempts, feedback, master) and updates it only from what it sends and receives. The two copies stay identical because both sides apply the same messages in the same order. The only difference is what is shown: the mastermind's copy has the master from the start; the codebreaker's copy gets it from `END`. This is the simplest form of **replicated state**: no shared memory, just the same sequence of updates applied on both sides.

### Validation on both sides

Every input is checked twice: when a player types it, and again when the other side receives it over the network. The second check matters because a network peer is not trusted: a buggy or malicious program could send `GUESS abc` or a 9-character feedback string. Checking on receipt keeps bad data out of the board even if the sender's check was skipped. In the project, `valid_sequence` and `valid_feedback` in `board.c` are used for both.

## 2.2 Protocol design and discovery

### Peer-to-peer instead of client–server

In a **client–server** design one program waits and the other connects; their code is different. In a **peer-to-peer** design every instance is the same program and can play either part. The spec asks for the second: both players run the same binary, each one listens on its own port, and the role of each connection is decided only by who types `challenge`. The player who connects out becomes the mastermind; the one who accepts becomes the codebreaker.

The practical result is that every instance must do both halves of TCP at once: `bind` + `listen` + `accept` for incoming challenges, and `connect` for outgoing ones. That is only possible without threads if the program never blocks, which leads to the event loop in the next section.

### What a protocol must define

A **protocol** is an agreement on the bytes two programs exchange. Designing one means answering a fixed list of questions:

| Question | Mastermind's answer |
| --- | --- |
| Transport | UDP broadcast for discovery; TCP for the game (UDP with `--cost-cutting`) |
| Message types (verbs) | `CHALLENGE`, `ACCEPT`, `REJECT`, `READY`, `GUESS`, `FEEDBACK`, `END`, `PING` |
| Payload of each | e.g. `CHALLENGE <name>`, `GUESS <5 digits>`, `FEEDBACK <5 of o x ->`, `END <master>` |
| Framing | Text lines ended by `\n` over TCP; fixed 22-byte packets over UDP |
| Encoding of numbers | Big-endian (network byte order) in binary packets |
| Which messages are valid in which state | Defined by the game state machine |
| Errors and failure | Bad messages ignored and logged; silence or close means disconnect |
| Identification | A 4-byte magic `MMND` on discovery packets |

The spec asks for all of this to be written down in a header file and in the readme. Putting every constant (ports, timings, verbs, sizes) in one `protocol.h` means both instances are guaranteed to agree, because they are compiled from the same file.

### Text versus binary messages

Game messages are **text** (`GUESS 12345\n`) while discovery packets are **binary** (packed bytes). Each has its place:

- **Text** is easy to read in a log, a packet capture or with `nc`, and needs no byte-order handling. It suits low-volume, human-scale messages.
- **Binary** is compact and has fixed field positions, which makes parsing a matter of reading bytes at known offsets. It suits small packets that are sent often, like a broadcast every 2 seconds.

### UDP versus TCP

| Property | TCP | UDP |
| --- | --- | --- |
| Connection | Yes (handshake, then a stream) | No; each datagram stands alone |
| Reliability | Lost data is retransmitted | Datagrams may be lost |
| Ordering | Bytes arrive in order | Datagrams may arrive in any order |
| Message boundaries | None (byte stream) | Kept: one `sendto` = one `recvfrom` |
| Broadcast | Not possible | Possible |
| Overhead | 20-byte header, connection state, ACKs | 8-byte header, no state |

Discovery must use UDP, because TCP is always between exactly two endpoints and cannot broadcast.

### Discovery with UDP broadcast

The goal: each instance should learn the name, IP and port of every other instance on the same LAN, without any central server or configuration.

The technique is **periodic broadcast**. Every instance:

1. Opens a UDP socket, sets `SO_BROADCAST` (the kernel refuses broadcast sends without it) and `SO_REUSEADDR` so several instances on one machine can bind the same discovery port.
2. Binds that well-known port (47474 in the project).
3. Every 2 seconds, sends a small packet with `sendto` to **255.255.255.255**, the *limited broadcast* address. Every host on the local network segment receives it; routers never forward it, so it stays inside the LAN.
4. Reads every packet that arrives on the port and updates a table of players.

The packet carries the **name** and the **listening port**, but not the IP address. The receiver learns the IP from the source address that `recvfrom` fills in. This is more robust than putting the IP in the payload: a machine with several interfaces does not know which of its addresses the other host can reach, but the packet's source address is by definition one that works.

### The magic number

Other programs may also broadcast on the same port. A **magic number** is a fixed byte sequence at the start of every packet (`MMND` here) that identifies the protocol. Packets that do not start with it, or that are too short or too long for their stated name length, are dropped. This is a cheap first-line filter; the same idea appears in file formats (`%PDF`, the ELF header `\x7fELF`).

A random **instance id** in every packet lets a program recognise and ignore its own broadcasts (which it also receives, since it listens on the broadcast port) and lets it tell two players on the same IP apart.

### Soft state and expiry

The player table is **soft state**: it is never explicitly deleted, only refreshed. Each entry records when it was last heard. If 5 seconds pass with no packet from a player (more than two missed broadcasts), the entry is removed. This handles every way a player can leave (normal exit, crash, network loss) with one rule and no "goodbye" message, which could itself be lost. The cost is a few seconds of delay before a vanished player disappears from the list.

The same soft-state idea runs through networking: ARP caches, DHCP leases and routing protocol neighbour tables all expire unless refreshed.

### Byte order and packing

Binary fields are written in **big-endian** order, byte by byte with shifts, into a byte buffer, rather than by copying a C `struct` onto the wire. Copying a struct is unsafe because the compiler may insert padding between fields and because the machine's byte order may differ from the peer's. Explicit packing (`buf[0] = v >> 8; buf[1] = v & 0xff;`) gives the same bytes on every machine.

## 2.3 One thread, many inputs: the event loop

### The problem

At any moment a mastermind instance may need to react to any of four things:

- the player typing a key,
- a discovery broadcast arriving,
- another player connecting to challenge us,
- a message from the opponent during a game,

plus things that depend only on time: sending the next broadcast, expiring silent players, sending a heartbeat, retransmitting a lost UDP chunk.

If the program calls `recv` on the game socket, it blocks there and cannot notice a key press. If it calls `fgets` on the keyboard, it cannot notice a broadcast. Some form of waiting on **many inputs at once** is needed.

### Three ways to handle concurrency

| Model | Idea | Pros | Cons |
| --- | --- | --- | --- |
| Process per connection | `fork` for each client | Full isolation | Heavy; sharing state needs IPC |
| Thread per input | One blocking thread each for keyboard, discovery, game | Each piece of code is simple and sequential | Shared state needs locks; races and deadlocks |
| Event loop (I/O multiplexing) | One thread asks the kernel which inputs are ready, then handles each without blocking | No locks, no races, deterministic | Every handler must be short and must never block |

The spec forbids threads, so mastermind uses the event loop. It is the same design as Node.js, nginx and Redis.

### poll

`poll` takes an array of file descriptors with the events you care about, and sleeps until at least one is ready or a timeout passes:

```c
struct pollfd fds[] = {
    { .fd = STDIN_FILENO, .events = POLLIN },  /* keyboard          */
    { .fd = disc_fd,      .events = POLLIN },  /* discovery (UDP)   */
    { .fd = game_fd,      .events = POLLIN },  /* listening socket  */
    { .fd = chan_fd,      .events = POLLIN },  /* current opponent  */
};
for (;;) {
    int n = poll(fds, 4, 20);      /* wake at least every 20 ms */
    if (fds[0].revents & POLLIN) handle_key();
    if (fds[1].revents & POLLIN) handle_broadcast();
    if (fds[2].revents & POLLIN) handle_incoming();
    if (fds[3].revents & (POLLIN | POLLHUP)) handle_peer();
    on_tick();                     /* timers: broadcast, expiry, heartbeat, retransmit */
}
```

The key ideas:

- **Readiness.** `POLLIN` in `revents` means a read will not block: there is data, a pending connection to `accept`, or end of stream. `POLLHUP` reports a hang-up. A file descriptor of -1 is skipped, which is how an unused slot (no game yet) is switched off.
- **Timeout as a clock.** The 20 ms timeout makes the loop wake regularly even when nothing arrives, so all timers can be checked in one `on_tick` by comparing the current time with each deadline. No signals or extra threads are needed for timing.
- **Monotonic time.** Deadlines should use `clock_gettime(CLOCK_MONOTONIC)`, which never jumps backwards when the wall clock is adjusted. Wall-clock time (`gettimeofday`) is for printing timestamps in the log.

`select` is the older equivalent with a fixed-size bitmap of descriptors; `epoll` (Linux) and `kqueue` (BSD/macOS) scale to thousands of descriptors. For four descriptors, `poll` is the simplest correct choice.

### Non-blocking I/O

`poll` says a socket is readable, but a handler must still never block. Two techniques ensure that:

- **`MSG_DONTWAIT`** on `recv`/`recvfrom` makes that one call non-blocking: if nothing is there it returns -1 with `errno` set to `EAGAIN` or `EWOULDBLOCK`, which simply means "try again later".
- **Read what is there, keep the rest.** A TCP read may return half a message or two and a half messages. Bytes are appended to a per-connection buffer; complete `\n`-terminated lines are taken out and handled; the incomplete tail stays for the next read. This is the delimiter framing from section 1.3, done incrementally.

On the sending side, `MSG_NOSIGNAL` matters: writing to a socket whose peer has closed normally raises `SIGPIPE`, which kills the process by default. With the flag, `send` returns -1 with `EPIPE` instead, and the program can report a disconnect cleanly. Tempest uses the same flag.

### The game as a state machine

With an event loop, the program cannot "wait for the reply" in the middle of a function. Instead it remembers **where it is** in a variable, the **state**, and each event moves it from one state to the next. This is a **finite state machine**: a set of states, the events that can occur, and a transition for each (state, event) pair.

For the challenger the main path is: home → waiting for accept → typing the master → waiting for a guess → typing feedback → (back to waiting for a guess, up to 12 times) → game over → home. The codebreaker has the mirror path. Every state says which typed lines and which received messages are valid; anything else is ignored. In the project, `game.c` has 11 such states and two exits (normal end and disconnect), both returning home on Enter.

A state machine also makes the protocol checkable: a `FEEDBACK` that arrives while the codebreaker is not waiting for one is simply invalid in that state.

### Terminal control: raw input

By default the terminal is in **canonical mode**: the terminal driver collects a whole line, handles Backspace itself, echoes characters, and only gives the program the line when Enter is pressed. That is a problem for an event loop: the players table is redrawn every 2 seconds, and a redraw would wipe whatever the user was half-way through typing, which the program cannot even see.

The fix is to switch the terminal to **non-canonical mode** with `termios`:

```c
struct termios t;
tcgetattr(STDIN_FILENO, &saved);   /* remember the original settings */
t = saved;
t.c_lflag &= ~(ICANON | ECHO);     /* byte-at-a-time, no automatic echo */
t.c_cc[VMIN] = 1; t.c_cc[VTIME] = 0;
tcsetattr(STDIN_FILENO, TCSANOW, &t);
```

Now each key press reaches the program immediately. The program keeps its own copy of the line being typed, echoes it, handles Backspace, and reprints the half-typed line after every redraw. On exit (including Ctrl-C) the saved settings must be restored, or the user's shell is left without echo.

Colours use **ANSI escape sequences**: `ESC[32m` for green, `ESC[33m` yellow, `ESC[31m` red, `ESC[0m` reset. They are just bytes written to the terminal, which interprets them.

### Detecting a lost peer

The spec asks the program to notice when the opponent disappears and to print `<name> disconnected`. There are three cases, and TCP handles only some of them by itself:

| What happened to the peer | What TCP reports | What else is needed |
| --- | --- | --- |
| Quit normally or with Ctrl-C | Their kernel sends FIN; our `recv` returns 0 | Nothing |
| Process crashed or was killed | Their kernel still closes the socket: FIN or RST | Nothing |
| Machine lost power or the network dropped | **Nothing at all.** No packet can be sent. | A timeout |

The third case is why **heartbeats** exist. Each side sends a small `PING` if it has sent nothing for 1 second, and declares the peer gone after 5 seconds of hearing nothing. Five seconds is several missed heartbeats, so one lost packet does not cause a false disconnect. TCP has its own keepalive option (`SO_KEEPALIVE`), but its default first probe comes after about two hours, far too slow for a game.

The spec's hint, "use the socket's persistence to your advantage", refers to the first two cases: because one TCP connection stays open for the whole game, the kernel itself tells you when the other process goes away.

### Logging

With `--log`, every message sent or received is appended to `log.txt` with a timestamp. Opening with mode `"a"` (append) means each run adds to the file instead of erasing it. In an event-driven, networked program, a log is often the only way to reconstruct what happened in which order, so each line records the direction, the peer and the message.

## 2.4 Reliable delivery over UDP (--cost-cutting)

With `--cost-cutting`, the game must run over UDP instead of TCP. UDP gives none of TCP's guarantees, so the program has to rebuild the parts it needs: message boundaries, ordering, loss recovery and failure detection. This is the most "textbook networking" part of the project, because it is a small version of what TCP itself does inside the kernel.

### What has to be rebuilt

| TCP gives for free | Rebuilt over UDP with |
| --- | --- |
| A connection between two known endpoints | A random **session id** in every packet; packets with another id are rejected |
| Delivery of every byte | **Acknowledgements** and **retransmission** |
| Correct order | **Sequence numbers** and a reassembly buffer |
| Knowing a message is complete | A **total chunk count** in every packet |
| Notice when the peer leaves | Heartbeats, a 5 s silence timeout, and a `RESET` packet on exit |

### Segmentation: chunks with headers

Each game message is cut into fixed-size **chunks** (8 bytes of payload in the project) and each chunk is sent in its own datagram with a header:

| Field | Size | Purpose |
| --- | --- | --- |
| Type | 1 byte | `DATA`, `ACK` or `RESET` |
| Session id | 4 bytes | Which game this belongs to |
| Message id | 4 bytes | Which message (0, 1, 2 …) the chunk is part of |
| Sequence number | 2 bytes | The chunk's index inside that message |
| Total chunks | 2 bytes | How many chunks the message has |
| Payload length | 1 byte | Real bytes in this chunk (the last chunk may be partly filled) |
| Payload | 8 bytes | The data, zero-padded |

That is a 14-byte header and a 22-byte `DATA` packet. All fields are packed big-endian by hand, as in section 2.2. Small chunks are chosen on purpose: even an 11-byte `GUESS 12345` needs two chunks, so the reordering and reassembly code is exercised on every move rather than only in rare cases.

### Reassembly and reordering

The receiver keeps, for the message being received, a buffer of `total × 8` bytes and a **bitmask** with one bit per chunk. When chunk `seq` arrives it is copied to offset `seq × 8` and bit `seq` is set. Order of arrival does not matter, because each chunk carries its own position. The message is complete when all `total` bits are set; only then is it handed to the game. Duplicates (the same chunk arriving twice because an ACK was lost) are harmless: the copy is identical and the bit is already set.

Messages are also delivered **in message-id order**, so a later message that happens to complete first waits until the earlier one is complete. Without this, a `FEEDBACK` could be processed before the `GUESS` it answers.

### Acknowledgement and retransmission

The receiver answers every `DATA` chunk with an `ACK` naming its message id and sequence number. The sender keeps each unacknowledged chunk with the time it was last sent. On every tick of the event loop it checks: any chunk unacknowledged for more than **100 ms** (the spec's 0.1 s) is sent again. When the ACK arrives, the chunk is dropped from the pending set.

The spec also says the sender must **not wait** for ACKs before sending the next chunk. All chunks of a message are sent immediately, and the ACKs and retransmissions are handled independently per chunk. Compare the two classic schemes:

| Scheme | Behaviour | Throughput |
| --- | --- | --- |
| Stop-and-wait | Send one chunk, wait for its ACK, then send the next | One chunk per round trip; slow |
| Selective repeat (what the spec asks for) | Send all chunks; ACK each one; retransmit only the missing ones | Limited only by the link |

TCP is closer to selective repeat with a sliding window: it keeps many segments in flight, and modern TCP acknowledges selectively (SACK). It also adapts its retransmission timeout to the measured round-trip time and slows down when the network is congested. Mastermind's fixed 100 ms timeout and lack of congestion control are fine on a LAN with tiny messages, but would behave badly on a slow or busy network.

### Why ACKs can be lost too

A lost `DATA` chunk and a lost `ACK` look the same to the sender: no ACK arrives within 100 ms. In both cases it retransmits. If the data had in fact arrived, the receiver gets a duplicate, discards it (the bit is already set) and **acknowledges it again**. Re-acknowledging duplicates is essential: without it, a single lost ACK would make the sender retransmit forever.

### Ending and resetting

UDP has no FIN. A peer that quits with Ctrl-C sends a `RESET` packet on its way out so the other side can report the disconnect at once; a peer that crashes or loses the network is caught by the same 5 s silence rule as in TCP mode. A `RESET` is also the answer to a packet that names an unknown session, for example a challenge to a player who is already in another game.

### Keeping the game code identical

The game logic should not care which transport is underneath. The project achieves this with one abstraction, a **channel** with two operations: "send this message" and "give me the next complete message". Over TCP the channel writes a `\n`-terminated line and splits the received stream on `\n`; over UDP it does everything in this section. The state machine in `game.c` calls the same two functions in both modes. This is the layering idea from section 1.1 applied inside one program: the layer above uses a service without knowing how the layer below provides it.

# Part 3 — xv6: copy-on-write fork and alarms

xv6 is a small teaching operating system modelled on Unix V6, running on the RISC-V architecture (in QEMU). The two xv6 tasks change the kernel itself. Copy-on-write fork is about **memory**: page tables, physical page allocation and page faults. Alarms are about **control flow**: timer interrupts, traps, and how the kernel can make a user program run a function and later return to exactly where it was. Both depend on the same machinery, so this part starts with virtual memory and traps.

## 3.1 Virtual memory and page tables

### Why virtual memory

Every process believes it has its own private memory starting at address 0. In reality all processes share one physical RAM. **Virtual memory** is the hardware and kernel mechanism that maps each process's virtual addresses onto physical memory. It gives three things:

- **Isolation.** A process can only reach the physical pages its page table maps, so it cannot read or damage another process or the kernel.
- **A simple address space.** Every program can be linked to run at the same addresses, regardless of where its pages actually sit in RAM.
- **Flexibility for the kernel.** The kernel can change mappings at any time: share a page between processes, map a page read-only, or leave it unmapped and fill it in on demand. Copy-on-write is built entirely on this flexibility.

### Pages

Memory is managed in fixed-size blocks called **pages**: 4096 bytes (4 KB) on RISC-V. A virtual address is split into a **virtual page number** (which page) and an **offset** (which byte inside the page, the low 12 bits, since 2¹² = 4096). Translation replaces the virtual page number with a **physical page number** and keeps the offset unchanged.

### Sv39: the RISC-V page table format

xv6 uses RISC-V's **Sv39** scheme: 39-bit virtual addresses, translated through a **three-level** page table tree.

| Bits of the virtual address | Meaning |
| --- | --- |
| 63–39 | Must equal bit 38 (unused in xv6, which keeps addresses below 2³⁸) |
| 38–30 | Index into the level-2 (top) page table, 9 bits |
| 29–21 | Index into the level-1 page table, 9 bits |
| 20–12 | Index into the level-0 (leaf) page table, 9 bits |
| 11–0 | Offset inside the 4 KB page |

Each page table is itself one 4 KB page holding 512 entries of 8 bytes (2⁹ = 512, which is why each index is 9 bits). The `satp` register holds the physical address of the top-level table. To translate, the hardware uses the first 9-bit index to pick an entry in the top table, which points to a level-1 table; the next index picks an entry there, which points to a leaf table; the last index picks the **page table entry (PTE)** that holds the physical page number. The offset is then added.

A multi-level tree saves memory: a mostly empty address space only needs tables for the regions actually in use, rather than one huge flat array. The cost is three memory reads per translation, which the **TLB** (translation lookaside buffer) hides by caching recent translations. Whenever the kernel changes a PTE that may be cached, it must flush the TLB (`sfence.vma` on RISC-V); xv6 does this when switching page tables.

### The page table entry

A 64-bit Sv39 PTE holds the physical page number in bits 10–53 and the flags in bits 0–9:

| Bit | Name | Meaning when set |
| --- | --- | --- |
| 0 | V | Valid: this entry is in use |
| 1 | R | Readable |
| 2 | W | Writable |
| 3 | X | Executable |
| 4 | U | Accessible from user mode |
| 5 | G | Global mapping |
| 6 | A | Accessed (set by hardware on use) |
| 7 | D | Dirty (set by hardware on write) |
| 8–9 | RSW | **Reserved for software:** ignored by the hardware, free for the OS |

A PTE with V set but R, W and X all clear is not a leaf: it points to the next-level table. The **RSW** bits are what make copy-on-write easy to mark: the kernel can store "this page is copy-on-write" right in the PTE without the hardware caring. In xv6, `PTE2PA` and `PA2PTE` convert between a PTE and a physical address, and `PTE_FLAGS` extracts the low 10 bits.

### Walking the page table in software

The kernel often needs to find or change a PTE itself, not just let the hardware use it. xv6's `walk(pagetable, va, alloc)` does the same three-level descent in C and returns a pointer to the leaf PTE; with `alloc` set it creates missing intermediate tables. `mappages` installs new mappings, `uvmunmap` removes them, and `walkaddr` returns the physical address for a user virtual address.

### A process's address space in xv6

| Region (low to high) | Contents | Permissions |
| --- | --- | --- |
| Text | Program instructions | R, X, U |
| Data | Global variables | R, W, U |
| Guard page | Unmapped, catches stack overflow | none (no U) |
| Stack | User stack, one page | R, W, U |
| Heap | Grows with `sbrk` | R, W, U |
| Trapframe | Saved user registers (kernel use) | R, W (no U) |
| Trampoline | Code for entering and leaving the kernel, at the top | R, X (no U) |

The **trapframe** and **trampoline** are mapped at the top of every user address space but without the U bit, so user code cannot touch them. The trapframe matters for alarms; the writable data, stack and heap pages are what copy-on-write shares.

### Physical memory allocation: kalloc and kfree

The kernel hands out physical memory one page at a time. `kalloc()` takes a free 4 KB page off a **free list** (a linked list threaded through the free pages themselves) and `kfree(pa)` puts one back. A spinlock protects the list, because several CPUs may allocate at once. Stock xv6 assumes each physical page has exactly one owner, so `kfree` always frees immediately. Copy-on-write breaks that assumption, which is why it needs reference counts.

## 3.2 Copy-on-write fork

### What fork does, and why plain copying is wasteful

`fork()` creates a child process that is an exact copy of the parent: same memory contents, same open files, same registers, except that `fork` returns 0 in the child and the child's pid in the parent. Stock xv6 implements the memory part in `uvmcopy` by allocating a new physical page for **every** user page of the parent and copying all 4096 bytes.

This is often wasted work. The most common use of `fork` is the shell pattern:

```c
if (fork() == 0) {
    exec("ls", argv);   /* child immediately replaces its whole memory */
}
wait(0);
```

The child copies the parent's entire memory, then `exec` throws all of it away and loads a new program. Even without `exec`, the child usually writes to only a few pages. Copying everything up front costs time proportional to the parent's size and doubles memory use for pages that are never changed.

### The idea: share now, copy on the first write

**Copy-on-write (CoW)** postpones the copy until it is actually needed, and does it one page at a time:

1. At `fork`, the child's page table is made to point at the **same physical pages** as the parent's. No data is copied.
2. Every shared page that was writable is made **read-only in both** page tables, and marked as a CoW page.
3. Reads work normally in both processes, from the shared page.
4. When either process **writes** to a CoW page, the hardware refuses (the PTE has no W bit) and raises a **page fault**.
5. The kernel's fault handler sees that the page is CoW, allocates a new page, copies the old contents into it, maps the copy **writable** in the faulting process only, and returns. The faulting store instruction runs again and now succeeds.

Pages that are never written are never copied. For a `fork` followed by `exec`, almost nothing is copied at all. Linux, the BSDs and macOS all implement `fork` this way.

### Telling CoW pages apart from read-only pages

After step 2, a CoW page and a genuinely read-only page (such as program text) both have W clear. A write to the first must be handled by copying; a write to the second is a real error and the process must be killed. The kernel needs one extra bit to tell them apart, and the PTE's **RSW bits** (bits 8–9, ignored by hardware) are exactly that kind of spare space. The project defines `PTE_COW` as bit 8.

Only pages that were writable become CoW. A page that was already read-only is simply shared as it is: neither process can write it, so it never needs copying.

### Reference counting

Sharing creates a new problem: **when may a physical page be freed?** In stock xv6 a page has one owner, so `kfree` frees immediately. With CoW, a page may be mapped by the parent, the child, and grandchildren. If one of them exits and calls `kfree` on the page, the others would be left pointing at freed memory that may be reused for something else: a use-after-free in the kernel.

The fix is a **reference count** per physical page: the number of page tables that currently map it.

| Event | Change to the count |
| --- | --- |
| `kalloc` hands out a page | Set to 1 |
| `uvmcopy` shares a page with the child | +1 |
| CoW fault copies the page for one process | Old page −1; new page starts at 1 |
| A process unmaps the page (exit, `exec`, shrinking `sbrk`) | −1 through `kfree` |
| Count reaches 0 | The page goes back on the free list |

The counts are kept in an array indexed by physical page number: `(pa - KERNBASE) / PGSIZE`, one entry per page of RAM the allocator manages. The array needs a **lock**, because two CPUs may change the count of the same page at once (for example, parent and child faulting on the same shared page on different CPUs). An unprotected `count++` is a read-modify-write and can lose an update, leading to a page being freed too early or never.

`kfree` becomes "decrement, and free only if it reached zero". At boot, `kinit` frees every page once to build the free list, so the counts must be set to 1 before that loop for them to end at 0.

### The page fault

On RISC-V, a trap's cause is in the `scause` register and, for a page fault, the faulting virtual address is in `stval`.

| `scause` | Meaning |
| --- | --- |
| 12 | Instruction page fault (fetch from a page without X) |
| 13 | Load page fault (read from a page without R, or unmapped) |
| 15 | Store/AMO page fault (write to a page without W, or unmapped) |

A write to a CoW page always produces **scause 15**. The handler (`cowfault` in the project) must:

1. Round `stval` down to the page boundary and check that it is below the process's maximum address.
2. Find the PTE with `walk`, and check that it is valid, user-accessible and CoW. If not, this is not a CoW fault and is handled (or the process killed) as before.
3. If the reference count is 1, this process is the last user: simply set W, clear the CoW bit, and return. No copy is needed.
4. Otherwise `kalloc` a new page (if memory is exhausted, the process is killed), copy 4096 bytes from the old page, and rewrite the PTE to point at the new page with W set and CoW cleared.
5. Drop one reference to the old page with `kfree`.

The order in step 4 matters: the new mapping must be in place before the old reference is dropped, otherwise another process could free the old page while it is still being copied from.

### copyout: the kernel writing into user memory

There is one more path that writes to user pages: the **kernel itself**. System calls such as `read`, `pipe` and `wait` use `copyout` to write results into a user buffer. The kernel does not go through the user's page table in hardware; `copyout` uses `walkaddr` to find the physical address and writes it directly. A CoW page would therefore be written **without any fault**, silently changing a page that the other process still shares.

So `copyout` must check each destination page itself: if its PTE is CoW, call the same `cowfault` routine first, then look up the (now private) physical address again and write there. This is the most commonly missed part of CoW and the reason the spec lists it as its own marking item.

### What the tests check

The standard `cowtest` program exercises exactly these cases:

- **simple**: a process allocates more than half of physical memory and forks. Without CoW the fork fails for lack of memory; with CoW it succeeds, because nothing is copied.
- **three**: several processes share pages and write to them in different orders, which checks the reference counts.
- **file**: data is read from a pipe into a CoW buffer, which checks `copyout`.

`usertests` must also still pass, which checks that nothing else (exec, sbrk, exit, freeing) was broken by changing how pages are freed. A memory leak shows up there as a failure to get back all free pages after the tests.

### Trade-offs

CoW makes `fork` fast and memory-efficient, but it is not free: each first write costs a trap, a page allocation and a copy, which is slower than the copy would have been inside `fork` if the child was going to write every page anyway. It also introduces **overcommitment**: `fork` succeeds even if there is not enough memory to give every process a private copy later, so a page fault can fail for lack of memory. xv6 kills the process in that case; Linux has its OOM killer for the same reason.

## 3.3 Traps, timer interrupts and alarms

### Traps: three ways into the kernel

The CPU leaves user code and enters the kernel on a **trap**. RISC-V has three kinds, all handled by the same entry path:

| Kind | Cause | Example | `scause` |
| --- | --- | --- | --- |
| System call | The program asks for a service with `ecall` | `write`, `fork`, `sigalarm` | 8 |
| Exception | The current instruction cannot complete | Page fault, illegal instruction | 12, 13, 15, 2 … |
| Device interrupt | A device needs attention, unrelated to the current instruction | Timer tick, UART, disk | Top bit set (interrupt) |

The hardware does very little on a trap: it saves the user program counter in `sepc`, records the cause in `scause` (and a faulting address in `stval`), switches to supervisor mode, and jumps to the address in `stvec`. Everything else is software.

### The path of a trap from user space in xv6

1. **`uservec`** (in the trampoline page, mapped at the same address in every page table) saves all 32 user registers into the process's **trapframe**, loads the kernel stack pointer and kernel page table from it, and jumps to `usertrap`.
2. **`usertrap`** (in `trap.c`) copies `sepc` into `trapframe->epc`, then decides by `scause`: a system call goes to `syscall()`, a device interrupt to `devintr()`, and a page fault to the fault handlers (the CoW handler is added here).
3. On the way back, **`usertrapret`** sets `stvec` back to `uservec`, loads `sepc` from `trapframe->epc`, and jumps to **`userret`**, which restores all user registers from the trapframe and executes `sret` to return to user mode.

The central point for alarms: **when the kernel returns, user execution resumes at `trapframe->epc` with the registers in the trapframe.** Change those values before returning, and the program continues somewhere else, with different registers, without knowing anything happened. For a system call, `usertrap` adds 4 to `epc` so the program resumes after the `ecall` instead of repeating it, and the return value goes into `trapframe->a0`.

### Timer interrupts

A hardware timer fires periodically (in xv6 roughly every tenth of a second in QEMU). Each firing is a **tick**. The kernel uses ticks for two things: counting time (the global `ticks` counter, used by `sleep` and `uptime`) and **preemption**: on a timer interrupt from user space, `usertrap` calls `yield()` so another process can run. Without timer interrupts, a process in an infinite loop would never give up the CPU.

A timer interrupt that arrives while a user process is running enters through the same `usertrap` path, with `devintr()` returning 2 to say "this was the timer". That is the hook the alarm feature uses.

### What sigalarm and sigreturn do

The task adds a primitive form of user-level timer signal, similar in spirit to Unix `SIGALRM` from Part 1:

- **`sigalarm(n, fn)`**: after every `n` ticks of CPU time **consumed by this process**, the kernel should make the process call `fn`. `sigalarm(0, 0)` turns the alarm off.
- **`sigreturn()`**: called by `fn` at its end; the process then resumes exactly where it was interrupted, as if nothing had happened.

This is how a program can do periodic work (sample its own state, check a deadline) without polling, and it is a model of how real signal delivery works in Unix kernels.

### The state the kernel needs

Each process gains a few fields in `struct proc`:

| Field | Purpose |
| --- | --- |
| Alarm interval | `n` from `sigalarm`; 0 means no alarm |
| Handler address | `fn`, a **user** virtual address |
| Ticks counter | Ticks used since the handler last ran |
| In-handler flag | Set while the handler runs, to stop re-entry |
| Saved trapframe | A copy of all user registers at the moment of interruption |

They must be initialised in `allocproc` (and the saved-trapframe page freed in `freeproc`), because process slots are reused: without it, a new process could inherit an old process's alarm.

### Delivering the alarm: redirecting the return

On each timer interrupt from this process, `usertrap` increments the ticks counter. When it reaches the interval and the handler is not already running:

1. Copy the whole current trapframe into the saved trapframe.
2. Set `trapframe->epc = handler`.
3. Set the in-handler flag and reset the ticks counter.
4. Return to user space normally.

Because of step 2, `userret` "returns" into the handler instead of to the interrupted instruction. The kernel never calls user code directly: running user code with kernel privileges would be a serious security hole, and the kernel does not even use the user page table. Instead it arranges for the **normal return path** to land in the handler, in user mode, with user privileges.

### Returning with sigreturn

The handler runs as ordinary user code. It may change any register. When it finishes it calls `sigreturn()`, a system call. The kernel:

1. Copies the saved trapframe back over the current trapframe. This restores **every** register, including `epc` (the interrupted instruction) and `sp`.
2. Clears the in-handler flag, so the alarm can fire again.
3. Returns the saved `a0` as the system call's return value.

Step 3 is a subtle point. The system call return path writes the return value into `trapframe->a0`. If `sigreturn` returned 0, it would overwrite the interrupted program's `a0` after it had just been restored, and the program would see one register changed at a random moment. Returning the saved `a0` makes the restore exact.

The spec requires that **no register changes** across the alarm, because the interrupted code could be in the middle of any computation. Saving and restoring the whole trapframe, not just a few registers, is the only way to guarantee it.

### Edge cases the spec cares about

| Requirement | Why it matters | How it is met |
| --- | --- | --- |
| Handler address may be 0 | In the test program the handler can be at virtual address 0, so 0 is a valid function | The "alarm active" check is `interval > 0`, never `handler != 0` |
| No re-entry | If the handler takes more than n ticks, a second call would overwrite the saved trapframe and lose the original return point | The in-handler flag blocks delivery until `sigreturn` |
| Periodic | The alarm should keep firing every n ticks, not once | The ticks counter is reset each time the handler starts |
| Count only this process's time | Ticks while other processes run should not count | The counter is incremented only on timer interrupts that arrive while this process is in user mode |
| `sigalarm` result | Return 0 on success | Only invalid arguments (a negative interval) give -1 |

### How this relates to real Unix signals

Real kernels deliver signals the same way in principle: on the way back to user space, if a signal is pending, the kernel saves the interrupted context and redirects the return to the handler. The differences are in where the context is saved and how the return happens. Linux pushes the saved context onto the **user stack** in a signal frame and sets the return address to a small trampoline that calls `rt_sigreturn`; the handler returning normally therefore performs the restore. xv6's version keeps the saved context in the kernel and makes the handler call `sigreturn` itself, which is simpler and cannot be corrupted by the user program, at the cost of only one level of nesting.

### What the tests check

`alarmtest` checks, in order: that the handler is called repeatedly while the program loops (`test0`); that after `sigreturn` the program continues with all registers intact (`test1`, which would break if any register changed); that the handler is not re-entered while running (`test2`); and that `a0` is restored correctly (`test3`). `usertests` must still pass, which checks that the new fields and the extra trapframe page did not break process creation or exit.

# Viva questions

Short answers to the questions an examiner is most likely to ask about the theory. Each answer points back to the section that explains it.

### tempest

1. **Why must you loop around `send` and `recv`?** TCP is a byte stream. `send` may accept fewer bytes than asked and `recv` returns whatever has arrived, so one call is never guaranteed to move a whole message. (1.1)
2. **What does `recv` returning 0 mean?** End of stream: the peer has closed its side and sent FIN. No more data will come. (1.1)
3. **Why is the `Host` header required?** HTTP/1.1 allows many websites on one IP address. `Host` tells the server which one is meant; without it the request is invalid. (1.2)
4. **Why do lines end in `\r\n` and how do you find the end of the headers?** The HTTP grammar requires CRLF line endings. The headers end at the first empty line, i.e. the first `\r\n\r\n`. (1.2)
5. **What are the ways HTTP/1.1 frames a body?** `Transfer-Encoding: chunked`, `Content-Length`, or reading until the connection closes, checked in that order. (1.3)
6. **How does chunked decoding work?** Repeatedly read a hexadecimal size line, then that many bytes, then CRLF; a size of 0 ends the body. (1.3)
7. **What does `Connection: close` achieve?** It turns off persistent connections: the server closes after one response, which gives the client a clean end-of-response signal and ends the connection as RFC 9112 §9 describes. (1.2)
8. **Why percent-encode the city?** A URL can only contain unreserved characters literally; a space or `/` would break the request line or change the path. Each other byte becomes `%XX`. (1.4)
9. **Why `getaddrinfo` and not `gethostbyname`?** It supports IPv4 and IPv6, returns all addresses to try in turn, fills the socket address ready for `connect`, and is thread-safe. (1.4)
10. **Why can't you call `printf` in a signal handler?** It is not async-signal-safe: the signal may interrupt `printf` or `malloc` mid-way, and re-entering them can corrupt their state. Use `write` and `_exit`. (1.4)
11. **What is `MSG_NOSIGNAL` for?** Writing to a closed connection raises `SIGPIPE`, which kills the process by default. The flag makes `send` return an error instead. (2.3)

### mastermind

12. **Why UDP for discovery?** Only UDP can broadcast; TCP connects exactly two endpoints. (2.2)
13. **Why is the IP not in the discovery payload?** The receiver gets it from the packet's source address in `recvfrom`, which is guaranteed reachable, while a sender with several interfaces may not know which of its addresses to advertise. (2.2)
14. **What is the magic number for?** It identifies packets of this protocol so packets from other programs on the same port are ignored. (2.2)
15. **How are players removed from the list?** Soft state: an entry not refreshed by a broadcast for 5 seconds expires. No goodbye message is needed. (2.2)
16. **How can one thread handle the keyboard and several sockets?** An event loop with `poll`: the kernel reports which descriptors are ready, and each is handled without blocking. The `poll` timeout drives all timers. (2.3)
17. **Why switch off canonical mode?** In canonical mode the program only sees a line after Enter, so it cannot redraw the screen without destroying what the user is typing. Raw mode delivers each key immediately and the program keeps the line itself. (2.3)
18. **How is a disconnect detected?** Over TCP, a clean exit or crash closes the socket and `recv` returns 0 or an error. A network loss sends nothing, so heartbeats (`PING` every 1 s) and a 5 s silence timeout catch it. (2.3)
19. **How do you make sure the master is not leaked?** It is never sent until the game ends. Only `END <master>` carries it; hiding received data in the UI is not security. (2.1)
20. **How do you compute feedback with repeated digits?** First mark exact matches, then match remaining digits counting each master digit at most once. (2.1)
21. **What does `--cost-cutting` have to rebuild?** Sessions, sequence numbers and reassembly, a total-chunk count, ACKs and retransmission, and disconnect detection. (2.4)
22. **Why must duplicates be acknowledged again?** If an ACK is lost, the sender retransmits; if the receiver stayed silent on the duplicate, the sender would retransmit forever. (2.4)
23. **Stop-and-wait or selective repeat?** Selective repeat: all chunks are sent at once and only unacknowledged ones are resent after 100 ms. (2.4)

### xv6

24. **How is a virtual address translated in Sv39?** Three 9-bit indices walk a three-level page table from `satp`; the leaf PTE gives the physical page number, and the 12-bit offset is added. (3.1)
25. **What are the RSW bits?** Bits 8–9 of a PTE, ignored by hardware and reserved for software. CoW uses one to mark shared pages. (3.1)
26. **Why is copy-on-write faster?** `fork` copies no data; pages are copied only when written, and most are never written, especially when `exec` follows. (3.2)
27. **Why can't you just clear the W bit to mark CoW?** Truly read-only pages also have W clear, and a write to them must kill the process, not copy. A separate CoW bit tells them apart. (3.2)
28. **Why are reference counts needed, and why a lock?** A shared page must be freed only when the last mapping goes away. The lock stops two CPUs from losing an update to the same count. (3.2)
29. **What happens on a store page fault to a CoW page?** `scause` 15 → check the PTE is CoW → if the count is 1, just make it writable; otherwise allocate, copy, remap writable, and drop one reference on the old page. (3.2)
30. **Why must `copyout` handle CoW?** The kernel writes user memory through physical addresses without a hardware fault, so it would modify a shared page silently. (3.2)
31. **How does the kernel make a process run its alarm handler?** It saves the trapframe and sets `trapframe->epc` to the handler, so the normal return to user space lands in the handler. (3.3)
32. **Why save the whole trapframe?** The handler may change any register, and the interrupted code must see none change. (3.3)
33. **Why does `sigreturn` return the saved `a0`?** The system-call return path writes the return value into `a0`; returning anything else would overwrite the restored register. (3.3)
34. **Why check `interval > 0` and not `handler != 0`?** Address 0 is a valid handler in the test program. (3.3)
35. **How is re-entry prevented?** An in-handler flag is set when the handler starts and cleared by `sigreturn`; no alarm is delivered while it is set. (3.3)
