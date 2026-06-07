import { useState } from 'react';
import { callGemini } from '../utils/gemini';

export function useGemini() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function generate(prompt: string, systemPrompt?: string) {
    setIsLoading(true); setError(null);
    try { return await callGemini(prompt, systemPrompt); }
    catch (e) { const message = e instanceof Error ? e.message : 'AI request failed'; setError(message); throw e; }
    finally { setIsLoading(false); }
  }
  return { generate, isLoading, error };
}
