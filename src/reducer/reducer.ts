import { reducerType } from "../typings";

export const reducer: reducerType = (state, action) => {
  switch (action.type) {
    case "setFourCountries":
      return { ...state, fourCountries: action.value };
    case "setCountry":
      return { ...state, country: action.value };
    case "setType":
      return { ...state, type: action.value };
    case "setCountries":
      return { ...state, countries: action.value };
    case "setChecked":
      return { ...state, checked: action.value };
    case "setTrial":
      return { ...state, trial: action.value };
    case "setCorrectAnswer":
      return { ...state, correctAnswer: action.value };
    case "setEnd":
      return { ...state, end: action.value };
    default:
      return state;
  }
};
