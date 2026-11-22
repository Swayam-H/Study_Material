# Learn: Database concepts and architecture

These are Elmasri chapters 1 and 2. They are on the endsem syllabus ("Database: Chapter 1 & 2", "Data Models: Chapter 2 & 3") with exercises 1.1–1.3, 1.8–1.12, 2.1–2.5 and 2.14. Expect short definition and "discuss" questions here, and questions on the **UNIVERSITY database of Figure 1.2**. Marks come from using the right term *and* giving a concrete example. A definition with no example is a B at best.

## The vocabulary (Elmasri 1.1)

- **Data**: known facts that can be recorded and that have meaning. For example, "student 17 is Smith".
- **Database**: a collection of related data. It represents some part of the real world (the **miniworld**), it is logically coherent, and it is built for a specific purpose and group of users.
- **DBMS** (database management system): general-purpose software for **defining**, **constructing**, **manipulating** and **sharing** databases among many users and applications. It also **protects** the database (from crashes and from unauthorised access) and **maintains** it as requirements change over the years.
- **Database system**: the database plus the DBMS software (and often the application programs).
- **Catalog** (data dictionary): the place where the DBMS stores the full definition of the database: every file's structure, the type and format of each data item, and the constraints. What the catalog holds is called **meta-data**, which means "data about the data".

The four actions:

| Action | What it means | Example on Figure 1.2 |
| --- | --- | --- |
| Defining | Declaring the data types, structures and constraints; stored in the catalog | STUDENT has Name (string), Student_number (integer), Class (1–5), Major (department code) |
| Constructing | Storing the data itself on storage the DBMS controls | Inserting the rows for Smith and Brown |
| Manipulating | Querying, updating and reporting | "List Smith's transcript"; "change Smith's class to 2" |
| Sharing | Many users and programs using the database at the same time | The registrar and an advisor both read GRADE_REPORT at the same time |

## The UNIVERSITY database (Figure 1.2)

Most chapter 1 and 2 exercises are about this database. Learn its five files by heart:

| File | Columns | Rows in the figure |
| --- | --- | --- |
| STUDENT | Name, Student_number, Class, Major | Smith 17 1 CS; Brown 8 2 CS |
| COURSE | Course_name, Course_number, Credit_hours, Department | Intro to Computer Science CS1310 4 CS; Data Structures CS3320 4 CS; Discrete Mathematics MATH2410 3 MATH; Database CS3380 3 CS |
| SECTION | Section_identifier, Course_number, Semester, Year, Instructor | 85 MATH2410 Fall 07 King; 92 CS1310 Fall 07 Anderson; 102 CS3320 Spring 08 Knuth; 112 MATH2410 Fall 08 Chang; 119 CS1310 Fall 08 Anderson; 135 CS3380 Fall 08 Stone |
| GRADE_REPORT | Student_number, Section_identifier, Grade | 17 112 B; 17 119 C; 8 85 A; 8 92 A; 8 102 B; 8 135 A |
| PREREQUISITE | Course_number, Prerequisite_number | CS3380 CS3320; CS3380 MATH2410; CS3320 CS1310 |

How the files are linked: SECTION.Course_number refers to COURSE. GRADE_REPORT.Student_number refers to STUDENT. GRADE_REPORT.Section_identifier refers to SECTION. Both columns of PREREQUISITE refer to COURSE (a course and the course it requires). STUDENT.Major and COURSE.Department hold department codes.

## Database approach versus file processing (Elmasri 1.3)

In **traditional file processing**, each application owns its own files, and their structure is written into the program. The grades office and the accounts office each keep their own copy of student names. The **database approach** keeps one repository that is defined once and used by everyone. Four characteristics make the difference:

1. **Self-describing.** The database holds its own definition in the catalog. A general DBMS reads the catalog to learn the structure, so one DBMS works for any database. A file-processing program instead has the record layout written into its own code.
2. **Insulation between programs and data.** Changing the storage structure does not require changing programs (**program–data independence**). In object systems, an operation's interface is separate from its implementation (**program–operation independence**). Both rest on **data abstraction**: users see a conceptual representation, not storage details.
3. **Multiple views.** Each user group can see a different **view** (a subset of the data, or data derived from it). For example, a TRANSCRIPT view per student, or a PREREQUISITES view per course.
4. **Sharing and multiuser transaction processing.** **Concurrency control** stops two clerks from selling the same seat. A **transaction** is an executing program that accesses the database. It must be **isolated** (it behaves as if it ran alone) and **atomic** (all of it happens or none of it).

## Who is involved (Elmasri 1.4, 1.5)

- **DBA**: authorises access, coordinates and monitors use, acquires resources, and is responsible for security and performance problems.
- **Database designers**: find out what data to store and choose structures and constraints. They talk to every user group and combine their views.
- **End users**:
  - **Casual** users query occasionally (managers).
  - **Naive or parametric** users run **canned transactions** over and over (bank tellers, reservation clerks). A canned transaction is a standard, pre-programmed and tested transaction.
  - **Sophisticated** users write complex requests (engineers, analysts).
  - **Standalone** users keep personal databases using ready-made packages.
- **System analysts** work out end users' requirements and specify canned transactions. **Application programmers** implement them.
- **Behind the scenes**: DBMS designers and implementers, tool developers, and operators and maintenance staff.

