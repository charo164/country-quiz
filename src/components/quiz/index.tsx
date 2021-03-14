import React, { useState } from "react";
import useSound from "use-sound";
import positive from "../../sound/positive.mp3";
import negative from "../../sound/error.mp3";
import winner from "../../sound/levelUp.mp3";
import Results from "../results";
import QContainer from "../qContainer";

export default function Quiz({
  countries,
  fourCountries,
  type,
  country,
  selectCountries,
}) {
  const [checked, setChecked] = useState(false);
  const [trial, setTrial] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [end, setEnd] = useState(false);
  const [positiveSound] = useSound(positive);
  const [negativeSound] = useSound(negative);
  const [winnerSound] = useSound(winner);

  const checker = (e) => {
    if (!checked) {
      if (e.target.innerHTML.trim() === country.name.trim()) {
        e.target.classList.add("correctAnswer");

        setCorrectAnswer(correctAnswer + 1);

        const p = document.querySelectorAll("p");
        p.forEach((f) => {
          if (f.className.search("correctAnswer") === -1) {
            f.classList.add("noHover");
          }
        });

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

          if (
            f.className.search("correctAnswer") === -1 &&
            f.className.search("incorrectAnswer") === -1
          ) {
            f.classList.add("noHover");
          }
        });

        negativeSound();
      }
      setChecked(true);
    }
  };
  const next = () => {
    const p = document.querySelectorAll(".noHover");
    p.forEach((f) => {
      f.classList.remove("noHover");
    });

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
      selectCountries(countries);
    } else {
      setEnd(true);
      setChecked(false);
      selectCountries(countries);
      winnerSound();
    }
  };

  const tryAgain = () => {
    setCorrectAnswer(0);
    setEnd(false);
    setTrial(3);
  };

  return (
    <>
      <h1>COUNTRY QUIZ</h1>{" "}
      <section>
        {end ? ( //switch between quiz container and result container
          <Results correctAnswer={correctAnswer} tryAgain={tryAgain} />
        ) : (
          <QContainer
            fourCountries={fourCountries}
            checker={checker}
            type={type}
            country={country}
            checked={checked}
            next={next}
          />
        )}
      </section>
    </>
  );
}
