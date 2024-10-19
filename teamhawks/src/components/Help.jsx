import React from "react";
import './Help.css';
import HelpCard from './HelpCard';

const Help = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Get your Help Scout account set up in just 6 simple steps.",
      articles: 8,
    },
    {
      title: "Account Management",
      description: "Managing your account, creating new Users, pricing details, exporting data.",
      articles: 30,
    },
    {
      title: "Reporting",
      description: "Reporting features, metric definitions, use case scenarios.",
      articles: 11,
    },
    {
      title: "Integrations",
      description: "Learn how to integrate Help Scout with other apps.",
      articles: 20,
    },
    {
      title: "API Documentation",
      description: "Understand our API, endpoints, and how to use them.",
      articles: 15,
    },
    {
      title: "Billing",
      description: "Information on billing, invoices, and payment methods.",
      articles: 12,
    },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <h1>How can we help?</h1>
        <input type="text" placeholder="Search Beacon, Docs, Reports, etc." className="search-input" />
        <button className="search-btn">Search</button>
      </header>
      <section className="help-desk">
        <h2>Help Desk</h2>
        <div className="cards-container">
          {helpTopics.map((topic, index) => (
            <HelpCard key={index} title={topic.title} description={topic.description} articles={topic.articles} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Help;
