export function ProgressBar({ value, color = 'var(--accent-purple)' }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} /></div>;
}
