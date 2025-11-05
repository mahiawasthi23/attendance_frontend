import React, { useEffect, useState } from "react";
import "./MyCorrection.css";

const MyCorrections = () => {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMy = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://attendance-backend-3fjj.onrender.com/api/corrections/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed");
        setItems(data.data || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false); 
      }
    };
    fetchMy();
  }, []);

  return (
    <div className="my-corrections">
      <h2>My Correction Requests</h2>

      {loading && <p>Loading...</p>} 

      {err && <p className="error">{err}</p>}

      {!loading && items.length === 0 && <p>No requests yet.</p>}

      {!loading &&
        items.map((c) => (
          <div key={c._id} className="card">
            <p><strong>Date:</strong> {c.date}</p>
            <p><strong>Reason:</strong> {c.reason}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status ${c.status.toLowerCase()}`}
              >
                {c.status}
              </span>
            </p>
            {c.adminComment && (
              <p><strong>Note:</strong> {c.adminComment}</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default MyCorrections;
