import React, { createContext, useReducer } from 'react';
import { ADD } from './constants';

const initialState = {
    tasks: [],
};

const store = createContext(initialState);

const { Provider } = store;

const reducer = (state, { payload, type }) => {
    switch (type) {
        case ADD: {
            return {
                tasks: state.tasks.concat(payload)
            }
        }
        default:
            throw new Error();
    }
};

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getState = () => state;

    const dispatcher = (callbacks = {}) => {
        const functions = {};

        for (const cbName in callbacks) {
            functions[cbName] = callbacks[cbName].bind(null, { dispatch, getState });
        }

        return functions;
    };

    return (
        <Provider value={{ state, dispatch, dispatcher }}>
            {children}
        </Provider>
    );
};

export { store, StateProvider };
