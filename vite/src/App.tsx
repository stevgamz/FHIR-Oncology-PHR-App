import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./PatientForm";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";
import Profile from "./Profile";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Index from "./index";
import RegisterAdmin from "./Components/RegisterAdmin";
import { AuthProvider } from "./Components/useAuth";
import { PrivateRoute } from "./Components/PrivateRoute";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/phr" element={<PrivateRoute component={Index} />} />
            <Route
              path="/profile"
              element={<PrivateRoute component={Profile} />}
            />
            <Route path="/registeradmin" element={<RegisterAdmin />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute component={AdminDashboard} />}
            />
            <Route
              path="/phr/observation"
              element={<PrivateRoute component={ObservationForm} />}
            />
            <Route
              path="/profile/edit"
              element={<PrivateRoute component={PatientForm} />}
            />
            <Route
              path="/phr/condition"
              element={<PrivateRoute component={ConditionForm} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
