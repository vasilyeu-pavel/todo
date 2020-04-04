import React, { createContext, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Firebase from '../../utils/Firebase';

import reducer from './reducer';

const initialState = {
    loading: false,
    user: {},
    tasks: [
        // {
        //     id: '1',
        //     index: 0,
        //     description: 'Test1',
        //     isCompleted: false,
        // },
        // {
        //     id: '2',
        //     index: 1,
        //     description: 'Test2',
        //     isCompleted: false,
        // },
    ],
};

const store = createContext(initialState);

const { Provider } = store;
const storageKey = 'store';

const firebase = new Firebase();

const StateProvider = ({ children }) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState,
        // (defaultState) => {
        //     const persisted = JSON.parse(localStorage.getItem(storageKey) || 'null');
        //
        //     return persisted !== null
        //         ? persisted
        //         : defaultState;
        // }
    );

    // useEffect(() => {
    //     localStorage.setItem(storageKey, JSON.stringify(state))
    // }, [state]);

    const getState = () => state;

    const dispatcher = (callbacks = {}) => {
        const functions = {};

        for (const cbName in callbacks) {
            functions[cbName] = callbacks[cbName].bind(null, {
                dispatch,
                getState,
                history,
                firebase
            });
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
