import React, { useState } from 'react';
import type { SolutionStep } from '../../types';
import CodeEditor from '../editor/CodeEditor';

interface WalkthroughProps {
  steps: SolutionStep[];
  onLoad?: (code: string) => void; // load the revealed code into the solution editor
}

// Inline step-by-step solution viewer used inside the learning journey.
// Reveals the solution one chunk at a time with an explanation for each step.
// Mirrors the existing WalkthroughModal but renders inline (no overlay).
export default function Walkthrough({ steps, onLoad }: WalkthroughProps) {
  const total = steps.length;
  const [current, setCurrent] = useState(1);
  const [loaded, setLoaded] = useState(false);

  if (total === 0) {
    return <div className="wk-empty">No step-by-step walkthrough available for this exercise yet.</div>;
  }

  const safe = Math.min(Math.max(current, 1), total);
  const revealedCode = steps.slice(0, safe).map((s) => s.code).join('\n');
  const step = steps[safe - 1];
  const atStart = safe <= 1;
  const atEnd = safe >= total;

  return (
    <div className="wk-root animate-fade-in">
      <div className="alert alert-info">
        Build the solution one step at a time. Read each explanation, then reveal the next line(s).
        You can load the revealed code into your editor at any point.
      </div>

      <div className="wk-progress">
        <div className="wk-progress-track">
          <div className="wk-progress-fill" style={{ width: `${(safe / total) * 100}%` }} />
        </div>
        <span className="wk-progress-label">Step {safe} / {total}</span>
      </div>

      <div className="wk-explain">
        <div className="wk-explain-badge">Lines added at this step</div>
        <pre className="wk-chunk"><code>{step.code}</code></pre>
        <p className="wk-explain-text">{step.explain}</p>
      </div>

      <div className="wk-code-label">🦀 Solution so far — hover any built-in for its docs</div>
      <CodeEditor value={revealedCode} onChange={() => {}} readOnly height="260px" />

      <div className="wk-nav">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setCurrent((c) => Math.max(1, c - 1))}
          disabled={atStart}
        >
          ← Back
        </button>
        <div className="wk-nav-right">
          {onLoad && (
            <button
              className={`btn btn-sm ${loaded ? 'btn-wk-loaded' : 'btn-ghost'}`}
              onClick={() => {
                onLoad(revealedCode);
                setLoaded(true);
                setTimeout(() => setLoaded(false), 1800);
              }}
              title="Copy the revealed code into the solution.rs editor"
            >
              {loaded ? '✓ Loaded into editor' : '⤓ Load into editor'}
            </button>
          )}
          {atEnd ? (
            <span className="wk-done">🎉 Complete</span>
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

      <style>{`
        .wk-root { display: flex; flex-direction: column; gap: 12px; }
        .wk-empty { color: var(--text-muted); font-size: 0.9rem; padding: 16px; text-align: center; }
        .wk-progress { display: flex; align-items: center; gap: 12px; }
        .wk-progress-track { flex: 1; height: 6px; background: var(--bg-hover); border-radius: 3px; overflow: hidden; }
        .wk-progress-fill { height: 100%; background: var(--rust); transition: width 0.25s ease; }
        .wk-progress-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; white-space: nowrap; }
        .wk-explain { background: var(--bg-elevated); border: 1px solid var(--border-normal); border-left: 3px solid var(--rust); border-radius: var(--radius-md); padding: 14px 16px; }
        .wk-explain-badge { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--rust-light); font-weight: 700; margin-bottom: 8px; }
        .wk-chunk { margin: 0 0 10px; padding: 10px 12px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); overflow-x: auto; }
        .wk-chunk code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--syn-fn, #93c5fd); white-space: pre; }
        .wk-explain-text { margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--text-secondary); }
        .wk-code-label { font-size: 0.75rem; color: var(--text-muted); }
        .wk-nav { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-top: 4px; }
        .wk-nav-right { display: flex; align-items: center; gap: 8px; }
        .wk-done { font-size: 0.85rem; color: var(--success); font-weight: 600; }
        .btn-wk-loaded { background: none; color: var(--success, #4ade80); border-color: rgba(74,222,128,0.35); }
        @media (max-width: 768px) { .wk-nav { flex-wrap: wrap; } }
      `}</style>
    </div>
  );
}
