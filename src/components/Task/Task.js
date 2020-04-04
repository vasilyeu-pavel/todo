import React, { memo } from 'react';
import styled from 'styled-components';

const Task = ({ className, description }) => (
    <div className={`col-10 pl-4 d-flex align-items-center ${className}`}>
        <span>
            {description}
        </span>
    </div>
);

const StyledTask = styled(Task)`
     text-decoration: ${({ isCompleted }) => isCompleted ? 'line-through' : 'none'};
`;

export default memo(
    StyledTask,
    (prevProps, nextProp) => (
        prevProps.description === nextProp.description &&
        prevProps.isCompleted === nextProp.isCompleted
    )
)
