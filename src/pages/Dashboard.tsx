import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProgress } from '../types';
import { getCheckpointStats, getOverallStats } from '../store/progress';

interface DashboardProps {
  progress: UserProgress;
  totalExercises: number;
}

export default function Dashboard({ progress, totalExercises }: DashboardProps) {
  const navigate = useNavigate();
  const overall = getOverallStats(progress, totalExercises);
  const cp1 = getCheckpointStats(progress, 1, 19);
  const cp2 = getCheckpointStats(progress, 20, 35);
  const cp3 = getCheckpointStats(progress, 36, 45);
  const final = getCheckpointStats(progress, 46, 63);

  const nextLesson = (() => {
    for (let id = 1; id <= totalExercises; id++) {
      if (!progress.lessons[id]?.completed) return id;
    }
    return null;
  })();

  const recentCompleted = Object.values(progress.lessons)
    .filter((l) => l.completed && l.completedAt)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
    .slice(0, 5);

  const timeHours = Math.floor(overall.totalTimeMinutes / 60);
  const timeMins = overall.totalTimeMinutes % 60;

  return (
    <div className="dashboard animate-fade-in">
      {/* Hero */}
      <div className="dashboard-hero">
        <div className="hero-greeting">
          <h1>
            {overall.completed === 0 ? '👋 Welcome to RustPath' :
             overall.completed < 20 ? '🦀 Building Foundations' :
             overall.completed < 40 ? '⚙️ Mastering Rust' :
             overall.completed < 60 ? '🔮 Advanced Concepts' :
             '🏆 Almost There!'}
          </h1>
          <p className="text-secondary">
            {overall.completed === 0
              ? 'Start your Rust journey. Begin with the introduction chapter.'
              : `${overall.completed} of ${overall.total} exercises completed (${overall.percentage}%)`}
          </p>
        </div>
        {nextLesson ? (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate(`/lesson/${nextLesson}`)}
          >
            {overall.completed === 0 ? '🚀 Start Learning' : `▶ Continue — Exercise ${nextLesson}`}
          </button>
        ) : (
          <div className="badge badge-success" style={{fontSize:'1rem',padding:'8px 16px'}}>
            🎉 All exercises complete!
          </div>
        )}
      </div>

      {/* Playground shortcut */}
      <button className="playground-card" onClick={() => navigate('/playground')}>
        <div className="playground-card-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="3" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 10l5 4-5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 18h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <rect x="7" y="23" width="14" height="2" rx="1" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
        <div className="playground-card-text">
          <span className="playground-card-title">Rust Playground</span>
          <span className="playground-card-sub">
            Free-form editor with main.rs + helpers.rs module — experiment with anything
          </span>
        </div>
        <div className="playground-card-arrow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{overall.completed}</div>
          <div className="stat-label">Exercises Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{overall.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">
            {timeHours > 0 ? `${timeHours}h ${timeMins}m` : `${timeMins}m`}
          </div>
          <div className="stat-label">Time Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{overall.percentage}%</div>
          <div className="stat-label">Overall Progress</div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="overall-progress-card">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold">Overall Progress</span>
          <span className="text-sm text-rust">{overall.completed}/{overall.total}</span>
        </div>
        <div className="progress-bar-track" style={{height: 10}}>
          <div
            className="progress-bar-fill"
            style={{width: `${overall.percentage}%`}}
          />
        </div>
      </div>

      {/* Checkpoints */}
      <div className="checkpoints-grid">
        <CheckpointCard
          title="Chapter 1"
          subtitle="Introduction to Rust"
          icon="📖"
          stats={{ completed: progress.introCompleted ? 1 : 0, total: 1, percentage: progress.introCompleted ? 100 : 0 }}
          onClick={() => navigate('/chapter/intro')}
          color="blue"
          description="Install Rust, learn variables, types, functions, ownership basics"
          examUnlocked={false}
        />
        <CheckpointCard
          title="Checkpoint 1"
          subtitle="Rust Basics"
          icon="🦀"
          stats={cp1}
          onClick={() => navigate(nextLesson && nextLesson <= 19 ? `/lesson/${nextLesson}` : '/lesson/1')}
          examPath="/exam/checkpoint1"
          examUnlocked={cp1.completed === cp1.total}
          color="orange"
          description="Types, arithmetic, strings, arrays, loops, HashMaps"
        />
        <CheckpointCard
          title="Checkpoint 2"
          subtitle="Ownership & Collections"
          icon="⚙️"
          stats={cp2}
          onClick={() => navigate(nextLesson && nextLesson >= 20 && nextLesson <= 35 ? `/lesson/${nextLesson}` : '/lesson/20')}
          examPath="/exam/checkpoint2"
          examUnlocked={cp2.completed === cp2.total && cp1.completed === cp1.total}
          color="purple"
          description="Borrowing, references, structs, traits, iterators, sorting"
          locked={cp1.completed === 0}
        />
        <CheckpointCard
          title="Checkpoint 3"
          subtitle="Traits, Generics & Enums"
          icon="🔮"
          stats={cp3}
          onClick={() => navigate(nextLesson && nextLesson >= 36 && nextLesson <= 45 ? `/lesson/${nextLesson}` : '/lesson/36')}
          examPath="/exam/checkpoint3"
          examUnlocked={cp3.completed === cp3.total && cp2.completed === cp2.total}
          color="teal"
          description="Generic types, trait objects, complex enums, algorithms"
          locked={cp2.completed === 0}
        />
        <CheckpointCard
          title="Final"
          subtitle="Advanced Topics"
          icon="🏆"
          stats={final}
          onClick={() => navigate(nextLesson && nextLesson >= 46 ? `/lesson/${nextLesson}` : '/lesson/46')}
          examPath="/exam/final"
          examUnlocked={final.completed === final.total && cp3.completed === cp3.total}
          color="gold"
          description="Error handling, linear algebra, chrono, JSON, external crates"
          locked={cp3.completed === 0}
        />
      </div>

      {/* Recent activity */}
      {recentCompleted.length > 0 && (
        <div className="recent-section">
          <h3>Recent Completions</h3>
          <div className="recent-list">
            {recentCompleted.map((lesson) => (
              <button
                key={lesson.exerciseId}
                className="recent-item"
                onClick={() => navigate(`/lesson/${lesson.exerciseId}`)}
              >
                <span className="recent-check">✓</span>
                <span className="recent-label">Exercise {lesson.exerciseId}</span>
                <span className="recent-tests text-xs text-muted">
                  {lesson.testsPassed}/{lesson.testsTotal} tests
                </span>
                {lesson.completedAt && (
                  <span className="recent-time text-xs text-muted">
                    {formatRelativeTime(lesson.completedAt)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exam results */}
      {Object.keys(progress.examResults).length > 0 && (
        <div className="exam-results-section">
          <h3>Exam History</h3>
          <div className="exam-results-list">
            {Object.entries(progress.examResults).map(([examId, results]) => {
              const latest = results[results.length - 1];
              return (
                <div key={examId} className={`exam-result-card ${latest.passed ? 'pass' : 'fail'}`}>
                  <div className="exam-result-name">{formatExamName(examId)}</div>
                  <div className="exam-result-score">
                    <span className="exam-score-num">{latest.score}%</span>
                    <span className={`badge ${latest.passed ? 'badge-success' : 'badge-error'}`}>
                      {latest.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .dashboard { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .playground-card {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 20px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition);
          text-align: left;
          background-image: radial-gradient(ellipse at bottom left, rgba(249,115,22,0.07) 0%, transparent 60%);
        }
        .playground-card:hover {
          border-color: var(--rust);
          background-image: radial-gradient(ellipse at bottom left, rgba(249,115,22,0.13) 0%, transparent 60%);
          transform: translateY(-1px);
        }
        .playground-card-icon { color: var(--rust-light); flex-shrink: 0; }
        .playground-card-text { flex: 1; }
        .playground-card-title { display: block; font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
        .playground-card-sub { display: block; font-size: 0.8125rem; color: var(--text-muted); }
        .playground-card-arrow { color: var(--text-muted); transition: color var(--transition); }
        .playground-card:hover .playground-card-arrow { color: var(--rust-light); }
        .dashboard-hero {
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          background-image: radial-gradient(ellipse at top right, var(--rust-dim) 0%, transparent 60%);
        }
        .hero-greeting h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 6px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          text-align: center;
          transition: border-color var(--transition);
        }
        .stat-card:hover { border-color: var(--border-normal); }
        .stat-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .stat-value { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); }
        .stat-label { font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px; }
        .overall-progress-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
        }
        .checkpoints-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .recent-section h3, .exam-results-section h3 { font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
        .recent-list { display: flex; flex-direction: column; gap: 4px; }
        .recent-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all var(--transition);
          cursor: pointer;
          text-align: left;
        }
        .recent-item:hover { border-color: var(--border-normal); background: var(--bg-elevated); }
        .recent-check { color: var(--success); font-weight: 700; }
        .recent-label { flex: 1; font-size: 0.875rem; color: var(--text-secondary); }
        .recent-tests, .recent-time { margin-left: auto; }
        .exam-results-list { display: flex; flex-direction: column; gap: 6px; }
        .exam-result-card {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .exam-result-card.pass { background: var(--success-bg); border-color: rgba(74,222,128,0.2); }
        .exam-result-card.fail { background: var(--error-bg); border-color: rgba(248,113,113,0.2); }
        .exam-result-name { font-size: 0.875rem; font-weight: 500; }
        .exam-result-score { display: flex; align-items: center; gap: 8px; }
        .exam-score-num { font-size: 1.1rem; font-weight: 700; }
      `}</style>
    </div>
  );
}

interface CheckpointCardProps {
  title: string;
  subtitle: string;
  icon: string;
  stats: { completed: number; total: number; percentage: number };
  onClick: () => void;
  examPath?: string;
  examUnlocked?: boolean;
  color: string;
  description: string;
  locked?: boolean;
}

function CheckpointCard({
  title, subtitle, icon, stats, onClick, examPath, examUnlocked, color, description, locked
}: CheckpointCardProps) {
  const navigate = useNavigate();
  const isComplete = stats.completed === stats.total;

  return (
    <div className={`cp-card ${locked ? 'locked' : ''}`} onClick={!locked ? onClick : undefined}>
      <div className="cp-card-header">
        <span className="cp-icon">{icon}</span>
        <div className="cp-info">
          <div className="cp-title">{title}</div>
          <div className="cp-subtitle">{subtitle}</div>
        </div>
        {isComplete && <span className="cp-complete">✓</span>}
        {locked && <span className="cp-locked">🔒</span>}
      </div>
      <p className="cp-desc">{description}</p>
      <div className="cp-progress">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>{stats.completed}/{stats.total} exercises</span>
          <span>{stats.percentage}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{width: `${stats.percentage}%`}} />
        </div>
      </div>
      {examPath && (
        <button
          className={`cp-exam-btn ${examUnlocked ? '' : 'locked'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (examUnlocked) navigate(examPath);
          }}
        >
          {examUnlocked ? '🎯 Take Exam' : '🔒 Exam (complete all first)'}
        </button>
      )}
      <style>{`
        .cp-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all var(--transition);
          display: flex; flex-direction: column; gap: 12px;
        }
        .cp-card:not(.locked):hover { border-color: var(--rust); transform: translateY(-1px); }
        .cp-card.locked { opacity: 0.5; cursor: not-allowed; }
        .cp-card-header { display: flex; align-items: center; gap: 10px; }
        .cp-icon { font-size: 1.5rem; }
        .cp-info { flex: 1; }
        .cp-title { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); }
        .cp-subtitle { font-size: 0.75rem; color: var(--text-muted); }
        .cp-complete { color: var(--success); font-weight: 700; }
        .cp-locked { color: var(--text-muted); }
        .cp-desc { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5; }
        .cp-progress { }
        .cp-exam-btn {
          width: 100%;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-normal);
          background: none;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all var(--transition);
          text-align: center;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .cp-exam-btn:not(.locked):hover { background: var(--rust-dim); border-color: var(--rust); color: var(--rust-light); }
        .cp-exam-btn.locked { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'just now';
}

function formatExamName(examId: string): string {
  return examId.replace('checkpoint', 'Checkpoint ').replace('final', 'Final').replace(/^\w/, (c) => c.toUpperCase());
}
