import React, { useState } from 'react';
import type { TerminalConfig } from '../../types';
import { useRustExecution } from '../../hooks/useRustExecution';

interface TerminalSimulatorProps {
  config: TerminalConfig;
}

// Split a command-line string into argv, honouring single and double quotes so
// that `"1 2 +"` is one argument. Mirrors how a shell tokenizes a line.
export function parseArgLine(line: string): string[] {
  const args: string[] = [];
  let cur = '';
  let quote: '"' | "'" | null = null;
  let has = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      has = true;
    } else if (ch === ' ' || ch === '\t') {
      if (has) { args.push(cur); cur = ''; has = false; }
    } else {
      cur += ch;
      has = true;
    }
  }
  if (has) args.push(cur);
  return args;
}

// Escape a string so it is a valid Rust double-quoted string literal body.
function rustEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildArgsLiteral(programName: string, userArgs: string[]): string {
  const all = [programName, ...userArgs];
  const items = all.map((a) => `"${rustEscape(a)}".to_string()`).join(', ');
  return `vec![${items}]`;
}

// An embedded terminal for CLI exercises. The student types arguments, "runs"
// the program (a self-contained reference binary executed on the real Rust
// playground with the typed args injected), and sees the output plus an
// explanation of how the arguments were parsed.
export default function TerminalSimulator({ config }: TerminalSimulatorProps) {
  const { runCode, isRunning } = useRustExecution();
  const [argLine, setArgLine] = useState(config.examples[0] ?? '');
  const [output, setOutput] = useState<string | null>(null);
  const [errored, setErrored] = useState(false);
  const [lastArgv, setLastArgv] = useState<string[] | null>(null);

  const run = async () => {
    const userArgs = parseArgLine(argLine);
    setLastArgv(userArgs);
    const literal = buildArgsLiteral(config.programName, userArgs);
    const code = config.runnerTemplate.split('{{ARGS}}').join(literal);
    const result = await runCode(code);
    if (result.success) {
      setOutput(result.stdout.length ? result.stdout : '(no output)');
      setErrored(false);
    } else {
      setOutput(result.stderr || 'Program failed to run.');
      setErrored(true);
    }
  };

  return (
    <div className="ts-root animate-fade-in">
      <div className="alert alert-info">
        This exercise is a <strong>command-line program</strong>. Type arguments below and run it to
        see how Rust receives and parses them — just like <code>cargo run</code> in a real terminal.
      </div>

      {config.examples.length > 0 && (
        <div className="ts-examples">
          <span className="ts-examples-label">Try:</span>
          {config.examples.map((ex) => (
            <button key={ex} className="ts-example-chip" onClick={() => setArgLine(ex)}>
              {ex || '(no args)'}
            </button>
          ))}
        </div>
      )}

      <div className="ts-terminal">
        <div className="ts-bar">
          <span className="ts-dot red" /><span className="ts-dot yellow" /><span className="ts-dot green" />
          <span className="ts-bar-title">terminal — {config.programName}</span>
        </div>
        <div className="ts-body">
          <div className="ts-prompt-row">
            <span className="ts-dollar">$</span>
            <span className="ts-cmd">cargo run</span>
            <input
              className="ts-input"
              value={argLine}
              onChange={(e) => setArgLine(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !isRunning) run(); }}
              placeholder='e.g. "1 2 * 3 +"'
              spellCheck={false}
              autoComplete="off"
            />
            <button className="btn btn-primary btn-sm ts-run" onClick={run} disabled={isRunning}>
              {isRunning ? <><span className="spinner" style={{ width: 12, height: 12 }} /> Running</> : '▶ Run'}
            </button>
          </div>
          {output !== null && (
            <pre className={`ts-output ${errored ? 'err' : ''}`}>{output}</pre>
          )}
        </div>
      </div>

      {lastArgv !== null && output !== null && (
        <div className="ts-explain">
          <div className="ts-explain-title">How Rust parsed your arguments</div>
          <div className="ts-argv">
            <code>args[0]</code> = <span className="ts-argv-val">"{config.programName}"</span>
            <span className="ts-argv-note"> (the program name — always present)</span>
          </div>
          {lastArgv.length === 0 ? (
            <div className="ts-argv-empty">No user arguments were passed (only the program name in <code>args</code>).</div>
          ) : (
            lastArgv.map((a, i) => (
              <div key={i} className="ts-argv">
                <code>args[{i + 1}]</code> = <span className="ts-argv-val">"{a}"</span>
              </div>
            ))
          )}
          <p className="ts-explain-text">{config.explain}</p>
        </div>
      )}

      <style>{`
        .ts-root { display: flex; flex-direction: column; gap: 14px; }
        .ts-examples { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
        .ts-examples-label { font-size: 0.78rem; color: var(--text-muted); font-weight: 600; }
        .ts-example-chip {
          font-family: var(--font-mono); font-size: 0.76rem; color: var(--rust-light);
          background: var(--rust-dim); border: 1px solid transparent; border-radius: var(--radius-sm);
          padding: 3px 8px; cursor: pointer; transition: border-color var(--transition);
        }
        .ts-example-chip:hover { border-color: var(--rust); }
        .ts-terminal { border: 1px solid var(--border-normal); border-radius: var(--radius-md); overflow: hidden; background: #0a0a12; }
        .ts-bar { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: var(--bg-elevated); border-bottom: 1px solid var(--border-subtle); }
        .ts-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .ts-dot.red { background: #ff5f56; } .ts-dot.yellow { background: #ffbd2e; } .ts-dot.green { background: #27c93f; }
        .ts-bar-title { font-size: 0.72rem; color: var(--text-muted); margin-left: 8px; font-family: var(--font-mono); }
        .ts-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; }
        .ts-prompt-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .ts-dollar { color: var(--success); font-family: var(--font-mono); font-weight: 700; }
        .ts-cmd { color: var(--text-muted); font-family: var(--font-mono); font-size: 0.84rem; }
        .ts-input {
          flex: 1; min-width: 140px; background: var(--bg-base); color: var(--text-primary);
          border: 1px solid var(--border-normal); border-radius: var(--radius-sm);
          font-family: var(--font-mono); font-size: 0.84rem; padding: 6px 10px; outline: none;
        }
        .ts-input:focus { border-color: var(--rust); box-shadow: 0 0 0 2px var(--rust-dim); }
        .ts-run { flex-shrink: 0; }
        .ts-output {
          margin: 0; padding: 12px; background: var(--bg-base); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.84rem;
          color: var(--success); white-space: pre-wrap; word-break: break-word;
        }
        .ts-output.err { color: var(--error); }
        .ts-explain { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; }
        .ts-explain-title { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
        .ts-argv { font-size: 0.82rem; color: var(--text-secondary); font-family: var(--font-mono); }
        .ts-argv code { color: var(--accent-blue); }
        .ts-argv-val { color: var(--syn-string, #4ade80); }
        .ts-argv-note { color: var(--text-muted); font-family: var(--font-sans); }
        .ts-argv-empty { font-size: 0.82rem; color: var(--text-muted); }
        .ts-explain-text { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin: 6px 0 0; }
        @media (max-width: 768px) {
          .ts-prompt-row { gap: 6px; }
          .ts-input { min-width: 100px; }
        }
      `}</style>
    </div>
  );
}
