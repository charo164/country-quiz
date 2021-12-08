import { ReducerType } from 'types';

import actions from './actions';

export const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case actions.setFourCountries:
      return { ...state, fourCountries: action.value };
    case actions.setLoadImg:
      return { ...state, loadImg: action.value };
    case actions.setCorrectAnswerId:
      return { ...state, correctAnswerId: action.value };
    case actions.setType:
      return { ...state, type: action.value };
    case actions.setCountries:
      return { ...state, countries: action.value };
    case actions.setChecked:
      return { ...state, checked: action.value };
    case actions.decrementTrial:
      return { ...state, trial: state.trial > 0 ? state.trial - 1 : 0 };
    case actions.resetTrial:
      return { ...state, trial: 3 };
    case actions.incrementCorrectAnswer:
      return { ...state, correctAnswer: state.correctAnswer + 1 };
    case actions.resetCorrectAnswer:
      return { ...state, correctAnswer: 0 };
    case actions.setPage:
      return { ...state, page: action.value };
    case actions.setQuestion:
      return { ...state, question: action.value };
    default:
      return state;
  }
};
