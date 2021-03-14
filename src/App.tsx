import React, { useState, useEffect } from "react";
import topbar from "topbar";
import Quiz from "./components/quiz";
import Loader from "./components/loader";
import Error from "./components/error";
import "./App.scss";
import github from "./img/github.png";
import { fourNumb, countryType } from "./typings";

export default function App() {
  const [countries, setCountries] = useState<countryType[]>([]);
  const [fourCountries, setFourCountries] = useState<countryType[]>([]);
  const [type, setType] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<countryType | null>(null);

  const selectCountries = (data) => {
    topbar.show();
    let theFourCountries;
    let isValidData = !false;
    while (isValidData) {
      theFourCountries = chooseFourCountries(data);
      if (checkCountriesData(theFourCountries)) isValidData = false;
    }
    setFourCountries(theFourCountries);
    setCountry(theFourCountries[Math.floor(Math.random() * 4)]);
    setType(typeOfQuestion());
    topbar.hide();
  };

  const chooseFourCountries = (data) => {
    const frn = generateFourRandomNumbs();
    return data.filter(
      (el, i) =>
        i === frn.numb1 || i === frn.numb2 || i === frn.numb3 || i === frn.numb4
    );
  };

  const generateFourRandomNumbs = (): fourNumb => ({
    numb1: Math.floor(Math.random() * 50),
    numb2: Math.floor(Math.random() * (100 - 50) + 50),
    numb3: Math.floor(Math.random() * (150 - 100) + 100),
    numb4: Math.floor(Math.random() * (250 - 150) + 150),
  });

  const checkCountriesData = (countries) => {
    const result = countries.filter((e) => {
      return e.name.length > 1 && e.capital.length > 1 && e.flag.length > 1;
    });
    return result.length === 4;
  };

  const typeOfQuestion = (): boolean => Math.round(Math.random() * 1) === 1;

  const getCountries = async () => {
    topbar.show();
    const data = await fetch("https://restcountries.eu/rest/v2/all");
    return data.json();
  };

  useEffect(() => {
    getCountries()
      .then((data) => {
        setCountries(data);
        selectCountries(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
        topbar.hide();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <Error />;
  } else if (countries.length > 0) {
    content = (
      <Quiz
        countries={countries}
        fourCountries={fourCountries}
        type={type}
        country={country}
        selectCountries={selectCountries}
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
          charo164
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
