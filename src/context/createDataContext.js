import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
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

  Provider.propTypes = {
    children: PropTypes.node,
  };

  return { Context, Provider };
};
