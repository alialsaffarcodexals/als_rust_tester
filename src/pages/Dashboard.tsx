import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProgress } from '../types';
import { getCheckpointStats, getOverallStats } from '../store/progress';

interface TutorialVideo {
  topic: string;
  title: string;
  channel: string;
  url: string;
}

interface TutorialCategory {
  label: string;
  icon: string;
  videos: TutorialVideo[];
}

const TUTORIAL_CATEGORIES: TutorialCategory[] = [
  {
    label: 'Rust Basics',
    icon: '🦀',
    videos: [
      { topic: 'Variables & Types',    title: 'Rust Tutorial #5 — Variable Data Types',      channel: 'dcode',            url: 'https://www.youtube.com/watch?v=RBo8Vcbpc4o' },
      { topic: 'Functions',            title: 'Rust Tutorial #8 — Functions & Expressions',   channel: 'dcode',            url: 'https://www.youtube.com/watch?v=APrANyLHCtQ' },
      { topic: 'Strings',              title: 'Rust Tutorial #22 — Strings',                  channel: 'dcode',            url: 'https://www.youtube.com/watch?v=ABYdoxzNJJ8' },
      { topic: 'String Methods',       title: 'Rust Tutorial #33 — String Methods',           channel: 'dcode',            url: 'https://www.youtube.com/watch?v=IYYlc26vgyU' },
      { topic: 'Arrays & Slices',      title: 'Rust Tutorial #20 — Arrays',                   channel: 'dcode',            url: 'https://www.youtube.com/watch?v=cH6Qv47MPwk' },
      { topic: 'Loops & Control Flow', title: 'Rust Tutorial #9 — For Loop',                  channel: 'dcode',            url: 'https://www.youtube.com/watch?v=gtoj6vOeb1A' },
    ],
  },
  {
    label: 'Memory Model',
    icon: '⚙️',
    videos: [
      { topic: 'Ownership',            title: 'Understanding Ownership in Rust',               channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=VFIOSWy93H0' },
      { topic: 'Borrowing & References', title: 'References and Borrowing',                   channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=DiwD_9B-k5w' },
      { topic: 'Lifetimes',            title: 'Crust of Rust: Lifetime Annotations',           channel: 'Jon Gjengset',     url: 'https://www.youtube.com/watch?v=rAl-9HwD858' },
      { topic: 'Smart Pointers',       title: 'Crust of Rust: Smart Pointers & Interior Mutability', channel: 'Jon Gjengset', url: 'https://www.youtube.com/watch?v=8O0Nt9qY_vo' },
    ],
  },
  {
    label: 'Types & Abstractions',
    icon: '🔮',
    videos: [
      { topic: 'Structs & impl',        title: 'Structs in Rust',                             channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=n3bPhdiJm9I' },
      { topic: 'Traits',                title: 'Traits in Rust',                              channel: 'Tensor Programming', url: 'https://www.youtube.com/watch?v=T0Xfltu4h3A' },
      { topic: 'Generics',              title: 'Generic Types in Rust',                       channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=6rcTSxPJ6Bw' },
      { topic: 'Enums & Pattern Match', title: 'Enums and Pattern Matching',                  channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=DSZqIJhkNCM' },
      { topic: 'Modules & Crates',      title: "Rust's Module System Explained!",             channel: 'Let\'s Get Rusty', url: 'https://www.youtube.com/watch?v=5RPXgDQrjio' },
      { topic: 'Macros',                title: 'Declarative Macros in Rust',                  channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=KsJHlqULpO4' },
    ],
  },
  {
    label: 'Collections & Iterators',
    icon: '📦',
    videos: [
      { topic: 'HashMaps',             title: 'Vectors and Hash Maps',                        channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=ic9WEuto-gE' },
      { topic: 'Closures',             title: 'Closures in Rust',                             channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=kZXJvLfjUS4' },
      { topic: 'Iterators',            title: 'Iterators in Rust',                            channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=4GcKrj4By8k' },
      { topic: 'Sorting & Algorithms', title: 'Crust of Rust: Sorting Algorithms',            channel: 'Jon Gjengset',     url: 'https://www.youtube.com/watch?v=h4RkCyJyXmM' },
    ],
  },
  {
    label: 'Error Handling',
    icon: '🛡️',
    videos: [
      { topic: 'Option Type',          title: 'Rust Fundamentals — Option Type (no NULL!)',   channel: 'Rust Fundamentals', url: 'https://www.youtube.com/watch?v=jecoX-bp5c4' },
      { topic: 'Result Type',          title: "Use and Understand Rust's Result Type",         channel: 'Rust Tutorial',     url: 'https://www.youtube.com/watch?v=s7z_sdPBwFg' },
      { topic: 'Error Handling',       title: 'Error Handling in Rust',                       channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=wM6o70NAWUI' },
      { topic: '? Operator',           title: 'Error Handling Made Easy with ? Operator',     channel: 'Rust Tutorial',     url: 'https://www.youtube.com/watch?v=Z6wxawIPUaw' },
    ],
  },
  {
    label: 'Advanced Topics',
    icon: '🏆',
    videos: [
      { topic: 'Concurrency & Threads', title: 'Rust Concurrency and Parallelism',            channel: 'Rust Tutorial',    url: 'https://www.youtube.com/watch?v=_lvKmkspl1w' },
      { topic: 'Testing',              title: 'How To Write Unit Tests in Rust',              channel: 'Rust Tutorial',     url: 'https://www.youtube.com/watch?v=vLOSJoLwwmU' },
      { topic: 'CLI Arguments',        title: 'Build a Rust CLI — Command Line Arguments',    channel: 'Rust Tutorial',     url: 'https://www.youtube.com/watch?v=_T4sE6NEcV0' },
      { topic: 'File I/O',             title: 'Reading Files in Rust',                        channel: "Let's Get Rusty",  url: 'https://www.youtube.com/watch?v=cJLRKj_N1dw' },
    ],
  },
];

interface PracticeSite {
  name: string;
  description: string;
  url: string;
  tag: string;
  emoji: string;
}

const PRACTICE_SITES: PracticeSite[] = [
  { name: 'Rustlings',             emoji: '🦀', tag: 'Exercises',   description: 'Fix compiler errors to learn — official Rust team exercises.',       url: 'https://rustlings.rust-lang.org' },
  { name: 'Exercism — Rust',       emoji: '💪', tag: 'Exercises',   description: '99 mentor-reviewed exercises with community feedback.',              url: 'https://exercism.org/tracks/rust' },
  { name: 'Rust by Example',       emoji: '📖', tag: 'Reference',   description: 'Official runnable annotated examples for every language concept.',   url: 'https://doc.rust-lang.org/rust-by-example/' },
  { name: 'Tour of Rust',          emoji: '🗺️', tag: 'Interactive', description: 'Step-by-step guided tour with inline runnable code.',                url: 'https://tourofrust.com' },
  { name: 'Rust Playground',       emoji: '▶️', tag: 'Interactive', description: 'Official browser-based Rust compiler — no install needed.',           url: 'https://play.rust-lang.org' },
  { name: 'Rust By Practice',      emoji: '🏋️', tag: 'Exercises',   description: 'Comprehensive exercises covering async, threads, and algorithms.',   url: 'https://practice.course.rs' },
  { name: '100 Exercises to Learn Rust', emoji: '💯', tag: 'Course', description: '100 structured exercises teaching core concepts one at a time.',    url: 'https://rust-exercises.com' },
  { name: 'Rustfinity',            emoji: '⚡', tag: 'Interactive', description: 'Browser-based Rust problems with integrated compiler.',               url: 'https://www.rustfinity.com' },
  { name: 'Learning Rust',         emoji: '🎓', tag: 'Tutorial',    description: '26 free lessons with a live code playground, no signup needed.',     url: 'https://learningrust.org' },
  { name: 'Rust Adventure',        emoji: '🧭', tag: 'Course',      description: 'Project-based Rust courses and structured workshops.',                url: 'https://www.rustadventure.dev' },
];

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

      {/* Resources */}
      <div className="resources-section">
        <h3 className="resources-heading">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2h12v12H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Learning Resources
        </h3>

        {/* Rust Docs banner */}
        <a
          className="rust-docs-banner"
          href="https://doc.rust-lang.org/book/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="rust-docs-icon">📘</span>
          <div className="rust-docs-text">
            <span className="rust-docs-title">The Rust Programming Language</span>
            <span className="rust-docs-sub">doc.rust-lang.org/book — the official free Rust book</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rust-docs-arrow">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Practice & tutorial websites */}
        <div className="yt-section-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4.5 7h5M7 4.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Practice &amp; Tutorial Sites
        </div>
        <div className="sites-grid">
          {PRACTICE_SITES.map((site) => (
            <a
              key={site.url}
              className="site-card"
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="site-card-top">
                <span className="site-emoji">{site.emoji}</span>
                <span className="site-name">{site.name}</span>
                <span className="site-tag">{site.tag}</span>
              </div>
              <p className="site-desc">{site.description}</p>
            </a>
          ))}
        </div>

        {/* YouTube tutorials */}
        <div className="yt-section-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="2" width="12" height="10" rx="2" fill="#FF0000" opacity="0.15" stroke="#FF0000" strokeWidth="1.1"/>
            <path d="M5.5 5l4 2-4 2V5z" fill="#FF0000"/>
          </svg>
          YouTube Tutorials
        </div>

        {TUTORIAL_CATEGORIES.map((cat) => (
          <div key={cat.label} className="yt-category">
            <div className="yt-cat-header">
              <span className="yt-cat-icon">{cat.icon}</span>
              <span className="yt-cat-label">{cat.label}</span>
            </div>
            <div className="yt-grid">
              {cat.videos.map((v) => (
                <a
                  key={v.url}
                  className="yt-card"
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="yt-card-topic">{v.topic}</span>
                  <span className="yt-card-title">{v.title}</span>
                  <div className="yt-card-footer">
                    <span className="yt-card-channel">{v.channel}</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="yt-card-ext">
                      <path d="M2 8L8 2M5 2h3v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

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

        /* Resources section */
        .resources-section { display: flex; flex-direction: column; gap: 14px; }
        .resources-heading {
          display: flex; align-items: center; gap: 7px;
          font-size: 1rem; font-weight: 600; color: var(--text-primary);
        }

        /* Rust Docs banner */
        .rust-docs-banner {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition);
          background-image: radial-gradient(ellipse at top left, rgba(96,165,250,0.07) 0%, transparent 60%);
        }
        .rust-docs-banner:hover {
          border-color: #60a5fa;
          transform: translateY(-1px);
          background-image: radial-gradient(ellipse at top left, rgba(96,165,250,0.13) 0%, transparent 60%);
        }
        .rust-docs-icon { font-size: 1.6rem; flex-shrink: 0; }
        .rust-docs-text { flex: 1; }
        .rust-docs-title { display: block; font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 2px; }
        .rust-docs-sub { display: block; font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono); }
        .rust-docs-arrow { color: var(--text-muted); transition: color var(--transition); }
        .rust-docs-banner:hover .rust-docs-arrow { color: #60a5fa; }

        /* Practice sites grid */
        .sites-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }
        .site-card {
          display: flex; flex-direction: column; gap: 6px;
          padding: 12px 14px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition);
        }
        .site-card:hover { border-color: var(--rust); background: var(--bg-elevated); transform: translateY(-1px); }
        .site-card-top { display: flex; align-items: center; gap: 7px; }
        .site-emoji { font-size: 1.1rem; flex-shrink: 0; }
        .site-name { flex: 1; font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); }
        .site-tag {
          font-size: 0.6rem; font-weight: 600; padding: 1px 6px;
          border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em;
          background: var(--rust-dim); color: var(--rust-light); flex-shrink: 0;
        }
        .site-desc { font-size: 0.72rem; color: var(--text-muted); line-height: 1.45; margin: 0; }

        /* YouTube label */
        .yt-section-label {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);
          padding: 4px 0 2px;
        }

        /* Category */
        .yt-category { display: flex; flex-direction: column; gap: 8px; }
        .yt-cat-header { display: flex; align-items: center; gap: 6px; }
        .yt-cat-icon { font-size: 1rem; }
        .yt-cat-label { font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

        /* Video cards grid */
        .yt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px; }
        .yt-card {
          display: flex; flex-direction: column; gap: 4px;
          padding: 11px 13px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition);
        }
        .yt-card:hover {
          border-color: #FF4444;
          background: var(--bg-elevated);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255,68,68,0.08);
        }
        .yt-card-topic { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
        .yt-card-title { font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; flex: 1; }
        .yt-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .yt-card-channel { font-size: 0.68rem; color: var(--text-disabled); }
        .yt-card-ext { color: var(--text-disabled); transition: color var(--transition); }
        .yt-card:hover .yt-card-ext { color: #FF4444; }
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
