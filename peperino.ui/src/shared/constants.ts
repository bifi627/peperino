export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const AUTH_TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME!;

export const IS_LOCAL_DEV = BACKEND_URL.includes("192.168.0.106");

export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    measurmentId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};
