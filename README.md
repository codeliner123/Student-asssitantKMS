# EduPath AI

EduPath AI is a React + Vite + TypeScript career intelligence frontend for students and early-career professionals. It includes a dark responsive dashboard, resume analyzer, skill assessment, GitHub analyzer, career roadmap, skill graph, job insights, and a Gemini-powered floating chatbot.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Add your Gemini key to `.env` to enable AI features:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Build

```bash
npm run build
```

## Notes

- All product data is currently hardcoded mock data and marked with `// TODO: Replace with real API call` comments.
- `.env` is ignored by Git; do not commit API keys.
- Resume PDF parsing uses `pdfjs-dist`; TXT resumes use the browser File API.
