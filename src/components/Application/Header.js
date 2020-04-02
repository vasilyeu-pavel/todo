import React from 'react';
import styled from 'styled-components';

const Header = ({ className, children }) => (
    <div className={`row p-3  ${className}`}>
        <div className="col-1">123</div>
        <div className="col-11">{children}</div>
    </div>
);

const StyledHeader = styled(Header)`
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`;

export default StyledHeader;
