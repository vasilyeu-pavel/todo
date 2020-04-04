import React from 'react';

const GoogleSignIn = ({ handleClick }) => (
    <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
    >
        SignIn Google
    </button>
);

export default GoogleSignIn;
