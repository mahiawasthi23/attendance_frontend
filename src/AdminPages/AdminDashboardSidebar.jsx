import React from "react";
import { useNavigate } from "react-router-dom";

import {
    FaQrcode,
    FaUserGraduate,
    FaFileAlt,
    FaSyncAlt,
    FaChartLine,
    FaClipboardList,
    FaHome,
} from "react-icons/fa";
import "./AdminDashboardSidebar.css";

const AdminDashboardSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">AJMF + Navgurukul</h3>
            <ul>

                <li onClick={() => navigate("/admin-dashboard")}>
                    <FaHome /> Dashboard
                </li>
                <li onClick={() => navigate("/admin/qr-generator")}>
                    <FaQrcode /> QR Generator
                </li>
                <li onClick={() => navigate("/admin/student-records")}>
                    <FaUserGraduate /> Student Records
                </li>
                <li onClick={() => navigate("/admin/leave-requests")}>
                    <FaClipboardList /> Leave Requests
                </li>
                <li onClick={() => navigate("/admin/correction-requests")}>
                    <FaSyncAlt /> Correction Requests
                </li>

                <li onClick={() => navigate("/admin/lifecycle-tracking")}>
                    <FaChartLine /> Life Cycle Tracking
                </li>
                <li onClick={() => navigate("/admin/reports-endflow")}>
                    <FaFileAlt /> Reports & End Flow
                </li>


            </ul>
        </div>
    );
};

export default AdminDashboardSidebar;
