import React from "react";
import Login from "./Components/Login";
import HomePage from "./HomePage";
import Profile from "./Profile";
import PatientForm from "./PatientForm";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";
import Admin from "./Components/Admin";
import AdminDashboard from "./Components/AdminDashboard";
import RegisterAdmin from "./Components/RegisterAdmin";
import { AuthProvider } from "./Components/useAuth";
import { PrivateRoute } from "./Components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registeradmin" element={<RegisterAdmin />} />

            <Route
              path="/admin/dashboard"
              element={<PrivateRoute component={AdminDashboard} />}
            />

            <Route
              path="/phr"
              element={<PrivateRoute component={HomePage} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute component={Profile} />}
            />
            <Route
              path="/profile/edit"
              element={<PrivateRoute component={PatientForm} />}
            />
            <Route
              path="/phr/observation"
              element={<PrivateRoute component={ObservationForm} />}
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
