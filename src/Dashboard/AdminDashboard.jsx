import React, { useEffect, useState } from "react";
import AdminDashboardSidebar from "../AdminPages/AdminDashboardSidebar";
import "./AdminDashboard.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const user = { name: "Admin" }; 

  const [stats, setStats] = useState({
    totalStudents: 100,
    presentCount: 70,
    absentCount: 15,
    leaveCount: 10,
    kitchenCount: 5,
  });

  useEffect(() => {
    const fakeData = {
      totalStudents: 100,
      presentCount: 70,
      absentCount: 15,
      leaveCount: 10,
      kitchenCount: 5,
    };
    setStats(fakeData);
  }, []);

  const pieData = {
    labels: ["Present", "Absent", "On Leave", "Kitchen Turn"],
    datasets: [
      {
        label: "Attendance Distribution",
        data: [
          stats.presentCount,
          stats.absentCount,
          stats.leaveCount,
          stats.kitchenCount,
        ],
        backgroundColor: ["#4CAF50", "#E74C3C", "#F1C40F", "#3498DB"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="admin-dashboard">
      <AdminDashboardSidebar />

      <div className="admin-dashboard-content">
        <h2>Welcome back, {user.name} 👋</h2>
        <p className="subtitle">Today’s Attendance Summary</p>

        <div className="stats-grid">
          
          <div className="stat-box total">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>

          <div className="stat-box present">
            <h3>{stats.presentCount}</h3>
            <p>Present</p>
          </div>
          <div className="stat-box absent">
            <h3>{stats.absentCount}</h3>
            <p>Absent</p>
          </div>
          <div className="stat-box leave">
            <h3>{stats.leaveCount}</h3>
            <p>On Leave</p>
          </div>
          <div className="stat-box kitchen">
            <h3>{stats.kitchenCount}</h3>
            <p>Kitchen Turn</p>
          </div>
          {/* <div className="stat-box total">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div> */}
        </div>

        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

