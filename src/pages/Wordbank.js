import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/wordbank.css";
import WordbankLegend from "../components/WordbankLegend";
import DarkMode from "../components/DarkMode";

const Wordbank = () => {
  let loadedStorage = JSON.parse(localStorage.getItem("word-bank")) || [];
  let loadedScore = JSON.parse(localStorage.getItem("score")) || {
    played: 0,
    wins: 0,
    losses: 0,
  };

  const isRecords = loadedStorage.length > 0 || loadedScore.played > 0;

  const [modalContent, setModalContent] = useState({
    word: "",
    speechPart: "",
    definition: "",
    synonym: [],
    DictionaryLink: "",
    className: "",
  });

  useEffect(() => {
    const modal = document.getElementById("wordModal");

    const handleOutsideClick = (event) => {
      if (event.target === modal) {
        handleCloseModal();
      }
    };

    modal.addEventListener("click", handleOutsideClick);

    return () => {
      modal.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const clearRecords = () => {
    if (
      !window.confirm(
        "Are you sure you want to clear the score and word bank? This action cannot be undone."
      )
    ) {
      return;
    }
    localStorage.removeItem("word-bank");
    localStorage.removeItem("score");
    window.location.reload();
  };

  const handleWordButtonClick = (word) => {
    const selectedWord = loadedStorage.find((item) => item.word === word);

    if (selectedWord) {
      setModalContent(selectedWord);
      // Show the modal
      document.getElementById("wordModal").style.display = "block";
    }
  };

  const handleCloseModal = () => {
    // Hide the modal
    document.getElementById("wordModal").style.display = "none";
  };

  const deleteWord = () => {
    // Remove the word from the word bank
    const newWordBank = loadedStorage.filter(
      (item) => item.word !== modalContent.word
    );
    localStorage.setItem("word-bank", JSON.stringify(newWordBank));
    // Hide the modal
    document.getElementById("wordModal").style.display = "none";
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="app-container">
      <div className="main-container wordbank-container">
        <DarkMode />
        <section className="wordbank-section">
          <div className="wordbank-header">
            <h2>
              wordbank - {loadedStorage.length}{" "}
              {loadedStorage.length === 1 ? "word" : "words"}
            </h2>
            <WordbankLegend />

            <div className="wordbank-header-buttons">
              <Link to="/">
                <button
                  id="home-button"
                  className="standard-button"
                  type="button"
                >
                  home
                </button>
              </Link>
              {isRecords ? (
                <button
                  id="clear-button"
                  className="standard-button"
                  type="button"
                  onClick={clearRecords}
                >
                  clear records
                </button>
              ) : null}
            </div>
          </div>
          <div className="my-section">
            <div id="word-bank">
              {loadedStorage.map((word, index) => (
                <button
                  key={index}
                  className={`wordbutton ${word.className}`}
                  id={word.word}
                  onClick={() => handleWordButtonClick(word.word)}
                >
                  {word.word}
                </button>
              ))}
              <div id="wordModal" className="modal" style={{ display: "none" }}>
                <div className="modal-content">
                  <span
                    className="close-modal-button"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </span>

                  <h2>{modalContent.word}</h2>
                  <p>{modalContent.speechPart}</p>
                  <p>{modalContent.definition}</p>
                  <p>Synonyms: {modalContent.synonym.join(", ")}</p>
                  <a
                    href={modalContent.DictionaryLink}
                    target="blank"
                    className="dictionary-link-button"
                  >
                    Dictionary Link
                  </a>
                  <span className="delete-word-button" onClick={deleteWord}>
                    Delete Word
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="stats">
          <h4>Games Played: {loadedScore.played} </h4>
          <h4>Wins: {loadedScore.wins} </h4>
          <h4>Losses: {loadedScore.losses} </h4>
          <h4>
            Incomplete:{" "}
            {loadedScore.played - loadedScore.wins - loadedScore.losses}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Wordbank;
