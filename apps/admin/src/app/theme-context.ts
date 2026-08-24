import { createContext } from 'react';

export const THEMES = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEMES)[number];
export type ResolvedTheme = Exclude<Theme, 'system'>;

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

export const THEME_STORAGE_KEY = 'admin-ui-theme';

const themeNames: readonly string[] = THEMES;

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themeNames.includes(value);
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
