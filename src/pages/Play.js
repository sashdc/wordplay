import React, { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import { Link } from "react-router-dom";

const Play = () => {
  const loadStorage = () => {
    const loadedStorage = JSON.parse(localStorage.getItem("word-bank")) || [];
    return loadedStorage;
  };

  
  const [wordBank, setWordBank] = useState(loadStorage());
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const getHints = (ranWord) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ranWord}?key=443eb124-d026-41e8-a7c7-3e38052485a4`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No word found. Please try again.");
      })
      .then((data) => {
        if (!data[0].meta) {
          wordGen();
        } else {
          let wordCat = Math.floor(Math.random() * data.length);
          const hintDef = "def. " + data[wordCat].shortdef;
          const hintSyns =
            data[wordCat].meta.syns[
              Math.floor(Math.random() * data[wordCat].meta.syns.length)
            ];
          const firstLetter =
            "It begins with " + ranWord.charAt(0).toUpperCase();
          const lastLetter =
            "This is your last guess. It ends with " +
            ranWord.charAt(ranWord.length - 1).toUpperCase();
          const synOne =
            "syn.1: " + hintSyns[Math.floor(Math.random() * hintSyns.length)];
          const synTwo =
            "syn.2: " + hintSyns[Math.floor(Math.random() * hintSyns.length)];
          const speechPart = data[wordCat].fl;

          const ranWordObj = {
            word: ranWord,
            speechPart: speechPart,
            synonym: hintSyns,
            definition: hintDef,
            DictionaryLink: `https://www.merriam-webster.com/dictionary/${ranWord}`,
          };

          setWordBank([...wordBank, ranWordObj]);
          

          
          // Add the new hints to the existing hints array
          setHints((prevHints) => [
            ...prevHints,
            speechPart + " ( " + ranWord.length + " ) \n" + hintDef,
            synOne,
            synTwo,
            firstLetter,
            lastLetter,
          ]);

          // Start with the first hint
          setCurrentHintIndex(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const revealNextHint = () => {
    // Increment the current hint index
    setCurrentHintIndex((prevIndex) => prevIndex + 1);
  };

  const wordGen = () => {
    fetch("https://api.api-ninjas.com/v1/randomword", {
      method: "GET",
      headers: {
        "X-Api-Key": "fKJQ9FbuX0UGbknMMEa4jA==i8qElInRgcaEERw2",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("No word found. Please try again.");
      })
      .then((data) => {
        let ranWord = data.word;
        ranWord = ranWord.toLowerCase();

        if (
          ranWord.length < 5 ||
          ranWord.length > 7 ||
          wordBank.some((word) => word.word === ranWord)
        ) {
          return wordGen();
        } else {
          getHints(ranWord);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch a new word and its hints on component mount
    wordGen();
  }, []);

  return (
    <div className="main-container">
      <section id="play-game">
        <div id="hint-area">
          <h3>Finding you a word....</h3>
          <div id="hint-box">
            {/* Display only the currently revealed hint */}
            <div>{hints[currentHintIndex]}</div>
          </div>
          {/* Button to reveal the next hint */}
          </div>
          </section>
            {/* a box with as many dashes as ranWord.length */}
            <div id="word-guess-box">
              
              </div>
        
           <div id="game-button-area" className="row d-flex justify-content-center align-items-center">
          <button id="next-clue" className="standard-button m-2 text-center"  onClick={revealNextHint}>new hint</button>
          <button id="newWord" className="m-2 standard-button text-center" >new word</button>
          <Link to="/">
          <button id="home-btn" className="standard-button" type="button">home</button>
          </Link>
          <button id="gameplay-wordbankbutton" className="m-2 standard-button text-center" >wordbank</button>
        </div>   
      <Keyboard />
    </div>
  );
};

export default Play;
