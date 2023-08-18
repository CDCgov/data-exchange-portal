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

### Environment Variables

You will need to set the following environment variables in the `local.settings.json` in order for the middleware function to run properly.

- `SAMS_CLIENT_ID` - This is the client ID given by SAMS for the dex portal app registration.
- `SAMS_CLIENT_SECRET` - This is the client secret given by SAMS for the dex portal app registration.
- `SAMS_URL` - This is the base URL for SAMS.
- `SAMS_REDIRECT_URL` - This is the URL that SAMS was configured to redirect the client to. It is required by SAMS as a security mechanism.
- `DEX_PORTAL_REDIRECT_URL` - This is the URL that the middleware will send back to the client. It should be set so it redirects the client back to the DeX portal user dashboard.

Next, install the project dependencies by running `npm install`.
Next, build the project with `npm run build`.
Finally, run the functions with `func host start`. This should serve up the functions on `http://localhost:7071`.

Note that you can also run this with the SWA CLI.
