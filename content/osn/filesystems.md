# Lecture 18: Files and directories

*Slides: L18. Read: OSTEP ch 39, Silb ch 13. Tutorial 7 (Filesystems) s2-5, s25-31.*

Units 1 to 4 virtualized the CPU (processes) and memory (address spaces). This unit is the third pillar, **persistence**. Memory is volatile; a disk or SSD keeps data across power loss, and it holds the data people care most about, so the OS must be extra careful with it.

| Physical resource | OS abstraction |
| --- | --- |
| CPU | Process |
| Memory | Address space |
| Disk / SSD | **Files and directories** |

**The crux (L18 s2).** How should the OS manage a persistent device, and what API should it offer? This lecture is the API (what a program sees). Lecture 19 is the implementation (what is on the disk).

**Why disks need care (Tut 7 s2-3).** Disk I/O is roughly a million times slower than RAM. The disk is not byte-addressable: it is a linear array of **blocks** (typically 512 B sectors or 4 KB blocks), and you read or write a whole block by giving its block number. The file system is the kernel software that turns a name like `/home/me/a.txt` into block numbers.

## Two abstractions: files and directories

*L18 s3-4.*

**File.** A linear array of bytes you can read or write. Each file has a low-level name, its **inode number** (i-number). The OS does not interpret the bytes: it returns exactly what was written.

**Directory.** Also has an inode number. Its contents are a list of **(user-readable name, inode number)** pairs. An entry can point to a file or to another directory, so directories form a **directory tree**.

| Name | Inode number | Refers to |
| --- | --- | --- |
| `foo` | 10 | file |
| `notes.txt` | 14 | file |
| `docs` | 22 | directory |

**Pathnames.** The tree starts at the root `/`, and `/` also separates components: `/foo/bar.txt` is an **absolute pathname**. Names only need to be unique within one directory, so `/foo/bar.txt` and `/bar/foo/bar.txt` can both exist. Extensions like `.c` are only a convention. UNIX names almost everything in this one tree: devices, pipes, even processes (`/proc`).

## Creating, reading and writing files

*L18 s5-8. OSTEP 39.3-39.4.*

```c
int fd = open("foo", O_CREAT | O_WRONLY | O_TRUNC, S_IRUSR | S_IWUSR);
```

| Flag | Meaning |
| --- | --- |
| `O_CREAT` | create the file if it does not exist |
| `O_WRONLY` | open for writing only (`O_RDONLY`, `O_RDWR` are the others) |
| `O_TRUNC` | if it exists, truncate it to 0 bytes |
| `S_IRUSR \| S_IWUSR` | permissions of a new file: owner can read and write |

`open()` returns a **file descriptor** or **-1 on error**. Always check it.

**File descriptors (L18 s6).** A small integer, **private to each process**. It is a *capability*: an opaque handle that lets you call `read()`, `write()` and `close()` on the file. Think of it as a pointer to a file object whose methods are system calls. In xv6 it is an index into the per-process array `struct file *ofile[NOFILE]` in `struct proc`.

Every process starts with **0 = stdin, 1 = stdout, 2 = stderr** already open, so the first file you open usually gets **fd 3** (the lowest free number).

**What `cat` does (L18 s7).** `strace` prints every system call a program makes (`-f` follows children, `-t` adds timestamps, `-e trace=open,read,write` filters):

```
prompt> strace cat foo
open("foo", O_RDONLY|O_LARGEFILE) = 3
read(3, "hello\n", 4096)          = 6
write(1, "hello\n", 6)            = 6
hello
read(3, "", 4096)                 = 0
close(3)                          = 0
```

1. `open` returns fd 3.
2. `read(fd, buf, count)` says which file, where to put the bytes, and the buffer size. It returns the number of bytes actually read: 6 = five letters plus the newline.
3. `write(1, ...)` sends them to stdout.
4. The next `read` returns **0, which means end of file**, so `cat` knows it is done.
5. `close(3)`.

Writing a file is the same pattern: `open` for writing, `write()` repeatedly, `close()`.

## The open file table and offsets

*L18 s9-13. OSTEP 39.5-39.6.*

A file descriptor does not hold the position in the file. It points to an entry in the **system-wide open file table**, and that entry holds it:

```c
struct file {          // xv6, simplified
  int ref;             // how many fds point here
  char readable;
  char writable;
  struct inode *ip;    // the underlying file
  uint off;            // current offset
};

struct {
  struct spinlock lock;
  struct file file[NFILE];
} ftable;              // the whole table: one array, one lock
```

So **the offset, the access mode and the reference count live in the table entry, not in the fd**.

**`lseek()` (L18 s10).** `off_t lseek(int fd, off_t offset, int whence);`

| `whence` | New offset |
| --- | --- |
| `SEEK_SET` | `offset` |
| `SEEK_CUR` | current offset + `offset` |
| `SEEK_END` | file size + `offset` |

`lseek()` **does not perform a disk seek**. It only changes a number in kernel memory; no I/O happens. The offset also advances implicitly: a read or write of N bytes adds N.

**Tracing the offset (L18 s11).** A 300-byte file:

| Call | Returns | Offset after |
| --- | --- | --- |
| `fd = open("file", O_RDONLY)` | 3 | 0 |
| `read(fd, buf, 100)` | 100 | 100 |
| `read(fd, buf, 100)` | 100 | 200 |
| `read(fd, buf, 100)` | 100 | 300 |
| `read(fd, buf, 100)` | **0** (EOF) | 300 |
| `close(fd)` | 0 | – |

With `lseek(fd, 200, SEEK_SET)` then `read(fd, buf, 50)`, the read returns 50 and leaves the offset at 250.

**Opening the same file twice (L18 s12).** Two `open()` calls create **two table entries with two independent offsets**, both pointing at the one inode. Reading 100 bytes through fd 3 does not move fd 4's offset.

**Sharing an entry across `fork()` (L18 s13).** The child's fds point to the **same** table entry as the parent's, so the reference count becomes 2.

```c
int fd = open("file.txt", O_RDONLY);
int rc = fork();
if (rc == 0) {                       // child
    rc = lseek(fd, 10, SEEK_SET);
    printf("child: offset %d\n", rc);
} else if (rc > 0) {                 // parent
    (void) wait(NULL);
    printf("parent: offset %d\n", (int) lseek(fd, 0, SEEK_CUR));
}
```

