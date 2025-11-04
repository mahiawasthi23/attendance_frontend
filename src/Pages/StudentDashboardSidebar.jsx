import React from "react";
import { FaQrcode, FaUtensils, FaHistory } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineEdit,
  MdOutlineHome,
  MdOutlineTrackChanges,
} from "react-icons/md";
import "./StudentDashboardSidebar.css";
import { useNavigate } from "react-router-dom";

function StudentDashboardSidebar() {
  const navigate = useNavigate();

  return (
    <div className="student_sidebar">
      <h2 className="student_sidebar_logo">Student Panel</h2>
      <ul className="student_sidebar_menu">
        <li className="student_sidebar_item active" onClick={() => navigate("/student-dashboard")}>
          <MdDashboard className="student_sidebar_icon" />
          <span>Dashboard</span>
        </li>
        <li className="student_sidebar_item" onClick={() => navigate("/qr-scanner")}>
          <FaQrcode className="student_sidebar_icon" />
          <span>QR Scanner</span>
        </li>
        <li className="student_sidebar_item" onClick={() => navigate("/kitchen-turn")}>
          <FaUtensils className="student_sidebar_icon" />
          <span>Kitchen Turn</span>
        </li>
        <li className="student_sidebar_item"  onClick={() => navigate("/leave-form")}>
          <MdOutlineHome className="student_sidebar_icon" />
          <span>Leave Form</span>
        </li>
        <li className="student_sidebar_item" onClick={() => navigate("/correction-request")}>
          <MdOutlineEdit className="student_sidebar_icon" />
          <span>Correction Request</span>
        </li>
        <li className="student_sidebar_item" onClick={() => navigate("/student-tracking")}>
          <MdOutlineTrackChanges className="student_sidebar_icon" />
          <span>Student Tracking</span>
        </li>
        <li className="student_sidebar_item" onClick={() => navigate("/view-history")}>
          <FaHistory className="student_sidebar_icon" />
          <span>View History</span>
        </li>
      </ul>
    </div>
  );
}

export default StudentDashboardSidebar;
