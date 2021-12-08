import type { Dispatch } from 'react';
import { countryType } from './api';
import actions from '@/reducer/actions';

export interface Answer {
  name: string;
  capital: string;
  flag: string;
}

export interface Question {
  text: string;
  img?: string;
}

export interface stateType {
  countries: countryType[];
  fourCountries: Answer[];
  correctAnswerId: number | null;
  checked: boolean;
  trial: number;
  correctAnswer: number;
  end: boolean;
  positiveSound: HTMLAudioElement;
  negativeSound: HTMLAudioElement;
  winSound: HTMLAudioElement;
  page: 'quiz' | 'result';
  loadImg: boolean;
  question: { text: string; img?: string };
}

export interface AppContextType {
  state: stateType;
  dispatch: Dispatch<ActionType>;
}
export interface ActionType {
  type: keyof typeof actions;
  value: any;
}

export type ReducerType = (state: stateType, action: ActionType) => stateType;
