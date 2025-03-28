import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Home/HomePage";
import MatchmakingPage from "./Matchmaking/MatchmakingPage";
import ResultsPage from "./Results/ResultsPage";
import AboutPage from "./About/About";
import FavoritesPage from "./Favorites/FavoritesPage";
import FooterPage from "./Footer/FooterPage";
import Navbar from "./Navbar/Navbar";
import ErrorMessage from "./components/ErrorMessage";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
    console.error('Application error:', error);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            {error ? (
              <ErrorMessage 
                message={error.message || "Something went wrong. Please try again."} 
                retry={clearError}
              />
            ) : (
              <Routes>
                <Route path="/" element={<HomePage onError={handleError} />} />
                <Route path="/matchmaking" element={<MatchmakingPage onError={handleError} />} />
                <Route path="/results" element={<ResultsPage onError={handleError} />} />
                <Route path="/favorites" element={<FavoritesPage onError={handleError} />} />
                <Route path="/about" element={<AboutPage onError={handleError} />} />
              </Routes>
            )}
          </div>
          <FooterPage />
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App; 