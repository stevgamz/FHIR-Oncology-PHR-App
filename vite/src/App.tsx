import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./PatientForm";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";
import SignIn from "./Components/SignIn";
import Profile from "./Profile";
import "./index.css";
import Admin from "./Components/Admin";
import AdminDashboard from "./Components/AdminDashboard";
import { AuthProvider } from "./Components/useAuth";
import RegisterAdmin from "./Components/RegisterAdmin";
import { PrivateRoute } from "./Components/PrivateRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/registeradmin" element={<RegisterAdmin />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute component={AdminDashboard} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/observation" element={<ObservationForm />} />
            <Route path="/patient" element={<PatientForm />} />
            <Route path="/condition" element={<ConditionForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
