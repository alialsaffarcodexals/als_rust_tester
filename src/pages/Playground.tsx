import React, { useState, useCallback } from 'react';
import CodeEditor from '../components/editor/CodeEditor';
import Console from '../components/editor/Console';
import { useRustExecution } from '../hooks/useRustExecution';
import type { ExecutionResult } from '../types';

// Default file contents shown when the playground first opens
const DEFAULT_MAIN = `fn main() {
    let msg = helpers::greet("World");
    println!("{}", msg);

    let doubled = helpers::double(21);
    println!("21 doubled = {}", doubled);
}
`;

const DEFAULT_HELPERS = `// helpers.rs — put your utility functions here.
// Call them from main.rs via helpers::function_name()

pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

pub fn double(n: i32) -> i32 {
    n * 2
}
`;

type FileKey = 'main' | 'helpers';

interface FileTab {
  key: FileKey;
  label: string;
  filename: string;
}

const FILE_TABS: FileTab[] = [
  { key: 'main', label: 'main.rs', filename: 'main.rs' },
  { key: 'helpers', label: 'helpers.rs', filename: 'helpers.rs' },
];

export default function Playground() {
  const [activeFile, setActiveFile] = useState<FileKey>('main');
  const [files, setFiles] = useState<Record<FileKey, string>>({
    main: DEFAULT_MAIN,
    helpers: DEFAULT_HELPERS,
  });
  const [output, setOutput] = useState<ExecutionResult | null>(null);

  const { runCode, isRunning } = useRustExecution();

  const handleChange = useCallback(
    (value: string) => {
      setFiles((prev) => ({ ...prev, [activeFile]: value }));
    },
    [activeFile]
  );

  // Combine helpers.rs as an inline module, then main.rs
  const buildCombinedCode = useCallback(() => {
    const helpersWrapped = `mod helpers {\n${files.helpers}\n}`;
    return `${helpersWrapped}\n\n${files.main}`;
  }, [files]);

  const handleRun = useCallback(async () => {
    setOutput(null);
    const combined = buildCombinedCode();
    const result = await runCode(combined);
    setOutput(result);
  }, [buildCombinedCode, runCode]);

  const handleClear = useCallback(() => {
    setOutput(null);
  }, []);

  const handleReset = useCallback((file?: FileKey) => {
    if (file === 'main' || (!file && activeFile === 'main')) {
      setFiles((prev) => ({ ...prev, main: DEFAULT_MAIN }));
    } else if (file === 'helpers' || (!file && activeFile === 'helpers')) {
      setFiles((prev) => ({ ...prev, helpers: DEFAULT_HELPERS }));
    }
  }, [activeFile]);

  const handleResetAll = useCallback(() => {
    setFiles({ main: DEFAULT_MAIN, helpers: DEFAULT_HELPERS });
    setOutput(null);
  }, []);

  return (
    <div className="playground">
      {/* Toolbar */}
      <div className="pg-toolbar">
        <div className="pg-toolbar-left">
          <span className="pg-title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12v10H2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M5 6l3 2-3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Rust Playground
          </span>
          <span className="pg-badge">Experimental</span>
        </div>
        <div className="pg-toolbar-right">
          <button
            className="pg-btn pg-btn-ghost"
            onClick={() => handleReset()}
            title={`Reset ${activeFile === 'main' ? 'main.rs' : 'helpers.rs'} to default`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5A4.5 4.5 0 1 1 6.5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M2 4v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reset File
          </button>
          <button
            className="pg-btn pg-btn-ghost"
            onClick={handleResetAll}
            title="Reset both files to defaults and clear output"
          >
            Reset All
          </button>
          <button
            className="pg-btn pg-btn-ghost"
            onClick={handleClear}
            title="Clear console output"
          >
            Clear Output
          </button>
          <button
            className="pg-btn pg-btn-run"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <div className="spinner" style={{ width: 12, height: 12, borderWidth: 2 }} />
                Running…
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 2l7 4-7 4V2z" fill="currentColor"/>
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* File tabs */}
      <div className="pg-tabs">
        {FILE_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`pg-tab ${activeFile === tab.key ? 'active' : ''}`}
            onClick={() => setActiveFile(tab.key)}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" opacity="0.6">
              <path d="M2 1h5l3 3v7H2V1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
            {tab.label}
            {tab.key === 'helpers' && (
              <span className="pg-tab-hint">module</span>
            )}
          </button>
        ))}
        <div className="pg-tabs-hint">
          Use <code>helpers::fn_name()</code> in main.rs to call functions from helpers.rs
        </div>
      </div>

      {/* Editor + Console */}
      <div className="pg-body">
        <div className="pg-editor-panel">
          {/* Render both editors but only show the active one — preserves Monaco state */}
          <div style={{ display: activeFile === 'main' ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
            <CodeEditor
              value={files.main}
              onChange={handleChange}
              height="100%"
            />
          </div>
          <div style={{ display: activeFile === 'helpers' ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
            <CodeEditor
              value={files.helpers}
              onChange={handleChange}
              height="100%"
            />
          </div>
        </div>

        <div className="pg-console-panel">
          <Console
            output={output}
            isRunning={isRunning}
          />
          <div className="pg-console-hint">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M6 5.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="6" cy="3.5" r="0.6" fill="currentColor"/>
            </svg>
            helpers.rs is compiled as a <code>mod helpers</code> module and linked automatically
          </div>
        </div>
      </div>

      <style>{`
        .playground {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 57px); /* subtract header height */
          overflow: hidden;
          background: var(--bg-base);
        }

        /* Toolbar */
        .pg-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .pg-toolbar-left { display: flex; align-items: center; gap: 10px; }
        .pg-toolbar-right { display: flex; align-items: center; gap: 6px; }
        .pg-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pg-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 2px 7px;
          background: var(--rust-dim);
          color: var(--rust-light);
          border-radius: 999px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        /* Toolbar buttons */
        .pg-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          white-space: nowrap;
        }
        .pg-btn-ghost {
          background: none;
          color: var(--text-secondary);
        }
        .pg-btn-ghost:hover {
          background: var(--bg-elevated);
          color: var(--text-primary);
          border-color: var(--border-normal);
        }
        .pg-btn-run {
          background: var(--rust);
          color: #fff;
          border-color: var(--rust);
          font-weight: 600;
          padding: 5px 16px;
        }
        .pg-btn-run:hover:not(:disabled) {
          background: var(--rust-light);
          border-color: var(--rust-light);
        }
        .pg-btn-run:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* File tabs */
        .pg-tabs {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 0 16px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .pg-tab {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border: none;
          border-bottom: 2px solid transparent;
          background: none;
          color: var(--text-muted);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
          font-family: var(--font-mono);
          margin-bottom: -1px;
        }
        .pg-tab:hover { color: var(--text-secondary); }
        .pg-tab.active {
          color: var(--rust-light);
          border-bottom-color: var(--rust);
        }
        .pg-tab-hint {
          font-size: 0.65rem;
          padding: 1px 5px;
          background: var(--bg-elevated);
          border-radius: 3px;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-weight: 500;
        }
        .pg-tabs-hint {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--text-disabled);
          padding: 0 4px;
          font-family: var(--font-sans);
        }
        .pg-tabs-hint code {
          font-family: var(--font-mono);
          color: var(--rust-light);
          background: var(--rust-dim);
          padding: 0 4px;
          border-radius: 3px;
        }

        /* Main body */
        .pg-body {
          display: grid;
          grid-template-columns: 1fr 380px;
          flex: 1;
          overflow: hidden;
          gap: 0;
        }

        /* Editor panel */
        .pg-editor-panel {
          overflow: hidden;
          border-right: 1px solid var(--border-subtle);
          height: 100%;
        }
        .pg-editor-panel > div {
          height: 100%;
        }
        /* Override CodeEditor border since we have the panel border */
        .pg-editor-panel .code-editor-wrapper {
          border: none;
          border-radius: 0;
          height: 100%;
        }

        /* Console panel */
        .pg-console-panel {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-base);
        }
        .pg-console-panel > .console-wrapper {
          flex: 1;
          border: none;
          border-radius: 0;
          overflow: hidden;
        }
        .pg-console-panel > .console-wrapper .console-body {
          max-height: none;
          height: calc(100% - 38px); /* subtract header */
        }
        .pg-console-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 0.72rem;
          color: var(--text-disabled);
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          flex-shrink: 0;
        }
        .pg-console-hint code {
          font-family: var(--font-mono);
          color: var(--text-muted);
          background: var(--bg-elevated);
          padding: 0 4px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
