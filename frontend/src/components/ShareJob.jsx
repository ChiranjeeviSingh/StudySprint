import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShareJob() {
  const navigate = useNavigate();

  // Mock job postings data (Replace with backend fetch later)
  const jobPostings = [
    {
      JobID: "JOB123",
      Info1: "New York, USA",
      Info2: "Software Engineer Role",
      Info3: "$120,000 per year",
      Info4: "5+ years experience required",
      Info5: "Remote Work Available",
      Info6: "Flexible work hours",
      Info7: "Health & wellness benefits",
      Info8: "Stock options available",
      Info9: "Visa sponsorship available",
      Info10: "Fast-paced work environment",
    },
  ];

  // Mock questionnaire data
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
  ];

  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);

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
    setExpanded(true); // Expand the card dynamically
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalSubmit(true); // Expand card a bit more
    alert("Job Application Submitted Successfully!");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-vector/vector-business-illustration-small-people-260nw-1022567779.jpg')",
      }}
    >
      {/* ✅ Dashboard Button Positioned at Top-Left */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 text-lg bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ⬅️ Dashboard
      </button>

      {/* ✅ Dynamic Expanding & Scrollable Card */}
      <div
        className={`bg-white bg-opacity-90 shadow-lg rounded-xl p-8 w-full max-w-3xl transition-all duration-500 ${
          finalSubmit ? "h-[700px]" : expanded ? "h-[550px]" : "h-[400px]"
        } overflow-y-auto`}
      >
        {/* ✅ Styled "Share Job" Heading to Match HireEasy */}
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide font-sans text-center mb-8">
          Share Job
        </h2>

        {/* Dropdowns for Job ID and Form ID */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-lg">
            Select Job ID:
          </label>
          <select
            value={selectedJobId}
            onChange={handleJobChange}
            className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Job ID --</option>
            {jobPostings.map((job) => (
              <option key={job.JobID} value={job.JobID}>
                {job.JobID}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2 text-lg">
            Select Form ID:
          </label>
          <select
            value={selectedFormId}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Form ID --</option>
            {questionnaires.map((form) => (
              <option key={form.FormID} value={form.FormID}>
                {form.FormID}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Green Button for "Generate Job Application" */}
        <button
          onClick={fetchJobAndFormData}
          className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
        >
          Generate Job Application
        </button>

        {/* ✅ Expanding Job Details and Questionnaire Section */}
        {expanded && jobDetails && questions && (
          <form onSubmit={handleSubmit} className="mt-6">
            <h3 className="text-2xl font-semibold">Job Details</h3>
            {Object.keys(jobDetails).map((key, index) => (
              <p key={index} className="text-lg">
                <strong>{key.replace("Info", "Detail")}:</strong>{" "}
                {jobDetails[key]}
              </p>
            ))}

            <h3 className="text-2xl font-semibold mt-6">Job Questionnaire</h3>
            {Object.keys(questions).map((key, index) => (
              <p key={index} className="text-lg">
                <strong>{key.replace("Question", "Q")}: </strong>
                {questions[key]}
              </p>
            ))}

            {/* ✅ Submit Button Expands the Card a Bit More */}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition mt-4"
            >
              Submit Job Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ShareJob;
