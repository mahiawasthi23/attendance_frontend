import React, { useEffect, useState } from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [status, setStatus] = useState("Loading...");
  const [label, setLabel] = useState("Today Status");
  const [loading, setLoading] = useState(true);

  const ATTENDANCE_URL =
    "https://attendance-backend-3fjj.onrender.com/api/attendance/today";
  const YESTERDAY_URL =
    "https://attendance-backend-3fjj.onrender.com/api/attendance/yesterday";
  const LEAVE_URL =
    "https://attendance-backend-3fjj.onrender.com/api/leave/my-leaves";

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
      const today = now.toISOString().split("T")[0];

     
      const [attendanceRes, leaveRes, yesterdayRes] = await Promise.all([
        fetch(ATTENDANCE_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(LEAVE_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(YESTERDAY_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const attendanceData = await attendanceRes.json();
      const leaveData = await leaveRes.json();
      const yesterdayData = await yesterdayRes.json();

   
      const approvedLeaveToday = leaveData.data?.find(
        (leave) =>
          leave.status === "Approved" &&
          today >= leave.startDate &&
          today <= leave.endDate
      );

     
      if (approvedLeaveToday) {
        setLabel("Today Status");
        setStatus(`On ${approvedLeaveToday.typeOfLeave}`);
      }

  
      else if (hours < 9 || (hours === 9 && minutes < 20)) {
        setLabel("Yesterday Status");
        if (yesterdayData?.status) {
          setStatus(yesterdayData.status);
        } else {
          setStatus("No Data (Yesterday)");
        }
      }

    
      else {
        setLabel("Today Status");

        if (attendanceData?.status) {
          if (
            attendanceData.source === "Correction" &&
            attendanceData.status === "Present"
          ) {
            setStatus("Present (via Correction)");
          } else {
            setStatus(attendanceData.status);
          }
        } else {
          setStatus("Absent");
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
    const interval = setInterval(fetchStatus, 60000); 
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
            ⏱️ Status auto-updates every minute based on QR Scan, Kitchen Turn,
            or Approved Leave. After 9:20 AM, if no action — status becomes
            <b> Absent</b>.
            <br />
            🌙 Between 12 AM–9:20 AM, dashboard shows your <b>Yesterday
            Status</b>. If you’re on approved leave today, it will always show
            your <b>Leave Type</b>.
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
