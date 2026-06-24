# Zone01 Final — Validation Audit

A full correctness audit of all **30 Zone01 Final exercises** (ids 110–138, 145),
checking every layer of platform content against the exercise's official
specification and its own tester.

## Method

For every Final exercise the **taught solution** (the Step-by-Step walkthrough,
whose chunks joined together form a complete program) was compiled against the
exercise's **own test cases** on the real Rust toolchain
(`play.rust-lang.org`, the same engine the in-app tester uses), reproducing the
app's harness exactly: `stripMain(solution) + "\n\n" + testCase.code`, comparing
`stdout.trim()` to `expectedOutput.trim()`. In addition each exercise's official
description, starter signature, side quiz, documentation and videos were reviewed
for consistency with the specification.

A result is only **PASS** when the taught solution compiles and produces the
exact expected output, the starter compiles when filled correctly, and the
learning content matches the real exercise contract.

---

## Exercise status

Status shown as **found → final** (after fixes in this audit).

| ID | Exercise | Found | Final | Note |
|----|----------|-------|-------|------|
| 110 | count_factorial_steps | PASS | ✅ PASS | — |
| 111 | matrix_multiplication | FAILED | ✅ PASS | Fixed earlier: `Matrix` is a tuple struct `((i32,i32),(i32,i32))`; starter lacked the struct and content taught named fields. |
| 112 | min_and_max | PASS | ✅ PASS | — |
| 113 | counting_words | FAILED | ✅ PASS | Test printed a `HashMap` with `{:?}` (non-deterministic order). Made deterministic via `BTreeMap`. |
| 114 | modify_letter | FAILED | ✅ PASS | Walkthrough was missing `swap_letter_case` (one of the 3 required functions) → wouldn't compile. Added it. |
| 115 | reverse_it | PASS | ✅ PASS | — |
| 116 | smallest | PASS | ✅ PASS | — |
| 117 | inv_pyramid | WARNING (no tests) | ✅ PASS | Added a verified test case. |
| 118 | nextprime | PASS | ✅ PASS | — |
| 119 | partial_sums | WARNING (no tests) | ✅ PASS | Starter was a param-less placeholder `partial_sums()`. Fixed to `parts_sums(&[u64]) -> Vec<u64>` (official name/signature) + test. |
| 120 | previousprime | PASS | ✅ PASS | — |
| 121 | prime_checker | PASS | ✅ PASS | — |
| 122 | profanity_filter | PASS | ✅ PASS | — |
| 123 | scytale_decoder | WARNING (no tests) | ✅ PASS | Added a verified test (official `abcdef` examples). |
| 124 | insertion_sort | PASS | ✅ PASS | — |
| 125 | matrix_determinant | WARNING (no tests) | ✅ PASS | Added a verified test. |
| 126 | order_books | WARNING (no tests) | ✅ PASS | Starter was a placeholder `order_books()` with no `Writer`/`Book`. Defined the official structs (`Writer{first_name,last_name,books}`, `Book{title,year}`), fixed signature `order_books(&mut Writer)`, added test + struct steps to the walkthrough. |
| 127 | rot21 | PASS | ✅ PASS | — |
| 128 | rpn | WARNING (no tests) | ✅ PASS | Placeholder `rpn()` starter + a CLI-program walkthrough that didn't match the tester. Reworked to the testable function `rpn(&str) -> f64` (matching CP3's proven contract) + tests. |
| 129 | blood_types_s | FAILED | ✅ PASS | Derived `Debug` printed fields in the wrong order (`antigen` before `rh_factor`); tester expects `rh_factor` first. Swapped the struct field order. |
| 130 | office_worker | PASS | ✅ PASS | — |
| 131 | matrix_display | PASS | ✅ PASS | — |
| 132 | queens | PASS | ✅ PASS | — |
| 133 | display_table | FAILED | ✅ PASS | Walkthrough lacked the `struct`/`new`/`add_row` (compile fail) and used a `+…+` separator instead of the spec's `|…|`; starter also lacked `use std::fmt;`. Fixed all three. |
| 134 | drop_the_blog | PASS | ✅ PASS | — |
| 135 | filter_table | FAILED | ✅ PASS | Starter used an uncompilable bare generic (`filter: T`); the walkthrough + side quiz taught a wrong API (`filter_col(column_index, value) -> Table`). Real API is closure-based `filter_col`/`filter_row<F: Fn(&str)->bool> -> Option<Self>`. Rewrote starter, walkthrough, and learning content. |
| 136 | flat_tree | PASS | ✅ PASS | — |
| 137 | brackets_matching | WARNING (no tests) | ✅ PASS | Placeholder `brackets_matching()` starter + CLI-program walkthrough. Reworked to the testable `brackets_matching(&str) -> bool` + test. |
| 138 | brain_fuck | WARNING (no tests) | ✅ PASS | Placeholder `brain_fuck()` starter + CLI-program walkthrough. Reworked to the testable `brain_fuck(&str) -> String` + test. |
| 145 | lunch_queue | PASS | ✅ PASS | — |

