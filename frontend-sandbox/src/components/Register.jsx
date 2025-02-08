import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock registration (replace with actual API call in future)
  const mockUser = {
    email: "abcd@gmail.com",
    password: "abcdef567",
    username: "melissa",
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        email === mockUser.email &&
        password === mockUser.password &&
        username === mockUser.username
      ) {
        alert("Registration Successful! You can now log in.");
        navigate("/"); // Redirect to login page
      } else {
        setError("Registration failed. Try again with correct mock details.");
      }
      setLoading(false);
    }, 1000); // Simulated delay
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <br />
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
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")} style={linkStyle}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
