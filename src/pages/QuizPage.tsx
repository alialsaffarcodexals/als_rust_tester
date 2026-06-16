import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import type { Exercise, ExecutionResult, TestResult } from '../types';
import { useRustExecution } from '../hooks/useRustExecution';

// ---------------------------------------------------------------------------
// Zone01 CP3 quiz — 6 difficulty levels. The quiz picks ONE random eligible
// question from each level. You must pass every test of the current level's
// question before the next level unlocks.
// ---------------------------------------------------------------------------
interface QuizLevel {
  level: number;
  title: string;
  blurb: string;
  exerciseIds: number[];
}

const QUIZ_LEVELS: QuizLevel[] = [
  { level: 1, title: 'Strings & Loops', blurb: 'Warm up with text and simple iteration.', exerciseIds: [93, 89, 97] },
  { level: 2, title: 'Slices & Numbers', blurb: 'Work with number sequences and primes.', exerciseIds: [91, 90, 92] },
  { level: 3, title: 'Collections', blurb: 'Build up Vecs, HashMaps and formatted output.', exerciseIds: [88, 101, 105] },
  { level: 4, title: 'Validation & Matching', blurb: 'Validate input and branch with match.', exerciseIds: [94, 95, 96] },
  { level: 5, title: 'Parsing & Data Structures', blurb: 'Stacks, queues and decoding.', exerciseIds: [99, 100, 109, 104] },
  { level: 6, title: 'Structs, Ownership & Backtracking', blurb: 'The toughest CP3 challenges.', exerciseIds: [98, 102, 103, 106, 107, 108] },
];

const TOTAL_LEVELS = QUIZ_LEVELS.length;
const STORAGE_KEY = 'rustpath_cp3_quiz_v1';

type QuizState = 'intro' | 'running' | 'finished';
type EditorTab = 'solution' | 'main';

interface QuizSession {
  questionIds: number[];   // chosen exercise id per level (index 0 = level 1)
  solved: boolean[];       // whether each level has been cleared
  current: number;         // current level index the student is viewing
  solutionCode: Record<number, string>;
  mainCode: Record<number, string>;
}

