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

  
  const markAttendance = async (qrData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (qrData === "VALID_QR_CODE") {
          resolve({ success: true, status: "Present" });
        } else {
          reject({ success: false, message: "Invalid or Expired QR" });
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        setLoading(true);
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (devices.length === 0) {
          alert("❌ No camera found!");
          setLoading(false);
          return;
        }

        const selectedDeviceId = devices[0].deviceId; 
        setLoading(false);

        await codeReader.decodeFromVideoDevice(selectedDeviceId, "video", async (res, err) => {
          if (res) {
            const scannedData = res.getText();
            setResult(scannedData);

            try {
              const response = await markAttendance(scannedData);
              if (response.success) {
                setMessage("✅ Attendance Marked Successfully!");
                setStatus("success");
              }
            } catch (error) {
              setMessage("❌ " + error.message);
              setStatus("error");
            }

            codeReader.reset();
          }

          if (err && !(err.name === "NotFoundException")) {
            console.error("QR error:", err);
          }
        });
      } catch (error) {
        console.error("Camera error:", error);
        setLoading(false);
        alert("Please allow camera permission and try again.");
      }
    };

    startScanner();

    return () => {
      try {
        codeReader.reset();
        const video = document.getElementById("video");
        if (video && video.srcObject) {
          video.srcObject.getTracks().forEach((track) => track.stop());
        }
      } catch (e) {
        console.warn("Cleanup skipped:", e);
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
