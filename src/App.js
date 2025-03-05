import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Home/HomePage';
import MatchmakingPage from './Matchmaking/MatchmakingPage';
import ResultsPage from './Results/ResultsPage';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matchmaking" element={<MatchmakingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;