export function Badge({ children, tone = 'purple' }: { children: React.ReactNode; tone?: 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'muted' }) {
  const colors = { purple: 'bg-purple-500/15 text-purple-200', green: 'bg-emerald-500/15 text-emerald-200', orange: 'bg-orange-500/15 text-orange-200', red: 'bg-red-500/15 text-red-200', blue: 'bg-sky-500/15 text-sky-200', muted: 'bg-slate-500/15 text-slate-300' };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${colors[tone]}`}>{children}</span>;
}
