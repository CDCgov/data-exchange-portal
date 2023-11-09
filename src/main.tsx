import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { getEnv } from "./utils.ts";

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
    token_endpoint: getEnv("VITE_OAUTH_TOKEN_URL"),
    issuer: getEnv("VITE_SAMS_AUTHORITY_URL"),
    userinfo_endpoint: getEnv("VITE_SAMS_USER_INFO_URL"),
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
