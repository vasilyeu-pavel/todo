import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE } from './constants';

import { withAllFields, withIndex } from '../../mixins';

export const addTask = ({ dispatch, getState }, values) => {
    const { tasks } = getState();

    const index = tasks.length;

    return dispatch({
        type: ADD,
        payload: withIndex(withAllFields(values), index),
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
