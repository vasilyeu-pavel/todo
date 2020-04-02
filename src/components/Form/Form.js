import React, { useContext } from 'react';

import { store } from '../../providers/store/store.js';
import { addTask } from '../../providers/store/actions.js';

import { useForm } from '../../hooks/useForm';

import Input from './Input';

const isRequired = val => !!(val && val.length);

const Form = () => {
    const name = 'task';

    const { dispatcher } = useContext(store);
    const actions = dispatcher({ addTask });

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
