import { Send } from 'lucide-react';
import { useState } from 'react';
export function ChatInput({ onSend, disabled, initialValue = '' }: { onSend: (value: string) => void; disabled?: boolean; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  function submit(e: React.FormEvent) { e.preventDefault(); if (!value.trim() || disabled) return; onSend(value.trim()); setValue(''); }
  return <form onSubmit={submit} className="flex gap-2 border-t border-[var(--border)] p-3"><input value={value} onChange={(e) => setValue(e.target.value)} className="min-h-11 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-sm outline-none focus:border-[var(--accent-purple)]" placeholder="Ask for resume, skills, or interview help..." /><button disabled={disabled} className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-purple)] transition-all hover:scale-[1.02] disabled:opacity-50"><Send className="h-4 w-4" /></button></form>;
}
