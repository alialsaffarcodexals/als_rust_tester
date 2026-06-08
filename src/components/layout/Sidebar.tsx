import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProgress, Exercise } from '../../types';
import { getCheckpointStats } from '../../store/progress';
import { getAllExercises } from '../../data/curriculum';

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

// Loaded once at module level — no re-fetching on re-render
const ALL_EXERCISES: Exercise[] = getAllExercises();

const CHECKPOINT_LABELS: Record<string, string> = {
  intro: 'Intro',
  checkpoint1: 'CP 1',
  checkpoint2: 'CP 2',
  checkpoint3: 'CP 3',
  final: 'Final',
};

function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return ALL_EXERCISES.filter((ex) => {
    const haystack = [
      ex.title,
      ex.concept.slice(0, 300),
      ex.question.slice(0, 300),
    ].join(' ').toLowerCase();
    return haystack.includes(q);
  }).slice(0, 9);
}

export default function Sidebar({ progress }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Search state
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestions = searchExercises(query);
  const showSuggestions = focused && query.trim().length > 0;

  const clearSearch = useCallback(() => {
    setQuery('');
    setActiveIdx(-1);
  }, []);

  const selectSuggestion = useCallback((ex: Exercise) => {
    navigate(`/lesson/${ex.id}`);
    clearSearch();
    searchRef.current?.blur();
  }, [navigate, clearSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIdx]);
    } else if (e.key === 'Escape') {
      clearSearch();
      searchRef.current?.blur();
    }
  }, [showSuggestions, suggestions, activeIdx, selectSuggestion, clearSearch]);

  // Reset active index when query changes
  useEffect(() => { setActiveIdx(-1); }, [query]);

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const getLessonStatus = (id: number) => {
    const lesson = progress.lessons[id];
    if (lesson?.completed) return 'completed';
    return 'unlocked';
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
        <button
          className={`sidebar-nav-item ${isActive('/playground') ? 'active' : ''}`}
          onClick={() => navigate('/playground')}
        >
          <span className="sidebar-nav-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 6l3 2-3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </span>
          Playground
        </button>
      </nav>

      <div className="sidebar-divider" />

      {/* Search */}
      <div className="sb-search-wrap">
        <div className={`sb-search-box ${focused ? 'focused' : ''}`}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="sb-search-icon">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            ref={searchRef}
            className="sb-search-input"
            placeholder="Search lessons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className="sb-search-clear" onClick={clearSearch} tabIndex={-1}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <div className="sb-suggestions">
            {suggestions.length === 0 ? (
              <div className="sb-no-results">No lessons match "{query}"</div>
            ) : (
              suggestions.map((ex, i) => {
                const done = progress.lessons[ex.id]?.completed;
                return (
                  <button
                    key={ex.id}
                    className={`sb-suggestion ${i === activeIdx ? 'active' : ''}`}
                    onMouseDown={() => selectSuggestion(ex)}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <span className="sb-sug-num">#{ex.id}</span>
                    <span className="sb-sug-title">{highlightMatch(ex.title, query)}</span>
                    <span className="sb-sug-cp">{CHECKPOINT_LABELS[ex.checkpoint] ?? ex.checkpoint}</span>
                    {done && (
                      <span className="sb-sug-done">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

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

        /* Search */
        .sb-search-wrap {
          padding: 8px 8px 4px;
          position: relative;
          flex-shrink: 0;
        }
        .sb-search-box {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .sb-search-box.focused {
          border-color: var(--rust);
          box-shadow: 0 0 0 2px var(--rust-dim);
        }
        .sb-search-icon { color: var(--text-disabled); flex-shrink: 0; }
        .sb-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 0.8rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          min-width: 0;
        }
        .sb-search-input::placeholder { color: var(--text-disabled); }
        .sb-search-clear {
          background: none;
          border: none;
          padding: 2px;
          cursor: pointer;
          color: var(--text-disabled);
          display: flex;
          align-items: center;
          border-radius: 3px;
          transition: color var(--transition);
          flex-shrink: 0;
        }
        .sb-search-clear:hover { color: var(--text-secondary); }

        /* Suggestions */
        .sb-suggestions {
          margin-top: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .sb-no-results {
          padding: 12px 10px;
          font-size: 0.78rem;
          color: var(--text-muted);
          text-align: center;
        }
        .sb-suggestion {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          padding: 7px 10px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          transition: background var(--transition);
          border-bottom: 1px solid var(--border-subtle);
        }
        .sb-suggestion:last-child { border-bottom: none; }
        .sb-suggestion:hover, .sb-suggestion.active { background: var(--bg-elevated); }
        .sb-sug-num {
          font-size: 0.65rem;
          font-family: var(--font-mono);
          color: var(--text-disabled);
          flex-shrink: 0;
          width: 24px;
        }
        .sb-sug-title {
          flex: 1;
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        .sb-suggestion.active .sb-sug-title, .sb-suggestion:hover .sb-sug-title {
          color: var(--text-primary);
        }
        .sb-sug-cp {
          font-size: 0.62rem;
          font-weight: 600;
          padding: 1px 5px;
          background: var(--bg-hover);
          border-radius: 3px;
          color: var(--text-muted);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .sb-sug-done { color: var(--success); display: flex; flex-shrink: 0; }
        .sb-highlight {
          background: var(--rust-dim);
          color: var(--rust-light);
          border-radius: 2px;
          padding: 0 1px;
        }
      `}</style>
    </aside>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1 || !query.trim()) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="sb-highlight">{text.slice(idx, idx + query.trim().length)}</mark>
      {text.slice(idx + query.trim().length)}
    </>
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
