import { Dispatch } from "react";

interface fourNumb {
  numb1: number;
  numb2: number;
  numb3: number;
  numb4: number;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Translations {
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
}

interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

interface countryType {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
}

interface stateType {
  countries: countryType[];
  fourCountries: countryType[];
  type: boolean;
  country: countryType | null;
  checked: boolean;
  trial: number;
  correctAnswer: number;
  end: boolean;
  positiveSound: HTMLAudioElement;
  negativeSound: HTMLAudioElement;
  winSound: HTMLAudioElement;
}

interface appContextType {
  state: stateType;
  dispatch: Dispatch<actionType>;
}
interface actionType {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

type reducerType = (state: stateType, action: actionType) => stateType;

export type { fourNumb, countryType, stateType, appContextType, reducerType, actionType };
