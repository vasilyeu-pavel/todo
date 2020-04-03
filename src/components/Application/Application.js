import React from 'react';
import styled from 'styled-components';

import { StateProvider } from '../../providers/store/store';

import Header from './Header';
import Body from './Body';

const Container = ({ className, children }) => (
    <div className={`container mt-0 mt-xl-5 ${className}`}>
        {children}
    </div>
);

const StyledContainer = styled(Container)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-family: inherit;
  font-weight: inherit;
  width: 100%;
  height: 100%;
  
  @media (min-width: 640px){
    width: 50% !important;
    height: auto;
  }
`;

const Application = () => {
    return (
        <StateProvider>
            <StyledContainer>
                <Header />
                <Body />
            </StyledContainer>
        </StateProvider>
    );
};

export default Application;
