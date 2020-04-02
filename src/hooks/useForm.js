import { useEffect, useState } from 'react';

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (values) => {
        const errors = {};

        for (const key in values) {
            if (!validateCb.cb(values[key])) {
                errors[key] = validateCb.message || '';
            }
        }

        return errors
    };

    const resetForm = () => setValues({});

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback()
                .then(resetForm);
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
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
