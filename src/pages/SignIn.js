import React from 'react';
import useConnect from '../hooks/useConnect';
import { signIn } from '../actions/auth';

import { GoogleSignIn } from '../components/Buttons';

const SignIn = () => {
    const [, actions] = useConnect({ signIn });

    return (
        <div className="mt-5">
            <GoogleSignIn handleClick={actions.signIn} />
        </div>
    );
};

export default SignIn;
