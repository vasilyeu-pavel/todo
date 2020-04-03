import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const DropableContainer = ({ children, type }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: type,
        drop(item) {
            console.log(item);
            // changeTaskStatus(item.id, status);
        }
    });

    drop(ref);
    return (
        <div ref={ref}>
            {children}
        </div>
    );
};

export default DropableContainer;
