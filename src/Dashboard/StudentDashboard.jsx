import React, { useEffect, useState } from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [status, setStatus] = useState("Loading...");
  const [label, setLabel] = useState("Today Status");
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://attendance-backend-3fjj.onrender.com/api/attendance";

  const fetchAttendanceStatus = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        setStatus("Not Logged In");
        setLoading(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/today`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Error fetching status");
      } else {
        setStatus(data.status || "No Status Yet");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setStatus("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceStatus();

  
    const interval = setInterval(fetchAttendanceStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="student-dashboard">
      <StudentDashboardSidebar />

      <div className="student-dashboard-content">
        <h2>Student Dashboard</h2>

        <div className="student-status-card student-glass-effect">
          <h3>{label}</h3>
          <p className={`status ${status.toLowerCase().replace(/\s+/g, "-")}`}>
            {loading ? "Loading..." : status}
          </p>
        </div>

        <div className="student-note">
          <small>
            ⏱️ Status auto-updates based on Kitchen Turn, Leave, or QR Scan.
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
