import React, { useState } from "react";
import "./StudentRecords.css";

const StudentRecords = () => {
  const [filter, setFilter] = useState("Month");

  const attendanceData = [
    { name: "Anjali Sharma", date: "25 Oct 2023", status: "Present" },
    { name: "Rohan Verma", date: "25 Oct 2023", status: "Absent" },
    { name: "Priya Singh", date: "25 Oct 2023", status: "On Leave" },
    { name: "Sameer Khan", date: "25 Oct 2023", status: "Present" },
    { name: "Kavita Reddy", date: "25 Oct 2023", status: "Kitchen" },
  ];

  const totalPresent = attendanceData.filter(
    (s) => s.status === "Present"
  ).length;
  const totalAbsent = attendanceData.filter(
    (s) => s.status === "Absent"
  ).length;
  const inKitchen = attendanceData.filter(
    (s) => s.status === "Kitchen"
  ).length;
  const onLeave = attendanceData.filter(
    (s) => s.status === "On Leave"
  ).length;

  return (
    <div className="student-records">
      <h2>Student Records</h2>

      <div className="filter-tabs">
        {["Day", "Week", "Month", "Date Range"].map((tab) => (
          <button
            key={tab}
            className={filter === tab ? "active" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="summary-cards">
        <div className="card"><h4>Total Present</h4><p>{totalPresent}</p></div>
        <div className="card"><h4>Total Absent</h4><p>{totalAbsent}</p></div>
        <div className="card"><h4>In Kitchen</h4><p>{inKitchen}</p></div>
        <div className="card"><h4>On Leave</h4><p>{onLeave}</p></div>
      </div>

      <table className="records-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.date}</td>
              <td>
                <span className={`status ${student.status.toLowerCase().replace(" ", "-")}`}>
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="footer-text">
        Displaying records for {filter === "Month" ? "October 2023" : filter}.<br />
        Totals: {totalPresent} Present, {totalAbsent} Absent.
      </p>
    </div>
  );
};

export default StudentRecords;
