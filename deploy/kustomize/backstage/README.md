# Backstage deployment with Kustommize

A simple Backstage deployment used in a local Kind K8S cluster for development. 

## Requirements

1. Postgres server
  Deploy first [Postgres](../postgres/README.md) Server. Backstage Dev is already configured to connect to the Postgres Server K8S Service using predefined credentials.

## Secrets management with Kustommize

The kustomize overlay, like [dev](./dev/) should contain a file named `.env.secrets` which is first excluded from git check-in through a gitignore rule, and is used by kustommize to generate secrets that are provided to the target Pods.

This is not ideal way to manage secrets but it is a good start that prevents from checking-in sensitive data into GitHub repositories.

## Integrations

### Kubernetes

Backstage relies on the core Kubernetes plugin to provide integration with Kubernetes. The authentication and authorization of Backstage process depends on the Kubernetes distribution used.

The Kind Dev env is using a simple authentication using the K8S ServiceAccount of the Backstage deployment with some added [RBAC privileges](../backstage/base/sa-k8s-rbac.yaml) to watch K8S resources across the K8S cluster.

### GitHub

1. Provider

This provider allows scanning of repositories in the Altimetrik GitHub organization and ingesting components into the Backstage Catalog. 

Add GITHUB_TOKEN to .env.secrets file in the overlay folder.

Example for the dev overlay:

```sh
# file .dev/.env.secrets
GITHUB_TOKEN: YOUR_GITHUB_TOKEN
```

### CI/CD Workflows/Actions

This provider allows ingesting CI/CD Workflows runs information and displaying it in CI/CD page of the Backstage component.

Create a GitHub OAuth App and supply them as env vars when 

```sh
# file .dev/.env.secrets
AUTH_GITHUB_CLIENT_ID: ....
AUTH_GITHUB_CLIENT_SECRET: ....
```

## Provision

### Kind Dev environment

```sh
 > cd dep-backstage/deploy/kustommize 
 > kubectl apply -k postgres/dev
```

Backstage UI is available at https://dep.localtest.me:8443/, and uses Guest provider for authentication.

## Get backstage sa token 

Use the tokent for a standalone Backstage server running outside of the K8s cluster to integrate it with the K8S cluster in the [local dev environment](../../../docs/local-development.md) .

```sh
> kubectl -n dev-backstage get secret backstage-sa-token -o go-template='{{.data.token | base64decode}}
eyJhbGciOi...
```
