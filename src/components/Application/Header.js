import styled from "styled-components";
import React from "react";

const Header = ({ className, children }) => {
    const cn = `col-12 p-3 ${className}`;

    return (
        <div className="row">
            <div className={cn}>{children}</div>
        </div>
    );
};

const StyledHeader = styled(Header)`
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`;

export default StyledHeader;
