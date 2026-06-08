# RustPath — Interactive Rust Learning Platform

A browser-based Rust learning platform built on the Zone01 Piscine Rust curriculum. It covers all 63 exercises across 4 checkpoints, with a Monaco code editor, live execution against the Rust Playground API, checkpoint exams, and progress tracking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Code editor | Monaco Editor |
| Code execution | Rust Playground API (`play.rust-lang.org`) |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Progress storage | `localStorage` |

---

## Prerequisites

- **Node.js** 18+ and **npm**
- Internet connection (code runs on the Rust Playground API — no local Rust toolchain needed)

---

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd "ALS_Rutst tester"

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on all `.ts` / `.tsx` files |

---

## Project Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── CodeEditor.tsx      # Monaco editor wrapper
│   │   └── Console.tsx         # stdout / stderr output panel
│   └── layout/
│       ├── Header.tsx          # Top navigation bar
│       └── Sidebar.tsx         # Exercise list & progress sidebar
├── data/
│   ├── curriculum_part1.ts     # Exercises 1–31 (Checkpoint 1 & 2)
│   ├── curriculum_part2.ts     # Exercises 32–63 (Checkpoint 3 & Final)
│   ├── curriculum.ts           # Aggregator — getAllExercises(), getExerciseById()
│   └── chapter1.ts             # Intro chapter content
├── hooks/
│   └── useRustExecution.ts     # Run / Submit logic against Playground API
├── pages/
│   ├── Dashboard.tsx           # Home screen with progress overview
│   ├── LessonPage.tsx          # Exercise view: concept, editor, test runner
│   ├── ExamPage.tsx            # Checkpoint exam (timed, scored)
│   └── IntroPage.tsx           # Intro chapter reader
├── store/
│   └── progressStore.ts        # localStorage-backed progress & streak tracking
├── types/
│   └── index.ts                # All shared TypeScript types
└── App.tsx                     # Routes & top-level layout
```

---

## Curriculum Overview

63 exercises across 4 checkpoints:

| Checkpoint | Exercises | Topics |
|---|---|---|
| Checkpoint 1 | 1–19 | Scalars, strings, ownership, borrowing, structs, closures, iterators, collections |
| Checkpoint 2 | 20–35 | Lifetimes, enums, pattern matching, Option, trait objects, error basics |
| Checkpoint 3 | 36–45 | Generics, traits, From/Into, custom iterators, nested structs |
| Final | 46–63 | Panic, Result, file I/O, `?` operator, DP algorithms, linear algebra, JSON, date arithmetic |

Each exercise includes:
- **Concept explanation** with comparisons to C#, Java, Go, JavaScript, and Python
- **Guided examples** with annotated code
- **Coding challenge** with starter code and hidden test cases
- **Hints** (unlockable) and a **full solution** (shown after passing)

---

## How Code Execution Works

1. User writes Rust code in the Monaco editor.
2. **Run** — executes the code as-is (must include `fn main`).
3. **Submit** — runs each test case: the user's function definitions are prepended before the test's `fn main()` block, then the combined code is sent to the Rust Playground API.
4. Pass/fail results appear per test case in the Console panel.

The Vite dev server proxies `/playground` → `https://play.rust-lang.org` to avoid CORS issues during development.

---

## Progress & Unlock System

All progress is saved in `localStorage` (key: `rust-learning-progress`).

- Exercises unlock sequentially within each checkpoint.
- Passing all tests marks an exercise complete and unlocks the next one.
- Completing a checkpoint's exercises unlocks its timed exam.
- Passing the exam (≥ 70%) unlocks the next checkpoint.
- A daily streak counter increments when you complete at least one exercise per day.

---

## Production Deployment

```bash
npm run build
# Serve the dist/ folder from any static host (Netlify, Vercel, GitHub Pages, etc.)
```

For production you need a reverse proxy rule: `/playground/*` → `https://play.rust-lang.org/*` with `changeOrigin: true`.

---

## Adding Exercises

1. Add a new `Exercise` object to `curriculum_part1.ts` or `curriculum_part2.ts`.
2. Follow the existing schema (see `src/types/index.ts` for the full interface).
3. Write test cases where `code` is a standalone `fn main() { ... }` block — the runner prepends the user's function definitions automatically.
4. The exercise appears in the sidebar immediately with no other registration needed.
