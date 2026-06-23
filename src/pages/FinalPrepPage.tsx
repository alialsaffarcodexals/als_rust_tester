import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import type { ExecutionResult, TestResult } from '../types';
import { useRustExecution } from '../hooks/useRustExecution';
import { finalPrepChallenges, FINAL_PREP_LEVELS } from '../data/finalPrepChallenges';
import { conceptLibrary } from '../data/conceptLibrary';
import DocumentationPanel from '../components/learn/DocumentationPanel';

const STORAGE_KEY = 'rustpath_final_prep_v1';

interface SavedState {
  codes: Record<string, string>;
  solved: string[];
}

function loadState(): SavedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SavedState;
  } catch {
    /* ignore */
  }
  return { codes: {}, solved: [] };
}

// The Final Preparation Quiz: a leveled bank of self-contained coding
// challenges (levels 1-9). The student writes a full solution and grades it by
// running the challenge's tests on the Rust playground.
export default function FinalPrepPage() {
  const navigate = useNavigate();
  const { runCode, runTests, isRunning, isTesting } = useRustExecution();

  const [level, setLevel] = useState(1);
  const levelChallenges = useMemo(() => finalPrepChallenges.filter((c) => c.level === level), [level]);
  const [activeId, setActiveId] = useState<string>(() => finalPrepChallenges.find((c) => c.level === 1)?.id ?? '');

  const [codes, setCodes] = useState<Record<string, string>>(() => loadState().codes);
  const [solved, setSolved] = useState<Set<string>>(() => new Set(loadState().solved));
  const [runResult, setRunResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [timeLeft, setTimeLeft] = useState(0);

  // Always resolve the active challenge within the current level.
  const active = levelChallenges.find((c) => c.id === activeId) ?? levelChallenges[0];

  // When the level changes, jump to its first challenge.
  useEffect(() => {
    setActiveId(levelChallenges[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // Reset console/hints when switching challenge.
  useEffect(() => {
    setRunResult(null);
    setTestResults(null);
    setHintsShown(0);
  }, [activeId]);

  // Exam mode: a per-challenge countdown that emphasises solving under pressure.
  const examSeconds = (d: string) =>
    ({ easiest: 300, easy: 300, medium: 480, hard: 720, hardest: 900 } as Record<string, number>)[d] ?? 480;
  useEffect(() => {
    if (mode !== 'exam' || !active) return;
    setTimeLeft(examSeconds(active.difficulty));
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activeId]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const persist = useCallback((nextCodes: Record<string, string>, nextSolved: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ codes: nextCodes, solved: [...nextSolved] }));
    } catch {
      /* ignore */
    }
  }, []);

  if (!active) {
    return <div className="page-body">No challenges available.</div>;
  }

  const code = codes[active.id] ?? active.starter;

  const setCode = (v: string) => {
    const next = { ...codes, [active.id]: v };
    setCodes(next);
    persist(next, solved);
  };

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setTestResults(null);
    const result = await runCode(code);
    setRunResult(result);
  }, [code, runCode]);

  const handleSubmit = useCallback(async () => {
    setRunResult(null);
    const results = await runTests(code, active.testCases);
    setTestResults(results);
    const allPassed = results.length > 0 && results.every((r) => r.passed);
    if (allPassed && !solved.has(active.id)) {
      const next = new Set(solved);
      next.add(active.id);
      setSolved(next);
      persist(codes, next);
    }
  }, [code, active, runTests, solved, codes, persist]);

  const handleReset = () => setCode(active.starter);

  const solvedInLevel = levelChallenges.filter((c) => solved.has(c.id)).length;
  const totalSolved = solved.size;
  const allTestsPassed = testResults != null && testResults.length > 0 && testResults.every((t) => t.passed);
  const concepts = active.concepts.map((id) => conceptLibrary[id]?.name).filter(Boolean) as string[];

  return (
    <div className="fp-root">
      <div className="fp-header">
        <div className="fp-header-left">
          <button className="fp-back" onClick={() => navigate('/')} title="Dashboard">🏠</button>
          <span className="fp-title">🏁 Final Preparation Quiz</span>
        </div>
        <div className="fp-header-right">
          {mode === 'exam' && (
            <span className={`fp-timer ${timeLeft === 0 ? 'up' : timeLeft < 60 ? 'warn' : ''}`}>
              ⏱ {timeLeft === 0 ? "Time's up" : formatTime(timeLeft)}
            </span>
          )}
          <div className="fp-mode" role="group" aria-label="Quiz mode">
            <button className={mode === 'practice' ? 'active' : ''} onClick={() => setMode('practice')} title="Show hints and documentation">📖 Practice</button>
            <button className={mode === 'exam' ? 'active' : ''} onClick={() => setMode('exam')} title="Hide hints, add a timer — solve under pressure">⏱ Exam</button>
          </div>
          <span className="fp-progress">{totalSolved}/{finalPrepChallenges.length} solved</span>
        </div>
      </div>

      {/* Level rail */}
      <div className="fp-levels">
        {FINAL_PREP_LEVELS.map((lvl) => {
          const inLvl = finalPrepChallenges.filter((c) => c.level === lvl);
          const done = inLvl.every((c) => solved.has(c.id)) && inLvl.length > 0;
          const priority = lvl <= 6;
          return (
            <button
              key={lvl}
              className={`fp-level ${level === lvl ? 'active' : ''} ${done ? 'done' : ''} ${priority ? 'priority' : ''}`}
              onClick={() => setLevel(lvl)}
              title={priority ? 'Priority level' : 'Bonus level'}
            >
              {done ? '✓' : `L${lvl}`}
            </button>
          );
        })}
      </div>

      <div className="fp-layout">
        {/* Left: challenge picker + brief */}
        <div className="fp-brief">
          <div className="fp-chal-tabs">
            {levelChallenges.map((c) => (
              <button
                key={c.id}
                className={`fp-chal-tab ${c.id === active.id ? 'active' : ''} ${solved.has(c.id) ? 'done' : ''}`}
                onClick={() => setActiveId(c.id)}
              >
                {solved.has(c.id) ? '✓ ' : ''}{c.title}
              </button>
            ))}
          </div>

          <div className="fp-chal">
            <div className="fp-chal-head">
              <span className="badge badge-rust">Level {active.level}</span>
              <span className={`badge badge-${difficultyColor(active.difficulty)}`}>{active.difficulty}</span>
              {solved.has(active.id) && <span className="badge badge-success">✓ Solved</span>}
            </div>
            <h3 className="fp-chal-title">{active.title}</h3>
            <p className="fp-chal-desc">{active.description}</p>

            <div className="fp-section">
              <div className="fp-section-label">Requirements</div>
              <ul className="fp-list">{active.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>

            <div className="fp-section">
              <div className="fp-section-label">Expected behavior</div>
              <p className="fp-expected">{active.expectedBehavior}</p>
            </div>

            {concepts.length > 0 && (
              <div className="fp-chips">{concepts.map((n) => <span key={n} className="fp-chip">{n}</span>)}</div>
            )}

            {mode === 'practice' ? (
              <>
                <div className="fp-hints">
                  {active.hints.slice(0, hintsShown).map((h, i) => (
                    <div key={i} className="fp-hint"><span className="fp-hint-label">Hint {i + 1}</span><span>{h}</span></div>
                  ))}
                  {hintsShown < active.hints.length && (
                    <button className="btn btn-ghost btn-sm" onClick={() => setHintsShown((h) => h + 1)}>
                      💡 Show hint {hintsShown + 1} of {active.hints.length}
                    </button>
                  )}
                </div>

                {active.docs && (
                  <details className="fp-docs">
                    <summary>📚 Documentation</summary>
                    <DocumentationPanel docs={active.docs} />
                  </details>
                )}
              </>
            ) : (
              <div className="fp-exam-note">⏱ Exam mode — hints and documentation are hidden. Switch to Practice if you get stuck.</div>
            )}
          </div>
        </div>

        {/* Right: editor + console */}
        <div className="fp-editor">
          <div className="fp-toolbar">
            <span className="fp-filename">solution.rs</span>
            <div className="fp-actions">
              <button className="btn btn-ghost btn-sm" onClick={handleReset}>↺ Reset</button>
              <button className="btn btn-secondary btn-sm" onClick={handleRun} disabled={isRunning || isTesting}>
                {isRunning ? 'Running…' : '▶ Run'}
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={isRunning || isTesting}>
                {isTesting ? 'Testing…' : '✓ Submit'}
              </button>
            </div>
          </div>

          <CodeEditor value={code} onChange={setCode} height="320px" />

          <Console
            output={testResults ? null : runResult}
            testResults={testResults}
            isRunning={isRunning}
            isTesting={isTesting}
          />

          {testResults && (
            <div className={`fp-summary ${allTestsPassed ? 'pass' : 'fail'}`}>
              {allTestsPassed
                ? `🎉 Passed! Level ${level}: ${solvedInLevel}/${levelChallenges.length} solved.`
                : `⚠️ ${testResults.filter((t) => t.passed).length}/${testResults.length} tests passed — keep going.`}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fp-root { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
        .fp-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 18px; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); flex-shrink: 0; }
        .fp-header-left { display: flex; align-items: center; gap: 10px; }
        .fp-back { background: none; border: none; font-size: 1rem; cursor: pointer; }
        .fp-title { font-weight: 700; font-size: 0.95rem; color: var(--text-primary); }
        .fp-progress { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .fp-header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .fp-mode { display: inline-flex; border: 1px solid var(--border-normal); border-radius: var(--radius-md); overflow: hidden; }
        .fp-mode button { background: var(--bg-elevated); border: none; padding: 5px 12px; font-size: 0.78rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition); }
        .fp-mode button + button { border-left: 1px solid var(--border-normal); }
        .fp-mode button.active { background: var(--rust-dim); color: var(--rust-light); font-weight: 600; }
        .fp-timer { font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
        .fp-timer.warn { color: var(--warning); }
        .fp-timer.up { color: var(--error); animation: pulse 1s ease infinite; }
        .fp-exam-note { font-size: 0.82rem; color: var(--text-muted); background: var(--bg-elevated); border: 1px dashed var(--border-normal); border-radius: var(--radius-md); padding: 10px 12px; }
        .fp-levels { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 18px; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); flex-shrink: 0; }
        .fp-level { width: 36px; height: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-normal); background: var(--bg-elevated); color: var(--text-muted); font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all var(--transition); }
        .fp-level.priority { border-color: var(--border-strong); }
        .fp-level.active { border-color: var(--rust); background: var(--rust-dim); color: var(--rust-light); }
        .fp-level.done { border-color: var(--success); background: var(--success-bg); color: var(--success); }
        .fp-layout { flex: 1; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
        .fp-brief { padding: 16px; border-right: 1px solid var(--border-subtle); overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
        .fp-chal-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
        .fp-chal-tab { background: var(--bg-elevated); border: 1px solid var(--border-normal); border-radius: 999px; padding: 5px 12px; font-size: 0.78rem; color: var(--text-secondary); cursor: pointer; }
        .fp-chal-tab.active { border-color: var(--rust); background: var(--rust-dim); color: var(--rust-light); }
        .fp-chal-tab.done { border-color: var(--success); color: var(--success); }
        .fp-chal { display: flex; flex-direction: column; gap: 12px; }
        .fp-chal-head { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .fp-chal-title { font-size: 1.1rem; font-weight: 700; margin: 0; }
        .fp-chal-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65; margin: 0; }
        .fp-section { display: flex; flex-direction: column; gap: 5px; }
        .fp-section-label { font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--rust-light); }
        .fp-list { margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .fp-list li { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; padding-left: 16px; position: relative; }
        .fp-list li::before { content: '•'; position: absolute; left: 4px; color: var(--rust); }
        .fp-expected { font-size: 0.84rem; color: var(--text-secondary); margin: 0; font-family: var(--font-mono); }
        .fp-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .fp-chip { font-size: 0.72rem; color: var(--text-secondary); background: var(--bg-elevated); border: 1px solid var(--border-normal); border-radius: 999px; padding: 2px 10px; }
        .fp-hints { display: flex; flex-direction: column; gap: 6px; }
        .fp-hint { display: flex; gap: 8px; align-items: baseline; background: var(--bg-elevated); border-left: 3px solid var(--accent-yellow); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; color: var(--text-secondary); }
        .fp-hint-label { font-size: 0.66rem; font-weight: 700; text-transform: uppercase; color: var(--accent-yellow); flex-shrink: 0; }
        .fp-docs summary { cursor: pointer; font-size: 0.84rem; color: var(--accent-blue); padding: 4px 0; }
        .fp-docs[open] summary { margin-bottom: 8px; }
        .fp-editor { display: flex; flex-direction: column; padding: 12px; gap: 8px; overflow-y: auto; }
        .fp-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
        .fp-filename { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); }
        .fp-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .fp-summary { padding: 10px 14px; border-radius: var(--radius-md); font-size: 0.86rem; }
        .fp-summary.pass { background: var(--success-bg); border: 1px solid rgba(74,222,128,0.3); color: var(--success); }
        .fp-summary.fail { background: var(--error-bg); border: 1px solid rgba(248,113,113,0.3); color: var(--error); }
        @media (max-width: 900px) {
          .fp-layout { grid-template-columns: 1fr; overflow: visible; }
          .fp-brief { border-right: none; border-bottom: 1px solid var(--border-subtle); max-height: 50vh; }
          .fp-root { overflow: auto; }
        }
        @media (max-width: 768px) {
          .fp-header { padding: 8px 14px; } .fp-levels { padding: 8px 14px; }
          .fp-brief { padding: 14px; } .fp-editor { padding: 8px; }
        }
      `}</style>
    </div>
  );
}

function difficultyColor(d: string) {
  return ({ easiest: 'success', easy: 'success', medium: 'warning', hard: 'error', hardest: 'error' } as Record<string, string>)[d] ?? 'info';
}
