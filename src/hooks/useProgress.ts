import { useState, useCallback, useEffect } from 'react';
import type { UserProgress, ExamResult } from '../types';
import {
  loadProgress,
  markLessonComplete,
  saveExamResult,
  addTime,
  isLessonUnlocked,
  isExamUnlocked,
} from '../store/progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Auto-save time every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => addTime(prev, 2));
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const completeLesson = useCallback(
    (exerciseId: number, code: string, testsPassed: number, testsTotal: number) => {
      setProgress((prev) => markLessonComplete(prev, exerciseId, code, testsPassed, testsTotal));
    },
    []
  );

  const saveExam = useCallback((result: ExamResult) => {
    setProgress((prev) => saveExamResult(prev, result));
  }, []);

  const checkUnlocked = useCallback(
    (exerciseId: number) => isLessonUnlocked(progress, exerciseId),
    [progress]
  );

  const checkExamUnlocked = useCallback(
    (firstId: number, lastId: number) => isExamUnlocked(progress, firstId, lastId),
    [progress]
  );

  const markIntroComplete = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, introCompleted: true };
      import('../store/progress').then(({ saveProgress }) => saveProgress(updated));
      return updated;
    });
  }, []);

  return {
    progress,
    completeLesson,
    saveExam,
    checkUnlocked,
    checkExamUnlocked,
    markIntroComplete,
  };
}
