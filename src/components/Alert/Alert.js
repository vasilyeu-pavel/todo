import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    IoIosClose,
} from 'react-icons/io';

const Alert = ({ isConnected }) => {
    const [isOpen, setOpen] = useState(!isConnected);
    const [{ type, message }, setType] = useState({ type: 'danger', message: '' });

    const className = `alert alert-${type} w-100 position-absolute text-center`;

    const handleOpen = () => setOpen(!isOpen);

    useEffect(() => {
        if (!isConnected) {
            setOpen(true);

            setType({
                type: 'danger',
                message: 'Потеряно соединение, продолжайте работать, при востановлении, данные синхронизируются'
            })
        }
    }, [isConnected]);

    return isOpen ? (
        <div
            className={className}
            role="alert"
            style={{ zIndex: 1000 }}
        >
            <span>
                {message}
            </span>
            <span className="btn pt-0" onClick={handleOpen}>
                <IoIosClose />
            </span>
        </div>
    ) : null
};

Alert.propTypes = {
    isConnected: PropTypes.bool.isRequired,
};

export default Alert;
