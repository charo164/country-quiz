import React, { createContext, useReducer } from 'react';

import { initialState } from './initialState';
import { reducer } from './reducer';

import type { AppContextType, ReducerType } from 'types';

const AppContext = createContext<AppContextType | null>(null);

const AppWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<ReducerType>(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppWrapper };
