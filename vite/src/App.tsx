import React from "react";
import Login from "./Components/Login";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import Profile from "./Profile";
import PatientForm from "./PatientForm";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";
import LoginOrganization from "./Components/LoginOrganization";
import OrganizationDashboard from "./Components/OrganizationDashboard";
import RegisterOrganization from "./Components/RegisterOrganization";
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
            <Route path="/phr/login" element={<Login />} />
            <Route path="/admin" element={<LoginOrganization />} />
            <Route path="/registeradmin" element={<RegisterOrganization />} />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute
                  component={OrganizationDashboard}
                  isAdminRoute={true}
                />
              }
            />

            {/* <Route path="/" element={<PrivateRoute component={HomePage} />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/phr"
              element={<PrivateRoute component={HomePage} />}
            />
            <Route
              path="/phr/profile"
              element={<PrivateRoute component={Profile} />}
            />
            <Route
              path="/phr/profile/edit"
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
