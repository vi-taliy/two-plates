import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, retry }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <p>{message}</p>
        {retry && (
          <button onClick={retry} className="retry-button">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 