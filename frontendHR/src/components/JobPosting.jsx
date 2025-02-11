import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function JobPosting() {
  const navigate = useNavigate();

  const initialState = {
    JobID: "",
    Info1: "",
    Info2: "",
    Info3: "",
    Info4: "",
    Info5: "",
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

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleRemove = (infoKey) => {
    setJobData({ ...jobData, [infoKey]: "none" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Created:", jobData);
    alert("Job Posted Successfully!");
    setFormSubmitted(true);
  };

  const handleNewJob = () => {
    setJobData(initialState);
    setFormSubmitted(false);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.jpg?s=612x612&w=0&k=20&c=nVCY302pin29eP1rN0eBGstQN3WF4YQTWvZ4TvAs21g=')",
      }}
    >
      {/* ✅ Dashboard Button in Top-Left */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 text-lg bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ⬅️ Dashboard
      </button>

      {/* ✅ Enlarged White Card for Readability with Scrollable Content */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-10 w-full max-w-2xl h-[600px] overflow-y-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 tracking-wide mb-8">
          Create Job Posting
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Job ID Field */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-lg">
              Job ID (Required):
            </label>
            <input
              type="text"
              name="JobID"
              value={jobData.JobID}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Job ID"
            />
          </div>

          {/* Job Fields (Info1 - Info5 always visible) */}
          {["Info1", "Info2", "Info3", "Info4", "Info5"].map((key, index) => (
            <div key={index} className="mb-4">
              <label className="block font-medium mb-1 text-lg">
                {placeholders[key]}:
              </label>
              <textarea
                name={key}
                value={jobData[key]}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
                placeholder={placeholders[key]}
              />
            </div>
          ))}

          {/* Info6 - Info10 with Remove Button */}
          {["Info6", "Info7", "Info8", "Info9", "Info10"].map((key, index) => (
            <div
              key={index}
              className={`mb-4 ${jobData[key] === "none" ? "hidden" : "block"}`}
            >
              <label className="block font-medium mb-1 text-lg">
                {placeholders[key]}:
              </label>
              <textarea
                name={key}
                value={jobData[key]}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
                placeholder={placeholders[key]}
              />
              <button
                type="button"
                onClick={() => handleRemove(key)}
                className="ml-2 mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ❌ Remove
              </button>
            </div>
          ))}

          {/* ✅ "Post Job" Button Changed to Green */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition"
          >
            Post Job
          </button>

          {formSubmitted && (
            <button
              type="button"
              onClick={handleNewJob}
              className="w-full py-3 mt-2 bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 transition"
            >
              New Job
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default JobPosting;
