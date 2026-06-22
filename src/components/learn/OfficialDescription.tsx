import React from 'react';

interface OfficialDescriptionProps {
  slug: string;
  description: string; // transcribed 01-edu subject text (light markdown)
}

// Render inline `code` spans inside a line of text.
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={`${keyPrefix}-c${i}`} className="od-inline-code">{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={`${keyPrefix}-t${i}`}>{part}</React.Fragment>;
  });
}

// A small, dependency-free renderer for the subset of markdown used in 01-edu
// subjects: fenced code blocks, headings, bullet lists, and paragraphs with
// inline code. Avoids pulling in a full markdown library.
function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block (``` or ~~~ — ~~~ lets us author Rust without escaping backticks)
    const fence = line.trimStart().startsWith('```')
      ? '```'
      : line.trimStart().startsWith('~~~')
      ? '~~~'
      : null;
    if (fence) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith(fence)) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      out.push(<pre key={key++} className="od-code"><code>{buf.join('\n')}</code></pre>);
      continue;
    }

    // Heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      out.push(<h4 key={key++} className="od-h">{renderInline(h[2], `h${key}`)}</h4>);
      i++;
      continue;
    }

    // Bullet list (consume consecutive bullets)
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      out.push(
        <ul key={key++} className="od-list">
          {items.map((it, j) => <li key={j}>{renderInline(it, `li${key}-${j}`)}</li>)}
        </ul>
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') { i++; continue; }

    // Paragraph (consume consecutive non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trimStart().startsWith('```') &&
      !lines[i].trimStart().startsWith('~~~') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^#{1,6}\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(<p key={key++} className="od-p">{renderInline(para.join(' '), `p${key}`)}</p>);
  }

  return out;
}

export default function OfficialDescription({ slug, description }: OfficialDescriptionProps) {
  const githubUrl = `https://github.com/01-edu/public/tree/master/subjects/${slug}`;

  return (
    <div className="od-root animate-fade-in">
      <div className="od-source">
        <span className="od-source-label">Official 01-edu subject</span>
        <a className="od-source-link" href={githubUrl} target="_blank" rel="noopener noreferrer">
          View on GitHub ↗
        </a>
      </div>

      <div className="od-content">
        {description.trim().length === 0
          ? <p className="od-p od-empty">Official description not transcribed yet.</p>
          : renderMarkdown(description)}
      </div>

      <style>{`
        .od-root { display: flex; flex-direction: column; gap: 12px; }
        .od-source {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 10px 14px;
        }
        .od-source-label { font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); }
        .od-source-link { font-size: 0.78rem; color: var(--accent-blue); flex-shrink: 0; }
        .od-content {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .od-h { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 6px 0 0; }
        .od-p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }
        .od-empty { color: var(--text-muted); }
        .od-list { display: flex; flex-direction: column; gap: 5px; margin: 0; }
        .od-list li { font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; padding-left: 16px; position: relative; }
        .od-list li::before { content: '•'; position: absolute; left: 4px; color: var(--rust); }
        .od-code {
          background: var(--bg-base); border: 1px solid var(--border-normal);
          border-radius: var(--radius-md); padding: 12px 14px; overflow-x: auto; margin: 2px 0;
        }
        .od-code code { font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6; color: var(--text-primary); white-space: pre; }
        .od-inline-code {
          font-family: var(--font-mono); font-size: 0.82em;
          background: var(--bg-elevated); color: var(--rust-light);
          border-radius: 3px; padding: 1px 5px;
        }
        @media (max-width: 768px) { .od-content { padding: 14px; } }
      `}</style>
    </div>
  );
}
