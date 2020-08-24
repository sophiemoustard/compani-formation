import React, { useReducer, createContext } from 'react';

interface ProviderProps {
  children: React.Component,
}

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

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

  return { Context, Provider };
};
