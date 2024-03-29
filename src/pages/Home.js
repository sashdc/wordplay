import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import DarkMode from "../components/DarkMode";

const Home = () => {
  return (
    <div className="app-container">
      <div className="main-container">
        <DarkMode />

        <section id="home-page" className="home-page">
          <div className=" custom-title ">
            <span>w</span>
            <span>o</span>
            <span>r</span>
            <span>d</span>
            <span>p</span>
            <span>l</span>
            <span>a</span>
            <span>y</span>
          </div>
          <div className="subtitle">
            <p className="">word.play | \ ˈwərd-ˌplā</p>
            <p className="subtitle-text">
              <i>1. def. playful use of words: verbal wit</i>
            </p>
            <p className="subtitle-text">
              <i>2. a game to test and improve your vocabulary</i>
            </p>
          </div>
          <div className="subtitle-text home-buttons">
            <Link to="/play">
              <button className="standard-button home-button" id="start-btn">
                play
              </button>
            </Link>
            <Link to="/wordbank">
              <button className="standard-button home-button" id="wb-btn">
                wordbank
              </button>
            </Link>
            <Link to="/rules">
              <button className="standard-button home-button" id="rules-btn">
                how to play
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
