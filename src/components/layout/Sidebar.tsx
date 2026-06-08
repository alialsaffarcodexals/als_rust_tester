import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProgress } from '../../types';
import { getCheckpointStats } from '../../store/progress';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  locked?: boolean;
  progress?: number;
}

interface SidebarProps {
  progress: UserProgress;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CHECKPOINT_RANGES = {
  checkpoint1: { first: 1, last: 19 },
  checkpoint2: { first: 20, last: 35 },
  checkpoint3: { first: 36, last: 45 },
  final: { first: 46, last: 63 },
};

export default function Sidebar({ progress }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const getLessonStatus = (id: number) => {
    const lesson = progress.lessons[id];
    if (lesson?.completed) return 'completed';
    if (id === 1 || progress.lessons[id - 1]?.completed) return 'unlocked';
    return 'locked';
  };

  const checkpoint1Stats = getCheckpointStats(progress, 1, 19);
  const checkpoint2Stats = getCheckpointStats(progress, 20, 35);
  const checkpoint3Stats = getCheckpointStats(progress, 36, 45);
  const finalStats = getCheckpointStats(progress, 46, 63);

  const sections = [
    {
      key: 'intro',
      label: 'Introduction',
      icon: '📖',
      path: '/chapter/intro',
      progress: progress.introCompleted ? 100 : 0,
      items: [],
    },
    {
      key: 'cp1',
      label: 'Checkpoint 1',
      sublabel: 'Rust Basics',
      icon: '🦀',
      examPath: '/exam/checkpoint1',
      examUnlocked: checkpoint1Stats.completed === checkpoint1Stats.total,
      stats: checkpoint1Stats,
      items: Array.from({ length: 19 }, (_, i) => i + 1).map((id) => ({
        id,
        label: getExerciseName(id),
        path: `/lesson/${id}`,
        status: getLessonStatus(id),
      })),
    },
    {
      key: 'cp2',
      label: 'Checkpoint 2',
      sublabel: 'Ownership & Collections',
      icon: '⚙️',
      examPath: '/exam/checkpoint2',
      examUnlocked: checkpoint2Stats.completed === checkpoint2Stats.total,
      stats: checkpoint2Stats,
      items: Array.from({ length: 16 }, (_, i) => i + 20).map((id) => ({
        id,
        label: getExerciseName(id),
        path: `/lesson/${id}`,
        status: getLessonStatus(id),
      })),
    },
    {
      key: 'cp3',
      label: 'Checkpoint 3',
      sublabel: 'Traits, Generics & Enums',
      icon: '🔮',
      examPath: '/exam/checkpoint3',
      examUnlocked: checkpoint3Stats.completed === checkpoint3Stats.total,
      stats: checkpoint3Stats,
      items: Array.from({ length: 10 }, (_, i) => i + 36).map((id) => ({
        id,
        label: getExerciseName(id),
        path: `/lesson/${id}`,
        status: getLessonStatus(id),
      })),
    },
    {
      key: 'final',
      label: 'Final',
      sublabel: 'Advanced Topics',
      icon: '🏆',
      examPath: '/exam/final',
      examUnlocked: finalStats.completed === finalStats.total,
      stats: finalStats,
      items: Array.from({ length: 18 }, (_, i) => i + 46).map((id) => ({
        id,
        label: getExerciseName(id),
        path: `/lesson/${id}`,
        status: getLessonStatus(id),
      })),
    },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <div className="sidebar-logo-icon">R</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-title">RustPath</span>
          <span className="sidebar-logo-sub">Piscine Zone01</span>
        </div>
      </div>

      {/* Dashboard link */}
      <nav className="sidebar-nav">
        <button
          className={`sidebar-nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <span className="sidebar-nav-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </span>
          Dashboard
        </button>
      </nav>

      <div className="sidebar-divider" />

      {/* Curriculum sections */}
      <div className="sidebar-curriculum">
        {sections.map((section) => {
          const isOpen = !collapsed[section.key];

          if (section.key === 'intro') {
            return (
              <div key={section.key} className="sidebar-section">
                <button
                  className={`sidebar-section-item ${isActive(section.path ?? '') ? 'active' : ''}`}
                  onClick={() => section.path && navigate(section.path)}
                >
                  <span>{section.icon}</span>
                  <span className="flex-1 truncate">{section.label}</span>
                  {progress.introCompleted && (
                    <span className="sidebar-check"><CheckIcon /></span>
                  )}
                </button>
              </div>
            );
          }

          return (
            <div key={section.key} className="sidebar-section">
              {/* Section header */}
              <button
                className="sidebar-section-header"
                onClick={() => toggleSection(section.key)}
              >
                <span>{section.icon}</span>
                <div className="sidebar-section-info">
                  <span className="sidebar-section-label">{section.label}</span>
                  <span className="sidebar-section-sublabel">{section.sublabel}</span>
                </div>
                <div className="sidebar-section-meta">
                  <span className="sidebar-section-count">
                    {section.stats!.completed}/{section.stats!.total}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Progress bar */}
              <div className="sidebar-progress-bar">
                <div
                  className="sidebar-progress-fill"
                  style={{ width: `${section.stats!.percentage}%` }}
                />
              </div>

              {/* Exercise list */}
              {isOpen && (
                <div className="sidebar-items">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${item.status}`}
                      onClick={() => item.status !== 'locked' && navigate(item.path)}
                      disabled={item.status === 'locked'}
                    >
                      <span className="sidebar-item-dot">
                        {item.status === 'completed' ? (
                          <CheckIcon />
                        ) : item.status === 'locked' ? (
                          <LockIcon />
                        ) : (
                          <span className="sidebar-item-number">{item.id}</span>
                        )}
                      </span>
                      <span className="sidebar-item-label truncate">{item.label}</span>
                    </button>
                  ))}

                  {/* Exam button */}
                  <button
                    className={`sidebar-exam-btn ${section.examUnlocked ? '' : 'locked'}`}
                    onClick={() => section.examUnlocked && section.examPath && navigate(section.examPath)}
                    disabled={!section.examUnlocked}
                  >
                    {section.examUnlocked ? '🎯' : '🔒'} {section.label} Exam
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-surface);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: background var(--transition);
        }
        .sidebar-logo:hover { background: var(--bg-elevated); }
        .sidebar-logo-icon {
          width: 32px; height: 32px;
          background: var(--rust);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1.1rem; color: white;
          flex-shrink: 0;
        }
        .sidebar-logo-title { display: block; font-weight: 700; font-size: 0.9375rem; color: var(--text-primary); }
        .sidebar-logo-sub { display: block; font-size: 0.7rem; color: var(--text-muted); }
        .sidebar-nav { padding: 8px; }
        .sidebar-nav-item {
          width: 100%;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px;
          border-radius: var(--radius-md);
          border: none; background: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: all var(--transition);
          text-align: left;
        }
        .sidebar-nav-item:hover { background: var(--bg-elevated); color: var(--text-primary); }
        .sidebar-nav-item.active { background: var(--rust-dim); color: var(--rust-light); }
        .sidebar-nav-icon { display: flex; align-items: center; }
        .sidebar-divider { height: 1px; background: var(--border-subtle); margin: 0 8px; }
        .sidebar-curriculum { flex: 1; overflow-y: auto; padding: 8px; }
        .sidebar-section { margin-bottom: 4px; }
        .sidebar-section-item {
          width: 100%;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px;
          border-radius: var(--radius-md);
          border: none; background: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: all var(--transition);
          text-align: left;
        }
        .sidebar-section-item:hover { background: var(--bg-elevated); color: var(--text-primary); }
        .sidebar-section-item.active { background: var(--rust-dim); color: var(--rust-light); }
        .sidebar-check { color: var(--success); display: flex; }
        .sidebar-section-header {
          width: 100%;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px;
          border-radius: var(--radius-md);
          border: none; background: none;
          transition: background var(--transition);
          cursor: pointer;
          text-align: left;
        }
        .sidebar-section-header:hover { background: var(--bg-elevated); }
        .sidebar-section-info { flex: 1; min-width: 0; }
        .sidebar-section-label { display: block; font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); }
        .sidebar-section-sublabel { display: block; font-size: 0.7rem; color: var(--text-muted); }
        .sidebar-section-meta { display: flex; align-items: center; gap: 4px; }
        .sidebar-section-count { font-size: 0.7rem; color: var(--text-muted); }
        .sidebar-progress-bar {
          height: 2px;
          background: var(--bg-hover);
          border-radius: 1px;
          margin: 2px 10px 4px;
          overflow: hidden;
        }
        .sidebar-progress-fill {
          height: 100%;
          background: var(--rust);
          border-radius: 1px;
          transition: width 0.4s ease;
        }
        .sidebar-items { padding: 2px 0 8px 8px; display: flex; flex-direction: column; gap: 1px; }
        .sidebar-item {
          width: 100%;
          display: flex; align-items: center; gap: 8px;
          padding: 5px 8px;
          border-radius: var(--radius-sm);
          border: none; background: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          transition: all var(--transition);
          text-align: left;
          cursor: pointer;
        }
        .sidebar-item:hover:not(:disabled) { background: var(--bg-elevated); color: var(--text-secondary); }
        .sidebar-item.active { background: var(--rust-dim); color: var(--rust-light); }
        .sidebar-item.completed { color: var(--text-secondary); }
        .sidebar-item.completed .sidebar-item-dot { color: var(--success); }
        .sidebar-item.locked { opacity: 0.5; cursor: not-allowed; }
        .sidebar-item-dot { width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sidebar-item-number { font-size: 0.65rem; color: var(--text-muted); font-family: var(--font-mono); }
        .sidebar-item-label { min-width: 0; }
        .sidebar-exam-btn {
          width: 100%;
          padding: 7px 10px;
          margin-top: 4px;
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-normal);
          background: none;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all var(--transition);
          text-align: center;
        }
        .sidebar-exam-btn:not(.locked):hover { background: var(--rust-dim); border-color: var(--rust); color: var(--rust-light); }
        .sidebar-exam-btn.locked { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </aside>
  );
}

