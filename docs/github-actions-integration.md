# Backstage GitHub Actions Integration

This intergation enables Backstage to ingest and display GitHub Workflows runs for a given repository.

The plugin that performs the ingestion is installed in Backstage frontend, which requires additional setup to install and configure it.

## Installation

### Backstage frontend

#### Provide OAuth Credentials

Follow the instructions in this [article](https://roadie.io/blog/github-auth-backstage/) to set-up GitHun OAuth Application. Please note DO NOT create GitHub Application for this purpose.

Set the callback URL in GitHun OAuth Application to:

`http://localhost:7007/api/auth/github/handler/frame`

Write down the Client ID and Secret and add them to `deploy/kustomize/backstage/dev/.emv.secrets` file.

```sh

AUTH_GITHUB_CLIENT_ID: Ov23.....
AUTH_GITHUB_CLIENT_SECRET: 6b6d....
```

Ensure the app-config.kind-dev.yml and `app-config.local.yml` contain this auth provider

```yaml
auth:
  providers:
    github:
      development:
        clientId: ${AUTH_GITHUB_CLIENT_ID}
        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
```

#### Install the frontend plugin

From your Backstage root directory

```sh
> yarn --cwd packages/app add @backstage-community/plugin-github-actions
```

#### Integrating with EntityPage

In packages/app/src/components/catalog/EntityPage.tsx

```yaml
# Import the new plugin
import {
  EntityGithubActionsContent,
  isGithubActionsAvailable,
} from '@backstage-community/plugin-github-actions';


# Ensure the EntitySwitch.Case is present for GitHUb actions
const cicdContent = (
  // This is an example of how you can implement your company's logic in entity page.
  // You can for example enforce that all components of type 'service' should use GitHubActions
  <EntitySwitch>
    <EntitySwitch.Case if={isGithubActionsAvailable}> # this is usually commented out
      <EntityGithubActionsContent />                  #
    </EntitySwitch.Case>                              #
                  
    ...
```

#### Add GitHub Provider to the backend

Add the following plugin in case it is missing

From your Backstage root directory

```sh
> yarn --cwd packages/backend add @backstage/plugin-auth-backend-module-github-provider
```

And add the following dependency to your backend index, `backend/src/index.ts` file:

```yaml
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
```

#### Configure components to use CI/CD integration

Add the required Backstage [GitHub `github.com/project-slug` annotation](https://github.com/altimetrik-digital-enablement-demo-hub/sample-csharp/blob/main/catalog-info.yaml#L17).

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-csharp
  description: A CSharp MVC API application
  tags:
    - csharp
    - dotnet
    - mvc
  annotations:
    backstage.io/techdocs-ref: dir:.
    backstage.io/kubernetes-id: sample-csharp
    backstage.io/kubernetes-label-selector: 'app=sample-csharp'
    backstage.io/kubernetes-namespace: sample-csharp
    argocd/app-name: sample-csharp
    github.com/project-slug: altimetrik-digital-enablement-demo-hub/sample-csharp
  links:
    - url: https://github.com/altimetrik-digital-enablement-demo-hub/sample-csharp
      title: Repo URL
      icon: github
spec:
  # owner: all_usa_engineering_dl
  owner: guest
  lifecycle: production
  type: service
  system: sample-csharp
```

Check the official Backstage [annoation documentation](https://backstage.io/docs/features/software-catalog/well-known-annotations/#githubcomproject-slug) for more details.
