import React, { useState } from 'react';
import type { SelfAssessmentPrompt } from '../../types';

interface SelfAssessmentProps {
  prompts?: SelfAssessmentPrompt[];
  onViewSolution: () => void;
}

const DEFAULT_PROMPTS: SelfAssessmentPrompt[] = [
  { question: 'Do you understand what the problem is asking?' },
  { question: 'Can you identify the Rust concepts it requires?' },
  { question: 'Can you explain the algorithm in your own words?' },
  { question: 'Could you solve a similar problem on your own?' },
];

type Confidence = 'low' | 'medium' | 'high';

// A short confidence check shown before the full solution. The goal is active
// recall: the student reflects on their understanding rather than jumping
// straight to copying the answer. The full solution stays available either way.
export default function SelfAssessment({ prompts, onViewSolution }: SelfAssessmentProps) {
  const items = prompts && prompts.length > 0 ? prompts : DEFAULT_PROMPTS;
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [confidence, setConfidence] = useState<Confidence | null>(null);

  const yesCount = Object.values(checked).filter(Boolean).length;
  const reflected = confidence !== null && yesCount > 0;

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="sa-root animate-fade-in">
      <div className="alert alert-info">
        Before you peek at the full solution, take a moment to check your understanding. Learning
        sticks when you recall it actively — not when you copy it.
      </div>

      <div className="sa-card">
        <h4 className="sa-h">Confidence check</h4>
        <div className="sa-list">
          {items.map((p, i) => (
            <button
              key={i}
              className={`sa-item ${checked[i] ? 'yes' : ''}`}
              onClick={() => toggle(i)}
            >
              <span className="sa-box">{checked[i] ? '✓' : ''}</span>
              <span className="sa-q">{p.question}</span>
            </button>
          ))}
        </div>

        <div className="sa-confidence">
          <span className="sa-conf-label">Overall, how confident are you?</span>
          <div className="sa-conf-btns">
            {(['low', 'medium', 'high'] as Confidence[]).map((c) => (
              <button
                key={c}
                className={`sa-conf ${confidence === c ? `active ${c}` : ''}`}
                onClick={() => setConfidence(c)}
              >
                {c === 'low' ? '😟 Low' : c === 'medium' ? '🙂 Medium' : '😎 High'}
              </button>
            ))}
          </div>
        </div>

        {reflected && (
          <div className="sa-result">
            {confidence === 'high' && yesCount === items.length ? (
              <p>Great — you understand this well. Try writing the solution yourself first, then compare.</p>
            ) : confidence === 'low' || yesCount < items.length ? (
              <p>That's fine — revisit the Concepts and Side Quiz tabs, then check the step-by-step walkthrough before the full solution.</p>
            ) : (
              <p>You're in good shape. Attempt it yourself, and use the solution to confirm your approach.</p>
            )}
          </div>
        )}

        <button
          className={`btn btn-sm ${reflected ? 'btn-primary' : 'btn-secondary'}`}
          onClick={onViewSolution}
        >
          {reflected ? '🔑 I\'ve reflected — view the full solution' : 'View the full solution'}
        </button>
      </div>

      <style>{`
        .sa-root { display: flex; flex-direction: column; gap: 14px; }
        .sa-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 18px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .sa-h { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .sa-list { display: flex; flex-direction: column; gap: 8px; }
        .sa-item {
          display: flex; align-items: center; gap: 10px; text-align: left;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 10px 12px; cursor: pointer;
          transition: all var(--transition); color: var(--text-secondary); font-size: 0.86rem;
        }
        .sa-item:hover { border-color: var(--border-strong); }
        .sa-item.yes { border-color: var(--success); background: var(--success-bg); color: var(--text-primary); }
        .sa-box {
          width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0;
          border: 1px solid var(--border-strong); display: flex; align-items: center; justify-content: center;
          color: var(--success); font-weight: 800; font-size: 0.8rem;
        }
        .sa-item.yes .sa-box { border-color: var(--success); background: var(--success); color: var(--bg-base); }
        .sa-confidence { display: flex; flex-direction: column; gap: 8px; }
        .sa-conf-label { font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; }
        .sa-conf-btns { display: flex; flex-wrap: wrap; gap: 8px; }
        .sa-conf {
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 7px 14px; font-size: 0.84rem;
          color: var(--text-secondary); cursor: pointer; transition: all var(--transition);
        }
        .sa-conf.active.low { border-color: var(--error); background: var(--error-bg); color: var(--error); }
        .sa-conf.active.medium { border-color: var(--warning); background: var(--warning-bg); color: var(--warning); }
        .sa-conf.active.high { border-color: var(--success); background: var(--success-bg); color: var(--success); }
        .sa-result { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }
        .sa-result p { margin: 0; }
        @media (max-width: 768px) { .sa-card { padding: 14px; } }
      `}</style>
    </div>
  );
}
