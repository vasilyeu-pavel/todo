import React from 'react';

// custom hooks
import useConnect from '../../hooks/useConnect';
import { useForm } from '../../hooks/useForm';

// actions
import { addTask, updateTask } from '../../actions/tasks';

// components
import Input from './Input';

// validation
const isRequired = val => !!(val && val.length);

const Form = (
    {
        name = 'description',
        mode = 'create',
        updateTaskCb,
        createTaskCb,
        taskId,
    }) => {
    const [{ tasks }, actions] = useConnect({ addTask, updateTask });

    const foundTask = tasks.find(({ uid }) => uid === taskId);

    const { handleSubmit, values, handleChange } = useForm(
        mode === 'create'
            ? createTaskCb(actions.addTask)
            : updateTaskCb(actions.updateTask),
        {
            cb: isRequired,
            message: 'isRequired'
        },
        { [name]: foundTask ? foundTask.description : '' }
    );

    return (
        <form onSubmit={handleSubmit}>
            <Input
                handleChange={handleChange}
                name={name}
                value={values[name]}
            />
        </form>
    );
};

export default Form;
