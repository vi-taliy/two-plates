import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

const FavoritesPage = ({ onError }) => {
  // Keep track of all the places they've loved
  const [lovedPlaces, setLovedPlaces] = useState([]);

  // Load up their favorite spots when they visit
  useEffect(() => {
    try {
      const savedLoves = localStorage.getItem('favorites');
      if (savedLoves) {
        setLovedPlaces(JSON.parse(savedLoves));
      }
    } catch (error) {
      onError(new Error('Oops! We had trouble loading your favorite places'));
    }
  }, [onError]);

  // Let them change their mind about a place
  const removeFromFavorites = (restaurantId) => {
    try {
      // Filter out the one they don't love anymore
      const stillLoved = lovedPlaces.filter(place => place.id !== restaurantId);
      setLovedPlaces(stillLoved);
      localStorage.setItem('favorites', JSON.stringify(stillLoved));
    } catch (error) {
      onError(new Error('Sorry! Something went wrong while removing that restaurant'));
    }
  };

  return (
    <div className="favorites-container">
      <h1>Places You Love</h1>
      {lovedPlaces.length === 0 ? (
        <p className="no-favorites">You haven't fallen in love with any restaurants yet!</p>
      ) : (
        <div className="favorites-grid">
          {lovedPlaces.map(place => (
            <div key={place.id} className="favorite-card">
              {place.image_url && (
                <img 
                  src={place.image_url} 
                  alt={place.name}
                  className="restaurant-image"
                />
              )}
              <div className="restaurant-info">
                <h3>{place.name}</h3>
                <p>{place.categories?.map(cat => cat.title).join(', ')}</p>
                <p>{place.location?.address1}</p>
                <p>Rating: {place.rating} ⭐</p>
                <button 
                  onClick={() => removeFromFavorites(place.id)}
                  className="remove-button"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 