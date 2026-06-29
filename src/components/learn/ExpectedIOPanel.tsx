import React from 'react';
import type { ExpectedIO } from '../../types';

interface ExpectedIOPanelProps {
  io: ExpectedIO;
}

/**
 * A tiny, scannable "Expected Input / Output" card shown at the top of a Final
 * exercise's Overview — function inputs, return value, behaviour and a few
 * example input→output pairs, so the task is graspable in seconds without
 * reading the full subject. Styled to match the Overview cards.
 */
export default function ExpectedIOPanel({ io }: ExpectedIOPanelProps) {
  const program = io.kind === 'program';
  const inLabel = program ? 'stdin' : 'input';
  const outLabel = program ? 'stdout' : 'output';

  return (
    <section className="eio-card animate-fade-in" aria-label="Expected input and output">
      <div className="eio-head">
        <h4 className="eio-title">⚡ Expected Input / Output</h4>
        <span className="eio-sub">grasp the task in seconds</span>
      </div>

      <div className="eio-io-grid">
        <div className="eio-io">
          <span className="eio-label">Expected input{program ? ' (stdin)' : ''}</span>
          <code className="eio-val">{io.input}</code>
        </div>
        <div className="eio-io">
          <span className="eio-label">Expected output{program ? ' (stdout)' : ''}</span>
          <code className="eio-val out">{io.output}</code>
        </div>
      </div>

      {io.behavior && (
        <div className="eio-meta">
          <span className="eio-meta-k">Behavior</span>
          <span className="eio-meta-v">{io.behavior}</span>
        </div>
      )}
      {io.constraints && (
        <div className="eio-meta">
          <span className="eio-meta-k constraints">Constraints</span>
          <span className="eio-meta-v">{io.constraints}</span>
        </div>
      )}

      <div className="eio-examples">
        <span className="eio-ex-title">Examples</span>
        <div className="eio-ex-grid">
          {io.examples.map((ex, i) => (
            <div className="eio-ex" key={i}>
              {ex.note && <span className="eio-ex-note">{ex.note}</span>}
              <div className="eio-ex-side">
                <span className="eio-ex-k">{inLabel}</span>
                <pre className="eio-ex-pre">{ex.input}</pre>
              </div>
              <div className="eio-ex-arrow" aria-hidden="true">↓</div>
              <div className="eio-ex-side">
                <span className="eio-ex-k out">{outLabel}</span>
                <pre className="eio-ex-pre out">{ex.output}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .eio-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--rust);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 14px;
        }
        .eio-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .eio-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .eio-sub { font-size: 0.7rem; color: var(--text-muted); }
        .eio-io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .eio-io { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .eio-label {
          font-size: 0.64rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.05em; color: var(--text-muted);
        }
        .eio-val {
          font-family: var(--font-mono); font-size: 0.82rem; color: var(--rust-light);
          background: var(--bg-base); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm); padding: 6px 10px;
          white-space: pre-wrap; word-break: break-word;
        }
        .eio-val.out { color: var(--success); }
        .eio-meta { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; }
        .eio-meta-k {
          flex-shrink: 0;
          font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--accent-blue); background: var(--bg-elevated);
          border-radius: 4px; padding: 2px 6px;
        }
        .eio-meta-k.constraints { color: var(--warning); }
        .eio-meta-v { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.55; }
        .eio-examples { display: flex; flex-direction: column; gap: 8px; }
        .eio-ex-title {
          font-size: 0.64rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.05em; color: var(--text-muted);
        }
        .eio-ex-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 8px;
        }
        .eio-ex {
          background: var(--bg-base); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 8px 10px;
          display: flex; flex-direction: column; gap: 3px; min-width: 0;
        }
        .eio-ex-note {
          align-self: flex-start;
          font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--warning); background: var(--warning-bg);
          border-radius: 4px; padding: 1px 6px; margin-bottom: 2px;
        }
        .eio-ex-side { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .eio-ex-k { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
        .eio-ex-k.out { color: var(--success); }
        .eio-ex-arrow { font-size: 0.7rem; color: var(--text-muted); line-height: 1; }
        .eio-ex-pre {
          font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-primary);
          margin: 0; white-space: pre-wrap; word-break: break-word; line-height: 1.45;
        }
        .eio-ex-pre.out { color: var(--success); }
        @media (max-width: 768px) {
          .eio-card { padding: 14px; }
          .eio-io-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
