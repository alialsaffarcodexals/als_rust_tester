import React from 'react';
import type { ExerciseDocs } from '../../types';

interface DocumentationPanelProps {
  docs: ExerciseDocs;
}

// Renders the Documentation tab for a guided exercise: the APIs/methods/traits
// commonly needed, curated documentation links (official docs, Rust By Example),
// and topical concept videos. Only resources that help solve the exercise.
export default function DocumentationPanel({ docs }: DocumentationPanelProps) {
  return (
    <div className="doc-root animate-fade-in">
      <div className="alert alert-info">
        These are the APIs and references most useful for this exercise. Skim them before you start —
        knowing the right tool is half the solution.
      </div>

      {docs.apis.length > 0 && (
        <section className="doc-card">
          <h4 className="doc-h">🔧 Required APIs &amp; language features</h4>
          <div className="doc-apis">
            {docs.apis.map((a) => (
              <a key={a.name} className="doc-api" href={a.url} target="_blank" rel="noopener noreferrer">
                <code className="doc-api-name">{a.name}</code>
                {a.note && <span className="doc-api-note">{a.note}</span>}
                <span className="doc-api-ext">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {docs.links.length > 0 && (
        <section className="doc-card">
          <h4 className="doc-h">📚 Documentation &amp; references</h4>
          <div className="doc-links">
            {docs.links.map((l) => (
              <a key={l.url} className="doc-link" href={l.url} target="_blank" rel="noopener noreferrer">
                <span className="doc-link-title">{l.title}</span>
                <span className="doc-link-ext">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {docs.videos && docs.videos.length > 0 && (
        <section className="doc-card">
          <h4 className="doc-h">▶️ Concept videos</h4>
          <div className="doc-videos">
            {docs.videos.map((v) => (
              <a key={v.url} className="doc-video" href={v.url} target="_blank" rel="noopener noreferrer">
                <span className="doc-video-icon">▶</span>
                <span className="doc-video-text">
                  <span className="doc-video-title">{v.title}</span>
                  {v.channel && <span className="doc-video-channel">{v.channel}</span>}
                </span>
                <span className="doc-link-ext">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .doc-root { display: flex; flex-direction: column; gap: 14px; }
        .doc-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .doc-h { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .doc-apis { display: flex; flex-direction: column; gap: 6px; }
        .doc-api {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 8px 12px; text-decoration: none;
          transition: border-color var(--transition);
        }
        .doc-api:hover { border-color: var(--rust); }
        .doc-api-name { font-family: var(--font-mono); font-size: 0.82rem; color: var(--syn-fn, #60a5fa); flex-shrink: 0; }
        .doc-api-note { font-size: 0.8rem; color: var(--text-muted); flex: 1; }
        .doc-api-ext, .doc-link-ext { color: var(--text-muted); flex-shrink: 0; font-size: 0.8rem; }
        .doc-links { display: flex; flex-direction: column; gap: 6px; }
        .doc-link {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 9px 12px; text-decoration: none;
          transition: border-color var(--transition);
        }
        .doc-link:hover { border-color: var(--accent-blue); }
        .doc-link-title { font-size: 0.85rem; color: var(--text-secondary); }
        .doc-videos { display: flex; flex-direction: column; gap: 6px; }
        .doc-video {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 9px 12px; text-decoration: none;
          transition: border-color var(--transition);
        }
        .doc-video:hover { border-color: #ff5f56; }
        .doc-video-icon {
          width: 26px; height: 26px; flex-shrink: 0; border-radius: var(--radius-sm);
          background: rgba(255,0,0,0.15); color: #ff5f56;
          display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
        }
        .doc-video-text { flex: 1; display: flex; flex-direction: column; }
        .doc-video-title { font-size: 0.85rem; color: var(--text-secondary); }
        .doc-video-channel { font-size: 0.72rem; color: var(--text-muted); }
        @media (max-width: 768px) { .doc-card { padding: 14px; } }
      `}</style>
    </div>
  );
}
