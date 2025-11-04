import React from "react";
import "./QRScannerInitial.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const QRScannerInitial = () => {
  const navigate = useNavigate();

  const handleStartCamera = () => {
    navigate("/qr-scan-page");
  };

  return (
    <div className="Initial-qrscanner-container">
      <div className="Initial-qrscanner-card">
        <div className="Initial-qrscanner-header">
          <button className="Initial-back-btn" onClick={() => navigate(-1)}>
            <IoArrowBack size={22} />
          </button>
          <h3>Mark Attendance</h3>
        </div>

        <p className="Initial-qrscanner-date">
          Date: {new Date().toLocaleDateString("en-GB")}
        </p>

        <div className="Initial-qrscanner-box">
          <div className="Initial-qr-icon">📷</div>
          <h4>Scan today's QR to mark attendance</h4>
          <p>
            Point your camera at the QR code displayed to mark your attendance
            for the day.
          </p>

          <button className="Initial-start-camera-btn" onClick={handleStartCamera}>
            Start Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerInitial;
