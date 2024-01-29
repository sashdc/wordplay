import React from "react";

const Play = () => {
  return (
    <div className="main-container">
      <section id="play-game">
        <div id="hint-area">
          <h3>Finding you a word....</h3>
          <div id="hint-box"></div>
        </div>
        <div
          id="word-guess"
          className=" w-100 d-flex flex-column justify-content-center"
        />
        <div id="text"></div>
        <form id="submitform">
          <input
            id="letter-input"
            type="text"
            autoFocus
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="enter guess here"
          />
          <p id="input-alert"></p>
        </form>
        <div id="bank-area" className="w-50 p-2">
          <div id="letterbank"></div>
          <div id="wrong-letterbank"></div>
          <div id="guessed-word"></div>
        </div>
        <div
          id="game-button-area"
          className="row d-flex justify-content-center align-items-center"
        >
          <button id="next-clue" className="standard-button m-2 text-center">
            new hint
          </button>
          <button id="newWord" className="m-2 standard-button text-center">
            new word
          </button>
          <button id="home-btn" className="standard-button" type="button">
            home
          </button>
          <button
            id="gameplay-wordbankbutton"
            className="m-2 standard-button text-center"
          >
            wordbank
          </button>
        </div>
      </section>
    </div>
  );
};

export default Play;
