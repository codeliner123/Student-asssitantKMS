function scoreColor(score: number) { if (score < 50) return '#ef4444'; if (score < 70) return 'var(--accent-orange)'; if (score < 85) return '#facc15'; return 'var(--accent-green)'; }
export function ResumeScore({ score }: { score: number }) {
  const color = scoreColor(score);
  return <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${score * 3.6}deg, #252840 0deg)` }}>
    <div className="grid h-28 w-28 place-items-center rounded-full bg-[var(--bg-card)]"><div className="text-center"><div className="stat-number text-3xl font-extrabold">{score}</div><div className="text-xs text-[var(--text-muted)]">/100</div></div></div>
  </div>;
}
