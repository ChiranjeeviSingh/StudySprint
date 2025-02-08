import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // One mock credential (will be replaced with real API)
  const mockUser = { email: "abcd@gmail.com", password: "abcdef567" };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulated authentication check (replace with actual API call in future)
    setTimeout(() => {
      if (email === mockUser.email && password === mockUser.password) {
        alert("Login Successful!");
        localStorage.setItem("token", "mock-token-12345"); // Store mock token
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        setError("Invalid credentials, please try again.");
      }
      setLoading(false);
    }, 1000); // Simulated delay
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        New User?{" "}
        <button onClick={() => navigate("/register")} style={linkStyle}>
          Register here
        </button>
      </p>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "250px",
  padding: "10px",
  marginBottom: "10px",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

const linkStyle = {
  background: "none",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  fontSize: "16px",
  textDecoration: "underline",
};

export default Login;
