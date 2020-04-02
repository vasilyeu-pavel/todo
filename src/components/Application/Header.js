import React from 'react';
import styled from 'styled-components';

import { IoIosArrowDown } from 'react-icons/io';

const ChecksAllButton = ({ className, children }) => (
    <span className={className}>
        {children}
    </span>
);

const StyledButton = styled(ChecksAllButton)`
  font-size: 22px;
`;

const Header = ({ className, children }) => (
    <div className={`row p-3  ${className}`}>
        <div className="col-1">
            <StyledButton>
                <IoIosArrowDown />
            </StyledButton>
        </div>
        <div className="col-11">{children}</div>
    </div>
);

const StyledHeader = styled(Header)`
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`;

export default StyledHeader;
