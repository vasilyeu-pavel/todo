import styled from "styled-components";
import React from "react";

const Body = ({ className, children }) => {
    const cn = `p-3 ${className}`;

    return (
        <div className="row">
            <div className={cn}>{children}</div>
        </div>
    );
};

const StyledBody = styled(Body)`
  
`;

export default StyledBody;
