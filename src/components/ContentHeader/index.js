import React from 'react';
import styled from 'styled-components';

import useConnect from '../../hooks/useConnect';

import { ActionButton } from '../Buttons';
import { Form } from '../Form';
import { IoIosArrowDown } from 'react-icons/io';

import { completeAll } from '../../actions/tasks';

const ContentHeader = ({ className }) => {
    const [, actions] = useConnect({ completeAll });

    const createTaskCb = onSubmit => (event, values) => {
        onSubmit({ ...values });

        event.target.querySelector('input').blur();
    };

    return (
        <div className={`row p-3  ${className}`}>
            <div className="col-1">
                <ActionButton handleClick={actions.completeAll}>
                    {() => <IoIosArrowDown />}
                </ActionButton>
            </div>
            <div className="col-10 pl-4 d-flex align-items-center">
                <Form mode="create" createTaskCb={createTaskCb} />
            </div>
        </div>
    );
};

const StyledContentHeader = styled(ContentHeader)`
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
`;

export default StyledContentHeader;
