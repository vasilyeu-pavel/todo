import React, { useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const DraggableContainer = ({ children, connectDropTarget, connectDragSource }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref) {
            connectDropTarget(findDOMNode(ref.current));
            connectDragSource(findDOMNode(ref.current));
        }
    }, [connectDropTarget, connectDragSource]);


    return (
        <div ref={ref}>
            {children}
        </div>
    );
};

const specTarget = {
    drop: ({ id, handleDrop }, monitor) => {
        handleDrop(
            {
                // drag
                id: monitor.getItem().id,
            },
            {
                // drop
                id
            });
    },

};

const collectTarget = (connect, monitor) => {
    return ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        hovered: monitor.isOver(),
        droppedElement: monitor.getItem(),
    });
};

const specSource = {
    beginDrag: ({ id }) => ({ id }),
};

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});

export default DropTarget('task', specTarget, collectTarget)(
    DragSource('task', specSource, collectSource)
    (DraggableContainer)
);
