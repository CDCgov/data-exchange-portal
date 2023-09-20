import "@us-gov-cdc/cdc-react/dist/style.css";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Landing } from "./Landing";
import Callback from "./Callback";
import Logout from "./Logout";
import Profile from "./Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/oauth_callback" element={<Callback />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
