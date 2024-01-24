import React from 'react'
import '../styles/home.css'

const Home = () => {
// home page of game with 3 buttons and logo, buttons leading to different pages
// start button leads to game page
// wordbank button leads to wordbank page
// how-to-play button leads to rules page
// logo leads to home page

    



  return (
    <div className="main-container">
    <section id="home-page" className="home-page">
    <div className="jumbotron text-center bg-white d-flex flex-column justify-content-between align-middle">
      <h1 className=" custom-title font-weight-bold ml2">wordplay</h1>
      <div className="subtitle">
        <p className="lead mt-2 ">word.play | \ ˈwərd-ˌplā</p>
        <p className="lead"><i>1. def. playful use of words: verbal wit</i></p>
        <p className="lead"><i>2. a game to test and improve your vocabulary</i></p>
      </div>
        <div className="lead">
          <button className="standard-button" id="start-btn">play</button>
        <button className="standard-button" id="wb-btn">wordbank</button>
        <button className="standard-button" id="rules-btn">how to play</button>
      </div>
    </div>
 </section> 
 </div> )

}

export default Home