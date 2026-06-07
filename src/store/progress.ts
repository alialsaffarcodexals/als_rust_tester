import type { UserProgress, LessonProgress, ExamResult } from '../types';

const STORAGE_KEY = 'rustpath_progress';

const defaultProgress = (): UserProgress => ({
  lessons: {},
  examResults: {},
  streak: 0,
  lastActiveDate: '',
  totalTimeMinutes: 0,
  introCompleted: false,
});

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn('Could not save progress to localStorage');
  }
}

export function markLessonComplete(
  progress: UserProgress,
  exerciseId: number,
  code: string,
  testsPassed: number,
  testsTotal: number
): UserProgress {
  const existing = progress.lessons[exerciseId];
  const updated: LessonProgress = {
    exerciseId,
    completed: testsPassed === testsTotal && testsTotal > 0,
    attempts: (existing?.attempts ?? 0) + 1,
    lastCode: code,
    completedAt: testsPassed === testsTotal ? Date.now() : existing?.completedAt,
    testsPassed,
    testsTotal,
  };
  const newProgress = {
    ...progress,
    lessons: { ...progress.lessons, [exerciseId]: updated },
  };
  updateStreak(newProgress);
  saveProgress(newProgress);
  return newProgress;
}

export function saveExamResult(progress: UserProgress, result: ExamResult): UserProgress {
  const existing = progress.examResults[result.examId] ?? [];
  const newProgress = {
    ...progress,
    examResults: {
      ...progress.examResults,
      [result.examId]: [...existing, result],
    },
  };
  saveProgress(newProgress);
  return newProgress;
}

export function addTime(progress: UserProgress, minutes: number): UserProgress {
  const newProgress = { ...progress, totalTimeMinutes: progress.totalTimeMinutes + minutes };
  saveProgress(newProgress);
  return newProgress;
}

function updateStreak(progress: UserProgress): void {
  const today = new Date().toDateString();
  if (progress.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  progress.streak = progress.lastActiveDate === yesterday ? progress.streak + 1 : 1;
  progress.lastActiveDate = today;
}

export function isLessonUnlocked(progress: UserProgress, exerciseId: number): boolean {
  if (exerciseId === 1) return true;
  // Each lesson unlocks when the previous is complete
  return progress.lessons[exerciseId - 1]?.completed === true;
}

export function isExamUnlocked(
  progress: UserProgress,
  firstExerciseId: number,
  lastExerciseId: number
): boolean {
  for (let id = firstExerciseId; id <= lastExerciseId; id++) {
    if (!progress.lessons[id]?.completed) return false;
  }
  return true;
}

export function getCheckpointStats(
  progress: UserProgress,
  firstId: number,
  lastId: number
): { completed: number; total: number; percentage: number } {
  const total = lastId - firstId + 1;
  let completed = 0;
  for (let id = firstId; id <= lastId; id++) {
    if (progress.lessons[id]?.completed) completed++;
  }
  return { completed, total, percentage: Math.round((completed / total) * 100) };
}

export function getOverallStats(progress: UserProgress, totalExercises: number) {
  const completed = Object.values(progress.lessons).filter((l) => l.completed).length;
  return {
    completed,
    total: totalExercises,
    percentage: Math.round((completed / totalExercises) * 100),
    streak: progress.streak,
    totalTimeMinutes: progress.totalTimeMinutes,
  };
}
