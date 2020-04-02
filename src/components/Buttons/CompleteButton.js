import React from 'react';
import styled from 'styled-components';

const CompleteButton = ({ className, completed, handleClick, children }) => (
    <span onClick={handleClick} className={className}>
        {children()}
    </span>
);

const StyledButton = styled(CompleteButton)`
    font-size: 22px;
   
    &:hover {
        cursor: pointer; 
    }
`;


export default StyledButton;
