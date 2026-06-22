import React, { useMemo, useState } from 'react';
import type { SideQuizStep } from '../../types';
import { conceptLibrary } from '../../data/conceptLibrary';
import { validateAnswer, fillTemplate, DEFAULT_BLANK } from './quizValidation';

interface SideQuizProps {
  steps: SideQuizStep[];
  title?: string;
}

type StepStatus = 'unanswered' | 'wrong' | 'correct';

// Interactive fill-in-the-blank quiz. The student completes the missing part of
// a snippet; we validate semantically (multiple accepted answers), offer up to
// two hints, then explain the answer and what concept it reinforced before
// unlocking the next step.
export default function SideQuiz({ steps, title }: SideQuizProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Record<number, StepStatus>>({});
  const [hintsShown, setHintsShown] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const total = steps.length;
  const step = steps[index];
  const token = step?.blankToken ?? DEFAULT_BLANK;

  const stepStatus = status[index] ?? 'unanswered';
  const isCorrect = stepStatus === 'correct';
  const hints = hintsShown[index] ?? 0;
  const isRevealed = revealed[index] ?? false;
  const value = answers[index] ?? '';

  const [before, after] = useMemo(() => {
    if (!step) return ['', ''];
    const i = step.template.indexOf(token);
    if (i === -1) return [step.template, ''];
    return [step.template.slice(0, i), step.template.slice(i + token.length)];
  }, [step, token]);

  const solvedCount = useMemo(
    () => steps.filter((_, i) => (status[i] ?? 'unanswered') === 'correct').length,
    [steps, status]
  );

  if (!step) {
    return <div className="sq-empty">No side quiz available for this exercise yet.</div>;
  }

  const setValue = (v: string) =>
    setAnswers((prev) => ({ ...prev, [index]: v }));

  const handleCheck = () => {
    const result = validateAnswer(value, step);
    setStatus((prev) => ({ ...prev, [index]: result.correct ? 'correct' : 'wrong' }));
  };

  const handleShowHint = () =>
    setHintsShown((prev) => ({ ...prev, [index]: Math.min((prev[index] ?? 0) + 1, 2) }));

  const handleReveal = () => {
    setRevealed((prev) => ({ ...prev, [index]: true }));
    setValue(step.accepted[0] ?? '');
    setStatus((prev) => ({ ...prev, [index]: 'correct' }));
  };

  const handleNext = () => setIndex((i) => Math.min(i + 1, total - 1));
  const handleBack = () => setIndex((i) => Math.max(i - 1, 0));

  const concept = step.conceptId ? conceptLibrary[step.conceptId] : undefined;
  const atEnd = index >= total - 1;
  const allSolved = solvedCount === total;

  return (
    <div className="sq-root animate-fade-in">
      <div className="sq-head">
        <span className="sq-title">{title ?? 'Side Quiz'}</span>
        <span className="sq-progress-label">{solvedCount}/{total} solved</span>
      </div>

      <div className="sq-progress-track">
        <div className="sq-progress-fill" style={{ width: `${(solvedCount / total) * 100}%` }} />
      </div>

      <div className="sq-stepper">
        {steps.map((_, i) => {
          const st = status[i] ?? 'unanswered';
          return (
            <button
              key={i}
              className={`sq-dot ${i === index ? 'active' : ''} ${st}`}
              onClick={() => setIndex(i)}
              title={`Step ${i + 1}`}
            >
              {st === 'correct' ? '✓' : i + 1}
            </button>
          );
        })}
      </div>

      <div className="sq-card">
        <div className="sq-step-label">Step {index + 1} of {total}</div>
        <p className="sq-prompt">{step.prompt}</p>

        <div className="sq-code">
          <pre><code>{before}<input
            className={`sq-blank ${stepStatus}`}
            value={value}
            spellCheck={false}
            autoComplete="off"
            placeholder="your answer"
            disabled={isCorrect}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isCorrect) handleCheck(); }}
            style={{ width: `${Math.max(8, value.length + 2)}ch` }}
          />{after}</code></pre>
        </div>

        {/* Feedback states */}
        {stepStatus === 'wrong' && !isRevealed && (
          <div className="sq-feedback wrong">
            Not quite — check the syntax and try again. Use a hint if you're stuck.
          </div>
        )}
        {isCorrect && (
          <div className="sq-feedback correct">
            <div className="sq-correct-head">✓ Correct{isRevealed ? ' (answer revealed)' : '!'}</div>
            <div className="sq-explanation">{step.explanation}</div>
            <div className="sq-learned">
              <span className="sq-learned-badge">📚 What you learned</span>
              <span>{step.whatYouLearned}</span>
              {concept && <span className="sq-learned-concept"> · Concept: <strong>{concept.name}</strong></span>}
            </div>
          </div>
        )}

        {/* Hints (max two) */}
        {!isCorrect && (
          <div className="sq-hints">
            {Array.from({ length: hints }).map((_, h) => (
              <div key={h} className="sq-hint">
                <span className="sq-hint-label">Hint {h + 1}</span>
                <span>{step.hints[h]}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="sq-actions">
          {!isCorrect && (
            <>
              <button className="btn btn-primary btn-sm" onClick={handleCheck} disabled={!value.trim()}>
                Check answer
              </button>
              {hints < 2 && (
                <button className="btn btn-ghost btn-sm" onClick={handleShowHint}>
                  💡 Hint {hints + 1} of 2
                </button>
              )}
              {(stepStatus === 'wrong' || hints >= 2) && (
                <button className="btn btn-ghost btn-sm" onClick={handleReveal}>
                  👁 Reveal answer
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sq-nav">
        <button className="btn btn-secondary btn-sm" onClick={handleBack} disabled={index === 0}>
          ← Back
        </button>
        {allSolved && atEnd ? (
          <span className="sq-done">🎉 All steps solved — you're ready to attempt the exercise!</span>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleNext}
            disabled={atEnd}
            title={isCorrect ? 'Next step' : 'Solve this step to continue (or reveal the answer)'}
          >
            Next →
          </button>
        )}
      </div>

      <style>{`
        .sq-root { display: flex; flex-direction: column; gap: 14px; }
        .sq-empty { color: var(--text-muted); font-size: 0.9rem; padding: 16px; text-align: center; }
        .sq-head { display: flex; align-items: center; justify-content: space-between; }
        .sq-title { font-weight: 700; font-size: 0.95rem; color: var(--text-primary); }
        .sq-progress-label { font-size: 0.78rem; color: var(--text-muted); font-weight: 600; }
        .sq-progress-track { height: 6px; background: var(--bg-hover); border-radius: 3px; overflow: hidden; }
        .sq-progress-fill { height: 100%; background: var(--rust); transition: width 0.3s ease; }
        .sq-stepper { display: flex; flex-wrap: wrap; gap: 6px; }
        .sq-dot {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid var(--border-normal); background: var(--bg-elevated);
          color: var(--text-muted); font-size: 0.78rem; font-weight: 700; cursor: pointer;
          transition: all var(--transition);
        }
        .sq-dot.active { border-color: var(--rust); background: var(--rust-dim); color: var(--rust-light); }
        .sq-dot.correct { border-color: var(--success); background: var(--success-bg); color: var(--success); }
        .sq-dot.wrong { border-color: var(--error); color: var(--error); }
        .sq-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 18px; display: flex; flex-direction: column; gap: 12px;
        }
        .sq-step-label {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--rust-light);
        }
        .sq-prompt { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
        .sq-code {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 14px; overflow-x: auto;
        }
        .sq-code pre { margin: 0; }
        .sq-code code {
          font-family: var(--font-mono); font-size: 0.84rem; line-height: 1.7;
          color: var(--text-primary); white-space: pre;
        }
        .sq-blank {
          font-family: var(--font-mono); font-size: 0.84rem;
          background: var(--bg-elevated); color: var(--rust-light);
          border: 1px solid var(--rust); border-radius: 4px;
          padding: 1px 6px; margin: 0 2px; outline: none; min-width: 8ch;
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .sq-blank:focus { box-shadow: 0 0 0 2px var(--rust-dim); }
        .sq-blank.wrong { border-color: var(--error); color: var(--error); }
        .sq-blank.correct { border-color: var(--success); color: var(--success); background: var(--success-bg); }
        .sq-feedback { border-radius: var(--radius-md); padding: 12px 14px; font-size: 0.86rem; }
        .sq-feedback.wrong { background: var(--error-bg); border: 1px solid rgba(248,113,113,0.3); color: var(--error); }
        .sq-feedback.correct { background: var(--success-bg); border: 1px solid rgba(74,222,128,0.3); color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px; }
        .sq-correct-head { color: var(--success); font-weight: 700; }
        .sq-explanation { color: var(--text-secondary); line-height: 1.6; }
        .sq-learned { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--text-secondary); }
        .sq-learned-badge {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--accent-yellow); background: var(--warning-bg); padding: 2px 8px; border-radius: 999px;
        }
        .sq-learned-concept { color: var(--text-muted); }
        .sq-hints { display: flex; flex-direction: column; gap: 6px; }
        .sq-hint {
          display: flex; gap: 8px; align-items: baseline;
          background: var(--bg-elevated); border-left: 3px solid var(--accent-yellow);
          border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; color: var(--text-secondary);
        }
        .sq-hint-label { font-size: 0.66rem; font-weight: 700; text-transform: uppercase; color: var(--accent-yellow); flex-shrink: 0; }
        .sq-actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .sq-nav { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .sq-done { font-size: 0.85rem; color: var(--success); font-weight: 600; text-align: right; }
        @media (max-width: 768px) {
          .sq-card { padding: 14px; }
          .sq-actions { gap: 6px; }
          .sq-nav { flex-wrap: wrap; }
          .sq-done { text-align: left; }
        }
      `}</style>
    </div>
  );
}

// Exported for the optional "preview completed snippet" use and tests.
export { fillTemplate };
