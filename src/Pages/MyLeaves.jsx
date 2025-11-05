import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyLeaves.css";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://attendance-backend-3fjj.onrender.com/api/leave/my-leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.leaves || [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setLeaves(data);
      } catch (err) {
        console.error("Error fetching leaves:", err);
        setError("Failed to load leave data.");
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="myleaves-container">
      <h2>My Leave Applications</h2>

      {error && <p className="error">{error}</p>}

      {leaves.length === 0 ? (
        <p>No leave applications found.</p>
      ) : (
        <div className="leave-list">
          {leaves.map((leave, index) => (
            <div key={index} className="leave-card">
              <p><strong>Type:</strong> {leave.typeOfLeave}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
              <p><strong>From:</strong> {leave.startDate}</p>
              <p><strong>To:</strong> {leave.endDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    leave.status === "Approved"
                      ? "status-approved"
                      : leave.status === "Rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }
                >
                  {leave.status || "Pending"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLeaves;
