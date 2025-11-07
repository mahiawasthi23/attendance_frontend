import React, { useEffect, useState } from "react";
import "./CorrectionRequests.css";

const CorrectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/correction/admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.data) {
        setRequests(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://attendance-backend-3fjj.onrender.com/api/correction/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: action } : req
          )
        );
      } else {
        alert(data.message || "Failed to update correction status");
      }
    } catch (error) {
      console.error("Error updating correction:", error);
      alert("Server Error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading requests...</p>;

  return (
    <div className="correction-requests">
      <h2>Correction Requests</h2>

      <div className="requests-list">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req._id} className="request-card">
              <div className="user-info">
                <img
                  src={req.image || "https://i.ibb.co/Vw1ytPJ/user1.png"}
                  alt={req.name}
                  className="avatar"
                />
                <div className="user-details">
                  <h4>{req.name}</h4>
                  <small>Date: {req.date}</small>
                </div>
                {req.attachment && (
                  <a
                    href={req.attachment}
                    target="_blank"
                    rel="noreferrer"
                    className="evidence-link"
                  >
                    📎 Evidence
                  </a>
                )}
              </div>

              <p className="reason">
                <strong>Reason:</strong> {req.reason}
              </p>

              {req.status === "Pending" ? (
                <div className="action-buttons">
                  <button
                    className="reject"
                    onClick={() => handleAction(req._id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="approve"
                    onClick={() => handleAction(req._id, "Approved")}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <p
                  className={`status ${
                    req.status === "Approved" ? "approved" : "rejected"
                  }`}
                >
                  {req.status}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="check-icon">✅</div>
            <h4>All Caught Up!</h4>
            <p>No pending correction requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectionRequests;
