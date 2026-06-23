import type { Cp3LearningContent } from '../types';
import { zone01Cp3Learning } from './zone01_cp3_learning';

// ===========================================================================
// Zone01 Final guided-learning content, keyed by exercise slug.
//
// 14 Final slugs are shared with CP3 — they reuse the CP3 journey by spreading
// the CP3 entry and adding a Documentation section + editor hints.
// 16 Final-only slugs get full original content.
//
// Authoring notes match zone01_cp3_learning.ts (officialDescription uses ~~~
// fences; sideQuiz blanks default to '_____'; documentation lists APIs + links
// (+ optional videos); editorHints are non-spoiler progressive comments seeded
// into the editor).
// ===========================================================================

// Reference the shared CP3 record so reused slugs stay in one place.
void zone01Cp3Learning;

export const zone01FinalLearning: Record<string, Cp3LearningContent> = {};
