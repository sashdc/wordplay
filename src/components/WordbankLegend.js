import React from "react";

const WordbankLegend = () => {
  return (
    <div className="wordbank-legend">
      <button className="wordbutton legend-button incomplete">Incomplete</button>
      <button className="wordbutton legend-button complete-success">Success!</button>
      <button className="wordbutton legend-button complete-fail">Fail!</button>

    </div>
  );
};

export default WordbankLegend;
