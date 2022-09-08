import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Navbar } from '../Modules/App/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Derana News</title>
      </Head>
      <main>
        <Navbar />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
