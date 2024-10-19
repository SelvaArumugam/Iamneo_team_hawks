import React from "react";
import "./Samplehome.css";
// import backgroundImage from "./assets/images/picture.jpg"; // Adjust the path according to your folder structure

const Samplehome = () => {
  return (
    <div className="homepage-container">
      <div
        className="top-banner"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay">
          <h1 className="welcome-text">Welcome</h1>
          <p className="caption">Your Journey to Excellence Begins Here</p>
        </div>
      </div>
      <div className="content-section">
        <h2>Main Content Section</h2>
        <p>This is where you can place additional content for the homepage.</p>
      </div>
    </div>
  );
};

export default Samplehome;
