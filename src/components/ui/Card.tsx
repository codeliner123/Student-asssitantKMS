import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { children: ReactNode }>(function Card({ children, className = '', ...props }, ref) {
  return <div ref={ref} className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-card)] ${className}`} {...props}>{children}</div>;
});
