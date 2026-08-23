import { Link } from '@tanstack/react-router';

import { Button } from '@/shared/ui/button';

export function NotFoundPage() {
  return (
    <div className="full-page-state">
      <span className="state-code">404</span>
      <h1>This page is outside the workspace</h1>
      <p>The address may have changed, or your account may not have access to this area.</p>
      <Button asChild className="mt-6">
        <Link to="/">Return to overview</Link>
      </Button>
    </div>
  );
}
