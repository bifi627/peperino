import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import cookie from "js-cookie";
import { AUTH_TOKEN_COOKIE_NAME, FIREBASE_CONFIG } from '../shared/constants';

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
        // console.log(token);
        // cookie.set(AUTH_TOKEN_COOKIE_NAME, token, { expires: 1, secure: true });
    }

    else {
        cookie.remove(AUTH_TOKEN_COOKIE_NAME);
    }
}
