import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../Modules/App/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Navbar />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
