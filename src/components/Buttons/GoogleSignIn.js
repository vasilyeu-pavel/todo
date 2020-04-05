import React from 'react';
import PropTypes from 'prop-types';

const GoogleSignIn = ({ handleClick }) => (
    <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
    >
        SignIn Google
    </button>
);

GoogleSignIn.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default GoogleSignIn;
