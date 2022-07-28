import { useReducer, createContext, ContextType } from 'react';
import * as React from 'react';
import { StateType } from './AuthContext';

export interface createDataContextType {
  Context: ContextType<any>,
  Provider: (children: {children: React.ReactNode}) => JSX.Element
}

export default (reducer: (state: StateType, actions) => StateType, actions, defaultValue): createDataContextType => {
  const Provider = ({ children }: {children: React.ReactNode}) => {
    const [{ companiToken, loading, error, errorMessage, appIsReady },
      dispatch] = useReducer(reducer, defaultValue);
    const state = { companiToken, loading, error, errorMessage, appIsReady };

    const boundActions = {};
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ ...state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  const Context = createContext(defaultValue);

  return { Context, Provider };
};
