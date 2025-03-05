import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantData } from '../Restaurants/RestaurantData';
import './MatchmakingPage.css';
import '../Restaurants/RestaurantData.css';

// Get a random restaurant, excluding the one with the given ID
const getRandomRestaurant = (excludeId) => 
{
  let filteredRestaurants = restaurantData;
  
  // If an ID to exclude is provided, filter it out
  // Used so user never has to choose between two of the same place
  if (excludeId !== null) 
  {
    filteredRestaurants = restaurantData.filter(restaurant => restaurant.id !== excludeId);
  }
  
  // Get a random restaurant from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
  return filteredRestaurants[randomIndex];
};

function MatchmakingPage() 
{
  const navigate = useNavigate();
  // Initializes the left restaurant with a random restaurant
  const [leftRestaurant, setLeftRestaurant] = useState(getRandomRestaurant(null));
  // Initializes the right restaurant with a random restaurant that is not the same as the one presented on the left
  const [rightRestaurant, setRightRestaurant] = useState(getRandomRestaurant(leftRestaurant.id));
  // Initializes lastSelectedId to keep track of the users previously selected restaurant
  const [lastSelectedId, setLastSelectedId] = useState(null);
  
  // Handle selecting a restaurant
  const handleSelect = (selectedRestaurant, position) => 
  {
    // If this is the second time in a row the same restaurant is selected, declare it the "winner"
    if (selectedRestaurant.id === lastSelectedId) 
    {
      localStorage.setItem('winningRestaurant', JSON.stringify(selectedRestaurant));
      navigate('/results');
      return;
    }
    
    // Update the last selected restaurant ID
    setLastSelectedId(selectedRestaurant.id);
    
    // Keep the selected restaurant in its current position, replace the other one
    if (position === 'left') 
    {
      // If left was selected, replace right
      setRightRestaurant(getRandomRestaurant(leftRestaurant.id));
    } 
    else 
    {
      // If right was selected, replace left
      setLeftRestaurant(getRandomRestaurant(rightRestaurant.id));
    }
  };
  
  return (
    <div className="matchmaking-container">
      <h2>Choose your favorite:</h2>
      <div className="restaurant-container">
          <div className="restaurant-profile" onClick={() => handleSelect(leftRestaurant, 'left')}>
            <img src={leftRestaurant.image_url} alt={leftRestaurant.name} className="restaurant-image" />
            <h3>{leftRestaurant.name}</h3>
            <p>{leftRestaurant.price}</p>
            <p>{leftRestaurant.rating} stars</p>
          </div>

          <div className="restaurant-profile" onClick={() => handleSelect(rightRestaurant, 'right')}>
            <img src={rightRestaurant.image_url} alt={rightRestaurant.name} className="restaurant-image" />
            <h3>{rightRestaurant.name}</h3>
            <p>{rightRestaurant.price}</p>
            <p>{rightRestaurant.rating} stars</p>
          </div>
      </div>

      <button onClick={() => navigate('/')} className="reset-button">
        Restart
      </button>
    </div>
  );
}

export default MatchmakingPage;