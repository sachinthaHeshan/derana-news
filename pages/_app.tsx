import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Toaster } from 'react-hot-toast';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/derana-logo.png" />
        <title>Ada Derana News</title>
      </Head>
      <main className="bg-black min-h-screen">
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </main>
    </>
  );
}

export default MyApp;
