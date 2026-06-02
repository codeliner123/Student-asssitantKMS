"""Optional Neo4j connectivity helpers for EduPath AI.

The dashboard remains usable when Neo4j is not running. These helpers only report
availability; graph-backed features can be added without making startup brittle.
"""

from __future__ import annotations

import os
import socket
from dataclasses import asdict, dataclass
from urllib.parse import urlparse


@dataclass(frozen=True)
class Neo4jStatus:
    configured: bool
    available: bool
    uri: str
    message: str

    def to_dict(self) -> dict[str, bool | str]:
        return asdict(self)


def get_neo4j_status(timeout: float = 0.25) -> Neo4jStatus:
    """Return Neo4j availability without preventing the application from starting."""
    uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    parsed = urlparse(uri)
    host = parsed.hostname or "localhost"
    port = parsed.port or 7687
    configured = bool(os.getenv("NEO4J_URI"))

    try:
        with socket.create_connection((host, port), timeout=timeout):
            return Neo4jStatus(configured, True, uri, "Neo4j is reachable.")
    except OSError:
        return Neo4jStatus(
            configured,
            False,
            uri,
            "Neo4j is unavailable. Running with built-in demo data.",
        )
