import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="home-page">
      <h1>Welcome to Two Plates</h1>
      <p>Can't decide where to eat? Let us help you make the perfect choice, fast and easy!</p>
      <button onClick={() => navigate('/matchmaking')} className="start-button">Get Started</button>
    </div>
  );
}

export default HomePage;