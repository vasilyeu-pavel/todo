import React, { useState } from 'react';
import styled from 'styled-components';
import {
    IoIosRadioButtonOff,
    IoIosArrowDropdown,
    IoIosClose,
} from 'react-icons/io';

import { Form } from '../Form';
import { Task } from '../Task';
import { ActionButton } from '../Buttons';

const Item = ({ className, id, task, isCompleted, handleComplete, removeTask }) => {
    const [isEditMode, handleEdit] = useState(false);

    const handleCompleted = () => handleComplete(id);
    const handleRemove = () => removeTask(id);

    const updateTaskCb = onSubmit => (e, values) => {
        onSubmit({ ...values, id });

        handleEdit(false);
    };

    return (
        <div
            className={`${className} row p-3`}
            onDoubleClick={() => handleEdit(!isEditMode)}
        >
            {/* completed bar */}
            <div className="col-1">
                <ActionButton handleClick={handleCompleted}>
                    {() => !isCompleted
                        ? <IoIosRadioButtonOff />
                        : <IoIosArrowDropdown />}
                </ActionButton>
            </div>

            {/* content */}
            {isEditMode
                ? (
                    <div className="col-10 pl-4 d-flex align-items-center">
                        <Form
                            mode="update"
                            updateTaskCb={updateTaskCb}
                            taskId={id}
                        />
                    </div>
                )
                : (
                    <Task task={task} isCompleted={isCompleted} />
            )}

            {/* remove bar */}
            <div className="col-1">
                <ActionButton handleClick={handleRemove}>
                    {() => <IoIosClose />}
                </ActionButton>
            </div>
        </div>
    )
};

export default styled(Item)`
    border-bottom: 1px solid #ededed;
`;
