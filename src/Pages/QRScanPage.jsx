import React, { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./QRScanpage.css";

const QRScanPage = () => {
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isScanning, setIsScanning] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (devices.length === 0) {
          alert("❌ No camera found!");
          return;
        }

        const selectedDeviceId = devices[0].deviceId;

        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "video",
          async (res, err) => {
            if (res) {
              const text = res.getText();
              setResult(text);
              setIsScanning(false);
              console.log("✅ Scanned QR:", text);

           
              try {
                const response = await fetch("http://localhost:5000/api/attendance", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    studentId: "12345",
                    qrData: text,
                    timestamp: new Date(),
                  }),
                });

                if (response.ok) {
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 4000);
                } else {
                  throw new Error("Server error");
                }
              } catch (error) {
                console.error("Error saving attendance:", error);
                setShowError(true);
                setTimeout(() => setShowError(false), 4000);
              }
            }

            if (err && !(err.name === "NotFoundException")) {
              console.error("QR Scan Error:", err);
            }
          }
        );
      } catch (error) {
        console.error("Camera initialization error:", error);
        alert("Camera access failed. Please allow permission.");
      }
    };

    startScanner();

    return () => {
      try {
        setIsScanning(false);
        codeReader.stopContinuousDecode();
        const video = document.getElementById("video");
        if (video && video.srcObject) {
          video.srcObject.getTracks().forEach((track) => track.stop());
        }
      } catch (e) {
        console.warn("Camera cleanup skipped:", e);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = formatTime(timeLeft);

  return (
    <div className="Page-qrscanner-container">
      <div className="Page-qrscanner-card Page-glass-effect">
        <div className="Page-qrscanner-header">
          <button className="Page-back-btn" onClick={() => navigate(-1)}>
            <IoArrowBack size={22} />
          </button>
          <h3>QR Camera Active</h3>
        </div>

        <div className="Page-qrscanner-info">
          <h4>📷 Scan for Attendance</h4>
          <p className="Page-timer-label">QR valid till:</p>
          <div className="Page-countdown">
            <span>{hrs}</span> : <span>{mins}</span> : <span>{secs}</span>
          </div>
        </div>

        <div className="Page-scanner-box">
          <div className="Page-scanner-frame">
            <video
              id="video"
              className="Page-scanner-video"
              autoPlay
              muted
              playsInline
            ></video>
          </div>
          <p className="Page-scanner-hint">
            {isScanning
              ? "Place QR inside the frame to scan"
              : "✅ Scan completed!"}
          </p>
          <p className="Page-scanner-result">
            {result ? `✅ Scanned: ${result}` : "Scanning..."}
          </p>
        </div>
      </div>

      
      {showSuccess && (
        <div className="Page-popup-overlay success-popup">
          <div className="Page-popup-card">
            <div className="Page-checkmark">✅</div>
            <h2>Attendance Marked!</h2>
            <p>Your attendance for today has been recorded successfully.</p>
            <button
              className="Page-view-status-btn"
              onClick={() => navigate("/attendance-status")}
            >
              View Today’s Status
            </button>
            <small>This will close automatically</small>
          </div>
        </div>
      )}

      {showError && (
        <div className="Page-popup-overlay error-popup">
          <div className="Page-popup-card">
            <div className="Page-crossmark">❌</div>
            <h2>Failed to Mark Attendance</h2>
            <p>Please try again or contact your admin.</p>
            <small>This will close automatically</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanPage;


