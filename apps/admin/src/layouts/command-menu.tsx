import { useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, Moon, Search, Sun, SunMoon, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from '@/shared/hooks/use-theme';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/command';

const pages = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
] as const;

const themes = [
  { value: 'light', label: 'Light theme', icon: Sun },
  { value: 'dark', label: 'Dark theme', icon: Moon },
  { value: 'system', label: 'System theme', icon: SunMoon },
] as const;

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="icon-button"
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
      >
        <Search aria-hidden="true" />
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Search pages and actions"
      >
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.to}
                onSelect={() => {
                  setOpen(false);
                  void navigate({ to: page.to });
                }}
              >
                <page.icon aria-hidden="true" />
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            {themes.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  setTheme(item.value);
                  setOpen(false);
                }}
              >
                <item.icon aria-hidden="true" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
