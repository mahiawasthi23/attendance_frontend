import React, { useState } from "react";
import "./Reports.css";

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("pdf");
  const [status, setStatus] = useState(""); // success / error / none

  const handleGenerate = () => {
    if (!reportType || !startDate || !endDate) {
      setStatus("error");
      return;
    }

    // Simulate generating report
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <div className="report-container">
      <h2>Generate & Download Reports</h2>

      {/* Report Criteria */}
      <div className="report-section">
        <h4>Select Report Criteria</h4>

        <label>Report Type</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="">Select a report type</option>
          <option value="attendance">Attendance Report</option>
          <option value="student">Student Report</option>
          <option value="kitchen">Kitchen Report</option>
        </select>

        <label>Select Date Range</label>
        <div className="date-inputs">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <label>Choose Format</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={format === "pdf"}
              onChange={() => setFormat("pdf")}
            />{" "}
            PDF
          </label>
          <label>
            <input
              type="radio"
              checked={format === "csv"}
              onChange={() => setFormat("csv")}
            />{" "}
            CSV
          </label>
        </div>

        <button onClick={handleGenerate} className="generate-btn">
          Generate Report
        </button>
      </div>

      {/* Report Status */}
      {status === "success" && (
        <div className="report-success">
          <p>✅ Report generated successfully.</p>
          <a href="#" download>
            Download: Attendance_Report.{format}
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="report-error">
          <p>❌ Could not generate the report. Please try again.</p>
          <button onClick={handleGenerate} className="try-again-btn">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;
