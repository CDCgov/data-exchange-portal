import "@us-gov-cdc/cdc-react/dist/style.css";

import "./App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Shell from "./Shell";
import Login from "./Login";
import Callback from "./Callback";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Profile from "./Profile";
import Submissions from "./Submissions";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="home/*" element={<Shell />}>
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
