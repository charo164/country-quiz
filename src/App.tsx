import React, { useContext, useEffect, useState } from "react";
import topbar from "topbar";
import Quiz from "./components/quiz";
import "./App.scss";
import github from "./img/github.png";
import { getCountries, selectCountries } from "./lib";
import { AppContext } from "./reducer/provider";

const App: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const app = useContext(AppContext);
  useEffect(() => {
    getCountries()
      .then((data) => {
        app?.dispatch({ type: "setCountries", value: data });
        if (app) selectCountries(data, app);
        setIsLoading(false);
      })
      .catch(() => {  
        setIsError(true);
        setIsLoading(false);
        topbar.hide();
      }); 
  }, []); 

  let content;
  if (isLoading) {
    content = (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else if (isError) {
    content = <h2 className="error">Error ! try refresh page</h2>;
  } else {
    content = (
      <main>
        <a
          href="https://github.com/charo164/country-quiz.git"
          target="_blank"
          rel="noopener noreferrer"
          className="myGithub"
        >
          <img src={github} alt="github-log" />
        </a>
        <div className="container">
          <h1>COUNTRY QUIZ</h1>
          <section>
            <Quiz />
          </section>
        </div>
        <div className="author">
          <a
            rel="noreferrer"
            href="https://github.com/charo164"
            target="_blank"
          >
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

  return content;
};

export default App;
