import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FIREBASE_CONFIG } from "../../../shared/constants";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
    adapter: FirestoreAdapter({
        apiKey: FIREBASE_CONFIG.apiKey,
        appId: FIREBASE_CONFIG.appId,
        authDomain: FIREBASE_CONFIG.authDomain,
        databaseURL: FIREBASE_CONFIG.databaseURL,
        projectId: FIREBASE_CONFIG.projectId,
        storageBucket: FIREBASE_CONFIG.storageBucket,
        messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
        // Optional emulator config (see below for options)
        emulator: {},
    }),
});