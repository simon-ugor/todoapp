import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WarningProvider } from '@/context/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <WarningProvider>
            <Component {...pageProps} />
        </WarningProvider>
    </>
  );
}
