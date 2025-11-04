import React, { useState } from "react";
import "./KitchenTurnForm.css";

const KitchenTurnForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  const [popup, setPopup] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/kitchen/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPopup({
          type: "success",
          message: data.message || "✅ Kitchen turn marked successfully!",
        });
        setFormData({ name: "", email: "", date: "" });
      } else {
        setPopup({
          type: "error",
          message:
            data.message ||
            "⚠️ You might have already filled this form for today.",
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
            onChange={handleChange}
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

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
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
