import { EmotionCache } from '@emotion/react';
import { getAuth } from 'firebase/auth';
import { observer } from 'mobx-react';
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppFrame } from '../components/appFrame/AppFrame';
import { FullLoadingPage } from '../components/loadingScreen/FullLoadingPage';
import "../lib/apiConfig";
import "../lib/auth/client/firebase";
import { PageStateProvider } from '../lib/state/PageStateProvider';
import PageThemeProvider from '../styles/PageThemeProvider';


export interface MUIAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MUIAppProps) {
    const { Component, pageProps, emotionCache } = props;

    const [user, loading, error] = useAuthState(getAuth());

    if (loading) {
        return (
            <PageThemeProvider emotionCache={emotionCache}>
                <PageStateProvider>
                    <FullLoadingPage></FullLoadingPage>
                </PageStateProvider>
            </PageThemeProvider>
        );
    }

    return (
        <PageThemeProvider emotionCache={emotionCache}>
            <PageStateProvider>
                <AppFrame>
                    <Component {...pageProps} />
                </AppFrame>
            </PageStateProvider>
        </PageThemeProvider>
    );
}

export default observer(MyApp);
