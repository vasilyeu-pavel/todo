import React from 'react';
import styled from 'styled-components';

const ActionButton = ({ className, handleClick, children }) => (
    <span onClick={handleClick} className={className}>
        {children()}
    </span>
);

const StyledButton = styled(ActionButton)`
    font-size: 30px;
   
    &:hover {
        cursor: pointer; 
    }
`;


export default StyledButton;
