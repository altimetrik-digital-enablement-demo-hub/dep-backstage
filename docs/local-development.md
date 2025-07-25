# Local dev Backstage environment

Backstage instance runs outside of Kubernetes cluster. If desired, it is possible to connect it with a Kubernetes cluster to gest Kubernetes plugin features.

This is the fastest dev workflow because it does not require building and deploying of the Backstage docker image.

## Requirements

Backstage is a React app. Consult the Getting Started page to ensure all the requirements are installed.

[Backstage Getting Started](https://backstage.io/docs/getting-started/)

Start Backstage. If the start-up were successful backstage UI is available at [http://localhost:3000](http://localhost:3000)

```sh
> yarn start
```

The dev server reloads the application in case code changes were detected, whichis a nice productivity enhancement feeature.

## Customization

When started in this mode, Backstage loads the following configuraiton files:

1. app-config.yml
2. app-config.local.yml

If Kubernetes integration is desired, you can get the value for serviceAccountToken with

```sh
> kubectl get -n dev-backstage secret/backstage-sa-token -o jsonpath='{.data.token }' | base64 -d
```

`app-config.local.yaml` does not exist by default. It is in the `.gitignore` rules and for this reason it needs to be created with the following content:

```yaml
# file ./app-config.local.yml
kubernetes:
  frontend:
    podDelete:
      enabled: true
  serviceLocatorMethod:
    type: 'multiTenant' # Or 'singleTenant' if you have a single cluster
  clusterLocatorMethods:
    - type: 'config'
      clusters:
        - url: https://127.0.0.1:52244
          name: backstage
          authProvider: "serviceAccount" # Use "serviceAccount" for in-cluster, or "google", "aws", "azure", "oidc", etc. for out-of-cluster
          # get the token associated with the Backsge ServiceAccount
          # kubectl get -n dev-backstage secret/backstage-sa-token -o jsonpath='{.data.token }' | base64 -d
          serviceAccountToken: <Backstage-SA-token-in-your-Kind-k8s>
          skipTLSVerify: true
          dashboardApp: headlamp
          dashboardUrl: https://headlamp.localtest.me:8443/
        
      
auth:
  environment: development
  providers:
    guest: # Guest sign-in 
      dangerouslyAllowOutsideDevelopment: false
    github:  # GitHub OAuth App required to access CI/CD Actions in the component page.
      development :
        clientId: ${AUTH_GITHUB_CLIENT_ID}
        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}

catalog:
  orphanStrategy: delete

  # Automatic refresh configuration
  refresh:
    schedule:
      frequency: PT30M # Check every 30 minutes
      timeout: PT10M

  providers:
    # GitHub organization discovery - this will automatically scan repositories for entities
    github:  # GitHub integration. Provides autodiscovery of new components in altimetrik-digital-enablement-demo-hub GitHub org.
      altimetrik:
        organization: altimetrik-digital-enablement-demo-hub
        schedule:
          frequency: PT5M # Scan every 5 minutes
          timeout: PT10M
        filters:
          # Scan all repositories
          repository: '.*'
          branch: 'main'
        catalogPath: '/catalog-info.yaml'

  # Static file locations
  locations:
    # Core catalog file
    - type: file
      target: ./catalog-info.yaml
   
# It elevages guest User and guests Group to admin, so they could access and use the Catalog and other lsited plugins.
permission:
  # setting this to `false` will disable permissions
  enabled: true
  rbac:
    # Define authorized users/groups for RBAC administration (can access RBAC backend)
    admin:
      users:
        - name: user:default/guest # Replace with your admin user entity reference
      groups:
        - name: group:default/guests # Replace with your admin group entity reference

    # Specify plugins whose permissions should be managed by RBAC
    pluginsWithPermission:
      - catalog
      - scaffolder
      - permission # The RBAC plugin itself also has permissions
```

This configuration provides:

1. Backstage integration with local Kind K8S cluster.
   Optional. If not required, just remove this section
2. It integrates with GitHUb altimetrik-digital-enablement-demo-hub Org to provide autodiscovery of new Catalog components.
3. Use Guest Sign-in provider
4. It elevates guest User and Guests Group to admin level to support work with Backstage catalog and other plugins listed in the configuration.
