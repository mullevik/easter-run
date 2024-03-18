provider "google" {
  credentials = file("service_account_key.secret.json")
  project = var.PROJECT_ID
  region  = var.REGION
}

resource "google_cloud_run_service" "cloud-run-er-server" {
  name     = "cloud-run-er-server"
  location = var.REGION

  template {
    spec {
      containers {
        image = "gcr.io/${var.PROJECT_ID}/er-server:latest"
      }
    }
  }

}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.cloud-run-er-server.location
  project     = google_cloud_run_service.cloud-run-er-server.project
  service     = google_cloud_run_service.cloud-run-er-server.name

  policy_data = data.google_iam_policy.noauth.policy_data
}


output "cloud_run_er_server_url" {
  value = google_cloud_run_service.cloud-run-er-server.status[0].url
}