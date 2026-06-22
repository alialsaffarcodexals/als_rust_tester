import type { SideQuizStep } from '../../types';

// ===========================================================================
// Client-side semantic validation for the Side Quiz.
// Goal: a student should not fail for stylistic differences (extra spaces,
// a trailing semicolon, etc.). We normalize whitespace, then accept the answer
// if it matches any entry in `accepted` (normalized) OR any regex in
// `acceptedPatterns`.
// ===========================================================================

export const DEFAULT_BLANK = '_____';

// Collapse runs of whitespace to a single space and trim the ends.
export function normalizeAnswer(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

// A looser form used for comparison: also drop a single trailing semicolon and
// remove spaces immediately inside the most common delimiters so that
// "vec! [ 1 , 2 ]" and "vec![1, 2]" compare equal.
function canonical(input: string): string {
  let s = normalizeAnswer(input);
  s = s.replace(/;\s*$/, '');                 // ignore a trailing semicolon
  s = s.replace(/\s*([(){}\[\],;:])\s*/g, '$1'); // tighten around delimiters
  return s;
}

export interface ValidationResult {
  correct: boolean;
}

export function validateAnswer(input: string, step: SideQuizStep): ValidationResult {
  const userNorm = normalizeAnswer(input);
  const userCanon = canonical(input);

  if (userNorm.length === 0) return { correct: false };

  // 1) Accepted answer list — compare both normalized and canonical forms.
  for (const accepted of step.accepted) {
    if (normalizeAnswer(accepted) === userNorm) return { correct: true };
    if (canonical(accepted) === userCanon) return { correct: true };
  }

  // 2) Regex patterns — tested against the normalized (space-collapsed) input.
  if (step.acceptedPatterns) {
    for (const pattern of step.acceptedPatterns) {
      try {
        const re = new RegExp(pattern);
        if (re.test(userNorm)) return { correct: true };
      } catch {
        /* ignore a malformed pattern rather than crashing the quiz */
      }
    }
  }

  return { correct: false };
}

// Build the full code for a step by substituting the student's answer (or the
// canonical first accepted answer) into the template's blank. Used both to
// preview the completed snippet and to sanity-check that it compiles.
export function fillTemplate(step: SideQuizStep, answer: string): string {
  const token = step.blankToken ?? DEFAULT_BLANK;
  return step.template.split(token).join(answer);
}
