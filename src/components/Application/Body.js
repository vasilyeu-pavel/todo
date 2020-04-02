import React from 'react';
import styled from 'styled-components';

const Body = ({ className, children }) => (
    <div className="row">
        <div className={`p-3 ${className}`}>{children}</div>
    </div>
);

const StyledBody = styled(Body)``;

export default StyledBody;
