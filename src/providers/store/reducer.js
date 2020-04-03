import { ADD, COMPLETE_ALL, HANDLE_COMPLETE } from './constants';

const reducer = (state, { payload, type }) => {
    switch (type) {
        case ADD: {
            return {
                tasks: state.tasks.concat(payload)
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
        default:
            throw new Error();
    }
};

export default reducer;

