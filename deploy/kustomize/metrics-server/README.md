# Metrics server

Metrics server is not deployed by default in Kind. This deployment adjust the metrics-server to use insecure-tls in order to integrate with the API server.

## Kind Dev Deployment

Metrics server is deployed into the `kube-system` namespce by default.

```sh
>  kubectl apply -k metrics-server/dev
```
