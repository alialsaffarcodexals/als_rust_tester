import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import type { Exercise, ExecutionResult, TestResult, UserProgress } from '../types';
import { useRustExecution } from '../hooks/useRustExecution';
import { zone01Guides } from '../data/zone01_guides';
import { zone01Walkthroughs } from '../data/zone01_walkthroughs';
import { zone01Cp3Learning } from '../data/zone01_cp3_learning';
import ExerciseOverview from '../components/learn/ExerciseOverview';
import OfficialDescription from '../components/learn/OfficialDescription';
import ConceptGuide from '../components/learn/ConceptGuide';
import SimilarExample from '../components/learn/SimilarExample';
import SideQuiz from '../components/learn/SideQuiz';
import TerminalSimulator from '../components/learn/TerminalSimulator';
import Walkthrough from '../components/learn/Walkthrough';
import SelfAssessment from '../components/learn/SelfAssessment';

interface LessonPageProps {
  exercises: Exercise[];
  progress: UserProgress;
  onComplete: (exerciseId: number, code: string, testsPassed: number, testsTotal: number) => void;
}

type TabId = 'concept' | 'examples' | 'exercise' | 'hints';
type JourneyTab =
  | 'overview'
  | 'description'
  | 'concepts'
  | 'practice'
  | 'sidequiz'
  | 'terminal'
  | 'walkthrough'
  | 'selfcheck';

