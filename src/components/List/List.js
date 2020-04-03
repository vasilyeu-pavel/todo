import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import useConnect from '../../hooks/useConnect';

import {
    DraggableContainer,
    DropableContainer,
} from '../../containers'

import Item from './Item';

import { handleComplete, removeTask } from '../../providers/store/actions';

const sortByIndex = (a, b) => a.index - b.index;

const List = () => {
    const [{ tasks }, actions] = useConnect({ handleComplete, removeTask });

    return (
        <DndProvider backend={HTML5Backend}>
            {tasks
                .sort(sortByIndex)
                .map(task =>
                    <DraggableContainer type="task" key={task.id} id={task.id}>
                        <DropableContainer type="task">
                            <Item {...task} {...actions} />
                        </DropableContainer>
                    </DraggableContainer>
                )
            }
        </DndProvider>
    );
};

export default List;
