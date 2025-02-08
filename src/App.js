import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import JobApplicationForm from "./components/JobApplicationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} /> {/* Default to SignIn */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/job-application" element={<JobApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
