import "@us-gov-cdc/cdc-react/dist/style.css";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Landing } from "./Landing";
import Callback from "./Callback";
import Profile from "./Profile";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { getEnv } from "./utils.ts";

const oidcConfig: AuthProviderProps = {
  authority: getEnv("VITE_SAMS_AUTHORITY_URL"),
  client_id: getEnv("VITE_SAMS_CLIENT_ID"),
  redirect_uri: getEnv("VITE_OAUTH_CALLBACK_URL"),
  response_type: "code",
  scope: "openid profile email",
  disablePKCE: true,
  loadUserInfo: true,
  metadata: {
    authorization_endpoint: getEnv("VITE_SAMS_AUTH_URL"),
    token_endpoint: getEnv("VITE_OAUTH_TOKEN_URL"),
    issuer: getEnv("VITE_SAMS_AUTHORITY_URL"),
    userinfo_endpoint: getEnv("VITE_SAMS_USER_INFO_URL"),
  },
};

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/oauth_callback" element={<Callback />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
