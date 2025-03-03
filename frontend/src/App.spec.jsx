import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("Render App", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const hireEasyText = screen.getByText(/HireEasy/i);
  expect(hireEasyText).toBeInTheDocument();
});