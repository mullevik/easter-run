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