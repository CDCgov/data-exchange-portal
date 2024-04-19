import React from "react";
import "@us-gov-cdc/cdc-react/dist/style.css";

import "src/App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Shell from "src/screens/Shell";
import Login from "src/screens/Login";
import Callback from "src/components/Callback";
import Logout from "src/components/Logout";
import Dashboard from "src/screens/Dashboard";
import Profile from "src/screens/Profile";
import Submissions from "src/screens/Submissions";

import { ProtectedRoute } from "src/components/ProtectedRoute";
import { getEnv } from "src/utils/helperFunctions/env";

function App() {
  // ignore Auth if running locally with mocked data
  const AuthWrapper = getEnv("VITE_DEV_MOCKING_ENABLED")
    ? React.Fragment
    : ProtectedRoute;

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="home/*"
          element={
            <AuthWrapper>
              <Shell />
            </AuthWrapper>
          }>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="submissions" element={<Submissions />}></Route>

          <Route path="*" element={<Navigate replace to="dashboard" />} />
        </Route>

        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="oauth_callback" element={<Callback />} />
        <Route path="logout" element={<Logout />} />

        <Route path="*" element={<Navigate replace to="home/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
