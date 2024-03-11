# easter-run
Easter Run - a GPS based AR game


## Deploy backend

1. Initialize google cloud CLI and authenticate via browser.
```
gcloud init
```
2. Build docker image.
```
# in er-server
docker build -t gcr.io/${PROJECT_ID}/er-server .
```
3. Push docker image.
```
docker push gcr.io/${PROJECT_ID}/er-server
```

> you may need to do `gcloud auth configure-docker` the first time

