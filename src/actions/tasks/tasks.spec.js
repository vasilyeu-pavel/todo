import { setLoading, getAllTask, updateTask } from './index';
import { LOADING, SET, UPDATE } from '../../constants';
import { mockTasks, initialState} from '../../providers/store/reducer';

const mockDispatch = (val) => val;

const mockFirebase = {
    getAll() {
        return Promise.resolve(mockTasks);
    },
};

describe('<TASK ACTIONS>', () => {
   it('should set loading', () => {
       const expectValue = {
           type: LOADING,
       };

       expect(setLoading.bind(null, { dispatch: mockDispatch })()).toEqual(expectValue);
   });

   it('should get all task', async () => {
       const expectValue = {
           type: SET,
           payload: mockTasks,
       };

       const receivedValue = await getAllTask.bind(null, { dispatch: mockDispatch, firebase: mockFirebase })();

       expect(receivedValue).toEqual(expectValue);
   });

   it('should update task with low connected', async () => {
        const task = mockTasks[0];

        const expectValue = {
            type: UPDATE,
            payload: task,
        };

        const mockGetState = () => ({
            ...initialState,
            tasks: mockTasks,
            isConnected: false,
        });

        const receivedValue = await updateTask.bind(null, {
            dispatch: mockDispatch,
            firebase: mockFirebase,
            getState: mockGetState,
        })(task);

        expect(receivedValue).toEqual(expectValue);
    });

    it('should call update method', async () => {
        const cb = jest.fn();

        mockFirebase.update = cb;

        const task = mockTasks[0];

        const mockGetState = () => ({
            ...initialState,
            tasks: mockTasks,
            isConnected: true,
        });

        const receivedValue = await updateTask.bind(null, {
            dispatch: mockDispatch,
            firebase: mockFirebase,
            getState: mockGetState,
        })(task);

        expect(cb).toBeCalled();
    });
});
