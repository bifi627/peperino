import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, User } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../../../shared/constants';
import { GlobalApplicationStateObject } from '../../state/ApplicationState';

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

onIdTokenChanged(getAuth(), (user: User | null) => {
    GlobalApplicationStateObject.userInit();
});