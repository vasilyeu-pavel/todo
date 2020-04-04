import React, { useState, useEffect } from 'react';
import {
    IoIosClose,
} from 'react-icons/io';


const Alert = ({ isConnected }) => {
    const [isOpen, setOpen] = useState(!isConnected);

    const handleOpen = () => setOpen(!isOpen);

    useEffect(() => {
        setOpen(!isConnected);
    }, [isConnected]);

    return isOpen && (
        <div
            className="alert alert-danger w-100 position-absolute text-center"
            role="alert"
            style={{ zIndex: 1000 }}
        >
            <span>
                Lost internet connection
            </span>
            <span className="btn pt-0" onClick={handleOpen}>
                <IoIosClose />
            </span>
        </div>
    )
};

export default Alert;
