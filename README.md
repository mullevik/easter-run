# easter-run
Easter Run - a GPS based AR game


## Deploy backend

1. Plan TOFU
```
tofu plan -var-file dev.secret.tfvars
```

> `tofu init` might be need to be used first

2. Apply TOFU

```
tofu apply -var-file dev.secret.tfvars
```

> This does the following things:
> 1. builds latest docker image for er-server and uploads it to GCR via a custom script
> 2. applies the GCP infrastructure
> 3. uses output URL of the CloudRun infrastructure to modify `er-client/client.js`'s `BASE_URL`

> use `curl $(tofu output -raw cloud_run_er_server_url)"/?latitude=0&longitude=15"` to see that it is online

> to manually change the `BASE_URL`, use:
> ```
> ./update_base_url_of_client.sh "http://127.0.0.1:8080/"
> ```

### Server docker image

The build and push is done automatically before the backend is deployed (see `build_and_push_er_server_docker_image.sh`).

Here are the steps for manual execution:

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

## Cleanup

Clean infrastructure
```
tofu destroy -var-file dev.secret.tfvars
```


## Notes


### GCP service account
The GCP service account has been used with an exported JSON access key. 
The access key is passed to terraform so that it can manage resources.
The service account needs additional roles to be able to actually do anything.

Here are all the assigned roles:
- Editor
- Service Account User
- Cloud Run Admin