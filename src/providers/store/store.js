import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
    tasks: [
        {
            id: '1',
            index: 0,
            task: 'Test1',
            isCompleted: false,
        },
        {
            id: '2',
            index: 1,
            task: 'Test2',
            isCompleted: false,
        },
    ],
};

const store = createContext(initialState);

const { Provider } = store;

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
