import React from 'react'
import { Link } from 'react-router-dom'

const Rules = () => {
  return (
    <div>
    <div class="rules-pg">
      <div class="lead rules">
        <h2 class=" custom-title font-weight-bold text-lg-center mt-6" id="rules-title">how to play</h2>
        <p class="lead mt-2 ">You get 5 guesses, and 5 hints:</p>
        <p class="lead"><i>- 1 definition</i></p>
        <p class="lead"><i>- 2 synonyms</i></p>
        <p class="lead"><i>- the first letter, and the last letter</i></p>
        <p class="lead">Correct letters, and guessed words are stored in the letterbank below the playing area.</p>
        <p class="lead">Played words are saved to a wordbank for future reference.</p>
        <p class="lead">Play as many rounds as you like; words and hints are randomly generated every time.</p>
        <p class="lead"><b>GOOD LUCK!</b></p>
      </div>
      <Link to="/">
      <button class="standard-button centre" id="home-btn"> home</button>
      </Link>
    </div>
    </div>
  )
}


export default Rules