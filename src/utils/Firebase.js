import * as firebase from 'firebase';
import config from '../config';

class Firebase {
    constructor() {
        this.firebase = firebase;
        this.user = null;
    }

    isAuth() {
        const user = window.sessionStorage.getItem(
            `firebase:authUser:${config.apiKey}:[DEFAULT]`
        );

        const parsedUser = JSON.parse(user);

        this.user = parsedUser;

        return parsedUser;
    }

    checkConnection(callBack = () => true) {
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
            if (snap.val() === true) {
                console.log('connected');
                callBack(true);
            } else {
                console.log('disconnect');
                callBack(false);
            }
        });
    }

    getAll() {
        return firebase
            .database()
            .ref(`tasks-${this.user.uid}`)
            .once('value')
            .then((snapshot) => {
                const response = snapshot.val();

                return Object
                    .entries(response)
                    .map(([firebaseId, task]) => {
                        task.uid = firebaseId;

                        return task;
                    });
        });
    }

    delete(taskUid) {
        // returned promise
        return firebase.database().ref(`tasks-${this.user.uid}/${taskUid}`).set(null);
    }

    update(taskUid, data) {
        return firebase.database().ref(`tasks-${this.user.uid}/${taskUid}`).update(data);
    }

    set(data) {
        // returned promise
        return this.firebase.database().ref(`tasks-${this.user.uid}`).set(data);
    }

    async push(data) {
        // returned promise
        const { key } = await this.firebase.database().ref(`tasks-${this.user.uid}`).push(data);

        return key;
    }

    auth() {
        const provider = new this.firebase.auth.GoogleAuthProvider();

        return firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        const { user } = result;

                        this.user = user;

                        return result;
                    })
            })
    }
}

export default Firebase;
