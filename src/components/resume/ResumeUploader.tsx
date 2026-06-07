import { UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/Button';

async function extractPdfText(file: File) {
  const pdfjs = await import('pdfjs-dist');
  const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = await Promise.all(Array.from({ length: doc.numPages }, async (_, i) => {
    const page = await doc.getPage(i + 1); const content = await page.getTextContent();
    return content.items.map((item) => ('str' in item ? item.str : '')).join(' ');
  }));
  return pages.join('\n');
}
async function readFile(file: File) {
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) return extractPdfText(file);
  return file.text();
}
export function ResumeUploader({ onText }: { onText: (text: string, file?: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null); const [file, setFile] = useState<File | null>(null); const [mode, setMode] = useState<'upload' | 'paste'>('upload'); const [paste, setPaste] = useState(''); const [parsing, setParsing] = useState(false); const [error, setError] = useState<string | null>(null);
  async function handleFile(selected?: File) { if (!selected) return; setParsing(true); setError(null); setFile(selected); try { onText(await readFile(selected), selected); } catch { setError('Could not parse this file. Try a .txt resume or paste the text directly.'); } finally { setParsing(false); } }
  return <div className="space-y-4"><div className="flex rounded-xl bg-[var(--bg-secondary)] p-1"><button onClick={() => setMode('upload')} className={`flex-1 rounded-lg px-3 py-2 ${mode === 'upload' ? 'bg-[var(--accent-purple)]' : ''}`}>Upload</button><button onClick={() => setMode('paste')} className={`flex-1 rounded-lg px-3 py-2 ${mode === 'paste' ? 'bg-[var(--accent-purple)]' : ''}`}>Paste Text</button></div>
    {mode === 'upload' ? <div onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()} className="cursor-pointer rounded-2xl border-2 border-dashed border-[var(--border-light)] bg-[var(--bg-secondary)] p-8 text-center transition-all hover:border-[var(--accent-purple)]"><input ref={inputRef} hidden type="file" accept=".pdf,.txt,.doc" onChange={(e) => handleFile(e.target.files?.[0])} /><UploadCloud className="mx-auto mb-3 h-10 w-10 text-[var(--accent-purple-light)]" /><p className="font-semibold">Drop your resume here or click to upload</p><p className="mt-1 text-sm text-[var(--text-muted)]">PDF, TXT, or DOC files accepted</p>{file && <p className="mt-4 text-sm text-[var(--text-secondary)]">{file.name} · {(file.size / 1024).toFixed(1)} KB</p>}</div> : <textarea value={paste} onChange={(e) => { setPaste(e.target.value); onText(e.target.value); }} className="min-h-72 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-sm outline-none focus:border-[var(--accent-purple)]" placeholder="Paste your resume text here..." />}
    {error && <p className="text-sm text-red-300">{error}</p>}{parsing && <p className="text-sm text-[var(--accent-blue)]">Parsing resume...</p>} {mode === 'paste' && <Button variant="secondary" onClick={() => onText(paste)}>Use pasted resume</Button>}
  </div>;
}
