import { Link, Outlet } from '@tanstack/react-router';
import { LayoutDashboard, PanelLeft, Users } from 'lucide-react';

import { env } from '@/shared/config/env';
import { useSidebarState } from '@/shared/hooks/use-sidebar-state';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

import { CommandMenu } from './command-menu';
import { ProfileMenu } from './profile-menu';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
] as const;

export function DashboardLayout() {
  const { collapsed, toggle } = useSidebarState();

  return (
    <TooltipProvider>
      <div className="app-shell" data-sidebar={collapsed ? 'collapsed' : 'expanded'}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <aside className="sidebar" aria-label="Primary navigation">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">
              AW
            </span>
            <div>
              <strong>{env.APP_NAME}</strong>
              <span>Operations console</span>
            </div>
          </div>

          <nav className="primary-nav" id="primary-navigation">
            <span className="nav-label">Workspace</span>
            {navigation.map((item) => {
              const link = (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  activeProps={{ className: 'nav-link nav-link-active' }}
                  inactiveProps={{ className: 'nav-link' }}
                >
                  <span className="nav-marker" aria-hidden="true">
                    <item.icon />
                  </span>
                  <span className="nav-text">{item.label}</span>
                </Link>
              );

              if (!collapsed) {
                return link;
              }

              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>

          <div className="system-rail" aria-label="System status">
            <span className="system-pulse" aria-hidden="true" />
            <div>
              <strong>All systems normal</strong>
              <span>{env.ENABLE_MOCKS ? 'Demo data enabled' : 'Live API configured'}</span>
            </div>
          </div>
        </aside>

        <div className="workspace">
          <header className="topbar">
            <div className="topbar-left">
              <button
                type="button"
                className="icon-button sidebar-toggle"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!collapsed}
                aria-controls="primary-navigation"
                onClick={toggle}
              >
                <PanelLeft aria-hidden="true" />
              </button>
              <span className="environment-label">Production workspace</span>
            </div>
            <div className="topbar-actions">
              <CommandMenu />
              <ThemeToggle />
              <ProfileMenu />
            </div>
          </header>

          <main id="main-content" className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
