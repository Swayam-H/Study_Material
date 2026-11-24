# Study Material

A study app for my course notes: lecture-by-lecture reading, a practice problem bank with hidden solutions, a formula bank, search across everything, progress tracking, and properly rendered math. It installs as an app and works offline.

Live at **https://swayam-h.github.io/Study_Material/**. The site is built into `docs/`, and GitHub Pages serves a copy of that folder from the `gh-pages` branch. You can also open `docs/index.html` directly in a browser, with no server needed.

## Courses

- **Probability and Statistics** (MA6.101, Monsoon 2026)
- **Operating Systems and Networks** (CS3.301, Monsoon 2026)
- **Algorithm Analysis and Design** (AAD, Monsoon 2026)

## Editing notes or adding a course

Notes are Markdown files with LaTeX math (`$...$` inline, `$$...$$` display) under `content/`.

1. To edit a note, change its `.md` file in `content/<course>/`.
2. Courses that aren't added yet are listed under `upcoming` in `content/site.json` and show as "Coming soon" cards on the home page. When you add one, delete it from that list.
3. To add a course, create `content/<course-slug>/course.json` (copy `content/pns/course.json`) and put the Markdown files next to it. Every `# Heading` becomes its own page; `##` and `###` headings become the page outline and search entries.
4. Rebuild and deploy:

```
npm install
npm run deploy
```

## What the build finds automatically

- **Practice problems**: paragraphs that start with a bold label like `**B3 (last year's HW 1 Q2).**` or `**T4.**`, or a `### Problem 2 [HW 11 Q3]` heading, followed by a `*Solution.*` paragraph or an `### Answers` section. Solutions are collapsed on the page and collected into the course's practice page.
- **Formula bank**: every display formula that uses `\boxed{...}` outside a solution.

Progress, saved sections and settings are stored in the browser on each device.
