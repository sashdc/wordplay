import React from "react";
import { Link } from "react-router-dom";
import "../styles/rules.css";
import DarkMode from "../components/DarkMode";

const Rules = () => {
  return (
    <div className="app-container">

    <div className="main-container">
    <DarkMode />

      <div className="rules-pg">
        <h2 className=" custom-title " id="rules-title">
          how to play
        </h2>
        <div className="rules">
          <p>You get 5 guesses, and 5 hints:</p>
          <p>
            - 1 definition
          </p>
          <p>
            - 2 synonyms
          </p>
          <p>
            - the first letter, and the last letter
          </p>
          <p>
            Correct letters, and guessed words are stored in the letterbank
            below the playing area.
          </p>
          <p>
            Played words are saved to a wordbank for future reference.
          </p>
          <p>
            Play as many rounds as you like; words and hints are randomly
            generated every time.
          </p>
          <p>GOOD LUCK!</p>
        </div>
        <Link to="/">
          <button className="standard-button centre" id="home-btn">
            {" "}
            home
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Rules;