function getExerciseName(id: number): string {
  const names: Record<number, string> = {
    1: 'Scalar Types', 2: 'Doubtful', 3: 'Division & Remainder', 4: 'Temperature',
    5: 'Reverse String', 6: 'Arrays', 7: 'String Methods', 8: 'Char Length',
    9: 'To URL', 10: 'Delete Prefix', 11: 'Capitalizing', 12: 'Name Initials',
    13: 'Factorial', 14: 'Fibonacci', 15: 'Looping', 16: 'Bigger',
    17: 'Groceries', 18: 'Tuples & Refs', 19: 'Speed Transform',
    20: 'Borrow', 21: 'Copy Types', 22: 'Ownership', 23: 'Borrow References',
    24: 'Changes', 25: 'Lifetimes', 26: 'Bubble Sort', 27: 'Arrange It',
    28: 'Word Frequency', 29: 'Statistics', 30: 'Permutation',
    31: 'Circle', 32: 'Does It Fit', 33: 'Profanity Filter', 34: 'Border Cross',
    35: 'Card Deck',
    36: 'Generics', 37: 'Traits (Food)', 38: 'Roman Numbers', 39: 'Roman Iterator',
    40: 'Blood Types', 41: 'Events', 42: 'Mobs', 43: 'Cipher (Atbash)',
    44: 'Tic Tac Toe', 45: 'Shopping Mall',
    46: 'Panic', 47: 'Unwrap/Expect', 48: 'File Handling', 49: 'Question Mark',
    50: 'Edit Distance', 51: 'Expected Variable', 52: 'Error Types',
    53: 'Boxing Errors', 54: 'Linear Algebra Scalar', 55: 'Linear Algebra Vector',
    56: 'Matrix Transpose', 57: 'Generic Matrix', 58: 'Matrix Add/Sub',
    59: 'Matrix Multiply', 60: 'Middle Day', 61: 'CLI Flags', 62: 'Macro Calculator',
    63: 'Commit Stats',
  };
  return names[id] ?? `Exercise ${id}`;
}
