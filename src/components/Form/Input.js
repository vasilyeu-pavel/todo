import React from 'react';
import styled from 'styled-components';

const Input = ({ className, handleChange, name, value = '' }) => {
    return (
        <div>
            <input
                onChange={({ target: { value } }) => handleChange({ value, name })}
                name={name}
                className={className}
                placeholder="Enter task"
                value={value}
            />
        </div>
    )
};

const StyledInput = styled(Input)`
    width: 100%;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
   
    &:focus {
            border-color: #FFFFF;
             border-width: 1px;
            box-shadow: 0 0 0px #FFFFF;
            outline:none;
    }
`;

export default StyledInput;
