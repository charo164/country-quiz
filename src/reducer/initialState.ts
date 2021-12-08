import { stateType } from 'types';

const initialState: stateType = {
  countries: [],
  fourCountries: [],
  question: { text: 'loading...' },
  page: 'quiz',
  correctAnswerId: null,
  checked: false,
  trial: 3,
  correctAnswer: 0,
  end: false,
  loadImg: true,
  positiveSound: (() => {
    const audio = new Audio('public/sound/positive.mp3');
    audio.volume = 0.06;
    return audio;
  })(),
  negativeSound: (() => {
    const audio = new Audio('public/sound/error.mp3');
    audio.volume = 0.06;
    return audio;
  })(),
  winSound: (() => {
    const audio = new Audio('public/sound/levelUp.mp3');
    audio.volume = 0.06;
    return audio;
  })(),
};

export { initialState };
