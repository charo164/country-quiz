import React, { useContext } from "react";
import undraw_adventure from "../../img/undraw_adventure_4hum 1.svg";
import { AppContext } from "../../reducer/provider";
import { checker, next } from "../../lib";
const Question: React.FC = () => {
  const app = useContext(AppContext);
  const country = app?.state.country;
  const type = app?.state.type;
  let fourCountries;
  if (app?.state.fourCountries) fourCountries = app?.state.fourCountries;
  return (
    <>
      <div className="question">
        {type ? (
          <h2>
            <span>
              <img src={country?.flag} alt="country-flag" />
            </span>
            Which country does this flag belong to?
          </h2>
        ) : (
          <h2>
            {" "}
            <b>{country?.capital}</b> is the capital of{" "}
          </h2>
        )}
        <input
          type="radio"
          name="answer"
          id="answerA"
          value={fourCountries[3].name}
          onClick={(e) => {
            if (app) checker(e, app);
          }}
        />
        <label htmlFor="answerA" className="answerA hover">
          {fourCountries[3].name}
        </label>
        <input
          type="radio"
          name="answer"
          id="answerB"
          value={fourCountries[0].name}
          onClick={(e) => {
            if (app) checker(e, app);
          }}
        />
        <label htmlFor="answerB" className="answerB hover">
          {fourCountries[0].name}
        </label>
        <input
          type="radio"
          name="answer"
          id="answerC"
          value={fourCountries[1].name}
          onClick={(e) => {
            if (app) checker(e, app);
          }}
        />
        <label htmlFor="answerC" className="answerC hover">
          {fourCountries[1].name}
        </label>
        <input
          type="radio"
          name="answer"
          id="answerD"
          value={fourCountries[2].name}
          onClick={(e) => {
            if (app) checker(e, app);
          }}
        />
        <label htmlFor="answerD" className="answerD hover">
          {fourCountries[2].name}
        </label>

        {app?.state.checked ? (
          <button onClick={() => next(app)} className="next">
            Next
          </button>
        ) : (
          <button className="next disabled">Next</button>
        )}
      </div>
      <img
        src={undraw_adventure}
        className="undraw_adventure"
        alt="undraw_adventure_img"
      />
    </>
  );
};

export default Question;
