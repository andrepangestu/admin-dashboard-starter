import { useCallback, useState, useSyncExternalStore } from 'react';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-collapsed';
const NARROW_QUERY = '(max-width: 920px)';

function readStoredCollapsed(): boolean {
  try {
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function subscribeToViewport(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(NARROW_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => {
    mediaQuery.removeEventListener('change', onChange);
  };
}

function isNarrowViewport(): boolean {
  return window.matchMedia(NARROW_QUERY).matches;
}

export interface SidebarState {
  /** True when the rail should render collapsed (user choice or narrow viewport). */
  collapsed: boolean;
  toggle: () => void;
}

export function useSidebarState(): SidebarState {
  const [userCollapsed, setUserCollapsed] = useState(readStoredCollapsed);
  const isNarrow = useSyncExternalStore(subscribeToViewport, isNarrowViewport);

  const toggle = useCallback(() => {
    setUserCollapsed((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch {
        // Storage can be unavailable; the in-memory state still applies.
      }
      return next;
    });
  }, []);

  return { collapsed: userCollapsed || isNarrow, toggle };
}
