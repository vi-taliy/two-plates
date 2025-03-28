import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Results.css';

function ResultsPage() {
    const navigate = useNavigate();
    const winner = JSON.parse(localStorage.getItem('winningRestaurant'));
    
    // If no winner is found, show a start button
    if (!winner) 
    {
        return (
            <div className="results-container">
                <div className="results-profile">
                    <h2>No Restaurant Selected Yet</h2>
                    <p>Click the button below to get started!</p>
                    <button onClick={() => navigate('/matchmaking')} className="start-button">
                        Start Matchmaking
                    </button>
                </div>
            </div>
        );
    }
    
    return (
      <div className="results-container">
          <div className="results-profile">
            <div className="space-y-8"></div>
              <h2>Your Top Pick!</h2>
              <img src={winner.image_path} alt={winner.name} className="restaurant-image" />
              <h3>{winner.name}</h3>
              <p>{winner.rating} stars</p>
              <p>{winner.price}</p>
              <button onClick={() => window.open(winner.yelp, '_blank', 'noopener,noreferrer')} className="visit-button">
                Visit {winner.name}'s Yelp page
              </button>
              <button onClick={() => window.open(winner.website, '_blank', 'noopener,noreferrer')} className="visit-button">
                Visit {winner.name}'s Website
              </button>
              <button onClick={() => navigate('/')} className="reset-button">
                Choose Again
              </button>
          </div>
        </div>
    );
  }

  export default ResultsPage;