import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/wordbank.css';

const Wordbank = () => {
  let loadedStorage = JSON.parse(localStorage.getItem('word-bank')) || [];

  const [modalContent, setModalContent] = useState({
    word: '',
    speechPart: '',
    definition: '',
    synonym: [],
    DictionaryLink: '',
  });

  useEffect(() => {
    const modal = document.getElementById('wordModal');

    const handleOutsideClick = (event) => {
      if (event.target === modal) {
        handleCloseModal();
      }
    };

    modal.addEventListener('click', handleOutsideClick);

    return () => {
      modal.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleWordButtonClick = (word) => {
    const selectedWord = loadedStorage.find((item) => item.word === word);

    if (selectedWord) {
      setModalContent(selectedWord);
      // Show the modal
      document.getElementById('wordModal').style.display = 'block';
    }
  };

  const handleCloseModal = () => {
    // Hide the modal
    document.getElementById('wordModal').style.display = 'none';
  };

  const deleteWord = () => {
    // Remove the word from the word bank
    const newWordBank = loadedStorage.filter((item) => item.word !== modalContent.word);
    localStorage.setItem('word-bank', JSON.stringify(newWordBank));
    // Hide the modal
    document.getElementById('wordModal').style.display = 'none';
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="main-container">
      <section>
        <div className="m-3 row justify-content-between align-items-center">
          <h2>wordbank: </h2>
          <Link to="/">
            <button id="home-button" className="standard-button" type="button">
              home
            </button>
          </Link>
        </div>
        <div className="my-section">
          <div id="word-bank" className="mt-5 d-flex w-100 flex-wrap justify-content-around">
            {/* map over loadedStorage to generate buttons of each word */}
            {loadedStorage.map((word, index) => (
              <button
                key={index}
                className="wordbutton"
                id={word.word}
                onClick={() => handleWordButtonClick(word.word)}
              >
                {word.word}
              </button>
            ))}
            {/* <!-- modal to show details --> */}
            {/* Example Modal: */}
            <div id="wordModal" className="modal" style={{ display: 'none' }}>
              <div className="modal-content">
                <span className="close-modal-button" onClick={handleCloseModal}>
                  &times;
                </span>

                <h2>{modalContent.word}</h2>
                <p>{modalContent.speechPart}</p>
                <p>{modalContent.definition}</p>
                <p>Synonyms: {modalContent.synonym.join(', ')}</p>
                <a href={modalContent.DictionaryLink} target="blank" className="dictionary-link-button">
                  Dictionary Link
                </a>
                <span className="delete-word-button" onClick={deleteWord}>
                  Delete Word
                </span>
              </div>
            </div>
          </div>
          <div id="statusbar" className="row w-75 m-2 pb-3">
            <h4 id="win-rate">win stats:</h4>
            {/* <!-- Bulma stats bar --> */}
            <progress id="statusbar-win" className="progress is-link" value="0" max="100">
              wins
            </progress>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wordbank;
