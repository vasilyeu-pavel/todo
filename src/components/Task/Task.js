import React from 'react';
import styled from 'styled-components';

const Task = ({ className, children }) => {
    return (
        <div className={`col-10 pl-4 d-flex align-items-center ${className}`}>
            {children}
        </div>
    )
};

const StyledTask = styled(Task)`
     text-decoration: ${({ isCompleted }) => isCompleted ? 'line-through' : 'none'};
`;

export default StyledTask;
