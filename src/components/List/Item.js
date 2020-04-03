import React, { useContext } from 'react';

import { store } from '../../providers/store/store';
import { handleComplete } from '../../providers/store/actions';

import {
    IoIosRadioButtonOff,
    IoIosArrowDropdown
} from 'react-icons/io';

import { Task } from '../Task';
import { CompleteButton } from '../Buttons';

const Item = ({ id, task, isCompleted }) => {
    const { dispatcher } = useContext(store);

    const actions = dispatcher({ handleComplete });

    const handleCompleted = () => actions.handleComplete(id);

    return (
        <div className="row p-3">
            <div className="col-1">
                <CompleteButton handleClick={handleCompleted}>{
                    () => !isCompleted
                        ? <IoIosRadioButtonOff />
                        : <IoIosArrowDropdown />
                }</CompleteButton>
            </div>
            <Task isCompleted={isCompleted}>
                <span>
                    {task}
                </span>
            </Task>
            <div className="col-1"></div>
        </div>
    )
};

export default Item;
