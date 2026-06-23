import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProgress, Exercise } from '../../types';
import { getCheckpointStats } from '../../store/progress';
import { getAllExercises, getExercisesByCheckpoint } from '../../data/curriculum';

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
  isOpen?: boolean;
  onClose?: () => void;
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
  checkpoint1:  { first: 1,   last: 19  },
  checkpoint2:  { first: 20,  last: 35  },
  checkpoint3:  { first: 36,  last: 45  },
  final:        { first: 46,  last: 63  },
};

// Loaded once at module level — no re-fetching on re-render
const ALL_EXERCISES: Exercise[] = getAllExercises();

function getExerciseListStats(
  progress: UserProgress,
  exercises: Exercise[]
): { completed: number; total: number; percentage: number } {
  const total = exercises.length;
  const completed = exercises.filter((ex) => progress.lessons[ex.id]?.completed).length;
  return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

function groupByLevel(exercises: Exercise[]): [number, Exercise[]][] {
  const map = new Map<number, Exercise[]>();
  for (const ex of exercises) {
    const lvl = ex.order;
    if (!map.has(lvl)) map.set(lvl, []);
    map.get(lvl)!.push(ex);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a - b);
}

const CHECKPOINT_LABELS: Record<string, string> = {
  intro: 'Intro',
  checkpoint1: 'CP 1',
  checkpoint2: 'CP 2',
  checkpoint3: 'CP 3',
  final: 'Final',
  zone01_cp1:   'Z01 CP1',
  zone01_cp2:   'Z01 CP2',
  zone01_cp3:   'Z01 CP3',
  zone01_final: 'Z01 Final',
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

export default function Sidebar({ progress, isOpen = false, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const nav = useCallback((path: string) => {
    navigate(path);
    onClose?.();
  }, [navigate, onClose]);
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
    nav(`/lesson/${ex.id}`);
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

  const getLessonStatus = (id: number): 'completed' | 'unlocked' | 'locked' => {
    const lesson = progress.lessons[id];
    if (lesson?.completed) return 'completed';
    return 'unlocked';
  };

  const checkpoint1Stats = getCheckpointStats(progress, 1, 19);
  const checkpoint2Stats = getCheckpointStats(progress, 20, 35);
  const checkpoint3Stats = getCheckpointStats(progress, 36, 45);
  const finalStats = getCheckpointStats(progress, 46, 63);

  const z01cp1Exercises = getExercisesByCheckpoint('zone01_cp1');
  const z01cp2Exercises = getExercisesByCheckpoint('zone01_cp2');
  const z01cp3Exercises = getExercisesByCheckpoint('zone01_cp3');
  const z01finalExercises = getExercisesByCheckpoint('zone01_final');

  const z01cp1Stats = getExerciseListStats(progress, z01cp1Exercises);
  const z01cp2Stats = getExerciseListStats(progress, z01cp2Exercises);
  const z01cp3Stats = getExerciseListStats(progress, z01cp3Exercises);
  const z01finalStats = getExerciseListStats(progress, z01finalExercises);

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
    {
      key: 'zone01_cp1',
      label: 'Zone01 — CP1',
      sublabel: 'Basics & Algorithms',
      icon: '🦀',
      examPath: null as string | null,
      examUnlocked: false,
      stats: z01cp1Stats,
      zoneExercises: z01cp1Exercises,
      items: [],
    },
    {
      key: 'zone01_cp2',
      label: 'Zone01 — CP2',
      sublabel: 'Structs & Enums',
      icon: '⚙️',
      examPath: null as string | null,
      examUnlocked: false,
      stats: z01cp2Stats,
      zoneExercises: z01cp2Exercises,
      items: [],
    },
    {
      key: 'zone01_cp3',
      label: 'Zone01 — CP3',
      sublabel: 'Traits & Lifetimes',
      icon: '🔮',
      examPath: '/quiz' as string | null,
      examUnlocked: true,
      stats: z01cp3Stats,
      zoneExercises: z01cp3Exercises,
      items: [],
    },
    {
      key: 'zone01_final',
      label: 'Zone01 — Final',
      sublabel: 'Advanced Rust',
      icon: '🏆',
      examPath: '/final-prep' as string | null,
      examUnlocked: true,
      stats: z01finalStats,
      zoneExercises: z01finalExercises,
      items: [],
    },
  ];

  return (
    <>
      {/* Mobile overlay — closes sidebar when tapped */}
      <div
        className={`sidebar-overlay${isOpen ? ' sidebar-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
      {/* Mobile close button */}
      <button className="sidebar-close-btn" onClick={onClose} aria-label="Close navigation">×</button>

      {/* Logo */}
      <div className="sidebar-logo" onClick={() => nav('/')}>
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
          onClick={() => nav('/')}
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
          onClick={() => nav('/playground')}
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
        <button
          className={`sidebar-nav-item ${isActive('/quiz') ? 'active' : ''}`}
          onClick={() => nav('/quiz')}
        >
          <span className="sidebar-nav-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2 4 4 .5-3 3 .8 4L8 14.5 4.2 16.5l.8-4-3-3 4-.5L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </span>
          CP3 Quiz
        </button>
        <button
          className={`sidebar-nav-item ${isActive('/final-prep') ? 'active' : ''}`}
          onClick={() => nav('/final-prep')}
        >
          <span className="sidebar-nav-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 2v12M3 3h7l-1.5 2.5L10 8H3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </span>
          Final Prep
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
                  onClick={() => section.path && nav(section.path)}
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
                  {'zoneExercises' in section && section.zoneExercises && section.zoneExercises.length > 0 ? (
                    // Zone01 sections: group by level
                    groupByLevel(section.zoneExercises).map(([level, exs]) => (
                      <div key={level}>
                        <div className="sidebar-level-header">Level {level}</div>
                        {exs.map((ex) => {
                          const status = getLessonStatus(ex.id);
                          const path = `/lesson/${ex.id}`;
                          return (
                            <button
                              key={ex.id}
                              className={`sidebar-item ${isActive(path) ? 'active' : ''} ${status}`}
                              onClick={() => status !== 'locked' && nav(path)}
                              disabled={status === 'locked'}
                            >
                              <span className="sidebar-item-dot">
                                {status === 'completed' ? (
                                  <CheckIcon />
                                ) : status === 'locked' ? (
                                  <LockIcon />
                                ) : (
                                  <span className="sidebar-item-number">{ex.id}</span>
                                )}
                              </span>
                              <span className="sidebar-item-label truncate">{ex.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))
                  ) : (
                    // Regular sections: flat list
                    section.items.map((item) => (
                      <button
                        key={item.id}
                        className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${item.status}`}
                        onClick={() => item.status !== 'locked' && nav(item.path)}
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
                    ))
                  )}

                  {/* Exam / quiz button */}
                  {section.examPath !== null && <button
                    className={`sidebar-exam-btn ${section.examUnlocked ? '' : 'locked'}`}
                    onClick={() => section.examUnlocked && section.examPath && nav(section.examPath)}
                    disabled={!section.examUnlocked}
                  >
                    {section.examPath === '/quiz'
                      ? `🧩 ${section.label} Quiz`
                      : section.examPath === '/final-prep'
                      ? '🏁 Final Prep Quiz'
                      : `${section.examUnlocked ? '🎯' : '🔒'} ${section.label} Exam`}
                  </button>}
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
        .sidebar-level-header {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-disabled);
          padding: 6px 8px 2px;
          margin-top: 4px;
        }
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
    </>
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
  return ALL_EXERCISES.find((e) => e.id === id)?.title ?? `Exercise `;
}
