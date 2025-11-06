import React, { useState, useEffect } from "react";
import "./KitchenTurnForm.css";

const KitchenTurnForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [popup, setPopup] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, []); 

   
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'email') {
            setFormData({ ...formData, [name]: value });
        }
    };


  const refreshFormData = () => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token"); 
    const today = new Date().toISOString().split("T")[0];

    const payload = { ...formData, date: today }; 

    if (!token || !formData.name || !formData.email) {
      setLoading(false);
      setPopup({ type: "error", message: "User data is missing. Please log in again." });
      return;
    }

    try {
      const response = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/kitchen/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPopup({
          type: "success",
          message: data.message || "✅ Kitchen turn marked successfully!",
        });
        refreshFormData(); 
      } else {
        setPopup({
          type: "error",
          message:
            data.message ||
            "⚠️ You might have already marked your kitchen turn for today.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setPopup({
        type: "error",
        message: "⚠️ Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setPopup({ type: "", message: "" });

  return (
    <div className="kitchen-form-container">
      <h2>Kitchen Turn Form</h2>
      <form className="kitchen-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly 
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} 
            required
          />
        </label>
        
        <button type="submit" disabled={loading || !formData.name}>
          {loading ? "Submitting..." : "Mark Kitchen Turn"}
        </button>
      </form>

      {popup.message && (
        <div
          className={`popup-box ${
            popup.type === "success" ? "success" : "error"
          }`}
        >
          <div className="popup-content">
            <span className="icon">
              {popup.type === "success" ? "✔" : "⚠️"}
            </span>
            <h3>{popup.type === "success" ? "Success!" : "Notice"}</h3>
            <p>{popup.message}</p>
            <button onClick={closePopup}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenTurnForm;