# ArgoCD deployment

Deploys ArgoCD server and components into Kubernetes. 

## Kind Dev dDployment

```sh
>  kubectl apply -k argocd/dev
```

The deployment exposes the following ArgoCD services over ingress endpoints:

1. Web UI Console:  https://argocd.localtest.me:8443/ 
2. gRPC for argo CLI: https://grpc-argocd.localtest.me:8443 

## ArgoCD login

The current instructions rely on `argocd` using the HTTPS endpoint for accessing the server - grpc-argocd.localtest.me:8443.
To avoid warnings about failed grpc invocation use `--grpc-web` flag. The GRPC integration should be improved in the future.

### Initial login

The initial password for the admin account is auto-generated and stored as clear text in the field password in a secret named argocd-initial-admin-secret in your Argo CD installation namespace. You can simply retrieve this password using the argocd CLI:

```sh
> argocd admin initial-password -n argocd
WnBlEX4MKXd4hjhd
```

### Web GUI access

Access the GUI using the admin user name at https://argocd.localtest.me:8443/ 

### argcod CLI access


```sh
> export ARGO_SERVER="grpc-argocd.localtest.me:8443"
> argocd login argocd.localtest.me:8443 --insecure --grpc-web
{"level":"warning","msg":"Failed to invoke grpc call. Use flag --grpc-web in grpc calls. To avoid this warning message, use flag --grpc-web.","time":"2025-07-22T10:29:12-04:00"}
Username: admin
Password: *******
'admin:login' logged in successfully
Context 'argocd.localtest.me:8443' updated
```

List apps on the server

```sh
> argocd app list --grpc-web
NAME  CLUSTER  NAMESPACE  PROJECT  STATUS  HEALTH  SYNCPOLICY  CONDITIONS  REPO  PATH  TARGET
```

Normally this password should be changed but for the purpose of a local dev environment, this is not necessary.  
