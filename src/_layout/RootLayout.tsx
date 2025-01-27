import React from 'react';
import { Header } from './Header';
import './globals.css';
import Head from 'next/head';
import { AuthRefresh } from './AuthRefresh';

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' dir='ltr' data-theme='cupcake'>
      <AuthRefresh />
      <Head>
        <meta name='apple-mobile-web-app-title' content='Grocery' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <body>
        <div className='h-screen overflow-y-scroll overflow-x-hidden relative'>
          <Header />
          <main className='min-h-screen pt-[3em] flex bg-white'>
            <div className='gutter flex'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};
