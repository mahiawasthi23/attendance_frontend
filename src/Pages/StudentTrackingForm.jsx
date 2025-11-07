import React, { useState } from 'react';
import axios from 'axios';
import './StudentTrackingForm.css';

const StudentTrackingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    studentType: 'Admission',
    document: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = e => setFormData({ ...formData, document: e.target.files[0] });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setShowSuccessPopup(false);
    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append('fullName', formData.fullName);
      formPayload.append('email', formData.email);
      formPayload.append('date', formData.date);
      formPayload.append('studentType', formData.studentType);
      if (formData.document) formPayload.append('document', formData.document);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://attendance-backend-3fjj.onrender.com/api/tracking/add",
        formPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setShowSuccessPopup(true);
      setFormData({ fullName:'', email:'', date:'', studentType:'Admission', document:null });

      setTimeout(() => { setShowSuccessPopup(false); setMessage(''); }, 3000);

    } catch (err) {
      console.error(err.response || err);
      setMessage(err.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-tracking-form-container">
      <h2>Student Tracking Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <select name="studentType" value={formData.studentType} onChange={handleChange}>
          <option value="Admission">Admission</option>
          <option value="Placed">Placed</option>
          <option value="Dropout">Dropout</option>
        </select>
        <input type="file" name="document" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Submit"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentTrackingForm;
