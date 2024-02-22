import "@us-gov-cdc/cdc-react/dist/style.css";

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Shell from "./Shell";
import { Login } from "./Login";
import Callback from "./Callback";
import Logout from "./Logout";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="oauth_callback" element={<Callback />} />
        <Route path="logout" element={<Logout />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
