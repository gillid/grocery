import React from 'react';
import { AttachList } from './AttachList';

export const TabAttach = () => {
  return (
    <>
      <p className='mt-2 mb-2'>
        To attach an existing list use &quot;share&quot; feature on another
        device. Then enter the code below.
      </p>

      <AttachList />
    </>
  );
};
