import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY } from '@/app/theme-context';
import { ThemeProvider } from '@/app/theme-provider';
import { installMatchMedia } from '@/test/match-media';

import { ProfileMenu } from './profile-menu';

function renderMenu() {
  return render(
    <ThemeProvider>
      <ProfileMenu />
    </ThemeProvider>,
  );
}

describe('ProfileMenu', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    installMatchMedia(false);
  });

  it('opens the account menu with the theme options', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('button', { name: 'Open account menu' }));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: 'System' })).toBeInTheDocument();
  });

  it('changes the theme from the menu', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('button', { name: 'Open account menu' }));
    await user.click(await screen.findByRole('menuitemradio', { name: 'Dark' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderMenu();

    const trigger = screen.getByRole('button', { name: 'Open account menu' });
    await user.click(trigger);
    await screen.findByRole('menu');

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