## Advantages of a DBMS (Elmasri 1.6)

1. **Controlling redundancy.** Data is stored once, so there is no duplicated effort, no wasted space and no inconsistency. Where some redundancy is kept on purpose for speed, it is **controlled**: the DBMS keeps the copies consistent. Example: storing Student_name in GRADE_REPORT for speed, with the DBMS checking that it matches STUDENT.
2. **Restricting unauthorised access** through accounts and privileges (a security subsystem).
3. **Persistent storage** for program objects. An object survives the program that created it.
4. **Storage structures and search techniques** for efficient queries, such as indexes, buffering and query optimisation.
5. **Backup and recovery** after hardware or software failures.
6. **Multiple user interfaces**: query languages, programming interfaces, forms, menus and apps.
7. **Complex relationships** among data, represented and retrieved efficiently.
8. **Integrity constraints**: data types, uniqueness (keys), referential integrity, and business rules.
9. **Inferencing and actions**: deductive rules, **triggers**, stored procedures.
10. Also: enforced standards, shorter development time, flexibility, up-to-date information for everyone, and economies of scale.

**When not to use a DBMS (1.8):** a simple, well-defined application that is not expected to change; strict real-time needs that the DBMS overhead would break; embedded systems with little storage; or no need for multi-user access.

## Data models, schemas and states (Elmasri 2.1)

A **data model** is a set of concepts for describing a database's structure (data types, relationships, constraints). Most data models also include basic **operations** for retrieval and update. Data models fall into these categories:

| Category | Level | Examples |
| --- | --- | --- |
| High-level (conceptual) | Close to how users see data: entities, attributes, relationships | ER, EER |
| Representational (implementation) | Understood by users, but close to how data is stored | Relational, network, hierarchical, object |
| Low-level (physical) | How data is stored: record formats, orderings, access paths (indexes) | Storage structures |
| Self-describing | Data and its description are stored together | XML, key–value (NoSQL) |

The three models named in 2.2: **relational** (data as tables of rows; declarative queries), **object** (classes with attributes *and* operations, inheritance, object identity), and **XML** (hierarchical tree of tagged elements; schema and data mixed).

- The **database schema** (intension) is the *description* of the database. It is fixed at design time and changes rarely (**schema evolution**). A **schema diagram** shows each record type and its data items. One record type, such as STUDENT, is a **schema construct**.
- The **database state** (snapshot, instance, extension) is the data in the database at one moment. It changes with every update. A **valid state** satisfies everything in the schema. The empty state comes first, then the initial state after loading, then every later state.

## Three-schema architecture and data independence (Elmasri 2.2)

The three-schema architecture has three levels. Each level has its own schema:

1. **Internal level** with the **internal schema**: physical storage structures and access paths. It is written in a physical data model.
2. **Conceptual level** with the **conceptual schema**: the structure of the whole database for the whole community of users. It covers entities, data types, relationships, operations and constraints, and hides storage details. It is usually written in a representational model, such as relational tables.
3. **External level** with the **external schemas** (user views): each describes the part of the database one user group needs and hides the rest.

**Mappings** are needed because only the internal level actually exists on disk. A user's request on an external schema must be turned into a request on the conceptual schema, and that into a request on the internal schema. Results must be turned back the same way (for example, stored data reformatted into the user's view). The mappings are also what make data independence possible: when one level changes, only a mapping changes.

**Data independence** is the ability to change the schema at one level without changing the schema at the next higher level:

- **Logical**: change the conceptual schema (add a record type or data item, remove one, change a constraint) without changing external schemas or application programs. Example: adding a Birth_date column to STUDENT leaves the TRANSCRIPT view unchanged.
- **Physical**: change the internal schema (reorganise files, add an index, move to other disks) without changing the conceptual schema. Example: adding an index on SECTION(Semester, Year) speeds a query and changes nothing users see.

**Logical is harder**, because application programs depend directly on the logical structure (names, columns, relationships) that they read. Physical changes are hidden from programs completely. Logical changes, by contrast, must be absorbed by rewriting the external-to-conceptual mappings, and that is not always possible: a removed item cannot appear in a view.

[![Three-schema architecture](fig/dna-24-three-schema.svg)](../../assets/fig/dna-24-three-schema.svg)

## Languages and interfaces (Elmasri 2.3)

| Term | Meaning |
| --- | --- |
| **DDL** (data definition language) | Defines the conceptual schema, and both conceptual and internal schemas in DBMSs with no separate SDL |
| **SDL** (storage definition language) | Defines the internal schema. Today this is done with parameters and specifications, not a language |
| **VDL** (view definition language) | Defines external schemas. In SQL, views are defined with DDL (CREATE VIEW) |
| **DML** (data manipulation language) | Retrieve, insert, delete and modify data |
| High-level / **nonprocedural** DML | Says *what* to retrieve; set-at-a-time (SQL). Also called **declarative** |
| Low-level / **procedural** DML | Says *how*; record-at-a-time, embedded in a program with loops |
| **Query language** | A high-level DML used on its own, interactively |
| **Host language** | The general-purpose programming language (C, Java) in which DML statements are embedded |
| **Data sublanguage** | The DML embedded in a host language |

SQL is all of DDL, VDL and DML in one language.

