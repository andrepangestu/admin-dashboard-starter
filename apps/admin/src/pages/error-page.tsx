import type { ErrorComponentProps } from '@tanstack/react-router';
import { Button } from '@starter/ui';

export function RouteErrorPage({ error, reset }: ErrorComponentProps) {
  return (
    <div className="full-page-state" role="alert">
      <span className="state-code">ERR</span>
      <h1>This view could not be opened</h1>
      <p>{error.message || 'An unexpected application error interrupted this route.'}</p>
      <Button onClick={reset}>Try this view again</Button>
    </div>
  );
}
