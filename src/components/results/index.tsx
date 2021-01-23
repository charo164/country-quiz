import React from "react";
import undraw_winners from "../../img/undraw_winners_ao2o2.svg";

export default function Results({ correctAnswer, tryAgain }) {
  return (
    <>
      <span className="undraw_winnersC">
        <img
          src={undraw_winners}
          className="undraw_winners"
          alt="undraw_winners_img"
        />
      </span>
      <h2 className="resultText">Results</h2>
      <p className="result">
        You got <b> {correctAnswer} </b> correct answers
      </p>
      <button className="tryAgain" onClick={tryAgain}>
        Try again
      </button>
    </>
  );
}
