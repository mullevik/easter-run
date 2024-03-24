#!/bin/bash

set -e


PROJECT_ID="$1"

if [ -z "$PROJECT_ID" ]; then
    echo "No PROJECT_ID provided - pass it as the first argument"
    exit 1
fi

echo "Building new docker image for er-server"
docker build -t gcr.io/${PROJECT_ID}/er-server:latest er-server

echo "Authenticating docker for GCloud"
gcloud auth configure-docker

echo "Pushing new docker image for er-server to Google Cloud Registry"
docker push gcr.io/${PROJECT_ID}/er-server:latest