**Interfaces**: menu-based (including web browsing), apps for mobile devices, forms, graphical (diagram-based), natural-language and keyword search, speech input and output, interfaces for parametric users (a few keys for canned transactions), and DBA interfaces (privileged commands).

## The DBMS environment and utilities (Elmasri 2.4)

A DBMS has these modules:
- DDL compiler, which writes schema definitions into the catalog.
- Query compiler and **query optimiser**.
- Precompiler, which pulls DML out of host-language programs.
- **Runtime database processor**.
- Stored data manager, which controls disk access.
- **Concurrency control** and **backup and recovery** subsystems.

**Database utilities** help the DBA: loading (from files into the database, with format conversion), backup (dump), storage reorganisation, and performance monitoring. Related tools include CASE tools for design, the data dictionary or repository, application development environments and communication software.

## Centralised and client/server architectures (Elmasri 2.5)

- **Centralised**: all DBMS functions, applications and interfaces run on one machine, used through terminals.
- **Basic client/server**: specialised servers (file, print, web, DBMS) serve client machines over a network. A **client** is a user machine with interfaces and local processing. A **server** has the hardware and software that provide services to clients.
- **Two-tier**: the client runs the user interface and the application programs. The server is the database (query and transaction) server. They talk through an API such as **ODBC** or **JDBC**. It is simple and works with existing systems, but each client holds application logic and connects to the database directly.
- **Three-tier** (web): client (browser, GUI), **application server or web server** (business rules, application programs, checking credentials), and database server. The middle tier also improves **security**, because clients never reach the database directly.
- **n-tier**: the application layer is split further, for example into a presentation (web) tier, a business-logic tier and a data-access tier, and spread over many machines. Each tier can be scaled, run in parallel and replaced on its own. Communication between tiers is often **encrypted**.

[![Three-tier architecture](fig/dna-214-three-tier.svg)](../../assets/fig/dna-214-three-tier.svg)

## Classifying DBMSs (Elmasri 2.6)

DBMSs are classified by:
- **data model**: relational, object, object-relational, NoSQL (key–value, document, column, graph), XML, legacy (network, hierarchical);
- **number of users**: single-user or multiuser;
- **number of sites**: centralised or distributed (homogeneous, heterogeneous, federated);
- **cost**;
- **purpose**: general-purpose or special-purpose (for example, airline reservations as an OLTP system).

# Reference: Database concepts and architecture

## Definitions to know cold (1.1, 2.1)

| Term | One-line definition |
| --- | --- |
| Data | Recorded facts with meaning |
| Database | Collection of related data about a miniworld, for a purpose |
| DBMS | Software to define, construct, manipulate and share databases |
| Database system | Database + DBMS |
| Catalog / meta-data | The stored definition of the database / data about data |
| Program–data independence | Storage structure can change without changing programs |
| User view | Subset or derived data seen by one user group |
| DBA | Person who authorises access, coordinates use, manages resources |
| End user | Person whose job needs access to the database |
| Canned transaction | Standard, pre-programmed transaction run repeatedly by parametric users |
| Deductive database system | Stores rules and infers new facts from the stored ones |
| Persistent object | Object that outlives the program that created it |
| Transaction-processing application | Many concurrent users running small transactions (banking, reservations) |
| Data model | Concepts for describing structure, relationships, constraints (and operations) |
| Schema / state | Description (rarely changes) / data at a moment (changes often) |
| Internal / conceptual / external schema | Storage / whole-database structure / one group's view |
| Data independence | Change one level's schema without changing the next higher one |
| DDL, SDL, VDL, DML | Define conceptual, storage, views; manipulate data |
| Query language / host language / data sublanguage | Standalone high-level DML / C or Java / DML embedded in the host |
| Database utility | DBA tool: load, backup, reorganise, monitor |
| Client/server; 3-tier; n-tier | Clients use servers over a network; client + app server + DB server; app tier split further |

## Lists to know

- **DBMS actions**: define, construct, manipulate, share (plus protect, maintain).
- **Database approach characteristics**: self-describing; program–data insulation and data abstraction; multiple views; sharing and multiuser transactions.
- **Advantages**: controlled redundancy, access control, persistence, efficient storage and search, backup and recovery, multiple interfaces, complex relationships, integrity constraints, inference and triggers.
- **Data-model categories**: conceptual, representational, physical, self-describing.
- **Independence**: logical (conceptual change) is harder than physical (internal change).

## What to be able to do without notes

1. Define any 1.1 or 2.1 term with an example from Figure 1.2.
2. Contrast file processing and the database approach under the four characteristics.
3. Draw the three-schema diagram and explain the mappings.
4. Explain logical and physical independence with one example each, and say why logical is harder.
5. Choose an architecture for a web application and argue for it (2.14).
6. On Figure 1.2: list relationships, views, constraints, informal queries and updates.

# Practice: Database concepts and architecture

These are the chapter 1 and 2 exercises on Kamal's list. Each answer is written as it should appear on the script: **assumptions** (when the question leaves something open), the **answer** in numbered points with an example each, and a **final answer** where there is one to state. The *Examiner's notes* are for you.

## A. Chapter 1

### Problem 1 [Concepts · Concept · 6 pts · Elmasri 1.1]

Define: data, database, DBMS, database system, database catalog, program-data independence, user view, DBA, end user, canned transaction, deductive database system, persistent object, meta-data, transaction-processing application.

