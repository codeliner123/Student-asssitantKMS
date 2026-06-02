# EduPath AI

A polished student career assistant dashboard with a resilient, zero-dependency Python server. It presents resume readiness, career roadmap progress, skill gaps, active courses, and recommended opportunities. The expandable mentor chat guides students toward resume analysis, skill quizzes, and GitHub review.

## Run locally

```bash
python3 app.py
```

Then open <http://127.0.0.1:4173>.

## Optional configuration

The app runs without Neo4j and without a jobs dataset. Copy `.env.example` to `.env` to configure local values. The server loads this root-level file automatically without overriding values already exported by your shell. Do **not** place `.env` in a public `static/` directory and never expose API keys in frontend JavaScript.

### Job opportunities dataset

The server checks for `postings.csv` in the project directory by default. You can point `DATASET_PATH` at another CSV file. Relative paths are resolved from the project directory, so starting the app from another working directory remains safe.

Supported CSV columns:

| Column | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Job title. Rows without a title are ignored. |
| `company` or `company_name` | No | Defaults to `Company`. |
| `location` | No | Defaults to `Location not listed`. |
| `match` | No | Optional 0–100 score used by the prototype. |
| `job_posting_url` | No | Optional job listing URL. |

If the file is missing or has no usable rows, EduPath AI starts normally with built-in demo opportunities instead of raising `FileNotFoundError`.

### Neo4j

Neo4j is optional for this prototype. When `NEO4J_URI` is not reachable, the application reports that status through `/api/health`, logs a short note, and continues running with demo data. Start Neo4j separately only when you add graph-backed features.

## API endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Reports app, dataset, and optional Neo4j status. |
| `GET /api/jobs` | Returns CSV-backed or demo job opportunities. |

## Tests

```bash
python3 -m unittest discover -s tests -v
```
