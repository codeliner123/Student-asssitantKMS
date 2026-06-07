export interface Message { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; }
export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm ${isUser ? 'bg-[var(--accent-purple)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)]'}`}><p className="whitespace-pre-wrap">{message.content}</p><span className="mt-1 block text-[10px] opacity-60">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div></div>;
}
