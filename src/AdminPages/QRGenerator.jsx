import React, { useState, useEffect } from "react";
import "./QRGenerator.css";

const AdminQRGenerator = () => {
  const [qrImage, setQrImage] = useState("");
  const [validTill, setValidTill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(1200); 

  const generateNewQR = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/admin/qr/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("QR API Response:", data);

      if (res.ok && data.qrImage) {
        setQrImage(data.qrImage);
        setValidTill(data.validTill || "");
        setTimeLeft(1200); 
      } else {
        setError(data.message || "Failed to generate QR code.");
      }
    } catch (err) {
      console.error("Error generating QR:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    generateNewQR();
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="admin-qr-generator">
      <h2>📱 QR Code Generator</h2>

      <div className="admin-qr-card admin-glass-effect">
        {qrImage ? (
          <img
            src={qrImage}
            alt="QR Code"
            className="admin-qr-image"
            onError={(e) =>
              (e.target.src = "https://i.ibb.co/Z1n6pLw/qr-sample.png")
            }
          />
        ) : (
          <div className="admin-qr-placeholder">Loading QR...</div>
        )}

        <p className={`admin-status ${timeLeft > 0 ? "active" : "expired"}`}>
          {timeLeft > 0 ? "Active" : "Expired"}
        </p>

        <div className="admin-timer">
          <p>Expires in:</p>
          <div className="admin-countdown">
            <span>{String(minutes).padStart(2, "0")}</span> :
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
          {validTill && <small>Valid till: {validTill}</small>}
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <button
        className="admin-generate-btn"
        onClick={generateNewQR}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate New QR"}
      </button>
    </div>
  );
};

export default AdminQRGenerator;
