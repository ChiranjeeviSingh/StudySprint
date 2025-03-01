import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ViewJobs() {
  const navigate = useNavigate();

  // Mock Job Data
  const mockJobs = [
    { jobId: "JOB123", jobLink: "https://company.com/apply/JOB123" },
    { jobId: "JOB456", jobLink: "https://company.com/apply/JOB456" },
    { jobId: "JOB789", jobLink: "https://company.com/apply/JOB789" },
    { jobId: "JOB101", jobLink: "https://company.com/apply/JOB101" },
  ];

  const [searchJobId, setSearchJobId] = useState("");

  // Filter jobs based on user input
  const filteredJobs = mockJobs.filter((job) =>
    job.jobId.toLowerCase().includes(searchJobId.toLowerCase())
  );

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

      <h2>View Jobs</h2>

      {/* Job Filter Input */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Job ID: </label>
        <input
          type="text"
          value={searchJobId}
          onChange={(e) => setSearchJobId(e.target.value)}
          placeholder="Enter Job ID..."
          style={{ padding: "8px", fontSize: "16px", width: "200px" }}
        />
      </div>

      {/* Job Table */}
      <table
        style={{
          width: "60%",
          margin: "auto",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Job ID
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Job Link
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.jobId}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {job.jobId}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <a
                    href={job.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.jobLink}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewJobs;