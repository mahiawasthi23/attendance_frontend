import React from "react";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name} 👋</h2>
      <p>This is your student dashboard.</p>
    </div>
  );
}

export default StudentDashboard;