*Solution.*

**Answer.** Examples use the UNIVERSITY database of Figure 1.2.

1. **Data**: known facts that can be recorded and have an implicit meaning. Example: (Smith, 17, 1, CS).
2. **Database**: a logically coherent collection of related data that represents a miniworld and is built for a specific purpose. Example: the five UNIVERSITY files.
3. **DBMS**: general-purpose software that lets users define, construct, manipulate and share databases, and that protects and maintains them. Example: PostgreSQL or MySQL.
4. **Database system**: the database together with the DBMS software.
5. **Database catalog**: the part of the system where the DBMS stores the complete definition of each file (record structures, data types, constraints). Example: the entry saying STUDENT.Class is an integer from 1 to 5.
6. **Program–data independence**: the storage structure of the data can change without changing the programs that access it, because the structure is in the catalog, not in the programs. Example: adding a Birth_date field to STUDENT records does not break a program that prints names.
7. **User view**: a subset of the database, or virtual data derived from it, that one user group needs. Example: the TRANSCRIPT view, which lists each student's courses and grades.
8. **DBA** (database administrator): the person responsible for authorising access, coordinating and monitoring use, acquiring hardware and software, and handling security and performance problems.
9. **End user**: a person whose job needs access to the database for querying, updating or reports. Example: an advisor looking up grades.
10. **Canned transaction**: a standard, pre-programmed and tested transaction that parametric users run repeatedly. Example: "register student s in section x".
11. **Deductive database system**: a DBMS that stores rules as well as facts and can infer new facts. Example: from a rule "a student on probation has GPA below 2", it deduces which students are on probation.
12. **Persistent object**: a program object that survives after the program that created it ends, and can be read again later. Example: a Java Student object stored in an object database.
13. **Meta-data**: data about the data; the database definition stored in the catalog.
14. **Transaction-processing application**: an application in which many users run short transactions concurrently, which the DBMS must keep isolated and atomic. Example: course registration during the add/drop window.

> **Examiner's note.** The common loss is giving a definition with no example, or mixing up "database" (the data) and "DBMS" (the software). Keep "catalog" (where) apart from "meta-data" (what is stored there).

### Problem 2 [Concepts · Concept · 4 pts · Elmasri 1.2]

What four main types of actions involve databases? Briefly discuss each.

*Solution.*

