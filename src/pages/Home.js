import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import anime from 'animejs';

const Home = () => {
// title animation
let textWrapper = document.querySelector(".ml2");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml2 .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (_, i) => 70 * i,
  })
  .add({
    targets: ".ml2",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

  
  return (
    <div className="main-container">
      <section id="home-page" className="home-page">
        <div className="jumbotron text-center bg-white d-flex flex-column justify-content-between align-middle">
          <h1 className=" custom-title font-weight-bold ml2">wordplay</h1>
          <div className="subtitle">
            <p className="lead mt-2 ">word.play | \ ˈwərd-ˌplā</p>
            <p className="lead">
              <i>1. def. playful use of words: verbal wit</i>
            </p>
            <p className="lead">
              <i>2. a game to test and improve your vocabulary</i>
            </p>
          </div>
          <div className="lead">
            <Link to="/play">
              <button className="standard-button" id="start-btn">
                play
              </button>
            </Link>
            <Link to="/wordbank">
              <button className="standard-button" id="wb-btn">
                wordbank
              </button>
            </Link>
            <Link to="/rules">
              <button className="standard-button" id="rules-btn">
                how to play
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
