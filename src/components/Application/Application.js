import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';

const Container = ({ className, children }) => {
    const cn = `container w-50 h-100 mt-5 ${className}`;

    return (
        <div className={cn}>
            {children}
        </div>
    );
};

const StyledContainer = styled(Container)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Application = () => {
    return (
        <StyledContainer>
            <Header>
                header
            </Header>
            <Body>
                body
            </Body>
        </StyledContainer>
    );
};

export default Application;
