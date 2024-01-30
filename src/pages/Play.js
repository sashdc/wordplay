import React, { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
import { Link } from "react-router-dom";

const Play = () => {
  console.log("Component re-rendered");

  const loadStorage = () => {
    const loadedStorage = JSON.parse(localStorage.getItem("word-bank")) || [];
    return loadedStorage;
  };

  const [wordBank, setWordBank] = useState(loadStorage());
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [loading, setLoading] = useState(true); // New state for loading

  const getHints = (ranWord) => {
    setLoading(true); // Set loading to true when fetching hints
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${ranWord}?key=443eb124-d026-41e8-a7c7-3e38052485a4`
    )
      .then((response) => {
        if (response.ok) {
          console.log("got hints");
          return response.json();
        }
        throw new Error("No word found. Please try again.");
      })
      .then((data) => {
        if (!data[0].meta) {
          wordGen();
        } else {
          let wordCat = Math.floor(Math.random() * data.length);
          console.log(data);
          console.log(ranWord);
          const hintDef = "def. " + data[wordCat].shortdef;
          const hintSyns =
            data[wordCat].meta.syns[
              Math.floor(Math.random() * data[wordCat].meta.syns.length)
            ];
          const firstLetter =
            "It begins with " + ranWord.charAt(0).toUpperCase();
          console.log(firstLetter);
          const lastLetter =
            "This is your last guess. It ends with " +
            ranWord.charAt(ranWord.length - 1).toUpperCase();
          console.log(lastLetter);
          const synOneIndex = Math.floor(Math.random() * hintSyns.length);
          const synOne = "syn.1: " + hintSyns[synOneIndex];
          console.log(synOne);

          let synTwoIndex;

          do {
            synTwoIndex = Math.floor(Math.random() * hintSyns.length);
          } while (synTwoIndex === synOneIndex);

          const synTwo = "syn.2: " + hintSyns[synTwoIndex];
          console.log(synTwo);

          const speechPart = data[wordCat].fl;
          console.log(speechPart);
          setCurrentHintIndex(1);

          const ranWordObj = {
            word: ranWord,
            speechPart: speechPart,
            synonym: hintSyns,
            definition: hintDef,
            DictionaryLink: `https://www.merriam-webster.com/dictionary/${ranWord}`,
          };

          setWordBank([...wordBank, ranWordObj]);
          localStorage.setItem("word-bank", JSON.stringify(wordBank));

          // Add the new hints to the existing hints array
          setHints((prevHints) => [
            ...prevHints,
            speechPart + " ( " + ranWord.length + " ) \n" + hintDef,
            synOne,
            synTwo,
            firstLetter,
            lastLetter,
          ]);

          setTimeout(setLoading(false), 1500) // Set loading to false after fetching hints
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false on error
      });
  };

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
      // add disabled class to the button
      document.getElementById("next-clue").classList.remove("standard-button");
      document
        .getElementById("next-clue")
        .classList.add("standard-button-disabled");
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
      const data = wordGen();
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

  const wordGen = () => {
    fetch("https://api.api-ninjas.com/v1/randomword", {
      method: "GET",
      headers: {
        "X-Api-Key": "fKJQ9FbuX0UGbknMMEa4jA==i8qElInRgcaEERw2",
      },
    })
      .then((response) => {
        console.log("got a word");
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
    console.log("useEffect is running");
    setLoading(true); // Set loading to true on component mount
    wordGen();
  }, []);

  return (
    <div className="main-container">
      <section id="play-game">
        <div id="hint-area">
          {loading ? (
            <h3>Finding you a word....</h3>
          ) : (
            <div id="hint-box">
              {/* Display accumulating hints*/}
              <div id="first-hint">{hints[0]}</div>
            </div>
          )}
          {/* Button to reveal the next hint */}
        </div>
      </section>{" "}
      {/* a box with as many dashes as ranWord.length */}
      <div id="user-input-area">
        <div
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
          <button
            id="newWord"
            className="m-2 standard-button text-center"
            onClick={newWord}
          >
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
        </div>
        <Keyboard />
      </div>
    </div>
  );
};

export default Play;
