// src/Pages/CorrectionForm.jsx
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./CorrectionForm.css";

const CorrectionForm = () => {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    // optionally prefill date with today
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://attendance-backend-3fjj.onrender.com/api/correction/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setMsg({ type: "success", text: data.message });
      setDate(""); setReason("");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Server Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="correction-form">
      <h2>Attendance Correction Request</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Reason</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Request"}</button>
      </form>

      {msg && (
        <div className={`msg ${msg.type === "success" ? "success" : "error"}`}>
          {msg.text}
        </div>
      )}

      <div className="view-my-corrections">
         <Link to="/my-corrections" className="view-btn">View My Corrections</Link>
      </div>
    </div>
  );
};

export default CorrectionForm;
