import { stateType } from "../typings";
import positive from "../sound/positive.mp3";
import negative from "../sound/error.mp3";
import winner from "../sound/levelUp.mp3";

const initialState: stateType = {
  countries: [],
  fourCountries: [],
  type: false,
  country: null,
  checked: false,
  trial: 3,
  correctAnswer: 0,
  end: false,
  positiveSound: new Audio(positive),
  negativeSound: new Audio(negative),
  winSound: new Audio(winner),
};

export { initialState };
