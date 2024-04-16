import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationButton = ({ to, confirmationMessage, action, buttonText, disabled, loading }) => {
  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault(); // Prevent action if button is disabled or loading
      return;
    }
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) {
      event.preventDefault(); 
    } else {
      action(); 
    }
  };

  return (
    <Link to={to}>
      <button
        // className="standard-button"
        className={loading || disabled ? "standard-button-disabled" : "standard-button"}
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {buttonText}
      </button>
    </Link>
  );
};

export default ConfirmationButton;
