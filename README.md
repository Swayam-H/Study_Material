# Study Material

A study app for my course notes: lecture-by-lecture reading, a practice problem bank with hidden solutions, a formula bank, search across everything, progress tracking, and properly rendered math. It installs as an app and works offline.

The site lives in `docs/` and is served by GitHub Pages. You can also open `docs/index.html` directly in a browser, with no server needed.

## Courses

- **Probability and Statistics** (MA6.101, Monsoon 2026)

## Editing notes or adding a course

Notes are Markdown files with LaTeX math (`$...$` inline, `$$...$$` display) under `content/`.

1. To edit a note, change its `.md` file in `content/<course>/`.
2. To add a course, create `content/<course-slug>/course.json` (copy `content/pns/course.json`) and put the Markdown files next to it. Every `# Heading` becomes its own page; `##` and `###` headings become the page outline and search entries.
3. Rebuild and push:

```
npm install
node build.mjs
git add -A && git commit -m "Update notes" && git push
```

## What the build finds automatically

- **Practice problems**: paragraphs that start with a bold label like `**B3 (last year's HW 1 Q2).**` or `**T4.**`, or a `### Problem 2 [HW 11 Q3]` heading, followed by a `*Solution.*` paragraph or an `### Answers` section. Solutions are collapsed on the page and collected into the course's practice page.
- **Formula bank**: every display formula that uses `\boxed{...}` outside a solution.

Progress, saved sections and settings are stored in the browser on each device.
