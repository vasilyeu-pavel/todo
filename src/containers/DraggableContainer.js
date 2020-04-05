import React, { useRef, useEffect } from 'react';
import Proptypes from 'prop-types';

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

// todo Добавить лайаут для драга
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

DraggableContainer.propTypes = {
    children: Proptypes.object.isRequired,
    connectDropTarget: Proptypes.func.isRequired,
    connectDragSource: Proptypes.func.isRequired
};

const specTarget = {
    drop: ({ uid, handleDrop }, monitor) => {
        handleDrop(
            {
                // drag
                uid: monitor.getItem().uid,
            },
            {
                // drop
                uid
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
    beginDrag: ({ uid }) => ({ uid }),
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
