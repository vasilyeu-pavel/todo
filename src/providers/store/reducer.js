import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND } from './constants';

const reducer = (state, { payload, type }) => {
    switch (type) {
        case ADD: {
            return {
                tasks: state.tasks.concat(payload),
            }
        }
        case COMPLETE_ALL: {
            const { tasks } = state;

            return {
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
                tasks: tasks
                    .map((task, index) => ({ ...task, index })),
            };
        }
        default:
            throw new Error();
    }
};

export default reducer;

