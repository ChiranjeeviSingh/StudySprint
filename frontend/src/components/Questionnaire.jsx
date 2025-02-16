import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Questionnaire() {
  const navigate = useNavigate(); // Hook for navigation

  // Initial form state
  const initialState = {
    FormID: "",
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
  };

  const [formData, setFormData] = useState(initialState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Questionnaire Submitted:", formData);
    alert("Questionnaire Created Successfully!");
    setFormSubmitted(true);
  };

  // Reset form for a new questionnaire
  const handleNewQuestionnaire = () => {
    setFormData(initialState);
    setFormSubmitted(false);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9iJTIwcG9ydGFsfGVufDB8fDB8fHww')",
      }}
    >
      {/* ✅ Dashboard Button Positioned at Top-Left */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 px-4 py-2 text-lg bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ⬅️ Dashboard
      </button>

      {/* ✅ Enlarged Card Layout for the Form */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-10 w-full max-w-2xl h-[700px] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Create a Questionnaire
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Form ID Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-lg">
              Form ID (Required):
            </label>
            <input
              type="text"
              name="FormID"
              value={formData.FormID}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Form ID"
            />
          </div>

          {/* Questions as Textareas */}
          {Object.keys(formData)
            .filter((key) => key !== "FormID")
            .map((key, index) => (
              <div key={index} className="mb-4">
                <label className="block font-medium mb-1 text-lg">{`Question ${
                  index + 1
                }:`}</label>
                <textarea
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-500 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
                  placeholder={formData[key]}
                />
              </div>
            ))}

          {/* Submit and New Buttons */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition"
          >
            Submit Questionnaire
          </button>

          {formSubmitted && (
            <button
              type="button"
              onClick={handleNewQuestionnaire}
              className="w-full py-3 mt-2 bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 transition"
            >
              New
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Questionnaire;
