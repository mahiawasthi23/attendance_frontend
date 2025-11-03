import React from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="student_dashboard_wrapper">
      {/* Sidebar */}
      <StudentDashboardSidebar />

      {/* Main Dashboard Content */}
      <div className="student_dashboard_main">
        <div className="student_card">
          <h2 className="student_heading">Welcome, {user?.name} 👋</h2>
          <p className="student_text">This is your student dashboard.</p>
          <button className="student_button">Explore More</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
