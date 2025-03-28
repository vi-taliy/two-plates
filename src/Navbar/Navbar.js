import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import Logo from '../components/Logo';
import Settings from '../components/Settings';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { settings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className={`navbar ${settings.darkMode ? 'dark-mode' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <Logo size={32} />
            <span className="logo-text">Two Plates</span>
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/matchmaking" 
                className={`nav-link ${location.pathname === '/matchmaking' ? 'active' : ''}`}
              >
                Find Food
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/favorites" 
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
              >
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/results" 
                className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}
              >
                Results
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link settings-button"
                onClick={() => setShowSettings(!showSettings)}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {showSettings && (
        <div className="settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={e => e.stopPropagation()}>
            <Settings />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 