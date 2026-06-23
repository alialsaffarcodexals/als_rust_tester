import React, { useMemo } from 'react';
import type {
  BugQuizStep,
  ChoiceQuizStep,
  OrderQuizStep,
  MatchQuizStep,
} from '../../types';
import { tokenizeLine } from './quizValidation';

// ===========================================================================
// Presentational widgets for the interactive Side Quiz question types.
// Each widget is fully controlled: it reads the current `answer` and reports
// changes through `onChange`. The parent SideQuiz owns answer state, the Check
// button, hints, and feedback — these widgets only render the interaction.
// All interactions are button / native-select based, so they work with touch
// and the keyboard.
// ===========================================================================

// Deterministic-ish shuffle that is stable for the component's lifetime.
function useShuffled<T>(items: T[], key: string): T[] {
  return useMemo(() => {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

// --------------------------------------------------------------------------
// Find-the-Bug — click the buggy token(s).
// --------------------------------------------------------------------------
export function BugWidget({
  step,
  answer,
  onChange,
  disabled,
  reveal,
}: {
  step: BugQuizStep;
  answer: string[];
  onChange: (keys: string[]) => void;
  disabled: boolean;
  reveal: boolean;
}) {
  const selected = new Set(answer);
  const lines = step.code.replace(/\r\n/g, '\n').split('\n');

  const toggle = (key: string) => {
    if (disabled) return;
    const next = new Set(answer);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange([...next]);
  };

  return (
    <div className="qw-bug">
      <div className="qw-bug-hint">🐛 Click the token(s) that contain the mistake.</div>
      <pre className="qw-bug-code">
        {lines.map((line, li) => {
          const tokens = tokenizeLine(line, li + 1, step.bugs);
          return (
            <div className="qw-bug-line" key={li}>
              <span className="qw-bug-ln">{li + 1}</span>
              <span className="qw-bug-content">
                {tokens.map((t, ti) =>
                  t.clickable ? (
                    <button
                      key={ti}
                      type="button"
                      className={
                        'qw-tok' +
                        (selected.has(t.key) ? ' sel' : '') +
                        (reveal && t.buggy ? ' bug' : '') +
                        (reveal && selected.has(t.key) && !t.buggy ? ' miss' : '')
                      }
                      onClick={() => toggle(t.key)}
                      disabled={disabled}
                    >
                      {t.text}
                    </button>
                  ) : (
                    <span key={ti}>{t.text}</span>
                  )
                )}
              </span>
            </div>
          );
        })}
      </pre>

      <style>{`
        .qw-bug { display: flex; flex-direction: column; gap: 8px; }
        .qw-bug-hint { font-size: 0.78rem; color: var(--text-muted); }
        .qw-bug-code {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px; margin: 0; overflow-x: auto;
          font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.8;
        }
        .qw-bug-line { display: flex; gap: 10px; white-space: pre; }
        .qw-bug-ln { color: var(--text-disabled); user-select: none; min-width: 1.5ch; text-align: right; flex-shrink: 0; }
        .qw-bug-content { white-space: pre; }
        .qw-tok {
          font: inherit; background: none; border: none; padding: 0 1px; margin: 0;
          color: var(--text-primary); cursor: pointer; border-radius: 3px;
          border-bottom: 1px dashed transparent;
        }
        .qw-tok:hover:not(:disabled) { background: var(--bg-hover); border-bottom-color: var(--text-muted); }
        .qw-tok.sel { background: var(--rust-dim); color: var(--rust-light); }
        .qw-tok.bug { background: var(--success-bg); color: var(--success); border-bottom: 1px solid var(--success); }
        .qw-tok.miss { background: var(--error-bg); color: var(--error); }
        .qw-tok:disabled { cursor: default; }
      `}</style>
    </div>
  );
}

// --------------------------------------------------------------------------
// Multiple-choice code completion.
// --------------------------------------------------------------------------
export function ChoiceWidget({
  step,
  answer,
  onChange,
  disabled,
  reveal,
}: {
  step: ChoiceQuizStep;
  answer: number[];
  onChange: (sel: number[]) => void;
  disabled: boolean;
  reveal: boolean;
}) {
  const selected = new Set(answer);
  const correct = new Set(step.correct);

  const pick = (i: number) => {
    if (disabled) return;
    if (step.multi) {
      const next = new Set(answer);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      onChange([...next]);
    } else {
      onChange([i]);
    }
  };

  return (
    <div className="qw-choice">
      {step.template && (
        <pre className="qw-choice-code"><code>{step.template}</code></pre>
      )}
      <div className="qw-choice-hint">
        {step.multi ? '☑️ Select all correct options.' : '◉ Select the correct option.'}
      </div>
      <div className="qw-options">
        {step.options.map((opt, i) => {
          const isSel = selected.has(i);
          const isCorrect = correct.has(i);
          const cls =
            'qw-option' +
            (isSel ? ' sel' : '') +
            (reveal && isCorrect ? ' correct' : '') +
            (reveal && isSel && !isCorrect ? ' wrong' : '');
          return (
            <button key={i} type="button" className={cls} onClick={() => pick(i)} disabled={disabled}>
              <span className="qw-option-mark">{step.multi ? (isSel ? '☑' : '☐') : isSel ? '◉' : '○'}</span>
              <code className="qw-option-text">{opt}</code>
              {reveal && step.why?.[i] && <span className="qw-option-why">{step.why[i]}</span>}
            </button>
          );
        })}
      </div>

      <style>{`
        .qw-choice { display: flex; flex-direction: column; gap: 8px; }
        .qw-choice-code {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px; margin: 0; overflow-x: auto;
        }
        .qw-choice-code code { font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6; color: var(--text-primary); white-space: pre; }
        .qw-choice-hint { font-size: 0.78rem; color: var(--text-muted); }
        .qw-options { display: flex; flex-direction: column; gap: 6px; }
        .qw-option {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 9px 12px; text-align: left; cursor: pointer;
          transition: all var(--transition);
        }
        .qw-option:hover:not(:disabled) { border-color: var(--border-strong); }
        .qw-option.sel { border-color: var(--rust); background: var(--rust-dim); }
        .qw-option.correct { border-color: var(--success); background: var(--success-bg); }
        .qw-option.wrong { border-color: var(--error); background: var(--error-bg); }
        .qw-option-mark { flex-shrink: 0; color: var(--text-secondary); }
        .qw-option-text { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-primary); }
        .qw-option-why { flex-basis: 100%; font-size: 0.76rem; color: var(--text-muted); padding-left: 26px; }
        .qw-option:disabled { cursor: default; }
      `}</style>
    </div>
  );
}

// --------------------------------------------------------------------------
// Code ordering / assembly — place fragments into ordered slots.
// --------------------------------------------------------------------------
export function OrderWidget({
  step,
  answer,
  onChange,
  disabled,
}: {
  step: OrderQuizStep;
  answer: (string | null)[];
  onChange: (slots: (string | null)[]) => void;
  disabled: boolean;
}) {
  const pool = useShuffled([...step.fragments, ...(step.distractors ?? [])], step.prompt);
  const slots = answer.length === step.fragments.length ? answer : Array(step.fragments.length).fill(null);
  const used = new Set(slots.filter((s): s is string => s !== null));

  const assign = (text: string) => {
    if (disabled || used.has(text)) return;
    const next = [...slots];
    const empty = next.findIndex((s) => s === null);
    if (empty === -1) return;
    next[empty] = text;
    onChange(next);
  };
  const clear = (i: number) => {
    if (disabled) return;
    const next = [...slots];
    next[i] = null;
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    if (disabled) return;
    const j = i + dir;
    if (j < 0 || j >= slots.length) return;
    const next = [...slots];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="qw-order">
      {step.scaffold && <pre className="qw-order-scaffold"><code>{step.scaffold}</code></pre>}

      <div className="qw-order-hint">🔀 Tap a fragment to drop it into the next slot, then reorder with ↑ ↓. Not every fragment belongs.</div>

      <div className="qw-slots">
        {slots.map((text, i) => (
          <div className={'qw-slot' + (text ? ' filled' : '')} key={i}>
            <span className="qw-slot-num">{i + 1}</span>
            {text ? (
              <>
                <code className="qw-slot-text">{text}</code>
                <span className="qw-slot-ctrls">
                  <button type="button" onClick={() => move(i, -1)} disabled={disabled || i === 0} aria-label="Move up">↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={disabled || i === slots.length - 1} aria-label="Move down">↓</button>
                  <button type="button" onClick={() => clear(i)} disabled={disabled} aria-label="Remove">✕</button>
                </span>
              </>
            ) : (
              <span className="qw-slot-empty">drop a fragment here</span>
            )}
          </div>
        ))}
      </div>

      <div className="qw-pool">
        {pool.map((text, i) => (
          <button
            key={i}
            type="button"
            className={'qw-frag' + (used.has(text) ? ' used' : '')}
            onClick={() => assign(text)}
            disabled={disabled || used.has(text)}
          >
            <code>{text}</code>
          </button>
        ))}
      </div>

      <style>{`
        .qw-order { display: flex; flex-direction: column; gap: 10px; }
        .qw-order-scaffold {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px; margin: 0; overflow-x: auto;
        }
        .qw-order-scaffold code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); white-space: pre; }
        .qw-order-hint { font-size: 0.78rem; color: var(--text-muted); }
        .qw-slots { display: flex; flex-direction: column; gap: 6px; }
        .qw-slot {
          display: flex; align-items: center; gap: 8px;
          border: 1px dashed var(--border-strong); border-radius: var(--radius-md);
          padding: 8px 10px; min-height: 40px; background: var(--bg-base);
        }
        .qw-slot.filled { border-style: solid; border-color: var(--rust); background: var(--rust-dim); }
        .qw-slot-num { font-size: 0.7rem; font-weight: 700; color: var(--text-disabled); min-width: 1.5ch; flex-shrink: 0; }
        .qw-slot-text { flex: 1; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-primary); white-space: pre-wrap; }
        .qw-slot-empty { flex: 1; font-size: 0.78rem; color: var(--text-disabled); font-style: italic; }
        .qw-slot-ctrls { display: flex; gap: 3px; flex-shrink: 0; }
        .qw-slot-ctrls button {
          width: 24px; height: 24px; border: 1px solid var(--border-normal); background: var(--bg-elevated);
          color: var(--text-secondary); border-radius: 4px; cursor: pointer; font-size: 0.8rem; line-height: 1;
        }
        .qw-slot-ctrls button:disabled { opacity: 0.4; cursor: default; }
        .qw-pool { display: flex; flex-wrap: wrap; gap: 6px; }
        .qw-frag {
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 7px 10px; cursor: pointer; transition: all var(--transition);
          max-width: 100%;
        }
        .qw-frag:hover:not(:disabled) { border-color: var(--rust); }
        .qw-frag code { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-primary); white-space: pre-wrap; }
        .qw-frag.used { opacity: 0.35; cursor: default; }
      `}</style>
    </div>
  );
}

// --------------------------------------------------------------------------
// Matching — connect each left item to its correct right item.
// --------------------------------------------------------------------------
export function MatchWidget({
  step,
  answer,
  onChange,
  disabled,
  reveal,
}: {
  step: MatchQuizStep;
  answer: (string | null)[];
  onChange: (picks: (string | null)[]) => void;
  disabled: boolean;
  reveal: boolean;
}) {
  const rights = useShuffled(step.pairs.map((p) => p.right), step.prompt);
  const picks = answer.length === step.pairs.length ? answer : Array(step.pairs.length).fill(null);

  const set = (i: number, val: string) => {
    if (disabled) return;
    const next = [...picks];
    next[i] = val === '' ? null : val;
    onChange(next);
  };

  return (
    <div className="qw-match">
      {step.intro && <pre className="qw-match-intro"><code>{step.intro}</code></pre>}
      <div className="qw-match-hint">🔗 Match each item on the left to the right.</div>
      <div className="qw-match-rows">
        {step.pairs.map((p, i) => {
          const ok = reveal ? picks[i] === p.right : null;
          return (
            <div className={'qw-match-row' + (ok === true ? ' ok' : ok === false ? ' no' : '')} key={i}>
              <code className="qw-match-left">{p.left}</code>
              <span className="qw-match-arrow">→</span>
              <select
                className="qw-match-select"
                value={picks[i] ?? ''}
                disabled={disabled}
                onChange={(e) => set(i, e.target.value)}
              >
                <option value="">— choose —</option>
                {rights.map((r, ri) => (
                  <option key={ri} value={r}>{r}</option>
                ))}
              </select>
              {reveal && ok === false && <span className="qw-match-fix">should be: <code>{p.right}</code></span>}
            </div>
          );
        })}
      </div>

      <style>{`
        .qw-match { display: flex; flex-direction: column; gap: 8px; }
        .qw-match-intro {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px; margin: 0; overflow-x: auto;
        }
        .qw-match-intro code { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); white-space: pre; }
        .qw-match-hint { font-size: 0.78rem; color: var(--text-muted); }
        .qw-match-rows { display: flex; flex-direction: column; gap: 6px; }
        .qw-match-row {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 8px 10px;
        }
        .qw-match-row.ok { border-color: var(--success); background: var(--success-bg); }
        .qw-match-row.no { border-color: var(--error); background: var(--error-bg); }
        .qw-match-left { font-family: var(--font-mono); font-size: 0.82rem; color: var(--rust-light); flex-shrink: 0; }
        .qw-match-arrow { color: var(--text-muted); flex-shrink: 0; }
        .qw-match-select {
          flex: 1; min-width: 140px; background: var(--bg-base); color: var(--text-primary);
          border: 1px solid var(--border-normal); border-radius: var(--radius-sm);
          padding: 5px 8px; font-family: var(--font-mono); font-size: 0.8rem; outline: none;
        }
        .qw-match-select:focus { border-color: var(--rust); }
        .qw-match-fix { flex-basis: 100%; font-size: 0.76rem; color: var(--text-muted); }
        .qw-match-fix code { font-family: var(--font-mono); color: var(--success); }
      `}</style>
    </div>
  );
}
