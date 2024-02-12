import React, { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import '../styles/Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="toggle-icon" />
    </div>
  );
};

export default DarkMode;
