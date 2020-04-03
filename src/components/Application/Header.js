import React from 'react';
import styled from 'styled-components';

import useConnect from '../../hooks/useConnect';

import { ActionButton } from '../Buttons';
import { Form } from '../Form';
import { IoIosArrowDown } from 'react-icons/io';

import { completeAll } from '../../providers/store/actions';

const Header = ({ className }) => {
    const [, actions] = useConnect({ completeAll });

    return (
        <div className={`row p-3  ${className}`}>
            <div className="col-1">
                <ActionButton handleClick={actions.completeAll}>
                    {() => <IoIosArrowDown />}
                </ActionButton>
            </div>
            <div className="col-11">
                <Form />
            </div>
        </div>
    );
};

const StyledHeader = styled(Header)`
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`;

export default StyledHeader;
