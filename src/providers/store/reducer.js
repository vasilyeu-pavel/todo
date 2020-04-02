import { ADD, COMPLETE_ALL } from './constants';

// todo update

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
        default:
            throw new Error();
    }
};

export default reducer;

