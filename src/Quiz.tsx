import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import undraw_adventure from "./img/undraw_adventure_4hum 1.svg";
import undraw_winners from "./img/undraw_winners_ao2o 2.svg";
import positive from "./sound/positive.mp3";
import negative from "./sound/error.mp3";
import winner from "./sound/levelUp.mp3";

export default function Quiz({ countries }) {
  const [fourCountries, setFourCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<any>({});
  const [checked, setChecked] = useState<boolean>(false);
  const [trial, setTrial] = useState<number>(3);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [type, setType] = useState(false);
  const [positiveSound] = useSound(positive);
  const [negativeSound] = useSound(negative);
  const [winnerSound] = useSound(winner);

  const randomFilter = (data) => {
    //randomly selected four numbers between 0 and 250
    const a = Math.floor(Math.random() * 250);
    let b = Math.floor(Math.random() * 250);
    while (a === b) {
      b = Math.floor(Math.random() * 250);
    }
    let c = Math.floor(Math.random() * 250);
    while (c === b || c === a) {
      c = Math.floor(Math.random() * 250);
    }
    let d = Math.floor(Math.random() * 250);
    while (d === c || d === b || d === a) {
      d = Math.floor(Math.random() * 250);
    }

    //selected four countries from the four numbers at random
    const e = data[a];
    const f = data[b];
    const g = data[c];
    const h = data[d];
    setFourCountries([e, f, g, h]);

    //choose a country at random among the four already selected
    const i = Math.floor(Math.random() * 4);
    if (i === 1) {
      setCountry(data[a]);
    } else if (i === 2) {
      setCountry(data[b]);
    } else if (i === 3) {
      setCountry(data[c]);
    } else {
      setCountry(data[d]);
    }

    //randomly selected type of question
    const j = Math.floor(Math.random() * 2);
    j === 1 ? setType(true) : setType(false);
  };

  useEffect(() => {
    randomFilter(countries);
    return () => {};
    // eslint-disable-next-line
  }, []);

  const checker = (e) => {
    if (!checked) {
      if (e.target.innerHTML.trim() === country.name.trim()) {
        e.target.classList.add("correctAnswer");
        setCorrectAnswer(correctAnswer + 1);
        positiveSound();
      } else {
        if (trial > 0) {
          setTrial(trial - 1);
        }
        e.target.classList.add("incorrectAnswer");
        const p = document.querySelectorAll("p");
        p.forEach((f) => {
          if (f.innerHTML.trim() === country.name.trim()) {
            f.classList.add("correctAnswer");
          }
        });
        negativeSound();
      }
      setChecked(true);
    }
  };
  //moves on to the next question
  const next = () => {
    if (trial > 0) {
      const c = document.querySelector(".correctAnswer");
      const ic = document.querySelector(".incorrectAnswer");
      if (c) {
        c.classList.remove("correctAnswer");
      }
      if (ic) {
        ic.classList.remove("incorrectAnswer");
      }
      setChecked(false);
      randomFilter(countries);
    } else {
      setEnd(true);
      setChecked(false);
      randomFilter(countries);
      winnerSound();
    }
  };

  //disable the next button if there is no selection
  const btn = checked ? (
    <button onClick={next} className="next">
      Next
    </button>
  ) : (
    <button className="next disabled">Next</button>
  );

  const tryAgain = () => {
    setCorrectAnswer(0);
    setEnd(false);
    setTrial(3);
  };

  //defines the type of question
  const typeQ = type ? (
    <h2>
      <img src={country.flag} alt="country-flag" />
      Which country does this flag belong to?
    </h2>
  ) : (
    <h2> {country.capital} is the capital of </h2>
  );

  const quizContainer =
    fourCountries.length === 4 ? (
      <div className="quizContainer">
        {typeQ}
        <p className="A answer" onClick={checker}>
          {fourCountries[0].name}{" "}
        </p>
        <p className="B answer" onClick={checker}>
          {fourCountries[1].name}{" "}
        </p>
        <p className="C answer" onClick={checker}>
          {fourCountries[2].name}{" "}
        </p>
        <p className="D answer" onClick={checker}>
          {fourCountries[3].name}{" "}
        </p>
        {btn}
      </div>
    ) : (
      <span className="loader">loading...</span>
    );

  //switch between quiz container and result container
  const sect = end ? (
    <>
      <img
        src={undraw_winners}
        className="undraw_winners"
        alt="undraw_winners_img"
      />
      <h2 className="resultText">Results</h2>
      <p className="result">
        You got <b> {correctAnswer} </b> correct answers
      </p>
      <button className="tryAgain" onClick={tryAgain}>
        Try again
      </button>
    </>
  ) : (
    <>
      {quizContainer}

      <img
        src={undraw_adventure}
        className="undraw_adventure"
        alt="undraw_adventure_img"
      />
    </>
  );

  return <section>{sect}</section>;
}
