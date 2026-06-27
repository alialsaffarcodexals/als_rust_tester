import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useMediaQuery — reactive matchMedia. Used to enable resizing only on layouts
 * where it makes sense (e.g. desktop), so inline sizes never fight the
 * responsive (stacked) breakpoints.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

type Axis = 'x' | 'y';
type SizeProp = 'width' | 'height' | 'flexBasis';

interface UseResizableOptions {
  /** localStorage key the committed size is persisted under. */
  storageKey: string;
  /** 'x' resizes horizontally (width), 'y' resizes vertically (height). */
  axis: Axis;
  /** Minimum size in px. */
  min: number;
  /** Maximum size in px — a number, or a function evaluated at drag time (for viewport-relative caps). */
  max?: number | (() => number);
  /** Invert the drag direction (e.g. a console that grows as the handle is dragged up). */
  invert?: boolean;
  /** Which CSS property the size is written to. Defaults to width (x) / height (y). */
  property?: SizeProp;
  /** When set, the size is written to this CSS custom property on the ref element instead of a property. */
  cssVar?: string;
}

interface UseResizableResult<T extends HTMLElement> {
  /** Attach to the element being resized (or, in cssVar mode, the element holding the variable). */
  panelRef: React.RefObject<T>;
  /** The committed size in px, or null when never resized (CSS default is used). */
  size: number | null;
  /** Inline style carrying the committed size — spread onto the panel element. */
  style: React.CSSProperties;
  /** Handlers to spread onto a <ResizeHandle/>. */
  onResizeStart: () => void;
  onResize: (delta: number) => void;
  onResizeEnd: () => void;
  /** Clear the saved size and revert to the CSS default (wire to the handle's double-click). */
  reset: () => void;
}

function readStored(key: string): number | null {
  try {
    const v = localStorage.getItem(key);
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/**
 * useResizable — drives a single resizable dimension.
 *
 * During a drag the size is written imperatively to the DOM (style property or
 * CSS variable) so the browser re-lays-out without any React re-render — the
 * committed value is only pushed to state (and localStorage) on pointer up.
 * This keeps dragging smooth even with heavy children like Monaco.
 */
export function useResizable<T extends HTMLElement = HTMLDivElement>(
  opts: UseResizableOptions
): UseResizableResult<T> {
  const { storageKey, axis, min, max, invert, cssVar } = opts;
  const property: SizeProp = opts.property ?? (axis === 'x' ? 'width' : 'height');

  const [size, setSize] = useState<number | null>(() => readStored(storageKey));
  const panelRef = useRef<T>(null);
  const current = useRef<number>(size ?? min);

  const resolveMax = useCallback(
    () => (typeof max === 'function' ? max() : max ?? Number.POSITIVE_INFINITY),
    [max]
  );

  const write = useCallback(
    (val: number) => {
      const el = panelRef.current;
      if (!el) return;
      if (cssVar) el.style.setProperty(cssVar, `${val}px`);
      else (el.style as unknown as Record<string, string>)[property] = `${val}px`;
    },
    [cssVar, property]
  );

  const measure = useCallback((): number => {
    const el = panelRef.current;
    if (!el) return size ?? min;
    if (cssVar) {
      const n = parseFloat(getComputedStyle(el).getPropertyValue(cssVar));
      return Number.isFinite(n) ? n : size ?? min;
    }
    return axis === 'x' ? el.offsetWidth : el.offsetHeight;
  }, [axis, cssVar, min, size]);

  const onResizeStart = useCallback(() => {
    current.current = measure();
  }, [measure]);

  const onResize = useCallback(
    (delta: number) => {
      const d = invert ? -delta : delta;
      const next = Math.min(Math.max(current.current + d, min), resolveMax());
      current.current = next;
      write(next);
    },
    [invert, min, resolveMax, write]
  );

  const onResizeEnd = useCallback(() => {
    const val = Math.round(current.current);
    setSize(val);
    try {
      localStorage.setItem(storageKey, String(val));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [storageKey]);

  const reset = useCallback(() => {
    setSize(null);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    const el = panelRef.current;
    if (el) {
      if (cssVar) el.style.removeProperty(cssVar);
      else (el.style as unknown as Record<string, string>)[property] = '';
    }
  }, [cssVar, property, storageKey]);

  const style: React.CSSProperties = {};
  if (size != null) {
    if (cssVar) (style as Record<string, string>)[cssVar] = `${size}px`;
    else (style as Record<string, string>)[property] = `${size}px`;
  }

  return { panelRef, size, style, onResizeStart, onResize, onResizeEnd, reset };
}
