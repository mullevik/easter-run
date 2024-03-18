#!/bin/bash

set -e

echo ${PROJECT_ID}
if [ -z ${PROJECT_ID} ]; then echo "PROJECT_ID is unset" ; exit 1 ; else echo "Project id ${PROJECT_ID}"; fi

docker build -t gcr.io/${PROJECT_ID}/er-server er-server

docker push gcr.io/${PROJECT_ID}/er-server

tofu apply -var-file dev.secret.tfvars