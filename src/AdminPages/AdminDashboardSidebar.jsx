import React from "react";
import { FaQrcode, FaUserGraduate, FaFileAlt, FaSyncAlt, FaChartLine, FaClipboardList, FaHome } from "react-icons/fa";
import "./AdminDashboardSidebar.css";

const AdminDashboardSidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">AJMF + Navgurukul</h3>
      <ul>
        <li><FaHome /> Dashboard</li>
        <li><FaQrcode /> QR Generator</li>
        <li><FaUserGraduate /> Student Records</li>
        <li><FaClipboardList /> Leave Requests</li>
        <li><FaSyncAlt /> Correction Requests</li>
        <li><FaChartLine /> Life Cycle Tracking</li>
        <li><FaFileAlt /> Reports & End Flow</li>
      </ul>
    </div>
  );
};

export default AdminDashboardSidebar;
