import React, { useState, useEffect } from "react";
import "./QRGenerator.css";

const AdminQRGenerator = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="admin-qr-generator">
      <h2>QR Code Generator</h2>
      <div className="admin-qr-card admin-glass-effect">
        <img
          src="https://i.ibb.co/Z1n6pLw/qr-sample.png"
          alt="QR Code"
          className="admin-qr-image"
        />
        <p className="admin-status active">Active</p>
        <div className="admin-timer">
          <p>Expires in:</p>
          <div className="admin-countdown">
            <span>{String(minutes).padStart(2, "0")}</span> :
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
          <small>Valid from 09:00 AM to 09:20 AM</small>
        </div>
      </div>

      <button className="admin-generate-btn">Generate New QR</button>
    </div>
  );
};

export default AdminQRGenerator;
