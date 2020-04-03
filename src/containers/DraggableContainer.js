import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const DraggableContainer = ({ children, id, type }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: { type, id },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(ref);

    return (
        <div ref={ref}>
            {children}
        </div>
        );
};

export default DraggableContainer;
