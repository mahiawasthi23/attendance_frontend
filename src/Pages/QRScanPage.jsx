import React, { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./QRScanpage.css";

const QRScanPage = () => {
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60); 
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        await codeReader.decodeFromVideoDevice(
          undefined,
          "video",
          (res, err) => {
            if (res) {
              setResult(res.getText());
              console.log("✅ Scanned QR:", res.getText());
            }
            if (err && !(err.name === "NotFoundException")) {
              console.error("QR Scan Error:", err);
            }
          }
        );
      } catch (error) {
        console.error("Camera initialization error:", error);
      }
    };

    const timer = setTimeout(startScanner, 500);


    return () => {
      clearTimeout(timer);
      try {
        codeReader.stopContinuousDecode();
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
      <div className="Page-qrscanner-card glass-effect">
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
            <video id="video" className="Page-scanner-video" autoPlay muted></video>
          </div>
          <p className="Page-scanner-hint">Place QR inside frame</p>
          <p className="Page-scanner-result">
            {result ? `✅ Scanned: ${result}` : "Scanning..."}
          </p>
          <a className="Page-cant-scan" href="#">
            Can’t Scan?
          </a>
        </div>
      </div>
    </div>
  );
};

export default QRScanPage;
