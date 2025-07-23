# DEP Bacsktage

DEP Backstage (DEP_IDP) is an Internal Developer Platform (IDP) based on Backstage. It provides tools and services that increase the productivity of developers.

## Architecture

DEP_IDP is currently based on Kubernetes, Backstage, GitHub, and ArgoCD stack. There are plans for making the stacks expendable and configurable in the future.

## Goals

- Manage all resources through Backstage.
- Autodiscovery of new resources by well defined [conventions over cobfiguration](https://medium.com/nerd-for-tech/convention-over-configuration-vs-configuration-over-convention-tailoring-api-calls-across-ae4989b6da7a)
- Seamless integration with all components to provide fast obnoarding of new projects based on provided templates.
- Enforce best DevSecOps practices for GitHUb Workflows and by extension for Kuberentes deployments.
