import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import wordGen from "../utils/wordGen";
import wordBank from "../utils/wordBank";
import getHints from "../utils/getHints";

const PlayButtons = () => {

    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [hints, setHints] = useState([]);


    const revealNextHint = () => {
        // render the next hint, adding it to existing hints that are rendered
        setCurrentHintIndex((prevIndex) => prevIndex + 1);
        // create a div, fill it with the next hint, and append it to the hint box
        const newHint = document.createElement("div");
        newHint.textContent = hints[currentHintIndex];
        document.getElementById("hint-box").appendChild(newHint);
    
        // if the current hint is the last hint, disable the button and add a tooltip saying there are no more hints
        if (currentHintIndex === hints.length - 1) {
          document.getElementById("next-clue").disabled = true;
          document.getElementById("next-clue").textContent = "no more hints";
        }
      };
    
      const newWord = async () => {
        // clear the hint box
        document.getElementById("hint-box").innerHTML = "";
        // reset the hint index
        setCurrentHintIndex(0);
        // reset the hints array
        setHints([]);
        // enable the next hint button
        document.getElementById("next-clue").disabled = false;
        document.getElementById("next-clue").textContent = "new hint";
      
        // fetch a new word
        try {
          const data =  wordGen();
          console.log(data);
          const ranWord = data.word.toLowerCase();
      
          if (
            ranWord.length < 5 ||
            ranWord.length > 7 ||
            wordBank.some((word) => word.word === ranWord)
          ) {
            // Retry if the generated word doesn't meet the criteria
            return newWord();
          } else {
            // Fetch hints for the new word
             getHints(ranWord);
            //  render the first hint in the hint box
            const firstHint = document.createElement("div");
            firstHint.textContent = hints[0];
            document.getElementById("hint-box").appendChild(firstHint);
    
            
          }
        } catch (error) {
          console.error(error);
        }
      };
      

  return (
    <div>   <div
    id="game-button-area"
    className="row d-flex justify-content-center align-items-center"
  >
    <button
      id="next-clue"
      className="standard-button m-2 text-center"
      onClick={revealNextHint}
    >
      new hint
    </button>
    <button id="newWord" className="m-2 standard-button text-center" onClick={newWord}>
      new word
    </button>
    <Link to="/">
      <button id="home-btn" className="standard-button" type="button">
        home
      </button>
    </Link>
    <button
      id="gameplay-wordbankbutton"
      className="m-2 standard-button text-center"
    >
      wordbank
    </button>
  </div></div>
  )
}

export default PlayButtons