import React from "react";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="dashboard">
      <h2>Welcome Admin, {user?.name} 👋</h2>
      <p>This is your admin dashboard.</p>
    </div>
  );
}

export default AdminDashboard;
