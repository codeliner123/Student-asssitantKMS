"""Zero-dependency local server for the EduPath AI dashboard."""

from __future__ import annotations

import csv
import json
import mimetypes
import os
from dataclasses import asdict, dataclass
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from database import get_neo4j_status

PROJECT_ROOT = Path(__file__).resolve().parent


def load_env_file(path: Path = PROJECT_ROOT / ".env") -> None:
    """Load a small local .env file without overriding exported environment values."""
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if key:
            os.environ.setdefault(key, value.strip().strip('"').strip("'"))


load_env_file()

DEFAULT_DATASET = PROJECT_ROOT / "postings.csv"
PUBLIC_FILES = {"/": "index.html", "/index.html": "index.html", "/styles.css": "styles.css", "/app.js": "app.js"}


@dataclass(frozen=True)
class Job:
    title: str
    company: str
    location: str
    match: int
    job_posting_url: str = ""


DEMO_JOBS = [
    Job("Frontend Developer Intern", "Stripe", "Remote", 92),
    Job("Junior React Developer", "Airbnb", "New York, NY", 87),
]


def dataset_path() -> Path:
    """Resolve an optional CSV path relative to the project, not the launch folder."""
    configured = os.getenv("DATASET_PATH")
    if not configured:
        return DEFAULT_DATASET
    path = Path(configured).expanduser()
    return path if path.is_absolute() else PROJECT_ROOT / path


def _parse_match(value: str | None, fallback: int) -> int:
    try:
        return max(0, min(100, int(float(value or fallback))))
    except ValueError:
        return fallback


def load_jobs(limit: int = 6) -> tuple[list[Job], str]:
    """Load CSV opportunities or return demo rows when the file is not installed."""
    path = dataset_path()
    if not path.is_file():
        return DEMO_JOBS[:limit], "demo"

    jobs: list[Job] = []
    with path.open(newline="", encoding="utf-8-sig") as handle:
        for index, row in enumerate(csv.DictReader(handle)):
            title = (row.get("title") or "").strip()
            if not title:
                continue
            jobs.append(
                Job(
                    title=title,
                    company=(row.get("company") or row.get("company_name") or "Company").strip(),
                    location=(row.get("location") or "Location not listed").strip(),
                    match=_parse_match(row.get("match"), max(70, 94 - index * 3)),
                    job_posting_url=(row.get("job_posting_url") or "").strip(),
                )
            )
            if len(jobs) >= limit:
                break
    return (jobs, "csv") if jobs else (DEMO_JOBS[:limit], "demo")


def health_payload() -> dict[str, object]:
    jobs, source = load_jobs()
    return {
        "status": "ok",
        "dataset": {"source": source, "path": str(dataset_path()), "jobs": len(jobs)},
        "neo4j": get_neo4j_status().to_dict(),
    }


class EduPathHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload: object, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_file(self, filename: str) -> None:
        path = PROJECT_ROOT / filename
        if not path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        body = path.read_bytes()
        mime_type, _ = mimetypes.guess_type(path.name)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{mime_type or 'application/octet-stream'}; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802 - inherited HTTP method name
        path = urlparse(self.path).path
        if path == "/api/health":
            self._send_json(health_payload())
        elif path == "/api/jobs":
            jobs, source = load_jobs()
            self._send_json({"source": source, "jobs": [asdict(job) for job in jobs]})
        elif path in PUBLIC_FILES:
            self._send_file(PUBLIC_FILES[path])
        else:
            self.send_error(HTTPStatus.NOT_FOUND)


def run() -> None:
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "4173"))
    server = ThreadingHTTPServer((host, port), EduPathHandler)
    print(f"EduPath AI is available at http://{host}:{port}")
    status = get_neo4j_status()
    if not status.available:
        print(f"Note: {status.message}")
    jobs, source = load_jobs()
    print(f"Loaded {len(jobs)} opportunities from {source} data.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping EduPath AI.")
    finally:
        server.server_close()


if __name__ == "__main__":
    run()
