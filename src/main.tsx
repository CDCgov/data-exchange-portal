import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import "src/index.css";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { getEnv } from "src/utils/helperFunctions/env";

import API_ENDPOINTS from "src/config/api";

const oidcConfig: AuthProviderProps = {
  authority: getEnv("VITE_SAMS_AUTHORITY_URL"),
  client_id: getEnv("VITE_SAMS_CLIENT_ID"),
  redirect_uri: getEnv("VITE_OAUTH_CALLBACK_URL"),
  response_type: "code",
  scope: "openid profile email dex:status",
  disablePKCE: true,
  loadUserInfo: true,
  metadata: {
    authorization_endpoint: getEnv("VITE_SAMS_AUTH_URL"),
    token_endpoint: API_ENDPOINTS.tokenCallback,
    issuer: getEnv("VITE_SAMS_AUTHORITY_URL"),
    userinfo_endpoint: getEnv("VITE_SAMS_USER_INFO_URL"),
  },
};

async function enableMocking() {
  if (!getEnv("VITE_DEV_MOCKING_ENABLED")) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
});
