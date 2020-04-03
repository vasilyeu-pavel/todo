import React from 'react';

import useConnect from '../../hooks/useConnect';

import Item from './Item';

const List = () => {
    const [{ tasks }] = useConnect();

    return tasks.map(task => <Item key={task.id} {...task} />);
};

export default List;
