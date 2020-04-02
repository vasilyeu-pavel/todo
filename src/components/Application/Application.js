import React from 'react';
import styled from 'styled-components';

import { StateProvider } from '../../providers/store/store';

import Form from '../Form';
import Header from './Header';
import Body from './Body';

const Container = ({ className, children }) => (
    <div className={`container w-50 mt-5 ${className}`}>
        {children}
    </div>
);

const StyledContainer = styled(Container)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-family: inherit;
  font-weight: inherit;
`;

const Application = () => {
    return (
        <StateProvider>
            <StyledContainer>
                <Header>
                    <Form />
                </Header>
                <Body>
                    body
                </Body>
            </StyledContainer>
        </StateProvider>
    );
};

export default Application;
