# Headlamp deployment

Headlamp is a popular Kubernetes dashboard that integrates well with Kind K8S Cluster and integrates easily with Backstage Kubernetes plugin.

If enabled, Backstage provides a link to the Headlamp UI for the monitored resources.

Headlamp is an optional component for the Kind development environment.


## Deployment

```sh
> cd deploy/kustomize
> kubectl apply -k headlamp/dev
```

The service can be accessed at https://headlamp.localtest.me:8443/

Use this command to obtain authentication token for the UI

```sh
> kubectl create token headlamp-admin -n headlamp

```


## References

1. Backstage k8s plugin configuration: https://backstage.io/docs/features/kubernetes/configuration/
2. Backstage and Headlamp experience: https://headlamp.dev/blog/2024/11/11/introducing-an-integrated-backstage-and-headlamp-experience/ 
