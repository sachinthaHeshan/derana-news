import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Navbar } from '../modules/App/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/derana-logo.png" />
        <title>Derana News</title>
      </Head>
      <main className="bg-black ">
        <Navbar />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
