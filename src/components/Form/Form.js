import React from 'react';

import useConnect from '../../hooks/useConnect';
import { addTask } from '../../providers/store/actions.js';

import { useForm } from '../../hooks/useForm';

import Input from './Input';

const isRequired = val => !!(val && val.length);

const Form = ({ name = 'task' }) => {
    const [, actions] = useConnect({ addTask });

    const { handleSubmit, values, handleChange } = useForm(
        actions.addTask,
        {
            cb: isRequired,
            message: 'isRequired'
        },
        { [name]: '' }
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
