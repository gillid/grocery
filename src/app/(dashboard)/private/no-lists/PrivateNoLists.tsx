import React from 'react';
import { Tabs } from './Tabs';

export const PrivateNoLists = () => {
  return (
    <>
      <p className='mb-2'>Nice, you have a user!</p>

      <p className='mb-4'>
        Now you can either create a new grocery list or attach an existing one
        to reuse it between devices.
      </p>

      <Tabs />
    </>
  );
};
