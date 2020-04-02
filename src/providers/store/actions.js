import { ADD, COMPLETE_ALL } from './constants';

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
