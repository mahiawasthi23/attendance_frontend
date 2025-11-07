
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

      // Fetch attendance, leaves and yesterday in parallel
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

      const attendanceData = await safeJson(attendanceRes);
      const leaveDataRaw = await safeJson(leaveRes);
      const yesterdayData = await safeJson(yesterdayRes);

      // Normalize leave array (backend may return { leaves: [...] } or { data: [...] })
      const leaves =
        Array.isArray(leaveDataRaw?.leaves) && leaveDataRaw.leaves.length
          ? leaveDataRaw.leaves
          : Array.isArray(leaveDataRaw?.data) && leaveDataRaw.data.length
          ? leaveDataRaw.data
          : Array.isArray(leaveDataRaw)
          ? leaveDataRaw
          : [];

      // 1) If student has an APPROVED leave covering today -> show leave (override)
      const approvedLeaveToday = leaves.find(
        (leave) =>
          leave &&
          (leave.status === "Approved" || (leave.status && leave.status.toLowerCase() === "approved")) &&
          leave.startDate &&
          leave.endDate &&
          today >= leave.startDate &&
          today <= leave.endDate
      );

      if (approvedLeaveToday) {
        setLabel("Today Status");
        // show the leave type (friendly)
        setStatus(`On ${approvedLeaveToday.typeOfLeave || "Leave"}`);
        setLoading(false);
        return;
      }

      // 2) Before 9:20 AM show Yesterday status
      if (hours < 9 || (hours === 9 && minutes < 20)) {
        setLabel("Yesterday Status");

        if (yesterdayData && typeof yesterdayData === "object" && yesterdayData.status) {
          setStatus(yesterdayData.status);
        } else {
          // if API returns { status: "No Status Yet" } or similar
          setStatus("No Data (Yesterday)");
        }
        setLoading(false);
        return;
      }

      // 3) After 9:20 AM show today's attendance (or Absent)
      setLabel("Today Status");

      if (attendanceData && typeof attendanceData === "object" && attendanceData.status) {
        // if source field exists (e.g., Correction), surface that
        if (attendanceData.source && attendanceData.source === "Correction" && attendanceData.status === "Present") {
          setStatus("Present (via Correction)");
        } else {
          setStatus(attendanceData.status);
        }
      } else {
        setStatus("Absent");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
      setStatus("Server Error");
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely parse JSON and avoid exceptions when non-JSON returned
  async function safeJson(res) {
    try {
      if (!res) return null;
      // some endpoints may return 204 or html error pages — handle gracefully
      const txt = await res.text();
      try {
        return txt ? JSON.parse(txt) : {};
      } catch {
        // maybe returning an object already or plain text
        return txt;
      }
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // refresh every minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="student-dashboard">
      <StudentDashboardSidebar />

      <div className="student-dashboard-content">
        <h2>Student Dashboard</h2>

        <div className="student-status-card student-glass-effect">
          <h3>{label}</h3>
          <p
            className={`student-status-text ${String(status)
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {loading ? "Loading..." : status}
          </p>
        </div>

        <div className="student-note">
          <small>
            ⏱️ Status auto-updates every minute based on QR Scan, Kitchen Turn,
            or Approved Leave. After 9:20 AM, if no action — status becomes{" "}
            <b>Absent</b>.
            <br />
            🌙 Between 12 AM–9:20 AM, dashboard shows your <b>Yesterday Status</b>. If you’re on approved leave today, it will always show your <b>Leave Type</b>.
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
