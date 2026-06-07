import type { ButtonHTMLAttributes, ReactNode } from 'react';
export function Button({ children, className = '', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = variant === 'primary' ? 'bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple-light)]' : variant === 'secondary' ? 'bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-light)]' : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]';
  return <button className={`rounded-xl px-4 py-2 font-semibold transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`} {...props}>{children}</button>;
}
