import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { getEnv } from "./utils.ts";

const oidcConfig: AuthProviderProps = {
  authority: getEnv("REACT_APP_SAMS_AUTHORITY_URL"),
  client_id: getEnv("REACT_APP_SAMS_CLIENT_ID"),
  redirect_uri: getEnv("REACT_APP_OAUTH_CALLBACK_URL"),
  response_type: "code",
  scope: "openid profile email",
  disablePKCE: true,
  metadata: {
    authorization_endpoint: getEnv("REACT_APP_SAMS_AUTH_ENDPOINT"),
    issuer: getEnv("REACT_APP_SAMS_AUTHORITY_URL"),
    userinfo_endpoint: getEnv("REACT_APP_SAMS_USER_INFO_ENDPOINT"),
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
