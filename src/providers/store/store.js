import React, { createContext, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HANDLE_CONNECTION } from '../../constants';

import Firebase from '../../utils/Firebase';
import config from '../../config';

import { reducer,initialState } from './reducer';

const store = createContext(initialState);

const { Provider } = store;

const firebase = new Firebase();

const StateProvider = ({ children }) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleConnection = (status) => {
        dispatch({
           type: HANDLE_CONNECTION,
           payload: { status }
        });
    };

    useEffect(() => {
        firebase.checkConnection(handleConnection);
    }, []);

    // сохраняем состояние в локал сторадже
    useEffect(() => {
        localStorage.setItem(config.storageKey, JSON.stringify(state))
    }, [state]);

    const getState = () => state;

    // dispatcher - функция которая привязывает dispatch к экшенам
    const dispatcher = (callbacks = {}) => {
        const functions = {};

        // пробрасываем в экшены, для вынесения всей бизнес логики в экшен крейторы
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

    const value = React.useMemo(() => ({ state, dispatch, dispatcher }), [state]);

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};

export { store, StateProvider };
