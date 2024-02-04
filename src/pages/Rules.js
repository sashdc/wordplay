import React from "react";
import { Link } from "react-router-dom";
import "../styles/rules.css";

const Rules = () => {
  return (
    <div className="app-container">

    <div className="main-container">
      <div className="rules-pg">
        <h2 className=" custom-title " id="rules-title">
          how to play
        </h2>
        <div className=" rules">
          <p className="">You get 5 guesses, and 5 hints:</p>
          <p className="">
            - 1 definition
          </p>
          <p className="">
            - 2 synonyms
          </p>
          <p className="">
            - the first letter, and the last letter
          </p>
          <p className="">
            Correct letters, and guessed words are stored in the letterbank
            below the playing area.
          </p>
          <p className="">
            Played words are saved to a wordbank for future reference.
          </p>
          <p className="">
            Play as many rounds as you like; words and hints are randomly
            generated every time.
          </p>
          <p className="">GOOD LUCK!</p>
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
