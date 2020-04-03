import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE } from './constants';

import { withAllFields } from '../../mixins';

export const addTask = ({ dispatch }, values) => {
    return dispatch({
        type: ADD,
        payload: withAllFields(values),
    });
};

export const updateTask = ({ dispatch }, { id, task }) => {
    return dispatch({
        type: UPDATE,
        payload: { id, task },
    });
};

export const completeAll = ({ dispatch }) => {
    return dispatch({
        type: COMPLETE_ALL,
    });
};

export const handleComplete = ({ dispatch }, id) => {
    return dispatch({
        type: HANDLE_COMPLETE,
        payload: { id }
    });
};

export const removeTask = ({ dispatch }, id) => {
    return dispatch({
        type: REMOVE,
        payload: { id }
    });
};
