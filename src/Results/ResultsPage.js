import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

function ResultsPage() {
    const navigate = useNavigate();
    const winner = JSON.parse(localStorage.getItem('winningRestaurant'));
    
    return (
      <div className="results-container">
          <div className="results-profile">
            <h2>Your Top Pick!</h2>
            <img src={winner.image_url} alt={winner.name} className="restaurant-image" />
            <h3>{winner.name}</h3>
            <p>{winner.rating} stars</p>
            <p>{winner.price}</p>
            <button onClick={() => navigate('/')} className="reset-button">
              Choose Again
            </button>
          </div>
        </div>
    );
  }

  export default ResultsPage;
  