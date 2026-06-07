import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import type { Exercise, ExecutionResult, TestResult, UserProgress } from '../types';
import { useRustExecution } from '../hooks/useRustExecution';

interface LessonPageProps {
  exercises: Exercise[];
  progress: UserProgress;
  onComplete: (exerciseId: number, code: string, testsPassed: number, testsTotal: number) => void;
}

type TabId = 'concept' | 'examples' | 'exercise' | 'hints';

export default function LessonPage({ exercises, progress, onComplete }: LessonPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exerciseId = parseInt(id ?? '1');
  const exercise = exercises.find((e) => e.id === exerciseId);

  const [activeTab, setActiveTab] = useState<TabId>('concept');
  const [code, setCode] = useState('');
  const [runResult, setRunResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const { runCode, runTests, isRunning, isTesting } = useRustExecution();
  const lessonProgress = progress.lessons[exerciseId];
  const isLocked = exerciseId > 1 && !progress.lessons[exerciseId - 1]?.completed;

  // Initialize code from progress or starter
  useEffect(() => {
    if (exercise) {
      const savedCode = progress.lessons[exerciseId]?.lastCode;
      setCode(savedCode || exercise.starterCode);
      setRunResult(null);
      setTestResults(null);
      setHintsShown(0);
      setShowSolution(false);
      setSubmitClicked(false);
      setActiveTab('concept');
    }
  }, [exerciseId, exercise]);

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setTestResults(null);
    const result = await runCode(code);
    setRunResult(result);
  }, [code, runCode]);

  const handleSubmit = useCallback(async () => {
    if (!exercise || !code.trim()) return;
    setSubmitClicked(true);
    setRunResult(null);
    setActiveTab('exercise');
    const results = await runTests(code, exercise.testCases);
    setTestResults(results);
    const passed = results.filter((r) => r.passed).length;
    onComplete(exerciseId, code, passed, results.length);
  }, [exercise, code, runTests, exerciseId, onComplete]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!exercise) {
    return (
      <div className="lesson-not-found">
        <h2>Exercise not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="lesson-locked">
        <div className="lesson-locked-inner">
          <div className="locked-icon">🔒</div>
          <h2>Exercise Locked</h2>
          <p>Complete exercise {exerciseId - 1} first to unlock this one.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/lesson/${exerciseId - 1}`)}
          >
            Go to Exercise {exerciseId - 1}
          </button>
        </div>
      </div>
    );
  }

  const allTestsPassed = testResults?.every((t) => t.passed) ?? false;
  const totalTests = exercise.testCases.length;
  const passedTests = testResults?.filter((t) => t.passed).length ?? 0;

  return (
    <div className="lesson-page animate-fade-in">
      {/* Top bar */}
      <div className="lesson-top-bar">
        <div className="lesson-meta">
          <span className={`badge badge-${difficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
          <span className="badge badge-info">{checkpointLabel(exercise.checkpoint)}</span>
          <h1 className="lesson-title">
            <span className="lesson-number">#{exercise.id}</span>
            {exercise.title}
          </h1>
        </div>
        <div className="lesson-actions-top">
          {lessonProgress?.completed && (
            <span className="badge badge-success">✓ Completed</span>
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/lesson/${exerciseId - 1}`)}
            disabled={exerciseId <= 1}
          >
            ← Prev
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(`/lesson/${exerciseId + 1}`)}
            disabled={exerciseId >= exercises.length}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="lesson-layout">
        {/* Left panel: content tabs */}
        <div className="lesson-left">
          <div className="tabs lesson-tabs">
            {(['concept', 'examples', 'exercise', 'hints'] as TabId[]).map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'concept' && '📚 Concept'}
                {tab === 'examples' && '💡 Examples'}
                {tab === 'exercise' && '🎯 Exercise'}
                {tab === 'hints' && `🔍 Hints (${hintsShown}/${exercise.hints.length})`}
              </button>
            ))}
          </div>

          <div className="lesson-tab-content">
            {activeTab === 'concept' && (
              <ConceptTab exercise={exercise} />
            )}
            {activeTab === 'examples' && (
              <ExamplesTab exercise={exercise} />
            )}
            {activeTab === 'exercise' && (
              <ExerciseTab exercise={exercise} />
            )}
            {activeTab === 'hints' && (
              <HintsTab
                exercise={exercise}
                hintsShown={hintsShown}
                onShowHint={() => setHintsShown((h) => Math.min(h + 1, exercise.hints.length))}
                showSolution={showSolution}
                onShowSolution={() => setShowSolution(true)}
              />
            )}
          </div>
        </div>

        {/* Right panel: editor + console */}
        <div className="lesson-right">
          <div className="editor-toolbar">
            <span className="editor-filename">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 1h5l3 3v7H2V1z" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              solution.rs
            </span>
            <div className="editor-toolbar-actions">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setCode(exercise.starterCode)}
                title="Reset to starter code"
              >
                ↺ Reset
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleRun}
                disabled={isRunning || isTesting}
                title="Ctrl+Enter"
              >
                {isRunning ? <><span className="spinner" style={{width:14,height:14}} /> Running...</> : '▶ Run'}
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
                disabled={isRunning || isTesting}
              >
                {isTesting ? <><span className="spinner" style={{width:14,height:14}} /> Testing...</> : '✓ Submit'}
              </button>
            </div>
          </div>

          <CodeEditor
            value={code}
            onChange={setCode}
            height="360px"
          />

          <div className="console-section">
            <Console
              output={testResults ? null : runResult}
              testResults={submitClicked ? testResults : null}
              isRunning={isRunning}
              isTesting={isTesting}
            />
          </div>

          {/* Progress indicator */}
          {submitClicked && testResults && (
            <div className={`lesson-submit-summary ${allTestsPassed ? 'pass' : 'fail'}`}>
              {allTestsPassed ? (
                <>
                  <span>🎉</span>
                  <span>All {totalTests} tests passed! Exercise complete.</span>
                  {exerciseId < exercises.length && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => navigate(`/lesson/${exerciseId + 1}`)}
                    >
                      Next Exercise →
                    </button>
                  )}
                </>
              ) : (
                <>
                  <span>⚠️</span>
                  <span>{passedTests}/{totalTests} tests passed. Keep trying!</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .lesson-page { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
        .lesson-not-found, .lesson-locked {
          display: flex; align-items: center; justify-content: center;
          height: 100%; text-align: center;
        }
        .lesson-locked-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .locked-icon { font-size: 3rem; }
        .lesson-top-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 24px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .lesson-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .lesson-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; }
        .lesson-number { color: var(--text-muted); margin-right: 8px; font-family: var(--font-mono); font-size: 0.875rem; }
        .lesson-actions-top { display: flex; align-items: center; gap: 8px; }
        .lesson-layout { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 0; overflow: hidden; }
        .lesson-left {
          display: flex; flex-direction: column;
          border-right: 1px solid var(--border-subtle);
          overflow: hidden;
        }
        .lesson-tabs { border-bottom: 1px solid var(--border-subtle); padding: 0 16px; flex-shrink: 0; }
        .lesson-tab-content { flex: 1; overflow-y: auto; padding: 20px; }
        .lesson-right { display: flex; flex-direction: column; padding: 12px; gap: 8px; overflow-y: auto; }
        .editor-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 6px 0;
        }
        .editor-filename {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8125rem; color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .editor-toolbar-actions { display: flex; align-items: center; gap: 6px; }
        .console-section { flex-shrink: 0; }
        .lesson-submit-summary {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .lesson-submit-summary.pass { background: var(--success-bg); color: var(--success); }
        .lesson-submit-summary.fail { background: var(--warning-bg); color: var(--warning); }
      `}</style>
    </div>
  );
}

function ConceptTab({ exercise }: { exercise: Exercise }) {
  return (
    <div className="concept-tab animate-fade-in">
      <div className="concept-block">
        <h3>The Concept</h3>
        <div className="concept-text">{exercise.concept}</div>
      </div>
      <div className="concept-block">
        <h3>Why It Exists</h3>
        <p className="text-secondary">{exercise.whyItExists}</p>
      </div>
      {exercise.comparisons.length > 0 && (
        <div className="concept-block">
          <h3>Compared to Other Languages</h3>
          <div className="comparisons-grid">
            {exercise.comparisons.map((comp) => (
              <div key={comp.language} className="comparison-card">
                <div className="comparison-lang">{comp.language}</div>
                <pre className="comparison-code"><code>{comp.code}</code></pre>
                <p className="comparison-note">{comp.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {exercise.videos.length > 0 && (
        <div className="concept-block">
          <h3>📺 Video Resources</h3>
          <div className="videos-list">
            {exercise.videos.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
              >
                <div className="video-thumb">▶</div>
                <div>
                  <div className="video-title">{video.title}</div>
                  <div className="video-desc">{video.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <style>{`
        .concept-tab { display: flex; flex-direction: column; gap: 24px; }
        .concept-block h3 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }
        .concept-text { color: var(--text-secondary); line-height: 1.75; white-space: pre-wrap; font-size: 0.9rem; }
        .comparisons-grid { display: flex; flex-direction: column; gap: 12px; }
        .comparison-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-md);
          padding: 12px;
        }
        .comparison-lang {
          font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--rust-light);
          margin-bottom: 8px;
        }
        .comparison-code {
          background: var(--bg-base);
          border-radius: var(--radius-sm);
          padding: 10px;
          font-size: 0.8rem;
          overflow-x: auto;
          margin-bottom: 8px;
          color: var(--text-primary);
          white-space: pre-wrap;
        }
        .comparison-note { font-size: 0.8125rem; color: var(--text-muted); margin: 0; }
        .videos-list { display: flex; flex-direction: column; gap: 8px; }
        .video-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition);
        }
        .video-card:hover { border-color: var(--rust); background: var(--rust-dim); }
        .video-thumb {
          width: 40px; height: 40px;
          background: var(--rust-dim);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--rust-light);
          font-size: 1rem;
          flex-shrink: 0;
        }
        .video-title { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
        .video-desc { font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; }
      `}</style>
    </div>
  );
}

function ExamplesTab({ exercise }: { exercise: Exercise }) {
  return (
    <div className="examples-tab animate-fade-in">
      {exercise.guidedExamples.map((example, i) => (
        <div key={i} className="example-block">
          <div className="example-header">
            <span className="example-num">Example {i + 1}</span>
            <h4 className="example-title">{example.title}</h4>
          </div>
          <p className="example-explanation">{example.explanation}</p>
          <div className="example-code-wrap">
            <CodeEditor value={example.code} onChange={() => {}} readOnly height="200px" />
          </div>
        </div>
      ))}
      <style>{`
        .examples-tab { display: flex; flex-direction: column; gap: 24px; }
        .example-block {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .example-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .example-num {
          background: var(--rust-dim); color: var(--rust-light);
          font-size: 0.7rem; font-weight: 700;
          padding: 2px 8px; border-radius: 999px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .example-title { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); }
        .example-explanation { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.6; }
        .example-code-wrap { border-radius: var(--radius-md); overflow: hidden; }
      `}</style>
    </div>
  );
}

function ExerciseTab({ exercise }: { exercise: Exercise }) {
  return (
    <div className="exercise-tab animate-fade-in">
      <div className="exercise-question-card">
        <div className="exercise-question-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 4v4M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Exercise {exercise.id} — {exercise.title}
        </div>
        <div className="exercise-question">{exercise.question}</div>
      </div>

      {exercise.functionSignatures.length > 0 && (
        <div className="exercise-section">
          <h4>Required Signatures</h4>
          <div className="signatures-list">
            {exercise.functionSignatures.map((sig, i) => (
              <code key={i} className="signature-item">{sig}</code>
            ))}
          </div>
        </div>
      )}

      {exercise.constraints.length > 0 && (
        <div className="exercise-section">
          <h4>Constraints</h4>
          <ul className="constraints-list">
            {exercise.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="exercise-section">
        <h4>Tests ({exercise.testCases.length} total)</h4>
        <div className="test-cases-preview">
          {exercise.testCases.filter((tc) => !tc.hidden).slice(0, 3).map((tc) => (
            <div key={tc.id} className="test-case-preview">
              <div className="test-case-desc">{tc.description}</div>
              <div className="test-case-expected">Expected: <code>{tc.expectedOutput}</code></div>
            </div>
          ))}
          {exercise.testCases.some((tc) => tc.hidden) && (
            <div className="test-case-hidden-note">
              + {exercise.testCases.filter((tc) => tc.hidden).length} hidden test(s)
            </div>
          )}
        </div>
      </div>

      <style>{`
        .exercise-tab { display: flex; flex-direction: column; gap: 20px; }
        .exercise-question-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-lg);
          padding: 20px;
        }
        .exercise-question-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--rust-light);
          margin-bottom: 12px;
        }
        .exercise-question { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.75; white-space: pre-wrap; }
        .exercise-section h4 { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
        .signatures-list { display: flex; flex-direction: column; gap: 4px; }
        .signature-item {
          display: block;
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
          font-size: 0.8125rem;
          color: var(--syn-fn);
        }
        .constraints-list { display: flex; flex-direction: column; gap: 4px; }
        .constraints-list li { font-size: 0.875rem; color: var(--text-secondary); padding-left: 16px; position: relative; }
        .constraints-list li::before { content: '•'; position: absolute; left: 4px; color: var(--rust); }
        .test-cases-preview { display: flex; flex-direction: column; gap: 6px; }
        .test-case-preview {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
        }
        .test-case-desc { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px; }
        .test-case-expected { font-size: 0.75rem; color: var(--text-muted); }
        .test-case-expected code { color: var(--success); background: var(--success-bg); padding: 1px 4px; border-radius: 2px; }
        .test-case-hidden-note {
          font-size: 0.75rem; color: var(--text-muted);
          text-align: center; padding: 6px;
          border: 1px dashed var(--border-normal);
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}

function HintsTab({
  exercise,
  hintsShown,
  onShowHint,
  showSolution,
  onShowSolution,
}: {
  exercise: Exercise;
  hintsShown: number;
  onShowHint: () => void;
  showSolution: boolean;
  onShowSolution: () => void;
}) {
  return (
    <div className="hints-tab animate-fade-in">
      <div className="alert alert-info" style={{ marginBottom: 16 }}>
        Hints help you understand the concept without giving away the answer directly.
        Try to solve it yourself first!
      </div>

      {exercise.hints.slice(0, hintsShown).map((hint, i) => (
        <div key={i} className="hint-card animate-slide-up">
          <div className="hint-label">Hint {i + 1}</div>
          <p>{hint}</p>
        </div>
      ))}

      {hintsShown < exercise.hints.length && (
        <button className="btn btn-secondary w-full" onClick={onShowHint}>
          💡 Show Hint {hintsShown + 1} of {exercise.hints.length}
        </button>
      )}

      {hintsShown === exercise.hints.length && !showSolution && (
        <div className="solution-gate">
          <p className="text-secondary text-sm">
            You've seen all hints. Only view the solution if you're truly stuck.
          </p>
          <button className="btn btn-ghost btn-sm" onClick={onShowSolution}>
            👁 View Solution
          </button>
        </div>
      )}

      {showSolution && (
        <div className="solution-block animate-slide-up">
          <div className="solution-label">Solution</div>
          <CodeEditor value={exercise.solution} onChange={() => {}} readOnly height="300px" />
        </div>
      )}

      <style>{`
        .hints-tab { display: flex; flex-direction: column; gap: 12px; }
        .hint-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-left: 3px solid var(--accent-yellow);
          border-radius: var(--radius-md);
          padding: 14px 16px;
        }
        .hint-label {
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--accent-yellow);
          margin-bottom: 6px;
        }
        .hint-card p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
        .solution-gate {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 16px;
          border: 1px dashed var(--border-normal);
          border-radius: var(--radius-md);
          text-align: center;
        }
        .solution-block { }
        .solution-label {
          font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}

function difficultyColor(d: string) {
  return { easiest: 'success', easy: 'success', medium: 'warning', hard: 'error', hardest: 'error' }[d] ?? 'info';
}

function checkpointLabel(cp: string) {
  return {
    intro: 'Intro',
    checkpoint1: 'CP1',
    checkpoint2: 'CP2',
    checkpoint3: 'CP3',
    final: 'Final',
  }[cp] ?? cp;
}
