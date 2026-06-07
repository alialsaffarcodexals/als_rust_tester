import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import type { Exercise, ExamResult, UserProgress, TestResult } from '../types';
import { useRustExecution } from '../hooks/useRustExecution';

const CHECKPOINT_EXAM_RANGES: Record<string, { first: number; last: number; title: string; time: number }> = {
  checkpoint1: { first: 1, last: 19, title: 'Checkpoint 1 Exam', time: 45 * 60 },
  checkpoint2: { first: 20, last: 35, title: 'Checkpoint 2 Exam', time: 50 * 60 },
  checkpoint3: { first: 36, last: 45, title: 'Checkpoint 3 Exam', time: 40 * 60 },
  final: { first: 46, last: 63, title: 'Final Exam', time: 60 * 60 },
};

// Picks 5–8 exercises for an exam
function selectExamExercises(exercises: Exercise[], first: number, last: number): Exercise[] {
  const pool = exercises.filter((e) => e.id >= first && e.id <= last);
  const target = Math.min(8, Math.max(5, Math.floor(pool.length * 0.4)));
  // Pick evenly spread exercises
  const step = Math.max(1, Math.floor(pool.length / target));
  const selected: Exercise[] = [];
  for (let i = 0; i < pool.length && selected.length < target; i += step) {
    selected.push(pool[i]);
  }
  return selected;
}

interface ExamPageProps {
  exercises: Exercise[];
  progress: UserProgress;
  onSaveResult: (result: ExamResult) => void;
}

type ExamState = 'intro' | 'running' | 'reviewing' | 'finished';

