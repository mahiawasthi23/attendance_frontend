// import React, { useState, useEffect } from "react";
// import "./QRGenerator.css";

// const AdminQRGenerator = () => {
//   const [qrImage, setQrImage] = useState("");
//   const [validTill, setValidTill] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [timeLeft, setTimeLeft] = useState(1200); 

//   const generateNewQR = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in again.");
//         return;
//       }

//       const res = await fetch(
//         "https://attendance-backend-3fjj.onrender.com/api/admin/qr/generate",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       console.log("QR API Response:", data);

//       if (res.ok && data.qrImage) {
//         setQrImage(data.qrImage);
//         setValidTill(data.validTill || "");
//         setTimeLeft(1200); 
//       } else {
//         setError(data.message || "Failed to generate QR code.");
//       }
//     } catch (err) {
//       console.error("Error generating QR:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     generateNewQR();
//   }, []);

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="admin-qr-generator">
//       <h2>📱 QR Code Generator</h2>

//       <div className="admin-qr-card admin-glass-effect">
//         {qrImage ? (
//           <img
//             src={qrImage}
//             alt="QR Code"
//             className="admin-qr-image"
//             onError={(e) =>
//               (e.target.src = "https://i.ibb.co/Z1n6pLw/qr-sample.png")
//             }
//           />
//         ) : (
//           <div className="admin-qr-placeholder">Loading QR...</div>
//         )}

//         <p className={`admin-status ${timeLeft > 0 ? "active" : "expired"}`}>
//           {timeLeft > 0 ? "Active" : "Expired"}
//         </p>

//         <div className="admin-timer">
//           <p>Expires in:</p>
//           <div className="admin-countdown">
//             <span>{String(minutes).padStart(2, "0")}</span> :
//             <span>{String(seconds).padStart(2, "0")}</span>
//           </div>
//           {validTill && <small>Valid till: {validTill}</small>}
//         </div>
//       </div>

//       {error && <p className="admin-error">{error}</p>}

//       <button
//         className="admin-generate-btn"
//         onClick={generateNewQR}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate New QR"}
//       </button>
//     </div>
//   );
// };

// export default AdminQRGenerator;


// import React, { useState, useEffect } from "react";

// const QRGenerator = () => {
//   const [qrImage, setQrImage] = useState(null);
//   const [validTill, setValidTill] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   // 🔹 Generate QR
//   const handleGenerateQR = async () => {
//     try {
//       setLoading(true);
//       setStatus("Generating new QR...");

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "https://attendance-backend-3fjj.onrender.com/api/admin/qr/generate",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setQrImage(data.qrImage);
//         setValidTill(data.validTill);
//         setStatus("QR Active ✅");
//       } else {
//         setStatus(data.message || "Failed to generate QR ❌");
//       }
//     } catch (error) {
//       console.error("QR Generate Error:", error);
//       setStatus("Server error while generating QR ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Fetch current QR
//   const fetchCurrentQR = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "https://attendance-backend-3fjj.onrender.com/api/admin/qr/current",
//         {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setStatus("QR Active ✅");
//         setValidTill(new Date(data.endAt).toLocaleTimeString());
//       } else {
//         setStatus("No active QR found or expired ❌");
//       }
//     } catch (error) {
//       console.error("Fetch QR Error:", error);
//       setStatus("Error fetching QR ❌");
//     }
//   };

//   // 🕒 Check every 30s
//   useEffect(() => {
//     fetchCurrentQR();
//     const interval = setInterval(fetchCurrentQR, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "30px",
//         backgroundColor: "#f9f9f9",
//         minHeight: "100vh",
//       }}
//     >
//       <h1 style={{ marginBottom: "20px" }}>🧾 QR Code Generator</h1>

//       <button
//         onClick={handleGenerateQR}
//         disabled={loading}
//         style={{
//           backgroundColor: "#4CAF50",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         {loading ? "Generating..." : "Generate New QR"}
//       </button>

//       <div style={{ marginTop: "40px" }}>
//         {qrImage ? (
//           <>
//             <img
//               src={qrImage}
//               alt="QR Code"
//               style={{
//                 width: "250px",
//                 height: "250px",
//                 marginBottom: "15px",
//               }}
//             />
//             <p>
//               <strong>Status:</strong> {status}
//             </p>
//             <p>
//               <strong>Valid Till:</strong> {validTill || "N/A"}
//             </p>
//           </>
//         ) : (
//           <p>No QR generated yet ❌</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QRGenerator;



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
