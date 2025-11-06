import React, { useEffect, useState } from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [status, setStatus] = useState("Loading...");
  const [label, setLabel] = useState("Today Status");
  const [loading, setLoading] = useState(true);


  const ATTENDANCE_URL = "https://attendance-backend-3fjj.onrender.com/api/attendance/today";
  const LEAVE_URL = "https://attendance-backend-3fjj.onrender.com/api/leave/my-leaves";

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("Not Logged In");
        setLoading(false);
        return;
      }

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

     
      if (hours >= 0 && hours < 9) {
        setLabel("Yesterday Status");
      } else {
        setLabel("Today Status");
      }

      const attendanceRes = await fetch(ATTENDANCE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const attendanceData = await attendanceRes.json();

   
      const leaveRes = await fetch(LEAVE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const leaveData = await leaveRes.json();

      const today = new Date().toISOString().split("T")[0];

      
      const approvedLeaveToday = leaveData.data?.find(
        (leave) =>
          leave.status === "Approved" &&
          today >= leave.startDate &&
          today <= leave.endDate
      );

      if (approvedLeaveToday) {
        setStatus(approvedLeaveToday.typeOfLeave || "Leave");
      } 
      else if (attendanceData.status) {
      
        if (
          attendanceData.source === "Correction" &&
          attendanceData.status === "Present"
        ) {
          setStatus("Present (via Correction)");
        } else {
          setStatus(attendanceData.status);
        }
      } 
      else {
   
        if (hours > 9 || (hours === 9 && minutes >= 20)) {
          setStatus("Absent");
        } else {
          setStatus("No Status Yet");
        }
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
    const interval = setInterval(fetchStatus, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="student-dashboard">
      <StudentDashboardSidebar />

      <div className="student-dashboard-content">
        <h2>Student Dashboard</h2>

        <div className="student-status-card student-glass-effect">
          <h3>{label}</h3>
          <p
            className={`student-status-text ${status
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {loading ? "Loading..." : status}
          </p>
        </div>

        <div className="student-note">
          <small>
            Status auto-updates every minute based on QR Scan, Kitchen Turn,
            Leave, or Approved Correction. After 9:20 AM, if no action — status
            becomes Absent.
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
