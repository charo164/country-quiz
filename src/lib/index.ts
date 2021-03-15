import { appContextType, countryType, fourNumb } from "../typings";
import topbar from "topbar";

const checkCountriesData = (countries: countryType[]): boolean => {
  const result = countries.filter((e) => {
    return e.name.length > 1 && e.capital.length > 1 && e.flag.length > 1;
  });
  return result.length === 4;
};
const tryAgain = (app: appContextType): void => {
  app.dispatch({ type: "setCorrectAnswer", value: 0 });
  app.dispatch({ type: "setEnd", value: false });
  app.dispatch({ type: "setTrial", value: 3 });
};

const next = (app: appContextType): void => {
  document.querySelectorAll("label").forEach((f) => {
    f.classList.add("hover");
    f.classList.remove("correctAnswer");
    f.classList.remove("incorrectAnswer");
  });
  if (app.state.trial > 0) {
    app.dispatch({ type: "setChecked", value: false });
    selectCountries(app?.state.countries, app);
  } else {
    app.dispatch({ type: "setEnd", value: true });
    app.dispatch({ type: "setChecked", value: false });
    selectCountries(app?.state.countries, app);
    app.state.winSound.play();
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checker = (e, app: appContextType): void => {
  if (!app.state.checked) {
    const labels: NodeListOf<HTMLLabelElement> | null = document.querySelectorAll(
      "label"
    );
    const label: HTMLLabelElement | null = document.querySelector(`.${e.target.id}`);

    if (labels) labels.forEach((l) => l.classList.remove("hover"));
    if (e.target.value === app?.state.country?.name && label) {
      label.classList.add("correctAnswer");
      app.dispatch({
        type: "setCorrectAnswer",
        value: app.state.correctAnswer + 1,
      });
      app.state.positiveSound.play();
    } else if (label) {
      if (app.state.trial > 0)
        app.dispatch({
          type: "setTrial",
          value: app.state.trial - 1,
        });
      label.classList.add("incorrectAnswer");
      labels.forEach((l) => {
        const input: HTMLInputElement | null = document.querySelector(`#${l.htmlFor}`);
        if (input) {
          if (input.value === app?.state.country?.name) {
            l.classList.add("correctAnswer");
          }
        }
      });
      app.state.negativeSound.play();
    }
    app.dispatch({ type: "setChecked", value: true });
  }
};

const chooseFourCountries = (data: countryType[]): countryType[] => {
  const frn = generateFourRandomNumbs();
  return data.filter(
    (el, i) => i === frn.numb1 || i === frn.numb2 || i === frn.numb3 || i === frn.numb4
  );
};

const generateFourRandomNumbs = (): fourNumb => ({
  numb1: Math.floor(Math.random() * 50),
  numb2: Math.floor(Math.random() * (100 - 50) + 50),
  numb3: Math.floor(Math.random() * (150 - 100) + 100),
  numb4: Math.floor(Math.random() * (250 - 150) + 150),
});

const typeOfQuestion = (): boolean => Math.round(Math.random() * 1) === 1;

const selectCountries = (data: countryType[], app: appContextType): void => {
  topbar.show();
  let theFourCountries;
  let isValidData = !false;
  while (isValidData) {
    theFourCountries = chooseFourCountries(data);
    if (checkCountriesData(theFourCountries)) isValidData = false;
  }
  if (app) {
    app.dispatch({ type: "setFourCountries", value: theFourCountries });
    app.dispatch({
      type: "setCountry",
      value: theFourCountries[Math.floor(Math.random() * 4)],
    });
    app.dispatch({
      type: "setType",
      value: typeOfQuestion(),
    });
  }
  topbar.hide();
};

const getCountries = async (): Promise<countryType[]> => {
  topbar.show();
  const data = await fetch("https://restcountries.eu/rest/v2/all");
  return data.json();
};

export {
  generateFourRandomNumbs,
  checkCountriesData,
  chooseFourCountries,
  typeOfQuestion,
  selectCountries,
  getCountries,
  checker,
  next,
  tryAgain,
};
