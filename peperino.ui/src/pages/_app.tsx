import { EmotionCache } from '@emotion/react';
import { getAuth } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppFrame } from '../components/appFrame/AppFrame';
import { FullLoadingPage } from '../components/loadingScreen/FullLoadingPage';
import "../lib/apiConfig";
import "../lib/auth/client/firebase";
import PageProvider from '../styles/PageThemeProvider';


export interface MUIAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MUIAppProps) {
    const { Component, pageProps, emotionCache } = props;

    const [user, loading, error] = useAuthState(getAuth());

    if (!loading) {
        return (
            <PageProvider emotionCache={emotionCache}>
                <FullLoadingPage></FullLoadingPage>
            </PageProvider>
        );
    }

    return (
        <PageProvider emotionCache={emotionCache}>
            <AppFrame>
                <Component {...pageProps} />
            </AppFrame>
        </PageProvider>
    );
}

export default MyApp
