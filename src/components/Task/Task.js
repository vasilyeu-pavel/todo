import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Task = ({ className, description }) => (
    <div className={`col-10 pl-4 d-flex align-items-center ${className}`}>
        <span>
            {description}
        </span>
    </div>
);

Task.propTypes = {
    className: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

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
