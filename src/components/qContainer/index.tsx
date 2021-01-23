import React from "react";
import undraw_adventure from "../../img/undraw_adventure_4hum 1.svg";
export default function QContainer({
  fourCountries,
  checker,
  type,
  country,
  checked,
  next,
}) {
  return (
    <>
      <div className="quizContainer">
        {/*==== Questions ====*/}

        {type ? ( //defines the type of question
          <h2>
            <span>
              <img src={country.flag} alt="country-flag" />
            </span>
            Which country does this flag belong to?
          </h2>
        ) : (
          <h2>
            {" "}
            <b>{country.capital}</b> is the capital of{" "}
          </h2>
        )}
        {/*==== Choices ====*/}

        <p className="A answer" onClick={checker}>
          {fourCountries[1].name}{" "}
        </p>
        <p className="B answer" onClick={checker}>
          {fourCountries[2].name}{" "}
        </p>
        <p className="C answer" onClick={checker}>
          {fourCountries[0].name}{" "}
        </p>
        <p className="D answer" onClick={checker}>
          {fourCountries[3].name}{" "}
        </p>
        {/*==== Button ====*/}

        {checked ? ( //disable the next button if there is no selection
          <button onClick={next} className="next">
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
}
