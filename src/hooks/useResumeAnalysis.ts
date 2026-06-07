import { useState } from 'react';
import { analyzeResume, type ResumeFeedback } from '../utils/gemini';

export function useResumeAnalysis() {
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Parsing resume...');
  async function run(resumeText: string) {
    setIsLoading(true); setError(null); setStatus('Parsing resume...');
    try {
      setTimeout(() => setStatus('Running ATS check...'), 350);
      setTimeout(() => setStatus('Generating insights...'), 850);
      const result = await analyzeResume(resumeText);
      setFeedback(result);
      return result;
    } catch (e) { const message = e instanceof Error ? e.message : 'Resume analysis failed'; setError(message); throw e; }
    finally { setIsLoading(false); }
  }
  return { feedback, setFeedback, isLoading, error, status, run };
}
