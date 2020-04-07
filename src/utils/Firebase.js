import firebase from 'firebase/app';
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

    checkConnection(cb = () => true) {
        const connectedRef = this.firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
            if (snap.val() === true) {
                console.log('connected');
                cb(true);
            } else {
                console.log('disconnect');
                cb(false);
            }
        });
    }

    valueEventListener(update) {
        return (snapshot) => {
            let response = snapshot.val();

            if (!response) {
                response = []
            }

            update(Object
                .entries(response)
                .map(([firebaseId, task]) => {
                    task.uid = firebaseId;

                    return task;
                }));
        }
    }

    getAllSync() {
        // get all tasks
        return this.firebase
            .database()
            .ref(`tasks-${this.user.uid}`)
            .once('value')
            .then((snapshot) => {
                const response = snapshot.val();

                if (!response) return [];

                return Object
                    .entries(response)
                    .map(([firebaseId, task]) => {
                        task.uid = firebaseId;

                        return task;
                    });
            });
    }

    subscribeToDb(update) {
        return this.firebase
            .database()
            .ref(`tasks-${this.user.uid}`)
            .on('value', this.valueEventListener(update))
    }

    delete(taskUid) {
        // returned promise
        return this.firebase
            .database()
            .ref(`tasks-${this.user.uid}/${taskUid}`)
            .set(null);
    }

    update(taskUid, data) {
        return this.firebase.database().ref(`tasks-${this.user.uid}/${taskUid}`).update(data);
    }

    set(data) {
        // returned promise
        return this.firebase.database().ref(`tasks-${this.user.uid}`).set(data);
    }

    // returned promise
    async push(data) {
        // create new task
        const { key } = await this.firebase.database().ref(`tasks-${this.user.uid}`).push(data);

        // save uid in task
        await this.firebase.database().ref(`tasks-${this.user.uid}/${key}`).update({
            ...data,
            uid: key,
        });

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
