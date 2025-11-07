import React, { useState, useEffect } from "react";

const AdminQRGenerator = () => {
  const [qrImage, setQrImage] = useState("");
  const [status, setStatus] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTill, setValidTill] = useState("");
  const [loading, setLoading] = useState(false);

  // 🟢 Generate New QR
  const generateNewQR = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/admin/qr/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setQrImage(data.qrImage);
        setValidFrom(data.validFrom);
        setValidTill(data.validTill);
        setStatus(data.status === "active" ? "Active ✅" : "Expired ❌");
      } else {
        setStatus(data.message || "Failed to generate QR ❌");
      }
    } catch (error) {
      console.error("Generate QR Error:", error);
      setStatus("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🕒 Get Current QR (auto-update every 30 seconds)
  const fetchCurrentQR = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/admin/qr/current",
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.qrImage) {
        setQrImage(data.qrImage);
        setValidFrom(data.validFrom);
        setValidTill(data.validTill);
        setStatus(data.status === "active" ? "Active ✅" : "Expired ❌");
      } else {
        setStatus("No QR found or expired ❌");
      }
    } catch (error) {
      console.error("Fetch Current QR Error:", error);
      setStatus("Error fetching QR ❌");
    }
  };

  // ⏰ Run automatically
  useEffect(() => {
    fetchCurrentQR();
    const interval = setInterval(fetchCurrentQR, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>🧾 Admin QR Generator</h1>

      <button
        onClick={generateNewQR}
        disabled={loading}
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Generating..." : "Generate New QR"}
      </button>

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#fff",
          display: "inline-block",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {qrImage ? (
          <>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                width: "220px",
                height: "220px",
                marginBottom: "10px",
              }}
            />
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: status.includes("Active") ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </p>
            <p>
              <strong>Valid From:</strong> {validFrom || "N/A"}
            </p>
            <p>
              <strong>Valid Till:</strong> {validTill || "N/A"}
            </p>
          </>
        ) : (
          <p>No QR generated yet ❌</p>
        )}
      </div>
    </div>
  );
};

export default AdminQRGenerator;



