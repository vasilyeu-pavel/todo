import { useState } from 'react';

const defaultValidation = {
  cb: () => true,
  message: ''
};

const defaultCb = (value) => {
    console.log('onSubmit');
    console.log(value);

    return Promise.resolve();
};

export const useForm = (callback = defaultCb, validateCb = defaultValidation, defaultValues = {}) => {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});

    const validate = (values) => {
        const err = {};

        for (const key in values) {
            if (!validateCb.cb(values[key])) {
                err[key] = validateCb.message || '';
            }
        }

        return {
            err,
            isValid: !!Object.keys(err).length,
        }
    };

    const resetForm = () => {
        setValues(defaultValues);
        setErrors({});
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        const { isValid, err } = validate(values);

        if (!isValid) {
            callback(values).then(resetForm);
        } else {
            setErrors(err);
        }
    };

    const handleChange = ({ name, value, event }) => {
        if (event) {
            event.persist();
        }

        console.group(`>>> handleChange ${name} "${value}"`);

        setValues(values => ({ ...values, [name]: value }));
    };

    return {
        handleChange,
        handleSubmit,
        setValues,
        values,
        errors,
        setErrors,
    };
};
