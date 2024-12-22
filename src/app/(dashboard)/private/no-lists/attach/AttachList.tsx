'use client';

import React, { useState, useTransition } from 'react';
import { attachExistingList } from './attachExistingList';

export const AttachList = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await attachExistingList(code);
      } catch (err) {
        setError(err ? true : true); // TODO: fix TS vs ESLint quarrel
      }
    });
  };

  const isEmpty = code.length < 1;

  return (
    <>
      <p className='mb-4'>
        <input
          type='text'
          placeholder='Enter code'
          className={`input input-bordered input-sm text-base leading-8 w-full max-w-xs bg-white ${error && 'input-error'}`}
          value={code}
          onChange={(e) => {
            setError(false);
            setCode(e.target.value.trim());
          }}
        />
        {error && (
          <p className='text-sm text-error'>
            Something went wrong with this code
          </p>
        )}
      </p>

      <p>
        <button
          className='btn btn-sm'
          disabled={isEmpty || isPending}
          onClick={handleClick}
        >
          Attach list
        </button>
      </p>
    </>
  );
};
