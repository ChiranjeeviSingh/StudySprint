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
    },
    {
      JobID: "JOB456",
      Info1: "San Francisco, USA",
      Info2: "Data Scientist Role",
      Info3: "$135,000 per year",
      Info4: "3+ years experience required",
      Info5: "Hybrid Work Model",
    },
  ];

  // Updated mock questionnaire data with TWO FORMS
  const questionnaires = [
    {
      FormID: "FORM001",
      Questions: [
        {
          id: "Q_Gender",
          text: "What is your gender?",
          type: "radio",
          options: ["Male", "Female", "Other"],
        },
        {
          id: "Q_Education",
          text: "Education Level",
          type: "text",
          options: [],
        },
        {
          id: "Q_Skills",
          text: "Which programming languages do you know?",
          type: "checkbox",
          options: ["JavaScript", "Python", "C++"],
        },
        {
          id: "Q_Experience",
          text: "Work Experience (Years)",
          type: "text",
          options: [],
        },
        {
          id: "Q_Resume",
          text: "Upload your resume",
          type: "file",
          options: [],
        },
        {
          id: "Q6",
          text: "What is your expected salary?",
          type: "text",
          options: [],
        },
      ],
    },
    {
      FormID: "FORM002",
      Questions: [
        {
          id: "Q_Gender",
          text: "What is your gender?",
          type: "radio",
          options: ["Male", "Female", "Other"],
        },
        {
          id: "Q_Certification",
          text: "List any certifications",
          type: "text",
          options: [],
        },
        {
          id: "Q_Languages",
          text: "Which languages do you speak?",
          type: "checkbox",
          options: ["English", "Spanish", "French"],
        },
        {
          id: "Q_Experience",
          text: "Describe your work experience",
          type: "text",
          options: [],
        },
        {
          id: "Q_Portfolio",
          text: "Upload your portfolio",
          type: "file",
          options: [],
        },
        {
          id: "Q9",
          text: "Where do you see yourself in 5 years?",
          type: "text",
          options: [],
        },
      ],
    },
  ];

  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});

  // Handle dropdown selection
  const handleJobChange = (e) => setSelectedJobId(e.target.value);
  const handleFormChange = (e) => setSelectedFormId(e.target.value);

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

  // Handle input changes
  const handleAnswerChange = (e, question) => {
    const { type, value, checked, files } = e.target;
    const questionId = question.id;

    if (type === "checkbox") {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: checked
          ? [...(prev[questionId] || []), value]
          : prev[questionId].filter((item) => item !== value),
      }));
    } else if (type === "file") {
      setAnswers({ ...answers, [questionId]: files[0].name }); // Just storing file name
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  // Submit application (Now sending only JobID & FormID)
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSubmission = {
      JobID: selectedJobId,
      FormID: selectedFormId,
      Responses: answers, // Making sure we capture all responses correctly
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

          {/* Display all job details dynamically */}
          {Object.keys(jobDetails)
            .filter((key) => key !== "JobID") // Exclude JobID as it's already displayed
            .map((key, index) => (
              <p key={index}>
                <strong>{key.replace("Info", "Detail ")}:</strong>{" "}
                {jobDetails[key]}
              </p>
            ))}

          <h3>Job Questionnaire</h3>
          {questions.Questions.map((question) => (
            <div key={question.id} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{question.text}</strong>
              </p>

              {question.type === "text" && (
                <input
                  type="text"
                  onChange={(e) => handleAnswerChange(e, question)}
                />
              )}
              {question.type === "radio" &&
                question.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={question.id}
                      value={opt}
                      onChange={(e) => handleAnswerChange(e, question)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              {question.type === "checkbox" &&
                question.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="checkbox"
                      value={opt}
                      onChange={(e) => handleAnswerChange(e, question)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              {question.type === "file" && (
                <input
                  type="file"
                  onChange={(e) => handleAnswerChange(e, question)}
                />
              )}
            </div>
          ))}

          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
}

export default ShareJob;