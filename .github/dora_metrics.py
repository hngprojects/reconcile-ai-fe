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

# Fetch deployment data from GitHub Actions for both CI and CD workflows
headers = {"Authorization": f"token {GITHUB_TOKEN}"}

# Get CI workflow runs
ci_workflow_url = f"https://api.github.com/repos/{OWNER}/{REPO}/actions/workflows/ci.yml/runs"
ci_response = requests.get(ci_workflow_url, headers=headers).json()
ci_runs = ci_response.get("workflow_runs", [])

# Get CD workflow runs
cd_workflow_url = f"https://api.github.com/repos/{OWNER}/{REPO}/actions/workflows/cd.yml/runs"
cd_response = requests.get(cd_workflow_url, headers=headers).json()
cd_runs = cd_response.get("workflow_runs", [])

# Combine both workflow runs
all_runs = ci_runs + cd_runs

if all_runs:
    # Calculate metrics for all runs
    total_deployments = len([run for run in all_runs if run["status"] == "completed"])
    failed_deployments = len([run for run in all_runs if run["conclusion"] == "failure"])
    
    # Set deployment frequency
    deployment_frequency.set(total_deployments)
    
    # Calculate and set lead time for changes
    if total_deployments > 0:
        # Convert string timestamps to Unix timestamp and calculate difference in minutes
        lead_times = []
        for run in all_runs:
            if run["status"] == "completed":
                created_time = time.strptime(run["created_at"], "%Y-%m-%dT%H:%M:%SZ")
                created_timestamp = time.mktime(created_time)
                updated_time = time.strptime(run["updated_at"], "%Y-%m-%dT%H:%M:%SZ")
                updated_timestamp = time.mktime(updated_time)
                lead_times.append((updated_timestamp - created_timestamp) / 60)
        
        avg_lead_time = sum(lead_times) / len(lead_times)
        lead_time_for_changes.set(avg_lead_time)
    
    # Calculate and set change failure rate
    if total_deployments > 0:
        change_failure_rate.set((failed_deployments / total_deployments) * 100)
    
    # Calculate and set mean time to restore service
    mttr_values = []
    for run in all_runs:
        if run["conclusion"] == "failure":
            created_time = time.strptime(run["created_at"], "%Y-%m-%dT%H:%M:%SZ")
            created_timestamp = time.mktime(created_time)
            updated_time = time.strptime(run["updated_at"], "%Y-%m-%dT%H:%M:%SZ")
            updated_timestamp = time.mktime(updated_time)
            mttr_values.append((updated_timestamp - created_timestamp) / 60)
    
    if mttr_values:
        mean_time_to_restore.set(sum(mttr_values) / len(mttr_values))
    
    # Push metrics to Prometheus Pushgateway
    push_to_gateway(PUSHGATEWAY_URL, job="dora_metrics", registry=registry)
    print("Metrics pushed to Pushgateway successfully!")
else:
    print("No workflow runs found for CI or CD pipelines")