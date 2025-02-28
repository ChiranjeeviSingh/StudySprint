import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Questionnaire() {
  const navigate = useNavigate(); // Hook for navigation

  // Initial state: Questions & their options
  const initialState = {
    FormID: "",
    Questions: [
      {
        id: "Q_Gender",
        text: "What is your gender?",
        type: "radio",
        options: ["Male", "Female", "Other"],
      },
      { id: "Q_Education", text: "Education Level", type: "text", options: [] },
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
      { id: "Q_Resume", text: "Upload your resume", type: "file", options: [] },
      {
        id: "Q6",
        text: "What is your expected salary?",
        type: "text",
        options: [],
      },
      { id: "Q7", text: "", type: "text", options: [] },
      { id: "Q8", text: "", type: "text", options: [] },
      { id: "Q9", text: "", type: "text", options: [] },
      { id: "Q10", text: "", type: "text", options: [] },
    ],
  };

  const [formData, setFormData] = useState(initialState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes (Question text or options)
  const handleChange = (e, index, isOption = false, optionIndex = null) => {
    const updatedQuestions = [...formData.Questions];

    if (isOption) {
      // Update specific option for a question
      updatedQuestions[index].options[optionIndex] = e.target.value;
    } else {
      updatedQuestions[index].text = e.target.value;
    }

    setFormData({ ...formData, Questions: updatedQuestions });
  };

  // Add new option for multiple-choice questions
  const addOption = (index) => {
    const updatedQuestions = [...formData.Questions];
    updatedQuestions[index].options.push("");
    setFormData({ ...formData, Questions: updatedQuestions });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Questionnaire Created:", formData);
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

      <h2>Create a Job Questionnaire</h2>

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
            onChange={(e) =>
              setFormData({ ...formData, FormID: e.target.value })
            }
            required
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>

        {/* Dynamic Question Inputs */}
        {formData.Questions.map((question, index) => (
          <div key={question.id} style={{ marginBottom: "10px" }}>
            <label>{`Question ${index + 1}:`}</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleChange(e, index)}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />

            {/* Multiple choice (radio/checkbox) options */}
            {(question.type === "radio" || question.type === "checkbox") && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleChange(e, index, true, optionIndex)}
                    placeholder={`Option ${optionIndex + 1}`}
                    style={{ width: "80%", padding: "5px", marginTop: "5px" }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addOption(index)}
                  style={{ marginLeft: "5px", padding: "5px 10px" }}
                >
                  ➕ Add Option
                </button>
              </div>
            )}

            {/* File Upload Notice */}
            {question.type === "file" && (
              <p style={{ fontSize: "14px", color: "gray" }}>
                This question requires candidates to upload a file.
              </p>
            )}
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