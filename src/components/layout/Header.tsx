import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProgress } from '../../types';
import { getOverallStats } from '../../store/progress';

interface HeaderProps {
  progress: UserProgress;
  totalExercises: number;
}

export default function Header({ progress, totalExercises }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const stats = getOverallStats(progress, totalExercises);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/chapter/intro')) return 'Chapter 1 — Introduction to Rust';
    if (path.startsWith('/lesson/')) {
      const id = path.split('/').pop();
      return `Exercise ${id}`;
    }
    if (path.startsWith('/exam/checkpoint1')) return 'Checkpoint 1 Exam';
    if (path.startsWith('/exam/checkpoint2')) return 'Checkpoint 2 Exam';
    if (path.startsWith('/exam/checkpoint3')) return 'Checkpoint 3 Exam';
    if (path.startsWith('/exam/final')) return 'Final Exam';
    return 'RustPath';
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') return [];
    if (path.startsWith('/chapter/intro')) return [{ label: 'Introduction', path: '/chapter/intro' }];
    if (path.startsWith('/lesson/')) {
      const id = parseInt(path.split('/').pop() ?? '0');
      let checkpoint = '';
      if (id <= 19) checkpoint = 'Checkpoint 1';
      else if (id <= 35) checkpoint = 'Checkpoint 2';
      else if (id <= 45) checkpoint = 'Checkpoint 3';
      else checkpoint = 'Final';
      return [
        { label: checkpoint, path: '/' },
        { label: `Exercise ${id}`, path: path },
      ];
    }
    if (path.startsWith('/exam/')) {
      const name = path.split('/').pop()?.replace('checkpoint', 'Checkpoint ') ?? 'Exam';
      return [{ label: `${name} Exam`, path }];
    }
    return [];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="app-header">
      {/* Left: breadcrumbs / title */}
      <div className="header-left">
        {breadcrumbs.length > 0 ? (
          <nav className="breadcrumbs">
            <button className="breadcrumb-home" onClick={() => navigate('/')}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L2 5.5V12h3V8.5h4V12h3V5.5L7 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </button>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.path}>
                <span className="breadcrumb-sep">/</span>
                <button
                  className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'current' : ''}`}
                  onClick={() => i < breadcrumbs.length - 1 && navigate(crumb.path)}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <h1 className="header-title">{getPageTitle()}</h1>
        )}
      </div>

      {/* Right: stats pills */}
      <div className="header-right">
        <div className="header-stat">
          <span className="header-stat-icon">🔥</span>
          <span className="header-stat-value">{stats.streak}</span>
          <span className="header-stat-label">day streak</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-icon">✅</span>
          <span className="header-stat-value">{stats.completed}</span>
          <span className="header-stat-label">/ {stats.total} done</span>
        </div>
        <div className="header-progress-wrap">
          <div className="header-progress-bar">
            <div
              className="header-progress-fill"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <span className="header-progress-pct">{stats.percentage}%</span>
        </div>
      </div>

      <style>{`
        .app-header {
          height: var(--header-height);
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          gap: 16px;
          flex-shrink: 0;
          z-index: 10;
        }
        .header-left { display: flex; align-items: center; min-width: 0; }
        .header-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); }
        .breadcrumbs { display: flex; align-items: center; gap: 4px; }
        .breadcrumb-home {
          background: none; border: none; color: var(--text-muted);
          display: flex; align-items: center;
          transition: color var(--transition); cursor: pointer;
        }
        .breadcrumb-home:hover { color: var(--text-primary); }
        .breadcrumb-sep { color: var(--text-muted); font-size: 0.8125rem; }
        .breadcrumb-item {
          background: none; border: none; color: var(--text-muted);
          font-size: 0.8125rem; cursor: pointer;
          transition: color var(--transition);
        }
        .breadcrumb-item:hover:not(.current) { color: var(--text-primary); }
        .breadcrumb-item.current { color: var(--text-primary); cursor: default; font-weight: 500; }
        .header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .header-stat { display: flex; align-items: center; gap: 4px; }
        .header-stat-icon { font-size: 0.875rem; }
        .header-stat-value { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
        .header-stat-label { font-size: 0.75rem; color: var(--text-muted); }
        .header-progress-wrap { display: flex; align-items: center; gap: 8px; }
        .header-progress-bar {
          width: 80px; height: 6px;
          background: var(--bg-hover);
          border-radius: 3px; overflow: hidden;
        }
        .header-progress-fill {
          height: 100%; background: var(--rust);
          border-radius: 3px; transition: width 0.4s ease;
        }
        .header-progress-pct { font-size: 0.75rem; font-weight: 600; color: var(--rust-light); }
      `}</style>
    </header>
  );
}
