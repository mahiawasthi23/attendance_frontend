import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaveRequests.css";

const GET_ALL_LEAVES_API = "https://attendance-backend-3fjj.onrender.com/api/leave/all";
const UPDATE_LEAVE_STATUS_API = "https://attendance-backend-3fjj.onrender.com/api/leave/update-status";

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(GET_ALL_LEAVES_API, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setLeaveRequests(res.data.leaves || []);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
        setMessage("Failed to load leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleLeaveAction = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${UPDATE_LEAVE_STATUS_API}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(res.data.message || `Leave ${status} successfully!`);

      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: status } : leave
        )
      );
    } catch (err) {
      console.error("Error updating leave:", err);
      setMessage("Failed to update leave status.");
    }
  };

  return (
    <div className="admin-leave-container">
      <h2>Admin Leave Management</h2>
      {message && <p className="response-message">{message}</p>}

      {loading ? (
        <p>Loading leave requests...</p>
      ) : leaveRequests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <>
          <h3>🕒 Pending Requests</h3>
          <div className="admin-leave-list">
            {leaveRequests
              .filter((leave) => leave.status === "Pending")
              .map((leave, index) => (
                <div key={index} className="admin-leave-card">
                  <p><strong>Name:</strong> {leave.name}</p>
                  {/* <p><strong>Email:</strong> {leave.studentEmail}</p> */}
                  <p><strong>Type of Leave:</strong> {leave.typeOfLeave}</p>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                  <p><strong>Date:</strong> {leave.startDate} → {leave.endDate}</p>
                  <p><strong>Status:</strong> <span className="status-pending">Pending</span></p>
                  <div className="admin-action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => handleLeaveAction(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleLeaveAction(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <h3>✅ Approved Leaves</h3>
          <div className="admin-leave-list">
            {leaveRequests
              .filter((leave) => leave.status === "Approved")
              .map((leave, index) => (
                <div key={index} className="admin-leave-card approved">
                  <p><strong>Name:</strong> {leave.name}</p>
                  {/* <p><strong>Email:</strong> {leave.studentEmail}</p> */}
                  <p><strong>Type of Leave:</strong> {leave.typeOfLeave}</p>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                  <p><strong>Date:</strong> {leave.startDate} → {leave.endDate}</p>
                  <p><strong>Status:</strong> <span className="status-approved">Approved</span></p>
                </div>
              ))}
          </div>

         
          <h3>❌ Rejected Leaves</h3>
          <div className="admin-leave-list">
            {leaveRequests
              .filter((leave) => leave.status === "Rejected")
              .map((leave, index) => (
                <div key={index} className="admin-leave-card rejected">
                  <p><strong>Name:</strong> {leave.name}</p>
                  {/* <p><strong>Email:</strong> {leave.studentEmail}</p> */}
                  <p><strong>Type of Leave:</strong> {leave.typeOfLeave}</p>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                  <p><strong>Date:</strong> {leave.startDate} → {leave.endDate}</p>
                  <p><strong>Status:</strong> <span className="status-rejected">Rejected</span></p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLeaveRequests;
