import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
// import anime from 'animejs';

const Home = () => {
  return (
    <div className="main-container">
      <section id="home-page" className="home-page">
          <div className=" custom-title ">
            wordplay
          </div>
          <div className="subtitle">
            <p className="lead  ">word.play | \ ˈwərd-ˌplā</p>
            <p className="lead">
              <i>1. def. playful use of words: verbal wit</i>
            </p>
            <p className="lead">
              <i>2. a game to test and improve your vocabulary</i>
            </p>
          </div>
          <div className="lead home-buttons">
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
  );
};

export default Home;
