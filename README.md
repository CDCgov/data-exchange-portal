# Data Exchange Portal

This is the web application for the data upload management dashboard for DEX. It is built using ReactJS and Vite. It is deployed to one of three environments in the [ocio-dmz-dex](https://portal.azure.com/#@cdc.onmicrosoft.com/resource/subscriptions/7d1e3999-6577-4cd5-b296-f518e5c8e677/resourceGroups/OCIO-API-PRD/providers/Microsoft.Web/staticSites/ocio-dmz-dex/staticsite) Azure Static Web App. It also uses managed Azure Functions for the middleware API endpoints.

## Environments

| Env | URL                    | SAMS OAuth URL            |
| --- | ---------------------- | ------------------------- |
| dev | https://dexdev.cdc.gov | https://apigw-stg.cdc.gov |

## Local Developer Environment Setup

The following software is required to develop this app:

1. NodeJS
2. Azure CLI
3. Azure Functions Core Tools version 4.0.5095
4. Azure Static Web App CLI

Next, you will need to install NPM dependencies for both the front end app, and the backend server. To do this, run `yarn install` in the root project directory. Then, `cd` into the `api` directory and run `npm install`.

### Environment Variables

Next, you will need to set two sets of environment variables: one for the front end and one for the backend. **Please note that no secret values shall be placed in front end environment variables as these values get substituted into the code and exposed in the browser.**

To set your front end environment variables, first make a file called `.env` in the root project directory. Then, add the following variables to it:

- `VITE_SAMS_AUTHORITY_URL` - This is the URL for the SAMS auth provider for OAuth login. See the table above to see which environment in the DEX portal maps to which SAMS environment. For local development, it should match the URL for the DEX portal dev environment.
- `VITE_SAMS_CLIENT_ID` - This is the client ID given by SAMS when registering this app. You can find this value in the [dex-portal-sams-client-id](https://portal.azure.com/#@cdc.onmicrosoft.com/asset/Microsoft_Azure_KeyVault/Secret/https://tf-ede-envar-vault.vault.azure.net/secrets/dex-portal-sams-client-id) Azure Key Vault secret.
- `VITE_SAMS_AUTH_URL` - This is the full URL of the SAMS API endpoint for logging in a user. For our purposes, this is the endpoint that opens the SAMS login portal. A copy of the SAMS API documentation can be found in the DEX sharepoint [here](https://cdc.sharepoint.com/:b:/r/teams/CDC-Data-Exchange/Shared%20Documents/Build%20-%20DEX%20Portal/sams_docs.pdf?csf=1&web=1&e=OsHEAY).
- `VITE_SAMS_USER_INFO_URL` - This is the full URL of the SAMS API endpoint for getting user profile information in JSON format provided a valid authentication token. For our purposes, this is the data the portal uses to populate the user's profile components.
- `VITE_OAUTH_TOKEN_URL` - This is the full URL of the endpoint that will exchange an auth code for a valid auth token and refresh token.

## Deploying to the Dev Environment

This app is deployed to a single Azure Static Web instance. This instance has a dev, staging, and production environment. The following instructions will explain how to perform a manual deployment to the dev environment.

1. Install non-dev dependencies for the React app and API functions. To do this, first run `yarn install --production=true` in the root directory. Then, in the `api` directory, run `npm install --production`.

2. Create a production build of the React app in dev mode. To do this, first create a file called `.env.dev` at the root of this project. Next, fill out that file with all required environment variables, and set their values to ones appropriate for the dev environment. Finally, generate a build with the command `yarn build:dev`. This will run the TypeScript compiler and Vite to create a production-ready bundle of the React app, but will replace the environment variable references with the values in `.env.dev`. The build should be in a new folder called `dist` at the root of the repo.

3. Create a production build of the API function. This can be done by running `npm run build` within the `api` directory. This simply runs the TypeScript compiler on the Azure function code. Again, this should create a `dist` directory within the `api` directory.

4. Finally, use the SWA CLI to execute the deployment to the dev environment. The first piece of information we need here is the deployment token. This is a secret value that validates that the user doing the deployment is authorized to do so. This can be retrieved from the Azure Static Web App instance overview page. Next, run the following command providing the deployment token:

`swa deploy ./dist --api-location ./api -d ***** --env dev -w .`

Here's the summary of this command:

- `swa deploy` This tells the CLI we are executing a deployment.
- `./dist` This tells the CLI where the static site assets are for the front end site.
- `--api-location` This tells the CLI where the code is that will be deployed to the managed Azure Function.
- `-d` This is the argument flag for the deployment token.
- `--env` This is the argument flag for the environment that will be deployed to. This must match the name of the environment in the instance.
- `-w` This is the argument flag for the location of the JSON configuration file for the static web app. It should pick up `staticwebapp.config.json` file in the root of the project.
