import React from "react";
import { useNavigate } from "react-router-dom";
import "./QRScannerInitial.css";

const QRScannerInitial = () => {
  const navigate = useNavigate();

  return (
    <div className="qr-initial-container">
      <div className="qr-initial-card glass-effect">
        <h2>Scan Your QR</h2>
        <p>Click below to start scanning your attendance QR.</p>
        <button className="scan-btn" onClick={() => navigate("/qr-scan")}>
          Start Scanning
        </button>
      </div>
    </div>
  );
};

export default QRScannerInitial;
