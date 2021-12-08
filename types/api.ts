export interface Ara {
  official: string;
  common: string;
}

export interface NativeName {
  ara: Ara;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface TND {
  name: string;
  symbol: string;
}

export interface Currency {
  tND: TND;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Language {
  ara: string;
}

export interface Ara {
  official: string;
  common: string;
}

export interface Ce {
  official: string;
  common: string;
}

export interface Cym {
  official: string;
  common: string;
}

export interface Deu {
  official: string;
  common: string;
}

export interface Est {
  official: string;
  common: string;
}

export interface Fin {
  official: string;
  common: string;
}

export interface Fra {
  official: string;
  common: string;
}

export interface Hrv {
  official: string;
  common: string;
}

export interface Hun {
  official: string;
  common: string;
}

export interface Ita {
  official: string;
  common: string;
}

export interface Jpn {
  official: string;
  common: string;
}

export interface Kor {
  official: string;
  common: string;
}

export interface Nld {
  official: string;
  common: string;
}

export interface Per {
  official: string;
  common: string;
}

export interface Pol {
  official: string;
  common: string;
}

export interface Por {
  official: string;
  common: string;
}

export interface Ru {
  official: string;
  common: string;
}

export interface Slk {
  official: string;
  common: string;
}

export interface Spa {
  official: string;
  common: string;
}

export interface Swe {
  official: string;
  common: string;
}

export interface Urd {
  official: string;
  common: string;
}

export interface Zho {
  official: string;
  common: string;
}

export interface Translation {
  ara: Ara;
  ces: Ce;
  cym: Cym;
  deu: Deu;
  est: Est;
  fin: Fin;
  fra: Fra;
  hrv: Hrv;
  hun: Hun;
  ita: Ita;
  jpn: Jpn;
  kor: Kor;
  nld: Nld;
  per: Per;
  pol: Pol;
  por: Por;
  rus: Ru;
  slk: Slk;
  spa: Spa;
  swe: Swe;
  urd: Urd;
  zho: Zho;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Fra {
  f: string;
  m: string;
}

export interface Demonym {
  eng: Eng;
  fra: Fra;
}

export interface Map {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Gini {
  2015: number;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Flag {
  png: string;
  svg: string;
}

export interface CoatOfArm {
  png: string;
  svg: string;
}

export interface countryType {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currency;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Language;
  translations: Translation;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonym;
  flag: string;
  maps: Map;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flag;
  coatOfArms: CoatOfArm;
  startOfWeek: string;
}