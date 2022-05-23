import React, { useReducer, useCallback } from 'react';

const myInitialState = {
  counter: 0,
  showTitle: false,
  errors: ['error_01', 'error_02'],
};

const reducer = (state = myInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'add':
      return {
        ...state,
        counter: state.counter++,
      };
    case 'remove':
      return {
        ...state,
        counter: state.counter--,
      };
    case 'addMyNumber':
      return {
        ...state,
        counter: state.counter + payload.myNumber,
      };
    case 'hasErros':
      return {
        ...state,
        errors: state.errors,
      };
    default:
      return state;
  }
};

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
    console.log('payload is ', payload);
  };

  const api = { addToCounter, removeToCounter, addMyCustomNumber, addErrors };

  return { state, api };
};

export default function App() {
  const { state, api } = useCounter();
  return (
    <div className='App'>
      <h1>My Counter App</h1>
      <h2>{state.counter}</h2>
      <button onClick={api.addToCounter}>add</button>
      <button onClick={api.removeToCounter}>remove</button>
      <button onClick={() => api.addMyCustomNumber({ myNumber: 4 })}>
        Add My Custom number
      </button>
      <br /> <br />
      <h2>
        {state.errors.map((item) => {
          return <li>{item}</li>;
        })}
      </h2>
    </div>
  );
}
