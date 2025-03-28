import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantData } from '../Restaurants/RestaurantData';
import './MatchmakingPage.css';

function MatchmakingPage({ onError }) {
  const navigate = useNavigate();
  const [restaurants] = useState(restaurantData);
  const [leftRestaurant, setLeftRestaurant] = useState(null);
  const [rightRestaurant, setRightRestaurant] = useState(null);
  const [lastPick, setLastPick] = useState(null);
  const [timesPicked, setTimesPicked] = useState(0);
  const [lovedPlaces, setLovedPlaces] = useState([]);
  const [usedRestaurants, setUsedRestaurants] = useState(new Set());

  // Load their favorite spots when the page opens
  useEffect(() => {
    const savedLoves = localStorage.getItem('favorites');
    if (savedLoves) {
      setLovedPlaces(JSON.parse(savedLoves));
    }
  }, []);

  // Initialize with two random restaurants
  useEffect(() => {
    if (restaurants.length >= 2) {
      const firstPick = pickRandomSpot(restaurants, new Set());
      const secondPick = pickRandomSpot(restaurants, new Set([firstPick.id]));
      setLeftRestaurant(firstPick);
      setRightRestaurant(secondPick);
      setUsedRestaurants(new Set([firstPick.id, secondPick.id]));
    }
  }, [restaurants]);

  // Pick a random restaurant that hasn't been used yet
  const pickRandomSpot = (fromList = restaurants, usedIds = usedRestaurants) => {
    const currentlyDisplayed = new Set([leftRestaurant?.id, rightRestaurant?.id].filter(Boolean));
    const availableSpots = fromList.filter(spot => !usedIds.has(spot.id) && !currentlyDisplayed.has(spot.id));
    
    // If we've used all restaurants, reset the used list
    if (availableSpots.length === 0) {
      const newUsedIds = new Set(currentlyDisplayed);
      setUsedRestaurants(newUsedIds);
      return pickRandomSpot(fromList, newUsedIds);
    }
    
    const randomPick = Math.floor(Math.random() * availableSpots.length);
    return availableSpots[randomPick];
  };

  // Add or remove a restaurant from their favorites
  const toggleLove = (restaurant, event) => {
    event.stopPropagation();
    const isAlreadyLoved = lovedPlaces.some(place => place.id === restaurant.id);
    let updatedLoves;
    
    if (isAlreadyLoved) {
      updatedLoves = lovedPlaces.filter(place => place.id !== restaurant.id);
    } else {
      updatedLoves = [...lovedPlaces, restaurant];
    }
    
    setLovedPlaces(updatedLoves);
    localStorage.setItem('favorites', JSON.stringify(updatedLoves));
  };

  // Check if they already love this restaurant
  const isLoved = (restaurant) => {
    return lovedPlaces.some(place => place.id === restaurant.id);
  };
  
  // Handle when they pick a restaurant
  const handlePick = (chosenSpot, whichSide) => {
    const newUsedRestaurants = new Set(usedRestaurants);
    newUsedRestaurants.add(chosenSpot.id);
    
    if (chosenSpot.id === lastPick) {
      const pickCount = timesPicked + 1;
      setTimesPicked(pickCount);
      
      // If they pick it three times, they REALLY want it
      if (pickCount >= 3) {
        const winningRestaurant = {
          ...chosenSpot,
          image_url: chosenSpot.image_path,
          url: chosenSpot.yelp,
          categories: [{ title: "Restaurant" }],
          location: { address1: "Blacksburg, VA" }
        };
        localStorage.setItem('winningRestaurant', JSON.stringify(winningRestaurant));
        navigate('/results');
        return;
      }
    } else {
      setTimesPicked(1);
      setLastPick(chosenSpot.id);
    }
    
    // Keep their pick on screen and show a new option
    if (whichSide === 'left') {
      const newRightPick = pickRandomSpot(restaurants, newUsedRestaurants);
      if (newRightPick) {
        newUsedRestaurants.add(newRightPick.id);
        setRightRestaurant(newRightPick);
        setUsedRestaurants(newUsedRestaurants);
      }
    } else {
      const newLeftPick = pickRandomSpot(restaurants, newUsedRestaurants);
      if (newLeftPick) {
        newUsedRestaurants.add(newLeftPick.id);
        setLeftRestaurant(newLeftPick);
        setUsedRestaurants(newUsedRestaurants);
      }
    }
  };

  // Just pick something random for them
  const surpriseMe = () => {
    const randomPick = pickRandomSpot();
    const winningRestaurant = {
      ...randomPick,
      image_url: randomPick.image_path,
      url: randomPick.yelp,
      categories: [{ title: "Restaurant" }],
      location: { address1: "Blacksburg, VA" }
    };
    localStorage.setItem('winningRestaurant', JSON.stringify(winningRestaurant));
    navigate('/results');
  };
  
  return (
    <div className="matchmaking-container">
      <h2>Choose your favorite:</h2>
      <div className="restaurant-container">
        {leftRestaurant && (
          <div className="restaurant-profile" onClick={() => handlePick(leftRestaurant, 'left')}>
            <div className="restaurant-header">
              <img src={leftRestaurant.image_path} alt={leftRestaurant.name} className="restaurant-image" />
              <button 
                onClick={(e) => toggleLove(leftRestaurant, e)}
                className={`favorite-button ${isLoved(leftRestaurant) ? 'favorited' : ''}`}
              >
                {isLoved(leftRestaurant) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="restaurant-info">
              <h3>{leftRestaurant.name}</h3>
              <p1>Rating: {leftRestaurant.rating}⭐</p1>
              <p2>Price: {leftRestaurant.price}</p2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(leftRestaurant.yelp, '_blank', 'noopener,noreferrer');
                }} 
                className="view-button1"
              >
                View on Yelp
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(leftRestaurant.website, '_blank', 'noopener,noreferrer');
                }} 
                className="view-button2"
              >
                Visit Website
              </button>
            </div>
          </div>
        )}

        {rightRestaurant && (
          <div className="restaurant-profile" onClick={() => handlePick(rightRestaurant, 'right')}>
            <div className="restaurant-header">
              <img src={rightRestaurant.image_path} alt={rightRestaurant.name} className="restaurant-image" />
              <button 
                onClick={(e) => toggleLove(rightRestaurant, e)}
                className={`favorite-button ${isLoved(rightRestaurant) ? 'favorited' : ''}`}
              >
                {isLoved(rightRestaurant) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="restaurant-info">
              <h3>{rightRestaurant.name}</h3>
              <p1>Rating: {rightRestaurant.rating}⭐</p1>
              <p2>Price: {rightRestaurant.price}</p2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(rightRestaurant.yelp, '_blank', 'noopener,noreferrer');
                }} 
                className="view-button1"
              >
                View on Yelp
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(rightRestaurant.website, '_blank', 'noopener,noreferrer');
                }} 
                className="view-button2"
              >
                Visit Website
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="button-container">
        <button onClick={surpriseMe} className="action-button">Just Pick For Me!</button>
        <button onClick={() => navigate('/')} className="action-button">Start Over</button>
      </div>
    </div>
  );
}

export default MatchmakingPage;