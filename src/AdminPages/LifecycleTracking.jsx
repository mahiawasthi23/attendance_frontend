// import React, { useState } from "react";
// import "./LifecycleTracking.css";

// const LifecycleTracking = () => {
//   const [students, setStudents] = useState([
//     {
//       id: 1,
//       name: "Ananya Sharma",
//       email: "ananya@example.com",
//       date: "2024-08-15",
//       status: "Unverified",
//     },
//     {
//       id: 2,
//       name: "Rohan Verma",
//       email: "rohanv@example.com",
//       date: "2024-08-12",
//       status: "Verified",
//     },
//     {
//       id: 3,
//       name: "Priya Singh",
//       email: "priya.s@example.com",
//       date: "2024-08-10",
//       status: "Unverified",
//     },
//   ]);

//   const [activeTab, setActiveTab] = useState("Admissions");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleVerify = (id) => {
//     setStudents((prev) =>
//       prev.map((student) =>
//         student.id === id ? { ...student, status: "Verified" } : student
//       )
//     );
//   };

//   const filteredStudents = students.filter((student) => {
//     const matchSearch = student.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const studentDate = new Date(student.date);
//     const afterStart = startDate ? studentDate >= new Date(startDate) : true;
//     const beforeEnd = endDate ? studentDate <= new Date(endDate) : true;

//     return matchSearch && afterStart && beforeEnd;
//   });

//   return (
//     <div className="admin-lifecycle-tracking">
//       <h2>Lifecycle Tracking</h2>

//       <div className="admin-tabs">
//         {["Admissions", "Placements", "Dropouts"].map((tab) => (
//           <button
//             key={tab}
//             className={`admin-tab-btn ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="admin-filters">
//         <input
//           type="text"
//           placeholder="Search by Name or Email"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="admin-date-range-inline">
//           <div className="admin-date-label">Filter by Date Range:</div>
//           <div className="admin-date-inputs">
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <span>to</span>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="admin-student-list">
//         {filteredStudents.length > 0 ? (
//           filteredStudents.map((student) => (
//             <div key={student.id} className="admin-student-card">
//               <div className="admin-student-info">
//                 <div>
//                   <h4>{student.name}</h4>
//                   <small>{student.email}</small>
//                   <p>Date: {student.date}</p>
//                 </div>
//                 <span
//                   className={`admin-status-tag ${
//                     student.status === "Verified" ? "verified" : "unverified"
//                   }`}
//                 >
//                   {student.status}
//                 </span>
//               </div>

//               {student.status === "Unverified" ? (
//                 <button
//                   className="admin-verify-btn"
//                   onClick={() => handleVerify(student.id)}
//                 >
//                   Verify
//                 </button>
//               ) : (
//                 <button className="admin-verified-btn">✅ Verified</button>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="admin-empty-state">
//             <div className="admin-icon">🔍</div>
//             <h4>No Records Found</h4>
//             <p>
//               Try adjusting your search or date range to find what you’re
//               looking for.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LifecycleTracking;


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
  const [selectedDate, setSelectedDate] = useState(""); // ✅ single date

  // ✅ Verify function
  const handleVerify = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: "Verified" } : student
      )
    );
  };

  // ✅ Filter by search + single date
  const filteredStudents = students.filter((student) => {
    const matchSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDate = selectedDate ? student.date === selectedDate : true;
    return matchSearch && matchDate;
  });

  return (
    <div className="admin-lifecycle-tracking">
      <h2>Lifecycle Tracking</h2>

      {/* Tabs */}
      <div className="admin-tabs">
        {["Admissions", "Placements", "Dropouts"].map((tab) => (
          <button
            key={tab}
            className={`admin-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* ✅ Single Date Filter */}
        <div className="admin-date-range-inline">
          <div className="admin-date-label">Filter by Date:</div>
          <div className="admin-date-inputs">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="admin-student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="admin-student-card">
              <div className="admin-student-info">
                <div>
                  <h4>{student.name}</h4>
                  <small>{student.email}</small>
                  <p>Date: {student.date}</p>
                </div>
                <span
                  className={`admin-status-tag ${
                    student.status === "Verified" ? "verified" : "unverified"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              {student.status === "Unverified" ? (
                <button
                  className="admin-verify-btn"
                  onClick={() => handleVerify(student.id)}
                >
                  Verify
                </button>
              ) : (
                <button className="admin-verified-btn">✅ Verified</button>
              )}
            </div>
          ))
        ) : (
          <div className="admin-empty-state">
            <div className="admin-icon">🔍</div>
            <h4>No Records Found</h4>
            <p>
              Try adjusting your search or date filter to find what you’re
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifecycleTracking;
