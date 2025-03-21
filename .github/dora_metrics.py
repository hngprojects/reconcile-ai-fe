python
import os
import requests
import time
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
# Load environment variables
PUSHGATEWAY_URL = os.getenv("PUSHGATEWAY_URL", "http://3.73.6.29:9091")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
OWNER = "hngprojects"
REPO = "reconcile-ai-fe"
# Initialize Prometheus registry
registry = CollectorRegistry()
# Define Prometheus metrics
deployment_frequency = Gauge("dora_deployment_frequency", "Number of deployments per day", registry=registry)
lead_time_for_changes = Gauge("dora_lead_time", "Average time from commit to deployment in minutes", registry=registry)
change_failure_rate = Gauge("dora_change_failure_rate", "Percentage of failed deployments", registry=registry)
mean_time_to_restore = Gauge("dora_mttr", "Mean time to restore failed deployments in minutes", registry=registry)
# Fetch deployment data from GitHub Actions
headers = {"Authorization": f"token {GITHUB_TOKEN}"}
workflow_url = f"https://api.github.com/repos/{OWNER}/{REPO}/actions/runs"
response = requests.get(workflow_url, headers=headers).json()
runs = response.get("workflow_runs", [])
if runs:
    total_deployments = len([run for run in runs if run["status"] == "completed"])
    failed_deployments = len([run for run in runs if run["conclusion"] == "failure"])
    deployment_frequency.set(total_deployments)
    if total_deployments > 0:
        avg_lead_time = sum([(time.time() - run["created_at"]) / 60 for run in runs]) / total_deployments
        lead_time_for_changes.set(avg_lead_time)
    if total_deployments > 0:
        change_failure_rate.set(failed_deployments / total_deployments)
    mttr_values = [run["updated_at"] - run["created_at"] for run in runs if run["conclusion"] == "failure"]
    if mttr_values:
        mean_time_to_restore.set(sum(mttr_values) / len(mttr_values))
    push_to_gateway(PUSHGATEWAY_URL, job="dora_metrics", registry=registry)
    print("Metrics pushed to Pushgateway")















