import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND } from '../../constants';
import { withAllFields, withIndex } from '../../mixins';

export const addTask = ({ dispatch, getState }, values) => {
    const { tasks } = getState();

    const index = tasks.length;

    return dispatch({
        type: ADD,
        // index for dnd
        payload: withIndex(withAllFields(values), index),
    });
};

export const updateTask = ({ dispatch }, task) => {
    return dispatch({
        type: UPDATE,
        payload: task,
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

export const sortByDnD = ({ dispatch, getState }, { id: dragItemId }, { id: dropItemId }) => {
    const { tasks } = getState();
    const copiedTasks = [...tasks].sort((a, b) => a.index - b.index);

    const drag = tasks.find(({ id }) => id === dragItemId);
    const drop = tasks.find(({ id }) => id === dropItemId);

    if (drag.index === drop.index) return;

    copiedTasks.splice(drag.index, 1);

    if (drag.index < drop.index) {
        copiedTasks.push(drag);
    } else {
        copiedTasks.splice(drop.index, 0, drag);
    }

    return dispatch({
        type: SORT_DND,
        payload: {
            tasks: copiedTasks,
        }
    });
};
