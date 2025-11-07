import React, { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./QRScanpage.css";

const QRScanPage = () => {
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleMarkAttendance = async (qrData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/attendance/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qrCode: qrData }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Attendance Marked Successfully!");
        setStatus("success");
      } else {
        setMessage("❌ " + data.message);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server error while marking attendance");
      setStatus("error");
    }
  };

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
        setLoading(false);

        await codeReader.decodeFromVideoDevice(selectedDeviceId, "video", async (res, err) => {
          if (res) {
            const scannedData = res.getText();
            setResult(scannedData);
            await handleMarkAttendance(scannedData);
            codeReader.reset();
          }

          if (err && !(err.name === "NotFoundException")) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error("Camera error:", error);
        alert("Please allow camera permission.");
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
      const video = document.getElementById("video");
      if (video?.srcObject) {
        video.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="Page-qrscanner-container">
      <div className="Page-qrscanner-card glass-effect">
        <div className="Page-qrscanner-header">
          <button className="Page-back-btn" onClick={() => navigate(-1)}>
            <IoArrowBack size={22} />
          </button>
          <h3>QR Scanner Active</h3>
        </div>

        <div className="Page-scanner-box">
          {loading ? (
            <div className="Page-loading">🎥 Initializing Camera...</div>
          ) : (
            <div className="Page-scanner-frame">
              <video id="video" className="Page-scanner-video" autoPlay muted playsInline></video>
            </div>
          )}
          <p className="Page-scanner-hint">
            {loading ? "Please wait..." : "Place QR inside frame"}
          </p>
          <p className="Page-scanner-result">
            {result ? `Scanned: ${result}` : "Scanning..."}
          </p>
        </div>

        {message && (
          <div className={`popup ${status === "success" ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanPage;
