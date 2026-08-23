import { Link, Outlet } from '@tanstack/react-router';

import { env } from '@/shared/config/env';

const navigation = [
  { to: '/', label: 'Overview', marker: 'O' },
  { to: '/users', label: 'Users', marker: 'U' },
] as const;

export function DashboardLayout() {
  return (
    <div className="app-shell">
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

        <nav className="primary-nav">
          <span className="nav-label">Workspace</span>
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              activeProps={{ className: 'nav-link nav-link-active' }}
              inactiveProps={{ className: 'nav-link' }}
            >
              <span className="nav-marker" aria-hidden="true">
                {item.marker}
              </span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
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
          <div>
            <span className="environment-label">Production workspace</span>
          </div>
          <button className="profile-button" type="button" aria-label="Open account menu">
            <span className="avatar" aria-hidden="true">
              OP
            </span>
            <span className="profile-copy">
              <strong>Operator</strong>
              <small>Administrator</small>
            </span>
          </button>
        </header>

        <main id="main-content" className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
