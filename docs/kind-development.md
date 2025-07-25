# Kind K8S Development

Backstage instance runs inside Kind Kubernetes cluster. This environment is a great option for fast development and testing of features that require Kubernetes platform.

If a new feature works well in the Kind Dev environment, most likely it will work well in the target Prod environment in AWS EKS.

## Requirements

- [Kind k8s](https://kind.sigs.k8s.io/)
- A docker host. Good Open Source options are:
  - [Rancher Desktop](https://rancherdesktop.io/). Supports all major Operating Systems.
  - [Colima](https://github.com/abiosoft/colima) - It provides a lean Docker host compability for Mac OS.

## Kind Dev provisioning and setup

Originally, CNOE [idpbuilder](https://github.com/cnoe-io/idpbuilder) was used to provide quick setup of a stack based on ArgoCD, but this project is buggy and still prpbably not fully ready for managing IDP stacks. The last time we used it, the keycloak service was not deploying correctly due to a Go run time error which caused Backstage not to deploy correctly.

For this reason, we are realying on a manual setup of the Backstage stack in a local Kind K8S cluster which is also quick and provides numerous benefits when it comes to customizing Backstage features and integrating this service with other services.

It is possible to use this custom stack in the future to work with idpbuilder stacks as well. Idpbuilder at the moment just deploys a stack but does not provide any other managemen features.

### Local Kind K8S Deployment

1. Ensure all requirements are satisfied.
2. [Deploy Kind Backstage Cluster](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kind/README.md)
3. [Deploy Postgres DB Server](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/postgres/README.md)
4. [Deploy Backstage DEP_IDP](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/backstage/README.md) platform.
5. [Deploy metrics-server](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/metrics-server/README.md)
6. [Deploy ArgoCD](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/argocd/README.md) platform.
7. Optional. [Deploy Headlamp](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/headlamp/README.md) k8s dashboard.
8. Optional. [Deploy Gitea](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/helm/gitea/README.md) platform.

## Customization

When started in this mode, Backstage loads the following configuraiton files:

1. app-config.yml
2. app-config.dev-kind.yml

[app-config.dev-kind.yml](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/app-config.dev-kind.yaml) file is selected by setting [NODE_ENV=dev-kind](https://github.com/altimetrik-digital-enablement-demo-hub/dep-backstage/tree/main/deploy/kustomize/backstage/dev/patch-configmap.yaml)

This configuration provides:

1. Backstage integration with local Kind K8S cluster.
2. It integrates with GitHUb altimetrik-digital-enablement-demo-hub Org to provide autodiscovery of new Catalog components.
3. Use Guest Sign-in provider
4. It elevates guest User and Guests Group to admin level to support work with Backstage catalog and other plugins listed in the configuration.