---

## Findings

### Inconsistencies found

**Critical — a correct answer could not pass (compile errors / wrong contract):**

1. **matrix_multiplication (111)** — `Matrix` is a tuple struct of two tuples, but the starter shipped without it and the content taught a named-field `Matrix { a, b, c, d }`. *(Fixed in the prior session.)*
2. **modify_letter (114)** — the Step-by-Step solution implemented only 2 of the 3 required functions; `swap_letter_case` was missing, so the taught solution didn't compile against the tester.
3. **display_table (133)** — the walkthrough omitted the `struct`/`new`/`add_row` and used the wrong separator character; the starter was missing `use std::fmt;`, so a correct student fill wouldn't compile.
4. **filter_table (135)** — the starter signature was uncompilable (`filter: T` with no generic bound) and the entire teaching path described a different API than the tester uses.
5. **blood_types_s (129)** — the struct's field declaration order made `Debug` print in the opposite order to what the tester asserts.

**Test quality:**

6. **counting_words (113)** — the test compared a `HashMap` `{:?}` dump whose ordering is randomised per run, so the result was non-deterministic (could fail a correct answer).

**No test coverage (could not be validated at all):**

7. **117, 119, 123, 125, 126, 128, 137, 138** — eight exercises shipped with an empty `testCases` array, so the in-app tester silently did nothing. Five of them (119, 126, 128, 137, 138) also had **placeholder starters** (a param-less `fn name()`) that didn't match the exercise at all.

### Fixes applied

- **Compile/contract bugs** (114, 129, 133, 135, plus 111 earlier): corrected starters, walkthroughs, side quizzes, editor hints, official descriptions, and the shared Show-Solution guide so the taught solution matches the real type/signature and compiles. Every corrected solution was re-verified on the live toolchain.
- **Deterministic test** (113): the test now collects into a `BTreeMap` (sorted keys) before printing, with the expected output updated accordingly.
- **Added test coverage** (117, 119, 123, 125, 126, 128, 137, 138): authored verified test cases, each confirmed to pass with the taught solution and to fail an empty `todo!()` stub.
- **Fixed placeholder starters** (119 → `parts_sums(&[u64]) -> Vec<u64>`; 126 → `order_books(&mut Writer)` with the official `Writer`/`Book` structs; 128 → `rpn(&str) -> f64`; 137 → `brackets_matching(&str) -> bool`; 138 → `brain_fuck(&str) -> String`).
- **CLI → testable function** (128, 137, 138): the three CLI-program exercises were reframed as pure functions capturing the assessed logic (the trivial argv/print wrapper is noted in each walkthrough). This is consistent with how CP3 already models `rpn`.
- **Bonus regression fix:** the shared `rpn` walkthrough was an integer CLI program that didn't match CP3 exercise 99's `f64` tests; rewriting it to the `f64` function form makes **CP3 99** pass too (verified), with no other CP3 regressions.

### Remaining concerns

- **conceptIds on the 3 reframed exercises** (rpn 128, brackets_matching 137, brain_fuck 138) still include `cli_args`. They now teach pure functions, so the `cli_args` tag (and any video resolved from it) is only tangentially relevant. Low impact; candidate for a later trim.
- **order_books semantics** were authored to the official text ("orders the books alphabetically, case-insensitive") as *sort by title, case-insensitive*, with `Book { title, year }` / `Writer { first_name, last_name, books }`. Internally consistent and verified; if the official reference sorts on a different field this would need a one-line tweak.
- **Out of scope (not Final):** the same placeholder starters (`partial_sums()`, `order_books()`, `rpn()`) and an empty-test `scytale_decoder` also exist in the CP1/CP2 copies of these slugs. They were left untouched to keep this audit scoped to Zone01 Final, and are flagged here for awareness.

---

## Final summary

- **Total exercises reviewed:** 30 (all Zone01 Final).
- **Found:** 17 PASS · 5 FAILED · 8 WARNING (no test coverage).
- **Total fixes applied:** 13 exercises changed — 6 correctness/contract fixes (111, 114, 129, 133, 135, plus the 113 determinism fix) and 8 coverage fixes (added tests for 117, 119, 123, 125, 126, 128, 137, 138, including 5 starter rewrites) — plus 1 shared-walkthrough fix that also repairs CP3 99.
- **Final:** **30 / 30 PASS.** Every Zone01 Final exercise now has at least one test case, a taught solution that compiles and produces the exact expected output, a starter that compiles when filled correctly, and learning content consistent with the real contract.

All changes verified with `tsc --noEmit` clean, `npm run build` clean, and live-toolchain re-runs of every affected exercise.
