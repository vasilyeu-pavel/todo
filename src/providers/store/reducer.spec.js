import { reducer, initialState, mockTasks } from './reducer';
import { LOADING, COMPLETE_ALL, REMOVE, UPDATE, ADD } from '../../constants';

const mockState = {
    ...initialState,
    tasks: mockTasks,
};

const [{ uid }] = mockTasks;

describe('<REDUCER>', () => {
    it('should isLoading', () => {
        const action = {
            type: LOADING,
        };

        expect(reducer(mockState, action)).toEqual({
            ...mockState,
            loading: true,
        })
    });

    it('should complete all', () => {
        const action = {
            type: COMPLETE_ALL,
        };

        expect(reducer(mockState, action)
            .tasks
            .every(({ isCompleted }) => isCompleted)
        ).toEqual(true)
    });

    it('should remove', () => {
        const action = {
            type: REMOVE,
            payload: { uid }
        };

        expect(reducer(mockState, action)
            .tasks
            .length
        ).toEqual(mockTasks.length - 1)
    });

    it('should update', () => {
        const action = {
            type: UPDATE,
            payload: { uid, description: 'test' }
        };

        expect(reducer(mockState, action)
            .tasks
            .find(task => task.uid === uid).description
        ).toEqual('test');
    });

    it('should add task', () => {
        const action = {
            type: ADD,
            payload: {
                uid: 3,
                description: 'newTask'
            }
        };

        expect(reducer(mockState, action)
            .tasks
            .length
        ).toEqual(mockTasks.length + 1);

        expect(reducer(mockState, action)
            .tasks
            .find(task => task.uid === 3).description
        ).toEqual('newTask');

    });
});
