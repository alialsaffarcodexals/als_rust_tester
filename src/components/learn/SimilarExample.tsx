import React, { useState } from 'react';
import type { SimilarExample as SimilarExampleData } from '../../types';
import { conceptLibrary } from '../../data/conceptLibrary';
import CodeEditor from '../editor/CodeEditor';

interface SimilarExampleProps {
  data: SimilarExampleData;
}

// A DIFFERENT mini-problem that practices the same concepts and pattern as the
// real exercise, so the student can transfer the idea before solving the actual
// task. It never reveals the real solution — only an optional solution to this
// separate mini-problem, hidden behind a click.
export default function SimilarExample({ data }: SimilarExampleProps) {
  const [showSolution, setShowSolution] = useState(false);
  const concepts = data.concepts
    .map((id) => conceptLibrary[id]?.name)
    .filter(Boolean) as string[];

  return (
    <div className="se-root animate-fade-in">
      <div className="alert alert-info">
        Warm up on this <strong>different but similar</strong> problem first. It uses the same
        concepts and pattern as the real exercise — practicing it makes the real one click. This is
        not the exercise's answer.
      </div>

      <div className="se-card">
        <div className="se-head">
          <span className="se-badge">Practice</span>
          <h4 className="se-title">{data.title}</h4>
        </div>

        {concepts.length > 0 && (
          <div className="se-concepts">
            {concepts.map((name) => (
              <span key={name} className="se-chip">{name}</span>
            ))}
          </div>
        )}

        <p className="se-prompt">{data.prompt}</p>

        <div className="se-editor-label">🦀 Try it (scratch pad — not graded)</div>
        <div className="se-editor"><CodeEditor value={data.starter} onChange={() => {}} height="180px" /></div>

        <div className="se-hint">
          <span className="se-hint-badge">Hint</span>
          <span>{data.hint}</span>
        </div>

        {data.solution && (
          <div className="se-solution">
            {!showSolution ? (
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSolution(true)}>
                👁 Show this practice problem's solution
              </button>
            ) : (
              <>
                <div className="se-solution-label">Practice solution (for this warm-up only)</div>
                <CodeEditor value={data.solution} onChange={() => {}} readOnly height="200px" />
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .se-root { display: flex; flex-direction: column; gap: 14px; }
        .se-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .se-head { display: flex; align-items: center; gap: 8px; }
        .se-badge {
          font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--accent-purple); background: rgba(167,139,250,0.15); padding: 2px 8px; border-radius: 999px;
        }
        .se-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .se-concepts { display: flex; flex-wrap: wrap; gap: 6px; }
        .se-chip {
          font-size: 0.72rem; color: var(--text-secondary);
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: 999px; padding: 2px 10px;
        }
        .se-prompt { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.65; margin: 0; white-space: pre-wrap; }
        .se-editor-label, .se-solution-label { font-size: 0.75rem; color: var(--text-muted); }
        .se-editor { border-radius: var(--radius-md); overflow: hidden; }
        .se-hint {
          display: flex; gap: 8px; align-items: baseline;
          background: var(--bg-elevated); border-left: 3px solid var(--accent-yellow);
          border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; color: var(--text-secondary);
        }
        .se-hint-badge { font-size: 0.64rem; font-weight: 700; text-transform: uppercase; color: var(--accent-yellow); flex-shrink: 0; }
        .se-solution { display: flex; flex-direction: column; gap: 6px; }
        @media (max-width: 768px) { .se-card { padding: 14px; } }
      `}</style>
    </div>
  );
}
