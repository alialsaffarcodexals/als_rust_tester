import React from 'react';
import type { Cp3Overview, Cp3Objectives } from '../../types';

interface ExerciseOverviewProps {
  overview: Cp3Overview;
  objectives: Cp3Objectives;
}

// The first stop in the learning journey: what the student is building, how it
// should behave, the constraints, common mistakes, and the learning objectives.
export default function ExerciseOverview({ overview, objectives }: ExerciseOverviewProps) {
  return (
    <div className="ov-root animate-fade-in">
      <section className="ov-card">
        <h4 className="ov-h">🎯 What you'll build</h4>
        <p className="ov-text">{overview.whatYouBuild}</p>
      </section>

      <section className="ov-card">
        <h4 className="ov-h">↔️ Input &amp; output</h4>
        <p className="ov-text">{overview.inputOutput}</p>
      </section>

      {overview.constraints.length > 0 && (
        <section className="ov-card">
          <h4 className="ov-h">📏 Constraints</h4>
          <ul className="ov-list">
            {overview.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
      )}

      {overview.commonMistakes.length > 0 && (
        <section className="ov-card warn">
          <h4 className="ov-h">⚠️ Common mistakes</h4>
          <ul className="ov-list">
            {overview.commonMistakes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
      )}

      <section className="ov-card learn">
        <h4 className="ov-h">📚 Learning objectives</h4>
        <div className="ov-obj-block">
          <span className="ov-obj-label">You'll learn to</span>
          <ul className="ov-list">
            {objectives.learn.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <div className="ov-obj-block">
          <span className="ov-obj-label">Why this exercise exists</span>
          <p className="ov-text">{objectives.whyExists}</p>
        </div>
        <div className="ov-obj-block">
          <span className="ov-obj-label">Rust skills practiced</span>
          <div className="ov-skills">
            {objectives.rustSkills.map((s) => <span key={s} className="ov-skill">{s}</span>)}
          </div>
        </div>
      </section>

      <style>{`
        .ov-root { display: flex; flex-direction: column; gap: 14px; }
        .ov-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 16px 18px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ov-card.warn { border-left: 3px solid var(--warning); }
        .ov-card.learn { border-left: 3px solid var(--accent-blue); }
        .ov-h { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .ov-text { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.65; margin: 0; white-space: pre-wrap; }
        .ov-list { display: flex; flex-direction: column; gap: 5px; margin: 0; }
        .ov-list li { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55; padding-left: 16px; position: relative; }
        .ov-list li::before { content: '•'; position: absolute; left: 4px; color: var(--rust); }
        .ov-obj-block { display: flex; flex-direction: column; gap: 6px; }
        .ov-obj-label { font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-blue); }
        .ov-skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .ov-skill {
          font-size: 0.74rem; color: var(--text-secondary);
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: 999px; padding: 2px 10px;
        }
        @media (max-width: 768px) { .ov-card { padding: 14px; } }
      `}</style>
    </div>
  );
}