Both print **10**: the child's `lseek` is visible to the parent. The entry is freed only after both close it. This is how cooperating processes (for example a shell's `cmd > out` with several children) write one output file without overwriting each other. `dup()` and `dup2()` also make a second fd that shares the entry, which is how the shell does redirection.

## Durability: `fsync()` and atomic `rename()`

*L18 s14-15. OSTEP 39.7-39.8.*

**`fsync()`.** A `write()` usually returns as soon as the data is in a memory buffer; the file system writes it to disk **5 to 30 seconds later**. A crash in that window loses the data. `fsync(fd)` forces all dirty data of that file to disk and returns only when it is there. Databases and anything with a recovery protocol need it.

A newly created file also needs **`fsync()` on the directory that contains it**, or its directory entry may not be on disk.

**`rename(old, new)`.** This is what `mv` uses, and it is **atomic with respect to crashes**: afterwards the file has the old name or the new name, never something in between. That makes it the building block for updating a file safely:

```c
int fd = open("foo.txt.tmp", O_WRONLY | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
write(fd, buffer, size);   // 1. write the new version to a temp file
fsync(fd);                 // 2. make sure it is on disk
close(fd);                 // 3. close it
rename("foo.txt.tmp", "foo.txt");   // 4. atomically swap it in
```

A crash at any point leaves either the **complete old file or the complete new file**. Editors save files this way.

## Metadata with `stat()`

*L18 s16. OSTEP 39.9.*

**Metadata** is data about a file. `stat(path)` or `fstat(fd)` fills a `struct stat`:

```c
struct stat {
  dev_t     st_dev;     // device of file
  ino_t     st_ino;     // inode number
  mode_t    st_mode;    // type + protection
  nlink_t   st_nlink;   // number of hard links
  uid_t     st_uid;     // owner user ID
  gid_t     st_gid;     // owner group ID
  off_t     st_size;    // size in bytes
  blksize_t st_blksize; // FS I/O block size
  blkcnt_t  st_blocks;  // blocks allocated
  time_t    st_atime;   // last access
  time_t    st_mtime;   // last modification (of the data)
  time_t    st_ctime;   // last status change (of the inode)
};
```

All of this is stored in the file's **inode** on disk; active inodes are cached in memory. `echo hello > file; stat file` shows Size: 6, Links: 1, Access: (0640/-rw-r-----).

## Directories

*L18 s17-18. OSTEP 39.11-39.14.*

**You can never write a directory directly.** It is file-system metadata, so you change it only indirectly: by creating, removing or renaming things inside it. `mkdir("foo", 0777)` creates one.

An "empty" directory has **two entries**: `.` (itself) and `..` (its parent). `cd ..` is just a lookup of the name `..`.

| Contents of `foo` (inode 31, inside inode 2) | Inode | Meaning |
| --- | --- | --- |
| `.` | 31 | this directory |
| `..` | 2 | parent directory |

**Reading a directory.** A tiny `ls`:

```c
DIR *dp = opendir(".");
struct dirent *d;
while ((d = readdir(dp)) != NULL)
    printf("%lu %s\n", (unsigned long) d->d_ino, d->d_name);
closedir(dp);
```

Each `struct dirent` holds little: the name, the inode number, and bookkeeping (`d_off`, `d_reclen`, `d_type`). That is why `ls -l` has to call `stat()` on every entry to print sizes and permissions.

**Deleting a directory.** `rmdir()` only works on an **empty** directory (only `.` and `..`). The slides' warning: `rm -rf *` run from `/` deletes the whole file system.

## Hard links: why removing a file is `unlink()`

*L18 s19-22. OSTEP 39.15-39.16. Tut 7 s26-31.*

`strace rm foo` shows `unlink("foo")`, not "delete". Here is why.

**`link(old, new)`** (the `ln` command) adds a **new name for the same inode** in a directory. Nothing is copied.

```
$ ln file file2
$ ls -i file file2
67158084 file
67158084 file2
$ rm file
$ cat file2
hello
```

So **creating a file is really two steps**: make an inode, then link a name to it in a directory. **`unlink()` removes one name and decrements the inode's link count** (`st_nlink`). The inode and its data blocks are freed only when **the link count reaches 0** (and no process still has the file open).

| Command | Link count of inode 67158084 |
| --- | --- |
| `echo hello > file` | 1 |
| `ln file file2` | 2 |
| `ln file2 file3` | 3 |
| `rm file` | 2 |
| `rm file2` | 1 |
| `rm file3` | **0: inode and data freed** |

> **Deleting a file = performing the last `unlink()` of it from the directory tree.**

**Symbolic (soft) links.** `ln -s file file2` makes a **separate file of a third type** (`l` in `ls -l`). Its data is the target's **pathname**, so `file2` is 4 bytes, the length of `"file"`. It has **its own inode**.

If the target is removed, the link **dangles**: `cat file2` prints "No such file or directory".

| Property | Hard link (`ln`) | Symbolic link (`ln -s`) |
| --- | --- | --- |
| What it is | another directory entry for the same inode | a separate file whose data is a path |
| Own inode? | no, shares the target's | yes, type "symlink" |
| Link to a directory? | **not allowed** (could create cycles) | allowed |
| Across file systems? | **no**, inode numbers are per file system | yes, it only stores a path |
| Original name removed | data still reachable, count drops | link dangles |
| In `ls -l` | looks like a normal file | starts with `l`, shows `name -> target` |

## Permissions, ACLs and mounting

*L18 s23-25. OSTEP 39.17-39.18.*

**Permission bits.** `-rw-r--r--` is the file type (`-` file, `d` directory, `l` symlink), then three groups of `rwx` for **owner, group and other**. In octal **r = 4, w = 2, x = 1**, added within each group: `chmod 600 foo.txt` gives `rw-------`.

- `x` on a **file**: may it be run? A script with mode 600 gives "Permission denied" when executed.
- `x` on a **directory**: may you `cd` into it (and look names up in it); with `w` as well, you may create and delete files in it.

**Access control lists.** An ACL is an explicit list of who may do what, more precise than owner/group/other. AFS keeps one per directory, with rights `r l i d w k a` (read, lookup, insert, delete, write, lock, administer): `fs setacl private/ andrea rl`. The **superuser** (root) can access every file, which is an inherent risk if someone impersonates them.

**Making and mounting.** `mkfs` writes an empty file system (with a root directory) onto a partition. `mount` pastes it onto the existing tree at a **mount point**: after `mount -t ext3 /dev/sda1 /home/users`, the new FS's root is reachable as `/home/users`. So many file systems (ext3, `proc`, `sysfs`, `tmpfs`, AFS) appear as one uniform tree.

