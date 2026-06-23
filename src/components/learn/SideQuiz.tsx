import React, { useEffect, useMemo, useState } from 'react';
import type {
  SideQuizStep,
  BlankQuizStep,
  BugQuizStep,
  ChoiceQuizStep,
  OrderQuizStep,
  MatchQuizStep,
} from '../../types';
import { conceptLibrary } from '../../data/conceptLibrary';
import {
  checkStep,
  isReady,
  revealAnswer,
  emptyAnswer,
  kindOf,
  DEFAULT_BLANK,
  type QuizAnswer,
} from './quizValidation';
import { BugWidget, ChoiceWidget, OrderWidget, MatchWidget } from './QuizWidgets';

interface SideQuizProps {
  steps: SideQuizStep[];
  title?: string;
  onProgress?: (solved: number, total: number) => void;
}

type StepStatus = 'unanswered' | 'wrong' | 'correct';

const KIND_LABEL: Record<string, string> = {
  blank: '✏️ Fill in the blank',
  bug: '🐛 Find the bug',
  choice: '◉ Multiple choice',
  order: '🔀 Order the code',
  match: '🔗 Matching',
};

// Interactive side quiz. A quiz is a sequence of steps; each step can be one of
// several question types (fill-in-the-blank, find-the-bug, multiple choice,
// code ordering, matching). This component owns the shared chrome — progress,
// stepper, hints, feedback, navigation — and delegates the interaction body and
// answer-checking to per-kind helpers and widgets.
export default function SideQuiz({ steps, title, onProgress }: SideQuizProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [status, setStatus] = useState<Record<number, StepStatus>>({});
  const [hintsShown, setHintsShown] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const total = steps.length;
  const step = steps[index];

  const stepStatus = status[index] ?? 'unanswered';
  const isCorrect = stepStatus === 'correct';
  const hints = hintsShown[index] ?? 0;
  const isRevealed = revealed[index] ?? false;
  const value = answers[index] ?? (step ? emptyAnswer(step) : '');

  const solvedCount = useMemo(
    () => steps.filter((_, i) => (status[i] ?? 'unanswered') === 'correct').length,
    [steps, status]
  );

  // Report completion upward (e.g. to drive the lesson's journey progress).
  useEffect(() => {
    onProgress?.(solvedCount, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedCount, total]);

  if (!step) {
    return <div className="sq-empty">No side quiz available for this exercise yet.</div>;
  }

  const setValue = (v: QuizAnswer) => setAnswers((prev) => ({ ...prev, [index]: v }));

  const handleCheck = () => {
    const ok = checkStep(step, value);
    setStatus((prev) => ({ ...prev, [index]: ok ? 'correct' : 'wrong' }));
  };

  const handleShowHint = () =>
    setHintsShown((prev) => ({ ...prev, [index]: Math.min((prev[index] ?? 0) + 1, 2) }));

  const handleReveal = () => {
    setRevealed((prev) => ({ ...prev, [index]: true }));
    setValue(revealAnswer(step));
    setStatus((prev) => ({ ...prev, [index]: 'correct' }));
  };

  const handleNext = () => setIndex((i) => Math.min(i + 1, total - 1));
  const handleBack = () => setIndex((i) => Math.max(i - 1, 0));

  const concept = step.conceptId ? conceptLibrary[step.conceptId] : undefined;
  const atEnd = index >= total - 1;
  const allSolved = solvedCount === total;
  const ready = isReady(step, value);
  const kind = kindOf(step);

  // Per-kind interaction body. Shared chrome lives outside this.
  const renderInteraction = () => {
    switch (step.kind) {
      case 'bug':
        return (
          <BugWidget
            step={step as BugQuizStep}
            answer={value as string[]}
            onChange={setValue}
            disabled={isCorrect}
            reveal={isCorrect}
          />
        );
      case 'choice':
        return (
          <ChoiceWidget
            step={step as ChoiceQuizStep}
            answer={value as number[]}
            onChange={setValue}
            disabled={isCorrect}
            reveal={isCorrect}
          />
        );
      case 'order':
        return (
          <OrderWidget
            step={step as OrderQuizStep}
            answer={value as (string | null)[]}
            onChange={setValue}
            disabled={isCorrect}
          />
        );
      case 'match':
        return (
          <MatchWidget
            step={step as MatchQuizStep}
            answer={value as (string | null)[]}
            onChange={setValue}
            disabled={isCorrect}
            reveal={isCorrect}
          />
        );
      default: {
        const b = step as BlankQuizStep;
        const token = b.blankToken ?? DEFAULT_BLANK;
        const i = b.template.indexOf(token);
        const before = i === -1 ? b.template : b.template.slice(0, i);
        const after = i === -1 ? '' : b.template.slice(i + token.length);
        const text = (value as string) ?? '';
        return (
          <div className="sq-code">
            <pre><code>{before}<input
              className={`sq-blank ${stepStatus}`}
              value={text}
              spellCheck={false}
              autoComplete="off"
              placeholder="your answer"
              disabled={isCorrect}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && ready && !isCorrect) handleCheck(); }}
              style={{ width: `${Math.max(8, text.length + 2)}ch` }}
            />{after}</code></pre>
          </div>
        );
      }
    }
  };

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
        {steps.map((s, i) => {
          const st = status[i] ?? 'unanswered';
          return (
            <button
              key={i}
              className={`sq-dot ${i === index ? 'active' : ''} ${st}`}
              onClick={() => setIndex(i)}
              title={`Step ${i + 1} — ${KIND_LABEL[kindOf(s)]}`}
            >
              {st === 'correct' ? '✓' : i + 1}
            </button>
          );
        })}
      </div>

      {allSolved && (
        <div className="sq-celebrate animate-slide-up">
          <span className="sq-celebrate-icon">🎉</span>
          <span>Quiz complete — all {total} steps solved! You understand the moving parts; now attempt the exercise.</span>
        </div>
      )}

      <div className="sq-card">
        <div className="sq-step-label">
          Step {index + 1} of {total} <span className="sq-kind">· {KIND_LABEL[kind]}</span>
        </div>
        <p className="sq-prompt">{step.prompt}</p>

        {renderInteraction()}

        {/* Feedback states */}
        {stepStatus === 'wrong' && !isRevealed && (
          <div className="sq-feedback wrong">
            Not quite — review it and try again. Use a hint if you're stuck.
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
              <button className="btn btn-primary btn-sm" onClick={handleCheck} disabled={!ready}>
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
        .sq-kind { color: var(--text-muted); font-weight: 600; }
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
        .sq-celebrate {
          display: flex; align-items: center; gap: 10px;
          background: var(--success-bg); border: 1px solid rgba(74,222,128,0.4);
          border-radius: var(--radius-lg); padding: 12px 16px;
          font-size: 0.88rem; color: var(--text-primary); font-weight: 500;
        }
        .sq-celebrate-icon { font-size: 1.4rem; }
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
