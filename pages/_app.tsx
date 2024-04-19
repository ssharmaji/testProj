import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider, Box } from '@chakra-ui/react';

import { store } from '../state/store';
import Navbar from '../components/Navbar/Navbar';
import { onMessageListener } from '../utils/common.utils';
import Notifications from '../components/Notifications/Notifications';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

const AnduroPricingApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <title>Best BOPP Packaging manufacturer in the Americas | Anduro</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />
      <Box as="main" pt="64px" pos="relative" zIndex={0}>
        <Provider store={store}>
          <ChakraProvider>
            <Component {...pageProps} />
            <Notifications />
          </ChakraProvider>
        </Provider>
      </Box>
    </div>
  );
};

export default AnduroPricingApp;
