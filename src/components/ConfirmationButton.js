import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationButton = ({ to, confirmationMessage, action, buttonText }) => {
  const handleClick = (event) => {
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) {
      event.preventDefault(); // Prevent navigation if the user clicks "Cancel"
    } else {
      action(); // Only execute the action if the user clicks "OK"
    }
  };

  return (
    <Link to={to}>
      <button
        className="standard-button"
        type="button"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </Link>
  );
};

export default ConfirmationButton;