export default function LessonPage({ exercises, progress, onComplete }: LessonPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exerciseId = parseInt(id ?? '1');
  const exercise = exercises.find((e) => e.id === exerciseId);

  const [activeTab, setActiveTab] = useState<TabId>('concept');
  const [activeEditorTab, setActiveEditorTab] = useState<'solution' | 'main'>('solution');
  const [code, setCode] = useState('');
  const [mainCode, setMainCode] = useState('');
  const [runResult, setRunResult] = useState<ExecutionResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [journeyTab, setJourneyTab] = useState<JourneyTab>('overview');

  const isZone01 = exercise?.checkpoint?.startsWith('zone01') ?? false;
  const hasWalkthrough = !!exercise && exercise.checkpoint === 'zone01_cp3' && !!zone01Walkthroughs[exercise.slug];
  // CP3 guided-learning content (data-driven journey). Undefined for other zones
  // or any CP3 exercise without authored content — those fall back to the
  // original four-tab layout, so there is no regression.
  const cp3Learning =
    exercise && exercise.checkpoint === 'zone01_cp3'
      ? zone01Cp3Learning[exercise.slug]
      : undefined;

  const { runCode, runTests, isRunning, isTesting } = useRustExecution();
  const lessonProgress = progress.lessons[exerciseId];

  // Initialize code from draft save > submitted code > starter
  useEffect(() => {
    if (exercise) {
      const isZ01 = exercise.checkpoint.startsWith('zone01');
      const draft = localStorage.getItem(`rustpath_lesson_draft_${exerciseId}`);
      const submitted = progress.lessons[exerciseId]?.lastCode;
      setCode(draft || submitted || exercise.starterCode);
      if (isZ01) {
        const savedMain = localStorage.getItem(`rustpath_lesson_main_${exerciseId}`);
        setMainCode(savedMain || exercise.testCases[0]?.code || '');
      } else {
        setMainCode('');
      }
      setActiveEditorTab('solution');
      setRunResult(null);
      setTestResults(null);
      setHintsShown(0);
      setShowSolution(false);
      setSubmitClicked(false);
      setSaved(false);
      setShowGuideModal(false);
      setShowSolutionModal(false);
      setShowWalkthrough(false);
      setActiveTab('concept');
      setJourneyTab('overview');
    }
  }, [exerciseId, exercise]);

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setTestResults(null);
    const codeToRun = isZone01 ? `${code}\n\n${mainCode}` : code;
    const result = await runCode(codeToRun);
    setRunResult(result);
  }, [code, mainCode, runCode, isZone01]);

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

  const handleSave = useCallback(() => {
    localStorage.setItem(`rustpath_lesson_draft_${exerciseId}`, code);
    if (isZone01) {
      localStorage.setItem(`rustpath_lesson_main_${exerciseId}`, mainCode);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [exerciseId, code, mainCode, isZone01]);

  const handleReset = useCallback(() => {
    if (!exercise) return;
    if (isZone01 && activeEditorTab === 'main') {
      setMainCode(exercise.testCases[0]?.code ?? '');
    } else {
      setCode(exercise.starterCode);
    }
  }, [isZone01, activeEditorTab, exercise]);

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
          {cp3Learning ? (
            <div className="tabs lesson-tabs lesson-journey-tabs">
              {([
                ['overview', '🎯 Overview'],
                ['description', '📄 Description'],
                ['concepts', '💡 Concepts'],
                ['practice', '🔁 Practice'],
                ['sidequiz', '🧩 Side Quiz'],
                ...(cp3Learning.terminal ? [['terminal', '🖥️ Terminal'] as [JourneyTab, string]] : []),
                ...(hasWalkthrough ? [['walkthrough', '🪜 Step-by-Step'] as [JourneyTab, string]] : []),
                ['selfcheck', '✅ Self-Check'],
              ] as [JourneyTab, string][]).map(([tab, label]) => (
                <button
                  key={tab}
                  className={`tab ${journeyTab === tab ? 'active' : ''}`}
                  onClick={() => setJourneyTab(tab)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
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
          )}

          {isZone01 && (
            <div className="zone01-guide-bar">
              <button
                className="btn btn-sm zone01-guide-btn"
                onClick={() => setShowGuideModal(true)}
              >
                📖 Guide
              </button>
              <button
                className="btn btn-sm zone01-solution-btn"
                onClick={() => setShowSolutionModal(true)}
              >
                🔑 Show Solution
              </button>
              {hasWalkthrough && (
                <button
                  className="btn btn-sm zone01-walkthrough-btn"
                  onClick={() => setShowWalkthrough(true)}
                >
                  🪜 Step-by-Step
                </button>
              )}
              {exercise.checkpoint === 'zone01_cp3' && (
                <a
                  className="btn btn-sm zone01-subject-link"
                  href={`https://github.com/01-edu/public/tree/master/subjects/${exercise.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open the official 01-edu subject description on GitHub"
                >
                  📄 Description
                </a>
              )}
            </div>
          )}

          <div className="lesson-tab-content">
            {cp3Learning ? (
              <>
                {journeyTab === 'overview' && (
                  <ExerciseOverview overview={cp3Learning.overview} objectives={cp3Learning.objectives} />
                )}
                {journeyTab === 'description' && (
                  <OfficialDescription slug={exercise.slug} description={cp3Learning.officialDescription} />
                )}
                {journeyTab === 'concepts' && (
                  <ConceptGuide conceptIds={cp3Learning.conceptIds} notes={cp3Learning.conceptNotes} />
                )}
                {journeyTab === 'practice' && (
                  <SimilarExample data={cp3Learning.similar} />
                )}
                {journeyTab === 'sidequiz' && (
                  <SideQuiz steps={cp3Learning.sideQuiz} title={`${exercise.title} — Side Quiz`} />
                )}
                {journeyTab === 'terminal' && cp3Learning.terminal && (
                  <TerminalSimulator config={cp3Learning.terminal} />
                )}
                {journeyTab === 'walkthrough' && (
                  <Walkthrough steps={zone01Walkthroughs[exercise.slug] ?? []} onLoad={setCode} />
                )}
                {journeyTab === 'selfcheck' && (
                  <SelfAssessment
                    prompts={cp3Learning.selfAssessment}
                    onViewSolution={() => setShowSolutionModal(true)}
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === 'concept' && <ConceptTab exercise={exercise} />}
                {activeTab === 'examples' && <ExamplesTab exercise={exercise} />}
                {activeTab === 'exercise' && <ExerciseTab exercise={exercise} />}
                {activeTab === 'hints' && (
                  <HintsTab
                    exercise={exercise}
                    hintsShown={hintsShown}
                    onShowHint={() => setHintsShown((h) => Math.min(h + 1, exercise.hints.length))}
                    showSolution={showSolution}
                    onShowSolution={() => setShowSolution(true)}
                  />
                )}
              </>
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
                onClick={handleReset}
                title={isZone01 && activeEditorTab === 'main' ? 'Reset main.rs to default' : 'Reset to starter code'}
              >
                ↺ Reset
              </button>
              <button
                className={`btn btn-sm${saved ? ' btn-save-done' : ' btn-ghost'}`}
                onClick={handleSave}
                title="Save your code (persists after closing)"
              >
                {saved ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:3}}>
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Saved
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:3}}>
                      <path d="M2 2h6l2 2v6H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                      <path d="M4 2v2.5h4V2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                      <rect x="3.5" y="7" width="5" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    Save
                  </>
                )}
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

          {isZone01 && (
            <div className="lesson-editor-tabs">
              <button
                className={`lesson-editor-tab ${activeEditorTab === 'solution' ? 'active' : ''}`}
                onClick={() => setActiveEditorTab('solution')}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 1h5l3 3v7H2V1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                  <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                </svg>
                solution.rs
              </button>
              <button
                className={`lesson-editor-tab ${activeEditorTab === 'main' ? 'active' : ''}`}
                onClick={() => setActiveEditorTab('main')}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 1h5l3 3v7H2V1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                  <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                </svg>
                main.rs
                <span className="lesson-editor-tab-hint">caller</span>
              </button>
            </div>
          )}
          <div style={{ display: !isZone01 || activeEditorTab === 'solution' ? 'block' : 'none' }}>
            <CodeEditor value={code} onChange={setCode} height="360px" />
          </div>
          {isZone01 && (
            <div style={{ display: activeEditorTab === 'main' ? 'block' : 'none' }}>
              <CodeEditor value={mainCode} onChange={setMainCode} height="360px" />
            </div>
          )}

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

      {showGuideModal && (
        <GuideModal
          slug={exercise.slug}
          title={exercise.title}
          onClose={() => setShowGuideModal(false)}
        />
      )}
      {showWalkthrough && (
        <WalkthroughModal
          slug={exercise.slug}
          title={exercise.title}
          onClose={() => setShowWalkthrough(false)}
          onLoad={(c) => setCode(c)}
        />
      )}
      {showSolutionModal && (
        <SolutionModal
          slug={exercise.slug}
          title={exercise.title}
          onClose={() => setShowSolutionModal(false)}
        />
      )}

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
        .lesson-journey-tabs { flex-wrap: wrap; gap: 2px 4px; padding: 6px 12px 0; }
        .lesson-journey-tabs .tab { padding: 6px 10px; font-size: 0.8rem; }
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
        .btn-save-done { background: none; color: var(--success, #4ade80); border-color: rgba(74,222,128,0.35); }
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
        .lesson-editor-tabs {
          display: flex;
          gap: 2px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-bottom: none;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          padding: 4px 8px 0;
        }
        .lesson-editor-tab {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border: none;
          border-bottom: 2px solid transparent;
          background: none;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-mono);
          margin-bottom: -1px;
        }
        .lesson-editor-tab:hover { color: var(--text-secondary); }
        .lesson-editor-tab.active { color: var(--rust-light); border-bottom-color: var(--rust); }
        .lesson-editor-tab-hint {
          font-size: 0.62rem;
          padding: 1px 4px;
          background: var(--bg-elevated);
          border-radius: 3px;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-weight: 500;
        }
        .zone01-guide-bar {
          display: flex; gap: 8px; padding: 8px 16px;
          background: var(--bg-elevated);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .zone01-guide-btn {
          background: var(--rust-dim); color: var(--rust-light);
          border: 1px solid var(--rust); border-radius: 6px;
          font-weight: 600;
        }
        .zone01-guide-btn:hover { background: var(--rust); color: #fff; }
        .zone01-solution-btn {
          background: none; color: var(--text-secondary);
          border: 1px solid var(--border-normal); border-radius: 6px;
        }
        .zone01-solution-btn:hover { border-color: var(--rust-light); color: var(--rust-light); }
        .zone01-walkthrough-btn {
          background: none; color: var(--text-secondary);
          border: 1px solid var(--border-normal); border-radius: 6px;
        }
        .zone01-walkthrough-btn:hover { border-color: var(--rust); color: var(--rust-light); background: var(--rust-dim); }
        .zone01-subject-link {
          background: none; color: var(--text-secondary);
          border: 1px solid var(--border-normal); border-radius: 6px;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .zone01-subject-link:hover { border-color: var(--rust); color: var(--rust-light); }
        .zone01-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65); z-index: 2000;
          display: flex; align-items: center; justify-content: center;
        }
        .zone01-modal {
          background: var(--bg-surface);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-lg);
          width: min(820px, 92vw); max-height: 88vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .zone01-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-subtle); flex-shrink: 0;
        }
        .zone01-modal-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); }
        .zone01-modal-body {
          flex: 1; overflow-y: auto; padding: 20px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .guide-section-title {
          font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--rust-light); margin-bottom: 12px;
        }
        .guide-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-left: 3px solid var(--rust);
          border-radius: var(--radius-md);
          padding: 12px 16px; margin-bottom: 8px;
        }
        .guide-card-name {
          font-size: 0.875rem; font-weight: 600;
          color: var(--text-primary); font-family: var(--font-mono);
          margin-bottom: 4px;
        }
        .guide-card-sig {
          font-size: 0.78rem; color: var(--syn-fn);
          font-family: var(--font-mono);
          background: var(--bg-base); padding: 4px 8px;
          border-radius: var(--radius-sm); margin-bottom: 6px;
        }
        .guide-card-desc {
          font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65;
          white-space: pre-wrap;
        }
        .guide-card-example {
          margin-top: 8px; background: var(--bg-base);
          border-radius: var(--radius-sm); padding: 6px 10px;
          font-size: 0.8rem; color: var(--text-primary);
          font-family: var(--font-mono); white-space: pre-wrap;
        }
        .guide-empty {
          color: var(--text-muted); font-size: 0.875rem;
          text-align: center; padding: 24px;
        }
        @media (max-width: 900px) {
          .lesson-layout { grid-template-columns: 1fr; overflow: visible; }
          .lesson-left { border-right: none; border-bottom: 1px solid var(--border-subtle); max-height: 55vh; }
          .lesson-right { overflow: visible; }
        }
        @media (max-width: 768px) {
          .lesson-top-bar { padding: 10px 16px; gap: 8px; flex-wrap: wrap; }
          .lesson-meta { flex-wrap: wrap; gap: 4px; }
          .lesson-title { font-size: 0.9375rem; }
          .lesson-actions-top { gap: 4px; }
          .lesson-actions-top .btn-ghost { padding: 6px 8px; font-size: 0.8125rem; }
          .lesson-tabs { padding: 0 10px; }
          .tab { padding: 8px 10px; font-size: 0.8rem; }
          .lesson-tab-content { padding: 14px; }
          .editor-toolbar { flex-wrap: wrap; gap: 6px; }
          .editor-toolbar-actions { flex-wrap: wrap; gap: 4px; }
          .zone01-guide-bar { flex-wrap: wrap; gap: 6px; padding: 8px 12px; }
          .zone01-modal { width: 95vw; max-height: 92vh; }
          .zone01-modal-body { padding: 14px; }
        }
        @media (max-width: 480px) {
          .lesson-top-bar { padding: 8px 12px; }
          .lesson-tab-content { padding: 10px; }
          .lesson-right { padding: 8px; }
          .editor-toolbar-actions .btn-sm { padding: 5px 8px; font-size: 0.75rem; }
        }
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

function GuideModal({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const guide = zone01Guides[slug];
  return (
    <div className="zone01-modal-overlay" onClick={onClose}>
      <div className="zone01-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="zone01-modal-header">
          <span className="zone01-modal-title">📖 Guide — {title}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕ Close</button>
        </div>
        <div className="zone01-modal-body">
          {!guide ? (
            <div className="guide-empty">No guide available for this exercise yet.</div>
          ) : (
            <>
              {guide.builtinFunctions.length > 0 && (
                <div>
                  <div className="guide-section-title">🔧 Built-in Functions You Need</div>
                  {guide.builtinFunctions.map((fn, i) => (
                    <div key={i} className="guide-card">
                      <div className="guide-card-name">{fn.name}</div>
                      {fn.signature && <div className="guide-card-sig">{fn.signature}</div>}
                      <div className="guide-card-desc">{fn.description}</div>
                      {fn.example && (
                        <div className="guide-card-example">{fn.example}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {guide.concepts.length > 0 && (
                <div>
                  <div className="guide-section-title">💡 Concepts to Know</div>
                  {guide.concepts.map((c, i) => (
                    <div key={i} className="guide-card" style={{ borderLeftColor: 'var(--accent-yellow)' }}>
                      <div className="guide-card-name">{c.name}</div>
                      <div className="guide-card-desc">{c.description}</div>
                      {c.example && (
                        <div className="guide-card-example">{c.example}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {guide.dataStructures.length > 0 && (
                <div>
                  <div className="guide-section-title">🗂️ Data Structures</div>
                  {guide.dataStructures.map((ds, i) => (
                    <div key={i} className="guide-card" style={{ borderLeftColor: 'var(--accent-blue, #60a5fa)' }}>
                      <div className="guide-card-name">{ds.name}</div>
                      <div className="guide-card-desc">{ds.description}</div>
                      {ds.example && (
                        <div className="guide-card-example">{ds.example}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {guide.builtinFunctions.length === 0 &&
               guide.concepts.length === 0 &&
               guide.dataStructures.length === 0 && (
                <div className="guide-empty">No guide content available for this exercise yet.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SolutionModal({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const guide = zone01Guides[slug];
  const solution = guide?.annotatedSolution ?? '';
  return (
    <div className="zone01-modal-overlay" onClick={onClose}>
      <div className="zone01-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="zone01-modal-header">
          <span className="zone01-modal-title">🔑 Solution — {title}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕ Close</button>
        </div>
        <div className="zone01-modal-body">
          {!solution ? (
            <div className="guide-empty">Solution not available for this exercise yet.</div>
          ) : (
            <>
              <div className="alert alert-info" style={{ marginBottom: 0, flexShrink: 0 }}>
                The solution below has comments explaining each step. Read through it carefully rather than just copying it!
              </div>
              <CodeEditor value={solution} onChange={() => {}} readOnly height="480px" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function WalkthroughModal({
  slug,
  title,
  onClose,
  onLoad,
}: {
  slug: string;
  title: string;
  onClose: () => void;
  onLoad: (code: string) => void;
}) {
  const steps = zone01Walkthroughs[slug] ?? [];
  const total = steps.length;
  const [current, setCurrent] = useState(1);
  const [loaded, setLoaded] = useState(false);

  if (total === 0) return null;

  const safe = Math.min(Math.max(current, 1), total);
  const revealedCode = steps.slice(0, safe).map((s) => s.code).join('\n');
  const step = steps[safe - 1];
  const atStart = safe <= 1;
  const atEnd = safe >= total;

  return (
    <div className="zone01-modal-overlay" onClick={onClose}>
      <div className="zone01-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="zone01-modal-header">
          <span className="zone01-modal-title">🪜 Step-by-Step — {title}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕ Close</button>
        </div>
        <div className="zone01-modal-body wt-body">
          <div className="wt-progress">
            <div className="wt-progress-track">
              <div className="wt-progress-fill" style={{ width: `${(safe / total) * 100}%` }} />
            </div>
            <span className="wt-progress-label">Step {safe} / {total}</span>
          </div>

          <div className="wt-explain">
            <div className="wt-explain-badge">Lines added at this step</div>
            <pre className="wt-chunk"><code>{step.code}</code></pre>
            <p className="wt-explain-text">{step.explain}</p>
          </div>

          <div className="wt-code-label">🦀 Solution so far — hover any built-in for its docs</div>
          <CodeEditor value={revealedCode} onChange={() => {}} readOnly height="280px" />

          <div className="wt-nav">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrent((c) => Math.max(1, c - 1))}
              disabled={atStart}
            >
              ← Back
            </button>
            <div className="wt-nav-right">
              <button
                className={`btn btn-sm ${loaded ? 'btn-wt-loaded' : 'btn-ghost'}`}
                onClick={() => {
                  onLoad(revealedCode);
                  setLoaded(true);
                  setTimeout(() => setLoaded(false), 1800);
                }}
                title="Copy the revealed code into the solution.rs editor"
              >
                {loaded ? '✓ Loaded into editor' : '⤓ Load into editor'}
              </button>
              {atEnd ? (
                <button className="btn btn-success btn-sm" onClick={onClose}>Done 🎉</button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrent((c) => Math.min(total, c + 1))}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
        <style>{`
          .wt-body { display: flex; flex-direction: column; gap: 14px; }
          .wt-progress { display: flex; align-items: center; gap: 12px; }
          .wt-progress-track { flex: 1; height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
          .wt-progress-fill { height: 100%; background: var(--rust); transition: width 0.25s ease; }
          .wt-progress-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; white-space: nowrap; }
          .wt-explain { background: var(--bg-elevated); border: 1px solid var(--border-normal); border-left: 3px solid var(--rust); border-radius: var(--radius-md); padding: 14px 16px; }
          .wt-explain-badge { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--rust-light); font-weight: 700; margin-bottom: 8px; }
          .wt-chunk { margin: 0 0 10px; padding: 10px 12px; background: var(--bg-surface, #0d0d14); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); overflow-x: auto; }
          .wt-chunk code { font-family: var(--font-mono, monospace); font-size: 0.82rem; color: var(--syn-fn, #93c5fd); white-space: pre; }
          .wt-explain-text { margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--text-secondary); }
          .wt-code-label { font-size: 0.75rem; color: var(--text-muted); }
          .wt-nav { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 4px; }
          .wt-nav-right { display: flex; align-items: center; gap: 8px; }
          .btn-wt-loaded { background: none; color: var(--success, #4ade80); border-color: rgba(74,222,128,0.35); }
        `}</style>
      </div>
    </div>
  );
}
