import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const oidcConfig: AuthProviderProps = {
  authority: "https://apigw-stg.cdc.gov:8443",
  client_id: "0342deed-73fd-4e45-b306-ba3cbeebe628",
  redirect_uri: "http://localhost:7071/api/oauth_callback",
  response_type: "code",
  metadata: {
    authorization_endpoint:
      "https://apigw-stg.cdc.gov:8443/auth/oauth/v2/authorize",
    issuer: "https://apigw-stg.cdc.gov:8443",
    userinfo_endpoint:
      "https://apigw-stg.cdc.gov:8443/openid/connect/v1/userinfo",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
