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

  provisioner "local-exec" {
    command = "./build_and_push_er_server_docker_image.sh \"${var.PROJECT_ID}\""
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

resource "null_resource" "post_apply_trigger_to_set_base_url_of_client" {
  triggers = {
    apply_complete = "${timestamp()}"
  }

  # Run post-apply script using local-exec provisioner
  provisioner "local-exec" {
    command = "./update_base_url_of_client.sh \"$(tofu output -raw cloud_run_er_server_url)\""
  }

  depends_on = [google_cloud_run_service.cloud-run-er-server]
}