import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./App.css"; // Assuming you have some styles in an external CSS file

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic validation
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Clear error and navigate to the home page
    setError("");
    axios.post("http://localhost:8081/user/register", { userName : username, email :email,password :password});
    //console.log("Registration Successful:", { username, email, password });
    navigate("/"); // Navigate to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "450px",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Register</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "15px", // Increased padding for larger input
              margin: "15px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1.2rem", // Larger font size
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "15px", // Increased padding for larger input
              margin: "15px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1.2rem", // Larger font size
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "15px", // Increased padding for larger input
              margin: "15px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1.2rem", // Larger font size
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px", // Increased padding for larger button
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#6a1b9a",
              color: "white",
              fontSize: "1.5rem", // Larger font size for button
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
