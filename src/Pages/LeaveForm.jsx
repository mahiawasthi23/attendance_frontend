import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaveForm.css";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    typeOfLeave: "",
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData && userData.name) {
      setName(userData.name);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://attendance-backend-3fjj.onrender.com/api/leave/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setFormData({ startDate: "", endDate: "", reason: "", typeOfLeave: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error applying leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-form-container">
      <h2>Student Leave Form</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} readOnly />
        </div>

        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type of Leave</label>
          <select
            name="typeOfLeave"
            value={formData.typeOfLeave}
            onChange={handleChange}
            required
          >
            <option value="">Select leave type</option>
            <option value="Exam Leave">Exam Leave</option>
            <option value="Health Issue">Health Issue</option>
            <option value="Interview Leave">Interview Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Period Leave">Period Leave</option>
            <option value="Special Occasion Leave">Special Occasion Leave</option>
            <option value="Documentation Leave">Documentation Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reason for Leave</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly explain your reason..."
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {message && <p className="response-message">{message}</p>}
      </form>
    </div>
  );
};

export default LeaveForm;
