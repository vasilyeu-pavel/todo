import React, { useEffect } from 'react';
import styled from 'styled-components';

import ContentHeader from '../components/ContentHeader';
import { List } from '../components/List';

import useConnect from '../hooks/useConnect';
import { isSignIn } from '../actions/auth';

const Application = ({ className }) => {
    const [, actions] = useConnect({ isSignIn });

    useEffect(() => {
        actions.isSignIn();
    }, []);

    return (
        <div className={`row pr-3 mt-0 mt-xl-5 ${className}`}>
            <div className="col main-content p-0">
                <ContentHeader />
                <List />
            </div>
        </div>
    );
};

const StyledApplication = styled(Application)`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export default StyledApplication;
