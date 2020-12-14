import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import "./App.scss";

export default function App() {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
    return () => {};
  }, []);

  const container =
    countries.length < 10 ? (
      <div className="loader"></div>
    ) : (
      <>
        <h1>COUNTRY QUIZ</h1>
        <Quiz countries={countries} />
      </>
    );

  return (
    <main>
      <div className="container">{container}</div>
      <div className="author">Jules Jacques Coly @ DevChallenges.io</div>
    </main>
  );
}