export default function ExamPage({ exercises, progress, onSaveResult }: ExamPageProps) {
  const { checkpoint } = useParams<{ checkpoint: string }>();
  const navigate = useNavigate();

  const config = CHECKPOINT_EXAM_RANGES[checkpoint ?? ''];
  const { runTests, isTesting } = useRustExecution();

  const examExercises = config ? selectExamExercises(exercises, config.first, config.last) : [];
  const isUnlocked = (() => {
    if (!config) return false;
    for (let id = config.first; id <= config.last; id++) {
      if (!progress.lessons[id]?.completed) return false;
    }
    return true;
  })();

  const [examState, setExamState] = useState<ExamState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [codes, setCodes] = useState<Record<number, string>>({});
  const [testResults, setTestResults] = useState<Record<number, TestResult[]>>({});
  const [timeLeft, setTimeLeft] = useState(config?.time ?? 45 * 60);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentExercise = examExercises[currentIndex];

  // Timer
  useEffect(() => {
    if (examState === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [examState]);

  const startExam = () => {
    const initCodes: Record<number, string> = {};
    examExercises.forEach((e) => { initCodes[e.id] = e.starterCode; });
    setCodes(initCodes);
    setStartTime(Date.now());
    setExamState('running');
  };

  const handleSubmitQuestion = useCallback(async () => {
    if (!currentExercise) return;
    const code = codes[currentExercise.id] ?? '';
    const results = await runTests(code, currentExercise.testCases);
    setTestResults((prev) => ({ ...prev, [currentExercise.id]: results }));
  }, [currentExercise, codes, runTests]);

  const handleFinishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamState('reviewing');
  }, []);

  const handleFinalizeExam = () => {
    const answers = examExercises.map((exercise) => {
      const results = testResults[exercise.id] ?? [];
      const passed = results.every((r) => r.passed) && results.length > 0;
      return { exerciseId: exercise.id, passed, code: codes[exercise.id] ?? '' };
    });

    const score = Math.round((answers.filter((a) => a.passed).length / answers.length) * 100);
    const passingScore = 70;

    const result: ExamResult = {
      examId: checkpoint ?? 'unknown',
      score,
      passed: score >= passingScore,
      completedAt: Date.now(),
      answers,
      timeTaken: (config?.time ?? 0) - timeLeft,
    };

    onSaveResult(result);
    setExamState('finished');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!config) return <div className="page-body">Invalid exam</div>;

  if (!isUnlocked) {
    return (
      <div className="exam-locked">
        <div className="exam-locked-inner">
          <div style={{fontSize:'3rem'}}>🔒</div>
          <h2>Exam Locked</h2>
          <p className="text-secondary">
            Complete all exercises in {config.title.replace(' Exam', '')} to unlock this exam.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (examState === 'intro') {
    return (
      <div className="exam-intro animate-fade-in">
        <div className="exam-intro-card">
          <div className="exam-intro-icon">🎯</div>
          <h1>{config.title}</h1>
          <p className="text-secondary">
            Test your knowledge of the concepts you've learned.
          </p>
          <div className="exam-meta-grid">
            <div className="exam-meta-item">
              <div className="exam-meta-icon">📝</div>
              <div className="exam-meta-value">{examExercises.length}</div>
              <div className="exam-meta-label">Questions</div>
            </div>
            <div className="exam-meta-item">
              <div className="exam-meta-icon">⏱️</div>
              <div className="exam-meta-value">{Math.floor(config.time / 60)}</div>
              <div className="exam-meta-label">Minutes</div>
            </div>
            <div className="exam-meta-item">
              <div className="exam-meta-icon">🎯</div>
              <div className="exam-meta-value">70%</div>
              <div className="exam-meta-label">Pass Score</div>
            </div>
          </div>
          <div className="alert alert-info">
            Questions are from the exercises you've already practiced. The timer starts when you click Start.
            You can navigate between questions and resubmit at any time before the timer ends.
          </div>
          <button className="btn btn-primary btn-lg" onClick={startExam}>
            Start Exam
          </button>
        </div>
        <style>{`
          .exam-intro { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
          .exam-intro-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-xl);
            padding: 48px;
            max-width: 540px;
            width: 100%;
            display: flex; flex-direction: column; align-items: center; gap: 20px;
            text-align: center;
          }
          .exam-intro-icon { font-size: 3rem; }
          .exam-meta-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; width: 100%; }
          .exam-meta-item {
            background: var(--bg-elevated);
            border: 1px solid var(--border-normal);
            border-radius: var(--radius-lg);
            padding: 16px; text-align: center;
          }
          .exam-meta-icon { font-size: 1.25rem; margin-bottom: 4px; }
          .exam-meta-value { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); }
          .exam-meta-label { font-size: 0.75rem; color: var(--text-muted); }
        `}</style>
      </div>
    );
  }

  if (examState === 'finished') {
    const allAnswers = examExercises.map((e) => {
      const results = testResults[e.id] ?? [];
      return { exercise: e, passed: results.every((r) => r.passed) && results.length > 0, results };
    });
    const score = Math.round((allAnswers.filter((a) => a.passed).length / allAnswers.length) * 100);
    const passed = score >= 70;

    return (
      <div className="exam-finished animate-fade-in">
        <div className="exam-result-hero">
          <div className="exam-result-icon">{passed ? '🏆' : '📚'}</div>
          <h1 className={passed ? 'text-success' : 'text-error'}>{passed ? 'Passed!' : 'Not Passed'}</h1>
          <div className="exam-final-score">{score}%</div>
          <p className="text-secondary">{passed ? 'Excellent work!' : 'Review the exercises and try again.'}</p>
          <div className="exam-result-btns">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Dashboard</button>
            {!passed && (
              <button className="btn btn-primary" onClick={() => { setExamState('intro'); setTimeLeft(config.time); setCodes({}); setTestResults({}); }}>
                Retry Exam
              </button>
            )}
          </div>
        </div>
        <div className="exam-answers-review">
          <h3>Review</h3>
          {allAnswers.map(({ exercise, passed: ePassed, results }) => (
            <div key={exercise.id} className={`exam-answer-card ${ePassed ? 'pass' : 'fail'}`}>
              <div className="exam-answer-header">
                <span>{ePassed ? '✓' : '✗'}</span>
                <span>Exercise {exercise.id}: {exercise.title}</span>
                <span className={`badge ${ePassed ? 'badge-success' : 'badge-error'}`}>
                  {ePassed ? 'PASS' : 'FAIL'}
                </span>
              </div>
              {!ePassed && results.length > 0 && (
                <div className="exam-answer-details">
                  {results.filter((r) => !r.passed).slice(0, 2).map((r) => (
                    <div key={r.testId} className="text-xs text-muted">
                      ✗ {r.description}
                      {r.error && <span className="text-error"> — {r.error.substring(0, 100)}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <style>{`
          .exam-finished { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .exam-result-hero {
            text-align: center;
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-xl);
            padding: 40px;
            display: flex; flex-direction: column; align-items: center; gap: 12px;
          }
          .exam-result-icon { font-size: 3rem; }
          .exam-final-score { font-size: 4rem; font-weight: 900; color: var(--text-primary); }
          .exam-result-btns { display: flex; gap: 12px; margin-top: 8px; }
          .exam-answers-review h3 { margin-bottom: 12px; }
          .exam-answer-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            padding: 12px 16px;
            margin-bottom: 6px;
          }
          .exam-answer-card.pass { border-color: rgba(74,222,128,0.2); }
          .exam-answer-card.fail { border-color: rgba(248,113,113,0.2); }
          .exam-answer-header { display: flex; align-items: center; gap: 10px; font-size: 0.875rem; }
          .exam-answer-header span:first-child { font-weight: 700; }
          .exam-answer-header span:nth-child(2) { flex: 1; color: var(--text-secondary); }
          .exam-answer-details { margin-top: 8px; display: flex; flex-direction: column; gap: 3px; }
        `}</style>
      </div>
    );
  }

  // Running / reviewing
  const submittedForCurrent = testResults[currentExercise?.id ?? 0];

  return (
    <div className="exam-running">
      {/* Exam header */}
      <div className="exam-header">
        <div className="exam-header-left">
          <span className="exam-name">{config.title}</span>
          <div className="exam-question-nav">
            {examExercises.map((e, i) => {
              const results = testResults[e.id];
              const hasResult = !!results;
              const passed = results?.every((r) => r.passed) && results.length > 0;
              return (
                <button
                  key={e.id}
                  className={`exam-q-btn ${i === currentIndex ? 'active' : ''} ${hasResult ? (passed ? 'pass' : 'fail') : ''}`}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
        <div className="exam-header-right">
          {examState === 'running' && (
            <div className={`exam-timer ${timeLeft < 300 ? 'warning' : ''}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
          <button
            className="btn btn-primary btn-sm"
            onClick={examState === 'running' ? handleFinishExam : handleFinalizeExam}
          >
            {examState === 'running' ? 'Finish Exam' : 'Submit Results'}
          </button>
        </div>
      </div>

      {/* Question layout */}
      {currentExercise && (
        <div className="exam-layout">
          <div className="exam-question-panel">
            <div className="exam-q-header">
              <span className="badge badge-rust">Question {currentIndex + 1} of {examExercises.length}</span>
              <h3>{currentExercise.title}</h3>
            </div>
            <div className="exam-q-text">{currentExercise.question}</div>
            {currentExercise.functionSignatures.length > 0 && (
              <div className="exam-signatures">
                <div className="text-xs text-muted" style={{marginBottom:6}}>Required signatures:</div>
                {currentExercise.functionSignatures.map((sig, i) => (
                  <code key={i} className="exam-sig">{sig}</code>
                ))}
              </div>
            )}
          </div>
          <div className="exam-editor-panel">
            <div className="exam-editor-toolbar">
              <span className="text-xs text-muted font-mono">solution.rs</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSubmitQuestion}
                disabled={isTesting || examState === 'reviewing'}
              >
                {isTesting ? 'Testing...' : 'Submit Answer'}
              </button>
            </div>
            <CodeEditor
              value={codes[currentExercise.id] ?? currentExercise.starterCode}
              onChange={(v) => setCodes((prev) => ({ ...prev, [currentExercise.id]: v }))}
              height="320px"
              readOnly={examState === 'reviewing'}
            />
            <Console
              testResults={submittedForCurrent ?? null}
              isTesting={isTesting}
            />
          </div>
        </div>
      )}

      <style>{`
        .exam-running { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
        .exam-locked { display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; }
        .exam-locked-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .exam-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 20px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .exam-header-left { display: flex; align-items: center; gap: 16px; }
        .exam-name { font-size: 0.9375rem; font-weight: 600; }
        .exam-question-nav { display: flex; gap: 4px; }
        .exam-q-btn {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid var(--border-normal);
          background: var(--bg-elevated);
          font-size: 0.75rem; font-weight: 600;
          color: var(--text-muted);
          cursor: pointer; transition: all var(--transition);
        }
        .exam-q-btn:hover { border-color: var(--rust); color: var(--text-primary); }
        .exam-q-btn.active { border-color: var(--rust); background: var(--rust-dim); color: var(--rust-light); }
        .exam-q-btn.pass { border-color: var(--success); background: var(--success-bg); color: var(--success); }
        .exam-q-btn.fail { border-color: var(--error); background: var(--error-bg); color: var(--error); }
        .exam-header-right { display: flex; align-items: center; gap: 12px; }
        .exam-timer { font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
        .exam-timer.warning { color: var(--error); animation: pulse 1s ease infinite; }
        .exam-layout { flex: 1; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
        .exam-question-panel {
          padding: 20px;
          border-right: 1px solid var(--border-subtle);
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 16px;
        }
        .exam-q-header { display: flex; flex-direction: column; gap: 8px; }
        .exam-q-header h3 { font-size: 1.1rem; font-weight: 700; }
        .exam-q-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.75; white-space: pre-wrap; }
        .exam-signatures { display: flex; flex-direction: column; gap: 4px; }
        .exam-sig {
          display: block;
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-sm);
          padding: 5px 10px;
          font-size: 0.8rem;
          color: var(--syn-fn);
        }
        .exam-editor-panel {
          display: flex; flex-direction: column;
          padding: 12px; gap: 8px; overflow-y: auto;
        }
        .exam-editor-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 4px 0;
        }
      `}</style>
    </div>
  );
}
