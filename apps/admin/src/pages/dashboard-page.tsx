import { Button, Card } from '@starter/ui';

import { PageHeader } from '@/shared/ui/page-header';

const metrics = [
  { label: 'Active users', value: '1,284', change: '+8.2%', tone: 'positive' },
  { label: 'Open reviews', value: '24', change: '6 due today', tone: 'warning' },
  { label: 'API health', value: '99.98%', change: '30 day window', tone: 'neutral' },
] as const;

const activity = [
  {
    title: 'Access policy updated',
    detail: 'Mira adjusted the finance-admin role',
    time: '12 min',
  },
  {
    title: 'User import completed',
    detail: '248 records processed without errors',
    time: '41 min',
  },
  { title: 'Monthly report ready', detail: 'July operations summary is available', time: '2 hr' },
] as const;

export function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Monday · Operations"
        title="Good morning, operator."
        description="Here is the signal across your workspace. Start with the items that need attention."
        action={<Button>Create report</Button>}
      />

      <section className="metric-grid" aria-label="Workspace summary">
        {metrics.map((metric) => (
          <Card className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small className={`metric-${metric.tone}`}>{metric.change}</small>
          </Card>
        ))}
      </section>

      <section className="dashboard-grid">
        <Card className="attention-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Attention queue</span>
              <h2>Three items need a decision</h2>
            </div>
            <span className="queue-count">03</span>
          </div>
          <div className="attention-list">
            <div>
              <span className="priority-dot priority-high" aria-hidden="true" />
              <div>
                <strong>Approve elevated access</strong>
                <span>Finance team · requested 18 minutes ago</span>
              </div>
              <Button variant="secondary">Review</Button>
            </div>
            <div>
              <span className="priority-dot priority-medium" aria-hidden="true" />
              <div>
                <strong>Resolve duplicate user records</strong>
                <span>12 records from the latest import</span>
              </div>
              <Button variant="ghost">Inspect</Button>
            </div>
          </div>
        </Card>

        <Card className="activity-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Recent activity</span>
              <h2>Workspace log</h2>
            </div>
          </div>
          <ol className="activity-list">
            {activity.map((item) => (
              <li key={item.title}>
                <span className="activity-node" aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <time>{item.time}</time>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  );
}
