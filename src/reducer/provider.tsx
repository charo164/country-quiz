import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { appContextType, reducerType } from "../typings";

const AppContext = createContext<appContextType | null>(null);

const AppWrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<reducerType>(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppWrapper };
