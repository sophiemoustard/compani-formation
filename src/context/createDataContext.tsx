import { useReducer, createContext, ContextType } from 'react';
import { AuthContextStateType, AuthContextDispatchActionsType } from './AuthContext';
import { ActionType } from './types';

export interface createDataContextType {
  Context: ContextType<any>,
  Provider: (children: { children: JSX.Element }) => JSX.Element
}

type ContextStateType = AuthContextStateType
type ContextDispatchActionsType = AuthContextDispatchActionsType;

export const createDataContext = (
  reducer: (state: ContextStateType, action: ActionType) => ContextStateType,
  actions: ContextDispatchActionsType,
  defaultValue: ContextStateType
): createDataContextType => {
  const Context = createContext(defaultValue);

  const Provider = ({ children }: { children: JSX.Element }) => {
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
