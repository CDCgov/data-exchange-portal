# Data Exchange Portal

This is the web application for the data upload management dashboard for DEX. It is built using ReactJS and Vite. The backend `api` application utilizes Kotlin/Spring MVC.

## Environments

| Env | URL                    | SAMS OAuth URL                 |
| --- | ---------------------- | ------------------------------ |
| dev | https://dexdev.cdc.gov | https://apigw-stg.cdc.gov:8443 |

## Local Developer Environment Setup

Next, you will need to set two sets of environment variables: one for the front end and one for the backend. **Please note that no secret values shall be placed in front end environment variables as these values get substituted into the code and exposed in the browser.**

To set your front end environment variables, first make a file called `.env` in the root project directory. Then, add the following variables to it:

- `VITE_SAMS_AUTHORITY_URL` - This is the URL for the SAMS auth provider for OAuth login. See the table above to see which environment in the DEX portal maps to which SAMS environment. For local development, it should match the URL for the DEX portal dev environment.
- `VITE_SAMS_CLIENT_ID` - This is the client ID given by SAMS when registering this app. You can find this value in the [dex-portal-sams-client-id](https://portal.azure.com/#@cdc.onmicrosoft.com/asset/Microsoft_Azure_KeyVault/Secret/https://tf-ede-envar-vault.vault.azure.net/secrets/dex-portal-sams-client-id) Azure Key Vault secret.
- `VITE_SAMS_AUTH_URL` - This is the full URL of the SAMS API endpoint for logging in a user. For our purposes, this is the endpoint that opens the SAMS login portal. A copy of the SAMS API documentation can be found in the DEX sharepoint [here](https://cdc.sharepoint.com/:b:/r/teams/CDC-Data-Exchange/Shared%20Documents/Build%20-%20DEX%20Portal/sams_docs.pdf?csf=1&web=1&e=OsHEAY).
- `VITE_SAMS_USER_INFO_URL` - This is the full URL of the SAMS API endpoint for getting user profile information in JSON format provided a valid authentication token. For our purposes, this is the data the portal uses to populate the user's profile components.
- `VITE_OAUTH_TOKEN_URL` - This is the full URL of the endpoint that will exchange an auth code for a valid auth token and refresh token.
- `VITE_OAUTH_CALLBACK_URL` - The URL that the SAMS client will redirect the client after a successful login attempt. It should have `/oauth_callback` set as its path to match the front end routing configuration of this app.
- `VITE_UPLOAD_API_ENDPOINT` - The URL used by the 'ugly portal'
- `VITE_API_BASE_URL` - The base URL pointing to the Kotlin api. All api routes will be configured off of this base in `src/config/api.ts`
- `VITE_DEV_MOCKING_ENABLED` - A boolean that decides if Mock Service Worker (MSW) is enabled or not for local development (see section about MSW below)

To set your backend environment variables, first make a file called `.vars` within the `api` directory. Next, add the following content to the file, filling in the environment variables with the appropriate values:

```
#!/bin/sh

export SAMS_CLIENT_ID= ""; # Matches the VITE_SAMS_CLIENT_ID value set above.
export SAMS_CLIENT_SECRET= ""; # The client secret given by SAMS when registering this app.  Can also be found in the key vault holding the client ID.
export SAMS_URL= ""; # The base hostname for SAMS, without any path parameters.  Again, find this in the table in the Environments section above.
export SAMS_REDIRECT_URL= ""; # The URL that was used to redirect the client after a successful SAMS login for a particular user's login attempt.  It should match the VITE_OAUTH_CALLBACK_URL value set in the front end environment variables.
export SUPPLEMENTAL_API_URL="";
```

After this is complete run `source ./.vars`. You will also need to create an `application.properties` file within the `api/src/main/resources` directory. Then specify the server port `server.port={NUMBER}`.

## Running the local development servers

The front end and backend use separate servers when run locally. There are several ways to run these servers in tandem. Each way requires environment variables to match the setup in order for the app to function properly. The following sections go over the different ways to run the local development environment.

### First thing's first; build the backend

The backend code is written in Kotlin/Spring MVC. To start the api, run `./gradlew bootRun` in the `api` directory to build/start the api. This needs to be repeated for any changes made to the backend code.

### Using separate commands

- Start the front end server by running `yarn dev` in the project root directory.
- Start the backend server by running `./gradlew bootRun` in the `api` directory.

## Running Automated Tests

We encourage TDD while making changes to this app. To run unit tests for the front end, simply run `yarn test` in the project root directory. These tests will be run as part of the acceptance criteria for a PR.

To run unit tests for the back end, simply run `./gradlew test` in the project `api` directory. These tests will be run as part of the acceptance criteria for a PR.

### Using Mock Service Worker for mocks and testing

We are using Mock Service Worker(MSW) for making local development easier and more consistent. MSW is being used for both network call intercepts and mocks in unit/e2e tests.

All of the configuration for MSW is in the `src/mocks/` directory. There is a setup file for the server MSW for testing and one for the browser for intercepting network calls. All mocked data will live in the `src/mocks/data` directory. All of the mocked routes and responses live in the `src/mocks/handlers.ts` file.

To enable mocking of network calls, set the `VITE_DEV_MOCKING_ENABLED` env var to true.

## Manual Deployments to the Dev Environment

This instance has a dev, staging, and production environment. Eventually, a CD pipeline will be built to automate the deployment process to each environment. **Manual deployments should only be used when this pipeline is unavailable.** The following instructions will explain how to perform a manual deployment to the dev environment.

1. Install non-dev dependencies for the React app. To do this, first run `yarn install --production=true` in the root directory.

2. Create a production build of the React app in dev mode. To do this, first create a file called `.env.dev` at the root of this project. Next, fill out that file with all required environment variables, and set their values to ones appropriate for the dev environment. Finally, generate a build with the command `yarn build:dev`. This will run the TypeScript compiler and Vite to create a production-ready bundle of the React app, but will replace the environment variable references with the values in `.env.dev`. The build should be in a new folder called `dist` at the root of the repo.

3. Create a production build of the API. This can be done by running `./gradlew build` within the `api` directory. This should create a `build` directory within the `api` directory.

## Running the API in Docker

- Install Docker Desktop [download](https://www.docker.com/products/docker-desktop/)

This should install docker desktop along with docker/docker-compose cmdline/terminal commands. Make sure you have your `./api/.env` file populated. Then run `docker-compose build` in the root directory. This will create the container for the api. Then you will be able to start the api by running `docker-compose up`.

### Using the SWA CLI command

The SWA CLI provides convenient commands and arguments for serving the front end and backend at the same time. In addition, it serves the app up on a single URL and port, and even takes care of the reverse proxying for you, so no need to set up CORS in the backend just for local development. This can be done with the following command:

`swa start http://localhost:5173 --run "yarn dev" --api-devserver-url http://localhost:{API_PORT} --swa-config-location ./ -p {APP_PORT}`

## Manual Deployments to the Dev Environment

This instance has a dev, staging, and production environment. Eventually, a CD pipeline will be built to automate the deployment process to each environment. **Manual deployments should only be used when this pipeline is unavailable.** The following instructions will explain how to perform a manual deployment to the dev environment.

1. Install non-dev dependencies for the React app and API functions. To do this, first run `yarn install --production=true` in the root directory.

2. Create a production build of the React app in dev mode. To do this, first create a file called `.env.dev` at the root of this project. Next, fill out that file with all required environment variables, and set their values to ones appropriate for the dev environment. Finally, generate a build with the command `yarn build:dev`. This will run the TypeScript compiler and Vite to create a production-ready bundle of the React app, but will replace the environment variable references with the values in `.env.dev`. The build should be in a new folder called `dist` at the root of the repo.

3. Finally, use the SWA CLI to execute the deployment to the dev environment. The first piece of information we need here is the deployment token. This is a secret value that validates that the user doing the deployment is authorized to do so. This can be retrieved from the Azure Static Web App instance overview page. Next, run the following command providing the deployment token:

`swa deploy -a ./src -O ./dist -d ***** --env dev -w .`

Here's the summary of this command:

- `swa deploy` This tells the CLI we are executing a deployment.
- `-a` This tells the CLI where the source code is for the front-end site.
- `-O` This is the argument flag for the built front-end code.
- `-d` This is the argument flag for the deployment token.
- `--env` This is the argument flag for the environment that will be deployed to. This must match the name of the environment in the instance.
- `-w` This is the argument flag for the location of the JSON configuration file for the static web app. It should pick up `staticwebapp.config.json` file in the root of the project.
