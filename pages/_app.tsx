import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from '../context/AuthContext';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <>
        <Head>
          <link rel="icon" type="image/x-icon" href="/images/derana-logo.png" />
          <title>Derana News</title>
        </Head>
        <main className="bg-black min-h-screen">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </main>
      </>
    </AuthContextProvider>
  );
}

export default MyApp;
