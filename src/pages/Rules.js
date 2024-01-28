import React from 'react'
import { Link } from 'react-router-dom'

const Rules = () => {
  return (
    <div className="main-container">
    <div className="rules-pg">
      <div className="lead rules">
        <h2 className=" custom-title font-weight-bold text-lg-center mt-6" id="rules-title">how to play</h2>
        <p className="lead mt-2 ">You get 5 guesses, and 5 hints:</p>
        <p className="lead"><i>- 1 definition</i></p>
        <p className="lead"><i>- 2 synonyms</i></p>
        <p className="lead"><i>- the first letter, and the last letter</i></p>
        <p className="lead">Correct letters, and guessed words are stored in the letterbank below the playing area.</p>
        <p className="lead">Played words are saved to a wordbank for future reference.</p>
        <p className="lead">Play as many rounds as you like; words and hints are randomly generated every time.</p>
        <p className="lead"><b>GOOD LUCK!</b></p>
      </div>
      <Link to="/">
      <button className="standard-button centre" id="home-btn"> home</button>
      </Link>
    </div>
    </div>
  )
}


export default Rules