import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function JobApplications() {
  const navigate = useNavigate();

  // Mock job applications data (JobID -> Candidates -> Responses)
  const jobApplications = {
    JOB123: [
      {
        email: "john@example.com",
        name: "John Doe",
        responses: {
          Q_Gender: "Male",
          Q_Education: "Master's in Computer Science",
          Q_Skills: ["JavaScript", "Python"],
          Q_Experience: "5 years",
          Q_Resume: "john_resume.pdf",
          Q6: "120,000 per year",
        },
      },
      {
        email: "sarah@example.com",
        name: "Sarah Johnson",
        responses: {
          Q_Gender: "Female",
          Q_Education: "Bachelor's in Data Science",
          Q_Skills: ["Python", "SQL"],
          Q_Experience: "3 years",
          Q_Resume: "sarah_resume.pdf",
          Q6: "110,000 per year",
        },
      },
    ],
    JOB456: [
      {
        email: "mike@example.com",
        name: "Mike Smith",
        responses: {
          Q_Gender: "Male",
          Q_Education: "PhD in AI",
          Q_Skills: ["Python", "C++"],
          Q_Experience: "7 years",
          Q_Resume: "mike_resume.pdf",
          Q6: "150,000 per year",
        },
      },
    ],
  };

  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [minExperience, setMinExperience] = useState(0); // Experience filter state

  // Handle job selection
  const handleJobChange = (e) => {
    setSelectedJobId(e.target.value);
    setSelectedCandidate(null);
  };

  // Handle candidate selection
  const handleCandidateChange = (email) => {
    const candidate = jobApplications[selectedJobId].find(
      (c) => c.email === email
    );
    setSelectedCandidate(candidate);
  };

  // Handle experience filter selection
  const handleExperienceChange = (e) => {
    setMinExperience(Number(e.target.value));
    setSelectedCandidate(null); // Reset candidate selection
  };

  // Filter candidates based on selected experience
  const filteredCandidates =
    selectedJobId && jobApplications[selectedJobId]
      ? jobApplications[selectedJobId].filter((candidate) => {
          const experienceYears = parseInt(
            candidate.responses.Q_Experience.replace(/\D/g, ""), // Extract numbers from string
            10
          );
          return experienceYears >= minExperience;
        })
      : [];

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* ✅ Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 text-lg bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ⬅️ Dashboard
      </button>

      {/* ✅ Content Section (No Card, Just Structured Layout) */}
      <div className="flex-grow flex flex-col justify-center items-center mt-12 mb-20 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 tracking-wide mb-8">
        Job Applications
        </h2>

        {/* Job Selection */}
        <div className="w-full max-w-lg mb-6">
          <label className="block font-medium mb-2 text-lg">Select Job ID:</label>
          <select
            value={selectedJobId}
            onChange={handleJobChange}
            className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Select Job ID --</option>
            {Object.keys(jobApplications).map((jobId) => (
              <option key={jobId} value={jobId}>
                {jobId}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        {selectedJobId && (
          <div className="w-full max-w-lg mb-6">
            <label className="block font-medium mb-2 text-lg">
              Filter by Experience (years):
            </label>
            <select
              value={minExperience}
              onChange={handleExperienceChange}
              className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="0">All Candidates</option>
              <option value="2">Greater than 2 years</option>
              <option value="3">Greater than 3 years</option>
              <option value="5">Greater than 5 years</option>
            </select>
          </div>
        )}

        {/* Candidates List */}
        {selectedJobId && filteredCandidates.length > 0 ? (
          <div className="w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">Candidates:</h3>
            {filteredCandidates.map((candidate) => (
              <button
                key={candidate.email}
                onClick={() => handleCandidateChange(candidate.email)}
                className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition mb-3"
              >
                {candidate.name} ({candidate.email})
              </button>
            ))}
          </div>
        ) : selectedJobId ? (
          <p className="text-xl text-gray-500">No candidates match the selected experience criteria.</p>
        ) : null}

        {/* Candidate Details */}
        {selectedCandidate && (
          <div className="w-full max-w-lg mt-6">
            <h3 className="text-2xl font-semibold">Candidate Details:</h3>
            <p className="text-lg">
              <strong>Name:</strong> {selectedCandidate.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {selectedCandidate.email}
            </p>

            <h3 className="text-2xl font-semibold mt-4">Submitted Responses:</h3>
            {Object.entries(selectedCandidate.responses).map(([key, value]) => (
              <p key={key} className="text-lg">
                <strong>{key.replace("Q_", "").replace("_", " ")}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Footer Section (Properly Separated) */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold">HireEasy</h2>
            <p className="mt-3 text-gray-400">
              Streamlining the hiring process with job applications, 
              questionnaires, and AI-driven insights.
            </p>
          </div>

          {/* Office Information */}
          <div>
            <h3 className="text-xl font-bold mb-3">Office</h3>
            <p>456 Talent Hub,</p>
            <p>San Francisco, USA</p>
            <p>Email: support@hireeasy.com</p>
            <p>Phone: +1 987-654-3210</p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-3">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Post a Job</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          HireEasy © {new Date().getFullYear()} - All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default JobApplications;
