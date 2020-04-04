import * as firebase from 'firebase';

import { SIGN_IN } from '../../constants';
import config from '../../config';

export const isSignIn = ({ dispatch, history }) => {
    const user = window.sessionStorage.getItem(
        `firebase:authUser:${config.apiKey}:[DEFAULT]`
    );

    if (user) {
        return dispatch({
            type: SIGN_IN,
            payload: user,
        });
    } else {
        return history.push('/auth');
    }
};

export const signIn = ({ dispatch, history }) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase
                .auth()
                .signInWithPopup(provider)
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
        })
};
