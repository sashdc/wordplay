import React from "react";

const WordbankLegend = () => {
  return (
    <div className="wordbank-legend">
      <button className="wordbutton legend-button incomplete" title= "you didn't complete the round for this word">Incomplete</button>
      <button className="wordbutton legend-button complete-success" title="you guessed this word correctly!">Success!</button>
      <button className="wordbutton legend-button complete-fail" title="you got this word wrong">Fail!</button>

    </div>
  );
};

export default WordbankLegend;
