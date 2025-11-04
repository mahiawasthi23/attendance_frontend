import React, { useState } from "react";
import "./LeaveRequests.css";

const LeaveRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState("");

  const leaveRequests = [
    {
      id: 1,
      name: "Ananya Sharma",
      reason: "Family trip to the mountains for the holidays.",
      status: "Pending",
      date: "02 Nov 2023",
      image: "https://i.ibb.co/Vw1ytPJ/user1.png", // example avatar
    },
    {
      id: 2,
      name: "Rohan Verma",
      reason: "Medical leave for 2 days.",
      status: "Approved",
      date: "01 Nov 2023",
      image: "https://i.ibb.co/Vw1ytPJ/user1.png",
    },
  ];

  const handleAction = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setShowConfirm(true);
  };

  const confirmAction = () => {
    console.log(
      `${actionType} request for ${selectedRequest?.name}`
    );
    setShowConfirm(false);
  };

  return (
    <div className="leave-requests">
      <h2>Leave Requests</h2>

      <div className="tabs">
        <button className="active">Pending Requests</button>
        <button>All Requests</button>
      </div>

      <div className="requests-list">
        {leaveRequests.map((req) => (
          <div key={req.id} className="request-card">
            <div className="user-info">
              <img src={req.image} alt={req.name} className="user-avatar" />
              <div>
                <h4>{req.name}</h4>
                <small>{req.date}</small>
              </div>
              <span
                className={`status-badge ${req.status.toLowerCase()}`}
              >
                {req.status}
              </span>
            </div>
            <p className="reason">{req.reason}</p>

            {req.status === "Pending" && (
              <div className="action-buttons">
                <button
                  className="reject"
                  onClick={() => handleAction(req, "Reject")}
                >
                  Reject
                </button>
                <button
                  className="approve"
                  onClick={() => handleAction(req, "Approve")}
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to {actionType.toLowerCase()} this leave
              request?
            </p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm" onClick={confirmAction}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
