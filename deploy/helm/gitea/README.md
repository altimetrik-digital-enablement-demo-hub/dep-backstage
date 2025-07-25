# Deployment of Gitea

Gitea is a complex application with many settings and components for HA deployment. For a simple dev environment based on Kind the simplest way to depoy Gitea is to use the offical Helm chart and provide a values file to dsiable advanced settings, and enable sqlite3 in-memory database.

Gitea is optional for the Kind development environment. It could be used when it is a simpler option to deploy compared to GitHUb.

## Deployment

Add gitea helm chart repo

```sh
> helm repo add gitea-charts https://dl.gitea.com/charts/
```

Deploy Gitea

```sh
> cd deploy/helm

> helm upgrade -i \ 
gitea  gitea-charts/gitea \ 
-n dev-backstage  \
--values gitea/dev-values.yaml
```

Gitea should be available at https://gitea.localtest.me:8443

The default credentials are stored in the chart values file. To obtain them check the environment values of the Gitea Pod

```sh
> kubectl describe pod -l app=gitea -n dev-backstage  | grep GITEA_ADMIN
  GITEA_ADMIN_USERNAME: ....
  GITEA_ADMIN_PASSWORD: ....
```
