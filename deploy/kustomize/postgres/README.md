# Deploy Postgres DB in Kubernetes

A simple Postgres server deployment used in a local Kind K8S cluster for development.

## Provision

Dev environment

```sh
 > cd dep-backstage/deploy/kustommize 
 > kubectl apply -k postgres/dev
```

## Connect to PSQL

Password is base64 encoded in [./base/secret.yaml](./base/secret.yaml)


```sh
  # Find the pod name of the PostgreSQL server first.
  > kubectl  exec -it postgres-6d75c859bf-5g6k9 -- psql -h localhost -U backstage --password -p 5432 backstage
  Password:
psql (17.5 (Debian 17.5-1.pgdg120+1))
Type "help" for help.

backstage=# 
```
