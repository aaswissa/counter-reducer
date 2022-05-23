import React, { useReducer, useCallback } from 'react';

const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, myInitialState);

  const addToCounter = useCallback(() => {
    dispatch({ type: 'add' });
  }, []);

  const removeToCounter = useCallback(() => {
    dispatch({ type: 'remove' });
  }, []);

  const addMyCustomNumber = (payload) => {
    dispatch({ payload, type: 'addMyNumber' });
    console.log('payload is ', payload);
  };

  const addErrors = (payload) => {
    dispatch({ payload, type: 'hasErrors' });
    console.log(state.errors);
  };

  const api = { addToCounter, removeToCounter, addMyCustomNumber, addErrors };

  return { state, api };
};
