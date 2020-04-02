import React, { useState, useEffect } from 'react';

import {
    IoIosRadioButtonOff,
    IoIosArrowDropdown
} from 'react-icons/io';

import { Task } from '../Task';
import { CompleteButton } from '../Buttons';

// todo update

const Item = ({ id, task, isCompleted }) => {
    const [completed, setCompleted] = useState(isCompleted);

    useEffect(() => {
        setCompleted(isCompleted)
    }, [isCompleted]);

    const handleCompleted = () => setCompleted(!completed);

    return (
        <div className="row p-3">
            <div className="col-1">
                <CompleteButton
                    handleClick={handleCompleted}
                    completed={completed}
                >{() => !completed
                    ? <IoIosRadioButtonOff />
                    : <IoIosArrowDropdown />
                }</CompleteButton>
            </div>
            <Task completed={completed}>
                <span>
                    {task}
                </span>
            </Task>
            <div className="col-1"></div>
        </div>
    )
};

export default Item;