**Assumption.**
1. "Actions" means the processes a DBMS supports on a database, as in Elmasri 1.1. *(Reason: this is the textbook's own list of four.)*

**Answer.**
1. **Defining**: specifying the data types, structures and constraints of the data. The definition is stored in the catalog as meta-data. Example: declaring that SECTION has Section_identifier, Course_number, Semester, Year and Instructor, and that Course_number must exist in COURSE.
2. **Constructing**: storing the data itself on storage that the DBMS controls. Example: loading the six SECTION rows.
3. **Manipulating**: querying to retrieve data, updating to reflect changes in the miniworld, and generating reports. Example: "list the sections Anderson taught in 2008"; "record a grade of B for Smith in section 112".
4. **Sharing**: letting many users and programs access the database at the same time while keeping it consistent. Example: two advisors reading GRADE_REPORT while the registrar updates it.

**Also part of a DBMS's job**: **protecting** the database (from hardware or software crashes, and from unauthorised access) and **maintaining** it over a life cycle of many years as requirements change.

> **Examiner's note.** Naming the four without a sentence and an example each is a B. Mentioning protection and maintenance shows you know the full list.

### Problem 3 [Concepts · Concept · 6 pts · Elmasri 1.3]

Discuss the main characteristics of the database approach and how it differs from traditional file systems.

*Solution.*

**Answer.** In traditional file processing, each user group defines and implements its own files for its own programs. For example, the grades office keeps a file of student names and grades, and the accounts office keeps its own file of student names and fees. The database approach keeps a single repository, defined once and used by all. It differs in four ways:

1. **Self-describing nature.** A database system holds the database *and* its complete definition (the catalog). The DBMS reads the catalog to learn the structure of any database, so one general-purpose DBMS serves many applications. In file processing, the record layout is written inside each program, so each program works only with its own file.
2. **Insulation between programs and data, and data abstraction.** Because the structure is in the catalog, changing the storage (for example, adding a field) does not require changing the programs that do not use the change. This is **program–data independence**. In object databases, an operation's interface is separate from its implementation (**program–operation independence**). Users see a conceptual representation, not storage details (data abstraction). In file processing, changing a record layout means changing every program that reads the file.
3. **Support for multiple views.** Different users see different views of the same data. One student sees only their own TRANSCRIPT; the course office sees PREREQUISITES. In file processing, each "view" is a separate file that must be kept in step by hand.
4. **Sharing of data and multiuser transaction processing.** Many users access the data at once. **Concurrency control** keeps it correct: two clerks cannot assign the same seat. **Transactions** are isolated and atomic, and recovery undoes failed ones. File systems give no such guarantees.

**The result of these differences**: file processing causes **redundancy**, which means duplicated storage and effort, and **inconsistency** when one copy is updated and another is not. The database approach removes or controls these problems.

> **Examiner's note.** List the four characteristics by name, then contrast each with files. Answers that only list DBMS advantages (backup, security) without the four characteristics usually get a B.

### Problem 4 [Concepts · Application · 4 pts · Elmasri 1.8]

Identify some informal queries and update operations that you would expect to apply to the database in Figure 1.2.

*Solution.*

**Assumptions.**
1. "Informal" means stated in English, not in a query language. *(Reason: chapter 1 comes before any query language.)*
2. Updates may add, change or remove records in any of the five files. *(Reason: "update operations" in Elmasri means insert, delete and modify.)*

**Informal queries.**
1. Retrieve the transcript of Smith: each course, section, semester, year and grade. (Uses STUDENT, GRADE_REPORT, SECTION, COURSE.)
2. List the prerequisites of the Database course, CS3380. (Uses PREREQUISITE and COURSE.) Answer: CS3320 and MATH2410.
3. List the names of students who took the section of Database offered in Fall 2008, with their grades. (Answer: Brown, A.)
4. List the sections Anderson taught, with semester and year. (Answer: 92, Fall 07; 119, Fall 08.)
5. Which courses does the CS department offer, and how many credit hours does each have?

**Update operations.**
1. Change the class of Smith to sophomore (Class = 2).
2. Create a new section for the Database course in this semester, taught by a named instructor.
3. Enter a grade of A for Smith in the new Database section.
4. Add a new course, or a new prerequisite pair, for example CS3380 requires CS1310.
5. Delete the record of a student who has left, which also requires dealing with that student's GRADE_REPORT records.

> **Examiner's note.** Name the files each query touches. That shows you understand how the files are linked, which is the point of the exercise. Update 5 is worth noting because it is the start of referential integrity, which Chapter 1 covers.

### Problem 5 [Concepts · Concept · 4 pts · Elmasri 1.9]

What is the difference between controlled and uncontrolled redundancy? Illustrate with examples.

*Solution.*

**Answer.**
1. **Redundancy** means storing the same fact more than once.
2. **Uncontrolled redundancy** happens when separate files or applications each keep their own copy and nothing keeps them consistent. Example: the grades office and the accounts office each store a student's name and major in their own file. It causes three problems:
   1. **Duplicated effort**: every change, such as a student changing major, must be entered in every file.
   2. **Wasted storage**.
   3. **Inconsistency**: if one file is updated and another is not, the database contradicts itself. For example, GRADE_REPORT might show Student_number 17 with name "Brown" while STUDENT says 17 is Smith.
3. **Controlled redundancy** is redundancy the designer keeps *on purpose*, usually to make frequent queries faster, while the **DBMS enforces consistency** between the copies. Example: GRADE_REPORT also stores Student_name and Course_number to avoid joins when printing transcripts. The DBMS checks that every (Student_number, Student_name) pair in GRADE_REPORT matches STUDENT, and rejects any insert that disagrees.

**Final answer.** Both store the same data more than once. Uncontrolled redundancy is unplanned and unchecked, so it causes inconsistency. Controlled redundancy is planned for performance, and the DBMS keeps the copies consistent.

> **Examiner's note.** The key words are "on purpose" and "the DBMS enforces consistency". Ideally, each fact is stored once (this is what normalisation later formalises), so name a reason, such as performance, for keeping a copy.

### Problem 6 [Concepts · Application · 4 pts · Elmasri 1.10]

Specify all the relationships among the records of the database in Figure 1.2.

*Solution.*

**Assumptions.**
1. A relationship exists where a column of one file holds values that identify a record of another file. *(Reason: the figure shows no explicit links, so relationships must be read from shared values.)*
2. STUDENT.Major and COURSE.Department refer to a department, but there is no DEPARTMENT file. *(Reason: no such file is shown, so these are not relationships between the records in the figure, though they would be if a DEPARTMENT file were added.)*

**Relationships.**
1. **SECTION to COURSE**: each SECTION record is a section *of* one COURSE, through SECTION.Course_number = COURSE.Course_number. One course has many sections (1:N). Example: sections 92 and 119 are both of CS1310.
2. **GRADE_REPORT to STUDENT**: each GRADE_REPORT record belongs to one STUDENT, through Student_number. One student has many grade records (1:N).
3. **GRADE_REPORT to SECTION**: each GRADE_REPORT record is for one SECTION, through Section_identifier. One section has many grade records (1:N).
4. Together, 2 and 3 make GRADE_REPORT the record of an **M:N relationship between STUDENT and SECTION** ("student took section"), with Grade as its attribute.
5. **PREREQUISITE to COURSE, twice**: Course_number names the course that has the prerequisite, and Prerequisite_number names the course that is required. So PREREQUISITE records an **M:N recursive relationship from COURSE to itself**. Example: CS3380 requires CS3320 and MATH2410.
6. **Derived relationship**: STUDENT is related to COURSE through GRADE_REPORT and SECTION ("student took course"). This is not stored directly.

**Final answer.** The relationships are SECTION–COURSE (1:N), GRADE_REPORT–STUDENT and GRADE_REPORT–SECTION (1:N each, together making STUDENT–SECTION M:N with Grade), and PREREQUISITE as a recursive M:N relationship on COURSE (course, required course). STUDENT.Major and COURSE.Department refer to departments that are not stored in the figure.

> **Examiner's note.** The recursive PREREQUISITE relationship and the "M:N through GRADE_REPORT" reading are what separate an A from a B. Name the linking columns each time.

### Problem 7 [Concepts · Application · 4 pts · Elmasri 1.11]

Give some additional views that may be needed by other user groups for the database in Figure 1.2.

*Solution.*

**Assumption.**
1. A view may be a subset of the stored data or data derived from it, such as counts and averages. *(Reason: this is Elmasri's definition of a user view in 1.3.3.)*

**Views.** The book already gives TRANSCRIPT and COURSE_PREREQUISITES. Further views:
1. **Instructor's class list** (for instructors): for each section an instructor teaches, the students enrolled and their grades. It uses SECTION, GRADE_REPORT and STUDENT.
2. **Section offerings** (for the timetable office and students): for each semester and year, the sections offered, with course name, credit hours and instructor. It uses SECTION and COURSE.
3. **Grade distribution** (for department heads): for each section, the number of A, B, C and so on. This is derived data.
4. **Student GPA and credits** (for advisors and the registrar): for each student, the total credit hours completed and the grade point average. This is derived from GRADE_REPORT, SECTION and COURSE.
5. **Department course list** (for each department office): the courses of one department with their prerequisites.
6. **Instructor teaching load** (for administration): for each instructor and semester, the number of sections and credit hours taught.

> **Examiner's note.** For each view, say who uses it and which files it comes from. Derived views, like GPA, show that a view need not be stored.

### Problem 8 [Concepts · Application · 4 pts · Elmasri 1.12]

Cite some examples of integrity constraints that you think can apply to the database in Figure 1.2.

*Solution.*

**Assumptions.**
1. Class codes 1 to 5 mean freshman to graduate student. *(Reason: this is the coding Elmasri gives with Figure 1.2.)*
2. Grades are letters A, B, C, D, F (or I). *(Reason: only letters appear in the figure.)*

**Integrity constraints.**
1. **Key (uniqueness)**: Student_number is unique in STUDENT; Course_number in COURSE; Section_identifier in SECTION; (Student_number, Section_identifier) in GRADE_REPORT; (Course_number, Prerequisite_number) in PREREQUISITE.
2. **Not null**: a key value must be given. For example, no SECTION without a Section_identifier.
3. **Domain**: Class ∈ {1, 2, 3, 4, 5}; Grade ∈ {A, B, C, D, F, I}; Credit_hours a small positive integer; Semester ∈ {Fall, Spring, Summer}; Year a valid year.
4. **Referential**: every SECTION.Course_number must exist in COURSE; GRADE_REPORT.Student_number must exist in STUDENT; GRADE_REPORT.Section_identifier must exist in SECTION; both PREREQUISITE columns must exist in COURSE.
5. **Semantic (business rules)**:
   1. A course cannot be its own prerequisite, and prerequisites cannot form a cycle.
   2. The Course_number prefix matches the department (CS courses belong to CS).
   3. A student may receive a grade in a section only after completing that section's course's prerequisites.
   4. A student takes a course at most once in the same semester.

> **Examiner's note.** Group the constraints by kind (key, domain, referential, semantic). That matches Elmasri 5.2 and earns the A. Rules like the prerequisite check cannot be written as simple key or foreign-key constraints and need triggers or assertions. Saying so shows understanding.

## B. Chapter 2

### Problem 9 [Concepts · Concept · 6 pts · Elmasri 2.1]

Define: data model, database schema, database state, internal schema, conceptual schema, external schema, data independence, DDL, DML, SDL, VDL, query language, host language, data sublanguage, database utility, catalog, client/server architecture, three-tier architecture, n-tier architecture.

*Solution.*

**Answer.** Examples use Figure 1.2.

1. **Data model**: a collection of concepts for describing the structure of a database (data types, relationships, constraints). Most models also include basic retrieval and update operations. Example: the relational model.
2. **Database schema**: the description of the database, given at design time and rarely changed. Example: STUDENT(Name, Student_number, Class, Major).
3. **Database state**: the data in the database at a particular moment; also called a snapshot or the current set of instances. Example: the two STUDENT rows now stored.
4. **Internal schema**: describes the physical storage structure and access paths. Example: STUDENT stored as a file sorted on Student_number, with an index on Name.
5. **Conceptual schema**: describes the structure of the whole database for all users (entities, types, relationships, constraints), hiding storage. Example: the five relations with their keys and foreign keys.
6. **External schema**: describes the part of the database that one user group needs, hiding the rest. Example: the TRANSCRIPT view.
7. **Data independence**: the ability to change the schema at one level without changing the schema at the next higher level. It can be logical or physical.
8. **DDL**: the language for defining the conceptual schema (and the internal schema too, when there is no separate SDL). Example: CREATE TABLE.
9. **DML**: the language for retrieving, inserting, deleting and modifying data. Example: SELECT, INSERT.
10. **SDL**: the language for specifying the internal schema. In modern DBMSs it is replaced by storage parameters, such as index and file options.
11. **VDL**: the language for specifying user views and their mapping to the conceptual schema. In SQL this is CREATE VIEW, part of the DDL.
12. **Query language**: a high-level DML used on its own, interactively. Example: SQL typed at a prompt.
13. **Host language**: a general-purpose programming language in which DML statements are embedded. Example: C or Java.
14. **Data sublanguage**: the DML when it is embedded in a host-language program. Example: embedded SQL in C.
15. **Database utility**: a program that helps the DBA manage the database: loading, backup, file reorganisation and performance monitoring.
16. **Catalog**: the stored definitions of the schemas (all three levels and the mappings), plus other information, such as users and statistics, that the DBMS modules use.
17. **Client/server architecture**: a system where **client** machines, which run user interfaces and local applications, use specialised **server** machines (file, print, web or database servers) over a network.
18. **Three-tier architecture**: client (GUI or browser), **application server** (business rules, application programs) and **database server**. The middle tier sits between the user and the data.
19. **n-tier architecture**: the three-tier architecture with the application tier split into more tiers, such as presentation, business logic and data access, which can be placed on separate machines.

> **Examiner's note.** Keep the schema versus state pair, and the three levels, exact. They come back in 2.3 and 2.4. "Data independence" needs both kinds named for the A.

### Problem 10 [Concepts · Concept · 5 pts · Elmasri 2.2]

Discuss the main categories of data models. What are the basic differences among the relational model, the object model, and the XML model?

*Solution.*

**Answer.**

**Categories, by how close the concepts are to the user.**
1. **High-level or conceptual models**: use concepts close to how users see data: entities (Student), attributes (Name) and relationships (takes). Example: the ER and EER models.
2. **Representational or implementation models**: users can understand them, but they are close to how data is stored, so DBMSs implement them directly. Examples: the relational model, and the legacy network and hierarchical models. Object models are sometimes placed here.
3. **Low-level or physical models**: describe how data is stored: record formats, record orderings and **access paths** (structures, such as an index, that make search fast).
4. **Self-describing models**: the description of the data is stored with the data itself. Examples: XML, and the key–value and document models of NoSQL systems.

**Relational, object and XML models compared.**

| | Relational | Object | XML |
| --- | --- | --- | --- |
| Structure | Flat tables of rows (relations of tuples) with atomic values | Objects grouped into classes, with complex attributes and relationships | A tree of nested, tagged elements |
| Behaviour | No behaviour stored; queries are external (SQL) | Classes define **operations** (methods) as well as data | No behaviour; data only |
| Identity | By key values | Object identity (OID), independent of values | By position in the tree |
| Schema | Separate from the data (catalog) | Separate (class definitions) | Mixed with the data (tags); a schema is optional |
| Relationships | Foreign keys, combined with joins | References between objects, plus inheritance in class hierarchies | Nesting (parent–child) |

**Final answer.** The categories are conceptual, representational, physical and self-describing. The relational model stores flat tables linked by key values. The object model stores objects with operations, identity and inheritance. The XML model stores self-describing hierarchical trees with the schema mixed into the data.

> **Examiner's note.** The most-asked distinction is "the object model has operations and inheritance; XML is hierarchical and self-describing; relational is flat and uses keys". A table like this one scores well if every cell is right.

### Problem 11 [Concepts · Concept · 3 pts · Elmasri 2.3]

What is the difference between a database schema and a database state?

*Solution.*

**Answer.**
1. The **database schema** is the *description* of the database: its record types, data items and constraints. It is specified when the database is designed and is not expected to change often. Changing it is **schema evolution**. It is also called the **intension**.
2. The **database state** is the *actual data* in the database at a given moment: the current set of occurrences, or instances. It changes every time data is inserted, deleted or modified. It is also called the **snapshot** or the **extension**.
3. The DBMS stores the schema in the **catalog** and makes sure every state is a **valid state**, meaning it satisfies the structure and constraints of the schema. A database starts in the empty state, moves to an initial state when it is first loaded, and then passes through a new state with every update.

**Example.** The schema says STUDENT(Name, Student_number, Class, Major). The current state holds the two rows (Smith, 17, 1, CS) and (Brown, 8, 2, CS). Inserting a third student changes the state, not the schema.

**Final answer.** The schema is the description (intension), and it rarely changes. The state is the data at one time (extension), and it changes with every update. Every state must be valid with respect to the schema.

### Problem 12 [Concepts · Concept · 6 pts · Elmasri 2.4]

Describe the three-schema architecture. Why do we need mappings among schema levels? How do different schema definition languages support this architecture?

*Solution.*

**Answer.**

**Purpose.** The architecture separates user applications from the physical database. Each level hides the details of the level below it.

**The three levels.**
1. **Internal level**: the **internal schema** describes physical storage: files, record placement, indexes and other access paths. It uses a physical data model.
2. **Conceptual level**: the **conceptual schema** describes the structure of the whole database for the whole community of users: entities, data types, relationships, user operations and constraints. It hides storage details. It is usually written in a representational model, such as relational tables, often derived from a conceptual ER design.
3. **External or view level**: each **external schema** describes the part of the database that one user group is interested in, and hides the rest. There can be many external schemas.

**Diagram** (tap to enlarge).

[![Three-schema architecture](fig/dna-24-three-schema.svg)](../../assets/fig/dna-24-three-schema.svg)

**Why mappings are needed.**
1. Only the internal level actually exists in storage. The other two levels are descriptions. So when a user asks something in terms of an external schema, the DBMS must **transform the request** into one on the conceptual schema, and then into one on the internal schema, before it can process it against the stored data.
2. Retrieved data must be **reformatted** to match the user's external view. Example: the TRANSCRIPT view combines data stored in four files.
3. The mappings are what make **data independence** possible. When a lower-level schema changes, only the mapping to the level above changes, and the higher schema stays the same.
4. The cost is overhead at run time, which is why some DBMSs do not fully separate the three levels.

**How the definition languages support the levels.**
1. **SDL** (storage definition language) defines the **internal schema**. In current DBMSs it is replaced by storage parameters and commands, such as creating an index or choosing a file organisation.
2. **DDL** (data definition language) defines the **conceptual schema**. Where the DBMS has no strict separation of levels, the same DDL also defines the internal schema.
3. **VDL** (view definition language) defines the **external schemas** and their mappings to the conceptual schema. In relational DBMSs, SQL plays the role of VDL with CREATE VIEW.
4. The DBMS compiles these definitions and stores them, with the mappings, in the **catalog**. In SQL, one language serves as DDL, VDL and DML.

> **Examiner's note.** Three things are asked: describe, why mappings, which language. Answering only the first is a C even if the description is perfect. Draw the diagram.

### Problem 13 [Concepts · Concept · 5 pts · Elmasri 2.5]

What is the difference between logical data independence and physical data independence? Which one is harder to achieve? Why?

*Solution.*

**Answer.**
1. **Logical data independence** is the ability to change the **conceptual schema** without changing **external schemas** or application programs. Examples of such changes are adding a record type or data item, removing one, or changing a constraint. When the conceptual schema changes, only the view definitions and the external/conceptual mappings change. Example: adding a Birth_date column to STUDENT, or splitting COURSE into two tables, while the TRANSCRIPT view still shows the same columns.
2. **Physical data independence** is the ability to change the **internal schema** without changing the conceptual schema. Examples of such changes are reorganising files, adding an access path, or moving to new storage devices. Only the conceptual/internal mapping changes. Example: adding an index on SECTION(Semester, Year) to make "sections in Fall 08" faster. Every query still gets the same answers.
3. **Which is harder: logical.**
   1. Physical changes affect only *how* data is stored. Programs never refer to storage structures, so the DBMS can hide those changes completely. That is why physical independence exists in most DBMSs.
   2. Logical changes affect *what* data and structure exist. Application programs are written directly against the conceptual structure: record names, column names and relationships. So hiding a logical change requires the view mapping to rebuild the old structure from the new one, and that is not always possible. If a column a view uses is removed, no mapping can bring it back.

**Final answer.** Logical independence protects external schemas and programs from conceptual changes. Physical independence protects the conceptual schema from storage changes. Logical independence is harder, because programs depend on the logical structure they read, while storage details are hidden from them anyway.

> **Examiner's note.** Give one example of each and the reason. "Logical is harder because programs depend on the structure" is the expected reason. An answer that says which is harder with no reason earns at most a B.

### Problem 14 [Concepts · Application · 6 pts · Elmasri 2.14]

If you were designing a Web-based system to make airline reservations and sell airline tickets, which DBMS architecture would you choose from Section 2.5? Why? Why would the other architectures not be a good choice?

*Solution.*

**Assumptions.**
1. Customers use web browsers or mobile apps over the internet, and there are many of them at once. *(Reason: "Web-based" and "sell tickets" imply the public, not only airline staff.)*
2. Payments are taken, and seat inventory must stay correct under concurrent bookings. *(Reason: "sell tickets" means money and a shared, limited seat count.)*

**Choice: a three-tier architecture, extended to n-tier as the system grows.**
1. **Client tier**: the customer's browser or app shows forms and results. No business logic or database access is on the client.
2. **Application (web) server tier**: holds the business rules, such as fare rules, seat availability and payment processing. It checks the customer's credentials, accepts their requests, forms the database queries, and builds the web pages. The rules live in one place, so a fare change is made once.
3. **Database server tier**: holds flights, seats, bookings and payments. Its concurrency control and recovery stop two customers from booking the same seat and make sure an interrupted payment leaves no half-made booking.

**Diagram** (tap to enlarge).

[![Three-tier architecture](fig/dna-214-three-tier.svg)](../../assets/fig/dna-214-three-tier.svg)

**Why three-tier is right.**
1. **Security**: customers never connect to the database directly. Only the application server does, and only with the operations it allows, which matters for payment data.
2. **Scale**: many web or application servers can share the load in front of one database server.
3. **Thin clients**: a browser is enough, so nothing has to be installed.

**Why the others are poor choices.**
1. **Centralised**: all processing on one machine, reached through terminals. It cannot serve customers over the web and would not scale to many users.
2. **Basic client/server**: no defined place for the application logic, so either the client or the server carries all of it.
3. **Two-tier client/server**: the application logic runs on each client, which connects straight to the database through ODBC or JDBC.
   1. Every client would need the database driver and the airline's program installed.
   2. Business rules would be copied to every client, so changing them means updating every installation.
   3. Opening the database to the public internet is a security risk.
   4. Thousands of direct database connections would overload the server.
   It suits a few internal users, such as airline agents, not the public.

**Final answer.** Choose three-tier (or n-tier): browser, application/web server, database server. It keeps business rules and security in the middle tier and scales to many web users. Centralised and two-tier architectures expose the database or the application logic to clients and do not scale to web traffic.

> **Examiner's note.** Name the tiers and what each does in *this* application (seats, fares, payments), and give one concrete weakness for each rejected architecture.
