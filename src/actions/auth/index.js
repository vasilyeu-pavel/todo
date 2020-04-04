import { SIGN_IN } from '../../constants';

export const isSignIn = ({ dispatch, history, firebase }) => {
    const user = firebase.isAuth();

    if (user) {
        return dispatch({
            type: SIGN_IN,
            payload: user,
        });
    } else {
        return history.push('/auth');
    }
};

export const signIn = ({ dispatch, history, firebase }) => {
    firebase.auth()
        .then(result => {
            history.push('/');

            return dispatch({
                type: SIGN_IN,
                payload: result.user,
            });
        })
        .catch(e => {
            console.log(e);
            history.push('/auth');
        })
};
