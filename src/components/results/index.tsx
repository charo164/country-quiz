import React, { useContext } from "react";
import undraw_winners from "../../img/undraw_winners_ao2o2.svg";
import { tryAgain } from "../../lib";
import { AppContext } from "../../reducer/provider";

const Results: React.FC = () => {
  const app = useContext(AppContext);
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
        You got <b> {app?.state.correctAnswer} </b> correct answers
      </p>
      <button
        className="tryAgain"
        onClick={() => {
          if (app) tryAgain(app);
        }}
      >
        Try again
      </button>
    </>
  );
};

export default Results;
