import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import useConnect from '../../hooks/useConnect';

import { DraggableContainer } from '../../containers'

import Item from './Item';

import { handleComplete, removeTask, sortByDnD } from '../../actions/tasks';

const sortByIndex = (a, b) => a.index - b.index;

const List = () => {
    const [{ tasks, ...props }, actions] = useConnect({ handleComplete, removeTask, sortByDnD });

    console.log(tasks, props);

    return (
        <DndProvider backend={HTML5Backend}>
            {tasks
                .sort(sortByIndex)
                .map(task =>
                    <DraggableContainer
                        key={task.id}
                        id={task.id}
                        handleDrop={actions.sortByDnD}
                    >
                        <Item {...task} {...actions} />
                    </DraggableContainer>
                )
            }
        </DndProvider>
    );
};

export default List;
