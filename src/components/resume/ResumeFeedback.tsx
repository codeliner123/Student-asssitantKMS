import { CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { ResumeScore } from './ResumeScore';
import type { ResumeFeedback as Feedback } from '../../utils/gemini';
import { useAppContext } from '../../context/AppContext';
export function ResumeFeedback({ feedback }: { feedback: Feedback }) {
  const [expanded, setExpanded] = useState(0); const { openChatWithPrompt } = useAppContext();
  const entries = Object.entries(feedback.sections);
  return <div className="space-y-4"><Card className="p-6"><ResumeScore score={feedback.score} /><p className="mt-5 text-center text-[var(--text-secondary)]">{feedback.summary}</p></Card>
    <Card className="p-5"><h3 className="mb-4 text-lg font-bold">Section Scores</h3>{entries.map(([key, value]) => <div key={key} className="mb-3"><div className="mb-1 flex justify-between text-sm capitalize"><span>{key}</span><span className="stat-number">{value}/100</span></div><ProgressBar value={value} color="var(--accent-blue)" /></div>)}</Card>
    <Card className="p-5"><h3 className="mb-3 text-lg font-bold">Strengths</h3>{feedback.strengths.map((s) => <p key={s} className="mb-2 flex gap-2 text-sm text-[var(--text-secondary)]"><CheckCircle className="h-5 w-5 text-[var(--accent-green)]" />{s}</p>)}</Card>
    <Card className="p-5"><h3 className="mb-3 text-lg font-bold">Improvements</h3>{feedback.improvements.map((item, i) => <button key={item.issue} onClick={() => setExpanded(expanded === i ? -1 : i)} className="mb-2 w-full rounded-xl bg-[var(--bg-secondary)] p-3 text-left"><div className="flex items-center justify-between gap-3"><span className="font-semibold">{item.issue}</span><span className="flex items-center gap-2"><Badge tone={item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'muted'}>{item.priority}</Badge><ChevronDown className="h-4 w-4" /></span></div>{expanded === i && <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.detail}</p>}</button>)}</Card>
    <Card className="p-5"><h3 className="mb-3 text-lg font-bold">ATS Keywords</h3><div className="grid gap-4 md:grid-cols-2"><div><p className="mb-2 text-sm text-[var(--text-secondary)]">Found in Resume</p><div className="flex flex-wrap gap-2">{feedback.atsKeywords.present.map((k) => <Badge key={k} tone="green">{k}</Badge>)}</div></div><div><p className="mb-2 text-sm text-[var(--text-secondary)]">Missing Keywords</p><div className="flex flex-wrap gap-2">{feedback.atsKeywords.missing.map((k) => <Badge key={k} tone="red">{k}</Badge>)}</div></div></div></Card>
    <Button className="w-full" onClick={() => openChatWithPrompt('Based on my resume analysis, what should I focus on first?')}>Ask AI about this resume</Button></div>;
}
