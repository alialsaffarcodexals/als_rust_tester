import React from 'react';
import { resolveConcepts } from '../../data/conceptLibrary';

interface ConceptGuideProps {
  conceptIds: string[];
  notes?: Record<string, string>; // optional per-exercise note keyed by concept id
}

// Renders the concepts an exercise practices: a beginner explanation, why it
// matters, and a minimal isolated example for each — resolved from the shared
// conceptLibrary so the same content is reused everywhere.
export default function ConceptGuide({ conceptIds, notes }: ConceptGuideProps) {
  const concepts = resolveConcepts(conceptIds);

  if (concepts.length === 0) {
    return <div className="cg-empty">No concept breakdown available for this exercise yet.</div>;
  }

  return (
    <div className="cg-root animate-fade-in">
      <div className="alert alert-info">
        These are the Rust concepts this exercise practices. Understand each one before you start —
        the side quiz will test them.
      </div>

      {concepts.map((c) => (
        <div key={c.id} className="cg-card">
          <div className="cg-card-head">
            <span className="cg-name">{c.name}</span>
            {c.docUrl && (
              <a className="cg-doc" href={c.docUrl} target="_blank" rel="noopener noreferrer">
                docs ↗
              </a>
            )}
          </div>

          <p className="cg-explain">{c.explanation}</p>

          {notes?.[c.id] && (
            <div className="cg-note">
              <span className="cg-note-badge">In this exercise</span>
              <span>{notes[c.id]}</span>
            </div>
          )}

          <div className="cg-why">
            <span className="cg-why-badge">Why it matters</span>
            <span>{c.whyItMatters}</span>
          </div>

          <pre className="cg-code"><code>{c.example}</code></pre>
          <p className="cg-example-explain">{c.exampleExplain}</p>
        </div>
      ))}

      <style>{`
        .cg-root { display: flex; flex-direction: column; gap: 14px; }
        .cg-empty { color: var(--text-muted); font-size: 0.9rem; padding: 16px; text-align: center; }
        .cg-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent-yellow);
          border-radius: var(--radius-lg); padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .cg-card-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .cg-name { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .cg-doc { font-size: 0.75rem; color: var(--accent-blue); flex-shrink: 0; }
        .cg-explain { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.65; margin: 0; }
        .cg-note, .cg-why { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.55; }
        .cg-note-badge {
          font-size: 0.64rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--rust-light); background: var(--rust-dim); padding: 2px 8px; border-radius: 999px; flex-shrink: 0;
        }
        .cg-why-badge {
          font-size: 0.64rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--accent-blue); background: var(--info-bg); padding: 2px 8px; border-radius: 999px; flex-shrink: 0;
        }
        .cg-code {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px; overflow-x: auto; margin: 4px 0 0;
        }
        .cg-code code { font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6; color: var(--text-primary); white-space: pre; }
        .cg-example-explain { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; margin: 0; }
        @media (max-width: 768px) { .cg-card { padding: 14px; } }
      `}</style>
    </div>
  );
}
