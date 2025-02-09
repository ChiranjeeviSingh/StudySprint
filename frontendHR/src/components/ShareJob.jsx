import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShareJob() {
  const navigate = useNavigate(); // Hook for navigation

  // Mock job postings data (Replace with backend fetch later)
  const jobPostings = [
    {
      JobID: "JOB123",
      Info1: "New York, USA",
      Info2: "Software Engineer Role",
      Info3: "$120,000 per year",
      Info4: "5+ years experience required",
      Info5: "Remote Work Available",
      Info6: "Additional Info 1",
      Info7: "Additional Info 2",
      Info8: "Additional Info 3",
      Info9: "Additional Info 4",
      Info10: "Additional Info 5",
    },
    {
      JobID: "JOB456",
      Info1: "San Francisco, USA",
      Info2: "Data Scientist Role",
      Info3: "$135,000 per year",
      Info4: "3+ years experience required",
      Info5: "Hybrid Work Model",
      Info6: "Machine Learning focus",
      Info7: "Additional Info 2",
      Info8: "Additional Info 3",
      Info9: "Additional Info 4",
      Info10: "Additional Info 5",
    },
  ];

  // Mock questionnaire data (Replace with backend fetch later)
  const questionnaires = [
    {
      FormID: "FORM001",
      Question1: "Do you have experience with React?",
      Question2: "Are you familiar with Python?",
      Question3: "Have you worked with databases before?",
      Question4: "Do you have experience with cloud platforms?",
      Question5: "Are you comfortable with remote work?",
      Question6: "Do you have leadership experience?",
      Question7: "How do you handle tight deadlines?",
      Question8: "What is your preferred development environment?",
      Question9: "Are you available for full-time work?",
      Question10: "Do you have experience with agile methodologies?",
    },
    {
      FormID: "FORM002",
      Question1: "Do you have experience with SQL?",
      Question2: "Can you work in a team environment?",
      Question3: "Have you managed projects before?",
      Question4: "How do you approach problem-solving?",
      Question5: "Are you familiar with version control?",
      Question6: "Do you have experience with Kubernetes?",
      Question7: "Have you worked in a startup environment?",
      Question8: "How comfortable are you with automation?",
      Question9: "Are you open to relocation?",
      Question10: "What are your salary expectations?",
    },
  ];

  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({
    Answer1: "",
    Answer2: "",
    Answer3: "",
    Answer4: "",
    Answer5: "",
    Answer6: "",
    Answer7: "",
    Answer8: "",
    Answer9: "",
    Answer10: "",
  });

  // Handle dropdown selection
  const handleJobChange = (e) => {
    setSelectedJobId(e.target.value);
  };

  const handleFormChange = (e) => {
    setSelectedFormId(e.target.value);
  };

  // Fetch job and form data after selecting both IDs
  const fetchJobAndFormData = () => {
    if (!selectedJobId || !selectedFormId) {
      alert("Please select both a Job ID and a Form ID.");
      return;
    }

    const jobData = jobPostings.find((job) => job.JobID === selectedJobId);
    const questionData = questionnaires.find(
      (form) => form.FormID === selectedFormId
    );

    if (!jobData || !questionData) {
      alert("Invalid selection. Please try again.");
      return;
    }

    setJobDetails(jobData);
    setQuestions(questionData);
  };

  // Handle input changes for answers (kept for UI display)
  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // Submit application (Now sending only JobID & FormID)
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSubmission = {
      JobID: selectedJobId,
      FormID: selectedFormId,
    };
    console.log("Job Application Submitted:", finalSubmission);
    alert("Job Application Submitted Successfully!");
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

      <h2>Share Job</h2>

      {/* Dropdowns for Job ID and Form ID */}
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Select Job ID: </label>
          <select
            value={selectedJobId}
            onChange={handleJobChange}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          >
            <option value="">-- Select Job ID --</option>
            {jobPostings.map((job) => (
              <option key={job.JobID} value={job.JobID}>
                {job.JobID}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Select Form ID: </label>
          <select
            value={selectedFormId}
            onChange={handleFormChange}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          >
            <option value="">-- Select Form ID --</option>
            {questionnaires.map((form) => (
              <option key={form.FormID} value={form.FormID}>
                {form.FormID}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchJobAndFormData}
          style={{ cursor: "pointer", padding: "10px 15px", marginTop: "10px" }}
        >
          Generate Job Application
        </button>
      </div>

      {/* Display Job Details and Questionnaire */}
      {jobDetails && questions && (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "auto",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <h3>Job Details</h3>
          <p>
            <strong>Job ID:</strong> {jobDetails.JobID}
          </p>
          {Object.keys(jobDetails)
            .filter((key) => key !== "JobID")
            .map((key, index) => (
              <p key={index}>
                <strong>Info {index + 1}:</strong> {jobDetails[key]}
              </p>
            ))}

          <h3>Job Questionnaire</h3>
          {Object.keys(questions)
            .filter((key) => key !== "FormID")
            .map((key, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>Question {index + 1}:</strong> {questions[key]}
                </p>
                <textarea
                  name={`Answer${index + 1}`}
                  value={answers[`Answer${index + 1}`]}
                  onChange={handleAnswerChange}
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    resize: "none",
                  }}
                />
              </div>
            ))}

          <button
            type="submit"
            style={{
              marginTop: "10px",
              cursor: "pointer",
              padding: "10px 15px",
            }}
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}

export default ShareJob;
