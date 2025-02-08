import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function JobPosting() {
  const navigate = useNavigate(); // Hook for navigation

  // Initial form state
  const initialState = {
    JobID: "", // Separate Job ID
    Info1: "", // Job Location
    Info2: "", // Job Description
    Info3: "", // Salary
    Info4: "", // Experience Required
    Info5: "", // Additional Info
    Info6: "",
    Info7: "",
    Info8: "",
    Info9: "",
    Info10: "",
  };

  const placeholders = {
    Info1: "Enter Job Location",
    Info2: "Enter Job Description",
    Info3: "Enter Salary Details",
    Info4: "Enter Experience Required",
    Info5: "Additional Info",
    Info6: "Additional Info",
    Info7: "Additional Info",
    Info8: "Additional Info",
    Info9: "Additional Info",
    Info10: "Additional Info",
  };

  const [jobData, setJobData] = useState(initialState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Remove optional fields (set them to "none")
  const handleRemove = (infoKey) => {
    setJobData({ ...jobData, [infoKey]: "none" });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Created:", jobData);
    alert("Job Posted Successfully!");
    setFormSubmitted(true);
  };

  // Reset form for a new job
  const handleNewJob = () => {
    setJobData(initialState);
    setFormSubmitted(false);
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "20px", position: "relative" }}
    >
      {/* Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "5px 10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ⬅️ Dashboard
      </button>

      <h2>Create Job Posting</h2>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {/* Separate Job ID Field */}
        <div style={{ marginBottom: "10px" }}>
          <label>Job ID (Required): </label>
          <input
            type="text"
            name="JobID"
            value={jobData.JobID}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            placeholder="Enter Job ID"
          />
        </div>

        {/* Job Fields (Info1 - Info5 always visible) */}
        {["Info1", "Info2", "Info3", "Info4", "Info5"].map((key, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>{placeholders[key]}:</label>
            <textarea
              name={key}
              value={jobData[key]}
              onChange={handleChange}
              rows="2"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                resize: "none",
              }}
              placeholder={placeholders[key]}
            />
          </div>
        ))}

        {/* Info6 - Info10 with Remove Button */}
        {["Info6", "Info7", "Info8", "Info9", "Info10"].map((key, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: jobData[key] !== "none" ? "block" : "none",
            }}
          >
            <label>{placeholders[key]}:</label>
            <textarea
              name={key}
              value={jobData[key]}
              onChange={handleChange}
              rows="2"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                resize: "none",
              }}
              placeholder={placeholders[key]}
            />
            <button
              type="button"
              onClick={() => handleRemove(key)}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}

        {/* Submit and New Buttons */}
        <button
          type="submit"
          style={{ marginTop: "10px", cursor: "pointer", padding: "10px 15px" }}
        >
          Post Job
        </button>

        {formSubmitted && (
          <button
            type="button"
            onClick={handleNewJob}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              padding: "10px 15px",
            }}
          >
            New
          </button>
        )}
      </form>
    </div>
  );
}

export default JobPosting;
