import { useEffect } from 'react';
import useConnect from './useConnect';
import { syncTasks, setLoading } from '../actions/tasks';

// for skip first connection
let i = 0;

const useConnection = () => {
    const [{ isConnected }, actions] = useConnect({ syncTasks, setLoading });

    useEffect(() => {
        if (!isConnected) i++;

        // отменяем показ и синхронизация при первом рендере
        if (isConnected && i > 1) {
            console.log('syncTasks, useConnection');
            actions.setLoading();

            actions.syncTasks();
        }
    }, [isConnected]);

    return null;
};

export default useConnection;

