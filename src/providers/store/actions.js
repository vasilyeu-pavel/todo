import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE } from './constants';

import { withAllFields } from '../../mixins';

export const addTask = async ({ dispatch }, values) => {
    return dispatch({
        type: ADD,
        payload: withAllFields(values),
    });
};

export const completeAll = async ({ dispatch }) => {
    return dispatch({
        type: COMPLETE_ALL,
    });
};

export const handleComplete = async ({ dispatch }, id) => {
    return dispatch({
        type: HANDLE_COMPLETE,
        payload: { id }
    });
};

export const removeTask = async ({ dispatch }, id) => {
    return dispatch({
        type: REMOVE,
        payload: { id }
    });
};
