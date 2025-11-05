
import React from "react";
import { FaQrcode, FaUtensils, FaHistory } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineEdit,
  MdOutlineHome,
  MdOutlineTrackChanges,
   MdOutlineListAlt,
} from "react-icons/md";
import "./StudentDashboardSidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

function StudentDashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/student-dashboard" },
    { icon: <FaQrcode />, label: "QR Scanner", path: "/qr-scanner" },
    { icon: <FaUtensils />, label: "Kitchen Turn", path: "/kitchen-turn" },
    { icon: <MdOutlineHome />, label: "Leave Form", path: "/leave-form" },
     { icon: <MdOutlineListAlt />, label: "My Leaves", path: "/my-leaves" },
    { icon: <MdOutlineEdit />, label: "Correction Request", path: "/correction-request" },
    { icon: <MdOutlineTrackChanges />, label: "Student Tracking", path: "/student-tracking" },
    { icon: <FaHistory />, label: "View History", path: "/view-history" },
  ];

  return (
    <div className="student_sidebar">
      <h2 className="student_sidebar_logo">Student Panel</h2>

      <ul className="student_sidebar_menu">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`student_sidebar_item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="student_sidebar_icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboardSidebar;
