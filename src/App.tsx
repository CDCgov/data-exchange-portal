import "@us-gov-cdc/cdc-react/dist/style.css";

import "src/App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Shell from "src/Shell";
import Login from "src/Login";
import Callback from "src/Callback";
import Dashboard from "src/Dashboard";
import Logout from "src/Logout";
import Profile from "src/Profile";
import Submissions from "src/Submissions";

import { ProtectedRoute } from "src/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="home/*" element={<Shell />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="submissions" element={<Submissions />}></Route>

          <Route path="*" element={<Navigate replace to="home/dashboard" />} />
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
