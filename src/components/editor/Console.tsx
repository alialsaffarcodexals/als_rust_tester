import React, { useEffect, useRef } from 'react';
import type { ExecutionResult, TestResult } from '../../types';

interface ConsoleProps {
  output?: ExecutionResult | null;
  testResults?: TestResult[] | null;
  isRunning?: boolean;
  isTesting?: boolean;
}

export default function Console({ output, testResults, isRunning, isTesting }: ConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, testResults, isRunning, isTesting]);

  const isEmpty = !output && !testResults && !isRunning && !isTesting;

  return (
    <div className="console-wrapper">
      <div className="console-header">
        <span className="console-title">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 5l2.5 2L4 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Output
        </span>
        {testResults && (
          <span className={`console-test-summary ${testResults.every((t) => t.passed) ? 'all-pass' : 'has-fail'}`}>
            {testResults.filter((t) => t.passed).length}/{testResults.length} tests passed
          </span>
        )}
      </div>

      <div className="console-body" ref={scrollRef}>
        {isEmpty && (
          <div className="console-empty">
            <span>Run your code to see output here...</span>
          </div>
        )}

        {(isRunning || isTesting) && (
          <div className="console-running">
            <div className="spinner" />
            <span>{isTesting ? 'Running tests...' : 'Compiling & running...'}</span>
          </div>
        )}

        {output && !isRunning && (
          <div className="console-output">
            {output.compilationError && (
              <div className="console-section">
                <div className="console-label error">Compilation Error</div>
                <pre className="console-pre error">{formatStderr(output.stderr)}</pre>
              </div>
            )}
            {!output.compilationError && output.stderr && (
              <div className="console-section">
                <div className="console-label warning">Warnings</div>
                <pre className="console-pre warning">{output.stderr}</pre>
              </div>
            )}
            {output.stdout && (
              <div className="console-section">
                {output.success && <div className="console-label success">Output</div>}
                <pre className="console-pre">{output.stdout}</pre>
              </div>
            )}
            {!output.stdout && !output.stderr && output.success && (
              <div className="console-note">(Program ran successfully with no output)</div>
            )}
          </div>
        )}

        {testResults && !isTesting && (
          <div className="console-tests">
            {testResults.map((result) => (
              <div key={result.testId} className={`test-result ${result.passed ? 'pass' : 'fail'}`}>
                <div className="test-result-header">
                  <span className="test-result-icon">{result.passed ? '✓' : '✗'}</span>
                  <span className="test-result-desc">{result.description}</span>
                  <span className={`test-result-badge ${result.passed ? 'pass' : 'fail'}`}>
                    {result.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                {!result.passed && (
                  <div className="test-result-details">
                    {result.error ? (
                      <div className="test-error">
                        <span className="test-detail-label">Error:</span>
                        <pre>{formatStderr(result.error)}</pre>
                      </div>
                    ) : (
                      <>
                        <div className="test-compare">
                          <div>
                            <span className="test-detail-label">Expected:</span>
                            <pre className="test-expected">{result.expected}</pre>
                          </div>
                          <div>
                            <span className="test-detail-label">Got:</span>
                            <pre className="test-got">{result.output || '(no output)'}</pre>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="test-summary">
              {testResults.every((t) => t.passed) ? (
                <div className="test-all-pass">
                  🎉 All tests passed! Exercise complete.
                </div>
              ) : (
                <div className="test-some-fail">
                  {testResults.filter((t) => !t.passed).length} test(s) failed. Keep going!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .console-wrapper {
          background: var(--bg-base);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .console-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .console-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .console-test-summary {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .console-test-summary.all-pass { background: var(--success-bg); color: var(--success); }
        .console-test-summary.has-fail { background: var(--error-bg); color: var(--error); }
        .console-body {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          min-height: 120px;
          max-height: 280px;
        }
        .console-empty {
          color: var(--text-disabled);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          font-size: 0.8125rem;
        }
        .console-running {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          padding: 8px 0;
        }
        .console-section { margin-bottom: 12px; }
        .console-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
          color: var(--text-muted);
        }
        .console-label.error   { color: var(--error); }
        .console-label.warning { color: var(--warning); }
        .console-label.success { color: var(--success); }
        .console-pre {
          white-space: pre-wrap;
          word-break: break-all;
          color: var(--text-primary);
          line-height: 1.6;
        }
        .console-pre.error   { color: var(--error); }
        .console-pre.warning { color: var(--warning); }
        .console-note { color: var(--text-muted); font-style: italic; }
        .test-result {
          border-radius: var(--radius-md);
          margin-bottom: 8px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }
        .test-result.pass { border-color: rgba(74, 222, 128, 0.2); }
        .test-result.fail { border-color: rgba(248, 113, 113, 0.2); }
        .test-result-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
        }
        .test-result.pass .test-result-header { background: rgba(74, 222, 128, 0.05); }
        .test-result.fail .test-result-header { background: rgba(248, 113, 113, 0.05); }
        .test-result-icon { font-size: 0.875rem; font-weight: 700; }
        .test-result.pass .test-result-icon { color: var(--success); }
        .test-result.fail .test-result-icon { color: var(--error); }
        .test-result-desc { flex: 1; font-size: 0.8125rem; color: var(--text-secondary); font-family: var(--font-sans); }
        .test-result-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 3px;
          letter-spacing: 0.05em;
        }
        .test-result-badge.pass { background: var(--success-bg); color: var(--success); }
        .test-result-badge.fail { background: var(--error-bg); color: var(--error); }
        .test-result-details {
          padding: 8px 12px 12px;
          border-top: 1px solid var(--border-subtle);
        }
        .test-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .test-detail-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); display: block; margin-bottom: 4px; font-family: var(--font-sans); }
        .test-expected { color: var(--success); white-space: pre-wrap; }
        .test-got { color: var(--error); white-space: pre-wrap; }
        .test-error pre { color: var(--error); white-space: pre-wrap; word-break: break-all; }
        .test-summary { margin-top: 12px; padding: 10px 12px; border-radius: var(--radius-md); }
        .test-all-pass { background: var(--success-bg); color: var(--success); font-size: 0.875rem; font-weight: 600; text-align: center; font-family: var(--font-sans); }
        .test-some-fail { background: var(--error-bg); color: var(--error); font-size: 0.875rem; text-align: center; font-family: var(--font-sans); }
      `}</style>
    </div>
  );
}

function formatStderr(stderr: string): string {
  // Clean up common Rust playground noise
  return stderr
    .replace(/\s*Compiling playground v[\d.]+ .+\n/g, '')
    .replace(/\s*Finished .+ in [\d.]+s\n?/g, '')
    .replace(/\s*Running `target\/debug\/playground`\n?/g, '')
    .trim();
}
