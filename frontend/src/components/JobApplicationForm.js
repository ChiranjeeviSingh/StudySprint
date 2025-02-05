import React, { useState } from "react";
import "../styles/JobApplicationForm.css"; // Import the CSS file

const JobApplicationForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resume: null,
    phoneNumber: "",
    gender: "",
    veteran: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully! ✅");
  };

  return (
    <div className="form-container">
      <h2>Job Application</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        {/* Last Name */}
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        {/* Email */}
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        {/* Resume Upload */}
        <label>Resume (PDF/DOCX):</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />

        {/* Phone Number */}
        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        {/* Gender */}
        <label>Gender:</label>
        <div className="radio-group">
          <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
        </div>

        {/* Veteran Status */}
        <label>Are you a veteran?</label>
        <div className="radio-group">
          <input type="radio" name="veteran" value="Yes" onChange={handleChange} required /> Yes
          <input type="radio" name="veteran" value="No" onChange={handleChange} required /> No
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
