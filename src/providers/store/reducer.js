import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND, SIGN_IN } from '../../constants';

const reducer = (state, { payload, type }) => {
    switch (type) {
        case SIGN_IN: {
            return {
                ...state,
                user: payload,
            };
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
            const { id } = payload;

            return {
                ...state,
                tasks: tasks
                    .filter((task) => task.id !== id)
                    // for dnd
                    .map((task, i) => ({
                        ...task,
                        index: i,
                    })),
            }
        }
        case HANDLE_COMPLETE: {
            const { tasks } = state;
            const { id } = payload;

            return {
                ...state,
                tasks: tasks.map((task) => {
                    if (task.id === id) {
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
            const { id, description } = payload;

            return {
                ...state,
                tasks: tasks.map((task) => {
                    if (task.id === id) {
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
        default:
            throw new Error();
    }
};

export default reducer;

