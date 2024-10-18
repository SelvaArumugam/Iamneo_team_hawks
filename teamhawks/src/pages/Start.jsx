import EyeIcon from "@mui/icons-material/Visibility"; // Importing the eye icon for password visibility
import EyeOffIcon from "@mui/icons-material/VisibilityOff"; // Importing the eye-off icon
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../images/sam1.jpg"; // Importing the image from the images folder
import "./App.css"; // Assuming you have some styles in an external CSS file
import axios, { HttpStatusCode } from "axios";
const Start = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoginOpen, setLoginOpen] = useState(false); // State to manage login card visibility
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const cardRef = useRef(null); // Ref to access the card

  // Function to handle navigation to the register page
  const handleRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  // Function to handle login button click
   async function handleLogin(){
     // Here you can add authentication logic
    try
    {
     const res = await axios.post("http://localhost:8081/user/login",{email : email, password : password});
     // For now, it will just navigate to the home page
     var d = res.data;
     if(d == 1){
      alert("User not registered");
     }
     else if(d == 2){
      alert("Logged in Successfully");
      navigate("/home"); // Navigate to the home page after login

     }
        
     else if(d == 3)
        alert("Password Incorrect");
    }catch(e)
    {
     setError("password doest not match");
   }
  };

  // Function to close the login card
  const closeLoginCard = () => {
    setLoginOpen(false); // Close the login card
  };

  // Close the card when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        closeLoginCard(); // Close if clicked outside
      }
    };

    if (isLoginOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, [isLoginOpen]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // Ensure the image covers the full area
          backgroundPosition: "center",
          height: "100vh", // Full screen height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white", // White text for good contrast
          textAlign: "center",
        }}
      >
        {/* Main Title */}
        <h1 style={{ fontSize: "3.5rem", margin: 0 }}>
          Team Hawks - a vendor assessment platform..
        </h1>
        <h2 style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
          Your trusted guide to navigating vendor excellence.
        </h2>
        {error && <p>{{error}}</p>}
        {/* Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button className="hover-button" onClick={() => setLoginOpen(true)}>
            LOGIN
          </button>
          <button className="hover-button" onClick={handleRegister}>
            REGISTER
          </button>
        </div>

        {/* Bottom Text */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            padding: "10px 20px",
            color: "#000",
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          }}
        >
          Assess. Compare. Succeed.
        </div>
      </div>

      {/* Login Card */}
      {isLoginOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dimming effect
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeLoginCard} // Close on background click
        >
          <div
            ref={cardRef} // Attach ref to the card
            style={{
              backgroundColor: "white",
              padding: "40px", // Increased padding for larger card
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              width: "400px", // Increased width for larger card
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
          >
            <h3 style={{ fontSize: "2rem" }}>Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "15px", // Increased padding
                margin: "15px 0", // Increased margin
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "1.2rem", // Increased font size
              }}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px", // Increased padding
                  margin: "15px 0", // Increased margin
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "1.2rem", // Increased font size
                }}
              />
              <div
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}{" "}
                {/* Toggle eye icon */}
              </div>
            </div>
            <button
              onClick={handleLogin}
              style={{
                padding: "15px 30px", // Increased padding for button
                backgroundColor: "#6a1b9a",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.2rem", // Increased font size
                marginTop: "20px", // Added margin for spacing
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
