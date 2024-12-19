'use client';

import React, { useTransition } from 'react';
import { generateShareCode } from './generateShareCode';

export const GenerateCode = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await generateShareCode();
    });
  };

  return (
    <>
      <p className='mb-4'>
        Click the button below to generate code. This code can be used to attach
        an existing list in another device.
      </p>

      <p>
        <button
          className={`btn btn-sm`}
          disabled={isPending}
          onClick={handleClick}
        >
          Generate code
        </button>
      </p>
    </>
  );
};
