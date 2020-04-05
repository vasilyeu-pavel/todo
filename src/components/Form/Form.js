import React from 'react';
import PropTypes from 'prop-types';

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
        name,
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
        <form className="w-100" onSubmit={handleSubmit}>
            <Input
                handleChange={handleChange}
                name={name}
                value={values[name]}
            />
        </form>
    );
};

Form.propTypes = {
    name: PropTypes.string,
    mode: PropTypes.string,
    updateTaskCb: PropTypes.func,
    createTaskCb: PropTypes.func,
    taskId: PropTypes.string,
};

Form.defaultProps = {
    name: 'description',
    mode: 'create',
};

export default Form;
