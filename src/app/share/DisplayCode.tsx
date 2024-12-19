import React from 'react';

export const DisplayCode: React.FC<
  React.PropsWithChildren<{ code: string }>
> = ({ code }) => {
  return (
    <>
      <p className='mb-4'>Your share code is:</p>

      <p className='mb-2 p-2 bg-base-100 rounded-md font-bold text-center'>
        {code}
      </p>

      <p>Enter it on another device to access the same grocery list.</p>
    </>
  );
};
