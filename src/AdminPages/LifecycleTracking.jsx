import React, { useState } from "react";
import "./LifecycleTracking.css";

const LifecycleTracking = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ananya Sharma",
      email: "ananya@example.com",
      date: "2024-08-15",
      status: "Unverified",
    },
    {
      id: 2,
      name: "Rohan Verma",
      email: "rohanv@example.com",
      date: "2024-08-12",
      status: "Verified",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya.s@example.com",
      date: "2024-08-10",
      status: "Unverified",
    },
  ]);

  const [activeTab, setActiveTab] = useState("Admissions");
  const [searchTerm, setSearchTerm] = useState("");

  const handleVerify = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: "Verified" } : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lifecycle-tracking">
      <h2>Lifecycle Tracking</h2>

      <div className="tabs">
        {["Admissions", "Placements", "Dropouts"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="dropdowns">
          <select>
            <option>Filter by Month</option>
            <option>August 2024</option>
            <option>September 2024</option>
          </select>
          <select>
            <option>Filter by Date</option>
            <option>10 Aug 2024</option>
            <option>12 Aug 2024</option>
          </select>
        </div>
      </div>

      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <div>
                  <h4>{student.name}</h4>
                  <small>{student.email}</small>
                  <p>Date: {student.date}</p>
                </div>
                <span
                  className={`status-tag ${
                    student.status === "Verified" ? "verified" : "unverified"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              {student.status === "Unverified" ? (
                <button
                  className="verify-btn"
                  onClick={() => handleVerify(student.id)}
                >
                  Verify
                </button>
              ) : (
                <button className="verified-btn">
                  ✅ Verified
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h4>No Records Found</h4>
            <p>
              Try adjusting your search or filter criteria to find what you’re
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifecycleTracking;
