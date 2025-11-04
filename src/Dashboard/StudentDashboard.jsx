// import React, { useEffect, useState } from "react";
// import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
// import "./StudentDashboard.css";

// const StudentDashboard = () => {
//   const [status, setStatus] = useState("Loading...");
//   const [label, setLabel] = useState("Loading...");


//   const fetchAttendanceStatus = async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const now = new Date();
//         const hour = now.getHours();
//         const minute = now.getMinutes();

//         let todayStatus = "";
//         let statusLabel = "";

       
//         if (hour < 9) {
//           statusLabel = "Yesterday Status";
//           todayStatus = "Present"; 
//         } 
       
//         else if (hour === 9 && minute <= 20) {
//           statusLabel = "Today Status";
//           const random = Math.floor(Math.random() * 3);
//           if (random === 0) todayStatus = "Present";
//           else if (random === 1) todayStatus = "Kitchen Turn";
//           else todayStatus = "Leave";
//         } 
      
//         else {
//           statusLabel = "Today Status";
//           todayStatus = "Absent";
//         }

//         resolve({ label: statusLabel, today: todayStatus });
//       }, 800);
//     });
//   };


//   useEffect(() => {
//     const getData = async () => {
//       const res = await fetchAttendanceStatus();
//       setStatus(res.today);
//       setLabel(res.label);
//     };
//     getData();

//     const interval = setInterval(getData, 60000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="student-dashboard">
//       <StudentDashboardSidebar />

//       <div className="dashboard-content">
//         <h2>Student Dashboard</h2>

//         <div className="status-card glass-effect">
//           <h3>{label}</h3>
//           <p className={`status ${status.toLowerCase().replace(" ", "-")}`}>
//             {status}
//           </p>
//         </div>

//         <div className="note">
//           <small>
//             ⏱️ Status auto-changes based on real time (9:00 AM – 9:20 AM logic applied)
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;



import React, { useEffect, useState } from "react";
import StudentDashboardSidebar from "../Pages/StudentDashboardSidebar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [status, setStatus] = useState("Loading...");
  const [label, setLabel] = useState("Loading...");

  // 🔹 Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const fetchAttendanceStatus = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        let todayStatus = "";
        let statusLabel = "";

        // 🔹 Check if there's a Kitchen Turn form entry for today
        const savedData = JSON.parse(localStorage.getItem("kitchenTurnData")) || [];
        const todayData = savedData.find((entry) => entry.date === getTodayDate());

        if (todayData) {
          todayStatus = "Kitchen Turn";
          statusLabel = "Today Status";
        } else if (hour < 9) {
          statusLabel = "Yesterday Status";
          todayStatus = "Present";
        } else if (hour === 9 && minute <= 20) {
          statusLabel = "Today Status";
          todayStatus = "Present";
        } else {
          statusLabel = "Today Status";
          todayStatus = "Absent";
        }

        resolve({ label: statusLabel, today: todayStatus });
      }, 800);
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetchAttendanceStatus();
      setStatus(res.today);
      setLabel(res.label);
    };
    getData();

    // Auto-refresh every 1 minute
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="student-dashboard">
      <StudentDashboardSidebar />

      <div className="dashboard-content">
        <h2>Student Dashboard</h2>

        <div className="status-card glass-effect">
          <h3>{label}</h3>
          <p className={`status ${status.toLowerCase().replace(" ", "-")}`}>
            {status}
          </p>
        </div>

        <div className="note">
          <small>
            ⏱️ Status auto-updates based on real time (9:00 AM – 9:20 AM logic) or Kitchen Turn Form submission.
          </small>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
