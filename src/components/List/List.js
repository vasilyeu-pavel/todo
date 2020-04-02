import React, { useContext } from 'react';
import { store } from '../../providers/store/store.js';

import Item from './Item';

const List = () => {
    const { state: { tasks } } = useContext(store);

    return tasks.map(task => <Item key={task.id} {...task} />);
};

export default List;
