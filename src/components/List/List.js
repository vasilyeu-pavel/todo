import React from 'react';

import useConnect from '../../hooks/useConnect';

import Item from './Item';
import { handleComplete, removeTask } from '../../providers/store/actions';

const List = () => {
    const [{ tasks }, actions] = useConnect({ handleComplete, removeTask });

    return tasks.map(task => <Item key={task.id} {...task} {...actions} />);
};

export default List;
