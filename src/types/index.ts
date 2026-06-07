export type Checkpoint = 'intro' | 'checkpoint1' | 'checkpoint2' | 'checkpoint3' | 'final';

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
