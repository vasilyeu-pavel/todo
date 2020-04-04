import React from 'react';
import styled from 'styled-components';

const Container = ({ children, className }) => (
    <div className={`container-fluid d-flex justify-content-center p-0 ${className}`}>
        {children}
    </div>
);

const StyledContainer = styled(Container)`
  font-size: 16px;
  font-family: inherit;
  font-weight: inherit;
  height: 100%;
  
  @media (min-width: 640px){
    width: 50% !important;
    height: auto;
  }
`;

export default StyledContainer;
