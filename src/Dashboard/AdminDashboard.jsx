import React from "react";
import AdminDashboardSidebar from "../AdminPages/AdminDashboardSidebar";
// import "./AdminDashboard.css";


const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="admin-dashboard">
      <AdminDashboardSidebar />
      <div className="dashboard-content">
        <h2>Welcome Admin, {user?.name || "Admin"} 👋</h2>
        <p>This is your admin dashboard.</p>

        <div className="cards-container">
          <div className="card glass-effect">
            <h3>QR Generator</h3>
            <p>Generate and manage student QR codes.</p>
          </div>

          <div className="card glass-effect">
            <h3>Student Records</h3>
            <p>View and update student information.</p>
          </div>

          <div className="card glass-effect">
            <h3>Reports & End Flow</h3>
            <p>Access performance reports and workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
