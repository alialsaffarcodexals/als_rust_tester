import React, { useCallback, useRef } from 'react';

export type ResizeAxis = 'x' | 'y';

interface ResizeHandleProps {
  /** 'x' → a vertical bar dragged left/right; 'y' → a horizontal bar dragged up/down. */
  axis: ResizeAxis;
  /** Called on each pointer move with the signed pixel delta since the last move. */
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  /** Double-click handler — typically resets the panel to its default size. */
  onReset?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * ResizeHandle — a thin, draggable separator between two panels.
 *
 * It only reports pointer deltas; the owning `useResizable` hook clamps and
 * applies them, so the handle stays purely presentational and reusable. Pointer
 * listeners live on `document` for the duration of the drag so movement keeps
 * tracking even when the cursor leaves the slim handle (or passes over an
 * iframe / Monaco), and a body class swaps the cursor + disables selection.
 */
export default function ResizeHandle({
  axis,
  onResize,
  onResizeStart,
  onResizeEnd,
  onReset,
  className = '',
  ariaLabel,
}: ResizeHandleProps) {
  const dragging = useRef(false);
  const last = useRef(0);
  const handlers = useRef<{ move: (e: PointerEvent) => void; up: () => void } | null>(null);

  const stop = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (handlers.current) {
      document.removeEventListener('pointermove', handlers.current.move);
      document.removeEventListener('pointerup', handlers.current.up);
      document.removeEventListener('pointercancel', handlers.current.up);
      handlers.current = null;
    }
    document.body.classList.remove('resizing-x', 'resizing-y');
    onResizeEnd?.();
  }, [onResizeEnd]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragging.current = true;
      last.current = axis === 'x' ? e.clientX : e.clientY;
      onResizeStart?.();

      const move = (ev: PointerEvent) => {
        if (!dragging.current) return;
        const pos = axis === 'x' ? ev.clientX : ev.clientY;
        const delta = pos - last.current;
        last.current = pos;
        if (delta) onResize(delta);
      };
      handlers.current = { move, up: stop };
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', stop);
      document.addEventListener('pointercancel', stop);
      document.body.classList.add(axis === 'x' ? 'resizing-x' : 'resizing-y');
    },
    [axis, onResize, onResizeStart, stop]
  );

  // Keyboard accessibility: arrow keys nudge the size (Shift = larger steps).
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 48 : 16;
      const decrease = axis === 'x' ? 'ArrowLeft' : 'ArrowUp';
      const increase = axis === 'x' ? 'ArrowRight' : 'ArrowDown';
      if (e.key === decrease || e.key === increase) {
        e.preventDefault();
        onResizeStart?.();
        onResize(e.key === increase ? step : -step);
        onResizeEnd?.();
      }
    },
    [axis, onResize, onResizeStart, onResizeEnd]
  );

  return (
    <div
      role="separator"
      aria-orientation={axis === 'x' ? 'vertical' : 'horizontal'}
      aria-label={ariaLabel}
      tabIndex={0}
      className={`resize-handle resize-handle-${axis} ${className}`}
      onPointerDown={onPointerDown}
      onDoubleClick={onReset}
      onKeyDown={onKeyDown}
    >
      <span className="resize-handle-grip" aria-hidden="true" />
    </div>
  );
}
