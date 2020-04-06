import {
    ADD,
    COMPLETE_ALL,
    HANDLE_COMPLETE,
    REMOVE,
    UPDATE,
    SORT_DND,
    SIGN_IN,
    SET,
    LOADING,
    LOADED,
    HANDLE_CONNECTION,
} from '../../constants';

export const mockTasks = [
    {
        uid: '1',
        index: 0,
        description: 'Test1',
        isCompleted: false,
    },
    {
        uid: '2',
        index: 1,
        description: 'Test2',
        isCompleted: false,
    },
];

export const initialState = {
    loading: false,
    isConnected: true,
    user: {},
    tasks: [],
};

export const reducer = (state, { payload, type }) => {
    switch (type) {
        case SIGN_IN: {
            return {
                ...state,
                user: payload,
            };
        }
        case SET: {
            return {
                ...state,
                loading: false,
                tasks: payload,
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case LOADED: {
            return {
                ...state,
                loading: false,
            }
        }
        case ADD: {
            return {
                ...state,
                tasks: state.tasks.concat(payload),
            }
        }
        case COMPLETE_ALL: {
            const { tasks } = state;

            return {
                ...state,
                tasks: tasks.map((task) => ({
                    ...task,
                    isCompleted: true,
                })),
            }
        }
        case REMOVE: {
            const { tasks } = state;
            const { uid } = payload;

            return {
                ...state,
                tasks: tasks
                    .filter((task) => task.uid !== uid)
                    // for dnd
                    .map((task, i) => ({
                        ...task,
                        index: i,
                    })),
            }
        }
        case HANDLE_COMPLETE: {
            const { tasks } = state;
            const { uid } = payload;

            return {
                ...state,
                tasks: tasks.map((task) => {
                    if (task.uid === uid) {
                        return {
                            ...task,
                            isCompleted: !task.isCompleted,
                        };
                    }

                    return task;
                }),
            }
        }

        case UPDATE: {
            const { tasks } = state;
            const { uid, description } = payload;

            return {
                ...state,
                tasks: tasks.map((task) => {
                    if (task.uid === uid) {
                        return {
                            ...task,
                            description,
                        };
                    }

                    return task;
                }),
            }
        }
        case SORT_DND: {
            const { tasks } = payload;

            return {
                ...state,
                tasks: tasks
                    .map((task, index) => ({ ...task, index })),
            };
        }
        case HANDLE_CONNECTION: {
            const { status } = payload;

            return {
                ...state,
                isConnected: status,
            };
        }
        default:
            throw new Error();
    }
};

export default reducer;

