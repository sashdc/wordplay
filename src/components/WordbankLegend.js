import React from "react";

const WordbankLegend = () => {
  return (
    <div className="wordbank-legend">
      <button
        className="wordbutton legend-button incomplete"
        title="You didn't complete the round for this word"
      >
        Incomplete
      </button>
      <button
        className="wordbutton legend-button complete-success"
        title="You guessed this word correctly!"
      >
        Success!
      </button>
      <button
        className="wordbutton legend-button complete-fail"
        title="You got this word wrong"
      >
        Fail!
      </button>
    </div>
  );
};

export default WordbankLegend;
