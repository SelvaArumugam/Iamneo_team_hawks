import React from "react";
import "./HelpCard.css";

const HelpCard = ({ title, description, articles }) => {
  return (
    <div className="help-card">
      <div className="card-icon"></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{articles} articles</span>
    </div>
  );
};

export default HelpCard;
