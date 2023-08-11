# DeX Portal API

This is a set of middleware endpoints deployed to Azure Functions managed by Azure Static Web Apps.

## Endpoints

- `/api/oauth_callback`
  This is the endpoint that gets invoked when the user successfully logs into an auth provider. The incoming request contains an auth code that can be exchanged with the same auth provider for an auth token. The endpoint then responds to the client with token and redirects the browser back to the DeX portal dashboard.

## Setup

To run this locally, you first need to install the following:

- NodeJS 18.x
- Azure CLI
- Azure Function Core Tools CLI

Next, install the project dependencies by running `npm install`.
Next, build the project with `npm run build`.
Finally, run the functions with `func host start`. This should serve up the functions on `http://localhost:7071`.

Note that you can also run this with the SWA CLI.
