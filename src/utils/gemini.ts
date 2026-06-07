export interface ResumeFeedback {
  score: number;
  summary: string;
  strengths: string[];
  improvements: { issue: string; detail: string; priority: 'high' | 'medium' | 'low' }[];
  atsKeywords: { present: string[]; missing: string[] };
  sections: { experience: number; education: number; skills: number; formatting: number };
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export function hasGeminiKey() { return Boolean(import.meta.env.VITE_GEMINI_API_KEY); }

export async function callGemini(prompt: string, systemPrompt?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Add your Gemini API key in .env to enable AI features');
  const body = { contents: [{ parts: [{ text: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } };
  // TODO: Replace with real API call
  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'I could not generate a response. Please try again.';
}

export async function analyzeResume(resumeText: string): Promise<ResumeFeedback> {
  const prompt = `You are an expert career counselor and ATS resume specialist. Analyze this resume and return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{"score":<number 0-100>,"summary":"<2-sentence overall assessment>","strengths":["<strength 1>","<strength 2>","<strength 3>"],"improvements":[{"issue":"<issue title>","detail":"<specific fix>","priority":"high|medium|low"}],"atsKeywords":{"present":["<keyword>"],"missing":["<keyword>"]},"sections":{"experience":<score 0-100>,"education":<score 0-100>,"skills":<score 0-100>,"formatting":<score 0-100>}}
Resume content:\n${resumeText}`;
  const raw = await callGemini(prompt);
  return JSON.parse(raw.replace(/```json|```/g, '').trim()) as ResumeFeedback;
}
