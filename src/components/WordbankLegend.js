import React, { useEffect } from "react";

const WordbankLegend = () => {

  useEffect(() => {
    // Enable Bootstrap tooltips
    const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, []);


  return (
    <div className="wordbank-legend">
      <button
        className="wordbutton legend-button incomplete"
        title="You didn't complete the round for these words"  data-bs-custom-class="dep-tooltip"
        data-toggle="tooltip"
        data-placement="bottom"
      >
        Incomplete
      </button>
      <button
        className="wordbutton legend-button complete-success"
        title="You guessed these words correctly!"
        data-bs-custom-class="dep-tooltip"
        data-toggle="tooltip"
        data-placement="bottom"
      >
        Success!
      </button>
      <button
        className="wordbutton legend-button complete-fail"
        title="You got these words wrong"
        data-bs-custom-class="dep-tooltip"
        data-toggle="tooltip"
        data-placement="bottom"
      >
        Fail!
      </button>
    </div>
  );
};

export default WordbankLegend;
