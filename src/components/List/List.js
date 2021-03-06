import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import useConnect from '../../hooks/useConnect';

import { DraggableContainer } from '../../containers'

import Item from './Item';

import { handleComplete, removeTask, sortByDnD, setLoading, subscribeToDb } from '../../actions/tasks';

const sortByIndex = (a, b) => a.index - b.index;

const List = () => {
    const [{ tasks, user }, actions] = useConnect({
        handleComplete,
        removeTask,
        sortByDnD,
        setLoading,
        subscribeToDb,
    });

    useEffect(() => {
        // подписываемся на изменения в бд
        if (user.uid) {
            actions.subscribeToDb();
        }

    }, [user.uid]);

    // todo Добавить кастомных хук для выбора днд бэкенда в зависимости от устройства
    return (
        <DndProvider backend={HTML5Backend}>
            {tasks
                .sort(sortByIndex)
                .map((task, index) =>
                    <DraggableContainer
                        key={task.uid}
                        uid={task.uid}
                        handleDrop={actions.sortByDnD}
                    >
                        <Item {...task} index={index} {...actions} />
                    </DraggableContainer>
                )
            }
        </DndProvider>
    );
};

export default List;
