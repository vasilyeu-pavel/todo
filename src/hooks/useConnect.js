import { useContext } from 'react';
import { store } from '../providers/store/store';

const useConnect = (functions) => {
    const { state, dispatcher } = useContext(store);
    const actions = dispatcher(functions);

    return [state, actions];
};

export default useConnect;
