import { useReducer, createContext, ContextType, Reducer } from 'react';
import { AuthContextStateType, AuthContextDispatchActionsType, AuthContextActionsType } from './AuthContext';
import { Action } from './utils';

export interface createDataContextType {
  Context: ContextType<any>,
  Provider: (children: { children: JSX.Element }) => JSX.Element
}

type ContextActionsType = AuthContextActionsType;
type ContextDispatchActionsType = AuthContextDispatchActionsType;
type ContextStateType = AuthContextStateType;

export const createDataContext = (
  reducer: Reducer<ContextStateType, Action>,
  actions: ContextDispatchActionsType,
  defaultValue: ContextStateType
): createDataContextType => {
  const Context = createContext({ state: defaultValue });

  const Provider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {} as ContextActionsType;
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
