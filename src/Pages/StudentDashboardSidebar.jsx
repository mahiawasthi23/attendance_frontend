import React from "react";
import { FaQrcode, FaUtensils, FaHistory } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineEdit,
  MdOutlineHome,
  MdOutlineTrackChanges,
} from "react-icons/md";
import "./StudentDashboardSidebar.css";

function StudentDashboardSidebar() {
  return (
    <div className="student_sidebar">
      <h2 className="student_sidebar_logo">Student Panel</h2>
      <ul className="student_sidebar_menu">
        <li className="student_sidebar_item active">
          <MdDashboard className="student_sidebar_icon" />
          <span>Dashboard</span>
        </li>
        <li className="student_sidebar_item">
          <FaQrcode className="student_sidebar_icon" />
          <span>QR Scanner</span>
        </li>
        <li className="student_sidebar_item">
          <FaUtensils className="student_sidebar_icon" />
          <span>Kitchen Turn</span>
        </li>
        <li className="student_sidebar_item">
          <MdOutlineHome className="student_sidebar_icon" />
          <span>Leave Form</span>
        </li>
        <li className="student_sidebar_item">
          <MdOutlineEdit className="student_sidebar_icon" />
          <span>Correction Request</span>
        </li>
        <li className="student_sidebar_item">
          <MdOutlineTrackChanges className="student_sidebar_icon" />
          <span>Student Tracking</span>
        </li>
        <li className="student_sidebar_item">
          <FaHistory className="student_sidebar_icon" />
          <span>View History</span>
        </li>
      </ul>
    </div>
  );
}

export default StudentDashboardSidebar;
