import React, { useState, useEffect, useCallback } from "react";
import topbar from "topbar";
import Quiz from "./components/quiz";
import Loader from "./components/loader";
import Error from "./components/error";
import "./App.scss";
import github from "./img/github.png";

export default function App() {
  const [countries, setCountries] = useState<any[]>(["default"]);
  const [fourCountries, setFourCountries] = useState<any[]>(["default"]);
  const [type, setType] = useState(false);
  const [country, setCountry] = useState<any>({});

  topbar.config({
    autoRun: true,
    barThickness: 3,
    barColors: {
      0: "#f9a826",
    },
    shadowBlur: 10,
    shadowColor: "rgba(0,   0,   0,   .6)",
  });

  const randomFilter = useCallback(async (data) => {
    topbar.show();
    let e;
    let f;
    let g;
    let h;
    let theFourCountries: any = [];
    while (theFourCountries.length !== 4) {
      const fn = genFourNumb();
      //selected four countries from the four numbers at random
      e = data[fn.b];
      f = data[fn.a];
      g = data[fn.c];
      h = data[fn.d];
      let i = [e, f, g, h];
      theFourCountries = checkCountriesData(i);
    }

    if ((await theFourCountries.length) === 4) {
      setFourCountries(theFourCountries);
    }

    choiceOneCountry(h, f, e, g);

    typeOfQuestion();

    topbar.hide();
  }, []);

  // randomly generated four numbers between 0 and 250
  const genFourNumb = () => {
    let a = Math.round(Math.random() * 250);
    let b = Math.round(Math.random() * 250);
    while (a === b) {
      b = Math.round(Math.random() * 250);
    }
    let c = Math.round(Math.random() * 250);
    while (c === b || c === a) {
      c = Math.round(Math.random() * 250);
    }
    let d = Math.round(Math.random() * 250);
    while (d === c || d === b || d === a) {
      d = Math.round(Math.random() * 250);
    }
    return {
      a,
      b,
      c,
      d,
    };
  };

  //does not return invalid data
  const checkCountriesData = (i) => {
    const result = i.filter((e) => {
      if (e) {
        if (e.name && e.capital && e.flag) {
          return e.name.length > 1 && e.capital.length > 1 && e.flag.length > 1;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
    return result;
  };
  //choose a country at random among the four already selected
  const choiceOneCountry = (h, f, e, g) => {
    const m = Math.round(Math.random() * 3);

    if (m === 0) {
      setCountry(h);
    } else if (m === 1) {
      setCountry(f);
    } else if (m === 2) {
      setCountry(g);
    } else {
      setCountry(e);
    }
  };
  //randomly selected type of question
  const typeOfQuestion = () => {
    const tOQ = Math.round(Math.random() * 1);
    tOQ === 1 ? setType(true) : setType(false);
  };

  useEffect(() => {
    const getData = async () => {
      topbar.show();
      const data = await fetch("https://restcountries.eu/rest/v2/all");
      const dataJson = await data.json();
      return dataJson;
    };

    getData()
      .then((data) => {
        if (data.length < 250) {
          setCountries(["error"]);
          topbar.hide();
        } else {
          setCountries(data);
          randomFilter(data);
        }
      })
      .catch((e) => {
        setCountries(["error"]);
        topbar.hide();
      });
  }, [randomFilter]);

  let content;
  if (typeof fourCountries[0] === "string") {
    if (fourCountries[0] === "default") {
      content = <Loader />;
    } else {
      content = <Error />;
    }
  } else {
    content = (
      <Quiz
        countries={countries}
        fourCountries={fourCountries}
        type={type}
        country={country}
        randomFilter={randomFilter}
      />
    );
  }

  return (
    <main>
      <a
        href="https://github.com/charo164"
        target="_blank"
        rel="noopener noreferrer"
        className="myGithub"
      >
        <img src={github} alt="github-log" />
      </a>
      <div className="container">{content}</div>
      <div className="author">
        <a rel="noreferrer" href="https://github.com/charo164" target="_blank">
          Jules Jacques Coly
        </a>
        @
        <a
          href="https://DevChallenges.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          DevChallenges.io
        </a>
      </div>
    </main>
  );
}
