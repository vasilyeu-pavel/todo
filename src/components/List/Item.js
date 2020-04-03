import React, { useContext } from 'react';

import { store } from '../../providers/store/store';
import { handleComplete, removeTask } from '../../providers/store/actions';

import {
    IoIosRadioButtonOff,
    IoIosArrowDropdown,
    IoIosClose,
} from 'react-icons/io';

import { Task } from '../Task';
import { ActionButton } from '../Buttons';

const Item = ({ id, task, isCompleted }) => {
    const { dispatcher } = useContext(store);
    const actions = dispatcher({ handleComplete, removeTask });

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
