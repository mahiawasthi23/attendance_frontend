import React, { useState } from "react";
import "./CorrectionRequests.css";

const CorrectionRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Raj Sharma",
      date: "2024-08-15",
      reason:
        "Had a doctor’s appointment in the morning and arrived late. Attached is the doctor's note as proof.",
      image: "https://i.ibb.co/Vw1ytPJ/user1.png",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      date: "2024-08-14",
      reason:
        "Technical issue with the biometric scanner. It failed to record my entry. The security guard can vouch for my presence.",
      image: "https://i.ibb.co/Vw1ytPJ/user1.png",
      status: "Pending",
    },
  ]);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  return (
    <div className="correction-requests">
      <h2>Correction Requests</h2>

      <div className="requests-list">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="user-info">
                <img src={req.image} alt={req.name} className="avatar" />
                <div className="user-details">
                  <h4>{req.name}</h4>
                  <small>Date: {req.date}</small>
                </div>
                <a href="#" className="evidence-link">
                  📎 Evidence
                </a>
              </div>

              <p className="reason">
                <strong>Reason:</strong> {req.reason}
              </p>

              {req.status === "Pending" ? (
                <div className="action-buttons">
                  <button
                    className="reject"
                    onClick={() => handleAction(req.id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="approve"
                    onClick={() => handleAction(req.id, "Approved")}
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
            <p>There are no pending correction requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectionRequests;
