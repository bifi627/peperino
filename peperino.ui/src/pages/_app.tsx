import { EmotionCache } from '@emotion/react';
import { observer } from 'mobx-react';
import type { AppProps } from 'next/app';
import { AppFrame } from '../components/appFrame/AppFrame';
import { AuthProvider } from '../components/appFrame/PageMiddleware/AuthMiddleware';
import "../lib/apiConfig";
import "../lib/auth/client/firebase";
import { ClientStateProvider } from '../lib/state/commonState/ClientStateProvider';
import PageThemeProvider from '../styles/PageThemeProvider';


export interface MUIAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MUIAppProps) {
    const { Component, pageProps, emotionCache } = props;

    return (
        <PageThemeProvider emotionCache={emotionCache}>
            <AuthProvider>
                <ClientStateProvider>
                    <AppFrame>
                        <Component {...pageProps} />
                    </AppFrame>
                </ClientStateProvider>
            </AuthProvider>
        </PageThemeProvider>
    );
}

export default observer(MyApp);
