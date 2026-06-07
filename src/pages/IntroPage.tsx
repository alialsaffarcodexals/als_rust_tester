import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chapter1 } from '../data/chapter1';
import CodeEditor from '../components/editor/CodeEditor';

interface IntroPageProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export default function IntroPage({ onComplete, isCompleted }: IntroPageProps) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(chapter1.sections[0].id);
  const [sectionCode, setSectionCode] = useState<Record<string, string>>({});

  const sectionIndex = chapter1.sections.findIndex((s) => s.id === activeSection);
  const section = chapter1.sections[sectionIndex];
  const isLastSection = sectionIndex === chapter1.sections.length - 1;

  const handleNext = () => {
    if (isLastSection) {
      onComplete();
      navigate('/lesson/1');
    } else {
      setActiveSection(chapter1.sections[sectionIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (sectionIndex > 0) {
      setActiveSection(chapter1.sections[sectionIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const code = sectionCode[section.id] ?? (section.codeExample ?? '');

  return (
    <div className="intro-page animate-fade-in">
      {/* Page header */}
      <div className="intro-header">
        <div>
          <div className="badge badge-rust" style={{ marginBottom: 12 }}>Chapter 1</div>
          <h1 className="intro-title">{chapter1.title}</h1>
          <p className="text-secondary mt-2">{chapter1.description}</p>
        </div>
        {isCompleted && (
          <div className="badge badge-success" style={{ alignSelf: 'flex-start' }}>
            ✓ Completed
          </div>
        )}
      </div>

      <div className="intro-layout">
        {/* Left: section nav */}
        <nav className="intro-sections-nav">
          <div className="intro-sections-title">Sections</div>
          {chapter1.sections.map((sec, i) => (
            <button
              key={sec.id}
              className={`intro-section-btn ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <span className="intro-section-num">{i + 1}</span>
              <span className="intro-section-name">{sec.title}</span>
            </button>
          ))}
        </nav>

        {/* Right: content */}
        <div className="intro-content">
          <div className="intro-section-header">
            <span className="badge badge-rust">
              {sectionIndex + 1} of {chapter1.sections.length}
            </span>
            <h2 className="intro-section-title">{section.title}</h2>
          </div>

          <div className="intro-text">
            {renderContent(section.content)}
          </div>

          {section.codeExample && (
            <div className="intro-code-section">
              <div className="intro-code-label">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5L1 7l2 2M11 5l2 2-2 2M8 3l-2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Try it yourself
              </div>
              <CodeEditor
                value={code}
                onChange={(v) => setSectionCode((prev) => ({ ...prev, [section.id]: v }))}
                height="280px"
              />
              <p className="text-xs text-muted mt-2">
                This editor uses Monaco (VS Code). You can edit this code, but to run it use the lesson pages.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="intro-nav-btns">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={sectionIndex === 0}
            >
              ← Previous
            </button>
            <div className="intro-progress-dots">
              {chapter1.sections.map((_, i) => (
                <span
                  key={i}
                  className={`intro-dot ${i === sectionIndex ? 'active' : i < sectionIndex ? 'done' : ''}`}
                  onClick={() => setActiveSection(chapter1.sections[i].id)}
                />
              ))}
            </div>
            <button className="btn btn-primary" onClick={handleNext}>
              {isLastSection ? '🚀 Start Exercises' : 'Next →'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .intro-page { max-width: 1200px; margin: 0 auto; }
        .intro-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .intro-title { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); }
        .intro-layout { display: grid; grid-template-columns: 220px 1fr; gap: 32px; align-items: start; }
        .intro-sections-nav {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 16px;
          position: sticky;
          top: 24px;
        }
        .intro-sections-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .intro-section-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 8px;
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          color: var(--text-muted);
          font-size: 0.8125rem;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition);
        }
        .intro-section-btn:hover { background: var(--bg-elevated); color: var(--text-secondary); }
        .intro-section-btn.active { background: var(--rust-dim); color: var(--rust-light); }
        .intro-section-num {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--bg-hover);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .intro-section-btn.active .intro-section-num { background: var(--rust-dim); color: var(--rust-light); }
        .intro-section-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .intro-content {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 32px;
        }
        .intro-section-header { margin-bottom: 24px; }
        .intro-section-title { font-size: 1.5rem; font-weight: 700; margin-top: 8px; }
        .intro-text {
          color: var(--text-secondary);
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .intro-text h2 { font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin: 24px 0 12px; }
        .intro-text h3 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 16px 0 8px; }
        .intro-text p { margin-bottom: 16px; }
        .intro-text strong { color: var(--text-primary); }
        .intro-text code {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: 3px;
          padding: 1px 5px;
          font-family: var(--font-mono);
          font-size: 0.85em;
          color: var(--rust-light);
        }
        .intro-text pre {
          background: var(--bg-elevated);
          border: 1px solid var(--border-normal);
          border-radius: var(--radius-md);
          padding: 16px;
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 12px 0;
          color: var(--text-primary);
        }
        .intro-text table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 0.875rem;
        }
        .intro-text th, .intro-text td {
          padding: 8px 12px;
          border: 1px solid var(--border-normal);
          text-align: left;
        }
        .intro-text th { background: var(--bg-elevated); color: var(--text-primary); font-weight: 600; }
        .intro-text td { color: var(--text-secondary); }
        .intro-code-section { margin-top: 24px; }
        .intro-code-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .intro-nav-btns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }
        .intro-progress-dots { display: flex; gap: 6px; }
        .intro-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--bg-hover);
          cursor: pointer;
          transition: all var(--transition);
        }
        .intro-dot.active { background: var(--rust); transform: scale(1.3); }
        .intro-dot.done { background: var(--success); }
      `}</style>
    </div>
  );
}

function renderContent(content: string): React.ReactNode {
  // Simple markdown-like renderer
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const end = lines.findIndex((l, idx) => idx > i && l.trim().startsWith('```'));
      if (end > i) {
        const code = lines.slice(i + 1, end).join('\n');
        elements.push(<pre key={keyCounter++}><code>{code}</code></pre>);
        i = end + 1;
        continue;
      }
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(Boolean).map((h) => h.trim());
      const rows = tableLines.slice(2).map((r) => r.split('|').filter(Boolean).map((c) => c.trim()));
      elements.push(
        <table key={keyCounter++}>
          <thead>
            <tr>{headers.map((h, hi) => <th key={hi}>{renderInline(h)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderInline(cell)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      );
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(<h2 key={keyCounter++}>{line.slice(3)}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={keyCounter++}>{line.slice(4)}</h3>);
      i++; continue;
    }

    // Empty line
    if (!line.trim()) {
      i++; continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].startsWith('|')) {
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      elements.push(<p key={keyCounter++}>{renderInline(paragraphLines.join(' '))}</p>);
    }
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
