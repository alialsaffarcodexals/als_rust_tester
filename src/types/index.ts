export type Checkpoint = 'intro' | 'checkpoint1' | 'checkpoint2' | 'checkpoint3' | 'final' | 'zone01_cp1' | 'zone01_cp2' | 'zone01_cp3' | 'zone01_final';

export type Difficulty = 'easiest' | 'easy' | 'medium' | 'hard' | 'hardest';

export interface TestCase {
  id: string;
  description: string;
  code: string;       // full runnable Rust code with assertions
  expectedOutput: string;
  hidden?: boolean;
}

export interface LanguageComparison {
  language: 'C#' | 'Java' | 'Go' | 'JavaScript' | 'Python';
  code: string;
  note: string;
}

export interface GuidedExample {
  title: string;
  explanation: string;
  code: string;
}

export interface VideoResource {
  title: string;
  url: string;
  description: string;
}

export interface GuideFunction {
  name: string;
  signature: string;
  description: string;
  example?: string;
}

export interface GuideConcept {
  name: string;
  description: string;
  example?: string;
}

export interface GuideDataStructure {
  name: string;
  description: string;
  example?: string;
}

export interface Zone01Guide {
  builtinFunctions: GuideFunction[];
  concepts: GuideConcept[];
  dataStructures: GuideDataStructure[];
  annotatedSolution: string;
}

// One step of a guided, line-by-line solution walkthrough.
export interface SolutionStep {
  code: string;     // the line(s) revealed at this step
  explain: string;  // explanation for these lines
}

export interface Exercise {
  id: number;
  slug: string;
  title: string;
  checkpoint: Checkpoint;
  difficulty: Difficulty;
  order: number;

  // Concept explanation
  concept: string;        // markdown-like rich text
  whyItExists: string;
  comparisons: LanguageComparison[];
  guidedExamples: GuidedExample[];
  videos: VideoResource[];

  // The actual exercise
  question: string;
  functionSignatures: string[];
  constraints: string[];
  starterCode: string;
  solution: string;

  // Testing
  testCases: TestCase[];
  hints: string[];
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string;       // markdown
  codeExample?: string;
}

export interface Chapter {
  id: 'intro';
  title: string;
  description: string;
  sections: ChapterSection[];
}

export interface ExamQuestion {
  exerciseId: number;
  timeLimit: number;   // seconds per question
}

export interface CheckpointExam {
  id: string;
  checkpoint: Checkpoint;
  title: string;
  questions: ExamQuestion[];
  totalTime: number;   // seconds
  passingScore: number; // 0-100
}

// Progress tracking
export interface LessonProgress {
  exerciseId: number;
  completed: boolean;
  attempts: number;
  lastCode: string;
  completedAt?: number;  // timestamp
  testsPassed: number;
  testsTotal: number;
}

export interface ExamResult {
  examId: string;
  score: number;
  passed: boolean;
  completedAt: number;
  answers: { exerciseId: number; passed: boolean; code: string }[];
  timeTaken: number;
}

export interface UserProgress {
  lessons: Record<number, LessonProgress>;
  examResults: Record<string, ExamResult[]>;
  streak: number;
  lastActiveDate: string;
  totalTimeMinutes: number;
  introCompleted: boolean;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  success: boolean;
  compilationError: boolean;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  description: string;
  output: string;
  expected: string;
  error?: string;
}

// ===========================================================================
// CP3 Guided Learning Platform
// Reusable, data-driven structures powering the CP3 learning journey.
// Designed so other zones can adopt the same components later.
// ===========================================================================

// A reusable Rust concept entry, shared across zones via conceptLibrary.ts.
export interface ConceptEntry {
  id: string;             // 'ownership', 'option', 'iterators', ...
  name: string;           // 'Ownership'
  explanation: string;    // beginner-friendly explanation
  whyItMatters: string;   // why Rust uses this concept
  example: string;        // minimal isolated Rust snippet
  exampleExplain: string; // what happened and why
  docUrl?: string;        // official documentation link
}

// "Exercise Overview" — what the student is building and how it behaves.
export interface Cp3Overview {
  whatYouBuild: string;
  inputOutput: string;      // expected input/output behavior
  constraints: string[];
  commonMistakes: string[];
}

