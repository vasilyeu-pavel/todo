import React from 'react';
import { useForm } from '../../hooks/useForm';

import Input from './Input';

const validateCb = val => !!(val || val.length);

const onSubmit = (value) => {
    console.log('onSubmit');
    console.log(value);

    return Promise.resolve();
};

const Form = () => {
    const name = 'task';

    const { handleSubmit, values, handleChange } = useForm(
        onSubmit,
        {
        cb: validateCb,
    },
        {
        [name]: '',
    });

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
