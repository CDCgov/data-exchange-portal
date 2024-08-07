import "@us-gov-cdc/cdc-react/dist/style.css";

import "src/App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import AppShell from "src/screens/AppShell";
import Login from "src/screens/Login";
import Callback from "src/components/Callback";
import Logout from "src/components/Logout";
import Dashboard from "src/screens/Dashboard";
import MetadataManagement from "./screens/MetadataManagement";
import UserManagement from "./screens/UserManagement";
import UploadFiles from "./screens/UploadFiles.tsx";
import Profile from "src/screens/Profile";
import Submissions from "src/screens/Submissions";

import ProtectedRoute from "src/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="home/*"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route
            path="metadata-management"
            element={<MetadataManagement />}></Route>
          <Route path="user-management" element={<UserManagement />}></Route>
          <Route path="upload" element={<UploadFiles />}></Route>
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
