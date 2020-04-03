import React, { memo } from 'react';
import styled from 'styled-components';

const Task = ({ className, task }) => (
    <div className={`col-10 pl-4 d-flex align-items-center ${className}`}>
        <span>
            {task}
        </span>
    </div>
);

const StyledTask = styled(Task)`
     text-decoration: ${({ isCompleted }) => isCompleted ? 'line-through' : 'none'};
`;

export default memo(
    StyledTask,
    (prevProps, nextProp) => {
        return prevProps.task === nextProp.task &&
            prevProps.isCompleted === nextProp.isCompleted;
})
