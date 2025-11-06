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

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowSuccessPopup(false); 
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append('fullName', formData.fullName);
    formPayload.append('email', formData.email);
    formPayload.append('date', formData.date);
    formPayload.append('studentType', formData.studentType);
    
    if (formData.document) {
        formPayload.append('document', formData.document); 
    }

    try {
      const token = localStorage.getItem("token"); 
      
      const res = await axios.post(
        "https://attendance-backend-3fjj.onrender.com/api/tracking/add", 
        formPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

     
      const successMsg = res.data.message || 'Tracking data submitted successfully!';
      setMessage(successMsg);
      setShowSuccessPopup(true); 
    
      setTimeout(() => {
        setShowSuccessPopup(false);
        setMessage('');
      }, 3000); 

      
      setFormData({
        fullName: '',
        email: '',
        date: '',
        studentType: 'Admission',
        document: null,
      });

    } catch (err) {
      console.error('Error submitting tracking data:', err);
      setMessage(err.response?.data?.message || 'Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-tracking-form-container">
      
      <div className="student-tracking-header">
        <span className="student-tracking-back-arrow" onClick={() => window.history.back()}>&larr;</span>
        <h2>Student Tracking Form</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="student-tracking-form">
        
        
        <div className="student-tracking-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

       
        <div className="student-tracking-form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

      
        <div className="student-tracking-form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="student-tracking-form-group">
          <label>Student Type</label>
          <div className="student-tracking-type-buttons">
            {['Admission', 'Placed', 'Dropout'].map((type) => (
              <button
                key={type}
                type="button"
                className={`student-tracking-type-btn ${formData.studentType === type ? 'active' : ''}`}
                onClick={() => setFormData({...formData, studentType: type})}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

       
        <div className="student-tracking-form-group student-tracking-upload-area">
          <label>Upload Document</label>
          <div className="student-tracking-drop-zone">
            <input
              type="file"
              name="document"
              id="document-upload"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="document-upload" className="student-tracking-custom-file-upload">
              <p>☁️</p> 
              <p>Click to upload or drag and drop</p>
              <small>e.g., Offer Letter, ID Card</small>
              {formData.document && <p className="student-tracking-file-name">**File Selected:** {formData.document.name}</p>}
            </label>
          </div>
        </div>
        
        
        <button type="submit" className="student-tracking-submit-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Submit for Verification'}
        </button>

        
        {message && !showSuccessPopup && 
            <p className={`student-tracking-response-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>
        }

      </form>

      
      {showSuccessPopup && (
        <div className="student-tracking-success-popup-overlay">
          <div className="student-tracking-success-popup-box">
            <h3>✅ Success!</h3>
            <p>{message}</p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTrackingForm;