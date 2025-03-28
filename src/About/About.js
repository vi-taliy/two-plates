import React from 'react';
import './About.css';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About TwoPlates</h1>
          <p>
            TwoPlates is a fun and interactive way to discover your perfect dining destination. 
            Our innovative platform uses a simple yet engaging tournament-style selection process to help you 
            find the restaurant that truly captures your taste and mood.
          </p>
          <p>
            How does it work? You'll be presented with two restaurants at a time, and you'll choose your 
            favorite by clicking on the one that appeals to you most.
          </p>
          <p>
            Whether you're looking for a quick bite, a romantic dinner, or just want to explore new culinary 
            experiences, TwoPlates makes decision-making delicious and fun.
          </p>
        </div>
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Restaurant Matchmaker Concept" 
            className="about-illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;