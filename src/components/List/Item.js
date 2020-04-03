import React from 'react';
import useConnect from '../../hooks/useConnect';

import { handleComplete, removeTask } from '../../providers/store/actions';

import {
    IoIosRadioButtonOff,
    IoIosArrowDropdown,
    IoIosClose,
} from 'react-icons/io';

import { Task } from '../Task';
import { ActionButton } from '../Buttons';

const Item = ({ id, task, isCompleted }) => {
    const [, actions] = useConnect({ handleComplete, removeTask });

    const handleCompleted = () => actions.handleComplete(id);
    const handleRemove = () => actions.removeTask(id);

    return (
        <div className="row p-3">
            <div className="col-1">
                <ActionButton handleClick={handleCompleted}>
                    {() => !isCompleted
                        ? <IoIosRadioButtonOff />
                        : <IoIosArrowDropdown />}
                </ActionButton>
            </div>
            <Task task={task} isCompleted={isCompleted} />
            <div className="col-1">
                <ActionButton handleClick={handleRemove}>
                    {() => <IoIosClose />}
                </ActionButton>
            </div>
        </div>
    )
};

export default Item;
