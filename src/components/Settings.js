import React from 'react';
import { useSettings } from '../context/SettingsContext';
import './Settings.css';

const cuisineOptions = [
  'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 
  'Thai', 'Indian', 'Mediterranean', 'Brazilian', 'Seafood'
];

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  const handlePriceChange = (price) => {
    const newPriceRange = settings.priceRange.includes(price)
      ? settings.priceRange.filter(p => p !== price)
      : [...settings.priceRange, price];
    updateSettings({ priceRange: newPriceRange });
  };

  const handleCuisineChange = (cuisine) => {
    const newCuisineTypes = settings.cuisineTypes.includes(cuisine)
      ? settings.cuisineTypes.filter(c => c !== cuisine)
      : [...settings.cuisineTypes, cuisine];
    updateSettings({ cuisineTypes: newCuisineTypes });
  };

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      
      {/* Dark Mode Toggle */}
      <div className="setting-section">
        <h3>Display</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) => updateSettings({ darkMode: e.target.checked })}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">Dark Mode</span>
        </label>
      </div>

      {/* Distance Range */}
      <div className="setting-section">
        <h3>Maximum Distance</h3>
        <div className="range-slider">
          <input
            type="range"
            min="1"
            max="50"
            value={settings.maxDistance}
            onChange={(e) => updateSettings({ maxDistance: parseInt(e.target.value) })}
          />
          <span>{settings.maxDistance} miles</span>
        </div>
      </div>

      {/* Price Range */}
      <div className="setting-section">
        <h3>Price Range</h3>
        <div className="price-toggles">
          {['$', '$$', '$$$', '$$$$'].map(price => (
            <button
              key={price}
              className={`price-toggle ${settings.priceRange.includes(price) ? 'active' : ''}`}
              onClick={() => handlePriceChange(price)}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Types */}
      <div className="setting-section">
        <h3>Cuisine Types</h3>
        <div className="cuisine-toggles">
          {cuisineOptions.map(cuisine => (
            <button
              key={cuisine}
              className={`cuisine-toggle ${settings.cuisineTypes.includes(cuisine) ? 'active' : ''}`}
              onClick={() => handleCuisineChange(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings; 