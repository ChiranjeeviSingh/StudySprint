import React from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1394701218/photo/job-search-concept-find-your-career-woman-looking-at-online-website-by-laptop-computer-people.jpg?s=612x612&w=0&k=20&c=V32cT3dAoI7plQSnV-i7YxP43YvaoyA0jLS4729gNWM=')",
      }}
    >
      {/* ✅ Card Wrapper with Background Overlay */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-12 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome, HR!</h2>

        {/* ✅ Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/job-posting")}
            className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
          >
            Create Job Posting
          </button>

          <button
            onClick={() => navigate("/questionnaire")}
            className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
          >
            Create Questionnaire
          </button>

          <button
            onClick={() => navigate("/share-job")}
            className="w-full py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
          >
            Share Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
