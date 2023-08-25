# Data Exchange Portal

This is the web application for the data upload management dashboard for DEX. It is built using ReactJS and Vite. It is deployed to one of three environments in the [ocio-dmz-dex](https://portal.azure.com/#@cdc.onmicrosoft.com/resource/subscriptions/7d1e3999-6577-4cd5-b296-f518e5c8e677/resourceGroups/OCIO-API-PRD/providers/Microsoft.Web/staticSites/ocio-dmz-dex/staticsite) Azure Static Web App. It also uses managed Azure Functions for the middleware API endpoints.

## Environments

| Env | URL                    |
| --- | ---------------------- |
| dev | https://dexdev.cdc.gov |

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
