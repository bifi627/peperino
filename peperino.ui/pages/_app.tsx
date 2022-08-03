import type { AppProps } from 'next/app';
import "../lib/apiConfig";
import "../lib/firebase";
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <Component {...pageProps} />
    );
}

export default MyApp
