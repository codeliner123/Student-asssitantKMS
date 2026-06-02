import csv
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import app


class DatasetTests(unittest.TestCase):
    def test_env_file_does_not_override_exported_value(self):
        with tempfile.TemporaryDirectory() as folder:
            env_file = Path(folder) / ".env"
            env_file.write_text("EXAMPLE_SETTING=from-file\nSECOND_SETTING=loaded\n", encoding="utf-8")
            with patch.dict(os.environ, {"EXAMPLE_SETTING": "exported"}, clear=False):
                os.environ.pop("SECOND_SETTING", None)
                app.load_env_file(env_file)
                self.assertEqual(os.environ["EXAMPLE_SETTING"], "exported")
                self.assertEqual(os.environ["SECOND_SETTING"], "loaded")
                os.environ.pop("SECOND_SETTING", None)

    def test_missing_dataset_uses_demo_jobs(self):
        with patch.dict(os.environ, {"DATASET_PATH": "missing.csv"}):
            jobs, source = app.load_jobs()
        self.assertEqual(source, "demo")
        self.assertEqual(jobs, app.DEMO_JOBS)

    def test_relative_dataset_path_is_project_relative(self):
        with patch.dict(os.environ, {"DATASET_PATH": "data/postings.csv"}):
            self.assertEqual(app.dataset_path(), app.PROJECT_ROOT / "data/postings.csv")

    def test_csv_dataset_is_loaded(self):
        with tempfile.TemporaryDirectory() as folder:
            dataset = Path(folder) / "postings.csv"
            with dataset.open("w", newline="", encoding="utf-8") as handle:
                writer = csv.DictWriter(handle, fieldnames=["title", "company_name", "location", "match"])
                writer.writeheader()
                writer.writerow({"title": "UI Engineer", "company_name": "Acme", "location": "Remote", "match": "88"})
            with patch.dict(os.environ, {"DATASET_PATH": str(dataset)}):
                jobs, source = app.load_jobs()
        self.assertEqual(source, "csv")
        self.assertEqual(jobs[0], app.Job("UI Engineer", "Acme", "Remote", 88))

    def test_health_is_ok_without_neo4j(self):
        with patch("app.get_neo4j_status") as status:
            status.return_value.to_dict.return_value = {"available": False}
            payload = app.health_payload()
        self.assertEqual(payload["status"], "ok")
        self.assertFalse(payload["neo4j"]["available"])


if __name__ == "__main__":
    unittest.main()
