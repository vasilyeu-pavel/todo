import { useEffect } from 'react';
import useConnect from './useConnect';
import { syncTasks, setLoading } from '../actions/tasks';

// for skip first connection
let i = 0;

const useConnection = () => {
    const [{ isConnected }, actions] = useConnect({ syncTasks, setLoading });

    useEffect(() => {
        if (!isConnected) i++;

        if (isConnected && i > 1) {
            actions.setLoading();

            actions.syncTasks();
        }
    }, [isConnected]);

    return null;
};

export default useConnection;

