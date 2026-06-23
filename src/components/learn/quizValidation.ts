import type {
  SideQuizStep,
  BlankQuizStep,
  BugQuizStep,
  QuizKind,
} from '../../types';

// ===========================================================================
// Side Quiz validation.
//
// The quiz supports several interactive question types (blank, bug, choice,
// order, match). Each kind has its own answer shape; this module centralizes
// the per-kind logic: an empty/initial answer, whether an answer is ready to
// check, whether it is correct, and what the revealed (correct) answer is.
//
// Answer shapes by kind:
//   blank  -> string                (the typed text)
//   bug    -> string[]              (selected token keys "line:index")
//   choice -> number[]              (selected option indices)
//   order  -> (string | null)[]     (the fragment text placed in each slot)
//   match  -> (string | null)[]     (the right value chosen for each left)
// ===========================================================================

export const DEFAULT_BLANK = '_____';

export type QuizAnswer = string | string[] | number[] | (string | null)[];

export function kindOf(step: SideQuizStep): QuizKind {
  return step.kind ?? 'blank';
}

// ---- Whitespace-tolerant comparison for the blank type --------------------

export function normalizeAnswer(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function canonical(input: string): string {
  let s = normalizeAnswer(input);
  s = s.replace(/;\s*$/, '');
  s = s.replace(/\s*([(){}\[\],;:])\s*/g, '$1');
  return s;
}

export interface ValidationResult {
  correct: boolean;
}

export function validateAnswer(input: string, step: BlankQuizStep): ValidationResult {
  const userNorm = normalizeAnswer(input);
  const userCanon = canonical(input);
  if (userNorm.length === 0) return { correct: false };

  for (const accepted of step.accepted) {
    if (normalizeAnswer(accepted) === userNorm) return { correct: true };
    if (canonical(accepted) === userCanon) return { correct: true };
  }
  if (step.acceptedPatterns) {
    for (const pattern of step.acceptedPatterns) {
      try {
        if (new RegExp(pattern).test(userNorm)) return { correct: true };
      } catch {
        /* ignore a malformed pattern */
      }
    }
  }
  return { correct: false };
}

export function fillTemplate(step: BlankQuizStep, answer: string): string {
  const token = step.blankToken ?? DEFAULT_BLANK;
  return step.template.split(token).join(answer);
}

// ---- Find-the-Bug tokenizer (shared by widget + validation) ---------------

export interface CodeToken {
  text: string;
  clickable: boolean;
  key: string;     // stable id "line:clickIndex" for clickable tokens
  buggy: boolean;
}

// Split a line into clickable tokens (identifiers / symbols) and inert
// whitespace, marking tokens that match a bug entry for this line.
export function tokenizeLine(line: string, lineNo: number, bugs: BugQuizStep['bugs']): CodeToken[] {
  const parts = line.match(/(\s+|[A-Za-z0-9_]+|[^\sA-Za-z0-9_])/g) ?? (line ? [line] : []);
  let clickIdx = 0;
  return parts.map((p) => {
    const isSpace = /^\s+$/.test(p);
    const clickable = !isSpace && p.length > 0;
    const key = `${lineNo}:${clickIdx}`;
    const buggy = clickable && bugs.some((b) => b.line === lineNo && b.token === p);
    if (clickable) clickIdx++;
    return { text: p, clickable, key, buggy };
  });
}

export function buggyKeys(step: BugQuizStep): string[] {
  const keys: string[] = [];
  step.code.replace(/\r\n/g, '\n').split('\n').forEach((line, i) => {
    tokenizeLine(line, i + 1, step.bugs).forEach((t) => {
      if (t.buggy) keys.push(t.key);
    });
  });
  return keys;
}

// ---- Generic per-kind helpers ---------------------------------------------

function setEqual(a: (string | number)[], b: (string | number)[]): boolean {
  if (a.length !== b.length) return false;
  const sb = new Set(b);
  return a.every((x) => sb.has(x));
}

export function emptyAnswer(step: SideQuizStep): QuizAnswer {
  switch (step.kind) {
    case 'bug':
      return [] as string[];
    case 'choice':
      return [] as number[];
    case 'order':
      return Array(step.fragments.length).fill(null) as (string | null)[];
    case 'match':
      return Array(step.pairs.length).fill(null) as (string | null)[];
    default:
      return '';
  }
}

// Whether the current answer is complete enough to be checked.
export function isReady(step: SideQuizStep, answer: QuizAnswer): boolean {
  switch (step.kind) {
    case 'bug':
    case 'choice':
      return (answer as unknown[]).length > 0;
    case 'order':
    case 'match':
      return (answer as (string | null)[]).every((x) => x !== null);
    default:
      return typeof answer === 'string' && answer.trim().length > 0;
  }
}

export function checkStep(step: SideQuizStep, answer: QuizAnswer): boolean {
  switch (step.kind) {
    case 'bug':
      return setEqual(answer as string[], buggyKeys(step));
    case 'choice':
      return setEqual(answer as number[], step.correct);
    case 'order': {
      const slots = answer as (string | null)[];
      return (
        slots.length === step.fragments.length &&
        step.fragments.every((f, i) => slots[i] === f)
      );
    }
    case 'match': {
      const picks = answer as (string | null)[];
      return step.pairs.every((p, i) => picks[i] === p.right);
    }
    default:
      return validateAnswer(answer as string, step).correct;
  }
}

// The correct answer in the same shape as the student's answer (for "reveal").
export function revealAnswer(step: SideQuizStep): QuizAnswer {
  switch (step.kind) {
    case 'bug':
      return buggyKeys(step);
    case 'choice':
      return [...step.correct];
    case 'order':
      return [...step.fragments];
    case 'match':
      return step.pairs.map((p) => p.right);
    default:
      return step.accepted[0] ?? '';
  }
}
