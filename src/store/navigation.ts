/**
 * Navigation persistence — remembers where the user left off so the app can
 * restore it on the next visit (last exercise + sidebar section expand state).
 *
 * Everything is wrapped in try/catch so private-mode / disabled-storage never
 * breaks navigation, and reads are validated so corrupt values fall back to
 * sensible defaults.
 */

const LAST_ROUTE_KEY = 'rustpath_last_route';
const SECTIONS_KEY = 'rustpath_sidebar_sections';

const LESSON_ROUTE_RE = /^\/lesson\/[^/]+$/;

/** Persist the last lesson the user opened (only lesson routes are remembered). */
export function saveLastRoute(path: string): void {
  try {
    if (LESSON_ROUTE_RE.test(path)) localStorage.setItem(LAST_ROUTE_KEY, path);
  } catch {
    /* ignore storage errors */
  }
}

/** The last opened lesson route, or null if there isn't a valid saved one. */
export function readLastLessonRoute(): string | null {
  try {
    const r = localStorage.getItem(LAST_ROUTE_KEY);
    return r && LESSON_ROUTE_RE.test(r) ? r : null;
  } catch {
    return null;
  }
}

/**
 * Map of sidebar section key → expanded?. Absent keys mean collapsed, so a new
 * user (empty map) sees every section collapsed by default.
 */
export function readExpandedSections(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(SECTIONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveExpandedSections(map: Record<string, boolean>): void {
  try {
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(map));
  } catch {
    /* ignore storage errors */
  }
}