interface QuizPageProps {
  exercises: Exercise[];
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function QuizPage({ exercises }: QuizPageProps) {
  const navigate = useNavigate();
  const { runCode, runTests, isRunning, isTesting } = useRustExecution();

  const byId = useMemo(() => {
    const m = new Map<number, Exercise>();
    exercises.forEach((e) => m.set(e.id, e));
    return m;
  }, [exercises]);

  // Only exercises with test cases can be graded.
  const eligibleByLevel = useMemo(
    () =>
      QUIZ_LEVELS.map((lvl) =>
        lvl.exerciseIds.filter((id) => {
          const ex = byId.get(id);
          return ex && ex.testCases.length > 0;
        })
      ),
    [byId]
  );

  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('solution');
  const [runResult, setRunResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [saved, setSaved] = useState(false);

  // Restore an in-progress quiz on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as QuizSession;
        if (parsed.questionIds?.length === TOTAL_LEVELS) {
          setSession(parsed);
          setQuizState('running');
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const persist = useCallback((next: QuizSession) => {
    setSession(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full / disabled */
    }
  }, []);

  const buildQuiz = useCallback((): QuizSession => {
    const questionIds = eligibleByLevel.map((pool, i) =>
      pool.length > 0 ? pickRandom(pool) : QUIZ_LEVELS[i].exerciseIds[0]
    );
    const solutionCode: Record<number, string> = {};
    const mainCode: Record<number, string> = {};
    questionIds.forEach((id) => {
      const ex = byId.get(id);
      solutionCode[id] = ex?.starterCode ?? '';
      mainCode[id] = ex?.testCases[0]?.code ?? '';
    });
    return { questionIds, solved: Array(TOTAL_LEVELS).fill(false), current: 0, solutionCode, mainCode };
  }, [eligibleByLevel, byId]);

  const startQuiz = useCallback(() => {
    const next = buildQuiz();
    setRunResult(null);
    setTestResults(null);
    setActiveEditorTab('solution');
    persist(next);
    setQuizState('running');
  }, [buildQuiz, persist]);

  const newQuiz = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    startQuiz();
  }, [startQuiz]);

  // -- Derived current question -------------------------------------------------
  const currentLevelIndex = session?.current ?? 0;
  const currentExerciseId = session?.questionIds[currentLevelIndex];
  const currentExercise = currentExerciseId != null ? byId.get(currentExerciseId) : undefined;
  const currentSolution = currentExerciseId != null ? session?.solutionCode[currentExerciseId] ?? '' : '';
  const currentMain = currentExerciseId != null ? session?.mainCode[currentExerciseId] ?? '' : '';

  // Reset console panels when switching level.
  useEffect(() => {
    setRunResult(null);
    setTestResults(null);
    setActiveEditorTab('solution');
  }, [currentLevelIndex]);

  const updateCode = useCallback(
    (field: 'solutionCode' | 'mainCode', value: string) => {
      if (!session || currentExerciseId == null) return;
      const next: QuizSession = {
        ...session,
        [field]: { ...session[field], [currentExerciseId]: value },
      };
      persist(next);
    },
    [session, currentExerciseId, persist]
  );

  const handleRun = useCallback(async () => {
    if (!currentSolution.trim()) return;
    setTestResults(null);
    const result = await runCode(`${currentSolution}\n\n${currentMain}`);
    setRunResult(result);
  }, [currentSolution, currentMain, runCode]);

  const handleSubmit = useCallback(async () => {
    if (!currentExercise || !session || currentExerciseId == null) return;
    setRunResult(null);
    const results = await runTests(currentSolution, currentExercise.testCases);
    setTestResults(results);
    const allPassed = results.length > 0 && results.every((r) => r.passed);
    if (allPassed && !session.solved[currentLevelIndex]) {
      const solved = [...session.solved];
      solved[currentLevelIndex] = true;
      persist({ ...session, solved });
    }
  }, [currentExercise, currentSolution, currentExerciseId, session, currentLevelIndex, runTests, persist]);

  const handleSave = useCallback(() => {
    if (session) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch {
        /* ignore */
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }, [session]);

  const handleReset = useCallback(() => {
    if (!currentExercise || currentExerciseId == null) return;
    if (activeEditorTab === 'main') {
      updateCode('mainCode', currentExercise.testCases[0]?.code ?? '');
    } else {
      updateCode('solutionCode', currentExercise.starterCode);
    }
  }, [currentExercise, currentExerciseId, activeEditorTab, updateCode]);

  const goToLevel = useCallback(
    (index: number) => {
      if (!session) return;
      // A level is reachable if it's solved, the current one, or the first unsolved one.
      const firstUnsolved = session.solved.findIndex((s) => !s);
      const maxReachable = firstUnsolved === -1 ? TOTAL_LEVELS - 1 : firstUnsolved;
      if (index <= maxReachable) {
        persist({ ...session, current: index });
      }
    },
    [session, persist]
  );

  const goNextLevel = useCallback(() => {
    if (!session) return;
    if (currentLevelIndex < TOTAL_LEVELS - 1) {
      persist({ ...session, current: currentLevelIndex + 1 });
    } else if (session.solved.every((s) => s)) {
      setQuizState('finished');
    }
  }, [session, currentLevelIndex, persist]);

  const solvedCount = session?.solved.filter(Boolean).length ?? 0;
  const allSolved = solvedCount === TOTAL_LEVELS;
  const currentSolved = session?.solved[currentLevelIndex] ?? false;
  const firstUnsolved = session ? session.solved.findIndex((s) => !s) : 0;
  const maxReachable = firstUnsolved === -1 ? TOTAL_LEVELS - 1 : firstUnsolved;

  // ---------------------------------------------------------------------------
  // Intro screen
  // ---------------------------------------------------------------------------
  if (quizState === 'intro') {
    return (
      <div className="quiz-intro animate-fade-in">
        <div className="quiz-intro-card">
          <div className="quiz-intro-icon">🧩</div>
          <h1>Zone01 CP3 — Level Quiz</h1>
          <p className="text-secondary">
            Six levels, increasing in difficulty. Each level gives you a <strong>random</strong> CP3
            question. Pass every test to unlock the next level. Clear all six to win.
          </p>
          <div className="quiz-levels-preview">
            {QUIZ_LEVELS.map((lvl) => (
              <div className="quiz-level-row" key={lvl.level}>
                <span className="quiz-level-badge">L{lvl.level}</span>
                <div>
                  <div className="quiz-level-name">{lvl.title}</div>
                  <div className="quiz-level-blurb">{lvl.blurb}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="alert alert-info">
            The editor has <strong>solution.rs</strong> and <strong>main.rs</strong> tabs, full
            autocomplete, and hover / Ctrl-click documentation for any built-in.
          </div>
          <button className="btn btn-primary btn-lg" onClick={startQuiz}>
            Start Quiz →
          </button>
        </div>
        <QuizStyles />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Finished screen
  // ---------------------------------------------------------------------------
  if (quizState === 'finished' && session) {
    return (
      <div className="quiz-finished animate-fade-in">
        <div className="quiz-result-hero">
          <div className="quiz-result-icon">🏆</div>
          <h1 className="text-success">Quiz Complete!</h1>
          <div className="quiz-final-score">{solvedCount} / {TOTAL_LEVELS}</div>
          <p className="text-secondary">You cleared every level of the CP3 quiz. Outstanding work!</p>
          <div className="quiz-result-btns">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Dashboard</button>
            <button className="btn btn-primary" onClick={newQuiz}>New Quiz</button>
          </div>
        </div>
        <div className="quiz-answers-review">
          <h3>Your questions</h3>
          {QUIZ_LEVELS.map((lvl, i) => {
            const ex = byId.get(session.questionIds[i]);
            return (
              <div key={lvl.level} className="quiz-answer-card pass">
                <span className="quiz-answer-check">✓</span>
                <span className="quiz-answer-level">L{lvl.level}</span>
                <span className="quiz-answer-title">{ex?.title ?? '—'}</span>
                <span className="badge badge-success">SOLVED</span>
              </div>
            );
          })}
        </div>
        <QuizStyles />
      </div>
    );
  }

  if (!session || !currentExercise) {
    return (
      <div className="quiz-intro">
        <div className="quiz-intro-card">
          <p className="text-secondary">Preparing your quiz…</p>
          <button className="btn btn-primary" onClick={startQuiz}>Start Quiz</button>
        </div>
        <QuizStyles />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Running screen
  // ---------------------------------------------------------------------------
  const allTestsPassed = testResults != null && testResults.length > 0 && testResults.every((t) => t.passed);

  return (
    <div className="quiz-running">
      <div className="quiz-header">
        <div className="quiz-header-left">
          <span className="quiz-name">CP3 Level Quiz</span>
          <div className="quiz-stepper">
            {QUIZ_LEVELS.map((lvl, i) => {
              const solved = session.solved[i];
              const locked = i > maxReachable;
              const active = i === currentLevelIndex;
              return (
                <button
                  key={lvl.level}
                  className={`quiz-step ${active ? 'active' : ''} ${solved ? 'solved' : ''} ${locked ? 'locked' : ''}`}
                  onClick={() => goToLevel(i)}
                  disabled={locked}
                  title={locked ? 'Solve earlier levels to unlock' : lvl.title}
                >
                  {solved ? '✓' : locked ? '🔒' : lvl.level}
                </button>
              );
            })}
          </div>
        </div>
        <div className="quiz-header-right">
          <span className="quiz-progress-text">{solvedCount}/{TOTAL_LEVELS} solved</span>
          <button className="btn btn-ghost btn-sm" onClick={newQuiz} title="Start a fresh quiz">↻ New Quiz</button>
        </div>
      </div>

      <div className="quiz-layout">
        {/* Question panel */}
        <div className="quiz-question-panel">
          <div className="quiz-q-header">
            <span className="badge badge-rust">Level {currentLevelIndex + 1} · {QUIZ_LEVELS[currentLevelIndex].title}</span>
            {currentSolved && <span className="badge badge-success">✓ Solved</span>}
            <h3>{currentExercise.title}</h3>
          </div>
          <div className="quiz-q-text">{currentExercise.question}</div>
          {currentExercise.functionSignatures.length > 0 && (
            <div className="quiz-signatures">
              <div className="text-xs text-muted" style={{ marginBottom: 6 }}>Required signature(s):</div>
              {currentExercise.functionSignatures.map((sig, i) => (
                <code key={i} className="quiz-sig">{sig}</code>
              ))}
            </div>
          )}
          {currentExercise.constraints.length > 0 && (
            <div className="quiz-constraints">
              <div className="text-xs text-muted" style={{ marginBottom: 6 }}>Constraints:</div>
              <ul>
                {currentExercise.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Editor panel */}
        <div className="quiz-editor-panel">
          <div className="quiz-editor-toolbar">
            <div className="quiz-editor-tabs">
              <button
                className={`quiz-editor-tab ${activeEditorTab === 'solution' ? 'active' : ''}`}
                onClick={() => setActiveEditorTab('solution')}
              >
                solution.rs
              </button>
              <button
                className={`quiz-editor-tab ${activeEditorTab === 'main' ? 'active' : ''}`}
                onClick={() => setActiveEditorTab('main')}
              >
                main.rs <span className="quiz-tab-hint">caller</span>
              </button>
            </div>
            <div className="quiz-editor-actions">
              <button className="btn btn-ghost btn-sm" onClick={handleReset}>↺ Reset</button>
              <button className={`btn btn-sm${saved ? ' btn-save-done' : ' btn-ghost'}`} onClick={handleSave}>
                {saved ? '✓ Saved' : 'Save'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleRun} disabled={isRunning || isTesting}>
                {isRunning ? 'Running…' : '▶ Run'}
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={isRunning || isTesting}>
                {isTesting ? 'Testing…' : '✓ Submit'}
              </button>
            </div>
          </div>

          <div style={{ display: activeEditorTab === 'solution' ? 'block' : 'none' }}>
            <CodeEditor value={currentSolution} onChange={(v) => updateCode('solutionCode', v)} height="320px" />
          </div>
          <div style={{ display: activeEditorTab === 'main' ? 'block' : 'none' }}>
            <CodeEditor value={currentMain} onChange={(v) => updateCode('mainCode', v)} height="320px" />
          </div>

          <Console
            output={testResults ? null : runResult}
            testResults={testResults}
            isRunning={isRunning}
            isTesting={isTesting}
          />

          {testResults && (
            <div className={`quiz-submit-summary ${allTestsPassed ? 'pass' : 'fail'}`}>
              {allTestsPassed ? (
                <>
                  <span>🎉</span>
                  <span>All {testResults.length} tests passed!</span>
                  {currentLevelIndex < TOTAL_LEVELS - 1 ? (
                    <button className="btn btn-success btn-sm" onClick={goNextLevel}>Next Level →</button>
                  ) : (
                    <button className="btn btn-success btn-sm" onClick={goNextLevel}>Finish Quiz 🏆</button>
                  )}
                </>
              ) : (
                <>
                  <span>⚠️</span>
                  <span>{testResults.filter((t) => t.passed).length}/{testResults.length} tests passed. Keep trying to unlock the next level.</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <QuizStyles />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scoped styles
// ---------------------------------------------------------------------------
function QuizStyles() {
  return (
    <style>{`
      .quiz-intro, .quiz-finished { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 24px; }
      .quiz-intro { min-height: 60vh; justify-content: center; }
      .quiz-intro-card {
        background: var(--bg-surface); border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl); padding: 40px; max-width: 620px; width: 100%;
        display: flex; flex-direction: column; align-items: center; gap: 18px; text-align: center;
      }
      .quiz-intro-icon { font-size: 3rem; }
      .quiz-levels-preview { width: 100%; display: flex; flex-direction: column; gap: 8px; text-align: left; }
      .quiz-level-row { display: flex; align-items: center; gap: 12px; background: var(--bg-elevated); border: 1px solid var(--border-normal); border-radius: var(--radius-md); padding: 10px 14px; }
      .quiz-level-badge { font-weight: 800; color: var(--rust-light); background: var(--rust-dim); border-radius: var(--radius-sm); padding: 4px 10px; font-size: 0.8rem; flex-shrink: 0; }
      .quiz-level-name { font-weight: 600; font-size: 0.9rem; }
      .quiz-level-blurb { font-size: 0.78rem; color: var(--text-muted); }

      .quiz-running { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
      .quiz-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 20px; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); flex-shrink: 0; }
      .quiz-header-left { display: flex; align-items: center; gap: 16px; }
      .quiz-name { font-size: 0.9375rem; font-weight: 600; }
      .quiz-stepper { display: flex; gap: 6px; }
      .quiz-step { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border-normal); background: var(--bg-elevated); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); cursor: pointer; transition: all var(--transition); display: flex; align-items: center; justify-content: center; }
      .quiz-step:hover:not(:disabled) { border-color: var(--rust); color: var(--text-primary); }
      .quiz-step.active { border-color: var(--rust); background: var(--rust-dim); color: var(--rust-light); }
      .quiz-step.solved { border-color: var(--success); background: var(--success-bg); color: var(--success); }
      .quiz-step.locked { opacity: 0.5; cursor: not-allowed; }
      .quiz-header-right { display: flex; align-items: center; gap: 12px; }
      .quiz-progress-text { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

      .quiz-layout { flex: 1; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
      .quiz-question-panel { padding: 20px; border-right: 1px solid var(--border-subtle); overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
      .quiz-q-header { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
      .quiz-q-header h3 { font-size: 1.1rem; font-weight: 700; width: 100%; }
      .quiz-q-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.75; white-space: pre-wrap; }
      .quiz-signatures, .quiz-constraints { display: flex; flex-direction: column; gap: 4px; }
      .quiz-sig { display: block; background: var(--bg-elevated); border: 1px solid var(--border-normal); border-radius: var(--radius-sm); padding: 5px 10px; font-size: 0.8rem; color: var(--syn-fn, #60a5fa); }
      .quiz-constraints ul { margin: 0; padding-left: 18px; color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; }

      .quiz-editor-panel { display: flex; flex-direction: column; padding: 12px; gap: 8px; overflow-y: auto; }
      .quiz-editor-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
      .quiz-editor-tabs { display: flex; gap: 4px; }
      .quiz-editor-tab { background: var(--bg-elevated); border: 1px solid var(--border-normal); border-bottom: none; border-radius: var(--radius-sm) var(--radius-sm) 0 0; padding: 5px 12px; font-size: 0.78rem; font-family: var(--font-mono, monospace); color: var(--text-muted); cursor: pointer; }
      .quiz-editor-tab.active { background: var(--bg-surface); color: var(--text-primary); border-color: var(--rust); }
      .quiz-tab-hint { font-size: 0.65rem; color: var(--text-faint, #64748b); margin-left: 4px; }
      .quiz-editor-actions { display: flex; align-items: center; gap: 6px; }
      .btn-save-done { background: none; color: var(--success, #4ade80); border-color: rgba(74,222,128,0.35); }

      .quiz-submit-summary { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: var(--radius-md); font-size: 0.875rem; }
      .quiz-submit-summary.pass { background: var(--success-bg); border: 1px solid rgba(74,222,128,0.3); color: var(--success); }
      .quiz-submit-summary.fail { background: var(--error-bg); border: 1px solid rgba(248,113,113,0.3); color: var(--error); }

      .quiz-result-hero { text-align: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 12px; max-width: 620px; width: 100%; }
      .quiz-result-icon { font-size: 3rem; }
      .quiz-final-score { font-size: 3.5rem; font-weight: 900; color: var(--text-primary); }
      .quiz-result-btns { display: flex; gap: 12px; margin-top: 8px; }
      .quiz-answers-review { max-width: 620px; width: 100%; }
      .quiz-answers-review h3 { margin-bottom: 12px; }
      .quiz-answer-card { display: flex; align-items: center; gap: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 16px; margin-bottom: 6px; }
      .quiz-answer-card.pass { border-color: rgba(74,222,128,0.25); }
      .quiz-answer-check { color: var(--success); font-weight: 800; }
      .quiz-answer-level { font-weight: 700; color: var(--rust-light); font-size: 0.8rem; }
      .quiz-answer-title { flex: 1; color: var(--text-secondary); font-size: 0.9rem; }

      @media (max-width: 900px) {
        .quiz-layout { grid-template-columns: 1fr; }
        .quiz-question-panel { border-right: none; border-bottom: 1px solid var(--border-subtle); }
      }
    `}</style>
  );
}
