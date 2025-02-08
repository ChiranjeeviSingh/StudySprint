import React, { useState } from "react";
import "../styles/JobApplicationForm.css"; // Import styles

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resume: null,
    phoneNumber: "",
    gender: "",
    veteranStatus: "",
  });

  // Handle input changes
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
    console.log("Form Submitted:", formData);
    alert("Job Application Submitted Successfully ✅");
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

        {/* Phone Number */}
        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        {/* Resume Upload */}
        <label>Resume (PDF/DOCX):</label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />

        {/* Gender */}
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Veteran Status */}
        <label>Veteran Status:</label>
        <select name="veteranStatus" value={formData.veteranStatus} onChange={handleChange} required>
          <option value="">Select Veteran Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