// "Learning Objectives" — what/why/which-skills.
export interface Cp3Objectives {
  learn: string[];      // what the student is expected to learn
  whyExists: string;    // why the exercise exists
  rustSkills: string[]; // which Rust skills are practiced
}

// "Similar Practice Example" — a DIFFERENT problem with the same concepts.
// Must never reveal the real exercise's solution.
export interface SimilarExample {
  title: string;
  prompt: string;        // a different mini-problem, same difficulty/concepts
  starter: string;       // starter code for the mini-problem
  hint: string;
  concepts: string[];    // concept ids reused
  solution?: string;     // solution of the MINI problem only (collapsible)
}

// ---------------------------------------------------------------------------
// Side Quiz steps — a discriminated union of interactive question types.
// `kind` is the discriminant; it is OPTIONAL on the fill-in-the-blank variant
// so existing data (which omits it) keeps working and defaults to 'blank'.
// ---------------------------------------------------------------------------
export type QuizKind = 'blank' | 'bug' | 'choice' | 'order' | 'match';

// Fields shared by every question type.
interface QuizStepBase {
  prompt: string;             // what the student must do
  hints: [string, string];    // exactly two hints, weak then stronger
  explanation: string;        // why the answer is correct (shown when solved)
  whatYouLearned: string;     // concept reinforced by this step
  conceptId?: string;         // link to a ConceptEntry
}

// Fill-in-the-blank (the original, default type).
export interface BlankQuizStep extends QuizStepBase {
  kind?: 'blank';
  template: string;           // code containing the blank marker
  blankToken?: string;        // the blank marker, default '_____'
  accepted: string[];         // accepted answers (normalized compare)
  acceptedPatterns?: string[];// regex strings for semantic matching
}

// Find-the-Bug — the student clicks the buggy token(s) in a snippet.
export interface BugQuizStep extends QuizStepBase {
  kind: 'bug';
  code: string;                         // the snippet, possibly multi-line
  bugs: { line: number; token: string }[]; // 1-based line + exact token text
}

// Multiple-choice code completion — pick the correct option(s).
export interface ChoiceQuizStep extends QuizStepBase {
  kind: 'choice';
  template?: string;          // optional code context shown above the options
  options: string[];          // the choices
  correct: number[];          // index(es) of the correct option(s)
  multi?: boolean;            // true → more than one option is correct
  why?: string[];             // optional per-option rationale (parallel to options)
}

// Code ordering / assembly — arrange fragments into the correct sequence.
export interface OrderQuizStep extends QuizStepBase {
  kind: 'order';
  scaffold?: string;          // optional surrounding code shown for context
  fragments: string[];        // the correct fragments, in correct order
  distractors?: string[];     // extra fragments that do NOT belong
}

// Matching — connect each left item to its correct right item.
export interface MatchQuizStep extends QuizStepBase {
  kind: 'match';
  intro?: string;             // optional code/context shown above
  pairs: { left: string; right: string }[]; // left → correct right
}

export type SideQuizStep =
  | BlankQuizStep
  | BugQuizStep
  | ChoiceQuizStep
  | OrderQuizStep
  | MatchQuizStep;

// Terminal simulation config (CLI exercises only).
export interface TerminalConfig {
  programName: string;   // e.g. 'rpn'
  examples: string[];    // sample argument lines, e.g. '"1 2 * 3 * 4 +"'
  runnerTemplate: string;// self-contained reference binary; {{ARGS}} -> Vec<String> literal
  explain: string;       // how Rust parses the arguments
}

export interface SelfAssessmentPrompt {
  question: string;
}

// Full structured learning content for one CP3 exercise, keyed by slug.
export interface Cp3LearningContent {
  overview: Cp3Overview;
  officialDescription: string;            // transcribed 01-edu subject text
  objectives: Cp3Objectives;
  conceptIds: string[];                   // refs into conceptLibrary
  conceptNotes?: Record<string, string>;  // per-exercise note for a concept
  similar: SimilarExample;
  sideQuiz: SideQuizStep[];
  terminal?: TerminalConfig;              // present only for CLI exercises
  selfAssessment?: SelfAssessmentPrompt[];// defaults applied if omitted
}
