import topbar from 'topbar';

import type { Answer, AppContextType, Question } from 'types';
import type { countryType } from 'types/api';

const chooseFourCountries = (data: countryType[]): Answer[] => {
  const rn = generateFourRandomNumbs(data.length);
  const countries = data.filter((e, i) => rn.includes(i)).sort(() => (Math.random() > 0.5 ? 1 : -1));
  return countries.map((c) => {
    const name = c.name?.common || '';
    const capital = c.capital && c.capital[0] ? c.capital[0] : '';
    const flag = c.flags?.png || c.flags?.svg || '';
    return { name, capital, flag };
  });
};

const generateFourRandomNumbs = (length: number): number[] => [
  Math.floor(Math.random() * 50),
  Math.floor(Math.random() * (100 - 50) + 50),
  Math.floor(Math.random() * (150 - 100) + 100),
  Math.floor(Math.random() * (length - 150) + 150),
];

const generateQuestion = ({ capital, flag }: Answer): Question => {
  const rn = Math.round(Math.random());
  const text = rn ? 'Which country does this flag belong to?' : `${capital} is the capital of`;
  const value: Question = { text };
  if (rn) value.img = flag;
  return value;
};

const checkCountriesData = (countries: Answer[]): boolean => {
  const result = countries.filter((a) => a.name?.length > 1 && a.capital?.length > 1 && a.flag?.length > 1);
  return result.length === 4;
};

export const tryAgain = (app: AppContextType): void => {
  app.dispatch({ type: 'resetCorrectAnswer', value: '' });
  app.dispatch({ type: 'setPage', value: 'quiz' });
  app.dispatch({ type: 'resetTrial', value: '' });
};

export const next = (app: AppContextType): void => {
  app.dispatch({ type: 'setLoadImg', value: true });
  document.querySelectorAll('.answer').forEach((f) => {
    f.classList.add('hover');
    f.classList.remove('correctAnswer');
    f.classList.remove('incorrectAnswer');
  });

  if (app.state.trial > 0) {
    app.dispatch({ type: 'setChecked', value: false });
    selectCountries(app?.state.countries, app);
  } else {
    app.dispatch({ type: 'setPage', value: 'result' });
    app.dispatch({ type: 'setChecked', value: false });
    selectCountries(app?.state.countries, app);
    app.state.winSound.play();
  }
};

const getId = (el: HTMLElement) => parseInt(el.id.split('-')[1]);

export const checker = (e, { state, dispatch }: AppContextType): void => {
  const { checked, positiveSound, negativeSound, correctAnswerId } = state;

  if (checked) return;

  const answers: NodeListOf<HTMLElement> | null = document.querySelectorAll('.answer');

  if (answers) answers.forEach((l) => l.classList.remove('hover'));

  if (getId(e.target) === correctAnswerId) {
    e.target?.classList.add('correctAnswer');
    dispatch({ type: 'incrementCorrectAnswer', value: '' });
    positiveSound.play();
  } else {
    dispatch({ type: 'decrementTrial', value: '' });
    e.target?.classList.add('incorrectAnswer');
    answers.forEach((l) => {
      if (getId(l) === correctAnswerId) l.classList.add('correctAnswer');
    });
    negativeSound.play();
  }
  dispatch({ type: 'setChecked', value: true });
};

export const selectCountries = (data: countryType[], app: AppContextType): void => {
  topbar.show();

  let fourCounties = chooseFourCountries(data);

  while (!checkCountriesData(fourCounties)) fourCounties = chooseFourCountries(data);

  const i = Math.floor(Math.random() * 4);

  const correctCountry = fourCounties[i];

  app?.dispatch({ type: 'setFourCountries', value: fourCounties });
  app?.dispatch({ type: 'setCorrectAnswerId', value: i });
  app?.dispatch({ type: 'setQuestion', value: generateQuestion(correctCountry) });

  topbar.hide();
};

export const fetchCountries = async (): Promise<countryType[]> => {
  const data = await fetch('https://restcountries.com/v3.1/all');
  return data.json();
};
