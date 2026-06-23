import React from 'react';
import { videosForConcepts } from '../../data/conceptVideos';

interface VideosPanelProps {
  conceptIds: string[];
}

// The Videos journey section (Zone01 Final): short, concept-focused videos that
// reinforce the concepts this exercise needs, resolved from its conceptIds. If
// nothing relevant is found, a friendly message is shown rather than padding
// with irrelevant videos.
export default function VideosPanel({ conceptIds }: VideosPanelProps) {
  const videos = videosForConcepts(conceptIds);

  if (videos.length === 0) {
    return (
      <div className="vids-root animate-fade-in">
        <div className="vids-empty">
          <div className="vids-empty-icon">🎬</div>
          <p>No high-quality concept video was found for this exercise.</p>
          <span>Check the Concepts and Documentation tabs for written explanations instead.</span>
        </div>
        <style>{VIDEO_STYLES}</style>
      </div>
    );
  }

  return (
    <div className="vids-root animate-fade-in">
      <div className="alert alert-info">
        Short, concept-focused videos to watch before you start. They reinforce the ideas this
        exercise needs — not a full Rust course.
      </div>

      <div className="vids-list">
        {videos.map((v) => (
          <a key={v.url} className="vids-card" href={v.url} target="_blank" rel="noopener noreferrer">
            <span className="vids-thumb">▶</span>
            <span className="vids-body">
              <span className="vids-top">
                <span className="vids-title">{v.title}</span>
                <span className="vids-duration">{v.duration}</span>
              </span>
              <span className="vids-meta">
                <span className="vids-concept">{v.concept}</span>
                {v.channel && <span className="vids-channel">· {v.channel}</span>}
              </span>
              <span className="vids-why">{v.why}</span>
            </span>
            <span className="vids-ext">↗</span>
          </a>
        ))}
      </div>

      <style>{VIDEO_STYLES}</style>
    </div>
  );
}

const VIDEO_STYLES = `
  .vids-root { display: flex; flex-direction: column; gap: 14px; }
  .vids-list { display: flex; flex-direction: column; gap: 8px; }
  .vids-card {
    display: flex; align-items: flex-start; gap: 12px;
    background: var(--bg-surface); border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg); padding: 12px 14px; text-decoration: none;
    transition: border-color var(--transition), transform var(--transition);
  }
  .vids-card:hover { border-color: #ff5f56; transform: translateY(-1px); }
  .vids-thumb {
    width: 34px; height: 34px; flex-shrink: 0; border-radius: var(--radius-md);
    background: rgba(255,0,0,0.15); color: #ff5f56;
    display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
  }
  .vids-body { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .vids-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
  .vids-title { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
  .vids-duration {
    flex-shrink: 0; font-size: 0.68rem; font-weight: 700; color: var(--accent-yellow);
    background: var(--warning-bg); border-radius: 999px; padding: 2px 8px; white-space: nowrap;
  }
  .vids-meta { display: flex; flex-wrap: wrap; gap: 5px; font-size: 0.74rem; }
  .vids-concept {
    color: var(--rust-light); background: var(--rust-dim);
    border-radius: 999px; padding: 1px 8px; font-weight: 600;
  }
  .vids-channel { color: var(--text-muted); }
  .vids-why { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }
  .vids-ext { color: var(--text-muted); flex-shrink: 0; font-size: 0.8rem; }
  .vids-empty {
    display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center;
    background: var(--bg-surface); border: 1px dashed var(--border-normal);
    border-radius: var(--radius-lg); padding: 28px 20px; color: var(--text-secondary);
  }
  .vids-empty-icon { font-size: 2rem; }
  .vids-empty p { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0; }
  .vids-empty span { font-size: 0.8rem; color: var(--text-muted); }
  @media (max-width: 768px) {
    .vids-top { flex-direction: column; gap: 2px; }
  }
`;
