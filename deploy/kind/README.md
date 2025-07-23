# Deploy Kind Kubernetes

Deploys Kind K8S cluster with initial configuration that supports Ingress controllers.

## Deployment

```sh
> cd deploy/kind

# Create Kind cluster
> kind create cluster --config config-ingress.yaml --name backstage

# Install nginx ingress controller
> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

## Test ingress endpoints

Use the provided example app to verify the Nginx ingress controller creates and exposees the HTTP endpoints correctly.

```sh
> cd deploy/kind
> kubectl apply -f example-app
> kubectl get ing -n test
NAME             CLASS   HOSTS                 ADDRESS     PORTS   AGE
my-app-ingress   nginx   my-app.localtest.me   localhost   80      4d22h

> curl -kL https://my-app.localtest.me:8443
...
<h1>Welcome to nginx!</h1>
...
```
