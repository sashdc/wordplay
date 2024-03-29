import React, { useState, useEffect } from "react";
import "../styles/keyboard.css"; // Create a CSS file for styling

const Keyboard = (props) => {
  const [selectedLetters, setSelectedLetters] = useState("");

  const handleLetterClick = (letter) => {
    // Update the selected letters state when a letter is clicked
    setSelectedLetters((prevLetters) => prevLetters + letter);
  };

  const handleEnterClick = () => {
    // Handle the submission of the entered word (you can implement your logic here)
    console.log("Submitted:", selectedLetters);
    props.onKeyboardSubmit(selectedLetters);

    // Clear the selected letters after submission
    setSelectedLetters("");
  };

  const handleBackspaceClick = () => {
    // Remove the last letter from the selected letters
    setSelectedLetters((prevLetters) => prevLetters.slice(0, -1));
  };

  const handleClearClick = () => {
    // Clear the entire entry
    setSelectedLetters("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is a letter and update the selected letters
      const isLetter = /^[a-zA-Z]$/.test(event.key);
      if (
        event.key === "Enter" ||
        event.key === "NumpadEnter" ||
        event.keyCode === 13
      ) {
        event.preventDefault();

        props.onKeyboardSubmit(selectedLetters);

        // Clear the selected letters after submission
        setSelectedLetters("");

        // Focus back on the keyboard input after submission
        document.getElementById("keyboard-input").focus();
      }
      if (isLetter) {
        setSelectedLetters(
          (prevLetters) => prevLetters + event.key.toUpperCase()
        );
      } else if (event.key === "Backspace") {
        // Handle backspace key
        setSelectedLetters((prevLetters) => prevLetters.slice(0, -1));
      }
    };

    // Add event listener for keydown on the entire document
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLetters]); // Include selectedLetters in the dependency array

  // Define the QWERTY layout
  const qwertyLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="keyboard">
      {/* Display the selected letters */}
      <div id="keyboard-input" className="selected-letters">
        {selectedLetters}
      </div>

      {/* Create the keyboard grid using the QWERTY layout */}
      <div className="keyboard-grid">
        {qwertyLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split("").map((letter, colIndex) => (
              <div
                key={colIndex}
                className={`keyboard-key ${
                  selectedLetters.includes(letter) ? "selected" : ""
                }`}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
        {/* Additional keys: Enter, Backspace, and Clear */}
        <div className="keyboard-row">
          <div className="keyboard-key" onClick={handleEnterClick}>
            Enter
          </div>
          <div className="keyboard-key" onClick={handleClearClick}>
            Clear
          </div>
          <div className="keyboard-key" onClick={handleBackspaceClick}>
            Backspace
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
