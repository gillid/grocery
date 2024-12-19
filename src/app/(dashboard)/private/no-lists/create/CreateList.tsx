'use client';

import { useTransition } from 'react';
import { createNewList } from './createNewList';

export const CreateList = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await createNewList();
    });
  };

  return (
    <button className='btn btn-sm' disabled={isPending} onClick={handleClick}>
      Create list
    </button>
  );
};
