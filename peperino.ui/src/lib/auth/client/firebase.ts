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
    // await setTokenForUser(user);
});

export async function setTokenForUser(user: User | null) {
    if (user) {
        const token = await user?.getIdToken();
        await manageSessionForUser(token);
    }
    else {
        await manageSessionForUser();
    }
}

let callbacks: (() => void)[] = [];
export function registerSessionChangedSignal(callback: () => void) {
    callbacks.push(callback);
}

export async function manageSessionForUser(token?: string) {
    var data = { token: token }

    if (token) {
        console.log(token.substring(token.length - 5));
    }

    if (typeof window !== "undefined") {
        console.log(token ? "POST USER" : "POST NO USER");
        await fetch("/api/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        callbacks.forEach(cb => cb());
        callbacks = [];
    }
}
