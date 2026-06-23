# Zone01 Final — UI/UX & Design Enhancement Pass

A design-polish and experience-optimization pass over the **Zone01 Final** learning
experience (lesson journey, Side Quiz, Documentation, Step-by-Step, and the Final
Preparation Quiz). Scope is Zone01 Final; shared components were only touched in
additive, backward-compatible ways (CP1/CP2/CP3 unaffected).

Goal: make Zone01 Final feel like a **premium, guided learning platform** rather than
a flat collection of tabs — modern, clean, motivating, easy to navigate, learning-focused.

---

## Current UX issues (before this pass)

1. **No sense of progress through the journey.** The journey was a flat row of tabs
   (Overview, Description, Concepts, Documentation, Practice, Side Quiz, Terminal,
   Step-by-Step, Self-Check). Nothing showed what the student had finished, what came
   next, or how much remained.
2. **No guided flow.** The student had to discover the order themselves; there was no
   "what's next" affordance to move them through the learning path.
3. **Side Quiz completion was understated.** Solving every step only changed a small
   nav label; there was no rewarding completion state, and completion wasn't reflected
   anywhere else.
4. **No focused coding environment.** On a 50/50 split the editor was always cramped to
   half the width, even when the student just wanted to code.
5. **Final Prep had a single flat mode.** Hints and docs were always visible, so there
   was no way to practise "exam-style" under time pressure.
6. **Mobile tab overflow.** With up to 9 journey tabs, the row wrapped into several
   stacked rows on phones, pushing content down and looking noisy.

---

## Proposed improvements

- A **journey progress bar** + section-completion checkmarks + a "Next: …" indicator.
- A **Continue →** button that advances to the next unfinished section (guided flow).
- **Side Quiz completion**: a celebration banner, and completion that feeds the journey
  progress (the Side Quiz section is only "done" when every step is solved).
- A **Focus mode** toggle that hides the journey and gives the editor the full width.
- **Final Prep modes**: a Practice/Exam segmented control. Exam mode adds a per-challenge
  countdown timer and hides hints/docs to emphasise solving under pressure.
- **Mobile**: turn the journey tabs into a single horizontal-scroll row instead of
  wrapping; tighten spacing.

---

## What was implemented

### Learning journey (`src/pages/LessonPage.tsx`)
- **Progress bar + status**: a thin bar above the journey tabs shows `done/total`
  sections and the **Next** section name (or "🎉 Journey complete").
- **Section completion**: each journey tab shows a ✓ once done. A section is "done" when
  visited; the **Side Quiz** is "done" only when all its steps are solved (driven by a new
  `onProgress` callback). Completion state resets per exercise.
- **Continue → button**: a footer in each section jumps to the next unfinished section,
  making the path feel guided ("Up next → …").
- **Focus mode**: a toolbar toggle (`⤢ Focus` / `⤡ Exit Focus`) collapses the journey
  panel so the editor spans the full width — a distraction-free coding view. Available on
  any guided (CP3/Final) lesson.

### Side Quiz (`src/components/learn/SideQuiz.tsx`)
- **Completion celebration**: a success banner ("Quiz complete — all N steps solved!")
  appears when every step is solved.
- **Progress reporting**: an `onProgress(solved, total)` prop lets the lesson reflect
  quiz completion in the journey progress.

### Final Preparation Quiz (`src/pages/FinalPrepPage.tsx`)
- **Practice / Exam modes**: a segmented control in the header.
  - *Practice* (default) shows hints and the Documentation panel.
  - *Exam* hides hints/docs, shows a focused note, and runs a **per-challenge countdown
    timer** (5–15 min scaled by difficulty) that turns amber under a minute and red at
    "Time's up". Submitting still works after time runs out.

### Mobile
- Journey tabs become a **horizontal-scroll row** (no multi-row wrapping) under 768px;
  the progress bar and Continue footer wrap gracefully. Final Prep already wraps its
  level rail and stacks its panels.

### Reuse / consistency
- All new UI uses the existing design tokens (`--rust`, `--success`, `--bg-*`,
  `--radius-*`) and existing components (`DocumentationPanel`, `CodeEditor`, `Console`).
  No new dependencies. Changes to shared components are additive and optional, so CP3 and
  other zones are unchanged.

---

## Validation

- `npx tsc --noEmit` and `npm run build` pass clean.
- Browser walk-through on `/lesson/<final id>` and `/final-prep`: journey progress fills
  as sections are visited, ✓ marks appear, Continue advances, the Side Quiz celebration
  shows on completion, Focus mode expands the editor, and Exam mode hides hints/docs and
  counts down.
- Mobile (375 px): journey tabs scroll horizontally; no horizontal page overflow.
- Regression: CP3 and CP1 lessons keep their existing layouts.

---

## Future ideas

- **Persist journey progress** per exercise in `localStorage` (currently per-session) and
  surface a per-exercise completion badge in the sidebar.
- **Readiness score** combining journey completion + quiz solved + self-assessment into a
  single "Exam readiness" meter on the Final dashboard.
- **Achievement-style milestones** (e.g. "All Level 1–6 prep challenges solved") shown
  discreetly, without heavy gamification.
- **Sticky in-page nav** inside long Documentation/Concepts sections (jump-to anchors).
- **Concept relationship map** linking related concepts across exercises.
- **Exam summary** at the end of a timed Final Prep session (score, time, weak areas).
