import React, { useEffect, useState } from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css"; 

const StudentDashboard = () => {
  const [status, setStatus] = useState("Loading...");
  const [label, setLabel] = useState("Today Status");
  const [loading, setLoading] = useState(true);


  const ATTENDANCE_URL = "https://attendance-backend-3fjj.onrender.com/api/attendance/today";

  const fetchStatus = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("Not Logged In");
        setLoading(false);
        return;
      }

      const now = new Date();
      const hours = now.getHours();



      if (hours >= 0 && hours < 9) {
        setLabel("Yesterday Status (Final)");
      } else {
        setLabel("Today Status (Active)");
      }


      const attendanceRes = await fetch(ATTENDANCE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const attendanceData = await attendanceRes.json();

      if (attendanceData.status) {

        setStatus(attendanceData.status);
      } else {
        setStatus(attendanceData.message || "Failed to get status");
      }

    } catch (error) {
      console.error("Error fetching status:", error);
      setStatus("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 60000); 
    return () => clearInterval(interval);
  }, []);


  const getStatusClass = (currentStatus) => {
    if (!currentStatus) return "";
    const normalizedStatus = currentStatus.toLowerCase().replace(/\s+/g, "-");
    
    if (normalizedStatus.includes("absent")) return "status-absent";
    if (normalizedStatus.includes("present") || normalizedStatus.includes("kitchen") || normalizedStatus.includes("leave")) return "status-present";
    return "status-pending";
  };

  return (
    <div className="student-dashboard">
      <StudentDashboardSidebar />

      <div className="student-dashboard-content">
        <h2>Student Dashboard</h2>

        <div className="student-status-card student-glass-effect">
          <h3>{label}</h3>
          <p className={getStatusClass(status)}>
            {loading ? "Loading..." : status}
          </p>
        </div>

        <div className="student-note">
          <small>
            ⏱️ Status auto-updates every minute. **Final status determination (including Leave and Absent) is now handled by the server.**
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;