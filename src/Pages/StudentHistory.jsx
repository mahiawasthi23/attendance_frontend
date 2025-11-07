import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCheck,
  FaUtensils,
  FaRegCalendarTimes,
  FaRegCalendarAlt,
} from "react-icons/fa";
import "./StudentHistory.css";

const StudentHistory = ({ studentId }) => {
  const [data, setData] = useState({
    totalPresent: 0,
    totalLeaves: 0,
    totalKitchen: 0,
    totalAbsent: 0,
  });
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dates, setDates] = useState({
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchHistory();
  }, [filter, dates]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/student/${studentId}/history`,
        {
          params: {
            startDate: dates.startDate,
            endDate: dates.endDate,
            filter,
          },
        }
      );
      setData({
        totalPresent: res.data.totalPresent,
        totalLeaves: res.data.totalLeaves,
        totalKitchen: res.data.totalKitchen,
        totalAbsent: res.data.totalAbsent,
      });
      setRecords(res.data.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-history">
      <h3 className="title">My History</h3>

      <div className="summary-grid">
        <div className="card">
          <FaUserCheck size={22} />
          <p>Total Present</p>
          <h2>{data.totalPresent}</h2>
        </div>
        <div className="card">
          <FaRegCalendarAlt size={22} />
          <p>Total Leaves</p>
          <h2>{data.totalLeaves}</h2>
        </div>
        <div className="card">
          <FaUtensils size={22} />
          <p>Kitchen Turns</p>
          <h2>{data.totalKitchen}</h2>
        </div>
        <div className="card">
          <FaRegCalendarTimes size={22} />
          <p>Total Absent</p>
          <h2>{data.totalAbsent}</h2>
        </div>
      </div>

      <div className="filters">
        <div className="date-inputs">
          <input
            type="date"
            value={dates.startDate}
            onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
          />
          <input
            type="date"
            value={dates.endDate}
            onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
          />
        </div>

        <div className="filter-buttons">
          {["All", "Leaves", "Kitchen", "Absent"].map((btn) => (
            <button
              key={btn}
              className={filter === btn ? "active" : ""}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="list">
        <div className="list-header">
          <span>From</span>
          <span>To</span>
          <span>Leave Type</span>
          <span>Days</span>
        </div>

        {loading ? (
          <p className="loading">Loading data...</p>
        ) : records.length === 0 ? (
          <p className="no-data">No records found.</p>
        ) : (
          records.map((rec) => (
            <div key={rec._id} className="list-row">
              <span>{new Date(rec.from).toLocaleDateString()}</span>
              <span>{new Date(rec.to).toLocaleDateString()}</span>
              <span>{rec.leaveType || rec.status}</span>
              <span>{rec.days}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentHistory;
