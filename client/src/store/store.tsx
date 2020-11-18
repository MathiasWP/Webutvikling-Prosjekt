import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SET USER':
        const newStateUser = {
            ...state,
            user: action.payload.user_details,
            auth: action.payload.auth,
        };
        return newStateUser;

      case 'ADD QUIZ':
        const newStateQuizAdd = {
          ...state,
          user: {
            ...state.user,
            quizes: [...state.user.quizes, action.payload]
          }
        }
        return newStateQuizAdd;
      case 'REMOVE QUIZ':
          const newStateQuizRemove = {
            ...state,
            user: {
              ...state.user,
              quizes: state.user.quizes.filter(q => q.quizid !== action.payload.id)
            }
          }
          return newStateQuizRemove;
      default:
        throw new Error();
    }
  }, initialState);

  return (
      <Provider value={{ state, dispatch }}>
        {children}
      </Provider>
      );
};

export { store, StateProvider }