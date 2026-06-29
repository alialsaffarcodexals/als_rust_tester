import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Explanation } from '../../types';
import { useTts } from '../../hooks/useTts';

interface ExplanationPanelProps {
  explanation: Explanation;
}

type Part = { gi: number; text: string };
type Block =
  | { type: 'intro' | 'heading' | 'body' | 'walk'; parts: Part[] }
  | { type: 'code'; code: string };

function splitSentences(text: string): string[] {
  const matched = text.match(/[^.!?]+[.!?]+["')\]]*(\s|$)|[^.!?]+$/g);
  return (matched || [text]).map((s) => s.trim()).filter(Boolean);
}

function build(explanation: Explanation): { blocks: Block[]; sentences: string[] } {
  const sentences: string[] = [];
  const blocks: Block[] = [];
  const mk = (text: string): Part[] =>
    splitSentences(text).map((t) => {
      const gi = sentences.length;
      sentences.push(t);
      return { gi, text: t };
    });

  if (explanation.intro) blocks.push({ type: 'intro', parts: mk(explanation.intro) });
  for (const s of explanation.sections) {
    blocks.push({ type: 'heading', parts: mk(s.heading) });
    blocks.push({ type: 'body', parts: mk(s.body) });
  }
  if (explanation.walkthrough && explanation.walkthrough.length) {
    blocks.push({ type: 'heading', parts: mk('Code walkthrough') });
    for (const line of explanation.walkthrough) {
      blocks.push({ type: 'code', code: line.code });
      blocks.push({ type: 'walk', parts: mk(line.explain) });
    }
  }
  return { blocks, sentences };
}

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

/**
 * The Explanation journey section (Zone01 Final): a beginner-friendly teach-
 * through of *why* the exercise works, with an audiobook-style TTS player that
 * narrates the text and highlights the sentence being spoken.
 */
export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  const [open, setOpen] = useState(true);
  const { blocks, sentences } = useMemo(() => build(explanation), [explanation]);
  const tts = useTts(sentences);
  const contentRef = useRef<HTMLDivElement>(null);

  const highlighting = tts.status !== 'idle';
  const activeIndex = highlighting ? tts.index : -1;

  // Keep the spoken sentence in view (smoothly), without scrolling the page.
  useEffect(() => {
    if (activeIndex < 0) return;
    const el = contentRef.current?.querySelector<HTMLElement>(`[data-sent="${activeIndex}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeIndex]);

  // Collapsing stops narration (no point speaking hidden text).
  const toggleOpen = () => {
    setOpen((o) => {
      if (o) tts.stop();
      return !o;
    });
  };

  const renderParts = (parts: Part[]) =>
    parts.map((p) => (
      <span
        key={p.gi}
        data-sent={p.gi}
        className={`xpl-sent${p.gi === activeIndex ? ' active' : ''}`}
      >
        {p.text}{' '}
      </span>
    ));

  return (
    <section className="xpl-root animate-fade-in">
      <button className="xpl-toggle" onClick={toggleOpen} aria-expanded={open}>
        <span className="xpl-toggle-label">📖 Explanation — why it works</span>
        <span className="xpl-toggle-caret">{open ? '▾' : '▸'}</span>
      </button>

      {open && (
        <div className="xpl-card">
          {/* ---- Audio player ---- */}
          {tts.supported ? (
            <div className="xpl-player" role="group" aria-label="Narration player">
              <div className="xpl-transport">
                <button className="xpl-btn" onClick={tts.restart} title="Restart from the beginning" aria-label="Restart">⏮</button>
                <button className="xpl-btn" onClick={() => tts.seekBy(-10)} title="Back 10 seconds" aria-label="Back 10 seconds">⏪</button>
                {tts.status === 'playing' ? (
                  <button className="xpl-btn primary" onClick={tts.pause} title="Pause" aria-label="Pause">⏸</button>
                ) : (
                  <button className="xpl-btn primary" onClick={tts.play} title="Play" aria-label="Play">▶</button>
                )}
                <button className="xpl-btn" onClick={tts.stop} title="Stop" aria-label="Stop">⏹</button>
                <button className="xpl-btn" onClick={() => tts.seekBy(10)} title="Forward 10 seconds" aria-label="Forward 10 seconds">⏩</button>
              </div>

              <div className="xpl-timeline">
                <span className="xpl-time">{fmt(tts.currentTime)}</span>
                <input
                  className="xpl-scrub"
                  type="range"
                  min={0}
                  max={Math.max(tts.duration, 0.1)}
                  step={0.1}
                  value={Math.min(tts.currentTime, tts.duration)}
                  onChange={(e) => tts.seekToTime(Number(e.target.value))}
                  aria-label="Seek through the narration"
                />
                <span className="xpl-time">{fmt(tts.duration)}</span>
              </div>

              <div className="xpl-extra">
                <div className="xpl-speeds" role="group" aria-label="Playback speed">
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      className={`xpl-speed${tts.rate === s ? ' active' : ''}`}
                      onClick={() => tts.setRate(s)}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
                <div className="xpl-volume">
                  <button className="xpl-btn small" onClick={tts.toggleMute} title={tts.muted ? 'Unmute' : 'Mute'} aria-label={tts.muted ? 'Unmute' : 'Mute'}>
                    {tts.muted || tts.volume === 0 ? '🔇' : tts.volume < 0.5 ? '🔉' : '🔊'}
                  </button>
                  <input
                    className="xpl-vol"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={tts.muted ? 0 : tts.volume}
                    onChange={(e) => tts.setVolume(Number(e.target.value))}
                    aria-label="Volume"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="xpl-nosupport">
              Your browser doesn't support speech narration — you can still read the explanation below.
            </div>
          )}

          {/* ---- Explanation content ---- */}
          <div className="xpl-content" ref={contentRef}>
            {blocks.map((b, i) => {
              if (b.type === 'code') {
                return (
                  <pre key={i} className="xpl-code">
                    {b.code}
                  </pre>
                );
              }
              if (b.type === 'heading') {
                return (
                  <h5 key={i} className="xpl-h">
                    {renderParts(b.parts)}
                  </h5>
                );
              }
              return (
                <p key={i} className={`xpl-p${b.type === 'intro' ? ' intro' : ''}`}>
                  {renderParts(b.parts)}
                </p>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .xpl-root { display: flex; flex-direction: column; gap: 10px; }
        .xpl-toggle {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 12px 16px; cursor: pointer;
          color: var(--text-primary); font-size: 0.95rem; font-weight: 700;
        }
        .xpl-toggle:hover { border-color: var(--border-normal); }
        .xpl-toggle-caret { color: var(--text-muted); }
        .xpl-card {
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent-blue);
          border-radius: var(--radius-lg); padding: 14px 16px;
          display: flex; flex-direction: column; gap: 14px;
        }
        /* Player */
        .xpl-player {
          display: flex; flex-direction: column; gap: 10px;
          background: var(--bg-base); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 12px;
          position: sticky; top: 0; z-index: 2;
        }
        .xpl-transport { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .xpl-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          background: var(--bg-elevated); border: 1px solid var(--border-normal);
          border-radius: 999px; color: var(--text-secondary); font-size: 0.9rem;
          transition: all var(--transition);
        }
        .xpl-btn.small { width: 30px; height: 30px; font-size: 0.85rem; }
        .xpl-btn:hover { color: var(--text-primary); border-color: var(--border-strong); background: var(--bg-hover); }
        .xpl-btn.primary { background: var(--rust); border-color: var(--rust); color: #fff; width: 42px; height: 42px; font-size: 1rem; }
        .xpl-btn.primary:hover { background: var(--rust-light); border-color: var(--rust-light); color: #fff; }
        .xpl-timeline { display: flex; align-items: center; gap: 10px; }
        .xpl-time { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); min-width: 34px; text-align: center; }
        .xpl-scrub, .xpl-vol {
          -webkit-appearance: none; appearance: none; height: 5px; border-radius: 3px;
          background: var(--bg-hover); cursor: pointer; outline: none;
        }
        .xpl-scrub { flex: 1; }
        .xpl-vol { width: 84px; }
        .xpl-scrub::-webkit-slider-thumb, .xpl-vol::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%;
          background: var(--rust); cursor: pointer; border: 2px solid var(--bg-surface);
        }
        .xpl-scrub::-moz-range-thumb, .xpl-vol::-moz-range-thumb {
          width: 14px; height: 14px; border-radius: 50%; background: var(--rust); cursor: pointer; border: none;
        }
        .xpl-extra { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .xpl-speeds { display: flex; gap: 4px; }
        .xpl-speed {
          font-size: 0.72rem; padding: 3px 8px; border-radius: 999px;
          background: var(--bg-elevated); border: 1px solid var(--border-normal); color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .xpl-speed.active { background: var(--rust-dim); border-color: var(--rust); color: var(--rust-light); }
        .xpl-volume { display: flex; align-items: center; gap: 6px; }
        .xpl-nosupport { font-size: 0.82rem; color: var(--text-muted); padding: 8px 10px; background: var(--bg-base); border-radius: var(--radius-md); }
        /* Content */
        .xpl-content { display: flex; flex-direction: column; gap: 10px; }
        .xpl-h { font-size: 0.92rem; font-weight: 700; color: var(--text-primary); margin: 6px 0 0; }
        .xpl-p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.75; margin: 0; }
        .xpl-p.intro { color: var(--text-primary); font-weight: 500; }
        .xpl-code {
          font-family: var(--font-mono); font-size: 0.8rem; color: var(--rust-light);
          background: var(--bg-base); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm); padding: 8px 10px; margin: 2px 0;
          white-space: pre-wrap; word-break: break-word; line-height: 1.5;
        }
        .xpl-sent { transition: background 0.2s ease, color 0.2s ease; border-radius: 3px; }
        .xpl-sent.active {
          background: var(--rust-dim); color: var(--text-primary);
          box-shadow: 0 0 0 3px var(--rust-dim);
        }
        .xpl-h .xpl-sent.active { background: transparent; box-shadow: none; color: var(--rust-light); }
        @media (max-width: 768px) {
          .xpl-card { padding: 12px; }
          .xpl-vol { width: 64px; }
          .xpl-extra { gap: 8px; }
        }
      `}</style>
    </section>
  );
}