# Lecture 19: File system implementation

*Slides: L19. Read: OSTEP ch 40, Silb ch 14. Tutorial 7 s6-24 (vsfs from scratch), s32-37 (xv6).*

**The crux (L19 s2).** How do we build a simple file system? There is no special hardware: a file system is pure software. Think about it in two parts:

1. **Data structures:** what is on the disk (blocks, superblock, bitmaps, inodes, directories)?
2. **Access methods:** which of those structures does each call (`open`, `read`, `write`, create) read and write?

We learn this through **vsfs** (the Very Simple File System from OSTEP), then see how xv6 does it.

## The on-disk layout of vsfs

*L19 s3-5. OSTEP 40.2.*

The example disk has **64 blocks of 4 KB**. Built up in steps:

1. Most of the disk is the **data region** (D): user data. 56 blocks.
2. Reserve an **inode table** (I) for the per-file metadata: 5 blocks. With 256-byte inodes, 16 fit in a 4 KB block, so **5 × 16 = 80 inodes**, which is the most files this FS can ever hold.
3. Add two **bitmaps** to track what is free: an **inode bitmap** (i) and a **data bitmap** (d), one block each.
4. Block 0 is the **superblock** (S).

```
block:  0  1  2  3  4  5  6  7  8 ........ 63
        S  i  d  I  I  I  I  I  D ........ D
```

**The superblock** describes the whole FS: its type (a **magic number**), the block size, how many inodes and data blocks there are, and where the inode table starts (block 3 here). On **mount**, the OS reads the superblock first, sets up its parameters, and attaches the volume to the tree. After that it knows where every other structure lives. **Lose the superblock and nothing else can be found**, which is why real file systems keep copies.

**Bitmaps.** One bit per object, **0 = free, 1 = in use**. To allocate, find a 0 bit, set it to 1, and write the bitmap block back. That write-back is an **extra I/O on every allocation**. A bitmap costs 1 bit per block: a 1 TB disk with 4 KB blocks has $2^{40} / 2^{12} = 2^{28}$ blocks, so a **32 MB** data bitmap. Alternatives are free lists (what xv6 uses for *RAM* pages, `struct run`) and B-trees (XFS). On a disk a bitmap is better: it is compact and makes it easy to find *contiguous* free blocks.

## Inodes

*L19 s6-8. OSTEP 40.3. Tut 7 s7-19.*

The **inode** (index node) holds all of a file's metadata. The **i-number** is just its index in the on-disk inode array, so **its location is computed, not searched**:

$$
\boxed{\text{blk} = \frac{\text{inumber} \times \text{sizeof(inode)}}{\text{blockSize}} \qquad \text{sector} = \frac{\text{blk} \times \text{blockSize} + \text{inodeStartAddr}}{\text{sectorSize}}}
$$

(Integer division. Disks address **512-byte sectors**, not bytes.)

**Where is inode 32?** The inode table starts at 12 KB:

| Step | Inode 32 | Inode 70 |
| --- | --- | --- |
| Offset in table = i × 256 | 8192 B | 17920 B |
| Inode block = offset ÷ 4096 | iblock 2 | iblock 4 |
| Disk address = 12 KB + blk × 4 KB | 20 KB | 28 KB |
| Sector = address ÷ 512 | 40 | 56 |
| Offset inside the block = (i mod 16) × 256 | 0 B | 1536 B |

**What is inside an inode (ext2, L19 s8).** Mode (permissions and type), uid, gid, size in bytes, four times (access, change, modify, delete), the **links count**, blocks allocated, flags, and **15 block pointers** (60 bytes). Everything that is not user data is metadata, and `stat()` reads it from here.

**Notice what is missing: the file's name.** Names live in directories, not in inodes (Tut 7 s17). That is exactly what makes hard links possible.

## Finding a file's data: the multi-level index

*L19 s9-12. OSTEP 40.3. Tut 7 s9-16.*

Tutorial 7 builds this up the same way paging was built up for memory:

1. **Start and end block in the inode.** Requires the file to be contiguous. After deletions, free space is scattered, so you could have 7 free blocks but no 6 in a row. That is **external fragmentation**, the problem with segmentation.
2. **An array of block numbers in the inode** (like a page table): blocks can be anywhere. But the array has a fixed size N, so the max file is N × block size. ext2 has **12 direct pointers: 12 × 4 KB = 48 KB**. Making the array big enough for 1 GB files would make every inode huge. (A bigger block size is not the answer either: a 2 MB file in a 1 GB block wastes 998 MB.)
3. **Indirect pointers** (like multi-level page tables): one inode slot points to a block that holds **more pointers**. With 4 KB blocks and 4-byte pointers, one block holds **1024**. The key point from the tutorial: **the indirect block is allocated only on demand**, so small files never pay for it.

ext2 has **12 direct + 1 single indirect + 1 double indirect + 1 triple indirect = 15 pointers**.

$$
\boxed{\text{max blocks} = 12 + 1024 + 1024^2 + 1024^3 \quad (\text{4 KB blocks, 4 B pointers})}
$$

| Pointers used | Adds | Max file size |
| --- | --- | --- |
| 12 direct | 12 blocks | 48 KB |
| + single indirect | 1024 blocks | ≈ 4 MB |
| + double indirect | $1024^2$ blocks | ≈ 4 GB |
| + triple indirect | $1024^3$ blocks | ≈ 4 TB |

Each extra level multiplies capacity by 1024. In general, with block size $B$ and pointer size $p$, one indirect block holds $B/p$ pointers.

**Which pointer serves byte 5,000,000?**

1. Block index = 5,000,000 ÷ 4096 = **1220**.
2. 1220 ≥ 12, so not direct. 1220 − 12 = 1208.
3. 1208 ≥ 1024, so not single indirect. 1208 − 1024 = **184**.
4. Double indirect: outer slot 184 ÷ 1024 = **0**, inner slot 184 mod 1024 = **184**.
5. Disk reads: inode → double-indirect block → indirect block → data block.

