import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentDashboard from "./Dashboard/StudentDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import QRScannerInitial from "./Pages/QRScannerInitial";
import QRScanPage from "./Pages/QRScanPage";
import KitchenTurnForm from "./Pages/KitchenTurnForm";
import QRGenerator from "./AdminPages/QRGenerator";
import StudentRecords from "./AdminPages/StudentRecords";
import LeaveRequests from "./AdminPages/LeaveRequests";
import CorrectionRequests from "./AdminPages/CorrectionRequests";
import LifecycleTracking from "./AdminPages/LifecycleTracking";
import Reports from "./AdminPages/Reports";
import LeaveForm from "./Pages/LeaveForm";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role || "student");
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserRole(user.role || "student");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/qr-generator" element={<QRGenerator />} />
          <Route path="/admin/student-records" element={<StudentRecords />} />
          <Route path="/admin/leave-requests" element={<LeaveRequests />} />
          <Route path="/admin/correction-requests" element={<CorrectionRequests />} />
          <Route path="/admin/lifecycle-tracking" element={<LifecycleTracking />} />
          <Route path="/admin/reports-endflow" element={<Reports />} />
          <Route path="/qr-scanner" element={<QRScannerInitial />} />
          <Route path="/qr-scan" element={<QRScanPage />} />
          <Route path="/kitchen-turn" element={<KitchenTurnForm />} />
          <Route path="/leave-form" element={<LeaveForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
