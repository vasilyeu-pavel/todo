import { useState, useEffect } from 'react';
import Firebase from '../utils/Firebase';

const useConnection = () => {
    // const [isOnline, handleConnection] = useState(navigator.onLine);

    // const updateConnectionStatus = () => {
    //     console.log(`online connection: ${navigator.onLine}`);
    //
    //     handleConnection(navigator.onLine);
    // };

    useEffect(() => {
        // const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        //
        // connection.addEventListener('change', updateConnectionStatus);
        //
        // return () => connection.removeEventListener('change', updateConnectionStatus);
    }, []);

    return { isOnline };
};

export default useConnection;