**Why such a lopsided tree? Most files are small (L19 s12).** From Agrawal et al. (FAST '07): the most common file size is about **2 KB**, the average is about 200 KB, a few big files hold most of the bytes, a FS holds about 100K files and is about half full, and most directories have 20 or fewer entries. The 12 direct pointers (48 KB) cover the common small file with **no extra reads**, and indirection keeps huge files possible. *Optimize the common case; keep the rare case possible.*

**Extents (L19 s13).** Instead of one pointer per block, store **(start block, length)** for each contiguous run. A 1.2 MB file in blocks 1000-1299 needs one extent (start 1000, length 300) instead of 300 pointers. Used by ext4 and XFS. Less metadata, but it needs contiguous free space. Pointers are to extents what **paging** is to **segmentation**.

**Linked allocation and FAT (L19 s14).** The inode (or directory entry) points to the first block, and each block points to the next. Random access, or finding the last block, means walking the chain. **FAT** moves all the next-pointers into one **File Allocation Table** kept in memory: for `a.txt` starting at block 4, the table says 4 → 7 → 2 → 10 → EOF. FAT has **no inodes**; metadata lives in the directory entry, so **hard links are impossible in FAT**.

## Directories on disk

*L19 s15. OSTEP 40.4. Tut 7 s18-19.*

A directory is **a file of type "directory"**: an inode plus data blocks. Its data blocks hold the entries:

| inum | reclen | strlen | name |
| --- | --- | --- | --- |
| 5 | 12 | 2 | `.` |
| 2 | 12 | 3 | `..` |
| 12 | 12 | 4 | `foo` |
| 13 | 12 | 4 | `bar` |
| 24 | 36 | 28 | `foobar_is_a_pretty_longname` |

- `strlen` is the name's real length (including the terminator); **`reclen`** is the space the record takes.
- `unlink()` leaves a **hole**: the entry's inum is set to 0. `reclen` lets a later entry reuse that space.
- The inode's **type field** (directory or regular file) tells the kernel how to interpret the data blocks.
- A linear list is simple. XFS uses B-trees so lookups in huge directories are fast.

## Free-space policy

*L19 s16. OSTEP 40.5.*

Creating a file means finding a free inode in the **inode bitmap** and free blocks in the **data bitmap**. The policy matters: first-fit may scatter a new 8-block file across the disk (many seeks). ext2/ext3 **pre-allocate**: look for a run of about 8 free blocks so at least part of the file is contiguous and can be read sequentially.

## Access paths: what each call costs

*L19 s17-22. OSTEP 40.6.*

Assume the FS is mounted (superblock in memory) and nothing else is cached.

**`open("/foo/bar")` walks the path (L19 s17).**

1. Read the **root inode**. Its i-number is well known (**2** in most UNIX file systems, **1** in xv6), because the root has no parent to look it up in.
2. Read root's **data**, find `"foo" → 44`.
3. Read **foo's inode** (44).
4. Read foo's **data**, find `"bar" → 50`.
5. Read **bar's inode** (50).

Then check permissions, allocate an fd and an open-file-table entry, and return. **Each level costs at least 2 reads** (its inode and its data):

$$
\boxed{\text{uncached reads for } \texttt{open()} \approx 2 \times \text{depth} + 1}
$$

So `/a` costs 3, `/a/b/c` costs 7, and a path 100 levels deep costs hundreds of reads (more if directories span several blocks). This is the motivation for caching.

**Reading a 3-block file (Figure 40.3, L19 s18).**

| Call | I/Os |
| --- | --- |
| `open(bar)` | 5 reads (the walk above) |
| each `read()` | read inode, read data block, **write inode** (access time) = 3 |
| `close()` | **none** |

Total = 5 + 3 × 3 = **14 I/Os**. **Reads never touch the bitmaps.**

**An allocating write costs 5 I/Os (L19 s20).** To append one 4 KB block:

1. Read the inode (where do blocks go?).
2. Read the data bitmap (find a free block, say 23).
3. Write the data bitmap (mark 23 used).
4. Write data block 23 (the user's data).
5. Write the inode (`ptr[0] = 23`, new size).

**Only 1 of the 5 is user data; the other 4 are metadata.** Overwriting an existing block needs no allocation, so no bitmap I/O.

**Creating `/foo/bar` costs 10 I/Os (Figure 40.4, L19 s21).** Walk the path (read root inode, root data, foo inode, foo data), read and write the **inode bitmap** to allocate an inode, read and write **foo's data** to add the entry, read and write **bar's inode** to initialize it, and write **foo's inode** (size and mtime). Why *read* a brand-new inode? It shares a 4 KB block with 15 others, so it is a read-modify-write.

$$
\boxed{\text{create} + N \text{ allocating writes} = 10 + 5N \text{ I/Os}}
$$

Creating a 12 KB (3-block) file: 10 + 3 × 5 = **25 I/Os**.

## Simulating vsfs: predict each change

*L19 s23-24. OSTEP ch 40 homework (`vsfs.py`).*

Notation: `[type a:data-block r:link-count]`, `d` = directory, `f` = file. The allocator takes the **lowest free number**.

| Operation | What changes |
| --- | --- |
| `mkdir("/g")` | new inode (bitmap bit), new data block holding `(.,1) (..,0)`, entry `(g,1)` in root, **root's link count +1** (because of g's `..`) |
| `creat("/g/q")` | new inode `[f a:-1 r:1]` only, **no data block** until the first write, entry `(q,2)` in g |
| first write to `/g/q` | data bitmap bit, the inode's `a:` field, and the block's contents |
| `link /g/q /w` | entry `(w,2)` in root, inode's link count 1 → 2; **no new inode** |
| `unlink /g/q` | entry removed, link count 2 → 1; inode and block **stay** until the count reaches 0 |

## Caching and buffering

*L19 s25-28. OSTEP 40.7.*

**Caching reads.** Keep popular blocks in DRAM with LRU-like replacement. The first `open` of a path costs many I/Os; later ones are cache hits.

- **Static partitioning:** a fixed file cache of about 10% of RAM. Predictable, but idle cache memory is wasted and the cache cannot grow when needed.
- **Dynamic partitioning, the unified page cache:** file pages and process (virtual memory) pages share one pool, and the boundary moves with demand. Better utilization.

Inside `read()`: on a miss, disk → page cache → copy into your `buf`; on a hit, page cache → copy, no disk. Cached pages are shared by all processes.

**Buffering writes.** Caching absorbs reads, but writes must reach the disk eventually. File systems hold dirty data **5 to 30 seconds**, which wins three ways:

| Benefit | Example | Without buffering | With buffering |
| --- | --- | --- | --- |
| **Batching** | create `a.txt` then `b.txt` (same inode-bitmap block) | 2 bitmap writes | 1 |
| **Scheduling** | 100 dirty blocks scattered over the disk | 100 writes in arrival order | 100 writes sorted by location |
| **Avoidance** | create a temp file, write it, delete it | 10+ I/Os | **0** |

The risk: a crash before write-back loses those updates.

**The durability / performance trade-off (L19 s28).** From fastest to safest: buffered writes (default, may lose up to ~30 s) → `fsync()` at key points (durable when it returns) → `O_DIRECT` (bypass the page cache) → raw disk (no FS at all). A browser cache can use buffered writes; a bank transaction needs `fsync()` or `O_DIRECT`.

**Try it on Linux (L19 s29).**

| Command | Shows |
| --- | --- |
| `ls -i file`, `stat file` | inode number, links, size, blocks |
| `ls -id /` | root inode = 2 |
| `df -i` | inodes used and free (the table is fixed-size) |
| `sudo dumpe2fs -h /dev/sda1` | superblock fields, magic `0xEF53` |
| `filefrag -v file` | the file's extents |
| `sudo debugfs -R 'stat <12>' /dev/sda1` | raw inode fields |

# The xv6 file system (Tutorial 7)

*Tut 7 s32-37. Code: `kernel/fs.h`, `kernel/fs.c`, `kernel/file.c`, `kernel/sysfile.c`, `kernel/bio.c`, `kernel/log.c`. xv6 book ch 8. This is the base for Mini Project 3.*

xv6 is the same design as vsfs with small differences.

**Layers.** From top to bottom: file descriptors → pathnames → directories → **inodes** → **logging** → **buffer cache** → disk. The tutorial focuses on the inode layer and only touches the log and buffer cache where MP3 needs them.

**Disk layout** (`kernel/fs.h`):

```
[ boot block | superblock | log | inode blocks | free bitmap | data blocks ]
```

- **BSIZE = 1024** bytes (not 4 KB), FSSIZE = 2000 blocks.
- There is **one bitmap, for data blocks only**. Free inodes are found by scanning the inode blocks for `type == 0` (`ialloc`). The tutorial notes that OSTEP's split into two bitmaps is not necessary.
- The **log** region is for crash consistency: every FS write happens inside a transaction (`begin_op` … `end_op`) and is first written to the log, so a crash leaves either all of an operation's writes or none.
- `ROOTINO = 1`.

**On-disk structures:**

```c
struct superblock {
  uint magic;       // FSMAGIC
  uint size;        // size of FS image in blocks
  uint nblocks;     // number of data blocks
  uint ninodes;
  uint nlog;
  uint logstart, inodestart, bmapstart;
};

#define NDIRECT   12
#define NINDIRECT (BSIZE / sizeof(uint))      // 256
#define MAXFILE   (NDIRECT + NINDIRECT)       // 268 blocks

struct dinode {
  short type;               // T_DIR, T_FILE, T_DEVICE; 0 = free
  short major, minor;       // T_DEVICE only
  short nlink;              // number of hard links
  uint  size;               // bytes
  uint  addrs[NDIRECT + 1]; // 12 direct + 1 single indirect
};

#define DIRSIZ 14
struct dirent {             // a directory's data is an array of these
  ushort inum;              // 0 = free slot
  char name[DIRSIZ];
};
```

So the largest xv6 file is **268 × 1 KB = 268 KB**. A `dinode` is 64 bytes, so `IPB` (inodes per block) = 1024 / 64 = 16, and inode *i* is in block `i / IPB + sb.inodestart` (the `IBLOCK` macro: the vsfs formula again). The in-memory `struct inode` adds a reference count and a **sleep-lock**.

**`read()` (Tut 7 s35).** `fileread` locks the inode, calls `readi(ip, 1, addr, f->off, n)`, and advances `f->off` by what was read. `readi` loops block by block:

```c
for (tot = 0; tot < n; tot += m, off += m, dst += m) {
    uint addr = bmap(ip, off / BSIZE);   // file block index -> disk block number
    bp = bread(ip->dev, addr);           // through the buffer cache
    m = min(n - tot, BSIZE - off % BSIZE);
    either_copyout(user_dst, dst, bp->data + (off % BSIZE), m);
    brelse(bp);
}
```

`bmap` is the multi-level index: below `NDIRECT` it uses `addrs[]` directly; otherwise it reads the indirect block `addrs[NDIRECT]`. When writing, it **allocates blocks on demand** with `balloc`, including the indirect block itself.

**`write()` (Tut 7 s36).** `filewrite` splits a big write into chunks of at most `((MAXOPBLOCKS - 1 - 1 - 2) / 2) * BSIZE` = 3 blocks, and wraps **each chunk in its own transaction**, because one transaction may only touch `MAXOPBLOCKS` (10) blocks: the inode, an indirect block, bitmap blocks, slop for unaligned writes, and the data. `writei` uses `log_write(bp)` instead of writing the block directly, and ends with `iupdate(ip)`, since `bmap` may have added a block to `addrs[]`.

**The inode API (Tut 7 s37).**

| Function | Does |
| --- | --- |
| `readi`, `writei` | read or write an inode's data |
| `itrunc` | free all of an inode's data blocks (empty file) |
| `namei(path)` | path → inode (unlocked); `nameiparent` returns the parent and the last name |
| `dirlookup(dp, name)` | look a name up in a directory inode |
| `ilock`, `iunlock` | lock / unlock an inode (reads it from disk on first lock) |
| `iput` | drop a reference; free the inode if it has no references **and** `nlink == 0` |
| `iunlockput` | `iunlock` **then** `iput` (iput may need to take the lock itself to truncate) |
| `iupdate` | copy an in-memory inode to disk |
| `begin_op`, `end_op` | start and end a transaction; every FS write must be inside one |

**Going further (Tut 7 s38).** RAID, disk partitioning (MBR, GPT), SATA and NVMe, journaling / write-ahead logging, network file systems, FUSE, character and block devices, initramfs, and other file systems (ext4, btrfs, NTFS).

# File-system theory from the textbooks

*Classic theory around L18 and L19, from Silberschatz ch 13-14 and OSTEP ch 39-42. The slides use vsfs; these are the general ideas that vsfs is one example of.*

## Access methods (Silb 13.2)

- **Sequential access:** read or write the next block in order; the offset moves forward automatically. This is the model for `read` and `write`, and it suits tapes.
- **Direct (random) access:** read or write block $n$ in any order, as for databases. In UNIX this is `lseek` followed by `read`.
- **Indexed access:** an index of keys points to blocks (for example, an ISAM file). It is built on top of direct access.

## Directory structures (Silb 13.3)

| Structure | Idea | Problem |
| --- | --- | --- |
| Single-level | One directory for everyone | Name clashes; no grouping |
| Two-level | One directory per user | Hard to share between users |
| Tree | Any depth, with absolute and relative paths | No sharing of a file between two directories |
| Acyclic graph | A file or directory can appear in several places (hard and soft links) | Deleting a shared file: dangling links or reference counts; aliases when traversing |
| General graph | Cycles allowed | Traversal can loop forever, and garbage collection is needed. UNIX avoids this by banning hard links to directories |

UNIX is an acyclic graph: a tree of directories, plus hard links to files and symbolic links to anything.

## Allocation methods (Silb 14.4)

| Method | How a file is stored | Good at | Bad at |
| --- | --- | --- | --- |
| **Contiguous** | Start block $b$ and length $n$, so block $i$ is at $b + i$ | Fast sequential and random access, little metadata | **External fragmentation**; files are hard to grow (sizes must be known up front) |
| **Extents** | A list of (start, length) runs | Compact metadata for big files (ext4) | Fragmentation within extents; a growing file needs more extents |
| **Linked** | Each block points to the next | No external fragmentation; easy to grow | Random access needs walking the chain; a lost pointer loses the rest; pointer space in every block |
| **FAT** | The links are kept in one table at the start of the disk (cached in memory) | Random access by following the table in memory | The table must be cached; no inodes, so no hard links |
| **Indexed** | An index block lists all of a file's blocks | Random access without external fragmentation | Wastes an index block on a tiny file; a big file needs a linked, multilevel or combined index |

The **UNIX inode** is the **combined scheme**: 12 direct pointers for small files, then single, double and triple indirect blocks for large ones (this is the vsfs multi-level index).

## Free-space management (Silb 14.5)

- **Bit vector (bitmap):** one bit per block. It is easy to find runs of free blocks, but it must fit in memory. For example, a 1 TB disk with 4 KB blocks has $2^{28}$ blocks, so its bitmap takes $2^{28}$ bits = **32 MB**.
- **Linked list:** each free block points to the next. It wastes no extra space, but finding many free blocks needs many disk reads.
- **Grouping:** the first free block stores the addresses of $n$ free blocks, the last of which stores the next $n$, and so on.
- **Counting:** store (first free block, number of contiguous free blocks) pairs. This works well because space is often freed and allocated in runs.
- vsfs and ext use bitmaps; XFS and ZFS use trees and space maps.

## Crash consistency (OSTEP 42, beyond the slides)

Appending one block to a file needs **three writes**: the data block (Db), the inode (I) and the data bitmap (B). A crash can land between any of them.

| Writes that reached disk | Result |
| --- | --- |
| Db only | Consistent: as if the write never happened (the data is simply lost) |
| I only | Inode points at garbage, and the bitmap disagrees with the inode: **inconsistent** |
| B only | Block marked used but no inode points at it: a **space leak** |
| I and B | Metadata consistent, but the file shows **garbage** data |
| I and Db | The bitmap says the block is free: inconsistent |
| B and Db | Space leak: no inode points at the block |

- **fsck:** after a crash, scan the whole disk and fix the metadata (bitmaps, link counts, duplicate pointers). It is correct but extremely slow on large disks.
- **Journaling (write-ahead logging):** first write the transaction to the journal (TxBegin, the blocks, then **TxEnd**, which is the commit point), then **checkpoint** the blocks to their real locations, then free the journal space. After a crash, replay committed transactions and ignore incomplete ones. **Metadata (ordered) journaling** writes the data block to its final place *before* committing the metadata, so it never needs to journal user data. xv6's log (Tutorial 7) is this idea.

# Practice problems, Lectures 18 and 19

Try each one before you open its solution. Problems marked **(slides)** come from the lecture's own simulations.

**F1.** A process runs the code below on a 300-byte file. What does each call return, and what is the offset after each?

```c
int fd = open("file", O_RDONLY);
read(fd, buf, 120);
lseek(fd, -50, SEEK_END);
read(fd, buf, 100);
read(fd, buf, 100);
```

*Solution.* **Rules:** `open` returns the lowest free fd; `read` returns the number of bytes actually read (fewer at the end of the file, 0 at EOF) and advances the offset by that amount; `lseek(fd, off, SEEK_END)` sets the offset to file size + off.

| Call | Returns | Offset after |
| --- | --- | --- |
| `open` | **3** (fds 0, 1, 2 are taken) | 0 |
| `read(fd, buf, 120)` | **120** | 120 |
| `lseek(fd, -50, SEEK_END)` | **250** (300 − 50) | 250 |
| `read(fd, buf, 100)` | **50** (only 50 bytes remain) | 300 |
| `read(fd, buf, 100)` | **0** (end of file) | 300 |

**F2.** A parent opens a file, then forks. The child reads 100 bytes, then exits. The parent then reads 100 bytes. Which bytes does the parent get? What changes if the child instead opens the file itself after the fork?

*Solution.* Each process has an **fd table** whose entries point into the system-wide **open-file table**; each open-file entry holds the **current offset**, the mode and a reference count. After `fork()` the parent's and child's fds point to the **same open-file-table entry**, so they **share one offset** (the reference count becomes 2). The child's read moves the shared offset to 100, so the parent's read returns **bytes 100 to 199**. If the child calls `open()` itself, it gets a **new table entry** with its **own offset**, so the parent's offset is unaffected and it reads **bytes 0 to 99**.

**F3.** You run `echo hi > a; ln a b; ln -s a c; rm a`. What do `cat b` and `cat c` print, and what are the link counts?

*Solution.* Step by step:

| Command | Effect | Link count of the file's inode |
| --- | --- | --- |
| `echo hi > a` | creates inode I with name `a` | 1 |
| `ln a b` | `b` is a second name for the **same inode** | 2 |
| `ln -s a c` | `c` is a **new inode** whose data is the path "a" | 2 (unchanged) |
| `rm a` | `unlink("a")` removes the name `a` | **1** |

`cat b` prints **hi**: the inode and data still exist, reachable through `b`. `cat c` follows the stored path "a", which no longer exists: **"No such file or directory"** (a **dangling symlink**). A file is really deleted only when its link count reaches 0 and no process has it open.

**F4.** Why are hard links to directories not allowed, and why can't a hard link cross file systems?

*Solution.* **Directories:** a hard link to a directory could create a **cycle** in the tree (a directory that contains a link to one of its own ancestors). That breaks tools that walk the tree (`find`, `du` would loop forever), makes `..` ambiguous (a directory could have several parents), and breaks reference counting (a cycle never reaches link count 0, so it is never freed). **Across file systems:** a directory entry stores only an **inode number**, and inode numbers are unique only **within one file system**, so an entry in one file system cannot name an inode in another. **Symbolic links** store a **path** instead, so they have neither problem.

**F5.** An editor wants a crash during save never to leave a half-written file. Give the sequence of calls and say why each is needed.

*Solution.* **Sequence and purpose:**

1. `open("foo.txt.tmp", O_CREAT | O_WRONLY | O_TRUNC)` and `write()` the new contents: the original file is untouched, so a crash now loses only the temp file.
2. **`fsync(fd)`:** forces the temp file's data and inode to disk. Without it, the OS may still hold the data in memory when the rename reaches the disk.
3. `close(fd)`.
4. **`rename("foo.txt.tmp", "foo.txt")`:** this is **atomic**, so after a crash `foo.txt` is either the complete old file or the complete new file, never a mixture.
5. (For full safety) `fsync` the **directory** so that the rename itself is durable.

Without step 2, the rename could be written before the data, and a crash would leave `foo.txt` pointing to empty or garbage blocks.

**F6. (slides)** vsfs: 4 KB blocks, 256-byte inodes, inode table starting at 12 KB, 512-byte sectors. Find the inode block, the sector and the offset inside the block for inode 70. Then do inode 45.

*Solution.* **Formulas (slides):**

$$
\text{blk} = \left\lfloor\frac{i \times 256}{4096}\right\rfloor \qquad \text{address} = 12\text{ KB} + \text{blk} \times 4\text{ KB} \qquad \text{sector} = \frac{\text{address}}{512} \qquad \text{offset in block} = (i \bmod 16) \times 256
$$

| | Inode 70 | Inode 45 |
| --- | --- | --- |
| Offset in the table = i × 256 | 17,920 B | 11,520 B |
| Inode block = offset ÷ 4096 | **4** | **2** |
| Block address = 12 KB + blk × 4 KB | 28 KB = 28,672 | 20 KB = 20,480 |
| Sector = address ÷ 512 | **56** | **40** |
| Offset within block = (i mod 16) × 256 | 6 × 256 = **1536 B** | 13 × 256 = **3328 B** |

(16 inodes fit in a 4 KB block.)

**F7.** A file system has 4 KB blocks, 4-byte block pointers, 12 direct pointers, and one single, one double and one triple indirect pointer. (a) What is the maximum file size? (b) Which pointer holds byte offset 100,000? (c) Byte offset 10,000,000?

*Solution.* **(a)** A block holds 4096 / 4 = 1024 pointers. $\text{max} = (12 + 1024 + 1024^2 + 1024^3) \times 4\text{ KB} \approx$ **4 TB** (just over $2^{42}$ bytes; the triple-indirect term dominates).

**Method for (b) and (c):** block index = offset ÷ 4096. If it is < 12, a direct pointer serves it. Otherwise subtract 12; if the result is < 1024, it is in the single-indirect block at that slot. Otherwise subtract 1024; if the result is < 1024², it is in the double-indirect tree (outer slot = result ÷ 1024, inner slot = result mod 1024).

**(b)** 100,000 ÷ 4096 = 24.4, so block **24**. 24 ≥ 12, and 24 − 12 = 12 < 1024: **single-indirect pointer, slot 12**.

**(c)** 10,000,000 ÷ 4096 = 2441.4, so block **2441**. 2441 − 12 = 2429 ≥ 1024, so subtract again: 2429 − 1024 = 1405 < 1024². **Double-indirect: outer slot 1405 ÷ 1024 = 1, inner slot 1405 mod 1024 = 381.** (Disk reads to get the data: inode, double-indirect block, indirect block, data block.)

**F8.** Redo F7(a) for 1 KB blocks with the same pointers. Then compute xv6's maximum file size.

*Solution.* A 1 KB block holds 1024 / 4 = **256 pointers**. $\text{max} = (12 + 256 + 256^2 + 256^3) \times 1\text{ KB} = 16{,}843{,}020\text{ KB} \approx$ **16 GB**. **xv6** has only 12 direct pointers and one single-indirect pointer (NDIRECT = 12, NINDIRECT = 256): (12 + 256) blocks × 1 KB = **268 KB**.

**F9.** How many disk reads does `open("/usr/lib/libc.so")` need with a cold cache, assuming each directory fits in one block?

*Solution.* **Rule:** 2 reads for each directory in the path (its inode, then its data block), plus 1 read for the target's inode: 2 × depth + 1. Here the directories are `/`, `usr` and `lib` (depth 3): root inode, root data, `usr` inode, `usr` data, `lib` inode, `lib` data, then `libc.so`'s inode = **7 reads**. The superblock is already in memory after mount, and the root inode's location is known.

**F10. (slides)** How many I/Os does it take to create `/foo/bar` and write 12 KB to it in vsfs (4 KB blocks, cold cache)? Which are user data?

*Solution.* **Create = 10 I/Os:** read the root inode, read the root data, read foo's inode, read foo's data (4 reads to walk the path); read the inode bitmap, write the inode bitmap; write foo's data (the new entry); read bar's new inode, write bar's inode; write foo's inode. **Each allocating write = 5 I/Os:** read bar's inode, read the data bitmap, write the data bitmap, write the data block, write bar's inode. 12 KB = 3 blocks of 4 KB, so 3 × 5 = 15. **Total = 10 + 15 = 25 I/Os**, and **only 3 of them** write user data; the rest is metadata overhead.

**F11.** Why does `read()` write the inode, and why does it never touch a bitmap? How could you avoid that write?

*Solution.* A read must update the inode's **last-access time** (`atime`), so after reading the data it **writes the inode back** (read inode, read data, write inode = 3 I/Os per block). It touches **no bitmap** because reading never allocates or frees an inode or a block. To avoid the write, mount with **`noatime`** (never update atime) or **`relatime`** (update only if atime is older than mtime, or about once a day).

**F12. (slides)** In `vsfs.py` the state is `inodes [d a:0 r:2] [] [] []`, `data [(.,0) (..,0)] [] [] []`. Show the state after `mkdir("/g")`, then `creat("/g/q")`, then `link("/g/q", "/w")`.

*Solution.* `mkdir("/g")`: inodes `[d a:0 r:3] [d a:1 r:2] [] []` (root's count +1 for g's `..`), data `[(.,0) (..,0) (g,1)] [(.,1) (..,0)] [] []`. `creat("/g/q")`: inode 2 = `[f a:-1 r:1]` (no data block yet), g's block gets `(q,2)`. `link`: root's block gets `(w,2)` and inode 2 becomes `[f a:-1 r:2]`. No new inode or data block.

**F13.** Compare pointer-based allocation, extents and FAT on (a) metadata for a 1 GB contiguous file, (b) random access, (c) hard links.

*Solution.*

| | Pointer-based (inode) | Extents | FAT |
| --- | --- | --- | --- |
| (a) Metadata for a 1 GB contiguous file (262,144 blocks of 4 KB) | One pointer per block (about 262,144 pointers plus indirect blocks) | **One extent** (start, length) | One table entry per block (262,144 entries) |
| (b) Random access | Up to 3 extra indirect reads | A short search over the extent list | **Walk the chain** (only fast because the table is cached in memory) |
| (c) Hard links | Yes (the link count is in the inode) | Yes (inode-based) | **No**: there are no inodes, so no place for a link count |

**F14.** Give one example each of batching, scheduling and avoidance by write buffering, and say what an application that cannot lose data should do.

*Solution.* Batching: two files created in the same inode-bitmap block → one bitmap write instead of two. Scheduling: 100 scattered dirty blocks written in disk order instead of arrival order. Avoidance: a temp file created and deleted within 30 s → no I/O at all. An application that cannot lose data calls **`fsync()`** at commit points (or uses `O_DIRECT`).

**F15.** In xv6, why does `filewrite` split a large write into several `begin_op`/`end_op` transactions? Why does `writei` call `iupdate` even when the size did not change?

*Solution.* **Splitting:** every file-system operation runs inside a transaction (`begin_op` ... `end_op`), and the transaction's modified blocks are first written to the **log**, which has limited room. One transaction may write at most `MAXOPBLOCKS` = 10 blocks. A single large write could touch far more: data blocks, bitmap blocks, the inode, the indirect block, and extra blocks if the start and end are not block-aligned. So `filewrite` writes in **chunks of at most 3 data blocks**, each in its own `begin_op`/`end_op`, so that every chunk fits in the log. Each chunk is atomic (all or nothing), but a crash between chunks leaves a partial write. **`iupdate`:** `writei` always calls `iupdate(ip)` because `bmap` may have **allocated a new block** and stored its address in `ip->addrs[]` (and the size may have grown), and those changes in the in-memory inode must be written to the on-disk inode.

**F16 (theory).** Compare contiguous, linked (including FAT) and indexed allocation on sequential access, random access, fragmentation and file growth. Which one is the UNIX inode, and why?

*Solution.* **Contiguous:** sequential and random access are both fast (block i is at start + i), but it causes **external fragmentation** and files are hard to grow. **Linked:** no external fragmentation and growth is easy, but random access must walk the chain (slow), and each block loses space to a pointer. **FAT** keeps the chain in a table in memory, which makes random access fast, but there are no inodes, so no hard links. **Indexed:** fast random access with no external fragmentation, but small files waste an index block, and large files need several levels. The UNIX inode is a **combined indexed scheme**: direct pointers for the many small files, and single, double and triple indirect blocks for the few large ones.

---

**F17 (theory).** A disk has 2 TB and 4 KB blocks. (a) How big is a free-space bitmap? (b) Compare the bitmap with a free list, grouping and counting.

*Solution.* (a) 2 TB / 4 KB = $2^{41}/2^{12} = 2^{29}$ blocks, so $2^{29}$ bits = $2^{26}$ bytes = **64 MB**. (b) The **bitmap** makes runs of free blocks easy to find, but must be cached in memory to be fast. A **free list** costs no extra space, but finding n free blocks takes n disk reads. **Grouping** stores n free addresses per block, so one read finds many. **Counting** stores (start, length) runs, which is very compact when free space comes in contiguous runs.

---

**F18 (theory).** Describe single-level, two-level, tree, acyclic-graph and general-graph directories. Why does UNIX forbid hard links to directories?

*Solution.* **Single-level:** one directory for everyone, so names clash. **Two-level:** one directory per user, which makes sharing hard. **Tree:** arbitrary depth, with absolute and relative paths, but no sharing. **Acyclic graph:** files can appear in several directories through links, so deletion needs reference counts (hard links) or leaves dangling links (soft links). **General graph:** cycles are allowed, so traversal can loop, and a file can be unreachable but still counted, which needs garbage collection. UNIX forbids hard links to directories so the directory structure stays **acyclic**: `..` stays well defined, tools like `find` cannot loop, and link counts reach 0 correctly.

---

**F19 (theory).** An append writes a data block, the inode and the data bitmap. For each case where exactly one or exactly two of these writes reach disk before a crash, say whether the file system is consistent and what the user sees.

*Solution.* **Data only:** consistent; the append is simply lost. **Inode only:** inconsistent (the inode points to a block the bitmap says is free), and the file reads garbage. **Bitmap only:** inconsistent, with a **space leak** (the block is used but nothing points to it). **Inode and bitmap:** metadata consistent, but the file contains **garbage**. **Inode and data:** inconsistent with the bitmap (the block could later be given to another file). **Bitmap and data:** space leak, and the data is unreachable.

---

**F20 (theory).** Explain how journaling recovers from a crash. What is the commit point? How does metadata (ordered) journaling differ from data journaling, and why must the data block be written first?

*Solution.* (1) **Journal write:** write TxBegin plus the new inode, bitmap (and data) blocks to the log. (2) **Commit:** write TxEnd. Once TxEnd is on disk, the transaction is **committed**: this is the commit point. (3) **Checkpoint:** write the blocks to their real locations. (4) **Free** the journal space. On recovery, replay every committed transaction and discard incomplete ones, so each update happens fully or not at all. **Data journaling** logs the user data too, so data is written twice. **Metadata journaling** logs only the inode and bitmap, and writes the data block to its final location **before** the commit. Otherwise a committed inode could point to a block still holding old garbage. Compared with fsck, recovery only reads the journal, not the whole disk.

---

**F21 (theory).** Give the three access methods, with one example where each is natural, and show how direct access is done with UNIX system calls.

*Solution.* **Sequential:** read the next record in order, for example an editor loading a file or a compiler reading source. **Direct (random):** jump to block or record n, for example a database looking up a row. **Indexed:** look up a key in an index, then access the block directly, for example a sorted product file. In UNIX, direct access is `lseek(fd, n * recsize, SEEK_SET)` followed by `read(fd, buf, recsize)`.
