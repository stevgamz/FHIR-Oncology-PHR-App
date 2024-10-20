import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./PatientForm";
import ObservationForm from "./ObservationForm";
import ConditionForm from "./ConditionForm";
import "./index.css";
import SignIn from "./SignIn";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/observation" element={<ObservationForm />} />
          <Route path="/patient" element={<PatientForm />} />
          <Route path="/condition" element={<ConditionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
