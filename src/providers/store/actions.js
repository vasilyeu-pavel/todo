import { ADD } from './constants';

const withId = obj => ({
  ...obj,
  id: Date.now(),
});

export const addTask = async ({ getState, dispatch }, values) => {
    return dispatch({
        type: ADD,
        payload: withId(values),
    });
};
