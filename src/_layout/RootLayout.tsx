import React from 'react';
import { Header } from './Header';
import './globals.css';

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' data-theme='cupcake'>
      <body>
        <div className='h-screen overflow-y-scroll overflow-x-hidden relative'>
          <Header />
          <main className='min-h-screen pt-[3em] flex'>
            <div className='gutter flex'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};
