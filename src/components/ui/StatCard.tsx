import { Card } from './Card';
import { Badge } from './Badge';
export function StatCard({ label, value, detail, icon, badge }: { label: string; value: string; detail: string; icon: React.ReactNode; badge?: string }) {
  return <Card className="group p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
    <div className="flex items-start justify-between"><div className="rounded-xl bg-[var(--accent-purple)]/15 p-3 text-[var(--accent-purple-light)]">{icon}</div>{badge && <Badge tone="green">{badge}</Badge>}</div>
    <p className="mt-4 text-sm text-[var(--text-secondary)]">{label}</p><div className="stat-number mt-1 text-3xl font-bold">{value}</div><p className="mt-2 text-sm text-[var(--text-muted)]">{detail}</p>
  </Card>;
}
