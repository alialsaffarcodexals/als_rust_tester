# RustPath — Piscine Rust Zone01 Learning Platform

A complete interactive learning platform for mastering Rust through the Zone01 Piscine Rust curriculum.

## Features

- **63 Exercises** from the Piscine Rust curriculum across 4 checkpoints
- **Interactive Code Editor** (Monaco — VS Code's editor) with Rust syntax highlighting
- **Live Execution** via Rust Playground API — compile and run Rust in the browser
- **Automated Tests** — submit your solution and get immediate feedback per test case
- **Rich Lessons** — concept explanations, language comparisons (C#, Java, Go, JavaScript, Python), guided examples
- **Checkpoint Exams** — timed exams testing your understanding
- **Progress Tracking** — streaks, time spent, per-lesson status persisted in localStorage
- **Dark Theme** — VS Code / GitHub Dark inspired

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── editor/      # Monaco code editor + output console
│   └── layout/      # Sidebar, header
├── data/
│   ├── chapter1.ts          # Chapter 1 intro content
│   ├── curriculum.ts        # Aggregator
│   ├── curriculum_part1.ts  # Exercises 1-31
│   └── curriculum_part2.ts  # Exercises 32-63
├── hooks/
│   ├── useProgress.ts       # Progress state management
│   └── useRustExecution.ts  # Rust Playground API integration
├── pages/
│   ├── Dashboard.tsx        # Main dashboard
│   ├── IntroPage.tsx        # Chapter 1 introduction
│   ├── LessonPage.tsx       # Individual exercise page
│   └── ExamPage.tsx         # Checkpoint exam
├── store/
│   └── progress.ts          # localStorage persistence
├── styles/
│   └── globals.css          # Dark theme design system
└── types/
    └── index.ts             # TypeScript types
```

## Architecture

- **Frontend**: Vite + React + TypeScript
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Rust Execution**: Rust Playground API (play.rust-lang.org) via Vite proxy
- **Progress Storage**: localStorage
- **Routing**: React Router v6
- **No backend required** — runs entirely in the browser

## Checkpoints

| Checkpoint | Exercises | Topics |
|-----------|-----------|--------|
| Chapter 1 | Intro | Install, cargo, variables, types, ownership basics |
| Checkpoint 1 | 1–19 | Types, arithmetic, strings, arrays, loops, HashMaps |
| Checkpoint 2 | 20–35 | Ownership, borrowing, structs, traits, iterators |
| Checkpoint 3 | 36–45 | Generics, enums, algorithms, complex systems |
| Final | 46–63 | Error handling, linear algebra, external crates |

## Running Tests

The "Submit" button sends your code to the Rust Playground API with automated test cases. The dev server must be running for the proxy to work.

## Git History

See `git log` for the full development history.
