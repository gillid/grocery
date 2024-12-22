import React from 'react';
import { Header } from './Header';
import './globals.css';
import Head from 'next/head';

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' data-theme='cupcake'>
      <Head>
        <meta name='apple-mobile-web-app-title' content='Grocery' />
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
