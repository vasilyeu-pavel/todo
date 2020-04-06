import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Input = ({ className, handleChange, name, value = '' }) =>  (
    <div>
        <input
            autoFocus
            onChange={({ target: { value } }) => handleChange({ value, name })}
            name={name}
            className={className}
            placeholder="Enter task"
            value={value}
        />
    </div>
);

Input.propTypes = {
    className: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

const StyledInput = styled(Input)`
    width: 100%;
    line-height: 1.4em;
    border: 0;
    color: inherit;
   
    &:focus {
            border-color: #FFFFF;
             border-width: 1px;
            box-shadow: 0 0 0px #FFFFF;
            outline:none;
    }
`;

export default memo(
    StyledInput,
    (prevProps, nextProp) => (
        prevProps.value === nextProp.value
    )
);
