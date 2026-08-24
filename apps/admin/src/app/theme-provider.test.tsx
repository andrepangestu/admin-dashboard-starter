import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useTheme } from '@/shared/hooks/use-theme';
import { installMatchMedia } from '@/test/match-media';

import { THEME_STORAGE_KEY } from './theme-context';
import { ThemeProvider } from './theme-provider';

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme('dark')}>
        choose dark
      </button>
      <button type="button" onClick={() => setTheme('light')}>
        choose light
      </button>
    </div>
  );
}

function renderProbe() {
  return render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>,
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.head.querySelector('meta[name="theme-color"]')?.remove();
  });

  it('defaults to system and resolves from the OS preference', () => {
    installMatchMedia(true);

    renderProbe();

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('applies a stored preference over the OS preference', () => {
    installMatchMedia(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');

    renderProbe();

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('falls back to system when the stored value is invalid', () => {
    installMatchMedia(false);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'neon');

    renderProbe();

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
  });

  it('persists an explicit choice and updates the document class', async () => {
    installMatchMedia(false);
    const user = userEvent.setup();

    renderProbe();
    await user.click(screen.getByRole('button', { name: 'choose dark' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('follows OS preference changes while in system mode', () => {
    const media = installMatchMedia(false);

    renderProbe();
    expect(document.documentElement).not.toHaveClass('dark');

    act(() => {
      media.setMatches(true);
    });

    expect(document.documentElement).toHaveClass('dark');
  });

  it('ignores OS preference changes after an explicit choice', async () => {
    const media = installMatchMedia(false);
    const user = userEvent.setup();

    renderProbe();
    await user.click(screen.getByRole('button', { name: 'choose light' }));

    act(() => {
      media.setMatches(true);
    });

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('keeps the meta theme-color in sync with the resolved theme', async () => {
    installMatchMedia(false);
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#f6f8fc');
    document.head.append(meta);
    const user = userEvent.setup();

    renderProbe();
    await user.click(screen.getByRole('button', { name: 'choose dark' }));

    expect(meta.getAttribute('content')).toBe('#0f1723');

    await user.click(screen.getByRole('button', { name: 'choose light' }));

    expect(meta.getAttribute('content')).toBe('#f6f8fc');
  });
});
