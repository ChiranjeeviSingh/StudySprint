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

      <h2>Create a Questionnaire</h2>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {/* Form ID Input */}
        <div style={{ marginBottom: "10px" }}>
          <label>Form ID (Required): </label>
          <input
            type="text"
            name="FormID"
            value={formData.FormID}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>

        {/* Question Inputs as Bigger Textareas */}
        {Object.keys(formData)
          .filter((key) => key !== "FormID")
          .map((key, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label>{`Question ${index + 1}:`}</label>
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                rows="2" // Multi-line
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "16px",
                  resize: "none",
                }}
              />
            </div>
          ))}

        {/* Submit and New Buttons */}
        <button
          type="submit"
          style={{ marginTop: "10px", cursor: "pointer", padding: "10px 15px" }}
        >
          Submit Questionnaire
        </button>

        {formSubmitted && (
          <button
            type="button"
            onClick={handleNewQuestionnaire}
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

export default Questionnaire;
