import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockUser } from '../data/mockData';
import type { ResumeFeedback } from '../utils/gemini';

interface AppState {
  user: typeof mockUser;
  resumeFeedback: ResumeFeedback | null;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  setResumeFeedback: (feedback: ResumeFeedback) => void;
  selfAssessedSkills: Record<string, number>;
  updateSkillLevel: (skill: string, level: number) => void;
  chatDraft: string;
  openChatWithPrompt: (prompt: string) => void;
  consumeChatDraft: () => string;
}
const AppContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [resumeFeedback, setResumeFeedback] = useState<ResumeFeedback | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selfAssessedSkills, setSelfAssessedSkills] = useState<Record<string, number>>({});
  const [chatDraft, setChatDraft] = useState('');
  const updateSkillLevel = (skill: string, level: number) => setSelfAssessedSkills((s) => ({ ...s, [skill]: level }));
  const openChatWithPrompt = (prompt: string) => { setChatDraft(prompt); setChatOpen(true); };
  const consumeChatDraft = () => { const draft = chatDraft; setChatDraft(''); return draft; };
  return <AppContext.Provider value={{ user: mockUser, resumeFeedback, chatOpen, setChatOpen, setResumeFeedback, selfAssessedSkills, updateSkillLevel, chatDraft, openChatWithPrompt, consumeChatDraft }}>{children}</AppContext.Provider>;
}
export function useAppContext() { const ctx = useContext(AppContext); if (!ctx) throw new Error('useAppContext must be used inside AppProvider'); return ctx; }
