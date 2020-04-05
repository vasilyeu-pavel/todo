import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionButton = ({ className, handleClick, children }) => (
    <span onClick={handleClick} className={className}>
        {children()}
    </span>
);

ActionButton.propTypes = {
    className: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
};

const StyledButton = styled(ActionButton)`
    font-size: 30px;
   
    &:hover {
        cursor: pointer; 
    }
`;


export default StyledButton;
