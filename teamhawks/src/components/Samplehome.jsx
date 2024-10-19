import React from "react";
import backgroundVideo from "../video/bag.mp4"; // Adjust the path according to your folder structure
import "./Samplehome.css";

const Samplehome = () => {
  return (
    <div className="homepage-container">
      <div className="top-banner">
        {/* Background Video */}
        <video className="background-video" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with text */}
        <div className="overlay">
          <h1 className="welcome-text">Welcome</h1>
          <p className="caption">Your Journey to Excellence Begins Here</p>
        </div>
      </div>

      {/* Main content section */}
      <div className="content-section">
        <h2>Main Content Section</h2>
        <p>This is where you can place additional content for the homepage.</p>
      </div>
    </div>
  );
};

export default Samplehome;
