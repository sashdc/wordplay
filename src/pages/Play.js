import React, { useState, useEffect } from "react";
import Keyboard from "../components/Keyboard";
// import { Link } from "react-router-dom";
import "../styles/play.css";
import ConfirmationButton from "../components/ConfirmationButton";
import DarkMode from "../components/DarkMode";

const Play = () => {
  let nextHintButton = document.getElementById("next-clue");
  let messageArea = document.getElementById("message-area");
  let letterBankDiv = document.getElementById("letter-bank");

  // load score object from local storage
  const loadScore = () => {
    const loadedScore = JSON.parse(localStorage.getItem("score")) || {
      played: 0,
      wins: 0,
      losses: 0,
    };
    return loadedScore;
  };

  const loadStorage = () => {
    const loadedStorage = JSON.parse(localStorage.getItem("word-bank")) || [];
    return loadedStorage;
  };

  const [ranWord, setRanWord] = useState("");
  const [score, setScore] = useState(loadScore());
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
          setRanWord(ranWord);
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
          const synOneIndex = Math.floor(Math.random() * hintSyns.length);
          const synOne = "syn.1: " + hintSyns[synOneIndex];

          let synTwoIndex;

          do {
            synTwoIndex = Math.floor(Math.random() * hintSyns.length);
          } while (synTwoIndex === synOneIndex);

          const synTwo = "syn.2: " + hintSyns[synTwoIndex];

          const speechPart = data[wordCat].fl;
          setCurrentHintIndex(1);

          const ranWordObj = {
            word: ranWord,
            speechPart: speechPart,
            synonym: hintSyns,
            definition: hintDef,
            className: "incomplete",
            DictionaryLink: `https://www.merriam-webster.com/dictionary/${ranWord}`,
          };

          score.played += 1;
          setScore(score);
          localStorage.setItem("score", JSON.stringify(score));

          // Add the new hints to the existing hints array
          setHints((prevHints) => [
            ...prevHints,
            speechPart + " ( " + ranWord.length + " ) \n" + hintDef,
            firstLetter,
            synOne,
            synTwo,
            lastLetter,
          ]);

          setTimeout(() => {
            setLoading(false); // Set loading to false after fetching hints

            setWordBank((prevWordBank) => [...prevWordBank, ranWordObj]);
            localStorage.setItem(
              "word-bank",
              JSON.stringify([...wordBank, ranWordObj])
            );
          }, 1500);
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
      nextHintButton.disabled = true;
      nextHintButton.textContent = "no more hints";
      // add disabled class to the button
      nextHintButton.classList.remove("standard-button");
      nextHintButton.classList.add("standard-button-disabled");
    }
  };

  const newWord = async () => {
    // clear the console
    console.clear();
    setLoading(true);
    letterBankDiv.innerText = "";
    // clear the hint box
    document.getElementById("hint-box").innerHTML = "";
    // reset the hint index
    setCurrentHintIndex(0);
    // delete the div with class correct or incorrect if it exists
    messageArea.textContent = "";
    messageArea.setAttribute("class", "");
    // reset the hints array
    setHints([]);
    // enable the next hint button
    document.getElementById("next-clue").disabled = false;
    document.getElementById("next-clue").textContent = "new hint";
    document
      .getElementById("next-clue")
      .classList.remove("standard-button-disabled");
    document.getElementById("next-clue").classList.add("standard-button");

    // fetch a new word
    try {
      const data = wordGen();
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
    } catch (error) {}
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
    setLoading(true); // Set loading to true on component mount
    wordGen();
  }, []);

  const handleKeyboardSubmit = (submittedWord) => {
    // check if submitted word has correct length and bring up message if not
    if (submittedWord.length !== ranWord.length) {
      messageArea.classList.add("incorrect");
      messageArea.textContent = "This word has " + ranWord.length + " letters";

      // Set a timeout to remove the alert after a specified duration
      setTimeout(() => {
        messageArea.textContent = "";
        messageArea.classList.remove("incorrect");
      }, 2000); // Adjust the duration as needed
      return;
    }

    // check if submitted word is the same, if so reveal as correct
    if (submittedWord.toLowerCase() === ranWord.toLowerCase()) {
      // add to the score
      const updatedScore = { ...score, wins: score.wins + 1 };
      setScore(updatedScore);
      localStorage.setItem("score", JSON.stringify(updatedScore));
      // add correct class to the message area
      messageArea.classList.add("correct");
      messageArea.textContent = `Well done! It is ${ranWord}`;
      // update the word bank object to show the word as complete-success
      const updatedWordBank = wordBank.map((word) => {
        if (word.word === ranWord) {
          return { ...word, className: "complete-success" };
        }
        return word;
      });
      setWordBank(updatedWordBank);
      localStorage.setItem("word-bank", JSON.stringify(updatedWordBank));
    } else {
      // if not, check if there are common letters and display them
      let commonLetters = "";

      // Count occurrences of each letter in ranWord
      const ranWordLetterCount = new Map();
      for (let letter of ranWord.toLowerCase()) {
        ranWordLetterCount.set(
          letter,
          (ranWordLetterCount.get(letter) || 0) + 1
        );
      }

      for (let i = 0; i < ranWord.length; i++) {
        if (submittedWord.toLowerCase().includes(ranWord[i].toLowerCase())) {
          commonLetters += ranWord[i];
        }
      }

      // Convert commonLetters to an array and sort it alphabetically
      const sortedLettersArray = Array.from(commonLetters.toLowerCase()).sort();

      // Check if the letter is not already in the letter bank before adding it
      for (let letter of sortedLettersArray) {
        const letterToAdd = letter.toUpperCase(); // Ensure the letter is in uppercase

        if (!letterBankDiv.innerText.includes(letterToAdd)) {
          // Add the letter to the letter bank
          const occurrencesInSubmittedWord = Array.from(
            new Set(submittedWord.toLowerCase())
          ).filter((char) => char === letter.toLowerCase()).length;

          const occurrencesInRanWord = ranWordLetterCount.get(letter) || 0;
          const occurrencesToAdd = Math.max(
            occurrencesInSubmittedWord,
            occurrencesInRanWord
          );

          for (let i = 0; i < occurrencesToAdd; i++) {
            letterBankDiv.innerText += letterToAdd;
          }
        }
      }

      // Remove the trailing comma if it exists
      letterBankDiv.innerText = letterBankDiv.innerText.replace(/,$/, "");

      if (currentHintIndex < 5) {
        revealNextHint();
      } else {
        messageArea.classList.add("incorrect");
        messageArea.textContent = `Unlucky! The word was ${ranWord}`;
        score.losses += 1;
        setScore(score);
        localStorage.setItem("score", JSON.stringify(score));
        // update the word bank object to show the word as complete-fail
        const updatedWordBank = wordBank.map((word) => {
          if (word.word === ranWord) {
            console.log(word);
            return { ...word, className: "complete-fail" };
          }
          return word;
        });
        setWordBank(updatedWordBank);
        localStorage.setItem("word-bank", JSON.stringify(updatedWordBank));
      }
    }
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <DarkMode />

        <section id="play-game">
          <div id="hint-area">
            {loading ? (
              <h3>Finding you a word</h3>
            ) : (
              <div id="hint-box">
                {/* Display accumulating hints*/}
                <div id="first-hint">{hints[0]}</div>
              </div>
            )}
          </div>

          <div id="message-area" className=""></div>
          <div id="user-input-area">
            <div
              id="letter-bank"
              title="These letters you guessed are in the target word"
            ></div>
            <div id="game-button-area" className="row ">
              <button
                id="next-clue"
                className="standard-button game-button"
                onClick={revealNextHint}
                disabled={loading}
              >
                new hint
              </button>
              <button
                id="newWord"
                className="standard-button game-button"
                onClick={newWord}
                disabled={loading}
              >
                new word
              </button>
              <ConfirmationButton
                to="/"
                confirmationMessage="Are you sure you want to leave the game? If you are in the middle of a round it will be saved as incomplete in your wordbank"
                action={() => {}}
                buttonText="home"
              />
              <ConfirmationButton
                to="/wordbank"
                confirmationMessage="Are you sure you want to leave the game? If you are in the middle of a round it will be saved as incomplete in your wordbank"
                action={() => {}}
                buttonText="wordbank"
              />
            </div>
            <Keyboard id="keyboard" onKeyboardSubmit={handleKeyboardSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Play;
