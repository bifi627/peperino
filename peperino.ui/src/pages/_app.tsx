import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { AppFrame } from '../components/appFrame/AppFrame';
import "../lib/apiConfig";
import "../lib/auth/client/firebase";
import createEmotionCache from '../lib/styles/EmotionCache';
import { CustomTheme } from '../styles/CustomTheme';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={CustomTheme}>
                <CssBaseline />
                <AppFrame>
                    <Component {...pageProps} />
                </AppFrame>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp
