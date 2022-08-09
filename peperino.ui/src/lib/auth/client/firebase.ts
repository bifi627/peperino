import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../../../shared/constants';

const firebaseConfig = {
    apiKey: FIREBASE_CONFIG.apiKey,
    authDomain: FIREBASE_CONFIG.authDomain,
    projectId: FIREBASE_CONFIG.projectId,
    storageBucket: FIREBASE_CONFIG.storageBucket,
    messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
    appId: FIREBASE_CONFIG.appId,
    measurementId: FIREBASE_CONFIG.measurmentId,
};

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

onAuthStateChanged(getAuth(), async (user) => {
    await setTokenForUser(user);
});

onIdTokenChanged(getAuth(), async (user) => {
    await setTokenForUser(user);
});

export async function setTokenForUser(user: User | null) {
    if (user) {
        const token = await user?.getIdToken();
        await postUserToken(token);
    }
    else {
        await postUserToken();
    }
}

export async function postUserToken(token?: string) {
    var path = "api/auth";
    var url = path;
    var data = { token: token }

    if (typeof window !== "undefined") {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    }
}
